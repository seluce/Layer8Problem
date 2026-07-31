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
    import { DB } from '../data.js';

    const SLOT_COUNT = 5;
    const STRESSBALL_COOLDOWN = 60;   // in-game minutes
    const CONSUMABLES = ['energy', 'donut', 'sandwich', 'chocolate', 'bubble_wrap'];

    const visible = $derived(
        state.inventory.filter(i => {
            const item = DB.items[i.id];
            return item && !item.quest;
        })
    );

    // Always five entries so empty slots keep the grid from collapsing.
    const slots = $derived(
        Array.from({ length: SLOT_COUNT }, (_, i) => {
            const entry = visible[i];
            if (!entry) return null;

            const item = DB.items[entry.id];
            const isStressball = entry.id === 'stressball';
            const wait = STRESSBALL_COOLDOWN - (state.time - state.lastStressballTime);

            return {
                id: entry.id,
                item,
                name: item?.name ?? 'Unbekannt',
                isStressball,
                ready: isStressball && wait <= 0,
                wait,
                isConsumable: CONSUMABLES.includes(entry.id)
            };
        })
    );


    function slotClass(slot) {
        if (!slot) return 'inv-slot empty';
        if (slot.isStressball && slot.ready) return 'inv-slot relative group cursor-pointer border-green-500 hover:bg-green-900/20';
        if (slot.isConsumable) return 'inv-slot relative group cursor-pointer border-blue-500 hover:bg-blue-900/20';
        return 'inv-slot relative group';
    }

    function slotTitle(slot) {
        if (!slot) return '';
        return slot.isStressball && slot.ready ? `${slot.name} (Benutzen)` : slot.name;
    }

    function activate(slot) {
        if (!slot) return;

        if (slot.isStressball) {
            if (slot.ready) engine.askUseItem('stressball');
            else engine.log(`Der Ball ist noch völlig plattgedrückt. Gib ihm Zeit, sich zu entfalten. (${slot.wait} Min)`, 'text-slate-500');
            return;
        }

        if (slot.isConsumable) engine.askUseItem(slot.id);
        else engine.openInventory();
    }
</script>

{#each slots as slot, i (i)}
    <div class={slotClass(slot)} title={slotTitle(slot)} onclick={() => activate(slot)}>
        {#if slot}
            {#if slot.item?.img}
                <img src={slot.item.img} class="w-full h-full object-contain p-1 pointer-events-none" alt={slot.name}>
            {:else}
                {slot.item?.icon ?? '?'}
            {/if}

            {#if slot.isStressball}
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
