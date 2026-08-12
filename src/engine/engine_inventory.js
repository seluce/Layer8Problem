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

        // Cooldown check BEFORE the modal. Each item carries its own clock,
        // so a cooling stress ball does not lock the voodoo doll.
        if (use?.cooldown) {
            const last = this.state.itemCooldowns?.[id] ?? -100000;
            const wait = use.cooldown - (this.state.time - last);
            if (wait > 0) {
                // The item says how it phrases its own pause; the fallback
                // keeps a new item from sounding like the stress ball.
                const line = use.wait ?? `${item?.name ?? 'Der Gegenstand'} braucht noch etwas Zeit`;
                this.log(`${line} (${wait} Min).`, "text-slate-500");
                return; // No modal, abort right away
            }
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

        this.setItemConfirmMode('use');
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
                if (use.cooldown) this.state.itemCooldowns[id] = this.state.time;
            } else {
                const index = this.state.inventory.findIndex(i => i.id === id);
                if (index > -1) this.state.inventory.splice(index, 1);
                else takes = false;
            }

            if (takes) {
                if (use.al) this.state.al = Math.max(0, this.state.al + use.al);
                if (use.fl) this.state.fl = Math.max(0, this.state.fl + use.fl);
                // cr and rep make trade-off items possible: relief now, paid
                // for on the boss's radar or in someone's regard. Same clamps
                // as the event path, so an item cannot do what an event may not.
                if (use.cr) {
                    this.state.cr = Math.max(0, Math.min(100, this.state.cr + use.cr));
                    this.showFloatingText('val-cr', use.cr);
                }
                if (use.rep) this.applyReputation(use.rep);
                this.log(use.log, use.color);
            }
        }

        this.updateUI(); // Balken updaten
        if (isInvOpen) this.openInventory(); // Redraw the inventory (the item is gone)
        this.state.pendingItem = null;
    },

    /**
     * Switches the confirmation dialog between using and discarding.
     *
     * Two buttons in the markup rather than one whose label and colour get
     * rewritten: engine_ui already overwrites className in a few places, and
     * every one of those has cost an afternoon when the markup changed. Here
     * the two buttons simply take turns being hidden.
     */
    setItemConfirmMode: function(mode) {
        this.state.pendingItemMode = mode;
        const kind = document.getElementById('item-confirm-kind');
        const useBtn = document.getElementById('item-confirm-use');
        const dropBtn = document.getElementById('item-confirm-discard');
        if (kind) kind.innerText = mode === 'discard' ? 'Gegenstand wegwerfen' : 'Gegenstand benutzen';
        useBtn?.classList.toggle('hidden', mode === 'discard');
        dropBtn?.classList.toggle('hidden', mode !== 'discard');
    },

    /**
     * The backpack holds ten pieces and nothing stacks, which is the point -
     * but across a whole week that turns into a lock: tools bypass the cap
     * when they are picked up, so a hoarder ends up unable to take any
     * consumable at all. Throwing something away turns that dead end back
     * into a decision - keep the screwdriver, or make room for the donut.
     *
     * Trophies are not offered: they cost no capacity and stand for something
     * that happened.
     */
    askDiscardItem: function(id) {
        const item = DB.items[id];
        if (!item || item.quest) return;

        this.state.pendingItem = id;
        this.setItemConfirmMode('discard');

        document.getElementById('item-confirm-icon').innerHTML = item.img
            ? `<img src="${item.img}" class="w-full h-full object-contain drop-shadow-md" alt="${item.name}">`
            : (item.icon ?? '❓');
        document.getElementById('item-confirm-title').innerText = item.name;
        document.getElementById('item-confirm-desc').innerText = item.keep
            ? 'Wiederverwendbar - du gibst ein Werkzeug auf.'
            : 'Verbrauchsgut - du gibst eine einmalige Wirkung auf.';
        document.getElementById('item-confirm-warn').innerText =
            'Der Gegenstand ist weg. Ob dir noch einmal einer über den Weg läuft, entscheidet der Zufall.';

        this.showOverlay('item-confirm-modal');
    },

    /** Confirmed: the item leaves the backpack. */
    confirmDiscardItem: function() {
        this.playAudio('ui');
        const id = this.state.pendingItem;
        if (!id) return;

        const i = this.state.inventory.findIndex(entry => entry.id === id);
        this.closeItemConfirm();
        if (i === -1) return;

        const name = DB.items[id]?.name ?? id;
        this.state.inventory.splice(i, 1);
        this.log(`${name} weggeworfen. Der Papierkorb im Flur ist ohnehin nie voll.`, 'text-slate-500 italic');
        this.updateUI();
        this.saveDay();
    },

    closeItemConfirm: function() {
		this.playAudio('ui');
        this.hideOverlay('item-confirm-modal');
        this.state.pendingItem = null;
        this.state.pendingItemMode = null;
    },

};