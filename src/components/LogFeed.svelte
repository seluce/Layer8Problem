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

    const entries = $derived([...state.logEntries].reverse());
</script>

{#each entries as entry (entry.id)}
    <div>
        <span class="text-slate-500">[{entry.time}]</span>
        <span class={entry.color}>{entry.msg}</span>
    </div>
{/each}
