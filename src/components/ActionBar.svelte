<!--
  The four main action buttons.

  Renders into #action-bar, which keeps its grid classes.

  Two deliberate choices:

  Nothing derived from $state may go into the class attribute here. tutorial.js
  adds and removes `opacity-50` on these buttons by id, and that only survives
  because Svelte's set_class caches the last value and skips the write when the
  string is unchanged. `action.tone` comes from a module constant, so it never
  changes and className is written exactly once.

  Put a state-derived value in there and the attribute gets rewritten on every
  update — silently wiping whatever tutorial.js set. `disabled` is bound
  separately and is safe.

  `relative` is now always set rather than added when the badge appears. Without
  offsets it changes nothing visually, and it saves a classList call.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';

    const ACTIONS = [
        { id: 'btn-coffee',    type: 'coffee',    bind: 'actCoffee', icon: '☕', label: 'KAFFEE',     tone: 'text-amber-500' },
        { id: 'btn-sidequest', type: 'sidequest', bind: 'actQuest',  icon: '🎲', label: 'DIENSTGANG', tone: 'text-purple-500' },
        { id: 'btn-server',    type: 'server',    bind: 'actServer', icon: '💾', label: 'SERVERRAUM', tone: 'text-emerald-500' },
        { id: 'btn-calls',     type: 'calls',     bind: 'actCall',   icon: '📞', label: 'ANRUF',      tone: 'text-blue-400' }
    ];

    // Calls are the only way to work tickets off, but that does not make them
    // the default choice — the game is about the mix. So the emphasis is not
    // permanent: it appears once the tickets get dangerous, at the same
    // threshold the counter starts pulsing at. Then it says something true and
    // actionable instead of just "this one is important".
    const TICKET_WARNING = 7;
    const urgent = $derived(state.tickets >= TICKET_WARNING);

    // "ArrowUp" reads better as "UP" on a badge that is nine pixels wide.
    const keyLabel = (bind) => {
        const key = state.keyBinds[bind] ?? '';
        return key.replace(/^Arrow/, '').toUpperCase();
    };
</script>

{#each ACTIONS as action (action.id)}
    <button id={action.id}
            class="action-btn relative {action.tone}"
            disabled={state.buttonsDisabled}
            onclick={() => engine.trigger(action.type)}>
        {#if urgent && action.type === 'calls'}
            <!-- An overlay rather than a conditional class: the button's class
                 attribute has to stay free of state, see the note above. -->
            <span class="absolute inset-0 bg-blue-900/30 border border-blue-800 pointer-events-none" style="border-radius: inherit"></span>
        {/if}

        <span class="text-xl relative">{action.icon}</span>
        <span class="text-[10px] md:text-xs font-bold relative">{action.label}</span>

        {#if state.showHotkeys}
            <kbd class="key-hint absolute top-1.5 right-1.5">
                {keyLabel(action.bind)}
            </kbd>
        {/if}
    </button>
{/each}
