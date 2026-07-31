<!--
  The terminal panel.

  This component owns #terminal-content exclusively. Nothing else may write to
  that element: an innerHTML assignment from outside would wipe the nodes Svelte
  tracks and leave it updating detached elements.

  Every screen is real markup now — no HTML strings are passed in any more.
  The engine picks a mode through engine.setTerminal*(); this component decides
  what to render.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import EventView from './EventView.svelte';
    import ResultView from './ResultView.svelte';
    import MorningView from './MorningView.svelte';
    import BootView from './BootView.svelte';

    const IDLE = {
        system:  { icon: '🖥️', title: 'SYSTEM BEREIT',        sub: 'Wähle eine Aktion unten.', tone: '' },
        halgerd: { icon: '🤖', title: 'H.A.L.G.E.R.D. BEREIT', sub: 'Warte auf Eingabe...',     tone: 'text-cyan-400' }
    };

    const idle = $derived(IDLE[state.terminal.variant] ?? IDLE.system);
</script>

{#if state.terminal.mode === 'idle'}
    <!--
      Responsive sizes on purpose. The old code wrote fixed text-6xl / text-2xl
      whenever it reset the panel, so the first reset silently dropped the
      responsive pair that index.html started with.
    -->
    <div class="text-4xl md:text-6xl mb-4">{idle.icon}</div>
    <h1 class="text-xl md:text-2xl font-bold {idle.tone}">{idle.title}</h1>
    <p>{idle.sub}</p>
{:else if state.terminal.mode === 'event'}
    <EventView />
{:else if state.terminal.mode === 'result'}
    <ResultView />
{:else if state.terminal.mode === 'morning'}
    <MorningView />
{:else if state.terminal.mode === 'boot'}
    <BootView />
{/if}
