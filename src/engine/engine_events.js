import { DB, ensure } from '../data.js';
import { t, tf } from '../i18n/i18n.svelte.js';
import { platform } from '../platform.js';
import { PLAYER_CHAR, charDisplayName } from './chars.js';
import { findEventById, itemNameValue } from './recipe.js';

/**
 * One coloured sentence for the morning screen's status line.
 *
 * The colour stays in the code, the sentence goes in the dictionary: nobody
 * translating a line has to edit markup, and the class name stays a whole
 * literal. Tailwind reads the source - a name put together at runtime is
 * invisible to it and the colour then disappears without a word of warning.
 */
// The morning's status line, as a recipe plus the colour it is drawn in.
// Used to return an HTML fragment, which meant the sentence was rendered
// here and frozen in the language it was rendered in; components/
// MorningView.svelte builds the span itself now and resolves on every paint.
const moodLine = (cls, recipe) => ({ cls, ...recipe });

/**
 * The same event, out of the tree that is loaded NOW.
 *
 * Both trees carry the same ids - that is the rule the whole bilingual build
 * rests on (CLAUDE.md) - so an id is enough to find the other language's copy
 * of the scene a player is looking at.
 *
 * A search rather than a type-to-pool table on purpose: the type on screen can
 * be 'rep' (pool `reputation`), 'sidequest' (pool `sidequests`) or the
 * synthesised 'boss', and the two idle screens live under DB.special one level
 * deeper again. A table would have to know all of that and would go quietly
 * wrong the day a pool is renamed; a scan over a few thousand objects costs
 * nothing on an event that happens when a player picks a language.
 *
 * The depth stops at 3 (DB -> special -> week_idle -> entry), which is as deep
 * as an event ever sits. That also keeps it out of `nodes` and `opts`.
 */

