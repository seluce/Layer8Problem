// Runs every scenario of tools/dev-woche.js against the real engine modules,
// so a broken console helper is caught here and not in Ferris' browser.
// Run: node --conditions browser --import ./test/register.mjs test/dev-script.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const store = new Map();
globalThis.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
};
globalThis.window = globalThis;
globalThis.window.matchMedia = () => ({ matches: false });
globalThis.document = {
    getElementById: (id) => ({ id, textContent: '', classList: { add() {}, remove() {} } }),
    querySelectorAll: () => [],
    // useLanguage() sets <html lang> on its way past - the automatic
    // hyphenation of long words follows that attribute.
    documentElement: { lang: '' },
};

const { DB, ensure, loadCore } = await import('../src/data.js');

// The engine no longer boots itself (6.0): main.js decides the language, then
// loads the core data, and only then calls engine.init(). A test that skips
// this step gets an empty DB - and the failure is silent, because
// triggerMorningMood() answers a missing DB.moods with its fallback and
// returns before any end condition is checked.
//
// German is the default; --lang=en runs the same suite against the other tree.
// Both trees carry the same ids and numbers, so everything checked here is the
// same in both - which only holds as long as no comparison runs over display
// text. See the head of week-flow.test.mjs.
const LANG = (process.argv.find(a => a.startsWith('--lang=')) ?? '').split('=')[1] || 'de';
await loadCore(LANG);

const { useLanguage, t, tf } = await import('../src/i18n/i18n.svelte.js');
const { dayName, dayNameValue } = await import('../src/engine/engine_week.js');
await useLanguage(LANG);

const { core } = await import('../src/engine/engine_core.js');
const { events } = await import('../src/engine/engine_events.js');
const { week } = await import('../src/engine/engine_week.js');
const { hooks } = await import('../src/engine/engine_hooks.js');
const { state, freshDay } = await import('../src/engine/engine_state.svelte.js');

const calls = { end: null, terminal: null, modal: null };
const engine = {
    state,
    ...core, ...events, ...week, ...hooks,
    showOverlay() {}, hideOverlay() {}, renderHeader() {}, updateUI() {}, disableButtons() {},
    setTerminalIdle() {}, setTerminalMorning() {}, setTerminalResult() {}, setTerminalEvent() {},
    showModal(t, x) { calls.modal = t; },
    showEnd(end) { calls.end = end; state.modal = { open: true, ...end, isEnd: true }; },
    closeModal() { state.modal = { open: false }; },
    renderTerminal(ev, type) { calls.terminal = [ev, type]; },
    showFloatingText() {}, triggerShake() {}, animateItemToBackpack() {},
    playMusic() {}, stopMusic() {}, playAudio() {}, updatePresence() {},
    playBootSequence(cb) { cb(); }, closeSettings() {}, updatePhoneVisibility() {},
    checkForNews() {}, log() {}, unlockAchievement() {},
    generateDiaryEntry: () => 'Tagebuch-Stub',
};
window.engine = engine;

const reset = () => {
    Object.assign(state, freshDay(1.0));
    state.week = { active: false, level: null, dayIndex: 1, weekLog: [], repAtWeekStart: {}, contingents: {} };
    state.archive.stats = {};
    state.archive.achievements = [];
    state.archive.achievementDiffs = {};
    state.pendingEnd = null;
    state.modal = { open: false };
    calls.end = null; calls.terminal = null; calls.modal = null;
    store.clear();
};

// Load the console helper exactly as it gets pasted into the browser.
// Path is relative to this file, so a clean checkout runs it too - it used to
// point at a session working directory that does not exist in the repository.
reset();
const src = readFileSync(new URL('./dev-woche.js', import.meta.url), 'utf-8');
new Function(src)();
const dev = window.dev;
assert.ok(dev, 'dev was not created');

let passed = 0;
const ok = async (name, fn) => { await fn(); passed++; console.log('  ✓ ' + name); };

console.log('Setup:');
await ok('dev.day() sets day, level and values and fills the weekLog', () => {
    reset();
    dev.day(3, 'normal', { tickets: 5, al: 60 });
    assert.equal(state.week.active, true);
    assert.equal(state.week.dayIndex, 3);
    assert.equal(state.week.level, 'normal');
    assert.equal(state.tickets, 5);
    assert.equal(state.al, 60);
    assert.equal(state.week.weekLog.length, 2);          // Monday and Tuesday
    assert.ok(state.statHistory.length > 5);             // the chart has data
});
await ok('dev.quotas() and dev.preview() run without error', () => {
    reset();
    dev.day(2, 'easy');
    dev.quotas();
    dev.preview();
});
await ok('dev.idle() exhausts exactly one pool', () => {
    reset();
    dev.day(2, 'normal');
    dev.idle('server');
    assert.equal(engine.weekContingentLeft('server'), 0);
    assert.ok(engine.weekContingentLeft('coffee') > 0);
});

console.log('The night:');
await ok('dev.clockOff(2) sets 16:20 without triggering the night yet', () => {
    reset();
    dev.day(1, 'normal');
    dev.clockOff(2);
    assert.equal(state.week.dayIndex, 2);
    assert.equal(state.time, 16 * 60 + 20);
    assert.equal(state.pendingEnd, null);
});
await ok('dev.night() shows the night screen with baggage and sleep line', () => {
    dev.night();
    assert.equal(state.modal.isNight, true);
    assert.deepEqual(state.modal.nextDay, dayNameValue(2));
    assert.ok(state.modal.night.ticketsAfter <= state.modal.night.ticketsBefore);
    assert.ok(state.modal.night.sleep?.ref, 'the sleep line does not travel as a reference');
    assert.equal(calls.end, null);                       // no end screen
});
await ok('dev.clockOff(4, true) triggers straight away', () => {
    reset();
    dev.day(1, 'hard');
    dev.clockOff(4, true);
    assert.equal(state.modal.isNight, true);
    assert.deepEqual(state.modal.nextDay, dayNameValue(4));
});
await ok('dev.night() on a Friday warns instead of breaking', () => {
    reset();
    dev.day(5, 'normal');
    dev.night();
    assert.equal(state.modal.isNight ?? false, false);
});

