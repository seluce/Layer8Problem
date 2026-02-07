const engine = {
    state: {
        time: 8 * 60,
        fl: 0, al: 0, cr: 0,
        tickets: 0,
        inventory: [], 
        warningReceived: false,
        activeEvent: null,
        currentPhoneEvent: null,
        usedIDs: new Set(),
        lunchDone: false,
        bossTimer: null,
        ticketWarning: false,
      
        // Schwierigkeitsgrad (Standard 1.0)
        difficultyMult: 1.0, 

        // Stats & System
        achievements: [],
        achievedTitles: [],
        coffeeConsumed: 0,
		spamClicked: 0,
		emailsIgnored: 0,

        // E-Mail System
		emailTimer: null,
        usedEmails: new Set(),
		isEmailOpen: false,
		emailPending: false,
		
        // Story-Entscheidungen
        storyFlags: {},
		
		// Speichert das Ende, damit wir es verzögert anzeigen können
        pendingEnd: null,

        // Aktive Items
        lastStressballTime: -100,

        // Dauerhaftes Archiv
        archive: {
            items: [],
            achievements: [],
            achievementDiffs: {}
        }
    },

    init: function() {
        this.loadSystem();
        document.getElementById('intro-modal').style.display = 'flex';
        this.updateUI();
        this.log("System v1.1.2 geladen. Warte auf User...");
    },

    // --- PERSISTENZ (Speichern & Laden) ---
    loadSystem: function() {
        const data = localStorage.getItem('layer8_archive');
        if(data) {
            try {
                this.state.archive = JSON.parse(data);
                // Fallback falls Struktur leer war
                if(!this.state.archive.items) this.state.archive.items = [];
                if(!this.state.archive.achievements) this.state.archive.achievements = [];
            } catch(e) { console.error("Savegame Error", e); }
        }
    },

    saveSystem: function() {
        localStorage.setItem('layer8_archive', JSON.stringify(this.state.archive));
    },

    addToArchive: function(type, id) {
        if(!this.state.archive[type].includes(id)) {
            this.state.archive[type].push(id);
            this.saveSystem(); 
        }
    },

// --- ARCHIV UI (Sammelalbum) ---
    openArchive: function() {
        const modal = document.getElementById('archive-modal');
        const content = document.getElementById('archive-content');
        
        // Modal anzeigen
        modal.classList.remove('hidden');
        modal.classList.add('flex');

        // 1. STATISTIK BERECHNEN
        const totalItems = Object.keys(DB.items).length;
        const foundItems = this.state.archive.items.length;
        const totalAchs = DB.achievements.length;
        const unlockedAchs = this.state.archive.achievements.length;

        const statItems = document.getElementById('stats-items');
        const statAchs = document.getElementById('stats-achs');
        if(statItems) statItems.innerText = `${foundItems} / ${totalItems}`;
        if(statAchs) statAchs.innerText = `${unlockedAchs} / ${totalAchs}`;

        // 2. ITEMS SORTIEREN
        let normalItems = [];
        let questItems = [];

        for (const [id, item] of Object.entries(DB.items)) {
            if (item.quest) {
                questItems.push({id, item});
            } else {
                normalItems.push({id, item});
            }
        }

        // 3. INHALT RENDERN
        let html = '';

        // --- A) NORMALE ITEMS ---
        html += `<div class="mb-8"><h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">📦 GEFUNDENE AUSRÜSTUNG</h3>`;
        html += `<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">`;
        
        normalItems.forEach(({id, item}) => {
            const unlocked = this.state.archive.items.includes(id);
            
            // Design: Identisch zu Erfolgen (1px Border, dashed bei leer)
            let borderClass = unlocked 
                ? 'border-slate-500/50 text-slate-200 bg-slate-800' 
                : 'border-slate-700 opacity-50 text-slate-600 bg-slate-900 border-dashed'; 
            
            // WICHTIG: Hier stand vorher "border-2". Jetzt nur noch "border" für feine Linien.
            html += `
                <div class="aspect-square rounded border ${borderClass} flex items-center justify-center text-xl cursor-help transition-all relative group" title="${unlocked ? item.name : 'Unbekannt' }">
                    ${unlocked ? item.icon : '?'}
                </div>`;
        });
        html += `</div></div>`;

        // --- B) LEGENDÄRE TROPHÄEN ---
        if (questItems.length > 0) {
            html += `<div class="mb-8"><h3 class="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">🏆 LEGENDÄRE TROPHÄEN</h3>`;
            html += `<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">`;
            
            questItems.forEach(({id, item}) => {
                const unlocked = this.state.archive.items.includes(id);
                
                let borderClass = unlocked 
                    ? 'border-amber-500/50 text-amber-100 bg-amber-900/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
                    : 'border-slate-700 opacity-50 text-slate-600 bg-slate-900 border-dashed';

                // Auch hier: "border" statt "border-2"
                html += `
                    <div class="aspect-square rounded border ${borderClass} flex items-center justify-center text-xl cursor-help transition-all relative group" title="${unlocked ? item.name : '???' }">
                        ${unlocked ? item.icon : '?'}
                    </div>`;
            });
            html += `</div></div>`;
        }

        // --- C) ERFOLGE ---
        html += `<h3 class="text-xs font-bold text-purple-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">🏅 ERRUNGENSCHAFTEN</h3>`;
        html += `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">`;

        if(DB.achievements) {
            DB.achievements.forEach(ach => {
                const unlocked = this.state.archive.achievements.includes(ach.id);
                
                // Schwierigkeit auslesen
                let diff = "none";
                if (this.state.archive.achievementDiffs) {
                    diff = this.state.archive.achievementDiffs[ach.id] || "easy";
                }

                // VARIABLEN VORBEREITEN
                let borderClass = "";
                let bgClass = "";
                let badge = "";
                let icon = ach.icon;   // Wir zeigen IMMER das Icon
                let title = ach.title; // Wir zeigen IMMER den Titel
                let desc = "";         // Text ist dynamisch

                if (unlocked) {
                    // --- ZUSTAND: FREIGESCHALTET ---
                    desc = ach.desc; // Belohnungs-Text
                    borderClass = "opacity-100 border-solid"; 
                    bgClass = "bg-slate-900/40";

                    // Farb-Codierung nach Schwierigkeit
                    if (diff === 'hard') {
                        borderClass += " border-red-500/50 bg-red-900/10 shadow-[0_0_10px_rgba(239,68,68,0.1)]"; 
                        badge = '<span class="text-[9px] text-red-400 font-bold border border-red-500/30 px-1.5 rounded ml-auto bg-red-950/30">SCHWER</span>';
                    } else if (diff === 'normal') {
                        borderClass += " border-blue-500/50 bg-blue-900/10"; 
                        badge = '<span class="text-[9px] text-blue-400 font-bold border border-blue-500/30 px-1.5 rounded ml-auto bg-blue-950/30">MITTEL</span>';
                    } else {
                        borderClass += " border-green-500/50 bg-green-900/10"; 
                        badge = '<span class="text-[9px] text-green-400 font-bold border border-green-500/30 px-1.5 rounded ml-auto bg-green-950/30">EINFACH</span>';
                    }

                } else {
                    // --- ZUSTAND: GESPERRT (HINT) ---
                    // Hier nutzen wir den neuen Hint-Text aus der data.js
                    desc = ach.hint ? ach.hint : "???";
                    
                    // Design: Grayscale (Schwarz-Weiß), gestrichelt, etwas transparenter
                    borderClass = "border-slate-700 opacity-60 border-dashed grayscale"; 
                    bgClass = "bg-slate-950/30";
                    
                    // Badge für "Gesperrt"
                    badge = '<span class="text-[9px] text-slate-500 font-bold border border-slate-700 px-1.5 rounded ml-auto">LOCKED</span>';
                }

                // --- RENDERING ---
                html += `
                    <div class="flex gap-3 p-3 rounded border ${borderClass} ${bgClass} transition-all hover:bg-slate-800 group relative overflow-hidden">
                        
                        <div class="text-2xl shrink-0 group-hover:scale-110 transition-transform flex items-center justify-center w-10 h-10 bg-slate-900 rounded-full border border-slate-700/50">
                            ${icon}
                        </div>
                        
                        <div class="flex-1 min-w-0 flex flex-col justify-center">
                            <div class="flex items-center gap-2 mb-0.5">
                                <div class="font-bold text-xs truncate ${unlocked ? 'text-white' : 'text-slate-400'}">${title}</div>
                                ${badge}
                            </div>
                            <div class="text-[10px] ${unlocked ? 'text-slate-400' : 'text-slate-500 italic'} leading-tight line-clamp-2">
                                ${desc}
                            </div>
                        </div>
                    </div>
                `;
            });
        }
        html += `</div>`;
        content.innerHTML = html;
    },

    closeArchive: function() {
        document.getElementById('archive-modal').classList.add('hidden');
        document.getElementById('archive-modal').classList.remove('flex');
    },

    // Startet nicht mehr das Spiel, sondern zeigt die Auswahl
    start: function() {
        document.getElementById('intro-modal').style.display = 'none';
        // Wir gehen davon aus, dass das Modal in index.html existiert (id="difficulty-modal")
        const diffModal = document.getElementById('difficulty-modal');
        if(diffModal) {
            diffModal.style.display = 'flex';
        } else {
            // Fallback falls HTML noch nicht aktualisiert wurde
            this.setDifficulty('normal');
        }
    },

// Setzt Schwierigkeit und startet dann erst den Loop (oder das Tutorial)
    setDifficulty: function(level) {
        document.getElementById('difficulty-modal').style.display = 'none';
        
        if (level === 'easy') {
            this.state.difficultyMult = 0.8;
            this.log("Modus: FREITAG. Entspann dich.", "text-green-400");
        } else if (level === 'normal') {
            this.state.difficultyMult = 1.0;
            this.log("Modus: MITTWOCH. Business as usual.", "text-blue-400");
        } else if (level === 'hard') {
            this.state.difficultyMult = 1.25;
            this.state.tickets = 2;
            this.state.al = 0;
            this.log("Modus: MONTAG. Viel Glück.", "text-red-500 font-bold");
        }
        
        this.updateUI();

        // Tutorial starten (Verzögert, damit UI fertig gerendert ist)
        setTimeout(() => {
            if (typeof tutorial !== 'undefined') {
                // Wir versuchen, das Tutorial zu starten.
                // Die start()-Funktion prüft selbst den LocalStorage.
                tutorial.start();
                
                // JETZT prüfen wir: Läuft das Tutorial gerade?
                // Falls NEIN (weil schon gesehen oder übersprungen), starten wir das Spiel sofort.
                if (!tutorial.isActive) {
                    this.checkRandomEmail();
                }
                // Falls JA (isActive == true), macht diese Funktion hier nichts mehr.
                // Das Spiel wird dann später von tutorial.finish() gestartet.
            } else {
                // Fallback: Falls die tutorial.js fehlt, Spiel einfach starten
                this.checkRandomEmail();
            }
        }, 500);
    },

    // --- E-MAIL SYSTEM (Clean Light / Logik Fixes) ---

    checkRandomEmail: function() {
        // 1. Grund-Checks (Offen? Unterwegs? Tutorial?)
        if(this.state.isEmailOpen || this.state.emailPending) return; // <--- Auch prüfen ob Pending!
        if(typeof tutorial !== 'undefined' && tutorial.isActive) return;

        // --- ID-BASIERTE PRÜFUNG (WHITELIST & BLACKLIST) ---
        // Wir holen uns die ID des aktuellen Events (z.B. "srv_fire" oder "boss_hack")
        const id = this.state.currentEventId || "";

        // A) WHITELIST: Nur erlauben, wenn die ID eines dieser Kürzel enthält
        // call = Anrufe, srv_ = Server, cof_ = Kaffee, sq_ = Sidequest
        const isAllowed = id.includes('srv_') || 
                          id.includes('cof_') || 
                          id.includes('sq_')  || 
                          id.includes('call_');

        if (!isAllowed) return; // Abbruch, wenn es kein Standard-Event ist

        // B) BLACKLIST: Spezielle Situationen blockieren
        if (id.includes('boss')) return;
        if (id.includes('lunch')) return;

        // 3. SPAM-SCHUTZ (Letztes Event)
        if (this.state.lastEmailEventId === this.state.currentEventId) return;

        // 4. Wahrscheinlichkeit
        let baseChance = 0.2 * this.state.difficultyMult; 
        let chance = baseChance + (this.state.tickets * 0.05); 
        
        if(Math.random() < chance) {
            this.state.lastEmailEventId = this.state.currentEventId;
            
            // FIX: Sofort blockieren!
            this.state.emailPending = true; 
            
            setTimeout(() => { 
                this.triggerEmail(); 
                // Pending wird in triggerEmail (oder bei Fehler) wieder false gesetzt
            }, 2000);
        }
    },

    // Öffnet das E-Mail Overlay
    triggerEmail: function(forcedId = null) {
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

        // --- NEU: Dynamisches CC (Humor) ---
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
            email.opts.forEach(opt => {
                const btn = document.createElement('button');
                btn.type = "button"; 
                btn.className = "w-full text-left px-3 py-2 bg-slate-800 hover:bg-blue-900/30 border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-blue-300 rounded transition-colors flex items-center group font-medium text-xs";
                
                btn.innerHTML = `
                    <span class="mr-2 text-slate-500 group-hover:text-blue-400 transition-colors duration-75 text-base">➥</span>
                    <span>${opt.btn}</span>
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
        
        // 6. TIMER
        const timerBar = document.getElementById('email-timer-bar');
        const DURATION = 15000; 
        
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
        if(this.state.emailTimer) clearTimeout(this.state.emailTimer);
        
        const modal = document.getElementById('email-modal');
        if(modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
        this.state.isEmailOpen = false;

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
            message = `Gesendet: "${opt.btn}"`;
            color = "text-blue-400";
            
            let mult = this.state.difficultyMult;
            if(opt.f) this.state.fl += opt.f;
            if(opt.a) this.state.al += Math.ceil(opt.a * mult);
            if(opt.c) this.state.cr += Math.ceil(opt.c * mult);

            if(opt.txt) {
                setTimeout(() => this.log(`Re: ${opt.txt}`, "text-slate-400 italic"), 500);
            }

            if (opt.nextEmail) {
                // Bei Ketten-Mails erlauben wir sofort die nächste,
                // auch wenn wir "1 Mail pro Event" haben.
                // Dafür setzen wir lastEmailEventId kurz zurück oder nutzen forcedId logic.
                setTimeout(() => {
                    this.triggerEmail(opt.nextEmail);
                }, 2500);
            }
        }
        
        this.log(message, color);
        this.updateUI();
        if (this.state.pendingEnd) this.finishGame();
    },

    // --- CORE ---
updateUI: function() {
        this.state.fl = Math.max(0, Math.min(100, this.state.fl));
        this.state.al = Math.max(0, Math.min(100, this.state.al));
        this.state.cr = Math.max(0, Math.min(100, this.state.cr));
        this.state.tickets = Math.max(0, this.state.tickets);

        let h = Math.floor(this.state.time / 60);
        let m = this.state.time % 60;
        let timeStr = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
        document.getElementById('clock').innerText = timeStr;
        document.getElementById('phone-clock').innerText = timeStr;

        document.getElementById('val-fl').innerText = this.state.fl + "%";
        document.getElementById('bar-fl').style.width = this.state.fl + "%";
        document.getElementById('val-al').innerText = this.state.al + "%";
        document.getElementById('bar-al').style.width = this.state.al + "%";
        document.getElementById('val-cr').innerText = this.state.cr + "%";
        document.getElementById('bar-cr').style.width = this.state.cr + "%";

        const tEl = document.getElementById('ticket-count');
        tEl.innerText = this.state.tickets;
        tEl.className = this.state.tickets > 7 ? "text-4xl font-black text-white ticket-counter ticket-pulse" : "text-4xl font-black text-white ticket-counter";

        // --- INVENTAR UPDATE (Hauptansicht / Mini-Slots) ---
        const invGrid = document.getElementById('inventory-grid');
        const invBadge = document.getElementById('inv-badge');
        invGrid.innerHTML = '';
        
        // 1. Filtere Quest-Items für die Mini-Ansicht RAUS
        let visibleItems = this.state.inventory.filter(i => {
            let dbItem = DB.items[i.id];
            return dbItem && !dbItem.quest; 
        });

        // Zeige die ersten 5 der SICHTBAREN Items
        for(let i=0; i < 5; i++) {
            let itemData = visibleItems[i]; 
            let slot = document.createElement('div');
            
            if(itemData) {
                let dbItem = DB.items[itemData.id];
                slot.className = 'inv-slot relative group'; 
                slot.innerText = dbItem ? dbItem.icon : '?';
                slot.title = dbItem ? dbItem.name : 'Unbekannt';

                // --- SPEZIAL LOGIK ---
                if (itemData.id === 'stressball') {
                    let isReady = (this.state.time - this.state.lastStressballTime >= 60);
                    if(isReady) {
                        slot.className += ' cursor-pointer border-green-500 hover:bg-green-900/20';
                        slot.innerHTML += `<div class="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>`;
                        slot.onclick = () => this.askUseItem('stressball');
                        slot.title += " (Benutzen)";
                    } else {
                        let wait = 60 - (this.state.time - this.state.lastStressballTime);
                        slot.innerHTML += `<div class="absolute inset-0 bg-slate-900/70 rounded flex items-center justify-center z-10 backdrop-blur-[1px]"><span class="font-bold text-white text-xs select-none">${wait}</span></div>`;
                        // HIER IST DEIN ORIGINAL TEXT:
                        slot.onclick = () => this.log(`Der Ball ist noch völlig plattgedrückt. Gib ihm Zeit, sich zu entfalten. (${wait} Min)`, "text-slate-500");
                    }
                }
                else if (itemData.id === 'energy' || itemData.id === 'donut') {
                    slot.className += ' cursor-pointer border-blue-500 hover:bg-blue-900/20';
                    slot.onclick = () => this.askUseItem(itemData.id);
                }
                else {
                    slot.onclick = () => this.openInventory();
                }

            } else {
                slot.className = 'inv-slot empty';
            }
            invGrid.appendChild(slot);
        }

        if(visibleItems.length > 5) {
            let diff = visibleItems.length - 5;
            invBadge.innerText = `+${diff}`;
            invBadge.classList.remove('hidden');
        } else {
            invBadge.classList.add('hidden');
        }

        this.checkAchievements();
        this.checkEndConditions();
    },

