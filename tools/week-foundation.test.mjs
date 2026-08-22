// Foundation tests for the v5.0 week module.
// Run: node --conditions browser --import ./test/register.mjs test/week-foundation.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Minimal browser shims so the real modules load unchanged.
const store = new Map();
globalThis.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
};
globalThis.window = globalThis;
globalThis.window.matchMedia = () => ({ matches: false });

const { week, computeNightCarry, WEEK_DIFFS, WEEK_TUNING, dayName } =
    await import('../src/engine/engine_week.js');
const { freshDay, state } = await import('../src/engine/engine_state.svelte.js');
const { core } = await import('../src/engine/engine_core.js');

// The day name is a dictionary entry; held against the German word this test
// says nothing about the English tree. So it is named through dayName() - and
// the suite is run in both languages, because an expectation that resolves the
// same way the code does proves nothing while only one language is ever loaded.
// See the head of week-flow.test.mjs.
const LANG = (process.argv.find(a => a.startsWith('--lang=')) ?? '').split('=')[1] || 'de';
const { useLanguage } = await import('../src/i18n/i18n.svelte.js');
await useLanguage(LANG);

let passed = 0;
const ok = (name, fn) => { fn(); passed++; console.log('  ✓ ' + name); };

// ---------------------------------------------------------------- multipliers
console.log('Multipliers (day mode, identical values):');
const dayEngine = (mult) => ({ state: { difficultyMult: mult, week: { active: false } }, ...week });

ok('Freitag 0.8: statMult 0.8, effMult 0.8, Tier 1', () => {
    const e = dayEngine(0.8);
    assert.equal(e.statMult(), 0.8); assert.equal(e.effMult(), 0.8); assert.equal(e.difficultyTier(), 1);
});
ok('Wednesday 1.0: statMult 1.1 (the quirk!), effMult 1.0, tier 2', () => {
    const e = dayEngine(1.0);
    assert.equal(e.statMult(), 1.1); assert.equal(e.effMult(), 1.0); assert.equal(e.difficultyTier(), 2);
});
ok('Montag 1.25: statMult 1.25, effMult 1.25, Tier 3', () => {
    const e = dayEngine(1.25);
    assert.equal(e.statMult(), 1.25); assert.equal(e.effMult(), 1.25); assert.equal(e.difficultyTier(), 3);
});

console.log('Multipliers (week mode, the ramp):');
const weekEngine = (level, dayIndex) => ({
    state: { difficultyMult: 1.0, week: { active: true, level, dayIndex } }, ...week,
});
ok('rested Mon: 0.75 · rested Fri: 0.91 · no quirk', () => {
    assert.equal(weekEngine('easy', 1).effMult(), 0.75);
    assert.ok(Math.abs(weekEngine('easy', 5).effMult() - 0.91) < 1e-9);
    assert.equal(weekEngine('easy', 1).statMult(), weekEngine('easy', 1).effMult());
});
ok('fed up Wed: 0.93 · in need of leave Fri: 1.11 · tiers 1/2/3', () => {
    assert.ok(Math.abs(weekEngine('normal', 3).effMult() - 0.93) < 1e-9);
    assert.ok(Math.abs(weekEngine('hard', 5).effMult() - 1.11) < 1e-9);
    assert.equal(weekEngine('easy', 1).difficultyTier(), 1);
    assert.equal(weekEngine('normal', 1).difficultyTier(), 2);
    assert.equal(weekEngine('hard', 1).difficultyTier(), 3);
});

// ---------------------------------------------------------------- night maths
console.log('computeNightCarry:');
const basePrev = (over = {}) => ({
    tickets: 0, fl: 0, al: 0, cr: 0, excusesLeft: 0,
    inventory: [{ id: 'donut', used: false }],
    usedIDs: new Set(['a']), usedEmails: new Set(['m']), storyFlags: { f1: true },
    rageWarningReceived: true, chefWarningReceived: false, lastMoodId: 'mood_x', ...over,
});

