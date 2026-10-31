/**
 * The voice manifest: which text becomes which audio file.
 *
 * Narration is pre-rendered, not spoken at runtime, because the voice has to
 * sound the same on every machine. That means the audio and the prose are two
 * separate things that CAN drift apart - edit a line and the file still says
 * the old one, with nothing to notice it. So every entry carries the checksum
 * of the source string, and --check holds the manifest against the trees.
 *
 * Usage: node tools/make-voice.mjs [--lang=de|en] [--write] [--check]
 *        --write   create or update voice/manifest.<lang>.json
 *        --check   exit 1 if the manifest and the tree disagree (a gate)
 *        neither   report what would change, touch nothing
 *
 * What is collected and how it is spelled out loud lives in voice-text.mjs,
 * which tools/make-audio.mjs reads too. The provider that speaks the text is
 * deliberately NOT part of either: the manifest says WHAT to say and under
 * which name to file it. Which service says it is one step further on, and
 * changing it must not invalidate 4651 files.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { collectEntries, TERMINAL, TRANSFORM } from './voice-text.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const args = process.argv.slice(2);
const flag = (n, d) => { const h = args.find(a => a.startsWith(`--${n}=`)); return h ? h.slice(n.length + 3) : d; };
const LANG  = flag('lang', 'de');
const WRITE = args.includes('--write');
const CHECK = args.includes('--check');

let entries, unknownTags;
try {
    ({ entries, unknownTags } = await collectEntries(LANG));
} catch (err) {
    console.error(err.message);
    process.exit(1);
}

// ---------------------------------------------------------------- the report

const seen = new Map(entries.map(e => [e.key, e]));
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
