<!--
  The five inventory slots next to the log.

  Renders into #inventory-grid, which keeps its grid classes.

  Quest items are hidden here on purpose — they are trophies, not equipment,
  and belong in the archive. Items beyond the fifth are counted by
  InventoryBadge.svelte, which sits next to the backpack button rather than in
  this grid.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';

    import { t, tf, tree } from '../i18n/i18n.svelte.js';
    const SLOT_COUNT = 5;

    // Usable, how long it rests and whether it survives - all of that is in
    // data_items.js under `use`. Nothing about items is listed here.
    const usable = (id) => !!tree().items[id]?.use;
    const cooldownOf = (id) => tree().items[id]?.use?.cooldown ?? 0;

    const visible = $derived(
        state.inventory.filter(i => {
            const item = tree().items[i.id];
            return item && !item.quest;
        })
    );

    // Always five entries so empty slots keep the grid from collapsing.
    const slots = $derived(
        Array.from({ length: SLOT_COUNT }, (_, i) => {
            const entry = visible[i];
            if (!entry) return null;

            const item = tree().items[entry.id];
            const cooldown = cooldownOf(entry.id);
            const wait = cooldown - (state.time - (state.itemCooldowns?.[entry.id] ?? -100000));

            return {
                id: entry.id,
                item,
                name: item?.name ?? t('archive.unknown'),
                hasCooldown: cooldown > 0,
                ready: cooldown > 0 && wait <= 0,
                wait,
                isConsumable: usable(entry.id) && !cooldown
            };
        })
    );


    function slotClass(slot) {
        if (!slot) return 'inv-slot empty';
        if (slot.hasCooldown && slot.ready) return 'inv-slot relative group cursor-pointer border-green-500 hover:bg-green-900/20';
        if (slot.isConsumable) return 'inv-slot relative group cursor-pointer border-blue-500 hover:bg-blue-900/20';
        return 'inv-slot relative group';
    }

    function slotTitle(slot) {
        if (!slot) return '';
        return slot.hasCooldown && slot.ready ? tf('inv.slot.use', { item: slot.name }) : slot.name;
    }

    function activate(slot) {
        if (!slot) return;

        if (slot.hasCooldown) {
            if (slot.ready) engine.askUseItem(slot.id);
            // Built by hand here until 6.0, which put a German sentence and a
            // glued-on "Min" into the English game, and still as a finished
            // sentence until 6.1.1, which froze the line in whatever language
            // it was clicked in. The engine owns the wording now.
            else engine.log(engine.itemCooldownLine(slot.id, slot.wait), 'text-slate-500');
            return;
        }

        if (slot.isConsumable) engine.askUseItem(slot.id);
        else engine.openInventory();
    }
    // Keyboard support for the slots. They stay containers rather than
    // buttons because they hold tooltip boxes and overlays - flow content,
    // which may not sit inside a <button>. stopPropagation keeps Enter and
    // Space away from the global key handling in engine.js, so a focused slot
    // does not also fire the confirm action.
    function keyActivate(event, target) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        event.stopPropagation();
        activate(target);
    }
</script>

{#each slots as slot, i (i)}
    <div class={slotClass(slot)} title={slotTitle(slot)} role="button" tabindex="0"
         aria-label={slotTitle(slot) || t('inv.emptySlot')}
         onclick={() => activate(slot)} onkeydown={(e) => keyActivate(e, slot)}>
        {#if slot}
            {#if slot.item?.img}
                <img src={slot.item.img} class="w-full h-full object-contain p-1 pointer-events-none" alt={slot.name} onerror={(e) => e.currentTarget.remove()}>
            {:else}
                {slot.item?.icon ?? '?'}
            {/if}

            {#if slot.hasCooldown}
                {#if slot.ready}
                    <div class="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {:else}
                    <div class="absolute inset-0 bg-slate-900/70 rounded-sm flex items-center justify-center z-10 backdrop-blur-[1px]">
                        <span class="font-bold text-white text-xs select-none">{slot.wait}</span>
                    </div>
                {/if}
            {/if}
        {/if}
    </div>
{/each}
