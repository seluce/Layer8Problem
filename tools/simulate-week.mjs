/**
 * Week simulator for v4.2 balancing (roguelike Monday-Friday run).
 *
 * Plays whole weeks against the real data pools. Shares the exact engine
 * formulas with tools/simulate-day.mjs (kept in sync by hand — change one,
 * check the other):
 *   - fl += f                                 (laziness unscaled)
 *   - al += a > 0 ? ceil(a * mult) : a
 *   - cr += c > 0 ? ceil(c * mult * (1 + fl/200)) : c
 *   - tickets: +1 per started 30 minutes (accrual capped at 16:30), -1 per call
 *   - mail chance per action: min(35%, 15% * mult + 4% * tickets), 25-min cooldown
 *   - end conditions in engine order: anger, tickets >= 10, 16:30, radar
 *
 * Week rules under test (see DESIGN-4.2-WOCHE.md):
 *   - difficulty = recovery quality: Erholt / Genervt / Urlaubsreif
 *   - day multiplier = base + RAMP * (dayIndex - 1), no Wednesday quirk
 *   - night carry-over: tickets and fl 1:1; al/cr recover by R_al/R_cr,
 *     capped at DECKEL absolute points, R degrades by WEAR pp per night (floor 10%)
 *   - anger valve and chef warning once per WEEK
 *   - excuses: pool with nightly +1, hard cap = start + 2 (5/4/3)
 *   - morning end-check (death at breakfast is allowed by design)
 *   - daily pool contingents so no pool can be emptied before Friday
 *   - inventory persists (counted, backpack cap 10 like the engine)
 *   - Friday: meeting placeholder (time cost only) when crossing 15:00
 *
 * Morning moods use the REAL distribution of data_moods.js (118 entries):
 * normal 60, aggro/radar/lazy/snack 10 each, tickets/excuse+/excuse- 6 each.
 *
 * Deliberate simplifications (same spirit as the day simulator):
 *   - no reputation encounters, no party/gala, no alcohol specials, no tutorial
 *   - meeting has no content yet: modelled as a 50-minute time cost
 *
 * CALIBRATION V1 FINDINGS (2026-08-08, baked into the defaults below):
 *   1. The ticket economy never nets to zero within a day (+17 accrual ticks
 *      vs ~12 possible calls), so a raw 1:1 overnight carry kills every week
 *      by Tuesday. Relief closes the economy; v2 made it proportional
 *      (ceil(t * 0.25) survives) because a flat subtraction leaves everything
 *      below it free and kills the late-day call incentive. Every four
 *      cleared tickets save one carried; worst carry is ceil(9*0.25)=3,
 *      worst morning +3 = 6 < 10: death at breakfast stays
 *      practically impossible, the edge risk lives in the day itself.
 *   2. Week days must sit BELOW their single-day counterparts: five days at
 *      day-normal intensity compound to 0.77^5 = 27 percent before any
 *      carry-over. Bases 0.75/0.85/0.95 with ramp +0.04/day land the mean of
 *      vernunft+gelegenheit inside all three target corridors.
 *
 * Usage: node tools/simulate-week.mjs [weeks per cell, default 600]
 *   --wear=10       recovery degradation in pp per night (floor 10%)
 *   --deckel=45     max absolute recovery points per night and stat (999 = off)
 *   --ramp=0.04     day multiplier ramp per day
 *   --rscale=1.0    scales all recovery rates (calibration knob)
 *   --meeting=50    Friday meeting time cost in minutes (0 = off)
 *   --contscale=1.0 scales the contingent MAX values
 *   --nocontingent  disable daily pool contingents (starvation experiment)
 */
import { DB, ensure } from '../src/data.js';

await ensure('coffee', 'server', 'calls', 'sidequests', 'emails', 'bossfights', 'lunch');

