import { tick } from 'svelte';
import { engine } from './engine.js';
import { applyStaticStrings } from './i18n/i18n.svelte.js';

/**
 * The look of a highlight, in one place.
 *
 * These names stood in four places before 6.1 - once per adding function, once
 * in clearGlows() and once in ActionBar - and they only worked while all four
 * agreed. Miss one class in clearGlows() and the light never goes out again:
 * no error, no warning, just a ring that stays.
 *
 * RING is what an info step wears. GLOW adds the pulse and belongs to a step
 * that wants something PRESSED. clearGlows() removes the superset, so it can
 * never fall behind either of them.
 *
 * Written as literals so Tailwind sees them: it reads this file (see the
 * @source list in app.css) and would generate nothing for a name assembled at
 * runtime.
 */
export const RING_CLASSES = ['ring-2', 'ring-cyan-500', 'z-2500', 'relative', 'shadow-[0_0_15px_rgba(6,182,212,0.5)]'];
export const GLOW_CLASSES = ['animate-pulse', ...RING_CLASSES];

const tutorial = {
    isActive: false,
    step: 0,
    askButtonsMarkup: null,   // the question's two buttons, kept while the closing screen is up
    pointerTimeout: null,
    unsubscribe: [],   // how to stop listening again; see listen()
    currentTarget: null,
    scrollAttached: false,

    start: function() {
        if (localStorage.getItem(engine.KEYS.tutorialDone) === 'true') return;
        
        engine.state.morningMoodShown = true;
        engine.state.activeEvent = true;

        
        const askModal = this.dressAskModal('ask');
        if(askModal) {
            engine.showOverlay(askModal);
        }
    },

    /**
     * One window, two faces: the opening question and the closing screen.
     *
     * Which one it is wearing is written on its elements as i18n MARKS, not as
     * text - because applyStaticStrings() is what refills them on a language
     * switch, and it reads the marks. The closing screen used to write over the
     * text and leave the ask keys sitting there, so a switch put the opening
     * question back with the finish button still under it. Nobody could reach
     * that: Escape bows out while this modal is open and the window covers the
     * settings cog. It hung on one guard.
     *
     * Whoever shows the window says which face it wears, so nothing has to be
     * put back afterwards. The buttons are markup, so the question's pair is
     * kept in askButtonsMarkup rather than written out a second time in here.
     */
    dressAskModal: function(face) {
        const askModal = document.getElementById('tut-ask-modal');
        if (!askModal) return null;

        const done = face === 'done';
        askModal.querySelector('h3')
            ?.setAttribute('data-i18n', done ? 'tutorial.done.title' : 'tutorial.ask.title');
        askModal.querySelector('p')
            ?.setAttribute('data-i18n-html', done ? 'tutorial.done.text' : 'tutorial.ask.text');

        const buttons = askModal.querySelector('.grid.gap-3');
        if (buttons) {
            this.askButtonsMarkup ??= buttons.innerHTML;
            // The mark writes textContent and owns everything inside its
            // element, so the arrow keeps a span of its own - the same shape
            // the question's buttons have in index.html.
            // i18n-uses: tutorial.done.start
            buttons.innerHTML = done
                ? `<button id="tut-finish-btn" data-action="tutorial.finish" class="w-full bg-cyan-900/40 hover:bg-cyan-600 text-cyan-400 hover:text-white font-bold py-3 px-4 rounded-sm transition-all border border-cyan-700 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2">
                        <span class="text-lg">▶</span> <span data-i18n="tutorial.done.start"></span>
                    </button>`
                : this.askButtonsMarkup;
        }

        // i18n-uses: tutorial.done.title, tutorial.done.text
        applyStaticStrings(askModal);
        return askModal;
    },

    // One central place to switch off all the lights.
    //
    // The action bar is not in the list: it draws its own from the state, so
    // one field switches all four off at once. It has to go out here, because
    // a ringed button sits at z-2500 and would otherwise shine through the
    // modal that has just opened - applyStepLogic() turns the step back on
    // when the modal closes.
    clearGlows: function() {
        engine.state.tutorialStep = null;

        const allElements = ['ticket-container', 'clock-container', 'stat-row-fl', 'stat-row-al', 'stat-row-cr', 'stats-container', 'btn-inventory', 'btn-team', 'inventory-grid'];
        allElements.forEach(id => {
            let el = document.getElementById(id);
            if(el) {
                el.classList.remove(...GLOW_CLASSES);
            }
        });
    },

    /**
     * Subscribes to the engine for the length of the lesson.
     *
     * Until 6.1 this block overwrote seven engine methods and never put them
     * back - see engine/engine_hooks.js. The six below only ever wanted to know
     * that something had happened; askUseItem was the odd one out and is a
     * question the engine asks, not a message it sends.
     */
    listen: function() {
        if (this.unsubscribe.length) return;      // run() can be reached twice

        this.unsubscribe = [
            engine.on('openTeam', () => {
                this.hidePointer();
                this.clearGlows();                 // mute the background
                if (this.step === 9) this.advance();
            }),
            engine.on('closeTeam', () => {
                if (this.step === 10) { this.step = 11; this.showConclusion(); }
                else this.applyStepLogic();
            }),
            engine.on('openInventory', () => { this.hidePointer(); this.clearGlows(); }),
            engine.on('closeInventory', () => this.applyStepLogic()),
            engine.on('closeItemConfirm', () => this.applyStepLogic()),
            engine.on('confirmUseItem', () => {
                engine.closeInventory();
                if (this.step === 8) this.advance();
                else this.applyStepLogic();        // ate something during step 6 -> show step 6 again
            }),

            // The veto. During step 8 only the doughnut may be used; everything
            // else earns a line in the log and the modal stays shut.
            engine.setItemGuard((id) => {
                if (!this.isActive) return true;
                if (this.step === 8 && id !== 'donut') {
                    engine.log({ k: 'tutorial.log.focusDonut' }, "text-red-500 font-bold");
                    return false;
                }
                this.hidePointer();
                this.clearGlows();                 // a modal is about to cover the board
                return true;
            }),
        ];
    },

    /** Hands everything back. The old wrappers had no way to do this. */
    deafen: function() {
        for (const ab of this.unsubscribe) ab();
        this.unsubscribe = [];
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
        
        engine.state.activeNews = { k: 'tutorial.ticker' };
        if (typeof engine.renderHeader === 'function') engine.renderHeader();
        
        this.listen();


        engine.state.tickets = 1;
        engine.state.fl = 0;
        engine.state.al = 0;
        engine.state.cr = 0;
        engine.updateUI();
        
        // Switch the monitor over to H.A.L.G.E.R.D. right away.
        // Goes through the engine: Terminal.svelte owns that element, and a
        // direct innerHTML write here would tear out the nodes it tracks.
        engine.setTerminalIdle('halgerd');

        engine.log({ k: 'tutorial.log.init' }, "text-cyan-400 font-bold");
        
        this.applyStepLogic();
    },

    skip: function() {
        const askModal = document.getElementById('tut-ask-modal');
        if(askModal) {
            engine.hideOverlay(askModal);
        }

        localStorage.setItem(engine.KEYS.tutorialDone, 'true');
        this.isActive = false;
        this.deafen();

        engine.state.tutorialUnlocked = null;
        engine.state.tutorialStep = null;
        engine.state.morningMoodShown = false;
        engine.state.activeEvent = false;
        
        engine.state.activeNews = null;
        if (typeof engine.renderHeader === 'function') engine.renderHeader();

        engine.log({ k: 'tutorial.log.skipped' }, "text-cyan-400 font-bold");
        engine.reset(); 
    },

    applyStepLogic: function() {
        engine.disableButtons(true);
        // Every step shuts the bar again first; an action step reopens exactly
        // one button through highlightAction().
        engine.state.tutorialUnlocked = null;
        
        // Clean up before rendering the next step
        this.clearGlows();

        // A window on top means the board is not the player's business right
        // now, so the lights stay off. Turning them back on here put the ring
        // at z-2500 - ABOVE the inventory at z-1100 - and the freed button
        // could then be clicked straight through the open window: cancel an
        // item use at step 6 and the server room opened behind the backpack.
        // The close hooks call this again, so the step returns the moment the
        // window is gone. The bar stays shut either way, disableButtons()
        // above has already seen to that.
        if (this.modalOpen()) return;

        // ...and switch the bar back on. This dims all four; an action step
        // takes one of them back out through highlightAction().
        engine.state.tutorialStep = this.step;

        // The step texts are handed on as keys and resolved by
        // TutorialPointer.svelte, so lint-i18n cannot see them at a t() call.
        // i18n-uses: tutorial.step.call.title, tutorial.step.call.desc
        // i18n-uses: tutorial.step.tickets.title, tutorial.step.tickets.desc
        // i18n-uses: tutorial.step.clock.title, tutorial.step.clock.desc
        // i18n-uses: tutorial.step.coffee.title, tutorial.step.coffee.desc
        // i18n-uses: tutorial.step.errand.title, tutorial.step.errand.desc
        // i18n-uses: tutorial.step.server.title, tutorial.step.server.desc
        // i18n-uses: tutorial.step.stats.title, tutorial.step.stats.desc
        // i18n-uses: tutorial.step.inv.title, tutorial.step.inv.desc, tutorial.step.inv.descDonut
        // i18n-uses: tutorial.step.team.title, tutorial.step.team.desc
        if (this.step === 1) {
            this.highlightAction('btn-calls', 'tutorial.step.call.title', 'tutorial.step.call.desc');
        }
        else if (this.step === 2) {
            this.highlightInfo('ticket-container', 'tutorial.step.tickets.title', 'tutorial.step.tickets.desc');
        }
        else if (this.step === 3) {
            this.highlightInfo('clock-container', 'tutorial.step.clock.title', 'tutorial.step.clock.desc');
        }
        else if (this.step === 4) {
            this.highlightAction('btn-coffee', 'tutorial.step.coffee.title', 'tutorial.step.coffee.desc');
        }
        else if (this.step === 5) {
            this.highlightAction('btn-sidequest', 'tutorial.step.errand.title', 'tutorial.step.errand.desc');
        }
        else if (this.step === 6) {
            this.highlightAction('btn-server', 'tutorial.step.server.title', 'tutorial.step.server.desc');
        }
        else if (this.step === 7) {
            this.highlightInfo(['stat-row-fl', 'stat-row-al', 'stat-row-cr'], 'tutorial.step.stats.title', 'tutorial.step.stats.desc');
        }
        else if (this.step === 8) {
            let hasDonut = engine.state.inventory.find(i => i.id === 'donut');

            // With a donut in the bag the step is finished by eating it, so it
            // carries no "got it" button - hence the false.
            if (hasDonut) {
                this.highlightInfo('btn-inventory', 'tutorial.step.inv.title', 'tutorial.step.inv.descDonut', false);
            } else {
                this.highlightInfo('btn-inventory', 'tutorial.step.inv.title', 'tutorial.step.inv.desc', true);
            }
        }
        else if (this.step === 9) {
            this.highlightTeam('tutorial.step.team.title', 'tutorial.step.team.desc');
        }
        else if (this.step === 10) {
            this.hidePointer();
        }
    },

    // The windows the tutorial's own hooks open and close again. While one of
    // them stands, the board behind it is not to be lit.
    modalOpen: function() {
        return ['inventory-modal', 'item-confirm-modal', 'team-modal']
            .some(id => engine.isOverlayOpen(id));
    },

    // One of the four bar buttons. Nothing is written into the element: it
    // belongs to ActionBar, which takes the lock off it and gives it the ring
    // as soon as it reads its id here. It is looked up only as an anchor for
    // the bubble.
    highlightAction: function(id, titleKey, descKey) {
        engine.state.tutorialUnlocked = id;

        let btn = document.getElementById(id);
        if(btn) {
            setTimeout(() => {
                this.showPointer(btn, titleKey, descKey, false);
            }, 50);
        }
    },

    // The team button. It lives in index.html and belongs to no component, so
    // it keeps the DOM path - pulse included, which the info steps do not
    // carry. It frees nothing: the bar stays shut for this step.
    highlightTeam: function(titleKey, descKey) {
        let el = document.getElementById('btn-team');
        if(!el) return;

        el.classList.add(...GLOW_CLASSES);

        setTimeout(() => {
            this.showPointer(el, titleKey, descKey, false);
        }, 50);
    },

    highlightInfo: function(idOrArray, titleKey, descKey, isInfoStep = true) {
        let ids = Array.isArray(idOrArray) ? idOrArray : [idOrArray];
        let anchorEl = null;

        ids.forEach(id => {
            let el = document.getElementById(id);
            if(el) {
                el.classList.add(...RING_CLASSES);
                
                if (id === 'stat-row-al' || id === 'btn-inventory' || !anchorEl) {
                    anchorEl = el;
                }
            }
        });

        if(!anchorEl) anchorEl = document.getElementById('terminal-content'); 
        
        if(anchorEl) {
            setTimeout(() => {
                this.showPointer(anchorEl, titleKey, descKey, isInfoStep);
            }, 50);
        }
    },

    showPointer: function(targetEl, titleKey, descKey, isInfoStep) {
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
        //
        //    KEYS, not sentences. t() resolved here would freeze the bubble in
        //    whatever language the step opened in: the bar underneath said
        //    COFFEE while the bubble above it still said "Kaffee holen", until
        //    the step changed. The component resolves instead, and a component
        //    that calls t() is a reader of the language rune.
        engine.state.tutorialPointer = {
            visible: true, faded: true, titleKey, descKey, confirmable: !!isInfoStep
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

        const askModal = this.dressAskModal('done');
        if(askModal) {
            engine.showOverlay(askModal);
        }
    },

    finish: function() {
        this.isActive = false;
        this.deafen();
        localStorage.setItem(engine.KEYS.tutorialDone, 'true');
        
        const askModal = document.getElementById('tut-ask-modal');
        if(askModal) {
            engine.hideOverlay(askModal);
        }
        
        // clearGlows() has already cleared tutorialStep, which is what takes
        // the dimming off all four buttons at once.
        this.clearGlows();
        engine.state.tutorialUnlocked = null;

        engine.softReset();
    },

    debug: function() {
        localStorage.removeItem(engine.KEYS.tutorialDone);
        console.log("Tutorial flag cleared. Reloading...");
        location.reload();
    }
};

// The engine asks the lesson a few things - whether one is running, which step
// it is on - and used to reach a bare `tutorial` global to do it. It reads this
// slot now: registered from this side, so the engine never has to import a file
// that imports the engine.
//
// Set at load rather than at run(): engine.setDifficulty() calls start() before
// any lesson exists, and `isActive` is the switch, exactly as it was.
engine.lesson = tutorial;

export { tutorial };
