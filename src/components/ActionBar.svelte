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
        { id: 'btn-calls',     type: 'calls',     bind: 'actCall',   icon: '📞', label: 'ANRUF',      tone: 'bg-blue-900/30 text-blue-400 border-blue-800' }
    ];

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
        <span class="text-xl">{action.icon}</span>
        <span class="text-[10px] md:text-xs font-bold">{action.label}</span>

        {#if state.showHotkeys}
            <kbd class="hotkey-badge absolute top-1 right-1.5 text-[8px] md:text-[9px] font-mono text-slate-400 bg-slate-900 border border-slate-700 px-1 rounded-sm shadow-xs opacity-80 pointer-events-none">
                {keyLabel(action.bind)}
            </kbd>
        {/if}
    </button>
{/each}
