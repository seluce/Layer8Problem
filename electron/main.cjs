// CommonJS on purpose: package.json declares "type": "module" for the Vite
// side, so the Electron main process keeps the .cjs extension.
const { app, BrowserWindow, shell, nativeTheme, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let win; // Kept global so the fullscreen toggle can reach it

// --- STEAMWORKS INIT ---
let steamClient = null; 
try { 
    const steamworks = require('steamworks.js'); 
    steamClient = steamworks.init(4487580); 
    console.log("Steam API connected."); 
} catch (err) {
    console.warn("Steam not running or invalid app id. Starting in standalone mode.", err);
}

// The renderer reports an unlocked achievement
ipcMain.on('steam-unlock-achievement', (event, achievementId) => { 
    if (steamClient) { 
        try { 
            steamClient.achievement.activate(achievementId);
            steamClient.stats.store();
        } catch (err) { 
            console.warn(`Steam achievement failed (${achievementId}):`, err);
        } 
    } 
});

// The renderer reports a counter increment
ipcMain.on('steam-increment-stat', (event, statName) => {
    if (steamClient) {
        try {
            // Read the current value, add one, persist
            let currentValue = steamClient.stats.getInt(statName) || 0;
            steamClient.stats.setInt(statName, currentValue + 1);
            steamClient.stats.store();
        } catch (err) {
            console.warn(`Steam stat failed (${statName}):`, err);
        }
    }
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

// Write the save file to disk
ipcMain.on('write-savegame', (event, jsonData) => {
    const savePath = path.join(app.getPath('userData'), 'savegame.dat');
    try {
        // Encode as Base64 so the file is not trivially editable
        const encodedData = Buffer.from(jsonData, 'utf8').toString('base64');
        fs.writeFileSync(savePath, encodedData, 'utf8');
    } catch (err) {
        console.error("Cloud save: write failed:", err);
    }
});

// Force external links into the OS default browser
ipcMain.on('open-external-browser', (event, url) => {
    try {
        shell.openExternal(url);
    } catch (err) {
        console.error("Could not open external browser:", err);
    }
});

// Steam rich presence (the status line friends can see)
ipcMain.on('steam-set-status', (event, statusText) => {
    if (steamClient) {
        try {
            steamClient.localplayer.setRichPresence('statustext', statusText);
            steamClient.localplayer.setRichPresence('steam_display', '#DisplayStatus');
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
                  + `?appid=4487580&count=${names.length}&${query}`;
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
    webPreferences: {
      nodeIntegration: true,  // required: platform_steam.js uses require()
      contextIsolation: false // required: same reason
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

// Intercept external links: prefer the Steam overlay, fall back to the browser
win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http')) {
      if (steamClient) {
          try {
              steamClient.overlay.activateToWebPage(url);
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

// Steam overlay hook for Electron. Must run BEFORE whenReady()
try {
    require('steamworks.js').electronEnableSteamOverlay();
} catch (err) {
    console.warn("Steam overlay could not be initialised.", err);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
