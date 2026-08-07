<!--
  The archive: collected items, legendary trophies and achievements.

  Renders into #archive-content whenever the modal is open. The engine only
  toggles state.archiveOpen; everything shown here is derived from
  state.archive, which the save system keeps up to date.

  Rendering is tied to the open flag so the two dozen images are not fetched
  until someone actually looks.
-->
<script>
    /* Images here load immediately on purpose (loading="eager"), not lazily.
       The archive is a modal opened for browsing — with lazy loading,
       scrolling first showed empty boxes, because the browser only requests
       the files once they become visible. These are a few small WebP files;
       fetching them all at once is the faster path. The same applies to
       TeamView. */
    // Renamed so the $state rune stays usable in this file - see the pitfall
    // noted in STRUCTURE.md.
    import { state as game } from '../engine/engine_state.svelte.js';
    import { DB } from '../data.js';

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

    const DAY_STATS = [
        { key: 'daysStarted',  label: 'Begonnen',   tone: 'text-slate-200' },
        { key: 'daysSurvived', label: 'Überlebt',   tone: 'text-emerald-400' },
        { key: 'daysRageQuit', label: 'Rage Quits', tone: 'text-orange-400' },
        { key: 'daysFired',    label: 'Gefeuert',   tone: 'text-red-500' }
    ];

    // Weekdays say more than one overall rate: someone who survived ten
    // Fridays but no Monday sees exactly that.
    const WEEKDAYS = [
        { key: 'easy',   label: 'Freitag',  bar: 'bg-green-500' },
        { key: 'normal', label: 'Mittwoch', bar: 'bg-blue-500' },
        { key: 'hard',   label: 'Montag',   bar: 'bg-red-500' }
    ];

    const weekdays = $derived(WEEKDAYS.map(d => {
        const started  = stats['started_'  + d.key] ?? 0;
        const survived = stats['survived_' + d.key] ?? 0;
        return { ...d, started, survived,
                 percent: started ? Math.round(survived / started * 100) : 0 };
    }));

    const hasWeekdays = $derived(weekdays.some(d => d.started > 0));
    const streak      = $derived(stats.streak ?? 0);
    const streakBest  = $derived(stats.streakBest ?? 0);

    // Small print: only show what actually happened. The numbers carry the
    // colour of their stat - orange for the valve, red for the boss - so the
    // line stays readable without effort.
    const footnotes = $derived([
        stats.ventSaves    ? { value: stats.ventSaves,    text: 'durch das Ventil gerettet', tone: 'text-orange-400' } : null,
        stats.warningsChef ? { value: stats.warningsChef, text: 'abgemahnt',                 tone: 'text-red-500' } : null
    ].filter(Boolean));

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
</script>

