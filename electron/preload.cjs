// The one door between the page and the main process.
//
// Until 7.0 the window ran with nodeIntegration on and contextIsolation off,
// so the page itself could require('electron') - and with it the file system
// and every IPC channel. That was tolerable while all it showed was our own
// data, and it stopped being so once the main process held a live Steam
// session (achievements, stats, leaderboards): anything that ever got to run
// script in the page would have had all of that.
//
// Now the page is sandboxed and isolated, and this file hands it twelve named
// functions and nothing else - no ipcRenderer, no channel names to choose
// from. Each one sends to exactly one channel in electron/main.cjs, and
// week-flow.test.mjs holds the two lists together along with what
// src/platform_steam.js calls.
//
// CommonJS for the reason main.cjs is: package.json says "type": "module".
// A sandboxed preload may require 'electron' and little else, which is all
// it needs.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopBridge', Object.freeze({
    // The save file
    readSave:           () => ipcRenderer.invoke('read-savegame'),
    writeSave:          (json) => ipcRenderer.send('write-savegame', String(json)),
    writeShareCard:     (filename, base64) => ipcRenderer.invoke('write-share-card', { filename: String(filename), base64: String(base64) }),

    // Steam
    unlockAchievement:  (id) => ipcRenderer.send('steam-unlock-achievement', String(id)),
    incrementStat:      (name) => ipcRenderer.send('steam-increment-stat', String(name)),
    setStatus:          (token) => ipcRenderer.send('steam-set-status', String(token)),
    globalStats:        () => ipcRenderer.invoke('steam-get-global-stats'),
    language:           () => ipcRenderer.invoke('steam-get-language'),
    leaderboardSubmit:  (board, score, details) => ipcRenderer.invoke('steam-leaderboard-submit', { board, score, details }),
    leaderboardEntries: (board, scope) => ipcRenderer.invoke('steam-leaderboard-entries', { board, scope }),

    // The window
    toggleFullscreen:   () => ipcRenderer.send('toggle-fullscreen'),
    openExternal:       (url) => ipcRenderer.send('open-external-browser', String(url)),
}));
