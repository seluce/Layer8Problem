<!--
  The settings page, in four tabs.

  Until 4.1 this was 280 lines of markup in index.html: 17 controls, each one an
  id that openSettings() looked up to push the current value back into the DOM.
  The state was already the truth - visualFX, audioVolume and the rest live in
  engine_state - so the markup was a copy, and keeping the copy in step was a
  list of sixteen getElementById lines that had to grow with every new option.

  Now every control reads state directly. The engine functions stay: they write
  to localStorage and several have side effects (starting music, setting a class
  on <body>). The component calls them and reads the result, so the engine says
  WHAT changed and the markup decides how it looks.

  TABS, NOT ONE LONG PAGE. Until the narration audit this was five headed
  sections stacked on one scrolling page, with the key bindings in a window of
  their own on top of it - which is not how a PC game's settings read any
  more, and left a ten-pixel line under each control to explain it. Four tabs
  now, with related sections merged: General (language, starting a game,
  convenience, challenge, reset), Audio (sound and the narrator, including
  WHAT it reads), Display, Controls (the key bindings, inline). Fewer rows per
  page buys the descriptions a readable size and each tab a sentence of its
  own.

  The language stays first on the first tab, and its title is bilingual:
  someone who landed in the wrong language is looking for exactly that row and
  cannot read the rest of the page to find it.

  Not in here: export, import and the hard reset. They sit in the same dialog
  but are separate operations with file access and confirmations.
