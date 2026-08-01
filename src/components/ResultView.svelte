<!--
  The result of a chosen option.

  The pills below the text repeat what the floating numbers already showed, but
  they stay put long enough to read.
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
</script>

<div class="w-full max-w-xl text-left fade-in flex flex-col my-auto shrink-0">
    <div class="bg-slate-800 p-6 rounded-xl border border-slate-600 mb-8 shadow-xl">
        <h3 class="font-bold text-white mb-2 uppercase text-xs tracking-widest text-emerald-500">Ergebnis</h3>
        <p class="text-slate-300 italic text-lg leading-relaxed">"{view.text}"</p>

        <div class="flex flex-wrap gap-2 mt-4 fade-in">
            {#each pills as pill (pill.label)}
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-sm text-xs font-bold bg-slate-800 border border-slate-700">
                    <span class={pill.tone}>{pill.label}</span>
                    <span class="text-white ml-0.5">{sign(pill.value)}</span>
                </span>
            {/each}
        </div>
    </div>

    <button data-continue onclick={() => engine.runAction({ fn: view.action })}
            class="{view.buttonColor} text-white w-full py-4 rounded-xl font-bold uppercase transition-all shadow-lg border border-slate-700/50">
        {view.buttonText}
    </button>
</div>
