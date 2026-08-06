/**
 * Application entry point.
 *
 * The Svelte migration is complete: every part of the screen that changes
 * during play is a component. What the engine still owns is the static shell
 * in index.html — modals, the quick bar, the settings dialog — which it drives
 * with plain getElementById and inline onclick handlers. That split is the
 * architecture, not a leftover: components render state, the engine renders
 * chrome.
 *
 * Order matters: tutorial.js publishes window.tutorial, which engine.init()
 * checks for, and the engine has to exist before components read its state.
 */

import { mount } from 'svelte';

import './app.css';
import './tutorial.js';
import './engine.js';

import StatsHeader from './components/StatsHeader.svelte';
import LogFeed from './components/LogFeed.svelte';
import ActionBar from './components/ActionBar.svelte';
import InventorySlots from './components/InventorySlots.svelte';
import InventoryBadge from './components/InventoryBadge.svelte';
import Terminal from './components/Terminal.svelte';
import EmailView from './components/EmailView.svelte';
import PhoneView from './components/PhoneView.svelte';
import ArchiveView from './components/ArchiveView.svelte';
import TeamView from './components/TeamView.svelte';
import LoreView from './components/LoreView.svelte';
import GlobalStatsView from './components/GlobalStatsView.svelte';
import EndModal from './components/EndModal.svelte';
import TutorialPointer from './components/TutorialPointer.svelte';
import ExcuseText from './components/ExcuseText.svelte';
import InventoryFull from './components/InventoryFull.svelte';
import KeybindView   from './components/KeybindView.svelte';
import AchievementToasts from './components/AchievementToasts.svelte';
import TerminalHeader from './components/TerminalHeader.svelte';
import BoardView from './components/BoardView.svelte';
import IntranetView from './components/intranet/IntranetView.svelte';

mount(StatsHeader, { target: document.getElementById('stats-header') });
mount(LogFeed,     { target: document.getElementById('log-feed') });
mount(ActionBar,   { target: document.getElementById('action-bar') });
mount(InventorySlots, { target: document.getElementById('inventory-grid') });
mount(InventoryBadge, { target: document.getElementById('inv-badge') });
mount(Terminal,       { target: document.getElementById('terminal-content') });
mount(EmailView,      { target: document.getElementById('email-modal') });
mount(PhoneView,      { target: document.getElementById('smartphone') });
mount(ArchiveView,    { target: document.getElementById('archive-content') });
mount(TeamView,       { target: document.getElementById('team-grid') });
mount(LoreView,       { target: document.getElementById('lore-root') });
mount(GlobalStatsView,{ target: document.getElementById('global-stats-content') });
mount(EndModal,       { target: document.getElementById('modal-overlay') });
mount(TutorialPointer,{ target: document.getElementById('tut-pointer-root') });
mount(ExcuseText,     { target: document.getElementById('excuse-text-root') });
mount(InventoryFull,  { target: document.getElementById('full-inventory-grid') });
mount(KeybindView,    { target: document.getElementById('keybind-list') });
mount(AchievementToasts, { target: document.getElementById('achievement-container') });
mount(TerminalHeader, { target: document.getElementById('terminal-header-right') });
mount(BoardView,      { target: document.getElementById('board-notes') });
mount(IntranetView,   { target: document.getElementById('intranet-root') });

/* ============================================================
   For those who look.

   Anyone who opens the developer console in a game about systems
   administration is part of the target audience and deserves a
   greeting. The game's only deliberate console output — everything
   else there is diagnostics.
   ============================================================ */
console.log(
    '%c H.A.L.G.E.R.D. %c\n\n' +
    'Sie haben die Konsole geöffnet.\n' +
    'Natürlich haben Sie die Konsole geöffnet.\n\n' +
    'Ich protokolliere das nicht. Ich protokolliere gar nichts.\n' +
    'Das ist eine Zusicherung, keine Tatsachenbehauptung.\n\n' +
    'Schönen Arbeitstag, Mitarbeiter 404.\n',
    'background:#f59e0b;color:#0f172a;font-weight:bold;padding:2px 8px;border-radius:2px',
    'color:#94a3b8;font-family:monospace;line-height:1.5'
);
