<!--
  The GlobalCorp chronicle, found as an item in the server room.

  Pure flavour text, so the five entries live as data rather than markup — the
  layout repeats for each of them, and adding a decade should not mean copying
  a block of HTML. Since 6.0 that data sits in data_lore.js with everything
  else the book says, rather than in this file.

  The paragraphs contain <strong> and <em>, which is why they go through
  {@html}. They are authored here, never player input.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';
    import { ensure } from '../data.js';
    import { t, tf, tree } from '../i18n/i18n.svelte.js';

    // Opened from the backpack, so the pool is fetched on first view.
    $effect(() => { ensure('lore'); });

    // Müller's own additions at the back of the book. The chronicle belongs to
    // GlobalCorp and would never devote a chapter to a systems administrator -
    // but he found the volume, the last entry is from 2012, and there is space
    // left on the page.
    // Rendered by the engine: the archive stores ids, not sentences. The lore
    // tree is handed in via tree() so this derived HAS a reactive language
    // source - resolved through DB alone it never re-ran on a switch and the
    // handwritten entries stayed in the old language while the chapters
    // around them followed.
    const written = $derived(engine.chronicleEntries?.(tree().lore) ?? []);
    const CHRONICLE = $derived(tree().lore?.chapters ?? []);
    const doneToday = $derived(engine.chronicleWrittenToday?.() ?? false);

    // The gala, if it ever happened. Its own page rather than a thirteenth
    // daily line - it is not a day of the career, it is the exception to it,
    // and it must not be pushed out by the twelve-line cap. See
    // engine_core.recordGala().
    const gala = $derived(engine.galaEntry?.(tree().lore) ?? null);

    function addLine() {
        engine.addChronicleEntry();
    }


</script>

