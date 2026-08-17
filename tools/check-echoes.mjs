#!/usr/bin/env node
/**
 * Layer8Problem - word-sequence echo check for a freshly translated pool
 * ---------------------------------------------------------------
 * Location: tools/check-echoes.mjs   (run from the repository root)
 * Usage:    node tools/check-echoes.mjs <pool> [--n=4] [--lang=en] [--min=2]
 *           node tools/check-echoes.mjs emails
 *           node tools/check-echoes.mjs emails --n=6
 *
 * Never a gate. Always exits 0.
 *
 * The finding this is built for, from GLOSSAR section 7b:
 *
 *     Where German has several words for the same thing and English has one
 *     obvious one, the echo is BORN IN THE TRANSLATION and appears in no
 *     source. "Du gehst ran." and "Du nimmst ab." both become "You pick up."
 *
 * `report-prose.mjs` cannot see those: its section 2 starts at FIVE words, and
 * many of these are four ("in the middle of", "the two of you"). So this runs
 * beside report-prose, not behind it.
 *
 * Two questions, one pass:
 *   1. Which sequences of the block also stand in the ALREADY TRANSLATED files?
 *      Those get repaired on the NEW side; the old inventory is left alone.
 *   2. Which sequences run across more than `--min` entries WITHIN the block?
 *
 * And the step that has caught something in three blocks out of four: measure
 * again after every repair. A repair can itself be an echo - "the two of you"
 * became "the pair of you", which was already in the inventory twice. Run this
 * after each round and watch the numbers fall monotonically. If one goes up,
 * the last repair was one.
 */

import { DB, ensure, loadCore, setLanguage } from '../src/data.js';

/* ---------- configuration ---------- */

/** Keys that hold identifiers rather than prose. In step with lint-parity.mjs. */
const ID_KEYS = new Set([
    'id', 'next', 'reqStory', 'req', 'rem', 'loot', 'char', 'onChar', 'kind',
    'seen', 'flag', 'startNode', 'startNodeGala', 'img', 'nextEmail', 'cat',
    'effect', 'fn', 'loc', 'checkPool', 'type', 'tone', 'icon'
]);

/**
 * The pools whose files carry `i18n-status: translated`. This is the corpus a
 * fresh block is held against. Read off the headers of src/data/en/ - keep it
 * in step when a file is finished, or a block gets measured against a corpus
 * that is still German and every sequence looks unique.
 */
// All 23 pools as of the twentieth session: the last ten (achievements, board,
// bossfights, chars, diary, excuses, moods, newsTicker, party, tutorial) were
// finished there, so nothing is left to compare a block against that is still
// German.
const TRANSLATED = ['achievements', 'board', 'bossfights', 'calls', 'chars',
                    'coffee', 'compendium', 'diary', 'emails', 'excuses',
                    'intranet', 'items', 'lore', 'lunch', 'meetings', 'moods',
                    'newsTicker', 'party', 'reputation', 'server', 'sidequests',
                    'special', 'tutorial'];

/* ---------- arguments ---------- */

const args = process.argv.slice(2);
const pools = args.filter(a => !a.startsWith('--'));
const N = Number((args.find(a => a.startsWith('--n=')) || '--n=4').slice(4));
const MIN = Number((args.find(a => a.startsWith('--min=')) || '--min=2').slice(6));
const lang = (args.find(a => a.startsWith('--lang=')) || '--lang=en').slice(7);

if (!pools.length) {
    console.error('Aufruf: node tools/check-echoes.mjs <pool> [--n=4] [--min=2]');
    process.exit(1);
}

const corpus = TRANSLATED.filter(p => !pools.includes(p));

/* ---------- load ---------- */

await setLanguage(lang);
await loadCore(lang);
await ensure(...pools, ...corpus);

/* ---------- walk ---------- */

/** Every text field of a value, tagged with the entry it belongs to. */
function texts(node, id, out) {
    if (Array.isArray(node)) { node.forEach(x => texts(x, id, out)); return; }
    if (node && typeof node === 'object') {
        for (const [k, v] of Object.entries(node)) {
            if (typeof v === 'string' && ID_KEYS.has(k)) continue;
            texts(v, id, out);
        }
        return;
    }
    if (typeof node === 'string' && node.trim()) out.push({ id, text: node });
}

function harvest(pool) {
    const out = [];
    const data = DB[pool];
    if (Array.isArray(data)) data.forEach((e, i) => texts(e, e?.id ?? `${pool}[${i}]`, out));
    else if (data && typeof data === 'object')
        for (const [k, v] of Object.entries(data)) texts(v, `${pool}.${k}`, out);
    return out;
}

/** Words, lower case, punctuation dropped - the same normalisation as report-prose. */
const words = (s) => s.toLowerCase()
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^\p{L}\p{N}\s']/gu, ' ')
    .split(/\s+/).filter(Boolean);

/** id set per n-gram. */
function grams(entries) {
    const map = new Map();
    for (const { id, text } of entries) {
        const w = words(text);
        for (let i = 0; i + N <= w.length; i++) {
            const g = w.slice(i, i + N).join(' ');
            (map.get(g) ?? map.set(g, new Set()).get(g)).add(id);
        }
    }
    return map;
}

const blockGrams = grams(pools.flatMap(harvest));
const oldGrams = grams(corpus.flatMap(harvest));

/* ---------- report ---------- */

console.log(`\n=== ${pools.join(', ')} — ${N}-Wort-Folgen (${lang}) ===`);
console.log(`Alter Bestand: ${corpus.join(', ')}\n`);

const crossing = [];
for (const [g, ids] of blockGrams) {
    const old = oldGrams.get(g);
    if (old) crossing.push({ g, ids: [...ids], old: [...old] });
}
crossing.sort((a, b) => (b.ids.length + b.old.length) - (a.ids.length + a.old.length));

console.log(`--- 1) auch im alten Bestand: ${crossing.length} Folgen ---`);
for (const { g, ids, old } of crossing) {
    console.log(`  "${g}"`);
    console.log(`      Block: ${ids.slice(0, 4).join(', ')}${ids.length > 4 ? ` (+${ids.length - 4})` : ''}`);
    console.log(`      alt  : ${old.slice(0, 4).join(', ')}${old.length > 4 ? ` (+${old.length - 4})` : ''}`);
}

const inner = [...blockGrams].filter(([, ids]) => ids.size > MIN)
    .sort((a, b) => b[1].size - a[1].size);

console.log(`\n--- 2) über mehr als ${MIN} Einträge im Block: ${inner.length} Folgen ---`);
for (const [g, ids] of inner) {
    console.log(`  ${String(ids.size).padStart(2)}× "${g}"  ${[...ids].slice(0, 5).join(', ')}`);
}

console.log(
    `\nZahlen zum Fortschreiben: ${crossing.length} gegen den alten Bestand, ` +
    `${inner.length} innerhalb des Blocks.\n` +
    `Nach JEDER Reparatur noch einmal laufen lassen — in drei von vier Blöcken war\n` +
    `eine Reparatur selbst ein Echo, und dann steigt die Zahl statt zu fallen.`
);
