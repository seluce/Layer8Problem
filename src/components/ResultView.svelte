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

    const view = $derived(state.terminal.result ?? {});

    // Time is only worth a pill when any actually passed.
    const pills = $derived([
        ...(view.m > 0 ? [{ label: 'Minuten',  value: view.m, tone: 'text-blue-400' }] : []),
        { label: 'Faulheit', value: view.f ?? 0, tone: 'text-green-400' },
        { label: 'Aggro',    value: view.a ?? 0, tone: 'text-orange-400' },
        { label: 'Chef',     value: view.c ?? 0, tone: 'text-red-500' }
    ]);

    const sign = (n) => (n > 0 ? '+' : '') + n;

    // Result texts are plain text, not HTML, so no data field can carry
    // markup into the document by accident. To keep links usable anyway, bare
    // URLs are detected and turned into anchors.
    const URL_RE = /(https?:\/\/[^\s)]+)/g;
    const parts = $derived(
        String(view.text ?? '').split(URL_RE).map(chunk => ({
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
        <span class="text-emerald-500 font-black uppercase tracking-widest text-sm">Ergebnis</span>
    </div>

    <div class="bg-black/40 p-5 rounded-lg border-l-4 border-emerald-500/60 shadow-inner">
        <p class="italic text-slate-300 text-lg leading-relaxed font-serif break-words hyphens-auto">{#each parts as part}{#if part.href}<a href={part.href} target="_blank" rel="noopener noreferrer" class="text-blue-400 underline hover:text-blue-300 not-italic">{part.text}</a>{:else}{part.text}{/if}{/each}</p>
    </div>

    <div class="flex flex-wrap gap-2 mt-4">
        {#each pills as pill (pill.label)}
            <span class="inline-flex items-center gap-1 px-2 py-1 rounded-sm text-xs font-bold bg-slate-950/70 border border-slate-700">
                <span class={pill.tone}>{pill.label}</span>
                <span class="text-white font-mono ml-0.5">{sign(pill.value)}</span>
            </span>
        {/each}
    </div>

    <button data-continue onclick={() => engine.runAction({ fn: view.action })}
            class="{view.buttonColor} text-white w-full py-3.5 mt-6 rounded-lg font-bold uppercase tracking-wider transition-all shadow-lg">
        {view.buttonText}
    </button>
</div>