ok('tickets rounded up: 9->3, 4->1, 1->1, 0->0 (never free)', () => {
    for (const [inp, out] of [[9, 3], [4, 1], [1, 1], [0, 0], [8, 2], [5, 2]]) {
        const { fields } = computeNightCarry(basePrev({ tickets: inp }), WEEK_DIFFS.easy, 1);
        assert.equal(fields.tickets, out, `tickets ${inp}`);
    }
});
ok('recovery in per cent with a cap of 45: rested, night 1, al 90 -> 45 · cr 40 -> 16', () => {
    const { fields } = computeNightCarry(basePrev({ al: 90, cr: 40 }), WEEK_DIFFS.easy, 1);
    assert.equal(fields.al, 45);            // min(90*0.72, 45) = 45, capped
    assert.equal(fields.cr, 16);            // 40 - 40*0.60 = 16
});
ok('wear: in need of leave, night 4 -> R_al = max(0.10, 0.42-0.30) = 0.12', () => {
    const { fields } = computeNightCarry(basePrev({ al: 100 }), WEEK_DIFFS.hard, 4);
    assert.equal(fields.al, 88);            // 100 - min(12, 45)
});
ok('floor of 10 %: rCr in need of leave, night 4 = max(0.10, 0.30-0.30) = 0.10', () => {
    const { fields } = computeNightCarry(basePrev({ cr: 100 }), WEEK_DIFFS.hard, 4);
    assert.equal(fields.cr, 90);
});
ok('laziness 1:1, excuses +1 up to the cap, valve flags & sets carry', () => {
    const prev = basePrev({ fl: 55, excusesLeft: 5 });
    const { fields } = computeNightCarry(prev, WEEK_DIFFS.easy, 2);
    assert.equal(fields.fl, 55);
    assert.equal(fields.excusesLeft, 5);                 // the cap of 5 is reached, the rest is wasted
    assert.equal(computeNightCarry(basePrev({ excusesLeft: 0 }), WEEK_DIFFS.hard, 1).fields.excusesLeft, 1);
    assert.equal(fields.rageWarningReceived, true);      // the week valve stays spent
    assert.equal(fields.usedIDs, prev.usedIDs);          // the same reference, no clone needed
    assert.equal(fields.inventory, prev.inventory);
});
ok('The report delivers before/after for the night screen', () => {
    const { report } = computeNightCarry(basePrev({ tickets: 8, al: 60 }), WEEK_DIFFS.normal, 1);
    assert.equal(report.ticketsBefore, 8); assert.equal(report.ticketsAfter, 2);
    assert.equal(report.ticketsCleared, 6);
    assert.equal(report.alBefore, 60); assert.equal(report.alAfter, 24); // 60-36
});

// ------------------------------------------------------- lifecycle on real state
console.log('Life cycle on a real $state:');
const engine = { state, ...week, clearDayTimers() {}, log() {}, incrementStat() {} };

ok('startWeek sets the week + Monday starting condition (in need of leave: 2 tickets, aggro 10, 1 excuse)', () => {
    engine.startWeek('hard');
    assert.equal(state.week.active, true);
    assert.equal(state.week.level, 'hard');
    assert.equal(state.week.dayIndex, 1);
    assert.equal(state.tickets, 2);
    assert.equal(state.al, 10);
    assert.equal(state.excusesLeft, 1);
});
ok('advanceWeekNight: freshDay reset + carry-over + weekLog + dayIndex', () => {
    // A simulated Monday carrying some baggage
    state.time = 16 * 60 + 30;
    state.tickets = 9; state.al = 80; state.cr = 50; state.fl = 30;
    state.lunchDone = true; state.leetSeen = true;
    state.usedIDs.add('ev_test');
    state.inventory.push({ id: 'donut', used: false });
    state.rageWarningReceived = true;
    state.statHistory.push({ m: 700, l: 30, a: 95, b: 50 });

    const report = engine.advanceWeekNight();

    assert.equal(state.week.dayIndex, 2);                       // Tuesday
    assert.equal(engine.weekDayName(), dayName(1));
    assert.equal(state.week.weekLog.length, 1);
    assert.equal(state.week.weekLog[0].endTickets, 9);
    assert.equal(state.week.weekLog[0].peakA, 95);
    // freshDay took: the day fields are reset
    assert.equal(state.time, 8 * 60);
    assert.equal(state.lunchDone, false);
    assert.equal(state.leetSeen, false);
    // the carry-over took: the night formulas were applied
    assert.equal(state.tickets, 3);                             // ceil(9*0.25)
    assert.equal(state.al, Math.round(80 - Math.min(80 * 0.42, 45)));  // in need of leave, night 1, a whole number
    assert.equal(state.fl, 30);
    assert.equal(state.rageWarningReceived, true);              // the week valve
    assert.ok(state.usedIDs.has('ev_test'));
    assert.ok(state.inventory.some(i => i.id === 'donut'));
    assert.equal(report.ticketsCleared, 6);
});
ok('saveWeek/loadWeek round trip, clearWeek tidies up', () => {
    state.activeEvent = false; state.pendingEnd = null; state.isPartyMode = false;
    engine.saveWeek();
    const p = engine.loadWeek();
    assert.equal(p.week.level, 'hard');
    assert.equal(p.week.dayIndex, 2);
    assert.equal(p.day.tickets, 3);
    assert.ok(Array.isArray(p.day.usedIDs));                    // sets serialised as arrays
    engine.clearWeek();
    assert.equal(engine.loadWeek(), null);
});
ok('loadWeek discards broken payloads', () => {
    localStorage.setItem('layer8_week', '{"week":{"active":true,"level":"turbo","dayIndex":9}}');
    assert.equal(engine.loadWeek(), null);
    localStorage.setItem('layer8_week', 'not json');
    assert.equal(engine.loadWeek(), null);
});
ok('endWeek: back into day mode, the day values untouched', () => {
    engine.endWeek();
    assert.equal(state.week.active, false);
    assert.equal(dayEngine(1.0).statMult(), 1.1);               // the quirk lives on
});

