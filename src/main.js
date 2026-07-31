/**
 * Application entry point.
 *
 * Migration in progress. The vanilla engine still owns most of the DOM; Svelte
 * components take over one region at a time and mount into the placeholder
 * their markup used to occupy.
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
import AchievementToasts from './components/AchievementToasts.svelte';
import TerminalHeader from './components/TerminalHeader.svelte';

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
mount(AchievementToasts, { target: document.getElementById('achievement-container') });
mount(TerminalHeader, { target: document.getElementById('terminal-header-right') });