console.log('Friday:');
await ok('dev.friday() sets 14:50 with four days of history', () => {
    reset();
    dev.friday();
    assert.equal(state.week.dayIndex, 5);
    assert.equal(state.time, 14 * 60 + 50);
    assert.equal(state.week.weekLog.length, 4);
    assert.equal(state.meetingDone, false);
});
await ok('dev.friday("tight") delivers the hard variant', () => {
    reset();
    dev.friday('tight');
    assert.equal(state.tickets, 8);
    assert.equal(state.excusesLeft, 0);
});
await ok('dev.meeting() starts a real meeting chain', async () => {
    reset();
    dev.friday();
    await ensure('meetings');
    dev.meeting();
    await new Promise(r => setTimeout(r, 30));           // triggerMeeting is async
    assert.equal(calls.terminal?.[1], 'meeting');
    assert.ok(calls.terminal[0].id.startsWith('meet_'));
    assert.ok(calls.terminal[0].startNode);
    assert.equal(state.meetingDone, true);
});

console.log('Endings:');
await ok('dev.won() shows the week balance with five rows', () => {
    reset();
    dev.day(1, 'easy');
    dev.won();
    assert.ok(calls.end, 'the end screen is missing');
    assert.deepEqual(calls.end.title, { k: 'end.weekTitle' });
    // The balance sheet is a snapshot (6.1): five rows, one day index each.
    assert.deepEqual(calls.end.balance.rows.map(r => r.day), [0, 1, 2, 3, 4]);
    assert.equal(state.archive.stats.weeksSurvived, 1);
    assert.equal(state.week.active, false);
});
await ok('dev.out("rage", 3) ends on Wednesday and names the day', () => {
    reset();
    dev.day(1, 'normal');
    dev.out('rage', 3);
    // cause, not the title: the title is a dictionary entry and reads
    // differently in the other language.
    assert.equal(calls.end.cause, 'rage');
    assert.deepEqual(calls.end.lead,
                     { k: 'week.endsOn', v: { base: { k: 'end.rageQuit' }, day: dayNameValue(2) } });
    assert.deepEqual(calls.end.balance.rows.at(-1),
                     { day: 2, win: false, title: { k: 'end.rageTitle' } });
    assert.equal(state.archive.stats.weeksRageQuit, 1);
});
await ok('dev.out("tickets", 4) and dev.out("chef", 2) end correctly', () => {
    reset();
    dev.day(1, 'normal');
    dev.out('tickets', 4);
    // Both ways out are titled GEFEUERT; only the cause tells them apart.
    assert.equal(calls.end.cause, 'tickets');
    assert.deepEqual(calls.end.lead.v.day, dayNameValue(3));

    reset();
    dev.day(1, 'normal');
    dev.out('chef', 2);
    assert.equal(calls.end.cause, 'chef');
    assert.deepEqual(calls.end.lead.v.day, dayNameValue(1));
});
await ok('dev.morningDeath() ends the week in the morning mood', () => {
    reset();
    dev.morningDeath(4);
    assert.ok(calls.end, 'the end screen is missing');
    assert.deepEqual(calls.end.lead.v.day, dayNameValue(3));
    assert.equal(state.week.active, false);
});

console.log('The gala:');
await ok('dev.gala() meets the requirements and opens the gala node', async () => {
    reset();
    dev.day(1, 'normal');
    dev.gala();
    assert.ok(engine.partyInvitation(), 'the gala should fire now');
    await ensure('meetings');
    dev.meeting();
    await new Promise(r => setTimeout(r, 30));
    const ev = calls.terminal[0];
    const source = DB.meetings.find(m => m.id === ev.id);
    if (source.startNodeGala) {
        assert.equal(ev.startNode, source.startNodeGala, 'the meeting should open on the gala node');
    }
});
await ok('after dev.gala() the Friday ends in the party, not in the balance sheet', () => {
    state.time = 16 * 60 + 30;
    state.pendingEnd = null;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd?.isParty, true);
});

console.log('Saves:');
await ok('dev.backup()/dev.restore() put the keys back', () => {
    reset();
    dev.day(2, 'normal');
    engine.saveWeek();
    const vorher = store.get('layer8_week');
    dev.backup();
    store.delete('layer8_week');
    dev.restore();
    assert.equal(store.get('layer8_week'), vorher);
});
await ok('dev.dropWeek() discards the week', () => {
    reset();
    dev.day(3, 'hard');
    engine.saveWeek();
    dev.dropWeek();
    assert.equal(engine.loadWeek(), null);
    assert.equal(state.week.active, false);
});
await ok('dev.counters() and dev.clearCounters() tidy the test state up', () => {
    reset();
    dev.day(3, 'normal');
    state.rageWarningReceived = true;                           // writes weekVentSaves below
    engine.recordWeekResult('survived', 5);
    assert.ok((state.archive.stats.weeksStarted ?? 0) > 0);
    assert.equal(state.archive.stats.weekVentSaves, 1);
    dev.counters();
    dev.clearCounters();
    assert.equal(state.archive.stats.weeksStarted ?? 0, 0);
    assert.equal(state.archive.stats.weekVentSaves ?? 0, 0);    // week keys are run counters too
    assert.equal(state.archive.stats.daysStarted, 0);
});
await ok('dev.help() runs', () => { dev.help(); });

console.log(`\n${passed} checks passed.`);