const WEEKS = parseInt(process.argv[2] ?? '600', 10);
const ARG = (name, def) => {
    const hit = process.argv.find(a => a.startsWith(`--${name}=`));
    return hit ? parseFloat(hit.split('=')[1]) : def;
};
const WEAR      = ARG('wear', 10);      // calibrated v1
const DECKEL    = ARG('deckel', 45);    // calibrated v1
const RAMP      = ARG('ramp', 0.04);    // calibrated v1
const RSCALE    = ARG('rscale', 1.0);
const MEET      = ARG('meeting', 50);
const CONTSCALE = ARG('contscale', 1.0);
const NO_CONT   = process.argv.includes('--nocontingent');
// Overnight ticket relief. Finding from the first runs: the ticket economy
// never nets to zero within a day (+17 accrual ticks vs ~12 possible calls),
// so a raw 1:1 carry is mathematically lethal by Tuesday.
// Default model is PROPORTIONAL (calibration v2): the night shift clears a
// share of the backlog, the rest rounds UP - so no ticket is ever free and
// late-day calls stay worth making (a flat subtraction creates a dead zone
// below the subtraction amount that a system-savvy player would exploit).
//   default            tickets_new = ceil(tickets * NIGHT_KEEP)
//   --nightkeep=0.3    share of the backlog that survives the night
//   --nighttickets=N   flat subtraction instead (kept for comparison runs)
//   --nighthalf        halve, rounded down (comparison)
const NIGHT_KEEP  = ARG('nightkeep', 0.25); // calibrated v2
const NIGHT_T     = ARG('nighttickets', 0);
const NIGHT_T_SET = process.argv.some(a => a.startsWith('--nighttickets='));
const NIGHT_HALF  = process.argv.includes('--nighthalf');
// The idle click of an exhausted contingent (week_idle vector). Knobs kept
// from the 2026-08 starvation experiment that settled a-5 -> a0 and the
// raised caps (old wall: ~12 idle clicks/week for SENSIBLE play).
//   --idlem=20 --idlef=5 --idlea=0   (defaults = live data)
const IDLE_M = ARG('idlem', 20);
const IDLE_F = ARG('idlef', 5);
const IDLE_A = ARG('idlea', 0);
// --bases=0.85,0.95,1.05 overrides the three difficulty base multipliers.
// Calibration finding: five days at day-mode-normal intensity compound to
// ~0.77^5 = 27% before any carry-over — week days must sit BELOW their
// single-day counterparts for the week to land in the target corridors.
const BASES = (() => {
    const hit = process.argv.find(a => a.startsWith('--bases='));
    return hit ? hit.split('=')[1].split(',').map(Number) : null;
})();

const SHIFT_END = 16 * 60 + 30;
const ACTION_POOLS = ['coffee', 'server', 'calls', 'sidequests'];
const MAXC = { coffee: 20, server: 20, calls: 17, sidequests: 26 };
const MINC = 8;

// Calibrated v1 (2026-08-08). Anchor: the mean of vernunft and gelegenheit
// hits the target corridors 55-65 / 35-45 / 15-25 percent.
const WDIFFS = [
    { name: 'Erholt (leicht)',      base: 0.75, startTickets: 0, startAl: 0,  valveReset: 30, exStart: 3, rAl: 0.72, rCr: 0.60 },
    { name: 'Genervt (mittel)',     base: 0.85, startTickets: 1, startAl: 0,  valveReset: 50, exStart: 2, rAl: 0.60, rCr: 0.48 },
    { name: 'Urlaubsreif (schwer)', base: 0.95, startTickets: 2, startAl: 10, valveReset: 60, exStart: 1, rAl: 0.42, rCr: 0.30 },
];

const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (lo, v, hi) => Math.max(lo, Math.min(v, hi));

// ---------- counted inventory (the engine's backpack, cap 10) ----------
function invNormalCount(s) {
    let n = 0;
    for (const [id, cnt] of s.inv) {
        const db = DB.items[id];
        if (db && !db.quest) n += cnt;
    }
    return n;
}
function grant(s, id) {
    if (!id) return;
    const db = DB.items[id];
    const permanent = db && (db.keep || db.quest);
    if (permanent) { if (!s.inv.has(id)) s.inv.set(id, 1); return; }
    if (invNormalCount(s) >= 10) return;                    // backpack full, item left behind
    s.inv.set(id, (s.inv.get(id) ?? 0) + 1);
}
function consume(s, id) {
    const v = s.inv.get(id);
    if (!v) return;
    if (v <= 1) s.inv.delete(id); else s.inv.set(id, v - 1);
}

function unlocked(opts, s) {
    return opts.filter(o => {
        if (o.req && !s.inv.has(o.req)) return false;
        if (o.rem && !s.inv.has(o.rem)) return false;
        if (o.checkPool) return false;                      // party special cases
        return true;
    });
}

const lazyMult = (s) => 1 + s.fl / 200;

