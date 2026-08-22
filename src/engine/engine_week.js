import { KEYS } from './keys.js';
import { t } from '../i18n/i18n.svelte.js';
import { freshDay, snapshotDay } from './engine_state.svelte.js';
import { platform } from '../platform.js';
import { DB, ensure } from '../data.js';

/**
 * The week run (v5.0): a roguelike Monday-to-Friday campaign.
 *
 * This module owns everything the week mode adds ON TOP of a single workday:
 * the tuning numbers, the night carry-over, the derived difficulty
 * multipliers and the week save slot. The day itself stays exactly the code
 * it always was - a week is five ordinary days glued together by nights.
 *
 * Two rules protect the day mode:
 *   1. state.difficultyMult remains the day mode's identity value and is
 *      never touched while a week runs. Every formula reads effMult() or
 *      statMult() instead, and both return the exact historical values
 *      whenever week.active is false (including the Wednesday x1.1 quirk).
 *   2. freshDay() stays the single source of day fields. The night is not a
 *      second reset path: advanceWeekNight() runs freshDay() and then writes
 *      the carried fields back - a newly added day field can never be
 *      forgotten here, it simply resets like it always did.
 *
 * All numbers below come from tools/simulate-week.mjs (calibration v2,
 * 2026-08-08) and are provisional until playtests confirm them. Change them
 * THERE first, verify the corridors, then mirror them here.
 */

/** Global week tuning, shared by every difficulty. */
export const WEEK_TUNING = {
    ramp: 0.04,          // day multiplier climbs by this per day (Mueller wears out)
    wearPP: 0.10,        // nightly recovery loses 10 percentage points per night
    recoveryFloor: 0.10, // ...but never drops below 10%
    recoveryCap: 45,     // max absolute recovery points per night and stat
    ticketKeep: 0.25,    // share of the ticket backlog that survives the night (ceil!)
};

/**
 * The three week difficulties. Named after Mueller's condition, not after
 * weekdays - the single-day names (Montag/Mittwoch/Freitag) would collide
 * with the actual weekdays of the run.
 *
 * Week days are deliberately EASIER than their single-day counterparts:
 * five days at day-normal intensity compound to 0.77^5 = 27% before any
 * carry-over. The week's difficulty comes from persistence, the weekly
 * valves and the ramp, not from the per-day formula.
 */
// i18n-uses: week.diff.easy, week.diff.normal, week.diff.hard
export const WEEK_DIFFS = {
    easy:   { key: 'easy',   base: 0.75, startTickets: 0, startAl: 0,  excuseStart: 3, excuseCap: 5, rAl: 0.72, rCr: 0.60 },
    normal: { key: 'normal', base: 0.85, startTickets: 1, startAl: 0,  excuseStart: 2, excuseCap: 4, rAl: 0.60, rCr: 0.48 },
    hard:   { key: 'hard',   base: 0.95, startTickets: 2, startAl: 10, excuseStart: 1, excuseCap: 3, rAl: 0.42, rCr: 0.30 },
};

/**
 * The five working days, as ids rather than words (6.0).
 *
 * These used to be German display strings, indexed into from four files. That
 * is the same failure the canteen had: a name that is both an identifier and
 * something on screen cannot survive a second language - it either stays
 * German everywhere or breaks whatever compares against it, and neither shows
 * up as an error.
 *
 * dayName() turns an index into the word. The ids stay put, so anything
 * persisted or compared keeps working.
 */
export const WEEK_DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri'];

// i18n-uses: week.day.mon, week.day.tue, week.day.wed, week.day.thu, week.day.fri
/** @param {number} index 0-based day of the week */
export const dayName = (index) => t(`week.day.${WEEK_DAY_KEYS[index] ?? WEEK_DAY_KEYS[0]}`);

/**
 * The same day as a recipe VALUE rather than as the word (6.1).
 *
 * dayName() renders; this one names. Four sentences on the end and night
 * screens carry a weekday inside them, and those screens are held for as long
 * as the player wants to read them - so they must store the id and resolve on
 * the way to the screen, exactly like a log line does. See src/engine/recipe.js
 * for the form; `up` upper-cases at render time, which is what the night
 * headline used to do with .toUpperCase() before there was anything to
 * re-render.
 *
 * @param {number} index 0-based day of the week
 * @param {boolean} [up] upper-case the result
 */
export const dayNameValue = (index, up = false) => {
    const value = { k: `week.day.${WEEK_DAY_KEYS[index] ?? WEEK_DAY_KEYS[0]}` };
    return up ? { ...value, up: true } : value;
};

