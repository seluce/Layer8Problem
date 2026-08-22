/**
 * Every localStorage key the game touches, in one place.
 *
 * engine_state reads these at boot, engine_ui and engine_audio write them,
 * engine_core re-exports the object as engine.KEYS for everything else.
 * A key that is not in this file does not exist — that rule is what keeps
 * a second tutorialSeen-style phantom key from ever happening again.
 *
 * Property names deliberately mirror the state field they back
 * (state.visualFX <-> KEYS.visualFX), so read and write sites line up.
 */
export const KEYS = {
    // --- Save and progress (removed by the hard reset) ---
    archive:      'layer8_archive',
    dayState:     'layer8_day',        // running workday, see engine_core.saveDay()
    weekState:    'layer8_week',       // running work week, see engine_week.saveWeek()
    // When this machine last FINISHED OFF a run. An empty slot means two
    // different things - "never played one" or "played it out here" - and the
    // cloud needs to tell them apart before it deletes the other machine's
    // run. See engine_core.adoptCloudRun().
    dayClearedAt:  'layer8_day_cleared',
    weekClearedAt: 'layer8_week_cleared',
    defaultDiff:  'layer8_default_diff',      // preselected workday
    defaultWeekDiff: 'layer8_default_week_diff', // preselected work week
    diaryRecent:  'layer8_diary_recent',  // diary lines used recently, see engine_diary.loadMemory()
    tutorialDone: 'sysadmin_tutorial_done',
    partyPlayed:  { easy:   'layer8_party_played_easy',
                    normal: 'layer8_party_played_normal',
                    hard:   'layer8_party_played_hard' },

    // --- Settings (deliberately survive the hard reset) ---
    language:      'layer8_lang',        // 'de' or 'en', see src/i18n/i18n.svelte.js
    statsTab:      'layer8_stats_tab',     // last stats view (archive and global): 'day' or 'week'
    keyBinds:      'layer8_keybinds',
    visualFX:      'layer8_fx',
    screenShake:   'layer8_shake',
    oneClickItem:  'layer8_oneclick',
    fastChat:      'layer8_fastchat',
    blindStats:    'layer8_blindstats',
    blindTickets:  'layer8_blindtickets',
    audioEffects:  'layer8_audio',
    showHotkeys:   'layer8_showhotkeys',
    autoHidePhone: 'layer8_autohidephone',
    compactMode:   'layer8_compact',
    textSize:      'layer8_textsize',
    scanlines:     'layer8_scanlines',
    autoChart:     'layer8_autochart',

    // --- Audio and music (survive the hard reset as well) ---
    audioVolume:   'layer8_volume',
    musicEnabled:  'layer8_music',
    musicVolume:   'layer8_music_volume',
    musicStyle:    'layer8_music_style',
};

/**
 * Everything a full reset has to remove.
 *
 * Exists because right here something was forgotten twice already: first the
 * tutorialSeen phantom key, then the running workday that survived a reset
 * and afterwards offered to continue with the reputation of the wiped save.
 * Both happened because the deletion list was maintained by hand.
 *
 * A new progress key belongs in this list - and is thereby covered
 * everywhere a reset happens. Settings, audio and key bindings are
 * deliberately NOT in here: a reset wipes the save, not the preferences of
 * the person in front of the screen.
 */
export const PROGRESS_KEYS = [
    KEYS.archive,
    KEYS.dayState,
    KEYS.weekState,
    KEYS.dayClearedAt,
    KEYS.weekClearedAt,
    KEYS.defaultDiff,
    KEYS.defaultWeekDiff,
    KEYS.diaryRecent,
    KEYS.tutorialDone,
    ...Object.values(KEYS.partyPlayed)
];
