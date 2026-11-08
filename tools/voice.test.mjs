// The narration (6.4): how a sentence on screen finds the file that speaks it.
//
// Worth its own suite because every link in that chain fails silently. A
// checksum computed one way in Node and another way in the browser does not
// throw - the narrator simply never says anything, in the shipped game only.
// A window that forgets to hush reads a result out over the noticeboard. And a
// `CMD:` instruction collected as prose is a file that was paid for and says
// "C M D colon OPEN underscore BOARD" out loud.
//
// Run: node --conditions browser --import ./tools/register.mjs tools/voice.test.mjs [--lang=en]
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const flag = (n, d) => { const h = args.find(a => a.startsWith(`--${n}=`)); return h ? h.slice(n.length + 3) : d; };
const LANG = flag('lang', 'de');

const { sha1Hex, voiceHash } = await import('../src/engine/sha1.js');
const { collectEntries, TERMINAL, MAIL_POOL, SPOKEN_KEYS, fileFor, spokenForm, oneCallPerText } = await import('./voice-text.mjs');

let passed = 0;
const ok = async (name, fn) => {
    try {
        await fn();
        console.log('  ✓ ' + name);
        passed++;
    } catch (err) {
        console.log('  ✗ ' + name);
        throw err;
    }
};

console.log(`\nNarration (${LANG})`);

const { entries } = await collectEntries(LANG);
const src = (f) => readFileSync(`${ROOT}src/${f}`, 'utf8');

// The same file with its comments taken out. Needed for one question only -
// whether a key is really PASSED somewhere - and the probe is what found it:
// every voiced key also stands in an `i18n-uses:` line a few rows above its
// call site, so searching the raw source answers yes for a key whose call has
// been deleted. A declaration that a key is used is not a use of it.
const code = (f) => src(f).replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

