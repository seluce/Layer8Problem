/**
 * Recorded prose, kept as a recipe instead of a sentence (6.0).
 *
 * THE PROBLEM THIS SOLVES
 *
 * A log line and a chat bubble are written once and then read for the rest of
 * the day. Up to here both stored the FINISHED sentence, so a language switch
 * left them behind - the dictionary around them changed, the recorded words
 * did not. With the log being the running account of everything the player has
 * done, half of it in the other language reads like a bug, not like a decision.
 *
 * Storing the finished sentence was never the only option, and the reason it
 * looked that way is worth writing down, because it was a good argument that
 * happened to be beside the point: "prose from the data tree cannot be
 * restored from any dictionary key". True - and it does not need a key, it
 * needs a PATH. `lint-parity` enforces the same shape, the same identifiers and
 * **the same list lengths** in both trees, so a path that resolves in one
 * resolves in the other and lands on the counterpart of the same sentence.
 * Even a randomly drawn line comes back, as long as the draw is recorded as an
 * index rather than as its result.
 *
 * THREE FORMS, and an entry carries exactly one of them:
 *
 *   { msg }        a literal. Machine text, and every entry from an older save.
 *   { k, v }       a dictionary key with its values - what t()/tf() would do.
 *   { ref }        a path into the data tree.
 *
 * A VALUE INSIDE `v` IS EITHER A SCALAR OR ANOTHER RECIPE - the same three
 * forms, resolved recursively. That is one rule instead of a list of special
 * cases, and the stock needs every depth of it:
 *
 *   { ref }               `tf('log.email.sent', { text: opt.t })` is a
 *                         dictionary sentence with an option caption from the
 *                         tree sitting inside it.
 *   { k }                 the difficulty tier in the achievement line: the
 *                         label already exists as a key and is deliberately
 *                         not spelled out a second time.
 *   { k, v: { … } }       a sentence inside a sentence. The item cooldown line
 *                         embeds either the item's own wording or a fallback
 *                         that names the item - two levels, one rule.
 *
 * Any of them may carry `up: true`, which upper-cases the result. The capitals
 * in the achievement line are the log line's own doing, not the label's, so
 * they belong to the reference and not to the dictionary entry.
 *
 * A RECIPE NEVER CARRIES `msg`. That was the first draft and it was a hedge:
 * keeping the finished sentence beside the recipe means two sources for one
 * line, and the moment they disagree the stored one wins for the wrong reason.
 * The rule this whole module exists to serve is "the state holds the identity,
 * the display renders" - a recipe that also stores its own rendering is not
 * following that rule, it is opting out of it.
 *
 * So the three forms are exclusive, and `msg` means exactly one thing: this
 * line has NO identity to hold. Two cases have that honestly - a machine line
 * that is the same in every language, and an entry written by 5.x, which had
 * no recipes. Those render as they stand and do not follow a switch, which for
 * a 5.x entry lasts exactly as long as the day it belongs to.
 *
 * WHAT HAPPENS WHEN A RECIPE DOES NOT RESOLVE: it renders as null and the line
 * is dropped from the display. Content moves between releases, and a day saved
 * before an update can point at an option that has since been edited away -
 * the same window the version-line bug lived in. Losing one line of a fifty
 * line log is a smaller wrong than showing a sentence in the language the
 * player just switched away from, which is the thing being fixed here.
 *
 * Nothing needs migrating either way: a 5.x entry is simply a literal.
 *
 * READ THROUGH tree(), NEVER THROUGH DB. This is called from LogFeed and
 * PhoneView, and the language rune has to be read on the way past or the
 * components never notice a switch - the trap CLAUDE.md documents for `DB`.
 * The read happens unconditionally, on the first line, so that even an entry
 * that turns out to be a plain literal registers the dependency.
 */

import { tree, t, tf } from '../i18n/i18n.svelte.js';

/**
 * Depth-limited search for an event by id, anywhere in the tree.
 *
 * Lives here rather than in engine_events.js because two very different
 * readers need it - the engine and a component resolving a recipe - and this
 * module is the one both can reach, the same reasoning that put the activity
 * list in presence.js and the storage keys in keys.js.
 *
 * Event ids are unique across ALL pools (lint-data keeps `usedIDs` as one
 * global set), which is what lets a reference name an event without naming its
 * pool.
 */
