<!--
  Impressum & AGB, formerly public/assets/intranet/impressum.html.

  Two things react here, and one of them deliberately does not grow: the
  version number climbs with every workday started, while the extra clauses
  replace one another at fixed thresholds instead of stacking. A legal page
  that gets longer every day would be unreadable within a week - and the
  better joke is a document that is amended constantly without anyone ever
  learning what changed.

  Since 6.0 the static paragraphs live in data_intranet.js as well. Half the
  page was data and half was markup, which meant translating it - or editing
  it at all - happened in two files with two different mechanisms. The
  component now only decides how a section looks, never what it says.
-->
<script>
    import { intranetPages } from '../../engine/intranet_pages.js';

    const legal = $derived(intranetPages()?.impressum ?? null);
    const page  = $derived(legal?.page ?? null);

    // Whole class names, never assembled: Tailwind scans the source, and a
    // string built at runtime is invisible to it - the accent would silently
    // disappear for any tone added later.
    const TONES = {
        slate:  { heading: 'text-slate-100', rule: '' },
        red:    { heading: 'text-red-400',    rule: 'border-l-4 border-red-500 pl-3' },
        blue:   { heading: 'text-blue-400',   rule: 'border-l-4 border-blue-500 pl-3' },
        amber:  { heading: 'text-amber-400',  rule: 'border-l-4 border-amber-500 pl-3' },
        purple: { heading: 'text-purple-400', rule: 'border-l-4 border-purple-500 pl-3' }
    };
    const tone = (name) => TONES[name] ?? TONES.slate;

    const versionLine = $derived(
        (page?.versionLine ?? '')
            .replace('{version}', legal?.version ?? '')
            .replace('{note}', legal?.note ?? '')
    );
</script>

{#if page}
<div class="max-w-4xl mx-auto mt-12 px-4 pb-12">
    <div class="bg-slate-800 p-8 md:p-12 rounded-2xl shadow-md border border-slate-700">
        <div class="flex items-center gap-3 mb-8 border-b border-slate-700 pb-6">
            <span class="text-4xl">⚖️</span>
            <div>
                <h1 class="text-3xl font-black text-white tracking-tight">{page.title}</h1>
                <p class="text-slate-400 font-medium mt-1">{page.subtitle}</p>
            </div>
        </div>

        <div class="space-y-8 text-slate-300 leading-relaxed text-sm md:text-base">

            {#each page.sections as section (section.title)}
                <div>
                    <h2 class="text-lg font-bold uppercase tracking-widest mb-2 {tone(section.tone).heading} {tone(section.tone).rule}">
                        {section.title}
                    </h2>

                    {#if section.block}
                        <p class="bg-slate-900/50 p-4 rounded-sm border border-slate-700 font-mono text-xs text-slate-400">
                            {#each section.block as line, i (i)}{line}<br>{/each}
                        </p>
                    {/if}

                    {#each section.paragraphs ?? [] as paragraph, i (i)}
                        <p class="mb-2">{paragraph}</p>
                    {/each}

                    {#if section.lead}
                        <p>{section.lead}</p>
                    {/if}

                    {#if section.items}
                        <ul class="list-disc pl-5 space-y-2 {section.lead ? 'mt-2' : ''}">
                            {#each section.items as item, i (i)}
                                <li>{item}</li>
                            {/each}
                        </ul>
                    {/if}
                </div>
            {/each}

            {#if legal?.clause}
                <div>
                    <h2 class="text-lg font-bold uppercase tracking-widest mb-2 {tone('purple').heading} {tone('purple').rule}">{legal.clause.title}</h2>
                    <p>{legal.clause.text}</p>
                </div>
            {/if}

            <div class="bg-slate-900 p-5 rounded-lg border border-slate-700 italic text-slate-500 text-xs">
                <p><strong class="text-slate-300">{page.closing.label}</strong> {page.closing.text}</p>
            </div>

            {#if legal}
                <p class="text-xs text-slate-600 text-center pt-4">{versionLine}</p>
            {/if}

        </div>
    </div>
</div>
{/if}
