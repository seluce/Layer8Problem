import { DB, ensure } from '../data.js';
import { platform } from '../platform.js';

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
        let baseChance = 0.15 * this.state.difficultyMult; 
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
     */
    grantItem: function(itemId, logLabel = 'ITEM') {
        if (!itemId) return;
        const dbItem = DB.items[itemId];
        const isPermanent = dbItem && (dbItem.keep || dbItem.quest);
        const alreadyHas = this.state.inventory.some(i => i.id === itemId);
        const itemName = dbItem ? dbItem.name : itemId;

        // Trophies and permanent tools do not count towards capacity
        const normalCount = this.state.inventory.filter(i => {
            const db = DB.items[i.id];
            return db && !db.quest;
        }).length;

        if (isPermanent && alreadyHas) return;   // still verworfen

        if (!isPermanent && normalCount >= 10) {
            this.log(`Rucksack voll (10/10)! ${itemName} liegengelassen.`, "text-slate-500 italic");
            return;
        }

        this.state.inventory.push({ id: itemId, used: false });
        this.addToArchive('items', itemId);
        this.log(`${logLabel}: ${itemName}`, "text-yellow-400");
        if (dbItem?.img && typeof this.animateItemToBackpack === 'function') {
            this.animateItemToBackpack(dbItem.img);
        }
    },

    /**
     * Applies reputation changes and keeps them within -100 to 100. Used to
     * exist in three places; one of them had forgotten the save call.
     */
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

        // Game logic
        let message = "";
        let color = "";

        if(timeout) {
            let penalty = Math.ceil(10 * this.state.difficultyMult);
            this.state.cr += penalty;
            this.state.emailsIgnored++;
            message = `E-MAIL IGNORIERT! Radar +${penalty}%`;
            color = "text-red-500 font-bold";
        } else if(opt) {
            if (opt.ignoreEmail) {
                // Work out whether a penalty applied, so the log can mention it
                let penaltyText = opt.c > 0 ? ` Radar +${Math.ceil(opt.c * this.state.difficultyMult)}%` : "";
                message = `E-MAIL IGNORIERT!${penaltyText}`;
                color = "text-red-500 font-bold";
            } else {
                message = `Gesendet: "${opt.t}"`;
                color = "text-blue-400";
            }

            let mult = this.state.difficultyMult;
            
            // Cache the final values for the animation
            let addedF = opt.f || 0;
            let addedA = opt.a ? Math.ceil(opt.a * mult) : 0;
            let addedC = opt.c ? Math.ceil(opt.c * mult) : 0;

            if(addedF) this.state.fl += addedF;
            if(addedA) this.state.al += addedA;
            if(addedC) this.state.cr += addedC;

            // --- Floating text for mails ---
            if (addedF !== 0) this.showFloatingText('val-fl', addedF);
            if (addedA !== 0) this.showFloatingText('val-al', addedA);
            if (addedC !== 0) this.showFloatingText('val-cr', addedC);
            // --------------------------------------
            
            // The ignore flag in the data files feeds the ghosting stat
            if(opt.ignoreEmail) this.state.emailsIgnored++;
            
            this.triggerShake(addedA, addedC);

            this.grantItem(opt.loot, 'ERHALTEN');

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
                if (opt.ignoreEmail) {
                    setTimeout(() => this.log(`${opt.r}`, "text-slate-500 italic"), 500);
                } else {
                    setTimeout(() => this.log(`Re: ${opt.r}`, "text-slate-400 italic"), 500);
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
        
        this.log(message, color);
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
                this.log("H.A.L.G.E.R.D.: Diese Aktion ist in der aktuellen Simulationsphase nicht vorgesehen.", "text-red-500");
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
                this.log("H.A.L.G.E.R.D.: Daten konnten nicht geladen werden. Bitte erneut versuchen.", "text-red-500");
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

                // Story continuation: is the flag set?
                if (ev.reqStory) {
                    return !!this.state.storyFlags[ev.reqStory]; 
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
                    this.log(`Begegnung: ${intervention.title}`, "text-yellow-400");
                    
                    // Rendered as type 'rep' for the golden styling
                    this.renderTerminal(intervention, 'rep'); 
                    return; // pre-empts the intended action
                }
            }
        }

        // ---------------------------------------------------------
        // 3. THE ACTUAL ACTION (nothing intercepted it)
        // ---------------------------------------------------------
        
        // Special case: phone and sidequest logic
        if (type === 'sidequest') { 
            this.handleSideQuest(); 
            return; 
        }

        // Default: a random event from the chosen pool (coffee, server, calls)
        let pool = DB[type].filter(ev => {
            if (this.state.usedIDs.has(ev.id)) return false;
            if (ev.reqStory && !this.state.storyFlags[ev.reqStory]) return false;
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
        this.resolveTerminal(failData, 'boss');
    },
    
    handleSideQuest: function() {
        if(!DB.sidequests) return; 

        let pool = DB.sidequests.filter(ev => {
            if (this.state.usedIDs.has(ev.id)) return false;
            if (ev.reqStory && !this.state.storyFlags[ev.reqStory]) return false;
            // webOnly events point at the store page - pointless once bought
            if (ev.webOnly && platform.isDesktop) return false;
            return true;
        });

        if (pool.length === 0) { this.log("Gerade nichts los."); return; }

        const ev = this.pickFromPool(pool);

        if (ev.kind === 'phone') {
            this.state.activeEvent = true;
            this.state.currentPhoneEvent = ev;
            this.state.usedIDs.add(ev.id);
            this.disableButtons(true);
            
            // Show the notification
            this.state.phone.notification = true;
            this.log("Handy: " + ev.title);
            
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

        // Build the shared HTML
        this.setTerminalEvent(type, ev.title || "Anruf", node.text, node.opts, true, ev.char);
    },

    // 2. OLD SYSTEM (simple events)
    // Hands the event to the terminal component, which renders it.
    renderEventHTML: function(ev, type) {
        this.setTerminalEvent(type, ev.title, ev.text, ev.opts, false, ev.char);
    },

    // 3. SHARED HTML TEMPLATE
    // Routes a chosen option to whatever handles it.
    chooseOption: function(opt) {
        const ev = this.state.terminal.event ?? {};
        if (opt.action) return this.runAction(opt.action);
        if (ev.isChain) return this.handleChainChoice(opt.next);
        return this.resolveTerminal(opt, ev.type);
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
            // Chain results use their own field names (txt/min/fl/al/cr);
            // map them onto the option shape resolveTerminal expects.
            this.resolveTerminal({
                r:    res.txt,
                m:    res.min || res.m || 0,
                f:    res.fl  || res.f || 0,
                a:    res.al  || res.a || 0,
                c:    res.cr  || res.c || 0,
                loot: res.loot || null,
                rem:  res.rem  || null,
                next: res.next || null,
                rep:  res.rep  || null
            }, this.state.currentChainType);
            this.state.currentChainEvent = null;
            return;
        }

        console.error("Chain Error: Ziel nicht gefunden", nextId);
        this.resolveTerminal({ r: "Verbindung unterbrochen." }, "calls");
    },

    /**
     * Applies a chosen option and advances the day.
     *
     * Used to take eleven positional parameters, hand-serialised into an inline
     * onclick. A missing comma shifted every value after it, and the reputation
     * object had to be JSON-parsed back out of an HTML attribute. It now takes
     * the option object as authored in the data files.
     *
     * @param {object} opt  { r, m, f, a, c, loot, rem, next, rep }
     * @param {string} type event pool the option came from
     */
    resolveTerminal: function(opt, type) {
        opt = opt || {};
        let res = opt.r;
        const loot = opt.loot || null;
        const rem  = opt.rem  || null;
        const next = opt.next || null;
        const repData = opt.rep || null;

        // Numeric fallbacks: data files omit values that are zero.
        const m = typeof opt.m === 'number' ? opt.m : 0;
        const f = typeof opt.f === 'number' ? opt.f : 0;
        const a = typeof opt.a === 'number' ? opt.a : 0;
        const c = typeof opt.c === 'number' ? opt.c : 0;

        this.playAudio('ui');
	
        // --- BUGFIX: STOP THE TIMER ---
        if (this.state.bossTimer) {
            clearInterval(this.state.bossTimer);
            this.state.bossTimer = null;
        }
        
	
        // --- INTRANET TRIGGER  ---
        if (res === "CMD:OPEN_INTRANET") {
            res = "Du klickst hektisch auf das Lesezeichen. Das alte Intranet lädt ächzend...";
            this.openIntranet();
        }

        // --- BOARD TRIGGER ---
        if (res === "CMD:OPEN_BOARD") {
            res = "Du vertiefst dich in die faszinierende Welt der Firmen-Aushänge...";
            this.openBoard();
        }
        // --------------------------------

        if(type === 'coffee') this.state.coffeeConsumed++;
		
		// Drinking with Bernd, or the rum cake
        if (next === 'path_bernd_drunk' || next === 'path_cake_drunk') {
            this.state.drunkEndTime = this.state.time + m + 60; 
            this.log("Alles dreht sich ein bisschen...", "text-purple-400 italic");
        }

        // Zeit & Tickets
        let oldTimeChunk = Math.floor(this.state.time / 30);

        // Tickets only accrue up to closing time at 16:30
        const SHIFT_END_TIME = 16 * 60 + 30; 
        let cappedTime = Math.min(this.state.time + m, SHIFT_END_TIME);

        let newTimeChunk = Math.floor(cappedTime / 30);
        let newTickets = Math.max(0, newTimeChunk - oldTimeChunk); 

        this.state.tickets += newTickets;
        
        if (type === 'calls') { 
            this.state.tickets = Math.max(0, this.state.tickets - 1);
        }

        const timeBefore = this.state.time;
        this.state.time += m;
        this.checkLeetMoment(timeBefore);
        
        // Lunch Check
        let triggerLunch = false;
        if (!this.state.isPartyMode && !this.state.lunchDone && this.state.time >= 12 * 60) {
            triggerLunch = true;
            this.state.lunchDone = true;
        }

        // --- DIFFICULTY AND LAZINESS LOGIC ---
        // Wednesday hardening: the data values are calibrated a little too
        // softly for normal (day simulation: 87% win rate for an attentive
        // casual player). A 10% surcharge on the formulas alone brings that to
        // roughly 75% without touching the optimal player (94%).
        // IMPORTANT: state.difficultyMult stays 1.0 - everywhere else that
        // value is an identity check (> 1.0 = Monday: starting tickets,
        // excuses, achievements). The stat multiplier is derived only here.
        let diffMult = this.state.difficultyMult === 1.0 ? 1.1 : this.state.difficultyMult;
        let lazyMult = 1 + (this.state.fl / 200);

        this.state.fl += f;
        let finalA = a > 0 ? Math.ceil(a * diffMult) : a;
        this.state.al += finalA;

        let finalC = c;
        if (c > 0) {
            finalC = Math.ceil(c * diffMult * lazyMult);
        } else {
            finalC = c; 
        }
        this.state.cr += finalC;

        // --- Floating Text ---
        if (f !== 0) this.showFloatingText('val-fl', f);
        if (finalA !== 0) this.showFloatingText('val-al', finalA);
        if (finalC !== 0) this.showFloatingText('val-cr', finalC);
        
        this.triggerShake(finalA, finalC);

        // Record a point for the day curve on the end screen.
        this.recordStatPoint();
        
        // --- REPUTATION LOGIC  ---
        // repData arrives as the object straight from the data file. It used to
        // travel through an HTML attribute and be JSON-parsed back out here.
        if (repData && typeof repData === 'object') this.applyReputation(repData);

        // Set the story flag
        if (next && next !== "") {
            this.state.storyFlags[next] = true;
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
                this.log(`Verloren: ${removedName}`, "text-orange-400");
            }
        }
        // --------------------------------

        // --- ITEM LOGIC: LOOT ---
        this.grantItem(loot, 'ITEM');
        
        this.log(res);
        this.updateUI();

        // UI Rendern
        let btnAction = triggerLunch ? "triggerLunch" : "reset";
        let btnText = triggerLunch ? "ZUR MITTAGSPAUSE" : "WEITER";
        let btnColor = "bg-blue-600 hover:bg-blue-500";

        if (this.state.pendingEnd) {
            // --- The disguised party trap ---
            if (this.state.pendingEnd.isParty) {
                btnAction = "startParty";
                btnText = "FEIERABEND MACHEN 🎉"; // deliberately identical to the normal win
                btnColor = "bg-pink-600 hover:bg-pink-500"; // A nasty pink as a small hint
            } else {
                // --- normal ending ---
                btnAction = "finishGame";
                if (this.state.pendingEnd.isWin) {
                    btnText = "FEIERABEND MACHEN 🎉";
                    btnColor = "bg-green-600 hover:bg-green-500";
                } else {
                    btnText = "DAS WAR'S... (GAME OVER)";
                    btnColor = "bg-red-600 hover:bg-red-500";
                }
            }
        }

        this.setTerminalResult(res, m, f, finalA, finalC, btnAction, btnText, btnColor);
    },

    // async: lunch is its own pool and loads on demand like the others.
    // prefetchAll() fetches it in the background long before noon; the await
    // here covers the case of someone being faster than the connection.
    triggerLunch: async function() {
        await ensure('lunch');
        const pool = DB.lunch ?? [];
        if (!pool.length) {
            // Should never happen; better to skip the break than to hang.
            console.warn('Mittagspausen-Pool nicht verfügbar, überspringe die Pause.');
            this.reset();
            return;
        }
        const randomLunch = pool[Math.floor(Math.random() * pool.length)];
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
     */
    checkLeetMoment: function(timeBefore) {
        const LEET = 13 * 60 + 37;
        if (this.state.leetSeen) return;
        if (timeBefore >= LEET || this.state.time < LEET) return;

        this.state.leetSeen = true;
        const lines = [
            "13:37 Uhr. Für den Bruchteil einer Sekunde läuft alles rund. Kein Ticket, kein Anruf, kein Chef. Dann ist es 13:38.",
            "13:37 Uhr. Sämtliche LEDs im Serverraum blinken für einen Moment im selben Takt. Du bist der einzige Mensch im Gebäude, dem das etwas bedeutet.",
            "13:37 Uhr. Die Uhr steht kurz still, das Gebäude atmet aus, und irgendwo öffnet sich eine Datei ohne Zutun. Vermutlich Einbildung.",
            "13:37 Uhr. Du blickst auf die Uhr und nickst anerkennend. Niemand nickt zurück. Niemand hat es gesehen.",
            "13:37 Uhr. Der Drucker im dritten Stock gibt ein einzelnes, wohlklingendes Piepen von sich und schweigt für den Rest des Tages."
        ];
        this.log(lines[Math.floor(Math.random() * lines.length)], "text-cyan-400 italic");
    },

    recordStatPoint: function() {
        const h = this.state.statHistory;
        if (!h || h.length > 200) return;
        h.push({
            t: this.state.time,
            f: Math.round(this.state.fl),
            a: Math.round(this.state.al),
            c: Math.round(this.state.cr)
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
                console.warn(`Unbekannte Morgen-Kategorie "${forceEffect}". Vorhanden: ${known}`);
            }
        }
        
        let mood = availableMoods[Math.floor(Math.random() * availableMoods.length)];
        this.state.lastMoodId = mood.id; // remembered for next time
        
        // 2. Mechanik sicher anwenden
        let statHtml = "";
        
        // The morning scales with the weekday: Friday forgives, Monday does
        // not. 15 points become 12 / 15 / 19.
        const moodVal = Math.round(15 * this.state.difficultyMult);

        if (mood.effect === "aggro") {
            this.state.al += moodVal;
            statHtml = `<span class='text-orange-400 font-bold'>+${moodVal}% Aggro</span>`;
        } 
        else if (mood.effect === "radar") {
            this.state.cr += moodVal;
            statHtml = `<span class='text-red-500 font-bold'>+${moodVal}% Chef-Radar</span>`;
        } 
        else if (mood.effect === "lazy") {
            this.state.fl += moodVal;
            this.state.time += 30; // Time lost to oversleeping
            this.state.tickets += 1; // penalty for the thirty minutes lost
            statHtml = `<span class='text-emerald-400 font-bold'>Start 08:30 Uhr & +${moodVal}% Faulheit</span>`;
        } 
        // --- A morning with history: tickets that piled up overnight ---
        else if (mood.effect === "tickets") {
            const extra = this.state.difficultyMult > 1.0 ? 3 : (this.state.difficultyMult < 1.0 ? 1 : 2);
            this.state.tickets += extra;
            statHtml = `<span class='text-red-400 font-bold'>${extra} Tickets warten bereits auf dich</span>`;
        }
        // --- Excuses: the stock of white lies is no longer a constant ---
        else if (mood.effect === "excuse_minus") {
            if (this.state.excusesLeft > 0) {
                this.state.excusesLeft--;
                statHtml = "<span class='text-red-400 font-bold'>Eine Ausrede weniger als sonst</span>";
            } else {
                // Nothing left to cancel - the day starts badly all the same
                this.state.cr += moodVal;
                statHtml = `<span class='text-red-500 font-bold'>+${moodVal}% Chef-Radar</span>`;
            }
        }
        else if (mood.effect === "excuse_plus") {
            this.state.excusesLeft++;
            statHtml = "<span class='text-cyan-400 font-bold'>Eine Ausrede extra in der Hinterhand</span>";
        }

        else if (mood.effect === "normal") {
            statHtml = "<span class='text-slate-400 font-bold'>Neutral. Der ganz normale Wahnsinn beginnt.</span>";
        } 
        else if (mood.effect === "snack") {
            // Snacks only
            const possibleItems = ["energy", "donut", "sandwich", "chocolate"];
            const rItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
            this.state.inventory.push({ id: rItem, used: false });
            this.addToArchive('items', rItem);
            let itemName = DB.items[rItem] ? DB.items[rItem].name : rItem;
            statHtml = `<span class='text-yellow-400 font-bold'>Inventar: ${itemName} erhalten!</span>`;
            if (DB.items[rItem] && DB.items[rItem].img) { this.animateItemToBackpack(DB.items[rItem].img); }
        }

        // Refresh immediately so bars and clock are correct
        this.updateUI();

        // 3. Rendered by components/MorningView.svelte
        // The morning sets starting values (anger, radar, oversleeping);
        // without its own point the curve would wrongly begin at zero.
        this.recordStatPoint();

        this.setTerminalMorning(mood.title, mood.text, statHtml);
    },

    // --- PARTY SYSTEM ---
    goToPartyStation: async function(loc) {
        await ensure('party');
        this.playAudio('action');
        let pool = DB.party.filter(ev => ev.loc === loc && !this.state.usedIDs.has(ev.id));
        
        if (pool.length === 0) {
            this.log("Hier ist gerade nichts mehr los. Versuch einen anderen Ort.", "text-slate-500");
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
        this.unlockAchievement('ach_party', '🎉 Synergy-Veteran', 'Du hast die legendäre Firmenfeier überlebt.');

        // 2. Assemble the party report box
        let diffName = "MITTWOCH (Normal)";
        if (this.state.difficultyMult < 1.0) diffName = "FREITAG (Leicht)";
        if (this.state.difficultyMult > 1.0) diffName = "MONTAG (Schwer)";

        let statsHTML = `
            <div class="bg-slate-950 p-4 rounded-lg border border-pink-500/50 my-4 shadow-inner shadow-pink-900/10">
                <div class="text-[10px] text-pink-400 uppercase tracking-widest mb-2">Party-Bilanz: <span class="text-white font-bold">${diffName}</span></div>
                <div class="grid grid-cols-2 gap-2 text-center font-mono">
                    <div class="flex flex-col">
                        <span class="text-emerald-400 font-bold text-xl">${Math.round(this.state.fl)}%</span>
                        <span class="text-[10px] text-slate-400">CHILL-FAKTOR</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-orange-400 font-bold text-xl">${Math.round(this.state.al)}%</span>
                        <span class="text-[10px] text-slate-400">FREMDSCHAM</span>
                    </div>
                </div>
            </div>
        `;

        // Collect the day's achievements
        let achHTML = this.state.achievedTitles.length > 0 ? 
            `<div class="mt-2 border-t border-slate-700 pt-2"><div class="font-bold text-yellow-400 mb-2 text-xs uppercase">Heutige Errungenschaften:</div>${this.state.achievedTitles.map(t => `<div class="text-xs text-slate-300">🏆 ${t}</div>`).join('')}</div>` 
            : "";

        let fullReport = statsHTML + achHTML;

        // 3. Generate the diary (including the party ending)
        this.recordDayResult('survived');
        let diary = this.generateDiaryEntry("PARTY", text);

        // 4. Show the end modal - the hidden [PARTY] marker drives the colour
        let subtitleHTML = `<div class="text-3xl font-black text-white text-center mb-6 uppercase tracking-wider not-italic">${title}</div>`;
        this.showEnd({
            title: "GALA VORBEI",
            lead: "Der Abend ist vorbei. Ein Arbeitstag für die Geschichtsbücher.",
            text: subtitleHTML + fullReport,   // Party-eigene Zusammenfassung
            cause: "party",
            diary,
            isWin: true
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
            options: []
        };

        this.renderPhoneNode(ev.nodes[ev.startNode]);
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
    renderPhoneNode: function(node) {
        const ev = this.state.currentPhoneEvent;

        // Portrait resolution, per node: a node's own char wins, otherwise
        // the node inherits the event's char. `char: null` on a node forces
        // the initial even inside a character chat (an anonymous voice in a
        // group); no char anywhere keeps the plain initial - like contacts
        // without a picture in a real messenger.
        const charName = node.char !== undefined ? node.char : ev.char;
        const contact = charName ? DB.chars?.find(c => c.name === charName) ?? null : null;

        // The sender label follows the NODE char only: a 1:1 chat keeps the
        // saved contact name (ev.title) even when the event has a char, so
        // existing chats look exactly as before. Only a node marked with its
        // own char writes that character's name above the bubble - like a
        // named voice inside a group.
        const sender = (node.char ? contact?.name : null) ?? ev.title ?? "Unbekannt";

        this.addPhoneMessage({
            side: 'in',
            text: node.text,
            sender,
            avatar: sender.charAt(0).toUpperCase(),
            img: contact?.img ?? null
        });

        this.state.phone.options = node.opts || [];
    },

    handlePhoneChoice: function(text, nextId, remId) {
		this.playAudio('phone');
        // Re-entrance guard: no options on screen means a reply is already in
        // flight. Used to be a check on the buttons' innerHTML.
        if (this.state.phone.options.length === 0) return;
        this.state.phone.options = [];

        this.addPhoneMessage({ side: 'out', text });

        if (remId) {
            let itemIndex = this.state.inventory.findIndex(i => i.id === remId);
            if (itemIndex > -1) {
                let itemName = DB.items[remId] ? DB.items[remId].name : remId;
                this.state.inventory.splice(itemIndex, 1);
                this.log(`Verloren: ${itemName}`, "text-orange-400");
                this.updateUI(); // reflect the inventory change right away
            }
        }
        // -----------------------------------------------
        

        let ev = this.state.currentPhoneEvent;
        let validNext = (ev.results && ev.results[nextId]) || (ev.nodes && ev.nodes[nextId]);
        
        if (!validNext) {
            console.error("Missing Node:", nextId);
            this.addPhoneMessage({ side: 'error', text: '- Verbindung abgebrochen -' });
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
                    let itemName = dbItem ? dbItem.name : res.loot;
                    this.log(`Rucksack voll (10/10)! ${itemName} liegengelassen.`, "text-slate-500 italic");
                } else {
                    this.state.inventory.push({ id: res.loot, used: false });
                    this.addToArchive('items', res.loot);
                    let itemName = DB.items[res.loot] ? DB.items[res.loot].name : res.loot;
                    this.log("ERHALTEN: " + itemName, "text-yellow-400");
                    if (DB.items[res.loot] && DB.items[res.loot].img) { this.animateItemToBackpack(DB.items[res.loot].img); }
                }
            }
            
        // Stats Update
        let finalF = res.f || 0;
        let finalA = res.a || 0;
        let finalC = res.c || 0;

        this.state.fl += finalF;
        this.state.al += finalA;
        this.state.cr += finalC;

        // --- Floating text for the phone ---
        if (finalF !== 0) this.showFloatingText('val-fl', finalF);
        if (finalA !== 0) this.showFloatingText('val-al', finalA);
        if (finalC !== 0) this.showFloatingText('val-cr', finalC);
        // ------------------------------------
        
        this.triggerShake(finalA, finalC);

        // Record a point for the day curve on the end screen.
        this.recordStatPoint();
        
        // --- REPUTATION HANDLING FOR THE PHONE ---
        this.applyReputation(res.rep);
        
        // --- SET THE STORY FLAG ---
        if (res.next && res.next !== "") {
            this.state.storyFlags[res.next] = true;
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
                this.addPhoneMessage({ side: 'system', text: res.txt });

                if (this.state.phoneReadTimer) clearTimeout(this.state.phoneReadTimer);
                this.state.phoneReadTimer = setTimeout(() => {
                    this.closePhone();
                    this.log("Handy: " + res.txt);
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
                this.renderPhoneNode(ev.nodes[nextId]);
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
