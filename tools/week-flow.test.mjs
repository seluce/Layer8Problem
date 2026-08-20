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
    // useLanguage() sets <html lang> on its way past - the automatic
    // hyphenation of long words follows that attribute.
    documentElement: { lang: '' },
};

const { DB, ensure, loadCore, currentLanguage } = await import('../src/data.js');

// 6.0: the core tier is loaded, not statically imported. German is the source,
// and it stays the default here - but the suite runs in EITHER language now:
//
//     node ... tools/week-flow.test.mjs --lang=en
//
// That is the point of holding expectations against the dictionary instead of
// against German words. Both trees carry the same ids, story flags and numbers
// (CLAUDE.md), so everything these tests actually check is the same in both;
// only the words differ, and no comparison runs over words any more. A suite
// that only ever sees one language cannot say a word about the other - and this
// one stayed green while the English weekly balance was demonstrably wrong.
const LANG = (process.argv.find(a => a.startsWith('--lang=')) ?? '').split('=')[1] || 'de';
await loadCore(LANG);
await ensure('lore');
const { buildDiary, renderDiary } = await import('../src/engine/engine_diary.js');
const { core } = await import('../src/engine/engine_core.js');
const { events } = await import('../src/engine/engine_events.js');
const { week } = await import('../src/engine/engine_week.js');
// The hooks travel with the engine in src/engine.js, so the bench composes the
// same way: without them emit() is missing and the inventory throws.
const { hooks } = await import('../src/engine/engine_hooks.js');
const { inventory } = await import('../src/engine/engine_inventory.js');
const { renderRecipe } = await import('../src/engine/recipe.js');
const { useLanguage, language, t, tf } = await import('../src/i18n/i18n.svelte.js');
// dayName() and the balance keys: the bench names what it expects through the
// SAME dictionary the engine reads, never through the German words themselves.
// A test that spells out display text passes in one language and says nothing
// about the other - and it stayed green while the English weekly balance was
// demonstrably wrong (GLOSSAR 7b, case twenty-nine).
const { dayName, dayNameValue } = await import('../src/engine/engine_week.js');
// engine_ui is NOT spread into the harness engine (its functions need the DOM);
// the boot lines are pure computation, so they are called on it directly.
const { ui } = await import('../src/engine/engine_ui.js');
const { state, freshDay } = await import('../src/engine/engine_state.svelte.js');

// The rune decides what t() answers; loadCore() above has already put the
// matching tree in place, so this only moves the pointer.
await useLanguage(LANG);

// --- engine composition with UI stubs (later spread wins) --------------------
const calls = { overlays: [], end: null, boots: 0, resumeInfo: '' };
const engine = {
    state,
    ...core, ...events, ...week, ...inventory, ...hooks,
    showOverlay(t) { calls.overlays.push(typeof t === 'string' ? t : (t?.id ?? 'el')); },
    hideOverlay() {},
    renderHeader() {}, updateUI() {}, disableButtons() {},
    setTerminalIdle() {}, setTerminalMorning() {},
    showModal() {},
    showEnd(end) { calls.end = end; state.modal = { open: true, ...end, isEnd: true }; },
    closeModal() { state.modal = { open: false }; },
    dismissModal() { state.modal = { open: false }; },
    showFloatingText() {}, triggerShake() {}, animateItemToBackpack() {},
    playMusic() {}, stopMusic() {}, playAudio() {}, updatePresence() {},
    playBootSequence(cb) { calls.boots++; cb(); },
    closeSettings() {}, updatePhoneVisibility() {}, checkForNews() {},
    renderTerminal(ev, type) { calls.terminal = [ev, type]; },
    setTerminalEvent(type, title, text, opts, isChain, charName, nodes) { calls.termEvent = { type, title, charName }; },
    setTerminalResult(text, m, l, a, b, action, buttonKey) { calls.termResult = { action, buttonKey }; },
    // Since 6.0 log() is handed a RECIPE, not a sentence. The stub keeps it as
    // it arrives: a test that asserts on the rendered German would be asserting
    // on the display, and the whole point of the recipe is that the display is
    // no longer where the identity lives.
    log(spec) { (calls.logs ??= []).push(spec); },
    unlockAchievement(id) { calls.achs.push(id); calls.achStufen.push(engine.difficultyTier()); },
    generateDiaryEntry: () => 'Tagebuch-Stub',
};

const resetState = () => {
    Object.assign(state, freshDay(1.0));
    state.difficultyMult = 1.0;   // freshDay does not carry it - otherwise a value leaks from the last test
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
console.log('Entering the mode:');
await ok('startWeekSelect with no saves shows the week modal', () => {
    resetState();
    engine.startWeekSelect();
    assert.ok(calls.overlays.includes('week-modal'));
});
await ok('setWeekDifficulty starts Monday and counts weeksStarted', () => {
    resetState();
    engine.setWeekDifficulty('normal');
    assert.equal(state.week.active, true);
    assert.equal(state.week.level, 'normal');
    assert.equal(state.tickets, 1);
    assert.equal(state.archive.stats.weeksStarted, 1);
});

// -------------------------------------------------------------------- night
console.log('Clocking off Mon-Thu -> night:');
await ok('16:30 on day 2 queues the night, not clocking off, and suppresses the gala', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 2;
    state.time = 16 * 60 + 30;
    state.tickets = 8; state.al = 60; state.cr = 20;
    state.ticketWarning = true;     // in a real game you were fired long ago, on passing 7
    // Even a valid gala invitation must not fire mid-week:
    const realParty = engine.partyInvitation;
    engine.partyInvitation = () => ({ isParty: true });
    engine.checkEndConditions();
    engine.partyInvitation = realParty;

    assert.equal(state.pendingEnd.isNight, true);
    // Identities, not words: both stand on a screen that is held open, so both
    // are recipes and the display resolves them (6.1).
    assert.deepEqual(state.pendingEnd.title, { k: 'week.night.title', v: { day: dayNameValue(1, true) } });
    assert.deepEqual(state.pendingEnd.nextDay, dayNameValue(2));
    assert.equal(renderRecipe(state.pendingEnd.title), tf('week.night.title', { day: dayName(1).toUpperCase() }));
    assert.equal(state.pendingEnd.night.ticketsAfter, 2);       // ceil(8*0.25)
    assert.equal(state.archive.stats.daysSurvived ?? 0, 0);     // the day counters stay clean
    assert.equal(state.archive.stats.survived_week_normal, 1);  // counted in the week namespace
});
await ok('finishGame shows the night screen (no end screen, no reload path)', () => {
    engine.finishGame();
    assert.equal(state.modal.open, true);
    assert.equal(state.modal.isNight, true);
    assert.equal(state.modal.isEnd, false);
    assert.equal(calls.end, null);                              // showEnd NOT called
    assert.equal(state.pendingEnd, null);
});
await ok('continueWeekNight: night carried out, checkpoint saved, morning booted', () => {
    engine.continueWeekNight();
    assert.equal(state.week.dayIndex, 3);                       // Wednesday
    assert.ok(state.tickets >= 2);                              // carry-over 2 + possibly the morning mood
    assert.equal(calls.boots, 1);
    assert.equal(state.morningMoodShown, true);                 // reset() ran on into the morning
    assert.ok(engine.loadWeek());                               // the slot exists
    assert.equal(engine.loadWeek().week.dayIndex, 3);
});

