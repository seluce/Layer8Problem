/**
 * The vending machine on the third floor, back section (6.3).
 *
 * A module of its own rather than a corner of engine_ui: only opening and
 * closing touch the page (the scroll lock), and everything else - the one take
 * a visit allows, the sandwich, the sheet on the glass - is game logic that the
 * test bench has to run as it runs in the game. engine_ui is deliberately not
 * part of that bench, because most of it needs the DOM.
 *
 * The window is components/VendingView.svelte, the words are data_vending.js.
 * It opens only from sq_kevin_geheim_2 through CMD:OPEN_VENDING, and that option
 * has already charged its minutes through resolveTerminal - so lunch, the
 * Friday meeting and closing time were checked on the way in, and nothing in
 * here touches the clock. The crank takes about a minute on screen and none
 * of its own on the clock, which is the joke: an afternoon on the page, and
 * the clock only knows the ten minutes Kevin's visit costs.
 */
import { ensure } from '../data.js';

// What can be taken out, one per visit. Named so that lint-data can read it: a
// `take` in data_vending.js that is not on this list would be a compartment
// that lights up and does nothing.
const VENDING_TAKES = ['magazine', 'printout', 'c4'];

// What each take leaves in the career, for the knowledge entry 'vending': one
// note per take, each hanging on one of these flags. A visit allows one take,
// so the book shows the other two as gaps - the reason to come back and take
// something else. Only archive.seenFlags gets them, never the week's story
// flags: nothing in the game follows from them but the note. lint-data reads
// this list and holds it against VENDING_TAKES and the compendium.
const VENDING_FLAGS = { magazine: 'vending_magazine', printout: 'vending_printout', c4: 'vending_c4' };

// Reading pace for the crank, about 200 words a minute. Until 6.3.0 each line
// waited only its own beat, 0.5 to 2.3 seconds whatever came before it, and a
// line of ninety characters was gone under the next one before it was read.
const READ_MS_PER_CHAR = 45;

/**
 * When each crank line appears: the time it takes to read the line before it,
 * plus the beat the data gives the line itself (`ms`). The rhythm stays in the
 * data - quick into it, the ninth turn hangs, the fall is fast - and the
 * reading time sits underneath it, so nobody is rushed and nobody waits.
 *
 * One entry more than there are lines: the last one is the reading time of
 * the final line, which the result card waits for. A card that came with the
 * label line would draw the eye away from it before the punchline.
 *
 * lint-data adds these up with this same function, so its limit measures what
 * the screen does rather than the beats alone.
 *
 * @param {{ms: number, text: string}[]} lines the crank and its closing lines
 * @returns {number[]} milliseconds before each line, and before the card
 */
export function crankDelays(lines) {
    const read = (line) => Math.round((line?.text?.length ?? 0) * READ_MS_PER_CHAR);
    return [
        ...lines.map((line, i) => line.ms + (i ? read(lines[i - 1]) : 0)),
        read(lines[lines.length - 1]),
    ];
}

export const vendingMachine = {

    openVending: async function() {
        // The window reads every line out of the pool; opened cold it would
        // show an empty machine. A failed fetch still opens it, as the book does.
        try { await ensure('vending'); } catch { /* the window opens with what there is */ }
        const stats = this.state.archive.stats ??= {};
        stats.vendingVisits = (stats.vendingVisits ?? 0) + 1;
        this.state.vending = { taken: null, delivered: false };
        this.state.vendingOpen = true;
        this.lockScroll('vending');
        this.saveSystem();
    },

    closeVending: function() {
        this.state.vendingOpen = false;
        this.state.vending = null;
        this.releaseScroll('vending');
    },

    /**
     * House rule 2, 'Nicht mehr als eins': the first take of a visit is the
     * only one, whatever it was. Returns whether this one counted.
     */
    vendingTake: function(kind) {
        const v = this.state.vending;
        if (!v || v.taken) return false;
        if (!VENDING_TAKES.includes(kind)) return false;
        v.taken = kind;
        // A magazine is read the moment it drops. C4 is known only once the
        // roll has landed, so its note waits for vendingDeliver.
        if (kind !== 'c4') this.noteVendingTake(kind);
        return true;
    },

    /**
     * The end of the crank: the sandwich falls. Once per visit and only if C4
     * was the take. Called when the crank has run its course, so a window
     * closed halfway gives nothing - the take is spent all the same, because
     * the rule on the glass says one, not one that worked.
     *
     * @returns {boolean} whether it reached the backpack; a full one leaves it
     *          in the flap, and grantItem says so in the log
     */
    vendingDeliver: function() {
        const v = this.state.vending;
        if (!v || v.taken !== 'c4' || v.delivered) return false;
        v.delivered = true;
        this.noteVendingTake('c4');
        return this.grantItem('sandwich', 'found');
    },

    /**
     * Records a take for the knowledge book, and saves straight away: the
     * window can be closed and the tab with it, and a note the player has
     * earned should not depend on the next action saving it.
     */
    noteVendingTake: function(kind) {
        this.recordSeen('flag', VENDING_FLAGS[kind]);
        this.saveSystem();
    },

    /**
     * How many of the club's names are on the sheet by now: two on the first
     * visit, one more on each later one, up to all of them. Counted across the
     * whole career, so the sheet fills over the weeks rather than within one.
     *
     * @param {number} total how many names the data tree has
     */
    vendingMembersShown: function(total) {
        const visits = this.state.archive.stats?.vendingVisits ?? 0;
        return Math.max(0, Math.min(total, visits + 1));
    },

    /**
     * The player's own line on the house rules, once and for good. Stores
     * WHERE it went - after how many names - so the names that arrive in later
     * weeks appear below it, the way a list on a door fills. In archive.stats,
     * because mergeArchives unites those counters with max(): a signature made
     * on one machine reaches the other, and an unsigned 0 never undoes it.
     *
     * @param {number} shownNow names on the sheet at the moment of signing
     */
    vendingSign: function(shownNow) {
        const stats = this.state.archive.stats ??= {};
        if (stats.vendingSignedAt) return false;
        stats.vendingSignedAt = Math.max(1, shownNow);
        this.saveSystem();
        this.playAudio('ui');
        return true;
    },
};
