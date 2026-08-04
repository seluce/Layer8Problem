<!--
  The personal journal.

  The most literary part of the game used to sit as the fourth paragraph in a
  grey box. Here it gets what it deserves: a sheet of paper, laid slightly
  askew on the desk, with date and weekday like in a real diary. The texture
  already lives in the project (public/assets).

  The paragraphs arrive as data from engine_core.generateDiaryEntry().
-->
<script>
    import { state as game } from '../engine/engine_state.svelte.js';

    let { diary } = $props();

    // The weekday follows from the difficulty - that is what the levels are
    // called in the game, and the diary plays along.
    const WEEKDAY = [
        { test: (m) => m < 1.0, label: 'Freitag' },
        { test: (m) => m > 1.0, label: 'Montag' },
        { test: () => true,     label: 'Mittwoch' }
    ];
    const weekday = $derived(WEEKDAY.find(d => d.test(game.difficultyMult)).label);

    // The blind-run postscript deliberately sits before the closing line and
    // gets its own styling: added afterwards, like a note that only occurred
    // to you as you were shutting the book.
    const paragraphs = $derived(
        [
            { text: diary?.p1 },
            { text: diary?.p2 },
            { text: diary?.pWarn,  warn: true },
            { text: diary?.pBlind, note: true },
            { text: diary?.p3,     final: true }
        ].filter(p => p.text)
    );
</script>

{#if paragraphs.length}
    <div class="relative mx-auto max-w-lg -rotate-1 shadow-2xl">
        <div class="bg-[#f4ecd8] text-slate-800 rounded-sm px-6 py-5 text-left
                    border border-[#d8cdb4] shadow-inner"
             style="background-image:
                        repeating-linear-gradient(0deg, transparent 0 27px, rgba(120,130,150,0.18) 27px 28px),
                        linear-gradient(180deg, #f7f1e0 0%, #efe5cd 100%);">

            <!-- Kopfzeile wie in einem Notizbuch: Wochentag, darunter der Strich -->
            <div class="flex items-baseline justify-between border-b-2 border-[#c8b99b] pb-1 mb-3">
                <span class="font-serif font-bold text-[15px] tracking-wide">Logbuch — {weekday}</span>
                <span class="font-serif text-[11px] text-slate-600 italic">Persönlich</span>
            </div>

            <div class="space-y-3 font-serif text-[13px] leading-[28px]">
                {#each paragraphs as p, i (i)}
                    {#if p.note}
                        <p class="text-[12px] leading-[26px] text-slate-700 border-l-2 border-[#c8b99b] pl-3 ml-1">
                            {p.text}
                        </p>
                    {:else}
                        <p class:font-semibold={p.final}
                           class:text-amber-900={p.warn}
                           class="{p.final ? 'border-t border-[#d8cdb4] pt-2' : ''}">
                            {p.text}
                        </p>
                    {/if}
                {/each}
            </div>

            <!-- Signature line; the initials are the player character's -->
            <div class="mt-4 text-right font-serif italic text-slate-600 text-[12px]">— M.</div>
        </div>
    </div>
{/if}
