<!--
  The week leaderboards, desktop only.

  Three Steam boards, one per week level, and an "All" tab that merges them
  in the game (engine/leaderboard.js, mergeBoards). Steam ranks within one
  board, so the numbers on "All" are the combined list's own.

  The look is draft A of three the operator was shown (01.11.2026): the top
  three on a podium in gold, silver and bronze, everyone below on a row with a
  bar for the week - one segment per day, filled up to the day the week
  ended, that last one in the colour of what ended it. A row opens to the
  four figures it ended on and the week day by day.

  Everything past the score comes out of the entry's detail values, read
  through decodeDetails(); an entry it cannot read shows its score alone
  rather than wrong figures.

  Mounted on its own like GlobalStatsView, so it reads state rather than
  props. engine.openLeaderboard() fetches; this file only draws.
-->
<script>
    // Imported as `game`: a local binding called `state` would make the
    // $state rune ambiguous (Svelte reads $state as a store subscription).
    import { state as game } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { formatClock } from '../engine/engine_state.svelte.js';
    import { dayName } from '../engine/engine_week.js';
    import { decodeDetails, mergeBoards, LEVELS, WEEK_MINUTES, COMPOSURE_MAX } from '../engine/leaderboard.js';
    import { t, tf, language } from '../i18n/i18n.svelte.js';

    const view = $derived(game.leaderboard);

    // Which tab opens: the level of the week that just ended, else the
    // player's preset, else everything. A tab picked by hand holds until the
    // window is opened again - leaderboardOpens counts the openings.
    let picked = $state(null);
    $effect(() => {
        game.leaderboardOpens;
        picked = null;
    });
    const preset = $derived(LEVELS.includes(game.defaultWeekDiff) ? game.defaultWeekDiff : 'all');
    const tab = $derived(picked ?? game.weekSubmit?.level ?? preset);

    // Whole class names, never composed - see CLAUDE.md.
    // i18n-uses: leaderboard.tab.all, week.diff.easy, week.diff.normal, week.diff.hard
    const TABS = [
        { key: 'all',    label: 'leaderboard.tab.all', on: 'bg-yellow-400/15 text-yellow-200 border-yellow-400/70' },
        { key: 'easy',   label: 'week.diff.easy',      on: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/70' },
        { key: 'normal', label: 'week.diff.normal',    on: 'bg-amber-500/15 text-amber-300 border-amber-500/70' },
        { key: 'hard',   label: 'week.diff.hard',      on: 'bg-rose-500/15 text-rose-300 border-rose-500/70' }
    ];
    const LEVEL = {
        easy:   { avatar: 'bg-emerald-400 text-emerald-950', pill: 'text-emerald-300 border-emerald-500/50 bg-emerald-500/10' },
        normal: { avatar: 'bg-amber-400 text-amber-950',     pill: 'text-amber-300 border-amber-500/50 bg-amber-500/10' },
        hard:   { avatar: 'bg-rose-400 text-rose-950',       pill: 'text-rose-300 border-rose-500/50 bg-rose-500/10' }
    };
    // Gold, silver, bronze - the podium's three places.
    const MEDAL = [
        { avatar: 'bg-yellow-400 text-yellow-950', block: 'h-24 bg-yellow-400/15 border-yellow-400', points: 'text-yellow-200', ring: 'ring-yellow-400/60' },
        { avatar: 'bg-slate-300 text-slate-900',   block: 'h-16 bg-slate-300/10 border-slate-300',   points: 'text-slate-100',  ring: 'ring-slate-300/60' },
        { avatar: 'bg-amber-600 text-amber-950',   block: 'h-12 bg-amber-600/15 border-amber-600',   points: 'text-amber-400',  ring: 'ring-amber-600/60' }
    ];
    // What ended the week: its colour on the last segment of the bar, and on
    // the line that names it. A finished week fills all five in green, a
    // gala with gold on the Friday.
    const OUTCOME = {
        won:     { seg: 'bg-emerald-500', text: 'text-emerald-400' },
        gala:    { seg: 'bg-yellow-300',  text: 'text-yellow-300' },
        rage:    { seg: 'bg-orange-500',  text: 'text-orange-400' },
        chef:    { seg: 'bg-red-500',     text: 'text-red-400' },
        tickets: { seg: 'bg-purple-500',  text: 'text-purple-400' }
    };
    // i18n-uses: leaderboard.legend.won, leaderboard.legend.gala, leaderboard.cause.rage, leaderboard.cause.chef, leaderboard.cause.tickets
    const LEGEND = [
        { key: 'won',     label: 'leaderboard.legend.won' },
        { key: 'gala',    label: 'leaderboard.legend.gala' },
        { key: 'rage',    label: 'leaderboard.cause.rage' },
        { key: 'chef',    label: 'leaderboard.cause.chef' },
        { key: 'tickets', label: 'leaderboard.cause.tickets' }
    ];
    // i18n-uses: leaderboard.scope.global, leaderboard.scope.friends
    const SCOPES = ['global', 'friends'];
    // The key to the chips, in their colours, where a line of grey text
    // used to say "F Faulheit · A Aggro · C Chef".
    // i18n-uses: leaderboard.key.tickets, leaderboard.key.l, leaderboard.key.a, leaderboard.key.b
    const KEY = [
        { label: 'leaderboard.key.tickets', cls: 'bg-purple-500/15 text-purple-300' },
        { label: 'leaderboard.key.l',       cls: 'bg-emerald-500/15 text-emerald-300' },
        { label: 'leaderboard.key.a',       cls: 'bg-orange-500/15 text-orange-300' },
        { label: 'leaderboard.key.b',       cls: 'bg-red-500/15 text-red-300' }
    ];

    const num = (value) => Number(value).toLocaleString(language());

    // Two letters for the avatar: the first of two words where there are
    // two ("Lisa M." is LM), else the first two of the one ("root" is RO).
    function initials(name) {
        const parts = String(name || '').split(/[\s_.\-]+/).filter(p => /[\p{L}\p{N}]/u.test(p));
        const two = parts.length >= 2 ? parts[0][0] + parts[1][0]
                                      : (parts[0] ?? '').replace(/[^\p{L}\p{N}]/gu, '').slice(0, 2);
        return two.toUpperCase() || '?';
    }

    const outcomeOf = (info) => (!info ? null : info.won ? (info.cause === 'gala' ? 'gala' : 'won') : info.cause);

    // Five segments: the days before the end in a quieter green, the day it
    // ended in the colour of what ended it, the rest not reached.
    function segments(info) {
        if (!info) return Array(5).fill('bg-slate-800');
        const last = OUTCOME[outcomeOf(info)]?.seg ?? 'bg-slate-500';
        return [1, 2, 3, 4, 5].map(d => (d < info.day ? 'bg-emerald-500/50' : d === info.day ? last : 'bg-slate-800'));
    }

    const shape = (entry, level) => ({ ...entry, level, info: decodeDetails(entry.details) });

    // The rows on show. On a level tab they keep Steam's order and rank; on
    // "All" the merged order, numbered from one.
    const rows = $derived.by(() => {
        const boards = view.boards;
        if (!boards) return [];
        if (tab === 'all') {
            return mergeBoards(boards).map((entry, i) => ({ ...shape(entry, entry.level), place: i + 1 }));
        }
        return (boards[tab] ?? []).map(entry => ({ ...shape(entry, tab), place: entry.rank }));
    });
    // The podium shows the first three in the order 2 - 1 - 3.
    const podium = $derived([rows[1], rows[0], rows[2]].map((row, i) => (row ? { row, medal: [1, 0, 2][i] } : null)).filter(Boolean));
    const rest = $derived(rows.slice(3));

    // The player's own entry when the list does not reach it - the global
    // top 100 of a board with more players. "All" has no such place to give.
    const mineBelow = $derived.by(() => {
        if (tab === 'all') return null;
        const mine = view.mine?.[tab];
        if (!mine || rows.some(r => r.me)) return null;
        return { ...shape(mine, tab), place: mine.rank };
    });
    const mineMissing = $derived(tab !== 'all' && !view.loading && !view.failed && view.boards && !view.mine?.[tab]);

    let open = $state(null);
    const rowKey = (row) => `${row.level}:${row.steamId}`;
    const toggle = (row) => { open = open === rowKey(row) ? null : rowKey(row); };
    const openPodium = $derived(podium.find(p => rowKey(p.row) === open)?.row ?? null);

    function result(info) {
        if (!info) return '';
        if (info.won) return t(info.cause === 'gala' ? 'leaderboard.result.gala' : 'leaderboard.result.won');
        return tf('leaderboard.result.lost', {
            cause: t(`leaderboard.cause.${info.cause}`),
            day: dayName(info.day - 1),
            time: formatClock(info.time)
        });
    }
    // The four figures as chips, in the colours of the status bars.
    const chips = (v) => [
        { text: tf(v.tickets === 1 ? 'leaderboard.chip.ticketsOne' : 'leaderboard.chip.tickets', { n: v.tickets }), cls: 'bg-purple-500/15 text-purple-300' },
        { text: tf('leaderboard.chip.l', { n: v.l }), cls: 'bg-emerald-500/15 text-emerald-300' },
        { text: tf('leaderboard.chip.a', { n: v.a }), cls: 'bg-orange-500/15 text-orange-300' },
        { text: tf('leaderboard.chip.b', { n: v.b }), cls: 'bg-red-500/15 text-red-300' }
    ];
</script>

{#snippet avatar(entry, cls, size)}
    <span class="{size} {cls} shrink-0 rounded-full flex items-center justify-center font-black select-none" aria-hidden="true">{initials(entry.name)}</span>
{/snippet}

{#snippet levelPill(level)}
    <span class="shrink-0 text-[0.625rem] font-bold uppercase tracking-widest border rounded-full px-2 py-px {LEVEL[level].pill}">{t(`week.diff.${level}`)}</span>
{/snippet}

<!-- The title is for the pointer: the result in words without opening the
     row. A screen reader gets it from the sr-only line beside the bar. -->
{#snippet bar(info, width)}
    <span class="flex gap-0.5 shrink-0 {width}" aria-hidden="true" title={result(info)}>
        {#each segments(info) as seg, i (i)}
            <span class="flex-1 h-2 rounded-xs {seg}"></span>
        {/each}
    </span>
{/snippet}

{#snippet details(entry)}
    <div class="mt-1.5 mb-2 p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs space-y-3">
        {#if entry.info}
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span class="font-bold {OUTCOME[outcomeOf(entry.info)]?.text ?? 'text-slate-300'}">{result(entry.info)}</span>
                {#each chips(entry.info) as chip, i (i)}
                    <span class="font-mono px-1.5 py-0.5 rounded-sm {chip.cls}">{chip.text}</span>
                {/each}
            </div>
            <div>
                <div class="text-[0.625rem] font-bold uppercase tracking-widest text-slate-400 mb-1.5">{t('leaderboard.days')}</div>
                <ul class="space-y-1 font-mono">
                    {#each entry.info.days as d, i (i)}
                        <li class="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span class="w-24 shrink-0 text-slate-300">{dayName(i)}</span>
                            {#if d}
                                {#each chips(d) as chip, j (j)}
                                    <span class="px-1.5 rounded-sm {chip.cls}">{chip.text}</span>
                                {/each}
                            {:else}
                                <span class="text-slate-400 italic">{t('leaderboard.notReached')}</span>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </div>
            {#if entry.info.valve || entry.info.warning}
                <div class="flex flex-wrap gap-2">
                    {#if entry.info.valve}
                        <span class="text-[0.625rem] font-bold tracking-widest border rounded-sm px-1.5 py-0.5 text-orange-400 border-orange-500/60">{t('dayReport.valveUsed')}</span>
                    {/if}
                    {#if entry.info.warning}
                        <span class="text-[0.625rem] font-bold tracking-widest border rounded-sm px-1.5 py-0.5 text-red-400 border-red-500/60">{t('team.reprimanded')}</span>
                    {/if}
                </div>
            {/if}
        {:else}
            <span class="text-slate-400 italic">{t('leaderboard.noDetails')}</span>
        {/if}
    </div>
{/snippet}

{#snippet row(entry)}
    {@const expanded = open === rowKey(entry)}
    <li>
        <button type="button" onclick={() => toggle(entry)} aria-expanded={expanded}
                class="w-full text-left px-3 py-2 rounded-lg border transition-colors flex items-center gap-3 min-w-0
                       {entry.me ? 'bg-amber-500/10 border-amber-500/60' : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600'}">
            <span class="w-8 sm:w-9 shrink-0 font-mono font-bold text-right text-slate-400">#{entry.place}</span>
            {@render avatar(entry, LEVEL[entry.level].avatar, 'w-7 h-7 text-[0.625rem]')}
            <!-- On a narrow window the bar moves under the name: beside it,
                 bar and points left the name no room at all. -->
            <span class="flex-1 min-w-0 flex flex-col gap-1">
                <span class="flex items-center gap-2 min-w-0">
                    <span class="truncate font-bold text-slate-100">{entry.name || t('leaderboard.unknownName')}</span>
                    {#if entry.me}
                        <span class="shrink-0 text-[0.625rem] font-bold uppercase tracking-widest text-amber-400">{t('leaderboard.you')}</span>
                    {/if}
                    {#if tab === 'all'}<span class="hidden sm:inline-flex">{@render levelPill(entry.level)}</span>{/if}
                </span>
                <span class="sm:hidden">{@render bar(entry.info, 'w-full')}</span>
            </span>
            <span class="hidden sm:flex">{@render bar(entry.info, 'w-32')}</span>
            <span class="sr-only">{result(entry.info)}</span>
            <span class="w-14 sm:w-16 shrink-0 text-right font-mono font-bold text-slate-100">{num(entry.score)}</span>
        </button>
        {#if expanded}{@render details(entry)}{/if}
    </li>
{/snippet}

<div class="flex flex-col gap-4">
    <!-- Back where it came from: the menu page, or the end of a week. -->
    <div>
        <button type="button" onclick={() => engine.closeLeaderboard()}
                class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
            <span aria-hidden="true">◀</span> {t(game.menuReturn ? 'settings.backToMenu' : 'stats.back')}
        </button>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {#each TABS as item (item.key)}
            <button type="button" onclick={() => { picked = item.key; open = null; }}
                    aria-pressed={tab === item.key}
                    class="min-w-0 truncate text-[0.625rem] font-bold uppercase tracking-widest py-2 px-1 rounded-lg border transition-colors
                           {tab === item.key ? item.on : 'bg-slate-900/40 text-slate-400 border-slate-700/40 hover:text-slate-200 hover:border-slate-600'}">
                {t(item.label)}
            </button>
        {/each}
    </div>

    <div class="flex items-center justify-between gap-3 flex-wrap">
        <div class="flex gap-1 bg-slate-950/60 border border-slate-800 rounded-lg p-1">
            {#each SCOPES as scope (scope)}
                <button type="button" onclick={() => engine.loadLeaderboard(scope)}
                        aria-pressed={view.scope === scope}
                        class="text-xs font-bold px-3 py-1 rounded-md transition-colors
                               {view.scope === scope ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'}">
                    {t(`leaderboard.scope.${scope}`)}
                </button>
            {/each}
        </div>
        {#if tab !== 'all' && view.mine?.[tab]}
            <span class="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/40 rounded-full px-3 py-1 font-mono">
                {tf('leaderboard.mineRank', { rank: num(view.mine[tab].rank) })}
            </span>
        {/if}
    </div>

    {#if view.loading}
        <div class="text-center text-slate-400 animate-pulse py-12 font-mono text-sm">{t('leaderboard.loading')}</div>
    {:else if view.failed}
        <div class="text-center text-red-400 py-12 font-bold">{t('leaderboard.failed')}</div>
    {:else if rows.length === 0 && !mineBelow}
        <div class="text-center py-10 px-4">
            <img src="assets/img/ui/ui_medal.webp" alt="" width="48" height="48" class="w-12 h-12 mx-auto mb-3 opacity-60 grayscale select-none"
                 onerror={(e) => e.currentTarget.remove()}>
            <p class="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
                {t(view.scope === 'friends' ? 'leaderboard.emptyFriends' : 'leaderboard.empty')}
            </p>
        </div>
    {:else}
        <!-- The podium. Each place opens like a row; its details hang under
             the podium as a whole, where there is room for them. -->
        <div class="flex items-end gap-2 sm:gap-4 pt-2">
            {#each podium as p (rowKey(p.row))}
                {@const m = MEDAL[p.medal]}
                <button type="button" onclick={() => toggle(p.row)} aria-expanded={open === rowKey(p.row)}
                        class="flex-1 min-w-0 flex flex-col items-center gap-1.5 group">
                    {@render avatar(p.row, `${m.avatar} ${p.row.me ? 'ring-4 ring-amber-400' : `ring-2 ${m.ring}`}`, p.medal === 0 ? 'w-14 h-14 text-base' : 'w-11 h-11 text-sm')}
                    <span class="max-w-full truncate text-sm font-bold text-slate-100 group-hover:text-white">{p.row.name || t('leaderboard.unknownName')}</span>
                    {#if p.row.me}
                        <span class="text-[0.625rem] font-bold uppercase tracking-widest text-amber-400">{t('leaderboard.you')}</span>
                    {/if}
                    {#if tab === 'all'}
                        {@render levelPill(p.row.level)}
                    {:else if p.row.info}
                        <span class="text-[0.625rem] font-bold {OUTCOME[outcomeOf(p.row.info)]?.text ?? 'text-slate-300'}">{t(LEGEND.find(l => l.key === outcomeOf(p.row.info))?.label ?? 'leaderboard.legend.won')}</span>
                    {/if}
                    <span class="w-full {m.block} border-t-4 rounded-t-lg flex flex-col items-center justify-start pt-2 transition-colors group-hover:brightness-125">
                        <span class="font-mono font-black text-lg sm:text-xl leading-none {m.points}">{num(p.row.score)}</span>
                        <span class="text-[0.625rem] text-slate-300 mt-1">{t('leaderboard.pointsUnit')}</span>
                    </span>
                </button>
            {/each}
        </div>
        {#if openPodium}{@render details(openPodium)}{/if}

        {#if rest.length || mineBelow}
            <ol class="space-y-1.5">
                {#each rest as entry (rowKey(entry))}
                    {@render row(entry)}
                {/each}
            </ol>
        {/if}
        {#if mineBelow}
            <div class="text-center text-slate-400 leading-none -my-1" aria-hidden="true">⋮</div>
            <ol class="space-y-1.5">{@render row(mineBelow)}</ol>
        {/if}

        <!-- What the colours on the bars mean. -->
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.625rem] text-slate-300">
            {#each LEGEND as item (item.key)}
                <span class="flex items-center gap-1.5"><span class="w-3 h-2 rounded-xs {OUTCOME[item.key].seg}"></span>{t(item.label)}</span>
            {/each}
        </div>
    {/if}

    {#if mineMissing}
        <p class="text-xs text-slate-400 italic">{t('leaderboard.noEntry')}</p>
    {/if}

    <div class="border-t border-slate-800 pt-3 flex flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2">
            {#each KEY as item (item.label)}
                <span class="text-[0.625rem] font-mono font-bold px-2 py-0.5 rounded-sm {item.cls}">{t(item.label)}</span>
            {/each}
        </div>
        <div class="flex gap-3 items-start rounded-lg bg-slate-800/40 border border-slate-700/50 p-3">
            <img src="assets/img/ui/ui_info.webp" alt="" width="18" height="18" class="w-[18px] h-[18px] shrink-0 mt-0.5 select-none"
                 onerror={(e) => e.currentTarget.remove()}>
            <div class="flex flex-col gap-1.5 text-xs text-slate-300 leading-snug min-w-0">
                <p>{tf('leaderboard.scoring', { max: num(WEEK_MINUTES), bonus: num(COMPOSURE_MAX) })}</p>
                {#if tab === 'all'}<p class="text-slate-400">{t('leaderboard.allNote')}</p>{/if}
            </div>
        </div>
    </div>
</div>
