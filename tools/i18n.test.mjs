// Language selection (6.0): the ladder in src/i18n/i18n.svelte.js.
//
// Worth its own suite because every rung is a decision that is invisible when
// it is wrong. A returning player silently flipped to English, or a German
// Steam client on an English system getting the wrong tree, produces no error
// anywhere - it just looks like the game forgot who it was talking to.
//
// Run: node --conditions browser --import ./tools/register.mjs tools/i18n.test.mjs
import assert from 'node:assert/strict';

// --- browser shims -----------------------------------------------------------
let store = new Map();
globalThis.localStorage = {
    get length() { return store.size; },
    key: (i) => [...store.keys()][i] ?? null,
    getItem: (k) => (store.has(k) ? store.get(k) : null),
    setItem: (k, v) => store.set(k, String(v)),
    removeItem: (k) => store.delete(k),
};
globalThis.window = globalThis;
// Node 22 exposes navigator as a getter-only global, so it is replaced rather
// than assigned to.
Object.defineProperty(globalThis, 'navigator', {
    value: { languages: [], language: '' },
    writable: true, configurable: true
});
// querySelectorAll, because switchLanguage() refills the static shell on its
// way through. A page with no marks in it is the honest answer out here.
globalThis.document = { documentElement: { lang: '' }, querySelectorAll: () => [] };
globalThis.location = { reload() { reloaded = true; } };
// engine_state.svelte.js asks it once, at module load, for the touch default.
globalThis.matchMedia = () => ({ matches: false, addEventListener() {} });
let reloaded = false;

const { platform } = await import('../src/platform.js');
const { KEYS } = await import('../src/engine/keys.js');
const i18n = await import('../src/i18n/i18n.svelte.js');

let passed = 0;
const ok = async (name, fn) => {
    try {
        await fn();
        console.log('  \u2713 ' + name);
        passed++;
    } catch (err) {
        console.log('  \u2717 ' + name);
        throw err;
    }
};

/** Back to a browser that has never seen the game. */
const reset = (languages = []) => {
    store = new Map();
    globalThis.navigator.languages = languages;
    globalThis.navigator.language = languages[0] ?? '';
    platform.isDesktop = false;
    platform.language = async () => null;
    reloaded = false;
};

console.log('Language selection:');

await ok('With nothing at all: English', async () => {
    reset();
    assert.equal(await i18n.detectLanguage(), 'en');
});

await ok('The stored choice beats everything else', async () => {
    reset(['de-DE']);
    localStorage.setItem(KEYS.language, 'en');
    platform.isDesktop = true;
    platform.language = async () => 'german';
    assert.equal(await i18n.detectLanguage(), 'en');
});

await ok('An unknown stored language is discarded', async () => {
    reset(['fr-FR']);
    localStorage.setItem(KEYS.language, 'kl');   // Klingon, one hopes
    assert.equal(await i18n.detectLanguage(), 'en');
});

await ok('Anyone who has played before stays on German', async () => {
    reset(['en-US']);
    localStorage.setItem('layer8_archive', '{}');
    assert.equal(await i18n.detectLanguage(), 'de');
});

await ok('The tutorial key counts as history too', async () => {
    // Not prefixed layer8_ - the one key that would slip through a naive check.
    reset(['en-US']);
    localStorage.setItem('sysadmin_tutorial_done', 'true');
    assert.equal(await i18n.detectLanguage(), 'de');
});

await ok('A settings key alone counts as well', async () => {
    // Someone who turned the music down but never finished a day still played.
    reset(['en-US']);
    localStorage.setItem(KEYS.musicVolume, '0.3');
    assert.equal(await i18n.detectLanguage(), 'de');
});

await ok('Foreign keys in storage do not count', async () => {
    reset(['en-US']);
    localStorage.setItem('some_other_site', 'x');
    assert.equal(await i18n.detectLanguage(), 'en');
});

await ok('Steam beats the browser', async () => {
    reset(['en-US']);
    platform.isDesktop = true;
    platform.language = async () => 'german';
    assert.equal(await i18n.detectLanguage(), 'de');
});

