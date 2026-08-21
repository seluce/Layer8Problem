#!/usr/bin/env node
/**
 * Layer8Problem - image reference linter
 * ---------------------------------------------------------------
 * Location: tools/lint-assets.mjs   (run from the repository root)
 * Usage:    node tools/lint-assets.mjs
 * Exits 1 on errors, so it works as a gate like the other three.
 *
 * It exists because a wrong image path fails QUIETLY, and worse than most
 * things do. Every <img> in this project carries an onerror that swaps in an
 * emoji, so a path into the wrong folder does not throw and does not leave a
 * gap - it shows a perfectly reasonable-looking emoji, and nobody notices the
 * drawing is missing. H.A.L.G.E.R.D. sat in the start sequence like that for a
 * whole release.
 *
 * The trap is the folder, not the file name: the same icon name is resolved
 * against different folders depending on who asks (CLAUDE.md).
 *
 *   SettingsView            -> assets/img/ui/
 *   EventView, Terminal, ActionBar -> assets/img/actions/
 *   the party foyer         -> assets/img/party/
 *
 * What it checks:
 *   1. every literal assets/img/... path in the markup, the components and the
 *      engine points at a file that exists
 *   2. every img: field in both data trees points at a file that exists
 *   3. the paths BUILT AT RUNTIME, per pattern, against the values that can
 *      reach them - this is the half a grep never sees
 *   4. any runtime-built path it does not recognise is reported, so a new one
 *      cannot slip past unchecked. That is the point: the linter would rather
 *      complain about a pattern it has not been taught than stay quiet.
 *
 * Deliberately NOT an error: an image file nobody references. Sometimes a
 * drawing lands before the event that uses it.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const PUBLIC = join(ROOT, 'public');

const errors = [], warns = [], infos = [];
const err = m => errors.push(m), warn = m => warns.push(m), info = m => infos.push(m);

/** Does public/<path> exist? Every path in the sources is relative to public/. */
const onDisk = (p) => existsSync(join(PUBLIC, p));

/* ---------- collect the sources ---------- */

const files = [];
function walk(dir) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) {
            if (entry === 'node_modules') continue;
            walk(full);
        } else if (/\.(js|mjs|svelte|html)$/.test(entry)) {
            files.push(full);
        }
    }
}
walk(join(ROOT, 'src'));
files.push(join(ROOT, 'index.html'));

/* ---------- 1) literal paths ---------- */

const LITERAL = /assets\/img\/[a-z]+\/[A-Za-z0-9_.-]+\.(?:webp|png|svg|ico)/g;
let literalCount = 0;

for (const file of files) {
    const text = readFileSync(file, 'utf-8');
    const where = relative(ROOT, file);
    for (const hit of new Set(text.match(LITERAL) ?? [])) {
        literalCount++;
        if (!onDisk(hit)) err(`${where}: "${hit}" does not exist`);
    }
}

/* ---------- 2) img: out of the data trees ---------- */

let fromData = 0;
for (const lang of ['de', 'en']) {
    const { achievements } = await import(`../src/data/${lang}/data_achievements.js`);
    for (const a of achievements) {
        if (!a.img) continue;
        fromData++;
        if (!onDisk(a.img)) err(`data_achievements (${lang}): ${a.id} points at "${a.img}" - there is no such file`);
    }
}

/* ---------- 3) the paths built at runtime ---------- */

/*
 * Each entry names one interpolation in the sources and every value that can
 * reach it. `candidates` reads those values back out of the same file, so the list
 * cannot fall behind the code: add a fifth action button and the check covers
 * it on the next run without anybody remembering this file.
 */
const source = (p) => readFileSync(join(ROOT, p), 'utf-8');

/** Every checkPool a party option carries, out of both trees. */
const PARTY_POOLS = await (async () => {
    const s = new Set();
    for (const lang of ['de', 'en']) {
        const { party } = await import(`../src/data/${lang}/data_party.js`);
        for (const ev of party) for (const o of ev.opts ?? []) if (o.checkPool) s.add(o.checkPool);
    }
    return [...s];
})();

