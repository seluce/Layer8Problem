<!--
  The values an outcome moved, as pills: under a result in the terminal and
  under an answered mail (7.1). One component so the two cannot disagree about
  what a pill is - the mail had none until it learned the terminal's.

  Renders the pills alone; the row around them belongs to the caller, which
  may put something of its own at the end (the read-aloud button).
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { t } from '../i18n/i18n.svelte.js';

    let { m = 0, tickets = 0, l = 0, a = 0, b = 0 } = $props();

    // A pill is a change, so a value that did not move has none. The three
    // bars used to show "Aggro +0" beside the two that did move, and the eye
    // had to sort the news from the noise; the floating numbers never showed
    // a zero either. Time and tickets were already shown only when they
    // moved. Tickets are the pill this card was missing for long: the pile is
    // the most common way to lose, every half hour the clock steps over adds
    // one, and nothing on screen tied the two together. A call that clears
    // one shows -1 here for the same reason. Hidden for anyone playing with
    // the ticket counter switched off, which is what that setting asks for.
    const pills = $derived([
        { label: t('result.minutes'),  value: m ?? 0, tone: 'text-blue-400' },
        { label: t('stat.tickets'),    value: state.blindTickets ? 0 : (tickets ?? 0), tone: 'text-purple-400' },
        { label: t('stat.lazy'),       value: l ?? 0, tone: 'text-green-400' },
        { label: t('stat.aggro'),      value: a ?? 0, tone: 'text-orange-400' },
        { label: t('stat.boss.short'), value: b ?? 0, tone: 'text-red-500' }
    ].filter(pill => pill.value !== 0));

    const sign = (n) => (n > 0 ? '+' : '') + n;
</script>

{#each pills as pill (pill.label)}
    <!-- A size up since the zeros went: fewer pills, and each one is
         news. -->
    <span class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm text-sm font-bold bg-slate-950/70 border border-slate-700">
        <span class={pill.tone}>{pill.label}</span>
        <span class="text-white font-mono ml-0.5">{sign(pill.value)}</span>
    </span>
{/each}
