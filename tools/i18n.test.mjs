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

console.log('Sprachwahl:');

await ok('Ohne alles: Englisch', async () => {
    reset();
    assert.equal(await i18n.detectLanguage(), 'en');
});

await ok('Die gespeicherte Wahl schlägt alles andere', async () => {
    reset(['de-DE']);
    localStorage.setItem(KEYS.language, 'en');
    platform.isDesktop = true;
    platform.language = async () => 'german';
    assert.equal(await i18n.detectLanguage(), 'en');
});

await ok('Eine unbekannte gespeicherte Sprache wird verworfen', async () => {
    reset(['fr-FR']);
    localStorage.setItem(KEYS.language, 'kl');   // Klingon, one hopes
    assert.equal(await i18n.detectLanguage(), 'en');
});

await ok('Wer schon gespielt hat, bleibt bei Deutsch', async () => {
    reset(['en-US']);
    localStorage.setItem('layer8_archive', '{}');
    assert.equal(await i18n.detectLanguage(), 'de');
});

await ok('Auch der Tutorial-Schlüssel zählt als Vorgeschichte', async () => {
    // Not prefixed layer8_ - the one key that would slip through a naive check.
    reset(['en-US']);
    localStorage.setItem('sysadmin_tutorial_done', 'true');
    assert.equal(await i18n.detectLanguage(), 'de');
});

await ok('Eine reine Einstellung zählt ebenfalls', async () => {
    // Someone who turned the music down but never finished a day still played.
    reset(['en-US']);
    localStorage.setItem(KEYS.musicVolume, '0.3');
    assert.equal(await i18n.detectLanguage(), 'de');
});

await ok('Fremde Schlüssel im Speicher zählen nicht', async () => {
    reset(['en-US']);
    localStorage.setItem('some_other_site', 'x');
    assert.equal(await i18n.detectLanguage(), 'en');
});

await ok('Steam schlägt den Browser', async () => {
    reset(['en-US']);
    platform.isDesktop = true;
    platform.language = async () => 'german';
    assert.equal(await i18n.detectLanguage(), 'de');
});

await ok('Steam wird nur auf dem Desktop gefragt', async () => {
    // A witness rather than a throw: detectLanguage catches everything Steam
    // does and falls through, so an exception here would prove nothing.
    reset(['en-US']);
    let asked = false;
    platform.isDesktop = false;
    platform.language = async () => { asked = true; return 'german'; };
    assert.equal(await i18n.detectLanguage(), 'en');
    assert.equal(asked, false, 'Steam wurde im Browser gefragt');
});

await ok('Eine Steam-Sprache ohne Fassung fällt auf den Browser zurück', async () => {
    reset(['de-AT']);
    platform.isDesktop = true;
    platform.language = async () => 'french';
    assert.equal(await i18n.detectLanguage(), 'de');
});

await ok('Der Browser wird über das Präfix gelesen', async () => {
    for (const tag of ['de-DE', 'de-AT', 'de-CH', 'DE', 'de']) {
        reset([tag]);
        assert.equal(await i18n.detectLanguage(), 'de', tag);
    }
});

await ok('Die Reihenfolge der Browser-Wünsche wird eingehalten', async () => {
    reset(['fr-FR', 'en-GB', 'de-DE']);
    assert.equal(await i18n.detectLanguage(), 'en', 'nicht der erste Treffer');
});

await ok('navigator.language reicht, wenn es keine Liste gibt', async () => {
    reset();
    globalThis.navigator.languages = undefined;
    globalThis.navigator.language = 'de-DE';
    assert.equal(await i18n.detectLanguage(), 'de');
});

console.log('Umschalten:');

