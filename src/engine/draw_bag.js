/**
 * Drawing without replacement, for the small text pools.
 *
 * Rolling an index afresh every time means a 30-headline ticker shows its
 * favourite seven times a career while others never appear at all, and 63 of
 * the 118 morning moods are never read. Repetition shows up here first: these
 * are the shortest texts and the ones a player meets most often.
 *
 * A bag holds what is left of a shuffled run of indices. It is emptied one
 * draw at a time and reshuffled when it runs dry, so a cycle shows every entry
 * exactly once and nothing repeats until the whole list has had its turn.
 *
 * Kept in localStorage next to the diary's memory of recent lines, which
 * solves the same problem the same way (engine_diary.loadMemory). Deliberately
 * NOT in the save file: nothing follows from it, it must not travel between
 * machines through the cloud merge, and a cleared storage means nothing worse
 * than a fresh shuffle.
 *
 * A bag is a bag of INDICES, not of ids: both data trees carry the same list
 * in the same order, so the same index is the same text in either language.
 */
import { KEYS } from './keys.js';

const read = () => {
    try { return JSON.parse(localStorage.getItem(KEYS.drawBags) ?? '{}') ?? {}; }
    catch { return {}; }
};

const write = (bags) => {
    try { localStorage.setItem(KEYS.drawBags, JSON.stringify(bags)); }
    catch { /* no storage, no memory - the draw still works, see below */ }
};

/**
 * One index out of 0..size-1, without replacement.
 *
 * @param {string} name  which bag; one per pool, and one per mood category
 * @param {number} size  how many entries the pool has right now
 * @returns {number} the drawn index, or 0 for an empty pool
 *
 * A pool that grew or shrank between versions simply refills sooner: indices
 * the list no longer has are dropped on the way in.
 */
export function drawIndex(name, size) {
    if (!size || size < 1) return 0;
    if (size === 1) return 0;

    const bags = read();
    const stored = Array.isArray(bags[name]) ? bags[name] : [];
    let bag = stored.filter(i => Number.isInteger(i) && i >= 0 && i < size);

    if (!bag.length) {
        bag = [...Array(size).keys()];
        for (let i = bag.length - 1; i > 0; i--) {              // Fisher-Yates
            const j = Math.floor(Math.random() * (i + 1));
            [bag[i], bag[j]] = [bag[j], bag[i]];
        }
    }

    const pick = bag.pop();
    bags[name] = bag;
    write(bags);
    return pick;
}
