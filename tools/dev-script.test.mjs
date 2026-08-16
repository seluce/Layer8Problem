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
};

const { DB, ensure, loadCore } = await import('../src/data.js');

// The engine no longer boots itself (6.0): main.js decides the language, then
// loads the core data, and only then calls engine.init(). A test that skips
// this step gets an empty DB - and the failure is silent, because
// triggerMorningMood() answers a missing DB.moods with its fallback and
// returns before any end condition is checked.
await loadCore('de');

const { core } = await import('../src/engine/engine_core.js');
const { events } = await import('../src/engine/engine_events.js');
const { week } = await import('../src/engine/engine_week.js');
const { state, freshDay } = await import('../src/engine/engine_state.svelte.js');

const calls = { end: null, terminal: null, modal: null };
const engine = {
    state,
    ...core, ...events, ...week,
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
assert.ok(dev, 'dev wurde nicht angelegt');

let passed = 0;
const ok = async (name, fn) => { await fn(); passed++; console.log('  ✓ ' + name); };

console.log('Aufbau:');
await ok('dev.tag() setzt Tag, Stufe, Werte und füllt das weekLog', () => {
    reset();
    dev.tag(3, 'normal', { tickets: 5, al: 60 });
    assert.equal(state.week.active, true);
    assert.equal(state.week.dayIndex, 3);
    assert.equal(state.week.level, 'normal');
    assert.equal(state.tickets, 5);
    assert.equal(state.al, 60);
    assert.equal(state.week.weekLog.length, 2);          // Montag und Dienstag
    assert.ok(state.statHistory.length > 5);             // Diagramm hat Daten
});
await ok('dev.kontingente() und dev.vorschau() laufen ohne Fehler', () => {
    reset();
    dev.tag(2, 'easy');
    dev.kontingente();
    dev.vorschau();
});
await ok('dev.leerlauf() erschöpft genau einen Pool', () => {
    reset();
    dev.tag(2, 'normal');
    dev.leerlauf('server');
    assert.equal(engine.weekContingentLeft('server'), 0);
    assert.ok(engine.weekContingentLeft('coffee') > 0);
});

console.log('Nacht:');
await ok('dev.feierabend(2) stellt 16:20 ein, ohne die Nacht schon auszulösen', () => {
    reset();
    dev.tag(1, 'normal');
    dev.feierabend(2);
    assert.equal(state.week.dayIndex, 2);
    assert.equal(state.time, 16 * 60 + 20);
    assert.equal(state.pendingEnd, null);
});
await ok('dev.nacht() zeigt den Nacht-Screen mit Gepäck und Schlaftext', () => {
    dev.nacht();
    assert.equal(state.modal.isNight, true);
    assert.equal(state.modal.nextDay, 'Mittwoch');
    assert.ok(state.modal.night.ticketsAfter <= state.modal.night.ticketsBefore);
    assert.ok(typeof state.modal.night.sleepText === 'string');
    assert.equal(calls.end, null);                       // kein Endscreen
});
await ok('dev.feierabend(4, true) löst direkt aus', () => {
    reset();
    dev.tag(1, 'hard');
    dev.feierabend(4, true);
    assert.equal(state.modal.isNight, true);
    assert.equal(state.modal.nextDay, 'Freitag');
});
await ok('dev.nacht() am Freitag warnt statt zu brechen', () => {
    reset();
    dev.tag(5, 'normal');
    dev.nacht();
    assert.equal(state.modal.isNight ?? false, false);
});

console.log('Freitag:');
await ok('dev.freitag() setzt 14:50 mit vier Tagen Vorgeschichte', () => {
    reset();
    dev.freitag();
    assert.equal(state.week.dayIndex, 5);
    assert.equal(state.time, 14 * 60 + 50);
    assert.equal(state.week.weekLog.length, 4);
    assert.equal(state.meetingDone, false);
});
await ok('dev.freitag("knapp") liefert die harte Variante', () => {
    reset();
    dev.freitag('knapp');
    assert.equal(state.tickets, 8);
    assert.equal(state.excusesLeft, 0);
});
await ok('dev.meeting() startet eine echte Meeting-Kette', async () => {
    reset();
    dev.freitag();
    await ensure('meetings');
    dev.meeting();
    await new Promise(r => setTimeout(r, 30));           // triggerMeeting ist async
    assert.equal(calls.terminal?.[1], 'meeting');
    assert.ok(calls.terminal[0].id.startsWith('meet_'));
    assert.ok(calls.terminal[0].startNode);
    assert.equal(state.meetingDone, true);
});

console.log('Enden:');
await ok('dev.gewonnen() zeigt die Wochen-Bilanz mit fünf Zeilen', () => {
    reset();
    dev.tag(1, 'easy');
    dev.gewonnen();
    assert.ok(calls.end, 'Endscreen fehlt');
    assert.equal(calls.end.title, 'WOCHE ÜBERLEBT');
    assert.ok(calls.end.text.includes('Wochen-Bilanz'));
    for (const tag of ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag']) {
        assert.ok(calls.end.text.includes(tag), tag + ' fehlt in der Bilanz');
    }
    assert.equal(state.archive.stats.weeksSurvived, 1);
    assert.equal(state.week.active, false);
});
await ok('dev.raus("rage", 3) endet am Mittwoch mit Tagesnennung', () => {
    reset();
    dev.tag(1, 'normal');
    dev.raus('rage', 3);
    // cause, not the title: the title is a dictionary entry and reads
    // differently in the other language.
    assert.equal(calls.end.cause, 'rage');
    assert.ok(calls.end.lead.includes('Die Woche endet am Mittwoch.'));
    assert.ok(calls.end.text.includes('✗ Mittwoch'));
    assert.equal(state.archive.stats.weeksRageQuit, 1);
});
await ok('dev.raus("tickets", 4) und dev.raus("chef", 2) enden korrekt', () => {
    reset();
    dev.tag(1, 'normal');
    dev.raus('tickets', 4);
    // Both ways out are titled GEFEUERT; only the cause tells them apart.
    assert.equal(calls.end.cause, 'tickets');
    assert.ok(calls.end.lead.includes('Donnerstag'));

    reset();
    dev.tag(1, 'normal');
    dev.raus('chef', 2);
    assert.equal(calls.end.cause, 'chef');
    assert.ok(calls.end.lead.includes('Dienstag'));
});
await ok('dev.morgentod() beendet die Woche in der Morgenstimmung', () => {
    reset();
    dev.morgentod(4);
    assert.ok(calls.end, 'Endscreen fehlt');
    assert.ok(calls.end.lead.includes('Donnerstag'));
    assert.equal(state.week.active, false);
});

console.log('Gala:');
await ok('dev.gala() erfüllt die Voraussetzungen und öffnet den Gala-Knoten', async () => {
    reset();
    dev.tag(1, 'normal');
    dev.gala();
    assert.ok(engine.partyInvitation(), 'Gala müsste jetzt zünden');
    await ensure('meetings');
    dev.meeting();
    await new Promise(r => setTimeout(r, 30));
    const ev = calls.terminal[0];
    const quelle = DB.meetings.find(m => m.id === ev.id);
    if (quelle.startNodeGala) {
        assert.equal(ev.startNode, quelle.startNodeGala, 'Meeting müsste auf dem Gala-Knoten öffnen');
    }
});
await ok('nach dev.gala() endet der Freitag in der Feier statt in der Bilanz', () => {
    state.time = 16 * 60 + 30;
    state.pendingEnd = null;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd?.isParty, true);
});