checkAchievements: function() {
        // --- PLAYSTYLE: EXTREME ---
        
        // 1. DER ASKET (Kein Kaffee) - Ab 16:00
        // Belohnt das Aushalten von Aggro ohne Hilfsmittel
        if(this.state.time > 16*60 && this.state.coffeeConsumed === 0 && !this.hasAch('ach_ascetic')) {
            this.unlockAchievement('ach_ascetic', '🧘 Der Asket', '16 Uhr und kein Tropfen Kaffee. Du bestehst aus purer Willenskraft.');
        }

        // 2. KOFFEIN-SCHOCK (Zu viel Kaffee)
        // Erhöht auf 8 -> Man muss fast jede Stunde zur Maschine rennen
        if(this.state.coffeeConsumed >= 8 && !this.hasAch('ach_coffee')) {
            this.unlockAchievement('ach_coffee', '🫀 Herzrasen', '8 Tassen. Du kannst Farben hören und die Zeit anhalten.');
        }

        // 3. GHOSTING (Mails ignorieren)
        // Erhöht auf 5 -> Das ist richtig gefährlich für den Radar-Wert
        if(this.state.emailsIgnored >= 5 && !this.hasAch('ach_ignore')) {
            this.unlockAchievement('ach_ignore', '👻 Ghosting-Profi', '5 Mails ignoriert. Deine "Entf"-Taste glüht.');
        }

        // 4. SCHWARZES LOCH (Volles Inventar)
        // Erhöht auf 8 -> Man muss alles mitnehmen, auch Müll
        if(this.state.inventory.length >= 8 && !this.hasAch('ach_hoarder')) {
            this.unlockAchievement('ach_hoarder', '🛒 Loot-Goblin', 'Dein Rucksack platzt. Brauchst du den alten Donut wirklich noch?');
        }

        // --- STATS STATUS ---
        if(this.state.fl >= 80 && this.state.fl < 100 && !this.hasAch('ach_lazy')) {
            this.unlockAchievement('ach_lazy', '🦥 Faulpelz', '80% Faulheit. Du hast das Nichtstun zur Kunstform erhoben.');
        }
        
        if (this.state.al >= 95 && !this.hasAch('ach_rage')) { // Auf 95% erhöht -> Riskanter
            this.unlockAchievement('ach_rage', '🤬 180 Puls', 'Nur noch ein dummer Anruf und es knallt. (95% Aggro)');
        }

        // --- ITEM SETS  ---
        
        // MACGYVER (Prüfe: Tape, Schraubendreher, Kabel, Handbuch)
        const tools = ['tape', 'screw', 'kabel', 'manual'];
        const hasAllTools = tools.every(toolId => this.state.inventory.find(i => i.id === toolId));
        if(hasAllTools && !this.hasAch('ach_macgyver')) {
            this.unlockAchievement('ach_macgyver', '🛠️ MacGyver', 'Tape, Kabel, Schrauber & Handbuch. Du brauchst keine IT, du brauchst Kaugummi.');
        }
        
        // MILLIONÄR
        if(this.state.inventory.find(i => i.id === 'black_card') && !this.hasAch('ach_rich')) {
            this.unlockAchievement('ach_rich', '💸 Der Millionär', 'Du hast dem Prinzen vertraut. Kündigung ist raus!');
        }
        
        // MR ROBOT
        if(this.state.inventory.find(i => i.id === 'admin_pw') && !this.hasAch('ach_hacker')) {
            this.unlockAchievement('ach_hacker', '💻 Mr. Robot', 'Root-Rechte. Jetzt gehört das Netzwerk dir.');
        }

        if(this.state.inventory.find(i => i.id === 'contract') && !this.hasAch('ach_wolf')) {
            this.unlockAchievement('ach_wolf', '📈 Wolf of Wall Street', 'Du hast den Chef besiegt. 500€ mehr Gehalt!');
        }

        // --- END GAME CHALLENGES (Zeitabhängig) ---
        
        // NINJA (Heimlich faul) - Ab 14:00
        if(this.state.time > 14*60 && this.state.cr < 10 && !this.hasAch('ach_ninja')) {
            this.unlockAchievement('ach_ninja', '🥷 Ninja', 'Fast unsichtbar für den Chef.');
        }

        // ZEN MEISTER (Keine Wut) - Ab 15:00
        if(this.state.time >= 15*60 && this.state.al === 0 && !this.hasAch('ach_zen')) {
            this.unlockAchievement('ach_zen', '🕊️ Zen-Meister', '15 Uhr und die Ruhe selbst. Bist du überhaupt wach?');
        }

        // MITARBEITER DES MONATS (Anti-Faul) - Ab 16:00
        if (this.state.time > 16*60 && this.state.fl <= 5 && !this.hasAch('ach_workaholic')) {
            this.unlockAchievement('ach_workaholic', '👔 Streber', 'Du hast tatsächlich gearbeitet? Du machst uns anderen schlecht!');
        }

        // Man hat genau 9 Tickets (Limit ist 10). Ein Anruf mehr und Game Over.
        if (this.state.time >= 975 && this.state.tickets === 9 && !this.hasAch('ach_risk')) {
            this.unlockAchievement('ach_risk', '🎢 Drahtseilakt', 'Feierabend mit 9 offenen Tickets. Das war verdammt knapp.');
        }

        // INBOX ZERO - Ab 16:20
        if (this.state.time >= 980 && this.state.tickets === 0 && !this.hasAch('ach_clean')) {
            this.unlockAchievement('ach_clean', '✨ Inbox Zero', 'Alle Tickets erledigt? Das System glaubt, es ist ein Fehler.');
        }

        // TANZ AUF DEM VULKAN (High Risk Survival) - Ab 16:20
        if (this.state.time >= 980 && this.state.al >= 90 && this.state.cr >= 90 && !this.hasAch('ach_survivor')) {
            this.unlockAchievement('ach_survivor', '🌋 Tanz auf dem Vulkan', 'Maximaler Stress kurz vor Feierabend. Du brauchst Urlaub.');
        }
        
        // CHARACTER QUESTS
        if(this.state.inventory.find(i => i.id === 'kevin_ram') && !this.hasAch('ach_mentor')) {
            this.unlockAchievement('ach_mentor', '👨‍👦 Der Mentor', 'Du hast Kevin gerettet. Er wird es nie vergessen (leider).');
        }

        if(this.state.inventory.find(i => i.id === 'golden_stapler') && !this.hasAch('ach_ally')) {
            this.unlockAchievement('ach_ally', 'Marketing-Allianz', 'Du und Chantal: Ein tödliches Team.');
        }

        if(this.state.inventory.find(i => i.id === 'master_key') && !this.hasAch('ach_keymaster')) {
            this.unlockAchievement('ach_keymaster', 'Keymaster', 'Egon vertraut dir blind.');
        }

        if(this.state.inventory.find(i => i.id === 'mixtape') && !this.hasAch('ach_rockstar')) {
            this.unlockAchievement('ach_rockstar', 'Metal Queen', 'Laut, schnell und loyal.');
        }

        if(this.state.inventory.find(i => i.id === 'scotch_bottle') && !this.hasAch('ach_closer')) {
            this.unlockAchievement('ach_closer', 'The Closer', 'Markus und du: Ein profitables Team.');
        }

        if(this.state.inventory.find(i => i.id === 'cat_pic') && !this.hasAch('ach_cat_whisperer')) {
            this.unlockAchievement('ach_cat_whisperer', 'Katzenflüsterer', 'Rüdiger mag dich. Frau Elster auch.');
        }

        if(this.state.inventory.find(i => i.id === 'corp_chronicles') && !this.hasAch('ach_lore')) {
            this.unlockAchievement('ach_lore', 'Der Historiker', 'Du kennst nun die Wahrheit. Manche Türen sollten besser geschlossen bleiben.');
        }
    },

    hasAch: function(id) { return this.state.achievements.includes(id); },

