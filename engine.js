import { DB } from './data.js';
import { state } from './assets/engine/engine_state.js';
import { audio } from './assets/engine/engine_audio.js';
import { core } from './assets/engine/engine_core.js';
import { events } from './assets/engine/engine_events.js';
import { inventory } from './assets/engine/engine_inventory.js';
import { ui } from './assets/engine/engine_ui.js';

const engine = {
    VERSION: "v3.4.0",

    // 1. Attach the mutable game state
    state: state,

    // 2. Merge the extracted modules into the engine.
    //    Note: these are spread into one flat object, so two modules must never
    //    export the same function name — the later one would silently win.
    ...audio,
    ...core,
    ...events,
    ...inventory,
    ...ui
};

// Expose the engine globally (inline onclick handlers in index.html rely on this)
window.engine = engine;

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
        engine.disableButtons(false);
        engine.log("H.A.L.G.E.R.D.: Interner Fehler abgefangen. Weitermachen.", "text-red-500");
    } catch (recoveryError) {
        // Engine not far enough along to recover — nothing sensible left to do.
        console.error("Recovery failed:", recoveryError);
    }
}

window.addEventListener('error', (e) => recoverFromError(e.error || e.message));
window.addEventListener('unhandledrejection', (e) => recoverFromError(e.reason));

// Boot the game.
// init() is async because the desktop build awaits its cloud save first;
// nothing after this needs to wait, so the promise is intentionally floating.
engine.init();

