/**
 * Writes the Steam achievement localisation files from the data trees.
 *
 *   node tools/make-steam-achievements.mjs [--out build/steam/achievements]
 *
 * Steamworks names achievements by POSITION, not by id: the tokens read
 * NEW_ACHIEVEMENT_1_0_NAME, _1_1_NAME and so on, and which achievement index 7
 * is was decided once when they were first entered in the backend. Nothing in
 * this repository can change that or read it back.
 *
 * Which is why STEAM_ORDER below is written out by hand rather than taken from
 * data_achievements.js. **The two are not the same order.** The three week
 * achievements sit at the TOP of the data file since 5.0 and at the BOTTOM in
 * Steamworks (24-26). Generating from the file order would have shifted all 27
 * by three: every achievement in the store would have carried a neighbour's
 * name and description, and no check in this repository would have noticed.
 *
 * The order was derived once from the file that was actually uploaded, by
 * matching its German titles against the tree - all 27 matched, one to one.
 * If an achievement is ever ADDED, it goes at the END of this list, because
 * that is where Steamworks will put it too.
 *
 * `hint` is used, not `desc`. In the game a locked achievement shows the hint
 * and an unlocked one the description; Steam has no such distinction, so it
 * gets the one that spoils nothing. The upload of 2026-08 does the same - all
 * 27 of its lines are the hint, checked before this tool was written.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

import { achievements as de } from '../src/data/de/data_achievements.js';
import { achievements as en } from '../src/data/en/data_achievements.js';

/**
 * Achievement ids in the order Steamworks holds them. Index === the number in
 * NEW_ACHIEVEMENT_1_<n>_NAME. Do not sort, do not regenerate from the tree.
 */
const STEAM_ORDER = [
    'ach_ascetic', 'ach_coffee', 'ach_ignore', 'ach_hoarder', 'ach_lazy',
    'ach_rage', 'ach_macgyver', 'ach_rich', 'ach_hacker', 'ach_ninja',
    'ach_zen', 'ach_workaholic', 'ach_risk', 'ach_clean', 'ach_survivor',
    'ach_mentor', 'ach_ally', 'ach_rockstar', 'ach_keymaster', 'ach_closer',
    'ach_cat_whisperer', 'ach_lore', 'ach_wolf', 'ach_party',
    'ach_week', 'ach_week_iron', 'ach_week_clean'
];

const DICTIONARIES = [
    { steam: 'english', tree: en },
    { steam: 'german',  tree: de }
];

const APP_ID = '4487580';
const outDir = process.argv.includes('--out')
    ? process.argv[process.argv.indexOf('--out') + 1]
    : 'build/steam/achievements';

// --- checks ------------------------------------------------------------------
//
// Everything that could put the wrong sentence under the wrong achievement in
// a shop page, in a language the author does not read.
let broken = 0;
const fail = (text) => { console.error(` ✗ ${text}`); broken++; };

if (new Set(STEAM_ORDER).size !== STEAM_ORDER.length) fail('STEAM_ORDER enthält eine Kennung doppelt');

for (const { steam, tree } of DICTIONARIES) {
    for (const id of STEAM_ORDER) {
        const a = tree.find(x => x.id === id);
        if (!a)        { fail(`${steam}: "${id}" gibt es im Baum nicht`); continue; }
        if (!a.title)  fail(`${steam}: "${id}" hat keinen Titel`);
        if (!a.hint)   fail(`${steam}: "${id}" hat keinen hint — desc wäre ein Spoiler`);
    }
    // Ein Erfolg, den es im Spiel gibt und in Steam nicht, kann nie erreicht
    // werden — und fällt sonst niemandem auf.
    for (const a of tree) {
        if (!STEAM_ORDER.includes(a.id)) fail(`${steam}: "${a.id}" fehlt in STEAM_ORDER — in Steamworks anlegen und HINTEN anhängen`);
    }
}

if (broken) {
    console.error(`\n${broken} Fehler — nichts geschrieben.`);
    process.exit(1);
}

// --- write -------------------------------------------------------------------
const escape = (text) => text.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

mkdirSync(outDir, { recursive: true });

for (const { steam, tree } of DICTIONARIES) {
    const tokens = STEAM_ORDER.flatMap((id, i) => {
        const a = tree.find(x => x.id === id);
        return [
            `\t\t"NEW_ACHIEVEMENT_1_${i}_NAME"\t"${escape(a.title)}"`,
            `\t\t"NEW_ACHIEVEMENT_1_${i}_DESC"\t"${escape(a.hint)}"`
        ];
    });

    const vdf = [
        '"lang"', '{', `\t"Language"\t"${steam}"`, '\t"Tokens"', '\t{',
        ...tokens, '\t}', '}', ''
    ].join('\n');

    const file = join(outDir, `${APP_ID}_loc_${steam}.vdf`);
    writeFileSync(file, vdf, 'utf-8');
    console.log(`  ${file}  —  ${STEAM_ORDER.length} Erfolge`);
}

console.log('\n✅ In Steamworks unter "Stats & Achievements" hochladen.');
console.log('   ACHTUNG: heißt genauso wie die Rich-Presence-Datei, geht aber');
console.log('   an eine andere Stelle. Nicht verwechseln.');
