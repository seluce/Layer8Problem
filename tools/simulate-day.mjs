/**
 * Day simulator for balancing.
 *
 * Plays whole workdays (8:00 to 16:30) against the real data pools and
 * reproduces the engine formulas exactly:
 *   - fl += f                                (laziness unscaled)
 *   - al += a > 0 ? ceil(a * diff) : a       (a rise in anger scales)
 *   - cr += c > 0 ? ceil(c * diff * (1 + fl/200)) : c   (radar scales twice)
 *   - tickets: +1 per started 30 minutes (capped at 16:30), -1 per call
 *   - mail chance per action: min(35%, 15% * diff + 4% * tickets), 25-min cooldown
 *   - valves: anger and radar reset once each to 30/50/60, a loss after that
 *   - end conditions in engine order: anger, tickets >= 10, 16:30, radar
 *
 * Deliberate simplifications, all of them for comparability:
 *   - no reputation encounters (hardly reachable on a fresh profile anyway)
 *   - no excuses (results are therefore a lower bound on the survival rate)
 *   - no alcohol or special effects, no tutorial, no party
 *
 * Usage: node tools/simulate-day.mjs [days per cell, default 1500]
 */
import { DB, ensure } from '../src/data.js';

await ensure('coffee', 'server', 'calls', 'sidequests', 'emails', 'bossfights', 'lunch');

const DAYS = parseInt(process.argv[2] ?? '1500', 10);

// Experiment parameters for counter-variants (defaults = current state):
//   --lazydiv=300     lazyMult = 1 + fl/300 instead of fl/200
//   --lazycap=1.3     cap lazyMult
//   --nolazyeasy      disable lazyMult on easy
//   --mailbase=0.12   lower the base mail chance
const ARG = (name, def) => {
    const hit = process.argv.find(a => a.startsWith(`--${name}=`));
    return hit ? parseFloat(hit.split('=')[1]) : def;
};
const LAZY_DIV  = ARG('lazydiv', 200);
const LAZY_CAP  = ARG('lazycap', 99);
const MAIL_BASE = ARG('mailbase', 0.15);
const NO_LAZY_EASY = process.argv.includes('--nolazyeasy');
//   --valves=25,40,50 override the valve resets per difficulty
//   --decay=1         radar drops by N every 30 minutes (the boss calms down)
const VALVES = (() => {
    const hit = process.argv.find(a => a.startsWith('--valves='));
    return hit ? hit.split('=')[1].split(',').map(Number) : null;
})();
const DECAY = ARG('decay', 0);
//   --normmult=1.1    override the difficulty multiplier for Wednesday
//   --excuses=3,1,1   override the number of excuses per difficulty
const NORM_MULT = ARG('normmult', 1.1);   // engine state: Wednesday hardening x1.1
const EXCUSES = (() => {
    const hit = process.argv.find(a => a.startsWith('--excuses='));
    return hit ? hit.split('=')[1].split(',').map(Number) : null;
})();
const lazyMult = (s) => (NO_LAZY_EASY && s.diff < 1.0) ? 1
    : Math.min(LAZY_CAP, 1 + s.fl / LAZY_DIV);
const SHIFT_END = 16 * 60 + 30;

const DIFFS = [
    { name: 'Freitag (leicht)',  mult: 0.8,  startTickets: 0, valveReset: 30 },
    { name: 'Mittwoch (normal)', mult: 1.0,  startTickets: 0, valveReset: 50 },
    { name: 'Montag (schwer)',   mult: 1.25, startTickets: 2, valveReset: 60 },
];

const rnd = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ---------- how the three player types choose ----------
function unlocked(opts, inv) {
    return opts.filter(o => {
        if (o.req && !inv.has(o.req)) return false;
        if (o.rem && !inv.has(o.rem)) return false;
        if (o.checkPool) return false;              // party special cases
        return true;
    });
}

// Danger score of an option, seen from the current state.
function danger(o, s) {
    const a = (o.a ?? 0) > 0 ? Math.ceil(o.a * statMult(s)) : (o.a ?? 0);
    const cRaw = (o.c ?? 0) > 0 ? Math.ceil(o.c * statMult(s) * lazyMult(s)) : (o.c ?? 0);
    const wA = s.rageUsed ? 3 : (s.al >= 70 ? 2 : 1);
    const wC = s.chefUsed ? 3 : (s.cr >= 70 ? 2.5 : 2);
    return a * wA + cRaw * wC + (o.f ?? 0) * 0.6 + (o.m ?? 0) * 0.05;
}

