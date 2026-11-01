/**
 * What gets a voice, how it is spelled out loud, and under which name it is
 * filed. The manifest tool and the generation run both read from here, because
 * two copies of this walk would drift and the drift would be inaudible: the
 * generator would buy audio for a text the manifest never recorded.
 *
 * What gets a voice: the terminal. Mails, the phone, the intranet, the board,
 * the vending machine, the log and the books stay for reading - they are read
 * at the player's own pace, or they change from run to run.
 *
 * What does NOT get one: option labels. 3470 files for 114 minutes, and a
 * read-out list of buttons sounds like a railway announcement. Someone who
 * needs them read has a screen reader, supported since 6.4.
 */
import { createHash } from 'node:crypto';
import { DB, ensure, loadCore, currentLanguage, POOL_NAMES } from '../src/data.js';

/** Pools that play in the terminal. A new one is added here and nowhere else. */
export const TERMINAL = ['coffee', 'server', 'calls', 'sidequests', 'bossfights',
                         'lunch', 'meetings', 'reputation', 'party', 'special', 'tutorial'];

/** Fields that hold spoken prose. `t` (the button) is deliberately absent. */
const SPOKEN = new Set(['text', 'r', 'txt']);

/**
 * A door is not a sentence.
 *
 * `CMD:OPEN_BOARD` and its two siblings stand in an option's `r` where prose
 * would stand, and resolveTerminal swaps them for a dictionary line before
 * anything reaches the screen - see CLAUDE.md. Collected as prose they were
 * three files that say "C M D colon OPEN underscore BOARD" out loud, bought
 * and rendered in both languages, and the only way to hear one would have been
 * for the swap to fail.
 *
 * The runtime consequence is the one worth keeping in mind: what the player
 * reads after such a click is an INTERFACE string, and the interface is not
 * voiced. So the moment a door opens a window over the terminal, there is
 * nothing to speak - which is the behaviour wanted anyway.
 */
const INSTRUCTION = /^CMD:/;

/**
 * How the written line becomes the spoken one. Bumped when spokenForm()
 * changes, because then every file was made from a different text than the one
 * this version would send - the checksum alone cannot see that.
 */
export const TRANSFORM = 1;

/**
 * Said, not spelled. The screen keeps the dots; a voice reading them out
 * letter by letter turns the company system into a hardware list.
 *
 * This fires zero times in the terminal pools today - H.A.L.G.E.R.D. speaks in
 * the start sequence and the chronicle, neither of which is voiced. It stays as
 * a guard for the day the name wanders into an event.
 */
const SPOKEN_AS = [
    [/H\.A\.L\.G\.E\.R\.D\./g, 'Halgerd'],
];

const KNOWN_TAGS = /<br\s*\/?>/gi;

export function spokenForm(s) {
    let out = s.replace(KNOWN_TAGS, ' ');
    for (const [from, to] of SPOKEN_AS) out = out.replace(from, to);
    return out.replace(/\s+/g, ' ').trim();
}

export const sha = (s) => createHash('sha1').update(s, 'utf8').digest('hex').slice(0, 12);

/**
 * The audio file a piece is filed under: the checksum of the text it says.
 *
 * Content-addressed on purpose, and the reason is a runtime one. The player's
 * browser has the sentence on screen and has to find the file that speaks it.
 * Naming the file after its KEY means shipping a key-to-file index of 4651
 * entries, or threading the key down from every place that fills the terminal
 * - and a threading mistake there does not fall silent, it plays the
 * NEIGHBOURING option's result. Naming it after the text means the browser
 * hashes what it is about to show and asks for that.
 *
 * Which also closes drift at the one place it can still bite. `lint:voice`
 * holds the manifest against the trees and is a gate, so edited prose with
 * stale audio cannot ship - but if it ever did, a content-addressed name finds
 * nothing and the narrator says nothing, instead of confidently reading the
 * sentence that used to be there.
 *
 * Which key a file belongs to is a question the manifest answers; it is the
 * map, and it is in the repository.
 */
export const fileFor = (entry) => entry.sha;

/**
 * Every spoken piece of one language tree, with its key, its source string and
 * the form that goes to the provider.
 *
 * The key is the path from the pool, with the nearest enclosing id standing in
 * for wherever that object sits in its array. An event that moves within its
 * file keeps its files; only a rewrite of the prose invalidates them, which is
 * what the checksum is for. Pools shaped as objects (`special`) fall back to
 * their property names, so no pool needs a case of its own.
 *
 * Throws rather than returns on a broken tree: both callers would exit anyway,
 * and a half-collected tree silently buys the wrong audio.
 */
export async function collectEntries(lang) {
    if (lang !== 'de' && lang !== 'en') throw new Error(`Unknown language "${lang}".`);
    await loadCore(lang);
    await ensure(...POOL_NAMES);
    if (currentLanguage() !== lang) {
        throw new Error(`Language "${lang}" could not be loaded - reading "${currentLanguage()}".`);
    }

    const entries = [];
    const unknownTags = new Map();

    function collect(node, pool, prefix, key) {
        if (Array.isArray(node)) { node.forEach((v, i) => collect(v, pool, [...prefix, key], String(i))); return; }
        if (!node || typeof node !== 'object') return;
        if (node.kind === 'phone') return;
        const base = typeof node.id === 'string' ? [pool, node.id] : [...prefix, key];
        for (const [k, v] of Object.entries(node)) {
            if (typeof v === 'string') {
                if (!SPOKEN.has(k) || !v.trim()) continue;
                if (INSTRUCTION.test(v.trim())) continue;
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
        if (!v) throw new Error(`Pool "${pool}" is not loaded.`);
        collect(v, pool, [pool], '');
    }

    const seen = new Set();
    const byHash = new Map();
    for (const e of entries) {
        if (seen.has(e.key)) throw new Error(`Duplicate key: ${e.key}`);
        seen.add(e.key);
        e.spoken = spokenForm(e.src);
        e.sha = sha(e.src);
        e.chars = e.spoken.length;
        // Two pieces of identical text share one file, which is right - they
        // say the same thing. Two DIFFERENT texts under one checksum would
        // not: the file name is how the browser finds the line (see fileFor),
        // so one of them would be spoken in the other's words. 48 bits over
        // 4651 pieces makes that a 1-in-26-million accident; it is checked
        // because the failure is silent and the check costs a Map.
        const clash = byHash.get(e.sha);
        if (clash !== undefined && clash !== e.src) {
            throw new Error(`Checksum collision on ${e.sha}: "${clash}" and "${e.src}"`);
        }
        byHash.set(e.sha, e.src);
    }

    return { entries, unknownTags };
}
