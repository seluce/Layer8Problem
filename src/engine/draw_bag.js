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

/**
 * One index out of `eligible`, without replacement across calls (7.2).
 *
 * drawIndex() draws from the whole list; GlobalCorp FM may only draw from
 * the spots that fit the moment - the morning show before ten, the canteen at
 * midday - and still wants every one of them heard before any comes round
 * again. So the bag keeps holding the whole list, and a draw takes the last
 * entry in it that is also eligible now. Only when none of the eligible ones
 * is left are THOSE put back, shuffled, in front of the rest: the morning
 * show starts its next cycle while the canteen's goes on where it was.
 *
 * @param {string}   name      which bag
 * @param {number}   size      how many entries the pool has right now
 * @param {number[]} eligible  the indices that may be drawn now
 * @returns {number|null} the drawn index, or null when nothing is eligible
 */
export function drawAmong(name, size, eligible) {
    const want = [...new Set(eligible)].filter(i => Number.isInteger(i) && i >= 0 && i < size);
    if (!want.length) return null;

    const bags = read();
    const stored = Array.isArray(bags[name]) ? bags[name] : null;
    // A bag never drawn from is the whole list, shuffled - the same start
    // drawIndex() makes.
    let bag = stored
        ? stored.filter(i => Number.isInteger(i) && i >= 0 && i < size)
        : shuffled([...Array(size).keys()]);

    const wanted = new Set(want);
    if (!bag.some(i => wanted.has(i))) bag = [...shuffled(want), ...bag];

    let at = bag.length - 1;
    while (!wanted.has(bag[at])) at--;
    const [pick] = bag.splice(at, 1);
    bags[name] = bag;
    write(bags);
    return pick;
}

/**
 * An index drawn and then hardly used goes back in, at the far end: it
 * stays in this cycle and comes round again after the rest (7.2, a radio
 * spot cut in its first seconds). An index already in the bag is left
 * where it is.
 */
export function returnToBag(name, index) {
    if (!Number.isInteger(index) || index < 0) return;
    const bags = read();
    const bag = Array.isArray(bags[name]) ? bags[name] : [];
    if (bag.includes(index)) return;
    bags[name] = [index, ...bag];
    write(bags);
}

/**
 * What is left of the current cycle, without drawing (7.2): the indices still
 * in the bag, or all of them for a bag never drawn from. GlobalCorp FM asks
 * it before it lets a spot jump the queue - a spot heard in this cycle may
 * still be drawn, but not ahead of the rest.
 */
export function stillInBag(name, size) {
    const stored = read()[name];
    if (!Array.isArray(stored)) return [...Array(size).keys()];
    return stored.filter(i => Number.isInteger(i) && i >= 0 && i < size);
}

function shuffled(list) {
    for (let i = list.length - 1; i > 0; i--) {                 // Fisher-Yates
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
}
