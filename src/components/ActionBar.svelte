<!--
  The four main action buttons.

  Renders into #action-bar, which keeps its grid classes.

  Everything the tutorial does to this bar comes out of the state: tutorialStep
  says a step is on display, tutorialUnlocked says which one button is free.
  Lock, dimming and ring are drawn from those two here, and tutorial.js writes
  nothing into these elements any more.

  Until 6.1 it set opacity-50 and the ring from outside, by id, and that only
  held because nothing state-derived stood in the class attribute: Svelte's
  set_class caches the last value and skips the write while the string is
  unchanged. The same trap had already caught `disabled` in 6.0 - tutorial.js
  set btn.disabled = false, Svelte put the lock straight back, and the pointer
  aimed at a button that could not be pressed.

  `relative` is always set rather than added when the badge appears. Without
  offsets it changes nothing visually, and it saves a classList call.
-->
<script>
    import { state, TICKET_WARNING } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { t } from '../i18n/i18n.svelte.js';

    // The emoji stays in the table as a fallback: if an icon file is ever
    // missing, the button keeps its meaning instead of showing an empty box.
    // i18n-uses: action.coffee, action.sidequest, action.server, action.calls
    const ACTIONS = [
        { id: 'btn-coffee',    type: 'coffee',    bind: 'actCoffee', icon: '☕', label: 'action.coffee',    tone: 'text-amber-500' },
        { id: 'btn-sidequest', type: 'sidequest', bind: 'actQuest',  icon: '🎲', label: 'action.sidequest', tone: 'text-purple-500' },
        { id: 'btn-server',    type: 'server',    bind: 'actServer', icon: '💾', label: 'action.server',    tone: 'text-emerald-500' },
        { id: 'btn-calls',     type: 'calls',     bind: 'actCall',   icon: '📞', label: 'action.calls',     tone: 'text-blue-400' }
    ];

    // Calls are the only way to work tickets off, but that does not make them
    // the default choice — the game is about the mix. So the emphasis is not
    // permanent: it appears once the tickets get dangerous, at the same
    // threshold the counter starts pulsing at. Then it says something true and
    // actionable instead of just "this one is important".
    const urgent = $derived(state.tickets >= TICKET_WARNING);

    // Whole class names, never composed - Tailwind reads this file as source
    // and cannot see a name that is put together at runtime. `relative` is on
    // the button already, so the ring does not have to bring it along.
    const GLOW = 'animate-pulse ring-2 ring-cyan-500 z-2500 shadow-[0_0_15px_rgba(6,182,212,0.5)]';
    const DIM  = 'opacity-50';

    // Nothing while no step is on display, which is the normal state of the
    // game. z-2500 lifts the ringed button over every modal but the pointer
    // bubble, so it goes out again the moment a modal takes over - see
    // clearGlows() in tutorial.js.
    const tutorialLook = (id) => {
        if (state.tutorialStep === null) return '';
        return id === state.tutorialUnlocked ? GLOW : DIM;
    };

    // "ArrowUp" reads better as "UP" on a badge that is nine pixels wide.
    const keyLabel = (bind) => {
        const key = state.keyBinds[bind] ?? '';
        return key.replace(/^Arrow/, '').toUpperCase();
    };
</script>

{#each ACTIONS as action (action.id)}
    <button id={action.id}
            class="action-btn relative {action.tone} {tutorialLook(action.id)}"
            disabled={state.buttonsDisabled && action.id !== state.tutorialUnlocked}
            onclick={() => engine.trigger(action.type)}>
        {#if urgent && action.type === 'calls'}
            <!-- An overlay rather than a class on the button: the tint has to
                 lie over the base background from .action-btn, and a bg-* class
                 would replace that background instead of tinting it. -->
            <span class="absolute inset-0 bg-blue-900/30 border border-blue-800 pointer-events-none" style="border-radius: inherit"></span>
        {/if}

        <img src="assets/img/actions/act_{action.type}.webp" alt=""
             width="28" height="28" class="w-8 h-8 relative select-none"
             onerror={(e) => e.currentTarget.outerHTML = `<span class="text-xl relative">${action.icon}</span>`}>
        <span class="text-[10px] md:text-xs font-bold relative">{t(action.label)}</span>

        {#if state.showHotkeys}
            <kbd class="key-hint absolute top-1.5 right-1.5">
                {keyLabel(action.bind)}
            </kbd>
        {/if}
    </button>
{/each}
