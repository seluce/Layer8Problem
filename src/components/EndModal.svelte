<!--
  The big screen in the middle: end of day, defeat, warnings.

  Top to bottom: title, one sentence on the outcome, the balance sheet with
  the cause highlighted, and below that the curve and the logbook, both
  collapsible. The order is deliberate — the message first, then the numbers,
  then the analysis for whoever wants it.

  Until v4.0.0 all of this arrived from the engine as one HTML string. Now it
  hands over fields (lead, cause, diary) and the parts are components of their
  own. `text` still exists: a warning brings a line of its own.

  Since 6.1 the screen renders rather than repeats. Title and lead arrive as
  recipes, the week balance and the gala report as snapshots of numbers and ids,
  the diary as the draw it was made from — so all of it follows a language switch
  where it stands. The modal is held open for as long as the player wants to read
  it, which makes it the last place in the game that could store a finished
  sentence, and it no longer does.
-->
<script>
    // Renamed so the $state rune stays usable in this file - see the pitfall
    // noted in STRUCTURE.md.
    import { state as game } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import DayChart from './DayChart.svelte';
    import DayReport from './DayReport.svelte';
    import DiaryEntry from './DiaryEntry.svelte';
    import PartyReport from './PartyReport.svelte';
    import WeekBalance from './WeekBalance.svelte';
    import { renderRecipe } from '../engine/recipe.js';
    import { t, tf } from '../i18n/i18n.svelte.js';

    const modal = $derived(game.modal);

    // A recorded line as it should read right now. A warning still hands over a
    // finished string - it is dismissed with a keystroke and has no diary under
    // it - so both forms are accepted and only one of them is a recipe.
    const say = (value) => (typeof value === 'string' ? value : renderRecipe(value) ?? '');

    const title = $derived(say(modal.title));
    const lead = $derived(say(modal.lead));
    const nextDay = $derived(say(modal.nextDay));
    const sleep = $derived(modal.night?.sleep ? say(modal.night.sleep) : '');

    // Anyone who always wants the curve can set that in the options.
    let showChart = $state(game.autoChart ?? false);
    let showDiary = $state(false);

    // The colour follows the outcome, not the wording. It used to be picked by
    // searching the title for 'FEIERABEND', 'ÜBERLEBT', 'GEFEUERT' and the
    // like - words that come out of the dictionary and are already English on
    // the other side, so a survived week would have been painted in the colour
    // of a failure with nothing to report it. The end object has carried
    // `cause` and `isWin` all along.
    const THEME = {
        party: { title: 'text-pink-500',   border: 'border-pink-500' },
        win:   { title: 'text-green-500',  border: 'border-green-500' },
        rage:  { title: 'text-orange-500', border: 'border-orange-500' },
        loss:  { title: 'text-red-500',    border: 'border-red-600' }
    };

    const theme = $derived((() => {
        // The gala is a win too, so it has to be asked about first.
        if (modal.cause === 'party') return THEME.party;
        if (modal.isWin) return THEME.win;
        // cause for an ending, tone for the aggro valve's warning box.
        if (modal.cause === 'rage' || modal.tone === 'rage') return THEME.rage;
        return THEME.loss;
    })());

    // Anything that ends the run needs a reload; a mere warning can be
    // dismissed and play continues. showEnd() marks every ending with isEnd,
    // and the three showModal() callers (valve, valve, ticket jam) pass false -
    // so the flag alone answers this, and the list of German title fragments
    // that used to stand beside it answered nothing it did not.
    const isFinal = $derived(!!modal.isEnd);

    const hasChart = $derived((game.statHistory?.length ?? 0) > 2);
    const hasDiary = $derived(!!modal.diary);

    // A finished week day (Monday to Thursday): not an ending, the run
    // carries on tomorrow - so no reload, and the baggage block below.
    const isNight = $derived(!!modal.isNight);
    const rnd = (v) => Math.round(v ?? 0);

    // Declared here rather than beside the loop in the markup: the mark is a
    // line comment, and markup only has HTML comments - whose closing bracket
    // ends up inside the key.
    // i18n-uses: week.short.mon, week.short.tue, week.short.wed
    // i18n-uses: week.short.thu, week.short.fri

    // Context: what this day means for the career. The counters live in the
    // archive and survive a restart, which turns single days into a run.
    const stats = $derived(game.archive?.stats ?? {});
    // A week run counts weeks, not days - "Arbeitstag Nr. 24" on a Friday
    // balance sheet described the wrong unit.
    const tally = $derived(
        modal.isWeek
            ? ((stats.weeksStarted ?? 0) > 1
                ? tf('end.tally.week', { no: stats.weeksStarted, survived: stats.weeksSurvived ?? 0 })
                : null)
            : ((stats.daysStarted ?? 0) > 1
                ? tf('end.tally.day', { no: stats.daysStarted, survived: stats.daysSurvived ?? 0 })
                : null)
    );
