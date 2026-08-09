<!--
  The archive: collected items, legendary trophies and achievements.

  Renders into #archive-content whenever the modal is open. The engine only
  toggles state.archiveOpen; everything shown here is derived from
  state.archive, which the save system keeps up to date.

  Rendering is tied to the open flag so the two dozen images are not fetched
  until someone actually looks.

  Item tiles used to carry only a native title attribute - mouse-only
  knowledge, and on touch a tile told you nothing beyond the picture. They
  now share the backpack's tooltip (ItemTooltip.svelte) and its gesture:
  hover with a mouse, tap to pin on touch, Enter or Space on a keyboard.
  There is no action behind a tile, so the gesture is the same for every
  input: it toggles. Locked tiles answer with a minimal box instead of
  staying silent, without leaking name or flavour of something not yet
  found.
-->
<script>
    /* Images here load immediately on purpose (loading="eager"), not lazily.
       The archive is a modal opened for browsing - with lazy loading,
       scrolling first showed empty boxes, because the browser only requests
       the files once they become visible. These are a few small WebP files;
       fetching them all at once is the faster path. The same applies to
       TeamView. */
    // Renamed so the $state rune stays usable in this file - see the pitfall
    // noted in STRUCTURE.md.
    import { state as game } from '../engine/engine_state.svelte.js';
    import { KEYS } from '../engine/keys.js';
    import { DB } from '../data.js';
    import ItemTooltip from './ItemTooltip.svelte';

    // Image files that failed to load. Until now the symbol was simply drawn
    // underneath every picture, so a missing file left the spot filled - but a
    // picture with transparent areas showed the emoji through it. Now exactly
    // one of the two is rendered, and this decides which.
    let brokenImages = $state({});
    const markBroken = (src) => { brokenImages = { ...brokenImages, [src]: true }; };
    const hasPicture = (entry) => entry.img && !brokenImages[entry.img];

    const owned = $derived(game.archive.items ?? []);
    const earned = $derived(game.archive.achievements ?? []);

    // Trophies are shown apart from ordinary equipment: they mark a story
    // branch rather than something you carry around.
    const items = $derived(Object.entries(DB.items).map(([id, item]) => ({ id, item, unlocked: owned.includes(id) })));
    const normalItems = $derived(items.filter(e => !e.item.quest));
    const questItems  = $derived(items.filter(e => e.item.quest));

    const foundItems  = $derived(items.filter(e => e.unlocked).length);
    const itemPercent = $derived(items.length ? Math.round(foundItems / items.length * 100) : 0);
    const achPercent  = $derived(DB.achievements.length ? Math.round(earned.length / DB.achievements.length * 100) : 0);

    const stats = $derived(game.archive.stats ?? { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 });

    /**
     * One block, two modes. Doubling the panel would have cost twice the
     * space for numbers that are read one at a time anyway, so the two
     * ledgers share a place and a shape - and the choice is remembered,
     * because whoever plays the week wants to see the week next time too.
     */
    const MODES = [
        { key: 'day',  label: 'Arbeitstag',   accent: 'text-blue-400',   border: 'border-blue-500/60' },
        { key: 'week', label: 'Arbeitswoche', accent: 'text-purple-400', border: 'border-purple-500/60' }
    ];

    let mode = $state(localStorage.getItem(KEYS.statsTab) === 'week' ? 'week' : 'day');
    const setMode = (key) => {
        mode = key;
        try { localStorage.setItem(KEYS.statsTab, key); } catch { /* private mode */ }
    };

    // Same four questions per mode, different unit: days here, weeks there.
    const COUNTERS = {
        day: [
            // Not daysStarted: that one numbers every day Mueller ever lived,
            // week days included. The sum of the three day-mode keys is what
            // the bars underneath add up to.
            { key: 'dayRunsStarted', label: 'Begonnen', tone: 'text-slate-200' },
            { key: 'daysSurvived', label: 'Überlebt',   tone: 'text-emerald-400' },
            { key: 'daysRageQuit', label: 'Rage Quits', tone: 'text-orange-400' },
            { key: 'daysFired',    label: 'Gefeuert',   tone: 'text-red-500' }
        ],
        week: [
            { key: 'weeksStarted',  label: 'Begonnen',   tone: 'text-slate-200' },
            { key: 'weeksSurvived', label: 'Überlebt',   tone: 'text-emerald-400' },
            { key: 'weeksRageQuit', label: 'Rage Quits', tone: 'text-orange-400' },
            { key: 'weeksFired',    label: 'Gefeuert',   tone: 'text-red-500' }
        ]
    };

    // The bars say more than one overall rate: someone who survived ten
    // Fridays but no Monday sees exactly that - and the same holds for the
    // week, where the three states are the real difficulty.
    const LEVELS = {
        day: [
            { key: 'easy',   label: 'Freitag',     bar: 'bg-green-500' },
            { key: 'normal', label: 'Mittwoch',    bar: 'bg-blue-500' },
            { key: 'hard',   label: 'Montag',      bar: 'bg-red-500' }
        ],
        week: [
            { key: 'easy',   label: 'Erholt',      bar: 'bg-green-500' },
            { key: 'normal', label: 'Genervt',     bar: 'bg-amber-500' },
            { key: 'hard',   label: 'Urlaubsreif', bar: 'bg-red-500' }
        ]
    };

    // Day mode reads the plain counters; the week keeps its own prefix.
    const statOf = (level) => mode === 'day'
        ? { started: stats['started_' + level] ?? 0, survived: stats['survived_' + level] ?? 0 }
        : { started: stats['weeksStarted_' + level] ?? 0, survived: stats['weeksSurvived_' + level] ?? 0 };

    // Day runs started are derived rather than stored, see the note above.
    const dayRunsStarted = $derived(
        (stats.started_easy ?? 0) + (stats.started_normal ?? 0) + (stats.started_hard ?? 0));
    const counterValue = (key) => key === 'dayRunsStarted' ? dayRunsStarted : (stats[key] ?? 0);

    const counters = $derived(COUNTERS[mode]);
    const levels = $derived(LEVELS[mode].map(l => {
        const { started, survived } = statOf(l.key);
        return { ...l, started, survived,
                 percent: started ? Math.round(survived / started * 100) : 0 };
    }));
    const hasLevels = $derived(levels.some(l => l.started > 0));

    // Only while no week has been survived yet: how far the best run got.
    const WEEK_BEST = ['–', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'ganze Woche'];
    const weekBest = $derived(WEEK_BEST[Math.min(5, stats.weekBestDay ?? 0)]);
    const showBest = $derived(mode === 'week'
        && (stats.weekBestDay ?? 0) > 0 && (stats.weeksSurvived ?? 0) === 0);

    // The streak belongs to its mode: days in a row here, weeks in a row
    // there. One shared number would have counted two different things.
    const streak      = $derived(mode === 'day' ? (stats.streak ?? 0) : (stats.weekStreak ?? 0));
    const streakBest  = $derived(mode === 'day' ? (stats.streakBest ?? 0) : (stats.weekStreakBest ?? 0));
    const streakLabel = $derived(mode === 'day' ? 'Tage am Stück' : 'Wochen am Stück');

    // Small print: only show what actually happened. The numbers carry the
    // colour of their stat - orange for the valve, red for the boss - so the
    // line stays readable without effort. Valve and warning belong to their
    // mode like everything else in this panel: once per day here, once per
    // week there (weekVentSaves / weekWarningsChef, see recordWeekResult).
    const footnotes = $derived.by(() => {
        const vent = mode === 'day' ? stats.ventSaves    : stats.weekVentSaves;
        const warn = mode === 'day' ? stats.warningsChef : stats.weekWarningsChef;
        return [
            vent ? { value: vent, text: 'durch das Ventil gerettet', tone: 'text-orange-400' } : null,
            warn ? { value: warn, text: 'abgemahnt',                 tone: 'text-red-500' } : null
        ].filter(Boolean);
    });

    // How hard it was when the achievement was earned. Anything recorded before
    // the difficulty was tracked counts as easy.
    const DIFFICULTY = {
        hard:   { border: 'border-red-500/50 bg-red-900/10 shadow-[0_0_10px_rgba(239,68,68,0.1)]', badge: 'text-red-400 border-red-500/30 bg-red-950/30',     label: 'SCHWER' },
        normal: { border: 'border-blue-500/50 bg-blue-900/10',                                     badge: 'text-blue-400 border-blue-500/30 bg-blue-950/30',  label: 'MITTEL' },
        easy:   { border: 'border-green-500/50 bg-green-900/10',                                   badge: 'text-green-400 border-green-500/30 bg-green-950/30', label: 'EINFACH' }
    };

    const achievements = $derived(
        DB.achievements.map(ach => {
            const unlocked = earned.includes(ach.id);
            const diff = DIFFICULTY[game.archive.achievementDiffs?.[ach.id] ?? 'easy'] ?? DIFFICULTY.easy;
            return {
                ach, unlocked, diff,
                desc: unlocked ? ach.desc : (ach.hint || '???')
            };
        })
    );

    const itemBorder = (unlocked, quest) => {
        if (!unlocked) return 'border-slate-700 opacity-50 text-slate-600 bg-slate-900 border-dashed';
        return quest
            ? 'border-amber-500/50 text-amber-100 bg-amber-900/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
            : 'border-slate-500/50 text-slate-200 bg-slate-800';
    };

    // Which tile currently has its tooltip pinned, by item id. Touch and
    // keyboard need this; a mouse still gets the tooltip from :hover alone.
    let pinned = $state(null);

    // The grids are grid-cols-6 md:grid-cols-8 lg:grid-cols-10, so the column
    // a tile sits in depends on the viewport - same reasoning as in
    // InventoryFull, just with the archive's breakpoints.
    let columns = $state(10);

    $effect(() => {
        const steps = [
            [window.matchMedia('(min-width: 1024px)'), 10],
            [window.matchMedia('(min-width: 768px)'), 8]
        ];
        const update = () => { columns = steps.find(([query]) => query.matches)?.[1] ?? 6; };
        update();
        steps.forEach(([query]) => query.addEventListener('change', update));
        return () => steps.forEach(([query]) => query.removeEventListener('change', update));
    });

    // A pinned tooltip must never outlive the gesture that opened it - and
    // not the modal either. The listeners only exist while the archive is
    // open; closing it resets the pin through the same effect.
    $effect(() => {
        if (!game.archiveOpen) {
            pinned = null;
            return;
        }

        const closeOnOutsidePress = (event) => {
            if (event.target?.closest?.('[data-arch-tile]')) return;
            pinned = null;
        };
        const closeOnEscape = (event) => { if (event.key === 'Escape') pinned = null; };
        const close = () => { pinned = null; };

        window.addEventListener('pointerdown', closeOnOutsidePress);
        window.addEventListener('keydown', closeOnEscape);
        window.addEventListener('scroll', close, true);
        return () => {
            window.removeEventListener('pointerdown', closeOnOutsidePress);
            window.removeEventListener('keydown', closeOnEscape);
            window.removeEventListener('scroll', close, true);
        };
    });

    // Tooltips are wider than a tile, so the ones near the edges would be
    // cut off. The archive grid is denser than the backpack: at six columns
    // on a phone even the second tile sits too close to the screen edge for
    // a centred box - hence the two-tile edge zone there.
    function tooltipPosition(index) {
        const edge = columns === 6 ? 1 : 0;
        const col = index % columns;
        if (col <= edge)               return { box: 'left-0 translate-x-0',            arrow: 'left-5 translate-x-0' };
        if (col >= columns - 1 - edge) return { box: 'right-0 left-auto translate-x-0', arrow: 'right-5 left-auto translate-x-0' };
        return { box: 'left-1/2 -translate-x-1/2', arrow: 'left-1/2 -translate-x-1/2' };
    }

    // A tap or click toggles the tooltip. The archive is for looking, not
    // for using, so there is no second meaning to separate - mouse, finger
    // and keyboard share the one gesture, and hover keeps working on top.
    const toggle = (id) => { pinned = pinned === id ? null : id; };

    // stopPropagation keeps Enter and Space away from the global key
    // handling in engine.js, so a focused tile does not also fire the
    // confirm action - same reasoning as in InventoryFull.
    function keyToggle(event, id) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        event.stopPropagation();
        toggle(id);
    }

    // Focus leaving a grid unpins, so a keyboard user tabbing onwards does
    // not leave a box floating over unrelated tiles.
    const unpinOnFocusOut = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) pinned = null;
    };
