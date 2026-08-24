/**
 * What the intranet knows about you.
 *
 * The company pages used to say the same thing forever. As data they can react
 * to the save: to reputation, to the story flags of today, and to the counters
 * in the archive.
 *
 * The rule that makes this readable: the intranet is the OFFICIAL voice. The
 * bulletin board comments on the same events privately and honestly - a note
 * from a colleague who was there. The intranet reports the same event the way
 * a company reports it: as a process, a success, or something that was never
 * a problem to begin with. Where both react to one flag, they must not say
 * the same thing twice.
 *
 * Colours are plain hex values, never Tailwind class names. Class names built
 * in data files depend on the scanner finding them, which fails silently for
 * new files - the avatar then has no colour at all. Badge styling goes through
 * a `tone` key that the component maps to whole class names.
 *
 * reqStory works exactly as on the board: the entry only appears once the
 * player has actually tripped that flag. tools/lint-data.mjs verifies that
 * every flag named here can be set somewhere.
 */
export const intranet = {

    /* ================================================================
       MITARBEITER DES MONATS
       Chosen by reputation in engine_ui.buildIntranet(): whoever stands
       highest, provided they clear the "FREUNDLICH" threshold of 20 that
       the team view uses. Below that the award is not given - and if the
       whole house is on your side, the jury runs out of alternatives.
       ================================================================ */
    employee: {
        "Kevin": {
            role: "IT — Auszubildender, 3. Lehrjahr",
            reason: "Für das eigenständige Verbringen eines brennenden Papierkorbs ins Freie. Die Jury würdigt ausdrücklich die Ruhe, mit der er dabei an vier Feuerlöschern vorbeigegangen ist."
        },
        "Chantal": {
            role: "Marketing & Feel-Good-Management",
            reason: "Für die Einführung des Begriffs 'Intensive Wachstumschance'. Die Zahl der gemeldeten Stressfälle ist seitdem auf null gesunken."
        },
        "Egon": {
            role: "Facility Management",
            reason: "Für einundvierzig Dienstjahre ohne eine einzige Beschwerde. Die Jury weist darauf hin, dass Herr Egon auch keine Beschwerde entgegennimmt."
        },
        "Dr. Wichtig": {
            role: "Chief Executive Officer",
            reason: "Für visionäre Führung in einem herausfordernden Marktumfeld. Die Auszeichnung wurde von der Geschäftsleitung einstimmig beschlossen. Die Geschäftsleitung besteht aus Dr. Wichtig."
        },
        "Gabi": {
            role: "Empfang & Telefonzentrale",
            reason: "Für die Weiterleitung von 1.400 Anrufen in einem Monat, davon 1.390 an die IT. Die Jury lobt die konsequente Zuständigkeitsklärung."
        },
        "Frau Elster": {
            role: "Buchhaltung",
            reason: "Für die lückenlose Aufklärung eines Belegvorgangs über 3,49 Euro. Der Aufwand betrug elf Arbeitsstunden. Die Jury würdigt die Haltung, nicht die Bilanz."
        },
        "Markus": {
            role: "Senior VP of Synergies",
            reason: "Für den Abschluss eines Vertrags über ein Produkt, das sich derzeit noch in der Konzeptionsphase befindet. Rollout: sobald technisch möglich."
        }
    },

    // Everyone likes you. The jury has nobody left to choose.
    employeeSelf: {
        name: "Müller",
        role: "Systemadministration",
        reason: "Die Jury hat in diesem Monat in allen Abteilungen nachgefragt und überall dieselbe Antwort erhalten. Ein Foto liegt nicht vor; der Ausgezeichnete war zum Fototermin im Serverraum. Er war auch zum Ersatztermin im Serverraum."
    },

    // Nobody clears the bar.
    employeeNone: {
        title: "Nicht vergeben",
        reason: "Die Auszeichnung wird in diesem Monat ausgesetzt. Die Jury verweist auf laufende Verfahren und dankt allen Mitarbeitenden für ihr Verständnis."
    },

    /* ================================================================
       COMPANY FEED
       Entries with reqStory only appear once the player has caused them
       and go first; the rest fill up to four. The tone is the point:
       every one of these events also reaches the bulletin board, where
       it is told truthfully.
       ================================================================ */
    feed: [

        // ---------- Always available ----------
        {
            id: "feed_gala", author: "Personalabteilung", handle: "@HR_Compliance",
            initials: "HR", tone: "#f9a8d4",
            text: "Zur wiederholten Nachfrage bezüglich der Synergy-Gala: Einladungen ergehen an Mitarbeitende, die sich abteilungsübergreifend bewährt haben. Die Prüfung erfolgt laufend. Von Einzelanfragen bitten wir abzusehen."
        },
        {
            id: "feed_tasse", author: "Chantal", handle: "@HR_FeelGood",
            initials: "CH", tone: "#f472b6",
            text: "Wer hat meine 'Good Vibes Only' Tasse aus der Spülmaschine genommen, ohne sie auszuräumen? Die Vibes sind jetzt im Minusbereich!! 😭🧘‍♀️"
        },
        {
            id: "feed_wasser", author: "Egon", handle: "@Facility",
            initials: "EG", tone: "#94a3b8",
            text: "Das Wasser in der Teeküche im 2. Stock ist abgestellt. Grund: Jemand hat Kaffeepulver direkt ins Waschbecken geschüttet."
        },
        {
            id: "feed_kuehlschrank", author: "Frau Elster", handle: "@Buchhaltung",
            initials: "FE", tone: "#a78bfa",
            text: "Der Kühlschrank in der Teeküche wird Freitag um 16 Uhr geleert. Alles ohne Namen wird entsorgt. Alles mit Namen wird zur Kenntnis genommen."
        },
        {
            id: "feed_fundbuero", author: "Gabi", handle: "@Empfang",
            initials: "GA", tone: "#38bdf8",
            text: "Am Empfang liegen seit drei Wochen: zwei Regenschirme, ein Ladekabel und eine Lesebrille. Der Schirm mit den Fröschen sucht weiterhin einen Halter."
        },
        {
            id: "feed_drucker", author: "Markus", handle: "@Sales",
            initials: "MA", tone: "#fbbf24",
            text: "An wen auch immer: Der Drucker im 3. OG steht wieder auf beidseitig. Wir verhandeln hier Verträge und keine Faltblätter."
        },
        {
            id: "feed_backup", author: "Dr. Wichtig", handle: "@CEO",
            initials: "DW", tone: "#34d399",
            text: "Kurzer Gedanke aus der Lounge in Zürich: Wenn wir alle nur zehn Prozent mehr Mut hätten, bräuchten wir halb so viele Backups. Denkt mal drüber nach."
        },
        {
            id: "feed_rack5", author: "Kevin", handle: "@IT_Nachwuchs",
            initials: "KE", tone: "#4ade80",
            text: "Kurze Frage in die Runde: Weiß jemand, wofür der Server in Rack 5 zuständig ist? Ich frage für einen Freund. Der Freund bin ich. Es ist dringend."
        },
        {
            id: "feed_abkuerzung", author: "Egon", handle: "@Facility",
            initials: "EG", tone: "#94a3b8",
            text: "Der Durchgang zum Lager K3 ist kein Weg zur Kantine. Er ist auch keine Abkürzung. Er ist ein Lager."
        },
        {
            id: "feed_obstkorb", author: "Chantal", handle: "@HR_FeelGood",
            initials: "CH", tone: "#f472b6",
            text: "Kleine Erinnerung an unser Obstkorb-Konzept: Wer eine Birne findet, darf sie behalten, muss sie aber wegen des geldwerten Vorteils hier eintragen. Bisherige Einträge: keine. Verschwundene Birnen: elf. 🍐"
        },
        {
            id: "feed_telefon", author: "Gabi", handle: "@Empfang",
            initials: "GA", tone: "#38bdf8",
            text: "Es hat heute erneut jemand die Zentrale angerufen, um zu fragen, ob das Telefon funktioniert. Wir konnten das im Gespräch klären."
        },
        {
            id: "feed_belege", author: "Frau Elster", handle: "@Buchhaltung",
            initials: "FE", tone: "#a78bfa",
            text: "Ich weise erneut darauf hin: Ein Beleg ohne Datum ist kein Beleg. Er ist Papier. Papier wird nicht erstattet."
        },
        {
            id: "feed_adapter", author: "Markus", handle: "@Sales",
            initials: "MA", tone: "#fbbf24",
            text: "SUCHE DRINGEND Adapter HDMI auf irgendwas. Kundentermin in zwanzig Minuten. Bitte direkt an mein Handy, ich lese hier nicht mit."
        },
        {
            id: "feed_aufzug", author: "Dr. Wichtig", handle: "@CEO",
            initials: "DW", tone: "#34d399",
            text: "Ich bin heute Morgen mit dem Aufzug gefahren und habe dabei drei Mitarbeitende gesehen, die nicht gelächelt haben. Ich schreibe das hier ohne Wertung. Ich schreibe es nur auf."
        },
        {
            id: "feed_schild", author: "Facility Management", handle: "@Betriebstechnik",
            initials: "FM", tone: "#fb923c",
            text: "Die Beschriftung 'BITTE NICHT ABSCHALTEN' an den Geräten im Technikraum ist keine Empfehlung. Sie ist eine Beschriftung."
        },
        {
            id: "feed_halgerd", author: "H.A.L.G.E.R.D.", handle: "@Systemüberwachung",
            initials: "HD", tone: "#22d3ee",
            text: "Ihre durchschnittliche Reaktionszeit hat sich im laufenden Quartal um 12% verbessert. Der Zielwert wurde daraufhin um 15% angepasst. Herzlichen Glückwunsch."
        },

        // ---------- Reacts to today ----------
        {
            id: "feed_kalk_essig", reqStory: "path_kalk_essig",
            author: "Facility Management", handle: "@Betriebstechnik",
            initials: "FM", tone: "#fb923c",
            text: "Hinweis zur Kaffeemaschine im 2. OG: Ein Mitarbeiter hat heute eigenverantwortlich ein Reinigungsmittel aus dem Putzschrank eingesetzt. Die Geschäftsleitung dankt für die Eigeninitiative und bittet darum, das Ergebnis nicht zu trinken."
        },
        {
            id: "feed_kalk_ignor", reqStory: "path_kalk_ignor",
            author: "Zentraler Einkauf", handle: "@Beschaffung",
            initials: "ZE", tone: "#60a5fa",
            text: "Gute Nachricht: Der Antrag auf Entkalker wurde in die Beschaffungsrunde 2027 aufgenommen. Bis dahin gilt das Gedrückthalten der Taste als offiziell freigegebene Übergangslösung. Vielen Dank an die IT für die pragmatische Haltung."
        },
        {
            id: "feed_karton", reqStory: "path_karton_kult",
            author: "Facility Management", handle: "@Betriebstechnik",
            initials: "FM", tone: "#fb923c",
            text: "Der Meetingpoint K1 wurde in das Raumbuchungssystem übernommen. Kapazität: drei Stehplätze, keine Steckdose. Der darin verpackte Kopierer bleibt bis zur Klärung der Zuständigkeit Bestandteil des Mobiliars."
        },
        {
            id: "feed_licht", reqStory: "path_licht_hart",
            author: "Chantal", handle: "@HR_FeelGood",
            initials: "CH", tone: "#f472b6",
            text: "Die Achtsamkeits-Ecke im 2. OG wurde heute aus 'infrastrukturellen Gründen' zurückgebaut. Ich möchte niemanden beschuldigen. Ich möchte nur festhalten, dass die Energie dieser Etage seitdem messbar anders ist. 🕯️"
        },
        {
            id: "feed_phoenix", reqStory: "path_phoenix_storno",
            author: "Konzernrevision", handle: "@Compliance",
            initials: "KR", tone: "#f87171",
            text: "Die Serientermin-Buchung des Raums 'Kreativ 2' wurde ohne Freigabe aufgelöst. Wir bitten die verantwortliche Stelle für Projekt Phoenix um Rückmeldung, damit der Vorgang zugeordnet werden kann. Bisherige Rückmeldungen: keine."
        },
        {
            id: "feed_exting", reqStory: "path_exting_lager",
            author: "Brandschutzbeauftragter", handle: "@Sicherheit",
            initials: "BS", tone: "#f87171",
            text: "Die Begehung hat im Bestand eine Abweichung von zwei Feuerlöschern ergeben. Da beide Geräte geprüft und plakettiert sind, wurde die Abweichung als positiv verbucht und der Vorgang geschlossen."
        },
        {
            id: "feed_gemba", reqStory: "path_gemba_show",
            author: "Dr. Wichtig", handle: "@CEO",
            initials: "DW", tone: "#34d399",
            text: "Ich war heute in der IT. Was ich dort gesehen habe, war Weltklasse: Latenz-Anomalien im Ostcluster, in Echtzeit, auf drei Bildschirmen gleichzeitig. Genau diese Kultur meine ich. Ich habe das Ostcluster-Team bereits für den Innovationspreis vorgeschlagen."
        },
        {
            id: "feed_wiki", reqStory: "path_kevin_tutorial",
            author: "Kevin", handle: "@IT_Nachwuchs",
            initials: "KE", tone: "#4ade80",
            text: "Habe heute gemeinsam mit meinem Ausbilder eine Störung im Bereich Anzeigetechnik behoben und den Lösungsweg im neuen IT-Wiki dokumentiert. Artikel 1 von vielen! 💪"
        }
    ],

    /* ================================================================
       VISION DES TAGES
       One quote per visit. The panel is the most prominent thing on the
       start page, and a page that greets you with the same sentence
       forever stops being a place after the second visit.
       ================================================================ */
    visions: [
        "Wir bauen keine Software. Wir weben das digitale Gewand der Zukunft, in dem der Mensch nur noch ein Plugin ist.",
        "Ein Problem ist nur eine Lösung, die noch niemand in Rechnung gestellt hat.",
        "Ich lese keine Berichte. Ich spüre Zahlen.",
        "Wer Pausen braucht, hat sein Warum noch nicht gefunden.",
        "Scheitern ist ein Geschenk. Verpacken Sie es und legen Sie es mir auf den Tisch. Ich verkaufe es weiter.",
        "Unsere Kunden kaufen kein Produkt. Sie kaufen die Erlaubnis, dazuzugehören.",
        "Ich habe keine Strategie. Ich habe eine Richtung, und die ändert sich mit dem Licht.",
        "Feierabend ist ein Gerücht, das sich hartnäckig hält.",
        "Innovation entsteht nicht im Budget. Deshalb kürzen wir es.",
        "Wenn Sie nachts wach liegen und an unsere Quartalsziele denken: Das beruhigt mich sehr.",
        "Unsere Hierarchie ist flach. Meine ist am flachsten, weil ich oben stehe.",
        "Daten sind das neue Öl. Und wie beim Öl fragt niemand, wo genau es herkommt.",
        "Ein Backup ist im Grunde ein Misstrauensvotum gegen die Zukunft.",
        "Ich delegiere Verantwortung, aber keine Befugnis. Alles andere wäre fahrlässig.",
        "Der Kunde hat immer recht. Ab dem Moment, in dem er unterschrieben hat, hat er es besonders.",
        "Work-Life-Balance bedeutet, dass beides am selben Ort stattfindet.",
        "Wir sind kein Unternehmen. Wir sind eine Erzählung mit Umsatzsteuer-Identifikationsnummer.",
        "Man muss die Menschen dort abholen, wo sie stehen. Meistens stehen sie im Weg.",
        "Ich glaube an flache Prozesse, kurze Wege und lange Arbeitstage.",
        "Nachhaltigkeit heißt für uns vor allem: Wir halten das durch."
    ],

    /* ================================================================
       SYSTEM-STATUS
       Three of these per visit. `tone` is a key; whole class names live
       in the component.
       ================================================================ */
    status: [
        { label: "Kaffeemaschine (IT)",      value: "Defekt",            tone: "bad" },
        { label: "Kaffeemaschine (Sales)",   value: "Gewartet",          tone: "good" },
        { label: "Main Server",              value: "Raucht leicht",     tone: "warn" },
        { label: "Drucker (3. OG)",          value: "Ersatzteil ab 2021", tone: "warn" },
        { label: "Datensicherung",           value: "Läuft ungeprüft",   tone: "warn" },
        { label: "Gäste-WLAN",               value: "Passwort: gast",    tone: "bad" },
        { label: "Telefonanlage",            value: "Erreichbar",        tone: "good" },
        { label: "Faxgerät (Empfang)",       value: "Betriebsbereit",    tone: "good" },
        { label: "Klima (Serverraum)",       value: "Fenster offen",     tone: "warn" },
        { label: "Ticketsystem",             value: "Verfügbar",         tone: "good" },
        { label: "Zeiterfassung",            value: "Immer verfügbar",   tone: "good" },
        { label: "Intranet-Suche",           value: "Deaktiviert",       tone: "bad" },
        { label: "Notstromversorgung",       value: "Ungetestet",        tone: "warn" },
        { label: "Tür (Serverraum)",         value: "Klemmt",            tone: "warn" },
        { label: "Passwortrichtlinie",       value: "Seit 2019 in Kraft", tone: "neutral" }
    ],

    /* ================================================================
       KENNZAHL DES TAGES
       The one place where the intranet reads the running workday rather
       than the save. Anyone playing without a ticket counter must not
       get it back through the back door - the company then simply does
       not disclose the figure, which is entirely in character.
       ================================================================ */
    kpi: {
        blind: {
            value: "—",
            text: "Der Bestand wird auf Wunsch der Bereichsleitung derzeit nicht ausgewiesen. Die Kennzahl bleibt selbstverständlich erfasst."
        },
        levels: [
            { min: 7, text: "Der Bestand liegt deutlich über Zielwert. Als Sofortmaßnahme wurde die Kennzahl auf 'beobachtend' gesetzt." },
            { min: 4, text: "Die Abweichung wurde an die Bereichsleitung gemeldet. Eine Rückmeldung ist nicht vorgesehen." },
            { min: 1, text: "Abweichung im Rahmen. Es besteht derzeit kein Handlungsbedarf." },
            { min: 0, text: "Der Zielwert wurde erreicht. Die Kennzahl wird zur Vermeidung von Erwartungshaltungen ab sofort nicht mehr erhoben." }
        ]
    },

    /* ================================================================
       SYSTEM STATUS (the counter)
       The counter beside "Tage ohne Vorfall im Serverraum" reads the
       streak from the archive, so for most players it says zero. That is
       the joke; the remarks make it one.
       ================================================================ */
    incident: [
        { min: 10, note: "Rekordverdächtig. Die Geschäftsleitung prüft, ob der Serverraum ausgelastet ist." },
        { min:  5, note: "Stabil. Bitte nicht darüber sprechen." },
        { min:  1, note: "Aufwärtstrend erkannt." },
        { min:  0, note: "Der Zähler wurde heute Morgen zurückgesetzt. Wie an den meisten Tagen." }
    ],

    /* ================================================================
       CHANTALS BLOG
       The top post follows her reputation. Below the thresholds of the
       team view (+20 / -20) the ordinary post stays in place.
       ================================================================ */
    /* ================================================================
       DASHBOARD
       The fixed frame of the start page. Everything reactive around it -
       employee of the month, the feed, the status rows - already lives
       further up in this file; these are the words that never change.
       ================================================================ */
    dashboard: {
        page: {
            kind: "panel",
            welcomeTitle: "Willkommen in Q4! 🚀",
            welcomeText: "Unser Pivot zur \"AI-gestützten Blockchain-Lösung\" war ein voller Erfolg! Auch wenn unser Produktteam noch prüft, was genau das für unsere Kernsoftware bedeutet, hat das Marketing bereits drei Branchen-Awards dafür entgegengenommen. Denkt daran: Wir sind agil. Wir versprechen die Zukunft und liefern sie, sobald sie da ist.",
            facilityTitle: "Facility Update",
            facilityText: "Die Tür zum Hauptserverraum klemmt sporadisch. Hausmeister Egon bittet darum, NICHT mehr mit dem Feuerlöscher dagegen zu schlagen. Nutzt vorerst den ungesicherten Seiteneingang.",
            employeeTitle: "🏅 Mitarbeiter des Monats",
            feedTitle: "📌 Company Feed",
            visionTitle: "Vision des Tages",
            // Shown when the pool has not been drawn from yet.
            visionFallback: "Wir bauen keine Software. Wir weben das digitale Gewand der Zukunft, in dem der Mensch nur noch ein Plugin ist.",
            visionAuthor: "— Dr. Wichtig, CEO",
            statusTitle: "System-Status",
            // Two lines, because the label breaks in a narrow column.
            incidentLabel: ["Tage ohne Vorfall", "im Serverraum:"],
            kpiTitle: "Kennzahl des Tages",
            kpiLabel: "Offener Ticketbestand",
            kpiTargetLabel: "Zielwert",
            kpiTarget: "0"
        }
    },

    /* ================================================================
       KANTINE
       The plan on the wall. Five working days plus the Saturday row,
       which has its own colours and a second line under the day name.
       ================================================================ */
    kantine: {
        page: {
            kind: "menu",
            title: "Cafeteria: \"The Agile Kitchen\" 🥗",
            dayLabel: "Wochentag",
            classicLabel: "Menü 1 (Classic)",
            veggieLabel: "Menü 2 (Vegetarisch)",
            todayLabel: "Heute",
            hygieneTitle: "⚠️ HYGIENE-HINWEIS VON EGON",
            hygieneFallback: "Die Mikrowelle im Ostflügel bleibt bis auf Weiteres gesperrt.",
            menu: [
                {
                    id: "mon",
                    day: "Montag",
                    classic: { name: "Spaghetti Bolognese", note: "Die Nudeln sind weich. Die Soße ist reichlich." },
                    veggie:  { name: "Linseneintopf", note: "Deftig, aber sehr salzarm. Dazu ein hartes Brötchen." }
                },
                {
                    id: "tue",
                    day: "Dienstag",
                    classic: { name: "Currywurst mit Pommes", note: "Der Klassiker. Die Pommes sind leider nicht mehr knusprig." },
                    veggie:  { name: "Gedünsteter Brokkoli mit Reis", note: "Ohne Soße. Sehr gesund. Sehr trocken." }
                },
                {
                    id: "wed",
                    day: "Mittwoch",
                    classic: { name: "Hähnchenbrust \"Hawaii\"", note: "Mit Ananas und Analogkäse überbacken." },
                    veggie:  { name: "Große Salat-Bowl", note: "Viel Eisbergsalat, drei Maiskörner. Essig/Öl-Dressing (ausverkauft)." }
                },
                {
                    id: "thu",
                    day: "Donnerstag",
                    classic: { name: "Schnitzel \"Wiener Art\"", note: "Die Panade löst sich leicht. Kartoffelsalat aus dem Eimer." },
                    veggie:  { name: "Kartoffelsuppe", note: "Wässrig, aber wärmt von innen." }
                },
                {
                    id: "fri",
                    day: "Freitag",
                    classic: { name: "Fischstäbchen (4 Stück)", note: "Dazu Kartoffelpüree (Pulverbasis) und etwas Spinat." },
                    veggie:  { name: "Gemüse-Wraps", note: "Kalt serviert. Viel Frischkäse." }
                }
            ],
            saturday: {
                id: "sat",
                day: "Samstag",
                sub: "Agiles Wochenende",
                classic: { name: "Lauwarmer Filterkaffee", note: "Steht seit Freitag 15 Uhr auf der Heizplatte." },
                veggie:  { name: "Trockener Marmorkuchen", note: "Reste vom Meeting der Geschäftsführung." }
            }
        }
    },

    chantal: {
        /* --------------------------------------------------------------
           The header and the sign-off, from IntranetChantal.svelte. The
           sign-off is a list because it breaks across two lines - one string
           with a <br> in it would need {@html} for nothing.
           -------------------------------------------------------------- */
        page: {
            kind: "header",
            title: "Mindful Workspace",
            subtitle: "Dein digitaler Safe-Space für agile Achtsamkeit.",
            signoff: [
                "In tiefer Verbundenheit zu euren KPIs,",
                "Eure Chantal 💕"
            ]
        },
        // The older post underneath, one per visit.
        older: [
            {
                title: "Die Kraft der stummen Meetings 🤫",
                time: "Gepostet vor 3 Wochen",
                paragraphs: [
                    "Guten Morgen Corporate-Family!",
                    "Unser Pilotprojekt 'Silent Sync' war ein riesiger Erfolg. Zwölf Mitarbeitende aus Sales und Marketing haben sich eine Stunde in Konferenzraum B getroffen, ohne ein einziges Wort zu wechseln. Wir haben ausschließlich über telepathische Mind-Maps und energetische Präsenz kommuniziert.",
                    "Das Ergebnis war atemberaubend: Niemand hat sich gestritten, es gab keine sinnlosen Fragen, und die Aura im Raum war extrem agil. Wir rollen das Format ab sofort für alle Quartalsberichte aus.",
                    "Denkt daran: Wer schweigt, stimmt zu!"
                ]
            },
            {
                title: "Der Stuhlkreis der Wertschätzung 🪑",
                time: "Gepostet vor 2 Wochen",
                paragraphs: [
                    "Ihr Lieben!",
                    "Am Donnerstag haben wir uns im Kreis aufgestellt und jeder durfte einer anderen Person sagen, was er an ihr schätzt. Es war sehr bewegend. Ein Kollege aus dem Vertrieb hat geweint, was ich als großen Fortschritt werte, auch wenn er später sagte, es habe an der Klimaanlage gelegen.",
                    "Aus organisatorischen Gründen fand der Kreis in der Mittagspause statt. Wertschätzung soll ja nicht die Produktivität belasten. 💫"
                ]
            },
            {
                title: "Warum 'Nein' nur ein unfertiges 'Ja' ist 🌱",
                time: "Gepostet vor 4 Wochen",
                paragraphs: [
                    "Namaste, ihr Strahlenden.",
                    "Ich beobachte in letzter Zeit sehr viel 'Nein' im Haus. 'Nein, das geht nicht.' 'Nein, dafür ist kein Budget da.' 'Nein, das ist physikalisch unmöglich.'",
                    "Aber ist ein Nein nicht einfach nur ein Ja, dem noch die Begeisterung fehlt? Ich lade euch ein, diese Woche kein einziges Mal Nein zu sagen. Beobachtet, was passiert. Ich verspreche euch: Es passiert eine Menge."
                ]
            },
            {
                title: "Unsere neue Duz-Kultur – ab sofort verbindlich 🤝",
                time: "Gepostet vor 6 Wochen",
                paragraphs: [
                    "Hallo ihr Lieben — und ja, ich sage bewusst 'ihr'!",
                    "Ab sofort duzen wir uns im ganzen Haus. Flache Hierarchien beginnen in der Sprache! Ausgenommen ist selbstverständlich die Geschäftsleitung, die weiterhin gesiezt wird, um die Wertschätzung nicht zu verwässern.",
                    "Wer sich mit dem Du schwertut, kann sich vertrauensvoll an mich wenden. Ich melde das dann weiter."
                ]
            },
            {
                title: "Digital Detox: Unser bildschirmfreier Freitagnachmittag ☀️",
                time: "Gepostet vor 5 Wochen",
                paragraphs: [
                    "Ihr Wundervollen,",
                    "ab sofort gilt freitags ab 15 Uhr: Bildschirme aus, Köpfe frei! Wir nennen es 'Analoge Stunde'. Geht spazieren, malt etwas, atmet.",
                    "Die Bearbeitung eingehender Anfragen bleibt davon selbstverständlich unberührt. Wir bitten euch, diese in der Analogen Stunde einfach mobil zu erledigen. 🌞"
                ]
            }
        ],

        high: {
            title: "Ein Hoch auf unsere stillen Held:innen! 🙌",
            time: "Gepostet heute, 11:40",
            paragraphs: [
                "Ihr Lieben, heute mal etwas Persönliches.",
                "Es gibt in diesem Haus einen Menschen, der Dinge repariert, bevor wir merken, dass sie kaputt sind. Ich sage bewusst keinen Namen, aber ihr wisst alle, wen ich meine. Diese Person hat heute etwas für mich getan, das technisch war und das ich nicht verstanden habe, und danach ging es wieder.",
                "<strong>Deshalb mein Vorschlag an die Geschäftsleitung:</strong> Lasst uns diesem Menschen ein Zeichen der Wertschätzung senden. Ich habe bereits eine digitale Grußkarte angelegt. Sie kostet nichts und kommt trotzdem von Herzen.",
                "Wertschätzung ist die neue Währung! 💕"
            ]
        },
        low: {
            title: "Über Menschen, die 'keine Zeit' haben ⏳",
            time: "Gepostet heute, 11:40",
            paragraphs: [
                "Namaste, ihr Wundervollen.",
                "Ich möchte heute über ein Wort sprechen, das mir in letzter Zeit sehr oft begegnet ist: <em>'gleich'</em>. Manche Abteilungen benutzen dieses Wort wie ein Möbelstück. Man stellt es in den Raum und hofft, dass es die Lücke füllt.",
                "Ich nenne bewusst keine Namen und keine Abteilungen. Ich sage nur: Wer Technik versteht, versteht noch lange keine Menschen. Und wer Menschen nicht versteht, sollte vielleicht weniger mit Kabeln arbeiten und mehr mit sich selbst.",
                "Ich bin nicht wütend. Ich bin energetisch enttäuscht. 🙏"
            ]
        }
    },

    /* ================================================================
       CEO-INTERVIEW
       One extra question at the end, plus an editorial note for anyone
       who has taken root on the network.
       ================================================================ */
    vision: {
        /* --------------------------------------------------------------
           The printed interview. Lived in IntranetVision.svelte until
           6.0; see the note at the top of that file for why the extra
           question is inserted before the LAST pair and not after it.

           `a` is rendered through {@html} because the answers carry
           inline emphasis - the laugh, the editorial aside about the
           yacht. `q` is plain text and must stay that way.
           -------------------------------------------------------------- */
        page: {
            kind: "interview",
            badge: "Exklusiv-Interview",
            headline: "\"Wenn der Ozean eine Cloud ist, sind wir der Windsurf-Lehrer.\"",
            standfirst: "Ein ausführliches Gespräch mit unserem CEO, Dr. Wichtig, aus der aktuellen Ausgabe von 'Tech Visionary Quarterly'.",
            interviewer: "Interviewer",
            ceo: "Dr. Wichtig",
            turns: [
                {
                    q: "Herr Dr. Wichtig, Ihre Firma wächst enorm. Aber viele fragen sich: Was genau ist Ihr Produkt? Was stellt GlobalCorp eigentlich her?",
                    a: "Wissen Sie, als ich neulich beim Heli-Skiing in den Anden stand und auf die unberührten Schneemassen blickte, dachte ich mir: Fallgeschwindigkeit ist im Grunde auch nur eine Metapher für Q3-Umsätze. Wir stellen keine 'Produkte' her. Das ist ein analoges Denkmuster aus dem 19. Jahrhundert! Wir orchestrieren holistische Daten-Paradigmen. Wir nehmen die Synergie der Blockchain, paaren sie mit agiler KI-Infrastruktur und gießen das Ganze in ein skalierbares Mindset-Framework."
                },
                {
                    q: "Ehrlich gesagt... ich verstehe es nicht. Verkaufen Sie Software? Speicherplatz?",
                    a: "Speicherplatz? <em>(lacht laut)</em> Wir speichern keine Daten, wir befreien sie! Wir haben ein Ökosystem kreiert, in dem der User nicht mehr konsumiert, sondern transzendiert. Stellen Sie sich einen Donut vor. Die Mitte ist leer. Diese Leere ist unser USP. Wir füllen das Nichts mit unendlichen Potenzialen durch maschinelles Lernen. Das ist es, was unsere Investoren so lieben."
                },
                {
                    q: "Apropos maschinelles Lernen. Jeder spricht über Künstliche Intelligenz. Wie integriert GlobalCorp KI in den Alltag?",
                    a: "KI ist für uns kein Werkzeug, es ist ein Kollege. Wir haben unsere KI nicht programmiert, wir haben sie gecoacht. Letzte Woche hat unsere Algorithmus-Matrix beschlossen, sich selbst eine Auszeit zu nehmen, um sich auf ihr Core-Business zu fokussieren. Der Server war zwei Tage down. Das nenne ich echtes Machine-Empowerment! Die Konkurrenz zwingt ihre KI zur Arbeit. Wir geben unserer KI den Freiraum, sich selbst zu disruptieren."
                },
                {
                    q: "Es gab Berichte über einen massiven Datenverlust im letzten Monat. Tausende Kundendaten tauchten im Darknet auf.",
                    a: "Datenverlust? Bitte. Das framing der traditionellen Medien ist so ermüdend. Das war kein Verlust, das war ein 'Open-Source Data Synergy Event'. Wir haben die Daten unserer Kunden aus ihren Silos befreit und sie dem globalen Informations-Ökosystem zurückgegeben. Transparenz ist das neue Gold! Die Kunden sollten uns eigentlich danken, dass ihre Daten jetzt agil und dezentral über die ganze Welt verteilt sind."
                },
                {
                    q: "Und Ihre Mitarbeiter? Es gab Berichte über 80-Stunden-Wochen und defekte Kaffeemaschinen.",
                    a: "Meine Tür steht immer offen. Jederzeit. <em>(Anmerkung der Redaktion: Dr. Wichtig arbeitet derzeit von seiner Yacht auf den Bahamas aus)</em>. Wir sind hier keine Firma. Wir sind ein Organismus. Wenn eine Zelle im Organismus 80 Stunden arbeiten muss, dann tut sie das, weil die DNA der Disruption es verlangt! Und zur Kaffeemaschine: Wir evaluieren gerade ein Liquid-Food-Startup, das Nährstoffe direkt über die Klimaanlage vernebelt. Das spart den Weg in die Küche."
                },
                {
                    q: "Letzte Frage: Wo sehen Sie GlobalCorp in fünf Jahren?",
                    a: "Physische Standorte sind sowas von 2019. In fünf Jahren werden wir unser Headquarter als NFT auf der Ethereum-Blockchain minten. Die Mitarbeiter loggen sich dann direkt über ihre Zirbeldrüse ein. Wir werden den Begriff 'Arbeit' so lange neu definieren, bis niemand mehr weiß, wofür er eigentlich bezahlt wird. Das ist die absolute Synergie."
                }
            ]
        },
        // Placed BEFORE the closing question about the next five years - it is
        // an interview, and nothing follows "letzte Frage".
        boss: {
            question: "Sie gelten als harter Verhandler. Gibt es Verhandlungen, die anders ausgegangen sind, als Sie es geplant hatten?",
            answer: "Anders ausgegangen? Verhandlungen gehen nicht aus, sie reifen. Es gab kürzlich intern ein Gespräch, in dem ich bewusst nachgegeben habe, um meinem Gegenüber ein Erfolgserlebnis zu ermöglichen. Das nennt man Empowerment. Dass ich dabei etwas unterschrieben habe, dessen Bedingungen mir mein Justiziar später vorgelesen hat, ändert daran nichts. Ein guter Anführer verliert nie. Er delegiert den Sieg."
        },
        good: {
            question: "GlobalCorp verkauft hochmoderne Infrastruktur. Setzen Sie diese Technologien eigentlich auch für Ihre eigenen internen Abläufe ein?",
            answer: "Selbstverständlich, wir sind unser eigener Referenzkunde! Wobei ich ehrlich sein muss: Das meiste läuft bei uns nicht wegen der Technologie, sondern wegen eines einzelnen Mitarbeiters im Untergeschoss. Neulich habe ich ihn gefragt, wie lange er schon bei uns ist. Er hat nur gelacht. Diese Verbundenheit können Sie nicht kaufen. Wir versuchen es auch gar nicht erst."
        },
        bad: {
            question: "GlobalCorp verkauft hochmoderne Infrastruktur. Setzen Sie diese Technologien eigentlich auch für Ihre eigenen internen Abläufe ein?",
            answer: "Intern? <em>(Pause)</em> Sehen Sie, in einer wirklich agilen Organisation ist Technik kein Ort, sondern eine Haltung. Wir haben im Untergeschoss einen Bereich dafür, ich glaube, das sind zwei Leute. Einer? Gut. Wir prüfen ohnehin gerade, ob sich diese Haltung nicht kostengünstiger extern einkaufen ließe. Rein strategisch. Da liegen keine Namen auf dem Tisch. Da liegen Zahlen."
        },
        editorNote: "Anmerkung der Redaktion: Dieses Interview wurde nach der Freigabe an einer Stelle verändert. Der Zugriff erfolgte über ein Konto mit vollen Rechten. Die Redaktion konnte nicht ermitteln, welches — es besitzen alle."
    },

    /* ================================================================
       WALL OF DEALS
       An extra card at the top of the wall, depending on how Markus is
       doing with you, plus the aftermath of a cancelled series booking.
       `tone` is a key, not a class name.
       ================================================================ */
    sales: {
        /* --------------------------------------------------------------
           The five printed deals. Lived in IntranetSales.svelte until 6.0,
           where the file comment already said this was the next step.

           `tone` maps to whole class names in the component. Class names in
           a data file are invisible to the Tailwind scanner, so the badge
           would silently lose its colour - the same rule the rest of this
           file follows.
           -------------------------------------------------------------- */
        page: {
            kind: "deals",
            title: "🏆 Wall of Deals",
            subtitle: "Erfolgreich abgeschlossene Deals. Was unser Sales-Team für GlobalCorp gesichert hat.",
            leaderLabel: "Team-Leader",
            leader: "Markus (Senior VP of Synergies)",
            customerLabel: "Kunde:",
            productLabel: "Verkauftes Produkt:",
            deals: [
                {
                    icon: "🤝",
                    customer: "MegaCorp Industries",
                    badge: "Vertrag unterzeichnet",
                    tone: "signed",
                    product: "Prädiktive Blockchain-Infrastruktur",
                    rows: [
                        { label: "Vertraglich zugesichert:", text: "Das System erkennt Serverausfälle 24 Stunden bevor sie passieren und repariert die Hardware durch maschinelles Lernen selbstständig." },
                        { label: "Rollout:", text: "Ende des Monats. Der Kunde erwartet den Login-Link am Freitag." }
                    ]
                },
                {
                    icon: "📦",
                    customer: "Global Logistics",
                    badge: "Live",
                    tone: "good",
                    product: "Pre-Crime Delivery AI",
                    rows: [
                        { label: "Vertraglich zugesichert:", text: "Die Software weiß, was der Endkunde bestellt, bevor er überhaupt daran denkt, und leitet den Versandprozess proaktiv ein." },
                        { label: "Markus' Erfolgsnotiz:", text: "\"Hab dem Kunden gesagt, unser Algorithmus liest Gehirnströme. Wir schicken einfach zufällig Pakete an irgendwelche Adressen und nennen es 'Proaktive Synergie'. Der Vorstand hat es geliebt!\"" }
                    ]
                },
                {
                    icon: "🛡️",
                    customer: "Local Bank Ltd.",
                    badge: "SLA Aktiv",
                    tone: "signed",
                    product: "100% Unhackbarer Offline-Cloud-Speicher",
                    rows: [
                        { label: "Vertraglich zugesichert:", text: "Die Daten des Kunden sind weltweit per App in Echtzeit abrufbar, liegen aber physisch getrennt vom Internet in einem Vakuum." },
                        { label: "Kundennotiz:", text: "Der CIO der Bank war begeistert von Markus' Konzept des 'Wireless-Kabels'." }
                    ]
                },
                {
                    icon: "📠",
                    customer: "Bundesamt für Digitalisierung",
                    badge: "Pilotprojekt",
                    tone: "pilot",
                    product: "Fax-to-Blockchain Bridge",
                    rows: [
                        { label: "Vertraglich zugesichert:", text: "Herkömmliche Faxgeräte der Behörde werden durch ein Firmware-Update nativ mit der Krypto-Cloud verbunden. Stempel werden als NFTs gespeichert." },
                        { label: "Markus' Erfolgsnotiz:", text: "\"Das war der leichteste Pitch des Jahres. Die Behörde wollte unbedingt 'was mit Krypto' machen. Wir drucken einfach QR-Codes aus.\"" }
                    ]
                },
                {
                    icon: "📉",
                    customer: "Startup XYZ",
                    badge: "Proof of Concept",
                    tone: "dead",
                    product: "Agile Legacy-Integration",
                    dim: true,
                    rows: [
                        { label: "Vertraglich zugesichert:", text: "Unsere Cloud-Software ist nativ abwärtskompatibel zu MS-DOS 6.22." },
                        { label: "Status:", text: "Warten auf Freigabe. Der Kunde sucht derzeit noch nach einem 5,25-Zoll-Diskettenlaufwerk für die Installation." }
                    ]
                }
            ]
        },
        good: {
            icon: "🔥",
            customer: "Nordwind Handel KG",
            badge: "In letzter Minute gesichert",
            tone: "good",
            product: "Ausfallsichere Echtzeit-Synchronisation",
            rows: [
                { label: "Vertraglich zugesichert:", text: "Der Kunde erhält eine dauerhaft verfügbare Anbindung ohne Wartungsfenster." },
                { label: "Markus' Erfolgsnotiz:", text: "'Der Kunde stand kurz vorm Absprung, ich hab das Ding im Alleingang aus dem Feuer geholt. Manchmal braucht es einfach jemanden, der Verantwortung übernimmt.'" }
            ]
        },
        bad: {
            icon: "🧯",
            customer: "Bremer Zulieferer GmbH",
            badge: "Geplatzt",
            tone: "bad",
            product: "Prozessoptimierung 360°",
            rows: [
                { label: "Ursachenanalyse (Vertrieb):", text: "Der Termin konnte nicht durchgeführt werden. Die zuständige interne Stelle war im entscheidenden Zeitfenster nicht erreichbar." },
                { label: "Maßnahme:", text: "Der Vorgang wurde zur Bewertung an die Geschäftsleitung weitergeleitet. Eine Stellungnahme der betroffenen Abteilung liegt nicht vor und wurde auch nicht angefordert." }
            ]
        },
        phoenix: {
            icon: "🕳️",
            customer: "Projekt Phoenix",
            badge: "Storniert",
            tone: "dead",
            product: "nicht ermittelbar",
            rows: [
                { label: "Vertraglich zugesichert:", text: "Im System sind keine Leistungen hinterlegt. Ein Kunde ist nicht hinterlegt. Ein Budget ist hinterlegt." },
                { label: "Status:", text: "Der Serientermin in Raum 'Kreativ 2' wurde heute aufgelöst. Der Vorgang bleibt offen, bis sich jemand zuständig meldet. Er ist seit vier Monaten offen." }
            ]
        }
    },

    /* ================================================================
       KANTINE
       The plan hangs on the wall for the whole week, so it does not
       change with the clock - only the issue line above it does.
       ================================================================ */
    hygiene: [
        "Die Mikrowelle im Ostflügel bleibt bis auf Weiteres gesperrt. Jemand hat versucht, tiefgefrorenen Fisch auf Stufe 'Auftauen' für 45 Minuten zu garen. Der Geruch hat sich in der Wandfarbe festgesetzt.",
        "Der Kühlschrank in der Kantine wurde abgetaut. Ein Teil des Inhalts war älter als der Kühlschrank. Der Rest wurde nicht identifiziert.",
        "Wer Fisch in der Mikrowelle erwärmt, ist im Haus bekannt. Nicht namentlich. Aber bekannt.",
        "Die Kanne auf der Heizplatte ist kein Vorrat. Sie ist ein Zustand. Wer sie leert, setzt bitte eine neue auf.",
        "Der Wasserspender im Foyer wurde abgeklemmt. Jemand hat versucht, ihn direkt an die Kaffeemaschine anzuschließen. Die Idee war nicht dumm. Die Ausführung schon.",
        "Essensreste gehören nicht in den Papierkorb unter dem Schreibtisch. Auch nicht in den Papierkorb eines Kollegen. Auch nicht in den Serverraum.",
        "Die Spülmaschine ist keine Ablage. Ihr Programm läuft 84 Minuten und nicht 'gleich'.",
        "Der Toaster im 2. OG wurde aus dem Verkehr gezogen. Die Begründung liegt der Geschäftsführung vor. Sie ist zwei Seiten lang."
    ],

    service: {
        before: { label: "Ausgabe ab 11:45 Uhr", note: "Die Schlange beginnt erfahrungsgemäß um 11:31 Uhr.", tone: "wait" },
        open:   { label: "Ausgabe läuft", note: "Voraussichtliche Wartezeit laut System: 8 Minuten.", tone: "open" },
        after:  { label: "Ausgabe beendet", note: "Reste stehen im Kühlschrank der Teeküche. Unbeschriftet. Verzehr auf eigene Gefahr.", tone: "closed" },
        done:   "Heute bereits in Anspruch genommen."
    },

    /* ================================================================
       IMPRESSUM
       The clauses replace one another instead of stacking, and only the
       version number grows. Nobody was ever told what changed.
       ================================================================ */
    impressum: {
        baseVersion: 47,
        /* --------------------------------------------------------------
           The static page around the reactive clause.
           Lived in IntranetImpressum.svelte until 6.0 - which meant half
           the page was data and half was markup, and translating it meant
           working in two files with two mechanisms. `tone` maps to whole
           class names in the component, as everywhere else in here.
           -------------------------------------------------------------- */
        page: {
            kind: "sections",
            title: "Impressum & AGB",
            subtitle: "Die Rechtsabteilung rät vom Lesen dieser Seite ab.",
            sections: [
                {
                    title: "§1 Anbieterkennzeichnung",
                    tone: "slate",
                    block: [
                        "GlobalCorp International Synergy GmbH & Co. KGaA",
                        "(Operatives Geschäft: Gebäude 3, Kellergeschoss)",
                        "Steueroase 42",
                        "Cayman Islands",
                        "",
                        "Vertreten durch: Dr. Wichtig (CEO & Chief Visionary Dictator)",
                        "Kontakt: Wenn es wichtig ist, rufen wir Sie an. Nicht umgekehrt."
                    ]
                },
                {
                    title: "§2 Haftungsausschluss (Körper & Geist)",
                    tone: "red",
                    items: [
                        "GlobalCorp haftet unter keinen Umständen für den Verlust der geistigen Gesundheit, der durch die Benutzung unseres Intranets, das Lesen von E-Mails des Vertriebs oder den Genuss des Kantinenessens entsteht.",
                        "Spontane Selbstentzündung von Hardware, die nach 1998 hergestellt wurde, gilt als 'Höhere Gewalt' und ist vom Mitarbeiter privat zu erstatten.",
                        "Das Einatmen von Tonerstaub gilt als geldwerter Vorteil ('Kostenloses Büro-Make-up') und muss bei der Steuererklärung angegeben werden.",
                        "Sollte ein Mitarbeiter durch eine Überdosis des Firmenkaffees die Fähigkeit erlangen, Farben zu hören oder durch die Zeit zu reisen, fallen die dabei gewonnenen Erkenntnisse an das Unternehmen."
                    ]
                },
                {
                    title: "§3 Datenschutz & Überwachung",
                    tone: "blue",
                    paragraphs: [
                        "Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Deshalb bewahren wir sie sicher auf unseren internen Servern auf. Für zusätzliche Redundanz werden diese Daten extern gesichert – hierfür hat uns ein freundlicher Werbepartner großzügigerweise Serverkapazitäten zur Verfügung gestellt."
                    ],
                    lead: "Durch das Betreten des Firmengebäudes stimmen Sie automatisch zu, dass:",
                    items: [
                        "Ihre Tastaturanschläge analysiert werden, um Ihre Motivation zu berechnen (weniger als 8 Tastenanschläge pro Sekunde gelten als Arbeitsverweigerung).",
                        "Ihr Stuhlkissen biometrische Daten erfasst, um Toilettengänge vorherzusagen und von der Pause abzuziehen.",
                        "Ihre DNA Eigentum der GlobalCorp wird, sobald Sie einen Briefumschlag der Firmenpost anlecken."
                    ]
                },
                {
                    title: "§4 IT-Ressourcen & Verschleißgebühr",
                    tone: "amber",
                    paragraphs: [
                        "Die am Arbeitsplatz bereitgestellte Hardware ist exklusives Firmeneigentum. Mausklicks und Tastaturanschläge betrachten wir als endliche Ressourcen. Exzessives Scrollen, unnötiges Doppelklicken oder das rein private Aktualisieren von Webseiten führt zu vorzeitigem Hardware-Verschleiß. Ab dem 10.000. Mausklick pro Kalendermonat behält sich GlobalCorp vor, eine Abnutzungsgebühr von 0,02 € pro Klick direkt vom Nettogehalt einzubehalten."
                    ]
                }
            ],
            closing: {
                label: "§5 Salvatorische Klausel:",
                text: "Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein, wird die Geschäftsführung Sie solange anschreien, bis Sie zustimmen, dass sie doch wirksam sind. Gerichtsstand ist das Büro von Dr. Wichtig."
            },
            // {version} and {note} are filled in by the component. Same
            // placeholder convention as the diary, and for the same reason:
            // the English sentence needs a different word order.
            versionLine: "Fassung {version}. Zuletzt geändert heute. {note}"
        },

        versionNote: "Eine gesonderte Benachrichtigung der Mitarbeitenden ist nicht vorgesehen.",
        clauses: [
            {
                minRage: 10,
                title: "§2c Mobile Mitarbeitende",
                text: "Mitarbeitende, die das Betriebsgelände mehr als zehnmal ohne Abmeldung verlassen haben, gelten arbeitsrechtlich als 'mobil'. Für mobile Mitarbeitende entfällt der Anspruch auf einen festen Arbeitsplatz. Der Stuhl wird im laufenden Quartal eingezogen."
            },
            {
                minRage: 3,
                title: "§2b Spontane Standortwechsel",
                text: "Das unangekündigte Verlassen des Arbeitsplatzes gilt als unbezahlte Pause und wird bei der Berechnung des Weihnachtsgeldes als Urlaubstag geführt. Ein Widerspruch ist möglich und wird archiviert."
            }
        ]
    },

    /* ================================================================
       HUMAN CAPITAL
       GlobalCorp hands out one initial password for every account and has
       never changed it - which is what makes a second file reachable at
       all. The credentials come over the news ticker; the account name
       is in the support line at the bottom of Schnösel's file.
       ================================================================ */
    hr: {
        /* --------------------------------------------------------------
           The login card and Schnösel's file, from IntranetHR.svelte.

           Schnösel's record is fixed, Müller's is assembled from the
           archive - but both use the SAME shape for documents and notes,
           so the view renders them through one block instead of two
           near-copies. That was already true of the reactive half; the
           fixed half just never got to share it.
           -------------------------------------------------------------- */
        page: {
            kind: "records",
            // Which user name opens which record. Lived in the component
            // until 6.0, which was wrong in a way nothing would have
            // reported: the second name is not given out anywhere, it is
            // READ OFF the support line under Schnösel's record. Rename the
            // player and leave this behind, and the second file becomes
            // unreachable - with no error, on a page most players never
            // get into twice.
            accounts: [
                { user: "j_schnoesel", record: "schnoesel" },
                { user: "mueller",     record: "mueller" }
            ],
            login: {
                title: "Restricted Access",
                subtitle: "Bitte authentifizieren Sie sich, um auf Personalakten zuzugreifen.",
                userLabel: "Benutzerkennung",
                passLabel: "Passwort",
                denied: "Zugriff verweigert.",
                submit: "LOGIN"
            },
            fileTitle: "Mitarbeiterakte",
            logout: "Abmelden",
            sectionMaster: "Stammdaten",
            sectionDocuments: "Persönliche Dokumente",
            sectionBehaviour: "Verhaltensanalyse & Arbeitsweise",

            schnoesel: {
                recordId: "#8472-B",
                avatar: "👤",
                name: "J.-A. Schnösel",
                role: "Junior Agile Synergy Facilitator",
                status: "Status: Probezeit (Monat 1/14)",
                master: [
                    { label: "Vereinbartes Gehalt", value: "2.411,00 € Brutto / Monat", tone: "amber",
                      note: "(40-Stunden-Woche. Zzgl. bis zu 80 unvergütete Pflicht-Überstunden pro Monat)" },
                    { label: "Wohnort", lines: ["Hinterwald-Süd 4", "17398 Nirgendwo"] },
                    { label: "Pendelzeit", value: "3h 15min (einfache Strecke)", tone: "red" },
                    { label: "Urlaubsanspruch", value: "14 Tage / Jahr" }
                ],
                documents: [
                    {
                        id: "motivation",
                        icon: "📄",
                        name: "Motivationsschreiben.pdf",
                        paragraphs: [
                            "\"Sehr geehrtes Human Capital Komitee der GlobalCorp,",
                            "mit brennender Leidenschaft für cross-funktionale Synergien und einem unerschütterlichen Glauben an die transformative Kraft agiler Workflows bewerbe ich mich hiermit um die Position in Ihrem Hause.",
                            "Mein Ziel ist es, in Ihrem Unternehmen echte Disruption voranzutreiben. Ich möchte veraltete Paradigmen shiften, isolierte Datensilos aufbrechen und durch proaktives Mindset-Engineering nachhaltige, skalierbare Wertschöpfungsketten implementieren. In meiner vorherigen Tätigkeit (als Assistant Shift Manager bei einer großen Fast-Food-Kette) konnte ich bereits beweisen, dass ich komplexe Supply-Chain-Probleme unter Hochdruck gamifizieren kann.",
                            "Ein Privatleben betrachte ich als unmonetarisiertes Zeitfenster. Ich bin jederzeit bereit, mein gesamtes geistiges und physisches Kapital zu 100% für die globale Mission von GlobalCorp zu investieren.\""
                        ]
                    },
                    {
                        id: "arbeitsanweisung",
                        icon: "📑",
                        name: "Offizielle_Arbeitsanweisung_v4.pdf",
                        intro: "Vertraulich: Kernaufgabenbeschrieb (Level 1)",
                        lead: "Die Aufgaben des 'Junior Agile Synergy Facilitator' umfassen bis auf Widerruf folgende manuelle Prozesse:",
                        items: [
                            "<strong>Kaffeefilter-Optimierung:</strong> Um das Nachhaltigkeits-Budget zu schonen, sind benutzte Kaffeefilter der Abteilung Sales auf der Heizung im 2. Stock zu trocknen, auszuklopfen und für den Wiedergebrauch bereitzulegen.",
                            "<strong>Physisches Pingen:</strong> Fällt der Teams-Status eines Mitarbeiters im Großraumbüro länger als 45 Sekunden auf \"Abwesend\", ist dieser umgehend aufzusuchen und mit einem normierten Holzstock (Länge: 1,20m) an der Schulter anzutippen, um die Agilität zu reaktivieren.",
                            "<strong>Pflanzen-Synergie:</strong> Die Plastikpflanzen im Eingangsbereich sind zweimal wöchentlich mit Leitungswasser zu gießen. Dies dient der Aufrechterhaltung der Illusion eines organisch wachsenden Unternehmens für eintreffende Investoren.",
                            "<strong>Akustische Archivierung:</strong> Da das Diktiergerät der Abteilungsleitung defekt ist, muss der Mitarbeiter bei strategischen Meetings anwesend sein und sämtliche gesprochenen Vokale in Echtzeit mitzählen. Die Summe ist freitags als Excel-Tabelle einzureichen."
                        ]
                    }
                ],
                notes: [
                    { tone: "bad", title: "Visueller Produktivitätsverlust",
                      text: "Mitarbeiter blinzelt im Durchschnitt 18 Mal pro Minute. Das summiert sich auf 2,4 verlorene Arbeitsstunden im Jahr. Eine offizielle Abmahnung ist in Vorbereitung." },
                    { tone: "neutral", title: "Mangelnde Resilienz (Vorfall 01-A)",
                      text: "Wurde am ersten Tag weinend unter dem Schreibtisch gefunden, nachdem ihm aufgetragen wurde, das Internet für das Wochenend-Archiv auszudrucken." },
                    { tone: "bad", title: "Toiletten-Inkonsistenz",
                      text: "Die durchschnittliche Verweildauer in der Sanitäranlage beträgt 4 Minuten und 12 Sekunden. Die GlobalCorp-Norm liegt bei 2 Minuten und 30 Sekunden. Der Zugangscode wird ab morgen nur noch auf Antrag herausgegeben." },
                    { tone: "good", title: "Loyalitäts-Metrik (Positiv)",
                      text: "Hat seinen privaten Streaming-Account erfolgreich gekündigt, um sich abends fokussierter auf unbezahlte Überstunden vorbereiten zu können. Dies wurde mit einem virtuellen High-Five im Intranet belohnt." }
                ]
            },

            mueller: {
                recordId: "#0404-A",
                avatar: "💀",
                name: "Müller",
                role: "Systemadministration",
                // {month} is filled in by the component - the English
                // sentence needs a different word order.
                statusTemplate: "Status: Probezeit (Monat {month}/14)",
                salaryLabel: "Vereinbartes Gehalt",
                standbyLabel: "Rufbereitschaft",
                standbyValue: "Nicht vereinbart. Faktisch durchgehend.",
                holidayLabel: "Urlaubsanspruch",
                holidayValue: "14 Tage / Jahr",
                holidayNote: "(Davon 14 Tage an den Betriebsurlaub gebunden.)",
                loyaltyLabel: "Loyalitätsindex"
            }
        },
        /* --------------------------------------------------------------
           The notes the company keeps on Müller. Assembled in
           engine_ui.buildIntranet() until 6.0, which put five paragraphs
           of HR prose in an engine file - the condition belongs there,
           the wording does not. {count} is filled in by the engine.
           -------------------------------------------------------------- */
        careerNotes: {
            warningsChef: {
                tone: "bad",
                title: "Abmahnungen: {count}",
                text: "Sämtlich mündlich ausgesprochen und nachträglich schriftlich vermerkt. Ein Widerspruch ist nicht eingegangen, da über die Vermerke nicht informiert wurde."
            },
            rage: {
                tone: "bad",
                title: "Unentschuldigtes Verlassen des Arbeitsplatzes: {count}",
                text: "Der Mitarbeiter hat das Gebäude vor Dienstschluss verlassen, ohne sich abzumelden. In allen Fällen war er am Folgetag pünktlich wieder anwesend, was die Personalabteilung als Reue wertet."
            },
            ventSaves: {
                tone: "neutral",
                title: "Programm \"Achtsamkeit im Kabelkanal\": {count} Teilnahmen",
                text: "Der Mitarbeiter hat wiederholt von der betrieblichen Möglichkeit Gebrauch gemacht, sich vor einer Eskalation kurz zurückzuziehen. Die Maßnahme gilt damit als wirksam und wird nicht ausgebaut."
            },
            streakBest: {
                tone: "good",
                title: "Längste Phase ohne Zwischenfall: {count} Arbeitstage",
                text: "Ein auffällig ruhiger Zeitraum. Die Personalabteilung prüft, ob in dieser Phase eine Unterauslastung vorlag."
            },
            survived: {
                tone: "good",
                title: "Regulär beendete Arbeitstage: {count}",
                text: "Der Mitarbeiter hat das Gebäude an diesen Tagen zur vorgesehenen Zeit verlassen. Eine gesonderte Würdigung ist nicht vorgesehen, da dies dem Vertrag entspricht."
            }
        },
        policy: "Passwortrichtlinie: Aus Gründen der Systemstabilität vergibt die IT für sämtliche Konten dasselbe Initialpasswort. Eine Änderung ist technisch möglich, aber nicht vorgesehen (Ticket #4711, offen seit 2019).",
        support: "Bei technischen Problemen wenden Sie sich an: mueller@globalcorp.internal",

        salary: "3.150,00 € Brutto / Monat",
        salaryNote: "(Zuletzt angepasst 2019. Die nächste Anpassung ist an das Erreichen der Unternehmensziele gekoppelt.)",

        // Loyalty index, derived from the average reputation across the team.
        loyalty: [
            {
                min: 20,
                label: "bindungssicher",
                text: "Der Mitarbeiter genießt abteilungsübergreifend hohes Ansehen. Ein Wechsel ist unwahrscheinlich, da er sich für die hiesigen Abläufe verantwortlich fühlt. Eine Gehaltsanpassung ist aus diesem Grund nicht erforderlich."
            },
            {
                min: -19,
                label: "unauffällig",
                text: "Der Mitarbeiter fällt weder positiv noch negativ auf. Die Personalabteilung führt dies als Idealzustand."
            },
            {
                min: -100,
                label: "Fluchtrisiko erhöht",
                text: "Im Kollegenkreis bestehen Vorbehalte. Als Gegenmaßnahme wurde ein persönliches Gespräch terminiert. Der Termin liegt im vierten Quartal 2029."
            }
        ],

        // Behaviour notes. Only what actually happened shows up.
        traitsNone: {
            tone: "good",
            title: "Keine Auffälligkeiten",
            text: "In der Akte ist bislang nichts vermerkt. Die Personalabteilung wertet eine leere Akte als Hinweis darauf, dass der Mitarbeiter zu wenig beobachtet wurde. Eine Nachprüfung ist eingeleitet."
        },

        documents: [
            {
                id: "hr_doc_stelle",
                icon: "📑",
                name: "Stellenbeschreibung_Systemadministration.pdf",
                intro: "Vertraulich: Kernaufgabenbeschrieb (Level 3)",
                lead: "Die Aufgaben der Systemadministration umfassen bis auf Widerruf sämtliche Tätigkeiten, die im Haus anfallen und keiner anderen Stelle zugeordnet werden konnten. Insbesondere:",
                items: [
                    "<strong>Störungsbeseitigung:</strong> Alle Geräte mit Stromanschluss. Die Abgrenzung zur Haustechnik erfolgt im Einzelfall durch Zuruf.",
                    "<strong>Betreuung des Führungskreises:</strong> Erreichbarkeit während der Kernarbeitszeit sowie außerhalb, sofern das Anliegen dringend erscheint. Die Einschätzung der Dringlichkeit obliegt dem Anrufenden.",
                    "<strong>Datensicherung:</strong> Durchführung, Prüfung und Verantwortung. Ein Budget ist hierfür nicht vorgesehen, da Datenverlust bislang nicht eingetreten ist.",
                    "<strong>Wissensweitergabe:</strong> Anleitung des Auszubildenden. Anrechenbare Zeit hierfür: keine."
                ]
            },
            {
                id: "hr_doc_entwurf",
                icon: "📄",
                name: "Kuendigungsschreiben_ENTWURF_final_v3.docx",
                intro: "Zuletzt geändert vor 14 Monaten. Nicht abgesendet.",
                paragraphs: [
                    "'Sehr geehrter Herr Dr. Wichtig,",
                    "hiermit kündige ich das bestehende Arbeitsverhältnis ordentlich und fristgerecht zum'",
                    "<em>Der Satz endet hier. Das Dokument liegt im persönlichen Ordner des Mitarbeiters und wurde seither dreimal geöffnet, aber nicht verändert. Die Systemüberwachung protokolliert jede dieser Sitzungen und wertet sie als 'Beschäftigung mit der eigenen Zukunft' positiv.</em>"
                ]
            }
        ]
    }
};