-->
<script>
    // Renamed so the $state rune stays usable in this file - see the pitfall
    // noted in STRUCTURE.md.
    import { state as game, NARRATION_RATE_MIN, NARRATION_RATE_MAX } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { LANGUAGES, language, switchLanguage, t } from '../i18n/i18n.svelte.js';
    import KeybindView from './KeybindView.svelte';

    // The switch is the same nine-utility construction on every row, so it is
    // named once. Written out in full, not assembled, so Tailwind can find it.
    // peer-focus-visible:* draws the ring on the VISIBLE switch: the checkbox
    // itself is sr-only, so the browser's own outline lands on something
    // nobody can see - which is why outline-hidden sits on it. Until 6.4
    // nothing took its place, and tabbing through the settings said nothing
    // about where you were.
    const SWITCH = 'w-9 h-5 bg-slate-700 peer-focus:outline-hidden peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-slate-900 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500';

    const SLIDER = 'flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500';

    // The reading speed as a player reads it: "1,25×" in German, "1.25×" in English.
    const rateLabel = $derived(`${Number(game.narrationRate).toLocaleString(language(), { maximumFractionDigits: 2 })}×`);

    // The tab buttons, whole on both sides of the condition: Tailwind reads
    // the source, and a class assembled at runtime would lose its colour.
    const TAB_ON  = 'flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-w-0 px-1 sm:px-3 py-2 sm:py-2.5 rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 bg-amber-500/10 border-amber-500/70 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.15)]';
    const TAB_OFF = 'flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 min-w-0 px-1 sm:px-3 py-2 sm:py-2.5 rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500';

    // Some options only do something below a certain width - the phone panel
    // is laid out with 'hidden lg:flex', so auto-minimising cannot change
    // anything from 1024px up. Without this the switch flips and nothing
    // happens, which reads as a broken setting rather than an inactive one.
    let wide = $state(typeof window !== 'undefined' && window.innerWidth >= 1024);
    $effect(() => {
        const onResize = () => (wide = window.innerWidth >= 1024);
        window.addEventListener('resize', onResize);
        onResize();
        return () => window.removeEventListener('resize', onResize);
    });

    // The reset button swaps its colours rather than layering !important on top
    // of them, which is why the resting state keeps its hover utilities and the
    // armed state does not: while it is asking, it should not react to the
    // mouse at all.
    const RESET_BASE  = 'shrink-0 text-[0.6875rem] font-bold uppercase tracking-widest border rounded-sm px-4 py-2 transition-colors min-w-[7.5rem]';
    const RESET_IDLE  = 'text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-700 border-slate-600 hover:border-slate-400';
    const RESET_ARMED = 'text-red-300 bg-red-950/40 border-red-500/70';

    // $derived, not const, and that is the whole point of this page: this is
    // the one screen from which the language can be changed, so it is the one
    // screen that must survive the change. A plain const would read the
    // dictionary once at mount and keep the words of the language the player
    // just left - on the very row they used to leave it.
    const MUSIC_STYLES = $derived([
        ['radio',     t('set.music.radio')],
        ['elevator',  t('set.music.elevator')],
        ['lofi',      t('set.music.lofi')],
        ['detective', t('set.music.detective')],
        ['bossa',     t('set.music.bossa')]
    ]);

    const TEXT_SIZES = $derived([
        ['normal', t('set.textSize.normal')],
        ['large',  t('set.textSize.large')],
        ['xlarge', t('set.textSize.xlarge')]
    ]);

    // Each language names itself, so the entry stays readable from the wrong
    // side: 'Deutsch' and 'English' read the same in both dictionaries.
    // i18n-uses: language.name.de, language.name.en
    const LANGUAGE_OPTIONS = $derived(LANGUAGES.map(l => [l, t(`language.name.${l}`)]));

    // Two presets rather than one: the pickers ask different questions, so a
    // single value could only ever answer one of them. Both default to 'ask',
    // which is the behaviour players already know.
    const DIFFICULTIES = $derived([
        ['ask',    t('set.diff.ask')],
        ['easy',   t('set.diff.easy')],
        ['normal', t('set.diff.normal')],
        ['hard',   t('set.diff.hard')]
    ]);

    const WEEK_DIFFICULTIES = $derived([
        ['ask',    t('set.diff.ask')],
        ['easy',   t('set.week.easy')],
        ['normal', t('set.week.normal')],
        ['hard',   t('set.week.hard')]
    ]);

    // What the narrator reads of its own accord - see DEFAULT_NARRATION_KINDS.
    // i18n-uses: set.narration.kind.events.title, set.narration.kind.events.desc
    // i18n-uses: set.narration.kind.emergencies.title, set.narration.kind.emergencies.desc
    // i18n-uses: set.narration.kind.mails.title, set.narration.kind.mails.desc
    // i18n-uses: set.narration.kind.excuses.title, set.narration.kind.excuses.desc
    // i18n-uses: set.narration.kind.morning.title, set.narration.kind.morning.desc
    // i18n-uses: set.narration.kind.valves.title, set.narration.kind.valves.desc
    // i18n-uses: set.narration.kind.halgerd.title, set.narration.kind.halgerd.desc
    const KINDS = ['events', 'emergencies', 'mails', 'excuses', 'morning', 'valves', 'halgerd'];

    // Icon, wording and wiring of every row, by tab and section, in the order
    // they appear.
    //
    // get() is called during rendering, which is what makes the row follow the
    // state: reading game.visualFX here registers the dependency. set() goes to
    // the engine function rather than to the field, because those functions are
    // where localStorage and the side effects live.
    const TABS = $derived([
        {
            id: 'general', icon: '⚙️', img: 'ui_menu', label: t('set.tab.general'),
            lead: t('set.tab.general.lead'),
            sections: [
                { title: t('language.both'), accent: 'text-blue-400', rows: [
                    { kind: 'select', icon: '🌐', img: 'set_language', title: t('language.label'),
                      desc: t('language.hint'),
                      focus: 'focus:border-blue-500', options: LANGUAGE_OPTIONS,
                      get: () => language(), set: (v) => switchLanguage(v) }
                ] },
                { title: t('set.section.start'), accent: 'text-emerald-400', rows: [
                    { kind: 'select', icon: '⏱️', img: 'set_difficulty', title: t('set.defaultDiff.title'),
                      desc: t('set.defaultDiff.desc'),
                      focus: 'focus:border-emerald-500', options: DIFFICULTIES,
                      get: () => game.defaultDiff, set: (v) => engine.saveDefaultDifficulty(v) },
                    { kind: 'select', icon: '🗓️', img: 'set_difficulty_week', title: t('set.defaultWeek.title'),
                      desc: t('set.defaultWeek.desc'),
                      focus: 'focus:border-emerald-500', options: WEEK_DIFFICULTIES,
                      get: () => game.defaultWeekDiff, set: (v) => engine.saveDefaultWeekDifficulty(v) }
                ] },
                { title: t('set.section.comfort'), accent: 'text-emerald-400', grid: true, rows: [
                    { kind: 'toggle', icon: '⚡', img: 'set_fastitems', title: t('set.oneClick.title'),
                      desc: t('set.oneClick.desc'),
                      get: () => game.oneClickItem, set: (v) => engine.toggleOneClick(v) },
                    { kind: 'toggle', icon: '📈', img: 'set_chart', title: t('set.autoChart.title'),
                      desc: t('set.autoChart.desc'),
                      get: () => !!game.autoChart, set: (v) => engine.toggleAutoChart(v) }
                ] },
                { title: t('set.section.challenge'), accent: 'text-red-400', grid: true, rows: [
                    { kind: 'toggle', icon: '❓', img: 'set_hidestats', title: t('set.blindStats.title'),
                      desc: t('set.blindStats.desc'),
                      get: () => game.blindStats, set: (v) => engine.toggleBlindStats(v) },
                    { kind: 'toggle', icon: '❔', img: 'set_hidetickets', title: t('set.blindTickets.title'),
                      desc: t('set.blindTickets.desc'),
                      get: () => game.blindTickets, set: (v) => engine.toggleBlindTickets(v) }
                ] },
                { title: t('set.section.system'), accent: 'text-slate-400', rows: [
                    { kind: 'reset', icon: '♻️', img: 'set_reset', title: t('set.reset.title'),
                      desc: t('set.reset.desc') }
                ] }
            ]
        },
        {
            id: 'audio', icon: '🔊', img: 'set_music', label: t('set.tab.audio'),
            lead: t('set.tab.audio.lead'),
            sections: [
                { title: t('set.section.sound'), accent: 'text-amber-400', grid: true, rows: [
                    { kind: 'slider', icon: '🔔', img: 'set_sfx', title: t('set.sfx.title'),
                      desc: t('set.sfx.desc'),
                      get: () => game.audioEffects, set: (v) => engine.toggleAudio(v),
                      level: () => game.audioVolume, setLevel: (v) => engine.setVolume(v),
                      step: 0.05, levelTitle: t('set.sfx.level') },
                    { kind: 'slider', icon: '🎵', img: 'set_music', title: t('set.music.title'),
                      desc: t('set.music.desc'),
                      get: () => game.musicEnabled, set: (v) => engine.toggleMusic(v),
                      level: () => game.musicVolume, setLevel: (v) => engine.setMusicVolume(v),
                      step: 0.01, levelTitle: t('set.music.level') },
                    { kind: 'select', icon: '📻', img: 'set_musicstyle', title: t('set.musicStyle.title'),
                      desc: t('set.musicStyle.desc'),
                      focus: 'focus:border-amber-500', options: MUSIC_STYLES,
                      get: () => game.musicStyle, set: (v) => engine.changeMusicStyle(v) }
                ] },
                { title: t('set.section.narration'), accent: 'text-amber-400', rows: [
                    // No `img` yet: every other row has a drawn icon and this
                    // one has none, so it falls back to the emoji rather than
                    // to a missing file. See the note in UEBERGABE.md.
                    { kind: 'narrator', icon: '🎙️', title: t('set.narration.title'),
                      desc: t('set.narration.desc'),
                      get: () => game.narrationEnabled, set: (v) => engine.toggleNarration(v),
                      level: () => game.narrationVolume, setLevel: (v) => engine.setNarrationVolume(v),
                      settled: () => engine.previewNarration(),
                      step: 0.05, levelTitle: t('set.narration.level') }
                ] }
            ]
        },
        {
            id: 'display', icon: '🖥️', img: 'ui_eye', label: t('set.tab.display'),
            lead: t('set.tab.display.lead'),
            sections: [
                { title: t('set.section.layout'), accent: 'text-cyan-400', grid: true, rows: [
                    { kind: 'select', icon: '🔠', img: 'set_textsize', title: t('set.textSize.title'),
                      desc: t('set.textSize.desc'),
                      focus: 'focus:border-cyan-500', options: TEXT_SIZES,
                      get: () => game.textSize ?? 'normal', set: (v) => engine.setTextSize(v) },
                    { kind: 'toggle', icon: '🗜️', img: 'set_compact', title: t('set.compact.title'),
                      desc: t('set.compact.desc'),
                      get: () => game.compactMode, set: (v) => engine.toggleCompactMode(v) },
                    { kind: 'toggle', icon: '📱', img: 'set_phonemin', title: t('set.autoHidePhone.title'),
                      desc: t('set.autoHidePhone.desc'),
                      inactive: () => wide,
                      inactiveNote: t('set.autoHidePhone.inactive'),
                      get: () => game.autoHidePhone, set: (v) => engine.toggleAutoHidePhone(v) }
                ] },
                { title: t('set.section.effects'), accent: 'text-cyan-400', grid: true, rows: [
                    { kind: 'toggle', icon: '💓', img: 'set_pulse', title: t('set.fx.title'),
                      desc: t('set.fx.desc'),
                      get: () => game.visualFX, set: (v) => engine.toggleFX(v) },
                    { kind: 'toggle', icon: '🫨', img: 'set_shake', title: t('set.shake.title'),
                      desc: t('set.shake.desc'),
                      get: () => game.screenShake, set: (v) => engine.toggleShake(v) },
                    { kind: 'toggle', icon: '💬', img: 'set_chatanim', title: t('set.fastChat.title'),
                      desc: t('set.fastChat.desc'),
                      get: () => game.fastChat, set: (v) => engine.toggleFastChat(v) },
                    { kind: 'toggle', icon: '📺', img: 'set_scanlines', title: t('set.scanlines.title'),
                      desc: t('set.scanlines.desc'),
                      get: () => game.scanlines !== false, set: (v) => engine.toggleScanlines(v) }
                ] }
            ]
        },
        {
            id: 'controls', icon: '⌨️', img: 'set_keys', label: t('set.tab.controls'),
            lead: t('keybind.subtitle'),
            keys: true,
            sections: []
        }
    ]);

    // The tab the player last looked at. The component is mounted once and
    // stays, so reopening the menu finds the same tab again.
    let active = $state('general');

    // A key half-bound when the tab changes would swallow the next key the
    // player presses anywhere - binding mode listens to the whole document.
    function select(id) {
        if (game.isBindingKey) { game.isBindingKey = false; game.actionToBind = null; }
        active = id;
    }

    // The WAI-ARIA tabs pattern: arrows move between the tabs and select, Home
    // and End jump to the ends. One tab in the Tab order at a time, so Tab
    // itself goes on into the panel rather than through four buttons.
    function onTabKey(e, i) {
        const ids = TABS.map(tab => tab.id);
        let next = null;
        if (e.key === 'ArrowRight') next = (i + 1) % ids.length;
        else if (e.key === 'ArrowLeft') next = (i - 1 + ids.length) % ids.length;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = ids.length - 1;
        if (next === null) return;
        e.preventDefault();
        select(ids[next]);
        document.getElementById(`set-tab-${ids[next]}`)?.focus();
    }
