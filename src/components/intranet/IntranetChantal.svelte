<!--
  Chantals Feel-Good Hub, formerly public/assets/intranet/chantal.html.

  The top post follows the average reputation across the team; between the
  thresholds of the team view (+20 / -20) Chantal has no reason to write about
  you and only the older post from the pool is on the wall. Which older post
  that is changes with every visit.

  The paragraphs carry <strong> and <em> and go through {@html}. They are
  authored in data_intranet.js, never player input.
-->
<script>
    import { intranetPages } from '../../engine/intranet_pages.js';

    const pages = $derived(intranetPages());
    const post  = $derived(pages?.chantal?.top ?? null);
    const older = $derived(pages?.chantal?.older ?? null);
    const page  = $derived(pages?.chantal?.page ?? null);
</script>

<div class="max-w-3xl mx-auto mt-12 px-4 pb-12 space-y-8">

    <div class="text-center mb-12">
        <div class="inline-block bg-slate-800 p-4 rounded-full shadow-lg border border-slate-700 mb-4 text-4xl">🧘‍♀️</div>
        <h1 class="text-4xl font-black text-pink-400 mb-2 tracking-tight">{page?.title}</h1>
        <p class="text-pink-300/70 font-medium">{page?.subtitle}</p>
    </div>

    {#if post}
        <div class="bg-slate-800 p-8 rounded-2xl shadow-md border border-slate-700 relative">
            <div class="absolute -left-3 top-8 w-6 h-6 bg-pink-500 rounded-full border-4 border-slate-900"></div>
            <h2 class="text-2xl font-bold text-white mb-2">{post.title}</h2>
            <div class="text-xs text-pink-400/80 font-bold uppercase tracking-wider mb-6">{post.time}</div>

            <div class="space-y-4 text-slate-300 leading-relaxed">
                {#each post.paragraphs as text, i (i)}
                    <p>{@html text}</p>
                {/each}
                <p class="font-bold text-pink-400 mt-6">
                    {#each page?.signoff ?? [] as line, i (i)}{line}<br>{/each}
                </p>
            </div>
        </div>
    {/if}

    {#if older}
        <div class="bg-slate-800 p-8 rounded-2xl shadow-md border border-slate-700 relative {post ? 'opacity-80' : ''}">
            <div class="absolute -left-3 top-8 w-6 h-6 {post ? 'bg-slate-600' : 'bg-pink-500'} rounded-full border-4 border-slate-900"></div>
            <h2 class="text-2xl font-bold text-white mb-2">{older.title}</h2>
            <div class="text-xs {post ? 'text-slate-400' : 'text-pink-400/80'} font-bold uppercase tracking-wider mb-6">{older.time}</div>

            <div class="space-y-4 text-slate-300 leading-relaxed">
                {#each older.paragraphs as text, i (i)}
                    <p>{@html text}</p>
                {/each}
            </div>
        </div>
    {/if}

</div>
