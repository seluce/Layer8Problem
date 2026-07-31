<!--
  Achievement notifications, stacked bottom right.

  Enter and exit are Svelte transitions rather than CSS animations. The
  difference matters here: the old version had the fade-out in CSS (4s delay,
  0.5s duration) and the removal in JavaScript (5s timeout). Two places encoding
  the same schedule, which had already drifted apart by half a second — the
  toast sat invisible in the DOM until the timeout caught up.

  With out:fly the engine simply drops the entry and Svelte keeps the element
  alive until the animation has finished. One source of truth for the timing.
-->
<script>
    import { fly } from 'svelte/transition';
    import { state } from '../engine/engine_state.svelte.js';
</script>

{#each state.toasts as toast (toast.id)}
    <div class="achievement-toast"
         in:fly={{ x: 300, duration: 500 }}
         out:fly={{ x: 300, duration: 500 }}>
        <div class="ach-icon">🏆</div>
        <div class="ach-text">
            <span class="ach-title">{toast.title}</span><br>
            <span class="ach-desc">{toast.desc}</span>
        </div>
    </div>
{/each}
