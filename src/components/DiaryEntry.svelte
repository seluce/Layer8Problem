<!--
  The personal journal.

  The most literary part of the game used to sit as the fourth paragraph in a
  grey box. Here it gets what it deserves: a sheet of paper, laid slightly
  askew on the desk, with date and weekday like in a real diary. The texture
  already lives in the project (public/assets).

  The paragraphs arrive as data from engine/engine_diary.js: a list in
  reading order, each with a tone that decides how it is set.

  Since 6.1 they arrive as the DRAW rather than as the finished page — which
  lines were taken, and which marks go into them. renderDiary() puts the
  sentences together here, so the page follows a language switch like everything
  else on the screen it sits on.
-->
<script>
    import { dayName } from '../engine/engine_week.js';
    import { renderDiary } from '../engine/engine_diary.js';
    import { t, tf } from '../i18n/i18n.svelte.js';
    let { diary } = $props();

    // The page as it reads right now. renderDiary() goes through tree(), so
    // this derived is a reader of the language rune.
    const page = $derived(renderDiary(diary));

    // The day this page belongs to, handed in with the paragraphs.
    //
    // It used to be worked out here from difficultyMult - which is the DAY
    // mode's question. In a week that value stays at its identity 1.0 by
    // design, so a page written on a Friday was headed "Mittwoch", five days
    // running, at every level. Exactly the failure the day report had one file
    // over. engine_diary.dayIndexOf() answers it once now, and the {weekday}
    // inside the prose comes from the same call, so the header and the text
    // cannot say different days.
    const weekday = $derived(dayName(page.dayIndex));

    // A list rather than fixed fields, so a new slot in the diary does not
    // need a change here. The order is the order of the page; the blind-run
    // postscript deliberately sits before the closing line and gets its own
    // styling: added afterwards, like a note that only occurred to you as you
    // were shutting the book.
    const paragraphs = $derived(
        page.paragraphs.map(p => ({
            text: p.text,
            warn: p.tone === 'warn',
            note: p.tone === 'note',
            final: p.tone === 'final'
        }))
    );
</script>

{#if paragraphs.length}
    <div class="relative mx-auto max-w-lg -rotate-1 shadow-2xl">
        <div class="bg-[#f4ecd8] text-slate-800 rounded-sm px-6 py-5 text-left
                    border border-[#d8cdb4] shadow-inner"
             style="background-image:
                        repeating-linear-gradient(0deg, transparent 0 27px, rgba(120,130,150,0.18) 27px 28px),
                        linear-gradient(180deg, #f7f1e0 0%, #efe5cd 100%);">

            <!-- Header like a notebook: weekday, with the rule underneath -->
            <div class="flex items-baseline justify-between border-b-2 border-[#c8b99b] pb-1 mb-3">
                <span class="font-serif font-bold text-[15px] tracking-wide">{tf('diary.header', { day: weekday })}</span>
                <span class="font-serif text-[11px] text-slate-600 italic">{t('diary.personal')}</span>
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
