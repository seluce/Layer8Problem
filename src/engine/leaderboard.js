/**
 * The leaderboards: what a finished day or week is worth, and what travels
 * with the score to Steam.
 *
 * Pure on purpose - no state, no DOM, no runes - so the Node tests can hold the
 * scoring and the wire format without a game around them. engine_scores builds
 * a run from the state and hands the result to platform.leaderboardSubmit();
 * components/LeaderboardView.svelte reads entries back through decodeDetails().
 *
 * Three boards per mode, one per level. A single list would be filled from the
 * top by the easy level: in npm run sim:week a sensible player finishes 85 %
 * of the "rested" weeks and only 35 % of the hardest, so a finished hard week
 * would sink among easy ones. The "All" tab merges the three in the game
 * instead.
 *
 * The day boards came in 7.1. Until then only a week was scored, and a player
 * who had played the day mode - the one the start screen offers first - found
 * an empty leaderboard and took it for broken.
 */

/** The working day runs 08:00 to 16:30, in minutes since midnight. */
export const SHIFT_START = 8 * 60;
export const SHIFT_END = 16 * 60 + 30;
export const SHIFT_MINUTES = SHIFT_END - SHIFT_START;        // 510
export const WEEK_MINUTES = 5 * SHIFT_MINUTES;               // 2550

/** What a finished day or week can earn on top of its minutes. */
export const COMPOSURE_MAX = 300;

/** The ceilings, which the main process holds every upload to. */
export const DAY_MAX = SHIFT_MINUTES + COMPOSURE_MAX;        // 810
export const WEEK_MAX = WEEK_MINUTES + COMPOSURE_MAX;        // 2850

/**
 * Steam's API names for the boards, by mode and level. The main process keeps
 * its own copy as an allow-list (electron/main.cjs cannot import this file:
 * only docs/ and electron/ are packaged), and week-flow.test.mjs holds the two
 * together.
 */
export const MODES = ['day', 'week'];
export const BOARD_NAMES = {
    day:  { easy: 'day_easy',  normal: 'day_normal',  hard: 'day_hard' },
    week: { easy: 'week_easy', normal: 'week_normal', hard: 'week_hard' },
};

/** Ids, in the order their codes are written. The index IS the code on the wire. */
export const LEVELS = ['easy', 'normal', 'hard'];
export const CAUSES = ['time', 'rage', 'chef', 'tickets', 'gala'];

/**
 * The layout of the detail values, version 1. Steam keeps up to 64 int32 per
 * entry, and they are read back by position - so a position never changes
 * its meaning. A new field goes on the end with a new FORMAT, and
 * decodeDetails() keeps reading the old one.
 */
export const FORMAT = 1;
const AT = {
    format: 0, level: 1, cause: 2, day: 3, time: 4,
    tickets: 5, l: 6, a: 7, b: 8, flags: 9,
    days: 10,            // five days x (tickets, l, a, b), -1 for a day not reached
};
const DAY_FIELDS = 4;
const LENGTH = AT.days + 5 * DAY_FIELDS;                     // 30
const FLAG_VALVE = 1, FLAG_WARNING = 2;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const int = (v) => Math.round(Number(v) || 0);

/**
 * How calm the run ended - the day at closing time, the week on Friday: up to
 * 100 each for little aggro, little boss radar and few open tickets. Laziness is shown but not scored - in this game
 * it is a risk and a virtue at once.
 */
export function composure({ tickets, a, b }) {
    const low = (v) => clamp(100 - int(v), 0, 100);
    return low(a) + low(b) + clamp(100 - 10 * int(tickets), 0, 100);
}

/**
 * Points for a week: one per working minute survived, and for a finished week
 * the composure bonus on top. A finished week therefore always outranks one
 * that failed, however late: a loss is held below WEEK_MINUTES, and a loss
 * at 16:30 on Wednesday below the Thursday morning it never reached.
 */
export function weekScore(run) {
    if (run.won) return WEEK_MINUTES + composure(run);
    const today = clamp(int(run.time) - SHIFT_START, 0, SHIFT_MINUTES - 1);
    return clamp((int(run.day) - 1) * SHIFT_MINUTES + today, 0, WEEK_MINUTES - 1);
}

/**
 * Points for a day, by the week's rule: one per working minute survived, and
 * for a finished day the composure bonus on top - so a finished day always
 * outranks one that failed, however late.
 */
export function dayScore(run) {
    if (run.won) return SHIFT_MINUTES + composure(run);
    return clamp(int(run.time) - SHIFT_START, 0, SHIFT_MINUTES - 1);
}

