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
        morningMoodShown: false,
      
        // Schwierigkeitsgrad (Standard 1.0)
        difficultyMult: 1.0, 

        // Stats & System
        achievements: [],
        achievedTitles: [],
		reputation: {},
        coffeeConsumed: 0,
		spamClicked: 0,
		emailsIgnored: 0,
		drunkEndTime: 0,

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
            achievementDiffs: {},
            reputation: {}
        },
      
        // Ruf-System (-100 bis +100)
        reputation: {
            "Kevin": 0,
            "Chantal": 0,
            "Egon": 0,
            "Dr. Wichtig": 0,
            "Gabi": 0,
            "Frau Elster": 0,
            "Markus": 0
        },
        
        // Neue User-Einstellungen
        visualFX: localStorage.getItem('layer8_fx') !== 'false',
        audioEffects: localStorage.getItem('layer8_audio') !== 'false',
        oneClickItem: localStorage.getItem('layer8_oneclick') === 'true',
        fastChat: localStorage.getItem('layer8_fastchat') === 'true',
        blindStats: localStorage.getItem('layer8_blindstats') === 'true',
        blindTickets: localStorage.getItem('layer8_blindtickets') === 'true',
    },
    
    // --- SYNTHETISCHER SOUND ---
    audioCtx: null,
    playAudio: function(type = 'ui') {
        if (!this.state.audioEffects) return;
        try {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            
            // 15ms Puffer (Lookahead) verhindert Aussetzer bei schnellen Klicks
            const t = this.audioCtx.currentTime + 0.015; 
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            
            if (type === 'action') {
                // Profil 1 & 2: Helles, schnelles Klicken (Auswahl/Menüs/Aktionen)
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, t);
                osc.frequency.exponentialRampToValueAtTime(100, t + 0.02);
                
                gain.gain.setValueAtTime(0.15, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.02);
                
                osc.start(t);
                osc.stop(t + 0.03);
                
            } else if (type === 'ui') {
                // Profil 2: Helles, schnelles Klicken (Auswahl/Menüs)
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, t);
                osc.frequency.exponentialRampToValueAtTime(100, t + 0.02);
                
                gain.gain.setValueAtTime(0.15, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.02);
                
                osc.start(t);
                osc.stop(t + 0.03);
                
            } else if (type === 'phone') {
                // Profil 3: Moderner Messenger "Ding-Ding" (Doppel-Ton)
                osc.type = 'sine';
                
                // Erster Ton (heller Anschlag)
                osc.frequency.setValueAtTime(750, t); // 750 Hertz
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.15, t + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1); // Klingt in 100ms ab
                
                // Zweiter Ton (kurz danach, etwas höher, längerer Nachhall)
                osc.frequency.setValueAtTime(1000, t + 0.1); // 1000 Hertz (höher)
                gain.gain.setValueAtTime(0, t + 0.1);
                gain.gain.linearRampToValueAtTime(0.15, t + 0.11);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3); // Sanftes Ausklingen
                
                osc.start(t);
                osc.stop(t + 0.35); // Nach 350ms ist alles ruhig
            } else if (type === 'email') {
                // Profil 4: Klassisches E-Mail "Bing" (Einzelner, klarer Ton)
                osc.type = 'sine';
                osc.frequency.setValueAtTime(850, t); // Schöne, helle Frequenz
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.2, t + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4); // Klingt etwas länger aus
                osc.start(t);
                osc.stop(t + 0.45);
            }
        } catch(e) {
            console.log("Audio Fehler:", e);
        }
    },

    init: function() {
        this.loadSystem();
        document.getElementById('intro-modal').style.display = 'flex';
        this.updateUI();
        this.log("System v2.6.0 geladen. Warte auf User...");
    },

    // --- PERSISTENZ (Speichern & Laden) ---
    loadSystem: function() {
        const data = localStorage.getItem('layer8_archive');
        
        // Default-Werte für alle Charaktere setzen (Startwert 0)
        // Das stellt sicher, dass 'this.state.reputation' immer definiert ist, auch ohne Savegame
        DB.chars.forEach(char => {
            this.state.reputation[char.name] = 0;
        });

        if(data) {
            try {
                // 1. Archiv laden
                this.state.archive = JSON.parse(data);
                
                // 2. Fallbacks für Datenstruktur (falls Savegame alt ist)
                if(!this.state.archive.items) this.state.archive.items = [];
                if(!this.state.archive.achievements) this.state.archive.achievements = [];
                if(!this.state.archive.reputation) this.state.archive.reputation = {};
                if(!this.state.archive.stats) this.state.archive.stats = { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 };
                // 3. WICHTIG: Ruf aus dem Archiv in das aktive Spiel übertragen!
                // Wir überschreiben die Nullen mit den gespeicherten Werten
                for (let [name, val] of Object.entries(this.state.archive.reputation)) {
                    this.state.reputation[name] = val;
                }

            } catch(e) { console.error("Savegame Error", e); }
        }
    },

    saveSystem: function() {
        // WICHTIG: Vor dem Speichern den aktuellen Ruf ins Archiv kopieren
        this.state.archive.reputation = { ...this.state.reputation };
        
        // Dann ab in den LocalStorage
        localStorage.setItem('layer8_archive', JSON.stringify(this.state.archive));
    },
    
    incrementStat: function(key) {
        if (!this.state.archive.stats) {
            this.state.archive.stats = { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 };
        }
        this.state.archive.stats[key] = (this.state.archive.stats[key] || 0) + 1;
        this.saveSystem();
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

        // 1. ITEMS SORTIEREN & ZÄHLEN
        let normalItems = [];
        let questItems = [];
        let foundItems = 0; // Gesamt-Zähler
        let totalItems = Object.keys(DB.items).length;

        for (const [id, item] of Object.entries(DB.items)) {
            const isUnlocked = this.state.archive.items.includes(id);
            if (isUnlocked) foundItems++;

            if (item.quest) {
                questItems.push({id, item});
            } else {
                normalItems.push({id, item});
            }
        }

        const totalAchs = DB.achievements.length;
        const unlockedAchs = this.state.archive.achievements.length;

        // Prozentrechnung für die Fortschrittsbalken
        const itemPercent = totalItems > 0 ? Math.round((foundItems / totalItems) * 100) : 0;
        const achPercent = totalAchs > 0 ? Math.round((unlockedAchs / totalAchs) * 100) : 0;

        // 2. INHALT RENDERN
        let html = '';

        // --- DASHBOARD (Kompakt & Responsiv) ---
        const s = this.state.archive.stats || { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 };
        
        html += `
        <div class="mb-8 flex flex-col gap-3">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="bg-slate-800/60 border border-slate-700 p-3 rounded-lg shadow-sm">
                    <div class="flex justify-between items-end mb-1.5">
                        <span class="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5"><span class="text-sm">📦</span> Items</span>
                        <span class="text-xs font-mono text-slate-300">${foundItems} / ${totalItems}</span>
                    </div>
                    <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div class="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-1000" style="width: ${itemPercent}%"></div>
                    </div>
                </div>
                
                <div class="bg-slate-800/60 border border-slate-700 p-3 rounded-lg shadow-sm">
                    <div class="flex justify-between items-end mb-1.5">
                        <span class="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5"><span class="text-sm">🏅</span> Erfolge</span>
                        <span class="text-xs font-mono text-slate-300">${unlockedAchs} / ${totalAchs}</span>
                    </div>
                    <div class="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div class="h-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-1000" style="width: ${achPercent}%"></div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-900/50 p-2.5 rounded-lg border border-slate-700/60 shadow-inner">
                <div class="flex flex-col items-center justify-center p-2 bg-slate-800/30 rounded border border-slate-700/30">
                    <span class="text-[9px] text-slate-500 uppercase tracking-widest">Begonnen</span>
                    <span class="font-bold text-slate-200 text-lg leading-tight mt-0.5">${s.daysStarted || 0}</span>
                </div>
                <div class="flex flex-col items-center justify-center p-2 bg-slate-800/30 rounded border border-slate-700/30">
                    <span class="text-[9px] text-slate-500 uppercase tracking-widest">Überlebt</span>
                    <span class="font-bold text-emerald-400 text-lg leading-tight mt-0.5">${s.daysSurvived || 0}</span>
                </div>
                <div class="flex flex-col items-center justify-center p-2 bg-slate-800/30 rounded border border-slate-700/30">
                    <span class="text-[9px] text-slate-500 uppercase tracking-widest">Rage Quits</span>
                    <span class="font-bold text-orange-400 text-lg leading-tight mt-0.5">${s.daysRageQuit || 0}</span>
                </div>
                <div class="flex flex-col items-center justify-center p-2 bg-slate-800/30 rounded border border-slate-700/30">
                    <span class="text-[9px] text-slate-500 uppercase tracking-widest">Gefeuert</span>
                    <span class="font-bold text-red-500 text-lg leading-tight mt-0.5">${s.daysFired || 0}</span>
                </div>
            </div>

        </div>`;
        // --------------------------------------

        // --- A) NORMALE ITEMS (Wieder clean) ---
        html += `<div class="mb-8">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                GEFUNDENE AUSRÜSTUNG
            </h3>
            <div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">`;
        
        normalItems.forEach(({id, item}) => {
            const unlocked = this.state.archive.items.includes(id);
            let borderClass = unlocked 
                ? 'border-slate-500/50 text-slate-200 bg-slate-800' 
                : 'border-slate-700 opacity-50 text-slate-600 bg-slate-900 border-dashed'; 
            
            let contentContent = '?';
            if (unlocked) {
                if (item.img) {
                    contentContent = `<img src="${item.img}" class="w-full h-full object-contain p-1 pointer-events-none" alt="${item.name}">`;
                } else {
                    contentContent = item.icon;
                }
            }

            html += `
                <div class="aspect-square rounded border ${borderClass} flex items-center justify-center text-xl cursor-help transition-all relative group" title="${unlocked ? item.name : 'Unbekannt' }">
                    ${contentContent}
                </div>`;
        });
        html += `</div></div>`;

        // --- B) LEGENDÄRE TROPHÄEN ---
        if (questItems.length > 0) {
            html += `<div class="mb-8">
                <h3 class="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                    LEGENDÄRE TROPHÄEN
                </h3>
                <div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">`;
            
            questItems.forEach(({id, item}) => {
                const unlocked = this.state.archive.items.includes(id);
                let borderClass = unlocked 
                    ? 'border-amber-500/50 text-amber-100 bg-amber-900/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
                    : 'border-slate-700 opacity-50 text-slate-600 bg-slate-900 border-dashed';

                let contentContent = '?';
                if (unlocked) {
                    if (item.img) {
                        contentContent = `<img src="${item.img}" class="w-full h-full object-contain p-1 pointer-events-none" alt="${item.name}">`;
                    } else {
                        contentContent = item.icon;
                    }
                }

                html += `
                    <div class="aspect-square rounded border ${borderClass} flex items-center justify-center text-xl cursor-help transition-all relative group" title="${unlocked ? item.name : '???' }">
                        ${contentContent}
                    </div>`;
            });
            html += `</div></div>`;
        }

        // --- C) ERFOLGE ---
        html += `<div>
            <h3 class="text-xs font-bold text-purple-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">
                ERRUNGENSCHAFTEN
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">`;

        if(DB.achievements) {
            DB.achievements.forEach(ach => {
                const unlocked = this.state.archive.achievements.includes(ach.id);
                
                let diff = "none";
                if (this.state.archive.achievementDiffs) {
                    diff = this.state.archive.achievementDiffs[ach.id] || "easy";
                }

                let borderClass = "";
                let bgClass = "";
                let badge = "";
                let icon = ach.icon;   
                let title = ach.title; 
                let desc = "";         

                if (unlocked) {
                    desc = ach.desc; 
                    borderClass = "opacity-100 border-solid"; 
                    bgClass = "bg-slate-900/40";

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
                    desc = ach.hint ? ach.hint : "???";
                    borderClass = "border-slate-700 opacity-60 border-dashed grayscale"; 
                    bgClass = "bg-slate-950/30";
                    badge = '<span class="text-[9px] text-slate-500 font-bold border border-slate-700 px-1.5 rounded ml-auto">GESPERRT</span>';
                }

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
        html += `</div></div>`;
        content.innerHTML = html;
    },

    closeArchive: function() {
        document.getElementById('archive-modal').classList.add('hidden');
        document.getElementById('archive-modal').classList.remove('flex');
    },

    // Startet das Spiel und prüft, ob ein Standard-Tag gesetzt ist
    start: function() {
        document.getElementById('intro-modal').style.display = 'none';
        
        // Prüfen, ob der Spieler eine Standard-Schwierigkeit festgelegt hat
        const defaultDiff = localStorage.getItem('layer8_default_diff') || 'ask';
        
        if (defaultDiff !== 'ask') {
            // Modal überspringen und direkt mit der gespeicherten Auswahl starten!
            this.setDifficulty(defaultDiff);
        } else {
            // Ganz normal das Auswähl-Modal zeigen
            const diffModal = document.getElementById('difficulty-modal');
            if(diffModal) {
                diffModal.style.display = 'flex';
            } else {
                this.setDifficulty('normal'); // Fallback
            }
        }
    },

    // Setzt Schwierigkeit und startet dann erst den Loop (oder das Tutorial)
    setDifficulty: function(level) {
        document.getElementById('difficulty-modal').style.display = 'none';
        
        // Buttons für die halbe Sekunde Ladezeit sperren
        this.disableButtons(true);
        
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
                tutorial.start();
                
                // JETZT prüfen wir: Läuft das Tutorial gerade?
                // Falls NEIN (weil schon gesehen oder übersprungen), starten wir das Spiel sofort.
                if (!tutorial.isActive) {
                    this.reset();
                }
                // Falls JA (isActive == true), macht diese Funktion hier nichts mehr.
                // Das Spiel wird dann später von tutorial.finish() per engine.reset() gestartet.
            } else {
                // Fallback: Falls die tutorial.js fehlt, Spiel einfach starten
                this.reset();
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
		this.playAudio('ui');
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
            
            // Zwischenspeichern der finalen Werte für die Animation
            let addedF = opt.f || 0;
            let addedA = opt.a ? Math.ceil(opt.a * mult) : 0;
            let addedC = opt.c ? Math.ceil(opt.c * mult) : 0;

            if(addedF) this.state.fl += addedF;
            if(addedA) this.state.al += addedA;
            if(addedC) this.state.cr += addedC;

            // --- NEU: Floating Text für E-Mails ---
            if (addedF !== 0) this.showFloatingText('val-fl', addedF);
            if (addedA !== 0) this.showFloatingText('val-al', addedA);
            if (addedC !== 0) this.showFloatingText('val-cr', addedC);
            // --------------------------------------

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

        // --- BLINDFLUG LOGIK FÜR STATS ---
        document.getElementById('val-fl').innerText = this.state.blindStats ? "?%" : this.state.fl + "%";
        document.getElementById('bar-fl').style.width = this.state.fl + "%";
        
        document.getElementById('val-al').innerText = this.state.blindStats ? "?%" : this.state.al + "%";
        document.getElementById('bar-al').style.width = this.state.al + "%";
        
        document.getElementById('val-cr').innerText = this.state.blindStats ? "?%" : this.state.cr + "%";
        document.getElementById('bar-cr').style.width = this.state.cr + "%";

        // --- BLINDFLUG LOGIK FÜR TICKETS ---
        const tEl = document.getElementById('ticket-count');
        tEl.innerText = this.state.blindTickets ? "?" : this.state.tickets;
        tEl.className = this.state.tickets > 7 ? "text-4xl font-black text-white ticket-counter ticket-pulse" : "text-4xl font-black text-white ticket-counter";
		
		// --- DRUNK EFFECT RENDERING ---
        let blurVal = 0;
        
        if (this.state.drunkEndTime > this.state.time) {
            const remaining = this.state.drunkEndTime - this.state.time;
            // Skaliert von 6px runter auf 0px über 60 Minuten
            blurVal = Math.max(0, (remaining / 60) * 3);
        }

        // Liste der Elemente, die unscharf werden sollen
        const blurTargets = ['terminal', 'smartphone', 'email-modal'];

        blurTargets.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (blurVal > 0.1) { // Kleine Toleranz, damit es nicht unnötig rechnet
                    el.style.filter = `blur(${blurVal}px)`;
                    el.style.transition = "filter 1s ease";
                } else {
                    el.style.filter = 'none';
                }
            }
        });

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
                
                // --- BILD CHECK ---
                if (dbItem && dbItem.img) {
                    // Falls ein Bild existiert: Bild anzeigen (mit etwas Padding, damit es nicht klebt)
                    slot.innerHTML = `<img src="${dbItem.img}" class="w-full h-full object-contain p-1 pointer-events-none" alt="${dbItem.name}">`;
                } else {
                    // Fallback: Altes Icon nutzen
                    slot.innerText = dbItem ? dbItem.icon : '?';
                }
                
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
                else if (['energy', 'donut', 'sandwich', 'chocolate'].includes(itemData.id)) {
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
        
        // --- VISUELLE EFFEKTE (PULSIEREN) ---
        const aggroEl = document.getElementById('stat-row-al');
        const radarEl = document.getElementById('stat-row-cr');
        
        if (aggroEl && radarEl) {
            if (this.state.visualFX) {
                // Aggro blinkt ORANGE bei über 80%
                if (this.state.al >= 80) aggroEl.classList.add('pulse-orange');
                else aggroEl.classList.remove('pulse-orange');
                
                // Chef-Radar blinkt ROT bei über 80%
                if (this.state.cr >= 80) radarEl.classList.add('pulse-red');
                else radarEl.classList.remove('pulse-red');
            } else {
                aggroEl.classList.remove('pulse-orange');
                radarEl.classList.remove('pulse-red');
            }
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
		this.playAudio('action');
        // Blockieren, wenn schon ein Event offen ist
        if(this.state.activeEvent) return;

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
            
            // A. Sammle alle Events, für die der Spieler die Ruf-Voraussetzung erfüllt
            let possibleInterventions = DB.reputation.filter(ev => {
                if (this.state.usedIDs.has(ev.id)) return false; 
                
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

            // B. Würfeln: 10% Chance
            if (possibleInterventions.length > 0 && Math.random() < 0.10) {
                let intervention = possibleInterventions[Math.floor(Math.random() * possibleInterventions.length)];
                
                this.log(`Begegnung: ${intervention.title}`, "text-yellow-400");
                
                // Wir rendern es mit dem Typ 'rep' für das goldene Design
                this.renderTerminal(intervention, 'rep'); 
                return; // Unterbricht die eigentliche Aktion
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
            return true;
        });

        // Fallback, wenn Pool leer ist
        if (pool.length === 0) { 
            this.renderTerminal(DB.special.empty_pool, type); 
            return; 
        }
        
        // Event starten
        let ev = pool[Math.floor(Math.random() * pool.length)];
        this.renderTerminal(ev, type);
    },

    triggerBossFight: function() {
		
		// --- FIX: KEINE E-MAILS BEI BOSSFIGHTS ---
        // Stoppt sofort jeden geplanten E-Mail-Timer
        if (this.state.emailTimer) {
            clearTimeout(this.state.emailTimer);
            this.state.emailTimer = null;
        }
        this.state.emailPending = false;
        
        // Falls das Modal gerade schon halb offen war, hart schließen
        const emailModal = document.getElementById('email-modal');
        if (emailModal) {
            emailModal.classList.add('hidden');
            emailModal.classList.remove('flex');
            this.state.isEmailOpen = false;
        }
        // ------------------------------------------
		
        let pool = DB.bossfights.filter(ev => !this.state.usedIDs.has(ev.id));
        
        if(pool.length === 0) return; 
     
        let boss = pool[Math.floor(Math.random() * pool.length)]; 

        this.state.activeEvent = true;
        this.state.usedIDs.add(boss.id);
        this.disableButtons(true);

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

    // --- TERMINAL & CALL SYSTEM ---

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

    // 3. GEMEINSAMES HTML-TEMPLATE
    buildEventHTML: function(type, title, text, opts, isChain) {
		
        // ---> Mache aus \n echte HTML-Zeilenumbrüche <---
        let formattedText = text ? text.replace(/\n/g, "<br>") : "";		
        
        // --- STYLE KONFIGURATION ---
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
        }

        let html = `
            <div class="w-full max-w-2xl text-left fade-in ${bgClass} border ${borderColor} p-4 md:p-6 rounded-xl shadow-2xl mx-auto my-auto shrink-0 relative overflow-hidden">
                
                <div class="flex items-center gap-3 mb-4 md:mb-6 border-b border-slate-600 pb-3 md:pb-4">
                    <span class="text-3xl">${icon}</span>
                    <div class="flex flex-col">
                        <span class="${color} font-black uppercase tracking-widest text-sm">${typeName}</span>
                        <h2 class="text-2xl font-bold text-slate-100">${title}</h2>
                    </div>
                </div>
        `;

        // === BOSS TIMER BALKEN (Integriert) ===
        if (type === 'boss') {
            // FIX 3: 'transition-all' und 'duration-1000' ENTFERNT!
            // Da JS jetzt alle 50ms updatet, brauchen wir keine CSS-Transition mehr.
            // Das verhindert das "Springen".
            html += `
            <div class="w-full h-4 bg-red-950/50 rounded-full mb-6 border border-red-500/30 overflow-hidden relative">
                <div id="integrated-boss-bar" class="h-full bg-gradient-to-r from-red-600 to-red-500 shadow-red-500/50 shadow-md ease-linear" style="width: 100%"></div>
            </div>
            `;
        }
        // ==========================================
        
        html += `
                <div class="bg-black/40 p-5 rounded-lg border-l-4 ${borderColor} mb-8">
                    <p class="italic text-slate-300 text-lg leading-relaxed font-serif">"${formattedText}"</p>
                </div>

                <div class="space-y-2.5">
        `;

        if (opts) {
            opts.forEach(opt => {
                let locked = false;
                let reqText = "";

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
				
                // REM Check
                if(opt.rem && !locked) {
                    let hasItem = this.state.inventory.find(i => i.id === opt.rem);
                    if(!hasItem) {
                        locked = true;
                        let itemName = DB.items[opt.rem] ? DB.items[opt.rem].name : opt.rem;
                        reqText = `(Benötigt: ${itemName})`;
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
                    btnClass = "w-full text-left p-2.5 rounded border border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-slate-400 hover:text-white transition-all text-slate-200 font-bold shadow-md flex justify-between items-center group";
                    iconBtn = `<span class="${color} group-hover:text-white transition-colors">➤</span>`;
                    
                    if (isChain) {
                        clickAction = `onclick="engine.handleChainChoice('${opt.next}')"`;
                    } else {
                        let safeRes = opt.r ? opt.r.replace(/'/g, "\\'").replace(/\n/g, "<br>") : '';
                        
                        // NEU: Reputation Objekt sicher für HTML machen
                        let safeRep = "null";
                        if (opt.rep) {
                            // Wir wandeln das Objekt in einen String um und ersetzen Anführungszeichen, damit das HTML nicht kaputt geht
                            safeRep = JSON.stringify(opt.rep).replace(/"/g, "&quot;");
                        }

                        // Hier fügen wir 'safeRep' als letztes Argument hinzu
                        clickAction = `onclick="engine.resolveTerminal('${safeRes}', ${opt.m||0}, ${opt.f||0}, ${opt.a||0}, ${opt.c||0}, '${opt.loot||''}', '${opt.req||''}', '${type}', '${opt.next||''}', '${opt.rem||''}', ${safeRep})"`;
                    }
                }

                // BADGE NUR NOCH FÜR KETTEN (Punkte ...), KEINE ZEIT MEHR
                let badgeHTML = "";
                if (isChain && !locked && !opt.next.startsWith('res_')) {
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

        // Items Logic: LOOT
        if(loot && loot !== "") {
            if(!this.state.inventory.find(i => i.id === loot)) {
                this.state.inventory.push({ id: loot, used: false });
                this.addToArchive('items', loot);
                let itemName = DB.items[loot] ? DB.items[loot].name : loot; // Safety check
                this.log(`ITEM: ${itemName}`, "text-yellow-400");
            }
        }
        
        // --- ITEMS REMOVED (rem) ---
        // Hier nutzen wir jetzt die Variable 'rem', die oben übergeben wurde
        if (rem && rem !== "") {
            this.state.inventory = this.state.inventory.filter(i => i.id !== rem);
            let removedName = DB.items[rem] ? DB.items[rem].name : rem;
            this.log(`Verloren: ${removedName}`, "text-orange-400");
        }
        // --------------------------------

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

    reset: function() {
		this.playAudio('ui');
		// --- Morgen-Routinen Abfang-Mechanismus ---
		if (!this.state.morningMoodShown) {
            this.state.morningMoodShown = true;
            this.incrementStat('daysStarted');
            this.triggerMorningMood();
            return;
        }
        // -----------------------------------------
        this.state.activeEvent = false;
        this.disableButtons(false);
        const term = document.getElementById('terminal-content');
        term.className = "flex-1 flex flex-col justify-center items-center text-center opacity-40";
        term.innerHTML = `<div class="text-6xl mb-4">🖥️</div><h1 class="text-2xl font-bold">SYSTEM BEREIT</h1><p>Wähle eine Aktion unten.</p>`;
        
        this.checkRandomEmail();
    },

    // --- UI HELPER: Stat Summary ---
    buildStatSummary: function(m, f, a, c) {
        let html = '';
        
        // Helfer für einzelne Pillen
        const makePill = (val, label, colorClass) => {
            let num = val || 0; 
            const sign = num > 0 ? '+' : '';
            
            return `<span class="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-bold bg-slate-800 border border-slate-700">
                        <span class="${colorClass}">${label}</span> 
                        <span class="text-white ml-0.5">${sign}${num}</span>
                    </span>`;
        };

        // 1. ZEIT (Neu: Als erstes Element anzeigen)
        // Wir zeigen nur an, wenn Zeit vergangen ist (m > 0)
        if (m > 0) {
            html += makePill(m, 'Minuten', 'text-blue-400');
        }

        // 2. STATS (Wie bisher)
        html += makePill(f, 'Faulheit', 'text-green-400');
        html += makePill(a, 'Aggro', 'text-orange-400');
        html += makePill(c, 'Chef', 'text-red-500');

        return `<div class="flex flex-wrap gap-2 mt-4 fade-in">
                    ${html}
                </div>`;
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
        let finalF = res.fl || 0;
        let finalA = res.al || 0;
        let finalC = res.cr || 0;

        this.state.fl += finalF;
        this.state.al += finalA;
        this.state.cr += finalC;

        // --- NEU: Floating Text für Phone ---
        if (finalF !== 0) this.showFloatingText('val-fl', finalF);
        if (finalA !== 0) this.showFloatingText('val-al', finalA);
        if (finalC !== 0) this.showFloatingText('val-cr', finalC);
        // ------------------------------------
        
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
			this.incrementStat('daysRageQuit');
            // 1. Tagebuch generieren
            let diary = this.generateDiaryEntry("RAGE"); 
            
            this.state.pendingEnd = { 
                title: "RAGE QUIT", 
                text: "Du hast den Monitor aus dem Fenster geworfen. Es hat sich gut angefühlt.<br>" + fullReport + diary, // <-- Hier + diary anhängen
                isWin: false 
            };
        }
        // B. TICKET LAWINE (Zu viele Tickets)
        else if(this.state.tickets >= 10) {
			this.incrementStat('daysFired');
            // 1. Tagebuch generieren
            let diary = this.generateDiaryEntry("TICKETS");

            this.state.pendingEnd = { 
                title: "GEFEUERT", 
                text: "Zu viele offene Tickets! Das System ist kollabiert.<br>" + fullReport + diary, // <-- Hier + diary anhängen
                isWin: false 
            };
        }
        // C. WARNUNG (Tickets >= 7) -> Das bleibt so!
        else if(this.state.tickets >= 7 && !this.state.ticketWarning) {
            this.state.ticketWarning = true;
            this.showModal("WARNUNG", "Ticket-Stau! Schließe Anrufe ab, sonst fliegst du!", false);
        }
        // D. FEIERABEND (Zeit abgelaufen)
        else if(this.state.time >= 16*60+30) {
			this.incrementStat('daysSurvived');
            // 1. Tagebuch generieren
            let diary = this.generateDiaryEntry("WIN");

            this.state.pendingEnd = { 
                title: "FEIERABEND", 
                text: "16:30! Du hast den Tag überlebt.<br>" + fullReport + diary, // <-- Hier + diary anhängen
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
				this.incrementStat('daysFired');
                // 1. Tagebuch generieren
                let diary = this.generateDiaryEntry("FIRED");

                this.state.pendingEnd = { 
                    title: "GEFEUERT", 
                    text: "Der Sicherheitsdienst begleitet dich raus. Deine Karriere hier ist vorbei.<br>" + fullReport + diary, // <-- Hier + diary anhängen
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
            slot.title = dbItem ? dbItem.name : 'Unbekannt';
            slot.style.marginBottom = "15px"; 

            // --- BILD VS ICON LOGIK (NEU) ---
            let mainContent = '?';
            
            if (dbItem) {
                if (dbItem.img) {
                    // Falls Bild vorhanden: IMG Tag einfügen
                    mainContent = `<img src="${dbItem.img}" class="w-full h-full object-contain p-1 pointer-events-none" alt="${dbItem.name}">`;
                } else {
                    // Sonst: Emoji Icon
                    mainContent = dbItem.icon;
                }
            }

            // Label unten
            let labelHtml = `<div class="absolute -bottom-6 w-full text-center text-[8px] text-slate-400 truncate">${dbItem ? dbItem.name : '???'}</div>`;

            // Inhalt setzen
            slot.innerHTML = mainContent + labelHtml;
            // -------------------------------

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
                        // Overlay für Cooldown (wird einfach angehängt)
                        slot.innerHTML += `<div class="absolute inset-0 bg-slate-900/70 rounded flex items-center justify-center z-10 backdrop-blur-[1px]"><span class="font-black text-white text-xl">${wait}</span></div>`;
                        slot.onclick = () => this.log(`Der Ball ist noch völlig plattgedrückt. Gib ihm Zeit, sich zu entfalten. (${wait} Min)`, "text-slate-500");
                    }
                }
               else if (['energy', 'donut', 'sandwich', 'chocolate'].includes(itemData.id)) {
                    slot.className += ' cursor-pointer border-blue-500 hover:bg-blue-900/20';
                    slot.onclick = () => this.askUseItem(itemData.id);
                }
            } 
            // 2. Quest Items (Unten)
            else {
                if (itemData.id === 'corp_chronicles') {
                    slot.onclick = () => this.showLoreModal();
                } else {
                    slot.onclick = () => this.log(`Erinnerung: ${dbItem.name}`, "text-amber-400");
                }
            }
            return slot;
        };

        // --- SEKTION 1: RUCKSACK (Normale Items) ---
        let sectionNormal = document.createElement('div');
        sectionNormal.innerHTML = `<h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">🎒 Rucksack (${normalItems.length}/10)</h3>`;
        let gridNormal = document.createElement('div');
        gridNormal.className = "grid grid-cols-5 gap-4"; 

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
            gridQuest.className = "grid grid-cols-5 gap-4"; 

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
        
        // --- ONE-CLICK ITEM LOGIK ---
        if (this.state.oneClickItem) {
            this.state.pendingItem = id;
            this.confirmUseItem();
            return; // Beendet die Funktion sofort, Modal poppt nicht auf!
        }

        // Daten holen
        let itemDB = DB.items[id];
        let title = itemDB ? itemDB.name : id; 
        
        // --- BILD VS ICON LOGIK ---
        let displayContent = "❓";
        if (itemDB) {
            if (itemDB.img) {
                // Wenn ein Bild existiert, bauen wir einen IMG-Tag mit passenden Tailwind-Klassen
                displayContent = `<img src="${itemDB.img}" class="w-full h-full object-contain drop-shadow-md" alt="${itemDB.name}">`;
            } else {
                // Fallback auf das Emoji
                displayContent = itemDB.icon;
            }
        }
        
        let desc = "Unbekannter Effekt.";
        let warn = "Dieses Item wird verbraucht.";

        // --- FLAVOR TEXTE ---
        if (id === 'stressball') {
            desc = "Senkt AGGRO sofort um -10 Punkte. *Quietsch*";
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
        else if (id === 'sandwich') {
            desc = "Senkt AGGRO um -10 und FAULHEIT um -5. Ein solides Handwerker-Frühstück.";
            warn = "Mit viel Remoulade! Einmalig konsumierbar.";
        }
        else if (id === 'chocolate') {
            desc = "Senkt AGGRO um -20. Pures, quadratisches Glück auf Kakaobasis.";
            warn = "Du hast sie dir verdient. Verschwindet nach dem Essen aus dem Inventar.";
        }
        else if (id === 'bubble_wrap') {
            desc = "Senkt AGGRO um -10. Sehr befriedigend.";
            warn = "Einweg-Therapie! Wenn alle Blasen geplatzt sind, ist der Spaß vorbei.";
        }

        // Modal befüllen
        this.state.pendingItem = id; 
        
        // WICHTIG: Hier innerHTML nutzen, damit das Bild gerendert wird!
        document.getElementById('item-confirm-icon').innerHTML = displayContent;
        
        document.getElementById('item-confirm-title').innerText = title;
        document.getElementById('item-confirm-desc').innerText = desc;
        document.getElementById('item-confirm-warn').innerText = warn;

        // Modal anzeigen
        document.getElementById('item-confirm-modal').classList.remove('hidden');
        document.getElementById('item-confirm-modal').classList.add('flex');
    },

    // 2. Bestätigung: Jetzt wirklich tun
    confirmUseItem: function() {
		this.playAudio('ui');
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
        else if (['energy', 'donut', 'bubble_wrap', 'sandwich', 'chocolate'].includes(id)) {
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
                else if (id === 'sandwich') {
                    this.state.al = Math.max(0, this.state.al - 10);
                    this.state.fl = Math.max(0, this.state.fl - 5);
                    this.log("Eine dicke Scheibe Käse und Remoulade. Das erdet. (Aggro -10, Faulheit -5)", "text-yellow-400");
                }
                else if (id === 'chocolate') {
                    this.state.al = Math.max(0, this.state.al - 20);
                    this.log("Die Schokolade schmilzt auf der Zunge. Für einen kurzen Moment hasst du niemanden. (Aggro -20)", "text-amber-500");
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
		this.playAudio('ui');
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
            const card = document.createElement('div');
            card.className = "bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col gap-3 relative overflow-hidden group hover:border-slate-500 transition-colors overflow-visible"; 
            
            // Prüfen, ob es der Spieler ist
            const isPlayer = char.name.includes("Müller") || char.role === "SysAdmin";

            // Ruf und Logik nur berechnen, wenn NICHT Spieler
            let currentRep = 0;
            let statusText = "NEUTRAL";
            let barColor = "bg-slate-500";
            let statusColor = "text-slate-400";
            let fillPercent = 50;

            if (!isPlayer) {
                currentRep = this.state.reputation[char.name] || 0;
                
                if (currentRep >= 90) {
                    statusText = "KOMPLIZE";
                    barColor = "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.6)]";
                    statusColor = "text-purple-400";
                } else if (currentRep >= 60) {
                    statusText = "VERBÜNDET";
                    barColor = "bg-emerald-500";
                    statusColor = "text-emerald-400";
                } else if (currentRep >= 20) {
                    statusText = "FREUNDLICH";
                    barColor = "bg-green-600";
                    statusColor = "text-green-500";
                } else if (currentRep <= -90) {
                    statusText = "HASST DICH";
                    barColor = "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.6)]";
                    statusColor = "text-red-500";
                } else if (currentRep <= -60) {
                    statusText = "GENERVT";
                    barColor = "bg-orange-600";
                    statusColor = "text-orange-500";
                } else if (currentRep <= -20) {
                    statusText = "SKEPTISCH";
                    barColor = "bg-yellow-600";
                    statusColor = "text-yellow-600";
                }
                fillPercent = (currentRep + 100) / 2;
            }

            // HTML Bausteine für Status & Balken (nur wenn nicht Müller)
            const statusBadgeHTML = isPlayer ? '' : `
                <span class="text-[10px] font-bold uppercase tracking-widest ${statusColor} border border-slate-700 bg-slate-900/50 px-2 py-0.5 rounded ml-2 shrink-0">
                    ${statusText}
                </span>`;

            const progressBarHTML = isPlayer ? '' : `
                <div class="w-full h-1.5 bg-slate-900 rounded-full border border-slate-700 relative overflow-hidden mb-2">
                    <div class="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-600/50 z-20"></div>
                    <div class="h-full ${barColor} transition-all duration-1000 ease-out relative z-10" style="width: ${fillPercent}%"></div>
                </div>`;

            // Avatar
            let avatarHTML = char.img ? 
                `<img src="${char.img}" class="w-full h-full object-cover" alt="${char.name}">` : 
                char.icon;

            card.innerHTML = `
                <div class="flex gap-4 items-start z-10">
                    <div class="shrink-0 bg-slate-900 w-16 h-16 flex items-center justify-center rounded-full border border-slate-600 overflow-hidden text-3xl shadow-inner 
                                relative z-0 transition-transform duration-300 ease-out origin-center cursor-help 
                                md:hover:scale-[2.25] md:hover:z-50 md:hover:shadow-2xl md:hover:border-white">
                        ${avatarHTML}
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <div class="flex justify-between items-start mb-1">
                            <div class="flex flex-col">
                                <div class="flex items-baseline gap-2">
                                    <h3 class="font-bold text-white text-lg truncate">${char.name}</h3>
                                    <span class="text-[10px] text-slate-400 uppercase tracking-wider hidden md:inline-block pt-1">${char.role}</span>
                                </div>
                                <span class="text-[10px] text-slate-500 uppercase tracking-wider md:hidden">${char.role}</span>
                            </div>
                            
                            ${statusBadgeHTML}
                        </div>
                        
                        ${progressBarHTML}
                        
                        <p class="text-xs text-slate-400 leading-snug opacity-90 italic">${char.desc}</p>
                    </div>
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

    // --- INTRANET SYSTEM ---
    openIntranet: function() {
        const modal = document.getElementById('intranet-modal');
        // iFrame bei jedem Öffnen auf die Startseite zurücksetzen (Optional, aber gut)
        const frame = document.getElementById('intranet-frame');
        if(frame) frame.src = "assets/intranet/index.html"; 
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    },

    closeIntranet: function() {
        const modal = document.getElementById('intranet-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        
        // --- ACHIEVEMENT CHECK ---
        this.unlockAchievement(
            'ach_intranet', 
            '🌐 Meister des Internets', 
            'Du hast die tiefsten, dunkelsten Tiefen des Firmen-Intranets erforscht.'
        );
    },

    // --- VISUELLES FEEDBACK (Floating Text) ---
    showFloatingText: function(elementId, value) {
        if (value === 0) return; // Nichts anzeigen bei 0

        const target = document.getElementById(elementId);
        if (!target) return;

        // 1. Element erstellen (+ oder - davor setzen)
        const floatEl = document.createElement('div');
        const sign = value > 0 ? '+' : '';
        floatEl.innerText = `${sign}${value}`;
        
        // --- BLINDFLUG CHECK ---
        if (this.state.blindStats) {
            floatEl.innerText = '?'; // Zeigt nur ein Fragezeichen
        } else {
            const sign = value > 0 ? '+' : '';
            floatEl.innerText = `${sign}${value}`;
        }

        // 2. Farbe festlegen (Abhängig vom Balken, unabhängig ob gut/schlecht)
        let color = 'text-white'; // Fallback
        if (elementId === 'val-fl') {
            // Faulheit = Immer Grün
            color = 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]';
        } else if (elementId === 'val-al') {
            // Aggro = Immer Orange
            color = 'text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]';
        } else if (elementId === 'val-cr') {
            // Chef/Radar = Immer Rot
            color = 'text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]';
        }

        // Styling (Start-Zustand) - Jetzt noch langsamer: 3000ms (3 Sekunden)
        floatEl.className = `fixed font-normal text-xl z-[9999] pointer-events-none transition-all duration-[3000ms] ease-out ${color}`;

        // 3. Start-Position berechnen
        const rect = target.getBoundingClientRect();
        floatEl.style.left = (rect.left + rect.width / 2) + 'px';
        floatEl.style.top = (rect.top - 10) + 'px';
        floatEl.style.transform = 'translate(-50%, 0) scale(1)';
        floatEl.style.opacity = '1';

        document.body.appendChild(floatEl);

        // 4. Animation auslösen (Schwebt nach oben, verblasst langsam)
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                // Schwebt ruhig 40px nach oben
                floatEl.style.transform = 'translate(-50%, -40px) scale(1)';
                floatEl.style.opacity = '0';
            });
        });

        // 5. Müllabfuhr (Element nach 3 Sekunden löschen)
        setTimeout(() => {
            floatEl.remove();
        }, 3000);
    },

    // --- TAGEBUCH GENERATOR ---
    generateDiaryEntry: function(endReason) {
        const state = this.state;
        
        // Hilfsfunktion: Baut aus ["A", "B", "C"] einen Satz "A, B und C"
        const formatList = (arr) => {
            if (arr.length === 0) return "";
            if (arr.length === 1) return arr[0];
            let last = arr.pop();
            return arr.join(", ") + " und " + last;
        };

        // ZUFALLS-GENERATOR: Wählt einen zufälligen Textbaustein aus einem Array
        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

        // 1. EVENT-ANALYSE (Orte)
        const usedArray = Array.from(state.usedIDs);
        const serverVisits = usedArray.filter(id => id.startsWith('srv_')).length;
        const callVisits = usedArray.filter(id => id.startsWith('call_')).length;
        const questVisits = usedArray.filter(id => id.startsWith('sq_')).length;

        // ==========================================
        // ABSATZ 1: Die Grundstimmung & der Ort
        // ==========================================
        let p1 = "";
        
        // Grundstimmung (Achievements)
        if (state.achievements.includes('ach_rage')) {
            p1 += pick([
                "Heute war ich ein wandelndes Pulverfass. Ein falsches Wort und ich hätte den Router angezündet. ",
                "Mein Puls war heute konstant auf 180. Ich habe mehrfach überlegt, einfach den Feueralarm zu drücken. ",
                "Wenn Blicke töten könnten, wäre das Großraumbüro heute ein Friedhof geworden. "
            ]);
        } else if (state.achievements.includes('ach_lazy')) {
            p1 += pick([
                "Mein Motto heute: Warum heute arbeiten, wenn man es auch auf unbestimmte Zeit verschieben kann? ",
                "Ich habe die Kunst der produktiven Arbeitsvermeidung heute absolut perfektioniert. ",
                "Wenn Faulenzen olympisch wäre, hätte ich heute Gold für die Firma geholt. "
            ]);
        } else if (state.achievements.includes('ach_ascetic')) {
            p1 += pick([
                "Ich habe den Tag ohne einen Tropfen Kaffee überlebt – mein Kopf dröhnt vor Tugendhaftigkeit. ",
                "Kein Koffein heute. Ich funktioniere nur noch durch pure Willenskraft und unterdrückte Wut. ",
                "Ein völlig entkoffeinierter Tag. Ich fühle mich wie eine leere Hülle, aber mein Blutdruck ist fantastisch. "
            ]);
        } else if (state.achievements.includes('ach_coffee')) {
            p1 += pick([
                "Mein Blut besteht mittlerweile zu 90% aus Koffein. Ich kann Farben schmecken. ",
                "Ich zittere am ganzen Körper. Nicht vor Angst, sondern weil ich den halben Kaffeeautomaten geleert habe. ",
                "Wenn ich noch einen Espresso trinke, kann ich wahrscheinlich durch die Zeit reisen. Mein Puls ist auf Rekordjagd. "
            ]);
        } else if (state.achievements.includes('ach_workaholic')) {
            p1 += pick([
                "Ich habe heute tatsächlich so hart gearbeitet, dass ich uns alle schlecht aussehen lasse. ",
                "Heute war ich beängstigend produktiv. Ich hoffe, das Management gewöhnt sich nicht daran. ",
                "Ein Tag wie ein Maschinengewehr. Tickets gelöst, Probleme gefixt. Ich habe heute quasi die ganze Firma im Alleingang getragen. "
            ]);
        } else {
            p1 += pick([
                "Ein weiterer Tag im alltäglichen Corporate-Wahnsinn neigt sich dem Ende. ",
                "Wieder acht Stunden meines Lebens, die mir niemand zurückgeben wird. ",
                "Die Neonröhren surren, der Kaffee war kalt, der Wahnsinn hatte Methode. "
            ]);
        }

        // Haupt-Aufenthaltsort
        if (questVisits > serverVisits && questVisits > callVisits) {
            p1 += pick([
                "Anstatt mich um echte Probleme zu kümmern, bin ich lieber ziellos durch die Flure gegeistert.",
                "Meine Hauptaufgabe bestand heute scheinbar darin, seltsame Büro-Dramen abseits meines Schreibtisches zu lösen.",
                "Ich war heute öfter auf 'Dienstgang' unterwegs als am eigenen Platz."
            ]);
        } else if (serverVisits > callVisits + 2) {
            p1 += pick([
                "Um den nervigen Menschen aus dem Weg zu gehen, habe ich mich größtenteils im dunklen Serverraum verschanzt.",
                "Die lauten Lüfter im Serverraum waren heute meine einzige, echte Gesellschaft.",
                "Ich habe heute fast schon eine emotionale Bindung zu den blinkenden Racks im Keller aufgebaut."
            ]);
        } else if (callVisits > serverVisits + 3) {
            p1 += pick([
                "Gefühlt klebte mir das Telefon pausenlos am Ohr. Die User haben mir den letzten Nerv geraubt.",
                "Ich habe heute mehr Support-Gespräche geführt als eine vollbesetzte Call-Center-Schicht.",
                "Das ständige Klingeln des Telefons wird mich vermutlich noch bis in meine Träume verfolgen."
            ]);
        } else {
            p1 += pick([
                "Zwischen piepsenden Servern und panischen Anrufen habe ich irgendwie versucht, den Betrieb am Laufen zu halten.",
                "Ein chaotischer Mix aus Hardware-Ausfällen und menschlicher Inkompetenz hielt mich heute auf Trab.",
                "Ich bin von Brandherd zu Brandherd gerannt, ohne jemals wirklich etwas zu löschen."
            ]);
        }

        // ==========================================
        // ABSATZ 2: Begegnungen (Achievements & Lore Items)
        // ==========================================
        let p2 = "";
        let encounters = [];
        const hasAch = (id) => state.achievements.includes(id);
        const hasItem = (id) => state.inventory.some(i => i.id === id);

        // Story-Erfolge mit 3 Variationen
        if (hasAch('ach_mentor')) encounters.push(pick(["ich Azubi Kevin vor dem totalen IT-Kollaps bewahrt habe", "ich Kevins Haut gerettet habe", "Kevin mir nun auf ewig etwas schuldig ist"]));
        if (hasAch('ach_ally')) encounters.push(pick(["ich eine unheilige Allianz mit Chantal aus dem Marketing geschmiedet habe", "Chantal und ich jetzt ein tödliches Team sind", "das Marketing nun in meiner Schuld steht"]));
        if (hasAch('ach_rockstar')) encounters.push(pick(["mir Gabi ihr feinstes Death-Metal-Mixtape anvertraut hat", "ich mit Gabi musikalisch voll auf einer Wellenlänge war", "Gabi und ich den Empfang gerockt haben"]));
        if (hasAch('ach_cat_whisperer')) encounters.push(pick(["ich das Katzenproblem der Buchhaltung gelöst habe", "ich zum offiziellen Katzenflüsterer von Frau Elster wurde", "Frau Elsters Kater Rüdiger und ich jetzt quasi Best Friends sind"]));
        if (hasAch('ach_keymaster')) encounters.push(pick(["mir Hausmeister Egon seinen Generalschlüssel überlassen hat", "ich dank Egon nun theoretisch überall reinpasse", "ich jetzt dank Egons Schlüssel die wahre Macht im Gebäude habe"]));
        if (hasAch('ach_closer')) encounters.push(pick(["ich mit Markus aus dem Sales einen extrem wichtigen Deal gerettet habe", "ich dem Vertrieb buchstäblich den Hintern gerettet habe", "Markus ohne mich heute seinen fetten Bonus verloren hätte"]));
        if (hasAch('ach_wolf')) encounters.push(pick(["ich dem Chef einen neuen Arbeitsvertrag aus den Rippen geleiert habe", "ich gehaltstechnisch endlich aufgestiegen bin", "ich den Chef in der Gehaltsverhandlung absolut dominiert habe"]));
        if (hasAch('ach_hacker')) encounters.push(pick(["ich mir illegale Admin-Rechte im System verschafft habe", "ich mich unbemerkt ins Root-Verzeichnis gehackt habe", "ich dank Root-Passwort jetzt der absolute Gott im Netzwerk bin"]));
        if (hasAch('ach_rich')) encounters.push(pick(["ich dem nigerianischen Prinzen mein Vertrauen geschenkt habe", "ich unfassbar reich werde (falls der Scam echt ist)", "ich bald Millionen auf dem Konto habe (hoffentlich)"]));
        
        // Lore Items mit 3 Variationen
        if (hasItem('corp_chronicles')) encounters.push(pick(["ich die verbotene Firmenchronik studiert habe", "ich finstere Wahrheiten in einem alten Buch entdeckt habe", "ich die düsteren Geheimnisse des Gründers in der Chronik gelesen habe"]));
        if (hasItem('prince_letter')) encounters.push(pick(["ich diesen absurden Prinzen-Brief mit mir herumschleppe", "ich heute königliche Post erhalten habe", "mir ein echter Brief von einem Prinzen in die Hände gefallen ist"]));

        if (encounters.length > 0) {
            p2 += pick([
                `Besonders denkwürdig war heute, dass ${formatList(encounters)}. `,
                `Wenn ich auf den Tag zurückblicke, sticht besonders hervor, dass ${formatList(encounters)}. `,
                `Man wird sich wohl noch lange daran erinnern, dass ${formatList(encounters)}. `
            ]);
        }

        // Gewohnheiten mit 3 Variationen
        let habits = [];
        if (hasAch('ach_ignore')) habits.push(pick(["die Entf-Taste bei E-Mails mein absoluter bester Freund war", "ich das Ignorieren von Mails zur Kunst erhoben habe", "ich heute einen Rekord im Löschen ungelesener E-Mails aufgestellt habe"]));
        if (hasAch('ach_hoarder')) habits.push(pick(["ich meinen Rucksack mit absolutem Müll vollgestopft habe", "ich heute alles eingesteckt habe, was nicht niet- und nagelfest war", "ich wie ein echter Loot-Goblin jeden Schrott im Büro gesammelt habe"]));
        if (hasAch('ach_intranet')) habits.push(pick(["ich mich stundenlang im toxischen Intranet versteckt habe", "ich das Firmen-Wiki auf den Kopf gestellt habe", "ich mehr Zeit im Firmen-Intranet als mit echter Arbeit verbracht habe"]));
        if (hasAch('ach_macgyver')) habits.push(pick(["ich mich mit Tape und Kabelbindern wie MacGyver gefühlt habe", "ich IT-Probleme mit reiner Bastel-Energie gelöst habe", "ich bewiesen habe, dass man mit Panzertape einfach alles reparieren kann"]));
        if (hasAch('ach_clean')) habits.push(pick(["ich tatsächlich 'Inbox Zero' erreicht habe (ein Wunder!)", "mein Ticket-System am Ende völlig leer war", "ich jedes verdammte Ticket abgearbeitet habe"]));
        
        if (habits.length > 0) {
            let conn = encounters.length > 0 ? pick(["Ansonsten", "Darüber hinaus", "Zu guter Letzt"]) : pick(["Meine Strategie", "Mein grundlegender Ansatz"]);
            p2 += `${conn} bestand heute hauptsächlich daraus, dass ${formatList(habits)}.`;
        }

        // ==========================================
        // ABSATZ 3: Das Finale (Game Over / Win)
        // ==========================================
        let p3 = "";
        if (endReason === "RAGE") {
            p3 = pick([
                "Das bittere Ende vom Lied? Mir ist die Sicherung durchgebrannt. Ein fliegender Monitor ist schließlich auch eine Form von fristloser Kündigung!",
                "Irgendwann war das Maß voll. Ich habe getobt, geschrien und bin gegangen. Ein glorreicher Abgang, den hier so schnell niemand vergisst.",
                "Ich habe komplett die Kontrolle verloren. Es fühlt sich großartig an, auch wenn ich morgen wohl arbeitslos bin."
            ]);
        } else if (endReason === "TICKETS") {
            p3 = pick([
                "Schlussendlich hat mich die Ticket-Lawine komplett unter sich begraben. Das System ist restlos kollabiert – und ich bin meinen Job los.",
                "Die Flut an Anfragen war nicht mehr zu stoppen. Ich habe kapituliert. Morgen sitze ich wohl auf der Straße.",
                "Das Ticket-Limit wurde gesprengt. Der Chef hat persönlich den Stecker gezogen. Ende der Vorstellung."
            ]);
        } else if (endReason === "FIRED") {
            p3 = pick([
                "Dass der Sicherheitsdienst mich am Ende persönlich rauseskortiert hat, ist der perfekte Schlusspunkt für dieses Trauerspiel.",
                "Der Chef hat ernst gemacht. Meine Sachen sind gepackt, meine Karriere hier ist offiziell und endgültig beendet.",
                "Ein kalter Blick, ein kurzes Wort von HR, und das war's. Ich bin gefeuert. Wenigstens muss ich diesen Teppichboden nie wieder sehen."
            ]);
        } else if (endReason === "WIN") {
            p3 = pick([
                "Irgendwie habe ich es lebend bis 16:30 Uhr geschafft. Feierabend. Morgen geht der ganze Zirkus wieder von vorne los...",
                "Die Uhr springt auf Feierabend. Ich klappe den Laptop zu und flüchte. Ein weiterer Tag in der IT-Hölle wurde erfolgreich überlebt.",
                "Überlebt. Erschöpft, aber lebendig. Ich brauche jetzt dringend etwas, das weitaus stärker ist als Kaffee."
            ]);
        }

        // ==========================================
        // HTML ZUSAMMENBAUEN
        // ==========================================
        return `
            <details class='mt-6 group text-left'>
                <summary class='cursor-pointer list-none bg-slate-900 hover:bg-slate-800 border border-slate-700 p-3 rounded-lg flex justify-between items-center transition-colors shadow-sm'>
                    <span class='text-slate-300 font-bold uppercase tracking-widest text-xs flex items-center gap-2'>
                        <span class="text-xl">📖</span> 
                        Persönliches Logbuch lesen
                    </span>
                    <span class='text-slate-500 group-open:rotate-180 transition-transform duration-300'>▼</span>
                </summary>
                
                <div class='mt-2 p-5 bg-slate-950 border border-slate-800 border-l-4 border-l-slate-500 rounded-b-lg text-slate-300 italic font-serif text-sm shadow-inner relative'>
                    <div class="space-y-4">
                        <p class="leading-relaxed">"${p1}"</p>
                        ${p2 ? `<p class="leading-relaxed">"${p2}"</p>` : ''}
                        <p class="leading-relaxed font-bold text-white border-t border-slate-800 pt-3">"${p3}"</p>
                    </div>
                </div>
            </details>
        `;
    },

    // --- SCHWARZES BRETT ---
    openBoard: function() {
        const modal = document.getElementById('board-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    },

    closeBoard: function() {
        const modal = document.getElementById('board-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    },
    
    triggerMorningMood: function() {
        // Fallback, falls die Kategorie in der data.js fehlt
        if (!DB.moods || DB.moods.length === 0) {
            this.reset();
            return;
        }
        
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
     
    // --- SPEICHERSTAND EXPORT / IMPORT SYSTEM ---

    // Hilfsfunktion: Prüfsumme berechnen (gegen Tippfehler)
    calculateChecksum: function(str) {
        let a = 1, b = 0;
        for (let i = 0; i < str.length; i++) {
            a = (a + str.charCodeAt(i)) % 65521;
            b = (b + a) % 65521;
        }
        return (b << 16 | a).toString(16);
    },

    // EXPORT: Generiert den Code
    exportSaveGame: function() {
        // 1. Daten sammeln
        // Wir holen das aktuelle Archiv aus dem State UND den Tutorial-Status aus dem LocalStorage
        const data = {
            arc: this.state.archive, // Enthält jetzt Items, Achievements UND Reputation
            // Falls du 'tutorialSeen' oder 'layer8_tutorial' nutzt (bitte Key prüfen!)
            tut: localStorage.getItem('tutorialSeen') || "false", 
            salt: Math.floor(Math.random() * 999999) // Macht den Code einzigartig
        };

        try {
            // 2. JSON Stringify
            const jsonString = JSON.stringify(data);

            // 3. Base64 Encoding (UTF-8 Safe für Emojis 🏆)
            const base64 = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
            }));

            // 4. Prüfziffer berechnen
            const checksum = this.calculateChecksum(base64);

            // 5. Code zurückgeben: "BASE64-CHECKSUM"
            return `${base64}-${checksum}`;

        } catch (e) {
            console.error("Export Error:", e);
            return null;
        }
    },

    // IMPORT: Liest den Code und überschreibt Daten
    importSaveGame: function() {
        // Promt für Code-Eingabe
        const codeString = prompt("Bitte den Speicher-Code hier einfügen:");
        if (!codeString) return;

        try {
            // 1. Format prüfen
            const parts = codeString.trim().split("-");
            if (parts.length !== 2) throw new Error("Format ungültig.");

            const base64 = parts[0];
            const checksum = parts[1];

            // 2. Prüfziffer validieren
            if (this.calculateChecksum(base64) !== checksum) {
                throw new Error("Code ist beschädigt oder falsch kopiert.");
            }

            // 3. Decoding
            const jsonString = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const data = JSON.parse(jsonString);

            // 4. Validierung: Ist das Archiv vorhanden?
            if (!data.arc || !Array.isArray(data.arc.items)) {
                throw new Error("Keine gültigen Archiv-Daten gefunden.");
            }

            // 5. Wiederherstellen
            // A) Archiv in LocalStorage schreiben
            localStorage.setItem('layer8_archive', JSON.stringify(data.arc));
            
            // B) Tutorial Status wiederherstellen (falls vorhanden)
            if (data.tut) {
                localStorage.setItem('tutorialSeen', data.tut);
            }

            alert("✅ Import erfolgreich! Die Seite wird neu geladen.");
            location.reload(); // Wichtig: Neustart erzwingen, damit init() die neuen Daten lädt

        } catch (e) {
            console.error(e);
            alert("❌ Fehler: " + e.message);
        }
    },
    
    // UI-Helper für den Export-Button (Kopieren in Zwischenablage)
    triggerExportUI: function() {
        const code = this.exportSaveGame();
        if(code) {
            // Versuch, es direkt in die Zwischenablage zu kopieren
            navigator.clipboard.writeText(code).then(() => {
                alert("💾 Code in die Zwischenablage kopiert!\n(Bewahre ihn sicher auf)");
            }).catch(() => {
                // Fallback, falls Clipboard blockiert ist
                prompt("Dein Speicher-Code (bitte kopieren):", code);
            });
        } else {
            alert("Fehler beim Erstellen des Backups.");
        }
    },

    // Hilfsfunktion: Prüfsumme berechnen (Robuster Fix mit >>> 0)
    calculateChecksum: function(str) {
        let a = 1, b = 0;
        for (let i = 0; i < str.length; i++) {
            a = (a + str.charCodeAt(i)) % 65521;
            b = (b + a) % 65521;
        }
        // >>> 0 erzwingt eine vorzeichenlose 32-Bit-Ganzzahl (wichtig für Hex-Vergleich!)
        return ((b << 16 | a) >>> 0).toString(16);
    },

    // --- UI HELPER FÜR SAVEGAME ---
    ui: {
        // Öffnet das Export Fenster
        openExportModal: function() {
            const modal = document.getElementById('save-export-modal');
            const area = document.getElementById('export-area');
            const msg = document.getElementById('export-msg');
            
            // Code generieren
            const code = engine.exportSaveGame();
            area.value = code || "Fehler beim Erstellen.";
            msg.style.opacity = '0'; // Reset Message

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        },

        // Öffnet das Import Fenster
        openImportModal: function() {
            const modal = document.getElementById('save-import-modal');
            const area = document.getElementById('import-area');
            const msg = document.getElementById('import-msg');

            area.value = ""; // Leeren
            msg.style.opacity = '0'; 
            msg.innerText = "";

            modal.classList.remove('hidden');
            modal.classList.add('flex');
        },

        // Schließt beide Fenster
        closeModals: function() {
            document.getElementById('save-export-modal').classList.add('hidden');
            document.getElementById('save-export-modal').classList.remove('flex');
            document.getElementById('save-import-modal').classList.add('hidden');
            document.getElementById('save-import-modal').classList.remove('flex');
        },

        // Kopier-Funktion
        copyToClipboard: function() {
            const area = document.getElementById('export-area');
            const msg = document.getElementById('export-msg');

            area.select();
            area.setSelectionRange(0, 99999); 

            navigator.clipboard.writeText(area.value).then(() => {
                msg.innerText = "Code kopiert!";
                msg.className = "text-xs text-green-500 font-bold transition-opacity";
                msg.style.opacity = '1';
                setTimeout(() => { msg.style.opacity = '0'; }, 2000);
            }).catch(err => {
                msg.innerText = "Fehler beim Kopieren.";
                msg.className = "text-xs text-red-500 font-bold transition-opacity";
                msg.style.opacity = '1';
            });
        },

        // Import-Funktion (ROBUST & GEFIXT)
        performImport: function() {
            const area = document.getElementById('import-area');
            const msg = document.getElementById('import-msg');
            
            // 1. Säubern: Leerzeichen vorne/hinten und unsichtbare Zeichen entfernen
            let code = area.value.trim().replace(/[\u200B-\u200D\uFEFF]/g, '');

            if (!code) {
                msg.innerText = "Bitte Code eingeben!";
                msg.className = "text-xs text-red-500 font-bold transition-opacity";
                msg.style.opacity = '1';
                return;
            }

            try {
                let base64, checksum;

                // 2. STRATEGIE: Trennen am '--' (Neues Format)
                if (code.includes('--')) {
                    const parts = code.split('--');
                    base64 = parts[0];
                    checksum = parts[1];
                } 
                // 3. FALLBACK: Trennen am letzten '-' (Altes Format oder manuell bearbeitet)
                else if (code.includes('-')) {
                    const lastDash = code.lastIndexOf('-');
                    base64 = code.substring(0, lastDash);
                    checksum = code.substring(lastDash + 1);
                } else {
                    throw new Error("Format ungültig (Kein Trennzeichen gefunden).");
                }

                // Checksumme prüfen
                const calcedSum = engine.calculateChecksum(base64);
                if (calcedSum !== checksum) {
                    console.error("Checksum Mismatch:", calcedSum, "vs", checksum);
                    throw new Error("Code beschädigt (Prüfsumme falsch).");
                }

                // Decoding
                const jsonString = decodeURIComponent(atob(base64).split('').map(c => 
                    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                ).join(''));

                const data = JSON.parse(jsonString);

                // Validierung
                if (!data.arc || !Array.isArray(data.arc.items)) {
                    throw new Error("Datenstruktur fehlerhaft.");
                }

                // Speichern
                localStorage.setItem('layer8_archive', JSON.stringify(data.arc));
                if (data.tut) localStorage.setItem('tutorialSeen', data.tut);

                msg.innerText = "Erfolg! Neustart...";
                msg.className = "text-xs text-green-500 font-bold transition-opacity";
                msg.style.opacity = '1';

                setTimeout(() => location.reload(), 800);

            } catch (e) {
                console.error(e);
                msg.innerText = "Ungültiger Code!";
                msg.className = "text-xs text-red-500 font-bold transition-opacity";
                msg.style.opacity = '1';
            }
        }
    },

    // --- REPORT SYSTEM ---

    openReportModal: function() {
        const modal = document.getElementById('report-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    },

    closeReportModal: function() {
        const modal = document.getElementById('report-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    },

    sendReportMail: function() {
        try {
            // --- CONFIG ---
            const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc2uwIVCYnmsQ_MpJNpXjc7kX7DlXoHYXMUUZwAWjwrtTHJDg/viewform";
            const IDS = {
                cat: "entry.1431680664",
                desc: "entry.1740494219",
                debug: "entry.1066861594"
            };

            // --- INPUTS LESEN ---
            const catVal = document.getElementById('report-category')?.value || "Unbekannt";
            const descVal = document.getElementById('report-desc')?.value || "";

            // --- STATE DATEN ---
            const s = this.state || {}; 
            const min = s.time || 480;
            const hh = Math.floor(min / 60).toString().padStart(2, '0');
            const mm = (min % 60).toString().padStart(2, '0');
            const prettyTime = `${hh}:${mm} Uhr`;
            const invList = (s.inventory && s.inventory.length > 0) ? s.inventory.join(', ') : "(leer)";
            const diff = s.difficulty || "Normal";

            // --- LETZTES EVENT ERMITTELN ---
            let lastEventID = "Keine Daten";
            if (s.activeEvent?.id) lastEventID = s.activeEvent.id + " (Aktiv)";
            else if (s.currentPhoneEvent?.id) lastEventID = s.currentPhoneEvent.id + " (Phone)";
            else if (s.storyFlags && Object.keys(s.storyFlags).length > 0) {
                const flags = Object.keys(s.storyFlags);
                lastEventID = flags[flags.length - 1] + " (Letztes Flag)";
            }

            // --- LOG FEED (DIE LETZTEN 600 ZEICHEN) ---
            const logEl = document.getElementById('log-feed');
            let logText = "(Log leer)";
            
            if (logEl && logEl.innerText.trim().length > 0) {
                let rawText = logEl.innerText;
                
                // slice(-600) nimmt exakt die ersten 600 Zeichen vom Ende des Textes
                if (rawText.length > 2000) {
                    rawText = rawText.substring(0, 2000) + "...";
                }
                
                // Zeilenumbrüche durch // ersetzen
                logText = rawText.replace(/[\r\n]+/g, " // ");
            }

            // --- ZUSAMMENBAUEN ---
            const logData = 
`=== STATUS ===
📍 Event:     ${lastEventID}
🕒 Zeit:      ${prettyTime}
💀 Diff:      ${diff}
📊 Stats:     F ${s.fl || 0}% | A ${s.al || 0}% | C ${s.cr || 0}%
🎒 Inv:       ${invList}
--- LOG FEED (NEUESTE EINTRÄGE) ---
${logText}
=====================`;

            // --- SENDEN ---
            const url = new URL(FORM_URL);
            url.searchParams.append(IDS.cat, catVal);
            url.searchParams.append(IDS.desc, descVal);
            url.searchParams.append(IDS.debug, logData);

            window.open(url.toString(), '_blank');
            this.closeReportModal();

        } catch (e) {
            console.error("Report Error:", e);
            alert("Fehler beim Öffnen des Formulars.");
        }
    },

    openSettings: function() {
        const modal = document.getElementById('settings-modal');
        const select = document.getElementById('setting-diff');
        
        if(select) select.value = localStorage.getItem('layer8_default_diff') || 'ask';
        
        // --- Toggles aktualisieren ---
        if(document.getElementById('setting-fx')) document.getElementById('setting-fx').checked = this.state.visualFX;
        if(document.getElementById('setting-oneclick')) document.getElementById('setting-oneclick').checked = this.state.oneClickItem;
        if(document.getElementById('setting-fastchat')) document.getElementById('setting-fastchat').checked = this.state.fastChat;
        
        // NEU: Blindflug & Audio
        if(document.getElementById('setting-blindstats')) document.getElementById('setting-blindstats').checked = this.state.blindStats;
        if(document.getElementById('setting-blindtickets')) document.getElementById('setting-blindtickets').checked = this.state.blindTickets;
        if(document.getElementById('setting-audio')) document.getElementById('setting-audio').checked = this.state.audioEffects;
        
        const resetBtn = document.getElementById('btn-hard-reset');
        if (resetBtn) {
            resetBtn.dataset.armed = "false";
            document.getElementById('text-hard-reset').innerText = "Spielstand löschen";
            document.getElementById('icon-hard-reset').className = "text-base grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all";
            resetBtn.className = "w-full text-left px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-500 rounded-lg transition-all text-red-400 text-sm font-medium flex items-center gap-3 group shadow-sm";
        }

        const mainView = document.getElementById('menu-main-view');
        const settingsView = document.getElementById('menu-settings-view');
        const title = document.getElementById('settings-title');
        
        if (mainView && settingsView && title) {
            mainView.classList.remove('hidden');
            settingsView.classList.add('hidden');
            title.innerText = 'MENÜ';
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    },

    toggleFX: function(isOn) {
        this.state.visualFX = isOn;
        localStorage.setItem('layer8_fx', isOn);
        this.updateUI();
    },
    toggleOneClick: function(isOn) {
        this.state.oneClickItem = isOn;
        localStorage.setItem('layer8_oneclick', isOn);
    },
    toggleFastChat: function(isOn) {
        this.state.fastChat = isOn;
        localStorage.setItem('layer8_fastchat', isOn);
    },
    toggleBlindStats: function(isOn) {
        this.state.blindStats = isOn;
        localStorage.setItem('layer8_blindstats', isOn);
        this.updateUI();
    },
    toggleBlindTickets: function(isOn) {
        this.state.blindTickets = isOn;
        localStorage.setItem('layer8_blindtickets', isOn);
        this.updateUI();
    },
    toggleAudio: function(isOn) {
        this.state.audioEffects = isOn;
        localStorage.setItem('layer8_audio', isOn);
        if(isOn) this.playAudio('ui');
    },

    // Blitzschneller Neustart ohne Page-Reload
    softReset: function() {
        // Alle Menüs schließen
        this.closeSettings();
        if (document.getElementById('modal-overlay')) {
            document.getElementById('modal-overlay').classList.add('hidden');
            document.getElementById('modal-overlay').classList.remove('flex');
        }

        // Timer abbrechen
        if (this.state.emailTimer) clearTimeout(this.state.emailTimer);
        if (this.state.bossTimer) clearTimeout(this.state.bossTimer);

        // Memory auf 08:00 Uhr setzen (Wir behalten den difficultyMult bei!)
        this.state.time = 8 * 60;
        this.state.fl = 0;
        this.state.al = 0;
        this.state.cr = 0;
        this.state.tickets = this.state.difficultyMult > 1.0 ? 2 : 0; // Montag startet mit 2 Tickets
        this.state.inventory = []; // Taschen werden am neuen Tag geleert
        this.state.usedIDs = new Set();
        this.state.usedEmails = new Set();
        this.state.morningMoodShown = false;
        this.state.lunchDone = false;
        this.state.ticketWarning = false;
        this.state.pendingEnd = null;
        this.state.coffeeConsumed = 0;
        this.state.emailsIgnored = 0;
        this.state.drunkEndTime = 0;
        this.state.activeEvent = false;
        this.state.isEmailOpen = false;
        this.state.emailPending = false;
        
        // UI Aufräumen (Phone, Email, Log)
        document.getElementById('email-modal')?.classList.add('hidden');
        document.getElementById('phone-app')?.classList.add('hidden');
        document.getElementById('phone-standby')?.classList.remove('hidden');
        document.getElementById('phone-notification')?.classList.add('hidden');
        
        const logFeed = document.getElementById('log-feed');
        if(logFeed) logFeed.innerHTML = "";
        this.state.lastLogMsg = "";
        this.log("System-Neustart initiiert...", "text-blue-400");
        
        // Spiel über den Morgen-Verteiler normal neu starten
        this.updateUI();
        this.reset();
    },

    closeSettings: function() {
        const modal = document.getElementById('settings-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    },

    saveDefaultDifficulty: function(val) {
        localStorage.setItem('layer8_default_diff', val);
        this.log(`Start-Modus geändert auf: ${val.toUpperCase()}`, "text-blue-400");
    },

    shareGame: function(btn) {
        const shareData = {
            title: 'Layer 8 Problem - Der SysAdmin Simulator',
            text: 'Ich versuche gerade als SysAdmin bei GlobalCorp zu überleben. Hilf mir oder mach es besser!',
            url: window.location.href
        };
        
        const textSpan = btn.querySelector('#text-share') || btn;
        const originalText = textSpan.innerText;

        if (navigator.share) {
            navigator.share(shareData).catch(err => console.log("Teilen abgebrochen:", err));
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                textSpan.innerText = "Link erfolgreich kopiert!";
                btn.classList.add('!bg-green-900/30', '!border-green-500', '!text-green-400');
                
                setTimeout(() => {
                    textSpan.innerText = originalText;
                    btn.classList.remove('!bg-green-900/30', '!border-green-500', '!text-green-400');
                }, 3000);
            }).catch(() => {
                textSpan.innerText = "Kopieren fehlgeschlagen.";
                textSpan.classList.add('text-red-400');
                setTimeout(() => {
                    textSpan.innerText = originalText;
                    textSpan.classList.remove('text-red-400');
                }, 3000);
            });
        }
    },

    triggerHardReset: function(btn) {
        if (btn.dataset.armed === "true") {
            // Schritt 2: Ausführen
            localStorage.removeItem('layer8_archive');
            localStorage.removeItem('layer8_default_diff');
            localStorage.removeItem('tutorialSeen');
            
            const textSpan = btn.querySelector('#text-hard-reset');
            textSpan.innerText = "System wird neu gestartet...";
            
            btn.className = "w-full text-left px-4 py-3 bg-red-600 border border-red-500 rounded-lg text-white text-sm font-bold flex justify-center items-center mt-2 shadow-md";
            
            setTimeout(() => location.reload(), 1000);
        } else {
            // Schritt 1: Scharfschalten
            btn.dataset.armed = "true";
            const textSpan = btn.querySelector('#text-hard-reset');
            const iconSpan = btn.querySelector('#icon-hard-reset');
            
            textSpan.innerText = "Bist du dir sicher?";
            iconSpan.className = "text-base"; 
            
            btn.className = "w-full text-left px-4 py-3 bg-red-950/30 border border-red-500 rounded-lg transition-all text-red-400 text-sm font-bold flex items-center gap-3 mt-2 animate-pulse shadow-sm";
            
            setTimeout(() => {
                if(btn.dataset.armed === "true") {
                    btn.dataset.armed = "false";
                    textSpan.innerText = "Spielstand löschen";
                    iconSpan.className = "text-base grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all";
                    btn.className = "w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-red-500 rounded-lg transition-all text-red-400 text-sm font-medium flex items-center gap-3 group shadow-sm";
                }
            }, 4000);
        }
    }
};

engine.init();

// Globaler Hotkey: ESC für das Menü
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modal = document.getElementById('settings-modal');
        if (modal) {
            // Wenn versteckt -> Öffnen, ansonsten -> Schließen
            if (modal.classList.contains('hidden')) {
                engine.openSettings();
            } else {
                engine.closeSettings();
            }
        }
    }
});
