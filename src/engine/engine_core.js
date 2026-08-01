import { KEYS } from './keys.js';

import { DB, ensure, prefetchAll } from '../data.js';
import { platform, applyPlatformVisibility } from '../platform.js';
import { freshDay, DAY_TIMERS } from './engine_state.svelte.js';

export const core = {

    // Single source of truth for every localStorage key the game touches.
    // The actual strings live in keys.js — the single source of truth,
    // shared with engine_state, engine_ui and engine_audio. Keeping every
    // key in one place prevents typo-keys that silently read/write
    // nothing, which is exactly how the tutorial flag got out of sync.
    KEYS,

    // --- HELPER FOR SAFE SAVE/LOAD MERGING ---
    deepMerge: function(target, source) {
        for (const key in source) {
            // Arrays are replaced wholesale - safest for the inventory and similar lists
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
        if (this.state.textSize && this.state.textSize !== 'normal') document.documentElement.classList.add('text-size-' + this.state.textSize);
        if (!this.state.scanlines) document.body.classList.add('no-scanlines');
        document.getElementById('intro-modal').style.display = 'flex';
        document.body.classList.add('overflow-hidden');

        this.updatePresence('system');

        // The intro modal is up and the player reads it for several seconds —
        // more than enough to warm the remaining pools before the first click.
        prefetchAll();

        this.renderHeader();
        this.updateUI();
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
                // Deep merge so an older save cannot wipe fields added since
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

    /**
     * Sichert den laufenden Arbeitstag.
     *
     * Gespeichert wird ausschließlich im Ruhezustand — also dann, wenn gerade
     * kein Ereignis offen ist. Ein halb beantwortetes Gespräch wiederherzu-
     * stellen wäre aufwendig und fehleranfällig; so verliert man im
     * schlimmsten Fall das eine Ereignis, das gerade auf dem Schirm stand,
     * statt des ganzen Vormittags.
     *
     * Welche Felder zum Tag gehören, bestimmt freshDay() — dieselbe Quelle,
     * die den Tag auch anlegt. Damit kann ein neu hinzugefügtes Tagesfeld
     * hier nicht vergessen werden. Sets werden für JSON zu Listen.
     */
    saveDay: function() {
        if (this.state.activeEvent || this.state.pendingEnd || this.state.isPartyMode) return;

        try {
            const day = {};
            for (const key of Object.keys(freshDay())) {
                // Laufende Timer sind Kennzahlen dieser Sitzung; nach einem
                // Neuladen zeigen sie ins Leere. Sie bleiben draußen und
                // starten beim Fortsetzen ohnehin neu.
                if (DAY_TIMERS.includes(key)) continue;
                const value = this.state[key];
                day[key] = value instanceof Set ? [...value] : value;
            }
            // Nicht Teil von freshDay, gehören aber zum Tag:
            day.difficultyMult = this.state.difficultyMult;
            day.reputation = { ...this.state.reputation };
            day.savedAt = Date.now();

            localStorage.setItem(this.KEYS.dayState, JSON.stringify(day));
        } catch (e) {
            // Voller Speicher oder privater Modus: Der Tag läuft weiter,
            // er ist dann eben nicht gesichert.
            console.warn('Tag konnte nicht gesichert werden:', e);
        }
    },

    /** Gibt es einen unterbrochenen Tag? Liefert ihn oder null. */
    loadDay: function() {
        try {
            const raw = localStorage.getItem(this.KEYS.dayState);
            if (!raw) return null;
            const day = JSON.parse(raw);
            // Ein Tag, der bereits vorbei war, wird nicht angeboten.
            if (!day || day.time >= 16 * 60 + 30) return null;
            return day;
        } catch {
            return null;
        }
    },

    /** Stellt einen gesicherten Tag wieder her und macht im Ruhezustand weiter. */
    resumeDay: function() {
        const day = this.loadDay();
        if (!day) { this.reset(); return; }

        const SETS = ['usedIDs', 'usedEmails'];
        for (const [key, value] of Object.entries(day)) {
            if (key === 'savedAt') continue;
            this.state[key] = SETS.includes(key) ? new Set(value ?? []) : value;
        }

        // Der Log-Zähler lebt auf dem Engine-Objekt, nicht im Tageszustand —
        // nach einem Neuladen stünde er wieder auf null und würde IDs
        // vergeben, die die geladenen Einträge schon tragen. Svelte quittiert
        // das im LogFeed mit doppelten Schlüsseln.
        this._logId = Math.max(0, ...(this.state.logEntries ?? []).map(e => e?.id ?? 0));

        // Anzeige und Ablauf wieder aufsetzen
        for (const key of DAY_TIMERS) this.state[key] = null;
        this.state.activeEvent = false;
        this.state.pendingEnd = null;
        this.state.phone = { open: false, notification: false, appName: '', messages: [], options: [] };

        document.getElementById('difficulty-modal').style.display = 'none';
        document.getElementById('resume-modal')?.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');

        this.renderHeader();
        this.updateUI();
        this.disableButtons(false);
        this.setTerminalIdle();
        this.log("Sitzung wiederhergestellt. Wo waren wir...", "text-blue-400");
        this.playMusic('office');
        this.updatePresence('system');
    },

    /** Aus dem Fortsetzen-Dialog: Zwischenstand wegwerfen, neu anfangen. */
    discardDay: function() {
        this.clearDay();
        const modal = document.getElementById('resume-modal');
        modal?.classList.add('hidden');
        modal?.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
        this.playAudio('ui');
        this.start();
    },

    /** Verwirft den gesicherten Tag (Tagesende oder bewusster Neustart). */
    clearDay: function() {
        try { localStorage.removeItem(this.KEYS.dayState); } catch { /* egal */ }
    },

    saveSystem: function() {
        // Copy the current reputation into the archive before writing
        this.state.archive.reputation = { ...this.state.reputation };
        
        // Then persist
        localStorage.setItem(this.KEYS.archive, JSON.stringify(this.state.archive));
        
        // Key bindings are persisted too
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
    
    // Starts the game, honouring a saved default difficulty
    start: function() {
		this.playMusic('office');
        document.getElementById('intro-modal').style.display = 'none';

        // Liegt ein unterbrochener Arbeitstag vor? Dann hat die Frage danach
        // Vorrang vor der Tageswahl — sonst wäre der Zwischenstand mit dem
        // ersten Klick verloren.
        const saved = this.loadDay();
        const resumeModal = document.getElementById('resume-modal');
        if (saved && resumeModal) {
            const pad = (n) => String(n).padStart(2, '0');
            const clock = `${pad(Math.floor(saved.time / 60))}:${pad(saved.time % 60)}`;
            const DIFF = saved.difficultyMult < 1.0 ? 'Freitag'
                       : saved.difficultyMult > 1.0 ? 'Montag' : 'Mittwoch';
            const info = document.getElementById('resume-info');
            if (info) info.textContent = `${DIFF} · Stand ${clock} Uhr · ${saved.tickets ?? 0} offene Tickets`;
            resumeModal.classList.remove('hidden');
            resumeModal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
            return;
        }

        // Did the player pin a default difficulty?
        const defaultDiff = localStorage.getItem(this.KEYS.defaultDiff) || 'ask';
        
        if (defaultDiff !== 'ask') {
            // Skip the dialog and go straight in
            this.setDifficulty(defaultDiff);
        } else {
            // Otherwise show the picker
            const diffModal = document.getElementById('difficulty-modal');
            if(diffModal) {
                diffModal.style.display = 'flex';
            } else {
                this.setDifficulty('normal'); // Fallback
            }
        }
    },

    // Applies the difficulty, then starts the day (or the tutorial)
    setDifficulty: function(level) {
        document.getElementById('difficulty-modal').style.display = 'none';
        document.body.classList.remove('overflow-hidden');
        
        // Lock the buttons for the half second of setup
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

        // Start the tutorial, delayed so the UI has finished rendering
        setTimeout(() => {
            // Read the flag straight from storage
            if (typeof tutorial !== 'undefined' && localStorage.getItem(this.KEYS.tutorialDone) !== 'true') {
                // Not played yet -> show the modal, the game waits for the click
                tutorial.start();
            } else {
                // Already done or unavailable -> straight into the day
                this.reset();
            }
        }, 500);
    },
    
    reset: function() {
		this.playAudio('ui');
		
        // --- 1. PARTY LOOP (only once the gala is running) ---
        if (this.state.isPartyMode) {
            this.state.activeEvent = true;
            this.disableButtons(true);
            
            // After 12 stations the finale kicks in
            if (this.state.partyProgress >= 12) {
                let finaleId = 'party_finale_standard';
                if (this.state.al >= 100) finaleId = 'party_finale_rage';
                else if (this.state.fl >= 100) finaleId = 'party_finale_houdini';
                else if (this.state.al < 40 && this.state.fl < 40) finaleId = 'party_finale_hero';
                else if (this.state.fl >= 50 && this.state.al <= 60) finaleId = 'party_finale_gossip';
                
                // --- The finale happens at 23:00 ---
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
            this.setTerminalIdle('halgerd');
            
            tutorial.advance();
            return; // keeps mail, news and the morning mood out of the party
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
        this.setTerminalIdle();
        
        this.checkRandomEmail();
        this.checkForNews(); // news only fires while idle
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

        // Nur wer schon um acht Uhr blind fliegt, fliegt blind. Wer die
        // Zahlen später ausblendet, hat den Vormittag über gesehen, wie es
        // um ihn steht — das zählt nicht.
        this.state.blindRun = this.state.blindStats && this.state.blindTickets;

        // Ein neuer Tag ersetzt jeden gesicherten Zwischenstand.
        this.clearDay();

        // Reset the ticker header immediately
        this.renderHeader();
        
        // Clean up phone, mail and log
        document.getElementById('email-modal')?.classList.add('hidden');
        // Back to standby; PhoneView.svelte follows the state.
        this.state.phone = { open: false, notification: false, appName: '', messages: [], options: [] };
        
        // The log array is part of freshDay(), so it was already emptied
        // above along with the rest of the day.
        this.log("System-Neustart initiiert...", "text-blue-400");
        
        // Restart through the normal morning path
        this.updateUI();
        
        // --- Boot-Sequenz dazwischenschalten ---
        this.playBootSequence(() => {
            this.reset(); // the new day starts only after the boot sequence
        });
    },

    checkAchievements: function() {
        // --- PLAYSTYLE: EXTREMES ---
        
        // 1. DER ASKET (Kein Kaffee) - Ab 16:00
        // Rewards enduring the aggro without help
        if(this.state.time > 16*60 && this.state.coffeeConsumed === 0 && !this.hasAch('ach_ascetic')) {
            this.unlockAchievement('ach_ascetic', '🧘 Der Asket', '16 Uhr und kein Tropfen Kaffee. Du bestehst aus purer Willenskraft.');
        }

        // 2. KOFFEIN-SCHOCK (Zu viel Kaffee)
        // Raised to 8 - roughly one trip to the machine per hour
        if(this.state.coffeeConsumed >= 8 && !this.hasAch('ach_coffee')) {
            this.unlockAchievement('ach_coffee', '🫀 Herzrasen', '8 Tassen. Du kannst Farben hören und die Zeit anhalten.');
        }

        // 3. GHOSTING (Mails ignorieren)
        // Raised to 5 - genuinely dangerous for the radar value
        if(this.state.emailsIgnored >= 5 && !this.hasAch('ach_ignore')) {
            this.unlockAchievement('ach_ignore', '👻 Ghosting-Profi', '5 Mails ignoriert. Deine "Entf"-Taste glüht.');
        }

        // 4. SCHWARZES LOCH (Volles Inventar)
        // Set to 8 - you have to hoard even the junk
        if(this.state.inventory.length >= 5 && !this.hasAch('ach_hoarder')) {
            this.unlockAchievement('ach_hoarder', '🛒 Loot-Goblin', 'Dein Rucksack platzt. Brauchst du den alten Donut wirklich noch?');
        }

        // --- STAT THRESHOLDS ---
        if(this.state.fl >= 80 && this.state.fl < 100 && !this.hasAch('ach_lazy')) {
            this.unlockAchievement('ach_lazy', '🦥 Faulpelz', '80% Faulheit. Du hast das Nichtstun zur Kunstform erhoben.');
        }
        
        if (this.state.al >= 95 && !this.hasAch('ach_rage')) { // raised to 95% - riskier
            this.unlockAchievement('ach_rage', '🤬 180 Puls', 'Nur noch ein dummer Anruf und es knallt. (95% Aggro)');
        }

        // --- ITEM SETS ---
        
        // MACGYVER (needs tape, screwdriver, cable, manual)
        const tools = ['tape', 'screw', 'kabel', 'manual'];
        const hasAllTools = tools.every(toolId => this.state.inventory.find(i => i.id === toolId));
        if(hasAllTools && !this.hasAch('ach_macgyver')) {
            this.unlockAchievement('ach_macgyver', '🛠️ MacGyver', 'Tape, Kabel, Schrauber & Handbuch. Du brauchst keine IT, du brauchst Kaugummi.');
        }
        
        // MILLIONAIRE
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

        // --- LATE GAME CHALLENGES (time dependent) ---
        
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

        // Exactly 9 tickets, one below the limit. One more call would end it.
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
        // 1. Session check: already earned during THIS run?
        // If so, bail out immediately - stops it spamming inside the loop
        if (this.state.achievements.includes(id)) {
            return;
        }

        // 2. Archive check: earned before? And if so, on which difficulty?
        
        // Current difficulty as a number (1 easy, 2 normal, 3 hard)
        let currentDiffVal = 1;
        if (this.state.difficultyMult >= 1.0) currentDiffVal = 2; // Mittwoch
        if (this.state.difficultyMult >= 1.25) currentDiffVal = 3; // Montag

        // Pull the stored difficulty
        let savedDiffVal = 0; // 0 = Noch nie geschafft
        
        // Guard against a malformed archive
        if (this.state.archive && this.state.archive.achievements && this.state.archive.achievements.includes(id)) {
            let savedDiffName = "easy";
            // Was a difficulty recorded?
            if (this.state.archive.achievementDiffs) {
                savedDiffName = this.state.archive.achievementDiffs[id] || "easy";
            }
            
            // Map the name onto a comparable number
            if (savedDiffName === "normal") savedDiffVal = 2;
            else if (savedDiffName === "hard") savedDiffVal = 3;
            else savedDiffVal = 1; 
        }

        // Only notify when new (0) or better than before
        let isNewOrBetter = (savedDiffVal === 0) || (currentDiffVal > savedDiffVal);

        // Record it for this session so check 1 catches it on the next frame
        this.state.achievements.push(id);
        this.state.achievedTitles.push(title);

        // Always report it, even when the local archive already knows the
        // achievement — the backend may be out of sync with this machine.
        platform.achievement(id);

        // Feedback (log and toast) only for a new entry or an upgrade
        if (isNewOrBetter) {
            
            // Prepare the log line
            let logText = `ERFOLG FREIGESCHALTET: ${title}`;
            let logColor = "text-yellow-400 font-bold"; // Standard Gold
            let toastDesc = text;

            // Upgrade case, e.g. easy -> hard
            if (savedDiffVal > 0) {
                const diffNames = ["", "FREITAG", "MITTWOCH", "MONTAG"];
                logText = `🏆 ERFOLG AUFGEWERTET: ${title} (${diffNames[currentDiffVal]})`;
                logColor = "text-purple-400 font-bold"; // Upgrade Lila
                toastDesc = `Upgrade auf ${diffNames[currentDiffVal]}!`;
            }

            // A. Write the log line
            this.log(logText, logColor);

            // B. Show the toast
            // Rendered by components/AchievementToasts.svelte.
            const toastId = this._toastId = (this._toastId || 0) + 1;
            this.state.toasts.push({ id: toastId, title, desc: toastDesc });

            setTimeout(() => {
                const k = this.state.toasts.findIndex(t => t.id === toastId);
                if (k > -1) this.state.toasts.splice(k, 1);
            }, 4000);   // Svelte plays the exit animation after this
        }

        // 3. Always persist in the background, in case this was an upgrade
        this.saveAchievementToArchive(id, currentDiffVal);
    },

    // Stores an achievement together with the difficulty it was earned on
    saveAchievementToArchive: function(id, currentDiffVal) {
        // Make sure the structures exist
        if (!this.state.archive.achievements) this.state.archive.achievements = [];
        if (!this.state.archive.achievementDiffs) this.state.archive.achievementDiffs = {};

        // Number back to name
        let diffName = "easy";
        if (currentDiffVal === 2) diffName = "normal";
        if (currentDiffVal === 3) diffName = "hard";

        // What is on record?
        let savedDiffName = this.state.archive.achievementDiffs[id] || "none";
        let savedDiffVal = 0;
        if (savedDiffName === "easy") savedDiffVal = 1;
        if (savedDiffName === "normal") savedDiffVal = 2;
        if (savedDiffName === "hard") savedDiffVal = 3;

        // Write when new or better
        if (!this.state.archive.achievements.includes(id) || currentDiffVal > savedDiffVal) {
            
            if (!this.state.archive.achievements.includes(id)) {
                this.state.archive.achievements.push(id);
            }
            
            this.state.archive.achievementDiffs[id] = diffName;
            this.saveSystem(); // LocalStorage Update
        }
    },
    
    // Builds the end-of-day report card.
    //
    // Used to be inlined at the top of checkEndConditions(), which runs from
    // updateUI() after every single action - so this HTML was assembled dozens
    // of times per day and thrown away every time. Now it is only called from
    // the branches that actually show it.

    // Runs from updateUI() after every action, so it stays cheap: no report is
    // built until a branch actually needs one.
    checkEndConditions: function() {
        if (this.state.isPartyMode) return;
        // An ending is already queued - checking again would duplicate it
        if (this.state.pendingEnd) return;

        // A. RAGE QUIT (Aggro >= 100)
        if(this.state.al >= 100) {
            
            // Where the "release valve" drops aggro back to, per difficulty
            let resetTo = 50; // Standard (Mittwoch)
            if (this.state.difficultyMult < 1.0) resetTo = 30; // Freitag
            if (this.state.difficultyMult > 1.2) resetTo = 60; // Montag

            // Has the player already blown up today?
            if(!this.state.rageWarningReceived) {
                this.state.rageWarningReceived = true;
                
                // Reset aggro
                this.state.al = resetTo; 
                // Zwei Punkte: der Höchststand und der Reset direkt danach —
                // so fällt die Kurve im Endbildschirm senkrecht statt schräg.
                this.recordStatPoint();
                
                // --- Ten generic blow-up texts ---
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
                // Second blow-up -> game over
                this.incrementStat('daysRageQuit');
                let diary = this.generateDiaryEntry("RAGE"); 
                
                this.state.pendingEnd = { 
                    title: "RAGE QUIT", 
                    lead: "Du hast den Monitor aus dem Fenster geworfen. Es hat sich gut angefühlt.",
                    cause: "rage",
                    diary,
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
                lead: "Zu viele offene Tickets! Das System ist kollabiert.",
                cause: "tickets",
                diary,
                isWin: false 
            };
        }
        // C. WARNING at 7 tickets
        else if(this.state.tickets >= 7 && !this.state.ticketWarning) {
            this.state.ticketWarning = true;
            this.showModal("WARNUNG", "Ticket-Stau! Schließe Anrufe ab, um Tickets zu reduzieren, sonst fliegst du!", false);
        }
        // D. FEIERABEND (Zeit abgelaufen) ODER PARTY-START
        else if(this.state.time >= 16*60+30) {
            
            // --- PARTY TRIGGER AT CLOSING TIME ---
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

            // All conditions met -> the gala replaces the normal end of day
            if (isVeteran && !partyPlayed) {
                // Do not start it here, queue it as pending
                this.state.pendingEnd = {
                    isParty: true,
                    partyKey: partyKey,
                    diffStr: currentDiffStr
                };
                return; 
            }
            // --- END PARTY TRIGGER ---


            // No party -> ordinary end of day
			this.incrementStat('daysSurvived');
            let diary = this.generateDiaryEntry("WIN");

            this.state.pendingEnd = { 
                title: "FEIERABEND", 
                lead: "16:30! Du hast den Tag überlebt.",
                cause: "time",
                diary,
                isWin: true 
            };
        }
        // E. GEFEUERT (Chef-Radar >= 100)
        else if(this.state.cr >= 100) {
			            
            // Where the "second chance" drops the radar back to, per difficulty
            let resetTo = 50; // Standard (Mittwoch)
            if (this.state.difficultyMult < 1.0) resetTo = 30; // Freitag
            if (this.state.difficultyMult > 1.2) resetTo = 60; // Montag

            if(!this.state.chefWarningReceived) {
                this.state.chefWarningReceived = true;
                
                // Reset the radar per difficulty
                this.state.cr = resetTo; 
                // Zwei Punkte: der Höchststand und der Reset direkt danach —
                // so fällt die Kurve im Endbildschirm senkrecht statt schräg.
                this.recordStatPoint();
                
                // --- Ten generic boss warnings ---
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
                
                // Reads naturally and ends on the concrete system value.
                let warningText = `${randomBoss} (Radar auf ${resetTo}% gesetzt).`;
                if(this.state.difficultyMult > 1.2) warningText += " Seine Adern an der Schläfe pulsieren bedenklich.";
                
                this.showModal("ABMAHNUNG", warningText, false);
            } else {
				this.incrementStat('daysFired');
                // 1. Tagebuch generieren
                let diary = this.generateDiaryEntry("FIRED");

                this.state.pendingEnd = { 
                    title: "GEFEUERT", 
                    lead: "Der Sicherheitsdienst begleitet dich raus. Deine Karriere hier ist vorbei.",
                    cause: "chef",
                    diary,
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
            
            // Drop the boss music and return to the chosen office style
            this.playMusic('office');
            
            // Freeze every background activity once the day is really over
            this.clearDayTimers();
            this.state.emailPending = false;
            
            // Der Tag ist vorbei — der Zwischenstand darf weg.
            this.clearDay();
            this.showEnd(end);
            this.state.pendingEnd = null; // Reset
        }
    },
    
    // async: the party pool is only fetched when the finale actually happens,
    // which most players never reach.
    startParty: async function() {
        await ensure('party');
        this.playAudio('ui');
        const endData = this.state.pendingEnd;
        this.state.pendingEnd = null; // clear the marker
        
        // Switch into party mode
        this.state.isPartyMode = true;
        this.state.partyProgress = 0;
        this.state.currentPartyKey = endData.partyKey; 
        
        // The party starts from a clean slate
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
        
        // And the trap closes: render the opening party event
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

            // 3. Base64, UTF-8 safe so emoji survive
            const base64 = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
            }));

            // 4. Checksum
            const checksum = this.calculateChecksum(base64);

            // 5. Return "BASE64-CHECKSUM"
            return `${base64}-${checksum}`;

        } catch (e) {
            console.error("Export Error:", e);
            return null;
        }
    },

    // --- TAGEBUCH GENERATOR ---
    generateDiaryEntry: function(endReason, partyText = "") {
        const state = this.state;
        
        // Turns ["A", "B", "C"] into the phrase "A, B und C"
        const formatList = (arr) => {
            if (arr.length === 0) return "";
            if (arr.length === 1) return arr[0];
            let last = arr.pop();
            return arr.join(", ") + " und " + last;
        };

        // Picks one phrasing at random
        const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

        // 1. EVENT ANALYSIS (locations)
        const usedArray = Array.from(state.usedIDs);
        const serverVisits = usedArray.filter(id => id.startsWith('srv_')).length;
        const callVisits = usedArray.filter(id => id.startsWith('call_')).length;
        const questVisits = usedArray.filter(id => id.startsWith('sq_')).length;

        // ==========================================
        // PARAGRAPH 1: overall mood and location
        // ==========================================
        let p1 = "";
        
        // Overall mood, driven by achievements
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

        // Where the day was mostly spent
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
        // PARAGRAPH 2: encounters (achievements and lore items)
        // ==========================================
        let p2 = "";
        let encounters = [];
        const hasAch = (id) => state.achievements.includes(id);
        const hasItem = (id) => state.inventory.some(i => i.id === id);

        // Story achievements, three phrasings each
        if (hasAch('ach_mentor')) encounters.push(pick(["ich Azubi Kevin vor dem totalen IT-Kollaps bewahrt habe", "ich Kevins Haut gerettet habe", "Kevin mir nun auf ewig etwas schuldig ist"]));
        if (hasAch('ach_ally')) encounters.push(pick(["ich eine unheilige Allianz mit Chantal aus dem Marketing geschmiedet habe", "Chantal und ich jetzt ein tödliches Team sind", "das Marketing nun in meiner Schuld steht"]));
        if (hasAch('ach_rockstar')) encounters.push(pick(["mir Gabi ihr feinstes Death-Metal-Mixtape anvertraut hat", "ich mit Gabi musikalisch voll auf einer Wellenlänge war", "Gabi und ich den Empfang gerockt haben"]));
        if (hasAch('ach_cat_whisperer')) encounters.push(pick(["ich das Katzenproblem der Buchhaltung gelöst habe", "ich zum offiziellen Katzenflüsterer von Frau Elster wurde", "Frau Elsters Kater Rüdiger und ich jetzt quasi Best Friends sind"]));
        if (hasAch('ach_keymaster')) encounters.push(pick(["mir Hausmeister Egon seinen Generalschlüssel überlassen hat", "ich dank Egon nun theoretisch überall reinpasse", "ich jetzt dank Egons Schlüssel die wahre Macht im Gebäude habe"]));
        if (hasAch('ach_closer')) encounters.push(pick(["ich mit Markus aus dem Sales einen extrem wichtigen Deal gerettet habe", "ich dem Vertrieb buchstäblich den Hintern gerettet habe", "Markus ohne mich heute seinen fetten Bonus verloren hätte"]));
        if (hasAch('ach_wolf')) encounters.push(pick(["ich dem Chef einen neuen Arbeitsvertrag aus den Rippen geleiert habe", "ich gehaltstechnisch endlich aufgestiegen bin", "ich den Chef in der Gehaltsverhandlung absolut dominiert habe"]));
        if (hasAch('ach_hacker')) encounters.push(pick(["ich mir illegale Admin-Rechte im System verschafft habe", "ich mich unbemerkt ins Root-Verzeichnis gehackt habe", "ich dank Root-Passwort jetzt der absolute Gott im Netzwerk bin"]));
        if (hasAch('ach_rich')) encounters.push(pick(["ich dem nigerianischen Prinzen mein Vertrauen geschenkt habe", "ich unfassbar reich werde (falls der Scam echt ist)", "ich bald Millionen auf dem Konto habe (hoffentlich)"]));
        
        // Lore items, three phrasings each
        if (hasItem('corp_chronicles')) encounters.push(pick(["ich die verbotene Firmenchronik studiert habe", "ich finstere Wahrheiten in einem alten Buch entdeckt habe", "ich die düsteren Geheimnisse des Gründers in der Chronik gelesen habe"]));
        if (hasItem('prince_letter')) encounters.push(pick(["ich diesen absurden Prinzen-Brief mit mir herumschleppe", "ich heute königliche Post erhalten habe", "mir ein echter Brief von einem Prinzen in die Hände gefallen ist"]));

        if (encounters.length > 0) {
            p2 += pick([
                `Besonders denkwürdig war heute, dass ${formatList(encounters)}. `,
                `Wenn ich auf den Tag zurückblicke, sticht besonders hervor, dass ${formatList(encounters)}. `,
                `Man wird sich wohl noch lange daran erinnern, dass ${formatList(encounters)}. `
            ]);
        }

        // Habits, three phrasings each
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
        // PARAGRAPH 2.5: warnings (reprimand and release valve)
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
        // PARAGRAPH 3: the ending
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
        // NACHSATZ: DER BLINDFLUG
        // ==========================================
        // Kein Erfolg, keine Trophäe — eine Randnotiz. Wer den ganzen Tag
        // ohne Zahlen gearbeitet hat, hat ihn anders erlebt als alle
        // anderen, und genau das gehört ins Logbuch. Nur bei überstandenen
        // Tagen: Ein Blindflug, der im Rage Quit endet, kommentiert sich
        // von selbst.
        let pBlind = "";
        if (state.blindRun && (endReason === "WIN" || endReason === "PARTY")) {
            const hard   = state.difficultyMult > 1.0;
            const easy   = state.difficultyMult < 1.0;

            if (hard) {
                pBlind = pick([
                    "Nachtrag: Ich habe den ganzen Montag über keine einzige Zahl gesehen. Keine Prozente, keine Ticketstände, nichts. Nur Gesichter, Tonfall und das Geräusch, das die Kaffeemaschine macht, wenn es zu spät ist. Ich habe ihn trotzdem überstanden. Ich weiß bis jetzt nicht, wie knapp es war, und ich will es auch nicht wissen.",
                    "Nachtrag: Montag, blind. Ich habe den Tag gelesen wie ein Seemann das Wetter — an der Art, wie Gabi 'guten Morgen' sagt, daran, wie lange Markus in der Tür stehen bleibt, daran, ob die Tür vom Chef offen war. Es hat funktioniert. Ich bin selbst am meisten überrascht.",
                    "Nachtrag: Kein einziger Balken, kein einziger Zähler, und dann auch noch ein Montag. Irgendwann hört man auf zu rechnen und fängt an zu spüren, wie der Laden steht. Das ist entweder Erfahrung oder die erste Stufe des Wahnsinns. Vermutlich beides."
                ]);
            } else if (easy) {
                pBlind = pick([
                    "Nachtrag: Ich habe heute alle Anzeigen ausgeblendet. Kein Prozentwert, kein Ticketstand. An einem Freitag ist das kein Kunststück, aber es war erstaunlich ruhig im Kopf, wenn niemand einem ständig vorrechnet, wie es um einen steht.",
                    "Nachtrag: Der ganze Tag ohne Zahlen. Man merkt schnell, dass die Kollegen die ehrlicheren Messgeräte sind — die Zahlen sagen einem nur, wie schlimm es ist, die Kollegen sagen einem, warum."
                ]);
            } else {
                pBlind = pick([
                    "Nachtrag: Heute habe ich sämtliche Anzeigen abgeschaltet und den Tag nach Gefühl gearbeitet. Keine Prozente, keine offenen Zähler, nur der Laden und ich. Rückblickend die klarste Sicht, die ich seit Monaten hatte.",
                    "Nachtrag: Ein ganzer Arbeitstag ohne eine einzige Kennzahl. Kein Dashboard, kein Zähler, kein Balken, der langsam rot wird. Nur Menschen, Geräusche und Erfahrung. Man sollte das öfter machen. Man wird es nicht öfter machen.",
                    "Nachtrag: Blind gearbeitet, von acht bis Feierabend. Als jemand mittags fragte, wie es denn stehe, konnte ich zum ersten Mal ehrlich antworten: keine Ahnung. Und es war trotzdem in Ordnung."
                ]);
            }
        }

        // ==========================================
        // ASSEMBLE THE HTML
        // ==========================================
        // Absätze als Daten; die Papier-Optik macht components/DiaryEntry.svelte.
        return { p1, p2, pWarn, pBlind, p3 };
    },

};
