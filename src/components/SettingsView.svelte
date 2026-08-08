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

    // The switch is the same nine-utility construction on every row, so it is
    // named once. Written out in full, not assembled, so Tailwind can find it.
    const SWITCH = 'w-9 h-5 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[\'\'] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-300 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500';

    const SLIDER = 'flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500';

    // The reset button swaps its colours rather than layering !important on top
    // of them, which is why the resting state keeps its hover utilities and the
    // armed state does not: while it is asking, it should not react to the
    // mouse at all.
    const RESET_BASE  = 'shrink-0 text-[11px] font-bold uppercase tracking-widest border rounded-sm px-4 py-2 transition-colors min-w-[7.5rem]';
    const RESET_IDLE  = 'text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-700 border-slate-600 hover:border-slate-400';
    const RESET_ARMED = 'text-red-300 bg-red-950/40 border-red-500/70';

    const MUSIC_STYLES = [
        ['radio',     'Radio (Abwechselnd)'],
        ['elevator',  'Fahrstuhl (Klassisch)'],
        ['lofi',      'Lofi (Entspannt)'],
        ['detective', 'Detektiv (Noir)'],
        ['bossa',     'Lounge (Bossa)']
    ];

    const TEXT_SIZES = [
        ['normal', 'Normal'],
        ['large',  'Groß'],
        ['xlarge', 'Sehr groß']
    ];

    // Two presets rather than one: the pickers ask different questions, so a
    // single value could only ever answer one of them. Both default to 'ask',
    // which is the behaviour players already know.
    const DIFFICULTIES = [
        ['ask',    'Jedes Mal fragen'],
        ['easy',   'Freitag (Leicht)'],
        ['normal', 'Mittwoch (Normal)'],
        ['hard',   'Montag (Schwer)']
    ];

    const WEEK_DIFFICULTIES = [
        ['ask',    'Jedes Mal fragen'],
        ['easy',   'Erholt (Leicht)'],
        ['normal', 'Genervt (Normal)'],
        ['hard',   'Urlaubsreif (Schwer)']
    ];

    // Icon, wording and wiring of every row, in the order they appear.
    //
    // get() is called during rendering, which is what makes the row follow the
    // state: reading game.visualFX here registers the dependency. set() goes to
    // the engine function rather than to the field, because those functions are
    // where localStorage and the side effects live.
    const SECTIONS = [
        {
            title: 'Tastatur & Eingabe',
            accent: 'text-amber-400',
            grid: false,
            rows: [
                { kind: 'link', icon: '⌨️', img: 'set_keys', title: 'Tastenbelegung anpassen',
                  desc: 'Hotkeys für Menüs & Aktionen ändern',
                  act: () => engine.openKeybinds() }
            ]
        },
        {
            title: 'Audio & Sounds',
            accent: 'text-amber-400',
            grid: true,
            rows: [
                { kind: 'slider', icon: '🔔', img: 'set_sfx', title: 'Effekte',
                  desc: 'Klicks & Benachrichtigungen',
                  get: () => game.audioEffects, set: (v) => engine.toggleAudio(v),
                  level: () => game.audioVolume, setLevel: (v) => engine.setVolume(v),
                  step: 0.05, levelTitle: 'Lautstärke der Effekte' },

                { kind: 'slider', icon: '🎵', img: 'set_music', title: 'Musik',
                  desc: 'Hintergrund-Gedudel & Boss-Beats',
                  get: () => game.musicEnabled, set: (v) => engine.toggleMusic(v),
                  level: () => game.musicVolume, setLevel: (v) => engine.setMusicVolume(v),
                  step: 0.01, levelTitle: 'Lautstärke der Musik' },

                { kind: 'select', icon: '📻', img: 'set_musicstyle', title: 'Musik-Stil',
                  desc: 'Wähle deinen musikalischen Wahnsinn.',
                  focus: 'focus:border-amber-500', options: MUSIC_STYLES,
                  get: () => game.musicStyle, set: (v) => engine.changeMusicStyle(v) }
            ]
        },
        {
            title: 'Anzeige & Layout',
            accent: 'text-cyan-400',
            grid: true,
            rows: [
                { kind: 'select', icon: '🔠', img: 'set_textsize', title: 'Textgröße',
                  desc: 'Dieses Spiel ist zum Lesen da. Nimm die Größe, die dir liegt.',
                  focus: 'focus:border-cyan-500', options: TEXT_SIZES,
                  get: () => game.textSize ?? 'normal', set: (v) => engine.setTextSize(v) },

                { kind: 'toggle', icon: '🗜️', img: 'set_compact', title: 'Kompaktmodus',
                  desc: 'Verkleinert Abstände im UI. Ideal für kleinere Auflösungen.',
                  get: () => game.compactMode, set: (v) => engine.toggleCompactMode(v) },

                { kind: 'toggle', icon: '📱', img: 'set_phonemin', title: 'Handy aut. minimieren',
                  desc: 'Blendet inaktives Handy bei kompakter Anzeige aus.',
                  get: () => game.autoHidePhone, set: (v) => engine.toggleAutoHidePhone(v) },

                { kind: 'toggle', icon: '💓', img: 'set_pulse', title: 'Warn-Pulsieren (>80%)',
                  desc: 'Terminal-Rand leuchtet bei hohem Stress rot auf.',
                  get: () => game.visualFX, set: (v) => engine.toggleFX(v) },

                { kind: 'toggle', icon: '🫨', img: 'set_shake', title: 'Kamera-Wackeln',
                  desc: 'Bildschirm bebt bei kritischen Fehlern.',
                  get: () => game.screenShake, set: (v) => engine.toggleShake(v) },

                { kind: 'toggle', icon: '💬', img: 'set_chatanim', title: 'Smartphone-Animation',
                  desc: 'Kein "Tippt..." Delay bei Chats.',
                  get: () => game.fastChat, set: (v) => engine.toggleFastChat(v) },

                { kind: 'toggle', icon: '📺', img: 'set_scanlines', title: 'Bildschirm-Textur',
                  desc: 'Feine Scanlines und Glimmen auf dem Terminal.',
                  get: () => game.scanlines !== false, set: (v) => engine.toggleScanlines(v) }
            ]
        },
        {
            title: 'Gameplay & Komfort',
            accent: 'text-emerald-400',
            grid: true,
            rows: [
                { kind: 'select', icon: '⏱️', img: 'set_difficulty', title: 'Arbeitstag vorwählen',
                  desc: 'Überspringt die Tageswahl beim Start.',
                  focus: 'focus:border-emerald-500', options: DIFFICULTIES,
                  get: () => game.defaultDiff, set: (v) => engine.saveDefaultDifficulty(v) },

                { kind: 'select', icon: '🗓️', img: 'set_difficulty_week', title: 'Arbeitswoche vorwählen',
                  desc: 'Überspringt die Zustandswahl beim Start.',
                  focus: 'focus:border-emerald-500', options: WEEK_DIFFICULTIES,
                  get: () => game.defaultWeekDiff, set: (v) => engine.saveDefaultWeekDifficulty(v) },

                { kind: 'toggle', icon: '⚡', img: 'set_fastitems', title: 'Schnelle Items',
                  desc: 'Nahrung ohne Bestätigung nutzen.',
                  get: () => game.oneClickItem, set: (v) => engine.toggleOneClick(v) },

                { kind: 'toggle', icon: '📈', img: 'set_chart', title: 'Verlauf sofort zeigen',
                  desc: 'Öffnet die Tageskurve im Endbildschirm automatisch.',
                  get: () => !!game.autoChart, set: (v) => engine.toggleAutoChart(v) }
            ]
        },
        {
            title: 'Herausforderung',
            accent: 'text-red-400',
            grid: true,
            rows: [
                { kind: 'toggle', icon: '❓', img: 'set_hidestats', title: 'Werte verbergen',
                  desc: 'Blendet exakte %-Zahlen aus.',
                  get: () => game.blindStats, set: (v) => engine.toggleBlindStats(v) },

                { kind: 'toggle', icon: '❔', img: 'set_hidetickets', title: 'Tickets verbergen',
                  desc: 'Blendet Ticket-Anzahl aus.',
                  get: () => game.blindTickets, set: (v) => engine.toggleBlindTickets(v) }
            ]
        },
        {
            title: 'Einstellungen verwalten',
            accent: 'text-slate-400',
            grid: false,
            rows: [
                { kind: 'reset', icon: '♻️', img: 'set_reset', title: 'Auf Standard zurücksetzen',
                  desc: 'Setzt alle Optionen dieser Seite zurück. Spielstand, Archiv und Erfolge bleiben unangetastet.' }
            ]
        }
    ];
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
    <label class="relative inline-flex items-center cursor-pointer shrink-0">
        <input type="checkbox" class="sr-only peer" aria-label={row.title}
               checked={row.get()} onchange={(e) => row.set(e.currentTarget.checked)}>
        <div class={SWITCH}></div>
    </label>
{/snippet}

{#snippet toggleRow(row)}
    <div class="flex justify-between items-center gap-4 group bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
        <div class="flex items-start gap-3 flex-1">
            {@render info(row, 'text-base opacity-70 group-hover:opacity-100 transition-opacity mt-0.5')}
        </div>
        {@render switchInput(row)}
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
            {game.settingsResetArmed ? 'Wirklich?' : 'Zurücksetzen'}
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

<div class="space-y-8">
    {#each SECTIONS as section (section.title)}
        <div>
            <h3 class="text-[10px] font-bold {section.accent} uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">{section.title}</h3>
            {#if section.grid}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
