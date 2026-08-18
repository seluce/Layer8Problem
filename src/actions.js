/**
 * What a button in index.html is allowed to do.
 *
 * Until 6.1 the markup carried its own JavaScript: `onclick="engine.openTeam()"`,
 * sixty-six times. That works, and nothing was broken by it - but it costs
 * three things. The markup executes code, so it can only ever be read as code.
 * It reaches the engine through a global, which is why `window.engine` existed
 * at all. And nothing checked the names: a typo in an onclick is a runtime
 * error that fires the day someone presses that one button.
 *
 * Now the markup carries an INTENT and this file decides what it means:
 *
 *     <button data-action="openTeam">
 *     <button data-action="setDifficulty" data-arg="easy">
 *
 * One delegated listener on the document resolves the name against ACTIONS
 * below. Nothing is evaluated: a name that is not in the table does nothing and
 * says so in the console. tools/lint-i18n.mjs holds every data-action in
 * index.html against this table, so the typo is caught before it ships.
 *
 * `engine.ui.*` keeps its dotted name - the second namespace is real and
 * hiding it here would only move the confusion.
 *
 * The seven handlers that used to be two statements in an attribute now have a
 * NAME, which is the actual win: `menu.toSettings` says what it is for, where
 * `document.getElementById('menu-main-view').classList.add('hidden'); …` said
 * only how it was done.
 */

import { engine } from './engine.js';
import { tutorial } from './tutorial.js';

/**
 * The table. Every entry takes (arg, element) - both optional, and most
 * entries ignore both.
 *
 * `arg` is the data-arg attribute, a string. `element` is the button itself,
 * which two entries need because they report back on it.
 */
const ACTIONS = {
    // --- start screen -------------------------------------------------
    switchLanguage:     (arg) => engine.switchLanguage(arg),
    start:              () => engine.start(),
    startWeekSelect:    () => engine.startWeekSelect(),
    toggleFullscreen:   () => engine.toggleFullscreen(),
    quitGame:           () => engine.quitGame(),

    // --- the bar and the panels ---------------------------------------
    openInventory:      () => engine.openInventory(),
    closeInventory:     () => engine.closeInventory(),
    openTeam:           () => engine.openTeam(),
    closeTeam:          () => engine.closeTeam(),
    openKnowledge:      () => engine.openKnowledge(),
    closeKnowledge:     () => engine.closeKnowledge(),
    openArchive:        () => engine.openArchive(),
    closeArchive:       () => engine.closeArchive(),
    closeBoard:         () => engine.closeBoard(),
    toggleLog:          () => engine.toggleLog(),

    // --- items ---------------------------------------------------------
    confirmUseItem:     () => engine.confirmUseItem(),
    confirmDiscardItem: () => engine.confirmDiscardItem(),
    closeItemConfirm:   () => engine.closeItemConfirm(),

    // --- the day and the week ------------------------------------------
    resumeDay:          () => engine.resumeDay(),
    discardDay:         () => engine.discardDay(),
    setDifficulty:      (arg) => engine.setDifficulty(arg),
    setWeekDifficulty:  (arg) => engine.setWeekDifficulty(arg),
    softReset:          () => engine.softReset(),
    returnToMenu:       () => engine.returnToMenu(),

    // --- the tutorial ---------------------------------------------------
    // An ordinary import: actions.js -> tutorial.js -> engine.js is a line, not
    // a circle. The engine reaches the lesson the other way round, through the
    // slot it registers itself in - see engine/engine_hooks.js.
    'tutorial.run':     () => tutorial.run(),
    'tutorial.skip':    () => tutorial.skip(),
    // The closing screen's button is BUILT AT RUNTIME by dressAskModal(). It
    // carried onclick="tutorial.finish()" until the global went away, and then
    // it silently did nothing - the lesson would not end. A mark reaches the
    // same table as everything else, and lint-i18n now reads the sources too.
    'tutorial.finish':  () => tutorial.finish(),

    // --- settings -------------------------------------------------------
    openSettings:       () => engine.openSettings(),
    closeSettings:      () => engine.closeSettings(),
    openGlobalStats:    () => engine.openGlobalStats(),
    closeGlobalStats:   () => engine.closeGlobalStats(),
    closeKeybinds:      () => engine.closeKeybinds(),
    resetKeybinds:      () => engine.resetKeybinds(),
    triggerHardReset:   (arg, el) => engine.triggerHardReset(el),
    shareGame:          (arg, el) => engine.shareGame(el),
    openExternal:       (arg) => engine.openExternal(arg),

    // --- excuse, report, save file ---------------------------------------
    closeExcuseModal:   () => engine.closeExcuseModal(),
    confirmExcuse:      () => engine.confirmExcuse(),
    closeReportModal:   () => engine.closeReportModal(),
    sendReportMail:     () => engine.sendReportMail(),
    'ui.openExportModal': () => engine.ui.openExportModal(),
    'ui.openImportModal': () => engine.ui.openImportModal(),
    'ui.copyToClipboard': () => engine.ui.copyToClipboard(),
    'ui.performImport':   () => engine.ui.performImport(),
    'ui.closeModals':     () => engine.ui.closeModals(),

    // --- the seven that used to be two statements in an attribute --------
    // Each of these is one intent, and now says so.
    'menu.toSettings':  () => {
        document.getElementById('menu-main-view')?.classList.add('hidden');
        document.getElementById('menu-settings-view')?.classList.remove('hidden');
    },
    'menu.toMain':      () => {
        document.getElementById('menu-settings-view')?.classList.add('hidden');
        document.getElementById('menu-main-view')?.classList.remove('hidden');
    },
    'menu.backFromDifficulty': () => {
        engine.hideOverlay('difficulty-modal');
        engine.showOverlay('intro-modal');
    },
    'menu.backFromWeek': () => {
        engine.hideOverlay('week-modal');
        engine.showOverlay('intro-modal');
    },
    'settings.toExport': () => { engine.closeSettings(); engine.ui.openExportModal(); },
    'settings.toImport': () => { engine.closeSettings(); engine.ui.openImportModal(); },
    'settings.toReport': () => { engine.closeSettings(); engine.openReportModal(); },
};

/** The names the markup may use. Read by tools/lint-i18n.mjs. */
export const ACTION_NAMES = Object.keys(ACTIONS);

/**
 * One listener for all of them.
 *
 * Delegated from the document, so it also covers markup that appears later -
 * the modals are in index.html from the start, but the report dialog rebuilds
 * its button while sending.
 *
 * closest() rather than the target itself: every one of these buttons has an
 * icon or a span inside it, and the click lands on the child.
 */
export function wireActions() {
    document.addEventListener('click', (event) => {
        const el = event.target.closest?.('[data-action]');
        if (!el) return;

        const name = el.dataset.action;
        const fn = ACTIONS[name];
        if (!fn) {
            // Not thrown: a dead button must not take the running day with it.
            // The linter is what stops this from reaching a player.
            console.error(`Unknown data-action: "${name}"`);
            return;
        }
        fn(el.dataset.arg, el);
    });
}
