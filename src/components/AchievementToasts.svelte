<!--
  Achievement notifications, stacked bottom right.

  Enter and exit are Svelte transitions rather than CSS animations. The
  difference matters here: the old version had the fade-out in CSS (4s delay,
  0.5s duration) and the removal in JavaScript (5s timeout). Two places encoding
  the same schedule, which had already drifted apart by half a second — the
  toast sat invisible in the DOM until the timeout caught up.

  With out:fly the engine simply drops the entry and Svelte keeps the element
  alive until the animation has finished. One source of truth for the timing.

  Several at once (one long action crossing several achievement gates) stack
  as a column; the engine staggers their arrival and stretches their lifetime,
  see showToast() in engine_core.js. animate:flip is the third part: when the
  top toast leaves, the ones below slide into place instead of jumping.

  The layout follows the house panel (see .achievement-toast in app.css): dark
  background, amber edge on top, the medal on its own plinth. The three lines
  are deliberately different sizes - label, title, description - because the
  old version set title and text in the same style, so the eye had nothing to
  land on first.
-->
<script>
    import { fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { state } from '../engine/engine_state.svelte.js';
    import { t } from '../i18n/i18n.svelte.js';
    import { renderRecipe } from '../engine/recipe.js';

    // Titles carry their own emoji ("🗓️ Wochenendlich"). Next to the medal on
    // its plinth that would be a second symbol on the same line, so the toast
    // shows the name alone. The log keeps the emoji.
    // Both fields carry an IDENTITY, not words - so a toast follows a
    // language switch inside its own lifetime like everything else does.
    const withoutIcon = (title) =>
        String(renderRecipe(title) ?? '').replace(/^[^\p{L}\p{N}]+/u, '').trim();
</script>

{#each state.toasts as toast (toast.id)}
    <div class="achievement-toast"
         in:fly={{ x: 300, duration: 500 }}
         out:fly={{ x: 300, duration: 500 }}
         animate:flip={{ duration: 300 }}>
        <div class="ach-icon">
            <img src="assets/img/ui/ui_medal.webp" alt="" width="30" height="30"
                 class="w-[30px] h-[30px] select-none"
                 onerror={(e) => e.currentTarget.outerHTML = '🏅'}>
        </div>
        <div class="ach-text">
            <span class="ach-label">{toast.upgrade ? t('achievement.upgraded') : t('achievement.unlocked')}</span>
            <span class="ach-title">{withoutIcon(toast.title)}</span>
            <span class="ach-desc">{renderRecipe(toast.desc) ?? ''}</span>
        </div>
    </div>
{/each}
