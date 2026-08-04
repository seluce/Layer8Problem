const tutorial = {
    isActive: false,
    step: 0,
    pointerTimeout: null,
    hooksInjected: false,
    currentTarget: null,
    scrollAttached: false,

    start: function() {
        if (localStorage.getItem(engine.KEYS.tutorialDone) === 'true') return;
        
        if (typeof engine !== 'undefined') {
            engine.state.morningMoodShown = true; 
            engine.state.activeEvent = true; 
        }
        
        const askModal = document.getElementById('tut-ask-modal');
        if(askModal) {
            engine.showOverlay(askModal);
        }
    },

    // NEW: one central place to switch off all the lights
    clearGlows: function() {
        const allElements = ['btn-coffee', 'btn-sidequest', 'btn-server', 'btn-calls', 'ticket-container', 'clock-container', 'stat-row-fl', 'stat-row-al', 'stat-row-cr', 'stats-container', 'btn-inventory', 'btn-team', 'inventory-grid'];
        allElements.forEach(id => {
            let el = document.getElementById(id);
            if(el) {
                el.classList.remove('animate-pulse', 'ring-2', 'ring-cyan-500', 'z-2500', 'relative', 'shadow-[0_0_15px_rgba(6,182,212,0.5)]');
            }
        });
    },

    run: function() {
        const askModal = document.getElementById('tut-ask-modal');
        if(askModal) {
            engine.hideOverlay(askModal);
        }
        
        this.isActive = true;
        this.step = 1;
        
        engine.state.activeEvent = false; 
        engine.state.morningMoodShown = true; 
        
        engine.state.activeNewsText = "+++ SYSTEMMELDUNG: H.A.L.G.E.R.D. SIMULATIONS-PROTOKOLL AKTIV +++ REALITÄTSFILTER EINGESCHALTET +++";
        if (typeof engine.renderHeader === 'function') engine.renderHeader();
        
        if (!this.hooksInjected && typeof engine !== 'undefined') {
            
            // --- TEAM MODAL HOOKS ---
            const origOpenTeam = engine.openTeam;
            engine.openTeam = function(...args) {
                if (origOpenTeam) origOpenTeam.apply(this, args);
                if (tutorial.isActive) {
                    tutorial.hidePointer(); 
                    tutorial.clearGlows(); // Hintergrund stumm schalten
                    if (tutorial.step === 9) tutorial.advance(); 
                }
            };

            const origCloseTeam = engine.closeTeam;
            engine.closeTeam = function(...args) {
                if (origCloseTeam) origCloseTeam.apply(this, args);
                if (tutorial.isActive) {
                    if (tutorial.step === 10) {
                        tutorial.step = 11; 
                        tutorial.showConclusion();
                    } else {
                        tutorial.applyStepLogic(); // UI wiederherstellen
                    }
                }
            };

            // --- ITEM HOOKS ---
            const origAskUseItem = engine.askUseItem;
            engine.askUseItem = function(id) {
                if (tutorial.isActive) {
                    // During step 8 only the donut may be used
                    if (tutorial.step === 8 && id !== 'donut') {
                        engine.log("H.A.L.G.E.R.D.: Fokus, Mitarbeiter #404! Klicke auf den Donut.", "text-red-500 font-bold");
                        return; // modal stays closed
                    }
                    // Ansonsten: Modal darf aufgehen -> Hintergrund leise schalten
                    tutorial.hidePointer();
                    tutorial.clearGlows();
                }
                if (origAskUseItem) origAskUseItem.call(this, id);
            };

            const origConfirmUseItem = engine.confirmUseItem;
            engine.confirmUseItem = function(...args) {
                if (origConfirmUseItem) origConfirmUseItem.apply(this, args);
                if (tutorial.isActive) {
                    if (typeof engine.closeInventory === 'function') engine.closeInventory();
                    
                    if (tutorial.step === 8) {
                        tutorial.advance(); 
                    } else {
                        tutorial.applyStepLogic(); // The player e.g. ate something during step 6 -> show step 6 again
                    }
                }
            };

            const origCloseItemConfirm = engine.closeItemConfirm;
            engine.closeItemConfirm = function(...args) {
                if (origCloseItemConfirm) origCloseItemConfirm.apply(this, args);
                if (tutorial.isActive) {
                    tutorial.applyStepLogic(); // Cancelled -> bring everything back into view
                }
            };

            // --- INVENTORY HOOKS ---
            const origOpenInventory = engine.openInventory;
            engine.openInventory = function(...args) {
                if (origOpenInventory) origOpenInventory.apply(this, args);
                if (tutorial.isActive) {
                    tutorial.hidePointer();
                    tutorial.clearGlows();
                }
            };

            const origCloseInventory = engine.closeInventory;
            engine.closeInventory = function(...args) {
                if (origCloseInventory) origCloseInventory.apply(this, args);
                if (tutorial.isActive) {
                    tutorial.applyStepLogic(); 
                }
            };

            this.hooksInjected = true;
        }

        engine.state.tickets = 1;
        engine.state.fl = 0;
        engine.state.al = 0;
        engine.state.cr = 0;
        engine.updateUI();
        
        // Switch the monitor over to H.A.L.G.E.R.D. right away.
        // Goes through the engine: Terminal.svelte owns that element, and a
        // direct innerHTML write here would tear out the nodes it tracks.
        engine.setTerminalIdle('halgerd');

        engine.log("H.A.L.G.E.R.D.: Tutorial-Protokoll initiiert. Erwarte maximales Versagen.", "text-cyan-400 font-bold");
        
        this.applyStepLogic();
    },

    skip: function() {
        const askModal = document.getElementById('tut-ask-modal');
        if(askModal) {
            engine.hideOverlay(askModal);
        }

        localStorage.setItem(engine.KEYS.tutorialDone, 'true');
        this.isActive = false;

        engine.state.morningMoodShown = false;
        engine.state.activeEvent = false;
        
        engine.state.activeNewsText = null;
        if (typeof engine.renderHeader === 'function') engine.renderHeader();

        engine.log("H.A.L.G.E.R.D.: Simulation übersprungen. Viel Glück im freien Fall.", "text-cyan-400 font-bold");
        engine.reset(); 
    },

    applyStepLogic: function() {
        engine.disableButtons(true);
        
        // Clean up before rendering the next step
        this.clearGlows();
        
        // Restore button opacity
        const buttons = ['btn-coffee', 'btn-sidequest', 'btn-server', 'btn-calls'];
        buttons.forEach(id => {
            let el = document.getElementById(id);
            if(el) el.classList.add('opacity-50');
        });

        if (this.step === 1) {
            this.highlightAction('btn-calls', 'Der Anruf', 'Es liegt bereits <b>1 offenes Ticket</b> an! Bearbeite User-Anfragen, um die Zahl zu senken. Das kostet Zeit und erhöht meistens deine AGGRO.');
        } 
        else if (this.step === 2) {
            this.highlightInfo('ticket-container', 'Offene Tickets', 'Durch Anrufe senkst du diesen Wert. Spätestens <b>alle 30 Minuten</b> schlägt ein neues Ticket auf!<br><br>Erreichst du <b>10 Tickets</b>, bricht das System zusammen und du wirst gekündigt.');
        }
        else if (this.step === 3) {
            this.highlightInfo('clock-container', 'Die Uhrzeit', 'Jedes Event kostet Zeit. Du musst bis <b>16:30 Uhr</b> überleben, um Feierabend zu machen. Ohne den Monitor aus dem Fenster zu werfen.');
        }
        else if (this.step === 4) {
            this.highlightAction('btn-coffee', 'Kaffee holen', 'Allein die Existenz der User lässt den Blutdruck steigen. Ein Kaffee kann helfen, deine AGGRO zu senken – aber Vorsicht: An der Kaffeemaschine lauern oft gesprächige Kollegen.');
        }
        else if (this.step === 5) {
            this.highlightAction('btn-sidequest', 'Dienstgang', 'Erlebe den Wahnsinn der GlobalCorp hautnah. Du kannst nützlichen Loot finden, in völlig absurde Situationen geraten oder private Nachrichten auf dein Handy erhalten.');
        }
        else if (this.step === 6) {
            this.highlightAction('btn-server', 'Serverraum', 'Dein Rückzugsort vor dem alltäglichen Wahnsinn. Zwischen blinkenden Racks und surrenden Lüftern passieren oft interessante Dinge – und manchmal wartet hier wertvoller Loot auf dich.');
        }
        else if (this.step === 7) {
            this.highlightInfo(['stat-row-fl', 'stat-row-al', 'stat-row-cr'], 'Deine Parameter', '<b>FAULHEIT:</b> Je fauler du bist, umso mehr verärgert es den Chef bei Fehlern.<br><br><b>AGGRO:</b> Ab 100% musst du einmalig Dampf ablassen, beim zweiten Mal folgt der Rage-Quit.<br><br><b>CHEF-RADAR:</b> Ab 100% gibt es eine Abmahnung, danach die Kündigung.');
        }
        else if (this.step === 8) {
            let hasDonut = engine.state.inventory.find(i => i.id === 'donut');
            
            if (hasDonut) {
                this.highlightInfo('btn-inventory', 'Inventar & Rucksack', 'Hier landet dein Loot. Wichtige Verbrauchsgegenstände liegen direkt im Schnellzugriff, der Rest wandert in den Rucksack.<br><br><b>Iss jetzt den Donut</b> (Klick auf den Rucksack oder direkt unten auf das Item), um fortzufahren!', false);
            } else {
                this.highlightInfo('btn-inventory', 'Inventar & Rucksack', 'Hier wird dein Loot verstaut. Wichtige Verbrauchsgegenstände landen priorisiert vorne im Schnell-Inventar, der Rest wandert in den Rucksack.', true);
            }
        }
        else if (this.step === 9) {
            this.highlightAction('btn-team', 'Das Kollegium', 'Hier sind alle Abteilungen gelistet. Dein Ruf bei ihnen bestimmt, ob zufällige Begegnungen auf dem Flur positiv oder katastrophal enden.<br><br><b>Klicke jetzt auf den Team-Button.</b>');
        }
        else if (this.step === 10) {
            this.hidePointer();
        }
    },

    highlightAction: function(id, title, desc) {
        let btn = document.getElementById(id);
        if(btn) {
            btn.disabled = false;
            btn.classList.remove('opacity-50');
            btn.classList.add('animate-pulse', 'ring-2', 'ring-cyan-500', 'z-2500', 'relative', 'shadow-[0_0_15px_rgba(6,182,212,0.5)]');
            
            setTimeout(() => {
                this.showPointer(btn, title, desc, false);
            }, 50);
        }
    },

    highlightInfo: function(idOrArray, title, desc, isInfoStep = true) {
        let ids = Array.isArray(idOrArray) ? idOrArray : [idOrArray];
        let anchorEl = null;

        ids.forEach(id => {
            let el = document.getElementById(id);
            if(el) {
                el.classList.remove('opacity-50');
                el.classList.add('ring-2', 'ring-cyan-500', 'z-2500', 'relative', 'shadow-[0_0_15px_rgba(6,182,212,0.5)]');
                
                if (id === 'stat-row-al' || id === 'btn-inventory' || !anchorEl) {
                    anchorEl = el;
                }
            }
        });

        if(!anchorEl) anchorEl = document.getElementById('terminal-content'); 
        
        if(anchorEl) {
            setTimeout(() => {
                this.showPointer(anchorEl, title, desc, isInfoStep);
            }, 50);
        }
    },

    showPointer: function(targetEl, title, desc, isInfoStep) {
        const pointer = document.getElementById('tut-pointer');
        if(!pointer || !targetEl) return;
        
        if (this.pointerTimeout) clearTimeout(this.pointerTimeout);
        
        // 1. Remember the scroll target
        this.currentTarget = targetEl; 
        
        // 2. Scroll it into view - on mobile it is often off-screen
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        document.getElementById('tut-pointer-title').innerText = title;
        
        let descHtml = desc;
        if (isInfoStep) {
            descHtml += `<div class="mt-4 border-t border-cyan-800 pt-3 pointer-events-auto">
                            <div onclick="tutorial.advance()" class="cursor-pointer w-full bg-cyan-900/40 hover:bg-cyan-600 text-cyan-400 hover:text-white font-bold py-2 px-2 rounded-sm border border-cyan-700 transition-colors uppercase tracking-widest text-[10px] flex items-center justify-center gap-1 shadow-md">
                                <span>▶</span> Verstanden
                            </div>
                         </div>`;
        }
        
        document.getElementById('tut-pointer-desc').innerHTML = descHtml;
        
        engine.showOverlay(pointer, false);
        
        // 3. Position sofort einmal berechnen
        this.updatePosition();

        // 4. Recalculate the position whenever the page scrolls
        if (!this.scrollAttached) {
            window.addEventListener('scroll', () => this.updatePosition(), { passive: true });
            window.addEventListener('resize', () => this.updatePosition(), { passive: true });
            this.scrollAttached = true;
        }
        
        setTimeout(() => pointer.classList.remove('opacity-0'), 10);
    },

    // Extracted positioning logic
    updatePosition: function() {
        const pointer = document.getElementById('tut-pointer');
        // No pointer, hidden tutorial or missing target -> nothing to position
        if (!pointer || !this.currentTarget || pointer.classList.contains('hidden')) return;

        const rect = this.currentTarget.getBoundingClientRect();
        const ptrWidth = pointer.offsetWidth;
        const ptrHeight = pointer.offsetHeight;
        
        let targetLeft = rect.left + (rect.width / 2) - (ptrWidth / 2);
        const margin = 10; 
        
        if (targetLeft < margin) targetLeft = margin;
        if (targetLeft + ptrWidth > window.innerWidth - margin) {
            targetLeft = window.innerWidth - ptrWidth - margin;
        }
        
        pointer.style.left = targetLeft + 'px';
        pointer.style.transform = 'none'; 
        
        const arrow = document.getElementById('tut-arrow');
        if (arrow) {
            let arrowX = (rect.left + (rect.width / 2)) - targetLeft - 8; 
            if (arrowX < 15) arrowX = 15;
            if (arrowX > ptrWidth - 25) arrowX = ptrWidth - 25;
            arrow.style.left = arrowX + 'px';
        }

        const requiredSpace = ptrHeight + 30;

        if (rect.top < requiredSpace) {
            pointer.style.top = (rect.bottom + 15) + 'px';
            if(arrow) {
                arrow.classList.remove('bottom-[-8px]', 'border-r', 'border-b');
                arrow.classList.add('top-[-8px]', 'border-l', 'border-t');
            }
        } else {
            pointer.style.top = (rect.top - ptrHeight - 15) + 'px';
            if(arrow) {
                arrow.classList.remove('top-[-8px]', 'border-l', 'border-t');
                arrow.classList.add('bottom-[-8px]', 'border-r', 'border-b');
            }
        }
    },

    hidePointer: function() {
        const pointer = document.getElementById('tut-pointer');
        if(pointer) {
            pointer.classList.add('opacity-0');
            this.pointerTimeout = setTimeout(() => {
                engine.hideOverlay(pointer, false);
                this.currentTarget = null; // clear the target while hidden
            }, 300);
        }
    },

    advance: function() {
        this.step++;
        this.applyStepLogic();
    },

    showConclusion: function() {
        this.hidePointer(); 
        
        const askModal = document.getElementById('tut-ask-modal');
        if(askModal) {
            const title = askModal.querySelector('h3');
            if (title) title.innerText = "Simulation abgeschlossen";

            const textContent = askModal.querySelector('p');
            if (textContent) {
                textContent.innerHTML = "H.A.L.G.E.R.D.: Alle Parameter erfasst. Das System berechnet eine Überlebenswahrscheinlichkeit von 12% für den heutigen Tag. Das ist über dem Abteilungsdurchschnitt.<br><br>Ihre Schonzeit ist hiermit beendet. Viel Glück, Mitarbeiter #404. Sie werden es brauchen.";
            }

            const btnContainer = askModal.querySelector('.grid.gap-3');
            if (btnContainer) {
                btnContainer.innerHTML = `
                    <button id="tut-finish-btn" onclick="tutorial.finish()" class="w-full bg-cyan-900/40 hover:bg-cyan-600 text-cyan-400 hover:text-white font-bold py-3 px-4 rounded-sm transition-all border border-cyan-700 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2">
                        <span class="text-lg">▶</span> Arbeitstag starten
                    </button>
                `;
            }

            engine.showOverlay(askModal);
        }
    },

    finish: function() {
        this.isActive = false;
        localStorage.setItem(engine.KEYS.tutorialDone, 'true');
        
        const askModal = document.getElementById('tut-ask-modal');
        if(askModal) {
            engine.hideOverlay(askModal);
        }
        
        this.clearGlows();
        
        // --- Restore the dimmed buttons ---
        const buttons = ['btn-coffee', 'btn-sidequest', 'btn-server', 'btn-calls'];
        buttons.forEach(id => {
            let el = document.getElementById(id);
            if(el) el.classList.remove('opacity-50');
        });

        engine.softReset();
    },

    debug: function() {
        localStorage.removeItem(engine.KEYS.tutorialDone);
        console.log("Tutorial flag cleared. Reloading...");
        location.reload();
    }
};

// The engine checks for a bare `tutorial` identifier, and index.html calls
// tutorial.* from inline handlers. As an ES module this file no longer
// creates a global by itself, so it is published explicitly.
window.tutorial = tutorial;
export { tutorial };
