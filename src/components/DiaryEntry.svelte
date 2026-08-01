<!--
  Das persönliche Logbuch.

  Der literarisch beste Teil des Spiels stand bisher als vierter Absatz in
  einem grauen Kasten. Hier bekommt er, was er verdient: ein Blatt Papier,
  leicht schief auf den Tisch gelegt, mit Datum und Wochentag wie in einem
  echten Tagebuch. Die Textur liegt bereits im Projekt (public/assets).

  Die Absätze kommen als Daten aus engine_core.generateDiaryEntry().
-->
<script>
    import { state as game } from '../engine/engine_state.svelte.js';

    let { diary } = $props();

    // Der Wochentag ergibt sich aus dem Schwierigkeitsgrad — so heißen die
    // Grade im Spiel, und das Tagebuch spielt das Spiel mit.
    const WEEKDAY = [
        { test: (m) => m < 1.0, label: 'Freitag' },
        { test: (m) => m > 1.0, label: 'Montag' },
        { test: () => true,     label: 'Mittwoch' }
    ];
    const weekday = $derived(WEEKDAY.find(d => d.test(game.difficultyMult)).label);

    const paragraphs = $derived(
        [diary?.p1, diary?.p2, diary?.pWarn, diary?.p3]
            .map((text, i) => ({ text, warn: i === 2, final: i === 3 }))
            .filter(p => p.text)
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
                    <p class:font-semibold={p.final}
                       class:text-amber-900={p.warn}
                       class="{p.final ? 'border-t border-[#d8cdb4] pt-2' : ''}">
                        {p.text}
                    </p>
                {/each}
            </div>

            <!-- Unterschrift-Zeile; das Kürzel ist das des Spielercharakters -->
            <div class="mt-4 text-right font-serif italic text-slate-600 text-[12px]">— M.</div>
        </div>
    </div>
{/if}