await ok('Steam is only asked on the desktop', async () => {
    // A witness rather than a throw: detectLanguage catches everything Steam
    // does and falls through, so an exception here would prove nothing.
    reset(['en-US']);
    let asked = false;
    platform.isDesktop = false;
    platform.language = async () => { asked = true; return 'german'; };
    assert.equal(await i18n.detectLanguage(), 'en');
    assert.equal(asked, false, 'Steam was asked in the browser');
});

await ok('A Steam language with no version falls back on the browser', async () => {
    reset(['de-AT']);
    platform.isDesktop = true;
    platform.language = async () => 'french';
    assert.equal(await i18n.detectLanguage(), 'de');
});

await ok('The browser preference is read by prefix', async () => {
    for (const tag of ['de-DE', 'de-AT', 'de-CH', 'DE', 'de']) {
        reset([tag]);
        assert.equal(await i18n.detectLanguage(), 'de', tag);
    }
});

await ok("The order of the browser's wishes is kept", async () => {
    reset(['fr-FR', 'en-GB', 'de-DE']);
    assert.equal(await i18n.detectLanguage(), 'en', 'not the first match');
});

await ok('navigator.language is enough when there is no list', async () => {
    reset();
    globalThis.navigator.languages = undefined;
    globalThis.navigator.language = 'de-DE';
    assert.equal(await i18n.detectLanguage(), 'de');
});

console.log('Switching over:');

await ok('The switch remembers the choice and does NOT reload', async () => {
    reset(['de-DE']);
    await i18n.useLanguage('de');
    await i18n.switchLanguage('en');
    assert.equal(localStorage.getItem(KEYS.language), 'en');
    assert.equal(reloaded, false, 'it reloaded anyway');
    // The three things that hang on the switch, one at a time:
    assert.equal(i18n.language(), 'en', 'the running language is still the old one');
    assert.equal(i18n.t('language.label'), 'Language', 't() still answers with the old language');
    assert.equal(document.documentElement.lang, 'en', '<html lang> is still the old one');
});

await ok('The switch reports to the listeners - exactly once', async () => {
    reset(['de-DE']);
    await i18n.useLanguage('de');
    const heard = [];
    const off = i18n.onLanguageChange((lang) => heard.push(lang));
    await i18n.switchLanguage('en');
    off();
    assert.deepEqual(heard, ['en']);
    // After unsubscribing there is quiet - otherwise every test's session would
    // hang over into the next one.
    await i18n.switchLanguage('de');
    assert.deepEqual(heard, ['en']);
});

await ok('The rune moves only once the data tree is in place', async () => {
    // The order is the real work switchLanguage does. If the rune moves first,
    // every t() draws against pools still carrying the old language - and
    // setLanguage() empties DB synchronously, so for a moment there would be
    // none at all.
    //
    // The difference only shows WHILE loading, so this deliberately does not
    // await: with the right order useLanguage stops at its await straight away,
    // with the wrong one it has already moved the rune.
    reset(['de-DE']);
    await i18n.useLanguage('de');
    const { currentLanguage } = await import('../src/data.js');

    const running = i18n.switchLanguage('en');
    assert.equal(i18n.language(), 'de', 'the rune moved ahead of the tree');
    assert.equal(currentLanguage(), 'de');

    await running;
    assert.equal(i18n.language(), 'en');
    assert.equal(currentLanguage(), 'en');
});

await ok('The running language triggers nothing', async () => {
    reset(['de-DE']);
    await i18n.useLanguage('de');
    let heard = 0;
    const off = i18n.onLanguageChange(() => heard++);
    await i18n.switchLanguage(i18n.language());
    off();
    assert.equal(reloaded, false, 'a needless reload');
    assert.equal(heard, 0, 'a needless rebuild');
});

await ok('An unknown language is refused', async () => {
    reset(['de-DE']);
    await i18n.useLanguage('de');
    await i18n.switchLanguage('kl');
    assert.equal(localStorage.getItem(KEYS.language), null);
    assert.equal(i18n.language(), 'de');
    assert.equal(reloaded, false);
});

console.log('Interface strings:');

