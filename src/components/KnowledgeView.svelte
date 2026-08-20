<script>
    /**
     * Wissen - Müller's notes on the house: the people who are not in the team
     * view, the places, and the running affairs.
     *
     * Laid out like a notebook: category tabs, a register, and the open page.
     * On a phone there is no room for register and page side by side, so the
     * register IS the screen and picking a name swaps in the page. The columns
     * are pure CSS; the only state is which entry is open.
     *
     * Entries not yet met stay visible but greyed. An empty screen reads as
     * "nothing here"; a greyed register reads as "something to fill".
     */
    import { state as game } from '../engine/engine_state.svelte.js';

    import { t, tf } from '../i18n/i18n.svelte.js';
    import { engine } from '../engine.js';

    // Each category carries its own colour so a long register stays readable
    // at a glance - and so the modal is not three shades of grey.
    // i18n-uses: knowledge.cat.team, knowledge.cat.person
    // i18n-uses: knowledge.cat.place, knowledge.cat.matter
    const CATS = [
        { id: 'team',    label: 'knowledge.cat.team', text: 'text-violet-400', dim: 'text-violet-900',
          bullet: 'text-violet-600',  tab: 'border-violet-400 text-violet-300',   rule: 'border-violet-800' },
        { id: 'person',  label: 'knowledge.cat.person', text: 'text-emerald-400', dim: 'text-emerald-900',
          bullet: 'text-emerald-600', tab: 'border-emerald-400 text-emerald-300', rule: 'border-emerald-800' },
        { id: 'place',   label: 'knowledge.cat.place', text: 'text-sky-400',     dim: 'text-sky-900',
          bullet: 'text-sky-600',     tab: 'border-sky-400 text-sky-300',         rule: 'border-sky-800' },
        { id: 'matter',  label: 'knowledge.cat.matter', text: 'text-amber-400',   dim: 'text-amber-900',
          bullet: 'text-amber-600',   tab: 'border-amber-400 text-amber-300',     rule: 'border-amber-800' }
    ];

    let cat = $state('team');
    let selectedId = $state(null);

    const all = $derived.by(() => {
        if (!game.knowledgeOpen) return [];
        game.archive.seenEvents?.length;   // dependency, deliberately read
        return engine.knowledgeEntries?.() ?? [];
    });

    // Only categories that actually have entries get a tab.
    const tabs = $derived(CATS.filter(c => all.some(e => e.cat === c.id)));
    const theme = $derived(CATS.find(c => c.id === cat) ?? CATS[0]);
    // Only what the player has actually met. Listing unmet names would give
    // away the cast and turn the notebook into a collection checklist; the
    // counter in the tab already says that there is more to find.
    const entries = $derived(all.filter(e => e.cat === cat && e.open));
    // Below md the register and the page are the same screen; this is which of
    // the two is showing.
    const onPage = $derived(selectedId !== null);

    const found = $derived(all.reduce((n, e) => n + e.notes.length, 0));
    const total = $derived(all.reduce((n, e) => n + e.total, 0));

    // Something should always be on the page on desktop: the first entry in
    // this category the player has met, otherwise simply the first one.
    // Opening the book should land on what changed, not on the first name in
    // the register - otherwise the marker disappears before it was noticed.
    const current = $derived(
        entries.find(e => e.id === selectedId)
        ?? entries.find(e => e.unread)
        ?? entries[0]
        ?? null
    );

    /*
     * Is the open page actually on screen?
     *
     * Below md the register IS the screen and the page is display:none until a
     * name is tapped - see the two class lists further down. That matters here
     * and not only for the layout: the marker used to be stamped as read the
     * moment an entry became `current`, so on a phone the bold number went out
     * under the player's eyes while the note behind it had never been shown.
     */
    let wide = $state(true);
    $effect(() => {
        const query = window.matchMedia('(min-width: 768px)');
        const update = () => { wide = query.matches; };
        update();
        query.addEventListener('change', update);
        return () => query.removeEventListener('change', update);
    });
    const pageVisible = $derived(wide || onPage);


    /*
     * Opening the book jumps to what changed.
     *
     * Two things stood in the way of the "you land on the new entry" promise:
     * the register is filtered to the CURRENT category, so a new note in one of
     * the other three was invisible - and 52 of the 59 entries live outside the
     * one the book starts on - and `selectedId` outlives every close, because
     * this component is mounted once and only hidden. After the first click
     * ever, the book therefore always reopened on the last entry read.
     *
     * Not a $derived: this has to happen ON OPENING and never again, or the
     * jump would fight every click the player makes afterwards. `wasOpen` is a
     * plain variable on purpose - a rune here would make the effect its own
     * dependency.
     */
    let wasOpen = false;
    let settled = $state(false);
    $effect(() => {
        const open = game.knowledgeOpen;
        if (open && !wasOpen) {
            const fresh = all.find(e => e.open && e.unread);
            // Nothing new: leave the player where they were.
            if (fresh) { cat = fresh.cat; selectedId = null; }
            settled = true;
        }
        if (!open) settled = false;
        wasOpen = open;
    });

    /*
     * Reading is a side effect, so it belongs in an effect, not in $derived.
     * Only what was actually put in front of the player counts as read.
     *
     * `settled` is what keeps this from firing on the opening flush, while the
     * jump above has not moved the category yet. Without it the first unread
     * entry of the PREVIOUS category is stamped as read on the way past - a
     * measured mistake, not a hypothetical one: opening with three new notes
     * marked Kevin read while the book was travelling to Herr Blaschke.
     */
    $effect(() => {
        if (!settled) return;
        if (pageVisible && current?.unread) {
            engine.markKnowledgeRead?.(current.id, current.notes.length);
        }
    });


    const missing = $derived(current ? Math.max(0, current.total - current.notes.length) : 0);

    const switchCat = (id) => { cat = id; selectedId = null; };
    const countOf = (id) => all.filter(e => e.cat === id && e.open).length;
    // Same treatment as in the register, for the same reason: without it, a
    // second new note in another category stays invisible even after the jump
    // above has taken the player to the first one.
    const unreadIn = (id) => all.some(e => e.cat === id && e.unread);
