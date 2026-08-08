/**
 * Steam / Electron bridge.
 *
 * Loaded by platform.js only when running inside the desktop shell. This is the
 * single place in the renderer that knows about IPC — the engine never talks to
 * Electron directly.
 *
 * The counterpart for every channel used here lives in main.js.
 */

// window.require rather than a bare require(): the bundler must not try to
// resolve 'electron' at build time. Electron injects require onto window when
// nodeIntegration is on, which is the only situation this file is loaded in.
const { ipcRenderer } = window.require('electron');

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

    // --- Whole weeks (v4.2) ---
    weeksStarted:   'stat_weeks_started',
    weeksSurvived:  'stat_weeks_survived',
    weeksRageQuit:  'stat_weeks_ragequit',
    weeksFired:     'stat_weeks_fired'
};

export const desktop = {

    isDesktop: true,

    load: async () => {
        try {
            const raw = await ipcRenderer.invoke('read-savegame');
            return raw ? JSON.parse(raw) : null;
        } catch (err) {
            console.warn("Cloud save could not be read.", err);
            return null;
        }
    },

    save: (payload) => {
        try {
            ipcRenderer.send('write-savegame', JSON.stringify(payload));
        } catch (err) {
            console.warn("Cloud save could not be written.", err);
        }
    },

    achievement: (id) => {
        try {
            ipcRenderer.send('steam-unlock-achievement', id);
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
            ipcRenderer.send('steam-increment-stat', name);
        } catch (err) {
            console.warn(`Stat "${key}" could not be reported.`, err);
        }
    },

    presence: (text) => {
        try {
            ipcRenderer.send('steam-set-status', text);
        } catch (err) {
            console.warn("Rich presence could not be set.", err);
        }
    },

    fullscreen: () => {
        try {
            ipcRenderer.send('toggle-fullscreen');
        } catch (err) {
            console.warn("Fullscreen could not be toggled.", err);
        }
    },

    quit: () => window.close(),

    // Routed through the main process so links open in the Steam overlay when
    // it is available, and in the system browser otherwise.
    openExternal: (url) => {
        try {
            ipcRenderer.send('open-external-browser', url);
        } catch (err) {
            console.warn("External link could not be opened.", err);
        }
    },

    shareUrl: () => STORE_URL,

    globalStats: async () => {
        try {
            return await ipcRenderer.invoke('steam-get-global-stats');
        } catch (err) {
            console.warn("Global stats could not be fetched.", err);
            return null;
        }
    }
};