// ------------------------------------------------------------------ week end
console.log('End of the week (won and lost):');
await ok('Friday 16:30 -> week survived, with balance sheet, statistics and a cleared slot', () => {
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
    state.meetingDone = true;              // Friday ends only after the meeting
    engine.checkEndConditions();
    assert.deepEqual(state.pendingEnd.title, { k: 'end.weekTitle' });
    engine.finishGame();

    assert.ok(calls.end);
    // The balance sheet travels as a snapshot, not as HTML (6.1): the level as
    // an id, the days as indices, the values as numbers. What becomes of it on
    // screen is decided by components/WeekBalance.svelte - and therefore by
    // whatever language is running.
    const bilanz = calls.end.balance;
    assert.equal(calls.end.text ?? '', '', 'the balance sheet must no longer travel as text');
    assert.equal(bilanz.mode, 'easy');
    assert.equal(bilanz.rows.length, 5, 'four logged days and the Friday');
    // closing values instead of peaks, rounded
    assert.deepEqual(bilanz.rows[0], { day: 0, win: true, tickets: 4, l: 20, a: 31, b: 24 }, 'Montagszeile');
    assert.deepEqual(bilanz.rows[4], { day: 4, win: true, tickets: 6, l: 52, a: 44, b: 39 }, 'Freitagszeile');
    assert.equal(bilanz.coffee, 12);                            // 3+2+4+1+2
    assert.equal(bilanz.mails, 3);
    assert.equal(state.archive.stats.weeksSurvived, 1);
    assert.equal(state.archive.stats.weeksSurvived_easy, 1);    // a completed week, its own key
    assert.equal(state.archive.stats.survived_week_easy, 1);    // the Friday as a week DAY
    assert.equal(state.archive.stats.weekBestDay, 5);
    assert.equal(state.week.active, false);
    assert.equal(engine.loadWeek(), null);                      // slot cleared
});
await ok('Rage quit on Wednesday: the day is named, weeksRageQuit, the valve counts once', () => {
    resetState();
    engine.startWeek('hard');
    state.week.dayIndex = 3;
    state.al = 100;
    state.rageWarningReceived = true;                           // the week valve is spent
    engine.checkEndConditions();
    // cause, not the title: the title is a dictionary entry and reads
    // differently in the other language.
    assert.equal(state.pendingEnd.cause, 'rage');
    // A sentence inside a sentence: the week note wraps the lead, both as a
    // recipe, the day as an id.
    assert.deepEqual(state.pendingEnd.lead,
                     { k: 'week.endsOn', v: { base: { k: 'end.rageQuit' }, day: dayNameValue(2) } });
    assert.ok(renderRecipe(state.pendingEnd.lead).includes(dayName(2)));
    engine.finishGame();

    // The failed day names its cause instead of its figures - and the cause is
    // the screen's own title, so a recipe as well.
    assert.deepEqual(calls.end.balance.rows.at(-1),
                     { day: 2, win: false, title: { k: 'end.rageTitle' } });
    assert.equal(state.archive.stats.weeksRageQuit, 1);
    assert.equal(state.archive.stats.weekBestDay, 2);           // two days got through
    assert.equal(state.archive.stats.weekVentSaves, 1);         // once per week, in the week's own key
    assert.equal(state.archive.stats.ventSaves ?? 0, 0);        // the day key stays day mode only
    assert.equal(state.week.active, false);
});
await ok('The end screen records identities, not sentences', () => {
    // The rule from src/engine/recipe.js, applied to the last screen that still
    // broke it: the state holds the identity, the display renders. An end screen
    // stands for as long as the player reads it, which makes it the most
    // sensitive place in the game for a finished sentence.
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 4;
    state.week.weekLog = [
        { dayIndex: 1, endTickets: 2, endL: 10, endA: 20, endB: 10, coffee: 1, mailsIgnored: 0 },
        { dayIndex: 2, endTickets: 3, endL: 20, endA: 30, endB: 20, coffee: 1, mailsIgnored: 1 },
        { dayIndex: 3, endTickets: 4, endL: 30, endA: 40, endB: 30, coffee: 1, mailsIgnored: 0 },
    ];
    state.tickets = 10;
    engine.checkEndConditions();
    engine.finishGame();

    const end = calls.end;
    // No field holds prose: title and lead are recipes, the balance sheet is
    // numbers, and `text` is empty - only the warning boxes still need it.
    assert.equal(typeof end.title, 'object', 'the title is a sentence again');
    assert.equal(typeof end.lead, 'object', 'the lead is a sentence again');
    assert.deepEqual(end.title, { k: 'end.firedTitle' });
    assert.equal(end.lead.k, 'week.endsOn');
    assert.equal(end.lead.v.base.k, 'end.ticketsLead');
    assert.deepEqual(end.lead.v.day, dayNameValue(3));
    assert.equal(end.text ?? '', '', 'the end screen carries finished HTML again');
    for (const row of end.balance.rows) {
        for (const feld of ['tickets', 'l', 'a', 'b']) {
            if (row[feld] !== undefined) assert.equal(typeof row[feld], 'number', `${feld} is not a number`);
        }
    }
    // And both recipes resolve in the running language instead of standing
    // there as keys.
    assert.equal(renderRecipe(end.title), t('end.firedTitle'));
    assert.ok(renderRecipe(end.lead).includes(dayName(3)));
});
await ok('The party report names every achievement exactly once', () => {
    // achievedIds gets an entry per unlock, so an achievement upgraded on the
    // same evening stands in it twice. The old string version then showed the
    // trophy twice; a keyed list cannot be drawn from that at all - in the played
    // game it threw each_key_duplicate and took the whole end screen with it.
    resetState();
    state.achievedIds = ['ach_party', 'ach_ninja', 'ach_party'];
    state.isPartyMode = true; state.partyProgress = 12;
    engine.finishParty('SYNERGY!', 'Testabend.');
    const ids = calls.end.party.achievements;
    assert.equal(new Set(ids).size, ids.length, 'an achievement is listed twice in the report');
    assert.ok(ids.includes('ach_party') && ids.includes('ach_ninja'), JSON.stringify(ids));
});
await ok('The diary records the draw, not the page', async () => {
    // The last place that still held prose. What is written down now is WHICH
    // lines were drawn - paths into the tree - and which marks go into them;
    // renderDiary() puts the sentences together from that. So the page follows a
    // language switch too, and the modal's language stamp could be dropped.
    resetState();
    await ensure('diary');
    engine.startWeek('normal');
    state.week.dayIndex = 3;
    const entry = buildDiary(state, 'WIN');

    assert.ok(entry.paragraphs.length >= 3, 'too few paragraphs for the probe');
    for (const p of entry.paragraphs) {
        assert.equal(p.text, undefined, 'a paragraph holds a finished sentence again');
        assert.ok(Array.isArray(p.parts) && p.parts.length, 'a paragraph has no parts');
        for (const teil of p.parts) {
            const verweis = teil.ref ?? teil.intro?.ref;
            assert.ok(verweis, 'a part is not a reference: ' + JSON.stringify(teil));
            assert.equal(verweis.p, 'diary');
            assert.equal(verweis.path[0] in DB.diary, true, `there is no slot ${verweis.path[0]}`);
            assert.ok(DB.diary[verweis.path[0]][verweis.path[1]], 'the path leads nowhere');
        }
    }
    // The marks are figures and names - except the weekday, which is a recipe.
    assert.deepEqual(entry.tokens.weekday, dayNameValue(2));

    // And rendered, it comes out as a page with no open marks.
    const seite = renderDiary(entry);
    assert.equal(seite.dayIndex, 2);
    assert.equal(seite.paragraphs.length, entry.paragraphs.length);
    for (const p of seite.paragraphs) {
        assert.ok(p.text.length, 'a paragraph comes out empty');
        assert.ok(!/\{\w+\}/.test(p.text), p.text);
    }
});
await ok('A page from 5.x stays put, a reference into nothing is dropped', () => {
    // Two edges, both from the same rule: what has no identity is shown as it
    // stands; what has one that will not resolve is dropped rather than guessed
    // at. The same answer recipe.js gives.
    const alt = renderDiary({ dayIndex: 1, paragraphs: [{ text: 'From an old save.', tone: 'body' }] });
    assert.equal(alt.paragraphs[0].text, 'From an old save.');

    const weg = renderDiary({ dayIndex: 0, tokens: {}, paragraphs: [
        { tone: 'body', parts: [{ ref: { p: 'diary', path: ['gibtesnicht', 0, 'lines', 0] } }] },
    ] });
    assert.equal(weg.paragraphs.length, 0, 'a reference into nothing was guessed at');

    // And a paragraph with a hole in it is not the paragraph.
    const loch = renderDiary({ dayIndex: 0, tokens: {}, paragraphs: [
        { tone: 'body', parts: [{ ref: { p: 'diary', path: ['mood', 0, 'lines', 0] } }] },
    ] });
    for (const p of loch.paragraphs) assert.ok(!/\{\w+\}/.test(p.text), p.text);
});
await ok('The display renders what the screen wrote down', () => {
    // Svelte components do not run here, so the source is read - as it is for
    // the tutorial's speech bubble and closing screen. What is checked is
    // precisely what the state no longer does.
    const modalSrc = readFileSync(new URL('../src/components/EndModal.svelte', import.meta.url), 'utf-8');
    assert.ok(/renderRecipe/.test(modalSrc), 'EndModal does not resolve recipes');
    assert.ok(/showDiary && hasDiary/.test(modalSrc), 'the unfolded block hangs on the toggle alone');

    const buchSrc = readFileSync(new URL('../src/components/DiaryEntry.svelte', import.meta.url), 'utf-8');
    assert.ok(/renderDiary\(diary\)/.test(buchSrc), 'the diary page is taken over rather than rendered');

    // And the rule this very renderer would break quietly: it runs inside a
    // $derived, so it reads through tree(). Read straight off DB the page would
    // stay in one language while the frame around it changed - in Node that does
    // not show, because there the two are the same object.
    const tagebuchSrc = readFileSync(new URL('../src/engine/engine_diary.js', import.meta.url), 'utf-8');
    const renderer = tagebuchSrc.slice(tagebuchSrc.indexOf('export function renderDiary'));
    assert.ok(/tree\(\)/.test(renderer), 'renderDiary does not read through tree()');
    assert.ok(!/\bDB\./.test(renderer), 'renderDiary reaches straight for DB again');

    const bilanzSrc = readFileSync(new URL('../src/components/WeekBalance.svelte', import.meta.url), 'utf-8');
    // Up to 6.1 the legend and the two singular/plural forms were rendered in the
    // builder and checked here against the finished text. The component decides
    // them now - so what stands here is that it knows the keys at all.
    for (const key of ['week.summary.legend', 'week.summary.title',
                       'week.summary.valuesOne', 'week.summary.values',
                       'week.summary.totalsOne', 'week.summary.totals']) {
        assert.ok(bilanzSrc.includes(key), `WeekBalance does not know ${key}`);
    }
    assert.ok(/dayName\(/.test(bilanzSrc), 'the balance sheet does not name the day through dayName()');

    const partySrc = readFileSync(new URL('../src/components/PartyReport.svelte', import.meta.url), 'utf-8');
    assert.ok(/tree\(\)/.test(partySrc), 'the party report does not read the achievements through tree()');
});
await ok('recordDayResult does NOT count the valve flags daily in week mode', () => {
    resetState();
    engine.startWeek('easy');
    state.rageWarningReceived = true;
    engine.recordDayResult('survived');
    engine.recordDayResult('survived');
    assert.equal(state.archive.stats.ventSaves ?? 0, 0);        // only recordWeekResult counts
    assert.equal(state.archive.stats.weekVentSaves ?? 0, 0);    // and only into the week key
});

// -------------------------------------------------------------- morning death
console.log('Morning end check:');
await ok("9 tickets carried + the morning mood's tickets (in need of leave, +3) = out at once", () => {
    resetState();
    engine.startWeek('hard');
    state.week.dayIndex = 4;
    state.tickets = 9;
    engine.triggerMorningMood('tickets');                       // the engine's own test path

    assert.equal(state.tickets, 12);
    assert.ok(calls.end, 'the week end screen must have appeared');
    assert.equal(calls.end.cause, 'tickets');
    assert.deepEqual(calls.end.lead,
                     { k: 'week.endsOn', v: { base: { k: 'end.ticketsLead' }, day: dayNameValue(3) } });
    assert.equal(state.archive.stats.weeksFired, 1);
    assert.equal(state.week.active, false);
});

// ----------------------------------------------------------- resume & restart
console.log('Resume & restart:');
await ok('offerResume(week) finds the week slot and routes resumeDay to resumeWeek', () => {
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

    engine.resumeDay();                                         // the dialog button
    assert.equal(state.week.active, true);
    assert.equal(state.week.dayIndex, 2);
    assert.equal(state.tickets, 4);
    assert.equal(state.time, 11 * 60);
});
await ok('A 5.0 save brings its day curve along (migration)', () => {
    resetState();
    // Exactly the shape 5.0 wrote: t for the clock, f/a/c for the three bars.
    // Every reader accesses them with `?? 0` - without a migration the curve
    // would quietly drop to zero instead of throwing.
    const alt = {
        time: 11 * 60, difficultyMult: 1.0,
        statHistory: [{ t: 480, f: 0, a: 0, c: 0 }, { t: 620, f: 25, a: 40, c: 35 }]
    };
    engine.applyRestoredDay(alt);

    assert.deepEqual(state.statHistory, [
        { m: 480, l: 0,  a: 0,  b: 0 },
        { m: 620, l: 25, a: 40, b: 35 }
    ], 'the old curve point was not converted');

    // Applied twice it must break nothing - a new point carries no t and falls
    // through the condition.
    const nochmal = engine.migrateStatPoints(state.statHistory);
    assert.deepEqual(nochmal, state.statHistory, 'the migration is not idempotent');
});
await ok('The boot line of an old save names the running version', () => {
    resetState();
    // A save written under 5.0. init() writes the version line as the session's
    // first log entry, and because setDifficulty does not reset the day it
    // travels into the save with it. Restored unchanged, the log claims a
    // different version from the header beside it.
    const alt = {
        time: 11 * 60, difficultyMult: 1.0,
        logEntries: [
            { id: 1, time: '08:00', msg: 'System v5.0.0 loaded. Waiting for user...', color: '' },
            { id: 2, time: '08:00', msg: 'Modus: MITTWOCH. Business as usual.',     color: '' },
            { id: 3, time: '09:15', msg: 'Kaffee geholt.',                          color: '' }
        ]
    };
    engine.applyRestoredDay(alt);

    // On restoring, the boot line is turned into a recipe - the one place where a
    // 5.x line gets its identity back. So it is checked rendered rather than by
    // looking at a field.
    const start = renderRecipe(state.logEntries[0]);
    assert.ok(start.includes(engine.VERSION),
              `the boot line does not name ${engine.VERSION}: ${start}`);
    assert.ok(!start.includes('v5.0.0'), 'the old version is still there');
    assert.equal(state.logEntries[0].msg, undefined, 'the old sentence is still in the entry');
    // The rest of the log is memory and stays untouched.
    assert.equal(state.logEntries[1].msg, 'Modus: MITTWOCH. Business as usual.');
    assert.equal(state.logEntries[2].msg, 'Kaffee geholt.');
    assert.equal(state.logEntries.length, 3, 'an entry was added or lost');
});
await ok('With no boot line nothing is rewritten', () => {
    resetState();
    // A later day of a week: the counter runs on, id 1 does not occur. And a long
    // day pushes the boot line out of the buffer anyway.
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
await ok('A 5.0 week row comes along (migration)', () => {
    resetState();
    const alt = [
        { dayIndex: 1, endTickets: 4, endFl: 20, endAl: 31, endCr: 24, peakA: 50, peakC: 30, coffee: 3, mailsIgnored: 1 },
        { dayIndex: 2, endTickets: 2, endL: 27, endA: 35, endB: 28, peakA: 40, peakB: 40, coffee: 2, mailsIgnored: 0 }
    ];
    const neu = engine.migrateWeekLog(alt);

    assert.deepEqual(neu[0], { dayIndex: 1, endTickets: 4, coffee: 3, mailsIgnored: 1,
                               endL: 20, endA: 31, endB: 24, peakA: 50, peakB: 30 },
                     'the old week row was not converted');
    assert.deepEqual(neu[1], alt[1], 'neue Wochenzeile angefasst');
    assert.equal(neu[0].endFl, undefined, 'an old key survives');
    assert.equal(neu[0].peakC, undefined, 'an old key survives');
});
await ok('A night checkpoint (morning unplayed) routes the resume through the morning', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 3;
    state.morningMoodShown = false;                             // the signature of a night save
    engine.saveWeek();
    const slot = store.get('layer8_week');
    resetState();
    store.set('layer8_week', slot);

    engine.offerResume('week');
    engine.resumeDay();
    assert.equal(state.morningMoodShown, true);                 // the morning ran (end check included)
});
await ok('discardDay in a week context clears only the week slot', () => {
    resetState();
    engine.startWeek('easy');
    engine.saveWeek();
    resetState();
    store.set('layer8_week', '{"week":{"active":true,"level":"easy","dayIndex":1,"weekLog":[]},"day":{"time":480}}');
    engine.offerResume('week');
    engine.discardDay();
    assert.equal(engine.loadWeek(), null);
});
await ok('softReset during a week restarts the week on Monday', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 4;
    state.tickets = 7; state.al = 80; state.morningMoodShown = true;
    state.week.weekLog = [{ dayIndex: 1 }, { dayIndex: 2 }, { dayIndex: 3 }];
    engine.saveWeek();

    engine.softReset();
    assert.equal(state.week.active, true, 'the week has to be running');
    assert.equal(state.week.dayIndex, 1, 'back to Monday');
    assert.equal(state.week.level, 'normal', 'the condition stays as chosen');
    assert.equal(state.week.weekLog.length, 0, 'the old log was not discarded');
    // No fixed values here: the restart plays Monday morning right away and
    // its mood is random. What matters is that the baggage is gone.
    assert.ok(state.tickets < 7, `tickets not reset: ${state.tickets}`);
    assert.ok(state.al < 80, `aggro not reset: ${state.al}`);
    assert.equal(state.archive.stats.weeksStarted, 2, 'a restart is a new attempt');
    assert.ok(calls.boots >= 1);
});
await ok('Every overlay answers to Escape, or is a named exception', () => {
    // The knowledge modal did not: Escape fell straight through its branch and
    // opened the SETTINGS on top of it. The week's condition picker had the same
    // hole. One forgotten line in a chain of fifteen is invisible by reading -
    // so the chain is held against the markup instead.
    const html = readFileSync(new URL('../index.html', import.meta.url), 'utf-8');
    const esc = readFileSync(new URL('../src/engine.js', import.meta.url), 'utf-8');
    const ui  = readFileSync(new URL('../src/engine/engine_ui.js', import.meta.url), 'utf-8');

    const kette = esc.slice(esc.indexOf("key === 'escape'"), esc.indexOf('HOTKEY BLOCKING'));
    const start = (ui.match(/STARTUP_OVERLAYS:\s*\[([^\]]*)\]/) ?? [, ''])[1];

    // Named exceptions, each for a reason that stands in engine.js:
    //   settings-modal  IS the target of the last branch
    //   modal-overlay   branch D - a warning closes, an ending does not
    //   email-modal     branch A - an open mail is a decision, not a window
    //   tut-ask-modal   branch A - a question, not a window
    const ausnahmen = new Set(['settings-modal', 'modal-overlay', 'email-modal', 'tut-ask-modal']);

    const overlays = [...new Set([...html.matchAll(/id="([a-z-]+-modal)"/g)].map(m => m[1]))];
    assert.ok(overlays.length >= 15, `only ${overlays.length} overlays found - has the markup changed?`);

    const stumm = overlays.filter(id =>
        !ausnahmen.has(id) && !kette.includes(`'${id}'`) && !start.includes(`'${id}'`));
    assert.deepEqual(stumm, [], `Escape does not reach: ${stumm.join(', ')}`);
});
await ok('A restart clears the end screen out of the state, not only off the screen', () => {
    // Since 6.1 components/EndModal.svelte renders off `modal.open`, so hiding
    // the overlay leaves the old screen mounted behind it. softReset() and
    // softResetWeek() used to do exactly that: seen in the played game, the
    // rage-quit screen was still in the state after the restart.
    resetState();
    ui.showEnd.call(engine, { title: { k: 'end.weekTitle' }, isWin: true });
    assert.equal(state.modal.open, true, 'the screen did not open');

    ui.dismissModal.call(engine);
    assert.equal(state.modal.open, false, 'the end screen is still in the state');
    assert.equal(state.modal.isEnd, false, 'isEnd survived');
    assert.equal(state.modal.title, '', 'the title survived');

    // And both restarts go through it rather than hiding the container by hand.
    const wSrc = readFileSync(new URL('../src/engine/engine_week.js', import.meta.url), 'utf-8');
    const cSrc = readFileSync(new URL('../src/engine/engine_core.js', import.meta.url), 'utf-8');
    const woche = wSrc.slice(wSrc.indexOf('softResetWeek: function'), wSrc.indexOf('softResetWeek: function') + 900);
    const tag = cSrc.slice(cSrc.indexOf('softReset: function'), cSrc.indexOf('softReset: function') + 900);
    assert.ok(/dismissModal\(\)/.test(woche), 'softResetWeek hides the overlay by hand again');
    assert.ok(/dismissModal\(\)/.test(tag), 'softReset hides the overlay by hand again');
});
await ok('The day asks for the diary, the one pool with no call site of its own', () => {
    // buildDiary() reads DB.diary straight and falls back to a single line if it
    // is missing - silently. Seen in the played game: a whole day, and the night
    // screen said "No entry. The day was long enough." So the day start asks for
    // it, hours before the page is written.
    const src = readFileSync(new URL('../src/engine/engine_core.js', import.meta.url), 'utf-8');
    const reset = src.slice(src.indexOf('reset: function'), src.indexOf('clearDayTimers: function'));
    assert.ok(/ensure\('diary'\)/.test(reset), 'reset() no longer asks for the diary');

    // And the warm-up that is supposed to cover it has to be given a deadline:
    // requestIdleCallback promises nothing on its own.
    const dataSrc = readFileSync(new URL('../src/data.js', import.meta.url), 'utf-8');
    const pre = dataSrc.slice(dataSrc.indexOf('export function prefetchAll'));
    assert.ok(/timeout:\s*\d+/.test(pre), 'prefetchAll runs without a deadline again');
});
await ok('Resuming raises nothing - five interruptions move no counter', () => {
    resetState();
    engine.startWeek('easy');
    state.morningMoodShown = true;
    state.dayActive = true;                                     // the day has already been played
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
    assert.equal(JSON.stringify(state.archive.stats), vorher, 'resuming counted');
    assert.equal(state.week.active, true);
});

