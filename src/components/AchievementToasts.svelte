<!--
  Achievement notifications, stacked bottom right.

  The engine pushes onto state.toasts and drops entries again after five
  seconds. Keeping them in a list rather than appending DOM nodes means several
  can be on screen at once without anyone tracking timers per element.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
</script>

{#each state.toasts as toast (toast.id)}
    <div class="achievement-toast">
        <div class="ach-icon">🏆</div>
        <div class="ach-text">
            <span class="ach-title">{toast.title}</span><br>
            <span class="ach-desc">{toast.desc}</span>
        </div>
    </div>
{/each}