console.log('Spielstand:');
await ok('dev.sichern()/dev.zurueck() stellen die Schlüssel wieder her', () => {
    reset();
    dev.tag(2, 'normal');
    engine.saveWeek();
    const vorher = store.get('layer8_week');
    dev.sichern();
    store.delete('layer8_week');
    dev.zurueck();
    assert.equal(store.get('layer8_week'), vorher);
});
await ok('dev.aufraeumen() verwirft die Woche', () => {
    reset();
    dev.tag(3, 'hard');
    engine.saveWeek();
    dev.aufraeumen();
    assert.equal(engine.loadWeek(), null);
    assert.equal(state.week.active, false);
});
await ok('dev.zaehler() und dev.zaehlerLeeren() räumen den Teststand auf', () => {
    reset();
    dev.tag(3, 'normal');
    state.rageWarningReceived = true;                           // writes weekVentSaves below
    engine.recordWeekResult('survived', 5);
    assert.ok((state.archive.stats.weeksStarted ?? 0) > 0);
    assert.equal(state.archive.stats.weekVentSaves, 1);
    dev.zaehler();
    dev.zaehlerLeeren();
    assert.equal(state.archive.stats.weeksStarted ?? 0, 0);
    assert.equal(state.archive.stats.weekVentSaves ?? 0, 0);    // week keys are run counters too
    assert.equal(state.archive.stats.daysStarted, 0);
});
await ok('dev.hilfe() läuft', () => { dev.hilfe(); });

console.log(`\n${passed} Tests bestanden.`);