await ok('Der Wechsel merkt sich die Wahl und lädt NICHT neu', async () => {
    reset(['de-DE']);
    await i18n.useLanguage('de');
    await i18n.switchLanguage('en');
    assert.equal(localStorage.getItem(KEYS.language), 'en');
    assert.equal(reloaded, false, 'hat trotzdem neu geladen');
    // Die drei Dinge, die am Wechsel hängen, einzeln:
    assert.equal(i18n.language(), 'en', 'die laufende Sprache steht noch alt');
    assert.equal(i18n.t('language.label'), 'Language', 't() liefert noch alt');
    assert.equal(document.documentElement.lang, 'en', '<html lang> steht noch alt');
});

await ok('Der Wechsel meldet sich bei den Zuhörern — genau einmal', async () => {
    reset(['de-DE']);
    await i18n.useLanguage('de');
    const heard = [];
    const off = i18n.onLanguageChange((lang) => heard.push(lang));
    await i18n.switchLanguage('en');
    off();
    assert.deepEqual(heard, ['en']);
    // Nach dem Abmelden ist Ruhe — sonst hinge jede Sitzung eines Tests im
    // nächsten mit drin.
    await i18n.switchLanguage('de');
    assert.deepEqual(heard, ['en']);
});

await ok('Die Rune springt erst, wenn der Datenbaum steht', async () => {
    // Die Reihenfolge ist die eigentliche Arbeit von switchLanguage. Springt
    // die Rune zuerst, zeichnen alle t() gegen Pools, die noch die alte
    // Sprache tragen — und setLanguage() leert DB synchron, es wären für einen
    // Moment gar keine.
    //
    // Sichtbar ist der Unterschied nur WÄHREND des Ladens, also wird hier
    // absichtlich nicht abgewartet: bei richtiger Reihenfolge hält useLanguage
    // sofort am await, bei falscher hat es die Rune schon gesetzt.
    reset(['de-DE']);
    await i18n.useLanguage('de');
    const { currentLanguage } = await import('../src/data.js');

    const running = i18n.switchLanguage('en');
    assert.equal(i18n.language(), 'de', 'die Rune ist dem Baum vorausgesprungen');
    assert.equal(currentLanguage(), 'de');

    await running;
    assert.equal(i18n.language(), 'en');
    assert.equal(currentLanguage(), 'en');
});

await ok('Die laufende Sprache löst nichts aus', async () => {
    reset(['de-DE']);
    await i18n.useLanguage('de');
    let heard = 0;
    const off = i18n.onLanguageChange(() => heard++);
    await i18n.switchLanguage(i18n.language());
    off();
    assert.equal(reloaded, false, 'unnötiges Neuladen');
    assert.equal(heard, 0, 'unnötiger Neuaufbau');
});

await ok('Eine unbekannte Sprache wird abgewiesen', async () => {
    reset(['de-DE']);
    await i18n.useLanguage('de');
    await i18n.switchLanguage('kl');
    assert.equal(localStorage.getItem(KEYS.language), null);
    assert.equal(i18n.language(), 'de');
    assert.equal(reloaded, false);
});

console.log('Oberflächentexte:');

await ok('initLanguage setzt das lang-Attribut', async () => {
    reset(['de-DE']);
    await i18n.initLanguage();
    assert.equal(document.documentElement.lang, 'de');
    assert.equal(i18n.language(), 'de');
});

await ok('t() liefert die Sprache, die läuft', async () => {
    await i18n.useLanguage('de');
    assert.equal(i18n.t('language.label'), 'Sprache');
    await i18n.useLanguage('en');
    assert.equal(i18n.t('language.label'), 'Language');
});

