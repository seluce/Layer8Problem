<!--
  The full inventory, split into equipment and trophies.

  Trophies are shown apart because they cannot be used — they are proof that
  something happened, not something you carry for a purpose. The one exception
  is the chronicle, which opens the lore book.

  Tooltips shift sideways in the outermost columns so they stay on screen.
  The box itself lives in ItemTooltip.svelte, shared with the archive.

  Touch has no hover, so on a phone or the Steam Deck the tooltip was simply
  unreachable: the flavour text and the line about whether an item survives
  being used are mouse-only knowledge otherwise. A tap now pins the tooltip of
  that slot, and a second tap on the same slot does what a click has always
  done. Anything else - a tap outside, scrolling, Escape, leaving by keyboard -
  unpins it again.

  Equipment can be thrown away. The backpack holds ten and nothing stacks,
  which across a whole week turns into a dead end: tools bypass the cap when
  picked up, so a hoarder can end up unable to take a single consumable.
  Discarding turns that into a decision instead of a wall. Trophies stay -
  they cost no capacity and stand for something that happened.

  How to reach it took three attempts, and the first two are worth writing
  down. A bin badge in the slot corner was 24px across and sat in the gap
  between two slots: below every touch guideline. Moving it into the tooltip
  made the target big but unreachable with a mouse - the tooltip floats above
  the slot with a gap in between, so moving towards it leaves the slot and
  closes it. The mode is what phones have always done for deleting: press the
  bin once, then pick what goes. Same flow for mouse, finger, keyboard and the
  Deck, and the target is a whole slot.
