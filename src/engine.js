import { state } from './engine/engine_state.svelte.js';
import { audio } from './engine/engine_audio.js';
import { core } from './engine/engine_core.js';
import { events } from './engine/engine_events.js';
import { inventory } from './engine/engine_inventory.js';
import { ui } from './engine/engine_ui.js';
import { week } from './engine/engine_week.js';
import { switchLanguage, language, onLanguageChange, t } from './i18n/i18n.svelte.js';

const engine = {
    VERSION: "v6.0.0",

    // 1. Attach the mutable game state
    state: state,

    // 2. Merge the extracted modules into the engine.
    //    Note: these are spread into one flat object, so two modules must never
    //    export the same function name — the later one would silently win.
    ...audio,
    ...core,
    ...events,
    ...inventory,
    ...ui,
    ...week,

    // 3. Language. Not a module of its own: these two are all the rest of the
    //    game needs, and the shell reaches them through src/actions.js.
    switchLanguage,
    language
};

/*
 * The global, and the one reason it is still here.
 *
 * Until 6.1 it carried the sixty-six inline onclick handlers in index.html.
 * Those are data-action marks now and go through src/actions.js, which imports
 * the engine like every component does - so the shell no longer needs it.
 *
 * What still does is tools/dev-woche.js: it is pasted into the browser console,
 * and something pasted into a console cannot import anything. That is the whole
 * remaining purpose, and it is worth one line.
 *
 * window.tutorial exists for a different reason again: the engine reads
 * `tutorial` as a bare global to avoid closing an import circle.
 */
window.engine = engine;

// The one thing a language switch cannot repaint by itself: the scene in the
// terminal was copied out of the old data tree when it opened. Registered from
// this side rather than imported from the other, because i18n knows nothing
// about the engine and should stay that way.
onLanguageChange(() => engine.relocaliseScene());

/**
 * Global safety net.
 *
 * The game has no mid-day save. An uncaught exception during an action used to
 * leave activeEvent stuck on true with every button disabled, so the player had
 * to reload and lost the whole workday. Recovering the UI is almost always
 * better than freezing it.
 *
 * The error is still reported to the console — this catches the fallout, it does
 * not hide the cause.
 */
let lastRecovery = 0;

function recoverFromError(err) {
    console.error("Uncaught error:", err);

    // Repeated failures usually mean the same broken action retriggering.
    // Recovering once every few seconds is enough and keeps the log readable.
    const now = Date.now();
    if (now - lastRecovery < 3000) return;
    lastRecovery = now;

    try {
        engine.state.activeEvent = false;

        // While the tutorial runs, the bar belongs to the lesson. Unlocking it
        // here left all four buttons dimmed and clickable at once - the display
        // said "shut", the button said "press me", and a press earned the
        // player a red "not in this phase". Its own step logic knows which
        // button is free and puts the lights back with it.
        if (typeof tutorial !== 'undefined' && tutorial.isActive) {
            tutorial.applyStepLogic();
        } else {
            engine.disableButtons(false);
        }

        engine.log({ k: 'log.halgerd.internalError' }, "text-red-500");
    } catch (recoveryError) {
        // Engine not far enough along to recover — nothing sensible left to do.
        console.error("Recovery failed:", recoveryError);
    }
}

window.addEventListener('error', (e) => recoverFromError(e.error || e.message));
window.addEventListener('unhandledrejection', (e) => recoverFromError(e.reason));

// The way everything inside the bundle reaches the engine - components,
// actions.js and the tutorial. The global above is for the console tool only.
export { engine };

// Deliberately NOT booted here (6.0).
//
// Fourteen components import this module, so the static import graph pulls
// engine.js in before main.js reaches its first await. Booting from the module
// body therefore meant init() ran before the language was known - and the
// language decides which data tree DB is filled from. main.js now calls
// engine.init() itself, after the language is settled and the core tier is in.

