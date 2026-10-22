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
 * It opens only from sq_kevin_geheim_3 through CMD:OPEN_VENDING, and that option
 * has already charged its minutes through resolveTerminal - so lunch, the
 * Friday meeting and closing time were checked on the way in, and nothing in
 * here touches the clock. The crank takes fifteen seconds on screen and none
 * on the clock, which is the joke: it only FEELS long.
 */
import { ensure } from '../data.js';

// What can be taken out, one per visit. Named so that lint-data can read it: a
// `take` in data_vending.js that is not on this list would be a compartment
// that lights up and does nothing.
const VENDING_TAKES = ['magazine', 'printout', 'c4'];

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
        return this.grantItem('sandwich', 'found');
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