/**
 * Daily pool contingents (design 6.2), shared with tools/simulate-week.mjs.
 * min: no day ever feels completely dry. max: a distant ceiling, not a wall.
 * Measured 2026-08 (600 weeks/cell): the old 14/14/12/18 caps hit SENSIBLE
 * play ~12 idle clicks per week, and the calls cap alone raised ticket
 * deaths from 15% to 24% - while coffee-only play loses the week at ANY cap
 * (4-8% wins), so the wall punished the wrong players. The real brake
 * against thin pools is the adaptive rest/days formula in
 * weekContingentLeft(); the max only fences off pure button-hammering.
 */
export const WEEK_CONTINGENTS = {
    min: 8,
    max: { coffee: 20, server: 20, calls: 17, sidequests: 26 },
};

/**
 * What one night does to the day's leftovers. Pure on purpose: state in,
 * carry out, no engine access - this is the function the tests hammer.
 *
 * @param {object} prev       the day state at clocking-off time
 * @param {object} cfg        one entry of WEEK_DIFFS
 * @param {number} nightIndex 1 = the night after Monday ... 4 = after Thursday
 * @returns {{fields: object, report: object}}
 *          fields: everything to write onto the fresh day
 *          report: before/after numbers for the night screen
 */
export function computeNightCarry(prev, cfg, nightIndex) {
    const wear = WEEK_TUNING.wearPP * (nightIndex - 1);
    const rAl = Math.max(WEEK_TUNING.recoveryFloor, cfg.rAl - wear);
    const rCr = Math.max(WEEK_TUNING.recoveryFloor, cfg.rCr - wear);

    const recAl = Math.min(prev.al * rAl, WEEK_TUNING.recoveryCap);
    const recCr = Math.min(prev.cr * rCr, WEEK_TUNING.recoveryCap);

    // Proportional relief, rounded UP: no open ticket is ever free, and every
    // four cleared tickets save one carried - calls stay worth making until
    // the last minute (a flat subtraction would create a dead zone).
    const tickets = Math.ceil(prev.tickets * WEEK_TUNING.ticketKeep);

    // Rounded on purpose: every stat change in the day mode goes through
    // Math.ceil, so the values are always whole numbers. The night was the
    // one place producing fractions - and the header prints them raw, which
    // is where the "25.08%" came from. Rounding here also makes the state
    // match the night screen exactly instead of only after display rounding.
    const fields = {
        tickets,
        fl: prev.fl,                                   // sleep does not do your work
        al: Math.max(0, Math.round(prev.al - recAl)),
        cr: Math.max(0, Math.round(prev.cr - recCr)),
        excusesLeft: Math.min(prev.excusesLeft + 1, cfg.excuseCap),
        inventory: prev.inventory,                     // the backpack comes home and back
        usedIDs: prev.usedIDs,                         // no event repeats within the week
        usedEmails: prev.usedEmails,
        storyFlags: prev.storyFlags,                   // follow-ups fire on later days
        rageWarningReceived: prev.rageWarningReceived, // valve and warning are WEEKLY
        chefWarningReceived: prev.chefWarningReceived,
        lastMoodId: prev.lastMoodId,                   // no repeated morning mood
    };

    const report = {
        alBefore: prev.al, alAfter: fields.al,
        crBefore: prev.cr, crAfter: fields.cr,
        ticketsBefore: prev.tickets, ticketsAfter: tickets,
        ticketsCleared: prev.tickets - tickets,
        excusesBefore: prev.excusesLeft, excusesAfter: fields.excusesLeft,
        fl: prev.fl,
    };
    return { fields, report };
}

