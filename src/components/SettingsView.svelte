<!--
  The settings page.

  Until 4.1 this was 280 lines of markup in index.html: 17 controls, each one an
  id that openSettings() looked up to push the current value back into the DOM.
  The state was already the truth - visualFX, audioVolume and the rest live in
  engine_state - so the markup was a copy, and keeping the copy in step was a
  list of sixteen getElementById lines that had to grow with every new option.

  Now every control reads state directly. The engine functions stay: they write
  to localStorage and several have side effects (starting music, setting a class
  on <body>). The component calls them and reads the result, so the engine says
  WHAT changed and the markup decides how it looks.

  Not in here: export, import and the hard reset. They sit in the same dialog
  but are separate operations with file access and confirmations.
-->
<script>
    // Renamed so the $state rune stays usable in this file - see the pitfall
    // noted in STRUCTURE.md.
    import { state as game } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { LANGUAGES, language, switchLanguage, t } from '../i18n/i18n.svelte.js';

    // The switch is the same nine-utility construction on every row, so it is
    // named once. Written out in full, not assembled, so Tailwind can find it.
    const SWITCH = 'w-9 h-5 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500';

    const SLIDER = 'flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500';

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
    const RESET_BASE  = 'shrink-0 text-[11px] font-bold uppercase tracking-widest border rounded-sm px-4 py-2 transition-colors min-w-[7.5rem]';
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

    // Icon, wording and wiring of every row, in the order they appear.
    //
    // get() is called during rendering, which is what makes the row follow the
    // state: reading game.visualFX here registers the dependency. set() goes to
    // the engine function rather than to the field, because those functions are
    // where localStorage and the side effects live.
    const SECTIONS = $derived([
        {
            // First, and titled in both languages: someone who landed in the
            // wrong one is looking for exactly this row and cannot read the
            // rest of the page to find it.
            title: t('language.label'),
            accent: 'text-blue-400',
            grid: false,
            rows: [
                { kind: 'select', icon: '🌐', img: 'set_language', title: t('language.label'),
                  desc: t('language.hint'),
                  focus: 'focus:border-blue-500', options: LANGUAGE_OPTIONS,
                  get: () => language(), set: (v) => switchLanguage(v) }
            ]
        },
        {
            title: t('set.section.audio'),
            accent: 'text-amber-400',
            grid: true,
            rows: [
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
            ]
        },
        {
            title: t('set.section.display'),
            accent: 'text-cyan-400',
            grid: true,
            rows: [
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
                  get: () => game.autoHidePhone, set: (v) => engine.toggleAutoHidePhone(v) },

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
            ]
        },
        {
            title: t('set.section.gameplay'),
            accent: 'text-emerald-400',
            grid: true,
            rows: [
                { kind: 'select', icon: '⏱️', img: 'set_difficulty', title: t('set.defaultDiff.title'),
                  desc: t('set.defaultDiff.desc'),
                  focus: 'focus:border-emerald-500', options: DIFFICULTIES,
                  get: () => game.defaultDiff, set: (v) => engine.saveDefaultDifficulty(v) },

                { kind: 'select', icon: '🗓️', img: 'set_difficulty_week', title: t('set.defaultWeek.title'),
                  desc: t('set.defaultWeek.desc'),
                  focus: 'focus:border-emerald-500', options: WEEK_DIFFICULTIES,
                  get: () => game.defaultWeekDiff, set: (v) => engine.saveDefaultWeekDifficulty(v) },

                { kind: 'toggle', icon: '⚡', img: 'set_fastitems', title: t('set.oneClick.title'),
                  desc: t('set.oneClick.desc'),
                  get: () => game.oneClickItem, set: (v) => engine.toggleOneClick(v) },

                { kind: 'toggle', icon: '📈', img: 'set_chart', title: t('set.autoChart.title'),
                  desc: t('set.autoChart.desc'),
                  get: () => !!game.autoChart, set: (v) => engine.toggleAutoChart(v) }
            ]
        },
        {
            title: t('set.section.challenge'),
            accent: 'text-red-400',
            grid: true,
            rows: [
                { kind: 'toggle', icon: '❓', img: 'set_hidestats', title: t('set.blindStats.title'),
                  desc: t('set.blindStats.desc'),
                  get: () => game.blindStats, set: (v) => engine.toggleBlindStats(v) },

                { kind: 'toggle', icon: '❔', img: 'set_hidetickets', title: t('set.blindTickets.title'),
                  desc: t('set.blindTickets.desc'),
                  get: () => game.blindTickets, set: (v) => engine.toggleBlindTickets(v) }
            ]
        },
        {
            // Keyboard and reset used to be a section each, one row apiece -
            // two headings and two gaps for two controls. They are both "the
            // system rather than the game", so they share a heading now.
            title: t('set.section.system'),
            accent: 'text-slate-400',
            grid: true,
            rows: [
                { kind: 'link', icon: '⌨️', img: 'set_keys', title: t('set.keybind.title'),
                  desc: t('set.keybind.desc'),
                  act: () => engine.openKeybinds() },

                { kind: 'reset', icon: '♻️', img: 'set_reset', title: t('set.reset.title'),
                  desc: t('set.reset.desc') }
            ]
        }
    ]);
