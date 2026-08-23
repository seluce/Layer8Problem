<!--
  The canteen menu, formerly public/assets/intranet/kantine.html.

  The five working days and the Saturday row are data now (data_intranet.js).
  Saturday still has its own block in the markup - it carries its own colours
  and a second line under the day name, and folding that into the loop would
  cost more than it saves - but what it SAYS comes from the same place as the
  rest.

  The plan hangs on the wall for the whole week, so it does not change with
  the clock. What comes next: the current weekday is highlighted, an issue
  line above the table knows the time of day, and a dish the player has
  already suffered through carries a note.
-->
<script>
    import { intranetPages } from '../../engine/intranet_pages.js';

    const kantine = $derived(intranetPages()?.kantine ?? null);
    const page    = $derived(kantine?.page ?? null);

    const SERVICE_TONE = {
        wait:   'border-l-amber-500 text-amber-200/90 bg-amber-900/20',
        open:   'border-l-emerald-500 text-emerald-200/90 bg-emerald-900/20',
        closed: 'border-l-slate-500 text-slate-400 bg-slate-800/60'
    };

</script>

<div class="max-w-5xl mx-auto mt-8 px-4 pb-12">
    <h1 class="text-3xl font-black mb-8 text-white">{page?.title}</h1>

    {#if kantine?.service}
        <div class="mb-6 border-l-4 p-4 rounded-sm text-sm {SERVICE_TONE[kantine.service.tone]}">
            <span class="font-bold uppercase tracking-wide">{kantine.service.label}</span>
            <span class="opacity-80"> — {kantine.service.note}</span>
            {#if kantine.done}
                <span class="opacity-80"> {kantine.done}</span>
            {/if}
        </div>
    {/if}

    <div class="md:bg-slate-800 md:rounded-xl md:shadow-md md:border md:border-slate-700 md:overflow-hidden flex flex-col gap-4 md:gap-0 md:block">

        <div class="hidden md:grid md:grid-cols-5 bg-slate-950 text-emerald-500 uppercase text-xs tracking-wider border-b border-slate-700/50">
            <div class="p-4 font-bold col-span-1">{page?.dayLabel}</div>
            <div class="p-4 font-bold col-span-2">{page?.classicLabel}</div>
            <div class="p-4 font-bold col-span-2">{page?.veggieLabel}</div>
        </div>

        {#each page?.menu ?? [] as row, i (row.id)}
            <div class="flex flex-col md:grid md:grid-cols-5 rounded-xl md:rounded-none border md:border-none md:border-b md:border-slate-700/50 hover:bg-slate-700/30 p-4 md:p-0 gap-3 md:gap-0 shadow-xs md:shadow-none
                        {row.id === kantine?.today
                            ? 'bg-amber-900/20 md:bg-amber-900/10 border-amber-800/50'
                            : `bg-slate-800 border-slate-700 ${i % 2 === 0 ? 'md:bg-transparent' : 'md:bg-slate-800/30'}`}">
                <div class="md:col-span-1 md:p-4 font-bold text-lg md:text-base border-b border-slate-700/50 md:border-none pb-2 md:pb-0 flex flex-col md:justify-center
                            {row.id === kantine?.today ? 'text-amber-400' : 'text-slate-300'}">
                    <span>{row.day}</span>
                    {#if row.id === kantine?.today}
                        <span class="text-[0.625rem] md:text-xs font-normal text-amber-500/80 uppercase tracking-wider mt-0.5">{page?.todayLabel}</span>
                    {/if}
                </div>
                <div class="md:col-span-2 md:p-4">
                    <div class="text-[0.625rem] font-bold text-emerald-500 uppercase tracking-widest mb-1 md:hidden">{page?.classicLabel}</div>
                    <strong>{row.classic.name}</strong><br>
                    <span class="text-sm text-slate-500">{row.classic.note}</span>
                </div>
                <div class="md:col-span-2 md:p-4">
                    <div class="text-[0.625rem] font-bold text-emerald-500 uppercase tracking-widest mb-1 md:hidden">{page?.veggieLabel}</div>
                    <strong>{row.veggie.name}</strong><br>
                    <span class="text-sm text-slate-500">{row.veggie.note}</span>
                </div>
            </div>
        {/each}

        <div class="flex flex-col md:grid md:grid-cols-5 bg-emerald-900/20 md:bg-emerald-900/10 rounded-xl md:rounded-none border border-emerald-800/50 md:border-none hover:bg-emerald-900/30 p-4 md:p-0 gap-3 md:gap-0 shadow-xs md:shadow-none">
            <div class="md:col-span-1 md:p-4 font-bold text-emerald-400 text-lg md:text-base border-b border-emerald-800/50 md:border-none pb-2 md:pb-0 flex flex-col md:justify-center">
                <span>{page?.saturday.day}</span>
                <span class="text-[0.625rem] md:text-xs font-normal text-emerald-500 md:text-emerald-600 uppercase tracking-wider mt-0.5">{page?.saturday.sub}</span>
            </div>
            <div class="md:col-span-2 md:p-4">
                <div class="text-[0.625rem] font-bold text-emerald-500 uppercase tracking-widest mb-1 md:hidden">{page?.classicLabel}</div>
                <strong class="text-emerald-300 md:text-white">{page?.saturday.classic.name}</strong><br>
                <span class="text-sm text-emerald-600/80 md:text-slate-500">{page?.saturday.classic.note}</span>
            </div>
            <div class="md:col-span-2 md:p-4">
                <div class="text-[0.625rem] font-bold text-emerald-500 uppercase tracking-widest mb-1 md:hidden">{page?.veggieLabel}</div>
                <strong class="text-emerald-300 md:text-white">{page?.saturday.veggie.name}</strong><br>
                <span class="text-sm text-emerald-600/80 md:text-slate-500">{page?.saturday.veggie.note}</span>
            </div>
        </div>

    </div>

    <div class="mt-8 bg-slate-800 border border-red-900/50 p-6 rounded-xl border-l-4 border-l-red-500 shadow-md">
        <h3 class="font-bold mb-2 text-white">{page?.hygieneTitle}</h3>
        <p class="text-sm text-slate-400">{kantine?.hygiene ?? page?.hygieneFallback}</p>
    </div>
</div>
