/**
 * Writes the Steam rich presence localisation files from the dictionaries.
 *
 *   node tools/make-steam-presence.mjs [--out build/steam/presence]
 *
 * Steam shows the friends-list status in the language of whoever is LOOKING,
 * not the language the player picked. It can only do that if the game sends a
 * token (`#Status_coffee`) and Steam resolves it from a file uploaded in the
 * Steamworks backend. Before 6.0 the game sent the finished sentence instead,
 * so everyone read the player's language.
 *
 * The sentences stay in src/i18n where lint-i18n and lint-parity can see them;
 * this turns them into the upload format. Regenerate and re-upload whenever a
 * presence.* line changes - and note the ORDER: the file has to be in
 * Steamworks before a build that sends the new tokens ships, or the friends
 * list shows the bare token.
 *
 * The file is named exactly like the ACHIEVEMENT localisation file - both are
 * `4487580_loc_<language>.vdf` - and they go to different places in Steamworks.
 * That is why each tool writes into a directory of its own.
 *
 * `#DisplayStatus` is written out as well, although nothing sends %statustext%
 * any more. It costs one line and keeps an older client - someone who has not
 * taken the update yet - working exactly as before.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { de } from '../src/i18n/de.js';
import { en } from '../src/i18n/en.js';
import { PRESENCE_ALL, PRESENCE_TOKEN } from '../src/engine/presence.js';

/** Steam's language names, not our codes. */
const DICTIONARIES = [
    { steam: 'english', code: 'en', dict: en },
    { steam: 'german',  code: 'de', dict: de }
];

const APP_ID = '4487580';
const outDir = process.argv.includes('--out')
    ? process.argv[process.argv.indexOf('--out') + 1]
    : 'build/steam/presence';

const TYPES = PRESENCE_ALL;

// --- the check that makes this more than a formatter -------------------------
//
// Two lists have to agree and neither may guess: the types the engine can send,
// and the presence.* lines in the dictionaries. A type without a line would
// reach Steam as an untranslated token; a line without a type is dead weight
// that still looks maintained.
let broken = 0;
for (const { steam, dict } of DICTIONARIES) {
    const have = Object.keys(dict).filter(k => k.startsWith('presence.'))
                                  .map(k => k.slice('presence.'.length));
    for (const type of TYPES) {
        if (!have.includes(type)) { console.error(` ✗ ${steam}: no text for "${type}"`); broken++; }
    }
    for (const key of have) {
        if (!TYPES.includes(key)) { console.error(` ✗ ${steam}: "presence.${key}" is never sent`); broken++; }
    }
}
if (broken) {
    console.error(`\n${broken} faults - nothing written.`);
    process.exit(1);
}

// --- write -------------------------------------------------------------------
//
// Tabs between key and value, one token per line, exactly the shape Steamworks
// hands back when you download the file again.
const escape = (text) => text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

mkdirSync(outDir, { recursive: true });

for (const { steam, dict } of DICTIONARIES) {
    const tokens = [
        `\t\t"#DisplayStatus"\t"%statustext%"`,
        ...TYPES.map(type =>
            `\t\t"${PRESENCE_TOKEN}${type}"\t"${escape(dict[`presence.${type}`])}"`)
    ];
    const vdf = [
        '"lang"',
        '{',
        `\t"Language"\t"${steam}"`,
        '\t"Tokens"',
        '\t{',
        ...tokens,
        '\t}',
        '}',
        ''
    ].join('\n');

    const file = join(outDir, `${APP_ID}_loc_${steam}.vdf`);
    writeFileSync(file, vdf, 'utf-8');
    console.log(`  ${file}  -  ${tokens.length} tokens`);
}

console.log(`\n✅ ${DICTIONARIES.length} files written. Upload them in Steamworks`);
console.log('   under "Rich Presence Localization" - BEFORE the build that sends');
console.log('   the new tokens, or the friends list shows the bare token.');
