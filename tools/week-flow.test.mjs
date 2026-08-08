// Package-2 flow tests: the wired week loop on the REAL core/events/week
// modules, with the UI and audio layers stubbed out.
// Run: node --conditions browser --import ./test/register.mjs test/week-flow.test.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// --- browser shims -----------------------------------------------------------
const store = new Map();
globalThis.localStorage = {
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
};
globalThis.window = globalThis;
globalThis.window.matchMedia = () => ({ matches: false });
const fakeEl = () => ({ textContent: '', classList: { add() {}, remove() {} }, id: '' });
globalThis.location = { reload() { calls.reloaded = true; } };
globalThis.document = {
    getElementById: (id) => { const el = fakeEl(); el.id = id; return el; },
    querySelectorAll: () => [],
};

const { DB, ensure } = await import('../src/data.js');
const { buildDiary } = await import('../src/engine/engine_diary.js');
const { core } = await import('../src/engine/engine_core.js');
const { events } = await import('../src/engine/engine_events.js');
const { week } = await import('../src/engine/engine_week.js');
const { state, freshDay } = await import('../src/engine/engine_state.svelte.js');

// --- engine composition with UI stubs (later spread wins) --------------------
const calls = { overlays: [], end: null, boots: 0, resumeInfo: '' };
const engine = {
    state,
    ...core, ...events, ...week,
    showOverlay(t) { calls.overlays.push(typeof t === 'string' ? t : (t?.id ?? 'el')); },
    hideOverlay() {},
    renderHeader() {}, updateUI() {}, disableButtons() {},
    setTerminalIdle() {}, setTerminalMorning() {},
    showModal() {},
    showEnd(end) { calls.end = end; state.modal = { open: true, ...end, isEnd: true }; },
    closeModal() { state.modal = { open: false }; },
    showFloatingText() {}, triggerShake() {}, animateItemToBackpack() {},
    playMusic() {}, stopMusic() {}, playAudio() {}, updatePresence() {},
    playBootSequence(cb) { calls.boots++; cb(); },
    closeSettings() {}, updatePhoneVisibility() {}, checkForNews() {},
    renderTerminal(ev, type) { calls.terminal = [ev, type]; },
    setTerminalEvent(type, title, text, opts, isChain, charName, nodes) { calls.termEvent = { type, title, charName }; },
    setTerminalResult(text, m, f, a, c, action, buttonText) { calls.termResult = { action, buttonText }; },
    log() {},
    unlockAchievement(id) { calls.achs.push(id); calls.achStufen.push(engine.difficultyTier()); },
    generateDiaryEntry: () => 'Tagebuch-Stub',
};

const resetState = () => {
    Object.assign(state, freshDay(1.0));
    state.difficultyMult = 1.0;   // freshDay trägt es nicht - sonst leckt ein Wert aus dem Vortest
    state.week = { active: false, level: null, dayIndex: 1, weekLog: [], repAtWeekStart: {} };
    state.archive.stats = { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 };
    // Auch die Erfolge zurücksetzen: Der Gala-Test schaltet sie frei, und ein
    // späterer Freitag würde sonst überraschend in der Feier statt in der
    // Bilanz enden.
    state.archive.achievements = [];
    state.archive.achievementDiffs = {};
    state.achievements = [];
    state.pendingEnd = null;
    state.modal = { open: false };
    calls.overlays = []; calls.end = null; calls.boots = 0; calls.terminal = null; calls.achs = []; calls.achStufen = []; calls.reloaded = false; calls.termResult = null;
    engine._resumeKind = null;
    store.clear();
};

let passed = 0;
// Awaits every test body: async tests (ensure!) must not interleave.
const ok = async (name, fn) => { await fn(); passed++; console.log('  ✓ ' + name); };

// ---------------------------------------------------------------- mode entry
console.log('Moduseinstieg:');
await ok('startWeekSelect ohne Speicherstände zeigt das week-modal', () => {
    resetState();
    engine.startWeekSelect();
    assert.ok(calls.overlays.includes('week-modal'));
});
await ok('setWeekDifficulty startet Montag und zählt weeksStarted', () => {
    resetState();
    engine.setWeekDifficulty('normal');
    assert.equal(state.week.active, true);
    assert.equal(state.week.level, 'normal');
    assert.equal(state.tickets, 1);
    assert.equal(state.archive.stats.weeksStarted, 1);
});

// -------------------------------------------------------------------- night
console.log('Feierabend Mo–Do → Nacht:');
await ok('16:30 an Tag 2 queued die Nacht statt Feierabend, Gala unterdrückt', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 2;
    state.time = 16 * 60 + 30;
    state.tickets = 8; state.al = 60; state.cr = 20;
    state.ticketWarning = true;     // im echten Spiel längst beim Überschreiten von 7 gefeuert
    // Even a valid gala invitation must not fire mid-week:
    const realParty = engine.partyInvitation;
    engine.partyInvitation = () => ({ isParty: true });
    engine.checkEndConditions();
    engine.partyInvitation = realParty;

    assert.equal(state.pendingEnd.isNight, true);
    assert.equal(state.pendingEnd.title, 'DIENSTAG GESCHAFFT');
    assert.equal(state.pendingEnd.nextDay, 'Mittwoch');
    assert.equal(state.pendingEnd.night.ticketsAfter, 2);       // ceil(8*0.25)
    assert.equal(state.archive.stats.daysSurvived ?? 0, 0);     // Tageszähler bleiben rein
    assert.equal(state.archive.stats.survived_week_normal, 1);  // gezählt wird im Wochen-Namensraum
});
await ok('finishGame zeigt den Nacht-Screen (kein End-Screen, kein Reload-Pfad)', () => {
    engine.finishGame();
    assert.equal(state.modal.open, true);
    assert.equal(state.modal.isNight, true);
    assert.equal(state.modal.isEnd, false);
    assert.equal(calls.end, null);                              // showEnd NICHT gerufen
    assert.equal(state.pendingEnd, null);
});
await ok('continueWeekNight: Nacht vollzogen, Checkpoint gespeichert, Morgen gebootet', () => {
    engine.continueWeekNight();
    assert.equal(state.week.dayIndex, 3);                       // Mittwoch
    assert.ok(state.tickets >= 2);                              // Übertrag 2 + evtl. Morgen-Stimmung
    assert.equal(calls.boots, 1);
    assert.equal(state.morningMoodShown, true);                 // reset() lief in den Morgen
    assert.ok(engine.loadWeek());                               // Slot existiert
    assert.equal(engine.loadWeek().week.dayIndex, 3);
});

