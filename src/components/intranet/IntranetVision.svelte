<!--
  The CEO interview, formerly public/assets/intranet/ceo_interview.html.

  The printed interview is fixed. What changes is one additional question,
  and it sits BEFORE the closing one - nothing follows "letzte Frage". It only
  exists if there is something to ask about: a negotiation that did not go his
  way, or the question of whether GlobalCorp uses its own technology in-house,
  which leads to an IT department Dr. Wichtig either praises or has to think
  about first. Anyone with root on the network also finds an editorial note.

  Since 6.0 the printed part lives in data_intranet.js as well, so the whole
  interview - fixed and reactive - is edited in one place. That the extra
  question goes second-to-last stays a decision of this file: it is about
  where a question can stand, not about what it says.
-->
<script>
    import { intranetPages } from '../../engine/intranet_pages.js';

    const vision = $derived(intranetPages()?.vision ?? null);
    const page   = $derived(vision?.page ?? null);

    // Everything except the closing pair, which is rendered after the extra.
    const opening = $derived(page ? page.turns.slice(0, -1) : []);
    const closing = $derived(page ? page.turns.at(-1) : null);
</script>

{#snippet question(text)}
    <div>
        <p class="font-sans font-bold text-sm text-slate-500 uppercase tracking-wide mb-2">{page.interviewer}</p>
        <p class="font-bold text-slate-200">{text}</p>
    </div>
{/snippet}

{#snippet answer(text, named)}
    <div class="pl-6 border-l-4 border-blue-500">
        {#if named}
            <p class="font-sans font-bold text-sm text-blue-400 uppercase tracking-wide mb-2">{page.ceo}</p>
        {/if}
        <!-- The answers carry inline emphasis: the laugh, the editorial aside
             about the yacht. Source is the data file, never player input. -->
        <p>{@html text}</p>
    </div>
{/snippet}

{#if page}
<div class="max-w-4xl mx-auto mt-8 px-4 pb-12">
    <div class="bg-slate-800 p-8 md:p-12 rounded-2xl shadow-md border border-slate-700">
        <div class="inline-block bg-blue-900/40 text-blue-300 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-widest border border-blue-800/50">{page.badge}</div>
        <h1 class="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">{page.headline}</h1>
        <p class="text-xl text-slate-400 mb-12 font-light">{page.standfirst}</p>

        <div class="space-y-10 text-lg text-slate-300 leading-relaxed font-serif">

            {#each opening as turn, i (turn.q)}
                {@render question(turn.q)}
                {@render answer(turn.a, i === 0)}
            {/each}

            {#if vision?.extra}
                {@render question(vision.extra.question)}
                {@render answer(vision.extra.answer, false)}
            {/if}

            {#if closing}
                {@render question(closing.q)}
                {@render answer(closing.a, false)}
            {/if}

        </div>

        {#if vision?.note}
            <p class="mt-12 pt-6 border-t border-slate-700 text-xs text-slate-500 italic leading-relaxed">{vision.note}</p>
        {/if}
    </div>
</div>
{/if}
