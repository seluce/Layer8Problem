/**
 * The voice manifest: which text becomes which audio file.
 *
 * Narration is pre-rendered, not spoken at runtime, because the voice has to
 * sound the same on every machine. That means the audio and the prose are two
 * separate things that CAN drift apart - edit a line and the file still says
 * the old one, with nothing to notice it. So every entry carries the checksum
 * of the source string, and --check holds the manifest against the trees.
 *
 * What gets a voice: the terminal. Mails, the phone, the intranet, the board,
 * the vending machine, the log and the books stay for reading - they are
 * read at the player's own pace, or they change from run to run.
 *
 * What does NOT get one: option labels. 3470 files for 114 minutes, and a
 * read-out list of buttons sounds like a railway announcement. Someone who
 * needs them read has a screen reader, supported since 6.4.
 *
 * Usage: node tools/make-voice.mjs [--lang=de|en] [--write] [--check]
 *        --write   create or update voice/manifest.<lang>.json
 *        --check   exit 1 if the manifest and the tree disagree (a gate)
 *        neither   report what would change, touch nothing
 *
 * The provider that speaks the text is deliberately NOT part of this: the
 * manifest says WHAT to say and under which name to file it. Which service
 * says it is one step further on, and changing it must not invalidate 4591
 * files.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { DB, ensure, loadCore, currentLanguage, POOL_NAMES } from '../src/data.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const flag = (n, d) => { const h = args.find(a => a.startsWith(`--${n}=`)); return h ? h.slice(n.length + 3) : d; };
const LANG  = flag('lang', 'de');
const WRITE = args.includes('--write');
const CHECK = args.includes('--check');

if (LANG !== 'de' && LANG !== 'en') { console.error(`Unknown language "${LANG}".`); process.exit(1); }
await loadCore(LANG);
await ensure(...POOL_NAMES);
if (currentLanguage() !== LANG) {
    console.error(`Language "${LANG}" could not be loaded - reading "${currentLanguage()}".`);
    process.exit(1);
}

/** Pools that play in the terminal. A new one is added here and nowhere else. */
const TERMINAL = ['coffee', 'server', 'calls', 'sidequests', 'bossfights',
                  'lunch', 'meetings', 'reputation', 'party', 'special', 'tutorial'];
/** Fields that hold spoken prose. `t` (the button) is deliberately absent. */
const SPOKEN = new Set(['text', 'r', 'txt']);

/**
 * How the written line becomes the spoken one. Bumped when this function
 * changes, because then every file was made from a different text than the
 * one this version would send - the checksum alone cannot see that.
 */
const TRANSFORM = 1;

/**
 * Said, not spelled. The screen keeps the dots; a voice reading them out
 * letter by letter turns the company system into a hardware list.
 */
const SPOKEN_AS = [
    [/H\.A\.L\.G\.E\.R\.D\./g, 'Halgerd'],
];

const KNOWN_TAGS = /<br\s*\/?>/gi;

function spokenForm(s) {
    let out = s.replace(KNOWN_TAGS, ' ');
    for (const [from, to] of SPOKEN_AS) out = out.replace(from, to);
    return out.replace(/\s+/g, ' ').trim();
}

const sha = (s) => createHash('sha1').update(s, 'utf8').digest('hex').slice(0, 12);

/** The audio file a key is filed under. Derived, so it is never stored. */
export const fileFor = (key) => `${key.replace(/\//g, '--')}.opus`;

// ---------------------------------------------------------------- collecting

const entries = [];
const unknownTags = new Map();

/**
 * The key is the path from the pool, with the nearest enclosing id standing in
 * for wherever that object sits in its array. An event that moves within its
 * file keeps its files; only a rewrite of the prose invalidates them, which is
 * what the checksum is for. Pools shaped as objects (`special`) fall back to
 * their property names, so no pool needs a case of its own.
 */
