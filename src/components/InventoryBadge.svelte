<!--
  "+N" counter next to the backpack button.

  Separate from InventorySlots because it sits in a different part of the DOM,
  but it counts the same thing: visible, non-quest items beyond the fifth slot.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { tree } from '../i18n/i18n.svelte.js';

    const SLOT_COUNT = 5;

    const overflow = $derived(
        Math.max(0, state.inventory.filter(i => {
            const item = tree().items[i.id];
            return item && !item.quest;
        }).length - SLOT_COUNT)
    );
</script>

{#if overflow > 0}
    <span class="bg-amber-500 text-black text-[9px] font-bold px-1.5 rounded-full">+{overflow}</span>
{/if}
