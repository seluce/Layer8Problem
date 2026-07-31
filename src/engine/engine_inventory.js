import { DB } from '../data.js';

export const inventory = {

    // --- INVENTAR SYSTEM ---
    // Contents are rendered by components/InventoryFull.svelte from
    // state.inventory; this only opens the window.
    openInventory: function() {
        const modal = document.getElementById('inventory-modal');
        if (!modal) return;
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