-->
<script>
    // Renamed so the $state rune stays usable in this file - see the pitfall
    // noted in STRUCTURE.md.
    import { state as game } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import ItemTooltip from './ItemTooltip.svelte';

    import { t, tf, tree } from '../i18n/i18n.svelte.js';
    // Minutes an item still has to cool down; 0 or less means ready. Reads the
    // item's own clock, so several cooldown items no longer share one.
    const waitFor = (id) => {
        const cd = tree().items[id]?.use?.cooldown ?? 0;
        return cd ? cd - (game.time - (game.itemCooldowns?.[id] ?? -100000)) : 0;
    };
    // Usable, how long it rests and whether it survives - all of that is in
    // data_items.js under `use`. Nothing about items is listed here.
    const usable = (id) => !!tree().items[id]?.use;
    const cooldownOf = (id) => tree().items[id]?.use?.cooldown ?? 0;
    const isConsumable = (id) => usable(id) && !cooldownOf(id);

    const entries = $derived(
        game.inventory.map((entry, i) => {
            const item = tree().items[entry.id];
            return { entry, item, quest: !!item?.quest, key: `${entry.id}-${i}` };
        })
    );

    const normal = $derived(entries.filter(e => !e.quest));
    const quest  = $derived(entries.filter(e => e.quest));

    // Pad the equipment grid to a full backpack so the layout does not jump
    // around as items come and go. Trophies get no padding — an empty trophy
    // slot would suggest something is missing.
    const MIN_SLOTS = 10;
    const emptySlots = $derived(Math.max(0, MIN_SLOTS - normal.length));


    // Which slot currently has its tooltip pinned, by key. Only touch and
    // keyboard set this; a mouse still gets the tooltip from :hover alone.
    let pinned = $state(null);

    /**
     * Discard mode. A bin badge on each slot was tried first and thrown out
     * twice: at 24px in the gap between two slots it was a mis-tap waiting to
     * happen, and inside the tooltip it was unreachable with a mouse, because
     * the tooltip sits above the slot with a gap in between - moving towards
     * it leaves the slot and closes it.
     *
     * A mode is the pattern every phone already uses for deleting: press the
     * bin once, then pick what goes. One flow for mouse, finger, keyboard and
     * the Deck, and the target is the whole slot instead of a corner of it.
     */
    let discardMode = $state(false);

    // Whether the last press came from a finger or a pen. Read in the click
    // handler, because a click event does not carry the pointer type in every
    // browser.
    let coarsePress = $state(false);

    // The grid is grid-cols-3 sm:grid-cols-4 md:grid-cols-5, so the column a
    // slot sits in depends on the viewport. Assuming five columns pushed the
    // tooltip of every leftmost slot off the screen edge on a phone - which is
    // exactly where tooltips became reachable in the first place.
    let columns = $state(5);

    $effect(() => {
        const steps = [
            [window.matchMedia('(min-width: 768px)'), 5],
            [window.matchMedia('(min-width: 640px)'), 4]
        ];
        const update = () => { columns = steps.find(([query]) => query.matches)?.[1] ?? 3; };
        update();
        steps.forEach(([query]) => query.addEventListener('change', update));
        return () => steps.forEach(([query]) => query.removeEventListener('change', update));
    });

    // A pinned tooltip must never outlive the gesture that opened it. The
    // pointer listener ignores presses on a slot, because those are handled by
    // the slot itself - it is everything else that closes the tooltip.
    /**
     * Discard mode does not survive closing the backpack.
     *
     * What is watched is the window itself, not a close button: Escape hides
     * the topmost overlay directly without calling closeInventory(), and the
     * cross takes yet another route. Hanging off the element catches every one
     * of them - including one that does not exist yet.
     */
    $effect(() => {
        const modal = document.getElementById('inventory-modal');
        if (!modal) return;

        const beobachter = new MutationObserver(() => {
            if (modal.classList.contains('hidden')) {
                discardMode = false;
                pinned = null;
            }
        });
        beobachter.observe(modal, { attributes: true, attributeFilter: ['class'] });
        return () => beobachter.disconnect();
    });

    $effect(() => {
        const closeOnOutsidePress = (event) => {
            if (event.target?.closest?.('[data-inv-slot]')) return;
            pinned = null;
        };
        const closeOnEscape = (event) => {
            if (event.key !== 'Escape') return;
            pinned = null;
            discardMode = false;
        };
        const close = () => { pinned = null; };

        window.addEventListener('pointerdown', closeOnOutsidePress);
        window.addEventListener('keydown', closeOnEscape);
        window.addEventListener('scroll', close, true);
        return () => {
            window.removeEventListener('pointerdown', closeOnOutsidePress);
            window.removeEventListener('keydown', closeOnEscape);
            window.removeEventListener('scroll', close, true);
        };
    });

    function slotClass(row) {
        const ring = pinned === row.key ? ' ring-2 ring-slate-400/70' : '';

        // In discard mode every equipment slot looks the same - clickable
        // and outlined in red. Trophies stay as they are.
        if (discardMode && !row.quest) {
            return 'inv-slot relative group cursor-pointer border-red-900/60 bg-red-950/40 hover:border-red-600 hover:bg-red-900/50' + ring;
        }

        if (row.entry.id === 'corp_chronicles') {
            return 'inv-slot relative group cursor-pointer border-amber-400 bg-amber-900/20 hover:bg-amber-900/40' + ring;
        }
        if (row.quest) return 'inv-slot relative group cursor-help border-amber-500/50 bg-amber-900/10' + ring;

        if (tree().items[row.entry.id]?.use?.cooldown) {
            return (waitFor(row.entry.id) <= 0
                ? 'inv-slot relative group cursor-pointer border-green-500 hover:bg-green-900/20'
                : 'inv-slot relative group cursor-default cursor-not-allowed') + ring;
        }
        if (isConsumable(row.entry.id)) {
            return 'inv-slot relative group cursor-pointer border-blue-500 hover:bg-blue-900/20' + ring;
        }
        return 'inv-slot relative group cursor-default' + ring;
    }

    // Tooltips are wider than a slot, so the ones on the edges would be cut off.
    function tooltipPosition(index) {
        const col = index % columns;
        if (col === 0)           return { box: 'left-0 translate-x-0',            arrow: 'left-5 translate-x-0' };
        if (col === columns - 1) return { box: 'right-0 left-auto translate-x-0', arrow: 'right-5 left-auto translate-x-0' };
        return { box: 'left-1/2 -translate-x-1/2', arrow: 'left-1/2 -translate-x-1/2' };
    }

    function act(row) {
        const id = row.entry.id;

        if (row.quest) {
            if (id === 'corp_chronicles') engine.showLoreModal();
            else engine.log(tf('log.item.reminder', { item: row.item?.name ?? id }), 'text-amber-400');
            return;
        }

        if (tree().items[id]?.use?.cooldown) {
            const wait = waitFor(id);
            if (wait <= 0) engine.askUseItem(id);
            else engine.log(tf('log.item.cooldown', {
                line: tree().items[id].use.wait ?? tf('item.cooldown.fallback', { item: row.item?.name ?? id }),
                wait
            }), 'text-slate-500');
            return;
        }

        if (isConsumable(id)) engine.askUseItem(id);
        // A passive item has no button. Without this line clicking it does
        // nothing at all, which reads as broken rather than as by design.
        else if (tree().items[id]?.passive) engine.log(tf('log.item.passive', { item: row.item?.name ?? id }), 'text-slate-500 italic');
    }

    /**
     * One press, two meanings on touch: the first shows the tooltip, the second
     * acts. Splitting them matters because using an item opens the confirmation
     * modal, which covers the whole screen - a tooltip underneath it would be
     * information nobody ever sees. With a mouse nothing changes: hover already
     * shows the text, so a click acts straight away.
     */
    function activate(row, coarse) {
        // In discard mode the first press counts straight away, on touch as
        // well. Pinning the tooltip first would be a detour: the confirmation
        // shows name and effect once more anyway.
        if (discardMode && !row.quest) {
            pinned = null;
            engine.askDiscardItem(row.entry.id);
            return;
        }

        if (coarse && pinned !== row.key) {
            pinned = row.key;
            return;
        }
        pinned = null;
        act(row);
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
        activate(target, false);
    }
