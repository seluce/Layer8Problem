<!--
  The morning mood shown before the workday starts.

  `conditions` is still an HTML fragment: the wording carries inline colour that
  varies per effect. It comes from the engine, never from player input.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';

    const view = $derived(state.terminal.morning ?? {});
</script>

<div class="w-full max-w-2xl text-left fade-in bg-slate-900 border border-slate-400 p-4 md:p-6 rounded-xl shadow-2xl mx-auto my-auto shrink-0 relative">
    <div class="flex items-center gap-3 mb-4 md:mb-6 border-b border-slate-600 pb-3 md:pb-4">
        <span class="text-3xl">🌅</span>
        <div class="flex flex-col">
            <span class="text-slate-400 font-black uppercase tracking-widest text-sm">DER MORGEN DANACH</span>
            <h2 class="text-2xl font-bold text-white">{view.title}</h2>
        </div>
    </div>

    <div class="bg-black/40 p-5 rounded-lg border-l-4 border-slate-400 mb-6">
        <p class="italic text-slate-300 text-lg leading-relaxed font-serif">"{view.text}"</p>
    </div>

    <div class="mb-8 text-center text-sm bg-slate-950 border border-slate-800 p-3 rounded-sm shadow-inner">
        Startbedingungen: {@html view.conditions ?? ''}
    </div>

    <button data-continue onclick={() => engine.reset()}
            class="w-full text-center p-4 rounded-xl border border-slate-500 bg-slate-800 hover:bg-slate-700 hover:border-white transition-all font-bold uppercase tracking-wider">
        Den Arbeitstag beginnen
    </button>
</div>
