<!--
  Startup sequence. The engine appends one line at a time to state.bootLines.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
</script>

{#each state.bootLines as line, i (i)}
    <div class="fade-in mb-1">&gt; {line}</div>
{/each}