// ------------------------------------------------------- mode separation (fix)
console.log('Keeping the modes apart (bug fix):');
await ok('Entering the day mode ignores the saved week', () => {
    resetState();
    engine.startWeek('easy');
    engine.saveWeek();
    const slot = store.get('layer8_week');
    resetState();
    store.set('layer8_week', slot);

    engine.start();                                             // the workday button
    assert.ok(!calls.overlays.includes('resume-modal'));
    assert.ok(calls.overlays.includes('difficulty-modal'));     // the ordinary day flow
    assert.ok(engine.loadWeek());                               // the week slot untouched
});
await ok('Entering the week mode ignores the saved day', () => {
    resetState();
    state.time = 11 * 60; state.tickets = 3;                    // day mode with progress
    engine.saveDay();
    assert.ok(engine.loadDay());

    engine.startWeekSelect();                                   // the working-week button
    assert.ok(!calls.overlays.includes('resume-modal'));
    assert.ok(calls.overlays.includes('week-modal'));           // straight to the condition picker
    assert.ok(engine.loadDay());                                // the day slot untouched
});
await ok('Discarding from the week picker leads back to the week picker', () => {
    resetState();
    engine.startWeek('normal');
    engine.saveWeek();
    const slot = store.get('layer8_week');
    resetState();
    store.set('layer8_week', slot);

    engine.startWeekSelect();
    assert.ok(calls.overlays.includes('resume-modal'));
    engine.discardDay();                                        // "discard"
    assert.equal(engine.loadWeek(), null);
    assert.ok(calls.overlays.includes('week-modal'));           // NOT the day dialog
    assert.ok(!calls.overlays.includes('difficulty-modal'));
});

// ------------------------------------------------------------- contingents (3a)
console.log('Daily quotas (package 3a):');
await ok('Formula: a large pool is capped at MAX, a small remainder hits MIN', async () => {
    resetState();
    await ensure('coffee', 'server', 'calls', 'sidequests');
    engine.startWeek('easy');
    assert.equal(engine.weekContingentLeft('coffee'), 20);      // ~203 events -> the cap
    assert.equal(engine.weekContingentLeft('calls'), 17);
    assert.equal(engine.weekContingentLeft('sidequest'), 26);   // singular button -> pool key

    const orig = DB.server;
    DB.server = orig.slice(0, 9);                               // 9 left
    state.week.dayIndex = 3;                                    // 3 days left -> ceil(9/3·1.3)=4
    state.week.contingents = {};
    assert.equal(engine.weekContingentLeft('server'), 8);       // MIN 8 takes
    DB.server = orig;
});
await ok('spendContingent counts down, the night resets', () => {
    resetState();
    engine.startWeek('normal');
    const start = engine.weekContingentLeft('calls');
    engine.spendContingent('calls');
    assert.equal(engine.weekContingentLeft('calls'), start - 1);
    engine.advanceWeekNight();
    assert.equal(state.week.contingents.calls ?? null, null);   // lazy until the first draw
    assert.equal(engine.weekContingentLeft('calls'), 17);       // Tuesday, pool still deep
});
await ok('Quota 0: trigger() delivers the idle event, and it costs time', async () => {
    resetState();
    engine.startWeek('easy');
    state.week.contingents = { coffee: 0 };
    const origRandom = Math.random;
    Math.random = () => 0.99;                                   // dodge the boss and the encounter
    await engine.trigger('coffee');
    Math.random = origRandom;
    assert.equal(calls.terminal?.[0]?.id, 'fallback_week_coffee');
    assert.equal(calls.terminal[0].opts[0].m, 20);              // the simulator's contract: time passes
    assert.equal(calls.terminal[0].opts[0].a, 0);               // sim contract: the wall pays nothing
    assert.equal(state.week.contingents.coffee, 0);             // idling consumes nothing
});
await ok('Day mode has no quotas (spend is a no-op)', () => {
    resetState();                                               // week.active false
    engine.spendContingent('coffee');
    assert.deepEqual(state.week.contingents ?? {}, {});
});
// ------------------------------------------------------- stat values (v5.0)
console.log('Stat values:');
await ok('Values stay within 0..100 when assigned', () => {
    resetState();
    state.fl = 98;
    events.addStat.call(engine, 'fl', 7);
    assert.equal(state.fl, 100, 'slipped above 100');
    state.al = 3;
    events.addStat.call(engine, 'al', -20);
    assert.equal(state.al, 0, 'slipped below 0');
});
await ok('An event cannot make the display overshoot', () => {
    resetState();
    state.fl = 96; state.al = 95; state.cr = 97;
    // resolveTerminal is the path the phone sidequests take as well
    events.resolveTerminal.call(engine, { m: 5, l: 15, a: 20, b: 25, r: 'x' }, 'sidequest');
    for (const k of ['fl', 'al', 'cr'])
        assert.ok(state[k] <= 100, `${k} stands at ${state[k]}`);
});
await ok('The fatal threshold is still reached at exactly 100', () => {
    resetState();
    state.al = 90;
    events.addStat.call(engine, 'al', 50);   // would come to 140 without the cap
    assert.equal(state.al, 100, 'the cap was missed');
    assert.ok(state.al >= 100, 'the fatal check (>= 100) would no longer bite');
});

// -------------------------------------------------------------- music (v5.0)
console.log('Music:');
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

    await ok('A track fades in rather than starting hard', async () => {
        state.musicEnabled = true; state.musicVolume = 0.8; state.musicStyle = 'radio';
        mus.initMusic();
        mus.playMusic('office');
        const key = state.currentMusicTrack;
        assert.equal(mus.bgmTracks[key].volume, 0, 'does not start at 0');
        await wait(750);
        assert.ok(Math.abs(mus.bgmTracks[key].volume - 0.8) < 0.02, 'does not fade to the target volume');
    });

    await ok('The replaced track is paused and reset to its volume', async () => {
        state.musicEnabled = true; state.musicVolume = 0.8; state.musicStyle = 'radio';
        mus.initMusic();
        mus.playMusic('office');
        const alt = state.currentMusicTrack;
        await wait(700);
        mus.playMusic('boss');
        await wait(500);
        assert.ok(mus.bgmTracks[alt].paused, 'the old track keeps playing');
        // must not stay at 0, or a later play() without fade would be silent
        assert.ok(Math.abs(mus.bgmTracks[alt].volume - 0.8) < 0.02, 'the volume was not reset');
    });

    await ok('A fixed style loops seamlessly, the radio does not', () => {
        state.musicEnabled = false; state.musicStyle = 'radio';
        mus.initMusic();
        assert.equal(mus.bgmTracks.lofi.loop, false, 'the radio must not loop');
        mus.changeMusicStyle('lofi');
        assert.equal(mus.bgmTracks.lofi.loop, true, 'a fixed style does not loop');
        mus.changeMusicStyle('radio');
        assert.equal(mus.bgmTracks.lofi.loop, false, 'switching back does not take');
    });

    await ok('The volume slider beats a running fade', async () => {
        state.musicEnabled = true; state.musicVolume = 0.8; state.musicStyle = 'radio';
        mus.initMusic();
        mus.playMusic('office');
        const key = state.currentMusicTrack;
        mus.setMusicVolume(0.3);      // in the middle of the fade-in
        await wait(750);
        assert.ok(Math.abs(mus.bgmTracks[key].volume - 0.3) < 0.02,
                  `the fade overwrites the slider: ${mus.bgmTracks[key].volume}`);
    });
}

// ------------------------------------------ the lunch break with flags (v5.1)
console.log('Lunch break:');
await ensure('lunch');
const origRenderTerminal = engine.renderTerminal;
await ok('An aftershock does not appear without its flag', async () => {
    resetState();
    state.week = { active: true, dayIndex: 3 };
    state.storyFlags = {};
    let drawn = [];
    engine.renderTerminal = (ev) => drawn.push(ev.id);
    for (let i = 0; i < 25; i++) { state.usedIDs.clear(); await engine.triggerLunch(); }
    const after = drawn.filter(id => id.startsWith('lunch_nach_'));
    assert.equal(after.length, 0, `drawn with no history: ${after.join(', ')}`);
});
await ok('With the flag the aftershock comes at the same 30 per cent chance', async () => {
    // Same rule as the action pools (FOLLOWUP_CHANCE), so a single draw
    // proves nothing - the rate does.
    resetState();
    state.week = { active: true, dayIndex: 3 };
    state.storyFlags = { path_lunch_gelaufen: 2 };   // set yesterday
    let after = 0;
    const N = 600;
    engine.renderTerminal = (ev) => { if (ev.id.startsWith('lunch_nach_')) after++; };
    for (let i = 0; i < N; i++) { state.usedIDs.clear(); await engine.triggerLunch(); }
    const rate = after / N;
    assert.ok(Math.abs(rate - events.FOLLOWUP_CHANCE) < 0.08,
              `the rate ${(rate * 100).toFixed(1)}% differs from ${events.FOLLOWUP_CHANCE * 100}%`);
});
await ok('Not on the same day', async () => {
    resetState();
    state.week = { active: true, dayIndex: 2 };
    state.storyFlags = { path_lunch_gelaufen: 2 };   // set today
    let drawn = [];
    engine.renderTerminal = (ev) => drawn.push(ev.id);
    for (let i = 0; i < 15; i++) { state.usedIDs.clear(); await engine.triggerLunch(); }
    assert.ok(!drawn.some(id => id.startsWith('lunch_nach_')), 'reqStoryAge does not bite');
});
engine.renderTerminal = origRenderTerminal;   // restore the scaffolding

// ------------------------------------------ knowledge: unread/read (v5.1)
await ensure('compendium');
console.log('Knowledge, unread marker:');
await ok('A freshly opened entry counts as new', () => {
    resetState();
    state.archive.seenEvents = ['cof_sonntag_1'];
    state.archive.seenFlags = [];
    state.archive.knowledgeRead = {};
    const e = engine.knowledgeEntries().find(x => x.id === 'sonntag');
    assert.equal(e.open, true);
    assert.equal(e.unread, true, 'not recognised as new');
});
await ok('Read means read', () => {
    resetState();
    state.archive.seenEvents = ['cof_sonntag_1'];
    state.archive.knowledgeRead = {};
    let e = engine.knowledgeEntries().find(x => x.id === 'sonntag');
    engine.markKnowledgeRead('sonntag', e.notes.length);
    e = engine.knowledgeEntries().find(x => x.id === 'sonntag');
    assert.equal(e.unread, false, 'stays new although it was read');
});
await ok('A later note makes the entry new again', () => {
    resetState();
    state.archive.seenEvents = ['cof_sonntag_1'];
    state.archive.knowledgeRead = {};
    engine.markKnowledgeRead('sonntag', 1);
    // second scene experienced later
    state.archive.seenEvents.push('cof_sonntag_2');
    const e = engine.knowledgeEntries().find(x => x.id === 'sonntag');
    assert.equal(e.notes.length, 2);
    assert.equal(e.unread, true, 'the later note is not reported');
});
await ok('A flag note on its own does not open the entry', () => {
    // The gap the other three miss: notes unlock via `seen` OR via `flag`, and
    // a flag can be raised while none of the entry's sighting events has been
    // opened. Without the `open` guard the register would highlight an entry
    // the player has not met yet.
    resetState();
    state.archive.seenEvents = [];
    state.archive.seenFlags = ['path_flirt_date'];
    state.archive.knowledgeRead = {};
    const e = engine.knowledgeEntries().find(x => x.id === 'sarah');
    assert.equal(e.open, false, 'wrongly counts as met');
    assert.ok(e.notes.length > 0, 'the flag note was not unlocked');
    assert.equal(e.unread, false, 'an unopened entry reports itself as new');
});
await ok('The knowledge follows the language', async () => {
    // knowledgeEntries() went through DB instead of tree(). That is the trap
    // CLAUDE.md documents: DB is a plain object, the language switch refills it,
    // and a $derived that only reads DB notices nothing. In the component the
    // tabs changed language while role and notes stayed behind - seen in the
    // running game on 17.08.2026.
    resetState();
    state.archive.seenEvents = ['cof_sonntag_1'];
    state.archive.knowledgeRead = {};
    const rolle = () => engine.knowledgeEntries().find(x => x.id === 'sonntag')?.role;

    await useLanguage('de');
    await loadCore('de');
    await ensure('compendium');
    const de = rolle();

    await useLanguage('en');
    await loadCore('en');
    await ensure('compendium');
    const en = rolle();

    // BACK TO LANG, not to 'de'. Up to 6.1 a hard-coded 'de' stood here, so the
    // --lang=en run carried on in German from this line - two thirds of the
    // suite, silently, and green. Precisely the gap the second run was built
    // for.
    await useLanguage(LANG);
    await loadCore(LANG);
    await ensure('compendium');

    assert.ok(de && en, 'one tree delivered nothing');
    assert.notEqual(de, en, `the role stays "${de}" in both trees`);
    assert.equal(rolle(), LANG === 'en' ? en : de, 'it does not come back');

    // And the check that actually bites. The three assertions above hold even
    // if someone reaches straight for DB again - in Node tree() simply answers
    // DB, the difference is pure Svelte reactivity and cannot be seen here.
    // Measured: the mutation probe did not fire. So the source is read, the way
    // i18n.test.mjs does it for index.html.
    const quelle = readFileSync(new URL('../src/engine/engine_core.js', import.meta.url), 'utf-8');
    const stelle = quelle.slice(quelle.indexOf('knowledgeEntries:'), quelle.indexOf('markKnowledgeRead:'));
    assert.ok(stelle.includes('tree().compendium'),
              "knowledgeEntries does not read the tree through tree() - the component then misses the language switch");
    assert.ok(!/\bDB\.compendium/.test(stelle),
              'knowledgeEntries reaches straight for DB again');
});
await ok('What you have never met is not new', () => {
    resetState();
    state.archive.seenEvents = [];
    state.archive.knowledgeRead = {};
    assert.equal(engine.knowledgeEntries().some(e => e.unread), false, 'unopened entries report themselves');
});

