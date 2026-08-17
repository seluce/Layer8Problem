<!--
  Activity log.

  Mounts into the existing #log-feed and renders only the entries, so the
  container keeps its layout classes and the mobile toggle keeps working on a
  stable element. It moves in here once the whole right-hand column becomes a
  component.

  Newest first: the array is read in reverse rather than unshifted, because
  pushing to the end is cheaper and the order is a display concern.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { renderRecipe } from '../engine/recipe.js';

    // renderRecipe() reads the language rune on its way past, so this recomputes
    // on a switch and every line written as a recipe repaints in the new
    // language. A line written by 5.x carries plain text and stays as it is,
    // for as long as the day it belongs to.
    //
    // null means the recipe no longer resolves - content edited away under a
    // save. Such a line is dropped rather than guessed at; see engine/recipe.js.
    const entries = $derived(
        [...state.logEntries]
            .reverse()
            .map(e => ({ ...e, text: renderRecipe(e) }))
            .filter(e => e.text !== null)
    );
</script>

{#each entries as entry (entry.id)}
    <div>
        <span class="text-slate-500">[{entry.time}]</span>
        <span class={entry.color}>{entry.text}</span>
    </div>
{/each}
