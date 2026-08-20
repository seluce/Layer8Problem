/**
 * How the tutorial listens to the engine.
 *
 * Until 6.1 it did not listen - it OVERWROTE. tutorial.run() wrapped seven
 * engine methods (openTeam, closeTeam, askUseItem, confirmUseItem,
 * closeItemConfirm, openInventory, closeInventory), kept the original in a
 * closure and called it from the wrapper. It worked, and it carried two prices.
 *
 * The wrappers were never removed. `hooksInjected` made sure they went on once,
 * and then every one of those seven calls ran through a tutorial wrapper for
 * the rest of the session - hours after the lesson, guarded by nothing but an
 * `if (tutorial.isActive)`. And whoever replaced one of those methods later, or
 * wrapped it a second time, got an ordering problem that shows up nowhere: each
 * wrapper captured its `orig…` at the moment it was installed.
 *
 * So the engine now says what happened and the tutorial listens - the same
 * shape onLanguageChange() has in i18n.svelte.js, registered from the other
 * side so the arrow points one way.
 *
 * TWO KINDS, and the difference matters more than it looks:
 *
 *   emit()  tells. Six of the seven only ever wanted to know afterwards.
 *
 *   allowsItem()  ASKS, and the answer can be no. askUseItem was never a
 *   notification: during step 8 the tutorial refuses every item that is not the
 *   doughnut and the modal stays shut. A pure listener list would have swallowed
 *   that refusal, the lock would have gone, and nothing would have failed - the
 *   player would simply have been able to eat the wrong thing during the lesson.
 *   That is why the veto is its own thing with its own name.
 *
 * The names are declared. A typo in emit() or on() throws here instead of
 * quietly registering an event nobody ever fires.
 */

export const ENGINE_EVENTS = [
    'openTeam', 'closeTeam',
    'openInventory', 'closeInventory',
    'confirmUseItem', 'closeItemConfirm',
];

export const hooks = {
    /** name -> Set of listeners. Built lazily; most runs never register any. */
    _watchers: new Map(),

    /** The one veto, or null. Set by the tutorial while it runs. */
    _itemGuard: null,

    /**
     * The lesson, while one is running - or null.
     *
     * The engine asks it things (`isActive`, `step`) at half a dozen places and
     * used to reach a bare `tutorial` global to do it, because importing
     * tutorial.js from the engine would close an import circle. Registering
     * from the other side opens the circle: tutorial.js knows the engine, the
     * engine only knows whatever registered itself here.
     */
    lesson: null,

    /**
     * Listen to one of ENGINE_EVENTS. Returns the way to stop listening, and
     * that return value is the point: the old wrappers had no way back.
     */
    on(name, fn) {
        if (!ENGINE_EVENTS.includes(name)) throw new Error(`Unknown engine event: "${name}"`);
        if (!this._watchers.has(name)) this._watchers.set(name, new Set());
        this._watchers.get(name).add(fn);
        return () => this._watchers.get(name)?.delete(fn);
    },

    /** Says that something happened. Never throws into the caller. */
    emit(name, ...args) {
        if (!ENGINE_EVENTS.includes(name)) throw new Error(`Unknown engine event: "${name}"`);
        for (const fn of this._watchers.get(name) ?? []) {
            try { fn(...args); }
            catch (e) { console.error(`Listener for "${name}" failed:`, e); }
        }
    },

    /** Registers the veto. Returns the way to take it back. */
    setItemGuard(fn) {
        this._itemGuard = fn;
        return () => { if (this._itemGuard === fn) this._itemGuard = null; };
    },

    /**
     * May this item be used? True when nobody objects - which is every state
     * of the game except a running tutorial.
     */
    allowsItem(id) {
        if (!this._itemGuard) return true;
        try { return this._itemGuard(id) !== false; }
        catch (e) { console.error('Item guard failed:', e); return true; }
    },
};
