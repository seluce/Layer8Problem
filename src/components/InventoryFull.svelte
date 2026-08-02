<!--
  The full inventory, split into equipment and trophies.

  Trophies are shown apart because they cannot be used — they are proof that
  something happened, not something you carry for a purpose. The one exception
  is the chronicle, which opens the lore book.

  Tooltips shift sideways in the outermost columns so they stay on screen.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { DB } from '../data.js';

    const COLUMNS = 5;
    const STRESSBALL_COOLDOWN = 60;
    const CONSUMABLES = ['energy', 'donut', 'sandwich', 'chocolate', 'bubble_wrap'];

    const entries = $derived(
        state.inventory.map((entry, i) => {
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

    const stressballWait = $derived(STRESSBALL_COOLDOWN - (state.time - state.lastStressballTime));

    function slotClass(row) {
        if (row.entry.id === 'corp_chronicles') {
            return 'inv-slot relative group cursor-pointer border-amber-400 bg-amber-900/20 hover:bg-amber-900/40';
        }
        if (row.quest) return 'inv-slot relative group cursor-help border-amber-500/50 bg-amber-900/10';

        if (row.entry.id === 'stressball') {
            return stressballWait <= 0
                ? 'inv-slot relative group cursor-default cursor-pointer border-green-500 hover:bg-green-900/20'
                : 'inv-slot relative group cursor-default cursor-not-allowed';
        }
        if (CONSUMABLES.includes(row.entry.id)) {
            return 'inv-slot relative group cursor-default cursor-pointer border-blue-500 hover:bg-blue-900/20';
        }
        return 'inv-slot relative group cursor-default';
    }

    // Tooltips are wider than a slot, so the ones on the edges would be cut off.
    function tooltipPosition(index) {
        const col = index % COLUMNS;
        if (col === 0)              return { box: 'left-0 translate-x-0',            arrow: 'left-5 translate-x-0' };
        if (col === COLUMNS - 1)    return { box: 'right-0 left-auto translate-x-0', arrow: 'right-5 left-auto translate-x-0' };
        return { box: 'left-1/2 -translate-x-1/2', arrow: 'left-1/2 -translate-x-1/2' };
    }

    function activate(row) {
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

        if (CONSUMABLES.includes(id)) engine.askUseItem(id);
    }
    // Tastaturbedienung für die Slots. Sie bleiben Container statt Buttons,
    // weil sie Tooltip-Boxen und Overlays enthalten - Flow-Content, der in
    // einem <button> nicht stehen darf. stopPropagation hält Enter und Leer-
    // taste von der globalen Tastatursteuerung in engine.js fern, damit ein
    // fokussierter Slot nicht zusätzlich die Bestätigen-Aktion auslöst.
    function keyActivate(event, target) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        event.stopPropagation();
        activate(target);
    }
</script>

{#snippet slot(row, index)}
    {@const pos = tooltipPosition(index)}
    <div class={slotClass(row)} style="margin-bottom: 15px" role="button" tabindex="0"
         aria-label={row.item?.name ?? row.entry.id}
         onclick={() => activate(row)} onkeydown={(e) => keyActivate(e, row)}>
        {#if row.item?.img}
            <img src={row.item.img} class="w-full h-full object-contain p-1 pointer-events-none" alt={row.item.name} onerror={(e) => e.currentTarget.remove()}>
        {:else}{row.item?.icon ?? '?'}{/if}

        {#if row.item}
            <div class="absolute bottom-[110%] {pos.box} mb-2 w-56 p-3 bg-slate-950 border border-slate-600 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-left">
                <div class="font-bold text-amber-400 text-sm border-b border-slate-700 pb-1 mb-1">{row.item.name}</div>
                <div class="text-[10px] text-slate-300 italic leading-snug">{row.item.flavor ?? '"Keine weiteren Informationen."'}</div>
                <!-- Ob ein Gegenstand den Einsatz überlebt, stand bisher
                     nirgends - man erfuhr es erst, wenn er weg war. -->
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

<div class="flex flex-col gap-6 w-full">
    <div>
        <h3 class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-800 pb-2">AUSRÜSTUNG</h3>
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