const STRATEGIES = {
    // Clicks anything - the lower bound of understanding the game.
    zufall: (opts, s) => rnd(opts),

    // Weighs the real danger: radar counts double, triple once the valve is
    // spent; laziness counts as a future radar amplifier.
    vernunft: (opts, s) => opts.reduce((a, b) => danger(a, s) <= danger(b, s) ? a : b),

    // Reads along, avoids only the obviously worst answer and picks randomly
    // among the rest - the realistic casual player.
    gelegenheit: (opts, s) => {
        if (opts.length <= 1) return opts[0];
        const sorted = [...opts].sort((x, y) => danger(x, s) - danger(y, s));
        const rest = sorted.slice(0, -1);
        return rest[Math.floor(Math.random() * rest.length)];
    },

    // Always takes the fastest answer - time is everything.
    speed: (opts, s) => opts.reduce((a, b) => ((a.m ?? 99) <= (b.m ?? 99) ? a : b)),
};

// ---------- applying effects (the exact engine formulas) ----------
function apply(s, o, poolType) {
    const m = o.m ?? 0, f = o.f ?? 0, a = o.a ?? 0, c = o.c ?? 0;

    if (poolType === 'calls') s.tickets = Math.max(0, s.tickets - 1);

    const oldChunk = Math.floor(s.time / 30);
    const capped = Math.min(s.time + m, SHIFT_END);
    const chunks = Math.max(0, Math.floor(capped / 30) - oldChunk);
    s.tickets += chunks;
    if (DECAY > 0) s.cr = Math.max(0, s.cr - DECAY * chunks);
    s.time += m;

    const lazy = lazyMult(s);
    s.fl += f;
    s.al += a > 0 ? Math.ceil(a * statMult(s)) : a;
    const cEff = c > 0 ? Math.ceil(c * statMult(s) * lazy) : c;
    s.cr += cEff;
    s.radarPaid += Math.max(0, cEff);
    s.radarBase += Math.max(0, c);

    if (o.next) s.flags.add(o.next);
    if (o.nextEmail) s.linkedMail.push(o.nextEmail);
    if (o.loot) s.inv.add(o.loot);
    if (o.rem) s.inv.delete(o.rem);
}

// Node conversations (call chains, phone): pick nodes until a result.
function playNodes(s, ev, pick) {
    let node = ev.nodes[ev.startNode];
    for (let depth = 0; depth < 8 && node; depth++) {
        const opt = pick(node.opts, s);
        const res = ev.results?.[opt.next];
        if (res) { apply(s, res, s.currentPool); return; }
        node = ev.nodes[opt.next];
    }
}

// ---------- end conditions in engine order ----------
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

// ---------- one full workday ----------
function playDay(diffCfg, stratName) {
    const pick = (opts, s) => STRATEGIES[stratName](opts, s) ?? opts[0];
    const s = {
        diff: diffCfg.mult, valveReset: diffCfg.valveReset,
        time: 8 * 60, fl: 0, al: 0, cr: 0,
        tickets: diffCfg.startTickets,
        rageUsed: false, chefUsed: false, lunchDone: false,
        excusesLeft: EXCUSES ? EXCUSES[DIFFS.indexOf(diffCfg)] : (diffCfg.mult < 1.0 ? 3 : (diffCfg.mult > 1.0 ? 1 : 2)),
        flags: new Set(), used: new Set(), usedMails: new Set(),
        inv: new Set(), linkedMail: [], lastMail: -999,
        radarPaid: 0, radarBase: 0,
        mails: 0, callsDone: 0, events: 0, currentPool: '',
    };

    // Morning mood: 60% neutral, 10% each for anger/radar/laziness/snack
    const mood = Math.random();
    if (mood < 0.1) s.al += 15;
    else if (mood < 0.2) s.cr += 15;
    else if (mood < 0.3) { s.fl += 15; s.time += 30; s.tickets += 1; }

    const poolFor = (type) => DB[type].filter(ev =>
        !s.used.has(ev.id) && (!ev.reqStory || s.flags.has(ev.reqStory)) && !ev.webOnly);

    while (true) {
        // Action choice per player type
        let action;
        if (s.tickets >= (stratName === 'vernunft' ? 5 : 6)) action = 'calls';
        else if ((stratName === 'vernunft' || stratName === 'gelegenheit') && s.al >= 70) action = 'coffee';
        else action = rnd(['coffee', 'server', 'sidequests', 'calls']);

        // Boss chance from 9:00 onwards
        let ev = null, poolType = action;
        if (s.time > 540 && Math.random() < 0.05) {
            const bp = DB.bossfights.filter(e => !s.used.has(e.id));
            if (bp.length) { ev = rnd(bp); poolType = 'boss'; }
        }

        if (!ev) {
            const pool = poolFor(action);
            if (!pool.length) { s.time += 5; if (checkEnd(s)) break; continue; }
            const fu = pool.filter(e => e.reqStory);
            const base = pool.filter(e => !e.reqStory);
            ev = (fu.length && Math.random() < 0.30) ? rnd(fu)
               : (base.length ? rnd(base) : rnd(fu));
        }

        s.used.add(ev.id);
        s.events++;
        s.currentPool = poolType;
        if (poolType === 'calls') s.callsDone++;

        // Excuse: a thinking player escapes an event whose best answer is
        // still bad (engine: the event ends, short pause).
        const canExcuse = s.excusesLeft > 0 && poolType !== 'boss'
            && (stratName === 'vernunft' || stratName === 'gelegenheit');
        if (canExcuse && ev.opts?.length) {
            const avX = unlocked(ev.opts, s.inv);
            const best = Math.min(...(avX.length ? avX : ev.opts).map(o => danger(o, s)));
            if (best >= 25) { s.excusesLeft--; s.time += 5; s.events--; continue; }
        }

        if (ev.nodes) playNodes(s, ev, pick);
        else if (ev.opts?.length) {
            const av = unlocked(ev.opts, s.inv);
            apply(s, pick(av.length ? av : ev.opts, s), poolType);
        }

        let end = checkEnd(s);
        if (end) { s.end = end; break; }

        // Lunch break when passing 12:00
        if (!s.lunchDone && s.time >= 720) {
            s.lunchDone = true;
            const lunch = rnd(DB.lunch);
            if (lunch.opts?.length) apply(s, pick(unlocked(lunch.opts, s.inv), s) ?? lunch.opts[0], 'lunch');
            end = checkEnd(s);
            if (end) { s.end = end; break; }
        }

        // Mail check as in the engine (per action, 25 in-game minutes apart)
        if (s.time - s.lastMail >= 25) {
            const chance = Math.min(0.35, MAIL_BASE * s.diff + s.tickets * 0.04);
            if (Math.random() < chance) {
                let mail = null;
                if (s.linkedMail.length) {
                    mail = DB.emails.find(e => e.id === s.linkedMail.shift());
                } else {
                    const mp = DB.emails.filter(e => !e.linked && !s.usedMails.has(e.id));
                    if (mp.length) mail = rnd(mp);
                }
                if (mail) {
                    s.usedMails.add(mail.id);
                    s.mails++;
                    s.lastMail = s.time;
                    const av = unlocked(mail.opts ?? [], s.inv);
                    if (av.length) apply(s, pick(av, s), 'email');
                    end = checkEnd(s);
                    if (end) { s.end = end; break; }
                }
            }
        }
    }
    return s;
}

