/**
 * What gets a voice, how it is spelled out loud, and under which name it is
 * filed. The manifest tool and the generation run both read from here, because
 * two copies of this walk would drift and the drift would be inaudible: the
 * generator would buy audio for a text the manifest never recorded.
 *
 * What gets a voice: the terminal, the morning screen included. Mails, the phone, the intranet, the board,
 * the vending machine, the log and the books stay for reading - they are read
 * at the player's own pace, or they change from run to run.
 *
 * What does NOT get one: option labels. 3470 files for 114 minutes, and a
 * read-out list of buttons sounds like a railway announcement. Someone who
 * needs them read has a screen reader, supported since 6.4.
 */
import { createHash } from 'node:crypto';
import { DB, ensure, loadCore, setLanguage, currentLanguage, POOL_NAMES } from '../src/data.js';
import { de } from '../src/i18n/de.js';
import { en } from '../src/i18n/en.js';

/**
 * Pools that play in the terminal. A new one is added here and nowhere else.
 *
 * `moods` is the morning screen - DER MORGEN DANACH, before the first action
 * of a day. It stands in the terminal like a scene and is read like one; only
 * its `text` is spoken, never the title, and never the line under it that
 * says what the morning cost, which carries a number.
 */
export const TERMINAL = ['coffee', 'server', 'calls', 'sidequests', 'bossfights',
                         'lunch', 'meetings', 'reputation', 'party', 'special', 'tutorial',
                         'moods'];

/** Fields that hold spoken prose. `t` (the button) is deliberately absent. */
const SPOKEN = new Set(['text', 'r', 'txt']);

/**
 * The interface strings that are spoken, named one by one.
 *
 * The dictionary is labels, and a read-out list of labels is a railway
 * announcement - so this is a LIST, not a rule. What earns a place here is
 * prose the player reads on a screen, in the same way a scene is read:
 *
 *   - H.A.L.G.E.R.D.'s two notices, the ones that arrive uninvited the first
 *     time a mail and an emergency ever happen;
 *   - the tutorial, which is the one stretch of the game where he does ALL
 *     the talking. A player who switched the narrator on for the reading
 *     would otherwise meet a silent tutorial and a game that reads itself.
 *   - the sample the settings play, so the narrator's slider has a preview
 *     like the other two.
 *
 * Read in his own voice, not a machine's. Alexander already reads every one
 * of the game's three hundred characters; making H.A.L.G.E.R.D. the single
 * exception would be the inconsistency, not the rule.
 *
 * TITLES AND BUTTONS ARE NOT HERE, on purpose - `tutorial.gotIt`,
 * `tutorial.ask.yes`, every `.title`. Neither is the log, the ticker or the
 * idle screen: none of them is voiced for the game either.
 */
export const SPOKEN_KEYS = [
    'set.narration.sample',

    'hint.mail.text',
    'hint.boss.text',

    'tutorial.ask.text',
    'tutorial.step.call.desc',
    'tutorial.step.tickets.desc',
    'tutorial.step.clock.desc',
    'tutorial.step.coffee.desc',
    'tutorial.step.errand.desc',
    'tutorial.step.server.desc',
    'tutorial.step.stats.desc',
    'tutorial.step.inv.desc',
    'tutorial.step.inv.descDonut',
    'tutorial.step.team.desc',
    'tutorial.done.text',
];

/**
 * Lists of bare strings that are spoken, named by their path.
 *
 * The walk below collects a string only as the value of a `text`, `r` or
 * `txt` field, which is what a scene is made of. These two are not scenes but
 * lists - one line is drawn when a valve opens - so the walk steps over them,
 * and that is right for every other list in the trees. Named here instead,
 * like the interface keys: a list that lands here is bought.
 *
 * The rage valve and the written warning. What is SPOKEN is the drawn line on
 * its own (engine_core.openRageValve / issueChefWarning): the window frames it
 * with "(Aggro set to 50%)" and on hard with an extra sentence, and neither of
 * those has a recording - the first carries a number, the second would double
 * every piece for one flourish.
 */
export const SPOKEN_LISTS = [
    ['special', 'valveTexts', 'rage'],
    ['special', 'valveTexts', 'chef'],
];

const DICTS = { de, en };

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
 * Said, not spelled - and not the same in both languages.
 *
 * Two different faults live here. H.A.L.G.E.R.D. is written with dots, and a
 * voice reading those out turns the company system into a hardware list; that
 * is wrong in either language. "Rack" is an English word standing in German
 * prose, where a German voice gives it a German a - and in the English tree
 * the same word is read correctly and must not be touched. So a rule has a
 * language, and `all` is for the ones that have none.
 *
 * Respelling is the lever because the written line may not change: the screen
 * keeps "Rack 4", the hash is taken over what is SHOWN, and the substitute
 * never reaches the player's eyes.
 *
 * ONLY WHAT SOMEBODY HAS HEARD GOES IN. A rule costs a re-render of every
 * piece it touches, bought a second time - 108 German pieces for this one -
 * so a guess at how a voice says a word is a guess paid for in credits. The
 * German tree is full of English computing words (Server, Ticket, Switch,
 * Update, Cache, Queue), and a German saying them out loud is how the prose
 * is meant to sound anyway. Rack was the one that came back wrong.
 */
const SPOKEN_AS = {
    all: [
        [/H\.A\.L\.G\.E\.R\.D\./g, 'Halgerd'],
    ],
    // The capital letter and the two boundaries together: "Track", "Cracker"
    // and "Barack" never start a match, and "Racker" keeps its ending. The
    // hyphenated compounds the tree holds - Server-Rack, 19-Zoll-Rack,
    // Wackel-Rack - are reached, because a hyphen is a word boundary.
    de: [
        [/\bRacks\b/g, 'Räcks'],
        [/\bRack\b/g, 'Räck'],
    ],
    en: [],
};

