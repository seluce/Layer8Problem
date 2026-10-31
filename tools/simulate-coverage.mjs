/**
 * Coverage simulator: what a CAREER gets to see.
 *
 * simulate-day.mjs answers whether a day can be survived. It cannot answer
 * this one: it draws uniformly and forgets everything overnight, so the
 * draw's unseen preference - which only exists BETWEEN days - is invisible
 * to it. simulate-week.mjs says as much in its own comment.
 *
 * This one keeps archive.seenEvents and archive.seenOptions across the days,
 * exactly as the save file does, and calls the ENGINE's own preferUnseen()
 * and openDoorsLeft() rather than reproducing them. A simulator that
 * reimplements the rule it measures drifts away from the game silently; the
 * day simulator accepts that for the formulas because it needs per-step
 * numbers, here there is no reason to.
 *
 * Reported per rule:
 *   events seen      how much of the written stock the career ever opened
 *   doors taken      how many of the 2338 options were actually chosen
 *   spent repeats    draws that landed on a scene already read to the end
 *                    - the waste the second stage exists to cut
 *   open repeats     draws on a KNOWN scene that still has a door left
 *                    - the good kind of repeat, a decision worth redoing
 *   most drawn       how often the single most repeated scene came up
 *
 * Usage: node tools/simulate-coverage.mjs [days, default 25] [--runs=200]
 *                                         [--lang=de|en] [--compare]
 *
 * --compare runs three further rules beside the live one, which is how the
 * current two-stage draw was chosen:
 *   flat         no preference at all (how it worked before 6.4)
 *   unseen-only  first stage only (6.4)
 *   open-only    second stage only - measurably WORSE than either, see below
 *
 * Both trees must give the same numbers: only the prose differs between
 * them, so a deviation means a structure was touched while translating.
 */
import { DB, ensure, loadCore, currentLanguage } from '../src/data.js';
import { events } from '../src/engine/engine_events.js';

const args = process.argv.slice(2);
const positional = args.filter(a => !a.startsWith('-'));
const flag = (name, def) => {
    const hit = args.find(a => a.startsWith(`--${name}=`));
    return hit ? hit.slice(name.length + 3) : def;
};

const lang = flag('lang', 'de');
if (lang !== 'de' && lang !== 'en') {
    console.error(`Unknown language "${lang}". Available: de, en`);
    process.exit(1);
}
await loadCore(lang);
await ensure('coffee', 'server', 'calls', 'sidequests');
if (currentLanguage() !== lang) {
    console.error(`Language "${lang}" could not be loaded - reading "${currentLanguage()}".`);
    process.exit(1);
}

const DAYS = parseInt(positional[0] ?? '25', 10);
const RUNS = parseInt(flag('runs', '200'), 10);
const COMPARE = args.includes('--compare');

// The four pools the day loop draws its actions from. Mails, emergencies and
// the encounter pool have gates of their own and no unseen preference.
const POOLS = ['coffee', 'server', 'calls', 'sidequests'];
// From simulate-day: a player who finishes the shift gets through about this
// many. The absolute number only scales the curve, not the ranking.
const DRAWS_PER_DAY = 45;

const rnd = (a) => a[Math.floor(Math.random() * a.length)];
const optsOf = (ev) => (ev.opts ?? []).filter(o => !o.checkPool);

/**
 * The engine, with nothing but the archive under it. preferUnseen() and
 * openDoorsLeft() read state.archive and this.UNSEEN_CHANCE and touch
 * nothing else, so this is the real code path and not a copy of it.
 */
function harness() {
    return {
        state: { archive: { seenEvents: [], seenOptions: {} } },
        UNSEEN_CHANCE: events.UNSEEN_CHANCE,
        OPTION_COUNT_SHIFT: events.OPTION_COUNT_SHIFT,
        optionKey: events.optionKey,
        recordOption: events.recordOption,
        openDoorsLeft: events.openDoorsLeft,
        preferUnseen: events.preferUnseen,
    };
}

const RULES = {
    current:       (e, list) => e.preferUnseen(list),
    flat:          (e, list) => list,
    'unseen-only': (e, list) => {
        if (list.length < 2 || Math.random() >= e.UNSEEN_CHANCE) return list;
        const seen = new Set(e.state.archive.seenEvents);
        const fresh = list.filter(ev => !seen.has(ev.id));
        return fresh.length ? fresh : list;
    },
    'open-only':   (e, list) => {
        if (list.length < 2 || Math.random() >= e.UNSEEN_CHANCE) return list;
        const open = list.filter(ev => e.openDoorsLeft(ev));
        return open.length ? open : list;
    },
};

