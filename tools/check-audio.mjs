/**
 * Runs before every build, and makes sure the audio survives it.
 *
 * The audio sits in the repository ONCE, in docs/, because that is what GitHub
 * Pages serves. public/audio/ is in .gitignore: it is the local staging area
 * the build copies from, not a second committed copy. Committing both would
 * put 157 MiB in the history for German alone, and another full copy on every
 * later re-render. (Measured on the finished render: 157 MiB for German,
 * 154 MiB for English, 311 MiB for both.)
 *
 * That saving comes with a trap. vite.config.js sets emptyOutDir: true, so a
 * build clears docs/ and rebuilds it out of public/. On a checkout that has
 * the committed docs/audio/ but no local public/audio/ - a fresh clone, or a
 * machine where the masters were never generated - `npm run build` deletes
 * every audio file and reports success. Nothing in the output says so, and the
 * next commit removes them from the repository too.
 *
 * Up to 6.4 this script refused that build and told the operator to re-encode
 * from the masters. That was the wrong half of the job: the files it was
 * protecting were sitting right there in docs/, and the only thing missing was
 * a copy. So it copies them now, and a fresh clone builds with one commit of
 * audio in the history and no render.
 *
 * The copy is safe because the filenames are content-addressed (tools/
 * voice-text.mjs: a piece is filed under the SHA-1 of its text). Same name
 * means same audio, so a file already staged is never overwritten and never
 * needs comparing - which is also why a piece that exists only in public/ is
 * left alone: it is a NEW recording waiting for its first build, not a stray.
 */
import { existsSync, readdirSync, mkdirSync, copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/**
 * The .opus filenames per folder - one per language, and `music` for the
 * house band (7.2), whose names are checksums of the file - or {} if the
 * folder is not there.
 */
function stock(base) {
    if (!existsSync(base)) return {};
    const out = {};
    for (const lang of readdirSync(base, { withFileTypes: true })) {
        if (!lang.isDirectory()) continue;
        const files = readdirSync(`${base}/${lang.name}`).filter(f => f.endsWith('.opus'));
        if (files.length) out[lang.name] = files;
    }
    return out;
}

const built = stock(`${ROOT}docs/audio`);
const staged = stock(`${ROOT}public/audio`);

let copied = 0;
for (const [lang, files] of Object.entries(built)) {
    const have = new Set(staged[lang] ?? []);
    const missing = files.filter(f => !have.has(f));
    if (!missing.length) continue;

    const dir = `${ROOT}public/audio/${lang}`;
    mkdirSync(dir, { recursive: true });
    for (const f of missing) copyFileSync(`${ROOT}docs/audio/${lang}/${f}`, `${dir}/${f}`);

    const whole = have.size === 0;
    console.log(`  ${whole ? '→' : '+'} public/audio/${lang}/: ${missing.length} ${whole ? 'files restored from docs/' : 'missing files topped up from docs/'}`);
    copied += missing.length;
}

if (copied) {
    console.log(`    ${copied} in total. vite clears docs/ and refills it from public/, so`);
    console.log('    without this the build would have dropped them without a word.\n');
}