// ------------------------------------------------------ boot sequence (v5.0)
console.log('Boot sequence:');
await ok('From the second morning on the boot is short', () => {
    resetState();
    state.week = { active: true, dayIndex: 3 };
    state.tickets = 2;
    const lines = ui.buildBootLines.call(engine);
    assert.ok(lines.length <= 5, `too long: ${lines.length} lines`);
    assert.ok(!lines.some(l => l.includes('Copyright')), 'the welcome header on a later day');
});
await ok('The boot reports the carried-over tickets', () => {
    resetState();
    state.week = { active: true, dayIndex: 2 };
    state.tickets = 4;
    const lines = ui.buildBootLines.call(engine);
    assert.ok(lines.includes(tf('boot.carry.tickets', { tickets: 4 })), lines.join(' | '));
});
await ok('On Friday the meeting comes first', () => {
    resetState();
    state.week = { active: true, dayIndex: 5 };
    state.tickets = 6;
    const lines = ui.buildBootLines.call(engine);
    const idx = lines.findIndex(l => l === t('boot.meeting'));
    assert.ok(idx > 0 && idx < 3, `Meeting an Position ${idx}: ${lines.join(' | ')}`);
});
await ok('With no week the full welcome header stays', () => {
    resetState();
    state.week = { active: false, dayIndex: 0 };
    const lines = ui.buildBootLines.call(engine);
    assert.ok(lines.some(l => l.includes('Copyright')), 'the header is missing in day mode');
    assert.equal(new Set(lines).size, lines.length, 'a duplicate line in the boot');
});
await ok('Monday names the starting condition instead of a carry-over', () => {
    // startWeek() sets tickets and aggro as the level's starting condition,
    // and a week restart via the settings puts the player back exactly there.
    // Calling that a carry-over would report something that never happened.
    resetState();
    state.week = { active: true, level: 'hard', dayIndex: 1 };
    state.tickets = 2; state.al = 10;
    const lines = ui.buildBootLines.call(engine);
    // Against the dictionary, not against the German sentence: up to 6.1 this
    // read "Uebernehme offene Tickets" and "Vortag", and both only held while
    // the English run was never English (see "The knowledge follows the
    // language").
    assert.ok(!lines.includes(tf('boot.carry.tickets', { tickets: 2 })), lines.join(' | '));
    assert.ok(!lines.includes(tf('boot.carry.radar', { value: 10 })), lines.join(' | '));
    assert.ok(lines.includes(tf('boot.startCondition', { mode: t('week.diff.hard').toUpperCase() })),
              'the starting condition is missing');
});
await ok('A workday never reports a carry-over', () => {
    // The day restart plays the boot sequence BEFORE reset(), so the state
    // still holds the finished day. Nothing of it may show up: a workday
    // always starts clean at the chosen difficulty.
    resetState();
    state.week = { active: false, dayIndex: 0 };
    state.tickets = 7; state.cr = 60; state.al = 80;
    state.inventory = [{ id: 'tape' }, { id: 'donut' }];
    const lines = ui.buildBootLines.call(engine);
    // Every carry-over line as it would read for this state - none of them may
    // stand in day mode.
    const uebertrag = {
        'boot.carry.tickets':  tf('boot.carry.tickets', { tickets: 7 }),
        'boot.carry.radar':    tf('boot.carry.radar', { value: 60 }),
        'boot.carry.aggro':    tf('boot.carry.aggro', { value: 80 }),
        'boot.carry.itemMany': tf('boot.carry.itemMany', { items: 2 }),
        'boot.carry.daysLeft': tf('boot.carry.daysLeft', { days: 5 }),
        'boot.meeting':        t('boot.meeting'),
    };
    for (const [key, zeile] of Object.entries(uebertrag))
        assert.ok(!lines.includes(zeile), `"${key}" in day mode: ${lines.join(' | ')}`);
});

// ------------------------------------------------------- compendium (v5.0)
console.log('Knowledge / compendium:');
await ensure('compendium');
await ok('Evidence lands in the archive for good', () => {
    resetState();
    state.archive.seenEvents = []; state.archive.seenFlags = [];
    events.recordSeen.call(engine, 'event', 'cof_sonntag_1');
    events.recordSeen.call(engine, 'event', 'cof_sonntag_1');   // a duplicate does not count
    events.setStoryFlag.call(engine, 'srv_marder_meldung');
    assert.deepEqual(state.archive.seenEvents, ['cof_sonntag_1']);
    assert.ok(state.archive.seenFlags.includes('srv_marder_meldung'));
});
await ok('With no encounter the entry stays shut', () => {
    resetState();
    state.archive.seenEvents = []; state.archive.seenFlags = [];
    const sonntag = engine.knowledgeEntries().find(e => e.id === 'sonntag');
    assert.equal(sonntag.open, false, 'the entry is open without an encounter');
    assert.equal(sonntag.notes.length, 0);
});
await ok('An encounter opens the entry, the note follows the evidence', () => {
    resetState();
    state.archive.seenEvents = ['cof_sonntag_1']; state.archive.seenFlags = [];
    const sonntag = engine.knowledgeEntries().find(e => e.id === 'sonntag');
    assert.equal(sonntag.open, true, 'the entry was not unlocked');
    assert.equal(sonntag.notes.length, 1, 'exactly the note that was lived through is expected');
    // Compared through the identity of the evidence, not through the German
    // sentence: the note carries a `seen`, and that is the same in both trees.
    const quelle = (DB.compendium ?? []).find(e => e.id === 'sonntag');
    assert.equal(sonntag.notes[0], quelle.notes.find(n => n.seen === 'cof_sonntag_1').text);
});
await ok('Flags unlock notes just as events do', () => {
    resetState();
    state.archive.seenEvents = ['srv_marder_1'];
    state.archive.seenFlags = ['srv_marder_meldung'];
    const b = engine.knowledgeEntries().find(e => e.id === 'blaschke');
    assert.equal(b.open, true);
    assert.equal(b.notes.length, 1);
    const blaschke = (DB.compendium ?? []).find(e => e.id === 'blaschke');
    assert.equal(b.notes[0], blaschke.notes.find(n => n.flag === 'srv_marder_meldung').text);
});
await ok('The evidence is recorded when an event opens', () => {
    resetState();
    state.archive.seenEvents = [];
    events.renderTerminal.call(engine, { id: 'tst_seen', title: 'T', text: 'x', opts: [] }, 'server');
    assert.ok(state.archive.seenEvents.includes('tst_seen'), 'the hook is missing');
});

// --------------------------------------------------- item cooldowns (v5.0)
console.log('Items with cooldown and cost:');
await ok('Cooldowns are per item, not global', () => {
    resetState();
    state.time = 600;
    engine.state.itemCooldowns.stressball = 600;
    // The ball is cooling; the doll has its own clock and stays available.
    assert.ok(state.time - state.itemCooldowns.stressball < DB.items.stressball.use.cooldown);
    assert.equal(state.itemCooldowns.voodoo_doll ?? undefined, undefined);
});
await ok('The tie lowers the boss radar when Dr. Wichtig appears', () => {
    resetState();
    state.cr = 50;
    state.inventory = [{ id: 'tie', used: false }];
    engine.applyPassiveItems('Dr. Wichtig');
    assert.equal(state.cr, 45, 'the passive effect was not applied');
});
await ok('The tie stays quiet for other characters', () => {
    resetState();
    state.cr = 50;
    state.inventory = [{ id: 'tie', used: false }];
    engine.applyPassiveItems('Kevin');
    engine.applyPassiveItems(null);
    assert.equal(state.cr, 50, 'the effect fired for the wrong character');
});
await ok('With no tie in the backpack nothing happens', () => {
    resetState();
    state.cr = 50;
    state.inventory = [];
    engine.applyPassiveItems('Dr. Wichtig');
    assert.equal(state.cr, 50);
});
await ok('The boss value stays capped at 0', () => {
    resetState();
    state.cr = 2;
    state.inventory = [{ id: 'tie', used: false }];
    engine.applyPassiveItems('Dr. Wichtig');
    assert.equal(state.cr, 0, 'slipped below zero');
});
await ok('The effect really does hang on an event opening', () => {
    resetState();
    state.cr = 50;
    state.inventory = [{ id: 'tie', used: false }];
    // The REAL renderTerminal, not the harness stub above: only this proves
    // the hook is wired. Calling it through the helper would pass even if
    // nobody ever called applyPassiveItems in production.
    events.renderTerminal.call(engine, { id: 'tst_passive', char: 'Dr. Wichtig', title: 'T', text: 'x', opts: [] }, 'server');
    assert.equal(state.cr, 45, 'the hook in renderTerminal is missing');
    assert.equal(calls.termEvent.charName, 'Dr. Wichtig');
});
await ok('use.b and use.rep take effect on use', () => {
    resetState();
    state.time = 600;
    state.inventory = [{ id: 'voodoo_doll', used: false }];
    const al0 = state.al, cr0 = state.cr;
    state.pendingItem = 'voodoo_doll';
    engine.confirmUseItem();
    assert.equal(state.al, Math.max(0, al0 - 20), 'aggro was not lowered');
    assert.equal(state.cr, cr0 + 10, 'the boss value did not rise');
    assert.equal(state.reputation['Dr. Wichtig'], -2, 'reputation was not deducted');
    assert.equal(state.itemCooldowns.voodoo_doll, 600, 'the cooldown was not set');
    // keep: true - the doll stays in the backpack
    assert.ok(state.inventory.some(i => i.id === 'voodoo_doll'), 'Puppe verschwunden');
});
await ok('The boss value stays capped at 100', () => {
    resetState();
    state.time = 600;
    state.cr = 95;
    state.inventory = [{ id: 'voodoo_doll', used: false }];
    state.pendingItem = 'voodoo_doll';
    engine.confirmUseItem();
    assert.equal(state.cr, 100, 'the cap was breached');
});

// ------------------------------------------------------- time predicates (3f)
console.log('Time predicates (three-parters):');
await ok('In a week a flag carries the day it was set, in day mode true', () => {
    resetState();
    engine.setStoryFlag('tst_day_flag');
    assert.equal(state.storyFlags.tst_day_flag, true);          // day mode: plain truthy
    engine.startWeek('easy');
    state.week.dayIndex = 2;
    engine.setStoryFlag('tst_week_flag');
    assert.equal(state.storyFlags.tst_week_flag, 2);            // week mode: the day number
});
await ok('reqStoryAge blocks on the same day and opens after the night', () => {
    resetState();
    engine.startWeek('easy');
    engine.setStoryFlag('tst_ketchup');
    const ev = { id: 'tst', reqStory: 'tst_ketchup', reqStoryAge: 1 };
    assert.equal(engine.storyGateOpen(ev), false);              // same day: locked
    engine.advanceWeekNight();
    assert.equal(engine.storyGateOpen(ev), true);               // tomorrow: open
    assert.equal(engine.storyGateOpen({ ...ev, reqStoryAge: 2 }), false);
});
await ok('reqWeekDayMin opens from the given day on, not only on it', () => {
    resetState();
    engine.startWeek('easy');
    const ev = { id: 'tst', reqWeekDayMin: 3 };
    assert.equal(engine.storyGateOpen(ev), false);              // Monday
    state.week.dayIndex = 3;
    assert.equal(engine.storyGateOpen(ev), true);               // Wednesday
    state.week.dayIndex = 4;
    assert.equal(engine.storyGateOpen(ev), true);               // Thursday too: min, not only
});
await ok('Day mode never satisfies a time predicate', () => {
    resetState();                                               // week.active false
    engine.setStoryFlag('tst_ketchup');
    assert.equal(engine.storyGateOpen({ id: 'tst', reqStory: 'tst_ketchup' }), true);
    assert.equal(engine.storyGateOpen({ id: 'tst', reqStory: 'tst_ketchup', reqStoryAge: 1 }), false);
    assert.equal(engine.storyGateOpen({ id: 'tst', reqWeekDayMin: 2 }), false);
});
await ok('The day stamp survives saving and loading', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 2;
    engine.setStoryFlag('tst_stamp');
    engine.saveWeek();
    const slot = JSON.parse(store.get('layer8_week'));
    assert.ok(JSON.stringify(slot).includes('"tst_stamp":2'), 'the stamp is missing from the week slot');
});

await ok('In a week the lunch break filters against usedIDs and remembers the draw', async () => {
    resetState();
    engine.startWeek('easy');
    await ensure('lunch');
    DB.lunch.forEach((ev, i) => { if (i !== 0) state.usedIDs.add(ev.id); });
    await engine.triggerLunch();
    assert.equal(calls.terminal[0].id, DB.lunch[0].id);         // the only unused lunch left
    assert.ok(state.usedIDs.has(DB.lunch[0].id));
});
await ok('In a week an empty errand pool costs time instead of a free click', async () => {
    resetState();
    engine.startWeek('easy');
    await ensure('sidequests');
    DB.sidequests.forEach(ev => state.usedIDs.add(ev.id));
    engine.handleSideQuest();
    assert.equal(calls.terminal?.[0]?.id, 'fallback_week_sidequests');
});

