#!/usr/bin/env node
/**
 * Layer8Problem – Tailwind 3 to 4 class renames
 * ---------------------------------------------------------------
 *   node tools/migrate-tailwind4.mjs assets/intranet/*.html
 *   node tools/migrate-tailwind4.mjs --dry-run assets/intranet/*.html
 *
 * Files that already carry Tailwind 4 tokens are skipped: a second pass
 * would turn the rounded-sm from the first pass into rounded-xs. Use
 * --force only if you know a file is genuinely still on v3.
 *
 * Applies the utility renames Tailwind 4 introduced. Everything under
 * index.html, engine.js, tutorial.js and assets/engine/ was already
 * migrated; this covers files that were not part of that pass.
 *
 * Throwaway helper — delete it once every file has been through.
 *
 * NOTE ON ORDER: rounded-sm becomes rounded-xs while plain rounded becomes
 * rounded-sm. Applying those one after another would turn rounded into
 * rounded-xs, so the replacement runs token by token in a single pass.
 */

import { readFileSync, writeFileSync } from 'fs';

const RENAMES = {
    // The important marker moved from prefix to suffix
    '!bg-green-600':      'bg-green-600!',
    '!bg-green-900/30':   'bg-green-900/30!',
    '!bg-green-900/40':   'bg-green-900/40!',
    '!border-green-500':  'border-green-500!',
    '!text-green-400':    'text-green-400!',

    // Scales shifted down by one step
    'shadow-sm':          'shadow-xs',
    'rounded':            'rounded-sm',
    'rounded-sm':         'rounded-xs',
    'blur':               'blur-sm',
    'backdrop-blur-sm':   'backdrop-blur-xs',

    // Renamed utilities
    'bg-gradient-to-b':   'bg-linear-to-b',
    'bg-gradient-to-r':   'bg-linear-to-r',
    'bg-gradient-to-t':   'bg-linear-to-t',
    'bg-gradient-to-l':   'bg-linear-to-l',
    'bg-gradient-to-br':  'bg-linear-to-br',
    'bg-gradient-to-bl':  'bg-linear-to-bl',
    'bg-gradient-to-tr':  'bg-linear-to-tr',
    'bg-gradient-to-tl':  'bg-linear-to-tl',
    'break-words':        'wrap-break-word',
    'outline-none':       'outline-hidden',
    'focus:outline-none': 'focus:outline-hidden',
    'peer-focus:outline-none': 'peer-focus:outline-hidden',

    // Arbitrary values that now have a plain form
    'duration-[3000ms]':  'duration-3000',
    'duration-[800ms]':   'duration-800',
    'flex-[2]':           'flex-2',
    'min-h-[3rem]':       'min-h-12',
    '-left-[2.3rem]':     'left-[-2.3rem]',
    'z-[999]':            'z-999',
    'z-[1000]':           'z-1000',
    'z-[1100]':           'z-1100',
    'z-[1200]':           'z-1200',
    'z-[1300]':           'z-1300',
    'z-[2000]':           'z-2000',
    'z-[2100]':           'z-2100',
    'z-[2500]':           'z-2500',
    'z-[3000]':           'z-3000',
    'z-[9999]':           'z-9999',
    'z-[10000]':          'z-10000'
};

const dryRun = process.argv.includes('--dry-run');
const force  = process.argv.includes('--force');
const files  = process.argv.slice(2).filter(a => !a.startsWith('--'));

// Tokens that only exist after a migration. Running twice would turn the
// rounded-sm produced by the first pass into rounded-xs, so a file that
// already shows these is skipped unless --force is given.
const ALREADY_MIGRATED = /\b(shadow-xs|rounded-xs|backdrop-blur-xs|bg-linear-to-|outline-hidden|wrap-break-word)\b/;

if (files.length === 0) {
    console.error('Usage: node tools/migrate-tailwind4.mjs [--dry-run] <files…>');
    process.exit(1);
}

// Whitespace-separated tokens inside class attributes only, so prose and code
// are never touched.
const CLASS_ATTR = /(class(?:Name)?\s*=\s*)(["'`])([^"'`]*)\2/g;

let totalFiles = 0, totalHits = 0;

for (const file of files) {
    let src;
    try { src = readFileSync(file, 'utf8'); }
    catch { console.error(`  übersprungen (nicht lesbar): ${file}`); continue; }

    if (!force && ALREADY_MIGRATED.test(src)) {
        console.log(`  übersprungen (bereits migriert): ${file}`);
        continue;
    }

    const hits = {};
    const out = src.replace(CLASS_ATTR, (all, lead, quote, value) => {
        const mapped = value.split(/(\s+)/).map(tok => {
            const to = RENAMES[tok];
            if (!to) return tok;
            hits[tok] = (hits[tok] || 0) + 1;
            return to;
        }).join('');
        return lead + quote + mapped + quote;
    });

    const n = Object.values(hits).reduce((a, b) => a + b, 0);
    if (n === 0) continue;

    totalFiles++; totalHits += n;
    console.log(`\n${file}  (${n})`);
    for (const [from, count] of Object.entries(hits).sort())
        console.log(`   ${String(count).padStart(3)}x  ${from}  ->  ${RENAMES[from]}`);

    if (!dryRun) writeFileSync(file, out, 'utf8');
}

console.log(dryRun
    ? `\nProbelauf: ${totalHits} Ersetzungen in ${totalFiles} Datei(en). Ohne --dry-run erneut ausführen.`
    : `\n${totalHits} Ersetzungen in ${totalFiles} Datei(en) geschrieben.`);
