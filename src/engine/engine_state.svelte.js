import { KEYS } from './keys.js';
import { SvelteSet } from 'svelte/reactivity';

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
        // Note IDS, not the notes themselves. A note is prose and belongs in
        // the tree; what the day decided is only WHICH ones are pinned up.
        boardNotes: [],
        // 'use' or 'discard' - which question the item dialog is asking
        pendingItemMode: null,

        blindRun: false,

        // Has the 13:37 moment already been shown today? (see checkLeetMoment)
        leetSeen: false,

        // Stat curve of the day, one point per decision. The end screen draws
        // it; nothing else reads it. Kept flat and tiny (four numbers a step,
        // ~40 steps a day) so it can travel into the archive later if wanted.
        //
        // The letters are the ones an option uses: m the minute of the day,
        // l/a/b the three bars. Up to 5.0 the point read { t, f, a, c }, with
        // t for the clock - the same letter an option spends on its button
        // text. engine_core.migrateStatPoints() carries old saves across.
        statHistory: [{ m: 8 * 60, l: 0, a: 0, b: 0 }],
        tickets: mult > 1.0 ? 2 : 0,                                  // Monday starts in the hole
        excusesLeft: mult < 1.0 ? 3 : (mult > 1.0 ? 1 : 2),
        // Counted directly when the player spends one. The diary used to
        // derive this from "start value minus what is left", which broke the
        // moment excusesLeft GREW past its start (the nightly +1, the morning
        // mood): a lie actually told that day then reported as zero.
        excusesUsed: 0,

        // The excuse currently on offer, and the event it was drawn for. One
        // excuse per event: closing and reopening the dialog must not deal a
        // new one, or a player can leaf through the whole pool without ever
        // spending an excuse.
        // A RECIPE, not the sentence - see engine/recipe.js. Which excuse was
        // drawn is the day's decision; the wording belongs to the tree.
        currentExcuse: null,
        excuseFor: null,

        // Progress
        inventory: [],
        // SvelteSet, not Set - see the note on Sets below.
        usedIDs: new SvelteSet(),
        usedEmails: new SvelteSet(),
        storyFlags: {},
        achievements: [],
        // Ids of the achievements earned today. Resolved to words only when
        // the end screen renders, so a saved day carries no language.
        achievedIds: [],
        coffeeConsumed: 0,
        emailsIgnored: 0,

        // Day flow
        activeEvent: false,
        isLoadingPool: false,   // guards the async gap while a data pool loads
        buttonsDisabled: false, // action bar locked while an event resolves

        // The one action button the tutorial has unlocked while the rest of
        // the bar stays shut, by id, or null.
        //
        // It has to live in the state and not on the element: ActionBar binds
        // `disabled` to buttonsDisabled, so Svelte rewrites the attribute on
        // every update and a `btn.disabled = false` set from tutorial.js is
        // gone again by the next render. That is exactly what happened - the
        // tutorial pointed at the CALL button and the button could not be
        // pressed.
        tutorialUnlocked: null,

        // The tutorial step the action bar is showing, or null when it is
        // showing none: before the lesson starts, and while a modal has taken
        // over and clearGlows() has switched the lights off. ActionBar dims the
        // locked buttons off this field and rings the free one off
        // tutorialUnlocked above - two questions, because an info step dims the
        // whole bar without freeing anything.
        //
        // tutorial.step stays the lesson's own counter. This is what is on
        // display, not where the lesson stands.
        tutorialStep: null,
        bossBarPercent: 100,    // boss fight timer bar, read by EventView.svelte
        bootLines: [],          // startup sequence, read by BootView.svelte
        dayActive: false,
        lunchDone: false,
        meetingDone: false,   // week Friday finale (v5.0); day mode never sets it
        morningMoodShown: false,
        ticketWarning: false,
        chefWarningReceived: false,
        rageWarningReceived: false,
        pendingEnd: null,
        drunkEndTime: 0,
        // Cooldowns per item id: { stressball: 240, ... } holds the minute
        // an item was last used. Used to be a single lastStressballTime for
        // the whole backpack, which was fine while exactly one item had a
        // cooldown - a second one would have blocked the first.
        itemCooldowns: {},

        // Currently open event. These four are the ones that used to leak:
        // a stale currentPhoneEvent reappears as soon as any new event sets
        // activeEvent back to true.
        currentEventId: null,
        currentEventType: null,
        currentPhoneEvent: null,

        // Phone view model. components/PhoneView.svelte renders from it:
        // `open` switches between standby and the chat app, `messages` grows
        // as the conversation runs, `options` holds the current replies.
        // `node` is the chat node on screen; relocaliseScene() repaints its
        // replies from it after a language switch.
        phone: { open: false, notification: false, appName: '', messages: [], options: [], node: null },
        currentChainEvent: null,
        currentChainType: null,
        // Which node of that chain is on screen. Only relocaliseScene() reads
        // it, to repaint the same node after a language switch.
        currentChainNode: null,
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
        // Likewise the ticker. A recipe rather than a bare index, because the
        // tutorial puts a dictionary line up there instead of a pool entry -
        // one mechanism covers both.
        activeNews: null,
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
        newsTimer: null,
        // The boot line-printer chain and the week picker's delayed reset()
        // shared one property of every timer above - they fire into whatever
        // day exists later - without sharing the registry: a restart during
        // the boot animation ran TWO chains at once, interleaved their lines
        // and ended in a double reset().
        bootTimer: null
    };
}

