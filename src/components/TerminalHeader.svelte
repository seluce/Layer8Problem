<!--
  The line above the terminal: GlobalCorp FM on the left while the station is
  there, and on the right the version number or a news ticker when one is
  running.

  The crossfade is a CSS transition on opacity and blur. The {#key} block
  recreates the element whenever the text changes, which restarts the scrolling
  animation — a news item that reused the element would start mid-scroll.

  How long a ticker stays is decided by the engine, not here.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { t, tf } from '../i18n/i18n.svelte.js';
    import { renderRecipe } from '../engine/recipe.js';

    // The day records WHICH headline is running; the words come back out of the
    // tree, so the ticker follows a language switch.
    const news = $derived(renderRecipe(state.activeNews));

    // GlobalCorp FM (7.2.1, engine_radio.js "THE BUTTON"). The engine says
    // which of five states the station is in; this only draws it. Whole class
    // names per state - never composed, or Tailwind cannot see them.
    // i18n-uses: fm.later, fm.play, fm.cancel, fm.stop
    const station = $derived(state.fmStation);
    const LOOK = {
        idle:  { dot: 'bg-slate-600',               name: 'text-slate-400',  tip: 'fm.later' },
        ready: { dot: 'bg-amber-400 animate-pulse', name: 'text-amber-400',  tip: 'fm.play' },
        asked: { dot: 'bg-amber-400',               name: 'text-amber-400',  tip: 'fm.cancel' },
        onair: { dot: 'bg-red-500 animate-pulse',   name: 'text-amber-400',  tip: 'fm.stop' },
    };
    const look = $derived(LOOK[station] ?? null);
    // A headline needs the line more than the station does on a phone, where
    // the sign would leave the ticker a third of it: it steps aside there
    // while one runs. From sm up there is room for both, and the ON AIR stop
    // stays in reach.
    const show = $derived(news ? 'hidden sm:inline-flex' : 'inline-flex');
    const tag = $derived(station === 'ready' ? t('fm.ready')
                       : station === 'asked' ? t('fm.asked')
                       : station === 'onair' ? t('fm.onAir') : '');

    // Its key (F unless rebound), ReadButton's way: in the tooltip, where a
    // mouse player finds out it exists, and in aria-keyshortcuts for a screen
    // reader. Empty when the default was already taken. Not on the dimmed
    // sign, where the key does nothing either.
    const key = $derived((state.keyBinds.radio ?? '').replace(/^Arrow/, '').toUpperCase());
    const tip = $derived(!look ? ''
                       : key && station !== 'idle' ? tf('term.narrate.withKey', { action: t(look.tip), key })
                       : t(look.tip));

    // What a screen reader is told without asking: that a spot is waiting,
    // and that a press was taken. Not ON AIR - the spot says that itself, and
    // a voice reading the sign would talk over its first words. The region
    // below stands at all times and is empty otherwise: one created with its
    // text in it is not reliably read.
    // i18n-uses: fm.say.ready, fm.say.readyKey, fm.say.asked
    const say = $derived(station === 'ready' ? (key ? tf('fm.say.readyKey', { key }) : t('fm.say.ready'))
                       : station === 'asked' ? t('fm.say.asked') : '');

    // The button lets go of the focus after every press, the keyboard's too.
    // Space belongs to the terminal's continue button and presses this one
    // only while it holds the ring (src/engine.js, the confirm key); kept,
    // the next Space - meant for the result - would end the spot it had just
    // started. Tab finds it again at once: it is the page's first stop.
    function press(e) {
        engine.askRadio();
        e.currentTarget.blur();
    }
</script>

<div class="flex items-center gap-3 w-full min-w-0">
    <span class="sr-only" role="status">{say}</span>
    {#if look}
        <!-- A real button in every state; idle it does nothing and says why.
             The padding is the hit area, the negative margin gives the line
             its height back: 14 px of text is a thin strip for a thumb, and
             with py-2 the button is 30 px tall without moving anything. The
             line around it lets the pointer through (index.html), the button
             takes it back. -->
        <button type="button" data-fm-station
                class="news-fade pointer-events-auto shrink-0 {show} items-center gap-1.5 rounded px-1 -mx-1 py-2 -my-2 hover:text-amber-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-amber-400"
                aria-disabled={station === 'idle'}
                title={tip} aria-label="{t('fm.station')}: {t(look.tip)}"
                aria-keyshortcuts={key || undefined}
                onclick={press}>
            <span class="w-1.5 h-1.5 rounded-full {look.dot}" aria-hidden="true"></span>
            <span class="font-bold {look.name}">{t('fm.station')}</span>
            {#if tag}<span class="text-slate-300">{tag}</span>{/if}
        </button>
    {/if}

    <div class="flex-1 min-w-0 text-right">
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
            <!-- One line, cut short rather than broken: on a phone the
                 station's longest state leaves it a hundred pixels. -->
            <span class="news-fade block truncate">TicketSystem {engine.VERSION}</span>
        {/if}
    </div>
</div>

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
