<!--
  The big screen in the middle: end of day, defeat, warnings.

  Top to bottom: title, one sentence on the outcome, the balance sheet with
  the cause highlighted, and below that the curve and the logbook, both
  collapsible. The order is deliberate — the message first, then the numbers,
  then the analysis for whoever wants it.

  Until v4.0.0 all of this arrived from the engine as one HTML string. Now it
  hands over fields (lead, cause, diary) and the parts are components of their
  own. `text` still exists: warnings and the party bring a summary of their
  own.
-->
<script>
    // Renamed so the $state rune stays usable in this file - see the pitfall
    // noted in STRUCTURE.md.
    import { state as game } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import DayChart from './DayChart.svelte';
    import DayReport from './DayReport.svelte';
    import DiaryEntry from './DiaryEntry.svelte';

    const modal = $derived(game.modal);

    // Anyone who always wants the curve can set that in the options.
    let showChart = $state(game.autoChart ?? false);
    let showDiary = $state(false);

    // First match wins; red is the default.
    const THEMES = [
        { match: ['FEIERABEND', 'GESCHAFFT', 'ÜBERLEBT'], title: 'text-green-500',  border: 'border-green-500' },
        { match: ['GALA VORBEI'],       title: 'text-pink-500',   border: 'border-pink-500' },
        { match: ['VENTIL', 'RAGE'],    title: 'text-orange-500', border: 'border-orange-500' }
    ];
    const DEFAULT_THEME = { title: 'text-red-500', border: 'border-red-600' };

    const theme = $derived(
        THEMES.find(t => t.match.some(m => (modal.title ?? '').includes(m))) ?? DEFAULT_THEME
    );

    // Anything that ends the run needs a reload; a mere warning can be
    // dismissed and play continues.
    const FINAL = ['QUIT', 'GEFEUERT', 'FEIERABEND', 'GALA VORBEI'];
    const isFinal = $derived(modal.isEnd || FINAL.some(m => (modal.title ?? '').includes(m)));

    const hasChart = $derived((game.statHistory?.length ?? 0) > 2);
    const hasDiary = $derived(!!modal.diary);

    // A finished week day (Monday to Thursday): not an ending, the run
    // carries on tomorrow - so no reload, and the baggage block below.
    const isNight = $derived(!!modal.isNight);
    const rnd = (v) => Math.round(v ?? 0);

    // Context: what this day means for the career. The counters live in the
    // archive and survive a restart, which turns single days into a run.
    const stats = $derived(game.archive?.stats ?? {});
    // A week run counts weeks, not days - "Arbeitstag Nr. 24" on a Friday
    // balance sheet described the wrong unit.
    const tally = $derived(
        modal.isWeek
            ? ((stats.weeksStarted ?? 0) > 1
                ? `Arbeitswoche Nr. ${stats.weeksStarted} · ${stats.weeksSurvived ?? 0} überstanden`
                : null)
            : ((stats.daysStarted ?? 0) > 1
                ? `Arbeitstag Nr. ${stats.daysStarted} · ${stats.daysSurvived ?? 0} überstanden`
                : null)
    );
</script>