unlockAchievement: function(id, title, text) {
        // 1. Session-Check: Haben wir diesen Erfolg in DIESEM aktuellen Spiel schon?
        // Wenn ja -> Sofort abbrechen (verhindert Spam im Loop)
        if (this.state.achievements.includes(id)) {
            return;
        }

        // 2. Archiv-Check: Haben wir ihn früher schon mal geschafft? Und wenn ja, wie schwer?
        
        // Aktueller Schwierigkeitsgrad ermitteln (1=Easy, 2=Normal, 3=Hard)
        let currentDiffVal = 1;
        if (this.state.difficultyMult >= 1.0) currentDiffVal = 2; // Mittwoch
        if (this.state.difficultyMult >= 1.25) currentDiffVal = 3; // Montag

        // Gespeicherter Grad aus dem Archiv holen
        let savedDiffVal = 0; // 0 = Noch nie geschafft
        
        // Sicherheits-Check: Existiert das Archiv korrekt?
        if (this.state.archive && this.state.archive.achievements && this.state.archive.achievements.includes(id)) {
            let savedDiffName = "easy";
            // Prüfen ob wir die Schwierigkeit gespeichert haben
            if (this.state.archive.achievementDiffs) {
                savedDiffName = this.state.archive.achievementDiffs[id] || "easy";
            }
            
            // Text zu Zahl umwandeln für Vergleich
            if (savedDiffName === "normal") savedDiffVal = 2;
            else if (savedDiffName === "hard") savedDiffVal = 3;
            else savedDiffVal = 1; 
        }

        // ENTSCHEIDUNG: Nur Benachrichtigen, wenn NEU (0) oder BESSER als vorher
        let isNewOrBetter = (savedDiffVal === 0) || (currentDiffVal > savedDiffVal);

        // In die aktuelle Session aufnehmen (damit Check 1 beim nächsten Frame greift)
        this.state.achievements.push(id);
        this.state.achievedTitles.push(title);

        // NUR wenn es neu oder ein Upgrade ist: Feedback geben (Log & Toast)
        if (isNewOrBetter) {
            
            // Text für Log vorbereiten
            let logText = `ERFOLG FREIGESCHALTET: ${title}`;
            let logColor = "text-yellow-400 font-bold"; // Standard Gold
            let toastDesc = text;

            // Falls es ein Upgrade war (z.B. Easy -> Hard)
            if (savedDiffVal > 0) {
                const diffNames = ["", "FREITAG", "MITTWOCH", "MONTAG"];
                logText = `🏆 ERFOLG AUFGEWERTET: ${title} (${diffNames[currentDiffVal]})`;
                logColor = "text-purple-400 font-bold"; // Upgrade Lila
                toastDesc = `Upgrade auf ${diffNames[currentDiffVal]}!`;
            }

            // A. Log schreiben
            this.log(logText, logColor);

            // B. Toast anzeigen
            const container = document.getElementById('achievement-container');
            if(container) {
                const toast = document.createElement('div');
                toast.className = 'achievement-toast';
                toast.innerHTML = `<div class="ach-icon">🏆</div><div class="ach-text"><span class="ach-title">${title}</span><br><span class="ach-desc">${toastDesc}</span></div>`;
                container.appendChild(toast);
                
                // Nach 5 Sekunden entfernen
                setTimeout(() => { 
                    if(toast.parentNode) toast.remove(); 
                }, 5000);
            }
        }

        // 3. Im Hintergrund immer speichern (falls Upgrade nötig)
        this.saveAchievementToArchive(id, currentDiffVal);
    },

    // Hilfsfunktion zum Speichern mit Schwierigkeitsgrad
    saveAchievementToArchive: function(id, currentDiffVal) {
        // Sicherstellen, dass Strukturen existieren
        if (!this.state.archive.achievements) this.state.archive.achievements = [];
        if (!this.state.archive.achievementDiffs) this.state.archive.achievementDiffs = {};

        // Mapping Zahl -> Name
        let diffName = "easy";
        if (currentDiffVal === 2) diffName = "normal";
        if (currentDiffVal === 3) diffName = "hard";

        // Prüfen was gespeichert ist
        let savedDiffName = this.state.archive.achievementDiffs[id] || "none";
        let savedDiffVal = 0;
        if (savedDiffName === "easy") savedDiffVal = 1;
        if (savedDiffName === "normal") savedDiffVal = 2;
        if (savedDiffName === "hard") savedDiffVal = 3;

        // Speichern wenn neu oder besser
        if (!this.state.archive.achievements.includes(id) || currentDiffVal > savedDiffVal) {
            
            if (!this.state.archive.achievements.includes(id)) {
                this.state.archive.achievements.push(id);
            }
            
            this.state.archive.achievementDiffs[id] = diffName;
            this.saveSystem(); // LocalStorage Update
        }
    },

