<script>
    /**
     * Wissen - Müller's notes on the house: the people who are not in the team
     * view, the places, and the running affairs.
     *
     * Laid out as his notebook (7.1): page markers for the categories, the
     * register on the left page, the open entry on the right. On a phone
     * there is no room for both pages, so the register IS the screen and
     * picking a name swaps in the page. The columns are pure CSS; the only
     * state is which entry is open. The paper itself is app.css (THE
     * KNOWLEDGE BOOK).
     *
     * Entries not yet met stay visible but greyed. An empty screen reads as
     * "nothing here"; a greyed register reads as "something to fill".
     */
    import { state as game } from '../engine/engine_state.svelte.js';

    import { t, tf } from '../i18n/i18n.svelte.js';
    import { engine } from '../engine.js';

    // Each category is a page marker of its own colour, and the index card
    // on the open page carries the same colour as its band - so a long
    // register stays readable at a glance. Pastel on purpose: the markers
    // carry dark print.
    // i18n-uses: knowledge.cat.team, knowledge.cat.person
    // i18n-uses: knowledge.cat.place, knowledge.cat.matter
    const CATS = [
        { id: 'team',   label: 'knowledge.cat.team',   flag: 'bg-violet-300',  band: 'bg-violet-400' },
        { id: 'person', label: 'knowledge.cat.person', flag: 'bg-emerald-300', band: 'bg-emerald-400' },
        { id: 'place',  label: 'knowledge.cat.place',  flag: 'bg-sky-300',     band: 'bg-sky-400' },
        { id: 'matter', label: 'knowledge.cat.matter', flag: 'bg-amber-300',   band: 'bg-amber-400' }
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
    //
    // `landedId` pins the entry it landed on once that is shown. Without it,
    // marking the entry read handed `current` to the next unread one, which
    // the reading effect below marked too, and so on down the register: one
    // open of the book stamped a whole category as read while a single page
    // was on screen. Measured in 7.1 before the fix: 7 of 7.
    let landedId = $state(null);
    const current = $derived(
        entries.find(e => e.id === selectedId)
        ?? entries.find(e => e.id === landedId)
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
            landedId = null;
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
            landedId = current.id;
            engine.markKnowledgeRead?.(current.id, current.notes.length);
        }
    });


    const missing = $derived(current ? Math.max(0, current.total - current.notes.length) : 0);

    const switchCat = (id) => { cat = id; selectedId = null; landedId = null; };
    const countOf = (id) => all.filter(e => e.cat === id && e.open).length;
    // Same treatment as in the register, for the same reason: without it, a
    // second new note in another category stays invisible even after the jump
    // above has taken the player to the first one.
    const unreadIn = (id) => all.some(e => e.cat === id && e.unread);
</script>