// ------------------------------------------------------------------ week end
console.log('Wochenende (Sieg und Scheitern):');
await ok('Freitag 16:30 → WOCHE ÜBERLEBT mit Bilanz, Statistiken, Slot geräumt', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 5;
    state.week.weekLog = [
        { dayIndex: 1, endTickets: 4, endFl: 20, endAl: 31, endCr: 24, coffee: 3, mailsIgnored: 1 },
        { dayIndex: 2, endTickets: 2, endFl: 27, endAl: 35, endCr: 28, coffee: 2, mailsIgnored: 0 },
        { dayIndex: 3, endTickets: 5, endFl: 34, endAl: 43, endCr: 33, coffee: 4, mailsIgnored: 2 },
        { dayIndex: 4, endTickets: 3, endFl: 41, endAl: 47, endCr: 37, coffee: 1, mailsIgnored: 0 },
    ];
    state.time = 16 * 60 + 30; state.tickets = 6; state.coffeeConsumed = 2;
    state.fl = 52; state.al = 44; state.cr = 39;
    state.meetingDone = true;              // der Freitag endet erst nach dem Meeting
    engine.checkEndConditions();
    assert.equal(state.pendingEnd.title, 'WOCHE ÜBERLEBT');
    engine.finishGame();

    assert.ok(calls.end);
    assert.ok(calls.end.text.includes('Wochen-Bilanz'));
    assert.ok(calls.end.text.includes('Erholt'));
    assert.ok(calls.end.text.includes('✓ Freitag'));
    assert.ok(calls.end.text.includes('☕ 12× Kaffee'));         // 3+2+4+1+2
    // Endwerte statt Peak, abgekürzt, mit Legende im Kopf
    assert.ok(calls.end.text.includes('4 Tickets · F 20 · A 31 · C 24'), 'Montagszeile');
    assert.ok(calls.end.text.includes('6 Tickets · F 52 · A 44 · C 39'), 'Freitagszeile');
    assert.ok(calls.end.text.includes('F Faulheit · A Aggro · C Chef'), 'Legende');
    assert.ok(!calls.end.text.includes('Peak'), 'Peak muss verschwunden sein');
    assert.equal(state.archive.stats.weeksSurvived, 1);
    assert.equal(state.archive.stats.weeksSurvived_easy, 1);    // Wochen-Abschluss, eigener Key
    assert.equal(state.archive.stats.survived_week_easy, 1);    // der Freitag als Wochen-TAG
    assert.equal(state.archive.stats.weekBestDay, 5);
    assert.equal(state.week.active, false);
    assert.equal(engine.loadWeek(), null);                      // Slot geräumt
});
await ok('Rage Quit am Mittwoch: Tagesnennung, weeksRageQuit, Ventil zählt 1×', () => {
    resetState();
    engine.startWeek('hard');
    state.week.dayIndex = 3;
    state.al = 100;
    state.rageWarningReceived = true;                           // Wochen-Ventil verbraucht
    engine.checkEndConditions();
    assert.equal(state.pendingEnd.title, 'RAGE QUIT');
    assert.ok(state.pendingEnd.lead.includes('Die Woche endet am Mittwoch.'));
    engine.finishGame();

    assert.ok(calls.end.text.includes('✗ Mittwoch'));
    assert.equal(state.archive.stats.weeksRageQuit, 1);
    assert.equal(state.archive.stats.weekBestDay, 2);           // zwei Tage geschafft
    assert.equal(state.archive.stats.ventSaves, 1);             // 1× pro Woche, nicht pro Tag
    assert.equal(state.week.active, false);
});
await ok('recordDayResult zählt Ventil-Flags im Wochenmodus NICHT täglich', () => {
    resetState();
    engine.startWeek('easy');
    state.rageWarningReceived = true;
    engine.recordDayResult('survived');
    engine.recordDayResult('survived');
    assert.equal(state.archive.stats.ventSaves ?? 0, 0);        // erst recordWeekResult zählt
});

// -------------------------------------------------------------- morning death
console.log('Morgen-End-Check:');
await ok('9 Tickets übertragen + Morgen-Stimmung Tickets (Urlaubsreif +3) = sofort raus', () => {
    resetState();
    engine.startWeek('hard');
    state.week.dayIndex = 4;
    state.tickets = 9;
    engine.triggerMorningMood('tickets');                       // Testpfad der Engine

    assert.equal(state.tickets, 12);
    assert.ok(calls.end, 'Wochen-Endscreen muss erschienen sein');
    assert.equal(calls.end.title, 'GEFEUERT');
    assert.ok(calls.end.lead.includes('Donnerstag'));
    assert.equal(state.archive.stats.weeksFired, 1);
    assert.equal(state.week.active, false);
});

