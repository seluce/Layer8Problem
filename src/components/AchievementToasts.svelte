<!--
  Achievement notifications, stacked bottom right.

  Enter and exit are Svelte transitions rather than CSS animations. The
  difference matters here: the old version had the fade-out in CSS (4s delay,
  0.5s duration) and the removal in JavaScript (5s timeout). Two places encoding
  the same schedule, which had already drifted apart by half a second — the
  toast sat invisible in the DOM until the timeout caught up.

  With out:fly the engine simply drops the entry and Svelte keeps the element
  alive until the animation has finished. One source of truth for the timing.

  The layout follows the house panel (see .achievement-toast in app.css): dark
  background, amber edge on top, the medal on its own plinth. The three lines
  are deliberately different sizes - label, title, description - because the
  old version set title and text in the same style, so the eye had nothing to
  land on first.
-->
<script>
    import { fly } from 'svelte/transition';
    import { state } from '../engine/engine_state.svelte.js';

    // Titles carry their own emoji ("🗓️ Wochenendlich"). Next to the medal on
    // its plinth that would be a second symbol on the same line, so the toast
    // shows the name alone. The log keeps the emoji.
    const nurName = (titel) => String(titel ?? '').replace(/^[^\p{L}\p{N}]+/u, '').trim();
</script>

{#each state.toasts as toast (toast.id)}
    <div class="achievement-toast"
         in:fly={{ x: 300, duration: 500 }}
         out:fly={{ x: 300, duration: 500 }}>
        <div class="ach-icon">
            <img src="assets/img/ui/ui_medal.webp" alt="" width="30" height="30"
                 class="w-[30px] h-[30px] select-none"
                 onerror={(e) => e.currentTarget.outerHTML = '🏅'}>
        </div>
        <div class="ach-text">
            <span class="ach-label">{toast.upgrade ? 'Erfolg aufgewertet' : 'Erfolg freigeschaltet'}</span>
            <span class="ach-title">{nurName(toast.title)}</span>
            <span class="ach-desc">{toast.desc}</span>
        </div>
    </div>
{/each}
