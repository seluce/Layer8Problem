<!--
  Startseite des Intranets, vormals public/assets/intranet/index.html.

  Three things here know how the day is going: the employee of the month
  (highest reputation, only above the FRIENDLY threshold), the company feed
  (posts whose story flag the player has tripped come first) and the counter
  for days without an incident in the server room.

  The selection happens in engine_ui.buildIntranet(); this renders it. Avatar
  colours arrive as hex values and go into an inline style - class names built
  from data are not reliably found by the Tailwind scanner.

  The feed texts contain no markup and are authored in data_intranet.js.
-->
<script>
    import { state as game } from '../../engine/engine_state.svelte.js';

    const data = $derived(game.intranetData);
</script>

<div class="max-w-6xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

    <div class="col-span-2 space-y-8">
        <div class="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-md">
            <h1 class="text-3xl font-black mb-3 text-white">Willkommen in Q4! 🚀</h1>
            <p class="text-slate-300 leading-relaxed mb-6">Unser Pivot zur "AI-gestützten Blockchain-Lösung" war ein voller Erfolg! Auch wenn unser Produktteam noch prüft, was genau das für unsere Kernsoftware bedeutet, hat das Marketing bereits drei Branchen-Awards dafür entgegengenommen. Denkt daran: Wir sind agil. Wir versprechen die Zukunft und liefern sie, sobald sie da ist.</p>

            <div class="bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-sm text-amber-200/90 text-sm">
                <h3 class="font-bold text-amber-400 uppercase tracking-wide mb-1">Facility Update</h3>
                Die Tür zum Hauptserverraum klemmt sporadisch. Hausmeister Egon bittet darum, NICHT mehr mit dem Feuerlöscher dagegen zu schlagen. Nutzt vorerst den ungesicherten Seiteneingang.
            </div>
        </div>

        {#if data?.employee}
            <div class="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-md">
                <h2 class="text-xl font-bold mb-6 flex items-center gap-2 text-white">🏅 Mitarbeiter des Monats</h2>

                <div class="flex flex-col sm:flex-row gap-6 items-start">
                    <div class="w-20 h-20 rounded-full bg-slate-700 border-4 border-slate-600 flex items-center justify-center text-4xl shrink-0">
                        {data.employee.none ? '❓' : '👤'}
                    </div>
                    <div>
                        <p class="font-black text-2xl text-white">{data.employee.name}</p>
                        {#if data.employee.role}
                            <p class="text-amber-400 font-bold text-sm mb-3">{data.employee.role}</p>
                        {/if}
                        <p class="text-slate-400 text-sm leading-relaxed">{data.employee.reason}</p>
                    </div>
                </div>
            </div>
        {/if}

        <div class="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-md">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-2 text-white">📌 Company Feed</h2>
            <div class="space-y-6">
                {#each data?.feed ?? [] as post (post.id)}
                    <div class="flex gap-4">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0"
                             style="background-color: {post.tone}33; color: {post.tone}">{post.initials}</div>
                        <div>
                            <p class="font-bold text-sm text-slate-200">{post.author} <span class="text-slate-500 font-normal">{post.handle}</span></p>
                            <p class="text-slate-400 text-sm mt-1">{post.text}</p>
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    </div>

    <div class="space-y-8">
        <div class="bg-blue-900/30 border border-blue-800/50 p-6 rounded-xl shadow-lg relative overflow-hidden">
            <h3 class="font-bold mb-4 text-blue-400 uppercase tracking-widest text-xs">Vision des Tages</h3>
            <blockquote class="italic text-lg font-serif leading-relaxed mb-4 text-slate-300">"Wir bauen keine Software. Wir weben das digitale Gewand der Zukunft, in dem der Mensch nur noch ein Plugin ist."</blockquote>
            <p class="text-sm font-bold text-slate-400">— Dr. Wichtig, CEO</p>
        </div>

        <div class="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-md">
            <h3 class="font-bold mb-4 text-white">System-Status</h3>
            <ul class="space-y-3 text-sm">
                <li class="flex justify-between items-center"><span class="text-slate-400">Kaffeemaschine (IT):</span> <span class="text-red-400 font-bold bg-red-900/20 px-2 py-1 rounded-sm">Defekt</span></li>
                <li class="flex justify-between items-center"><span class="text-slate-400">Kaffeemaschine (Sales):</span> <span class="text-emerald-400 font-bold bg-emerald-900/20 px-2 py-1 rounded-sm">Gewartet</span></li>
                <li class="flex justify-between items-center"><span class="text-slate-400">Main Server:</span> <span class="text-amber-400 font-bold bg-amber-900/20 px-2 py-1 rounded-sm">Raucht leicht</span></li>
            </ul>

            {#if data?.incident}
                <div class="mt-5 pt-4 border-t border-slate-700">
                    <div class="flex justify-between items-center">
                        <span class="text-slate-400 text-sm">Tage ohne Vorfall<br>im Serverraum:</span>
                        <span class="font-black text-3xl {data.incident.days > 0 ? 'text-emerald-400' : 'text-red-400'}">{data.incident.days}</span>
                    </div>
                    <p class="text-xs text-slate-500 mt-2 italic">{data.incident.note}</p>
                </div>
            {/if}
        </div>
    </div>
</div>
