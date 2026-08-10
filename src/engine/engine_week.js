import { KEYS } from './keys.js';
import { freshDay, DAY_TIMERS } from './engine_state.svelte.js';
import { platform } from '../platform.js';
import { DB, ensure } from '../data.js';

/**
 * The week run (v4.2): a roguelike Monday-to-Friday campaign.
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
export const WEEK_DIFFS = {
    easy:   { name: 'Erholt',      base: 0.75, startTickets: 0, startAl: 0,  excuseStart: 3, excuseCap: 5, rAl: 0.72, rCr: 0.60 },
    normal: { name: 'Genervt',     base: 0.85, startTickets: 1, startAl: 0,  excuseStart: 2, excuseCap: 4, rAl: 0.60, rCr: 0.48 },
    hard:   { name: 'Urlaubsreif', base: 0.95, startTickets: 2, startAl: 10, excuseStart: 1, excuseCap: 3, rAl: 0.42, rCr: 0.30 },
};

export const WEEK_DAY_NAMES = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

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
    WEEK_DAY_NAMES,

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

    /** "Montag" ... "Freitag" for headers, logs and the night screen. */
    weekDayName: function() {
        return WEEK_DAY_NAMES[(this.state.week?.dayIndex ?? 1) - 1];
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

        this.log(`Modus: ARBEITSWOCHE (${cfg.name.toUpperCase()}). Fünf Tage. Alles zählt.`, 'text-purple-400 font-bold');
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
            endAl: Math.round(s.al), endCr: Math.round(s.cr), endFl: Math.round(s.fl),
            peakA: Math.max(0, ...hist.map(p => p.a)),
            peakC: Math.max(0, ...hist.map(p => p.c)),
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
        setTimeout(() => { this.reset(); }, 500);
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
        const gesehen = this.state.archive.seenMeetings ?? [];
        let pool = (DB.meetings ?? []).filter(ev => !this.state.usedIDs.has(ev.id));
        const frisch = pool.filter(ev => !gesehen.includes(ev.id));
        if (frisch.length) pool = frisch;

        if (!pool.length) {
            // Should never happen (one meeting per week, weekly usedIDs) -
            // better a fallen-through meeting than a frozen Friday.
            this.log("Der Besprechungsraum ist doppelt gebucht. Das Meeting fällt aus. Niemand beschwert sich.", "text-purple-400");
            this.reset();
            return;
        }

        const ev = pool[Math.floor(Math.random() * pool.length)];

        // One slot fewer than the pool holds: the oldest entry always falls
        // out, so the filter can never empty the pool completely.
        const merken = Math.max(1, (DB.meetings ?? []).length - 1);
        this.state.archive.seenMeetings = [...gesehen.filter(id => id !== ev.id), ev.id].slice(-merken);
        this.saveSystem();

        const galaTonight = !!this.partyInvitation();
        const startNode = (galaTonight && ev.startNodeGala) ? ev.startNodeGala : ev.startNode;

        this.renderTerminal({ ...ev, startNode }, 'meeting');
    },

    // --- END OF A WEEK DAY ------------------------------------------------

    /** Appends the week note to a fail lead while a week runs. */
    weekFailLead: function(base) {
        return this.state.week.active
            ? `${base} Die Woche endet am ${this.weekDayName()}.`
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
        const rest = remaining === 1 ? "Nur noch der Freitag."
                                     : `Noch ${remaining} Tage.`;

        // Ceiling: the day ends at ten tickets, and a quarter of nine is
        // three - anything above that can never occur.
        if (report.ticketsAfter >= 3)  return `Drei Tickets nimmst du mit ins Bett. ${rest}`;
        if (report.ticketsAfter === 0) return `Keine offenen Tickets. Das gab es lange nicht. ${rest}`;
        if (report.alAfter >= 55)      return `Der Puls ist immer noch oben. ${rest}`;
        if (report.crAfter >= 55)      return `Der Chef hat sich deinen Namen notiert. ${rest}`;
        if (report.fl >= 60)           return `Du hast heute wenig bewegt und viel überstanden. ${rest}`;
        return `16:30 Uhr. ${rest}`;
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
        const sleepPool = DB.special?.week_sleep?.[s.week.level];
        const sleepStage = s.week.dayIndex >= 3 ? 'worn' : 'fresh';
        // Monday and Tuesday both draw from "fresh", Wednesday and Thursday
        // both from "worn" - with two lines per stage that made a repeat
        // inside a single week a 75% affair. Remembering the last one takes
        // that down to zero as long as a stage holds more than one line.
        let sleepLines = sleepPool?.[sleepStage] ?? [];
        if (sleepLines.length > 1 && this._lastSleepText) {
            const frisch = sleepLines.filter(z => z !== this._lastSleepText);
            if (frisch.length) sleepLines = frisch;
        }
        preview.report.sleepText = sleepLines.length
            ? sleepLines[Math.floor(Math.random() * sleepLines.length)]
            : '';
        this._lastSleepText = preview.report.sleepText;

        s.pendingEnd = {
            isNight: true,
            title: `${this.weekDayName().toUpperCase()} GESCHAFFT`,
            lead: this.nightLead(remaining, preview.report),
            diary: this.generateDiaryEntry('WIN'),
            night: preview.report,
            nextDay: WEEK_DAY_NAMES[s.week.dayIndex],
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
        this.closeModal();

        this.advanceWeekNight();
        this.saveWeek();                        // the night IS the checkpoint
        this.syncRun(true);                     // and the moment one switches machines

        document.getElementById('email-modal')?.classList.add('hidden');
        this.renderHeader();
        this.updateUI();
        // Five mornings a week, and it used to be the same sentence every
        // time. The weekday itself carries meaning, so the line varies with it.
        const MORGEN = {
            2: 'Dienstag. Der Montag hat sich nicht von selbst erledigt.',
            3: 'Mittwoch. Bergfest, sagen Leute, die nicht in der IT arbeiten.',
            4: 'Donnerstag. Der Freitag ist in Sichtweite und das macht es nicht besser.',
            5: 'Freitag. Einmal noch.',
        };
        this.log(MORGEN[this.state.week.dayIndex] ?? `${this.weekDayName()}. Neuer Tag, alter Backlog.`,
                 'text-purple-400');

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
        end.text = this.buildWeekBalanceHTML(end);
        // endWeek() below clears week.active, so the screen cannot ask the
        // state what mode it belonged to - it travels on the end object.
        end.isWeek = true;

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
            this.unlockAchievement('ach_week', '🗓️ Wochenendlich', 'Fünf Tage am Stück überstanden. Das Wochenende ist diesmal verdient.');
            if (!this.state.rageWarningReceived && !this.state.chefWarningReceived) {
                this.unlockAchievement('ach_week_iron', '🧊 Eisern', 'Fünf Tage ohne Ventil und ohne Abmahnung. Die Personalabteilung ist beunruhigt.');
            }
            if (this.state.tickets === 0) {
                this.unlockAchievement('ach_week_clean', '🧹 Blanker Freitag', 'Freitagabend, Warteschlange leer. Montag beginnt zum ersten Mal bei null.');
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
     * Each day closes with the values it handed to the next morning, not with
     * its peak - the peak was a number without consequences, while these three
     * are exactly what the night worked on and what the following day started
     * from. Abbreviated F/A/C to keep the row on one line; the header carries
     * the legend once.
     */
    buildWeekBalanceHTML: function(end) {
        const s = this.state, w = s.week;
        const line = (icon, name, right) =>
            `<div class="flex justify-between gap-4"><span>${icon} ${name}</span><span class="text-slate-400">${right}</span></div>`;
        const values = (tickets, fl, al, cr) =>
            `${tickets} Tickets · F ${Math.round(fl)} · A ${Math.round(al)} · C ${Math.round(cr)}`;

        const rows = w.weekLog.map(d => line('✓', WEEK_DAY_NAMES[d.dayIndex - 1],
            values(d.endTickets, d.endFl ?? 0, d.endAl ?? 0, d.endCr ?? 0)));

        rows.push(end.isWin
            ? line('✓', WEEK_DAY_NAMES[w.dayIndex - 1], values(s.tickets, s.fl, s.al, s.cr))
            : line('✗', WEEK_DAY_NAMES[w.dayIndex - 1], end.title));

        const coffee = w.weekLog.reduce((n, d) => n + (d.coffee || 0), 0) + s.coffeeConsumed;
        const mails  = w.weekLog.reduce((n, d) => n + (d.mailsIgnored || 0), 0) + s.emailsIgnored;

        return `<div class="bg-slate-950 border border-slate-700 rounded-lg p-4 my-3 text-left font-mono text-xs space-y-1">` +
            `<div class="flex justify-between items-baseline gap-4 mb-2">` +
                `<span class="text-[10px] uppercase tracking-widest text-purple-400">Wochen-Bilanz · ${WEEK_DIFFS[w.level].name}</span>` +
                `<span class="text-[9px] text-slate-600">F Faulheit · A Aggro · C Chef</span>` +
            `</div>` +
            rows.join('') +
            `<div class="pt-2 mt-2 border-t border-slate-800 text-slate-400">☕ ${coffee}× Kaffee · 📧 ${mails} Mails ignoriert</div>` +
            `</div>`;
    },

    // --- RESUME & RESTART -------------------------------------------------

    /** Restores a saved week; the resume dialog routes here via resumeDay(). */
    resumeWeek: function() {
        const p = this.loadWeek();
        if (!p) { this.reset(); return; }

        this.state.week = { ...p.week, weekLog: [...(p.week.weekLog ?? [])] };
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
        this.log(`Sitzung wiederhergestellt. ${this.weekDayName()}, die Woche läuft weiter...`, "text-purple-400");
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
        const overlay = document.getElementById('modal-overlay');
        if (overlay) this.hideOverlay(overlay);
        document.getElementById('email-modal')?.classList.add('hidden');

        this.endWeek();                       // week off, saved slot dropped
        if (!level) {                         // should not happen, but never strand the player
            this.log("Kein Wochenlauf gefunden. Zurück in den Tagesmodus.", "text-orange-400");
            this.softReset();
            return;
        }

        Object.assign(this.state, freshDay(this.state.difficultyMult));
        this.state.repAtStart = { ...this.state.reputation };
        this.state.blindRun = this.state.blindStats && this.state.blindTickets;
        this.state.phone = { open: false, notification: false, appName: '', messages: [], options: [] };

        this.startWeek(level);                // Monday again, with its starting condition
        this.renderHeader();
        this.log("Zurück auf Montag. Neue Woche, gleiche Firma.", "text-purple-400");
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
            const day = {};
            for (const key of Object.keys(freshDay())) {
                if (DAY_TIMERS.includes(key)) continue;
                const value = this.state[key];
                day[key] = value instanceof Set ? [...value] : value;
            }
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
            console.warn('Woche konnte nicht gesichert werden:', e);
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
            return p;
        } catch {
            return null;
        }
    },

    /** Discards the saved week (week over, or a deliberate restart). */
    clearWeek: function() {
        try { localStorage.removeItem(KEYS.weekState); } catch { /* never mind */ }
    },

};
