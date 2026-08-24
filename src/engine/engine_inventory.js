import { DB } from '../data.js';
import { t, tf } from '../i18n/i18n.svelte.js';
import { itemNameValue } from './recipe.js';

export const inventory = {

    // --- INVENTORY SYSTEM ---
    // Contents are rendered by components/InventoryFull.svelte from
    // state.inventory; this only opens the window.
    openInventory: function() {
        const modal = document.getElementById('inventory-modal');
        if (!modal) return;
        this.showOverlay(modal);
        this.emit('openInventory');
    },

    closeInventory: function() {
        const modal = document.getElementById('inventory-modal');
        this.hideOverlay(modal);
        this.emit('closeInventory');
    },
		
    // --- ITEM SYSTEM (with confirmation prompt) ---
    
    // 1. Ask first: are you sure?
    //
    // What an item does and what the dialog says about it comes from
    // data_items.js. This function only asks the questions that are about
    // timing and settings, not about the item itself.
    /**
     * The line an item writes when it is not ready yet.
     *
     * Built in ONE place because three call it: this file, and both inventory
     * components. Those two assembled it themselves with tf() - and tf()
     * returns a finished SENTENCE, so a cooldown line was pinned to the
     * language it was clicked in while every other line in the log followed a
     * switch. A recipe travels as an identity and renders on the way out.
     *
     * The fallback is a recipe too now, for the same reason: it used to be the
     * one half of this line that could still freeze.
     */
    itemCooldownLine: function(id, wait) {
        const item = DB.items?.[id];
        // The item says how it phrases its own pause; the fallback keeps a new
        // item from sounding like the stress ball.
        const line = item?.use?.wait
            ? { ref: { p: 'items', i: id, path: ['use', 'wait'] } }
            : { k: 'item.cooldown.fallback',
                v: { item: item ? itemNameValue(id) : { k: 'item.fallbackName' } } };
        return { k: 'log.item.cooldown', v: { line, wait } };
    },

    askUseItem: function(id) {
        // The one place the engine ASKS instead of telling: during step 8 the
        // tutorial refuses everything but the doughnut, and the modal stays
        // shut. See engine_hooks.js.
        if (!this.allowsItem(id)) return;

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
                // Two nested sentences, both keeping their identity: the item's
                // own wording if it has one, otherwise the dictionary fallback
                // naming the item.
                this.log(this.itemCooldownLine(id, wait), "text-slate-500");
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

        this.state.pendingItem = id;
        this.setItemConfirmMode('use');
        this.dressItemConfirm();

        this.showOverlay('item-confirm-modal');
    },

    // 2. Confirmed - actually do it
    confirmUseItem: function() {
        this.playAudio('ui');
        const id = this.state.pendingItem;
        if (!id) return;

        this.closeItemConfirm(); // window shut

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
                // Both bounds on every stat. Until 6.1.1 a and l only had the
                // floor, while the comment below claimed parity with the event
                // path - a positive use.a/use.l overshot 100 for one frame
                // until updateUI re-clamped.
                // Each of the three floats its number, the way every other
                // path does. Until 6.2 only `b` below had one - and since
                // EVERY usable item relieves aggro while only the three
                // trade-off ones raise the boss radar, the silent case was
                // the ordinary one: the bar moved and nothing said so.
                if (use.a) {
                    this.state.al = Math.max(0, Math.min(100, this.state.al + use.a));
                    this.showFloatingText('val-al', use.a);
                }
                if (use.l) {
                    this.state.fl = Math.max(0, Math.min(100, this.state.fl + use.l));
                    this.showFloatingText('val-fl', use.l);
                }
                // b and rep make trade-off items possible: relief now, paid
                // for on the boss's radar or in someone's regard. Same clamps
                // as the event path, so an item cannot do what an event may not.
                if (use.b) {
                    this.state.cr = Math.max(0, Math.min(100, this.state.cr + use.b));
                    this.showFloatingText('val-cr', use.b);
                }
                if (use.rep) this.applyReputation(use.rep);
                this.log({ ref: { p: 'items', i: id, path: ['use', 'log'] } }, use.color);
                // The day curve has to see this. An item can move three stats
                // at once, and without a point the chart drew a straight line
                // through the change - and the diary, which derives its peak
                // from the same history, could call such a day calm.
                this.recordStatPoint();
            }
        }

        this.updateUI(); // redraw the bars

        // updateUI ran checkEndConditions, and an item alone can end the day
        // (a use.b that lands the radar on 100 with the warning spent). Every
        // sibling that applies effects follows up - resolveTerminal via its
        // result button, resolveEmail with exactly this call - but here the
        // fired state sat stranded: buttons enabled, saveDay refusing, and the
        // ending only surfaced after the next unrelated event.
        if (this.state.pendingEnd) {
            this.state.pendingItem = null;
            this.emit('confirmUseItem');
            this.finishGame();
            return;
        }

        if (isInvOpen) this.openInventory(); // Redraw the inventory (the item is gone)
        this.state.pendingItem = null;
        this.emit('confirmUseItem');
    },

    /**
     * Switches the confirmation dialog between using and discarding.
     *
     * Two buttons in the markup rather than one whose label and colour get
     * rewritten: engine_ui already overwrites className in a few places, and
     * every one of those has cost an afternoon when the markup changed. Here
     * the two buttons simply take turns being hidden.
     */
    /**
     * The four fields of the item dialog, painted from state.
     *
     * Written straight into the DOM by askUseItem/askDiscardItem until 6.1.1,
     * with no way to do it a second time - so a language switch left name,
     * effect and warning standing in the old language. The heading was worse
     * than frozen: `#item-confirm-kind` carries data-i18n="item.confirm.title",
     * and applyStaticStrings() put "Use item" back over a dialog whose visible
     * button was DISCARD. state.pendingItem and state.pendingItemMode always
     * held everything needed to rebuild it; nobody did.
     */
    dressItemConfirm: function() {
        const id = this.state.pendingItem;
        if (!id) return;

        const item = DB.items[id];
        const discarding = this.state.pendingItemMode === 'discard';
        const use = item?.use;

        const icon  = document.getElementById('item-confirm-icon');
        const title = document.getElementById('item-confirm-title');
        const desc  = document.getElementById('item-confirm-desc');
        const warn  = document.getElementById('item-confirm-warn');
        const kind  = document.getElementById('item-confirm-kind');

        if (icon) icon.innerHTML = item?.img
            ? `<img src="${item.img}" class="w-full h-full object-contain drop-shadow-md" alt="${item.name}">`
            : (item?.icon ?? '❓');
        if (title) title.innerText = item ? item.name : id;
        if (kind) kind.innerText = t(discarding ? 'item.confirm.title.discard' : 'item.confirm.title');

        if (discarding) {
            if (desc) desc.innerText = t(item?.keep ? 'item.discard.reusable' : 'item.discard.consumable');
            if (warn) warn.innerText = t('item.discard.warn');
        } else {
            if (desc) desc.innerText = use?.desc ?? t('item.effect.unknown');
            if (warn) warn.innerText = use?.warn ?? t('item.warn.consumed');
        }
    },

    setItemConfirmMode: function(mode) {
        this.state.pendingItemMode = mode;
        const useBtn = document.getElementById('item-confirm-use');
        const dropBtn = document.getElementById('item-confirm-discard');
        // The heading belongs to dressItemConfirm(), which is the one that can
        // be run again; this keeps only what a repaint must not undo.
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
        this.dressItemConfirm();

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

        this.state.inventory.splice(i, 1);
        this.log({ k: 'log.item.discarded', v: { item: itemNameValue(id) } }, 'text-slate-500 italic');
        this.updateUI();
        this.saveDay();
    },

    closeItemConfirm: function() {
		this.playAudio('ui');
        this.hideOverlay('item-confirm-modal');
        this.state.pendingItem = null;
        this.state.pendingItemMode = null;
        this.emit('closeItemConfirm');
    },

};