</script>

{#snippet slot(row, index)}
    {@const pos = tooltipPosition(index)}
    <!-- Tile and caption sit in one column instead of the caption hanging
         below the tile in absolute position. That used to need a fixed
         margin under every tile, which added to the grid gap and made the
         rows drift apart - visibly so on a phone, where three columns leave
         the captions no room. Now the grid gap alone spaces the cells and
         every one is the same height, with or without an item. -->
<div class="flex flex-col items-center">
    <div class={slotClass(row)} role="button" tabindex="0"
         data-inv-slot
         aria-label={row.item?.name ?? row.entry.id}
         onpointerdown={(e) => (coarsePress = e.pointerType !== 'mouse')}
         onclick={() => activate(row, coarsePress)} onkeydown={(e) => keyActivate(e, row)}>
        {#if row.item?.img}
            <img src={row.item.img} class="w-full h-full object-contain p-1 pointer-events-none" alt={row.item.name} onerror={(e) => e.currentTarget.remove()}>
        {:else}{row.item?.icon ?? '?'}{/if}

        {#if row.item}
            <ItemTooltip item={row.item} pinned={pinned === row.key} {pos} />
        {/if}


        {#if !row.quest && tree().items[row.entry.id]?.use?.cooldown}
            {#if waitFor(row.entry.id) <= 0}
                <div class="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-slate-900"></div>
            {:else}
                <div class="absolute inset-0 bg-slate-900/70 rounded-sm flex items-center justify-center z-10 backdrop-blur-[1px]">
                    <span class="font-bold text-white text-xs select-none">{waitFor(row.entry.id)}</span>
                </div>
            {/if}
        {/if}
    </div>

    <!-- Always rendered, empty for a free slot, so all cells match in height. -->
    <div class="h-4 mt-1 w-full text-center text-[8px] leading-4 text-slate-400 truncate pointer-events-none">
        {row.item ? row.item.name : ''}
    </div>
</div>
{/snippet}

<div class="flex flex-col gap-6 w-full"
     onfocusout={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) pinned = null; }}>
    <div>
        <div class="flex items-center justify-between gap-3 flex-wrap mb-3 border-b border-slate-800 pb-2">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('inv.equipment')}</h3>

            <!-- Two different things, so they must not look alike: the counter
                 is information and keeps its frame, throwing away is a rarely
                 used destructive action and stays quiet until it is armed.
                 Only then does it become a filled red control - loud exactly
                 when it can do damage, and never before. -->
            <div class="flex items-center gap-1">
                <span class="h-8 px-2.5 rounded-md border border-slate-800 bg-slate-900/60 flex items-center
                             font-mono text-[11px] tabular-nums
                             {normal.length >= MIN_SLOTS ? 'text-amber-400' : 'text-slate-400'}">
                    {tf('inv.count', { have: normal.length, max: MIN_SLOTS })}
                </span>

                <button type="button"
                        aria-pressed={discardMode}
                        title={discardMode ? t('inv.discard.stop') : t('inv.discard.start')}
                        onclick={() => { discardMode = !discardMode; pinned = null; }}
                        class="h-8 px-2.5 rounded-md flex items-center gap-1.5
                               text-[11px] font-bold transition-colors
                               {discardMode
                                 ? 'bg-red-950/40 border border-red-900/60 text-red-300'
                                 : 'text-slate-500 hover:text-red-300 hover:bg-red-950/40'}">
                    <img src="assets/img/ui/ui_trash.webp" alt="" width="14" height="14"
                         class="w-3.5 h-3.5 select-none pointer-events-none {discardMode ? '' : 'opacity-70'}"
                         onerror={(e) => e.currentTarget.remove()}>
                    {discardMode ? t('inv.discard.done') : t('inv.discard.arm')}
                </button>
            </div>
        </div>

        <!-- No explanatory line in discard mode: every equipment slot turns red
             and clickable while the trophies stay untouched, which says it
             better than a sentence - and a sentence that only exists in one
             state would push the whole grid down as it appears. -->
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 [&>*]:min-w-0">
            {#each normal as row, i (row.key)}
                {@render slot(row, i)}
            {/each}
            {#each { length: emptySlots } as _, i (i)}
                <!-- Same cell shape as a filled slot - centring wrapper plus the
                     empty caption line - so free and used slots line up exactly. -->
                <div class="flex flex-col items-center">
                    <div class="inv-slot empty"></div>
                    <div class="h-4 mt-1" aria-hidden="true"></div>
                </div>
            {/each}
        </div>
    </div>

    {#if quest.length > 0}
        <div>
            <h3 class="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">{t('inv.trophies')}</h3>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 [&>*]:min-w-0">
                {#each quest as row, i (row.key)}
                    {@render slot(row, i)}
                {/each}
            </div>
        </div>
    {/if}
</div>