// The same for a component, which has HTML comments on top of the other two.
// Needed for the same reason and found the same way: the header's own comment
// says it deliberately does NOT ask `narrationEnabled`, and a search of the
// raw file reads that as asking it.
const markup = (f) => readFileSync(`${ROOT}src/${f}`, 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

// --- 1. The two implementations of the file name ----------------------------
//
// The whole scheme rests on this: Node names the file, the browser asks for it.
// Checked over every piece rather than over a handful of vectors, because the
// inputs are what they are - umlauts, quotation marks, 1,800-character scenes,
// and the block boundary that only a particular length walks into.
await ok(`sha1 agrees with node:crypto over all ${entries.length} pieces`, () => {
    const wrong = [];
    for (const e of entries) {
        const theirs = createHash('sha1').update(e.src, 'utf8').digest('hex');
        if (sha1Hex(e.src) !== theirs) wrong.push(e.key);
    }
    assert.deepEqual(wrong.slice(0, 5), [], 'the browser digest differs from the platform one');
});

await ok('the manifest files a piece under the hash the browser computes', () => {
    const manifest = JSON.parse(readFileSync(`${ROOT}voice/manifest.${LANG}.json`, 'utf8'));
    const by = new Map(manifest.entries.map(e => [e.key, e.sha]));
    const wrong = [];
    for (const e of entries) {
        if (by.get(e.key) !== voiceHash(e.src)) wrong.push(e.key);
        if (fileFor(e) !== voiceHash(e.src)) wrong.push(`${e.key} (fileFor)`);
    }
    assert.equal(by.size, entries.length, 'the manifest and the tree hold different pieces');
    assert.deepEqual(wrong.slice(0, 5), [], 'a file name the browser could not ask for');
});

// --- 2. A door is not a sentence --------------------------------------------
//
// Self-adjusting on purpose: it reads the doors out of the engine the way
// lint-data does, so a fourth one is covered the day it is handled.
await ok('no CMD: instruction is collected as prose', () => {
    const handled = [...src('engine/engine_events.js').matchAll(/res === "(CMD:[A-Z_]+)"/g)].map(m => m[1]);
    assert.ok(handled.length >= 3, `expected the handled doors, found ${handled.length}`);
    const spoken = entries.filter(e => /^CMD:/.test(e.src.trim()));
    assert.deepEqual(spoken.map(e => e.key), [], 'an instruction would be read out loud');
});

// --- 3. The windows that have to hush the voice -----------------------------
//
// Held against the SAME list windowOverTerminal() filters on, in both
// directions: narrate() refuses to start behind a window, and a window opening
// has to stop one already running. The id-driven ones go through showOverlay,
// which is one call for all of them. The three that open on a state flag are
// invisible to that call and are named here by hand - the same corner CLAUDE.md
// marks for the Escape list.
await ok('a window over the terminal silences the narrator', () => {
    const ui = src('engine/engine_ui.js');

    // The one call that covers every id on the list.
    assert.match(ui, /if \(!wasOpen && WINDOWS_OVER_TERMINAL\.includes\(el\.id\)\) this\.hushNarration\(\);/,
        'showOverlay does not hush the narrator');

    // The state-flag windows, each beside the line that opens it.
    const flags = ui.match(/if \(s\.(\w+) \|\| s\.(\w+) \|\| s\.(\w+)\) return true;/);
    assert.ok(flags, 'windowOverTerminal() no longer reads three state flags - update this test');
    const all = src('engine/engine_ui.js') + src('engine/engine_vending.js');
    for (const f of flags.slice(1)) {
        assert.match(all, new RegExp(`hushNarration\\(\\);\\s*\\n\\s*this\\.state\\.${f} = true;`),
            `${f} opens a window without hushing the narrator`);
    }

    // And narrate() refuses to start behind one.
    assert.match(src('engine/engine_voice.js'), /if \(this\.windowOverTerminal\(\)/,
        'narrate() does not ask whether a window stands over the terminal');
});

// --- 4. What the terminal hands the narrator --------------------------------
await ok('every terminal screen decides what it speaks', () => {
    const ui = src('engine/engine_ui.js');
    assert.match(ui, /this\.narrate\(extra\?\.speak \?\? null, extra\?\.kind \?\? \(extra\?\.mode === 'morning' \? 'morning' : 'events'\)\);/,
        '_setTerminal no longer drives the narrator, or no longer says which kind of text it hands over');
    // An emergency is its own kind: its clock waits while it is read
    // (engine_events.triggerBossFight), and a player can switch it off.
    assert.match(ui, /kind: type === 'boss' \? 'emergencies' : 'events'/, 'an emergency is read as an ordinary scene again');
    // An event speaks its own text; a result is handed the sentence separately,
    // because what it stores is a recipe.
    assert.match(ui, /mode: 'event',[\s\S]{0,400}?speak: text/, 'an event does not hand over its text');
    assert.match(ui, /mode: 'result',[\s\S]{0,200}?speak\n/, 'a result does not hand over its sentence');
    // The morning mood is collected (TERMINAL holds `moods`), so it has to be
    // handed over too - or 118 recordings a language are bought and never
    // played, at 0 errors and 0 warnings.
    assert.ok(TERMINAL.includes('moods'), 'the morning moods are no longer collected');
    assert.match(ui, /mode: 'morning',[\s\S]{0,120}?speak: text/, 'the morning does not hand over its text');
});

// --- 5. Nothing is voiced that the terminal never shows ---------------------
//
// The letters, the phone, the intranet, the board and the books are read at
// the player's own pace and are deliberately not recorded. A pool wandering
// into the voiced list would be 15 hours of speech growing by however much it
// holds, bought before anyone noticed. The one exception is named: what came
// of an answered mail (7.1), its outcome and nothing else of it.
await ok('only the terminal pools, the mail outcomes and the named keys are collected', () => {
    const dupes = TERMINAL.filter((p, i) => TERMINAL.indexOf(p) !== i);
    assert.deepEqual(dupes, [], 'a pool is listed twice and would be collected twice');
    assert.ok(!TERMINAL.includes(MAIL_POOL), 'the mail pool is walked like a terminal pool - its letters would be bought');
    // `i18n` is the one prefix that is not a pool: the named interface strings
    // of section 6, each one listed by hand.
    const allowed = [...TERMINAL, MAIL_POOL, 'i18n'];
    const stray = [...new Set(entries.map(e => e.key.split('/')[0]))].filter(p => !allowed.includes(p));
    assert.deepEqual(stray, [], 'a piece was collected from a pool the terminal never shows');

    // Of a mail, the outcome alone: the sender, the subject and the body are
    // a character writing, emoji and all.
    const mails = entries.filter(e => e.key.startsWith(`${MAIL_POOL}/`));
    const odd = mails.filter(e => !/^emails\/[^/]+\/opts\/\d+\/r$/.test(e.key)).map(e => e.key);
    assert.deepEqual(odd, [], 'something other than an outcome was collected from a mail');
    assert.ok(mails.length > 0, 'no mail outcome is collected - the window would read nothing');
});

// --- 5b. One text, one call ---------------------------------------------------
//
// The file is named after the text, but the run worked through keys and sent
// the mail pool's delete line 128 times a language for one file.
await ok('the generation run pays once for a text that stands under several keys', () => {
    const mails = entries.filter(e => e.key.startsWith(`${MAIL_POOL}/`));
    const { calls, twins } = oneCallPerText(mails);
    assert.equal(calls.length, new Set(mails.map(e => e.sha)).size, 'a text is still sent more than once');
    assert.equal(calls.length + twins.length, mails.length, 'a piece was dropped instead of booked');
    for (const [twin, lead] of twins) assert.equal(twin.src, lead.src, 'a twin was booked under a different text');
    // Twins agree on what is SENT too: a respelling that reaches one key and
    // not another is two recordings, not one.
    const a = { key: 'a', sha: 'x', spk: 'p' }, b = { key: 'b', sha: 'x', spk: 'q' };
    assert.equal(oneCallPerText([a, b]).calls.length, 2, 'two spoken forms were booked as one recording');

    const run = readFileSync(`${ROOT}tools/make-audio.mjs`, 'utf8');
    assert.match(run, /const \{ calls, twins \} = oneCallPerText\(todo\);/, 'the generation run sends every key again');
    assert.match(run, /catch \(err\) \{\s*bookTwins\(\);\s*saveLedger\(\);/,
        'an aborted run forgets the twins of what it finished');
    assert.match(run, /const booked = bookTwins\(\);\s*saveLedger\(\);/, 'a finished run never books its twins');
});

// --- 6. The named interface strings -----------------------------------------
//
// The dictionary is NOT collected wholesale - see voice-text.mjs. Sixteen keys
// are named by hand, which buys a list that can go out of step in both
// directions: a key renamed in the dictionary, or a key recorded and then never
// spoken by anything. Both are silent faults - a recording nobody plays, or a
// window that was meant to talk and does not.
await ok(`the ${SPOKEN_KEYS.length} named interface keys are recorded and reachable`, () => {
    const dupes = SPOKEN_KEYS.filter((k, i) => SPOKEN_KEYS.indexOf(k) !== i);
    assert.deepEqual(dupes, [], 'a key is listed twice');

    // Collected, every one of them. A key missing from the dictionary already
    // throws in collectEntries; this is the other half - that what it
    // collected is what the list asks for.
    const got = entries.filter(e => e.key.startsWith('i18n/')).map(e => e.key.slice(5));
    assert.deepEqual(got.sort(), [...SPOKEN_KEYS].sort(), 'the collected keys are not the listed ones');

    // And each one still stands in the source. This is the weaker half and
    // worth saying so: it proves the key has not been RENAMED out from under
    // the list, not that anything speaks it - the probe was clear about that,
    // because `tutorial.ask.text` is also the mark dressAskModal() writes and
    // the step keys are what the bubble DISPLAYS. The wiring is the check
    // below. Comments do not count: every voiced key also stands in an
    // `i18n-uses:` line, so the raw source answers yes for a dead call.
    const live = code('engine/engine_voice.js') + code('engine/engine_events.js')
               + code('tutorial.js') + code('engine/engine_ui.js');
    const orphans = SPOKEN_KEYS.filter(k => !live.includes(`'${k}'`));
    assert.deepEqual(orphans, [], 'recorded under a name the code no longer uses');

    // The other direction: a window that speaks a fixed key the list does not
    // name speaks a sentence nobody recorded. Rewriting the manifest does not
    // notice - it collects what the list says - so the window is silent at
    // 0 errors and 0 warnings. Literal keys only; the tutorial's computed
    // ones are held by the wiring check below.
    const unrecorded = [...live.matchAll(/narrateWindow\(t\('([^']+)'\)/g)].map(m => m[1])
        .filter(k => !SPOKEN_KEYS.includes(k));
    assert.deepEqual(unrecorded, [], 'a window speaks a key that is never recorded');
});

// The wiring, one assertion per voice. Five call sites carry all sixteen keys,
// and each of them is a place where deleting one line costs a recording its
// only way to be heard - at 0 errors and 0 warnings, because a window that
// stays quiet looks exactly like a window with nothing recorded.
await ok('H.A.L.G.E.R.D. and the lesson have a voice', () => {
    assert.match(code('engine/engine_voice.js'),
        /previewNarration: function[\s\S]{0,200}?narrateWindow\(t\('set\.narration\.sample'\), 'sample'\)/,
        'the settings sample is not spoken');
    assert.match(code('engine/engine_voice.js'),
        /previewNarrationRate: function[\s\S]{0,200}?narrateWindow\(t\('set\.narration\.rateSample'\), 'sample'\)/,
        'the speed sample is not spoken');
    // And each slider plays its own: the speed slider used to play the level's
    // sentence, which says how LOUD.
    assert.match(markup('components/SettingsView.svelte'), /setNarrationRate\(e\.currentTarget\.value\)\}\s*onchange=\{\(\) => engine\.previewNarrationRate\(\)\}/,
        'the speed slider does not play the speed sample');
    assert.match(code('engine/engine_events.js'),
        /firstTimeHint: function[\s\S]{0,900}?this\.narrateWindow\(t\(textKey\)\)/,
        'the two first-time warnings are not spoken');

    const tut = code('tutorial.js');
    assert.match(tut, /narrateWindow\(t\('tutorial\.ask\.text'\)\)/, 'the opening question is not spoken');
    assert.match(tut, /narrateWindow\(t\('tutorial\.done\.text'\)\)/, 'the closing screen is not spoken');
    // The nine bubbles, and only on a change of step: applyStepLogic() runs
    // again whenever one of the tutorial's own windows closes.
    assert.match(tut, /isNewStep[\s\S]{0,600}?if \(isNewStep\) engine\.narrateWindow\(t\(descKey\)\)/,
        'a step bubble either never speaks or speaks again on every window close');
});

// The guard that keeps the list honest in the other direction: a sentence with
// a hole in it cannot be recorded, because the hole is filled at runtime and
// the hash would never match. A placeholder has to be refused rather than
// bought.
await ok('a placeholder cannot be recorded', () => {
    const holes = entries.filter(e => e.key.startsWith('i18n/') && e.src.includes('{'));
    assert.deepEqual(holes.map(e => e.key), [], 'a sentence with a runtime value was collected');
});

// --- 7. Said, not spelled ---------------------------------------------------
//
// Three pieces per language go through the shared rules, all three of them
// H.A.L.G.E.R.D. A provider reading those dots gets a hardware list, and the
// mistake is only audible - the file is there, the hash matches, the checker is
// green.
await ok('the dotted name is sent as a word', () => {
    const dotted = entries.filter(e => /H\.A\.L\.G\.E\.R\.D\./.test(e.src));
    assert.ok(dotted.length >= 3, `expected the three H.A.L.G.E.R.D. pieces, found ${dotted.length}`);
    for (const e of dotted) {
        assert.ok(!/H\.A\.L/.test(spokenForm(e.src, LANG)), `${e.key} would be spelled out`);
        assert.match(spokenForm(e.src, LANG), /Halgerd/, `${e.key} lost the name altogether`);
    }
    // The screen keeps the dots: the rule belongs to what is SENT, and the
    // hash is taken over what is SHOWN.
    for (const e of dotted) assert.match(e.src, /H\.A\.L\.G\.E\.R\.D\./);
});

// A respelling with a language on it, held in both directions - because both
// directions are silent. Moved to the shared list it would respell the English
// tree, where the word is already read correctly; dropped from the German one
// the pronunciation simply comes back, and only an ear would know.
await ok(`a respelling reaches the ${LANG} tree and only where it belongs`, () => {
    // Case-insensitive on purpose, and only here. The RULE is capital-only,
    // because German capitalises its nouns and the word-form survey found no
    // lowercase one in that tree - a machine line quoting "rack not found"
    // would be the exception, and this is where it would turn up: in German
    // nothing may survive the rules in ANY spelling, so a lowercase arrival
    // fails here and names itself instead of going quietly to the provider.
    const written = entries.filter(e => /\bracks?\b/i.test(e.src));
    // Over a hundred pieces in each tree carry it. The floor is low enough that
    // ordinary editing does not move it and high enough to catch a set that has
    // collapsed to nothing, which is what a broken rule looks like from here.
    assert.ok(written.length > 20, `expected the Rack pieces, found ${written.length}`);
    for (const e of written) {
        if (LANG === 'de') {
            assert.ok(!/\bracks?\b/i.test(e.spoken), `${e.key} is still sent as a German word`);
            assert.match(e.spoken, /\bRäcks?\b/, `${e.key} lost the word altogether`);
        } else {
            assert.match(e.spoken, /\bracks?\b/i, `${e.key} was respelled in a language that reads it`);
            assert.ok(!/Räck/.test(e.spoken), `${e.key} carries a German respelling`);
        }
        // The screen is untouched either way.
        assert.ok(!/Räck/.test(e.src), `${e.key} has the respelling in its PROSE`);
    }
});

// The two words heard wrong in 7.0. Each held from the tree AND from a few
// written sentences, because the tree alone cannot show the half that matters
// most here: the German words that must NOT be touched. "Boot" is a boat
// before it is a verb, and an office satire will one day put everybody in the
// same one.
await ok(`"booten" is sent as the English verb in German and left alone elsewhere`, () => {
    // Every boot word the German rule leaves alone, by name. A new form - a
    // "gebootet", a "Reboot" in a scene - is not respelled by guesswork: it
    // fails here and somebody decides which kind of word it is.
    const GERMAN_BOOT = ['U-Boot'];
    const words = (text) => text.match(/[\p{L}-]*boot[\p{L}-]*/giu) ?? [];
    const written = entries.filter(e => /boot/i.test(e.src));
    if (LANG === 'de') {
        assert.ok(written.length >= 8, `expected the boot pieces, found ${written.length}`);
        for (const e of written) {
            const left = words(e.spoken).filter(w => !GERMAN_BOOT.includes(w.replace(/[^\p{L}]+$/u, '')));
            assert.deepEqual(left, [], `${e.key} still sends a boot word the rule has not been told about`);
        }
        assert.equal(spokenForm('Der Rechner bootet, du bootest ihn, nach dem Booten der Boot-Stick.', 'de'),
            'Der Rechner buhtet, du buhtest ihn, nach dem Buhten der Buht-Stick.');
        for (const boat of ['Wir sitzen alle im selben Boot.', 'Die Boote liegen im Hafen.', 'Ein altes U-Boot.', 'Des Bootes Rumpf.']) {
            assert.equal(spokenForm(boat, 'de'), boat, `a boat was respelled: ${boat}`);
        }
    } else {
        for (const e of written) assert.ok(!/buht/i.test(e.spoken), `${e.key} carries the German respelling`);
        assert.equal(spokenForm('The machine boots. Booting takes ages.', 'en'), 'The machine boots. Booting takes ages.');
    }
});

await ok(`"IT" is sent as the English letters in German and left alone elsewhere`, () => {
    const written = entries.filter(e => /\bIT/.test(e.src));
    if (LANG === 'de') {
        // Close to two hundred pieces: the floor catches a rule that has
        // collapsed, not ordinary editing.
        assert.ok(written.length > 150, `expected the IT pieces, found ${written.length}`);
        for (const e of written) {
            assert.ok(!/\bIT(?:ler)?\b/.test(e.spoken), `${e.key} still sends "IT" as two German letters`);
        }
        assert.equal(spokenForm("Na, IT-Held? Die Schatten-IT der ITler.", 'de'), "Na, Ei-Ti-Held? Die Schatten-Ei-Ti der Ei-Tiler.");
        // Capitals inside a word are not the abbreviation.
        for (const caps of ['MITTAG', 'BITTE', 'FIT', 'KRITISCH', 'ROOTKIT', 'ITEMS']) {
            assert.equal(spokenForm(caps, 'de'), caps, `${caps} was respelled`);
        }
    } else {
        for (const e of written) assert.ok(!/Ei-Ti/.test(e.spoken), `${e.key} carries the German respelling`);
        assert.equal(spokenForm('Ask IT. The IT department.', 'en'), 'Ask IT. The IT department.');
    }
    for (const e of written) assert.ok(!/Ei-Ti/.test(e.src), `${e.key} has the respelling in its PROSE`);
});

// --- 7b. The checksum over what is SENT -------------------------------------
//
// The file name is the hash of the text as WRITTEN, which is right for the
// browser and blind to exactly one thing: a change to the rules above. Nothing
// in the prose moves, so nothing in the file name moves, so the ledger calls
// every affected piece finished and the provider is never asked again. A
// checksum over the spoken form is the only record that can tell - see the note
// in voice-text.mjs, and the TRANSFORM number that preceded it and was read by
// nothing.
await ok('the manifest records what is sent, not only what is shown', () => {
    const manifest = JSON.parse(readFileSync(`${ROOT}voice/manifest.${LANG}.json`, 'utf8'));
    const by = new Map(manifest.entries.map(e => [e.key, e]));
    const wrong = [];
    for (const e of entries) {
        if (by.get(e.key)?.spk !== createHash('sha1').update(spokenForm(e.src, LANG), 'utf8')
                                        .digest('hex').slice(0, 12)) wrong.push(e.key);
    }
    assert.deepEqual(wrong.slice(0, 5), [], 'the manifest cannot see a change to the spoken form');

    // And the two tools that have to act on it. The generation run compares the
    // ledger against this value and writes it back; without either half a
    // respelling is committed, gated green and never spoken.
    const audio = readFileSync(`${ROOT}tools/make-audio.mjs`, 'utf8');
    assert.match(audio, /r\.spk === undefined \|\| r\.spk === e\.spk/, 'the run does not compare the spoken form');
    assert.match(audio, /ledger\[e\.key\] = \{[^}]*spk: e\.spk/, 'the run does not record the spoken form');
});

// --- 8. The mail interrupts, and hands the line back ------------------------
//
// The one window that does not end the line it covers. Both halves have to be
// there or the behaviour is worse than not having it: a pause with no resume is
// a scene that stops dead, and a resume with no pause is nothing at all.
await ok('a mail pauses the narrator and gives the line back', () => {
    const ui = src('engine/engine_ui.js');
    assert.match(ui, /const INTERRUPTS_TERMINAL = \[[^\]]*'email-modal'[^\]]*\]/,
        'the mail is not on the interrupting list');
    assert.match(ui, /if \(this\.interruptsTerminal\(el\)\) \{\s*if \(!wasOpen\) \{\s*\(this\._interruptions \?\?= new Set\(\)\)\.add\(el\.id\);\s*this\.pauseNarration\(\);/,
        'showOverlay does not pause for an interrupting window, or does not book it');
    assert.match(ui, /if \(this\._interruptions\?\.delete\(el\.id\)\) this\.resumeNarration\(\);/,
        'hideOverlay never gives the line back');

    // The notices on modal-overlay interrupt too, the end of the day and the
    // night do not - decided at OPENING, because dismissModal() empties
    // state.modal before the box disappears and a question asked at closing
    // would be about a box that is gone.
    assert.match(ui, /interruptsTerminal: function\(el\) \{[\s\S]{0,260}?return !!m\?\.open && !m\.isEnd && !m\.isNight;/,
        'a notice is not told apart from the end of the day');
    assert.match(ui, /\} else if \(el\.id === 'modal-overlay'\) \{[\s\S]{0,200}?this\._interruptions\?\.delete\(el\.id\);\s*this\.hushNarration\(\);/,
        'the end of the day or the night does not end the line');

    const voice = src('engine/engine_voice.js');
    // currentTime is what separates the two: hushNarration rewinds, pause does
    // not. A pause that rewound would restart the scene from its first word.
    assert.match(voice, /pauseNarration: function[\s\S]{0,300}?el\.pause\(\);/, 'pauseNarration does not pause');
    assert.ok(!/pauseNarration: function[\s\S]{0,300}?currentTime/.test(voice),
        'pauseNarration rewinds, so resuming would start the line over');
    // And a hush has to clear the flag, or the next mail would resume a line
    // that was already thrown away.
    assert.match(voice, /hushNarration: function[\s\S]{0,300}?this\.interrupted = false;/,
        'a hushed line could still be resumed');
    // The resume asks the same questions narrate() does, so a window opened
    // on top of the mail keeps the silence.
    assert.match(voice, /resumeNarration: function[\s\S]{0,600}?windowOverTerminal\(\)/,
        'resumeNarration speaks behind a window');

    // A screen that arrives behind an uninvited window is held, not spoken -
    // the notices open inside the same click, before the result is set.
    assert.match(code('engine/engine_voice.js'),
        /if \(this\._interruptions\?\.size \|\| this\.state\.isEmailOpen\) \{\s*this\.heldLine = text \|\| null;/,
        'a result is read out behind the written warning again');
});

// --- 8a. An answered mail reads what came of it ---------------------------
//
// The window's own text, read over the scene the mail paused rather than
// instead of it - narrateWindow() hushes first, and the scene would be gone.
await ok('an answered mail reads its outcome and gives the scene back', () => {
    const ev = code('engine/engine_events.js');
    const body = (fn) => {
        const start = ev.indexOf(`${fn}: function`);
        assert.ok(start >= 0, `${fn} is gone`);
        return ev.slice(start, ev.indexOf('\n    },', start));
    };
    assert.match(body('resolveEmail'), /this\.narrateOverPause\(opt\.r, 'mails'\)/,
        'the answered mail does not read its outcome, or not as a mail');
    assert.ok(!/narrateWindow\(/.test(body('resolveEmail')), 'the outcome hushes the scene the mail paused');
    assert.match(body('closeEmail'), /this\.giveBackLine\(\);\s*this\.hideOverlay\('email-modal'\);/,
        'closing the mail does not give the scene back before the resume');
    assert.match(body('relocaliseMail'), /this\.narrateOverPause\(r, 'mails'\)/,
        'a language switch leaves the answered mail silent');

    // A hush owes nothing, the line put aside included.
    const voice = src('engine/engine_voice.js');
    assert.match(voice, /hushNarration: function[\s\S]{0,500}?this\.stashedLine = null;/,
        'a hushed narrator would still give back a line it put aside');
});

// --- 8b. The two valves have a voice ----------------------------------------
//
// Ten lines each, drawn at random, framed on screen by a sentence with a
// number in it. What is collected and what is spoken has to be the same
// string, the drawn line on its own, or the file is bought and never found.
await ok('the rage valve and the written warning read their line', () => {
    for (const kind of ['rage', 'chef']) {
        const got = entries.filter(e => e.key.startsWith(`special/valveTexts/${kind}/`));
        assert.equal(got.length, 10, `expected the ten ${kind} lines, found ${got.length}`);
    }
    // Each function on its own. A pattern over the whole file let the probe
    // through: with the rage valve's call deleted, the search ran on into
    // issueChefWarning, which follows it, and found the call there.
    const core = code('engine/engine_core.js');
    const body = (fn) => {
        const start = core.indexOf(`${fn}: function`);
        assert.ok(start >= 0, `${fn} is gone`);
        return core.slice(start, core.indexOf('\n    },', start));
    };
    for (const fn of ['openRageValve', 'issueChefWarning']) {
        const b = body(fn);
        assert.match(b, /const line = texts\[/,
            `${fn} no longer keeps the drawn line apart from the sentence around it`);
        // With its kind named: as a window's text it would otherwise count as
        // H.A.L.G.E.R.D.'s, and the valves' switch in the settings would not
        // reach it - while his would silence it.
        assert.match(b, /this\.showModal\([\s\S]*?this\.narrateWindow\(line, 'valves'\)/,
            `${fn} does not speak its line as a valve, or speaks it before its window is up`);
    }
});

// --- 9. A language switch on a result screen --------------------------------
//
// The text follows and the voice cannot, because a result does not repaint -
// so without this a switch left the screen in English and the speaker silent
// until the next click.
await ok('a result screen speaks again in the new language', () => {
    const ev = src('engine/engine_events.js');
    assert.match(ev, /term\.mode === 'result'[\s\S]{0,200}?this\.narrate\(renderRecipe\(term\.result\.text\)\)/,
        'relocaliseScene does not restart a result');
    // Narrated from the recipe, never from a stored sentence: the recipe is
    // what the screen itself reads, so the hash is exact by construction.
    assert.match(ev, /import \{[^}]*renderRecipe[^}]*\} from '\.\/recipe\.js'/,
        'renderRecipe is not imported');
    // A reference and nothing else. A dictionary line is not recorded, and a
    // frozen sentence keeps its old language - asking for either would be a
    // request that can only 404.
    assert.match(ev, /if \(term\.result\?\.text\?\.ref\)/,
        'a line that cannot follow the language would be looked up anyway');

    // And the lesson's own bubble, which is the same question one window up.
    // isActive rather than the bubble's visible flag: skip() leaves that flag
    // standing, so a switch afterwards read step one out over a workday.
    assert.match(code('tutorial.js'),
        /onLanguageChange\(\(\) => \{[\s\S]{0,600}?if \(!tutorial\.isActive\) return;/,
        'a language switch can speak a tutorial bubble that is no longer on screen');
});

// --- 9b. The button that reads a scene again --------------------------------
//
// Three separate things have to hold, and every one of them fails quietly.
//
// The door has to go PAST the narrator's switch, because the player it is for
// is the one who turned the voice off: a button that refuses for them is a
// button that does nothing in the only case it was built for, and nothing on
// screen would say why. The volume is the other way round - zero IS a request
// for silence, so the button is not offered at all.
//
// What it offers has to be the TERMINAL's line and not the last thing spoken.
// narrateWindow() carries H.A.L.G.E.R.D. and the tutorial bubbles, and if
// those landed in `narratable` the button would sit over a working day
// offering to repeat step four of the lesson.
//
// And the flag it draws itself from has to reach the view. The modules are
// spread into `engine` (src/engine.js), so an accessor on the voice object
// would be flattened to its value at startup and the glyph would stick on
// whatever it showed first.
await ok('the read-aloud button reads the terminal, past the switch', () => {
    const voice = code('engine/engine_voice.js');

    assert.match(voice, /narrate: function[\s\S]{0,800}?this\.state\.narratable = text \|\| null;/,
        'the terminal line is never offered to the button');
    assert.ok(!/narrateWindow: function[\s\S]{0,400}?narratable/.test(voice),
        'window text would be offered as the terminal line');

    // The switch is skipped for this caller and the volume is not. One gate,
    // _mayRead(), asked by _speak and by the answered mail's door alike.
    assert.match(voice, /_speak: function\(text, onDemand = false, owner = 'terminal', kind = 'events'\)/, 'there is no on-demand door');
    assert.match(voice, /_speak: function[\s\S]{0,200}?if \(!this\._mayRead\(kind, onDemand\)\) return;/,
        'a line is spoken without asking the gate');
    const gate = voice.slice(voice.indexOf('_mayRead: function'), voice.indexOf('\n    },', voice.indexOf('_mayRead: function')));
    // The button is past the kinds as well as past the switch.
    assert.match(gate, /if \(!onDemand && kind !== 'sample' && !this\.kindAllowed\(kind\)\) return false;/,
        'the kinds stop the button too, or stop the settings sample');
    assert.match(gate, /if \(!onDemand && !this\.state\.narrationEnabled\) return false;/,
        'the button is refused by the narrator switch');
    assert.match(gate, /return this\.state\.narrationVolume > 0;/,
        'a volume of zero would still speak');
    assert.match(voice, /replayNarration: function[\s\S]{0,400}?this\._speak\(this\.state\.narratable, true,/,
        'the button does not read the terminal line on demand');
    // One button, so a press while it speaks has to stop it.
    assert.match(voice, /replayNarration: function[\s\S]{0,200}?if \(this\.speaking\) \{ this\.hushNarration\(\); return; \}/,
        'pressing it while it speaks does not stop it');

    // The flag reaches the rune state, through one writer.
    assert.match(voice, /_setSpeaking: function\(on\) \{\s*this\.speaking = on;\s*this\.state\.narrating = on;/,
        'the speaking flag is not mirrored for the view');
    const raw = src('engine/engine_voice.js');
    const direct = [...raw.matchAll(/this\.speaking = /g)].length;
    assert.equal(direct, 1, `the flag is set in ${direct} places; it has one writer, _setSpeaking()`);

    // When it is offered: once, in the engine, and not on the switch.
    assert.match(voice, /canReplayNarration: function\(\) \{\s*return !!this\.state\.narratable && this\.state\.narrationVolume > 0;/,
        'the button is offered on the wrong condition');

    // The button itself.
    const button = markup('components/ReadButton.svelte');
    assert.match(button, /onclick=\{\(\) => engine\.replayNarration\(\)\}/, 'the button is wired to nothing');
    assert.match(button, /\{#if state\.narrating\}[\s\S]{0,200}?<rect/, 'the icon does not follow the voice');

    // Both screens that carry it ask the engine, and neither asks the switch -
    // which would hide it from exactly the player it is for.
    for (const f of ['components/EventView.svelte', 'components/ResultView.svelte', 'components/MorningView.svelte']) {
        const view = markup(f);
        assert.match(view, /\$derived\(engine\.canReplayNarration\(\)\)/, `${f} decides on its own when to show it`);
        assert.match(view, /\{#if canRead\}[\s\S]{0,40}?<ReadButton \/>/, `${f} never shows the button`);
        assert.ok(!/narrationEnabled/.test(view), `${f} asks the narrator switch`);
    }
    // On an event it shares the excuse's row, and the row has to stand for the
    // button alone: a boss fight has no excuse and can still be read out.
    assert.match(markup('components/EventView.svelte'), /\{#if showExcuse \|\| canRead\}/,
        'the row vanishes wherever there is no excuse, and takes the button with it');

    // And its key. The same door and the same refusals as the button: not
    // through a window, not under a mail, nothing when there is nothing.
    const keys = src('engine.js');
    const read = keys.slice(keys.indexOf('// 3b. READ ALOUD'), keys.indexOf('// 4. ACTION SHORTCUTS'));
    assert.match(read, /key === engine\.state\.keyBinds\.readAloud\.toLowerCase\(\)/, 'the read-aloud key is not handled');
    assert.match(read, /engine\.windowOverTerminal\(\) \|\| engine\.state\.isEmailOpen/,
        'the read-aloud key reaches through a window or under a mail');
    assert.match(read, /if \(!engine\.canReplayNarration\(\)\) return;\s*event\.preventDefault\(\);\s*engine\.replayNarration\(\);/,
        'the read-aloud key does not use the button\'s door');
    assert.match(markup('components/KeybindView.svelte'), /\{ action: 'readAloud', label: 'keybind\.readAloud'[^}]*\}/,
        'the read-aloud key cannot be rebound');
});

// --- 10. One process, both trees --------------------------------------------
//
// Last on purpose: it loads the other tree over this one, and nothing after it
// could trust DB.
//
// The deferred pools are cached on DB by name and not by language, so a second
// collectEntries() in one process used to give back the core tier in the new
// language and all eleven terminal pools in the old one - with
// currentLanguage() already reporting the new one, so the guard inside it saw
// nothing wrong at all. The measurement that walked into it called 4,625 of
// 4,663 English pieces drifted, which reads like a broken tree rather than a
// mixed one, and the cost of believing that would have been a second English
// run.
await ok('a second language in the same process really arrives', async () => {
    const other = LANG === 'de' ? 'en' : 'de';
    const { entries: theirs } = await collectEntries(other);
    const mine = new Map(entries.map(e => [e.key, e.sha]));
    const stuck = [];
    for (const pool of TERMINAL) {
        const shared = theirs.filter(e => e.key.startsWith(`${pool}/`) && mine.has(e.key));
        assert.ok(shared.length, `no shared pieces in "${pool}" - the two trees no longer line up`);
        // Not "some differ" but "all are the same": one identical line is
        // ordinary, a whole pool of them is the old tree still sitting there.
        if (shared.every(e => mine.get(e.key) === e.sha)) stuck.push(pool);
    }
    assert.deepEqual(stuck, [], 'a pool came back in the first language');
});

console.log(`\n${passed} checks passed.`);