await ok('initLanguage sets the lang attribute', async () => {
    reset(['de-DE']);
    await i18n.initLanguage();
    assert.equal(document.documentElement.lang, 'de');
    assert.equal(i18n.language(), 'de');
});

await ok('t() answers in the language that is running', async () => {
    await i18n.useLanguage('de');
    assert.equal(i18n.t('language.label'), 'Sprache');
    await i18n.useLanguage('en');
    assert.equal(i18n.t('language.label'), 'Language');
});

await ok('A missing entry falls back on English and then on the key', async () => {
    // Played in German: the fallback visibly bites, and the key stays the last
    // step. Before 6.0 this probe only showed that last step, because German was
    // the fallback itself - it would not have noticed a fallback turned the wrong
    // way round.
    await i18n.useLanguage('de');
    assert.equal(i18n.t('language.label'), 'Sprache');
    assert.equal(i18n.t('does.not.exist'), 'does.not.exist');

    // A key that only en.js carries does not exist in the stock - rule 4 of the
    // linter sees to that. So one is put in and taken out again: with no fallback
    // the key itself would stand here.
    const { de } = await import('../src/i18n/de.js');
    const { en } = await import('../src/i18n/en.js');
    const key = 'language.label';
    const kept = de[key];
    delete de[key];
    assert.equal(i18n.t(key), en[key], 'does not fall back on English');
    de[key] = kept;
});

await ok('Both dictionaries carry the same set of keys', async () => {
    const { de } = await import('../src/i18n/de.js');
    const { en } = await import('../src/i18n/en.js');
    const missing = Object.keys(de).filter(k => !(k in en));
    const extra   = Object.keys(en).filter(k => !(k in de));
    assert.deepEqual(missing, [], 'missing from the English side');
    assert.deepEqual(extra,   [], 'missing from the German side');
});

console.log('Static markup:');

/**
 * Enough of a DOM for applyStaticStrings.
 *
 * No jsdom in the project, and pulling one in for three attributes would be a
 * dependency for a stub. What matters is the distinction the function makes -
 * text against markup against attribute - and that survives a fake element.
 */
function fakeRoot(specs) {
    const nodes = specs.map(([mark, key]) => ({
        mark, dataset: { [mark]: key },
        textContent: '', innerHTML: '', attrs: {},
        setAttribute(name, value) { this.attrs[name] = value; }
    }));
    const SELECTOR = {
        '[data-i18n]': 'i18n',
        '[data-i18n-html]': 'i18nHtml',
        '[data-i18n-attr]': 'i18nAttr'
    };
    return {
        nodes,
        querySelectorAll: (sel) => nodes.filter(n => n.mark === SELECTOR[sel])
    };
}

await ok('data-i18n writes text, not markup', async () => {
    await i18n.useLanguage('de');
    const root = fakeRoot([['i18n', 'intro.archive']]);
    i18n.applyStaticStrings(root);
    assert.equal(root.nodes[0].textContent, 'Archiv');
    assert.equal(root.nodes[0].innerHTML, '', 'inserted as markup');
});

await ok('data-i18n-html writes markup', async () => {
    await i18n.useLanguage('de');
    const root = fakeRoot([['i18nHtml', 'intro.pitch']]);
    i18n.applyStaticStrings(root);
    assert.ok(root.nodes[0].innerHTML.includes('<strong'), 'the markup is missing');
    assert.equal(root.nodes[0].textContent, '', 'inserted as text');
});

await ok('data-i18n-attr sets every attribute it names', async () => {
    await i18n.useLanguage('en');
    const root = fakeRoot([['i18nAttr', 'alt=intro.logoAlt;title=intro.archive']]);
    i18n.applyStaticStrings(root);
    assert.equal(root.nodes[0].attrs.alt, 'Layer8Problem logo');
    assert.equal(root.nodes[0].attrs.title, 'Archive');
});

await ok('A missing key stays on screen as a readable marker', async () => {
    await i18n.useLanguage('de');
    const root = fakeRoot([['i18n', 'does.not.exist']]);
    i18n.applyStaticStrings(root);
    assert.equal(root.nodes[0].textContent, 'does.not.exist');
});

