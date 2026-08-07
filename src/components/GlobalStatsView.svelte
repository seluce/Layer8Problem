<!--
  Worldwide statistics, desktop only.

  Compares the player's own record against the aggregated Steam figures. Only
  completed days count on both sides — a day in progress says nothing about how
  it will end.

  The three bars show shares, not totals, because a player with twenty days
  cannot be compared to a global count in the millions. The white marker is
  where the world sits.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';

    // Read from state rather than props: the component is mounted on its own,
    // so there is no parent to pass anything down.
    const view = $derived(state.globalStats);
    const data = $derived(view.data);

    const mine = $derived(state.archive.stats ?? {});

    // Steam returns either a number or an object with a `total`, depending on
    // how the stat is configured in the backend.
    const globalStat = (name) => {
        const value = data?.[name];
        if (value === undefined || value === null) return 0;
        if (typeof value === 'object' && value.total !== undefined) return parseInt(value.total) || 0;
        return parseInt(value) || 0;
    };

    const world = $derived({
        started:  globalStat('stat_started'),
        survived: globalStat('stat_survived'),
        rage:     globalStat('stat_ragequit'),
        fired:    globalStat('stat_fired')
    });

    const share = (part, whole) => (whole > 0 ? part / whole : 0);

    const myTotal = $derived((mine.daysSurvived ?? 0) + (mine.daysRageQuit ?? 0) + (mine.daysFired ?? 0));
    const worldTotal = $derived(world.survived + world.rage + world.fired);

    const ROWS = [
        { key: 'survived', icon: '✨', label: 'Überlebens-Tendenz', tone: 'text-emerald-400', bar: 'bg-emerald-500', own: 'daysSurvived',
          better: 'Du bist resistenter gegen den Wahnsinn als der Rest.',
          worse:  'Für dich ist "Feierabend" eher ein theoretisches Konzept.' },
        { key: 'rage',     icon: '🤬', label: 'Rage-Quit-Tendenz',  tone: 'text-orange-400',  bar: 'bg-orange-500',  own: 'daysRageQuit',
          better: 'Dein Monitor fliegt öfter aus dem Fenster als beim globalen Schnitt.',
          worse:  'Erstaunlich. Du rastest seltener aus als andere ITler.' },
        { key: 'fired',    icon: '🚨', label: 'Kündigungs-Tendenz', tone: 'text-red-500',     bar: 'bg-red-600',     own: 'daysFired',
          better: 'Du kassierst Kündigungen weitaus enthusiastischer als andere.',
          worse:  'Du fliegst extrem elegant unter dem Radar des Managements.' }
    ];

    const rows = $derived(
        ROWS.map(row => {
            const my = share(mine[row.own] ?? 0, myTotal);
            const global = share(world[row.key], worldTotal);
            return { ...row, my, global, comment: my >= global ? row.better : row.worse };
        })
    );

    // Whichever tendency deviates most from the world average names the
    // playstyle. Only counts when the player actually did it at least once.
    const DIAGNOSES = {
        rage:     { title: '🧨 Diagnose: Choleriker',        tone: 'text-orange-400', text: 'Deine Zündschnur ist messbar kürzer als die der meisten. Du neigst extrem zum Rage Quit. Kauf dir mehr Stressbälle!' },
        fired:    { title: '🎯 Diagnose: Chef-Magnet',       tone: 'text-red-500',    text: 'Du ziehst Kündigungen geradezu magisch an. Im weltweiten Vergleich pfuschst du deutlich riskanter als andere.' },
        survived: { title: '💼 Diagnose: Firmen-Inventar',   tone: 'text-emerald-400', text: 'Wahnsinn. Du hältst den Büro-Alltag länger durch als der Großteil der restlichen Welt. Respekt (und Beileid).' },
        average:  { title: '⚖️ Diagnose: Durchschnitts-Admin', tone: 'text-blue-400',  text: 'Dein Leidensweg und deine Entscheidungen entsprechen fast exakt dem weltweiten IT-Standard.' }
    };

    const diagnosis = $derived((() => {
        // A tendency has to beat BOTH others outright, and the player must have
        // done it at least once. Ties fall through to the average — that is
        // also the case when nothing has been completed yet.
        //
        // Note it is the largest deviation that wins, not the largest positive
        // one: being far below the world average on two counts still says
        // something about the third.
        const scored = rows.map(r => ({ key: r.key, diff: r.my - r.global, own: r.my }));
        const winner = scored.find(r =>
            r.own > 0 && scored.every(o => o.key === r.key || r.diff > o.diff)
        );
        return DIAGNOSES[winner?.key] ?? DIAGNOSES.average;
    })());

    const TOTALS = [
        { key: 'started',  label: 'Begonnen',   tone: 'text-white' },
        { key: 'survived', label: 'Überlebt',   tone: 'text-emerald-400' },
        { key: 'rage',     label: 'Rage Quits', tone: 'text-orange-400' },
        { key: 'fired',    label: 'Gefeuert',   tone: 'text-red-500' }
    ];

    const pct = (rate) => Math.round((isNaN(rate) ? 0 : rate) * 100) + '%';
    const num = (value) => Number(value).toLocaleString('de-DE');

    const empty = $derived(!data || typeof data !== 'object' || Object.keys(data).length === 0);
