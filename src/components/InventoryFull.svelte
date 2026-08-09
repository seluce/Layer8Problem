<!--
  The full inventory, split into equipment and trophies.

  Trophies are shown apart because they cannot be used — they are proof that
  something happened, not something you carry for a purpose. The one exception
  is the chronicle, which opens the lore book.

  Tooltips shift sideways in the outermost columns so they stay on screen.

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
    import { DB } from '../data.js';

    const STRESSBALL_COOLDOWN = DB.items.stressball?.use?.cooldown ?? 0;
    // Usable, how long it rests and whether it survives - all of that is in
    // data_items.js under `use`. Nothing about items is listed here.
    const usable = (id) => !!DB.items[id]?.use;
    const cooldownOf = (id) => DB.items[id]?.use?.cooldown ?? 0;
    const isConsumable = (id) => usable(id) && !cooldownOf(id);

    const entries = $derived(
        game.inventory.map((entry, i) => {
            const item = DB.items[entry.id];
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

    const stressballWait = $derived(STRESSBALL_COOLDOWN - (game.time - game.lastStressballTime));

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
     * Der Wegwerf-Modus überlebt das Schließen nicht.
     *
     * Beobachtet wird das Fenster selbst, nicht der Schließen-Knopf: Escape
     * blendet das oberste Overlay direkt aus, ohne closeInventory() zu rufen,
     * und ein Klick auf das Kreuz nimmt wieder einen anderen Weg. Am Element
     * zu hängen erfasst jeden davon - auch einen, den es heute noch nicht gibt.
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

        // Im Wegwerf-Modus sieht jedes Ausrüstungsfeld gleich aus - anklickbar
        // und rot umrandet. Trophäen bleiben, wie sie sind.
        if (discardMode && !row.quest) {
            return 'inv-slot relative group cursor-pointer border-red-600/70 bg-red-950/20 hover:bg-red-900/30' + ring;
        }

        if (row.entry.id === 'corp_chronicles') {
            return 'inv-slot relative group cursor-pointer border-amber-400 bg-amber-900/20 hover:bg-amber-900/40' + ring;
        }
        if (row.quest) return 'inv-slot relative group cursor-help border-amber-500/50 bg-amber-900/10' + ring;

        if (row.entry.id === 'stressball') {
            return (stressballWait <= 0
                ? 'inv-slot relative group cursor-default cursor-pointer border-green-500 hover:bg-green-900/20'
                : 'inv-slot relative group cursor-default cursor-not-allowed') + ring;
        }
        if (isConsumable(row.entry.id)) {
            return 'inv-slot relative group cursor-default cursor-pointer border-blue-500 hover:bg-blue-900/20' + ring;
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
            else engine.log(`Erinnerung: ${row.item?.name ?? id}`, 'text-amber-400');
            return;
        }

        if (id === 'stressball') {
            if (stressballWait <= 0) engine.askUseItem('stressball');
            else engine.log(`Der Ball ist noch völlig plattgedrückt. Gib ihm Zeit, sich zu entfalten. (${stressballWait} Min)`, 'text-slate-500');
            return;
        }

        if (isConsumable(id)) engine.askUseItem(id);
    }

    /**
     * One press, two meanings on touch: the first shows the tooltip, the second
     * acts. Splitting them matters because using an item opens the confirmation
     * modal, which covers the whole screen - a tooltip underneath it would be
     * information nobody ever sees. With a mouse nothing changes: hover already
     * shows the text, so a click acts straight away.
     */
    function activate(row, coarse) {
        // Im Wegwerf-Modus zählt der erste Druck sofort - auch per Finger.
        // Das Anheften des Hinweisfensters wäre hier ein Umweg, denn die
        // Rückfrage zeigt Namen und Wirkung ohnehin noch einmal.
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
    <div class={slotClass(row)} style="margin-bottom: 15px" role="button" tabindex="0"
         data-inv-slot
         aria-label={row.item?.name ?? row.entry.id}
         onpointerdown={(e) => (coarsePress = e.pointerType !== 'mouse')}
         onclick={() => activate(row, coarsePress)} onkeydown={(e) => keyActivate(e, row)}>
        {#if row.item?.img}
            <img src={row.item.img} class="w-full h-full object-contain p-1 pointer-events-none" alt={row.item.name} onerror={(e) => e.currentTarget.remove()}>
        {:else}{row.item?.icon ?? '?'}{/if}

        {#if row.item}
            <div class="absolute bottom-[110%] {pos.box} mb-2 w-56 p-3 bg-slate-950 border border-slate-600 rounded-lg shadow-xl {pinned === row.key ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 focus-within:opacity-100 transition-opacity pointer-events-none z-50 text-left">
                <div class="font-bold text-amber-400 text-sm border-b border-slate-700 pb-1 mb-1">{row.item.name}</div>
                <div class="text-[10px] text-slate-300 italic leading-snug">{row.item.flavor ?? '"Keine weiteren Informationen."'}</div>
                <!-- Whether an item survives being used was written down
                     nowhere - you found out once it was gone. -->
                <div class="text-[9px] font-mono uppercase tracking-wider mt-1.5 pt-1.5 border-t border-slate-800
                            {row.quest ? 'text-amber-500' : row.item.keep ? 'text-sky-400' : 'text-slate-500'}">
                    {#if row.quest}Trophäe · bleibt für immer
                    {:else if row.item.keep}Wiederverwendbar
                    {:else}Verbraucht sich bei Nutzung{/if}
                </div>
                <div class="absolute top-full {pos.arrow} border-4 border-transparent border-t-slate-600"></div>
            </div>
        {/if}

        <div class="absolute -bottom-6 w-full text-center text-[8px] text-slate-400 truncate pointer-events-none">
            {row.item?.name ?? row.entry.id}
        </div>

        {#if !row.quest && row.entry.id === 'stressball'}
            {#if stressballWait <= 0}
                <div class="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse border-2 border-slate-900"></div>
            {:else}
                <div class="absolute inset-0 bg-slate-900/70 rounded-sm flex items-center justify-center z-10 backdrop-blur-[1px]">
                    <span class="font-bold text-white text-xs select-none">{stressballWait}</span>
                </div>
            {/if}
        {/if}
    </div>
{/snippet}

<div class="flex flex-col gap-6 w-full"
     onfocusout={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) pinned = null; }}>
    <div>
        <div class="flex items-center justify-between gap-3 flex-wrap mb-3 border-b border-slate-800 pb-2">
            <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest">Ausrüstung</h3>

            <!-- Zähler und Knopf teilen Höhe, Rundung und Randstärke, damit
                 sie als ein Paar lesen statt als Text mit Knopf daneben. -->
            <div class="flex items-center gap-2">
                <span class="h-8 px-2.5 rounded-md border border-slate-800 bg-slate-900/60 flex items-center
                             font-mono text-[11px] tabular-nums
                             {normal.length >= MIN_SLOTS ? 'text-amber-400' : 'text-slate-400'}">
                    {normal.length}/{MIN_SLOTS} Gegenstände
                </span>

                <button type="button"
                        aria-pressed={discardMode}
                        onclick={() => { discardMode = !discardMode; pinned = null; }}
                        class="h-8 px-2.5 rounded-md border flex items-center gap-1.5
                               text-[11px] font-bold transition-colors
                               {discardMode
                                 ? 'bg-red-950/50 border-red-600 text-red-300'
                                 : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:border-red-700 hover:text-red-300'}">
                    <img src="assets/img/ui/ui_trash.webp" alt="" width="14" height="14"
                         class="w-3.5 h-3.5 select-none pointer-events-none"
                         onerror={(e) => e.currentTarget.remove()}>
                    {discardMode ? 'Fertig' : 'Wegwerfen'}
                </button>
            </div>
        </div>

        {#if discardMode}
            <p class="text-[11px] text-red-300/90 mb-3 -mt-1">
                Wähle den Gegenstand, der weg soll. Trophäen bleiben unangetastet.
            </p>
        {/if}
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 pb-4">
            {#each normal as row, i (row.key)}
                {@render slot(row, i)}
            {/each}
            {#each { length: emptySlots } as _, i (i)}
                <div class="inv-slot empty"></div>
            {/each}
        </div>
    </div>

    {#if quest.length > 0}
        <div>
            <h3 class="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">TROPHÄEN & ERINNERUNGEN</h3>
            <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 pb-4">
                {#each quest as row, i (row.key)}
                    {@render slot(row, i)}
                {/each}
            </div>
        </div>
    {/if}
</div>