// --- GLOBALE TASTATUR-STEUERUNG ---
document.addEventListener('keydown', (event) => {
    // 1. Is the player currently rebinding a key?
    if (engine.state.isBindingKey) {
        event.preventDefault(); // Prevents scrolling on space, for one
        engine.finishBindingKey(event.key);
        return;
    }

    // Ignore keystrokes inside form fields
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

    let key = event.key.toLowerCase();
    if (key === ' ') key = 'space'; // Leertaste normalisieren

    // 2. Escape always closes the topmost overlay
    if (key === 'escape') {
        
        // Is the element present and visible? engine_ui owns the answer, so
        // show, hide and ask all agree on how "open" is written down.
        const isVisible = (id) => engine.isOverlayOpen(id);

        // A. Nothing here can be dismissed with a key.
        //    The three startup windows because the game has not begun yet, the
        //    tutorial question because it is a question, and the mail because
        //    it is an open decision: it has no close button, and every option
        //    including deleting it counts. Escape must not become the way out.
        if (engine.isStartupOverlayOpen() || isVisible('tut-ask-modal') || isVisible('email-modal')) return;

        // B. The lore book
        if (engine.state.loreOpen) {
            engine.closeLoreModal();
            return;
        }

        // C. Close submenus and overlays, innermost first
        if (isVisible('item-confirm-modal')) { engine.closeItemConfirm(); return; }
        if (isVisible('keybind-modal')) { engine.closeKeybinds(); return; }
        if (isVisible('save-export-modal') || isVisible('save-import-modal')) { engine.ui.closeModals(); return; }
        if (isVisible('report-modal')) { engine.closeReportModal(); return; }
        if (isVisible('global-stats-modal')) { engine.closeGlobalStats(); return; }

        if (isVisible('inventory-modal')) { engine.closeInventory(); return; }
        if (isVisible('team-modal')) { engine.closeTeam(); return; }
        if (isVisible('archive-modal')) { engine.closeArchive(); return; }
        if (engine.state.intranetOpen) { engine.closeIntranet(); return; }
        if (isVisible('board-modal')) { engine.closeBoard(); return; }
        
        if (isVisible('excuse-modal')) { engine.closeExcuseModal(); return; }

        // D. Warning modals - closable, unlike a game over screen
        if (isVisible('modal-overlay')) {
            // Which box may be dismissed is a property of the box, not of the
            // word on its button. This used to read
            //     okBtn.innerText === 'VERSTANDEN'
            // which stopped being true the moment that button said
            // 'UNDERSTOOD' - and then ESC silently did nothing on a warning.
            // A game over needs a restart and a night screen wants its click,
            // so both stay closed to ESC; everything else is a warning.
            const box = engine.state.modal;
            if (box && !box.isEnd && !box.isNight) engine.closeModal();
            return;
        }

        // E. Nothing open at all -> toggle the settings menu
        if (isVisible('settings-modal')) {
            engine.closeSettings();
        } else {
            engine.openSettings();
        }
        return;
    }

    // --- HOTKEY BLOCKING WHILE THE GAME IS STILL STARTING ---
    // Intro, the resume question and the difficulty picker all block the keys.
    // The resume question used to be covered by accident: the picker's inline
    // display was still empty at that point, and '' !== 'none' read as "open".
    if (engine.isStartupOverlayOpen()) return;

    // 3. CONFIRM (popups, answering the phone, continue buttons)
    if (key === engine.state.keyBinds.confirm.toLowerCase()) {
        // A: Tutorial
        const tutPointer = document.getElementById('tut-pointer');
        if (tutPointer && !tutPointer.classList.contains('hidden')) {
            // The "Verstanden" button in the tooltip. TutorialPointer.svelte
            // attaches its handler the Svelte way, so there is no onclick
            // attribute left to select on — a stable id does the job instead.
            const verstandenBtn = document.getElementById('tut-advance-btn');
            if (verstandenBtn) { verstandenBtn.click(); return; }
        }
        
        const tutModal = document.getElementById('tut-ask-modal');
        if (tutModal && !tutModal.classList.contains('hidden')) {
            // End screen first ("Arbeitstag starten", injected by
            // tutorial.js), otherwise the start screen — confirm always
            // triggers the recommended button. Both carry stable ids now
            // instead of onclick-attribute lookups.
            const finishBtn = document.getElementById('tut-finish-btn');
            if (finishBtn) { finishBtn.click(); return; }
            const startBtn = document.getElementById('tut-start-btn');
            if (startBtn) { startBtn.click(); return; }
        }
        
        // B: modals (warning letter, ending, item confirm)
        const okBtn = document.querySelector('#modal-content button');
        if (okBtn && okBtn.offsetParent !== null) { okBtn.click(); return; }
        // The item confirmation modal - the green "use" button is the second one in the grid
        const itemUseBtn = document.querySelector('#item-confirm-modal button.bg-green-600');
        if (itemUseBtn && itemUseBtn.offsetParent !== null) { itemUseBtn.click(); return; }

        // C: accept the phone notification
        const phoneNotif = document.getElementById('phone-notification');
        if (phoneNotif && phoneNotif.offsetParent !== null && !phoneNotif.classList.contains('hidden')) {
            phoneNotif.click();
            return;
        }

        // D: Terminal continue button (Weiter / Mittagspause / Feierabend /
        // morning start). ResultView and MorningView mark theirs with a
        // data-continue attribute — matching on the caption text broke as
        // soon as a label was reworded, and "exactly one button on screen"
        // was only ever a proxy for the same idea.
        const contBtn = document.querySelector('#terminal-content button[data-continue]');
        if (contBtn) { contBtn.click(); return; }
    }

    // 4. ACTION SHORTCUTS (Q, W, E, R)
    // Only while no event, no open mail and no fullscreen modal is active
    if (!engine.state.activeEvent && !engine.state.isEmailOpen && !document.body.classList.contains('overflow-hidden')) {
        if (key === engine.state.keyBinds.actCoffee.toLowerCase()) { engine.trigger('coffee'); return; }
        if (key === engine.state.keyBinds.actQuest.toLowerCase()) { engine.trigger('sidequest'); return; }
        if (key === engine.state.keyBinds.actServer.toLowerCase()) { engine.trigger('server'); return; }
        if (key === engine.state.keyBinds.actCall.toLowerCase()) { engine.trigger('calls'); return; }
    }

    // 5. OPTION SHORTCUTS (1, 2, 3 - plus 4, 5, 6 during the party)
    // Mails set overflow-hidden, so that case needs an explicit exception
    if ((engine.state.activeEvent && !document.body.classList.contains('overflow-hidden')) || engine.state.isEmailOpen) {
        let visibleOptions = [];
        
        // A: is a mail open?
        const emailModal = document.getElementById('email-modal');
        if (emailModal && !emailModal.classList.contains('hidden')) {
            const emailActions = document.getElementById('email-actions');
            if (emailActions) {
                // The delete button is generated like any other, so it is included automatically
                visibleOptions = Array.from(emailActions.querySelectorAll('button'));
            }
        }
        // B: the phone
        else if (document.getElementById('app-actions') && document.getElementById('app-actions').offsetParent !== null) {
            visibleOptions = Array.from(document.querySelectorAll('#app-actions button'));
        } 
        // C: the terminal
        else {
            const termActions = document.querySelectorAll('#terminal-content button');
            visibleOptions = Array.from(termActions).filter(b => !b.hasAttribute('data-continue'));
        }

        if (key === engine.state.keyBinds.opt1.toLowerCase() && visibleOptions[0]) visibleOptions[0].click();
        if (key === engine.state.keyBinds.opt2.toLowerCase() && visibleOptions[1]) visibleOptions[1].click();
        if (key === engine.state.keyBinds.opt3.toLowerCase() && visibleOptions[2]) visibleOptions[2].click();
        
        if (key === '4' && visibleOptions[3]) visibleOptions[3].click();
        if (key === '5' && visibleOptions[4]) visibleOptions[4].click();
        if (key === '6' && visibleOptions[5]) visibleOptions[5].click();
    }
});