// ---------- danger score & strategies (same weights as the day simulator) ----------
function danger(o, s) {
    const a = (o.a ?? 0) > 0 ? Math.ceil(o.a * s.mult) : (o.a ?? 0);
    const cRaw = (o.c ?? 0) > 0 ? Math.ceil(o.c * s.mult * lazyMult(s)) : (o.c ?? 0);
    const wA = s.rageUsed ? 3 : (s.al >= 70 ? 2 : 1);
    const wC = s.chefUsed ? 3 : (s.cr >= 70 ? 2.5 : 2);
    return a * wA + cRaw * wC + (o.f ?? 0) * 0.6 + (o.m ?? 0) * 0.05;
}

const pickReason = (opts, s) => opts.reduce((a, b) => danger(a, s) <= danger(b, s) ? a : b);
const pickCasual = (opts, s) => {
    if (opts.length <= 1) return opts[0];
    const sorted = [...opts].sort((x, y) => danger(x, s) - danger(y, s));
    const rest = sorted.slice(0, -1);
    return rest[Math.floor(Math.random() * rest.length)];
};

const STRATEGIES = {
    // The calibration anchors from the day simulator:
    vernunft:    pickReason,
    gelegenheit: pickCasual,

    // Thesis 6 (snowball): a casual who saves items until Thursday/Friday ...
    horter: (opts, s) => {
        if (s.dayIndex >= 4) return STRATEGIES.verbraucher(opts, s);
        const noRem = opts.filter(o => !o.rem);
        return pickCasual(noRem.length ? noRem : opts, s);
    },
    // ... versus a casual who spends items the moment an option allows it.
    verbraucher: (opts, s) => {
        const rem = opts.filter(o => o.rem);
        if (rem.length) return pickReason(rem, s);
        return pickCasual(opts, s);
    },

    // Thesis 2/3 (starvation): hammers the coffee button all week.
    kaffeejunkie: pickCasual,
};

function actionFor(strat, s) {
    if (s.tickets >= (strat === 'vernunft' ? 5 : 6)) return 'calls';
    if (strat === 'kaffeejunkie') return 'coffee';
    if ((strat === 'vernunft' || strat === 'gelegenheit' || strat === 'horter' || strat === 'verbraucher') && s.al >= 70) return 'coffee';
    return rnd(ACTION_POOLS);
}

// ---------- applying effects (the exact engine formulas) ----------
function apply(s, o, poolType) {
    const m = o.m ?? 0, f = o.f ?? 0, a = o.a ?? 0, c = o.c ?? 0;

    if (poolType === 'calls') s.tickets = Math.max(0, s.tickets - 1);

    const oldChunk = Math.floor(s.time / 30);
    const capped = Math.min(s.time + m, SHIFT_END);
    const chunks = Math.max(0, Math.floor(capped / 30) - oldChunk);
    s.tickets += chunks;
    s.time += m;

    const lazy = lazyMult(s);
    s.fl += f;
    s.al += a > 0 ? Math.ceil(a * s.mult) : a;
    s.cr += c > 0 ? Math.ceil(c * s.mult * lazy) : c;

    if (o.next) s.flags.set(o.next, s.dayIndex);
    if (o.nextEmail) s.linkedMail.push(o.nextEmail);
    if (o.loot) grant(s, o.loot);
    if (o.rem) consume(s, o.rem);
}

function playNodes(s, ev, pick) {
    let node = ev.nodes[ev.startNode];
    for (let depth = 0; depth < 8 && node; depth++) {
        const av = unlocked(node.opts ?? [], s);
        const opt = pick(av.length ? av : node.opts, s);
        if (!opt) return;
        const res = ev.results?.[opt.next];
        if (res) { apply(s, res, s.currentPool); return; }
        node = ev.nodes[opt.next];
    }
}

// ---------- end conditions in engine order, valves are WEEKLY ----------
function checkEnd(s) {
    if (s.al >= 100) {
        if (!s.rageUsed) { s.rageUsed = true; s.al = s.valveReset; }
        else return 'RAGE';
    }
    if (s.tickets >= 10) return 'TICKETS';
    if (s.time >= SHIFT_END) return 'WIN';
    if (s.cr >= 100) {
        if (!s.chefUsed) { s.chefUsed = true; s.cr = s.valveReset; }
        else return 'FIRED';
    }
    return null;
}

