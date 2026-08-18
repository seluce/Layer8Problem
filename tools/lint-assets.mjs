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
const vorhanden = (p) => existsSync(join(PUBLIC, p));

/* ---------- collect the sources ---------- */

const dateien = [];
function walk(dir) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) {
            if (entry === 'node_modules') continue;
            walk(full);
        } else if (/\.(js|mjs|svelte|html)$/.test(entry)) {
            dateien.push(full);
        }
    }
}
walk(join(ROOT, 'src'));
dateien.push(join(ROOT, 'index.html'));

/* ---------- 1) literal paths ---------- */

const LITERAL = /assets\/img\/[a-z]+\/[A-Za-z0-9_.-]+\.(?:webp|png|svg|ico)/g;
let literale = 0;

for (const datei of dateien) {
    const text = readFileSync(datei, 'utf-8');
    const wo = relative(ROOT, datei);
    for (const treffer of new Set(text.match(LITERAL) ?? [])) {
        literale++;
        if (!vorhanden(treffer)) err(`${wo}: "${treffer}" gibt es nicht`);
    }
}

/* ---------- 2) img: out of the data trees ---------- */

let ausDaten = 0;
for (const lang of ['de', 'en']) {
    const { achievements } = await import(`../src/data/${lang}/data_achievements.js`);
    for (const a of achievements) {
        if (!a.img) continue;
        ausDaten++;
        if (!vorhanden(a.img)) err(`data_achievements (${lang}): ${a.id} zeigt auf "${a.img}" — gibt es nicht`);
    }
}

/* ---------- 3) the paths built at runtime ---------- */

/*
 * Each entry names one interpolation in the sources and every value that can
 * reach it. `werte` reads those values back out of the same file, so the list
 * cannot fall behind the code: add a fifth action button and the check covers
 * it on the next run without anybody remembering this file.
 */
const quelle = (p) => readFileSync(join(ROOT, p), 'utf-8');

/** Every checkPool a party option carries, out of both trees. */
const PARTY_POOLS = await (async () => {
    const s = new Set();
    for (const lang of ['de', 'en']) {
        const { party } = await import(`../src/data/${lang}/data_party.js`);
        for (const ev of party) for (const o of ev.opts ?? []) if (o.checkPool) s.add(o.checkPool);
    }
    return [...s];
})();

const MUSTER = [
    {
        wo: 'src/components/ActionBar.svelte',
        was: 'assets/img/actions/act_{action.type}.webp',
        werte: () => [...quelle('src/components/ActionBar.svelte')
            .matchAll(/type:\s*'([a-z]+)'/g)].map(m => m[1]),
        pfad: (v) => `assets/img/actions/act_${v}.webp`,
    },
    {
        wo: 'src/components/SettingsView.svelte',
        was: 'assets/img/ui/{row.img}.webp',
        werte: () => [...quelle('src/components/SettingsView.svelte')
            .matchAll(/img:\s*'([A-Za-z0-9_-]+)'/g)].map(m => m[1]),
        pfad: (v) => `assets/img/ui/${v}.webp`,
    },
    {
        // The event frame, one look per event type - plus the FALLBACK, which
        // is the one nobody thinks of and the one that shows up when a type is
        // unknown.
        wo: 'src/components/EventView.svelte',
        was: 'assets/img/actions/{style.img}.webp',
        werte: () => [...quelle('src/components/EventView.svelte')
            .matchAll(/img:\s*'(act_[A-Za-z0-9_-]+)'/g)].map(m => m[1]),
        pfad: (v) => `assets/img/actions/${v}.webp`,
    },
    {
        // The idle monitor: the plain system screen and H.A.L.G.E.R.D. - the
        // very icon that sat in the wrong folder for a whole release.
        wo: 'src/components/Terminal.svelte',
        was: 'assets/img/actions/{idle.img}.webp',
        werte: () => [...quelle('src/components/Terminal.svelte')
            .matchAll(/img:\s*'(act_[A-Za-z0-9_-]+)'/g)].map(m => m[1]),
        pfad: (v) => `assets/img/actions/${v}.webp`,
    },
    {
        // The stations of the party foyer. The values are not in the component
        // at all - they come out of the DATA tree, as checkPool on a party
        // option, and CLAUDE.md notes that nothing validates them.
        wo: 'src/components/EventView.svelte',
        was: 'assets/img/party/{o.opt.checkPool}.webp',
        werte: () => PARTY_POOLS,
        pfad: (v) => `assets/img/party/${v}.webp`,
    },
];

let gebaut = 0;
for (const m of MUSTER) {
    const werte = [...new Set(m.werte())];
    if (!werte.length) {
        err(`${m.wo}: keine Werte für "${m.was}" gefunden — hat sich die Schreibweise geändert?`);
        continue;
    }
    for (const v of werte) {
        gebaut++;
        if (!vorhanden(m.pfad(v))) err(`${m.wo}: "${m.pfad(v)}" gibt es nicht (aus "${m.was}")`);
    }
    info(`${m.was} — ${werte.length} Werte geprüft`);
}

/* ---------- 4) the net: an unknown runtime pattern ---------- */

/*
 * Anything that reads assets/img/<folder>/ and then opens a brace is a path
 * this file has to know about. The two above are subtracted by their location;
 * whatever is left is new and unchecked.
 */
const GEBAUT = /assets\/img\/[a-z]+\/[^"'`\s]*[{$]/g;
// Per FOLDER, not per file: EventView builds two of them, and a file that
// already carries one known pattern must not go blind for a second.
const bekannt = new Set(MUSTER.map(m => m.wo + '|' + m.was.replace(/\{.*$/, '')));

for (const datei of dateien) {
    const wo = relative(ROOT, datei);
    for (const treffer of new Set(readFileSync(datei, 'utf-8').match(GEBAUT) ?? [])) {
        if (bekannt.has(wo + '|' + treffer.replace(/[{$].*$/, ''))) continue;
        warn(`${wo}: "${treffer}…" wird zur Laufzeit zusammengesetzt und von nichts geprüft — Muster in tools/lint-assets.mjs eintragen`);
    }
}

/* ---------- Report ---------- */

const bestand = (() => {
    let n = 0;
    const zaehl = (d) => { for (const e of readdirSync(d)) {
        const f = join(d, e);
        statSync(f).isDirectory() ? zaehl(f) : n++;
    } };
    zaehl(join(PUBLIC, 'assets/img'));
    return n;
})();

console.log(`\nBildverweise: ${literale} feste, ${ausDaten} aus den Datenbäumen, ${gebaut} zur Laufzeit gebaut — Bestand ${bestand} Dateien`);
for (const i of infos) console.log(` i ${i}`);
for (const w of warns) console.log(` ! ${w}`);
for (const e of errors) console.log(` ✗ ${e}`);

if (errors.length) {
    console.log(`\n❌ ${errors.length} Bildverweis(e) zeigen ins Leere\n`);
    process.exit(1);
}
console.log(`\n✅ Jeder Bildverweis findet seine Datei${warns.length ? ` (${warns.length} Warnung(en))` : ''}\n`);
