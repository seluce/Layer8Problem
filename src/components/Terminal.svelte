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

    import { t } from '../i18n/i18n.svelte.js';
    // The emoji stays as the fallback if an icon file is ever missing.
    // i18n-uses: terminal.system.title, terminal.system.sub
    // i18n-uses: terminal.halgerd.title, terminal.halgerd.sub
    const IDLE = {
        system:  { icon: '🖥️', img: 'act_idle',    title: 'terminal.system.title',  sub: 'terminal.system.sub',  tone: '' },
        halgerd: { icon: '🤖', img: 'act_halgerd', title: 'terminal.halgerd.title', sub: 'terminal.halgerd.sub', tone: 'text-cyan-400' }
    };

    const idle = $derived(IDLE[state.terminal.variant] ?? IDLE.system);
</script>

{#if state.terminal.mode === 'idle'}
    <!--
      Responsive sizes on purpose. The old code wrote fixed text-6xl / text-2xl
      whenever it reset the panel, so the first reset silently dropped the
      responsive pair that index.html started with.
    -->
    <img src="assets/img/actions/{idle.img}.webp" alt=""
         width="80" height="80" class="w-12 md:w-20 h-12 md:h-20 mb-4 select-none"
         onerror={(e) => e.currentTarget.outerHTML = `<div class="text-4xl md:text-6xl mb-4">${idle.icon}</div>`}>
    <h1 class="text-xl md:text-2xl font-bold {idle.tone}">{t(idle.title)}</h1>
    <p>{t(idle.sub)}</p>
{:else if state.terminal.mode === 'event'}
    <EventView />
{:else if state.terminal.mode === 'result'}
    <ResultView />
{:else if state.terminal.mode === 'morning'}
    <MorningView />
{:else if state.terminal.mode === 'boot'}
    <BootView />
{/if}
