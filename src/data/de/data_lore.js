/**
 * The GlobalCorp chronicle.
 *
 * Two things that used to live in two other places. The five printed chapters
 * were component data in LoreView.svelte; the lines Müller can add at the back
 * were built as sentences inside engine_core.composeChronicleLine(). Both are
 * prose, and prose belongs here.
 *
 * --- WHY THE LINES HAVE IDS ---
 *
 * What the archive stores is the id and the numbers that went into it, not the
 * finished sentence. Until 6.0 it stored the rendered German text, which meant
 * a save carried a language with it: switch to English and the chronicle would
 * read half in one, half in the other. Entries written before 6.0 are dropped
 * on load for exactly that reason - see engine_core.chronicleEntries().
 *
 * Placeholders: {rage}, {fired}, {survived}, {streak}. The engine fills in the
 * ones a line asks for; lint-data.mjs checks that it asks for nothing else.
 */
export const lore = {

    /* The printed book. Five chapters, each two paragraphs, all with inline
       markup - LoreView renders them through {@html}. */
    chapters: [
        {
            year: "1899",
            title: "Der Baron und die Dampf-Bürokratie",
            paragraphs: [
                "Baron Wilhelm von Gier gründete GlobalCorp ursprünglich im Sauerland als <strong>\\\"Kaiserliche Manufaktur für Formulare & Selbstzweck\\\"</strong>. Seine Vision war revolutionär: Er wollte Probleme verkaufen, für die nur er die Lösung hatte.",
                "Sein erstes Patent war der <em>\\\"Endlos-Stempelautomat\\\"</em>, eine dampfbetriebene Maschine, die Anträge gleichzeitig genehmigte, ablehnte und schredderte. Das erzeugte maximalen Umsatz bei minimalem Ergebnis. Ein Geschäftsmodell war geboren."
            ]
        },
        {
            year: "1955",
            title: "Das Beton-Zeitalter",
            paragraphs: [
                "Im Wirtschaftswunder erkannte GlobalCorp, dass glückliche Mitarbeiter unproduktiv sind (weil sie zu viel reden). Die Lösung war die Erfindung des <strong>Grautons \\\"RAL 7035\\\"</strong>.",
                "Das Management führte das revolutionäre Konzept des \\\"Open Space Warzones\\\" ein: Großraumbüros ohne Schallschutz, in denen das Tippen des Nachbarn den eigenen Willen bricht. Zudem wurde Kaffee als offizielles Grundnahrungsmittel eingeführt – nicht um wach zu bleiben, sondern um das Zittern der Hände als \\\"dynamische Energie\\\" zu verkaufen."
            ]
        },
        {
            year: "1982",
            title: "Die Fax-Revolution",
            paragraphs: [
                "GlobalCorp vernetzte die Welt. Zumindest alle Teile der Welt, die ein piepsendes Modem besaßen. Das Management führte die \\\"Krawatten-Pflicht\\\" auch für Telefonate ein, da man glaubte, man könne \\\"Kompetenz durch die Leitung hören\\\".",
                "In dieser Zeit entstand auch die legendäre Abteilung \\\"Human Resources\\\". Der Name war Programm: Menschen wurden endlich wie Ressourcen behandelt – abbaubar, verbrauchbar und leicht zu ersetzen."
            ]
        },
        {
            year: "1999",
            title: "Das Internet-Missverständnis",
            paragraphs: [
                "Dr. Wichtig Sr. kaufte für 500 Millionen Mark \\\"das Internet\\\". Er erhielt eine AOL-CD-ROM und ein 56k-Modem. Um das Gesicht zu wahren, wurde die \\\"Cloud\\\" erfunden.",
                "<strong>Fakt ist:</strong> Unsere Cloud ist kein Netzwerk. Es ist ein stillgelegter Salzstollen in Bottrop, in dem \\\"Der Archivar\\\" (ein Mitarbeiter, der seit 1974 das Tageslicht nicht gesehen hat) wichtige E-Mails auf Mikrofilm abfotografiert. Das erklärt die Ladezeiten beim Login."
            ]
        },
        {
            year: "2024",
            title: "Synergie & KI-Wahnsinn",
            paragraphs: [
                "Heute sind wir \\\"Agil\\\". Das bedeutet: Wir rennen im Kreis, schreien \\\"Sprint!\\\" und hoffen, dass niemand merkt, dass wir kein Ziel haben.",
                "Unsere neue KI <strong>\\\"H.A.L.G.E.R.D.\\\"</strong> überwacht nun jeden Mausklick. Sie berechnet in Echtzeit, ob Ihre Pinkelpause \\\"geschäftsrelevant\\\" war. Sollte Ihre Produktivität unter 120% fallen, wird Ihr Bürostuhl automatisch unbequemer eingestellt. Willkommen in der Zukunft."
            ]
        }
    ],

    /* Müller's own additions. Which of them can be drawn is decided by
       engine_core.composeChronicleLine(); the words are here. */
    lines: {
        first_found: "Ich habe dieses Buch im Serverraum gefunden, hinter einem Rack, unter einer Staubschicht von zwei Jahrzehnten. Der letzte Eintrag ist von 2012. Ich weiß nicht, ob mir jemand die Erlaubnis erteilt hat, hier etwas zu ergänzen. Ich weiß auch nicht, wen ich fragen sollte.",
        first_entry: "Erster Eintrag. Ich bin seit Kurzem für die IT zuständig. Es gibt keine Übergabe, keine Dokumentation und niemanden, der mir sagen könnte, warum in Rack 5 ein Server läuft, den keiner bestellt hat. Ich fange trotzdem an.",
        rage_many_a: "Zur Vollständigkeit: Ich habe an {rage} Tagen dieses Gebäude verlassen, ohne mich zu verabschieden. Die Chronik führt keine Rubrik dafür. Ich lege hiermit eine an.",
        rage_many_b: "Nachtrag zur Firmengeschichte: Es gibt einen Punkt, an dem ein Mensch aufhört, Tickets zu lesen. Er liegt näher, als die Geschäftsleitung vermutet. Ich habe ihn mehrfach vermessen.",
        rage_once: "Ich sollte erwähnen, dass ich einmal gegangen bin, bevor der Tag zu Ende war. Es steht in keiner Akte. Es steht jetzt hier.",
        fired_repeat: "Man hat mich {fired} Mal aus diesem Haus begleitet. Ich bin {fired} Mal wiedergekommen. Über eine der beiden Seiten sagt das mehr aus als über die andere.",
        survived_many_a: "{survived} überstandene Arbeitstage. In der Chronik steht viel über Visionen, Meilensteine und Wachstum. Über das Durchhalten steht nichts. Es ist die einzige Fähigkeit, die hier tatsächlich gebraucht wird.",
        survived_many_b: "Ich habe in diesem Haus mehr Arbeitstage überlebt als der Betriebsrat Sitzungen hatte. Beides hat ungefähr gleich viel verändert.",
        survived_mid: "Zwischenstand: {survived} Tage. Das Gebäude hat aufgehört, mich zu überraschen, und das ist die beunruhigendste Entwicklung bisher.",
        streak_best: "Persönliche Bestmarke: {streak} Tage in Folge ohne Zwischenfall. Meine Familie hält mich inzwischen für berufstätig.",
        chef_high: "Der CEO grüßt mich seit Neuestem mit Namen. Ich bin unsicher, ob das eine Auszeichnung ist oder der Beginn von etwas, das ich nicht überblicke.",
        chef_low: "Zur Sachlage: Die Geschäftsleitung und ich haben ein professionelles Verhältnis. Das heißt, wir schweigen uns in unterschiedlichen Stockwerken an.",
        kevin: "Der Azubi hat heute etwas repariert, ohne zu fragen, und es war richtig. Sollte diese Chronik je jemand weiterführen: Er wird es sein.",
        egon: "Der Hausmeister kennt jeden Raum dieses Hauses, auch die, die im Grundriss fehlen. Er steht in keiner Chronik. Er sollte am Anfang stehen.",
        elster: "Die Buchhaltung hat mir heute Kuchen gebracht. Ich vermerke das hier, weil es sonst niemand glauben wird.",
        phoenix: "Anmerkung für spätere Leser: Es gibt in diesem Haus einen Raum, der seit Jahren gebucht und nie belegt ist, und einen Benutzerzugang, der einem Mann gehört, der 2016 gegangen ist. Ich habe aufgehört, danach zu fragen.",
        doku: "Ich habe angefangen zu dokumentieren. Nach zwei Stunden war klar: Die Dokumentation wäre umfangreicher als die Anlage, die sie beschreibt. Ich habe trotzdem weitergemacht.",
        plain_a: "Es ist wieder ein Tag vergangen. Die Anlage läuft, die Tickets sind offen, das Haus steht. Mehr wird von dieser Chronik auch in den letzten hundert Jahren nicht berichtet worden sein.",
        plain_b: "Nichts Bemerkenswertes. Ich schreibe es trotzdem auf, damit später jemand weiß, dass hier jemand war."
    }
};