// ----------------------------------------------------------- resume & restart
console.log('Resume & Neustart:');
await ok('offerResume(week) findet den Wochen-Slot und routet resumeDay → resumeWeek', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 2;
    state.tickets = 4; state.morningMoodShown = true; state.time = 11 * 60;
    engine.saveWeek();

    // Frischer Boot: Zustand geleert, nur der Slot lebt
    const slot = store.get('layer8_week');
    resetState();
    store.set('layer8_week', slot);

    assert.equal(engine.offerResume('week'), true);
    assert.equal(engine._resumeKind, 'week');
    assert.ok(calls.overlays.includes('resume-modal'));

    engine.resumeDay();                                         // Dialog-Button
    assert.equal(state.week.active, true);
    assert.equal(state.week.dayIndex, 2);
    assert.equal(state.tickets, 4);
    assert.equal(state.time, 11 * 60);
});
await ok('Nacht-Checkpoint (Morgen ungespielt) routet Resume durch den Morgen', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 3;
    state.morningMoodShown = false;                             // Nacht-Save-Signatur
    engine.saveWeek();
    const slot = store.get('layer8_week');
    resetState();
    store.set('layer8_week', slot);

    engine.offerResume('week');
    engine.resumeDay();
    assert.equal(state.morningMoodShown, true);                 // Morgen lief (inkl. End-Check)
});
await ok('discardDay im Wochen-Kontext löscht nur den Wochen-Slot', () => {
    resetState();
    engine.startWeek('easy');
    engine.saveWeek();
    resetState();
    store.set('layer8_week', '{"week":{"active":true,"level":"easy","dayIndex":1,"weekLog":[]},"day":{"time":480}}');
    engine.offerResume('week');
    engine.discardDay();
    assert.equal(engine.loadWeek(), null);
});
await ok('softReset bei laufender Woche startet die Woche neu auf Montag', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 4;
    state.tickets = 7; state.al = 80; state.morningMoodShown = true;
    state.week.weekLog = [{ dayIndex: 1 }, { dayIndex: 2 }, { dayIndex: 3 }];
    engine.saveWeek();

    engine.softReset();
    assert.equal(state.week.active, true, 'die Woche muss laufen');
    assert.equal(state.week.dayIndex, 1, 'zurück auf Montag');
    assert.equal(state.week.level, 'normal', 'Zustand bleibt gewählt');
    assert.equal(state.week.weekLog.length, 0, 'altes Protokoll verworfen');
    // Keine festen Werte prüfen: der Neustart spielt sofort den Montagmorgen,
    // und dessen Stimmung ist zufällig. Entscheidend ist, dass das Gepäck weg ist.
    assert.ok(state.tickets < 7, `Tickets nicht zurückgesetzt: ${state.tickets}`);
    assert.ok(state.al < 80, `Aggro nicht zurückgesetzt: ${state.al}`);
    assert.equal(state.archive.stats.weeksStarted, 2, 'Neustart ist ein neuer Versuch');
    assert.ok(calls.boots >= 1);
});
await ok('Fortsetzen zählt nichts hoch - fünf Unterbrechungen ändern keinen Zähler', () => {
    resetState();
    engine.startWeek('easy');
    state.morningMoodShown = true;
    state.dayActive = true;                                     // der Tag wurde bereits gespielt
    engine.incrementStat('daysStarted');
    engine.incrementStat('started_week_easy');
    const vorher = JSON.stringify(state.archive.stats);

    for (let i = 0; i < 5; i++) {
        engine.saveWeek();
        const slot = store.get('layer8_week');
        const archiv = JSON.parse(JSON.stringify(state.archive.stats));
        resetState();
        state.archive.stats = archiv;
        store.set('layer8_week', slot);
        engine.offerResume('week');
        engine.resumeDay();
    }
    assert.equal(JSON.stringify(state.archive.stats), vorher, 'Fortsetzen hat gezählt');
    assert.equal(state.week.active, true);
});

// ------------------------------------------------------- mode separation (fix)
console.log('Modustrennung (Bugfix):');
await ok('Arbeitstag-Einstieg ignoriert die gespeicherte Woche', () => {
    resetState();
    engine.startWeek('easy');
    engine.saveWeek();
    const slot = store.get('layer8_week');
    resetState();
    store.set('layer8_week', slot);

    engine.start();                                             // Arbeitstag-Button
    assert.ok(!calls.overlays.includes('resume-modal'));
    assert.ok(calls.overlays.includes('difficulty-modal'));     // normaler Tages-Flow
    assert.ok(engine.loadWeek());                               // Wochen-Slot unangetastet
});
await ok('Arbeitswochen-Einstieg ignoriert den gespeicherten Tag', () => {
    resetState();
    state.time = 11 * 60; state.tickets = 3;                    // Tagesmodus mit Fortschritt
    engine.saveDay();
    assert.ok(engine.loadDay());

    engine.startWeekSelect();                                   // Arbeitswochen-Button
    assert.ok(!calls.overlays.includes('resume-modal'));
    assert.ok(calls.overlays.includes('week-modal'));           // direkt zur Zustandswahl
    assert.ok(engine.loadDay());                                // Tages-Slot unangetastet
});
await ok('Verwerfen aus der Wochen-Wahl führt zurück zur Wochen-Wahl', () => {
    resetState();
    engine.startWeek('normal');
    engine.saveWeek();
    const slot = store.get('layer8_week');
    resetState();
    store.set('layer8_week', slot);

    engine.startWeekSelect();
    assert.ok(calls.overlays.includes('resume-modal'));
    engine.discardDay();                                        // "Verwerfen"
    assert.equal(engine.loadWeek(), null);
    assert.ok(calls.overlays.includes('week-modal'));           // NICHT der Tages-Dialog
    assert.ok(!calls.overlays.includes('difficulty-modal'));
});

