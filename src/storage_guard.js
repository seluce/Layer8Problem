/**
 * A browser that refuses this page its storage, made playable.
 *
 * Some browsers throw on the mere mention of localStorage: site data blocked,
 * some private modes, and third-party storage blocked for a game embedded in
 * somebody else's page - itch.io serves its games from itch.zone inside
 * itch.io. engine_state reads its settings from localStorage while the module
 * loads, so a throw there stopped every import behind it: the start screen
 * stood, painted by index.html, and no button did anything.
 *
 * main.js imports this module first. When reading fails it puts a storage in
 * place that lives in memory for as long as the tab does, so everything that
 * reads or writes works as usual and nothing survives a reload - which
 * `storageLost` lets the start screen say.
 *
 * Only a failing READ swaps. A write refused for a full quota must not hide
 * the saves that are already there; the save functions catch that themselves.
 */

/** The Storage interface, minus persistence. */
function memoryStorage() {
    const data = new Map();
    return {
        get length() { return data.size; },
        key: (index) => [...data.keys()][index] ?? null,
        getItem: (key) => (data.has(String(key)) ? data.get(String(key)) : null),
        setItem: (key, value) => { data.set(String(key), String(value)); },
        removeItem: (key) => { data.delete(String(key)); },
        clear: () => { data.clear(); },
    };
}

export let storageLost = false;

try {
    window.localStorage.getItem('layer8_probe');
} catch {
    storageLost = true;
    Object.defineProperty(window, 'localStorage', { value: memoryStorage(), configurable: true });
}
