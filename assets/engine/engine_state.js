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