// ------------------------------------------------------------- contingents (3a)
console.log('Tageskontingente (Paket 3a):');
await ok('Formel: großer Pool → MAX gedeckelt, kleiner Rest → MIN greift', async () => {
    resetState();
    await ensure('coffee', 'server', 'calls', 'sidequests');
    engine.startWeek('easy');
    assert.equal(engine.weekContingentLeft('coffee'), 14);      // ~203 Events → Deckel
    assert.equal(engine.weekContingentLeft('calls'), 12);
    assert.equal(engine.weekContingentLeft('sidequest'), 18);   // Singular-Button → Pool-Key

    const orig = DB.server;
    DB.server = orig.slice(0, 9);                               // Rest 9
    state.week.dayIndex = 3;                                    // Resttage 3 → ceil(9/3·1.3)=4
    state.week.contingents = {};
    assert.equal(engine.weekContingentLeft('server'), 8);       // MIN 8 greift
    DB.server = orig;
});
await ok('spendContingent zählt runter, die Nacht setzt zurück', () => {
    resetState();
    engine.startWeek('normal');
    const start = engine.weekContingentLeft('calls');
    engine.spendContingent('calls');
    assert.equal(engine.weekContingentLeft('calls'), start - 1);
    engine.advanceWeekNight();
    assert.equal(state.week.contingents.calls ?? null, null);   // lazy bis zum ersten Zug
    assert.equal(engine.weekContingentLeft('calls'), 12);       // Dienstag, Pool weiter groß
});
await ok('Kontingent 0 → trigger() liefert das Leerlauf-Event mit Zeitkosten', async () => {
    resetState();
    engine.startWeek('easy');
    state.week.contingents = { coffee: 0 };
    const origRandom = Math.random;
    Math.random = () => 0.99;                                   // Boss & Begegnung ausweichen
    await engine.trigger('coffee');
    Math.random = origRandom;
    assert.equal(calls.terminal?.[0]?.id, 'fallback_week_coffee');
    assert.equal(calls.terminal[0].opts[0].m, 20);              // Sim-Kontrakt: Zeit vergeht
    assert.equal(state.week.contingents.coffee, 0);             // Leerlauf verbraucht nichts
});
await ok('Tagesmodus kennt keine Kontingente (spend ist No-op)', () => {
    resetState();                                               // week.active false
    engine.spendContingent('coffee');
    assert.deepEqual(state.week.contingents ?? {}, {});
});
await ok('Mittagspause filtert in der Woche gegen usedIDs und merkt sich den Zug', async () => {
    resetState();
    engine.startWeek('easy');
    await ensure('lunch');
    DB.lunch.forEach((ev, i) => { if (i !== 0) state.usedIDs.add(ev.id); });
    await engine.triggerLunch();
    assert.equal(calls.terminal[0].id, DB.lunch[0].id);         // einzig frischer Mittag
    assert.ok(state.usedIDs.has(DB.lunch[0].id));
});
await ok('Leerer Sidequest-Pool kostet in der Woche Zeit statt Gratis-Klick', async () => {
    resetState();
    engine.startWeek('easy');
    await ensure('sidequests');
    DB.sidequests.forEach(ev => state.usedIDs.add(ev.id));
    engine.handleSideQuest();
    assert.equal(calls.terminal?.[0]?.id, 'fallback_week_sidequests');
});

