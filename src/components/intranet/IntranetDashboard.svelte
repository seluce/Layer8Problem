<!--
  Startseite des Intranets, vormals public/assets/intranet/index.html.

  Migrated unchanged. The reactive parts - employee of the month, a company
  feed that answers to today's story flags, the "days without incident"
  counter - come in the next step and go into src/data/data_intranet.js.
-->

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

        <div class="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-md">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-2 text-white">📌 Company Feed</h2>
            <div class="space-y-6">
                <div class="flex gap-4">
                    <div class="w-10 h-10 rounded-full bg-pink-900/50 flex items-center justify-center text-pink-400 font-bold shrink-0">CH</div>
                    <div>
                        <p class="font-bold text-sm text-slate-200">Chantal <span class="text-slate-500 font-normal">@HR_FeelGood</span></p>
                        <p class="text-slate-400 text-sm mt-1">Wer hat meine 'Good Vibes Only' Tasse aus der Spülmaschine genommen, ohne sie auszuräumen? Die Vibes sind jetzt im Minusbereich!! 😭🧘‍♀️</p>
                    </div>
                </div>
                <div class="flex gap-4">
                    <div class="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold shrink-0">EG</div>
                    <div>
                        <p class="font-bold text-sm text-slate-200">Egon <span class="text-slate-500 font-normal">@Facility</span></p>
                        <p class="text-slate-400 text-sm mt-1">Das Wasser in der Teeküche im 2. Stock ist abgestellt. Grund: Jemand hat Kaffeepulver direkt ins Waschbecken geschüttet.</p>
                    </div>
                </div>
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
        </div>
    </div>
</div>
