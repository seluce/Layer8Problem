import { KEYS } from './keys.js';
import { formatClock, freshArchive } from './engine_state.svelte.js';
import { t, tf, language } from '../i18n/i18n.svelte.js';
import { DB, ensure } from '../data.js';
import { platform } from '../platform.js';
import { WEEK_DIFFS } from './engine_week.js';
import { recipeKey, renderRecipe } from './recipe.js';

// Maximum number of lines kept in the activity log.
const LOG_MAX_ENTRIES = 50;

export const ui = {

    /**
     * The captions of the two reset buttons, which no mark can write.
     *
     * Both spans carry a data-i18n mark for their RESTING text, and
     * applyStaticStrings() overwrites every marked element on a language
     * switch - unconditionally, which is the point of a mark. These two say
     * something the mark cannot know:
     *
     *   - the soft reset restarts the WEEK in a week, not "the day at 08:00",
     *     and the mark puts the day wording back;
     *   - the hard reset is a two-step button. Armed, it asks "are you sure?"
     *     while `dataset.armed` says true. The mark restored the calm caption
     *     and left the flag standing, so the next click deleted the save
     *     WITHOUT the second question.
     *
     * So they are dressed here, from openSettings and again after every
     * switch. Disarming rather than re-asking is deliberate: after a repaint
     * the visible button is the calm one, and the state now matches it.
     */
    dressResetButtons: function() {
        // In a week the button does not restart "the day at 08:00" - it
        // returns to the last night checkpoint, which can be a different
        // weekday entirely. Saying 08:00 there would be a plain lie.
        const title = document.getElementById('text-soft-reset');
        const sub = document.getElementById('sub-soft-reset');
        const inWeek = this.state.week.active;
        if (title) title.innerText = t(inWeek ? 'settings.softReset.week' : 'settings.softReset.day');
        if (sub) sub.innerText = t(inWeek ? 'settings.softReset.weekSub' : 'settings.softReset.sub');

        const resetBtn = document.getElementById('btn-hard-reset');
        if (resetBtn) {
            resetBtn.dataset.armed = "false";
            const textSpan = document.getElementById('text-hard-reset');
            const iconSpan = document.getElementById('icon-hard-reset');
            if (textSpan) textSpan.innerText = t('settings.hardReset.short');
            if (iconSpan) iconSpan.className = "shrink-0 grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all";
            resetBtn.className = "w-full relative z-10 text-left px-4 py-3 mt-1 bg-red-950/20 hover:bg-red-950/40 border border-red-900/50 hover:border-red-500 rounded-lg transition-all flex items-center gap-3 group shadow-xs";
        }
    },

    // --- NEWS TICKER ---
    checkForNews: function() {
        if (this.state.activeNews !== null) return;
        
        if (typeof DB === 'undefined' || !DB.newsTicker) return;

        // Cooldown: 90 Ingame-Minuten
        if (this.state.time - this.state.lastNewsTime < 90) return;

        // 5% Chance
        if (Math.random() <= 0.05) {
            // The draw is recorded, not the line it produced: both trees carry
            // the same list length, so the same index is the same headline.
            const pick = Math.floor(Math.random() * DB.newsTicker.length);
            this.state.activeNews = { ref: { p: 'newsTicker', path: [pick] } };
            this.state.lastNewsTime = this.state.time;
            this.renderHeader();
        }
    },

    // How long a ticker takes to cross the screen.
    //
    // It used to be a flat 30 seconds regardless of length, so the longest
    // headline (386 characters) scrolled almost twice as fast as the shortest
    // (206) — exactly backwards for reading. Scaling with the text keeps the
    // speed constant instead.
    //
    // Both the animation and the timeout that clears the news read this, so
    // they cannot drift apart.
    newsDuration: function(text) {
        const BASE_MS = 7000;        // time to traverse the empty panel
        const MS_PER_CHAR = 95;      // roughly 6px per character at 65px/s
        return BASE_MS + (text?.length ?? 0) * MS_PER_CHAR;
    },

    // The header line is components/TerminalHeader.svelte; this only decides
    // how long a news item stays before the version number returns.
    renderHeader: function() {
        if (this.state.activeNews === null) return;

        if (this.state.newsTimer) clearTimeout(this.state.newsTimer);
        this.state.newsTimer = setTimeout(() => {
            this.state.activeNews = null;
        }, this.newsDuration(renderRecipe(this.state.activeNews)));
    },

    updateUI: function() {
		
        // --- AUTOMATIC INVENTORY SORTING ---
        this.state.inventory.sort((a, b) => {
            let itemA = DB.items[a.id];
            let itemB = DB.items[b.id];
            
            // Fallback for an item missing from the database
            if (!itemA) return 1;
            if (!itemB) return -1;

            // Sort priorities
            const getPrio = (item, id) => {
                if (id === 'stressball' || !item.keep) return 1; // Prio 1: cooldowns and consumables
                if (item.keep && !item.quest) return 2;          // Prio 2: tools
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

        // --- INVENTORY UPDATE (full view and mini slots) ---
        
        // The five slots and the +N badge are rendered by
        // components/InventorySlots.svelte and InventoryBadge.svelte.
        // Both derive from state.inventory and update on their own.
        this.checkAchievements();
        this.checkEndConditions();
        this.updatePhoneVisibility();
    },
    
    // --- VISUAL FEEDBACK: item flies into the backpack ---
    animateItemToBackpack: function(imgUrl) {
        if (!imgUrl) return;

        // Target: the backpack button in the navigation
        const target = document.getElementById('btn-inventory'); 
        if (!target) return;

        // 1. Work out the positions
        const targetRect = target.getBoundingClientRect();

        // Target centre (middle of the backpack button)
        const targetX = targetRect.left + (targetRect.width / 2);
        const targetY = targetRect.top + (targetRect.height / 2);

        // Start point, roughly 60px above the backpack
        const startX = targetX;
        const startY = targetY - 60;

        // 2. Create the ghost image
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

        // 3. Start the animation
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
            // Show normally again
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

    // Top edge of the terminal panel, by event type. Matches the colours
    // EventView uses inside, so the panel and its contents read as one thing.
    TERMINAL_ACCENTS: {
        calls: '#3b82f6', boss: '#ef4444', rep: '#eab308', sidequest: '#a855f7',
        server: '#10b981', coffee: '#f59e0b', party: '#ec4899', lunch: '#14b8a6'
    },

    _setTerminal: function(className, extra) {
        this.state.terminal = { variant: 'system', className, ...extra };

        const term = document.getElementById('terminal-content');
        if (term) term.className = className;

        // The panel belongs to index.html, so its accent is set here rather
        // than by the component rendering inside it.
        const panel = document.getElementById('terminal');
        if (panel) {
            const type = extra?.event?.type;
            panel.style.setProperty('--panel-accent', this.TERMINAL_ACCENTS[type] ?? '#334155');
        }
    },

    EVENT_CLASS: 'flex-1 flex flex-col items-center py-3 w-full min-h-full',
    IDLE_CLASS: 'flex-1 flex flex-col justify-center items-center text-center opacity-40',

    // Back to the resting screen. `variant` picks between the plain system
    // prompt and the H.A.L.G.E.R.D. one shown during the tutorial.
    setTerminalIdle: function(variant = 'system') {
        this._setTerminal(this.IDLE_CLASS, { mode: 'idle', variant });
        // Idle is the safe moment to save: no open event that would have to
        // be restored half-finished.
        this.saveDay?.();
    },

    // Shows an event. components/EventView.svelte renders it from the view model.
    // `nodes` rides along so the component can tell whether an option's next
    // names another conversation node (badge: goes on) or a result (ends) -
    // the same lookup the engine does on the click.
    setTerminalEvent: function(type, title, text, opts, isChain, charName, nodes) {
        this._setTerminal(this.EVENT_CLASS, {
            mode: 'event',
            event: { type, title, text, opts: opts || [], isChain: !!isChain, charName: charName || null, nodes: nodes || null }
        });
    },

    // Shows the outcome of a chosen option.
    // `action` names the engine method the button calls - a name, not code.
    //
    // `buttonKey` is a dictionary key, not a caption. It used to be the
    // finished word, which meant the one line on this screen that COULD follow
    // a language switch did not: components/ResultView.svelte now translates it
    // on render, so it changes with everything else. The prose above it cannot
    // follow - it is the outcome of an option already chosen - and that is the
    // documented split, not an oversight.
    // `text` is a RECIPE, not a sentence - components/ResultView.svelte resolves
    // it on every paint, so a finished result follows a language switch like
    // everything else recorded. See engine/recipe.js.
    setTerminalResult: function(text, m, l, a, b, action, buttonKey, buttonColor) {
        this._setTerminal(this.EVENT_CLASS, {
            mode: 'result',
            result: { text, m, l, a, b, action, buttonKey, buttonColor }
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

    /**
     * Writes one line into the activity log.
     *
     * Takes either a finished string, as it always did, or a RECIPE - see
     * engine/recipe.js. A recipe is what lets the line follow a language
     * switch instead of staying in the language it happened to be written in:
     *
     *     this.log(t('log.email.sent'), 'text-blue-400')       // frozen
     *     this.log({ k: 'log.email.sent' }, 'text-blue-400')   // follows
     *
     * A recipe is stored as the recipe and NOTHING else - no rendered copy
     * beside it. The line is resolved by whoever draws it, every time, which is
     * what lets it follow a switch. A string is still accepted and stored as
     * `msg`, which now means one thing only: this line has no identity to hold.
     */
    log: function(spec, colorClass) {
        const entry = (spec && typeof spec === 'object') ? { ...spec } : { msg: String(spec ?? '') };

        // Skip a line identical to the previous one - stops the log exploding
        // when the player hammers a button. Compared by IDENTITY, not by the
        // finished sentence: two unlike events that happen to read alike used
        // to be folded into one, and the same event in two languages was not.
        const key = recipeKey(entry);
        if (this.state.lastLogMsg === key) return;
        this.state.lastLogMsg = key;

        // Rendered by components/LogFeed.svelte. The id only has to be unique
        // for the keyed each block, so a counter is enough.
        this.state.logEntries.push({
            ...entry,
            id: this._logId = (this._logId || 0) + 1,
            time: formatClock(this.state.time),
            color: colorClass || ''
        });

        // Cap the backlog at LOG_MAX_ENTRIES - nobody scrolls back that far.
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
    /**
     * Interstitial notice (warning, valve): a title and one line of text.
     * The end of a day goes through showEnd and carries structured fields.
     */

    /**
     * Who is currently holding the page still.
     *
     * Several windows can be open at once - the key bindings sit on top of the
     * settings, "use this item?" on top of the backpack - so the lock is held
     * by name instead of by a flag. It lifts when the last holder lets go, and
     * a second lock or a stray release changes nothing, which a counter cannot
     * promise: a counter that drifts once leaves the page either locked for
     * good or scrolling behind an open dialog.
     *
     * Only visible below 1024px. Above that app.css keeps the body from
     * scrolling anyway, which is why closing the upper of two windows released
     * the page unnoticed for so long.
     */
    _scrollHolders: new Set(),

    lockScroll: function(holder) {
        this._scrollHolders.add(holder);
        document.body.classList.add('overflow-hidden');
    },

    releaseScroll: function(holder) {
        this._scrollHolders.delete(holder);
        if (this._scrollHolders.size === 0) {
            document.body.classList.remove('overflow-hidden');
        }
    },

    /**
     * Shows a full-screen overlay and locks the page behind it.
     *
     * The three lines this replaces (drop "hidden", add "flex", lock scrolling)
     * appeared in 33 places across the engine. Whenever one of them forgot the
     * scroll lock, the page scrolled underneath the dialog.
     *
     * Accepts an element or an id, because half the call sites already hold
     * the element and the other half only know its name.
     */
    showOverlay: function(target, lockScroll = true) {
        const el = typeof target === 'string' ? document.getElementById(target) : target;
        if (!el) return null;
        el.classList.remove('hidden');
        el.classList.add('flex');
        if (lockScroll) this.lockScroll(el.id || 'overlay');
        return el;
    },

    /**
     * Counterpart to showOverlay. Always releases this overlay's hold on the
     * page - whether the page then scrolls again is decided by whoever else is
     * still holding it, so there is no second argument to get wrong.
     */
    hideOverlay: function(target) {
        const el = typeof target === 'string' ? document.getElementById(target) : target;
        if (!el) return null;
        el.classList.add('hidden');
        el.classList.remove('flex');
        this.releaseScroll(el.id || 'overlay');
        return el;
    },

    /**
     * Is an overlay on screen?
     *
     * The third of the trio, and the reason it exists: until 4.1 the intro and
     * the difficulty picker were switched with style.display while every other
     * overlay used the hidden class. An inline style covers the class but does
     * not remove it, so the difficulty picker kept its `hidden` while visible -
     * and every check asking "is it open?" answered no. Escape then fell
     * through to the bottom of its chain and opened the settings menu on top of
     * the picker.
     *
     * One encoding, asked in one place.
     */
    isOverlayOpen: function(target) {
        const el = typeof target === 'string' ? document.getElementById(target) : target;
        return !!el && !el.classList.contains('hidden');
    },

    /**
     * The windows that stand between loading the page and playing: the intro,
     * the question about an interrupted workday, and the difficulty picker.
     *
     * While any of them is up the game is not running. Hotkeys do nothing,
     * Escape does not dismiss them, and the day cannot be restarted - a restart
     * would call clearDay() and throw away the very save the resume dialog is
     * offering.
     *
     * The week's condition picker belongs here as much as the day's (6.1). It
     * was in neither list: not a startup window, and not in the Escape chain
     * either - so Escape fell through to the bottom and opened the settings on
     * top of the picker, the same way it did for the knowledge modal.
     */
    STARTUP_OVERLAYS: ['intro-modal', 'resume-modal', 'difficulty-modal', 'week-modal'],

    isStartupOverlayOpen: function() {
        return this.STARTUP_OVERLAYS.some(id => this.isOverlayOpen(id));
    },

    /**
     * `tone` names the colour of the box. Only the aggro valve wants one; the
     * written warning and the ticket jam keep the default red. It is passed
     * rather than read off the title, because the title is a dictionary entry
     * and says 'BLOW-OFF' in the other language.
     */
    showModal: function(title, text, isEnd, tone = null) {
        // One shape for the box, whoever opens it. A warning has no balance
        // sheet and no gala report, but the fields are named rather than left
        // absent, so that reading one of them somewhere never depends on which
        // function opened the window.
        this.state.modal = { open: true, title, text, isEnd: !!isEnd,
                             lead: '', cause: null, diary: null, tone,
                             balance: null, party: null };
        const overlay = document.getElementById('modal-overlay');
        this.showOverlay(overlay);
    },

    /**
     * Empties the box and hides it - without repainting.
     *
     * The state is the truth here and the overlay only carries it: since 6.1
     * components/EndModal.svelte renders off `modal.open`, so hiding the
     * container alone leaves the old screen mounted behind it. A restart did
     * exactly that, and the end screen it had just cleared away was still in
     * the state afterwards.
     *
     * Separate from closeModal() because of the repaint: a restart calls this
     * while the day it is tearing down is still in the state, and updateUI()
     * runs checkEndConditions() - which would read those dying values and queue
     * an ending for a day that is about to be replaced.
     */
    dismissModal: function() {
        this.state.modal = { open: false, title: '', text: '', isEnd: false,
                             lead: '', cause: null, diary: null,
                             balance: null, party: null };
        this.hideOverlay('modal-overlay');
    },

    closeModal: function() {
        this.dismissModal();
        this.updateUI();
    },

    /**
     * The end of a day. Unlike showModal it does not receive a finished line
     * of HTML but the parts: the closing line (lead), the cause used to
     * highlight the right value in the summary, and the diary paragraphs.
     * components/EndModal.svelte assembles the screen from those.
     */
    showEnd: function(end) {
        this.state.modal = {
            open: true,
            title: end.title,
            text: end.text ?? '',      // nothing uses this any more; a warning does
            lead: end.lead ?? '',
            cause: end.cause ?? null,
            diary: end.diary ?? null,
            isEnd: true,
            // Both of these travel on the end object and both used to be
            // dropped here. isWeek decides whether the tally counts days or
            // weeks - without it a survived week was headed "Arbeitstag Nr.".
            // isWin picks the colour of the screen, which the component used
            // to guess by looking for German words in the title.
            isWeek: end.isWeek ?? false,
            isWin: end.isWin ?? false,
            // Which level and which weekday the report belongs to. Ids, not
            // words - components/DayReport.svelte resolves them, so the header
            // follows a language switch like everything else.
            weekMode: end.weekMode ?? null,
            weekDay: end.weekDay ?? null,
            // The two blocks that used to arrive as finished HTML. Both are
            // snapshots of NUMBERS and IDS now, so the components draw them in
            // whatever language is running - and neither depends on state the
            // ending has already cleared.
            balance: end.balance ?? null,
            party: end.party ?? null
        };
        const overlay = document.getElementById('modal-overlay');
        this.showOverlay(overlay);
    },
    
    // --- EXCUSE SYSTEM ---
    // The text itself is components/ExcuseText.svelte.
    openExcuseModal: function() {
        if (this.state.excusesLeft <= 0) return;

        const modal = document.getElementById('excuse-modal');
        if (!modal) return;

        // Drawn once per event, not once per opening. Whoever closes the dialog
        // and opens it again gets the same excuse back - the texts are the
        // reward for actually fleeing, not a gallery to leaf through.
        if (!this.state.currentExcuse || this.state.excuseFor !== this.state.currentEventId) {
            this.state.currentExcuse = DB.excuses?.length
                ? { ref: { p: 'excuses', path: [Math.floor(Math.random() * DB.excuses.length)] } }
                : { k: 'excuse.fallback' };
            this.state.excuseFor = this.state.currentEventId;
        }

        this.showOverlay(modal);
    },

    closeExcuseModal: function() {
        const modal = document.getElementById('excuse-modal');
        if (modal) {
            this.hideOverlay(modal);
        }
    },

    confirmExcuse: function() {
        if (this.state.excusesLeft <= 0) {
            this.closeExcuseModal();
            return;
        }

        this.state.excusesLeft--;
        this.state.excusesUsed = (this.state.excusesUsed ?? 0) + 1;   // the diary counts lies told

        // Spent: the next event deals a new one. Without this the same text
        // would come back if the engine draws this event again later - fleeing
        // it emptied usedIDs, after all.
        this.state.excuseFor = null;
        
        if (this.state.currentEventId && this.state.usedIDs.has(this.state.currentEventId)) {
            this.state.usedIDs.delete(this.state.currentEventId);
        }
        
        this.closeExcuseModal();
        this.log({ k: 'excuse.success' }, "text-blue-400 italic");
        
        // Back to idle
        this.state.activeEvent = false;
        this.disableButtons(false);
        this.setTerminalIdle();
        
        // Was updateSteamStatus; the name is platform-neutral now because it
        // goes through platform.presence.
        this.updatePresence('system');
        this.updateUI();
    },
    
    // --- ARCHIVE UI (collection) ---
    // Contents are rendered by components/ArchiveView.svelte from
    // state.archive; this only opens the window.
    openArchive: function() {
        const modal = document.getElementById('archive-modal');
        this.showOverlay(modal);
        this.state.archiveOpen = true;
    },

    closeArchive: function() {
        this.state.archiveOpen = false;
        this.hideOverlay('archive-modal');
    },

    // --- KNOWLEDGE (compendium) ---
    // Team shows the live reputation of the seven colleagues; this shows
    // everyone else, and it is permanent. The pool is deferred, so the data
    // is fetched the first time the modal is opened.
    openKnowledge: async function() {
        await ensure('compendium');
        const modal = document.getElementById('knowledge-modal');
        this.showOverlay(modal);
        this.state.knowledgeOpen = true;
    },

    closeKnowledge: function() {
        this.state.knowledgeOpen = false;
        this.hideOverlay('knowledge-modal');
    },

    
    // --- LORE SYSTEM ---
    // The book itself is components/LoreView.svelte.
    showLoreModal: function() {
        this.state.loreOpen = true;
        this.lockScroll('lore');
    },

    closeLoreModal: function() {
        this.state.loreOpen = false;
        this.releaseScroll('lore');
    },

    // --- TEAM AND CHARACTERS ---
    // The cards are rendered by components/TeamView.svelte from
    // state.reputation; this only opens the window.
    openTeam: function() {
        const modal = document.getElementById('team-modal');
        this.showOverlay(modal);
        this.emit('openTeam');
    },

    closeTeam: function() {
        const modal = document.getElementById('team-modal');
        this.hideOverlay(modal);
        this.emit('closeTeam');
    },

    // --- INTRANET SYSTEM ---
    // Browser window and pages are components/intranet/IntranetView.svelte.
    // Until v4.0.0 this was an iframe over public/assets/intranet/, which
    // needed a hand-copied stylesheet to look like anything; inside the game
    // document the pages share the one build and the text size works through
    // rem like everywhere else.
    openIntranet: async function() {
        await ensure('intranet');
        this.buildIntranet();
        this.state.intranetOpen = true;
        this.lockScroll('intranet');
    },

    /**
     * What the intranet writes about you today.
     *
     * Rebuilt on every open, unlike the bulletin board, which draws its notes
     * once a day and keeps them. A wall is a place and should not reshuffle
     * while you are standing in front of it; a company page is a page, and a
     * page that ignores what happened an hour ago is just wrong.
     *
     * The engine picks, the components render - same split as everywhere else.
     */
    buildIntranet: function() {
        const src = DB.intranet;
        if (!src) return;

        // Drawn fresh on every visit, so a second look at the same page is not
        // the same page. What is drawn is an INDEX - the row itself is looked
        // up while the page is painted, see engine/intranet_pages.js.
        const pick = (n) => Math.floor(Math.random() * n);
        const order = (n) => [...Array(n).keys()].sort(() => Math.random() - 0.5);

        const rep = this.state.reputation ?? {};
        const flags = this.state.storyFlags ?? {};
        const stats = this.state.archive?.stats ?? {};
        const done = this.state.archive?.achievements ?? [];

        // Reputation of the seven colleagues. Müller is the player and has no
        // entry of his own, so DB.chars is not the right list here.
        const names = Object.keys(src.employee);
        const values = names.map(n => rep[n] ?? 0);
        const best = names.reduce((a, b) => ((rep[b] ?? 0) > (rep[a] ?? 0) ? b : a), names[0]);
        const average = values.reduce((a, b) => a + b, 0) / (values.length || 1);

        // Employee of the month. 20 is the FRIENDLY threshold the team view
        // uses; below it the award is not given. If the whole house is on your
        // side, the jury runs out of alternatives.
        const employee = values.every(v => v >= 20) ? { kind: 'self' }
                       : (rep[best] ?? 0) >= 20     ? { kind: 'best', name: best }
                       : { kind: 'none' };

        // Feed: everything you caused today first, filled up to four. Indices
        // into src.feed, so the row is found again in either tree.
        const reactiveIdx = src.feed.map((p, i) => [p, i])
                                    .filter(([p]) => p.reqStory && flags[p.reqStory])
                                    .map(([, i]) => i);
        const generalIdx = src.feed.map((p, i) => [p, i]).filter(([p]) => !p.reqStory).map(([, i]) => i);
        const feed = [...reactiveIdx,
                      ...order(generalIdx.length)
                          .slice(0, Math.max(2, 4 - reactiveIdx.length))
                          .map(i => generalIdx[i])].slice(0, 4);

        // Days without an incident in the server room. Zero on most days.
        // The personnel file knows nothing about modes - see careerStats().
        //
        // `this`, not the window global: engine_ui does not import the engine,
        // so this line reached for window.engine and made the whole function
        // untestable outside a browser. Every module is spread into the one
        // engine object, so `this` is the same thing - minus the global.
        const career = this.careerStats();
        const streak = career.streak;
        const incidentIdx = Math.max(0, src.incident.findIndex(i => streak >= i.min));

        // Key figure of the day. Anyone playing without a ticket counter must not
        // get it back here - the company simply withholds the figure, which is
        // exactly what it would do.
        const tickets = this.state.tickets ?? 0;
        const kpi = this.state.blindTickets
            ? { blind: true }
            : { blind: false, tickets,
                levelIdx: Math.max(0, src.kpi.levels.findIndex(l => tickets >= l.min)) };

        // The canteen plan hangs there all week; only the issue line knows the
        // time of day.
        const clock = this.state.time ?? 0;
        const service = clock < 11 * 60 + 45 ? 'before' : clock <= 13 * 60 + 15 ? 'open' : 'after';

        const dayKey = this.difficultyKey();
        // An id, not a weekday name: the canteen highlights today by
        // comparing this against the menu rows, and comparing display text
        // would simply never match in the English tree - no error, no
        // highlight, nothing to notice.
        const today = dayKey === 'easy' ? 'fri' : dayKey === 'hard' ? 'mon' : 'wed';

        // Human Capital: Müller's own file. Condition here, wording in
        // data_intranet.js - so only the KEY and the number travel.
        const notes = [];
        if (career.warningsChef)    notes.push({ key: 'warningsChef', count: career.warningsChef });
        if (career.rage)            notes.push({ key: 'rage', count: career.rage });
        if (career.ventSaves)       notes.push({ key: 'ventSaves', count: career.ventSaves });
        if (career.streakBest >= 3) notes.push({ key: 'streakBest', count: career.streakBest });
        if (career.survived)        notes.push({ key: 'survived', count: career.survived });

        // IDENTITIES ONLY - no prose past this point.
        //
        // Up to 6.1.1 this object held the finished rows out of the tree, and
        // it was built on opening and never again: a language switch changed
        // the browser frame and left three hundred lines of page text in the
        // old language. Now it says WHICH row, and components/intranet/ looks
        // the words up through tree() while it draws. A page added later is
        // safe by construction, and week-flow.test refuses any prose that
        // finds its way back in here.
        this.state.intranetData = {
            employee,
            feed,
            incident: { days: streak, idx: incidentIdx },
            visionQuote: pick(src.visions.length),
            status: order(src.status.length).slice(0, 3),
            kpi,

            chantal: {
                top: average >= 20 ? 'high' : average <= -20 ? 'low' : null,
                olderIdx: pick(src.chantal.older.length),
            },

            vision: {
                extra: done.includes('ach_wolf') ? 'boss'
                     : (rep['Dr. Wichtig'] ?? 0) >= 20 ? 'good'
                     : (rep['Dr. Wichtig'] ?? 0) <= -20 ? 'bad'
                     : null,
                note: done.includes('ach_hacker'),
            },

            sales: {
                extra: (rep['Markus'] ?? 0) >= 20 ? 'good'
                     : (rep['Markus'] ?? 0) <= -20 ? 'bad'
                     : null,
                phoenix: !!flags['path_phoenix_storno'],
            },

            kantine: { today, service, hygieneIdx: pick(src.hygiene.length), done: !!this.state.lunchDone },

            impressum: {
                version: src.impressum.baseVersion + (stats.daysStarted ?? 0),
                clauseIdx: (() => {
                    const i = src.impressum.clauses.findIndex(c => (stats.daysRageQuit ?? 0) >= c.minRage);
                    return i < 0 ? null : i;
                })(),
            },

            hr: {
                probation: Math.min(14, Math.max(1, stats.daysStarted ?? 1)),
                loyaltyIdx: Math.max(0, src.hr.loyalty.findIndex(l => average >= l.min)),
                notes,
            },
        };
    },

    closeIntranet: function() {
        this.state.intranetOpen = false;
        this.releaseScroll('intranet');
    },

    // --- BULLETIN BOARD ---
    /**
     * The community board.
     *
     * Draws today's notes on first open: a handful of general ones plus every
     * reactive note whose story flag the player has actually tripped. Those
     * come first - a wall that comments on this morning is worth more than one
     * that repeats itself.
     */
    openBoard: async function() {
        await ensure('board');
        const pool = DB.board ?? [];

        if (!this.state.boardNotes?.length && pool.length) {
            const flags = this.state.storyFlags ?? {};
            // Story flags survive the night in week mode. Without shuffling
            // and a cap, the same reactions stayed pinned for five days and
            // crowded out the general notes along the way. Four reactive ones
            // are plenty; the rest get their turn tomorrow.
            const reactive = pool.filter(n => n.reqStory && flags[n.reqStory])
                                 .sort(() => Math.random() - 0.5)
                                 .slice(0, 4);
            const general = pool.filter(n => !n.reqStory)
                                .sort(() => Math.random() - 0.5)
                                .slice(0, Math.max(4, 8 - reactive.length));
            // Ids only - components/BoardView.svelte reads the notes back out
            // of the tree, so the wall follows a language switch.
            this.state.boardNotes = [...reactive, ...general].map(n => n.id);
        }

        this.showOverlay('board-modal', false);
    },

    closeBoard: function() {
        const modal = document.getElementById('board-modal');
        this.hideOverlay(modal);
    },

    // --- VISUAL FEEDBACK (floating text) ---
    showFloatingText: function(elementId, value) {
        if (value === 0) return; // Show nothing at 0

        const target = document.getElementById(elementId);
        if (!target) return;

        // 1. Create the element (prefixed with + or -)
        const floatEl = document.createElement('div');
        const sign = value > 0 ? '+' : '';
        floatEl.innerText = `${sign}${value}`;
        
        // --- BLIND RUN CHECK ---
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
            // Aggro is always orange
            color = 'text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]';
        } else if (elementId === 'val-cr') {
            // Boss radar is always red
            color = 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]';
        }

        // Starting state. Deliberately slow at 3000ms so the item is readable
        // on its way into the backpack.
        floatEl.className = `fixed font-normal text-xl z-9999 pointer-events-none transition-all duration-3000 ease-out ${color}`;

        // 3. Work out the start position
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
    
    /**
     * The startup log. In week mode this runs FIVE times per week, so a fixed
     * block of nine lines would be almost half a minute of identical text.
     * Two things follow from that: from the second morning on the sequence is
     * short, and the middle lines report the actual situation instead of
     * decorating it - carried tickets, yesterday's radar, what is in the
     * backpack. The startup screen becomes the briefing it was standing in
     * front of.
     *
     * Only state that is definitely settled at this point is read. Draw
     * budgets are computed lazily on the first draw of the day and would
     * trigger data loading here, so they stay out.
     */
    buildBootLines: function() {
        const w = this.state.week;
        const day = w?.active ? w.dayIndex : 0;
        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
        // Two draws from the same pool must not return the same line, which a
        // plain pick() does often enough to notice.
        const pickTwo = (arr) => {
            const a = Math.floor(Math.random() * arr.length);
            let b = Math.floor(Math.random() * (arr.length - 1));
            if (b >= a) b++;
            return [arr[a], arr[b]];
        };

        // Situation lines - WEEK MODE ONLY. A workday always starts clean at the
        // chosen difficulty, and nothing is carried over; on top of that the day
        // restart plays this sequence BEFORE reset(), so the state still belongs
        // to the day that just ended. Reporting any of it would both be wrong
        // and suggest a carry-over that does not exist.
        const carryOver = [];
        if (w?.active && day >= 2) {
            // Only from Tuesday on is there anything to carry: Monday's numbers
            // are the starting condition of the chosen level, not a leftover,
            // and a week restart puts the player back exactly there. Calling
            // that an "Übertrag" would report a carry-over that never happened.
            if (this.state.tickets > 0)
                carryOver.push(tf('boot.carry.tickets', { tickets: this.state.tickets }));
            if (this.state.cr >= 30)
                carryOver.push(tf('boot.carry.radar', { value: this.state.cr }));
            if (this.state.al >= 40)
                carryOver.push(tf('boot.carry.aggro', { value: this.state.al }));

            const items = this.state.inventory?.length ?? 0;
            if (items > 0)
                carryOver.push(tf(items === 1 ? 'boot.carry.itemOne' : 'boot.carry.itemMany', { items }));
            if (day < 5)
                carryOver.push(tf('boot.carry.daysLeft', { days: 5 - day }));
            // Friday's meeting outranks everything else that could be reported.
            if (day === 5)
                carryOver.unshift(t('boot.meeting'));
        } else if (w?.active && day === 1) {
            // Monday states the starting condition instead - true both for a
            // fresh week and for a restart over the settings.
            const cfg = WEEK_DIFFS[w.level];
            if (cfg) carryOver.push(tf('boot.startCondition', { mode: t(`week.diff.${cfg.key}`).toUpperCase() }));
            carryOver.push(t('boot.fiveDays'));
        }

        // Flavour, drawn fresh each time so no two mornings read alike.
        const flavour = [
            t('boot.coffee'),
            tf('boot.excuseDb', { module: 12 + Math.floor(Math.random() * 60) }),
            tf('boot.ignoring', { count: (3200 + Math.floor(Math.random() * 2600)).toLocaleString(language()) }),
            t('boot.serverRoom'),
            t('boot.printers'),
            t('boot.licences'),
            t('boot.values'),
            t('boot.calendar'),
            t('boot.backup')
        ];

        // From the second morning on, the greeting is dropped: the header with
        // company and copyright is a welcome, not a daily bulletin.
        if (day > 1) {
            const head = [tf('boot.headDay', { day: this.weekDayName?.() ?? t('boot.newDay') })];
            const middle = carryOver.length ? carryOver.slice(0, 2) : [pick(flavour)];
            return [...head, ...middle, t('boot.ready')];
        }

        return [
            `GlobalCorp OS - Version ${this.VERSION}`,
            `Copyright (c) 1999-2026 GlobalCorp International Synergy GmbH & Co. KGaA`,
            `----------------------------------------------`,
            ...pickTwo(flavour),
            ...carryOver.slice(0, 2),
            t('boot.init')
        ];
    },

    playBootSequence: function(callback) {
        this.playAudio('boot');
        this.state.activeEvent = true;
        this.disableButtons(true);

        // Softer than the classic terminal green, still retro
        this.state.bootLines = [];
        this._setTerminal('flex-1 flex flex-col items-start justify-center p-8 w-full min-h-full bg-slate-950 text-emerald-400 font-mono text-sm md:text-base overflow-hidden border border-slate-800 rounded-xl shadow-inner', { mode: 'boot' });

        const bootLines = this.buildBootLines();

        let i = 0;
        
        // Every step stores its handle in state.bootTimer (registered in
        // DAY_TIMERS): unregistered, the chain could not be stopped - a
        // restart during the boot animation ran two chains at once,
        // interleaving their lines and ending in a double reset().
        const printLine = () => {
            if (i < bootLines.length) {
                this.state.bootLines.push(bootLines[i]);
                i++;
                // Between 300 and 600 milliseconds per line
                this.state.bootTimer = setTimeout(printLine, 300 + Math.random() * 300);
            } else {
                // Hold for 1.5 seconds so the last line can be read
                this.state.bootTimer = setTimeout(() => {
                    this.state.bootTimer = null;
                    this.state.activeEvent = false;
                    this.disableButtons(false);
                    if (callback) callback();
                }, 1500);
            }
        };

        printLine();
    },
    
    // --- SAVEGAME UI HELPERS ---
    // Careful: these are called as engine.ui.openExportModal(), so `this` is
    // this nested object and not the engine. The overlay helpers have to be
    // reached through `engine` - this.showOverlay() silently threw and the
    // dialog simply never opened.
    ui: {
        // Opens the export dialog
        openExportModal: function() {
            const modal = document.getElementById('save-export-modal');
            const area = document.getElementById('export-area');
            const msg = document.getElementById('export-msg');
            
            // Generate the code
            const code = engine.exportSaveGame();
            // exportSaveGame() returns null when it throws, and the player
            // reads whatever lands in the textarea - so this one is a label,
            // not a developer message.
            area.value = code || t('export.buildFailed');
            msg.style.opacity = '0'; // Reset Message

            engine.showOverlay(modal);
        },

        // Opens the import dialog
        openImportModal: function() {
            const modal = document.getElementById('save-import-modal');
            const area = document.getElementById('import-area');
            const msg = document.getElementById('import-msg');

            area.value = ""; // Leeren
            msg.style.opacity = '0'; 
            msg.innerText = "";

            engine.showOverlay(modal);
        },

        // Closes both dialogs
        closeModals: function() {
            engine.hideOverlay('save-export-modal');
            engine.hideOverlay('save-import-modal');
        },

        // Kopier-Funktion
        copyToClipboard: function() {
            const area = document.getElementById('export-area');
            const msg = document.getElementById('export-msg');

            area.select();
            area.setSelectionRange(0, 99999); 

            navigator.clipboard.writeText(area.value).then(() => {
                msg.innerText = t('export.copied');
                msg.className = "text-xs text-green-500 font-bold transition-opacity";
                msg.style.opacity = '1';
                setTimeout(() => { msg.style.opacity = '0'; }, 2000);
            }).catch(err => {
                msg.innerText = t('export.copyFailed');
                msg.className = "text-xs text-red-500 font-bold transition-opacity";
                msg.style.opacity = '1';
            });
        },

        // Import function (robust, and fixed)
        performImport: function() {
            const area = document.getElementById('import-area');
            const msg = document.getElementById('import-msg');
            
            // 1. Trim whitespace and strip invisible characters
            let code = area.value.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');

            if (!code) {
                msg.innerText = t('export.empty');
                msg.className = "text-xs text-red-500 font-bold transition-opacity";
                msg.style.opacity = '1';
                return;
            }

            try {
                let base64, checksum;

                // 2. STRATEGY: split at '--' (new format)
                if (code.includes('--')) {
                    const parts = code.split('--');
                    base64 = parts[0];
                    checksum = parts[1];
                } 
                // 3. FALLBACK: split at the last '-' (old format, or hand-edited)
                else if (code.includes('-')) {
                    const lastDash = code.lastIndexOf('-');
                    base64 = code.substring(0, lastDash);
                    checksum = code.substring(lastDash + 1);
                } else {
                    throw new Error(t('import.badFormat'));
                }

                // Verify the checksum
                const calcedSum = engine.calculateChecksum(base64);
                if (calcedSum !== checksum) {
                    console.error("Checksum Mismatch:", calcedSum, "vs", checksum);
                    throw new Error(t('import.badChecksum'));
                }

                // Decoding
                const jsonString = decodeURIComponent(atob(base64).split('').map(c => 
                    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                ).join(''));

                const data = JSON.parse(jsonString);

                // Validation
                if (!data.arc || !Array.isArray(data.arc.items)) {
                    // Never reaches the player: the catch below logs this and
                    // shows import.unreadable instead. A console message, so
                    // it speaks English like its neighbours.
                    throw new Error("Malformed data structure.");
                }

                // --- SAFE MERGE ---
                // Start from the current archive template
                const currentTemplate = JSON.parse(JSON.stringify(engine.state.archive));
                // Merge the imported save into it without losing new fields
                const mergedArchive = engine.deepMerge(currentTemplate, data.arc);

                // Save the repaired and merged archive
                localStorage.setItem(engine.KEYS.archive, JSON.stringify(mergedArchive));

                // Only ever raise the tutorial flag, never lower it.
                // data.tut is the STRING "false" for players who skipped the
                // tutorial, and a non-empty string is truthy — a plain
                // `if (data.tut)` would reset the flag on every import.
                if (data.tut === 'true') localStorage.setItem(engine.KEYS.tutorialDone, 'true');

                // Any of the three 6.1 fields means the evening was seen; one
                // flag carries it now. See engine_core.partyInvitation().
                if (data.party === 'true' || data.party_easy === 'true' ||
                    data.party_normal === 'true' || data.party_hard === 'true') {
                    localStorage.setItem(engine.KEYS.partyPlayed, 'true');
                }

                // Same reason as in the hard reset: a running run belongs to
                // the save that was just replaced. Resuming it would mix the
                // imported archive with the reputation of a foreign workday -
                // and a whole week would drag four of them along.
                engine.clearDay();
                engine.clearWeek();

                msg.innerText = t('import.accepted');
                msg.className = "text-xs text-green-500 font-bold transition-opacity";
                msg.style.opacity = '1';

                setTimeout(() => location.reload(), 800);

            } catch (e) {
                console.error(e);
                msg.innerText = t('import.unreadable');
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
        this.showOverlay(modal);

        this.state.globalStats = { data: null, loading: true, failed: false };
        platform.globalStats()
            .then(data => { this.state.globalStats = { data, loading: false, failed: false }; })
            .catch(() => { this.state.globalStats = { data: null, loading: false, failed: true }; });
    },

    closeGlobalStats: function() {
        const modal = document.getElementById('global-stats-modal');
        if (!modal) return;
        this.hideOverlay(modal);
    },

    triggerHardReset: function(btn) {
        if (btn.dataset.armed === "true") {
            // Step 2: execute.
            //
            // The tombstone comes FIRST, because the payload below reads it.
            // Emptying the cloud is not enough since the union rewrite:
            // "empty" reads as "nothing to add", the other machine kept its
            // full archive, uploaded it, and the next launch here brought the
            // career back - the button deleted nothing, politely. The
            // timestamp travels with every payload from now on, and each
            // machine applies it exactly once (engine_core.adoptCloudReset).
            localStorage.setItem(KEYS.resetSeenAt, String(Date.now()));

            // One routine for the wipe, shared with the machine on the OTHER
            // side of the tombstone. PROGRESS_KEYS is the single list of what
            // a reset removes; settings, audio and key bindings survive on
            // purpose - a reset wipes the save, not the preferences of the
            // person in front of the screen.
            engine.wipeProgress();

            // The in-memory archive too, and out of the one factory: the
            // hand-built literal that stood here dropped seenEvents,
            // seenFlags, knowledgeRead and the chronicle - harmless only
            // because every reader guards, and exactly the hand-kept-list
            // mistake PROGRESS_KEYS was invented against.
            engine.state.archive = freshArchive();
            engine.state.defaultDiff = 'ask';
            engine.state.defaultWeekDiff = 'ask';

            // platform.save is fire-and-forget by contract, so the push is
            // given a head start but not the power to block: the reload waits
            // for it OR four seconds, whichever ends first. Before this it
            // raced a one-second timer and usually won - usually.
            const pushed = Promise.resolve(platform.save(engine.buildCloudPayload()))
                .catch(() => { /* the local wipe stands either way */ });

            const textSpan = btn.querySelector('#text-hard-reset');
            textSpan.innerText = t('settings.hardReset.restarting');
            
            btn.className = "w-full text-left px-4 py-3 bg-red-600 border border-red-500 rounded-lg text-white text-sm font-bold flex justify-center items-center mt-2 shadow-md";
            
            setTimeout(() => {
                Promise.race([pushed, new Promise(r => setTimeout(r, 4000))])
                    .then(() => location.reload());
            }, 1000);
        } else {
            // Step 1: arm it.
            btn.dataset.armed = "true";
            const textSpan = btn.querySelector('#text-hard-reset');
            const iconSpan = btn.querySelector('#icon-hard-reset');
            
            textSpan.innerText = t('settings.hardReset.confirm');
            iconSpan.className = "shrink-0"; 
            
            btn.className = "w-full relative z-10 text-left px-4 py-3 mt-1 bg-red-950/50 border border-red-500 rounded-lg transition-all flex items-center gap-3 animate-pulse shadow-xs";
            
            setTimeout(() => {
                if(btn.dataset.armed === "true") {
                    btn.dataset.armed = "false";
                    textSpan.innerText = t('settings.hardReset.short');
                    iconSpan.className = "text-base grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all";
                    btn.className = "w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-500 rounded-lg transition-all text-red-400 text-sm font-medium flex items-center gap-3 group shadow-xs";
                }
            }, 4000);
        }
    },
    
    // The seventeen controls used to be refreshed from here, one
    // getElementById per option. They now read the state themselves in
    // components/SettingsView.svelte, so opening the dialog no longer has to
    // copy anything into the DOM.
    openSettings: function() {
        const modal = document.getElementById('settings-modal');

        // --- Soft reset button, greyed out while the game is still starting ---
        const softResetBtn = document.getElementById('btn-soft-reset');

        if (softResetBtn) {
            const isTutorialActive = !!this.lesson?.isActive;
            const locked = this.isStartupOverlayOpen() || isTutorialActive;

            softResetBtn.classList.toggle('opacity-40', locked);
            softResetBtn.classList.toggle('pointer-events-none', locked);
            softResetBtn.classList.toggle('grayscale', locked);
            softResetBtn.disabled = locked;

        }
        // -------------------------------------------------------------

        this.dressResetButtons();

        const mainView = document.getElementById('menu-main-view');
        const settingsView = document.getElementById('menu-settings-view');
        const title = document.getElementById('settings-title');
        
        if (mainView && settingsView && title) {
            mainView.classList.remove('hidden');
            settingsView.classList.add('hidden');
            title.innerText = t('settings.title');
        }

        this.showOverlay(modal);
    },
    
    closeSettings: function() {
        const modal = document.getElementById('settings-modal');
        this.hideOverlay(modal);
    },

    toggleFX: function(isOn) {
        this.state.visualFX = isOn;
        localStorage.setItem(KEYS.visualFX, isOn);
        this.updateUI();
    },
    
    toggleShake: function(isOn) {
        this.state.screenShake = isOn;
        localStorage.setItem(KEYS.screenShake, isOn);
    },
    
    toggleOneClick: function(isOn) {
        this.state.oneClickItem = isOn;
        localStorage.setItem(KEYS.oneClickItem, isOn);
    },
    toggleFastChat: function(isOn) {
        this.state.fastChat = isOn;
        localStorage.setItem(KEYS.fastChat, isOn);
    },
    toggleBlindStats: function(isOn) {
        this.state.blindStats = isOn;
        localStorage.setItem(KEYS.blindStats, isOn);
        // Changing the readouts mid-day means the run was not played blind.
        this.state.blindRun = false;
        this.updateUI();
    },
    toggleBlindTickets: function(isOn) {
        this.state.blindTickets = isOn;
        localStorage.setItem(KEYS.blindTickets, isOn);
        // Changing the readouts mid-day means the run was not played blind.
        this.state.blindRun = false;
        this.updateUI();
    },
    toggleAudio: function(isOn) {
        this.state.audioEffects = isOn;
        localStorage.setItem(KEYS.audioEffects, isOn);
        if(isOn) this.playAudio('ui');
    },
	toggleShowHotkeys: function(isOn) {
        this.state.showHotkeys = isOn;
        localStorage.setItem(KEYS.showHotkeys, isOn);
    },
	    
    toggleAutoHidePhone: function(isOn) {
        this.state.autoHidePhone = isOn;
        localStorage.setItem(KEYS.autoHidePhone, isOn);
        this.updatePhoneVisibility();
    },
    
    /**
     * Text size for the game content. This game is largely something to read,
     * so anyone who wants the event texts bigger should be able to have that
     * without zooming the whole browser. The classes live in app.css.
     */
    setTextSize: function(size) {
        const SIZES = ['normal', 'large', 'xlarge'];
        const value = SIZES.includes(size) ? size : 'normal';
        this.state.textSize = value;
        localStorage.setItem(KEYS.textSize, value);
        // On <html>, not <body>: the rule changes the root font size that
        // every rem value refers to.
        document.documentElement.classList.remove('text-size-large', 'text-size-xlarge');
        if (value !== 'normal') document.documentElement.classList.add('text-size-' + value);
        if (this.playAudio) this.playAudio('ui');
    },

    /**
     * Resets every option on the settings page to factory state.
     *
     * Deliberately WITHOUT reloading the page: the workday carries on, and a
     * reload would destroy it. Instead every value goes through the regular
     * setters, which update state, storage and interface together. Also
     * deliberately without a browser dialog - in the Steam build a confirm()
     * would be a foreign object; the question is asked on the button itself.
     *
     * Untouched: the save, the archive, achievements and the running day.
     */
    resetSettings: function() {
        // Display & layout
        this.setTextSize('normal');
        this.toggleCompactMode(false);
        this.toggleAutoHidePhone(false);
        this.toggleFX(true);
        this.toggleShake(true);
        this.toggleFastChat(false);
        this.toggleScanlines(true);

        // Gameplay
        this.saveDefaultDifficulty('ask');
        this.toggleOneClick(false);
        this.toggleAutoChart(false);

        // Challenge
        this.toggleBlindStats(false);
        this.toggleBlindTickets(false);

        // Audio
        this.toggleAudio(true);
        this.setVolume(0.5);
        this.toggleMusic(true);
        this.setMusicVolume(0.2);
        this.changeMusicStyle('radio');

        // Keyboard: bindings and the key cap hints
        this.resetKeybinds();
        this.toggleShowHotkeys(!window.matchMedia('(pointer: coarse)').matches);

        this.playAudio('ui');
    },

    /**
     * Two-step confirmation on the button itself instead of a browser dialog.
     * The first click asks, the second acts; after five seconds without an
     * answer the button returns to its resting state.
     *
     * Only the flag is set here. What the button then says and how it looks is
     * decided in components/SettingsView.svelte - the same division of labour
     * as flashBinding() and the key bindings.
     */
    confirmResetSettings: function() {
        clearTimeout(this._resetArmTimer);

        if (this.state.settingsResetArmed) {
            this.state.settingsResetArmed = false;
            this.resetSettings();
            return;
        }

        this.state.settingsResetArmed = true;
        this.playAudio('ui');

        this._resetArmTimer = setTimeout(() => {
            this.state.settingsResetArmed = false;
        }, 5000);
    },

    /**
     * The terminal's screen texture (scanlines and glow). Anyone who finds it
     * restless gets a flat surface instead.
     */
    toggleScanlines: function(isOn) {
        this.state.scanlines = isOn;
        localStorage.setItem(KEYS.scanlines, isOn);
        document.body.classList.toggle('no-scanlines', !isOn);
    },

    /**
     * Opens the day curve on the end screen straight away instead of leaving
     * it behind a button. For everyone who looks every time anyway.
     */
    toggleAutoChart: function(isOn) {
        this.state.autoChart = isOn;
        localStorage.setItem(KEYS.autoChart, isOn);
    },

    toggleCompactMode: function(isOn) {
        this.state.compactMode = isOn;
        localStorage.setItem(KEYS.compactMode, isOn);
        if (isOn) {
            document.body.classList.add('compact-mode');
        } else {
            document.body.classList.remove('compact-mode');
        }
    },
    
    /**
     * Which weekday is preselected at startup.
     *
     * Deliberately without a log entry. The activity log is the record of the
     * workday - what happened at the desk - and a setting is not part of it.
     * No other setter writes there either, and the entry said "HARD" in a game
     * that speaks German. The dropdown shows the choice; that is the feedback.
     */
    saveDefaultDifficulty: function(val) {
        this.state.defaultDiff = val;
        localStorage.setItem(engine.KEYS.defaultDiff, val);
        this.playAudio('ui');
    },

    /** The same for the week mode; see the note in engine_state. */
    saveDefaultWeekDifficulty: function(val) {
        this.state.defaultWeekDiff = val;
        localStorage.setItem(engine.KEYS.defaultWeekDiff, val);
        this.playAudio('ui');
    },

    shareGame: function(btn) {
        // Desktop hands out the store page, the browser its own URL.
        const shareUrl = platform.shareUrl();

        const shareData = {
            title: t('settings.share.title'),
            text: t('settings.share.text'),
            url: shareUrl
        };
        
        const textSpan = btn.querySelector('#text-share') || btn;
        const originalText = textSpan.innerText;

        if (navigator.share) {
            navigator.share(shareData).catch(() => { /* The person closed the share dialog - not an error. */ });
        } else {
            navigator.clipboard.writeText(shareUrl).then(() => {
                textSpan.innerText = t('settings.share.copied');
                btn.classList.add('bg-green-900/30!', 'border-green-500!', 'text-green-400!');
                
                setTimeout(() => {
                    textSpan.innerText = originalText;
                    btn.classList.remove('bg-green-900/30!', 'border-green-500!', 'text-green-400!');
                }, 3000);
            }).catch(() => {
                textSpan.innerText = t('settings.share.failed');
                textSpan.classList.add('text-red-400');
                setTimeout(() => {
                    textSpan.innerText = originalText;
                    textSpan.classList.remove('text-red-400');
                }, 3000);
            });
        }
    },
    
    // --- KEYBINDING FUNCTIONS ---
    startBindingKey: function(action) {
        if (this.state.isBindingKey) return;

        this.state.isBindingKey = true;
        this.state.actionToBind = action;
        this.state.bindFlash = null;
        // Away from the button, or the next key press would count as a click
        // on it as well.
        document.activeElement?.blur?.();
    },

    /** Turns a binding button red for a moment: taken, or reserved. */
    flashBinding: function(action, reserved = false) {
        this.state.bindFlash = action;
        this.state.bindFlashReserved = reserved;
        clearTimeout(this._bindFlashTimer);
        this._bindFlashTimer = setTimeout(() => {
            this.state.bindFlash = null;
            this.state.bindFlashReserved = false;
        }, reserved ? 800 : 500);
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
            return;
        }

        // 4, 5 and 6 belong to the fixed slots and cannot be reassigned.
        if (hardcodedKeys.includes(pressedKey)) {
            this.flashBinding(this.state.actionToBind, true);
            return; // reject the key but stay in binding mode
        }

        // A key can only do one thing: point at whoever holds it already.
        for (let act in this.state.keyBinds) {
            if (this.state.keyBinds[act].toLowerCase() === pressedKey.toLowerCase() && act !== this.state.actionToBind) {
                this.flashBinding(act);
                return;
            }
        }

        // 3. Saved successfully
        this.state.keyBinds[this.state.actionToBind] = pressedKey;
        this.state.isBindingKey = false;
        this.state.actionToBind = null;
        this.saveSystem();
    },

    openKeybinds: function() {
        this.showOverlay('keybind-modal');
    },

    closeKeybinds: function() {
        this.state.isBindingKey = false;
        this.hideOverlay('keybind-modal');
    },
    
    resetKeybinds: function() {
        // Restore the defaults
        this.state.keyBinds = { actCoffee: 'q', actQuest: 'w', actServer: 'e', actCall: 'r', opt1: '1', opt2: '2', opt3: '3', confirm: 'Space' };
        this.state.isBindingKey = false;
        this.state.actionToBind = null;
        
        this.saveSystem();
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
	
    // --- RENDER THE VISUAL HOTKEYS ---
    // --- REPORT SYSTEM ---

    openReportModal: function() {
        const modal = document.getElementById('report-modal');
        this.showOverlay(modal);
    },

    closeReportModal: function() {
        const modal = document.getElementById('report-modal');
        this.hideOverlay(modal);
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

            // --- READ INPUTS ---
            // The category is an identifier, not prose: index.html carries the
            // German words as option VALUES, and data-i18n only ever replaces
            // an element's text - so this field reaches the ticket in German
            // whichever language is being played. The fallback belongs to that
            // same family and stays with it, GLOSSAR 1.
            const catVal = document.getElementById('report-category')?.value || "Unbekannt";
            const descVal = document.getElementById('report-desc')?.value || "";

            // Catch an empty description (optional, but worth it)
            if (descVal.trim() === "") {
                alert(t('report.needDescription'));
                return;
            }

            // --- STATE DATA ---
            //
            // Everything from here to the end of logData is the diagnostic
            // block. It travels in the ticket and is read by the maintainer,
            // never shown on screen - so it stays in ONE language rather than
            // following the player's. English, because it is a log: GLOSSAR 2a
            // puts machine output in English, and it keeps every ticket
            // greppable no matter who filed it. Nothing here goes through t().
            const s = this.state || {};
            const min = s.time || 480;
            const prettyTime = formatClock(min);
            // inventory holds objects, not ids - joining it straight produced
            // a list of [object Object] in every report so far.
            const invList = s.inventory?.length ? s.inventory.map(i => i.id).join(", ") : "(empty)";
            // There is no state.difficulty - the value is difficultyMult, so
            // every report claimed "Normal" regardless of the day chosen. The
            // identifier, not the label: engine_core reads the same three
            // words off partyInvitation(), and a translated name here would
            // make the ticket depend on the reporter's language.
            const diff = s.difficultyMult < 1.0 ? "easy"
                       : s.difficultyMult > 1.0 ? "hard"
                       : "normal";

            // --- FIND THE LAST EVENT ---
            // activeEvent is a BOOLEAN; the id lives in currentEventId - the
            // old `s.activeEvent?.id` could never match, so the one fact a
            // reporter is on (which event broke) never reached the ticket.
            let lastEventID = "no data";
            if (s.currentPhoneEvent?.id) lastEventID = s.currentPhoneEvent.id + " (phone)";
            else if (s.currentEventId) lastEventID = s.currentEventId + (s.activeEvent ? " (active)" : " (last)");
            else if (s.storyFlags && Object.keys(s.storyFlags).length > 0) {
                const flags = Object.keys(s.storyFlags);
                lastEventID = flags[flags.length - 1] + " (last flag)";
            }

            // --- LOG FEED (last 600 characters) ---
            let logText = "(log empty)";

            if (this.state.logEntries.length > 0) {
                // Through the resolver, not e.msg: since the recipe conversion
                // an entry stores {k,v}/{ref} and no msg, so the report's log
                // block was a chain of "undefined" - the maintainer's main
                // diagnostic channel, empty.
                let rawText = [...this.state.logEntries].reverse()
                    .map(e => `[${e.time}] ${renderRecipe(e) ?? ''}`).join(" // ");
                if (rawText.length > 2000) rawText = rawText.substring(0, 2000) + "...";
                logText = rawText;
            }

            // --- ASSEMBLE ---
            const logData = 
`=== STATUS ===
📍 Event:     ${lastEventID}
🕒 Time:      ${prettyTime}
💀 Diff:      ${diff}
📊 Stats:     F ${s.fl || 0}% | A ${s.al || 0}% | C ${s.cr || 0}%
🎒 Inv:       ${invList}
--- LOG FEED (LATEST ENTRIES) ---
${logText}
=====================`;

            // --- UI FEEDBACK START (button state) ---
            const sendBtn = document.querySelector('#report-modal button.bg-blue-600');
            let originalText = "";
            if (sendBtn) {
                originalText = sendBtn.innerHTML;
                sendBtn.innerHTML = `<span>⏳</span> ${t('report.sending')}`;
                sendBtn.disabled = true;
                sendBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }

            // --- BUILD THE PAYLOAD ---
            const formData = new URLSearchParams();
            formData.append(IDS.cat, catVal);
            formData.append(IDS.desc, descVal);
            formData.append(IDS.debug, logData);

            // --- Silent POST via no-cors: the response is opaque, which is fine ---
            fetch(FORM_URL, {
                method: 'POST',
                mode: 'no-cors', // Prevents browser security blocks
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            }).then(() => {
                // UI Erfolgsmeldung
                if (sendBtn) {
                    sendBtn.innerHTML = `<span>✅</span> ${t('report.sent')}`;
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
                alert(t('report.sendFailed'));
                if (sendBtn) {
                    sendBtn.innerHTML = originalText;
                    sendBtn.disabled = false;
                    sendBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            });

        } catch (e) {
            console.error("Report Error:", e);
            alert(t('report.unexpectedError'));
        }
    },

};