// ------------------------------------------------- node chars & meeting (3b)
console.log('Node-Sprecher & Meeting (Paket 3b):');
await ok('Terminal-Kette: Node-char schlägt Event-char, null erzwingt keinen', () => {
    resetState();
    state.currentChainEvent = {
        char: 'Kevin',
        title: 'Test',
        nodes: {
            erbt:     { text: 'x', opts: [] },
            berater:  { char: 'Frau Vogl (Synerqon)', text: 'x', opts: [] },
            niemand:  { char: null, text: 'x', opts: [] },
        },
    };
    state.currentChainType = 'meeting';
    engine.renderChainNode('erbt');
    assert.equal(calls.termEvent.charName, 'Kevin');            // erbt vom Ereignis
    engine.renderChainNode('berater');
    assert.equal(calls.termEvent.charName, 'Frau Vogl (Synerqon)');
    engine.renderChainNode('niemand');
    assert.equal(calls.termEvent.charName, null);               // char: null erzwingt Initiale/nichts
});
await ok('Freitag 15:00-Übergang bewaffnet den ZUM-WOCHENMEETING-Knopf', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 5;
    state.time = 14 * 60 + 55; state.lunchDone = true;
    state.currentEventId = 'x'; state.currentEventType = 'coffee';
    engine.resolveTerminal({ r: 'Test.', m: 10, f: 0, a: 0, c: 0 }, 'coffee');
    assert.equal(calls.termResult.action, 'triggerMeeting');
    assert.equal(calls.termResult.buttonText, 'ZUM WOCHENMEETING');
});
await ok('Kein Meeting-Knopf: Mo–Do, Tagesmodus, oder Meeting schon erledigt', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 3;                                    // Mittwoch
    state.time = 14 * 60 + 55; state.lunchDone = true;
    state.currentEventId = 'x'; state.currentEventType = 'coffee';
    engine.resolveTerminal({ r: 'Test.', m: 10, f: 0, a: 0, c: 0 }, 'coffee');
    assert.equal(calls.termResult.action, 'reset');

    state.week.dayIndex = 5; state.meetingDone = true;          // Freitag, aber erledigt
    state.time = 15 * 60 + 30;
    engine.resolveTerminal({ r: 'Test.', m: 10, f: 0, a: 0, c: 0 }, 'coffee');
    assert.equal(calls.termResult.action, 'reset');
});
await ok('triggerMeeting: zieht aus dem Pool, setzt meetingDone, Gala-Variante greift', async () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 5;
    const realParty = engine.partyInvitation;

    engine.partyInvitation = () => null;                        // heute keine Gala
    await engine.triggerMeeting();
    assert.equal(state.meetingDone, true);
    assert.ok(calls.terminal[0].id.startsWith('meet_'));
    assert.equal(calls.terminal[0].startNode, 'root');
    assert.equal(calls.terminal[1], 'meeting');
    assert.ok(DB.meetings.some(m => m.id === calls.terminal[0].id));

    state.meetingDone = false; state.usedIDs.clear();
    engine.partyInvitation = () => ({ isParty: true });         // Gala steht an
    await engine.triggerMeeting();
    assert.equal(calls.terminal[0].startNode, 'root_gala');     // Ansage-Variante
    engine.partyInvitation = realParty;
});
await ok('Freitag 16:30: erst das Meeting, dann Gala oder Bilanz', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 5;
    state.time = 16 * 60 + 30;
    const realParty = engine.partyInvitation;
    engine.partyInvitation = () => ({ isParty: true, partyKey: 'k', diffStr: 'easy' });

    // Ohne Meeting endet gar nichts - der Knopf führt in den Besprechungsraum.
    state.meetingDone = false;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd, null, 'das Finale darf nicht übersprungen werden');

    // Mit Meeting und erfüllten Voraussetzungen: die Gala
    state.meetingDone = true;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd.isParty, true);

    // Mit Meeting, ohne Gala-Voraussetzungen: die Wochen-Bilanz
    state.pendingEnd = null;
    engine.partyInvitation = () => null;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd.title, 'WOCHE ÜBERLEBT');

    engine.partyInvitation = realParty;
});
await ok('partyInvitation ist stufenbasiert: week_normal fragt Mittwoch-Rang, teilt den Played-Schlüssel', () => {
    resetState();
    engine.startWeek('normal');
    const REQUIRED = ['ach_mentor', 'ach_ally', 'ach_keymaster', 'ach_rockstar',
                      'ach_closer', 'ach_cat_whisperer', 'ach_lore', 'ach_wolf'];
    state.archive.achievements = [...REQUIRED];
    state.archive.achievementDiffs = Object.fromEntries(REQUIRED.map(id => [id, 'normal']));
    const party = engine.partyInvitation();
    assert.ok(party);
    assert.equal(party.diffStr, 'normal');                      // Tages-Rang, geteilter Schlüssel
    localStorage.setItem(party.partyKey, 'true');               // Mittwoch-Gala schon gespielt
    assert.equal(engine.partyInvitation(), null);
    localStorage.removeItem(party.partyKey);
});
await ok('finishParty schließt die Woche: Zähler, Bilanz unter dem Party-Report, Slot leer', async () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 5;
    state.week.weekLog = [
        { dayIndex: 1, endTickets: 2, peakA: 50, peakC: 30, coffee: 2, mailsIgnored: 0 },
        { dayIndex: 2, endTickets: 1, peakA: 40, peakC: 40, coffee: 1, mailsIgnored: 1 },
        { dayIndex: 3, endTickets: 3, peakA: 70, peakC: 20, coffee: 3, mailsIgnored: 0 },
        { dayIndex: 4, endTickets: 2, peakA: 60, peakC: 50, coffee: 2, mailsIgnored: 1 },
    ];
    engine.saveWeek();
    state.currentPartyKey = 'layer8_party_played_easy';
    state.isPartyMode = true;
    const { ensure } = await import('../src/data.js');
    await ensure('party');
    engine.finishParty('SYNERGY!', 'Testabend.');

    assert.equal(calls.end.title, 'GALA VORBEI');
    assert.ok(calls.end.text.includes('Wochen-Bilanz'));        // Bilanz unter dem Party-Report
    assert.ok(calls.end.text.includes('WOCHE (Erholt)'));       // Party-Bilanz-Name week-aware
    assert.equal(state.archive.stats.weeksSurvived, 1);
    assert.equal(state.week.active, false);
    assert.equal(engine.loadWeek(), null);
    assert.equal(localStorage.getItem('layer8_party_played_easy'), 'true');
    localStorage.removeItem('layer8_party_played_easy');
});