function career(rule) {
    const e = harness();
    const seen = new Set();                 // mirrors archive.seenEvents
    const flags = new Set(), shows = new Map();
    let draws = 0, spent = 0, open = 0;

    for (let d = 0; d < DAYS; d++) {
        const used = new Set();             // one day's memory, as the engine has it
        for (let k = 0; k < DRAWS_PER_DAY; k++) {
            const pool = DB[rnd(POOLS)].filter(ev =>
                !used.has(ev.id) && (!ev.reqStory || flags.has(ev.reqStory)) && !ev.webOnly);
            if (!pool.length) continue;

            // pickFromPool: follow-ups first, at the engine's own chance.
            const fu = pool.filter(ev => ev.reqStory);
            const base = pool.filter(ev => !ev.reqStory);
            const from = (fu.length && Math.random() < events.FOLLOWUP_CHANCE) ? fu
                       : (base.length ? base : fu);

            const ev = rnd(RULES[rule](e, from));
            draws++;
            used.add(ev.id);
            shows.set(ev.id, (shows.get(ev.id) ?? 0) + 1);
            if (!e.openDoorsLeft(ev)) spent++;
            else if (seen.has(ev.id)) open++;
            if (!seen.has(ev.id)) { seen.add(ev.id); e.state.archive.seenEvents.push(ev.id); }

            // A curious player: a door not taken here before, if there is one.
            // The pessimistic case - always the same answer - is what proved
            // open-only wrong, and --compare still shows it.
            const os = optsOf(ev);
            if (os.length) {
                const left = os.map((_, i) => i)
                    .filter(i => !takenAlready(e, ev.id, i, os.length));
                const i = left.length ? rnd(left) : Math.floor(Math.random() * os.length);
                e.recordOption(ev.id, null, i, os.length);
                if (os[i]?.next) flags.add(os[i].next);
            }
        }
    }
    return {
        events: seen.size,
        doors: Object.values(e.state.archive.seenOptions)
            .reduce((n, v) => n + bits(v & ((1 << events.OPTION_COUNT_SHIFT) - 1)), 0),
        spent: spent / draws, open: open / draws,
        top: Math.max(...shows.values()),
    };
}

const takenAlready = (e, id, i, count) => {
    const v = e.state.archive.seenOptions[e.optionKey(id, null)] ?? 0;
    if ((v >>> events.OPTION_COUNT_SHIFT) !== count) return false;
    return (v & (1 << i)) !== 0;
};
const bits = (n) => { let c = 0; while (n) { c += n & 1; n >>= 1; } return c; };

const totalEvents = POOLS.reduce((a, p) => a + DB[p].length, 0);
const totalDoors  = POOLS.reduce((a, p) => a + DB[p].reduce((b, ev) => b + optsOf(ev).length, 0), 0);

console.log(`\nCoverage (${lang}): ${DAYS} days x ${DRAWS_PER_DAY} draws, ${RUNS} careers per rule`);
console.log(`Four action pools: ${totalEvents} events, ${totalDoors} doors. `
          + `UNSEEN_CHANCE ${events.UNSEEN_CHANCE}, FOLLOWUP_CHANCE ${events.FOLLOWUP_CHANCE}\n`);
console.log('rule          events seen    doors taken   spent repeats   open repeats   most drawn');

for (const rule of (COMPARE ? ['flat', 'unseen-only', 'open-only', 'current'] : ['current'])) {
    let ev = 0, dr = 0, sp = 0, op = 0, top = 0;
    for (let r = 0; r < RUNS; r++) {
        const c = career(rule);
        ev += c.events; dr += c.doors; sp += c.spent; op += c.open; top += c.top;
    }
    console.log(
        rule.padEnd(13),
        `${(ev / RUNS).toFixed(0)} (${(ev / RUNS / totalEvents * 100).toFixed(0)}%)`.padStart(11),
        `${(dr / RUNS).toFixed(0)} (${(dr / RUNS / totalDoors * 100).toFixed(0)}%)`.padStart(14),
        `${(sp / RUNS * 100).toFixed(1)}%`.padStart(14),
        `${(op / RUNS * 100).toFixed(1)}%`.padStart(14),
        `${(top / RUNS).toFixed(1)}`.padStart(12));
}
console.log();