</script>

{#if modal.open}
    <!-- Keeps the id: the keyboard handlers in engine.js find the confirm
         button through #modal-content. -->
    <div id="modal-content" class="max-w-2xl w-full bg-slate-900 border-2 {theme.border} p-8 rounded-xl text-center shadow-2xl max-h-[90vh] overflow-y-auto">

        <h1 class="text-4xl font-black {theme.title} mb-1">{title}</h1>

        {#if tally && isFinal}
            <div class="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4">{tally}</div>
        {:else}
            <div class="mb-4"></div>
        {/if}

        {#if lead}
            <p class="text-lg text-slate-300 italic mb-2">{lead}</p>
        {/if}

        <!-- A warning brings its own line. It comes from the engine, never from
             the player. -->
        {#if modal.text}
            <div class="text-lg text-slate-300 italic">{@html modal.text}</div>
        {/if}

        <!-- The gala's summary, and under it the week balance. Both used to be
             HTML built by the engine and handed over inside `text`. -->
        {#if modal.party}
            <PartyReport report={modal.party} />
        {/if}
        {#if modal.balance}
            <WeekBalance balance={modal.balance} />
        {/if}

        {#if isFinal}
            <DayReport cause={modal.cause}
                       week={modal.isWeek ? { mode: modal.weekMode, day: modal.weekDay } : null} />
        {/if}

        <!-- The night: what tomorrow inherits, before and after sleep. The
             transparency is the feature - evenings are for planning. -->
        {#if isNight && modal.night}
            <div class="bg-slate-950 border border-slate-700 rounded-lg p-4 my-3 text-left font-mono text-xs space-y-1.5">
                <!-- Where in the week we are. The balance sheet only shows up
                     at the end, so until then the night is the only place that
                     can put a day into context. -->
                <div class="flex items-center gap-1.5 mb-3">
                    {#each ['mon','tue','wed','thu','fri'] as day, i}
                        <span class="flex-1 text-center text-[9px] font-bold uppercase tracking-widest py-1 rounded-sm border
                                     {i < game.week.dayIndex
                                        ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400'
                                        : i === game.week.dayIndex
                                          ? 'bg-slate-800 border-slate-500 text-white'
                                          : 'bg-slate-900/40 border-slate-800 text-slate-600'}">
                            {t(`week.short.${day}`)}
                        </span>
                    {/each}
                </div>
                <div class="text-[10px] uppercase tracking-widest text-purple-400 mb-2">{tf('end.carry.title', { day: nextDay })}</div>
                <div class="flex justify-between"><span class="flex items-center gap-1.5"><img src="assets/img/ui/ui_ticket.webp" alt="" width="16" height="16" class="w-4 h-4 shrink-0 select-none" onerror={(e) => e.currentTarget.outerHTML = '🎫'}>{t('stat.tickets')}</span>
                    <span><span class="text-slate-500">{modal.night.ticketsBefore}</span> → <span class="{modal.night.ticketsAfter >= 3 ? 'text-red-400 font-bold' : 'text-white'}">{modal.night.ticketsAfter}</span></span></div>
                <div class="flex justify-between"><span class="flex items-center gap-1.5"><img src="assets/img/ui/ui_angry.webp" alt="" width="16" height="16" class="w-4 h-4 shrink-0 select-none" onerror={(e) => e.currentTarget.outerHTML = '😡'}>{t('stat.aggro')}</span>
                    <span><span class="text-slate-500">{rnd(modal.night.alBefore)} %</span> → <span class="{rnd(modal.night.alAfter) >= 50 ? 'text-amber-400 font-bold' : 'text-white'}">{rnd(modal.night.alAfter)} %</span></span></div>
                <div class="flex justify-between"><span class="flex items-center gap-1.5"><img src="assets/img/ui/ui_eye.webp" alt="" width="16" height="16" class="w-4 h-4 shrink-0 select-none" onerror={(e) => e.currentTarget.outerHTML = '📡'}>{t('stat.radar')}</span>
                    <span><span class="text-slate-500">{rnd(modal.night.crBefore)} %</span> → <span class="{rnd(modal.night.crAfter) >= 50 ? 'text-amber-400 font-bold' : 'text-white'}">{rnd(modal.night.crAfter)} %</span></span></div>
                <div class="flex justify-between"><span class="flex items-center gap-1.5"><img src="assets/img/ui/ui_lazy.webp" alt="" width="16" height="16" class="w-4 h-4 shrink-0 select-none" onerror={(e) => e.currentTarget.outerHTML = '🦥'}>{t('stat.lazy')}</span>
                    <span><span class="text-slate-500">{rnd(modal.night.fl)} %</span> → <span class="{rnd(modal.night.fl) >= 50 ? 'text-amber-400 font-bold' : 'text-white'}">{rnd(modal.night.fl)} %</span></span></div>
                <div class="flex justify-between"><span class="flex items-center gap-1.5"><img src="assets/img/ui/ui_excuse.webp" alt="" width="16" height="16" class="w-4 h-4 shrink-0 select-none" onerror={(e) => e.currentTarget.outerHTML = '🃏'}>{t('stat.excuses')}</span>
                    <span><span class="text-slate-500">{modal.night.excusesBefore}</span> → <span class="text-white">{modal.night.excusesAfter}</span></span></div>
                <!-- The line about the night itself: prose from the data tree,
                     so it arrives as a path into that tree (see queueNightEnd). -->
                {#if sleep}
                    <div class="pt-2 mt-1 border-t border-slate-800 text-slate-400 italic font-sans text-[11px] leading-relaxed">{sleep}</div>
                {/if}
            </div>
        {/if}

        {#if (isFinal || isNight) && (hasChart || hasDiary)}
            <div class="flex flex-wrap justify-center gap-2 mb-4">
                {#if hasChart}
                    <button type="button" onclick={() => showChart = !showChart}
                            aria-expanded={showChart}
                            class="text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-amber-400 border border-slate-700 hover:border-amber-600/60 rounded-sm px-3 py-1.5 transition-colors">
                        {showChart ? '▾' : '▸'} {t('end.toggle.chart')}
                    </button>
                {/if}
                {#if hasDiary}
                    <button type="button" onclick={() => showDiary = !showDiary}
                            aria-expanded={showDiary}
                            class="text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-amber-400 border border-slate-700 hover:border-amber-600/60 rounded-sm px-3 py-1.5 transition-colors">
                        {showDiary ? '▾' : '▸'}
            <img src="assets/img/ui/ui_book.webp" alt="" width="14" height="14"
                 class="w-3.5 h-3.5 inline-block align-[-0.15em] mx-1 select-none"
                 onerror={(e) => e.currentTarget.outerHTML = '📖'}>{t('end.toggle.diary')}
                    </button>
                {/if}
            </div>

            {#if showChart}
                <div class="mb-4 bg-slate-950 border border-slate-700 rounded-lg p-3 shadow-inner">
                    <DayChart />
                </div>
            {/if}

            <!-- hasDiary as well as the toggle: the chart can hold this block
                 open on its own. -->
            {#if showDiary && hasDiary}
                <div class="mb-6 py-2">
                    <DiaryEntry diary={modal.diary} />
                </div>
            {/if}
        {/if}

        <!-- data-modal-continue is the confirm key's anchor (engine.js). The
             chart/diary toggles render above this button, so "first button in
             #modal-content" stopped meaning "the continue button" in 6.1 -
             Space then only flipped the day curve open and shut. -->
        <button data-modal-continue
                onclick={() => isNight ? engine.continueWeekNight()
                             : isFinal ? location.reload() : engine.closeModal()}
                class="bg-white text-black px-8 py-3 rounded-sm font-bold uppercase hover:bg-slate-200 shadow-lg mt-2">
            {isNight ? tf('end.btn.next', { day: nextDay.toUpperCase() })
              : isFinal ? t('end.btn.restart') : t('end.btn.ok')}
        </button>
    </div>
{/if}
