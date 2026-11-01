<!--
  The week leaderboards, desktop only.

  Three Steam boards, one per week level, and an "All" tab that merges them
  in the game (engine/leaderboard.js, mergeBoards). Steam ranks within one
  board, so the numbers on "All" are the combined list's own.

  A row says how far the week went - survived, or the day, the time and what
  ended it - with the four figures it ended on, and opens to the week day by
  day. Everything past the score comes out of the entry's detail values, read
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

    // i18n-uses: leaderboard.tab.all, week.diff.easy, week.diff.normal, week.diff.hard
    const TABS = [
        { key: 'all',    label: 'leaderboard.tab.all', accent: 'text-amber-400 border-amber-500/60' },
        { key: 'easy',   label: 'week.diff.easy',      accent: 'text-emerald-400 border-emerald-500/60' },
        { key: 'normal', label: 'week.diff.normal',    accent: 'text-amber-400 border-amber-500/60' },
        { key: 'hard',   label: 'week.diff.hard',      accent: 'text-red-400 border-red-500/60' }
    ];
    // Whole class names, never composed - see CLAUDE.md.
    const BADGE = {
        easy:   'text-emerald-400 border-emerald-700/60',
        normal: 'text-amber-400 border-amber-700/60',
        hard:   'text-red-400 border-red-700/60'
    };
    // i18n-uses: leaderboard.scope.global, leaderboard.scope.friends
    const SCOPES = ['global', 'friends'];

    const num = (value) => Number(value).toLocaleString(language());

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

    // i18n-uses: leaderboard.cause.rage, leaderboard.cause.chef, leaderboard.cause.tickets
    function result(info) {
        if (!info) return '';
        if (info.won) return t(info.cause === 'gala' ? 'leaderboard.result.gala' : 'leaderboard.result.won');
        return tf('leaderboard.result.lost', {
            cause: t(`leaderboard.cause.${info.cause}`),
            day: dayName(info.day - 1),
            time: formatClock(info.time)
        });
    }
    const values = (v) => tf(v.tickets === 1 ? 'week.summary.valuesOne' : 'week.summary.values',
        { tickets: v.tickets, fl: v.l, al: v.a, cr: v.b });

    const PLACE_TONE = ['text-amber-300', 'text-slate-200', 'text-orange-400'];
    const placeTone = (place) => PLACE_TONE[place - 1] ?? 'text-slate-400';
</script>