</script>

{#snippet info(row, iconClass)}
    {#if row.img}
        <img src="assets/img/ui/{row.img}.webp" alt=""
             width="24" height="24"
             class="{iconClass.includes('text-xl') ? 'w-7 h-7' : 'w-6 h-6'} shrink-0 select-none {iconClass}"
             onerror={(e) => e.currentTarget.outerHTML = `<span class="${iconClass}">${row.icon}</span>`}>
    {:else}
        <span class={iconClass}>{row.icon}</span>
    {/if}
    <div class="flex flex-col">
        <span class="text-sm font-medium text-slate-200 leading-tight">{row.title}</span>
        <span class="text-[10px] text-slate-500 mt-1">{row.desc}</span>
    </div>
{/snippet}

{#snippet switchInput(row)}
    {@const off = row.inactive?.() ?? false}
    <label class="relative inline-flex items-center shrink-0 {off ? 'cursor-not-allowed' : 'cursor-pointer'}">
        <input type="checkbox" class="sr-only peer" aria-label={row.title} disabled={off}
               checked={row.get()} onchange={(e) => row.set(e.currentTarget.checked)}>
        <div class={SWITCH}></div>
    </label>
{/snippet}

{#snippet toggleRow(row)}
    {@const off = row.inactive?.() ?? false}
    <!-- An option without effect is greyed out and says why, instead of
         silently swallowing the click. It keeps its stored value: made
         narrower again, it works as before. -->
    <div class="flex flex-col gap-1 group bg-slate-800/50 p-3 rounded-lg border border-slate-700/50
                {off ? 'opacity-50' : ''}">
        <div class="flex justify-between items-center gap-4">
            <div class="flex items-start gap-3 flex-1">
                {@render info(row, 'text-base opacity-70 group-hover:opacity-100 transition-opacity mt-0.5')}
            </div>
            {@render switchInput(row)}
        </div>
        {#if off && row.inactiveNote}
            <p class="text-[10px] text-amber-500/80 pl-9">{row.inactiveNote}</p>
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
            <div class="flex items-start gap-3 flex-1">
                {@render info(row, 'text-xl opacity-70 group-hover:opacity-100 transition-opacity mt-0.5')}
            </div>
            {@render switchInput(row)}
        </div>
        <div class="flex items-center gap-3 mt-1 pl-9 pr-1 opacity-50 focus-within:opacity-100 hover:opacity-100 transition-opacity">
            <span class="text-[10px] text-slate-500">🔈</span>
            <input type="range" min="0" max="1" step={row.step} class={SLIDER}
                   aria-label={row.levelTitle}
                   value={row.level()} oninput={(e) => row.setLevel(e.currentTarget.value)}>
            <span class="text-[10px] text-slate-500">🔊</span>
        </div>
    </div>
{/snippet}

{#snippet selectRow(row)}
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 group bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 md:col-span-2">
        <div class="flex items-start gap-3 flex-1 w-full">
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

{#snippet linkRow(row)}
    <button type="button" onclick={row.act}
            class="w-full text-left px-4 py-3 bg-slate-800/50 hover:bg-slate-700 border border-slate-700/50 hover:border-amber-500/60 rounded-lg transition-all text-slate-300 hover:text-white text-sm font-medium flex items-center gap-3 group shadow-xs">
        <img src="assets/img/ui/{row.img}.webp" alt=""
             width="24" height="24" class="w-7 h-7 shrink-0 select-none opacity-70 group-hover:opacity-100 transition-all mt-0.5"
             onerror={(e) => e.currentTarget.outerHTML = '<span class="text-xl opacity-70 mt-0.5">' + row.icon + '</span>'}>
        <div class="flex flex-col">
            <span class="font-medium leading-tight">{row.title}</span>
            <span class="text-[10px] text-slate-500 mt-1 font-normal group-hover:text-slate-400 transition-colors">{row.desc}</span>
        </div>
    </button>
{/snippet}

<!--
  Two-step confirmation. The engine only flips state.settingsResetArmed; what
  the button then says and how it looks is decided here - same division as
  flashBinding() and the key bindings.
-->
{#snippet resetRow(row)}
    <div class="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-start gap-3 flex-1">
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
    {:else if row.kind === 'link'}
        {@render linkRow(row)}
    {:else}
        {@render resetRow(row)}
    {/if}
{/snippet}

<div class="space-y-6">
    {#each SECTIONS as section (section.title)}
        <div>
            <h3 class="text-[10px] font-bold {section.accent} uppercase tracking-widest mb-2 border-b border-slate-700 pb-1">{section.title}</h3>
            {#if section.grid}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {#each section.rows as row (row.title)}
                        {@render control(row)}
                    {/each}
                </div>
            {:else}
                {#each section.rows as row (row.title)}
                    {@render control(row)}
                {/each}
            {/if}
        </div>
    {/each}
</div>
