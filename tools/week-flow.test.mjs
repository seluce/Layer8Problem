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
const fakeEl = () => ({ textContent: '', innerText: '', innerHTML: '', classList: { add() {}, remove() {}, toggle() {}, contains: () => false }, id: '' });
globalThis.location = { reload() { calls.reloaded = true; } };
globalThis.document = {
    getElementById: (id) => { const el = fakeEl(); el.id = id; return el; },
    querySelectorAll: () => [],
};

const { DB, ensure, loadCore } = await import('../src/data.js');
// 6.0: the core tier is loaded, not statically imported. German is the source.
await loadCore('de');
await ensure('lore');
const { buildDiary } = await import('../src/engine/engine_diary.js');
const { core } = await import('../src/engine/engine_core.js');
const { events } = await import('../src/engine/engine_events.js');
const { week } = await import('../src/engine/engine_week.js');
const { inventory } = await import('../src/engine/engine_inventory.js');
// engine_ui is NOT spread into the harness engine (its functions need the DOM);
// the boot lines are pure computation, so they are called on it directly.
const { ui } = await import('../src/engine/engine_ui.js');
const { state, freshDay } = await import('../src/engine/engine_state.svelte.js');

// --- engine composition with UI stubs (later spread wins) --------------------
const calls = { overlays: [], end: null, boots: 0, resumeInfo: '' };
const engine = {
    state,
    ...core, ...events, ...week, ...inventory,
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
    setTerminalResult(text, m, l, a, b, action, buttonKey) { calls.termResult = { action, buttonKey }; },
    log(text) { (calls.logs ??= []).push(text); },
    unlockAchievement(id) { calls.achs.push(id); calls.achStufen.push(engine.difficultyTier()); },
    generateDiaryEntry: () => 'Tagebuch-Stub',
};

