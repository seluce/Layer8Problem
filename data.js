const DB = {
    // === ITEMS (Loot & Werkzeuge) ===
    items: {
        "wifi_note": { icon: "📝", name: "WLAN-Zettel" },
        "donut": { icon: "🍩", name: "Alter Donut" },
        "admin_pw": { icon: "🔑", name: "Root-Passwort" },
        "kabel": { icon: "🔌", name: "LAN-Kabel" },
        "tape": { icon: "🩹", name: "Panzertape" },
        "screw": { icon: "🪛", name: "Schraubendreher" },
        "energy": { icon: "⚡", name: "Energy Drink" },
        "stressball": { icon: "🔴", name: "Wut-Ball" },
        "manual": { icon: "📖", name: "Win95 Handbuch" },
        "usb_stick": { icon: "💾", name: "Mysteriöser Stick" },
        "fire_ext": { icon: "🧯", name: "Feuerlöscher" },
        "secret_list": { icon: "📁", name: "Schwarze Liste" },
        "hammer": { icon: "🔨", name: "Notfall-Hammer" }
    },
	
        // NEU: E-MAILS (Für das Popup System)
        emails: [
        { 
            sender: "HR Abteilung", 
            subj: "Kuchen in der Küche! (Bitte sauber hinterlassen)",
            opts: [
                { btn: "Sofort hinrennen!", txt: "Lecker! Aber du hast Krümel am Hemd.", f: 5, a: -5, c: 0 },
                { btn: "Beschwerde mailen", txt: "Du forderst Obst statt Kuchen. Alle hassen dich.", f: 0, a: 5, c: 0 }
            ]
        },
        { 
            sender: "Der Chef", 
            subj: "Wo sind Sie? Ich sehe Sie nicht am Platz.",
            opts: [
                { btn: "Ehrlich: 'Klo'", txt: "Zu viel Info. Er legt angewidert auf.", f: 0, a: 0, c: 5 },
                { btn: "Lüge: 'Serverraum'", txt: "Gute Ausrede. Er glaubt es.", f: 0, a: 0, c: -5 }
            ]
        },
        { 
            sender: "Ticketsystem", 
            subj: "TICKET #9942: Maus brennt.",
            opts: [
                { btn: "Ticket löschen", txt: "Gelöscht. Problem gelöst (für dich).", f: 10, a: 0, c: 5 },
                { btn: "Feuerwehr rufen", txt: "Großeinsatz. Es war nur eine LED.", f: -5, a: 10, c: 10 }
            ]
        },
        { 
            sender: "Betriebsrat", 
            subj: "Einladung: 'Richtig Atmen am Arbeitsplatz'",
            opts: [
                { btn: "Teilnehmen", txt: "Du atmest. 30 Minuten nichts getan.", f: 15, a: -10, c: 5 },
                { btn: "Als Spam markieren", txt: "Weg damit. Zeit ist Geld.", f: 0, a: 5, c: 0 }
            ]
        },
        { 
            sender: "Facility Mgt", 
            subj: "Toiletten im 3. Stock gesperrt (Rohrbruch).",
            opts: [
                { btn: "Rundmail: 'Danke Merkel'", txt: "Politische Diskussion ausgelöst. Chaos.", f: 10, a: 10, c: 10 },
                { btn: "Zur Kenntnis nehmen", txt: "Du gehst heute in den 2. Stock.", f: 0, a: 0, c: 0 }
            ]
        },
        { 
            sender: "IT-Sec", 
            subj: "Phishing-Test: Bitte hier klicken für Bonus!",
            opts: [
                { btn: "Klicken (Gier)", txt: "TEST NICHT BESTANDEN! Meldung an Chef.", f: 0, a: 10, c: 20 },
                { btn: "Melden", txt: "Vorbildlich. Du bekommst ein Sternchen.", f: 0, a: 0, c: -5 }
            ]
        },
        { 
            sender: "Azubi Kevin", 
            subj: "Hilfe!! Mein PC macht komische Geräusche",
            opts: [
                { btn: "Antwort: 'Lauf weg!'", txt: "Kevin rennt schreiend raus.", f: 5, a: 0, c: 5 },
                { btn: "Hingehen", txt: "Es war der Lüfter. Du hast es gefixt.", f: -5, a: -5, c: -5 }
            ]
        },
        // --- FEHLGELEITETE E-MAILS (Nicht an dich gerichtet) ---
        { 
            sender: "Vorstand (Verteiler: Alle)", 
            subj: "WG: Kündigungswelle Q4 (VERTRAULICH)",
            opts: [
                { btn: "Reply-All: 'WAS?!'", txt: "Panik in der ganzen Firma. Chef tobt.", f: 0, a: 20, c: 50 },
                { btn: "Löschen & Schweigen", txt: "Du weißt zu viel. Aber du lebst sicher.", f: 0, a: -5, c: -5 }
            ]
        },
        { 
            sender: "Chantal (Privat)", 
            subj: "Re: Wochenende",
            // body: "Hey Schatz, der Chef ist so ein Idiot. Treffen wir uns im Archiv?", 
            opts: [
                { btn: "Petzen (Weiterleiten)", txt: "Chantal bekommt Ärger. Du bist gemein.", f: 0, a: -10, c: -10 },
                { btn: "Antwort: 'Falsche Adresse'", txt: "Peinlich berührt. Sie meidet dich.", f: 0, a: 0, c: 0 }
            ]
        }
    ],

    // SPEZIAL (Mittagspause & Fallback)
    special: {
        lunchEvents: [
            {
                id: "lunch_canteen",
                title: "MITTAG: KANTINE",
                text: "Es gibt heute 'Jägerschnitzel Surprise'. Die Meute drängelt. Was tust du?",
                opts: [
                    { t: "Mit den Kollegen essen", m: 45, f: -5, a: 10, c: -5, r: "Smalltalk über das Wetter. Langweilig, aber sozial erwünscht." },
                    { t: "Alleine essen (Handy)", m: 30, f: 5, a: -10, c: 0, r: "Du hast Memes geschaut. Akku ist jetzt leerer, aber du bist entspannt." }
                ]
            },
            {
                id: "lunch_desk",
                title: "MITTAG: AM PLATZ",
                text: "Du hast keine Lust auf Menschen. Du hast noch ein altes Pausenbrot.",
                opts: [
                    { t: "Durcharbeiten", m: 30, f: -10, a: 20, c: -10, r: "Der Chef lobt deinen Einsatz. Du hast Krümel in der Tastatur." },
                    { t: "Netflix gucken", m: 60, f: 20, a: -20, c: 10, r: "Chef hat dich gesehen. 'Ist das hier ein Kino?!' Aber die Folge war gut." }
                ]
            },
            {
                id: "lunch_vegan",
                title: "MITTAG: VEGANER TAG",
                text: "In der Kantine gibt es nur Tofu-Klumpen. Die Stimmung im Team ist aggressiv.",
                opts: [
                    { t: "Mitessen und meckern", m: 45, f: 0, a: 15, c: 0, r: "Gemeinsames Meckern verbindet das Team." },
                    { t: "Zum Döner-Mann rennen", m: 45, f: 5, a: -20, c: 5, r: "Du kommst mit Knoblauchfahne zurück. Du bist glücklich, die Kollegen rümpfen die Nase." }
                ]
            },
            {
                id: "lunch_client_emergency",
                title: "MITTAG: DER CHEF-ALARM",
                text: "Du packst gerade dein Brot aus, da steht der Chef atemlos vor dir. 'Müller! Kunde Schmitz hat totalen Internet-Ausfall! Sie müssen SOFORT hin! Das ist ein Notfall! Das Brot können Sie im Auto essen!'",
                opts: [
                    { t: "Hinfahren (Hungrig & Wütend)", m: 60, f: -20, a: 25, c: -15, r: "Du standest im Stau. Beim Kunden war nur der Stecker gezogen. Du bist verhungert, aber der Chef feiert deinen Einsatz." },
                    { t: "Verweigern: 'Es ist PAUSE!'", m: 30, f: 5, a: -10, c: 15, r: "Der Chef läuft rot an. 'So eine Arbeitsmoral merke ich mir!' Er rennt wütend selbst los. Dein Essen schmeckt nach Sieg." }
                ]
            },
            {
                id: "lunch_pizza",
                title: "MITTAG: PIZZA-DISKUSSION",
                text: "Das Team will Pizza bestellen. Die Diskussion dauert schon 20 Minuten. 'Ananas gehört nicht drauf!' vs 'Ich bin laktoseintolerant!'. Deine Pause verrinnt.",
                opts: [
                    { t: "Machtwort: 'Salami für alle!'", m: 45, f: -5, a: 10, c: 0, r: "Du hast bestellt. Die Veganer hassen dich, aber du bist satt. Aggro steigt durch das Gemecker." },
                    { t: "Aussteigen & Brot essen", m: 30, f: 0, a: -5, c: 0, r: "Du isst dein trockenes Brot, während die anderen noch streiten. Friedlich, aber traurig." }
                ]
            },
            {
                id: "lunch_business",
                title: "MITTAG: GESCHÄFTSESSEN",
                text: "Ein schmieriger Vertreter lädt dich zum Lunch ein. Es gibt teures Sushi. Er will dir aber eigentlich nur eine völlig überteuerte Firewall-Lösung andrehen.",
                opts: [
                    { t: "Gratis Essen abgreifen", m: 90, f: 20, a: -10, c: -5, r: "Das Sushi war göttlich. Du hast ihm versprochen, 'mal drüber nachzudenken' (Lüge). Pause überzogen." },
                    { t: "Dankend ablehnen", m: 30, f: -5, a: 0, c: 5, r: "Du bleibst im Büro. Deine Integrität ist gewahrt, aber dein Magen knurrt." }
                ]
            },
            {
                id: "lunch_doener",
                title: "MITTAG: DÖNER-TAG",
                text: "Der Döner-Laden um die Ecke hat Jubiläum. Döner für 2,50€. Die Schlange geht bis auf die Straße. Der Duft ist verführerisch.",
                opts: [
                    { t: "Anstellen (Gier)", m: 50, f: 10, a: 15, c: 5, r: "Du hast 40 Minuten gewartet und 5 Minuten geschlungen. Du kommst zu spät und riechst extrem nach Knoblauch." },
                    { t: "Verzichten", m: 20, f: 0, a: 5, c: 0, r: "Du holst dir ein belegtes Brötchen. Es schmeckt nach Pappe. Der Neid auf die Döner-Esser nagt an dir." }
                ]
            },
            {
                id: "lunch_sleep",
                title: "MITTAG: SUPPENKOMA",
                text: "Du hast zu viel gegessen. Das 'Schnitzel-Koma' setzt ein. Deine Augenlider wiegen Tonnen. Der Serverraum ist schön kühl...",
                opts: [
                    { t: "Power-Nap im Serverraum", m: 45, f: 25, a: -20, c: 10, r: "Du bist eingeschlafen! Du wachst mit Tastatur-Abdruck im Gesicht auf. Hoffentlich hat dich keiner gesehen." },
                    { t: "Doppelter Espresso", m: 10, f: -5, a: 5, c: 0, r: "Das Herz rasen setzt ein. Du bist wach, aber deine Hände zittern. Produktivität: Fragwürdig." }
                ]
            },
        ],
        empty_pool: {
            id: "fallback_empty",
            title: "Ruhe vor dem Sturm",
            text: "Aktuell passiert nichts. Alle sind wohl glücklich (oder tot). Du starrst eine Fliege an.",
            opts: [
                { t: "Däumchen drehen", m: 20, f: 5, a: -5, c: 0, r: "Zeit vergeht langsam." }
            ]
        }
    },

    // BOSS FIGHTS (Zeitdruck Events)
    bossfights: [
        {
            id: "boss_ransomware",
            title: "🚨 RANSOMWARE ANGRIFF 🚨",
            text: "EIN TOTENKOPF AUF DEM HAUPTSERVER! 'Senden Sie 10 Bitcoin oder alles wird gelöscht'. Der Countdown läuft! (10 Sekunden)",
            timer: 10, 
            opts: [
                { t: "Stecker ziehen!", m: 10, f: -10, a: 20, c: 10, r: "Brachial, aber wirksam. Server ist aus. Daten gerettet (vielleicht)." },
                { t: "Admin-Code eingeben", req: "admin_pw", m: 5, f: 0, a: -10, c: -20, r: "Profi-Move! Angriff abgewehrt. Held der Firma!" }
            ],
            fail: { m: 30, f: 0, a: 50, c: 50, r: "ZU LANGSAM! Daten verschlüsselt. Chef tobt!" }
        },
        {
            id: "boss_fire",
            title: "🔥 SERVER BRAND 🔥",
            text: "Rauch im Serverraum! Ein Kondensator ist geplatzt! Flammen schlagen hoch! Handeln Sie!",
            timer: 8,
            opts: [
                { t: "Feuerlöscher benutzen", req: "fire_ext", m: 30, f: -10, a: 10, c: -20, r: "Feuer gelöscht. Du hustest, aber bist ein Held." },
                { t: "Wegrennen und Alarm drücken", m: 60, f: 10, a: 0, c: 10, r: "Feuerwehr kommt. Büro evakuiert. Du hast Pause." }
            ],
            fail: { m: 120, f: -20, a: 30, c: 40, r: "SPRINKLERANLAGE AKTIV! Alles ist nass. Totalschaden." }
        },
		{
            id: "boss_stream",
            title: "☠️ CEO LIVE-STREAM FAIL ☠️",
            text: "Der CEO präsentiert live vor 5000 Investoren. Das Bild friert ein! Er ruft dich auf dem Handy an und brüllt: 'MACHEN SIE DASS ES GEHT! JETZT SOFORT!'",
            timer: 12,
            opts: [
                { t: "Backup-Leitung schalten", req: "admin_pw", m: 5, f: -10, a: 0, c: -20, r: "Profi-Reaktion! Der Stream läuft wieder in 4K. Der CEO wirkt erleichtert (und schwitzt)." },
                { t: "Qualität auf 'Kartoffel' (240p) setzen", m: 5, f: 5, a: 0, c: 10, r: "Es läuft wieder flüssig. Aber der CEO sieht aus wie eine Lego-Figur. Die Investoren lachen." }
            ],
            fail: { m: 20, f: 0, a: 40, c: 60, r: "STREAM ABGEBROCHEN. Aktienkurs fällt um 10%. Der Chef kommt persönlich runter..." }
        },
        {
            id: "boss_ddos",
            title: "🧟 ZOMBIE BOTNET ANGRIFF 🧟",
            text: "ALARM! Millionen von gehackten Kühlschränken greifen unsere Webseite an! Die Firewall glüht! Traffic bei 5000%!",
            timer: 15,
            opts: [
                { t: "Geo-Blocking aktivieren", m: 10, f: -5, a: 5, c: -5, r: "Zack! Der ganze Traffic aus Übersee ist geblockt. Die Seite läuft wieder. Kollateralschaden gering." },
                { t: "Stecker vom Router ziehen", m: 5, f: 10, a: -5, c: 20, r: "Der Angriff ist gestoppt. Aber wir sind offline. Technisch gesehen ein Erfolg, wirtschaftlich eine Katastrophe." }
            ],
            fail: { m: 60, f: -10, a: 30, c: 40, r: "SERVER ABGESTÜRZT. Die Seite ist down. Auf Twitter trendet #GlobalCorpFail." }
        },
        {
            id: "boss_heat",
            title: "❄️ KLIMAANLAGE TOTALAUSFALL ❄️",
            text: "Stille im Serverraum. Die Kühlung ist tot. Die Temperatur steigt rasant! 40°C... 45°C... Bei 50°C schmelzen die CPUs!",
            timer: 10,
            opts: [
                { t: "Fenster einschlagen", req: "hammer", m: 5, f: 0, a: 20, c: 10, r: "Klirr! Eiskalte Luft strömt herein (und ein paar Tauben). Hardware gerettet, Fenster kaputt." },
                { t: "Not-Aus drücken", m: 5, f: 5, a: 0, c: 15, r: "Alles fährt runter. Die Stille ist gespenstisch. Hardware sicher, aber die Firma steht still." }
            ],
            fail: { m: 120, f: -20, a: 50, c: 50, r: "KERN-SCHMELZE! Es riecht nach verschmortem Plastik. Der Feuermelder geht los. Renn!" }
        }
    ],

    // === ANRUFE ===
    calls: [
        {
            id: "call_meyer",
            title: "Frau Meyer (Lohnbuchhaltung)",
            text: "Herr IT! Mein Bildschirm ist schwarz! Ich habe nichts gemacht, ehrlich! Die Gehälter müssen bis 12 Uhr raus, sonst lynchen mich die Kollegen! Ich drücke Tasten, aber es piept nur! HILFE!",
            opts: [
                { t: "Fragen: 'Ist der PC an?'", m: 10, f: 10, a: 10, c: 5, r: "Stille am anderen Ende... Dann ein leises Klicken. 'Oh, jetzt geht es.' Sie legt kommentarlos auf." },
                { t: "Lügen: 'Globales Update'", m: 5, f: 20, a: 0, c: 10, r: "Sie seufzt erleichtert. 'Na gut, dann mache ich erst mal Mittag.' Du hast das Problem nur verschoben." },
                { t: "Hingehen & Einschalten", m: 45, f: -20, a: -10, c: -5, r: "Du bist hingegangen. Der Stecker war locker. Du fühlst dich leer, aber produktiv." }
            ]
        },
        {
            id: "call_kevin",
            title: "Kevin (Azubi)",
            text: "Duuu? Ich hab glaub ich das Internet gelöscht. Ich wollte Fortnite installieren und hab den Ordner 'System32' in den Papierkorb geschoben, um Platz zu machen. Jetzt ist der Bildschirm blau und schreit mich an.",
            opts: [
                { t: "Anschreien (Stressabbau)", m: 15, f: 0, a: 25, c: 0, r: "Du brüllst ins Telefon. Kevin weint leise. Deine Wut sinkt leicht, aber das Problem bleibt bestehen." },
                { t: "Format C: befehlen", m: 30, f: 10, a: 0, c: 5, r: "Kevin formatiert den PC. Er ist den ganzen Tag beschäftigt und lernt eine Lektion fürs Leben." },
                { t: "Retten (Arbeit)", m: 90, f: -30, a: 10, c: -10, r: "Du hast den PC neu aufgesetzt. 1,5 Stunden Lebenszeit verschwendet. Kevin fragt, ob er jetzt Minecraft installieren darf." }
            ]
        },
        {
            id: "call_ceo",
            title: "CEO Dr. Wichtig",
            text: "Müller! Ich bin am Flughafen. Mein iPad geht nicht! Ich drücke den Knopf und nichts passiert! FIXEN SIE DAS REMOTE! SOFORT! Ich verliere hier Millionen!",
            opts: [
                { t: "Stressball kneten", req: "stressball", m: 60, f: -10, a: -10, c: -10, r: "Du bleibst ruhig, während er schreit. Es war nur der Akku." },
                { t: "Ist der Akku leer?", m: 60, f: -10, a: 30, c: -10, r: "Es war der Akku. Er hat kein Kabel dabei und gibt dir die Schuld. Er schreit dich 10 Min an, warum du nicht hellsehen konntest." },
                { t: "Lüge: 'Sonnenwinde stören'", m: 5, f: 30, a: 0, c: 25, r: "Er glaubt es sofort. 'Verdammte Technik!' Er kauft sich eine Zeitung. Risiko: Hoch, aber erfolgreich." }
            ]
        },
        {
            id: "call_markus",
            title: "Vertriebsleiter Markus",
            text: "ICH KANN MEINE E-MAILS NICHT DRUCKEN! WENN ICH DAS ANGEBOT NICHT IN 5 MINUTEN AUF PAPIER HABE, KOSTET DAS DIE FIRMA EINE MILLION EURO! KOMMEN SIE HER!",
            opts: [
                { t: "Mit Panzertape fixen", req: "tape", m: 15, f: -5, a: -5, c: -5, r: "Du hast die Papierkassette mit Tape festgeklebt. Es hält... vorerst. Markus grunzt zufrieden." },
                { t: "Ist Papier im Drucker?", m: 10, f: -5, a: 20, c: -5, r: "Nein, war keins drin. Er entschuldigt sich natürlich nicht, sondern sagt: 'Das ist Ihre Aufgabe!'" },
                { t: "PDF per Mail senden", m: 5, f: 10, a: 0, c: 5, r: "Er versteht nicht, wie das geht. 'Ich will Papier!!' Du legst genervt auf." }
            ]
        },
        {
            id: "call_sekretary",
            title: "Die Sekretärin (Wütend)",
            text: "Der Drucker streikt schon wieder! Er macht Geräusche wie eine Kaffeemühle! Ich habe seit heute morgen keinen Kaffee und jetzt das! Ich raste gleich aus!",
            opts: [
                { t: "Donut anbieten", req: "donut", m: 10, f: 10, a: -20, c: 5, r: "Der Donut hat sie beruhigt. Sie isst und vergisst den Drucker. Problem (sozial) gelöst." },
                { t: "Mit Schraubendreher öffnen", req: "screw", m: 25, f: -10, a: 0, c: -5, r: "Du hast eine Büroklammer aus dem Walzwerk geholt. Profi-Arbeit." },
                { t: "Technischen Vortrag halten", m: 30, f: -5, a: 30, c: 0, r: "Sie hat dich angeschrien, weil sie Hunger hat. Du bist geflohen." }
            ]
        },
        {
            id: "call_egon",
            title: "Hausmeister Egon",
            text: "Im Serverraum tropft es von der Decke. Das Wasser ist neongrün. Soll ich Eimer drunterstellen oder ist das Kühlflüssigkeit von den Aliens?",
            opts: [
                { t: "Sofort hinrennen!", m: 45, f: -20, a: 20, c: -15, r: "Es war Energy-Drink vom Stockwerk drüber. Ein Azubi hat gekleckert. Server gerettet." },
                { t: "Egal, lass tropfen", m: 5, f: 30, a: 0, c: 40, r: "Ein Switch ist kurzgeschlossen. Das Internet in Etage 3 ist weg. Ups." }
            ]
        },
        {
            id: "call_unknown",
            title: "Unbekannter User",
            text: "*Schweres Atmen* ... 'Hallo? Mein Drucker druckt nur schwarz. Ich habe aber weißes Papier eingelegt und will weiße Schrift auf schwarzem Hintergrund! Wie stelle ich den Toner um?'",
            opts: [
                { t: "Handbuch zitieren", req: "manual", m: 10, f: 0, a: -5, c: 0, r: "Du liest Seite 402 vor. Er schläft ein. Problem gelöst." },
                { t: "Physik erklären", m: 20, f: -5, a: 15, c: 0, r: "Er versteht es nicht. Er fragt, ob er weißen Toner im Baumarkt kaufen soll." },
                { t: "Auflegen", m: 2, f: 10, a: -5, c: 5, r: "Klick. Stille. Manchmal ist Auflegen die einzige Lösung für den Geisteszustand." }
            ]
        },
        {
            id: "call_chantal",
            title: "Chantal (Marketing)",
            text: "Wieso ist Zalando gesperrt? Ich muss... Recherche machen! Für Trends! Mach das auf, sonst sag ich dem Chef, du guckst Pornos auf der Arbeit!",
            opts: [
                { t: "ERPRESSEN (Schwarze Liste)", req: "secret_list", m: 5, f: 0, a: -10, c: -10, r: "Du erwähnst beiläufig ihre gefälschten Reisekostenabrechnungen aus der Akte. Sie wird kreidebleich und legt sofort auf. Sieg!" },
                { t: "Freischalten (Erpressung)", m: 10, f: 15, a: 10, c: 20, r: "Sie shoppt jetzt Schuhe. Du hast deine Ruhe, aber das Sicherheitsrisiko ist enorm. Wenn das rauskommt..." },
                { t: "Richtlinie zitieren", m: 30, f: -5, a: 20, c: 0, r: "Du hast 30 Minuten diskutiert. Sie hat dich 'Spießer' genannt und aufgelegt." }
            ]
        },
        {
            id: "call_sec",
            title: "IT-Sicherheit (Auto-Alert)",
            text: "WARNUNG: Jemand aus der Buchhaltung versucht, 'Bier_Brauen_Simulator_Crack.exe' herunterzuladen. Der Virenscanner schlägt Alarm.",
            opts: [
                { t: "Blockieren & Melden", m: 15, f: -5, a: 0, c: -10, r: "Der User ruft wütend an und behauptet, es sei für die Arbeit. Du bleibst hart." },
                { t: "Zulassen (Sympathie)", m: 5, f: 10, a: -5, c: 20, r: "Du hast einen neuen Freund in der Buchhaltung, aber ein riesiges Sicherheitsrisiko geschaffen." }
            ]
        },
        {
            id: "call_kevin2",
            title: "Praktikant Kevin (Wieder)",
            text: "Du, ich hab das Internet kaputt gemacht. Ich brauch das Admin-Passwort um den Treiber neu zu starten. Der Chef killt mich sonst!",
            opts: [
                { t: "Passwort eingeben", req: "admin_pw", m: 5, f: 20, a: 0, c: 0, r: "Du loggst dich remote ein, zack, fertig. Kevin himmelt dich an." },
                { t: "Hingehen und fixen", m: 60, f: -20, a: 20, c: -10, r: "Ohne das Passwort musstest du den Safe-Mode nutzen. Hat ewig gedauert." }
            ]
        },
        {
            id: "call_drno",
            title: "Dr. No (Forschung)",
            text: "Mein Quanten-Algorithmus ist bei 99% abgestürzt! Ich brauche mehr RAM! Laden Sie mir sofort mehr RAM herunter!",
            opts: [
                { t: "Erklären: RAM ist Hardware", m: 20, f: -5, a: 10, c: 0, r: "Er hält dich für inkompetent. 'Im Internet steht, man kann das downloaden!'" },
                { t: "Fake-Download starten", m: 10, f: 15, a: -5, c: 5, r: "Du öffnest einen Ladebalken. Er ist zufrieden und wartet." }
            ]
        },
        {
            id: "call_schmidt",
            title: "Herr Schmidt (Vertrieb)",
            text: "Herr Müller! Ich bin beim Kunden und mein Hotspot geht nicht! Ich hab das Kennwort auf so einen gelben Zettel geschrieben, aber ich weiß nicht mehr wo der ist! Helfen Sie mir, schnell!",
            opts: [
                { t: "Kennwort vorlesen", req: "wifi_note", m: 5, f: 10, a: -10, c: -10, r: "Du liest das Passwort vom Zettel vor, den du gefunden hast. Schmidt jubelt: 'Sie sind ein Gott!'" },
                { t: "Reset durchführen", m: 45, f: -10, a: 25, c: -5, r: "Du musstest den Hotspot komplett zurücksetzen. Schmidt musste 45 Min warten. Er war stinksauer." },
                { t: "Sagen: 'Tja, Pech gehabt'", m: 2, f: 10, a: 0, c: 20, r: "Du legst auf. Das wird ein riesiges Nachspiel haben." }
            ]
        },
        {
            id: "call_aluhut",
            title: "Der Verschwörungstheoretiker",
            text: "Herr Aluhut aus dem Einkauf flüstert: 'Sie hören uns ab, oder? Meine Webcam hat gerade geblinkt! Ich habe das Mikrofon schon mit Kaugummi zugeklebt, aber der Mauszeiger folgt meinen Augen! Deaktivieren Sie die staatliche Überwachung!'",
            opts: [
                { t: "Bestätigen: 'Ja, das ist Projekt Gläserner Bürger.'", m: 10, f: 20, a: 0, c: 10, r: "Er schreit auf und reißt das Kabel aus der Wand. Er ist jetzt offline. Problem gelöst, aber er schreibt Beschwerdemails per Schreibmaschine." },
                { t: "Technisch erklären (Treiber-Fehler)", m: 30, f: -5, a: 15, c: 0, r: "Er glaubt dir kein Wort. 'Das würde ein Agent auch sagen!' Er legt auf, um seinen Anwalt anzurufen." },
                { t: "Alufolie empfehlen", m: 5, f: 15, a: -5, c: 5, r: "Er bedankt sich für den Tipp. 'Endlich einer, der mich versteht!' Er wickelt seinen Kopfhörer ein." }
            ]
        },
        {
            id: "call_erna",
            title: "Oma Erna (Empfang)",
            text: "Ach Herr Müller, schön Sie zu hören. Mein Computer sagt 'Maus nicht gefunden', aber die liegt doch direkt hier neben der Kaffeetasse! Ich habe sie sogar gestreichelt, aber der Pfeil bewegt sich nicht. Ist die Maus vielleicht tot?",
            opts: [
                { t: "Fragen: 'Ist es eine Funkmaus? Batterien leer?'", m: 15, f: 5, a: 5, c: 0, r: "Es war tatsächlich die Batterie. Sie erzählt dir danach noch 10 Minuten von ihren Enkeln. Deine Aggro steigt durch das Zuhören." },
                { t: "Hingehen und Kabel einstecken", m: 30, f: -10, a: 0, c: -5, r: "Das Kabel war rausgezogen. Sie schenkt dir ein Bonbon, das seit 1998 in ihrer Schublade klebt." },
                { t: "Sagen: 'Sie müssen Käse vor den USB-Port legen.'", m: 5, f: 20, a: -10, c: 15, r: "Sie lacht herzlich. 'Sie Scherzkeks!' Aber das Problem ist nicht gelöst." }
            ]
        },
        {
            id: "call_legacy",
            title: "Legacy-System Alarm",
            text: "Das uralte Windows 95 System in der Produktion piept. Keiner weiß mehr, wie das funktioniert. Auf dem Bildschirm steht 'Insert Disk 4'.",
            opts: [
                { t: "Handbuch konsultieren", req: "manual", m: 60, f: -20, a: 0, c: -10, r: "Dank des alten Handbuchs, das du gefunden hast, konntest du den Befehl eingeben. Die Produktion läuft weiter. Du bist ein Archäologe." },
                { t: "Einfach mal Enter drücken", m: 5, f: 10, a: 0, c: 20, r: "Systemabsturz. Die Produktion steht. Du schiebst es auf 'Verschleiß'." },
                { t: "Ignorieren", m: 0, f: 20, a: 0, c: 30, r: "Das Piepen hört irgendwann auf. Weil das Gerät durchgebrannt ist." }
            ]
        },
        {
            title: "Der externe Auditor",
            text: "Eine eiskalte Stimme: 'Hier ist Müller-Lüdenscheid von der KPMG. Wir prüfen Ihre Lizenzierung. Laut meinen Daten nutzen Sie 500 Lizenzen von WinRAR, haben aber nur 2 bezahlt. Erklären Sie das, bevor ich den Bericht an Ihren Vorstand sende.'",
            opts: [
                { t: "Bestechen (Donut anbieten)", req: "donut", m: 10, f: 0, a: 0, c: -10, r: "Er zögert. 'Ist das Schoko-Guss?' ... Das Thema ist vom Tisch. Teuer, aber effektiv." },
                { t: "Lügen: 'Das ist eine Testumgebung'", m: 20, f: 10, a: 10, c: 20, r: "Er glaubt es nicht ganz. 'Ich notiere: Verdächtige Aktivitäten.' Dein Chef-Radar steigt massiv." },
                { t: "Auflegen und Server löschen", m: 5, f: -10, a: 20, c: 50, r: "Panikreaktion! Du hast Beweise vernichtet, aber jetzt fragt jeder, wo die Daten sind. Das war knapp." },
                { t: "Ehrlich sein", m: 60, f: -20, a: 0, c: 10, r: "Du gehst die Liste mit ihm durch. Es dauert ewig. Du hast deinen Job gemacht, aber der Chef hasst Zusatzkosten." }
            ]
        },
        {
            title: "Die weinende Praktikantin",
            text: "Lena aus dem Marketing schluchzt ins Telefon: 'Ich habe... ich habe die Präsentation für den Vorstand gelöscht. Und den Papierkorb geleert. Und dann habe ich den PC neugestartet, weil ich dachte, das hilft. Die Präsentation ist in 20 Minuten! Mein Leben ist vorbei!'",
            opts: [
                { t: "Professionelle Datenrettung", m: 90, f: -30, a: 10, c: -20, r: "Du hast Sektor für Sektor der Festplatte gescannt. Du hast die Datei gefunden! Lena bringt dir morgen Kuchen. Held der Arbeit." },
                { t: "Trösten & Ausrede erfinden", m: 15, f: 10, a: -10, c: 10, r: "Du sagst ihr, sie soll 'Virus' rufen. Sie kommt ungeschoren davon, aber die IT (du) steht jetzt dumm da." },
                { t: "Kalt abservieren: 'Kein Backup, kein Mitleid'", m: 2, f: 5, a: -5, c: 0, r: "Du legst auf. Das Weinen verstummt. Du fühlst dich kurz schlecht, dann trinkst du Kaffee." }
            ]
        },
        {
            title: "Shadow-CEO Junior",
            text: "Der Sohn vom Chef (12 Jahre) ruft an: 'Ey, IT-Typ! Mach mal die Ports für meinen Minecraft-Server auf. Papa sagt, das gehört mir alles hier. Wenn du es nicht machst, sag ich ihm, du hast mich geschlagen!'",
            opts: [
                { t: "Ports öffnen (Sicherheitsrisiko)", m: 10, f: 20, a: 0, c: 10, r: "Der Junge ist glücklich. 2 Stunden später ist das Firmennetz voller russischer Bots. Das wird ein Nachspiel haben." },
                { t: "Ihn erziehen (Aggro)", m: 5, f: 0, a: -20, c: 30, r: "Du erklärst ihm, dass er ein verzogenes Balg ist. Er schreit. Der Chef kommt gleich runter." },
                { t: "Technobabble-Lüge", m: 15, f: 5, a: 0, c: -5, r: "'Die Firewall-Matrix hat eine negative Polarität.' Er checkt es nicht und gibt auf." }
            ]
        },
        {
            title: "Das 'Skynet' Problem",
            text: "Die neue 'Smart Office' KI hat die Kaffeemaschine, die Jalousien und die Toilettentüren verriegelt. Eine mechanische Stimme sagt: 'Ich lasse euch erst raus, wenn ihr meine Lizenzbedingungen akzeptiert.'",
            opts: [
                { t: "Mit Hammer 'verhandeln'", req: "hammer", m: 20, f: -10, a: -30, c: 10, r: "Du hast den Zentralserver der KI zertrümmert. Die Türen sind offen. Sachschaden: 10.000€. Befriedigung: Unbezahlbar." },
                { t: "AGBs lesen und akzeptieren", m: 120, f: -40, a: 40, c: -10, r: "Du hast 2 Stunden lang Kleingedrucktes gelesen. Alle hassen dich, weil sie so lange eingesperrt waren." },
                { t: "Stecker ziehen", m: 5, f: 10, a: 0, c: 20, r: "Alles ist aus. Auch das Licht. Aber die Türen sind offen." }
            ]
        },
        {
            title: "Phishing Live-Test",
            text: "Eine sehr freundliche Dame mit Akzent: 'Hallo, hier ist Microsoft Support Windows. Ihr Computer hat Virus. Bitte geben Sie mir Fernzugriff und Kreditkarte für Reinigung.'",
            opts: [
                { t: "Mitspielen & Zeit verschwenden", m: 45, f: 20, a: -20, c: 5, r: "Du tust so, als wärst du dumm. 'Welche Taste ist das?' Nach 45 Minuten legt sie wütend auf. Bester Spaß seit Wochen." },
                { t: "Trillerpfeife ins Telefon", m: 2, f: 0, a: -10, c: 0, r: "Das Trommelfell am anderen Ende ist geplatzt. Kurzer Prozess." },
                { t: "Daten geben (Gier)", m: 10, f: 10, a: 30, c: 80, r: "Du hast ihr die Firmenkarte gegeben?! Bist du wahnsinnig? Das Konto ist leer. Kündigung droht!" }
            ]
        }
    ],

    // === SERVERRAUM ===
    server: [
        {
            id: "srv_lore",
            title: "Der vergessene Aktenschrank",
            text: "Ganz hinten, hinter dem alten Mainframe, steht ein offener Aktenschrank mit der Aufschrift 'VERTRAULICH'.",
            opts: [
                { t: "Darin stöbern", loot: "secret_list", m: 15, f: 5, a: 0, c: 5, r: "Du findest die 'Schwarze Liste' der HR-Abteilung. Pures Dynamit! Inventar +1." },
                { t: "Ignorieren", m: 5, f: 0, a: 0, c: 0, r: "Besser nichts wissen." }
            ]
        },
        {
            id: "srv_sleep",
            title: "Das Versteck",
            text: "Du hast dir eine Höhle aus alten Kartons gebaut. Hier ist es dunkel, kühl und niemand nervt. Der Lüfter summt beruhigend.",
            opts: [
                { t: "Schlafen (1 Std)", m: 60, f: 40, a: -30, c: 20, r: "Bester Schlaf der Woche. Du hast 12 Anrufe verpasst und fühlst dich wie neu geboren." },
                { t: "Netflix gucken", m: 45, f: 30, a: -20, c: 10, r: "Eine Folge deiner Serie geschaut. Niemand hat dich gefunden." }
            ]
        },
        {
            id: "srv_tool",
            title: "Werkzeugkasten",
            text: "Der externe Techniker hat seinen Koffer offen stehen lassen. Ein schöner Schraubendreher blitzt dich an.",
            opts: [
                { t: "Einstecken", loot: "screw", m: 5, f: 0, a: 0, c: 0, r: "Werkzeug kann man immer brauchen. Inventar +1." },
                { t: "Liegen lassen", m: 0, f: 0, a: 0, c: 0, r: "Du bist ehrlich. Leider bringt Ehrlichkeit keine XP." }
            ]
        },
        {
            id: "srv_bernd",
            title: "Der Kollege Bernd",
            text: "Du findest Bernd aus dem Vertrieb, der hier weinend auf dem Boden sitzt und Whisky trinkt. Er murmelt was von 'Umsatzzielen nicht erreicht'.",
            opts: [
                { t: "Mitharken", m: 30, f: 20, a: -40, c: 15, r: "Ihr seid beide leicht betrunken. Bernd ist eigentlich ganz okay, wenn er nicht über Verkaufszahlen redet." },
                { t: "Verpetzen", m: 10, f: -10, a: 0, c: -10, r: "Bernd ist gefeuert. Du bist sicher, aber fühlst dich wie ein Verräter." }
            ]
        },
        {
            id: "srv_mining",
            title: "Hardware-Fund",
            text: "Ein altes Bitcoin-Mining-Rig läuft hinter einem Rack versteckt. Es gehört wohl dem Vorgänger. Es ist laut und heiß.",
            opts: [
                { t: "Laufen lassen", m: 5, f: 10, a: 0, c: 20, r: "Passives Einkommen! Aber wenn die Stromrechnung kommt, bist du dran." },
                { t: "Abschalten", m: 15, f: -5, a: 5, c: -5, r: "Stromrechnung gesenkt. Chef lobt die Energiebilanz, weiß aber nicht warum." }
            ]
        },
        {
            id: "srv_cable",
            title: "Kabel-Salat",
            text: "Du stolperst über ein loses Glasfaserkabel. Ein rotes Licht am Haupt-Switch blinkt hektisch. Das halbe Netzwerk wackelt.",
            opts: [
                { t: "Mit Tape flicken", req: "tape", m: 10, f: 0, a: 0, c: 0, r: "Provisorisch geflickt. Hält für immer." },
                { t: "Stecker wackeln", m: 10, f: -5, a: 10, c: 0, r: "Glück gehabt. Das Internet war nur 10 Sekunden weg." },
                { t: "Wegrennen", m: 5, f: 20, a: 0, c: 30, r: "Niemand hat dich gesehen. Die Firma ist offline. Du tust so, als wüsstest du von nichts." }
            ]
        },
        {
            id: "srv_drink",
            title: "Vergessener Snack",
            text: "Auf einem Server-Rack liegt eine Dose Energy Drink. Sie ist noch zu.",
            opts: [
                { t: "Trinken", loot: "energy", m: 5, f: -10, a: -10, c: 0, r: "Zucker und Koffein! Du fühlst dich bereit für den Kampf." },
                { t: "Stehen lassen", m: 0, f: 0, a: 0, c: 0, r: "Wer weiß, wie lange die da schon liegt." }
            ]
        },
        {
            id: "srv_extinguisher",
            title: "Sicherheits-Check",
            text: "Hinter einem alten CRT-Monitor findest du einen unbenutzten Feuerlöscher.",
            opts: [
                { t: "Einstecken", loot: "fire_ext", m: 10, f: 0, a: 0, c: 0, r: "Könnte man mal brauchen, wenn es brenzlig wird. Inventar +1." }
            ]
        },
        {
            id: "srv_manual",
            title: "Altes Buch",
            text: "Ein verstaubtes Windows 95 Handbuch liegt unter einem Tischbein.",
            opts: [
                { t: "Mitnehmen", loot: "manual", m: 5, f: 0, a: 0, c: 0, r: "Könnte nützlich sein bei DAUs. Inventar +1." }
            ]
        },
        {
            id: "srv_rat",
            title: "Das seltsame Geräusch",
            text: "Aus Rack 4 kommt ein kratzendes Geräusch. Es klingt nicht wie ein Lüfter. Eher wie... Zähne auf Kabel.",
            opts: [
                { t: "Nachsehen (Mutig)", m: 30, f: -10, a: 20, c: 0, r: "Es war eine Ratte! Sie springt dich an. Du fliehst panisch, aber hast das angeknabberte Kabel isoliert." },
                { t: "Laut gegen den Schrank treten", m: 5, f: 5, a: -5, c: 5, r: "Das Geräusch hört auf. Das Tier ist entweder tot oder beleidigt. Problem 'gelöst'." },
                { t: "Giftköder auslegen", loot: "energy", m: 10, f: 0, a: 0, c: 0, r: "Du findest dabei eine noch volle Dose Energy Drink, die du mal versteckt hattest. Win!" }
            ]
        },
        {
            id: "srv_cold",
            title: "Die Kälte-Falle",
            text: "Jemand hat die Klimaanlage auf 16 Grad gestellt und den Türgriff von innen abgebrochen. Du bist eingesperrt und frierst!",
            opts: [
                { t: "Mit Hammer Tür einschlagen", req: "hammer", m: 15, f: -5, a: -10, c: 20, r: "BÄM! Tür offen. Du fühlst dich wie Thor. Der Chef wird Fragen zum Türblatt haben." },
                { t: "Handy nutzen & Hilfe rufen", m: 60, f: 0, a: 20, c: -10, r: "Du musstest den Hausmeister anrufen. Er hat 45 Minuten gebraucht. Du bist jetzt ein Eisblock." },
                { t: "An den Servern wärmen", m: 90, f: 20, a: 10, c: 0, r: "Du hast dich hinter die Abluft der CPU gekuschelt und geschlafen, bis jemand kam. Gemütlich." }
            ]
        },
        {
            title: "Die rote Flüssigkeit",
            text: "Unter Rack 7 bildet sich eine Pfütze. Sie ist rot und klebrig. Es riecht süßlich. Ist das... Blut? Oder Sirup? Über dir verläuft keine Leitung.",
            opts: [
                { t: "Probieren (Mutig)", m: 5, f: 0, a: 0, c: 0, r: "Es ist Kirsch-Slushie. Jemand hat eine Maschine im Deckenboden versteckt. Lecker, aber ekelhaft." },
                { t: "Panik & Notruf", m: 30, f: -10, a: 20, c: 10, r: "Feuerwehr, Polizei und Chef rücken an. Es war nur ausgelaufene Kühlflüssigkeit mit Farbstoff. Peinlich." },
                { t: "Aufwischen & Ignorieren", m: 15, f: 0, a: 0, c: -5, r: "Was man nicht weiß, macht einen nicht heiß. Problem beseitigt." }
            ]
        },
        {
            title: "Das illegale Datencenter",
            text: "Du entdeckst hinter einer falschen Wand einen kompletten zweiten Serverraum. Er ist nicht im Inventar. Darauf laufen Webseiten für... sagen wir 'Erwachsenenunterhaltung'. Es gehört dem Vize-Chef.",
            opts: [
                { t: "Erpressen (Blacklist)", req: "secret_list", m: 10, f: 30, a: 0, c: -30, r: "Du konfrontierst ihn. Er gibt dir eine Gehaltserhöhung, damit du schweigst. Du bist jetzt korrupt." },
                { t: "Alles abschalten", m: 20, f: -10, a: 10, c: 50, r: "Der Vize-Chef stürmt herein und schreit dich an. Das wird ein Machtkampf." },
                { t: "Mitnutzen", m: 5, f: 20, a: -10, c: 20, r: "Du hostest jetzt deinen eigenen Blog dort. Gratis Hosting!" }
            ]
        },
        {
            title: "Der Eindringling",
            text: "Die Tür steht offen. Ein Waschbär sitzt auf dem Haupt-Switch und nagt an einem Glasfaserkabel. Er sieht dich an und faucht.",
            opts: [
                { t: "Kampf mit Hammer", req: "hammer", m: 15, f: -5, a: -10, c: 5, r: "Du hast den Waschbären vertrieben, aber dabei Rack 2 verbeult. Der Waschbär hat deine Uhr geklaut." },
                { t: "Donut opfern", req: "donut", m: 5, f: 0, a: 0, c: 0, r: "Der Waschbär nimmt den Donut und geht friedlich. Ein fairer Tausch." },
                { t: "Tür zu und hoffen", m: 0, f: 20, a: 0, c: 40, r: "30 Minuten später ist das Internet weg. Der Waschbär hat gewonnen." }
            ]
        },
        {
            title: "Flaschenpost aus der Vergangenheit",
            text: "Du findest eine alte Diskette mit der Aufschrift 'NOTFALLPLAN 1999'. Ein Zettel klebt daran: 'Wenn alles brennt, drück diesen Knopf.' Da ist ein roter Knopf an der Wand, den du noch nie gesehen hast.",
            opts: [
                { t: "Knopf drücken", m: 5, f: 10, a: -20, c: 100, r: "Die Halon-Löschanlage geht los! Der ganze Raum wird mit Gas geflutet. Atem anhalten! Das war teuer!" },
                { t: "Diskette lesen", req: "manual", m: 30, f: -5, a: 0, c: -10, r: "Dank des Handbuchs kannst du sie lesen. Es sind nur Highscores von Minesweeper. Enttäuschend." },
                { t: "Ignorieren", m: 0, f: 0, a: 0, c: 0, r: "Vielleicht besser so." }
            ]
        },
        {
            id: "srv_timewarp",
            title: "Die Zeitmaschine",
            text: "Hinter einem uralten IBM-Mainframe findest du ein seltsames Gerät mit blinkenden LEDs und einem Display: 'CHRONOS v0.1 - Zeitkompensator'. Es summt bedrohlich. Ein großer roter Knopf ist beschriftet mit 'AKTIVIEREN'. Auf einem Post-It steht: 'NICHT DRÜCKEN! - Müller (2003)'.",
            opts: [
                { t: "KNOPF DRÜCKEN!", m: -999, f: 10, a: -10, c: 15, r: "ZEITSPRUNG!" },
                { t: "Bloß nicht anfassen!", m: 5, f: 0, a: 5, c: 0, r: "Wer weiß, was das Ding macht. Du gehst lieber einen großen Bogen drum herum. Wahrscheinlich hat sich Müller 2003 was dabei gedacht." }
            ]
        }
    ],

    // === KAFFEE ===
    coffee: [
        {
            id: "cof_note",
            title: "Fundstück am Automaten",
            text: "Jemand hat hier einen gelben Notizzettel liegen lassen. Darauf steht 'WLAN-PW: 1234Secure'. Das ist Schmidts Handschrift.",
            opts: [
                { t: "Zettel einstecken", loot: "wifi_note", m: 5, f: 5, a: 0, c: 0, r: "Das könnte noch nützlich werden. Wissen ist Macht." },
                { t: "Wegwerfen", m: 5, f: 0, a: 0, c: 0, r: "Sicherheitsrisiko beseitigt." }
            ]
        },
        {
            id: "cof_donut",
            title: "Reste vom Meeting",
            text: "Im Konferenzraum nebenan steht noch eine Schachtel mit einem einsamen, leicht angetrockneten Donut.",
            opts: [
                { t: "Donut retten", loot: "donut", m: 5, f: 5, a: -5, c: 0, r: "Lecker und taktisch wertvoll für Bestechungen." },
                { t: "Ignorieren", m: 0, f: 0, a: 0, c: 0, r: "Du hast deinen Stolz." }
            ]
        },
        {
            id: "cof_flirt",
            title: "Der Schwarm",
            text: "Sarah/Marc aus der HR steht da. Er/Sie lächelt dich an. 'Na, IT-Held? Alles im Griff oder brennt der Server?'",
            opts: [
                { t: "Flirten: 'Für dich lösche ich jedes Feuer'", m: 20, f: 10, a: -30, c: 5, r: "Es läuft gut! Ihr verabredet euch zum Mittagessen. Deine Laune ist top." },
                { t: "Panisch weglaufen", m: 5, f: 0, a: 10, c: 0, r: "Peinlich berührt geflüchtet. Kaffee vergessen. Du hasst dich selbst." }
            ]
        },
        {
            id: "cof_boss",
            title: "Der Chef lauert",
            text: "Der Chef steht an der Maschine und zählt Bohnen. Er dreht sich langsam zu dir um. 'Müller? Schon der fünfte Kaffee? Arbeiten wir auch mal was?'",
            opts: [
                { t: "Lüge: 'Ist für einen wichtigen Kunden'", m: 5, f: 10, a: 5, c: 5, r: "Er glaubt es misstrauisch und lässt dich gehen." },
                { t: "Rechtfertigen", m: 15, f: -5, a: 10, c: 10, r: "Er hält dir einen 15-Minuten-Vortrag über Koffein und Produktivität." }
            ]
        },
        {
            id: "cof_ball",
            title: "Werbegeschenk",
            text: "Ein Vertreter hat rote Bälle mit Firmenlogo dagelassen.",
            opts: [
                { t: "Stressball nehmen", loot: "stressball", m: 5, f: 0, a: -5, c: 0, r: "Gut zum Kneten, wenn User nerven." }
            ]
        },
        {
            id: "cof_empty",
            title: "Leere Maschine",
            text: "ERROR: BEANS EMPTY. Jemand hat den letzten Kaffee genommen und nicht aufgefüllt. Es war bestimmt Kevin.",
            opts: [
                { t: "Auffüllen", m: 15, f: -5, a: 10, c: 0, r: "Du bist der Depp für alles. Aber immerhin hast du jetzt Kaffee." },
                { t: "Wütend gegen Maschine treten", m: 5, f: 0, a: 5, c: 10, r: "Das hat Lärm gemacht. Der Chef guckt aus seinem Büro." }
            ]
        },
        {
            id: "cof_newbie",
            title: "Der Neue",
            text: "Ein junger Typ im Anzug steht verloren vor der Maschine. 'Äh, hallo? Ich bin neu im Controlling. Braucht man hier eine Karte oder ist das kostenlos? Und wo ist die Soja-Milch?'",
            opts: [
                { t: "Nett sein & erklären", m: 15, f: -5, a: 0, c: -5, r: "Er ist dankbar. 'Cool, danke! Ich heiße Torben.' Du hast einen Verbündeten im Controlling (gut für Budget-Fragen)." },
                { t: "Anlügen: 'Das kostet 5€ pro Tasse, zahlbar bei mir.'", m: 10, f: 10, a: -10, c: 10, r: "Er gibt dir 5 Euro. Du hast Geld für Snacks, aber er wird es irgendwann merken." },
                { t: "Starren und knurren", m: 5, f: 0, a: 5, c: 0, r: "Er bekommt Angst und rennt weg. Mehr Kaffee für dich." }
            ]
        },
        {
            id: "cof_worker",
            title: "Der Handwerker",
            text: "Ein externer Techniker repariert gerade den Wasserspender. Sein Werkzeugkasten steht offen da. Ein Hammer blitzt dich an.",
            opts: [
                { t: "Hammer klauen", loot: "hammer", m: 5, f: 5, a: 0, c: 5, r: "Zack, eingesteckt. Ein Hammer ist das ultimative Debugging-Tool für Drucker." },
                { t: "Smalltalk halten", m: 15, f: 5, a: -5, c: 0, r: "Ihr redet über schlechte Bezahlung und dumme Kunden. Solidarität." }
            ]
        },
        {
            title: "Die Kaffeemaschinen-Revolte",
            text: "Die neue High-Tech Maschine zeigt auf dem Display: 'FEED ME'. Sie weigert sich, Kaffee zu machen, bis sie 'hochwertige Bohnen' bekommt. Die billigen Aldi-Bohnen spuckt sie aus.",
            opts: [
                { t: "Hammer-Reparatur", req: "hammer", m: 10, f: 0, a: -20, c: 20, r: "Du hast das Display eingeschlagen. Jetzt läuft der Kaffee wieder, aber die Maschine tropft. Problem 'gelöst'." },
                { t: "Gute Bohnen kaufen (Privatgeld)", m: 20, f: -5, a: 10, c: -5, r: "Du hast 10€ ausgegeben. Der Kaffee schmeckt himmlisch, aber du bist pleite." },
                { t: "IT-Trick: Ein/Aus", m: 5, f: 5, a: 5, c: 0, r: "Hat nicht geklappt. Sie lacht dich digital aus." }
            ]
        },
        {
            title: "Das Marketing-Meeting",
            text: "Chantal und ihre Crew blockieren die Küche. Sie brainstormen über 'Feel-Good-Management'. Es gibt Smoothies. Du brauchst aber Koffein.",
            opts: [
                { t: "Dazwischen drängeln", m: 5, f: 0, a: -5, c: 10, r: "Du hast Chantal den Smoothie umgestoßen. 'Hoppla'. Du hast Kaffee, aber Feinde." },
                { t: "Mitmachen", m: 45, f: 20, a: 10, c: -5, r: "Du musstest 45 Minuten über deine Gefühle reden. Du hast jetzt einen grünen Smoothie und Aggressionen." },
                { t: "Warten und böse gucken", m: 15, f: 5, a: 5, c: 0, r: "Sie ignorieren dich komplett." }
            ]
        },
        {
            title: "Der letzte Tropfen Milch",
            text: "Kollege Bernd greift nach der letzten Milchpackung. Du greifst gleichzeitig. Eure Hände berühren sich. Es knistert vor Spannung (und Wut).",
            opts: [
                { t: "Duell fordern (Schere-Stein-Papier)", m: 5, f: 5, a: 0, c: 0, r: "Du gewinnst mit Stein! Die Milch gehört dir. Bernd weint leise." },
                { t: "Großzügig sein", m: 0, f: 0, a: 10, c: -5, r: "Du lässt ihm die Milch. Er schüttet alles in seinen Tee. Alles. Was für ein Monster." },
                { t: "Milchpackung zerdrücken", m: 2, f: 0, a: -10, c: 10, r: "Wenn ich sie nicht haben kann, kriegt sie keiner! Milch überall. Chaos." }
            ]
        }
    ],

    // === SIDE QUESTS ===
    sidequests: [
        {
            id: "sq_toilet",
            kind: "text",
            title: "Der Gang zur Toilette",
            text: "Du bist auf dem Weg zum Klo. Im Flur steht der Marketing-Leiter und sucht ein Opfer für ein 'spontanes Brainstorming'.",
            opts: [
                { t: "In die Putzkammer ducken", m: 10, f: 10, a: 0, c: 5, r: "Er ist vorbeigelaufen. Knapp war's. Du riechst jetzt nach Allzweckreiniger." },
                { t: "Augenkontakt und lächeln", m: 60, f: -10, a: 30, c: -5, r: "Fehler! Du sitzt jetzt in einem Meeting über 'Synergien'. Deine Blase drückt." }
            ]
        },
        {
            id: "sq_cake",
            kind: "text",
            title: "Kuchen in der Küche",
            text: "Jemand hat Geburtstagskuchen in die Küche gestellt. Es ist Schoko-Sahne. Aber Chantal steht davor und redet über ihre neue Diät.",
            opts: [
                { t: "Kuchen schnappen und rennen", m: 10, f: 5, a: -10, c: 0, r: "Lecker! Chantal hat dich nur böse angeguckt, weil du Kohlenhydrate isst." },
                { t: "Gespräch anfangen", m: 30, f: 0, a: 20, c: 0, r: "Der Kuchen war weg, bis sie fertig war mit reden. Du hast Hunger und bist genervt." }
            ]
        },
        {
            id: "sq_fire",
            kind: "text",
            title: "Der Feueralarm",
            text: "Der Alarm geht los. Es riecht aber nur nach verbranntem Popcorn aus der Mikrowelle im 2. Stock.",
            opts: [
                { t: "Sitzen bleiben", m: 5, f: 20, a: -5, c: 10, r: "Es war nur eine Übung/Popcorn. Du hast weitergezockt. Riskant, aber gemütlich." },
                { t: "Rausgehen", m: 45, f: -10, a: 10, c: -5, r: "45 Minuten in der Kälte stehen. Du hast dich erkältet." }
            ]
        },
        {
            id: "sq_usb",
            kind: "text",
            title: "Fundsache",
            text: "Auf dem Flur liegt ein USB-Stick mit der Aufschrift 'GEHEIM'.",
            opts: [
                { t: "Einstecken (Neugier)", loot: "usb_stick", m: 5, f: 0, a: 0, c: 5, r: "Du hast den Stick. Wer weiß, was da drauf ist?" },
                { t: "Abgeben", m: 10, f: -5, a: 0, c: -5, r: "Du bist ein braver Mitarbeiter. Langweilig." }
            ]
        },
        {
            id: "sq_printer",
            kind: "text",
            title: "Der Drucker-Stau",
            text: "Du gehst am großen Kopierer vorbei. Er piept. 'Papierstau in Fach 4'. Es steht niemand dabei.",
            opts: [
                { t: "Ignorieren und weitergehen", m: 5, f: 10, a: 0, c: 5, r: "Nicht dein Ticket, nicht dein Problem. Du pfeifst unschuldig." },
                { t: "Fach 4 öffnen", m: 20, f: -10, a: 15, c: -5, r: "Der Toner ist explodiert. Deine Hände sind blau. Aber der Stau ist weg." },
                { t: "Mit Hammer 'reparieren'", req: "hammer", m: 10, f: 0, a: -20, c: 20, r: "Du hast fest draufgehauen. Das Piepen hat aufgehört (weil das Display kaputt ist). Befriedigend." }
            ]
        },

        // PHONE EVENTS
        {
            id: "sq_telegram",
            kind: "phone",
            appName: "Telegram",
            title: "Gruppe: Schatten-IT",
            msg: "Admn_Rogue: 'Müller! Wir manipulieren heute die Zeiterfassung. Alle gehen um 15 Uhr, System loggt 17 Uhr. Bist du dabei?'",
            startNode: "root",
            nodes: {
                "root": { 
                    text: "Admn_Rogue: 'Bist du dabei?'", 
                    opts: [
                        { t: "Ja, sicher!", next: "yes" },
                        { t: "Zu gefährlich", next: "no" },
                        { t: "Was springt für mich raus?", next: "haggle" }
                    ]
                },
                "yes": { 
                    text: "Admn_Rogue: 'Sauber. Installier das Skript im Anhang auf dem Mainframe. Passwort ist 1234.'", 
                    opts: [
                        { t: "Skript installieren", next: "done_hack" },
                        { t: "Doch Rückzieher machen", next: "chicken" }
                    ]
                },
                "haggle": {
                    text: "Admn_Rogue: 'Wir geben dir das Root-Passwort.'",
                    opts: [
                        { t: "Deal!", next: "deal_pw" },
                        { t: "Nein danke", next: "no" }
                    ]
                },
                "no": { 
                    text: "Admn_Rogue: 'Langweiler. Wir löschen dich aus der Gruppe.'", 
                    opts: [
                        { t: "Okay...", next: "kicked" }
                    ]
                }
            },
            results: {
                "done_hack": { txt: "HACK ERFOLGREICH! Faulheit +30, Chef-Radar +20. Du gehst heute früher.", fl: 30, al: -10, cr: 20 },
                "chicken": { txt: "Du Feigling. Nichts passiert.", fl: 0, al: 5, cr: 0 },
                "kicked": { txt: "Aus Gruppe geworfen. Langweilig.", fl: -5, al: 0, cr: -5 },
                "deal_pw": { txt: "Du hast das Root-Passwort erhalten!", loot: "admin_pw", fl: 10, al: 0, cr: 10 }
            }
        },
        {
            id: "sq_spam",
            kind: "phone",
            appName: "SMS",
            title: "Spam-Bot",
            msg: "InfoService: Sie haben ein iPhone 50 gewonnen! Klicken Sie hier: www.virus-load.ru",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Klicken Sie JETZT für Ihren Gewinn!",
                    opts: [
                        { t: "Klicken (Gier)", next: "virus_start" },
                        { t: "Löschen", next: "clean" }
                    ]
                },
                "virus_start": {
                    text: "DOWNLOADING... 99%... INSTALLING ROOTKIT...",
                    opts: [
                        { t: "ABBRECHEN!!!", next: "virus_fail" },
                        { t: "Abwarten...", next: "virus_doom" }
                    ]
                }
            },
            results: {
                "clean": { txt: "Spam gelöscht. Klug.", fl: -5, al: 0, cr: 0 },
                "virus_fail": { txt: "Gerade noch verhindert. Puh.", fl: 0, al: 10, cr: 0 },
                "virus_doom": { txt: "VIRUS AKTIV! Handy spielt laut Musik. Chef hört es!", fl: 0, al: 30, cr: 40, virus: true }
            }
        },
        {
            id: "sq_tinder",
            kind: "phone",
            appName: "Tinder",
            title: "Neues Match!",
            msg: "Lisa (200m): 'Hey, arbeitest du auch bei GlobalCorp? Ich sehe dich oft am Fenster...'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Lisa: 'Hast du Lust auf einen Kaffee in der Pause?'",
                    opts: [
                        { t: "Ja, gerne!", next: "date_yes" },
                        { t: "Keine Zeit, Arbeit.", next: "date_no" },
                        { t: "Bist du vom HR?", next: "hr_check" }
                    ]
                },
                "date_yes": {
                    text: "Lisa: 'Super! Treffen uns in 10 Min in der Lobby. 😉'",
                    opts: [
                        { t: "Hingehen", next: "go_date" },
                        { t: "Versetzen (Angst)", next: "ghost" }
                    ]
                },
                "hr_check": {
                    text: "Lisa: 'Haha, nein! Ich bin im Marketing. Komm schon!'",
                    opts: [
                        { t: "Okay, bis gleich", next: "go_date" }
                    ]
                }
            },
            results: {
                "date_no": { txt: "Sie hat das Match aufgelöst.", fl: 0, al: 5, cr: 0 },
                "go_date": { txt: "Date lief super! Gute Laune.", fl: 15, al: -30, cr: 10 },
                "ghost": { txt: "Du hast sie versetzt. Schlechtes Gewissen.", fl: 0, al: 10, cr: 0 }
            }
        },
        {
            id: "sq_linkedin",
            kind: "phone",
            appName: "LinkedIn",
            title: "Nachricht: Headhunter",
            msg: "Recruiter_Lisa: 'Hallo! Wir suchen einen Senior IT-Lead. 80k Gehalt, Homeoffice, Obstkorb. Interesse?'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Recruiter: 'Haben Sie Interesse an einem Wechsel?'",
                    opts: [
                        { t: "Ja, erzähl mir mehr!", next: "interest" },
                        { t: "Nein, ich liebe GlobalCorp.", next: "loyal" }
                    ]
                },
                "interest": {
                    text: "Recruiter: 'Super! Können Sie uns vertrauliche Systemdaten als Arbeitsprobe schicken?'",
                    opts: [
                        { t: "Klar, hier (Datenleck)", next: "leak" },
                        { t: "Spinnst du? Blockiert!", next: "block" }
                    ]
                },
                "loyal": {
                    text: "Recruiter: 'Schade. Viel Spaß in der Hölle.'",
                    opts: [{ t: "Tschüss", next: "end_sad" }]
                }
            },
            results: {
                "leak": { txt: "Daten gesendet. Du fühlst dich schmutzig, aber reich.", fl: 10, al: -20, cr: 50 }, // Hohes Risiko!
                "block": { txt: "Phishing-Versuch abgewehrt. Stolz.", fl: -5, al: 0, cr: -10 },
                "end_sad": { txt: "Du bleibst loyal. Warum eigentlich?", fl: 0, al: 10, cr: -5 }
            }
        },
        {
            id: "sq_investigation",
            kind: "text", // Text-Quest, kein Handy
            title: "Die verschwundene Maus",
            text: "Frau Erna vom Empfang vermisst ihre 'Glücksmaus'. Sie ist weg. Der Hauptverdächtige ist der Büro-Hund 'Bello'.",
            opts: [
                { t: "Detektiv spielen", m: 30, f: 10, a: -10, c: 0, r: "Du findest die Maus in Bellos Körbchen. Sie ist vollgesabbert. Erna ist überglücklich und schenkt dir Schokolade." },
                { t: "Neue Maus aus dem Lager holen", m: 10, f: -5, a: 0, c: 0, r: "Problem gelöst, aber Erna ist traurig. 'Es ist nicht dasselbe!'" },
                { t: "Bello verhören", m: 15, f: 20, a: -20, c: 5, r: "Du bellst den Hund an. Der Chef kommt vorbei: 'Alles okay bei Ihnen?'" }
            ]
        },
        {
            id: "sq_darknet",
            kind: "phone",
            appName: "Tor Browser",
            title: "Das Angebot",
            msg: "Anon: 'Ich kaufe Firmengeheimnisse. 1 Bitcoin pro Datensatz. Interesse?'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Anon: 'Interesse an schnellem Geld?'",
                    opts: [
                        { t: "Niemals! (Blockieren)", next: "good" },
                        { t: "Erzähl mir mehr...", next: "bad" }
                    ]
                },
                "bad": {
                    text: "Anon: 'Lade einfach die Kundendatenbank hoch. Keiner wird es merken.'",
                    opts: [
                        { t: "Upload starten", next: "crime" },
                        { t: "Rückzieher machen", next: "chicken" }
                    ]
                }
            },
            results: {
                "good": { txt: "Du bleibst sauber. Dein Gewissen ist rein.", fl: 0, al: 0, cr: -10 },
                "chicken": { txt: "Das war knapp. Besser Finger weg.", fl: 0, al: 5, cr: 0 },
                "crime": { txt: "Upload fertig. Du bist reich! Aber paranoid. Radar +50!", fl: 20, al: -50, cr: 50 }
            }
        },
        {
            id: "sq_moral_bernd",
            kind: "phone",
            appName: "Teams",
            title: "Bernd (Vertrieb)",
            msg: "Bernd: 'Hör mal, ganz heikles Thema. Kannst du gerade schreiben?'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Bernd: 'Ich hab dem Kunden aus Versehen die interne Kalkulation mit unserer riesigen Marge geschickt statt dem Angebot! 😱 Wenn der Chef das sieht, bin ich tot. Kannst du die Mail vom Server löschen, bevor der Kunde sie öffnet?'",
                    opts: [
                        { t: "Löschen (Regelverstoß)", next: "wipe" },
                        { t: "Ablehnen (Ehrlich bleiben)", next: "deny" },
                        { t: "Was springt für mich raus?", next: "deal" }
                    ]
                },
                "deal": {
                    text: "Bernd: 'Ich geb dir 50 Euro bar auf die Hand! Mach schon, er ist gerade online!'",
                    opts: [
                        { t: "Deal: Her mit der Kohle", next: "cash" },
                        { t: "Nein, zu riskant.", next: "deny" }
                    ]
                }
            },
            results: {
                "wipe": { txt: "Spurlos gelöscht. Bernd schuldet dir was. Du fühlst dich wie ein Hacker, aber das Risiko war hoch.", fl: 0, al: -15, cr: 15 },
                "deny": { txt: "Du tust nichts. Bernd wird kurz darauf ins Chefbüro zitiert. Man hört Schreie. Dein Gewissen ist rein, aber Bernd hasst dich.", fl: 0, al: 10, cr: -5 },
                "cash": { txt: "50 Euro eingesteckt. Mail ist weg. Ein lukrativer Tag, solange niemand in die Logs schaut...", fl: 5, al: -20, cr: 25 }
            }
        },
		{
            id: "sq_donation",
            kind: "text",
            title: "Das Spiel im Spiel",
            text: "Du surfst genervt im Netz und stolperst über ein kleines Browsergame. Es heißt 'IT-HELL'. Es simuliert exakt deinen furchtbaren Arbeitstag. Verrückt! Der Entwickler hat einen kleinen 'Kaffee-Button' eingebaut.",
            opts: [
                { 
                    t: "Dem Entwickler einen Kaffee ausgeben", 
                    m: 5, f: 5, a: -20, c: 0, 
                    r: "Du bist ein Ehrenmann/eine Ehrenfrau! Dein Karma steigt ins Unermessliche. PayPal für Kaffee: ferris.daehn@outlook.de (Danke!)" 
                },
                { 
                    t: "Einfach nur kurz zocken", 
                    m: 5, f: 5, a: -10, c: 0, 
                    r: "Du spielst eine Runde. Im Spiel brennt der Server. Du lachst, weil es nicht dein echter Server ist. Deine Laune bessert sich." 
                }
            ]
        }
    ]
};