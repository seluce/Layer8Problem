import { DB } from '../data.js';

export const inventory = {

    // --- INVENTORY SYSTEM ---
    // Contents are rendered by components/InventoryFull.svelte from
    // state.inventory; this only opens the window.
    openInventory: function() {
        const modal = document.getElementById('inventory-modal');
        if (!modal) return;
        this.showOverlay(modal);
    },

    closeInventory: function() {
        const modal = document.getElementById('inventory-modal');
        this.hideOverlay(modal);
    },
		
    // --- ITEM SYSTEM (with confirmation prompt) ---
    
    // 1. Ask first: are you sure?
    //
    // What an item does and what the dialog says about it comes from
    // data_items.js. This function only asks the questions that are about
    // timing and settings, not about the item itself.
    askUseItem: function(id) {
        const item = DB.items[id];
        const use = item?.use;

        // Cooldown check BEFORE the modal
        if (use?.cooldown && this.state.time - this.state.lastStressballTime < use.cooldown) {
            const wait = use.cooldown - (this.state.time - this.state.lastStressballTime);
            this.log(`Der Ball ist noch platt. Er muss sich erst wieder entfalten (${wait} Min).`, "text-slate-500");
            return; // No modal, abort right away
        }

        // --- LORE ITEM CHECK ---
        if (id === 'corp_chronicles') {
            this.showLoreModal();
            return; // no modal needed, the lore window takes over
        }

        // --- ONE-CLICK ITEM LOGIC ---
        if (this.state.oneClickItem) {
            this.state.pendingItem = id;
            this.confirmUseItem();
            return; // stop here, no modal
        }

        // With an image, build an img tag carrying the matching classes;
        // otherwise fall back to the emoji.
        // innerHTML on purpose: the content contains an img tag
        let displayContent = "❓";
        if (item) {
            displayContent = item.img
                ? `<img src="${item.img}" class="w-full h-full object-contain drop-shadow-md" alt="${item.name}">`
                : item.icon;
        }

        this.state.pendingItem = id;

        document.getElementById('item-confirm-icon').innerHTML = displayContent;
        document.getElementById('item-confirm-title').innerText = item ? item.name : id;
        document.getElementById('item-confirm-desc').innerText = use?.desc ?? "Unbekannter Effekt.";
        document.getElementById('item-confirm-warn').innerText = use?.warn ?? "Dieses Item wird verbraucht.";

        this.showOverlay('item-confirm-modal');
    },

    // 2. Confirmed - actually do it
    confirmUseItem: function() {
        this.playAudio('ui');
        const id = this.state.pendingItem;
        if (!id) return;

        this.closeItemConfirm(); // Fenster zu

        // Is the inventory open? Decides whether the view needs refreshing.
        const isInvOpen = !document.getElementById('inventory-modal').classList.contains('hidden');

        const item = DB.items[id];
        const use = item?.use;

        if (use) {
            // Items marked keep survive being used and go on cooldown instead
            // of leaving the backpack. Everything else has to actually be in
            // the backpack before it can take effect.
            let takes = true;
            if (item.keep) {
                if (use.cooldown) this.state.lastStressballTime = this.state.time;
            } else {
                const index = this.state.inventory.findIndex(i => i.id === id);
                if (index > -1) this.state.inventory.splice(index, 1);
                else takes = false;
            }

            if (takes) {
                if (use.al) this.state.al = Math.max(0, this.state.al + use.al);
                if (use.fl) this.state.fl = Math.max(0, this.state.fl + use.fl);
                this.log(use.log, use.color);
            }
        }

        this.updateUI(); // Balken updaten
        if (isInvOpen) this.openInventory(); // Redraw the inventory (the item is gone)
        this.state.pendingItem = null;
    },

    closeItemConfirm: function() {
		this.playAudio('ui');
        this.hideOverlay('item-confirm-modal');
        this.state.pendingItem = null;
    },

};