trigger: function(type) {
        if(this.state.activeEvent) return;
        if (type === 'sidequest') { this.handleSideQuest(); return; }
        // ... (Boss Logik bleibt) ...

        // NEUE FILTER LOGIK:
        let pool = DB[type].filter(ev => {
            // 1. Wurde Event schon benutzt?
            if (this.state.usedIDs.has(ev.id)) return false;
            
            // 2. Hat das Event eine Story-Voraussetzung?
            if (ev.reqStory && !this.state.storyFlags[ev.reqStory]) return false;
            
            return true;
        });

        if (pool.length === 0) { this.renderTerminal(DB.special.empty_pool, type); return; }
        
        let ev = pool[Math.floor(Math.random() * pool.length)];
        this.renderTerminal(ev, type);
    },

    triggerBossFight: function() {
        // Filtere alle Bosse, die noch nicht dran waren
        let pool = DB.bossfights.filter(ev => !this.state.usedIDs.has(ev.id));
        
        // Wenn alle Bosse besiegt sind, passiert nichts (oder man könnte pool = DB.bossfights machen für Reset)
        if(pool.length === 0) return; 
     
        // Zufälligen Boss aus dem verbleibenden Pool wählen
        let boss = pool[Math.floor(Math.random() * pool.length)]; 
        // ---------------------------

        this.state.activeEvent = true;
        this.state.usedIDs.add(boss.id);
        this.disableButtons(true);

        const term = document.getElementById('terminal-content');
        document.getElementById('boss-timer-container').style.display = 'block';
        document.getElementById('boss-timer-bar').style.width = '100%';
        this.renderEventHTML(boss, 'boss', term);

        let timeLeft = boss.timer;
        this.state.bossTimer = setInterval(() => {
            timeLeft--;
            const bar = document.getElementById('boss-timer-bar');
            if(bar) bar.style.width = (timeLeft / boss.timer * 100) + "%";
            
            if(timeLeft <= 0) {
                clearInterval(this.state.bossTimer);
                this.resolveBossFail(boss.fail);
            }
        }, 1000);
    },

    resolveBossFail: function(failData) {
        this.resolveTerminal(failData.r, failData.m, failData.f, failData.a, failData.c, null, null, 'boss');
        document.getElementById('boss-timer-container').style.display = 'none';
    },

    handleSideQuest: function() {
        if(!DB.sidequests) return; 

        let pool = DB.sidequests.filter(ev => {
            if (this.state.usedIDs.has(ev.id)) return false;
            if (ev.reqStory && !this.state.storyFlags[ev.reqStory]) return false;
            return true;
        });

        if (pool.length === 0) { this.log("Gerade nichts los."); return; }

        let ev = pool[Math.floor(Math.random() * pool.length)];

        if (ev.kind === 'phone') {
            this.state.activeEvent = true;
            this.state.currentPhoneEvent = ev;
            this.state.usedIDs.add(ev.id);
            this.disableButtons(true);
            
            // Notification anzeigen
            document.getElementById('phone-notification').classList.remove('hidden');
            document.getElementById('phone-notification').classList.add('flex');
            this.log("Handy: " + ev.title);
        } else {
            this.renderTerminal(ev, 'sidequest');
        }
    },