// ---------- morning: real mood distribution, then the morning end-check ----------
function morning(s, cfg) {
    const roll = Math.random() * 118;
    const moodVal = Math.round(15 * s.mult);
    if (roll < 10) s.al += moodVal;                                        // aggro
    else if (roll < 20) s.cr += moodVal;                                   // radar
    else if (roll < 30) { s.fl += moodVal; s.time += 30; s.tickets += 1; } // lazy
    else if (roll < 40) grant(s, rnd(['energy', 'donut', 'sandwich', 'chocolate'])); // snack
    else if (roll < 46) {                                                  // tickets overnight
        s.tickets += cfg.base >= 1.2 ? 3 : (cfg.base >= 1.1 ? 2 : 1);
    }
    else if (roll < 52) {                                                  // excuse_minus
        if (s.excusesLeft > 0) s.excusesLeft--;
        else s.cr += moodVal;
    }
    else if (roll < 58) {                                                  // excuse_plus, capped
        s.excusesLeft = Math.min(s.excusesLeft + 1, s.exCap);
    }
    // else: normal (60/118)
    return checkEnd(s);                                                    // death at breakfast
}

// ---------- night carry-over ----------
function night(s, cfg, nightIndex) {
    const rAl = Math.max(0.10, cfg.rAl * RSCALE - WEAR / 100 * (nightIndex - 1));
    const rCr = Math.max(0.10, cfg.rCr * RSCALE - WEAR / 100 * (nightIndex - 1));
    s.al = Math.max(0, s.al - Math.min(s.al * rAl, DECKEL));
    s.cr = Math.max(0, s.cr - Math.min(s.cr * rCr, DECKEL));
    if (s.excusesLeft >= s.exCap) s.wastedRegen++;
    s.excusesLeft = Math.min(s.excusesLeft + 1, s.exCap);
    if (NIGHT_HALF) s.tickets = Math.floor(s.tickets / 2);
    else if (NIGHT_T_SET) s.tickets = Math.max(0, s.tickets - NIGHT_T);
    else s.tickets = Math.ceil(s.tickets * NIGHT_KEEP);
    s.carriedTickets.push(s.tickets);
}

