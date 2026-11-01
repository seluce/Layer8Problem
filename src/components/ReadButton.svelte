<!--
  The small button that reads the scene out, or stops it.

  It sits beside the excuse on an event and at the end of the pills on a
  result: the corner of the card where the secondary tools already are, below
  the decisions rather than among them. Shown by the screen that holds it, on
  engine.canReplayNarration(), so the rule lives in one place.

  It went into the terminal's header line first, beside the version number,
  and was taken out again: too cramped on a desktop and on a phone alike, and
  not where anybody looks for something to press.

  AN ICON AND NO TEXT, and the icon is a speaker rather than a play triangle.
  ▶ on its own reads as "play", and the nearest thing to play in this game is
  the radio; a speaker with sound coming out of it is what a read-aloud control
  looks like everywhere else. While a line is running it turns into a stop
  square and takes the terminal's green, so the state can be seen without the
  tooltip - which a phone does not have.

  Same height, border and colours as the excuse button, so the two read as one
  row of tools rather than as two ideas. The class strings are whole on both
  sides of the condition: Tailwind reads the source and a composed name would
  simply lose its colour.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { t, tf } from '../i18n/i18n.svelte.js';

    // What a press would DO, for the tooltip and the screen reader.
    // i18n-uses: term.narrate.read, term.narrate.stop
    const action = $derived(state.narrating ? t('term.narrate.stop') : t('term.narrate.read'));

    // Its key, where it has one - in the tooltip, which is where a mouse
    // player finds out it exists, and in aria-keyshortcuts, which is where a
    // screen reader looks. Empty when the default was already taken.
    const key = $derived((state.keyBinds.readAloud ?? '').replace(/^Arrow/, '').toUpperCase());
    const tip = $derived(key ? tf('term.narrate.withKey', { action, key }) : action);
</script>

<!-- A real <button>, so Enter works without a handler of its own. Space
     belongs to the terminal's continue button at all times: the global handler
     in src/engine.js acts on it whatever has focus and calls preventDefault,
     which also keeps this one from firing twice. -->
<button type="button"
        class={state.narrating
            ? 'shrink-0 p-2 rounded-lg border transition-all bg-emerald-950/40 border-emerald-700 text-emerald-400 hover:text-emerald-300'
            : 'shrink-0 p-2 rounded-lg border transition-all bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'}
        title={tip}
        aria-label={action}
        aria-keyshortcuts={key || undefined}
        onclick={() => engine.replayNarration()}>
    {#if state.narrating}
        <svg viewBox="0 0 24 24" width="16" height="16" class="w-4 h-4" aria-hidden="true">
            <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
        </svg>
    {:else}
        <svg viewBox="0 0 24 24" width="16" height="16" class="w-4 h-4" aria-hidden="true"
             fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </svg>
    {/if}
</button>
