<!--
  Der Speiseplan, vormals public/assets/intranet/kantine.html.

  The five working days are data now, the Saturday row stays as markup - it
  carries its own colours and a second line under the day name, and folding
  that into the loop would cost more than it saves.

  The plan hangs on the wall for the whole week, so it does not change with
  the clock. What comes next: the current weekday is highlighted, an issue
  line above the table knows the time of day, and a dish the player has
  already suffered through carries a note.
-->
<script>
    const MENU = [
        {
            day: 'Montag',
            classic: { name: 'Spaghetti Bolognese', note: 'Die Nudeln sind weich. Die Soße ist reichlich.' },
            veggie:  { name: 'Linseneintopf', note: 'Deftig, aber sehr salzarm. Dazu ein hartes Brötchen.' }
        },
        {
            day: 'Dienstag',
            classic: { name: 'Currywurst mit Pommes', note: 'Der Klassiker. Die Pommes sind leider nicht mehr knusprig.' },
            veggie:  { name: 'Gedünsteter Brokkoli mit Reis', note: 'Ohne Soße. Sehr gesund. Sehr trocken.' }
        },
        {
            day: 'Mittwoch',
            classic: { name: 'Hähnchenbrust "Hawaii"', note: 'Mit Ananas und Analogkäse überbacken.' },
            veggie:  { name: 'Große Salat-Bowl', note: 'Viel Eisbergsalat, drei Maiskörner. Essig/Öl-Dressing (ausverkauft).' }
        },
        {
            day: 'Donnerstag',
            classic: { name: 'Schnitzel "Wiener Art"', note: 'Die Panade löst sich leicht. Kartoffelsalat aus dem Eimer.' },
            veggie:  { name: 'Kartoffelsuppe', note: 'Wässrig, aber wärmt von innen.' }
        },
        {
            day: 'Freitag',
            classic: { name: 'Fischstäbchen (4 Stück)', note: 'Dazu Kartoffelpüree (Pulverbasis) und etwas Spinat.' },
            veggie:  { name: 'Gemüse-Wraps', note: 'Kalt serviert. Viel Frischkäse.' }
        }
    ];
</script>

<div class="max-w-5xl mx-auto mt-8 px-4 pb-12">
    <h1 class="text-3xl font-black mb-8 text-white">Cafeteria: "The Agile Kitchen" 🥗</h1>

    <div class="md:bg-slate-800 md:rounded-xl md:shadow-md md:border md:border-slate-700 md:overflow-hidden flex flex-col gap-4 md:gap-0 md:block">

        <div class="hidden md:grid md:grid-cols-5 bg-slate-950 text-emerald-500 uppercase text-xs tracking-wider border-b border-slate-700/50">
            <div class="p-4 font-bold col-span-1">Wochentag</div>
            <div class="p-4 font-bold col-span-2">Menü 1 (Classic)</div>
            <div class="p-4 font-bold col-span-2">Menü 2 (Vegetarisch)</div>
        </div>

        {#each MENU as row, i (row.day)}
            <div class="flex flex-col md:grid md:grid-cols-5 bg-slate-800 {i % 2 === 0 ? 'md:bg-transparent' : 'md:bg-slate-800/30'} rounded-xl md:rounded-none border border-slate-700 md:border-none md:border-b md:border-slate-700/50 hover:bg-slate-700/30 p-4 md:p-0 gap-3 md:gap-0 shadow-xs md:shadow-none">
                <div class="md:col-span-1 md:p-4 font-bold text-slate-300 text-lg md:text-base border-b border-slate-700/50 md:border-none pb-2 md:pb-0 flex items-center">{row.day}</div>
                <div class="md:col-span-2 md:p-4">
                    <div class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1 md:hidden">Menü 1 (Classic)</div>
                    <strong>{row.classic.name}</strong><br>
                    <span class="text-sm text-slate-500">{row.classic.note}</span>
                </div>
                <div class="md:col-span-2 md:p-4">
                    <div class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1 md:hidden">Menü 2 (Vegetarisch)</div>
                    <strong>{row.veggie.name}</strong><br>
                    <span class="text-sm text-slate-500">{row.veggie.note}</span>
                </div>
            </div>
        {/each}

        <div class="flex flex-col md:grid md:grid-cols-5 bg-emerald-900/20 md:bg-emerald-900/10 rounded-xl md:rounded-none border border-emerald-800/50 md:border-none hover:bg-emerald-900/30 p-4 md:p-0 gap-3 md:gap-0 shadow-xs md:shadow-none">
            <div class="md:col-span-1 md:p-4 font-bold text-emerald-400 text-lg md:text-base border-b border-emerald-800/50 md:border-none pb-2 md:pb-0 flex flex-col md:justify-center">
                <span>Samstag</span>
                <span class="text-[10px] md:text-xs font-normal text-emerald-500 md:text-emerald-600 uppercase tracking-wider mt-0.5">Agiles Wochenende</span>
            </div>
            <div class="md:col-span-2 md:p-4">
                <div class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1 md:hidden">Menü 1 (Classic)</div>
                <strong class="text-emerald-300 md:text-white">Lauwarmer Filterkaffee</strong><br>
                <span class="text-sm text-emerald-600/80 md:text-slate-500">Steht seit Freitag 15 Uhr auf der Heizplatte.</span>
            </div>
            <div class="md:col-span-2 md:p-4">
                <div class="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1 md:hidden">Menü 2 (Vegetarisch)</div>
                <strong class="text-emerald-300 md:text-white">Trockener Marmorkuchen</strong><br>
                <span class="text-sm text-emerald-600/80 md:text-slate-500">Reste vom Meeting der Geschäftsführung.</span>
            </div>
        </div>

    </div>

    <div class="mt-8 bg-slate-800 border border-red-900/50 p-6 rounded-xl border-l-4 border-l-red-500 shadow-md">
        <h3 class="font-bold mb-2 text-white">⚠️ HYGIENE-HINWEIS VON EGON</h3>
        <p class="text-sm text-slate-400">Die Mikrowelle im Ostflügel bleibt bis auf Weiteres gesperrt. Jemand hat versucht, tiefgefrorenen Fisch auf Stufe "Auftauen" für 45 Minuten zu garen. Der Geruch hat sich in der Wandfarbe festgesetzt.</p>
    </div>
</div>