await ok('Ein fehlender Eintrag fällt auf Englisch und dann auf den Schlüssel', async () => {
    // Auf Deutsch gespielt: der Rückfall greift sichtbar, der Schlüssel bleibt
    // die letzte Stufe. Vor 6.0 zeigte diese Probe nur die letzte Stufe, weil
    // Deutsch selbst der Rückfall war - sie hätte einen falsch herum gedrehten
    // Rückfall nicht bemerkt.
    await i18n.useLanguage('de');
    assert.equal(i18n.t('language.label'), 'Sprache');
    assert.equal(i18n.t('gibt.es.nicht'), 'gibt.es.nicht');

    // Ein Schlüssel, den nur en.js trägt, gibt es im Bestand nicht - dafür
    // sorgt Regel 4 des Prüfers. Also wird einer eingesetzt und wieder
    // weggenommen: ohne Rückfall stünde hier der Schlüssel selbst.
    const { de } = await import('../src/i18n/de.js');
    const { en } = await import('../src/i18n/en.js');
    const key = 'language.label';
    const kept = de[key];
    delete de[key];
    assert.equal(i18n.t(key), en[key], 'fällt nicht auf Englisch');
    de[key] = kept;
});

await ok('Beide Wörterbücher tragen dieselben Schlüssel', async () => {
    const { de } = await import('../src/i18n/de.js');
    const { en } = await import('../src/i18n/en.js');
    const missing = Object.keys(de).filter(k => !(k in en));
    const extra   = Object.keys(en).filter(k => !(k in de));
    assert.deepEqual(missing, [], 'fehlt auf Englisch');
    assert.deepEqual(extra,   [], 'fehlt auf Deutsch');
});

console.log('Statisches Markup:');

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

await ok('data-i18n schreibt Text, nicht Markup', async () => {
    await i18n.useLanguage('de');
    const root = fakeRoot([['i18n', 'intro.archive']]);
    i18n.applyStaticStrings(root);
    assert.equal(root.nodes[0].textContent, 'Archiv');
    assert.equal(root.nodes[0].innerHTML, '', 'als Markup eingesetzt');
});

await ok('data-i18n-html schreibt Markup', async () => {
    await i18n.useLanguage('de');
    const root = fakeRoot([['i18nHtml', 'intro.pitch']]);
    i18n.applyStaticStrings(root);
    assert.ok(root.nodes[0].innerHTML.includes('<strong'), 'Markup fehlt');
    assert.equal(root.nodes[0].textContent, '', 'als Text eingesetzt');
});

await ok('data-i18n-attr setzt jedes genannte Attribut', async () => {
    await i18n.useLanguage('en');
    const root = fakeRoot([['i18nAttr', 'alt=intro.logoAlt;title=intro.archive']]);
    i18n.applyStaticStrings(root);
    assert.equal(root.nodes[0].attrs.alt, 'Layer8Problem logo');
    assert.equal(root.nodes[0].attrs.title, 'Archive');
});

await ok('Ein fehlender Schlüssel bleibt lesbar stehen', async () => {
    await i18n.useLanguage('de');
    const root = fakeRoot([['i18n', 'gibt.es.nicht']]);
    i18n.applyStaticStrings(root);
    assert.equal(root.nodes[0].textContent, 'gibt.es.nicht');
});

await ok('Die Sprache entscheidet, was eingesetzt wird', async () => {
    const root = fakeRoot([['i18n', 'intro.mode.day.name']]);
    await i18n.useLanguage('de');
    i18n.applyStaticStrings(root);
    assert.equal(root.nodes[0].textContent, 'Arbeitstag');
    await i18n.useLanguage('en');
    i18n.applyStaticStrings(root);
    assert.equal(root.nodes[0].textContent, 'Workday');
});

console.log('Steam-Präsenz:');

await ok('Jede Tätigkeit hat einen Text, jeder Text eine Tätigkeit', async () => {
    // Der Bogen reicht über drei Stellen, die nichts voneinander wissen:
    // engine_core sendet die Kennung, das Wörterbuch hält den Satz, und
    // make-steam-presence schreibt die .vdf daraus. Fehlt ein Satz, steht in
    // der Freundesliste ein nacktes "#Status_lunch" — sichtbar für andere,
    // unsichtbar für jeden Prüfer hier.
    const { PRESENCE_ALL } = await import('../src/engine/presence.js');
    const { de } = await import('../src/i18n/de.js');
    const { en } = await import('../src/i18n/en.js');

    for (const [name, dict] of [['de', de], ['en', en]]) {
        const vorhanden = Object.keys(dict).filter(k => k.startsWith('presence.'))
                                           .map(k => k.slice('presence.'.length));
        assert.deepEqual([...vorhanden].sort(), [...PRESENCE_ALL].sort(),
                         `${name}: presence.* und PRESENCE_ALL laufen auseinander`);
    }
});

