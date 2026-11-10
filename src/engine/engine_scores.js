/**
 * What a finished run is worth on Steam's leaderboards (desktop only).
 *
 * A module of its own since the day boards (7.1): the week's submit used to
 * live in engine_week, and the day's has no business there. Both build a run
 * from the state at the moment it ended, hand it to engine/leaderboard.js for
 * the score and the detail values, and send it through sendScore(), which is
 * the one place that talks to the platform and the one that writes
 * state.scoreSubmit.
 *
 * WHO CALLS WHAT, and the order is load-bearing:
 *   submitWeekScore  finishWeek() and the Friday gala in engine_events - both
 *                    BEFORE endWeek(), which empties the level, the day and
 *                    the ledger read here.
 *   submitDayScore   finishGame() for a day that ends in the day mode, and the
 *                    gala that follows a day - BEFORE clearDay().
 * A third way to end a run needs the call too, or that run never reaches a
 * board and nothing says so.
 */
import { platform } from '../platform.js';
import { weekEntry, dayEntry } from './leaderboard.js';

export const scores = {
    /**
     * A finished week, won or lost. `cause` is the end's cause; a won week
     * that was not the gala is a week that ran out of time.
     */
    submitWeekScore: function(won, cause) {
        if (!platform.isDesktop) return;
        const s = this.state, w = s.week, f = this.closingDay();
        this.sendScore('week', w.level, weekEntry({
            level: w.level, won, cause: won && cause !== 'gala' ? 'time' : cause,
            day: w.dayIndex, time: f.time,
            tickets: f.tickets, l: f.fl, a: f.al, b: f.cr,
            valve: s.rageWarningReceived, warning: s.chefWarningReceived,
            log: w.weekLog,
        }));
    },

    /**
     * A finished day of the day mode - never a day inside a week, which is
     * scored with the week it belongs to. The level is the weekday the day was
     * played as, under the keys the archive counts it by.
     */
    submitDayScore: function(won, cause) {
        if (!platform.isDesktop || this.state.week.active) return;
        const s = this.state, level = this.difficultyKey(), f = this.closingDay();
        this.sendScore('day', level, dayEntry({
            level, won, cause: won && cause !== 'gala' ? 'time' : cause,
            time: f.time,
            tickets: f.tickets, l: f.fl, a: f.al, b: f.cr,
            valve: s.rageWarningReceived, warning: s.chefWarningReceived,
        }));
    },

    /**
     * The figures the working day ended on. Usually the state itself; after
     * a gala, what it held at 16:30 - startParty() wipes the three stats and
     * sets the clock to 17:00, and the run is the day, not the evening.
     * buildWeekBalance() reads the same, so a Friday's row on the balance
     * sheet and on the leaderboard cannot tell two different stories.
     */
    closingDay: function() {
        return this.state.closingFigures ?? this.state;
    },

    /**
     * Sends an entry and keeps the answer for the end screen. The answer
     * arrives later; state.scoreSubmit carries it there, and the screen says
     * what the run was worth and whether it beat the stored one. `mode` rides
     * along so a screen can never show a day's answer under a week. Runtime
     * only, never saved.
     */
    sendScore: function(mode, level, entry) {
        const s = this.state;
        s.scoreSubmit = { pending: true, mode, score: entry.score, level };
        const settle = (res) => {
            s.scoreSubmit = res?.ok
                ? { pending: false, mode, score: entry.score, level, scoreChanged: !!res.scoreChanged, rank: res.rank }
                : { pending: false, mode, failed: true, score: entry.score, level };
        };
        platform.leaderboardSubmit(entry.board, entry.score, entry.details).then(settle, () => settle(null));
    },
};
