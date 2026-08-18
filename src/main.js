/**
 * Application entry point.
 *
 * The Svelte migration is complete: every part of the screen that changes
 * during play is a component. What the engine still owns is the static shell
 * in index.html — modal frames, the quick bar, export and import — which it
 * drives with plain getElementById and inline onclick handlers. That split is
 * the architecture, not a leftover: components render state, the engine
 * renders chrome.
 *
 * Order matters: tutorial.js publishes window.tutorial, which engine.init()
 * checks for, and the engine has to exist before components read its state.
 *
 * Since 6.0 there is a step in front of all of it. The event pools exist in two
 * languages (src/data/de, src/data/en) and the core tier is loaded rather than
 * statically imported, so nothing may render before the language is settled and
 * that tier is in - a component reading DB.items during mount would otherwise
 * find nothing. Hence the awaits below, and hence engine.init() moving out of
 * engine.js into this file.
 */

import { mount } from 'svelte';

import './app.css';
import './tutorial.js';
import { engine } from './engine.js';
import { wireActions } from './actions.js';
import { loadCore } from './data.js';
import { initLanguage, applyStaticStrings, t } from './i18n/i18n.svelte.js';

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
import KnowledgeView from './components/KnowledgeView.svelte';
import GlobalStatsView from './components/GlobalStatsView.svelte';
import EndModal from './components/EndModal.svelte';
import TutorialPointer from './components/TutorialPointer.svelte';
import ExcuseText from './components/ExcuseText.svelte';
import InventoryFull from './components/InventoryFull.svelte';
import KeybindView   from './components/KeybindView.svelte';
import SettingsView  from './components/SettingsView.svelte';
import AchievementToasts from './components/AchievementToasts.svelte';
import TerminalHeader from './components/TerminalHeader.svelte';
import BoardView from './components/BoardView.svelte';
import IntranetView from './components/intranet/IntranetView.svelte';

// 1. Which language, 2. that language's core data, 3. the engine, 4. the screen.
const language = await initLanguage();
applyStaticStrings();
await loadCore(language);
engine.init();

// One delegated listener for every data-action in index.html. Before it, the
// markup carried its own onclick handlers and reached the engine through a
// global; see src/actions.js.
wireActions();

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
mount(KnowledgeView,  { target: document.getElementById('knowledge-content') });
mount(GlobalStatsView,{ target: document.getElementById('global-stats-content') });
mount(EndModal,       { target: document.getElementById('modal-overlay') });
mount(TutorialPointer,{ target: document.getElementById('tut-pointer-root') });
mount(ExcuseText,     { target: document.getElementById('excuse-text-root') });
mount(InventoryFull,  { target: document.getElementById('full-inventory-grid') });
mount(KeybindView,    { target: document.getElementById('keybind-list') });
mount(SettingsView,   { target: document.getElementById('settings-list') });
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

   Which is why it takes t() and not fixed English: GLOSSAR 2b keeps
   the console English because a log is read by the maintainer, but
   this line is addressed to the player. H.A.L.G.E.R.D. follows the
   player's language everywhere else - tutorial, log lines - and this
   was the one place he did not.

   The only multi-line dictionary value in the project. The blank
   lines carry the timing, so the whole greeting is one entry rather
   than five, and whoever translates it next can regroup them.
   ============================================================ */
console.log(
    '%c H.A.L.G.E.R.D. %c\n\n' + t('console.greeting') + '\n',
    'background:#f59e0b;color:#0f172a;font-weight:bold;padding:2px 8px;border-radius:2px',
    'color:#94a3b8;font-family:monospace;line-height:1.5'
);
