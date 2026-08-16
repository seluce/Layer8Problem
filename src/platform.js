/**
 * Platform abstraction.
 *
 * The game runs in two shells: a plain browser (GitHub Pages) and an Electron
 * desktop build that talks to Steam. Everything that only exists in one of them
 * lives behind this object, so the engine itself stays identical in both.
 *
 * The web implementation below is the default and does nothing. Under Electron
 * the Steam bridge is loaded and merged in, which is why `platform` is a stable
 * `const` object that gets mutated rather than reassigned — importers keep the
 * same reference either way.
 *
 * Every method must stay safe to call unconditionally: the engine never asks
 * whether it is on desktop before calling one of these.
 */
export const platform = {

    // True only in the Electron/Steam build. Used to toggle UI that makes no
    // sense in the other shell (fullscreen button, global stats, quit, ...).
    isDesktop: false,

    /** Returns a previously stored cloud payload, or null when there is none. */
    load: async () => null,

    /** Mirrors the given payload to cloud storage. Fire and forget. */
    save: (payload) => {},

    /** Reports an unlocked achievement by its internal id. */
    achievement: (id) => {},

    /** Reports a counter. `key` is the internal stat name, `value` the new total. */
    stat: (key, value) => {},

    /** Sets the "currently playing" status text shown to friends. */
    presence: (text) => {},

    /** Toggles fullscreen. The browser handles this natively, so it is a no-op here. */
    fullscreen: () => {},

    /** Closes the game window. Not possible from a browser tab. */
    quit: () => {},

    /** Opens a URL outside the game. */
    openExternal: (url) => window.open(url, '_blank', 'noopener'),

    /** The URL to hand out when the player shares the game. */
    shareUrl: () => window.location.href,

    /** Aggregated worldwide statistics, or null when unavailable. */
    globalStats: async () => null,

    /**
     * The language Steam was told to start the game in, or null.
     *
     * Steam keeps a per-game language setting that can differ from the one the
     * operating system reports, so on the desktop this outranks
     * navigator.language. The browser has nothing to answer here.
     */
    language: async () => null
};

// --- DESKTOP UPGRADE ---
// main.js runs the renderer with nodeIntegration enabled and contextIsolation
// off, so `require` exists as a global there and nowhere else. That single
// check is what separates the two builds; the browser never fetches the bridge.
if (typeof require !== 'undefined') {
    try {
        const { desktop } = await import('./platform_steam.js');
        Object.assign(platform, desktop);
    } catch (err) {
        // Desktop shell without a usable bridge: keep the web defaults rather
        // than breaking the whole boot. The game is fully playable without Steam.
        console.warn("Desktop bridge unavailable, continuing with web defaults.", err);
    }
}

/**
 * Strips the platform markers from the DOM.
 *
 * Elements tagged .platform-desktop or .platform-web only belong to one shell.
 * The ones for the wrong shell are removed outright; the ones for the current
 * shell lose the marker class so their normal layout classes take over again
 * (.platform-desktop is display:none by default, see the style block in
 * index.html).
 *
 * Called once from engine.init().
 */
export function applyPlatformVisibility() {
    const keep = platform.isDesktop ? 'platform-desktop' : 'platform-web';
    const drop = platform.isDesktop ? 'platform-web' : 'platform-desktop';
    document.querySelectorAll('.' + drop).forEach(el => el.remove());
    document.querySelectorAll('.' + keep).forEach(el => el.classList.remove(keep));
}
