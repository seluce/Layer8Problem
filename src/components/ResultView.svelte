<!--
  The result of a chosen option, styled as the sibling of the event card it
  concludes: same width, same header anatomy, the same black quote panel with
  a colored left edge - emerald, the tone of "done". The continue button is
  part of the card now instead of floating detached below it.

  The pills repeat what the floating numbers already showed, but they stay
  put long enough to read.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { t } from '../i18n/i18n.svelte.js';
    import { renderRecipe } from '../engine/recipe.js';
    import ReadButton from './ReadButton.svelte';
    import ResultPills from './ResultPills.svelte';

    const view = $derived(state.terminal.result ?? {});

    // At the end of the pills, the result's counterpart to the excuse row:
    // the same corner of the card, above the continue button.
    const canRead = $derived(engine.canReplayNarration());

    // The pills are ResultPills.svelte, shared with the answered mail.

    // Result texts are plain text, not HTML, so no data field can carry
    // markup into the document by accident. To keep links usable anyway, bare
    // URLs are detected and turned into anchors.
    const URL_RE = /(https?:\/\/[^\s)]+)/g;
    const parts = $derived(
        String(renderRecipe(view.text) ?? '').split(URL_RE).map(chunk => ({
            text: chunk,
            href: /^https?:\/\//.test(chunk) ? chunk : null
        }))
    );
</script>

<div class="w-full max-w-2xl text-left fade-in my-auto shrink-0 mx-auto
            bg-slate-900 border border-emerald-500/40 rounded-xl p-4 md:p-6
            shadow-[0_0_12px_rgba(16,185,129,0.12)]">

    <div class="flex items-center gap-3 mb-4 border-b border-slate-600 pb-3">
        <img src="assets/img/ui/ui_result.webp" alt=""
             width="28" height="28" class="w-7 h-7 shrink-0 select-none"
             onerror={(e) => e.currentTarget.outerHTML = '<span class="text-2xl shrink-0">📋</span>'}>
        <span class="text-emerald-500 font-black uppercase tracking-widest text-sm">{t('result.title')}</span>
    </div>

    <div class="bg-black/40 p-5 rounded-lg border-l-4 border-emerald-500/60 shadow-inner">
        <p class="italic text-slate-300 text-lg leading-relaxed font-serif break-words hyphens-auto">{#each parts as part}{#if part.href}<a href={part.href} target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:text-blue-300 not-italic">{part.text}</a>{:else}{part.text}{/if}{/each}</p>
    </div>

    <!-- items-center: the button is a little taller than a pill, and the
         default stretch would have grown every pill to its height. -->
    <div class="flex flex-wrap items-center gap-2 mt-4">
        <ResultPills m={view.m} tickets={view.tickets} l={view.l} a={view.a} b={view.b} />
        {#if canRead}<span class="ml-auto"><ReadButton /></span>{/if}
    </div>

    <button data-continue onclick={() => engine.runAction({ fn: view.action })}
            class="{view.buttonColor} text-white w-full py-3.5 mt-6 rounded-lg font-bold uppercase tracking-wider transition-all shadow-lg">
        {t(view.buttonKey ?? 'terminal.btn.continue')}
    </button>
</div>