function collect(node, pool, prefix, key) {
    if (Array.isArray(node)) { node.forEach((v, i) => collect(v, pool, [...prefix, key], String(i))); return; }
    if (!node || typeof node !== 'object') return;
    if (node.kind === 'phone') return;
    const base = typeof node.id === 'string' ? [pool, node.id] : [...prefix, key];
    for (const [k, v] of Object.entries(node)) {
        if (typeof v === 'string') {
            if (!SPOKEN.has(k) || !v.trim()) continue;
            for (const m of v.match(/<[^>]+>/g) ?? []) {
                if (!/^<br\s*\/?>$/i.test(m)) unknownTags.set(m, (unknownTags.get(m) ?? 0) + 1);
            }
            entries.push({ key: [...base, k].join('/'), src: v });
        } else {
            collect(v, pool, base, k);
        }
    }
}

for (const pool of TERMINAL) {
    const v = DB[pool];
    if (!v) { console.error(`Pool "${pool}" is not loaded.`); process.exit(1); }
    collect(v, pool, [pool], '');
}

// ---------------------------------------------------------------- the report

const seen = new Map();
for (const e of entries) {
    if (seen.has(e.key)) { console.error(`Duplicate key: ${e.key}`); process.exit(1); }
    seen.set(e.key, e);
    e.spoken = spokenForm(e.src);
    e.sha = sha(e.src);
    e.chars = e.spoken.length;
}

const MANIFEST = `${ROOT}voice/manifest.${LANG}.json`;
const old = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : null;
const oldBy = new Map((old?.entries ?? []).map(e => [e.key, e]));

const fresh = entries.filter(e => !oldBy.has(e.key));
const changed = entries.filter(e => oldBy.has(e.key)
    && (oldBy.get(e.key).sha !== e.sha || (old?.transform ?? 0) !== TRANSFORM));
const gone = [...oldBy.keys()].filter(k => !seen.has(k));
const chars = entries.reduce((n, e) => n + e.chars, 0);
const todo = fresh.length + changed.length;

console.log(`\nVoice manifest (${LANG}) - ${TERMINAL.length} terminal pools`);
console.log(`  ${entries.length} pieces, ${chars.toLocaleString('de-DE')} characters to speak`);
console.log(`  ${(chars / 900 / 60).toFixed(1)} h at 900 characters a minute\n`);
if (old) {
    console.log(`  new      ${fresh.length}`);
    console.log(`  changed  ${changed.length}${(old.transform ?? 0) !== TRANSFORM ? '   (the transform itself changed - everything is stale)' : ''}`);
    console.log(`  orphaned ${gone.length}   (audio whose text is gone)`);
    console.log(`  to speak ${todo}, ${entries.filter(e => fresh.includes(e) || changed.includes(e))
        .reduce((n, e) => n + e.chars, 0).toLocaleString('de-DE')} characters\n`);
} else {
    console.log(`  no manifest yet - all ${entries.length} would be new\n`);
}
if (unknownTags.size) {
    console.log('  ! markup this tool has not been taught (it would be spoken out loud):');
    for (const [tag, n] of unknownTags) console.log(`      ${tag}  ${n}x`);
    console.log();
}

if (CHECK) {
    const bad = todo + gone.length + unknownTags.size;
    if (!old) { console.error('✗ No manifest. Run with --write.'); process.exit(1); }
    if (bad) { console.error(`✗ The manifest and the ${LANG} tree disagree in ${bad} places.`); process.exit(1); }
    console.log('✅ Manifest and tree agree.');
    process.exit(0);
}

if (WRITE) {
    mkdirSync(`${ROOT}voice`, { recursive: true });
    // One entry per line, and no `file` - that is the key with the slashes
    // swapped, and 4651 copies of a derived value cost 300 kB in a file that
    // moves on every text edit. The line-per-entry shape keeps a diff down to
    // the lines that actually changed.
    const head = `{\n "lang": ${JSON.stringify(LANG)},\n "transform": ${TRANSFORM},`
               + `\n "generated": ${JSON.stringify(new Date().toISOString().slice(0, 10))},\n "entries": [\n`;
    const body = entries
        .map(e => `  {"key":${JSON.stringify(e.key)},"sha":"${e.sha}","chars":${e.chars}}`)
        .join(',\n');
    writeFileSync(MANIFEST, head + body + '\n ]\n}\n');
    console.log(`  written: voice/manifest.${LANG}.json`);
} else {
    console.log('  (nothing written - pass --write)');
}
