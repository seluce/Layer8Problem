// Foundation tests for the v5.0 week module.
// Run: node --conditions browser --import ./test/register.mjs test/week-foundation.test.mjs
import assert from 'node:assert/strict';

// Minimal browser shims so the real modules load unchanged.
const store = new Map();
globalThis.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
};
globalThis.window = globalThis;
globalThis.window.matchMedia = () => ({ matches: false });

const { week, computeNightCarry, WEEK_DIFFS, WEEK_TUNING } =
    await import('../src/engine/engine_week.js');
const { freshDay, state } = await import('../src/engine/engine_state.svelte.js');

let passed = 0;
const ok = (name, fn) => { fn(); passed++; console.log('  ✓ ' + name); };

// ---------------------------------------------------------------- multipliers
console.log('Multiplikatoren (Tagesmodus wertidentisch):');
const dayEngine = (mult) => ({ state: { difficultyMult: mult, week: { active: false } }, ...week });

ok('Freitag 0.8: statMult 0.8, effMult 0.8, Tier 1', () => {
    const e = dayEngine(0.8);
    assert.equal(e.statMult(), 0.8); assert.equal(e.effMult(), 0.8); assert.equal(e.difficultyTier(), 1);
});
ok('Mittwoch 1.0: statMult 1.1 (Quirk!), effMult 1.0, Tier 2', () => {
    const e = dayEngine(1.0);
    assert.equal(e.statMult(), 1.1); assert.equal(e.effMult(), 1.0); assert.equal(e.difficultyTier(), 2);
});
ok('Montag 1.25: statMult 1.25, effMult 1.25, Tier 3', () => {
    const e = dayEngine(1.25);
    assert.equal(e.statMult(), 1.25); assert.equal(e.effMult(), 1.25); assert.equal(e.difficultyTier(), 3);
});