export function findEventById(node, id, depth = 0) {
    if (!node || typeof node !== 'object' || depth > 3) return null;
    if (node.id === id) return node;
    for (const child of Object.values(node)) {
        const hit = findEventById(child, id, depth + 1);
        if (hit) return hit;
    }
    return null;
}

/** Walks a path of keys and indices. Anything missing ends the walk at null. */
function atPath(root, path) {
    let node = root;
    for (const step of path) {
        if (node == null || typeof node !== 'object') return null;
        node = node[step];
    }
    return typeof node === 'string' ? node : null;
}

/**
 * A reference into the current tree, or null if it does not resolve.
 *
 *   { i: 'cof_donut_1', path: ['opts', 1, 'r'] }   an event, found by id
 *   { p: 'items', i: 'donut', path: ['use','log'] } a pool keyed by id
 *   { p: 'special', path: ['leet', 3] }             a pool read directly
 *
 * Null is a normal answer, not a fault: content moves between versions, and a
 * save from before a change may point at something that is gone. The caller
 * falls back to the sentence as it was written.
 */
export function resolveRef(ref) {
    const DB = tree();
    if (!ref || !Array.isArray(ref.path)) return null;

    let root = null;
    if (ref.p && ref.i) root = DB?.[ref.p]?.[ref.i];
    else if (ref.p)     root = DB?.[ref.p];
    else if (ref.i)     root = findEventById(DB, ref.i);

    return root ? atPath(root, ref.path) : null;
}

/**
 * A recorded entry as the sentence it should read right now, or null when it
 * cannot be told any more - see the note at the top on why null and not a
 * stored copy.
 *
 * Never throws: this runs for every line of the log on every repaint, and an
 * error here takes the whole right-hand column down with it.
 */
export function renderRecipe(entry) {
    // Unconditional, so that even a literal makes its reader a reader of the
    // language rune. See the note at the top.
    tree();

    if (!entry) return null;

    if (entry.ref) return resolveRef(entry.ref);

    if (entry.k) {
        const source = entry.v ?? {};
        const vars = {};
        for (const [name, value] of Object.entries(source)) {
            if (value && typeof value === 'object') {
                const resolved = renderRecipe(value);
                // A sentence with a hole in it is not the sentence, so one
                // unresolvable value discards the whole recipe.
                if (resolved === null) return null;
                vars[name] = value.up ? resolved.toUpperCase() : resolved;
            } else {
                vars[name] = value;
            }
        }
        const out = Object.keys(vars).length ? tf(entry.k, vars) : t(entry.k);
        // t() answers with the key itself when the entry is gone. On screen
        // that is a readable marker while translating; in a log line it is
        // debris, so it counts as unresolved.
        return out === entry.k ? null : out;
    }

    // No identity to hold: a machine line, or an entry written by 5.x.
    return typeof entry.msg === 'string' ? entry.msg : null;
}

/**
 * An item's display name as a recipe VALUE, for the six log lines that name one.
 *
 * Falls back to the bare id when the item is unknown, which is what the call
 * sites did before and is worth keeping: an id on screen says "this item is
 * missing from the tree", while a vanished line says nothing at all. The
 * linter keeps loot ids honest, so this is a belt on top of braces.
 */
export function itemNameValue(id) {
    return tree()?.items?.[id] ? { ref: { p: 'items', i: id, path: ['name'] } } : String(id);
}

/**
 * A stable key for the duplicate check, from the IDENTITY rather than from the
 * rendered sentence.
 *
 * The old check compared finished text, which is the same mistake in miniature:
 * two different events that happen to read alike were folded into one, and the
 * same event in two languages was not. Comparing recipes fixes both.
 */
export function recipeKey(entry) {
    if (!entry) return '';
    if (entry.ref) return `r:${JSON.stringify(entry.ref)}`;
    if (entry.k) return `k:${entry.k}:${JSON.stringify(entry.v ?? {})}`;
    return `m:${entry.msg ?? ''}`;
}