</script>

{#snippet icon(row, iconClass)}
    {#if row.img}
        <img src="assets/img/ui/{row.img}.webp" alt=""
             width="24" height="24"
             class="{iconClass.includes('text-xl') ? 'w-7 h-7' : 'w-6 h-6'} shrink-0 select-none {iconClass}"
             onerror={(e) => e.currentTarget.outerHTML = `<span class="${iconClass}">${row.icon}</span>`}>
    {:else}
        <span class={iconClass}>{row.icon}</span>
    {/if}
{/snippet}

<!-- The description at a size somebody can read. It used to be ten pixels in
     slate-500, which was the price of fitting every control on one page.
     An option without effect greys its title and icon, never its words: the
     whole card used to go to half opacity, and the note saying WHY it had no
     effect went with it, down to a contrast of 2.3. -->
{#snippet info(row, iconClass, off = false)}
    {@render icon(row, off ? `${iconClass} opacity-40` : iconClass)}
    <div class="flex flex-col min-w-0">
        <span class="text-sm font-medium {off ? 'text-slate-400' : 'text-slate-200'} leading-tight">{row.title}</span>
        <span class="text-xs text-slate-400 mt-1 leading-snug">{row.desc}</span>
    </div>
{/snippet}

{#snippet switchInput(row)}
    {@const off = row.inactive?.() ?? false}
    <label class="relative inline-flex items-center shrink-0 {off ? 'cursor-not-allowed' : 'cursor-pointer'}">
        <input type="checkbox" class="sr-only peer" aria-label={row.title} disabled={off}
               checked={row.get()} onchange={(e) => row.set(e.currentTarget.checked)}>
        <div class="{SWITCH} {off ? 'opacity-40' : ''}"></div>
    </label>
{/snippet}

{#snippet toggleRow(row)}
    {@const off = row.inactive?.() ?? false}
    <!-- An option without effect is greyed out and says why, instead of
         silently swallowing the click. It keeps its stored value: made
         narrower again, it works as before. -->
    <div class="flex flex-col gap-1 group bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
        <div class="flex justify-between items-center gap-4">
            <div class="flex items-start gap-3 flex-1 min-w-0">
                {@render info(row, off ? 'text-base mt-0.5' : 'text-base opacity-70 group-hover:opacity-100 transition-opacity mt-0.5', off)}
            </div>
            {@render switchInput(row)}
        </div>
        {#if off && row.inactiveNote}
            <p class="text-xs text-amber-500/80 pl-9">{row.inactiveNote}</p>
        {/if}
    </div>
{/snippet}

<!--
  Switch and level in one card. Only oninput is wired: the markup used to carry
  onchange as well, both pointing at the same setter, so every drag of the
  slider saved twice.
-->
{#snippet sliderRow(row)}
    <div class="flex flex-col gap-3 group bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
        <div class="flex justify-between items-center gap-4">
            <div class="flex items-start gap-3 flex-1 min-w-0">
                {@render info(row, 'text-xl opacity-70 group-hover:opacity-100 transition-opacity mt-0.5')}
            </div>
            {@render switchInput(row)}
        </div>
        <!-- At full strength. It rested at half until hovered, and a phone
             has no hover: the slider stood there greyed as if switched off. -->
        <div class="flex items-center gap-3 mt-1 pl-9 pr-1">
            <span class="text-[0.625rem] text-slate-400">🔈</span>
            <!-- `onchange` as well as `oninput`: a row may want to answer when
                 the slider is LET GO rather than on every step of a drag. The
                 narrator does - its sample is a whole sentence, and restarting
                 it on each tick would be a stutter, not a volume control. -->
            <input type="range" min="0" max="1" step={row.step} class={SLIDER}
                   aria-label={row.levelTitle}
                   value={row.level()} oninput={(e) => row.setLevel(e.currentTarget.value)}
                   onchange={() => row.settled?.()}>
            <span class="text-[0.625rem] text-slate-400">🔊</span>
        </div>
    </div>
{/snippet}

{#snippet selectRow(row)}
    <!-- A select spans both columns of a grid: its control is 13rem wide and
         wants the room. -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 group bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 md:col-span-2">
        <div class="flex items-start gap-3 flex-1 w-full min-w-0">
            {@render info(row, 'text-base opacity-70 group-hover:opacity-100 transition-opacity mt-0.5')}
        </div>
        <select class="w-full sm:w-52 bg-slate-900 border border-slate-600 text-white text-xs rounded-sm px-2 py-1.5 {row.focus} outline-hidden cursor-pointer shadow-xs shrink-0"
                aria-label={row.title}
                value={row.get()} onchange={(e) => row.set(e.currentTarget.value)}>
            {#each row.options as [value, label] (value)}
                <option {value}>{label}</option>
            {/each}
        </select>
    </div>
{/snippet}

<!--
  The narrator in one card: the switch, the level, and what it reads of its own
  accord. They were two cards first - a slider row and a list - and the slider
  of a full-width row ran across the whole dialog, a bar six hundred pixels
  long for one setting.

  From md up the level sits in the header between the title and the switch, at
  a fixed width, which is where a volume control is looked for; on a phone it
  goes under the title, where there is no room beside it. One grid does both,
  so there is one slider and not a hidden twin for the other width.

  The kinds are shown with the narrator off as well, greyed and saying why: a
  group that appears only once the voice is on is a group nobody finds before
  deciding whether to turn it on. The button beside the excuse (and V)
  ignores all of this - the note says so, because that is the question a
  player who switched everything off asks next.
-->
{#snippet narratorRow(row)}
    {@const off = !game.narrationEnabled}
    <div class="flex flex-col gap-3 group bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
        <!-- The third column has a width of its own so the speed row below can
             use the same grid: its slider then starts and ends exactly under
             this one, with the speed figure where the switch is. -->
        <div class="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_14rem_3rem] items-center gap-x-4 gap-y-3">
            <div class="flex items-start gap-3 min-w-0 col-start-1 row-start-1">
                {@render info(row, 'text-xl opacity-70 group-hover:opacity-100 transition-opacity mt-0.5')}
            </div>
            <div class="flex items-center gap-2 col-span-2 md:col-span-1 row-start-2 md:row-start-1 md:col-start-2 pl-9 md:pl-0">
                <span class="text-[0.625rem] text-slate-400">🔈</span>
                <input type="range" min="0" max="1" step={row.step} class={SLIDER}
                       aria-label={row.levelTitle}
                       value={row.level()} oninput={(e) => row.setLevel(e.currentTarget.value)}
                       onchange={() => row.settled?.()}>
                <span class="text-[0.625rem] text-slate-400">🔊</span>
            </div>
            <div class="col-start-2 md:col-start-3 row-start-1 justify-self-end">
                {@render switchInput(row)}
            </div>
        </div>

        <!-- How fast it reads. The same slider as the level, and like it the
             sample plays when it is let go, not on every step - a sample of
             its own, which says "fast" where the level's says "loud". -->
        <div class="border-t border-slate-700/60 pt-3 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_14rem_3rem] items-center gap-x-4 gap-y-2">
            <div class="flex flex-col min-w-0 col-start-1 row-start-1">
                <span class="text-xs font-bold text-slate-200">{t('set.narration.rate.title')}</span>
                <span class="text-xs text-slate-400 leading-snug">{t('set.narration.rate.desc')}</span>
            </div>
            <div class="flex items-center gap-2 col-span-2 md:col-span-1 row-start-2 md:row-start-1 md:col-start-2">
                <span class="text-[0.625rem] text-slate-400" aria-hidden="true">🐢</span>
                <input type="range" min={NARRATION_RATE_MIN} max={NARRATION_RATE_MAX} step="0.05" class={SLIDER}
                       aria-label={t('set.narration.rate.title')} aria-valuetext={rateLabel}
                       value={game.narrationRate} oninput={(e) => engine.setNarrationRate(e.currentTarget.value)}
                       onchange={() => engine.previewNarrationRate()}>
                <span class="text-[0.625rem] text-slate-400" aria-hidden="true">🐇</span>
            </div>
            <!-- A width of its own on a phone too. The column there is `auto`,
                 so "1×" and "1,15×" made it two different widths and the
                 description beside it re-wrapped and moved down a line on
                 the first step of the slider. -->
            <span class="col-start-2 md:col-start-3 row-start-1 justify-self-end w-12 text-right text-xs font-mono font-bold text-amber-400 tabular-nums">{rateLabel}</span>
        </div>

        <div class="border-t border-slate-700/60 pt-3 flex flex-col gap-2">
            <span class="text-xs font-bold text-slate-200">{t('set.narration.kinds.title')}</span>
            <span class="text-xs text-slate-400 leading-snug">{t('set.narration.kinds.desc')}</span>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                {#each KINDS as kind (kind)}
                    {@const title = t(`set.narration.kind.${kind}.title`)}
                    <div class="flex justify-between items-center gap-3 bg-slate-900/60 border border-slate-700/60 rounded-md px-3 py-2">
                        <div class="flex flex-col min-w-0">
                            <span class="text-xs font-bold {off ? 'text-slate-400' : 'text-slate-200'} leading-tight">{title}</span>
                            <span class="text-[0.6875rem] text-slate-400 mt-0.5 leading-snug">{t(`set.narration.kind.${kind}.desc`)}</span>
                        </div>
                        <label class="relative inline-flex items-center shrink-0 {off ? 'cursor-not-allowed' : 'cursor-pointer'}">
                            <input type="checkbox" class="sr-only peer" aria-label={title} disabled={off}
                                   checked={game.narrationKinds?.[kind] !== false}
                                   onchange={(e) => engine.setNarrationKind(kind, e.currentTarget.checked)}>
                            <div class="{SWITCH} {off ? 'opacity-40' : ''}"></div>
                        </label>
                    </div>
                {/each}
            </div>
            {#if off}
                <p class="text-xs text-amber-500/80">{t('set.narration.kinds.off')}</p>
            {/if}
        </div>
    </div>
{/snippet}

<!--
  Two-step confirmation. The engine only flips state.settingsResetArmed; what
  the button then says and how it looks is decided here - same division as
  flashBinding() and the key bindings.
-->
{#snippet resetRow(row)}
    <div class="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-start gap-3 flex-1 min-w-0">
            {@render info(row, 'text-base opacity-70 mt-0.5')}
        </div>
        <button type="button" onclick={() => engine.confirmResetSettings()}
                class="{RESET_BASE} {game.settingsResetArmed ? RESET_ARMED : RESET_IDLE}">
            {game.settingsResetArmed ? t('set.reset.confirm') : t('set.reset.button')}
        </button>
    </div>
{/snippet}

{#snippet control(row)}
    {#if row.kind === 'toggle'}
        {@render toggleRow(row)}
    {:else if row.kind === 'slider'}
        {@render sliderRow(row)}
    {:else if row.kind === 'select'}
        {@render selectRow(row)}
    {:else if row.kind === 'narrator'}
        {@render narratorRow(row)}
    {:else}
        {@render resetRow(row)}
    {/if}
{/snippet}

<!--
  The tab bar sticks to the top of the scrolling view, so a long tab never
  takes the way to the others with it. Four equal columns at every width: on a
  phone the icon stands over the word, from sm up beside it. The negative
  margins let its background run to the edges of the padded view it sits in -
  and -top-5 is that padding again: at top-0 the bar stuck 20px down, at the
  edge of the padding, and the page scrolled visibly through the gap above it.
-->
<div role="tablist" aria-label={t('set.tabs')}
     class="sticky -top-5 z-10 -mx-5 px-5 pt-1 pb-3 mb-4 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 grid grid-cols-4 gap-1">
    {#each TABS as tab, i (tab.id)}
        <button type="button" role="tab" id="set-tab-{tab.id}"
                aria-selected={active === tab.id} aria-controls="set-panel-{tab.id}"
                tabindex={active === tab.id ? 0 : -1}
                class={active === tab.id ? TAB_ON : TAB_OFF}
                onclick={() => select(tab.id)} onkeydown={(e) => onTabKey(e, i)}>
            {@render icon(tab, 'text-lg leading-none')}
            <!-- No letter-spacing on a phone: at 375px a tab is 69px wide, and
                 ALLGEMEIN and STEUERUNG lost their last letters to it. -->
            <span class="text-[0.625rem] sm:text-xs font-bold uppercase tracking-normal sm:tracking-widest truncate max-w-full">{tab.label}</span>
        </button>
    {/each}
</div>

{#each TABS as tab (tab.id)}
    {#if active === tab.id}
        <div role="tabpanel" id="set-panel-{tab.id}" aria-labelledby="set-tab-{tab.id}" tabindex="0"
             class="space-y-6 fade-in focus-visible:outline-2 focus-visible:outline-cyan-400 rounded-sm">
            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">{tab.lead}</p>

            {#each tab.sections as section (section.title)}
                <div>
                    <h3 class="text-[0.625rem] font-bold {section.accent} uppercase tracking-widest mb-2 border-b border-slate-700 pb-1">{section.title}</h3>
                    <div class={section.grid ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'flex flex-col gap-3'}>
                        {#each section.rows as row (row.title)}
                            {@render control(row)}
                        {/each}
                    </div>
                </div>
            {/each}

            {#if tab.keys}
                <KeybindView />
                <button type="button" onclick={() => engine.resetKeybinds()}
                        class="w-full sm:w-auto sm:px-8 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-bold py-3 rounded-lg transition-colors text-xs uppercase tracking-widest">
                    {t('keybind.reset')}
                </button>
            {/if}
        </div>
    {/if}
{/each}
