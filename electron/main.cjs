// CommonJS on purpose: package.json declares "type": "module" for the Vite
// side, so the Electron main process keeps the .cjs extension.
const { app, BrowserWindow, shell, nativeTheme, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let win; // Kept global so the fullscreen toggle can reach it

const STEAM_APP_ID = 4487580;

// --- STEAMWORKS INIT ---
//
// steamworks-ffi-node since the leaderboards: steamworks.js (last release
// 0.4.0, August 2024) has no leaderboard API. This one calls the SDK through
// koffi and needs the SDK's redistributable_bin beside the app, in
// steamworks_sdk/ - Valve's licence keeps it out of npm, and out of the
// repository too (.gitignore). Without it, or without a running Steam, init()
// says no and the game runs standalone like the web build.
//
// The absolute path matters once packaged: the library resolves a relative
// one against the working directory, which is wherever Steam started us. In
// the package this points into app.asar, and the loader swaps that for
// app.asar.unpacked, where asarUnpack in package.json puts the binaries.
let steam = null;
try {
    const { SteamworksSDK } = require('steamworks-ffi-node');
    const sdk = SteamworksSDK.getInstance();
    sdk.setSdkPath(path.join(__dirname, '..', 'steamworks_sdk'));
    if (sdk.init({ appId: STEAM_APP_ID })) {
        steam = sdk;
        // steamworks.js ran the callbacks on its own, at 30 a second. This
        // library leaves it to the caller.
        setInterval(() => {
            try { steam.runCallbacks(); } catch { /* the next tick tries again */ }
        }, 1000 / 30);
        console.log("Steam API connected.");
    } else {
        console.warn("Steam not running or SDK missing. Starting in standalone mode.");
    }
} catch (err) {
    console.warn("Steam could not be loaded. Starting in standalone mode.", err);
}

// The renderer reports an unlocked achievement. unlockAchievement() stores
// the stats itself.
ipcMain.on('steam-unlock-achievement', (event, achievementId) => {
    if (!steam) return;
    steam.achievements.unlockAchievement(String(achievementId))
        .catch(err => console.warn(`Steam achievement failed (${achievementId}):`, err));
});

// The renderer reports a counter increment.
//
// One at a time: read, add one and write are three steps with an await in
// between, and two increments of the same stat in one tick - a week day ends
// and starts the next in one click - would both read 5 and both write 6.
// steamworks.js did all three synchronously and never had the question.
let statQueue = Promise.resolve();
ipcMain.on('steam-increment-stat', (event, statName) => {
    if (!steam) return;
    statQueue = statQueue.then(async () => {
        const name = String(statName);
        const current = (await steam.stats.getStatInt(name))?.value || 0;
        await steam.stats.setStatInt(name, current + 1);      // stores by itself
    }).catch(err => console.warn(`Steam stat failed (${statName}):`, err));
});

// --- LEADERBOARDS ---
//
// Three boards per mode, one per level; the renderer builds score and details
// in src/engine/leaderboard.js. The names are an allow-list here, so nothing
// from the renderer can create a board of its own choosing, and each board
// holds uploads to its own ceiling - week-flow.test.mjs holds both against
// BOARD_NAMES and the maxima there.
const DAY_MAX = 510 + 300;             // SHIFT_MINUTES + COMPOSURE_MAX
const WEEK_MAX = 2550 + 300;           // WEEK_MINUTES + COMPOSURE_MAX
const LEADERBOARDS = {
    day_easy: DAY_MAX, day_normal: DAY_MAX, day_hard: DAY_MAX,
    week_easy: WEEK_MAX, week_normal: WEEK_MAX, week_hard: WEEK_MAX,
};
const boardHandles = new Map();

async function boardHandle(name) {
    if (boardHandles.has(name)) return boardHandles.get(name);
    const { LeaderboardSortMethod, LeaderboardDisplayType } = require('steamworks-ffi-node');
    // Find OR create: a board the Steamworks backend does not have yet comes
    // into being with the first week submitted to it. Its community name is
    // then set in the backend.
    const info = await steam.leaderboards.findOrCreateLeaderboard(
        name, LeaderboardSortMethod.Descending, LeaderboardDisplayType.Numeric);
    if (!info?.handle) return null;
    boardHandles.set(name, info.handle);
    return info.handle;
}

// A finished day or week. Steam keeps the better of this and the stored score
// (KeepBest), details included, and says whether it changed.
ipcMain.handle('steam-leaderboard-submit', async (event, { board, score, details } = {}) => {
    if (!steam || !Object.hasOwn(LEADERBOARDS, board)) return null;
    const points = Math.round(Number(score));
    if (!Number.isFinite(points) || points < 0 || points > LEADERBOARDS[board]) return null;
    const values = (Array.isArray(details) ? details : []).slice(0, 64).map(v => Math.round(Number(v)) | 0);
    try {
        const { LeaderboardUploadScoreMethod } = require('steamworks-ffi-node');
        const handle = await boardHandle(board);
        if (!handle) return null;
        const res = await steam.leaderboards.uploadScore(handle, points, LeaderboardUploadScoreMethod.KeepBest, values);
        if (!res?.success) return null;
        return { ok: true, scoreChanged: res.scoreChanged, rank: res.globalRankNew, previousRank: res.globalRankPrevious };
    } catch (err) {
        console.warn(`Leaderboard upload failed (${board}):`, err);
        return null;
    }
});

// One board's entries: the global top 100, or the friends, and in both cases
// the player's own entry so the window can say where they stand even outside
// the top. Names are resolved here - the renderer has no Steam to ask.
ipcMain.handle('steam-leaderboard-entries', async (event, { board, scope } = {}) => {
    if (!steam || !Object.hasOwn(LEADERBOARDS, board)) return null;
    try {
        const { LeaderboardDataRequest } = require('steamworks-ffi-node');
        const handle = await boardHandle(board);
        if (!handle) return null;
        const me = steam.getStatus()?.steamId ? String(steam.getStatus().steamId) : null;

        const list = scope === 'friends'
            ? await steam.leaderboards.downloadLeaderboardEntries(handle, LeaderboardDataRequest.Friends, 0, 0)
            : await steam.leaderboards.downloadLeaderboardEntries(handle, LeaderboardDataRequest.Global, 1, 100);
        const mine = me ? await steam.leaderboards.downloadLeaderboardEntriesForUsers(handle, [me]) : [];

        const shape = (e) => ({
            steamId: e.steamId,
            rank: e.globalRank,
            score: e.score,
            // Plain arrays across IPC. The details may arrive as a list of
            // typed arrays (see normalizeDetails in leaderboard.js).
            details: (e.details ?? []).map(d => (typeof d === 'number' ? d : Object.values(d).map(Number))),
            name: e.steamId === me ? steam.friends.getPersonaName() : (steam.friends.getFriendPersonaName(e.steamId) || ''),
            me: e.steamId === me,
        });
        return { entries: (list ?? []).map(shape), mine: mine?.[0] ? shape(mine[0]) : null };
    } catch (err) {
        console.warn(`Leaderboard download failed (${board}):`, err);
        return null;
    }
});

// Which language did Steam start us in?
//
// Two sources, in that order: the Steamworks API, which knows the per-game
// setting, and the -language argument Steam appends when it launches the app.
// Both give an English language NAME ('german'), not a code - the renderer
// maps it. Returns null when neither is available, and the renderer then falls
// back to the browser preference exactly like the web build.
ipcMain.handle('steam-get-language', () => {
    if (steam) {
        try {
            const fromApi = steam.getCurrentGameLanguage();
            if (fromApi) return fromApi;
        } catch (err) {
            console.warn("Steam language unavailable:", err);
        }
    }
    const idx = process.argv.findIndex(a => a === '-language' || a === '--language');
    if (idx !== -1 && process.argv[idx + 1]) return process.argv[idx + 1];
    return null;
});

// Read the save file from disk
ipcMain.handle('read-savegame', () => {
    const savePath = path.join(app.getPath('userData'), 'savegame.dat');
    try {
        if (fs.existsSync(savePath)) {
            const encodedData = fs.readFileSync(savePath, 'utf8');
            // Decode Base64 back into readable UTF-8
            return Buffer.from(encodedData, 'base64').toString('utf8');
        }
    } catch (err) {
        console.error("Cloud save: read failed:", err);
    }
    return null;
});

// Write the save file to disk.
//
// Through a temp file and a rename, not straight over the real one: a
// writeFileSync truncates its target first, so a crash, a power cut or Steam
// closing the game mid-write left a half-written savegame.dat behind - and
// that is the whole career, with the cloud copy about to be overwritten by it.
// A rename inside the same directory is atomic, so the file on disk is either
// the old save or the new one and never half of either.
ipcMain.on('write-savegame', (event, jsonData) => {
    const savePath = path.join(app.getPath('userData'), 'savegame.dat');
    const tempPath = savePath + '.tmp';
    try {
        // Encode as Base64 so the file is not trivially editable
        const encodedData = Buffer.from(jsonData, 'utf8').toString('base64');
        fs.writeFileSync(tempPath, encodedData, 'utf8');
        fs.renameSync(tempPath, savePath);
    } catch (err) {
        console.error("Cloud save: write failed:", err);
        // Leave no half-written leftover standing around for the next write.
        try { if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath); } catch { /* nothing to clean */ }
    }
});

