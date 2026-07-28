import { DB } from '../../data.js';
import { platform } from '../../platform.js';

export const events = {

    // --- E-MAIL SYSTEM (Clean Light / Logik Fixes) ---
    checkRandomEmail: function() {
        // 1. Grund-Checks (Offen? Unterwegs? Tutorial?)
        if(this.state.isEmailOpen || this.state.emailPending) return; 
        if(typeof tutorial !== 'undefined' && tutorial.isActive) return;
        if (this.state.isPartyMode) return;

        // --- INGAME-ZEIT COOLDOWN ---
        // Wenn in den letzten 25 Ingame-Minuten schon eine Mail kam -> blockieren
        if (this.state.lastEmailTime && (this.state.time - this.state.lastEmailTime < 25)) return;
        // ---------------------------------

        // --- ID-BASIERTE PRÜFUNG (WHITELIST & BLACKLIST) ---
        const id = this.state.currentEventId || "";
        const isAllowed = id.includes('srv_') || 
                          id.includes('cof_') || 
                          id.includes('sq_')  || 
                          id.includes('call_');

        if (!isAllowed) return; 
        if (id.includes('boss')) return;
        if (id.includes('lunch')) return;

        // 3. SPAM-SCHUTZ (Letztes Event)
        if (this.state.lastEmailEventId === this.state.currentEventId) return;

        // 4. Wahrscheinlichkeit (vorher 20%, jetzt 15% Basis)
        let baseChance = 0.15 * this.state.difficultyMult; 
        // Vorher +5% pro Ticket, jetzt +4% pro Ticket.
        let chance = baseChance + (this.state.tickets * 0.04); 
        
        // Deckelung: Egal wie viele Tickets, die Chance pro Klick wird nie höher als 35%
        chance = Math.min(0.35, chance);
        
        if(Math.random() < chance) {
            this.state.lastEmailEventId = this.state.currentEventId;
            
            // --- Aktuelle Uhrzeit für den Cooldown merken ---
            this.state.lastEmailTime = this.state.time;
            
            this.state.emailPending = true; 
            
            // Alten Delay-Timer killen, falls noch einer läuft
            if (this.state.emailDelayTimer) clearTimeout(this.state.emailDelayTimer);
            
            // Timer in Variable speichern, damit wir ihn abbrechen können!
            this.state.emailDelayTimer = setTimeout(() => { 
                this.triggerEmail(); 
            }, 2000);
        }
    },

    // Öffnet das E-Mail Overlay
    triggerEmail: function(forcedId = null) {
		
        // Wenn ein Bossfight läuft, darf diese Funktion gar nicht erst auslösen!
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
                !this.state.usedEmails.has(e.subj) && !e.linked
            );
            if(availableEmails.length === 0) {
                this.state.usedEmails.clear(); 
                availableEmails = DB.emails.filter(e => !e.linked);
            }
            email = availableEmails[Math.floor(Math.random() * availableEmails.length)];
        }

        if (!email) return;

        // 1. FREEZE & STATUS
        this.state.usedEmails.add(email.subj);
        this.state.isEmailOpen = true; 

        // 2. UI REFERENZEN
        const modal = document.getElementById('email-modal');
        if (!modal) return;

        // Animation Reset
        const container = modal.firstElementChild; 
        if(container) {
            container.classList.remove('animate-pop-in');
            void container.offsetWidth; 
            container.classList.add('animate-pop-in');
        }

        // 3. DATEN SETZEN
        document.getElementById('email-sender').innerText = email.sender;
        document.getElementById('email-subject').innerText = email.subj;
        
        // Uhrzeit
        let h = Math.floor(this.state.time / 60);
        let m = this.state.time % 60;
        let timeStr = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
        document.getElementById('email-timestamp').innerText = timeStr;

        // Avatar
        let initial = email.sender.charAt(0).toUpperCase();
        document.getElementById('email-avatar').innerText = initial;

        // --- Dynamisches CC (Humor) ---
        let ccText = "IT-Verteiler"; // Standard
        const s = email.sender.toLowerCase();
        
        if(s.includes('chef') || s.includes('management')) ccText = "Rechtsabteilung; HR";
        else if(s.includes('kevin')) ccText = "Mama; World_of_Warcraft_Gilde";
        else if(s.includes('marketing') || s.includes('chantal')) ccText = "Alle Mitarbeiter (ALL); Presse";
        else if(s.includes('buchhaltung') || s.includes('elster')) ccText = "Finanzamt; Controlling";
        else if(s.includes('hr') || s.includes('personal')) ccText = "Betriebsrat";
        else if(s.includes('sicherheit') || s.includes('wachschutz')) ccText = "Polizei (Notruf)";
        else if(s.includes('prinz')) ccText = ""; // Betrüger haben oft kein CC

        // Element füllen (Falls ID vorhanden)
        const ccEl = document.getElementById('email-cc');
        if(ccEl) {
            ccEl.innerText = ccText;
            // Wenn leer, ganze Zeile ausblenden? Optional. Hier lassen wir es einfach leer.
            ccEl.parentElement.style.display = ccText ? 'flex' : 'none';
        }
        // -----------------------------------

        // Body
        const bodyEl = document.getElementById('email-body');
        if(bodyEl) bodyEl.innerHTML = (email.body || "").replace(/\n/g, "<br>");

        // 4. BUTTONS
        const actionContainer = document.getElementById('email-actions');
        actionContainer.innerHTML = '';
        
        if(email.opts) {
            email.opts.forEach((opt, index) => {
                const btn = document.createElement('button');
                btn.type = "button"; 
                
                // --- NEU: Prüfen, ob es der Löschen-Button ist ---
                const isDelete = opt.ignoreEmail;

                // Dynamische Farben zuweisen
                const hoverBg = isDelete ? "hover:bg-red-950/30 hover:border-red-500/50" : "hover:bg-blue-900/30 hover:border-blue-500/50";
                const textColor = isDelete ? "text-slate-400 hover:text-red-400" : "text-slate-300 hover:text-blue-300";
                const iconColor = isDelete ? "text-slate-600 group-hover:text-red-500" : "text-slate-500 group-hover:text-blue-400";
                const kbdHover = isDelete ? "group-hover:text-red-400" : "group-hover:text-blue-400";
                const iconText = isDelete ? "🗑️" : "➥";

                btn.className = `w-full text-left px-3 py-2 bg-slate-800 border border-slate-700 ${hoverBg} ${textColor} rounded transition-colors flex items-center justify-between group font-medium text-xs`;
                
                let hotkeyHTML = "";
                
                if (this.state.showHotkeys) {
                    let key = "";
                    if (index === 0) key = this.state.keyBinds.opt1;
                    else if (index === 1) key = this.state.keyBinds.opt2;
                    else if (index === 2) key = this.state.keyBinds.opt3;
                    else if (index === 3) key = "4";
                    else if (index === 4) key = "5";
                    else if (index === 5) key = "6";

                    if (key) {
                        hotkeyHTML = `<kbd class="shrink-0 text-[9px] bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded text-slate-500 font-mono shadow-inner ${kbdHover} transition-colors">${key.toUpperCase()}</kbd>`;
                    }
                }
                
                btn.innerHTML = `
                    <div class="flex items-center flex-1 mr-2">
                        <span class="mr-2 ${iconColor} transition-colors duration-75 text-base shrink-0">${iconText}</span>
                        <span class="break-words leading-tight py-1">${opt.btn}</span>
                    </div>
                    <div class="shrink-0 flex items-center h-full">
                        ${hotkeyHTML}
                    </div>
                `;
                
                btn.onclick = (e) => {
                    e.stopPropagation(); 
                    e.preventDefault();  
                    this.resolveEmail(opt, false);
                };
                actionContainer.appendChild(btn);
            });
        }
               
        // 5. ANZEIGEN
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
        
        // 6. TIMER
        const timerBar = document.getElementById('email-timer-bar');
        const DURATION = 20000; 
        
        if(timerBar) {
            timerBar.style.transition = 'none';
            timerBar.style.width = '100%';
            
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    timerBar.style.transition = `width ${DURATION}ms linear`;
                    timerBar.style.width = '0%';
                });
            });
        }

        if(this.state.emailTimer) clearTimeout(this.state.emailTimer);
        this.state.emailTimer = setTimeout(() => {
            this.resolveEmail(null, true); 
        }, DURATION);
    },

    resolveEmail: function(opt, timeout = false) {
        // NEUER SPAM-SCHUTZ ---
        if (!this.state.isEmailOpen) return;
        // -------------------------
        
        // --- Neuen Tag erst jetzt offiziell zählen! ---
        if (!this.state.dayActive) {
            this.state.dayActive = true;
            this.incrementStat('daysStarted');
        }
        // ---------------------------------------------
		
        this.playAudio('ui');
        if(this.state.emailTimer) clearTimeout(this.state.emailTimer);
        
        const modal = document.getElementById('email-modal');
        if(modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        }
        
        // --- ANPASSUNG 1: System sofort blockieren ---
        this.state.isEmailOpen = false;
        this.state.emailPending = true; // Blockiert checkRandomEmail
        // -------------------------------------------

        // Game Logik
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
                // Dynamisch berechnen, ob es eine Strafe gab, um sie im Log anzuzeigen
                let penaltyText = opt.c > 0 ? ` Radar +${Math.ceil(opt.c * this.state.difficultyMult)}%` : "";
                message = `E-MAIL IGNORIERT!${penaltyText}`;
                color = "text-red-500 font-bold";
            } else {
                message = `Gesendet: "${opt.btn}"`;
                color = "text-blue-400";
            }

            let mult = this.state.difficultyMult;
            
            // Zwischenspeichern der finalen Werte für die Animation
            let addedF = opt.f || 0;
            let addedA = opt.a ? Math.ceil(opt.a * mult) : 0;
            let addedC = opt.c ? Math.ceil(opt.c * mult) : 0;

            if(addedF) this.state.fl += addedF;
            if(addedA) this.state.al += addedA;
            if(addedC) this.state.cr += addedC;

            // --- Floating Text für E-Mails ---
            if (addedF !== 0) this.showFloatingText('val-fl', addedF);
            if (addedA !== 0) this.showFloatingText('val-al', addedA);
            if (addedC !== 0) this.showFloatingText('val-cr', addedC);
            // --------------------------------------
            
            // Wenn der ignore-Flag in der data.js gesetzt ist, zähle den Ghosting-Stat hoch!
            if(opt.ignoreEmail) this.state.emailsIgnored++;
            
            this.triggerShake(addedA, addedC);

            // 1. LOOT LOGIK für E-Mails
            if (opt.loot && opt.loot !== "") {
                let dbItem = DB.items[opt.loot];
                let isPermanent = dbItem && (dbItem.keep || dbItem.quest);
                let alreadyHas = this.state.inventory.find(i => i.id === opt.loot);
                
                let normalCount = this.state.inventory.filter(i => {
                    let db = DB.items[i.id];
                    return db && !db.quest;
                }).length;

                if (isPermanent && alreadyHas) {
                    // Hat man schon (passiert nichts weiter)
                } else if (!isPermanent && normalCount >= 10) {
                    let itemName = dbItem ? dbItem.name : opt.loot;
                    this.log(`Rucksack voll (10/10)! ${itemName} liegengelassen.`, "text-slate-500 italic");
                } else {
                    this.state.inventory.push({ id: opt.loot, used: false });
                    this.addToArchive('items', opt.loot);
                    
                    let itemName = dbItem ? dbItem.name : opt.loot;
                    this.log(`ERHALTEN: ${itemName}`, "text-yellow-400");
                    
                    // Die neue Rucksack-Animation aufrufen
                    if (dbItem && dbItem.img && typeof this.animateItemToBackpack === 'function') {
                        this.animateItemToBackpack(dbItem.img);
                    }
                }
            }

            // 2. ZEIT LOGIK (opt.m)
            if (opt.m) {
                this.state.time += opt.m;
            }

            // 3. RUF LOGIK (opt.rep)
            if (opt.rep) {
                let changed = false;
                for (let [charName, val] of Object.entries(opt.rep)) {
                    if (this.state.reputation[charName] === undefined) this.state.reputation[charName] = 0;
                    this.state.reputation[charName] += val;
                    this.state.reputation[charName] = Math.max(-100, Math.min(100, this.state.reputation[charName]));
                    changed = true;
                }
                if (changed) this.saveSystem();
            }

            // 4. TEXT LOGIK (opt.r)
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
        // Wenn es keine Option gibt (Timeout/Ignorieren) oder keine Folge-Mail ansteht
        if (!opt || !opt.nextEmail) {
            if (this.state.emailCooldownTimer) clearTimeout(this.state.emailCooldownTimer);
            
            // Gibt das E-Mail-System erst nach 5 Sekunden wieder frei
            this.state.emailCooldownTimer = setTimeout(() => {
                this.state.emailPending = false;
            }, 5000); 
        }
        // ----------------------------------------------
        
        this.log(message, color);
        this.updateUI();
        if (this.state.pendingEnd) this.finishGame();
    },
    
    trigger: function(type) {
		this.playAudio('action');
		// Blockieren, wenn Party
		if (this.state.isPartyMode) return;
        // Blockieren, wenn schon ein Event offen ist
        if(this.state.activeEvent) return;
        
        // --- TUTORIAL HOOK ---
        if (typeof tutorial !== 'undefined' && tutorial.isActive) {
            // Wir ziehen das exakte Event für den aktuellen Schritt aus DB.tutorial
            let tutEvent = DB.tutorial.find(e => e.type === type && e.step === tutorial.step);
            if (tutEvent) {
				tutorial.hidePointer();
                this.renderTerminal(tutEvent, type);
            } else {
                this.log("H.A.L.G.E.R.D.: Diese Aktion ist in der aktuellen Simulationsphase nicht vorgesehen.", "text-red-500");
            }
            return; // Normalen Trigger abbrechen!
        }
        
        // --- Neuen Tag erst jetzt offiziell zählen! ---
        if (!this.state.dayActive) {
            this.state.dayActive = true;
            this.incrementStat('daysStarted');
        }
        
        // ---------------------------------------------------------
        // 1. BOSS CHECK (Die "Katastrophe")
        // ---------------------------------------------------------
        // Chance: 5%. Gilt für ALLE Buttons (auch Calls & Sidequests).
        // Wenn der Boss kommt, ist alles andere egal.
        let bossPool = DB.bossfights.filter(ev => !this.state.usedIDs.has(ev.id));
        
        if (this.state.time > 540 && bossPool.length > 0 && Math.random() < 0.05) {
             this.triggerBossFight();
             return; // Unterbricht die eigentliche Aktion
        }

        // ---------------------------------------------------------
        // 2. INTERVENTION CHECK (Ruf-System)
        // ---------------------------------------------------------
        // Chance: 10%. Gilt ebenfalls für ALLE Buttons. Ein Charakter fängt dich ab.
        if (DB.reputation) {
            
            // A. Sammle alle Events, die der Spieler sehen darf (Ruf oder reqStory)
            let possibleInterventions = DB.reputation.filter(ev => {
                if (this.state.usedIDs.has(ev.id)) return false; 

                // Wenn es eine Story-Fortsetzung ist: Prüfen, ob Story-Flag aktiv
                if (ev.reqStory) {
                    return !!this.state.storyFlags[ev.reqStory]; 
                }
                
                // Wenn es ein Basis-Ruf-Event ist: Ruf-Werte prüfen
                if (ev.reqRep) {
                    for (let [char, threshold] of Object.entries(ev.reqRep)) {
                        let currentRep = this.state.reputation[char] || 0;
                        // Logik: Positiv = Mindestens X / Negativ = Höchstens X
                        if (threshold > 0 && currentRep < threshold) return false;
                        if (threshold < 0 && currentRep > threshold) return false;
                    }
                    return true;
                }
                
                return false;
            });

            // B. Würfeln: 10% Chance, dass überhaupt eine Begegnung stattfindet
            if (possibleInterventions.length > 0 && Math.random() < 0.10) {
                
                // 1. Array in Story-Events und Basis-Events aufteilen
                let storyEvents = possibleInterventions.filter(e => e.reqStory);
                let baseEvents = possibleInterventions.filter(e => !e.reqStory);
                
                let intervention = null;

                // 2. NEU: 30% Priorität für Story-Fortsetzungen, falls welche verfügbar sind!
                if (storyEvents.length > 0 && Math.random() < 0.30) {
                    intervention = storyEvents[Math.floor(Math.random() * storyEvents.length)];
                } 
                // 3. Wenn die 30% verfehlt wurden ODER keine Story-Events da sind -> Normales Ruf-Event
                else if (baseEvents.length > 0) {
                    intervention = baseEvents[Math.floor(Math.random() * baseEvents.length)];
                }
                // Fallback (z.B. wenn NUR Story-Events da sind, aber die 30% verfehlt wurden)
                else {
                    intervention = possibleInterventions[Math.floor(Math.random() * possibleInterventions.length)];
                }
                
                if (intervention) {
                    this.log(`Begegnung: ${intervention.title}`, "text-yellow-400");
                    
                    // Wir rendern es mit dem Typ 'rep' für das goldene Design
                    this.renderTerminal(intervention, 'rep'); 
                    return; // Unterbricht die eigentliche Aktion
                }
            }
        }

        // ---------------------------------------------------------
        // 3. EIGENTLICHE AKTION (Wenn keine Unterbrechung kam)
        // ---------------------------------------------------------
        
        // Sonderfall: Handy/Sidequest Logik
        if (type === 'sidequest') { 
            this.handleSideQuest(); 
            return; 
        }

        // Standard: Zufälliges Event aus dem gewählten Pool (coffee, server, calls)
        let pool = DB[type].filter(ev => {
            if (this.state.usedIDs.has(ev.id)) return false;
            if (ev.reqStory && !this.state.storyFlags[ev.reqStory]) return false;
            // webOnly events point at the store page - pointless once bought
            if (ev.webOnly && platform.isDesktop) return false;
            return true;
        });

        // Fallback, wenn Pool leer ist
        if (pool.length === 0) { 
            this.renderTerminal(DB.special.empty_pool, type); 
            return; 
        }
        
        // --- FOLGE-EVENT PRIORISIERUNG (30% Chance) ---
        let followUps = pool.filter(ev => ev.reqStory);
        let normalEvents = pool.filter(ev => !ev.reqStory);
        let ev;

        // Wenn ein Folge-Event freigeschaltet wurde, ziehe es mit 30% Wahrscheinlichkeit vor!
        if (followUps.length > 0 && Math.random() < 0.30) {
            ev = followUps[Math.floor(Math.random() * followUps.length)];
        } else if (normalEvents.length > 0) {
            ev = normalEvents[Math.floor(Math.random() * normalEvents.length)];
        } else {
            // Fallback: Wenn nur noch Folge-Events da sind
            ev = followUps[Math.floor(Math.random() * followUps.length)];
        }
        
        // Event starten
        this.renderTerminal(ev, type);
    },

    triggerBossFight: function() {
		
        // --- FIX: KEINE E-MAILS BEI BOSSFIGHTS ---
        if (this.state.emailTimer) clearTimeout(this.state.emailTimer);
        if (this.state.emailDelayTimer) clearTimeout(this.state.emailDelayTimer);
        if (this.state.emailChainTimer) clearTimeout(this.state.emailChainTimer);
        if (this.state.emailCooldownTimer) clearTimeout(this.state.emailCooldownTimer);
        
        this.state.emailTimer = null;
        this.state.emailDelayTimer = null;
        this.state.emailPending = false;
        
        // Falls das Modal gerade schon halb offen war, hart schließen
        const emailModal = document.getElementById('email-modal');
        if (emailModal) {
            emailModal.classList.add('hidden');
            emailModal.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
            this.state.isEmailOpen = false;
        }
        // ------------------------------------------
		
        let pool = DB.bossfights.filter(ev => !this.state.usedIDs.has(ev.id));
        
        if(pool.length === 0) return; 
     
        let boss = pool[Math.floor(Math.random() * pool.length)]; 

        this.state.activeEvent = true;
        this.state.usedIDs.add(boss.id);
        this.disableButtons(true);
		
		// ---> MUSIK FÜR DEN BOSS STARTEN <---
        this.playMusic('boss');
        this.updatePresence('boss');

        const term = document.getElementById('terminal-content');
        
        // FIX 1: OPACITY ENTFERNEN!
        // Wir setzen die Klasse genau so wie bei 'renderTerminal', damit es hell wird.
        term.className = "flex-1 flex flex-col items-center py-3 w-full min-h-full";

        // Event rendern
        this.renderEventHTML(boss, 'boss', term);

        // Wir rechnen in Millisekunden, damit der Balken flüssig läuft
        let totalTimeMs = boss.timer * 1000;
        let currentTimeMs = totalTimeMs;
        const updateInterval = 50; // Update alle 50ms für flüssige Animation

        this.state.bossTimer = setInterval(() => {
            currentTimeMs -= updateInterval;
            
            const bar = document.getElementById('integrated-boss-bar');
            
            if(bar) {
                // Prozent berechnen
                let percent = (currentTimeMs / totalTimeMs * 100);
                bar.style.width = percent + "%";
                
                // Pulsieren, wenn es knapp wird (unter 30%)
                if(percent < 30) {
                    bar.classList.add('animate-pulse');
                    // Optional: Farbe intensivieren
                    bar.classList.remove('from-red-600', 'to-red-500');
                    bar.classList.add('bg-red-600'); 
                }
            }
            
            if(currentTimeMs <= 0) {
                clearInterval(this.state.bossTimer);
                this.resolveBossFail(boss.fail);
            }
        }, updateInterval);
    },

    resolveBossFail: function(failData) {
        this.resolveTerminal(failData.r, failData.m, failData.f, failData.a, failData.c, null, null, 'boss');
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

        // --- FOLGE-EVENT PRIORISIERUNG (30% Chance) ---
        let followUps = pool.filter(ev => ev.reqStory);
        let normalEvents = pool.filter(ev => !ev.reqStory);
        let ev;

        if (followUps.length > 0 && Math.random() < 0.30) {
            ev = followUps[Math.floor(Math.random() * followUps.length)];
        } else if (normalEvents.length > 0) {
            ev = normalEvents[Math.floor(Math.random() * normalEvents.length)];
        } else {
            ev = followUps[Math.floor(Math.random() * followUps.length)];
        }
        // ---------------------------------------------------

        if (ev.kind === 'phone') {
            this.state.activeEvent = true;
            this.state.currentPhoneEvent = ev;
            this.state.usedIDs.add(ev.id);
            this.disableButtons(true);
            
            // Notification anzeigen
            document.getElementById('phone-notification').classList.remove('hidden');
            document.getElementById('phone-notification').classList.add('flex');
            this.log("Handy: " + ev.title);
            
            // --- Handy einblenden & hinscrollen ---
            this.updatePhoneVisibility();
            setTimeout(() => {
                const phone = document.getElementById('smartphone');
                // Nur auf kleinen Bildschirmen scrollen
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
		// --- Event-Status für E-Mail-System speichern ---
        this.state.currentEventId = ev.id;     // "did we already mail for this event?"
        this.state.currentEventType = type;    // "is this a boss fight?"
        this.updatePresence(type);
        // -----------------------------------------------------
				
        this.state.activeEvent = true;
        if(ev.id) this.state.usedIDs.add(ev.id); 
        this.disableButtons(true);

        const term = document.getElementById('terminal-content');
        
        // WICHTIG: Container-Styling für Zentrierung
        term.className = "flex-1 flex flex-col items-center py-3 w-full min-h-full";

        // ENTSCHEIDUNG: Neu (Nodes) oder Alt (Opts)?
        if (ev.nodes && ev.startNode) {
            this.state.currentChainEvent = ev;
            this.state.currentChainType = type;
            this.renderChainNode(ev.startNode);
        } else {
            this.renderEventHTML(ev, type, term);
        }
    },

    // 1. NEUES SYSTEM (Story-Ketten)
    renderChainNode: function(nodeId) {
        const ev = this.state.currentChainEvent;
        const type = this.state.currentChainType;
        const node = ev.nodes[nodeId];
        const term = document.getElementById('terminal-content');

        if (!node) { console.error("Node not found:", nodeId); return; }

        // Gemeinsames HTML generieren
        term.innerHTML = this.buildEventHTML(
            type, 
            ev.title || "Anruf", 
            node.text, 
            node.opts, 
            true, // isChain = true
            ev.char // <--- NEU: Charakter übergeben
        );
    },

    // 2. ALTES SYSTEM (Einfache Events)
    renderEventHTML: function(ev, type, container) {
        container.innerHTML = this.buildEventHTML(
            type, 
            ev.title, 
            ev.text, 
            ev.opts, 
            false, // isChain = false
            ev.char // <--- NEU: Charakter übergeben
        );
    },

    // 3. GEMEINSAMES HTML-TEMPLATE
    buildEventHTML: function(type, title, text, opts, isChain, charName) {
		
        // ---> Mache aus \n echte HTML-Zeilenumbrüche <---
        let formattedText = text ? text.replace(/\n/g, "<br>") : "";		
        
        // --- STYLE KONFIGURATION ---
        let typeName = 'SYSTEM';
        let color = 'text-amber-400';       
        let borderColor = 'border-amber-500';
		let bgClass = 'bg-slate-900';
        let icon = '⚡'; 

        switch(type) {
            case 'calls': 
                typeName = 'ANRUF';
                color = 'text-blue-400';
                borderColor = 'border-blue-500';
                icon = '📞';
                break;
            case 'boss': 
                typeName = 'NOTFALL';
                color = 'text-red-500';
                borderColor = 'border-red-500';
                icon = '🚨';
                break;
			case 'rep':
                typeName = 'BEGEGNUNG';			
                color = 'text-yellow-300';
                borderColor = 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]';
                bgClass = "bg-gradient-to-b from-slate-900 to-slate-950";
				icon = '📖';
                break;
            case 'sidequest': 
                typeName = 'DIENSTGANG';  
                color = 'text-purple-400';
                borderColor = 'border-purple-500';
                icon = '🎲';
                break;
            case 'server': 
                typeName = 'SERVERRAUM';            
                color = 'text-emerald-400';
                borderColor = 'border-emerald-500';
                icon = '💾';
                break;
            case 'coffee': 
                typeName = 'KAFFEE';            
                color = 'text-amber-400';       
                borderColor = 'border-amber-500';
                icon = '☕';
                break;
            case 'party':
                typeName = 'SYNERGY-GALA';
                color = 'text-pink-400';
                borderColor = 'border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.3)]';
                bgClass = "bg-gradient-to-b from-slate-900 to-slate-950";
                icon = '🎉';
                break;
            case 'special':
                typeName = 'MITTAGSPAUSE';
                color = 'text-teal-400';
                borderColor = 'border-teal-500 shadow-[0_0_10px_rgba(45,212,191,0.2)]';
                icon = '🍽️';
                break;	
        }

        // --- PORTRAIT LOGIK (Rechts neben der Textbox - Clean Version) ---
        let portraitHTML = "";
        if (charName && DB.chars) {
            let dbChar = DB.chars.find(c => c.name === charName);
            if (dbChar) {
                // Bild oder Icon laden
                let avatarContent = dbChar.img 
                    ? `<img src="${dbChar.img}" class="w-full h-full object-cover scale-110" alt="${dbChar.name}">` 
                    : `<div class="w-full h-full flex items-center justify-center text-5xl bg-slate-800/50">${dbChar.icon}</div>`;

                // Nur die stylische Box, ohne extra Namens-Balken
                portraitHTML = `
                <div class="hidden sm:flex shrink-0 w-28 h-28 md:w-32 md:h-32 bg-slate-900 border border-slate-600 rounded-xl shadow-lg overflow-hidden items-center justify-center">
                    ${avatarContent}
                </div>`;
            }
        }
        
        let allowedExcuseTypes = ['coffee', 'server', 'sidequest', 'calls', 'rep'];
        let isTutorial = typeof tutorial !== 'undefined' && tutorial.isActive;
        let showExcuseButton = allowedExcuseTypes.includes(type) && this.state.excusesLeft > 0 && !isTutorial;

        let html = `
            <div class="w-full max-w-2xl text-left fade-in ${bgClass} border ${borderColor} p-4 md:p-6 rounded-xl shadow-2xl mx-auto my-auto shrink-0 relative overflow-hidden">
                <div class="flex items-center gap-3 mb-4 md:mb-6 border-b border-slate-600 pb-3 md:pb-4">
                    <span class="text-3xl shrink-0">${icon}</span>
                    <div class="flex flex-col min-w-0">
                        <span class="${color} font-black uppercase tracking-widest text-sm break-words">${typeName}</span>
                        <h2 class="text-xl md:text-2xl font-bold text-slate-100 break-words">${title}</h2>
                    </div>
                </div>


        `;

        if (type === 'boss') {
            html += `
            <div class="w-full h-4 bg-red-950/50 rounded-full mb-6 border border-red-500/30 overflow-hidden relative">
                <div id="integrated-boss-bar" class="h-full bg-gradient-to-r from-red-600 to-red-500 shadow-red-500/50 shadow-md ease-linear" style="width: 100%"></div>
            </div>
            `;
        }
        
        // --- TEXTBOX UND PORTRAIT NEBENEINANDER ---
        html += `
                <div class="flex gap-4 md:gap-6 items-center mb-8">
                    <div class="flex-1 bg-black/40 p-5 rounded-lg border-l-4 ${borderColor} shadow-inner">
                        <p class="italic text-slate-300 text-lg leading-relaxed font-serif">"${formattedText}"</p>
                    </div>
                    ${portraitHTML}
                </div>

                <div class="space-y-2.5">
        `;

        // Die Buttons
        if (opts) {
            opts.forEach((opt, index) => {
                let locked = false;
                let reqText = "";

                if (opt.req) {
                    let hasItem = this.state.inventory.find(i => i.id === opt.req && !i.used);
                    let onCooldown = false;
                    if (opt.req === 'stressball' && (this.state.time - this.state.lastStressballTime < 60)) onCooldown = true;

                    if (!hasItem || onCooldown) {
                        locked = true;
                        let itemName = DB.items[opt.req] ? DB.items[opt.req].name : opt.req;
                        if(!hasItem) reqText = `(Fehlt: ${itemName})`;
                        if(onCooldown) reqText = `(Cooldown)`;
                    }
                }
				
                if(opt.rem && !locked) {
                    let hasItem = this.state.inventory.find(i => i.id === opt.rem);
                    if(!hasItem) {
                        locked = true;
                        let itemName = DB.items[opt.rem] ? DB.items[opt.rem].name : opt.rem;
                        reqText = `(Benötigt: ${itemName})`;
                    }
                }
                
                if (opt.checkPool && !locked) {
                    let pool = DB.party.filter(ev => ev.loc === opt.checkPool && !this.state.usedIDs.has(ev.id));
                    if (pool.length === 0) {
                        locked = true;
                        reqText = "(Alles gesehen)"; 
                    }
                }

                let btnClass = "";
                let clickAction = "";
                let iconBtn = "";

                if (locked) {
                    btnClass = "w-full text-left p-2.5 rounded border border-red-900 bg-slate-950 text-slate-600 cursor-not-allowed flex justify-between items-center opacity-70";
                    iconBtn = "🔒";
                } else {
                    btnClass = "w-full text-left p-2.5 rounded border border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-slate-400 hover:text-white transition-all text-slate-200 font-bold shadow-md flex justify-between items-center group";
                    iconBtn = `<span class="${color} group-hover:text-white transition-colors">➤</span>`;
                    
                    if (opt.action) {
                        clickAction = `onclick="${opt.action}"`;
                    } else if (isChain) {
                        clickAction = `onclick="engine.handleChainChoice('${opt.next}')"`;
                    } else {
                        let safeRes = opt.r ? opt.r.replace(/'/g, "\\'").replace(/"/g, "&quot;").replace(/\n/g, "<br>") : '';
                        let safeRep = opt.rep ? JSON.stringify(opt.rep).replace(/"/g, "&quot;") : "null";
                        clickAction = `onclick="engine.resolveTerminal('${safeRes}', ${opt.m||0}, ${opt.f||0}, ${opt.a||0}, ${opt.c||0}, '${opt.loot||''}', '${opt.req||''}', '${type}', '${opt.next||''}', '${opt.rem||''}', ${safeRep})"`;
                    }
                }

                let badgeHTML = "";
                if (isChain && !locked && opt.next && !opt.next.startsWith('res_')) {
                     badgeHTML = `<span class="text-xs text-blue-400 bg-blue-900/20 border border-blue-900/50 px-2 py-1 rounded ml-3 font-mono">...</span>`;
                }

                let warningSpan = locked ? `<span class="text-sm text-red-500 font-normal ml-2">${reqText}</span>` : "";

                // --- NEU: HOTKEY BADGE FÜR DAS TERMINAL ---
                let hotkeyHTML = "";
                let key = "";
                
                if (this.state.showHotkeys) {
                    if (index === 0) key = this.state.keyBinds.opt1;
                    else if (index === 1) key = this.state.keyBinds.opt2;
                    else if (index === 2) key = this.state.keyBinds.opt3;
                    else if (index === 3) key = "4";
                    else if (index === 4) key = "5";
                    else if (index === 5) key = "6";

                    if (key) {
                        hotkeyHTML = `<kbd class="shrink-0 text-[9px] bg-slate-900 border border-slate-600 px-1.5 py-0.5 rounded text-slate-400 font-mono shadow-inner group-hover:text-white transition-colors">${key.toUpperCase()}</kbd>`;
                    }
                }
                
                html += `
                <button class="${btnClass}" ${clickAction} ${locked ? 'disabled' : ''}>
                    <div class="flex items-center flex-1 mr-2 min-w-0"> 
                        <span class="mr-3 text-xl shrink-0">${iconBtn}</span>
                        <span class="text-left break-words py-1">${opt.t} ${warningSpan}</span>
                    </div>
                    <div class="shrink-0 flex items-center h-full">
                        ${badgeHTML}
                        ${hotkeyHTML}
                    </div>
                </button>`;
            });
        }
        
        // Ausreden-Button wird GANZ UNTEN rechts platziert
        if (showExcuseButton) {
            html += `
                <div class="mt-5 w-full flex justify-end border-t border-slate-800 pt-4">
                    <button onclick="engine.openExcuseModal()" class="px-3 py-2 bg-slate-800/80 border border-slate-700 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-700 rounded transition-all shadow-md flex items-center gap-2 group">
                        <span>Ausrede nutzen (${this.state.excusesLeft} übrig)</span>
                    </button>
                </div>
            `;
        }
        
        html += `</div></div>`;
        return html;
    },

    // Logik für die Auswahl in Call-Ketten
    handleChainChoice: function(nextId) {
		this.playAudio('ui');
        const ev = this.state.currentChainEvent;

        // Fall 1: Weiter im Text
        if (ev.nodes && ev.nodes[nextId]) {
            this.renderChainNode(nextId);
            return;
        }

        // Fall 2: Ergebnis (Ende)
        if (ev.results && ev.results[nextId]) {
            const res = ev.results[nextId];
            this.resolveTerminal(
                res.txt,
                res.min || res.m || 0,
                res.fl || res.f || 0,
                res.al || res.a || 0,
                res.cr || res.c || 0,
                res.loot || null,
                null, 
                this.state.currentChainType,
                res.next || null,
                res.rem || null
            );
            this.state.currentChainEvent = null;
            return;
        }

        console.error("Chain Error: Ziel nicht gefunden", nextId);
        this.resolveTerminal("Verbindung unterbrochen.", 0, 0, 0, 0, null, null, "calls", null);
    },

    resolveTerminal: function(res, m, f, a, c, loot, usedItem, type, next, rem, repData) {
	
        this.playAudio('ui');
	
        // --- BUGFIX: TIMER STOPPEN ---
        if (this.state.bossTimer) {
            clearInterval(this.state.bossTimer);
            this.state.bossTimer = null;
        }
        
        // --- BUGFIX START: Fallback für fehlende Werte ---
        m = typeof m === 'number' ? m : 0;
        f = typeof f === 'number' ? f : 0;
        a = typeof a === 'number' ? a : 0;
        c = typeof c === 'number' ? c : 0;
        // --- BUGFIX ENDE ---
	
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
		
		// Wenn man mit Bernd trinkt ODER den Rum-Kuchen genießt
        if (next === 'path_bernd_drunk' || next === 'path_cake_drunk') {
            this.state.drunkEndTime = this.state.time + m + 60; 
            this.log("Alles dreht sich ein bisschen...", "text-purple-400 italic");
        }

        // Zeit & Tickets
        let oldTimeChunk = Math.floor(this.state.time / 30);

        // BUGFIX: Offene Tickets nur bis Feierabend zählen 16:30 (16 * 60 + 30 = 990)
        const SHIFT_END_TIME = 16 * 60 + 30; 
        let cappedTime = Math.min(this.state.time + m, SHIFT_END_TIME);

        let newTimeChunk = Math.floor(cappedTime / 30);
        let newTickets = Math.max(0, newTimeChunk - oldTimeChunk); 

        this.state.tickets += newTickets;
        
        if (type === 'calls') { 
            this.state.tickets = Math.max(0, this.state.tickets - 1);
        }

        this.state.time += m;
        
        // Lunch Check
        let triggerLunch = false;
        if (!this.state.isPartyMode && !this.state.lunchDone && this.state.time >= 12 * 60) {
            triggerLunch = true;
            this.state.lunchDone = true;
        }

        // --- SCHWIERIGKEIT & FAULHEIT LOGIK ---
        let diffMult = this.state.difficultyMult;
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
        
        // --- REPUTATION LOGIK  ---
        if (repData) {
            // Falls repData als String kommt (durch HTML Attribute), parsen
            if (typeof repData === 'string') {
                try { repData = JSON.parse(repData.replace(/'/g, '"')); } catch(e) { console.error("Rep Parse Error", e); }
            }

            if (typeof repData === 'object') {
                let changed = false; // Wir merken uns, ob sich was geändert hat
                
                for (let [charName, val] of Object.entries(repData)) {
                    // Sicherstellen, dass der Charakter im State existiert
                    if (this.state.reputation[charName] === undefined) {
                        this.state.reputation[charName] = 0;
                    }
                    
                    // Wert addieren
                    this.state.reputation[charName] += val;
                    
                    // Begrenzen auf -100 bis +100
                    this.state.reputation[charName] = Math.max(-100, Math.min(100, this.state.reputation[charName]));
                    
                    // Optional: Floating Text Feedback (Nur wenn gewünscht)
                    // if (val !== 0) this.showFloatingText('team-btn', val > 0 ? '💚' : '💔');

                    changed = true;
                }

                // WENN sich der Ruf geändert hat: Sofort ins Archiv schreiben & speichern!
                if (changed) {
                    this.saveSystem(); 
                }
            }
        }

        // Story Flag setzen
        if (next && next !== "") {
            this.state.storyFlags[next] = true;
        }
        
        // --- PARTY FORTSCHRITT ZÄHLEN ---
        if (this.state.isPartyMode && type === 'party' && next === 'party_hub') {
            this.state.partyProgress++;
        }
        
        // --- ITEMS REMOVED (rem) ---
        if (rem && rem !== "") {
            // Finde den Index des ERSTEN passenden Items
            let index = this.state.inventory.findIndex(i => i.id === rem);
            if (index > -1) {
                // Lösche exakt 1 Item an genau diesem Index
                this.state.inventory.splice(index, 1);
                let removedName = DB.items[rem] ? DB.items[rem].name : rem;
                this.log(`Verloren: ${removedName}`, "text-orange-400");
            }
        }
        // --------------------------------

        // --- ITEM LOGIK: LOOT ---
        if(loot && loot !== "") {
            let dbItem = DB.items[loot];
            // Ist es ein dauerhaftes Werkzeug oder Quest-Item?
            let isPermanent = dbItem && (dbItem.keep || dbItem.quest);
            // Haben wir es schon?
            let alreadyHas = this.state.inventory.find(i => i.id === loot);
            
            // Rucksack Kapazität berechnen (nur normale Items zählen, keine Trophäen!)
            let normalCount = this.state.inventory.filter(i => {
                let db = DB.items[i.id];
                return db && !db.quest;
            }).length;

            if (isPermanent && alreadyHas) {
                // 1. Permanentes Item (z.B. Feuerlöscher) hat man schon -> Verfällt leise
            } 
            else if (!isPermanent && normalCount >= 10) {
                // 2. Verbrauchsgegenstand, aber Rucksack ist voll (10/10) -> Nachricht an Spieler
                let itemName = dbItem ? dbItem.name : loot;
                this.log(`Rucksack voll (10/10)! ${itemName} liegengelassen.`, "text-slate-500 italic");
            } 
            else {
                // 3. Item hinzufügen! (Erlaubt auch den 2. oder 3. Donut)
                this.state.inventory.push({ id: loot, used: false });
                this.addToArchive('items', loot);
                let itemName = dbItem ? dbItem.name : loot;
                this.log(`ITEM: ${itemName}`, "text-yellow-400");
                if (DB.items[loot] && DB.items[loot].img) { this.animateItemToBackpack(DB.items[loot].img); }
            }
        }
        
        this.log(res);
        this.updateUI();

        // UI Rendern
        const term = document.getElementById('terminal-content');
        
        let btnAction = triggerLunch ? "engine.triggerLunch()" : "engine.reset()";
        let btnText = triggerLunch ? "ZUR MITTAGSPAUSE" : "WEITER";
        let btnColor = "bg-blue-600 hover:bg-blue-500"; 

        if (this.state.pendingEnd) {
            // --- Die getarnte Party-Falle ---
            if (this.state.pendingEnd.isParty) {
                btnAction = "engine.startParty()";
                btnText = "FEIERABEND MACHEN 🎉"; // Gleicher Text wie beim normalen Sieg!
                btnColor = "bg-pink-600 hover:bg-pink-500"; // Ein fieses Pink als kleiner Hinweis
            } else {
                // --- Normales Ende ---
                btnAction = "engine.finishGame()";
                if (this.state.pendingEnd.isWin) {
                    btnText = "FEIERABEND MACHEN 🎉";
                    btnColor = "bg-green-600 hover:bg-green-500";
                } else {
                    btnText = "DAS WAR'S... (GAME OVER)";
                    btnColor = "bg-red-600 hover:bg-red-500";
                }
            }
        }

        let statSummaryHTML = this.buildStatSummary(m, f, finalA, finalC);

        term.innerHTML = `
            <div class="w-full max-w-xl text-left fade-in flex flex-col my-auto shrink-0">
                <div class="bg-slate-800 p-6 rounded-xl border border-slate-600 mb-8 shadow-xl">
                    <h3 class="font-bold text-white mb-2 uppercase text-xs tracking-widest text-emerald-500">Ergebnis</h3>
                    <p class="text-slate-300 italic text-lg leading-relaxed">"${res}"</p>
                    ${statSummaryHTML}
                </div>
                <button onclick="${btnAction}" class="${btnColor} text-white w-full py-4 rounded-xl font-bold uppercase transition-all shadow-lg border border-slate-700/50">
                    ${btnText}
                </button>
            </div>
        `;
    },

    triggerLunch: function() {
        let lunchOptions = DB.special.lunchEvents;
        let randomLunch = lunchOptions[Math.floor(Math.random() * lunchOptions.length)];
        this.renderTerminal(randomLunch, 'special');
    },

    triggerMorningMood: function() {
        // Fallback, falls die Kategorie in der data.js fehlt
        if (!DB.moods || DB.moods.length === 0) {
            this.reset();
            return;
        }
        
        // --- Musik nach der Boot-Sequenz wieder starten ---
        this.playMusic('office');
        
        // Buttons für die halbe Sekunde Ladezeit freigeben
        this.disableButtons(false);
        this.state.activeEvent = false;

        // 1. Zufälliges Morgen-Ereignis ziehen (mit Anti-Repeat-Schutz)
        let availableMoods = DB.moods.filter(m => m.id !== this.state.lastMoodId);
        
        // Fallback, falls (theoretisch) nur noch einer übrig ist
        if (availableMoods.length === 0) availableMoods = DB.moods; 
        
        let mood = availableMoods[Math.floor(Math.random() * availableMoods.length)];
        this.state.lastMoodId = mood.id; // Fürs nächste Mal merken
        
        // 2. Mechanik sicher anwenden
        let statHtml = "";
        
        if (mood.effect === "aggro") {
            this.state.al += 15;
            statHtml = "<span class='text-orange-400 font-bold'>+15% Aggro</span>";
        } 
        else if (mood.effect === "radar") {
            this.state.cr += 15;
            statHtml = "<span class='text-red-500 font-bold'>+15% Chef-Radar</span>";
        } 
        else if (mood.effect === "lazy") {
            this.state.fl += 15;
            this.state.time += 30; // Zeitverlust wegen Verschlafen
            this.state.tickets += 1; // FIX: Strafe für die verlorenen 30 Minuten!
            statHtml = "<span class='text-emerald-400 font-bold'>Start 08:30 Uhr & +15% Faulheit</span>";
        } 
        else if (mood.effect === "normal") {
            statHtml = "<span class='text-slate-400 font-bold'>Neutral. Der ganz normale Wahnsinn beginnt.</span>";
        } 
        else if (mood.effect === "snack") {
            // Nur Snacks als Loot!
            const possibleItems = ["energy", "donut", "sandwich", "chocolate"];
            const rItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
            this.state.inventory.push({ id: rItem, used: false });
            this.addToArchive('items', rItem);
            let itemName = DB.items[rItem] ? DB.items[rItem].name : rItem;
            statHtml = `<span class='text-yellow-400 font-bold'>Inventar: ${itemName} erhalten!</span>`;
            if (DB.items[rItem] && DB.items[rItem].img) { this.animateItemToBackpack(DB.items[rItem].img); }
        }

        // GUI sofort aktualisieren, damit die Balken/Uhrzeit richtig stehen
        this.updateUI();

        // 3. Im Terminal wunderschön im "Special Event" Design rendern
        const term = document.getElementById('terminal-content');
        term.className = "flex-1 flex flex-col items-center py-3 w-full min-h-full";
        
        term.innerHTML = `
            <div class="w-full max-w-2xl text-left fade-in bg-slate-900 border border-slate-400 p-4 md:p-6 rounded-xl shadow-2xl mx-auto my-auto shrink-0 relative overflow-hidden">
                <div class="flex items-center gap-3 mb-4 md:mb-6 border-b border-slate-600 pb-3 md:pb-4">
                    <span class="text-3xl">🌅</span>
                    <div class="flex flex-col">
                        <span class="text-slate-400 font-black uppercase tracking-widest text-sm">DER MORGEN DANACH</span>
                        <h2 class="text-2xl font-bold text-white">${mood.title}</h2>
                    </div>
                </div>
                
                <div class="bg-black/40 p-5 rounded-lg border-l-4 border-slate-400 mb-6">
                    <p class="italic text-slate-300 text-lg leading-relaxed font-serif">"${mood.text}"</p>
                </div>
                
                <div class="mb-8 text-center text-sm bg-slate-950 border border-slate-800 p-3 rounded shadow-inner">
                    Startbedingungen: ${statHtml}
                </div>

                <button onclick="engine.reset()" class="w-full text-center p-4 rounded-xl border border-slate-500 bg-slate-800 hover:bg-slate-700 hover:border-slate-300 hover:shadow-lg hover:text-white transition-all text-slate-200 font-bold shadow-md uppercase tracking-widest">
                    Den Arbeitstag beginnen
                </button>
            </div>
        `;
    },

    // --- PARTY SYSTEM ---
    goToPartyStation: function(loc) {
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
        // 1. Erst im allerletzten Moment als gespielt abspeichern!
        if (this.state.currentPartyKey) {
            localStorage.setItem(this.state.currentPartyKey, 'true'); 
        }
        this.state.isPartyMode = false;
        
        // --- GALA-ERFOLG FREISCHALTEN ---
        this.unlockAchievement('ach_party', '🎉 Synergy-Veteran', 'Du hast die legendäre Firmenfeier überlebt.');

        // 2. Party-Report Box zusammenbauen
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

        // Die Erfolge des Tages abrufen
        let achHTML = this.state.achievedTitles.length > 0 ? 
            `<div class="mt-2 border-t border-slate-700 pt-2"><div class="font-bold text-yellow-400 mb-2 text-xs uppercase">Heutige Errungenschaften:</div>${this.state.achievedTitles.map(t => `<div class="text-xs text-slate-300">🏆 ${t}</div>`).join('')}</div>` 
            : "";

        let fullReport = statsHTML + achHTML;

        // 3. Tagebuch generieren (inkl. des Party-Endes)
        this.incrementStat('daysSurvived');
        let diary = this.generateDiaryEntry("PARTY", text);

        // 4. End-Modal aufrufen (Das versteckte [PARTY] triggert die Farbe!)
        let subtitleHTML = `<div class="text-3xl font-black text-white text-center mb-6 uppercase tracking-wider not-italic">${title}</div>`;
        this.showEnd("GALA VORBEI", subtitleHTML + "Der Abend ist vorbei. Ein Arbeitstag für die Geschichtsbücher.<br>" + fullReport + diary, true);
    },

    // --- PHONE SYSTEM ---
    openPhone: function() {
		this.playAudio('phone');
        document.getElementById('phone-standby').classList.add('hidden');
        document.getElementById('phone-app').classList.remove('hidden');
        document.getElementById('phone-app').classList.add('flex');
        document.getElementById('phone-notification').classList.add('hidden');
        document.getElementById('phone-notification').classList.remove('flex');

        let ev = this.state.currentPhoneEvent;
        document.getElementById('app-title').innerText = ev.appName;
        
        document.getElementById('app-content').innerHTML = '';
        this.renderPhoneNode(ev.nodes[ev.startNode]);
    },
	
    renderPhoneNode: function(node) {
        // Sicherstellen, dass Content und Actions existieren
        const content = document.getElementById('app-content');
        const actions = document.getElementById('app-actions');
        
        if (!content || !actions) return;

        // Avatar basierend auf App-Name oder Titel (Default: ?)
        // Wir nehmen einfach den ersten Buchstaben des Titels als "Avatar"
        let ev = this.state.currentPhoneEvent;
        let avatarLetter = ev.title ? ev.title.charAt(0).toUpperCase() : "?";
        let senderName = ev.title || "Unbekannt";

        // HTML für EINGEHENDE Nachricht (Links, Grau, Modern)
        // Hier wird der Text aus der Data.js (node.text) eingefügt
        content.innerHTML += `
        <div class="w-full flex justify-start mb-4 fade-in">
            <div class="flex items-end gap-2 max-w-[85%]">
                <div class="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 border border-slate-500">
                    ${avatarLetter}
                </div>
                
                <div class="flex flex-col">
                    <span class="text-[10px] text-slate-400 ml-1 mb-0.5">${senderName}</span>
                    <div class="bg-slate-700 text-slate-100 px-4 py-2 rounded-2xl rounded-bl-none shadow-md text-sm leading-relaxed border border-slate-600 relative">
                        ${node.text}
                    </div>
                </div>
            </div>
        </div>`;

        // Buttons rendern (Deine Antwortmöglichkeiten)
        actions.innerHTML = '';
        // Container Styling sicherstellen
        actions.className = "p-2 bg-slate-900 border-t border-slate-700 flex flex-col gap-2"; 

        node.opts.forEach((opt, index) => {
            const btn = document.createElement('button');
            // NEU: 'w-full' und 'justify-between' hinzugefügt
            btn.className = "w-full bg-slate-800 hover:bg-blue-600 text-blue-400 hover:text-white border border-slate-600 hover:border-blue-500 py-1 px-2 rounded-xl text-sm font-medium transition-all text-left shadow-sm flex items-center justify-between group";
            
            // Requirements & Removal prüfen (Vereint wie im Terminal)
            let locked = false;
            let missingItem = "";

            if (opt.req) {
                 const hasItem = this.state.inventory.find(i => i.id === opt.req);
                 if (!hasItem) {
                     locked = true;
                     missingItem = DB.items[opt.req] ? DB.items[opt.req].name : opt.req;
                 }
            }
            if (opt.rem && !locked) {
                 const hasItem = this.state.inventory.find(i => i.id === opt.rem);
                 if (!hasItem) {
                     locked = true;
                     missingItem = DB.items[opt.rem] ? DB.items[opt.rem].name : opt.rem;
                 }
            }

            // NEU: Hotkey Logik (nur anzeigen, wenn Option max 3 ist und nicht gesperrt ist)
            let hotkeyHTML = "";
            let key = "";
            
            if (this.state.showHotkeys) {
                if (index === 0) key = this.state.keyBinds.opt1;
                else if (index === 1) key = this.state.keyBinds.opt2;
                else if (index === 2) key = this.state.keyBinds.opt3;
                else if (index === 3) key = "4";
                else if (index === 4) key = "5";
                else if (index === 5) key = "6";

                if (key) {
                    hotkeyHTML = `<kbd class="shrink-0 text-[9px] bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded text-slate-400 font-mono shadow-inner group-hover:text-white transition-colors">${key.toUpperCase()}</kbd>`;
                }
            }

            if (locked) {
                btn.classList.add('opacity-50', 'cursor-not-allowed');
                btn.innerHTML = `
                    <div class="flex items-center gap-2 flex-1 mr-2">
                        <span class="text-red-500 shrink-0">🔒</span> 
                        <span class="break-words leading-tight py-1">${opt.t}</span>
                    </div>
                    <div class="shrink-0 flex items-center h-full">
                        <span class="text-[10px]">(Fehlt: ${missingItem})</span>
                    </div>`;
            } else {
                btn.innerHTML = `
                    <div class="flex items-center gap-2 flex-1 mr-2">
                        <span class="opacity-50 group-hover:opacity-100 shrink-0">➤</span> 
                        <span class="break-words leading-tight py-1">${opt.t}</span>
                    </div>
                    <div class="shrink-0 flex items-center h-full">
                        ${hotkeyHTML}
                    </div>
                `;
                btn.onclick = () => this.handlePhoneChoice(opt.t, opt.next, opt.rem);
            }
            
            actions.appendChild(btn);
        });
        
        // AUTO SCROLL (Sanft nach unten)
        setTimeout(() => {
            content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
        }, 100);
    },

    handlePhoneChoice: function(text, nextId, remId) {
		this.playAudio('phone');
        const actions = document.getElementById('app-actions');
        
        // SPAM-SCHUTZ
        if (!actions || actions.innerHTML.trim() === '') return;
        actions.innerHTML = ''; 

        const content = document.getElementById('app-content');
        
        // 1. DEINE NACHRICHT (Rechts, Blau)
        content.innerHTML += `
        <div class="w-full flex justify-end mb-4 fade-in">
            <div class="max-w-[85%] flex flex-col items-end">
                <div class="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-br-none shadow-md text-sm leading-relaxed border border-blue-500 relative">
                    ${text}
                </div>
                <span class="text-[10px] text-slate-500 mr-1 mt-0.5">Gelesen</span>
            </div>
        </div>`;
        
        // --- REM ITEM SOFORT ENTFERNEN ---
        if (remId) {
            let itemIndex = this.state.inventory.findIndex(i => i.id === remId);
            if (itemIndex > -1) {
                let itemName = DB.items[remId] ? DB.items[remId].name : remId;
                this.state.inventory.splice(itemIndex, 1);
                this.log(`Verloren: ${itemName}`, "text-orange-400");
                this.updateUI(); // Inventar sofort in der UI aktualisieren
            }
        }
        // -----------------------------------------------
        
        setTimeout(() => {
        content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
        }, 50);

        let ev = this.state.currentPhoneEvent;
        let validNext = (ev.results && ev.results[nextId]) || (ev.nodes && ev.nodes[nextId]);
        
        if (!validNext) {
            console.error("Missing Node:", nextId);
            content.innerHTML += `<div class="text-center text-xs text-red-500 my-2">- Verbindung abgebrochen -</div>`;
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

        // --- Floating Text für Phone ---
        if (finalF !== 0) this.showFloatingText('val-fl', finalF);
        if (finalA !== 0) this.showFloatingText('val-al', finalA);
        if (finalC !== 0) this.showFloatingText('val-cr', finalC);
        // ------------------------------------
        
        this.triggerShake(finalA, finalC);
        
        // --- REPUTATION LOGIK FÜR PHONE ---
        if (res.rep) {
            let changed = false;
            for (let [charName, val] of Object.entries(res.rep)) {
                // Sicherstellen, dass der Charakter existiert
                if (this.state.reputation[charName] === undefined) {
                    this.state.reputation[charName] = 0;
                }
                
                // Ruf addieren/abziehen
                this.state.reputation[charName] += val;
                
                // Auf -100 bis +100 begrenzen
                this.state.reputation[charName] = Math.max(-100, Math.min(100, this.state.reputation[charName]));
                changed = true;
            }
            
            // Sofort speichern, wenn sich etwas geändert hat
            if (changed) {
                this.saveSystem();
            }
        }
        
        // --- STORY FLAG FÜR PHONE SETZEN ---
        if (res.next && res.next !== "") {
            this.state.storyFlags[res.next] = true;
        }
        // -----------------------------------
        
        // --- FAST CHAT LOGIK FÜR FALL A ---
            let typingTime = this.state.fastChat ? 0 : 1500;
            let readTime = this.state.fastChat ? 3000 : 4500;
            const loadingId = "typing-" + Date.now();

            // Nur rendern, wenn FastChat AUS ist
            if (!this.state.fastChat) {
                content.innerHTML += `
                <div id="${loadingId}" class="w-full flex justify-start mb-2 fade-in">
                    <div class="bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-none ml-10 flex items-center gap-1 h-10 w-16">
                         <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                         <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                         <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                </div>`;
                setTimeout(() => {
                    content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
                }, 50);
            }

            // Timer (entweder 0 oder 1.5s)
            if (this.state.phoneTypeTimer) clearTimeout(this.state.phoneTypeTimer);
            this.state.phoneTypeTimer = setTimeout(() => {
                const loader = document.getElementById(loadingId);
                if(loader) loader.remove();

                // System Nachricht (Grau, Zentriert)
                content.innerHTML += `
                <div class="w-full flex justify-center my-4 fade-in">
                    <div class="bg-slate-800/80 text-slate-400 px-3 py-1 rounded-full text-xs border border-slate-700 shadow-sm">
                        ${res.txt}
                    </div>
                </div>`;
                setTimeout(() => {
                    content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
                }, 50);

                if (this.state.phoneReadTimer) clearTimeout(this.state.phoneReadTimer);
                this.state.phoneReadTimer = setTimeout(() => {
                    this.closePhone();
                    this.log("Handy: " + res.txt);
                    this.state.time += 15; 
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
        // FALL B: GESPRÄCH GEHT WEITER (Next Node)
        else if (ev.nodes[nextId]) {
            
            const loadingId = "typing-" + Date.now();
            
            // --- FAST CHAT LOGIK FÜR FALL B ---
            if (!this.state.fastChat) {
                content.innerHTML += `
                <div id="${loadingId}" class="w-full flex justify-start mb-2 fade-in">
                    <div class="bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-none ml-10 flex items-center gap-1 h-10 w-16">
                         <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                         <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                         <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    </div>
                </div>`;
                setTimeout(() => {
                    content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
                }, 50);
            }

            // Wenn FastChat an ist -> 0 Millisekunden. Sonst -> 1.5 bis 2.5 Sekunden
            let typingDuration = this.state.fastChat ? 0 : (1500 + Math.random() * 1000);

            if (this.state.phoneTypeTimer) clearTimeout(this.state.phoneTypeTimer);
            this.state.phoneTypeTimer = setTimeout(() => {
                const loader = document.getElementById(loadingId);
                if(loader) loader.remove();
                this.renderPhoneNode(ev.nodes[nextId]);
            }, typingDuration);
        }
    },

    closePhone: function() {
        document.getElementById('phone-app').classList.add('hidden');
        document.getElementById('phone-app').classList.remove('flex');
        document.getElementById('phone-standby').classList.remove('hidden');
        
        // --- Event leeren und Sichtbarkeit prüfen ---
        this.state.currentPhoneEvent = null; 
        this.updatePhoneVisibility();
    },

};
