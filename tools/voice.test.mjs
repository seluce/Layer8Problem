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
const { collectEntries, TERMINAL, fileFor } = await import('./voice-text.mjs');

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
await ok('only the terminal pools are collected', () => {
    const dupes = TERMINAL.filter((p, i) => TERMINAL.indexOf(p) !== i);
    assert.deepEqual(dupes, [], 'a pool is listed twice and would be collected twice');
    const stray = [...new Set(entries.map(e => e.key.split('/')[0]))].filter(p => !TERMINAL.includes(p));
    assert.deepEqual(stray, [], 'a piece was collected from a pool the terminal never shows');
});

console.log(`\n${passed} checks passed.`);
