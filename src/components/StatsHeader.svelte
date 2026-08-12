<!--
  Status header: clock, open tickets and the three stat bars.

  First component of the migration and the template for everything that
  follows. It reads from the shared $state and writes nothing back, so it can
  run alongside the vanilla engine without either side stepping on the other.

  The five boxes render straight into #stats-header, which keeps the grid
  classes it always had. Adding a wrapper here would insert an extra flex item
  between body and the grid and change the layout.
-->
<script>
    import { state, TICKET_WARNING } from '../engine/engine_state.svelte.js';

    const pad = (n) => String(n).padStart(2, '0');

    const clock = $derived(`${pad(Math.floor(state.time / 60))}:${pad(state.time % 60)}`);

    // Blind mode hides the numbers but not the bars — that is the point of it:
    // you still see roughly where you stand, just not exactly.
    const flText = $derived(state.blindStats ? '?%' : `${state.fl}%`);
    const alText = $derived(state.blindStats ? '?%' : `${state.al}%`);
    const crText = $derived(state.blindStats ? '?%' : `${state.cr}%`);
    const ticketText = $derived(state.blindTickets ? '?' : state.tickets);

    // The engine does not clamp the stats, so they can dip below zero after a
    // generous option. A negative width is invalid CSS and gets dropped, which
    // leaves the bar at width:auto — full width. The old code set style.width
    // through the CSSOM, where an invalid value is ignored and the previous one
    // survives, so this only became visible with Svelte.
    const bar = (value) => Math.min(100, Math.max(0, value));

    // Pulsing is tied to the visual effects setting, same as before.
    const aggroPulse = $derived(state.visualFX && state.al >= 80 ? 'pulse-orange' : '');
    const radarPulse = $derived(state.visualFX && state.cr >= 80 ? 'pulse-red' : '');

    /** Weekday shorthand for the week mode, matching the calendar icons. */
    const WEEK_SHORT = ['MO', 'DI', 'MI', 'DO', 'FR'];
</script>

<!--
  Two readings side by side in week mode: the clock and the weekday. A grid
  rather than nested flex columns, because the two rows keep the big numbers
  on one baseline while "1/5" hangs below the day - stacking them would push
  the clock off-centre against the ticket counter beside it. The box keeps its
  blue identity throughout: no second accent colour for the same panel.
-->
<div id="clock-container"
     class="neon-box panel-raised border-blue col-span-2 lg:col-span-1 p-2 grid items-start justify-items-center content-center gap-x-3 {state.week.active ? 'grid-cols-[1fr_auto_1fr]' : 'grid-cols-1'}">

    <span class="text-[10px] text-blue-400 font-bold uppercase leading-none">Uhrzeit</span>
    {#if state.week.active}
        <span class="self-stretch w-px bg-blue-500/25"></span>
        <span class="text-[10px] text-blue-400 font-bold uppercase leading-none">Tag</span>
    {/if}

    <div id="clock" class="text-3xl lg:text-4xl font-black text-white leading-none mt-1.5">{clock}</div>
    {#if state.week.active}
        <div class="self-stretch w-px bg-blue-500/25"></div>
        <div class="flex flex-col items-center mt-1.5">
            <span class="text-3xl lg:text-4xl font-black text-white leading-none">{WEEK_SHORT[state.week.dayIndex - 1]}</span>
            <span class="text-[10px] text-blue-400 font-bold leading-none mt-1.5">{state.week.dayIndex}/5</span>
        </div>
    {/if}
</div>

<div id="ticket-container" class="neon-box panel-raised border-purple p-2 flex flex-col justify-center items-center col-span-2 lg:col-span-1 relative">
    <span class="text-[10px] text-purple-400 font-bold uppercase mb-1">OFFENE TICKETS</span>
    <!--
      The old updateUI() rewrote className here and dropped the responsive
      text-3xl lg:text-4xl in favour of a fixed text-4xl on its first run, so
      the counter was larger on small screens than the clock beside it. Keeping
      the responsive pair and appending only the pulse class fixes that.
    -->
    <div id="ticket-count"
         class="text-3xl lg:text-4xl font-black text-white ticket-counter {state.tickets >= TICKET_WARNING ? 'ticket-pulse' : ''}">
        {ticketText}
    </div>
    <div class="text-[8px] text-slate-500">Max: 10</div>
</div>

<div id="stat-row-fl" class="neon-box panel-raised border-green p-2 flex flex-col justify-center col-span-2 lg:col-span-1">
    <div class="flex justify-between text-xs font-bold mb-1 text-emerald-400">
        <span>FAULHEIT</span><span id="val-fl">{flText}</span>
    </div>
    <div class="h-2 bg-slate-800 rounded-full">
        <div id="bar-fl" class="h-full bg-emerald-500 transition-all duration-800 ease-out" style="width: {bar(state.fl)}%"></div>
    </div>
</div>

<div id="stat-row-al" class="neon-box panel-raised border-orange p-2 flex flex-col justify-center col-span-2 lg:col-span-1 {aggroPulse}">
    <div class="flex justify-between text-xs font-bold mb-1 text-orange-400">
        <span>AGGRO</span><span id="val-al">{alText}</span>
    </div>
    <div class="h-2 bg-slate-800 rounded-full">
        <div id="bar-al" class="h-full bg-orange-500 transition-all duration-800 ease-out" style="width: {bar(state.al)}%"></div>
    </div>
</div>

<div id="stat-row-cr" class="neon-box panel-raised border-red p-2 flex flex-col justify-center col-span-2 lg:col-span-1 {radarPulse}">
    <div class="flex justify-between text-xs font-bold mb-1 text-red-500">
        <span>CHEF-RADAR</span><span id="val-cr">{crText}</span>
    </div>
    <div class="h-2 bg-slate-800 rounded-full">
        <div id="bar-cr" class="h-full bg-red-600 transition-all duration-800 ease-out" style="width: {bar(state.cr)}%"></div>
    </div>
</div>
