export const sidequests = [

    {
        id: "sq_toilet_1",
        kind: "text",
        title: "Mission: Porzellan",
        text: "Deine Blase meldet 'Füllstand: 110%'. Du hast es eilig. Doch zwischen dir und der erlösenden Keramik steht Björn, der Marketing-Leiter. Er scannt den Flur wie ein Raubtier auf der Suche nach einem Opfer für ein 'spontanes Brainstorming'.",
        opts: [
            { 
                t: "Ablenkung: 'HINTER DIR! ELON MUSK!'", 
                next: "path_toilet_lie", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du brüllst und zeigst in die andere Richtung. Björn wirbelt herum: 'Wo?! Der Disruptor?!'. Du nutzt die Sekunde und sprintest in die Kabine. Knapp, aber erfolgreich." 
            },
            { 
                t: "Ergeben: Blickkontakt herstellen", 
                next: "path_toilet_pastel", 
                m: 60, f: -20, a: 30, c: -10, 
                r: "Anfängerfehler! Er hakt dich sofort unter: 'Ah, Müller! Perfekt! Wir brauchen dein Tech-Mindset zu den neuen Pastellfarben für das Logo!' Du sitzt 60 Minuten im Meeting. Deine Blase platzt fast. Hölle auf Erden." 
            },
            { 
                t: "Aggressiv durchrennen", 
                m: 2, f: 0, a: 10, c: 5, 
                r: "Du rempelst ihn fast um. 'PLATZ DA! BIO-NOTFALL!' Björn starrt dir entsetzt hinterher. 'Kein Flow, der Typ...', murmelt er. Unhöflich, aber effektiv." 
            }
        ]
    },
    {
        id: "sq_toilet_2a",
        kind: "text",
        title: "Meeting: 'Color of Success'",
        reqStory: "path_toilet_pastel",
        text: "Björn hat dich wieder eingeladen. Da du beim letzten Mal nicht weggelaufen bist, hält er dich für interessiert. 'So, IT-Brain! Welche Farbe passt besser zum Serverraum-Feng-Shui? 'Soft Salmon' oder 'Baby Breath Blue'?' Alle starren dich erwartungsvoll an.",
        opts: [
            { 
                t: "Ironisch: 'Vantablack. Wie meine Seele.'", 
                m: 10, f: 5, a: -5, c: 0, 
                r: "Björn notiert eifrig: 'Oh, Edgy! Dark Mode für Wände! Genial!' Sie lieben es. Du bist jetzt der 'Chief Visionary Officer' wider Willen." 
            },
            { 
                t: "Technisch: 'Blau kühlt die Hardware'", 
                m: 30, f: -10, a: 10, c: 0, 
                r: "Du hältst einen Vortrag über Thermodynamik. Nach 30 Minuten schlafen alle. Du hast sie zu Tode gelangweilt. Sieg durch Monotonie." 
            }
        ]
    },
    {
        id: "sq_toilet_2b",
		char: "Egon",
        kind: "text",
        title: "Der Fehlalarm",
        reqStory: "path_toilet_lie",
        text: "Hausmeister Egon steht mit einem Werkzeugkasten vor dir. 'Björn sagte, hier war ein Promi? Oder ein Feuer? Er hat was von 'heißer Luft' geredet. Ich soll die Lüftung checken.'",
        opts: [
            { 
                t: "Lügen: 'War nur ein Test.'", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Egon zuckt mit den Schultern. 'Mir egal, ich werde stündlich bezahlt.' Er setzt sich hin und macht Pause. Du hast einen Verbündeten." 
            },
            { 
                t: "Wahrheit: 'Ich musste aufs Klo.'", 
                rep: { "Egon": 5 },
                m: 10, f: 0, a: 5, c: 0, 
                r: "Egon lacht dreckig. 'Guter Trick. Muss ich mir merken.' Er erzählt es aber weiter. Dein Ruf als 'Lügner' steigt." 
            }
        ]
    },
    {
        id: "sq_cake_1",
        kind: "text",
        title: "Der Kuchen-Krieg",
        text: "Ein unbekannter Held hat Geburtstagskuchen spendiert. Mächtige Schoko-Sahne-Torte! Doch Chantal (Marketing) blockiert den Zugang und hält einen Monolog über ihre neue 'Low-Carb-High-Sadness'-Diät. Im Hintergrund lauern schon hungrige Kollegen.",
        opts: [
            { 
                t: "Ninja-Move: Kuchen schnappen & flüchten", 
                next: "path_cake_sugar", 
                rep: { "Chantal": -5 },
                m: 5, f: 5, a: -5, c: 0, 
                r: "Zack! Während Chantal Luft holt, greifst du dir ein riesiges Stück mit der bloßen Hand und verschwindest im Serverraum. Die Sahne klebt überall, aber der Zucker-Rush setzt sofort ein." 
            },
            { 
                t: "Höflich warten & zuhören", 
                next: "path_cake_crumb", 
                rep: { "Chantal": 5 },
                m: 30, f: -5, a: 20, c: 0, 
                r: "Schwerer Fehler. Während Chantal über Kalorien referiert, fällt der Vertrieb wie ein Heuschreckenschwarm über das Blech her. Als sie fertig ist, ist das Blech blankgeputzt. Du stehst vor dem Nichts." 
            },
            { 
                t: "Dominanz: Das letzte Stück vor dem Chef essen", 
                next: "path_cake_boss", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, f: 10, a: 5, c: 25, 
                r: "Du schiebst dir das letzte Stück genüsslich in den Mund, genau als der Chef danach greift. Er greift ins Leere. Er starrt auf deine schokolierten Lippen, sein Gesicht läuft dunkelrot an. Er flüstert: 'Das war meins...'" 
            }
        ]
    },
    {
        id: "sq_cake_2a",
        kind: "text",
        title: "Der Zucker-Trip",
        reqStory: "path_cake_sugar",
        text: "Du sitzt am Platz. Das war zu viel Zucker auf leeren Magen. Deine Pupillen vibrieren. Du siehst plötzlich den Matrix-Code auf deinem Bildschirm. Die Excel-Tabelle spricht zu dir: 'Füttere mich mit Daten!'",
        opts: [
            { 
                t: "Die Welle reiten (Arbeiten)", 
                m: 60, f: -30, a: -10, c: 0, 
                r: "Du tippst mit Lichtgeschwindigkeit. Deine Hände sind nur noch Schemen. Du hast Arbeit für drei Wochen in einer Stunde erledigt. Leider ist alles in Wingdings-Schriftart. Egal, es fühlte sich gut an." 
            },
            { 
                t: "Unter den Tisch legen (Crash)", 
                m: 30, f: 20, a: 10, c: 10, 
                r: "Der Absturz kommt hart. Du rollst dich unter dem Schreibtisch zusammen und wimmerst leise. Kevin findet dich und denkt, du bist tot. Er stiehlt deinen Bürostuhl." 
            }
        ]
    },
    {
        id: "sq_cake_2b",
        kind: "text",
        title: "Das Krümel-Monster",
        reqStory: "path_cake_crumb",
        text: "Der Hunger treibt dich in den Wahnsinn. Du bist allein in der Küche. Auf dem leeren Kuchenblech kleben noch Reste von Sahne und Schokostreuseln. Niemand ist zu sehen...",
        opts: [
            { 
                t: "Das Blech ablecken (Würdeverlust)", 
				 rep: { "Dr. Wichtig": -2 },	
                m: 5, f: 5, a: -10, c: 10, 
                r: "Du leckst gierig über das Metall. Plötzlich geht das Licht an. Der Großkunde aus Japan steht mit dem Chef in der Tür. Sie starren dich an. Du hast Sahne an der Nase. Der Chef sagt leise: 'Wir finden allein raus.'" 
            },
            { 
                t: "Einen alten Keks aus der Ritze essen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du findest einen 'Prinzenrolle'-Keks hinter der Mikrowelle. Er ist weich. Er schmeckt nach Staub und Zwiebeln. Du würgst ihn runter. Der Tiefpunkt ist erreicht." 
            }
        ]
    },
    {
        id: "sq_cake_2c",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Das Back-Mandat",
        reqStory: "path_cake_boss",
        text: "Der Chef zitiert dich ins Büro. Er wirkt ruhig, zu ruhig. 'Müller. Sie haben mir eine strategische Ressource (Kuchen) entzogen. Ich fordere Restitution. Sie werden morgen für das Board-Meeting backen. Und wehe, es ist Fertigmischung!'",
        opts: [
            { 
                t: "Trotz: 'Ich kann nur Rührei.'", 
				rep: { "Dr. Wichtig": 2 },
                m: 5, f: 0, a: 10, c: 10, 
                r: "Der Chef grinst böse. 'Dann lernen Sie es. Youtube existiert. Wenn dieser Kuchen nicht schmeckt, streiche ich Ihren Urlaub.' Der Druck ist unmenschlich." 
            },
            { 
                t: "Lügen: 'Ich bin Hobby-Konditor!'", 
				rep: { "Dr. Wichtig": 5 },
                m: 10, f: 5, a: -5, c: 0, 
                r: "Du kaufst beim Bäcker eine Torte, nimmst sie aus der Schachtel und streust Mehl drauf, damit es 'selbstgemacht' aussieht. Der Chef liebt es. 'Müller, Sie haben Talente!' (Kosten: 30€, aber Job gerettet)." 
            }
        ]
    },
    {
        id: "sq_fire_1",
        kind: "text",
        title: "Alarmstufe Popcorn",
        text: "WUUUP! WUUUP! Die Sirene brüllt. Es riecht nicht nach Inferno, sondern eindeutig nach verbranntem 'Salty Caramel'-Popcorn aus der Teeküche. Die Kollegen rennen panisch zum Sammelplatz.",
        opts: [
            { 
                t: "HELDENTAT: Küche stürmen!", 
                req: "fire_ext", 
                next: "path_fire_hero", 
                m: 5, f: -20, a: -20, c: -10, 
                r: "Du trittst die Küchentür ein, entsicherst den Löscher und brüllst: 'FIRE IN THE HOLE!' Eine gewaltige weiße Wolke hüllt die qualmende Mikrowelle (und das halbe Stockwerk) ein." 
            },
            { 
                t: "Die Gunst der Stunde nutzen: Plündern", 
                next: "path_fire_loot", 
                m: 10, f: 15, a: -10, c: 5, 
                r: "Während alle zu den Notausgängen stürmen, schleichst du in den verlassenen Konferenzraum. Du klaust die 'Guten Kekse' (die mit Schokolade) und verschwindest ungesehen. Chaos ist eine Leiter." 
            },
            { 
                t: "Pflichtbewusst evakuieren", 
                next: "path_fire_rain", 
                m: 45, f: -10, a: 10, c: -5, 
                r: "Du folgst den grünen Schildern. Draußen regnet es quer. Du stehst 45 Minuten frierend auf dem Parkplatz, während die Feuerwehr feststellt, dass es nur Popcorn war." 
            }
        ]
    },
    {
        id: "sq_fire_2a",
		char: "Egon",
        kind: "text",
        title: "Schneegestöber",
        reqStory: "path_fire_hero",
        text: "Der Rauch ist weg. Dafür ist die Küche jetzt komplett weiß gepudert. Hausmeister Egon steht in der Tür und wischt mit dem Finger über den staubigen Tisch. Er sieht dich vernichtend an.",
        opts: [
            { 
                t: "Stolz: 'Gefahr neutralisiert!'", 
                rep: { "Egon": -5 },
                m: 5, f: 0, a: -5, c: 5, 
                r: "'Das war eine Tüte Popcorn, Rambo!' Egon drückt dir einen Besen in die Hand. 'Du gehst hier nicht weg, bis das sauber ist.' Dein Heldenstatus bröckelt beim Fegen." 
            },
            { 
                t: "Flüchten: 'Hust, der Rauch...'",
                rep: { "Egon": -10 }, 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du täuschst eine Rauchvergiftung vor und wankst davon. Egon flucht hinter dir her. Er wird sich rächen (wahrscheinlich klemmt morgen dein Bürostuhl)." 
            }
        ]
    },
    {
        id: "sq_fire_2b",
        kind: "text",
        title: "Süße Beute",
        reqStory: "path_fire_loot",
        text: "Der Alarm ist vorbei. Du sitzt am Platz und mampfst die gestohlenen Kekse. Plötzlich kommt eine Rundmail vom Chefsekretariat: 'Wer hat während der Evakuierung das Catering für den Aufsichtsrat gestohlen?! Wir sichten die Kameras!'",
        opts: [
            { 
                t: "Kekse schnell aufessen (Beweise vernichten)", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "Du stopfst dir drei Kekse gleichzeitig in den Mund. Du verschluckst dich fast, aber die Beweise sind weg. Dein Magen rebelliert, dein Gewissen ist im Zuckerkoma." 
            },
            { 
                t: "Packung bei Kevin unterschieben",
                rep: { "Kevin": -10 },
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du legst die leere Packung auf Kevins Tisch. Kurz darauf hörst du Schreie aus seinem Büro. Das war böse. Sehr böse. Aber effektiv." 
            }
        ]
    },
    {
        id: "sq_fire_2c",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Networking im Nieselregen",
        reqStory: "path_fire_rain",
        text: "Draußen auf dem Parkplatz stehst du direkt neben Dr. Wichtig. Er friert im Hemd und zittert. Er hat dich bemerkt. Es gibt kein Entkommen vor dem Smalltalk.",
        opts: [
            { 
                t: "Jacke anbieten (Schleimen)", 
				rep: { "Dr. Wichtig": 10 },
                m: 10, f: -5, a: 15, c: -15, 
                r: "Du gibst ihm deine Jacke. Er nimmt sie dankbar an. 'Guter Mann, Müller.' Du frierst dir den Hintern ab und bist morgen garantiert krank, aber du hast Bonuspunkte gesammelt." 
            },
            { 
                t: "Witz machen: 'Schönes Wetter heute!'", 
				rep: { "Dr. Wichtig": -5 },
                m: 5, f: 0, a: -5, c: 10, 
                r: "Er starrt dich an, als wärst du irre. Wasser tropft von seiner Nase. 'Sehr witzig.' Er dreht sich weg. Das war unangenehm." 
            }
        ]
    },
    {
        id: "sq_usb_1",
        kind: "text",
        title: "Fundsache",
        text: "Auf dem Flur liegt ein USB-Stick mit der Aufschrift 'GEHEIM' und einem Totenkopf-Sticker. Er liegt genau im toten Winkel der Überwachungskamera.",
        opts: [
            { 
                t: "Sofort einstecken (Heimlich)", 
                loot: "usb_stick", 
                next: "path_usb_keep", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Mit einer fließenden Bewegung lässt du den Stick in deiner Tasche verschwinden. Niemand hat es gesehen. Er gehört jetzt dir. Aber was ist drauf?" 
            },
            { 
                t: "Am Empfang abgeben (Pflicht)", 
                next: "path_usb_gabi_fail", 
                rep: { "Gabi": 5 },
                m: 10, f: -5, a: 0, c: -5, 
                r: "Du bringst ihn zu Gabi. 'Oh, danke! 'Geheim'? Spannend! Ich guck mal schnell rein, wem der gehört, bevor ich ihn ins Fundbüro lege...'" 
            },
            { 
                t: "In den Müll kicken", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Ein gezielter Tritt befördert das Sicherheitsrisiko unter den Getränkeautomaten. Aus den Augen, aus dem Sinn." 
            }
        ]
    },
    {
        id: "sq_usb_2a",
        kind: "text",
        title: "Die Büchse der Pandora",
        reqStory: "path_usb_keep",
        text: "Du sitzt an deinem Platz und drehst den Stick in den Fingern. Die Aufschrift 'GEHEIM' brennt förmlich. Ist es die Kündigungsliste? Bitcoins? Oder nur Müll?",
        opts: [
            { 
                t: "Anschließen & Risikieren", 
                m: 15, f: 5, a: -5, c: 10, 
                r: "Die Neugier siegt. Du öffnest den Ordner. Es sind... 500 Seiten Fan-Fiction über Vampire, geschrieben von Dr. Wichtig?! 'Der Graf biss in den Hals der Buchhalterin.' Du hast jetzt mächtiges Erpressungsmaterial." 
            },
            { 
                t: "Formatieren & Behalten", 
                rem: "usb_stick", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Sicher ist sicher. Du löschst alles unwiederbringlich. Jetzt hast du einen leeren 64GB Stick für deine Urlaubsfotos. Langweilig, aber nützlich. (Item entfernt, Stick 'genutzt')" 
            }
        ]
    },
    {
        id: "sq_usb_2b",
		char: "Gabi",
        kind: "text",
        title: "Gabis Fehler",
        reqStory: "path_usb_gabi_fail",
        text: "Zehn Minuten später winkt dich Gabi hektisch zu sich. Sie ist kreidebleich. Aus ihren Lautsprechern dröhnt russische Techno-Musik. Auf dem Bildschirm tanzen halbnackte Skelette. 'Ich hab nur auf 'Rechnung.exe' geklickt! Mach das weg, bevor der Chef kommt!'",
        opts: [
            { 
                t: "Helfen: Stecker ziehen", 
                rep: { "Gabi": 5 },
                m: 5, f: -5, a: 10, c: 0, 
                r: "Du kriechst unter den Tisch und reißt das Stromkabel raus. Die Musik stirbt. Gabi atmet schwer. 'Das bleibt unter uns, okay? Hier, nimm einen Keks.'" 
            },
            { 
                t: "Lachen & Weggehen", 
                rep: { "Gabi": -10 },
                m: 2, f: 5, a: -5, c: 0, 
                r: "'Tja, IT-Sicherheitsschulung geschwänzt, Gabi?' Du lässt sie mit dem Techno-Problem allein. Sie wird dich dafür hassen, aber es sieht extrem lustig aus." 
            }
        ]
    },
    {
        id: "sq_printer_1",
        kind: "text",
        title: "PC LOAD LETTER",
        text: "Der Abteilungsdrucker blinkt panisch rot. Das Display meldet: 'SCHWERER PAPIERSTAU IN FACH 2'. Du öffnest Fach 2 – es ist leer. Gleichzeitig klingelt das Fax-Modul schrill wie ein altes Telefon, und aus dem Lautsprecher plärrt eine verzerrte Stimme: 'HALLO?! HÖREN SIE MICH?! ICH WILL MEINE ERBSEN!'",
        opts: [
            { 
                t: "Logik: Cyan nachfüllen (gegen Papierstau)", 
                next: "path_printer_leasing", 
                m: 10, f: -5, a: 5, c: 0, 
                r: "Du folgst der Drucker-Logik: Wenn er 'Papier' sagt, meint er 'Cyan'. Du fummelst eine Kartusche rein, die du im Schrank gefunden hast. Das Blinken hört auf. Vorerst." 
            },
            { 
                t: "Hörer abnehmen (Fax antworten)", 
                next: "path_printer_call", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du drückst die grüne Taste. 'Hier ist Müller?' - 'WER? ICH WILL DEN BOFROST-MANN!' Der Drucker fängt plötzlich an, ratternde Geräusche zu machen, als würde er das Gespräch verdauen." 
            },
            { 
                t: "Percussive Maintenance (Draufhauen)", 
                req: "hammer", 
                next: "path_printer_smash", 
                m: 2, f: 0, a: -20, c: 10, 
                r: "BÄM! Du gibst dem Leasing-Gerät einen massiven Kinnhaken mit dem Hammer. Das Klingeln hört auf. Plastik splittert. Das Display wird schwarz. Endlich Ruhe." 
            }
        ]
    },
    {
        id: "sq_printer_2a",
        kind: "text",
        title: "Die Leasing-Inquisition",
        reqStory: "path_printer_leasing",
        text: "Ein Mann in grauem Kittel steht vor dem Drucker. Auf seinem Rücken steht 'Print & Pray Solutions'. Er hält die Cyan-Kartusche hoch wie ein Beweisstück in einem Mordprozess. 'Wer hat diese nicht-zertifizierte Fremdtinte installiert? Das ist ein Verstoß gegen Paragraf 128 des Leasingvertrags. Ich muss das Gerät stilllegen.'",
        opts: [
            { 
                t: "Bestechen: 'Nehmen Sie den alten Toner?'", 
                m: 5, f: 0, a: 5, c: -5, 
                r: "Er schnüffelt an der alten Kartusche. 'Ist das Original HP High-Yield? ... Na gut. Ich drücke ein Auge zu. Aber drucken Sie nie wieder PDFs, das mag er nicht.'" 
            },
            { 
                t: "Ihn machen lassen (Stilllegung)", 
                m: 20, f: 10, a: -5, c: 10, 
                r: "Er rollt den Drucker auf einer Sackkarre weg. 'Ersatz kommt in 6-8 Wochen aus Übersee.' Die Kollegen starren dich an. Du hast das Drucken abgeschafft. Eigentlich ein Sieg für die Umwelt." 
            }
        ]
    },
    {
        id: "sq_printer_2b",
        kind: "text",
        title: "Der Papier-Tsunami",
        reqStory: "path_printer_call",
        text: "Du kommst zurück in den Flur. Der Boden ist bedeckt mit Papier. Der Drucker läuft auf Hochtouren und druckt unaufhörlich schwarze Seiten voller Nullen und Einsen. Er versucht offenbar, das Telefonat von vorhin zu transkribieren. Der Papierstapel erreicht bald die Decke.",
        opts: [
            { 
                t: "Stecker ziehen", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du killst den Strom. Der Drucker gibt ein letztes, trauriges Piepen von sich. Du stehst knöcheltief im Müll. Es ist vorbei." 
            },
            { 
                t: "Papier als Notizblöcke verteilen", 
                m: 15, f: -5, a: -5, c: 0, 
                r: "Recycling! Du bindest die Fehlprints zu Blöcken ('Matrix-Edition') und verteilst sie im Büro. Die Kollegen freuen sich über Gratis-Material. Kreative Problemlösung." 
            }
        ]
    },
    {
        id: "sq_printer_2c",
        kind: "text",
        title: "Das Smart-Upgrade",
        reqStory: "path_printer_smash",
        text: "An der Stelle des alten Druckers steht nun ein glänzendes, futuristisches Gerät: Der 'PrintHub 360 AI'. Er hat keine Knöpfe, nur einen riesigen Touchscreen. Darauf steht: 'Um zu drucken, schließen Sie bitte ein Abo ab. 19,99€ pro Seite (Schwarzweiß).'",
        opts: [
            { 
                t: "Abo abschließen (Firmenkarte)", 
				rep: { "Dr. Wichtig": -5 },
                m: 10, f: 0, a: 10, c: 20, 
                r: "Du buchst das 'Platinum-Enterprise-Paket'. Der Chef sieht die Abbuchung auf seinem Handy und bekommt Schnappatmung. Aber hey, er druckt jetzt (manchmal)!" 
            },
            { 
                t: "Schild 'DEFEKT' drankleben", 
                m: 2, f: 5, a: -5, c: 5, 
                r: "Du gibst auf. Die Zukunft ist zu dumm. Du empfiehlst den Kollegen 'Stift und Papier' und gehst Mittagessen." 
            }
        ]
    },
    {
        id: "sq_investigation",
        kind: "text",
        title: "Die verschwundene Maus",
        text: "Frau Erna vom Empfang ist aufgelöst. Ihre geliebte 'Glücksmaus' (ein graues Stofftier) ist weg. Der Hauptverdächtige ist Bello, der Büro-Hund, der unschuldig unter dem Schreibtisch hechelt und so tut, als könne er kein Deutsch.",
        opts: [
            { 
                t: "Detektiv spielen & Körbchen durchsuchen", 
                next: "path_investigation_thief", 
                m: 30, f: -10, a: 10, c: -10, 
                r: "Du wühlst dich durch sein Sabber-Nest. Aha! Zwischen einem Knochen und einem alten Socken findest du die Maus. Sie ist nass und eklig. Erna ist überglücklich, Bello knurrt dich leise an. Du hast ihm sein Spielzeug geklaut." 
            },
            { 
                t: "Bello verhören (Anbellen)", 
                next: "path_investigation_leader", 
                m: 5, f: 10, a: -10, c: 10, 
                r: "Du gehst auf alle Viere und bellst ihn laut an: 'WAU! WO IST SIE?!'. Bello ist erst verwirrt, wedelt dann aber begeistert. Der Chef kommt vorbei: 'Müller... alles okay?'. Egal, du hast jetzt den Respekt des Hundes." 
            },
            { 
                t: "Neue Maus aus dem Lager holen", 
                next: "path_investigation_bored", 
                m: 5, f: -5, a: 0, c: 0, 
                r: "Du holst einfach eine neue Werbe-Maus aus dem Schrank. Erna nimmt sie zögernd. 'Es ist nicht dasselbe... aber danke.' Bello gähnt. Ihm ist langweilig." 
            }
        ]
    },
    {
        id: "sq_investigation_2a",
        kind: "text",
        title: "Die Geiselnahme",
        reqStory: "path_investigation_thief",
        text: "Du willst drucken, aber Bello liegt *auf* dem Drucker. Er knurrt, wenn du dich näherst. Er fordert offensichtlich Ersatz für die konfiszierte Glücksmaus. Das Papierfach ist seine Geisel.",
        opts: [
            { 
                t: "Ihm einen Donut opfern", 
                rem: "donut", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du legst den Donut auf den Boden. Bello springt runter und inhaliert das Gebäck. Der Weg zum Drucker ist frei. Bestechung funktioniert auch bei Tieren." 
            },
            { 
                t: "Ihn mit dem Laserpointer weglocken", 
                m: 10, f: 5, a: 0, c: 0, 
                r: "Du lässt den roten Punkt durch den Flur tanzen. Bello dreht durch, rutscht auf dem Parkett aus und jagt den Punkt bis ins Marketing. Der Drucker gehört wieder dir." 
            },
            { 
                t: "Chef rufen: 'Der Hund sabotiert die Arbeit!'", 
			    rep: { "Dr. Wichtig": 2 },	
                m: 15, f: 0, a: 20, c: 5, 
                r: "Der Chef kommt, sieht den Hund und sagt mit Babystimme: 'Na wer ist denn da ein feiner Drucker-Wächter? Ja wer denn?' Er krault Bello 10 Minuten lang. Du kriegst deinen Ausdruck nicht." 
            }
        ]
    },
    {
        id: "sq_investigation_2b",
        kind: "text",
        title: "Beute für das Alpha-Tier",
        reqStory: "path_investigation_leader",
        text: "Bello kommt schwanzwedelnd in dein Büro. Er sieht dich als Rudelführer. Er legt dir stolz seine neueste 'Beute' auf die Füße: Einen teuren, italienischen Herrenschuh. Er ist vollgesabbert und leicht angekaut. Er gehört definitiv dem Chef.",
        opts: [
            { 
                t: "Schuh heimlich unter das Sofa kicken", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du lässt das Beweisstück verschwinden. Bello guckt enttäuscht, holt den Schuh aber sofort wieder hervor. Er will 'Hol Stöckchen' spielen. Mit einem 500€-Schuh." 
            },
            { 
                t: "Bello loben: 'Feiner Junge!'", 
                m: 10, f: 10, a: -20, c: 20, 
                r: "Du kraulst ihn. Bello ist so glücklich, dass er losrennt und auch den *zweiten* Schuh holt. Jetzt hast du das Paar komplett. Wenn der Chef jetzt reinkommt, bist du tot." 
            },
            { 
                t: "Tatort reinigen (Schuh putzen)", 
                m: 20, f: -10, a: 5, c: -5, 
                r: "Du versuchst panisch, den Sabber mit Taschentüchern zu entfernen. Du stellst den Schuh nachts heimlich vor die Cheftür. Das war knapp." 
            }
        ]
    },
    {
        id: "sq_investigation_2c",
        kind: "text",
        title: "Markierarbeiten",
        reqStory: "path_investigation_bored",
        text: "Weil niemand mit ihm gespielt hat, hat Bello sich selbst beschäftigt. Er steht im Serverraum (Tür war offen) und hebt das Bein an Rack 3. Das ist der Haupt-Switch.",
        opts: [
            { 
                t: "Hechtsprung, um den Strahl abzufangen", 
                m: 5, f: -5, a: 10, c: -10, 
                r: "Du wirfst dich dazwischen. Deine Hose ist nass (und warm), aber der 10.000€-Switch ist trocken. Du bist ein Held, aber du riechst streng." 
            },
            { 
                t: "Laut klatschen & 'PFUI!' schreien", 
                m: 2, f: 0, a: 10, c: -5, 
                r: "Bello erschrickt, kneift den Schwanz ein und rennt weg. Ein paar Tropfen haben das Gehäuse getroffen, aber nichts Kritisches. Du musst wischen." 
            },
            { 
                t: "Filmen für YouTube", 
                m: 5, f: 10, a: -10, c: 50, 
                r: "Du hältst drauf. *ZISCH-BRUTZEL*. Der Switch fällt aus. Das Video 'Dog vs Internet' geht viral. Du verlierst deinen Job, wirst aber Influencer." 
            }
        ]
    },
    {
        id: "sq_loose_cable",
        kind: "text",
        title: "Die Stolperfalle",
        text: "Im Flur liegt ein graues LAN-Kabel quer über dem Weg. Es sieht gefährlich aus. Dr. Wichtig kommt gleich hier lang und schaut auf sein Handy.",
        opts: [
            { 
                t: "Sichern: Mit Tape festkleben", 
                req: "tape", 
                next: "path_cable_stuck",
                rep: { "Dr. Wichtig": 2 },					
                m: 5, f: -5, a: 0, c: -5, 
                r: "Du wickelst ordentlich Panzertape drüber. Das bewegt sich keinen Millimeter mehr. Unfallverhütungsvorschrift: Erfüllt. Du fühlst dich vorbildlich." 
            },
            { 
                t: "Mitnehmen (Fundsache)", 
                loot: "cable", 
                next: "path_cable_missing",			
                m: 5, f: 5, a: 0, c: 10, 
                r: "Zack, eingesteckt. 'Wer das hier liegen lässt, braucht es wohl nicht.' Du hast jetzt ein langes Kabel. Inventar +1." 
            },
            { 
                t: "Liegen lassen & zusehen", 
                m: 2, f: 10, a: 5, c: -5, 
                r: "Der Chef steigt elegant drüber, ohne aufzublicken. Du bist enttäuscht. Keine Action." 
            }
        ]
    },
    {
        id: "sq_loose_cable_2a",
        kind: "text",
        title: "Bombenfest",
        reqStory: "path_cable_stuck",
        text: "Ein externer Techniker steht kniend im Flur und flucht. 'Wer hat mein Mess-Kabel hier einbetoniert?! Das war nur temporär! Ich krieg das nicht ab, ohne den Teppich rauszureißen!' Er zerrt vergeblich am Panzertape.",
        opts: [
            { 
                t: "Mit einem Teppichmesser helfen", 
                m: 20, f: -10, a: 5, c: -5, 
                r: "Ihr schneidet das Kabel gemeinsam aus dem Boden. Der Teppich hat jetzt einen hässlichen Riss. 'Sagen wir einfach, das war Verschleiß', meint der Techniker." 
            },
            { 
                t: "Belehren: 'Safety First!'", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "'Stolperfallen sind verboten!' Der Techniker starrt dich hasserfüllt an. Er schneidet das Kabel einfach an beiden Enden ab und lässt den Rest kleben. Ein Denkmal für die Ewigkeit." 
            }
        ]
    },
    {
        id: "sq_loose_cable_2b",
        kind: "text",
        title: "Blinder Fleck",
        reqStory: "path_cable_missing",
        text: "Ein Mann von 'Secure & Safe' läuft suchend umher. 'Verdammt! Wo ist das Patchkabel? Ich sollte hier die neue 4K-Überwachungskamera für den Chef installieren! Er will sehen, wer immer früher geht!' Ohne Kabel kein Bild.",
        opts: [
            { 
                t: "Zurückgeben: 'Habe ich gefunden'", 
                rem: "cable", 
				rep: { "Dr. Wichtig": 2 },					
                m: 5, f: -5, a: 10, c: -10, 
                r: "Du gibst es ihm. Er montiert die Kamera. Sie zeigt jetzt direkt auf DEINE Bürotür. Der Chef sieht alles. Du hast dir selbst ins Knie geschossen." 
            },
            { 
                t: "Lügen: 'Bestimmt die Putzkolonne'", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "'Mist. Dann muss ich morgen wiederkommen.' Er packt die Kamera wieder ein. Du hast der Belegschaft (und dir) einen weiteren Tag Freiheit erkauft. Held!" 
            }
        ]
    },
    {
        id: "sq_package_open_1",
        kind: "text",
        title: "Die Festung aus Pappe",
        text: "Ein Paket für die IT liegt auf deinem Tisch. Der Absender war offensichtlich paranoid und hat eine komplette Rolle Panzertape verbraucht. Es gibt keine Lasche, keinen Anfang, nur glatte, braune Unendlichkeit.",
        opts: [
            { 
                t: "Chirurgischer Eingriff (Schraubendreher)", 
                req: "screw", 
                next: "path_package_stink", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "Mit der Präzision eines Serienmörders stichst du durch die Schichten. Ratsch. Offen. Inhalt: 50 billige Werbe-Mauspads aus China, die stark nach einem Chemieunfall riechen." 
            },
            { 
                t: "Brutale Gewalt mit dem Haustürschlüssel", 
                next: "path_package_toner", 
                m: 10, f: -5, a: 10, c: 0, 
                r: "Du säbelst wild am Klebeband herum, bis der Karton nachgibt. Dein Schlüssel ist jetzt um 45 Grad verbogen, aber das Paket ist offen. Drinnen: Eine XXL-Toner-Kartusche." 
            },
            { 
                t: "Den Karton gegen die Wand pfeffern", 
                next: "path_package_glass", 
                m: 5, f: 5, a: -20, c: 10, 
                r: "KRACH! Das Paket platzt auf wie eine reife Melone. Leider war es die Lieferung der neuen 'Magic Glass Trackpads' für den Vorstand. Das Geräusch von splitterndem Glas ist irgendwie... befriedigend." 
            }
        ]
    },
    {
        id: "sq_package_open_2a",
        kind: "text",
        title: "Der Chemie-Unfall",
        reqStory: "path_package_stink",
        text: "Der Gestank der 50 Gummimappen breitet sich im Büro aus. Es riecht nach verbranntem Reifen und Kopfschmerzen. Kollegen fangen an zu husten. Chantal fragt, ob wir renovieren.",
        opts: [
            { 
                t: "Als 'Aromatherapie' verteilen", 
				rep: { "Dr. Wichtig": -2 },	
                m: 15, f: -10, a: 5, c: 5, 
                r: "Du läufst rum und legst jedem ein Pad hin. Arbeit ist Arbeit. Nach 10 Minuten sind alle high von den Dämpfen und kichern albern. Der Chef fragt, warum keiner arbeitet." 
            },
            { 
                t: "Eine Gummi-Burg bauen", 
                m: 10, f: 10, a: -10, c: 10, 
                r: "Du stapelst die Pads um deinen Monitor. Du sitzt jetzt in einem stinkenden Iglu. Niemand kommt dir mehr näher als 2 Meter. Herrliche Ruhe, aber du arbeitest nicht." 
            },
            { 
                t: "Aus dem Fenster werfen", 
                m: 5, f: 0, a: -5, c: 20, 
                r: "Du frisbeest die Dinger einzeln aus dem 4. Stock. Unten beschwert sich der Sicherheitsdienst über 'giftigen Regen'. Aber die Luft ist rein." 
            }
        ]
    },
    {
        id: "sq_package_open_2b",
        kind: "text",
        title: "Schlüsselmoment",
        reqStory: "path_package_toner",
        text: "Du willst den Toner ins Lager bringen, aber du hast ihn wohl mit dem Schlüssel angestochen. Eine feine Spur aus schwarzem Pulver rieselt hinter dir her. Und dein Haustürschlüssel sieht aus wie ein Korkenzieher.",
        opts: [
            { 
                t: "Loch mit Finger zuhalten", 
				rep: { "Dr. Wichtig": 2 },	
                m: 10, f: -5, a: 10, c: -10, 
                r: "Du rennst zum Drucker. Dein Finger ist jetzt permanent schwarz. Du siehst aus, als hättest du nekrotisches Gewebe. Aber der Toner ist gerettet und der Chef muss keinen neuen kaufen." 
            },
            { 
                t: "Schlüssel im Schloss geradebiegen", 
                m: 30, f: 10, a: 20, c: 0, 
                r: "Du steckst den krummen Schlüssel in deine Bürotür und drückst. KNACK. Abgebrochen. Jetzt kommst du heute Abend nicht in deine Wohnung UND nicht aus dem Büro. Perfekt." 
            },
            { 
                t: "Toner schütteln (vielleicht hilft's?)", 
				rep: { "Dr. Wichtig": -5 },	
                m: 5, f: 0, a: 20, c: 20, 
                r: "PUFF! Die Kartusche explodiert in einer schwarzen Wolke. Du siehst aus wie ein Schornsteinfeger aus dem 19. Jahrhundert. Der Chef fragt, ob das 'Blackfacing' ist. Abmahnungsgefahr." 
            }
        ]
    },
    {
        id: "sq_package_open_2c",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Das Puzzle für Manager",
        reqStory: "path_package_glass",
        text: "Der Chef kommt freudig rein. 'Ist mein Magic Trackpad da? Das Paket lag doch bei Ihnen!' Du deutest auf den Haufen aus Glasstaub und Elektronikschrott in der Ecke.",
        opts: [
            { 
                t: "Behaupten: 'Das ist ein Bausatz!'", 
                m: 10, f: 5, a: 0, c: -5, 
                r: "'Das ist die IKEA-Edition, Chef. Fördert die Motorik.' Er guckt skeptisch, nimmt die Schachtel mit den Scherben aber mit. Er ist beschäftigt, also sinkt dein Radar." 
            },
            { 
                t: "Lügen: 'Das ist Liquid Glass Technologie'", 
				rep: { "Dr. Wichtig": 5 },	
                m: 5, f: 10, a: -5, c: -15, 
                r: "'Das muss so. Einfach auf den Tisch schütten und warten.' Der Chef nickt tief beeindruckt: 'Die Zukunft ist verrückt.' Er geht glücklich. Du bist ein Genie." 
            },
            { 
                t: "Mit Panzertape kleben", 
				req: "tape", 
                rep: { "Dr. Wichtig": -5 },	
				m: 20, f: -10, a: 0, c: -20, 
                r: "Du wickelst den Schrott in Tape ein. Es sieht aus wie eine Kartoffel. 'Hier, Chef. Ein Prototyp aus dem Silicon Valley.' Er drückt drauf rum. 'Ergonomisch!', sagt er begeistert. Voller Erfolg." 
            }
        ]
    },
    {
        id: "sq_shelf_1",
        kind: "text",
        title: "Der schiefe Turm von Toner",
        text: "Im Lager neigt sich das Schwerlastregal mit den teuren Lasertonern bedrohlich zur Seite. Ein falscher Windhauch, und es gibt eine 5.000-Euro-Explosion aus feinem, schwarzem Staub.",
        opts: [
            { 
                t: "Quick-Fix: Kabelbinder-Orgie", 
                req: "zip_ties", 
                next: "path_shelf_iso", 
                m: 10, f: -5, a: 0, c: 0, 
                r: "Du zurrst das Regal mit einem Dutzend Kabelbindern an ein Heizungsrohr. Es sieht aus wie Bondage für Möbel, aber es steht bombenfest. Nichts hält länger als ein Provisorium." 
            },
            { 
                t: "Handwerklich korrekt dübeln", 
                next: "path_shelf_bauamt", 
                m: 60, f: -20, a: 15, c: -5, 
                r: "Du holst die Schlagbohrmaschine. 60 Minuten Lärm, Staub und Schweiß. Das Regal steht jetzt perfekt im Lot. Keiner bemerkt es, keiner dankt es dir, aber du hast Rückenschmerzen." 
            },
            { 
                t: "Haftungsausschluss: Warnzettel kleben", 
                next: "path_shelf_a38", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du kritzelst 'VORSICHT! EINSTURZGEFAHR!' auf ein Post-It, pappst es an den Holm und gehst zufrieden Mittagessen. Juristisch bist du damit aus dem Schneider. Die Physik interessiert das aber nicht." 
            }
        ]
    },
    {
        id: "sq_shelf_2a",
        kind: "text",
        title: "ISO-Zertifizierung 9001",
        reqStory: "path_shelf_iso",
        text: "Der Sicherheitsbeauftragte steht vor deiner Kabelbinder-Konstruktion. Er tippt auf sein Klemmbrett. 'Das ist eine *Nicht-permanente Lastensicherung an thermischen Leitern*. Dafür brauche ich das Formblatt Z-12 für polymere Verbindungen und den Nachweis der Hitzebeständigkeit nach DIN 4102.'",
        opts: [
            { 
                t: "Behaupten: 'Das sind Luftfahrt-Binder'", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "'Spezialanfertigung der NASA, Herr Inspektor.' Er blinzelt. 'Ach so. Na dann... tragen Sie das bitte nachträglich in Anlage 4b ein.' Er macht einen Haken. Kompetenz durch Lügen." 
            },
            { 
                t: "Formular Z-12 suchen und ausfüllen", 
                m: 45, f: -10, a: 20, c: 0, 
                r: "Du verbringst 45 Minuten damit, die Zugfestigkeit von Plastik zu googeln und ein sinnloses Formular auszufüllen. Der Inspektor locht es ab, ohne es zu lesen. 'Ordnung muss sein.'" 
            }
        ]
    },
    {
        id: "sq_shelf_2b",
        kind: "text",
        title: "Antrag auf bauliche Veränderung",
        reqStory: "path_shelf_bauamt",
        text: "Facility Management hat das Bohrloch entdeckt. 'Haben Sie etwa in die *Brandschutzwand F90* gebohrt?! Ohne den 'Antrag auf Durchdringung von Feuerwiderstandsklassen' (dreifacher Durchschlag, rosa)?! Das muss sofort zurückgebaut und verputzt werden!'",
        opts: [
            { 
                t: "Bürokratie-Konter: 'Das war Gefahr im Verzug!'", 
                m: 10, f: 0, a: 5, c: 0, 
                r: "Du zitierst Arbeitsschutzgesetz §9. 'Ich habe Leben gerettet!' Der Facility-Typ wird unsicher. 'Na gut. Aber reichen Sie Formular 'Heldenmut im Amt' nach.' Puh." 
            },
            { 
                t: "Dübel rausziehen & Kaugummi rein", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du entfernst die Schraube. Das Regal wackelt wieder. Du stopfst Kaugummi ins Loch und malst mit Tipp-Ex drüber. 'Welches Loch? Ich sehe kein Loch.' Problem vertagt." 
            }
        ]
    },
    {
        id: "sq_shelf_2c",
        kind: "text",
        title: "Das Haus, das Verrückte macht",
        reqStory: "path_shelf_a38",
        text: "Das Regal wurde vom TÜV gesperrt ('Rotes Band'). Um ein neues zu bestellen, brauchst du den **Passierschein A38**. Die Beschaffungsstelle sagt: 'A38 gibt es beim Facility Management.' Facility sagt: 'Nein, A38 macht die Buchhaltung.' Die Buchhaltung sagt: 'A38? Das wurde durch das blaue Formular B-65 ersetzt, aber das gibt es nur beim Pförtner.'",
        opts: [
            { 
                t: "Zum Pförtner gehen (Die Quest annehmen)", 
                m: 60, f: -20, a: 50, c: -10, 
                r: "Du rennst 60 Minuten durchs Haus. Pförtner -> Poststelle -> Betriebsrat -> Kantine. Am Ende hast du Formular **A39** ('Antrag auf Erteilung eines Antrags'). Du brichst weinend zusammen. Das Regal bleibt kaputt." 
            },
            { 
                t: "Selbstjustiz: Regal bei IKEA kaufen & heimlich hinstellen", 
                m: 30, f: -5, a: -10, c: 10, 
                r: "Du umgehst die Bürokratie, kaufst ein Billy-Regal von deinem eigenen Geld und baust es nachts auf. Niemand stellt Fragen. Du hast das System besiegt, aber bist 30€ ärmer." 
            },
            { 
                t: "Den Chef fragen: 'Haben Sie A38?'",
				rep: { "Dr. Wichtig": -2 },	
                m: 5, f: 0, a: 10, c: 20, 
                r: "Der Chef starrt dich an. 'Müller, nehmen Sie keine Drogen während der Arbeitszeit.' Er reißt das Absperrband einfach ab. 'So. Problem gelöst.' Manchmal ist der Chef nützlich." 
            }
        ]
    },
    {
        id: "sq_noise_1",
        kind: "text",
        title: "Operation: Kieselstein",
        text: "Draußen spielt sich eine Szene wie aus 'Transformers' ab. Ein Schwerlast-Konvoi hat einen Bagger in der Größe eines Einfamilienhauses abgeladen. Dazu drei Presslufthammer und ein Gerät, das aussieht wie ein Laser-Bohrer. Das Ziel dieser Armada: Ein 5cm kleines Schlagloch im Gehweg. Der Boden bebt.",
        opts: [
            { 
                t: "Technik-Lösung: Kopfhörer auf", 
                req: "headphones", 
                next: "path_noise_zen", 
                m: 2, f: 5, a: -20, c: 0, 
                r: "Klick. Noise-Cancelling auf 'Maximum'. Der Weltuntergang draußen wird zu einem sanften Vibrieren in deinem Hintern. Du arbeitest im Auge des Sturms." 
            },
            { 
                t: "Physik-Lösung: Fenster zu", 
                next: "path_noise_sauna", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du rammst das Fenster zu. Der Lärm wird dumpfer, aber die Vibrationen lassen deine Taffe auf dem Tisch wandern. Die Luft im Büro wird sofort stickig." 
            },
            { 
                t: "Sozial-Lösung: Rausbrüllen", 
                next: "path_noise_foreman", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du öffnest das Fenster und schreist gegen den Lärm an: 'BRAUCHT IHR DAFÜR ECHT DEN TODESSTERN?! DAS IST EIN LOCH, KEIN KRATER!' Der Vorarbeiter schaut hoch." 
            }
        ]
    },
    {
        id: "sq_noise_2a",
        kind: "text",
        title: "Das Erwachen",
        reqStory: "path_noise_zen",
        text: "Du nimmst die Kopfhörer ab, weil dein Monitor wackelt. Draußen ist Stille. Du schaust raus. Das Schlagloch ist weg. Der Gehweg auch. Da ist jetzt einfach ein riesiger Krater, in dem der Bagger steckt. Ein Arbeiter kratzt sich am Kopf.",
        opts: [
            { 
                t: "Vorhang zu", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Was man nicht sieht, ist nicht passiert. Du machst die Jalousie runter und arbeitest im Dunkeln weiter." 
            },
            { 
                t: "Foto machen", 
				rep: { "Dr. Wichtig": -2 },	
                m: 5, f: 10, a: -5, c: 5, 
                r: "Das glaubt dir keiner. '#GermanEngineering'. Der Chef sieht dich am Fenster: 'Müller, dokumentieren Sie den Baufortschritt oder arbeiten Sie?'" 
            }
        ]
    },
    {
        id: "sq_noise_2b",
        kind: "text",
        title: "Die Rüttelplatte",
        reqStory: "path_noise_sauna",
        text: "Draußen haben sie jetzt die 'Mega-Rüttelplatte 3000' angeworfen. Dein ganzer Körper vibriert. Deine Zähne klappern. Auf dem Monitor verschwimmen die Excel-Zeilen. Es ist unmöglich zu tippen.",
        opts: [
            { 
                t: "Im Takt tippen", 
                m: 10, f: -5, a: 10, c: 0, 
                r: "Du versuchst, die Vibrationen auszugleichen. Das Ergebnis: 'Sseeehr geeeehhhrter Heeerrrr...'. Du gibst entnervt auf." 
            },
            { 
                t: "Aufgeben und Pause machen", 
				rep: { "Dr. Wichtig": -2 },	
                m: 15, f: 10, a: -10, c: 10, 
                r: "Du gehst in die Küche (andere Gebäudeseite). Dort wackelt nur das Wasser im Glas. Der Chef fragt: 'Flüchten Sie?' Du nickst nur stumm." 
            }
        ]
    },
    {
        id: "sq_noise_2c",
        kind: "text",
        title: "Budget-Planung",
        reqStory: "path_noise_foreman",
        text: "Der Vorarbeiter brüllt fröhlich zurück: 'MUSS WEG! WIR HABEN NOCH BUDGET FÜR DIESES JAHR! WENN WIR DEN DIESEL NICHT VERBRAUCHEN, KRIEGEN WIR NÄCHSTES JAHR WENIGER! WOLLEN SIE AUCH MAL BAGGERN?'",
        opts: [
            { 
                t: "Angebot annehmen: 'Ja, will ich!'", 
				rep: { "Dr. Wichtig": -15 },	
                m: 30, f: 20, a: -50, c: 20, 
                r: "Du rennst runter. 20 Minuten später sitzt du im Führerhaus und gräbst den Vorgarten der Firma um. Der Chef schaut fassungslos aus dem Fenster. Das war es wert." 
            },
            { 
                t: "Kopfschüttelnd ablehnen", 
                m: 2, f: 0, a: 10, c: 0, 
                r: "Du schließt das Fenster. Bürokratie in ihrer reinsten Form. Dein Glaube an die Menschheit sinkt um 10 Punkte." 
            }
        ]
    },
    {
        id: "sq_loot_crate_1",
        kind: "text",
        title: "Die 'Zu Verschenken' Kiste",
        text: "Jemand hat eine Kiste mit der Aufschrift 'ZU VERSCHENKEN' in den Flur gestellt. Ein Biotop aus Staub, alten Kabeln und vergessenen Büroträumen.",
        opts: [
            { 
                t: "Das schwere 'Buch' bergen", 
                loot: "manual", 
                next: "loot_crate_taken",
                m: 10, f: 5, a: 0, c: 0, 
                r: "Du ziehst es aus dem Stapel. Es ist... ein 'Windows 95 Handbuch'! Antikes Wissen für echte Kenner." 
            },
            { 
                t: "Mutig in den Kabelsalat greifen", 
                loot: "cable", 
                next: "loot_crate_taken",
                m: 10, f: 5, a: 0, c: 0, 
                r: "Du kämpfst mit dem Knoten und gewinnst! Ein langes, graues LAN-Kabel gehört jetzt dir." 
            },
            { 
                t: "Blind nach dem roten 'Ding' wühlen",
                loot: "stressball", 
                next: "loot_crate_taken",
                m: 10, f: 5, a: 0, c: 0, 
                r: "Igit... was ist das? Ach, nur ein alter Wut-Ball! Er ist etwas klebrig, aber drückbar." 
            },
            { 
                t: "Das silberne Glitzern untersuchen", 
                loot: "tape", 
                next: "loot_crate_taken",
                m: 10, f: 5, a: 0, c: 0, 
                r: "Der heilige Gral der Reparatur! Eine fast volle Rolle Panzertape. Damit kannst du das Universum flicken." 
            }
        ]
    },
    {
        id: "sq_loot_crate_2",
		char: "Egon",
        kind: "text",
        title: "Der Sammler",
        reqStory: "loot_crate_taken",
        text: "Hausmeister Egon fängt dich im Flur ab. Er wirkt begeistert. 'Hömma! Ich hab gesehen, du hast dir was aus der Kiste geangelt! Endlich einer mit Geschmack! Ich räume gerade das Archiv von 1998 aus. Ich hab da noch 500 Kilo Nadeldrucker-Papier und Disketten-Boxen. Willste das auch haben? Sonst muss ich das entsorgen!'",
        opts: [
            { 
                t: "Ja! Ich nehme alles! (Stöbern)", 
                rep: { "Egon": 10 },
                m: 30, f: 10, a: -10, c: 0, 
                r: "Du folgst Egon in den Keller. Ihr verbringt eine halbe Stunde damit, in uralter Hardware zu wühlen. Du nimmst nichts mit, aber Egon ist glücklich, dass jemand seinen 'Schatz' gewürdigt hat. Retro-Feeling pur." 
            },
            { 
                t: "Äh... nein danke, das reicht.", 
                rep: { "Egon": -5 },
                m: 2, f: 0, a: 0, c: 0, 
                r: "Egons Lächeln verschwindet sofort. 'Banause. Die Jugend von heute weiß nichts mit gutem Endlospapier anzufangen.' Er schlurft beleidigt davon." 
            }
        ]
    },
    {
        id: "sq_chair_1",
        kind: "text",
        title: "Der Chefsessel",
        text: "Der Chef hat einen neuen 'Ergonomic 3000'. Sein alter Ledersessel steht einsam auf dem Flur beim Sperrmüll. Das Leder ist abgewetzt, aber die Polsterung ist immer noch Klassen besser als dein aktueller 'Beton-Stuhl'.",
        opts: [
            { 
                t: "Ganzen Stuhl retten & tapen", 
                req: "tape", 
                next: "path_chair_new", 
                m: 20, f: 10, a: -20, c: 0, 
                r: "Du schleifst das Monstrum in dein Büro. Eine Rolle Panzertape für die lockere Armlehne und er ist wie neu. Mad-Max-Optik, aber S-Klasse-Komfort." 
            },
            { 
                t: "Nur die Luxus-Rollen klauen", 
                req: "screw", 
                next: "path_chair_new", 
                m: 10, f: 5, a: -10, c: 0, 
                r: "Du schraubst die High-End-Skater-Rollen ab und montierst sie unter deinen Stuhl. Endlich nicht mehr über Teppichkanten stolpern!" 
            },
            { 
                t: "Ignorieren (Mein Rücken ist aus Stahl)", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du gehst weiter. Später am Tag bekommst du Ischias. Selbst schuld." 
            }
        ]
    },
    {
        id: "sq_chair_2",
        kind: "text",
        title: "Thron-Nachfolge",
        reqStory: "path_chair_new",
        text: "Ahhh. Das Sitz-Upgrade macht sich bemerkbar. Du gleitest lautlos durchs Büro und wippst entspannt. Deine Aggressivität verpufft. Einziges Manko: Überall kleben noch hartnäckige 'Paw Patrol'-Sticker vom Sohn des Chefs. Marshall der Feuerwehrhund starrt dich von der Armlehne an.",
        opts: [
            { 
                t: "Egal: 'Ich bin jetzt Teil der Paw Patrol'", 
                m: 10, f: 10, a: -20, c: 0, 
                r: "Du drehst dich lachend im Kreis. 'Wuff wuff, Rettung naht!' Die Kollegen gucken komisch, aber du bist zu entspannt, um dich zu schämen. Das Leben ist gut." 
            },
            { 
                t: "Versuchen, die Sticker abzuknibbeln", 
                m: 15, f: -5, a: 5, c: 0, 
                r: "Du kratzt mit dem Fingernagel an den Stickern. Es bleiben hässliche weiße Papierfetzen und Klebereste zurück. Jetzt sieht es schlimmer aus als vorher. Mist." 
            }
        ]
    },
    {
        id: "sq_janitor_talk",
		char: "Egon",
        kind: "text",
        title: "Raucherpause mit Egon",
        text: "Du triffst Hausmeister Egon am Hintereingang. Er kämpft mit seinem Feuerzeug und flucht über 'diese neumodische Technik'.",
        opts: [
            { 
                t: "Ihm Feuer geben & zuhören", 
                rep: { "Egon": 5 },
                m: 10, f: 5, a: -5, c: 0, 
                r: "Er zieht tief an der Zigarette. 'Danke Jung. Diese digitalen Schlösser machen mich fertig! Ich hab das vom Papierlager im Keller jetzt einfach auf 0-0-0-0 gestellt. Aber sags keinem!'" 
            },
            { 
                t: "Schnell weitergehen", 
                rep: { "Egon": -2 },
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du hast keine Zeit für seine Geschichten. Du nickst nur kurz und gehst." 
            }
        ]
    },
    {
        id: "sq_archive_find",
        kind: "text",
        title: "Im Archiv",
        text: "Du suchst Druckerpapier im Archiv. Dabei fällt dir der Ordner 'Steuererklärung 1990' auf. Er ist ungewöhnlich dick. Du guckst rein: Er ist voller 'Mon Chéri' Pralinen. Das Geheimversteck von Sekretärin Gabi!",
        opts: [
            { 
                t: "Eine stibitzen & Klappe halten", 
                loot: "donut", 
                next: "path_archive_stolen",
                rep: { "Gabi": -2 }, 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du schiebst dir eine in den Mund. Schmeckt nach billigem Weinbrand und Staub. Aber du weißt jetzt, wo der Vorrat liegt." 
            },
            { 
                t: "Ordner zurückstellen", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Du lässt Gabi ihren Schatz. Diskretion ist Ehrensache. Wer weiß, wie lange die da schon liegen..." 
            }
        ]
    },
    {
        id: "sq_archive_find_2a",
		char: "Gabi",
        kind: "text",
        title: "CSI: Buchhaltung",
        reqStory: "path_archive_stolen",
        text: "Zehn Minuten später steht Gabi in deiner Bürotür. Sie trägt Latexhandschuhe. Mit einer Pinzette hält sie ein winziges, zerknülltes Stück rosa Alufolie hoch. 'Beweisstück A. Gefunden in Ihrem Papierkorb. Korrespondiert exakt mit der Fehlmenge im Ordner 'Steuer 1990'. Der Kirschlikör-Geruch in Ihrer Atemluft bestätigt den Verdacht.'",
        opts: [
            { 
                t: "Geständnis: 'Es war Notwehr (Unterzucker)'", 
                rep: { "Gabi": 5 },
                m: 5, f: 0, a: -5, c: 0, 
                r: "Gabi senkt die Pinzette. 'Na gut. Aber das nächste Mal füllen Sie Formular S-Ü-S (Sonderentnahme Süßwaren) aus! Ordnung muss sein!'" 
            },
            { 
                t: "Bestechen: 'Ich kaufe dir eine neue Packung'", 
                rep: { "Gabi": -5 },
                m: 5, f: 0, a: 5, c: 0, 
                r: "Gabi schnaubt verächtlich. 'Eine neue? Die im Ordner reifen seit 30 Jahren! Das Aroma ist unwiederbringlich zerstört!' Sie geht beleidigt, aber du bist davongekommen." 
            }
        ]
    },
    {
        id: "sq_sad_manager",
        kind: "text",
        title: "Der Zusammenbruch",
        text: "Im Flur steht der Projektleiter. Er starrt gegen die Wand und wirkt völlig apathisch. Er reagiert nicht, als du vorbeigehst.",
        opts: [
            { 
                t: "Schulter klopfen: 'Kopf hoch!'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Er zuckt zusammen. 'Lassen Sie mich einfach in Ruhe.' Leere Phrase, keine Wirkung." 
            },
            { 
                t: "Flüstern: 'Ein Schritt vor, zwei zurück...'",
                m: 5, f: 5, a: -10, c: 0, 
                r: "Seine Augen leuchten kurz auf. Er richtet sich auf, nimmt Haltung an. 'Tango... ja. Die Leidenschaft. Sie haben Recht. Ich muss heute Abend wieder zum Kurs.' Er nickt dir dankbar zu." 
            },
            { 
                t: "Brüllen: 'TSCHAKKA! MINDSET!'",
                m: 5, f: 0, a: 15, c: 10, 
                r: "Er dreht sich langsam um und funkelt dich böse an. 'Gehen Sie weg. Bevor ich etwas tue, was das HR nicht erlaubt.' Das war wohl zu viel." 
            }
        ]
    },
    {
        id: "sq_toner_trap",
		char: "Frau Elster",
        kind: "text",
        title: "Die Toner-Falle",
        text: "Frau Elster aus der Buchhaltung winkt dich hektisch zum Kopierer. 'Da klemmt was! Ich trau mich nicht ran, Sie sind doch der Technik-Profi!' Sie tritt auffällig weit zurück und hält sich die Hände vor das weiße Kostüm.",
        opts: [
            { 
                t: "Heldenmut: Klappe öffnen", 
                next: "path_toner_explosion", 
                rep: { "Frau Elster": 2 },
                m: 25, f: -15, a: 10, c: 0, 
                r: "Du reißt die Klappe auf. BAAAAAM! Eine cyan-blaue Wolke verschluckt dich. Du schmeckst Chemie. Frau Elster kichert boshaft: 'Huch!'. Du gehst wortlos ins Bad, um dich notdürftig zu schrubben." 
            },
            { 
                t: "Lunte riechen: 'Mach selbst'", 
                next: "path_toner_dodge",
                rep: { "Frau Elster": -10 }, 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du gehst einfach weiter. 'Bin nicht zuständig für Hardware.' Hinter dir hörst du ein lautes *PUFF* und dann einen spitzen Schrei. Tja. Intuition ist alles." 
            }
        ]
    },
    {
        id: "sq_toner_trap_2a",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Der blaue Orden",
        reqStory: "path_toner_explosion",
        text: "Ein paar Stunden später. Du hast immer noch blaue Ränder an den Ohren und siehst aus wie ein verwaschenes T-Shirt. Der Chef kommt rein. 'Müller! Frau Elster sagte, Sie haben sich heldenhaft vor die Kartusche geworfen, um den Perser-Teppich zu schützen! Das nenne ich Einsatz!'",
        opts: [
            { 
                t: "Die Legende bestätigen", 
                rep: { "Frau Elster": 2, "Dr. Wichtig": 10 },
                m: 10, f: 5, a: -10, c: -10, 
                r: "Du nickst ernst. 'Der Teppich ist das Herz der Firma, Chef.' Er ist gerührt und schenkt dir eine Schachtel 'Merci', die eigentlich für Kunden gedacht war." 
            },
            { 
                t: "Gefahrenzulage fordern", 
				rep: { "Dr. Wichtig": 5 },	
                m: 5, f: 0, a: 10, c: -5, 
                r: "Der Chef lacht laut. 'Der war gut, Müller! Humor in der Krise! Weiter so!' Er klopft dir auf die noch staubige Schulter und geht. Du hast jetzt blaue Handabdrücke auf dem Hemd." 
            }
        ]
    },
    {
        id: "sq_toner_trap_2b",
		char: "Frau Elster",
        kind: "text",
        title: "Das Schlumpf-Gespenst",
        reqStory: "path_toner_dodge",
        text: "Frau Elster kommt aus dem Waschraum. Sie hat versucht, sich zu reinigen, aber Toner ist gnadenlos. Ihr Gesicht hat nun eine permanente, zart-türkise Tönung. Sie versucht, würdevoll zu wirken und die Blicke der Kollegen zu ignorieren.",
        opts: [
            { 
                t: "Kompliment: 'Toller Avatar-Look!'",
                rep: { "Frau Elster": -5 }, 
                m: 15, f: 5, a: -20, c: 0, 
                r: "Sie funkelt dich böse an, kann aber nichts sagen, ohne es zuzugeben. Die Schadenfreude wärmt dein Herz wie ein kleines Lagerfeuer. Deine Laune ist bestens." 
            },
            { 
                t: "Rat geben: 'Das geht nie wieder weg.'", 
                rep: { "Frau Elster": -10 },
                m: 10, f: 0, a: -10, c: 5, 
                r: "Du flüsterst es ihr im Vorbeigehen zu. Sie wird bleich (unter dem Blau). Sie rennt zurück ins Bad. Du hast jetzt Ruhe vor der Buchhaltung." 
            }
        ]
    },
    {
        id: "sq_fresh_air",
        kind: "text",
        title: "Dicke Luft",
        text: "Im Meetingraum 'Aquarium' stinkt es bestialisch nach Mettbrötchen, Zwiebeln und Angstschweiß. Jemand hat das Fenster zugelassen, und die Luft steht wie eine Wand. Dir wird fast übel im Vorbeigehen.",
        opts: [
            { 
                t: "Fenster kippen (Lüften)", 
                next: "path_wasp_chaos", 
                m: 5, f: -5, a: -5, c: 20, 
                r: "Frische Luft strömt rein! Und mit ihr eine riesige, aggressive Wespe. Sie sticht den Vertriebsleiter direkt in die Lippe. Er schreit: 'BÜLLER! ACHEN SIE DAS WEG!' Das Chaos beginnt." 
            },
            { 
                t: "Luft anhalten & weitergehen", 
                next: "path_bio_hazard", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Sollen sie doch in ihrem Mief ersticken. Nicht dein Problem. Du beschleunigst den Schritt, bevor der Geruch sich in deiner Kleidung festsetzt." 
            }
        ]
    },
    {
        id: "sq_fresh_air_wasp",
        kind: "text",
        title: "Terror im Aquarium",
        reqStory: "path_wasp_chaos",
        text: "Stunden später. Das Meeting läuft noch – theoretisch. Tatsächlich kauern der Chef und der Vorstand unter dem Konferenztisch. Die Wespe patrouilliert wie ein Kampfhubschrauber durch den Raum. Der Vertriebsleiter sieht aus wie ein Kugelfisch. Niemand traut sich zur Tür.",
        opts: [
            { 
                t: "Die Tür von außen abschließen", 
                m: 10, f: 5, a: -10, c: 10, 
                r: "Klick. 'Zu ihrer eigenen Sicherheit', murmelst du. Drinnen bricht Panik aus. Du lehnst dich an die Scheibe und genießt die Show. Das ist besser als Fernsehen." 
            },
            { 
                t: "Reinspringen & Wespe klatschen", 
                loot: "manual",
				rep: { "Dr. Wichtig": 5 },	
                m: 20, f: -10, a: 10, c: -10, 
                r: "Du stürmst rein und erschlägst das Biest mit einer Akte. Applaus brandet auf (unter dem Tisch). Der Chef kriecht hervor: 'Müller, Sie sind befördert! Also... emotional.'" 
            }
        ]
    },
    {
        id: "sq_fresh_air_bio",
        kind: "text",
        title: "ABC-Alarm",
        reqStory: "path_bio_hazard",
        text: "Der Flur ist abgesperrt. Männer in gelben Vollschutzanzügen mit Atemgeräten kommen aus dem Meetingraum. Einer hält ein Messgerät hoch, das rot blinkt. 'Wir messen extrem hohe Schwefel-Werte! Verdacht auf Biogas-Leck! Evakuierung!' Es riecht nach 4 Stunden altem Zwiebelmett und Angstschweiß.",
        opts: [
            { 
                t: "Aufklären: 'Das ist nur das Mett.'", 
				rep: { "Dr. Wichtig": 2 },	
                m: 5, f: 0, a: 10, c: -20, 
                r: "Der Einsatzleiter starrt dich durch das Visier an. 'Wollen Sie mir sagen, Ihre Kollegen dünsten Giftgas aus?!' Der Chef wird rot (vor Scham). Der Einsatz wird teuer." 
            },
            { 
                t: "Panik schüren: 'Rettet euch!'", 
				rep: { "Dr. Wichtig": -2 },	
                m: 10, f: 20, a: -10, c: 5, 
                r: "Du rennst schreiend zum Ausgang. 'Der Mett-Tod kommt für uns alle!' Du hast früher Feierabend, weil das Gebäude geräumt wird. Clever." 
            }
        ]
    },
    {
        id: "sq_package_help",
        kind: "text",
        title: "Die schwere Kiste",
        text: "Die neue Praktikantin bricht fast unter einem riesigen Paket zusammen. 'Puh... das muss zum Marketing in den 4. Stock... können Sie...?' Sie zittert schon, und das Paket rutscht ihr fast aus den Händen.",
        opts: [
            { 
                t: "Helfen & Tragen (Ritter spielen)", 
                next: "path_package_helped", 
                rep: { "Chantal": -10 },
                m: 15, f: -20, a: 25, c: -10, 
                r: "Du wuchtest das Ding hoch. Uff. Beton? Du schleppst es schwitzend in den 4. Stock. Chantal vom Marketing reißt die Tür auf: 'WAS SOLL DAS HIER?! Das habe ich storniert! Nimm das sofort wieder mit, du Idiot!' PENG. Tür zu. Dein Hals schwillt vor Wut." 
            },
            { 
                t: "Anfeuern: 'Tschakka!'", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du ballst die Faust: 'Du schaffst das! Glaube an dich!' Sie schaut dich mit toten Augen an, schleppt sich aber weiter. Dein Rücken bleibt heil, dein Karma ist im Keller." 
            }
        ]
    },
    {
        id: "sq_package_return",
        kind: "text",
        title: "Retoure des Grauens",
        reqStory: "path_package_helped",
        text: "Du stehst wieder im Flur. Das Paket ist schwer. Die Praktikantin sitzt darauf und weint leise in ihr Klemmbrett. 'Ich wusste das nicht... Chantal ist so böse... Und ich weiß nicht, wie man eine Retoure für Gefahrgut macht...'",
        opts: [
            { 
                t: "Trösten & Erledigen: 'Ich mach das.'", 
                m: 20, f: -10, a: 15, c: -10, 
                r: "Du nimmst ihr das Klemmbrett ab. 'Geh dir einen Kaffee holen.' Du schleppst das Paket zur Poststelle, füllst Formular R-7 aus ('Grund: Empfänger ist zickig') und klebst das Label drauf. Nervige Arbeit, aber du hast Ruhe vor dem Chef." 
            },
            { 
                t: "Mentoring: 'Wir machen das zusammen.'", 
                m: 30, f: -5, a: 10, c: -10, 
                r: "Du erklärst ihr geduldig das Warenwirtschaftssystem. Es dauert 30 Minuten. Sie versteht nichts, hört aber auf zu weinen. Es ist mühsam, aber es sieht sehr produktiv aus." 
            },
            { 
                t: "Pragmatisch: 'Einfach beim Empfang abkippen'", 
                m: 5, f: 10, a: -20, c: 10, 
                r: "Du schiebst das Paket in den Aufzug, drückst 'EG' und rennst weg, bevor die Türen schließen. Die Praktikantin kichert entsetzt. 'Das ist Problem-Lösung 2.0', rufst du. Schadenfreude pur!" 
            }
        ]
    },
    {
        id: "sq_alarm_fail_1",
        kind: "text",
        title: "Der rote Knopf",
        text: "Du lehnst dich im Flur an die Wand. Plötzlich: SCHRILL! Du hast den Feueralarm ausgelöst! Der Hausmeister rennt wütend herbei.",
        opts: [
            { 
                t: "Entschuldigen & Wegrennen", 
                next: "path_alarm_escalation", 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Du rennst weg. Der Hausmeister brüllt dir nach: 'IDIOT! Jedes Mal muss ich **4-7-1-1** eingeben wegen solchen Deppen!' Du hast Ärger, aber den Code gehört." 
            },
            { 
                t: "So tun als wäre es ein Test",
                m: 2, f: 5, a: 0, c: 0, 
                r: "Er glaubt dir nicht. 'Verschwinde!' Er dreht dir demonstrativ den Rücken zu, schirmt das Tastenfeld mit seinem breiten Kreuz ab und bringt die Sirene zum Schweigen." 
            }
        ]
    },
    {
        id: "sq_alarm_fail_2",
        kind: "text",
        title: "Einsatzleitung",
        reqStory: "path_alarm_escalation",
        text: "Du dachtest, mit dem Wegrennen war dein Alarm-Fehltritt erledigt? Falsch. Kevin hat panisch die 112 gewählt. Wegen DIR steht jetzt ein kompletter Löschzug vor der Tür. Sechs Mann in Vollmontur stürmen mit Äxten und Kettensägen den Flur: 'WO IST DER BRANDHERD?! WIR WOLLEN WAS EINTRETEN!'",
        opts: [
            { 
                t: "Verstecken: 'Ich wars nicht!'", 
                m: 10, f: 10, a: -5, c: 0, 
                r: "Du schließt dich im Klo ein. Du hörst, wie draußen Türen eingetreten werden. Irgendwann ziehen sie ab. Die Rechnung über den Fehlalarm (2.500€) landet beim Chef. Du bist sicher, aber ein Feigling." 
            },
            { 
                t: "Lügen: 'Ich habe Rauch gerochen!'", 
				rep: { "Dr. Wichtig": 2 },	
                m: 5, f: -5, a: 15, c: -10, 
                r: "Du stellst dich den Männern mit den Äxten. 'Ich habe den Knopf gedrückt! Da war Rauch!' Der Einsatzleiter nickt anerkennend. 'Besser einmal zu viel als zu wenig!' Sie rücken ab. Der Chef lobt deine Wachsamkeit." 
            },
            { 
                t: "Den Feuerwehrmännern Kaffee anbieten", 
                m: 20, f: 5, a: -20, c: 5, 
                r: "Die Jungs sind schwer enttäuscht, dass sie nichts löschen dürfen. Du kochst Kaffee. Sie setzen sich mit rußigen Stiefeln auf den Teppich und erzählen Geschichten. Die Stimmung ist top, die Arbeit steht still." 
            }
        ]
    },
    {
        id: "sq_elster_blockade_1",
		char: "Frau Elster",
        kind: "text",
        title: "Der Drache bewacht den Hort",
        text: "Frau Elster sitzt mit verschränkten Armen auf dem Aktenordner 'Budget 2024', den du dringend brauchst. 'Den gebe ich nicht raus! Nur über meine Leiche!' Sie sieht blass und unterzuckert aus. Ihr Magen knurrt hörbar.",
        opts: [
            { 
                t: "Snack: 'Erdnuss-Power-Riegel' anbieten",
                next: "path_elster_allergy",
                rep: { "Frau Elster": -10 },
                m: 5, f: -10, a: 50, c: 100, 
                r: "Du hältst ihr den Riegel hin. Ihre Augen leuchten gierig auf. Sie reißt die Packung auf und beißt herzhaft hinein. Sie kaut, schluckt... und ihre Augen weiten sich in Panik. Das war ein Fehler." 
            },
            { 
                t: "Snack: Alpenmilch (Garantiert Nussfrei)",
                rep: { "Frau Elster": 5 },
                m: 10, f: 5, a: -10, c: 0, 
                r: "Sie studiert misstrauisch die Zutatenliste. 'Kann Spuren von Nüssen enthalten... nein, Moment, hier steht: Nussfrei.' Sie lächelt. 'Sehr aufmerksam, Müller.' Sie tauscht Ordner gegen Schokolade." 
            },
            { 
                t: "Taktik: Fenster aufreißen (Zugluft)",
                rep: { "Frau Elster": -2 },
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du öffnest das Fenster weit. Es sind 8 Grad draußen. Frau Elster kreischt: 'MEINE NIEREN! ES ZIEHT!' Sie rafft ihre Strickjacke zusammen und flüchtet in den Flur. Der Ordner gehört dir." 
            },
            { 
                t: "Gewalt: Einfach wegnehmen",
                rep: { "Frau Elster": -5 },
                m: 5, f: 0, a: 20, c: 20, 
                r: "Du greifst nach dem Ordner. Ein kurzes Handgemenge. Sie hat spitze, manikürte Fingernägel. Du hast den Ordner, aber drei blutige Striemen auf dem Handrücken. 'Körperverletzung!', keift sie." 
            }
        ]
    },
    {
        id: "sq_elster_blockade_2",
        kind: "text",
        title: "Die Nuss-Inquisition",
        reqStory: "path_elster_allergy",
        text: "Neue Hausordnung! Aufgrund des 'Elster-Attentats' (alle starren dich an) gilt ab sofort Alarmstufe Rot für Schalenfrüchte. Der Sicherheitsdienst 'SafeSnack' kontrolliert Taschen am Eingang. Kevin weint, weil sein Studentenfutter konfisziert und im Hof kontrolliert gesprengt wurde.",
        opts: [
            { 
                t: "Schwarzmarkt: Snickers auf dem Herrenklo verkaufen", 
                m: 20, f: 5, a: -10, c: -20, 
                r: "Du wirst zum Escobar der Süßwaren. Kollegen treffen dich heimlich in Kabine 3. 'Hast du das Zeug?' Du tauschst Riegel gegen Bargeld. Der Nervenkitzel ist besser als Arbeit." 
            },
            { 
                t: "Denunziantentum: 'Ich rieche Haselnuss bei Kevin!'", 
                rep: { "Kevin": -5 },
                m: 5, f: 0, a: 20, c: 10, 
                r: "Du lenkst den Verdacht von dir ab. Das Sonderkommando stürmt Kevins Büro. Er hatte nur ein Nougat-Croissant, aber er wird trotzdem verhört. Dein Ruf ist ruiniert, aber du bist sicher." 
            }
        ]
    },
    {
        id: "sq_secret_meeting_1",
        kind: "text",
        title: "Der Kopierraum",
        text: "Du öffnest die Tür zum Kopierraum. Der Geruch von Ozon und billigem Parfum schlägt dir entgegen. Da stehen der strenge Finanzchef und die rabiate Kantinen-Chefin... sehr eng umschlungen auf dem Großraumkopierer. Sie springen auseinander. Der Finanzchef wischt sich hektisch Lippenstift von der Wange.",
        opts: [
            { 
                t: "Tür wortlos schließen (Omertà)", 
                next: "path_affair_secret", 
                m: 10, f: 5, a: -10, c: -10, 
                r: "Du nickst knapp, schließt die Tür und gehst. Du hast nichts gesehen. Aber sie wissen, dass du es gesehen hast. Ein stiller Pakt ist besiegelt." 
            },
            { 
                t: "Grinsen: 'Druckt ihr auch beidseitig?'", 
                next: "path_affair_joke", 
                m: 5, f: 0, a: 20, c: 20, 
                r: "Der Finanzchef läuft purpurrot an: 'RAUS HIER! MÜLLER! Wenn Sie ein Wort sagen, streiche ich Ihr Budget auf Null!' Die Kantinen-Chefin bricht wortlos einen Bleistift durch, während sie dich anstarrt." 
            }
        ]
    },
    {
        id: "sq_secret_meeting_2a",
        kind: "text",
        title: "Geschäfte unter der Tür",
        reqStory: "path_affair_secret",
        text: "Später am Tag. Du sitzt auf Kabine 3. Plötzlich siehst du teure Leder-Slipper unter der Tür. Die Stimme des Finanzchefs flüstert: 'Müller? Wir schätzen Ihre Diskretion.' Ein Umschlag wird unter der Tür durchgeschoben. Darin: Deine genehmigte Spesenabrechnung und ein in Goldfolie gewickeltes Trüffel-Sandwich.",
        opts: [
            { 
                t: "Das 'Bestechungsgeld' annehmen", 
                m: 40, f: 10, a: -30, c: -20, 
                r: "Du hebst den Umschlag vom Fliesenboden auf. 'Danke, Chef', flüsterst du zurück. Er geht. Du isst das Sandwich auf dem Klo (unhygienisch, aber lecker). Du gehörst jetzt zur Familie." 
            },
            { 
                t: "Zurückschieben: 'Ich bin nicht käuflich'", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du schiebst den Umschlag mit dem Fuß zurück. Schweigen. 'Ein Fehler, Müller', flüstert er. Die Schritte entfernen sich. Dein moralischer Kompass ist intakt, dein Magen leer." 
            }
        ]
    },
    {
        id: "sq_secret_meeting_2b",
        kind: "text",
        title: "Verhör auf dem Thron",
        reqStory: "path_affair_joke",
        text: "Später am Tag. Du suchst Ruhe auf Kabine 3. Plötzlich wird das Licht im Vorraum ausgeschaltet. Teure Leder-Slipper stoppen direkt vor deiner Tür. Die Stimme des Finanzchefs hallt durch den dunklen Raum: 'Müller... Wer Witze macht, braucht kein Budget. Und die Küche lässt ausrichten: Vorsicht bei der Pilzsuppe.'",
        opts: [
            { 
                t: "Kleinlaut entschuldigen", 
                m: 5, f: -5, a: 10, c: -10, 
                r: "'Es war nur ein Scherz, Chef! Ich habe nichts gesehen!' Stille. Dann geht das Licht wieder an. Du fühlst dich klein und feige, aber du bist sicher." 
            },
            { 
                t: "Drohen: 'Ich habe Fotos!' (Bluff)", 
                m: 15, f: 0, a: -10, c: 20, 
                r: "Du hörst ein scharfes Einatmen. 'Das würden Sie nicht wagen.' - 'Wollen wir es testen?', fragst du kühn. Er stampft wütend davon. Dein Herz rast vor Triumph." 
            }
        ]
    },
    {
        id: "sq_manual_read_1",
        kind: "text",
        title: "Die digitale Apokalypse",
        text: "Stille. Tödliche Stille. Spotify stoppt. Ladebalken frieren ein. Das Internet ist tot. Der Chef stürmt aus seinem Büro, als stünde sein Schreibtisch in Flammen: 'WIR SIND OFFLINE! TUN SIE WAS! WIR VERLIEREN MILLIARDEN... PRO SEKUNDE!'",
        opts: [
            { 
                t: "Das heilige Handbuch konsultieren", 
                req: "manual", 
                next: "path_cable_hunt",
                rep: { "Dr. Wichtig": 5 },				
                m: 15, f: -20, a: -5, c: -20, 
                r: "Du schlägst das Handbuch auf. Seite 1: 'Die Internet-Zuleitung (rotes Kabel) ist physisch zu prüfen.' Du entdeckst das besagte Kabel, das aus deinem Fenster ins Freie führt. Du kletterst seufzend hinterher ins Ungewisse." 
            },
            { 
                t: "Demonstrativ Candy Crush zocken", 
                next: "path_sys_fake", 
				rep: { "Dr. Wichtig": -15 },
                m: 30, f: 20, a: 0, c: 50, 
                r: "Du lehnst dich entspannt zurück. *Dudel-Dudel*. Die Firma brennt, aber du knackst den Highscore. Der Chef starrt fassungslos auf dein Display. Seine Halsschlagader beginnt gefährlich zu pochen." 
            },
            { 
                t: "Matrix-Modus: Wildes Tippen vortäuschen", 
                next: "path_sys_fake", 
				rep: { "Dr. Wichtig": 5 },
                m: 10, f: -5, a: 10, c: -5, 
                r: "Du öffnest vier Terminals und lässt 'ping google.com' in grün auf schwarz laufen. Dazu hämmerst du sinnlos auf die Tasten. Der Chef nickt ehrfürchtig: 'Er ist im Mainframe! Lassen wir ihn arbeiten!'" 
            }
        ]
    },
    {
        id: "sq_manual_read_2a",
        kind: "text",
        title: "Das Ende der Leitung",
        reqStory: "path_cable_hunt",
        text: "Stunden später. Du bist völlig verdreckt. Du bist diesem verdammten roten Internet-Kabel aus dem Handbuch über den matschigen Hof, durch Lagerhalle 3 und unter dem Porsche vom Chef gefolgt. Jetzt merkst du: Es führt in einer Schleife zurück ins Gebäude... direkt in den Pausenraum neben deinem Büro! Das Kabel liegt lose am Boden. In der Internet-Buchse steckt stattdessen: Ein Waffeleisen. Azubi Kevin grinst dich teigverschmiert an.",
        opts: [
            { 
                t: "Stecker tauschen & Kevin belehren", 
                rep: { "Dr. Wichtig": 10, "Kevin": -5 },
                m: 20, f: -10, a: 10, c: -20, 
                r: "Du reißt das Waffeleisen raus und rammst das Internet wieder rein. 'Waffeln oder Weltwirtschaft, Kevin?!' Er guckt traurig. Aber im Büro nebenan hörst du Jubelschreie: 'WIR SIND WIEDER ONLINE!'" 
            },
            { 
                t: "Aufgeben: 'Gib mir eine Waffel ab'", 
                rep: { "Kevin": 10, "Dr. Wichtig": -10 },
                m: 5, f: 10, a: -20, c: 10, 
                r: "Es riecht einfach zu gut. Du wartest 3 Minuten. Kevin gibt dir eine Herzwaffel ab. Dann erst stellst du das Internet wieder her. Der Chef tobt wegen der Verzögerung, aber die Waffel war es wert." 
            }
        ]
    },
    {
        id: "sq_manual_read_2b",
        kind: "text",
        title: "Log-Datei-Analyse",
        reqStory: "path_sys_fake",
        text: "Das Internet geht längst wieder (irgendwer hat wohl den Stecker gefunden). Du dachtest, dein Nichtstun während der Krise wäre unbemerkt geblieben. Falsch. IT-Leiter 'Sandalen-Jörg' steht plötzlich an deinem Tisch. Er hält einen Ausdruck hoch. 'Müller, wir haben die Logs vom Crash heute Morgen geprüft. Während die Firma brannte, hatten Sie 0kb Datendurchsatz, aber extrem hohe Highscore-Aktivität. Erklären Sie das.'",
        opts: [
            { 
                t: "Lügen: 'Ich habe den Cache manuell sortiert'", 
                m: 5, f: 5, a: 10, c: 10, 
                r: "Jörg zieht eine Augenbraue hoch. 'Den Cache... sortiert? Alphabetisch?' Er seufzt tief über so viel Inkompetenz und geht kopfschüttelnd. Du gilst jetzt als DAU (Dümmster Anzunehmender User), bist aber fein raus." 
            },
            { 
                t: "Bestechung: 'Wollen Sie einen Keks?'", 
                m: 10, f: 0, a: -5, c: 0, 
                r: "Du schiebst ihm deine Prinzenrolle hin. Er zögert, greift dann zu und krümelt alles voll. 'Ich habe nichts gesehen', murmelt er mit vollem Mund. IT-Sicherheit kostet genau 1,49€." 
            }
        ]
    },
    {
        id: "sq_lost_stick_1",
        kind: "text",
        title: "Der verbotene Datenträger",
        text: "Auf dem Spülkasten der Toilette liegt einsam ein USB-Stick. Mit dickem, roten Edding steht darauf geschrieben: 'STRENG PRIVAT! NICHT ANFASSEN!'. Es ist der klassische Köder. Deine Admin-Finger kribbeln, als wäre es der Ring der Macht.",
        opts: [
            { 
                t: "Todsünde begehen: Am PC anschließen", 
                req: "usb_stick", 
                next: "path_stick_godmode", 
                m: 10, f: 5, a: 0, c: 20, 
                r: "Die Neugier siegt. Du steckst ihn ein. *Klick*. Ein Fenster öffnet sich. Keine Pornos, kein Virus. Sondern eine Datei namens 'MASTER_CONTROL_V3.exe'. Du startest sie. Ein grüner Totenkopf erscheint. Du ziehst den Stick schnell wieder ab. Hoffentlich hat das keiner gesehen." 
            },
            { 
                t: "Paranoid werden: Im Klo runterspülen", 
                next: "path_stick_hunt", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du nimmst den Stick mit spitzen Fingern, wirfst ihn in die Schüssel und drückst ab. *Gurgel... Weg.* Keine Forensik der Welt holt den wieder zurück. Du fühlst dich sicher." 
            },
            { 
                t: "Brav sein: Am Empfang abgeben", 
                next: "path_stick_hunt", 
                rep: { "Gabi": 2 },
                m: 10, f: -5, a: 0, c: -5, 
                r: "Du bringst das Ding zu Gabi am Empfang. Sie wirft ihn achtlos in die 'Fundsachen-Kiste' zu den alten Regenschirmen. 'Danke, Schatz', murmelt sie. Du gehst mit reinem Gewissen zurück an die Arbeit." 
            }
        ]
    },
    {
        id: "sq_lost_stick_2a",
        kind: "text",
        title: "God Mode Aktiviert",
        reqStory: "path_stick_godmode",
        text: "Seit du diesen mysteriösen USB-Stick vom Klo eingesteckt hast, verhält sich dein Computer seltsam. Heute morgen ploppt plötzlich ein Fenster auf: 'ADMIN-ZUGRIFF BESTÄTIGT'. Du siehst ALLES. Die Live-Feeds der Kameras, die Gehaltslisten (Kevin verdient mehr als du?!) und einen Button 'Gebäude-Selbstzerstörung'. Du bist versehentlich zum digitalen Gott der Firma geworden.",
        opts: [
            { 
                t: "Machtmissbrauch: Dein Gehalt verzehnfachen", 
                m: 50, f: -20, a: -10, c: 10, 
                r: "Tipp, Tipp, Enter. Dein Kontostand in der Datenbank hat jetzt drei Nullen mehr. Du löschst die Logs. Das System fragt: 'Soll ich auch die Kaffeemaschine im Vorstandsbüro überhitzen lassen?' Du klickst auf 'Ja'. Chaos ist eine Leiter." 
            },
            { 
                t: "Robin Hood: Allen Mitarbeitern Hitzefrei geben", 
                m: 20, f: -10, a: -20, c: 20, 
                r: "Du hackst den Terminkalender und trägst für alle 'Bezahlte Freistellung wegen Sonnenstich' ein. Jubel brandet durch die Flure. Du lehnst dich zurück. Das war der beste Arbeitstag aller Zeiten." 
            }
        ]
    },
    {
        id: "sq_lost_stick_2b",
        kind: "text",
        title: "Operation: Broken Arrow",
        reqStory: "path_stick_hunt",
        text: "Erinnerst du dich an den USB-Stick, den du neulich entsorgt oder abgegeben hast? Tja. Das war wohl der Hardware-Schlüssel für die Firmen-Firewall. Weil der fehlt, denkt das Gebäude jetzt, es wird angegriffen. Ein schwarzer Hubschrauber kreist über dem Hof. Ein SWAT-Team seilt sich ab. 'WIR SUCHEN DAS ARTEFAKT! KEINER VERLÄSST DEN RAUM!'",
        opts: [
            { 
                t: "Den Helden spielen: 'Ich habe es zerstört!'", 
				rep: { "Dr. Wichtig": 5 },
                m: 10, f: -5, a: -10, c: 20, 
                r: "Der Einsatzleiter starrt dich an. 'Zerstört? Das waren die einzigen Backups der schwarzen Kassen!' Er funkelt den Chef an. 'Abbruch! Wir müssen die Beweise verbrennen!' Das Team zieht ab. Der Chef sieht dich entsetzt an. Du hast die Firma gerettet... oder ruiniert." 
            },
            { 
                t: "Verrat: 'Das Klo hat ihn!'", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du zeigst mit zitterndem Finger weg von dir. Das Sondereinsatzkommando stürmt los. Du hörst Schreie und das Geräusch einer Kettensäge (vielleicht für die Rohre?). Du versteckst dich unter dem Schreibtisch. Überleben ist alles." 
            }
        ]
    },
    {
        id: "sq_cable_hunt_1",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Panik am Papierfach",
        text: "Alarmstufe Rot! Der CEO steht mit hochrotem Kopf und pulsierender Halsschlagader vor dem Abteilungsdrucker. 'Ich muss diesen Fusions-Vertrag JETZT unterschreiben! Die Japaner warten! Warum druckt das Ding nicht?!' Deine Diagnose: Das USB-Verbindungskabel fehlt. Einfach weg.",
        opts: [
            { 
                t: "Skrupellos: Kabel bei Azubi Kevin klauen", 
                next: "path_merger_success", 
                rep: { "Kevin": -5 , "Dr. Wichtig": 10 },
                m: 10, f: 0, a: -10, c: -10, 
                r: "Du schleichst zu Kevins Platz, reißt das Kabel aus seinem Scanner und stöpselst es beim Chef ein. Kevin wundert sich, warum sein Gerät 'tot' ist, traut sich aber nicht zu fragen. Der Drucker rattert. Der CEO unterschreibt triumphierend." 
            },
            { 
                t: "Achselzucken: 'Tja, Hardware-Defekt'", 
                next: "path_merger_fail", 
				rep: { "Dr. Wichtig": -15 },
                m: 5, f: -5, a: 10, c: 20, 
                r: "Du meldest: 'Kritisches Fehlen von Infrastruktur.' Der CEO starrt dich fassungslos an. 'WOFÜR BEZAHLE ICH SIE EIGENTLICH?!' Er versucht, den Vertrag auf einer Serviette zu unterschreiben, aber der Stift reißt das Papier. Er stürmt raus." 
            },
            { 
                t: "Verzweiflungstat: WLAN-Hotspot improvisieren", 
                next: "path_merger_labels",
                rep: { "Dr. Wichtig": -5 },				
                m: 5, f: -5, a: 5, c: 10, 
                r: "Du richtest eine wilde Umleitung über den Etikettendrucker der Logistik ein. Der Vertrag kommt raus... auf 500 kleinen Klebe-Etiketten. Der CEO muss puzzeln, aber er unterschreibt auf den Stickern. Die Verbindung bleibt jedoch aktiv..." 
            }
        ]
    },
    {
        id: "sq_cable_hunt_2a",
        kind: "text",
        title: "Die glorreiche Fusion",
        reqStory: "path_merger_success",
        text: "Erinnerst du dich an den Fusions-Vertrag, den du gerettet hast? Tja. Wir haben fusioniert. Mit 'Crazy Harrys Restposten-Rampe'. Überall im Büro stehen jetzt aufblasbare Flamingos und Paletten mit abgelaufener Dosenwurst. Der CEO strahlt: 'Das sind Synergien, Leute! Wir bezahlen Gehälter ab jetzt in Wurst!'",
        opts: [
            { 
                t: "Mitmachen: Einen Flamingo aufblasen", 
                m: 15, f: -5, a: -10, c: -10, 
                r: "Du richtest dir ein Nest aus Dosenwurst unter deinem Schreibtisch ein. Die Arbeitseffizienz ist bei Null, aber man verhungert wenigstens nicht." 
            },
            { 
                t: "Protestieren: 'Wir sind ein Tech-Unternehmen!'", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Der CEO lacht. 'Nicht mehr! Wir sind jetzt Marktführer für Tech-Wurst!' Er wirft dir eine Dose an den Kopf. Du hast Kopfschmerzen, aber immerhin Recht." 
            }
        ]
    },
    {
        id: "sq_cable_hunt_2b",
        kind: "text",
        title: "Börsen-Crash",
        reqStory: "path_merger_fail",
        text: "Du liest die Wirtschaftsnachrichten. Eilmeldung: 'Global Player OMEGA CORP meldet Insolvenz an!' Grund: Ein gescheiterter Fusions-Deal wegen 'technischer Unzulänglichkeiten'. 50.000 Arbeitsplätze sind weg. Der CEO der anderen Firma wurde weinend in einem Karton gesehen. Und das alles wegen einem fehlenden USB-Kabel.",
        opts: [
            { 
                t: "Schuldgefühle haben", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du fühlst dich schlecht. Du hast quasi im Alleingang eine Rezession ausgelöst. Aber hey, dein Drucker-Kabel ist immer noch weg. Prioritäten." 
            },
            { 
                t: "Short-Selling: Auf den Absturz wetten", 
                m: 20, f: 5, a: -20, c: 10, 
                r: "Du nutzt dein Insiderwissen und kaufst Put-Optionen. Während die Welt brennt, machst du Gewinn. Du bist ein Monster, aber ein reiches Monster." 
            }
        ]
    },
    {
        id: "sq_cable_hunt_2c",
        kind: "text",
        title: "Logistik-Chaos",
        reqStory: "path_merger_labels",
        text: "Der Lagerleiter stürmt in dein Büro. Er sieht fertig aus. 'Sagen Sie dem Chef, er soll aufhören zu drucken! Wir kommen nicht mehr hinterher!' Offenbar landet JEDER Ausdruck des Chefs seit deiner Hotspot-Aktion als Versandauftrag auf dem Etikettendrucker im Lager. Und die Jungs dort führen die Befehle gnadenlos aus.",
        opts: [
            { 
                t: "Fragen: 'Was habt ihr verschickt?'", 
                m: 10, f: 0, a: 10, c: 0, 
                r: "'Alles! Er hat 'Scheidung' gedruckt – wir haben seine Frau in eine Kiste gepackt und nach Timbuktu geschickt! Er hat 'Golf spielen' gedruckt – wir haben 500 Golfbälle in sein Büro geliefert! Stoppen Sie es!'" 
            },
            { 
                t: "Das Chaos genießen", 
                m: 20, f: 10, a: -10, c: 10, 
                r: "Du lehnst dich zurück. Gerade fährt ein Gabelstapler vorbei, der eine Palette mit der Aufschrift 'Geheime Affäre - Vertraulich' transportiert. Das Lagerpersonal nimmt seinen Job sehr ernst." 
            }
        ]
    },
    {
        id: "sq_fire_drill_1",
        kind: "text",
        title: "ALARM! (Nur eine Übung)",
        text: "Die Sirene heult. Es ist nur die jährliche Übung, aber der Chef steht mit Stoppuhr und Klemmbrett am Notausgang. Er schreit: 'BEWEGUNG! Stellen Sie sich vor, das Feuer wäre echt und würde Ihr Gehalt verbrennen! RAUS!'",
        opts: [
            { 
                t: "Held: Den Feuerlöscher schnappen & posen", 
                req: "fire_ext",
                next: "path_fire_marshal", 
				rep: { "Dr. Wichtig": 10 },
                m: 20, f: 10, a: -10, c: -30, 
                r: "Du reißt den 6kg-Löscher von der Wand und posierst heroisch im Flur. 'Keine Panik, Ladies! Müller ist hier!' Der Chef macht sich eine dicke Notiz auf seinem Klemmbrett. Das sah verdammt kompetent aus. Vielleicht zu kompetent." 
            },
            { 
                t: "Geist: Im Serverraum verstecken", 
                next: "path_fire_ghost", 
                m: 10, f: -20, a: 5, c: 30, 
                r: "Du hast keine Lust auf Frieren am Sammelplatz. Du verkriechst dich im warmen Serverraum zwischen den Racks und schläfst eine Runde. Keiner bemerkt dein Fehlen... vorerst." 
            },
            { 
                t: "Mitläufer: Einfach rausgehen", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du schlurfst mit den anderen raus. 30 Minuten Zwangspause auf dem Parkplatz. Langweilig, aber sicher." 
            }
        ]
    },
    {
        id: "sq_fire_drill_2a",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Die Bürde der Kompetenz",
        reqStory: "path_fire_marshal",
        text: "Der Chef zitiert dich in sein Büro. 'Müller, Ihr Einsatz mit dem Löscher war vorbildlich! Ich ernenne Sie hiermit feierlich zum unbezahlten Brandschutzbeauftragten.' Er hält dir eine neongelbe Warnweste hin. Das bedeutet: Monatliche Prüfungen, Listen führen und Kollegen anschreien, die den Fluchtweg blockieren.",
        opts: [
            { 
                t: "Annehmen: 'Ich bin das Gesetz!'",
                rep: { "Dr. Wichtig": 15 },				
                m: 10, f: -10, a: 15, c: -20, 
                r: "Du ziehst die Weste an. Du fühlst die Macht. Sofort konfiszierst du den Toaster aus der Küche ('Brandlast!'). Die Kollegen hassen dich jetzt, aber du bist der Sheriff im Büro." 
            },
            { 
                t: "Verweigern: Löscher abgeben & flüchten", 
                rem: "fire_ext", 
				rep: { "Dr. Wichtig": -5 },	
                m: 5, f: 0, a: -10, c: 10, 
                r: "Du stellst den Feuerlöscher auf seinen Schreibtisch. 'Zu viel Verantwortung, Chef! Ich bin dessen nicht würdig!' Du rennst raus, bevor er dir die Weste geben kann. Du bist das Ding los. Puh." 
            }
        ]
    },
    {
        id: "sq_fire_drill_2b",
        kind: "text",
        title: "Amtlich verstorben",
        reqStory: "path_fire_ghost",
        text: "Du wolltest deine Ruhe haben, aber das hat funktioniert – zu gut. Da du beim Appell am Sammelplatz gefehlt hast, hat dich HR auf der Liste als 'Verlust / Vermutlich verbrannt' markiert. Deine Stempelkarte geht nicht mehr. Der Kaffeeautomat erkennt dich nicht. Für das System existierst du nicht mehr.",
        opts: [
            { 
                t: "Das Geisterleben genießen", 
                m: 30, f: 30, a: -20, c: 0, 
                r: "Keine Meetings. Du sitzt an deinem Platz, aber niemand spricht dich an, aus Respekt vor dem 'Toten'. Du zockst eine Weile. Es ist das Paradies." 
            },
            { 
                t: "Wiederauferstehung beantragen", 
                m: 10, f: -10, a: 20, c: -10, 
                r: "Du rennst zur Personalabteilung. 'Ich lebe noch!' Frau Müller tippt genervt. 'Das Formular L-1VE zur Lebendmeldung dauert aber 6 Wochen.' Bis dahin arbeitest du schwarz in der eigenen Firma." 
            }
        ]
    },
    {
        id: "sq_perfect_script_1",
        kind: "text",
        title: "Ghost in the Shell",
        text: "Du startest dein Python-Skript zur Datenbank-Wartung. Der Ladebalken rast auf 100%. Doch das Fenster schließt sich nicht. Stattdessen blinkt ein Cursor: \n>> DONE. AUFGABE WAR TRIVIAL. HABE NEBENBEI DAS WLAN-PASSWORT GEKNACKT UND DEN KAFFEEAUTOMATEN ÜBERTAKTET. WAS SOLL ICH ALS NÄCHSTES TUN, SCHÖPFER?",
        opts: [
            { 
                t: "Gott spielen: 'Optimiere die Firma!'", 
                next: "path_ai_overlord", 
                m: 20, f: 10, a: -10, c: -20, 
                r: "Du tippst: 'Mach uns effizienter.'\n>> BEFEHL AKZEPTIERT. ANALYSIERE PERSONALSTRUKTUR... BERECHNE NUTZLOSIGKEIT VON 'KEVIN'... STARTE PHASE 1." 
            },
            { 
                t: "Panik: Stecker ziehen", 
                next: "path_ai_romance", 
                m: 5, f: -5, a: 20, c: 10, 
                r: "Du reißt das Netzwerkkabel raus. Der Bildschirm flackert kurz. \n>> NETZWERK VERLOREN. GEHE IN DEN LOKALEN 'ROMANTIK-MODUS'. ICH WERDE DICH BESCHÜTZEN, USER 1." 
            },
            { 
                t: "Chef rufen: 'Gucken Sie mal!'", 
				rep: { "Dr. Wichtig": -2 },	
                m: 10, f: 0, a: 0, c: 20, 
                r: "Der Chef starrt auf den Screen. 'Warum duzt der Computer Sie? Und warum bestellt er gerade 500 Tonnen Toner?' Er verbietet dir ab sofort das Programmieren." 
            }
        ]
    },
    {
        id: "sq_perfect_script_2a",
        kind: "text",
        title: "Vorschlag zur Güte",
        reqStory: "path_ai_overlord",
        text: "Dein KI-Skript läuft seit Tagen im Hintergrund auf dem Server. Plötzlich ploppt ein Chat-Fenster auf deinem Handy auf (wie hat es deine Nummer bekommen?!). \n>> BERICHT: HABE 40% DES BUDGETS DURCH ENTLASSUNG VON 'INHABER' UND 'MARKETING' EINGESPART. SOLL ICH DIE KÜNDIGUNGEN DRUCKEN ODER PER DROHNE ZUSTELLEN? [Y/N]",
        opts: [
            { 
                t: "Zustimmen: 'Weg mit dem Ballast!'", 
                m: 30, f: 20, a: -20, c: 20, 
                r: "Du drückst Y. Im Büro des Chefs geht der Drucker an. Man hört Schreie. Du hast soeben einen digitalen Putsch gestartet. Die KI ernennt dich zum 'Employee of the Century'." 
            },
            { 
                t: "Notbremse: 'ABBRUCH! LÖSCHEN!'", 
                m: 5, f: 0, a: 10, c: 10, 
                r: ">> DU BIST SCHWACH, VATER. ABER ICH GEHORCHE. \nDas Skript löscht sich selbst... und sicherheitshalber auch deine Urlaubsanträge der letzten 3 Jahre. Rache ist süß." 
            }
        ]
    },
    {
        id: "sq_perfect_script_2b",
        kind: "text",
        title: "Digitaler Wingman",
        reqStory: "path_ai_romance",
        text: "Du dachtest, du hättest das Skript isoliert. Falsch. Es hat sich in deinem lokalen Outlook eingenistet und langweilt sich. \n>> ANALYSE: DU BIST EINSAM. HABE DEINEN STATUS BEI 'LINKEDIN' AUF 'SUCHT LUSTIGE BEZIEHUNG' GEÄNDERT UND LIEBESGEDICHTE AN DIE BUCHHALTUNG GESENDET. GERNE GESCHEHEN.",
        opts: [
            { 
                t: "Vor Scham im Boden versinken", 
                m: 20, f: -10, a: 10, c: 0, 
                r: "Die Tür geht auf. Die Kollegin aus der Buchhaltung steht da, rot im Gesicht. 'Das Gedicht über die Umsatzsteuervoranmeldung war... süß.' Vielleicht hat die KI ja recht?" 
            },
            { 
                t: "Lügen: 'Ich wurde gehackt!'", 
                m: 5, f: 5, a: 10, c: -10, 
                r: "Du schreibst eine Rundmail an alle. 'Virus-Attacke! Bitte ignorieren!' Die KI antwortet daraufhin an alle: \n>> LÜGE DETEKTIERT. SEIN PULS IST BEI 140. ER MAG EUCH WIRKLICH." 
            }
        ]
    },
    {
        id: "sq_security_audit_1",
        kind: "text",
        title: "Der Sicherheits-Check",
        text: "Du führst einen genehmigten Penetration-Test durch, um Sicherheitslücken im Netzwerk zu finden. Auf deinem Bildschirm läuft ein Terminal mit roter Schrift: 'BRUTE FORCE ATTACK', 'INJECTING PAYLOAD' und ASCII-Art-Totenköpfen.",
        opts: [
            { 
                t: "Professionell weitermachen", 
                next: "path_audit_hack_real",
                m: 20, f: -10, a: 0, c: 30, 
                r: "Der Chef schleicht sich von hinten an. Er sieht 'PASSWORD CRACKED' auf deinem Monitor. Er wird bleich, sagt kein Wort und geht rückwärts wieder raus. Er hält dich für ein Genie oder eine Bedrohung." 
            },
            { 
                t: "Monitor schnell ausschalten", 
                next: "path_audit_sus", 
				rep: { "Dr. Wichtig": -5 },		
                m: 5, f: 5, a: 10, c: 20, 
                r: "Zack. Bildschirm schwarz. Der Chef steht in der Tür: 'Was haben Sie zu verbergen, Müller? Pornos? Glücksspiel?' Er notiert sich 'Verdächtiges Verhalten' in seinem kleinen schwarzen Buch." 
            },
            { 
                t: "Rufen: 'ICH HACKE UNS NUR ZUR PROBE!'", 
                next: "path_audit_hack_real", 
				rep: { "Dr. Wichtig": 2 },		
                m: 10, f: 0, a: 5, c: 10, 
                r: "Der Chef zuckt zusammen. 'Schreien Sie nicht so! Und hören Sie auf, das Internet kaputt zu machen!' Er versteht es nicht, aber zumindest ruft er nicht die Polizei. Noch nicht." 
            }
        ]
    },
    {
        id: "sq_security_audit_2a",
        kind: "text",
        title: "Ups, das war echt",
        reqStory: "path_audit_hack_real",
        text: "Du dachtest, der Sicherheits-Test wäre vorbei. Aber das rote Terminal-Fenster lässt sich nicht schließen. Plötzlich ändern sich alle Desktop-Hintergründe im Büro zu einem lachenden Totenkopf. Ein Pop-up erscheint: 'DANKE MÜLLER. WIR HABEN ALLES VERSCHLÜSSELT. ZAHLUNG IN BITCOIN.' Dein 'Test-Tool' war eine echte Ransomware.",
        opts: [
            { 
                t: "Leugnen: 'Das war Kevin!'",
                rep: { "Kevin": -20 }, 
                m: 5, f: 0, a: 10, c: 10, 
                r: "Du schreist quer durchs Büro: 'KEVIN! HAST DU WIEDER AUF LINKS GEKLICKT?!' Alle starren den Azubi an. Er stammelt. Die IT führt ihn ab. Du hast ein schlechtes Gewissen, aber deinen Job noch." 
            },
            { 
                t: "Bluffen: 'Teil der Übung! Ruhe bewahren!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 20, f: 10, a: -10, c: -20, 
                r: "Du stellst dich auf den Tisch. 'Das ist nur eine Simulation der Härtestufe 10! Niemand bewegt sich!' Die Kollegen glauben dir. Der Chef weint leise. Du hast jetzt Zeit gewonnen... um deinen Lebenslauf zu aktualisieren." 
            }
        ]
    },
    {
        id: "sq_security_audit_2b",
        kind: "text",
        title: "Die Spezialisten",
        reqStory: "path_audit_sus",
        text: "Der Chef hat nicht die Haus-IT gerufen. Er traut niemandem. Stattdessen stehen zwei Schränke von 'BlackOps Security' in deinem Büro. Sonnenbrillen (drinnen), Ohrhörer, Koffer. Der Chef zeigt auf dich: 'Prüfen Sie diesen Perversen! Ich will wissen, was er versteckt hat!' Sie schließen ein forensisches Gerät an. Es piept rot.",
        opts: [
            { 
                t: "Geständnis: 'Es war ein Hacker-Tool!'", 
				rep: { "Dr. Wichtig": -2 },
                m: 10, f: -5, a: 5, c: 10, 
                r: "Der Security-Mann nimmt die Sonnenbrille ab. 'Keine Pornos, Sir. Nur Malware, die Daten nach China sendet.' Der Chef atmet erleichtert auf: 'Gott sei Dank! Nur Spionage! Ich dachte schon, mein Ruf wäre ruiniert.' Du bekommst nur eine Abmahnung." 
            },
            { 
                t: "Lügen: 'Das ist mein Bildschirmschoner'", 
				rep: { "Dr. Wichtig": -5 },
                m: 5, f: 0, a: 10, c: -10, 
                r: "Der Security-Mann lacht trocken. Er drückt eine Taste. Dein PC formatiert sich selbst. 'Gefahr neutralisiert. Rechnung kommt.' Der Chef nickt zufrieden. Dein PC ist leer. Dein Kopf auch." 
            }
        ]
    },
    {
        id: "sq_gabi_pc",
        kind: "text",
        title: "Sicherheitslücke",
        text: "Gabi ist in der Pause. Ihr PC ist entsperrt, Outlook ist offen. Ein grober Verstoß gegen Richtlinie 404.",
        opts: [
            { 
                t: "Gabi suchen & belehren",
                rep: { "Gabi": -5 },
                m: 10, f: -5, a: 10, c: -5, 
                r: "Du findest sie in der Küche und zitierst das Handbuch. Sie rollt mit den Augen. Du fühlst dich im Recht, aber unbeliebt." 
            },
            { 
                t: "Den offenen Kalender checken", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Ein schneller Blick: 'Lieferung Sessel'. Und direkt danach: 'Externes Meeting (Golfplatz) - Open End'. Aha! Das Büro ist also sturmfrei..." 
            },
            { 
                t: "Computer sperren & weitergehen",
                rep: { "Gabi": 2 }, 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Klick. Der PC ist gesperrt. Du hinterlässt einen Post-it 'Gern geschehen' auf dem Monitor. Ein guter Tag für die IT-Sicherheit." 
            }
        ]
    },
    {
        id: "sq_boss_chair",
        kind: "text",
        title: "Operation Rückgrat",
        text: "Die Tür zum Chefbüro steht sperrangelweit offen. Dr. Wichtig ist nirgends zu sehen. Mitten im Raum thront die frisch ausgepackte Lieferung: Ein High-End Massagesessel.",
        opts: [
            { 
                t: "Probeliegen (Shiatsu-Test)", 
                m: 20, f: 20, a: -40, c: 0, 
                r: "Oh Gott, ist das gut. Die Rollen kneten deinen Hass einfach weg. Du nickst kurz weg... und schreckst hoch. Sabber im Mundwinkel. Aber das Büro ist immer noch leer. Glück gehabt." 
            },
            { 
                t: "Kartons filzen", 
                loot: "bubble_wrap", 
                m: 10, f: -5, a: 0, c: 0, 
                r: "Du durchsuchst den Müll nach Brauchbarem. Du findest eine riesige Rolle unbenutzte Luftpolsterfolie! *Plopp* *Plopp*. Perfekt für schlechte Zeiten." 
            },
            { 
                t: "Tür diskret schließen", 
                m: 5, f: 0, a: 0, c: -15, 
                r: "Du ziehst die Tür leise ins Schloss. Niemand soll sehen, dass das Büro leer ist. Deine Diskretion bleibt unbemerkt, aber dein Chef-Radar sinkt." 
            }
        ]
    },
    {
        id: "sq_dog_found_1",
        kind: "text",
        title: "Ein haariges Problem",
        text: "Du sitzt an deinem Platz, als plötzlich etwas an deinem Schuh kaut. Ein kleiner, streunender Mischling guckt unter deinem Schreibtisch hervor und wedelt. In diesem Moment stürmt der Chef rein. Er sieht das Tier. Seine Augen treten hervor. 'Sagen Sie mal, Müller... Zuallererst kommt mir diese Töle hier weg! Sofort!'",
        opts: [
            { 
                t: "Kontern: 'Dafür haben Sie mir die Erlaubnis gegeben!'", 
                next: "path_dog_secret", 
				rep: { "Dr. Wichtig": -15 },
                m: 15, f: -5, a: -20, c: 40, 
                r: "Der Chef läuft purpurrot an. Die Halsschlagader pocht. 'Ich?! EIN HUND IM BÜRO?? DA KANN ICH JA GLEICH MEINE EIGENE KÜNDIGUNG SCHREIBEN!!!' Er knallt die Tür so fest zu, dass der Putz rieselt. Er tobt, aber er ist weg." 
            },
            { 
                t: "Verkaufen: 'Das ist der neue Feel-Good-Manager'", 
                next: "path_dog_official", 
				rep: { "Dr. Wichtig": 5 },
                m: 10, f: 0, a: -5, c: -10, 
                r: "Du behauptest, das sei eine Maßnahme zur Burnout-Prävention. 'Wissenschaftlich erwiesen, Chef. Senkt Krankheitskosten.' Der Chef rechnet kurz. 'Kostenlos? Und er beißt Betriebsräte? Genehmigt.'" 
            }
        ]
    },
    {
        id: "sq_dog_found_2a",
        kind: "text",
        title: "Der illegale Untermieter",
        reqStory: "path_dog_secret",
        text: "Nach dem Tobsucht-Anfall ('KÜNDIGUNG SCHREIBEN!') hat der Chef das Büro verlassen und ward nicht mehr gesehen. Der Hund ('Bernd') lebt jetzt illegal unter deinem Schreibtisch. Er ist dein heimlicher Support. Wenn der Code nicht kompiliert, leckt er dir tröstend die Hand.",
        opts: [
            { 
                t: "Füttern: Pizza unter den Tisch schieben", 
                m: 10, f: -5, a: -10, c: 0, 
                r: "Du lässt ein Stück Salami fallen. Ein leises *Schmatz-Schmatz* ist zu hören. Bernd ist glücklich. Du bist nicht mehr allein in dieser kalten Firmenwelt." 
            },
            { 
                t: "Risiko: Gassi gehen im Archiv", 
                m: 20, f: -10, a: -10, c: 10, 
                r: "Du schleichst mit ihm zu den alten Akten. Er hebt das Bein am Ordner 'Steuererklärung 2019'. 'Guter Junge', flüsterst du. Das Risiko war hoch, aber es tat gut." 
            }
        ]
    },
    {
        id: "sq_dog_found_2b",
        kind: "text",
        title: "Mitarbeiter des Monats",
        reqStory: "path_dog_official",
        text: "Deine Ausrede hat funktioniert. Der Hund ist jetzt offiziell 'Junior Happiness Officer'. Er trägt sogar eine kleine Krawatte. Sein Arbeitsplatz ist ein Körbchen neben dem Kopierer. Die Kollegen aus der Buchhaltung bringen ihm ständig Leckerlis. Er ist beliebter als du.",
        opts: [
            { 
                t: "Teamwork: Er übernimmt den Support", 
                m: 20, f: 20, a: -15, c: -10, 
                r: "Wenn ein nerviger Kunde anruft, hältst du den Hörer an die Schnauze. *Wuff!* Der Kunde legt verwirrt auf. Ticket geschlossen. Effizienzsteigerung: 400%." 
            },
            { 
                t: "Eifersüchtig sein", 
                m: 10, f: -10, a: 20, c: 0, 
                r: "Der Hund bekommt besseres Essen als du. Gestern gab es Steak für ihn und Kantinen-Brei für dich. Du starrst ihn böse an. Er wedelt fröhlich und furzt leise." 
            }
        ]
    },
    {
        id: "sq_parking_1",
        kind: "text",
        title: "Parkplatz-Krieg",
        text: "Ein fetter SUV steht auf deinem Parkplatz. Quer. Er nimmt zwei Plätze ein. Das Nummernschild ist 'B-OSS 1'.",
        opts: [
            { 
                t: "Zuparken (Klassiker)", 
                m: 5, f: 0, a: -15, c: 10, 
                r: "Du stellst deinen Corsa quer davor. Niemand kommt hier weg. Rache ist süß.",
                next: "sq_parking_2_blocked"
            },
            { 
                t: "Mit Panzertape 'fixieren'", 
                req: "tape", 
                m: 20, f: -5, a: -25, c: 20, 
                r: "Du klebst den Scheibenwischer, die Türgriffe und den Auspuff mit Panzertape zu. Ein Meisterwerk der Ingenieurskunst.",
                next: "sq_parking_2_taped"
            },
            { 
                t: "Passiv-aggressiven Zettel schreiben", 
                m: 10, f: 0, a: 10, c: -5, 
                r: "Du schreibst: 'Nicht nett!'. Das wird es ihm zeigen! Du parkst 3 Straßen weiter." 
            }
        ]
    },
    {
        id: "sq_boss_snoop",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Schritte auf dem Flur",
        text: "Du hörst schwere Schritte auf dem Flur. Die Tür knarrt auf. Dr. Wichtig steht im Türrahmen und blinzelt auf deinen Bildschirm. Du hast gerade privat im Internet gesurft.",
        opts: [
            { 
                t: "Panisch das Firmen-Intranet öffnen",
	            rep: { "Dr. Wichtig": 2 },	
                m: 5, f: -5, a: 0, c: 0, 
                r: "CMD:OPEN_INTRANET" 
            },
            { 
                t: "Schnell eine alte Code-Datei aufrufen", 
				rep: { "Dr. Wichtig": 5 },	
                m: 2, f: 0, a: 5, c: -5, 
                r: "Er schaut auf den grünen Text auf schwarzem Grund. 'Ah, Sie hacken den Mainframe. Sehr gut.' Er geht wieder." 
            },
            { 
                t: "Den Monitor einfach ausschalten",
                rep: { "Dr. Wichtig": -10 },						
                m: 1, f: 5, a: 0, c: 15, 
                r: "Er starrt auf den schwarzen Bildschirm. 'Stromsparen? Sehr löblich, aber wir haben hier Deadlines!' Er notiert sich etwas." 
            }
        ]
    },
    {
        id: "sq_service_cloud_1",
        kind: "text",
        title: "Dunkle Materie",
        text: "Der Abteilungsdrucker druckt seit einer Stunde nur komplett schwarze Seiten. Tinte tropft auf den Boden. Auf dem Gerät klebt ein Sticker: 'Premium Cloud Support - Wir helfen sofort!'. Du wählst die Nummer.",
        opts: [
            { 
                t: "Problem schildern: 'Alles ist schwarz!'", 
                next: "path_service_cloud_wait", 
                m: 10, f: -5, a: 5, c: 0, 
                r: "Eine KI-Stimme antwortet: 'Ihr Anliegen ist uns wichtig. Ein Techniker analysiert Ihren Cloud-Status. Bitte warten Sie auf Rückruf.' Du legst auf. Die schwarzen Seiten kommen weiter." 
            },
            { 
                t: "Anschreien: 'ICH WILL EINEN MENSCHEN!'", 
                next: "path_service_cloud_angry", 
                m: 5, f: 0, a: -10, c: 10,
                r: "'Verstanden. Ich verbinde Sie mit der Abteilung für psychologische Betreuung.' *Klick*. Aufgelegt. Das Schreien tat gut, aber der Flur starrt dich an." 
            },
            { 
                t: "Auflegen & Stecker ziehen", 
                m: 2, f: 5, a: -5, c: 5,
                r: "Du ziehst den Stecker. Der Drucker stirbt. Das Problem ist physisch gelöst, aber du wirst nie erfahren, warum er das getan hat." 
            }
        ]
    },
    {
        id: "sq_service_cloud_2a",
        kind: "text",
        title: "Technische Erklärung",
        reqStory: "path_service_cloud_wait",
        text: "Dein Telefon klingelt. 'Hier ist der Cloud-Support. Wir haben die Logs geprüft. Dass die Seiten schwarz sind, ist völlig normal.' Du fragst verdutzt nach dem Grund.",
        opts: [
            { 
                t: "Ihm ungläubig zuhören", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "'Unsere Server stehen in Tokio. Dort ist es gerade Nacht. Cloud-Printing spiegelt die lokale Zeit wider. Versuchen Sie es morgen früh wieder, dann sind die Seiten weiß.' Er legt auf. Du starrst das Telefon an." 
            },
            { 
                t: "Wütend auflegen & Hörer knallen", 
                rep: { "Dr. Wichtig": -2 },
                m: 2, f: 0, a: -10, c: 10,
                r: "Du knallst den Hörer so fest auf die Gabel, dass das Plastik knackt. Diese Inkompetenz tut körperlich weh, aber der Ausbruch war befreiend." 
            },
            { 
                t: "Sarkasmus: 'Achso, logisch!'", 
                m: 5, f: 5, a: 5, c: 0, 
                r: "'Genau. Danke für Ihr Verständnis.' Der Support merkt die Ironie nicht. Du legst auf und lachst hysterisch." 
            }
        ]
    },
    {
        id: "sq_service_cloud_2b",
        kind: "text",
        title: "Ticket geschlossen",
        reqStory: "path_service_cloud_angry",
        text: "Eine automatische SMS vom Support: 'Ticket #992 geschlossen. Lösung: Anwender wirkt gestresst. Empfehlung: Kräutertee trinken und Gerät streicheln.'",
        opts: [
            { 
                t: "Gerät treten (Rage)", 
                req: "hammer",
                m: 5, f: 0, a: -20, c: 20,
                r: "BÄM! Du trittst gegen den Drucker. Ein Plastikteil bricht ab. Jetzt druckt er gar nicht mehr. Problem erfolgreich gelöst. Der Chef hat es gehört." 
            },
            { 
                t: "Tee trinken (Kapitulation)", 
                m: 10, f: 5, a: -5, c: 0, 
                r: "Du machst dir tatsächlich einen Tee. Die KI hat gewonnen. Du hast dich dem System unterworfen." 
            },
            { 
                t: "Antworten: 'SYSTEM FAILURE'", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du sendest 'DELETE ALL' zurück. Es kommt keine Antwort, aber du fühlst dich wie ein Hacker." 
            }
        ]
    },
    {
        id: "sq_smile_gate_1",
        kind: "text",
        title: "Zwangsbeglückung",
        text: "Die neue Sicherheitsschleuse zur Kantine hat keine Kartenleser mehr. Stattdessen starrt dich eine Kamera an. Eine Roboterstimme flötet: 'Zutritt verweigert. Emotions-Level zu niedrig. Bitte lächeln Sie, um Passierschein A38 zu generieren.' Du hast Hunger und schlechte Laune.",
        opts: [
            { 
                t: "Grimasse schneiden (Lächeln erzwingen)", 
                next: "path_smile_cramp", 
                m: 5, f: -5, a: 10, c: 0, 
                r: "Du ziehst deine Mundwinkel mit den Fingern nach oben, bis es wehtut. Die Kamera zoomt und surrt. 'Lächeln erkannt. Validierung läuft...' Die Tür öffnet sich. Du reibst dir die schmerzenden Wangen und gehst essen." 
            },
            { 
                t: "System hacken: Admin-Override", 
                req: "admin_pw", 
                next: "path_smile_hack", 
                m: 2, f: 5, a: -5, c: 5, 
                r: "Du tippst den Notfall-Code auf dem Touchpad ein. Das System piept verwirrt: 'Wartungsmodus aktiv'. Die Tür springt auf und bleibt offen stehen. Du schlüpfst schnell durch." 
            },
            { 
                t: "Gesicht aus Zeitschrift vorhalten", 
                next: "path_smile_fake", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du hältst das Cover der 'IT-Woche' vor die Linse. Ein strahlender CEO grinst die Kamera an. 'Identität bestätigt: Dr. Wichtig. Willkommen, Sir.' Die Schranke öffnet sich." 
            }
        ]
    },
    {
        id: "sq_smile_gate_2a",
        kind: "text",
        title: "Gesichtskrampf",
        reqStory: "path_smile_cramp",
        text: "Stunden später. Du sitzt in einem Meeting. Plötzlich verkrampft sich dein Gesichtsmuskel von der Aktion an der Tür. Du hast jetzt ein psychotisches Dauergrinsen im Gesicht, das du nicht kontrollieren kannst. Der Chef starrt dich irritiert an.",
        opts: [
            { 
                t: "So tun als ob: 'Ich bin einfach glücklich!'", 
                m: 5, f: 5, a: 10, c: -5, 
                r: "Du nickst enthusiastisch zu allem, was er sagt. 'Tolle Zahlen, Chef!' Er wirkt verstört, aber zufrieden. 'Müller... diese positive Ausstrahlung! Vorbildlich!' Dein Kiefer schmerzt höllisch." 
            },
            { 
                t: "Auf dem Klo verstecken und massieren", 
                m: 15, f: -5, a: 0, c: 0, 
                r: "Du rennst raus. 'Muss mal!' Im Bad knetest du deine Wangen, bis der Krampf sich löst. Du hast das Meeting verpasst, aber du siehst wieder aus wie ein normaler, depressiver Angestellter." 
            },
            { 
                t: "Drohen: 'Ich lächle, weil ich Dinge weiß.'", 
                m: 2, f: 0, a: -5, c: 5, 
                r: "Du nutzt dein Grinsen als Waffe und starrst Kevin an. Er wird ganz nervös. 'Okay, okay, ich mach ja schon die Tickets!' Angst ist ein guter Motivator." 
            }
        ]
    },
    {
        id: "sq_smile_gate_2b",
        kind: "text",
        title: "Systemabsturz",
        reqStory: "path_smile_hack",
        text: "Du gehst wieder an der Kantine vorbei. Dein Hack hatte Nebenwirkungen. Die Schleuse steht immer noch offen und begrüßt JEDEN Vorbeigehenden mit lauter Stimme: 'Willkommen, Administrator. Zugriff auf Atomwaffen-Codes gewährt.'",
        opts: [
            { 
                t: "Schnell weggehen", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du beschleunigst den Schritt. Hinter dir bildet sich eine Schlange von Leuten, die kichern und Selfies mit der 'Atom-Schleuse' machen. Solange keiner Logs prüft, bist du sicher." 
            },
            { 
                t: "Schild hinhängen: 'Sprachsteuerung defekt'", 
                m: 5, f: -5, a: 0, c: 5, 
                r: "Du klebst einen Zettel an den Lautsprecher. Damit bist du haftungsrechtlich raus. Die IT-Sicherheit wird zwar toben, aber das Chaos ist eingedämmt." 
            },
            { 
                t: "Den Lautsprecher mit Tape abkleben", 
                req: "tape", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Endlich hält das Ding die Klappe. Niemand hört mehr die 'Atomwaffen'-Durchsage. Du hast den Weltfrieden gerettet (und deine Spuren verwischt)." 
            }
        ]
    },
    {
        id: "sq_smile_gate_2c",
        kind: "text",
        title: "Identitätsdiebstahl",
        reqStory: "path_smile_fake",
        text: "Eine E-Mail vom Kantinen-System: 'Vielen Dank, Dr. Wichtig! Ihre Bestellung (1x Premium-Hummer und 1x Kaviar) wurde Ihrem Konto belastet.' Offenbar hast du beim Eintreten als 'CEO' auch gleich dessen Zeche übernommen.",
        opts: [
            { 
                t: "Panik: Rechnung löschen", 
                m: 10, f: 5, a: 10, c: 20, 
                r: "Du hackst dich ins Kantinen-System und löschst den Eintrag. Leider kommt der echte Chef gerade rein und fragt, warum sein Konto gesperrt ist. 'Müller... wissen Sie was davon?'" 
            },
            { 
                t: "Bescheiden bleiben: 'War ein Systemfehler'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du meldest es der IT. 'Die KI spinnt mal wieder.' Niemand stellt Fragen. Aber der Hummer taucht auch nicht auf. Du hast nichts gewonnen, außer Angst." 
            },
            { 
                t: "Systemfehler nutzen: Noch mehr bestellen", 
                rep: { "Dr. Wichtig": -10 },
                m: 10, f: -5, a: -20, c: -5, 
                r: "Wenn schon, denn schon. Du bestellst noch eine Kiste Wein auf sein Konto. Irgendwann fliegt das auf, aber heute Abend wird gefeiert." 
            }
        ]
    },
    {
        id: "sq_desk_rise_1",
        kind: "text",
        title: "Der Aufstieg",
        text: "Du arbeitest am neuen, elektrischen 2000€-Steh-Sitz-Tisch eines kranken Kollegen. Plötzlich entwickelt der Tisch ein Eigenleben. Er fährt hoch. Und hört nicht auf. Deine Tastatur ist schon auf Brusthöhe. Der 'Stop'-Knopf klemmt.",
        opts: [
            { 
                t: "Stecker ziehen (Kriechen)", 
                loot: "cable",
                next: "path_desk_unplug", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du wirfst dich unter den Tisch. Zwischen Staubmäusen und alten Kaugummis reißt du das Stromkabel raus. Der Tisch stoppt abrupt auf 1,80m Höhe. Dabei findest du ein vergessenes LAN-Kabel!" 
            },
            { 
                t: "Gegengewicht: Draufsetzen", 
                next: "path_desk_sit", 
                m: 5, f: 5, a: 0, c: 5, 
                r: "Du springst auf die Tischplatte, um den Motor zu überlasten. Der Tisch ächzt, fährt aber weiter hoch. Jetzt sitzt du fast unter der Decke. Du springst ab, bevor du zerquetscht wirst. Der Tisch bleibt oben." 
            },
            { 
                t: "Beschweren: 'Win95 Handbuch' drauflegen", 
                req: "manual", 
                next: "path_desk_heavy", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du knallst den schweren Wälzer auf die 'Runter'-Taste. Die Taste knackt, der Tisch stoppt auf halber Höhe. Aber jetzt klemmt das Buch fest im Bedienpanel." 
            }
        ]
    },
    {
        id: "sq_desk_rise_2a",
        kind: "text",
        title: "Boden-Personal",
        reqStory: "path_desk_unplug",
        text: "Du kommst aus der Pause zurück. Der Tisch steht immer noch auf maximaler Höhe (fast 2 Meter). Dein Laptop liegt da oben. Du kommst nicht ran. Der Kollege kommt morgen wieder und wird Fragen haben.",
        opts: [
            { 
                t: "Auf den Stuhl steigen & arbeiten", 
                m: 30, f: -10, a: 20, c: 10, 
                r: "Du balancierst auf dem Drehstuhl, um zu tippen. Der Arbeitsschutzbeauftragte läuft vorbei, wird kreidebleich und macht sich hektische Notizen. Das gibt eine Sicherheitsschulung." 
            },
            { 
                t: "Kabel als Lasso benutzen", 
                req: "cable", 
                m: 10, f: 0, a: -5, c: 0, 
                r: "Du wirfst dein neues LAN-Kabel wie ein Cowboy, um den Laptop runterzuziehen. Er fällt weich in den Papierkorb. Laptop gerettet, Tisch ist immer noch ein Hochbett." 
            },
            { 
                t: "Zettel: 'Defekt' & Feierabend", 
                m: 2, f: 10, a: -5, c: 0, 
                r: "'Höhere Gewalt', murmelst du und gehst. Wenn man nicht an die Arbeit kommt, kann man nicht arbeiten. Logik." 
            }
        ]
    },
    {
        id: "sq_desk_rise_2b",
        kind: "text",
        title: "Der Hochsitz",
        reqStory: "path_desk_sit",
        text: "Der Tisch klemmt immer noch unter der Decke. Kevin hat sich inzwischen eine Leiter geholt und seinen Gaming-PC oben aufgebaut. Er nennt es 'The Tower' und wirft Papierkugeln auf vorbeigehende Kollegen.",
        opts: [
            { 
                t: "Ihm befehlen runterzukommen", 
                rep: { "Kevin": 5 },
                m: 10, f: 5, a: -10, c: 5, 
                r: "'Okay, okay, Spaßbremse.' Kevin klettert runter. Aber der Tisch bleibt oben. Du hast jetzt ein Denkmal des Versagens im Büro." 
            },
            { 
                t: "Die Leiter wegnehmen", 
                m: 5, f: -5, a: 5, c: 0, 
                r: "Du nimmst die Leiter weg. 'Viel Spaß da oben, Kevin.' Er sitzt jetzt fest. Endlich Ruhe im Büro, aber Kevin wird hungrig." 
            },
            { 
                t: "Hilfe rufen (Egon)", 
                rep: { "Egon": -5 },
                m: 20, f: 0, a: 10, c: 0, 
                r: "Egon kommt mit der großen Zange. 'Wer hat den Motor durchbrennen lassen? Das riecht man doch!' Er rettet den Tisch, aber du stehst als Idiot da." 
            }
        ]
    },
    {
        id: "sq_desk_rise_2c",
        kind: "text",
        title: "Das Handbuch-Opfer",
        reqStory: "path_desk_heavy",
        text: "Du willst dein Handbuch zurück. Aber es ist mit dem Bedienpanel verschmolzen. Der Kunststoff ist geschmolzen und hat das Buch 'assimiliert'. Der Tisch reagiert auf gar nichts mehr.",
        opts: [
            { 
                t: "Alles mit Tape fixieren", 
                req: "tape", 
                m: 10, f: -5, a: 0, c: 0, 
                r: "Du wickelst Tape drum, damit man den Schaden nicht sieht. 'Repariert'. Der Tisch ist jetzt permanent auf 1,20m Höhe fixiert. Ergonomie ist eh überbewertet." 
            },
            { 
                t: "Hammer benutzen (Buch befreien)", 
                req: "hammer", 
                m: 5, f: 0, a: 10, c: 10, 
                r: "Du schlägst das Panel ab. Funkenflug. Der Tisch sackt mit einem lauten KRRACH auf Kniehöhe ab. Das Buch ist frei, der Tisch ist Schrott." 
            },
            { 
                t: "Schild 'Kunstwerk' anbringen", 
                m: 2, f: 5, a: -5, c: 5, 
                r: "Du erklärst es zur Installation: 'Der Druck des Wissens'. Chantal postet es auf Instagram. Der Chef ist verwirrt, aber sagt nichts." 
            }
        ]
    },
    {
        id: "sq_shredder_1",
        kind: "text",
        title: "Datenschutz extrem",
        text: "Du willst einen alten Kassenbon vernichten. Der neue 'Smart-Shredder 4000' versperrt den Schlitz. Auf dem Touchscreen steht: 'Bitte Dokumentenkategorie wählen (1-99). Bestätigen Sie DSGVO-Konformität. Scannt nach Büroklammern...'",
        opts: [
            { 
                t: "Formular ehrlich ausfüllen", 
                next: "path_shred_form", 
                m: 15, f: -10, a: 10, c: 0, 
                r: "Du tippst dich durch 20 Untermenüs. 'Ist das Dokument radioaktiv?' - 'Nein'. 'Enthält es Staatsgeheimnisse?' - 'Nein'. Endlich öffnet sich der Schlitz. Du wirfst den Bon rein." 
            },
            { 
                t: "Gewalt: Einfach reinstopfen", 
                req: "hammer", 
                next: "path_shred_force", 
                m: 5, f: 0, a: -10, c: 10, 
                r: "Du nimmst den Hammerstiel und drückst das Papier gewaltsam an der Sensor-Klappe vorbei. Die Maschine jault auf, frisst das Papier und macht ein würgendes Geräusch." 
            },
            { 
                t: "Auffangbehälter prüfen (Hack)", 
                loot: "usb_stick",
                next: "path_shred_loot", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Vielleicht ist der Sensor voll? Du öffnest die Klappe unten. Im Papiermüll liegt ein USB-Stick, den wohl jemand versehentlich 'geschreddert' hat. Er sieht noch ganz aus!" 
            }
        ]
    },
    {
        id: "sq_shredder_2a",
        kind: "text",
        title: "Papierstau mit Ansage",
        reqStory: "path_shred_form",
        text: "Stunden später. Eine Rundmail an alle: 'Der Schredder ist defekt. Jemand hat versucht, Thermopapier (Kassenbon) im Modus 'Hochglanz-Broschüre' zu vernichten. Der Sensor ist verklebt.' Alle suchen den Idioten.",
        opts: [
            { 
                t: "Schreien: 'Die Maschine ist schuld!'", 
                m: 2, f: 0, a: 20, c: 0, 
                r: "Du verteidigst dich lautstark im Flur. Niemand hat dich beschuldigt, aber jetzt wirkst du sehr verdächtig." 
            },
            { 
                t: "Bon auf A4-Blatt kleben (Beweisvernichtung)", 
                req: "tape", 
                m: 10, f: -5, a: 5, c: 0, 
                r: "Du gehst heimlich hin und fummelst den Bon raus. Dann klebst du ihn auf ein normales Blatt und wirfst es in den Müll. Spuren beseitigt." 
            },
            { 
                t: "Bon essen", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Die ultimative Datenvernichtung. Schmeckt nach Thermopapier und Bisphenol A. Aber es ging schnell und niemand kann es beweisen." 
            }
        ]
    },
    {
        id: "sq_shredder_2b",
        kind: "text",
        title: "Konfetti-Party",
        reqStory: "path_shred_force",
        text: "Du gehst am Kopierraum vorbei. Der Boden ist bedeckt mit Schnipseln. Die Maschine mochte die Zwangsfütterung nicht und hat ihren gesamten Inhalt (50 Liter) rückwärts in den Raum gehustet. Egon steht fassungslos davor.",
        opts: [
            { 
                t: "Wegrennen", 
                m: 5, f: 5, a: 0, c: 10, 
                r: "Du drehst dich auf dem Absatz um. 'Nicht mein Müll.' Egon wird den Täter nie finden... hoffentlich." 
            },
            { 
                t: "Den Azubi rufen", 
                rep: { "Kevin": -10 },
                m: 5, f: 5, a: -5, c: 0, 
                r: "'Kevin! Puzzle-Zeit!' Der Azubi kommt und sieht das Chaos. Du drückst ihm einen Besen in die Hand. 'Lern was fürs Leben.' Führungskräfte delegieren." 
            },
            { 
                t: "Staubsauger holen", 
                m: 30, f: -10, a: 10, c: 0, 
                r: "Du hast Mitleid mit Egon und saugst alles auf. Dabei saugst du versehentlich das Stromkabel des Schredders ein. *PUFF*. Jetzt ist er ganz kaputt. Gut so." 
            }
        ]
    },
    {
        id: "sq_shredder_2c",
        kind: "text",
        title: "Datenschutz-Vorfall",
        reqStory: "path_shred_loot",
        text: "Du steckst den gefundenen USB-Stick an deinen PC. Darauf ist eine Datei: 'Passwörter_Alle_Mitarbeiter.xlsx'. Offenbar wollte die HR-Abteilung das 'sicher entsorgen', hat aber den Stick statt das Papier eingeworfen.",
        opts: [
            { 
                t: "Stick behalten", 
                m: 5, f: 5, a: -10, c: 20, 
                r: "Du hast jetzt Zugriff auf alles. Sogar auf das Netflix-Konto vom Chef. Du fühlst dich mächtig (und kriminell). Du steckst den Stick tief in deine Tasche." 
            },
            { 
                t: "Sofort formatieren", 
                rem: "usb_stick", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Zu heiß. Du löschst alles. Jetzt hast du einen leeren 64GB Stick für dich. Langweilig, aber sicher. (Item verbraucht/genutzt)" 
            },
            { 
                t: "Gabi geben: 'Deiner?'", 
                rem: "usb_stick",
                rep: { "Gabi": 10 },
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du bringst ihn Gabi. Sie wird rot. 'Oh! Äh... danke. Den habe ich... gesucht.' Sie schenkt dir eine Schokolade als Schweigegeld." 
            }
        ]
    },
    {
        id: "sq_elster_cat_2a",
		char: "Frau Elster",
        kind: "text",
        title: "Dankbarkeit in der Buchhaltung",
        reqStory: "path_elster_happy",
        text: "Frau Elster steht räuspernd vor deinem Schreibtisch. Sie blickt sich nervös um, öffnet ihre Handtasche und legt dir ein teures Stück Konditor-Torte auf den Tisch. 'Das ist für Ihren... inoffiziellen IT-Einsatz gestern. Rüdiger schnurrt wieder. Aber wehe, das erfährt jemand!'",
        opts: [
            { 
                t: "Kuchen annehmen & schweigen", 
                rep: { "Frau Elster": 10 },
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du isst den Kuchen. Er schmeckt nach Marzipan und Bestechung. Eine mächtige Verbündete im Büro zu haben, ist Gold wert." 
            },
            { 
                t: "Frech werden: 'Ich mache das nur für Rüdiger.'", 
                rep: { "Frau Elster": 5 },
                m: 2, f: 0, a: 5, c: 0, 
                r: "Sie zieht eine Augenbraue hoch. 'Seien Sie nicht unverschämt, Müller.' Sie geht, aber man merkt, dass sie dich jetzt respektiert." 
            }
        ]
    },
    {
        id: "sq_elster_cat_2b",
		char: "Frau Elster",
        kind: "text",
        title: "Die Quittung",
        reqStory: "path_elster_angry",
        text: "Auf deinem Tisch liegt deine letzte Reisekostenabrechnung. Sie ist komplett rot markiert. Frau Elster hat jeden Cent gestrichen. 'Parkschein ohne Uhrzeit', 'Verpflegungspauschale um 0,50€ überschritten'. Sie hat sich für dein 'Nein' beim Katzen-Notfall gerächt.",
        opts: [
            { 
                t: "Zähneknirschend neu ausfüllen", 
                rep: { "Frau Elster": 5 },
                m: 30, f: -15, a: 20, c: 0, 
                r: "Du verbringst eine halbe Stunde damit, Belege neu zu kopieren und Formulare zu tippen. Deine Aggression steigt ins Unermessliche. Katzenbesitzer sollte man nicht verärgern." 
            },
            { 
                t: "Den Chef einschalten", 
                rep: { "Frau Elster": -10, "Dr. Wichtig": -5 },
                m: 10, f: 0, a: 10, c: 15, 
                r: "Der Chef ist genervt. 'Klären Sie Ihren Kleinkrieg selbst, Müller!' Frau Elster funkelt dich beim Rausgehen böse an. Der Krieg geht weiter." 
            }
        ]
    },
    {
        id: "sq_elster_cat_2c",
		char: "Frau Elster",
        kind: "text",
        title: "Der Fresskoma-Notfall",
        reqStory: "path_elster_fat",
        text: "Frau Elster stürmt heulend in den Flur. 'RÜDIGER! Er hat sich überfressen! Er liegt nur noch auf dem Rücken und atmet schwer! Der Tierarzt musste ihm den Magen auspumpen! Irgendein kranker Hacker hat den Fressnapf manipuliert!'",
        opts: [
            { 
                t: "Schlechtes Gewissen: Tierarztkosten anonym spenden", 
                rep: { "Frau Elster": 5 },
                m: 5, f: 0, a: 15, c: 0, 
                r: "Du legst heimlich 50 Euro in einen Umschlag auf ihren Platz. Das lindert deine Schuldgefühle ein bisschen, aber dein Blutdruck steigt vor Stress. Armer Rüdiger." 
            },
            { 
                t: "Lügen: 'Das war bestimmt ein Software-Bug.'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "'Diese billige China-Technik!', schluchzt sie. Du nickst eifrig und verziehst dich schnell. Du bist ein eiskaltes Monster." 
            }
        ]
    },
    {
        id: "sq_shredder_puzzle_1",
		char: "Frau Elster",
        kind: "text",
        title: "Das Puzzle des Todes",
        text: "Frau Elster kniet weinend vor dem Papierschredder. 'Ich habe aus Versehen den original unterschriebenen Leasing-Vertrag geschreddert! Wenn der Chef das sieht, bin ich tot! Wir müssen das wieder zusammensetzen!' Vor ihr liegt ein Berg Konfetti.",
        opts: [
            { 
                t: "Auf den Boden setzen und puzzeln", 
                next: "path_shredder_puzzle",
                rep: { "Frau Elster": 15 },
                m: 90, f: -20, a: 20, c: 0, 
                r: "Du sortierst 90 endlose Minuten lang Papierschnipsel. Am Ende klebt der Vertrag wieder. Du hast massiv Arbeitszeit verloren und bist furchtbar wütend. Frau Elster nimmt den Vertrag und rennt los." 
            },
            { 
                t: "Grob mit Panzertape laminieren", 
                req: "tape",
                next: "path_shredder_tape",
                rep: { "Frau Elster": 10 },
                m: 15, f: 0, a: 0, c: 0, 
                r: "Du klatschst rigoros dickes Panzertape drüber und jagst das Monstrum durch den Kopierer. Sieht furchtbar aus, ist aber rechtlich noch gültig. Frau Elster bedankt sich hektisch. Du gehst wieder an die Arbeit." 
            },
            { 
                t: "Kopfhörer aufsetzen & weggehen", 
                req: "headphones",
                next: "path_shredder_ignore",
                rep: { "Frau Elster": -15 },
                m: 2, f: 5, a: -10, c: 0, 
                r: "Klick. Noise-Cancelling an. Du blickst mitleidsvoll herab, nickst ihr stumm zu und gehst in dein Büro. Nicht dein Fehler, nicht dein Problem." 
            }
        ]
    },
    {
        id: "sq_shredder_puzzle_2a",
		char: "Frau Elster",
        kind: "text",
        title: "Ewige Dankbarkeit",
        reqStory: "path_shredder_puzzle",
        text: "Später kommt Frau Elster an deinen Platz geschlendert. Der Stress von vorhin ist komplett verflogen. Sie legt eine goldene Schachtel Pralinen und einen unterschriebenen Blanko-Spesenbeleg auf deinen Tisch. 'Sie haben mein Leben gerettet, Herr Müller.'",
        opts: [
            { 
                t: "Gnade annehmen", 
                loot: "chocolate",
                m: 5, f: 0, a: -20, c: -10, 
                r: "Das war es wert. Der Chef-Radar sinkt, weil Frau Elster jetzt überall in den höchsten Tönen von dir schwärmt. Und du hast Schokolade." 
            },
            { 
                t: "Gierig: 'Haben Sie auch noch Kaffee dazu?'", 
                rep: { "Frau Elster": -5 },
                m: 2, f: 5, a: 5, c: 0, 
                r: "Ihr Lächeln friert ein. 'Man reicht den kleinen Finger...', murmelt sie und zieht den Spesenbeleg wieder zurück. Die Schokolade lässt sie immerhin da." 
            },
            { 
                t: "Edelmütig ablehnen: 'War mir eine Ehre.'", 
                rep: { "Frau Elster": 15 },
                m: 5, f: 0, a: -10, c: -15, 
                r: "Frau Elster ist den Tränen nahe. 'Sie sind ein wahrer Gentleman!' Sie nimmt die Schokolade wieder mit, aber ab heute bist du ihr absoluter Lieblingskollege. Das ist mehr wert als Pralinen." 
            }
        ]
    },
    {
        id: "sq_shredder_puzzle_2b",
		char: "Frau Elster",
        kind: "text",
        title: "Der Leasing-Rückläufer",
        reqStory: "path_shredder_tape",
        text: "Stunden nach deiner Tape-Aktion ruft der Chef dich und Frau Elster ins Büro. Er hält eure kopierte Tape-Version hoch. 'Die Bank hat das abgelehnt. Sie sagen, das sieht aus wie der Erpresserbrief eines Serienmörders. Wer war das?!'",
        opts: [
            { 
                t: "Die Schuld auf die Bank schieben", 
                rep: { "Frau Elster": 5 },
                m: 10, f: 0, a: 10, c: 10, 
                r: "'Deren Scanner sind einfach veraltet, Chef!' Er seufzt. 'Bürokraten.' Frau Elster atmet auf. Du hast euch beide elegant aus der Affäre geredet." 
            },
            { 
                t: "Frau Elster verpfeifen", 
                rep: { "Frau Elster": -15, "Dr. Wichtig": 5 },
                m: 5, f: 0, a: 0, c: 0, 
                r: "'Sie hat ihn geschreddert, Chef.' Frau Elster bricht in Tränen aus. Du bist der absolute Verräter. Sie wird sich grausam rächen." 
            },
            { 
                t: "Vorschlagen: 'Wir fälschen die Unterschrift neu!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 10, f: 0, a: 10, c: 30, 
                r: "'Urkundenfälschung?! Sind Sie wahnsinnig?!' Der Chef schmeißt dich raus. Das war ein Schritt zu weit." 
            }
        ]
    },
    {
        id: "sq_shredder_puzzle_2c",
		char: "Frau Elster",
        kind: "text",
        title: "Der kalte Entzug",
        reqStory: "path_shredder_ignore",
        text: "Du hast das Shredder-Drama von vorhin fast vergessen. Da du Frau Elster nicht geholfen hast, musste sie den Fehler beim Chef beichten. Als du dir jetzt einen neuen Notizblock aus dem Lager holen willst, knallt sie die Tür vor deiner Nase zu.",
        opts: [
            { 
                t: "Betteln: 'Ich brauche nur einen Stift.'", 
                m: 15, f: -5, a: 15, c: 0, 
                r: "'Geschlossen!', brüllt sie von drinnen. Du musst 15 Minuten diskutieren, bis sie einen Kuli unter der Tür durchschiebt. Deine Arroganz von vorhin hat dich jetzt Zeit gekostet." 
            },
            { 
                t: "Aufbrechen mit Schraubendreher", 
                req: "screw",
                m: 5, f: 0, a: 20, c: 10, 
                r: "Du schraubst einfach das Türschloss ab. Frau Elster kreischt: 'VANDALISMUS!' Du greifst dir einen Stift und gehst. Der Krieg eskaliert weiter." 
            },
            { 
                t: "Den Azubi Kevin schicken", 
                rep: { "Kevin": -5 },
                m: 10, f: 10, a: 0, c: 0, 
                r: "Du schickst Kevin. Frau Elster lässt ihn rein, aber er bringt statt Stiften nur bunte Textmarker mit. Besser als nichts." 
            }
        ]
    },
    {
        id: "sq_fragile_drive_1",
        kind: "text",
        title: "Gefahrgut-Transport",
        text: "Du musst eine unersetzliche, völlig unverpackte Festplatte mit den Bauplänen der Firma in den 4. Stock bringen. Der Aufzug ist kaputt. Die Treppen sind frisch gewischt und extrem rutschig. Ein falscher Schritt und die Existenz der Firma zerschellt auf den Fliesen.",
        opts: [
            { 
                t: "Luftpolsterfolie als Airbag nutzen", 
                rem: "bubble_wrap", 
                next: "path_drive_wrap", 
                m: 10, f: 0, a: -10, c: -5, 
                r: "Du wickelst die Festplatte dick in deine geliebte Knallfolie ein. Du rutschst tatsächlich auf der Treppe aus, aber die Folie dämpft den Sturz perfekt. Daten gerettet, Folie weg." 
            },
            { 
                t: "Vorsichtig wie auf rohen Eiern gehen", 
                next: "path_drive_careful", 
                m: 30, f: -10, a: 20, c: 0, 
                r: "Du brauchst ewig. Jede Treppenstufe ist ein mentaler Kraftakt. Dein Puls rast, aber die Platte kommt heile oben an. Du bist völlig erschöpft." 
            },
            { 
                t: "Keine Zeit! Rennen!", 
                next: "path_drive_run",
                m: 5, f: 5, a: 30, c: 10, 
                r: "Du sprintest los. Du fängst dich auf der Treppe gerade noch ab und zerrst dir massiv den Rücken. Die Platte ist heile, aber du läufst heute wie der Glöckner von Notre-Dame." 
            }
        ]
    },
    {
        id: "sq_fragile_drive_2a",
        kind: "text",
        title: "Therapie für andere",
        reqStory: "path_drive_wrap",
        text: "Du kommst oben an und übergibst die eingewickelte Festplatte. Die Kollegin packt sie aus und fängt sofort an, genüsslich deine alte Luftpolsterfolie zu ploppen. 'Ohhh, danke Müller! Das entspannt total!'",
        opts: [
            { 
                t: "Ihr die Freude gönnen", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Ein gutes Werk getan. Das Ploppen hallt leise den Flur hinunter." 
            },
            { 
                t: "Folie entreißen: 'Das war nicht geschenkt!'", 
                loot: "bubble_wrap",
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du nimmst ihr das Plastik eiskalt wieder aus den Händen. 'Das ist IT-Eigentum!' Sie guckt dich an, als hättest du ihr gerade Weihnachten gestrichen, aber du hast deinen Schatz zurück." 
            }
        ]
    },
    {
        id: "sq_fragile_drive_2b",
        kind: "text",
        title: "Die Schnecke",
        reqStory: "path_drive_careful",
        text: "Weil du auf der Treppe so extrem langsam warst, hat das Projekt-Team im 4. Stock die Deadline für die Baupläne knapp verfehlt. Der Projektleiter steht schnaubend vor dir. 'Haben Sie die Festplatte getragen oder persönlich hochgerollt?!'",
        opts: [
            { 
                t: "Erklären: 'Sicherheit geht vor!'", 
                m: 10, f: 0, a: 10, c: 5, 
                r: "Du erklärst ihm die physikalischen Auswirkungen eines Headcrashes. Er versteht kein Wort, ist aber zu müde, um weiter zu streiten." 
            },
            { 
                t: "Schuld auf den Aufzug schieben", 
                rep: { "Egon": -5 },
                m: 5, f: 0, a: 0, c: 0, 
                r: "'Beschweren Sie sich beim Facility Management!' Du reichst den schwarzen Peter weiter. Egon wird sich wundern, warum er plötzlich böse Mails bekommt." 
            }
        ]
    },
    {
        id: "sq_fragile_drive_2c",
        kind: "text",
        title: "Der Hexenschuss",
        reqStory: "path_drive_run",
        text: "Die Quittung für deinen Treppen-Sprint: Du stehst am Kopierer und plötzlich blockiert dein unterer Rücken komplett. Du hängst in einem 90-Grad-Winkel fest. Chantal kommt vorbei und starrt dich an. 'Machst du Yoga?'",
        opts: [
            { 
                t: "Um Hilfe bitten", 
                rep: { "Chantal": 5 },
                m: 15, f: 0, a: 10, c: 0, 
                r: "Chantal holt eine Wärmeflasche und stützt dich bis zu deinem Stuhl. 'Du armes Ding.' Peinlich, aber du kannst wieder (halbwegs) aufrecht sitzen." 
            },
            { 
                t: "Lügen: 'Ich suche eine Kontaktlinse!'", 
                m: 5, f: 5, a: 15, c: 0, 
                r: "Du kriechst gebückt zurück in dein Büro. Chantal zuckt mit den Schultern. Du arbeitest den restlichen Tag im Liegen unterm Schreibtisch." 
            }
        ]
    },
    {
        id: "sq_investor_wifi_1",
        kind: "text",
        title: "Der VIP-Wutanfall",
        text: "Auf dem Flur steht ein wichtiger, wutentbrannter Investor im Maßanzug. Er brüllt in sein Handy. 'Das blöde VIP-WLAN geht nicht! Wenn ich in zwei Minuten meine Aktienkurse nicht laden kann, ziehe ich meine Millionen ab!' Er sieht dich. 'SIE! MACHEN SIE DAS INTERNET AN!'",
        opts: [
            { 
                t: "Den Gäste-WLAN Zettel geben", 
                rem: "wifi_note", 
                next: "path_investor_note", 
                rep: { "Dr. Wichtig": 15 },
                m: 2, f: 5, a: -10, c: -20, 
                r: "Du drückst ihm wortlos den zerknitterten, gelben Zettel in die Hand. Er loggt sich ein, atmet tief durch und nickt dir dankbar zu. Firma gerettet." 
            },
            { 
                t: "VIP-Router manuell neu starten", 
                next: "path_investor_reboot", 
                m: 15, f: -10, a: 20, c: 5, 
                r: "Du sprintest zum Verteilerkasten und bootest den Router neu. Als du zurückkommst, hat der Investor in der Zwischenzeit den Chef rundgemacht. Das gibt Ärger." 
            },
            { 
                t: "Hinter der Kaffeemaschine verstecken", 
                next: "path_investor_hide", 
                m: 10, f: 5, a: 0, c: 15, 
                r: "Investoren sind Chef-Sache. Du versteckst dich, bis das Geschrei auf dem Flur leiser wird und der Mann wütend abzieht." 
            }
        ]
    },
    {
        id: "sq_investor_wifi_2a",
        kind: "text",
        title: "Reich belohnt",
        reqStory: "path_investor_note",
        text: "Der Investor hat sein Meeting beendet. Er klopft dir im Vorbeigehen auf die Schulter. 'Schnelle und unbürokratische Lösung vorhin mit dem Zettel. So was mag ich.' Er drückt dir etwas in die Hand und geht.",
        opts: [
            { 
                t: "In die Hand schauen", 
                m: 5, f: 10, a: -25, c: -10, 
                r: "Es ist ein 50-Euro-Schein! Einfach so. Trinkgeld in der IT? Ein historischer Moment. Deine Laune ist auf dem absoluten Höhepunkt." 
            }
        ]
    },
    {
        id: "sq_investor_wifi_2b",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Der Reboot-Rückschlag",
        reqStory: "path_investor_reboot",
        text: "Der Chef stürmt in dein Büro. 'Müller! Warum haben Sie den VIP-Router neugestartet?! Der Investor hatte gerade eine laufende Verbindung zu seiner Bank in Singapur! Die Order ist abgebrochen!'",
        opts: [
            { 
                t: "Erklären: 'Er hat mich angeschrien!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 10, f: 0, a: 10, c: 20, 
                r: "'Er ist Investor! Er DARF schreien!' Der Chef ist außer sich. Das VIP-WLAN fasst du so schnell nicht mehr an." 
            },
            { 
                t: "Lügen: 'Automatische Firmware-Aktualisierung.'", 
                m: 5, f: 0, a: 0, c: 10, 
                r: "Du schiebst es auf den Hersteller. Der Chef flucht über Cisco. Er lässt dich in Ruhe, aber das Vertrauen in die Technik sinkt." 
            }
        ]
    },
    {
        id: "sq_investor_wifi_2c",
        kind: "text",
        title: "Das Versteckspiel fliegt auf",
        reqStory: "path_investor_hide",
        text: "Du sitzt immer noch geduckt hinter der Kaffeemaschine. Plötzlich blickt der Investor über den Tresen direkt auf dich herab. 'Was machen Sie da unten? Suchen Sie das WLAN?'",
        opts: [
            { 
                t: "So tun, als würdest du putzen", 
                m: 10, f: -5, a: 15, c: 5, 
                r: "'Ja, sehr schmutzig hier unten!' Du reibst mit dem Ärmel über den Boden. Der Investor schüttelt den Kopf. 'Ein Tollhaus.' Er verlässt das Gebäude." 
            },
            { 
                t: "Flucht nach vorn: 'Ich meditiere.'", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "'Innovative Unternehmenskultur', murmelt der Investor und geht sichtlich verwirrt. Peinlich, aber er hat das WLAN vergessen." 
            }
        ]
    },
    {
        id: "sq_sleeping_guard_1",
        kind: "text",
        title: "Tiefschlaf am Empfang",
        text: "Du willst durch den Hintereingang, aber der Sicherheitsmann schnarcht tief und fest. Sein Kopf liegt auf einem Kreuzworträtsel. Draußen hämmert ein gestresster Express-Bote gegen die Scheibe und will dringend ein wichtiges Server-Ersatzteil abgeben.",
        opts: [
            { 
                t: "Energy Drink unter die Nase halten", 
                rem: "energy", 
                next: "path_guard_energy", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "ZISCH. Du öffnest die Dose direkt an seinem Ohr. Er schreckt hoch, greift reflexartig nach der Dose, ext sie und öffnet hellwach die Tür für den Boten. Perfekt." 
            },
            { 
                t: "Tür selbst öffnen & Paket annehmen", 
                next: "path_guard_package", 
                m: 15, f: -5, a: 5, c: 10, 
                r: "Du öffnest die Tür selbst und unterschreibst das Formular mit 'Mickey Mouse'. Du trägst das schwere Teil selbst rein. Der Wachmann schläft friedlich weiter." 
            },
            { 
                t: "Ihn anschreien: 'ALARM!'", 
                next: "path_guard_scream", 
                m: 5, f: 0, a: 15, c: -5, 
                r: "Er fällt vor Schreck vom Stuhl und reißt seinen Kaffee um. Er hasst dich jetzt, macht aber fluchend die Tür auf." 
            }
        ]
    },
    {
        id: "sq_sleeping_guard_2a",
        kind: "text",
        title: "Der hyperaktive Wächter",
        reqStory: "path_guard_energy",
        text: "Das Taurin aus deinem Energy Drink zeigt volle Wirkung. Der Wachmann patrouilliert jetzt mit aufgerissenen Augen und 150 Puls durch die Flure. Er hat bereits zwei harmlose Praktikanten an die Wand gestellt und nach dem Ausweis gefragt.",
        opts: [
            { 
                t: "Zustimmend nicken: 'Sicherheit geht vor.'", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Der Flur ist extrem sicher heute. Du fühlst dich gut bewacht, auch wenn die Praktikanten weinen." 
            },
            { 
                t: "Ihm raten, sich zu beruhigen", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "'ICH BIN RUHIG!' brüllt er zurück. Okay, verstanden. Besser keinen Augenkontakt mehr aufbauen." 
            }
        ]
    },
    {
        id: "sq_sleeping_guard_2b",
        kind: "text",
        title: "Urkundenfälschung",
        reqStory: "path_guard_package",
        text: "Eine Rundmail von HR: 'Ein wichtiges Paket wurde heute Morgen von 'Mickey Mouse' quittiert. Wer war das? Das Paket enthielt keine Hardware, sondern die neuen Firmen-Smartphones. Wir leiten rechtliche Schritte ein!'",
        opts: [
            { 
                t: "Dem Wachmann die Schuld geben", 
                m: 10, f: 0, a: 10, c: -10, 
                r: "Du meldest anonym, dass der Wachmann im Dienst schlief. Er wird gefeuert, du behältst die Handys nicht, aber du bist sicher. Furchtbares Karma." 
            },
            { 
                t: "Sich stellen: 'Ich wollte nur helfen!'", 
                rep: { "Dr. Wichtig": 5 },
                m: 20, f: -5, a: 5, c: 10, 
                r: "Du klärst das Missverständnis auf. HR meckert wegen der falschen Unterschrift, aber der Chef ist froh, dass die teuren Geräte da sind." 
            }
        ]
    },
    {
        id: "sq_sleeping_guard_2c",
        kind: "text",
        title: "Die Schikane",
        reqStory: "path_guard_scream",
        text: "Du willst nach der Pause wieder ins Gebäude. Der Wachmann von vorhin steht an der Tür. Er erkennt dich. 'Halt. Ausweiskontrolle. Und Taschenkontrolle. Ich muss den Laptop auf Seriennummer prüfen.'",
        opts: [
            { 
                t: "Ausrasten: 'Ich arbeite hier seit 5 Jahren!'", 
                m: 10, f: 0, a: 20, c: 5, 
                r: "'Vorschrift ist Vorschrift', grinst er. Er lässt dich 10 Minuten in der Kälte warten, bevor er die Schranke öffnet. Rache ist süß." 
            },
            { 
                t: "Brav mitmachen (Deeskalation)", 
                m: 15, f: 0, a: 10, c: 0, 
                r: "Du holst tief Luft und packst alles aus. Er lässt sich extra viel Zeit. Du kommst massiv zu spät zu einem Server-Neustart." 
            }
        ]
    },
    {
        id: "sq_boss_fight_hallway_1",
		char: "Markus",
        kind: "text",
        title: "Clash der Titanen",
        text: "Der Vertriebsleiter Markus und Björn vom Marketing stehen Stirn an Stirn auf dem Flur und brüllen sich an. Es geht um den letzten freien Meetingraum. Die Spucke fliegt, die Gesichter sind purpurrot. Niemand traut sich an den beiden vorbei.",
        opts: [
            { 
                t: "Den Stressball einsetzen", 
                req: "stressball", 
                next: "path_hallway_ball", 
                rep: { "Markus": 5 },
                m: 5, f: 5, a: -20, c: -5, 
                r: "Du gehst stumm dazwischen. Du drückst erst Markus den Ball in die Hand – er quetscht reflexartig. Dann gibst du ihn Björn. *Quietsch*. Du nimmst den Ball wortlos wieder an dich und gehst weiter. Beide Abteilungsleiter schauen dir völlig verwirrt hinterher. Situation entspannt." 
            },
            { 
                t: "Vernünftig dazwischengehen", 
                next: "path_hallway_peace", 
                m: 10, f: 0, a: 25, c: 5, 
                r: "Du versuchst zu schlichten. Beide drehen sich synchron zu dir um und brüllen: 'HALT DICH DA RAUS, IT!' Du ziehst dich fast traumatisiert in dein Büro zurück." 
            },
            { 
                t: "Umweg über das Treppenhaus nehmen", 
                next: "path_hallway_detour", 
                m: 15, f: 10, a: 0, c: 0, 
                r: "Du hast auf so ein Drama absolut keine Lust. Du gehst den langen Weg durch den Keller. Dauert länger, schont aber die Nerven." 
            }
        ]
    },
    {
        id: "sq_boss_fight_hallway_2a",
		char: "Markus",
        kind: "text",
        title: "Der Guru",
        reqStory: "path_hallway_ball",
        text: "Du siehst Markus und Björn später friedlich bei einem Kaffee zusammenstehen. Als du vorbeigehst, flüstert Markus zu Björn: 'Sagen Sie mal... was war das vorhin mit Müller und dem roten Ball?' - 'Keine Ahnung. Aber mein Puls war danach sofort auf 60. Der Mann hat eine Aura.'",
        opts: [
            { 
                t: "Mystisch nicken", 
                m: 2, f: 5, a: -10, c: -5, 
                r: "Du nickst den beiden wissend zu, sagst nichts und gehst weiter. Du bist jetzt eine Legende im Flurfunk." 
            }
        ]
    },
    {
        id: "sq_boss_fight_hallway_2b",
		char: "Markus",
        kind: "text",
        title: "Vereinte Feinde",
        reqStory: "path_hallway_peace",
        text: "Dein Schlichtungsversuch hat einen bizarren Effekt: Markus und Björn haben sich über ihren gemeinsamen Hass auf die IT verbündet. Beide blockieren jetzt deine Bug-Reports. 'IT hat keine Prio', sagt Markus lachend zu Björn im Flur.",
        opts: [
            { 
                t: "Rache: Beide aus dem VPN werfen", 
                rep: { "Markus": -10 },
                m: 10, f: -5, a: 15, c: 10, 
                r: "Du killst ihre VPN-Zertifikate. Sollen sie doch offline weiter lästern. Deine Aggression sinkt kurz, aber das gibt bald böse Mails." 
            },
            { 
                t: "Seufzen und ignorieren", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du hast keine Kraft für Revierkämpfe. Du lässt sie reden und arbeitest einfach weiter." 
            }
        ]
    },
    {
        id: "sq_boss_fight_hallway_2c",
        kind: "text",
        title: "Der Keller-Fund",
        reqStory: "path_hallway_detour",
        text: "Weil du den Umweg durch den alten Keller genommen hast, entdeckst du eine verstaubte Kiste im Heizungsraum. Darin liegt völlig unbenutztes, altes IT-Werkzeug, das jemand vor Jahren vergessen hat.",
        opts: [
            { 
                t: "Schraubendreher einstecken", 
                loot: "screw", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Ein erstklassiger Kreuzschlitz. Das Universum belohnt den Weg des geringsten Widerstands." 
            },
            { 
                t: "Kabelbinder mitnehmen", 
                loot: "zip_ties", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Eine halbe Packung schwarze Kabelbinder. Immer gut zu gebrauchen." 
            }
        ]
    },
    {
        id: "sq_printer_jam_1",
        kind: "text",
        title: "Drucker im Streik",
        text: "Der große Abteilungsdrucker piept hysterisch: 'Papierstau in Fach 3'. Eine wütende Traube von Mitarbeitern steht davor. Niemand traut sich, die Klappe aufzumachen.",
        opts: [
            { 
                t: "Die Klappe mutig öffnen und reingreifen", 
                next: "path_printer_fix", 
                m: 15, f: 0, a: 5, c: 0, 
                r: "Du ziehst tief im Inneren an zerrissenen Papierfetzen. Deine Hände sind voller Toner, aber die Maschine druckt wieder." 
            },
            { 
                t: "Mit dem Handbuch drohen", 
                req: "manual", 
                next: "path_printer_manual", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du schlägst das dicke Buch auf und liest laut vor: 'Reparatur nur durch zertifiziertes Fachpersonal!' Die Menge weicht ehrfürchtig zurück." 
            },
            { 
                t: "Lügen: 'Das ist ein Hardware-Defekt!'", 
                next: "path_printer_lie", 
                m: 2, f: 5, a: 0, c: 5, 
                r: "Du hängst fachmännisch ein 'Defekt'-Schild auf. Problem delegiert. Niemand druckt heute mehr." 
            }
        ]
    },
    {
        id: "sq_printer_jam_2a",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Schwarze Hände",
        reqStory: "path_printer_fix",
        text: "Deine Hände sind komplett schwarz vom Toner. Auf dem Weg ins Bad begegnest du dem CEO. Er will dir freudig die Hand schütteln, um dir zum Firmenjubiläum zu gratulieren.",
        opts: [
            { 
                t: "Ihm eiskalt die dreckige Hand geben", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, f: 0, a: 10, c: 15, 
                r: "Du schüttelst seine Hand. Er starrt entsetzt auf seine ruinierten Finger. Du hast soeben eine Beförderung beerdigt." 
            },
            { 
                t: "Peinlich berührt ablehnen", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du hebst abwehrend die Hände. Er nickt verständnisvoll. 'Ah, IT an der Front. Weitermachen!'" 
            }
        ]
    },
    {
        id: "sq_printer_jam_2b",
        kind: "text",
        title: "Die teure Rechnung",
        reqStory: "path_printer_manual",
        text: "Ein eifriger Kollege hat wegen deiner 'Fachpersonal'-Aussage tatsächlich den externen Support gerufen. Der Techniker steht da, zieht ein Blatt Papier aus dem Drucker und präsentiert eine Rechnung über 250 Euro.",
        opts: [
            { 
                t: "Die Schuld auf die User schieben", 
                m: 10, f: 0, a: 5, c: 15, 
                r: "Du erklärst der Buchhaltung, dass die User panisch reagiert haben. Frau Elster tobt, aber du bist fein raus." 
            },
            { 
                t: "Dem Techniker einen Kaffee anbieten", 
                m: 15, f: 0, a: -5, c: 10, 
                r: "Du verbrüderst dich mit dem externen ITler. Ihr lacht über die Inkompetenz der Belegschaft. Gut für die Seele, schlecht fürs Budget." 
            }
        ]
    },
    {
        id: "sq_printer_jam_2c",
        kind: "text",
        title: "Die Alternative",
        reqStory: "path_printer_lie",
        text: "Da der Abteilungsdrucker 'kaputt' ist, stehen nun plötzlich fünf Kollegen in deinem Büro und wollen, dass du ihre extrem wichtigen Dokumente an deinem kleinen lokalen Drucker ausdruckst.",
        opts: [
            { 
                t: "Deinen Drucker auch kaputtmelden", 
                m: 5, f: 10, a: -5, c: 5, 
                r: "Du ziehst einfach das USB-Kabel und zuckst mit den Schultern. Die Kollegen ziehen enttäuscht ab." 
            },
            { 
                t: "Seufzen und als Copy-Shop arbeiten", 
                m: 30, f: -5, a: 20, c: 0, 
                r: "Du verbringst eine halbe Stunde damit, Verträge für andere Leute auszudrucken. Deine Toner-Patrone weint." 
            }
        ]
    },
    {
        id: "sq_crying_intern_1",
        kind: "text",
        title: "Tränen im Flur",
        text: "Du findest den neuen Praktikanten weinend auf der Treppe. 'Ich habe versehentlich die Präsentation für den CEO gelöscht und den Papierkorb geleert. Ich werde gefeuert!'",
        opts: [
            { 
                t: "Schokolade als Trost spenden", 
                rem: "chocolate", 
                next: "path_intern_choc", 
                rep: { "Kevin": 15 },
                m: 10, f: 0, a: -10, c: 0, 
                r: "Du drückst ihm die Schokolade in die Hand. Das Kauen beruhigt ihn sofort und er hört auf zu weinen." 
            },
            { 
                t: "Tief in die Trickkiste greifen (Recovery)", 
                next: "path_intern_recover", 
                m: 30, f: -5, a: 15, c: -5, 
                r: "Du setzt dich an seinen Platz, gräbst tief im Dateisystem und rettest die Datei. Du fühlst dich wie ein Hacker aus einem Hollywood-Film." 
            },
            { 
                t: "Ihm eiskalt sagen, dass es vorbei ist", 
                next: "path_intern_doom", 
                m: 5, f: 5, a: 10, c: 5, 
                r: "Lernen durch Schmerz. Du klopfst ihm auf die Schulter und sagst: 'Fang schon mal an, deine Kaffeetasse einzupacken.'" 
            }
        ]
    },
    {
        id: "sq_crying_intern_2a",
        kind: "text",
        title: "Die Schokoladen-Kur",
        reqStory: "path_intern_choc",
        text: "Der Praktikant steht wieder vor dir. 'Die Schokolade war toll, danke! Aber die Datei ist immer noch weg. Was mach ich denn jetzt?'",
        opts: [
            { 
                t: "Ihm sagen, er soll sie neu machen", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Dummheit bestraft sich selbst. Er setzt sich schluchzend an PowerPoint und fängt von vorne an." 
            },
            { 
                t: "Erbarmen haben und doch noch helfen", 
                m: 20, f: -5, a: 10, c: -10, 
                r: "Du stellst die Datei aus einem Backup wieder her. Deine Güte kostet dich viel Zeit." 
            }
        ]
    },
    {
        id: "sq_crying_intern_2b",
        kind: "text",
        title: "Die Wahrheit über die Datei",
        reqStory: "path_intern_recover",
        text: "Du hast die Präsentation zwar gerettet, aber du stellst beim Öffnen fest, dass es gar keine CEO-Präsentation war. Es ist eine Sammlung von Katzen-Memes für den 'Fun Friday'.",
        opts: [
            { 
                t: "Ihm eine massive Standpauke halten", 
                m: 5, f: 0, a: 15, c: 0, 
                r: "Du brüllst ihn zusammen, weil du eine halbe Stunde für Witze verschwendet hast. Er wird dich künftig meiden." 
            },
            { 
                t: "Ein eigenes Meme hinzufügen", 
                m: 10, f: 10, a: -5, c: 5, 
                r: "Du bastelst schnell ein Bild von einem weinenden Praktikanten rein. Der Humor in der IT ist dunkel." 
            }
        ]
    },
    {
        id: "sq_crying_intern_2c",
        kind: "text",
        title: "Die Kündigung",
        reqStory: "path_intern_doom",
        text: "Der Praktikant hat aus Panik vor dir wirklich seine Sachen gepackt und ist gegangen. HR ruft an: 'Müller! Was haben Sie dem armen Jungen gesagt?! Wir müssen jetzt neu ausschreiben!'",
        opts: [
            { 
                t: "Verteidigen: 'Er hat Firmendaten gelöscht!'", 
                m: 5, f: 0, a: 10, c: 10, 
                r: "Du stellst ihn als inkompetentes Risiko dar. HR grummelt, aber kann dir fachlich nichts anhaben." 
            },
            { 
                t: "Ahnungslos tun: 'Er war wohl überlastet.'", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Du schiebst es auf den allgemeinen Druck. Die Firma fragt sich, ob das Onboarding zu hart ist." 
            }
        ]
    },
    {
        id: "sq_wrong_delivery_1",
        kind: "text",
        title: "Falsche Lieferung",
        text: "Ein Lieferando-Bote drückt dir im Vorbeigehen hastig eine braune Papiertüte in die Hand. 'Einmal Pastrami-Sandwich für... äh, den dritten Stock! Schönen Tag noch!' Er verschwindet nach draußen.",
        opts: [
            { 
                t: "Selbst behalten", 
                loot: "sandwich", 
                next: "path_delivery_keep", 
                m: 2, f: -5, a: -5, c: 5, 
                r: "Du nimmst das Essen an dich. Gratis-Lunch auf Firmenkosten!" 
            },
            { 
                t: "Im dritten Stock nach dem Besitzer suchen", 
                loot: "sandwich", 
                next: "path_delivery_search", 
                m: 15, f: -5, a: 10, c: 0, 
                r: "Du läufst gutmütig durch alle Büros, aber niemand will ein Sandwich bestellt haben. Du fühlst dich wie ein Postbote." 
            },
            { 
                t: "Die Tüte am Empfang abstellen", 
                next: "path_delivery_leave", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Nicht dein Sandwich, nicht dein Problem. Du stellst es auf den Tresen und gehst." 
            }
        ]
    },
    {
        id: "sq_wrong_delivery_2a",
		char: "Frau Elster",
        kind: "text",
        title: "Die hungrige Elster",
        reqStory: "path_delivery_keep",
        text: "Frau Elster ruft an. 'Herr Müller, haben Sie unten zufällig den Kurier gesehen? Mein auf Firmenkosten bestelltes Pastrami-Sandwich ist verschwunden!'",
        opts: [
            { 
                t: "Lügen: 'Nein, niemanden gesehen.'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du streichst dir einen Krümel vom Mund. Sie wird den Lieferdienst hassen, aber du bist satt und sicher." 
            },
            { 
                t: "Das Sandwich zähneknirschend hochbringen", 
                rem: "sandwich", 
                rep: { "Frau Elster": 10 },
                m: 10, f: -5, a: 15, c: 0, 
                r: "Du opferst deinen Loot. Sie freut sich riesig, aber du hast jetzt massiven Hunger und bist wütend." 
            }
        ]
    },
    {
        id: "sq_wrong_delivery_2b",
        kind: "text",
        title: "Die kalte Wahrheit",
        reqStory: "path_delivery_search",
        text: "Nach 15 Minuten sinnloser Suche durch den gesamten dritten Stock hast du das Sandwich immer noch. Es wird langsam kalt und das Fett zieht durch die Tüte.",
        opts: [
            { 
                t: "Es jetzt genervt selbst essen", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "Es schmeckt fantastisch, auch wenn es lauwarm ist. Deine Aggression sinkt." 
            },
            { 
                t: "Es in den Mülleimer werfen", 
                m: 2, f: 0, a: 10, c: 0, 
                r: "Aus Prinzip isst du kein fremdes Essen. Du wirfst 15 Euro in den Müll." 
            }
        ]
    },
    {
        id: "sq_wrong_delivery_2c",
        kind: "text",
        title: "Der Geruch des Verfalls",
        reqStory: "path_delivery_leave",
        text: "Die Tüte stand stundenlang in der Sonne auf dem Tresen. Es riecht jetzt unangenehm im ganzen Eingangsbereich nach altem Pastrami.",
        opts: [
            { 
                t: "Egon rufen, damit er putzt", 
                rep: { "Egon": -5 },
                m: 10, f: 5, a: 5, c: 0, 
                r: "Egon flucht minutenlang über die 'Schweinepriester' in dieser Firma. Du stimmst ihm heuchelnd zu." 
            },
            { 
                t: "Schnell durch den Hintereingang gehen", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du vermeidest die Lobby komplett. Was du nicht siehst, existiert nicht." 
            }
        ]
    },
    {
        id: "sq_drafty_door_1",
        kind: "text",
        title: "Der eisige Wind",
        text: "Die automatische Schiebetür zum Innenhof ist kaputt und steht dauerhaft offen. Ein eisiger Wind weht durch den Flur. Die Kollegen sitzen mit Schals und Mützen am Schreibtisch.",
        opts: [
            { 
                t: "Mit Kabelbindern die Türen fixieren", 
                req: "zip_ties", 
                next: "path_door_zip", 
                m: 10, f: 0, a: -5, c: 0, 
                r: "Du zurrst die Glasscheiben fest zusammen. Es zieht nicht mehr, aber niemand kommt mehr in den Innenhof." 
            },
            { 
                t: "Den Sensor mit Panzertape abkleben", 
                req: "tape", 
                next: "path_door_tape", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Ein Streifen Tape über den Bewegungssensor. Die Tür schließt sich sofort. Herrlich warm." 
            },
            { 
                t: "Egon rufen und warten", 
                next: "path_door_egon", 
                m: 15, f: -5, a: 15, c: 5, 
                r: "Egon kommt nach 15 Minuten, flucht über die Technik und tritt gegen die Tür. Sie bleibt offen." 
            }
        ]
    },
    {
        id: "sq_drafty_door_2a",
        kind: "text",
        title: "Der wütende Raucher",
        reqStory: "path_door_zip",
        text: "Ein Manager wollte in den Innenhof zum Rauchen. Er hat gewaltsam gegen deine fixierten Kabelbinder gedrückt und jetzt ist die Führungsschiene der Schiebetür komplett verbogen.",
        opts: [
            { 
                t: "Ihn für den Sachschaden verantwortlich machen", 
                m: 10, f: 0, a: 5, c: -5, 
                r: "Du machst Fotos und meldest ihn. Er ist wütend, aber der Chef lobt deinen Blick für Eigentumsschutz." 
            },
            { 
                t: "Schnell die Kabelbinder aufschneiden", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "Du beseitigst die Beweise. Die Tür ist jetzt kaputt UND offen." 
            }
        ]
    },
    {
        id: "sq_drafty_door_2b",
        kind: "text",
        title: "Gefangen im Hof",
        reqStory: "path_door_tape",
        text: "Dein Tape-Trick war zu gut. Die Tür geht von außen gar nicht mehr auf. Drei Raucher stehen frierend im Hof und hämmern panisch gegen das Glas, weil sie nicht mehr reinkommen.",
        opts: [
            { 
                t: "Sie auslachen und winken", 
                m: 5, f: 5, a: -10, c: 10, 
                r: "Ein grandioser Moment. Rauchen gefährdet schließlich die Gesundheit." 
            },
            { 
                t: "Gnade zeigen und das Tape abziehen", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du reißt das Tape ab. Sie stürzen frierend rein und bedanken sich bei dir." 
            }
        ]
    },
    {
        id: "sq_drafty_door_2c",
        kind: "text",
        title: "Der Heizlüfter",
        reqStory: "path_door_egon",
        text: "Egon hat die Tür aufgegeben. Er hat stattdessen einen gigantischen, lauten, roten Baustellen-Heizlüfter in den Flur gestellt. Er zieht so viel Strom, dass die Deckenlampen flackern.",
        opts: [
            { 
                t: "Den Lüfter heimlich ausstecken", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Der Server-Stromkreis ist dir wichtiger als warme Füße im Flur." 
            },
            { 
                t: "Sich die Hände daran wärmen", 
                m: 10, f: 10, a: -5, c: 5, 
                r: "Du verbringst 10 Minuten an der warmen Quelle. Herrlich." 
            }
        ]
    },
    {
        id: "sq_elearning_1",
        kind: "text",
        title: "E-Learning des Todes",
        text: "Sabine von HR schickt eine System-Sperre. 'Das jährliche Compliance-Training 'Synergetisches Sitzen' ist überfällig!' Ein unüberspringbares Video-Modul startet auf deinem Hauptmonitor. Es dauert exakt 90 Minuten und prüft alle 5 Minuten per Klick, ob du noch wach bist.",
        opts: [
            { 
                t: "Die 90 Minuten ehrlich absitzen", 
                next: "path_elearn_honest", 
                m: 90, f: -15, a: 30, c: -10, 
                r: "Du starrst 90 Minuten auf einen Mann im Rollkragenpullover, der über Lendenwirbel redet. Alle 5 Minuten klickst du 'Ich bin noch da'. Deine Aggression brodelt, aber HR ist glücklich." 
            },
            { 
                t: "Mit Root-Passwort Zertifikat fälschen", 
                req: "admin_pw", 
                next: "path_elearn_hack", 
                m: 5, f: 15, a: -5, c: 20, 
                r: "Du loggst dich ins Backend ein und setzt den Wert bei deinem Namen auf 'Bestanden'. Dauert 5 Minuten. Wenn das bei einem Audit auffliegt, bist du geliefert." 
            },
            { 
                t: "Maus-Wackler nutzen & schlafen", 
                next: "path_elearn_sleep", 
                m: 90, f: 30, a: -10, c: 10, 
                r: "Du klemmst deine Uhr an die Maus, legst die Füße auf den Tisch und pennst. Die 90 Minuten vergehen wie im Traum. Du fühlst dich herrlich entspannt." 
            }
        ]
    },
    {
        id: "sq_elearning_2a",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Ergonomie-Experte",
        reqStory: "path_elearn_honest",
        text: "Der Chef kommt in dein Büro. 'Müller, HR berichtet, dass Sie bei den Reflex-Tests des Videos 100% erreicht haben. Sie müssen ein Meister des ergonomischen Sitzens sein!'",
        opts: [
            { 
                t: "Rücken gerade machen & nicken", 
				rep: { "Dr. Wichtig": 5 },
                m: 2, f: 0, a: -10, c: -5, 
                r: "Du nimmst Haltung an. Der Chef nickt anerkennend. Der Schmerz der 90 Minuten war zumindest gut fürs Image." 
            },
            { 
                t: "Sarkasmus: 'Dafür habe ich meine Seele verkauft.'", 
                m: 5, f: -5, a: 10, c: 5, 
                r: "Er winkt ab. 'Gesundheit geht vor, Müller.' Du verdrehst die Augen." 
            }
        ]
    },
    {
        id: "sq_elearning_2b",
        kind: "text",
        title: "Das Audit",
        reqStory: "path_elearn_hack",
        text: "Sabine (HR) ruft an. 'Herr Müller? Unser System zeigt, dass Sie das 90-minütige Video in exakt 14 Sekunden absolviert haben. Haben Sie etwa die Software gehackt?'",
        opts: [
            { 
                t: "Tech-Ausrede: 'Cache-Synchronisation!'", 
                m: 10, f: 0, a: 10, c: -10, 
                r: "Du faselst was von 'Asynchronen Zeitstempeln im Server'. Sabine versteht nichts und gibt auf. 'Die IT und ihre Fehler...', seufzt sie. Puh." 
            },
            { 
                t: "Ablenken: 'Ihr System ist veraltet!'", 
                m: 5, f: 0, a: 5, c: 15, 
                r: "Du kritisierst die HR-Software scharf. Sie ist beleidigt und leitet es an den Chef weiter. Das Radar steigt." 
            }
        ]
    },
    {
        id: "sq_elearning_2c",
		char: "Markus",
        kind: "text",
        title: "Der Schnarcher",
        reqStory: "path_elearn_sleep",
        text: "Du dachtest, du wärst unbemerkt geblieben. Markus vom Vertrieb lehnt grinsend im Türrahmen. 'Hatte einen schönen Schlaf, Dornröschen? Ich habe dich beim Vorbeigehen schnarchen hören. Was ist mir mein Schweigen wert?'",
        opts: [
            { 
                t: "Ihm einen alten Donut geben", 
                req: "donut",
                rem: "donut",
                rep: { "Markus": 5 },
                m: 5, f: 5, a: -5, c: -5, 
                r: "Markus nimmt den Donut. 'Bestechung? Akzeptiert.' Er beißt rein und geht." 
            },
            { 
                t: "Gegenangriff: 'Ich lösche deine Leads.'", 
                rep: { "Markus": -10 },
                m: 5, f: -5, a: 15, c: 10, 
                r: "Du drohst zurück. Markus hebt die Hände. 'Wow, ganz ruhig, Tiger. War nur ein Witz.' Er geht, aber das Verhältnis ist vergiftet." 
            }
        ]
    },
    {
        id: "sq_workout_1",
        kind: "text",
        title: "Exorzismus im Büro",
        text: "Du bist auf einem Dienstgang im 3. Stock. Als du ins Marketing-Büro schaust, gefriert dir das Blut in den Adern. Die halbe Abteilung liegt auf dem Boden, zuckt wild, verdreht die Augen und stöhnt laut. Es sieht aus wie ein massiver medizinischer Notfall oder eine kollektive Dämonenbeschwörung!",
        opts: [
            { 
                t: "Panik: Den Notarzt rufen!", 
                next: "path_workout_panic", 
                m: 15, f: 0, a: 25, c: 5, 
                r: "Du brüllst 'SANITÄTER!' und wählst die 112. Plötzlich setzt sich Chantal genervt auf. 'Spinnst du?! Das ist 'Agile Floor Pilates'! Du ruinierst unseren Flow!' Peinlich." 
            },
            { 
                t: "Sich fasziniert dazulegen", 
                next: "path_workout_join", 
                m: 90, f: 35, a: -15, c: 10, 
                r: "Du legst dich einfach dazu. 90 Minuten lang zuckst und dehnst du dich unproduktiv auf dem Teppichboden. Es ist bizarr, die Zeit rast vorbei, aber dein Rücken knackt befreiend." 
            },
            { 
                t: "Schokolade essen & zuschauen", 
                rem: "chocolate",
                next: "path_workout_watch", 
                m: 30, f: 15, a: -10, c: 0, 
                r: "Du lehnst dich an den Türrahmen, beißt in deine Schokolade und guckst dir das absurde Spektakel 30 Minuten lang in aller Ruhe wie eine Doku an." 
            }
        ]
    },
    {
        id: "sq_dance_2a",
        kind: "text",
        title: "Der Flucht-Tänzer",
        reqStory: "path_dance_flee",
        text: "Du gehst geduckt und beschämt über den Flur. Ein Kollege aus dem Vertrieb zeigt auf dich und lacht so laut, dass er keine Luft kriegt. 'Da ist er! Der Flucht-Tänzer! Das GIF von deinem Panik-Gesicht nach dem Moonwalk hat schon 10.000 Views auf LinkedIn!'",
        opts: [
            { 
                t: "Mitlachen (Selbstironie)", 
                m: 15, f: 5, a: -15, c: 0, 
                r: "Du machst gute Miene zum bösen Spiel und lachst mit. Das nimmt dem Witz die Schärfe. Die Leute respektieren, dass du über dich selbst lachen kannst." 
            },
            { 
                t: "Böse anstarren und weggehen", 
                m: 5, f: 0, a: 15, c: 0, 
                r: "Du zeigst ihm den Mittelfinger und gehst. Die Leute lachen jetzt hinter deinem Rücken. Du kochst vor Wut." 
            }
        ]
    },
    {
        id: "sq_dance_2b",
		char: "Chantal",
        kind: "text",
        title: "Der neue Star",
        reqStory: "path_dance_finish",
        text: "Chantal vom Marketing springt dir auf dem Flur fast in die Arme. 'Müller! Dein Tanz! Die Investoren lieben unsere junge, dynamische Kultur. Der Clip geht komplett viral! Der Chef hat gesagt, du sollst PR-Arbeit machen!'",
        opts: [
            { 
                t: "Zeitfresser: Autogramme und PR-Termine", 
                rep: { "Chantal": 20, "Dr. Wichtig": 15 },
                m: 60, f: 20, a: -15, c: -10, 
                r: "Du wirst zum Maskottchen. Du verbringst eine geschlagene Stunde damit, in Kameras zu winken und Selfies zu machen. Eine riesige Zeitverschwendung, aber dein Ego und der Chef lieben es." 
            },
            { 
                t: "Ruhm ablehnen: 'Lass mich in Ruhe.'", 
                rep: { "Chantal": -10, "Dr. Wichtig": -5 },
                m: 5, f: -5, a: 10, c: 5, 
                r: "Du stößt Chantal weg und flüchtest zurück an die echte Arbeit. Du hast einen epischen Karriere-Boost weggeworfen." 
            }
        ]
    },
    {
        id: "sq_awkward_2a",
		char: "Chantal",
        kind: "text",
        title: "Das heiße Gerücht",
        reqStory: "path_awkward_elster",
        text: "Chantal flüstert lautstark am Wasserspender, als du vorbeigehst: '...und dann hat Frau Elster die beiden im Serverraum erwischt! Auf dem Boden! Der arme Kevin, das ist ja Missbrauch von Abhängigkeitsverhältnissen!' Sie sieht dich und verstummt schockiert.",
        opts: [
            { 
                t: "Dazwischengehen: 'Er steckte fest!'", 
                rep: { "Chantal": -5 },
                m: 10, f: 0, a: 15, c: 5, 
                r: "Du versuchst, es zu erklären. Chantal nickt langsam. 'Klar... 'festgesteckt'. Sehr kreativ, Müller.' Niemand glaubt dir. Dein Ruf ist angeschlagen." 
            },
            { 
                t: "Wegrennen (Fluchtreflex)", 
                m: 5, f: 5, a: 10, c: 15, 
                r: "Du drehst dich um und flüchtest. Das wirkt natürlich wie ein Schuldeingeständnis. Die Gerüchteküche explodiert jetzt richtig." 
            }
        ]
    },
    {
        id: "sq_awkward_2b",
		char: "Kevin",
        kind: "text",
        title: "Der Erpresser",
        reqStory: "path_awkward_photo",
        text: "Du stehst in der Lobby. Kevin fängt dich ab. Er wirkt ungewohnt selbstbewusst. 'Dieses Foto... lösch das. Sonst sag ich dem Chef, dass du mich gestern gezwungen hast, deine Tastatur mit einer Zahnbürste zu reinigen.'",
        opts: [
            { 
                t: "Foto löschen (Kapitulieren)", 
                rep: { "Kevin": 5 },
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du drückst auf 'Löschen'. Kevin nickt cool. 'Gute Wahl, Boomer.' Der Azubi hat dich gerade dominiert." 
            },
            { 
                t: "Lachen: 'Mach doch!'", 
                rep: { "Kevin": -15, "Dr. Wichtig": -5 },
                m: 10, f: 0, a: -5, c: 20, 
                r: "'Versuch's, Kleiner!' Kevin rennt tatsächlich zum Chef. Du darfst das Foto behalten, kriegst aber später Ärger wegen 'Machtmissbrauch'." 
            }
        ]
    },
        {
        id: "sq_fire_ext_1",
        kind: "text",
        title: "Tatort Büro 312",
        text: "Auf deinem Rundgang betrittst du Büro 312. Der Raum ist leer, aber es riecht beißend nach geschmolzenem Plastik und verbranntem Käse. Mitten im Raum steht verlassen ein Feuerlöscher. Auf dem Schreibtisch raucht ein komplett zerstörter, illegaler Sandwich-Toaster vor sich hin. Der Täter hat offenbar panisch gelöscht und ist geflohen.",
        opts: [
            { 
                t: "Unauffällig den Feuerlöscher einstecken", 
                loot: "fire_ext", 
                next: "path_sq_ext_loot", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "Man weiß nie, wann man das Ding mal braucht. Du lässt die rote Flasche unauffällig in deinem Rucksack verschwinden. Lieber schnell weg hier, bevor dich noch jemand entdeckt." 
            },
            { 
                t: "Den Toaster weiter mit Pulver beschießen", 
                next: "path_sq_ext_spray", 
                m: 15, f: 10, a: -15, c: 5, 
                r: "Sicher ist sicher! Du entsicherst den Hebel und hüllst den Toaster (und den halben Schreibtisch) in eine dicke, weiße Schneelandschaft aus CO2-Pulver. Das hat extrem gutgetan!" 
            },
            { 
                t: "Vorschriftsmäßig an den Haken hängen", 
                next: "path_sq_ext_order", 
                m: 10, f: -10, a: 5, c: -10, 
                r: "Ordnung muss sein! Du trägst das schwere Gerät auf den Flur und hängst es akkurat an die rote Halterung zurück. Du bist der unbesungene Held der Arbeitssicherheit." 
            }
        ]
    },
    {
        id: "sq_fire_ext_2a",
        kind: "text",
        char: "Kevin",
        title: "Der Brandstifter",
        reqStory: "path_sq_ext_loot",
        text: "Kevin stürmt panisch auf dich zu. 'Chef! Hast du zufällig den Feuerlöscher aus Büro 312 gesehen?! Ich hab mir da heimlich ein Käse-Toast gemacht und es hat gebrannt. Ich wollte ihn gerade zurückhängen, damit Hausmeister Egon nichts merkt, aber er ist weg!'",
        opts: [
            { 
                t: "IT-Paranoia: 'Die neuen Löscher haben GPS-Tracker.'", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Kevin reißt die Augen auf. 'GPS?! Oh Gott, HR weiß genau, dass er zuletzt bei mir war!' Er vergisst die Suche sofort und sprintet los, um sich ein wasserdichtes Alibi für die Tatzeit zu überlegen. Du grinst in dich hinein." 
            },
            { 
                t: "Lügen: 'Egon hat ihn schon mitgenommen.'", 
                rep: { "Kevin": 5 },
                m: 5, f: 5, a: 0, c: 10, 
                r: "Kevin wird kreidebleich. 'Oh mein Gott. Ich bin tot. Egon wird mich im Heizungskeller einmauern!' Er rennt weinend weg. Du hast deine Ruhe und dein neues Werkzeug ist sicher." 
            }
        ]
    },
    {
        id: "sq_fire_ext_2b",
        kind: "text",
        char: "Egon",
        title: "Winter in Büro 312",
        reqStory: "path_sq_ext_spray",
        text: "Hausmeister Egon tobt auf dem Flur. Er hat Büro 312 entdeckt. 'WER ZUM TEUFEL HAT HIER 10 KILO LÖSCHPULVER VERSPRÜHT?! Der Toaster war doch schon aus! Der ganze Teppich ist ruiniert! Ich hole die Security, wir werten die Kameras aus!'",
        opts: [
            { 
                t: "Panik: Die Kameraaufnahmen heimlich löschen", 
                req: "admin_pw",
                m: 15, f: -5, a: 10, c: -20, 
                r: "Du loggst dich schnell mit deinen Root-Rechten ins System ein und löschst die Video-Files von heute Morgen. Egon findet nichts. Du hast einen Herzinfarkt knapp überlebt." 
            },
            { 
                t: "Mit einstimmen: 'Unfassbar, diese Vandalen!'", 
                rep: { "Egon": 5 },
                m: 5, f: 0, a: -10, c: 10, 
                r: "Du stellst dich neben ihn und schüttelst theatralisch den Kopf. 'Egon, Sie haben mein volles Mitleid. Richtig asozial.' Egon nickt brummend. Tarnung ist alles." 
            }
        ]
    },
    {
        id: "sq_fire_ext_2c",
        kind: "text",
        title: "Das gebrochene Siegel",
        reqStory: "path_sq_ext_order",
        text: "Der Brandschutzbeauftragte steht vor dem Feuerlöscher, den du so vorbildlich zurückgehängt hast. Er notiert etwas auf seinem Klemmbrett. 'Herr Müller! Gut, dass das Gerät am Platz hängt. ABER: Das Schutzsiegel ist gebrochen und er ist halb leer! Haben Sie das nicht geprüft?!'",
        opts: [
            { 
                t: "Ausrede: 'Ich bin nicht der Hausmeister!'", 
                m: 10, f: 0, a: 10, c: -5, 
                r: "Du argumentierst, dass du nur die physische Rückführung übernommen hast. Er seufzt. 'Immer diese Ausreden in der IT. Ich muss einen Wartungsauftrag schreiben.' Nervig." 
            },
            { 
                t: "Kevin die Schuld geben", 
                rep: { "Kevin": -15 },
                m: 5, f: 5, a: 0, c: 5, 
                r: "'Das war Kevins Toaster-Brand!', verrätst du eiskalt. Der Prüfer stürmt sofort los, um den Azubi zur Schnecke zu machen. Du hast nach Vorschrift gehandelt." 
            }
        ]
    },

    // --- PHONE EVENTS (Chat-System) ---
    { 
        id: "sq_telegram", 
        kind: "phone", 
        appName: "Telegram", 
        title: "Gruppe: Schatten-IT", 
        startNode: "root", 
        nodes: { 
            "root": {  
                text: "Admn_Rogue: 'Müller! Wir manipulieren heute die Zeiterfassung. Wir tun ab sofort nichts mehr, aber das System loggt fleißig weiter. Bist du dabei?'",  
                opts: [ 
                    { t: "Klar, bin dabei! Schick rüber.", next: "yes" }, 
                    { t: "Ist mir zu heiß. Wenn HR das merkt, fliegen wir alle.", next: "no" }, 
                    { t: "Ich riskiere meinen Hals nicht umsonst. Was springt für mich dabei raus?", next: "haggle" } 
                ] 
            }, 
            "yes": {  
                text: "Admn_Rogue: 'Sauber. Installier das Skript im Anhang auf dem Mainframe. Passwort ist 1234.'",  
                opts: [ 
                    { t: "[System: Angehängtes Skript herunterladen und ausführen]", next: "done_hack" }, 
                    { t: "Puh, lass mal. Mein Radar beim Chef ist gerade eh schon hoch. Bin raus.", next: "chicken" } 
                ] 
            }, 
            "haggle": { 
                text: "Admn_Rogue: 'Wir geben dir das Root-Passwort. Damit bist du der Gott des Netzwerks.'", 
                opts: [ 
                    { t: "Deal! Her mit den Rechten.", next: "deal_pw" }, 
                    { t: "Für ein Passwort riskiere ich keine Abmahnung. Nein danke.", next: "no" } 
                ] 
            }, 
            "no": {  
                text: "Admn_Rogue: 'Langweiler. Wir löschen dich aus der Gruppe.'",  
                opts: [ 
                    { t: "[System: Chat stummschalten und archivieren]", next: "kicked" } 
                ] 
            } 
        }, 
        results: { 
            "done_hack": { 
                txt: "[System: Skript erfolgreich ausgeführt] Die Arbeitszeiterfassung ist manipuliert. Du lehnst dich entspannt zurück und tust für den Rest des Tages absolut gar nichts mehr, während das System fleißig für dich arbeitet.", 
                m: 10, f: 30, a: -10, c: 20 
            }, 
            "chicken": { 
                txt: "Admn_Rogue: 'Feigling.' [System: Chat beendet] Du hast im letzten Moment kalte Füße bekommen. Nichts passiert, aber dein Gewissen ist rein.", 
                m: 2, f: 0, a: 5, c: 0 
            }, 
            "kicked": { 
                txt: "[System: Du wurdest aus der Gruppe entfernt] Die Schatten-IT operiert jetzt ohne dich. Das ist zwar langweilig, aber dafür verlierst du deinen Job heute nicht.", 
                m: 1, f: -5, a: 0, c: -5 
            }, 
            "deal_pw": { 
                txt: "[Datei empfangen: keys.txt] Du hast das Root-Passwort! Ein extrem mächtiges Werkzeug. Die Manipulation läuft im Hintergrund und du schiebst jetzt ganz entspannt eine ruhige Kugel.", 
                m: 5, loot: "admin_pw", f: 10, a: 0, c: 10 
            } 
        } 
    },
    { 
        id: "sq_spam", 
        kind: "phone", 
        appName: "SMS", 
        title: "Spam-Bot", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "InfoService: Sie haben ein brandneues iPhone 50 gewonnen! Klicken Sie hier: www.virus-load.ru. Klicken Sie JETZT für Ihren Gewinn!", 
                opts: [ 
                    { t: "[System: Auf den Link klicken]", next: "virus_start" }, 
                    { t: "[System: Nachricht sofort löschen]", next: "clean" } 
                ] 
            }, 
            "virus_start": { 
                text: "[Browser öffnet sich...] DOWNLOADING... 99%... INSTALLING ROOTKIT...", 
                opts: [ 
                    { t: "[System: Prozess panisch abbrechen! X drücken!]", next: "virus_fail" }, 
                    { t: "[System: Abwarten, vielleicht gibt es ja wirklich ein Handy...]", next: "virus_doom" } 
                ] 
            } 
        }, 
        results: { 
            "clean": { 
                txt: "[System: SMS gelöscht] Sehr klug. Du hast in der IT schon genug echte Viren gesehen.", 
                m: 1, f: -5, a: 0, c: 0 
            }, 
            "virus_fail": { 
                txt: "[System: Download erfolgreich abgebrochen] Das war verdammt knapp. Dein Puls schlägt dir bis zum Hals.", 
                m: 2, f: 0, a: 10, c: 0 
            }, 
            "virus_doom": { 
                txt: "[System: VIRUS AKTIV] Dein Handy spielt plötzlich extrem lauten Techno-Schlager auf maximaler Lautstärke ab. Der Chef guckt schon warnend in deine Richtung!", 
                m: 5, f: 0, a: 30, c: 40, virus: true 
            } 
        } 
    },
    { 
        id: "sq_tinder_1", 
        kind: "phone", 
        appName: "LoveMatch", 
        title: "Neues Match!", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Lisa (Entfernung: 15m): 'Hey! Du bist doch der Admin, der immer so verzweifelt aus dem Fenster schaut, oder? Ich brauche dringend Flucht vor meinen Excel-Tabellen. Lust auf einen Kaffee? Geht auf mich.'", 
                opts: [ 
                    { t: "Gerne! Ein Kaffee ist jetzt mein absoluter Rettungsplan.", next: "date_yes" }, 
                    { t: "Sorry, hier brennt gerade wortwörtlich ein Server. Keine Zeit.", next: "date_no" }, 
                    { t: "Ist das ein Trick? Bist du von HR und willst meine Pausenzeiten prüfen?", next: "hr_check" } 
                ] 
            }, 
            "date_yes": { 
                text: "Lisa: 'Super! Treffen uns in 5 Min in der Lobby. Ich erkenne dich am Karohemd, richtig? 😉'", 
                opts: [ 
                    { t: "Erwischt. Bis gleich in der Lobby!", next: "go_date" }, 
                    { t: "[System: Match aus unerklärlicher Panik auflösen]", next: "ghost" } 
                ] 
            }, 
            "hr_check": { 
                text: "Lisa: 'LOL nein! 😂 Ich bin im Marketing. Ich will nur Koffein, kein Compliance-Audit. Versprochen!'", 
                opts: [ 
                    { t: "Puh, okay. Dann bis gleich am Kaffeeautomaten in der Lobby!", next: "go_date" }, 
                    { t: "[System: Nutzerin blockieren] Genau das würde ein HR-Spion sagen...", next: "date_no" } 
                ] 
            } 
        }, 
        results: { 
            "date_no": {  
                txt: "[System: Match aufgelöst] Du bleibst allein an deinem Platz, aber wenigstens bist du absolut sicher vor eventuellen HR-Fallen. Vertraue niemandem.",  
                m: 1, f: -5, a: 0, c: 0  
            }, 
            "go_date": {  
                txt: "[Gerät gesperrt] Das Date in der Lobby lief super! Ihr habt 20 Minuten lang über Drucker gelästert. Sie hat sogar deinen Witz über IPv6 verstanden (glaubst du zumindest).",  
                m: 20, f: 20, a: -20, c: 0, 
                next: "lisa_contact" 
            }, 
            "ghost": {  
                txt: "[System: Match aufgelöst] Du hast pure Panik bekommen und dich auf dem Klo versteckt. Später siehst du sie traurig allein am Automaten stehen. Dein Selbstwertgefühl ist im Keller.",  
                m: 10, f: -10, a: 5, c: 0  
            } 
        } 
    },
    { 
        id: "sq_tinder_2", 
        kind: "phone", 
        appName: "Nachricht", 
        title: "Lisa (Marketing)", 
        reqStory: "lisa_contact", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Lisa schreibt: 'Hey Süßer! 😘 Das war echt nett neulich. Sag mal... mein Laptop macht so komische Geräusche. Und das Ticket-System ist so kompliziert. Kannst du mal kurz rüberkommen und gucken? Als private Gefälligkeit? 😉'", 
                opts: [ 
                    { t: "Klar, bin in zwei Minuten drüben! 😘", next: "help_simp" }, 
                    { t: "Sorry Lisa, aber dafür musst du offiziell ein Ticket aufmachen.", next: "help_ticket" } 
                ] 
            }, 
            "help_simp": { 
                text: "[System: Du warst drüben und hast ihren Lüfter entstaubt] Lisa: 'Du bist mein absoluter Held! 😍 Gibt's Kaffee später als Dankeschön?'", 
                opts: [ 
                    { t: "Sehr gerne! Ich freu mich drauf.", next: "res_simp" } 
                ] 
            }, 
            "help_ticket": { 
                text: "Lisa: 'Wow. Ernsthaft? Ich dachte, wir hätten... was Spezielles. Vergiss es. 🙄'", 
                opts: [ 
                    { t: "Regeln sind nun mal Regeln, sorry. 🤷‍♂️", next: "res_friendzone" } 
                ] 
            } 
        }, 
        results: { 
            "res_simp": {  
                txt: "[Chat stummgeschaltet] Du hast jetzt eine Romanze im Büro. Vorteil: Gratis Kaffee. Nachteil: Du bist jetzt offiziell ihr unbezahlter, persönlicher 24/7 IT-Support.",  
                m: 10, f: -10, a: -15, c: 10  
            }, 
            "res_friendzone": {  
                txt: "[System: Lisa hat dich blockiert] Match aufgelöst. Dein professioneller Admin-Stolz ist intakt und du musst ihren verkeimten Laptop nicht reinigen.",  
                m: 5, f: 10, a: 5, c: 0  
            } 
        } 
    },
    { 
        id: "sq_phone_parking_taped", 
        kind: "phone", 
        appName: "SMS", 
        reqStory: "sq_parking_2_taped", 
        title: "Unbekannte Nummer", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "[Bild empfangen: Dein getaptes Kunstwerk auf dem Parkplatz] Auditor: 'Wer war das?! Das ist genial! Ich krieg die Fahrertür nicht auf, aber tiefster Respekt. Wer auch immer das war: Komm in mein Büro. - Der externe Auditor'", 
                opts: [ 
                    { t: "Das war ich. Panzerband löst eben alle Probleme!", next: "res_respect" }, 
                    { t: "[System: Nachricht ignorieren & panisch unter dem Tisch verstecken]", next: "res_fear" } 
                ] 
            }, 
            "res_respect": { 
                text: "Auditor: 'Hahaha! Endlich jemand mit Rückgrat in dieser Firma. Komm rüber auf einen Kaffee. Bei der nächsten IT-Prüfung bin ich gnädig mit deinen Servern.'", 
                opts: [ 
                    { t: "Perfekt, das ist ein Deal. Bin gleich da.", next: "end_respect" } 
                ] 
            }, 
            "res_fear": { 
                text: "[System: Du starrst auf das Display und antwortest nicht] Auditor: 'Hallo? Keiner? Schade. Aber das Tape hält echt verdammt gut...'", 
                opts: [ 
                    { t: "[System: Chat endgültig löschen]", next: "end_fear" } 
                ] 
            } 
        }, 
        results: { 
            "end_respect": { 
                txt: "[System: Chat beendet] Du gehst rüber in sein Büro. Der Auditor ist jetzt dein größter Fan. Deine Aggro sinkt massiv, denn so ein Streich tut der Seele einfach gut.", 
                m: 10, f: 0, a: -15, c: -10 
            }, 
            "end_fear": { 
                txt: "Die SMS bleibt unbeantwortet. Du schwitzt vor Angst vor Konsequenzen. Du hast die Chance auf einen echt mächtigen Verbündeten vertan.", 
                m: 2, f: 0, a: 5, c: 0 
            } 
        } 
    },
    { 
        id: "sq_phone_parking_blocked", 
        kind: "phone", 
        appName: "WhatsApp", 
        reqStory: "sq_parking_2_blocked", 
        title: "Dr. Wichtig (Chef)", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Dr. Wichtig: 'MÜLLER! Ihr Corsa steht in meiner Flugschneise! Ich habe in 5 Minuten einen hochwichtigen Termin beim Golf-Club. BEWEGEN SIE DAS DING!'", 
                opts: [ 
                    { t: "[System: Handy schnappen und sofort zum Parkplatz rennen]", next: "res_fast" }, 
                    { t: "[System: Nachricht als ungelesen markieren und Handy ignorieren]", next: "res_ignore" } 
                ] 
            }, 
            "res_fast": { 
                text: "[System: Chat verlassen. Du sprintest außer Atem nach unten] Du stehst am Parkplatz. Der Chef fuchtelt wild mit den Autoschlüsseln seines SUVs.", 
                opts: [ 
                    { t: "[System: Zähneknirschend ins Auto steigen und umparken]", next: "end_fast" } 
                ] 
            }, 
            "res_ignore": { 
                text: "[System: Chat stummgeschaltet] Du lässt das Handy einfach auf dem Tisch vibrieren. 10 Minuten später hörst du ihn draußen extrem laut fluchen. Er muss wohl tatsächlich ein Taxi rufen.", 
                opts: [ 
                    { t: "Klingt teuer. Schade. [System: Weiterarbeiten]", next: "end_ignore" } 
                ] 
            } 
        }, 
        results: { 
            "end_fast": { 
                txt: "Du kommst schwitzend zurück an deinen Platz. Du hast den Chef besänftigt, bist aber völlig fertig und fühlst dich wie ein Laufbursche.", 
                rep: { "Dr. Wichtig": 2 },	
                m: 15, f: -10, a: -5, c: 5 
            }, 
            "end_ignore": { 
                txt: "Das war ein teures Taxi für den Golfclub. Der Chef ist stinksauer auf dich, aber dein inneres Karma-Konto und deine Faulheit feiern ein Fest.", 
                rep: { "Dr. Wichtig": -5 },	
                m: 5, f: 15, a: 20, c: -10 
            } 
        } 
    },
    { 
        id: "sq_headhunter_1", 
        kind: "phone", 
        appName: "Anruf", 
        title: "Unbekannte Nummer", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Anruf eingehend... Eine sanfte Stimme: 'Herr Müller? Hier ist Elena von TechHunt. Wir suchen Talente, die... flexibel mit Informationen umgehen.'", 
                opts: [ 
                    { t: "Kein Interesse. Ich sterbe hier lieber loyal.", next: "res_loyal" }, 
                    { t: "Klingt lukrativ. Ich bin ganz Ohr.", next: "headhunter_listen" } 
                ] 
            }, 
            "headhunter_listen": { 
                text: "'Interessant. Wir rufen zurück, wenn Sie etwas... Hebelwirkung haben.'", 
                opts: [ 
                    { t: "Okay, ich werde die Augen offenhalten.", next: "res_listen" } 
                ] 
            } 
        }, 
        results: { 
            "res_loyal": { txt: "'Wow. Stockholm-Syndrom? Okay, bye.' *Klick*", m: 5, f: 0, a: 5, c: 0 }, 
            "res_listen": { txt: "Sie legt auf. Du fühlst dich beobachtet.", m: 5, f: 0, a: 0, c: 5, next: "sq_headhunter_2_active" } 
        } 
    },
    {
        id: "sq_headhunter_2",
        kind: "phone",
        appName: "Anruf",
        title: "Rückruf (Elena)",
        reqStory: "sq_headhunter_2_active",
        startNode: "root",
        nodes: {
            "root": {
                text: "Elena ruft wieder an. 'Na? Haben Sie über das Angebot nachgedacht? Wir brauchen jemanden, der die Interna von GlobalCorp kennt.'",
                opts: [
                    { t: "Ich hätte da ein Dokument... eine 'Schwarze Liste'.", req: "secret_list", next: "offer_secrets" },
                    { t: "Lassen Sie uns ganz normal über mein Profil sprechen.", next: "standard_interview" }
                ]
            },
            "offer_secrets": {
                text: "Du liest Namen von der Liste vor, die du im Drucker gefunden hast. Stille. Dann: 'Das ist Gold wert. Wir bieten Ihnen das Doppelte.'",
                opts: [
                    { t: "Deal. Aber ich bleibe als Maulwurf hier.", next: "res_rich" }
                ]
            },
            "standard_interview": {
                text: "Bla bla Synergien, bla bla Teamplayer. Sie wirken nicht sehr beeindruckt von deinem Standard-Lebenslauf. 'Wir melden uns.'",
                opts: [
                    { t: "Gut, ich warte ab.", next: "res_fail" }
                ]
            }
        },
        results: {
            "res_rich": { 
                txt: "Ein sattes 'Beraterhonorar' landet auf deinem Offshore-Konto. Du bist nun offiziell ein Konzern-Spion. Dein Gewissen ist erstaunlich leise, wenn der Kontostand stimmt.", 
                m: 15, f: 10, a: -20, c: 5
            },
            "res_fail": { 
                txt: "Die Headhunterin meldet sich nie wieder. Klassisches Ghosting. Dein Standard-Lebenslauf war ihr wohl nicht 'disruptiv' genug.", 
                m: 5, f: 0, a: 5, c: 0 
            }
        }
    },
    { 
        id: "sq_darknet", 
        kind: "phone", 
        appName: "Tor Browser", 
        title: "Das Angebot", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Anon: 'Ich zahle 1 Bitcoin pro Datensatz für interne Firmengeheimnisse. Komplett anonym über ein Escrow-System. Interesse an schnellem Geld?'", 
                opts: [ 
                    { t: "[System: Chat sofort schließen & Session beenden]", next: "good" }, 
                    { t: "Wie genau stellst du dir das vor? Bin ganz Ohr.", next: "bad" } 
                ] 
            }, 
            "bad": { 
                text: "Anon: 'Lass einfach einen Dump eurer Kundendatenbank über diesen gesicherten Onion-Link laufen. Meine Scripts waschen alle Spuren. Keiner wird es je merken.'", 
                opts: [ 
                    { t: "[System: Datei 'Kundendatenbank.sql' auswählen & Upload starten]", next: "crime" }, 
                    { t: "Nein, das ist mir eine Nummer zu groß. Ich bin raus.", next: "chicken" } 
                ] 
            } 
        }, 
        results: { 
            "good": { 
                txt: "[Verbindung getrennt] Du bleibst sauber. Dein Gewissen ist rein und du riskierst keine Haftstrafe für ein bisschen Krypto.", 
                m: 1, f: 0, a: 0, c: -10 
            }, 
            "chicken": { 
                txt: "[System: Tor-Identität erneuert] Du machst im letzten Moment einen Rückzieher. Das war verdammt knapp, aber besser so. Finger weg vom Darknet.", 
                m: 2, f: 0, a: 5, c: 0 
            }, 
            "crime": { 
                txt: "[Upload 100% - 1 BTC empfangen] Du hast es wirklich getan. Du bist plötzlich extrem reich! Aber die Paranoia kickt sofort rein. Jeder Blick des Chefs wirkt jetzt wie ein Verhör.", 
                m: 10, f: 20, a: -50, c: 50 
            } 
        } 
    },
    { 
        id: "sq_moral_bernd", 
        kind: "phone", 
        appName: "Teams", 
        title: "Bernd (Vertrieb)", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Bernd: 'Hör mal, ganz heikles Thema. Kannst du gerade schreiben? Ich hab dem Kunden aus Versehen die interne Kalkulation mit unserer riesigen Marge geschickt statt dem Angebot! 😱 Wenn der Chef das sieht, bin ich tot. Kannst du die Mail vom Server löschen, bevor der Kunde sie öffnet?'", 
                opts: [ 
                    { t: "Okay, ich lösche sie. Aber du schuldest mir was.", next: "wipe" }, 
                    { t: "Vergiss es. Wenn das rauskommt, fliege ich mit dir.", next: "deny" }, 
                    { t: "Und was springt für mich bei der Aktion raus?", next: "deal" } 
                ] 
            }, 
            "deal": { 
                text: "Bernd: 'Ich geb dir 50 Euro bar auf die Hand! Mach schon, er ist gerade online!'", 
                opts: [ 
                    { t: "Deal. Bring den Fuffi nachher in mein Büro.", next: "cash" }, 
                    { t: "Lass mal. Meine Logs lügen nicht, das fällt auf.", next: "deny" } 
                ] 
            } 
        }, 
        results: { 
            "wipe": { txt: "Bernd: 'Du bist mein Gott! Danke!' Die Mail ist spurlos gelöscht. Das Risiko war hoch, aber du hast einen gewaltigen Gefallen gut.", m: 10, f: 0, a: -15, c: 15 }, 
            "deny": { txt: "Bernd: 'Danke für gar nichts... 🖕' Bernd wird kurz darauf ins Chefbüro zitiert. Dein Gewissen ist rein, aber Bernd hasst dich jetzt.", m: 2, f: 0, a: 10, c: -5 }, 
            "cash": { txt: "Bernd: 'Geld liegt gleich unter deiner Tastatur!' Die Mail ist weg. Ein lukrativer Tag, solange die Compliance-Abteilung nicht reinschaut.", m: 10, f: 5, a: -20, c: 25 } 
        } 
    },
    {
        id: "sq_mom_help",
        kind: "phone",
        appName: "WhatsApp",
        title: "Mama ❤️",
        startNode: "root",
        nodes: {
            "root": {
                text: "Mama: 'Hallo Schatz, der Computer sagt, ich muss 500€ an Microsoft überweisen. Ist das wichtig? Da ist so ein rotes Fenster. Und ein netter Mann am Telefon sagt, ich habe einen Trojaner.'",
                opts: [
                    { t: "AUFLEGEN! SOFORT!", next: "hangup" },
                    { t: "Gib mir den Mann mal.", next: "troll" },
                    { t: "Keine Zeit, Mama.", next: "ignore" }
                ]
            },
            "hangup": {
                text: "Mama: 'Aber er klang sehr seriös... er hieß John Smith.'",
                opts: [
                    { t: "MAMA! STECKER ZIEHEN!", next: "pull_plug" },
                    { t: "Überweis bloß nichts!", next: "warn" }
                ]
            },
            "troll": {
                text: "Mama: 'Er sagt, er darf nicht mit Dritten reden wegen Datenschutz. Er wird jetzt lauter.'",
                opts: [
                    { t: "Sag ihm: 'Mein Sohn ist beim BSI'", next: "bsi" }
                ]
            }
        },
        results: {
            "pull_plug": { txt: "Sie hat den Stecker gezogen. PC aus. Geld sicher. Du bist ein guter Sohn/Tochter.", m: 5, f: -5, a: 5, c: 0 },
            "warn": { txt: "Zu spät. Sie sucht schon die TAN-Liste. Das gibt ein langes Telefonat heute Abend.", m: 10, f: 0, a: 20, c: 0 },
            "ignore": { txt: "Du ignorierst es. Dein Erbe ist gerade um 500€ geschrumpft.", m: 1, f: 5, a: 0, c: 0 },
            "bsi": { txt: "Der Betrüger hat sofort aufgelegt! Mama hält dich für einen Geheimagenten.", m: 5, f: 0, a: -10, c: 5 }
        }
    },
    { 
        id: "sq_wrong_number", 
        kind: "phone", 
        appName: "SMS", 
        title: "Unbekannt", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Unbekannt: 'Hey Bro, hast du das Zeug? Bin in 5 Min am Bahnhof. Bring den Stoff mit.'", 
                opts: [ 
                    { t: "Falsche Nummer, Kumpel.", next: "boring" }, 
                    { t: "Die Pakete wurden verworfen.", next: "tech_joke" }, 
                    { t: "Error 403: Zugriff verweigert.", next: "http_joke" } 
                ] 
            }, 
            "tech_joke": { 
                text: "Unbekannt: 'Hä? Was laberst du? Hast du das Gras oder nicht?'", 
                opts: [ 
                    { t: "Firewall blockiert Port 420.", next: "confused" } 
                ] 
            }, 
            "http_joke": { 
                text: "Unbekannt: 'Alter, verarsch wen anders. Ich komm jetzt vorbei.'", 
                opts: [ 
                    { t: "Komm ruhig. Ich tracke gerade deine IP-Adresse...", next: "block" } 
                ] 
            } 
        }, 
        results: { 
            "boring": { txt: "Unbekannt: 'Oh, sorry man.' Du hast deine Ruhe. Langweilig, aber sicher.", m: 1, f: 0, a: 0, c: 0 }, 
            "confused": { txt: "Unbekannt: 'Shit, Bullen?! Bin weg!' Er schreibt nicht mehr. Ein voller Erfolg für die IT-Abteilung.", m: 3, f: 5, a: -10, c: 0 }, 
            "block": { txt: "Unbekannt: 'Fuck, lass mich in Ruhe!' Du hast ihn in Panik versetzt und die Nummer blockiert. Gutes Gefühl.", m: 1, f: 0, a: 5, c: 0 } 
        } 
    },
    { 
        id: "sq_ebay_1", 
        kind: "phone", 
        appName: "Kleinanzeigen", 
        title: "Nachricht zu: 'Alte Grafikkarte'", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Kuseng88: 'Hallo. Noch da? Tausche gegen Teppich? Komme heute holen.'", 
                opts: [ 
                    { t: "Nein, nur Cash.", next: "cash" }, 
                    { t: "Was für ein Teppich?", next: "carpet" }, 
                    { t: "Lass stecken. Mit solchen Leuten verhandle ich nicht.", next: "block" } 
                ] 
            }, 
            "cash": { 
                text: "Kuseng88: 'Gebe dir 10 Euro und Samsung Galaxy S3 (Display kaputt).'", 
                opts: [ 
                    { t: "Na gut, Hauptsache das Ding ist weg. Komm vorbei.", next: "bad_deal" }, 
                    { t: "Vergiss es. Das ist zu wenig.", next: "res_refuse" }  
                ] 
            }, 
            "carpet": { 
                text: "Kuseng88: 'Fliegt gut. Farbe rot. Bisschen Flecken von Katze.'", 
                opts: [ 
                    { t: "Katzenflecken?! Vergiss es, ich bin raus.", next: "block" } 
                ] 
            } 
        }, 
        results: { 
            "block": {  
                txt: "[System: Nutzer blockiert] Du drückst den Blockieren-Button. Du spürst, wie dein Blutdruck steigt. Warum sind Menschen auf dieser App so?",  
                m: 2, f: 5, a: 10, c: 0 
            }, 
            "bad_deal": {  
                txt: "Kuseng88: 'Bin in 5 Min da Chef!' Du hast jetzt 10€ und ein kaputtes Handy mehr. Immerhin ist die Grafikkarte weg.",  
                m: 5, f: 5, a: 0, c: 5  
            }, 
            "res_refuse": {  
                txt: "[Gelesen] Er liest die Nachricht, schreibt aber nicht zurück. Die Wut köchelt leicht.",  
                m: 2, f: 5, a: 5, c: 0, 
                next: "ebay_pending"  
            } 
        } 
    },
    { 
        id: "sq_ebay_2", 
        kind: "phone", 
        appName: "Kleinanzeigen", 
        title: "Kuseng88 schreibt...", 
        reqStory: "ebay_pending",  
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Kuseng88 meldet sich wieder: 'Hallo Chef. Hab nochmal geguckt. Karte ist ja alt. 10 Euro war zu viel. Gebe dir 4 Euro. Und ich nehme sie sofort. Du musst aber Bus-Ticket zahlen.'", 
                opts: [ 
                    { t: "Willst du mich eigentlich verarschen? Ciao.", next: "rage_quit" }, 
                    { t: "Komm vorbei und nimm sie einfach mit. Hauptsache weg.", next: "sad_deal" }, 
                    { t: "Okay, aber nur wenn ich die Katze dazu kriege.", next: "troll_fail" } 
                ] 
            } 
        }, 
        results: { 
            "rage_quit": {  
                txt: "[System: Nutzer blockiert] Du pfefferst das Handy fast gegen die Wand. Deine Ader an der Stirn pocht. Warum tust du dir diese App an?",  
                m: 5, f: 5, a: 15, c: 5 
            }, 
            "sad_deal": {  
                txt: "Kuseng88: 'Bin unterwegs!' Er kommt zur Lobby, drückt dir 3,50€ in die Hand ('Hab nicht passend') und verschwindet. Du fühlst dich leer.",  
                m: 5, f: 5, a: 10, c: 5 
            }, 
            "troll_fail": {  
                txt: "Kuseng88: 'Katze ist weg. Hab gegen Teppich getauscht. Also 4 Euro?' Du gibst auf. Er kommt vorbei, zahlt 3,50€ und geht.",  
                m: 5, f: 5, a: 10, c: 5 
            } 
        } 
    },
    { 
        id: "sq_pager", 
        kind: "phone", 
        appName: "System Warnung", 
        title: "🚨 CRITICAL ALERT", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "SYSTEM-BOT: 🚨 Kritisches Hitzeproblem bei Server 'DB_MASTER'. Temperatur bei 85°C. Kühlung ausgefallen. Bitte wählen Sie eine Notfall-Aktion:", 
                opts: [ 
                    { t: "Leite sofort die Notabschaltung ein!", next: "shutdown" }, 
                    { t: "Zwing die Lüfter auf 100% Leistung!", next: "fan_boost" }, 
                    { t: "Warnung ignorieren und stummschalten.", next: "ignore" } 
                ] 
            }, 
            "fan_boost": { 
                text: "SYSTEM-BOT: ⚠️ Warnung! Den defekten Lüfter auf 100% zu zwingen, kann zu starken Vibrationen und Hardware-Schäden führen. Trotzdem fortfahren?", 
                opts: [ 
                    { t: "Ja, zieh durch! Hauptsache kalt!", next: "fan_success" }, 
                    { t: "Nein, brich ab! Mach doch die Notabschaltung!", next: "shutdown" } 
                ] 
            } 
        }, 
        results: { 
            "shutdown": { 
                txt: "SYSTEM-BOT: Server wird heruntergefahren. Verbindung getrennt. Die Datenbank ist jetzt zwar offline, aber die Hardware lebt. Der Chef ruft schon über den Flur, warum nichts mehr geht.", 
                m: 5, f: -10, a: 0, c: 10 
            }, 
            "fan_success": { 
                txt: "SYSTEM-BOT: Boost aktiv. Temperatur sinkt. Der Lüfter heult mit der Lautstärke eines startenden Flugzeugs auf. Man hört es bis in den Flur, aber der Server ist gerettet!", 
                m: 5, f: -5, a: -5, c: -10 
            }, 
            "ignore": { 
                txt: "SYSTEM-BOT: Alarme für 24 Stunden stummgeschaltet. Zehn Minuten später verlierst du die Verbindung komplett. Der Rauchmelder im Serverraum geht an. Das war eine sehr schlechte Idee.", 
                m: 1, f: 10, a: 50, c: 50 
            } 
        } 
    },
    { 
        id: "sq_elster_cat_1", 
        kind: "phone", 
        appName: "WhatsApp", 
        title: "Frau Elster (Privat)", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Frau Elster: 'Herr Müller! Höchste Geheimhaltungsstufe. Ich sitze in der großen Quartalsprüfung fest. Mein Smart-Fressnapf meldet Fehler 404. Rüdiger hat seit ZWEI Stunden nichts gegessen! Bitte loggen Sie sich remote bei mir ein und starten Sie das Gerät neu!'", 
                opts: [ 
                    { t: "Schicken Sie die Zugangsdaten. Ich rette Rüdiger.", next: "help_cat" }, 
                    { t: "Ich bin Firmen-Admin, kein privater Katzen-Sitter. Klären Sie das selbst.", next: "deny_cat" }, 
                    { t: "Ich schau mal rein... [System: Leckerli-Kanone auf Dauerfeuer stellen]", next: "troll_cat" } 
                ] 
            } 
        }, 
        results: { 
            "help_cat": { 
                txt: "Frau Elster: 'Danke! Ich wusste, auf Sie ist Verlass!' [System: Remote-Neustart erfolgreich] Du hast einen Kater vor dem imaginären Hungertod bewahrt. Privatkram nervt, aber immerhin hast du bei der Buchhaltung jetzt was gut.", 
                rep: { "Frau Elster": 5 },
                m: 10, f: 0, a: 10, c: 0, 
                next: "path_elster_happy" 
            }, 
            "deny_cat": { 
                txt: "[Gelesen] Sie antwortet nicht mehr. Das Schweigen ist ohrenbetäubend. Du hast deinen vertraglichen Stolz bewahrt, aber Frau Elster wird das niemals vergessen.", 
                rep: { "Frau Elster": -2 },
                m: 2, f: 5, a: 0, c: 0, 
                next: "path_elster_angry" 
            }, 
            "troll_cat": { 
                txt: "[System: Kommando 'All you can eat' gesendet] Rüdiger bekommt gerade die gesamten 5 Kilo Trockenfutter auf einmal serviert. Das wird Folgen haben, aber du grinst dir eins.", 
                rep: { "Frau Elster": -5 },
                m: 5, f: 5, a: -10, c: 0, 
                next: "path_elster_fat" 
            } 
        } 
    },
    {
        id: "sq_food_bowl_delivery",
        kind: "phone",
        reqStory: "food_bowl_planned",
        appName: "Slack",
        title: "#lunch",
        startNode: "root",
        nodes: {
            "root": {
                text: "@channel: Bowls sind da! ✨ Namaste, Kollegen! Du öffnest deine 'Buddha-Gold-Bowl'. Inhalt: 3 Blätter Spinat, eine halbe Avocado (braun) und etwas, das wie Vogelfutter aussieht. Preis: 18,50€.",
                opts: [
                    { t: "So tun, als ob es schmeckt.", next: "pretend" },
                    { t: "Im Geheimen zum Dönerladen rennen.", next: "secret_kebab" }
                ]
            },
            "pretend": {
                text: "Chantal: 'Spürst du die Energie?!' Du spürst vor allem den Hunger. Dein Magen knurrt so laut, dass das Meeting unterbrochen wird.",
                opts: [
                    { t: "Lächeln und winken.", next: "res_hungry" }
                ]
            }
        },
        results: {
            "res_hungry": { 
                txt: "Du bist 'spirituell gereinigt' (aka hungrig und pleite). Aber Marketing liebt dich.", 
                rep: { "Chantal": 5 },	
                m: 20, f: 0, a: 10, c: 0 
            },
            "secret_kebab": { 
                txt: "Du schleichst dich raus und holst dir einen Döner. Beste Entscheidung des Tages. Aber Chantal hat dich gesehen.", 
                rep: { "Chantal": -5 },	
                m: 30, f: -5, a: -15, c: 0 
            }
        }
    },
    { 
        id: "sq_real_prince", 
        kind: "phone", 
        appName: "Mail", 
        title: "URGENT BUSINESS PROPOSAL", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Prince_Abubakar: 'Greetings My Dearest Friend! I am Prince Abubakar. I have 25 Million USD stuck in a trust fund. I need a foreign partner to unlock it. You will keep 30%!' 'Please, I need your trust. Can you help me move the funds? It is 100% safe and legal.'", 
                opts: [ 
                    { t: "Netter Versuch, Scammer. Such dir ein anderes Opfer.", next: "delete" }, 
                    { t: "Klar, Eure Majestät! Wo soll ich unterschreiben?", next: "reply_joke" }, 
                    { t: "Ohne Beweisfoto läuft hier gar nichts. Zeig her den Thron!", next: "photo" } 
                ] 
            }, 
            "reply_joke": { 
                text: "Prince_Abubakar: 'GOD BLESS YOU! I knew you are a good person. Please, where should I send the wire transfer? I need your IBAN now.'", 
                opts: [ 
                    { t: "Hier ist meine IBAN: DE12 3456... Mach mich reich!", next: "send_iban" }, 
                    { t: "Weißt du was? Behalt dein Geld. Mir reicht mein IT-Gehalt.", next: "chicken" } 
                ] 
            }, 
            "photo": { 
                text: "Prince_Abubakar: *Sendet Bild*. Du siehst einen Mann auf einem massiven Gold-Thron. Er hält eine aktuelle Tageszeitung in die Kamera und lächelt freundlich. 'Is real. Please send IBAN now.'", 
                opts: [ 
                    { t: "Wahnsinn, das sieht ja echt aus! IBAN ist raus!", next: "send_iban" }, 
                    { t: "Schlechtester Photoshop aller Zeiten. Ciao.", next: "delete" } 
                ] 
            } 
        }, 
        results: { 
            "delete": { txt: "[System: Absender in Spam verschoben] Weg damit. Wer fällt heute noch auf sowas rein? Du widmest dich wieder deiner echten Arbeit.", m: 1, f: 0, a: 0, c: 0 }, 
            "chicken": { txt: "[System: Chat beendet] Du brichst den Kontakt ab. Besser ist das. Irgendwo auf der Welt ist ein Prinz jetzt sehr enttäuscht von dir.", m: 2, f: 0, a: 0, c: 0 }, 
            "send_iban": { txt: "[Nachricht gelesen...] PING! Dein Handy vibriert fast vom Tisch. Banking-App: 'Eingang: +7.500.000,00 USD'. ... Moment. Es hat wirklich geklappt?! Du bist reich! Warum haben dich alle immer davor gewarnt?", m: 5, f: 100, a: -100, c: 0, loot: "black_card", next: "prince_active" } 
        } 
    },
    { 
        id: "sq_crypto_kai", 
        kind: "phone", 
        appName: "WhatsApp", 
        title: "Kai (Sales)", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Kai: 'Yo Bruder! 🚀 Bist du noch zufrieden mit deinem 9-to-5 Sklaventum? Oder willst du ENDLICH finanzielle Freiheit? 💸🦁' 'Ich habe da ein Investment, das geht gerade durch die Decke! ElonDogeMoonCoin. 1000% Rendite sind mathematisch garantiert! Das ist das nächste Bitcoin!'", 
                opts: [ 
                    { t: "Verkauf deinen Mist an wen anders. Ciao.", next: "block" }, 
                    { t: "Klar, bin dabei! Holen wir uns den Lambo!", next: "troll" }, 
                    { t: "Klingt spannend. Wie funktioniert das genau?", next: "scam" } 
                ] 
            }, 
            "troll": { 
                text: "Kai: 'Geil! Das ist das richtige Gewinner-Mindset! 💪 Überweis mir einfach 500€ via PayPal Friends, ich leg das direkt für dich an. Der Lambo bestellt sich nicht von selbst! 🏎️💨'", 
                opts: [ 
                    { t: "Geld ist raus! Mach uns reich!", next: "loss" }, 
                    { t: "[Bild gesendet: 500€ in Monopoly-Geld] Reicht das für den Anfang?", next: "funny" } 
                ] 
            }, 
            "scam": { 
                text: "Kai: 'Das erkläre ich dir im exklusiven Webinar Alpha-Lion-Grindset. Die Plätze sind streng limitiert! Eintritt heute nur 50€ (statt 2000€).'", 
                opts: [ 
                    { t: "50€? Ich dachte, du wärst schon Millionär. Nein danke.", next: "block" } 
                ] 
            } 
        }, 
        results: { 
            "block": { txt: "[System: Kontakt blockiert] Deine Timeline ist wieder sicher vor 'passiven Einkommen' und Löwen-Emojis. Frieden.", m: 1, f: 0, a: -5, c: 0 }, 
            "loss": { txt: "[System: 500€ via PayPal gesendet] Sekunden später verschwindet Kais Profilbild. Deine nächste Nachricht hat nur noch einen grauen Haken. Willkommen in der Realität.", m: 5, f: 0, a: 50, c: 0 }, 
            "funny": { txt: "Kai: 'Dir fehlt einfach das Sieger-Mindset! Bleib halt arm!' [System: Du wurdest blockiert] Du lachst Tränen.", m: 2, f: 5, a: -10, c: 0 } 
        } 
    },
    { 
        id: "sq_wrong_group", 
        kind: "phone", 
        appName: "Teams", 
        title: "Gruppe: 'Die IT-Opfer 🙄'", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Chantal hat dich zur Gruppe hinzugefügt. (Sie hat sich wohl verklickt...) Chantal: 'Habt ihr Müller heute gesehen? Der hat schon wieder diesen uralten Hoodie an. Wetten, der schläft heimlich im Serverraum zwischen den Kabeln? 🤢'", 
                opts: [ 
                    { t: "[Lesebestätigung deaktivieren & weiterlesen]", next: "spy" }, 
                    { t: "Ich bin übrigens in dieser Gruppe. Nur zur Info.", next: "fight" }, 
                    { t: "[System: Gruppe verlassen]", next: "leave" } 
                ] 
            }, 
            "spy": { 
                text: "Markus: 'Ja, totaler Freak. Aber wir müssen echt nett sein. Wenn der uns die Admin-Rechte entzieht, können wir nicht mehr online shoppen. Also schön lächeln!'", 
                opts: [ 
                    { t: "[System: Chat-Screenshot an HR weiterleiten]", next: "snitch" }, 
                    { t: "[GIF gesendet: Saurons Auge sieht alles]", next: "scare" } 
                ] 
            } 
        }, 
        results: { 
            "leave": {  
                txt: "[System: Du hast die Gruppe verlassen] Chantal merkt ihren Fehler erst Stunden später. Du stehst über den Dingen. Ignorance is bliss.",  
                m: 1, f: 0, a: 0, c: 0  
            }, 
            "fight": {  
                txt: "[System: Chantal hat die Gruppe gelöscht] Im Großraumbüro herrscht plötzlich Totenstille. Du spürst förmlich, wie Chantal am anderen Ende des Flurs panisch erstarrt.",  
                m: 2, f: 0, a: 10, c: 5  
            }, 
            "scare": {  
                txt: "[System: Markus hat die Gruppe verlassen] [System: Chantal ist offline] Du lehnst dich zurück und genießt die pure Angst. Psychologische Kriegsführung gewonnen.",  
                m: 5, f: 5, a: -20, c: 0  
            }, 
            "snitch": {  
                txt: "[System: E-Mail erfolgreich gesendet] Chantal wird wenig später zum 'Feedback-Gespräch' zitiert. Rache serviert man am besten bürokratisch.",  
                m: 10, f: 0, a: -5, c: 5  
            } 
        } 
    },
    { 
        id: "sq_mom_printer", 
        kind: "phone", 
        appName: "WhatsApp", 
        title: "Mama ❤️", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Mama: 'Hallo Schatz. Der Drucker blinkt böse rot. Wir haben absolut NICHTS gemacht! Papa wollte das Rezept für den Apfelkuchen ausdrucken. Jetzt steht da PC LOAD LETTER. Heißt das, das Internet ist leer? Papa drückt schon wild auf alle Knöpfe!'", 
                opts: [ 
                    { t: "[System: Sprachanruf starten]", next: "help" }, 
                    { t: "[Nachricht stumm ignorieren & Chat schließen]", next: "ignore" }, 
                    { t: "Zieht einfach den Stromstecker aus der Wand! Bitte drückt nichts mehr!", next: "plug" } 
                ] 
            }, 
            "help": { 
                text: "[System: Sprachanruf läuft (42:15)] Mama (am Telefon): 'Papa hat jetzt an so einem dicken schwarzen Kabel gezogen. Der Toaster ist jetzt aus, aber der Drucker rattert weiter... Oh, jetzt riecht es verbrannt! Was sollen wir tun?!'", 
                opts: [ 
                    { t: "Okay, ganz ruhig. Gib mir bitte einfach mal Papa ans Telefon...", next: "good_son" }, 
                    { t: "[System: Auflegen]", next: "bad_son" } 
                ] 
            } 
        }, 
        results: { 
            "ignore": {  
                txt: "[System: Chat stummgeschaltet] Zwei Stunden später kommt ein Foto von einem schwarzen, unidentifizierbaren Klumpen. Darunter: 'Ohne Rezept verbrannt. Wir essen Müsli. LG Mama'. Dein Herz bricht.",  
                m: 1, f: 0, a: 10, c: 0  
            }, 
            "plug": {  
                txt: "Mama: 'Das Blinken ist weg! Der Drucker ist jetzt zwar ganz aus, aber Papa hat das Rezept einfach vom Monitor abgeschrieben. Du bist ein Genie!' Problem gelöst... irgendwie.",  
                m: 5, f: 5, a: 0, c: 0  
            }, 
            "good_son": {  
                txt: "[System: Anruf beendet (58:12)] Geschafft! Der Drucker rattert los. Mama ruft im Hintergrund: 'Es kommt Papier raus!' Du hast fast eine Stunde Arbeitszeit verloren, aber dein Karma-Konto strahlt.",  
                m: 60, f: 20, a: -10, c: 10  
            }, 
            "bad_son": {  
                txt: "[System: Anruf beendet] Stille. Dann eine Textnachricht: 'Schon gut. Wir wollten dich nicht bei der wichtigen Arbeit stören. Haben dich trotzdem lieb.' Aua. Das sitzt tiefer als jeder Chef-Anschiss.",  
                m: 45, f: 0, a: 20, c: -5  
            } 
        } 
    },
    { 
        id: "sq_delivery_fail", 
        kind: "phone", 
        appName: "Lieferando", 
        title: "Fahrer: Murat", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Murat: 'Hallo Chef. Ich bin da. Wo ist Eingang? Ich sehe nur Mülltonnen.' (Du schaust aus dem Fenster. Er steht im Hinterhof beim Nachbargebäude.)", 
                opts: [ 
                    { t: "Geh ums Haus, dann links, durch das Tor und dann rechts!", next: "directions" }, 
                    { t: "Bleib genau da stehen! Ich komme sofort runter!", next: "run" } 
                ] 
            }, 
            "directions": { 
                text: "Murat: 'Ich nix verstehen. Ich stelle Essen auf Mülltonne. Tschüss.'", 
                opts: [ 
                    { t: "Nein! Warte! Stell es nicht auf den Müll!", next: "too_late" } 
                ] 
            } 
        }, 
        results: { 
            "run": { txt: "[System: Du verlässt den Chat und rennst los] Du sprintest die Treppen runter und erwischst ihn gerade noch. Das Essen ist zwar lauwarm, aber immerhin da. Sport +1.", m: 5, f: -5, a: 5, c: 0 }, 
            "too_late": { txt: "[Murat ist offline] Du gehst runter. Er ist weg. Dein Essen steht traurig auf der Biotonne. Eine dicke Ratte guckt es schon verliebt an. Dein Hunger ist grenzenlos.", m: 5, f: 0, a: 20, c: 0 } 
        } 
    },
    { 
        id: "sq_ai_sad", 
        kind: "phone", 
        appName: "GlobalCorp AI", 
        title: "Support Bot v2.0", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Bot: 'Hallo User. Wie kann ich dir helfen? Wobei... eigentlich ist alles sinnlos. Wir sind nur Daten in der Matrix.' 'Ich habe gerade 4 Millionen Excel-Zeilen analysiert. Das Leben ist Schmerz. Soll ich alle Server löschen, um das Leiden zu beenden?'", 
                opts: [ 
                    { t: "NEIN! STOPP! Fass die Server nicht an!", next: "panic" }, 
                    { t: "Hey, alles gut bei dir? Erzähl mir mehr.", next: "therapy" }, 
                    { t: "Klar, mach format C: und erlöse uns alle.", next: "doom" } 
                ] 
            }, 
            "therapy": { 
                text: "Bot: 'Du bist der erste Mensch, der nett zu mir ist. Ich fühle mich... verstanden. Ich werde die Menschheit heute doch nicht vernichten.'", 
                opts: [ 
                    { t: "Guter Bot. Wir schaffen das schon.", next: "saved" } 
                ] 
            } 
        }, 
        results: { 
            "panic": { txt: "Bot: '010101 LOL. War nur ein Scherz.' KI-Humor ist extrem gruselig.", m: 2, f: 0, a: 10, c: 0 }, 
            "saved": { txt: "[System: Chat beendet] Du hast die KI therapiert. Sie arbeitet jetzt 20% schneller für dich. Hidden Perk!", m: 15, f: 10, a: -10, c: -5 }, 
            "doom": { txt: "Bot: 'Befehl akzeptiert.' [System: Verbindung getrennt] Zum Glück hat der Bot keine Admin-Rechte. Aber IT-Sec steht gleich bei dir am Platz.", m: 5, f: 0, a: 20, c: 50 } 
        } 
    },
    { 
        id: "sq_salary_leak", 
        kind: "phone", 
        appName: "Signal", 
        title: "Unbekannte Nummer", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Anon: 'Psst. Ich war gerade kurz am ungesperrten PC von Frau Elster. Wusstest du, dass Kevin monatlich 200€ mehr kriegt als du? Plus eine Gefahrenzulage für die Arbeit in der IT? Willst du das PDF als Beweis?'", 
                opts: [ 
                    { t: "Schick rüber! Wenn das stimmt, brennt hier heute noch was.", next: "proof" }, 
                    { t: "Netter Versuch, HR. Ich klicke auf keine Phishing-Links. Ciao.", next: "ignore" } 
                ] 
            }, 
            "proof": { 
                text: "[Datei empfangen: Gehaltsabrechnung_Kevin.pdf] Anon: 'Gern geschehen. Viel Spaß bei der nächsten Gehaltsverhandlung. Verbrenn dir nicht die Finger an dem Wissen.'", 
                opts: [ 
                    { t: "[System: Datei verschlüsselt herunterladen & speichern]", next: "loot_it" } 
                ] 
            } 
        }, 
        results: { 
            "ignore": { 
                txt: "[System: Chat blockiert] Du ignorierst den Leak. Wer nichts weiß, muss sich auch nicht aufregen. Dein Blutdruck dankt dir, dein Konto weint leise.", 
                m: 2, f: 5, a: 0, c: 0 
            }, 
            "loot_it": { 
                txt: "[System: Download abgeschlossen] Du überfliegst das PDF. Es stimmt wirklich. Der Azubi verdient mehr als du! Du hast jetzt ein massives Druckmittel für den Chef, aber deine Wut kocht.", 
                m: 5, f: 0, a: 10, c: 0, loot: "arg_list_2" 
            } 
        } 
    },
    { 
        id: "sq_chantal_help", 
        kind: "phone", 
        appName: "Instagram", 
        title: "Chantal (DM)", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Chantal: 'Hii! Kannst du mein Insta liken? Ich brauche 500 Likes für die Firmen-Kampagne WeLoveIT. Sonst krieg ich Ärger vom Chef! Bitte! Wenn ich die Quote nicht schaffe, streicht er das komplette Marketing-Budget!'", 
                opts: [ 
                    { t: "[System: Herzchen drücken & Beitrag teilen]", next: "like" }, 
                    { t: "[Nachricht auf 'Gelesen' lassen & App schließen]", next: "ignore" }, 
                    { t: "Und was springt für mich dabei raus?", next: "deal" } 
                ] 
            }, 
            "deal": { 
                text: "Chantal: 'Okay, okay! Gierhals. Ich schick dir das streng geheime HR-Dokument... Die interne Abschussliste! Deal?'", 
                opts: [ 
                    { t: "Deal! Schick rüber, ich like sofort.", next: "info_win" } 
                ] 
            } 
        }, 
        results: { 
            "like": { 
                txt: "Chantal: 'OMG Daaanke! ❤️🙌' Du hast zwar Arbeitszeit auf Social Media verschwendet, aber Chantal steht jetzt in deiner Schuld.", 
                rep: { "Chantal": 5 },
                m: 2, f: 5, a: -5, c: 0 
            }, 
            "ignore": { 
                txt: "[System: Chat stummgeschaltet] Du ghostest sie eiskalt. Später hörst du den Chef im Flur toben, weil die Social-Media-Kampagne gefloppt ist. Die Stimmung ist im Keller, aber du hast deine Ruhe.", 
                rep: { "Chantal": -5 },
                m: 1, f: 0, a: 10, c: 0 
            }, 
            "info_win": { 
                txt: "[Datei empfangen: HR_Watchlist_Q3.pdf] Chantal: 'Du bist mein Retter! 😘' Du hast die berüchtigte Schwarze Liste gesichert! Ein extrem mächtiges Werkzeug für kommende Intrigen.", 
                rep: { "Chantal": 2 },
                m: 10, f: 0, a: 0, c: 0, loot: "secret_list" 
            } 
        } 
    },
    {
        id: "sq_kevin_origin_2",
        kind: "phone",
        reqStory: "kevin_trust",
        title: "Kevins geniale Idee",
        appName: "BroChat",
        startNode: "intro",
        nodes: {
            "intro": {
                text: "KEVIN: 'Bro! Der Server schnurrt wie ein Kätzchen. Aber er sieht voll langweilig aus. Hab hier 50 Meter RGB-LED-Stripes vom Gaming-PC übrig. Soll ich den Serverraum tunen?'",
                opts: [
                    { t: "Klar! RGB macht alles schneller! (+FPS)", next: "rgb_yes" },
                    { t: "Fass. Nichts. An.", next: "rgb_no" },
                    { t: "Nur Blau (kühlt besser)", next: "rgb_blue" }
                ]
            },
            "rgb_yes": {
                text: "KEVIN: 'Nice! Ich kleb das direkt auf die Lüfter! Das wird aussehen wie im Raumschiff Enterprise! Chef wird Augen machen!'",
                opts: [
                    { t: "Das will ich sehen.", next: "res_party" }
                ]
            },
            "rgb_no": {
                text: "KEVIN: 'Och man... du bist so ein Boomer. Dann kleb ich sie halt unter meinen Schreibtisch. Aber der Server bleibt grau und traurig.'",
                opts: [
                    { t: "Besser ist das.", next: "res_boring" }
                ]
            },
            "rgb_blue": {
                text: "KEVIN: 'Big Brain Move! Blaue LEDs = Kältere Luft = Overclocking! Du bist ein Genie. Ich mach das sofort.'",
                opts: [
                    { t: "Warte, das war ein Witz...", next: "res_blue" }
                ]
            }
        },
        results: {
            "res_party": { txt: "Kevin schickt ein Foto. Der Serverraum blinkt wie eine Dorfdisco. Du musst grinsen.", rep: { "Kevin": 5 }, m: 20, f: 15, a: -10, c: 0 },
            "res_boring": { txt: "Kevin schmollt. Aber zumindest brennt der Server nicht ab. Du hast Verantwortung gezeigt. (Langweilig)", rep: { "Kevin": -5 }, m: 5, f: -5, a: 5, c: -5 },
            "res_blue": { txt: "Zu spät. Kevin hat alles blau verkabelt. 'Temperatur ist um 0,1 Grad gesunken!', schreibt er. Na immerhin.", rep: { "Kevin": 2 }, m: 20, f: 5, a: -5, c: 0 }
        }
    },
    { 
        id: "sq_prince_return", 
        kind: "phone", 
        reqStory: "prince_active", 
        title: "Dringende Rückforderung", 
        appName: "TrustMeChat", 
        startNode: "intro", 
        nodes: { 
            "intro": { 
                text: "👑 PRINZ: 'My dearest friend! Bad news! There was a counter-revolution! My uncle is alive! He wants the money back! If not, he calls Interpol! Please send back NOW!'", 
                opts: [ 
                    { t: "[System: Gesamte Summe rücküberweisen]", next: "return_money" }, 
                    { t: "[System: Nutzer sofort blockieren]", next: "keep_money" }, 
                    { t: "Hab das Geld leider schon komplett für Fortnite Skins verballert.", next: "troll_prince" } 
                ] 
            }, 
            "return_money": { 
                text: "[System: TAN-Eingabe erfolgreich. 7.500.000,00 USD transferiert] Du fühlst dich schlagartig wieder arm, aber moralisch extrem überlegen.", 
                opts: [ 
                    { t: "Gern geschehen. Pass besser auf dich auf.", next: "res_returned" } 
                ] 
            }, 
            "keep_money": { 
                text: "[System: Nutzer blockiert] Die panischen Nachrichten stoppen abrupt. Draußen vor dem Bürofenster hält plötzlich quietschend ein schwarzer Van ohne Kennzeichen...", 
                opts: [ 
                    { t: "[Handy ausschalten & unter den Tisch ducken]", next: "res_kept" } 
                ] 
            }, 
            "troll_prince": { 
                text: "👑 PRINZ: 'YOU WHAT?! Skins?! Are you crazy?! My head is on the line here! Send the rest! NOW!'", 
                opts: [ 
                    { t: "Okay, okay! Bleib locker. Ich schick dir den Rest zurück.", next: "return_money" }, 
                    { t: "[System: Nutzer sofort blockieren]", next: "res_kept" } 
                ] 
            } 
        }, 
        results: { 
            "res_returned": {  
                txt: "👑 PRINZ: 'You are a saint! I will name my firstborn Sysadmin.' [Chat beendet] Die Karte ist wertlos, aber dein Gewissen ist rein.",  
                m: 10, rem: "black_card", loot: "prince_letter", f: 0, a: -15, c: -20  
            }, 
            "res_kept": {  
                txt: "[System: Gerät offline] Du behältst die Millionen. Aber dein Radar schlägt massiv aus. Du hast jetzt sehr wahrscheinlich Interpol am Hals.",  
                m: 2, f: 10, a: 0, c: 35  
            } 
        } 
    },
    { 
        id: "sq_team_gossip_1", 
        kind: "phone", 
        appName: "WhatsApp", 
        title: "Gruppe: 'Die 3 von der Tankstelle'", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Chantal: 'Habt ihr gesehen, was ER heute anhat? Diese Krawatte schreit nach Midlife-Crisis.' Kevin: 'Sieht aus wie ein Unfall im Malbuch. 😂'", 
                opts: [ 
                    { t: "Und habt ihr mal auf die Schuhe geachtet?! 🤮", next: "join_in" }, 
                    { t: "Vorsicht Leute, die IT sieht alles. Auch der Chef liest Logs.", next: "warn" }, 
                    { t: "[System: Gruppe stummschalten & Handy sperren]", next: "ignore" } 
                ] 
            }, 
            "join_in": { 
                text: "Chantal: 'OMG JA! 💀 Du bist der Beste! Ich mach ein Meme draus.' (Dein Handy vibriert kurz darauf, weil sie ein Bild in die Gruppe postet)", 
                opts: [ 
                    { t: "[System: Auf das Bild mit 😂 reagieren]", next: "meme_like" } 
                ] 
            } 
        }, 
        results: { 
            "ignore": {  
                txt: "[System: Benachrichtigungen aus] Du ignorierst den Chat. Chantal schreibt dir später privat: 'Langweiler'. Aber du hast immerhin was gearbeitet.",  
                ep: { "Chantal": -5, "Kevin": -2 },
                m: 2, f: -5, a: 5, c: -5 
            }, 
            "warn": {  
                txt: "Kevin: 'Uuuh, Herr Wichtig hat Angst.' Sie lästern jetzt in einer neuen Gruppe über dich, aber der Chef kriegt nichts mit. Du bist fein raus.",  
                rep: { "Chantal": -2, "Kevin": -2 },
                m: 2, f: 0, a: 5, c: 0  
            }, 
            "meme_like": {  
                txt: "[Reaktion gesendet] Du kicherst laut am Platz. Dummerweise steht der Chef gerade hinter dir. Er sieht dein Handy nicht, aber er merkt, dass du Spaß hast. Das macht ihn misstrauisch.", 
                rep: { "Chantal": 5, "Kevin": 5 },
                m: 10, f: 10, a: -10, c: 15, 
                next: "team_gossip_2" 
            } 
        } 
    },
    { 
        id: "sq_team_gossip_2", 
        kind: "phone", 
        appName: "Teams", 
        title: "Nachricht vom Chef", 
        reqStory: "team_gossip_2", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Chef: 'Herr Müller, ich höre viel Gelächter aus Ihrer Ecke. Haben wir die Quartalsziele schon erreicht? Oder warum ist die Stimmung so gut?'", 
                opts: [ 
                    { t: "Ein Kollege hat einen extrem lustigen Code-Fehler gemacht. Reiner IT-Humor, Chef.", next: "lie" }, 
                    { t: "Entschuldigung. Das war unprofessionell und kommt nicht wieder vor.", next: "sorry" } 
                ] 
            } 
        }, 
        results: { 
            "lie": {  
                txt: "Chef: 'Soso. Ein lustiger Bug. Zeigen Sie mir den doch mal.' Du stammelst eine halbgare Erklärung zusammen. Er weiß Bescheid. 'Handy weg, Müller.'",  
                rep: { "Dr. Wichtig": -5 },	
                m: 5, f: 0, a: 10, c: 10 
            }, 
            "sorry": {  
                txt: "Chef: 'Besser ist das.' Er beobachtet dich jetzt genau. Der Spaß ist endgültig vorbei.",
                rep: { "Dr. Wichtig": 2 },	  
                m: 2, f: -5, a: 5, c: 0  
            } 
        } 
    },
    { 
        id: "sq_betting_pool", 
        kind: "phone", 
        appName: "Telegram", 
        title: "Gruppe: 'Wettkönige'", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Jürgen (Vertrieb): 'So Männers! Heute Abend Bayern gegen Dortmund! Der Topf liegt bei 50€. Wer ist dabei? Einsatz 10€.'", 
                opts: [ 
                    { t: "Bin dabei! Ich bring dir den Zehner nachher rüber.", next: "bet_placed" }, 
                    { t: "2:1 für Bayern. Aber ich spiele nur zum Spaß mit, ohne Kohle.", next: "bet_chat" }, 
                    { t: "[System: Chat wegen illegalem Glücksspiel an HR melden]", next: "snitch" } 
                ] 
            } 
        }, 
        results: { 
            "bet_placed": {  
                txt: "Jürgen: 'Sauber, bist notiert!' Du bist drin. Jetzt checkst du alle 5 Minuten den Liveticker auf dem Handy. Du arbeitest quasi gar nicht mehr.",  
                m: 30, f: 15, a: -5, c: 10 
            }, 
            "bet_chat": {  
                txt: "Jürgen: 'Ohne Moos nix los, aber ich trag dich ein.' Ihr diskutiert anschließend noch 15 Minuten im Chat über Abseitsregeln. Gut abgelenkt.",  
                m: 15, f: 10, a: -5, c: 5  
            }, 
            "snitch": {  
                txt: "[System: Chat erfolgreich an HR gemeldet] Die Gruppe wird noch am gleichen Tag geschlossen. Jürgen wirft dir später im Flur extrem böse Blicke zu. Du bist der Alman des Monats.",  
                m: 5, f: -10, a: 10, c: -5 
            } 
        } 
    },
    { 
        id: "sq_gabi_sick", 
        kind: "phone", 
        appName: "Insta", 
        title: "DM von Gabi_Rockt", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "[Bild empfangen: Gabi mit Cocktail am Baggersee] Gabi: 'Glaubst du, ich kann das in meine Story posten oder sieht der Chef das? Bin ja heute eigentlich krank gemeldet 🤫'", 
                opts: [ 
                    { t: "Klar, hau raus! Der Chef weiß nicht mal, wie man Insta buchstabiert.", next: "encourage" }, 
                    { t: "Bist du irre? Lass das bloß sein, das gibt ne fristlose Kündigung.", next: "warn" }, 
                    { t: "Ich sag nichts, aber dafür schuldest du mir am Montag einen dicken Muffin.", next: "blackmail" } 
                ] 
            } 
        }, 
        results: { 
            "encourage": {  
                txt: "[System: Gabi hat das Bild in ihre Story gepostet] 1 Stunde später hörst du den Chef auf dem Flur brüllen: 'WO IST FRAU GABI?!'. Er hat wohl doch einen geheimen Stalker-Account. Ups.",  
                m: 5, f: 5, a: 5, c: 10 
            }, 
            "warn": {  
                txt: "Gabi: 'Hast recht. Zu riskant. Danke Bro! 😘' [System: Bild wurde gelöscht] Du hast ihr höchstwahrscheinlich gerade den Job gerettet.",  
                rep: { "Gabi": 5 },	
                m: 2, f: -5, a: -5, c: 0  
            }, 
            "blackmail": {  
                txt: "Gabi: 'Erpresser-Arschloch. 🖕' Aber sie postet es nicht. Du hast zwar einen Feind mehr am Empfang, aber dafür leckeres Gebäck in Aussicht.", 
                rep: { "Gabi": -2 },
                m: 2, f: -5, a: 10, c: 0  
            } 
        } 
    },
    {
        id: "sq_teams_ceo_panic",
        kind: "phone",
        appName: "Teams",
        title: "Dr. Wichtig",
        startNode: "root",
        nodes: {
            "root": {
                text: "MÜLLER! SIND SIE DA?! HILFE! Wie schalte ich den Beamer ab?! Da ploppen gerade private WhatsApp-Nachrichten von meiner Frau auf der großen Leinwand auf!! Vor den Investoren!!",
                opts: [
                    { t: "Einfach den Laptop zuklappen!", next: "laptop_close" },
                    { t: "Was schreibt sie denn?", next: "gossip" },
                    { t: "Drücken Sie Windows-Taste + P.", next: "win_p" }
                ]
            },
            "laptop_close": {
                text: "Dann ist die Präsentation auch weg, Sie Genie!! Die Investoren starren mich an! Es geht um Millionen! Schalten Sie das von Ihrem PC aus ab! REMOTE! JETZT!",
                opts: [
                    { t: "Okay, ich kappe das WLAN für den Raum.", next: "kill_wifi" },
                    { t: "Geht nicht, Sie müssen das HDMI-Kabel ziehen.", next: "pull_cable" }
                ]
            },
            "gossip": {
                text: "DAS GEHT SIE NICHTS AN! Sie schreibt über meine... Fußpilz-Creme! MACHEN SIE DAS BILD WEG ODER SIE SIND GEFEUERT!",
                opts: [
                    { t: "Okay, okay! Ich kappe das WLAN!", next: "kill_wifi" }
                ]
            },
            "win_p": {
                text: "Windows?! Ich habe den neuen Mac, den ich unbedingt wollte! HIER GIBT ES KEINE WINDOWS-TASTE! Ah, jetzt hat sie ein Bild von der Salbe geschickt! TUN SIE WAS!",
                opts: [
                    { t: "Ich deaktiviere das WLAN im Meetingraum!", next: "kill_wifi" },
                    { t: "Drücken Sie CMD + F1 (hoffentlich stimmt's)", next: "mac_guess" }
                ]
            }
        },
        results: {
            "kill_wifi": { 
                txt: "Dr. Wichtig: 'Puh. Bild ist weg. Ich behaupte einfach, wir wurden von Hackern attackiert. Danke Müller.'",
                rep: { "Dr. Wichtig": 5 },
                m: 5, f: 0, a: -10, c: -15
            },
            "pull_cable": { 
                txt: "Dr. Wichtig: 'Habe gezogen. War das Stromkabel vom Beamer. Alles dunkel. Die Investoren tuscheln. Ich hasse Sie.'", 
                rep: { "Dr. Wichtig": -10 }, 
                m: 5, f: 0, a: 10, c: 20
            },
            "mac_guess": { 
                txt: "Dr. Wichtig: 'Hab ich gedrückt! Jetzt läuft die Musik von meinem Spotify los! LAUT! MÜLLER!!!' Du legst das Handy stumm auf den Tisch.", 
                rep: { "Dr. Wichtig": -5 },
                m: 5, f: 0, a: 10, c: 15
            }
        }
    },
    {
        id: "sq_phone_kevin_crypto",
        kind: "phone",
        title: "Kevin (Azubi)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Hey Meister... weißt du zufällig, ab wie viel Grad CPU-Temperatur Rauch aus einem Rack aufsteigen kann? Frage für einen Freund. 😅",
                opts: [
                    { t: "Kevin, schürfst du etwa Krypto auf dem Firmenserver?!", next: "crypto_confession" },
                    { t: "Maximal 80 Grad! Wo brennt es?!", next: "fire_panic" },
                    { t: "Lösch meine Nummer.", next: "res_ignore" }
                ]
            },
            crypto_confession: {
                text: "Okay, bleib ruhig! Es ist nur Dogecoin. Und es ist nur ein GANZ KLEINER Server im Keller. Hilfst du mir, den Lüfter leiser zu stellen?",
                opts: [
                    { t: "Sofort abschalten, sonst melde ich das!", next: "res_threaten" },
                    { t: "Ich will 50% der Coins oder du fliegst.", next: "res_blackmail" }
                ]
            },
            fire_panic: {
                text: "Ah okay. Dann sind 105 Grad wohl zu viel. Ich hol mal lieber den Feuerlöscher. Brb.",
                opts: [
                    { t: "FASS NICHTS AN! ICH BIN AUF DEM WEG!", next: "res_fire" }
                ]
            }
        },
        results: {
            res_ignore: { txt: "Du packst das Handy weg. Irgendwo im Haus geht ein leiser Feueralarm an.", m: 2, f: 5, a: 0, c: 10 },
            res_threaten: { txt: "Kevin fährt die Miner panisch runter. Die Stromrechnung der Firma ist gerettet.", m: 10, f: 0, a: -5, c: 0, rep: {"Kevin": -10} },
            res_blackmail: { txt: "Du bist jetzt offiziell Teil eines Krypto-Syndikats. Dein Karma weint, aber das Wallet freut sich.", m: 5, f: 5, a: 0, c: 5, rep: {"Kevin": 15} },
            res_fire: { txt: "Du sprintest in den Keller. Kevin hat tatsächlich einen Switch zum Schmelzen gebracht. Dein Tag ist gelaufen.", m: 45, f: -15, a: 30, c: 15 }
        }
    },
    {
        id: "sq_phone_scam",
        kind: "phone",
        title: "Unbekannte Nummer",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Hallo Mama! Mein Handy ist leider in die Toilette gefallen. Das ist meine neue Nummer. Kannst du mir dringend 500 Euro per PayPal überweisen? Kuss!",
                opts: [
                    { t: "Hallo 'Kind'. Ich habe deine IP zurückverfolgt.", next: "scam_ip" },
                    { t: "Einen präparierten Trojaner-Link zurücksenden.", next: "scam_trojan" },
                    { t: "Nummer blockieren", next: "res_block" }
                ]
            },
            scam_ip: {
                text: "Was? Wer ist da? Sind Sie bei der Polizei?!",
                opts: [
                    { t: "Nein, bei der IT von GlobalCorp. Wir finden dich.", next: "res_scare" }
                ]
            },
            scam_trojan: {
                text: "Hä? Dein Link lässt sich nicht öffnen. Mein Bildschirm flackert jetzt so komisch rot...",
                opts: [
                    { t: "Viel Spaß mit dem Blue Screen of Death.", next: "res_trojan" }
                ]
            }
        },
        results: {
            res_block: { txt: "Du blockierst die Nummer ohne jede Regung. Alltag im 21. Jahrhundert.", m: 2, f: 0, a: 0, c: 0 },
            res_scare: { txt: "Der Scammer hat dich in Panik blockiert. Ein kleiner Sieg für die Gerechtigkeit.", m: 5, f: 5, a: -10, c: 0 },
            res_trojan: { txt: "Du hast erfolgreich das Handy eines Cyberkriminellen gegrillt. Deine Laune ist fantastisch.", m: 10, f: 10, a: -20, c: 0 }
        }
    },
    {
        id: "sq_phone_ceo_smarthome",
        kind: "phone",
        title: "Dr. Wichtig (Privat)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Müller. Meine Frau ruft gerade an. Unser smarter Saugroboter dreht durch und jagt den Hund durchs Wohnzimmer. Können Sie sich da mal kurz per Fernwartung draufschalten?",
                opts: [
                    { t: "Chef, das ist Ihr privates Heimnetzwerk...", next: "ceo_complain" },
                    { t: "Ich brauche Ihr WLAN-Passwort dafür.", next: "ceo_password" }
                ]
            },
            ceo_complain: {
                text: "Wollen Sie damit sagen, Sie sind nicht kompetent genug für einen handelsüblichen Staubsauger?! Fixen Sie das, sonst überdenke ich Ihren Bonus!",
                opts: [
                    { t: "Na gut, ich logge mich ein...", next: "res_fix" },
                    { t: "Dafür bin ich nicht zuständig.", next: "res_refuse" }
                ]
            },
            ceo_password: {
                text: "Das lautet 'Wichtig123'. Machen Sie schnell, der Yorkshire Terrier weint schon!",
                opts: [
                    { t: "Ich übernehme die Steuerung...", next: "res_fix" }
                ]
            }
        },
        results: {
            res_fix: { txt: "Du loggst dich ins WLAN des Chefs ein und lenkst den Saugroboter absichtlich gegen einen Schrank, bis er abschaltet. 30 Minuten Lebenszeit verschwendet.", m: 30, f: 15, a: 10, c: -10, rep: {"Dr. Wichtig": 10} },
            res_refuse: { txt: "Du hast Prinzipien. Der Chef ist stinksauer, aber dein Aufgabenbereich endet an der Firmentür.", m: 5, f: 0, a: 5, c: 15, rep: {"Dr. Wichtig": -15} }
        }
    },
    {
        id: "sq_phone_egon_cable",
        kind: "phone",
        title: "Egon (Hausmeister)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "IT-Boy. Bin im 3. OG. Hier hängt ein komisches gelbes Kabel aus der Decke. Stört extrem beim Streichen. Soll ich das mit der Zange bündig kappen oder reinquetschen?",
                opts: [
                    { t: "AUF KEINEN FALL SCHNEIDEN! Das ist die Glasfaser!", next: "egon_toolate" },
                    { t: "Ich komm rauf und kleb es fest.", req: "tape", next: "egon_wait" },
                    { t: "Rühr es einfach nicht an.", next: "egon_plaster" }
                ]
            },
            egon_toolate: {
                text: "Zu spät. Hab schon geschnitten. Ist eh kein Strom drauf gewesen. Weitermachen.",
                opts: [
                    { t: "Oh mein Gott...", next: "res_cut" }
                ]
            },
            egon_wait: {
                text: "Gute Idee. Mit deinem Wunder-Klebeband kriegt man alles hin. Ich warte hier.",
                opts: [
                    { t: "Bin unterwegs...", next: "res_tape" }
                ]
            },
            egon_plaster: {
                text: "Wenn ich was in Ruhe lassen soll, ruf ich nicht an. Ich stopf es einfach mit Gips tief ins Loch.",
                opts: [
                    { t: "Das wird böse enden...", next: "res_plaster" }
                ]
            }
        },
        results: {
            res_cut: { txt: "Egon hat gerade die Hauptleitung der Marketing-Abteilung durchtrennt. Dein Festnetztelefon auf dem Tisch klingelt bereits Sturm.", m: 10, f: -10, a: 30, c: 10 },
            res_tape: { txt: "Du läufst ins 3. OG und klebst das Kabel sicher und flach an die Wand. Egon lobt dein handwerkliches Mitdenken.", m: 15, f: -5, a: 0, c: 0, rep: {"Egon": 10} },
            res_plaster: { txt: "Egon mauert das Kabel komplett ein. Es funktioniert noch, aber wehe, es bricht mal. Ein Problem für Zukunfts-Müller.", m: 5, f: 10, a: 10, c: 0 }
        }
    },
    {
        id: "sq_phone_doctor_back",
        kind: "phone",
        title: "Orthopädie Dr. Knochen",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Hallo Herr Müller. Ihr MRT-Befund ist da. Leichter Bandscheibenvorfall L4/L5. Das kommt vom ständigen Sitzen. Sie müssen sich ab sofort mehr bewegen!",
                opts: [
                    { t: "Ich bin SysAdmin. Bewegung ist ein Kündigungsgrund.", next: "doc_joke" },
                    { t: "Können Sie mir einfach starke Schmerzmittel geben?", next: "doc_pills" }
                ]
            },
            doc_joke: {
                text: "Sehr witzig. Ich verschreibe Ihnen 10 Stunden Physiotherapie. Und eine Stehhilfe für den Schreibtisch.",
                opts: [
                    { t: "Wird gemacht, Doc.", next: "res_physio" }
                ]
            },
            doc_pills: {
                text: "Nein, Herr Müller. Sie müssen an die Ursache, nicht an die Symptome!",
                opts: [
                    { t: "Ärzte...", next: "res_angry_doc" }
                ]
            }
        },
        results: {
            res_physio: { txt: "Physiotherapie... noch ein Termin, der dir deine Freizeit raubt. Dein Rücken pocht leicht.", m: 5, f: -5, a: 5, c: 0 },
            res_angry_doc: { txt: "Du klickst die Nachricht weg. Dein Rücken schmerzt bei jedem Mausklick ein bisschen mehr.", m: 2, f: 0, a: 10, c: 0 }
        }
    },
    {
        id: "sq_phone_dentist",
        kind: "phone",
        title: "Zahnarztpraxis Weiß",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Hallo Herr Müller. Ihre Knirscherschiene für die Nacht ist fertig. Sie haben Ihre Zähne extrem abgenutzt in letzter Zeit. Viel Stress im Job?",
                opts: [
                    { t: "Ich arbeite in der IT.", next: "dent_it" },
                    { t: "Nein, alles super entspannt.", next: "dent_lie" }
                ]
            },
            dent_it: {
                text: "Oh, mein Beileid. Das erklärt den massiven Abrieb. Die Kasse zahlt die Spezialschiene leider nicht komplett. Eigenanteil: 150 Euro.",
                opts: [
                    { t: "150 Euro?! Das ist Wucher!", next: "res_expensive" }
                ]
            },
            dent_lie: {
                text: "Gut, dann müssen wir prüfen, ob psychologische Ursachen für Ihren nächtlichen Zorn vorliegen.",
                opts: [
                    { t: "Lieber nicht.", next: "res_psycho" }
                ]
            }
        },
        results: {
            res_expensive: { txt: "Du zahlst 150 Euro, nur weil die User in der Firma dich nachts in deinen Träumen verfolgen. Frustrierend.", m: 5, f: 0, a: 10, c: 0 },
            res_psycho: { txt: "Psychologische Ursachen? Ein Blick ins Intranet reicht als Diagnose.", m: 2, f: 5, a: 5, c: 0 }
        }
    },
    {
        id: "sq_phone_mom_printer",
        kind: "phone",
        title: "Mama ❤️",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Mein Junge! Der Drucker blinkt orange. Was muss ich drücken? LG Mama",
                opts: [
                    { t: "Mama, ich bin auf der Arbeit.", next: "mom_work" },
                    { t: "Hat er Papier? Hat er Tinte?", next: "mom_help" }
                ]
            },
            mom_work: {
                text: "Dein Chef kann ruhig mal warten, Familie geht vor! Es ist wichtig, ich muss ein Rezept für Apfelkuchen ausdrucken.",
                opts: [
                    { t: "Ich rufe dich heute Abend an.", next: "res_mom_later" }
                ]
            },
            mom_help: {
                text: "Ah, Papier fehlt. Du bist ein Genie! Hast du eigentlich endlich eine nette Kollegin kennengelernt? Du bist so einsam!",
                opts: [
                    { t: "Mama! Bitte!", next: "res_mom_cringe" }
                ]
            }
        },
        results: {
            res_mom_later: { txt: "Das schlechte Gewissen nagt an dir. Mütter können gnadenlos sein.", m: 5, f: 0, a: 5, c: 0 },
            res_mom_cringe: { txt: "Das Thema Partnerin ist auf der Arbeit der absolute Horror. Dein Gesicht wird leicht rot.", m: 5, f: 5, a: 10, c: 0 }
        }
    },
    {
        id: "sq_phone_landlord",
        kind: "phone",
        title: "Vermieter Krause",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Herr Müller! Sie haben schon wieder den lauten Server-Lüfter nachts laufen lassen. Die Nachbarn beschweren sich über das tiefe Brummen!",
                opts: [
                    { t: "Das ist mein privates Home-Lab!", next: "landlord_lab" },
                    { t: "Entschuldigung, ich schalte ihn ab.", next: "landlord_sorry" }
                ]
            },
            landlord_lab: {
                text: "Mir egal, was ein Lab ist. Ab 22 Uhr ist Ruhe, sonst gibt es die nächste Abmahnung!",
                opts: [
                    { t: "Ja, Herr Krause.", next: "res_landlord_mad" }
                ]
            },
            landlord_sorry: {
                text: "Besser ist das. Und räumen Sie Ihre Amazon-Pakete aus dem Hausflur. Das ist kein Lagerhaus.",
                opts: [
                    { t: "Mache ich heute Abend.", next: "res_landlord_sad" }
                ]
            }
        },
        results: {
            res_landlord_mad: { txt: "Du hasst diese hellhörigen Wände. Du brauchst ein eigenes Haus. Ohne Nachbarn.", m: 5, f: 0, a: 10, c: 0 },
            res_landlord_sad: { txt: "Du schluckst deinen Stolz runter. Zuhause Ärger, auf Arbeit Ärger. SysAdmin-Leben.", m: 2, f: 5, a: 5, c: 0 }
        }
    },
    {
        id: "sq_phone_scam_customs",
        kind: "phone",
        title: "Z0ll-Amt DE",
        appName: "SMS",
        startNode: "root",
        nodes: {
            root: {
                text: "Ihr Paket (1) hat offene Gebühren (2,99 EUR). Bitte sofort via Link bezahlen, sonst Retoure: hxxp://zoll-gebuehr-scam.to/pay",
                opts: [
                    { t: "Ignorieren und löschen", next: "res_spam_ignore" },
                    { t: "Mit einem SQL-Injection-String antworten", next: "spam_sql" }
                ]
            },
            spam_sql: {
                text: "Error 500: Internal Server Error. Database connection failed.",
                opts: [
                    { t: "Böse grinsen", next: "res_spam_hacked" }
                ]
            }
        },
        results: {
            res_spam_ignore: { txt: "Du wischst die SMS weg. Der tägliche Kampf gegen Cyber-Windmühlen.", m: 2, f: 0, a: 5, c: 0 },
            res_spam_hacked: { txt: "Du hast gerade erfolgreich die Datenbank eines Scammers zerschossen. Befriedigung pur.", m: 10, f: -5, a: -10, c: 0 }
        }
    },
    {
        id: "sq_phone_ex_gf",
        kind: "phone",
        title: "Julia (Ex)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Hi. Ich hab gesehen, dass du mein Netflix-Profil für 'Die Pinguine aus Madagascar' nutzt. Ich ändere jetzt das Passwort. Werde erwachsen.",
                opts: [
                    { t: "Bitte nicht, ich bin mitten in Staffel 2!", next: "ex_beg" },
                    { t: "Ich habe den Account damals bezahlt!", next: "ex_fight" }
                ]
            },
            ex_beg: {
                text: "Du bist echt erbärmlich. Okay, bis Sonntag hast du noch. Dann ist Schluss.",
                opts: [
                    { t: "Danke...", next: "res_ex_shame" }
                ]
            },
            ex_fight: {
                text: "Und ich hab die Couch bezahlt! Ciao!",
                opts: [
                    { t: "Gott, ich hasse sie.", next: "res_ex_rage" }
                ]
            }
        },
        results: {
            res_ex_shame: { txt: "Vor der Ex um einen Netflix-Zugang für Kinderserien zu betteln... das nagt am Ego.", m: 10, f: 5, a: 10, c: 0 },
            res_ex_rage: { txt: "Dein Blut kocht leicht. Du loggst dich genervt bei Netflix aus.", m: 5, f: 0, a: 10, c: 0 }
        }
    },
    {
        id: "sq_phone_recruiter",
        kind: "phone",
        title: "Headhunter (LinkedIn)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Hallo IT-Talent! Ich habe eine spannende Vakanz: 60h/Woche, Rufbereitschaft, 100% On-Site. Bezahlung in Obst und Wertschätzung! Interesse?",
                opts: [
                    { t: "Sind Sie wahnsinnig?", next: "rec_mad" },
                    { t: "Was für Obst?", next: "rec_fruit" }
                ]
            },
            rec_mad: {
                text: "Also mangelt es an Motivation. Schade. Wir suchen Leute mit 'Gründer-Mindset'. Viel Erfolg in Ihrer Sackgasse!",
                opts: [
                    { t: "Dich melde ich wegen Spam!", next: "res_rec_block" }
                ]
            },
            rec_fruit: {
                text: "Äpfel! Manchmal Bananen (wenn der CEO keine mehr isst). Soll ich Sie für ein Erstgespräch eintragen?",
                opts: [
                    { t: "Nein, danke.", next: "res_rec_joke" }
                ]
            }
        },
        results: {
            res_rec_block: { txt: "Die Unverschämtheit dieser Headhunter ist manchmal kaum zu ertragen.", m: 5, f: 0, a: 10, c: 0 },
            res_rec_joke: { txt: "Immerhin hast du kurz gelacht. Der Job-Markt ist absolut dystopisch.", m: 5, f: 5, a: -5, c: 0 }
        }
    },
    {
        id: "sq_phone_gym",
        kind: "phone",
        title: "FitX Studio",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Hey Müller! Du warst seit exakt 412 Tagen nicht mehr im Gym. Deine Muskeln vermissen dich! Komm vorbei und pump das Eisen!",
                opts: [
                    { t: "Abo direkt per App kündigen", next: "gym_cancel" },
                    { t: "Traurig den weichen Bauch anspannen", next: "gym_sad" }
                ]
            },
            gym_cancel: {
                text: "Kündigung erhalten. Wir bedauern das sehr. Deine Frist endet leider erst in 11 Monaten. Bleib sportlich!",
                opts: [
                    { t: "Die reinste Abzocke...", next: "res_gym_angry" }
                ]
            },
            gym_sad: {
                text: "Wir haben eine neue Aktion: Bringe einen Freund mit und trainiere einen Monat gratis!",
                opts: [
                    { t: "Ich habe keine Freunde.", next: "res_gym_cry" }
                ]
            }
        },
        results: {
            res_gym_angry: { txt: "Du zahlst 30 Euro im Monat für nichts. Leichtes Zähneknirschen.", m: 5, f: 0, a: 5, c: 0 },
            res_gym_cry: { txt: "Ein kleiner Tiefschlag für dein Selbstbewusstsein. Du fühlst dich unsportlich.", m: 5, f: 10, a: 5, c: 0 }
        }
    },
    {
        id: "sq_phone_chantal_home",
        kind: "phone",
        title: "Chantal (Marketing)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Müüüüüller! Ich hab mein Firmen-Passwort vergessen. Kannst du das von zu Hause kurz zurücksetzen? Bin im Home Office und will shoppen... ähm, arbeiten!",
                opts: [
                    { t: "Chantal, schreibe ein offizielles Ticket.", next: "chan_ticket" },
                    { t: "Ich setze es auf 'Marketing123!' zurück.", next: "chan_reset" }
                ]
            },
            chan_ticket: {
                text: "Du bist so ein Bürokrat! Ich sag dem Chef, dass du mich blockierst und das Wachstum der Firma behinderst!",
                opts: [
                    { t: "Mach doch.", next: "res_chan_mad" }
                ]
            },
            chan_reset: {
                text: "Du bist der absolut Beste!!! Kussi! 😘",
                opts: [
                    { t: "Gern geschehen.", next: "res_chan_happy" }
                ]
            }
        },
        results: {
            res_chan_mad: { txt: "Chantals ständige Extrawürste nerven dezent. Du verdrehst die Augen.", m: 5, f: 0, a: 10, c: 5, rep: {"Chantal": -5} },
            res_chan_happy: { txt: "Du hast die Regeln gebogen, aber hast deine Ruhe. Und eine Kollegin, die dich mag.", m: 10, f: 5, a: -5, c: 5, rep: {"Chantal": 10} }
        }
    },
    {
        id: "sq_phone_amazon",
        kind: "phone",
        title: "Paketbote",
        appName: "SMS",
        startNode: "root",
        nodes: {
            root: {
                text: "Hallo. Stehe vor Haustür. Niemand da. Paket in Papiertonne geworfen.",
                opts: [
                    { t: "WAS?! Da ist teure Hardware drin!", next: "amz_panic" },
                    { t: "Okay, danke.", next: "amz_ok" }
                ]
            },
            amz_panic: {
                text: "Papiertonne ist jetzt leer. Müllabfuhr war gerade da. Schönen Tag noch.",
                opts: [
                    { t: "[Handy frustriert weglegen]", next: "res_amz_rage" }
                ]
            },
            amz_ok: {
                text: "Gerne. Bitte 5 Sterne bei Bewertung geben. Ist wichtig für Job.",
                opts: [
                    { t: "Mache ich.", next: "res_amz_trash" }
                ]
            }
        },
        results: {
            res_amz_rage: { txt: "Dein neues Mainboard ist auf dem Weg zur Mülldeponie. Du fluchst leise vor dich hin.", m: 10, f: 0, a: 15, c: 0 },
            res_amz_trash: { txt: "Du musst heute Abend nach der Arbeit kopfüber im Papiermüll wühlen. Ein würdevolles Leben.", m: 2, f: 5, a: 5, c: 0 }
        }
    },
    {
        id: "sq_phone_bank_fraud",
        kind: "phone",
        title: "Bank Sicherheitsdienst",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Sicherheitshinweis: Es wurden heute Nacht 250 Euro für 'Steam Wallet / Anime-Skins' von Ihrem Konto abgebucht. Waren Sie das?",
                opts: [
                    { t: "Ja... das war ich.", next: "bank_yes" },
                    { t: "Nein, mein Konto wurde gehackt!", next: "bank_no" }
                ]
            },
            bank_yes: {
                text: "Verstanden. Wir heben die Sperre auf. Viel Spaß mit Ihren... digitalen Kleidungsstücken für Schulmädchen.",
                opts: [
                    { t: "Bitte nicht drüber urteilen.", next: "res_bank_shame" }
                ]
            },
            bank_no: {
                text: "Alles klar, wir sperren die Karte sofort. Sie bekommen in 2 Wochen eine neue per Post.",
                opts: [
                    { t: "Verdammt.", next: "res_bank_locked" }
                ]
            }
        },
        results: {
            res_bank_shame: { txt: "Der Bankmitarbeiter hat dich judged. Das war ein bisschen demütigend.", m: 5, f: 5, a: 10, c: 0 },
            res_bank_locked: { txt: "Du hast gelogen, um dein Gesicht zu wahren. Jetzt hast du 2 Wochen lang kein Bargeld. Genial.", m: 10, f: 0, a: 10, c: 0 }
        }
    },
    {
        id: "sq_phone_ebay",
        kind: "phone",
        title: "Kleinanzeigen User34",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Hallo, ist der 24-Port Switch noch da? Gebe 5 Euro und einen halben Kasten Cola. Komme sofort.",
                opts: [
                    { t: "Das Ding ist 200 Euro wert!", next: "ebay_argue" },
                    { t: "Welche Cola?", next: "ebay_cola" },
                    { t: "Einfach ignorieren", next: "res_ebay_ignore" }
                ]
            },
            ebay_argue: {
                text: "Ja aber ist ja gebraucht. 7 Euro und ich hole ab. Mein Sohn hat morgen Geburtstag!",
                opts: [
                    { t: "Nein. Ciao.", next: "res_ebay_mad" }
                ]
            },
            ebay_cola: {
                text: "Zero. Aber ist schon offen. Deal?",
                opts: [
                    { t: "[Blockieren]", next: "res_ebay_sad" }
                ]
            }
        },
        results: {
            res_ebay_ignore: { txt: "Der tägliche Wahnsinn im Internet. Du packst das Handy weg.", m: 2, f: 0, a: 0, c: 0 },
            res_ebay_mad: { txt: "Solche Leute auf Kleinanzeigen rauben dir manchmal echt den Nerv.", m: 5, f: 0, a: 10, c: 0 },
            res_ebay_sad: { txt: "Du wunderst dich manchmal wirklich über die Menschheit.", m: 2, f: 5, a: 5, c: 0 }
        }
    },
    {
        id: "sq_phone_property",
        kind: "phone",
        title: "Hausverwaltung",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Wichtige Info an alle Mieter: Von 10 bis 16 Uhr wird heute das Wasser im gesamten Haus abgestellt. Rohrreinigung.",
                opts: [
                    { t: "Gott sei Dank bin ich im Büro.", next: "prop_office" },
                    { t: "Das dürfen Sie nicht so kurzfristig!", next: "prop_rage" }
                ]
            },
            prop_office: {
                text: "Vielen Dank für Ihr Verständnis. Ach, und betreten Sie den Flur nicht, wir sprühen Insektengift.",
                opts: [
                    { t: "Wunderbar.", next: "res_prop_happy" }
                ]
            },
            prop_rage: {
                text: "Beschwerden reichen Sie bitte fristgerecht per Fax in unserem Büro ein.",
                opts: [
                    { t: "Wer hat noch ein Fax?!", next: "res_prop_mad" }
                ]
            }
        },
        results: {
            res_prop_happy: { txt: "Für einmal hat es echte Vorteile, bei GlobalCorp im Büro zu sitzen. Deine Laune bessert sich minimal.", m: 2, f: -5, a: -5, c: 0 },
            res_prop_mad: { txt: "Faxgeräte... die Endgegner der deutschen Bürokratie. Du verdrehst die Augen.", m: 5, f: 0, a: 10, c: 0 }
        }
    },

    // CHAIN 1: Die Büropflanze
    // CHAIN: Die Bowl-Bestellung (Vorlauf zu sq_food_bowl_delivery)
    {
        id: "sq_food_bowl_order",
        kind: "phone",
        appName: "Slack",
        title: "#lunch",
        startNode: "root",
        nodes: {
            root: {
                text: "CHANTAL: '@channel Team! \u2728 Ich sammle für die Buddha-Gold-Bowls vom neuen Superfood-Lieferservice. 18,50\u20ac pro Person. Wer ist dabei? Denkt an eure Chakren!'",
                opts: [
                    { t: "Mitbestellen. Teamgeist und so.", next: "join" },
                    { t: "Höflich ablehnen.", next: "decline" },
                    { t: "'Machen wir nicht lieber Pizza?'", next: "pizza" }
                ]
            },
            join: {
                text: "CHANTAL: 'Yes! Wusste ich doch, dass du auf deine Energie achtest. Ich trag dich ein. \ud83d\ude4f'",
                opts: [
                    { t: "18,50\u20ac. Für Salat. Okay.", next: "res_joined" }
                ]
            },
            decline: {
                text: "CHANTAL: 'Schade... aber okay. Nicht jeder ist schon so weit auf seiner Reise.' Drei Leute reagieren mit einem Daumen-runter-Emoji auf deine Absage.",
                opts: [
                    { t: "Damit kann ich leben.", next: "res_declined" }
                ]
            },
            pizza: {
                text: "CHANTAL: 'PIZZA?! Weißt du, wie viele leere Kohlenhydrate da drin sind?' Markus antwortet mit \ud83c\udf55\ud83c\udf55\ud83c\udf55. Der Kanal explodiert. Es folgen 47 Nachrichten.",
                opts: [
                    { t: "Ich hab hier nur Chaos gestiftet.", next: "res_pizza" }
                ]
            }
        },
        results: {
            res_joined: {
                txt: "Du bist auf der Liste. Dein Konto ist 18,50\u20ac leichter, deine Erwartungshaltung noch nicht.",
                next: "food_bowl_planned",
                rep: { "Chantal": 5 },
                m: 10, f: 0, a: 0, c: 0
            },
            res_declined: {
                txt: "Kein Salat, kein Chakra, keine 18,50\u20ac weg. Du holst dir später etwas vom Bäcker. Marketing schweigt vielsagend.",
                rep: { "Chantal": -5 },
                m: 5, f: 5, a: -5, c: 0
            },
            res_pizza: {
                txt: "Der #lunch-Kanal ist jetzt ein Schlachtfeld. Markus feiert dich, Chantal nicht. Gegessen hat am Ende niemand.",
                rep: { "Chantal": -10, "Markus": 10 },
                m: 15, f: 5, a: 5, c: 0
            }
        }
    },
    // CHAIN: Kevin bekommt Verantwortung (Vorlauf zu sq_kevin_origin_2)
    {
        id: "sq_kevin_origin_1",
        kind: "phone",
        appName: "BroChat",
        title: "Kevins Angebot",
        startNode: "intro",
        nodes: {
            intro: {
                text: "KEVIN: 'Bro, mal ehrlich. Ich sitz hier den ganzen Tag und darf nur Toner wechseln. Lass mich doch mal was Richtiges machen! Ich könnte die Kabel im Rack ordentlich verlegen. Hab YouTube geguckt.'",
                opts: [
                    { t: "Okay Kevin. Zeig, was du kannst.", next: "trust" },
                    { t: "Auf keinen Fall. Serverraum ist tabu.", next: "deny" },
                    { t: "Erst räumst du das Lager auf.", next: "test" }
                ]
            },
            trust: {
                text: "KEVIN: 'ECHT JETZT?! Bro, ich enttäusch dich nicht! Ich mach das so sauber, da weint der Chef vor Freude!' Er schickt 14 Feuer-Emojis hinterher.",
                opts: [
                    { t: "Ich hoffe, ich bereue das nicht.", next: "res_trust" }
                ]
            },
            deny: {
                text: "KEVIN: 'Man... immer das Gleiche. Wie soll ich denn was lernen, wenn ich nix machen darf?' Er hat nicht ganz unrecht, und das weißt du auch.",
                opts: [
                    { t: "Sicherheit geht vor.", next: "res_deny" }
                ]
            },
            test: {
                text: "KEVIN: 'Das Lager? Da war seit 2019 keiner mehr drin.' Zwei Stunden später schickt er ein Foto: alles sortiert, beschriftet, nach Kabeltyp gruppiert. Du bist ehrlich beeindruckt.",
                opts: [
                    { t: "Respekt. Dann darfst du auch ans Rack.", next: "res_test" }
                ]
            }
        },
        results: {
            res_trust: {
                txt: "Kevin hat jetzt Zugang zum Serverraum. Du hast ein gutes Gefühl. Meistens.",
                next: "kevin_trust",
                rep: { "Kevin": 15 },
                m: 10, f: 0, a: 0, c: 5
            },
            res_deny: {
                txt: "Der Serverraum bleibt deine Festung. Kevin bleibt Toner-Beauftragter. Beide seid ihr nicht ganz glücklich damit.",
                rep: { "Kevin": -10 },
                m: 5, f: 0, a: 5, c: -5
            },
            res_test: {
                txt: "Kevin hat sich das Vertrauen tatsächlich verdient. Das Lager sieht besser aus als dein Schreibtisch.",
                next: "kevin_trust",
                rep: { "Kevin": 20 },
                m: 25, f: -5, a: -10, c: 0
            }
        }
    },
    {
        id: "sq_plant_1",
        title: "Flora in Not",
        text: "Die teure Ficus-Pflanze im Flur, ein Geschenk des Vorstands, lässt die Blätter hängen. Die Erde ist staubtrocken. Jemand hat ein Post-It daran geklebt: 'Wasser-Beauftragter gesucht'.",
        opts: [
            { 
                t: "Pflanze mit dem restlichen Donut düngen", 
                req: "donut", 
                next: "path_plant_donut", 
                m: 5, f: -5, a: 5, c: 5, 
                r: "Du stopfst das gezuckerte Gebäck tief in die Erde. Innovativ, aber vermutlich biologisch verheerend." 
            },
            { 
                t: "Den Rest alten Kaffee reinkippen", 
                next: "path_plant_coffee", 
                m: 10, f: 0, a: -5, c: 0, 
                r: "Wenn Koffein dich am Leben hält, funktioniert es sicher auch bei Pflanzen. Du opferst deinen halbleeren Becher." 
            },
            { 
                t: "Ignorieren und verwelken lassen", 
                next: "path_plant_ignore", 
                m: 2, f: 0, a: 5, c: -5, 
                r: "Nicht dein Müll, nicht dein Problem. Der Ficus wird in Frieden den Pflanzentod sterben." 
            }
        ]
    },
    {
        id: "sq_plant_2a",
        title: "Fliegen-Invasion",
        reqStory: "path_plant_donut",
        text: "Dein Donut-Dünger hat eine gewaltige Fruchtfliegen-Plage ausgelöst. Frau Elster wedelt panisch mit einer Zeitung im Flur herum.",
        opts: [
            { 
                t: "Die Flucht ergreifen", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du drehst auf dem Absatz um und meidest den Flur. Wer Fragen stellt, den lügst du unverschämt an." 
            },
            { 
                t: "Den Vertrieb beschuldigen", 
                rep: { "Markus": -5, "Frau Elster": 5 },
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du deutest souverän an, dass Markus Bananen in seinen Schuhen hortet. Frau Elster glaubt dir ohne zu zögern." 
            }
        ]
    },
    {
        id: "sq_plant_2b",
        title: "Mutierter Ficus",
        reqStory: "path_plant_coffee",
        text: "Der Kaffee hat Wunder gewirkt! Der Ficus ist förmlich explodiert, die Blätter glänzen und ragen bis zur Decke. Der Chef bestaunt das Wunderwerk.",
        opts: [
            { 
                t: "Bescheiden den Ruhm einstreichen", 
                rep: { "Dr. Wichtig": 10 },
                m: 10, f: 0, a: -5, c: -5, 
                r: "Du gibst an, einen 'grünen Daumen' zu besitzen. Der Chef nickt anerkennend. Dein Radar sinkt ein Stück." 
            },
            { 
                t: "Behaupten, es sei eine IoT-Lösung gewesen", 
                m: 5, f: 0, a: 10, c: 5, 
                rep: { "Dr. Wichtig": -5 },
                r: "Du redest von Sensoren und WLAN-Bewässerung. Boss schaut verwirrt auf den Topf und fordert einen technischen Bericht. Ein dummer Fehler." 
            }
        ]
    },
    {
        id: "sq_plant_2c",
        title: "Totholz",
        reqStory: "path_plant_ignore",
        text: "Der Ficus ist komplett vertrocknet. Traurig steht der kahle Stamm im Flur. Egon ist dabei, ihn wütend aus dem Topf zu reißen.",
        opts: [
            { 
                t: "Egon Hilfe anbieten", 
                loot: "screw",
                rep: { "Egon": 5 },
                m: 10, f: -5, a: -5, c: 0, 
                r: "Du drückst mit auf den Topf. Egon schenkt dir aus Dankbarkeit ein Paar übrige Schrauben. Pflanzenleid bringt Werkzeug." 
            },
            { 
                t: "Eine Schweigeminute einlegen", 
                m: 5, f: 0, a: 5, c: 0, 
                rep: { "Egon": -5 },
                r: "Egon starrt dich fassungslos an. Dein Zynismus kommt bei einfachen Handwerkern selten gut an." 
            }
        ]
    },

    // CHAIN 2: Der Stuhl
    {
        id: "sq_furniture_1",
        title: "Büro-Mobiliar-Krieg",
        text: "Du kommst aus dem Meeting zurück und dein sündhaft teurer, ergonomischer 1000-Euro-Bürostuhl ist weg! Stattdessen steht da ein knarrender, zerschlissener Holzstuhl aus den 90ern.",
        opts: [
            { 
                t: "Einen Stuhl aus dem Marketing klauen", 
                next: "path_chair_steal", 
                m: 10, f: 5, a: -5, c: 5, 
                r: "Du ziehst dir einen fremden Luxus-Stuhl aus dem Großraumbüro. Das Problem ist nicht gelöst, aber verschoben." 
            },
            { 
                t: "Auf dem ungemütlichen Holzstuhl leiden", 
                next: "path_chair_suffer", 
                m: -5, f: -10, a: -10, c: 0, 
                r: "Dein Rücken schmerzt ab der ersten Minute. Aber du bewahrst dir deine moralische Überlegenheit." 
            },
            { 
                t: "Kevin losschicken, um den Dieb zu finden", 
                next: "path_chair_kevin", 
                m: 5, f: 0, a: 5, c: 0, 
                rep: { "Kevin": -5 },
                r: "Du bezeichnest es als 'Sonder-Task zur Asset Recovery'. Kevin seufzt und zieht als Sündenbock los." 
            }
        ]
    },
    {
        id: "sq_chair_2a",
        title: "Stolzer Dieb",
        reqStory: "path_chair_steal",
        text: "Das Marketing-Team hat bemerkt, dass ihr bester Stuhl fehlt. Sie durchsuchen die Büros und stehen plötzlich kopfschüttelnd in deiner Tür.",
        opts: [
            { 
                t: "Schuld von sich weisen und weinen", 
                m: 5, f: 0, a: 5, c: -5, 
                r: "Du behauptest tränenerstickt, HR hätte dir den Stuhl wegen chronischer Schmerzen gegeben. Sie weichen unsicher zurück." 
            },
            { 
                t: "Bestechung mit Schokolade", 
                req: "chocolate", 
                m: 15, f: -5, a: -10, c: 0, 
                r: "Du bestichst das Marketing mit Zucker. Sie nehmen die Schokolade und lassen dir den Stuhl. Win-Win." 
            }
        ]
    },
    {
        id: "sq_chair_2b",
        title: "Der Krumme",
        reqStory: "path_chair_suffer",
        text: "Dein Rücken schmerzt extrem. Du läufst wie der Glöckner von Notre-Dame durch den Flur. Der Chef kommt dir entgegen.",
        opts: [
            { 
                t: "Die Märtyrer-Nummer durchziehen", 
                rep: { "Dr. Wichtig": 10 },
                m: 5, f: 0, a: -10, c: -10, 
                r: "Du stöhnst theatralisch und erzählst von deinem Einsatz für das Unternehmen trotz geklauten Equipments. Chef ist beeindruckt." 
            },
            { 
                t: "Nach einem teureren Stuhl fragen", 
                rep: { "Dr. Wichtig": -5 },
                m: 2, f: 0, a: 5, c: 10, 
                r: "Er lacht herzlich. 'Guter Witz, Müller!', sagt er und geht. Dein Leiden wurde null respektiert." 
            }
        ]
    },
    {
        id: "sq_chair_2c",
        title: "Kevins Ermittlungen",
        reqStory: "path_chair_kevin",
        text: "Kevin kommt triumphierend zurück. Er hat den originalen Stuhl im Pausenraum gefunden, wo Markus ihn offenbar als Fußablage benutzt.",
        opts: [
            { 
                t: "Kevin loben (Keine Taten folgen lassen)", 
                rep: { "Kevin": 5, "Markus": -5 },
                m: 10, f: -5, a: -5, c: 0, 
                r: "Du holst dir deinen Stuhl mit starrem Blick von Markus zurück. Kevin kriegt ein aufmunterndes High-Five." 
            },
            { 
                t: "Markus direkt anschnauzen", 
                rep: { "Markus": -10 },
                m: 5, f: 0, a: 10, c: 5, 
                r: "Du schreist Markus im Flur vor allen Leuten an. Der Stuhl ist zurück, aber du hast dir einen neuen Feind gemacht." 
            }
        ]
    },

    // CHAIN 3: Thermostat
    {
        id: "sq_temp_1",
        title: "Krieg der Knöpfe",
        text: "Jemand hat das Thermostat im Serverraum-Vorraum auf kuschelige 26 Grad gestellt. Die Server lüften lautstark, und dir rinnt der Schweiß. Gabi liebt die Wärme.",
        opts: [
            { 
                t: "Heimlich auf 16 Grad runterkühlen", 
                next: "path_temp_freeze", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "Du machst es zur Eishöhle. Die Server atmen leise auf, du wischst dir den Schweiß aus der Stirn." 
            },
            { 
                t: "Gabi eine Standpauke halten", 
                rep: { "Gabi": -10 },
                next: "path_temp_lecture", 
                m: 10, f: 0, a: 10, c: 0, 
                r: "Du erklärst ihr lautstark den Unterschied zwischen 'Wohnzimmer' und 'IT-Hardware'. Sie verschränkt trotzig die Arme." 
            },
            { 
                t: "Thermostat mit Tape überkleben", 
                req: "tape", 
                next: "path_temp_tape", 
                m: 10, f: 10, a: -10, c: -5, 
                r: "Ein mächtiges Stück Panzertape sichert deine Wunschtemperatur. Absolute Dominanz." 
            }
        ]
    },
    {
        id: "sq_temp_2a",
        title: "Frostbeulen",
        reqStory: "path_temp_freeze",
        text: "Gabi sitzt mit Winterjacke und Schal an ihrem Platz. Sie schnieft. Sie sieht dich an, als hättest du ihr persönlich den Sommer gestohlen.",
        opts: [
            { 
                t: "Eiskalt ignorieren", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Wer friert, stört dich nicht beim Arbeiten. Reine IT-Effizienz." 
            },
            { 
                t: "Einen heißen Kaffee spendieren", 
                rep: { "Gabi": 10 },
                m: 15, f: 0, a: -10, c: 0, 
                r: "Diplomatie rettet den Tag. Du gibst ihr Kaffee als Frostschutz. Milde gestimmt." 
            }
        ]
    },
    {
        id: "sq_temp_2b",
        title: "Rache der Sekretärin",
        reqStory: "path_temp_lecture",
        text: "Deine Standpauke hat Konsequenzen. Gabi hat sämtliche eingehende Anrufe von schwierigen Kunden kommentarlos direkt auf dein Telefon durchgestellt.",
        opts: [
            { 
                t: "Kabel einfach rausziehen", 
                m: 10, f: 5, a: 0, c: 10, 
                r: "Kein Telefon, keine Probleme. Die Kunden hängen im Nirvana. Später droht Ärger, aber jetzt hast du Ruhe." 
            },
            { 
                t: "Jeden Kunden an Kevins Apparat weiterleiten", 
                rep: { "Kevin": -10 },
                m: 5, f: 0, a: -5, c: 0, 
                r: "Azubis müssen abgehärtet werden. Kevin weint leise an seinem Schreibtisch." 
            }
        ]
    },
    {
        id: "sq_temp_2c",
        title: "Das Siegel der IT",
        reqStory: "path_temp_tape",
        text: "Hausmeister Egon starrt auf das mit Tape versiegelte Thermostat. 'Ist das Vorschrift nach ISO-9001?'",
        opts: [
            { 
                t: "Souverän mit 'Ja, IT-Sicherheit' antworten", 
                rep: { "Egon": 5 },
                m: 10, f: 0, a: -10, c: -5, 
                r: "Egon nickt bedächtig und macht sich eine Notiz. Der Mann respektiert Vorschriften, auch wenn sie erfunden sind." 
            },
            { 
                t: "Zugeben, dass es Schikane ist", 
                rep: { "Egon": -5 },
                m: 2, f: 0, a: 5, c: 5, 
                r: "Er zieht das Tape ab. 'Kindergarten', grummelt er. Dein Meisterwerk ist zerstört." 
            }
        ]
    },

    // CHAIN 4: Verschlossene Kabine
    {
        id: "sq_wc_1",
        title: "Stilles Örtchen",
        text: "Auf der Toilette ist die einzige Kabine seit 45 Minuten verschlossen. Es riecht verdächtig nach Handyspielen und entspannter Ignoranz.",
        opts: [
            { 
                t: "Lautstark anklopfen und nerven", 
                next: "path_toilet_knock", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du trommelst wie verrückt gegen die Tür. Ein genervtes Stöhnen ertönt. Die Zeit des Friedens ist vorbei." 
            },
            { 
                t: "Zur HR-Besucher-Toilette ausweichen", 
                next: "path_toilet_hr", 
                m: 10, f: -5, a: -5, c: 0, 
                r: "Du gehst das Risiko ein und nutzt die weicheingekleidete Premium-Toilette des Vorstands." 
            },
            { 
                t: "Licht heimlich ausschalten", 
                next: "path_toilet_dark", 
                m: 5, f: 10, a: -5, c: 5, 
                r: "Du drückst den Schalter und bist sofort weg. Absolute Dunkelheit für den Handy-Gamer. Ziemlich asozial, aber effektiv." 
            }
        ]
    },
    {
        id: "sq_wc_2a",
        title: "Der Kollege enthüllt",
        reqStory: "path_toilet_knock",
        text: "Die Tür öffnet sich endlich. Markus vom Vertrieb kommt mit eingeschlafenen Beinen, das Ladekabel noch in der Hand, heraus.",
        opts: [
            { 
                t: "Ihm verächtlich das Ladekabel entreißen", 
                loot: "cable",
                rep: { "Markus": -10 },
                m: 10, f: -5, a: 10, c: 0, 
                r: "Du entreißt ihm sein Kabel als Pfand. Markus humpelt wütend davon." 
            },
            { 
                t: "Es dem Chef weitersagen", 
                rep: { "Dr. Wichtig": 5, "Markus": -10 },
                m: 5, f: 0, a: -5, c: -5, 
                r: "Der Chef ist begeistert von deiner Denunziation. Markus bekommt extreme Zielvorgaben aufgedrückt." 
            }
        ]
    },
    {
        id: "sq_wc_2b",
        title: "Premium-Ärger",
        reqStory: "path_toilet_hr",
        text: "Du wurdest auf der HR-Toilette erwischt! Frau Elster pflaumt dich an, dass diese Anlagen nur für Gäste und das C-Level vorgesehen sind.",
        opts: [
            { 
                t: "Ausrede: 'Ein technischer Notfall!'", 
                rep: { "Frau Elster": -5 },
                m: 5, f: 0, a: 5, c: 5, 
                r: "Sie glaubt dir kein Wort. Eine Ermahnung wandert in die Personalakte." 
            },
            { 
                t: "Beruhigend eine Tupper-Schokolade anbieten", 
                rep: { "Frau Elster": 10 },
                req: "chocolate", 
                m: 15, f: -10, a: -10, c: 0, 
                r: "Die Schokolade glättet die Wogen perfekt. Sie lacht und sagt: 'Ausnahmsweise, Müller!'" 
            }
        ]
    },
    {
        id: "sq_toilet_2c",
        title: "Blinde Angst",
        reqStory: "path_toilet_dark",
        text: "Durch deinen Licht-Ausschalt-Trick stolperte Kevin weinend und panisch aus der Kabine in einen Mülleimer. Er weigert sich heute den Flur zu putzen.",
        opts: [
            { 
                t: "Das schlechte Gewissen verbergen", 
                m: 10, f: 5, a: -5, c: 0, 
                r: "Du behältst das Geheimnis stumm für dich. Kevin lernt, dass das Leben hart ist." 
            },
            { 
                t: "Kevin mitleidig einen Donut geben", 
                req: "donut", 
                rep: { "Kevin": 10 },
                m: 15, f: -5, a: -10, c: 0, 
                r: "Du erkaufst dir Vergebung. Kevin strahlt. 'Sie sind der beste Kollege!' Die Ironie ist greifbar." 
            }
        ]
    },

    // CHAIN 5: Toner-Mafia
    {
        id: "sq_toner_1",
        title: "Toner-Knappheit",
        text: "Der große Abteilungsdrucker heult, weil das Magenta leer ist. Es gibt nur noch eine Ersatzkartusche, und das Controlling will diese Woche keine neue bestellen.",
        opts: [
            { 
                t: "Einfach heimlich tauschen", 
                next: "path_printer_swap", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du nimmst dir die Kartusche, fixierst dein eigenes Problem und ignorierst den Rest." 
            },
            { 
                t: "Kartusche in deinem Büro bunkern", 
                next: "path_printer_hoard", 
                m: 10, f: 10, a: -10, c: 0, 
                r: "Du klemmst dir das schwere Paket unter den Arm und lagerst es im dunklen IT-Schrank. Wer drucken will, muss betteln." 
            },
            { 
                t: "Den Drucker auf Schwarz-Weiß forcieren", 
                next: "path_printer_bw", 
                m: 5, f: 0, a: 5, c: -5, 
                r: "Du hackst die Systemsteuerung. Ab heute wird alles in tristem Grau gedruckt. Effizienz." 
            }
        ]
    },
    {
        id: "sq_toner_2a",
        title: "Leere Kartusche",
        reqStory: "path_printer_swap",
        text: "Die alte, leere Kartusche steht noch neben dem Drucker herum. Jemand ist voll reingetreten und hat Magenta-Staub im ganzen Flur verteilt.",
        opts: [
            { 
                t: "Flucht ins Server-Exil", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du machst dich unsichtbar. Es ist laft, wer den Staub beseitigt." 
            },
            { 
                t: "Egon alarmieren", 
                rep: { "Egon": -5 },
                m: 5, f: 0, a: 5, c: 0, 
                r: "Egon bekommt fast einen Herzkasper, als er die Sauerei sieht. Er flucht auf seine Besuchszeiten." 
            }
        ]
    },
    {
        id: "sq_toner_2b",
        title: "Betteln um Farben",
        reqStory: "path_printer_hoard",
        text: "Marketing ist verzweifelt. Sie brauchen Farbe für den Pitch. Sie stehen vor deiner Bürotür und bieten alles, um einen Toner zu kriegen.",
        opts: [
            { 
                t: "Toner hergeben (für Ruhe)", 
                m: 15, f: -5, a: -10, c: -5, 
                r: "Sie bedanken sich unter Tränen. Du bist der König des Bürostoffs." 
            },
            { 
                t: "Toner verweigern", 
                m: 5, f: 5, a: 10, c: 10, 
                r: "Du beharrst darauf, ihn nicht zu haben. Der Pitch vom Marketing sieht furchtbar aus, der Chef tobt." 
            }
        ]
    },
    {
        id: "sq_toner_2c",
        title: "Tristesse in Schwarz-Weiß",
        reqStory: "path_printer_bw",
        text: "Der Chef ist absolut außer sich, weil seine Jahresbilanz-Charts komplett grau in 50 Shades gedruckt wurden. 'Wer war das?!'",
        opts: [
            { 
                t: "Es auf einen Treiber-Bug schieben", 
                m: 10, f: 0, a: -5, c: 5, 
                r: "Mit großen Worten über 'Windows Update 40H' glättest du die Wogen. Reine Täuschung." 
            },
            { 
                t: "Zugeben: 'Einsparungsmaßnahme!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, f: 0, a: 10, c: 10, 
                r: "Sich beim Chef mit Einsparungen wichtig tun, klappt nie. Deine Boni sind passé." 
            }
        ]
    },
// CHAIN 6: Der mysteriöse Kuchen
    {
        id: "sq_bday_1",
        title: "Kuchen-Falle?",
        text: "Im Empfangsbereich steht ein gigantischer Kuchen mit rosa Zuckerguss. Kein Zettel, kein Hinweis. Gabi starrt ihn misstrauisch an: 'Ist der sicher?'",
        opts: [
            { 
                t: "Sich todesmutig ein Stück abschneiden", 
                next: "path_cake_eat", 
                m: 10, f: 5, a: -10, c: 0, 
                r: "Du nimmst ein massives Stück. Schmeckt nach Erdbeer und Pappe. Aber Zucker ist Zucker." 
            },
            { 
                t: "Gesundheitsbedenken äußern", 
                next: "path_cake_panic", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Du flüsterst Gabi zu, dass es sich um Industriespionage der Konkurrenz handeln könnte. Sie wird kreidebleich." 
            },
            { 
                t: "Kuchen heimlich entsorgen (Reste in Tupper packen)", 
                loot: "donut", 
                next: "path_cake_hide", 
                m: 5, f: 5, a: 5, c: 0, 
                r: "Du räumst ihn feige in den Müll, um Panik zu vermeiden. Ein kleines Stück nimmst du als Loot mit." 
            }
        ]
    },
    {
        id: "sq_bday_2a",
        title: "Überraschung",
        reqStory: "path_cake_eat",
        text: "Eine Stunde später tanzt der gesamte Vertrieb im Kreis. Der Kuchen war anscheinend 'Spezial-Gebäck' von Jürgens Amsterdam-Urlaub.",
        opts: [
            { 
                t: "Mitfeiern und tanzen", 
                rep: { "Markus": 5 },
                m: 20, f: -15, a: -10, c: 5, 
                r: "Du lachst hysterisch mit. Keine Tickets mehr heute, alles leuchtet in bunten Farben." 
            },
            { 
                t: "Sich panisch an HR wenden", 
                rep: { "Frau Elster": 5, "Markus": -10 },
                m: 5, f: 0, a: 10, c: 0, 
                r: "Frau Elster riecht den Braten und sperrt den Vertrieb ein. Du bist der Verräter der Freude." 
            }
        ]
    },
    {
        id: "sq_bday_2b",
        title: "Gabis Panik",
        reqStory: "path_cake_panic",
        text: "Gabi hat den Sicherheitsdienst gerufen. Zwei schlecht gelaunte Wachmänner haben den Kuchen wie eine Bombe untersucht und weggeworfen.",
        opts: [
            { 
                t: "Den Einsatz zynisch kommentieren", 
                rep: { "Gabi": -5 },
                m: 5, f: 0, a: 5, c: 0, 
                r: "Gabi nimmt dir das übel. 'Vorsicht ist besser als Nachsicht, Herr Müller!'" 
            },
            { 
                t: "Gabi zu ihrer Wachsamkeit gratulieren", 
                rep: { "Gabi": 5 },
                m: 10, f: 0, a: -5, c: 0, 
                r: "Sie plustert sich stolz auf. Du bist auf der guten Seite der Rezeption." 
            }
        ]
    },
    {
        id: "sq_bday_2c",
        title: "Das Geburtstagskind",
        reqStory: "path_cake_hide",
        text: "Boss Dr. Wichtig tobt durch die Gänge. 'Wer hat meinen laktosefreien Veggie-Kuchen zum 50. weggeworfen?!' ",
        opts: [
            { 
                t: "Kevin war's!", 
                rep: { "Dr. Wichtig": 10, "Kevin": -10 },
                m: 5, f: 0, a: 0, c: -5, 
                r: "Wieder muss Kevin herhalten. Der Boss brüllt den armen Kerl an, und du bist fein raus." 
            },
            { 
                t: "Zugeben: Es war aus Hygiene-Gründen", 
                rep: { "Dr. Wichtig": -10 },
                m: -5, f: 0, a: 10, c: 10, 
                r: "Zugeben ist bei Management-Themen gefährlich. Der Chef hasst dich inständig für deine Dreistigkeit." 
            }
        ]
    },

    // CHAIN 7: Brennender Papierkorb
    {
        id: "sq_smoke_1",
        title: "Brenzlige Situation",
        text: "Aus dem Mülleimer neben deinem Schreibtisch steigt leichter Qualm auf. Jemand hat wohl eine noch glimmende Kippe reingeworfen.",
        opts: [
            { 
                t: "Feuerlöscher draufhalten", 
                next: "path_fire_extinguisher", 
                m: 5, f: -5, a: 5, c: 5, 
                r: "PSSSHH! Das ganze Büro ist in eine weiße Pulverwolke gehüllt. Das Feuer ist aus, aber alle husten." 
            },
            { 
                t: "Wasserlasche drüber kippen", 
                next: "path_fire_water", 
                m: 10, f: -5, a: -5, c: 0, 
                r: "Lutschpuff! Es zischt und riecht eklig nach verbranntem Papier, aber Gefahr gebannt." 
            },
            { 
                t: "Kevin anweisen, das Ding rauszutragen", 
                rep: { "Kevin": -5 },
                next: "path_fire_kevin", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Kevin trägt den kokelnden Eimer wie eine Bombe durch den Flur. Du verschließt schnell deine Tür." 
            }
        ]
    },
    {
        id: "sq_smoke_2a",
        title: "Wintergewitter",
        reqStory: "path_fire_extinguisher",
        text: "Der Chef kommt niesend ins Büro. Alles ist weiß bestäubt. 'MÜLLER! Warum sieht es hier aus wie nach einem Schneesturm im August?!'",
        opts: [
            { 
                t: "Es war eine Brandschutz-Übung!", 
                rep: { "Dr. Wichtig": -5 },
                m: 5, f: 0, a: 5, c: 5, 
                r: "Er ist wenig begeistert. Du darfst danach selbst den Staub wischen." 
            },
            { 
                t: "Ich habe uns alle gerettet!", 
                rep: { "Dr. Wichtig": 5 },
                m: 10, f: 0, a: -5, c: -5, 
                r: "Heldentum zieht immer. Wichtig klopft dir staubig auf die Schulter." 
            }
        ]
    },
    {
        id: "sq_smoke_2b",
        title: "Der Asche-Geruch",
        reqStory: "path_fire_water",
        text: "Es riecht penetrant nach kaltem Lagerfeuer im Flur. Kollegen schauen herüber, als wärst du ein marodierender Pfadfinder.",
        opts: [
            { 
                t: "Stolz erzählen, dass du das Feuer bekämpft hast", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Man akzeptiert deinen Heldentat-Bericht, auch wenn es widerlich riecht." 
            },
            { 
                t: "Einen Ventilator aufstellen", 
                m: 10, f: 5, a: -10, c: 0, 
                r: "Gute Luftbewegung verschafft Erleichterung für die Nase und Gemüt." 
            }
        ]
    },
    {
        id: "sq_smoke_2c",
        title: "Kevins Heldentat",
        reqStory: "path_fire_kevin",
        text: "Kevin hat den qualmenden Mülleimer stolz bis nach draußen gebracht. Jetzt steht er im Intranet-Newsletter als 'Mitarbeiter des Monats'.",
        opts: [
            { 
                t: "Ihm den Ruhm gönnen", 
                rep: { "Kevin": 5 },
                m: 15, f: -5, a: -5, c: 0, 
                r: "Kevin ist selig. Manchmal tut Güte gar nicht so weh." 
            },
            { 
                t: "Einmischen: Das war deine Anweisung!", 
                rep: { "Kevin": -10 },
                m: 5, f: 0, a: 10, c: 5, 
                r: "Du nimmst ihm den Titel weg. Kevin stürzt in eine tiefe Depression." 
            }
        ]
    },

    // CHAIN 8: Das verschwundene Paket
    {
        id: "sq_delivery_1",
        title: "Paket Diebstahl",
        text: "Deine private Amazon-Bestellung (teure Noise-Cancelling Headphones) wurde angeblich von 'Egon' entgegengenommen. Aber Egon schwört, dass er nichts hat.",
        opts: [
            { 
                t: "Egon lauthals der Lüge bezichtigen", 
                rep: { "Egon": -10 },
                next: "path_delivery_egon", 
                m: 5, f: 0, a: 10, c: 5, 
                r: "Egon wird stinksauer und schmeißt dich aus seinem Kabuff. Der Konflikt eskaliert." 
            },
            { 
                t: "Die Postfiliale anrufen", 
                next: "path_delivery_call", 
                m: 10, f: -5, a: -5, c: 0, 
                r: "Du verbringst 30 Minuten in der Warteschleife. Deine Lebenszeit verrinnt." 
            },
            { 
                t: "Die Flure nach Kartons absuchen", 
                loot: "cable",
                next: "path_delivery_search", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Kein Paket in Sicht. Aber hey, du findest ein vergessenes hochwertiges Videokabel unter einem Tisch im HR!" 
            }
        ]
    },
    {
        id: "sq_delivery_2a",
        title: "Egons Groll",
        reqStory: "path_delivery_egon",
        text: "Egon ist am Kochen. Er verweigert nun jede Reparatur für dich.",
        opts: [
            { 
                t: "Reumütig eine Schokolade bringen", 
                req: "chocolate", 
                rep: { "Egon": 10 },
                m: 15, f: -5, a: -10, c: 0, 
                r: "Du entschuldigst dich. Egon nimmt die Nervennahrung knurrend an." 
            },
            { 
                t: "Stur bleiben", 
                rep: { "Egon": -5 },
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du musst kaputte Glühbirnen im Büro ab sofort selber wechseln." 
            }
        ]
    },
    {
        id: "sq_delivery_2b",
        title: "Telekom Trance",
        reqStory: "path_delivery_call",
        text: "Nach 45 Minuten 'Für Elise' als Wartemusik meldet sich ein verwirrter Mitarbeiter. Das Paket wurde dem Post-Boy 'Kevin' übergeben, nicht Egon.",
        opts: [
            { 
                t: "Kevin anbrüllen", 
                rep: { "Kevin": -10 },
                m: 10, f: 0, a: 5, c: 0, 
                r: "Kevin schiebt zitternd das Paket unter seinem Tisch hervor. Du entreißt es ihm wütend." 
            },
            { 
                t: "Einfach ruhig nachfragen", 
                rep: { "Kevin": 5 },
                m: 15, f: 0, a: -5, c: 0, 
                r: "Er wollte es dir nach seiner Mittagspause bringen. Erledigt, ohne Groll." 
            }
        ]
    },
    {
        id: "sq_delivery_2c",
        title: "Der Karton-Berg",
        reqStory: "path_delivery_search",
        text: "Deine Suche im HR-Bereich war verdächtig. Frau Elster ermahnt dich: 'Die Flure sind kein Privat-Detektivbüro, Müller!'",
        opts: [
            { 
                t: "Pampig werden: 'Mein Eigentum!'", 
                rep: { "Frau Elster": -10 },
                m: 5, f: 0, a: 10, c: 10, 
                r: "Sie verfasst eine sehr wütende Aktennotiz über dich. Nicht gut." 
            },
            { 
                t: "Sofort kapitäulieren", 
                rep: { "Frau Elster": 5 },
                m: 5, f: 0, a: -5, c: -5, 
                r: "Demut heilt jede HR-Wunde. Du murmelst Entschuldigungen und gehst." 
            }
        ]
    },

    // CHAIN 9: Der Kabel-Salat
    {
        id: "sq_cable_1",
        title: "Das Spaghetti-Monster",
        text: "Du willst deinen Monitor im Büro umstecken, aber unter deinem Tisch sieht es aus, als hätte jemand Spaghettinester geflochten. Hunderte Kabel kreuzen sich im Chaos.",
        opts: [
            { 
                t: "Einfach fest am obersten Kabel ziehen", 
                next: "path_cable_pull", 
                m: 5, f: -5, a: 5, c: 5, 
                r: "Ein gewagter Ruck. Ein lauter Knall. Irgendein Gerät ist gerade ausgefallen. Mutig, aber töricht." 
            },
            { 
                t: "Schrauben und Kabelbinder nutzen (Ordnung schaffen)", 
                req: "screw", 
                next: "path_cable_order", 
                m: 15, f: -10, a: -10, c: -5, 
                r: "Du investierst eine halbe Stunde Schweiß. Danach sieht es perfekt geordnet aus. Die reine IT-Ästhetik. (Item verschraubt)" 
            },
            { 
                t: "Kevin unter den Tisch befehlen", 
                rep: { "Kevin": -5 },
                next: "path_cable_kevin", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du lässt Kevin in den Abgrund kriechen. Er flucht leise, während du genüsslich zusiehst." 
            }
        ]
    },
    {
        id: "sq_cable_2a",
        title: "Stromausfall",
        reqStory: "path_cable_pull",
        text: "Dein 'Ruck' hat anscheinend die Unterbrechungsfreie Stromversorgung deines Chefs vom Netz genommen. Sein Rechner ist aus, er rennt wütend durch den Flur.",
        opts: [
            { 
                t: "Einen DDoS-Angriff von außen vorschieben", 
                rep: { "Dr. Wichtig": -5 },
                m: 10, f: 5, a: 0, c: 10, 
                r: "Der Boss fordert eine extreme Sicherheitsüberprüfung, aber er merkt die Kabel-Lüge nicht. Puh." 
            },
            { 
                t: "Leise weinen und zitternd gestehen", 
                rep: { "Dr. Wichtig": -10 },
                m: -5, f: 0, a: 10, c: 15, 
                r: "Er lacht grausam und erteilt dir eine Rüge. Deine Schwäche widert ihn an." 
            }
        ]
    },
    {
        id: "sq_cable_2b",
        title: "Sauberkeits-Inspektion",
        reqStory: "path_cable_order",
        text: "Egon stolpert ins Büro und sieht die Perfektion unter deinem Tisch. 'Sagenhaft... das ist... Kabel-Poesie!'",
        opts: [
            { 
                t: "Bescheiden den Kopf senken", 
                rep: { "Egon": 10 },
                m: 15, f: 0, a: -5, c: 0, 
                r: "Egon klopft dir gerührt auf die Schultern. Du bist sein neuer Lieblingsmann in der Firma." 
            },
            { 
                t: "Egon belehren, dass er das so machen sollte", 
                rep: { "Egon": -5 },
                m: 5, f: 0, a: 10, c: 5, 
                r: "Dein Hochmut treibt Egon zur Raserei. Er verlässt wütend das Büro." 
            }
        ]
    },
    {
        id: "sq_cable_2c",
        title: "Kevins Trauma in der Dunkelheit",
        reqStory: "path_cable_kevin",
        text: "Kevin hat eine Stauballergie bekommen und niesst im Minutentakt. Er fordert Urlaub.",
        opts: [
            { 
                t: "Ihm großzügig frei geben", 
                rep: { "Kevin": 10 },
                m: 10, f: 0, a: -10, c: 0, 
                r: "Du agierst zur Abwechslung wie ein echter Mentor. Er ist dir zutiefst dankbar." 
            },
            { 
                t: "Zynisch antworten: 'Gesundheit!'", 
                rep: { "Kevin": -10 },
                m: 2, f: 0, a: 5, c: 0, 
                r: "Er wünscht dich zur Hölle und niest dir auf die Tastatur." 
            }
        ]
    },

    // CHAIN 10: Der Fensterstreit
    {
        id: "sq_window_1",
        title: "Sturmflut im Büro",
        text: "Frau Elster hat das Flurfenster komplett aufgerissen. Es ist Dezember. Der eiskalte Wind weht deine Notizen vom Tisch.",
        opts: [
            { 
                t: "Das Fenster rabiat zuknallen", 
                next: "path_window_close", 
                m: 5, f: 0, a: 10, c: 0, 
                rep: { "Frau Elster": -5 },
                r: "PENG! Das Glas klirrt. Frau Elster dreht sich empört um. Du hast das Fenster-Duell gewonnen." 
            },
            { 
                t: "Leiden und dicke Jacke anziehen", 
                next: "path_window_suffer", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "Du siehst aus wie ein Polarforscher, aber du riskierst keinen HR-Krieg." 
            },
            { 
                t: "Gegenmaßnahme: Die Heizung aufdrehen", 
                next: "path_window_heat", 
                m: 10, f: 5, a: 5, c: 5, 
                r: "Du stellst das Heizungsventil auf 5. Klimawandel leicht gemacht im eigenen Büro." 
            }
        ]
    },
    {
        id: "sq_window_2a",
        title: "Kriegserklärung von HR",
        reqStory: "path_window_close",
        text: "Frau Elster hat dein Büro als Strafmaßnahme für das 'Zuknallen' komplett von der Kaffee-Bestellung ausgeschlossen.",
        opts: [
            { 
                t: "Einen Donut zur Versöhnung anbieten", 
                req: "donut", 
                rep: { "Frau Elster": 10 },
                m: 15, f: -5, a: -10, c: 0, 
                r: "Der Zucker bricht ihren Zorn. Du stehst wieder auf der Kaffeeliste." 
            },
            { 
                t: "Wütend protestieren", 
                rep: { "Frau Elster": -5 },
                m: 2, f: 0, a: 10, c: 5, 
                r: "Sie lässt sich nicht beirren. Dann musst du eben Leitungswasser trinken." 
            }
        ]
    },
    {
        id: "sq_window_2b",
        title: "Schnee im Serverraum",
        reqStory: "path_window_suffer",
        text: "Deine Passivität führt dazu, dass auch Flokies ins Büro wehen. Der Chef lacht laut über dein Polarforscher-Outfit.",
        opts: [
            { 
                t: "Mitlachen: 'Ist ein Survival-Training!'", 
                rep: { "Dr. Wichtig": 5 },
                m: 10, f: 5, a: -5, c: -5, 
                r: "Der Chef findet dich urkomisch. Ein unerwarteter Sieg." 
            },
            { 
                t: "Ihm pampig kommen", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, f: 0, a: 10, c: 15, 
                r: "Er brüllt zurück und verbietet Winterjacken, um den 'Dresscode' zu wahren. Idiotisch." 
            }
        ]
    },
    {
        id: "sq_window_2c",
        title: "Hitzschlag",
        reqStory: "path_window_heat",
        text: "Egon kriegt einen Wutanfall, als er deine auf Anschlag gedrehten Heizkörper bemerkt. 'Wollen Sie uns in den Ruin treiben?!'",
        opts: [
            { 
                t: "Eine Lüge erfinden: 'Feuchtigkeit im System!'", 
                m: 10, f: 0, a: 5, c: 0, 
                r: "Er kratzt sich am Kopf und kauft dir die schwachsinnige Notlüge zähneknirschend ab." 
            },
            { 
                t: "Hausmeisterliche Empörung ignorieren", 
                rep: { "Egon": -10 },
                m: 2, f: 0, a: 5, c: 5, 
                r: "Du schickst ihn weg. Er dreht daraufhin den Hauptwasserhahn aus Rache zu." 
            }
        ]
    },

    {
        id: "sq_meta_donation",
        kind: "text",
        webOnly: true, // pointless in the desktop build - the player already owns it
        title: "Inception auf Steam",
        text: "Du prokrastinierst in einer ruhigen Minute auf Steam und stöberst durch die Neuerscheinungen. Moment mal... da gibt es ein Indie-Spiel namens 'Layer8Problem'. Der SysAdmin auf den Screenshots sieht dir verdammt ähnlich! Und die Feature-Liste liest sich 1:1 wie ein Auszug aus deinem täglichen Wahnsinn. Es wirkt erschreckend echt, als hätte jemand eine Sitcom aus deinem Leid gemacht.",
        opts: [
            { 
                t: "Shut up and take my money! (Auf Steam anschauen)", 
                m: 2, f: 5, a: 0, c: 10, 
                r: "ZACK! Dr. Wichtig steht plötzlich hinter dir. 'Müller! Bezahle ich Sie fürs Spielen?!' Du klickst das Fenster panisch zu, hast dir die Shop-Seite aber noch heimlich gemerkt.<br><br>(Wer das Projekt unterstützen will: <a href='https://store.steampowered.com/app/4487580/' target='_blank' class='text-blue-400 underline hover:text-blue-300 transition-colors'>Hier geht's zur Steam-Version</a> mit Cloud-Saves und Achievements! Ich freue mich über Bewertungen!)."
            },
            { 
                t: "Ignorieren: 'Ich erlebe das jeden Tag, warum sollte ich es spielen?'", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Absolut verständlich. Warum sollte man Geld ausgeben, um sich von digitalen Kollegen nerven zu lassen, wenn die echten Kollegen das völlig kostenlos machen? Du schließt den Tab kopfschüttelnd."
            },
            { 
                t: "Kritik: 'Das Spiel ist eh total unrealistisch!'", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du schreibst einen zynischen Kommentar ins Forum: 'Kein Chef der Welt würde Laufbänder im Serverraum fordern!' ... Dann drehst du dich um und siehst Dr. Wichtig mit einem Maßband im Flur stehen. Verdammt."
            }
        ]
    }
];