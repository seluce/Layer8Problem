import { KEYS } from './keys.js';

/**
 * Everything that belongs to a single workday.
 *
 * softReset() used to null out ~40 fields by hand, which meant every new piece
 * of per-day state was one more thing to remember. Fields that were forgotten
 * survived the restart: a pending phone event would pop up again mid-morning,
 * an unfinished call chain stayed loaded, and expired timer handles stayed
 * truthy and blocked new emails.
 *
 * Anything scoped to one day belongs in here. Anything that must outlive the
 * day - settings, archive, difficulty - must NOT.
 *
 * @param {number} mult Difficulty multiplier (0.8 easy / 1.0 normal / 1.25 hard)
 */
export function freshDay(mult = 1.0) {
    return {
        // Clock & core stats
        time: 8 * 60,
        fl: 0, al: 0, cr: 0,

        // Blind run: was the day played without readouts from the first
        // minute? engine_core sets this at the start of a day; both toggles
        // clear it the moment someone adjusts them mid-day.
        // Reputation as it stood at the start of the day. The team view uses
        // it to show what today moved: the absolute value on its own says
        // nothing about whether you are getting it right just now.
        repAtStart: {},

        // Which notes are pinned to the board today. Drawn once by
        // engine_ui.openBoard(); reopening must not reshuffle them, or the
        // wall stops feeling like a place.
        boardNotes: [],

        blindRun: false,

        // Wurde der 13:37-Moment heute schon gezeigt? (siehe checkLeetMoment)
        leetSeen: false,

        // Stat curve of the day, one point per decision. The end screen draws
        // it; nothing else reads it. Kept flat and tiny (four numbers a step,
        // ~40 steps a day) so it can travel into the archive later if wanted.
        statHistory: [{ t: 8 * 60, f: 0, a: 0, c: 0 }],
        tickets: mult > 1.0 ? 2 : 0,                                  // Monday starts in the hole
        excusesLeft: mult < 1.0 ? 3 : (mult > 1.0 ? 1 : 2),

        // The excuse currently on offer. Drawn when the dialog opens so it
        // stays put while the player reads it.
        currentExcuse: '',

        // Progress
        inventory: [],
        usedIDs: new Set(),
        usedEmails: new Set(),
        storyFlags: {},
        achievements: [],
        achievedTitles: [],
        coffeeConsumed: 0,
        emailsIgnored: 0,

        // Day flow
        activeEvent: false,
        isLoadingPool: false,   // guards the async gap while a data pool loads
        buttonsDisabled: false, // action bar locked while an event resolves
        bossBarPercent: 100,    // boss fight timer bar, read by EventView.svelte
        bootLines: [],          // startup sequence, read by BootView.svelte
        dayActive: false,
        lunchDone: false,
        morningMoodShown: false,
        ticketWarning: false,
        chefWarningReceived: false,
        rageWarningReceived: false,
        pendingEnd: null,
        drunkEndTime: 0,
        lastStressballTime: -100,

        // Currently open event. These four are the ones that used to leak:
        // a stale currentPhoneEvent reappears as soon as any new event sets
        // activeEvent back to true.
        currentEventId: null,
        currentEventType: null,
        currentPhoneEvent: null,

        // Phone view model. components/PhoneView.svelte renders from it:
        // `open` switches between standby and the chat app, `messages` grows
        // as the conversation runs, `options` holds the current replies.
        phone: { open: false, notification: false, appName: '', messages: [], options: [] },
        currentChainEvent: null,
        currentChainType: null,
        pendingItem: null,

        // Email system. `email` is the mail currently on screen;
        // components/EmailView.svelte renders it, isEmailOpen the overlay.
        email: null,
        isEmailOpen: false,
        emailPending: false,
        lastEmailTime: 0,
        lastEmailEventId: null,

        // News ticker
        lastNewsTime: 0,
        activeNewsText: null,
        lastMoodId: null,
        lastLogMsg: "",

        // Terminal view model. components/Terminal.svelte owns #terminal-content
        // and renders from here, so nothing else may write to that element.
        //
        // mode is one of idle, event, result, morning, boot. Set it through
        // engine.setTerminal*() rather than here, so the container's class
        // attribute stays in step with the mode.
        terminal: { mode: 'idle', variant: 'system', className: '' },

        // Activity log. Lives here so a day restart empties it along with
        // everything else instead of needing its own clean-up step.
        logEntries: [],

        // Party mode
        isPartyMode: false,
        partyProgress: 0,
        currentPartyKey: null,

        // Timer handles. Nulled rather than left dangling — an expired handle
        // is still truthy, and triggerEmail() treats that as "timer running".
        bossTimer: null,
        emailTimer: null,
        emailDelayTimer: null,
        emailChainTimer: null,
        emailCooldownTimer: null,
        phoneTypeTimer: null,
        phoneReadTimer: null,
        newsTimer: null
    };
}

/** Timer fields cleared on every day restart. Kept next to the factory so the two stay in sync. */
export const DAY_TIMERS = [
    'bossTimer', 'emailTimer', 'emailDelayTimer', 'emailChainTimer',
    'emailCooldownTimer', 'phoneTypeTimer', 'phoneReadTimer', 'newsTimer'
];

