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
        emailTimer: null,
        emailTimeout: null,
        coffeeConsumed: 0,
        emailsIgnored: 0,
        spamClicked: 0,
        usedEmails: new Set(),
        isEmailOpen: false,
		
		// Speichert das Ende, damit wir es verzögert anzeigen können
        pendingEnd: null,

        // Aktive Items
        lastStressballTime: -100,
    },

    init: function() {
        document.getElementById('intro-modal').style.display = 'flex';
        this.updateUI();
        this.log("System v40.0 geladen. Warte auf User...");
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

    // --- E-MAIL LOGIK ---
    checkRandomEmail: function() {
        if(this.state.isEmailOpen) return;
        if(typeof tutorial !== 'undefined' && tutorial.isActive) return;

        // Basis-Chance hängt vom Schwierigkeitsgrad ab
        // Montag (1.5) = Höhere Wahrscheinlichkeit für Mails
        let baseChance = 0.2 * this.state.difficultyMult; 
        
        let chance = baseChance + (this.state.tickets * 0.05); 
        if(Math.random() < chance) {
            setTimeout(() => { this.triggerEmail(); }, 1500);
        }
    },

    triggerEmail: function() {
        if(!DB.emails) return; 
        
        let availableEmails = DB.emails.filter(e => !this.state.usedEmails.has(e.subj));
        if(availableEmails.length === 0) {
            this.state.usedEmails.clear(); 
            availableEmails = DB.emails;
        }
        let email = availableEmails[Math.floor(Math.random() * availableEmails.length)];
        this.state.usedEmails.add(email.subj);

        const overlay = document.getElementById('email-overlay');
        const timerBar = document.getElementById('email-timer-bar');
        const actionContainer = document.getElementById('email-actions');
        
        document.getElementById('email-sender').innerText = email.sender;
        document.getElementById('email-subject').innerText = email.subj;
        if(email.body) {
             document.getElementById('email-subject').innerText += "\n\n" + email.body;
        }
        
        actionContainer.innerHTML = '';
        if(email.opts) {
            email.opts.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = "bg-blue-600 hover:bg-blue-500 text-white text-xs py-2 px-3 rounded text-left transition-colors";
                btn.innerText = "➤ " + opt.btn;
                btn.onclick = () => this.resolveEmail(opt, false);
                actionContainer.appendChild(btn);
            });
        }
        
        overlay.style.display = 'flex';
        this.state.isEmailOpen = true;
        
        // ÄNDERUNG: Timer könnte man am Montag auch kürzer machen (optional, hier noch Standard 15s)
        const DURATION = 15000; 
        const UPDATE_RATE = 50; 
        let timePassed = 0;

        if(timerBar) timerBar.style.width = '100%';
        if(this.state.emailInterval) clearInterval(this.state.emailInterval);

        this.state.emailInterval = setInterval(() => {
            timePassed += UPDATE_RATE;
            let percentLeft = 100 - ((timePassed / DURATION) * 100);
            if(timerBar) timerBar.style.width = percentLeft + '%';

            if(timePassed >= DURATION) {
                this.resolveEmail(null, true); 
            }
        }, UPDATE_RATE);
    },

    resolveEmail: function(opt, timeout = false) {
        clearInterval(this.state.emailInterval);
        document.getElementById('email-overlay').style.display = 'none';
        this.state.isEmailOpen = false;
        
        if(timeout) {
            // Strafe für Ignorieren wird auch multipliziert am Montag
            let penalty = Math.ceil(10 * this.state.difficultyMult);
            this.log(`E-MAIL IGNORIERT! Radar +${penalty}`, "text-red-500 font-bold");
            this.state.cr += penalty;
            this.state.emailsIgnored++;
        } else if(opt) {
            this.log("E-Mail: " + opt.txt, "text-blue-400");
            
            // ÄNDERUNG: Multiplikator anwenden
            let mult = this.state.difficultyMult;
            
            // Negative Effekte (Aggro/Radar steigt) werden verstärkt
            // Positive Effekte (Abbau) bleiben gleich
            let addF = opt.f; 
            let addA = opt.a > 0 ? Math.ceil(opt.a * mult) : opt.a; 
            let addC = opt.c > 0 ? Math.ceil(opt.c * mult) : opt.c; 

            this.state.fl += (addF || 0);
            this.state.al += (addA || 0);
            this.state.cr += (addC || 0);
        }
        
        this.updateUI();
		
		// NEU: Wenn die E-Mail dich gekillt hat, sofort beenden
        if (this.state.pendingEnd) {
            this.finishGame();
        }
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
        
        // Zeige die ersten 5 Items
        for(let i=0; i < 5; i++) {
            let itemData = this.state.inventory[i];
            let slot = document.createElement('div');
            
            if(itemData) {
                let dbItem = DB.items[itemData.id];
                // Basis-Klasse (wichtig: relative für Overlay)
                slot.className = 'inv-slot relative group'; 
                slot.innerText = dbItem ? dbItem.icon : '?';
                slot.title = dbItem ? dbItem.name : 'Unbekannt';

                // --- SPEZIAL LOGIK AUCH HIER ---
                
                // A) Stressball
                if (itemData.id === 'stressball') {
                    let isReady = (this.state.time - this.state.lastStressballTime >= 60);
                    if(isReady) {
                        slot.className += ' cursor-pointer border-green-500 hover:bg-green-900/20';
                        // Grüner Punkt
                        slot.innerHTML += `<div class="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>`;
                        slot.onclick = () => this.useItem('stressball');
                        slot.title += " (Benutzen)";
                    } else {
                        // Cooldown Overlay (etwas kleiner für Mini-View)
                        let wait = 60 - (this.state.time - this.state.lastStressballTime);
                        slot.innerHTML += `
                            <div class="absolute inset-0 bg-slate-900/70 rounded flex items-center justify-center z-10 backdrop-blur-[1px]">
                                <span class="font-bold text-white text-xs select-none">${wait}</span>
                            </div>
                        `;
                    slot.onclick = () => this.log(`Der Ball ist noch völlig plattgedrückt. Gib ihm Zeit, sich zu entfalten. (${wait} Min)`, "text-slate-500");
                    }
                }
                // B) Verbrauchsgüter (Direkt benutzen)
                else if (itemData.id === 'energy' || itemData.id === 'donut') {
                    slot.className += ' cursor-pointer border-blue-500 hover:bg-blue-900/20';
                    slot.onclick = () => this.useItem(itemData.id);
                    slot.title += " (verwenden)";
                }
                // C) Normale Items (Öffnen das große Inventar)
                else {
                    slot.onclick = () => this.openInventory();
                }

            } else {
                slot.className = 'inv-slot empty';
            }
            invGrid.appendChild(slot);
        }

        if(this.state.inventory.length > 5) {
            let diff = this.state.inventory.length - 5;
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
        
        // MACGYVER (Fix: Items angepasst, die es wirklich gibt)
        // Prüfe: Tape, Schraubendreher, Kabel, Handbuch
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
        
        // QUESTS
        if(this.state.inventory.find(i => i.id === 'kevin_ram') && !this.hasAch('ach_mentor')) {
            this.unlockAchievement('ach_mentor', '👨‍👦 Der Mentor', 'Du hast Kevin gerettet. Er wird es nie vergessen (leider).');
        }

        if(this.state.inventory.find(i => i.id === 'contract') && !this.hasAch('ach_wolf')) {
            this.unlockAchievement('ach_wolf', '📈 Wolf of Wall Street', 'Du hast den Chef besiegt. 500€ mehr Gehalt!');
        }
    },

    hasAch: function(id) { return this.state.achievements.includes(id); },

    unlockAchievement: function(id, title, text) {
        this.state.achievements.push(id); 
        this.state.achievedTitles.push(title);
        const container = document.getElementById('achievement-container');
        if(container) {
            const toast = document.createElement('div');
            toast.className = 'achievement-toast';
            toast.innerHTML = `<div class="ach-icon">🏆</div><div class="ach-text"><span class="ach-title">${title}</span><br><span class="ach-desc">${text}</span></div>`;
            container.appendChild(toast);
            setTimeout(() => { toast.remove(); }, 5000);
        }
        this.log(`ERFOLG: ${title}`, "text-yellow-400 font-bold");
    },

    trigger: function(type) {
        if(this.state.activeEvent) return;
        if (type === 'sidequest') { this.handleSideQuest(); return; }
        if(Math.random() < 0.05 && type !== 'calls') { this.triggerBossFight(); return; }

        let pool = DB[type].filter(ev => !this.state.usedIDs.has(ev.id));
        if (pool.length === 0) { this.renderTerminal(DB.special.empty_pool, type); return; }
        
        let ev = pool[Math.floor(Math.random() * pool.length)];
        this.renderTerminal(ev, type);
    },

    triggerBossFight: function() {
        // Filtere alle Bosse, die noch nicht dran waren
        let pool = DB.bossfights.filter(ev => !this.state.usedIDs.has(ev.id));
        
        // Wenn alle Bosse besiegt sind, passiert nichts (oder man könnte pool = DB.bossfights machen für Reset)
        if(pool.length === 0) return; 

        // --- HIER WAR DER FEHLER ---
        // Alt: let boss = pool[0];  <-- Das hat immer den ersten in der Liste genommen (Ransomware)
        
        // Neu: Zufälligen Boss aus dem verbleibenden Pool wählen
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
        let pool = DB.sidequests.filter(ev => !this.state.usedIDs.has(ev.id));
        if (pool.length === 0) { this.log("Gerade nichts los."); return; }

        let ev = pool[Math.floor(Math.random() * pool.length)];

        if (ev.kind === 'phone') {
            this.state.activeEvent = true;
            this.state.currentPhoneEvent = ev;
            this.state.usedIDs.add(ev.id);
            this.disableButtons(true);
            document.getElementById('phone-notification').classList.remove('hidden');
            document.getElementById('phone-notification').classList.add('flex');
            this.log("Handy: " + ev.title);
        } else {
            this.renderTerminal(ev, 'sidequest');
        }
    },

    renderTerminal: function(ev, type) {
        this.state.activeEvent = true;
        if(ev.id) this.state.usedIDs.add(ev.id); 
        this.disableButtons(true);
        const term = document.getElementById('terminal-content');
        this.renderEventHTML(ev, type, term);
    },

    renderEventHTML: function(ev, type, container) {
        let color = type === 'calls' ? 'text-blue-400' : (type === 'boss' ? 'text-red-500' : 'text-amber-400');
        let icon = type === 'boss' ? '🚨' : (type === 'calls' ? '📞' : '⚡');

        let html = `
            <div class="w-full max-w-xl text-left fade-in">
                <div class="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
                    <span class="text-2xl">${icon}</span>
                    <span class="${color} font-bold uppercase tracking-widest">${type}</span>
                </div>
                <h2 class="text-xl font-bold text-white mb-4">${ev.title}</h2>
                <div class="bg-slate-900/50 p-4 rounded border-l-4 border-slate-600 mb-6 italic text-slate-300 text-sm">
                    "${ev.text}"
                </div>
                <div class="space-y-2">
        `;

        ev.opts.forEach(opt => {
            let locked = false;
            let btnClass = "choice-btn group";
            let missingText = "";

            if (opt.req) {
                // 1. Grund-Check: Habe ich das Item?
                let hasItem = this.state.inventory.find(i => i.id === opt.req && !i.used);
                
                // 2. Spezial-Check: Stressball Cooldown
                let onCooldown = false;
                if (opt.req === 'stressball') {
                    // Wenn weniger als 60 Min vergangen sind -> Cooldown aktiv
                    if (this.state.time - this.state.lastStressballTime < 60) {
                        onCooldown = true;
                    }
                }

                // Wenn Item fehlt ODER Cooldown aktiv ist -> Sperren
                if (!hasItem || onCooldown) {
                    locked = true;
                    btnClass += " locked";
                    
                    let itemName = DB.items[opt.req] ? DB.items[opt.req].name : opt.req;
                    
                    // Text unterscheiden
                    if (!hasItem) {
                        missingText = `(Fehlt: ${itemName})`;
                    } else if (onCooldown) {
                        // Zeige Restzeit an
                        let wait = 60 - (this.state.time - this.state.lastStressballTime);
                        missingText = `(Platt: ${wait}m)`;
                    }
                }
            }

            let safeRes = opt.r.replace(/'/g, "\\'");
            let lootItem = opt.loot || "";
            let usedItem = opt.req || ""; 

            let clickAction = type === 'boss' 
                ? `clearInterval(engine.state.bossTimer); document.getElementById('boss-timer-container').style.display='none'; engine.resolveTerminal('${safeRes}', ${opt.m}, ${opt.f}, ${opt.a}, ${opt.c}, '${lootItem}', '${usedItem}', '${type}')`
                : `engine.resolveTerminal('${safeRes}', ${opt.m}, ${opt.f}, ${opt.a}, ${opt.c}, '${lootItem}', '${usedItem}', '${type}')`;

            html += `
                <button onclick="${locked ? '' : clickAction}" 
                    class="${btnClass}" ${locked ? 'disabled' : ''}>
                    <span class="font-bold text-slate-300 ${locked ? 'opacity-50' : 'group-hover:text-white'}">
                        ➤ ${opt.t} <span class="text-xs text-red-500">${missingText}</span>
                    </span>
                    <span class="text-xs text-slate-500 bg-black/30 px-2 rounded">+${opt.m}m</span>
                </button>
            `;
        });

        html += `</div></div>`;
        container.innerHTML = html;
        container.className = "flex-1 flex flex-col p-4";
    },

resolveTerminal: function(res, m, f, a, c, loot, usedItem, type) {
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

        // Items Logic
        if(loot && loot !== "") {
            if(!this.state.inventory.find(i => i.id === loot)) {
                this.state.inventory.push({ id: loot, used: false });
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
        const content = document.getElementById('app-content');
        content.innerHTML += `<div class="chat-bubble chat-in">${node.text}</div>`;
        const actions = document.getElementById('app-actions');
        actions.innerHTML = '';
        node.opts.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = "bg-blue-600 hover:bg-blue-500 text-white p-2 rounded text-[10px] font-bold mb-1 w-full";
            btn.innerText = opt.t;
            btn.onclick = () => this.handlePhoneChoice(opt.t, opt.next);
            actions.appendChild(btn);
        });
        
        // AUTO SCROLL
        setTimeout(() => {
            content.scrollTop = content.scrollHeight;
        }, 100);
    },

    handlePhoneChoice: function(text, nextId) {
        const actions = document.getElementById('app-actions');
        
        // --- FIX: SPAM-SCHUTZ ---
        // Prüfen, ob Buttons überhaupt noch da sind. 
        // Wenn leer, wurde schon geklickt -> Abbruch!
        if (!actions || actions.innerHTML.trim() === '') return;

        // Sofort die Buttons entfernen, damit kein zweiter Klick möglich ist
        actions.innerHTML = '';
        // ------------------------

        const content = document.getElementById('app-content');
        content.innerHTML += `<div class="chat-bubble chat-out">${text}</div>`;
        
        content.scrollTop = content.scrollHeight;

        let ev = this.state.currentPhoneEvent;
        
        // Prüfung ob nextId existiert
        let validNext = (ev.results && ev.results[nextId]) || (ev.nodes && ev.nodes[nextId]);
        
        if (!validNext) {
            console.error("Missing Node:", nextId);
            content.innerHTML += `<div class="chat-system text-red-500">Verbindung abgebrochen.</div>`;
            // actions.innerHTML = ''; // Nicht mehr nötig, da oben schon geleert
            setTimeout(() => {
                this.closePhone();
                this.state.activeEvent = false;
                this.disableButtons(false);
            }, 2000);
            return;
        }

        if (ev.results && ev.results[nextId]) {
            let res = ev.results[nextId];
            
            // Loot Logic
            if(res.loot && !this.state.inventory.find(i => i.id === res.loot)) {
                this.state.inventory.push({ id: res.loot, used: false });
                this.log("DOWNLOAD: " + DB.items[res.loot].name);
            }
            
            // Stats anwenden
            this.state.fl += (res.fl || 0);
            this.state.al += (res.al || 0);
            this.state.cr += (res.cr || 0);
            
            content.innerHTML += `<div class="chat-system">${res.txt}</div>`;
            // actions.innerHTML = ''; // Nicht mehr nötig
            content.scrollTop = content.scrollHeight;
            
            setTimeout(() => {
                this.closePhone();
                this.log("Handy: " + res.txt);
                this.state.time += 15; 
                this.updateUI();
                
                // Wenn Handy dich gekillt hat (z.B. Virus), sofort beenden
                if (this.state.pendingEnd) {
                    this.finishGame();
                } else {
                    this.state.activeEvent = false;
                    this.disableButtons(false);
                    this.checkRandomEmail(); 
                }
            }, 3000);
        } else if (ev.nodes[nextId]) {
            // Nächster Knoten (Gespräch geht weiter)
            setTimeout(() => { this.renderPhoneNode(ev.nodes[nextId]); }, 500);
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
        
        grid.innerHTML = '';
        
        this.state.inventory.forEach(itemData => {
            let slot = document.createElement('div');
            let dbItem = DB.items[itemData.id];
            
            // Basis-Klasse
            slot.className = 'inv-slot relative group cursor-default'; 
            
            // Icon & Name
            slot.innerText = dbItem ? dbItem.icon : '?';
            slot.title = dbItem ? dbItem.name : 'Unbekannt';
            slot.innerHTML += `<div class="absolute -bottom-6 w-full text-center text-[8px] text-slate-400 truncate">${dbItem.name}</div>`;
            slot.style.marginBottom = "15px";

            // --- SPEZIAL INTERAKTIONEN ---

            // 1. STRESSBALL (Cooldown Logik)
            if (itemData.id === 'stressball') {
                let isReady = (this.state.time - this.state.lastStressballTime >= 60);
                
                if (isReady) {
                    slot.className += ' cursor-pointer border-green-500 hover:bg-green-900/20'; 
                    slot.innerHTML += `<div class="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>`; 
                    slot.onclick = () => this.useItem('stressball');
                    slot.title += " (benutzen)";
                } else {
                    slot.className += ' cursor-not-allowed'; 
                    let wait = 60 - (this.state.time - this.state.lastStressballTime);
                    slot.innerHTML += `
                        <div class="absolute inset-0 bg-slate-900/70 rounded flex items-center justify-center z-10 backdrop-blur-[1px]">
                            <span class="font-black text-white text-xl drop-shadow-md select-none">${wait}</span>
                        </div>
                    `;
                        slot.onclick = () => this.log(`Der Ball ist noch völlig plattgedrückt. Gib ihm Zeit, sich zu entfalten. (${wait} Min)`, "text-slate-500");
                }
            }
            
            // 2. VERBRAUCHSGÜTER (Energy & Donut)
            else if (itemData.id === 'energy' || itemData.id === 'donut') {
                slot.className += ' cursor-pointer border-blue-500 hover:bg-blue-900/20';
                slot.onclick = () => this.useItem(itemData.id);
                slot.title += " (verwenden)";
            }

            grid.appendChild(slot);
        });

        // Leere Slots auffüllen
        let fillCount = Math.max(0, 10 - this.state.inventory.length);
        for(let i=0; i<fillCount; i++) {
            let slot = document.createElement('div');
            slot.className = 'inv-slot empty opacity-20';
            grid.appendChild(slot);
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    },

closeInventory: function() {
        const modal = document.getElementById('inventory-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    },
	
// --- ITEM NUTZUNG ---
// --- ITEM NUTZUNG ---
    useItem: function(id) {
        // Helper: Prüfen, ob Inventar offen ist, um es live zu aktualisieren
        const isInvOpen = !document.getElementById('inventory-modal').classList.contains('hidden');

        // A. STRESSBALL
        if (id === 'stressball') {
            if (this.state.time - this.state.lastStressballTime < 60) {
                let waitTime = 60 - (this.state.time - this.state.lastStressballTime);
                // Neuer Flavor-Text statt technischem "Cooldown"
                this.log(`Der Ball ist noch völlig plattgedrückt. Gib ihm Zeit, sich zu entfalten. (${waitTime} Min)`, "text-slate-500");
                return;
            }
            this.state.al = Math.max(0, this.state.al - 10);
            this.state.time += 5; 
            this.state.lastStressballTime = this.state.time;
            this.log("Du knetest den Ball aggressiv. *Quietsch*. Das hilft. (Aggro -10)", "text-green-400");
            
            this.updateUI();
            if(isInvOpen) this.openInventory(); // Nur refreshen, wenn offen!
            return;
        }

        // B. VERBRAUCHSGÜTER
        if (id === 'energy' || id === 'donut') {
            let index = this.state.inventory.findIndex(i => i.id === id);
            
            if (index > -1) {
                this.state.inventory.splice(index, 1);
                
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

                this.updateUI();
                if(isInvOpen) this.openInventory(); // Nur refreshen, wenn offen!
            }
            return;
        }
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