await ok('Jeder Erfolg steht in der Steam-Reihenfolge, mit Titel und Hinweis', async () => {
    // Steamworks benennt Erfolge über ihre POSITION (NEW_ACHIEVEMENT_1_7_NAME),
    // und diese Position ist NICHT die der Datendatei — die drei Wochen-Erfolge
    // stehen dort oben und in Steam unten. Ein neuer Erfolg, der nicht hinten
    // angehängt wird, verschiebt alle folgenden: jeder Erfolg im Shop trüge
    // dann den Namen seines Nachbarn, in einer Sprache, die niemand hier liest.
    const { readFileSync } = await import('node:fs');
    const { achievements: dea } = await import('../src/data/de/data_achievements.js');
    const { achievements: ena } = await import('../src/data/en/data_achievements.js');

    const werkzeug = readFileSync(new URL('./make-steam-achievements.mjs', import.meta.url), 'utf-8');
    const block = werkzeug.slice(werkzeug.indexOf('const STEAM_ORDER'), werkzeug.indexOf('];', werkzeug.indexOf('const STEAM_ORDER')));
    const order = [...block.matchAll(/'([a-z_]+)'/g)].map(m => m[1]);

    assert.equal(order.length, dea.length, 'STEAM_ORDER und der Baum sind verschieden lang');
    assert.equal(new Set(order).size, order.length, 'eine Kennung steht doppelt in STEAM_ORDER');
    for (const baum of [['de', dea], ['en', ena]]) {
        const [name, tree] = baum;
        assert.deepEqual([...order].sort(), tree.map(a => a.id).sort(),
                         `${name}: STEAM_ORDER und der Baum führen verschiedene Erfolge`);
        for (const a of tree) {
            assert.ok(a.title, `${name}: ${a.id} ohne Titel`);
            assert.ok(a.hint,  `${name}: ${a.id} ohne hint — desc wäre ein Spoiler`);
        }
    }
});

console.log('Verdrahtung:');

await ok('Der Startbildschirm bietet jede Sprache an', async () => {
    // The switch in index.html is static markup with an inline handler, so
    // nothing in the module graph would notice if a language were added to
    // LANGUAGES and forgotten there. This is the only check that would.
    const { readFileSync } = await import('node:fs');
    const html = readFileSync(new URL('../index.html', import.meta.url), 'utf-8');
    for (const lang of i18n.LANGUAGES) {
        assert.ok(html.includes(`data-lang="${lang}"`), `kein Knopf für ${lang}`);
        assert.ok(html.includes(`engine.switchLanguage('${lang}')`), `nicht verdrahtet: ${lang}`);
        assert.ok(html.includes(`html[lang="${lang}"] .lang-opt[data-lang="${lang}"]`),
                  `keine Hervorhebung für ${lang}`);
    }
});

console.log('Aufgezeichnete Prosa (Rezepte):');

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

await ok('Ein Verweis in den Datenbaum folgt der Sprache', async () => {
    const r = await inBoth({ ref: { p: 'items', i: 'donut', path: ['use', 'log'] } });
    assert.ok(r.de && r.en, 'eine Seite lieferte nichts');
    assert.notEqual(r.de, r.en, 'der Verweis liefert in beiden Bäumen dasselbe');
});

await ok('Ein gezogener Zufallstreffer kommt als derselbe Treffer zurück', async () => {
    // Der Index wird aufgeschrieben, nicht das Ergebnis - beide Bäume tragen
    // dieselbe Listenlänge, das erzwingt lint-parity.
    const r = await inBoth({ ref: { p: 'special', path: ['leet', 1] } });
    assert.ok(r.de.startsWith('13:37') && r.en.startsWith('13:37'), 'nicht dieselbe Zeile');
    assert.notEqual(r.de, r.en);
});

