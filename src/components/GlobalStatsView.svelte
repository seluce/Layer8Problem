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
    import { t, tf, language } from '../i18n/i18n.svelte.js';

    // Read from state rather than props: the component is mounted on its own,
    // so there is no parent to pass anything down.
    const view = $derived(game.globalStats);
    const data = $derived(view.data);

    const mine = $derived(game.archive.stats ?? {});

    // i18n-uses: stats.mode.day, stats.mode.week
    const MODES = [
        { key: 'day',  accent: 'text-blue-400',   border: 'border-blue-500/60' },
        { key: 'week', accent: 'text-purple-400', border: 'border-purple-500/60' }
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
    // i18n-uses: stats.unit.day, stats.unit.week
    const unit = $derived(t(`stats.unit.${mode}`));
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

    // Only what is drawn. Both modes ask the same three questions and paint
    // them in the same colours - what differs is the wording, and that now
    // comes out of the dictionary under the mode's own keys, so the list is
    // needed once instead of twice.
    const ROWS = [
        { key: 'survived', icon: '✨', tone: 'text-emerald-400', bar: 'bg-emerald-500' },
        { key: 'rage',     icon: '🤬', tone: 'text-orange-400',  bar: 'bg-orange-500' },
        { key: 'fired',    icon: '🚨', tone: 'text-red-500',     bar: 'bg-red-600' }
    ];

    // i18n-uses: stats.row.day.survived.label, stats.row.day.survived.better, stats.row.day.survived.worse
    // i18n-uses: stats.row.day.rage.label, stats.row.day.rage.better, stats.row.day.rage.worse
    // i18n-uses: stats.row.day.fired.label, stats.row.day.fired.better, stats.row.day.fired.worse
    // i18n-uses: stats.row.week.survived.label, stats.row.week.survived.better, stats.row.week.survived.worse
    // i18n-uses: stats.row.week.rage.label, stats.row.week.rage.better, stats.row.week.rage.worse
    // i18n-uses: stats.row.week.fired.label, stats.row.week.fired.better, stats.row.week.fired.worse
    const rows = $derived(
        ROWS.map(row => {
            const my = share(own[row.key], myTotal);
            const global = share(world[row.key], worldTotal);
            return {
                ...row,
                my, global,
                label: t(`stats.row.${mode}.${row.key}.label`),
                comment: t(`stats.row.${mode}.${row.key}.${my >= global ? 'better' : 'worse'}`)
            };
        })
    );

    // Whichever tendency deviates most from the world average names the
    // playstyle. Only counts when the player actually did it at least once.
    // The three tendencies keep their own colour; the average takes the colour
    // of its mode, blue for the day and purple for the week - which is exactly
    // what the tab above it already carries.
    const DIAGNOSIS_TONE = {
        rage:     'text-orange-400',
        fired:    'text-red-500',
        survived: 'text-emerald-400'
    };

    // i18n-uses: stats.diag.day.rage.title, stats.diag.day.rage.text
    // i18n-uses: stats.diag.day.fired.title, stats.diag.day.fired.text
    // i18n-uses: stats.diag.day.survived.title, stats.diag.day.survived.text
    // i18n-uses: stats.diag.day.average.title, stats.diag.day.average.text
    // i18n-uses: stats.diag.week.rage.title, stats.diag.week.rage.text
    // i18n-uses: stats.diag.week.fired.title, stats.diag.week.fired.text
    // i18n-uses: stats.diag.week.survived.title, stats.diag.week.survived.text
    // i18n-uses: stats.diag.week.average.title, stats.diag.week.average.text
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
        const which = winner?.key ?? 'average';
        return {
            title: t(`stats.diag.${mode}.${which}.title`),
            text:  t(`stats.diag.${mode}.${which}.text`),
            tone:  DIAGNOSIS_TONE[which] ?? MODES.find(m => m.key === mode).accent
        };
    })());

    // i18n-uses: stats.started, stats.survived, stats.rageQuits, stats.fired
    const TOTALS = [
        { key: 'started',  label: 'stats.started',   tone: 'text-white' },
        { key: 'survived', label: 'stats.survived',  tone: 'text-emerald-400' },
        { key: 'rage',     label: 'stats.rageQuits', tone: 'text-orange-400' },
        { key: 'fired',    label: 'stats.fired',     tone: 'text-red-500' }
    ];

    const pct = (rate) => Math.round((isNaN(rate) ? 0 : rate) * 100) + '%';
    // Follows the language: German groups with a full stop, English with a
    // comma, and 1.234 read as 1,234 is a different number.
    const num = (value) => Number(value).toLocaleString(language());

    const empty = $derived(!data || typeof data !== 'object' || Object.keys(data).length === 0);