</script>

<div class="flex flex-col flex-1 overflow-hidden">

    <!-- CATEGORY TABS -->
    <div class="flex shrink-0 border-b border-slate-800 bg-slate-950/60">
        {#each tabs as c (c.id)}
            <button
                onclick={() => switchCat(c.id)}
                aria-current={cat === c.id ? 'page' : undefined}
                class="px-4 py-2.5 text-[10px] font-bold tracking-[0.14em] border-b-2 -mb-px transition-colors
                       {cat === c.id ? c.tab : 'border-transparent text-slate-500 hover:text-slate-300'}">
                {t(c.label)}
                <span class="ml-1.5 tabular-nums transition-colors
                             {unreadIn(c.id) ? 'text-slate-100 font-bold' : 'font-normal opacity-60'}">
                    {countOf(c.id)}/{all.filter(e => e.cat === c.id).length}
                </span>
            </button>
        {/each}
        <span class="ml-auto self-center pr-4 text-[10px] text-slate-600 tabular-nums hidden sm:block">
            {tf('knowledge.notes', { found, total })}
        </span>
    </div>

    <div class="flex flex-col md:flex-row flex-1 overflow-hidden">

        <!-- REGISTER -->
        <nav class="md:w-60 md:shrink-0 md:border-r border-slate-800 flex-col overflow-y-auto
                    {onPage ? 'hidden md:flex' : 'flex'}">
            <ul class="p-2 space-y-1">
                {#each entries as e (e.id)}
                    <li>
                        <button
                            onclick={() => (selectedId = e.id)}
                            aria-current={current?.id === e.id ? 'true' : undefined}
                            class="w-full text-left px-3 py-2 rounded-md transition-colors flex items-baseline gap-2
                                   {current?.id === e.id ? 'bg-slate-800/80' : 'hover:bg-slate-800/50'}">
                            <span class="text-xs font-bold truncate {e.open ? theme.text : 'text-slate-600'}">
                                {e.name}
                            </span>
                            <!-- Unread entries brighten their own counter instead of
                                 getting a marker next to them. No fifth colour either:
                                 amber is already the Vorgänge category, so a coloured
                                 counter would be invisible in that tab. Brightness
                                 works in all four. -->
                            <span class="ml-auto text-[10px] tabular-nums shrink-0 transition-colors
                                         {e.unread ? 'text-slate-100 font-bold' : e.open ? 'text-slate-500' : 'text-slate-700'}">
                                {e.open ? `${e.notes.length}/${e.total}` : '–'}
                            </span>
                        </button>
                    </li>
                {/each}
            </ul>

            {#if entries.length === 0}
                <p class="px-4 py-8 text-center text-xs text-slate-600">
                    {t('knowledge.empty')}
                </p>
            {/if}
        </nav>

        <!-- OPEN PAGE -->
        <section class="flex-1 overflow-y-auto {onPage ? 'flex flex-col' : 'hidden md:flex md:flex-col'}">
            {#if current}
                <button onclick={() => (selectedId = null)}
                        class="md:hidden text-left px-4 py-3 text-[11px] text-slate-400 hover:text-white border-b border-slate-800 shrink-0">
                    &larr; {t('knowledge.index')}
                </button>

                <div class="p-5">
                    <h3 class="text-lg font-bold {theme.text}">{current.name}</h3>
                    <p class="text-[11px] text-slate-500 mb-4">{current.role}</p>

                    <p class="text-xs text-slate-400 leading-relaxed italic border-l-2 {theme.rule} pl-3 mb-5 wrap-break-word">
                        {current.summary}
                    </p>

                    <ul class="space-y-3">
                        {#each current.notes as note}
                            <li class="text-xs text-slate-300 leading-relaxed flex gap-2.5 wrap-break-word">
                                <span class="{theme.bullet} shrink-0" aria-hidden="true">&ndash;</span>
                                <span>{note}</span>
                            </li>
                        {/each}

                        <!-- Missing notes as blank ruled lines: shows the page is
                             unfinished without giving away what belongs there. -->
                        {#each Array(missing) as _, i (i)}
                            <li class="flex gap-2.5 items-center" aria-hidden="true">
                                <span class="text-slate-700 shrink-0">&ndash;</span>
                                <span class="flex-1 border-b border-dashed border-slate-800 h-3"></span>
                            </li>
                        {/each}
                    </ul>

                    {#if missing > 0}
                        <p class="mt-5 text-[10px] text-slate-600">
                            {missing === 1 ? tf('knowledge.missing.one', { count: missing }) : tf('knowledge.missing.many', { count: missing })}
                        </p>
                    {/if}
                </div>
            {:else}
                <!-- Desktop only: on a phone the register carries this message,
                     because this column is not on screen while it is showing. -->
                <div class="hidden md:block p-8 text-center text-slate-600 text-xs">
                    {t('knowledge.emptyCategory')}
                </div>
            {/if}
        </section>
    </div>
</div>
