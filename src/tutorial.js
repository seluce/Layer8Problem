import { tick } from 'svelte';
import { t } from './i18n/i18n.svelte.js';

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
        
        engine.state.activeNewsText = t('tutorial.ticker');
        if (typeof engine.renderHeader === 'function') engine.renderHeader();
        
        if (!this.hooksInjected && typeof engine !== 'undefined') {
            
            // --- TEAM MODAL HOOKS ---
            const origOpenTeam = engine.openTeam;
            engine.openTeam = function(...args) {
                if (origOpenTeam) origOpenTeam.apply(this, args);
                if (tutorial.isActive) {
                    tutorial.hidePointer(); 
                    tutorial.clearGlows(); // Mute the background
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
                        engine.log(t('tutorial.log.focusDonut'), "text-red-500 font-bold");
                        return; // modal stays closed
                    }
                    // Otherwise the modal may open -> turn the background down
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

        engine.log(t('tutorial.log.init'), "text-cyan-400 font-bold");
        
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

        engine.log(t('tutorial.log.skipped'), "text-cyan-400 font-bold");
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
            this.highlightAction('btn-calls', t('tutorial.step.call.title'), t('tutorial.step.call.desc'));
        }
        else if (this.step === 2) {
            this.highlightInfo('ticket-container', t('tutorial.step.tickets.title'), t('tutorial.step.tickets.desc'));
        }
        else if (this.step === 3) {
            this.highlightInfo('clock-container', t('tutorial.step.clock.title'), t('tutorial.step.clock.desc'));
        }
        else if (this.step === 4) {
            this.highlightAction('btn-coffee', t('tutorial.step.coffee.title'), t('tutorial.step.coffee.desc'));
        }
        else if (this.step === 5) {
            this.highlightAction('btn-sidequest', t('tutorial.step.errand.title'), t('tutorial.step.errand.desc'));
        }
        else if (this.step === 6) {
            this.highlightAction('btn-server', t('tutorial.step.server.title'), t('tutorial.step.server.desc'));
        }
        else if (this.step === 7) {
            this.highlightInfo(['stat-row-fl', 'stat-row-al', 'stat-row-cr'], t('tutorial.step.stats.title'), t('tutorial.step.stats.desc'));
        }
        else if (this.step === 8) {
            let hasDonut = engine.state.inventory.find(i => i.id === 'donut');

            // With a donut in the bag the step is finished by eating it, so it
            // carries no "got it" button - hence the false.
            if (hasDonut) {
                this.highlightInfo('btn-inventory', t('tutorial.step.inv.title'), t('tutorial.step.inv.descDonut'), false);
            } else {
                this.highlightInfo('btn-inventory', t('tutorial.step.inv.title'), t('tutorial.step.inv.desc'), true);
            }
        }
        else if (this.step === 9) {
            this.highlightAction('btn-team', t('tutorial.step.team.title'), t('tutorial.step.team.desc'));
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
        if(!targetEl) return;

        if (this.pointerTimeout) clearTimeout(this.pointerTimeout);

        // 1. Remember the scroll target
        this.currentTarget = targetEl;

        // 2. Scroll it into view - on mobile it is often off-screen
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 3. Hand the content over. TutorialPointer.svelte owns the markup,
        //    including the button an info step needs to carry on - writing
        //    into its nodes from here tore out the anchors it tracks, and the
        //    hand-built button had no id, so the confirm key in engine.js
        //    found nothing to click.
        engine.state.tutorialPointer = {
            visible: true, faded: true, title, desc, confirmable: !!isInfoStep
        };

        // 4. Measure only once the bubble is really in the document: a hidden
        //    element has no width, and the arrow would land at the wrong end.
        tick().then(() => {
            this.updatePosition();
            // Fade in afterwards, so the transition has something to run from.
            setTimeout(() => { engine.state.tutorialPointer.faded = false; }, 10);
        });

        // 5. Recalculate the position whenever the page scrolls
        if (!this.scrollAttached) {
            window.addEventListener('scroll', () => this.updatePosition(), { passive: true });
            window.addEventListener('resize', () => this.updatePosition(), { passive: true });
            this.scrollAttached = true;
        }
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
        engine.state.tutorialPointer.faded = true;
        this.pointerTimeout = setTimeout(() => {
            engine.state.tutorialPointer.visible = false;
            this.currentTarget = null; // clear the target while hidden
        }, 300);
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
            if (title) title.innerText = t('tutorial.done.title');

            const textContent = askModal.querySelector('p');
            if (textContent) {
                textContent.innerHTML = t('tutorial.done.text');
            }

            const btnContainer = askModal.querySelector('.grid.gap-3');
            if (btnContainer) {
                btnContainer.innerHTML = `
                    <button id="tut-finish-btn" onclick="tutorial.finish()" class="w-full bg-cyan-900/40 hover:bg-cyan-600 text-cyan-400 hover:text-white font-bold py-3 px-4 rounded-sm transition-all border border-cyan-700 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2">
                        <span class="text-lg">▶</span> ${t('tutorial.done.start')}
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