// ------------------------------------------------- node chars & meeting (3b)
console.log('Node speaker & meeting (package 3b):');
await ok("Terminal chain: the node's char beats the event's, null forces none", () => {
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
    assert.equal(calls.termEvent.charName, 'Kevin');            // inherited from the event
    engine.renderChainNode('berater');
    assert.equal(calls.termEvent.charName, 'Frau Vogl (Synerqon)');
    engine.renderChainNode('niemand');
    assert.equal(calls.termEvent.charName, null);               // char: null forces the initial, or nothing
});
await ok('The action bar respects what the tutorial has unlocked', () => {
    // The field belongs to the day, or an unlock survives the restart.
    resetState();
    assert.equal(state.tutorialUnlocked, null, 'tutorialUnlocked is missing from freshDay');
    assert.equal(state.tutorialStep, null, 'tutorialStep is missing from freshDay');

    // The binding itself cannot be checked here - ActionBar is a component, and
    // disableButtons is a stub in this suite anyway. But that is exactly where
    // the fault sat: `disabled` hung on buttonsDisabled alone, so Svelte
    // overwrote the btn.disabled = false from tutorial.js on the next render -
    // the pointer pointed at CALL and the button could not be pressed. So the
    // source is read, the way i18n.test.mjs does it for index.html.
    const bar = readFileSync(new URL('../src/components/ActionBar.svelte', import.meta.url), 'utf-8');
    const zeile = bar.split('\n').find(l => l.includes('disabled={'));
    assert.ok(zeile, 'ActionBar no longer binds disabled');
    assert.ok(zeile.includes('tutorialUnlocked'),
              'ActionBar locks again regardless of what the tutorial unlocked: ' + zeile.trim());

    // And the other direction: the tutorial has to set the unlock as well.
    const tut = readFileSync(new URL('../src/tutorial.js', import.meta.url), 'utf-8');
    assert.ok(/tutorialUnlocked\s*=\s*id/.test(tut),
              'highlightAction no longer frees the button through the state');

    // Since 6.1 the dimming and the ring come out of the state as well. Before
    // that tutorial.js set them on the element, which only held while nothing
    // state-derived stood in the class attribute - an unwritten agreement.
    assert.ok(bar.includes('state.tutorialStep'),
              'ActionBar no longer draws the tutorial dimming from the state');
    assert.ok(!tut.includes('opacity-50'),
              'tutorial.js writes classes onto the four bar buttons again');
});
await ok("The tutorial's closing screen carries i18n marks of its own", () => {
    // The fault it catches: showConclusion() wrote text over the elements that
    // still carried data-i18n="tutorial.ask.*". A language switch runs
    // applyStaticStrings(), which put the opening QUESTION back with the finish
    // button still underneath it, in the old language. It was not reachable,
    // because Escape bows out while this modal is open - it hung on one guard.
    const tut = readFileSync(new URL('../src/tutorial.js', import.meta.url), 'utf-8');

    assert.ok(!/innerText\s*=\s*t\(|innerHTML\s*=\s*t\(/.test(tut),
              'tutorial.js writes finished text over the marks again');
    assert.ok(tut.includes("'tutorial.done.title'") && tut.includes("'tutorial.done.text'"),
              'the closing screen no longer sets its marks');
    assert.ok(tut.includes('applyStaticStrings('),
              'the screen is no longer filled through applyStaticStrings');
});
await ok('The engine reports rather than letting itself be overwritten', async () => {
    // Up to 6.1 tutorial.js wrapped seven engine methods and NEVER took them
    // back: hours after the lesson every one of those calls still went through a
    // wrapper. Now the engine reports, the tutorial listens - and unsubscribes
    // again.
    const { hooks, ENGINE_EVENTS } = await import('../src/engine/engine_hooks.js');

    let gehoert = 0;
    const ab = hooks.on('openTeam', () => gehoert++);
    hooks.emit('openTeam');
    assert.equal(gehoert, 1, 'the notice does not arrive');
    ab();
    hooks.emit('openTeam');
    assert.equal(gehoert, 1, 'delivery carries on after unsubscribing');

    // A name that does not exist throws at once - instead of quietly never firing.
    assert.throws(() => hooks.on('opneTeam', () => {}), /Unknown engine event/);
    assert.throws(() => hooks.emit('opneTeam'), /Unknown engine event/);

    // A veto is something other than a notice: it may say no. Without it the
    // doughnut lock from step 8 would have vanished without a sound.
    assert.equal(hooks.allowsItem('donut'), true, 'with no guard everything is allowed');
    const zurueck = hooks.setItemGuard((id) => id === 'donut');
    assert.equal(hooks.allowsItem('donut'), true);
    assert.equal(hooks.allowsItem('stressball'), false, 'the guard is not asked');
    zurueck();
    assert.equal(hooks.allowsItem('stressball'), true, 'the guard stays behind after unsubscribing');

    // A listener that throws must not take the caller with it.
    const ab2 = hooks.on('closeTeam', () => { throw new Error('probe'); });
    assert.doesNotThrow(() => hooks.emit('closeTeam'), 'a broken listener takes the engine with it');
    ab2();

    // And the other direction in the source: no wrapper left, no global.
    const tut = readFileSync(new URL('../src/tutorial.js', import.meta.url), 'utf-8');
    assert.ok(!/engine\.[a-zA-Z]+ = function/.test(tut),
              'tutorial.js overwrites engine methods again');
    assert.ok(!tut.includes('window.tutorial'),
              'tutorial.js creates a global again');
    assert.ok(/deafen/.test(tut), 'there is no way left to unsubscribe');
    assert.equal(ENGINE_EVENTS.length, 6, 'the list of notices has changed');
});
await ok("The error brake does not lift the tutorial's lock", () => {
    // The fault it catches: recoverFromError() pulls the interface out of a
    // crashed action and called disableButtons(false) to do it. During the
    // tutorial that left all four buttons dimmed AND clickable - the display
    // said locked, the button let itself be pressed. Reproduced with a thrown
    // error in the middle of step 1.
    const src = readFileSync(new URL('../src/engine.js', import.meta.url), 'utf-8');
    const bremse = src.slice(src.indexOf('function recoverFromError'),
                             src.indexOf('window.addEventListener'));
    // Since 6.1 it asks the registration slot rather than a bare global - the
    // statement is the same, the spelling is not.
    assert.ok(bremse.includes('lesson?.isActive'),
              'recoverFromError no longer asks the tutorial');
    assert.ok(bremse.includes('lesson.applyStepLogic()'),
              'recoverFromError no longer restores the step');
});
await ok("The tutorial's speech bubble carries keys, not sentences", () => {
    // The fault it catches: tutorial.js resolved the step texts with t() and
    // put finished sentences into state.tutorialPointer. A language switch
    // mid-lesson moved the bar to COFFEE while the bubble above it still said
    // "Kaffee holen", until the step changed. The same class of break the log
    // had before the recipes.
    const tut = readFileSync(new URL('../src/tutorial.js', import.meta.url), 'utf-8');
    assert.ok(!/t\('tutorial\.step\./.test(tut),
              'tutorial.js resolves the step texts by itself again');

    const ptr = readFileSync(new URL('../src/components/TutorialPointer.svelte', import.meta.url), 'utf-8');
    assert.ok(ptr.includes('t(tip.titleKey)') && ptr.includes('t(tip.descKey)'),
              'TutorialPointer no longer resolves the keys itself');
});
await ok('One ticket is a ticket, and the report knows its week', () => {
    // Two faults on one screen, found by playing the week through: "1 tickets"
    // (the balance had no singular) and a day report that read "WEDNESDAY
    // (normal)" in EVERY week - it hung on difficultyMult, which stays at 1.0
    // in week mode. The level and the day therefore have to travel on the end
    // object: finishWeek() clears week.active before the screen is built.
    resetState();
    engine.startWeek('hard');
    state.week.dayIndex = 5;
    state.week.weekLog = [
        { dayIndex: 1, endTickets: 1, endL: 10, endA: 20, endB: 15, coffee: 1, mailsIgnored: 1 },
    ];
    state.time = 16 * 60 + 30; state.tickets = 4; state.meetingDone = true;
    state.fl = 30; state.al = 40; state.cr = 20;
    engine.checkEndConditions();
    engine.finishGame();

    // The count picks the key, and the count travels in the snapshot: one stays
    // one, four stays four. Which of the two keys components/WeekBalance.svelte
    // picks from that is held by the source check further down - what stands
    // here is what it is given to decide.
    assert.equal(calls.end.balance.rows[0].tickets, 1, 'the Monday row does not carry the one');
    assert.equal(calls.end.balance.rows[1].tickets, 4, 'the Friday row does not carry the four');
    assert.equal(calls.end.balance.mails, 1, 'the totals row does not carry the one');
    assert.equal(calls.end.balance.coffee, 1);

    // The day report is handed the level and the day, as an id and a number.
    assert.equal(calls.end.weekMode, 'hard', 'the week level does not travel along');
    assert.equal(calls.end.weekDay, 5, 'the weekday does not travel along');
});
await ok('The save has no say in the tutorial', () => {
    // The fault it catches: tutorialStep and tutorialUnlocked live in
    // freshDay(), and saveDay() derives its fields from exactly that - so they
    // went into the save. Leaving the tutorial through the main menu wrote step
    // 2 to storage, and carrying on afterwards left the bar dimmed for the rest
    // of the day with no tutorial left to undim it. They belong to the session,
    // not to the workday.
    resetState();
    state.time = 9 * 60;
    state.tutorialStep = 2;
    state.tutorialUnlocked = 'btn-coffee';
    engine.saveDay();

    const abgelegt = JSON.parse(store.get('layer8_day'));
    assert.equal(abgelegt.tutorialStep, undefined,
                 'tutorialStep is in the save');
    assert.equal(abgelegt.tutorialUnlocked, undefined,
                 'tutorialUnlocked is in the save');

    // And the other direction: a save from a dev build that still carries the
    // fields must not write them back.
    resetState();
    engine.applyRestoredDay({ time: 9 * 60, tutorialStep: 2, tutorialUnlocked: 'btn-coffee' });
    assert.equal(state.tutorialStep, null, 'tutorialStep came back out of the save');
    assert.equal(state.tutorialUnlocked, null, 'tutorialUnlocked came back out of the save');
    assert.equal(state.time, 9 * 60, 'the rest of the day is no longer played back in');
});
await ok('setDifficulty creates a fresh day instead of patching fields', () => {
    // The fault it catches: up to 6.0 setDifficulty set only what the level
    // itself changes. Everything else stayed, so a day inherited the tickets and
    // values of the last one. On easy and normal nothing at all was cleared, on
    // hard laziness and the boss radar stayed. Reported after the tutorial: what
    // the lesson left behind travelled into the day that followed.
    for (const [stufe, tickets, ausreden, mult] of
         [['easy', 0, 3, 0.8], ['normal', 0, 2, 1.0], ['hard', 2, 1, 1.25]]) {
        resetState();
        Object.assign(state, {
            tickets: 7, fl: 40, al: 30, cr: 20,
            coffeeConsumed: 9, emailsIgnored: 4, time: 11 * 60,
            inventory: [{ id: 'donut', used: false }]
        });
        engine.setDifficulty(stufe);

        assert.equal(state.tickets, tickets, `${stufe}: tickets carried over`);
        assert.equal(state.excusesLeft, ausreden, `${stufe}: Ausreden falsch`);
        assert.equal(state.difficultyMult, mult, `${stufe}: Multiplikator falsch`);
        for (const feld of ['fl', 'al', 'cr', 'coffeeConsumed', 'emailsIgnored']) {
            assert.equal(state[feld], 0, `${stufe}: ${feld} carried over`);
        }
        assert.deepEqual(state.inventory, [], `${stufe}: backpack carried over`);
        assert.equal(state.time, 8 * 60, `${stufe}: clock carried over`);
    }
});
await ok('setDifficulty keeps the log - the version line belongs to the session', () => {
    // freshDay() empties logEntries. But init() writes the boot line BEFORE every
    // day, and refreshBootLogEntry() finds it again through id 1.
    resetState();
    // Put straight into the state: this suite replaces engine.log with a stub, so
    // a call would never reach the log.
    state.logEntries.push({ k: 'log.systemLoaded', v: { version: engine.VERSION },
                            id: 1, time: '08:00', color: '' });
    const start = state.logEntries.at(-1);
    const vorher = state.logEntries.length;
    calls.logs = [];

    engine.setDifficulty('normal');

    assert.ok(state.logEntries.some(e => e.id === start.id), 'the boot line is gone');
    assert.equal(state.logEntries.length, vorher, 'something was removed from the log');
    // The mode line goes through the suite's log stub, not into the state - that
    // is where it is checked.
    assert.ok(calls.logs.some(l => l?.k === 'mode.normal'), 'the mode line is missing');
});
await ok('The Friday 15:00 changeover arms the button to the weekly meeting', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 5;
    state.time = 14 * 60 + 55; state.lunchDone = true;
    state.currentEventId = 'x'; state.currentEventType = 'coffee';
    engine.resolveTerminal({ r: 'Test.', m: 10, l: 0, a: 0, b: 0 }, 'coffee');
    assert.equal(calls.termResult.action, 'triggerMeeting');
    // An identity rather than display text: since 6.0 the button carries the key,
    // and a comparison against 'ZUM WOCHENMEETING' would only have checked German.
    assert.equal(calls.termResult.buttonKey, 'terminal.btn.meeting');
});
await ok('The meeting hands out no tickets - the example: 15:10 to 16:10', () => {
    // The count runs over BOUNDARIES, not over duration: 15:10 to 16:10 crosses
    // 15:30 and 16:00, which would be two. The meeting is exempt from it.
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 5; state.lunchDone = true; state.meetingDone = true;
    state.time = 15 * 60 + 10;
    state.tickets = 4;
    engine.resolveTerminal({ r: 'Meeting vorbei.', m: 60, l: 0, a: 0, b: 0 }, 'meeting');
    assert.equal(state.tickets, 4, 'the meeting handed out tickets');
    assert.equal(state.time, 16 * 60 + 10, 'time has to pass all the same');
});
await ok('The counter-check: the same stretch as an ordinary event costs two', () => {
    // Without this line the one before it checks nothing - it would only prove
    // that something or other hands out no tickets.
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 5; state.lunchDone = true; state.meetingDone = true;
    state.time = 15 * 60 + 10;
    state.tickets = 4;
    engine.resolveTerminal({ r: 'Kaffee.', m: 60, l: 0, a: 0, b: 0 }, 'coffee');
    assert.equal(state.tickets, 6, 'the boundaries 15:30 and 16:00 are missing');
});
await ok('After the meeting the rest of the day counts on as usual', () => {
    // Exempt, not shifted: the arithmetic hangs on the clock, not on a second,
    // invisible time.
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 5; state.lunchDone = true; state.meetingDone = true;
    state.time = 15 * 60 + 10; state.tickets = 0;
    engine.resolveTerminal({ r: 'Meeting vorbei.', m: 60, l: 0, a: 0, b: 0 }, 'meeting');
    assert.equal(state.tickets, 0);
    engine.resolveTerminal({ r: 'Kaffee.', m: 20, l: 0, a: 0, b: 0 }, 'coffee');
    assert.equal(state.tickets, 1, '16:10 to 16:30 is exactly one boundary');
});
await ok('No meeting button: Mon-Thu, day mode, or the meeting already done', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 3;                                    // Wednesday
    state.time = 14 * 60 + 55; state.lunchDone = true;
    state.currentEventId = 'x'; state.currentEventType = 'coffee';
    engine.resolveTerminal({ r: 'Test.', m: 10, l: 0, a: 0, b: 0 }, 'coffee');
    assert.equal(calls.termResult.action, 'reset');

    state.week.dayIndex = 5; state.meetingDone = true;          // Friday, but already done
    state.time = 15 * 60 + 30;
    engine.resolveTerminal({ r: 'Test.', m: 10, l: 0, a: 0, b: 0 }, 'coffee');
    assert.equal(calls.termResult.action, 'reset');
});
await ok('triggerMeeting: draws from the pool, sets meetingDone, the gala variant takes', async () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 5;
    const realParty = engine.partyInvitation;

    engine.partyInvitation = () => null;                        // no gala today
    await engine.triggerMeeting();
    assert.equal(state.meetingDone, true);
    assert.ok(calls.terminal[0].id.startsWith('meet_'));
    assert.equal(calls.terminal[0].startNode, 'root');
    assert.equal(calls.terminal[1], 'meeting');
    assert.ok(DB.meetings.some(m => m.id === calls.terminal[0].id));

    state.meetingDone = false; state.usedIDs.clear();
    engine.partyInvitation = () => ({ isParty: true });         // the gala is due
    await engine.triggerMeeting();
    assert.equal(calls.terminal[0].startNode, 'root_gala');     // the announcement variant
    engine.partyInvitation = realParty;
});
await ok('Friday 16:30: the meeting first, then the gala or the balance sheet', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 5;
    state.time = 16 * 60 + 30;
    const realParty = engine.partyInvitation;
    engine.partyInvitation = () => ({ isParty: true, partyKey: 'k', diffStr: 'easy' });

    // Without the meeting nothing ends - the button leads to the meeting room.
    state.meetingDone = false;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd, null, 'the finale must not be skipped');

    // With the meeting and the requirements met: the gala
    state.meetingDone = true;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd.isParty, true);

    // With the meeting, without the gala requirements: the balance sheet
    state.pendingEnd = null;
    engine.partyInvitation = () => null;
    engine.checkEndConditions();
    assert.deepEqual(state.pendingEnd.title, { k: 'end.weekTitle' });

    engine.partyInvitation = realParty;
});
await ok('partyInvitation goes by grade: week_normal asks for the Wednesday rank and shares the played key', () => {
    resetState();
    engine.startWeek('normal');
    const REQUIRED = ['ach_mentor', 'ach_ally', 'ach_keymaster', 'ach_rockstar',
                      'ach_closer', 'ach_cat_whisperer', 'ach_lore', 'ach_wolf'];
    state.archive.achievements = [...REQUIRED];
    state.archive.achievementDiffs = Object.fromEntries(REQUIRED.map(id => [id, 'normal']));
    const party = engine.partyInvitation();
    assert.ok(party);
    assert.equal(party.diffStr, 'normal');                      // the day rank, a shared key
    localStorage.setItem(party.partyKey, 'true');               // the Wednesday gala has already been played
    assert.equal(engine.partyInvitation(), null);
    localStorage.removeItem(party.partyKey);
});
await ok('finishParty closes the week: counters, balance sheet under the party report, slot emptied', async () => {
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
    assert.ok(calls.end.balance, 'the balance sheet is missing under the party report');
    // The party report knows the week - as an id, not as "WOCHE (Erholt)". The
    // German display text stood here up to 6.1 and would have fallen in the
    // English run, as soon as that run was actually English.
    assert.deepEqual(calls.end.party.mode, { week: true, level: 'easy' });
    assert.equal(calls.end.balance.mode, 'easy');
    // With no option path (a direct call) the ending stays the word that came in.
    assert.equal(calls.end.party.subtitle, 'SYNERGY!');
    assert.equal(state.archive.stats.weeksSurvived, 1);
    assert.equal(state.week.active, false);
    assert.equal(engine.loadWeek(), null);
    assert.equal(localStorage.getItem('layer8_party_played_easy'), 'true');
    localStorage.removeItem('layer8_party_played_easy');
});

