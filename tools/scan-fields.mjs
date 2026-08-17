#!/usr/bin/env node
/**
 * Layer8Problem - field scanner across both data trees
 * ---------------------------------------------------------------
 * Location: tools/scan-fields.mjs   (run from the repository root)
 * Usage:    node tools/scan-fields.mjs <pool> [--list] [--german] [--key=sender]
 *           node tools/scan-fields.mjs emails
 *           node tools/scan-fields.mjs emails --list --german
 *           node tools/scan-fields.mjs intranet --key=status
 *
 * Never a gate. Always exits 0.
 *
 * Why this exists, and why it kept being rewritten from scratch:
 *
 * `lint-parity` reports prose that is identical in both trees - but only where
 * it has at least FOUR words:
 *
 *     const isProse = (v) => typeof v === 'string' && v.trim().split(/\s+/).length >= 4;
 *
 * That floor is right for lint-parity (a two-word label being identical is
 * usually correct, not a to-do) and wrong for anyone using the number as a
 * work list. In the intranet block the whole `status` section - 30 German
 * fields, exactly one of them four words long - never appeared in the work
 * list at all, because the list had been drawn from lint-parity and inherited
 * its floor. A floor does not merely understate; it can make a whole section
 * invisible. Same trap in the mail pool, harder: 157 of 161 `sender` lines sit
 * below the floor, and that is the very field the CC list keys off.
 *
 * So this tool walks both trees in parallel and reports EVERY text field, with
 * no word floor, grouped by entry. Completeness of a block is proven here,
 * per entry over all fields - not off the parity number.
 *
 * The German detector is the one from GLOSSAR section 7b, case twenty-one: the
 * earlier `/[äöüß]|\bnicht\b/` missed "Das ist ein deutscher Satz." entirely
 * and reported clean. It is a sieve, not a guarantee - "Seit 2019 in Kraft"
 * still slips through - so the fields are read, not just counted.
 */

import { DB, ensure, loadCore, setLanguage } from '../src/data.js';

/* ---------- configuration ---------- */

/**
 * Keys whose value is an identifier rather than prose. Kept in step with
 * lint-parity.mjs by hand: importing it would run the whole check.
 */
const ID_KEYS = new Set([
    'id', 'next', 'reqStory', 'req', 'rem', 'loot', 'char', 'onChar', 'kind',
    'seen', 'flag', 'startNode', 'startNodeGala', 'img', 'nextEmail', 'cat',
    'effect', 'fn', 'loc', 'checkPool', 'type', 'tone', 'icon', 'senderId'
]);

/**
 * Umlauts plus German function words that have no English twin. Proven in
 * both directions before use - see the self-test below.
 */
const GERMAN = /[äöüßÄÖÜ]|\b(nicht|und|der|das|ist|ein|eine|sich|dass|wird|auf|mit|dem|von|sagt|aber|oder|noch|schon|wie|sie|ihr|dich|dir|du|den|im|zum|zur)\b/i;

/* ---------- self-test: a detector that never fires looks like success ---------- */

if (!GERMAN.test('Der Chef sieht dich an und sagt nichts dazu.') ||
    GERMAN.test('The boss looks at you and says nothing about it.')) {
    console.error('Der Sprachdetektor ist kaputt — Abbruch, bevor er etwas durchwinkt.');
    process.exit(1);
}

/* ---------- arguments ---------- */

const args = process.argv.slice(2);
const pools = args.filter(a => !a.startsWith('--'));
const showList = args.includes('--list');
const onlyGerman = args.includes('--german');
const keyFilter = (args.find(a => a.startsWith('--key=')) || '').slice(6);

if (!pools.length) {
    console.error('Aufruf: node tools/scan-fields.mjs <pool> [--list] [--german] [--key=feld]');
    process.exit(1);
}

/* ---------- load both trees ---------- */

async function snapshot(lang) {
    await setLanguage(lang);
    await loadCore(lang);
    await ensure(...pools);
    return JSON.parse(JSON.stringify(Object.fromEntries(pools.map(p => [p, DB[p]]))));
}

const de = await snapshot('de');
const en = await snapshot('en');

