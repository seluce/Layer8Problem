<!--
  The key bindings.

  Until 4.1 these eight buttons kept their own truth: the current binding was
  read back out of the button label, and a conflict was shown by rewriting
  classes and innerText from the engine. That meant the same information lived
  in two places, and the DOM version was the one being asked.

  Now the list comes from state.keyBinds, and the three visual states - idle,
  waiting for a key, rejecting one - follow from state as well. The engine only
  says WHAT happened; how it looks is decided here.

  The hotkey badge switch below the list came along afterwards, for the same
  reason: openKeybinds() had to push state.showHotkeys into a checkbox on every
  open, and that was the last control in the game still filled from outside.
-->
<script>
    // Renamed so the $state rune stays usable in this file - see the pitfall
    // noted in STRUCTURE.md.
    import { state as game } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';

    // Order and wording of the rows. The separator marks where the actions of
    // the day end and the answer keys begin.
    const ROWS = [
        { action: 'actCoffee', label: 'Kaffee holen' },
        { action: 'actQuest',  label: 'Dienstgang' },
        { action: 'actServer', label: 'Serverraum' },
        { action: 'actCall',   label: 'Anruf' },
        { separator: true },
        { action: 'opt1', label: 'Option 1 (Oben)' },
        { action: 'opt2', label: 'Option 2 (Mitte)' },
        { action: 'opt3', label: 'Option 3 (Unten)' },
        { action: 'confirm', label: 'Bestätigen / Popups / Handy', accent: true }
    ];

    // "ArrowUp" reads better as "UP" on a button this narrow.
    const shownKey = (action) => (game.keyBinds[action] ?? '').replace(/^Arrow/, '').toUpperCase();

    const waiting = (action) => game.isBindingKey && game.actionToBind === action;

    const BASE = 'px-4 py-2 rounded-lg font-bold text-xs uppercase min-w-[80px] transition-colors';

    // Same construction as the switches in SettingsView.svelte. Written out
    // rather than shared: a common constant would have to live in a .js file,
    // and app.css only scans components/**/*.svelte for class names.
    const SWITCH = 'w-9 h-5 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500';
    function buttonClass(action) {
        if (game.bindFlash === action) return `${BASE} bg-red-600 border border-red-500 text-white animate-shake`;
        if (waiting(action)) return `${BASE} bg-amber-500 text-black animate-pulse shadow-lg`;
        return `${BASE} bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600`;
    }

    function label(action) {
        if (game.bindFlash === action && game.bindFlashReserved) return 'RESERVIERT';
        if (waiting(action)) return 'Drücke Taste...';
        return shownKey(action);
    }
</script>

<div class="grid gap-3">
    {#each ROWS as row (row.action ?? 'sep')}
        {#if row.separator}
            <div class="h-px bg-slate-700 my-2"></div>
        {:else}
            <div class="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 {row.accent ? 'border-l-2 border-l-amber-500' : ''}">
                <div class="flex flex-col">
                    <span class="text-sm font-medium text-slate-200">{row.label}</span>
                </div>
                <button id="bind-{row.action}" class={buttonClass(row.action)}
                        aria-label="{row.label}: Taste {shownKey(row.action)} ändern"
                        onclick={() => engine.startBindingKey(row.action)}>
                    {label(row.action)}
                </button>
            </div>
        {/if}
    {/each}
</div>

<!--
  mt-4 replaces the gap the parent used to provide: the row sat directly in the
  dialog's space-y-4 and is now one level deeper, where that spacing no longer
  reaches it.
-->
<div class="flex justify-between items-center gap-4 group bg-slate-800/50 p-3 mt-4 rounded-lg border border-slate-700/50">
    <div class="flex flex-col flex-1">
        <span class="text-sm font-medium text-slate-200 leading-tight">Visuelle Hotkeys</span>
        <span class="text-[10px] text-slate-500 mt-1">Zeigt Tasten-Symbole auf den Antwort-Buttons an.</span>
    </div>
    <label class="relative inline-flex items-center cursor-pointer shrink-0">
        <input type="checkbox" class="sr-only peer" aria-label="Visuelle Hotkeys"
               checked={game.showHotkeys}
               onchange={(e) => engine.toggleShowHotkeys(e.currentTarget.checked)}>
        <div class={SWITCH}></div>
    </label>
</div>
