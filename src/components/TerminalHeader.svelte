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
</script>

{#if state.activeNewsText}
    {#key state.activeNewsText}
        <div class="w-full h-4 overflow-hidden flex items-center news-fade"
             style="-webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent); mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);">
            <div class="whitespace-nowrap inline-block" style="padding-left: 100%; animation: newsScroll 30s linear forwards;">
                <span class="text-amber-500 font-bold mr-2">[GLOBAL CORP BROADCAST]</span>
                <span class="text-slate-300 font-normal uppercase tracking-wide">{state.activeNewsText}</span>
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