{#if game.archiveOpen}
    <div class="mb-8 flex flex-col gap-3">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="bg-slate-800/60 border border-slate-700 p-3 rounded-lg shadow-xs">
                <div class="flex justify-between items-end mb-1.5">
                    <span class="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5"><span class="text-sm">📦</span> Items</span>
                    <span class="text-xs font-mono text-slate-300">{foundItems} / {items.length}</span>
                </div>
                <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div class="h-full bg-linear-to-r from-amber-600 to-amber-400 transition-all duration-1000" style="width: {itemPercent}%"></div>
                </div>
            </div>

            <div class="bg-slate-800/60 border border-slate-700 p-3 rounded-lg shadow-xs">
                <div class="flex justify-between items-end mb-1.5">
                    <span class="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5"><span class="text-sm">🏅</span> Erfolge</span>
                    <span class="text-xs font-mono text-slate-300">{earned.length} / {DB.achievements.length}</span>
                </div>
                <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div class="h-full bg-linear-to-r from-purple-600 to-purple-400 transition-all duration-1000" style="width: {achPercent}%"></div>
                </div>
            </div>
        </div>

        <div class="bg-slate-900/50 p-2.5 rounded-lg border border-slate-700/60 shadow-inner space-y-2.5">

            <!-- Streak first: the only number that looks different tomorrow if you stop today. -->
            {#if streakBest > 0}
                <div class="flex items-center justify-between px-2 py-1.5 bg-slate-800/40 rounded-sm border border-slate-700/30">
                    <span class="text-[9px] text-slate-500 uppercase tracking-widest">Serie</span>
                    <span class="font-mono text-sm">
                        <span class="{streak > 0 ? 'text-amber-400 font-bold' : 'text-slate-500'}">{streak}</span>
                        <span class="text-slate-600 mx-1.5">·</span>
                        <span class="text-[10px] text-slate-500 uppercase tracking-widest">Rekord</span>
                        <span class="text-slate-300 font-bold ml-1">{streakBest}</span>
                    </span>
                </div>
            {/if}

            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                {#each DAY_STATS as stat (stat.key)}
                    <div class="flex flex-col items-center justify-center p-2 bg-slate-800/30 rounded-sm border border-slate-700/30">
                        <span class="text-[9px] text-slate-500 uppercase tracking-widest">{stat.label}</span>
                        <span class="font-bold {stat.tone} text-lg leading-tight mt-0.5">{stats[stat.key] ?? 0}</span>
                    </div>
                {/each}
            </div>

            <!-- Per weekday: replaces a meaningless overall rate. -->
            {#if hasWeekdays}
                <div class="space-y-1 px-1 pt-0.5">
                    {#each weekdays as day (day.key)}
                        <div class="flex items-center gap-2">
                            <span class="text-[9px] text-slate-500 uppercase tracking-widest w-14 shrink-0">{day.label}</span>
                            <div class="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div class="h-full {day.bar} rounded-full transition-all" style="width: {day.percent}%"></div>
                            </div>
                            <span class="font-mono text-[10px] text-slate-400 w-14 text-right shrink-0">
                                {day.survived}/{day.started}
                            </span>
                        </div>
                    {/each}
                </div>
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

    <div class="mb-8">
        <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">GEFUNDENE AUSRÜSTUNG</h3>
        <div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
            {#each normalItems as entry (entry.id)}
                <div class="aspect-square rounded-sm border {itemBorder(entry.unlocked, false)} flex items-center justify-center text-xl cursor-help transition-all relative group"
                     title={entry.unlocked ? entry.item.name : 'Unbekannt'}>
                    {#if !entry.unlocked}?
                    {:else if hasPicture(entry.item)}
                        <img src={entry.item.img} loading="eager" decoding="async" class="w-full h-full object-contain p-1 pointer-events-none" alt={entry.item.name} onerror={() => markBroken(entry.item.img)}>
                    {:else}
                        <!-- No picture, or the file is missing: the symbol keeps the spot from sitting empty. -->
                        <span class="pointer-events-none">{entry.item.icon}</span>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    {#if questItems.length > 0}
        <div class="mb-8">
            <h3 class="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">LEGENDÄRE TROPHÄEN</h3>
            <div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                {#each questItems as entry (entry.id)}
                    <div class="aspect-square rounded-sm border {itemBorder(entry.unlocked, true)} flex items-center justify-center text-xl cursor-help transition-all relative group"
                         title={entry.unlocked ? entry.item.name : '???'}>
                        {#if !entry.unlocked}?
                        {:else if hasPicture(entry.item)}
                            <img src={entry.item.img} loading="eager" decoding="async" class="w-full h-full object-contain p-1 pointer-events-none" alt={entry.item.name} onerror={() => markBroken(entry.item.img)}>
                        {:else}
                            <!-- No picture, or the file is missing: the symbol keeps the spot from sitting empty. -->
                            <span class="pointer-events-none">{entry.item.icon}</span>
                        {/if}
                    </div>
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

                    <div class="flex-1 min-w-0 flex flex-col justify-center">
                        <div class="flex items-center gap-2 mb-0.5">
                            <div class="font-bold text-xs truncate {row.unlocked ? 'text-white' : 'text-slate-400'}">{row.ach.title}</div>
                            {#if row.unlocked}
                                <span class="text-[9px] font-bold border px-1.5 rounded-sm ml-auto {row.diff.badge}">{row.diff.label}</span>
                            {:else}
                                <span class="text-[9px] text-slate-500 font-bold border border-slate-700 px-1.5 rounded-sm ml-auto">GESPERRT</span>
                            {/if}
                        </div>
                        <div class="text-[10px] leading-tight line-clamp-2 {row.unlocked ? 'text-slate-400' : 'text-slate-500 italic'}">{row.desc}</div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
{/if}
