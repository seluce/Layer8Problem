/**
 * Steam / Electron bridge.
 *
 * Loaded by platform.js only when running inside the desktop shell. This is the
 * single place in the renderer that knows about IPC — the engine never talks to
 * Electron directly.
 *
 * Every call here goes through electron/preload.cjs to one channel in
 * electron/main.cjs.
 */

// The twelve functions electron/preload.cjs exposes. The page has no Node and
// no ipcRenderer of its own any more (contextIsolation, sandbox) - this object
// is all of the main process it can reach, and platform.js loads this file
// only where it exists.
const bridge = window.desktopBridge;

const STORE_URL = 'https://store.steampowered.com/app/4487580/Layer8Problem/';

// Maps the game's internal counter names onto the stat names configured in the
// Steamworks backend. Anything not listed here is simply not reported.
/**
 * Internal counter -> Steam stat. Keys that are missing here never leave the
 * machine, which is intended: the archive holds far more than Steam needs.
 *
 * Two subtleties:
 *   - The three started_* keys share one Steam stat. daysStarted counts every
 *     day Mueller ever lived, week days included (the chronicle numbers its
 *     entries with it), so it would report week days as day runs. The
 *     per-difficulty keys are namespaced (a week day writes started_week_easy)
 *     and therefore count day runs only.
 *   - Everything week-related is its own stat. A week is one run, not five.
 */
const STAT_NAMES = {
    // --- Single days ---
    started_easy:   'stat_started',
    started_normal: 'stat_started',
    started_hard:   'stat_started',
    daysSurvived:   'stat_survived',
    daysRageQuit:   'stat_ragequit',
    daysFired:      'stat_fired',

    // --- Whole weeks (v5.0) ---
    weeksStarted:   'stat_weeks_started',
    weeksSurvived:  'stat_weeks_survived',
    weeksRageQuit:  'stat_weeks_ragequit',
    weeksFired:     'stat_weeks_fired'
};

export const desktop = {

    isDesktop: true,

    load: async () => {
        try {
            const raw = await bridge.readSave();
            return raw ? JSON.parse(raw) : null;
        } catch (err) {
            console.warn("Cloud save could not be read.", err);
            return null;
        }
    },

    save: (payload) => {
        try {
            bridge.writeSave(JSON.stringify(payload));
        } catch (err) {
            console.warn("Cloud save could not be written.", err);
        }
    },

    /**
     * Writes the shared day card next to the player's other pictures.
     *
     * The desktop shell has no share sheet - navigator.share and canShare are
     * both undefined in Electron - and must not be handed a download either:
     * that prompts for a save path over a fullscreen game. See the channel in
     * main.cjs.
     *
     * @returns {Promise<string|null>} the folder it landed in, or null when it
     *          could not be written. The caller then falls back to the
     *          browser's own download rather than losing the picture.
     */
    saveSharePicture: async (filename, base64) => {
        try {
            const res = await bridge.writeShareCard(filename, base64);
            return res?.ok ? res.dir : null;
        } catch (err) {
            console.warn("Share card could not be written.", err);
            return null;
        }
    },

    achievement: (id) => {
        try {
            bridge.unlockAchievement(id);
        } catch (err) {
            console.warn(`Achievement "${id}" could not be reported.`, err);
        }
    },

    // The backend counts up on its own, so the value is not forwarded — but it
    // stays in the signature so the web side can use it later if needed.
    stat: (key, value) => {
        const name = STAT_NAMES[key];
        if (!name) return;
        try {
            bridge.incrementStat(name);
        } catch (err) {
            console.warn(`Stat "${key}" could not be reported.`, err);
        }
    },

    presence: (token) => {
        try {
            bridge.setStatus(token);
        } catch (err) {
            console.warn("Rich presence could not be set.", err);
        }
    },

    fullscreen: () => {
        try {
            bridge.toggleFullscreen();
        } catch (err) {
            console.warn("Fullscreen could not be toggled.", err);
        }
    },

    quit: () => window.close(),

    // Routed through the main process so links open in the Steam overlay when
    // it is available, and in the system browser otherwise.
    openExternal: (url) => {
        try {
            bridge.openExternal(url);
        } catch (err) {
            console.warn("External link could not be opened.", err);
        }
    },

    shareUrl: () => STORE_URL,

    globalStats: async () => {
        try {
            return await bridge.globalStats();
        } catch (err) {
            console.warn("Global stats could not be fetched.", err);
            return null;
        }
    },

    // See platform.js for the shapes. Both answer null rather than throw, the
    // way globalStats does: a leaderboard that cannot be reached is not an
    // error the player has to read about.
    leaderboardSubmit: async (board, score, details) => {
        try {
            return await bridge.leaderboardSubmit(board, score, details);
        } catch (err) {
            console.warn("Leaderboard score could not be submitted.", err);
            return null;
        }
    },

    leaderboardEntries: async (board, scope) => {
        try {
            return await bridge.leaderboardEntries(board, scope);
        } catch (err) {
            console.warn("Leaderboard could not be fetched.", err);
            return null;
        }
    },

    language: async () => {
        try {
            return await bridge.language();
        } catch (err) {
            // Not worth a warning: detection falls back to the browser, which
            // is the same thing the web build does.
            return null;
        }
    }
};
