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
        
        // Stats & System
        achievements: [],
        achievedTitles: [],
        emailTimer: null,
        emailTimeout: null,
        coffeeConsumed: 0,
        emailsIgnored: 0,
        spamClicked: 0,
        usedEmails: new Set(),
        isEmailOpen: false
    },

    init: function() {
        document.getElementById('intro-modal').style.display = 'flex';
        this.updateUI();
        this.log("System v40.0 geladen. Warte auf User...");
    },

    start: function() {
        document.getElementById('intro-modal').style.display = 'none';
    },

    // --- E-MAIL LOGIK ---
    checkRandomEmail: function() {
        if(this.state.isEmailOpen) return;
        let chance = 0.2 + (this.state.tickets * 0.05); 
        if(Math.random() < chance) {
            setTimeout(() => { this.triggerEmail(); }, 1500);
        }
    },

    triggerEmail: function() {
        if(!DB.emails) return; 
        
        // 1. E-Mail auswählen (ohne Wiederholung)
        let availableEmails = DB.emails.filter(e => !this.state.usedEmails.has(e.subj));
        if(availableEmails.length === 0) {
            this.state.usedEmails.clear(); 
            availableEmails = DB.emails;
        }
        let email = availableEmails[Math.floor(Math.random() * availableEmails.length)];
        this.state.usedEmails.add(email.subj);

        // 2. UI Elemente holen
        const overlay = document.getElementById('email-overlay');
        const timerBar = document.getElementById('email-timer-bar');
        const actionContainer = document.getElementById('email-actions'); // Der neue Container
        
        // 3. Text setzen
        document.getElementById('email-sender').innerText = email.sender;
        document.getElementById('email-subject').innerText = email.subj;
        if(email.body) {
             document.getElementById('email-subject').innerText += "\n\n" + email.body;
        }
        
        // 4. Buttons generieren (Das ist der wichtige neue Teil!)
        actionContainer.innerHTML = ''; // Vorher leeren
        if(email.opts) {
            email.opts.forEach(opt => {
                const btn = document.createElement('button');
                // Styling für die Antwort-Buttons
                btn.className = "bg-blue-600 hover:bg-blue-500 text-white text-xs py-2 px-3 rounded text-left transition-colors";
                btn.innerText = "➤ " + opt.btn;
                // Klick löst resolveEmail mit den spezifischen Werten (opt) aus
                btn.onclick = () => this.resolveEmail(opt, false);
                actionContainer.appendChild(btn);
            });
        }
        
        // 5. Anzeigen & Timer starten
        overlay.style.display = 'flex';
        this.state.isEmailOpen = true;
        
        const DURATION = 15000; // 15 Sekunden
        const UPDATE_RATE = 50; 
        let timePassed = 0;

        if(timerBar) timerBar.style.width = '100%';
        if(this.state.emailInterval) clearInterval(this.state.emailInterval);

        this.state.emailInterval = setInterval(() => {
            timePassed += UPDATE_RATE;
            let percentLeft = 100 - ((timePassed / DURATION) * 100);
            if(timerBar) timerBar.style.width = percentLeft + '%';

            if(timePassed >= DURATION) {
                this.resolveEmail(null, true); // Timeout
            }
        }, UPDATE_RATE);
    },

    resolveEmail: function(opt, timeout = false) {
        clearInterval(this.state.emailInterval);
        document.getElementById('email-overlay').style.display = 'none';
        this.state.isEmailOpen = false;
        
        if(timeout) {
            // FALL 1: ZEIT ABGELAUFEN oder IGNORIEREN GEKLICKT
            this.log("E-MAIL IGNORIERT! Radar +10", "text-red-500 font-bold");
            this.state.cr += 10;
            this.state.emailsIgnored++;
        } else if(opt) {
            // FALL 2: EINE ANTWORT GEWÄHLT
            // Hier werden die Werte aus data.js (f, a, c) angewendet
            this.log("E-Mail: " + opt.txt, "text-blue-400");
            this.state.fl += (opt.f || 0);
            this.state.al += (opt.a || 0);
            this.state.cr += (opt.c || 0);
        }
        
        this.updateUI();
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

        const invGrid = document.getElementById('inventory-grid');
        invGrid.innerHTML = '';
        
        // LOGIK: Mindestens 5 Slots anzeigen. Wenn mehr Items da sind, wächst die Zahl.
        let totalSlots = Math.max(5, this.state.inventory.length);
        
        // Optional: Wenn du willst, dass immer volle 5er Reihen da sind (also 5, 10, 15):
        // let totalSlots = Math.ceil(Math.max(5, this.state.inventory.length) / 5) * 5;

        for(let i=0; i < totalSlots; i++) {
            let itemData = this.state.inventory[i];
            let slot = document.createElement('div');
            if(itemData) {
                let dbItem = DB.items[itemData.id];
                slot.className = `inv-slot ${itemData.used ? 'used' : ''}`;
                slot.innerText = dbItem ? dbItem.icon : '?';
                slot.title = dbItem ? dbItem.name : 'Unbekannt';
            } else {
                slot.className = 'inv-slot empty';
            }
            invGrid.appendChild(slot);
        }

        this.checkAchievements();
        this.checkEndConditions();
    },

    checkAchievements: function() {
        if(this.state.coffeeConsumed >= 5 && !this.hasAch('ach_coffee')) {
            this.unlockAchievement('ach_coffee', '☕ Koffein-Junkie', '5 Kaffees getrunken.');
        }
        if(this.state.emailsIgnored >= 3 && !this.hasAch('ach_ignore')) {
            this.unlockAchievement('ach_ignore', '🙈 Ignorant', '3 Mails ignoriert.');
        }
        if(this.state.inventory.length >= 4 && !this.hasAch('ach_hoarder')) {
            this.unlockAchievement('ach_hoarder', '🎒 Messie', 'Taschen vollgestopft.');
        }
        if(this.state.fl >= 80 && !this.hasAch('ach_lazy')) {
            this.unlockAchievement('ach_lazy', '🦥 Faulpelz', '80% Faulheit.');
        }
        if(this.state.time > 14*60 && this.state.cr < 10 && !this.hasAch('ach_ninja')) {
            this.unlockAchievement('ach_ninja', '🥷 Ninja', 'Fast unsichtbar.');
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
            toast.innerHTML = `<div class="ach-icon">🏆</div><div class="ach-text"><span class="ach-title">${title}</span><span class="ach-desc">${text}</span></div>`;
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
        let pool = DB.bossfights.filter(ev => !this.state.usedIDs.has(ev.id));
        if(pool.length === 0) return; 

        let boss = pool[0]; 
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
            document.getElementById('boss-timer-bar').style.width = (timeLeft / boss.timer * 100) + "%";
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
                let hasItem = this.state.inventory.find(i => i.id === opt.req && !i.used);
                if (!hasItem) {
                    locked = true;
                    btnClass += " locked";
                    let itemName = DB.items[opt.req] ? DB.items[opt.req].name : opt.req;
                    missingText = `(Fehlt: ${itemName})`;
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
        // Zeitsprung: Zufällig 3-5 Stunden zurück
        if(m === -999) {
            let hoursBack = 3 + Math.floor(Math.random() * 3);
            m = -(hoursBack * 60);
            if(this.state.time + m < 8 * 60) {
                m = -(this.state.time - 8 * 60);
            }
            hoursBack = Math.round(-m / 60);
            if(hoursBack > 0) {
                res = `ZEITSPRUNG! Die Uhr dreht sich ${hoursBack} Stunden zurück! Alle Monitore flackern wild. Die Kollegen reiben sich die Augen. 'War es nicht gerade noch Nachmittag?!' Dein Arbeitstag fängt praktisch von vorne an!`;
                this.log(`⏰ ZEITPARADOXON: ${hoursBack}h zurückgedreht!`, "text-purple-500 font-bold");
            } else {
                res = "Das Gerät summt kurz und geht aus. Es ist zu früh am Tag für Zeitreisen.";
            }
        }

        if(type === 'coffee') this.state.coffeeConsumed++;

        let oldTimeChunk = Math.floor(this.state.time / 30);
        let newTimeChunk = Math.floor((this.state.time + m) / 30);
        let newTickets = newTimeChunk - oldTimeChunk;
        this.state.tickets += newTickets;
        
        if (type === 'calls') { 
            this.state.tickets = Math.max(0, this.state.tickets - 1);
        }

        this.state.time += m;
        
        let triggerLunch = false;
        if (!this.state.lunchDone && this.state.time >= 12 * 60) {
            triggerLunch = true;
            this.state.lunchDone = true;
        }

        this.state.fl += f;
        this.state.al += a;
        this.state.cr += c;

        if(loot && loot !== "") {
            if(!this.state.inventory.find(i => i.id === loot)) {
                this.state.inventory.push({ id: loot, used: false });
                this.log(`ITEM: ${DB.items[loot].name}`, "text-yellow-400");
            }
        }
        if(usedItem && usedItem !== "") {
            let itemObj = this.state.inventory.find(i => i.id === usedItem);
            if(itemObj) itemObj.used = true;
        }

        this.log(res);
        this.updateUI();

        const term = document.getElementById('terminal-content');
        let btnAction = triggerLunch ? "engine.triggerLunch()" : "engine.reset()";
        let btnText = triggerLunch ? "ZUR MITTAGSPAUSE" : "WEITER";

        term.innerHTML = `
            <div class="w-full max-w-xl text-left fade-in flex flex-col h-full justify-center">
                <div class="bg-slate-800 p-6 rounded-xl border border-slate-600 mb-8">
                    <h3 class="font-bold text-white mb-2 uppercase text-xs tracking-widest text-emerald-500">Ergebnis</h3>
                    <p class="text-slate-300 italic text-lg leading-relaxed">"${res}"</p>
                </div>
                <button onclick="${btnAction}" class="bg-blue-600 text-white w-full py-4 rounded-xl font-bold uppercase hover:bg-blue-500 transition-all shadow-lg">
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
        const content = document.getElementById('app-content');
        content.innerHTML += `<div class="chat-bubble chat-out">${text}</div>`;
        
        content.scrollTop = content.scrollHeight;

        let ev = this.state.currentPhoneEvent;
        
        let validNext = (ev.results && ev.results[nextId]) || (ev.nodes && ev.nodes[nextId]);
        
        if (!validNext) {
            console.error("Missing Node:", nextId);
            content.innerHTML += `<div class="chat-system text-red-500">Verbindung abgebrochen.</div>`;
            document.getElementById('app-actions').innerHTML = '';
            setTimeout(() => {
                this.closePhone();
                this.state.activeEvent = false;
                this.disableButtons(false);
            }, 2000);
            return;
        }

        if (ev.results && ev.results[nextId]) {
            let res = ev.results[nextId];
            if(res.loot && !this.state.inventory.find(i => i.id === res.loot)) {
                this.state.inventory.push({ id: res.loot, used: false });
                this.log("DOWNLOAD: " + DB.items[res.loot].name);
            }
            this.state.fl += (res.fl || 0);
            this.state.al += (res.al || 0);
            this.state.cr += (res.cr || 0);
            content.innerHTML += `<div class="chat-system">${res.txt}</div>`;
            document.getElementById('app-actions').innerHTML = '';
            content.scrollTop = content.scrollHeight;
            
            setTimeout(() => {
                this.closePhone();
                this.log("Handy: " + res.txt);
                this.state.time += 15; 
                this.updateUI();
                this.state.activeEvent = false;
                this.disableButtons(false);
                this.checkRandomEmail(); 
            }, 2000);
        } else if (ev.nodes[nextId]) {
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
        const feed = document.getElementById('log-feed');
        let h = Math.floor(this.state.time / 60);
        let m = this.state.time % 60;
        let time = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}`;
        feed.innerHTML = `<div><span class="text-slate-500">[${time}]</span> <span class="${colorClass || ''}">${msg}</span></div>` + feed.innerHTML;
    },

    checkEndConditions: function() {
        if(this.state.al >= 100) this.showEnd("RAGE QUIT", "Du hast den Monitor zerstört. Game Over.");
        else if(this.state.tickets >= 10) this.showEnd("GEFEUERT", "Zu viele offene Tickets! Du bist raus.");
        else if(this.state.tickets >= 7 && !this.state.ticketWarning) {
            this.state.ticketWarning = true;
            this.showModal("WARNUNG", "Ticket-Stau! Schließe Anrufe ab!", false);
        }
        else if(this.state.time >= 16*60+30) {
            let achHTML = this.state.achievedTitles.length > 0 ? 
                `<div class="mt-4 border-t border-slate-700 pt-4"><div class="font-bold text-yellow-400 mb-2">ERRUNGENSCHAFTEN:</div>${this.state.achievedTitles.map(t => `<div class="text-sm text-slate-300">🏆 ${t}</div>`).join('')}</div>` 
                : "";
            this.showEnd("FEIERABEND", "16:30! Du hast überlebt.<br>" + achHTML, true);
        }
        else if(this.state.cr >= 100) {
            if(!this.state.warningReceived) {
                this.state.warningReceived = true;
                this.state.cr = 50;
                this.showModal("ABMAHNUNG", "Letzte Chance! Radar auf 50% gesetzt.", false);
            } else {
                this.showEnd("GEFEUERT", "Der Sicherheitsdienst begleitet dich raus.");
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
    }
};

engine.init();