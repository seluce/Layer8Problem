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
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/**
 * The .opus filenames per folder, keyed by the folder's path under audio/ -
 * one per language, `music` for the house band (7.2), whose names are
 * checksums of the file, and `fm/<lang>` for GlobalCorp FM (7.2), a level
 * deeper - or {} if the folder is not there. Walked to any depth, so a
 * further set nests without this script having to learn its name.
 */
export function stock(base, rel = '') {
    const dir = rel ? `${base}/${rel}` : base;
    if (!existsSync(dir)) return {};
    const out = {};
    const here = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) Object.assign(out, stock(base, rel ? `${rel}/${entry.name}` : entry.name));
        else if (rel && entry.name.endsWith('.opus')) here.push(entry.name);
    }
    if (here.length) out[rel] = here;
    return out;
}

// Run as the build's first step; imported by the tests for stock() alone.
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
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
}
