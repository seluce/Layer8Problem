<!--
  Impressum & AGB, vormals public/assets/intranet/impressum.html.

  Two things react here, and one of them deliberately does not grow: the
  version number climbs with every workday started, while the extra clauses
  replace one another at fixed thresholds instead of stacking. A legal page
  that gets longer every day would be unreadable within a week - and the
  better joke is a document that is amended constantly without anyone ever
  learning what changed.
-->
<script>
    import { state as game } from '../../engine/engine_state.svelte.js';

    const legal = $derived(game.intranetData?.impressum ?? null);
</script>

<div class="max-w-4xl mx-auto mt-12 px-4 pb-12">
    <div class="bg-slate-800 p-8 md:p-12 rounded-2xl shadow-md border border-slate-700">
        <div class="flex items-center gap-3 mb-8 border-b border-slate-700 pb-6">
            <span class="text-4xl">⚖️</span>
            <div>
                <h1 class="text-3xl font-black text-white tracking-tight">Impressum &amp; AGB</h1>
                <p class="text-slate-400 font-medium mt-1">Die Rechtsabteilung rät vom Lesen dieser Seite ab.</p>
            </div>
        </div>

        <div class="space-y-8 text-slate-300 leading-relaxed text-sm md:text-base">

            <div>
                <h2 class="text-lg font-bold text-slate-100 uppercase tracking-widest mb-2">§1 Anbieterkennzeichnung</h2>
                <p class="bg-slate-900/50 p-4 rounded-sm border border-slate-700 font-mono text-xs text-slate-400">
                    GlobalCorp International Synergy GmbH &amp; Co. KGaA<br>
                    (Operatives Geschäft: Gebäude 3, Kellergeschoss)<br>
                    Steueroase 42<br>
                    Cayman Islands<br><br>
                    Vertreten durch: Dr. Wichtig (CEO &amp; Chief Visionary Dictator)<br>
                    Kontakt: Wenn es wichtig ist, rufen wir Sie an. Nicht umgekehrt.
                </p>
            </div>

            <div>
                <h2 class="text-lg font-bold text-red-400 uppercase tracking-widest mb-2 border-l-4 border-red-500 pl-3">§2 Haftungsausschluss (Körper &amp; Geist)</h2>
                <ul class="list-disc pl-5 space-y-2">
                    <li>GlobalCorp haftet unter keinen Umständen für den Verlust der geistigen Gesundheit, der durch die Benutzung unseres Intranets, das Lesen von E-Mails des Vertriebs oder den Genuss des Kantinenessens entsteht.</li>
                    <li>Spontane Selbstentzündung von Hardware, die nach 1998 hergestellt wurde, gilt als "Höhere Gewalt" und ist vom Mitarbeiter privat zu erstatten.</li>
                    <li>Das Einatmen von Tonerstaub gilt als geldwerter Vorteil ("Kostenloses Büro-Make-up") und muss bei der Steuererklärung angegeben werden.</li>
                    <li>Sollte ein Mitarbeiter durch eine Überdosis des Firmenkaffees die Fähigkeit erlangen, Farben zu hören oder durch die Zeit zu reisen, fallen die dabei gewonnenen Erkenntnisse an das Unternehmen.</li>
                </ul>
            </div>

            <div>
                <h2 class="text-lg font-bold text-blue-400 uppercase tracking-widest mb-2 border-l-4 border-blue-500 pl-3">§3 Datenschutz &amp; Überwachung</h2>
                <p class="mb-2">Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Deshalb bewahren wir sie sicher auf unseren internen Servern auf. Für zusätzliche Redundanz werden diese Daten extern gesichert – hierfür hat uns ein freundlicher Werbepartner großzügigerweise Serverkapazitäten zur Verfügung gestellt.</p>
                <p>Durch das Betreten des Firmengebäudes stimmen Sie automatisch zu, dass:</p>
                <ul class="list-disc pl-5 space-y-2 mt-2">
                    <li>Ihre Tastaturanschläge analysiert werden, um Ihre Motivation zu berechnen (weniger als 8 Tastenanschläge pro Sekunde gelten als Arbeitsverweigerung).</li>
                    <li>Ihr Stuhlkissen biometrische Daten erfasst, um Toilettengänge vorherzusagen und von der Pause abzuziehen.</li>
                    <li>Ihre DNA Eigentum der GlobalCorp wird, sobald Sie einen Briefumschlag der Firmenpost anlecken.</li>
                </ul>
            </div>

            <div>
                <h2 class="text-lg font-bold text-amber-400 uppercase tracking-widest mb-2 border-l-4 border-amber-500 pl-3">§4 IT-Ressourcen &amp; Verschleißgebühr</h2>
                <p>Die am Arbeitsplatz bereitgestellte Hardware ist exklusives Firmeneigentum. Mausklicks und Tastaturanschläge betrachten wir als endliche Ressourcen. Exzessives Scrollen, unnötiges Doppelklicken oder das rein private Aktualisieren von Webseiten führt zu vorzeitigem Hardware-Verschleiß. Ab dem 10.000. Mausklick pro Kalendermonat behält sich GlobalCorp vor, eine Abnutzungsgebühr von 0,02 € pro Klick direkt vom Nettogehalt einzubehalten.</p>
            </div>

            {#if legal?.clause}
                <div>
                    <h2 class="text-lg font-bold text-purple-400 uppercase tracking-widest mb-2 border-l-4 border-purple-500 pl-3">{legal.clause.title}</h2>
                    <p>{legal.clause.text}</p>
                </div>
            {/if}

            <div class="bg-slate-900 p-5 rounded-lg border border-slate-700 italic text-slate-500 text-xs">
                <p><strong class="text-slate-300">§5 Salvatorische Klausel:</strong> Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein, wird die Geschäftsführung Sie solange anschreien, bis Sie zustimmen, dass sie doch wirksam sind. Gerichtsstand ist das Büro von Dr. Wichtig.</p>
            </div>

            {#if legal}
                <p class="text-xs text-slate-600 text-center pt-4">
                    Fassung {legal.version}. Zuletzt geändert heute. {legal.note}
                </p>
            {/if}

        </div>
    </div>
</div>
