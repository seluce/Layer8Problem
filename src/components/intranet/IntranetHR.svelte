<!--
  Human Capital, formerly public/assets/intranet/hr.html.

  Two files sit behind one password. The credentials are broadcast over the
  news ticker for Schnösel, but GlobalCorp hands out the same initial password
  for every account and has never changed it - the policy note on the login
  card says so outright, and the IT is to blame for it, which is to say: you
  are. The account name for the second file is in the support line at the
  bottom of Schnösel's record - and in the onboarding mail that reaches the
  wrong inbox.

  Müller's file reads the archive: reprimands, days left without notice,
  survived workdays. Everything the company keeps on you.

  CAUTION: `state` is imported as `game`, otherwise the $state rune below
  would compile to a store access. See STRUCTURE.md.
-->
<script>
    import { state as game } from '../../engine/engine_state.svelte.js';
    import { intranetPages } from '../../engine/intranet_pages.js';

    const data = $derived(intranetPages()?.hr ?? null);
    const page = $derived(data?.page ?? null);

    // Both records render through the same blocks below. Schnösel's is fixed
    // and comes from the data file, Müller's is assembled from the archive -
    // the shape is identical, which is why there is one renderer and not two.
    const mueller = $derived(page && data ? {
        ...page.mueller,
        status: page.mueller.statusTemplate.replace('{month}', data.probation),
        master: [
            { label: page.mueller.salaryLabel,  value: data.salary, tone: 'amber', note: data.salaryNote },
            { label: page.mueller.standbyLabel, value: page.mueller.standbyValue, tone: 'red' },
            { label: page.mueller.holidayLabel, value: page.mueller.holidayValue, note: page.mueller.holidayNote },
            { label: page.mueller.loyaltyLabel, value: data.loyalty.label, strong: true, note: data.loyalty.text }
        ],
        documents: data.documents,
        notes: data.notes
    } : null);

    // One password for everyone. That is the joke, and it is also the policy.
    // It stays here rather than in the data file precisely because it must be
    // identical in both languages - one place, no way to drift.
    const PASSWORD = 'Synergy123!';

    // The user names DO differ by language: the second one is read off the
    // support line under Schnösel's record, so it moves with the player's
    // name. See data_intranet.js.
    const accounts = $derived(page?.accounts ?? []);

    const NOTE_TONE = { good: 'text-emerald-500', bad: 'text-red-500', neutral: 'text-amber-500' };

    // Whole class names, mapped from a key in the data file. Never assembled.
    const VALUE_TONE = { amber: 'font-mono text-amber-400', red: 'text-red-400' };

    let user = $state('');
    let pass = $state('');
    let failed = $state(false);
    let file = $state(null);

    function attemptLogin() {
        const name = user.trim().toLowerCase();
        const account = accounts.find(a => a.user === name);
        if (account && pass.trim() === PASSWORD) {
            file = account.record;
            failed = false;
        } else {
            failed = true;
            pass = '';
        }
    }

    function logout() {
        user = '';
        pass = '';
        failed = false;
        file = null;
    }

    // Enter submits, as on any login form. No <form> element: the game runs in
    // one document and a stray submit would reload it.
    function onKey(e) {
        if (e.key === 'Enter') attemptLogin();
    }
</script>

