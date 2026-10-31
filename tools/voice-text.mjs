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

/** The audio file a key is filed under. Derived, so it is never stored. */
export const fileFor = (key) => key.replace(/\//g, '--');

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
    for (const e of entries) {
        if (seen.has(e.key)) throw new Error(`Duplicate key: ${e.key}`);
        seen.add(e.key);
        e.spoken = spokenForm(e.src);
        e.sha = sha(e.src);
        e.chars = e.spoken.length;
    }

    return { entries, unknownTags };
}
