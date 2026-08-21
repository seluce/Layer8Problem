<!--
  The line above the terminal: version number, or a news ticker when one is
  running.

  The crossfade is a CSS transition on opacity and blur. The {#key} block
  recreates the element whenever the text changes, which restarts the scrolling
  animation — a news item that reused the element would start mid-scroll.

  How long a ticker stays is decided by the engine, not here.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { t } from '../i18n/i18n.svelte.js';
    import { renderRecipe } from '../engine/recipe.js';

    // The day records WHICH headline is running; the words come back out of the
    // tree, so the ticker follows a language switch.
    const news = $derived(renderRecipe(state.activeNews));
</script>

{#if news}
    {#key news}
        <div class="w-full h-4 overflow-hidden flex items-center news-fade"
             style="-webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent); mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);">
            <!-- Duration from the engine's own formula, so the scroll and the
                 timeout that clears the news can never drift apart: the text
                 leaves the screen in the same moment the engine removes it. -->
            <div class="whitespace-nowrap inline-block"
                 style="padding-left: 100%; animation: newsScroll linear forwards; animation-duration: {engine.newsDuration(news)}ms;">
                <!-- Identical in both languages on purpose: a machine speaking, see
                     GLOSSAR 2a. It sits in the dictionary all the same, so the
                     sameness is a recorded decision and not a missed string. -->
                <span class="text-amber-500 font-bold mr-2">{t('ticker.broadcast')}</span>
                <span class="text-slate-300 font-normal uppercase tracking-wide">{news}</span>
            </div>
        </div>
    {/key}
{:else}
    <span class="news-fade">TicketSystem {engine.VERSION}</span>
{/if}

<style>
    /* Fades in whenever the element is created, which is on every switch
       between version line and ticker. */
    .news-fade {
        animation: news-appear 500ms ease-out;
    }

    @keyframes news-appear {
        from { opacity: 0; filter: blur(4px); }
        to   { opacity: 1; filter: blur(0); }
    }
</style>