/**
 * Markup that is dropped rather than spoken.
 *
 * `<br>` is all the data tree carries - lint:voice fails on any other tag, so
 * that is enforced rather than assumed. The emphasis tags are here for the
 * INTERFACE strings above, where `<b>` marks the number in a tutorial step.
 *
 * Adding them made not one rendered piece stale: no voiced string in either
 * tree contains a tag other than `<br>`, so a rule about `<b>` cannot change
 * what any of them sounds like. Measured, not assumed - and it is the `spk`
 * checksum below that measures it now, rather than somebody's judgement. The
 * checker refuses an unknown tag either way.
 */
const KNOWN_TAGS = /<\/?(?:br|b|i|em|strong)\s*\/?>/gi;

export function spokenForm(s, lang) {
    const own = SPOKEN_AS[lang];
    // Thrown rather than defaulted: a caller that forgets the language would
    // otherwise get the shared rules alone and silently buy German prose read
    // as German, which is the fault this argument exists for.
    if (!own) throw new Error(`spokenForm: no spoken-form rules for language "${lang}".`);
    let out = s.replace(KNOWN_TAGS, ' ');
    for (const [from, to] of [...SPOKEN_AS.all, ...own]) out = out.replace(from, to);
    return out.replace(/\s+/g, ' ').trim();
}

export const sha = (s) => createHash('sha1').update(s, 'utf8').digest('hex').slice(0, 12);

/**
 * TWO CHECKSUMS, ANSWERING DIFFERENT QUESTIONS.
 *
 * `sha` is taken over the text as WRITTEN, and it is the file name: the browser
 * hashes the sentence it is about to show and asks for that file (see fileFor
 * below). `spk` is taken over the text as SENT, after spokenForm() - and it is
 * the only thing that can notice a change to the rules themselves. Add a
 * respelling and the written line is untouched, so `sha` is untouched, so the
 * ledger calls the piece finished and the provider is never asked again: the
 * file on disk goes on saying the old thing at 0 errors and 0 warnings.
 *
 * This was a single TRANSFORM number in the manifest before, bumped by hand
 * whenever the rules changed. It could only ever say "all of it is stale", and
 * - the half that mattered - make-audio.mjs never read it at all, so bumping it
 * marked 4,663 pieces changed in one report and re-rendered none of them. A
 * checksum per piece is exact in both directions: the Rack rule touches 109
 * German pieces and leaves the other 4,554 alone.
 */

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
    // setLanguage() BEFORE loadCore(), because the deferred pools are cached
    // on DB by NAME and not by language - ensure() returns early on
    // `if (DB[name])`. So a second call for the other language in one process
    // reloaded the core tier, left all eleven terminal pools in the first
    // language, and passed the guard below, because currentLanguage() had
    // moved by then. A loop over both languages then reported 4,625 of 4,663
    // English pieces as drifted: it was holding them against German prose.
    // setLanguage() is the path that drops the cache, and it returns early when
    // the language is already the wanted one - which is why loadCore() still
    // has to follow it for a fresh process.
    await setLanguage(lang);
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
                    // The data tree is held to <br> alone: the emphasis tags
                    // KNOWN_TAGS also drops are there for the interface
                    // strings, and prose that starts carrying markup is a
                    // thing to notice, not to swallow.
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

    for (const path of SPOKEN_LISTS) {
        const list = path.reduce((node, k) => node?.[k], DB);
        if (!Array.isArray(list) || !list.length) {
            throw new Error(`Spoken list ${path.join('.')} is missing or empty in ${lang}.`);
        }
        list.forEach((v, i) => {
            if (typeof v !== 'string' || !v.trim()) {
                throw new Error(`Spoken list ${path.join('.')} holds a non-sentence at ${i}.`);
            }
            if (v.includes('{')) throw new Error(`Spoken list ${path.join('.')}/${i} carries a placeholder: ${v}`);
            entries.push({ key: [...path, String(i)].join('/'), src: v });
        });
    }

    // The named interface strings, under a prefix of their own so they can
    // never collide with a pool.
    const dict = DICTS[lang];
    for (const key of SPOKEN_KEYS) {
        const v = dict[key];
        if (typeof v !== 'string' || !v.trim()) {
            throw new Error(`Spoken interface key "${key}" is missing from ${lang}.js.`);
        }
        // A PLACEHOLDER CANNOT BE SPOKEN. tf() fills {name} at the moment of
        // display; a recording is made months earlier and would say the braces
        // out loud, in every game, for ever. There is no half-measure here -
        // either the sentence is fixed or it does not get a voice.
        if (v.includes('{')) {
            throw new Error(`Spoken interface key "${key}" carries a placeholder: ${v}`);
        }
        for (const m of v.match(/<[^>]+>/g) ?? []) {
            if (!KNOWN_TAGS.test(m)) unknownTags.set(m, (unknownTags.get(m) ?? 0) + 1);
            KNOWN_TAGS.lastIndex = 0;      // /g keeps state between tests
        }
        entries.push({ key: `i18n/${key}`, src: v });
    }

    const seen = new Set();
    const byHash = new Map();
    for (const e of entries) {
        if (seen.has(e.key)) throw new Error(`Duplicate key: ${e.key}`);
        seen.add(e.key);
        e.spoken = spokenForm(e.src, lang);
        e.sha = sha(e.src);
        e.spk = sha(e.spoken);
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
