<!--
  The key bindings.

  Until 4.1 these buttons kept their own truth: the current binding was
  read back out of the button label, and a conflict was shown by rewriting
  classes and innerText from the engine. That meant the same information lived
  in two places, and the DOM version was the one being asked.

  Since the settings became tabs this is not a window of its own any more but
  the Controls tab, rendered inside SettingsView.svelte.

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

    import { t, tf } from '../i18n/i18n.svelte.js';
    // Order and wording of the rows, in groups with a heading each - the same
    // anatomy as the other tabs of the settings, now that the bindings are one
    // of them. They used to be one list cut by separators, and a separator
    // has no key of its own: the second one collided with the first in the
    // keyed each, Svelte threw, and the whole list stayed empty. A group has an
    // id and a row has its action, so nothing here can repeat.
    // i18n-uses: keybind.group.actions, keybind.group.answers, keybind.group.hints
    const GROUPS = [
        { id: 'actions', title: 'keybind.group.actions', rows: [
            // i18n-uses: keybind.actCoffee, keybind.actQuest, keybind.actServer, keybind.actCall
            { action: 'actCoffee', label: 'keybind.actCoffee' },
            { action: 'actQuest',  label: 'keybind.actQuest' },
            { action: 'actServer', label: 'keybind.actServer' },
            { action: 'actCall',   label: 'keybind.actCall' }
        ] },
        { id: 'answers', title: 'keybind.group.answers', rows: [
            // i18n-uses: keybind.opt1, keybind.opt2, keybind.opt3, keybind.confirm
            { action: 'opt1', label: 'keybind.opt1' },
            { action: 'opt2', label: 'keybind.opt2' },
            { action: 'opt3', label: 'keybind.opt3' },
            { action: 'confirm', label: 'keybind.confirm', accent: true }
        ] },
        { id: 'voice', title: 'set.section.narration', rows: [
            // i18n-uses: keybind.readAloud
            { action: 'readAloud', label: 'keybind.readAloud' }
        ] }
    ];

    // A section heading, the same as SettingsView's.
    const HEADING = 'text-[0.625rem] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-700 pb-1';

    // "ArrowUp" reads better as "UP" on a button this narrow. A dash for a
    // binding that is empty: that happens when a new action's default key was
    // already taken by the player (see DEFAULT_KEYBINDS), and an empty button
    // looks broken rather than free.
    const shownKey = (action) => (game.keyBinds[action] || '—').replace(/^Arrow/, '').toUpperCase();

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
        if (game.bindFlash === action && game.bindFlashReserved) return t('keybind.reserved');
        if (waiting(action)) return t('keybind.press');
        return shownKey(action);
    }
</script>

<div class="space-y-6">
    {#each GROUPS as group (group.id)}
        <div>
            <h3 class={HEADING}>{t(group.title)}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                {#each group.rows as row (row.action)}
                    <div class="flex justify-between items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 {row.accent ? 'border-l-2 border-l-amber-500' : ''}">
                        <span class="text-sm font-medium text-slate-200 min-w-0">{t(row.label)}</span>
                        <button id="bind-{row.action}" class={buttonClass(row.action)}
                                aria-label={tf('keybind.aria', { what: t(row.label), key: shownKey(row.action) })}
                                onclick={() => engine.startBindingKey(row.action)}>
                            {label(row.action)}
                        </button>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>

<div class="mt-6">
<h3 class={HEADING}>{t('keybind.group.hints')}</h3>
<div class="flex justify-between items-center gap-4 group bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
    <div class="flex flex-col flex-1 min-w-0">
        <span class="text-sm font-medium text-slate-200 leading-tight">{t('keybind.hotkeys')}</span>
        <span class="text-xs text-slate-400 mt-1 leading-snug">{t('keybind.hotkeyHint')}</span>
    </div>
    <label class="relative inline-flex items-center cursor-pointer shrink-0">
        <input type="checkbox" class="sr-only peer" aria-label={t('keybind.hotkeys')}
               checked={game.showHotkeys}
               onchange={(e) => engine.toggleShowHotkeys(e.currentTarget.checked)}>
        <div class={SWITCH}></div>
    </label>
</div>
</div>
