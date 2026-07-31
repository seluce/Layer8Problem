import { DB } from '../data.js';
import { platform } from '../platform.js';

// Maximum number of lines kept in the activity log.
const LOG_MAX_ENTRIES = 50;

export const ui = {

    // --- NEWS TICKER ---
    checkForNews: function() {
        if (this.state.activeNewsText !== null) return;
        
        if (typeof DB === 'undefined' || !DB.newsTicker) return;

        // Cooldown: 90 Ingame-Minuten
        if (this.state.time - this.state.lastNewsTime < 90) return;

        // 5% Chance
        if (Math.random() <= 0.05) {
            const randomIndex = Math.floor(Math.random() * DB.newsTicker.length);
            this.state.activeNewsText = DB.newsTicker[randomIndex];
            this.state.lastNewsTime = this.state.time;
            this.renderHeader(); 
        }
    },

    // The header line is components/TerminalHeader.svelte; this only decides
    // how long a news item stays before the version number returns.
    renderHeader: function() {
        if (!this.state.activeNewsText) return;

        if (this.state.newsTimer) clearTimeout(this.state.newsTimer);
        this.state.newsTimer = setTimeout(() => {
            this.state.activeNewsText = null;
        }, 30000);
    },

    updateUI: function() {
		
        // --- AUTOMATISCHE INVENTAR-SORTIERUNG ---
        this.state.inventory.sort((a, b) => {
            let itemA = DB.items[a.id];
            let itemB = DB.items[b.id];
            
            // Fallback for an item missing from the database
            if (!itemA) return 1;
            if (!itemB) return -1;

            // Sort priorities
            const getPrio = (item, id) => {
                if (id === 'stressball' || !item.keep) return 1; // Prio 1: Cooldowns & Verbrauch
                if (item.keep && !item.quest) return 2;          // Prio 2: Werkzeuge
                return 3;                                        // 3: quest items and trophies
            };

            let prioA = getPrio(itemA, a.id);
            let prioB = getPrio(itemB, b.id);

            // Lower number sorts first
            return prioA - prioB;
        });
        // ----------------------------------------------
		
        this.state.fl = Math.max(0, Math.min(100, this.state.fl));
        this.state.al = Math.max(0, Math.min(100, this.state.al));
        this.state.cr = Math.max(0, Math.min(100, this.state.cr));
        this.state.tickets = Math.max(0, this.state.tickets);

        // Clock, stat bars, ticket counter and the phone's standby clock are
        // all rendered by components and update themselves from $state.
		
		// --- DRUNK EFFECT RENDERING ---
        let blurVal = 0;
        
        if (this.state.drunkEndTime > this.state.time) {
            const remaining = this.state.drunkEndTime - this.state.time;
            // Scales from 6px down to 0px over sixty minutes
            blurVal = Math.max(0, (remaining / 60) * 3);
        }

        // Elements that get blurred
        const blurTargets = ['terminal', 'smartphone', 'email-modal'];

        blurTargets.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (blurVal > 0.1) { // small tolerance avoids pointless work
                    el.style.filter = `blur(${blurVal}px)`;
                    el.style.transition = "filter 1s ease";
                } else {
                    el.style.filter = 'none';
                }
            }
        });

        // --- INVENTAR UPDATE (Hauptansicht / Mini-Slots) ---
        
        // The five slots and the +N badge are rendered by
        // components/InventorySlots.svelte and InventoryBadge.svelte.
        // Both derive from state.inventory and update on their own.
        this.checkAchievements();
        this.checkEndConditions();
        this.updatePhoneVisibility();
    },
    
    // --- VISUELLES FEEDBACK: ITEM FLIEGT IN DEN RUCKSACK ---
    animateItemToBackpack: function(imgUrl) {
        if (!imgUrl) return;

        // Target: the backpack button in the navigation
        const target = document.getElementById('btn-inventory'); 
        if (!target) return;

        // 1. Positionen berechnen
        const targetRect = target.getBoundingClientRect();

        // Ziel-Mittelpunkt (Mitte des Rucksack-Buttons)
        const targetX = targetRect.left + (targetRect.width / 2);
        const targetY = targetRect.top + (targetRect.height / 2);

        // Start point, roughly 60px above the backpack
        const startX = targetX;
        const startY = targetY - 60;

        // 2. Geist-Bild erstellen
        const ghost = document.createElement('img');
        ghost.src = imgUrl;
        
        ghost.className = 'fixed w-16 h-16 z-9999 object-contain pointer-events-none transition-all duration-1000 ease-in-out';
        
        // Centre it on the start point
        ghost.style.left = (startX - 32) + 'px'; 
        ghost.style.top = (startY - 32) + 'px';
        ghost.style.opacity = '1';
        ghost.style.transform = 'scale(1) translateY(0)';

        document.body.appendChild(ghost);

        // Force a reflow so the browser registers the start position
        void ghost.offsetWidth; 

        // 3. Animation starten
        setTimeout(() => {
            // Drops 60px onto the button while shrinking and fading out
            ghost.style.opacity = '0'; 
            ghost.style.transform = `translateY(60px) scale(0.1)`;
        }, 10);

        // 4. Clean up and bump the backpack icon.
        //
        // Two problems with relying on transitionend alone: it fires once per
        // animated property (opacity AND transform), and it never fires at all
        // when the tab is in the background - which left the ghost image in the
        // DOM forever. finish() is idempotent and a timer backs it up.
        let finished = false;
        const finish = () => {
            if (finished) return;
            finished = true;
            clearTimeout(fallback);
            ghost.remove();
            target.classList.add('scale-110', 'brightness-125', 'transition-all');
            setTimeout(() => target.classList.remove('scale-110', 'brightness-125'), 300);
        };

        const fallback = setTimeout(finish, 1500); // transition is 1000ms
        ghost.addEventListener('transitionend', finish, { once: true });
    },
    
    updatePhoneVisibility: function() {
        const phone = document.getElementById('smartphone'); 
        if (!phone) return;

        // The phone is needed while a phone event is being handled
        let isPhoneActive = this.state.currentPhoneEvent && this.state.activeEvent;

        if (this.state.autoHidePhone && !isPhoneActive) {
            // Remove 'flex', otherwise 'hidden' has no effect
            phone.classList.remove('flex');
            phone.classList.add('hidden', 'lg:flex'); 
        } else {
            // Wieder normal anzeigen
            phone.classList.remove('hidden', 'lg:flex');
            phone.classList.add('flex');
        }
    },
    
    // --- TERMINAL PANEL ---
    //
    // components/Terminal.svelte renders the children of #terminal-content;
    // only the container's own class attribute is set here, because the element
    // belongs to index.html and Svelte does not manage its attributes.
    //
    // Nothing outside these functions may touch that element.

    _setTerminal: function(className, extra) {
        this.state.terminal = { variant: 'system', className, ...extra };
        const term = document.getElementById('terminal-content');
        if (term) term.className = className;
    },

    EVENT_CLASS: 'flex-1 flex flex-col items-center py-3 w-full min-h-full',
    IDLE_CLASS: 'flex-1 flex flex-col justify-center items-center text-center opacity-40',

    // Back to the resting screen. `variant` picks between the plain system
    // prompt and the H.A.L.G.E.R.D. one shown during the tutorial.
    setTerminalIdle: function(variant = 'system') {
        this._setTerminal(this.IDLE_CLASS, { mode: 'idle', variant });
    },

    // Shows an event. components/EventView.svelte renders it from the view model.
    setTerminalEvent: function(type, title, text, opts, isChain, charName) {
        this._setTerminal(this.EVENT_CLASS, {
            mode: 'event',
            event: { type, title, text, opts: opts || [], isChain: !!isChain, charName: charName || null }
        });
    },

    // Shows the outcome of a chosen option.
    // `action` names the engine method the button calls - a name, not code.
    setTerminalResult: function(text, m, f, a, c, action, buttonText, buttonColor) {
        this._setTerminal(this.EVENT_CLASS, {
            mode: 'result',
            result: { text, m, f, a, c, action, buttonText, buttonColor }
        });
    },

    // Shows the morning mood before the day starts.
    setTerminalMorning: function(title, text, conditions) {
        this._setTerminal(this.EVENT_CLASS, {
            mode: 'morning',
            morning: { title, text, conditions }
        });
    },

    // The action bar reads this from state; see components/ActionBar.svelte.
    disableButtons: function(disable) {
        this.state.buttonsDisabled = disable;
    },

    log: function(msg, colorClass) {
        // Skip a message identical to the previous one - stops the log
        // exploding when the player hammers a button.
        if (this.state.lastLogMsg === msg) return;
        this.state.lastLogMsg = msg;

        const h = Math.floor(this.state.time / 60);
        const m = this.state.time % 60;

        // Rendered by components/LogFeed.svelte. The id only has to be unique
        // for the keyed each block, so a counter is enough.
        this.state.logEntries.push({
            id: this._logId = (this._logId || 0) + 1,
            time: `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`,
            msg: msg,
            color: colorClass || ''
        });

        // Cap the backlog. Nobody scrolls back 200 lines.
        if (this.state.logEntries.length > LOG_MAX_ENTRIES) {
            this.state.logEntries.splice(0, this.state.logEntries.length - LOG_MAX_ENTRIES);
        }
    },
    
    // Collapse or expand the log on mobile
    // Only relevant below the lg breakpoint; above it the panel is always
    // visible via lg:block and the toggle is pointer-events-none.
    //
    // Still classList rather than state: the container belongs to index.html,
    // and having LogFeed reach up into its own parent to set a class would be
    // worse than leaving eight lines of DOM code here. It moves into the
    // component once the whole right-hand column is one.
    toggleLog: function() {
        const log = document.getElementById('log-feed');
        const arrow = document.getElementById('log-arrow');
        if (!log) return;

        const nowHidden = log.classList.toggle('hidden');
        if (arrow) arrow.innerText = nowHidden ? "▼" : "▲";
    },
    
    // Rendered by components/EndModal.svelte, which derives theme and button
    // from the title.
    showModal: function(title, text, isEnd) {
        this.state.modal = { open: true, title, text, isEnd: !!isEnd };
        const overlay = document.getElementById('modal-overlay');
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closeModal: function() {
        this.state.modal = { open: false, title: '', text: '', isEnd: false };
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('modal-overlay').classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
        this.updateUI();
    },

    showEnd: function(title, text, isWin) {
        this.showModal(title, text, true);
    },
    
    // --- AUSREDEN SYSTEM ---
    // --- AUSREDEN SYSTEM ---
    // The text itself is components/ExcuseText.svelte.
    openExcuseModal: function() {
        if (this.state.excusesLeft <= 0) return;

        const modal = document.getElementById('excuse-modal');
        if (!modal) return;

        this.state.currentExcuse = DB.excuses?.length
            ? DB.excuses[Math.floor(Math.random() * DB.excuses.length)]
            : "Sorry, mein Router hat einen schlechten Tag.";

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closeExcuseModal: function() {
        const modal = document.getElementById('excuse-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        }
    },

    confirmExcuse: function() {
        if (this.state.excusesLeft <= 0) {
            this.closeExcuseModal();
            return;
        }

        this.state.excusesLeft--;
        
        if (this.state.currentEventId && this.state.usedIDs.has(this.state.currentEventId)) {
            this.state.usedIDs.delete(this.state.currentEventId);
        }
        
        this.closeExcuseModal();
        this.log("Ausrede erfolgreich! Du bist entkommen.", "text-blue-400 italic");
        
        // Back to idle
        this.state.activeEvent = false;
        this.disableButtons(false);
        this.setTerminalIdle();
        
        this.updateSteamStatus('system');
        this.updateUI();
    },
    
    // --- ARCHIV UI (Sammelalbum) ---
    // --- ARCHIV UI (Sammelalbum) ---
    // Contents are rendered by components/ArchiveView.svelte from
    // state.archive; this only opens the window.
    openArchive: function() {
        const modal = document.getElementById('archive-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
        this.state.archiveOpen = true;
    },

    closeArchive: function() {
        this.state.archiveOpen = false;
        document.getElementById('archive-modal').classList.add('hidden');
        document.getElementById('archive-modal').classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    },
    
    // --- LORE SYSTEM ---
    // --- LORE SYSTEM ---
    // The book itself is components/LoreView.svelte.
    showLoreModal: function() {
        this.state.loreOpen = true;
        document.body.classList.add('overflow-hidden');
    },

    closeLoreModal: function() {
        this.state.loreOpen = false;
        document.body.classList.remove('overflow-hidden');
    },

    // --- TEAM / CHARAKTERE ---
    // --- TEAM / CHARAKTERE ---
    // The cards are rendered by components/TeamView.svelte from
    // state.reputation; this only opens the window.
    openTeam: function() {
        const modal = document.getElementById('team-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closeTeam: function() {
        const modal = document.getElementById('team-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    },

    // --- INTRANET SYSTEM ---
    openIntranet: function() {
        const modal = document.getElementById('intranet-modal');
        // Reset the iframe to the start page on every open
        const frame = document.getElementById('intranet-frame');
        if(frame) frame.src = "assets/intranet/index.html"; 
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closeIntranet: function() {
        const modal = document.getElementById('intranet-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    },

    // --- SCHWARZES BRETT ---
    openBoard: function() {
        const modal = document.getElementById('board-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    },

    closeBoard: function() {
        const modal = document.getElementById('board-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    },

    // --- VISUELLES FEEDBACK (Floating Text) ---
    showFloatingText: function(elementId, value) {
        if (value === 0) return; // Nichts anzeigen bei 0

        const target = document.getElementById(elementId);
        if (!target) return;

        // 1. Element erstellen (+ oder - davor setzen)
        const floatEl = document.createElement('div');
        const sign = value > 0 ? '+' : '';
        floatEl.innerText = `${sign}${value}`;
        
        // --- BLINDFLUG CHECK ---
        if (this.state.blindStats) {
            floatEl.innerText = '?'; // blind mode shows only a question mark
        } else {
            floatEl.innerText = `${sign}${value}`;
        }

        // 2. Colour follows the bar, regardless of good or bad
        let color = 'text-white'; // Fallback
        if (elementId === 'val-fl') {
            // Laziness is always green
            color = 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]';
        } else if (elementId === 'val-al') {
            // Aggro = Immer Orange
            color = 'text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]';
        } else if (elementId === 'val-cr') {
            // Chef/Radar = Immer Rot
            color = 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]';
        }

        // Styling (Start-Zustand) - Jetzt noch langsamer: 3000ms (3 Sekunden)
        floatEl.className = `fixed font-normal text-xl z-9999 pointer-events-none transition-all duration-3000 ease-out ${color}`;

        // 3. Start-Position berechnen
        const rect = target.getBoundingClientRect();
        floatEl.style.left = (rect.left + rect.width / 2) + 'px';
        floatEl.style.top = (rect.top - 10) + 'px';
        floatEl.style.transform = 'translate(-50%, 0) scale(1)';
        floatEl.style.opacity = '1';

        document.body.appendChild(floatEl);

        // 4. Float upwards and fade out
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // drifts 40px up
                floatEl.style.transform = 'translate(-50%, -40px) scale(1)';
                floatEl.style.opacity = '0';
            });
        });

        // 5. Clean up after three seconds
        setTimeout(() => {
            floatEl.remove();
        }, 3000);
    },
    
    triggerShake: function(a, c) {
        if (!this.state.screenShake) return;
        // Only shakes for decisions with heavy consequences, above 30
        if (a >= 30 || c >= 30) {
            document.body.classList.remove('animate-shake');
            void document.body.offsetWidth; // force a reflow so the animation restarts
            document.body.classList.add('animate-shake');
            
            setTimeout(() => {
                document.body.classList.remove('animate-shake');
            }, 500);
        }
    },
    
    playBootSequence: function(callback) {
        this.playAudio('boot');
        this.state.activeEvent = true;
        this.disableButtons(true);

        // Softer than the classic terminal green, still retro
        this.state.bootLines = [];
        this._setTerminal('flex-1 flex flex-col items-start justify-center p-8 w-full min-h-full bg-slate-950 text-emerald-400 font-mono text-sm md:text-base overflow-hidden border border-slate-800 rounded-xl shadow-inner', { mode: 'boot' });

        // Weniger "Nerd-Linux", mehr "GlobalCorp Satire"
        const bootLines = [
            `GlobalCorp OS - Version ${this.VERSION}`,
            `Copyright (c) 1999-2026 GlobalCorp International Synergy GmbH & Co. KGaA`,
            `----------------------------------------------`,
            "Verbinde mit Serverraum (Keller)... [OK]",
            "Prüfe Kaffeemaschinen-Netzwerk... [WARNUNG: LEER]",
            "Lade Ausreden-Datenbank (Modul 42)... [OK]",
            "Synchronisiere Chef-Radar... [OK]",
            "Ignoriere wartende User-Anfragen: 4.815... [ERLEDIGT]",
            "Initialisiere TicketSystem... Viel Glück."
        ];

        let i = 0;
        
        const printLine = () => {
            if (i < bootLines.length) {
                this.state.bootLines.push(bootLines[i]);
                i++;
                // Between 300 and 600 milliseconds per line
                setTimeout(printLine, 300 + Math.random() * 300);
            } else {
                // Hold for 1.5 seconds so the last line can be read
                setTimeout(() => {
                    this.state.activeEvent = false;
                    this.disableButtons(false);
                    if (callback) callback();
                }, 1500);
            }
        };

        printLine();
    },
    
    // --- SAVEGAME UI HELPERS ---
    ui: {
        // Opens the export dialog
        openExportModal: function() {
            const modal = document.getElementById('save-export-modal');
            const area = document.getElementById('export-area');
            const msg = document.getElementById('export-msg');
            
            // Code generieren
            const code = engine.exportSaveGame();
            area.value = code || "Fehler beim Erstellen.";
            msg.style.opacity = '0'; // Reset Message

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        },

        // Opens the import dialog
        openImportModal: function() {
            const modal = document.getElementById('save-import-modal');
            const area = document.getElementById('import-area');
            const msg = document.getElementById('import-msg');

            area.value = ""; // Leeren
            msg.style.opacity = '0'; 
            msg.innerText = "";

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        },

        // Closes both dialogs
        closeModals: function() {
            document.getElementById('save-export-modal').classList.add('hidden');
            document.getElementById('save-export-modal').classList.remove('flex');
            document.getElementById('save-import-modal').classList.add('hidden');
            document.getElementById('save-import-modal').classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        },

        // Kopier-Funktion
        copyToClipboard: function() {
            const area = document.getElementById('export-area');
            const msg = document.getElementById('export-msg');

            area.select();
            area.setSelectionRange(0, 99999); 

            navigator.clipboard.writeText(area.value).then(() => {
                msg.innerText = "Code kopiert!";
                msg.className = "text-xs text-green-500 font-bold transition-opacity";
                msg.style.opacity = '1';
                setTimeout(() => { msg.style.opacity = '0'; }, 2000);
            }).catch(err => {
                msg.innerText = "Fehler beim Kopieren.";
                msg.className = "text-xs text-red-500 font-bold transition-opacity";
                msg.style.opacity = '1';
            });
        },

        // Import-Funktion (ROBUST & GEFIXT)
        performImport: function() {
            const area = document.getElementById('import-area');
            const msg = document.getElementById('import-msg');
            
            // 1. Trim whitespace and strip invisible characters
            let code = area.value.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');

            if (!code) {
                msg.innerText = "Bitte Code eingeben!";
                msg.className = "text-xs text-red-500 font-bold transition-opacity";
                msg.style.opacity = '1';
                return;
            }

            try {
                let base64, checksum;

                // 2. STRATEGIE: Trennen am '--' (Neues Format)
                if (code.includes('--')) {
                    const parts = code.split('--');
                    base64 = parts[0];
                    checksum = parts[1];
                } 
                // 3. FALLBACK: Trennen am letzten '-' (Altes Format oder manuell bearbeitet)
                else if (code.includes('-')) {
                    const lastDash = code.lastIndexOf('-');
                    base64 = code.substring(0, lastDash);
                    checksum = code.substring(lastDash + 1);
                } else {
                    throw new Error("Format ungültig (Kein Trennzeichen gefunden).");
                }

                // Verify the checksum
                const calcedSum = engine.calculateChecksum(base64);
                if (calcedSum !== checksum) {
                    console.error("Checksum Mismatch:", calcedSum, "vs", checksum);
                    throw new Error("Code beschädigt (Prüfsumme falsch).");
                }

                // Decoding
                const jsonString = decodeURIComponent(atob(base64).split('').map(c => 
                    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                ).join(''));

                const data = JSON.parse(jsonString);

                // Validierung
                if (!data.arc || !Array.isArray(data.arc.items)) {
                    throw new Error("Datenstruktur fehlerhaft.");
                }

                // --- NEU: SICHERER MERGE ---
                // Start from the current archive template
                const currentTemplate = JSON.parse(JSON.stringify(engine.state.archive));
                // Merge the imported save into it without losing new fields
                const mergedArchive = engine.deepMerge(currentTemplate, data.arc);

                // Speichern des reparierten/gemergten Archivs
                localStorage.setItem(engine.KEYS.archive, JSON.stringify(mergedArchive));

                // Only ever raise the tutorial flag, never lower it.
                // data.tut is the STRING "false" for players who skipped the
                // tutorial, and a non-empty string is truthy — a plain
                // `if (data.tut)` would reset the flag on every import.
                if (data.tut === 'true') localStorage.setItem(engine.KEYS.tutorialDone, 'true');

                if (data.party_easy) localStorage.setItem(engine.KEYS.partyPlayed.easy, data.party_easy);
                if (data.party_normal) localStorage.setItem(engine.KEYS.partyPlayed.normal, data.party_normal);
                if (data.party_hard) localStorage.setItem(engine.KEYS.partyPlayed.hard, data.party_hard);

                msg.innerText = "Erfolg! Neustart...";
                msg.className = "text-xs text-green-500 font-bold transition-opacity";
                msg.style.opacity = '1';

                setTimeout(() => location.reload(), 800);

            } catch (e) {
                console.error(e);
                msg.innerText = "Ungültiger Code!";
                msg.className = "text-xs text-red-500 font-bold transition-opacity";
                msg.style.opacity = '1';
            }
        }
    },
    
    // Closes the game. A browser tab cannot reliably close itself, so the
    // button that calls this is web-hidden anyway.
    quitGame: function() {
        platform.quit();
    },

    // Opens a link outside the game. On desktop this goes through the main
    // process so it lands in the Steam overlay instead of a blank Electron window.
    openExternal: function(url) {
        platform.openExternal(url);
    },

    // Fullscreen is handled by the shell. In a browser the user has F11,
    // so the button that calls this is hidden there anyway.
    toggleFullscreen: function() {
        platform.fullscreen();
    },

    // Contents are rendered by components/GlobalStatsView.svelte.
    openGlobalStats: function() {
        this.closeSettings();

        const modal = document.getElementById('global-stats-modal');
        if (!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');

        this.state.globalStats = { data: null, loading: true, failed: false };
        platform.globalStats()
            .then(data => { this.state.globalStats = { data, loading: false, failed: false }; })
            .catch(() => { this.state.globalStats = { data: null, loading: false, failed: true }; });
    },

    closeGlobalStats: function() {
        const modal = document.getElementById('global-stats-modal');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    },

    triggerHardReset: function(btn) {
        if (btn.dataset.armed === "true") {
            // Step 2: execute.
            // This used to remove a non-existent 'tutorialSeen' key, which meant a
            // hard reset wiped the archive but left the tutorial marked as done.
            localStorage.removeItem(engine.KEYS.archive);
            localStorage.removeItem(engine.KEYS.defaultDiff);
            localStorage.removeItem(engine.KEYS.tutorialDone);
            localStorage.removeItem(engine.KEYS.partyPlayed.easy);
            localStorage.removeItem(engine.KEYS.partyPlayed.normal);
            localStorage.removeItem(engine.KEYS.partyPlayed.hard);

            // Push the emptied state to cloud storage as well, otherwise the
            // next launch would pull the old archive straight back in.
            engine.state.archive = { items: [], achievements: [], achievementDiffs: {}, reputation: {}, stats: { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 } };
            platform.save(engine.buildCloudPayload());
            
            const textSpan = btn.querySelector('#text-hard-reset');
            textSpan.innerText = "System wird neu gestartet...";
            
            btn.className = "w-full text-left px-4 py-3 bg-red-600 border border-red-500 rounded-lg text-white text-sm font-bold flex justify-center items-center mt-2 shadow-md";
            
            setTimeout(() => location.reload(), 1000);
        } else {
            // Schritt 1: Scharfschalten
            btn.dataset.armed = "true";
            const textSpan = btn.querySelector('#text-hard-reset');
            const iconSpan = btn.querySelector('#icon-hard-reset');
            
            textSpan.innerText = "Bist du dir sicher?";
            iconSpan.className = "text-base"; 
            
            btn.className = "w-full text-left px-4 py-3 bg-red-950/30 border border-red-500 rounded-lg transition-all text-red-400 text-sm font-bold flex items-center gap-3 mt-2 animate-pulse shadow-xs";
            
            setTimeout(() => {
                if(btn.dataset.armed === "true") {
                    btn.dataset.armed = "false";
                    textSpan.innerText = "Spielstand löschen";
                    iconSpan.className = "text-base grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all";
                    btn.className = "w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-500 rounded-lg transition-all text-red-400 text-sm font-medium flex items-center gap-3 group shadow-xs";
                }
            }, 4000);
        }
    },
    
    openSettings: function() {
        const modal = document.getElementById('settings-modal');
        const select = document.getElementById('setting-diff');
        
        document.body.classList.add('overflow-hidden');
        
        if(select) select.value = localStorage.getItem(engine.KEYS.defaultDiff) || 'ask';
        
        // --- Toggles aktualisieren ---
        if(document.getElementById('setting-fx')) document.getElementById('setting-fx').checked = this.state.visualFX;
        if(document.getElementById('setting-oneclick')) document.getElementById('setting-oneclick').checked = this.state.oneClickItem;
        if(document.getElementById('setting-fastchat')) document.getElementById('setting-fastchat').checked = this.state.fastChat;
        if(document.getElementById('setting-blindstats')) document.getElementById('setting-blindstats').checked = this.state.blindStats;
        if(document.getElementById('setting-blindtickets')) document.getElementById('setting-blindtickets').checked = this.state.blindTickets;
        if(document.getElementById('setting-audio')) document.getElementById('setting-audio').checked = this.state.audioEffects;
        if(document.getElementById('setting-volume')) document.getElementById('setting-volume').value = this.state.audioVolume;
		if(document.getElementById('setting-music')) document.getElementById('setting-music').checked = this.state.musicEnabled;
        if(document.getElementById('setting-music-volume')) document.getElementById('setting-music-volume').value = this.state.musicVolume;
        if(document.getElementById('setting-autohide')) document.getElementById('setting-autohide').checked = this.state.autoHidePhone;
        if(document.getElementById('setting-compact')) document.getElementById('setting-compact').checked = this.state.compactMode;
        if(document.getElementById('setting-shake')) document.getElementById('setting-shake').checked = this.state.screenShake;
        const styleSelect = document.getElementById('setting-music-style'); if(styleSelect) styleSelect.value = this.state.musicStyle;
        
        // --- Soft reset button, greyed out in the main menu and difficulty picker ---
        const softResetBtn = document.getElementById('btn-soft-reset');
        const introModal = document.getElementById('intro-modal');
        const diffModal = document.getElementById('difficulty-modal');
        
        if (softResetBtn) {
            // Is the intro, the difficulty modal or the tutorial currently active?
            const isIntroOpen = introModal && introModal.style.display !== 'none';
            const isDiffOpen = diffModal && (diffModal.style.display === 'flex' || !diffModal.classList.contains('hidden'));
            const isTutorialActive = typeof tutorial !== 'undefined' && tutorial.isActive;

            if (isIntroOpen || isDiffOpen || isTutorialActive) {
                // Sperren
                softResetBtn.classList.add('opacity-40', 'pointer-events-none', 'grayscale');
                softResetBtn.disabled = true; 
            } else {
                // Freigeben
                softResetBtn.classList.remove('opacity-40', 'pointer-events-none', 'grayscale');
                softResetBtn.disabled = false; 
            }
        }
        // -------------------------------------------------------------
        
        const resetBtn = document.getElementById('btn-hard-reset');
        if (resetBtn) {
            resetBtn.dataset.armed = "false";
            document.getElementById('text-hard-reset').innerText = "Spielstand löschen";
            document.getElementById('icon-hard-reset').className = "text-base grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all";
            resetBtn.className = "w-full text-left px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-500 rounded-lg transition-all text-red-400 text-sm font-medium flex items-center gap-3 group shadow-xs";
        }

        const mainView = document.getElementById('menu-main-view');
        const settingsView = document.getElementById('menu-settings-view');
        const title = document.getElementById('settings-title');
        
        if (mainView && settingsView && title) {
            mainView.classList.remove('hidden');
            settingsView.classList.add('hidden');
            title.innerText = 'MENÜ';
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    },
    
    closeSettings: function() {
        const modal = document.getElementById('settings-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    },

    toggleFX: function(isOn) {
        this.state.visualFX = isOn;
        localStorage.setItem('layer8_fx', isOn);
        this.updateUI();
    },
    
    toggleShake: function(isOn) {
        this.state.screenShake = isOn;
        localStorage.setItem('layer8_shake', isOn);
    },
    
    toggleOneClick: function(isOn) {
        this.state.oneClickItem = isOn;
        localStorage.setItem('layer8_oneclick', isOn);
    },
    toggleFastChat: function(isOn) {
        this.state.fastChat = isOn;
        localStorage.setItem('layer8_fastchat', isOn);
    },
    toggleBlindStats: function(isOn) {
        this.state.blindStats = isOn;
        localStorage.setItem('layer8_blindstats', isOn);
        this.updateUI();
    },
    toggleBlindTickets: function(isOn) {
        this.state.blindTickets = isOn;
        localStorage.setItem('layer8_blindtickets', isOn);
        this.updateUI();
    },
    toggleAudio: function(isOn) {
        this.state.audioEffects = isOn;
        localStorage.setItem('layer8_audio', isOn);
        if(isOn) this.playAudio('ui');
    },
	toggleShowHotkeys: function(isOn) {
        this.state.showHotkeys = isOn;
        localStorage.setItem('layer8_showhotkeys', isOn);
    },
	    
    toggleAutoHidePhone: function(isOn) {
        this.state.autoHidePhone = isOn;
        localStorage.setItem('layer8_autohidephone', isOn);
        this.updatePhoneVisibility();
    },
    
    toggleCompactMode: function(isOn) {
        this.state.compactMode = isOn;
        localStorage.setItem('layer8_compact', isOn);
        if (isOn) {
            document.body.classList.add('compact-mode');
        } else {
            document.body.classList.remove('compact-mode');
        }
    },
    
    saveDefaultDifficulty: function(val) {
        localStorage.setItem(engine.KEYS.defaultDiff, val);
        this.log(`Start-Modus geändert auf: ${val.toUpperCase()}`, "text-blue-400");
    },

    shareGame: function(btn) {
        // Desktop hands out the store page, the browser its own URL.
        const shareUrl = platform.shareUrl();

        const shareData = {
            title: 'Layer8Problem - Der SysAdmin Simulator',
            text: 'Ich versuche gerade als SysAdmin bei GlobalCorp zu überleben. Hilf mir oder mach es besser!',
            url: shareUrl
        };
        
        const textSpan = btn.querySelector('#text-share') || btn;
        const originalText = textSpan.innerText;

        if (navigator.share) {
            navigator.share(shareData).catch(err => console.log("Teilen abgebrochen:", err));
        } else {
            navigator.clipboard.writeText(shareUrl).then(() => {
                textSpan.innerText = "Link erfolgreich kopiert!";
                btn.classList.add('bg-green-900/30!', 'border-green-500!', 'text-green-400!');
                
                setTimeout(() => {
                    textSpan.innerText = originalText;
                    btn.classList.remove('bg-green-900/30!', 'border-green-500!', 'text-green-400!');
                }, 3000);
            }).catch(() => {
                textSpan.innerText = "Kopieren fehlgeschlagen.";
                textSpan.classList.add('text-red-400');
                setTimeout(() => {
                    textSpan.innerText = originalText;
                    textSpan.classList.remove('text-red-400');
                }, 3000);
            });
        }
    },
    
    // --- KEYBINDING FUNKTIONEN ---
    startBindingKey: function(action) {
        if (this.state.isBindingKey) return;

        this.state.isBindingKey = true;
        this.state.actionToBind = action;
        let btn = document.getElementById('bind-' + action);
        if (btn) {
            btn.innerText = "Drücke Taste...";
            btn.className = "bg-amber-500 text-black px-4 py-2 rounded-lg font-bold text-xs uppercase animate-pulse shadow-lg";
            btn.blur(); 
        }
    },

    finishBindingKey: function(key) {
        const forbiddenKeys = ['shift', 'control', 'alt', 'meta', 'capslock', 'tab'];
        // Keys that cannot be rebound
        const hardcodedKeys = ['4', '5', '6']; 
        
        if (forbiddenKeys.includes(key.toLowerCase())) return;

        let pressedKey = key === " " ? "Space" : key;
        const currentBind = this.state.keyBinds[this.state.actionToBind];
        
        // 1. Cancel with escape or by pressing the same key again
        if (key.toLowerCase() === 'escape' || (currentBind && currentBind.toLowerCase() === pressedKey.toLowerCase())) {
            this.state.isBindingKey = false;
            this.state.actionToBind = null;
            this.updateSettingsUI();
            return;
        }

        // --- 4, 5 and 6 are reserved, with visual feedback ---
        if (hardcodedKeys.includes(pressedKey)) {
            let conflictBtn = document.getElementById('bind-' + this.state.actionToBind);
            if (conflictBtn) {
                conflictBtn.classList.remove('bg-slate-800', 'border-slate-600', 'text-slate-300');
                conflictBtn.classList.add('bg-red-600', 'border-red-500', 'text-white', 'animate-shake');
                conflictBtn.innerText = "RESERVIERT"; // Optischer Hinweis
                
                setTimeout(() => {
                    conflictBtn.classList.remove('bg-red-600', 'border-red-500', 'text-white', 'animate-shake');
                    conflictBtn.classList.add('bg-amber-500', 'text-black'); // back to the amber "waiting" state
                    conflictBtn.innerText = "Drücke Taste...";
                }, 800);
            }
            return; // reject the key but stay in binding mode
        }
        // ---------------------------------------------------------
        
        // 2. Doppelbelegung verhindern
        for (let act in this.state.keyBinds) {
            if (this.state.keyBinds[act].toLowerCase() === pressedKey.toLowerCase() && act !== this.state.actionToBind) {
                let conflictBtn = document.getElementById('bind-' + act);
                if (conflictBtn) {
                    conflictBtn.classList.remove('bg-slate-800', 'border-slate-600', 'text-slate-300');
                    conflictBtn.classList.add('bg-red-600', 'border-red-500', 'text-white', 'animate-shake');
                    
                    setTimeout(() => {
                        conflictBtn.classList.remove('bg-red-600', 'border-red-500', 'text-white', 'animate-shake');
                        conflictBtn.classList.add('bg-slate-800', 'border-slate-600', 'text-slate-300');
                    }, 500);
                }
                return;
            }
        }

        // 3. Erfolgreich speichern
        this.state.keyBinds[this.state.actionToBind] = pressedKey;
        this.state.isBindingKey = false;
        this.state.actionToBind = null;
        this.saveSystem(); 
        this.updateSettingsUI();
    },

    updateSettingsUI: function() {
        for (let act in this.state.keyBinds) {
            let btn = document.getElementById('bind-' + act);
            if (btn) {
                let displayKey = this.state.keyBinds[act];
                if(displayKey.startsWith('Arrow')) displayKey = displayKey.replace('Arrow', '');
                
                btn.innerText = displayKey.toUpperCase();
                btn.className = "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 px-4 py-2 rounded-lg font-bold text-xs uppercase transition-colors min-w-[80px]";
            }
        }
    },
    
    openKeybinds: function() {
        this.updateSettingsUI();
        
        if(document.getElementById('setting-showhotkeys')) {
            document.getElementById('setting-showhotkeys').checked = this.state.showHotkeys;
        }
        
        document.getElementById('keybind-modal').classList.remove('hidden');
        document.getElementById('keybind-modal').classList.add('flex');
    },

    closeKeybinds: function() {
        this.state.isBindingKey = false;
        document.getElementById('keybind-modal').classList.add('hidden');
        document.getElementById('keybind-modal').classList.remove('flex');
    },
    
    resetKeybinds: function() {
        // Restore the defaults
        this.state.keyBinds = { actCoffee: 'q', actQuest: 'w', actServer: 'e', actCall: 'r', opt1: '1', opt2: '2', opt3: '3', confirm: 'Space' };
        this.state.isBindingKey = false;
        this.state.actionToBind = null;
        
        this.saveSystem();
        this.updateSettingsUI();
        this.playAudio('ui');
        
        // Visual feedback: every button flashes green briefly
        const buttons = document.querySelectorAll('[id^="bind-"]');
        buttons.forEach(btn => {
            btn.classList.add('bg-green-900/40!', 'border-green-500!', 'text-green-400!');
            setTimeout(() => {
                btn.classList.remove('bg-green-900/40!', 'border-green-500!', 'text-green-400!');
            }, 600);
        });
    },
	
    // --- NEU: VISUELLE HOTKEYS RENDERN ---
    // --- REPORT SYSTEM ---

    openReportModal: function() {
        const modal = document.getElementById('report-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closeReportModal: function() {
        const modal = document.getElementById('report-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    },

    sendReportMail: function() {
        try {
            // --- CONFIG ---
            // The trailing /viewform has to become /formResponse
            const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc2uwIVCYnmsQ_MpJNpXjc7kX7DlXoHYXMUUZwAWjwrtTHJDg/formResponse";
            const IDS = {
                cat: "entry.1431680664",
                desc: "entry.1740494219",
                debug: "entry.1066861594"
            };

            // --- INPUTS LESEN ---
            const catVal = document.getElementById('report-category')?.value || "Unbekannt";
            const descVal = document.getElementById('report-desc')?.value || "";

            // Leere Beschreibung abfangen (Optional, aber gut)
            if (descVal.trim() === "") {
                alert("Bitte gib eine kurze Beschreibung ein.");
                return;
            }

            // --- STATE DATEN ---
            const s = this.state || {}; 
            const min = s.time || 480;
            const hh = Math.floor(min / 60).toString().padStart(2, '0');
            const mm = (min % 60).toString().padStart(2, '0');
            const prettyTime = `${hh}:${mm} Uhr`;
            // inventory holds objects, not ids - joining it straight produced
            // a list of [object Object] in every report so far.
            const invList = s.inventory?.length ? s.inventory.map(i => i.id).join(", ") : "(leer)";
            // There is no state.difficulty - the value is difficultyMult, so
            // every report claimed "Normal" regardless of the day chosen.
            const diff = s.difficultyMult < 1.0 ? "Freitag (Leicht)"
                       : s.difficultyMult > 1.0 ? "Montag (Schwer)"
                       : "Mittwoch (Normal)";

            // --- LETZTES EVENT ERMITTELN ---
            let lastEventID = "Keine Daten";
            if (s.activeEvent?.id) lastEventID = s.activeEvent.id + " (Aktiv)";
            else if (s.currentPhoneEvent?.id) lastEventID = s.currentPhoneEvent.id + " (Phone)";
            else if (s.storyFlags && Object.keys(s.storyFlags).length > 0) {
                const flags = Object.keys(s.storyFlags);
                lastEventID = flags[flags.length - 1] + " (Letztes Flag)";
            }

            // --- LOG FEED (DIE LETZTEN 600 ZEICHEN) ---
            let logText = "(Log leer)";

            if (this.state.logEntries.length > 0) {
                let rawText = [...this.state.logEntries].reverse()
                    .map(e => `[${e.time}] ${e.msg}`).join(" // ");
                if (rawText.length > 2000) rawText = rawText.substring(0, 2000) + "...";
                logText = rawText;
            }

            // --- ZUSAMMENBAUEN ---
            const logData = 
`=== STATUS ===
📍 Event:     ${lastEventID}
🕒 Zeit:      ${prettyTime}
💀 Diff:      ${diff}
📊 Stats:     F ${s.fl || 0}% | A ${s.al || 0}% | C ${s.cr || 0}%
🎒 Inv:       ${invList}
--- LOG FEED (NEUESTE EINTRÄGE) ---
${logText}
=====================`;

            // --- UI FEEDBACK START (Button manipulieren) ---
            const sendBtn = document.querySelector('#report-modal button.bg-blue-600');
            let originalText = "";
            if (sendBtn) {
                originalText = sendBtn.innerHTML;
                sendBtn.innerHTML = "<span>⏳</span> Sende...";
                sendBtn.disabled = true;
                sendBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }

            // --- PAYLOAD BAUEN ---
            const formData = new URLSearchParams();
            formData.append(IDS.cat, catVal);
            formData.append(IDS.desc, descVal);
            formData.append(IDS.debug, logData);

            // --- Silent POST via no-cors: the response is opaque, which is fine ---
            fetch(FORM_URL, {
                method: 'POST',
                mode: 'no-cors', // Verhindert Sicherheits-Blockaden vom Browser
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            }).then(() => {
                // UI Erfolgsmeldung
                if (sendBtn) {
                    sendBtn.innerHTML = "<span>✅</span> Gesendet!";
                    sendBtn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
                    sendBtn.classList.add('bg-green-600!');
                }
                
                // Close and clean up after 1.5 seconds
                setTimeout(() => {
                    this.closeReportModal();
                    
                    if (sendBtn) {
                        sendBtn.innerHTML = originalText;
                        sendBtn.disabled = false;
                        sendBtn.classList.remove('opacity-50', 'cursor-not-allowed', 'bg-green-600!');
                        sendBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
                    }
                    // Clear the field for the next report
                    document.getElementById('report-desc').value = "";
                    
                }, 1500);

            }).catch((err) => {
                console.error("Fetch Error:", err);
                alert("Fehler beim Senden. Bitte prüfe deine Internetverbindung.");
                if (sendBtn) {
                    sendBtn.innerHTML = originalText;
                    sendBtn.disabled = false;
                    sendBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            });

        } catch (e) {
            console.error("Report Error:", e);
            alert("Ein unerwarteter Fehler ist aufgetreten.");
        }
    },

};