</script>

{#if view.loading}
    <div class="text-center text-slate-400 animate-pulse py-10 font-mono text-sm">Verbinde mit Steam-Servern...</div>
{:else if view.failed}
    <div class="text-center text-red-500 py-10 font-bold">Fehler beim Abrufen der Daten.</div>
{:else if empty}
    <div class="text-center py-12 px-4 fade-in">
        <div class="text-5xl mb-4 opacity-50">📡</div>
        <h3 class="text-lg font-bold text-slate-300 mb-2">Daten werden noch gesammelt</h3>
        <p class="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
            Die Steam-Server berechnen die weltweiten Statistiken aktuell noch.<br><br>
            <span class="text-xs opacity-70 italic">Diese Anzeige aktualisiert sich in der Regel einmal täglich. Schau später noch einmal vorbei!</span>
        </p>
        <button onclick={() => engine.closeGlobalStats()} class="mt-8 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-8 rounded-lg transition-colors uppercase tracking-widest text-xs">Zurück</button>
    </div>
{:else}
    <div class="bg-slate-800/50 border border-slate-700 p-4 rounded-xl shadow-inner mb-4">
        <h3 class="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">
            Kumulierte Steam-Werte (Weltweit)
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
            {#each TOTALS as total (total.key)}
                <div>
                    <div class="text-[10px] text-slate-500 uppercase tracking-widest">{total.label}</div>
                    <div class="text-xl font-bold {total.tone}">{num(world[total.key])}</div>
                </div>
            {/each}
        </div>
    </div>

    <div class="bg-slate-800/50 border border-slate-700 p-4 sm:p-5 rounded-xl shadow-inner">
        <div class="bg-slate-900 border border-slate-700 rounded-lg p-3 mb-6 shadow-md relative overflow-hidden">
            <div class="font-bold text-sm mb-1 {diagnosis.tone}">{diagnosis.title}</div>
            <div class="text-xs text-slate-300 italic leading-snug">{diagnosis.text}</div>
        </div>

        <h3 class="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5 border-b border-slate-700 pb-2 flex items-center justify-between">
            <span>Dein SysAdmin-Profil</span>
            <span class="text-[9px] text-slate-500 font-normal hidden sm:inline">Der weiße Strich zeigt den weltweiten Durchschnitt.</span>
        </h3>

        <div class="space-y-5">
            {#each rows as row (row.key)}
                <div class="flex flex-col gap-1.5">
                    <div class="flex justify-between text-xs font-bold">
                        <span class="{row.tone} flex items-center gap-1"><span class="text-sm">{row.icon}</span> {row.label}</span>
                        <span class="text-slate-300 font-mono">Du: <span class="text-white">{pct(row.my)}</span> | Welt: {pct(row.global)}</span>
                    </div>
                    <div class="w-full bg-slate-900 h-3 rounded-full overflow-hidden flex relative border border-slate-700">
                        <div class="absolute top-0 bottom-0 w-1 bg-white z-10 shadow-[0_0_5px_rgba(255,255,255,0.8)]" style="left: {row.global * 100}%; margin-left:-2px;"></div>
                        <div class="{row.bar} h-full transition-all duration-1000" style="width: {row.my * 100}%"></div>
                    </div>
                    <div class="text-[10px] text-slate-400 italic mt-0.5">{row.comment}</div>
                </div>
            {/each}
        </div>
    </div>

    <div class="w-full">
        <button onclick={() => engine.closeGlobalStats()} class="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors uppercase tracking-widest text-xs">Zurück</button>
    </div>
{/if}
