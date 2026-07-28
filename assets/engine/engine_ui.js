import { DB } from '../../data.js';
import { platform } from '../../platform.js';

export const ui = {

    // --- NEWS TICKER ---
    checkForNews: function() {
        if (this.state.activeNewsText !== null) return;
        
        if (typeof DB === 'undefined' || !DB.newsTicker) return;

        // Cooldown: 90 Ingame-Minuten
        if (this.state.time - this.state.lastNewsTime < 90) return;

        // 5% Chance
        if (Math.random() <= 0.05) {
            const randomIndex = Math.floor(Math.random() * DB.newsTicker.length);
            this.state.activeNewsText = DB.newsTicker[randomIndex];
            this.state.lastNewsTime = this.state.time;
            this.renderHeader(); 
        }
    },

    renderHeader: function() {
        const header = document.getElementById('terminal-header-right');
        if (!header) return;

        if (this.state.activeNewsText) {
            header.style.opacity = '0';
            header.style.filter = 'blur(4px)';

            setTimeout(() => {
                // LOGIK-FIX: Nutzt jetzt einfach w-full, da der Parent in der index.html die volle Breite erlaubt!
                header.innerHTML = `
                    <style>
                        @keyframes newsScroll {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-100%); }
                        }
                    </style>
                    <div class="w-full h-4 overflow-hidden flex items-center" style="-webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent); mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);">
                        <div class="whitespace-nowrap inline-block" style="padding-left: 100%; animation: newsScroll 30s linear forwards;">
                            <span class="text-amber-500 font-bold mr-2">[GLOBAL CORP BROADCAST]</span>
                            <span class="text-slate-300 font-normal uppercase tracking-wide">${this.state.activeNewsText}</span>
                        </div>
                    </div>
                `;
                
                header.style.opacity = '1';
                header.style.filter = 'blur(0px)';

                if (this.state.newsTimer) clearTimeout(this.state.newsTimer);
                this.state.newsTimer = setTimeout(() => {
                    header.style.opacity = '0';
                    header.style.filter = 'blur(4px)';
                    
                    setTimeout(() => {
                        this.state.activeNewsText = null;
                        this.renderHeader();
                        header.style.opacity = '1';
                        header.style.filter = 'blur(0px)';
                    }, 500); 
                }, 30000); // 30 Sekunden Laufzeit

            }, 500);

        } else {
            // Standard Ansicht
            header.innerHTML = `TicketSystem ${this.VERSION}`;
        }
    },
    // -------------------

    // --- CORE ---
    updateUI: function() {
		
        // --- AUTOMATISCHE INVENTAR-SORTIERUNG ---
        this.state.inventory.sort((a, b) => {
            let itemA = DB.items[a.id];
            let itemB = DB.items[b.id];
            
            // Fallback, falls ein Item (warum auch immer) nicht in der DB ist
            if (!itemA) return 1;
            if (!itemB) return -1;

            // Prioritäten definieren
            const getPrio = (item, id) => {
                if (id === 'stressball' || !item.keep) return 1; // Prio 1: Cooldowns & Verbrauch
                if (item.keep && !item.quest) return 2;          // Prio 2: Werkzeuge
                return 3;                                        // Prio 3: Quest-Items/Trophäen
            };

            let prioA = getPrio(itemA, a.id);
            let prioB = getPrio(itemB, b.id);

            // Nach Priorität sortieren (kleinere Zahl = weiter vorne)
            return prioA - prioB;
        });
        // ----------------------------------------------
		
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
                else if (['energy', 'donut', 'sandwich', 'chocolate', 'bubble_wrap'].includes(itemData.id)) {
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
        this.updatePhoneVisibility();
    },
    
    // --- VISUELLES FEEDBACK: ITEM FLIEGT IN DEN RUCKSACK ---
    animateItemToBackpack: function(imgUrl) {
        if (!imgUrl) return;

        // Das Ziel: Dein Rucksack-Button in der Navigation
        const target = document.getElementById('btn-inventory'); 
        if (!target) return;

        // 1. Positionen berechnen
        const targetRect = target.getBoundingClientRect();

        // Ziel-Mittelpunkt (Mitte des Rucksack-Buttons)
        const targetX = targetRect.left + (targetRect.width / 2);
        const targetY = targetRect.top + (targetRect.height / 2);

        // Start-Mittelpunkt (ca. 60px direkt über dem Rucksack)
        const startX = targetX;
        const startY = targetY - 60;

        // 2. Geist-Bild erstellen
        const ghost = document.createElement('img');
        ghost.src = imgUrl;
        // Etwas flüssigere Dauer (z.B. duration-500 oder 700)
        ghost.className = 'fixed w-16 h-16 z-[9999] object-contain pointer-events-none transition-all duration-1000 ease-in-out';
        
        // Zentriert auf den Startpunkt setzen
        ghost.style.left = (startX - 32) + 'px'; 
        ghost.style.top = (startY - 32) + 'px';
        ghost.style.opacity = '1';
        ghost.style.transform = 'scale(1) translateY(0)';

        document.body.appendChild(ghost);

        // Reflow erzwingen, damit der Startpunkt vom Browser registriert wird
        void ghost.offsetWidth; 

        // 3. Animation starten
        setTimeout(() => {
            // Bewegt sich 60px nach unten (genau auf den Button), skaliert runter und wird unsichtbar
            ghost.style.opacity = '0'; 
            ghost.style.transform = `translateY(60px) scale(0.1)`;
        }, 10);

        // 4. Aufräumen & Rucksack wackeln lassen
        ghost.addEventListener('transitionend', () => {
            ghost.remove();
            target.classList.add('scale-110', 'brightness-125', 'transition-all');
            setTimeout(() => target.classList.remove('scale-110', 'brightness-125'), 300);
        });
    },
    
    updatePhoneVisibility: function() {
        const phone = document.getElementById('smartphone'); 
        if (!phone) return;

        // Das Handy wird gebraucht, wenn ein Phone-Event aktiv in Bearbeitung ist
        let isPhoneActive = this.state.currentPhoneEvent && this.state.activeEvent;

        if (this.state.autoHidePhone && !isPhoneActive) {
            // FIX: 'flex' entfernen, damit 'hidden' auch wirklich funktioniert!
            phone.classList.remove('flex');
            phone.classList.add('hidden', 'lg:flex'); 
        } else {
            // Wieder normal anzeigen
            phone.classList.remove('hidden', 'lg:flex');
            phone.classList.add('flex');
        }
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

        // 1. ZEIT (Als erstes Element anzeigen)
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
    
    showModal: function(title, text, isEnd) {
        const overlay = document.getElementById('modal-overlay');
        const content = document.getElementById('modal-content');
        
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        document.body.classList.add('overflow-hidden');
        
        let btnAction = 'location.reload()';
        let btnText = 'NEUSTART';
        
        if(!isEnd && !title.includes("QUIT") && !title.includes("GEFEUERT") && !title.includes("FEIERABEND") && !title.includes("GALA VORBEI")) {
             btnAction = 'engine.closeModal()';
             btnText = 'VERSTANDEN';
        }
        
        // --- Dynamische Farbgebung für Text UND Rahmen ---
        let titleColor = "text-red-500"; 
        let themeColor = "border-red-600"; // Standard: Rot
        
        if (title.includes("FEIERABEND")) {
            titleColor = "text-green-500";
            themeColor = "border-green-500";
        } else if (title.includes("GALA VORBEI")) {
            titleColor = "text-pink-500";
            themeColor = "border-pink-500";
        } else if (title.includes("VENTIL") || title.includes("RAGE")) {
            titleColor = "text-orange-500";
            themeColor = "border-orange-500";
        }

        // Aktualisiert die Box-Klassen mit der korrekten Rahmenfarbe
        content.className = `max-w-xl w-full bg-slate-900 border-2 ${themeColor} p-8 rounded-xl text-center shadow-2xl max-h-[90vh] overflow-y-auto`;

        // 1:1 dein Original HTML-Aufbau für den Inhalt!
        content.innerHTML = `
            <h1 class="text-4xl font-black ${titleColor} mb-4">${title}</h1>
            <div class="text-lg text-slate-300 mb-8 italic">${text}</div>
            <button onclick="${btnAction}" class="bg-white text-black px-8 py-3 rounded font-bold uppercase hover:bg-slate-200 shadow-lg">
                ${btnText}
            </button>
        `;
    },
    
    closeModal: function() {
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('modal-overlay').classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
        this.updateUI();
    },

    showEnd: function(title, text, isWin) {
        this.showModal(title, text, true);
    },
    
    // --- AUSREDEN SYSTEM ---
    openExcuseModal: function() {
        if (this.state.excusesLeft <= 0) return;
        
        const modal = document.getElementById('excuse-modal');
        const textEl = document.getElementById('excuse-text');
        
        if (modal && textEl) {
            // Zufällige Ausrede holen aus DB.excuses
            let randomExcuse = "Sorry, mein Router hat einen schlechten Tag.";
            if (DB.excuses && DB.excuses.length > 0) {
                randomExcuse = DB.excuses[Math.floor(Math.random() * DB.excuses.length)];
            }
            
            textEl.innerText = `"${randomExcuse}"`;
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    },

    closeExcuseModal: function() {
        const modal = document.getElementById('excuse-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        }
    },

    confirmExcuse: function() {
        if (this.state.excusesLeft <= 0) {
            this.closeExcuseModal();
            return;
        }

        this.state.excusesLeft--;
        
        if (this.state.currentEventId && this.state.usedIDs.has(this.state.currentEventId)) {
            this.state.usedIDs.delete(this.state.currentEventId);
        }
        
        this.closeExcuseModal();
        this.log("Ausrede erfolgreich! Du bist entkommen.", "text-blue-400 italic");
        
        // Zurück zum Idle
        this.state.activeEvent = false;
        this.disableButtons(false);
        const term = document.getElementById('terminal-content');
        if(term) {
            term.className = "flex-1 flex flex-col justify-center items-center text-center opacity-40";
            term.innerHTML = `<div class="text-6xl mb-4">🖥️</div><h1 class="text-2xl font-bold">SYSTEM BEREIT</h1><p>Wähle eine Aktion unten.</p>`;
        }
        
        this.updateSteamStatus('system');
        this.updateUI();
    },
    
    // --- ARCHIV UI (Sammelalbum) ---
    openArchive: function() {
        const modal = document.getElementById('archive-modal');
        const content = document.getElementById('archive-content');
        
        // Modal anzeigen
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');

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

                // --- BILD ODER ICON LOGIK ---
                let iconContent = "";
                let imgContainerClass = "";

                if (ach.img) {
                    iconContent = `<img src="${ach.img}" class="w-full h-full object-contain drop-shadow-md" alt="${title}">`;
                    // Kein Hintergrund, kein Rand, aber starker Pop-Out-Hover-Effekt (wie beim Team)
                    imgContainerClass = "w-12 h-12 shrink-0 relative z-10 transition-transform duration-300 ease-out origin-center cursor-help md:hover:scale-[2.5] md:hover:z-50";
                } else {
                    iconContent = ach.icon;
                    // Fallback für Emojis: Mit grauem Kreis
                    imgContainerClass = "text-2xl shrink-0 transition-transform duration-300 ease-out origin-center cursor-help flex items-center justify-center w-12 h-12 bg-slate-900 rounded-full border border-slate-700/50 p-1 md:hover:scale-[1.5] md:hover:z-50";
                }

                html += `
                    <div class="flex gap-3 p-3 rounded border ${borderClass} ${bgClass} transition-all hover:bg-slate-800 group relative">
                        
                        <div class="${imgContainerClass}">
                            ${iconContent}
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
        document.body.classList.remove('overflow-hidden');
    },
    
    // --- LORE SYSTEM ---
    showLoreModal: function() {
        const oldModal = document.getElementById('lore-modal');
        if(oldModal) oldModal.remove();

        const html = `
            <div id="lore-modal" class="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4 fade-in">
                <div class="bg-[#fdf6e3] rounded-lg max-w-3xl w-full max-h-[85vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] border-8 border-[#5d4037] relative text-[#3e2723] font-serif">
                    
                    <div class="bg-[#3e2723] p-6 text-center border-b-4 border-[#8d6e63] relative overflow-hidden">
                        <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('assets/img/textures/wood-pattern.png')]"></div>
                        <h2 class="text-3xl font-bold text-[#d7ccc8] uppercase tracking-[0.2em] mb-1 relative z-10">GlobalCorp Chronik</h2>
                        <span class="text-sm text-[#a1887f] italic font-serif relative z-10">"Tradition seit 1899. Wir verwalten das Chaos."</span>
                    </div>

                    <div class="overflow-y-auto p-10 space-y-12 text-lg leading-relaxed bg-[url('assets/img/textures/cream-paper.png')]">
                        
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
                        <button onclick="document.getElementById('lore-modal').remove(); document.body.classList.remove('overflow-hidden');" class="bg-[#5d4037] hover:bg-[#3e2723] text-[#fdf6e3] px-10 py-3 rounded shadow-lg font-bold uppercase tracking-wider transition-transform hover:scale-105 border-2 border-[#8d6e63]">
                            Buch schließen (und vergessen)
                        </button>
                    </div>

                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', html);
        document.body.classList.add('overflow-hidden');
    },

    // --- TEAM / CHARAKTERE ---
    openTeam: function() {
        const modal = document.getElementById('team-modal');
        const grid = document.getElementById('team-grid');
        document.body.classList.add('overflow-hidden');
        grid.innerHTML = '';
     
        DB.chars.forEach(char => {
            const card = document.createElement('div');
            card.className = "bg-slate-800 p-4 rounded-lg border border-slate-700 flex flex-col gap-3 relative group hover:border-slate-500 transition-colors overflow-visible"; 
            
            // Prüfen, ob es der Spieler ist
            const isPlayer = char.name.includes("Müller") || char.role === "SysAdmin";

            // --- NEU: DER ABMAHNUNGS-STEMPEL ---
            let warningStampHTML = "";
            // Prüfen: Ist es Müller UND hat er die Abmahnung (warningReceived) schon kassiert?
            if (isPlayer && this.state.warningReceived) {
                warningStampHTML = `
                <div class="absolute top-2 right-2 md:right-4 transform rotate-12 pointer-events-none z-50">
                    <span class="inline-block border-[3px] border-red-600 text-red-600 font-black text-lg md:text-xl tracking-widest uppercase px-2 py-0.5 rounded opacity-90 shadow-md bg-slate-900/80 backdrop-blur-sm">
                        ABGEMAHNT
                    </span>
                </div>`;
            }
            // -----------------------------------

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
                ${warningStampHTML} <div class="flex gap-4 items-start z-10">
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
        document.body.classList.remove('overflow-hidden');
    },

    // --- INTRANET SYSTEM ---
    openIntranet: function() {
        const modal = document.getElementById('intranet-modal');
        // iFrame bei jedem Öffnen auf die Startseite zurücksetzen (Optional, aber gut)
        const frame = document.getElementById('intranet-frame');
        if(frame) frame.src = "assets/intranet/index.html"; 
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closeIntranet: function() {
        const modal = document.getElementById('intranet-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
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
    
    triggerShake: function(a, c) {
        if (!this.state.screenShake) return;
        // Wackelt nur, wenn eine Entscheidung massive Auswirkungen (>30) hat
        if (a >= 30 || c >= 30) {
            document.body.classList.remove('animate-shake');
            void document.body.offsetWidth; // Force Reflow (damit die Animation neu startet)
            document.body.classList.add('animate-shake');
            
            setTimeout(() => {
                document.body.classList.remove('animate-shake');
            }, 500);
        }
    },
    
    playBootSequence: function(callback) {
        this.playAudio('boot');
        this.state.activeEvent = true;
        this.disableButtons(true);

        const term = document.getElementById('terminal-content');
        
        // Etwas weicheres, aber immer noch retro-mäßiges Design (Emerald statt grellem Grün)
        term.className = "flex-1 flex flex-col items-start justify-center p-8 w-full min-h-full bg-slate-950 text-emerald-400 font-mono text-sm md:text-base overflow-hidden border border-slate-800 rounded-xl shadow-inner";
        term.innerHTML = "";

        // Weniger "Nerd-Linux", mehr "GlobalCorp Satire"
        const bootLines = [
            `GlobalCorp OS - Version ${this.VERSION}`,
            `Copyright (c) 1999-2026 GlobalCorp International Synergy GmbH & Co. KGaA`,
            `----------------------------------------------`,
            "Verbinde mit Serverraum (Keller)... [OK]",
            "Prüfe Kaffeemaschinen-Netzwerk... [WARNUNG: LEER]",
            "Lade Ausreden-Datenbank (Modul 42)... [OK]",
            "Synchronisiere Chef-Radar... [OK]",
            "Ignoriere wartende User-Anfragen: 4.815... [ERLEDIGT]",
            "Initialisiere TicketSystem... Viel Glück."
        ];

        let i = 0;
        
        const printLine = () => {
            if (i < bootLines.length) {
                term.innerHTML += `<div class="fade-in mb-1">> ${bootLines[i]}</div>`;
                i++;
                // Verlangsamt: Zwischen 300 und 600 Millisekunden pro Zeile
                setTimeout(printLine, 300 + Math.random() * 300);
            } else {
                // Am Ende 1,5 Sekunden stehen lassen, damit man den letzten Satz in Ruhe lesen kann
                setTimeout(() => {
                    this.state.activeEvent = false;
                    this.disableButtons(false);
                    if (callback) callback();
                }, 1500);
            }
        };

        printLine();
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
            document.body.classList.add('overflow-hidden');
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
            document.body.classList.add('overflow-hidden');
        },

        // Schließt beide Fenster
        closeModals: function() {
            document.getElementById('save-export-modal').classList.add('hidden');
            document.getElementById('save-export-modal').classList.remove('flex');
            document.getElementById('save-import-modal').classList.add('hidden');
            document.getElementById('save-import-modal').classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
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

                // --- NEU: SICHERER MERGE ---
                // Holt das aktuelle, fehlerfreie 3.1+ Archiv-Gerüst
                const currentTemplate = JSON.parse(JSON.stringify(engine.state.archive));
                // Verschmilzt das alte Savegame schonend mit dem neuen Gerüst
                const mergedArchive = engine.deepMerge(currentTemplate, data.arc);

                // Speichern des reparierten/gemergten Archivs
                localStorage.setItem(engine.KEYS.archive, JSON.stringify(mergedArchive));

                // Only ever raise the tutorial flag, never lower it.
                // data.tut is the STRING "false" for players who skipped the
                // tutorial, and a non-empty string is truthy — a plain
                // `if (data.tut)` would reset the flag on every import.
                if (data.tut === 'true') localStorage.setItem(engine.KEYS.tutorialDone, 'true');

                if (data.party_easy) localStorage.setItem(engine.KEYS.partyPlayed.easy, data.party_easy);
                if (data.party_normal) localStorage.setItem(engine.KEYS.partyPlayed.normal, data.party_normal);
                if (data.party_hard) localStorage.setItem(engine.KEYS.partyPlayed.hard, data.party_hard);

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
    
    // Closes the game. A browser tab cannot reliably close itself, so the
    // button that calls this is web-hidden anyway.
    quitGame: function() {
        platform.quit();
    },

    // Opens a link outside the game. On desktop this goes through the main
    // process so it lands in the Steam overlay instead of a blank Electron window.
    openExternal: function(url) {
        platform.openExternal(url);
    },

    // Fullscreen is handled by the shell. In a browser the user has F11,
    // so the button that calls this is hidden there anyway.
    toggleFullscreen: function() {
        platform.fullscreen();
    },

    openGlobalStats: function() {
        this.closeSettings();

        const modal = document.getElementById('global-stats-modal');
        const content = document.getElementById('global-stats-content');
        if (!modal || !content) return;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
        content.innerHTML = '<div class="text-center text-slate-400 animate-pulse py-10 font-mono text-sm">Verbinde mit Steam-Servern...</div>';

        platform.globalStats()
            .then(data => this.renderGlobalStats(data))
            .catch(() => {
                content.innerHTML = '<div class="text-center text-red-500 py-10 font-bold">Fehler beim Abrufen der Daten.</div>';
            });
    },

    closeGlobalStats: function() {
        const modal = document.getElementById('global-stats-modal');
        if (!modal) return;
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    },

    renderGlobalStats: function(globalData) {
        const content = document.getElementById('global-stats-content');
        
        // Hole die lokalen Stats als Basis
        const s = this.state.archive.stats || {};
        const started = s.daysStarted || 0;
        const surv = s.daysSurvived || 0;
        const rage = s.daysRageQuit || 0;
        const fired = s.daysFired || 0;

        // --- NEU: SICHERHEITSNETZ FÜR 'UNDEFINED' ---
        // Wenn Steam noch keine aggregierten Daten hat (undefined) oder leer antwortet
        if (!globalData || typeof globalData !== 'object' || Object.keys(globalData).length === 0) {
            content.innerHTML = `
                <div class="text-center py-12 px-4 fade-in">
                    <div class="text-5xl mb-4 opacity-50">📡</div>
                    <h3 class="text-lg font-bold text-slate-300 mb-2">Daten werden noch gesammelt</h3>
                    <p class="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                        Die Steam-Server berechnen die weltweiten Statistiken aktuell noch.<br><br>
                        <span class="text-xs opacity-70 italic">Diese Anzeige aktualisiert sich in der Regel einmal täglich. Schau später noch einmal vorbei!</span>
                    </p>
                    <button onclick="engine.closeGlobalStats()" class="mt-8 bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 px-8 rounded-lg transition-colors uppercase tracking-widest text-xs">Zurück</button>
                </div>
            `;
            return;
        }

        // Helfer zum Auslesen der Steam-Zahlen (Bulletproof für verschiedene API Formate)
        const getStat = (name) => {
            let val = globalData[name];
            if (val === undefined || val === null) return 0;
            if (typeof val === 'object' && val.total !== undefined) return parseInt(val.total) || 0;
            return parseInt(val) || 0;
        };
        
        const gStart = getStat('stat_started');
        const gSurv = getStat('stat_survived');
        const gRage = getStat('stat_ragequit');
        const gFired = getStat('stat_fired');

        // --- Nur beendete Tage als Basis nehmen! ---
        const totalCompleted = surv + rage + fired;
        const gTotalCompleted = gSurv + gRage + gFired;
        
        // --- BERECHNUNG DER QUOTEN (%) ---
        const mySurvRate = totalCompleted > 0 ? (surv / totalCompleted) : 0;
        const gSurvRate = gTotalCompleted > 0 ? (gSurv / gTotalCompleted) : 0;
        
        const myRageRate = totalCompleted > 0 ? (rage / totalCompleted) : 0;
        const gRageRate = gTotalCompleted > 0 ? (gRage / gTotalCompleted) : 0;
        
        const myFiredRate = totalCompleted > 0 ? (fired / totalCompleted) : 0;
        const gFiredRate = gTotalCompleted > 0 ? (gFired / gTotalCompleted) : 0;

        const formatRate = (rate) => (isNaN(rate) ? 0 : Math.round(rate * 100)) + '%';
        const fmt = (num) => Number(num).toLocaleString('de-DE');

        // --- DIE DIAGNOSE (Spielstil-Analyse) ---
        let diffSurv = mySurvRate - gSurvRate;
        let diffRage = myRageRate - gRageRate;
        let diffFired = myFiredRate - gFiredRate;
        
        let diagnosisTitle = "";
        let diagnosisText = "";
        let diagnosisColor = "";

        if (diffRage > diffSurv && diffRage > diffFired && myRageRate > 0) {
            diagnosisTitle = "🧨 Diagnose: Choleriker";
            diagnosisText = "Deine Zündschnur ist messbar kürzer als die der meisten. Du neigst extrem zum Rage Quit. Kauf dir mehr Stressbälle!";
            diagnosisColor = "text-orange-400";
        } else if (diffFired > diffSurv && diffFired > diffRage && myFiredRate > 0) {
            diagnosisTitle = "🎯 Diagnose: Chef-Magnet";
            diagnosisText = "Du ziehst Kündigungen geradezu magisch an. Im weltweiten Vergleich pfuschst du deutlich riskanter als andere.";
            diagnosisColor = "text-red-500";
        } else if (diffSurv > diffRage && diffSurv > diffFired && mySurvRate > 0) {
            diagnosisTitle = "💼 Diagnose: Firmen-Inventar";
            diagnosisText = "Wahnsinn. Du hältst den Büro-Alltag länger durch als der Großteil der restlichen Welt. Respekt (und Beileid).";
            diagnosisColor = "text-emerald-400";
        } else {
            diagnosisTitle = "⚖️ Diagnose: Durchschnitts-Admin";
            diagnosisText = "Dein Leidensweg und deine Entscheidungen entsprechen fast exakt dem weltweiten IT-Standard.";
            diagnosisColor = "text-blue-400";
        }

        const survComment = mySurvRate >= gSurvRate ? 'Du bist resistenter gegen den Wahnsinn als der Rest.' : 'Für dich ist "Feierabend" eher ein theoretisches Konzept.';
        const rageComment = myRageRate >= gRageRate ? 'Dein Monitor fliegt öfter aus dem Fenster als beim globalen Schnitt.' : 'Erstaunlich. Du rastest seltener aus als andere ITler.';
        const firedComment = myFiredRate >= gFiredRate ? 'Du kassierst Kündigungen weitaus enthusiastischer als andere.' : 'Du fliegst extrem elegant unter dem Radar des Managements.';

        let html = `
            <div class="bg-slate-800/50 border border-slate-700 p-4 rounded-xl shadow-inner mb-4">
                <h3 class="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 border-b border-slate-700 pb-2">
                    Kumulierte Steam-Werte (Weltweit)
                </h3>
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono">
                    <div><div class="text-[10px] text-slate-500 uppercase tracking-widest">Begonnen</div><div class="text-xl font-bold text-white">${fmt(gStart)}</div></div>
                    <div><div class="text-[10px] text-slate-500 uppercase tracking-widest">Überlebt</div><div class="text-xl font-bold text-emerald-400">${fmt(gSurv)}</div></div>
                    <div><div class="text-[10px] text-slate-500 uppercase tracking-widest">Rage Quits</div><div class="text-xl font-bold text-orange-400">${fmt(gRage)}</div></div>
                    <div><div class="text-[10px] text-slate-500 uppercase tracking-widest">Gefeuert</div><div class="text-xl font-bold text-red-500">${fmt(gFired)}</div></div>
                </div>
            </div>

            <div class="bg-slate-800/50 border border-slate-700 p-4 sm:p-5 rounded-xl shadow-inner">
                
                <div class="bg-slate-900 border border-slate-700 rounded-lg p-3 mb-6 shadow-md relative overflow-hidden">
                    <div class="font-bold text-sm mb-1 ${diagnosisColor}">${diagnosisTitle}</div>
                    <div class="text-xs text-slate-300 italic leading-snug">"${diagnosisText}"</div>
                </div>

                <h3 class="text-xs font-bold text-purple-400 uppercase tracking-widest mb-5 border-b border-slate-700 pb-2 flex items-center justify-between">
                    <span>Dein SysAdmin-Profil</span>
                    <span class="text-[9px] text-slate-500 font-normal hidden sm:inline">Der weiße Strich zeigt den weltweiten Durchschnitt.</span>
                </h3>
                
                <div class="space-y-5">
                    <div class="flex flex-col gap-1.5">
                        <div class="flex justify-between text-xs font-bold">
                            <span class="text-emerald-400 flex items-center gap-1"><span class="text-sm">✨</span> Überlebens-Tendenz</span>
                            <span class="text-slate-300 font-mono">Du: <span class="text-white">${formatRate(mySurvRate)}</span> | Welt: ${formatRate(gSurvRate)}</span>
                        </div>
                        <div class="w-full bg-slate-900 h-3 rounded-full overflow-hidden flex relative border border-slate-700">
                            <div class="absolute top-0 bottom-0 w-1 bg-white z-10 shadow-[0_0_5px_rgba(255,255,255,0.8)]" style="left: ${gSurvRate * 100}%; margin-left:-2px;"></div>
                            <div class="bg-emerald-500 h-full transition-all duration-1000" style="width: ${mySurvRate * 100}%"></div>
                        </div>
                        <div class="text-[10px] text-slate-400 italic mt-0.5">${survComment}</div>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <div class="flex justify-between text-xs font-bold">
                            <span class="text-orange-400 flex items-center gap-1"><span class="text-sm">🤬</span> Rage-Quit-Tendenz</span>
                            <span class="text-slate-300 font-mono">Du: <span class="text-white">${formatRate(myRageRate)}</span> | Welt: ${formatRate(gRageRate)}</span>
                        </div>
                        <div class="w-full bg-slate-900 h-3 rounded-full overflow-hidden flex relative border border-slate-700">
                            <div class="absolute top-0 bottom-0 w-1 bg-white z-10 shadow-[0_0_5px_rgba(255,255,255,0.8)]" style="left: ${gRageRate * 100}%; margin-left:-2px;"></div>
                            <div class="bg-orange-500 h-full transition-all duration-1000" style="width: ${myRageRate * 100}%"></div>
                        </div>
                        <div class="text-[10px] text-slate-400 italic mt-0.5">${rageComment}</div>
                    </div>

                    <div class="flex flex-col gap-1.5">
                        <div class="flex justify-between text-xs font-bold">
                            <span class="text-red-500 flex items-center gap-1"><span class="text-sm">🚨</span> Kündigungs-Tendenz</span>
                            <span class="text-slate-300 font-mono">Du: <span class="text-white">${formatRate(myFiredRate)}</span> | Welt: ${formatRate(gFiredRate)}</span>
                        </div>
                        <div class="w-full bg-slate-900 h-3 rounded-full overflow-hidden flex relative border border-slate-700">
                            <div class="absolute top-0 bottom-0 w-1 bg-white z-10 shadow-[0_0_5px_rgba(255,255,255,0.8)]" style="left: ${gFiredRate * 100}%; margin-left:-2px;"></div>
                            <div class="bg-red-600 h-full transition-all duration-1000" style="width: ${myFiredRate * 100}%"></div>
                        </div>
                        <div class="text-[10px] text-slate-400 italic mt-0.5">${firedComment}</div>
                    </div>
                </div>
            </div>
            
            <div class="w-full">
                <button onclick="engine.closeGlobalStats()" class="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-lg transition-colors uppercase tracking-widest text-xs">Zurück</button>
            </div>
        `;
        content.innerHTML = html;
    },

    triggerHardReset: function(btn) {
        if (btn.dataset.armed === "true") {
            // Step 2: execute.
            // This used to remove a non-existent 'tutorialSeen' key, which meant a
            // hard reset wiped the archive but left the tutorial marked as done.
            localStorage.removeItem(engine.KEYS.archive);
            localStorage.removeItem(engine.KEYS.defaultDiff);
            localStorage.removeItem(engine.KEYS.tutorialDone);
            localStorage.removeItem(engine.KEYS.partyPlayed.easy);
            localStorage.removeItem(engine.KEYS.partyPlayed.normal);
            localStorage.removeItem(engine.KEYS.partyPlayed.hard);

            // Push the emptied state to cloud storage as well, otherwise the
            // next launch would pull the old archive straight back in.
            engine.state.archive = { items: [], achievements: [], achievementDiffs: {}, reputation: {}, stats: { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 } };
            platform.save(engine.buildCloudPayload());
            
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
    },
    
    openSettings: function() {
        const modal = document.getElementById('settings-modal');
        const select = document.getElementById('setting-diff');
        
        document.body.classList.add('overflow-hidden');
        
        if(select) select.value = localStorage.getItem(engine.KEYS.defaultDiff) || 'ask';
        
        // --- Toggles aktualisieren ---
        if(document.getElementById('setting-fx')) document.getElementById('setting-fx').checked = this.state.visualFX;
        if(document.getElementById('setting-oneclick')) document.getElementById('setting-oneclick').checked = this.state.oneClickItem;
        if(document.getElementById('setting-fastchat')) document.getElementById('setting-fastchat').checked = this.state.fastChat;
        if(document.getElementById('setting-blindstats')) document.getElementById('setting-blindstats').checked = this.state.blindStats;
        if(document.getElementById('setting-blindtickets')) document.getElementById('setting-blindtickets').checked = this.state.blindTickets;
        if(document.getElementById('setting-audio')) document.getElementById('setting-audio').checked = this.state.audioEffects;
        if(document.getElementById('setting-volume')) document.getElementById('setting-volume').value = this.state.audioVolume;
		if(document.getElementById('setting-music')) document.getElementById('setting-music').checked = this.state.musicEnabled;
        if(document.getElementById('setting-music-volume')) document.getElementById('setting-music-volume').value = this.state.musicVolume;
        if(document.getElementById('setting-autohide')) document.getElementById('setting-autohide').checked = this.state.autoHidePhone;
        if(document.getElementById('setting-compact')) document.getElementById('setting-compact').checked = this.state.compactMode;
        if(document.getElementById('setting-shake')) document.getElementById('setting-shake').checked = this.state.screenShake;
        const styleSelect = document.getElementById('setting-music-style'); if(styleSelect) styleSelect.value = this.state.musicStyle;
        
        // --- Soft-Reset Button Logik (Ausgrauen im Hauptmenü & Schwierigkeits-Wahl) ---
        const softResetBtn = document.getElementById('btn-soft-reset');
        const introModal = document.getElementById('intro-modal');
        const diffModal = document.getElementById('difficulty-modal');
        
        if (softResetBtn) {
            // Prüfen, ob das Intro, das Schwierigkeits-Modal oder das Tutorial gerade aktiv ist
            const isIntroOpen = introModal && introModal.style.display !== 'none';
            const isDiffOpen = diffModal && (diffModal.style.display === 'flex' || !diffModal.classList.contains('hidden'));
            const isTutorialActive = typeof tutorial !== 'undefined' && tutorial.isActive;

            if (isIntroOpen || isDiffOpen || isTutorialActive) {
                // Sperren
                softResetBtn.classList.add('opacity-40', 'pointer-events-none', 'grayscale');
                softResetBtn.disabled = true; 
            } else {
                // Freigeben
                softResetBtn.classList.remove('opacity-40', 'pointer-events-none', 'grayscale');
                softResetBtn.disabled = false; 
            }
        }
        // -------------------------------------------------------------
        
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
    
    closeSettings: function() {
        const modal = document.getElementById('settings-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    },

    toggleFX: function(isOn) {
        this.state.visualFX = isOn;
        localStorage.setItem('layer8_fx', isOn);
        this.updateUI();
    },
    
    toggleShake: function(isOn) {
        this.state.screenShake = isOn;
        localStorage.setItem('layer8_shake', isOn);
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
	toggleShowHotkeys: function(isOn) {
        this.state.showHotkeys = isOn;
        localStorage.setItem('layer8_showhotkeys', isOn);
        this.renderHotkeys(); // Aktualisiert die 4 Hauptbuttons sofort
    },
	    
    toggleAutoHidePhone: function(isOn) {
        this.state.autoHidePhone = isOn;
        localStorage.setItem('layer8_autohidephone', isOn);
        this.updatePhoneVisibility();
    },
    
    toggleCompactMode: function(isOn) {
        this.state.compactMode = isOn;
        localStorage.setItem('layer8_compact', isOn);
        if (isOn) {
            document.body.classList.add('compact-mode');
        } else {
            document.body.classList.remove('compact-mode');
        }
    },
    
    saveDefaultDifficulty: function(val) {
        localStorage.setItem(engine.KEYS.defaultDiff, val);
        this.log(`Start-Modus geändert auf: ${val.toUpperCase()}`, "text-blue-400");
    },

    shareGame: function(btn) {
        // Desktop hands out the store page, the browser its own URL.
        const shareUrl = platform.shareUrl();

        const shareData = {
            title: 'Layer8Problem - Der SysAdmin Simulator',
            text: 'Ich versuche gerade als SysAdmin bei GlobalCorp zu überleben. Hilf mir oder mach es besser!',
            url: shareUrl
        };
        
        const textSpan = btn.querySelector('#text-share') || btn;
        const originalText = textSpan.innerText;

        if (navigator.share) {
            navigator.share(shareData).catch(err => console.log("Teilen abgebrochen:", err));
        } else {
            navigator.clipboard.writeText(shareUrl).then(() => {
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
    
    // --- KEYBINDING FUNKTIONEN ---
    startBindingKey: function(action) {
        if (this.state.isBindingKey) return;

        this.state.isBindingKey = true;
        this.state.actionToBind = action;
        let btn = document.getElementById('bind-' + action);
        if (btn) {
            btn.innerText = "Drücke Taste...";
            btn.className = "bg-amber-500 text-black px-4 py-2 rounded-lg font-bold text-xs uppercase animate-pulse shadow-lg";
            btn.blur(); 
        }
    },

    finishBindingKey: function(key) {
        const forbiddenKeys = ['shift', 'control', 'alt', 'meta', 'capslock', 'tab'];
        // NEU: Die hartcodierten Tasten für Fallbacks
        const hardcodedKeys = ['4', '5', '6']; 
        
        if (forbiddenKeys.includes(key.toLowerCase())) return;

        let pressedKey = key === " " ? "Space" : key;
        const currentBind = this.state.keyBinds[this.state.actionToBind];
        
        // 1. Abbruch mit Escape oder derselben Taste
        if (key.toLowerCase() === 'escape' || (currentBind && currentBind.toLowerCase() === pressedKey.toLowerCase())) {
            this.state.isBindingKey = false;
            this.state.actionToBind = null;
            this.updateSettingsUI();
            return;
        }

        // --- NEU: Sperre für 4, 5 und 6 mit visuellem Feedback ---
        if (hardcodedKeys.includes(pressedKey)) {
            let conflictBtn = document.getElementById('bind-' + this.state.actionToBind);
            if (conflictBtn) {
                conflictBtn.classList.remove('bg-slate-800', 'border-slate-600', 'text-slate-300');
                conflictBtn.classList.add('bg-red-600', 'border-red-500', 'text-white', 'animate-shake');
                conflictBtn.innerText = "RESERVIERT"; // Optischer Hinweis
                
                setTimeout(() => {
                    conflictBtn.classList.remove('bg-red-600', 'border-red-500', 'text-white', 'animate-shake');
                    conflictBtn.classList.add('bg-amber-500', 'text-black'); // Zurück zum gelben "Warte"-Design
                    conflictBtn.innerText = "Drücke Taste...";
                }, 800);
            }
            return; // Abbrechen, aber im Bind-Modus bleiben!
        }
        // ---------------------------------------------------------
        
        // 2. Doppelbelegung verhindern
        for (let act in this.state.keyBinds) {
            if (this.state.keyBinds[act].toLowerCase() === pressedKey.toLowerCase() && act !== this.state.actionToBind) {
                let conflictBtn = document.getElementById('bind-' + act);
                if (conflictBtn) {
                    conflictBtn.classList.remove('bg-slate-800', 'border-slate-600', 'text-slate-300');
                    conflictBtn.classList.add('bg-red-600', 'border-red-500', 'text-white', 'animate-shake');
                    
                    setTimeout(() => {
                        conflictBtn.classList.remove('bg-red-600', 'border-red-500', 'text-white', 'animate-shake');
                        conflictBtn.classList.add('bg-slate-800', 'border-slate-600', 'text-slate-300');
                    }, 500);
                }
                return;
            }
        }

        // 3. Erfolgreich speichern
        this.state.keyBinds[this.state.actionToBind] = pressedKey;
        this.state.isBindingKey = false;
        this.state.actionToBind = null;
        this.saveSystem(); 
        this.updateSettingsUI();
    },

    updateSettingsUI: function() {
        for (let act in this.state.keyBinds) {
            let btn = document.getElementById('bind-' + act);
            if (btn) {
                let displayKey = this.state.keyBinds[act];
                if(displayKey.startsWith('Arrow')) displayKey = displayKey.replace('Arrow', '');
                
                btn.innerText = displayKey.toUpperCase();
                btn.className = "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 px-4 py-2 rounded-lg font-bold text-xs uppercase transition-colors min-w-[80px]";
            }
        }
        this.renderHotkeys();
    },
    
    openKeybinds: function() {
        this.updateSettingsUI();
        
        if(document.getElementById('setting-showhotkeys')) {
            document.getElementById('setting-showhotkeys').checked = this.state.showHotkeys;
        }
        
        document.getElementById('keybind-modal').classList.remove('hidden');
        document.getElementById('keybind-modal').classList.add('flex');
    },

    closeKeybinds: function() {
        this.state.isBindingKey = false;
        document.getElementById('keybind-modal').classList.add('hidden');
        document.getElementById('keybind-modal').classList.remove('flex');
    },
    
    resetKeybinds: function() {
        // Auf Standard zurücksetzen
        this.state.keyBinds = { actCoffee: 'q', actQuest: 'w', actServer: 'e', actCall: 'r', opt1: '1', opt2: '2', opt3: '3', confirm: 'Space' };
        this.state.isBindingKey = false;
        this.state.actionToBind = null;
        
        this.saveSystem();
        this.updateSettingsUI();
        this.playAudio('ui');
        
        // Visuelles Feedback: Alle Buttons blinken kurz grün auf
        const buttons = document.querySelectorAll('[id^="bind-"]');
        buttons.forEach(btn => {
            btn.classList.add('!bg-green-900/40', '!border-green-500', '!text-green-400');
            setTimeout(() => {
                btn.classList.remove('!bg-green-900/40', '!border-green-500', '!text-green-400');
            }, 600);
        });
    },
	
    // --- NEU: VISUELLE HOTKEYS RENDERN ---
    renderHotkeys: function() {
        const map = {
            'actCoffee': 'btn-coffee',
            'actQuest': 'btn-sidequest',
            'actServer': 'btn-server',
            'actCall': 'btn-calls'
        };

        for (let [act, btnId] of Object.entries(map)) {
            let btn = document.getElementById(btnId);
            if (btn) {
                
                // Prüfen, ob schon ein Badge existiert
                let kbd = btn.querySelector('.hotkey-badge');
                
                // --- NEU: Wenn deaktiviert, Badge löschen und überspringen ---
                if (!this.state.showHotkeys) {
                    if (kbd) kbd.remove();
                    continue;
                }
                // -------------------------------------------------------------
                
                // Button auf 'relative' setzen für die absolute Positionierung des Badges
                btn.classList.add('relative');
                
                if (!kbd) {
                    kbd = document.createElement('kbd');
                    // Styling: Oben rechts in die Ecke, leicht transparent
                    kbd.className = 'hotkey-badge absolute top-1 right-1.5 text-[8px] md:text-[9px] font-mono text-slate-400 bg-slate-900 border border-slate-700 px-1 rounded shadow-sm opacity-80 pointer-events-none';
                    btn.appendChild(kbd);
                }
                
                // Den Buchstaben formatieren (z.B. "ArrowUp" -> "UP", "Space" -> "SPACE")
                let displayKey = this.state.keyBinds[act];
                if(displayKey.startsWith('Arrow')) displayKey = displayKey.replace('Arrow', '');
                
                kbd.innerText = displayKey.toUpperCase();
            }
        }
        
        // --- DYNAMISCHE BUTTONS (Terminal, E-Mail, Handy) LIVE UPDATEN ---
        const updateBadges = (containerId) => {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            let optIndex = 1;
            const buttons = container.querySelectorAll('button');
            buttons.forEach(btn => {
                // Weiter-Buttons überspringen
                if (btn.innerText.includes('WEITER') || btn.innerText.includes('MITTAGS')) return;

                let kbd = btn.querySelector('kbd');
                
                // 1. Wenn Hotkeys AUS sind -> Löschen
                if (!this.state.showHotkeys) {
                    if (kbd) kbd.remove();
                } 
                // 2. Wenn Hotkeys AN sind -> Updaten oder Erstellen
                else {
                    let key = "";
                    if (optIndex === 1) key = this.state.keyBinds.opt1;
                    else if (optIndex === 2) key = this.state.keyBinds.opt2;
                    else if (optIndex === 3) key = this.state.keyBinds.opt3;
                    else if (optIndex === 4) key = "4";
                    else if (optIndex === 5) key = "5";
                    else if (optIndex === 6) key = "6";

                    if (key) {
                        if(key.startsWith('Arrow')) key = key.replace('Arrow', '');
                        
                        if (kbd) {
                            kbd.innerText = key.toUpperCase(); // Nur Text updaten
                        } else {
                            // Badge existiert nicht? Neu erschaffen!
                            kbd = document.createElement('kbd');
                            // Standard-Klasse für Terminal/Phone
                            kbd.className = "shrink-0 text-[9px] bg-slate-900 border border-slate-600 px-1.5 py-0.5 rounded text-slate-400 font-mono shadow-inner group-hover:text-white transition-colors";
                            
                            // Email-Sonderfarbe
                            if (containerId === 'email-actions') {
                                kbd.className = "shrink-0 text-[9px] bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded text-slate-500 font-mono shadow-inner group-hover:text-blue-400 transition-colors";
                            }
                            
                            kbd.innerText = key.toUpperCase();
                            
                            // In den rechten Container packen
                            const rightDiv = btn.querySelector('div.shrink-0.flex.items-center');
                            if (rightDiv) rightDiv.appendChild(kbd);
                        }
                    }
                }
                optIndex++;
            });
        };

        updateBadges('terminal-content');
        updateBadges('app-actions');
        updateBadges('email-actions');
    },
    
    // --- REPORT SYSTEM ---

    openReportModal: function() {
        const modal = document.getElementById('report-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closeReportModal: function() {
        const modal = document.getElementById('report-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
    },

    sendReportMail: function() {
        try {
            // --- CONFIG ---
            // WICHTIG: Aus /viewform am Ende wird /formResponse !
            const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSc2uwIVCYnmsQ_MpJNpXjc7kX7DlXoHYXMUUZwAWjwrtTHJDg/formResponse";
            const IDS = {
                cat: "entry.1431680664",
                desc: "entry.1740494219",
                debug: "entry.1066861594"
            };

            // --- INPUTS LESEN ---
            const catVal = document.getElementById('report-category')?.value || "Unbekannt";
            const descVal = document.getElementById('report-desc')?.value || "";

            // Leere Beschreibung abfangen (Optional, aber gut)
            if (descVal.trim() === "") {
                alert("Bitte gib eine kurze Beschreibung ein.");
                return;
            }

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
                if (rawText.length > 2000) rawText = rawText.substring(0, 2000) + "...";
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

            // --- UI FEEDBACK START (Button manipulieren) ---
            const sendBtn = document.querySelector('#report-modal button.bg-blue-600');
            let originalText = "";
            if (sendBtn) {
                originalText = sendBtn.innerHTML;
                sendBtn.innerHTML = "<span>⏳</span> Sende...";
                sendBtn.disabled = true;
                sendBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }

            // --- PAYLOAD BAUEN ---
            const formData = new URLSearchParams();
            formData.append(IDS.cat, catVal);
            formData.append(IDS.desc, descVal);
            formData.append(IDS.debug, logData);

            // --- SILENT POST REQUEST (Der magische No-Cors Trick) ---
            fetch(FORM_URL, {
                method: 'POST',
                mode: 'no-cors', // Verhindert Sicherheits-Blockaden vom Browser
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            }).then(() => {
                // UI Erfolgsmeldung
                if (sendBtn) {
                    sendBtn.innerHTML = "<span>✅</span> Gesendet!";
                    sendBtn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
                    sendBtn.classList.add('!bg-green-600');
                }
                
                // Nach 1.5 Sekunden: Fenster zu und aufräumen
                setTimeout(() => {
                    this.closeReportModal();
                    
                    if (sendBtn) {
                        sendBtn.innerHTML = originalText;
                        sendBtn.disabled = false;
                        sendBtn.classList.remove('opacity-50', 'cursor-not-allowed', '!bg-green-600');
                        sendBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
                    }
                    // Textfeld für den nächsten Report leeren
                    document.getElementById('report-desc').value = "";
                    
                }, 1500);

            }).catch((err) => {
                console.error("Fetch Error:", err);
                alert("Fehler beim Senden. Bitte prüfe deine Internetverbindung.");
                if (sendBtn) {
                    sendBtn.innerHTML = originalText;
                    sendBtn.disabled = false;
                    sendBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                }
            });

        } catch (e) {
            console.error("Report Error:", e);
            alert("Ein unerwarteter Fehler ist aufgetreten.");
        }
    },

};