await ok('The language decides what is filled in', async () => {
    const root = fakeRoot([['i18n', 'intro.mode.day.name']]);
    await i18n.useLanguage('de');
    i18n.applyStaticStrings(root);
    assert.equal(root.nodes[0].textContent, 'Arbeitstag');
    await i18n.useLanguage('en');
    i18n.applyStaticStrings(root);
    assert.equal(root.nodes[0].textContent, 'Workday');
});

console.log('Steam presence:');

await ok('Every activity has a text, every text an activity', async () => {
    // The arc spans three places that know nothing of one another: engine_core
    // sends the id, the dictionary holds the sentence, and make-steam-presence
    // writes the .vdf from it. With a sentence missing, the friends list shows a
    // bare "#Status_lunch" - visible to other people, invisible to every checker
    // in here.
    const { PRESENCE_ALL } = await import('../src/engine/presence.js');
    const { de } = await import('../src/i18n/de.js');
    const { en } = await import('../src/i18n/en.js');

    for (const [name, dict] of [['de', de], ['en', en]]) {
        const vorhanden = Object.keys(dict).filter(k => k.startsWith('presence.'))
                                           .map(k => k.slice('presence.'.length));
        assert.deepEqual([...vorhanden].sort(), [...PRESENCE_ALL].sort(),
                         `${name}: presence.* and PRESENCE_ALL have drifted apart`);
    }
});

await ok('Every achievement is in the Steam order, with title and hint', async () => {
    // Steamworks names achievements by their POSITION
    // (NEW_ACHIEVEMENT_1_7_NAME), and that position is NOT the one in the data
    // file - the three week achievements sit at the top there and at the bottom
    // in Steam. A new achievement that is not appended shifts every one after it:
    // each achievement in the shop would then carry its neighbour's name, in a
    // language nobody here reads.
    const { readFileSync } = await import('node:fs');
    const { achievements: dea } = await import('../src/data/de/data_achievements.js');
    const { achievements: ena } = await import('../src/data/en/data_achievements.js');

    const werkzeug = readFileSync(new URL('./make-steam-achievements.mjs', import.meta.url), 'utf-8');
    const block = werkzeug.slice(werkzeug.indexOf('const STEAM_ORDER'), werkzeug.indexOf('];', werkzeug.indexOf('const STEAM_ORDER')));
    const order = [...block.matchAll(/'([a-z_]+)'/g)].map(m => m[1]);

    assert.equal(order.length, dea.length, 'STEAM_ORDER and the tree are of different lengths');
    assert.equal(new Set(order).size, order.length, 'an id stands twice in STEAM_ORDER');
    for (const baum of [['de', dea], ['en', ena]]) {
        const [name, tree] = baum;
        assert.deepEqual([...order].sort(), tree.map(a => a.id).sort(),
                         `${name}: STEAM_ORDER and the tree hold different achievements`);
        for (const a of tree) {
            assert.ok(a.title, `${name}: ${a.id} has no title`);
            assert.ok(a.hint,  `${name}: ${a.id} has no hint - desc would be a spoiler`);
        }
    }
});

console.log('Wiring:');

await ok('The start screen offers every language', async () => {
    // The switch in index.html is static markup, so nothing in the module graph
    // would notice if a language were added to LANGUAGES and forgotten there.
    // This is the only check that would. Since 6.1 the button carries a
    // data-action mark instead of an inline handler - src/actions.js.
    const { readFileSync } = await import('node:fs');
    const html = readFileSync(new URL('../index.html', import.meta.url), 'utf-8');
    for (const lang of i18n.LANGUAGES) {
        assert.ok(html.includes(`data-lang="${lang}"`), `no button for ${lang}`);
        assert.ok(html.includes(`data-action="switchLanguage" data-arg="${lang}"`),
                  `not wired up: ${lang}`);
        assert.ok(html.includes(`html[lang="${lang}"] .lang-opt[data-lang="${lang}"]`),
                  `no highlight for ${lang}`);
    }
});

console.log('Recorded prose (recipes):');