// ---------- one workday inside the week ----------
function playWeekDay(s, cfg, strat, dayIndex) {
    const pick = (opts, st) => STRATEGIES[strat](opts, st) ?? opts[0];
    s.dayIndex = dayIndex;
    s.mult = cfg.base + RAMP * (dayIndex - 1);
    s.time = 8 * 60;
    s.lunchDone = false;
    s.meetingDone = dayIndex !== 5 || MEET <= 0;
    s.lastMail = -999;

    // Daily contingents from the remaining pool depth
    const cont = {};
    for (const p of ACTION_POOLS) {
        const rest = DB[p].filter(e => !s.used.has(e.id) && !e.webOnly).length;
        if (rest === 0) s.poolEmptySeen = true;
        cont[p] = NO_CONT ? Infinity
            : clamp(MINC, Math.ceil(rest / (6 - dayIndex) * 1.3), Math.round(MAXC[p] * CONTSCALE));
    }

    let end = morning(s, cfg);
    if (end) { s.morningDeath = true; return end; }

    while (true) {
        const action = actionFor(strat, s);

        // Boss chance from 9:00 onwards (weekly usedIDs may thin the pool out)
        let ev = null, poolType = action;
        if (s.time > 540 && Math.random() < 0.05) {
            const bp = DB.bossfights.filter(e => !s.used.has(e.id));
            if (bp.length) { ev = rnd(bp); poolType = 'boss'; }
        }

        if (!ev) {
            // Mirrors engine_events.storyGateOpen: flag set, old enough,
            // late enough in the week (Dreiteiler predicates).
            const gateOpen = (e) =>
                (!e.reqStory || s.flags.has(e.reqStory)) &&
                (e.reqStoryAge == null || s.dayIndex - (s.flags.get(e.reqStory) ?? 99) >= e.reqStoryAge) &&
                (e.reqWeekDayMin == null || s.dayIndex >= e.reqWeekDayMin);
            const pool = DB[action].filter(e => !s.used.has(e.id) && gateOpen(e) && !e.webOnly);
            if (cont[action] <= 0 || !pool.length) {
                // Contingent used up or pool dry: the week_idle fallback (time passes)
                s.starveClicks++;
                apply(s, { m: IDLE_M, f: IDLE_F, a: IDLE_A }, 'fallback');
                end = checkEnd(s);
                if (end) return end;
                continue;
            }
            cont[action]--;
            const fu = pool.filter(e => e.reqStory);
            const base = pool.filter(e => !e.reqStory);
            ev = (fu.length && Math.random() < 0.30) ? rnd(fu)
               : (base.length ? rnd(base) : rnd(fu));
        }

        s.used.add(ev.id);
        s.events++;
        s.currentPool = poolType;

        // Excuse: a thinking player escapes an event whose best answer is still bad
        const canExcuse = s.excusesLeft > 0 && poolType !== 'boss' && strat !== 'kaffeejunkie';
        if (canExcuse && ev.opts?.length) {
            const avX = unlocked(ev.opts, s);
            const best = Math.min(...(avX.length ? avX : ev.opts).map(o => danger(o, s)));
            if (best >= 25) { s.excusesLeft--; s.excusesSpent++; s.time += 5; s.events--; continue; }
        }

        if (ev.nodes) playNodes(s, ev, pick);
        else if (ev.opts?.length) {
            const av = unlocked(ev.opts, s);
            apply(s, pick(av.length ? av : ev.opts, s), poolType);
        }

        end = checkEnd(s);
        if (end) return end;

        // Lunch break when passing 12:00 (weekly used-filter, see design 6.3)
        if (!s.lunchDone && s.time >= 720) {
            s.lunchDone = true;
            const lp = DB.lunch.filter(e => !s.used.has(e.id));
            const lunch = lp.length ? rnd(lp) : rnd(DB.lunch);
            s.used.add(lunch.id);
            if (lunch.opts?.length) {
                const av = unlocked(lunch.opts, s);
                apply(s, pick(av.length ? av : lunch.opts, s), 'lunch');
            }
            end = checkEnd(s);
            if (end) return end;
        }

        // Friday meeting when passing 15:00 (content placeholder: time cost only)
        if (!s.meetingDone && s.time >= 15 * 60) {
            s.meetingDone = true;
            apply(s, { m: MEET }, 'meeting');
            end = checkEnd(s);
            if (end) return end;
        }

        // Mail check as in the engine (per action, 25 in-game minutes apart)
        if (s.time - s.lastMail >= 25) {
            const chance = Math.min(0.35, 0.15 * s.mult + s.tickets * 0.04);
            if (Math.random() < chance) {
                let mail = null;
                if (s.linkedMail.length) {
                    mail = DB.emails.find(e => e.id === s.linkedMail.shift());
                } else {
                    let mp = DB.emails.filter(e => !e.linked && !s.usedMails.has(e.id));
                    if (!mp.length) {                       // engine: exhausted set clears
                        s.usedMails.clear();
                        mp = DB.emails.filter(e => !e.linked);
                    }
                    mail = rnd(mp);
                }
                if (mail) {
                    s.usedMails.add(mail.id);
                    s.lastMail = s.time;
                    const av = unlocked(mail.opts ?? [], s);
                    if (av.length) apply(s, pickReason === STRATEGIES[strat] ? pickReason(av, s) : pick(av, s), 'email');
                    end = checkEnd(s);
                    if (end) return end;
                }
            }
        }
    }
}

// ---------- one full week ----------
function playWeek(cfg, strat) {
    const s = {
        valveReset: cfg.valveReset, exCap: cfg.exStart + 2,
        fl: 0, al: cfg.startAl, cr: 0, tickets: cfg.startTickets,
        excusesLeft: cfg.exStart,
        rageUsed: false, chefUsed: false,
        flags: new Map(), used: new Set(), usedMails: new Set(),   // flag -> dayIndex, mirrors setStoryFlag
        inv: new Map(), linkedMail: [],
        events: 0, excusesSpent: 0, wastedRegen: 0, starveClicks: 0,
        carriedTickets: [], morningDeath: false, poolEmptySeen: false,
        disasterEvening: false, mult: cfg.base, dayIndex: 1,
        time: 8 * 60, currentPool: '',
    };

    for (let day = 1; day <= 5; day++) {
        const end = playWeekDay(s, cfg, strat, day);
        if (end !== 'WIN') return { ...summarize(s), outcome: end, failDay: day };
        if (s.al >= 85) s.disasterEvening = true;
        if (day < 5) night(s, cfg, day);
    }
    return { ...summarize(s), outcome: 'WIN', failDay: 0 };
}