export const events = {

    // How often an unlocked follow-up beats a fresh event. See pickFromPool.
    FOLLOWUP_CHANCE: 0.30,

    // --- EMAIL SYSTEM (clean light / logic fixes) ---
    checkRandomEmail: function() {
        // 1. Basic checks (open? on the move? tutorial?)
        if(this.state.isEmailOpen || this.state.emailPending) return; 
        if(typeof tutorial !== 'undefined' && tutorial.isActive) return;
        if (this.state.isPartyMode) return;

        // --- INGAME-ZEIT COOLDOWN ---
        // Block if a mail already arrived within the last 25 in-game minutes
        if (this.state.lastEmailTime && (this.state.time - this.state.lastEmailTime < 25)) return;
        // ---------------------------------

        // --- ID BASED CHECK (WHITELIST & BLACKLIST) ---
        const id = this.state.currentEventId || "";
        const isAllowed = id.includes('srv_') || 
                          id.includes('cof_') || 
                          id.includes('sq_')  || 
                          id.includes('call_');

        if (!isAllowed) return; 
        if (id.includes('boss')) return;
        if (id.includes('lunch')) return;

        // 3. SPAM GUARD (last event)
        if (this.state.lastEmailEventId === this.state.currentEventId) return;

        // 4. Probability (was 20%, now a 15% base)
        let baseChance = 0.15 * this.effMult(); 
        // Was +5% per ticket, now +4% per ticket.
        let chance = baseChance + (this.state.tickets * 0.04); 
        
        // Cap: no matter how many tickets, the per-click chance never exceeds 35%
        chance = Math.min(0.35, chance);
        
        if(Math.random() < chance) {
            this.state.lastEmailEventId = this.state.currentEventId;
            
            // --- Remember the time for the cooldown ---
            this.state.lastEmailTime = this.state.time;
            
            this.state.emailPending = true; 
            
            // Kill any delay timer still running
            if (this.state.emailDelayTimer) clearTimeout(this.state.emailDelayTimer);
            
            // Keep the handle so it can be cancelled
            this.state.emailDelayTimer = setTimeout(() => { 
                this.triggerEmail(); 
            }, 2000);
        }
    },

    // Opens the mail overlay
    // async: the mail pool loads on demand, see data.js
    triggerEmail: async function(forcedId = null) {
        await ensure('emails');
		
        // Never fire during a boss fight
        if (this.state.bossTimer || this.state.currentEventType === 'boss') {
            this.state.emailPending = false;
            return;
        }
        // -------------------------------
		
		this.playAudio('email');
        this.state.emailPending = false; 

        if(!DB.emails) return; 
        
        let email;
        if (forcedId) {
            email = DB.emails.find(e => e.id === forcedId);
        } else {
            let availableEmails = DB.emails.filter(e => 
                !this.state.usedEmails.has(e.id) && !e.linked
            );
            if(availableEmails.length === 0) {
                this.state.usedEmails.clear(); 
                availableEmails = DB.emails.filter(e => !e.linked);
            }
            email = availableEmails[Math.floor(Math.random() * availableEmails.length)];
        }

        if (!email) return;

        // 1. FREEZE & STATUS
        this.state.usedEmails.add(email.id);
        this.state.isEmailOpen = true; 

        // 2. UI REFERENZEN
        // Everything the window shows comes from here; components/
        // EmailView.svelte does the rendering, including the countdown bar.
        this.state.email = email;

        // The overlay itself belongs to index.html, so its visibility is still
        // toggled here. EmailView.svelte only renders the contents.
        const modal = document.getElementById('email-modal');
        if (modal) {
            this.showOverlay(modal);
        }

        const DURATION = 20000;
        if(this.state.emailTimer) clearTimeout(this.state.emailTimer);
        this.state.emailTimer = setTimeout(() => {
            this.resolveEmail(null, true); 
        }, DURATION);
    },

    /**
     * Picks one event from a pool, giving unlocked follow-ups priority.
     *
     * Follow-ups jump the queue 30% of the time. That number is the whole
     * pacing of a day: too high and every thread resolves within minutes, too
     * low and half the written follow-ups are never seen. It lived in three
     * places, so changing it meant changing it three times.
     */
    pickFromPool: function(pool) {
        if (!pool?.length) return null;
        const followUps = pool.filter(ev => ev.reqStory);
        const base = pool.filter(ev => !ev.reqStory);
        const draw = (list) => list[Math.floor(Math.random() * list.length)];

        if (followUps.length && Math.random() < this.FOLLOWUP_CHANCE) return draw(followUps);
        if (base.length) return draw(base);
        return followUps.length ? draw(followUps) : null;   // only follow-ups left
    },

    /**
     * A day only counts as started once the player has decided something, not
     * when the page opens. Used to sit in two places, word for word.
     */
    markDayStarted: function() {
        if (this.state.dayActive) return;
        this.state.dayActive = true;
        this.incrementStat('daysStarted');
        this.incrementStat('started_' + this.difficultyKey());
    },

    /**
     * Puts an item into the backpack, with every special case: permanent
     * items and trophies exist once, consumables fit ten times over, and a
     * full backpack means leaving things behind.
     *
     * Until v4.0.0 this sat in the file twice, almost word for word (mail and
     * terminal), which had already led to one copy not knowing a rule.
     *
     * `kind` picks the log caption and is an identifier, not a caption itself:
     * the mail says RECEIVED where the terminal says ITEM, and a caption
     * handed in from outside would be a display string travelling through the
     * engine - which is how the German edition used to be the only one that
     * worked.
     */
    grantItem: function(itemId, kind = 'found') {
        if (!itemId) return;
        const dbItem = DB.items[itemId];
        const isPermanent = dbItem && (dbItem.keep || dbItem.quest);
        const alreadyHas = this.state.inventory.some(i => i.id === itemId);

        // Trophies and permanent tools do not count towards capacity
        const normalCount = this.state.inventory.filter(i => {
            const db = DB.items[i.id];
            return db && !db.quest;
        }).length;

        if (isPermanent && alreadyHas) return;   // still verworfen

        if (!isPermanent && normalCount >= 10) {
            this.log({ k: 'log.backpackFull', v: { item: itemNameValue(itemId) } }, "text-slate-500 italic");
            return;
        }

        this.state.inventory.push({ id: itemId, used: false });
        this.addToArchive('items', itemId);
        this.log({ k: kind === 'received' ? 'log.item.received' : 'log.item.found',
                   v: { item: itemNameValue(itemId) } }, "text-yellow-400");
        if (dbItem?.img && typeof this.animateItemToBackpack === 'function') {
            this.animateItemToBackpack(dbItem.img);
        }
    },

    /**
     * Applies reputation changes and keeps them within -100 to 100. Used to
     * exist in three places; one of them had forgotten the save call.
     */
    /**
     * Story flags remember WHEN they were set: a running week writes its
     * dayIndex (1-5, all truthy), the single day writes true. Every existing
     * truthiness check keeps working unchanged; reqStoryAge needs the number.
     * Old saves hold true - age-gated events simply never fire for them,
     * which is the correct degradation (no migration needed).
     */
    setStoryFlag: function(name) {
        if (!name) return;
        this.state.storyFlags[name] = this.state.week?.active ? this.state.week.dayIndex : true;
        this.recordSeen('flag', name);
    },

    /**
     * Every time condition of an event in one place (design: Dreiteiler).
     * reqStoryAge counts NIGHTS since the flag was set (1 = tomorrow at the
     * earliest), reqWeekDayMin is an absolute 'from this weekday on' (1-5).
     * Both are unsatisfiable outside a running week, so dated chain parts
     * are week-exclusive without any mode flag - and same-day follow-ups
     * with an age are excluded by definition.
     */
    storyGateOpen: function(ev) {
        if (ev.reqStory && !this.state.storyFlags[ev.reqStory]) return false;
        if (ev.reqStoryAge != null) {
            const set = this.state.storyFlags[ev.reqStory];
            if (!this.state.week?.active || typeof set !== 'number') return false;
            if (this.state.week.dayIndex - set < ev.reqStoryAge) return false;
        }
        if (ev.reqWeekDayMin != null) {
            if (!this.state.week?.active || this.state.week.dayIndex < ev.reqWeekDayMin) return false;
        }
        return true;
    },

    /**
     * Passive items: they do their work when an event OPENS, before the
     * player has chosen anything - currently gated by the character on
     * screen (data_items.js, `passive`). Deliberately not a flat bonus per
     * event: a permanent effect that always applies is invisible, while one
     * tied to a person is a moment, and the tenth backpack slot it occupies
     * is the actual decision.
     *
     * Called from the three places an event becomes visible: renderTerminal,
     * the phone branch and the boss fight. NOT from renderEventHTML, which
     * renderTerminal itself calls - that would fire twice.
     */
    /**
     * Records what the player has seen, permanently, for the compendium.
     * Kept as raw evidence (event ids, story flags) rather than as unlocked
     * notes: entries written later then light up for players who already
     * played the scene, instead of staying dark forever.
     *
     * Bounded by the number of events in the game, so the archive stays a
     * few kilobytes.
     */
    recordSeen: function(kind, value) {
        if (!value) return;
        const list = kind === 'flag' ? this.state.archive.seenFlags : this.state.archive.seenEvents;
        if (!list || list.includes(value)) return;
        list.push(value);
    },

    applyPassiveItems: function(charName) {
        if (!charName) return;
        for (const entry of this.state.inventory) {
            const p = DB.items[entry.id]?.passive;
            if (!p || p.onChar !== charName) continue;

            if (p.b) {
                this.state.cr = Math.max(0, Math.min(100, this.state.cr + p.b));
                this.showFloatingText('val-cr', p.b);
            }
            if (p.a) {
                this.state.al = Math.max(0, Math.min(100, this.state.al + p.a));
                this.showFloatingText('val-al', p.a);
            }
            if (p.l) {
                this.state.fl = Math.max(0, Math.min(100, this.state.fl + p.l));
                this.showFloatingText('val-fl', p.l);
            }
            // A number floating up on its own looks like a bug. The log line
            // says who caused it, and it is not optional for that reason.
            this.log({ ref: { p: 'items', i: entry.id, path: ['passive', 'log'] } }, p.color ?? 'text-slate-300');
        }
        this.updateUI();
    },

    /**
     * Adds to a stat and keeps it in 0..100 immediately.
     *
     * The clamp used to live in updateUI() alone. With runes the bars read
     * state.fl directly and redraw the moment it changes, so a value of 105
     * was on screen for one frame before updateUI() pulled it back - visible
     * as a bar that overshoots and then settles. Clamping where the value is
     * written removes that intermediate state, and protects any path that
     * changes a stat without calling updateUI() straight after.
     */
    addStat: function(key, delta) {
        if (!delta) return;
        this.state[key] = Math.max(0, Math.min(100, this.state[key] + delta));
    },

    applyReputation: function(rep) {
        if (!rep) return false;
        for (const [charName, val] of Object.entries(rep)) {
            const current = this.state.reputation[charName] ?? 0;
            this.state.reputation[charName] = Math.max(-100, Math.min(100, current + val));
        }
        this.saveSystem();
        return true;
    },

    resolveEmail: function(opt, timeout = false) {
        // NEW SPAM GUARD ---
        if (!this.state.isEmailOpen) return;
        // -------------------------
        
        this.markDayStarted();
        // ---------------------------------------------
		
        this.playAudio('ui');
        if(this.state.emailTimer) clearTimeout(this.state.emailTimer);
        
        const modal = document.getElementById('email-modal');
        if(modal) {
            this.hideOverlay(modal);
        }
        
        // --- CHANGE 1: block the system straight away ---
        this.state.isEmailOpen = false;
        this.state.emailPending = true; // Blockiert checkRandomEmail
        // -------------------------------------------

        // Game logic. `message` is a RECIPE, not a sentence - see
        // engine/recipe.js. The mail on screen and the index of the option
        // inside it are the identity of what was answered, and both are here.
        const mailId = this.state.email?.id ?? null;
        const optIndex = opt ? (this.state.email?.opts ?? []).indexOf(opt) : -1;
        const optRef = (mailId && optIndex > -1)
            ? (field) => ({ ref: { i: mailId, path: ['opts', optIndex, field] } })
            : () => null;

        let message = null;
        let color = "";

        if(timeout) {
            let penalty = Math.ceil(10 * this.effMult());
            this.addStat('cr', penalty);
            this.state.emailsIgnored++;
            message = { k: 'log.email.ignoredRadar', v: { value: penalty } };
            color = "text-red-500 font-bold";
        } else if(opt) {
            if (opt.ignoreEmail) {
                // Two whole sentences instead of a fragment glued onto one:
                // the penalty does not sit at the end of the sentence in every
                // language, and half a sentence cannot be reordered.
                const penalty = opt.b > 0 ? Math.ceil(opt.b * this.effMult()) : 0;
                message = penalty > 0 ? { k: 'log.email.ignoredRadar', v: { value: penalty } }
                                      : { k: 'log.email.ignored' };
                color = "text-red-500 font-bold";
            } else {
                message = { k: 'log.email.sent', v: { text: optRef('t') ?? opt.t } };
                color = "text-blue-400";
            }

            let mult = this.effMult();
            
            // Cache the final values for the animation
            let addedL = opt.l || 0;
            let addedA = opt.a ? Math.ceil(opt.a * mult) : 0;
            let addedB = opt.b ? Math.ceil(opt.b * mult) : 0;

            this.addStat('fl', addedL);
            this.addStat('al', addedA);
            this.addStat('cr', addedB);

            // --- Floating text for mails ---
            if (addedL !== 0) this.showFloatingText('val-fl', addedL);
            if (addedA !== 0) this.showFloatingText('val-al', addedA);
            if (addedB !== 0) this.showFloatingText('val-cr', addedB);
            // --------------------------------------

            // The ignore flag in the data files feeds the ghosting stat
            if(opt.ignoreEmail) this.state.emailsIgnored++;

            this.triggerShake(addedA, addedB);

            this.grantItem(opt.loot, 'received');

            // 2. TIME LOGIC (opt.m)
            if (opt.m) {
                const before = this.state.time;
                this.state.time += opt.m;
                this.checkLeetMoment(before);
            }

            // 3. REPUTATION LOGIC (opt.rep)
            this.applyReputation(opt.rep);

            // 4. TEXT LOGIC (opt.r)
            if (opt.r) {
                const rRef = optRef('r');
                if (opt.ignoreEmail) {
                    setTimeout(() => this.log(rRef ?? { msg: String(opt.r) },
                                              "text-slate-500 italic"), 500);
                } else {
                    setTimeout(() => this.log({ k: 'log.email.reply', v: { text: rRef ?? opt.r } },
                                              "text-slate-400 italic"), 500);
                }
            }

            if (opt.nextEmail) {
                // --- CHAIN-TIMER ---
                if (this.state.emailChainTimer) clearTimeout(this.state.emailChainTimer);
                
                this.state.emailChainTimer = setTimeout(() => {
                    this.triggerEmail(opt.nextEmail);
                }, 2500);
                // ----------------------------
            }
        }
        
        // --- SYSTEM FREIGEBEN ---
        // No option chosen (timeout or ignore) and no follow-up queued
        if (!opt || !opt.nextEmail) {
            if (this.state.emailCooldownTimer) clearTimeout(this.state.emailCooldownTimer);
            
            // Unblocks the mail system after five seconds
            this.state.emailCooldownTimer = setTimeout(() => {
                this.state.emailPending = false;
            }, 5000); 
        }
        // ----------------------------------------------
        
        if (message) this.log(message, color);
        this.updateUI();
        if (this.state.pendingEnd) this.finishGame();
    },
    
    // async: the event pools load on demand, see data.js
    trigger: async function(type) {
		this.playAudio('action');
		// Blocked during the party
		if (this.state.isPartyMode) return;
        // Blocked while an event is already open
        if(this.state.activeEvent) return;
        
        // --- TUTORIAL HOOK ---
        if (typeof tutorial !== 'undefined' && tutorial.isActive) {
            // Pull the exact event for the current tutorial step
            let tutEvent = DB.tutorial.find(e => e.type === type && e.step === tutorial.step);
            if (tutEvent) {
				tutorial.hidePointer();
                this.renderTerminal(tutEvent, type);
            } else {
                this.log({ k: 'log.halgerd.notInPhase' }, "text-red-500");
            }
            return; // Cancel the normal trigger!
        }
        
        this.markDayStarted();
        
        // Make sure everything this function touches is in memory. Resolves
        // instantly once loaded, so calling it every time costs nothing.
        //
        // activeEvent is only set later, inside renderTerminal — during the very
        // first load that leaves a window in which a second click would slip
        // past the guard above and trigger two events. isLoadingPool closes it.
        const poolName = (type === 'sidequest') ? 'sidequests' : type;
        if (!DB[poolName] || !DB.bossfights || !DB.reputation) {
            if (this.state.isLoadingPool) return;
            this.state.isLoadingPool = true;
            this.disableButtons(true);
            try {
                await ensure(poolName, 'bossfights', 'reputation');
            } catch (err) {
                this.log({ k: 'log.halgerd.loadFailed' }, "text-red-500");
                return;
            } finally {
                this.state.isLoadingPool = false;
                this.disableButtons(false);
            }
        }

        // ---------------------------------------------------------
        // 1. BOSS CHECK (the "disaster")
        // ---------------------------------------------------------
        // 5% chance, on every button including calls and sidequests.
        // If the boss shows up, nothing else matters.
        let bossPool = DB.bossfights.filter(ev => !this.state.usedIDs.has(ev.id));
        
        if (this.state.time > 540 && bossPool.length > 0 && Math.random() < 0.05) {
             this.triggerBossFight();
             return; // pre-empts the intended action
        }

        // ---------------------------------------------------------
        // 2. INTERVENTION CHECK (Ruf-System)
        // ---------------------------------------------------------
        // 10% chance, also on every button: a colleague intercepts you.
        if (DB.reputation) {
            
            // A. Collect every event the player is eligible for (reputation or story flag)
            let possibleInterventions = DB.reputation.filter(ev => {
                if (this.state.usedIDs.has(ev.id)) return false; 

                // Story continuation: flag set, and old enough / late enough?
                if (ev.reqStory) {
                    return this.storyGateOpen(ev);
                }
                
                // Plain reputation event: check the thresholds
                if (ev.reqRep) {
                    for (let [char, threshold] of Object.entries(ev.reqRep)) {
                        let currentRep = this.state.reputation[char] || 0;
                        // Positive threshold means at least X, negative means at most X
                        if (threshold > 0 && currentRep < threshold) return false;
                        if (threshold < 0 && currentRep > threshold) return false;
                    }
                    return true;
                }
                
                return false;
            });

            // B. Roll: 10% chance an encounter happens at all
            if (possibleInterventions.length > 0 && Math.random() < 0.10) {
                
                // 1. Split into story continuations and base events
                let storyEvents = possibleInterventions.filter(e => e.reqStory);
                let baseEvents = possibleInterventions.filter(e => !e.reqStory);
                
                let intervention = null;

                // Same rule as the action pools: continuations first, then
                // ordinary encounters.
                if (storyEvents.length > 0 && Math.random() < this.FOLLOWUP_CHANCE) {
                    intervention = storyEvents[Math.floor(Math.random() * storyEvents.length)];
                } 
                else if (baseEvents.length > 0) {
                    intervention = baseEvents[Math.floor(Math.random() * baseEvents.length)];
                }
                // Fallback: only story events exist but the 30% roll failed
                else {
                    intervention = possibleInterventions[Math.floor(Math.random() * possibleInterventions.length)];
                }
                
                if (intervention) {
                    this.log({ k: 'log.encounter',
                   v: { title: { ref: { i: intervention.id, path: ['title'] } } } }, "text-yellow-400");
                    
                    // Rendered as type 'rep' for the golden styling
                    this.renderTerminal(intervention, 'rep'); 
                    return; // pre-empts the intended action
                }
            }
        }

        // ---------------------------------------------------------
        // 3. THE ACTUAL ACTION (nothing intercepted it)
        // ---------------------------------------------------------
        
        // Week mode: every action pool has a daily contingent so that no
        // pool can be clicked empty before Friday (design 6.2). An exhausted
        // contingent behaves like an exhausted pool: idle line, time passes.
        if (this.state.week.active && this.weekContingentLeft(type) <= 0) {
            this.renderTerminal(this.weekIdleEvent(type), type);
            return;
        }

        // Special case: phone and sidequest logic
        if (type === 'sidequest') { 
            this.handleSideQuest(); 
            return; 
        }

        // Default: a random event from the chosen pool (coffee, server, calls)
        let pool = DB[type].filter(ev => {
            if (this.state.usedIDs.has(ev.id)) return false;
            if (!this.storyGateOpen(ev)) return false;
            // webOnly events point at the store page - pointless once bought
            if (ev.webOnly && platform.isDesktop) return false;
            return true;
        });

        // Fallback for an exhausted pool
        if (pool.length === 0) { 
            this.renderTerminal(DB.special.empty_pool, type); 
            return; 
        }
        
        // --- FOLGE-EVENT PRIORISIERUNG (30% Chance) ---
        const ev = this.pickFromPool(pool);
        this.spendContingent(type);   // books today's week budget (no-op in day mode)
        
        // Start the event
        this.renderTerminal(ev, type);
    },

    triggerBossFight: function() {
		
        // --- FIX: NO EMAILS DURING BOSSFIGHTS ---
        if (this.state.emailTimer) clearTimeout(this.state.emailTimer);
        if (this.state.emailDelayTimer) clearTimeout(this.state.emailDelayTimer);
        if (this.state.emailChainTimer) clearTimeout(this.state.emailChainTimer);
        if (this.state.emailCooldownTimer) clearTimeout(this.state.emailCooldownTimer);
        
        this.state.emailTimer = null;
        this.state.emailDelayTimer = null;
        this.state.emailPending = false;
        
        // Force the modal shut if it was mid-open
        const emailModal = document.getElementById('email-modal');
        if (emailModal) {
            this.hideOverlay(emailModal);
            this.state.isEmailOpen = false;
        }
        // ------------------------------------------
		
        let pool = DB.bossfights.filter(ev => !this.state.usedIDs.has(ev.id));
        
        if(pool.length === 0) return; 
     
        let boss = pool[Math.floor(Math.random() * pool.length)]; 

        this.state.activeEvent = true;
        this.state.usedIDs.add(boss.id);
        this.disableButtons(true);
		
		// ---> Boss music <---
        this.playMusic('boss');
        this.updatePresence('boss');

        // Reset before rendering: the bar is shared state and would otherwise
        // start at whatever the previous fight left behind.
        this.state.bossBarPercent = 100;
        this.applyPassiveItems(boss.char);
        this.renderEventHTML(boss, 'boss');

        // Milliseconds, so the bar animates smoothly
        let totalTimeMs = boss.timer * 1000;
        let currentTimeMs = totalTimeMs;
        const updateInterval = 50; // 50ms steps keep the bar fluid

        this.state.bossTimer = setInterval(() => {
            currentTimeMs -= updateInterval;
            
            // The bar reads this from state; EventView.svelte also switches to
            // the pulsing red below 30% on its own.
            this.state.bossBarPercent = Math.max(0, currentTimeMs / totalTimeMs * 100);
            
            if(currentTimeMs <= 0) {
                clearInterval(this.state.bossTimer);
                this.resolveBossFail(boss.fail);
            }
        }, updateInterval);
    },

    resolveBossFail: function(failData) {
        this.resolveTerminal(failData, 'boss',
            this.state.currentEventId ? { ref: { i: this.state.currentEventId, path: ['fail', 'r'] } } : null);
    },
    
    handleSideQuest: function() {
        if(!DB.sidequests) return; 

        let pool = DB.sidequests.filter(ev => {
            if (this.state.usedIDs.has(ev.id)) return false;
            if (!this.storyGateOpen(ev)) return false;
            // webOnly events point at the store page - pointless once bought
            if (ev.webOnly && platform.isDesktop) return false;
            return true;
        });

        if (pool.length === 0) {
            // In a week even "nothing going on" costs time (design 6.3) -
            // a free click would turn the dry pool into a stalling exploit.
            if (this.state.week.active) {
                this.renderTerminal(this.weekIdleEvent('sidequest'), 'sidequest');
                return;
            }
            this.log({ k: 'log.nothingUp' });
            return;
        }

        const ev = this.pickFromPool(pool);
        this.spendContingent('sidequest');   // books today's week budget (no-op in day mode)

        if (ev.kind === 'phone') {
            this.state.activeEvent = true;
            this.state.currentPhoneEvent = ev;
            this.state.usedIDs.add(ev.id);
            this.disableButtons(true);
            this.recordSeen('event', ev.id);
            this.applyPassiveItems(ev.char);

            // Show the notification
            this.state.phone.notification = true;
            this.log({ k: 'log.phone', v: { text: { ref: { i: ev.id, path: ['title'] } } } });
            
            // --- show the phone and scroll to it ---
            this.updatePhoneVisibility();
            setTimeout(() => {
                const phone = document.getElementById('smartphone');
                // Only scroll on small screens
                if(phone && window.innerWidth < 1024) { 
                    phone.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            
        } else {
            this.renderTerminal(ev, 'sidequest');
        }
    },
    
    // --- TERMINAL & CALL SYSTEM ---

    renderTerminal: function(ev, type) {
		// --- Record the event for the mail system ---
        this.state.currentEventId = ev.id;     // "did we already mail for this event?"
        this.state.currentEventType = type;    // "is this a boss fight?"
        this.updatePresence(type);
        // -----------------------------------------------------
				
        this.state.activeEvent = true;
        if(ev.id) this.state.usedIDs.add(ev.id); 
        this.disableButtons(true);
        this.recordSeen('event', ev.id);
        this.applyPassiveItems(ev.char);



        // Chain event (nodes) or simple event (opts)?
        if (ev.nodes && ev.startNode) {
            this.state.currentChainEvent = ev;
            this.state.currentChainType = type;
            this.renderChainNode(ev.startNode);
        } else {
            this.renderEventHTML(ev, type);
        }
    },

    // 1. NEW SYSTEM (story chains)
    renderChainNode: function(nodeId) {
        const ev = this.state.currentChainEvent;
        const type = this.state.currentChainType;
        const node = ev.nodes[nodeId];
        if (!node) { console.error("Node not found:", nodeId); return; }

        // Which node is on screen. currentChainEvent alone does not say, and
        // relocaliseScene() has to repaint exactly this one after a language
        // switch. Runtime only: saveDay() bails while an event is open, so it
        // never reaches a save file and needs no migration.
        this.state.currentChainNode = nodeId;

        // Node char convention (EVENTS.md, 4): a node's own char beats the
        // event char, char: null forces none. This is what lets one meeting
        // chain switch speakers mid-dialogue - and in the stock the meetings
        // are the only pool that uses it.
        const charName = charDisplayName(('char' in node) ? node.char : ev.char);

        // Build the shared HTML
        this.setTerminalEvent(type, ev.title || t('event.title.call'), node.text, node.opts, true, charName, ev.nodes);
    },

    // 2. OLD SYSTEM (simple events)
    // Hands the event to the terminal component, which renders it.
    renderEventHTML: function(ev, type) {
        this.setTerminalEvent(type, ev.title, ev.text, ev.opts, false, charDisplayName(ev.char));
    },

    /**
     * Repaints the terminal out of the tree that is loaded now.
     *
     * Registered against onLanguageChange() in engine.js and called after the
     * new tree is in. Everything else on screen follows the language on its
     * own: the dictionary sits behind a rune, the shell in index.html is
     * refilled by applyStaticStrings(), and the idle screen already stores
     * keys rather than words. What cannot follow is the scene, because its
     * title, its text and its option captions were copied out of the old tree
     * into state.terminal at the moment it opened.
     *
     * Deliberately NOT renderTerminal(): that one starts an event - it books
     * the id as used, records it as seen and applies passive items. This is a
     * repaint, and the two must not be the same function. Both branches below
     * end in the same pure setTerminalEvent() the first render used.
     *
     * What it no longer has to touch, because those surfaces now follow on
     * their own: the result screen, the morning's status line, the log and the
     * bubbles of a phone chat. All four used to be frozen here on the argument
     * that a record should keep the language it was written in - and the
     * argument did not survive contact with the running game. The log is the
     * account of everything the player has done, half of it in the other
     * language reads as a fault, and the same goes for a chat you are still in.
     *
     * They record IDENTITIES now rather than sentences (engine/recipe.js), so
     * LogFeed, PhoneView, ResultView and MorningView resolve them on every
     * paint and this function has no work left there.
     *
     * What it still does is the SCENE, and only the scene: an event's title,
     * text and captions were copied out of the tree into state.terminal at the
     * moment it opened, and a view model is not something a recipe can stand
     * in for.
     */
    relocaliseScene: function() {
        this.relocalisePhone();

        const term = this.state.terminal;

        // The morning mood: title and text come straight from DB.moods and are
        // re-drawable from the id; the status line under them does not, so it
        // stays as it stands.
        if (term.mode === 'morning' && this.state.lastMoodId) {
            const mood = (DB.moods ?? []).find(m => m.id === this.state.lastMoodId);
            if (mood) this.setTerminalMorning(mood.title, mood.text, term.morning?.conditions ?? '');
            return;
        }

        if (term.mode !== 'event') return;

        const ev = findEventById(DB, this.state.currentEventId);
        if (!ev) return;

        if (term.event?.isChain && this.state.currentChainNode) {
            this.state.currentChainEvent = ev;
            this.renderChainNode(this.state.currentChainNode);
        } else {
            this.renderEventHTML(ev, this.state.currentEventType);
        }
    },

    /**
     * The open phone chat, as far as it can follow.
     *
     * The bubbles stay - they are what was said, in the language it was said
     * in. The REPLIES do not: they are the choice the player is about to make,
     * and German buttons under an English chat is the one place where leaving
     * things alone would actually get in the way.
     *
     * Nothing happens while a reply is in flight (options empty during the
     * typing delay), which is also the only window in which the next node is
     * not yet the one written down.
     */
    relocalisePhone: function() {
        const phone = this.state.phone;
        if (!phone?.open || !phone.node || !phone.options?.length) return;

        const ev = findEventById(DB, this.state.currentPhoneEvent?.id);
        const node = ev?.nodes?.[phone.node];
        if (!node) return;

        this.state.currentPhoneEvent = ev;
        phone.appName = ev.appName ?? phone.appName;
        phone.options = node.opts || [];
    },

    // 3. SHARED HTML TEMPLATE
    // Routes a chosen option to whatever handles it.
    chooseOption: function(opt, index = -1) {
        const ev = this.state.terminal.event ?? {};
        if (opt.action) return this.runAction(opt.action);
        if (ev.isChain) return this.handleChainChoice(opt.next);
        return this.resolveTerminal(opt, ev.type,
            index > -1 && this.state.currentEventId
                ? { ref: { i: this.state.currentEventId, path: ['opts', index, 'r'] } }
                : null);
    },

    // Calls an engine method named by the data.
    // Deliberately a lookup and not eval(): the data describes WHICH method to
    // call, it does not carry executable code.
    runAction: function(action) {
        if (typeof action !== 'object' || !action.fn) {
            console.error("Invalid action, expected { fn, args }:", action);
            return;
        }
        const fn = this[action.fn];
        if (typeof fn !== 'function') {
            console.error(`Unknown action: ${action.fn}`);
            return;
        }
        return fn.apply(this, action.args || []);
    },


    handleChainChoice: function(nextId) {
		this.playAudio('ui');
        const ev = this.state.currentChainEvent;

        // Case 1: another node
        if (ev.nodes && ev.nodes[nextId]) {
            this.renderChainNode(nextId);
            return;
        }

        // Case 2: a result, ending the chain
        if (ev.results && ev.results[nextId]) {
            const res = ev.results[nextId];
            // A result names its text `txt`; the effects carry the same letters
            // as an option. It used to accept min/fl/al/cr as second names as
            // well - an alias kept for events that have long since gone, and
            // used by not one place in the data. Dropped with the rename.
            this.resolveTerminal({
                r:    res.txt,
                m:    res.m || 0,
                l:    res.l || 0,
                a:    res.a || 0,
                b:    res.b || 0,
                loot: res.loot || null,
                rem:  res.rem  || null,
                next: res.next || null,
                rep:  res.rep  || null
            }, this.state.currentChainType,
               ev.id ? { ref: { i: ev.id, path: ['results', nextId, 'txt'] } } : null);
            this.state.currentChainEvent = null;
            return;
        }

        console.error("Chain error: target not found", nextId);
        this.resolveTerminal({ r: t('event.chainBroken') }, "calls", { k: 'event.chainBroken' });
    },

    /**
     * Applies a chosen option and advances the day.
     *
     * Used to take eleven positional parameters, hand-serialised into an inline
     * onclick. A missing comma shifted every value after it, and the reputation
     * object had to be JSON-parsed back out of an HTML attribute. It now takes
     * the option object as authored in the data files.
     *
     * @param {object} opt  { r, m, l, a, b, loot, rem, next, rep }
     * @param {string} type event pool the option came from
     */
    resolveTerminal: function(opt, type, resRecipe = null) {
        opt = opt || {};
        let res = opt.r;
        // How the result line finds its way back into the log in whatever
        // language is running. Each caller knows its own identity and hands it
        // over; see engine/recipe.js. Without one the line is a literal, which
        // is the honest answer for text that was composed here.
        let recipe = resRecipe;
        const loot = opt.loot || null;
        const rem  = opt.rem  || null;
        const next = opt.next || null;
        const repData = opt.rep || null;

        // Numeric fallbacks: data files omit values that are zero.
        const m = typeof opt.m === 'number' ? opt.m : 0;
        const l = typeof opt.l === 'number' ? opt.l : 0;
        const a = typeof opt.a === 'number' ? opt.a : 0;
        const b = typeof opt.b === 'number' ? opt.b : 0;

        this.playAudio('ui');
	
        // --- BUGFIX: STOP THE TIMER ---
        if (this.state.bossTimer) {
            clearInterval(this.state.bossTimer);
            this.state.bossTimer = null;
        }
        
	
        // --- INTRANET TRIGGER  ---
        if (res === "CMD:OPEN_INTRANET") {
            res = t('event.cmd.intranet');
            recipe = { k: 'event.cmd.intranet' };
            this.openIntranet();
        }

        // --- BOARD TRIGGER ---
        if (res === "CMD:OPEN_BOARD") {
            res = t('event.cmd.board');
            recipe = { k: 'event.cmd.board' };
            this.openBoard();
        }
        // --------------------------------

        if(type === 'coffee') this.state.coffeeConsumed++;
		
		// Drinking with Bernd, or the rum cake
        if (next === 'path_bernd_drunk' || next === 'path_cake_drunk') {
            this.state.drunkEndTime = this.state.time + m + 60; 
            this.log({ k: 'log.drunk' }, "text-purple-400 italic");
        }

        // Zeit & Tickets
        //
        // Tickets are counted by BOUNDARY, not by duration: every half hour the
        // clock steps over adds one. Which is why an option's cost decides how
        // many arrive - 15:10 to 16:10 crosses 15:30 and 16:00, so two.
        //
        // The weekly meeting is exempt, and that is the one exception in the
        // whole model. Its runtime simply does not count:
        //
        //   - it is COMPULSORY. Friday does not end until it is over, so this
        //     is the one stretch a player cannot decide against;
        //   - it is UNANSWERABLE. Calls are the only thing that removes a
        //     ticket, and the action bar is gone while the meeting runs;
        //   - it is UNSEEABLE. The twelve chains run 35 to 60 minutes and the
        //     start lands anywhere past 15:00, so the same meeting costs one
        //     ticket or two depending on two things nobody can read off the
        //     screen. Measured over 1,883 Fridays: one ticket in 63% of runs,
        //     two in 37%, and in up to 7% of them the second one was fatal -
        //     after the week had in effect been survived.
        //
        // The lunch break is deliberately NOT exempt although it can run
        // longer (up to 90 minutes): it is chosen, it sits mid-day, and the
        // afternoon that follows is long enough to work the ticket off again.
        //
        // Skipped rather than time-shifted. A paused ticket clock would mean a
        // second, invisible sense of time running beside the visible one, and
        // with at most 45 minutes left after a meeting the two would come to
        // the same thing anyway.
        if (type !== 'meeting') {
            const SHIFT_END_TIME = 16 * 60 + 30;   // tickets stop at closing time
            const oldTimeChunk = Math.floor(this.state.time / 30);
            const cappedTime = Math.min(this.state.time + m, SHIFT_END_TIME);
            const newTimeChunk = Math.floor(cappedTime / 30);
            this.state.tickets += Math.max(0, newTimeChunk - oldTimeChunk);
        }
        
        if (type === 'calls') { 
            this.state.tickets = Math.max(0, this.state.tickets - 1);
        }

        const timeBefore = this.state.time;
        this.state.time += m;
        this.checkLeetMoment(timeBefore);
        
        // Lunch check, with a window rather than an open-ended threshold.
        // A single option can cost up to four hours (the boss fights), so one
        // choice can carry the clock from 11:50 straight past the afternoon -
        // and the old condition would then have announced the lunch break at
        // half past three. Past the window the break is simply missed, which
        // is both more believable and the thing an office actually does.
        const LUNCH_FROM = 12 * 60;
        const LUNCH_UNTIL = 14 * 60;
        let triggerLunch = false;
        if (!this.state.isPartyMode && !this.state.lunchDone && this.state.time >= LUNCH_FROM) {
            this.state.lunchDone = true;              // either way it is over for today
            if (this.state.time < LUNCH_UNTIL) {
                triggerLunch = true;
            } else {
                this.log({ k: 'log.lunchMissed' }, "text-slate-500");
            }
        }

        // Meeting check (week Friday finale, design 8.1): the first
        // transition past 15:00 turns the next continue button into the walk
        // to the meeting room. Lunch keeps right of way; 16:30 stays the
        // hard end either way, the 90-minute buffer is deliberate.
        let triggerMeeting = false;
        if (!triggerLunch && !this.state.isPartyMode && this.state.week.active
            && this.state.week.dayIndex === 5 && !this.state.meetingDone
            && this.state.time >= 15 * 60) {
            triggerMeeting = true;
        }

        // --- DIFFICULTY AND LAZINESS LOGIC ---
        // statMult() carries the Wednesday hardening for the day mode: the
        // data values are calibrated a little too softly for normal (day
        // simulation: 87% win rate for an attentive casual player), so 1.0
        // becomes 1.1 in the formulas ONLY - state.difficultyMult stays 1.0,
        // because everywhere else that value is an identity check. In week
        // mode statMult() returns the honest ramped value instead
        // (engine_week.js has the whole story).
        let diffMult = this.statMult();
        let lazyMult = 1 + (this.state.fl / 200);

        this.addStat('fl', l);
        let finalA = a > 0 ? Math.ceil(a * diffMult) : a;
        this.addStat('al', finalA);

        let finalB = b;
        if (b > 0) {
            finalB = Math.ceil(b * diffMult * lazyMult);
        } else {
            finalB = b;
        }
        this.addStat('cr', finalB);

        // --- Floating Text ---
        if (l !== 0) this.showFloatingText('val-fl', l);
        if (finalA !== 0) this.showFloatingText('val-al', finalA);
        if (finalB !== 0) this.showFloatingText('val-cr', finalB);

        this.triggerShake(finalA, finalB);

        // Record a point for the day curve on the end screen.
        this.recordStatPoint();
        
        // --- REPUTATION LOGIC  ---
        // repData arrives as the object straight from the data file. It used to
        // travel through an HTML attribute and be JSON-parsed back out here.
        if (repData && typeof repData === 'object') this.applyReputation(repData);

        // Set the story flag (day-stamped in week mode, see setStoryFlag)
        if (next && next !== "") {
            this.setStoryFlag(next);
        }
        
        // --- COUNT PARTY PROGRESS ---
        if (this.state.isPartyMode && type === 'party' && next === 'party_hub') {
            this.state.partyProgress++;
        }
        
        // --- ITEMS REMOVED (rem) ---
        if (rem && rem !== "") {
            // Index of the first matching item
            let index = this.state.inventory.findIndex(i => i.id === rem);
            if (index > -1) {
                // Remove exactly one item at that index
                this.state.inventory.splice(index, 1);
                let removedName = DB.items[rem] ? DB.items[rem].name : rem;
                this.log({ k: 'log.itemLost', v: { item: itemNameValue(rem) } }, "text-orange-400");
            }
        }
        // --------------------------------

        // --- ITEM LOGIC: LOOT ---
        this.grantItem(loot);
        
        this.log(recipe ?? { msg: String(res ?? '') });
        this.updateUI();

        // UI Rendern
        // The key travels, not the word - see setTerminalResult. Which also
        // means lint-i18n can no longer see these five as used, so they are
        // declared here by hand.
        // i18n-uses: terminal.btn.lunch, terminal.btn.meeting, terminal.btn.continue
        // i18n-uses: terminal.btn.clockOff, terminal.btn.gameOver
        let btnAction = triggerLunch ? "triggerLunch" : triggerMeeting ? "triggerMeeting" : "reset";
        let btnKey = triggerLunch ? 'terminal.btn.lunch' : triggerMeeting ? 'terminal.btn.meeting' : 'terminal.btn.continue';
        let btnColor = "bg-blue-600 hover:bg-blue-500";

        if (this.state.pendingEnd) {
            // --- Monday to Thursday in a week: the day is over, the run is
            // not. Without this branch the button falls through to the fail
            // case below and shouts GAME OVER before the night screen. ---
            if (this.state.pendingEnd.isNight) {
                btnAction = "finishGame";
                btnKey = 'terminal.btn.clockOff';
                btnColor = "bg-green-600 hover:bg-green-500";
            }
            // --- The disguised party trap ---
            else if (this.state.pendingEnd.isParty) {
                btnAction = "startParty";
                btnKey = 'terminal.btn.clockOff';       // the same key as the normal win, so the
                                                        // disguise cannot come apart in translation
                btnColor = "bg-pink-600 hover:bg-pink-500"; // A nasty pink as a small hint
            } else {
                // --- normal ending ---
                btnAction = "finishGame";
                if (this.state.pendingEnd.isWin) {
                    btnKey = 'terminal.btn.clockOff';
                    btnColor = "bg-green-600 hover:bg-green-500";
                } else {
                    btnKey = 'terminal.btn.gameOver';
                    btnColor = "bg-red-600 hover:bg-red-500";
                }
            }
        }

        this.setTerminalResult(recipe ?? { msg: String(res ?? '') },
                               m, l, finalA, finalB, btnAction, btnKey, btnColor);
    },

    // async: lunch is its own pool and loads on demand like the others.
    // prefetchAll() fetches it in the background long before noon; the await
    // here covers the case of someone being faster than the connection.
    triggerLunch: async function() {
        await ensure('lunch');
        let pool = DB.lunch ?? [];

        // Story gate and follow-up priority, exactly as in the action pools
        // (see the intervention check above): a continuation must not turn up
        // without its prerequisite, and it jumps the queue with the same
        // FOLLOWUP_CHANCE. Lunch used to draw from the raw pool, which was
        // harmless only while no lunch event carried a reqStory.
        const fortsetzungen = pool.filter(ev => ev.reqStory && this.storyGateOpen(ev)
                                                && !this.state.usedIDs.has(ev.id));
        const grundpool = pool.filter(ev => !ev.reqStory);

        if (fortsetzungen.length > 0 && Math.random() < this.FOLLOWUP_CHANCE) {
            pool = fortsetzungen;
        } else if (grundpool.length > 0) {
            pool = grundpool;
        } else {
            // Fallback: nothing but continuations left and the roll failed
            pool = fortsetzungen;
        }
        // Week mode: no repeated lunch within one week (design 6.3). The day
        // mode keeps drawing from the full pool - within a single day a
        // repeat is impossible anyway, so behaviour stays identical.
        if (this.state.week.active) {
            const fresh = pool.filter(ev => !this.state.usedIDs.has(ev.id));
            if (fresh.length) pool = fresh;   // all used up: a repeat beats no break
        }
        if (!pool.length) {
            // Should never happen; better to skip the break than to hang.
            console.warn('Lunch pool unavailable, skipping the break.');
            this.reset();
            return;
        }
        const randomLunch = pool[Math.floor(Math.random() * pool.length)];
        if (this.state.week.active) this.state.usedIDs.add(randomLunch.id);
        this.renderTerminal(randomLunch, 'lunch');
    },

    /**
     * The morning screen.
     *
     * `forceEffect` is for testing only: it narrows the draw to one category
     * so an effect can be triggered on purpose instead of rolled for. From the
     * developer console:
     *     engine.triggerMorningMood('tickets')
     * The regular call stays parameterless and therefore random.
     */
    /**
     * Records the current standing for the day curve.
     *
     * Called after every effect so that jumps (meltdown, written warning) show
     * up in the curve as what they are. A day can hardly produce more than 200
     * points; the cap is pure caution.
     */
    /**
     * 13:37 Uhr.
     *
     * The clock moves in jumps and therefore almost never lands on the minute
     * exactly, so this checks whether it passed the mark in the last step.
     * Once a day, purely decorative: no values, no consequences, just a line
     * in the log for those who look.
     *
     * The lines themselves live in data_special.js, drawn like the valve texts.
     * They are scene prose, so they belong with the data in both languages -
     * the interface dictionary is for captions.
     */
    checkLeetMoment: function(timeBefore) {
        const LEET = 13 * 60 + 37;
        if (this.state.leetSeen) return;
        if (timeBefore >= LEET || this.state.time < LEET) return;

        // Core data missing (tools, tests): no line rather than a crash, and
        // the moment is not marked as seen, so a later crossing still counts.
        const lines = DB.special?.leet;
        if (!lines?.length) return;

        this.state.leetSeen = true;
        // The INDEX is written down, not the line it drew: both trees carry the
        // same list length (lint-parity enforces it), so the same index is the
        // same joke in the other language.
        const pick = Math.floor(Math.random() * lines.length);
        this.log({ ref: { p: 'special', path: ['leet', pick] } }, "text-cyan-400 italic");
    },

    recordStatPoint: function() {
        const h = this.state.statHistory;
        if (!h || h.length > 200) return;
        h.push({
            m: this.state.time,
            l: Math.round(this.state.fl),
            a: Math.round(this.state.al),
            b: Math.round(this.state.cr)
        });
    },

    triggerMorningMood: function(forceEffect = null) {
        // Fallback for a category missing from the data files
        if (!DB.moods || DB.moods.length === 0) {
            this.reset();
            return;
        }
        
        // --- Resume music after the boot sequence ---
        this.playMusic('office');
        
        // Release the buttons after the brief setup
        this.disableButtons(false);
        this.state.activeEvent = false;

        // 1. Draw a random morning mood, avoiding an immediate repeat
        let availableMoods = DB.moods.filter(m => m.id !== this.state.lastMoodId);
        
        // Fallback for the theoretical case of a single remaining entry
        if (availableMoods.length === 0) availableMoods = DB.moods; 

        // Test path: narrow to one category (see the comment above)
        if (forceEffect) {
            const forced = DB.moods.filter(m => m.effect === forceEffect);
            if (forced.length) {
                availableMoods = forced;
            } else {
                const known = [...new Set(DB.moods.map(m => m.effect))].join(', ');
                console.warn(`Unknown morning category "${forceEffect}". Available: ${known}`);
            }
        }
        
        let mood = availableMoods[Math.floor(Math.random() * availableMoods.length)];
        this.state.lastMoodId = mood.id; // remembered for next time
        
        // 2. Mechanik sicher anwenden
        let statHtml = null;
        
        // The morning scales with the weekday: Friday forgives, Monday does
        // not. 15 points become 12 / 15 / 19.
        const moodVal = Math.round(15 * this.effMult());

        if (mood.effect === "aggro") {
            this.addStat('al', moodVal);
            statHtml = moodLine('text-orange-400 font-bold', { k: 'morning.effect.aggro', v: { value: moodVal } });
        }
        else if (mood.effect === "radar") {
            this.addStat('cr', moodVal);
            statHtml = moodLine('text-red-500 font-bold', { k: 'morning.effect.radar', v: { value: moodVal } });
        }
        else if (mood.effect === "lazy") {
            this.addStat('fl', moodVal);
            this.state.time += 30; // Time lost to oversleeping
            this.state.tickets += 1; // penalty for the thirty minutes lost
            statHtml = moodLine('text-emerald-400 font-bold', { k: 'morning.effect.lazy', v: { value: moodVal } });
        }
        // --- A morning with history: tickets that piled up overnight ---
        else if (mood.effect === "tickets") {
            const extra = this.difficultyTier(); // 1/2/3 extra tickets by chosen level, week-aware
            this.state.tickets += extra;
            statHtml = moodLine('text-red-400 font-bold', { k: 'morning.effect.tickets', v: { count: extra } });
        }
        // --- Excuses: the stock of white lies is no longer a constant ---
        else if (mood.effect === "excuse_minus") {
            if (this.state.excusesLeft > 0) {
                this.state.excusesLeft--;
                statHtml = moodLine('text-red-400 font-bold', { k: 'morning.effect.excuseMinus' });
            } else {
                // Nothing left to cancel - the day starts badly all the same
                this.addStat('cr', moodVal);
                statHtml = moodLine('text-red-500 font-bold', { k: 'morning.effect.radar', v: { value: moodVal } });
            }
        }
        else if (mood.effect === "excuse_plus") {
            // The week mode caps the stock (design 4.4). Without this check
            // the morning mood would have walked straight past that cap and
            // the stock could grow without limit across the five days.
            const deckel = this.state.week.active
                ? this.WEEK_DIFFS[this.state.week.level].excuseCap
                : Infinity;
            if (this.state.excusesLeft < deckel) {
                this.state.excusesLeft++;
                statHtml = moodLine('text-cyan-400 font-bold', { k: 'morning.effect.excusePlus' });
            } else {
                statHtml = moodLine('text-slate-400 font-bold', { k: 'morning.effect.excuseFull' });
            }
        }

        else if (mood.effect === "normal") {
            statHtml = moodLine('text-slate-400 font-bold', { k: 'morning.effect.normal' });
        }
        else if (mood.effect === "snack") {
            // Snacks only
            const possibleItems = ["energy", "donut", "sandwich", "chocolate"];
            const rItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
            this.state.inventory.push({ id: rItem, used: false });
            this.addToArchive('items', rItem);
            statHtml = moodLine('text-yellow-400 font-bold', { k: 'morning.effect.snack', v: { item: itemNameValue(rItem) } });
            if (DB.items[rItem] && DB.items[rItem].img) { this.animateItemToBackpack(DB.items[rItem].img); }
        }

        // Refresh immediately so bars and clock are correct
        this.updateUI();

        // 3. Rendered by components/MorningView.svelte
        // The morning sets starting values (anger, radar, oversleeping);
        // without its own point the curve would wrongly begin at zero.
        this.recordStatPoint();

        // Week mode: carried baggage plus a bad morning can end the run
        // before the first click. Failing here, immediately and legibly,
        // beats dying confusingly after a harmless first action. The valves
        // may still open in checkEndConditions - then the day carries on.
        if (this.state.week.active) {
            this.checkEndConditions();
            if (this.state.pendingEnd) { this.finishGame(); return; }
        }

        this.setTerminalMorning(mood.title, mood.text, statHtml);
    },

    // --- PARTY SYSTEM ---
    goToPartyStation: async function(loc) {
        await ensure('party');
        this.playAudio('action');
        let pool = DB.party.filter(ev => ev.loc === loc && !this.state.usedIDs.has(ev.id));
        
        if (pool.length === 0) {
            this.log({ k: 'party.noStation' }, "text-slate-500");
            return;
        }
        
        let ev = pool[Math.floor(Math.random() * pool.length)];
        this.renderTerminal(ev, 'party');
    },

    finishParty: function(title, text) {
        // 1. Only mark it as played at the very last moment
        if (this.state.currentPartyKey) {
            localStorage.setItem(this.state.currentPartyKey, 'true'); 
        }
        this.state.isPartyMode = false;
        
        // --- UNLOCK THE GALA ACHIEVEMENT ---
        this.unlockAchievement('ach_party');

        // 2. Assemble the party report box
        // The same three captions the day report uses, from the same keys:
        // both name the day that has just ended, so they must not drift.
        let diffName = t('dayReport.diff.normal');
        if (this.state.difficultyMult < 1.0) diffName = t('dayReport.diff.easy');
        if (this.state.difficultyMult > 1.0) diffName = t('dayReport.diff.hard');
        if (this.state.week.active) diffName = tf('week.badge', { mode: t(`week.diff.${this.WEEK_DIFFS[this.state.week.level].key}`) });

        let statsHTML = `
            <div class="bg-slate-950 p-4 rounded-lg border border-pink-500/50 my-4 shadow-inner shadow-pink-900/10">
                <div class="text-[10px] text-pink-400 uppercase tracking-widest mb-2">${t('party.report.title')} <span class="text-white font-bold">${diffName}</span></div>
                <div class="grid grid-cols-2 gap-2 text-center font-mono">
                    <div class="flex flex-col">
                        <span class="text-emerald-400 font-bold text-xl">${Math.round(this.state.fl)}%</span>
                        <span class="text-[10px] text-slate-400">${t('party.report.chill')}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-orange-400 font-bold text-xl">${Math.round(this.state.al)}%</span>
                        <span class="text-[10px] text-slate-400">${t('party.report.cringe')}</span>
                    </div>
                </div>
            </div>
        `;

        // Collect the day's achievements
        let achHTML = this.state.achievedIds.length > 0 ? 
            `<div class="mt-2 border-t border-slate-700 pt-2"><div class="font-bold text-yellow-400 mb-2 text-xs uppercase">${t('achievement.today')}</div>${this.state.achievedIds.map(id => (DB.achievements ?? []).find(a => a.id === id)).filter(Boolean).map(a => `<div class="text-xs text-slate-300">🏆 ${a.icon ?? ''} ${a.title}</div>`).join('')}</div>` 
            : "";

        let fullReport = statsHTML + achHTML;

        // 3. Generate the diary (including the party ending)
        this.recordDayResult('survived');
        let diary = this.generateDiaryEntry("PARTY", text);

        // 4. Show the end modal - the hidden [PARTY] marker drives the colour
        let subtitleHTML = `<div class="text-3xl font-black text-white text-center mb-6 uppercase tracking-wider not-italic">${title}</div>`;
        // A gala on the Friday of a week closes the WEEK as well: counters,
        // balance sheet below the party report, save slot. The balance must
        // be built BEFORE endWeek() - it reads the still-active week.
        let weekHTML = '';
        let warWoche = false;
        let leadText = t('party.end.leadDay');
        let weekMode = null, weekDay = null;
        if (this.state.week.active) {
            warWoche = true;
            // Read BEFORE endWeek(), for the same reason the balance sheet is
            // built before it: afterwards the state no longer knows which week
            // this was. finishWeek() takes the same two along - the gala is the
            // second way a week can end, and it must not be the poorer one.
            weekMode = this.WEEK_DIFFS[this.state.week.level].key;
            weekDay = this.state.week.dayIndex;
            this.recordWeekResult('survived', 5);
            weekHTML = this.buildWeekBalanceHTML({ isWin: true });
            this.endWeek();
            leadText = t('party.end.leadWeek');
        }

        this.showEnd({
            title: t('party.end.title'),
            lead: leadText,
            text: subtitleHTML + fullReport + weekHTML,   // Party-eigene Zusammenfassung
            cause: "party",
            diary,
            isWin: true,
            // endWeek() ran above, so the state no longer knows which mode
            // this ending came from - the header would otherwise have read
            // "Arbeitstag Nr." above a week that was survived.
            isWeek: warWoche,
            weekMode,
            weekDay
        });
    },

    // --- PHONE SYSTEM ---
    openPhone: function() {
        this.playAudio('phone');

        const ev = this.state.currentPhoneEvent;
        this.state.phone = {
            open: true,
            notification: false,
            appName: ev.appName,
            messages: [],
            options: [],
            node: null          // set by renderPhoneNode, read by relocaliseScene
        };

        this.renderPhoneNode(ev.startNode);
    },

    // --- PHONE CONVERSATION ---
    //
    // Every bubble goes through here. `side` decides how PhoneView.svelte
    // renders it: in, out, typing, system or error.
    // The returned id is what removePhoneMessage() needs - the typing indicator
    // is the only bubble that gets taken away again.
    addPhoneMessage: function(msg) {
        const id = this._phoneMsgId = (this._phoneMsgId || 0) + 1;
        this.state.phone.messages.push({ id, ...msg });
        return id;
    },

    removePhoneMessage: function(id) {
        const i = this.state.phone.messages.findIndex(m => m.id === id);
        if (i > -1) this.state.phone.messages.splice(i, 1);
    },

    // Appends the incoming message and offers the node's replies.
    // components/PhoneView.svelte renders both.
    //
    // Takes the node's ID rather than the node, the same way renderChainNode
    // does, so that the id can be written down: relocaliseScene() needs it to
    // put the replies back in the new language after a language switch.
    renderPhoneNode: function(nodeId) {
        const ev = this.state.currentPhoneEvent;
        const node = ev.nodes[nodeId];
        if (!node) { console.error("Phone node not found:", nodeId); return; }
        this.state.phone.node = nodeId;

        // Portrait resolution, per node: a node's own char wins, otherwise
        // the node inherits the event's char. `char: null` on a node forces
        // the initial even inside a character chat (an anonymous voice in a
        // group); no char anywhere keeps the plain initial - like contacts
        // without a picture in a real messenger.
        const charName = charDisplayName(node.char !== undefined ? node.char : ev.char);
        const contact = charName ? DB.chars?.find(c => c.name === charName) ?? null : null;

        // The sender label follows the NODE char only: a 1:1 chat keeps the
        // saved contact name (ev.title) even when the event has a char, so
        // existing chats look exactly as before. Only a node marked with its
        // own char writes that character's name above the bubble - like a
        // named voice inside a group.
        // Both the bubble and the name above it are RECIPES - see
        // engine/recipe.js. A character's name is the same in both trees and
        // stays a literal; the chat's own title comes out of the tree and needs
        // a reference; an unknown sender is a dictionary entry. The initial is
        // derived from whatever the name renders to, so it follows as well.
        const senderRecipe = (node.char && contact?.name) ? { msg: contact.name }
                           : ev.title                     ? { ref: { i: ev.id, path: ['title'] } }
                           :                                { k: 'phone.unknownSender' };

        this.addPhoneMessage({
            side: 'in',
            text: { ref: { i: ev.id, path: ['nodes', nodeId, 'text'] } },
            sender: senderRecipe,
            img: contact?.img ?? null
        });

        this.state.phone.options = node.opts || [];
    },

    handlePhoneChoice: function(text, nextId, remId, index = -1) {
		this.playAudio('phone');
        // Re-entrance guard: no options on screen means a reply is already in
        // flight. Used to be a check on the buttons' innerHTML.
        if (this.state.phone.options.length === 0) return;
        const fromNode = this.state.phone.node;
        this.state.phone.options = [];

        // What Miller sent is the caption of the option he pressed, so the node
        // and its index are the identity. `text` stays as the fallback for the
        // keyboard path, which has no index to give.
        const evNow = this.state.currentPhoneEvent;
        this.addPhoneMessage({
            side: 'out',
            text: (evNow?.id && fromNode && index > -1)
                ? { ref: { i: evNow.id, path: ['nodes', fromNode, 'opts', index, 't'] } }
                : { msg: String(text ?? '') }
        });

        if (remId) {
            let itemIndex = this.state.inventory.findIndex(i => i.id === remId);
            if (itemIndex > -1) {
                this.state.inventory.splice(itemIndex, 1);
                this.log({ k: 'log.itemLost', v: { item: itemNameValue(remId) } }, "text-orange-400");
                this.updateUI(); // reflect the inventory change right away
            }
        }
        // -----------------------------------------------
        

        let ev = this.state.currentPhoneEvent;
        let validNext = (ev.results && ev.results[nextId]) || (ev.nodes && ev.nodes[nextId]);
        
        if (!validNext) {
            console.error("Missing Node:", nextId);
            this.addPhoneMessage({ side: 'error', text: { k: 'phone.disconnected' } });
            setTimeout(() => {
                this.closePhone();
                this.state.activeEvent = false;
                this.disableButtons(false);
            }, 2000);
            return;
        }

        // FALL A: STORY ENDE (Result)
        if (ev.results && ev.results[nextId]) {
            let res = ev.results[nextId];
            
            // Loot & Items Logic
            if(res.loot && !this.state.inventory.find(i => i.id === res.loot)) {
                let dbItem = DB.items[res.loot];
                let isPermanent = dbItem && (dbItem.keep || dbItem.quest);
                let normalCount = this.state.inventory.filter(i => {
                    let db = DB.items[i.id];
                    return db && !db.quest;
                }).length;

                if (!isPermanent && normalCount >= 10) {
                    this.log({ k: 'log.backpackFull', v: { item: itemNameValue(res.loot) } }, "text-slate-500 italic");
                } else {
                    this.state.inventory.push({ id: res.loot, used: false });
                    this.addToArchive('items', res.loot);
                    this.log({ k: 'log.item.received', v: { item: itemNameValue(res.loot) } }, "text-yellow-400");
                    if (DB.items[res.loot] && DB.items[res.loot].img) { this.animateItemToBackpack(DB.items[res.loot].img); }
                }
            }
            
        // Stats Update
        let finalL = res.l || 0;
        let finalA = res.a || 0;
        let finalB = res.b || 0;

        this.addStat('fl', finalL);
        this.addStat('al', finalA);
        this.addStat('cr', finalB);

        // --- Floating text for the phone ---
        if (finalL !== 0) this.showFloatingText('val-fl', finalL);
        if (finalA !== 0) this.showFloatingText('val-al', finalA);
        if (finalB !== 0) this.showFloatingText('val-cr', finalB);
        // ------------------------------------

        this.triggerShake(finalA, finalB);

        // Record a point for the day curve on the end screen.
        this.recordStatPoint();
        
        // --- REPUTATION HANDLING FOR THE PHONE ---
        this.applyReputation(res.rep);
        
        // --- SET THE STORY FLAG ---
        if (res.next && res.next !== "") {
            this.setStoryFlag(res.next);
        }
        // -----------------------------------
        
        // --- Fast chat handling, case A ---
            let typingTime = this.state.fastChat ? 0 : 1500;
            let readTime = this.state.fastChat ? 3000 : 4500;
            let loadingId = null;   // set when the typing bubble is shown

            // Only render when fast chat is off
            if (!this.state.fastChat) {
                loadingId = this.addPhoneMessage({ side: 'typing' });
            }

            // Timer (either 0 or 1.5s)
            if (this.state.phoneTypeTimer) clearTimeout(this.state.phoneTypeTimer);
            this.state.phoneTypeTimer = setTimeout(() => {
                if (loadingId) this.removePhoneMessage(loadingId);

                // System message, centred and grey
                this.addPhoneMessage({ side: 'system',
                                       text: { ref: { i: ev.id, path: ['results', nextId, 'txt'] } } });

                if (this.state.phoneReadTimer) clearTimeout(this.state.phoneReadTimer);
                this.state.phoneReadTimer = setTimeout(() => {
                    this.closePhone();
                    this.log({ k: 'log.phone',
                               v: { text: { ref: { i: ev.id, path: ['results', nextId, 'txt'] } } } });
                    const beforePhone = this.state.time;
                    this.state.time += 15;
                    this.checkLeetMoment(beforePhone);
                    this.updateUI();
                    
                    if (this.state.pendingEnd) {
                        this.finishGame();
                    } else {
                        this.state.activeEvent = false;
                        this.disableButtons(false);
                        this.checkRandomEmail(); 
                    }
                }, readTime); 
            }, typingTime);

        }
        // CASE B: the conversation continues
        else if (ev.nodes[nextId]) {
            
            let loadingId = null;   // set when the typing bubble is shown
            
            // --- Fast chat handling, case B ---
            if (!this.state.fastChat) {
                loadingId = this.addPhoneMessage({ side: 'typing' });
            }

            // Fast chat: no delay. Otherwise 1.5 to 2.5 seconds.
            let typingDuration = this.state.fastChat ? 0 : (1500 + Math.random() * 1000);

            if (this.state.phoneTypeTimer) clearTimeout(this.state.phoneTypeTimer);
            this.state.phoneTypeTimer = setTimeout(() => {
                if (loadingId) this.removePhoneMessage(loadingId);
                this.renderPhoneNode(nextId);
            }, typingDuration);
        }
    },

    closePhone: function() {
        this.state.phone.open = false;
        this.state.phone.notification = false;
        
        // --- Clear the event and re-check visibility ---
        this.state.currentPhoneEvent = null; 
        this.updatePhoneVisibility();
    },

};
