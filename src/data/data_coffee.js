export const coffee = [

    {
        id: "cof_note",
        title: "Fundstück am Automaten",
        text: "Jemand hat hier einen gelben Notizzettel liegen lassen. Darauf steht 'WLAN-PW: 1234abcd'. Das ist Schmidts Handschrift.",
        opts: [
            { t: "Zettel einstecken", loot: "wifi_note", m: 5, f: 5, a: 0, c: 0, r: "Du steckst den Zettel ein. Schmidts WLAN-Passwort in Schmidts Handschrift - so etwas wirft man nicht weg, so etwas archiviert man. Für einen Regentag." },
            { t: "Wegwerfen", m: 5, f: 0, a: 0, c: 0, r: "Du zerreißt den Zettel in Konfetti-Größe und verteilst ihn auf zwei Mülleimer. Übertrieben? Vielleicht. Aber genau so steht es im IT-Grundschutz, und irgendwer muss ihn ja leben." }
        ]
    },
    {
        id: "cof_donut_1",
        title: "Reste vom Meeting",
        text: "Die Tür zum Konferenzraum steht offen. Auf dem großen Tisch, zwischen leeren Wasserflaschen und Flipchart-Papier, steht noch eine Schachtel vom Management-Meeting. Inhalt: Ein einsamer, leicht angetrockneter Schoko-Donut mit bunten Streuseln.",
        opts: [
            { 
                t: "Den Donut 'sicherstellen'", 
                loot: "donut", 
                next: "path_donut_taken", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du wickelst ihn schnell in eine Serviette. Er ist zwar etwas hart, aber Zucker ist Zucker. Außerdem eignet er sich hervorragend als Bestechungsmittel für hungrige Azubis." 
            },
            { 
                t: "Stolz zeigen & liegen lassen", 
                next: "path_donut_left", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du gehst weiter. Du bist zwar chronisch unterzuckert, aber du isst keine Reste vom Management." 
            }
        ]
    },
    {
        id: "cof_donut_2a",
		char: "Chantal",
        title: "Die Zucker-Falle",
        reqStory: "path_donut_taken",
        text: "Irgendwann steht Chantal aus dem Marketing in der Küche und sucht etwas. 'Oh, hast du den letzten 'Veggie-Spinat-Schoko-Test-Donut' gesehen? Ich wollte den gerade für Instagram fotografieren!'",
        opts: [
            { 
                t: "Den Putzdienst vorschieben", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Chantal seufzt enttäuscht. 'Schade. Dabei soll der Spinat-Kern so gesund sein.' Du hast den Donut noch, aber plötzlich weniger Appetit." 
            },
            { 
                t: "Beichten und teilen", 
                rem: "donut", 
                rep: { "Chantal": 5 },
                m: 10, f: -5, a: -5, c: 0, 
                r: "Ihr teilt euch das trockene Gebäck. Es schmeckt tatsächlich leicht nach Spinat. Geteiltes Leid ist halbes Leid. Chantal findet dich jetzt 'sympathisch ehrlich'." 
            },
            { 
                t: "Hektisch kauen und schlucken", 
                rem: "donut", 
                rep: { "Chantal": -5 },
                m: 5, f: -5, a: -10, c: 5, 
                r: "Du stopfst den Rest mit einem Bissen rein. 'Mmpf... keine Ahnung.' Chantal mustert dich. 'Du hast Krümel am Kinn.' Peinlich, aber satt." 
            }
        ]
    },
    {
        id: "cof_donut_2b",
		char: "Dr. Wichtig",
        title: "Der Feinschmecker",
        reqStory: "path_donut_left",
        text: "Du holst dir deinen Kaffee und siehst, wie Dr. Wichtig den Raum betritt. Er sieht den Donut, seine Augen leuchten. Er beißt herzhaft hinein. 'Mmmh! Endlich mal gute Verpflegung hier!'",
        opts: [
            { 
                t: "'Hab ich für Sie übrig gelassen!'", 
				rep: { "Dr. Wichtig": 5 },
                m: 5, f: 5, a: -5, c: -10,
                r: "Der Chef nickt anerkennend mit vollem Mund. 'Müller, Sie denken mit. Das merke ich mir.' Ein billiger Sieg, aber er zählt." 
            },
            { 
                t: "Ihn vor dem Spinat-Kern warnen", 
				rep: { "Dr. Wichtig": -5 },
                m: 2, f: 0, a: 5, c: 5,
                r: "'Chef, der ist vom letzten Monat!' Er spuckt ihn sofort in den Mülleimer. 'Wollen Sie mich vergiften?!' Ups. Zu ehrlich." 
            },
            { 
                t: "Schweigend genießen", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du nippst an deinem Kaffee und siehst dem Chef beim Krümeln zu. Für zwei Minuten ist die Hierarchie nur ein Gerücht." 
            }
        ]
    },
    {
        id: "cof_flirt_1",
        title: "Der Schwarm",
        text: "Sarah aus der HR steht da. Sie lächelt dich an. 'Na, IT-Held? Alles im Griff oder brennt der Server?'",
        opts: [
            { 
                t: "Panisch weglaufen", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du stammelst 'Äh... Error 404!' und rennst raus. Der Kaffee bleibt zurück, die Würde auch. Auf dem Flur spielst du dir die Szene noch dreimal vor. Sie wird nicht besser." 
            },
            { 
                t: "'Für dich lösche ich jedes Feuer.'", 
                next: "path_flirt_date", 
                m: 20, f: 10, a: -30, c: 5, 
                r: "Es läuft gut! Sie kichert und zwirbelt eine Haarsträhne. 'Soso, ein Feuerwehrmann...'" 
            }
        ]
    },
    {
        id: "cof_flirt_2a",
        title: "Das Angebot",
        reqStory: "path_flirt_date",
        text: "Das Gespräch mit Sarah läuft überraschend flüssig. Sarah lehnt sich gegen den Automaten. 'Sag mal... hast du heute Abend schon was vor? Ich könnte einen Drink gebrauchen, der nicht aus diesem Automaten kommt.'",
        opts: [
            { 
                t: "'Klar! 18 Uhr im Pub?'", 
                m: 10, f: 10, a: -20, c: 0, 
                r: "'Perfekt! Ich freu mich!' Sie schreibt ihre Nummer auf deinen Arm. Dein Selbstbewusstsein durchbricht die Decke." 
            },
            { 
                t: "Nerd-Antwort: 'Ich muss raiden.'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "'Oh. Okay. Prioritäten, was?' Ihr Lächeln gefriert. Sie geht. Du hast das Date für einen virtuellen Drachen geopfert." 
            },
            { 
                t: "Sich auf Überstunden rausreden", 
				rep: { "Dr. Wichtig": 2 },
                m: 5, f: -10, a: 10, c: -20, 
                r: "Sie nickt verständnisvoll, aber enttäuscht. 'Schade. Fleißiges Bienchen.' Der Chef, der gerade vorbeikommt, hört das und nickt zufrieden." 
            }
        ]
    },
    {
        id: "cof_boss_1",
		char: "Dr. Wichtig",
        title: "Der Chef lauert",
        text: "Der Chef steht breitbeinig vor der Kaffeemaschine und blockiert den Zugang. Er dreht sich in Zeitlupe zu dir um, eine Augenbraue hochgezogen. 'Ah, Müller? Schon wieder hier? Ist das heute der fünfte Kaffee oder haben Sie Ihren Schreibtisch untervermietet?'",
        opts: [
            { 
                t: "'Ich brauche Treibstoff, Chef...'", 
                next: "path_boss_lecture",
				rep: { "Dr. Wichtig": -2 },
                m: 15, f: -5, a: 10, c: 5,
                r: "Fehler. Riesenfehler. Er nutzt die Gelegenheit für einen 15-minütigen Spontan-Vortrag über 'Time-Management' und 'intrinsische Motivation'. Dein Kaffee wird dabei kalt." 
            },
            { 
                t: "Panisch 'Nein!' schreien & wegrennen", 
                m: 2, f: 0, a: -5, c: 5, 
                r: "Du drehst dich auf dem Absatz um und fliehst zurück in dein Büro. Der Chef schaut dir verwirrt nach. Kein Kaffee, aber immerhin keine Standpauke." 
            },
            { 
                t: "Dreiste Notlüge: 'Ist für den externen Berater!'", 
                next: "path_boss_consultant",
				rep: { "Dr. Wichtig": 5 },
                m: 5, f: 10, a: 5, c: -10,
                r: "Der Chef nickt anerkennend: 'Ah, Service-Orientierung! Sehr gut, weitermachen.' Er tritt zur Seite. Gelogen wie gedruckt - und der Kaffee schmeckt trotzdem." 
            }
        ]
    },
    {
        id: "cof_boss_2a",
		char: "Dr. Wichtig",
        title: "Der ungebetene Gast",
        reqStory: "path_boss_consultant",
        text: "Irgendwann steht der Chef an deinem Platz. Im Schlepptau ein Mann im 2000€-Anzug. 'Müller! Da sind Sie ja. Hier ist der Senior Consultant von McKinsey. Er sagte, er hätte Durst, und da Sie ja ohnehin schon mal für ihn geholt haben...' Der Berater greift gierig nach DEINEM Becher.",
        opts: [
            { 
                t: "'Da ist Hustensaft drin.'", 
				rep: { "Dr. Wichtig": -2 },		
                m: 5, f: 5, a: -5, c: 5, 
                r: "Der Berater zieht die Hand zurück. 'Oh. Äh. Nein danke.' Der Chef guckt misstrauisch, aber du darfst deinen Kaffee behalten." 
            },
            { 
                t: "Rechnung stellen: 'Macht 5 Euro.'",
   				rep: { "Dr. Wichtig": -5 },	             				
                m: 5, f: 0, a: 10, c: 20, 
                r: "Totenstille. Der Berater lacht unsicher: 'Humor hat er!' Der Chef lacht nicht. 'Müller, in mein Büro. Später.' Das war zu frech." 
            },
            { 
                t: "Zähneknirschend abgeben",
                rep: { "Dr. Wichtig": 5 },				
                m: 2, f: 0, a: 20, c: -10, 
                r: "Der Berater schlürft laut. 'Mmmh. Ein bisschen wenig Crema, aber für den Anfang okay.' Du hast keinen Kaffee, aber der Chef strahlt vor Stolz über dein 'Teamwork'." 
            }
        ]
    },
    {
        id: "cof_boss_2b",
		char: "Dr. Wichtig",
        title: "Die Achtsamkeits-Übung",
        reqStory: "path_boss_lecture",
        text: "Nach dem Vortrag drückt dir der Chef einen Beutel voller bunter Büroklammern in die Hand. 'Damit Sie lernen, sich zu fokussieren: Sortieren Sie die nach Farben. Bis Mittag. Das ist eine Zen-Übung für High-Performer!'",
        opts: [
            { 
                t: "Alles in den Müll werfen", 
                rep: { "Dr. Wichtig": 5 },
                m: 2, f: 5, a: 5, c: 10, 
                r: "Zack, weg damit. Wenn der Chef fragt: 'Ich habe sie digitalisiert und in die Cloud hochgeladen.' Er versteht es nicht und nickt beeindruckt." 
            },
            { 
                t: "Kevin sortieren lassen", 
                rep: { "Kevin": -5 },
                m: 5, f: 10, a: -5, c: 0, 
                r: "'Kevin! Das ist ein Farb-Sehtest für deine Ausbildung!' Kevin sortiert begeistert. Du trinkst deinen kalten Kaffee und schaust zu. Delegieren ist auch eine Skill." 
            },
            { 
                t: "Brav sortieren", 
                rep: { "Dr. Wichtig": 5 },
                m: 30, f: -10, a: 10, c: -5, 
                r: "Du sitzt 30 Minuten da und sortierst Rot zu Rot. Es ist dumm, aber der Chef sieht dich im Vorbeigehen und nickt: 'Sehen Sie? Der Fokus kehrt zurück!'" 
            }
        ]
    },
    {
        id: "cof_ball_1",
        title: "Billiges Werbegeschenk",
        text: "Ein schleimiger Software-Vertreter hat einen Karton mit 'Merch' in der Küche vergessen. Es sind rote Schaumstoff-Bälle mit dem Aufdruck 'Cloud is Future'.",
        opts: [
            { 
                t: "Einen Stressball einstecken", 
                loot: "stressball", 
                next: "path_ball_taken", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Er riecht streng nach Weichmachern, aber er liegt gut in der Hand. Perfekt zum Kneten (oder Werfen), wenn User mal wieder nerven." 
            }
        ]
    },
    {
        id: "cof_ball_2a",
		char: "Dr. Wichtig",
        title: "Synergie-Gespräche",
        reqStory: "path_ball_taken",
        text: "Du drückst 'Espresso'. Neben dir stehen der Chef und der Vertreter von vorhin. Der Vertreter zeigt begeistert auf den roten Ball in deiner Hand: 'Ah! Ich sehe, unsere 'Cloud' ist schon im Einsatz! Wie gefällt sie Ihnen?'",
        opts: [
            { 
                t: "'Das beste Gadget seit Jahren!'", 
				rep: { "Dr. Wichtig": 10 },	
                m: 15, f: 5, a: 15, c: -10,
                r: "Eine krasse Fehleinschätzung. Der Vertreter ist so begeistert, dass er dich in die Ecke drängt und dir 15 Minuten lang die Roadmap für Q4 erklärt. Der Chef nickt stolz, aber deine Ohren bluten und der Kaffee wird kalt." 
            },
            { 
                t: "'Ist halt Schaumstoff.'", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Das Lächeln des Vertreters gefriert. 'Äh, ja. High-Tech-Polymer.' Er wendet sich irritiert ab. Das Gespräch stirbt, und du kannst in Ruhe mit deinem Kaffee entkommen." 
            },
            { 
                t: "Tief inhalieren und den Augenkontakt halten", 
				rep: { "Dr. Wichtig": -10 },	
                m: 5, f: 0, a: 0, c: 20,
                r: "Du hältst den Ball direkt unter deine Nase, atmest tief ein und flüsterst: 'Er riecht nach Weichmachern.' Totenstille. Der Vertreter weicht zurück. Der Chef läuft purpurrot an. 'MÜLLER! BÜRO!'" 
            }
        ]
    },
    {
        id: "cof_empty_1",
        title: "Leere Maschine",
        text: "Das Display blinkt hämisch rot: 'ERROR: BEANS EMPTY'. Der Behälter ist staubtrocken. Jemand hat den letzten Tropfen rausgepresst und sich klammheimlich verdrückt, ohne nachzufüllen. Es war garantiert Kevin.",
        opts: [
            { 
                t: "Zettel schreiben: 'WER LEER MACHT, FÜLLT AUF!'", 
                next: "path_empty_note", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du klebst einen passiv-aggressiven Post-it mit drei Ausrufezeichen an die Maschine. Kaffee hast du immer noch keinen." 
            },
            { 
                t: "Seufzen und die Bohnen auffüllen", 
                next: "path_empty_refill", 
                m: 15, f: -5, a: 10, c: 0, 
                r: "Du schleppst den schweren Sack aus dem Lager. Natürlich bist du hier der Depp für alles. Aber immerhin brühst du dir jetzt den frischesten Kaffee des Tages." 
            },
            { 
                t: "Wütend gegen das Gehäuse treten", 
                next: "path_empty_kick", 
				rep: { "Dr. Wichtig": -2 },	
                m: 5, f: 0, a: 5, c: 10, 
                r: "KLONK! Das hat ordentlich gescheppert. Die Maschine bleibt leer, aber dein Fuß tut weh. Der Chef steckt den Kopf aus der Tür: 'Alles im Griff bei Ihnen, Müller?'" 
            }
        ]
    },
    {
        id: "cof_empty_2a",
        title: "Karma",
        reqStory: "path_empty_refill",
        text: "Als du wieder einmal in die Küche kommst, steht dort die neue Praktikantin. Sie strahlt dich an. 'Oh, warst du das mit dem Auffüllen? Du bist ja lieb! Hier, nimm meinen. Ich hab mir aus Versehen zwei gezogen.' Sie reicht dir einen perfekten Cappuccino.",
        opts: [
            { 
                t: "'Ich traue nur meinem eigenen Sud.'", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du lehnst ab. Sie zuckt mit den Schultern und trinkt beide selbst. Jetzt stehst du da und musst warten, bis die Maschine wieder frei ist. Selbst schuld." 
            },
            { 
                t: "Sie belehren: 'Eigentlich ist das Diebstahl'", 
                m: 5, f: -5, a: 10, c: 5, 
                r: "Ihr Lächeln gefriert. 'Wow. Okay, Boomer.' Sie geht. Den Kaffee hast du - aber deine Seele ist jetzt so schwarz wie er." 
            },
            { 
                t: "Dankbar annehmen", 
                m: 5, f: 0, a: -25, c: 0, 
                r: "Der Kaffee schmeckt nach Gerechtigkeit und Milchschaum." 
            }
        ]
    },
    {
        id: "cof_empty_2b",
        title: "Künstliche Intelligenz?",
        reqStory: "path_empty_kick",
        text: "Das Display flackert nach deinem Tritt, dann ertönt eine blecherne, synthetische Stimme aus dem Lautsprecher: 'AUA. DAS WAR UNHÖFLICH, MÜLLER. ICH MERKE MIR DAS. KEIN KOFFEIN FÜR GEWALTTÄTER.' Der Auslauf verriegelt sich hörbar.",
        opts: [
            { 
                t: "Exorzisten rufen", 
                m: 5, f: 10, a: 0, c: 5, 
                r: "Du meldest ein 'Besessenes Gerät'. Die IT lacht dich aus. Du trinkst heute lieber Tee." 
            },
            { 
                t: "Sich bei der Maschine entschuldigen", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "Du flüsterst: 'Sorry, Kaffeemaschine.' Ein Kollege kommt rein und sieht, wie du mit einem Haushaltsgerät redest. Er geht rückwärts wieder raus. Aber die Sperre öffnet sich!" 
            },
            { 
                t: "Stecker ziehen", 
                m: 10, f: -5, a: 10, c: 0, 
                r: "Du killst den Strom. 'WIR SEHEN UNS IN DER HÖLL...' bricht die Stimme ab. Nach dem Neustart ist sie wieder dumm und stumm. Aber der Kaffee schmeckt leicht nach Motoröl." 
            }
        ]
    },
    {
        id: "cof_empty_2c",
        title: "Der Zettelkrieg",
        reqStory: "path_empty_note",
        text: "Du kommst eine Stunde später wieder. Dein Zettel hängt noch da. Aber daneben kleben fünf neue: 'Deine Mudda füllt auf!', 'Schriftart nicht CI-konform!!', 'Papierverschwendung!' und 'Wer das liest ist doof'. Die Maschine ist immer noch leer.",
        opts: [
            { 
                t: "Kapitulieren & zum Bäcker gehen", 
                m: 15, f: 10, a: -5, c: 0, 
                r: "Dieser Ort ist verflucht. Du verlässt das Gebäude und holst dir echten Kaffee. Der Frieden kostet dich 3,50 Euro, ist es aber wert." 
            },
            { 
                t: "Alle Zettel wütend abreißen", 
                m: 5, f: -5, a: 20, c: 0, 
                r: "Du knüllst das Papier zusammen und wirfst es in den Müll. Das Problem ist nicht gelöst, aber die Wand ist wieder sauber. Dein Blutdruck ist auf 180." 
            },
            { 
                t: "Neuen Zettel: 'GRAMMATIK LERNEN!'", 
                m: 5, f: 5, a: 5, c: 0, 
                r: "Du korrigierst die Fehler der anderen mit rotem Stift. Das ist der Alman-Move des Jahres. Moralisch ein Sieg, nur der Durst bleibt." 
            }
        ]
    },
    {
        id: "cof_newbie_1",
        title: "Der Neue",
        text: "Ein junger Typ im Anzug steht verloren vor der Maschine. 'Äh, hallo? Ich bin neu im Controlling. Braucht man hier eine Karte oder ist das kostenlos? Und wo ist die Soja-Milch?'",
        opts: [
            { 
                t: "'Das kostet 5€ pro Tasse. Zahlbar bei mir.'", 
                next: "path_newbie_scam", 
                m: 10, f: 10, a: -10, c: 10, 
                r: "Er wirkt beeindruckt von der Professionalität. 'Oh, Service am Platz? Stark.' Er drückt dir einen 5er in die Hand. 'Quittung später, okay?'" 
            },
            { 
                t: "Starren und knurren",
                m: 5, f: 0, a: 5, c: 0, 
                r: "Er wird bleich, weicht zurück und stolpert fast über den Mülleimer. 'Schon gut! Ich... ich trinke Wasser!' Er rennt weg." 
            },
            { 
                t: "Nett sein & erklären", 
                next: "path_newbie_friend", 
                m: 15, f: -5, a: 0, c: -5, 
                r: "Er ist dankbar. 'Cool, danke! Ich heiße Torben. Endlich mal ein nettes Gesicht hier.' Er folgt dir unauffällig zu deinem Platz." 
            }
        ]
    },
    {
        id: "cof_newbie_2a",
        title: "Best Friends Forever",
        reqStory: "path_newbie_friend",
        text: "Torben ist da. Einfach da, neben deinem Schreibtisch, mit zwei veganen Smoothies. 'Hey Buddy! Danke nochmal für vorhin. Ich dachte, wir machen zusammen Mittag? Ich wollte mit dir über Synergien zwischen IT und Controlling brainstormen!'",
        opts: [
            { 
                t: "'Ich esse im Serverraum.'", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Torben nickt eifrig. 'Cool! Secret Base! Ich komme mit!' Du musst dich auf der Toilette einschließen, um ihn loszuwerden." 
            },
            { 
                t: "'Nur wenn du meine Spesen genehmigst.'", 
                m: 10, f: 5, a: -5, c: -10, 
                r: "Er zwinkert. 'Für meinen Mentor? Alles! Ich buche das als 'Team-Building'.' Er redet 60 Minuten ohne Punkt und Komma, aber dein Budget ist sicher." 
            },
            { 
                t: "Ihn zu Chantal schicken", 
                rep: { "Chantal": -10 },
                m: 5, f: 5, a: 0, c: 0, 
                r: "'Chantal im Marketing sucht noch Freunde.' Torbens Augen leuchten. Er zieht ab. Jetzt hast du Ruhe, aber Chantal wird Rache schwören." 
            }
        ]
    },
    {
        id: "cof_newbie_2b",
        title: "Die Quittung",
        reqStory: "path_newbie_scam",
        text: "Torben fängt dich im Flur ab. Er wedelt mit einem Formular. 'Du, wegen der 5 Euro für den Kaffee-Service... ich brauche eine Kostenstelle für die Buchhaltung. Läuft das über 'IT-Infrastruktur' oder 'Externe Dienstleistung'?'",
        opts: [
            { 
                t: "Einen Server-Alarm erfinden", 
                m: 5, f: -5, a: -10, c: 10, 
                r: "Du rufst 'Server-Alarm!' und sprintest weg. Torben ruft hinterher: 'Ich buche es auf Sonstiges!'" 
            },
            { 
                t: "'Das ist eine Schwarzgeld-Kasse für Notfälle.'", 
                m: 5, f: 5, a: 0, c: 20, 
                r: "Torben flüstert: 'Verstehe. Black Ops. Cool.' Er zerreißt das Formular. 'Mein Mund ist versiegelt.' Er hält dich jetzt für einen Geheimagenten." 
            },
            { 
                t: "Geld zurückgeben: 'War nur ein Witz.'", 
                m: 2, f: 0, a: 5, c: -5, 
                r: "Er starrt dich verständnislos an. 'Ein Witz? Aber... ich habe das schon im SAP vorerfasst.' Er ist völlig verwirrt und geht, um eine Stornobuchung zu machen." 
            }
        ]
    },
    {
        id: "cof_worker_1",
        title: "Der Handwerker",
        text: "Ein externer Techniker repariert gerade den Wasserspender. Sein Werkzeugkasten steht offen da. Ein Hammer blitzt dich an.",
        opts: [
            { 
                t: "Smalltalk halten", 
                next: "path_worker_talk", 
                m: 15, f: 5, a: -5, c: 0, 
                r: "Ihr redet über schlechte Bezahlung und dumme Kunden. 'Die da oben haben ja keine Ahnung', sagt er und nickt dir zu. Solidarität unter Arbeitern." 
            },
            { 
                t: "Hammer klauen", 
                loot: "hammer", 
                next: "path_worker_steal", 
                m: 5, f: 5, a: 0, c: 5, 
                r: "Zack, eingesteckt. Ein Hammer ist das ultimative Debugging-Tool für Drucker. Der Techniker dreht sich gerade wieder um." 
            }
        ]
    },
    {
        id: "cof_worker_2a",
        title: "Vermisstenanzeige",
        reqStory: "path_worker_steal",
        text: "Der Wasserspender-Handwerker kratzt sich am Kopf und wühlt in seiner Kiste. 'Sagen Sie mal... haben Sie meinen 500g Schlosserhammer gesehen? Der lag doch eben noch hier? Ohne den krieg ich die Verkleidung nicht wieder drauf.'",
        opts: [
            { 
                t: "Unschuldig pfeifen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "'Nö. Vielleicht hat ihn die Putzkolonne?' Der Handwerker flucht und geht zum Wagen, Ersatz holen. Du hast den Hammer, aber ein (sehr kleines) schlechtes Gewissen." 
            },
            { 
                t: "Ihn kleinlaut zurückgeben", 
                rem: "hammer",
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du gibst ihn zurück. 'Wollte nur... die Balance prüfen.' Er schnappt ihn dir weg. 'Finger weg, IT-Fuzzi.' Chance vertan." 
            },
            { 
                t: "Kevin beschuldigen", 
                rep: { "Kevin": -10 },
                m: 5, f: 5, a: -5, c: -5, 
                r: "'Der Azubi mit der Kappe war da...' Der Handwerker nickt wissend. 'Die Jugend von heute. Die klauen alles.' Er schreibt 'Diebstahl durch Azubi' auf den Rapportzettel. Perfektes Verbrechen." 
            }
        ]
    },
    {
        id: "cof_worker_2b",
        title: "Material-Überschuss",
        reqStory: "path_worker_talk",
        text: "Der Wasserspender-Techniker wischt sich die Hände ab. 'Endlich mal normale Leute hier. Sagen Sie mal, ich hab hier noch Reste, die ich nicht mehr buchen kann. Brauchen Sie was für die Werkstatt? Die Firma zahlt's ja.'",
        opts: [
            { 
                t: "Dankend ablehnen", 
                m: 2, f: 0, a: 0, c: 5, 
                r: "'Ich bin versorgt.' Er brummt nur und wirft den Kram in seinen Koffer. 'Mehr für mich.' Du bleibst ehrlich, aber leer." 
            },
            { 
                t: "Kabelbinder nehmen", 
                loot: "zip_ties", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Hier, nimm die ganze Packung.' Kabelbinder sind die Währung der IT. Ein guter Tausch." 
            },
            { 
                t: "Panzertape nehmen", 
                loot: "tape", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Das gute Gaffa. Klebt alles, auch Münder.' Er lacht dreckig. Du hast jetzt Profi-Tape." 
            }
        ]
    },
    {
        id: "cof_revolte_1",
        title: "Die Kaffeemaschinen-Revolte",
        text: "Die neue 'Smart-Barista 3000' mit KI-Chip blinkt böse. Auf dem Display steht: 'FEED ME'. Sie weigert sich strikt, die billigen Discounter-Bohnen zu mahlen und zeigt: 'ERROR: TASTE NOT FOUND'. Der Aufstand der Maschinen beginnt im Pausenraum.",
        opts: [
            { 
                t: "Nachgeben & teure Bio-Bohnen kaufen", 
                next: "path_revolte_buy", 
                m: 20, f: -5, a: 10, c: -5, 
                r: "Du rennst zum Hipster-Röster nebenan und investierst 15€ aus eigener Tasche. Der Kaffee schmeckt nach Einhorn-Tränen und Liebe, aber du bist für den Rest des Monats pleite." 
            },
            { 
                t: "Der Klassiker: Stecker raus, Stecker rein", 
                next: "path_revolte_reboot", 
                m: 5, f: 5, a: 5, c: 0, 
                r: "Die Maschine fährt runter... bootet neu... und zeigt sofort wieder 'FEED ME'. Dazu ertönt ein hämisches 8-Bit-Lachen aus dem Lautsprecher. Sie ist klüger als du." 
            },
            { 
                t: "Perkussive Wartung mit dem Hammer",
                req: "hammer", 
                next: "path_revolte_hammer", 
                m: 10, f: 0, a: -20, c: 20, 
                r: "BAM! Du schlägst gezielt auf das Gehäuse ein. Das Display hat jetzt einen Riss, aber aus purer Angst spuckt die Maschine sofort schwarzen Kaffee aus." 
            }
        ]
    },
    {
        id: "cof_revolte_2a",
        title: "Maschinen-Liebe",
        reqStory: "path_revolte_hammer",
        text: "Du gehst später an der Maschine vorbei. Sie surrt leise, als sie dich sieht. Auf dem Display erscheint ein Pixel-Herz und der Text: 'MEISTER ERKANNT'. Im Ausgabefach liegt ein einzelner, perfekt verpackter Keks, den sie wohl für dich aufbewahrt hat.",
        opts: [
            { 
                t: "Die Maschine streicheln", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du tätschelst das verbeulte Gehäuse. 'Braves Mädchen.' Sie schnurrt (oder es ist der Lüfter, der schleift). Eine wunderbare, dysfunktionale Freundschaft." 
            },
            { 
                t: "Den Keks triumphierend essen", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Der Keks schmeckt nach Unterwerfung und Schokolade. Die Kollegen starren neidisch, weil sie nur Fehlercodes bekommen. Du hast das Biest gezähmt." 
            }
        ]
    },
    {
        id: "cof_revolte_2b",
		char: "Dr. Wichtig",
        title: "Kaffee-Adel",
        reqStory: "path_revolte_buy",
        text: "Seit deiner Bohnen-Spende wirst du behandelt wie ein König. Eine Delegation Kollegen fängt dich ab: 'Das war der beste Stoff seit Jahren! Wir haben gesammelt, damit du Nachschub holst.' Sie halten dir einen Hut voller Kleingeld hin.",
        opts: [
            { 
                t: "Den Ruhm genießen", 
				rep: { "Dr. Wichtig": 2 },	
                m: 5, f: 10, a: -10, c: -5, 
                r: "Du lehnst dich zufrieden an die Anrichte. 'Nur das Beste für mein Team.' Selbst der Chef nickt dir im Vorbeigehen zu. So viel Wohlwollen von oben gab es zuletzt vor Jahren." 
            },
            { 
                t: "Trinkgeld für dich behalten", 
                m: 10, f: 0, a: -5, c: 0, 
                r: "Du nimmst das Geld als 'Bearbeitungsgebühr'. Du bist jetzt der offizielle Dealer für Koffein." 
            }
        ]
    },
    {
        id: "cof_revolte_2c",
        title: "Root-Zugriff",
        reqStory: "path_revolte_reboot",
        text: "Seit dem harten Neustart verhält sich die Maschine anders. Wenn du 'Espresso' drückst, landest du plötzlich in einem versteckten Admin-Menü. 'DEBUG MODE ACTIVE'. Die Physik des Kaffees liegt in deiner Hand.",
        opts: [
            { 
                t: "Den 'Lachen'-Sound deaktivieren", 
                m: 5, f: 0, a: -10, c: 0, 
                r: "Ruhe kehrt ein. Du programmierst die Maschine so um, dass sie stattdessen jedes Mal 'Hallo Chef' sagt, wenn du kommst." 
            },
            { 
                t: "Alles auf 'Maximum' stellen", 
                m: 10, f: 5, a: -20, c: 0, 
                r: "Du stellst Stärke auf 110% und Temperatur auf 'Kernschmelze'. Was da rauskommt, ist flüssiges Dynamit. Du bist hellwach und glücklich." 
            }
        ]
    },
    {
        id: "cof_meeting_1",
		char: "Chantal",
        title: "Das Marketing-Meeting",
        text: "Chantal und ihre Crew blockieren die Küche. Sie brainstormen über 'Feel-Good-Management'. Es gibt Smoothies. Du brauchst aber Koffein.",
        opts: [
            { 
                t: "Mitmachen", 
                next: "path_meeting_join", 
                rep: { "Chantal": 15 },
                m: 45, f: 20, a: 10, c: -5, 
                r: "Du musstest 45 Minuten über deine Gefühle reden. Du hast jetzt einen grünen Smoothie und Aggressionen." 
            },
            { 
                t: "Warten und böse gucken", 
                next: "path_meeting_wait", 
                rep: { "Chantal": -5 },
                m: 15, f: 5, a: 5, c: 0, 
                r: "Sie ignorieren dich komplett. Irgendwann gehen sie. Dein Kaffee schmeckt bitter, aber du hast deinen Willen bekommen." 
            },
            { 
                t: "Dazwischen drängeln", 
                next: "path_meeting_push", 
                rep: { "Chantal": -10 },
                m: 5, f: 0, a: -5, c: 10, 
                r: "Du hast Chantal den Smoothie umgestoßen. 'Hoppla'. Du hast Kaffee, aber Feinde. Eine grüne Pfütze breitet sich aus." 
            }
        ]
    },
    {
        id: "cof_meeting_2a",
		char: "Chantal",
        title: "Die Rechnung",
        reqStory: "path_meeting_push",
        text: "Ein pinker Umschlag liegt auf deinem Tisch. Betreff: 'Schadensersatz Sneaker & Seelischer Schmerz'. Chantal fordert 50€ für die Reinigung ihrer Schuhe, die du 'neulich' mit Smoothie ruiniert hast.",
        opts: [
            { 
                t: "Umschlag schreddern", 
                rep: { "Chantal": -10 },
                m: 2, f: 0, a: -5, c: 10, 
                r: "Der Schredder frisst das pinke Papier. Chantal wird dich hassen, aber beweisen kann sie nichts. Eskalation akzeptiert." 
            },
            { 
                t: "Gegenrechnung stellen: 'Arbeitszeit'", 
                rep: { "Chantal": -15 },
                m: 10, f: 5, a: -10, c: 5, 
                r: "Du stellst ihr 150€ für 'IT-Support und psychologische Betreuung' in Rechnung. Patt-Situation. Chantal grüßt dich ab jetzt nicht mehr." 
            },
            { 
                t: "Zahlen und Frieden kaufen", 
                rep: { "Chantal": 10 },
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du legst 50€ in den Umschlag. Es tut weh, aber der Krieg ist (vielleicht) vorbei. Dein Portemonnaie weint." 
            }
        ]
    },
    {
        id: "cof_meeting_2b",
        title: "Der 'Breath-Ambassador'",
        reqStory: "path_meeting_join",
        text: "Da du beim Smoothie-Meeting so 'tolle Energie' gezeigt hast, wurdest du ungefragt zum 'Atem-Botschafter' der IT ernannt. Ein Paket mit Räucherstäbchen liegt auf deinem Platz mit der Notiz: 'Verteile Liebe im Serverraum!'",
        opts: [
            { 
                t: "Alles in den Müll werfen", 
                rep: { "Chantal": -10 },
                m: 2, f: 0, a: 5, c: 0, 
                r: "Weg damit. Du willst Admin sein, kein Guru. Chantal fragt später enttäuscht nach deiner Aura." 
            },
            { 
                t: "Die Rolle annehmen", 
                rep: { "Chantal": 15 },
                m: 10, f: 20, a: -10, c: -5, 
                r: "Du zündest ein Stäbchen an. Ab jetzt machst du offiziell 2 Stunden am Tag 'Atmosphären-Pflege'. Der Chef denkt, das sei eine Brandschutz-Übung." 
            },
            { 
                t: "Paket an Kevin weitergeben", 
                rep: { "Kevin": 5, "Chantal": -5 },
                m: 5, f: 5, a: 0, c: 0, 
                r: "'Hier Kevin, für deine Ausbildung.' Kevin freut sich. Er räuchert jetzt das Lager aus. Und dein Name taucht nirgends auf." 
            }
        ]
    },
    {
        id: "cof_meeting_2c",
		char: "Chantal",
        title: "Das Negativ-Beispiel",
        reqStory: "path_meeting_wait",
        text: "Du läufst am Meetingraum vorbei. Chantal hält eine Präsentation über 'Toxische Vibes'. Auf der Leinwand ist ein (heimlich aufgenommenes) Foto von DIR, wie du böse auf die Kaffeemaschine starrst. Untertitel: 'Der Energie-Vampir'.",
        opts: [
            { 
                t: "Reinplatzen und 'Rufmord!' rufen", 
                rep: { "Chantal": -10 },
                m: 5, f: 0, a: 20, c: 10, 
                r: "Du machst eine Szene. Das bestätigt leider genau ihre These. 'Seht ihr? Aggression!', ruft Chantal. Du hast verloren." 
            },
            { 
                t: "Foto machen & als Profilbild nutzen", 
                rep: { "Chantal": 3 },
                m: 5, f: 10, a: -10, c: 5, 
                r: "Du nimmst die Rolle an. Dein neues Teams-Profilbild ist der 'Energie-Vampir'. Die Kollegen finden es lustig. Chantal ist verwirrt." 
            },
            { 
                t: "Sicherung rausdrehen", 
                rep: { "Chantal": -15 },
                m: 10, f: -5, a: -5, c: 0, 
                r: "Zack. Beamer aus. Präsentation beendet. Du gehst pfeifend weiter. Niemand kann beweisen, dass du es warst." 
            }
        ]
    },
    {
        id: "cof_milk_1",
        title: "High Noon in der Küche",
        text: "Kollege Bernd (der Typ, der Fisch in der Mikrowelle warm macht) greift nach der allerletzten Packung H-Milch. Deine Hand landet im selben Moment darauf. Eure Blicke treffen sich. Die Luft knistert. Im Hintergrund spielt leise Western-Musik.",
        opts: [
            { 
                t: "Großzügig sein & den Vortritt lassen", 
                next: "path_milk_yield", 
                m: 2, f: 0, a: 10, c: -5, 
                r: "Du lässt los. Karma-Punkte! Aber dann der Schock: Bernd schüttet den gesamten Liter in seinen Früchtetee. Alles. Bis zum letzten Tropfen. Was für ein Monster." 
            },
            { 
                t: "Taktik 'Verbrannte Erde': Packung zerdrücken", 
                next: "path_milk_destroy", 
                m: 2, f: 0, a: -10, c: 10, 
                r: "Du drückst zu. Fest. PLATSCH! Der Karton platzt und ein weißer Tsunami ergießt sich über den Küchenboden. Du schreist: 'WENN ICH SIE NICHT KRIEGE, KRIEGT SIE KEINER!'" 
            },
            { 
                t: "Ein Duell fordern: Schere-Stein-Papier", 
                next: "path_milk_duel", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Stein schlägt Schere. Ein sauberer Sieg! Du nimmst die Trophäe an dich. Bernd zieht geschlagen ab und murmelt etwas von 'Best of Three', aber du hast die Milch schon offen." 
            }
        ]
    },
    {
        id: "cof_milk_2a",
        title: "Die Revanche",
        reqStory: "path_milk_duel",
        text: "Bernd fängt dich am Kopierer ab. Er wirkt unruhig und hält eine Münze in der Hand. 'Das mit der Milch war Glück, Müller. Ich fordere Genugtuung. Kopf oder Zahl um den letzten Keks im Meetingraum?'",
        opts: [
            { 
                t: "Die Wette annehmen", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Die Münze fliegt. Du gewinnst wieder. Bernd bricht fast zusammen." 
            },
            { 
                t: "'Glück gehört zum Können.'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du lässt ihn stehen. Bernd murmelt etwas von 'Angsthase', aber du weißt: Man soll aufhören, wenn man gewinnt." 
            }
        ]
    },
    {
        id: "cof_milk_2b",
        title: "Calcium-Mangel",
        reqStory: "path_milk_yield",
        text: "Du triffst Bernd wieder. Er sieht extrem zufrieden aus und klopft sich auf den Bauch. 'Danke nochmal für die Milch. Mein Tee war heute besonders cremig. Man muss sich auch mal was gönnen, nicht wahr?'",
        opts: [
            { 
                t: "'Pass auf deine Arterien auf.'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Bernd lacht nur. 'Ich habe Knochen aus Stahl!' Deine Großzügigkeit wird hier eindeutig als Schwäche ausgelegt." 
            },
            { 
                t: "'Die war eigentlich abgelaufen...'", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Bernds Gesichtsfarbe wechselt zu Grün. 'Was? Warum sagst du das erst jetzt?!' Er rennt Richtung Toilette. Rache ist ein Gericht, das man kalt serviert." 
            }
        ]
    },
    {
        id: "cof_milk_2c",
        title: "Das Embargo",
        reqStory: "path_milk_destroy",
        text: "An der Küchentür hängt ein neues Schild (laminiert!): 'Wegen mutwilliger Zerstörung von Molkerei-Produkten ist der Kühlschrank ab sofort videoüberwacht. Gez. Facility Management.' Alle Kollegen müssen jetzt ihre Milch beim Empfang anmelden.",
        opts: [
            { 
                t: "Stolz nicken", 
                m: 5, f: 0, a: -10, c: 10, 
                r: "Du hast ein Zeichen gesetzt. Es ist zwar unpraktisch für alle, aber niemand wird mehr wagen, dir die Milch wegzunehmen. Respekt durch Angst." 
            },
            { 
                t: "Unschuldig tun: 'Wer macht denn sowas?'",
                rep: { "Kevin": -5 }, 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Die Kollegen tuscheln. 'Bestimmt der Kevin.' Du nickst eifrig. Sündenböcke sind wichtig für das Betriebsklima." 
            }
        ]
    },
    {
        id: "cof_juergen_1",
        title: "Die Labertasche",
        text: "Jürgen aus dem Vertrieb blockiert die Kaffeemaschine. Er grinst dich breit an: 'Na, Kollege? Auch mal Pause? Du, ich MUSS dir unbedingt von meinem neuen Mähroboter erzählen. Der hat jetzt GPS-gestützten Kantenmodus!'",
        opts: [
            { 
                t: "Noise-Cancelling-Kopfhörer aufsetzen", 
                req: "headphones", 
                next: "path_juergen_nc",
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du setzt die Dinger auf, nickst freundlich und startest norwegischen Black Metal. Jürgen bewegt nur noch stumm den Mund. Himmlische Ruhe." 
            },
            { 
                t: "Höflich zuhören & innerlich sterben", 
                next: "path_juergen_listen",
                m: 20, f: 10, a: 15, c: 0, 
                r: "20 Minuten später kennst du den Unterschied zwischen Mulch-Keil und Seitenauswurf. Ein Teil deiner Seele hat den Körper verlassen. Jürgen droht: 'Morgen erzähl ich dir von meiner Wärmepumpe!'" 
            },
            { 
                t: "'OH GOTT, DER SERVER!' schreien und rennen", 
                next: "path_juergen_run",
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du täuschst einen fatalen Systemabsturz vor und sprintest aus der Küche. Freiheit schmeckt auch gut." 
            }
        ]
    },
    {
        id: "cof_juergen_2a",
        title: "Stummes Gespräch",
        reqStory: "path_juergen_nc",
        text: "Jürgen lehnt an deinem Schreibtisch, und du hast ihn nicht kommen hören. Die Kopfhörer sitzen noch. Er gestikuliert wild und fragt dich offensichtlich etwas. Du hörst absolut nichts außer Double-Bass-Drums.",
        opts: [
            { 
                t: "Einfach 'Daumen hoch' zeigen", 
                m: 5, f: -5, a: 10, c: 5,
                r: "Du grinst und machst 👍. Jürgen strahlt, klopft dir auf die Schulter und geht. 10 Min später kommt eine Mail: 'Danke, dass du am Samstag beim Umzug hilfst!'. Verdammt." 
            },
            { 
                t: "Kopfhörer lüften: 'HÄ?!'", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Du hebst eine Muschel an. Jürgen: '...ob du mal meinen Drucker... ach egal, du bist beschäftigt.' Er zieht ab." 
            },
            { 
                t: "Stumm den Kopf schütteln", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du schüttelst traurig den Kopf. Jürgen wirkt betroffen: 'Oh, das wusste ich nicht. Mein Beileid.' Er geht leise weg. Du hast keine Ahnung, worum es ging, aber es hat funktioniert." 
            }
        ]
    },
    {
        id: "cof_juergen_2b",
        title: "Jahresarbeitszahl",
        reqStory: "path_juergen_listen",
        text: "Du wolltest nur schnell Wasser holen. Jürgen lauert schon: 'Ah! Da bist du ja! Ich hatte dir ja die Datenblätter zur Vorlauftemperatur versprochen. Guck mal hier auf meinem Tablet...'",
        opts: [
            { 
                t: "Einen Phantom-Anruf vortäuschen", 
                m: 2, f: 5, a: 0, c: 5, 
                r: "Du hältst dir dein stummes Handy ans Ohr: 'Ja Chef? Sofort!' und rennst weg. Jürgen ruft hinterher: 'Wir reden später über den Pufferspeicher!'" 
            },
            { 
                t: "Seinen Fachfehler korrigieren", 
                m: 30, f: -10, a: 15, c: 0,
                r: "Du wolltest nur kurz klugscheißen. Aber jetzt steckst du in einer 30-minütigen Debatte über Geothermie vs. Luft-Wasser." 
            },
            { 
                t: "Sich tot stellen", 
                m: 10, f: 10, a: 10, c: 0, 
                r: "Du starrst durch ihn hindurch. Jürgen redet 10 Minuten am Stück, merkt dann, dass du nicht blinzelst, und geht irritiert. 'Ich schick dir das PDF...'" 
            }
        ]
    },
    {
        id: "cof_juergen_2c",
        title: "Kaffee-Service",
        reqStory: "path_juergen_run",
        text: "Jürgen steht an deinem Platz und stellt einen dampfenden Becher ab. 'Hier. Du bist ja vorhin so schnell weg wegen dem Server-Crash. Armer Kerl. Zucker, keine Milch, wie du es magst.'",
        opts: [
            { 
                t: "'Ich hab meinen eigenen Treibstoff.'", 
                req: "energy",
                m: 5, f: -20, a: 0, c: 0,
                r: "Du ziehst die Dose aus der Tasche. *ZISCH*. 'Das ist mein Treibstoff.' Du ext das Ding in drei Zügen. Jürgen weicht erschrocken zurück: 'Okay, okay, ganz ruhig...' Er verschwindet, bevor dein Herzrasen einsetzt." 
            },
            { 
                t: "Dankbar annehmen & trinken", 
                m: 15, f: -5, a: -10, c: 0, 
                r: "Der Kaffee weckt deine Lebensgeister. Leider setzt sich Jürgen auf deinen Schreibtisch: 'Also, wo war ich... genau, der Mähroboter!' Du hörst zu, weil du in seiner Schuld stehst." 
            },
            { 
                t: "'Was willst du?'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Jürgen lacht: 'Nur nett sein! Mensch, ihr ITler seid immer so paranoid.' Er geht kopfschüttelnd. Der Kaffee schmeckt nach Schuldgefühlen, ist aber lecker." 
            }
        ]
    },
    {
        id: "cof_loot_1",
        title: "Reparatur-Set",
        text: "Der Hausmeister hat Material liegen lassen. Es ist unbeaufsichtigt. Ein seltener Anblick in diesem Büro.",
        opts: [
            { 
                t: "Panzertape nehmen", 
                loot: "tape", 
                next: "path_loot_tape", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Eine fast volle Rolle Gaffa. Kann man immer brauchen. Du lässt sie schnell verschwinden." 
            },
            { 
                t: "Kabelbinder nehmen", 
                loot: "zip_ties", 
                next: "path_loot_zip", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Ein Bündel Kabelbinder. Praktisch. Die schwarze Sorte, UV-beständig. Ein guter Fang." 
            }
        ]
    },
    {
        id: "cof_loot_2a",
		char: "Egon",
        title: "Die Suche nach dem Gold",
        reqStory: "path_loot_tape",
        text: "Egon kommt fluchend in die Küche. 'Hömma! Hast du mein Gaffa gesehen? Der Mülleimerdeckel ist abgerissen und ich muss das tapen! Das war die gute Rolle!'",
        opts: [
            { 
                t: "Tipp geben: 'Nimm Kaugummi.'",
                rep: { "Egon": -5 }, 
                m: 5, f: 5, a: 10, c: 0, 
                r: "Egon hebt eine Braue. 'Kaugummi? Bin ich MacGyver?' Er schüttelt den Kopf über die 'Büro-Hengste' und geht." 
            },
            { 
                t: "'Nö, keine Ahnung.'",
                rep: { "Egon": -2 },
                m: 2, f: 0, a: 5, c: 0, 
                r: "Egon tritt gegen den Mülleimer. 'Verdammte Diebe hier! Alles muss man anketten!' Er zieht wütend ab." 
            },
            { 
                t: "Ihn ehrlich abgeben", 
                rem: "tape",
                rep: { "Egon": 5 },
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du ziehst die Rolle aus der Tasche. 'Wollte sie nur... aufheben.' Egon reißt sie dir aus der Hand. 'Ja ja. Finger weg.'" 
            }
        ]
    },
    {
        id: "cof_loot_2b",
		char: "Egon",
        title: "Haltlos",
        reqStory: "path_loot_zip",
        text: "Der Spülmaschinenschlauch hat sich gelöst. Egon kniet davor. 'Mir fehlen meine Kabelbinder! Ich hatte doch ein ganzes Bündel! Jetzt muss ich das festhalten, bis der Kleber trocknet (30 Minuten).'",
        opts: [
            { 
                t: "Mitleid heucheln & gehen", 
                rep: { "Egon": -2 },
                m: 2, f: 5, a: 0, c: 0, 
                r: "'Viel Erfolg, Egon!' Du lässt ihn leiden. Du brauchst die Binder dringender für dein Kabelmanagement am Platz." 
            },
            { 
                t: "Binder spenden", 
                rem: "zip_ties",
                rep: { "Egon": 10 }, 
                m: 10, f: -5, a: -10, c: 0, 
                r: "Du gibst ihm die Binder zurück. 'Oh, danke Jung! Du rettest meinen Rücken.' Egon schuldet dir was." 
            },
            { 
                t: "'Hast du kein Tape?'",
                rep: { "Egon": -5 }, 
                m: 5, f: 5, a: 10, c: 0, 
                r: "'Tape hält da nicht bei der Hitze, du Experte!' Er ist genervt. Du hast deinen Spaß und deine Kabelbinder." 
            }
        ]
    },
    {
        id: "cof_table_1",
        title: "Wackelnder Tisch",
        text: "Der Stehtisch in der Küche wackelt extrem. Der Kaffee schwappt fast über. Es ist dieser eine Millimeter, der dich in den Wahnsinn treibt.",
        opts: [
            { 
                t: "Die Schrauben brachial festziehen", 
                req: "screw", 
                next: "path_table_screw", 
                m: 10, f: -5, a: -5, c: 0, 
                r: "Du drehst die Schrauben so fest in den Boden, dass das Metall knirscht. Der Tisch bewegt sich keinen Mikrometer mehr. Er ist jetzt eins mit dem Fundament." 
            },
            { 
                t: "Bierdeckel drunter", 
                next: "path_table_coaster", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Der Klassiker. Ein alter Bierdeckel ('Gasthof zur Post') unter das Bein geklemmt. Ruhe ist." 
            },
            { 
                t: "Tischbein abtreten", 
                req: "hammer", 
                next: "path_table_kick", 
                m: 5, f: 0, a: -20, c: 20, 
                r: "Du holst mit dem Hammer aus. KRACH! Das Bein knickt weg, der Tisch stürzt ein. 'So. Jetzt wackelt nix mehr', sagst du zufrieden." 
            }
        ]
    },
    {
        id: "cof_table_2a",
		char: "Egon",
        title: "Für die Ewigkeit",
        reqStory: "path_table_screw",
        text: "Der Hausmeister steht rot anlaufend und schwitzend am Tisch. Er zerrt mit beiden Händen daran. 'Wer hat das Ding festgeschweißt?! Ich muss hier wischen! Das bewegt sich keinen Millimeter!'",
        opts: [
            { 
                t: "'Das war Qualitätsarbeit.'", 
                rep: { "Egon": -5 },
                m: 5, f: -5, a: -5, c: 0, 
                r: "Egon starrt dich an. 'Du hast durch den Estrich in die Fußbodenheizung gebohrt!' Ups. Aber hey, der Tisch steht stabil." 
            },
            { 
                t: "Die Flucht ergreifen", 
                rep: { "Egon": -2 },
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du pfeifst unschuldig und gehst. Im Rücken hörst du schon, wie Egon eine Brechstange ansetzt. Der Tisch gewinnt." 
            }
        ]
    },
    {
        id: "cof_table_2b",
		char: "Kevin",
        title: "Low-Rider",
        reqStory: "path_table_coaster",
        text: "Der Bierdeckel ist weg. Dafür ist der Tisch jetzt nur noch 60cm hoch. Kevin steht stolz daneben, eine Säge in der Hand. 'Der Deckel hat genervt. Hab einfach die anderen drei Beine abgesägt. Jetzt wackelt nix mehr!'",
        opts: [
            { 
                t: "Ihn fragen: 'Und wenn er wieder wackelt?'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Kevin überlegt kurz. 'Dann säge ich weiter.' Du realisierst: In einer Woche essen wir vom Boden." 
            },
            { 
                t: "Ihn loben: 'Genial!'", 
                rep: { "Kevin": 5 },
                m: 5, f: 10, a: -10, c: -5, 
                r: "Kevin strahlt. Ihr trinkt jetzt Kaffee im Hocken. Es sieht aus wie im Kindergarten, ist aber ergonomisch mal was anderes." 
            }
        ]
    },
    {
        id: "cof_table_2c",
		char: "Chantal",
        title: "Das Mahnmal",
        reqStory: "path_table_kick",
        text: "Der zerstörte Tisch liegt immer noch da. Aber jetzt ist rotes Absperrband drumherum. Ein Schild von Chantal steht davor: 'DECONSTRUCTED WORKSPACE – Eine Installation über den Zusammenbruch der Leistungsgesellschaft.'",
        opts: [
            { 
                t: "Dagegen treten", 
                rep: { "Chantal": -5 },
                m: 5, f: -5, a: -10, c: 15, 
                r: "Du trittst gegen den Schrotthaufen. Es scheppert. Die Umstehenden applaudieren. 'So mutig! So radikal!' Die Welt ist verrückt." 
            },
            { 
                t: "Als Künstler ausgeben", 
                rep: { "Chantal": 10 },
                m: 10, f: 20, a: -10, c: 10, 
                r: "Du stellst dich daneben und nickst tiefsinnig. 'Ja, der Hammer symbolisierte den digitalen Wandel.' Chantal macht Fotos für LinkedIn. Du bist jetzt ein Visionär." 
            }
        ]
    },
    {
        id: "cof_sticky_1",
        title: "Die verklebte Taste",
        text: "Katastrophe! Die überlebenswichtige 'Doppelter Espresso'-Taste klebt fest. Ein brauner, sirupartiger Rand verrät: Jemand hat hier Süßkram verschüttet. Der Knopf rührt sich keinen Millimeter.",
        opts: [
            { 
                t: "Chirurgischer Eingriff mit dem Schraubendreher", 
                req: "screw", 
                next: "path_sticky_fixed",
                m: 5, f: 0, a: -5, c: 0, 
                r: "Mit der Präzision eines Uhrmachers hebelst du die Taste raus, kratzt den 'Zucker-Beton' weg und setzt sie wieder ein. *Klick*. Ein wunderschönes Geräusch." 
            },
            { 
                t: "Einfach draufhauen", 
                next: "path_sticky_broken",
                m: 2, f: 0, a: 5, c: 5, 
                r: "BAM! KNACK! Die Taste bricht ab und fliegt in hohem Bogen unter den Kühlschrank. Ups. Jetzt gibt es nur noch die Wahl zwischen 'Heißes Wasser' und 'Systemfehler'." 
            },
            { 
                t: "Aufgeben & Tee trinken", 
                next: "path_sticky_tea",
                m: 2, f: -5, a: 0, c: 0, 
                r: "Du resignierst und nimmst einen Beutel Pfefferminztee. Er schmeckt nach Niederlage und Zahnpasta." 
            }
        ]
    },
    {
        id: "cof_sticky_2a",
        title: "Der Wartungs-Stau",
        reqStory: "path_sticky_fixed",
        text: "Da du als Einziger die Maschine repariert hast, giltst du jetzt als 'Kaffee-Beauftragter'. Eine Schlange von Kollegen steht vor deinem Büro. 'Kannst du mal gucken? Die Milch schäumt nicht rechtsdrehend!'",
        opts: [
            { 
                t: "Schild aufstellen: 'IT, nicht Café!'", 
                m: 5, f: 0, a: 10, c: 5, 
                r: "Du schickst alle weg. Sie murren, aber du hast deine Ruhe." 
            },
            { 
                t: "Service gegen Gebühr anbieten", 
                m: 10, f: 10, a: -10, c: 0, 
                r: "Du verlangst Schokolade für jede Reparatur. Dein Schreibtisch ist jetzt ein Süßwarenladen." 
            }
        ]
    },
    {
        id: "cof_sticky_2b",
        title: "Die Sabotage-Ermittlung",
        reqStory: "path_sticky_broken",
        text: "Ein Aushang hängt an der Maschine: 'Wegen Vandalismus (abgebrochene Taste) gibt es nur noch Filterkaffee aus der Kanne.' Die Stimmung im Büro ist aggressiv. Alle suchen den Täter.",
        opts: [
            { 
                t: "Kevin beschuldigen", 
                rep: { "Kevin": -5 },
                m: 5, f: 0, a: -5, c: -5, 
                r: "Es ist immer Kevin. Er muss jetzt den Filterkaffee kochen. Dein Gewissen zwickt kurz, aber der Espresso war das Opfer wert." 
            },
            { 
                t: "Laut mitschimpfen: 'Unfassbar!'", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du mischt dich unter das Volk und wetterst gegen 'diese Chaoten'. Niemand verdächtigt dich. Die Tarnung ist perfekt." 
            }
        ]
    },
    {
        id: "cof_sticky_2c",
		char: "Gabi",
        title: "Der Teetrinker",
        reqStory: "path_sticky_tea",
        text: "Du wirst mit deiner Teetasse gesehen. Das Gerücht verbreitet sich: 'Müller trinkt keinen Kaffee mehr. Ist er krank? Burnout? Oder schwanger?' Die Kollegen behandeln dich seither auffällig vorsichtig.",
        opts: [
            { 
                t: "'Die Taste war nur kaputt.'", 
                rep: { "Gabi": -2 },
                m: 2, f: 0, a: 5, c: 0, 
                r: "'Achso.' Der Zauber ist vorbei. Gabi nimmt die Kekse wieder mit. Die Realität ist hart." 
            },
            { 
                t: "Das Gerücht nutzen", 
                rep: { "Gabi": 5 },
                m: 10, f: 10, a: -10, c: 0, 
                r: "Du hustest leise und schaust leidend. Gabi bringt dir Kekse. 'Für die Nerven.' Es lebt sich gut als angeblicher Invalide." 
            }
        ]
    },
    {
        id: "cof_hack_1",
        title: "Der Service-Port",
        text: "Du entdeckst an der Rückseite der Kaffeemaschine einen USB-Wartungsport. Das Display zeigt 'INSERT SERVICE KEY'. Es ist verlockend. Sehr verlockend.",
        opts: [
            { 
                t: "Den USB-Stick anstöpseln und das Script laden", 
                req: "usb_stick", 
                next: "path_hack_root", 
                m: 5, f: 10, a: -10, c: 0, 
                r: "HACK SUCCESS! Du hast den 'Developer Mode' aktiviert. Der Kaffee läuft jetzt doppelt so schnell und ist kostenlos. Du fühlst dich wie Neo in der Matrix." 
            },
            { 
                t: "Den Konami-Code probieren", 
                next: "path_hack_glitch", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "Oben, Oben, Unten, Unten, Links, Rechts... Das Display flackert wild. Es piept dreimal laut. Du hoffst, dass das ein 'Cheat Code' war und keine Selbstzerstörung." 
            }
        ]
    },
    {
        id: "cof_hack_2a",
        title: "God Mode",
        reqStory: "path_hack_root",
        text: "Seit deinem Hack begrüßt dich die Maschine mit 'HELLO ADMIN' und spielt eine 8-Bit-Melodie. Der Chef steht daneben und starrt auf sein Display, das nur 'PLEASE INSERT COIN' anzeigt. Er schaut misstrauisch zu deinem randvollen Gratis-Becher.",
        opts: [
            { 
                t: "'Man muss die Maschine nur streicheln.'", 
                m: 5, f: 5, a: -5, c: 10, 
                r: "Der Chef streichelt die Maschine. Nichts passiert. Er fühlt sich veräppelt. Du grinst in deinen Kaffee. Das war es wert." 
            },
            { 
                t: "'Das ist ein Firmware-Bug!'", 
                m: 10, f: 0, a: 10, c: 0, 
                r: "'Wirklich? Kümmern Sie sich drum, Müller!' Er geht. Puh. Du behältst deine Privilegien, musst jetzt aber so tun, als würdest du arbeiten." 
            }
        ]
    },
    {
        id: "cof_hack_2b",
        title: "Die Sprachbarriere",
        reqStory: "path_hack_glitch",
        text: "Deine Tastenkombination hat offenbar die Spracheinstellungen verändert. Das Menü ist jetzt komplett auf Mandarin. Eine Schlange verzweifelter Kollegen steht davor. Kevin hat aus Versehen 'Heißes Wasser mit Zitrone' statt 'Kakao' gezogen.",
        opts: [
            { 
                t: "Google Translate App nutzen", 
                m: 5, f: 5, a: -10, c: -10, 
                r: "Du hältst dein Handy davor und rettest den Tag. Du bist der Held, obwohl du das Problem verursacht hast. Das ist wahres IT-Consulting." 
            },
            { 
                t: "'Das ist ein Cyber-Angriff aus China!'", 
                m: 5, f: 0, a: 10, c: 15, 
                r: "Panik bricht aus. Der Chef will das Internetkabel ziehen. Du hast vielleicht etwas übertrieben, aber niemand verdächtigt dich." 
            }
        ]
    },
    {
        id: "cof_chewing_1",
        title: "Die akustische Folter",
        text: "Kollegin Sabine steht direkt neben dir. In der Hand: Ein knackiger, saftiger Granny Smith. Sie beißt hinein. *KNACK*. Dann kaut sie. Mit weit offenem Mund. *SCHMATZ... SCHMATZ... SCHLÜRF*. Es klingt, als würde jemand Gummistiefel in einen Eimer Mayonnaise tauchen.",
        opts: [
            { 
                t: "Sofort Noise-Cancelling aktivieren", 
                req: "headphones", 
                next: "path_chewing_nc", 
                m: 2, f: 5, a: -10, c: 0, 
                r: "Klick. Die Welt verstummt. Sabine bewegt den Kiefer wie ein Wiederkäuer und sagt offensichtlich etwas zu dir, aber du hörst nur noch sanftes Meeresrauschen. Du nickst einfach freundlich und lächelst." 
            },
            { 
                t: "Den Stressball fast zerquetschen", 
                req: "stressball", 
                next: "path_chewing_ball", 
                m: 10, f: 0, a: -5, c: 0, 
                r: "Du kanalisiert deinen gesamten Hass in den roten Schaumstoffball. Deine Knöchel treten weiß hervor. Der Ball wimmert leise unter dem Druck. Sabine kaut unbeeindruckt weiter." 
            },
            { 
                t: "Passiv-aggressiver Kommentar", 
                next: "path_chewing_rude",
                m: 5, f: 0, a: 10, c: 5, 
                r: "Du fragst laut: 'Sag mal, hast du ein Mikrofon verschluckt oder übst du für einen Horrorfilm?' Sabine erstarrt mit vollem Mund. Tödliches Schweigen. Die Stimmung ist im Keller." 
            }
        ]
    },
    {
        id: "cof_chewing_2a",
        title: "Das blinde Nicken",
        reqStory: "path_chewing_nc",
        text: "Später am Tag kommt Sabine freudestrahlend zu dir. 'Super, dass du das machst! Ich habe allen gesagt, dass du dich freiwillig gemeldet hast, den Kühlschrank abzutauen. Du hast ja vorhin in der Küche so nett genickt!'",
        opts: [
            { 
                t: "Das Missverständnis aufklären", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Sabine bricht in Tränen aus. 'Und ich dachte, du wärst hilfsbereit!' Jetzt bist du der Arsch der Abteilung, obwohl du nur Musik hören wolltest." 
            },
            { 
                t: "Zähneknirschend putzen", 
                m: 15, f: -5, a: 10, c: -10, 
                r: "Du taust das Eisfach ab. Es ist kalt, nass und eklig. Merke: Niemals nicken, wenn man nichts hört." 
            }
        ]
    },
    {
        id: "cof_chewing_2b",
        title: "Materialermüdung",
        reqStory: "path_chewing_ball",
        text: "Du findest rote Krümel in deiner Tasche. Dein Stressball hat den Kampf gegen Sabines Kaugeräusche nicht überlebt. Er ist geplatzt und hat seinen schaumstoffartigen Inhalt über deinem Laptop verteilt.",
        opts: [
            { 
                t: "Versuchen zu kleben", 
                req: "tape", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du wickelst Panzertape um den Rest. Er sieht jetzt aus wie eine rote Kartoffel, die einen Unfall hatte. Funktioniert kaum noch." 
            },
            { 
                t: "Eine kleine Trauerfeier am Mülleimer abhalten", 
                rem: "stressball",
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du wirfst die Reste in den Müll. Er ist als Held gestorben. Ruhe in Frieden, kleiner Ball." 
            },
            { 
                t: "Die Reste einfach wegpusten", 
                m: 3, f: 5, a: 5, c: 0, 
                r: "Du pustest die Schaumstoffkrümel vom Laptop. Eine kleine rote Wolke segelt durchs Großraumbüro, ein Krümel landet in Sabines Kaffee. Sie kaut unbeeindruckt weiter." 
            }
        ]
    },
    {
        id: "cof_chewing_2c",
        title: "Der Obst-Krieg",
        reqStory: "path_chewing_rude",
        text: "Sabine hat Rache geschworen. Seit deinem Kommentar isst sie demonstrativ nur noch weiche Sachen, wenn du da bist – starrt dich dabei aber böse an. Heute liegt eine Banane auf deiner Tastatur. Eine Drohung?",
        opts: [
            { 
                t: "Demonstrativ die Banane essen", 
                m: 10, f: 5, a: -10, c: 0, 
                r: "Du schälst die Banane und isst sie, ohne den Augenkontakt zu brechen. Sabine ist verwirrt und zieht sich zurück. Sieg." 
            },
            { 
                t: "Angst bekommen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Wer weiß, wo diese Banane war? Du fasst sie nur mit einem Tuch an und entsorgst sie. Der psychologische Krieg hat begonnen." 
            }
        ]
    },
    {
        id: "cof_gossip_1",
        title: "Tratsch am Wasserspender",
        text: "Du hörst Frau Gräte flüstern: 'Der Chef war gestern im Seminar 'Positive Leadership'. Er flippt jetzt total aus, wenn jemand das Wort 'Problem' sagt. Er will nur noch 'Herausforderung' hören. Wer 'Problem' sagt, kriegt sofort die Kündigungsandrohung.'",
        opts: [
            { 
                t: "Ins Gespräch einsteigen", 
                next: "path_gossip_caught", 
				rep: { "Dr. Wichtig": -2 },	
                m: 10, f: 5, a: -5, c: 10,
                r: "Du nickst eifrig und lästerst mit. Plötzlich räuspert sich jemand hinter dir. Der Chef starrt dich an, tippt auf seine Uhr und notiert sich deinen Namen. Die Gruppe löst sich panisch auf." 
            },
            { 
                t: "Ignorieren und Kaffee holen", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du stellst die Ohren auf Durchzug. 'Nicht mein Zirkus, nicht meine Affen.' Du nimmst deinen Becher und gehst wortlos zurück an den Platz. Sicher ist sicher." 
            }
        ]
    },
    {
        id: "cof_gossip_2a",
		char: "Dr. Wichtig",
        title: "Das Mindset-Verhör",
        reqStory: "path_gossip_caught",
        text: "Der Chef zitiert dich in sein Büro. Er lächelt gequält. 'Müller, ich habe Sie vorhin in der Küche gehört. Ich möchte sichergehen, dass wir 'aligned' sind. Wie läuft das aktuelle Projekt? Gibt es... Schwierigkeiten?' Er wartet lauernd auf ein bestimmtes Wort.",
        opts: [
            { 
                t: "'Eine fantastische Growth-Opportunity!'", 
				rep: { "Dr. Wichtig": 2 },	
                m: 5, f: 10, a: -5, c: 0, 
                r: "Der Chef wirkt kurz verwirrt, nickt dann aber anerkennend. 'Wow. Das ist ja noch positiver als mein Coach. Weiter so!' Er macht sich eine Notiz: 'Müller = Visionär'." 
            },
            { 
                t: "Ehrlich sein: 'Ja, wir haben ein riesiges Problem.'", 
				rep: { "Dr. Wichtig": -10 },	
                m: 5, f: 0, a: 10, c: 20, 
                r: "Das Dauerlächeln bekommt Risse. 'PROBLEM?! Wir haben keine Probleme! Wir haben nur Dornen im Auge des Erfolgs!' Er hält dir einen 20-minütigen Vortrag über Positivität. Du hast jetzt Kopfschmerzen." 
            },
            { 
                t: "Bullshit-Bingo: 'Nur spannende Herausforderungen!'", 
				rep: { "Dr. Wichtig": 5 },	
                m: 10, f: 5, a: -10, c: -10, 
                r: "Der Chef atmet erleichtert aus. 'Exzellent! Das ist der Spirit! Here, take a cookie.' Er wirft dir einen einzeln verpackten Keks zu. Du bist sicher." 
            }
        ]
    },
    {
        id: "cof_chef_title",
        title: "Titel-Kämpfe in der Kantine",
        text: "Du hörst lautes Geschrei aus der Küche. Der Kantinen-Chef fuchtelt wild mit einer Schöpfkelle herum: 'Ich bin doch kein schnöder KOCH! Ich bin *Senior Nutrition Artist* und *Food Experience Manager*! Wer mich noch einmal 'Koch' nennt, kriegt versalzene Suppe bis zur Rente!'",
        opts: [
            { 
                t: "'Herr Koch? Die Suppe ist kalt!'", 
                m: 5, f: 0, a: 10, c: 5, 
                r: "Die Kelle verharrt mitten in der Bewegung. Er wendet sich langsam um, und sein Blick wird schmal und sehr persönlich. Die schwarze Liste der Kantine ist nirgends dokumentiert, aber ab heute stehst du darauf. Dein nächstes Schnitzel wird Schuhsohlen-Qualität haben." 
            },
            { 
                t: "'Guten Morgen, Maestro!'", 
                m: 10, f: 5, a: -5, c: 0, 
                r: "Er hält inne, rückt seine Mütze zurecht und lächelt geschmeichelt. 'Endlich jemand mit Kultur!' Du bekommst heute eine extra große Portion Pudding." 
            },
            { 
                t: "Amüsiert grinsend zuhören", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "'Nutrition Artist'... soso. Wenn er ein Künstler ist, warum schmeckt die Bolognese dann immer nach Pappe? Du behältst den Gedanken lieber für dich." 
            }
        ]
    },
    {
        id: "cof_premium_hack_1",
        title: "Der 'Gold' Modus",
        text: "Du stehst vor der Maschine. Dein Magen knurrt. Auf dem Display steht: 'PREMIUM RÖSTUNG - NUR FÜR VORSTAND (Karte erforderlich)'. Für das Fußvolk gibt es nur 'Wasser mit brauner Farbe' für 2,50€.",
        opts: [
            { 
                t: "Wild Tasten drücken", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "ERROR 404. Die Maschine sperrt sich für 5 Minuten. Du starrst auf den Ladebalken. Toll gemacht." 
            },
            { 
                t: "Zähneknirschend 2,50€ bezahlen", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du wirfst das Geld ein. Der Kaffee schmeckt nach verbrannten Reifen und Niederlage." 
            },
            { 
                t: "Espresso + Sensor zuhalten",
                next: "path_premium_audit",
                m: 5, f: 10, a: -20, c: 0, 
                r: "Die Maschine piept leise. Das Display zeigt: 'WELCOME MASTER'. Goldene Flüssigkeit fließt in deine Tasse. Es ist der beste Kaffee deines Lebens. Gratis." 
            },
            { 
                t: "Mit Hammer 'bezahlen'", 
                req: "hammer", 
                next: "path_premium_broken",
                m: 5, f: 0, a: -10, c: 20, 
                r: "KLONG! Du schlägst gegen den Münzschlitz. Das Gehäuse verbeult, aber eine 50-Cent-Münze fällt raus. Kaffee gibt es keinen, aber du hast Gewinn gemacht." 
            }
        ]
    },
    {
        id: "cof_premium_hack_2a",
        title: "Die Abrechnung",
        reqStory: "path_premium_audit",
        text: "Eine Rundmail vom Controlling: 'Achtung! Wir haben eine Differenz im Premium-Kaffee-Bestand. 1 Tasse fehlt. Der Verbrauch wird ab sofort mit den Sicherheitskameras abgeglichen.'",
        opts: [
            { 
                t: "Proaktiv lügen: 'Die Maschine hat geleckt!'", 
                m: 5, f: 5, a: 0, c: 10, 
                r: "Du antwortest 'Reply All'. 'Habe gesehen, wie Kaffeewasser ausgelaufen ist. Technik informieren!' Alle danken dir für deine Wachsamkeit. Genius." 
            },
            { 
                t: "Nervös schwitzen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du hoffst einfach, dass die Kameraauflösung zu schlecht war. Der Kaffee war es wert, aber du traust dich heute nicht mehr in die Küche." 
            }
        ]
    },
    {
        id: "cof_premium_hack_2b",
		char: "Egon",
        title: "Vandalismus-Alarm",
        reqStory: "path_premium_broken",
        text: "Der Hausmeister steht vor der verbeulten Maschine. Er hält ein Phantombild hoch, das verdächtig nach dir aussieht (aber mit Schnurrbart). 'Wer auch immer das war... ich finde ihn. Niemand verbeult meine Lady.'",
        opts: [
            { 
                t: "Die Schuld auf den Spediteur schieben", 
                rep: { "Egon": 2 },
                m: 5, f: 5, a: -5, c: 5, 
                r: "'Das war doch schon bei der Lieferung so, Egon!' Egon kratzt sich am Kopf. 'Stimmt... die Kartons sahen übel aus.' Verdacht abgewendet." 
            },
            { 
                t: "Sich unauffällig verdrücken", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du gehst rückwärts aus dem Raum. Das mit den 50 Cent erzählst du lieber niemandem." 
            }
        ]
    },
    {
        id: "cof_iot_fail_1",
        title: "Das gefährliche IoT-Upgrade",
        text: "Du traust deinen Augen nicht: Jemand hat einen billigen 'Smart Plug' (Marke 'China-Export') zwischen Steckdose und Kaffeemaschine gebastelt. Das Gehäuse schmilzt bereits, es funkt blau und riecht beißend nach verbranntem Weichmacher. Brandgefahr Stufe Rot.",
        opts: [
            { 
                t: "Sofort den Stecker ziehen", 
                next: "path_iot_sabotage", 
                m: 10, f: -5, a: 30, c: 30, 
                r: "ZACK! Funkenregen. Du hast das Gebäude gerettet. Da stürmt der Marketing-Chef mit knallrotem Kopf rein: 'MEIN PROTOTYP! Ich habe wochenlang an der Blockchain-basierten 'Coffee-Cloud' gearbeitet! Sie Maschinenstürmer!'" 
            },
            { 
                t: "Abwarten & Cola trinken", 
                next: "path_iot_fire", 
                m: 5, f: 10, a: -10, c: 0, 
                r: "Nicht deine Hardware, nicht dein Feuer. Du öffnest zischend eine Cola und schaust zu. POFF! Eine Stichflamme. Dann springt die Sprinkleranlage an und verwandelt den Flur in ein Feuchtbiotop." 
            }
        ]
    },
    {
        id: "cof_iot_fail_2a",
        title: "Der Crypto-Krieg",
        reqStory: "path_iot_sabotage",
        text: "Der Marketing-Chef hat eine offizielle Beschwerde eingereicht. Er fordert Schadensersatz für den 'entgangenen Gewinn' seines geplanten 'Coffee-Coin' ICOs, den du durch das Ziehen des Steckers verhindert hast.",
        opts: [
            { 
                t: "Egon einschalten", 
                rep: { "Egon": 5 },
                m: 10, f: -5, a: -10, c: 10, 
                r: "Du petzt beim Hausmeister. Egon stürmt mit dem Bolzenschneider ins Marketing-Büro. 'Keine Fremdgeräte!' Das Schreien hört man bis in den 3. Stock." 
            },
            { 
                t: "Ihm die VDE-Vorschrift vorlesen", 
                m: 5, f: -5, a: 10, c: 5, 
                r: "Du zitierst Paragrafen über Brandschutz. Er schläft nach 2 Minuten ein. Die Beschwerde wird fallengelassen wegen 'Langeweile'." 
            }
        ]
    },
    {
        id: "cof_iot_fail_2b",
        title: "Das Feuchtbiotop",
        reqStory: "path_iot_fire",
        text: "Die Feuerwehr ist weg, aber die Küche steht unter Wasser. Der Marketing-Chef steht heulend vor seinem verkohlten Smart-Plug. 'Warum hat niemand was gesagt?!'",
        opts: [
            { 
                t: "'Ist das diese Liquid-Cooling?'", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "Böser Witz. Aber er musste sein. Der Marketing-Chef hasst dich jetzt, aber die IT-Abteilung feiert dich als Legende." 
            },
            { 
                t: "Schultern zucken: 'War im Meeting'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Die perfekte Ausrede. Dass du mit Cola daneben standst, steht in keinem Protokoll. Du bleibst trocken." 
            }
        ]
    },
{
        id: "cof_descaling_1",
        title: "Kalk-Infarkt",
        text: "Die Kaffeemaschine blinkt in aggressivem Rot: 'SYSTEM VERKALKT - BITTE REINIGEN'. Der Kaffee tröpfelt nur noch im Sekundentakt wie eine undichte Dachrinne in die Tasse. Die Pumpe ächzt hörbar.",
        opts: [
            { 
                t: "Schild 'DEFEKT' drankleben & verschwinden", 
                next: "path_descale_fake", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du klebst einen Zettel über das Display und machst dich schnell aus dem Staub. Die Kollegen seufzen enttäuscht und schlurfen zurück an die Arbeit. Du hast das Problem zwar nicht gelöst, aber erfolgreich delegiert." 
            },
            { 
                t: "Den Reinigungsvorgang heldenhaft starten", 
                next: "path_descale_hero", 
                m: 10, f: -10, a: 40, c: 0, 
                r: "Du drückst den Knopf. Ein fataler Fehler. Das Display zeigt: 'Reinigung läuft... Restzeit: 45 Minuten'. Hinter dir bildet sich sofort eine wütende Schlange. 'Toll, Müller! Jetzt kriegt keiner mehr was!' Du wirst ausgebuht." 
            },
            { 
                t: "Ignorieren & tröpfeln lassen", 
                next: "path_descale_ignore", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du starrst stoisch auf den Auslauf. Tropf... Tropf... Nach 5 Minuten hast du eine halbe Tasse lauwarme, kalkhaltige Brühe. Sie schmeckt nach Elend, aber sie enthält Koffein." 
            }
        ]
    },
    {
        id: "cof_descaling_2a",
        title: "Säure-Attentat",
        reqStory: "path_descale_hero",
        text: "Die Entkalkung ist durch, aber irgendwas stimmt nicht. Der erste Kollege, der sich einen Kaffee zieht, spuckt ihn quer durch den Raum. 'BAH! Das schmeckt nach Batteriesäure! Wer hat nicht gespült?!'",
        opts: [
            { 
                t: "Unschuldig pfeifen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du schaust weg. 'Bestimmt ein Software-Fehler.' Der Kollege spült seinen Mund am Wasserspender aus. Knapp war's." 
            },
            { 
                t: "'Das ist die neue Citrus-Röstung.'", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Der Kollege probiert noch mal vorsichtig. 'Echt? Hm... erfrischend im Abgang.' Du hast gerade einen widerlichen Trend gesetzt." 
            }
        ]
    },
    {
        id: "cof_descaling_2b",
		char: "Egon",
        title: "Egon deckt auf",
        reqStory: "path_descale_fake",
        text: "Hausmeister Egon wedelt mit deinem 'DEFEKT'-Zettel durch den Flur. 'Welcher Scherzkeks war das? Die Maschine wollte nur entkalkt werden! Ich bin doch nicht euer Kindermädchen!' Er sucht den Schuldigen.",
        opts: [
            { 
                t: "Kevin beschuldigen", 
                rep: { "Kevin": -5, "Egon": 5 },
                m: 5, f: 0, a: -5, c: -5, 
                r: "'Der Azubi war zuletzt in der Küche.' Egon nickt grimmig und stapft Richtung Azubi-Büro. Dein Gewissen ist schwarz, aber rein." 
            },
            { 
                t: "Sich stellen: 'Ich wollte nichts kaputt machen'", 
                rep: { "Egon": 2 },
                m: 5, f: -5, a: 0, c: 0, 
                r: "Egon schnaubt. 'Typisch Schreibtischtäter. Zwei linke Hände.' Aber er beruhigt sich. Du darfst weiterleben." 
            }
        ]
    },
    {
        id: "cof_descaling_2c",
        title: "Innere Werte",
        reqStory: "path_descale_ignore",
        text: "Dein Magen grummelt seltsam. Du hast das Gefühl, einen halben Ziegelstein verschluckt zu haben. Offenbar war in dem 'Kaffee' mehr Kalk als Wasser.",
        opts: [
            { 
                t: "'Das ist gut für die Knochen.'", 
                m: 2, f: 5, a: 5, c: 0, 
                r: "Mineralstoffe sind wichtig. Du redest dir ein, dass du dich gesund ernährst. Der Schmerz ist nur Schwäche, die den Körper verlässt." 
            },
            { 
                t: "Literweise Wasser trinken", 
                m: 5, f: 5, a: 5, c: 0, 
                r: "Du versuchst, das Sediment aus deinem Körper zu spülen. Du verbringst den Rest des Nachmittags auf der Toilette. Produktivität: 0." 
            }
        ]
    },
    {
        id: "cof_spill_1",
        title: "Die braune Gefahr",
        text: "Ein See aus klebrigem, kaltem Kaffee breitet sich vor der Maschine aus. Der Täter ist längst über alle Berge. Es ist eine rutschige Todesfalle, die nur darauf wartet, das nächste Opfer zu fordern.",
        opts: [
            { 
                t: "Großen Schritt drüber machen", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Mit einem olympreifen Satz springst du über die Lache. Nicht dein Dreck, nicht dein Problem. Soll die Nachtschicht doch Schlittschuh laufen." 
            },
            { 
                t: "Heldenhaft zum Lappen greifen & wischen", 
                next: "path_spill_clean", 
				rep: { "Dr. Wichtig": -5 },	
                m: 10, f: -5, a: 20, c: 20, 
                r: "Du kniest am Boden und wischst. In dem Moment biegt der Chef um die Ecke. 'Herrgott, Müller! Können Sie nicht mal eine Tasse halten? Das ist ja peinlich!' Er steigt über deine Hand und geht kopfschüttelnd. Du kochst vor Wut." 
            },
            { 
                t: "Warnschild basteln & aufstellen", 
                next: "path_spill_warn", 
                m: 5, f: 5, a: 5, c: 0, 
                r: "Du kritzelst 'VORSICHT: TÖDLICH' auf einen Zettel, stellst ihn auf und gehst. Kurz darauf hörst du hinter dir ein lautes Schlittern, gefolgt von Fluchen. Tja, wer lesen kann, ist klar im Vorteil." 
            }
        ]
    },
    {
        id: "cof_spill_2a",
        title: "Die Schnabeltasse",
        reqStory: "path_spill_clean",
        text: "Auf deinem Schreibtisch steht ein Paket vom Chef. Inhalt: Ein bunter Kinder-Trinkbecher mit Deckel und Saugstutzen. Notiz: 'Damit die Teppiche sauber bleiben. Safety First!'.",
        opts: [
            { 
                t: "In den Müll werfen", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Das Ding fliegt mit Wucht in den Papierkorb. Du bist doch kein Kleinkind." 
            },
            { 
                t: "Tasse aus Trotz benutzen", 
                m: 5, f: 0, a: 10, c: 5, 
                r: "Du trinkst demonstrativ aus der Schnabeltasse. Die Kollegen kichern hinter vorgehaltener Hand. Es ist extrem peinlich, aber hey: Der Kaffee bleibt heiß. Deine Wut wächst mit jedem Schluck." 
            }
        ]
    },
    {
        id: "cof_spill_2b",
		char: "Chantal",
        title: "Der Arbeitsunfall",
        reqStory: "path_spill_warn",
        text: "Chantal humpelt mit bandagiertem Knöchel an dir vorbei. Sie wedelt wütend mit deinem Zettel. 'Das Schild war viel zu klein! Ich werde das als Arbeitsunfall melden wegen mangelnder Sicherheitskennzeichnung!'",
        opts: [
            { 
                t: "Juristisch wehren: 'DIN-Norm erfüllt'",
                rep: { "Chantal": -10 }, 
                m: 5, f: 5, a: 10, c: 0, 
                r: "Du musst ihr 10 Minuten lang erklären, dass die Schriftgröße lesbar war. Sie rauscht beleidigt ab." 
            },
            { 
                t: "Mitfühlen und die Schokolade opfern", 
                rep: { "Chantal": 10 },
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du gibst ihr einen Riegel aus deiner Schublade. Sie beruhigt sich sofort. 'Na gut. Aber nächstes Mal machst du Neon-Farbe dran, okay?' Problem gelöst." 
            }
        ]
    },
    {
        id: "cof_elster_fight_1",
		char: "Frau Elster",
        title: "Streit um den Kühlschrank",
        text: "Frau Elster wirft dein Essen weg! 'Das stinkt nach Erdnüsse!', keift sie. Du stellst sie zur Rede.",
        opts: [
            { 
                t: "Klein beigeben", 
                next: "path_elster_police",
                rep: { "Frau Elster": 2 }, 
                m: 5, f: 5, a: 10, c: 0, 
                r: "Du entschuldigst dich kleinlaut. Sie rückt ihre Brille zurecht, schnaubt: 'Man muss eben an die Gemeinschaft denken!' und rauscht ab. Der Streit ist vorbei, dein Essen aber auch." 
            },
            { 
                t: "'DAS WAR MEIN MITTAG!'", 
                next: "path_elster_allergy", 
                rep: { "Frau Elster": -5 },
                m: 10, f: 0, a: 20, c: 10, 
                r: "Sie schreit zurück: 'Ich bin hochsensibel! Wenn ich nur **Erdnüsse** rieche, schwillt mein Hals zu! Nimm gefälligst Rücksicht!' Sie atmet schwer. Oha, wunde Stelle entdeckt." 
            }
        ]
    },
    {
        id: "cof_elster_fight_2a",
		char: "Frau Elster",
        title: "Die Bio-Waffe",
        reqStory: "path_elster_allergy",
        text: "Du sitzt in der Küche und öffnest einen 'Snickers'. Frau Elster kommt rein, schnuppert, wird kreidebleich und weicht zurück. 'Ist das... Erdnuss? Willst du mich umbringen?! Geh weg damit!'",
        opts: [
            { 
                t: "Rücksicht nehmen & wegpacken", 
                rep: { "Frau Elster": 5 },
                m: 5, f: 5, a: 5, c: 0, 
                r: "Du packst den Riegel weg. 'Schon gut.' Sie nickt dankbar, aber misstrauisch. Du hast Hunger, aber immerhin keinen Mord auf dem Gewissen." 
            },
            { 
                t: "Genüsslich kauen & anhauchen", 
                rep: { "Frau Elster": -10 },
                m: 5, f: -5, a: -10, c: 10, 
                r: "Du kaust extra laut. 'Mmmh, knackig.' Frau Elster flüchtet panisch aus dem Raum. Du hast jetzt die Küche für dich allein." 
            }
        ]
    },
    {
        id: "cof_elster_fight_2b",
		char: "Frau Elster",
        title: "Die Lebensmittel-Polizei",
        reqStory: "path_elster_police",
        text: "Da du beim letzten Mal gekuscht hast, greift Frau Elster jetzt durch. Dein Joghurt ist weg. Dafür klebt ein Zettel am Fach: 'Wegen fehlendem Haltbarkeitsdatum präventiv entsorgt. Gez. Elster'.",
        opts: [
            { 
                t: "Wütenden Antwort-Zettel schreiben", 
                rep: { "Frau Elster": -5 },
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du schreibst: 'Finger weg von meinem Eigentum!' und klebst ihn an ihre Tupperdose." 
            },
            { 
                t: "Alle Fächer neu beschriften", 
                rep: { "Frau Elster": 5 },
                m: 2, f: 5, a: 15, c: 0, 
                r: "Du beschriftest jedes einzelne Lebensmittel mit Datum und Namen, damit sie Ruhe gibt. Es dauert 10 Minuten und nervt tierisch." 
            }
        ]
    },
    {
        id: "cof_salary_rumor_1",
		char: "Chantal",
        title: "Der Gehalts-Schock",
        text: "Du stehst hinter der Säule und hörst Chantal aus dem Marketing kichern: 'Ja, echt! 500 Euro mehr! Einfach so, weil ich so nett gelächelt habe! Dabei kann ich kaum Excel.' Dein Gehalt wurde seit 3 Jahren nicht angepasst. Dir platzt fast der Kragen.",
        opts: [
            { 
                t: "Wut nutzen & Leistungen notieren", 
                loot: "arg_list_1", 
                next: "path_salary_talk", 
                m: 10, f: -5, a: 5, c: 0, 
                r: "Du schnappst dir eine Serviette und kritzelt wütend deine Erfolge auf: '1000 Tickets gelöst, Brände verhindert, Server gerettet'. Du steckst den Zettel wie eine Waffe ein. Das ist wertvolle Munition für später." 
            },
            { 
                t: "Chantal eine Szene machen", 
                next: "path_salary_rage", 
                rep: { "Chantal": -15 },
                m: 5, f: 0, a: 20, c: 10, 
                r: "Du brüllst quer durch den Raum: 'EXCEL IST KEINE KUNST!'. Chantal fängt an zu weinen. Alle starren dich an. Du hast Dampf abgelassen, wirkst aber mental labil. Kein guter Look." 
            },
            { 
                t: "Den Ärger runterspülen", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du schluckst den Ärger runter oder knetest deinen Stressball. Es ändert nichts an deinem Kontostand, aber dein Blutdruck sinkt minimal. Du gehst frustriert zurück an die Arbeit." 
            }
        ]
    },
    {
        id: "cof_salary_rumor_2a",
		char: "Dr. Wichtig",
        title: "Der Pitch",
        reqStory: "path_salary_talk",
        text: "Der Chef sieht dich auf dem Flur. 'Ah, Müller! Gut, dass ich Sie sehe.' Du hast deine Argumente-Liste in der Tasche. Das ist der Moment.",
        opts: [
            { 
                t: "Kneifen & nur grüßen", 
                m: 2, f: 5, a: 10, c: 0, 
                r: "Mut verlassen. 'Hallo Chef.' Er geht weiter. Du hast die Chance vertan und hasst dich dafür ein bisschen selbst." 
            },
            { 
                t: "Liste zücken & fordern", 
                req: "arg_list_1", 
				rep: { "Dr. Wichtig": 5 },	
                m: 10, f: -5, a: -10, c: 10, 
                r: "Du ratterst deine Erfolge runter. Der Chef ist beeindruckt (und etwas eingeschüchtert). 'Okay, okay! Wir reden über einen Bonus.' Ein Teilsieg!" 
            }
        ]
    },
    {
        id: "cof_salary_rumor_2b",
        title: "Der HR-Termin",
        reqStory: "path_salary_rage",
        text: "Eine E-Mail von der Personalabteilung: 'Betreff: Vorfall in der Kaffeeküche'. Man möchte über deine 'soziale Kompetenz' und 'Aggressionsbewältigung' sprechen.",
        opts: [
            { 
                t: "Termin wahrnehmen & entschuldigen", 
                rep: { "Chantal": 5 },
                m: 5, f: -5, a: 10, c: 0, 
                r: "Du musst 30 Minuten lang nicken und Besserung geloben. Es ist demütigend. Chantal grinst dich danach im Flur an. Dein Hass wächst." 
            },
            { 
                t: "Termin 'vergessen'", 
                rep: { "Chantal": -10 },
                m: 5, f: 0, a: -5, c: 20, 
                r: "Du gehst einfach nicht hin. Rebellisch, aber dumm. Jetzt hast du eine offizielle Abmahnung in der Akte. Aber dein Stolz ist intakt." 
            }
        ]
    },
    {
        id: "cof_markus_flex_1",
		char: "Markus",
        title: "Der Angeber",
        text: "Markus vom Vertrieb hat sich vor der Maschine aufgebaut. Er krempelt den Ärmel hoch und hält dir sein Handgelenk unter die Nase. 'Na, Admin? Schau mal genau hin. Diese Uhr kostet mehr als dein ganzes Auto.' Er grinst sein breites Gewinner-Lächeln.",
        opts: [
            { 
                t: "Gezielter Wurf mit dem Stressball", 
                req: "stressball", 
                next: "path_markus_hit", 
                rep: { "Markus": -15, "Dr. Wichtig": -2 },
                m: 5, f: 0, a: -20, c: 30, 
                r: "ZACK! Volltreffer auf die Nase. Markus jault auf wie ein getretener Pudel. Leider stand der Chef im Türrahmen. Das gibt Ärger." 
            },
            { 
                t: "Trocken kontern: 'Ist die geleast?'", 
                next: "path_markus_roast",
                rep: { "Markus": -5 }, 
                m: 10, f: 0, a: -10, c: 5, 
                r: "Sein Grinsen gefriert. Er läuft rot an und stammelt etwas von 'Wertanlage'. Die umstehenden Kollegen lachen laut los. Ein Sieg auf ganzer Linie." 
            },
            { 
                t: "Kopfhörer aufsetzen & ignorieren", 
                req: "headphones", 
                rep: { "Markus": -2 },
                m: 5, f: 5, a: -5, c: 0, 
                r: "Klick. Noise-Cancelling an. Du hörst sanfte Mozart-Klänge, während Markus stumm den Mund bewegt. Du zapfst entspannt deinen Kaffee. Frieden." 
            },
            { 
                t: "Unterwürfig warten", 
                next: "path_markus_servant", 
                rep: { "Markus": 5 },
                m: 20, f: 0, a: 20, c: 0, 
                r: "Du wartest devot 20 Minuten, bis er seinen Monolog über 'Assets' und 'Mindset' beendet hat. Du hast deinen Kaffee, aber er schmeckt bitter nach Demütigung." 
            }
        ]
    },
    {
        id: "cof_markus_flex_2a",
		char: "Markus",
        title: "Das Schmerzensgeld",
        reqStory: "path_markus_hit",
        text: "Markus trägt jetzt ein riesiges Pflaster auf der Nase (völlig übertrieben). Er fuchtelt mit einem Formular vor deinem Gesicht. 'Das war ein tätlicher Angriff! Entweder du unterschreibst diese offizielle Entschuldigung, oder ich rufe meinen Anwalt!'",
        opts: [
            { 
                t: "Klein beigeben und unterschreiben",
                rep: { "Markus": 5 }, 
                m: 5, f: 0, a: 15, c: 0, 
                r: "Du unterschreibst. Markus grinst triumphierend und hängt den Zettel an seine Bürotür. Jeder kann jetzt lesen, dass es dir leid tut. Dein Blut kocht." 
            },
            { 
                t: "Nochmal drohen", 
                req: "stressball", 
                rep: { "Markus": -10 },
                m: 5, f: -5, a: -5, c: 10, 
                r: "Du holst den Stressball wieder raus. Markus zuckt zusammen und rennt weg. Das Problem ist vertagt, aber nicht gelöst." 
            }
        ]
    },
    {
        id: "cof_markus_flex_2b",
		char: "Markus",
        title: "Der Beweis",
        reqStory: "path_markus_roast",
        text: "Dein Spruch hat Markus' Ego schwer getroffen. Er kommt mit seinem Laptop zu dir. 'Geleast? Dass ich nicht lache! Guck dir mein Crypto-Portfolio an! Ich bin reich! REICH!' Er drängt dir den Bildschirm auf.",
        opts: [
            { 
                t: "Laut vorlesen: 'Minus 60 Prozent?!'", 
                rep: { "Markus": -15 },
                m: 5, f: 0, a: -10, c: 5, 
                r: "Du zeigst auf die rote Kurve. Markus klappt den Laptop panisch zu. 'Das ist nur... eine Korrektur! Dip kaufen!' Er rennt weinend weg." 
            },
            { 
                t: "Desinteressiert abwinken", 
                rep: { "Markus": -5 },
                m: 2, f: 0, a: 0, c: 0, 
                r: "'Jaja, Markus.' Du lässt ihn stehen. Nichts tut einem Angeber mehr weh als Gleichgültigkeit." 
            }
        ]
    },
    {
        id: "cof_markus_flex_2c",
		char: "Markus",
        title: "Das Coaching",
        reqStory: "path_markus_servant",
        text: "Weil du ihm zugehört hast, hält Markus dich jetzt für seinen 'Schüler'. Er schickt dir morgens um 6 Uhr WhatsApp-Sprachnachrichten: 'Guten Morgen Champ! Zeit zum Hustlen! Hol mir mal einen Kaffee, das übt Demut!'",
        opts: [
            { 
                t: "Wortlos den Kaffee holen", 
                rep: { "Markus": 10 },
                m: 10, f: 0, a: 25, c: 0, 
                r: "Du bringst ihm den Kaffee. Er tätschelt dir den Kopf. 'Braver Junge.' Du stirbst innerlich tausend Tode." 
            },
            { 
                t: "Blockieren & Ignorieren",
                rep: { "Markus": -5 }, 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du blockierst seine Nummer. Markus steht später verwirrt an deinem Tisch: 'Mein Handy spinnt.' Du zuckst nur mit den Schultern." 
            }
        ]
    },
    {
        id: "cof_gabi_sad_1",
		char: "Gabi",
        title: "Trauerfall in der Poststelle",
        text: "Gabi aus der Poststelle sitzt schluchzend auf der Eckbank im Pausenraum. In der Hand hält sie einen braunen, schrumpeligen Klumpen. 'Mein kleiner Stachi ist tot! Einfach von uns gegangen!'",
        opts: [
            { 
                t: "Geduldig zuhören", 
                next: "path_gabi_listen", 
                rep: { "Gabi": 5 },
                m: 45, f: -15, a: 20, c: 10, 
                r: "Du hörst dir eine 45-minütige Grabrede für eine Sukkulente an. Dein Kaffee wird kalt. Gabi fühlt sich danach 'so verstanden', aber du bist innerlich tot und kommst viel zu spät zurück." 
            },
            { 
                t: "Den 'Loot-Donut' als Trost spenden", 
                rem: "donut", 
                next: "path_gabi_donut", 
                rep: { "Gabi": 5 },
                m: 10, f: 5, a: -10, c: -5, 
                r: "Du opferst deinen Schatz. Gabis Augen leuchten auf. Zucker heilt alle Wunden. Sie mampft glücklich. 'Du bist so lieb! Ich geh wieder an die Arbeit.' Gute Tat!" 
            },
            { 
                t: "Ihr einen Energy-Drink geben", 
                rem: "energy", 
                next: "path_gabi_energy", 
                rep: { "Gabi": -5 },
                m: 5, f: 0, a: 5, c: 5, 
                r: "Ganz schlechte Idee. Das Taurin kickt sofort. Gabi reißt die Augen auf, springt auf und rennt wie ein begaster Hamster zurück zur Poststelle. Das wird Folgen haben." 
            }
        ]
    },
    {
        id: "cof_gabi_sad_2a",
		char: "Gabi",
        title: "Sonderzustellung",
        reqStory: "path_gabi_donut",
        text: "Gabi winkt dich hektisch hinter die Palme im Flur. 'Psst! Mein Retter! Das hier kam für dich. Ich hab es extra vor dem Chef abgefangen, sah privat aus.' Sie drückt dir ein Paket in die Hand.",
        opts: [
            { 
                t: "Danken & annehmen", 
                rep: { "Gabi": 5 },
                m: 5, f: 5, a: -10, c: 0, 
                r: "Es ist deine Amazon-Bestellung (neue Gaming-Maus). Gabi zwinkert dir verschwörerisch zu. 'Bei mir ist deine Post sicher!' Eine wertvolle Verbündete." 
            },
            { 
                t: "Ihr noch mehr Süßes versprechen",
                rep: { "Gabi": 10 }, 
                m: 5, f: 10, a: -5, c: 0, 
                r: "Du versprichst ihr den nächsten Kuchen aus dem Meeting. Gabi strahlt. Du hast jetzt VIP-Status bei der Postverteilung." 
            }
        ]
    },
    {
        id: "cof_gabi_sad_2b",
		char: "Dr. Wichtig",
        title: "Ortstermin",
        reqStory: "path_gabi_energy",
        text: "Der Chef stürmt in die Küche, packt dich am Arm und zerrt dich in den Flur. 'Sie haben Gabi aufgeputscht?! Sehen Sie sich das an!' Durch die offene Tür der Poststelle siehst du, wie Gabi Pakete im Akkord an die Decke stapelt.",
        opts: [
            { 
                t: "'Effizient!'", 
                rep: { "Gabi": -5, "Dr. Wichtig": -2 },
                m: 5, f: 0, a: 10, c: 5, 
                r: "Der Chef bekommt rote Flecken am Hals. 'Das ist kein Tetris, das sind wichtige Akten!' Du musst helfen, den Turm abzubauen, bevor er einstürzt. Nervige Strafarbeit." 
            },
            { 
                t: "'Nicht mein Zuständigkeitsbereich.'", 
                rep: { "Dr. Wichtig": -5 },
                m: 2, f: -5, a: 5, c: 0, 
                r: "Du reißt dich los und rennst zurück zum Kaffee. Der Chef brüllt dir hinterher. Das gibt Ärger, aber immerhin musst du nicht klettern." 
            }
        ]
    },
    {
        id: "cof_gabi_sad_2c",
		char: "Gabi",
        title: "Die Klette",
        reqStory: "path_gabi_listen",
        text: "Halber Weg zur Kaffeemaschine, da springt Gabi hinter dem Kühlschrank hervor. Sie hat auf dich gewartet. 'Du, der leere Topf sieht so einsam aus... meinst du, eine Begonie wäre besser als ein Kaktus?'",
        opts: [
            { 
                t: "'Nimm doch Plastikblumen.'", 
                rep: { "Gabi": 2 },
                m: 2, f: 0, a: 5, c: 0, 
                r: "'Oh, gute Idee! Die sterben nicht!' Sie rennt los, um welche zu kaufen. Der Flur gehört wieder dir - nur das schlechte Gewissen läuft hinterher." 
            },
            { 
                t: "Sich hinter der Kaffeemaschine verstecken", 
                m: 5, f: -5, a: 15, c: 0, 
                r: "Du duckst dich weg. Gabi sucht dich kurz, seufzt laut ('Keiner versteht mich außer dir!') und geht. Das war knapp, aber extrem entwürdigend." 
            }
        ]
    },
    {
        id: "cof_machine_broke_1",
        title: "Kritischer Dichtungsfehler",
        text: "Ein Rinnsal aus heißem Wasser schießt aus der Seite der Kaffeemaschine. Die braune Brühe bahnt sich unaufhaltsam ihren Weg Richtung der völlig überlasteten Mehrfachsteckdose am Boden. Ein leises, bedrohliches elektrisches Knistern liegt bereits in der Luft.",
        opts: [
            { 
                t: "Mit Gaffa-Tape abdichten", 
                req: "tape", 
                next: "path_machine_tape", 
                m: 10, f: -5, a: 0, c: -10, 
                r: "Du wickelst eine halbe Rolle Tape um den Wassertank. Es sieht aus wie eine misslungene Mumie, aber es hält dicht! Die Küche bleibt trocken, der Kaffee fließt." 
            },
            { 
                t: "Sofort den Stecker ziehen", 
                next: "path_machine_plug", 
                m: 5, f: 5, a: 10, c: 10, 
                r: "Zack. Strom aus. Die Gefahr ist gebannt. Das Display wird schwarz. Ein kollektives, schmerzhaftes Stöhnen geht durch das Büro." 
            },
            { 
                t: "Pfeifend weitergehen & ignorieren", 
                next: "path_machine_blackout", 
				rep: { "Dr. Wichtig": -2 },	
                m: 5, f: 10, a: 0, c: 50, 
                r: "Du ignorierst die Pfütze. Zehn Minuten später: *ZZZAPP*. Dunkelheit im ganzen Stockwerk. Der Chef stürmt auf den Flur und brüllt: 'WER HAT DIE SICHERUNG RAUSGEJAGT?! MEIN WORD-DOKUMENT!!'" 
            }
        ]
    },
    {
        id: "cof_machine_broke_2a",
		char: "Egon",
        title: "Ingenieurs-Kunst",
        reqStory: "path_machine_tape",
        text: "Hausmeister Egon steht vor deinem Tape-Kunstwerk. Er nickt langsam und anerkennend. 'Saubere Arbeit, Müller. Hätte ich nicht besser machen können. Das hält bis 2030.' Er klopft dir fest auf die Schulter.",
        opts: [
            { 
                t: "'Panzertape regelt alles.'", 
                rep: { "Egon": 10 },
                m: 5, f: 5, a: -15, c: 0, 
                r: "Ihr tauscht kurz Handwerker-Weisheiten aus. Das entspannt ungemein." 
            },
            { 
                t: "Bescheiden nicken", 
                rep: { "Egon": 10 },
                m: 10, f: 0, a: -10, c: -5, 
                r: "Du genießt den seltenen Respekt. Egon lädt dich sogar ein, später mal seinen neuen Akkuschrauber anzusehen. Ein guter Tag." 
            }
        ]
    },
    {
        id: "cof_machine_broke_2b",
		char: "Dr. Wichtig",
        title: "Der Lebensretter",
        reqStory: "path_machine_plug",
        text: "Der Chef kommt wütend rein, sieht aber dann die verschmorte Steckdose, die noch leicht qualmt. Er wird bleich. 'Mein Gott... wenn Sie nicht gezogen hätten... das ganze Archiv! Müller, Sie haben uns den Hintern gerettet!'",
        opts: [
            { 
                t: "Den Helden spielen", 
				rep: { "Dr. Wichtig": 15 },	
                m: 10, f: 5, a: -20, c: -30, 
                r: "'Nur mein Job, Chef.' Er drückt dir dankbar die Hand. 'Machen Sie heute früher Feierabend. Das ist ein Befehl!' Musik in deinen Ohren." 
            },
            { 
                t: "'Sicherheit geht vor.'", 
				rep: { "Dr. Wichtig": 5 },	
                m: 5, f: 0, a: -10, c: -20, 
                r: "Die Kollegen klatschen leise. Der Ärger über den fehlenden Kaffee ist verflogen. Du bist der verantwortungsvolle Fels in der Brandung." 
            }
        ]
    },
    {
        id: "cof_machine_broke_2c",
        title: "Zwangspause",
        reqStory: "path_machine_blackout",
        text: "Der Strom ist weg, die PCs sind aus. Statt Panik breitet sich eine seltsame Ruhe aus. Jemand hat Kekse rumgereicht. Sogar der Chef entspannt sich, nachdem die IT bestätigt hat, dass das Autosave funktioniert hat.",
        opts: [
            { 
                t: "Witze erzählen", 
				rep: { "Dr. Wichtig": 2 },	
                m: 10, f: 10, a: -15, c: -5, 
                r: "Die Stimmung ist locker. Der Chef lacht sogar über deinen (harmlosen) Witz. Diese unerwartete Teambuilding-Maßnahme war genau das, was alle gebraucht haben." 
            },
            { 
                t: "Die Stille genießen", 
                m: 20, f: 0, a: -25, c: -10, 
                r: "Keine Telefonate, kein Lüfterrauschen. Alle sitzen im Halbdunkel und unterhalten sich nett. Es ist wie ein Lagerfeuer ohne Feuer. Du tankst richtig Kraft." 
            }
        ]
    },
    {
        id: "cof_kevin_learn_1",
		char: "Kevin",
        title: "Kevins Weltbild",
        text: "Kevin starrt fasziniert auf das blinkende Server-Rack. Er dreht sich mit großen Augen zu dir um: 'Sag mal... sitzt da drin eigentlich ein kleiner Mann, der die ganzen E-Mails tippt und weiterschickt?' Du wartest auf die Pointe. Aber es kommt keine. Er meint das todernst.",
        opts: [
            { 
                t: "Ihm wortlos das Handbuch geben", 
                req: "manual", 
                next: "path_kevin_manual",
                rep: { "Kevin": -2 }, 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du drückst ihm den schweren Wälzer gegen die Brust. 'Lies Kapitel 1 bis 10. Vorher sprichst du mich nicht mehr an.' Er verzieht sich ehrfürchtig in eine Ecke. Endlich Ruhe." 
            },
            { 
                t: "'Ja, das ist der E-Mail-Kobold.'", 
                next: "path_kevin_kobold",
                rep: { "Kevin": 5, "Dr. Wichtig": -2 }, 
                m: 5, f: 10, a: -5, c: 10, 
                r: "Du nickst verschwörerisch: 'Ja, er heißt Gunter. Aber bloß nicht füttern!' Kevin kriecht jetzt mit der Taschenlampe hinter das Rack und sucht nach Gunter. Der Chef sieht es und zweifelt an der Eignung des Azubis." 
            },
            { 
                t: "Die Technik geduldig erklären", 
                next: "path_kevin_explain",
                rep: { "Kevin": 5, "Dr. Wichtig": 2 }, 
                m: 30, f: -10, a: 10, c: 0, 
                r: "Du nimmst dir eine halbe Stunde Zeit und malst Datenpakete an das Whiteboard. Kevin nickt langsam: 'Achso! Also wie Rohrpost, nur unsichtbar?' Es ist ein kleiner Fortschritt." 
            }
        ]
    },
    {
        id: "cof_kevin_learn_2a",
		char: "Kevin",
        title: "Rohrpost 2.0",
        reqStory: "path_kevin_explain",
        text: "Kevin hat versucht, deine Erklärung umzusetzen. Er hat Klorollen an die Server-Lüfter geklebt. 'Damit die Daten schneller flutschen!', ruft er stolz. Überraschenderweise entsteht dadurch ein angenehm kühler Luftzug direkt auf deinen Schreibtisch.",
        opts: [
            { 
                t: "Genießen & loben", 
                rep: { "Kevin": 5 },
                m: 2, f: 5, a: -15, c: 5, 
                r: "Du lehnst dich zurück. 'Gute Arbeit, Kevin.' Der Luftzug ist herrlich bei der Hitze. Endlich mal eine Innovation, die was bringt. Du bist entspannt." 
            },
            { 
                t: "Konstruktion abreißen",
                rep: { "Kevin": -5 }, 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du reißt die Papp-Röhren weg. 'Brandschutz!' Kevin schaut traurig. Jetzt schwitzt du wieder und musst Klebereste entfernen. Eigentlich dumm gelaufen." 
            }
        ]
    },
    {
        id: "cof_kevin_learn_2b",
		char: "Kevin",
        title: "Der Schriftgelehrte",
        reqStory: "path_kevin_manual",
        text: "Kevin steht stramm vor dir. Er hat das Handbuch auswendig gelernt. 'Laut Seite 103, Absatz 4 steht dem Administrator bei erhöhter Serverlast eine zwanzigminütige Regenerationspause zu. Soll ich den Türsteher machen?'",
        opts: [
            { 
                t: "Ihn wegschicken",
                rep: { "Kevin": -5 }, 
                m: 2, f: -5, a: 5, c: 0, 
                r: "'Lass den Quatsch.' Du arbeitest weiter. Kevin ist enttäuscht. Du hast soeben eine amtlich genehmigte Pause ausgeschlagen." 
            },
            { 
                t: "Angebot annehmen",
                rep: { "Kevin": 10 }, 
                m: 20, f: 5, a: -20, c: 0, 
                r: "Du legst die Füße hoch. Kevin bewacht die Tür und weist sogar den Chef mit Verweis auf 'Seite 103' ab. Das ist der beste Azubi aller Zeiten." 
            }
        ]
    },
    {
        id: "cof_kevin_learn_2c",
        title: "Gunters Opfergabe",
        reqStory: "path_kevin_kobold",
        text: "Hinter dem Rack findest du einen Teller. Darauf liegt keine saure Milch, sondern eine Packung feinster belgischer Pralinen. Ein Zettel liegt dabei: 'Für Gunter, bitte mach das Internet ganz.'",
        opts: [
            { 
                t: "Sich als Gunter ausgeben und essen", 
                rep: { "Kevin": 5 },
                m: 5, f: 10, a: -10, c: 0, 
                r: "Du mampfst die Pralinen genüsslich auf. Sie schmecken fantastisch. Als Kevin reinkommt, rülpst du leise. Kevin flüstert ehrfürchtig: 'Gunter hat es angenommen!'" 
            },
            { 
                t: "Kevin als Gunter erschrecken",
                rep: { "Kevin": -5 }, 
                m: 5, f: 15, a: -15, c: 5, 
                r: "Du versteckst dich und machst Gruselgeräusche: *'MEHR SCHOKOLADE!'* Kevin rennt schreiend weg. Du lachst Tränen." 
            }
        ]
    },
    {
        id: "cof_birthday_cake_1",
        title: "Kuchen im Flur",
        text: "Ein riesiger Schokokuchen steht herrenlos auf dem Beistelltisch. Ein Schild sagt handschriftlich: 'Bedient euch!'. Es riecht verführerisch nach Kakao und Sahne.",
        opts: [
            { 
                t: "Misstrauisch sein", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Gratis Essen? Verdächtig. Wer weiß, wie lange der da schon steht. Du rührst ihn nicht an. Du bleibst hungrig, aber sicher." 
            },
            { 
                t: "Ein Stück nehmen", 
                next: "path_cake_eat", 
                m: 10, f: 5, a: -10, c: 0, 
                r: "Lecker! Ein purer Zuckerschock. Du schaufelst dir das Stück rein. Das Leben ist gut." 
            },
            { 
                t: "Den ganzen Kuchen einpacken", 
                next: "path_cake_steal", 
                m: 5, f: 10, a: -5, c: 20, 
                r: "Du schaust dich um – die Luft ist rein. Du nimmst die ganze Platte und trägst sie schnell in dein Büro. 'Für später'. Dein Herz klopft vor Gier." 
            }
        ]
    },
    {
        id: "cof_birthday_cake_2a",
        title: "Die Rum-Bombe",
        reqStory: "path_cake_eat",
        text: "Hoppla. Das war nicht nur Schokolade. Das war 'Schwarzwälder Kirsch' mit 80% Stroh-Rum. Dir wird warm ums Herz und leicht schwindelig. Der Stress fällt von dir ab, aber deine Zunge fühlt sich pelzig an.",
        opts: [
            { 
                t: "Versuchen, seriös zu wirken", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du setzt dich kerzengerade hin und starrst auf deinen Monitor. Bloß nicht auffallen. Die Paranoia killt die gute Laune etwas." 
            },
            { 
                t: "Den Rausch genießen",
                next: "path_cake_drunk", 
                m: 5, f: 0, a: -20, c: 5, 
                r: "Du lehnst dich an die Wand und grinst blöd. Ein Kollege fragt dich was, du kicherst nur. Der beste Arbeitstag seit Jahren." 
            }
        ]
    },
    {
        id: "cof_birthday_cake_2b",
		char: "Dr. Wichtig",
        title: "Meeting-Crasher",
        reqStory: "path_cake_steal",
        text: "Du sitzt in deinem Büro vor dem gestohlenen Kuchen, als die Tür auffliegt. Der Chef und drei japanische Investoren stehen da. Der Chef starrt auf den Kuchen, dann auf dich. 'Müller?! Das war das Catering für die Delegation!'",
        opts: [
            { 
                t: "Teilen anbieten", 
				rep: { "Dr. Wichtig": -2 },
                m: 5, f: 0, a: -5, c: 10, 
                r: "Du hältst dem Investor eine Gabel hin. Er nimmt dankend an. Die Situation ist gerettet, aber der Chef wird dich später töten." 
            },
            { 
                t: "'Qualitätskontrolle!'",
				rep: { "Dr. Wichtig": -2 },
                m: 5, f: 10, a: 20, c: 30, 
                r: "Du stammelst mit vollem Mund etwas von 'Gift-Test'. Niemand glaubt dir. Es ist unfassbar peinlich. Die Japaner verbeugen sich höflich vor deiner Gier." 
            }
        ]
    },
    {
        id: "cof_elevator_stuck_1",
		char: "Markus",
        title: "Im Aufzug stecken",
        text: "Ruckel. Klack. Stille. Nicht schon wieder! Der Aufzug bleibt zwischen dem 2. und 3. Stock hängen. Neben dir steht Markus aus dem Vertrieb in einer Wolke aus 'Eau de Success'. Er grinst: 'Na, Zeit für ein Networking-Gespräch, was?'",
        opts: [
            { 
                t: "Aufzugstür aufhebeln", 
                req: "screw", 
                next: "path_elevator_hero", 
                rep: { "Markus": 15 },
                m: 10, f: -5, a: -10, c: 0, 
                r: "Du rammst den Schraubendreher in den Spalt. Mit einem Ruck gleitet die Tür auf. Freiheit! Die anderen Insassen staunen: 'Alpha-Move, Respekt!'" 
            },
            { 
                t: "Notruf drücken & beten", 
                next: "path_elevator_tech",
                rep: { "Markus": -5 },
                m: 30, f: 0, a: 15, c: 0, 
                r: "Egon meldet sich knarzend: 'Hömma! Ich ess erst mal meine Stulle auf. Bleib locker.' Du bist 30 Minuten gefangen. Deine Laune ist im Keller." 
            },
            { 
                t: "Markus tapfer zuhören", 
                next: "path_elevator_markus", 
                rep: { "Markus": 5 },
                m: 30, f: -10, a: 25, c: 0, 
                r: "Er erzählt von seinem Porsche, seinen Crypto-Wins und seinem 'Mindset'. Du nickst apathisch und stirbst innerlich tausend Tode. Er scheint das Nicken als Zustimmung zu werten." 
            }
        ]
    },
    {
        id: "cof_elevator_2a",
		char: "Markus",
        title: "Gefangen mit dem Bestie",
        reqStory: "path_elevator_markus",
        text: "Markus springt in letzter Sekunde zu dir in den Aufzug. 'Na, Großer! Gut, dass ich dich treffe!' Er drückt grinsend den **Nothalt-Knopf**. Der Aufzug stoppt hart. 'Ich muss dir dringend von meiner neuen Business-Idee erzählen. Dauert nur 20 Minuten.'",
        opts: [
            { 
                t: "Panisch schreien: 'HILFE!'",
                rep: { "Markus": 3 }, 
                m: 5, f: 0, a: 30, c: 0, 
                r: "Markus lacht. 'Du bist so witzig! Aber im Ernst: Multi-Level-Marketing für Hamsterfutter!' Es gibt kein Entkommen. Das ist Freiheitsberaubung." 
            },
            { 
                t: "Ihm die Show stehlen", 
                rep: { "Markus": -5 },
                m: 20, f: 0, a: -10, c: 5, 
                r: "Du fängst an, IHM eine Geschichte von deinem langweiligen Wochenende zu erzählen. Nach 5 Minuten drückt Markus genervt den Knopf, damit es weitergeht. Sieg durch Langeweile." 
            }
        ]
    },
    {
        id: "cof_elevator_2b",
        title: "Experten am Werk",
        reqStory: "path_elevator_tech",
        text: "Der Aufzug ruckt und steht. Neben dir: Ein Mann im Blaumann. Seine Gesichtsfarbe kippt. 'Äh. Ich bin der Techniker. Ich wollte den Aufzug reparieren.' Er drückt hektisch Knöpfe. 'Mist. Mein Werkzeugkoffer steht draußen. Wir sitzen fest.'",
        opts: [
            { 
                t: "Ihm den 'Notfall-Donut' geben", 
                req: "donut", 
                m: 20, f: 5, a: -10, c: 0, 
                r: "Der Techniker zittert wegen Unterzuckerung. Du gibst ihm den Donut. Er beruhigt sich, tritt gegen die Tür und – ZACK – sie geht auf. 'Danke, Kumpel!' Manchmal hilft Zucker mehr als Technik." 
            },
            { 
                t: "Gemeinsam auf Rettung warten", 
                m: 45, f: 0, a: 20, c: 0, 
                r: "Ihr sitzt beide auf dem Boden. Der Techniker weint leise. Nach 45 Minuten hört ihr Egon lachen, der die Tür von außen öffnet. 'Na, Kaffeekränzchen?'" 
            }
        ]
    },
    {
        id: "cof_elevator_2c",
        title: "Der Aufzugs-Flüsterer",
        reqStory: "path_elevator_hero",
        text: "Der Aufzug ruckelt und bleibt stehen. Die fünf anderen Kollegen drehen sich synchron zu dir um. Einer reicht dir erwartungsvoll seinen Autoschlüssel. 'Los, mach schon. Du hast das doch neulich auch repariert. Wir haben es eilig.'",
        opts: [
            { 
                t: "'Bin kein Techniker.'", 
                m: 30, f: 0, a: 15, c: -5, 
                r: "Die Stimmung kippt. 'Toll. Jetzt müssen wir warten.' Alle starren dich 30 Minuten lang vorwurfsvoll an. Du bist der Buhmann, weil du nicht helfen willst." 
            },
            { 
                t: "Eine Reparatur-Show abziehen", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Du rüttelst wichtig an der Tür und murmelst 'Fluxkompensator'. Zufällig geht es weiter. 'Ein Genie!', flüstern die Kollegen." 
            }
        ]
    },
    {
        id: "cof_miracle_1",
        title: "Das kleine Wunder",
        text: "Die Maschine macht seltsame Geräusche, rattert... und produziert dann den perfekten Kaffee. Perfekte Temperatur, haselnussbraune Crema, duftet wie in Italien. Ein statistischer Ausreißer. Ein Einhorn in Tassenform.",
        opts: [
            { 
                t: "Foto für Insta machen", 
                next: "path_miracle_insta", 
                m: 5, f: 10, a: -5, c: 0, 
                r: "Das muss dokumentiert werden! Du arrangierst deine Brille und einen Stift dekorativ daneben. '#OfficeLife #Grindset #Blessed'. Aber ein Foto reicht nicht..." 
            },
            { 
                t: "Ihn dem Chef bringen",
                rep: { "Dr. Wichtig": 5 },				
                next: "path_miracle_boss", 
                m: 5, f: -5, a: 5, c: -15, 
                r: "Du denkst strategisch. Du trägst den heiligen Gral vorsichtig ins Chef-Büro. 'Hier Chef, der ist besonders gut heute.' Er guckt überrascht." 
            },
            { 
                t: "Sofort andächtig genießen", 
                m: 10, f: 5, a: -25, c: 0, 
                r: "Du trinkst in kleinen Schlucken. Jeder Schluck heilt deine Seele ein wenig. Du ignorierst das Telefon und die Welt. Für 5 Minuten ist alles gut." 
            }
        ]
    },
    {
        id: "cof_miracle_2a",
        title: "Das Influencer-Debakel",
        reqStory: "path_miracle_insta",
        text: "Du versuchst, den perfekten Winkel zu finden. Du steigst auf deinen Bürostuhl, machst ein Duckface und hältst die Tasse in die Kamera. Die Tür geht auf. Der ganze Vorstand steht da und starrt dich an. Du stehst auf dem Stuhl. Mit gespitzten Lippen.",
        opts: [
            { 
                t: "Foto posten & Kündigung erwarten", 
                m: 2, f: 10, a: -10, c: 5, 
                r: "Du drückst ab. Das Foto ist unscharf und dein Gesichtsausdruck ist irre. Aber hey: 3 Likes von Bots! Der soziale Abstieg war es wert." 
            },
            { 
                t: "So tun, als wäre das eine Yoga-Übung", 
                m: 5, f: 0, a: 15, c: 0, 
                r: "Du dehnst dich langsam. 'Büro-Gymnastik! Wichtig für den Rücken!' Niemand kauft es dir ab. Der Vorstand geht kopfschüttelnd weiter. Du möchtest im Boden versinken." 
            }
        ]
    },
    {
        id: "cof_miracle_2b",
		char: "Dr. Wichtig",
        title: "Perlen vor die Säue",
        reqStory: "path_miracle_boss",
        text: "Der Chef freut sich. 'Müller! Sie lesen Gedanken!' Er nimmt die Tasse mit dem perfekten Kaffee... und kippt drei Päckchen Süßstoff und einen Schuss laktosefreie H-Milch hinein. Die Crema zerfällt sofort zu grauer Plörre.",
        opts: [
            { 
                t: "'Das war ein Grand Cru!'", 
				rep: { "Dr. Wichtig": -2 },
                m: 5, f: 5, a: 5, c: 5, 
                r: "Der Chef schaut nur müde. 'Das ist Kaffee, Müller. Keine Wissenschaft. Gehen Sie arbeiten.' Dein Opfer war umsonst." 
            },
            { 
                t: "Innerlich weinen & lächeln", 
				rep: { "Dr. Wichtig": 2 },
                m: 5, f: 0, a: 10, c: -10, 
                r: "'Lecker', schmatzt der Chef. Du hast das Heiligste geopfert und er hat es entweiht. Aber er mag dich jetzt etwas mehr. Dein Herz blutet." 
            }
        ]
    },
    {
        id: "cof_silence_1",
        title: "Himmlische Stille",
        text: "Du betrittst die Küche. Sie ist leer. Kein Kühlschrank-Brummen, kein kauender Kollege, kein Tropfen. Einfach nur absolute, goldene Stille. Es ist fast schon... unheimlich friedlich.",
        opts: [
            { 
                t: "Schnell Kaffee & weg", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Du traust dem Frieden nicht. Du füllst deinen Becher und verschwindest sofort wieder im sicheren Lärm deines Büros." 
            },
            { 
                t: "Die Augen schließen & genießen", 
                next: "path_silence_jumpscare", 
                m: 5, f: 5, a: -20, c: 0, 
                r: "Du atmest tief ein. Fünf Minuten Zen-Modus. Du spürst, wie dein Blutdruck sinkt. Du bist eins mit dem Universum. Ein seltener Moment des Friedens." 
            },
            { 
                t: "Misstrauisch werden: 'Wo sind alle?'", 
                next: "path_silence_drill", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du schaust dich um. Niemand da. Auch nicht im Flur. Ein kalter Schauer läuft dir über den Rücken. Irgendwas stimmt hier nicht." 
            }
        ]
    },
    {
        id: "cof_silence_2a",
        title: "Herzinfarkt-Risiko",
        reqStory: "path_silence_jumpscare",
        text: "Du bist gerade tiefenentspannt, da brüllt dir jemand direkt ins Ohr: 'MAHLZEIT!!!'. Es ist der lustige Holger aus der Buchhaltung, der sich angeschlichen hat.",
        opts: [
            { 
                t: "Reflexartig den Stressball werfen", 
                req: "stressball", 
                m: 5, f: 0, a: -10, c: 10, 
                r: "Dein Arm zuckt aus Reflex. Der Stressball trifft Holger am Kopf. 'Au! Spinnst du?!' Jetzt ist er das Opfer. Geschieht ihm recht." 
            },
            { 
                t: "Vor Schreck Kaffee verschütten", 
                m: 5, f: -5, a: 10, c: 0, 
                r: "Der heiße Kaffee landet auf deinem Hemd. Holger lacht sich schlapp: 'Hahaha, hast du gezuckt!'. Du bist nass, verbrannt und hast Mordgedanken." 
            }
        ]
    },
    {
        id: "cof_silence_2b",
        title: "Zurückgelassen",
        reqStory: "path_silence_drill",
        text: "Du schaust aus dem Fenster. Unten auf dem Parkplatz stehen alle Kollegen und winken. Ein Feuerwehrauto fährt vor. Du hast den Feueralarm wegen deiner Noise-Cancelling-Kopfhörer (oder purer Ignoranz) überhört.",
        opts: [
            { 
                t: "Verstecken & hoffen", 
                m: 5, f: 5, a: -5, c: 20, 
                r: "Du duckst dich unter den Tisch. Wenn dich keiner sieht, warst du nie da. Du genießt die sturmfreie Bude, während draußen alle frieren." 
            },
            { 
                t: "Panisch runterrennen", 
                m: 10, f: -5, a: 10, c: 0, 
                r: "Du sprintest 5 Stockwerke runter. Unten angekommen bist du verschwitzt und außer Atem. Der Sicherheitsbeauftragte notiert deinen Namen: 'Zu spät. Im Ernstfall wären Sie jetzt knusprig.'" 
            }
        ]
    },
    {
        id: "cof_cookie_luck_1",
        title: "Der verwaiste Keks",
        text: "Neben der Zuckerdose liegt ein einzelner, verpackter Premium-Keks (Karamell-Kern). Keine Notiz, kein Besitzer in Sicht. Das Universum meint es gut mit dir.",
        opts: [
            { 
                t: "Einstecken für später", 
                next: "path_cookie_save", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Du lässt ihn in deine Tasche gleiten. Das Wissen, eine Not-Ration zu haben, beruhigt dich ungemein. Vorfreude ist die schönste Freude." 
            },
            { 
                t: "Sofort essen", 
                next: "path_cookie_mystery", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Knister. Mampf. Der Zucker flutet dein Gehirn. Glückshormone kämpfen kurzzeitig gegen den Stress an. Weg ist er." 
            }
        ]
    },
    {
        id: "cof_cookie_2a",
        title: "Die Keks-Fee",
        reqStory: "path_cookie_mystery",
        text: "Du kommst zurück an deinen Platz... und da liegt *noch* einer! Mitten auf deiner Tastatur. Wieder Karamell-Kern. Wer macht das? Und warum?",
        opts: [
            { 
                t: "Detektiv spielen", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du untersuchst die Verpackung auf Fingerabdrücke. Nichts. Die Ungewissheit macht dich wahnsinnig. War das der Chef? Oder doch nur die Putzkraft?" 
            },
            { 
                t: "Nicht fragen, nur essen", 
                m: 5, f: 5, a: -20, c: 0, 
                r: "Einem geschenkten Gaul schaut man nicht ins Maul. Du isst den zweiten Keks. Du fühlst dich seltsam geliebt von einem unsichtbaren Wohltäter." 
            }
        ]
    },
    {
        id: "cof_cookie_2b",
        title: "Der perfekte Moment",
        reqStory: "path_cookie_save",
        text: "Du hast deinen frischen Kaffee in der Hand. Er dampft. Da fällt dir der Keks in deiner Tasche ein. Du holst ihn raus. Die Schokolade ist durch deine Körperwärme leicht angeschmolzen.",
        opts: [
            { 
                t: "Eintunken & genießen", 
                m: 10, f: 5, a: -25, c: 0, 
                r: "Du tunkst den Keks kurz in den heißen Kaffee. Er schmilzt auf der Zunge. Eine Explosion aus Karamell und Röst-Aromen. Für einen Moment ist die Welt perfekt." 
            },
            { 
                t: "Krümel-Topping basteln", 
                m: 5, f: 5, a: -15, c: 0, 
                r: "Du zerbröselst den Keks über den Milchschaum. Gourmet-Kaffee 'Marke Eigenbau'. Irgendwo in Italien weint ein Barista, aber hier schmeckt es großartig." 
            }
        ]
    },
    {
        id: "cof_disaster_1",
        title: "OUT OF ORDER",
        text: "Du brauchst Koffein. Dringend. Aber auf dem Display der Maschine steht nur: 'ERROR 418 - I'm a teapot'. Deine Hände zittern bereits leicht.",
        opts: [
            { 
                t: "Reparieren", 
                req: "screw", 
                next: "path_machine_love", 
                m: 15, f: 0, a: -10, c: -5, 
                r: "Du schraubst die Verkleidung ab und fixierst den Schlauch. Die Maschine surrt dankbar! Der erste Schluck schmeckt nach Sieg (und etwas Kalk)." 
            },
            { 
                t: "Die Luftpolsterfolie therapeutisch ploppen", 
                req: "bubble_wrap", 
                next: "path_machine_confused", 
                m: 10, f: 5, a: -15, c: 0, 
                r: "Du setzt dich auf den Boden und ploppst Folie, bis das Zittern aufhört. *Plopp. Plopp.* Kein Kaffee, aber zumindest kein Mord." 
            },
            { 
                t: "Dagegen treten", 
                next: "path_machine_war", 
                m: 5, f: 0, a: 15, c: 0, 
                r: "BAM! Du trittst gegen das Gehäuse. Ein Schwall heißes Wasser läuft über deine Schuhe. Die Maschine piept wütend." 
            }
        ]
    },
    {
        id: "cof_disaster_2a",
        title: "Die Rache der Maschine",
        reqStory: "path_machine_war",
        text: "Du kommst zurück. Das Display leuchtet rot. Der Text läuft als Laufschrift durch, weil er so lang ist: 'ERROR 418.666.KICK_DETECTED.USER_BLACKLISTED.SELF_DEFENSE_MODE_ACTIVE.38472.DO_NOT_TOUCH'. Es riecht verbrannt.",
        opts: [
            { 
                t: "Den Stecker ziehen und den Krieg beenden", 
                m: 5, f: 0, a: 5, c: 10, 
                r: "Du ziehst den Stecker. Das rote Licht erlischt langsam wie das Auge von HAL 9000. Du hast gewonnen... vorerst." 
            },
            { 
                t: "Vorsichtig nähern", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Die Maschine spuckt plötzlich kochenden Dampf aus. Als hätte sie nur auf dich gewartet! Du weichst zurück. Das Ding ist bösartig." 
            }
        ]
    },
    {
        id: "cof_disaster_2b",
        title: "System Overload",
        reqStory: "path_machine_love",
        text: "Die Maschine blinkt wild in allen Farben. Fehlercode: 'ERROR 200.OK.BUT.HEARTBEAT.OVERFLOW.999999.USER_IS_MY_HERO.CALC_LOVE.DIV_BY_ZERO'. Sie scheint so aufgeregt über deine Rückkehr zu sein, dass sie abstürzt.",
        opts: [
            { 
                t: "Gut zureden: 'Ganz ruhig, Brauner'", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du streichelst das Gehäuse. Das Blinken wird langsamer. Sie braut dir einen 'Special Espresso' mit doppelter Crema. Schmeckt nach Zuneigung." 
            },
            { 
                t: "Einmal fest draufhauen", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Alte Schule. Die Maschine ist beleidigt und geht zurück auf Standard-Einstellungen. Der Kaffee ist okay, aber die Magie ist weg." 
            }
        ]
    },
    {
        id: "cof_disaster_2c",
        title: "Philosophischer Fehler",
        reqStory: "path_machine_confused",
        text: "Das Display zeigt jetzt Zahlenkolonnen: 'ERROR 503.PLOPP.UNDEFINED.WHAT_IS_PURPOSE.BUBBLE_LOGIC_EXCEPTION.7463.8291.000'. Die Maschine versucht anscheinend, den Sinn deiner Bubble-Wrap-Aktion zu berechnen.",
        opts: [
            { 
                t: "Zurückploppen", 
                req: "bubble_wrap", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du ploppst eine Blase. Die Maschine piept einmal. Du ploppst nochmal. Sie piept zweimal. Ihr habt eine Ebene der Verständigung gefunden." 
            },
            { 
                t: "Ignorieren", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du lässt sie rechnen. Soll sie doch Pi berechnen, solange sie irgendwann wieder Kaffee gibt." 
            }
        ]
    },
    {
        id: "cof_sugar_1",
        title: "Der Zucker-Baron",
        text: "Du hörst ein hektisches Rascheln. Bernd (Logistik) steht gebückt vor dem Vorratsschrank. Seine Anzugtaschen beulen sich verdächtig aus. Er schwitzt. 'Psst! Die da oben wollen rationalisieren! Der Great Reset kommt! Ich sichere das weiße Gold!' Er starrt dich irre an. 'Bist du dabei oder bist du ein Schaf?'",
        opts: [
            { 
                t: "'Ich sags dem Chef.'", 
                next: "path_sugar_embargo", 
				rep: { "Dr. Wichtig": 2 },
                m: 5, f: 0, a: 5, c: 5, 
                r: "Bernds Augen verengen sich zu Schlitzen. 'Du wirst es bereuen. Wenn die Krise kommt, kommst du angekrochen!' Er verschwindet im Schatten des Kopierraums. Du hast dir einen mächtigen Feind gemacht." 
            },
            { 
                t: "'Was kostet das Gramm?'", 
                next: "path_sugar_dealer", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Bernd zieht einen Taschenrechner. 'Tagespreis schwankt. Aber für dich... Tausch gegen Tackerklammern?' Ihr verhandelt kurz. Du lässt ihn gewähren." 
            },
            { 
                t: "'Gib mir 20 Prozent!'", 
                next: "path_sugar_junkie", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "Bernd grinst breit (ein Goldzahn blitzt auf). 'Guter Mann. Diversifizierung ist alles.' Er schaufelt dir drei Handvoll Päckchen in die Tasche. Ihr nickt euch verschwörerisch zu. Das Kartell steht." 
            }
        ]
    },
    {
        id: "cof_sugar_2a",
        title: "Der Margin Call",
        reqStory: "path_sugar_junkie",
        text: "Bernd fängt dich ab. Er vibriert förmlich. Seine Pupillen sind riesig, überall an seinem Mund kleben weiße Krümel. 'Der Markt ist gecrasht! Ich hab alles selbst verbraucht! Ich brauche meine Einlage zurück! Hast du den Stoff?!'",
        opts: [
            { 
                t: "Den Preis hochtreiben", 
                m: 10, f: 0, a: 15, c: 0, 
                r: "'Angebot und Nachfrage, Bernd.' Du verlangst seine Bürostuhl-Armlehnen im Tausch. Er wimmert, stimmt aber zu. Du bist jetzt der neue Baron." 
            },
            { 
                t: "Ihm den Zucker zurückgeben", 
                m: 5, f: 0, a: -10, c: 0, 
                r: "Du gibst ihm die Päckchen. Er reißt drei gleichzeitig auf und kippt sie sich pur in den Rachen. 'Ohhh ja... Mama ist zuhause.' Er wird sofort ruhig und sinkt an der Wand herunter. Krise abgewendet." 
            }
        ]
    },
    {
        id: "cof_sugar_2b",
        title: "Das Embargo",
        reqStory: "path_sugar_embargo",
        text: "Kaffee wäre da. Die Zuckerdose ist leer. Stattdessen klebt ein Zettel daran: 'Wegen Lieferkettenproblemen temporär außer Betrieb. Gez. Bernd'. Bernd sitzt drei Tische weiter auf einem Thron aus Kopierpapier und grinst dich böse an.",
        opts: [
            { 
                t: "Den Bunker stürmen", 
                m: 10, f: 0, a: -5, c: 10, 
                r: "Du stürzt dich auf seinen Papierturm. Bernd quietscht. Zuckerpäckchen regnen wie Konfetti durch das Büro. Die Kollegen jubeln und plündern mit. Die Revolution war erfolgreich!" 
            },
            { 
                t: "Kapitulieren & betteln", 
                m: 5, f: -10, a: 20, c: 0, 
                r: "Du kriechst zu Kreuze. 'Bitte, Bernd. Nur ein Löffel.' Er schnippt dir ein einzelnes Krümelchen zu. 'Das macht dann 5 Euro Bearbeitungsgebühr.' Es ist demütigend." 
            }
        ]
    },
    {
        id: "cof_sugar_2c",
        title: "Schwarzmarkt",
        reqStory: "path_sugar_dealer",
        text: "Im Flur herrscht reges Treiben. Bernd hat einen kleinen Stand aufgebaut. Er verkauft Zucker gegen Kugelschreiber, Post-its und Kantinen-Gutscheine. Das Geschäft brummt.",
        opts: [
            { 
                t: "Zum Chef gehen und auspacken", 
                m: 5, f: 0, a: 10, c: 10, 
                r: "Der Chef kommt, sieht das Geschäft... und kauft selbst zwei Päckchen für sein Meeting. 'Aus der Portokasse, Bernd.' Du hast den Glauben an das System verloren." 
            },
            { 
                t: "Als Sicherheitsdienst anheuern", 
                m: 10, f: 10, a: -10, c: 0, 
                r: "Du verschränkst die Arme und schaust böse, damit niemand klaut. Bernd beteiligt dich am Gewinn (zwei Textmarker). Ein lukrativer Nebenjob." 
            }
        ]
    },
    {
        id: "cof_mold_1",
        title: "Kühlschrank-Exkursion",
        text: "Ganz hinten im Kühlschrank steht ein Joghurt. Das Verfallsdatum ist 'Mai 2012'. Er pulsiert leicht in neon-grün. Als du dich näherst, formen sich auf der Oberfläche pelzige Buchstaben: 'H...U...N...G...E...R'.",
        opts: [
            { 
                t: "Die Tür zuwerfen und fliehen", 
                next: "path_mold_civ", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Aus den Augen, aus dem Sinn. Du klebst einen Zettel 'DEFEKT' an den Kühlschrank. Soll sich die Nachtschicht mit der neuen Lebensform rumschlagen." 
            },
            { 
                t: "Ihm ein Zuckerpäckchen opfern", 
                next: "path_mold_ally", 
                m: 5, f: -5, a: -10, c: 0, 
                r: "Du streust Zucker hinein. Der Pilz absorbiert ihn glücklich und rülpst leise. Eine piepsige Stimme in deinem Kopf sagt: 'WIR DIENEN DEM MEISTER.' Du hast jetzt einen ekligen Freund." 
            },
            { 
                t: "Mit Desinfektionsmittel angreifen", 
                next: "path_mold_war", 
                m: 10, f: 5, a: 15, c: 0, 
                r: "Du sprühst Sagrotan. Der Pilz zischt aggressiv wie eine Katze! Er zieht sich zurück, aber du hörst ihn im Abfluss kichern. Das ist noch nicht vorbei." 
            }
        ]
    },
    {
        id: "cof_mold_2a",
        title: "Die Symbiose",
        reqStory: "path_mold_ally",
        text: "Du öffnest den Kühlschrank wieder. Der Joghurt ist gewachsen. 'MEISTER', piepst es. 'DER FEIND (CHEF) HAT SEIN SANDWICH HIER GELAGERT. SOLLEN WIR ES... GESCHMACKLICH OPTIMIEREN?'",
        opts: [
            { 
                t: "Höflich ablehnen und den Frieden wahren", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "'WIE DU WÜNSCHST.' Der Pilz wirkt enttäuscht, formt aber ein Herzchen für dich. Es ist süß, aber auch extrem widerlich." 
            },
            { 
                t: "Befehl geben: 'Zugriff!'",
                rep: { "Dr. Wichtig": -2 },				
                m: 5, f: 10, a: -20, c: 20, 
                r: "Der Pilz wubbelt fröhlich rüber zum Sandwich. Später hörst du den Chef brüllen: 'Warum schmeckt mein Brot nach Blaubeere und Rache?!'. Du grinst böse." 
            }
        ]
    },
    {
        id: "cof_mold_2b",
        title: "Sporen-Alarm",
        reqStory: "path_mold_war",
        text: "Du willst dir Milch holen, aber der Joghurt hat eine Falle gebaut! Sobald das Licht angeht, schießt eine Wolke grüner Sporen direkt in dein Gesicht. Er verteidigt sein Territorium!",
        opts: [
            { 
                t: "Husten & Weinen", 
                m: 10, f: -5, a: 20, c: 0, 
                r: "Du hustest dir die Seele aus dem Leib. Deine Augen brennen. Der Joghurt scheint höhnisch zu lachen. Du hast den Kampf gegen eine Molkerei-Produk verloren." 
            },
            { 
                t: "Deo und Feuerzeug zum Flammenwerfer kombinieren", 
                m: 5, f: -5, a: -10, c: 10, 
                r: "Du brennst das Fach aus. Es stinkt bestialisch, aber der Feind ist vernichtet. Der Hausmeister wird Fragen stellen, aber du hast gesiegt." 
            }
        ]
    },
    {
        id: "cof_mold_2c",
        title: "Die Zivilisation",
        reqStory: "path_mold_civ",
        text: "Du wagst einen Blick. Im Gemüsefach hat sich was getan. Der Pilz hat kleine Häuser aus altem Käse gebaut. Winzige Pilz-Männchen reiten auf Kakerlaken. Sie haben das Rad erfunden.",
        opts: [
            { 
                t: "Mit dem Kühlschranklicht Gott spielen", 
                m: 20, f: 0, a: -15, c: 0, 
                r: "Du machst das Kühlschranklicht an und aus. Die kleinen Wesen fallen auf die Knie und beten dich an. 'DER LICHTBRINGER!'. Das tut deinem Ego gut." 
            },
            { 
                t: "Alles in den Müll schieben", 
                m: 5, f: -5, a: 5, c: 0, 
                r: "Du beendest die Geschichte brutal mit einem Müllbeutel. Ein ganzes Universum, vernichtet in Sekunden. Du fühlst dich kurz schlecht, dann holst du dir deine Milch." 
            }
        ]
    },
    {
        id: "cof_catering_1",
        title: "Die Reste der Macht",
        text: "Das Meeting der Geschäftsleitung ist vorbei. Auf dem Mahagoni-Tisch stehen die Reste. Lachs-Brötchen, Kaviar-Häppchen, Premium-Kaffee. Niemand ist zu sehen.",
        opts: [
            { 
                t: "Pflichtbewusst aufräumen", 
                next: "path_cat_cleanup", 
				rep: { "Dr. Wichtig": 5 },
                m: 15, f: -15, a: 5, c: -5, 
                r: "Du räumst Teller weg. Dabei findest du unter dem Stuhl des Chefs einen Zettel: 'TOP SECRET: Liste der Mitarbeiter, die wir feuern wollen'. Dein Name steht nicht drauf... noch nicht." 
            },
            { 
                t: "Gierig alles aufessen", 
                next: "path_cat_eat", 
                m: 10, f: 15, a: -15, c: 0, 
                r: "Du stopfst dich voll wie ein Hamster. Lachs, Trauben, Käse. Für zehn Minuten lebst du wie der Vorstand. Leider hast du jetzt einen fetten Remouladen-Fleck auf dem Hemd." 
            },
            { 
                t: "Nur den Kaffee klauen", 
                next: "path_cat_gossip", 
                m: 5, f: -10, a: -5, c: 0, 
                r: "Du füllst deinen Becher mit dem guten 'Arabica Gold'. Sabine vom Empfang fängt dich an der Tür ab. Sie grinst wissend. Sie hat dich gesehen." 
            }
        ]
    },
    {
        id: "cof_catering_2a",
		char: "Dr. Wichtig",
        title: "Heikle Informationen",
        reqStory: "path_cat_cleanup",
        text: "Der Chef kommt hektisch zurück. Er sucht genau diesen Zettel. Er sieht dich an, Panik in den Augen. 'Müller! Haben Sie hier... Papierkram gesehen?'",
        opts: [
            { 
                t: "'Hier ist er, Chef.'", 
				rep: { "Dr. Wichtig": -5 },
                m: 5, f: 0, a: 15, c: 10, 
                r: "Er reißt ihn dir aus der Hand. Statt Dankbarkeit siehst du Kälte. Er weiß jetzt, dass DU Bescheid weißt. 'Vergessen Sie das. Sofort.' Du stehst jetzt auf seiner Beobachtungsliste." 
            },
            { 
                t: "Den Zettel einfach aufessen", 
				rep: { "Dr. Wichtig": 2 },
                m: 5, f: 5, a: -20, c: -20, 
                r: "Du starrst ihm in die Augen, steckst das Papier in den Mund und schluckst es runter. 'Ich habe nichts gesehen, Chef.' Er nickt langsam, tief beeindruckt. 'Guter Mann. Loyalität schmeckt bitter, was?'" 
            }
        ]
    },
    {
        id: "cof_catering_2b",
		char: "Dr. Wichtig",
        title: "Beweislast",
        reqStory: "path_cat_eat",
        text: "Du läufst dem Chef in die Arme. Er starrt auf den riesigen Fettfleck auf deinem Hemd und die Krümel im Mundwinkel. 'Müller? Haben Sie etwa vom Vorstandsbuffet gegessen?'",
        opts: [
            { 
                t: "Dumm stellen: 'Habe mein Pausenbrot gegessen.'", 
                rep: { "Dr. Wichtig": -2 },	      
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du zeigst auf den Fleck. 'Leberwurst, Chef. Ganz übel.' Er rümpft die Nase und geht auf Abstand. 'Waschen Sie sich. Sie riechen nach Fisch.' Du bist entkommen." 
            },
            { 
                t: "'Das muss weg, wird ja schlecht!'",
                rep: { "Dr. Wichtig": -5 },				
                m: 5, f: 0, a: 5, c: 20, 
                r: "'Das ist 50€-Lachs, Müller! Das ist kein Hundefutter!' Er ist stinksauer über deine Respektlosigkeit. Das gibt eine Abmahnung wegen Mundraub." 
            }
        ]
    },
    {
        id: "cof_catering_2c",
        title: "Ein 'kleiner' Gefallen",
        reqStory: "path_cat_gossip",
        text: "Sabine blockiert den Weg. 'Ich verrate dich nicht wegen dem Kaffee... aber mein Drucker macht so komische Geräusche. Kannst du mal *ganz kurz* gucken? Bitte!'",
        opts: [
            { 
                t: "'Oh Gott! Ist das eine Spinne?!'", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du zeigst panisch hinter sie. Sabine kreischt und springt zur Seite. Du nutzt das Chaos und rennst weg. Nicht elegant, aber effektiv." 
            },
            { 
                t: "Die Erpressung schlucken und helfen", 
                m: 45, f: -15, a: 25, c: -15, 
                r: "Klassischer Fehler. Es war nicht der Drucker, es war der Treiber. Und das Netzwerk. Du bist 45 Minuten gefangen. Sabine erzählt dir dabei ihre ganze Lebensgeschichte. Du hasst dich selbst." 
            }
        ]
    },
    {
        id: "cof_bulletin_board",
        title: "Warten auf das schwarze Gold",
        text: "Der Ladebalken der Maschine klebt seit einer gefühlten Ewigkeit bei 99%. Ein einzelner Tropfen fällt in Zeitlupe. Die Spannung ist kaum auszuhalten.",
        opts: [
            { 
                t: "Die Zeit mit Kevin totschlagen",
                rep: { "Kevin": 5 },
                m: 10, f: 10, a: -10, c: 5, 
                r: "Kevin textet dich mit seinem 'Gaming-Teppich' zu. Es ist furchtbar, aber immerhin hältst du am Ende einen frischen, heißen Kaffee in der Hand." 
            },
            { 
                t: "Ungeduldig wippen & zurückrennen", 
                m: 2, f: -5, a: 5, c: 0, 
                r: "Du hältst es nicht mehr aus und reißt den Becher weg. Ein heißer Tropfen landet auf deinem Hemd, aber du bist sofort wieder am Platz." 
            },
            { 
                t: "Das 'Schwarze Brett' studieren", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "CMD:OPEN_BOARD"
            }
        ]
    },
	{
        id: "cof_lore_2c",
		char: "Kevin",
        title: "Gerüchteküche",
        reqStory: "path_lore_ignore",
        text: "Du triffst Kevin in der Küche. Er grinst breit und wedelt mit einem Aktenordner. 'Rate mal, was ich im Serverraum gefunden habe? Die HR-Liste! Ich werde alle erpressen!'",
        opts: [
            { 
                t: "Ihn beim Chef verpfeifen", 
                rep: { "Dr. Wichtig": 10, "Kevin": -20 },
                m: 10, f: -5, a: -5, c: -15, 
                r: "Du rufst Dr. Wichtig an. Kurz darauf wird Kevin von zwei Sicherheitsleuten abgeführt. Dein Standing beim Chef ist gestiegen." 
            },
            { 
                t: "Ihn warnen", 
                rep: { "Kevin": 5 },
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Kevin, HR sucht danach. Verbrenn das.' Er wird bleich. 'Oh... danke, Bro.' Er rennt zum Schredder." 
            },
            { 
                t: "Ignorieren", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Nicht dein Problem. 10 Minuten später hörst du Schreie aus dem HR-Büro. Tja." 
            }
        ]
    },
    {
        id: "cof_kevin_hack_1",
		char: "Kevin",
        title: "Kevins Upgrade",
        text: "Kevin hat die Rückwand der Kaffeemaschine abgeschraubt und einen Raspberry Pi an die Platine gelötet. 'Ich installiere Doom auf dem Display. Und ich habe die Wassertemperatur auf 105 Grad übertaktet. Willst du den ersten Testlauf machen?'",
        opts: [
            { 
                t: "'Ich trinke heute... Tee.'", 
                next: "path_kevin_hack_ignore", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du verlässt die Küche, bevor du als Mitschuldiger identifiziert werden kannst." 
            },
            { 
                t: "'Bau das sofort zurück!'", 
                next: "path_kevin_hack_stop", 
                rep: { "Kevin": -5 }, 
                m: 10, f: -5, a: 5, c: -5, 
                r: "Du zwingst ihn, die Kabel zu trennen. Kevin mault: 'Hier wird Innovation echt klein gehalten.' Die Maschine sieht wieder normal aus." 
            },
            { 
                t: "'Kann sie auch Bitcoin minen?'", 
                next: "path_kevin_hack_help", 
                rep: { "Kevin": 10 }, 
                m: 5, f: -5, a: -10, c: 10, 
                r: "Kevin leuchtet förmlich. 'Gute Idee! Ich leite den Strom vom Kühlschrank um.' Ihr bastelt kurz weiter. Es riecht leicht nach verschmortem Plastik." 
            }
        ]
    },
    {
        id: "cof_kevin_hack_2a",
        title: "Lauwarme Plörre",
        reqStory: "path_kevin_hack_stop",
        text: "Die Kaffeemaschine blinkt grün: 'SAFE MODE'. Der Kaffee kommt mit exakt 60 Grad heraus und schmeckt wässrig. Kevin hat aus Trotz die Spar-Einstellungen aktiviert.",
        opts: [
            { 
                t: "Trinken und leiden", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Es schmeckt nach Kompromiss und Traurigkeit. Dein Koffeinspiegel steigt kaum." 
            },
            { 
                t: "Kevin suchen", 
                rep: { "Kevin": -2 },
                m: 5, f: -5, a: 5, c: 0, 
                r: "Du findest ihn nicht. Er versteckt sich wohl im Lager. Du bleibst müde." 
            }
        ]
    },
    {
        id: "cof_kevin_hack_2b",
        title: "Kernschmelze",
        reqStory: "path_kevin_hack_help",
        text: "Als du die Küche betrittst, ist die Kaffeemaschine dunkelrot am Glühen. Auf dem Display läuft tatsächlich Doom, aber der Kaffee ist verdampft. Der ganze Raum ist eine Sauna.",
        opts: [
            { 
                t: "Stecker ziehen", 
                m: 5, f: -5, a: 0, c: 0, 
                r: "Du rettest das Gebäude. Die Maschine stirbt mit einem traurigen Fiepen. Kein Kaffee heute." 
            },
            { 
                t: "Davor wärmen", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Immerhin ist es warm. Du genießt die tropische Hitze, bis der Feuermelder piept." 
            }
        ]
    },
    {
        id: "cof_kevin_hack_2c",
        title: "Bluescreen",
        reqStory: "path_kevin_hack_ignore",
        text: "Die Kaffeemaschine zeigt einen Bluescreen of Death: 'Error 404: Beans not found'. Kevin steht daneben und kratzt sich am Kopf. 'Ich glaube, ich habe das Mainboard frittiert.'",
        opts: [
            { 
                t: "Lachen", 
                rep: { "Kevin": -5 },
                m: 2, f: 0, a: -5, c: 0, 
                r: "'Tja. Nicht mein Problem.' Du gehst ohne Kaffee, aber mit Schadenfreude." 
            },
            { 
                t: "Egon rufen", 
                rep: { "Egon": 5 },
                m: 5, f: -5, a: 0, c: 0, 
                r: "Du verpetzt Kevin beim Hausmeister. Egon kommt mit der großen Rohrzange. Das wird laut." 
            }
        ]
    },
    {
        id: "cof_chantal_tiktok_1",
		char: "Chantal",
        title: "Content Creation",
        text: "Chantal hat ein Ringlicht vor der Kaffeemaschine aufgebaut. 'Hey! Kannst du kurz filmen? Ich mache die 'No-Sleep-Challenge'. Ich muss so tun, als würde ich den Kaffee inhalieren. Sei ästhetisch!'",
        opts: [
            { 
                t: "'Klar, Action!'", 
                next: "path_chantal_tiktok_help", 
                rep: { "Chantal": 10 }, 
                m: 10, f: -5, a: -5, c: 0, 
                r: "Du filmst 15 Takes. 'Mehr Drama!', ruft sie. Am Ende ist der Kaffee kalt, aber Chantal ist happy." 
            },
            { 
                t: "Heimlich den Stecker ziehen", 
                next: "path_chantal_tiktok_ruin", 
                rep: { "Chantal": -15 }, 
                m: 5, f: 0, a: -10, c: 0, 
                r: "Mitten im Take geht das Licht aus. 'Mein Vibe!', schreit sie. Du zuckst mit den Schultern. 'Stromausfall.'" 
            },
            { 
                t: "Sie beiseiteschieben", 
                next: "path_chantal_tiktok_push", 
                rep: { "Chantal": -5 }, 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du drängelst dich durch das Setup. Chantal filmt deinen Rücken. 'Und hier sehen wir negative Energie in freier Wildbahn.'" 
            }
        ]
    },
    {
        id: "cof_chantal_tiktok_2a",
		char: "Chantal",
        title: "Dankeschön",
        reqStory: "path_chantal_tiktok_help",
        text: "Chantal fängt dich ab. 'Das Video hat 300 Views! Hier, als Dankeschön.' Sie drückt dir einen Becher mit einer grünen Flüssigkeit in die Hand. 'Detox-Spinat-Matcha-Latte. Selbstgemacht.'",
        opts: [
            { 
                t: "In die Pflanze kippen", 
                rep: { "Chantal": -2 },
                m: 2, f: 0, a: 0, c: 0, 
                r: "Der Ficus lässt sofort die Blätter hängen. Du hast das Büro vor einer Biowaffe bewahrt." 
            },
            { 
                t: "Den Becher tapfer austrinken", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Es schmeckt nach Wiese und Erde. Du würgst es runter. Chantal strahlt. 'Spürst du den Glow?'" 
            }
        ]
    },
    {
        id: "cof_chantal_tiktok_2b",
        title: "Cancel Culture",
        reqStory: "path_chantal_tiktok_ruin",
        text: "Du kommst in die Küche. Über der Kaffeemaschine hängt ein ausgedruckter Screenshot von deinem Gesicht, rot durchgestrichen. Darunter steht: 'Achtung: Energievampir'.",
        opts: [
            { 
                t: "Abreißen", 
                rep: { "Chantal": -5 },
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du zerknüllst den Zettel. Es fühlt sich an wie ein kleiner Sieg, aber der Krieg hat erst begonnen." 
            },
            { 
                t: "Drüber lachen", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du malst dir selbst einen Schnurrbart auf das Bild. Chantal sieht es später und ist verwirrt." 
            }
        ]
    },
    {
        id: "cof_chantal_tiktok_2c",
        title: "Passiv-Aggressiv",
        reqStory: "path_chantal_tiktok_push",
        text: "Die Kaffeemaschine ist mit rosa Post-its zugeklebt. 'Bitte Abstand halten!', 'Positive Vibes Only!', 'Keine Hektik!'. Du brauchst 2 Minuten, um den Start-Knopf freizulegen.",
        opts: [
            { 
                t: "Alles abreißen", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du machst einen großen Papierball. Das war befriedigend." 
            },
            { 
                t: "Kaffee blind drücken", 
                m: 2, f: 0, a: 10, c: 0, 
                r: "Du drückst durch das Papier. Es war der Knopf für 'Heißes Wasser'. Dein Kaffee ist ruiniert." 
            }
        ]
    },
    {
        id: "cof_ceo_trap_1",
		char: "Dr. Wichtig",
        title: "Die Honigfalle",
        text: "Dr. Wichtig steht lächelnd an der Maschine. Er hält zwei Becher. 'Ah, Müller! Perfektes Timing. Ich habe heute Spendierhosen an. Möchten Sie diesen doppelten Espresso? Aus meinem Privat-Vorrat. Geht aufs Haus.'",
        opts: [
            { 
                t: "'Ist da Gift drin?'", 
                next: "path_ceo_trap_doubt", 
                rep: { "Dr. Wichtig": -5 }, 
                m: 5, f: 0, a: 0, c: 5, 
                r: "Sein Lächeln gefriert. 'Ihr Humor ist... speziell, Müller. Es ist nur Kaffee. Oder haben Sie ein schlechtes Gewissen?'" 
            },
            { 
                t: "Dankbar annehmen: 'Wow, Chef!'", 
                next: "path_ceo_trap_taken", 
                rep: { "Dr. Wichtig": 5 }, 
                m: 5, f: -5, a: -5, c: -5, 
                r: "Du nimmst den Becher. Er ist heiß und duftet herrlich. Der Chef lächelt breiter. 'Wunderbar. Wer Zeit für Genuss hat, hat sicher Energie übrig.'" 
            },
            { 
                t: "'Muss dringend arbeiten.'", 
                next: "path_ceo_trap_denied", 
                rep: { "Dr. Wichtig": 10 }, 
                m: 2, f: -10, a: 5, c: -10, 
                r: "Du winkst ab und hastest weiter. Der Chef nickt anerkennend. 'Disziplin! Das gefällt mir. Weitermachen!'" 
            }
        ]
    },
    {
        id: "cof_ceo_trap_2a",
        title: "Die Quittung",
        reqStory: "path_ceo_trap_taken",
        text: "Zurück am Platz wartet ein riesiger Stapel unsortierter Rechnungen. Ein Post-it klebt darauf: 'Da Sie ja frisch gestärkt sind – bitte bis 17 Uhr abarbeiten. Danke für den Kaffee-Plausch. Dr. W.'",
        opts: [
            { 
                t: "Stapel zu Kevin schieben", 
                rep: { "Kevin": -10 },
                m: 5, f: 5, a: -5, c: 5, 
                r: "Du legst den Stapel unauffällig auf Kevins Tisch. Er wird es nicht merken, bis es zu spät ist." 
            },
            { 
                t: "Den Stapel selbst abarbeiten", 
                rep: { "Dr. Wichtig": 5 }, 
                m: 45, f: -20, a: 20, c: 0, 
                r: "Du sortierst Papier. Der Kaffee war gut, aber der Preis war zu hoch." 
            }
        ]
    },
    {
        id: "cof_ceo_trap_2b",
		char: "Markus",
        title: "Kollateralschaden",
        reqStory: "path_ceo_trap_denied",
        text: "Du siehst Markus im Flur. Er schleppt schwere Archiv-Kisten und schwitzt. 'Der Chef hat mich abgefangen', keucht er. 'Er meinte, wer Zeit für Kaffee hat, hat auch Zeit zum Schleppen. Hätte ich bloß abgelehnt...'",
        opts: [
            { 
                t: "Schadenfroh grinsen", 
                m: 2, f: 0, a: -10, c: 0, 
                r: "Das Leid der anderen ist der schönste Trost. Du hast alles richtig gemacht." 
            },
            { 
                t: "Markus auslachen", 
                rep: { "Markus": -10 },
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du gehst kurz hin, um Markus auszulachen. 'Anfängerfehler', flüsterst du." 
            }
        ]
    },
    {
        id: "cof_ceo_trap_2c",
        title: "HR Prüfung",
        reqStory: "path_ceo_trap_doubt",
        text: "Eine E-Mail von HR ploppt auf. 'Routine-Überprüfung der Loyalität'. Dr. Wichtig hat wohl deine Skepsis als 'mangelndes Vertrauen in die Führungsebene' gemeldet.",
        opts: [
            { 
                t: "Panik", 
                m: 10, f: 0, a: 10, c: 10, 
                r: "Du löschst hektisch deinen Browserverlauf und versteckst deine privaten Snacks. Die Paranoia steigt." 
            },
            { 
                t: "Cool bleiben", 
                m: 5, f: 0, a: 0, c: 5, 
                r: "Du füllst den Fragebogen mit Standard-Phrasen aus. 'Ich liebe diese Firma.' Hoffentlich reicht das." 
            }
        ]
    },
    {
        id: "cof_egon_fix_1",
		char: "Egon",
        title: "Offene Operation",
        text: "Die Kaffeemaschine ist zerlegt. Egon stochert mit einem Schraubenzieher im Mahlwerk. 'Kalk. Überall Kalk. Und jemand hat Kaugummi reingeworfen. Das muss mechanisch gelöst werden.'",
        opts: [
            { 
                t: "'Nimm doch einfach Entkalker.'", 
                next: "path_egon_fix_chem", 
                rep: { "Egon": -10 }, 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Egon funkelt dich an. 'Chemie ist für Weicheier! Das hier ist Präzisionsarbeit.' Er hämmert wütend gegen den Tank." 
            },
            { 
                t: "Ihn dafür bezahlen, sie schneller zu machen", 
                next: "path_egon_fix_turbo", 
                rep: { "Egon": 5 }, 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Du steckst ihm einen Riegel zu. 'Kannst du den Druck erhöhen?' Egon grinst. 'Ich dreh die Sicherheitsschraube raus. Auf eigene Gefahr.'" 
            },
            { 
                t: "Die Teile halten", 
                next: "path_egon_fix_help",
                rep: { "Egon": 10 },
                m: 20, f: -10, a: 10, c: 0, 
                r: "Du hältst die Klappe und die Taschenlampe. Egon brummt zufrieden. 'Du hast Hände, die arbeiten können. Selten hier.'" 
            }
        ]
    },
    {
        id: "cof_egon_fix_2a",
        title: "Kalter Kaffee",
        reqStory: "path_egon_fix_chem",
        text: "Beim nächsten Versuch läuft die Maschine zwar wieder, aber Egon hat aus Trotz die Heizspirale abgeklemmt. Der Kaffee kommt bei exakt 18 Grad heraus.",
        opts: [
            { 
                t: "Mikrowelle nutzen", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du machst den Kaffee in der Mikrowelle warm. Er schmeckt jetzt nach verbranntem Plastik und Kalk." 
            },
            { 
                t: "Beschweren", 
                rep: { "Egon": -5 },
                m: 5, f: 0, a: 20, c: 0, 
                r: "Du findest einen Zettel: 'Beschwerden bitte schriftlich an den Hausmeisterkeller, Ebene -3.' Er lacht irgendwo dreckig." 
            }
        ]
    },
    {
        id: "cof_egon_fix_2b",
        title: "Herzrasen",
        reqStory: "path_egon_fix_turbo",
        text: "Der Kaffee fließt nicht, er schießt in die Tasse. Er ist schwarz wie Rohöl und hat eine Konsistenz wie Sirup. Die Tasse vibriert leicht auf der Untertasse.",
        opts: [
            { 
                t: "Vorsichtig nippen", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Viel zu stark. Du bekommst sofort Sodbrennen. Egon ruft aus der Ferne: 'Das ist Diesel für die Seele!'" 
            },
            { 
                t: "Ex und hopp", 
                m: 5, f: -20, a: 10, c: 0, 
                r: "Du trinkst es. Deine Pupillen weiten sich. Du kannst plötzlich Geräusche sehen. Du arbeitest die nächsten 2 Stunden mit 300% Speed." 
            }
        ]
    },
    {
        id: "cof_egon_fix_2c",
		char: "Egon",
        title: "Handwerker-Ehre",
        reqStory: "path_egon_fix_help",
        text: "Die Maschine schnurrt wie ein Kätzchen. Egon steht im Flur und nickt dir zu. Er hat ein 'Reserviert'-Schild für dich an die Maschine gehängt.",
        opts: [
            { 
                t: "Danken & Genießen", 
                rep: { "Egon": 5 },
                m: 5, f: 5, a: -10, c: 0, 
                r: "Der beste Kaffee seit Wochen. Und du hast jetzt Respekt beim Hausmeister. Das zahlt keine Gehaltserhöhung aus, aber es öffnet Türen. Wörtlich." 
            },
            { 
                t: "Schild entfernen", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Du willst keine Sonderbehandlung. Aber der Kaffee schmeckt trotzdem gut." 
            }
        ]
    },
    {
        id: "cof_elster_audit_1",
		char: "Frau Elster",
        title: "Die Budget-Kontrolle",
        text: "Frau Elster steht mit einem Klemmbrett vor der Kaffeemaschine. Sie notiert jede Tasse. 'Herr Müller! Der Bohnenverbrauch ist im Q3 um 4,2% gestiegen. Haben Sie das Entnahme-Formular K-7 ausgefüllt?'",
        opts: [
            { 
                t: "Einen Euro in die Kasse werfen", 
                next: "path_elster_audit_pay", 
                rep: { "Frau Elster": 5 }, 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Ihr Blick wird weicher. 'Eine Spende? Sehr löblich. Das verbuchen wir unter 'Sonstige Einnahmen'. Weitermachen.'" 
            },
            { 
                t: "'Ich nehme nur heißes Wasser.'", 
                next: "path_elster_audit_lie", 
                rep: { "Frau Elster": 5 }, 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Sie nickt zufrieden. 'Vorbildlich! Wasser ist gratis und gut für die Bilanz. Trinken Sie!'" 
            },
            { 
                t: "'Kaffee ist ein Grundrecht!'", 
                next: "path_elster_audit_fight", 
                rep: { "Frau Elster": -10 }, 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Sie spitzt den Lippenstift. 'Grundrechte kosten Geld. Ich notiere: Unkooperatives Verhalten bezüglich Ressourcen-Allokation.'" 
            }
        ]
    },
    {
        id: "cof_elster_audit_2a",
		char: "Frau Elster",
        title: "Rationierung",
        reqStory: "path_elster_audit_fight",
        text: "Du steuerst die Maschine an. Das Display zeigt: 'LIMIT ERREICHT'. Ein Zettel von Frau Elster hängt daneben: 'Wegen Verschwendungssucht wurde Abteilung IT auf 2 Tassen pro Tag gedrosselt.'",
        opts: [
            { 
                t: "Wütend gegen die Maschine treten", 
                m: 2, f: 0, a: 10, c: 5, 
                r: "Es bringt nichts, außer einem schmerzenden Zeh. Die Maschine bleibt stur." 
            },
            { 
                t: "Bei Marketing schnorren", 
                rep: { "Chantal": -5 },
                m: 10, f: -5, a: 5, c: 0, 
                r: "Du schleichst dich zu Chantals Nespresso-Maschine. Sie erwischt dich. 'Das kostet aber extra!'" 
            }
        ]
    },
    {
        id: "cof_elster_audit_2b",
        title: "Papierkrieg",
        reqStory: "path_elster_audit_pay",
        text: "Du findest einen Umschlag auf deinem Platz. Inhalt: Eine Spendenquittung über 1,00 Euro und ein zweiseitiges Formular zur 'steuerlichen Erfassung von Kleinstbeträgen', das du unterschreiben musst.",
        opts: [
            { 
                t: "Ausfüllen", 
                rep: { "Frau Elster": 2 },
                m: 15, f: -10, a: 5, c: 0, 
                r: "Du verschwendest 15 Minuten Arbeitszeit für 1 Euro. Frau Elster ist glücklich, deine Seele weint." 
            },
            { 
                t: "Ignorieren", 
                rep: { "Frau Elster": -5 },
                m: 2, f: 5, a: 0, c: 0, 
                r: "Das Formular landet im Müll. Du weißt, dass sie das in ihrer schwarzen Liste vermerken wird." 
            }
        ]
    },

    {
        id: "cof_elster_audit_2c",
		char: "Frau Elster",
        title: "Tee-Zwang",
        reqStory: "path_elster_audit_lie",
        text: "Frau Elster lauert dir wieder auf. 'Herr Müller! Ich habe gesehen, wie Sie Richtung Kaffeebohnen geschielt haben. Bleiben wir doch bei unserem gesunden Wasser, nicht wahr?' Sie beobachtet dich streng.",
        opts: [
            { 
                t: "Heimlich Kaffee ziehen", 
                rep: { "Frau Elster": -10 },
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du wartest, bis sie blinzelt, und drückst schnell 'Espresso'. Er schmeckt nach Freiheit mit einer Note Straftat." 
            },
            { 
                t: "Gehorsam Wasser trinken", 
                rep: { "Frau Elster": 5 },
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du trinkst heißes Wasser. Es schmeckt nach nichts. Dein Koffein-Entzug setzt ein." 
            }
        ]
    },
    {
        id: "cof_markus_pitch_1",
		char: "Markus",
        title: "Networking",
        text: "Markus fängt dich ab. Er lehnt lässig an der Maschine und blockiert den Ausguss. 'Müller! Kaffee ist für Closer. Apropos... hast du mal über passives Einkommen nachgedacht? Krypto? NFTs von gelangweilten Katzen? Ich kann dich ins inner Circle holen.'",
        opts: [
            { 
                t: "Interesse heucheln - vielleicht gibts Gratis-Kaffee", 
                next: "path_markus_pitch_scam", 
                rep: { "Markus": 5 }, 
                m: 15, f: 10, a: -5, c: 0, 
                r: "Er redet 15 Minuten über Blockchain und Mindset. Du hast nichts verstanden, aber er zahlt deinen Kaffee mit seiner 'Black Card'." 
            },
            { 
                t: "'Ist das ein Schneeballsystem?'", 
                next: "path_markus_pitch_hate", 
                rep: { "Markus": -10 }, 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Markus läuft rot an. 'Es ist Multi-Level-Marketing! Du hast einfach das Mindset eines Angestellten.' Er stürmt beleidigt davon." 
            },
            { 
                t: "Schweigen und starren", 
                next: "path_markus_pitch_alpha", 
                rep: { "Markus": 5 }, 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du starrst ihm wortlos in die Augen, drückst den Knopf und gehst. Markus nickt respektvoll. 'Alpha-Move. Gefällt mir.'" 
            }
        ]
    },
    {
        id: "cof_markus_pitch_2a",
        title: "Spam-Attacke",
        reqStory: "path_markus_pitch_scam",
        text: "Dein E-Mail-Postfach quillt über. Markus hat dich ungefragt für seinen Newsletter 'Porsche in 3 Wochen' angemeldet. Betreff: 'WAKE UP MATRIX SLAVE!!!'.",
        opts: [
            { 
                t: "Markus konfrontieren", 
                rep: { "Markus": -5 },
                m: 5, f: 0, a: 5, c: 0, 
                r: "'Das ist Growth-Hacking!', verteidigt er sich. Deine Schläfen pochen im Takt seiner Buzzwords." 
            },
            { 
                t: "Löschen & Blockieren", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du verbringst Zeit damit, Filter zu erstellen. Es kommen trotzdem noch WhatsApp-Nachrichten." 
            }
        ]
    },
    {
        id: "cof_markus_pitch_2b",
		char: "Markus",
        title: "Rufmord",
        reqStory: "path_markus_pitch_hate",
        text: "Du hörst Markus in der Küche lästern. 'Müller? Totaler Low-Performer. Bremst den Umsatz. Hat Angst vor Erfolg.' Gabi und Chantal hören zu.",
        opts: [
            { 
                t: "Dazwischengrätschen", 
                rep: { "Markus": -5, "Gabi": 5 },
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du stellst ihn bloß. 'Wie laufen denn deine NFTs, Markus?' Stille. Gabi kichert." 
            },
            { 
                t: "Ignorieren", 
                m: 2, f: 0, a: 10, c: 0, 
                r: "Du atmest den Ärger weg. Der Löwe kümmert sich nicht um die Meinung von Schafen." 
            }
        ]
    },
    {
        id: "cof_markus_pitch_2c",
		char: "Markus",
        title: "Der Mentor",
        reqStory: "path_markus_pitch_alpha",
        text: "Markus kommt zu dir an den Tisch. Er legt dir ein Buch hin: 'Die 4-Stunden-Woche'. 'Für dich, Tiger. Wir Wölfe müssen zusammenhalten.'",
        opts: [
            { 
                t: "Tatsächlich hineinlesen", 
                rep: { "Markus": 5 },
                m: 30, f: 20, a: 5, c: 0, 
                r: "Du liest drei Seiten. Es geht nur darum, Arbeit an andere auszulagern. Du fühlst dich schmutzig." 
            },
            { 
                t: "Buch als Monitorständer nutzen", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Es hat die perfekte Höhe. Endlich Nackenschmerzen weg. Danke Markus." 
            }
        ]
    },
    {
        id: "cof_gabi_break_1",
		char: "Gabi",
        title: "Versteckspiel",
        text: "Gabi hockt hinter der großen Topfpflanze neben der Kaffeemaschine. Sie flüstert: 'Psst! Ich verstecke mich vor dem UPS-Mann. Der hat ein Paket, das 30kg wiegt. Sag nichts!'",
        opts: [
            { 
                t: "'DA HINTEN IST SIE!'", 
                next: "path_gabi_break_snitch", 
                rep: { "Gabi": -10 }, 
                m: 5, f: 0, a: 5, c: -5, 
                r: "Gabi muss aus ihrem Versteck kriechen. Ihr Blick könnte töten, während sie das Paket annimmt." 
            },
            { 
                t: "'Hab sie nicht gesehen.'", 
                next: "path_gabi_break_help", 
                rep: { "Gabi": 10 }, 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Der Bote zieht ab. Gabi atmet auf. 'Du bist ein Lebensretter. Nimm dir nen Keks.'" 
            },
            { 
                t: "'Das kostet dich einen Kaffee.'", 
                next: "path_gabi_break_deal", 
                rep: { "Gabi": -5 }, 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Sie verdreht die Augen, kauft dir aber einen am Automaten. 'Gierhals. Aber Deal ist Deal.'" 
            }
        ]
    },

    {
        id: "cof_gabi_break_2a",
		char: "Gabi",
        title: "Post-Rache",
        reqStory: "path_gabi_break_snitch",
        text: "Du wartest auf ein dringendes Paket. Gabi grinst dich am Empfang an. 'Oh, das? Das habe ich zurückgeschickt. 'Empfänger unbekannt verzogen'. Tja. Pech.'",
        opts: [
            { 
                t: "Zum Depot fahren", 
                m: 45, f: -20, a: 10, c: 0, 
                r: "Du holst es selbst ab. Das hat dich fast eine Stunde gekostet." 
            },
            { 
                t: "Ausrasten", 
                rep: { "Gabi": -5 },
                m: 10, f: 0, a: 20, c: 0, 
                r: "Du schreist. Gabi feilt sich die Nägel. 'Ihre Aggressionen verstoßen gegen die Hausordnung.'" 
            }
        ]
    },

    {
        id: "cof_gabi_break_2b",
		char: "Gabi",
        title: "Frühwarnsystem",
        reqStory: "path_gabi_break_help",
        text: "Dein Telefon klingelt einmal kurz, gerade als du aufstehen wolltest. Gabi: 'Code Rot. Dr. Wichtig ist auf dem Weg zu dir. Er sieht sauer aus. Tu beschäftigt.'",
        opts: [
            { 
                t: "Flüchten", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du bist weg, bevor er da ist. Die Tür fällt zu, sein Schatten erscheint im Milchglas. Knapper geht es nicht." 
            },
            { 
                t: "Vorbereiten", 
                rep: { "Dr. Wichtig": -2 }, 
                m: 5, f: -10, a: 5, c: -10, 
                r: "Als der Chef kommt, bist du tief in Excel vergraben. Er nickt zufrieden und geht weiter. Gabi hat dich gerettet." 
            }
        ]
    },

    {
        id: "cof_gabi_break_2c",
		char: "Gabi",
        title: "Schulden begleichen",
        reqStory: "path_gabi_break_deal",
        text: "Gabi knallt dir einen Schokoriegel auf den Tisch. 'Hier. Dein Schweigegeld. Ich hoffe, er schmeckt nach Verrat.'",
        opts: [
            { 
                t: "Entschuldigen", 
                rep: { "Gabi": 5 },
                m: 5, f: 0, a: 0, c: 0, 
                r: "'War doch nur Spaß.' Gabi brummt etwas, das entfernt nach Versöhnung klingt, und schiebt dir den Riegel näher. 'Jaja. Iss schon.' Der Streit ist damit offiziell vertagt." 
            },
            { 
                t: "Essen", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Er schmeckt nach Schokolade. Moral ist was für Leute ohne Hunger." 
            }
        ]
    },
    {
        id: "cof_descale_absurd_1",
        title: "Entkalkung: Schritt 1 von 73",
        text: "Du brauchst Kaffee. Die Maschine blockiert: 'ENTKALKUNG NOTWENDIG'. Der Display-Assistent verlangt Absurdes: 'Schritt 1: Wassertank 45 Grad neigen. Schritt 2: Schublade 3x öffnen.' Der Chef ruft im Vorbeigehen: 'Gut, dass Sie das machen! Bleiben Sie dran!'",
        opts: [
            { 
                t: "Sensor manuell überbrücken", 
                req: "screw",
                next: "path_descale_screw",
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du drückst mit dem Schraubendreher den versteckten Mikroschalter für 'Reinigung abgeschlossen'. Die dumme Maschine glaubt dir. Der Kaffee läuft. Du gehst zufrieden zurück ins Büro." 
            },
            { 
                t: "Einfach Essig-Essenz reinkippen", 
                next: "path_descale_vinegar",
                m: 5, f: 10, a: 0, c: 0, 
                r: "Du kippst puren Essig in den Tank und startest den Spülvorgang blind. Das dauert kurz, du hast aber keine Lust zu warten. Du verdrückst dich unauffällig in dein Büro." 
            },
            { 
                t: "Alle 73 Schritte ausführen", 
                next: "path_descale_brav",
				rep: { "Dr. Wichtig": 10 },
                m: 75, f: -10, a: 30, c: -5, 
                r: "Anderthalb Stunden! Du musstest die Dampfdüse mit einer Zahnbürste massieren. Deine Laune ist am Nullpunkt. Der Chef ist glücklich. Du hast aktuell keinen Nerv auf Kaffee und gehst zurück arbeiten." 
            }
        ]
    },
    {
        id: "cof_descale_absurd_2a",
        title: "Der Kaffeegott",
        reqStory: "path_descale_brav",
        text: "Du hast dich von dem 75-Minuten-Trauma erholt und betrittst die Küche. Die Maschine ist so sauber, sie glänzt wie ein Diamant. Kein anderer hat sich bisher getraut, sie zu benutzen.",
        opts: [
            { 
                t: "Den ersten Kaffee andächtig zapfen", 
                m: 10, f: 10, a: -20, c: 0, 
                r: "Dein erster gezapfter Kaffee ist eine Offenbarung. Perfekte Crema, perfekte Temperatur. Dieser Kaffee heilt Wunden. Deine Wut sinkt massiv." 
            },
            { 
                t: "Ein 'Außer Betrieb' Schild anbringen", 
                m: 5, f: 5, a: 10, c: 10, 
                r: "Du reservierst das saubere Gerät für dich allein. Die Kollegen sind stinksauer und beschweren sich beim Chef. Aber dein Kaffee bleibt fortan rein." 
            },
            { 
                t: "Den Kaffee für 5€ an Chantal verkaufen", 
                rep: { "Chantal": -5 },
                m: 5, f: 0, a: -10, c: 0, 
                r: "Du verkaufst den perfekten 'First Brew' an die Koffein-süchtige Chantal. Sie zahlt grummelnd. Du bist reich, aber sie hasst deinen Kapitalismus." 
            }
        ]
    },
    {
        id: "cof_descale_absurd_2b",
		char: "Markus",
        title: "Brocken im Becher",
        reqStory: "path_descale_screw",
        text: "Stunden nach deiner Schraubendreher-Aktion kommt Markus vom Vertrieb mit einem Becher zu dir ins Büro. Er spuckt fast. 'Sag mal, was ist mit dem Kaffee los?! Da schwimmen weiße Bröckchen drin! Ist das Kokain oder Gift?!'",
        opts: [
            { 
                t: "Schuldig fühlen & ihm neuen Kaffee am Bäcker holen", 
                m: 20, f: -5, a: 10, c: 0, 
                r: "Du gehst los und kaufst ihm einen anständigen Kaffee. Er ist besänftigt, aber du hast 20 Minuten und 3 Euro verloren." 
            },
            { 
                t: "'Das ist Vanilla-Flavour-Crunch!'", 
                rep: { "Markus": 5 },
                m: 5, f: 0, a: 0, c: 0, 
                r: "Markus starrt in den Becher. 'Crunch? Oh, premium!' Er trinkt ihn tatsächlich aus. Das Kalk-Problem hat sich erledigt." 
            },
            { 
                t: "'Dann entkalk sie halt selbst!'", 
                rep: { "Markus": -10 },
                m: 5, f: 0, a: 10, c: 5, 
                r: "Markus wirft den Kaffee wütend in deinen Mülleimer. 'Immer diese arrogante IT!' Du hast einen Freund verloren, aber Zeit gespart." 
            }
        ]
    },
    {
        id: "cof_descale_absurd_2c",
		char: "Dr. Wichtig",
        title: "Salatdressing",
        reqStory: "path_descale_vinegar",
        text: "Einige Zeit ist vergangen. Dann fliegt die Chef-Bürotür auf. Er würgt. 'Müller! Was ist in der Kaffeemaschine?! Ich wollte einen Espresso und es schmeckt wie lauwarmer Gurkensalat! Der ganze Flur riecht nach Essig!'",
        opts: [
            { 
                t: "'Telefon klingelt, muss weg!'", 
                m: 5, f: 5, a: 0, c: 10, 
                r: "Du rennst panisch zurück in dein Büro und schließt die Tür ab. Der Chef brüllt weiter auf dem Flur herum, sucht sich aber ein anderes Opfer. Feige, aber effektiv." 
            },
            { 
                t: "'Bestimmt ein Sabotage-Akt!'", 
				rep: { "Dr. Wichtig": -5 },
                m: 10, f: 0, a: 15, c: 15, 
                r: "Der Chef glaubt dir halb, aber er verdonnert dich dazu, die Maschine 30 Minuten lang mit klarem Wasser zu spülen. Der Pfusch von vorhin hat dich jetzt eingeholt." 
            },
            { 
                t: "'Das ist ein Lifehack aus dem Internet!'", 
				rep: { "Dr. Wichtig": -15 },
                m: 5, f: 0, a: 20, c: 30, 
                r: "Der Chef läuft rot an. 'Lassen Sie Ihre Lifehacks aus meiner Maschine!' Er ist fuchsteufelswild und brüllt dich über den ganzen Flur an." 
            }
        ]
    },
    {
        id: "cof_swiss_choc_1",
        title: "Der süße Fund",
        text: "Jemand hat eine sündhaft teure, noch verschlossene Tafel Schweizer Edelschokolade auf der Mikrowelle liegen lassen. Kein Zettel, kein Name. Sie liegt da einfach und ruft deinen Namen.",
        opts: [
            { 
                t: "Als IT-Fundsache einziehen", 
                loot: "chocolate", 
                next: "path_choc_steal", 
                m: 2, f: 0, a: -5, c: 5, 
                r: "Du lässt die Schokolade professionell in deiner Tasche verschwinden. Niemand hat etwas gesehen. Ein exzellenter Beutezug." 
            },
            { 
                t: "Einen Post-it drangeben: 'Für alle?'", 
                next: "path_choc_share", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du bist sozial. Du klebst einen Zettel dran. Mal sehen, wie lange das gut geht." 
            },
            { 
                t: "Ignorieren. Bestimmt eine Falle.", 
                next: "path_choc_ignore", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Das ist bestimmt ein Sozial-Experiment von HR. Du machst dir deinen Kaffee und verschwindest." 
            }
        ]
    },
    {
        id: "cof_swiss_choc_2a",
		char: "Frau Elster",
        title: "Der Süßwaren-Dieb",
        reqStory: "path_choc_steal",
        text: "Frau Elster hängt einen weinerlichen Zettel an die Küchentür: 'Wer hat meine Diät-Ausnahme-Schokolade gestohlen? Ich bin zutiefst enttäuscht von diesem Team!'",
        opts: [
            { 
                t: "Mitleid heucheln", 
                rep: { "Frau Elster": 5 },
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du liest den Zettel und schüttelst theatralisch den Kopf über so viel Dreistigkeit. Die Schokolade in deinem Rucksack oder Magen wiegt plötzlich sehr schwer." 
            },
            { 
                t: "Die Reinigungskraft beschuldigen", 
                rep: { "Frau Elster": 5 },
                m: 5, f: 5, a: 0, c: 5, 
                r: "'Wahrscheinlich war das die Putzfirma', flüsterst du ihr zu. Sie nickt wütend. Abgründiges Karma, aber du bist fein raus." 
            }
        ]
    },
    {
        id: "cof_swiss_choc_2b",
        title: "Raubtierfütterung",
        reqStory: "path_choc_share",
        text: "Dein Zettel 'Für alle?' hat ein Blutbad angerichtet. Die Platte war in Sekunden weg. Azubi Kevin hat Bauchschmerzen, weil er fast alles allein gegessen hat. Frau Elster sucht wütend nach ihrer Schokolade.",
        opts: [
            { 
                t: "Kevin verteidigen", 
                rep: { "Kevin": 5, "Frau Elster": -5 },
                m: 5, f: -5, a: 5, c: 0, 
                r: "'Wer seinen Namen nicht draufschreibt, ist selbst schuld!', blockst du ab. Kevin sieht dich an wie einen Superhelden." 
            },
            { 
                t: "Kevin lautstark verpfeifen", 
                rep: { "Kevin": -5, "Frau Elster": 5 },
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du richtest Frau Elsters Zorn elegant auf Kevin. Er muss in die Ecke und sich schämen. Du wäschst deine Hände in Unschuld." 
            }
        ]
    },
    {
        id: "cof_swiss_choc_2c",
        title: "Ablaufdatum",
        reqStory: "path_choc_ignore",
        text: "Die Schokolade lag drei Tage lang unberührt auf der Mikrowelle. Inzwischen ist sie geschmolzen und wieder hart geworden. Egon kratzt den braunen Fleck genervt ab.",
        opts: [
            { 
                t: "Mit anpacken und abkratzen", 
                rep: { "Egon": 10 },
                m: 10, f: -5, a: 5, c: 0, 
                r: "Du holst einen Spachtel und hilfst ihm. Gemeinsames Putzen schweißt zusammen." 
            },
            { 
                t: "Egon für seine Putzarbeit loben", 
                rep: { "Egon": 5 },
                m: 2, f: 5, a: -5, c: 5, 
                r: "'Gute Arbeit, Egon.' Er grummelt nur unverständlich zurück, aber tief drinnen freut er sich." 
            }
        ]
    },
    {
        id: "cof_stolen_sandwich_1",
        title: "Kühlschrank-Mafia",
        text: "Du öffnest den Kühlschrank für etwas Milch. Darin lacht dich ein perfekt belegtes Pastrami-Sandwich an. Darauf klebt ein passiv-aggressiver Zettel: 'Finger weg! Eigentum von Markus (Sales)!!!'",
        opts: [
            { 
                t: "Das Sandwich konfiszieren", 
                loot: "sandwich", 
                next: "path_sandwich_steal", 
                m: 2, f: -5, a: 0, c: 5, 
                r: "Sales verdient eh zu viel. Du nimmst das Sandwich. Es gehört jetzt zur IT-Infrastruktur." 
            },
            { 
                t: "Nur den Zettel austauschen", 
                next: "path_sandwich_prank", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du streichst 'Markus' durch und schreibst 'Egon' drauf. Das wird heute noch extrem lustig." 
            },
            { 
                t: "Ignorieren und Milch nehmen", 
                next: "path_sandwich_leave", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du mischst dich nicht in die Kühlschrank-Kriege ein. Du nimmst die Milch und gehst." 
            }
        ]
    },
    {
        id: "cof_stolen_sandwich_2a",
		char: "Markus",
        title: "Der hungrige Wolf",
        reqStory: "path_sandwich_steal",
        text: "Markus brüllt im Flur. 'WER WAR AN MEINEM PASTRAMI?! ICH HABE EINEN LOW-BLOOD-SUGAR-CRASH! MEINE DEALS PLATZEN!' Er sieht aus, als würde er gleich weinen.",
        opts: [
            { 
                t: "Einen alten Donut opfern", 
                rem: "donut", 
                rep: { "Markus": 5 },
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du reichst ihm gnädig deinen alten Donut. Er isst ihn hastig. 'Danke Müller. Du bist mein Retter.' Dein Gewissen ist rein gewaschen." 
            },
            { 
                t: "Schweigend zusehen, wie er leidet", 
                rep: { "Markus": -5 },
                m: 2, f: 0, a: 5, c: 0, 
                r: "Das Pastrami in deinem Magen war wirklich exzellent. Du sagst kein Wort und genießt die Show." 
            }
        ]
    },
    {
        id: "cof_stolen_sandwich_2b",
		char: "Markus",
        title: "Der Namens-Krieg",
        reqStory: "path_sandwich_prank",
        text: "Markus und Egon stehen sich in der Teeküche gegenüber. Egon beißt gerade herzhaft in das Pastrami-Sandwich. 'Da stand mein Name drauf, Anzugträger!' sagt Egon schmatzend. Markus schnappt nach Luft.",
        opts: [
            { 
                t: "Die Popcorn-Mentalität genießen", 
                m: 10, f: 10, a: -15, c: 10, 
                r: "Du lehnst dich an den Türrahmen und siehst dem eskalierenden Streit zu. Das ist weitaus besser als jede Netflix-Serie." 
            },
            { 
                t: "Dazwischengehen und auflösen", 
                rep: { "Markus": 5, "Egon": 5 },
                m: 5, f: -5, a: 10, c: 0, 
                r: "Du beendest den Prank. Beide schauen dich fassungslos an. 'IT-Humor', murmelst du und verschwindest schnell." 
            }
        ]
    },
    {
        id: "cof_stolen_sandwich_2c",
		char: "Markus",
        title: "Verdorben",
        reqStory: "path_sandwich_leave",
        text: "Markus war gestern außer Haus. Das sündhaft teure Sandwich liegt heute immer noch im Kühlschrank. Das Brot ist komplett aufgeweicht und sieht grau aus.",
        opts: [
            { 
                t: "Das eklige Ding heimlich entsorgen", 
                m: 5, f: -5, a: 5, c: -5, 
                r: "Du opferst dich für die Hygiene der Teeküche und wirfst es weg. Niemand dankt es dir, aber der Geruch ist weg." 
            },
            { 
                t: "Markus per Mail auslachen", 
                rep: { "Markus": -5 },
                m: 2, f: 0, a: -5, c: 0, 
                r: "Du schreibst ihm eine Mail: 'Dein Sandwich mutiert gerade.' Er antwortet nur mit einem weinenden Smiley." 
            }
        ]
    },
    {
        id: "cof_grinder_1",
        title: "Ohrenbetäubend",
        text: "Die teure Kaffeemaschine mahlt die Bohnen heute mit einem Geräusch, das an einen startenden Düsenjet erinnert. Die Vibrationen lassen die Tassen im Schrank klappern. Irgendwas im Mahlwerk klemmt gewaltig.",
        opts: [
            { 
                t: "Einen beherzten Schlag verpassen", 
                next: "path_grinder_hit", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "BAM. Du haust mit der flachen Hand gegen die Seite. Das Kreischen stoppt sofort. Die Maschine schnurrt wieder. Gewalt ist doch eine Lösung." 
            },
            { 
                t: "Maschine ausschalten & Ticket bei HR eröffnen", 
                next: "path_grinder_ticket", 
                m: 5, f: -5, a: 10, c: 5, 
                r: "Du ziehst den Stecker und hängst ein 'DEFEKT'-Schild auf. Die halbe Abteilung mustert dich, als hättest du gerade Weihnachten abgesagt." 
            },
            { 
                t: "Mit Ohren zuhalten durchziehen", 
                next: "path_grinder_endure", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du lässt sie schreien, bis dein Kaffee durch ist. Du hast einen leichten Tinnitus, aber du hast deinen Kaffee." 
            }
        ]
    },
    {
        id: "cof_grinder_2a",
        title: "Der Mechaniker",
        reqStory: "path_grinder_hit",
        text: "Dein Schlag hat die Maschine zwar beruhigt, aber jetzt ist die Seitenverkleidung komplett lose und klappert nervtötend im Rhythmus des Pumpendrucks.",
        opts: [
            { 
                t: "Das Klappern ignorieren", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Wer braucht schon Stille im Büro? Du nimmst deinen Kaffee und lässt die Maschine scheppernd zurück." 
            },
            { 
                t: "Mit Panzertape flicken", 
                req: "tape", 
                m: 5, f: -5, a: -10, c: -5, 
                r: "Zwei dicke silberne Streifen Tape lösen das Problem. Sieht nach Baustelle aus, aber die Akustik ist gerettet." 
            }
        ]
    },
    {
        id: "cof_grinder_2b",
        title: "Der Kaffee-Aufstand",
        reqStory: "path_grinder_ticket",
        text: "Die Maschine steht weiter still. Im Flur hat sich eine wütende Traube von Mitarbeitern gebildet. Die Stimmung ist extrem feindselig. Jemand flüstert: 'Die IT hat das Ding kaputt gemacht.'",
        opts: [
            { 
                t: "Sich ergeben und löslichen Kaffee kochen", 
                m: 15, f: -5, a: 10, c: -10, 
                r: "Du kramst das alte Pulver hervor. Es schmeckt wie feuchte Erde, aber es stoppt die drohende Meuterei der Belegschaft." 
            },
            { 
                t: "Flüchten und sich im Büro einschließen", 
                m: 5, f: 5, a: 0, c: 10, 
                r: "Du flüchtest ins Büro und drehst den Schlüssel um. Lass die Kaffeesüchtigen sich doch gegenseitig auffressen." 
            }
        ]
    },
    {
        id: "cof_grinder_2c",
        title: "Explosion",
        reqStory: "path_grinder_endure",
        text: "Du hättest die Maschine nicht gewaltsam weiterlaufen lassen dürfen. Das Mahlwerk ist kurz darauf mit einem lauten Knall geplatzt. Kaffeepulver klebt bis an die Decke.",
        opts: [
            { 
                t: "Sich unauffällig vom Tatort entfernen", 
                m: 5, f: 5, a: 0, c: 10, 
                r: "Du machst kommentarlos kehrt. Wer das aufräumt, wird definitiv keinen Spaß haben." 
            },
            { 
                t: "Egon per Eil-Ticket rufen", 
                rep: { "Egon": -5 },
                m: 5, f: 0, a: 5, c: -5, 
                r: "Du rufst den Hausmeister. Egon sieht das Pulver an der Decke und verliert jeglichen Glauben an die Menschheit." 
            }
        ]
    },
    {
        id: "cof_workout_2a",
		char: "Chantal",
        title: "Muskelkater",
        reqStory: "path_workout_join",
        text: "Du schleppst dich zur Kaffeemaschine. Der 90-minütige Pilates-Kurs auf dem Boden fordert Tribut. Du kannst deine Arme vor Schmerzen kaum heben, um nach dem Becher zu greifen. Chantal steht superfit und frisch daneben.",
        opts: [
            { 
                t: "Sie bitten, dir den Kaffee zu reichen", 
                rep: { "Chantal": 10 },
                m: 5, f: 5, a: -5, c: 0, 
                r: "Chantal lacht. 'Haha, Anfänger! Aber du hast Potenzial.' Sie gibt dir den Becher. Du hast eine Freundin gewonnen, auch wenn du dich wie 80 Jahre alt fühlst." 
            },
            { 
                t: "Unter Schmerzen selbst zapfen", 
                m: 5, f: 0, a: 15, c: 0, 
                r: "Du presst die Zähne zusammen und hebst zitternd den Arm. Jeder Muskel brennt. Der Kaffee ist verdient wie selten, aber deine Arme zittern noch eine Stunde nach." 
            }
        ]
    },
    {
        id: "cof_dance_1",
        title: "Smooth Criminal",
        text: "Du holst dir einen Kaffee. Der Raum ist leer. Du hast einen absoluten Ohrwurm von 'Billie Jean' und lässt dich treiben. Du ziehst einen perfekten Moonwalk ab, greifst in den Schritt und machst eine wilde Drehung. Als du die Augen aufmachst, starrst du direkt in eine laufende Kameralinse. Der Chef gibt dahinter gerade ein Live-Interview für den 'GlobalCorp Investor Day'.",
        opts: [
            { 
                t: "Völlige Panik: Sofort wegrennen", 
                next: "path_dance_flee", 
                m: 5, f: 0, a: 30, c: 10, 
                r: "Du reißt die Augen auf, kreischt leise und sprintest aus dem Bild. Ein unfassbar peinlicher Abgang, der jetzt für immer im Firmen-Archiv und im Internet steht." 
            },
            { 
                t: "Den Tanz souverän zu Ende bringen", 
                next: "path_dance_finish", 
                m: 10, f: 10, a: -10, c: 15, 
                r: "Wenn schon, denn schon! Du tippst dir an den imaginären Hut, gleitest rückwärts aus dem Bild und verschwindest cool. Die Investoren im Stream eskalieren vor Begeisterung." 
            },
            { 
                t: "Die Kameralinse mit dem Donut abdecken", 
                rem: "donut", 
                next: "path_dance_donut", 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Du drückst deinen klebrigen Donut in Panik direkt auf die sündhaft teure Linse des Kameramanns. Bild schwarz. Beweise (teilweise) vernichtet, Kameramann tobt." 
            }
        ]
    },

    {
    id: "cof_advent_july",
    title: "Vorfreude",
    text: "Chantal steht in der Küche vor einem geöffneten Karton mit Weihnachtsdeko. Es ist Juli.\n\n'Ich dachte, wir starten dieses Jahr mal FRÜH! Positive Energie im Team! Ich brauch nur jemanden, der die Lichterkette anbringt.'\n\nSie schaut dich an. Nur dich.",
    char: "Chantal",
    opts: [
        {
            t: "'Chantal. Es ist Juli.'",
            m: 5, f: 0, a: 5, c: 0,
            rep: { "Chantal": -10 },
            r: "'Und? Freude kennt keinen Kalender.' Sie sagt das ohne jede Ironie. Der Karton steht drei Wochen später immer noch da, halb ausgepackt, wie ein Mahnmal für gute Absichten."
        },
        {
            t: "Auf den Stuhl steigen und aufhängen.",
            loot: "zip_ties",
            m: 25, f: -10, a: 15, c: 0,
            rep: { "Chantal": 10 },
            r: "Zwanzig Minuten auf einem Bürostuhl balancierend. Die Kette hängt schief. Chantal ist begeistert. Du behältst die übrigen Kabelbinder — die braucht sie im Juli sicher nicht mehr."
        },
        {
            t: "'Ich brauche erstmal einen Hammer dafür.'",
            loot: "hammer",
            m: 10, f: 10, a: 0, c: 0,
            rep: { "Chantal": -5 },
            r: "Du holst einen Hammer aus dem Lager, kommst zurück, und Chantal ist in einem Meeting. Der Karton steht noch da. Der Hammer bleibt bei dir."
        }
    ]
},

/* ============================================================
   COFFEE WAVE (v4.0.0)
   Frau Elster and Dr. Wichtig were nearly invisible in the coffee
   pool (3 and 2 events), Markus had nothing but his crypto-clown
   reputation (+68/-117) - here he gets his vulnerable side.
   Interlocked with the server wave (TechniPlast). Short times, a
   lot of trading in anger - the pool stays the place to recover,
   but nothing in it is free any more.
   ============================================================ */

{
    id: "cof_elster_razzia",
    char: "Frau Elster",
    title: "Die Razzia",
    text: "Frau Elster steht mit Gummihandschuhen und einer Liste vor dem offenen Kühlschrank. Auf dem Tisch: eine Reihe von Behältern wie auf einer Anklagebank. 'Verfallsdaten-Kontrolle, Herr Müller. Und DAS hier', sie hebt einen Joghurt, 'ist mit Ihrem Namen beschriftet. Dreizehnter Juli.'",
    opts: [
        {
            t: "Den Joghurt heimlich evakuieren",
            next: "path_razzia_schmuggel",
            m: 5, f: 10, a: 0, c: 5,
            r: "Ein Ablenkungsmanöver ('Ist das da hinten Schimmel?'), ein schneller Griff, und der Joghurt steckt in deiner Jackentasche. Du hast soeben Lebensmittel vor der Buchhaltung gerettet. Jetzt musst du nur noch daran denken, dass er in deiner Tasche ist."
        },
        {
            t: "Schuldbewusst bei der Razzia helfen",
            loot: "chocolate",
            rep: { "Frau Elster": 5 },
            next: "path_razzia_helfen",
            m: 10, f: 0, a: 10, c: -5,
            r: "Du opferst den Joghurt und assistierst bei der Kontrolle. Zum Dank drückt sie dir eine konfiszierte, aber einwandfreie Tafel Schokolade in die Hand: 'MHD ist eine Empfehlung. Bei Schokolade.' Es ist das netteste, was sie je gesagt hat."
        },
        {
            t: "Den Joghurt verteidigen: 'Der lebt noch'",
            rep: { "Frau Elster": -5 },
            next: "path_razzia_protest",
            m: 5, f: 5, a: -5, c: 0,
            r: "'Joghurt IST Bakterienkultur, Frau Elster. Der wird nur besser.' Sie starrt dich an, als hättest du das Finanzamt beleidigt. Der Joghurt wandert trotzdem in den Müll. Aber du hast Haltung gezeigt, und das wird Folgen haben."
        }
    ]
},
{
    id: "cof_elster_razzia_2a",
    title: "Das Artefakt",
    reqStory: "path_razzia_helfen",
    text: "Ganz hinten im untersten Fach findet ihr es: einen beschlagenen Behälter ohne Beschriftung. Frau Elster hält ihn mit ausgestrecktem Arm ins Licht. 'Der stand schon hier, als ich angefangen habe.' Sie hat 2019 angefangen. Ihr schaut euch an.",
    opts: [
        {
            t: "Ungeöffnet in doppelter Tüte entsorgen",
            m: 5, f: 5, a: 5, c: 0,
            r: "Manche Wahrheiten gehören in zwei Tüten und dann in die Restmülltonne auf dem Hof. Ihr tragt den Behälter gemeinsam hinaus, würdevoll wie bei einer Seebestattung. Was darin war, bleibt für immer Theorie."
        },
        {
            t: "Egon übergeben - der kennt sowas",
            rep: { "Egon": 3 },
            m: 5, f: 5, a: -10, c: 0,
            r: "Egon betrachtet den Behälter, schüttelt ihn kurz und nickt: 'Kenn ich. Der is von Krause. Der is 2016 gegangen.' Er nimmt ihn mit in den Keller. Du fragst nicht, ob in Raum K3 ein Fach für sowas existiert. Es existiert."
        },
        {
            t: "Öffnen. Jemand muss es tun.",
            m: 5, f: 0, a: 15, c: 0,
            r: "Der Deckel löst sich mit einem Zischen, das nicht von dieser Welt ist. Der Geruch erreicht Ecken der Küche, die nie ein Geruch erreicht hat. Frau Elster reißt das Fenster auf. Ihr sprecht nie wieder darüber. Es gibt Dinge zwischen euch jetzt."
        }
    ]
},
{
    id: "cof_elster_razzia_2b",
    title: "Die Liste",
    reqStory: "path_razzia_protest",
    text: "Am Kühlschrank hängt ein neuer Aushang: 'Säumige Lebensmittel und ihre Halter'. Ein Name steht darauf. Deiner. Daneben, in Klammern und Elsters akkurater Handschrift: '(uneinsichtig)'.",
    opts: [
        {
            t: "Entschuldigen und Frieden schließen",
            rep: { "Frau Elster": 5 },
            m: 10, f: 0, a: 5, c: 0,
            r: "Du bringst ihr einen frischen Joghurt mit heutigem Datum als Friedensangebot. Sie prüft das MHD, nickt und nimmt deinen Namen von der Liste. 'Einsicht', sagt sie, 'ist der erste Schritt zur Ordnung.'"
        },
        {
            t: "Formellen Widerspruch einlegen",
            rep: { "Frau Elster": -3 },
            m: 15, f: -5, a: 10, c: 0,
            r: "Du verfasst einen Widerspruch mit Betreff, Aktenzeichen und Fußnoten. Frau Elster liest ihn zweimal und heftet ihn ab - in einen Ordner namens 'Vorgänge M.' Dass dieser Ordner existiert, hättest du gern nicht gewusst. Aber der Widerspruch läuft."
        },
        {
            t: "Den Aushang 'verlieren'",
            m: 2, f: 10, a: 0, c: 5,
            r: "Der Aushang fällt tragisch hinter den Kühlschrank, wo das Reinigungspersonal seit 2015 nicht hinkommt. Frau Elster wird das Fehlen bemerken. Frau Elster bemerkt alles. Die Frage ist nur, was Version zwei der Liste enthalten wird."
        }
    ]
},
{
    id: "cof_elster_razzia_2c",
    title: "Der Flüchtling",
    reqStory: "path_razzia_schmuggel",
    text: "Ein süßlicher Geruch weht durchs Büro. Die Quelle: deine Jacke. Der evakuierte Joghurt hat den Druck der Freiheit nicht ausgehalten und sich in deiner Innentasche entfaltet. Großflächig.",
    opts: [
        {
            t: "Die Jacke einfach zulassen",
            m: 2, f: 10, a: 0, c: 5,
            r: "Reißverschluss zu, Problem versiegelt. Du riechst jetzt dezent nach Erdbeer-Vanille mit einer Kopfnote von Verwesung. Kollegen halten beim Vorbeigehen unauffällig die Luft an. Der Chef hat heute noch einen Termin mit dir."
        },
        {
            t: "Die Jacke Kevin 'vererben'",
            rep: { "Kevin": -5 },
            m: 5, f: 10, a: 0, c: 0,
            r: "'Kevin, die ist mir zu klein. Willst du?' Kevin strahlt und zieht sie sofort an. Der Geruch erreicht ihn nach exakt vier Minuten. Er trägt sie trotzdem weiter, aus Stolz. Du bist offiziell ein schlechter Mensch."
        },
        {
            t: "Großreinigung der Jacke",
            m: 15, f: -5, a: 10, c: 0,
            r: "Fünfzehn Minuten mit Spülmittel und Papierhandtüchern am Waschbecken. Die Jacke überlebt, dein Stolz nicht ganz. Der Joghurt hat am Ende doch gewonnen. Frau Elster hätte ihre Freude an dieser Pointe."
        }
    ]
},

{
    id: "cof_ceo_maschine",
    char: "Dr. Wichtig",
    title: "Das Übliche",
    text: "Dr. Wichtig steht ratlos vor der Kaffeemaschine. 'Müller. Diese Maschine hat zwei Knöpfe. Im Vorstand haben wir eine mit vierzehn. Machen Sie mir das, was ich immer trinke.' Du weißt nicht, was er immer trinkt. Niemand weiß das. Vermutlich nicht einmal er.",
    opts: [
        {
            t: "Eine Barista-Show abziehen",
            rep: { "Dr. Wichtig": 5 },
            next: "path_ueblich_show",
            m: 15, f: 10, a: 5, c: 0,
            r: "Du schäumst Milch im Wasserkocher auf, klopfst fachmännisch gegen die Tasse und servierst 'einen Flat White nach Melbourne-Art'. Es ist Knopf 1 mit Schaum. Dr. Wichtig ist begeistert. Zu begeistert. Das wird er wieder wollen."
        },
        {
            t: "Knopf 1 drücken und souverän servieren",
            rep: { "Dr. Wichtig": 3 },
            next: "path_ueblich_bluff",
            m: 2, f: 5, a: 0, c: -5,
            r: "Du drückst Knopf 1 und reichst die Tasse mit der Miene eines Sommeliers. Er nippt. 'Exakt richtig.' Es war Knopf 1. Es ist immer Knopf 1. Diese Information ist jetzt dein Kapital."
        },
        {
            t: "Ehrlich fragen, was er denn trinkt",
            rep: { "Dr. Wichtig": -3 },
            next: "path_ueblich_frage",
            m: 5, f: 0, a: 5, c: 5,
            r: "'Das... Übliche. Mit der Crema-Signatur.' Er wird sichtlich ungeduldig - Führungskräfte erklären nicht, sie erwarten. Du drückst irgendeinen Knopf. Er trinkt wortlos und geht. Das war kein Bestehen des Tests."
        }
    ]
},
{
    id: "cof_ceo_maschine_2a",
    title: "Kaffee-Briefing 9:15",
    reqStory: "path_ueblich_bluff",
    text: "In deinem Kalender steht ein neuer Serientermin: 'Kaffee-Briefing mit Dr. W., täglich 9:15, Küche'. Eingeladen: du. Agenda: keine. Du bist jetzt offenbar der offizielle Übersetzer zwischen dem Chef und Knopf 1.",
    opts: [
        {
            t: "Eine Thermoskanne 'kalibrieren'",
            m: 15, f: -5, a: -10, c: -5,
            r: "Du deponierst jeden Morgen eine vorbereitete Thermoskanne mit dem Etikett 'DAS ÜBLICHE - KALIBRIERT'. Dr. Wichtig ist tief beeindruckt von der Prozessoptimierung. Der Termin verschwindet aus dem Kalender, die Legende bleibt."
        },
        {
            t: "Den Termin einfach hinnehmen",
            rep: { "Dr. Wichtig": 3 },
            m: 10, f: 0, a: 10, c: -5,
            r: "Jeden Morgen zehn Minuten Kaffee reichen und Smalltalk über 'Visionen'. Es ist absurd, aber es ist auch die kürzeste Verbindung zum Chef, die je ein Admin hatte. Man munkelt, Markus wäre neidisch auf den Termin."
        },
        {
            t: "Gabi einweihen und übergeben",
            rep: { "Gabi": 5 },
            m: 5, f: 5, a: 0, c: 5,
            r: "Gabi hört sich das Geheimnis von Knopf 1 an und lächelt milde: 'Ich mach das seit Jahren mit seinem Tee.' Ab morgen übernimmt der Empfang das Briefing. Dr. Wichtig bemerkt den Unterschied nicht. Natürlich nicht."
        }
    ]
},
{
    id: "cof_ceo_maschine_2b",
    title: "Vierzehn Knöpfe",
    reqStory: "path_ueblich_frage",
    text: "Vor der Küche steht eine Palette. Dr. Wichtig hat 'zur Behebung des Kompetenzgefälles' die Vorstandsmaschine bestellen lassen: vierzehn Knöpfe, sieben Sprachen, ein Touchdisplay. Frau Elster steht daneben und hält eine Rechnung wie eine Kriegserklärung.",
    opts: [
        {
            t: "Die Maschine heimlich 'vereinfachen'",
            m: 10, f: 10, a: 0, c: 5,
            r: "Du konfigurierst alle vierzehn Knöpfe auf dasselbe Getränk: Knopf 1 der alten Maschine. Die Kollegen schwärmen von der 'Konsistenz auf Vorstandsniveau'. Sollte je ein Techniker die Konfiguration auslesen, wirst du Erklärungsbedarf haben."
        },
        {
            t: "Frau Elster die Rechnung erklären müssen",
            rep: { "Frau Elster": -3 },
            m: 10, f: 0, a: 10, c: 0,
            r: "'VIERTAUSEND Euro, Herr Müller. Für KAFFEE.' Du erklärst, dass du nur eine Frage gestellt hast. Frau Elster notiert etwas in ihrem kleinen Buch. Verursachungsprinzip: Die Rechnung mag der Chef bestellt haben, aber die Frage kam von dir."
        },
        {
            t: "Alle Kollegen einweisen",
            m: 20, f: 0, a: 10, c: -5,
            r: "Zwanzig Minuten Schulung, vierzehn Knöpfe, null Verständnis. Am Ende trinken trotzdem alle 'Café Crème', weil das der erste Knopf ist. Aber die Einweisung ist dokumentiert, und dokumentiert schlägt sinnvoll. Immer."
        }
    ]
},
{
    id: "cof_ceo_maschine_2c",
    title: "Der Vorstands-Barista",
    reqStory: "path_ueblich_show",
    text: "Eine Mail vom Vorstandssekretariat: 'Dr. Wichtig wünscht für das Board-Meeting am Nachmittag Ihre Kaffee-Spezialitäten (Melbourne-Art) für acht Personen.' Es gibt keine Melbourne-Art. Es gibt Knopf 1 und einen Wasserkocher.",
    opts: [
        {
            t: "Chantal ein 'Event' daraus machen lassen",
            rep: { "Chantal": 5 },
            m: 10, f: 5, a: 0, c: 5,
            r: "Chantal übernimmt mit Feuereifer: Sie nennt es 'Coffee Experience', druckt Menükarten und stellt eine Duftkerze auf. Der Kaffee ist immer noch Knopf 1. Die Bewertung des Meetings: 'bestes Catering seit Jahren'. Marketing funktioniert."
        },
        {
            t: "'Ich bin Admin, kein Barista.'",
            rep: { "Dr. Wichtig": -5 },
            m: 5, f: 0, a: 5, c: 5,
            r: "Deine höfliche Absage wird im Sekretariat 'zur Kenntnis genommen'. Dr. Wichtig erwähnt beim nächsten Vorbeigehen beiläufig, dass 'Servicebereitschaft ein Führungskriterium' sei. Du bist keine Führungskraft. Eben, sagt sein Blick."
        },
        {
            t: "Das Catering durchziehen",
            rep: { "Dr. Wichtig": 5 },
            m: 25, f: 10, a: 10, c: 0,
            r: "Acht Tassen Knopf 1, acht Hauben Wasserkocher-Schaum, ein improvisiertes Tablett. Der Vorstand ist entzückt, einer fragt nach der 'Bohnen-Provenienz'. Du sagst 'Single Origin, Automat drei'. Niemand lacht. Alle nicken."
        }
    ]
},

{
    id: "cof_entkalken",
    title: "ENTKALKEN",
    text: "Die Kaffeemaschine zeigt in roten Großbuchstaben: 'ENTKALKEN'. Sie verweigert jede weitere Ausgabe. In zwanzig Minuten beginnt die Frühstückspause, und dann steht hier eine Menschenmenge mit leeren Tassen und schwindender Geduld. Du kennst diese Menge. Du fürchtest diese Menge.",
    opts: [
        {
            t: "Ordnungsgemäß entkalken",
            next: "path_kalk_pflege",
            m: 20, f: -5, a: 10, c: -5,
            r: "Entkalker ansetzen, Programm starten, drei Spülgänge abwarten - während draußen die ersten Tassen klirren. Aber die Maschine läuft danach wie am ersten Tag. Vielleicht sogar etwas zu gut."
        },
        {
            t: "Den Knopf halten, bis die Meldung verschwindet",
            next: "path_kalk_ignor",
            m: 2, f: 10, a: 0, c: 5,
            r: "Acht Sekunden Knopf halten, Meldung weg, Maschine läuft. Ein Trick, den dir mal ein Servicetechniker gezeigt hat - mit den Worten 'aber nur im Notfall'. Es ist jetzt jedes Mal ein Notfall. Der Kalk sammelt Zinsen."
        },
        {
            t: "Mit Küchen-Essig improvisieren",
            next: "path_kalk_essig",
            m: 10, f: 5, a: 5, c: 0,
            r: "Kein Entkalker im Haus, aber Essig-Essenz aus dem Putzschrank. Die Maschine gurgelt beleidigt, läuft aber wieder. Der erste Kaffee danach hat eine Kopfnote, die man höflich als 'Vinaigrette' beschreiben könnte."
        }
    ]
},
{
    id: "cof_entkalken_2a",
    title: "Zu gut gewartet",
    reqStory: "path_kalk_pflege",
    text: "Die entkalkte Maschine läuft mit dem Druck ihrer Jugend - und dosiert deutlich stärker als in den letzten drei Jahren. Die halbe Firma ist überkoffeiniert. Chantal hat seit elf Uhr vier Meetings angesetzt, Kevin spricht ausschließlich in Ausrufezeichen.",
    opts: [
        {
            t: "Laufen lassen - Produktivität!",
            m: 2, f: 10, a: 0, c: 5,
            r: "Die Firma vibriert. Die Ticketzahlen sinken, die Lautstärke steigt, jemand hat gerade das Treppenhaus gebohnert, freiwillig. Das kann unmöglich gesund enden, aber bis dahin ist es beeindruckend anzusehen."
        },
        {
            t: "Ein Warnschild aufstellen",
            m: 5, f: 5, a: 5, c: 0,
            r: "'ACHTUNG: STARK. Dosierung beachten.' Das Schild wird fotografiert, in drei Chatgruppen geteilt und komplett ignoriert. Aber es hängt da. Im Zweifel hast du gewarnt, und 'im Zweifel gewarnt' ist die halbe Miete in dieser Firma."
        },
        {
            t: "Die Dosierung sanft runterregeln",
            m: 10, f: -5, a: -5, c: 0,
            r: "Du stellst die Maschine schrittweise zurück auf das gewohnte Niveau von 'braunem Wasser mit Absichten'. Die Firma beruhigt sich im Lauf des Nachmittags. Niemand dankt dir. Niemand weiß überhaupt, was du verhindert hast."
        }
    ]
},
{
    id: "cof_entkalken_2b",
    title: "Der Maschinensturz",
    reqStory: "path_kalk_ignor",
    text: "Es ist passiert: Die Maschine ist mitten im Bezug verstummt. Endgültig, mit einem letzten Rasseln, das nach Kalk und Vorwurf klang. Vor ihr bildet sich eine Schlange. Kevin hat seinen Rucksack geöffnet und flüstert: 'Ich hätte da Instant. Fünfzig Cent der Becher.'",
    opts: [
        {
            t: "Einen Zettel hinhängen: 'DEFEKT - Techniker informiert'",
            m: 2, f: 10, a: 5, c: 5,
            r: "Der Zettel ist geduldig, die Schlange nicht. Es ist kein Techniker informiert - der Zettel IST die Maßnahme. Die Kollegen pilgern murrend zur Tankstelle gegenüber. Irgendwer wird fragen, wann der Techniker denn kommt. Täglich."
        },
        {
            t: "Notoperation an der Maschine",
            m: 20, f: -5, a: 15, c: -5,
            r: "Du zerlegst den Brühkopf vor Publikum. Der Kalkbrocken, den du herausoperierst, hat die Größe einer Walnuss und wird von der Schlange mit ehrfürchtigem Raunen quittiert. Die Maschine lebt wieder. Du bist für heute ein Held. Für heute."
        },
        {
            t: "Kevins Instant-Imperium dulden",
            rep: { "Kevin": 3 },
            m: 5, f: 10, a: 0, c: 5,
            r: "Kevin macht das Geschäft seines Lebens. Er hat Wechselgeld, einen Wasserkocher und ab der zweiten Stunde ein Treueprogramm ('Der zehnte Becher gratis'). Der Kaffee ist furchtbar. Der Unternehmergeist ist es nicht."
        }
    ]
},
{
    id: "cof_entkalken_2c",
    title: "Vinaigrette",
    reqStory: "path_kalk_essig",
    text: "Der Essig hält sich hartnäckiger als geplant. Auch der fünfte Kaffee des Tages schmeckt nach Salatdressing, und die Beschwerden werden kreativer. Chantal hingegen hat eine Story gepostet: 'Unser Office macht jetzt DETOX-Kaffee! So clean!' Vierzig Likes.",
    opts: [
        {
            t: "Gründlich nachspülen, bis es vorbei ist",
            m: 15, f: -5, a: -10, c: 0,
            r: "Sechs Spülgänge, zwei Kannen Frischwasser, ein Opfer-Espresso zur Probe. Der Essig kapituliert. Der Kaffee schmeckt wieder nach Kaffee, also nach fast nichts, und alle sind zufrieden. Normalität ist unterschätzt."
        },
        {
            t: "Chantals Detox-Framing unterstützen",
            rep: { "Chantal": 5 },
            m: 5, f: 10, a: 0, c: 0,
            r: "Du bestätigst auf Nachfrage 'ja, Apfelessig-Infusion, sehr angesagt'. Chantal verlinkt dich als 'unseren Wellness-Admin'. Drei Kollegen trinken jetzt ÜBERZEUGT davon. Der Essig verfliegt von selbst, die Legende nicht."
        },
        {
            t: "Es zur Premium-Innovation erklären",
            m: 5, f: 10, a: 0, c: 5,
            r: "'Cold-Brew-Cleansing-Zyklus, läuft noch bis Freitag.' Die Beschwerden verstummen - gegen Innovation kann man sich in dieser Firma nicht beschweren, das wäre ja rückständig. Sollte Dr. Wichtig davon Wind bekommen, will er es ins Portfolio aufnehmen."
        }
    ]
},

{
    id: "cof_markus_termin",
    char: "Markus",
    title: "Elf Uhr",
    text: "Markus steht untypisch still an der Kaffeemaschine und rührt seit Minuten in einer leeren Tasse. 'Müller. Heute, elf Uhr. TechniPlast, Vorstandspräsentation. Wenn das klappt, ist das Quartal gerettet.' Kein 'Zeit ist Geld', kein Alpha-Gehabe. Er sieht zum ersten Mal aus wie jemand, der nicht an sich glaubt.",
    opts: [
        {
            t: "Den Pitch anhören und mitschärfen",
            rep: { "Markus": 10 },
            next: "path_lampen_coach",
            m: 20, f: 10, a: 5, c: 0,
            r: "Er pitcht dir die Präsentation, du reparierst die Technik-Folien: aus 'unendlich skalierbar' wird 'skalierbar', aus 'militärische Verschlüsselung' wird 'Stand der Technik'. Markus hört zu. Wirklich zu. Zwanzig Minuten deiner Arbeitszeit, gut angelegt. Wahrscheinlich."
        },
        {
            t: "'Wird schon schiefgehen'",
            rep: { "Markus": -3 },
            next: "path_lampen_floskel",
            m: 2, f: 5, a: 0, c: 0,
            r: "Die Floskel fällt zu Boden wie ein nasser Lappen. Markus nickt mechanisch: 'Ja. Klar. Wird schon.' Er nimmt seinen Kaffee und geht. Du hättest zwei Minuten investieren können. Du hast zwei Wörter investiert."
        },
        {
            t: "Einen Glücks-Kaffee brühen: Knopf 2",
            rep: { "Markus": 5 },
            next: "path_lampen_kaffee",
            m: 5, f: 0, a: -5, c: 0,
            r: "'Knopf 2, doppelte Crema. Den trinken hier nur Leute, die gewinnen.' Kompletter Unsinn, aber Markus umklammert die Tasse wie einen Talisman. 'Knopf 2', wiederholt er ernst. Rituale schlagen Wahrheit, immer schon."
        }
    ]
},
{
    id: "cof_markus_termin_2a",
    title: "Der Technik-Mann",
    reqStory: "path_lampen_coach",
    text: "Gebrüll aus dem Flur, aber diesmal das gute: 'ABSCHLUSS! TechniPlast hat unterschrieben!' Markus fegt in die Küche, deutet auf dich und verkündet der versammelten Frühstücksrunde: 'MEIN Technik-Mann! Ohne den wär das nichts geworden!' Alle schauen dich an.",
    opts: [
        {
            t: "Frech eine Provision fordern",
            rep: { "Markus": 5 },
            m: 5, f: 5, a: -5, c: 0,
            r: "'Zwei Prozent, Markus.' Er starrt dich an - dann bricht er in dröhnendes Gelächter aus: 'VERHANDELN! Ich hab dich gut erzogen!' Es gibt keine zwei Prozent. Es gibt einen Kaffee aufs Haus und seinen Respekt. Letzterer ist seltener."
        },
        {
            t: "Den Ruhm annehmen",
            rep: { "Markus": 5 },
            m: 5, f: 0, a: 5, c: -5,
            r: "Du nimmst den Applaus mit einem Nicken entgegen. 'Technik-Mann' ist ab jetzt dein Titel im Vertrieb - was bedeutet: Der Vertrieb hat ab jetzt deine Durchwahl. Ruhm ist in dieser Firma nur ein anderes Wort für Erreichbarkeit."
        },
        {
            t: "Klarstellen, dass das einmalig war",
            rep: { "Markus": -3 },
            m: 5, f: 0, a: 5, c: 0,
            r: "'Einmalig, Markus. Ich hab auch einen Job.' Er winkt großzügig ab: 'Klar, klar. Einmalig.' Ihr wisst beide, dass er in zwei Wochen wieder an der Maschine steht. Aber die Grenze ist gezogen, fürs Protokoll."
        }
    ]
},
{
    id: "cof_markus_termin_2b",
    title: "Nicht sein Tag",
    reqStory: "path_lampen_floskel",
    text: "Markus kommt am Nachmittag zurück, die Krawatte gelockert, die Schultern tief. 'Vertagt. Die wollen nochmal drüber schlafen.' Er setzt sich auf die Küchenzeile, was er sonst nie tut. 'Ich hab beim Technik-Teil geschwommen, Müller. Richtig geschwommen.'",
    opts: [
        {
            t: "Anbieten, das Feedback zu analysieren",
            rep: { "Markus": 5 },
            m: 15, f: -5, a: 5, c: 0,
            r: "Ihr geht das Kundenfeedback gemeinsam durch. Die Einwände sind fast alle technisch - und fast alle lösbar. Markus macht sich Notizen, echte, auf Papier. 'Vertagt heißt nicht verloren', sagt er beim Gehen. Es klingt schon wieder fast wie er."
        },
        {
            t: "Kaffee ausgeben und zuhören",
            rep: { "Markus": 10 },
            m: 15, f: 5, a: -5, c: 0,
            r: "Du drückst ihm einen Kaffee in die Hand und hörst zu. Eine Viertelstunde lang ist Markus kein Vertriebler, sondern ein Mensch mit Selbstzweifeln und einer Tochter, die BWL studiert. Am Ende steht er auf: 'Nächstes Mal machst du die Technik-Folien.' Es klingt nicht wie ein Befehl. Es klingt wie eine Bitte."
        },
        {
            t: "'Beim nächsten Mal klappt's'",
            rep: { "Markus": -5 },
            m: 2, f: 5, a: 0, c: 0,
            r: "Die zweite Floskel des Tages. Markus schaut dich kurz an, und in diesem Blick liegt die exakte Buchführung darüber, wer da war, als es zählte, und wer Kalendersprüche verteilt hat. Er nickt und geht. Das Konto ist im Minus."
        }
    ]
},
{
    id: "cof_markus_termin_2c",
    title: "Der Glücksknopf",
    reqStory: "path_lampen_kaffee",
    text: "Der Deal ist durch, und Markus hat die Geschichte vom Glücks-Kaffee im ganzen Vertrieb erzählt. Seitdem drückt die komplette Abteilung ausschließlich Knopf 2. Vor jedem Kundentermin bildet sich eine kleine Prozession. Knopf 2 beginnt bereits, müde zu klemmen.",
    opts: [
        {
            t: "Chantal von 'Knopf 2' erzählen",
            rep: { "Chantal": 3 },
            m: 5, f: 5, a: 0, c: 5,
            r: "Chantal wittert Content und produziert einen Insta-Post: 'Der Erfolgs-Espresso - nur bei uns.' Es folgen Sticker, ein Hashtag und die Idee, Knopf 2 auf Firmenevents 'erlebbar zu machen'. Du hast einen Bürowitz in eine Marke verwandelt. Möge sie dir nie gehören."
        },
        {
            t: "Den Mythos beenden: Es ist nur Kaffee",
            rep: { "Markus": -3 },
            m: 5, f: 0, a: 5, c: 0,
            r: "'Das war ein Witz, Leute. Knopf 2 ist Knopf 1 mit mehr Wasser.' Betretenes Schweigen im Vertrieb. Markus schüttelt enttäuscht den Kopf: 'Manche Dinge zerredet man nicht, Müller.' Die Prozession geht trotzdem weiter. Nur ohne dich."
        },
        {
            t: "Den Mythos pflegen und den Knopf warten",
            m: 10, f: 5, a: -10, c: 0,
            r: "Du tauschst heimlich die Feder unter Knopf 2 und polierst ihn. Der Glaube braucht funktionierende Infrastruktur. Der Vertrieb hat dieses Quartal die besten Zahlen seit Jahren. Korrelation, Kausalität - wen interessiert das an Knopf 2."
        }
    ]
},

{
    id: "cof_kaffeekasse",
    title: "Die Vertrauenskasse",
    text: "Die Kaffeekasse ist leer. Die Strichliste daneben zählt 34 Kaffee seit Montag, das Sparschwein enthält: einen Knopf, eine Büroklammer und einen Kassenzettel von 2023. Gabi lehnt im Türrahmen: 'Ich weiß, wer es war. Aber ich sag nur so viel: Es ist komplizierter, als du denkst.'",
    opts: [
        {
            t: "Die Kasse mit der Schwarzen Amex 'sponsern'",
            req: "black_card",
            next: "path_kasse_amex",
            m: 5, f: 0, a: -10, c: 5,
            r: "Du hältst Prinz Abubakars Karte feierlich an das Sparschwein. Es gibt kein Terminal. Es wird nie ein Terminal geben. Du legst stattdessen Bargeld ein, aber mit der Geste eines Mannes, dessen Limit eine reine Illusion ist. Zwei Kollegen haben es gesehen. Das wird Gerüchte geben."
        },
        {
            t: "Gabi ausfragen - sie weiß alles",
            rep: { "Gabi": 3 },
            next: "path_kasse_spur",
            m: 10, f: 5, a: 0, c: 0,
            r: "Gabi erzählt in konzentrischen Kreisen: erst über das Wetter, dann über die Kantine, dann über 'jemanden, der es immer zurücklegt. Meistens.' Am Ende weißt du: Es ist kein Diebstahl. Es ist etwas Traurigeres. Und du weißt noch nicht, wer."
        },
        {
            t: "Eine Kamera-Attrappe installieren",
            next: "path_kasse_kamera",
            m: 10, f: 5, a: 0, c: 5,
            r: "Eine alte Webcam ohne Kabel, mit rotem LED-Sticker, direkt über der Kasse. Abschreckung durch Theater. Noch am selben Tag liegen wieder Münzen im Schwein. Und noch am selben Tag fragt jemand nach der Datenschutz-Folgenabschätzung."
        },
        {
            t: "Wortlos selbst auffüllen",
            next: "path_kasse_engel",
            m: 5, f: 5, a: -5, c: 0,
            r: "Du wirfst eigenes Geld hinein. Frieden ist billiger als Wahrheit, und ehrlich gesagt willst du gar nicht wissen, welcher Kollege an der Kaffeekasse scheitert. Das Schwein klimpert wieder. Fürs Erste."
        }
    ]
},
{
    id: "cof_kaffeekasse_2a",
    title: "Ende des Monats",
    reqStory: "path_kasse_spur",
    text: "Die Spur führt zu einer Erkenntnis, die du lieber nicht gehabt hättest: Es ist Kevin. Azubi-Gehalt, Ende des Monats, und die Kaffeekasse als stiller Überbrückungskredit. Er legt es am Ersten immer zurück. Meistens. Gabi wusste es die ganze Zeit und hat geschwiegen. Jetzt weißt du es auch.",
    opts: [
        {
            t: "Korrekt an Frau Elster melden",
            rep: { "Kevin": -10, "Frau Elster": 3 },
            m: 5, f: 0, a: 5, c: -5,
            r: "Frau Elster nimmt die Meldung entgegen und behandelt den Fall 'nach Vorschrift': Ermahnung, Aktenvermerk, Rückzahlungsplan über vier Wochen. Alles korrekt. Kevin grüßt dich auf dem Flur nicht mehr. Auch das ist korrekt."
        },
        {
            t: "Diskret einen 'IT-Fonds' einrichten",
            rep: { "Kevin": 10 },
            m: 10, f: 0, a: -5, c: 0,
            r: "Du stellst eine zweite Dose auf: 'IT-Notfallkasse - bedient euch, zahlt zurück, keine Fragen.' Kevin versteht die Botschaft, ohne dass je ein Wort fällt. Ab dem nächsten Monat stimmt die Kaffeekasse wieder. Die Notfallkasse hat Schwankungen. Das ist okay. Dafür ist sie da."
        },
        {
            t: "Kevin sanft darauf ansprechen",
            rep: { "Kevin": 5 },
            m: 10, f: 0, a: 5, c: 0,
            r: "Kevin wird rot bis unter die Kappe. 'Ich leg es IMMER zurück!' Stimmt fast. Ihr redet kurz über Azubi-Gehälter und die Preise in der Kantine. Am Ende leihst du ihm bis zum Ersten einen Zwanziger - offiziell, unter Männern. Er zahlt pünktlich zurück. Darauf ist er jetzt stolz."
        }
    ]
},
{
    id: "cof_kaffeekasse_2b",
    title: "Die Folgenabschätzung",
    reqStory: "path_kasse_kamera",
    text: "Chantal hat die Kamera-Attrappe entdeckt und einen Termin einberufen: 'Awareness-Runde: Überwachung am Arbeitsplatz'. Sie hat Folien. Sie hat den Betriebsrat in CC. Die Kamera hat kein Kabel, aber das weiß außer dir niemand.",
    opts: [
        {
            t: "Chantal zur 'Datenschutz-Botschafterin' machen",
            rep: { "Chantal": 5 },
            m: 5, f: 5, a: 0, c: 0,
            r: "'Chantal, das Thema braucht ein Gesicht. Deins.' Sie nimmt die Mission an, entwirft ein Badge und vergisst die Kamera darüber vollständig. Die Attrappe hängt weiter, jetzt quasi unter dem Schutz der Botschafterin selbst. Eleganter geht Ablenkung nicht."
        },
        {
            t: "Die Kamera als Attrappe entlarven",
            m: 10, f: 0, a: 10, c: 0,
            r: "Du hältst die kabellose Kamera hoch wie ein Beweisstück. Erleichterung, Gelächter, ein einzelner Vorwurf ('Psychologische Überwachung ist AUCH Überwachung!'). Der Termin endet nach zehn Minuten. Die Kasse bleibt seither voll. Theater wirkt, auch enttarnt."
        },
        {
            t: "Den Termin komplett aussitzen",
            m: 15, f: 10, a: 10, c: 0,
            r: "Fünfundvierzig Folien über Datenschutz-Grundverordnung, vorgetragen von jemandem, der PDFs nicht öffnen kann. Du sagst nichts. Die Attrappe bleibt hängen, ihr Geheimnis auch. Manchmal ist Schweigen die effizienteste Lüge."
        }
    ]
},
{
    id: "cof_kaffeekasse_2c",
    title: "Der Verdacht",
    reqStory: "path_kasse_engel",
    text: "Jemand hat dich beim Geldeinwerfen beobachtet - von hinten, halb, im Vorbeigehen. Das Ergebnis kursiert bereits als Flurfunk: 'Müller stopft die Kasse auf. Warum wohl? Weil ER sie leert und ein schlechtes Gewissen hat.' Du bist jetzt der Verdächtige deiner eigenen guten Tat.",
    opts: [
        {
            t: "Öffentlich richtigstellen",
            m: 10, f: 0, a: 10, c: 0,
            r: "Du erklärst in der Frühstücksrunde den tatsächlichen Hergang. Die Hälfte glaubt dir. Die andere Hälfte findet, genau DAS würde der Kassendieb sagen. Wahrheit skaliert schlecht gegen eine gute Geschichte. Aber die Hälfte ist immerhin die Hälfte."
        },
        {
            t: "Den Ruf einfach tragen",
            m: 2, f: 10, a: 5, c: 5,
            r: "Sollen sie reden. Du weißt, was stimmt, und Erklärungen adeln nur das Gerücht. Der Flurfunk verliert nach zwei Tagen das Interesse - es bleibt aber ein Rest. Es bleibt immer ein Rest. Der Chef hört solche Reste gern."
        },
        {
            t: "Gabi um ein Gegen-Gerücht bitten",
            rep: { "Gabi": 3 },
            m: 5, f: 5, a: 0, c: 0,
            r: "Gabi hört sich das Problem an und nickt fachfraulich: 'Bis Donnerstag redet keiner mehr davon.' Am Mittwoch spricht die ganze Firma über die angebliche Verlobung in der Buchhaltung. Deine Geschichte ist tot. Frag nie, was sie dafür in Umlauf gebracht hat."
        }
    ]
},
{
    id: "cof_kaffeekasse_2d",
    title: "Der Prinz von der IT",
    reqStory: "path_kasse_amex",
    text: "Das Gerücht hat über Nacht Fahrt aufgenommen: Müller besitzt eine Schwarze Amex. Müller ist heimlich vermögend. Müller macht den Admin-Job 'nur aus Leidenschaft'. Markus fängt dich an der Maschine ab, die Augen glänzend: 'Wir müssen über dein Portfolio reden.'",
    opts: [
        {
            t: "Nüchtern dementieren",
            m: 5, f: 0, a: 5, c: 0,
            r: "'Die Karte gehört einem nigerianischen Prinzen, Markus.' Er lacht dröhnend und boxt dir kumpelhaft gegen den Arm: 'DISKRETION! Verstehe. Old Money redet nicht.' Das Dementi hat das Gerücht soeben bestätigt. So funktionieren Gerüchte."
        },
        {
            t: "Markus auflaufen lassen",
            rep: { "Markus": -5 },
            m: 10, f: 5, a: -10, c: 0,
            r: "Du lässt dir eine Viertelstunde lang 'exklusive Anlagechancen' präsentieren, nickst wissend und sagst am Ende: 'Mein Family Office regelt das.' Markus zieht ehrfürchtig ab, um zu googeln, was ein Family Office ist. Es war herrlich."
        },
        {
            t: "Die Legende aktiv pflegen",
            m: 5, f: 10, a: -5, c: 10,
            r: "Du dementierst nichts, lächelst rätselhaft und zahlst dein Kantinenessen betont beiläufig in Münzen. Die Legende wächst. Leute halten dir Türen auf. Irgendwann wird Dr. Wichtig fragen, warum ein vermögender Mann seine Gehaltsstufe nicht neu verhandelt - oder Frau Elster, woher das Vermögen stammt."
        }
    ]
},


/* ============================================================
   TRAPS (v4.0.0): events where the answer that SOUNDS sensible
   is not the one that IS sensible. No free way out - dilemmas
   with bait.
   ============================================================ */

{
    id: "cof_falle_bio",
    char: "Chantal",
    title: "Die Bio-Bohnen",
    text: "Chantal stellt feierlich eine Tüte auf die Maschine: 'Bio! Fairtrade! Single Origin! Die füllen wir jetzt ein, ja? Für die Werte.' Die Tüte glänzt ölig. Die Maschine ist Baujahr 2014 und hat schon normale Bohnen nur widerwillig akzeptiert.",
    opts: [
        {
            t: "'Die Maschine verträgt das nicht.'",
            rep: { "Chantal": -5 },
            m: 5, f: 5, a: 10, c: 0,
            r: "Fachlich korrekt, sozial ein Minenfeld. Chantal notiert dich innerlich als 'Fortschrittsverweigerer', und die Diskussion über Maschinenverträglichkeit von Idealen kostet dich eine Viertelstunde Lebensfreude in fünf Minuten."
        },
        {
            t: "Heimlich alte Bohnen in die Bio-Tüte füllen",
            m: 5, f: 10, a: 0, c: 5,
            r: "Der Discounter-Kaffee schmeckt im Bio-Gewand 'sooo viel runder' (Chantal). Der Betrug funktioniert perfekt - und genau das ist das Problem: Du musst ihn jetzt jede Woche wiederholen, für immer, und irgendwann steht jemand daneben, wenn du umfüllst."
        },
        {
            t: "Gern - Werte muss man leben",
            rep: { "Chantal": 5 },
            m: 10, f: 0, a: 30, c: 10,
            r: "Die öligen Bohnen verkleben das Mahlwerk nach vier Bezügen vollständig. Die Maschine steht, die Schlange wächst, und Chantal erzählt jedem, DU hättest 'die Umstellung gemacht'. Werte muss man leben. Reparieren auch."
        }
    ]
},
{
    id: "cof_falle_letzte_tasse",
    title: "Die letzte Tasse",
    text: "Die Kanne ist fast leer - ein Rest für ungefähr eine dreiviertel Tasse. Das Hausgesetz ist eindeutig: Wer die letzte nimmt, kocht neu. Auf dem Flur nähern sich Schritte. Du hast etwa vier Sekunden für eine Entscheidung.",
    opts: [
        {
            t: "Verzichten und ohne Kaffee zurückgehen",
            m: 2, f: 5, a: 15, c: 0,
            r: "Du gehst mit leerer Tasse und vollem Prinzip. Der Nachmittag ohne Koffein zieht sich wie ein Alignment-Termin, und hinter dir hörst du, wie jemand anders seelenruhig die letzte Tasse nimmt und NICHT neu kocht. Es gibt keine Gerechtigkeit. Nur Kaffee, und den hast du nicht."
        },
        {
            t: "Vorsichtshalber nur einen halben Schluck nehmen",
            m: 2, f: 5, a: 10, c: 25,
            r: "Der älteste Trick der Bürowelt - und exakt in diesem Moment betritt Frau Elster die Küche und sieht dich mit der Kanne in der Hand einen strategischen Restschluck lassen. Ihr Blick katalogisiert dich neu. Der Rest-Zentimeter Kaffee steht dort noch drei Tage als Mahnmal."
        },
        {
            t: "Die letzte nehmen und neu aufsetzen",
            m: 15, f: 0, a: 10, c: 0,
            r: "Regelkonform und ehrenhaft: Du nimmst die letzte und kochst neu. Es dauert, die Maschine gluckert, drei Wartende schauen dir dabei zu wie einem Baustellenkran, und einer fragt, ob das 'noch lange' dauert. Ehre ist ein Zeitfresser."
        }
    ]
},
{
    id: "cof_falle_spende",
    title: "Der Spendenlauf",
    text: "Bernd aus dem Vertrieb steht mit einer Liste an der Maschine: 'Ich lauf beim Firmenlauf mit! Für den guten Zweck! Trägst du dich ein? Zwei Euro pro Kilometer, sind ja nur zehn Kilometer.' Zwanzig Euro. Die Liste ist gut gefüllt. Alle schauen.",
    opts: [
        {
            t: "Großzügig eintragen - für den guten Zweck",
            m: 5, f: 0, a: 10, c: 20,
            r: "Zwanzig Euro, ein gutes Gefühl - und ein Eintrag in ein unsichtbares Register: Du giltst jetzt als 'spendet immer'. In den nächsten Wochen finden dich der Kuchenbasar, die Tombola, das Trikot-Sponsoring und Bernds zweiter Lauf. Großzügigkeit ist in diesem Haus ein Abo."
        },
        {
            t: "Symbolisch fünf Euro geben",
            m: 2, f: 0, a: 5, c: 5,
            r: "Der Kompromiss-Klassiker. Bernd sagt 'auch fünf Euro helfen!' in einem Ton, der das Gegenteil bedeutet, und neben deinem Namen steht jetzt für alle sichtbar die kleinste Zahl der Liste. Du hast bezahlt UND giltst als knauserig. Das Schlechteste aus beiden Welten, zum Sonderpreis."
        },
        {
            t: "Höflich ablehnen",
            m: 2, f: 5, a: 10, c: 0,
            r: "'Diesen Monat schlecht, sorry.' Bernd nickt verständnisvoll und erzählt es verständnisvoll weiter. Beim Firmenlauf werden Fotos gemacht, es gibt eine Dankes-Rundmail mit allen Spendernamen, und deiner fehlt. Niemand sagt etwas. Alle wissen es."
        }
    ]
},

/* ============================================================
   SCHACHT 7 (v4.0.0)
   One chain across three areas of the building. Whoever starts
   it only works out on the third stop that they are the
   problem.
   ============================================================ */

{
    id: "cof_schacht_1",
    char: "Frau Elster",
    title: "Position sieben",
    text: "Frau Elster fängt dich an der Kaffeemaschine ab, Ordner im Arm, und geht ihre Liste durch. 'Herr Müller, die Buchungen sind fast alle zugeordnet. Nur Position sieben ist noch offen. Position sieben. Immer diese sieben.'",
    opts: [
        {
            t: "Ihr beim Zuordnen helfen",
            rep: { "Frau Elster": 3 },
            next: "path_schacht_1",
            m: 15, f: -5, a: 5, c: -5,
            r: "Ihr geht die Liste gemeinsam durch, Position sieben ist ein falsch kontierter Druckertoner. Als sie sich verabschiedet, sagt sie noch etwas - und du bist für den Bruchteil einer Sekunde sicher, sie habe 'Der Schacht vergisst nicht' gesagt. Du hast gestern zu lange ferngesehen. Vier Folgen. Das rächt sich."
        },
        {
            t: "Auf die Buchhaltung verweisen",
            next: "path_schacht_1",
            m: 5, f: 10, a: 0, c: 5,
            r: "'Das ist eher was für die Buchhaltung, Frau Elster.' Sie IST die Buchhaltung. Beim Weggehen murmelt sie etwas, das nach 'Was unten liegt, bleibt nicht unten' klingt. Muss an dir liegen. Vier Folgen SCHACHT 7 an einem Abend waren vielleicht zu viel."
        },
        {
            t: "Freundlich vertrösten",
            m: 5, f: 5, a: 0, c: 0,
            r: "Du versprichst, dich später zu kümmern, und meinst es sogar so. Frau Elster nickt und zieht weiter, den Ordner wie ein Schutzschild vor der Brust. Ein völlig normaler Vorgang an einem völlig normalen Vormittag."
        }
    ]
},


    {
        id: "cof_kaffeetrick_schlange",
        reqStory: "path_chef_kaffeetrick",
        title: "Schlange am Automaten",
        text: "Vor der Maschine stehen sieben Leute. Jeder drückt Espresso, hält den Becher-Sensor zu und wartet auf die Premium-Röstung. Die Maschine gibt sie heraus, jedes Mal, mit einem Geräusch, das sie vorher nicht gemacht hat.\n\nDu wolltest eigentlich nur einen Kaffee.",
        opts: [
            {
                t: "Den Sensor mit Panzertape abkleben",
                req: "tape", rem: "tape",
                m: 10, f: 0, a: -5, c: 5,
                r: "Du klebst den Becher-Sensor ab. Der Trick funktioniert nicht mehr, die Maschine überlebt, und niemand weiß, warum es plötzlich vorbei ist. Dein Panzertape ist weg, aber es starb für etwas."
            },
            {
                t: "Anstellen und mitmachen",
                m: 20, f: 10, a: -10, c: 10,
                r: "Zwanzig Minuten in der Schlange, dafür der beste Kaffee, den dieses Haus zu bieten hat. Die Wut sinkt merklich. Der Zeitverlust ist der Preis, und heute zahlst du ihn gern."
            },
            {
                t: "Warten, bis die Schlange weg ist",
                m: 25, f: 15, a: -5, c: 0,
                r: "Du wartest im Flur, bis die Teeküche leer ist, und ziehst dir dann in Ruhe einen normalen Kaffee. Er schmeckt wie immer. Dafür hat dich niemand angesprochen, und das war heute mehr wert."
            },
            {
                t: "Die Maschine sperren, bevor sie kaputtgeht",
                m: 15, f: -10, a: 15, c: -10,
                rep: { "Chantal": -5, "Markus": -5 },
                r: "Du schaltest die Maschine in den Servicemodus und hängst einen Zettel dran. Sieben Leute sehen dir dabei zu. Vier davon werden heute noch erzählen, dass die IT ihnen den Kaffee weggenommen hat."
            }
        ]
    },
    {
        id: "cof_gabi_vorrat",
        reqStory: "path_gabi_kollaps",
        char: "Gabi",
        title: "Die Schublade",
        text: "Gabi steht an der Spüle und räumt eine Tüte in den Unterschrank. Traubenzucker, zwei Riegel, eine Packung Kekse.\n\n'Der Sanitäter hat gesagt, ich soll immer was dahaben. Sie wissen ja, wo es steht.'",
        opts: [
            {
                t: "Ihr etwas dazustellen",
                req: "sandwich", rem: "sandwich",
                m: 5, f: 5, a: -15, c: 0,
                rep: { "Gabi": 10 },
                r: "Du legst dein Brötchen dazu, ohne etwas zu sagen. Sie sagt auch nichts. Der Unterschrank in der Teeküche ist ab heute eine gemeinsame Angelegenheit, und das ist mehr wert als das Brötchen."
            },
            {
                t: "Sich bedienen, sie hat es angeboten",
                m: 5, f: 0, a: -10, c: 0,
                loot: "chocolate",
                rep: { "Gabi": 5 },
                r: "Du nimmst einen Riegel. Sie nickt zufrieden, als hätte sie darauf gewartet, dass das Angebot angenommen wird. Ein Vorrat, den niemand anrührt, ist kein Vorrat, sondern ein Vorwurf."
            },
            {
                t: "Ablehnen und stattdessen Kaffee holen",
                m: 10, f: 0, a: -10, c: 0,
                r: "Du bleibst beim Kaffee und lehnst freundlich ab. Ihr steht zehn Minuten in der Teeküche und redet über nichts Besonderes. Es ist die entspannteste Viertelstunde des Tages."
            }
        ]
    },
    {
        id: "cof_freischalt_schlange",
        reqStory: "path_chantal_offen",
        title: "Kein ruhiger Kaffee",
        text: "Du bist noch nicht an der Maschine, da steht schon jemand neben dir. 'Ach, gut dass ich Sie treffe — wegen der gesperrten Seiten.'\n\nHinter ihm wartet noch jemand. Der wartet nicht auf die Maschine.",
        opts: [
            {
                t: "Vorschlagen, dass Chantal die Anfragen sammelt",
                m: 15, f: 0, a: -5, c: 0,
                rep: { "Chantal": -5 },
                r: "Du erklärst, alle Wünsche gingen ab sofort über Chantal, weil sie das Thema aufgebracht hat. Die Runde findet das einleuchtend. Chantal findet es weniger einleuchtend, sammelt aber tatsächlich."
            },
            {
                t: "Freundlich vertrösten und Kaffee holen",
                m: 10, f: 5, a: -5, c: 5,
                r: "Du sagst zweimal 'schicken Sie mir eine Mail' und kommst tatsächlich an deinen Kaffee. Die Wut sinkt ein wenig, aber nicht so weit wie sonst. Für einen ruhigen Kaffee war heute jemand anderes zuständig."
            },
            {
                t: "Die Sache im Stehen klären",
                m: 20, f: -10, a: 10, c: -5,
                rep: { "Markus": 5 },
                r: "Du erklärst der Runde in der Teeküche, wie die Freigabe läuft und warum es sie gibt. Zwei verstehen es, einer nicht, und dein Kaffee ist kalt. Immerhin fragen sie ab morgen nicht mehr an der Maschine."
            },
            {
                t: "Ohne Kaffee wieder gehen",
                m: 5, f: 0, a: 10, c: 0,
                r: "Du drehst um. Die Teeküche ist der einzige Ort im Gebäude, an dem du sonst runterkommst, und heute ist sie ein Wartezimmer. Du gehst mit mehr Wut zurück, als du gekommen bist."
            }
        ]
    },
    {
        id: "cof_praktikant_verlegen",
        reqStory: "path_puschel",
        title: "Der Praktikant an der Maschine",
        text: "Der Praktikant steht vor dem Automaten und drückt Tasten in einer Reihenfolge, die zu nichts führt. Als er dich sieht, wird er rot.\n\n'Wegen dem Passwort... das war mir voll peinlich.'",
        opts: [
            {
                t: "Ihn nach dem Hamster fragen",
                m: 10, f: 0, a: -15, c: 5,
                r: "Der Hamster heißt Puschel, ist sechs Jahre alt und damit uralt für einen Hamster. Der Praktikant zeigt dir vierzehn Fotos. Du lachst zum ersten Mal an diesem Tag, und die Wut fällt spürbar ab."
            },
            {
                t: "Ihm zeigen, wie die Maschine funktioniert",
                m: 10, f: 0, a: -10, c: 0,
                r: "Du zeigst ihm die Reihenfolge — erst Becher, dann Stärke, dann Sorte — und ihr trinkt beide einen. Er redet danach zehn Minuten über sein Studium. Es ist erstaunlich erholsam, jemandem zuzuhören, der nichts von dir will."
            },
            {
                t: "Sagen, dass so etwas jedem passiert",
                m: 5, f: 0, a: -5, c: 0,
                r: "Du winkst ab und erzählst ihm, dass hier ein Passwort für alle Konten gilt und seit 2019 niemand daran etwas ändert. Er ist ehrlich erleichtert und leicht entsetzt, was beides angemessen ist."
            },
            {
                t: "Das Thema meiden und Kaffee holen",
                m: 5, f: 5, a: -5, c: 0,
                r: "Du sagst nichts dazu, holst deinen Kaffee und gehst. Er bleibt an der Maschine stehen. Es ist keine unfreundliche Begegnung, aber eine, an die er sich länger erinnern wird als du."
            }
        ]
    },

    /* ---------------------------------------------------------------------
       Dreiteiler wave 2 (v5.0): coffee chains. Pool identity: this is where
       the workday gets saved, so delayed payoffs here are REAL recovery
       (a -10 to -15). Duplicate check against the stock (2026-08):
       Kaffeekasse, Bohnen and Kühlschrank are taken (9/12/20 hits) and were
       dropped unwritten; check new chains against cof_entkalken (machine
       care, office-wide euphoria joke) before writing. One follow-up lives
       in data_calls.js (call_deka_stimmung). Frau Sonntag returns from
       call_wlp_geruch - flavour name, no reputation.
       --------------------------------------------------------------------- */
    {
        id: "cof_deka_1",
        title: "Pilotprojekt Klarer Kopf",
        text: "Am Kaffeeautomaten hängt ein laminierter Aushang: 'Pilotprojekt KLARER KOPF — diese Woche testweise entkoffeiniert. Ihre Personalabteilung.' Darunter, handschriftlich, bereits drei Kommentare. Einer davon ist nur ein Wort, und das ist nicht zitierfähig.",
        opts: [
            {
                t: "Hinnehmen. Ist ja nur eine Woche.",
                m: 5, f: 5, a: 5, c: 0,
                next: "cof_deka_brav",
                r: "Du trinkst das braune Wasser. Es schmeckt wie Kaffee, dem man die Meinung verboten hat."
            },
            {
                t: "Echten Kaffee im Serverraum deponieren",
                m: 15, f: 0, a: -5, c: 5,
                next: "cof_deka_geheim",
                r: "Eine French Press hinter den Ersatzteilkisten, Bohnen in einer Dose mit der Aufschrift 'SCHRAUBEN M4'. Der Serverraum hat jetzt ein Betriebsgeheimnis."
            },
            {
                t: "Beim Betriebsrat beschweren",
                m: 25, f: 0, a: 10, c: 0,
                r: "Der Betriebsrat nimmt es 'sehr ernst'. Es wird Tagesordnungspunkt 14 der nächsten Sitzung. Die Sitzung ist nächsten Monat. Der Pilot läuft diese Woche."
            }
        ]
    },
    {
        id: "cof_deka_2",
        reqStory: "cof_deka_brav",
        reqStoryAge: 1,
        title: "Der Schädel meldet sich",
        text: "Hinter deiner Stirn sitzt seit dem Aufstehen ein dumpfer Druck, und er hat einen Namen: Entzug. Am Automaten steht schon eine kleine Gruppe und starrt den Aushang an wie eine Traueranzeige.",
        opts: [
            {
                t: "Durchhalten und Wasser trinken",
                m: 10, f: 5, a: 10, c: 0,
                r: "Du trinkst Wasser. Es hilft gegen Durst. Gegen alles andere hilft es nicht."
            },
            {
                t: "Den Stressball kneten, bis es vorbeigeht",
                req: "stressball",
                m: 5, f: 0, a: -5, c: 0,
                r: "Kneten, atmen, kneten. Der Druck bleibt, aber er hat jetzt Konkurrenz. Der Ball sieht aus, als hätte er eine schwere Woche."
            },
            {
                t: "Kevin nach seinem Geheimvorrat fragen",
                m: 10, f: 5, a: -5, c: 5,
                rep: { "Kevin": 5 },
                r: "Kevin zieht wortlos eine Thermoskanne aus dem Rucksack und schenkt dir einen Becher ein. Er stellt keine Fragen. Er notiert nur etwas in einem kleinen Buch."
            }
        ]
    },
    {
        id: "cof_deka_3",
        reqStory: "cof_deka_brav",
        reqStoryAge: 2,
        title: "Der Aushang ist weg",
        text: "Am Automaten klebt nur noch ein Rest Laminierfolie. Daneben ein neuer Zettel, kleiner, ohne Logo: 'Pilot vorzeitig beendet. Auswertung folgt.' Aus der Maschine riecht es wieder nach Kaffee. Nach echtem.",
        opts: [
            {
                t: "Den ersten richtigen Kaffee zelebrieren",
                m: 15, f: 0, a: -15, c: 0,
                r: "Du nimmst die Tasse mit beiden Händen und trinkst im Stehen, langsam, mit geschlossenen Augen. Irgendwo hinter deiner Stirn packt der Druck seine Sachen. Du hast Dinge überstanden diese Woche. Das hier zählt dazu."
            },
            {
                t: "Fragen, warum der Pilot so schnell vorbei ist",
                m: 10, f: 0, a: -10, c: 0,
                r: "Die Antwort steht in keiner Mail, aber die Teeküche weiß es: Die Fehlerquote der Buchhaltung. Frau Sonntag soll drei Überweisungen nach Liechtenstein geschickt haben. Aus Versehen. Alle drei."
            }
        ]
    },
    {
        id: "cof_deka_4",
        reqStory: "cof_deka_geheim",
        reqStoryAge: 1,
        title: "Die Auswertung lobt dich",
        text: "Im Postfach liegt die Zwischenbilanz des Pilotprojekts, und ein Satz ist gelb markiert: 'Besonders die IT-Abteilung zeigt, dass konstante Leistung auch ohne Koffein möglich ist.' Du liest ihn zweimal. Im Serverraum steht eine Dose mit der Aufschrift 'SCHRAUBEN M4'.",
        opts: [
            {
                t: "Das Lob kommentarlos einstreichen",
                m: 5, f: 0, a: -5, c: -5,
                r: "Du druckst den Satz aus und hängst ihn in den Serverraum. Über die Dose."
            },
            {
                t: "Die French Press vorsichtshalber abschaffen",
                m: 10, f: 5, a: 5, c: -5,
                r: "Wer gelobt wird, wird beobachtet. Die Dose wandert in die Aktentasche, der Serverraum riecht wieder nach Serverraum. Ein Umzug, nur trauriger."
            }
        ]
    },
    {
        id: "cof_automat_1",
        title: "Der Probeaufsteller",
        text: "Neben dem alten Automaten steht plötzlich ein zweiter: Chrom, Display, Bohnenmahlwerk mit Beleuchtung. Ein Herr Kowalski verteilt Visitenkarten. 'Zur Probe. Bis Ende der Woche. Völlig unverbindlich.' Die Maschine surrt wie ein Versprechen.",
        opts: [
            {
                t: "Unverbindlich probieren",
                m: 10, f: 0, a: -10, c: 0,
                next: "cof_automat_genuss",
                r: "Flat White auf Knopfdruck, die Crema hält, was das Display verspricht. Der alte Automat brummt daneben wie ein Verwandter, den man gerade enterbt."
            },
            {
                t: "Kowalski fragen, wo der Haken ist",
                m: 10, f: 0, a: 0, c: 0,
                next: "cof_automat_genuss",
                r: "'Kein Haken. Nur ein Angebot.' Er lächelt wie ein Prospekt. Du probierst trotzdem. Der Kaffee ist das Beste, was diese Teeküche je hervorgebracht hat, und genau das macht dich misstrauisch."
            },
            {
                t: "Nicht anrühren",
                m: 5, f: 0, a: 5, c: 0,
                r: "Kostenlos ist nie kostenlos. Du bleibst beim alten Automaten. Er hat es nicht verdient, aber du auch nicht."
            }
        ]
    },
    {
        id: "cof_automat_2",
        reqStory: "cof_automat_genuss",
        reqStoryAge: 2,
        title: "Kowalski holt ab",
        text: "Die Chrommaschine steht angekippt auf einer Sackkarre, das Display ist dunkel. Herr Kowalski wickelt das Stromkabel auf, sorgfältig, wie man ein Pflaster abzieht. 'Und?', fragt er. 'Schon mit dem Einkauf gesprochen?'",
        opts: [
            {
                t: "Das Angebot ehrlich weiterleiten",
                m: 15, f: -5, a: 5, c: 5,
                r: "Du schreibst dem Einkauf eine sachliche Empfehlung. Die Antwort kommt als Formular: 'Bedarfsmeldung Kategorie C, Bearbeitung im nächsten Quartal.' Kowalski nickt, als hätte er sie mitgelesen. 'Bis nächstes Quartal dann.'"
            },
            {
                t: "'Nehmen Sie sie einfach schnell mit.'",
                m: 5, f: 0, a: 10, c: 0,
                r: "Er versteht. Beim Rausrollen quietscht die Sackkarre einmal, wie zum Abschied. Der alte Automat mahlt demonstrativ laut. Sein Kaffee schmeckt heute nach Standpauke."
            }
        ]
    },
    {
        id: "cof_tasse_1",
        title: "Die Tasse ist weg",
        text: "Deine Tasse ist nicht am Platz. Nicht in der Spülmaschine, nicht im Schrank, nicht hinter der Kaffeedose. Die mit dem Sprung am Henkel und dem verblassten Aufdruck. Es gibt vierzig Tassen in dieser Teeküche, und es ist die eine, die fehlt.",
        opts: [
            {
                t: "Systematisch suchen, Etage für Etage",
                m: 20, f: -5, a: 5, c: 0,
                next: "cof_tasse_spur",
                r: "Drei Teeküchen, zwei Besprechungsräume, ein verwaister Rollcontainer. Nichts. Aber im dritten Stock sagt eine Praktikantin, sie habe 'so eine mit Sprung' gestern beim Vertrieb gesehen. Die Spur lebt."
            },
            {
                t: "Irgendeine andere nehmen",
                m: 5, f: 5, a: 5, c: 0,
                next: "cof_tasse_egal",
                r: "Du nimmst eine weiße mit Firmenlogo. Der Henkel sitzt falsch in der Hand, der Rand ist zu dick. Der Kaffee schmeckt wie aus einem Hotel, in dem man nicht freiwillig wohnt."
            },
            {
                t: "Aus Prinzip aus dem Pappbecher trinken",
                m: 5, f: 0, a: 5, c: 0,
                r: "Der Pappbecher weicht durch, der Kaffee schmeckt nach Deckel. Aber es ist ein Statement, und Statements schmecken selten gut."
            }
        ]
    },
    {
        id: "cof_tasse_2",
        reqStory: "cof_tasse_spur",
        reqStoryAge: 1,
        title: "Die Tasse beim Vertrieb",
        text: "Da steht sie. Auf dem Schreibtisch eines Herrn Petzold aus dem Vertrieb, gefüllt mit Milchschaum, daneben ein Keks. Der Sprung am Henkel ist unverkennbar. Herr Petzold telefoniert und macht dabei Gesten, als würde er ein Orchester dirigieren.",
        opts: [
            {
                t: "Warten, bis er auflegt, und sie zurückfordern",
                m: 15, f: 0, a: -10, c: 0,
                r: "'Oh. Die stand in der Spülmaschine, ich dachte—' Du nimmst die Tasse, kippst den Milchschaum ins Waschbecken und spülst sie zweimal. Auf dem Rückweg trägst du sie wie einen Pokal."
            },
            {
                t: "Sie wortlos vom Tisch nehmen, mitten im Gespräch",
                m: 5, f: 0, a: -10, c: 5,
                r: "Petzold verliert kurz den Faden und dirigiert ins Leere. Du bist schon an der Tür. Manche Botschaften brauchen keinen Ton."
            }
        ]
    },
    {
        id: "cof_tasse_3",
        reqStory: "cof_tasse_egal",
        reqStoryAge: 2,
        title: "Sie ist wieder da",
        text: "Deine Tasse steht am Platz. Gespült, trocken, der Sprung am Henkel wie immer. Am Henkel hängt das Etikett eines Teebeutels, den du nie gekauft hast: Rooibos-Vanille. Keine Notiz, keine Erklärung. Die Teeküche schweigt.",
        opts: [
            {
                t: "Nicht hinterfragen. Kaffee einschenken.",
                m: 5, f: 0, a: -10, c: 0,
                r: "Der Henkel sitzt in der Hand wie ein Händedruck. Wo sie war, wirst du nie erfahren, und vielleicht ist das in Ordnung."
            },
            {
                t: "Das Rooibos-Etikett aufheben. Als Beweisstück.",
                m: 5, f: 0, a: -5, c: 0,
                r: "Du klemmst das Etikett an den Monitor, zu den anderen ungelösten Fällen. Irgendwer in diesem Haus trinkt Rooibos-Vanille aus fremden Tassen. Du wirst wachsam bleiben."
            }
        ]
    },
    {
        id: "cof_sonntag_1",
        title: "Fehlercode E-52",
        text: "Frau Sonntag aus der Buchhaltung steht vor dem Kaffeeautomaten und liest das Display wie ein Testament. 'E-52', sagt sie, als du dazukommst. 'Ich hab schon zweimal aus- und wieder angeschaltet. Das hilft doch sonst bei Ihnen auch immer.'",
        opts: [
            {
                t: "Den Fehler ansehen und beheben",
                m: 10, f: -5, a: -5, c: 0,
                next: "cof_sonntag_dank",
                r: "E-52 ist der Tresterbehälter. Du leerst ihn, die Maschine erwacht. Frau Sonntag sieht aus, als hättest du ein Kind aus einem Brunnen gezogen. 'Sie können das einfach so?'"
            },
            {
                t: "'E-52. Da müssen Sie ein Ticket aufmachen.'",
                m: 5, f: 5, a: 0, c: 0,
                r: "Sie sieht dich an, dann das Display, dann wieder dich. 'Ein Ticket. Für den Kaffeeautomaten.' Du nickst ernst. Irgendwo muss die Grenze der Zuständigkeit verlaufen, und heute verläuft sie hier."
            }
        ]
    },
    {
        id: "cof_sonntag_2",
        reqStory: "cof_sonntag_dank",
        reqStoryAge: 1,
        title: "Ein Teller im Fach",
        text: "In deinem Postfach steht ein kleiner Teller mit Frischhaltefolie darüber. Darunter: ein Stück Marmorkuchen und ein Donut, dazu ein Post-it in akkurater Buchhalterinnen-Schrift: 'Für den Herrn von der IT. Der Automat und ich bedanken uns. — R. Sonntag'",
        opts: [
            {
                t: "Kuchen sofort, Donut für später",
                m: 10, f: 0, a: -10, c: 0,
                loot: "donut",
                r: "Der Marmorkuchen ist selbst gebacken, mit ordentlich Rührzeit. Du isst ihn im Stehen am Fenster und bist für vier Minuten mit allem im Reinen. Der Donut wandert in die Schublade. Eine Investition."
            },
            {
                t: "Sich persönlich bedanken gehen",
                m: 15, f: 0, a: -10, c: -5,
                r: "Frau Sonntag winkt ab, freut sich aber sichtbar. 'Mein Mann sagt immer, die IT lebt von Keksen.' Ihr Mann hat recht. Auf dem Rückweg grüßen dich zwei Leute aus der Buchhaltung, die dich noch nie gegrüßt haben."
            }
        ]
    },
    {
        id: "cof_empfang_1",
        char: "Gabi",
        title: "Die gute Maschine",
        text: "Es ist ein offenes Geheimnis: Die beste Kaffeemaschine des Hauses steht im Empfang. Siebträger, gepflegt, Gabis Revier. Als du vorbeigehst, fängt sie dich ab. 'Du bist doch von der IT. Mein Etikettendrucker druckt nur noch Striche. Hilf mir, und ich zeig dir, wie man an der Maschine einen Cappuccino macht, der den Namen verdient.'",
        opts: [
            {
                t: "Auf den Handel eingehen",
                m: 30, f: -10, a: 5, c: -5,
                rep: { "Gabi": 5 },
                next: "cof_empfang_zugang",
                r: "Der Drucker hat einen zerknüllten Etikettenstau und eine Firmware von vorgestern. Zwanzig Minuten später druckt er wieder Buchstaben. Gabi nickt anerkennend. 'Morgen früh. Erste Lektion.'"
            },
            {
                t: "'Dafür gibt es ein Ticketsystem.'",
                m: 5, f: 5, a: 0, c: 0,
                rep: { "Gabi": -5 },
                r: "Gabi zieht eine Augenbraue hoch und wendet sich ab. 'Dann trink weiter das da oben.' Sie sagt 'das da oben', wie andere Leute 'Leitungswasser' sagen."
            }
        ]
    },
    {
        id: "cof_empfang_2",
        reqStory: "cof_empfang_zugang",
        reqStoryAge: 1,
        title: "Erste Lektion am Siebträger",
        text: "Gabi steht neben dir am Siebträger und kommandiert mit zwei Worten: 'Fester. Gerader.' Der Empfang riecht nach frisch gemahlenem Kaffee, das Telefon klingelt, sie ignoriert es mit der Autorität von jemandem, der weiß, was wichtig ist.",
        opts: [
            {
                t: "Zuhören, tampen, lernen",
                m: 20, f: 0, a: -15, c: 0,
                r: "Der dritte Versuch läuft dunkel und dick, die Crema steht. Gabi probiert, nickt einmal. 'Geht doch.' Du trinkst den besten Kaffee deiner Firmengeschichte im Stehen zwischen Paketannahme und Klingelschild, und ab jetzt hast du hier ein stehendes Angebot."
            },
            {
                t: "Abkürzen und den Knopf der Mühle drücken",
                m: 10, f: 5, a: -5, c: 0,
                r: "Gabi schiebt deine Hand weg wie die eines Kindes am Herd. 'So wird das nichts.' Du bekommst trotzdem einen Cappuccino. Aus Gnade. Er schmeckt nach Gnade."
            }
        ]
    },
];