/*
 * Since 6.0 a log line, a chat bubble, the ticker and the excuse record an
 * IDENTITY rather than a sentence, so they follow a language switch. The suite
 * lives here because the promise is a language promise, and it is the promise
 * that would break silently: a recipe that stops resolving does not throw, it
 * quietly shows the wrong language or nothing at all.
 */
const { renderRecipe, recipeKey, itemNameValue } = await import('../src/engine/recipe.js');
const { loadCore, ensure } = await import('../src/data.js');

const inBoth = async (recipe) => {
    const out = {};
    for (const lang of ['de', 'en']) {
        await i18n.useLanguage(lang);
        await loadCore(lang);
        await ensure('items', 'special', 'coffee', 'excuses', 'newsTicker');
        out[lang] = renderRecipe(recipe);
    }
    return out;
};

await ok('A reference into the data tree follows the language', async () => {
    const r = await inBoth({ ref: { p: 'items', i: 'donut', path: ['use', 'log'] } });
    assert.ok(r.de && r.en, 'one side delivered nothing');
    assert.notEqual(r.de, r.en, 'the reference delivers the same in both trees');
});

await ok('A random draw comes back as the same draw', async () => {
    // The index is recorded, not the result - both trees carry the same list
    // lengths, which lint-parity enforces.
    const r = await inBoth({ ref: { p: 'special', path: ['leet', 1] } });
    assert.ok(r.de.startsWith('13:37') && r.en.startsWith('13:37'), 'not the same line');
    assert.notEqual(r.de, r.en);
});

await ok('A value inside the sentence is resolved with it', async () => {
    const r = await inBoth({ k: 'log.item.found', v: { item: itemNameValue('donut') } });
    assert.ok(r.de.includes('Donut'), r.de);
    assert.ok(r.en.includes('doughnut'), r.en);
});

await ok('A recipe inside a recipe resolves through both levels', async () => {
    const r = await inBoth({ k: 'log.item.cooldown',
                             v: { line: { k: 'item.cooldown.fallback', v: { item: itemNameValue('donut') } },
                                  wait: 5 } });
    assert.ok(r.de.includes('Donut') && r.en.includes('doughnut'), JSON.stringify(r));
    assert.notEqual(r.de, r.en);
});

await ok('A line from 5.x stays put and does not switch', async () => {
    const r = await inBoth({ msg: 'A line from an old save' });
    assert.equal(r.de, r.en, 'a literal must not switch');
    assert.equal(r.de, 'A line from an old save');
});

await ok('A recipe into nothing is dropped rather than guessed at', async () => {
    // Content moves between versions. Better one line fewer than a sentence in
    // the language the player has just switched away from.
    for (const kaputt of [{ ref: { i: 'gibt_es_nicht', path: ['x'] } },
                          { k: 'does.not.exist' },
                          { k: 'log.item.found', v: { item: { ref: { i: 'weg', path: ['t'] } } } }]) {
        assert.equal(renderRecipe(kaputt), null, JSON.stringify(kaputt));
    }
    // And a recipe that also carried a sentence does NOT take it. Without this
    // line the probe would not notice the old fallback coming back: the three
    // above carry none at all, so there would be nothing to reach for.
    assert.equal(renderRecipe({ ref: { i: 'weg', path: ['x'] }, msg: 'an old sentence' }), null,
                 'a recipe falls back on a stored sentence again');
    assert.equal(renderRecipe({ k: 'does.not.exist', msg: 'an old sentence' }), null,
                 'a key falls back on a stored sentence again');
});

await ok('The duplicate guard compares identities, not sentences', async () => {
    const a = { k: 'log.item.found', v: { item: 'Donut' } };
    const b = { k: 'log.item.found', v: { item: 'Donut' } };
    const c = { k: 'log.item.found', v: { item: 'Hammer' } };
    assert.equal(recipeKey(a), recipeKey(b), 'the same event counts as different');
    assert.notEqual(recipeKey(a), recipeKey(c), 'two events are folded into one');
});

