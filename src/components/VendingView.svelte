<!--
  The dead vending machine on the third floor, back section (6.3).

  Opened by sq_kevin_geheim_2 through CMD:OPEN_VENDING. Everything it says is
  in data_vending.js; this file is the glass, the crank and the paper.

  One take per visit, and the engine holds the rule (engine_vending.vendingTake):
  the window only asks. The three takes are equal on purpose - none of them is
  lit, because a highlighted C4 read as the only sensible choice. Amber appears
  only after the choice, on the compartment that was used.

  The crank runs on screen and never on the clock. The minutes were charged by
  the option that opened the window, and nothing here advances time. The roll
  is delivered at the line marked `lands`, not at the end of the text. Each
  line waits until the one before it can have been read (crankDelays in
  engine_vending.js), then for its own beat.

  Each line plays the `sound` it carries in the data, and the office music
  ducks from the light that stops flickering through the thud - the fall
  happens in near silence, and the lift's chime brings the music back. A magazine or the
  printout is one clack and a paper flop: the drop text says 'one turn'.

  After the choice the glass folds down to a row of compartment labels with
  the used one lit, and the view follows what the choice opened. Twelve
  compartments that stayed open above a running crank made the choice easy to
  miss, and on a phone they pushed the crank below the fold.
-->
<script>
    // Imported as `game`, not `state`, and that is load-bearing: this file needs
    // the $state rune, and with an import named `state` in scope Svelte reads
    // `$state(...)` as a store subscription and the window dies on mount with
    // "e.subscribe is not a function". See CLAUDE.md.
    import { slide, fade } from 'svelte/transition';
    import { state as game } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { crankDelays } from '../engine/engine_vending.js';
    import { t, tree } from '../i18n/i18n.svelte.js';

    // Read only while the window is open, and that is load-bearing: the pool
    // is loaded by openVending(), and a $derived recomputes only when what it
    // read changes - DB is not reactive. Read once before the load (the music
    // effect below reads it at mount, through lampStill) and it stayed empty
    // for good: the window never opened again. Depending on vendingOpen
    // re-reads it on every open, after the load.
    const V = $derived(game.vendingOpen ? tree().vending : null);
    const taken = $derived(game.vending?.taken ?? null);

    // The crank: how many of its lines are showing, and how many of the
    // closing lines. `delivered` is null until the sandwich has landed, then
    // whether it made it into the backpack; `cardShown` comes once the last
    // line has had its reading time.
    let crankShown = $state(0);
    let endShown = $state(0);
    let delivered = $state(null);
    let cardShown = $state(false);
    let timer = null;

    // The glass folds a moment after the choice, so the used compartment is
    // seen lit before the others go. A block on its way out no longer
    // updates, so the lighting has to happen while the grid is still in.
    let folded = $state(false);
    let foldTimer = null;
    let dropTimer = null;

    // A window closed halfway stops the crank and forgets it. The next visit
    // starts with a still coil.
    $effect(() => {
        if (game.vendingOpen) return;
        clearTimeout(timer);
        clearTimeout(foldTimer);
        clearTimeout(dropTimer);
        timer = foldTimer = dropTimer = null;
        folded = false;
        crankShown = 0;
        endShown = 0;
        delivered = null;
        cardShown = false;
    });

    // The closing line where the roll lands in the flap. From there on it is
    // the player's: the lift and the label that follow are epilogue, and
    // whoever shuts the flap during them was done, not impatient.
    const landsAt = $derived((V?.crankEnd ?? []).findIndex(line => line.lands));

    // The text says the stairwell light stops flickering to watch the fall,
    // so it does - from the first closing line until the landing. A lamp
    // that kept flickering under "it stops flickering" would contradict it.
    const lampStill = $derived(landsAt > 0 && endShown >= 1 && endShown <= landsAt);

    // The music holds its breath one line longer than the light: from the
    // light that stops flickering through the thud, so the roll lands in near
    // silence, and the lift's chime brings it back. Closing the window, or a
    // day that ends over it, resets the crank - so the music always returns.
    // duckMusic ignores a repeat of what it already does.
    const musicDown = $derived(landsAt > 0 && endShown >= 1 && endShown <= landsAt + 1);
    $effect(() => engine.duckMusic(musicDown));

    function runCrank() {
        const steps = V?.crank ?? [];
        const all = [...steps, ...(V?.crankEnd ?? [])];
        const delays = crankDelays(all);
        let i = 0;
        const next = () => {
            if (i === all.length) { cardShown = true; return; }
            if (all[i].sound) engine.playAudio(all[i].sound);
            if (i < steps.length) crankShown = i + 1;
            else {
                endShown = i - steps.length + 1;
                if (i - steps.length === landsAt) delivered = engine.vendingDeliver();
            }
            i++;
            timer = setTimeout(next, delays[i]);
        };
        if (all.length) timer = setTimeout(next, delays[0]);
    }

    // How long the used compartment stays lit before the glass folds, and how
    // long the folding takes. The view moves once it is done.
    const FOLD_PAUSE = 300;
    const FOLD_MS = 400;

    // The section the choice opened scrolls to the top of the window, once
    // the glass has folded. On a screen where everything fits nothing moves.
    const reveal = (node) => {
        const id = setTimeout(() => node.scrollIntoView({ behavior: 'smooth', block: 'start' }), FOLD_PAUSE + FOLD_MS);
        return () => clearTimeout(id);
    };

    // A crank line that arrives below the edge brings the view down with it,
    // only as far as needed: whoever scrolled up to reread is not pulled
    // anywhere while the newest line is still in sight.
    const follow = (node) => {
        const id = setTimeout(() => node.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
        return () => clearTimeout(id);
    };

    function take(kind) {
        if (!engine.vendingTake(kind)) return;
        foldTimer = setTimeout(() => { folded = true; }, FOLD_PAUSE);
        if (kind === 'c4') { runCrank(); return; }
        // 'Eine Umdrehung, und das vorderste Heft fällt': one clack, a paper flop.
        engine.playAudio('crank');
        dropTimer = setTimeout(() => engine.playAudio('paper'), 280);
    }

    // Only the front compartment of a kind counts as the one used; the other
    // MEHRWERT compartments are simply out of reach now, like everything else.
    const firstOf = (kind) => V?.slots.findIndex(s => s.take === kind) ?? -1;

    // The house rules: the club's names as far as the career has got, with the
    // player's own line wherever the list stood when they signed.
    const members = $derived.by(() => {
        const names = V?.rules?.members ?? [];
        const shown = engine.vendingMembersShown(names.length);
        const at = Math.min(game.archive?.stats?.vendingSignedAt ?? 0, shown);
        const rows = names.slice(0, shown).map(text => ({ text, you: false }));
        if (at) rows.splice(at, 0, { text: V.rules.you, you: true });
        return { rows, shown, signed: at > 0 };
    });
</script>

{#if game.vendingOpen && V}
    <div class="fixed inset-0 bg-black/90 z-1300 flex items-center justify-center p-0 md:p-6 fade-in"
         role="dialog" aria-modal="true" aria-labelledby="vending-title">
        <div class="w-full h-full md:h-auto md:max-h-[92vh] md:max-w-4xl flex flex-col bg-slate-900 border border-slate-800 border-t-2 border-t-amber-500 md:rounded-md shadow-2xl">

            <div class="flex items-center gap-3 px-4 md:px-5 py-3 border-b border-slate-800 bg-slate-950 shrink-0">
                <span class="lamp text-lg select-none {lampStill ? 'still' : ''}" aria-hidden="true">🔦</span>
                <h2 id="vending-title" class="flex-1 text-sm md:text-base font-black tracking-[0.18em] uppercase text-slate-100">{V.title}</h2>
                <button type="button" onclick={() => engine.closeVending()} aria-label={t('vending.close')}
                        class="text-slate-500 hover:text-slate-200 px-2 py-1 transition-colors">✕</button>
            </div>

            <div class="flex-1 overflow-y-auto p-4 md:p-5 text-slate-300">

                <!-- THE MACHINE -->
                <h3 class="text-[0.65rem] tracking-[0.2em] uppercase text-cyan-400 pb-1.5 mb-2.5 border-b border-slate-800">{t('vending.machine')}</h3>
                <div class="glass relative rounded border border-slate-700/70 p-3 md:p-4 overflow-hidden">
                    {#if !folded}
                        <div out:slide={{ duration: FOLD_MS }} class="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {#each V.slots as slot, i (slot.id)}
                                {#if slot.take}
                                    <button type="button"
                                            onclick={() => take(slot.take)}
                                            disabled={taken !== null}
                                            class="text-left rounded-sm border p-2 min-h-16 flex flex-col gap-1 transition-colors
                                                   {taken === null ? 'bg-slate-900 border-slate-600/80 hover:border-slate-400 hover:bg-slate-800/70' : ''}
                                                   {taken !== null && !(taken === slot.take && firstOf(slot.take) === i) ? 'bg-slate-950 border-slate-800 opacity-40' : ''}
                                                   {taken === slot.take && firstOf(slot.take) === i ? 'bg-slate-900 border-slate-600 outline outline-1 outline-amber-500 outline-offset-2' : ''}">
                                        <span class="text-[0.6rem] tracking-[0.16em] text-slate-400">{slot.id}{#if !slot.img && slot.sub}<span class="ml-1.5">· {slot.sub}</span>{/if}</span>
                                        {#if slot.img}
                                            <span class="flex items-center gap-2">
                                                <img src={slot.img} alt="" width="44" height="44" class="w-11 h-11 shrink-0 object-contain select-none">
                                                <span class="text-[0.7rem] leading-snug text-slate-300">
                                                    {slot.name}<br>{slot.sub}<br>
                                                    {#if slot.was}<s class="text-slate-500 mr-1.5">{slot.was}</s>{/if}{slot.price}
                                                </span>
                                            </span>
                                    {:else}
                                            <span class="text-[0.7rem] leading-snug text-slate-300">{slot.text}</span>
                                        {/if}
                                    </button>
                            {:else}
                                    <div class="rounded-sm border border-slate-800 bg-slate-950/70 p-2 min-h-16 flex flex-col gap-1">
                                        <span class="text-[0.6rem] tracking-[0.16em] text-slate-600">{slot.id}</span>
                                        <span class="text-[0.7rem] leading-snug text-slate-500">{slot.text}</span>
                                    </div>
                                {/if}
                            {/each}
                        </div>
                    {:else}
                        <!-- The folded glass: every compartment by its label, the used
                             one lit. What it was is the heading of the section below. -->
                        <div in:fade={{ delay: FOLD_MS / 2, duration: 300 }} class="grid grid-cols-6 md:grid-cols-12 gap-1">
                            {#each V.slots as slot, i (slot.id)}
                                <span class="rounded-sm border py-1 text-center text-[0.6rem] tracking-[0.16em]
                                             {i === firstOf(taken) ? 'border-amber-500 bg-slate-900 text-amber-400' : 'border-slate-800 bg-slate-950/70 text-slate-600'}">{slot.id}</span>
                            {/each}
                        </div>
                    {/if}
                    <div class="mt-3 pt-2 border-t border-dashed border-slate-700/70 flex flex-wrap gap-x-4 gap-y-1 text-[0.6rem] text-slate-500">
                        {#each V.plate as row}
                            <span><span class="text-slate-400">{row.label}</span> {row.value}</span>
                        {/each}
                        <span class="text-red-400">{V.plug}</span>
                    </div>
                </div>

                <!-- C4 -->
                {#if taken === 'c4'}
                    <h3 {@attach reveal} class="text-[0.65rem] tracking-[0.2em] uppercase text-amber-500 pb-1.5 mb-2.5 mt-6 border-b border-slate-800 scroll-mt-4">{t('vending.crank')}</h3>
                    <div class="rounded border border-slate-800 bg-slate-950/60 p-3 md:p-4 text-xs leading-relaxed">
                        {#each V.crank.slice(0, crankShown) as line, n}
                            <div {@attach follow} class="line"><span class="text-slate-600">{n ? String(n).padStart(2, '0') : '··'}</span>  <span class="text-slate-400">{line.text}</span></div>
                        {/each}
                        {#each V.crankEnd.slice(0, endShown) as line}
                            <div {@attach follow} class="line text-slate-100">{line.text}</div>
                        {/each}
                        <!-- The roll is the player's from the thud on, but the card waits
                             until the last line has been read: the label is the reveal, and
                             a green card arriving with it pulls the eye off the punchline. -->
                        {#if delivered === true && cardShown}
                            <div {@attach follow} class="line mt-3 inline-flex items-center gap-2 rounded border border-green-900 bg-green-950/50 px-3 py-1.5 text-green-300">
                                <img src="assets/img/items/sandwich.webp" alt="" width="20" height="20" class="w-5 h-5 select-none">
                                {tree().items?.sandwich?.name}
                            </div>
                        {:else if delivered === false && cardShown}
                            <div {@attach follow} class="line mt-2 text-slate-400 italic">{V.crankFull}</div>
                        {/if}
                    </div>
                {/if}

                <!-- MEHRWERT -->
                {#if taken === 'magazine'}
                    {@const M = V.magazine}
                    <h3 {@attach reveal} class="text-[0.65rem] tracking-[0.2em] uppercase text-[#c9a24a] pb-1.5 mb-2.5 mt-6 border-b border-slate-800 scroll-mt-4">{M.heading}</h3>
                    <p class="text-xs mb-3 text-slate-400">{M.drop}</p>
                    <div class="grid md:grid-cols-[16rem_1fr] gap-4 items-start">
                        <div class="relative aspect-[3/4] w-full max-w-64 mx-auto rounded-sm border border-[#2c3b57] bg-linear-to-b from-[#1f2a40] to-[#101725] p-4 flex flex-col shadow-xl">
                            <span class="absolute top-4 right-4 text-[0.55rem] text-slate-400 text-right leading-normal">{M.cover.issue}<br>{M.cover.price}</span>
                            <span class="block h-0.5 w-11 bg-[#c9a24a] mb-2.5"></span>
                            <span class="text-2xl font-black tracking-wider text-slate-100">{M.cover.title}</span>
                            <span class="text-[0.55rem] tracking-[0.18em] uppercase text-slate-400 mt-1">{M.cover.tagline}</span>
                            <span class="mt-auto flex flex-col gap-2">
                                <span class="text-sm font-black text-slate-100 leading-tight">{M.cover.lead}</span>
                                {#each M.cover.lines as line}
                                    <span class="text-[0.6rem] leading-snug text-slate-300 border-l-2 border-[#3b4a66] pl-2">{line}</span>
                                {/each}
                            </span>
                        </div>
                        <div class="flex flex-col gap-2.5">
                            {#each M.pages as page}
                                <div class="rounded-sm border border-[#243149] bg-[#141d2d] px-3.5 py-3 text-xs leading-relaxed text-slate-300">
                                    <span class="block text-[0.6rem] tracking-[0.2em] uppercase text-[#c9a24a] mb-1.5">{page.head}</span>
                                    {#if page.blank}<em>{page.text}</em>{:else}{page.text}{/if}
                                    {#if page.sign}<span class="block text-right text-[0.7rem] text-slate-400 mt-1">— {page.sign}</span>{/if}
                                </div>
                            {/each}
                            <div class="rounded-sm border border-[#243149] bg-[#141d2d] px-3.5 py-3 text-xs">
                                <span class="block text-[0.6rem] tracking-[0.2em] uppercase text-[#c9a24a] mb-1.5">{M.imprint.head}</span>
                                <dl class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-[0.7rem]">
                                    {#each M.imprint.rows as row}
                                        <dt class="text-slate-400">{row.label}</dt>
                                        <dd class={row.zero ? 'text-red-300 font-black' : 'text-slate-200'}>{row.value}</dd>
                                    {/each}
                                </dl>
                            </div>
                        </div>
                    </div>
                    <p class="text-xs mt-4 text-slate-100">{M.after}</p>
                {/if}

                <!-- CHANTAL'S PRINTOUT -->
                {#if taken === 'printout'}
                    {@const P = V.printout}
                    <h3 {@attach reveal} class="text-[0.65rem] tracking-[0.2em] uppercase text-[#cfc9bb] pb-1.5 mb-2.5 mt-6 border-b border-slate-800 scroll-mt-4">{P.heading}</h3>
                    <p class="text-xs mb-3 text-slate-400">{P.drop}</p>
                    <div class="printout relative px-5 py-5 md:px-6 text-[#3f444c]">
                        <span class="streak" aria-hidden="true"></span>
                        <span class="staple" aria-hidden="true"></span>
                        <span class="block text-base font-black text-[#2d3138]">{P.title}</span>
                        <span class="block text-[0.7rem] text-[#575c64]">{P.subtitle}</span>
                        <span class="block text-xs italic text-[#b77b8c] mt-1.5 mb-3">{P.pen}</span>
                        {#each P.posts as post}
                            <div class="border-t border-[#c9c4b8] pt-2.5 mt-2.5">
                                <span class="block text-xs font-black text-[#2d3138]">{post.title} <span class="copied">{post.emoji}</span></span>
                                <span class="block text-[0.6rem] text-[#7a7f87] mb-1.5">{post.when}</span>
                                <p class="text-xs leading-relaxed">{post.text}</p>
                            </div>
                        {/each}
                        <div class="border-t border-[#c9c4b8] mt-3 pt-2 flex flex-wrap justify-between gap-2 text-[0.6rem] text-[#7a7f87]">
                            <span>{P.signoff} <span class="copied">{P.signoffEmoji}</span></span>
                            <span>{P.comments}</span>
                        </div>
                    </div>
                    <p class="text-xs mt-4 text-slate-100">{P.after}</p>
                {/if}

                <!-- THE HOUSE RULES -->
                <h3 class="text-[0.65rem] tracking-[0.2em] uppercase text-teal-400 pb-1.5 mb-3 mt-6 border-b border-slate-800">{t('vending.tape')}</h3>
                <div class="tape relative px-5 py-5 text-slate-800">
                    <span class="block text-xs font-black tracking-widest uppercase text-red-900 mb-3">{V.rules.title}</span>
                    <ol class="list-decimal pl-5 text-xs leading-loose">
                        {#each V.rules.list as rule, i}
                            <li class={taken !== null && i === V.rules.limitRule ? 'underline decoration-red-700 decoration-2 underline-offset-4' : ''}>{rule}</li>
                        {/each}
                    </ol>
                    <div class="mt-4 pt-2.5 border-t border-[#d6d3c4] text-[0.7rem] text-slate-600 flex flex-wrap gap-x-3.5 gap-y-1">
                        <span>{V.rules.lead}</span>
                        {#each members.rows as row}
                            <span class={row.you ? 'text-red-900' : ''}>{row.text}</span>
                        {/each}
                        {#if !members.signed}<span class="text-red-900">{V.rules.free}</span>{/if}
                    </div>
                    {#if !members.signed}
                        <button type="button" onclick={() => engine.vendingSign(members.shown)}
                                class="mt-3 text-[0.7rem] text-slate-700 bg-[#e8e3d3] hover:bg-[#ddd6c2] border border-dashed border-slate-400 rounded-sm px-3 py-1.5 transition-colors">
                            {t('vending.sign')}
                        </button>
                    {/if}
                </div>

                <div class="flex flex-col md:flex-row md:flex-wrap gap-2.5 mt-5">
                    {#if taken === null}
                        <button type="button" onclick={() => take('magazine')} class="px-3.5 py-2 text-xs rounded border border-slate-700 bg-slate-950 hover:border-slate-500 text-slate-200 transition-colors">{t('vending.take.magazine')}</button>
                        <button type="button" onclick={() => take('printout')} class="px-3.5 py-2 text-xs rounded border border-slate-700 bg-slate-950 hover:border-slate-500 text-slate-200 transition-colors">{t('vending.take.printout')}</button>
                        <button type="button" onclick={() => take('c4')} class="px-3.5 py-2 text-xs rounded border border-slate-700 bg-slate-950 hover:border-slate-500 text-slate-200 transition-colors">{t('vending.take.c4')}</button>
                        <button type="button" onclick={() => engine.closeVending()} class="px-3.5 py-2 text-xs rounded border border-slate-700 bg-slate-950 hover:border-slate-500 text-slate-200 transition-colors">{t('vending.leave')}</button>
                    {:else}
                        <button type="button" onclick={() => engine.closeVending()} class="px-3.5 py-2 text-xs rounded border border-amber-500 bg-slate-950 hover:bg-amber-500/10 text-amber-400 transition-colors">{t('vending.leaveAfter')}</button>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    /* A faint reflection across the glass. */
    .glass {
        background: linear-gradient(160deg, #0d1522, #0a111b);
    }
    .glass::after {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        background: linear-gradient(115deg, transparent 35%, rgba(148, 163, 184, 0.06) 45%, transparent 55%);
    }

    /* The stairwell light. A dip now and then, never a strobe. */
    .lamp { animation: flicker 4s infinite; }
    .lamp.still { animation: none; }
    @keyframes flicker {
        0%, 96%, 100% { opacity: 1; }
        96.5% { opacity: 0.25; }
        97.5% { opacity: 0.9; }
        98%   { opacity: 0.4; }
    }

    /* Crank lines arrive by fading, not by sliding. */
    .line { animation: arrive 450ms ease-out; }
    @keyframes arrive { from { opacity: 0; } to { opacity: 1; } }

    /* The house rules: paper, taped inside the glass. */
    .tape {
        background: #f1eee3;
        border-radius: 2px;
        rotate: -0.5deg;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
    }
    .tape::before,
    .tape::after {
        content: '';
        position: absolute;
        top: -9px;
        width: 4.5rem;
        height: 1.25rem;
        background: rgba(226, 232, 240, 0.5);
        border: 1px solid rgba(148, 163, 184, 0.4);
    }
    .tape::before { left: 1.5rem; rotate: -4deg; }
    .tape::after  { right: 1.5rem; rotate: 3deg; }

    /* Chantal's printout: copier paper gone yellow, a staple, a toner streak.
       The emoji came out of the copier grey. */
    .printout {
        background: #e8e2d2;
        border-radius: 1px;
        rotate: 0.35deg;
        box-shadow: 0 10px 26px rgba(0, 0, 0, 0.45);
        background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.07), transparent 3%, transparent 97%, rgba(0, 0, 0, 0.08));
    }
    .streak {
        position: absolute;
        left: 62%;
        top: 0;
        bottom: 0;
        width: 1px;
        background: rgba(0, 0, 0, 0.08);
    }
    .staple {
        position: absolute;
        top: 10px;
        left: 18px;
        width: 22px;
        height: 4px;
        background: #9ca3af;
        border-radius: 1px;
        rotate: -8deg;
    }
    .copied {
        filter: grayscale(1) contrast(1.6) brightness(0.8);
        opacity: 0.75;
    }

    @media (max-width: 767px) {
        .tape, .printout { rotate: 0deg; }
    }
</style>
