import { DB } from '../../data.js';
import { platform, applyPlatformVisibility } from '../../platform.js';
import { freshDay, DAY_TIMERS } from './engine_state.js';

export const core = {

    // Single source of truth for every localStorage key the game touches.
    // Keeping them here prevents typo-keys that silently read/write nothing —
    // which is exactly how the tutorial flag got out of sync before.
    KEYS: {
        archive:      'layer8_archive',
        keyBinds:     'layer8_keybinds',
        defaultDiff:  'layer8_default_diff',
        tutorialDone: 'sysadmin_tutorial_done',
        partyPlayed:  { easy: 'layer8_party_played_easy',
                        normal: 'layer8_party_played_normal',
                        hard: 'layer8_party_played_hard' }
    },

    // --- HELPER FOR SAFE SAVE/LOAD MERGING ---
    deepMerge: function(target, source) {
        for (const key in source) {
            // Arrays überschreiben wir direkt (fürs Inventar etc. meist das sicherste)
            if (Array.isArray(source[key])) {
                target[key] = [...source[key]];
            } 
            // Objekte werden rekursiv tiefenkopiert
            else if (source[key] !== null && typeof source[key] === 'object') {
                if (!target[key]) target[key] = {};
                this.deepMerge(target[key], source[key]);
            } 
            // Primitive Werte (Zahlen, Strings, Booleans) einfach zuweisen
            else {
                target[key] = source[key];
            }
        }
        return target;
    },

    // async because the desktop build has to await its cloud save before the
    // local archive is read. On the web platform.load() resolves immediately.
    init: async function() {
        applyPlatformVisibility();
        await this.loadCloudSave();
        this.loadSystem();
        if (this.state.compactMode) document.body.classList.add('compact-mode');
        document.getElementById('intro-modal').style.display = 'flex';
        document.body.classList.add('overflow-hidden');

        this.updatePresence('system');

        this.renderHeader();
        this.updateUI();
        this.renderHotkeys();
        this.log(`System ${this.VERSION} geladen. Warte auf User...`);
    },

    // --- PERSISTENCE ---

    // Pulls a cloud save (desktop only) into localStorage before loadSystem()
    // reads it, so both shells go through exactly the same load path afterwards.
    loadCloudSave: async function() {
        const cloud = await platform.load();
        if (!cloud) return;

        if (cloud.archive) {
            const template = JSON.parse(JSON.stringify(this.state.archive));
            const merged = this.deepMerge(template, cloud.archive);
            localStorage.setItem(this.KEYS.archive, JSON.stringify(merged));
        }

        // Only ever raise the tutorial flag, never lower it. cloud.tutorial is
        // the STRING "false" for players who skipped it, and a non-empty string
        // is truthy — a plain truthiness check would replay the tutorial on
        // every single launch.
        if (cloud.tutorial === 'true') localStorage.setItem(this.KEYS.tutorialDone, 'true');

        if (cloud.party_easy)   localStorage.setItem(this.KEYS.partyPlayed.easy,   cloud.party_easy);
        if (cloud.party_normal) localStorage.setItem(this.KEYS.partyPlayed.normal, cloud.party_normal);
        if (cloud.party_hard)   localStorage.setItem(this.KEYS.partyPlayed.hard,   cloud.party_hard);
    },

    // Everything worth carrying across devices. Settings stay local on purpose:
    // volume and keybinds belong to the machine, not to the player's progress.
    buildCloudPayload: function() {
        return {
            archive:      this.state.archive,
            tutorial:     localStorage.getItem(this.KEYS.tutorialDone) || "false",
            party_easy:   localStorage.getItem(this.KEYS.partyPlayed.easy)   || "false",
            party_normal: localStorage.getItem(this.KEYS.partyPlayed.normal) || "false",
            party_hard:   localStorage.getItem(this.KEYS.partyPlayed.hard)   || "false"
        };
    },

    // Maps the current activity onto the status line friends can see.
    // No-op outside the desktop build.
    updatePresence: function(type) {
        const TEXTS = {
            coffee:    "Holt sich (noch) einen Kaffee",
            sidequest: "Ist auf Dienstgang unterwegs",
            server:    "Versteckt sich im Serverraum",
            calls:     "Schlägt sich mit User-Problemen rum",
            boss:      "Steckt in einer absoluten Katastrophe!",
            rep:       "Unterhält sich mit dem Kollegium",
            special:   "Macht gerade Mittagspause",
            party:     "Überlebt die Synergy-Gala",
            system:    "Starrt mit leerem Blick auf den Monitor"
        };
        platform.presence(TEXTS[type] || "Verzweifelt am IT-Support");
    },

    loadSystem: function() {
        const data = localStorage.getItem(this.KEYS.archive);
        
        DB.chars.forEach(char => {
            this.state.reputation[char.name] = 0;
        });

        if(data) {
            try {
                const loadedArchive = JSON.parse(data);
                // NEU: Deep Merge verhindert, dass alte Speicherstände neue Features löschen!
                this.state.archive = this.deepMerge(this.state.archive, loadedArchive);
                
                if(!this.state.archive.items) this.state.archive.items = [];
                if(!this.state.archive.achievements) this.state.archive.achievements = [];
                if(!this.state.archive.reputation) this.state.archive.reputation = {};
                if(!this.state.archive.stats) this.state.archive.stats = { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 };
                
                // --- NEU: GARBAGE COLLECTION (Bereinigung alter Daten) ---
                if (typeof DB !== 'undefined' && DB.items) {
                    this.state.archive.items = this.state.archive.items.filter(id => DB.items[id]);
                }
                if (typeof DB !== 'undefined' && DB.achievements) {
                    this.state.archive.achievements = this.state.archive.achievements.filter(id => 
                        DB.achievements.find(ach => ach.id === id)
                    );
                }
                if (typeof DB !== 'undefined' && DB.chars) {
                    for (let charName in this.state.archive.reputation) {
                        if (!DB.chars.find(c => c.name === charName)) {
                            delete this.state.archive.reputation[charName];
                        }
                    }
                }
                // ---------------------------------------------------------

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
        localStorage.setItem(this.KEYS.archive, JSON.stringify(this.state.archive));
        
        // Keybinds ebenfalls im LocalStorage speichern
        localStorage.setItem(this.KEYS.keyBinds, JSON.stringify(this.state.keyBinds));

        // Mirror progress to cloud storage (desktop only, no-op on the web).
        platform.save(this.buildCloudPayload());
        
    },
    
    incrementStat: function(key) {
        if (!this.state.archive.stats) {
            this.state.archive.stats = { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 };
        }
        this.state.archive.stats[key] = (this.state.archive.stats[key] || 0) + 1;
        this.saveSystem();
        platform.stat(key, this.state.archive.stats[key]);
    },

    addToArchive: function(type, id) {
        if(!this.state.archive[type].includes(id)) {
            this.state.archive[type].push(id);
            this.saveSystem(); 
        }
    },
    
    // Startet das Spiel und prüft, ob ein Standard-Tag gesetzt ist
    start: function() {
		this.playMusic('office');
        document.getElementById('intro-modal').style.display = 'none';
        
        // Prüfen, ob der Spieler eine Standard-Schwierigkeit festgelegt hat
        const defaultDiff = localStorage.getItem(this.KEYS.defaultDiff) || 'ask';
        
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
        document.body.classList.remove('overflow-hidden');
        
        // Buttons für die halbe Sekunde Ladezeit sperren
        this.disableButtons(true);
        
        if (level === 'easy') {
            this.state.difficultyMult = 0.8;
            this.state.excusesLeft = 3;
            this.log("Modus: FREITAG. Entspann dich.", "text-green-400");
        } else if (level === 'normal') {
            this.state.difficultyMult = 1.0;
            this.state.excusesLeft = 2;
            this.log("Modus: MITTWOCH. Business as usual.", "text-blue-400");
        } else if (level === 'hard') {
            this.state.difficultyMult = 1.25;
            this.state.tickets = 2;
            this.state.al = 0;
            this.state.excusesLeft = 1;
            this.log("Modus: MONTAG. Viel Glück.", "text-red-500 font-bold");
        }
        
        this.updateUI();

        // Tutorial starten (Verzögert, damit UI fertig gerendert ist)
        setTimeout(() => {
            // Wir prüfen direkt über den Speicher, ob das Tutorial schon gemacht wurde!
            if (typeof tutorial !== 'undefined' && localStorage.getItem(this.KEYS.tutorialDone) !== 'true') {
                // Tutorial ist neu -> Zeigt das Modal. Das Spiel wartet auf den Klick.
                tutorial.start();
            } else {
                // Tutorial ist bereits abgeschlossen oder fehlt -> Direktes Spiel
                this.reset();
            }
        }, 500);
    },
    
    reset: function() {
		this.playAudio('ui');
		
        // --- 1. PARTY LOOP (Wenn die Party bereits läuft) ---
        if (this.state.isPartyMode) {
            this.state.activeEvent = true;
            this.disableButtons(true);
            
            // Ab 12 Stationen kommt das dynamische Finale!
            if (this.state.partyProgress >= 12) {
                let finaleId = 'party_finale_standard';
                if (this.state.al >= 100) finaleId = 'party_finale_rage';
                else if (this.state.fl >= 100) finaleId = 'party_finale_houdini';
                else if (this.state.al < 40 && this.state.fl < 40) finaleId = 'party_finale_hero';
                else if (this.state.fl >= 50 && this.state.al <= 60) finaleId = 'party_finale_gossip';
                
                // --- UHRZEIT FÜRS FINALE AUF 23:00 UHR SETZEN ---
                this.state.time = 23 * 60;
                this.updateUI();
                
                this.renderTerminal(DB.party.find(e => e.id === finaleId), 'party');
            } else {
                this.renderTerminal(DB.party.find(e => e.id === 'party_hub'), 'party');
            }
            return;
        }
        
        // --- TUTORIAL HOOK ---
        if (typeof tutorial !== 'undefined' && tutorial.isActive) {
            this.state.activeEvent = false;
            const term = document.getElementById('terminal-content');
            term.className = "flex-1 flex flex-col justify-center items-center text-center opacity-40";
            term.innerHTML = `<div class="text-4xl md:text-6xl mb-4">🤖</div><h1 class="text-2xl font-bold text-cyan-400">H.A.L.G.E.R.D. BEREIT</h1><p>Warte auf Eingabe...</p>`;
            
            tutorial.advance();
            return; // Verhindert, dass Mails, News oder der Morgen triggern
        }
        // -----------------------------------------------------------------
		
		// --- Morgen-Routinen Abfang-Mechanismus ---
		if (!this.state.morningMoodShown) {
            this.state.morningMoodShown = true;
            this.triggerMorningMood();
            return;
        }
        // -----------------------------------------
		
        this.playMusic('office');
        this.updatePresence('system');

        this.state.activeEvent = false;
        this.disableButtons(false);
        const term = document.getElementById('terminal-content');
        term.className = "flex-1 flex flex-col justify-center items-center text-center opacity-40";
        term.innerHTML = `<div class="text-6xl mb-4">🖥️</div><h1 class="text-2xl font-bold">SYSTEM BEREIT</h1><p>Wähle eine Aktion unten.</p>`;
        
        this.checkRandomEmail();
        this.checkForNews(); // Prüft auf News im Leerlauf
    },

    // Blitzschneller Neustart ohne Page-Reload
    // Stops every per-day timer and nulls the handle. Nulling matters: an
    // expired handle is still truthy, and triggerEmail() reads it as "a timer
    // is already running" and stops scheduling mail for the rest of the day.
    clearDayTimers: function() {
        for (const key of DAY_TIMERS) {
            clearTimeout(this.state[key]);
            clearInterval(this.state[key]);
            this.state[key] = null;
        }
    },

    // Restarts the workday without touching settings, archive or difficulty.
    softReset: function() {
        this.stopMusic();
        this.clearDayTimers();

        // Close every menu
        this.closeSettings();
        const overlay = document.getElementById('modal-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            overlay.classList.remove('flex');
        }

        // Replace the whole day rather than resetting fields one by one, so a
        // newly added field can never be forgotten here.
        Object.assign(this.state, freshDay(this.state.difficultyMult));

        // Ticker News Header sofort auf Standard zurücksetzen
        this.renderHeader();
        
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
        
        // --- Boot-Sequenz dazwischenschalten ---
        this.playBootSequence(() => {
            this.reset(); // Erst wenn die Boot-Sequenz fertig ist, startet der neue Tag!
        });
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
        // Angepasst auf 8 -> Man muss alles mitnehmen, auch Müll
        if(this.state.inventory.length >= 5 && !this.hasAch('ach_hoarder')) {
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

        // Record it for this session so check 1 catches it on the next frame
        this.state.achievements.push(id);
        this.state.achievedTitles.push(title);

        // Always report it, even when the local archive already knows the
        // achievement — the backend may be out of sync with this machine.
        platform.achievement(id);

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
    
    checkEndConditions: function() {
		// Blockieren, wenn Party
		if (this.state.isPartyMode) return;
        // WICHTIG: Wenn schon ein Ende wartet, nicht nochmal prüfen (verhindert Dopplungen)
        if (this.state.pendingEnd) return;

        // 1. BERICHT GENERIEREN
        
        // Schwierigkeit ermitteln
        let diffName = "MITTWOCH (Normal)";
        if (this.state.difficultyMult < 1.0) diffName = "FREITAG (Leicht)";
        if (this.state.difficultyMult > 1.0) diffName = "MONTAG (Schwer)";

        // --- Warnungs-Badges für das End-Modal --- 
        let rageBadge = this.state.rageWarningReceived ? '<div class="text-[8px] font-mono font-bold tracking-widest text-orange-400 bg-orange-950/30 border-2 border-orange-500/80 rounded-sm px-1.5 py-0.5 mt-2 inline-block -rotate-3 shadow-[0_0_8px_rgba(249,115,22,0.3)] pointer-events-none">VENTIL GENUTZT</div>' : ''; 
        let chefBadge = this.state.chefWarningReceived ? '<div class="text-[8px] font-mono font-bold tracking-widest text-red-500 bg-red-950/30 border-2 border-red-500/80 rounded-sm px-1.5 py-0.5 mt-2 inline-block rotate-2 shadow-[0_0_8px_rgba(239,68,68,0.3)] pointer-events-none">ABGEMAHNT</div>' : '';

        // Stats-Box bauen
        let statsHTML = `
            <div class="bg-slate-950 p-4 rounded-lg border border-slate-700 my-4 shadow-inner">
                <div class="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Tagesbericht: <span class="text-white font-bold">${diffName}</span></div>
                <div class="grid grid-cols-3 gap-2 text-center font-mono">
                    <div class="flex flex-col items-center">
                        <span class="text-emerald-400 font-bold text-xl">${Math.round(this.state.fl)}%</span>
                        <span class="text-[10px] text-slate-400">FAULHEIT</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-orange-400 font-bold text-xl">${Math.round(this.state.al)}%</span>
                        <span class="text-[10px] text-slate-400">AGGRO</span>
                        ${rageBadge}
                    </div>
                    <div class="flex flex-col items-center">
                        <span class="text-red-500 font-bold text-xl">${Math.round(this.state.cr)}%</span>
                        <span class="text-[10px] text-slate-400">RADAR</span>
                        ${chefBadge}
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
            
            // Logik für das "Ventil" basierend auf Schwierigkeit
            let resetTo = 50; // Standard (Mittwoch)
            if (this.state.difficultyMult < 1.0) resetTo = 30; // Freitag
            if (this.state.difficultyMult > 1.2) resetTo = 60; // Montag

            // Prüfen, ob der Spieler heute schon ausgerastet ist
            if(!this.state.rageWarningReceived) {
                this.state.rageWarningReceived = true;
                
                // Setze Aggro zurück
                this.state.al = resetTo; 
                
                // --- 10 allgemeine Ausraster-Texte ---
                const rageTexts = [
                    "Du gehst in die Teeküche und starrst regungslos die rotierende Mikrowelle an. Nachdem du dir bildhaft vorgestellt hast, wie alles brennt, kehrst du an deinen Platz zurück.",
                    "Du schließt dich im Kopierraum ein und schreist deine Wut in ein Paket frisches Druckerpapier. Es dämpft den Ton hervorragend. Du richtest deine Krawatte.",
                    "Dir reißt endgültig der Geduldsfaden. Du schnappst dir einen leeren Kaffeebecher und zerdrückst ihn langsam und genüsslich in deiner Faust. Das musste jetzt sein.",
                    "Du flüchtest auf die Toilette, wäschst dir eiskalt das Gesicht und starrst dein Spiegelbild an. Du murmelst dir mehrfach vor, dass Mord immer noch strafbar ist.",
                    "Ein unsichtbarer Geduldsfaden reißt. Du stehst wortlos auf und trittst mit voller Wucht gegen den Mülleimer. Bevor jemand reagieren kann, sitzt du wieder und starrst stoisch in die Leere.",
                    "Du reißt das Fenster auf und brüllst ein langes Geräusch in den Innenhof. Eine Taube fällt vor Schreck fast vom Sims. Du schließt das Fenster. Der Puls sinkt.",
                    "Ein leises Knacken durchbricht die Stille. Du hast so fest auf deinen Kugelschreiber gebissen, dass er splittert. Mit etwas Tinte an den Zähnen arbeitest du weiter.",
                    "Du meldest dich kurz ab und gehst ins staubige Archiv. Aus purer Frustration baust du einen Turm aus alten Ordnern, nur um ihn mit einem gezielten Kick zu zerstören.",
                    "Tock. Tock. Tock. Du lässt deine Stirn dreimal sanft, aber bestimmt auf die Tischplatte fallen. Die Kollegen entscheiden sich kollektiv, diesen Vorfall zu ignorieren.",
                    "In blinder Wut tippst du eine extrem beleidigende E-Mail an den 'Alle-Mitarbeiter'-Verteiler. Dein Finger schwebt über dem Senden-Button, bevor du seufzend alles löschst."
                ];
                let randomRage = rageTexts[Math.floor(Math.random() * rageTexts.length)];
                
                let warningText = `${randomRage} (Aggro auf ${resetTo}% gesetzt).`;
                if(this.state.difficultyMult > 1.2) warningText += " Deine Nerven liegen trotzdem noch blank!";
                
                this.showModal("VENTIL GEÖFFNET", warningText, false);
            } else {
                // Das ist der zweite Ausraster -> Game Over
                this.incrementStat('daysRageQuit');
                let diary = this.generateDiaryEntry("RAGE"); 
                
                this.state.pendingEnd = { 
                    title: "RAGE QUIT", 
                    text: "Du hast den Monitor aus dem Fenster geworfen. Es hat sich gut angefühlt.<br>" + fullReport + diary,
                    isWin: false 
                };
            }
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
            this.showModal("WARNUNG", "Ticket-Stau! Schließe Anrufe ab, um Tickets zu reduzieren, sonst fliegst du!", false);
        }
        // D. FEIERABEND (Zeit abgelaufen) ODER PARTY-START
        else if(this.state.time >= 16*60+30) {
            
            // --- PARTY TRIGGER AM FEIERABEND ---
            let currentDiffStr = "easy";
            let currentDiffVal = 1;
            if (this.state.difficultyMult === 1.0) { currentDiffStr = "normal"; currentDiffVal = 2; }
            else if (this.state.difficultyMult > 1.0) { currentDiffStr = "hard"; currentDiffVal = 3; }

            const reqAchs = ['ach_mentor', 'ach_ally', 'ach_keymaster', 'ach_rockstar', 'ach_closer', 'ach_cat_whisperer', 'ach_lore', 'ach_wolf'];
            
            const isVeteran = reqAchs.every(id => {
                if (!this.state.archive.achievements || !this.state.archive.achievements.includes(id)) return false;
                let achDiff = this.state.archive.achievementDiffs ? this.state.archive.achievementDiffs[id] : "easy";
                let achDiffVal = 1;
                if (achDiff === "normal") achDiffVal = 2;
                if (achDiff === "hard") achDiffVal = 3;
                return achDiffVal >= currentDiffVal; 
            });

            const partyKey = this.KEYS.partyPlayed[currentDiffStr];
            const partyPlayed = localStorage.getItem(partyKey) === 'true';

            // Wenn alle Bedingungen erfüllt sind -> PARTY STATT FEIERABEND
            if (isVeteran && !partyPlayed) {
                // Nicht sofort starten, sondern als "Pending" markieren!
                this.state.pendingEnd = {
                    isParty: true,
                    partyKey: partyKey,
                    diffStr: currentDiffStr
                };
                return; 
            }
            // --- ENDE PARTY TRIGGER ---


            // Wenn keine Party stattfindet -> Ganz normaler Feierabend
			this.incrementStat('daysSurvived');
            let diary = this.generateDiaryEntry("WIN");

            this.state.pendingEnd = { 
                title: "FEIERABEND", 
                text: "16:30! Du hast den Tag überlebt.<br>" + fullReport + diary,
                isWin: true 
            };
        }
        // E. GEFEUERT (Chef-Radar >= 100)
        else if(this.state.cr >= 100) {
			            
            // Logik für die "Zweite Chance" basierend auf Schwierigkeit
            let resetTo = 50; // Standard (Mittwoch)
            if (this.state.difficultyMult < 1.0) resetTo = 30; // Freitag
            if (this.state.difficultyMult > 1.2) resetTo = 60; // Montag

            if(!this.state.chefWarningReceived) {
                this.state.chefWarningReceived = true;
                
                // Setze Radar zurück basierend auf Schwierigkeit
                this.state.cr = resetTo; 
                
                // --- 10 allgemeine Boss-Warnungen ---
                const bossTexts = [
                    "Das Telefon klingelt sturm, bevor die Tür aufgerissen wird. Der Chef steht schnaufend im Rahmen: 'Müller! Noch so ein Ding und Sie können Ihre Kaffeetasse packen!'",
                    "Eine E-Mail vom Chef ploppt auf, komplett in roter Schrift und Comic Sans: 'MÜLLER! IN MEIN BÜRO! SOFORT!' Nach einem ohrenbetäubenden Anschiss kehrst du an den Platz zurück.",
                    "Dr. Wichtig stürmt an deinen Schreibtisch und knallt einen dicken Aktenordner auf die Tastatur. 'Ihre Arbeitsweise ist inakzeptabel! Beim nächsten Mal fliegt hier jemand!'",
                    "Der Chef fängt dich auf dem Flur ab. 'Müller, Sie kosten mich mehr Nerven als meine Scheidung! Das ist eine offizielle Abmahnung!'",
                    "Die HR-Abteilung ruft an. 'Herr Müller, der Geschäftsführer hat gerade einen Locher nach seinem Monitor geworfen. Es ging um Sie. Bitte reißen Sie sich zusammen!'",
                    "Der Chef baut sich bedrohlich hinter dir auf. 'Wenn das so weitergeht, lasse ich Sie zur Strafe das gesamte Intranet ausdrucken und abheften! Letzte Warnung!'",
                    "Eine wütende Sprachnachricht vom Chef: 'Müller, wenn mein Puls wegen Ihnen noch weiter steigt, stelle ich Ihnen meine Arztkosten in Rechnung! Benehmen Sie sich!'",
                    "Dr. Wichtig trommelt ungeduldig mit den Fingern auf deinen Schreibtisch. 'Ich habe schon Praktikanten gesehen, die weniger Chaos anrichten. Überlegen Sie sich gut, was Sie heute noch tun!'",
                    "Das Haustelefon klingelt. Es ist der Chef. Er brüllt so laut in den Hörer, dass du ihn einen halben Meter vom Ohr weghalten musst, um keinen Hörsturz zu erleiden.",
                    "Der Chef schickt dir kommentarlos einen Link zu einem Stellenportal für ungelernte Aushilfskräfte mit dem Betreff 'Zur Vorbereitung'. Die Botschaft ist überdeutlich."
                ];
                let randomBoss = bossTexts[Math.floor(Math.random() * bossTexts.length)];
                
                // Der Text wirkt nun natürlich und schließt direkt mit dem Systemwert ab.
                let warningText = `${randomBoss} (Radar auf ${resetTo}% gesetzt).`;
                if(this.state.difficultyMult > 1.2) warningText += " Seine Adern an der Schläfe pulsieren bedenklich.";
                
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
    
	finishGame: function() {
        if (this.state.pendingEnd) {
            const end = this.state.pendingEnd;
            
            if (end.isParty) {
                this.startParty();
                return;
            }
            
            // Musik zurücksetzen: Schaltet die Boss-Musik aus und kehrt zum gewählten Büro-Vibe zurück
            this.playMusic('office');
            
            // Freeze every background activity once the day is really over
            this.clearDayTimers();
            this.state.emailPending = false;
            
            this.showEnd(end.title, end.text, end.isWin);
            this.state.pendingEnd = null; // Reset
        }
    },
    
    startParty: function() {
        this.playAudio('ui');
        const endData = this.state.pendingEnd;
        this.state.pendingEnd = null; // Den Marker wieder löschen
        
        // Party-Status aktivieren
        this.state.isPartyMode = true;
        this.state.partyProgress = 0;
        this.state.currentPartyKey = endData.partyKey; 
        
        // Stats für die Party auf 0 setzen
        this.state.al = 0;
        this.state.fl = 0;
        this.state.cr = 0;
        
        // Kill everything still running from the workday
        this.clearDayTimers();
        this.state.emailPending = false;
        
        this.log(`SYSTEM OVERRIDE: GALA (${endData.diffStr.toUpperCase()})`, "text-pink-500 font-bold");
		
		// ---> GALA MUSIK STARTEN <---
        this.playMusic('gala');
        this.updatePresence('party');
        
        // Und jetzt geht die Falle zu: Das Party-Event wird gerendert!
        this.renderTerminal(DB.party.find(e => e.id === 'party_start'), 'party');
    },
    
    // --- SPEICHERSTAND EXPORT / IMPORT SYSTEM ---

    // Adler-32 checksum used to detect corrupted save codes.
    // The `>>> 0` forces an unsigned 32-bit integer, otherwise the hex
    // string would carry a minus sign and never match on import.
    calculateChecksum: function(str) {
        let a = 1, b = 0;
        for (let i = 0; i < str.length; i++) {
            a = (a + str.charCodeAt(i)) % 65521;
            b = (b + a) % 65521;
        }
        return ((b << 16 | a) >>> 0).toString(16);
    },
    
    // EXPORT: builds the transferable save code.
    // Shares buildCloudPayload() with the desktop cloud sync so both paths can
    // never disagree about what counts as progress.
    exportSaveGame: function() {
        // Field names are part of the public save-code format and must stay
        // stable — older codes in circulation still use them.
        const data = {
            arc:          this.state.archive,
            tut:          localStorage.getItem(this.KEYS.tutorialDone) || "false",
            party_easy:   localStorage.getItem(this.KEYS.partyPlayed.easy)   || "false",
            party_normal: localStorage.getItem(this.KEYS.partyPlayed.normal) || "false",
            party_hard:   localStorage.getItem(this.KEYS.partyPlayed.hard)   || "false",
            salt:         Math.floor(Math.random() * 999999) // makes every code unique
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

    // --- TAGEBUCH GENERATOR ---
    generateDiaryEntry: function(endReason, partyText = "") {
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
        // ABSATZ 2.5: Warnungen (Abmahnung & Ventil)
        // ==========================================
        let pWarn = "";
        let warnings = [];
        
        if (state.rageWarningReceived) {
            warnings.push(pick([
                "ich zwischendurch einen halben Nervenzusammenbruch in der Besenkammer hatte",
                "ich heute schon einmal kurz davor war, komplett die Kontrolle zu verlieren",
                "ich meine Wut heute bereits an harmlosem Büromaterial auslassen musste"
            ]));
        }
        
        if (state.chefWarningReceived) {
            warnings.push(pick([
                "der Chef mir heute bereits mit dem Rauswurf gedroht hat",
                "ich nur haarscharf an einer fristlosen Kündigung vorbeigeschrammt bin",
                "ich heute schon eine hochoffizielle und sehr laute Abmahnung kassiert habe"
            ]));
        }

        if (warnings.length > 0) {
            let warnConn = (encounters.length > 0 || habits.length > 0) ? pick(["Ach ja, und erwähnenswert ist auch, dass ", "Fast vergessen: Dazu kommt, dass ", "Zu allem Überfluss sei noch gesagt, dass "]) : pick(["Besonders heikel war heute, dass ", "Ein absoluter Tiefpunkt war, dass "]);
            pWarn = `${warnConn}${formatList(warnings)}.`;
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
        } else if (endReason === "PARTY") {
            // --- PARTY FINALE TEXT ---
            p3 = "Dann kam 16:30 Uhr und die ominöse Synergy-Gala. " + partyText;
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
                        ${pWarn ? `<p class="leading-relaxed text-orange-300/90">"${pWarn}"</p>` : ''}
                        <p class="leading-relaxed font-bold text-white border-t border-slate-800 pt-3">"${p3}"</p>
                    </div>
                </div>
            </details>
        `;
    },

};
