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
        tickets: mult > 1.0 ? 2 : 0,                                  // Monday starts in the hole
        excusesLeft: mult < 1.0 ? 3 : (mult > 1.0 ? 1 : 2),

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
        currentChainEvent: null,
        currentChainType: null,
        pendingItem: null,

        // Email system
        isEmailOpen: false,
        emailPending: false,
        lastEmailTime: 0,
        lastEmailEventId: null,

        // News ticker
        lastNewsTime: 0,
        activeNewsText: null,
        lastMoodId: null,
        lastLogMsg: "",

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

export const state = {

    time: 8 * 60,
    fl: 0, al: 0, cr: 0,
    tickets: 0,
    inventory: [],
    chefWarningReceived: false,
    rageWarningReceived: false,
    activeEvent: null,
    currentPhoneEvent: null,
    usedIDs: new Set(),
    lunchDone: false,
    bossTimer: null,
    ticketWarning: false,
    morningMoodShown: false,
    dayActive: false,

    // Party mode
    isPartyMode: false,
    partyProgress: 0,
    currentPartyKey: null,

    // Difficulty multiplier (1.0 = default / "Mittwoch")
    difficultyMult: 1.0,

    // Excuse system
    excusesLeft: 0,

    // Stats & system
    achievements: [],
    achievedTitles: [],
    coffeeConsumed: 0,
    emailsIgnored: 0,
    drunkEndTime: 0,

    // Email system
    emailTimer: null,
    usedEmails: new Set(),
    isEmailOpen: false,
    emailPending: false,
    lastEmailTime: 0,

    // Story decisions
    storyFlags: {},

    // Holds the pending ending so it can be shown with a delay
    pendingEnd: null,

    // News ticker
    lastNewsTime: 0,
    activeNewsText: null,

    // Active items
    lastStressballTime: -100,

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
    visualFX: localStorage.getItem('layer8_fx') !== 'false',
    audioEffects: localStorage.getItem('layer8_audio') !== 'false',
    audioVolume: parseFloat(localStorage.getItem('layer8_volume') || '0.5'), // default 50%
    musicEnabled: localStorage.getItem('layer8_music') !== 'false',
    musicVolume: parseFloat(localStorage.getItem('layer8_music_volume') || '0.2'), // default 20%
    musicStyle: localStorage.getItem('layer8_music_style') || 'radio',
    currentMusicTrack: null,
    oneClickItem: localStorage.getItem('layer8_oneclick') === 'true',
    fastChat: localStorage.getItem('layer8_fastchat') === 'true',
    blindStats: localStorage.getItem('layer8_blindstats') === 'true',
    blindTickets: localStorage.getItem('layer8_blindtickets') === 'true',
    autoHidePhone: localStorage.getItem('layer8_autohidephone') === 'true',
    compactMode: localStorage.getItem('layer8_compact') === 'true',
    screenShake: localStorage.getItem('layer8_shake') !== 'false',

    // --- KEYBOARD MAPPING ---
    showHotkeys: (() => {
        const saved = localStorage.getItem('layer8_showhotkeys');
        if (saved !== null) return saved === 'true';
        // Default: hide hotkey badges on touch devices
        return !window.matchMedia("(pointer: coarse)").matches;
    })(),

    keyBinds: (() => {
        let saved = JSON.parse(localStorage.getItem('layer8_keybinds')) || {};
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

};