// --------------------------------------------- diary, sleep, archive (3c)
console.log('Tagebuch, Schlaf & Archiv (Paket 3c):');
await ok('Tagebuch: {weekday} ist in der Woche der echte Kalendertag', async () => {
    resetState();
    await ensure('diary');
    const origDiary = DB.diary;
    DB.diary = { mood: [{ id: 't_mood', when: () => true, lines: ['Heute ist {weekday}, noch {restdays} Tage.'] }] };

    engine.startWeek('easy');                                   // Erholt = easy
    state.week.dayIndex = 3;
    let entry = buildDiary(state, 'WIN');
    assert.equal(entry.paragraphs[0].text, 'Heute ist Mittwoch, noch 2 Tage.');

    engine.endWeek();
    state.difficultyMult = 0.8;                                 // Tagesmodus easy
    entry = buildDiary(state, 'WIN');
    assert.ok(entry.paragraphs[0].text.startsWith('Heute ist Freitag'));
    DB.diary = origDiary;
});
await ok('Tagebuch: Wochen-Lauf liefert Absätze ohne offene Platzhalter', async () => {
    resetState();
    await ensure('diary');
    engine.startWeek('hard');
    state.week.dayIndex = 2;
    state.tickets = 4; state.rageWarningReceived = true;
    const entry = buildDiary(state, 'WIN');
    assert.ok(entry.paragraphs.length >= 3);
    for (const p of entry.paragraphs) assert.ok(!/\{\w+\}/.test(p.text), p.text);
});
await ok('Schlaftext: Level wählt das Register, ab Nacht 3 die abgenutzte Variante', () => {
    resetState();
    engine.startWeek('hard');
    state.week.dayIndex = 1; state.time = 16 * 60 + 30; state.ticketWarning = true;
    engine.checkEndConditions();
    const fresh = DB.special.week_sleep.hard.fresh;
    assert.ok(fresh.includes(state.pendingEnd.night.sleepText));

    state.pendingEnd = null;
    state.week.dayIndex = 4; state.morningMoodShown = true;
    engine.checkEndConditions();
    const worn = DB.special.week_sleep.hard.worn;
    assert.ok(worn.includes(state.pendingEnd.night.sleepText));
    state.pendingEnd = null;
});
await ok('Achievements: alle drei sind stufenfähig, keiner ist an einen Zustand gebunden', () => {
    // Sauber durch, Warteschlange leer -> alle drei
    resetState();
    engine.startWeek('hard');
    state.tickets = 0;
    engine.recordWeekResult('survived', 5);
    assert.deepEqual(calls.achs, ['ach_week', 'ach_week_iron', 'ach_week_clean']);

    // Dasselbe auf der leichtesten Stufe: identische Ausbeute, nur die
    // Wertung unterscheidet sich (difficultyTier in unlockAchievement).
    resetState();
    engine.startWeek('easy');
    state.tickets = 0;
    engine.recordWeekResult('survived', 5);
    assert.deepEqual(calls.achs, ['ach_week', 'ach_week_iron', 'ach_week_clean'],
        'kein Erfolg darf an eine Stufe gebunden sein');

    // Ventil gezogen und Tickets offen -> nur der Grunderfolg
    resetState();
    engine.startWeek('normal');
    state.rageWarningReceived = true;
    state.tickets = 3;
    engine.recordWeekResult('survived', 5);
    assert.deepEqual(calls.achs, ['ach_week']);

    resetState();
    engine.startWeek('easy');
    engine.recordWeekResult('rage', 2);                         // Scheitern
    assert.deepEqual(calls.achs, []);
});
await ok('"Überlebt" zählt nur ein erreichtes Freitagsende', () => {
    for (const [ausgang, tage] of [['rage', 3], ['fired', 4]]) {
        resetState();
        engine.startWeek('normal');
        engine.recordWeekResult(ausgang, tage);
        assert.equal(state.archive.stats.weeksSurvived ?? 0, 0, `${ausgang} zählte als überlebt`);
        assert.equal(state.archive.stats.weeksSurvived_normal ?? 0, 0);
    }
    resetState();
    engine.startWeek('normal');
    engine.recordWeekResult('survived', 5);
    assert.equal(state.archive.stats.weeksSurvived, 1);
});
await ok('Die drei Wochen-Achievements stehen im Datenbestand fürs Archiv', () => {
    for (const id of ['ach_week', 'ach_week_iron', 'ach_week_clean']) {
        assert.ok(DB.achievements.some(a => a.id === id), id);
    }
});

// ------------------------------------------------- Befunde aus dem Spieltest
console.log('Spieltest-Befunde:');
await ok('Der Ergebnis-Knopf sagt bei der Nacht nicht GAME OVER', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 2;
    state.time = 16 * 60 + 30;
    state.ticketWarning = true;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd.isNight, true);

    // Der Zweig, der den Knopf beschriftet (engine_events.resolveTerminal):
    // isNight muss VOR dem Fail-Zweig greifen.
    const src = readFileSync(new URL('../src/engine/engine_events.js', import.meta.url), 'utf-8');
    const iNight = src.indexOf('this.state.pendingEnd.isNight');
    const iOver  = src.indexOf("DAS WAR'S... (GAME OVER)");
    assert.ok(iNight > 0 && iNight < iOver, 'isNight-Zweig fehlt oder kommt zu spät');
});
await ok('Die Nacht liefert ganze Zahlen (keine 25.08 % im Kopfbereich)', () => {
    // Der Fall aus dem Spieltest: Erholt, Nacht 2 (Abnutzung 10 pp),
    // rAl = 0.62 -> 66 - 40.92 = 25.08 stand vorher roh im Kopfbereich.
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 2;
    state.al = 66; state.cr = 38; state.fl = 55; state.tickets = 6;
    engine.advanceWeekNight();
    for (const [name, v] of [['al', state.al], ['cr', state.cr], ['fl', state.fl]]) {
        assert.equal(v, Math.round(v), `${name} ist nicht ganzzahlig: ${v}`);
    }
    assert.equal(state.al, 25);                                 // gerundet aus 25.08
});
await ok('Nacht-Screen und Zustand zeigen exakt dieselben Werte', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 3;
    state.al = 71; state.cr = 43; state.tickets = 5;
    state.time = 16 * 60 + 30; state.ticketWarning = true;
    engine.checkEndConditions();
    const gezeigt = state.pendingEnd.night;
    engine.finishGame();
    engine.continueWeekNight();

    // Gegen den Speicherpunkt prüfen, nicht gegen den Live-Zustand:
    // continueWeekNight() spielt direkt danach den Morgen, und dessen
    // Stimmung verschiebt die Werte zufällig. saveWeek() schreibt den Stand
    // davor - genau das, was der Bildschirm versprochen hat.
    const stand = engine.loadWeek().day;
    assert.equal(stand.al, gezeigt.alAfter);
    assert.equal(stand.cr, gezeigt.crAfter);
    assert.equal(stand.tickets, gezeigt.ticketsAfter);
});

// ------------------------------------------------ Voreinstellung Arbeitswoche
console.log('Voreinstellung:');
await ok('defaultWeekDiff überspringt die Zustandswahl', () => {
    resetState();
    state.defaultWeekDiff = 'hard';
    engine.startWeekSelect();
    assert.ok(!calls.overlays.includes('week-modal'), 'Wahl hätte übersprungen werden müssen');
    assert.equal(state.week.active, true);
    assert.equal(state.week.level, 'hard');
    assert.equal(state.tickets, 2);                             // Urlaubsreif-Startzustand
    state.defaultWeekDiff = 'ask';
});
await ok('"ask" und ein unbekannter Wert zeigen weiterhin die Wahl', () => {
    for (const wert of ['ask', 'kaputt']) {
        resetState();
        state.defaultWeekDiff = wert;
        engine.startWeekSelect();
        assert.ok(calls.overlays.includes('week-modal'), `bei "${wert}" fehlt die Wahl`);
        assert.equal(state.week.active, false);
    }
    state.defaultWeekDiff = 'ask';
});
await ok('Der Tages-Slot bleibt von der Wochen-Voreinstellung unberührt', () => {
    resetState();
    state.time = 11 * 60; state.tickets = 3;
    engine.saveDay();
    state.defaultWeekDiff = 'easy';
    engine.startWeekSelect();
    assert.equal(state.week.level, 'easy');
    assert.ok(engine.loadDay(), 'Tages-Speicherstand wurde zerstört');
    state.defaultWeekDiff = 'ask';
});