/**
 * Mutable game state.
 *
 * The .svelte.js extension is what lets this file use runes. Wrapping the
 * state in $state() makes every read from a component reactive: the engine
 * keeps mutating `state.time` and friends exactly as before, and any markup
 * that reads those fields updates on its own.
 *
 * That is what allows the vanilla engine and Svelte components to coexist
 * during the migration instead of having to switch everything at once.
 *
 * CAUTION for components: importing this binding shadows the $state rune.
 * Svelte reads `$name` as a store subscription, so in any file that imports
 * `state`, writing `$state(...)` compiles to a store access and fails with
 * store_invalid_shape. Use $derived, or an attachment for element refs.
 *
 * Note on Sets: $state does not make Set or Map reactive. usedIDs and
 * usedEmails stay plain because no view reads them. Should that change, they
 * need SvelteSet from 'svelte/reactivity'.
 */
/**
 * The live game state.
 *
 * Everything scoped to one workday comes from freshDay(), so the initial state
 * and the state after a restart cannot drift apart. Adding a field to the
 * factory is enough - it exists from boot without a second declaration here.
 *
 * That mattered: logEntries was only declared in freshDay(), and since
 * freshDay() runs on a day restart rather than at boot, state.logEntries was
 * undefined until the first restart. log() then threw on .push(), the global
 * error handler swallowed it, and any function that logged mid-way silently
 * stopped there - after applying stats but before rendering the result.
 *
 * Below the spread: everything that must OUTLIVE the day.
 */
export const state = $state({

    ...freshDay(1.0),

    // Difficulty multiplier (1.0 = default / "Mittwoch"). Set once when the
    // player picks a day and kept across restarts.
    difficultyMult: 1.0,

    // Whether the archive modal is on screen. components/ArchiveView.svelte
    // only renders while this is true, so its images load on first open.
    archiveOpen: false,

    // The lore book. Same reason as archiveOpen: no point building it until
    // someone opens it.
    loreOpen: false,

    // Das Firmen-Intranet. components/intranet/IntranetView.svelte renders the
    // browser window and the pages inside it; nothing exists until it opens.
    intranetOpen: false,

    // The big centre modal. components/EndModal.svelte renders it.
    modal: { open: false, title: '', text: '', isEnd: false, lead: '', cause: null, diary: null },

    // Achievement notifications currently on screen.
    // components/AchievementToasts.svelte renders them.
    toasts: [],

    // Tutorial speech bubble. components/TutorialPointer.svelte renders it;
    // tutorial.js still positions it, because that needs real element
    // measurements.
    tutorialPointer: { visible: false, faded: true, title: '', desc: '', confirmable: false },

    // Aggregated Steam figures. Desktop only; stays in its loading state on
    // the web because platform.globalStats() resolves to null there.
    globalStats: { data: null, loading: false, failed: false },

    // Persistent archive (survives a day restart, mirrored into localStorage)
    archive: {
        items: [],
        achievements: [],
        achievementDiffs: {},
        reputation: {}
    },

    // Reputation system (-100 to +100).
    // Re-seeded from DB.chars in core.loadSystem(); these are only the defaults.
    reputation: {
        "Kevin": 0,
        "Chantal": 0,
        "Egon": 0,
        "Dr. Wichtig": 0,
        "Gabi": 0,
        "Frau Elster": 0,
        "Markus": 0
    },

    // User settings
    visualFX: localStorage.getItem(KEYS.visualFX) !== 'false',
    audioEffects: localStorage.getItem(KEYS.audioEffects) !== 'false',
    audioVolume: parseFloat(localStorage.getItem(KEYS.audioVolume) || '0.5'), // default 50%
    musicEnabled: localStorage.getItem(KEYS.musicEnabled) !== 'false',
    musicVolume: parseFloat(localStorage.getItem(KEYS.musicVolume) || '0.2'), // default 20%
    musicStyle: localStorage.getItem(KEYS.musicStyle) || 'radio',
    currentMusicTrack: null,
    oneClickItem: localStorage.getItem(KEYS.oneClickItem) === 'true',
    fastChat: localStorage.getItem(KEYS.fastChat) === 'true',
    blindStats: localStorage.getItem(KEYS.blindStats) === 'true',
    blindTickets: localStorage.getItem(KEYS.blindTickets) === 'true',
    autoHidePhone: localStorage.getItem(KEYS.autoHidePhone) === 'true',
    compactMode: localStorage.getItem(KEYS.compactMode) === 'true',
    textSize: localStorage.getItem(KEYS.textSize) || 'normal',
    scanlines: localStorage.getItem(KEYS.scanlines) !== 'false',
    autoChart: localStorage.getItem(KEYS.autoChart) === 'true',
    screenShake: localStorage.getItem(KEYS.screenShake) !== 'false',

    // --- KEYBOARD MAPPING ---
    showHotkeys: (() => {
        const saved = localStorage.getItem(KEYS.showHotkeys);
        if (saved !== null) return saved === 'true';
        // Default: hide hotkey badges on touch devices
        return !window.matchMedia("(pointer: coarse)").matches;
    })(),

    keyBinds: (() => {
        // Unguarded, a corrupted entry makes this expression throw - and
        // because it is evaluated while the module loads, the whole game would
        // fail to start. When in doubt, fall back to the default bindings.
        let saved = {};
        try {
            saved = JSON.parse(localStorage.getItem(KEYS.keyBinds)) || {};
            if (typeof saved !== 'object' || Array.isArray(saved)) saved = {};
        } catch {
            saved = {};
        }
        const defaults = { actCoffee: 'q', actQuest: 'w', actServer: 'e', actCall: 'r', opt1: '1', opt2: '2', opt3: '3', confirm: 'Space' };

        // Drop obsolete keys left over from older savegames
        for (let k in saved) {
            if (!defaults.hasOwnProperty(k)) delete saved[k];
        }

        // Fill in missing keys
        for (let k in defaults) { if (!saved[k]) saved[k] = defaults[k]; }
        return saved;
    })(),
    isBindingKey: false,
    actionToBind: null

});