{#if modal.open}
    <!-- Keeps the id: the keyboard handlers in engine.js find the confirm
         button through #modal-content. -->
    <div id="modal-content" class="max-w-2xl w-full bg-slate-900 border-2 {theme.border} p-8 rounded-xl text-center shadow-2xl max-h-[90vh] overflow-y-auto">

        <h1 class="text-4xl font-black {theme.title} mb-1">{modal.title}</h1>

        {#if tally && isFinal}
            <div class="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-4">{tally}</div>
        {:else}
            <div class="mb-4"></div>
        {/if}

        {#if modal.lead}
            <p class="text-lg text-slate-300 italic mb-2">{modal.lead}</p>
        {/if}

        <!-- Warnings and the party bring their own text. It comes from the
             engine, never from the player. -->
        {#if modal.text}
            <div class="text-lg text-slate-300 italic">{@html modal.text}</div>
        {/if}

        {#if isFinal}
            <DayReport cause={modal.cause} />
        {/if}

        <!-- The night: what tomorrow inherits, before and after sleep. The
             transparency is the feature - evenings are for planning. -->
        {#if isNight && modal.night}
            <div class="bg-slate-950 border border-slate-700 rounded-lg p-4 my-3 text-left font-mono text-xs space-y-1.5">
                <div class="text-[10px] uppercase tracking-widest text-purple-400 mb-2">Das nimmst du mit in den {modal.nextDay}</div>
                <div class="flex justify-between"><span class="flex items-center gap-1.5"><img src="assets/img/ui/ui_ticket.webp" alt="" width="16" height="16" class="w-4 h-4 shrink-0 select-none" onerror={(e) => e.currentTarget.outerHTML = '🎫'}>Tickets</span>
                    <span><span class="text-slate-500">{modal.night.ticketsBefore}</span> → <span class="{modal.night.ticketsAfter >= 3 ? 'text-red-400 font-bold' : 'text-white'}">{modal.night.ticketsAfter}</span></span></div>
                <div class="flex justify-between"><span class="flex items-center gap-1.5"><img src="assets/img/ui/ui_angry.webp" alt="" width="16" height="16" class="w-4 h-4 shrink-0 select-none" onerror={(e) => e.currentTarget.outerHTML = '😡'}>Aggro</span>
                    <span><span class="text-slate-500">{rnd(modal.night.alBefore)} %</span> → <span class="{rnd(modal.night.alAfter) >= 50 ? 'text-amber-400 font-bold' : 'text-white'}">{rnd(modal.night.alAfter)} %</span></span></div>
                <div class="flex justify-between"><span class="flex items-center gap-1.5"><img src="assets/img/ui/ui_eye.webp" alt="" width="16" height="16" class="w-4 h-4 shrink-0 select-none" onerror={(e) => e.currentTarget.outerHTML = '📡'}>Chef-Radar</span>
                    <span><span class="text-slate-500">{rnd(modal.night.crBefore)} %</span> → <span class="{rnd(modal.night.crAfter) >= 50 ? 'text-amber-400 font-bold' : 'text-white'}">{rnd(modal.night.crAfter)} %</span></span></div>
                <div class="flex justify-between"><span class="flex items-center gap-1.5"><img src="assets/img/ui/ui_lazy.webp" alt="" width="16" height="16" class="w-4 h-4 shrink-0 select-none" onerror={(e) => e.currentTarget.outerHTML = '🦥'}>Faulheit</span>
                    <span><span class="text-slate-500">{rnd(modal.night.fl)} %</span> → <span class="{rnd(modal.night.fl) >= 50 ? 'text-amber-400 font-bold' : 'text-white'}">{rnd(modal.night.fl)} %</span></span></div>
                <div class="flex justify-between"><span class="flex items-center gap-1.5"><img src="assets/img/ui/ui_excuse.webp" alt="" width="16" height="16" class="w-4 h-4 shrink-0 select-none" onerror={(e) => e.currentTarget.outerHTML = '🃏'}>Ausreden</span>
                    <span><span class="text-slate-500">{modal.night.excusesBefore}</span> → <span class="text-white">{modal.night.excusesAfter}</span></span></div>
                {#if modal.night.sleepText}
                    <div class="pt-2 mt-1 border-t border-slate-800 text-slate-400 italic font-sans text-[11px] leading-relaxed">{modal.night.sleepText}</div>
                {/if}
            </div>
        {/if}

        {#if (isFinal || isNight) && (hasChart || hasDiary)}
            <div class="flex flex-wrap justify-center gap-2 mb-4">
                {#if hasChart}
                    <button type="button" onclick={() => showChart = !showChart}
                            aria-expanded={showChart}
                            class="text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-amber-400 border border-slate-700 hover:border-amber-600/60 rounded-sm px-3 py-1.5 transition-colors">
                        {showChart ? '▾' : '▸'} Tagesverlauf
                    </button>
                {/if}
                {#if hasDiary}
                    <button type="button" onclick={() => showDiary = !showDiary}
                            aria-expanded={showDiary}
                            class="text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-amber-400 border border-slate-700 hover:border-amber-600/60 rounded-sm px-3 py-1.5 transition-colors">
                        {showDiary ? '▾' : '▸'}
            <img src="assets/img/ui/ui_book.webp" alt="" width="14" height="14"
                 class="w-3.5 h-3.5 inline-block align-[-0.15em] mx-1 select-none"
                 onerror={(e) => e.currentTarget.outerHTML = '📖'}>Logbuch
                    </button>
                {/if}
            </div>

            {#if showChart}
                <div class="mb-4 bg-slate-950 border border-slate-700 rounded-lg p-3 shadow-inner">
                    <DayChart />
                </div>
            {/if}

            {#if showDiary}
                <div class="mb-6 py-2">
                    <DiaryEntry diary={modal.diary} />
                </div>
            {/if}
        {/if}

        <button onclick={() => isNight ? engine.continueWeekNight()
                             : isFinal ? location.reload() : engine.closeModal()}
                class="bg-white text-black px-8 py-3 rounded-sm font-bold uppercase hover:bg-slate-200 shadow-lg mt-2">
            {isNight ? `WEITER · ${(modal.nextDay ?? '').toUpperCase()}` : isFinal ? 'NEUSTART' : 'VERSTANDEN'}
        </button>
    </div>
{/if}