{#snippet record(rec)}
    <div class="mt-8">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-black text-white tracking-tight">{page.fileTitle} <span class="text-purple-500">{rec.recordId}</span></h1>
            <button type="button" onclick={logout}
                    class="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 border border-slate-600 rounded-sm transition-colors">{page.logout}</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div class="md:col-span-1 space-y-6">
                <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md flex flex-col items-center text-center">
                    <div class="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center text-5xl mb-4 border-4 border-slate-600">{rec.avatar}</div>
                    <h2 class="font-bold text-xl text-white">{rec.name}</h2>
                    <p class="text-purple-400 font-bold text-sm mb-2">{rec.role}</p>
                    <span class="bg-amber-900/40 text-amber-400 border border-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{rec.status}</span>
                </div>

                <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
                    <h3 class="font-bold mb-3 text-white border-b border-slate-700 pb-2">{page.sectionMaster}</h3>
                    <ul class="space-y-3 text-sm text-slate-300">
                        {#each rec.master as row, i (row.label)}
                            <li><span class="block text-xs text-slate-500 uppercase {i > 0 ? 'mt-2' : ''}">{row.label}</span>
                            {#if row.lines}
                                {#each row.lines as line, j (j)}{line}<br>{/each}
                            {:else}
                                <span class="{VALUE_TONE[row.tone] ?? ''} {row.strong ? 'font-bold text-slate-200' : ''}">{row.value}</span><br>
                            {/if}
                            {#if row.note}<span class="text-[0.625rem] text-slate-500 leading-relaxed">{row.note}</span>{/if}</li>
                        {/each}
                    </ul>
                </div>
            </div>

            <div class="md:col-span-2 space-y-6">
                <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
                    <h3 class="font-bold mb-4 text-white flex items-center gap-2">
                        <span class="text-amber-500">📁</span> {page.sectionDocuments}
                    </h3>

                    <div class="space-y-3">
                        {#each rec.documents as doc (doc.id)}
                            <details class="group bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
                                <summary class="px-4 py-3 cursor-pointer font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex justify-between items-center">
                                    <span class="flex items-center gap-2"><span class="text-xl">{doc.icon}</span> {doc.name}</span>
                                    <span class="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div class="p-4 border-t border-slate-700 text-sm text-slate-300 space-y-4 bg-slate-950/50">
                                    {#if doc.intro}
                                        <p class="font-bold text-red-400 uppercase text-xs">{doc.intro}</p>
                                    {/if}
                                    {#if doc.lead}
                                        <p class="text-xs text-slate-400 mb-2">{doc.lead}</p>
                                    {/if}
                                    {#if doc.items}
                                        <ul class="list-decimal pl-5 space-y-3">
                                            {#each doc.items as item, i (i)}
                                                <li>{@html item}</li>
                                            {/each}
                                        </ul>
                                    {/if}
                                    {#if doc.paragraphs}
                                        <div class="space-y-3 text-slate-400 italic">
                                            {#each doc.paragraphs as text, i (i)}
                                                <p>{@html text}</p>
                                            {/each}
                                        </div>
                                    {/if}
                                </div>
                            </details>
                        {/each}
                    </div>
                </div>

                <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
                    <h3 class="font-bold mb-4 text-white flex items-center gap-2">
                        <span class="text-emerald-500">📊</span> {page.sectionBehaviour}
                    </h3>
                    <ul class="space-y-4 text-sm text-slate-300">
                        {#each rec.notes as note (note.title)}
                            <li class="flex gap-3">
                                <span class="{NOTE_TONE[note.tone]} mt-1">■</span>
                                <div>
                                    <strong class="text-slate-200 block">{note.title}</strong>
                                    {note.text}
                                </div>
                            </li>
                        {/each}
                    </ul>
                </div>

                {#if data?.support}
                    <p class="text-[0.625rem] text-slate-600 text-right">{data.support}</p>
                {/if}
            </div>

        </div>
    </div>
{/snippet}

{#if page}
<div class="max-w-4xl mx-auto mt-8 px-4">

    {#if !file}
        <div class="max-w-md mx-auto mt-20">
            <div class="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-xl relative overflow-hidden">
                <h2 class="text-2xl font-bold text-white mb-2">{page.login.title}</h2>
                <p class="text-sm text-slate-400 mb-6 border-b border-slate-700 pb-4">{page.login.subtitle}</p>

                <div class="space-y-4">
                    <div>
                        <label for="hr-user" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{page.login.userLabel}</label>
                        <input type="text" id="hr-user" bind:value={user} onkeydown={onKey} autocomplete="off"
                               class="w-full bg-slate-900 border border-slate-600 rounded-sm p-3 text-slate-200 outline-hidden focus:border-purple-500 transition-colors">
                    </div>
                    <div>
                        <label for="hr-pass" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{page.login.passLabel}</label>
                        <input type="password" id="hr-pass" bind:value={pass} onkeydown={onKey} autocomplete="off"
                               class="w-full bg-slate-900 border border-slate-600 rounded-sm p-3 text-slate-200 outline-hidden focus:border-purple-500 transition-colors">
                    </div>
                    <p class="text-red-500 text-xs font-bold h-4 transition-opacity {failed ? '' : 'opacity-0'}">{page.login.denied}</p>
                    <button type="button" onclick={attemptLogin}
                            class="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-sm transition-colors mt-2">{page.login.submit}</button>
                </div>

                {#if data?.policy}
                    <p class="mt-6 pt-4 border-t border-slate-700 text-[0.625rem] text-slate-500 leading-relaxed">{data.policy}</p>
                {/if}
            </div>
        </div>
    {:else if file === 'schnoesel'}
        {@render record(page.schnoesel)}
    {:else if mueller}
        {@render record(mueller)}
    {/if}
</div>
{/if}