// ----------------------------------------------------- Archiv-Zählweise
console.log('Archiv-Zähler:');
await ok('Wochentage zählen NICHT in die Tageszähler', () => {
    resetState();
    engine.startWeek('normal');
    engine.recordDayResult('survived');
    engine.recordDayResult('survived');
    assert.equal(state.archive.stats.daysSurvived ?? 0, 0, 'daysSurvived verunreinigt');
    assert.equal(state.archive.stats.survived_week_normal, 2, 'Wochentage fehlen im eigenen Namensraum');
    assert.equal(state.archive.stats.streak, 2, 'Serie zählt modusunabhängig weiter');

    engine.endWeek();
    engine.recordDayResult('survived');
    assert.equal(state.archive.stats.daysSurvived, 1);
    assert.equal(state.archive.stats.survived_normal, 1);
});
await ok('Rage und Kündigung landen im Wochenmodus nicht bei den Tagen', () => {
    resetState();
    engine.startWeek('hard');
    engine.recordDayResult('rage');
    engine.recordDayResult('fired');
    assert.equal(state.archive.stats.daysRageQuit ?? 0, 0);
    assert.equal(state.archive.stats.daysFired ?? 0, 0);
});
await ok('startWeek zählt begonnene Wochen je Stufe (Basis der Archiv-Balken)', () => {
    resetState();
    engine.startWeek('easy');
    engine.endWeek();
    engine.startWeek('easy');
    assert.equal(state.archive.stats.weeksStarted, 2);
    assert.equal(state.archive.stats.weeksStarted_easy, 2);
    engine.recordWeekResult('survived', 5);
    assert.equal(state.archive.stats.weeksSurvived_easy, 1);   // Quote 1/2
});
await ok('Der Endbildschirm kennzeichnet Wochen-Enden über das End-Objekt', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 5;
    state.time = 16 * 60 + 30;
    state.meetingDone = true;
    engine.checkEndConditions();
    engine.finishGame();
    assert.equal(calls.end.isWeek, true, 'isWeek fehlt - Kopfzeile zeigte den falschen Zähler');
    assert.equal(state.week.active, false);                     // endWeek lief davor
});

// -------------------------------------------------------- Steam-Zuordnung
console.log('Steam-Statistiken:');
await ok('Kein Wochentag wird als Tageslauf gemeldet', () => {
    const src = readFileSync(new URL('../src/platform_steam.js', import.meta.url), 'utf-8');
    const block = src.slice(src.indexOf('const STAT_NAMES'), src.indexOf('};', src.indexOf('const STAT_NAMES')));
    // daysStarted zählt Karrieretage inklusive Wochentagen - es darf deshalb
    // nicht mehr auf die Tages-Statistik zeigen.
    assert.ok(!/\bdaysStarted\s*:/.test(block), 'daysStarted darf nicht gemeldet werden');
    for (const key of ['started_easy', 'started_normal', 'started_hard',
                       'daysSurvived', 'daysRageQuit', 'daysFired',
                       'weeksStarted', 'weeksSurvived', 'weeksRageQuit', 'weeksFired']) {
        assert.ok(block.includes(key + ':'), `${key} fehlt in STAT_NAMES`);
    }
});
await ok('Ein Wochenlauf erzeugt nur Wochen-Zähler', () => {
    resetState();
    engine.startWeek('normal');                                  // weeksStarted(_normal)
    engine.recordDayResult('survived');
    engine.recordWeekResult('survived', 5);
    const st = state.archive.stats;
    for (const tagesKey of ['daysSurvived', 'daysRageQuit', 'daysFired',
                            'started_easy', 'started_normal', 'started_hard']) {
        assert.ok(!(st[tagesKey] > 0), `${tagesKey} wurde im Wochenmodus hochgezählt`);
    }
    assert.equal(st.weeksStarted, 1);
    assert.equal(st.weeksSurvived, 1);
});
await ok('Die Abfrage in main.cjs holt alle acht Namen', () => {
    const src = readFileSync(new URL('../electron/main.cjs', import.meta.url), 'utf-8');
    for (const n of ['stat_started', 'stat_survived', 'stat_ragequit', 'stat_fired',
                     'stat_weeks_started', 'stat_weeks_survived', 'stat_weeks_ragequit', 'stat_weeks_fired']) {
        assert.ok(src.includes(`'${n}'`), `${n} fehlt in der Steam-Abfrage`);
    }
    assert.ok(src.includes('count=${names.length}'), 'count muss mitwachsen');
});