// The shared day card (6.4).
//
// Written here rather than let out as a DOWNLOAD. With no will-download
// handler Electron falls back to what its own documentation calls the
// original routine, and that "usually prompts a save dialog" - over a window
// that starts fullscreen, and on a Steam Deck in front of a player who has no
// mouse. So the picture goes somewhere predictable without being asked about,
// and the renderer is told where so the button can say it.
//
// Same temp-and-rename as the savegame above, for the same reason: a half
// written PNG is a broken picture, and this one is meant to be handed on.
ipcMain.handle('write-share-card', (event, { filename, base64 }) => {
    try {
        // basename(): the name is built in the renderer, and a name is all
        // this channel accepts - never a path of its own choosing.
        const name = path.basename(String(filename || 'layer8problem.png'));
        const dir = path.join(app.getPath('pictures'), 'Layer8Problem');
        fs.mkdirSync(dir, { recursive: true });

        const target = path.join(dir, name);
        const tempPath = target + '.tmp';
        fs.writeFileSync(tempPath, Buffer.from(base64, 'base64'));
        fs.renameSync(tempPath, target);
        return { ok: true, path: target, dir };
    } catch (err) {
        console.error("Share card: write failed:", err);
        return { ok: false };
    }
});

// Only web addresses leave the game. shell.openExternal hands anything to
// the operating system - a file: or a custom scheme opens whatever is
// registered for it - so the page names the address and this decides
// whether it is one.
const isWebUrl = (url) => {
    try { return ['http:', 'https:'].includes(new URL(String(url)).protocol); }
    catch { return false; }
};