function summarize(s) {
    return {
        morningDeath: s.morningDeath, poolEmptySeen: s.poolEmptySeen,
        starveClicks: s.starveClicks, events: s.events,
        excusesSpent: s.excusesSpent, wastedRegen: s.wastedRegen,
        carriedAvg: s.carriedTickets.length
            ? s.carriedTickets.reduce((a, b) => a + b, 0) / s.carriedTickets.length : 0,
        lazyFr: s.dayIndex === 5 ? 1 + s.fl / 200 : null,
        disasterEvening: s.disasterEvening,
    };
}

// ---------- evaluation ----------
if (BASES) WDIFFS.forEach((d, i) => d.base = BASES[i]);
console.log(`Wochen-Simulation: ${WEEKS} Wochen je Zelle | wear=${WEAR}pp deckel=${DECKEL} ramp=${RAMP} rscale=${RSCALE} meeting=${MEET}min` +
    (NO_CONT ? " | KONTINGENTE AUS" : ` | contscale=${CONTSCALE}`) + (NIGHT_HALF ? " | nacht=halbieren" : NIGHT_T_SET ? ` | nachttickets=${NIGHT_T}` : ` | nachtbehalt=${NIGHT_KEEP}`) + '\n');

const DAY_NAMES = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
for (const cfg of WDIFFS) {
    console.log(`=== ${cfg.name} (Basis x${cfg.base}, Fr x${(cfg.base + RAMP * 4).toFixed(2)}) ===`);
    for (const strat of Object.keys(STRATEGIES)) {
        const R = { WIN: 0, RAGE: 0, TICKETS: 0, FIRED: 0 };
        const byDay = [0, 0, 0, 0, 0];
        let morningDeaths = 0, poolEmpty = 0, starve = 0, events = 0,
            exSpent = 0, wasted = 0, carried = 0, carriedN = 0,
            lazySum = 0, lazyN = 0,
            disWeeks = 0, disWins = 0, bestDaySum = 0;
        for (let i = 0; i < WEEKS; i++) {
            const w = playWeek(cfg, strat);
            R[w.outcome]++;
            if (w.failDay) byDay[w.failDay - 1]++;
            bestDaySum += w.failDay ? w.failDay - 1 : 5;
            if (w.morningDeath) morningDeaths++;
            if (w.poolEmptySeen) poolEmpty++;
            starve += w.starveClicks; events += w.events;
            exSpent += w.excusesSpent; wasted += w.wastedRegen;
            if (w.carriedAvg) { carried += w.carriedAvg; carriedN++; }
            if (w.lazyFr) { lazySum += w.lazyFr; lazyN++; }
            if (w.disasterEvening) { disWeeks++; if (w.outcome === 'WIN') disWins++; }
        }
        const pct = (n) => (100 * n / WEEKS).toFixed(1).padStart(5);
        const dayStr = byDay.map((n, i) => `${DAY_NAMES[i]} ${(100 * n / WEEKS).toFixed(0)}%`).join(' ');
        console.log(
            `  ${strat.padEnd(12)} Woche ${pct(R.WIN)}% | Tode: ${dayStr} (Morgen ${(100 * morningDeaths / WEEKS).toFixed(1)}%) | ` +
            `Rage ${pct(R.RAGE)}% Tickets ${pct(R.TICKETS)}% Chef ${pct(R.FIRED)}%`);
        console.log(
            `  ${''.padEnd(12)} Ø Tag erreicht ${(bestDaySum / WEEKS).toFixed(2)} | Ticket-Übertrag Ø ${carriedN ? (carried / carriedN).toFixed(1) : '-'} | ` +
            `Ausreden Ø ${(exSpent / WEEKS).toFixed(1)} (verpufft ${(wasted / WEEKS).toFixed(1)}) | ` +
            `lazy Fr x${lazyN ? (lazySum / lazyN).toFixed(2) : '-'} | Leerlauf ${(starve / WEEKS).toFixed(1)}/Wo | ` +
            `Pool leer vor Fr ${(100 * poolEmpty / WEEKS).toFixed(1)}% | Sieg nach Krisenabend ${disWeeks ? (100 * disWins / disWeeks).toFixed(0) : '-'}% (n=${disWeeks})`);
    }
    console.log('');
}