{#if state.loreOpen}
    <div class="fixed inset-0 bg-black/90 z-9999 flex items-center justify-center p-4 fade-in">
        <div class="bg-[#fdf6e3] rounded-lg max-w-3xl w-full max-h-[85vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] border-8 border-[#5d4037] relative text-[#3e2723] font-serif">

            <div class="bg-[#3e2723] p-6 text-center border-b-4 border-[#8d6e63] relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-wood"></div>
                <h2 class="text-3xl font-bold text-[#d7ccc8] uppercase tracking-[0.2em] mb-1 relative z-10">{t('lore.title')}</h2>
                <span class="text-sm text-[#a1887f] italic font-serif relative z-10">{t('lore.motto')}</span>
            </div>

            <div class="overflow-y-auto p-10 space-y-12 text-lg leading-relaxed bg-cream-paper">

                <div class="text-center border-b-2 border-[#d7ccc8] pb-6">
                    <p class="italic text-xl">
                        {t('lore.warning')}
                    </p>
                </div>

                {#each CHRONICLE as entry (entry.year)}
                    <div class="relative pl-8 border-l-4 border-[#8d6e63]">
                        <div class="absolute left-[-2.3rem] top-0 bg-[#8d6e63] text-[#fdf6e3] w-14 h-14 flex items-center justify-center rounded-full font-bold text-xl shadow-lg">{entry.year}</div>
                        <h3 class="font-bold text-2xl mb-2 text-[#5d4037]">{entry.title}</h3>
                        {#each entry.paragraphs as text, i}
                            <p class={i === 0 ? 'mb-4' : ''}>{@html text}</p>
                        {/each}
                    </div>
                {/each}

                <!-- The last page: nothing official has been recorded here for
                     years, and the volume is currently in Müller's hands. -->
                <div class="relative pl-8 border-l-4 border-dashed border-[#c8b99b] mt-12">
                    <div class="absolute left-[-2.3rem] top-0 bg-[#d7ccc8] text-[#5d4037] w-14 h-14 flex items-center justify-center rounded-full font-bold text-sm shadow-lg border-2 border-dashed border-[#a1887f]">?</div>

                    <h3 class="font-bold text-2xl mb-2 text-[#8d6e63]">{t('lore.lastPages.title')}</h3>
                    <p class="text-[#6d4c41] italic mb-6">
                        {t('lore.lastPages.body')}
                    </p>

                    {#each written as entry (entry.day)}
                        <!-- Handwriting: another ink, a slight tilt, ruled lines -->
                        <div class="mb-5 pl-4 py-2 border-l-2 border-[#7a6a52]"
                             style="rotate:-0.4deg">
                            <p class="text-[#33475b] text-[17px] leading-[30px]"
                               style="font-family: 'Segoe Script', 'Bradley Hand', 'Comic Sans MS', cursive">
                                {entry.text}
                            </p>
                            <span class="block text-right text-[11px] text-[#7a6a52] mt-1"
                                  style="font-family: 'Segoe Script', 'Bradley Hand', 'Comic Sans MS', cursive">
                                {tf('lore.entry.sign', { day: entry.day })}
                            </span>
                        </div>
                    {/each}

                    {#if gala}
                        <!-- Set apart on purpose: pressed into the book rather
                             than written into the run of days, and it stays
                             there while the daily lines come and go. -->
                        <div class="mb-5 mt-8 pl-4 py-3 border-l-4 border-[#b3627a] bg-[#f3e3e8]/60 rounded-r-sm"
                             style="rotate:0.3deg">
                            <span class="block text-[10px] uppercase tracking-[0.2em] text-[#b3627a] mb-1"
                                  style="font-family: 'Segoe Script', 'Bradley Hand', 'Comic Sans MS', cursive">
                                {t('lore.gala.label')}
                            </span>
                            <p class="text-[#33475b] text-[17px] leading-[30px]"
                               style="font-family: 'Segoe Script', 'Bradley Hand', 'Comic Sans MS', cursive">
                                {gala.text}
                            </p>
                            <span class="block text-right text-[11px] text-[#7a6a52] mt-1"
                                  style="font-family: 'Segoe Script', 'Bradley Hand', 'Comic Sans MS', cursive">
                                {tf('lore.entry.sign', { day: gala.day })}
                            </span>
                        </div>
                    {/if}

                    <div class="mt-4">
                        {#if doneToday}
                            <p class="text-[13px] text-[#8d6e63] italic">
                                {t('lore.done')}
                            </p>
                        {:else}
                            <button type="button" onclick={addLine}
                                    class="text-sm font-serif text-[#5d4037] bg-[#efebe9] hover:bg-[#e0d8d0] border-2 border-dashed border-[#a1887f] rounded-sm px-5 py-2.5 transition-colors shadow-sm">
                                <img src="assets/img/ui/ui_pen.webp" alt="" width="16" height="16"
                                     class="w-4 h-4 inline-block align-[-0.2em] mr-1.5 select-none"
                                     onerror={(e) => e.currentTarget.outerHTML = '🖊️'}> {t('lore.add')}
                            </button>
                            <p class="text-[11px] text-[#8d6e63] italic mt-2">
                                {t('lore.addHint')}
                            </p>
                        {/if}
                    </div>
                </div>

                <div class="bg-[#efebe9] p-6 rounded-sm border border-[#d7ccc8] italic text-center mt-12 shadow-inner">
                    {t('lore.ceoQuote')}
                    <br>
                    <span class="font-bold not-italic text-sm mt-3 block uppercase tracking-widest text-[#5d4037]">{t('lore.ceoSign')}</span>
                </div>

            </div>

            <div class="p-6 bg-[#d7ccc8] border-t-4 border-[#8d6e63] flex justify-center">
                <button onclick={() => engine.closeLoreModal()}
                        class="bg-[#5d4037] hover:bg-[#3e2723] text-[#fdf6e3] px-10 py-3 rounded-sm shadow-lg font-bold uppercase tracking-wider transition-transform hover:scale-105 border-2 border-[#8d6e63]">
                    {t('lore.close')}
                </button>
            </div>

        </div>
    </div>
{/if}