{#snippet row(entry)}
    {@const expanded = open === rowKey(entry)}
    <li>
        <button type="button" onclick={() => toggle(entry)} aria-expanded={expanded}
                class="w-full text-left px-3 py-2.5 rounded-lg border transition-colors flex flex-col gap-1
                       {entry.me ? 'bg-amber-950/30 border-amber-700/60' : 'bg-slate-800/50 border-slate-700/50 hover:bg-slate-800'}">
            <span class="flex items-baseline gap-3 min-w-0">
                <span class="w-10 shrink-0 font-mono font-bold text-right {placeTone(entry.place)}">#{entry.place}</span>
                <span class="flex-1 min-w-0 flex items-baseline gap-2">
                    <span class="truncate font-bold text-slate-100">{entry.name || t('leaderboard.unknownName')}</span>
                    {#if entry.me}
                        <span class="shrink-0 text-[0.625rem] font-bold uppercase tracking-widest text-amber-400">{t('leaderboard.you')}</span>
                    {/if}
                </span>
                <span class="shrink-0 font-mono font-bold text-slate-100">{tf('leaderboard.points', { points: num(entry.score) })}</span>
            </span>
            <!-- The level badge sits down here rather than beside the name: on
                 a narrow window "IN NEED OF LEAVE" left the name one letter. -->
            {#if entry.info || tab === 'all'}
                <span class="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 sm:pl-13 min-w-0 text-xs">
                    {#if tab === 'all'}
                        <span class="shrink-0 text-[0.625rem] font-bold uppercase tracking-widest border rounded-sm px-1.5 {BADGE[entry.level]}">{t(`week.diff.${entry.level}`)}</span>
                    {/if}
                    {#if entry.info}
                    <span class="{entry.info.won ? 'text-emerald-400' : 'text-slate-300'} min-w-0">{result(entry.info)}</span>
                    <span class="font-mono text-slate-400 min-w-0">{values(entry.info)}</span>
                    {/if}
                </span>
            {/if}
        </button>

        {#if expanded && entry.info}
            <div class="mt-1 sm:ml-13 mr-1 mb-2 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs">
                <div class="text-[0.625rem] font-bold uppercase tracking-widest text-slate-400 mb-2">{t('leaderboard.days')}</div>
                <ul class="space-y-1 font-mono">
                    {#each entry.info.days as d, i (i)}
                        <li class="flex gap-3">
                            <span class="w-24 shrink-0 text-slate-300">{dayName(i)}</span>
                            {#if d}
                                <span class="text-slate-200 min-w-0">{values(d)}</span>
                            {:else}
                                <span class="text-slate-400 italic">{t('leaderboard.notReached')}</span>
                            {/if}
                        </li>
                    {/each}
                </ul>
                {#if entry.info.valve || entry.info.warning}
                    <div class="flex flex-wrap gap-2 mt-3">
                        {#if entry.info.valve}
                            <span class="text-[0.625rem] font-bold tracking-widest border rounded-sm px-1.5 py-0.5 text-orange-400 border-orange-500/60">{t('dayReport.valveUsed')}</span>
                        {/if}
                        {#if entry.info.warning}
                            <span class="text-[0.625rem] font-bold tracking-widest border rounded-sm px-1.5 py-0.5 text-red-400 border-red-500/60">{t('team.reprimanded')}</span>
                        {/if}
                    </div>
                {/if}
            </div>
        {/if}
    </li>
{/snippet}

<div class="flex flex-col gap-4">
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {#each TABS as item (item.key)}
            <button type="button" onclick={() => { picked = item.key; open = null; }}
                    aria-pressed={tab === item.key}
                    class="min-w-0 truncate text-[0.625rem] font-bold uppercase tracking-widest py-2 px-1 rounded-lg border transition-colors
                           {tab === item.key ? `bg-slate-800 ${item.accent}` : 'bg-slate-900/40 text-slate-400 border-slate-700/40 hover:text-slate-300'}">
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
            <span class="text-xs text-amber-400 font-mono">{tf('leaderboard.mineRank', { rank: num(view.mine[tab].rank) })}</span>
        {/if}
    </div>

    {#if view.loading}
        <div class="text-center text-slate-400 animate-pulse py-10 font-mono text-sm">{t('leaderboard.loading')}</div>
    {:else if view.failed}
        <div class="text-center text-red-400 py-10 font-bold">{t('leaderboard.failed')}</div>
    {:else if rows.length === 0 && !mineBelow}
        <p class="text-center text-slate-400 py-10 text-sm leading-relaxed max-w-sm mx-auto">
            {t(view.scope === 'friends' ? 'leaderboard.emptyFriends' : 'leaderboard.empty')}
        </p>
    {:else}
        <ol class="space-y-1.5">
            {#each rows as entry (rowKey(entry))}
                {@render row(entry)}
            {/each}
        </ol>
        {#if mineBelow}
            <div class="text-center text-slate-400 leading-none" aria-hidden="true">⋮</div>
            <ol class="space-y-1.5">{@render row(mineBelow)}</ol>
        {/if}
    {/if}

    {#if mineMissing}
        <p class="text-xs text-slate-400 italic">{t('leaderboard.noEntry')}</p>
    {/if}

    <div class="border-t border-slate-800 pt-3 space-y-1.5 text-xs text-slate-400 leading-snug">
        <p>{tf('leaderboard.scoring', { max: num(WEEK_MINUTES), bonus: num(COMPOSURE_MAX) })}</p>
        {#if tab === 'all'}<p>{t('leaderboard.allNote')}</p>{/if}
        <p class="font-mono">{t('week.summary.legend')}</p>
    </div>
</div>