await ok('A switch in mid-load keeps the pool, and keeps it in the new tree', async () => {
    // The race the diary was found through. setLanguage() empties DB, clears
    // `pending` and reloads what it saw - and it used to look only at what had
    // already ARRIVED. A pool still in flight was then either dropped, or filed
    // under the OLD tree by the `forLanguage === language` guard in ensure().
    // Fourteen pools recover at their call site. The diary has none, so it
    // stayed empty for the whole session: "No entry. The day was long enough."
    const { ensure, setLanguage, DB, currentLanguage } = await import('../src/data.js');
    if (currentLanguage() !== 'de') await setLanguage('de');
    await i18n.useLanguage('de');
    await ensure('board');
    const deutsch = JSON.stringify(DB.board).slice(0, 300);

    delete DB.board;
    const unterwegs = ensure('board');        // deliberately NOT awaited
    await setLanguage('en');                  // switched right into it
    await unterwegs.catch(() => {});
    await new Promise(r => setTimeout(r, 30));

    assert.ok(DB.board, 'the pool was dropped by the switch and never asked for again');
    assert.notEqual(JSON.stringify(DB.board).slice(0, 300), deutsch,
                    'the pool survived the switch but stayed in the old tree');

    await setLanguage('de');
    await i18n.useLanguage('de');
});
await ok('setLanguage counts what is in flight, not only what has arrived', async () => {
    // The check above depends on timing; this one does not.
    const { readFileSync } = await import('node:fs');
    const src = readFileSync(new URL('../src/data.js', import.meta.url), 'utf-8');
    const fn = src.slice(src.indexOf('export async function setLanguage'));
    assert.ok(/POOL_NAMES\.filter\(name => DB\[name\] \|\| pending\[name\]\)/.test(fn),
              'setLanguage looks only at the finished pools again');
});

await ok('The end screen follows a language switch', async () => {
    // The three forms in which an end or night screen holds its lines. Each has
    // to say something different in the two trees - if it did not, the screen
    // would be frozen and nobody would notice.
    const titel = await inBoth({ k: 'end.weekTitle' });
    assert.ok(titel.de && titel.en, 'one side delivered nothing');
    assert.notEqual(titel.de, titel.en, 'the title does not switch along');

    // A sentence in a sentence in a sentence: the week note wraps the lead, and
    // the weekday sits inside it as a recipe of its own.
    const vorspann = await inBoth({ k: 'week.endsOn',
                                    v: { base: { k: 'end.rageQuit' }, day: { k: 'week.day.wed' } } });
    assert.notEqual(vorspann.de, vorspann.en, 'the lead does not switch along');
    assert.ok(vorspann.de.includes('Mittwoch'), vorspann.de);
    assert.ok(vorspann.en.includes('Wednesday'), vorspann.en);

    // And the capitals belong to the screen, not to the dictionary entry: the
    // night headline used to shout its date through .toUpperCase(), which a
    // finished sentence could still do and a recipe does through `up`.
    const nacht = await inBoth({ k: 'week.night.title', v: { day: { k: 'week.day.tue', up: true } } });
    assert.ok(nacht.de.includes('DIENSTAG'), nacht.de);
    assert.ok(nacht.en.includes('TUESDAY'), nacht.en);
});

await ok('No recorded field holds a finished sentence any more', async () => {
    // The rule all of this rests on: the state holds the identity, the display
    // renders. A field that stores prose again breaks it quietly.
    const { freshDay, state } = await import('../src/engine/engine_state.svelte.js');
    const day = freshDay();
    for (const key of ['currentExcuse', 'activeNews']) {
        assert.ok(!(typeof day[key] === 'string' && day[key].length),
                  `${key} holds text again instead of an identity`);
    }
    assert.deepEqual(day.boardNotes, [], 'boardNotes holds notes again instead of ids');

    // And the end screen, the last one to hold prose until 6.1: the two blocks
    // that used to arrive as HTML are snapshot fields now. A state that does not
    // carry them is a state in which showEnd() could put text back.
    for (const key of ['balance', 'party']) {
        assert.ok(key in state.modal, `state.modal no longer carries ${key}`);
    }
});

console.log(`\n${passed} checks passed.`);