// Force external links into the OS default browser
ipcMain.on('open-external-browser', (event, url) => {
    if (!isWebUrl(url)) return;
    try {
        shell.openExternal(url);
    } catch (err) {
        console.error("Could not open external browser:", err);
    }
});

// Steam rich presence (the status line friends can see).
//
// `token` is a localisation token such as '#Status_coffee', not a sentence.
// Steam looks it up in the rich presence localisation file for the language of
// the person READING the friends list, which is the whole point: before 6.0 the
// game sent the finished sentence through %statustext%, so an English player's
// German friends read English and the other way round.
//
// The tokens are generated by tools/make-steam-presence.mjs and have to be
// uploaded in Steamworks BEFORE a build using them goes out - an unknown token
// shows up as bare text in the friends list.
ipcMain.on('steam-set-status', (event, token) => {
    if (steam) {
        try {
            steam.richPresence.setRichPresence('steam_display', token);
        } catch (err) {
            console.warn("Steam rich presence failed:", err);
        }
    }
});

// Aggregated worldwide statistics from the public Steam Web API
ipcMain.handle('steam-get-global-stats', async () => {
    try {
        // Valve's public endpoint. Needs no API key as long as the stats are
        // set to "Aggregated" in the Steamworks backend.
        const names = [
            'stat_started', 'stat_survived', 'stat_ragequit', 'stat_fired',
            'stat_weeks_started', 'stat_weeks_survived', 'stat_weeks_ragequit', 'stat_weeks_fired'
        ];
        const query = names.map((n, i) => `name[${i}]=${n}`).join('&');
        const url = 'https://api.steampowered.com/ISteamUserStats/GetGlobalStatsForGame/v0001/'
                  + `?appid=${STEAM_APP_ID}&count=${names.length}&${query}`;
        const response = await fetch(url);
        const data = await response.json();
        
        return data.response.globalstats;
    } catch (err) {
        console.warn("Global stats unavailable (player probably offline):", err);
        return null; 
    }
});

