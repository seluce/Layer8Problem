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
    dayState:     'layer8_day',        // laufender Arbeitstag, siehe engine_core.saveDay()
    defaultDiff:  'layer8_default_diff',
    tutorialDone: 'sysadmin_tutorial_done',
    partyPlayed:  { easy:   'layer8_party_played_easy',
                    normal: 'layer8_party_played_normal',
                    hard:   'layer8_party_played_hard' },

    // --- Settings (deliberately survive the hard reset) ---
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
 * Alles, was ein vollständiges Zurücksetzen entfernen muss.
 *
 * Existiert, weil genau hier schon zweimal etwas vergessen wurde: erst der
 * tutorialSeen-Phantomschlüssel, dann der laufende Arbeitstag, der ein Zurück-
 * setzen überlebte und danach anbot, mit der Reputation des gelöschten Stands
 * weiterzumachen. Beides kam daher, dass die Löschliste von Hand geführt wurde.
 *
 * Ein neuer Fortschrittsschlüssel gehört in diese Liste - und ist damit
 * überall berücksichtigt, wo zurückgesetzt wird. Einstellungen, Audio und
 * Tastenbelegung stehen bewusst NICHT hier: ein Zurücksetzen löscht den
 * Spielstand, nicht die Vorlieben der Person vor dem Bildschirm.
 */
export const PROGRESS_KEYS = [
    KEYS.archive,
    KEYS.dayState,
    KEYS.defaultDiff,
    KEYS.tutorialDone,
    ...Object.values(KEYS.partyPlayed)
];
