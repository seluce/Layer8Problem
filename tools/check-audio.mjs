/**
 * Runs before every build, and refuses one that would silently throw audio
 * away.
 *
 * The audio sits in the repository ONCE, in docs/, because that is what GitHub
 * Pages serves. public/audio/ is in .gitignore: it is the local staging area
 * the build copies from, not a second committed copy. Committing both would
 * put 276 MiB in the history for German alone, and another full copy on every
 * later re-render.
 *
 * That saving comes with a trap. vite.config.js sets emptyOutDir: true, so a
 * build clears docs/ and rebuilds it out of public/. On a checkout that has
 * the committed docs/audio/ but no local public/audio/ - a fresh clone, or a
 * machine where the masters were never generated - `npm run build` deletes
 * every audio file and reports success. Nothing in the output says so, and the
 * next commit removes them from the repository too.
 *
 * So: if docs/ holds audio and public/ does not, stop.
 */
import { existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/** Languages that have audio, counted by their .opus files. */
function stock(base) {
    if (!existsSync(base)) return {};
    const out = {};
    for (const lang of readdirSync(base, { withFileTypes: true })) {
        if (!lang.isDirectory()) continue;
        const n = readdirSync(`${base}/${lang.name}`).filter(f => f.endsWith('.opus')).length;
        if (n) out[lang.name] = n;
    }
    return out;
}

const built = stock(`${ROOT}docs/audio`);
const staged = stock(`${ROOT}public/audio`);

const lost = Object.keys(built).filter(l => (staged[l] ?? 0) === 0);
if (lost.length) {
    console.error('\n✗ This build would delete audio that is in the repository.\n');
    for (const l of lost) {
        console.error(`    docs/audio/${l}/    ${built[l]} files`);
        console.error(`    public/audio/${l}/  empty or missing\n`);
    }
    console.error('  vite clears docs/ and refills it from public/, so the files would be gone');
    console.error('  with no error and no warning. Restore public/audio/ from the masters:\n');
    console.error('      node tools/make-audio.mjs --lang=<lang>\n');
    console.error('  (that re-encodes from voice/master/ and only calls the provider for');
    console.error('   pieces no master exists for).\n');
    process.exit(1);
}

// A shrunken staging area is the same accident, one step smaller.
const short = Object.keys(built).filter(l => staged[l] && staged[l] < built[l]);
for (const l of short) {
    console.log(`  ! public/audio/${l}/ has ${staged[l]} files, docs/audio/${l}/ has ${built[l]}.`);
    console.log(`    The build will leave ${built[l] - staged[l]} of them out.`);
}