/**
 * The wall clock as the game prints it: minutes since midnight -> "HH:MM".
 * One formatter for every surface - before 6.1.1 this pair of lines existed
 * six times across components and engine, and the next tweak (or the next
 * copy forgetting the padStart) had six places to miss.
 */
export function formatClock(minutes) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
}

/** Timer fields cleared on every day restart. Kept next to the factory so the two stay in sync. */
export const DAY_TIMERS = [
    'bossTimer', 'emailTimer', 'emailDelayTimer', 'emailChainTimer',
    'emailCooldownTimer', 'phoneTypeTimer', 'phoneReadTimer', 'newsTimer',
    'bootTimer'
];

/**
 * Tutorial fields: part of the day, deliberately not part of the save.
 *
 * They say which step the action bar is showing and which button that step has
 * freed - and both are only true while the lesson is running. A reload ends the
 * lesson, so a save that carried them restores a bar that is dimmed with
 * nothing left to undim it. That is not theory: leave the tutorial through the
 * main menu and the day is written to storage mid-step.
 *
 * Same argument as DAY_TIMERS above - they belong to the session, not to the
 * workday. saveDay() skips them on the way out, applyRestoredDay() on the way
 * back in; a save is never allowed a say over the tutorial.
 */
export const TUTORIAL_FIELDS = ['tutorialStep', 'tutorialUnlocked'];

/**
 * The day, as it goes into storage.
 *
 * freshDay() decides which fields belong to a day, and the two lists above
 * decide which of them a save has no business carrying. That is one rule, and
 * it used to stand twice: saveDay() and saveWeek() held the same loop with the
 * same two exclusions, character for character. A third exclusion would have
 * had to be found in both.
 *
 * Sets become arrays on the way out, because JSON has no Set.
 */
// The key set of a day, computed once: it does not depend on the multiplier,
// and snapshotDay runs after every single action - building a full day object
// (two Sets, a dozen arrays) just to enumerate its keys was a per-click
// allocation for a static list. Still derived FROM the factory, so a newly
// added day field cannot be forgotten here.
const DAY_FIELDS = Object.keys(freshDay()).filter(
    key => !DAY_TIMERS.includes(key) && !TUTORIAL_FIELDS.includes(key)
);

export function snapshotDay(state) {
    const day = {};
    for (const key of DAY_FIELDS) {
        const value = state[key];
        day[key] = value instanceof Set ? [...value] : value;
    }
    return day;
}

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
 * Note on Sets: $state does not make Set or Map reactive - wrapping the object
 * around them changes nothing about what .add() notifies. usedIDs and
 * usedEmails are therefore SvelteSet from 'svelte/reactivity'.
 *
 * They were plain until 6.0, licensed by a comment saying no view read them.
 * By then EventView.svelte did: the party hub greys out a station once its
 * pool is exhausted, and that test is `!usedIDs.has(id)`. It happened to be
 * right anyway, because every .add() sits in renderTerminal() and every
 * .delete() ends in setTerminalIdle(), so state.terminal was replaced in the
 * same breath and the $derived re-ran off THAT. A correctness that rests on
 * an ordering nobody wrote down is a bug waiting for the first caller who
 * changes a Set without touching the terminal.
 *
 * The cost is close to nothing: SvelteSet extends Set (so `instanceof Set` in
 * both save paths still holds), and has() only creates a per-key source on a
 * HIT. The pool filters are almost all misses, and those read one version
 * counter and stop.
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
/**
 * From this many open tickets on, the day is visibly slipping: the counter in
 * the header pulses and the phone in the action bar is highlighted. One
 * constant for both, because two of them drifted apart once already - the
 * header warned from eight, the button from seven.
 */
export const TICKET_WARNING = 8;

