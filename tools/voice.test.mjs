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
const { collectEntries, TERMINAL, SPOKEN_KEYS, fileFor, spokenForm } = await import('./voice-text.mjs');

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
    assert.match(ui, /this\.narrate\(extra\?\.speak \?\? null\);/,
        '_setTerminal no longer drives the narrator');
    // An event speaks its own text; a result is handed the sentence separately,
    // because what it stores is a recipe.
    assert.match(ui, /mode: 'event',[\s\S]{0,400}?speak: text/, 'an event does not hand over its text');
    assert.match(ui, /mode: 'result',[\s\S]{0,200}?speak\n/, 'a result does not hand over its sentence');
});

// --- 5. Nothing is voiced that the terminal never shows ---------------------
//
// The mails, the phone, the intranet, the board and the books are read at the
// player's own pace and are deliberately not recorded. A pool wandering into
// the voiced list would be 15 hours of speech growing by however much it holds,
// bought before anyone noticed.
await ok('only the terminal pools and the named keys are collected', () => {
    const dupes = TERMINAL.filter((p, i) => TERMINAL.indexOf(p) !== i);
    assert.deepEqual(dupes, [], 'a pool is listed twice and would be collected twice');
    // `i18n` is the one prefix that is not a pool: the named interface strings
    // of section 6, each one listed by hand.
    const allowed = [...TERMINAL, 'i18n'];
    const stray = [...new Set(entries.map(e => e.key.split('/')[0]))].filter(p => !allowed.includes(p));
    assert.deepEqual(stray, [], 'a piece was collected from a pool the terminal never shows');
});

// --- 6. The named interface strings -----------------------------------------
//
// The dictionary is NOT collected wholesale - see voice-text.mjs. Fifteen keys
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
});

// The wiring, one assertion per voice. Four call sites carry all fifteen keys,
// and each of them is a place where deleting one line costs a recording its
// only way to be heard - at 0 errors and 0 warnings, because a window that
// stays quiet looks exactly like a window with nothing recorded.
await ok('H.A.L.G.E.R.D. and the lesson have a voice', () => {
    assert.match(code('engine/engine_voice.js'),
        /previewNarration: function[\s\S]{0,200}?narrateWindow\(t\('set\.narration\.sample'\)\)/,
        'the settings sample is not spoken');
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
// Three pieces per language go through SPOKEN_AS now, all three of them
// H.A.L.G.E.R.D. A provider reading those dots gets a hardware list, and the
// mistake is only audible - the file is there, the hash matches, the checker is
// green.
await ok('the dotted name is sent as a word', () => {
    const dotted = entries.filter(e => /H\.A\.L\.G\.E\.R\.D\./.test(e.src));
    assert.ok(dotted.length >= 3, `expected the three H.A.L.G.E.R.D. pieces, found ${dotted.length}`);
    for (const e of dotted) {
        assert.ok(!/H\.A\.L/.test(spokenForm(e.src)), `${e.key} would be spelled out`);
        assert.match(spokenForm(e.src), /Halgerd/, `${e.key} lost the name altogether`);
    }
    // The screen keeps the dots: the rule belongs to what is SENT, and the
    // hash is taken over what is SHOWN.
    for (const e of dotted) assert.match(e.src, /H\.A\.L\.G\.E\.R\.D\./);
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
    assert.match(ui, /if \(!wasOpen && INTERRUPTS_TERMINAL\.includes\(el\.id\)\) this\.pauseNarration\(\);/,
        'showOverlay does not pause for an interrupting window');
    assert.match(ui, /if \(INTERRUPTS_TERMINAL\.includes\(el\.id\)\) this\.resumeNarration\(\);/,
        'hideOverlay never gives the line back');

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

console.log(`\n${passed} checks passed.`);