</script>

{#snippet tile(entry, index)}
    {@const quest = !!entry.item.quest}
    {@const pos = tooltipPosition(index)}
    <div class="aspect-square rounded-sm border {itemBorder(entry.unlocked, quest)} flex items-center justify-center text-xl cursor-help transition-all relative group {pinned === entry.id ? 'ring-2 ring-slate-400/70' : ''}"
         data-arch-tile role="button" tabindex="0"
         aria-label={entry.unlocked ? entry.item.name : (quest ? '???' : 'Unbekannt')}
         onclick={() => toggle(entry.id)}
         onkeydown={(e) => keyToggle(e, entry.id)}>
        {#if !entry.unlocked}?
        {:else if hasPicture(entry.item)}
            <img src={entry.item.img} loading="eager" decoding="async" class="w-full h-full object-contain p-1 pointer-events-none" alt={entry.item.name} onerror={() => markBroken(entry.item.img)}>
        {:else}
            <!-- No picture, or the file is missing: the symbol keeps the spot from sitting empty. -->
            <span class="pointer-events-none">{entry.item.icon}</span>
        {/if}

        <ItemTooltip item={entry.item} pinned={pinned === entry.id}
                     locked={!entry.unlocked} lockedTitle={quest ? '???' : 'Unbekannt'} {pos} />
    </div>
{/snippet}

{#if game.archiveOpen}
    <div class="mb-8 flex flex-col gap-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="bg-slate-800/60 border border-slate-700 p-3 rounded-lg shadow-xs">
                <div class="flex justify-between items-end mb-1.5">
                    <span class="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5"><img src="assets/img/ui/ui_items.webp" alt="" width="20" height="20" class="w-5 h-5 shrink-0 select-none" onerror={(ev) => ev.currentTarget.outerHTML = '📦'}> Items</span>
                    <span class="text-xs font-mono text-slate-300">{foundItems} / {items.length}</span>
                </div>
                <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div class="h-full bg-linear-to-r from-amber-600 to-amber-400 transition-all duration-1000" style="width: {itemPercent}%"></div>
                </div>
            </div>

            <div class="bg-slate-800/60 border border-slate-700 p-3 rounded-lg shadow-xs">
                <div class="flex justify-between items-end mb-1.5">
                    <span class="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5"><img src="assets/img/ui/ui_medal.webp" alt="" width="20" height="20" class="w-5 h-5 shrink-0 select-none" onerror={(ev) => ev.currentTarget.outerHTML = '🏅'}> Erfolge</span>
                    <span class="text-xs font-mono text-slate-300">{earned.length} / {DB.achievements.length}</span>
                </div>
                <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div class="h-full bg-linear-to-r from-purple-600 to-purple-400 transition-all duration-1000" style="width: {achPercent}%"></div>
                </div>
            </div>
        </div>

        <div class="bg-slate-900/50 p-2.5 rounded-lg border border-slate-700/60 shadow-inner space-y-2.5">

            <!-- The switch comes first: it decides what the numbers below
                 it even mean. -->
            <div class="flex items-center gap-1.5">
                {#each MODES as m (m.key)}
                    <button type="button" onclick={() => setMode(m.key)}
                            aria-pressed={mode === m.key}
                            class="flex-1 text-[10px] font-bold uppercase tracking-widest py-1.5 rounded-sm border transition-colors
                                   {mode === m.key
                                     ? `bg-slate-800 ${m.accent} ${m.border}`
                                     : 'bg-slate-900/40 text-slate-500 border-slate-700/40 hover:text-slate-300'}">
                        {m.label}
                    </button>
                {/each}
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                {#each counters as stat (stat.key)}
                    <div class="flex flex-col items-center justify-center p-2 bg-slate-800/30 rounded-sm border border-slate-700/30">
                        <span class="text-[9px] text-slate-500 uppercase tracking-widest">{stat.label}</span>
                        <span class="font-bold {stat.tone} text-lg leading-tight mt-0.5">{counterValue(stat.key)}</span>
                    </div>
                {/each}
            </div>

            <!-- Always visible, even at zero: otherwise the two views would
                 have different heights, and someone who has never played that
                 mode would not learn there is anything to reach here. The unit
                 sits right behind the number rather than in a spaced-out line
                 of capitals - that reads as a sentence. -->
            <div class="flex items-center justify-between px-3 py-2 bg-slate-800/40 rounded-sm border border-slate-700/30">
                <span class="text-[10px] text-slate-400 uppercase tracking-widest">
                    Serie{#if showBest}<span class="text-slate-500 normal-case tracking-normal text-[11px] ml-2">bester Lauf: {weekBest}</span>{/if}
                </span>
                <span class="flex items-baseline gap-1.5 font-mono">
                    <span class="text-base font-bold {streak > 0 ? 'text-amber-400' : 'text-slate-500'}">{streak}</span>
                    <span class="text-[11px] text-slate-400">{streakLabel}</span>
                    <span class="text-slate-700 px-1">·</span>
                    <span class="text-[11px] text-slate-400">Rekord</span>
                    <span class="text-base font-bold {streakBest > 0 ? 'text-slate-200' : 'text-slate-500'}">{streakBest}</span>
                </span>
            </div>

            <!-- Per difficulty: replaces a meaningless overall rate. -->
            {#if hasLevels}
                <div class="space-y-1 px-1 pt-0.5">
                    {#each levels as level (level.key)}
                        <div class="flex items-center gap-2">
                            <span class="text-[9px] text-slate-500 uppercase tracking-widest w-20 shrink-0">{level.label}</span>
                            <div class="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div class="h-full {level.bar} rounded-full transition-all" style="width: {level.percent}%"></div>
                            </div>
                            <span class="font-mono text-[10px] text-slate-400 w-14 text-right shrink-0">
                                {level.survived}/{level.started}
                            </span>
                        </div>
                    {/each}
                </div>
            {:else}
                <p class="text-[10px] text-slate-600 text-center py-2">
                    {mode === 'day' ? 'Noch kein Arbeitstag begonnen.' : 'Noch keine Arbeitswoche begonnen.'}
                </p>
            {/if}

            {#if footnotes.length}
                <p class="text-[11px] text-slate-400 text-center pt-1 flex items-center justify-center gap-2 flex-wrap">
                    {#each footnotes as note, i (note.text)}
                        {#if i > 0}<span class="text-slate-600">·</span>{/if}
                        <span><span class="font-bold font-mono {note.tone}">{note.value}×</span> {note.text}</span>
                    {/each}
                </p>
            {/if}
        </div>
    </div>

    <div class="mb-8" onfocusout={unpinOnFocusOut}>
        <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">GEFUNDENE AUSRÜSTUNG</h3>
        <div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {#each normalItems as entry, i (entry.id)}
                {@render tile(entry, i)}
            {/each}
        </div>
    </div>

    {#if questItems.length > 0}
        <div class="mb-8" onfocusout={unpinOnFocusOut}>
            <h3 class="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">LEGENDÄRE TROPHÄEN</h3>
            <div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {#each questItems as entry, i (entry.id)}
                    {@render tile(entry, i)}
                {/each}
            </div>
        </div>
    {/if}

    <div>
        <h3 class="text-xs font-bold text-purple-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">ERRUNGENSCHAFTEN</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {#each achievements as row (row.ach.id)}
                <div class="flex gap-3 p-3 rounded-sm border transition-all hover:bg-slate-800 group relative
                            {row.unlocked ? `opacity-100 border-solid bg-slate-900/40 ${row.diff.border}` : 'border-slate-700 opacity-60 border-dashed grayscale bg-slate-950/30'}">
                    <div class={row.ach.img
                        ? 'w-12 h-12 shrink-0 relative z-10 transition-transform duration-300 ease-out origin-center cursor-help md:hover:scale-[2.5] md:hover:z-50'
                        : 'text-2xl shrink-0 transition-transform duration-300 ease-out origin-center cursor-help flex items-center justify-center w-12 h-12 bg-slate-900 rounded-full border border-slate-700/50 p-1 md:hover:scale-[1.5] md:hover:z-50'}>
                        {#if hasPicture(row.ach)}
                            <img src={row.ach.img} loading="eager" decoding="async" class="w-full h-full object-contain drop-shadow-md" alt={row.ach.title} onerror={() => markBroken(row.ach.img)}>
                        {:else}{row.ach.icon}{/if}
                    </div>

                    <div class="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                        <!-- items-start and no truncate: "Tanz auf dem Vulkan"
                             used to end at "Vul…". The title may wrap now; the
                             badge stays in the top right corner. -->
                        <div class="flex items-start gap-2 mb-0.5">
                            <div class="font-bold text-xs leading-tight {row.unlocked ? 'text-white' : 'text-slate-400'}">{row.ach.title}</div>
                            {#if row.unlocked}
                                <span class="text-[9px] font-bold border px-1.5 rounded-sm ml-auto shrink-0 {row.diff.badge}">{row.diff.label}</span>
                            {:else}
                                <span class="text-[9px] text-slate-500 font-bold border border-slate-700 px-1.5 rounded-sm ml-auto shrink-0">GESPERRT</span>
                            {/if}
                        </div>
                        <!-- No line-clamp: 33 of 54 texts are longer than two
                             lines of this column, and a truncated hint no
                             longer tells you what to do. The grid stretches
                             the cards of a row to the same height anyway, so
                             nothing turns into a staircase. -->
                        <div class="text-[10px] leading-tight {row.unlocked ? 'text-slate-400' : 'text-slate-500 italic'}">{row.desc}</div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}