export const week = {

    // Re-exported so UI code can reach the names and numbers via the engine.
    WEEK_DIFFS,
    WEEK_TUNING,
    WEEK_DAY_KEYS,
    dayName,
    dayNameValue,

    /**
     * The plain difficulty multiplier - the number the day mode calls
     * state.difficultyMult. Every formula that historically read the identity
     * value (mail chance, email penalties, morning scaling) goes through
     * here, so the week can substitute its ramped value without ever
     * touching difficultyMult itself.
     */
    effMult: function() {
        const w = this.state.week;
        if (w?.active) {
            return WEEK_DIFFS[w.level].base + WEEK_TUNING.ramp * (w.dayIndex - 1);
        }
        return this.state.difficultyMult;
    },

    /**
     * The stat-formula multiplier. In day mode this carries the Wednesday
     * hardening (1.0 becomes 1.1 at the formula site ONLY - see the long
     * comment in engine_events.applyStats). The week has no hidden
     * surcharge: its ramp is honest and lives in effMult().
     */
    statMult: function() {
        if (this.state.week?.active) return this.effMult();
        const m = this.state.difficultyMult;
        return m === 1.0 ? 1.1 : m;
    },

    /**
     * The chosen difficulty as a tier: 1 easy, 2 normal, 3 hard.
     * Replaces the scattered identity checks on difficultyMult (start
     * tickets, achievement grades, valve texts). In day mode the mapping is
     * exactly the historical one; in week mode it follows the chosen level.
     */
    difficultyTier: function() {
        const w = this.state.week;
        if (w?.active) return w.level === 'hard' ? 3 : (w.level === 'normal' ? 2 : 1);
        const m = this.state.difficultyMult;
        return m >= 1.25 ? 3 : (m >= 1.0 ? 2 : 1);
    },

    /** "Montag" ... "Freitag" for headers and logs - rendered on the spot. */
    weekDayName: function() {
        return dayName((this.state.week?.dayIndex ?? 1) - 1);
    },

    /** The same day as a recipe value, for anything that stays on screen. */
    weekDayValue: function(up = false) {
        return dayNameValue((this.state.week?.dayIndex ?? 1) - 1, up);
    },

    /**
     * Puts the engine into week mode and applies Monday's starting
     * condition. The caller is responsible for the surrounding day setup
     * (softReset, boot sequence, morning) - this only sets what the WEEK
     * adds on top of a fresh Monday.
     */
    startWeek: function(level) {
        const cfg = WEEK_DIFFS[level];
        if (!cfg) { console.error('Unknown week difficulty:', level); return; }

        this.state.week = {
            active: true,
            level,
            dayIndex: 1,
            weekLog: [],
            repAtWeekStart: { ...this.state.reputation },
            contingents: {},   // per-pool daily draw budget, computed lazily
        };

        this.state.tickets = cfg.startTickets;
        this.state.al = cfg.startAl;
        this.state.excusesLeft = cfg.excuseStart;

        this.incrementStat('weeksStarted');
        this.incrementStat('weeksStarted_' + level);   // gives the archive bars a base

        this.log({ k: 'week.log.start',
                   v: { mode: { k: `week.diff.${cfg.key}`, up: true } } }, 'text-purple-400 font-bold');
    },

    /** Back to plain day mode. Does not touch the running day. */
    endWeek: function() {
        this.state.week = { active: false, level: null, dayIndex: 1, weekLog: [], repAtWeekStart: {} };
        this.clearWeek();
    },

    /**
     * The night between two week days.
     *
     * Records the day into the week log, advances the calendar, rebuilds the
     * day through freshDay() - the one and only reset path - and then writes
     * the carried fields back. Returns the night report for the night
     * screen; the caller renders it and starts the next morning.
     */
    advanceWeekNight: function() {
        const w = this.state.week;
        if (!w.active || w.dayIndex >= 5) return null;

        const s = this.state;
        const prev = {
            tickets: s.tickets, fl: s.fl, al: s.al, cr: s.cr,
            excusesLeft: s.excusesLeft,
            inventory: s.inventory,
            usedIDs: s.usedIDs, usedEmails: s.usedEmails, storyFlags: s.storyFlags,
            rageWarningReceived: s.rageWarningReceived,
            chefWarningReceived: s.chefWarningReceived,
            lastMoodId: s.lastMoodId,
        };

        // The day's line in the week ledger, for the Friday balance sheet.
        const hist = s.statHistory ?? [];
        w.weekLog.push({
            dayIndex: w.dayIndex,
            endTickets: s.tickets,
            endA: Math.round(s.al), endB: Math.round(s.cr), endL: Math.round(s.fl),
            // `?? 0` like every other reader of a curve point (DayChart,
            // engine_diary, EndModal). This was the one place that trusted the
            // key to be there: a point without `b` made Math.max return NaN,
            // which JSON.stringify writes into the ledger as null - and the
            // save carries it for good. A null point threw outright.
            peakA: Math.max(0, ...hist.map(p => p?.a ?? 0)),
            peakB: Math.max(0, ...hist.map(p => p?.b ?? 0)),
            coffee: s.coffeeConsumed,
            mailsIgnored: s.emailsIgnored,
        });

        const nightIndex = w.dayIndex;              // night 1 follows Monday
        const carry = computeNightCarry(prev, WEEK_DIFFS[w.level], nightIndex);
        w.dayIndex++;
        w.contingents = {};   // recomputed lazily on the first draw of the new day

        // freshDay() first, carry second: a new day field resets like always.
        this.clearDayTimers();
        Object.assign(s, freshDay(s.difficultyMult));
        Object.assign(s, carry.fields);
        s.repAtStart = { ...s.reputation };
        s.blindRun = s.blindStats && s.blindTickets;

        return carry.report;
    },

    // --- DAILY POOL CONTINGENTS (design 6.2) ------------------------------
    // Mirrors tools/simulate-week.mjs (MINC 8, MAXC below, margin 1.3):
    // change the numbers THERE first, verify the corridors, then here.
    // The idle clicks of an exhausted contingent are modelled in the
    // simulator with exactly the week_idle vector (m 20, f 5, a 0), so
    // data/data_special.js week_idle must not drift from those numbers.
    // Deliberately NOT the empty_pool vector any more: its a -5 turned the
    // wall into a farmable aggro faucet (measured 2026-08, see
    // WEEK_CONTINGENTS above).

    /** 'sidequest' (the button) and 'sidequests' (the pool) map to one key. */
    contingentKey: function(type) {
        return type === 'sidequest' ? 'sidequests' : type;
    },

    /**
     * Remaining draws for a pool today. Computed lazily on the first draw
     * of the day - by then trigger() has ensured the pool is loaded, so the
     * night transition stays synchronous and free of data loading. The
     * formula stretches the remaining pool depth over the remaining days
     * with a 30% comfort margin, clamped so the days feel similar.
     */
    weekContingentLeft: function(type) {
        const key = this.contingentKey(type);
        if (!(key in WEEK_CONTINGENTS.max)) return Infinity;   // not contingented
        const c = this.state.week.contingents ?? (this.state.week.contingents = {});
        if (c[key] == null) {
            const pool = DB[key] ?? [];
            const rest = pool.filter(ev =>
                !this.state.usedIDs.has(ev.id) && !(ev.webOnly && platform.isDesktop)).length;
            const days = 6 - this.state.week.dayIndex;         // remaining incl. today
            c[key] = Math.max(WEEK_CONTINGENTS.min,
                     Math.min(Math.ceil(rest / days * 1.3), WEEK_CONTINGENTS.max[key]));
        }
        return c[key];
    },

    /** Books one successful draw against today's budget. No-op in day mode. */
    spendContingent: function(type) {
        if (!this.state.week.active) return;
        const key = this.contingentKey(type);
        if (!(key in WEEK_CONTINGENTS.max)) return;
        const left = this.weekContingentLeft(type);
        this.state.week.contingents[key] = Math.max(0, left - 1);
    },

    /**
     * The pool-specific idle line for an exhausted contingent (and, in week
     * mode, for a truly dry sidequest pool). Falls back to the generic
     * empty_pool line if the data file is older than the engine.
     */
    weekIdleEvent: function(type) {
        const key = this.contingentKey(type);
        return DB.special?.week_idle?.[key] ?? DB.special.empty_pool;
    },

    // --- MODE ENTRY (called from index.html) ------------------------------

    /** Entry from the intro screen: opens the week difficulty picker. */
    startWeekSelect: function() {
        this.playMusic('office');
        this.hideOverlay('intro-modal');
        // Only a stored WEEK is offered here; a stored day waits for its button.
        if (this.offerResume('week')) return;

        // Pinned a state in the settings? Then skip the picker, exactly like
        // the day mode does with its own preset.
        const preset = this.state.defaultWeekDiff;
        if (preset && preset !== 'ask' && WEEK_DIFFS[preset]) {
            this.setWeekDifficulty(preset);
            return;
        }

        const modal = document.getElementById('week-modal');
        if (modal) this.showOverlay(modal);
        else this.setWeekDifficulty('normal');   // markup missing: sensible fallback
    },

    /**
     * Applies the chosen condition and starts Monday. No tutorial here on
     * purpose - it is offered through the day mode only (design 2.1).
     */
    setWeekDifficulty: function(level) {
        this.hideOverlay('week-modal');
        this.disableButtons(true);
        this.startWeek(level);
        this.renderHeader();
        this.updateUI();
        // Registered like every other pending step (DAY_TIMERS): untracked,
        // this reset() fired into whatever existed 500ms later.
        this.state.bootTimer = setTimeout(() => {
            this.state.bootTimer = null;
            this.reset();
        }, 500);
    },

    // --- THE FRIDAY MEETING (design 8.1) ----------------------------------

    /**
     * The guaranteed Friday finale: a chain event from the meeting pool.
     * Reached only through the continue button that resolveTerminal arms
     * after the first transition past 15:00. When tonight's gala will fire
     * (partyInvitation() is deterministic), the meeting opens on its gala
     * node - the announcement comes out of a consultant's mouth.
     */
    triggerMeeting: async function() {
        await ensure('meetings');

        // Set before anything can fail: the walk to the meeting room happens
        // once, whatever the room turns out to contain.
        this.state.meetingDone = true;

        // usedIDs lives inside one week, so without a longer memory the same
        // finale could turn up two weeks in a row - with three chains that is
        // a one-in-three chance. The archive remembers the last few and the
        // pool prefers what the player has not seen; once everything has been
        // seen, the oldest drops out and rotation starts over.
        const recent = this.state.archive.seenMeetings ?? [];
        let pool = (DB.meetings ?? []).filter(ev => !this.state.usedIDs.has(ev.id));
        const unseen = pool.filter(ev => !recent.includes(ev.id));
        if (unseen.length) pool = unseen;

        if (!pool.length) {
            // Should never happen (one meeting per week, weekly usedIDs) -
            // better a fallen-through meeting than a frozen Friday.
            this.log({ k: 'week.log.meetingCancelled' }, 'text-purple-400');
            this.reset();
            return;
        }

        const ev = pool[Math.floor(Math.random() * pool.length)];

        // One slot fewer than the pool holds: the oldest entry always falls
        // out, so the filter can never empty the pool completely.
        const keep = Math.max(1, (DB.meetings ?? []).length - 1);
        this.state.archive.seenMeetings = [...recent.filter(id => id !== ev.id), ev.id].slice(-keep);
        this.saveSystem();

        const galaTonight = !!this.partyInvitation();
        const startNode = (galaTonight && ev.startNodeGala) ? ev.startNodeGala : ev.startNode;

        // Says out loud what resolveTerminal does quietly: no tickets while the
        // meeting runs. A rule the player cannot see is a rule they cannot plan
        // around, and this one decides Fridays. It reads as the joke it is -
        // nobody files a ticket because everybody is sitting in the same room.
        this.log({ k: 'week.log.meetingNoTickets' }, 'text-purple-400');

        this.renderTerminal({ ...ev, startNode }, 'meeting');
    },

    // --- END OF A WEEK DAY ------------------------------------------------

    /**
     * Appends the week note to a fail lead while a week runs.
     *
     * Both halves stay recipes. The lead sits on the end screen for as long as
     * the player wants to read it, and a sentence that has already been
     * rendered cannot follow a language switch - src/engine/recipe.js has the
     * full argument, and `week.endsOn` is the case it was written for: a
     * dictionary sentence with another dictionary sentence inside it.
     */
    weekFailLead: function(base) {
        return this.state.week.active
            ? { k: 'week.endsOn', v: { base, day: this.weekDayValue() } }
            : base;
    },

    /**
     * Queues the night instead of a normal Feierabend (Monday to Thursday).
     * The carry-over is PREVIEWED here so the night screen can show the
     * before/after numbers while chart and report still read the real
     * end-of-day state; advanceWeekNight() recomputes the same deterministic
     * result when the player actually continues.
     */
    /**
     * The line under the headline of the night screen.
     *
     * It used to be a bare countdown - four nights, the same sentence, only
     * the number changing. The state a day ends in says far more about how it
     * went than the number of days left, so the countdown moves to the back
     * and the front belongs to whatever stood out.
     */
    nightLead: function(remaining, report) {
        const rest = remaining === 1 ? { k: 'week.night.lastDay' }
                                     : { k: 'week.night.remaining', v: { days: remaining } };

        // Ceiling: the day ends at ten tickets, and a quarter of nine is
        // three - anything above that can never occur.
        //
        // Written out six times rather than through a little helper on purpose:
        // lint-i18n reads the key off the line it stands on, and a key handed
        // to a function is as invisible to it as a computed one.
        if (report.ticketsAfter >= 3)  return { k: 'week.night.tickets', v: { rest } };
        if (report.ticketsAfter === 0) return { k: 'week.night.clean', v: { rest } };
        if (report.alAfter >= 55)      return { k: 'week.night.aggro', v: { rest } };
        if (report.crAfter >= 55)      return { k: 'week.night.radar', v: { rest } };
        if (report.fl >= 60)           return { k: 'week.night.lazy', v: { rest } };
        return { k: 'week.night.plain', v: { rest } };
    },

    queueNightEnd: function() {
        const s = this.state;
        this.recordDayResult('survived');   // streak and daysSurvived count week days

        const preview = computeNightCarry({
            tickets: s.tickets, fl: s.fl, al: s.al, cr: s.cr,
            excusesLeft: s.excusesLeft,
            inventory: s.inventory, usedIDs: s.usedIDs, usedEmails: s.usedEmails,
            storyFlags: s.storyFlags,
            rageWarningReceived: s.rageWarningReceived,
            chefWarningReceived: s.chefWarningReceived,
            lastMoodId: s.lastMoodId,
        }, WEEK_DIFFS[s.week.level], s.week.dayIndex);

        const remaining = 5 - s.week.dayIndex;

        // One line about the night itself (data_special.week_sleep): level
        // picks the register, 'worn' takes over once the wear shows.
        //
        // The DRAW is recorded, not its result (6.1). This line sits on a screen
        // the player holds open, and it is prose from the data tree - so it
        // travels as a path into that tree and is resolved on the way to the
        // screen. Both trees carry the same list lengths (lint-parity), so the
        // index lands on the counterpart of the same sentence.
        const level = s.week.level;
        const sleepStage = s.week.dayIndex >= 3 ? 'worn' : 'fresh';
        const sleepLines = DB.special?.week_sleep?.[level]?.[sleepStage] ?? [];

        // Monday and Tuesday both draw from "fresh", Wednesday and Thursday
        // both from "worn" - with two lines per stage that made a repeat
        // inside a single week a 75% affair. Remembering the last one takes
        // that down to zero as long as a stage holds more than one line.
        //
        // Remembered as an INDEX, and only within the same register: the old
        // guard compared the finished sentence, which no longer exists here,
        // and an index from the other stage would name a different line.
        let choices = sleepLines.map((_, i) => i);
        const last = this._lastSleep;
        if (choices.length > 1 && last && last.level === level && last.stage === sleepStage) {
            const unheard = choices.filter(i => i !== last.index);
            if (unheard.length) choices = unheard;
        }

        if (choices.length) {
            const index = choices[Math.floor(Math.random() * choices.length)];
            preview.report.sleep = { ref: { p: 'special', path: ['week_sleep', level, sleepStage, index] } };
            this._lastSleep = { level, stage: sleepStage, index };
        } else {
            preview.report.sleep = null;
        }

        s.pendingEnd = {
            isNight: true,
            title: { k: 'week.night.title', v: { day: this.weekDayValue(true) } },
            lead: this.nightLead(remaining, preview.report),
            diary: this.generateDiaryEntry('WIN'),
            night: preview.report,
            // Tomorrow, as a recipe: it names the button and the carry-over
            // header, and both are read on a screen that stands still.
            nextDay: dayNameValue(s.week.dayIndex),
        };
    },

    /** Renders the night screen through the end-modal component. */
    showNightScreen: function(end) {
        this.state.modal = {
            open: true, isEnd: false, isNight: true, isWeek: true,
            title: end.title, lead: end.lead, text: '',
            cause: null, diary: end.diary,
            night: end.night, nextDay: end.nextDay,
        };
        this.showOverlay(document.getElementById('modal-overlay'));
    },

    /**
     * The "Weiter zu Dienstag" button: performs the night, saves the
     * checkpoint and boots into the next morning. The morning end-check in
     * triggerMorningMood() then decides whether the day even starts.
     */
    continueWeekNight: function() {
        this.playAudio('ui');
        // dismissModal, NOT closeModal: closeModal runs updateUI, whose
        // checkEndConditions re-reads the DYING day - pendingEnd is already
        // null, the clock still stands past 16:30, so queueNightEnd() fired a
        // second time and recordDayResult('survived') double-counted every
        // week night into the archive and the Steam stats. The exact trap the
        // dismissModal doc-comment describes; advanceWeekNight repaints
        // through reset() anyway.
        this.dismissModal();

        this.advanceWeekNight();
        this.saveWeek();                        // the night IS the checkpoint
        this.syncRun(true);                     // and the moment one switches machines

        document.getElementById('email-modal')?.classList.add('hidden');
        this.renderHeader();
        this.updateUI();
        // Five mornings a week, and it used to be the same sentence every
        // time. The weekday itself carries meaning, so the line varies with it.
        // i18n-uses: week.morning.2, week.morning.3, week.morning.4, week.morning.5
        const dayIndex = this.state.week.dayIndex;
        const morning = dayIndex >= 2 && dayIndex <= 5
            ? { k: `week.morning.${dayIndex}` }
            : { k: 'week.morning.other', v: { day: { k: `week.day.${WEEK_DAY_KEYS[dayIndex - 1] ?? WEEK_DAY_KEYS[0]}` } } };
        this.log(morning, 'text-purple-400');

        this.playBootSequence(() => { this.reset(); });
    },

    // --- END OF THE WEEK --------------------------------------------------

    /**
     * Any real ending while a week runs: records the week statistics, builds
     * the balance sheet and shows the final screen. Called by finishGame().
     */
    finishWeek: function(end) {
        const w = this.state.week;
        const daysCompleted = end.isWin ? 5 : w.dayIndex - 1;
        const outcome = end.isWin ? 'survived' : (end.cause === 'rage' ? 'rage' : 'fired');

        this.recordWeekResult(outcome, daysCompleted);   // reads difficultyKey -> before endWeek
        end.balance = this.buildWeekBalance(end);        // reads week.weekLog -> before endWeek
        // endWeek() below clears week.active, so the screen cannot ask the
        // state what mode it belonged to - it travels on the end object.
        //
        // The level and the day travel for the same reason, and as an ID and a
        // NUMBER rather than as words: the day report used to name neither and
        // fell back on difficultyMult, which stays at 1.0 in a week by design -
        // so it read "WEDNESDAY (normal)" on every day of every week, directly
        // under a balance sheet headed IN NEED OF LEAVE.
        end.isWeek = true;
        end.weekMode = this.WEEK_DIFFS[w.level].key;
        end.weekDay = w.dayIndex;

        this.clearDay();
        this.endWeek();                                  // week.active off, slot cleared
        this.syncRun(true);                              // the empty slot travels at once
        this.showEnd(end);
    },

    /** The week-level counters, mirroring recordDayResult(). */
    recordWeekResult: function(outcome, daysCompleted) {
        const st = this.state.archive.stats ?? (this.state.archive.stats = {});
        const bump = (key) => {
            st[key] = (st[key] || 0) + 1;
            platform.stat(key, st[key]);
        };

        // The week's own streak: completed weeks in a row. A failed week
        // breaks it, exactly like a failed day breaks the day streak.
        if (outcome === 'survived') {
            st.weekStreak = (st.weekStreak || 0) + 1;
            if (st.weekStreak > (st.weekStreakBest || 0)) st.weekStreakBest = st.weekStreak;
        } else {
            st.weekStreak = 0;
        }

        if (outcome === 'survived') {
            bump('weeksSurvived');
            // Own namespace on purpose: survived_week_easy already counts the
            // WEEK DAYS (recordDayResult via difficultyKey, parallel to
            // started_week_easy). The completed week gets its own key.
            bump('weeksSurvived_' + this.state.week.level);

            // The week-mode achievements. Grades follow difficultyTier(),
            // so a hard week records as hard like everything else.
            // All three grade through difficultyTier() like every other
            // achievement: earning one on Urlaubsreif upgrades the badge.
            // Nothing here may be locked to a single level - that would give
            // the badge a grade it can never improve on.
            this.unlockAchievement('ach_week');
            if (!this.state.rageWarningReceived && !this.state.chefWarningReceived) {
                this.unlockAchievement('ach_week_iron');
            }
            if (this.state.tickets === 0) {
                this.unlockAchievement('ach_week_clean');
            }
        } else {
            bump(outcome === 'rage' ? 'weeksRageQuit' : 'weeksFired');
        }

        // The weekly valve flags count once per week (recordDayResult skips
        // them while a week runs, see the comment there). Week keys on
        // purpose: the archive footnote switches with the panel, and the
        // plain keys hold every pre-week career, so they stay day mode only.
        // careerStats() adds both back together for the personnel file.
        if (this.state.rageWarningReceived) bump('weekVentSaves');
        if (this.state.chefWarningReceived) bump('weekWarningsChef');

        // The mode's headline number: how far did the run get?
        st.weekBestDay = Math.max(st.weekBestDay || 0, daysCompleted);

        this.saveSystem();
    },

    /**
     * The balance sheet: one line per day, then the week totals.
     *
     * NUMBERS, not markup (6.1). Up to here this built the finished HTML and
     * handed it to the end screen as a string, which froze it in the language
     * it was built in - the one block on that screen made entirely of figures
     * was also the one that could not follow a switch. components/WeekBalance
     * .svelte draws it now and reads every word through t() on the way past.
     *
     * That fixes a second thing at the same time. endWeek() empties state.week
     * a line later, so the old builder HAD to run before it and could never be
     * called again; the comment saying so was the only thing keeping the order
     * honest, and the gala forgot it once already. A snapshot cannot forget: it
     * carries what it needs.
     *
     * Each day closes with the values it handed to the next morning, not with
     * its peak - the peak was a number without consequences, while these three
     * are exactly what the night worked on and what the following day started
     * from. The letters of the legend belong to the DICTIONARY (German shortens
     * Faulheit/Aggro/Chef to F/A/C, English Laziness/Aggro/Boss to L/A/B,
     * GLOSSAR SS3a) and now sit next to the rows that use them, in one file.
     *
     * @returns {{mode: string, rows: object[], coffee: number, mails: number}}
     */
    buildWeekBalance: function(end) {
        const s = this.state, w = s.week;
        const round = (row) => ({ ...row, l: Math.round(row.l), a: Math.round(row.a), b: Math.round(row.b) });

        // day is the 0-based index components/WeekBalance.svelte hands to
        // dayName() - an index, never the word, for the reason WEEK_DAY_KEYS
        // exists at all.
        const rows = w.weekLog.map(d => round({
            day: d.dayIndex - 1, win: true,
            tickets: d.endTickets, l: d.endL ?? 0, a: d.endA ?? 0, b: d.endB ?? 0
        }));

        rows.push(end.isWin
            ? round({ day: w.dayIndex - 1, win: true, tickets: s.tickets, l: s.fl, a: s.al, b: s.cr })
            // The failed day names its cause instead of its figures, and the
            // title is a recipe by now - so it is passed on, not rendered.
            : { day: w.dayIndex - 1, win: false, title: end.title });

        return {
            mode: WEEK_DIFFS[w.level].key,
            rows,
            coffee: w.weekLog.reduce((n, d) => n + (d.coffee || 0), 0) + s.coffeeConsumed,
            mails:  w.weekLog.reduce((n, d) => n + (d.mailsIgnored || 0), 0) + s.emailsIgnored,
        };
    },

    // --- RESUME & RESTART -------------------------------------------------

    /** Restores a saved week; the resume dialog routes here via resumeDay(). */
    resumeWeek: function() {
        const p = this.loadWeek();
        if (!p) { this.reset(); return; }

        // migrateWeekLog for the same reason applyRestoredDay migrates the
        // curve: a week row from 5.0 spells its three values differently.
        this.state.week = { ...p.week, weekLog: this.migrateWeekLog([...(p.week.weekLog ?? [])]) };
        this.applyRestoredDay(p.day);
        if (p.reputation) {
            for (const [name, val] of Object.entries(p.reputation)) this.state.reputation[name] = val;
        }

        this.hideOverlay('resume-modal');
        this.renderHeader();
        this.updateUI();
        this.playMusic('office');
        this.updatePresence('system');
        this.disableButtons(false);

        // A night checkpoint stores an unplayed morning: route through the
        // morning (and its end-check) instead of dropping into idle.
        if (!this.state.morningMoodShown) {
            this.reset();
            return;
        }

        this.setTerminalIdle();
        this.log({ k: 'week.log.resumed',
                   v: { day: { k: `week.day.${WEEK_DAY_KEYS[(this.state.week?.dayIndex ?? 1) - 1] ?? WEEK_DAY_KEYS[0]}` } } },
                 'text-purple-400');
    },

    /**
     * "Neustart" while a week runs: back to Monday, same condition.
     *
     * The day mode's restart throws away the current run and begins it again,
     * and in the week mode the run IS the week - restarting only the current
     * day would quietly mean something else than the same button does one
     * mode over. The old week save is dropped first, so a later resume cannot
     * pull the abandoned attempt back in.
     *
     * This counts as a new attempt (startWeek raises weeksStarted), exactly
     * like a restarted day counts as a newly started day. Resuming an
     * interrupted run counts nothing - that path never comes through here.
     */
    softResetWeek: function() {
        const level = this.state.week.level;
        this.stopMusic();
        this.clearDayTimers();
        this.closeSettings();
        this.dismissModal();
        document.getElementById('email-modal')?.classList.add('hidden');

        this.endWeek();                       // week off, saved slot dropped
        if (!level) {                         // should not happen, but never strand the player
            this.log({ k: 'week.log.noRun' }, 'text-orange-400');
            this.softReset();
            return;
        }

        Object.assign(this.state, freshDay(this.state.difficultyMult));
        this.state.repAtStart = { ...this.state.reputation };
        this.state.blindRun = this.state.blindStats && this.state.blindTickets;
        this.state.phone = { open: false, notification: false, appName: '', messages: [], options: [], node: null };

        this.startWeek(level);                // Monday again, with its starting condition
        this.renderHeader();
        this.log({ k: 'week.log.restart' }, 'text-purple-400');
        this.updateUI();

        this.playBootSequence(() => { this.reset(); });
    },

    // --- WEEK SAVE SLOT ---------------------------------------------------
    // Mirrors saveDay(): the week and the day-in-progress travel together in
    // one payload under KEYS.weekState. saveDay() delegates here while a
    // week is running, so the day slot can never hold a half-week.

    saveWeek: function() {
        if (!this.state.week.active) return;
        if (this.state.activeEvent || this.state.pendingEnd || this.state.isPartyMode) return;

        try {
            const day = snapshotDay(this.state);
            const payload = {
                week: { ...this.state.week, weekLog: [...this.state.week.weekLog] },
                day,
                reputation: { ...this.state.reputation },
                savedAt: Date.now(),
            };
            localStorage.setItem(KEYS.weekState, JSON.stringify(payload));
            this.syncRun();
        } catch (e) {
            // Storage full or private mode: the week carries on unsaved.
            console.warn('The week could not be saved:', e);
        }
    },

    /** Is there an interrupted week? Returns the payload or null. */
    loadWeek: function() {
        try {
            const raw = localStorage.getItem(KEYS.weekState);
            if (!raw) return null;
            const p = JSON.parse(raw);
            if (!p?.week?.active) return null;
            if (!(p.week.dayIndex >= 1 && p.week.dayIndex <= 5)) return null;
            if (!WEEK_DIFFS[p.week.level]) return null;
            // The day was the one part nobody checked. resumeWeek hands it
            // straight to applyRestoredDay, which does Object.entries(day) and
            // throws on a missing one - the engine died behind the resume
            // dialog, which had already guarded itself with `p.day?.time ?? 480`
            // one file away.
            if (!p.day || typeof p.day !== 'object' || Array.isArray(p.day)) return null;
            return p;
        } catch {
            return null;
        }
    },

    /** Discards the saved week (week over, or a deliberate restart). */
    clearWeek: function() {
        try {
            localStorage.removeItem(KEYS.weekState);
            // See engine_core.clearDay(): an empty slot has to carry WHEN it
            // became empty, or the cloud reads it as "no week, as of now".
            localStorage.setItem(KEYS.weekClearedAt, String(Date.now()));
        } catch { /* never mind */ }
    },

};