/* ---------- walk ---------- */

/**
 * Collect every text field of one entry, in parallel across both trees.
 * Paths are relative to the entry, so `opts[0].t` reads the same everywhere.
 */
function collect(a, b, path, out) {
    if (Array.isArray(a) && Array.isArray(b)) {
        a.forEach((item, i) => collect(item, b[i], `${path}[${i}]`, out));
        return;
    }
    if (a && b && typeof a === 'object' && typeof b === 'object') {
        for (const k of Object.keys(a)) collect(a[k], b[k], path ? `${path}.${k}` : k, out);
        return;
    }
    if (typeof a !== 'string') return;

    const key = path.slice(path.lastIndexOf('.') + 1).replace(/\[\d+\]$/, '');
    if (ID_KEYS.has(key)) return;
    if (keyFilter && key !== keyFilter) return;

    out.push({ path, key, de: a, en: typeof b === 'string' ? b : '' });
}

/** Split a pool into entries: array items by id, plain objects by top-level key. */
function entries(pool) {
    if (Array.isArray(pool)) return pool.map((e, i) => [e?.id ?? `[${i}]`, e]);
    if (pool && typeof pool === 'object') return Object.entries(pool);
    return [];
}

let grandTotal = 0, grandSame = 0, grandGerman = 0;
const perKey = new Map();

for (const name of pools) {
    const deEntries = entries(de[name]);
    const enPool = en[name];
    const enEntries = new Map(entries(enPool));

    console.log(`\n=== ${name} — ${deEntries.length} Einträge ===\n`);

    for (const [id, deEntry] of deEntries) {
        const enEntry = Array.isArray(enPool)
            ? entries(enPool).find(([k]) => k === id)?.[1]
            : enEntries.get(id);

        const fields = [];
        collect(deEntry, enEntry, '', fields);
        if (!fields.length) continue;

        const same = fields.filter(f => f.de === f.en);
        grandTotal += fields.length;
        grandSame += same.length;

        for (const f of fields) {
            const stat = perKey.get(f.key) ?? { total: 0, same: 0, german: 0, long: 0 };
            stat.total++;
            if (f.de === f.en) {
                stat.same++;
                if (GERMAN.test(f.de)) { stat.german++; grandGerman++; }
                if (f.de.trim().split(/\s+/).length >= 4) stat.long++;
            }
            perKey.set(f.key, stat);
        }

        const flagged = onlyGerman ? same.filter(f => GERMAN.test(f.de)) : same;
        const mark = same.length === 0 ? '✓' : ' ';
        console.log(`${mark} ${id}: ${fields.length} Felder, ${same.length} identisch`);

        if (showList) {
            for (const f of flagged) {
                const words = f.de.trim().split(/\s+/).length;
                const seen = words >= 4 ? 'parity' : '  —   ';
                const de4 = GERMAN.test(f.de) ? 'DE' : '  ';
                console.log(`    [${seen}] ${de4} ${f.path}: ${JSON.stringify(f.de.slice(0, 90))}`);
            }
        }
    }
}

/* ---------- summary ---------- */

console.log(`\n--- je Feld ---`);
const width = Math.max(...[...perKey.keys()].map(k => k.length), 8);
for (const [key, s] of [...perKey].sort((a, b) => b[1].total - a[1].total)) {
    console.log(
        `${key.padEnd(width)}  gesamt ${String(s.total).padStart(5)}` +
        `   identisch ${String(s.same).padStart(5)}` +
        `   davon deutsch ${String(s.german).padStart(5)}` +
        `   >=4 Wörter ${String(s.long).padStart(5)}  (nur die sieht lint-parity)`
    );
}

console.log(
    `\nGESAMT  ${grandTotal} Textfelder · ${grandSame} identisch · ` +
    `${grandTotal - grandSame} verschieden · ${grandGerman} der identischen sind erkennbar deutsch`
);
console.log(
    `Der Detektor ist ein Sieb, keine Garantie: "Seit 2019 in Kraft" trägt keines ` +
    `seiner Wörter.\nJedes identische Feld gehört gelesen, nicht gezählt.`
);