/**
 * The detail values for a run.
 *
 * A day is written in the same layout as a week, as a week of one day: day 1,
 * no ledger, and its figures in the first day's place. One format, one reader,
 * and the board it was sent to says which kind it is.
 *
 * `log` is week.weekLog - one row per day already slept on. The day the week
 * ended on is not in it yet; its figures are the run's own, taken at the
 * moment it ended, which is what "with which values did it end" means.
 *
 * One value more than the layout holds: steamworks-ffi-node 0.11.3 reads the
 * details back with koffi.decode(ptr, 'int32', j), whose third argument is a
 * LENGTH, not an index - entry j comes back as the first j values, and the
 * last value is lost. The trailing zero is that value. normalizeDetails()
 * reads both the broken shape and a fixed one.
 */
export function encodeDetails(run) {
    const out = new Array(LENGTH).fill(-1);
    out[AT.format] = FORMAT;
    out[AT.level] = Math.max(0, LEVELS.indexOf(run.level));
    out[AT.cause] = Math.max(0, CAUSES.indexOf(run.cause));
    out[AT.day] = clamp(int(run.day), 1, 5);
    out[AT.time] = int(run.time);
    out[AT.tickets] = int(run.tickets);
    out[AT.l] = int(run.l);
    out[AT.a] = int(run.a);
    out[AT.b] = int(run.b);
    out[AT.flags] = (run.valve ? FLAG_VALVE : 0) | (run.warning ? FLAG_WARNING : 0);

    const write = (index, row) => {
        const at = AT.days + index * DAY_FIELDS;
        out[at] = int(row.tickets); out[at + 1] = int(row.l);
        out[at + 2] = int(row.a);   out[at + 3] = int(row.b);
    };
    for (const row of run.log ?? []) {
        const index = int(row.dayIndex) - 1;
        if (index >= 0 && index < 5) {
            // `?? 0` like every other reader of a ledger row - see weekLog.
            write(index, { tickets: row.endTickets ?? 0, l: row.endL ?? 0, a: row.endA ?? 0, b: row.endB ?? 0 });
        }
    }
    write(out[AT.day] - 1, run);

    out.push(0);                 // the value the library's read loses, see above
    return out;
}

/** Everything a submitted week needs: the board, the score and its details. */
export function weekEntry(run) {
    return { board: BOARD_NAMES.week[run.level] ?? BOARD_NAMES.week.normal, score: weekScore(run), details: encodeDetails(run) };
}

/** The same for a day; see encodeDetails() for how a day is written. */
export function dayEntry(run) {
    const day = { ...run, day: 1, log: [] };
    return { board: BOARD_NAMES.day[run.level] ?? BOARD_NAMES.day.normal, score: dayScore(day), details: encodeDetails(day) };
}

/**
 * The detail values as plain numbers, whichever shape they arrive in: a list
 * of numbers from a library that reads them correctly, or the list of growing
 * prefixes 0.11.3 produces (see encodeDetails). For the latter the longest
 * prefix holds every value but the padding.
 */
export function normalizeDetails(raw) {
    if (!Array.isArray(raw) || raw.length === 0) return [];
    if (raw.every(v => typeof v === 'number')) return raw;
    const longest = raw[raw.length - 1];
    if (longest && typeof longest === 'object') return Array.from(Object.values(longest), Number);
    return [];
}

/**
 * Reads the detail values back. Returns null for anything it cannot vouch
 * for - an unknown format, a short list - and the row then shows its score
 * without the figures rather than wrong ones.
 */
export function decodeDetails(raw) {
    const d = normalizeDetails(raw);
    if (d.length < LENGTH || d[AT.format] !== FORMAT) return null;
    const days = [];
    for (let i = 0; i < 5; i++) {
        const at = AT.days + i * DAY_FIELDS;
        days.push(d[at] < 0 ? null : { tickets: d[at], l: d[at + 1], a: d[at + 2], b: d[at + 3] });
    }
    return {
        level: LEVELS[d[AT.level]] ?? null,
        cause: CAUSES[d[AT.cause]] ?? null,
        won: d[AT.cause] === CAUSES.indexOf('time') || d[AT.cause] === CAUSES.indexOf('gala'),
        day: d[AT.day], time: d[AT.time],
        tickets: d[AT.tickets], l: d[AT.l], a: d[AT.a], b: d[AT.b],
        valve: (d[AT.flags] & FLAG_VALVE) !== 0,
        warning: (d[AT.flags] & FLAG_WARNING) !== 0,
        days,
    };
}

/**
 * The "All" tab: the three boards in one list. Points first; on a tie the
 * harder level ranks higher, then the earlier Steam rank. The position on
 * this list is the game's own - Steam ranks only within one board.
 */
export function mergeBoards(boards) {
    const rows = [];
    for (const level of LEVELS) {
        for (const entry of boards?.[level] ?? []) rows.push({ ...entry, level });
    }
    return rows.sort((x, y) =>
        (y.score - x.score)
        || (LEVELS.indexOf(y.level) - LEVELS.indexOf(x.level))
        || ((x.rank ?? 0) - (y.rank ?? 0)));
}