export const state = $state({

    ...freshDay(1.0),

    // Difficulty multiplier (1.0 = default / "Mittwoch"). Set once when the
    // player picks a day and kept across restarts. Day mode identity - the
    // week never writes it; week formulas go through engine.effMult().
    difficultyMult: 1.0,

    // The week run (v5.0). Outlives every single day by definition; the
    // per-day fields it carries across nights stay in freshDay() and are
    // written back by engine_week.advanceWeekNight() after each reset.
    week: {
        active: false,      // is a Monday-to-Friday run in progress?
        level: null,        // 'easy' | 'normal' | 'hard' (Erholt/Genervt/Urlaubsreif)
        dayIndex: 1,        // 1 = Montag ... 5 = Freitag
        weekLog: [],        // one summary line per finished day, for the balance sheet
        repAtWeekStart: {}, // reputation snapshot from Monday morning
    },

    // Whether the archive modal is on screen. components/ArchiveView.svelte
    // only renders while this is true, so its images load on first open.
    archiveOpen: false,

    // The lore book. Same reason as archiveOpen: no point building it until
    // someone opens it.
    loreOpen: false,

    // The company intranet. components/intranet/IntranetView.svelte renders the
    // browser window and the pages inside it; nothing exists until it opens.
    intranetOpen: false,

    // What the company pages say about you right now. Filled by
    // engine_ui.buildIntranet() on every open, so the feed can mention what
    // happened an hour ago. Deliberately outside freshDay(): it is rebuilt
    // before it is ever read, and it has no business in the day's save file.
    intranetData: null,


    // The big centre modal. components/EndModal.svelte renders it.
    //
    // `title` and `lead` hold RECIPES on an end or night screen (a plain string
    // on a warning, which is dismissed long before anything can switch the
    // language), `balance` and `party` are snapshots of numbers and ids, and
    // `diary` is the draw the page was made from - nothing here is a sentence.
    modal: { open: false, title: '', text: '', isEnd: false, lead: '', cause: null, diary: null,
             balance: null, party: null },

    // Achievement notifications currently on screen.
    // components/AchievementToasts.svelte renders them.
    toasts: [],

    // Tutorial speech bubble. components/TutorialPointer.svelte renders it;
    // tutorial.js still positions it, because that needs real element
    // measurements.
    //
    // KEYS, not sentences: the component resolves them, so the bubble follows
    // a language switch like everything else on screen. Held as finished text
    // it froze in the language the step opened in.
    tutorialPointer: { visible: false, faded: true, titleKey: '', descKey: '', confirmable: false },

    // Aggregated Steam figures. Desktop only; stays in its loading state on
    // the web because platform.globalStats() resolves to null there.
    globalStats: { data: null, loading: false, failed: false },

    // Persistent archive (survives a day restart, mirrored into localStorage)
    archive: {
        items: [],
        achievements: [],
        achievementDiffs: {},
        reputation: {},
        // Evidence for the compendium: which events were opened and which
        // story flags were raised, across the whole career. Stored raw rather
        // than as unlocked entries, so notes added in a later version light up
        // for players who already saw the scene.
        seenEvents: [],
        seenFlags: [],
        // Per compendium entry: how many notes had been read the last time it
        // was opened. An entry counts as unread again once it has more than
        // that, so a later note re-flags an entry that was already seen.
        knowledgeRead: {}
    },

    // Whether the knowledge modal is on screen; the view builds on demand.
    knowledgeOpen: false,

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

    // Which weekday a new day starts on, or 'ask' for the picker. The odd one
    // out among the settings: a hard reset removes it, because it is a decision
    // about the save rather than about the person playing. It lives here all
    // the same, so the dropdown in components/SettingsView.svelte follows a
    // reset to defaults without having to be told.
    defaultDiff: localStorage.getItem(KEYS.defaultDiff) || 'ask',
    // Same idea for the week mode, kept apart on purpose: the two pickers ask
    // different questions (which weekday vs. how worn out Mueller is), so one
    // shared preset would answer the wrong one.
    defaultWeekDiff: localStorage.getItem(KEYS.defaultWeekDiff) || 'ask',

    // Is "reset to defaults" currently asking whether we really mean it?
    // The engine only sets the flag; the button's wording and colour follow
    // from it in the component - same split as bindFlash below.
    settingsResetArmed: false,

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

        // Fill in missing keys - and repair non-STRING values, not just
        // missing ones. A hand-edited or corrupted store could carry a
        // number here, and keyBinds.confirm.toLowerCase() then threw on
        // every keypress, which is exactly what this factory exists to
        // prevent.
        for (let k in defaults) {
            if (!saved[k] || typeof saved[k] !== 'string') saved[k] = defaults[k];
        }
        return saved;
    })(),
    isBindingKey: false,
    actionToBind: null,

    // Which binding button flashes red right now, and whether it does so
    // because the key is reserved rather than already taken. Purely visual and
    // short-lived, but it belongs here: components/KeybindView.svelte draws
    // from it, and the engine must not reach into the DOM to say "no".
    bindFlash: null,
    bindFlashReserved: false

});
