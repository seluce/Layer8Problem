import { KEYS } from './keys.js';
import { DB, ensure } from '../data.js';
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
        if (!this.state.activeNewsText) return;

        if (this.state.newsTimer) clearTimeout(this.state.newsTimer);
        this.state.newsTimer = setTimeout(() => {
            this.state.activeNewsText = null;
        }, this.newsDuration(this.state.activeNewsText));
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
    /**
     * Interstitial notice (warning, valve): a title and one line of text.
     * The end of a day goes through showEnd and carries structured fields.
     */

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
        if (lockScroll) document.body.classList.add('overflow-hidden');
        return el;
    },

    /** Counterpart to showOverlay. */
    hideOverlay: function(target, unlockScroll = true) {
        const el = typeof target === 'string' ? document.getElementById(target) : target;
        if (!el) return null;
        el.classList.add('hidden');
        el.classList.remove('flex');
        if (unlockScroll) document.body.classList.remove('overflow-hidden');
        return el;
    },

    showModal: function(title, text, isEnd) {
        this.state.modal = { open: true, title, text, isEnd: !!isEnd,
                             lead: '', cause: null, diary: null };
        const overlay = document.getElementById('modal-overlay');
        this.showOverlay(overlay);
    },

    closeModal: function() {
        this.state.modal = { open: false, title: '', text: '', isEnd: false,
                             lead: '', cause: null, diary: null };
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('modal-overlay').classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
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
            text: end.text ?? '',      // only the party still uses free text
            lead: end.lead ?? '',
            cause: end.cause ?? null,
            diary: end.diary ?? null,
            isEnd: true
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

        this.state.currentExcuse = DB.excuses?.length
            ? DB.excuses[Math.floor(Math.random() * DB.excuses.length)]
            : "Sorry, mein Router hat einen schlechten Tag.";

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
        
        if (this.state.currentEventId && this.state.usedIDs.has(this.state.currentEventId)) {
            this.state.usedIDs.delete(this.state.currentEventId);
        }
        
        this.closeExcuseModal();
        this.log("Ausrede erfolgreich! Du bist entkommen.", "text-blue-400 italic");
        
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
        document.getElementById('archive-modal').classList.add('hidden');
        document.getElementById('archive-modal').classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    },
    
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

    // --- TEAM AND CHARACTERS ---
    // The cards are rendered by components/TeamView.svelte from
    // state.reputation; this only opens the window.
    openTeam: function() {
        const modal = document.getElementById('team-modal');
        this.showOverlay(modal);
    },

    closeTeam: function() {
        const modal = document.getElementById('team-modal');
        this.hideOverlay(modal);
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
        document.body.classList.add('overflow-hidden');
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
        let employee;
        if (values.every(v => v >= 20)) {
            employee = { ...src.employeeSelf, self: true };
        } else if ((rep[best] ?? 0) >= 20) {
            employee = { name: best, ...src.employee[best] };
        } else {
            employee = { name: src.employeeNone.title, role: '', reason: src.employeeNone.reason, none: true };
        }

        // Feed: everything you caused today first, filled up to four.
        const reactive = src.feed.filter(p => p.reqStory && flags[p.reqStory]);
        const general = src.feed.filter(p => !p.reqStory)
                                .sort(() => Math.random() - 0.5)
                                .slice(0, Math.max(2, 4 - reactive.length));
        const feed = [...reactive, ...general].slice(0, 4);

        // Days without an incident in the server room. Zero on most days.
        const streak = stats.streak ?? 0;
        const incident = src.incident.find(i => streak >= i.min) ?? src.incident.at(-1);

        // Everything drawn fresh on every visit, so a second look at the same
        // page is not the same page.
        const draw = (pool) => pool[Math.floor(Math.random() * pool.length)];

        // Key figure of the day. Anyone playing without a ticket counter must not
        // get it back here - the company simply withholds the figure, which is
        // exactly what it would do.
        const tickets = this.state.tickets ?? 0;
        const kpi = this.state.blindTickets
            ? { value: src.kpi.blind.value, text: src.kpi.blind.text }
            : { value: String(tickets), text: (src.kpi.levels.find(l => tickets >= l.min) ?? src.kpi.levels.at(-1)).text };

        // The canteen plan hangs there all week; only the issue line knows the
        // time of day.
        const t = this.state.time ?? 0;
        const service = { ...(t < 11 * 60 + 45 ? src.service.before
                            : t <= 13 * 60 + 15 ? src.service.open
                            : src.service.after) };

        const dayKey = this.difficultyKey();
        const today = dayKey === 'easy' ? 'Freitag' : dayKey === 'hard' ? 'Montag' : 'Mittwoch';

        // Human Capital: Müller's own file.
        const loyalty = src.hr.loyalty.find(l => average >= l.min) ?? src.hr.loyalty.at(-1);
        const notes = [];
        const push = (tone, title, text) => notes.push({ tone, title, text });

        if (stats.warningsChef)
            push('bad', `Abmahnungen: ${stats.warningsChef}`,
                 'Sämtlich mündlich ausgesprochen und nachträglich schriftlich vermerkt. Ein Widerspruch ist nicht eingegangen, da über die Vermerke nicht informiert wurde.');
        if (stats.daysRageQuit)
            push('bad', `Unentschuldigtes Verlassen des Arbeitsplatzes: ${stats.daysRageQuit}`,
                 'Der Mitarbeiter hat das Gebäude vor Dienstschluss verlassen, ohne sich abzumelden. In allen Fällen war er am Folgetag pünktlich wieder anwesend, was die Personalabteilung als Reue wertet.');
        if (stats.ventSaves)
            push('neutral', `Programm "Achtsamkeit im Kabelkanal": ${stats.ventSaves} Teilnahmen`,
                 'Der Mitarbeiter hat wiederholt von der betrieblichen Möglichkeit Gebrauch gemacht, sich vor einer Eskalation kurz zurückzuziehen. Die Maßnahme gilt damit als wirksam und wird nicht ausgebaut.');
        if ((stats.streakBest ?? 0) >= 3)
            push('good', `Längste Phase ohne Zwischenfall: ${stats.streakBest} Arbeitstage`,
                 'Ein auffällig ruhiger Zeitraum. Die Personalabteilung prüft, ob in dieser Phase eine Unterauslastung vorlag.');
        if (stats.daysSurvived)
            push('good', `Regulär beendete Arbeitstage: ${stats.daysSurvived}`,
                 'Der Mitarbeiter hat das Gebäude an diesen Tagen zur vorgesehenen Zeit verlassen. Eine gesonderte Würdigung ist nicht vorgesehen, da dies dem Vertrag entspricht.');
        if (!notes.length) push(src.hr.traitsNone.tone, src.hr.traitsNone.title, src.hr.traitsNone.text);

        this.state.intranetData = {
            employee,
            feed,
            incident: { days: streak, note: incident.note },
            vision_quote: draw(src.visions),
            status: [...src.status].sort(() => Math.random() - 0.5).slice(0, 3),
            kpi,

            chantal: {
                top: average >= 20 ? src.chantal.high : average <= -20 ? src.chantal.low : null,
                older: draw(src.chantal.older)
            },

            vision: {
                extra: done.includes('ach_wolf') ? src.vision.boss
                     : (rep['Dr. Wichtig'] ?? 0) >= 20 ? src.vision.good
                     : (rep['Dr. Wichtig'] ?? 0) <= -20 ? src.vision.bad
                     : null,
                note: done.includes('ach_hacker') ? src.vision.editorNote : null
            },

            sales: {
                extra: (rep['Markus'] ?? 0) >= 20 ? src.sales.good
                     : (rep['Markus'] ?? 0) <= -20 ? src.sales.bad
                     : null,
                phoenix: flags['path_phoenix_storno'] ? src.sales.phoenix : null
            },

            kantine: {
                today,
                service,
                hygiene: draw(src.hygiene),
                done: this.state.lunchDone ? src.service.done : null
            },

            impressum: {
                version: src.impressum.baseVersion + (stats.daysStarted ?? 0),
                note: src.impressum.versionNote,
                clause: src.impressum.clauses.find(c => (stats.daysRageQuit ?? 0) >= c.minRage) ?? null
            },

            hr: {
                policy: src.hr.policy,
                support: src.hr.support,
                probation: Math.min(14, Math.max(1, stats.daysStarted ?? 1)),
                salary: src.hr.salary,
                salaryNote: src.hr.salaryNote,
                loyalty,
                notes,
                documents: src.hr.documents
            }
        };
    },

    closeIntranet: function() {
        this.state.intranetOpen = false;
        document.body.classList.remove('overflow-hidden');
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
            const reactive = pool.filter(n => n.reqStory && flags[n.reqStory]);
            const general = pool.filter(n => !n.reqStory)
                                .sort(() => Math.random() - 0.5)
                                .slice(0, Math.max(4, 8 - reactive.length));
            this.state.boardNotes = [...reactive, ...general];
        }

        this.showOverlay('board-modal', false);
    },

    closeBoard: function() {
        const modal = document.getElementById('board-modal');
        this.hideOverlay(modal, false);
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
            // Aggro = Immer Orange
            color = 'text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]';
        } else if (elementId === 'val-cr') {
            // Chef/Radar = Immer Rot
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
    
    playBootSequence: function(callback) {
        this.playAudio('boot');
        this.state.activeEvent = true;
        this.disableButtons(true);

        // Softer than the classic terminal green, still retro
        this.state.bootLines = [];
        this._setTerminal('flex-1 flex flex-col items-start justify-center p-8 w-full min-h-full bg-slate-950 text-emerald-400 font-mono text-sm md:text-base overflow-hidden border border-slate-800 rounded-xl shadow-inner', { mode: 'boot' });

        // Less "Nerd-Linux", more "GlobalCorp Satire"
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
            
            // Generate the code
            const code = engine.exportSaveGame();
            area.value = code || "Fehler beim Erstellen.";
            msg.style.opacity = '0'; // Reset Message

            this.showOverlay(modal);
        },

        // Opens the import dialog
        openImportModal: function() {
            const modal = document.getElementById('save-import-modal');
            const area = document.getElementById('import-area');
            const msg = document.getElementById('import-msg');

            area.value = ""; // Leeren
            msg.style.opacity = '0'; 
            msg.innerText = "";

            this.showOverlay(modal);
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

        // Import function (robust, and fixed)
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

                if (data.party_easy) localStorage.setItem(engine.KEYS.partyPlayed.easy, data.party_easy);
                if (data.party_normal) localStorage.setItem(engine.KEYS.partyPlayed.normal, data.party_normal);
                if (data.party_hard) localStorage.setItem(engine.KEYS.partyPlayed.hard, data.party_hard);

                // Same reason as in the hard reset: a running day belongs to
                // the save that was just replaced. Resuming it would mix the
                // imported archive with the reputation of a foreign workday.
                engine.clearDay();

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
            // This used to remove a non-existent 'tutorialSeen' key, which meant a
            // hard reset wiped the archive but left the tutorial marked as done.
            // Deliberately NOT removed: keyBinds and every settings and audio
            // key (see keys.js). A hard reset wipes the save, not the
            // preferences of the person in front of the screen.
            localStorage.removeItem(engine.KEYS.archive);
            localStorage.removeItem(engine.KEYS.defaultDiff);
            localStorage.removeItem(engine.KEYS.tutorialDone);
            localStorage.removeItem(engine.KEYS.partyPlayed.easy);
            localStorage.removeItem(engine.KEYS.partyPlayed.normal);
            localStorage.removeItem(engine.KEYS.partyPlayed.hard);

            // The interrupted workday goes too. Without this the reload would
            // offer to resume a day that belongs to the save just wiped - and
            // the day carries its own copy of the reputation, so finishing it
            // would write part of the old progress back into the empty archive.
            engine.clearDay();

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
        
        // --- Refresh the toggles ---
        if(document.getElementById('setting-fx')) document.getElementById('setting-fx').checked = this.state.visualFX;
        if(document.getElementById('setting-oneclick')) document.getElementById('setting-oneclick').checked = this.state.oneClickItem;
        if(document.getElementById('setting-fastchat')) document.getElementById('setting-fastchat').checked = this.state.fastChat;
        if(document.getElementById('setting-blindstats')) document.getElementById('setting-blindstats').checked = this.state.blindStats;
        if(document.getElementById('setting-blindtickets')) document.getElementById('setting-blindtickets').checked = this.state.blindTickets;
        if(document.getElementById('setting-audio')) document.getElementById('setting-audio').checked = this.state.audioEffects;
        if(document.getElementById('setting-textsize')) document.getElementById('setting-textsize').value = this.state.textSize ?? 'normal';
        if(document.getElementById('setting-scanlines')) document.getElementById('setting-scanlines').checked = this.state.scanlines !== false;
        if(document.getElementById('setting-autochart')) document.getElementById('setting-autochart').checked = !!this.state.autoChart;
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

        this.showOverlay(modal, false);
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
        // Anzeige & Layout
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

        // Herausforderung
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

        this.updateSettingsUI();
        this.playAudio('ui');
    },

    /**
     * Two-step confirmation on the button itself instead of a browser dialog.
     * The first click asks, the second acts; after five seconds without an
     * answer the button returns to its resting state.
     */
    confirmResetSettings: function(btn) {
        if (btn.dataset.armed === 'true') {
            clearTimeout(this._resetArmTimer);
            btn.dataset.armed = 'false';
            btn.textContent = btn.dataset.label;
            btn.classList.remove('!text-red-300', '!border-red-500/70', '!bg-red-950/40');
            this.resetSettings();
            return;
        }
        btn.dataset.label = btn.dataset.label || btn.textContent.trim();
        btn.dataset.armed = 'true';
        btn.textContent = 'Wirklich?';
        btn.classList.add('!text-red-300', '!border-red-500/70', '!bg-red-950/40');
        this.playAudio('ui');

        clearTimeout(this._resetArmTimer);
        this._resetArmTimer = setTimeout(() => {
            btn.dataset.armed = 'false';
            btn.textContent = btn.dataset.label;
            btn.classList.remove('!text-red-300', '!border-red-500/70', '!bg-red-950/40');
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
        localStorage.setItem(engine.KEYS.defaultDiff, val);
        this.playAudio('ui');
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
            navigator.share(shareData).catch(() => { /* The person closed the share dialog - not an error. */ });
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
    
    // --- KEYBINDING FUNCTIONS ---
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

        // 3. Saved successfully
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
            const catVal = document.getElementById('report-category')?.value || "Unbekannt";
            const descVal = document.getElementById('report-desc')?.value || "";

            // Catch an empty description (optional, but worth it)
            if (descVal.trim() === "") {
                alert("Bitte gib eine kurze Beschreibung ein.");
                return;
            }

            // --- STATE DATA ---
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

            // --- FIND THE LAST EVENT ---
            let lastEventID = "Keine Daten";
            if (s.activeEvent?.id) lastEventID = s.activeEvent.id + " (Aktiv)";
            else if (s.currentPhoneEvent?.id) lastEventID = s.currentPhoneEvent.id + " (Phone)";
            else if (s.storyFlags && Object.keys(s.storyFlags).length > 0) {
                const flags = Object.keys(s.storyFlags);
                lastEventID = flags[flags.length - 1] + " (Letztes Flag)";
            }

            // --- LOG FEED (last 600 characters) ---
            let logText = "(Log leer)";

            if (this.state.logEntries.length > 0) {
                let rawText = [...this.state.logEntries].reverse()
                    .map(e => `[${e.time}] ${e.msg}`).join(" // ");
                if (rawText.length > 2000) rawText = rawText.substring(0, 2000) + "...";
                logText = rawText;
            }

            // --- ASSEMBLE ---
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

            // --- UI FEEDBACK START (button state) ---
            const sendBtn = document.querySelector('#report-modal button.bg-blue-600');
            let originalText = "";
            if (sendBtn) {
                originalText = sendBtn.innerHTML;
                sendBtn.innerHTML = "<span>⏳</span> Sende...";
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
