#!/usr/bin/env node
/**
 * Layer8Problem - parity checker for the two data trees
 * ---------------------------------------------------------------
 * Location: tools/lint-parity.mjs   (run from the repository root)
 * Usage:    node tools/lint-parity.mjs [pool …]
 * Exits 1 on errors, so it works as a gate.
 *
 * lint-data.mjs checks one tree at a time and would happily pass two trees
 * that have drifted apart. This one holds them against each other.
 *
 * What it is for: translating is editing, and editing a 300 kB file by hand
 * loses things. An event that never got copied across, a `m: 30` that became
 * `m: 3` while a sentence around it was rewritten, a story flag with a typo -
 * none of that produces an error. The English edition simply plays slightly
 * differently, and nobody can say where.
 *
 * The rule this rests on: the two trees carry the SAME ids, flags, item names
 * and numbers. Only the prose differs. That is what makes a save language
 * independent (see src/data.js), so it is not a convention - it is the thing
 * the whole design leans on.
 *
 * Checked:
 *   1. same shape       every key, array length and nesting
 *   2. same ids         id, next, reqStory, req, rem, loot, char, seen, flag
 *   3. same numbers     m, f, a, c, timer, rep values, thresholds - all of it
 *   4. prose differs    a text identical in both trees is untranslated, which
 *                       is reported as a to-do, not an error
 *
 * Not checked: whether the English is any good. No tool can do that.
 */

import { readdirSync } from 'fs';
import { DB, loadCore, ensure, setLanguage } from '../src/data.js';

const POOLS = [
    'board', 'bossfights', 'calls', 'coffee', 'compendium', 'diary', 'emails',
    'intranet', 'lore', 'lunch', 'meetings', 'party', 'reputation', 'server', 'sidequests',
    'achievements', 'chars', 'excuses', 'items', 'moods', 'newsTicker',
    'special', 'tutorial'
];

const LAZY = POOLS.slice(0, 15);

/** Keys whose value is an identifier: it must be identical in both trees. */
const ID_KEYS = new Set([
    'id', 'next', 'reqStory', 'req', 'rem', 'loot', 'char', 'onChar', 'kind',
    'seen', 'flag', 'startNode', 'startNodeGala', 'img', 'nextEmail', 'cat',
    'effect', 'fn', 'loc', 'checkPool', 'type', 'tone', 'icon', 'senderId'
]);

const wanted = process.argv.slice(2).filter(a => !a.startsWith('-'));
const pools = wanted.length ? wanted : POOLS;

const errors = [], todos = [];
const err = m => errors.push(m);

/** Snapshot one tree, so both are in memory at the same time. */
async function snapshot(lang) {
    await setLanguage(lang);
    await loadCore(lang);
    await ensure(...LAZY);
    return JSON.parse(JSON.stringify(Object.fromEntries(POOLS.map(p => [p, DB[p]]))));
}

/* ---------- 0) Both trees have to hold the same FILES ---------- */
// Before anything is compared: a pool missing from one tree does not fail the
// data linter for the other, and the bundler only notices at RUNTIME - it
// throws "Unknown variable dynamic import" in the player's browser and leaves
// the game with an empty database. Cheap to check here, expensive to find there.
{
  const list = (lang) => {
    try {
      return new Set(readdirSync(new URL(`../src/data/${lang}/`, import.meta.url))
        .filter(f => f.endsWith('.js')));
    } catch {
      err(`src/data/${lang}/ is missing entirely`);
      return new Set();
    }
  };
  const deFiles = list('de'), enFiles = list('en');
  for (const f of deFiles) if (!enFiles.has(f)) err(`src/data/en/${f} is missing - the build only fails in the browser`);
  for (const f of enFiles) if (!deFiles.has(f)) err(`src/data/de/${f} is missing - the build only fails in the browser`);
  for (const name of POOLS) {
    const file = `data_${name}.js`;
    for (const [lang, files] of [['de', deFiles], ['en', enFiles]])
      if (!files.has(file)) err(`src/data/${lang}/${file} is missing but listed in data.js`);
  }
}

const de = await snapshot('de');
const en = await snapshot('en');

/** Text long enough that leaving it identical is a decision, not a coincidence. */
const isProse = (value) => typeof value === 'string' && value.trim().split(/\s+/).length >= 4;

function compare(a, b, path) {
    if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b)) {
            err(`${path}: a list on one side, not on the other`);
            return;
        }
        if (a.length !== b.length) {
            err(`${path}: ${a.length} entries in German, ${b.length} in English`);
            return;
        }
        a.forEach((item, i) => compare(item, b[i], `${path}[${i}]`));
        return;
    }

    if (a && b && typeof a === 'object' && typeof b === 'object') {
        const keysA = Object.keys(a), keysB = Object.keys(b);
        for (const k of keysA) if (!(k in b)) err(`${path}.${k}: missing from the English tree`);
        for (const k of keysB) if (!(k in a)) err(`${path}.${k}: missing from the German tree`);
        for (const k of keysA) if (k in b) compare(a[k], b[k], `${path}.${k}`);
        return;
    }

    if (typeof a !== typeof b) {
        err(`${path}: ${typeof a} against ${typeof b}`);
        return;
    }

    // Numbers carry the balance. One changed number and the English edition
    // plays differently, with nothing on screen to show it.
    if (typeof a === 'number' && a !== b) {
        err(`${path}: ${a} against ${b} - figures are not a translation`);
        return;
    }
    if (typeof a === 'boolean' && a !== b) {
        err(`${path}: ${a} against ${b}`);
        return;
    }

    if (typeof a === 'string') {
        const key = path.slice(path.lastIndexOf('.') + 1).replace(/\[\d+\]$/, '');
        if (ID_KEYS.has(key)) {
            if (a !== b) err(`${path}: id "${a}" against "${b}" - ids stay the same`);
            return;
        }
        if (a === b && isProse(a)) todos.push(`${path}: "${a.slice(0, 70)}${a.length > 70 ? '…' : ''}"`);
    }
}

for (const pool of pools) {
    if (!(pool in de)) { err(`Unbekannter Pool: ${pool}`); continue; }
    compare(de[pool], en[pool], pool);
}

/* ---------- Report ---------- */

console.log(`\nThe two language trees in step - ${pools.length} pools checked`);

if (errors.length) {
    console.log(`\nFEHLER (${errors.length})\n`);
    for (const m of errors.slice(0, 60)) console.log(` ✗ ${m}`);
    if (errors.length > 60) console.log(`   … and ${errors.length - 60} more`);
}

// Not an error: during the translation this is the work still ahead. It only
// becomes a finding once a pool is marked translated.
console.log(`\nNOCH DEUTSCH (${todos.length} Textstellen)\n`);
for (const m of todos.slice(0, 15)) console.log(` i ${m}`);
if (todos.length > 15) console.log(`   … and ${todos.length - 15} more`);

if (!errors.length) console.log('\n✅ Both trees run in step.\n');
else console.log('');

process.exitCode = errors.length ? 1 : 0;
