import { KEYS } from './keys.js';
import { SvelteSet } from 'svelte/reactivity';
import { t, tf, tree } from '../i18n/i18n.svelte.js';

import { DB, ensure, prefetchAll } from '../data.js';
import { buildDiary } from './engine_diary.js';
import { platform, applyPlatformVisibility } from '../platform.js';
import { freshDay, DAY_TIMERS, TUTORIAL_FIELDS, snapshotDay } from './engine_state.svelte.js';
import { PRESENCE_TYPES, PRESENCE_TOKEN } from './presence.js';

/**
 * The gala runs on its own clock. Twelve stations at half an hour each carry
 * the evening from 17:00 to 23:00 - the header clock is the progress bar.
 */
const PARTY_START    = 17 * 60;
const PARTY_END      = 23 * 60;
const PARTY_STATIONS = 12;
const PARTY_STEP     = (PARTY_END - PARTY_START) / PARTY_STATIONS;   // 30 minutes

export const core = {

    // Single source of truth for every localStorage key the game touches.
    // The actual strings live in keys.js — the single source of truth,
    // shared with engine_state, engine_ui and engine_audio. Keeping every
    // key in one place prevents typo-keys that silently read/write
    // nothing, which is exactly how the tutorial flag got out of sync.
    KEYS,

    // --- HELPER FOR SAFE SAVE/LOAD MERGING ---
    deepMerge: function(target, source) {
        for (const key in source) {
            // Arrays are replaced wholesale - safest for the inventory and similar lists
            if (Array.isArray(source[key])) {
                target[key] = [...source[key]];
            } 
            // Objects are deep-copied recursively
            else if (source[key] !== null && typeof source[key] === 'object') {
                if (!target[key]) target[key] = {};
                this.deepMerge(target[key], source[key]);
            } 
            // Primitive values (numbers, strings, booleans) are simply assigned
            else {
                target[key] = source[key];
            }
        }
        return target;
    },

    // async because the desktop build has to await its cloud save before the
    // local archive is read. On the web platform.load() resolves immediately.
    init: async function() {
        applyPlatformVisibility();
        await this.loadCloudSave();
        this.loadSystem();
        if (this.state.compactMode) document.body.classList.add('compact-mode');
        if (this.state.textSize && this.state.textSize !== 'normal') document.documentElement.classList.add('text-size-' + this.state.textSize);
        if (!this.state.scanlines) document.body.classList.add('no-scanlines');

        // The tutorial only runs in day mode: it scripts a fixed sequence
        // and assumes a starting state the week does not have (it claims one
        // open ticket, which is true for Mittwoch but not for Erholt or
        // Urlaubsreif). Someone who has never played it and picks the week
        // straight away gets a note rather than a barrier - five days without
        // the basics is a harsh entry, but it stays the player's call.
        if (localStorage.getItem(this.KEYS.tutorialDone) === 'true') {
            document.getElementById('week-tutorial-hint')?.remove();
        }

        this.showOverlay('intro-modal');

        this.updatePresence('system');

        // The intro modal is up and the player reads it for several seconds —
        // more than enough to warm the remaining pools before the first click.
        prefetchAll();
        this.warmImages();

        this.renderHeader();
        this.updateUI();
        this.log({ k: 'log.systemLoaded', v: { version: this.VERSION } });
    },

    /**
     * Fetches and decodes every portrait, item and trophy picture ahead of time.
     *
     * The archive, the team screen and the event card all draw the emoji icon
     * underneath the picture, so an image that has not arrived yet shows as its
     * placeholder and then swaps - visible as a flicker when a modal opens.
     * Decoding here rather than at paint time is what removes it: decode()
     * finishes the work off the rendering path, so the first frame that shows
     * the modal already has the bitmap.
     *
     * Where it happens differs by shell. On the desktop build the files sit on
     * the same disk as the game and cost nothing, so this runs right away while
     * the intro modal is being read. In the browser the same files come over the
     * network, where they would compete with the deferred data pools - the ones
     * the player needs first - so there it waits for an idle moment.
     */
    warmImages: function() {
        if (typeof Image === 'undefined') return;

        const urls = [
            ...(DB.chars ?? []).map(c => c.img),
            ...Object.values(DB.items ?? {}).map(i => i.img),
            ...(DB.achievements ?? []).map(a => a.img)
        ].filter(Boolean);

        const warm = () => {
            for (const src of urls) {
                const img = new Image();
                img.src = src;
                // A failure is not worth reporting: every <img> in the markup
                // falls back to its icon on its own.
                img.decode?.().catch(() => {});
            }
        };

        if (platform.isDesktop) warm();
        else if (typeof requestIdleCallback === 'function') requestIdleCallback(warm, { timeout: 5000 });
        else setTimeout(warm, 2000);
    },

    // --- PERSISTENCE ---

    // Pulls a cloud save (desktop only) into localStorage before loadSystem()
    // reads it, so both shells go through exactly the same load path afterwards.
    loadCloudSave: async function() {
        const cloud = await platform.load();
        if (!cloud) return;

        if (cloud.archive) {
            const template = JSON.parse(JSON.stringify(this.state.archive));
            const merged = this.deepMerge(template, cloud.archive);
            localStorage.setItem(this.KEYS.archive, JSON.stringify(merged));
        }

        // Only ever raise the tutorial flag, never lower it. cloud.tutorial is
        // the STRING "false" for players who skipped it, and a non-empty string
        // is truthy — a plain truthiness check would replay the tutorial on
        // every single launch.
        if (cloud.tutorial === 'true') localStorage.setItem(this.KEYS.tutorialDone, 'true');

        if (cloud.party_easy)   localStorage.setItem(this.KEYS.partyPlayed.easy,   cloud.party_easy);
        if (cloud.party_normal) localStorage.setItem(this.KEYS.partyPlayed.normal, cloud.party_normal);
        if (cloud.party_hard)   localStorage.setItem(this.KEYS.partyPlayed.hard,   cloud.party_hard);

        this.adoptCloudRun(this.KEYS.dayState,  cloud.day,  cloud.runSyncedAt);
        this.adoptCloudRun(this.KEYS.weekState, cloud.week, cloud.runSyncedAt);
    },

    /**
     * Decides between the run on this machine and the one from the cloud.
     *
     * Runs cannot be merged the way the archive can - it is one or the other,
     * so the newer one wins. Both payloads carry savedAt, which makes that a
     * plain comparison.
     *
     * The case without a cloud run needs the second timestamp: an empty slot
     * means either "never played anywhere" or "finished on the other machine".
     * Only if the payload was written AFTER our local save does the second
     * reading apply, and the local leftover goes.
     */
    adoptCloudRun: function(key, roh, runSyncedAt) {
        const zeit = (text) => {
            try { return JSON.parse(text)?.savedAt ?? 0; } catch { return 0; }
        };

        let lokal = null;
        try { lokal = localStorage.getItem(key); } catch { return; }

        if (!roh) {
            if (lokal && runSyncedAt && runSyncedAt > zeit(lokal)) {
                try { localStorage.removeItem(key); } catch { /* never mind */ }
            }
            return;
        }

        if (!lokal || zeit(roh) > zeit(lokal)) {
            try { localStorage.setItem(key, roh); } catch { /* storage full */ }
        }
    },

    // Everything worth carrying across devices. Settings stay local on purpose:
    // volume and keybinds belong to the machine, not to the player's progress.
    //
    // The run in progress travels as well - a week is five days of play, and
    // losing it by opening the game on the other machine would be the worst
    // possible surprise. runSyncedAt is the timestamp of this payload: it lets
    // the other machine tell an abandoned run apart from one that was finished
    // here afterwards (see loadCloudSave).
    buildCloudPayload: function() {
        return {
            archive:      this.state.archive,
            tutorial:     localStorage.getItem(this.KEYS.tutorialDone) || "false",
            party_easy:   localStorage.getItem(this.KEYS.partyPlayed.easy)   || "false",
            party_normal: localStorage.getItem(this.KEYS.partyPlayed.normal) || "false",
            party_hard:   localStorage.getItem(this.KEYS.partyPlayed.hard)   || "false",
            day:          localStorage.getItem(this.KEYS.dayState),
            week:         localStorage.getItem(this.KEYS.weekState),
            runSyncedAt:  Date.now()
        };
    },

    /**
     * Writes the cloud payload, at most once every half minute.
     *
     * saveDay() runs after every single action; without the throttle the
     * desktop build would write a file that often. The throttle is skipped at
     * the points that matter - a night, the end of a run - so the moment a
     * player is most likely to switch machines is always in the cloud.
     */
    syncRun: function(force = false) {
        const now = Date.now();
        if (!force && now - (this._lastRunSync || 0) < 30000) return;
        this._lastRunSync = now;
        platform.save(this.buildCloudPayload());
    },

    /**
     * Maps the current activity onto the status line friends can see.
     * No-op outside the desktop build.
     *
     * Sends a TOKEN, not a sentence. Up to 6.0 this passed the finished
     * `t('presence.coffee')` string, which Steam then printed verbatim through
     * `#DisplayStatus` = `%statustext%` - so the friends list showed the
     * language the PLAYER had picked, to everyone looking. Steam resolves a
     * token per viewer instead: the German friend of an English player reads
     * German, and the other way round.
     *
     * The words themselves stay in src/i18n - they are ours, they belong where
     * lint-i18n and lint-parity can see them. tools/make-steam-presence.mjs
     * turns them into the two .vdf files for the Steamworks backend, which is
     * why the keys below are declared by hand: nothing calls t() on them here
     * any more.
     *
     * i18n-uses: presence.coffee, presence.sidequest, presence.server
     * i18n-uses: presence.calls, presence.boss, presence.rep
     * i18n-uses: presence.lunch, presence.party, presence.system
     * i18n-uses: presence.fallback
     */
    updatePresence: function(type) {
        const known = PRESENCE_TYPES.includes(type) ? type : 'fallback';
        platform.presence(PRESENCE_TOKEN + known);
    },

    loadSystem: function() {
        const data = localStorage.getItem(this.KEYS.archive);
        
        DB.chars.forEach(char => {
            this.state.reputation[char.name] = 0;
        });

        if(data) {
            try {
                const loadedArchive = JSON.parse(data);
                // Deep merge so an older save cannot wipe fields added since
                this.state.archive = this.deepMerge(this.state.archive, loadedArchive);
                
                if(!this.state.archive.items) this.state.archive.items = [];
                if(!this.state.archive.achievements) this.state.archive.achievements = [];
                if(!this.state.archive.reputation) this.state.archive.reputation = {};
                if(!this.state.archive.stats) this.state.archive.stats = { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 };
                
                // --- NEW: GARBAGE COLLECTION (clearing out stale data) ---
                if (typeof DB !== 'undefined' && DB.items) {
                    this.state.archive.items = this.state.archive.items.filter(id => DB.items[id]);
                }
                if (typeof DB !== 'undefined' && DB.achievements) {
                    this.state.archive.achievements = this.state.archive.achievements.filter(id => 
                        DB.achievements.find(ach => ach.id === id)
                    );
                }
                if (typeof DB !== 'undefined' && DB.chars) {
                    for (let charName in this.state.archive.reputation) {
                        if (!DB.chars.find(c => c.name === charName)) {
                            delete this.state.archive.reputation[charName];
                        }
                    }
                }
                // ---------------------------------------------------------

                for (let [name, val] of Object.entries(this.state.archive.reputation)) {
                    this.state.reputation[name] = val;
                }

            } catch(e) { console.error("Savegame Error", e); }
        }
    },

    /**
     * Saves the workday in progress.
     *
     * Saved only while idle - that is, with no event open. Restoring a
     * half-answered conversation would be involved and error-prone; this way
     * the worst case is losing the one event that was on screen, not the
     * whole morning.
     *
     * freshDay() decides which fields belong to a day - the same source that
     * creates it. A newly added day field therefore cannot be forgotten here.
     * Sets become arrays for JSON.
     */
    saveDay: function() {
        // A running week saves as one unit - the day slot never holds a half-week.
        if (this.state.week.active) { this.saveWeek(); return; }
        if (this.state.activeEvent || this.state.pendingEnd || this.state.isPartyMode) return;

        try {
            const day = snapshotDay(this.state);
            // Not part of freshDay, but still part of the day:
            day.difficultyMult = this.state.difficultyMult;
            day.reputation = { ...this.state.reputation };
            day.savedAt = Date.now();

            localStorage.setItem(this.KEYS.dayState, JSON.stringify(day));
            this.syncRun();
        } catch (e) {
            // Storage full or private mode: the day carries on, it simply is
            // not saved.
            console.warn('Day could not be saved:', e);
        }
    },

    /** Is there an interrupted day? Returns it or null. */
    loadDay: function() {
        try {
            const raw = localStorage.getItem(this.KEYS.dayState);
            if (!raw) return null;
            const day = JSON.parse(raw);
            // A day that was already over is not offered.
            if (!day || day.time >= 16 * 60 + 30) return null;
            return day;
        } catch {
            return null;
        }
    },

    /**
     * Carries the two recorded shapes of a save across the 6.0 rename.
     *
     * Up to 5.0 a curve point read `{ t, f, a, c }` and a week row carried
     * `endFl/endAl/endCr` and `peakC`; both now use the option letters
     * (`m` minute, `l` laziness, `a` aggro, `b` boss). 5.0 is published, so
     * those saves are out there, and every reader of these two shapes falls
     * back with `?? 0` - an unmigrated save would not fail, it would draw a
     * flat line at zero and pick different diary lines, silently.
     *
     * Both shapes are small and unambiguous - an old point carries `t` and no
     * `m` - so this is a rename, not a guess. Neither runs more than once: the
     * migrated object no longer matches its own condition.
     */
    migrateStatPoints: function(history) {
        if (!Array.isArray(history)) return history;
        return history.map(p =>
            (p && typeof p === 'object' && p.m === undefined && p.t !== undefined)
                ? { m: p.t, l: p.f ?? 0, a: p.a ?? 0, b: p.c ?? 0 }
                : p);
    },

    migrateWeekLog: function(log) {
        if (!Array.isArray(log)) return log;
        return log.map(d => {
            if (!d || typeof d !== 'object') return d;
            if (d.endFl === undefined && d.endAl === undefined &&
                d.endCr === undefined && d.peakC === undefined) return d;
            const { endFl, endAl, endCr, peakC, ...rest } = d;
            if (endFl !== undefined) rest.endL = endFl;
            if (endAl !== undefined) rest.endA = endAl;
            if (endCr !== undefined) rest.endB = endCr;
            if (peakC !== undefined) rest.peakB = peakC;
            return rest;
        });
    },

    /**
     * Writes a stored day snapshot back onto the state. Shared by the day
     * resume, the week resume and the week's soft reset, so the three can
     * never disagree about what restoring a day means.
     */
    applyRestoredDay: function(day) {
        // SvelteSet, not Set: a restored day must not come back less reactive
        // than a fresh one, or the party hub stops greying out its stations
        // after a resume and only after a resume. See engine_state.svelte.js.
        const SETS = ['usedIDs', 'usedEmails'];
        for (const [key, value] of Object.entries(day)) {
            // savedAt is bookkeeping, the tutorial fields describe a lesson
            // that is not running any more - a save from a dev build may still
            // carry them.
            if (key === 'savedAt' || TUTORIAL_FIELDS.includes(key)) continue;
            this.state[key] = SETS.includes(key) ? new SvelteSet(value ?? []) : value;
        }
        this.state.statHistory = this.migrateStatPoints(this.state.statHistory);

        // The log counter lives on the engine object, not in the day state:
        // after a reload it would start at zero again and hand out ids the
        // restored entries already carry. Svelte answers that with duplicate
        // keys in the LogFeed.
        this._logId = Math.max(0, ...(this.state.logEntries ?? []).map(e => e?.id ?? 0));

        this.refreshBootLogEntry();

        // Rebuild display and flow
        for (const key of DAY_TIMERS) this.state[key] = null;
        this.state.activeEvent = false;
        this.state.pendingEnd = null;
        this.state.phone = { open: false, notification: false, appName: '', messages: [], options: [], node: null };
    },

    /**
     * Restamps the boot line of a restored log with the version that is
     * actually running.
     *
     * init() writes "System v6.0.0 loaded" as the FIRST log entry of a session,
     * before any day exists, and setDifficulty() does not clear the log - so
     * that line travels into the day save. Restore it verbatim and the log
     * announces the version the save was written under while the terminal
     * header two centimetres above shows the running one. Someone who saved
     * under 5.0 and resumed after an update read "System v5.0.0" under
     * "TicketSystem v6.0.0".
     *
     * The line is restamped rather than kept because it is not a record of
     * anything that happened in the office: it is the machine announcing
     * itself, the same statement the header makes, and it has to be true of the
     * engine running now.
     *
     * The RECIPE is rewritten, not a sentence written over it. Since 6.0 the
     * entry stores `{ k, v }` and the display resolves it (engine/recipe.js), so
     * assigning `msg` would have had no effect at all - the recipe wins - while
     * leaving a stale sentence in the save. Stamping the value instead fixes
     * the version AND keeps the line able to follow a language switch. An entry
     * from 5.x has only text; it is turned into a recipe here, which is the one
     * place a 5.x line can be given its identity back.
     *
     * Found by identity, not by text: id 1 is the first log() of a session, and
     * init()'s line is the first log() there is. A day that ran long enough to
     * push it past LOG_MAX_ENTRIES simply has nothing to restamp, and a later
     * day of a week never carries id 1 because the counter keeps running. No
     * saved field is read, so saves written before this fix are covered too -
     * which matters, because those are the only ones that can show it.
     */
    refreshBootLogEntry: function() {
        const boot = (this.state.logEntries ?? []).find(e => e?.id === 1);
        if (!boot) return;
        boot.k = 'log.systemLoaded';
        boot.v = { version: this.VERSION };
        boot.ref = undefined;
        delete boot.msg;
    },

    /** Restores a saved run and picks up again in a paused state. */
    resumeDay: function() {
        // The resume dialog serves both modes; a stored week routes here too.
        if (this._resumeKind === 'week') {
            this._resumeKind = null;
            this.resumeWeek();
            return;
        }
        const day = this.loadDay();
        if (!day) { this.reset(); return; }

        this.applyRestoredDay(day);

        this.hideOverlay('resume-modal');

        this.renderHeader();
        this.updateUI();
        this.disableButtons(false);
        this.setTerminalIdle();
        this.log({ k: 'log.sessionRestored' }, "text-blue-400");
        this.playMusic('office');
        this.updatePresence('system');
    },

    /** From the resume dialog: discard the interim state, start fresh. */
    discardDay: function() {
        if (this._resumeKind === 'week') {
            this._resumeKind = null;
            this.clearWeek();
            this.hideOverlay('resume-modal');
            this.playAudio('ui');
            this.startWeekSelect();   // back into the WEEK flow: the picker
            return;
        }
        this.clearDay();
        this.hideOverlay('resume-modal');
        this.playAudio('ui');
        this.start();
    },

    /** Discards the saved day (end of day, or a deliberate restart). */
    clearDay: function() {
        try { localStorage.removeItem(this.KEYS.dayState); } catch { /* never mind */ }
    },

    /**
     * Builds what the knowledge view renders: every entry whose head has been
     * unlocked, with the notes earned so far. Derived from the raw evidence in
     * the archive on every call - the compendium itself is never persisted, so
     * entries added in a later version light up for old save files.
     */
    knowledgeEntries: function() {
        const seen  = new Set(this.state.archive.seenEvents ?? []);
        const flags = new Set(this.state.archive.seenFlags ?? []);
        const known = (n) => (n.flag ? flags.has(n.flag) : seen.has(n.seen));

        const read = this.state.archive.knowledgeRead ?? {};

        // tree() rather than DB, and that is not cosmetic: this runs inside a
        // $derived in components/KnowledgeView.svelte, and DB is a plain object
        // the language switch refills. Read directly, the derived has nothing
        // to notice - the tabs around it would change language while the notes
        // and roles stayed behind. The trap CLAUDE.md documents for `DB`.
        return (tree().compendium ?? []).map(e => {
            const open  = (e.seen ?? []).some(id => seen.has(id));
            const notes = (e.notes ?? []).filter(known).map(n => n.text);
            // Counting notes rather than storing a boolean is what makes a
            // later note re-flag an entry that was read months ago.
            const unread = open && notes.length > (read[e.id] ?? 0);
            return { ...e, open, notes, unread, total: (e.notes ?? []).length };
        });
    },

    /**
     * Records how much of an entry has been read. Called by the knowledge view
     * when an entry is displayed.
     *
     * Writes through to storage, because the marker is progress: quitting after
     * reading must not bring every entry back as unread. The early return keeps
     * that from turning into a save on every render.
     */
    markKnowledgeRead: function(id, count) {
        if (!this.state.archive.knowledgeRead) this.state.archive.knowledgeRead = {};
        if (this.state.archive.knowledgeRead[id] === count) return;
        this.state.archive.knowledgeRead[id] = count;
        this.saveSystem();
    },

    saveSystem: function() {
        // Copy the current reputation into the archive before writing
        this.state.archive.reputation = { ...this.state.reputation };
        
        // Then persist
        localStorage.setItem(this.KEYS.archive, JSON.stringify(this.state.archive));
        
        // Key bindings are persisted too
        localStorage.setItem(this.KEYS.keyBinds, JSON.stringify(this.state.keyBinds));

        // Mirror progress to cloud storage (desktop only, no-op on the web).
        platform.save(this.buildCloudPayload());
        
    },
    
    /**
     * Writes Müller's line into the chronicle and keeps it.
     *
     * Refused when today's entry already exists - the point is a book that
     * fills up across many workdays, not a page that can be spammed in one
     * sitting. Lives in the archive, so it survives restarts and travels to
     * the cloud with everything else.
     */
    /**
     * The career figures, both modes together.
     *
     * The archive keeps two separate ledgers on purpose - a week is not five
     * days, and mixing them made the numbers meaningless. The chronicle and
     * the intranet are the opposite case: they describe Mueller's life, not a
     * mode, and a player who lives in the week mode should not read a blank
     * personnel file.
     *
     * Week days are recorded under survived_week_*; a failed week counts once,
     * because that is what it was. The streak converts weeks into days (five
     * per week) so that "Arbeitstage ohne Zwischenfall" keeps its unit.
     */
    careerStats: function() {
        const st = this.state.archive.stats ?? {};
        const wochentage = (st.survived_week_easy ?? 0)
                         + (st.survived_week_normal ?? 0)
                         + (st.survived_week_hard ?? 0);
        return {
            survived:   (st.daysSurvived ?? 0) + wochentage,
            rage:       (st.daysRageQuit ?? 0) + (st.weeksRageQuit ?? 0),
            fired:      (st.daysFired ?? 0) + (st.weeksFired ?? 0),
            streak:     Math.max(st.streak ?? 0, (st.weekStreak ?? 0) * 5),
            streakBest: Math.max(st.streakBest ?? 0, (st.weekStreakBest ?? 0) * 5),
            // Valve and warning live in per-mode keys (the archive footnote
            // switches with the panel); the personnel file keeps the career
            // total, like every other number in here.
            warningsChef: (st.warningsChef ?? 0) + (st.weekWarningsChef ?? 0),
            ventSaves:    (st.ventSaves ?? 0)    + (st.weekVentSaves ?? 0),
            daysStarted:  st.daysStarted ?? 0,
        };
    },

    addChronicleEntry: function() {
        const archive = this.state.archive;
        archive.chronicle ??= [];

        const dayNo = archive.stats?.daysStarted ?? 1;
        if (archive.chronicle.some(e => e.day === dayNo)) return false;

        // The id and the numbers, not the sentence: see data_lore.js.
        archive.chronicle.push({ day: dayNo, ...this.composeChronicleLine() });
        // Twelve is plenty: the book should look used, not like a diary.
        if (archive.chronicle.length > 12) archive.chronicle.shift();

        this.saveSystem();
        this.playAudio('ui');
        return true;
    },

    /** Has today's line already been written? Drives the button state. */
    chronicleWrittenToday: function() {
        const dayNo = this.state.archive.stats?.daysStarted ?? 1;
        return (this.state.archive.chronicle ?? []).some(e => e.day === dayNo);
    },

    /**
     * A handwritten line added to the company chronicle.
     *
     * The chronicle belongs to GlobalCorp and would never devote a chapter to
     * a systems administrator. But Müller is holding the book, the last entry
     * is old, and there is space at the bottom of the page. What he writes
     * depends on what the day - and the days before it - actually did to him.
     *
     * One entry per workday, kept in the archive so the book fills up over
     * time and survives a restart.
     */
    composeChronicleLine: function() {
        // The book tells a career, not a mode - hence the combined view
        // rather than the plain day counters.
        const st = this.careerStats();
        const rep = this.state.reputation ?? {};
        const flags = this.state.storyFlags ?? {};
        const survived = st.survived;
        const rage = st.rage;
        const fired = st.fired;
        const streak = st.streakBest;

        // Ids only. Which line can be drawn is a question about the save, and
        // that belongs here; what the line SAYS is in data_lore.js.
        const pool = [];

        if ((st.daysStarted ?? 0) <= 1 && !survived) pool.push('first_found', 'first_entry');

        if (rage >= 3)     pool.push('rage_many_a', 'rage_many_b');
        else if (rage > 0) pool.push('rage_once');

        if (fired >= 2) pool.push('fired_repeat');

        if (survived >= 20)     pool.push('survived_many_a', 'survived_many_b');
        else if (survived >= 8) pool.push('survived_mid');

        if (streak >= 5) pool.push('streak_best');

        const chef = rep['Dr. Wichtig'] ?? 0;
        if (chef >= 40)       pool.push('chef_high');
        else if (chef <= -40) pool.push('chef_low');

        if ((rep['Kevin'] ?? 0) >= 50)       pool.push('kevin');
        if ((rep['Egon'] ?? 0) >= 50)        pool.push('egon');
        if ((rep['Frau Elster'] ?? 0) >= 50) pool.push('elster');

        if (flags['path_phoenix_gabi'] || flags['path_phoenix_nutzen']) pool.push('phoenix');
        if (flags['path_doku_todo'] || flags['path_doku_start'])        pool.push('doku');

        pool.push('plain_a', 'plain_b');

        return {
            id: pool[Math.floor(Math.random() * pool.length)],
            vars: { rage, fired, survived, streak }
        };
    },

    /**
     * The chronicle as the view needs it: one finished sentence per entry.
     *
     * Entries written before 6.0 carried the rendered German sentence and no
     * id. They are dropped rather than shown: a chronicle that reads half in
     * German and half in English after a language switch is worse than one
     * that starts again. The chronicle is flavour, never progress.
     */
    chronicleEntries: function() {
        const lines = DB.lore?.lines ?? {};
        return (this.state.archive.chronicle ?? [])
            .filter(e => e.id && lines[e.id])
            .map(e => ({
                day: e.day,
                text: Object.entries(e.vars ?? {}).reduce(
                    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
                    lines[e.id]
                )
            }));
    },


    /** Short weekday name derived from the difficulty. */
    difficultyKey: function() {
        // Week runs record under their own keys so they can never distort
        // the day-mode achievement grades or the gala prerequisites.
        if (this.state.week.active) return 'week_' + this.state.week.level;
        if (this.state.difficultyMult < 1.0) return 'easy';
        if (this.state.difficultyMult > 1.0) return 'hard';
        return 'normal';
    },

    /**
     * Records how a workday ended.
     *
     * Replaces the individual incrementStat calls at the end of a day: the
     * outcome is more than one counter. The streak of days survived, the
     * breakdown per weekday and whether either safety valve saved the day all
     * belong to it. Everything lands in the archive and survives a restart.
     */
    recordDayResult: function(outcome) {
        const st = this.state.archive.stats ?? (this.state.archive.stats = {});
        const diff = this.difficultyKey();
        // Every counter takes the same route as in incrementStat: raise it,
        // then report it. The Steam layer knows a fixed list (STAT_NAMES) and
        // silently ignores the rest, so fields like survived_hard or ventSaves
        // reach the archive but not Steam. That is intended.
        const bump = (key) => {
            st[key] = (st[key] || 0) + 1;
            platform.stat(key, st[key]);
        };

        // The plain day counters stay day mode only, otherwise the archive's
        // "Arbeitstag" figures would silently include week days and no longer
        // match the per-weekday bars underneath them. Week days are recorded
        // through their own namespace (survived_week_*, see difficultyKey) and
        // the week itself through recordWeekResult().
        const dayMode = !this.state.week.active;

        if (outcome === 'survived') {
            if (dayMode) bump('daysSurvived');
            bump('survived_' + diff);
            // The streak belongs to the day mode, like the counters above it.
            // A week has its own streak in recordWeekResult() - counted in
            // weeks, not in days, because that is the run the player finishes.
            if (dayMode) {
                st.streak = (st.streak || 0) + 1;
                if (st.streak > (st.streakBest || 0)) st.streakBest = st.streak;
            }
        } else {
            if (dayMode) {
                bump(outcome === 'rage' ? 'daysRageQuit' : 'daysFired');
                st.streak = 0;   // A streak ends where the day ends.
            }
        }

        // In week mode the two safety flags survive the nights (valve and
        // warning are weekly), so counting them per day would inflate the
        // stats - recordWeekResult() counts them once at the week's end,
        // into the week's own keys.
        if (!this.state.week.active) {
            if (this.state.rageWarningReceived) bump('ventSaves');
            if (this.state.chefWarningReceived) bump('warningsChef');
        }

        this.saveSystem();
    },

    incrementStat: function(key) {
        if (!this.state.archive.stats) {
            this.state.archive.stats = { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 };
        }
        this.state.archive.stats[key] = (this.state.archive.stats[key] || 0) + 1;
        this.saveSystem();
        platform.stat(key, this.state.archive.stats[key]);
    },

    addToArchive: function(type, id) {
        if(!this.state.archive[type].includes(id)) {
            this.state.archive[type].push(id);
            this.saveSystem(); 
        }
    },
    
    // Starts the game, honouring a saved default difficulty
    start: function() {
		this.playMusic('office');
        this.hideOverlay('intro-modal');

        // Is there an interrupted DAY? Asking about it comes before the
        // difficulty picker, otherwise the first click would discard it.
        // A stored week is not offered here - it belongs to the other button.
        if (this.offerResume('day')) return;

        // Did the player pin a default difficulty? Read from state, which was
        // seeded from localStorage at boot - one place to ask, same as every
        // other setting.
        const defaultDiff = this.state.defaultDiff;
        
        if (defaultDiff !== 'ask') {
            // Skip the dialog and go straight in
            this.setDifficulty(defaultDiff);
        } else {
            // Otherwise show the picker
            const diffModal = document.getElementById('difficulty-modal');
            if(diffModal) {
                this.showOverlay(diffModal);
            } else {
                this.setDifficulty('normal'); // Fallback
            }
        }
    },

    /**
     * Offers to continue an interrupted run of the CHOSEN mode. Each mode
     * entry asks only about its own slot: clicking "Arbeitstag" with a
     * stored week (or the other way round) never shows the foreign save -
     * the other slot stays untouched and waits for its own button.
     * Returns true when the resume dialog is on screen.
     */
    offerResume: function(kind) {
        const resumeModal = document.getElementById('resume-modal');
        if (!resumeModal) return false;
        const pad = (n) => String(n).padStart(2, '0');
        const info = document.getElementById('resume-info');

        if (kind === 'week') {
            const savedWeek = this.loadWeek();
            if (!savedWeek) return false;
            this._resumeKind = 'week';
            // Not `t`: that is the dictionary lookup imported at the top of
            // this file, and a local of the same name shadows it silently.
            const minutes = savedWeek.day?.time ?? 8 * 60;
            const clock = `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
            const cfg = this.WEEK_DIFFS[savedWeek.week.level];
            // i18n-uses: week.day.mon, week.day.wed, week.day.fri
            const dayName = this.dayName(savedWeek.week.dayIndex - 1);
            if (info) info.textContent =
                tf('resume.week', { mode: t(`week.diff.${cfg.key}`), day: dayName, clock, tickets: savedWeek.day?.tickets ?? 0 });
            this.showOverlay(resumeModal);
            return true;
        }

        const saved = this.loadDay();
        if (!saved) return false;
        this._resumeKind = 'day';
        const clock = `${pad(Math.floor(saved.time / 60))}:${pad(saved.time % 60)}`;
        // The day mode names itself after a weekday, so the dictionary already
        // has the word - week.day.fri and friends, the same ones the week mode
        // uses. No second set for the same five days.
        const dayKey = saved.difficultyMult < 1.0 ? 'fri'
                     : saved.difficultyMult > 1.0 ? 'mon' : 'wed';
        if (info) info.textContent = tf('resume.day', {
            mode: t(`week.day.${dayKey}`), clock, tickets: saved.tickets ?? 0
        });
        this.showOverlay(resumeModal);
        return true;
    },

    /**
     * Applies the difficulty, then starts the day (or the tutorial).
     *
     * REPLACES the day rather than adjusting fields on it, the same way
     * softReset() does. Up to 6.0 it only set what the level itself changes,
     * and everything else stayed as it stood - so a day begun after another
     * one inherited its tickets and its stats. On easy and normal not a single
     * value was cleared; even hard carried laziness and the boss radar across,
     * because only tickets and aggro were named.
     *
     * That is why it bit after the TUTORIAL: whatever the lesson left behind
     * travelled into the day that followed it, and a Friday could open with a
     * ticket that Friday never issues.
     *
     * freshDay() derives tickets and excuses from the multiplier already -
     * 2 and 1 above 1.0, none and 3 below, none and 2 at it - which is exactly
     * what the three branches used to spell out by hand. One source, and a new
     * day field can no longer be forgotten here.
     */
    setDifficulty: function(level) {
        this.hideOverlay('difficulty-modal');
        
        // Lock the buttons for the half second of setup
        this.disableButtons(true);

        const mult = level === 'easy' ? 0.8 : level === 'hard' ? 1.25 : 1.0;

        // The log is the one thing that outlives this: init() writes the
        // version line as the first entry of the SESSION, before any day
        // exists, and refreshBootLogEntry() relies on finding it again with
        // id 1. Clearing it here would take that line away and leave the
        // restamp with nothing to stamp - so it is carried over by hand.
        const { logEntries, lastLogMsg } = this.state;
        Object.assign(this.state, freshDay(mult), { logEntries, lastLogMsg });
        this.state.difficultyMult = mult;

        // i18n-uses: mode.easy, mode.normal, mode.hard
        if (level === 'easy')      this.log({ k: 'mode.easy' },   'text-green-400');
        else if (level === 'hard') this.log({ k: 'mode.hard' },   'text-red-500 font-bold');
        else                       this.log({ k: 'mode.normal' }, 'text-blue-400');

        this.updateUI();

        // Start the tutorial, delayed so the UI has finished rendering
        setTimeout(() => {
            // Read the flag straight from storage
            if (this.lesson && localStorage.getItem(this.KEYS.tutorialDone) !== 'true') {
                // Not played yet -> show the modal, the game waits for the click
                this.lesson.start();
            } else {
                // Already done or unavailable -> straight into the day
                this.reset();
            }
        }, 500);
    },
    
    reset: function() {
		this.playAudio('ui');
		
        // --- 1. PARTY LOOP (only once the gala is running) ---
        if (this.state.isPartyMode) {
            this.state.activeEvent = true;
            this.disableButtons(true);
            
            // Half an hour per station: twelve of them carry 17:00 to 23:00,
            // which is exactly where the finale sets it anyway.
            this.state.time = Math.min(
                PARTY_END,
                PARTY_START + this.state.partyProgress * PARTY_STEP
            );

            // After 12 stations the finale kicks in
            if (this.state.partyProgress >= PARTY_STATIONS) {
                let finaleId = 'party_finale_standard';
                if (this.state.al >= 100) finaleId = 'party_finale_rage';
                else if (this.state.fl >= 100) finaleId = 'party_finale_houdini';
                else if (this.state.al < 40 && this.state.fl < 40) finaleId = 'party_finale_hero';
                else if (this.state.fl >= 50 && this.state.al <= 60) finaleId = 'party_finale_gossip';
                
                // --- The finale happens at 23:00 ---
                this.state.time = PARTY_END;
                this.updateUI();
                
                this.renderTerminal(DB.party.find(e => e.id === finaleId), 'party');
            } else {
                // Which version of the hub shows depends on how far the
                // evening has come: arrival, peak, and the hour in which the
                // room slowly empties.
                const hub = DB.party.find(e => e.id === 'party_hub');
                const versions = hub?.textByProgress;
                if (versions?.length) {
                    const stage = Math.min(
                        versions.length - 1,
                        Math.floor(this.state.partyProgress / (PARTY_STATIONS / versions.length))
                    );
                    this.renderTerminal({ ...hub, text: versions[stage] }, 'party');
                } else {
                    this.renderTerminal(hub, 'party');
                }
            }
            return;
        }

        // The diary, fetched at the START of the day although it is written at
        // the END of it (6.1).
        //
        // It is the one deferred pool with no ensure() at its call site:
        // buildDiary() reads DB.diary straight and falls back to a single line
        // if it is not there, silently. The other fourteen ask for themselves
        // when they are needed, so a warm-up that did not happen costs them a
        // moment and nothing else. This one has no such moment - by the time
        // the page is written the day is over. Asked for here, hours of play
        // ahead of the first reader, and deliberately not awaited: nothing on
        // the morning screen depends on it.
        ensure('diary').catch(() => { /* buildDiary falls back, as it always did */ });

        // --- TUTORIAL HOOK ---
        if (this.lesson?.isActive) {
            this.state.activeEvent = false;
            this.setTerminalIdle('halgerd');
            
            this.lesson.advance();
            return; // keeps mail, news and the morning mood out of the party
        }
        // -----------------------------------------------------------------
		
		// --- interception for the morning routines ---
		if (!this.state.morningMoodShown) {
            this.state.morningMoodShown = true;
            this.triggerMorningMood();
            return;
        }
        // -----------------------------------------
		
        this.playMusic('office');
        this.updatePresence('system');

        this.state.activeEvent = false;
        this.disableButtons(false);
        this.setTerminalIdle();
        
        this.checkRandomEmail();
        this.checkForNews(); // news only fires while idle
    },

    // Instant restart without a page reload
    // Stops every per-day timer and nulls the handle. Nulling matters: an
    // expired handle is still truthy, and triggerEmail() reads it as "a timer
    // is already running" and stops scheduling mail for the rest of the day.
    clearDayTimers: function() {
        for (const key of DAY_TIMERS) {
            clearTimeout(this.state[key]);
            clearInterval(this.state[key]);
            this.state[key] = null;
        }
    },

    // Restarts the workday without touching settings, archive or difficulty.
    /**
     * Back to the title screen, so the player can pick the other mode without
     * reloading the page or restarting the app.
     *
     * The run is not thrown away: saveDay() routes to the week slot while a
     * week runs, so the intro's mode buttons offer to continue exactly where
     * this left off. Only an open event or a pending ending refuses to save,
     * which is the same rule the resume dialog has always followed.
     *
     * A reload rather than a hand-written teardown: the day owns timers,
     * overlays, the phone and (in week mode) the calendar. Unwinding all of
     * that by hand is where stale state creeps in - the end screen's restart
     * button takes the same route for the same reason.
     */
    returnToMenu: function() {
        this.saveDay();
        this.clearDayTimers();
        this.stopMusic(0);   // the page reloads immediately, a fade would be cut off anyway
        location.reload();
    },

    softReset: function() {
        // A running week must not be wiped by a day reset - freshDay() would
        // silently destroy the carried backpack and the whole run. The week
        // restarts from its last checkpoint instead.
        if (this.state.week.active) { this.softResetWeek(); return; }

        this.stopMusic();
        this.clearDayTimers();

        // Close every menu
        this.closeSettings();
        this.dismissModal();

        // Replace the whole day rather than resetting fields one by one, so a
        // newly added field can never be forgotten here.
        Object.assign(this.state, freshDay(this.state.difficultyMult));

        // Only someone flying blind from eight is flying blind. Hiding the
        // readouts later means having watched the morning with full sight -
        // that does not count.
        this.state.blindRun = this.state.blindStats && this.state.blindTickets;

        // After the day is replaced: reputation comes from the archive and
        // persists, so this records where it stood at the start of today.
        this.state.repAtStart = { ...this.state.reputation };

        // A new day replaces any saved progress.
        this.clearDay();

        // Reset the ticker header immediately
        this.renderHeader();
        
        // Clean up phone, mail and log
        document.getElementById('email-modal')?.classList.add('hidden');
        // Back to standby; PhoneView.svelte follows the state.
        this.state.phone = { open: false, notification: false, appName: '', messages: [], options: [], node: null };
        
        // The log array is part of freshDay(), so it was already emptied
        // above along with the rest of the day.
        this.log({ k: 'log.systemRestart' }, "text-blue-400");
        
        // Restart through the normal morning path
        this.updateUI();
        
        // --- Boot-Sequenz dazwischenschalten ---
        this.playBootSequence(() => {
            this.reset(); // the new day starts only after the boot sequence
        });
    },

    checkAchievements: function() {
        // --- PLAYSTYLE: EXTREMES ---
        
        // 1. 'Der Asket' (no coffee) - from 16:00
        // Rewards enduring the aggro without help
        if(this.state.time > 16*60 && this.state.coffeeConsumed === 0 && !this.hasAch('ach_ascetic')) {
            this.unlockAchievement('ach_ascetic');
        }

        // 2. CAFFEINE OVERLOAD (too much coffee)
        // Raised to 8 - roughly one trip to the machine per hour
        if(this.state.coffeeConsumed >= 8 && !this.hasAch('ach_coffee')) {
            this.unlockAchievement('ach_coffee');
        }

        // 3. GHOSTING (ignoring mails)
        // Raised to 5 - genuinely dangerous for the radar value
        if(this.state.emailsIgnored >= 5 && !this.hasAch('ach_ignore')) {
            this.unlockAchievement('ach_ignore');
        }

        // 4. BLACK HOLE (full inventory)
        // Set to 8 - you have to hoard even the junk
        if(this.state.inventory.length >= 5 && !this.hasAch('ach_hoarder')) {
            this.unlockAchievement('ach_hoarder');
        }

        // --- STAT THRESHOLDS ---
        if(this.state.fl >= 80 && this.state.fl < 100 && !this.hasAch('ach_lazy')) {
            this.unlockAchievement('ach_lazy');
        }
        
        if (this.state.al >= 95 && !this.hasAch('ach_rage')) { // raised to 95% - riskier
            this.unlockAchievement('ach_rage');
        }

        // --- ITEM SETS ---
        
        // MACGYVER (needs tape, screwdriver, cable, manual)
        const tools = ['tape', 'screw', 'kabel', 'manual'];
        const hasAllTools = tools.every(toolId => this.state.inventory.find(i => i.id === toolId));
        if(hasAllTools && !this.hasAch('ach_macgyver')) {
            this.unlockAchievement('ach_macgyver');
        }
        
        // MILLIONAIRE
        if(this.state.inventory.find(i => i.id === 'black_card') && !this.hasAch('ach_rich')) {
            this.unlockAchievement('ach_rich');
        }
        
        // MR ROBOT
        if(this.state.inventory.find(i => i.id === 'admin_pw') && !this.hasAch('ach_hacker')) {
            this.unlockAchievement('ach_hacker');
        }

        if(this.state.inventory.find(i => i.id === 'contract') && !this.hasAch('ach_wolf')) {
            this.unlockAchievement('ach_wolf');
        }

        // --- LATE GAME CHALLENGES (time dependent) ---
        
        // NINJA (secretly lazy) - from 14:00
        if(this.state.time > 14*60 && this.state.cr < 10 && !this.hasAch('ach_ninja')) {
            this.unlockAchievement('ach_ninja');
        }

        // 'Zen Meister' (no anger) - from 15:00
        if(this.state.time >= 15*60 && this.state.al === 0 && !this.hasAch('ach_zen')) {
            this.unlockAchievement('ach_zen');
        }

        // EMPLOYEE OF THE MONTH (anti-lazy) - from 16:00
        if (this.state.time > 16*60 && this.state.fl <= 5 && !this.hasAch('ach_workaholic')) {
            this.unlockAchievement('ach_workaholic');
        }

        // Exactly 9 tickets, one below the limit. One more call would end it.
        if (this.state.time >= 975 && this.state.tickets === 9 && !this.hasAch('ach_risk')) {
            this.unlockAchievement('ach_risk');
        }

        // INBOX ZERO - Ab 16:20
        if (this.state.time >= 980 && this.state.tickets === 0 && !this.hasAch('ach_clean')) {
            this.unlockAchievement('ach_clean');
        }

        // 'Tanz auf dem Vulkan' (high-risk survival) - from 16:20
        if (this.state.time >= 980 && this.state.al >= 90 && this.state.cr >= 90 && !this.hasAch('ach_survivor')) {
            this.unlockAchievement('ach_survivor');
        }
        
        // CHARACTER QUESTS
        if(this.state.inventory.find(i => i.id === 'kevin_ram') && !this.hasAch('ach_mentor')) {
            this.unlockAchievement('ach_mentor');
        }

        if(this.state.inventory.find(i => i.id === 'golden_stapler') && !this.hasAch('ach_ally')) {
            this.unlockAchievement('ach_ally');
        }

        if(this.state.inventory.find(i => i.id === 'master_key') && !this.hasAch('ach_keymaster')) {
            this.unlockAchievement('ach_keymaster');
        }

        if(this.state.inventory.find(i => i.id === 'mixtape') && !this.hasAch('ach_rockstar')) {
            this.unlockAchievement('ach_rockstar');
        }

        if(this.state.inventory.find(i => i.id === 'scotch_bottle') && !this.hasAch('ach_closer')) {
            this.unlockAchievement('ach_closer');
        }

        if(this.state.inventory.find(i => i.id === 'cat_pic') && !this.hasAch('ach_cat_whisperer')) {
            this.unlockAchievement('ach_cat_whisperer');
        }

        if(this.state.inventory.find(i => i.id === 'corp_chronicles') && !this.hasAch('ach_lore')) {
            this.unlockAchievement('ach_lore');
        }
    },

    hasAch: function(id) { return this.state.achievements.includes(id); },

    /**
     * Awards an achievement.
     *
     * Takes the id ALONE (6.0). Until then every call site passed the title and
     * the description as well, which meant 27 German strings lived in the
     * engine while data_achievements.js described the same 27 achievements -
     * and eighteen of them had drifted apart, unnoticed, because nothing
     * compares a toast against an archive entry.
     *
     * The split that survived the clean-up is a real one and is now in the data
     * file: `desc` describes the achievement for the archive and names the
     * condition, `toast` is the moment it is earned and may be shorter or
     * funnier. Where an achievement has no `toast`, the description does both.
     */
    unlockAchievement: function(id) {
        const entry = (DB.achievements ?? []).find(a => a.id === id);
        if (!entry) {
            // A typo in an id used to award a nameless achievement; now it is
            // visible. lint-data.mjs checks the same thing before the build.
            console.warn(`Unknown achievement id: ${id}`);
            return;
        }
        const title = `${entry.icon ?? ''} ${entry.title}`.trim();
        const text  = entry.toast ?? entry.desc;
        // 1. Session check: already earned during THIS run?
        // If so, bail out immediately - stops it spamming inside the loop
        if (this.state.achievements.includes(id)) {
            return;
        }

        // 2. Archive check: earned before? And if so, on which difficulty?
        
        // Current difficulty as a number (1 easy, 2 normal, 3 hard)
        // difficultyTier() maps both modes onto 1/2/3 (day: Freitag/Mittwoch/
        // Montag, week: Erholt/Genervt/Urlaubsreif) - same historical values.
        let currentDiffVal = this.difficultyTier();

        // Pull the stored difficulty
        let savedDiffVal = 0; // 0 = never achieved yet
        
        // Guard against a malformed archive
        if (this.state.archive && this.state.archive.achievements && this.state.archive.achievements.includes(id)) {
            let savedDiffName = "easy";
            // Was a difficulty recorded?
            if (this.state.archive.achievementDiffs) {
                savedDiffName = this.state.archive.achievementDiffs[id] || "easy";
            }
            
            // Map the name onto a comparable number
            if (savedDiffName === "normal") savedDiffVal = 2;
            else if (savedDiffName === "hard") savedDiffVal = 3;
            else savedDiffVal = 1; 
        }

        // Only notify when new (0) or better than before
        let isNewOrBetter = (savedDiffVal === 0) || (currentDiffVal > savedDiffVal);

        // Record it for this session so check 1 catches it on the next frame
        this.state.achievements.push(id);
        // The id, not the words: the end screen resolves it at render time,
        // so a saved day carries no language with it.
        this.state.achievedIds.push(id);

        // Always report it, even when the local archive already knows the
        // achievement — the backend may be out of sync with this machine.
        platform.achievement(id);

        // Feedback (log and toast) only for a new entry or an upgrade
        if (isNewOrBetter) {
            
            // Prepare the log line. A RECIPE, not a sentence - the title comes
            // out of the achievement tree and the tier out of the dictionary,
            // so both are recorded as identities and rendered by whoever draws
            // the line. See engine/recipe.js.
            const titleRef = { ref: { i: id, path: ['title'] } };
            let logLine = { k: 'achievement.log.unlocked', v: { title: titleRef } };
            let logColor = "text-yellow-400 font-bold"; // Standard Gold
            let toastDesc = text;

            // Upgrade case, e.g. easy -> hard
            let isUpgrade = false;
            if (savedDiffVal > 0) {
                // The tiers are named after the day mode's weekdays, but a week
                // run earns them too - there the names are Miller's condition.
                // Both sets already label the two difficulty pickers, so they
                // are read from there instead of spelled out a second time:
                // written twice, they drift, and nothing would report it.
                // Upper case is the log line's own doing, not the label's.
                // i18n-uses: diff.easy.name, diff.normal.name, diff.hard.name
                // i18n-uses: week.diff.easy, week.diff.normal, week.diff.hard
                const dayKeys  = ["", "diff.easy.name", "diff.normal.name", "diff.hard.name"];
                const weekKeys = ["", "week.diff.easy", "week.diff.normal", "week.diff.hard"];
                const tierKey = (this.state.week.active ? weekKeys : dayKeys)[currentDiffVal];
                const tier = t(tierKey).toUpperCase();
                isUpgrade = true;
                logLine = { k: 'achievement.log.upgraded',
                            v: { title: titleRef, tier: { k: tierKey, up: true } } };
                logColor = "text-purple-400 font-bold"; // Upgrade Lila
                toastDesc = tf('achievement.upgradedTo', { tier });
            }

            // A. Write the log line
            this.log(logLine, logColor);

            // B. Show the toast
            // Rendered by components/AchievementToasts.svelte.
            const toastId = this._toastId = (this._toastId || 0) + 1;
            this.state.toasts.push({ id: toastId, title, desc: toastDesc, upgrade: isUpgrade });

            setTimeout(() => {
                const k = this.state.toasts.findIndex(t => t.id === toastId);
                if (k > -1) this.state.toasts.splice(k, 1);
            }, 4000);   // Svelte plays the exit animation after this
        }

        // 3. Always persist in the background, in case this was an upgrade
        this.saveAchievementToArchive(id, currentDiffVal);
    },

    // Stores an achievement together with the difficulty it was earned on
    saveAchievementToArchive: function(id, currentDiffVal) {
        // Make sure the structures exist
        if (!this.state.archive.achievements) this.state.archive.achievements = [];
        if (!this.state.archive.achievementDiffs) this.state.archive.achievementDiffs = {};

        // Number back to name
        let diffName = "easy";
        if (currentDiffVal === 2) diffName = "normal";
        if (currentDiffVal === 3) diffName = "hard";

        // What is on record?
        let savedDiffName = this.state.archive.achievementDiffs[id] || "none";
        let savedDiffVal = 0;
        if (savedDiffName === "easy") savedDiffVal = 1;
        if (savedDiffName === "normal") savedDiffVal = 2;
        if (savedDiffName === "hard") savedDiffVal = 3;

        // Write when new or better
        if (!this.state.archive.achievements.includes(id) || currentDiffVal > savedDiffVal) {
            
            if (!this.state.archive.achievements.includes(id)) {
                this.state.archive.achievements.push(id);
            }
            
            this.state.archive.achievementDiffs[id] = diffName;
            this.saveSystem(); // LocalStorage Update
        }
    },
    
    // Builds the end-of-day report card.
    //
    // Used to be inlined at the top of checkEndConditions(), which runs from
    // updateUI() after every single action - so this HTML was assembled dozens
    // of times per day and thrown away every time. Now it is only called from
    // the branches that actually show it.

    // Runs from updateUI() after every action, so it stays cheap: no report is
    // built until a branch actually needs one.
    /**
     * Where the two safety valves reset to, per weekday. Used to sit in
     * checkEndConditions twice, word for word.
     */
    valveResetValue: function() {
        const tier = this.difficultyTier();               // week-aware, see engine_week.js
        if (tier === 1) return 30;                        // Freitag / Erholt
        if (tier === 3) return 60;                        // Montag / Urlaubsreif
        return 50;                                        // Mittwoch / Genervt
    },

    /**
     * Queues up an end of day.
     *
     * The four endings only differed in title, line and cause - the sequence
     * (record the outcome, build the diary, set pendingEnd) was the same all
     * four times. finishGame() picks it up later.
     *
     * Title and lead arrive as RECIPES, not as sentences (6.1). The end screen
     * is the one screen a player holds still and reads, so it is the last place
     * that may store rendered prose - see src/engine/recipe.js and
     * components/EndModal.svelte, which resolves both on the way to the screen.
     */
    queueEnd: function({ title, lead, cause, outcome, diaryKey, isWin }) {
        this.recordDayResult(outcome);
        this.state.pendingEnd = {
            title, lead, cause, isWin,
            diary: this.generateDiaryEntry(diaryKey)
        };
    },

    /**
     * The aggro valve: once a day you can let off steam, after that it is
     * over. Returns true when the day carries on.
     */
    openRageValve: function() {
        if (this.state.rageWarningReceived) return false;

        this.state.rageWarningReceived = true;
        const resetTo = this.valveResetValue();
        this.state.al = resetTo;
        // Two points: the peak and the reset right after it, so the curve on
        // the end screen drops vertically instead of sloping.
        this.recordStatPoint();

        const texts = DB.special.valveTexts.rage;
        let warningText = tf('valve.rage', { text: texts[Math.floor(Math.random() * texts.length)], value: resetTo });
        if (this.difficultyTier() === 3) warningText += ' ' + t('valve.rage.hard');

        this.showModal(t('valve.rage.title'), warningText, false, 'rage');
        return true;
    },

    /**
     * The written warning: same principle for the boss radar.
     * Returns true when the day carries on.
     */
    issueChefWarning: function() {
        if (this.state.chefWarningReceived) return false;

        this.state.chefWarningReceived = true;
        const resetTo = this.valveResetValue();
        this.state.cr = resetTo;
        this.recordStatPoint();

        const texts = DB.special.valveTexts.chef;
        let warningText = tf('valve.chef', { text: texts[Math.floor(Math.random() * texts.length)], value: resetTo });
        if (this.difficultyTier() === 3) warningText += ' ' + t('valve.chef.hard');

        this.showModal(t('valve.chef.title'), warningText, false);
        return true;
    },

    /**
     * Is the gala due instead of clocking off?
     *
     * Condition: all eight reputation achievements are in, each earned at
     * least on the difficulty being played today - collecting them on Friday
     * does not hand you the party on Monday. And once per difficulty.
     */
    partyInvitation: function() {
        // Tier-based so week runs map onto the day ranks: a week on Genervt
        // asks for the same achievement grade as Mittwoch and shares its
        // played-once flag - the gala stays a once-per-tier finale. Day mode
        // resolves to exactly the historical values.
        const needed = this.difficultyTier();
        const diffStr = needed === 1 ? 'easy' : needed === 3 ? 'hard' : 'normal';
        const DIFF_RANK = { easy: 1, normal: 2, hard: 3 };

        const REQUIRED = ['ach_mentor', 'ach_ally', 'ach_keymaster', 'ach_rockstar',
                          'ach_closer', 'ach_cat_whisperer', 'ach_lore', 'ach_wolf'];
        const unlocked = this.state.archive.achievements ?? [];
        const diffs = this.state.archive.achievementDiffs ?? {};

        const isVeteran = REQUIRED.every(id =>
            unlocked.includes(id) && (DIFF_RANK[diffs[id]] ?? 1) >= needed);

        const partyKey = this.KEYS.partyPlayed[diffStr];
        if (!isVeteran || localStorage.getItem(partyKey) === 'true') return null;
        return { isParty: true, partyKey, diffStr };
    },

    /**
     * Checks after every action whether the workday is over.
     *
     * The order is deliberate: a meltdown beats the ticket collapse, the
     * ticket collapse beats clocking off, and the boss comes last - reaching
     * half past four with a full radar means you earned it.
     */
    checkEndConditions: function() {
        if (this.state.isPartyMode) return;
        // An ending is already queued - checking again would duplicate it
        if (this.state.pendingEnd) return;

        // A. AUSRASTER
        if (this.state.al >= 100) {
            if (this.openRageValve()) return;
            this.queueEnd({
                title: { k: 'end.rageTitle' },
                lead: this.weekFailLead({ k: 'end.rageQuit' }),
                cause: "rage", outcome: "rage", diaryKey: "RAGE", isWin: false
            });
        }
        // B. TICKET-LAWINE
        else if (this.state.tickets >= 10) {
            this.queueEnd({
                title: { k: 'end.firedTitle' },
                lead: this.weekFailLead({ k: 'end.ticketsLead' }),
                cause: "tickets", outcome: "tickets", diaryKey: "TICKETS", isWin: false
            });
        }
        // C. Early warning at seven tickets
        else if (this.state.tickets >= 7 && !this.state.ticketWarning) {
            this.state.ticketWarning = true;
            this.showModal(t('warning.title'), t('warning.ticketJam'), false);
        }
        // D. CLOCKING OFF - or the gala, when everything for it is in place
        else if (this.state.time >= 16 * 60 + 30) {
            // Week mode: Monday to Thursday end in a night, Friday ends the
            // run. The gala never fires mid-week; Friday's gala returns
            // together with the meeting finale (v5.0, package 3).
            if (this.state.week.active) {
                // Friday's meeting outranks the clock. A four-hour option can
                // carry 14:00 past 16:30 in one go, and the week would then
                // end without its finale ever happening. The button offers the
                // meeting instead; the next check ends the week right after.
                if (this.state.week.dayIndex === 5 && !this.state.meetingDone) return;

                if (this.state.week.dayIndex < 5) {
                    this.queueNightEnd();
                } else {
                    // Friday: the gala fires like it always did - but it was
                    // announced in the meeting, so only after it (design 8.1).
                    if (this.state.meetingDone) {
                        const party = this.partyInvitation();
                        if (party) { this.state.pendingEnd = party; return; }
                    }
                    this.queueEnd({
                        title: { k: 'end.weekTitle' },
                        lead: { k: 'end.weekLead' },
                        cause: "time", outcome: "survived", diaryKey: "WIN", isWin: true
                    });
                }
                return;
            }

            const party = this.partyInvitation();
            if (party) { this.state.pendingEnd = party; return; }

            this.queueEnd({
                title: { k: 'end.dayTitle' },
                lead: { k: 'end.dayLead' },
                cause: "time", outcome: "survived", diaryKey: "WIN", isWin: true
            });
        }
        // E. CHEF-RADAR
        else if (this.state.cr >= 100) {
            if (this.issueChefWarning()) return;
            this.queueEnd({
                title: { k: 'end.firedTitle' },
                lead: this.weekFailLead({ k: 'end.firedLead' }),
                cause: "chef", outcome: "chef", diaryKey: "FIRED", isWin: false
            });
        }
    },
    
	finishGame: function() {
        if (this.state.pendingEnd) {
            const end = this.state.pendingEnd;
            
            if (end.isParty) {
                this.startParty();
                return;
            }

            // Monday to Thursday in a week: the day ends in a night, not in
            // an end screen. The run carries on tomorrow.
            if (end.isNight) {
                this.playMusic('office');
                this.clearDayTimers();
                this.state.emailPending = false;
                this.showNightScreen(end);
                this.state.pendingEnd = null;
                return;
            }

            // Any real ending while a week runs ends the WEEK - win on
            // Friday, fail on any day, always with the week balance sheet.
            if (this.state.week.active) {
                this.playMusic('office');
                this.clearDayTimers();
                this.state.emailPending = false;
                this.finishWeek(end);
                this.state.pendingEnd = null;
                return;
            }
            
            // Drop the boss music and return to the chosen office style
            this.playMusic('office');
            
            // Freeze every background activity once the day is really over
            this.clearDayTimers();
            this.state.emailPending = false;
            
            // The day is over, the saved progress can go.
            this.clearDay();
            this.showEnd(end);
            this.state.pendingEnd = null; // Reset
        }
    },
    
    // async: the party pool is only fetched when the finale actually happens,
    // which most players never reach.
    startParty: async function() {
        await ensure('party');
        this.playAudio('ui');
        const endData = this.state.pendingEnd;
        this.state.pendingEnd = null; // clear the marker
        
        // Switch into party mode
        this.state.isPartyMode = true;
        this.state.partyProgress = 0;

        // The evening starts at 17:00 and reaches 23:00 at the finale. The
        // clock in the header is the progress bar: it is already there, it
        // belongs to the fiction, and it tells the player the evening is
        // going somewhere without anyone having to write "station 7 of 12".
        this.state.time = PARTY_START;
        this.state.currentPartyKey = endData.partyKey; 
        
        // The party starts from a clean slate
        this.state.al = 0;
        this.state.fl = 0;
        this.state.cr = 0;
        
        // Kill everything still running from the workday
        this.clearDayTimers();
        this.state.emailPending = false;
        
        this.log(`SYSTEM OVERRIDE: GALA (${endData.diffStr.toUpperCase()})`, "text-pink-500 font-bold");
		
		// ---> START THE GALA MUSIC <---
        this.playMusic('gala');
        this.updatePresence('party');
        
        // And the trap closes: render the opening party event. Coming out of
        // a week the gala is the end of five days, not of one - one line is
        // enough to tie the two modes together.
        const auftakt = DB.party.find(e => e.id === 'party_start');
        if (auftakt && this.state.week.active) {
            this.renderTerminal({
                ...auftakt,
                text: t('party.weekIntro') + '\n\n' + auftakt.text
            }, 'party');
        } else {
            this.renderTerminal(auftakt, 'party');
        }
    },
    
    // --- SPEICHERSTAND EXPORT / IMPORT SYSTEM ---

    // Adler-32 checksum used to detect corrupted save codes.
    // The `>>> 0` forces an unsigned 32-bit integer, otherwise the hex
    // string would carry a minus sign and never match on import.
    calculateChecksum: function(str) {
        let a = 1, b = 0;
        for (let i = 0; i < str.length; i++) {
            a = (a + str.charCodeAt(i)) % 65521;
            b = (b + a) % 65521;
        }
        return ((b << 16 | a) >>> 0).toString(16);
    },
    
    // EXPORT: builds the transferable save code.
    // Shares buildCloudPayload() with the desktop cloud sync so both paths can
    // never disagree about what counts as progress.
    exportSaveGame: function() {
        // Field names are part of the public save-code format and must stay
        // stable — older codes in circulation still use them.
        const data = {
            arc:          this.state.archive,
            tut:          localStorage.getItem(this.KEYS.tutorialDone) || "false",
            party_easy:   localStorage.getItem(this.KEYS.partyPlayed.easy)   || "false",
            party_normal: localStorage.getItem(this.KEYS.partyPlayed.normal) || "false",
            party_hard:   localStorage.getItem(this.KEYS.partyPlayed.hard)   || "false",
            salt:         Math.floor(Math.random() * 999999) // makes every code unique
        };

        try {
            // 2. JSON Stringify
            const jsonString = JSON.stringify(data);

            // 3. Base64, UTF-8 safe so emoji survive
            const base64 = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
            }));

            // 4. Checksum
            const checksum = this.calculateChecksum(base64);

            // 5. Return "BASE64-CHECKSUM"
            return `${base64}-${checksum}`;

        } catch (e) {
            console.error("Export Error:", e);
            return null;
        }
    },

    // --- DIARY ---
    // The texts and the conditions that pick them live in data/data_diary.js,
    // the assembly in engine_diary.js. This method stays so the two call sites
    // keep reading the same.
    generateDiaryEntry: function(endReason, partyValue = "") {
        return buildDiary(this.state, endReason, partyValue);
    },

};