// ---------- evaluation ----------
console.log(`Simulation: ${DAYS} Tage je Zelle, 3 Schwierigkeiten x 3 Spielertypen\n`);
if (VALVES) DIFFS.forEach((d, i) => d.valveReset = VALVES[i]);
// Stat multiplier as in engine_events: formulas only, not identity (mail
// chance, tickets and excuses still go through mult).
const statMult = (s) => s.diff === 1.0 ? NORM_MULT : s.diff;
for (const diff of DIFFS) {
    console.log(`=== ${diff.name} (x${diff.mult}) ===`);
    for (const strat of Object.keys(STRATEGIES)) {
        const R = { WIN: 0, RAGE: 0, TICKETS: 0, FIRED: 0 };
        let valveA = 0, valveC = 0, mails = 0, calls = 0, events = 0,
            endFl = 0, endAl = 0, endCr = 0, lossTime = [], lazyShare = 0;
        for (let i = 0; i < DAYS; i++) {
            const s = playDay(diff, strat);
            R[s.end]++;
            if (s.rageUsed) valveA++;
            if (s.chefUsed) valveC++;
            mails += s.mails; calls += s.callsDone; events += s.events;
            if (s.end === 'WIN') { endFl += s.fl; endAl += s.al; endCr += s.cr; }
            else lossTime.push(s.time);
            lazyShare += s.radarBase > 0 ? (s.radarPaid / s.radarBase) : 1;
        }
        const wins = R.WIN || 1;
        lossTime.sort((a, b) => a - b);
        const medLoss = lossTime.length ? lossTime[Math.floor(lossTime.length / 2)] : 0;
        const fmt = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
        console.log(
            `  ${strat.padEnd(8)} Sieg ${(100 * R.WIN / DAYS).toFixed(1).padStart(5)}% | ` +
            `Rage ${(100 * R.RAGE / DAYS).toFixed(1).padStart(4)}% Tickets ${(100 * R.TICKETS / DAYS).toFixed(1).padStart(4)}% Gefeuert ${(100 * R.FIRED / DAYS).toFixed(1).padStart(4)}% | ` +
            `Ventil A/C ${(100 * valveA / DAYS).toFixed(0)}%/${(100 * valveC / DAYS).toFixed(0)}% | ` +
            `Ø Mails ${(mails / DAYS).toFixed(1)} Anrufe ${(calls / DAYS).toFixed(1)} Events ${(events / DAYS).toFixed(1)} | ` +
            `Sieg-Endwerte F/A/R ${(endFl / wins).toFixed(0)}/${(endAl / wins).toFixed(0)}/${(endCr / wins).toFixed(0)} | ` +
            `Radar-Aufschlag x${(lazyShare / DAYS).toFixed(2)} | Verlust-Median ${fmt(medLoss)}`
        );
    }
    console.log('');
}