console.log('Multiplikatoren (Wochenmodus, Rampe):');
const weekEngine = (level, dayIndex) => ({
    state: { difficultyMult: 1.0, week: { active: true, level, dayIndex } }, ...week,
});
ok('Erholt Mo: 0.75 · Erholt Fr: 0.91 · kein Quirk', () => {
    assert.equal(weekEngine('easy', 1).effMult(), 0.75);
    assert.ok(Math.abs(weekEngine('easy', 5).effMult() - 0.91) < 1e-9);
    assert.equal(weekEngine('easy', 1).statMult(), weekEngine('easy', 1).effMult());
});
ok('Genervt Mi: 0.93 · Urlaubsreif Fr: 1.11 · Tiers 1/2/3', () => {
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

ok('Tickets aufgerundet: 9→3, 4→1, 1→1, 0→0 (nie gratis)', () => {
    for (const [inp, out] of [[9, 3], [4, 1], [1, 1], [0, 0], [8, 2], [5, 2]]) {
        const { fields } = computeNightCarry(basePrev({ tickets: inp }), WEEK_DIFFS.easy, 1);
        assert.equal(fields.tickets, out, `tickets ${inp}`);
    }
});
ok('Erholung prozentual mit Deckel 45: Erholt Nacht 1, al 90 → 45 · cr 40 → 16', () => {
    const { fields } = computeNightCarry(basePrev({ al: 90, cr: 40 }), WEEK_DIFFS.easy, 1);
    assert.equal(fields.al, 45);            // min(90*0.72, 45) = 45 gedeckelt
    assert.equal(fields.cr, 16);            // 40 - 40*0.60 = 16
});
ok('Abnutzung: Urlaubsreif Nacht 4 → R_al = max(0.10, 0.42-0.30) = 0.12', () => {
    const { fields } = computeNightCarry(basePrev({ al: 100 }), WEEK_DIFFS.hard, 4);
    assert.equal(fields.al, 88);            // 100 - min(12, 45)
});
ok('Boden 10 %: rCr Urlaubsreif Nacht 4 = max(0.10, 0.30-0.30) = 0.10', () => {
    const { fields } = computeNightCarry(basePrev({ cr: 100 }), WEEK_DIFFS.hard, 4);
    assert.equal(fields.cr, 90);
});
ok('Faulheit 1:1, Ausreden +1 bis Deckel, Ventil-Flags & Sets tragen', () => {
    const prev = basePrev({ fl: 55, excusesLeft: 5 });
    const { fields } = computeNightCarry(prev, WEEK_DIFFS.easy, 2);
    assert.equal(fields.fl, 55);
    assert.equal(fields.excusesLeft, 5);                 // Deckel 5 erreicht, verpufft
    assert.equal(computeNightCarry(basePrev({ excusesLeft: 0 }), WEEK_DIFFS.hard, 1).fields.excusesLeft, 1);
    assert.equal(fields.rageWarningReceived, true);      // Wochen-Ventil bleibt verbraucht
    assert.equal(fields.usedIDs, prev.usedIDs);          // gleiche Referenz, kein Klon nötig
    assert.equal(fields.inventory, prev.inventory);
});
ok('Report liefert Vorher/Nachher für den Nacht-Screen', () => {
    const { report } = computeNightCarry(basePrev({ tickets: 8, al: 60 }), WEEK_DIFFS.normal, 1);
    assert.equal(report.ticketsBefore, 8); assert.equal(report.ticketsAfter, 2);
    assert.equal(report.ticketsCleared, 6);
    assert.equal(report.alBefore, 60); assert.equal(report.alAfter, 24); // 60-36
});

// ------------------------------------------------------- lifecycle on real state
console.log('Lebenszyklus auf echtem $state:');
const engine = { state, ...week, clearDayTimers() {}, log() {}, incrementStat() {} };

ok('startWeek setzt Woche + Montags-Startzustand (Urlaubsreif: 2 Tickets, Aggro 10, 1 Ausrede)', () => {
    engine.startWeek('hard');
    assert.equal(state.week.active, true);
    assert.equal(state.week.level, 'hard');
    assert.equal(state.week.dayIndex, 1);
    assert.equal(state.tickets, 2);
    assert.equal(state.al, 10);
    assert.equal(state.excusesLeft, 1);
});
ok('advanceWeekNight: freshDay-Reset + Übertrag + weekLog + dayIndex', () => {
    // A simulated Monday carrying some baggage
    state.time = 16 * 60 + 30;
    state.tickets = 9; state.al = 80; state.cr = 50; state.fl = 30;
    state.lunchDone = true; state.leetSeen = true;
    state.usedIDs.add('ev_test');
    state.inventory.push({ id: 'donut', used: false });
    state.rageWarningReceived = true;
    state.statHistory.push({ m: 700, l: 30, a: 95, b: 50 });

    const report = engine.advanceWeekNight();

    assert.equal(state.week.dayIndex, 2);                       // Dienstag
    assert.equal(engine.weekDayName(), 'Dienstag');
    assert.equal(state.week.weekLog.length, 1);
    assert.equal(state.week.weekLog[0].endTickets, 9);
    assert.equal(state.week.weekLog[0].peakA, 95);
    // freshDay griff: Tagesfelder zurückgesetzt
    assert.equal(state.time, 8 * 60);
    assert.equal(state.lunchDone, false);
    assert.equal(state.leetSeen, false);
    // Übertrag griff: Nacht-Formeln angewandt
    assert.equal(state.tickets, 3);                             // ceil(9*0.25)
    assert.equal(state.al, Math.round(80 - Math.min(80 * 0.42, 45)));  // Urlaubsreif Nacht 1, ganzzahlig
    assert.equal(state.fl, 30);
    assert.equal(state.rageWarningReceived, true);              // Wochen-Ventil
    assert.ok(state.usedIDs.has('ev_test'));
    assert.ok(state.inventory.some(i => i.id === 'donut'));
    assert.equal(report.ticketsCleared, 6);
});
ok('saveWeek/loadWeek Roundtrip, clearWeek räumt auf', () => {
    state.activeEvent = false; state.pendingEnd = null; state.isPartyMode = false;
    engine.saveWeek();
    const p = engine.loadWeek();
    assert.equal(p.week.level, 'hard');
    assert.equal(p.week.dayIndex, 2);
    assert.equal(p.day.tickets, 3);
    assert.ok(Array.isArray(p.day.usedIDs));                    // Sets als Arrays serialisiert
    engine.clearWeek();
    assert.equal(engine.loadWeek(), null);
});
ok('loadWeek verwirft kaputte Nutzlasten', () => {
    localStorage.setItem('layer8_week', '{"week":{"active":true,"level":"turbo","dayIndex":9}}');
    assert.equal(engine.loadWeek(), null);
    localStorage.setItem('layer8_week', 'kein json');
    assert.equal(engine.loadWeek(), null);
});
ok('endWeek: zurück in den Tagesmodus, Tageswerte unangetastet', () => {
    engine.endWeek();
    assert.equal(state.week.active, false);
    assert.equal(dayEngine(1.0).statMult(), 1.1);               // Quirk lebt weiter
});

console.log(`\n${passed} Tests bestanden.`);