// --- GLOBALE TASTATUR-STEUERUNG ---
document.addEventListener('keydown', (event) => {
    // 1. Fängt der Spieler gerade eine neue Taste ab?
    if (engine.state.isBindingKey) {
        event.preventDefault(); // Verhindert z.B. Scrollen bei Leertaste
        engine.finishBindingKey(event.key);
        return;
    }

    // Ignoriere Eingaben in Formularen
    if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

    let key = event.key.toLowerCase();
    if (key === ' ') key = 'space'; // Leertaste normalisieren

    // 2. Intelligentes Escape-Verhalten (Schließt immer das oberste Fenster)
    if (key === 'escape') {
        
        // Hilfsfunktion: Prüft, ob ein Element sichtbar ist
        const isVisible = (id) => {
            const el = document.getElementById(id);
            return el && !el.classList.contains('hidden') && el.style.display !== 'none';
        };

        // A. Blockieren, falls Intro oder Schwierigkeits-Wahl offen ist (darf man nicht abbrechen!)
        if (isVisible('intro-modal') || isVisible('difficulty-modal') || isVisible('tut-ask-modal')) return;

        // B. Das dynamische Lore-Buch checken
        const loreModal = document.getElementById('lore-modal');
        if (loreModal) {
            loreModal.remove();
            document.body.classList.remove('overflow-hidden');
            return;
        }

        // C. Untermenüs und Overlays schließen (Hier passiert die Magie)
        if (isVisible('item-confirm-modal')) { engine.closeItemConfirm(); return; }
        if (isVisible('keybind-modal')) { engine.closeKeybinds(); return; }
        if (isVisible('save-export-modal') || isVisible('save-import-modal')) { engine.ui.closeModals(); return; }
        if (isVisible('report-modal')) { engine.closeReportModal(); return; }
        if (isVisible('global-stats-modal')) { engine.closeGlobalStats(); return; }

        if (isVisible('inventory-modal')) { engine.closeInventory(); return; }
        if (isVisible('team-modal')) { engine.closeTeam(); return; }
        if (isVisible('archive-modal')) { engine.closeArchive(); return; }
        if (isVisible('intranet-modal')) { engine.closeIntranet(); return; }
        if (isVisible('board-modal')) { engine.closeBoard(); return; }
        
        if (isVisible('excuse-modal')) { engine.closeExcuseModal(); return; }

        // D. Abmahnungs-Modals (Nur schließen, wenn es kein "Game Over" ist!)
        if (isVisible('modal-overlay')) {
            const okBtn = document.querySelector('#modal-content button');
            if (okBtn && okBtn.innerText === 'VERSTANDEN') {
                engine.closeModal();
            }
            return; // Game-Over-Screens können mit ESC nicht geschlossen werden.
        }

        // E. Wenn KEIN Overlay offen ist -> Einstellungen umschalten
        if (isVisible('settings-modal')) {
            engine.closeSettings();
        } else {
            engine.openSettings();
        }
        return;
    }

    // --- NEU: BLOCKADE BEI OFFENEN HAUPTMENÜS ---
    // Wenn das Intro oder das Schwierigkeits-Modal offen ist, blockieren wir alle anderen Hotkeys (außer Enter/Bestätigen für Popups)
    const introModal = document.getElementById('intro-modal');
    const diffModal = document.getElementById('difficulty-modal');
    if ((introModal && introModal.style.display !== 'none') || 
        (diffModal && diffModal.style.display !== 'none')) {
        return;
    }

    // 3. BESTÄTIGEN (Popups, Handy abnehmen, Weiter-Buttons)
    if (key === engine.state.keyBinds.confirm.toLowerCase()) {
        // A: Tutorial
        const tutPointer = document.getElementById('tut-pointer');
        if (tutPointer && !tutPointer.classList.contains('hidden')) {
            // Sucht den "Verstanden" Button im Tooltip
            const verstandenBtn = document.querySelector('#tut-pointer-desc div[onclick="tutorial.advance()"]');
            if (verstandenBtn) { verstandenBtn.click(); return; }
        }
        
        const tutModal = document.getElementById('tut-ask-modal');
        if (tutModal && !tutModal.classList.contains('hidden')) {
            // Sucht den "Arbeitstag starten" Button am Ende
            const finishBtn = document.querySelector('#tut-ask-modal button[onclick="tutorial.finish()"]');
            if (finishBtn) { finishBtn.click(); return; }
        }
        
        // B: Modals (Abmahnung, Ende, Item-Confirm)
        const okBtn = document.querySelector('#modal-content button');
        if (okBtn && okBtn.offsetParent !== null) { okBtn.click(); return; }
        // Checkt das Item-Nutzen-Modal (Der grüne "BENUTZEN"-Button ist der zweite Button im Grid)
        const itemUseBtn = document.querySelector('#item-confirm-modal button.bg-green-600');
        if (itemUseBtn && itemUseBtn.offsetParent !== null) { itemUseBtn.click(); return; }

        // C: Handy-Benachrichtigung annehmen
        const phoneNotif = document.getElementById('phone-notification');
        if (phoneNotif && phoneNotif.offsetParent !== null && !phoneNotif.classList.contains('hidden')) {
            phoneNotif.click();
            return;
        }

        // D: Terminal Weiter-Button
        const terminalButtons = document.querySelectorAll('#terminal-content button');
        if (terminalButtons.length === 1 && (!engine.state.activeEvent || engine.state.pendingEnd || terminalButtons[0].innerText.includes('MITTAGS') || terminalButtons[0].innerText.includes('WEITER'))) {
             terminalButtons[0].click(); return;
        }
    }

    // 4. AKTIONEN DIREKT WÄHLEN (Q, W, E, R)
    // Nur ausführen, wenn kein Event aktiv ist, keine E-Mail offen ist und kein Fullscreen-Modal!
    if (!engine.state.activeEvent && !engine.state.isEmailOpen && !document.body.classList.contains('overflow-hidden')) {
        if (key === engine.state.keyBinds.actCoffee.toLowerCase()) { engine.trigger('coffee'); return; }
        if (key === engine.state.keyBinds.actQuest.toLowerCase()) { engine.trigger('sidequest'); return; }
        if (key === engine.state.keyBinds.actServer.toLowerCase()) { engine.trigger('server'); return; }
        if (key === engine.state.keyBinds.actCall.toLowerCase()) { engine.trigger('calls'); return; }
    }

    // 5. AUSWAHL IN EVENTS & E-MAILS (1, 2, 3... und 4, 5, 6 für die Party)
    // E-Mails setzen overflow-hidden, also müssen wir das explizit erlauben!
    if ((engine.state.activeEvent && !document.body.classList.contains('overflow-hidden')) || engine.state.isEmailOpen) {
        let visibleOptions = [];
        
        // A: Ist eine E-Mail offen?
        const emailModal = document.getElementById('email-modal');
        if (emailModal && !emailModal.classList.contains('hidden')) {
            const emailActions = document.getElementById('email-actions');
            if (emailActions) {
                // Da der Löschen-Button jetzt normal generiert wird, ist er hier automatisch mit drin!
                visibleOptions = Array.from(emailActions.querySelectorAll('button'));
            }
        }
        // B: Check Phone
        else if (document.getElementById('app-actions') && document.getElementById('app-actions').offsetParent !== null) {
            visibleOptions = Array.from(document.querySelectorAll('#app-actions button'));
        } 
        // C: Check Terminal
        else {
            const termActions = document.querySelectorAll('#terminal-content button');
            visibleOptions = Array.from(termActions).filter(b => !b.innerText.includes('WEITER'));
        }

        if (key === engine.state.keyBinds.opt1.toLowerCase() && visibleOptions[0]) visibleOptions[0].click();
        if (key === engine.state.keyBinds.opt2.toLowerCase() && visibleOptions[1]) visibleOptions[1].click();
        if (key === engine.state.keyBinds.opt3.toLowerCase() && visibleOptions[2]) visibleOptions[2].click();
        
        if (key === '4' && visibleOptions[3]) visibleOptions[3].click();
        if (key === '5' && visibleOptions[4]) visibleOptions[4].click();
        if (key === '6' && visibleOptions[5]) visibleOptions[5].click();
    }
});