// --- TERMINAL & CALL SYSTEM (FINAL FIX) ---

    renderTerminal: function(ev, type) {
		// --- Event-Status für E-Mail-System speichern ---
        this.state.currentEventId = ev.id;     // Damit wir wissen: "Für dieses Event schon gemailt?"
        this.state.currentEventType = type;    // Damit wir wissen: "Ist das ein Bossfight?"
        // -----------------------------------------------------
		
        this.state.activeEvent = true;
        if(ev.id) this.state.usedIDs.add(ev.id); 
        this.disableButtons(true);

        const term = document.getElementById('terminal-content');
        
        // WICHTIG: Container-Styling für Zentrierung
        term.className = "flex-1 flex flex-col justify-center items-center py-3 w-full h-full";

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
            true // isChain = true
        );
    },

    // 2. ALTES SYSTEM (Einfache Events)
    renderEventHTML: function(ev, type, container) {
        container.innerHTML = this.buildEventHTML(
            type, 
            ev.title, 
            ev.text, 
            ev.opts, 
            false // isChain = false
        );
    },

    // 3. GEMEINSAMES HTML-TEMPLATE (Mit Farben & Zeit-Vorschau)
    buildEventHTML: function(type, title, text, opts, isChain) {
        
        // --- STYLE KONFIGURATION ---
        // Standard (z.B. Coffee, Special) = Amber/Gelb
        let color = 'text-amber-400';       
        let borderColor = 'border-amber-500';
        let icon = '⚡'; 

        // Spezifische Farben je nach Typ
        switch(type) {
            case 'calls': // ANRUFE (Blau)
                color = 'text-blue-400';
                borderColor = 'border-blue-500';
                icon = '📞';
                break;
            
            case 'boss': // BOSS (Rot)
                color = 'text-red-500';
                borderColor = 'border-red-500';
                icon = '🚨';
                break;
            
            case 'sidequest': // SIDE-QUEST (Lila)
                color = 'text-purple-400';
                borderColor = 'border-purple-500';
                icon = '🎲'; // Magische Kugel / Quest Icon
                break;
            
            case 'server': // SERVERRAUM (Grün)
                color = 'text-emerald-400';
                borderColor = 'border-emerald-500';
                icon = '💾'; // Laptop / Terminal
                break;

            case 'coffee': // KAFFEE (Amber, aber spezielles Icon)
                icon = '☕';
                break;
        }

        let html = `
            <div class="w-full max-w-2xl text-left fade-in bg-slate-900 border border-slate-700 p-4 md:p-6 rounded-xl shadow-2xl mx-auto">
                
                <div class="flex items-center gap-3 mb-4 md:mb-6 border-b border-slate-600 pb-3 md:pb-4">
                    <span class="text-3xl">${icon}</span>
                    <div class="flex flex-col">
                        <span class="${color} font-black uppercase tracking-widest text-sm">${type}</span>
                        <h2 class="text-2xl font-bold text-slate-100">${title}</h2>
                    </div>
                </div>
                
                <div class="bg-black/40 p-5 rounded-lg border-l-4 ${borderColor} mb-8">
                    <p class="italic text-slate-300 text-lg leading-relaxed font-serif">"${text}"</p>
                </div>

                <div class="space-y-2.5">
        `;

        if (opts) {
            opts.forEach(opt => {
                let locked = false;
                let reqText = "";

                // --- ZEIT VORSCHAU LOGIK ---
                let timeCost = opt.m || 0; 
                
                if (isChain && this.state.currentChainEvent && opt.next) {
                    const nextNode = this.state.currentChainEvent.results?.[opt.next];
                    if (nextNode && (nextNode.m || nextNode.min)) {
                        timeCost = nextNode.m || nextNode.min;
                    }
                    else if (this.state.currentChainEvent.nodes?.[opt.next]) {
                        timeCost = 0; 
                    }
                }

                // Item Check
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

                // STYLE
                let btnClass = "";
                let clickAction = "";
                let iconBtn = "";

                if (locked) {
                    btnClass = "w-full text-left p-2.5 rounded border border-red-900 bg-slate-950 text-slate-600 cursor-not-allowed flex justify-between items-center opacity-70";
                    iconBtn = "🔒";
                } else {
                    // Der Hover-Effekt und Text bleiben neutral (Slate/Weiß), 
                    // aber das kleine Icon (➤) nimmt die Farbe des Events an!
                    btnClass = "w-full text-left p-2.5 rounded border border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-slate-400 hover:text-white transition-all text-slate-200 font-bold shadow-md flex justify-between items-center group";
                    iconBtn = `<span class="${color} group-hover:text-white transition-colors">➤</span>`;
                    
                    if (isChain) {
                        clickAction = `onclick="engine.handleChainChoice('${opt.next}')"`;
                    } else {
                        let safeRes = opt.r ? opt.r.replace(/'/g, "\\'") : '';
                        clickAction = `onclick="engine.resolveTerminal('${safeRes}', ${opt.m||0}, ${opt.f||0}, ${opt.a||0}, ${opt.c||0}, '${opt.loot||''}', '${opt.req||''}', '${type}', '${opt.next||''}')"`;
                    }
                }

                // ZEIT BADGE
                let badgeHTML = "";
                if (timeCost > 0) {
                    let badgeColor = timeCost >= 30 ? "text-red-400 bg-red-900/30 border-red-900/50" : "text-slate-400 bg-black/30 border-slate-700";
                    badgeHTML = `<span class="text-xs ${badgeColor} border px-2 py-1 rounded ml-3 font-mono whitespace-nowrap">-${timeCost} min</span>`;
                } else if (isChain && !locked && !opt.next.startsWith('res_')) {
                     badgeHTML = `<span class="text-xs text-blue-400 bg-blue-900/20 border border-blue-900/50 px-2 py-1 rounded ml-3 font-mono">...</span>`;
                }

                let warningSpan = locked ? `<span class="text-sm text-red-500 font-normal ml-2">${reqText}</span>` : "";

                html += `
                <button class="${btnClass}" ${clickAction} ${locked ? 'disabled' : ''}>
                    <div class="flex items-center">
                        <span class="mr-3 text-xl">${iconBtn}</span>
                        <span>${opt.t} ${warningSpan}</span>
                    </div>
                    ${badgeHTML}
                </button>`;
            });
        }
        
        html += `</div></div>`;
        return html;
    },

    // NEU: Logik für die Auswahl in Call-Ketten
    handleChainChoice: function(nextId) {
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
                res.next || null
            );
            this.state.currentChainEvent = null;
            return;
        }

        console.error("Chain Error: Ziel nicht gefunden", nextId);
        this.resolveTerminal("Verbindung unterbrochen.", 0, 0, 0, 0, null, null, "calls", null);
    },