// --------------------------------------------- diary, sleep, archive (3c)
console.log('Diary, sleep & archive (package 3c):');
await ok('Diary: in a week {weekday} is the real calendar day', async () => {
    resetState();
    await ensure('diary');
    const origDiary = DB.diary;
    DB.diary = { mood: [{ id: 't_mood', when: () => true, lines: ['Today is {weekday}, {restdays} days to go.'] }] };

    engine.startWeek('easy');                                   // rested = easy
    state.week.dayIndex = 3;
    // The mark travels as a recipe and is filled in only when the page is drawn -
    // in the English tree the same index is called Wednesday.
    let seite = renderDiary(buildDiary(state, 'WIN'));
    assert.equal(seite.paragraphs[0].text, `Today is ${dayName(2)}, 2 days to go.`);

    engine.endWeek();
    state.difficultyMult = 0.8;                                 // day mode, easy
    seite = renderDiary(buildDiary(state, 'WIN'));
    // In day mode the difficulty stands for a calendar day: easy is the Friday
    // (WEEKDAY_INDEX in engine_diary.js), here too through the index.
    assert.ok(seite.paragraphs[0].text.startsWith(`Today is ${dayName(4)}`), seite.paragraphs[0].text);
    DB.diary = origDiary;
});
await ok('Diary: the header names the same day as the prose', async () => {
    // The page header worked out its weekday from difficultyMult on its own - the
    // DAY mode's question. In a week that value stays at its identity 1.0, so a
    // Friday was headed "Mittwoch", five days running, at every level. The same
    // family as the day report one file over. Now the day travels along, and
    // {weekday} comes from the same answer.
    resetState();
    await ensure('diary');
    const origDiary = DB.diary;
    DB.diary = { mood: [{ id: 't_kopf', when: () => true, lines: ['{weekday}.'] }] };

    engine.startWeek('easy');                                   // easy = the Friday in day mode
    for (const tag of [1, 3, 5]) {
        state.week.dayIndex = tag;
        const seite = renderDiary(buildDiary(state, 'WIN'));
        assert.equal(seite.dayIndex, tag - 1, `day ${tag}: the header shows the wrong day`);
        assert.equal(seite.paragraphs[0].text, `${dayName(tag - 1)}.`, 'header and prose disagree');
    }

    engine.endWeek();                                           // day mode: the level stands for a day
    state.difficultyMult = 0.8;
    assert.equal(buildDiary(state, 'WIN').dayIndex, 4, 'rested is the Friday');
    state.difficultyMult = 1.5;
    assert.equal(buildDiary(state, 'WIN').dayIndex, 0, 'in need of leave is the Monday');
    state.difficultyMult = 1.0;
    assert.equal(buildDiary(state, 'WIN').dayIndex, 2, 'fed up is the Wednesday');

    DB.diary = origDiary;
});
await ok('The gala passes its ending on twice, as a reference', async () => {
    // Two routes out of the same action arguments: argument 0 is the name of the
    // ending above the party report, argument 1 its prose, which goes into the
    // diary page as {party}. Both are data-tree text and therefore travel as a
    // path - in the game chooseOption() builds it from the clicked option index.
    resetState();
    await ensure('party');
    state.isPartyMode = true; state.partyProgress = 12;
    const argsRef = { i: 'party_finale_rage', path: ['opts', 0, 'action', 'args'] };

    const orig = engine.generateDiaryEntry;
    let gesehen = null;
    engine.generateDiaryEntry = (grund, wert) => { gesehen = { grund, wert }; return 'Stub'; };
    engine.finishParty('LEGENDE', 'Die Tirade.', argsRef);
    engine.generateDiaryEntry = orig;

    assert.equal(gesehen.grund, 'PARTY');
    assert.deepEqual(gesehen.wert, { ref: { ...argsRef, path: ['opts', 0, 'action', 'args', 1] } },
                     'the prose does not go into the diary as a reference');
    assert.deepEqual(calls.end.party.subtitle, { ref: { ...argsRef, path: ['opts', 0, 'action', 'args', 0] } },
                     'the ending name does not go onto the screen as a reference');
    // And both really point at what they should - held against the tree, not
    // against "LEGENDE": the English run says LEGEND there.
    const finale = DB.party.find(ev => ev.id === 'party_finale_rage').opts[0].action.args;
    assert.equal(renderRecipe(calls.end.party.subtitle), finale[0]);
    assert.equal(renderRecipe(gesehen.wert), finale[1]);
    assert.ok(finale[1].length > 100, 'argument 1 is not the long prose');
});
await ok("The diary fills in the gala's ending from the tree", async () => {
    resetState();
    await ensure('diary');
    await ensure('party');
    const origDiary = DB.diary;
    DB.diary = { ending: [{ id: 't_gala', when: () => true, lines: ['Then came the gala. {party}'] }] };
    const wert = { ref: { i: 'party_finale_rage', path: ['opts', 0, 'action', 'args', 1] } };

    const entry = buildDiary(state, 'PARTY', wert);
    assert.deepEqual(entry.tokens.party, wert, 'the mark does not hold the reference');

    const expected = DB.party.find(ev => ev.id === 'party_finale_rage').opts[0].action.args[1];
    assert.equal(renderDiary(entry).paragraphs[0].text, `Then came the gala. ${expected}`);

    DB.diary = origDiary;
});
await ok('The path names the fragment the line came from', async () => {
    // The half of the path that breaks quietly: the draw is made from the
    // FITTING fragments, but the path has to point at the position in the whole
    // slot. Writing down the filtered index points at a different fragment as
    // soon as one before it does not fit - and that is the normal case, not the
    // edge. Both kinds of slot are checked: choice and collection.
    resetState();
    await ensure('diary');
    const origDiary = DB.diary;
    DB.diary = {
        mood: [{ id: 'm_nein', when: () => false, lines: ['FALSCH-A'] },
               { id: 'm_ja',   when: () => true,  lines: ['RICHTIG-A'] }],
        encounters: [{ id: 'e_nein', when: () => false, lines: ['FALSCH-B'] },
                     { id: 'e_ja',   when: () => true,  lines: ['RICHTIG-B'] }],
        encountersIntro: [{ id: 'i_nein', when: () => false, lines: ['FALSCH-C {list}'] },
                          { id: 'i_ja',   when: () => true,  lines: ['RICHTIG-C {list}'] }],
    };

    const seite = renderDiary(buildDiary(state, 'WIN'));
    const texte = seite.paragraphs.map(p => p.text);
    assert.deepEqual(texte, ['RICHTIG-A', 'RICHTIG-C RICHTIG-B'], JSON.stringify(texte));

    DB.diary = origDiary;
});
await ok('The same page, told in both languages', async () => {
    // The proof the whole rebuild exists for: recorded ONCE, told twice. All 217
    // lines of the stock differ between the trees (measured), so a paragraph that
    // came out the same would be one that did not follow the switch.
    resetState();
    await ensure('diary');
    engine.startWeek('normal');
    state.week.dayIndex = 3;
    state.tickets = 3; state.coffeeConsumed = 2; state.rageWarningReceived = true;
    const entry = buildDiary(state, 'WIN');

    const erzaehlen = async (lang) => {
        await useLanguage(lang);
        await loadCore(lang);
        await ensure('diary');
        return renderDiary(entry).paragraphs.map(p => p.text);
    };
    const de = await erzaehlen('de');
    const en = await erzaehlen('en');
    await useLanguage(LANG); await loadCore(LANG); await ensure('diary');   // back to LANG

    assert.ok(de.length >= 3, 'too few paragraphs for the probe');
    assert.equal(de.length, en.length, 'the page loses paragraphs on the switch');
    for (let i = 0; i < de.length; i++) {
        assert.ok(de[i].length && en[i].length, `paragraph ${i} comes out empty`);
        assert.notEqual(de[i], en[i], `paragraph ${i} does not follow the switch: ${de[i]}`);
        assert.ok(!/\{\w+\}/.test(en[i]), en[i]);
    }
});
await ok('Diary: a week run delivers paragraphs with no open placeholders', async () => {
    resetState();
    await ensure('diary');
    engine.startWeek('hard');
    state.week.dayIndex = 2;
    state.tickets = 4; state.rageWarningReceived = true;
    const seite = renderDiary(buildDiary(state, 'WIN'));
    assert.ok(seite.paragraphs.length >= 3);
    for (const p of seite.paragraphs) assert.ok(!/\{\w+\}/.test(p.text), p.text);
});
await ok('Sleep line: the level picks the register, from night 3 on the worn one', () => {
    resetState();
    engine.startWeek('hard');
    state.week.dayIndex = 1; state.time = 16 * 60 + 30; state.ticketWarning = true;
    engine.checkEndConditions();
    // The draw is recorded, not its result (6.1) - so what is checked is the path,
    // and that it points at the right list.
    const frisch = state.pendingEnd.night.sleep.ref.path;
    assert.deepEqual(frisch.slice(0, 3), ['week_sleep', 'hard', 'fresh']);
    assert.ok(DB.special.week_sleep.hard.fresh[frisch[3]], 'the path leads nowhere');

    state.pendingEnd = null;
    state.week.dayIndex = 4; state.morningMoodShown = true;
    engine.checkEndConditions();
    const abgenutzt = state.pendingEnd.night.sleep.ref.path;
    assert.deepEqual(abgenutzt.slice(0, 3), ['week_sleep', 'hard', 'worn']);
    assert.ok(DB.special.week_sleep.hard.worn[abgenutzt[3]], 'the path leads nowhere');
    // And it resolves in the running language instead of standing there as a path.
    assert.equal(renderRecipe(state.pendingEnd.night.sleep),
                 DB.special.week_sleep.hard.worn[abgenutzt[3]]);
    state.pendingEnd = null;
});
await ok('Achievements: all three can be graded, none is tied to one condition', () => {
    // a clean run, the queue empty -> all three
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
        'no achievement may be tied to one level');

    // Valve pulled and tickets left open -> only the base achievement
    resetState();
    engine.startWeek('normal');
    state.rageWarningReceived = true;
    state.tickets = 3;
    engine.recordWeekResult('survived', 5);
    assert.deepEqual(calls.achs, ['ach_week']);

    resetState();
    engine.startWeek('easy');
    engine.recordWeekResult('rage', 2);                         // a failure
    assert.deepEqual(calls.achs, []);
});
await ok('"Survived" counts only a Friday that was actually reached', () => {
    for (const [ausgang, tage] of [['rage', 3], ['fired', 4]]) {
        resetState();
        engine.startWeek('normal');
        engine.recordWeekResult(ausgang, tage);
        assert.equal(state.archive.stats.weeksSurvived ?? 0, 0, `${ausgang} counted as survived`);
        assert.equal(state.archive.stats.weeksSurvived_normal ?? 0, 0);
    }
    resetState();
    engine.startWeek('normal');
    engine.recordWeekResult('survived', 5);
    assert.equal(state.archive.stats.weeksSurvived, 1);
});
await ok('The three week achievements are in the stock for the archive', () => {
    for (const id of ['ach_week', 'ach_week_iron', 'ach_week_clean']) {
        assert.ok(DB.achievements.some(a => a.id === id), id);
    }
});

