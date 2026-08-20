<!--
  The week's balance sheet on the end screen: one line per day, then the totals.

  engine_week.buildWeekBalanceHTML() used to assemble this as an HTML string,
  which is what froze it in the language it was built in — the one block on that
  screen made entirely of figures was also the one that could not follow a
  language switch. It arrives as a snapshot now (see buildWeekBalance) and every
  word is read through t() on the way to the screen.

  The snapshot is also what un-tangles the old ordering trap: endWeek() empties
  state.week immediately after the sheet is made, so the builder could only ever
  run once, before it. A snapshot carries what it needs and can be drawn again.
-->
<script>
    import { dayName } from '../engine/engine_week.js';
    import { renderRecipe } from '../engine/recipe.js';
    import { t, tf } from '../i18n/i18n.svelte.js';

    /** @type {{ balance: { mode: string, rows: object[], coffee: number, mails: number } }} */
    let { balance } = $props();

    // The level as a word. An id in, a caption out — the header used to be
    // built with the level already spelled out.
    // i18n-uses: week.diff.easy, week.diff.normal, week.diff.hard
    const mode = $derived(t(`week.diff.${balance.mode ?? 'normal'}`));

    // One ticket is a ticket, not tickets — the same shape boot.carry and
    // knowledge.missing already use. The count decides the KEY, because a
    // plural rule glued on afterwards belongs to one language only.
    // i18n-uses: week.summary.values, week.summary.valuesOne
    const values = (row) =>
        tf(row.tickets === 1 ? 'week.summary.valuesOne' : 'week.summary.values',
           { tickets: row.tickets, fl: row.l, al: row.a, cr: row.b });

    // The failed day names its cause: the end screen's own title, which is a
    // recipe by now and resolves here like everything else.
    const cause = (row) => renderRecipe(row.title) ?? '';

    // i18n-uses: week.summary.totals, week.summary.totalsOne
    const totals = $derived(
        tf(balance.mails === 1 ? 'week.summary.totalsOne' : 'week.summary.totals',
           { coffee: balance.coffee, mails: balance.mails })
    );
</script>

<div class="bg-slate-950 border border-slate-700 rounded-lg p-4 my-3 text-left font-mono text-xs space-y-1">
    <div class="flex justify-between items-baseline gap-4 mb-2">
        <span class="text-[10px] uppercase tracking-widest text-purple-400">{tf('week.summary.title', { mode })}</span>
        <!-- The legend carries the initials once, and they belong to the
             dictionary: German shortens Faulheit/Aggro/Chef to F/A/C, English
             Laziness/Aggro/Boss to L/A/B. This is the one place where the
             letters have to agree with the rows above, and now they sit in the
             same file as those rows. -->
        <span class="text-[9px] text-slate-600">{t('week.summary.legend')}</span>
    </div>

    {#each balance.rows ?? [] as row (row.day)}
        <div class="flex justify-between gap-4">
            <span>{row.win ? '✓' : '✗'} {dayName(row.day)}</span>
            <span class="text-slate-400">{row.win ? values(row) : cause(row)}</span>
        </div>
    {/each}

    <div class="pt-2 mt-2 border-t border-slate-800 text-slate-400">{totals}</div>
</div>
