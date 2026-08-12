<!--
  Worldwide statistics, desktop only.

  Compares the player's own record against the aggregated Steam figures. Only
  completed runs count on both sides — a run in progress says nothing about how
  it will end.

  Two ledgers share this panel, exactly like the archive: single days and whole
  weeks. The choice is remembered across both views (KEYS.statsTab), because a
  player who lives in the week mode wants to see the week everywhere.

  The three bars show shares, not totals, because a player with twenty days
  cannot be compared to a global count in the millions. The white marker is
  where the world sits.
-->
<script>
    // Imported as `game`: a local binding called `state` would make the
    // $state rune ambiguous (Svelte reads $state as a store subscription).
    import { state as game } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { KEYS } from '../engine/keys.js';

    // Read from state rather than props: the component is mounted on its own,
    // so there is no parent to pass anything down.
    const view = $derived(game.globalStats);
    const data = $derived(view.data);

    const mine = $derived(game.archive.stats ?? {});

    const MODES = [
        { key: 'day',  label: 'Arbeitstag',   accent: 'text-blue-400',   border: 'border-blue-500/60' },
        { key: 'week', label: 'Arbeitswoche', accent: 'text-purple-400', border: 'border-purple-500/60' }
    ];

    let mode = $state(localStorage.getItem(KEYS.statsTab) === 'week' ? 'week' : 'day');
    const setMode = (key) => {
        mode = key;
        try { localStorage.setItem(KEYS.statsTab, key); } catch { /* private mode */ }
    };

    // Steam returns either a number or an object with a `total`, depending on
    // how the stat is configured in the backend.
    const globalStat = (name) => {
        const value = data?.[name];
        if (value === undefined || value === null) return 0;
        if (typeof value === 'object' && value.total !== undefined) return parseInt(value.total) || 0;
        return parseInt(value) || 0;
    };

    // Which Steam stat and which own counter belong to a mode. Day runs
    // started are derived from the three per-weekday keys: daysStarted counts
    // every day Mueller ever lived, week days included.
    const SOURCES = {
        day: {
            unit: 'Arbeitstage',
            world: { started: 'stat_started', survived: 'stat_survived',
                     rage: 'stat_ragequit', fired: 'stat_fired' },
            own: {
                started:  () => (mine.started_easy ?? 0) + (mine.started_normal ?? 0) + (mine.started_hard ?? 0),
                survived: () => mine.daysSurvived ?? 0,
                rage:     () => mine.daysRageQuit ?? 0,
                fired:    () => mine.daysFired ?? 0
            }
        },
        week: {
            unit: 'Arbeitswochen',
            world: { started: 'stat_weeks_started', survived: 'stat_weeks_survived',
                     rage: 'stat_weeks_ragequit', fired: 'stat_weeks_fired' },
            own: {
                started:  () => mine.weeksStarted ?? 0,
                survived: () => mine.weeksSurvived ?? 0,
                rage:     () => mine.weeksRageQuit ?? 0,
                fired:    () => mine.weeksFired ?? 0
            }
        }
    };

    const source = $derived(SOURCES[mode]);
    const world = $derived({
        started:  globalStat(source.world.started),
        survived: globalStat(source.world.survived),
        rage:     globalStat(source.world.rage),
        fired:    globalStat(source.world.fired)
    });
    const own = $derived({
        started:  source.own.started(),
        survived: source.own.survived(),
        rage:     source.own.rage(),
        fired:    source.own.fired()
    });

    const share = (part, whole) => (whole > 0 ? part / whole : 0);

    const myTotal = $derived(own.survived + own.rage + own.fired);
    const worldTotal = $derived(world.survived + world.rage + world.fired);

    // The comparison needs figures on both sides. Without them the panel says
    // so rather than drawing three empty bars and calling it a diagnosis.
    const worldReady = $derived(worldTotal > 0);
    const mineReady = $derived(myTotal > 0);

    const ROWS = {
        day: [
            { key: 'survived', icon: '✨', label: 'Überlebens-Tendenz', tone: 'text-emerald-400', bar: 'bg-emerald-500',
              better: 'Du bist resistenter gegen den Wahnsinn als der Rest.',
              worse:  'Für dich ist "Feierabend" eher ein theoretisches Konzept.' },
            { key: 'rage',     icon: '🤬', label: 'Rage-Quit-Tendenz',  tone: 'text-orange-400',  bar: 'bg-orange-500',
              better: 'Dein Monitor fliegt öfter aus dem Fenster als beim globalen Schnitt.',
              worse:  'Erstaunlich. Du rastest seltener aus als andere ITler.' },
            { key: 'fired',    icon: '🚨', label: 'Kündigungs-Tendenz', tone: 'text-red-500',     bar: 'bg-red-600',
              better: 'Du kassierst Kündigungen weitaus enthusiastischer als andere.',
              worse:  'Du fliegst extrem elegant unter dem Radar des Managements.' }
        ],
        week: [
            { key: 'survived', icon: '✨', label: 'Durchhalte-Tendenz', tone: 'text-emerald-400', bar: 'bg-emerald-500',
              better: 'Du bringst Wochen zu Ende, an denen andere spätestens mittwochs scheitern.',
              worse:  'Der Freitag bleibt für dich ein Gerücht, von dem Kollegen erzählen.' },
            { key: 'rage',     icon: '🤬', label: 'Rage-Quit-Tendenz',  tone: 'text-orange-400',  bar: 'bg-orange-500',
              better: 'Deine Wochen enden überdurchschnittlich oft am offenen Fenster.',
              worse:  'Fünf Tage am Stück, ohne dass das Ventil platzt. Beachtlich.' },
            { key: 'fired',    icon: '🚨', label: 'Kündigungs-Tendenz', tone: 'text-red-500',     bar: 'bg-red-600',
              better: 'Der Sicherheitsdienst kennt dich inzwischen mit Vornamen.',
              worse:  'Über eine ganze Woche unauffällig zu bleiben, schaffen die wenigsten.' }
        ]
    };

    const rows = $derived(
        ROWS[mode].map(row => {
            const my = share(own[row.key], myTotal);
            const global = share(world[row.key], worldTotal);
            return { ...row, my, global, comment: my >= global ? row.better : row.worse };
        })
    );

    // Whichever tendency deviates most from the world average names the
    // playstyle. Only counts when the player actually did it at least once.
    const DIAGNOSES = {
        day: {
            rage:     { title: '🧨 Diagnose: Choleriker',          tone: 'text-orange-400',  text: 'Deine Zündschnur ist messbar kürzer als die der meisten. Du neigst extrem zum Rage Quit. Kauf dir mehr Stressbälle!' },
            fired:    { title: '🎯 Diagnose: Chef-Magnet',         tone: 'text-red-500',     text: 'Du ziehst Kündigungen geradezu magisch an. Im weltweiten Vergleich pfuschst du deutlich riskanter als andere.' },
            survived: { title: '💼 Diagnose: Firmen-Inventar',     tone: 'text-emerald-400', text: 'Wahnsinn. Du hältst den Büro-Alltag länger durch als der Großteil der restlichen Welt. Respekt (und Beileid).' },
            average:  { title: '⚖️ Diagnose: Durchschnitts-Admin', tone: 'text-blue-400',    text: 'Dein Leidensweg und deine Entscheidungen entsprechen fast exakt dem weltweiten IT-Standard.' }
        },
        week: {
            rage:     { title: '🧨 Diagnose: Mittwochs-Eskalation', tone: 'text-orange-400',  text: 'Deine Wochen enden häufiger im Ausraster als beim Rest der Welt. Irgendwo zwischen Dienstag und Donnerstag reißt bei dir der Faden.' },
            fired:    { title: '🎯 Diagnose: Wochen-Risiko',        tone: 'text-red-500',     text: 'Du gehst über fünf Tage deutlich mehr Risiko ein als andere. Der Backlog wächst dir öfter über den Kopf als dem weltweiten Schnitt.' },
            survived: { title: '💼 Diagnose: Dauerläufer',          tone: 'text-emerald-400', text: 'Du bringst Wochen ins Ziel, an denen die Welt im Schnitt scheitert. Fünf Tage GlobalCorp am Stück sind kein Zufall mehr.' },
            average:  { title: '⚖️ Diagnose: Standard-Woche',       tone: 'text-purple-400',  text: 'Deine Wochen verlaufen fast exakt so wie die des weltweiten Durchschnitts. Beruhigend oder beunruhigend, je nach Tagesform.' }
        }
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
        return DIAGNOSES[mode][winner?.key] ?? DIAGNOSES[mode].average;
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
    <div class="flex items-center gap-2 mb-4">
        {#each MODES as m (m.key)}
            <button type="button" onclick={() => setMode(m.key)}
                    aria-pressed={mode === m.key}
                    class="flex-1 text-[10px] font-bold uppercase tracking-widest py-2 rounded-lg border transition-colors
                           {mode === m.key
                             ? `bg-slate-800 ${m.accent} ${m.border}`
                             : 'bg-slate-900/40 text-slate-500 border-slate-700/40 hover:text-slate-300'}">
                {m.label}
            </button>
        {/each}
    </div>

    <div class="bg-slate-800/50 border border-slate-700 p-4 rounded-xl shadow-inner mb-4">
        <h3 class="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">
            Kumulierte Steam-Werte · {source.unit} weltweit
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

    {#if !worldReady}
        <div class="bg-slate-800/50 border border-slate-700 p-5 rounded-xl shadow-inner text-center">
            <p class="text-sm text-slate-300 font-bold mb-1">Noch keine weltweiten {source.unit}</p>
            <p class="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                Für diesen Modus liegen bei Steam noch keine abgeschlossenen Läufe vor.
                Sobald genug gespielt wurde, erscheint hier der Vergleich.
            </p>
        </div>
    {:else}
        <div class="bg-slate-800/50 border border-slate-700 p-4 sm:p-5 rounded-xl shadow-inner">
            <div class="bg-slate-900 border border-slate-700 rounded-lg p-3 mb-6 shadow-md relative overflow-hidden">
                <div class="font-bold text-sm mb-1 {diagnosis.tone}">{diagnosis.title}</div>
                <div class="text-xs text-slate-300 italic leading-snug">{diagnosis.text}</div>
            </div>

            <h3 class="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5 border-b border-slate-700 pb-2 flex items-center justify-between">
                <span>Dein SysAdmin-Profil</span>
                <span class="text-[9px] text-slate-500 font-normal hidden sm:inline">Der weiße Strich zeigt den weltweiten Durchschnitt.</span>
            </h3>

            {#if !mineReady}
                <p class="text-[11px] text-slate-500 italic mb-4">
                    Du hast in diesem Modus noch nichts abgeschlossen — die Balken bleiben leer, bis der erste Lauf zu Ende geht.
                </p>
            {/if}

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
                        {#if mineReady}
                            <div class="text-[10px] text-slate-400 italic mt-0.5">{row.comment}</div>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    {/if}

    <div class="w-full mt-4">
        <button onclick={() => engine.closeGlobalStats()} class="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors uppercase tracking-widest text-xs">Zurück</button>
    </div>
{/if}
