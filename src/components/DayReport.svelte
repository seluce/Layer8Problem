<!--
  Die Tagesbilanz im Endbildschirm.

  Früher baute engine_core.buildDayReport() diesen Block als HTML-Zeichenkette
  zusammen. Als Komponente kann er etwas, was der String nicht konnte: den Wert
  hervorheben, an dem der Tag zerbrochen ist. Wer gefeuert wurde, soll den
  Chef-Radar sehen und nicht drei gleich laute Zahlen.
-->
<script>
    import { state as game } from '../engine/engine_state.svelte.js';

    let { cause = null } = $props();

    const DIFF = [
        { test: (m) => m < 1.0,  label: 'FREITAG (Leicht)' },
        { test: (m) => m > 1.0,  label: 'MONTAG (Schwer)' },
        { test: () => true,      label: 'MITTWOCH (Normal)' }
    ];
    const diffName = $derived(DIFF.find(d => d.test(game.difficultyMult)).label);

    // Welcher Wert hat den Tag beendet? Nur diese drei Ursachen zeigen auf
    // einen Balken; Feierabend und Party haben keinen Schuldigen.
    const CULPRIT = { rage: 'al', chef: 'cr' };

    const stats = $derived([
        { key: 'fl', label: 'Faulheit', value: Math.round(game.fl), color: 'text-emerald-400',
          badge: null },
        { key: 'al', label: 'Aggro',    value: Math.round(game.al), color: 'text-orange-400',
          badge: game.rageWarningReceived ? { text: 'VENTIL GENUTZT', cls: 'text-orange-400 border-orange-500/80 bg-orange-950/30 -rotate-3' } : null },
        { key: 'cr', label: 'Radar',    value: Math.round(game.cr), color: 'text-red-500',
          badge: game.chefWarningReceived ? { text: 'ABGEMAHNT', cls: 'text-red-500 border-red-500/80 bg-red-950/30 rotate-2' } : null }
    ]);

    const guilty = $derived(CULPRIT[cause] ?? null);
</script>

<div class="bg-slate-950 p-4 rounded-lg border border-slate-700 my-4 shadow-inner">
    <div class="text-[10px] text-slate-500 uppercase tracking-widest mb-3">
        Tagesbericht: <span class="text-white font-bold">{diffName}</span>
    </div>

    <div class="grid grid-cols-3 gap-2 text-center font-mono">
        {#each stats as s (s.key)}
            <div class="flex flex-col items-center rounded-md py-2 transition-colors
                        {guilty === s.key ? 'bg-slate-900 ring-1 ring-inset ring-current ' + s.color : ''}">
                <span class="{s.color} font-bold text-xl">{s.value}%</span>
                <span class="text-[10px] text-slate-400">{s.label}</span>

                {#if guilty === s.key}
                    <span class="text-[9px] font-bold {s.color} mt-1 tracking-wider">← HIER WAR SCHLUSS</span>
                {/if}

                {#if s.badge}
                    <span class="text-[8px] font-mono font-bold tracking-widest border-2 rounded-xs px-1.5 py-0.5 mt-2 inline-block {s.badge.cls}">
                        {s.badge.text}
                    </span>
                {/if}
            </div>
        {/each}
    </div>

    {#if cause === 'tickets'}
        <div class="mt-3 pt-3 border-t border-slate-800 text-center">
            <span class="text-purple-400 font-mono font-bold text-lg">{game.tickets}</span>
            <span class="text-[10px] text-slate-400 ml-1 uppercase tracking-widest">offene Tickets</span>
            <span class="block text-[9px] font-bold text-purple-400 mt-1 tracking-wider">← HIER WAR SCHLUSS</span>
        </div>
    {/if}
</div>
