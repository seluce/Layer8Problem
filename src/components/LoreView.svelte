<!--
  The GlobalCorp chronicle, found as an item in the server room.

  Pure flavour text, so the five entries live as data rather than markup — the
  layout repeats for each of them, and adding a decade should not mean copying
  a block of HTML.

  The paragraphs contain <strong> and <em>, which is why they go through
  {@html}. They are authored here, never player input.
-->
<script>
    import { state } from '../engine/engine_state.svelte.js';
    import { engine } from '../engine.js';

    const CHRONICLE = [
    {
        year: '1899',
        title: "Der Baron und die Dampf-Bürokratie",
        paragraphs: [
            "Baron Wilhelm von Gier gründete GlobalCorp ursprünglich im Sauerland als <strong>\"Kaiserliche Manufaktur für Formulare & Selbstzweck\"</strong>. Seine Vision war revolutionär: Er wollte Probleme verkaufen, für die nur er die Lösung hatte.",
            "Sein erstes Patent war der <em>\"Endlos-Stempelautomat\"</em>, eine dampfbetriebene Maschine, die Anträge gleichzeitig genehmigte, ablehnte und schredderte. Das erzeugte maximalen Umsatz bei minimalem Ergebnis. Ein Geschäftsmodell war geboren."
        ]
    },
    {
        year: '1955',
        title: "Das Beton-Zeitalter",
        paragraphs: [
            "Im Wirtschaftswunder erkannte GlobalCorp, dass glückliche Mitarbeiter unproduktiv sind (weil sie zu viel reden). Die Lösung war die Erfindung des <strong>Grautons \"RAL 7035\"</strong>.",
            "Das Management führte das revolutionäre Konzept des \"Open Space Warzones\" ein: Großraumbüros ohne Schallschutz, in denen das Tippen des Nachbarn den eigenen Willen bricht. Zudem wurde Kaffee als offizielles Grundnahrungsmittel eingeführt – nicht um wach zu bleiben, sondern um das Zittern der Hände als \"dynamische Energie\" zu verkaufen."
        ]
    },
    {
        year: '1982',
        title: "Die Fax-Revolution",
        paragraphs: [
            "GlobalCorp vernetzte die Welt. Zumindest alle Teile der Welt, die ein piepsendes Modem besaßen. Das Management führte die \"Krawatten-Pflicht\" auch für Telefonate ein, da man glaubte, man könne \"Kompetenz durch die Leitung hören\".",
            "In dieser Zeit entstand auch die legendäre Abteilung \"Human Resources\". Der Name war Programm: Menschen wurden endlich wie Ressourcen behandelt – abbaubar, verbrauchbar und leicht zu ersetzen."
        ]
    },
    {
        year: '1999',
        title: "Das Internet-Missverständnis",
        paragraphs: [
            "Dr. Wichtig Sr. kaufte für 500 Millionen Mark \"das Internet\". Er erhielt eine AOL-CD-ROM und ein 56k-Modem. Um das Gesicht zu wahren, wurde die \"Cloud\" erfunden.",
            "<strong>Fakt ist:</strong> Unsere Cloud ist kein Netzwerk. Es ist ein stillgelegter Salzstollen in Bottrop, in dem \"Der Archivar\" (ein Mitarbeiter, der seit 1974 das Tageslicht nicht gesehen hat) wichtige E-Mails auf Mikrofilm abfotografiert. Das erklärt die Ladezeiten beim Login."
        ]
    },
    {
        year: '2024',
        title: "Synergie & KI-Wahnsinn",
        paragraphs: [
            "Heute sind wir \"Agil\". Das bedeutet: Wir rennen im Kreis, schreien \"Sprint!\" und hoffen, dass niemand merkt, dass wir kein Ziel haben.",
            "Unsere neue KI <strong>\"H.A.L.G.E.R.D.\"</strong> überwacht nun jeden Mausklick. Sie berechnet in Echtzeit, ob Ihre Pinkelpause \"geschäftsrelevant\" war. Sollte Ihre Produktivität unter 120% fallen, wird Ihr Bürostuhl automatisch unbequemer eingestellt. Willkommen in der Zukunft."
        ]
    },
    ];
</script>

{#if state.loreOpen}
    <div class="fixed inset-0 bg-black/90 z-9999 flex items-center justify-center p-4 fade-in">
        <div class="bg-[#fdf6e3] rounded-lg max-w-3xl w-full max-h-[85vh] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] border-8 border-[#5d4037] relative text-[#3e2723] font-serif">

            <div class="bg-[#3e2723] p-6 text-center border-b-4 border-[#8d6e63] relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-wood"></div>
                <h2 class="text-3xl font-bold text-[#d7ccc8] uppercase tracking-[0.2em] mb-1 relative z-10">GlobalCorp Chronik</h2>
                <span class="text-sm text-[#a1887f] italic font-serif relative z-10">"Tradition seit 1899. Wir verwalten das Chaos."</span>
            </div>

            <div class="overflow-y-auto p-10 space-y-12 text-lg leading-relaxed bg-cream-paper">

                <div class="text-center border-b-2 border-[#d7ccc8] pb-6">
                    <p class="italic text-xl">
                        "WARNUNG: Das Lesen dieser Chronik während der Arbeitszeit gilt als 'stiller Diebstahl' und wird automatisch vom Gehalt abgezogen. Lächeln Sie beim Lesen nicht. Freude ist nicht im Budget vorgesehen."
                    </p>
                </div>

                {#each CHRONICLE as entry (entry.year)}
                    <div class="relative pl-8 border-l-4 border-[#8d6e63]">
                        <div class="absolute left-[-2.3rem] top-0 bg-[#8d6e63] text-[#fdf6e3] w-14 h-14 flex items-center justify-center rounded-full font-bold text-xl shadow-lg">{entry.year}</div>
                        <h3 class="font-bold text-2xl mb-2 text-[#5d4037]">{entry.title}</h3>
                        {#each entry.paragraphs as text, i}
                            <p class={i === 0 ? 'mb-4' : ''}>{@html text}</p>
                        {/each}
                    </div>
                {/each}

                <div class="bg-[#efebe9] p-6 rounded-sm border border-[#d7ccc8] italic text-center mt-12 shadow-inner">
                    "Wir sind nicht hier, um die Welt zu verbessern. Wir sind hier, damit die Quartalszahlen stimmen. Gehen Sie jetzt wieder an die Arbeit."
                    <br>
                    <span class="font-bold not-italic text-sm mt-3 block uppercase tracking-widest text-[#5d4037]">- Dr. Wichtig, CEO</span>
                </div>

            </div>

            <div class="p-6 bg-[#d7ccc8] border-t-4 border-[#8d6e63] flex justify-center">
                <button onclick={() => engine.closeLoreModal()}
                        class="bg-[#5d4037] hover:bg-[#3e2723] text-[#fdf6e3] px-10 py-3 rounded-sm shadow-lg font-bold uppercase tracking-wider transition-transform hover:scale-105 border-2 border-[#8d6e63]">
                    Buch schließen (und vergessen)
                </button>
            </div>

        </div>
    </div>
{/if}