// ----------------------------------------------------- Rückweg ins Menü
console.log('Hauptmenü:');
await ok('returnToMenu sichert die laufende Woche, bevor es zurückgeht', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 3;
    state.tickets = 4; state.morningMoodShown = true; state.time = 11 * 60;

    engine.returnToMenu();
    assert.equal(calls.reloaded, true, 'Rückkehr muss die Oberfläche neu aufbauen');

    const slot = engine.loadWeek();
    assert.ok(slot, 'Wochenlauf wurde nicht gesichert');
    assert.equal(slot.week.dayIndex, 3);
    assert.equal(slot.day.tickets, 4);
});
await ok('Im Tagesmodus landet der Stand im Tages-Slot', () => {
    resetState();
    state.time = 12 * 60 + 30; state.tickets = 2; state.morningMoodShown = true;
    engine.returnToMenu();
    const slot = engine.loadDay();
    assert.ok(slot, 'Tageslauf wurde nicht gesichert');
    assert.equal(slot.tickets, 2);
    assert.equal(engine.loadWeek(), null);
});
await ok('Ein offenes Ereignis verhindert das Sichern - wie beim Resume-Dialog', () => {
    resetState();
    engine.startWeek('easy');
    state.activeEvent = true;
    engine.returnToMenu();
    assert.equal(engine.loadWeek(), null, 'mitten im Ereignis darf nicht gesichert werden');
});

// ------------------------------------------------- Zeitsprünge (Spieltest)
console.log('Lange Ereignisse:');
await ok('Die Mittagspause hat ein Fenster: 12:30 ja, 15:50 nicht mehr', () => {
    resetState();
    state.time = 12 * 60 + 20;
    engine.resolveTerminal({ m: 10, r: 'x' }, 'coffee');
    assert.equal(state.lunchDone, true);
    assert.equal(calls.termResult?.action, 'triggerLunch', 'im Fenster muss die Pause kommen');

    // Ein Bossfight kann vier Stunden kosten: 11:50 -> 15:50
    resetState();
    state.time = 11 * 60 + 50;
    engine.resolveTerminal({ m: 240, r: 'x' }, 'server');
    assert.equal(state.lunchDone, true, 'die Pause ist trotzdem vorbei');
    assert.notEqual(calls.termResult?.action, 'triggerLunch',
        'um 15:50 darf keine Mittagspause mehr angeboten werden');
});
await ok('Das Freitagsfinale wird nicht von der Uhr überholt', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 5;
    state.meetingDone = false;
    state.time = 16 * 60 + 40;                                  // schon über Feierabend
    state.ticketWarning = true;

    engine.checkEndConditions();
    assert.equal(state.pendingEnd, null, 'die Woche darf ohne Meeting nicht enden');

    state.meetingDone = true;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd?.title, 'WOCHE ÜBERLEBT');
});
await ok('Mo–Do bleibt vom Meeting-Schutz unberührt', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 3;
    state.meetingDone = false;
    state.time = 16 * 60 + 40;
    state.ticketWarning = true;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd?.isNight, true);
});

// --------------------------------------------------- Randfälle (Abnahme)
console.log('Randfälle:');
await ok('Der Ausreden-Deckel gilt auch für die Morgenstimmung', () => {
    resetState();
    engine.startWeek('hard');                                   // Deckel 3
    state.excusesLeft = 3;
    engine.triggerMorningMood('excuse_plus');
    assert.equal(state.excusesLeft, 3, 'Deckel umgangen');

    engine.startWeek('hard');
    state.excusesLeft = 1;
    engine.triggerMorningMood('excuse_plus');
    assert.equal(state.excusesLeft, 2, 'unter dem Deckel muss sie wirken');

    resetState();                                               // Tagesmodus: kein Deckel
    state.excusesLeft = 9;
    engine.triggerMorningMood('excuse_plus');
    assert.equal(state.excusesLeft, 10);
});
await ok('Das Gala-Ende kennzeichnet die überstandene Woche', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 5;
    state.isPartyMode = true; state.partyProgress = 12;
    engine.finishParty('party_finale_standard');
    assert.equal(calls.end?.isWeek, true, 'Kopfzeile zeigte den Tageszähler');
    assert.equal(state.archive.stats.weeksSurvived, 1);

    resetState();                                               // Tagesmodus bleibt Tag
    state.isPartyMode = true; state.partyProgress = 12;
    engine.finishParty('party_finale_standard');
    assert.ok(!calls.end?.isWeek);
});
await ok('Erfolge tragen die Stufe des Wochenzustands', () => {
    resetState();
    engine.startWeek('hard');
    state.tickets = 0;
    engine.recordWeekResult('survived', 5);
    assert.ok(calls.achStufen.length >= 3);
    assert.ok(calls.achStufen.every(t => t === 3), `Stufen: ${calls.achStufen}`);
});
await ok('Kontingente überstehen das Fortsetzen', () => {
    resetState();
    engine.startWeek('normal');
    state.morningMoodShown = true;
    engine.spendContingent('coffee');
    engine.spendContingent('coffee');
    const vorher = engine.weekContingentLeft('coffee');
    engine.saveWeek();
    const slot = store.get('layer8_week');
    const archiv = JSON.parse(JSON.stringify(state.archive.stats));
    resetState();
    state.archive.stats = archiv;
    store.set('layer8_week', slot);
    engine.offerResume('week');
    engine.resumeDay();
    assert.equal(engine.weekContingentLeft('coffee'), vorher);
});

await ok('Das Meeting wiederholt sich nicht in aufeinanderfolgenden Wochen', async () => {
    resetState();
    await ensure('meetings');
    state.archive.seenMeetings = [];
    const folge = [];
    for (let w = 0; w < 6; w++) {
        Object.assign(state, freshDay(1.0));            // neue Woche, frische usedIDs
        engine.startWeek('normal');
        state.week.dayIndex = 5;
        state.meetingDone = false;
        engine.triggerMeeting();
        await new Promise(r => setTimeout(r, 10));
        folge.push(calls.terminal[0].id);
        engine.endWeek();
    }
    for (let i = 1; i < folge.length; i++) {
        assert.notEqual(folge[i], folge[i - 1], `Woche ${i + 1} wiederholt das Finale`);
    }
    // Das Gedächtnis darf den Pool nie ganz leeren
    assert.ok(state.archive.seenMeetings.length < DB.meetings.length);
});

console.log(`\n${passed} Tests bestanden.`);
