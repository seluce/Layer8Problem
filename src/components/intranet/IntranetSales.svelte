<!--
  The Wall of Deals, formerly public/assets/intranet/sales.html.

  The five printed deals moved into data_intranet.js with 6.0 - which is what
  the note here already announced. They now sit next to the two reactive ones
  and are rendered by the same block instead of a near-copy of it.

  The badge classes stay in THIS file, written out in full, because the
  Tailwind scanner reads source and would never see a class name assembled in
  a data file. The data says which tone, the component says what that looks
  like.
-->
<script>
    import { intranetPages } from '../../engine/intranet_pages.js';

    const pages = $derived(intranetPages());
    const page = $derived(pages?.sales?.page ?? null);

    // The extra entry follows Markus' standing with you, the cancelled
    // recurring meeting follows today's story flag. Reactive first, then the
    // printed wall.
    const reactive = $derived([pages?.sales?.extra, pages?.sales?.phoenix].filter(Boolean));
    const deals = $derived([...reactive, ...(page?.deals ?? [])]);

    // Whole class names, mapped from a key. Never assembled from parts, and
    // never written in the data file - the scanner would not find them there.
    const TONES = {
        signed: 'bg-amber-900/30 text-amber-400 border border-amber-800',
        good:   'bg-emerald-900/30 text-emerald-400 border border-emerald-800',
        pilot:  'bg-blue-900/30 text-blue-400 border border-blue-800',
        bad:    'bg-red-900/30 text-red-400 border border-red-800',
        dead:   'bg-slate-700 text-slate-400 border border-slate-600'
    };
</script>

{#if page}
<div class="max-w-5xl mx-auto mt-8 px-4 pb-12">
    <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
        <div>
            <h1 class="text-3xl font-black mb-2 text-white">{page.title}</h1>
            <p class="text-slate-400">{page.subtitle}</p>
        </div>
        <div class="text-left md:text-right bg-slate-800 p-3 rounded-lg border border-slate-700 shadow-md">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">{page.leaderLabel}</p>
            <p class="font-bold text-amber-500">{page.leader}</p>
        </div>
    </div>

    <div class="space-y-6">
        {#each deals as deal (deal.customer)}
            <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md flex flex-col md:flex-row gap-6 {deal.dim || deal.tone === 'dead' ? 'opacity-75' : ''}">
                <div class="flex flex-col justify-center shrink-0">
                    <span class="text-5xl">{deal.icon}</span>
                </div>
                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h3 class="font-bold text-xl text-white">{page.customerLabel} {deal.customer}</h3>
                        <span class="{TONES[deal.tone] ?? TONES.dead} text-xs font-bold px-2 py-0.5 rounded-sm uppercase">{deal.badge}</span>
                    </div>
                    <p class="text-slate-300 mb-4 font-medium text-lg border-b border-slate-700 pb-4">{page.productLabel} "{deal.product}"</p>
                    <div class="text-sm text-slate-400 space-y-2">
                        {#each deal.rows as row (row.label)}
                            <p><span class="font-bold text-slate-300">{row.label}</span> {row.text}</p>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
{/if}