// ---------------------------------------------------- play-test findings
console.log('Play-test findings:');
await ok('On a night, the result button does not say GAME OVER', () => {
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
    // Searched for the ASSIGNMENT, not for the key: since the identity travels
    // instead of the word, the same key also stands in an `i18n-uses`
    // registration further up, and the search found the comment.
    const src = readFileSync(new URL('../src/engine/engine_events.js', import.meta.url), 'utf-8');
    const iNight = src.indexOf('this.state.pendingEnd.isNight');
    const iOver  = src.indexOf("btnKey = 'terminal.btn.gameOver'");
    assert.ok(iNight > 0 && iOver > 0 && iNight < iOver, 'the isNight branch is missing or comes too late');
});
await ok('The night delivers whole numbers (no 25.08 % in the header)', () => {
    // The case from play testing: rested, night 2 (wear 10 pp), rAl = 0.62
    // -> 66 - 40.92 = 25.08 used to sit raw in the header.
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 2;
    state.al = 66; state.cr = 38; state.fl = 55; state.tickets = 6;
    engine.advanceWeekNight();
    for (const [name, v] of [['al', state.al], ['cr', state.cr], ['fl', state.fl]]) {
        assert.equal(v, Math.round(v), `${name} is not a whole number: ${v}`);
    }
    assert.equal(state.al, 25);                                 // rounded from 25.08
});
await ok('The night screen and the state show exactly the same values', () => {
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

// --------------------------------------------- the working-week default
console.log('Defaults:');
await ok('defaultWeekDiff skips the condition picker', () => {
    resetState();
    state.defaultWeekDiff = 'hard';
    engine.startWeekSelect();
    assert.ok(!calls.overlays.includes('week-modal'), 'the picker should have been skipped');
    assert.equal(state.week.active, true);
    assert.equal(state.week.level, 'hard');
    assert.equal(state.tickets, 2);                             // the starting condition of in-need-of-leave
    state.defaultWeekDiff = 'ask';
});
await ok('"ask" and an unknown value still show the picker', () => {
    for (const wert of ['ask', 'kaputt']) {
        resetState();
        state.defaultWeekDiff = wert;
        engine.startWeekSelect();
        assert.ok(calls.overlays.includes('week-modal'), `the picker is missing for "${wert}"`);
        assert.equal(state.week.active, false);
    }
    state.defaultWeekDiff = 'ask';
});
await ok('The day slot is untouched by the week default', () => {
    resetState();
    state.time = 11 * 60; state.tickets = 3;
    engine.saveDay();
    state.defaultWeekDiff = 'easy';
    engine.startWeekSelect();
    assert.equal(state.week.level, 'easy');
    assert.ok(engine.loadDay(), 'the day save was destroyed');
    state.defaultWeekDiff = 'ask';
});

// ------------------------------------------------- how the archive counts
console.log('Archive counters:');
await ok('Week days do NOT count towards the day counters', () => {
    resetState();
    engine.startWeek('normal');
    engine.recordDayResult('survived');
    engine.recordDayResult('survived');
    assert.equal(state.archive.stats.daysSurvived ?? 0, 0, 'daysSurvived verunreinigt');
    assert.equal(state.archive.stats.survived_week_normal, 2, 'week days are missing from their own namespace');
    assert.equal(state.archive.stats.streak ?? 0, 0, 'the day streak stays untouched by week mode');

    engine.endWeek();
    engine.recordDayResult('survived');
    assert.equal(state.archive.stats.daysSurvived, 1);
    assert.equal(state.archive.stats.survived_normal, 1);
});
await ok('In week mode rage and dismissal do not land on the day counters', () => {
    resetState();
    engine.startWeek('hard');
    engine.recordDayResult('rage');
    engine.recordDayResult('fired');
    assert.equal(state.archive.stats.daysRageQuit ?? 0, 0);
    assert.equal(state.archive.stats.daysFired ?? 0, 0);
});
await ok('startWeek counts started weeks per level (the basis of the archive bars)', () => {
    resetState();
    engine.startWeek('easy');
    engine.endWeek();
    engine.startWeek('easy');
    assert.equal(state.archive.stats.weeksStarted, 2);
    assert.equal(state.archive.stats.weeksStarted_easy, 2);
    engine.recordWeekResult('survived', 5);
    assert.equal(state.archive.stats.weeksSurvived_easy, 1);   // a rate of 1 in 2
});
await ok('The end screen marks a week ending through the end object', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 5;
    state.time = 16 * 60 + 30;
    state.meetingDone = true;
    engine.checkEndConditions();
    engine.finishGame();
    assert.equal(calls.end.isWeek, true, 'isWeek is missing - the header showed the wrong counter');
    assert.equal(state.week.active, false);                     // endWeek ran before it
});

// ------------------------------------------------------- the Steam mapping
console.log('Steam presence:');
await ok('The presence travels as an identity, not as a sentence', async () => {
    // A finished sentence would come out of Steam through %statustext% verbatim
    // and show EVERY friend the player's language. An identity is resolved by
    // Steam in the language of whoever is looking - and no checker in here would
    // notice the difference, because both "work".
    const { PRESENCE_TOKEN } = await import('../src/engine/presence.js');
    const { platform } = await import('../src/platform.js');
    // core.updatePresence, not engine.updatePresence: the scaffolding above
    // replaces it with a stub, and that would only be checking itself.
    const { core } = await import('../src/engine/engine_core.js');

    const gesendet = [];
    const echt = platform.presence;
    platform.presence = (token) => gesendet.push(token);

    core.updatePresence('coffee');
    core.updatePresence('gibtesnicht');
    platform.presence = echt;

    assert.deepEqual(gesendet, [PRESENCE_TOKEN + 'coffee', PRESENCE_TOKEN + 'fallback']);
    for (const token of gesendet) {
        assert.ok(token.startsWith('#'), `not a Steam identity: ${token}`);
        assert.ok(!/\s/.test(token), `looks like a sentence: ${token}`);
    }
});

console.log('Steam statistics:');
await ok('No week day is reported as a day run', () => {
    const src = readFileSync(new URL('../src/platform_steam.js', import.meta.url), 'utf-8');
    const block = src.slice(src.indexOf('const STAT_NAMES'), src.indexOf('};', src.indexOf('const STAT_NAMES')));
    // daysStarted counts career days including week days, so it must no
    // longer feed the day statistic.
    assert.ok(!/\bdaysStarted\s*:/.test(block), 'daysStarted must not be reported');
    for (const key of ['started_easy', 'started_normal', 'started_hard',
                       'daysSurvived', 'daysRageQuit', 'daysFired',
                       'weeksStarted', 'weeksSurvived', 'weeksRageQuit', 'weeksFired']) {
        assert.ok(block.includes(key + ':'), `${key} is missing from STAT_NAMES`);
    }
});
await ok('A week run produces week counters only', () => {
    resetState();
    engine.startWeek('normal');                                  // weeksStarted(_normal)
    engine.recordDayResult('survived');
    engine.recordWeekResult('survived', 5);
    const st = state.archive.stats;
    for (const tagesKey of ['daysSurvived', 'daysRageQuit', 'daysFired',
                            'started_easy', 'started_normal', 'started_hard']) {
        assert.ok(!(st[tagesKey] > 0), `${tagesKey} was raised in week mode`);
    }
    assert.equal(st.weeksStarted, 1);
    assert.equal(st.weeksSurvived, 1);
});
await ok('The query in main.cjs fetches all eight names', () => {
    const src = readFileSync(new URL('../electron/main.cjs', import.meta.url), 'utf-8');
    for (const n of ['stat_started', 'stat_survived', 'stat_ragequit', 'stat_fired',
                     'stat_weeks_started', 'stat_weeks_survived', 'stat_weeks_ragequit', 'stat_weeks_fired']) {
        assert.ok(src.includes(`'${n}'`), `${n} is missing from the Steam query`);
    }
    assert.ok(src.includes('count=${names.length}'), 'count has to grow with it');
});

// ------------------------------------------------- the way back to the menu
console.log('Main menu:');
await ok('returnToMenu saves the running week before going back', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 3;
    state.tickets = 4; state.morningMoodShown = true; state.time = 11 * 60;

    engine.returnToMenu();
    assert.equal(calls.reloaded, true, 'returning has to rebuild the interface');

    const slot = engine.loadWeek();
    assert.ok(slot, 'the week run was not saved');
    assert.equal(slot.week.dayIndex, 3);
    assert.equal(slot.day.tickets, 4);
});
await ok('In day mode the state lands in the day slot', () => {
    resetState();
    state.time = 12 * 60 + 30; state.tickets = 2; state.morningMoodShown = true;
    engine.returnToMenu();
    const slot = engine.loadDay();
    assert.ok(slot, 'the day run was not saved');
    assert.equal(slot.tickets, 2);
    assert.equal(engine.loadWeek(), null);
});
await ok('An open event prevents saving - as it does for the resume dialog', () => {
    resetState();
    engine.startWeek('easy');
    state.activeEvent = true;
    engine.returnToMenu();
    assert.equal(engine.loadWeek(), null, 'nothing may be saved in the middle of an event');
});

// ------------------------------------------- jumps in time (play-test)
console.log('Long events:');
await ok('The lunch break has a window: 12:30 yes, 15:50 no longer', () => {
    resetState();
    state.time = 12 * 60 + 20;
    engine.resolveTerminal({ m: 10, r: 'x' }, 'coffee');
    assert.equal(state.lunchDone, true);
    assert.equal(calls.termResult?.action, 'triggerLunch', 'inside the window the break has to come');

    // A boss fight can cost four hours: 11:50 -> 15:50
    resetState();
    state.time = 11 * 60 + 50;
    engine.resolveTerminal({ m: 240, r: 'x' }, 'server');
    assert.equal(state.lunchDone, true, 'the break is over all the same');
    assert.notEqual(calls.termResult?.action, 'triggerLunch',
        'at 15:50 no lunch break may be offered any more');
});
await ok('The Friday finale is not overtaken by the clock', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 5;
    state.meetingDone = false;
    state.time = 16 * 60 + 40;                                  // already past clocking-off time
    state.ticketWarning = true;

    engine.checkEndConditions();
    assert.equal(state.pendingEnd, null, 'the week must not end without the meeting');

    state.meetingDone = true;
    engine.checkEndConditions();
    assert.deepEqual(state.pendingEnd?.title, { k: 'end.weekTitle' });
});
await ok('Mon-Thu is untouched by the meeting guard', () => {
    resetState();
    engine.startWeek('easy');
    state.week.dayIndex = 3;
    state.meetingDone = false;
    state.time = 16 * 60 + 40;
    state.ticketWarning = true;
    engine.checkEndConditions();
    assert.equal(state.pendingEnd?.isNight, true);
});