<div class="flex flex-col flex-1 min-h-0">

    <!-- PAGE MARKERS, stuck in behind the pages. The open category stands out
         further; one with a note still unread underlines its count. On a
         phone the four with their counts are wider than the screen, so the
         count waits for sm and the label carries the underline instead. -->
    <div class="flex items-end gap-1 sm:gap-1.5 pl-3 sm:pl-6 pr-11 shrink-0 h-10 overflow-x-auto overflow-y-hidden">
        {#each tabs as c (c.id)}
            <button
                onclick={() => switchCat(c.id)}
                aria-current={cat === c.id ? 'page' : undefined}
                class="shrink-0 px-2 sm:px-3 rounded-t-sm text-[0.625rem] font-bold tracking-[0.08em] sm:tracking-[0.12em] text-slate-800 shadow-sm transition-all whitespace-nowrap {c.flag}
                       {cat === c.id ? 'h-10 pb-2' : 'h-8 pb-1 opacity-80 hover:opacity-100'}">
                <span class={unreadIn(c.id) ? 'underline decoration-2 underline-offset-2 sm:no-underline' : ''}>{t(c.label)}</span>
                <span class="hidden sm:inline ml-1 tabular-nums {unreadIn(c.id) ? 'font-black underline decoration-2 underline-offset-2' : 'font-normal'}">
                    {countOf(c.id)}/{all.filter(e => e.cat === c.id).length}
                </span>
            </button>
        {/each}
    </div>

    <div class="flex flex-1 min-h-0 -mt-1 relative">

        <!-- REGISTER: the left page -->
        <nav class="notebook-paper notebook-left notebook-squared md:w-[40%] md:shrink-0 flex-col overflow-y-auto
                    {onPage ? 'hidden md:flex' : 'flex flex-1 md:flex-none'}">
            <div class="px-5 pt-4 pb-2">
                <h2 class="font-hand text-[2rem] leading-tight text-blue-900">{t('knowledge.title')}</h2>
                <p class="text-[0.6875rem] text-slate-600">{t('knowledge.subtitle')}</p>
            </div>
            <ul class="px-3 pb-3">
                {#each entries as e (e.id)}
                    <li>
                        <button
                            onclick={() => (selectedId = e.id)}
                            aria-current={current?.id === e.id ? 'true' : undefined}
                            class="w-full text-left px-2 py-0.5 rounded-sm transition-colors flex items-baseline gap-2
                                   {current?.id === e.id ? 'bg-blue-900/8' : 'hover:bg-blue-900/5'}">
                            <!-- Unread entries are gone over with a highlighter
                                 (app.css .marker) - the paper's version of the
                                 brighter counter the dark book had. -->
                            <span class="font-hand text-[1.125rem] text-blue-900 truncate pr-1
                                         {e.unread ? 'marker' : ''}
                                         {current?.id === e.id ? 'underline decoration-blue-900/60 underline-offset-4' : ''}">
                                {e.name}
                            </span>
                            <span class="ml-auto font-mono text-[0.625rem] tabular-nums shrink-0
                                         {e.unread ? 'text-slate-900 font-bold' : 'text-slate-600'}">
                                {e.notes.length}/{e.total}
                            </span>
                        </button>
                    </li>
                {/each}
            </ul>

            {#if entries.length === 0}
                <p class="px-5 py-8 text-center text-xs text-slate-600">
                    {t('knowledge.empty')}
                </p>
            {/if}

            <p class="mt-auto px-5 py-3 font-mono text-[0.625rem] text-slate-600 tabular-nums">
                {tf('knowledge.notes', { found, total })}
            </p>
        </nav>

        <!-- OPEN PAGE: the right page -->
        <section class="notebook-paper notebook-right notebook-margin flex-1 min-w-0 overflow-y-auto
                        {onPage ? 'flex flex-col' : 'hidden md:flex md:flex-col'}">
            {#if current}
                <button onclick={() => (selectedId = null)}
                        class="md:hidden text-left pl-12 pr-4 pt-3 font-hand text-base text-blue-900 hover:underline shrink-0">
                    &larr; {t('knowledge.index')}
                </button>

                <!-- pl-12 keeps the writing right of the margin line (app.css). -->
                <div class="flex flex-col flex-1 pt-4 pr-5 pl-12">
                    <h3 class="font-hand text-[1.75rem] leading-tight text-blue-900 wrap-break-word">{current.name}</h3>

                    <!-- Who this is, typed on an index card and clipped to the
                         page: the facts are printed, the notes are his. -->
                    <div class="relative mt-3 mb-6 max-w-md bg-white shadow-md" style="rotate:-0.6deg">
                        <div class="h-1.5 {theme.band}"></div>
                        <p class="px-3 pt-2 pb-1.5 font-mono text-[0.6875rem] font-bold uppercase tracking-wider text-slate-700 border-b border-red-400/60 wrap-break-word">
                            {current.role}
                        </p>
                        <p class="px-3 py-2.5 font-mono text-xs leading-relaxed text-slate-800 wrap-break-word">
                            {current.summary}
                        </p>
                        <svg class="absolute -top-3 right-6 w-3.5 h-9" viewBox="0 0 14 36" fill="none" aria-hidden="true">
                            <path d="M4 10 V28 a3 3 0 0 0 6 0 V6 a5 5 0 0 0 -10 0 V26" stroke="#94a3b8" stroke-width="1.6" stroke-linecap="round"/>
                        </svg>
                    </div>

                    <!-- In his hand, on lines exactly one leading-8 apart. The
                         list runs to the foot of the page, so the ruling does. -->
                    <ul class="notebook-lines flex-1 -mr-5 pr-5">
                        {#each current.notes as note}
                            <li class="font-hand text-[1.125rem] leading-8 text-blue-900 flex gap-2.5 wrap-break-word">
                                <span class="shrink-0" aria-hidden="true">&ndash;</span>
                                <span class="min-w-0">{note}</span>
                            </li>
                        {/each}

                        <!-- Missing notes as blank lines: shows the page is
                             unfinished without giving away what belongs there. -->
                        {#each Array(missing) as _, i (i)}
                            <li class="font-hand text-[1.125rem] leading-8 flex gap-2.5" aria-hidden="true">
                                <span class="text-slate-400 shrink-0">&ndash;</span>
                            </li>
                        {/each}
                    </ul>

                    {#if missing > 0}
                        <p class="py-3 font-mono text-[0.625rem] text-slate-600">
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