</script>

{#if view.loading}
    <div class="text-center text-slate-400 animate-pulse py-10 font-mono text-sm">{t('stats.loading')}</div>
{:else if view.failed}
    <div class="text-center text-red-500 py-10 font-bold">{t('stats.failed')}</div>
{:else if empty}
    <div class="text-center py-12 px-4 fade-in">
        <div class="text-5xl mb-4 opacity-50">📡</div>
        <h3 class="text-lg font-bold text-slate-300 mb-2">{t('stats.empty.title')}</h3>
        <p class="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
            {t('stats.empty.body')}<br><br>
            <span class="text-xs opacity-70 italic">{t('stats.empty.hint')}</span>
        </p>
        <button onclick={() => engine.closeGlobalStats()} class="mt-8 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-8 rounded-lg transition-colors uppercase tracking-widest text-xs">{t('stats.back')}</button>
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
                {t(`stats.mode.${m.key}`)}
            </button>
        {/each}
    </div>

    <div class="bg-slate-800/50 border border-slate-700 p-4 rounded-xl shadow-inner mb-4">
        <h3 class="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">
            {tf('stats.totals.title', { unit })}
        </h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
            {#each TOTALS as total (total.key)}
                <div>
                    <div class="text-[10px] text-slate-500 uppercase tracking-widest">{t(total.label)}</div>
                    <div class="text-xl font-bold {total.tone}">{num(world[total.key])}</div>
                </div>
            {/each}
        </div>
    </div>

    {#if !worldReady}
        <div class="bg-slate-800/50 border border-slate-700 p-5 rounded-xl shadow-inner text-center">
            <p class="text-sm text-slate-300 font-bold mb-1">{tf('stats.noWorld.title', { unit })}</p>
            <p class="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                {t('stats.noWorld.body')}
            </p>
        </div>
    {:else}
        <div class="bg-slate-800/50 border border-slate-700 p-4 sm:p-5 rounded-xl shadow-inner">
            <div class="bg-slate-900 border border-slate-700 rounded-lg p-3 mb-6 shadow-md relative overflow-hidden">
                <div class="font-bold text-sm mb-1 {diagnosis.tone}">{diagnosis.title}</div>
                <div class="text-xs text-slate-300 italic leading-snug">{diagnosis.text}</div>
            </div>

            <h3 class="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5 border-b border-slate-700 pb-2 flex items-center justify-between">
                <span>{t('stats.profile.title')}</span>
                <span class="text-[9px] text-slate-500 font-normal hidden sm:inline">{t('stats.profile.marker')}</span>
            </h3>

            {#if !mineReady}
                <p class="text-[11px] text-slate-500 italic mb-4">
                    {t('stats.profile.none')}
                </p>
            {/if}

            <div class="space-y-5">
                {#each rows as row (row.key)}
                    <div class="flex flex-col gap-1.5">
                        <div class="flex justify-between text-xs font-bold">
                            <span class="{row.tone} flex items-center gap-1"><span class="text-sm">{row.icon}</span> {row.label}</span>
                            <!-- Two independent labels, each in front of its own
                                 number - not one sentence cut into pieces. The
                                 emphasis on the player's share is markup, so
                                 the value cannot sit inside a single string
                                 without carrying HTML into the dictionary. -->
                            <span class="text-slate-300 font-mono">{t('stats.compare.mine')} <span class="text-white">{pct(row.my)}</span> | {t('stats.compare.world')} {pct(row.global)}</span>
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
        <button onclick={() => engine.closeGlobalStats()} class="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors uppercase tracking-widest text-xs">{t('stats.back')}</button>
    </div>
{/if}
