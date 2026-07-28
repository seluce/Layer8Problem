import { DB } from '../../data.js';

export const inventory = {

    // --- INVENTAR SYSTEM ---
    openInventory: function() {
        const modal = document.getElementById('inventory-modal');
        const grid = document.getElementById('full-inventory-grid');
        
        // Clear the grid and prepare the two-section layout
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
        const renderSlot = (itemData, isQuest, index) => {
            let slot = document.createElement('div');
            let dbItem = DB.items[itemData.id];
            
            // Standard-Klassen
            let baseClass = isQuest 
                ? 'inv-slot relative group cursor-help border-amber-500/50 bg-amber-900/10' 
                : 'inv-slot relative group cursor-default';

            // Special case: the book stays clickable even though it is a quest item
            if (itemData.id === 'corp_chronicles') {
                baseClass = 'inv-slot relative group cursor-pointer border-amber-400 bg-amber-900/20 hover:bg-amber-900/40 shadow-[0_0_15px_rgba(251,191,36,0.3)]';
            }
            
            slot.className = baseClass;
            slot.style.marginBottom = "15px"; 

            // --- BILD VS ICON LOGIK ---
            let mainContent = '?';
            let tooltipHtml = ''; 
            
            if (dbItem) {
                if (dbItem.img) {
                    mainContent = `<img src="${dbItem.img}" class="w-full h-full object-contain p-1 pointer-events-none" alt="${dbItem.name}">`;
                } else {
                    mainContent = dbItem.icon;
                }

                // --- EDGE HANDLING FOR THE TOOLTIP ---
                let posClass = "left-1/2 -translate-x-1/2"; // Standard: Zentriert
                let arrowPos = "left-1/2 -translate-x-1/2"; 
                
                if (index !== undefined) {
                    let col = index % 5; // column, 0 to 4
                    
                    if (col === 0) {
                        // Leftmost: anchor the tooltip left, move the arrow to 20px
                        posClass = "left-0 translate-x-0";
                        arrowPos = "left-5 translate-x-0"; 
                    } else if (col === 4) {
                        // Rightmost: anchor the tooltip right, move the arrow in from the right
                        posClass = "right-0 left-auto translate-x-0";
                        arrowPos = "right-5 left-auto translate-x-0";
                    }
                }

                // --- TOOLTIP GENERIEREN ---
                let flavorText = dbItem.flavor ? dbItem.flavor : '"Keine weiteren Informationen."';

                tooltipHtml = `
                    <div class="absolute bottom-[110%] ${posClass} mb-2 w-56 p-3 bg-slate-950 border border-slate-600 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[1000] pointer-events-none flex flex-col text-left">
                        <div class="font-bold text-amber-400 text-sm border-b border-slate-700 pb-1 mb-1">${dbItem.name}</div>
                        <div class="text-[10px] text-slate-300 italic leading-snug">${flavorText}</div>
                        <div class="absolute top-full ${arrowPos} border-4 border-transparent border-t-slate-600"></div>
                    </div>
                `;
            }

            // Label underneath. pointer-events-none keeps it from swallowing hovers.
            let labelHtml = `<div class="absolute -bottom-6 w-full text-center text-[8px] text-slate-400 truncate pointer-events-none">${dbItem ? dbItem.name : '???'}</div>`;

            // Inhalt setzen
            slot.innerHTML = mainContent + tooltipHtml + labelHtml;
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
                        // Cooldown overlay, simply appended
                        slot.innerHTML += `<div class="absolute inset-0 bg-slate-900/70 rounded flex items-center justify-center z-10 backdrop-blur-[1px]"><span class="font-black text-white text-xl">${wait}</span></div>`;
                        slot.onclick = () => this.log(`Der Ball ist noch völlig plattgedrückt. Gib ihm Zeit, sich zu entfalten. (${wait} Min)`, "text-slate-500");
                    }
                }
               else if (['energy', 'donut', 'sandwich', 'chocolate', 'bubble_wrap'].includes(itemData.id)) {
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

        normalItems.forEach((item, index) => {
            gridNormal.appendChild(renderSlot(item, false, index));
        });

        // Pad the grid with empty slots (up to 10)
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

            questItems.forEach((item, index) => {
                gridQuest.appendChild(renderSlot(item, true, index));
            });
            
            sectionQuest.appendChild(gridQuest);
            grid.appendChild(sectionQuest);
        }

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    closeInventory: function() {
        const modal = document.getElementById('inventory-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('overflow-hidden');
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
            return; // no modal needed, the lore window takes over
        }
        
        // --- ONE-CLICK ITEM LOGIK ---
        if (this.state.oneClickItem) {
            this.state.pendingItem = id;
            this.confirmUseItem();
            return; // stop here, no modal
        }

        // Daten holen
        let itemDB = DB.items[id];
        let title = itemDB ? itemDB.name : id; 
        
        // --- BILD VS ICON LOGIK ---
        let displayContent = "❓";
        if (itemDB) {
            if (itemDB.img) {
                // With an image, build an img tag carrying the matching classes
                displayContent = `<img src="${itemDB.img}" class="w-full h-full object-contain drop-shadow-md" alt="${itemDB.name}">`;
            } else {
                // Fall back to the emoji
                displayContent = itemDB.icon;
            }
        }
        
        let desc = "Unbekannter Effekt.";
        let warn = "Dieses Item wird verbraucht.";

        // --- FLAVOR TEXTE ---
        if (id === 'stressball') {
            desc = "Senkt AGGRO sofort um -5 Punkte. *Quietsch*";
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

        // Fill the modal
        this.state.pendingItem = id; 
        
        // innerHTML on purpose: the content contains an img tag
        document.getElementById('item-confirm-icon').innerHTML = displayContent;
        
        document.getElementById('item-confirm-title').innerText = title;
        document.getElementById('item-confirm-desc').innerText = desc;
        document.getElementById('item-confirm-warn').innerText = warn;

        // Modal anzeigen
        document.getElementById('item-confirm-modal').classList.remove('hidden');
        document.getElementById('item-confirm-modal').classList.add('flex');
        document.body.classList.add('overflow-hidden');
    },

    // 2. Confirmed - actually do it
    confirmUseItem: function() {
		this.playAudio('ui');
        let id = this.state.pendingItem;
        if (!id) return;

        this.closeItemConfirm(); // Fenster zu
        
        // Is the inventory open? Decides whether the view needs refreshing.
        const isInvOpen = !document.getElementById('inventory-modal').classList.contains('hidden');

        // --- LOGIK ---
        
        // A. Kein Verbrauch (nur Cooldown)
        if (id === 'stressball') {
            this.state.al = Math.max(0, this.state.al - 5);
            
            this.state.lastStressballTime = this.state.time;
            this.log("Du knetest den Ball aggressiv. *Quietsch*. Das hilft. (Aggro -5)", "text-green-400");
        }

        // B. CONSUMABLES
        else if (['energy', 'donut', 'bubble_wrap', 'sandwich', 'chocolate'].includes(id)) {
            let index = this.state.inventory.findIndex(i => i.id === id);
            
            if (index > -1) {
                this.state.inventory.splice(index, 1); // drop it from the inventory
                
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
        document.body.classList.remove('overflow-hidden');
        this.state.pendingItem = null;
    },

};