await ok('Ein Wert im Satz wird mit aufgelöst', async () => {
    const r = await inBoth({ k: 'log.item.found', v: { item: itemNameValue('donut') } });
    assert.ok(r.de.includes('Donut'), r.de);
    assert.ok(r.en.includes('doughnut'), r.en);
});

await ok('Ein Rezept im Rezept löst über beide Ebenen auf', async () => {
    const r = await inBoth({ k: 'log.item.cooldown',
                             v: { line: { k: 'item.cooldown.fallback', v: { item: itemNameValue('donut') } },
                                  wait: 5 } });
    assert.ok(r.de.includes('Donut') && r.en.includes('doughnut'), JSON.stringify(r));
    assert.notEqual(r.de, r.en);
});

await ok('Eine Zeile aus 5.x bleibt stehen und wechselt nicht', async () => {
    const r = await inBoth({ msg: 'Zeile aus einem alten Spielstand' });
    assert.equal(r.de, r.en, 'ein Literal darf nicht wechseln');
    assert.equal(r.de, 'Zeile aus einem alten Spielstand');
});

await ok('Ein Rezept ins Leere entfällt, statt zu raten', async () => {
    // Inhalt wandert zwischen Fassungen. Lieber eine Zeile weniger als ein
    // Satz in der Sprache, aus der der Spieler gerade weggeschaltet hat.
    for (const kaputt of [{ ref: { i: 'gibt_es_nicht', path: ['x'] } },
                          { k: 'gibt.es.nicht' },
                          { k: 'log.item.found', v: { item: { ref: { i: 'weg', path: ['t'] } } } }]) {
        assert.equal(renderRecipe(kaputt), null, JSON.stringify(kaputt));
    }
    // Und ein Rezept, das zusätzlich einen Satz trüge, nimmt ihn NICHT. Ohne
    // diese Zeile bemerkt die Probe nicht, wenn der alte Rückfall zurückkommt:
    // die drei oben tragen gar keinen, es gäbe also nichts zu greifen.
    assert.equal(renderRecipe({ ref: { i: 'weg', path: ['x'] }, msg: 'alter Satz' }), null,
                 'ein Rezept greift wieder auf einen mitgespeicherten Satz zurück');
    assert.equal(renderRecipe({ k: 'gibt.es.nicht', msg: 'alter Satz' }), null,
                 'ein Schlüssel greift wieder auf einen mitgespeicherten Satz zurück');
});

await ok('Der Doppler-Schutz vergleicht Kennungen, nicht Sätze', async () => {
    const a = { k: 'log.item.found', v: { item: 'Donut' } };
    const b = { k: 'log.item.found', v: { item: 'Donut' } };
    const c = { k: 'log.item.found', v: { item: 'Hammer' } };
    assert.equal(recipeKey(a), recipeKey(b), 'dasselbe Ereignis zählt als verschieden');
    assert.notEqual(recipeKey(a), recipeKey(c), 'zwei Ereignisse fallen zusammen');
});

await ok('Kein aufgezeichnetes Feld hält noch einen fertigen Satz', async () => {
    // Die Regel, auf der das alles ruht: der Zustand hält die Kennung, die
    // Anzeige rendert. Ein Feld, das wieder Prosa speichert, bricht sie leise.
    const { freshDay } = await import('../src/engine/engine_state.svelte.js');
    const day = freshDay();
    for (const key of ['currentExcuse', 'activeNews']) {
        assert.ok(!(typeof day[key] === 'string' && day[key].length),
                  `${key} hält wieder Text statt einer Kennung`);
    }
    assert.deepEqual(day.boardNotes, [], 'boardNotes hält wieder Zettel statt Ids');
});

console.log(`\n${passed} Tests bestanden.`);