function createWindow () {
  nativeTheme.themeSource = 'dark';

  win = new BrowserWindow({
    width: 1366,
    height: 768,
    fullscreen: true, // Start fullscreen by default
    autoHideMenuBar: true,
    icon: path.join(__dirname, '..', 'build', 'logo.png'),
    // The page gets no Node and no Electron: it runs sandboxed and isolated,
    // and reaches the main process only through the twelve functions
    // preload.cjs hands it. Until 7.0 both doors stood open, because
    // platform_steam.js required 'electron' itself.
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  // Vite builds to docs/ (served by GitHub Pages straight from the branch). In development, `npm run dev` serves the game and
  // ELECTRON_START_URL points here instead, which keeps hot reload working.
  const devServer = process.env.ELECTRON_START_URL;
  if (devServer) win.loadURL(devServer);
  else win.loadFile(path.join(__dirname, '..', 'docs', 'index.html'));

  // Suppress the default browser shortcuts for reload, devtools, fullscreen and zoom
  win.webContents.on('before-input-event', (event, input) => {
    const key = input.key.toLowerCase();
    const code = input.code; // physical key position, layout independent

    if (
      key === 'f5' || // Reload
      (input.control && key === 'r') || // Reload
      key === 'f12' || // DevTools
      key === 'f11' || // Fullscreen (nativ)
      (input.control && input.shift && key === 'i') || // DevTools
      // Zoom in (US equal key = German accent key, numpad +, dead keys)
      (input.control && (key === '+' || key === '=' || key === '*' || key === 'dead' || code === 'Equal' || code === 'NumpadAdd')) || 
      // Zoom out (US minus key = German ss/?, numpad -)
      (input.control && (key === '-' || key === '_' || key === 'ß' || key === '?' || code === 'Minus' || code === 'NumpadSubtract')) || 
      // Zoom reset
      (input.control && (key === '0' || code === 'Digit0' || code === 'Numpad0')) 
    ) {
      event.preventDefault();
    }
  });

  // Block zooming at the engine level as well (mouse wheel, native shortcuts)
  win.webContents.on('did-finish-load', () => {
    win.webContents.setVisualZoomLevelLimits(1, 1);
    win.webContents.setZoomFactor(1); // pin zoom at 100%
  });

  // The game is one page. A link without a target - or anything that ever
  // managed to inject one - must not turn this window into a browser that
  // still carries the bridge to the main process. Reloads keep the same
  // address and pass.
  win.webContents.on('will-navigate', (event, url) => {
    if (url !== win.webContents.getURL()) event.preventDefault();
  });

// Intercept external links: prefer the Steam overlay, fall back to the browser
win.webContents.setWindowOpenHandler(({ url }) => {
    if (isWebUrl(url)) {
      if (steam) {
          try {
              steam.overlay.activateGameOverlayToWebPage(url);
          } catch (err) {
              console.warn("Steam overlay failed, falling back to external browser:", err);
              shell.openExternal(url);
          }
      } else {
          // No Steam client: plain browser behaviour
          shell.openExternal(url); 
      }
      return { action: 'deny' }; 
    }
    return { action: 'allow' };
  });
}

// Fullscreen toggle requested by the renderer
ipcMain.on('toggle-fullscreen', () => {
    if (win.isFullScreen()) {
        win.setFullScreen(false);
        win.center();
    } else {
        win.setFullScreen(true);
    }
});

// Linux, hybrid graphics: skip Chromium's Vulkan probe.
//
// The overlay hook below forces --in-process-gpu (so Steam's renderer can
// reach our GL context). That moves GPU initialisation
// into the main process - and on a laptop with two cards the probe walks every
// installed driver profile, which wakes the discrete GPU. Measured on Linux
// Mint with an RTX 3060 beside an AMD Cezanne: seconds before the window
// appears, long enough for a launch through Steam to give up. Without the
// overlay preloaded the same build starts instantly, which is why it only ever
// failed under Steam.
//
// Skipping the Vulkan probe removes the stall (measured: instant) and costs
// nothing here - the game is DOM and composites through GL either way.
//
// Two switches that fixed it in testing and are deliberately NOT used:
// __GLX_VENDOR_LIBRARY_NAME=mesa would drop a machine whose only card is the
// NVIDIA one to software rendering, and --use-gl=desktop no longer exists in
// this Electron ("Requested GL implementation (gl=none,angle=none) not found").
if (process.platform === 'linux') {
    app.commandLine.appendSwitch('disable-features', 'Vulkan');
}

// Steam overlay hook for Electron. Must run BEFORE whenReady().
//
// What steamworks.js's electronEnableSteamOverlay() did, written out now that
// the library is gone: the overlay draws into our GL context, which needs the
// GPU in-process and no DirectComposition, and it only refreshes when
// Chromium paints - so an idle window is invalidated sixty times a second,
// or the achievement popup would freeze mid-slide. steamworks-ffi-node has
// an overlay of its own, marked experimental; this is the hook that has been
// shipping.
app.commandLine.appendSwitch('in-process-gpu');
app.commandLine.appendSwitch('disable-direct-composition');
app.on('browser-window-created', (_, bw) => {
    const repaint = setInterval(() => {
        if (bw.isDestroyed()) clearInterval(repaint);
        else if (!bw.webContents.isPainting()) bw.webContents.invalidate();
    }, 1000 / 60);
});

// One copy of the game at a time.
//
// Two windows share one savegame.dat and one Steam session: the second one
// reads the save at startup and the first one overwrites it at the next
// action, so whichever is closed last decides - and the other career is gone
// with no message anywhere. Started twice (Steam plus a desktop shortcut, or
// an impatient second click), the second instance now hands the job to the
// first and leaves.
if (!app.requestSingleInstanceLock()) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (!win) return;
        if (win.isMinimized()) win.restore();
        win.focus();
    });
    app.whenReady().then(createWindow);
}

// Hand the Steam session back cleanly, as the library asks.
app.on('before-quit', () => {
    try { steam?.shutdown(); } catch { /* quitting anyway */ }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