const resetState = () => {
    Object.assign(state, freshDay(1.0));
    state.difficultyMult = 1.0;   // freshDay trägt es nicht - sonst leckt ein Wert aus dem Vortest
    state.week = { active: false, level: null, dayIndex: 1, weekLog: [], repAtWeekStart: {} };
    state.archive.stats = { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 };
    // Reset the achievements too: the gala test unlocks them, and a later
    // Friday would otherwise end in the party instead of the balance sheet.
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
        { dayIndex: 1, endTickets: 4, endL: 20, endA: 31, endB: 24, coffee: 3, mailsIgnored: 1 },
        { dayIndex: 2, endTickets: 2, endL: 27, endA: 35, endB: 28, coffee: 2, mailsIgnored: 0 },
        { dayIndex: 3, endTickets: 5, endL: 34, endA: 43, endB: 33, coffee: 4, mailsIgnored: 2 },
        { dayIndex: 4, endTickets: 3, endL: 41, endA: 47, endB: 37, coffee: 1, mailsIgnored: 0 },
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
    // Closing values instead of the peak, abbreviated, legend in the header
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
    // cause, not the title: the title is a dictionary entry and reads
    // differently in the other language.
    assert.equal(state.pendingEnd.cause, 'rage');
    assert.ok(state.pendingEnd.lead.includes('Die Woche endet am Mittwoch.'));
    engine.finishGame();

    assert.ok(calls.end.text.includes('✗ Mittwoch'));
    assert.equal(state.archive.stats.weeksRageQuit, 1);
    assert.equal(state.archive.stats.weekBestDay, 2);           // zwei Tage geschafft
    assert.equal(state.archive.stats.weekVentSaves, 1);         // once per week, in the week's own key
    assert.equal(state.archive.stats.ventSaves ?? 0, 0);        // the day key stays day mode only
    assert.equal(state.week.active, false);
});
await ok('recordDayResult zählt Ventil-Flags im Wochenmodus NICHT täglich', () => {
    resetState();
    engine.startWeek('easy');
    state.rageWarningReceived = true;
    engine.recordDayResult('survived');
    engine.recordDayResult('survived');
    assert.equal(state.archive.stats.ventSaves ?? 0, 0);        // erst recordWeekResult zählt
    assert.equal(state.archive.stats.weekVentSaves ?? 0, 0);    // and only into the week key
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
    assert.equal(calls.end.cause, 'tickets');
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

    // Fresh boot: state cleared, only the save slot survives
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
await ok('Ein Spielstand aus 5.0 bringt seine Tageskurve mit (Migration)', () => {
    resetState();
    // Genau die Form, die 5.0 geschrieben hat: t für die Uhrzeit, f/a/c für
    // die drei Balken. Alle Leser greifen mit `?? 0` zu — ohne Migration
    // fiele die Kurve lautlos auf null, statt einen Fehler zu werfen.
    const alt = {
        time: 11 * 60, difficultyMult: 1.0,
        statHistory: [{ t: 480, f: 0, a: 0, c: 0 }, { t: 620, f: 25, a: 40, c: 35 }]
    };
    engine.applyRestoredDay(alt);

    assert.deepEqual(state.statHistory, [
        { m: 480, l: 0,  a: 0,  b: 0 },
        { m: 620, l: 25, a: 40, b: 35 }
    ], 'alter Kurvenpunkt nicht umgesetzt');

    // Zweimal angewandt darf nichts kaputtmachen — ein neuer Punkt trägt
    // kein t und fällt durch die Bedingung.
    const nochmal = engine.migrateStatPoints(state.statHistory);
    assert.deepEqual(nochmal, state.statHistory, 'Migration ist nicht idempotent');
});
await ok('Die Startzeile eines alten Spielstands nennt die laufende Version', () => {
    resetState();
    // Ein Stand, der unter 5.0 gespeichert wurde. init() schreibt die
    // Versionszeile als ersten Protokolleintrag der Sitzung, und weil
    // setDifficulty den Tag nicht zurücksetzt, wandert sie mit in den
    // Spielstand. Unverändert wiederhergestellt behauptet das Protokoll eine
    // andere Version als die Kopfzeile daneben.
    const alt = {
        time: 11 * 60, difficultyMult: 1.0,
        logEntries: [
            { id: 1, time: '08:00', msg: 'System v5.0.0 geladen. Warte auf User...', color: '' },
            { id: 2, time: '08:00', msg: 'Modus: MITTWOCH. Business as usual.',     color: '' },
            { id: 3, time: '09:15', msg: 'Kaffee geholt.',                          color: '' }
        ]
    };
    engine.applyRestoredDay(alt);

    assert.ok(state.logEntries[0].msg.includes(engine.VERSION),
              `Startzeile nennt nicht ${engine.VERSION}: ${state.logEntries[0].msg}`);
    assert.ok(!state.logEntries[0].msg.includes('v5.0.0'), 'alte Version steht noch da');
    // Der Rest des Protokolls ist Gedächtnis und bleibt unangetastet.
    assert.equal(state.logEntries[1].msg, 'Modus: MITTWOCH. Business as usual.');
    assert.equal(state.logEntries[2].msg, 'Kaffee geholt.');
    assert.equal(state.logEntries.length, 3, 'Eintrag dazu- oder weggekommen');
});
await ok('Ohne Startzeile wird nichts umgeschrieben', () => {
    resetState();
    // Ein späterer Tag einer Woche: der Zähler läuft weiter, id 1 kommt nicht
    // vor. Und ein langer Tag schiebt die Startzeile ohnehin aus dem Puffer.
    const alt = {
        time: 11 * 60, difficultyMult: 1.0,
        logEntries: [
            { id: 47, time: '08:00', msg: 'Modus: MITTWOCH. Business as usual.', color: '' },
            { id: 48, time: '09:15', msg: 'Kaffee geholt.',                      color: '' }
        ]
    };
    engine.applyRestoredDay(alt);
    assert.deepEqual(state.logEntries.map(e => e.msg),
                     ['Modus: MITTWOCH. Business as usual.', 'Kaffee geholt.']);
});
await ok('Eine Wochenzeile aus 5.0 kommt mit (Migration)', () => {
    resetState();
    const alt = [
        { dayIndex: 1, endTickets: 4, endFl: 20, endAl: 31, endCr: 24, peakA: 50, peakC: 30, coffee: 3, mailsIgnored: 1 },
        { dayIndex: 2, endTickets: 2, endL: 27, endA: 35, endB: 28, peakA: 40, peakB: 40, coffee: 2, mailsIgnored: 0 }
    ];
    const neu = engine.migrateWeekLog(alt);

    assert.deepEqual(neu[0], { dayIndex: 1, endTickets: 4, coffee: 3, mailsIgnored: 1,
                               endL: 20, endA: 31, endB: 24, peakA: 50, peakB: 30 },
                     'alte Wochenzeile nicht umgesetzt');
    assert.deepEqual(neu[1], alt[1], 'neue Wochenzeile angefasst');
    assert.equal(neu[0].endFl, undefined, 'alter Schlüssel überlebt');
    assert.equal(neu[0].peakC, undefined, 'alter Schlüssel überlebt');
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
    // No fixed values here: the restart plays Monday morning right away and
    // its mood is random. What matters is that the baggage is gone.
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
    assert.equal(engine.weekContingentLeft('coffee'), 20);      // ~203 events -> the cap
    assert.equal(engine.weekContingentLeft('calls'), 17);
    assert.equal(engine.weekContingentLeft('sidequest'), 26);   // singular button -> pool key

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
    assert.equal(engine.weekContingentLeft('calls'), 17);       // Tuesday, pool still deep
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
    assert.equal(calls.terminal[0].opts[0].a, 0);               // sim contract: the wall pays nothing
    assert.equal(state.week.contingents.coffee, 0);             // Leerlauf verbraucht nichts
});
await ok('Tagesmodus kennt keine Kontingente (spend ist No-op)', () => {
    resetState();                                               // week.active false
    engine.spendContingent('coffee');
    assert.deepEqual(state.week.contingents ?? {}, {});
});
// ------------------------------------------------------- Statuswerte (v5.0)
console.log('Statuswerte:');
await ok('Werte bleiben beim Zuweisen in 0..100', () => {
    resetState();
    state.fl = 98;
    events.addStat.call(engine, 'fl', 7);
    assert.equal(state.fl, 100, 'über 100 gerutscht');
    state.al = 3;
    events.addStat.call(engine, 'al', -20);
    assert.equal(state.al, 0, 'unter 0 gerutscht');
});
await ok('Ein Ereignis kann die Anzeige nicht überschießen lassen', () => {
    resetState();
    state.fl = 96; state.al = 95; state.cr = 97;
    // resolveTerminal is the path the phone sidequests take as well
    events.resolveTerminal.call(engine, { m: 5, l: 15, a: 20, b: 25, r: 'x' }, 'sidequest');
    for (const k of ['fl', 'al', 'cr'])
        assert.ok(state[k] <= 100, `${k} steht bei ${state[k]}`);
});
await ok('Die Todesschwelle wird bei genau 100 noch erreicht', () => {
    resetState();
    state.al = 90;
    events.addStat.call(engine, 'al', 50);   // würde ohne Deckel 140 ergeben
    assert.equal(state.al, 100, 'Deckel verfehlt');
    assert.ok(state.al >= 100, 'Todesprüfung (>= 100) griffe nicht mehr');
});

// -------------------------------------------------------------- Musik (v5.0)
console.log('Musik:');
{
    // Audio stub - the real element does not exist under node.
    class FakeAudio {
        constructor(src) { this.src = src; this.volume = 1; this.paused = true; this.loop = false; this.preload = ''; this._h = {}; }
        play() { this.paused = false; return Promise.resolve(); }
        pause() { this.paused = true; }
        addEventListener(e, f) { this._h[e] = f; }
    }
    globalThis.Audio = FakeAudio;
    const { audio } = await import('../src/engine/engine_audio.js');
    const mus = { state, ...audio };
    const wait = (ms) => new Promise(r => setTimeout(r, ms));

    await ok('Ein Titel blendet ein statt hart zu starten', async () => {
        state.musicEnabled = true; state.musicVolume = 0.8; state.musicStyle = 'radio';
        mus.initMusic();
        mus.playMusic('office');
        const key = state.currentMusicTrack;
        assert.equal(mus.bgmTracks[key].volume, 0, 'startet nicht bei 0');
        await wait(750);
        assert.ok(Math.abs(mus.bgmTracks[key].volume - 0.8) < 0.02, 'blendet nicht auf Zielwert');
    });

    await ok('Der abgelöste Titel wird pausiert und auf Lautstärke zurückgesetzt', async () => {
        state.musicEnabled = true; state.musicVolume = 0.8; state.musicStyle = 'radio';
        mus.initMusic();
        mus.playMusic('office');
        const alt = state.currentMusicTrack;
        await wait(700);
        mus.playMusic('boss');
        await wait(500);
        assert.ok(mus.bgmTracks[alt].paused, 'alter Titel läuft weiter');
        // must not stay at 0, or a later play() without fade would be silent
        assert.ok(Math.abs(mus.bgmTracks[alt].volume - 0.8) < 0.02, 'Lautstärke nicht zurückgesetzt');
    });

    await ok('Fester Stil wiederholt nahtlos, Radio nicht', () => {
        state.musicEnabled = false; state.musicStyle = 'radio';
        mus.initMusic();
        assert.equal(mus.bgmTracks.lofi.loop, false, 'Radio darf nicht loopen');
        mus.changeMusicStyle('lofi');
        assert.equal(mus.bgmTracks.lofi.loop, true, 'fester Stil loopt nicht');
        mus.changeMusicStyle('radio');
        assert.equal(mus.bgmTracks.lofi.loop, false, 'Rückschaltung greift nicht');
    });

    await ok('Der Lautstärkeregler schlägt eine laufende Blende', async () => {
        state.musicEnabled = true; state.musicVolume = 0.8; state.musicStyle = 'radio';
        mus.initMusic();
        mus.playMusic('office');
        const key = state.currentMusicTrack;
        mus.setMusicVolume(0.3);      // mitten im Einblenden
        await wait(750);
        assert.ok(Math.abs(mus.bgmTracks[key].volume - 0.3) < 0.02,
                  `Blende überschreibt den Regler: ${mus.bgmTracks[key].volume}`);
    });
}

// ------------------------------------------- Mittagspause mit Fahnen (v5.1)
console.log('Mittagspause:');
await ensure('lunch');
const origRenderTerminal = engine.renderTerminal;
await ok('Ein Nachklang erscheint nicht ohne seine Fahne', async () => {
    resetState();
    state.week = { active: true, dayIndex: 3 };
    state.storyFlags = {};
    let gezogen = [];
    engine.renderTerminal = (ev) => gezogen.push(ev.id);
    for (let i = 0; i < 25; i++) { state.usedIDs.clear(); await engine.triggerLunch(); }
    const nach = gezogen.filter(id => id.startsWith('lunch_nach_'));
    assert.equal(nach.length, 0, `ohne Vorgeschichte gezogen: ${nach.join(', ')}`);
});
await ok('Mit Fahne kommt der Nachklang mit derselben 30-Prozent-Chance', async () => {
    // Same rule as the action pools (FOLLOWUP_CHANCE), so a single draw
    // proves nothing - the rate does.
    resetState();
    state.week = { active: true, dayIndex: 3 };
    state.storyFlags = { path_lunch_gelaufen: 2 };   // gestern gesetzt
    let nach = 0;
    const N = 600;
    engine.renderTerminal = (ev) => { if (ev.id.startsWith('lunch_nach_')) nach++; };
    for (let i = 0; i < N; i++) { state.usedIDs.clear(); await engine.triggerLunch(); }
    const quote = nach / N;
    assert.ok(Math.abs(quote - events.FOLLOWUP_CHANCE) < 0.08,
              `Quote ${(quote * 100).toFixed(1)}% weicht von ${events.FOLLOWUP_CHANCE * 100}% ab`);
});
await ok('Am selben Tag noch nicht', async () => {
    resetState();
    state.week = { active: true, dayIndex: 2 };
    state.storyFlags = { path_lunch_gelaufen: 2 };   // heute gesetzt
    let gezogen = [];
    engine.renderTerminal = (ev) => gezogen.push(ev.id);
    for (let i = 0; i < 15; i++) { state.usedIDs.clear(); await engine.triggerLunch(); }
    assert.ok(!gezogen.some(id => id.startsWith('lunch_nach_')), 'reqStoryAge greift nicht');
});
engine.renderTerminal = origRenderTerminal;   // Gerüst wiederherstellen

// ---------------------------------------------- Wissen: neu/gelesen (v5.1)
await ensure('compendium');
console.log('Wissen, Neu-Markierung:');
await ok('Ein frisch geöffneter Eintrag gilt als neu', () => {
    resetState();
    state.archive.seenEvents = ['cof_sonntag_1'];
    state.archive.seenFlags = [];
    state.archive.knowledgeRead = {};
    const e = engine.knowledgeEntries().find(x => x.id === 'sonntag');
    assert.equal(e.open, true);
    assert.equal(e.unread, true, 'nicht als neu erkannt');
});
await ok('Gelesen heißt gelesen', () => {
    resetState();
    state.archive.seenEvents = ['cof_sonntag_1'];
    state.archive.knowledgeRead = {};
    let e = engine.knowledgeEntries().find(x => x.id === 'sonntag');
    engine.markKnowledgeRead('sonntag', e.notes.length);
    e = engine.knowledgeEntries().find(x => x.id === 'sonntag');
    assert.equal(e.unread, false, 'bleibt trotz Lesen neu');
});
await ok('Eine spätere Notiz macht den Eintrag wieder neu', () => {
    resetState();
    state.archive.seenEvents = ['cof_sonntag_1'];
    state.archive.knowledgeRead = {};
    engine.markKnowledgeRead('sonntag', 1);
    // second scene experienced later
    state.archive.seenEvents.push('cof_sonntag_2');
    const e = engine.knowledgeEntries().find(x => x.id === 'sonntag');
    assert.equal(e.notes.length, 2);
    assert.equal(e.unread, true, 'Nachschlag nicht gemeldet');
});
await ok('Eine Fahnen-Notiz allein öffnet den Eintrag nicht', () => {
    // The gap the other three miss: notes unlock via `seen` OR via `flag`, and
    // a flag can be raised while none of the entry's sighting events has been
    // opened. Without the `open` guard the register would highlight an entry
    // the player has not met yet.
    resetState();
    state.archive.seenEvents = [];
    state.archive.seenFlags = ['path_flirt_date'];
    state.archive.knowledgeRead = {};
    const e = engine.knowledgeEntries().find(x => x.id === 'sarah');
    assert.equal(e.open, false, 'gilt fälschlich als getroffen');
    assert.ok(e.notes.length > 0, 'Fahnen-Notiz nicht freigeschaltet');
    assert.equal(e.unread, false, 'ungeöffneter Eintrag meldet sich als neu');
});
await ok('Was man nie getroffen hat, ist nicht neu', () => {
    resetState();
    state.archive.seenEvents = [];
    state.archive.knowledgeRead = {};
    assert.equal(engine.knowledgeEntries().some(e => e.unread), false, 'ungeöffnete Einträge melden sich');
});

// ------------------------------------------------------ Boot-Sequenz (v5.0)
console.log('Startbildschirm:');
await ok('Ab dem zweiten Morgen ist der Start kurz', () => {
    resetState();
    state.week = { active: true, dayIndex: 3 };
    state.tickets = 2;
    const lines = ui.buildBootLines.call(engine);
    assert.ok(lines.length <= 5, `zu lang: ${lines.length} Zeilen`);
    assert.ok(!lines.some(l => l.includes('Copyright')), 'Begrüßungskopf am Folgetag');
});
await ok('Der Start meldet die übernommenen Tickets', () => {
    resetState();
    state.week = { active: true, dayIndex: 2 };
    state.tickets = 4;
    const lines = ui.buildBootLines.call(engine);
    assert.ok(lines.some(l => l.includes('Übernehme offene Tickets: 4')), lines.join(' | '));
});
await ok('Am Freitag steht das Meeting an erster Stelle', () => {
    resetState();
    state.week = { active: true, dayIndex: 5 };
    state.tickets = 6;
    const lines = ui.buildBootLines.call(engine);
    const idx = lines.findIndex(l => l.includes('WOCHENMEETING'));
    assert.ok(idx > 0 && idx < 3, `Meeting an Position ${idx}: ${lines.join(' | ')}`);
});
await ok('Ohne Woche bleibt der volle Begrüßungskopf', () => {
    resetState();
    state.week = { active: false, dayIndex: 0 };
    const lines = ui.buildBootLines.call(engine);
    assert.ok(lines.some(l => l.includes('Copyright')), 'Kopf fehlt im Tagesmodus');
    assert.equal(new Set(lines).size, lines.length, 'doppelte Zeile im Start');
});
await ok('Montag nennt die Startbedingung statt eines Übertrags', () => {
    // startWeek() sets tickets and aggro as the level's starting condition,
    // and a week restart via the settings puts the player back exactly there.
    // Calling that a carry-over would report something that never happened.
    resetState();
    state.week = { active: true, level: 'hard', dayIndex: 1 };
    state.tickets = 2; state.al = 10;
    const lines = ui.buildBootLines.call(engine);
    assert.ok(!lines.some(l => l.includes('Übernehme offene Tickets')), lines.join(' | '));
    assert.ok(!lines.some(l => l.includes('Vortag')), lines.join(' | '));
    assert.ok(lines.some(l => l.includes('URLAUBSREIF')), 'Startbedingung fehlt');
});
await ok('Der Arbeitstag meldet nie einen Übertrag', () => {
    // The day restart plays the boot sequence BEFORE reset(), so the state
    // still holds the finished day. Nothing of it may show up: a workday
    // always starts clean at the chosen difficulty.
    resetState();
    state.week = { active: false, dayIndex: 0 };
    state.tickets = 7; state.cr = 60; state.al = 80;
    state.inventory = [{ id: 'tape' }, { id: 'donut' }];
    const lines = ui.buildBootLines.call(engine);
    for (const wort of ['Übernehme', 'Vortag', 'Rucksack-Inventur', 'Resttage', 'WOCHENMEETING'])
        assert.ok(!lines.some(l => l.includes(wort)), `"${wort}" im Tagesmodus: ${lines.join(' | ')}`);
});

// ------------------------------------------------------- compendium (v5.0)
console.log('Wissen / Kompendium:');
await ensure('compendium');
await ok('Beweise landen dauerhaft im Archiv', () => {
    resetState();
    state.archive.seenEvents = []; state.archive.seenFlags = [];
    events.recordSeen.call(engine, 'event', 'cof_sonntag_1');
    events.recordSeen.call(engine, 'event', 'cof_sonntag_1');   // doppelt zählt nicht
    events.setStoryFlag.call(engine, 'srv_marder_meldung');
    assert.deepEqual(state.archive.seenEvents, ['cof_sonntag_1']);
    assert.ok(state.archive.seenFlags.includes('srv_marder_meldung'));
});
await ok('Ohne Begegnung bleibt der Eintrag zu', () => {
    resetState();
    state.archive.seenEvents = []; state.archive.seenFlags = [];
    const sonntag = engine.knowledgeEntries().find(e => e.id === 'sonntag');
    assert.equal(sonntag.open, false, 'Kopf ohne Begegnung offen');
    assert.equal(sonntag.notes.length, 0);
});
await ok('Eine Begegnung öffnet den Kopf, die Notiz folgt dem Beweis', () => {
    resetState();
    state.archive.seenEvents = ['cof_sonntag_1']; state.archive.seenFlags = [];
    const sonntag = engine.knowledgeEntries().find(e => e.id === 'sonntag');
    assert.equal(sonntag.open, true, 'Kopf nicht freigeschaltet');
    assert.equal(sonntag.notes.length, 1, 'genau die erlebte Notiz erwartet');
    assert.ok(sonntag.notes[0].includes('zweimal aus und wieder ein'));
});
await ok('Fahnen schalten Notizen genauso frei wie Ereignisse', () => {
    resetState();
    state.archive.seenEvents = ['srv_marder_1'];
    state.archive.seenFlags = ['srv_marder_meldung'];
    const b = engine.knowledgeEntries().find(e => e.id === 'blaschke');
    assert.equal(b.open, true);
    assert.equal(b.notes.length, 1);
    assert.ok(b.notes[0].includes('Rhythmus'));
});
await ok('Der Beweis wird beim Öffnen eines Ereignisses aufgezeichnet', () => {
    resetState();
    state.archive.seenEvents = [];
    events.renderTerminal.call(engine, { id: 'tst_seen', title: 'T', text: 'x', opts: [] }, 'server');
    assert.ok(state.archive.seenEvents.includes('tst_seen'), 'Haken fehlt');
});

// --------------------------------------------------- item cooldowns (v5.0)
console.log('Gegenstände mit Abklingzeit und Kosten:');
await ok('Abklingzeiten gelten pro Gegenstand, nicht global', () => {
    resetState();
    state.time = 600;
    engine.state.itemCooldowns.stressball = 600;
    // The ball is cooling; the doll has its own clock and stays available.
    assert.ok(state.time - state.itemCooldowns.stressball < DB.items.stressball.use.cooldown);
    assert.equal(state.itemCooldowns.voodoo_doll ?? undefined, undefined);
});
await ok('Die Krawatte senkt Chef beim Auftritt von Dr. Wichtig', () => {
    resetState();
    state.cr = 50;
    state.inventory = [{ id: 'tie', used: false }];
    engine.applyPassiveItems('Dr. Wichtig');
    assert.equal(state.cr, 45, 'passiver Effekt nicht angewandt');
});
await ok('Die Krawatte bleibt bei anderen Figuren still', () => {
    resetState();
    state.cr = 50;
    state.inventory = [{ id: 'tie', used: false }];
    engine.applyPassiveItems('Kevin');
    engine.applyPassiveItems(null);
    assert.equal(state.cr, 50, 'Effekt feuerte bei der falschen Figur');
});
await ok('Ohne Krawatte im Rucksack passiert nichts', () => {
    resetState();
    state.cr = 50;
    state.inventory = [];
    engine.applyPassiveItems('Dr. Wichtig');
    assert.equal(state.cr, 50);
});
await ok('Der Chef-Wert bleibt bei 0 gedeckelt', () => {
    resetState();
    state.cr = 2;
    state.inventory = [{ id: 'tie', used: false }];
    engine.applyPassiveItems('Dr. Wichtig');
    assert.equal(state.cr, 0, 'unter null gerutscht');
});
await ok('Der Effekt hängt wirklich am Öffnen eines Ereignisses', () => {
    resetState();
    state.cr = 50;
    state.inventory = [{ id: 'tie', used: false }];
    // The REAL renderTerminal, not the harness stub above: only this proves
    // the hook is wired. Calling it through the helper would pass even if
    // nobody ever called applyPassiveItems in production.
    events.renderTerminal.call(engine, { id: 'tst_passive', char: 'Dr. Wichtig', title: 'T', text: 'x', opts: [] }, 'server');
    assert.equal(state.cr, 45, 'Haken in renderTerminal fehlt');
    assert.equal(calls.termEvent.charName, 'Dr. Wichtig');
});
await ok('use.b und use.rep wirken beim Benutzen', () => {
    resetState();
    state.time = 600;
    state.inventory = [{ id: 'voodoo_doll', used: false }];
    const al0 = state.al, cr0 = state.cr;
    state.pendingItem = 'voodoo_doll';
    engine.confirmUseItem();
    assert.equal(state.al, Math.max(0, al0 - 20), 'Aggro nicht gesenkt');
    assert.equal(state.cr, cr0 + 10, 'Chef-Wert nicht gestiegen');
    assert.equal(state.reputation['Dr. Wichtig'], -2, 'Ruf nicht abgezogen');
    assert.equal(state.itemCooldowns.voodoo_doll, 600, 'Abklingzeit nicht gesetzt');
    // keep: true - the doll stays in the backpack
    assert.ok(state.inventory.some(i => i.id === 'voodoo_doll'), 'Puppe verschwunden');
});
await ok('Der Chef-Wert bleibt bei 100 gedeckelt', () => {
    resetState();
    state.time = 600;
    state.cr = 95;
    state.inventory = [{ id: 'voodoo_doll', used: false }];
    state.pendingItem = 'voodoo_doll';
    engine.confirmUseItem();
    assert.equal(state.cr, 100, 'Deckel verletzt');
});

// ------------------------------------------------------- time predicates (3f)
console.log('Zeit-Prädikate (Dreiteiler):');
await ok('Fahnen tragen in der Woche den Setz-Tag, im Tagesmodus true', () => {
    resetState();
    engine.setStoryFlag('tst_day_flag');
    assert.equal(state.storyFlags.tst_day_flag, true);          // day mode: plain truthy
    engine.startWeek('easy');
    state.week.dayIndex = 2;
    engine.setStoryFlag('tst_week_flag');
    assert.equal(state.storyFlags.tst_week_flag, 2);            // week mode: the day number
});
await ok('reqStoryAge sperrt am selben Tag und öffnet nach der Nacht', () => {
    resetState();
    engine.startWeek('easy');
    engine.setStoryFlag('tst_ketchup');
    const ev = { id: 'tst', reqStory: 'tst_ketchup', reqStoryAge: 1 };
    assert.equal(engine.storyGateOpen(ev), false);              // same day: locked
    engine.advanceWeekNight();
    assert.equal(engine.storyGateOpen(ev), true);               // tomorrow: open
    assert.equal(engine.storyGateOpen({ ...ev, reqStoryAge: 2 }), false);
});
await ok('reqWeekDayMin öffnet ab dem Stichtag, nicht nur an ihm', () => {
    resetState();
    engine.startWeek('easy');
    const ev = { id: 'tst', reqWeekDayMin: 3 };
    assert.equal(engine.storyGateOpen(ev), false);              // Monday
    state.week.dayIndex = 3;
    assert.equal(engine.storyGateOpen(ev), true);               // Wednesday
    state.week.dayIndex = 4;
    assert.equal(engine.storyGateOpen(ev), true);               // Thursday too: min, not only
});
await ok('Tagesmodus erfüllt Zeit-Prädikate nie', () => {
    resetState();                                               // week.active false
    engine.setStoryFlag('tst_ketchup');
    assert.equal(engine.storyGateOpen({ id: 'tst', reqStory: 'tst_ketchup' }), true);
    assert.equal(engine.storyGateOpen({ id: 'tst', reqStory: 'tst_ketchup', reqStoryAge: 1 }), false);
    assert.equal(engine.storyGateOpen({ id: 'tst', reqWeekDayMin: 2 }), false);
});
await ok('Der Tag-Stempel überlebt Speichern und Laden', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 2;
    engine.setStoryFlag('tst_stamp');
    engine.saveWeek();
    const slot = JSON.parse(store.get('layer8_week'));
    assert.ok(JSON.stringify(slot).includes('"tst_stamp":2'), 'Stempel fehlt im Wochen-Slot');
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
    engine.resolveTerminal({ r: 'Test.', m: 10, l: 0, a: 0, b: 0 }, 'coffee');
    assert.equal(calls.termResult.action, 'triggerMeeting');
    // Kennung statt Anzeigetext: der Knopf trägt seit 6.0 den Schlüssel, und
    // ein Vergleich gegen 'ZUM WOCHENMEETING' hätte nur auf Deutsch geprüft.
    assert.equal(calls.termResult.buttonKey, 'terminal.btn.meeting');
});
await ok('Kein Meeting-Knopf: Mo–Do, Tagesmodus, oder Meeting schon erledigt', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 3;                                    // Mittwoch
    state.time = 14 * 60 + 55; state.lunchDone = true;
    state.currentEventId = 'x'; state.currentEventType = 'coffee';
    engine.resolveTerminal({ r: 'Test.', m: 10, l: 0, a: 0, b: 0 }, 'coffee');
    assert.equal(calls.termResult.action, 'reset');

    state.week.dayIndex = 5; state.meetingDone = true;          // Freitag, aber erledigt
    state.time = 15 * 60 + 30;
    engine.resolveTerminal({ r: 'Test.', m: 10, l: 0, a: 0, b: 0 }, 'coffee');
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

    // Without the meeting nothing ends - the button leads to the meeting room.
    state.meetingDone = false;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd, null, 'das Finale darf nicht übersprungen werden');

    // With the meeting and the requirements met: the gala
    state.meetingDone = true;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd.isParty, true);

    // With the meeting, without the gala requirements: the balance sheet
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
        { dayIndex: 1, endTickets: 2, peakA: 50, peakB: 30, coffee: 2, mailsIgnored: 0 },
        { dayIndex: 2, endTickets: 1, peakA: 40, peakB: 40, coffee: 1, mailsIgnored: 1 },
        { dayIndex: 3, endTickets: 3, peakA: 70, peakB: 20, coffee: 3, mailsIgnored: 0 },
        { dayIndex: 4, endTickets: 2, peakA: 60, peakB: 50, coffee: 2, mailsIgnored: 1 },
    ];
    engine.saveWeek();
    state.currentPartyKey = 'layer8_party_played_easy';
    state.isPartyMode = true;
    const { ensure } = await import('../src/data.js');
    await ensure('party');
    engine.finishParty('SYNERGY!', 'Testabend.');

    assert.equal(calls.end.cause, 'party');
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

    // The same on the easiest tier: identical yield, only the grade differs
    // (difficultyTier inside unlockAchievement).
    resetState();
    engine.startWeek('easy');
    state.tickets = 0;
    engine.recordWeekResult('survived', 5);
    assert.deepEqual(calls.achs, ['ach_week', 'ach_week_iron', 'ach_week_clean'],
        'kein Erfolg darf an eine Stufe gebunden sein');

    // Valve pulled and tickets left open -> only the base achievement
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

    // The branch that labels the button (engine_events.resolveTerminal):
    // isNight has to come BEFORE the failure branch. Anchored on the KEY, not
    // on the caption - the caption moved into the dictionary in 6.0 and the
    // English one does not say GAME OVER in German.
    //
    // Auf die ZUWEISUNG gesucht, nicht auf den Schlüssel: seit die Kennung
    // statt des Wortes reist, steht derselbe Schlüssel weiter oben auch in
    // einer `i18n-uses`-Anmeldung, und die Suche fand den Kommentar.
    const src = readFileSync(new URL('../src/engine/engine_events.js', import.meta.url), 'utf-8');
    const iNight = src.indexOf('this.state.pendingEnd.isNight');
    const iOver  = src.indexOf("btnKey = 'terminal.btn.gameOver'");
    assert.ok(iNight > 0 && iOver > 0 && iNight < iOver, 'isNight-Zweig fehlt oder kommt zu spät');
});
await ok('Die Nacht liefert ganze Zahlen (keine 25.08 % im Kopfbereich)', () => {
    // The case from play testing: Erholt, night 2 (wear 10 pp), rAl = 0.62
    // -> 66 - 40.92 = 25.08 used to sit raw in the header.
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

    // Check against the checkpoint, not the live state: continueWeekNight()
    // plays the morning right afterwards and its mood shifts the values at
    // random. saveWeek() writes the state before that - exactly what the
    // screen promised.
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
    assert.equal(state.archive.stats.streak ?? 0, 0, 'die Tages-Serie bleibt vom Wochenmodus unberührt');

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
console.log('Steam-Präsenz:');
await ok('Die Präsenz reist als Kennung, nicht als Satz', async () => {
    // Ein fertiger Satz käme bei Steam über %statustext% wörtlich heraus und
    // zeigte JEDEM Freund die Sprache des Spielers. Eine Kennung löst Steam in
    // der Sprache dessen auf, der hinsieht — und kein Prüfer hier drin würde
    // den Unterschied bemerken, weil beides „funktioniert".
    const { PRESENCE_TOKEN } = await import('../src/engine/presence.js');
    const { platform } = await import('../src/platform.js');
    // core.updatePresence, nicht engine.updatePresence: der Aufbau dieser Reihe
    // ersetzt es oben durch eine Attrappe, und die prüfte sich selbst.
    const { core } = await import('../src/engine/engine_core.js');

    const gesendet = [];
    const echt = platform.presence;
    platform.presence = (token) => gesendet.push(token);

    core.updatePresence('coffee');
    core.updatePresence('gibtesnicht');
    platform.presence = echt;

    assert.deepEqual(gesendet, [PRESENCE_TOKEN + 'coffee', PRESENCE_TOKEN + 'fallback']);
    for (const token of gesendet) {
        assert.ok(token.startsWith('#'), `keine Steam-Kennung: ${token}`);
        assert.ok(!/\s/.test(token), `sieht nach einem Satz aus: ${token}`);
    }
});

console.log('Steam-Statistiken:');
await ok('Kein Wochentag wird als Tageslauf gemeldet', () => {
    const src = readFileSync(new URL('../src/platform_steam.js', import.meta.url), 'utf-8');
    const block = src.slice(src.indexOf('const STAT_NAMES'), src.indexOf('};', src.indexOf('const STAT_NAMES')));
    // daysStarted counts career days including week days, so it must no
    // longer feed the day statistic.
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

    // A boss fight can cost four hours: 11:50 -> 15:50
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
    // The memory must never empty the pool completely
    assert.ok(state.archive.seenMeetings.length < DB.meetings.length);
});

await ok('Die Serie ist nach Modus getrennt', () => {
    resetState();
    engine.startWeek('normal');
    engine.recordDayResult('survived');
    engine.recordDayResult('survived');
    assert.equal(state.archive.stats.streak ?? 0, 0, 'Wochentage zählen nicht in die Tages-Serie');

    engine.recordWeekResult('survived', 5);
    engine.recordWeekResult('survived', 5);
    assert.equal(state.archive.stats.weekStreak, 2);
    assert.equal(state.archive.stats.weekStreakBest, 2);

    engine.recordWeekResult('rage', 3);                         // Abbruch reisst die Serie
    assert.equal(state.archive.stats.weekStreak, 0);
    assert.equal(state.archive.stats.weekStreakBest, 2, 'der Rekord bleibt');

    engine.endWeek();                                           // Tagesmodus zählt weiter eigenständig
    engine.recordDayResult('survived');
    assert.equal(state.archive.stats.streak, 1);
    assert.equal(state.archive.stats.weekStreak, 0);
});
await ok('Der Rucksack-Deckel greift, Werkzeuge sind bewusst ausgenommen', async () => {
    resetState();
    engine.startWeek('easy');
    await ensure('items');
    const ids = Object.keys(DB.items);
    const verbrauch = ids.filter(i => !DB.items[i].quest && !DB.items[i].keep);   // 9 Stück
    const werkzeug  = ids.filter(i => DB.items[i].keep && !DB.items[i].quest);

    // Consumables first, then tools until the cap is exceeded
    for (const id of verbrauch) engine.grantItem(id);
    for (const id of werkzeug.slice(0, 4)) engine.grantItem(id);
    const zaehlbar = state.inventory.filter(i => !DB.items[i.id]?.quest).length;
    assert.ok(zaehlbar > 10, `Werkzeuge müssen den Deckel überschreiten dürfen (${zaehlbar})`);

    // One more consumable is turned away now
    const vorher = state.inventory.length;
    state.inventory = state.inventory.filter(i => i.id !== verbrauch[0]);
    engine.grantItem(verbrauch[0]);
    assert.ok(!state.inventory.some(i => i.id === verbrauch[0]),
        'bei vollem Rucksack darf kein Verbrauchsgut mehr dazukommen');

    // The night carries the state over unchanged
    const stand = state.inventory.length;
    engine.advanceWeekNight();
    assert.equal(state.inventory.length, stand);
});

await ok('Das Tutorial läuft nicht in den Wochenmodus hinein', () => {
    resetState();
    store.delete('sysadmin_tutorial_done');          // Erstspieler
    let tutorialGestartet = false;
    globalThis.tutorial = { isActive: false, start() { tutorialGestartet = true; } };

    engine.setWeekDifficulty('normal');
    assert.equal(tutorialGestartet, false, 'die Woche darf das Tutorial nicht starten');
    assert.equal(state.week.active, true);
    assert.equal(state.tickets, 1, 'der Startzustand des Zustands bleibt unangetastet');

    delete globalThis.tutorial;
});

await ok('Der Import räumt auch den Wochen-Speicherplatz ab', () => {
    // Source-level check: performImport lives in engine_ui and needs the DOM,
    // but the order can be pinned down here. Without clearWeek() a foreign
    // archive would meet a running week.
    const src = readFileSync(new URL('../src/engine/engine_ui.js', import.meta.url), 'utf-8');
    const i = src.indexOf('performImport');
    const block = src.slice(i, i + 4000);
    assert.ok(block.includes('engine.clearDay()'), 'clearDay fehlt');
    assert.ok(block.includes('engine.clearWeek()'), 'clearWeek fehlt - die Woche überlebt den Import');
});

// ------------------------------------------------- Nebenschauplätze
console.log('Chronik, Intranet, Brett:');
await ok('Die Karriere-Sicht sieht auch reine Wochen-Spieler', () => {
    resetState();
    state.archive.stats = {
        weeksStarted: 3, weeksSurvived: 2, weeksRageQuit: 1, weeksFired: 0,
        survived_week_normal: 11, weekStreak: 2, weekStreakBest: 2,
        weekVentSaves: 2, weekWarningsChef: 1, daysStarted: 15,
    };
    const k = engine.careerStats();
    assert.equal(k.survived, 11, 'überlebte Wochentage fehlen');
    assert.equal(k.rage, 1);
    assert.equal(k.streakBest, 10, 'zwei Wochen sind zehn Tage');
    assert.equal(k.ventSaves, 2, 'Wochen-Ventile fehlen in der Personalakte');
    assert.equal(k.warningsChef, 1, 'Wochen-Abmahnungen fehlen in der Personalakte');

    // And in day mode it stays unchanged
    resetState();
    state.archive.stats = { daysSurvived: 7, daysRageQuit: 2, streakBest: 4 };
    const t = engine.careerStats();
    assert.equal(t.survived, 7);
    assert.equal(t.rage, 2);
    assert.equal(t.streakBest, 4);
});
await ok('Die Firmenchronik bleibt für Wochen-Spieler erzählbar', () => {
    resetState();
    state.archive.stats = { survived_week_normal: 11, weeksRageQuit: 1, daysStarted: 15 };
    // Since 6.0 the composer returns an id and the numbers, not a sentence -
    // the words live in data_lore.js. What matters here is unchanged: a week
    // player must not fall through to an empty chronicle.
    const picked = engine.composeChronicleLine();
    assert.ok(picked && picked.id, 'die Chronik fällt für Wochen-Spieler auf keine Zeile zurück');
    assert.ok(DB.lore.lines[picked.id], `unbekannte Chronik-Kennung: ${picked.id}`);
});

await ok('Eine Chronik-Zeile bekommt ihre Zahlen eingesetzt', () => {
    resetState();
    state.archive.chronicle = [
        { day: 3, id: 'rage_many_a', vars: { rage: 4 } },
        { day: 2, text: 'Ein Eintrag aus 5.0, ohne Kennung' }
    ];
    const entries = engine.chronicleEntries();
    assert.equal(entries.length, 1, 'der Eintrag ohne Kennung wird nicht verworfen');
    assert.ok(entries[0].text.includes('4'), 'die Zahl wurde nicht eingesetzt');
    assert.ok(!entries[0].text.includes('{rage}'), 'der Platzhalter steht noch da');
});
await ok('Das schwarze Brett deckelt reaktive Zettel, damit es über die Woche wechselt', () => {
    const src = readFileSync(new URL('../src/engine/engine_ui.js', import.meta.url), 'utf-8');
    const i = src.indexOf('openBoard');
    const block = src.slice(i, i + 1400);
    assert.ok(/reqStory && flags\[n\.reqStory\]\)[\s\S]{0,120}sort\(/.test(block),
        'reaktive Zettel werden nicht gemischt');
    assert.ok(block.includes('.slice(0, 4)'), 'kein Deckel auf den reaktiven Zetteln');
});

await ok('Wegwerfen macht Platz und trifft nur den einen Gegenstand', async () => {
    resetState();
    engine.startWeek('easy');
    await ensure('items');
    const ids = Object.keys(DB.items);
    const verbrauch = ids.filter(i => !DB.items[i].quest && !DB.items[i].keep);
    const werkzeug  = ids.find(i => DB.items[i].keep && !DB.items[i].quest);
    const trophaee  = ids.find(i => DB.items[i].quest);

    for (const id of verbrauch) engine.grantItem(id);
    engine.grantItem(werkzeug);
    if (trophaee) engine.grantItem(trophaee);
    const vorher = state.inventory.length;

    engine.state.pendingItem = werkzeug;
    engine.confirmDiscardItem();
    assert.equal(state.inventory.length, vorher - 1);
    assert.ok(!state.inventory.some(i => i.id === werkzeug), 'das Werkzeug liegt noch im Rucksack');
    assert.ok(state.inventory.some(i => i.id === verbrauch[0]), 'ein fremder Gegenstand wurde entfernt');

    // Trophies are never offered for discarding in the first place
    if (trophaee) {
        engine.askDiscardItem(trophaee);
        assert.notEqual(state.pendingItemMode, 'discard', 'Trophäen dürfen nicht wegwerfbar sein');
    }
});
await ok('Nach dem Wegwerfen passt wieder ein Verbrauchsgut hinein', async () => {
    resetState();
    engine.startWeek('easy');
    await ensure('items');
    const ids = Object.keys(DB.items);
    const verbrauch = ids.filter(i => !DB.items[i].quest && !DB.items[i].keep);
    const werkzeuge = ids.filter(i => DB.items[i].keep && !DB.items[i].quest);

    // Fill the backpack past the cap using tools
    for (const id of werkzeuge.slice(0, 10)) engine.grantItem(id);
    engine.grantItem(verbrauch[0]);
    assert.ok(!state.inventory.some(i => i.id === verbrauch[0]), 'Voraussetzung: der Rucksack ist voll');

    engine.state.pendingItem = werkzeuge[0];
    engine.confirmDiscardItem();
    engine.grantItem(verbrauch[0]);
    assert.ok(state.inventory.some(i => i.id === verbrauch[0]),
        'nach dem Wegwerfen muss wieder Platz sein');
});

// ------------------------------------------------ Cloud-Synchronisierung
console.log('Cloud:');
await ok('Die Nutzlast trägt Tag, Woche und einen Zeitstempel', () => {
    resetState();
    store.set('layer8_day', '{"savedAt":1}');
    store.set('layer8_week', '{"savedAt":2}');
    const p = engine.buildCloudPayload();
    assert.ok(p.archive, 'Archiv fehlt');
    assert.equal(p.day, '{"savedAt":1}');
    assert.equal(p.week, '{"savedAt":2}');
    assert.ok(p.runSyncedAt > 0, 'runSyncedAt fehlt');
});
await ok('Der neuere Lauf gewinnt, der ältere überschreibt nichts', () => {
    resetState();
    engine.adoptCloudRun('layer8_week', '{"week":{"dayIndex":3},"savedAt":1000}', 2000);
    assert.equal(JSON.parse(store.get('layer8_week')).week.dayIndex, 3, 'nicht übernommen');

    engine.adoptCloudRun('layer8_week', '{"week":{"dayIndex":4},"savedAt":5000}', 6000);
    assert.equal(JSON.parse(store.get('layer8_week')).week.dayIndex, 4, 'neuerer Stand ignoriert');

    engine.adoptCloudRun('layer8_week', '{"week":{"dayIndex":1},"savedAt":10}', 20);
    assert.equal(JSON.parse(store.get('layer8_week')).week.dayIndex, 4, 'älterer Stand hat gewonnen');
});
await ok('Woanders beendet räumt ab, eine alte Nutzlast aber nicht', () => {
    resetState();
    store.set('layer8_week', '{"savedAt":1000}');
    engine.adoptCloudRun('layer8_week', null, 5000);            // danach beendet
    assert.equal(store.get('layer8_week'), undefined, 'Rest blieb liegen');

    store.set('layer8_week', '{"savedAt":9000}');
    engine.adoptCloudRun('layer8_week', null, 3000);            // ältere Nutzlast
    assert.ok(store.get('layer8_week'), 'laufende Woche wurde gelöscht');
});
await ok('Kaputte Nutzlast wird verworfen, nicht geworfen', () => {
    resetState();
    store.set('layer8_week', 'kein json');
    engine.adoptCloudRun('layer8_week', '{ kaputt', 5000);
    engine.adoptCloudRun('layer8_day', undefined, undefined);
});
await ok('Die Nacht schreibt sofort, nicht erst nach der Drosselung', () => {
    resetState();
    let schreibt = 0;
    const orig = engine.buildCloudPayload.bind(engine);
    engine.buildCloudPayload = () => { schreibt++; return orig(); };

    engine._lastRunSync = Date.now();                           // Drosselung aktiv
    engine.syncRun();
    assert.equal(schreibt, 0, 'gedrosselt muss stumm bleiben');

    engine.startWeek('easy');
    state.morningMoodShown = true;
    state.modal = { open: true, isNight: true, nextDay: 'Dienstag' };
    engine.continueWeekNight();
    assert.ok(schreibt >= 1, 'die Nacht muss die Drosselung übergehen');

    engine.buildCloudPayload = orig;
});

// ----------------------------------------------------------- The gala
console.log('Gala:');
await ok('Die Uhr trägt den Abend von 17:00 bis 23:00', async () => {
    resetState();
    await ensure('party');
    state.pendingEnd = { isParty: true, partyKey: 'k', diffStr: 'normal' };
    engine.startParty();
    await new Promise(r => setTimeout(r, 20));
    assert.equal(state.time, 17 * 60, 'die Gala beginnt um 17:00');

    const stand = [];
    for (let i = 0; i < 12; i++) {
        state.partyProgress = i;
        engine.reset();
        stand.push(state.time);
    }
    assert.equal(stand[0], 17 * 60);
    assert.equal(stand[6], 20 * 60, 'nach sechs Stationen ist es 20:00');
    assert.ok(stand.every((t, i) => i === 0 || t > stand[i - 1]), 'die Uhr muss vorwärts laufen');

    state.partyProgress = 12;
    engine.reset();
    assert.equal(state.time, 23 * 60, 'das Finale liegt auf 23:00');
});
await ok('Der Vorraum wechselt über den Abend', async () => {
    resetState();
    await ensure('party');
    state.isPartyMode = true;
    const gesehen = new Set();
    for (const p of [0, 5, 11]) {
        state.partyProgress = p;
        engine.reset();
        gesehen.add(calls.terminal[0].text);
    }
    assert.equal(gesehen.size, 3, 'drei Abschnitte müssen drei Fassungen zeigen');
});
await ok('Aus der Woche heraus beginnt die Gala mit einer eigenen Zeile', async () => {
    resetState();
    await ensure('party');
    engine.startWeek('normal');
    state.pendingEnd = { isParty: true, partyKey: 'k', diffStr: 'normal' };
    engine.startParty();
    await new Promise(r => setTimeout(r, 20));
    assert.ok(/Fünf Tage/.test(calls.terminal[0].text), 'die Woche wird nicht erwähnt');

    resetState();                                               // Tagesmodus: unverändert
    state.pendingEnd = { isParty: true, partyKey: 'k', diffStr: 'normal' };
    engine.startParty();
    await new Promise(r => setTimeout(r, 20));
    assert.ok(!/Fünf Tage/.test(calls.terminal[0].text), 'im Tagesmodus fehl am Platz');
});

// -------------------------------------------------- Der Tageswechsel
console.log('Nacht und Übergang:');
await ok('Der Vorspann greift auf, wie der Tag gelaufen ist', async () => {
    resetState();
    await ensure('special');
    engine.startWeek('hard');
    const lead = (t, al, cr, fl) => {
        state.week.dayIndex = 2;
        state.tickets = t; state.al = al; state.cr = cr; state.fl = fl;
        state.time = 16 * 60 + 30; state.ticketWarning = true; state.pendingEnd = null;
        engine.queueNightEnd();
        return state.pendingEnd.lead;
    };
    assert.match(lead(9, 20, 20, 20), /Tickets nimmst du mit/);
    assert.match(lead(0, 20, 20, 20), /Keine offenen Tickets/);
    assert.match(lead(2, 100, 20, 20), /Puls/);
    assert.match(lead(2, 20, 100, 20), /Chef/);
    assert.match(lead(2, 20, 20, 80), /wenig bewegt/);
    assert.match(lead(2, 25, 25, 30), /^16:30 Uhr/);
});
await ok('Die Ticket-Schwelle ist erreichbar', () => {
    // Ten tickets end the day, and a quarter of nine is three.
    const hoechstwert = Math.ceil(9 * 0.25);
    const src = readFileSync(new URL('../src/engine/engine_week.js', import.meta.url), 'utf-8');
    const m = src.match(/report\.ticketsAfter >= (\d+)/);
    assert.ok(m, 'Schwelle nicht gefunden');
    assert.ok(Number(m[1]) <= hoechstwert,
        `Schwelle ${m[1]} ist über dem Höchstwert ${hoechstwert} - tote Verzweigung`);
});
await ok('Zwei Nächte hintereinander zeigen nie denselben Schlaftext', async () => {
    resetState();
    await ensure('special');
    engine.startWeek('normal');
    const gesehen = [];
    for (let d = 1; d <= 4; d++) {
        state.week.dayIndex = d;
        state.tickets = 2; state.al = 25; state.cr = 25; state.fl = 30;
        state.time = 16 * 60 + 30; state.ticketWarning = true; state.pendingEnd = null;
        engine.queueNightEnd();
        gesehen.push(state.pendingEnd.night.sleepText);
    }
    for (let i = 1; i < gesehen.length; i++) {
        assert.notEqual(gesehen[i], gesehen[i - 1], `Nacht ${i + 1} wiederholt den Vortext`);
    }
});
await ok('Jeder Morgen bekommt seine eigene Zeile', () => {
    resetState();
    engine.startWeek('easy');
    const zeilen = new Set();
    for (let d = 2; d <= 5; d++) {
        state.week.dayIndex = d - 1;
        state.morningMoodShown = true;
        calls.logs = [];
        state.modal = { open: true, isNight: true };
        engine.continueWeekNight();
        zeilen.add(calls.logs.find(l => /Dienstag|Mittwoch|Donnerstag|Freitag/.test(l)));
    }
    assert.equal(zeilen.size, 4, 'die vier Morgen müssen sich unterscheiden');
});

console.log(`\n${passed} Tests bestanden.`);