const RUNTIME_PATTERNS = [
    {
        where: 'src/components/ActionBar.svelte',
        what: 'assets/img/actions/act_{action.type}.webp',
        candidates: () => [...source('src/components/ActionBar.svelte')
            .matchAll(/type:\s*'([a-z]+)'/g)].map(m => m[1]),
        buildPath: (v) => `assets/img/actions/act_${v}.webp`,
    },
    {
        where: 'src/components/SettingsView.svelte',
        what: 'assets/img/ui/{row.img}.webp',
        candidates: () => [...source('src/components/SettingsView.svelte')
            .matchAll(/img:\s*'([A-Za-z0-9_-]+)'/g)].map(m => m[1]),
        buildPath: (v) => `assets/img/ui/${v}.webp`,
    },
    {
        // The event frame, one look per event type - plus the FALLBACK, which
        // is the one nobody thinks of and the one that shows up when a type is
        // unknown.
        where: 'src/components/EventView.svelte',
        what: 'assets/img/actions/{style.img}.webp',
        candidates: () => [...source('src/components/EventView.svelte')
            .matchAll(/img:\s*'(act_[A-Za-z0-9_-]+)'/g)].map(m => m[1]),
        buildPath: (v) => `assets/img/actions/${v}.webp`,
    },
    {
        // The idle monitor: the plain system screen and H.A.L.G.E.R.D. - the
        // very icon that sat in the wrong folder for a whole release.
        where: 'src/components/Terminal.svelte',
        what: 'assets/img/actions/{idle.img}.webp',
        candidates: () => [...source('src/components/Terminal.svelte')
            .matchAll(/img:\s*'(act_[A-Za-z0-9_-]+)'/g)].map(m => m[1]),
        buildPath: (v) => `assets/img/actions/${v}.webp`,
    },
    {
        // The stations of the party foyer. The values are not in the component
        // at all - they come out of the DATA tree, as checkPool on a party
        // option, and CLAUDE.md notes that nothing validates them.
        where: 'src/components/EventView.svelte',
        what: 'assets/img/party/{o.opt.checkPool}.webp',
        candidates: () => PARTY_POOLS,
        buildPath: (v) => `assets/img/party/${v}.webp`,
    },
];

let builtCount = 0;
for (const m of RUNTIME_PATTERNS) {
    const candidates = [...new Set(m.candidates())];
    if (!candidates.length) {
        err(`${m.where}: no values found for "${m.what}" - has the spelling changed?`);
        continue;
    }
    for (const v of candidates) {
        builtCount++;
        if (!onDisk(m.buildPath(v))) err(`${m.where}: "${m.buildPath(v)}" does not exist (from "${m.what}")`);
    }
    info(`${m.what} - ${candidates.length} values checked`);
}

/* ---------- 4) the net: an unknown runtime pattern ---------- */

/*
 * Anything that reads assets/img/<folder>/ and then opens a brace is a path
 * this file has to know about. The two above are subtracted by their location;
 * whatever is left is new and unchecked.
 */
const BUILT_AT_RUNTIME = /assets\/img\/[a-z]+\/[^"'`\s]*[{$]/g;
// Per FOLDER, not per file: EventView builds two of them, and a file that
// already carries one known pattern must not go blind for a second.
const knownPatterns = new Set(RUNTIME_PATTERNS.map(m => m.where + '|' + m.what.replace(/\{.*$/, '')));

for (const file of files) {
    const where = relative(ROOT, file);
    for (const hit of new Set(readFileSync(file, 'utf-8').match(BUILT_AT_RUNTIME) ?? [])) {
        if (knownPatterns.has(where + '|' + hit.replace(/[{$].*$/, ''))) continue;
        warn(`${where}: "${hit}…" is built at runtime and checked by nothing - add the pattern in tools/lint-assets.mjs`);
    }
}

/* ---------- Report ---------- */

const stockCount = (() => {
    let n = 0;
    const countDir = (d) => { for (const e of readdirSync(d)) {
        const f = join(d, e);
        statSync(f).isDirectory() ? countDir(f) : n++;
    } };
    countDir(join(PUBLIC, 'assets/img'));
    return n;
})();

console.log(`\nImage references: ${literalCount} fixed, ${fromData} from the data trees, ${builtCount} built at runtime - stock ${stockCount} files`);
for (const i of infos) console.log(` i ${i}`);
for (const w of warns) console.log(` ! ${w}`);
for (const e of errors) console.log(` ✗ ${e}`);

if (errors.length) {
    console.log(`\n❌ ${errors.length} image reference(s) lead nowhere\n`);
    process.exit(1);
}
console.log(`\n✅ Every image reference finds its file${warns.length ? ` (${warns.length} warning(s))` : ''}\n`);