// The simulator is a SECOND copy of the week's numbers.
//
// tools/simulate-week.mjs runs as plain node - no browser condition, no Svelte
// register - so it cannot import engine_week.js and carries its own WDIFFS
// table instead. That is a rebuild of a formula, the exact shape that has
// already cost this project three divergences (the mail formula, the phone
// times, the idle sink) and two more inside one file (the mail countdown and
// the news ticker, both written twice).
//
// This suite CAN import the engine, and it can read the simulator as text -
// the same trick dev-script.test.mjs uses on the console helper. So the two
// copies are held against each other here. It matters most in the very moment
// the drift would be invisible: during the coming week recalibration, where
// somebody tunes a number in one file and measures in the other.
//
// If the simulator ever gains the loader flags in package.json, delete this
// and import WEEK_DIFFS there instead - one copy beats a guarded second one.
ok('The simulator carries the same week numbers as the engine', () => {
    const src = readFileSync(new URL('./simulate-week.mjs', import.meta.url), 'utf-8');

    const table = src.match(/const WDIFFS = \[([\s\S]*?)\];/);
    assert.ok(table, 'the simulator no longer has a WDIFFS table - has it been rewritten?');

    const rows = table[1].split('\n').filter(l => l.includes('base:'));
    assert.equal(rows.length, 3, 'the simulator no longer describes exactly three levels');

    // Read as text on purpose: eval would run the tool, and the point is to
    // compare what is WRITTEN there against what the engine computes.
    const num = (row, key) => {
        const hit = row.match(new RegExp(`\\b${key}:\\s*(-?[0-9.]+)`));
        assert.ok(hit, `the simulator's row is missing ${key}`);
        return Number(hit[1]);
    };

    // The valve reset lives in engine_core, which this suite otherwise does
    // not need - composed here alone so the tier switch can be ASKED rather
    // than copied a third time.
    const tiers = { state, ...week, ...core };

    // Same order as the engine's three levels; the simulator names them in
    // prose ("rested (easy)"), so the position is the only honest join.
    ['easy', 'normal', 'hard'].forEach((level, i) => {
        const row = rows[i], cfg = WEEK_DIFFS[level];
        assert.equal(num(row, 'base'), cfg.base, `${level}: base drifted apart`);
        assert.equal(num(row, 'startTickets'), cfg.startTickets, `${level}: startTickets drifted apart`);
        assert.equal(num(row, 'startAl'), cfg.startAl, `${level}: startAl drifted apart`);
        assert.equal(num(row, 'exStart'), cfg.excuseStart, `${level}: excuseStart drifted apart`);
        assert.equal(num(row, 'rAl'), cfg.rAl, `${level}: the aggro recovery drifted apart`);
        assert.equal(num(row, 'rCr'), cfg.rCr, `${level}: the boss recovery drifted apart`);

        // The valve reset does not live in WEEK_DIFFS but in a tier switch,
        // so it is asked of the engine the way the game asks: through the tier.
        state.week = { active: true, level, dayIndex: 1 };
        assert.equal(num(row, 'valveReset'), tiers.valveResetValue(),
                     `${level}: the valve reset value drifted apart`);
    });
    state.week = { active: false, level: null, dayIndex: 1 };

    // And the one number both files spell out by hand.
    assert.ok(/const SHIFT_END = 16 \* 60 \+ 30;/.test(src),
              'the simulator no longer closes the shift at 16:30 like the engine');
});

console.log(`\n${passed} checks passed.`);