// --------------------------------------------- edge cases (acceptance)
console.log('Edge cases:');
await ok('The excuse cap holds for the morning mood as well', () => {
    resetState();
    engine.startWeek('hard');                                   // a cap of 3
    state.excusesLeft = 3;
    engine.triggerMorningMood('excuse_plus');
    assert.equal(state.excusesLeft, 3, 'the cap was bypassed');

    engine.startWeek('hard');
    state.excusesLeft = 1;
    engine.triggerMorningMood('excuse_plus');
    assert.equal(state.excusesLeft, 2, 'below the cap it has to take effect');

    resetState();                                               // day mode: no cap
    state.excusesLeft = 9;
    engine.triggerMorningMood('excuse_plus');
    assert.equal(state.excusesLeft, 10);
});
await ok('The gala ending marks the week as survived', () => {
    resetState();
    engine.startWeek('normal');
    state.week.dayIndex = 5;
    state.isPartyMode = true; state.partyProgress = 12;
    engine.finishParty('party_finale_standard');
    assert.equal(calls.end?.isWeek, true, 'the header showed the day counter');
    // The gala is the SECOND way a week can end. Without these two fields the day
    // report below it fell back on its defaults and read "MONTAG (Genervt)" - on
    // a Friday, at every level.
    assert.equal(calls.end?.weekMode, 'normal', 'the week level does not travel across the gala');
    assert.equal(calls.end?.weekDay, 5, 'the weekday does not travel across the gala');
    assert.equal(state.archive.stats.weeksSurvived, 1);

    resetState();                                               // day mode stays a day
    state.isPartyMode = true; state.partyProgress = 12;
    engine.finishParty('party_finale_standard');
    assert.ok(!calls.end?.isWeek);
});
await ok("Achievements carry the grade of the week's condition", () => {
    resetState();
    engine.startWeek('hard');
    state.tickets = 0;
    engine.recordWeekResult('survived', 5);
    assert.ok(calls.achStufen.length >= 3);
    assert.ok(calls.achStufen.every(t => t === 3), `Stufen: ${calls.achStufen}`);
});
await ok('Quotas survive a resume', () => {
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

await ok('The meeting does not repeat in consecutive weeks', async () => {
    resetState();
    await ensure('meetings');
    state.archive.seenMeetings = [];
    const folge = [];
    for (let w = 0; w < 6; w++) {
        Object.assign(state, freshDay(1.0));            // a new week, fresh usedIDs
        engine.startWeek('normal');
        state.week.dayIndex = 5;
        state.meetingDone = false;
        engine.triggerMeeting();
        await new Promise(r => setTimeout(r, 10));
        folge.push(calls.terminal[0].id);
        engine.endWeek();
    }
    for (let i = 1; i < folge.length; i++) {
        assert.notEqual(folge[i], folge[i - 1], `week ${i + 1} repeats the finale`);
    }
    // The memory must never empty the pool completely
    assert.ok(state.archive.seenMeetings.length < DB.meetings.length);
});

await ok('The streak is kept apart by mode', () => {
    resetState();
    engine.startWeek('normal');
    engine.recordDayResult('survived');
    engine.recordDayResult('survived');
    assert.equal(state.archive.stats.streak ?? 0, 0, 'week days do not count towards the day streak');

    engine.recordWeekResult('survived', 5);
    engine.recordWeekResult('survived', 5);
    assert.equal(state.archive.stats.weekStreak, 2);
    assert.equal(state.archive.stats.weekStreakBest, 2);

    engine.recordWeekResult('rage', 3);                         // a failure breaks the streak
    assert.equal(state.archive.stats.weekStreak, 0);
    assert.equal(state.archive.stats.weekStreakBest, 2, 'the record stands');

    engine.endWeek();                                           // day mode carries on counting on its own
    engine.recordDayResult('survived');
    assert.equal(state.archive.stats.streak, 1);
    assert.equal(state.archive.stats.weekStreak, 0);
});
await ok('The backpack cap holds, tools are deliberately exempt', async () => {
    resetState();
    engine.startWeek('easy');
    await ensure('items');
    const ids = Object.keys(DB.items);
    const verbrauch = ids.filter(i => !DB.items[i].quest && !DB.items[i].keep);   // nine of them
    const werkzeug  = ids.filter(i => DB.items[i].keep && !DB.items[i].quest);

    // Consumables first, then tools until the cap is exceeded
    for (const id of verbrauch) engine.grantItem(id);
    for (const id of werkzeug.slice(0, 4)) engine.grantItem(id);
    const zaehlbar = state.inventory.filter(i => !DB.items[i.id]?.quest).length;
    assert.ok(zaehlbar > 10, `tools have to be allowed past the cap (${zaehlbar})`);

    // One more consumable is turned away now
    const vorher = state.inventory.length;
    state.inventory = state.inventory.filter(i => i.id !== verbrauch[0]);
    engine.grantItem(verbrauch[0]);
    assert.ok(!state.inventory.some(i => i.id === verbrauch[0]),
        'with a full backpack no consumable may be added');

    // The night carries the state over unchanged
    const stand = state.inventory.length;
    engine.advanceWeekNight();
    assert.equal(state.inventory.length, stand);
});

await ok('The tutorial does not run on into week mode', () => {
    resetState();
    store.delete('sysadmin_tutorial_done');          // a first-time player
    let tutorialGestartet = false;
    globalThis.tutorial = { isActive: false, start() { tutorialGestartet = true; } };

    engine.setWeekDifficulty('normal');
    assert.equal(tutorialGestartet, false, 'the week must not start the tutorial');
    assert.equal(state.week.active, true);
    assert.equal(state.tickets, 1, 'the starting condition itself stays untouched');

    delete globalThis.tutorial;
});

await ok('An import clears the week slot as well', () => {
    // Source-level check: performImport lives in engine_ui and needs the DOM,
    // but the order can be pinned down here. Without clearWeek() a foreign
    // archive would meet a running week.
    const src = readFileSync(new URL('../src/engine/engine_ui.js', import.meta.url), 'utf-8');
    const i = src.indexOf('performImport');
    const block = src.slice(i, i + 4000);
    assert.ok(block.includes('engine.clearDay()'), 'clearDay is missing');
    assert.ok(block.includes('engine.clearWeek()'), 'clearWeek is missing - the week survives the import');
});

// ------------------------------------------------------- side theatres
console.log('Chronicle, intranet, noticeboard:');
await ok('The career view sees week-only players too', () => {
    resetState();
    state.archive.stats = {
        weeksStarted: 3, weeksSurvived: 2, weeksRageQuit: 1, weeksFired: 0,
        survived_week_normal: 11, weekStreak: 2, weekStreakBest: 2,
        weekVentSaves: 2, weekWarningsChef: 1, daysStarted: 15,
    };
    const k = engine.careerStats();
    assert.equal(k.survived, 11, 'survived week days are missing');
    assert.equal(k.rage, 1);
    assert.equal(k.streakBest, 10, 'two weeks are ten days');
    assert.equal(k.ventSaves, 2, 'the week valves are missing from the personnel file');
    assert.equal(k.warningsChef, 1, 'the week warnings are missing from the personnel file');

    // And in day mode it stays unchanged
    resetState();
    state.archive.stats = { daysSurvived: 7, daysRageQuit: 2, streakBest: 4 };
    const t = engine.careerStats();
    assert.equal(t.survived, 7);
    assert.equal(t.rage, 2);
    assert.equal(t.streakBest, 4);
});
await ok('The company chronicle stays tellable for week players', () => {
    resetState();
    state.archive.stats = { survived_week_normal: 11, weeksRageQuit: 1, daysStarted: 15 };
    // Since 6.0 the composer returns an id and the numbers, not a sentence -
    // the words live in data_lore.js. What matters here is unchanged: a week
    // player must not fall through to an empty chronicle.
    const picked = engine.composeChronicleLine();
    assert.ok(picked && picked.id, 'the chronicle falls back on no line for week players');
    assert.ok(DB.lore.lines[picked.id], `unknown chronicle id: ${picked.id}`);
});

await ok('A chronicle line gets its figures filled in', () => {
    resetState();
    state.archive.chronicle = [
        { day: 3, id: 'rage_many_a', vars: { rage: 4 } },
        { day: 2, text: 'An entry from 5.0, with no id' }
    ];
    const entries = engine.chronicleEntries();
    assert.equal(entries.length, 1, 'the entry with no id is not discarded');
    assert.ok(entries[0].text.includes('4'), 'the figure was not filled in');
    assert.ok(!entries[0].text.includes('{rage}'), 'the placeholder is still there');
});
await ok('The noticeboard caps reactive notes so it changes over the week', () => {
    const src = readFileSync(new URL('../src/engine/engine_ui.js', import.meta.url), 'utf-8');
    const i = src.indexOf('openBoard');
    const block = src.slice(i, i + 1400);
    assert.ok(/reqStory && flags\[n\.reqStory\]\)[\s\S]{0,120}sort\(/.test(block),
        'the reactive notes are not shuffled');
    assert.ok(block.includes('.slice(0, 4)'), 'no cap on the reactive notes');
});

await ok('Discarding makes room and hits only that one item', async () => {
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
    assert.ok(!state.inventory.some(i => i.id === werkzeug), 'the tool is still in the backpack');
    assert.ok(state.inventory.some(i => i.id === verbrauch[0]), 'some other item was removed');

    // Trophies are never offered for discarding in the first place
    if (trophaee) {
        engine.askDiscardItem(trophaee);
        assert.notEqual(state.pendingItemMode, 'discard', 'trophies must not be discardable');
    }
});
await ok('After discarding, one consumable fits again', async () => {
    resetState();
    engine.startWeek('easy');
    await ensure('items');
    const ids = Object.keys(DB.items);
    const verbrauch = ids.filter(i => !DB.items[i].quest && !DB.items[i].keep);
    const werkzeuge = ids.filter(i => DB.items[i].keep && !DB.items[i].quest);

    // Fill the backpack past the cap using tools
    for (const id of werkzeuge.slice(0, 10)) engine.grantItem(id);
    engine.grantItem(verbrauch[0]);
    assert.ok(!state.inventory.some(i => i.id === verbrauch[0]), 'precondition: the backpack is full');

    engine.state.pendingItem = werkzeuge[0];
    engine.confirmDiscardItem();
    engine.grantItem(verbrauch[0]);
    assert.ok(state.inventory.some(i => i.id === verbrauch[0]),
        'after discarding there has to be room again');
});

// ----------------------------------------------------- cloud synchronisation
console.log('Cloud:');
await ok('The payload carries day, week and a timestamp', () => {
    resetState();
    store.set('layer8_day', '{"savedAt":1}');
    store.set('layer8_week', '{"savedAt":2}');
    const p = engine.buildCloudPayload();
    assert.ok(p.archive, 'the archive is missing');
    assert.equal(p.day, '{"savedAt":1}');
    assert.equal(p.week, '{"savedAt":2}');
    assert.ok(p.runSyncedAt > 0, 'runSyncedAt is missing');
});
await ok('The newer run wins, the older overwrites nothing', () => {
    resetState();
    engine.adoptCloudRun('layer8_week', '{"week":{"dayIndex":3},"savedAt":1000}', 2000);
    assert.equal(JSON.parse(store.get('layer8_week')).week.dayIndex, 3, 'not carried over');

    engine.adoptCloudRun('layer8_week', '{"week":{"dayIndex":4},"savedAt":5000}', 6000);
    assert.equal(JSON.parse(store.get('layer8_week')).week.dayIndex, 4, 'neuerer Stand ignoriert');

    engine.adoptCloudRun('layer8_week', '{"week":{"dayIndex":1},"savedAt":10}', 20);
    assert.equal(JSON.parse(store.get('layer8_week')).week.dayIndex, 4, 'the older state won');
});
await ok('Finished elsewhere clears up, an old payload does not', () => {
    resetState();
    store.set('layer8_week', '{"savedAt":1000}');
    engine.adoptCloudRun('layer8_week', null, 5000);            // finished afterwards
    assert.equal(store.get('layer8_week'), undefined, 'a remainder was left behind');

    store.set('layer8_week', '{"savedAt":9000}');
    engine.adoptCloudRun('layer8_week', null, 3000);            // the older payload
    assert.ok(store.get('layer8_week'), 'the running week was deleted');
});
await ok('A broken payload is discarded, not thrown', () => {
    resetState();
    store.set('layer8_week', 'not json');
    engine.adoptCloudRun('layer8_week', '{ kaputt', 5000);
    engine.adoptCloudRun('layer8_day', undefined, undefined);
});
await ok('The night writes at once, not after the throttle', () => {
    resetState();
    let schreibt = 0;
    const orig = engine.buildCloudPayload.bind(engine);
    engine.buildCloudPayload = () => { schreibt++; return orig(); };

    engine._lastRunSync = Date.now();                           // the throttle is active
    engine.syncRun();
    assert.equal(schreibt, 0, 'throttled it has to stay silent');

    engine.startWeek('easy');
    state.morningMoodShown = true;
    state.modal = { open: true, isNight: true, nextDay: dayNameValue(1) };
    engine.continueWeekNight();
    assert.ok(schreibt >= 1, 'the night has to bypass the throttle');

    engine.buildCloudPayload = orig;
});

// ----------------------------------------------------------- The gala
console.log('The gala:');
await ok('The clock carries the evening from 17:00 to 23:00', async () => {
    resetState();
    await ensure('party');
    state.pendingEnd = { isParty: true, partyKey: 'k', diffStr: 'normal' };
    engine.startParty();
    await new Promise(r => setTimeout(r, 20));
    assert.equal(state.time, 17 * 60, 'the gala starts at 17:00');

    const stand = [];
    for (let i = 0; i < 12; i++) {
        state.partyProgress = i;
        engine.reset();
        stand.push(state.time);
    }
    assert.equal(stand[0], 17 * 60);
    assert.equal(stand[6], 20 * 60, 'after six stations it is 20:00');
    assert.ok(stand.every((t, i) => i === 0 || t > stand[i - 1]), 'the clock has to run forwards');

    state.partyProgress = 12;
    engine.reset();
    assert.equal(state.time, 23 * 60, 'the finale sits at 23:00');
});
await ok('The foyer changes as the evening goes on', async () => {
    resetState();
    await ensure('party');
    state.isPartyMode = true;
    const gesehen = new Set();
    for (const p of [0, 5, 11]) {
        state.partyProgress = p;
        engine.reset();
        gesehen.add(calls.terminal[0].text);
    }
    assert.equal(gesehen.size, 3, 'three stages have to show three versions');
});
await ok('Coming out of a week, the gala opens with a line of its own', async () => {
    resetState();
    await ensure('party');
    engine.startWeek('normal');
    state.pendingEnd = { isParty: true, partyKey: 'k', diffStr: 'normal' };
    engine.startParty();
    await new Promise(r => setTimeout(r, 20));
    const ausDerWoche = calls.terminal[0].text;

    resetState();                                               // day mode: unchanged
    state.pendingEnd = { isParty: true, partyKey: 'k', diffStr: 'normal' };
    engine.startParty();
    await new Promise(r => setTimeout(r, 20));
    // The two versions are compared, not a German turn of phrase: the difference
    // is what says the week gets a line of its own.
    assert.notEqual(ausDerWoche, calls.terminal[0].text, 'the week gets no line of its own');
});

// ------------------------------------------------------ the changeover
console.log('The night and the changeover:');
await ok('The lead-in picks up how the day went', async () => {
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
    // Six keys, not six German phrases. The patterns stood here up to 6.1 and
    // only held because the English run carried on in German from line 721 on;
    // the lead is a recipe now and names its identity.
    assert.equal(lead(9, 20, 20, 20).k, 'week.night.tickets');
    assert.equal(lead(0, 20, 20, 20).k, 'week.night.clean');
    assert.equal(lead(2, 100, 20, 20).k, 'week.night.aggro');
    assert.equal(lead(2, 20, 100, 20).k, 'week.night.radar');
    assert.equal(lead(2, 20, 20, 80).k, 'week.night.lazy');
    assert.equal(lead(2, 25, 25, 30).k, 'week.night.plain');
    // And the sentence inside the sentence: the countdown sits in it as a recipe.
    assert.deepEqual(lead(2, 25, 25, 30).v.rest, { k: 'week.night.remaining', v: { days: 3 } });
});
await ok('The ticket threshold is reachable', () => {
    // Ten tickets end the day, and a quarter of nine is three.
    const hoechstwert = Math.ceil(9 * 0.25);
    const src = readFileSync(new URL('../src/engine/engine_week.js', import.meta.url), 'utf-8');
    const m = src.match(/report\.ticketsAfter >= (\d+)/);
    assert.ok(m, 'threshold not found');
    assert.ok(Number(m[1]) <= hoechstwert,
        `threshold ${m[1]} is above the maximum ${hoechstwert} - a dead branch`);
});
await ok('Two nights in a row never show the same sleep line', async () => {
    resetState();
    await ensure('special');
    engine.startWeek('normal');
    const gesehen = [];
    for (let d = 1; d <= 4; d++) {
        state.week.dayIndex = d;
        state.tickets = 2; state.al = 25; state.cr = 25; state.fl = 30;
        state.time = 16 * 60 + 30; state.ticketWarning = true; state.pendingEnd = null;
        engine.queueNightEnd();
        gesehen.push(JSON.stringify(state.pendingEnd.night.sleep));
    }
    for (let i = 1; i < gesehen.length; i++) {
        assert.notEqual(gesehen[i], gesehen[i - 1], `night ${i + 1} repeats the previous line`);
    }
});
await ok('Every morning gets a line of its own', () => {
    resetState();
    engine.startWeek('easy');
    const zeilen = new Set();
    for (let d = 2; d <= 5; d++) {
        state.week.dayIndex = d - 1;
        state.morningMoodShown = true;
        calls.logs = [];
        state.modal = { open: true, isNight: true };
        engine.continueWeekNight();
        // Compared by IDENTITY, not by the German word: the morning line is a
        // recipe now, and its key is what makes one morning a different morning.
        const morgen = calls.logs.find(l => typeof l?.k === 'string' && l.k.startsWith('week.morning.'));
        zeilen.add(JSON.stringify(morgen));
    }
    assert.equal(zeilen.size, 4, 'the four mornings have to differ');
});

await ok('The suite is still running in its own language at the end', () => {
    // The trap two thirds of this suite were lying in: "The knowledge follows the
    // language" switched over to compare and switched back to a hard-coded 'de'.
    // From there the --lang=en run carried on in German, silently and green.
    // Whoever switches to compare in future switches back to LANG - this line
    // notices at once.
    assert.equal(language(), LANG, 'a test switched the language and did not switch back');
    // Both halves: the rune for the interface and the loaded data tree.
    assert.equal(currentLanguage(), LANG, 'the data tree is in the other language');
});

console.log(`\n${passed} checks passed.`);