resolveTerminal: function(res, m, f, a, c, loot, usedItem, type, next) {
        if(type === 'coffee') this.state.coffeeConsumed++;

        // Zeit & Tickets
        let oldTimeChunk = Math.floor(this.state.time / 30);
        let newTimeChunk = Math.floor((this.state.time + m) / 30);
        let newTickets = newTimeChunk - oldTimeChunk;
        this.state.tickets += newTickets;
        
        if (type === 'calls') { 
            this.state.tickets = Math.max(0, this.state.tickets - 1);
        }

        this.state.time += m;
        
        // Lunch Check
        let triggerLunch = false;
        if (!this.state.lunchDone && this.state.time >= 12 * 60) {
            triggerLunch = true;
            this.state.lunchDone = true;
        }

        // --- SCHWIERIGKEIT & FAULHEIT LOGIK ---
        
        // 1. Schwierigkeitsgrad (0.8 / 1.0 / 1.5)
        let diffMult = this.state.difficultyMult;

        // 2. Faulheits-Faktor (Risk vs Reward)
        // Formel: 1 + (Faulheit / 100)
        let lazyMult = 1 + (this.state.fl / 200);

        // Werte berechnen
        this.state.fl += f;

        // Aggro: Wird nur durch Schwierigkeit beeinflusst
        let finalA = a > 0 ? Math.ceil(a * diffMult) : a;
        this.state.al += finalA;

        // RADAR: Hier greift die Faulheit (Silent Mechanic)
        let finalC = c;

        if (c > 0) {
            // Strafe = Basis * Schwierigkeit * Faulheit
            // Wir berechnen den Schaden still im Hintergrund
            finalC = Math.ceil(c * diffMult * lazyMult);
        } else {
            // Bei Radar-Bonus (c < 0) hilft Faulheit nicht
            finalC = c; 
        }

        this.state.cr += finalC;
        // ---------------------------------------

        // Story Flag setzen
        if (next && next !== "") {
            this.state.storyFlags[next] = true;
        }

        // Items Logic
        if(loot && loot !== "") {
            if(!this.state.inventory.find(i => i.id === loot)) {
                this.state.inventory.push({ id: loot, used: false });
                this.addToArchive('items', loot);
                this.log(`ITEM: ${DB.items[loot].name}`, "text-yellow-400");
            }
        }
        if(usedItem && usedItem !== "") {
            let itemObj = this.state.inventory.find(i => i.id === usedItem);
            let dbItem = DB.items[usedItem];
            if(itemObj) {
                if (!dbItem || !dbItem.keep) {
                    this.state.inventory = this.state.inventory.filter(i => i !== itemObj);
                }
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
            btnAction = "engine.finishGame()";
            if (this.state.pendingEnd.isWin) {
                btnText = "FEIERABEND MACHEN 🎉";
                btnColor = "bg-green-600 hover:bg-green-500";
            } else {
                btnText = "DAS WAR'S... (GAME OVER)";
                btnColor = "bg-red-600 hover:bg-red-500";
            }
        }

        // BEREINIGT: Kein penaltyInfo mehr im HTML String
        term.innerHTML = `
            <div class="w-full max-w-xl text-left fade-in flex flex-col h-full justify-center">
                <div class="bg-slate-800 p-6 rounded-xl border border-slate-600 mb-8">
                    <h3 class="font-bold text-white mb-2 uppercase text-xs tracking-widest text-emerald-500">Ergebnis</h3>
                    <p class="text-slate-300 italic text-lg leading-relaxed">"${res}"</p>
                </div>
                <button onclick="${btnAction}" class="${btnColor} text-white w-full py-4 rounded-xl font-bold uppercase transition-all shadow-lg">
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

    reset: function() {
        this.state.activeEvent = false;
        this.disableButtons(false);
        const term = document.getElementById('terminal-content');
        term.className = "flex-1 flex flex-col justify-center items-center text-center opacity-40";
        term.innerHTML = `<div class="text-6xl mb-4">🖥️</div><h1 class="text-2xl font-bold">SYSTEM BEREIT</h1><p>Wähle eine Aktion unten.</p>`;
        
        this.checkRandomEmail();
    },

    // --- PHONE SYSTEM ---
    openPhone: function() {
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

        node.opts.forEach(opt => {
            const btn = document.createElement('button');
            // Neuer Button Look: Wie "Antwortvorschläge"
            btn.className = "bg-slate-800 hover:bg-blue-600 text-blue-400 hover:text-white border border-slate-600 hover:border-blue-500 py-1 px-2 rounded-xl text-sm font-medium transition-all text-left shadow-sm flex items-center gap-2 group";
            
            // Requirements prüfen (z.B. Items)
            let locked = false;
            if (opt.req) {
                 const hasItem = this.state.inventory.some(i => (typeof i === 'string' ? i : i.id) === opt.req);
                 if (!hasItem) locked = true;
            }

            if (locked) {
                btn.classList.add('opacity-50', 'cursor-not-allowed');
                btn.innerHTML = `<span class="text-red-500">🔒</span> ${opt.t} <span class="text-xs ml-auto">(Fehlt: ${opt.req})</span>`;
            } else {
                // Kleiner Pfeil im Button
                btn.innerHTML = `<span class="opacity-50 group-hover:opacity-100">➤</span> ${opt.t}`;
                // WICHTIG: Hier wird deine handlePhoneChoice aufgerufen
                btn.onclick = () => this.handlePhoneChoice(opt.t, opt.next);
            }
            
            actions.appendChild(btn);
        });
        
        // AUTO SCROLL (Sanft nach unten)
        setTimeout(() => {
            content.scrollTo({ top: content.scrollHeight, behavior: 'smooth' });
        }, 100);
    },

handlePhoneChoice: function(text, nextId) {
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
                this.state.inventory.push({ id: res.loot, used: false });
                this.addToArchive('items', res.loot);
                let itemName = DB.items[res.loot] ? DB.items[res.loot].name : res.loot;
                this.log("ERHALTEN: " + itemName, "text-yellow-400");
            }

            if(res.req) {
                let itemIndex = this.state.inventory.findIndex(i => i.id === res.req);
                if(itemIndex > -1) {
                    let itemName = DB.items[res.req] ? DB.items[res.req].name : res.req;
                    this.state.inventory.splice(itemIndex, 1);
                    this.log("VERLOREN: " + itemName, "text-red-400");
                }
            }
            
            // Stats Update
            this.state.fl += (res.fl || 0);
            this.state.al += (res.al || 0);
            this.state.cr += (res.cr || 0);
            
            // Simulation: Gegenüber tippt kurz, bevor er geht
            const loadingId = "typing-" + Date.now();
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

            // Kurze Wartezeit vor dem Ergebnis (1.5 Sekunden)
            setTimeout(() => {
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

                setTimeout(() => {
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
                }, 4000); // Zeit zum Lesen des Ergebnisses
            }, 1500);

        } 
        // FALL B: GESPRÄCH GEHT WEITER (Next Node)
        else if (ev.nodes[nextId]) {
            
            // TIPP-ANIMATION (Bouncing Dots)
            const loadingId = "typing-" + Date.now();
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

            // ZUFALLS-ZEIT: Zwischen 1.5 und 2.5 Sekunden
            // Das wirkt organisch, mal schneller, mal langsamer.
            let typingDuration = 1500 + Math.random() * 1000;

            setTimeout(() => {
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
    },

    disableButtons: function(disable) {
        const btns = document.querySelectorAll('.action-btn');
        btns.forEach(b => b.disabled = disable);
    },

    log: function(msg, colorClass) {
        // SPAM-SCHUTZ: Wenn die Nachricht identisch zur vorherigen ist, ignorieren.
        // Das verhindert, dass das Log explodiert, wenn man wie wild klickt.
        if (this.state.lastLogMsg === msg) return;
        this.state.lastLogMsg = msg;

        const feed = document.getElementById('log-feed');
        let h = Math.floor(this.state.time / 60);
        let m = this.state.time % 60;
        let time = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
        feed.innerHTML = `<div><span class="text-slate-500">[${time}]</span> <span class="${colorClass || ''}">${msg}</span></div>` + feed.innerHTML;
    },

checkEndConditions: function() {
        // WICHTIG: Wenn schon ein Ende wartet, nicht nochmal prüfen (verhindert Dopplungen)
        if (this.state.pendingEnd) return;

        // 1. BERICHT GENERIEREN
        
        // Schwierigkeit ermitteln
        let diffName = "MITTWOCH (Normal)";
        if (this.state.difficultyMult < 1.0) diffName = "FREITAG (Leicht)";
        if (this.state.difficultyMult > 1.0) diffName = "MONTAG (Schwer)";

        // Stats-Box bauen
        let statsHTML = `
            <div class="bg-slate-950 p-4 rounded-lg border border-slate-700 my-4 shadow-inner">
                <div class="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Tagesbericht: <span class="text-white font-bold">${diffName}</span></div>
                <div class="grid grid-cols-3 gap-2 text-center font-mono">
                    <div class="flex flex-col">
                        <span class="text-emerald-400 font-bold text-xl">${Math.round(this.state.fl)}%</span>
                        <span class="text-[10px] text-slate-400">FAULHEIT</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-orange-400 font-bold text-xl">${Math.round(this.state.al)}%</span>
                        <span class="text-[10px] text-slate-400">AGGRO</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-red-500 font-bold text-xl">${Math.round(this.state.cr)}%</span>
                        <span class="text-[10px] text-slate-400">RADAR</span>
                    </div>
                </div>
            </div>
        `;

        // Achievements auflisten
        let achHTML = this.state.achievedTitles.length > 0 ? 
            `<div class="mt-2 border-t border-slate-700 pt-2"><div class="font-bold text-yellow-400 mb-2 text-xs uppercase">Errungenschaften:</div>${this.state.achievedTitles.map(t => `<div class="text-xs text-slate-300">🏆 ${t}</div>`).join('')}</div>` 
            : "";

        // Der komplette HTML Block für das Modal
        let fullReport = statsHTML + achHTML;

        // 2. END-BEDINGUNGEN PRÜFEN

        // A. RAGE QUIT (Aggro >= 100)
        if(this.state.al >= 100) {
            // ALT: this.showEnd("RAGE QUIT", "Du hast den Monitor aus dem Fenster geworfen...", false);
            // NEU:
            this.state.pendingEnd = { 
                title: "RAGE QUIT", 
                text: "Du hast den Monitor aus dem Fenster geworfen. Es hat sich gut angefühlt.<br>" + fullReport, 
                isWin: false 
            };
        }
        // B. TICKET LAWINE (Zu viele Tickets)
        else if(this.state.tickets >= 10) {
            this.state.pendingEnd = { 
                title: "GEFEUERT", 
                text: "Zu viele offene Tickets! Das System ist kollabiert.<br>" + fullReport, 
                isWin: false 
            };
        }
        // C. WARNUNG (Tickets >= 7) -> Das bleibt so! Warnungen sollen sofort kommen.
        else if(this.state.tickets >= 7 && !this.state.ticketWarning) {
            this.state.ticketWarning = true;
            this.showModal("WARNUNG", "Ticket-Stau! Schließe Anrufe ab, sonst fliegst du!", false);
        }
        // D. FEIERABEND (Zeit abgelaufen)
        else if(this.state.time >= 16*60+30) {
            this.state.pendingEnd = { 
                title: "FEIERABEND", 
                text: "16:30! Du hast den Tag überlebt.<br>" + fullReport, 
                isWin: true 
            };
        }
        // E. GEFEUERT (Chef-Radar >= 100)
        else if(this.state.cr >= 100) {
            
            // Logik für die "Zweite Chance" basierend auf Schwierigkeit
            let resetTo = 50; // Standard (Mittwoch)
            if (this.state.difficultyMult < 1.0) resetTo = 30; // Freitag
            if (this.state.difficultyMult > 1.2) resetTo = 60; // Montag

            if(!this.state.warningReceived) {
                this.state.warningReceived = true;
                
                // Setze Radar zurück basierend auf Schwierigkeit
                this.state.cr = resetTo; 
                
                let warningText = `Der Chef tobt: 'Das war Ihre LETZTE Warnung!' (Radar auf ${resetTo}% gesetzt).`;
                if(this.state.difficultyMult > 1.2) warningText += " Er beobachtet dich jetzt genau!";
                
                this.showModal("ABMAHNUNG", warningText, false);
            } else {
                this.state.pendingEnd = { 
                    title: "GEFEUERT", 
                    text: "Der Sicherheitsdienst begleitet dich raus. Deine Karriere hier ist vorbei.<br>" + fullReport, 
                    isWin: false 
                };
            }
        }
    },

    showModal: function(title, text, isEnd) {
        const overlay = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        
        let btnAction = 'location.reload()';
        let btnText = 'NEUSTART';
        
        if(!isEnd && !title.includes("QUIT") && !title.includes("GEFEUERT") && !title.includes("FEIERABEND")) {
             btnAction = 'engine.closeModal()';
             btnText = 'VERSTANDEN';
        }

        content.innerHTML = `
            <h1 class="text-4xl font-black text-red-500 mb-4">${title}</h1>
            <div class="text-lg text-slate-300 mb-8 italic">${text}</div>
            <button onclick="${btnAction}" class="bg-white text-black px-8 py-3 rounded font-bold uppercase hover:bg-slate-200">
                ${btnText}
            </button>
        `;
    },

    closeModal: function() {
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('modal-overlay').classList.remove('flex');
        this.updateUI();
    },

    showEnd: function(title, text, isWin) {
        this.showModal(title, text, true);
    },
	
	finishGame: function() {
        if (this.state.pendingEnd) {
            const end = this.state.pendingEnd;
            this.showEnd(end.title, end.text, end.isWin);
            this.state.pendingEnd = null; // Reset
        }
    },

    // Log auf/zuklappen für Mobile
    toggleLog: function() {
        const log = document.getElementById('log-feed');
        const arrow = document.getElementById('log-arrow');
        
        if (log.classList.contains('hidden')) {
            log.classList.remove('hidden');
            if(arrow) arrow.innerText = "▲"; 
        } else {
            log.classList.add('hidden');
            if(arrow) arrow.innerText = "▼";
        }
    },

    // --- INVENTAR SYSTEM ---
    openInventory: function() {
        const modal = document.getElementById('inventory-modal');
        const grid = document.getElementById('full-inventory-grid');
        
        // Grid leeren und Layout für 2 Sektionen vorbereiten
        grid.innerHTML = '';
        grid.className = "flex flex-col gap-6 w-full"; 

        // 1. ITEMS TRENNEN
        let normalItems = [];
        let questItems = [];

        this.state.inventory.forEach(item => {
            let db = DB.items[item.id];
            if (db && db.quest) {
                questItems.push(item);
            } else {
                normalItems.push(item);
            }
        });

        // --- HILFSFUNKTION ZUM RENDERN EINES SLOTS ---
        const renderSlot = (itemData, isQuest) => {
            let slot = document.createElement('div');
            let dbItem = DB.items[itemData.id];
            
            // Standard-Klassen
            let baseClass = isQuest 
                ? 'inv-slot relative group cursor-help border-amber-500/50 bg-amber-900/10' 
                : 'inv-slot relative group cursor-default';

            // SPEZIAL: Das Buch muss anklickbar sein, auch wenn es ein Quest-Item ist!
            if (itemData.id === 'corp_chronicles') {
                baseClass = 'inv-slot relative group cursor-pointer border-amber-400 bg-amber-900/20 hover:bg-amber-900/40 shadow-[0_0_15px_rgba(251,191,36,0.3)]';
            }

            slot.className = baseClass;
            slot.innerText = dbItem ? dbItem.icon : '?';
            slot.title = dbItem ? dbItem.name : 'Unbekannt';
            slot.innerHTML += `<div class="absolute -bottom-6 w-full text-center text-[8px] text-slate-400 truncate">${dbItem ? dbItem.name : '???'}</div>`;
            slot.style.marginBottom = "15px"; 

            // --- KLICK LOGIK ---
            
            // 1. Normale Items (Oben)
            if (!isQuest) {
                if (itemData.id === 'stressball') {
                    let isReady = (this.state.time - this.state.lastStressballTime >= 60);
                    if (isReady) {
                        slot.className += ' cursor-pointer border-green-500 hover:bg-green-900/20'; 
                        slot.innerHTML += `<div class="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>`; 
                        slot.onclick = () => this.askUseItem('stressball');
                    } else {
                        slot.className += ' cursor-not-allowed'; 
                        let wait = 60 - (this.state.time - this.state.lastStressballTime);
                        slot.innerHTML += `<div class="absolute inset-0 bg-slate-900/70 rounded flex items-center justify-center z-10 backdrop-blur-[1px]"><span class="font-black text-white text-xl">${wait}</span></div>`;
                        slot.onclick = () => this.log(`Der Ball ist noch völlig plattgedrückt. Gib ihm Zeit, sich zu entfalten. (${wait} Min)`, "text-slate-500");
                    }
                }
                else if (itemData.id === 'energy' || itemData.id === 'donut') {
                    slot.className += ' cursor-pointer border-blue-500 hover:bg-blue-900/20';
                    slot.onclick = () => this.askUseItem(itemData.id);
                }
            } 
            // 2. Quest Items (Unten)
            else {
                if (itemData.id === 'corp_chronicles') {
                    // HIER IST DER FIX: Das Buch öffnet die Lore!
                    slot.onclick = () => this.showLoreModal();
                } else {
                    // Alle anderen Quest-Items (Tacker, Tape etc.) machen nur Text
                    slot.onclick = () => this.log(`Erinnerung: ${dbItem.name}`, "text-amber-400");
                }
            }
            return slot;
        };

        // --- SEKTION 1: RUCKSACK (Normale Items) ---
        // Limit jetzt auf 10 gesetzt
        let sectionNormal = document.createElement('div');
        sectionNormal.innerHTML = `<h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">🎒 Rucksack (${normalItems.length}/10)</h3>`;
        let gridNormal = document.createElement('div');
        gridNormal.className = "grid grid-cols-5 gap-4"; // 5 pro Reihe

        normalItems.forEach(item => {
            gridNormal.appendChild(renderSlot(item, false));
        });

        // Leere Slots auffüllen (bis 10)
        let fillCount = Math.max(0, 10 - normalItems.length);
        for(let i=0; i<fillCount; i++) {
            let slot = document.createElement('div');
            slot.className = 'inv-slot empty';
            gridNormal.appendChild(slot);
        }
        sectionNormal.appendChild(gridNormal);
        grid.appendChild(sectionNormal);

        // --- SEKTION 2: SAMMLUNG (Quest Items) ---
        if (questItems.length > 0) {
            let sectionQuest = document.createElement('div');
            sectionQuest.innerHTML = `<h3 class="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1 mt-4">🏆 Sammlung & Trophäen</h3>`;
            let gridQuest = document.createElement('div');
            gridQuest.className = "grid grid-cols-5 gap-4"; // Jetzt auch 5 pro Reihe (Einheitlich!)

            questItems.forEach(item => {
                gridQuest.appendChild(renderSlot(item, true));
            });
            
            sectionQuest.appendChild(gridQuest);
            grid.appendChild(sectionQuest);
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    },

