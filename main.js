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

mount(StatsHeader, { target: document.getElementById('stats-header') });
mount(LogFeed,     { target: document.getElementById('log-feed') });
mount(ActionBar,   { target: document.getElementById('action-bar') });
mount(InventorySlots, { target: document.getElementById('inventory-grid') });
mount(InventoryBadge, { target: document.getElementById('inv-badge') });
mount(Terminal,       { target: document.getElementById('terminal-content') });
