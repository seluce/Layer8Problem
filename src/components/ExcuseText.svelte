<!--
  The excuse offered when you want out of an event.

  Drawn once per event rather than on every opening of the dialog, and never
  while it is on screen — otherwise the text would change under the player's
  eyes on any unrelated state update.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
</script>

<p id="excuse-text" class="text-base text-slate-300 italic">
    "{state.currentExcuse}"
</p>