closeInventory: function() {
        const modal = document.getElementById('inventory-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    },
		
// --- ITEM SYSTEM (Mit Sicherheitsabfrage) ---
    
// 1. Abfrage: Willst du wirklich?
    askUseItem: function(id) {
        // Cooldown Check VOR dem Modal
        if (id === 'stressball') {
            if (this.state.time - this.state.lastStressballTime < 60) {
                let wait = 60 - (this.state.time - this.state.lastStressballTime);
                this.log(`Der Ball ist noch platt. Er muss sich erst wieder entfalten (${wait} Min).`, "text-slate-500");
                return; // Kein Modal, direkt Abbruch
            }
        }

        // --- LORE ITEM CHECK ---
        if (id === 'corp_chronicles') {
            this.showLoreModal();
            return; // Modal wird nicht benötigt, wir zeigen das Lore-Fenster
        }

        // Daten holen
        let itemDB = DB.items[id];
        let title = itemDB ? itemDB.name : id; // Wenn du es in data.js in "Stressball" umbenennst, steht hier automatisch "Stressball"
        let icon = itemDB ? itemDB.icon : "❓";
        
        let desc = "Unbekannter Effekt.";
        let warn = "Dieses Item wird verbraucht.";

        // --- FLAVOR TEXTE ---
        
        if (id === 'stressball') {
            desc = "Senkt AGGRO sofort um -10 Punkte. *Quietsch*";
            // Statt "Cooldown": Materialermüdung
            warn = "Material-Ermüdung! Nach dem Kneten ist der Ball für 60 Minuten platt und nutzlos.";
        } 
        else if (id === 'energy') {
            desc = "Senkt FAULHEIT um -15. Flüssiges Herzrasen.";
            warn = "Ex und hopp! Die Dose ist danach leer. Kein Pfand, keine Rückgabe.";
        }
        else if (id === 'donut') {
            desc = "Senkt AGGRO um -15. Seelentröster aus Teig.";
            warn = "Einmaliger Genuss (Hüftgold bleibt für immer). Der Donut ist danach weg.";
        }
        else if (id === 'bubble_wrap') {
            desc = "Senkt AGGRO um -10. Sehr befriedigend.";
            warn = "Einweg-Therapie! Wenn alle Blasen geplatzt sind, ist der Spaß vorbei.";
        }

        // Modal befüllen
        this.state.pendingItem = id; 
        document.getElementById('item-confirm-icon').innerText = icon;
        document.getElementById('item-confirm-title').innerText = title;
        document.getElementById('item-confirm-desc').innerText = desc;
        document.getElementById('item-confirm-warn').innerText = warn;

        // Modal anzeigen
        document.getElementById('item-confirm-modal').classList.remove('hidden');
        document.getElementById('item-confirm-modal').classList.add('flex');
    },

    // 2. Bestätigung: Jetzt wirklich tun
    confirmUseItem: function() {
        let id = this.state.pendingItem;
        if (!id) return;

        this.closeItemConfirm(); // Fenster zu
        
        // Helper: Prüfen, ob Inventar offen ist (für Refresh der Anzeige)
        const isInvOpen = !document.getElementById('inventory-modal').classList.contains('hidden');

        // --- LOGIK ---
        
        // A. Kein Verbrauch (nur Cooldown)
        if (id === 'stressball') {
            this.state.al = Math.max(0, this.state.al - 10);
            this.state.time += 5; 
            this.state.lastStressballTime = this.state.time;
            
            // DEIN ORIGINAL TEXT:
            this.log("Du knetest den Ball aggressiv. *Quietsch*. Das hilft. (Aggro -10)", "text-green-400");
        }

        // B. VERBRAUCHSGÜTER
        else if (['energy', 'donut', 'bubble_wrap'].includes(id)) {
            let index = this.state.inventory.findIndex(i => i.id === id);
            
            if (index > -1) {
                this.state.inventory.splice(index, 1); // Item aus Array löschen
                
                if (id === 'energy') {
                    this.state.fl = Math.max(0, this.state.fl - 15);
                    this.log("ZISCH! Du ext den Energy Drink. Dein Herz rast, aber du bist hellwach. (Faulheit -15)", "text-blue-400");
                } 
                else if (id === 'donut') {
                    this.state.al = Math.max(0, this.state.al - 15);
                    this.log("Mmmh... Zuckerglasur. Die Wut schmilzt dahin. (Aggro -15)", "text-pink-400");
                }
                else if (id === 'bubble_wrap') {
                    this.state.al = Math.max(0, this.state.al - 10);
                    this.log("*Plopp* *Plopp* *Plopp*. Das ist besser als Therapie. (Aggro -10)", "text-cyan-400");
                }
            }
        }

        this.updateUI(); // Balken updaten
        if(isInvOpen) this.openInventory(); // Inventar neu zeichnen (Item entfernen)
        this.state.pendingItem = null;
    },

    closeItemConfirm: function() {
        document.getElementById('item-confirm-modal').classList.add('hidden');
        document.getElementById('item-confirm-modal').classList.remove('flex');
        this.state.pendingItem = null;
    },

    // --- LORE SYSTEM ---
    showLoreModal: function() {
        const oldModal = document.getElementById('lore-modal');
        if(oldModal) oldModal.remove();

        const html = `
            <div id="lore-modal" class="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 fade-in">
                <div class="bg-[#fdf6e3] rounded-lg max-w-3xl w-full max-h-[85vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] border-8 border-[#5d4037] relative text-[#3e2723] font-serif">
                    
                    <div class="bg-[#3e2723] p-6 text-center border-b-4 border-[#8d6e63] relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
                        <h2 class="text-3xl font-bold text-[#d7ccc8] uppercase tracking-[0.2em] mb-1 relative z-10">GlobalCorp Chronik</h2>
                        <span class="text-sm text-[#a1887f] italic font-serif relative z-10">"Tradition seit 1899. Wir verwalten das Chaos."</span>
                    </div>

                    <div class="overflow-y-auto p-10 space-y-12 text-lg leading-relaxed bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                        
                        <div class="text-center border-b-2 border-[#d7ccc8] pb-6">
                            <p class="italic text-xl">
                                "WARNUNG: Das Lesen dieser Chronik während der Arbeitszeit gilt als 'stiller Diebstahl' und wird automatisch vom Gehalt abgezogen. Lächeln Sie beim Lesen nicht. Freude ist nicht im Budget vorgesehen."
                            </p>
                        </div>

                        <div class="relative pl-8 border-l-4 border-[#8d6e63]">
                            <div class="absolute -left-[2.3rem] top-0 bg-[#8d6e63] text-[#fdf6e3] w-14 h-14 flex items-center justify-center rounded-full font-bold text-xl shadow-lg">1899</div>
                            <h3 class="font-bold text-2xl mb-2 text-[#5d4037]">Der Baron und die Dampf-Bürokratie</h3>
                            <p class="mb-4">
                                Baron Wilhelm von Gier gründete GlobalCorp ursprünglich im Sauerland als <strong>"Kaiserliche Manufaktur für Formulare & Selbstzweck"</strong>. Seine Vision war revolutionär: Er wollte Probleme verkaufen, für die nur er die Lösung hatte.
                            </p>
                            <p>
                                Sein erstes Patent war der <em>"Endlos-Stempelautomat"</em>, eine dampfbetriebene Maschine, die Anträge gleichzeitig genehmigte, ablehnte und schredderte. Das erzeugte maximalen Umsatz bei minimalem Ergebnis. Ein Geschäftsmodell war geboren.
                            </p>
                        </div>

                        <div class="relative pl-8 border-l-4 border-[#8d6e63]">
                            <div class="absolute -left-[2.3rem] top-0 bg-[#8d6e63] text-[#fdf6e3] w-14 h-14 flex items-center justify-center rounded-full font-bold text-xl shadow-lg">1955</div>
                            <h3 class="font-bold text-2xl mb-2 text-[#5d4037]">Das Beton-Zeitalter</h3>
                            <p class="mb-4">
                                Im Wirtschaftswunder erkannte GlobalCorp, dass glückliche Mitarbeiter unproduktiv sind (weil sie zu viel reden). Die Lösung war die Erfindung des <strong>Grautons "RAL 7035"</strong>.
                            </p>
                            <p>
                                Das Management führte das revolutionäre Konzept des "Open Space Warzones" ein: Großraumbüros ohne Schallschutz, in denen das Tippen des Nachbarn den eigenen Willen bricht. Zudem wurde Kaffee als offizielles Grundnahrungsmittel eingeführt – nicht um wach zu bleiben, sondern um das Zittern der Hände als "dynamische Energie" zu verkaufen.
                            </p>
                        </div>

                        <div class="relative pl-8 border-l-4 border-[#8d6e63]">
                            <div class="absolute -left-[2.3rem] top-0 bg-[#8d6e63] text-[#fdf6e3] w-14 h-14 flex items-center justify-center rounded-full font-bold text-xl shadow-lg">1982</div>
                            <h3 class="font-bold text-2xl mb-2 text-[#5d4037]">Die Fax-Revolution</h3>
                            <p class="mb-4">
                                GlobalCorp vernetzte die Welt. Zumindest alle Teile der Welt, die ein piepsendes Modem besaßen. Das Management führte die "Krawatten-Pflicht" auch für Telefonate ein, da man glaubte, man könne "Kompetenz durch die Leitung hören".
                            </p>
                            <p>
                                In dieser Zeit entstand auch die legendäre Abteilung "Human Resources". Der Name war Programm: Menschen wurden endlich wie Ressourcen behandelt – abbaubar, verbrauchbar und leicht zu ersetzen.
                            </p>
                        </div>

                        <div class="relative pl-8 border-l-4 border-[#8d6e63]">
                            <div class="absolute -left-[2.3rem] top-0 bg-[#8d6e63] text-[#fdf6e3] w-14 h-14 flex items-center justify-center rounded-full font-bold text-xl shadow-lg">1999</div>
                            <h3 class="font-bold text-2xl mb-2 text-[#5d4037]">Das Internet-Missverständnis</h3>
                            <p class="mb-4">
                                Dr. Wichtig Sr. kaufte für 500 Millionen Mark "das Internet". Er erhielt eine AOL-CD-ROM und ein 56k-Modem. Um das Gesicht zu wahren, wurde die "Cloud" erfunden.
                            </p>
                            <p>
                                <strong>Fakt ist:</strong> Unsere Cloud ist kein Netzwerk. Es ist ein stillgelegter Salzstollen in Bottrop, in dem "Der Archivar" (ein Mitarbeiter, der seit 1974 das Tageslicht nicht gesehen hat) wichtige E-Mails auf Mikrofilm abfotografiert. Das erklärt die Ladezeiten beim Login.
                            </p>
                        </div>

                        <div class="relative pl-8 border-l-4 border-[#8d6e63]">
                            <div class="absolute -left-[2.3rem] top-0 bg-[#8d6e63] text-[#fdf6e3] w-14 h-14 flex items-center justify-center rounded-full font-bold text-xl shadow-lg">2024</div>
                            <h3 class="font-bold text-2xl mb-2 text-[#5d4037]">Synergie & KI-Wahnsinn</h3>
                            <p class="mb-4">
                                Heute sind wir "Agil". Das bedeutet: Wir rennen im Kreis, schreien "Sprint!" und hoffen, dass niemand merkt, dass wir kein Ziel haben.
                            </p>
                            <p>
                                Unsere neue KI <strong>"H.A.L.G.E.R.D."</strong> überwacht nun jeden Mausklick. Sie berechnet in Echtzeit, ob Ihre Pinkelpause "geschäftsrelevant" war. Sollte Ihre Produktivität unter 120% fallen, wird Ihr Bürostuhl automatisch unbequemer eingestellt. Willkommen in der Zukunft.
                            </p>
                        </div>

                        <div class="bg-[#efebe9] p-6 rounded border border-[#d7ccc8] italic text-center mt-12 shadow-inner">
                            "Wir sind nicht hier, um die Welt zu verbessern. Wir sind hier, damit die Quartalszahlen stimmen. Gehen Sie jetzt wieder an die Arbeit."
                            <br>
                            <span class="font-bold not-italic text-sm mt-3 block uppercase tracking-widest text-[#5d4037]">- Dr. Wichtig, CEO</span>
                        </div>

                    </div>

                    <div class="p-6 bg-[#d7ccc8] border-t-4 border-[#8d6e63] flex justify-center">
                        <button onclick="document.getElementById('lore-modal').remove()" class="bg-[#5d4037] hover:bg-[#3e2723] text-[#fdf6e3] px-10 py-3 rounded shadow-lg font-bold uppercase tracking-wider transition-transform hover:scale-105 border-2 border-[#8d6e63]">
                            Buch schließen (und vergessen)
                        </button>
                    </div>

                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
    },

	// --- TEAM / CHARAKTERE ---
    openTeam: function() {
        const modal = document.getElementById('team-modal');
        const grid = document.getElementById('team-grid');
        grid.innerHTML = '';

        DB.chars.forEach(char => {
            // Hover ist jetzt weiß (hover:border-white)
            const card = document.createElement('div');
            card.className = "bg-slate-800 p-4 rounded-lg border border-slate-700 flex gap-4 hover:border-white transition-colors";
            
            // Rolle ist jetzt hellgrau/weiß (text-slate-300)
            card.innerHTML = `
                <div class="text-4xl shrink-0 bg-slate-900 w-16 h-16 flex items-center justify-center rounded-full border border-slate-600">
                    ${char.icon}
                </div>
                <div>
                    <div class="flex items-baseline gap-2 mb-1">
                        <h3 class="font-bold text-white text-lg">${char.name}</h3>
                        <span class="text-[10px] text-slate-300 uppercase tracking-widest">${char.role}</span>
                    </div>
                    <p class="text-xs text-slate-400 italic leading-relaxed">"${char.desc}"</p>
                </div>
            `;
            grid.appendChild(card);
        });

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    },

    closeTeam: function() {
        const modal = document.getElementById('team-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    },
	
};

engine.init();
