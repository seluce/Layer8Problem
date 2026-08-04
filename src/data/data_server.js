export const server = [

    {
        id: "srv_lore_1",
        title: "Der vergessene Aktenschrank",
        text: "Hinter dem Mainframe steht ein verstaubter Schrank mit der Aufschrift 'VERTRAULICH'. Er ist leicht geöffnet. Oben drauf liegt eine Rolle Verpackungsmaterial.",
        opts: [
            { 
                t: "In den Akten wühlen", 
                loot: "secret_list", 
                next: "path_lore_list", 
                m: 20, f: 5, a: 0, c: 5, 
                r: "Du wühlst dich durch staubige Rechnungen, bis du sie findest: Die 'Schwarze Liste' der HR. Das ist pures Dynamit. Du steckst sie schnell ein." 
            },
            { 
                t: "Die Luftpolsterfolie nehmen", 
                loot: "bubble_wrap", 
                next: "path_lore_bubble", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du entscheidest dich für das einfache Vergnügen. Die Folie wandert in deine Tasche. Manchmal ist Plastik besser als Wissen." 
            },
            { 
                t: "Nichts anfassen und gehen", 
                next: "path_lore_ignore", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du lässt die Geister der Vergangenheit ruhen. Manche Türen bleiben besser verschlossen." 
            }
        ]
    },
    {
        id: "srv_lore_2a",
        title: "Interne Ermittlung",
        reqStory: "path_lore_list",
        text: "Du hörst schwere Schritte im Gang. Es ist 'Der Cleaner' von der HR-Abteilung. Er sucht nach undichten Stellen. Die 'Schwarze Liste' in deiner Tasche fühlt sich plötzlich tonnenschwer an.",
        opts: [
            { 
                t: "Liste zurückgeben", 
                rem: "secret_list",
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du fängst ihn ab. 'Habe ich gefunden. Lag da einfach rum.' Er nimmt sie wortlos, nickt dir zu und geht. Keine Beweise, kein Ärger." 
            },
            { 
                t: "Mit Feuerlöscher ablenken", 
                req: "fire_ext",
                m: 5, f: 0, a: -5, c: 5, 
                r: "Ein kurzer Stoß CO2 sorgt für Nebel und Verwirrung. 'Feueralarm? Ich bin weg!' ruft er und rennt. Chaos ist dein Freund." 
            },
            { 
                t: "Im Kabelschacht verstecken", 
                m: 15, f: -5, a: 15, c: -5, 
                r: "Du quetschst dich zwischen staubige Kabelstränge. Er geht vorbei, schnüffelt kurz in der Luft, verschwindet aber wieder. Dein Herz hämmert." 
            }
        ]
    },
    {
        id: "srv_lore_2b",
        title: "Taschenkontrolle",
        reqStory: "path_lore_bubble",
        text: "Der 'Cleaner' von HR fängt dich im Flur ab. 'Routinekontrolle. Wir suchen gestohlenes Firmeneigentum. Taschen leeren!' Er starrt auf deine ausgebeulte Hosentasche.",
        opts: [
            { 
                t: "Taschen bereitwillig zeigen", 
                m: 5, f: 0, a: -5, c: -5, 
                r: "Er findet... Luftpolsterfolie. Er rümpft die Nase. 'Nur Müll? Sie haben ja gar keinen Ehrgeiz.' Er lässt dich samt Folie stehen." 
            },
            { 
                t: "Empört verweigern", 
                m: 2, f: 0, a: 10, c: 5, 
                r: "'Das verstößt gegen meine Rechte!' Er notiert deinen Namen auf einer Liste, aber da er nichts beweisen kann, zieht er ab." 
            },
            { 
                t: "Bestechungs-Donut anbieten", 
                rem: "donut",
                m: 2, f: 5, a: -10, c: -5, 
                r: "Er starrt auf den alten Donut. Sein Magen knurrt. 'Na gut. Einmalige Ausnahme.' Er nimmt den Donut und verschwindet kauend." 
            }
        ]
    },
    {
        id: "srv_sleep_1",
        title: "Das Karton-Lager",
        text: "Hinter den Racks stapeln sich alte Server-Verpackungen bis zur Decke. Eigentlich müsstest du sie zum Altpapier bringen. Aber wenn man sie geschickt anordnet, ergibt das eine blickdichte Höhle...",
        opts: [
            { 
                t: "Eine geheime Festung bauen", 
                next: "path_sleep_fort", 
                m: 60, f: 35, a: -10, c: 10, 
                r: "Du baust dir ein gemütliches Nest hinter der Kartonwand. Niemand kann dich hier sehen. Du machst ein Nickerchen und lässt das Bauwerk für 'zukünftige Notfälle' stehen." 
            },
            { 
                t: "Alles sofort entsorgen", 
                next: "path_sleep_trash", 
                m: 30, f: -10, a: 5, c: 0, 
                r: "Du schleppst die Kartons zum Container. Es ist langweilig und du schwitzt, aber der Serverraum ist jetzt wieder vorschriftsmäßig leer." 
            },
            { 
                t: "Schild 'RÜCKSENDUNG' dran kleben", 
                next: "path_sleep_label", 
                m: 5, f: 10, a: -5, c: 0, 
                r: "Du klebst wahllos Zettel auf die Stapel. Jetzt sieht es aus wie ein wichtiger Vorgang. Das Problem des 'Zukunfts-Ichs'." 
            }
        ]
    },
    {
        id: "srv_sleep_2a",
        title: "Der Festungs-Kommandant",
		char: "Kevin",
        reqStory: "path_sleep_fort",
        text: "Kevin steht vor deiner Karton-Festung. Er hat ein Passwort-Schild 'Eintritt nur für Coole' angebracht. 'Hey, Chef! Gute Bude. Ich hab WLAN-Kabel verlegt.'",
        opts: [
            { 
                t: "Ihn loben", 
                rep: { "Kevin": 5 },
                m: 5, f: 5, a: -5, c: 5, 
                r: "'Gute Arbeit, Soldat.' Ihr verbringt 10 Minuten damit, über Festungs-Architektur zu reden. Die Produktivität ist im Keller, die Moral oben." 
            },
            { 
                t: "Festung abreißen", 
                rep: { "Kevin": -10 },
                m: 15, f: -5, a: 5, c: 0,
                r: "Du bekommst Panik, dass der Chef es sieht. Du trittst die Kartons um. Kevin weint fast. 'Mein Schloss...'" 
            }
        ]
    },
    {
        id: "srv_sleep_2b",
		char: "Dr. Wichtig",
        title: "Lob vom Chef",
        reqStory: "path_sleep_trash",
        text: "Der Chef geht durch den leeren, ordentlichen Gang, wo vorher die Kartons waren. Er nickt zufrieden. 'Endlich mal Ordnung hier. Müller, das war vorbildlich.'",
        opts: [
            { 
                t: "Bescheiden nicken", 
				rep: { "Dr. Wichtig": 5 },
                m: 2, f: -5, a: -5, c: 10, 
                r: "Du sagst nichts und genießt den seltenen Moment der Anerkennung. Dein Standing in der Firma ist gestiegen." 
            },
            { 
                t: "Nach Gehaltserhöhung fragen", 
				rep: { "Dr. Wichtig": -5 },
                m: 5, f: 0, a: 5, c: 5, 
                r: "'Wegen der Kartons? Übertreiben Sie es nicht.' Die Stimmung kippt sofort wieder. Gier frisst Hirn." 
            }
        ]
    },
    {
        id: "srv_sleep_2c",
        title: "Der Logistik-Fehler",
        reqStory: "path_sleep_label",
        text: "Ein Kurierfahrer steht völlig verwirrt vor deinen 'Rücksendung'-Kartons. 'Ich soll das abholen? Aber auf dem Lieferschein steht 2018... und warum sind die leer?'",
        opts: [
            { 
                t: "Ihn überzeugen mitzunehmen", 
                m: 10, f: 5, a: -5, c: 10, 
                r: "Du redest so lange auf ihn ein, bis er sie genervt auflädt. 'Mir doch egal.' Weg ist weg. Du bist ein Genie." 
            },
            { 
                t: "Die Wahrheit sagen", 
                m: 30, f: -10, a: 5, c: -5, 
                r: "'Okay, ich war nur zu faul.' Du musst ihm helfen, alles zum Container zu tragen, während er dich beschimpft." 
            }
        ]
    },
    {
        id: "srv_tool_1",
        title: "Der externe Techniker",
        text: "Ein externer Dienstleister hat seinen Koffer im Serverraum offen stehen lassen. Er ist gerade rauchen. Ein hochwertiger Schraubendreher blitzt dich an.",
        opts: [
            { 
                t: "Das Chaos im Koffer sortieren", 
                next: "path_tool_sort", 
                m: 15, f: -5, a: -10, c: 0, 
                r: "Du kannst das Durcheinander nicht ansehen. Du sortierst Bits, Zangen und Kabelbinder nach Größe. Sehr befriedigend." 
            },
            { 
                t: "Deckel zu und warten", 
                next: "path_tool_wait", 
                m: 10, f: 5, a: 0, c: 0, 
                r: "Du klappst den Koffer zu, damit niemand anderes auf dumme Ideen kommt. Du bist heute der Wächter des Eigentums." 
            },
            { 
                t: "Einstecken", 
                loot: "screw", 
                next: "path_tool_theft", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "Meins. Werkzeug kann man immer brauchen. Du lässt den Rest unauffällig liegen." 
            }
        ]
    },
    {
        id: "srv_tool_2a",
        title: "Vermisstenanzeige",
        reqStory: "path_tool_theft",
        text: "Der Techniker kommt zurück und wühlt hektisch in seinem Koffer. 'Wo ist mein Wera-Dreher?! Der lag genau hier! Das Ding kostet 40 Euro!' Er starrt dich an.",
        opts: [
            { 
                t: "'Der lag am Boden.'", 
                rem: "screw", 
                m: 5, f: 0, a: 5, c: -5, 
                r: "'Ach, den habe ich... äh... gesichert.' Du gibst ihn zähneknirschend zurück. Der Techniker reißt ihn dir aus der Hand. Dein Gewissen ist rein, deine Taschen sind leer." 
            },
            { 
                t: "Eiskalt lügen: 'Keine Ahnung.'", 
                m: 2, f: 0, a: -5, c: 15, 
                r: "Du zuckst mit den Schultern. 'Vielleicht hat ihn der Putztrupp?' Er flucht und tritt gegen das Rack. Er glaubt dir nicht ganz, aber er hat keine Beweise." 
            },
            { 
                t: "Kevin beschuldigen", 
                m: 5, f: 5, a: -10, c: -5, 
                r: "'Der Azubi war vorhin hier...' Der Techniker wird rot. 'Ich bring den Kleinen um!' Er stürmt raus. Du fühlst dich kurz schlecht, aber hey: Gratis Werkzeug." 
            }
        ]
    },
    {
        id: "srv_tool_2b",
        title: "Das Genie beherrscht das Chaos",
        reqStory: "path_tool_sort",
        text: "Der Techniker kommt zurück, sieht in den perfekt sortierten Koffer und wird blass. 'Wer... wer hat das angefasst? Ich finde NICHTS mehr! Mein System basiert auf Haufen-Logik!'",
        opts: [
            { 
                t: "'Gern geschehen.'", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "'Gern?! Ich brauche Stunden, um das wieder durcheinander zu bringen!' Er ruft seinen Chef an, um sich über 'interne Sabotage' zu beschweren." 
            },
            { 
                t: "Ihn über Effizienz belehren", 
                m: 20, f: -10, a: 5, c: 5, 
                r: "Du erklärst ihm das 5S-System. Er hört gar nicht zu, sondern wirft wütend alles wieder auf einen Haufen. Perlen vor die Säue." 
            },
            { 
                t: "Wortlos gehen", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du lässt den Barbaren in seinem Elend zurück. Manche Menschen wollen einfach nicht gerettet werden." 
            }
        ]
    },
    {
        id: "srv_tool_2c",
        title: "Sucheinsatz",
        reqStory: "path_tool_wait",
        text: "Der Techniker kommt zurück und wirkt verzweifelt. 'Verdammt, ich finde meine Crimp-Zange nicht. Ich muss in 10 Minuten fertig sein, sonst Vertragsstrafe.'",
        opts: [
            { 
                t: "Helfen zu suchen", 
                loot: "energy", 
                m: 15, f: -10, a: 5, c: -5, 
                r: "Ihr kriecht zusammen unter den Doppelboden. Du findest die Zange. 'Danke, Mann! Hier, nimm das.' Er wirft dir einen Energy Drink zu." 
            },
            { 
                t: "Ihn auslachen", 
                m: 2, f: 5, a: -10, c: 5, 
                r: "'Profi am Werk, was?' Er zeigt dir den Mittelfinger. Deine Laune steigt, aber Freunde hast du dir nicht gemacht." 
            },
            { 
                t: "Kabelbinder schenken", 
                rem: "zip_ties", 
                m: 5, f: 0, a: -5, c: -5, 
                r: "'Vergiss die Zange, nimm die hier.' Er strahlt. 'Kabelbinder lösen alles.' Er pfuscht die Leitung zusammen und geht." 
            }
        ]
    },
    {
        id: "srv_bernd_1",
        title: "Tränen & Promille",
        text: "Du findest Bernd aus dem Vertrieb, der weinend zwischen den warmen Server-Racks sitzt und eine Flasche 'Glenfiddich' köpft. Er lallt: 'Meine Frau ist weg, mein Umsatz ist weg... alles ist weg.'",
        opts: [
            { 
                t: "Ihm einen Energy Drink geben", 
                rem: "energy", 
                next: "path_bernd_hyper", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Hier, trink das und reiß dich zusammen, du Wrack.' Bernd ext die Dose unter Tränen. Seine Augen weiten sich schlagartig. 'Zucker... Koffein... LEISTUNG?!'" 
            },
            { 
                t: "Sich dazusetzen & mittrinken", 
                next: "path_bernd_drunk", 
                m: 45, f: 20, a: -50, c: 20, 
                r: "Ihr leert die Flasche. Bernd erzählt dir von seinem Traum, Alpakas zu züchten. Du erzählst ihm dein Root-Passwort (hoffentlich hast du das nur geträumt). Ihr seid beste Freunde." 
            },
            { 
                t: "Eiskalt bei HR verpetzen", 
                next: "path_bernd_snitch", 
                m: 10, f: -5, a: 0, c: -15, 
                r: "Du rufst anonym an. Zwei Minuten später wird Bernd von der Security rausgeschleift. Er ruft: 'Verrat! Et tu, Brute?!' Du fühlst dich schmutzig, aber dein Job ist sicher." 
            }
        ]
    },
    {
        id: "srv_bernd_2a",
        title: "Katerstimmung",
        reqStory: "path_bernd_drunk",
        text: "Bernd materialisiert strahlend an deinem Schreibtisch. Er trägt eine Sonnenbrille und riecht nach Minze. 'Hey Partner! Wegen unserer Idee... Ich habe die Domain alpaka-server-farm.de schon registriert!'",
        opts: [
            { 
                t: "'Ich war betrunken!'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Bernds Gesicht fällt zusammen. 'Oh. Ich dachte... das war echt.' Er schlurft traurig davon. Es war nur ein Witz, aber sein Gesicht wirst du so schnell nicht los." 
            },
            { 
                t: "Nach weiterem Schnaps fragen", 
				rep: { "Dr. Wichtig": -2 },
                m: 5, f: 5, a: -10, c: 10, 
                r: "'Ha! Guter Witz!' Bernd lacht laut. Zu laut. Der Chef schaut aus seinem Büro. Schnell weg hier." 
            },
            { 
                t: "'Klar, bin dabei.'", 
                m: 15, f: 10, a: -5, c: 5, 
                r: "Bernd drückt dich. 'Wir werden reich! Ich kümmere mich um das Heu, du um die IT.' Er geht pfeifend. Du hast jetzt ein Side-Business." 
            }
        ]
    },
    {
        id: "srv_bernd_2b",
        title: "Erbe des Gefallenen",
        reqStory: "path_bernd_snitch",
        text: "Du gehst an Bernds leerem Schreibtisch vorbei. Er wurde 'freigestellt'. In seinem Mülleimer liegt noch sein Bürokram. Obenauf ein fast neuer Donut.",
        opts: [
            { 
                t: "Seinen Tacker klauen", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Es ist ein guter Tacker. Swingline. Rot. Du streichelst ihn. Meins." 
            },
            { 
                t: "Ein schlechtes Gewissen haben", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du starrst auf den leeren Stuhl. Was, wenn du der Nächste bist? Der Gedanke verdirbt dir den Tag." 
            },
            { 
                t: "Den Donut looten", 
                loot: "donut", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Schmeckt nach Sieg und Glasur." 
            }
        ]
    },
    {
        id: "srv_bernd_2c",
        title: "The Wolf of Server Room",
        reqStory: "path_bernd_hyper",
        text: "Bernd rennt an dir vorbei. Er vibriert förmlich. Der Mix aus Whisky und Energy Drink hat etwas in ihm verändert. Er schreit ins Telefon: 'KAUFEN! VERKAUFEN! ALLES MUSS RAUS!'",
        opts: [
            { 
                t: "Ihn bremsen wollen", 
                m: 10, f: -5, a: 10, c: 0, 
                r: "Du versuchst ihn zu beruhigen. Er starrt dich mit weit aufgerissenen Pupillen an. 'Zeit ist Geld! Aus dem Weg, Geringverdiener!' Er sprintet zum Aufzug." 
            },
            { 
                t: "Ihm WLAN-Passwörter verkaufen", 
                loot: "secret_list", 
                m: 15, f: 0, a: -5, c: 5, 
                r: "'Daten! Ich brauche Daten!' Er tauscht seine Kundenliste gegen das Gast-WLAN-Passwort. Ein fairer Deal unter Wahnsinnigen." 
            },
            { 
                t: "Ihn bewundern", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Er hat gerade dem Hausmeister einen Leasing-Vertrag für einen Besen verkauft. Beeindruckend." 
            }
        ]
    },
    {
        id: "srv_mining_1",
        title: "Hardware-Fund",
        text: "Hinter einem losen Bodenblech findest du ein ratterndes Gestell aus Grafikkarten. Es ist laut, heiß und riecht nach verbranntem Staub. Ein Klebezettel darauf sagt: 'NICHT ANFASSEN! MAMA RECHNET!'",
        opts: [
            { 
                t: "Laufen lassen", 
                next: "path_mining_heat", 
                m: 5, f: 10, a: 0, c: 20, 
                r: "Du deckst es wieder zu. Passives Einkommen! Solange der Chef die Stromrechnung nicht prüft, bist du reich. (Zumindest theoretisch.)" 
            },
            { 
                t: "Stecker ziehen", 
                next: "path_mining_crash", 
                m: 5, f: -5, a: 5, c: -5, 
                r: "Zack. Ruhe. Die Lüfter sterben mit einem traurigen Surren. Du fühlst dich verantwortungsbewusst und spaßbefreit." 
            },
            { 
                t: "Den USB-Stick an der Seite klauen", 
                loot: "usb_stick", 
                next: "path_mining_wallet", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "Das muss die Wallet sein! Du ziehst den Stick ab. Der Bildschirm wird schwarz. Egal, du bist jetzt Krypto-Millionär." 
            }
        ]
    },
    {
        id: "srv_mining_2a",
        title: "Thermische Eskalation",
        reqStory: "path_mining_heat",
        text: "Der Feueralarm brüllt los. Aus dem Bodenblech, wo das Mining-Rig steht, steigt schwarzer Rauch auf. Es war wohl doch etwas zu viel Staub in den Lüftern.",
        opts: [
            { 
                t: "Mit Feuerlöscher draufhalten", 
                req: "fire_ext", 
                m: 10, f: 0, a: -5, c: -5, 
                r: "CO2-Nebel füllt den Raum. Das Feuer ist aus, die Hardware ist Schrott. Du meldest es als 'Spontane Selbstentzündung eines Switches'." 
            },
            { 
                t: "Panisch auspusten", 
                m: 5, f: 0, a: 20, c: 20, 
                r: "Du wedelst mit einem Handbuch. Es bringt nichts. Die Sprinkleranlage geht an. Du bist nass, der Serverraum ist nass, und die Versicherung wird sehr konkrete Fragen stellen." 
            },
            { 
                t: "Rennen und 'FEUER!' schreien", 
                m: 2, f: 5, a: 10, c: 15, 
                r: "Du evakuierst dich selbst ins Home-Office. Die Feuerwehr regelt das. Morgen wird es unangenehme Fragen geben." 
            }
        ]
    },
    {
        id: "srv_mining_2b",
		char: "Dr. Wichtig",
        title: "Kritische Infrastruktur",
        reqStory: "path_mining_crash",
        text: "Zwei Stunden nachdem du das Rig abgeschaltet hast, stürmt der Chef rein. 'Müller! Das gesamte E-Mail-Archiv von 1990 bis 2005 ist offline! Das lief auf dem Legacy-Cluster hinter Rack 4!'",
        opts: [
            { 
                t: "Ehrlich sein: 'Ich hab's ausgemacht.'", 
				rep: { "Dr. Wichtig": -5 },
                m: 5, f: 0, a: 0, c: 30, 
                r: "Der Chef starrt dich an. 'Sie haben das Backup-System für illegalen Stromverbrauch gehalten? Müller, ich weiß nicht, ob Sie zu schlau oder zu dumm für diesen Job sind.'" 
            },
            { 
                t: "Behaupten, es war ein Hacker", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "'Die Russen, Chef. Ganz sicher.' Er wird blass. 'Oh Gott. Meine Mails an die Sekretärin...' Er rennt raus. Du schaltest das Ding schnell wieder an." 
            },
            { 
                t: "Den 'Fehler' suchen und beheben", 
                req: "manual", 
                m: 30, f: -15, a: 10, c: -10, 
                r: "Mit dem Win95-Handbuch und viel Geduld bootest du das System neu. Es piept fröhlich. Die Mails sind wieder da. Niemand dankt dir." 
            }
        ]
    },
    {
        id: "srv_mining_2c",
        title: "Der Krypto-Schatz",
        reqStory: "path_mining_wallet",
        text: "Du sitzt in der Pause und steckst den geklauten USB-Stick in deinen Laptop. Deine Hände zittern. Sind da Bitcoins drauf? Dogecoins? Die Rente?",
        opts: [
            { 
                t: "Stick öffnen", 
                m: 10, f: 5, a: 10, c: 0, 
                r: "Ordner: 'Urlaub_Mallorca_98'. Es sind nur 500 Bilder von Egon in Badehose. Dein Trauma ist unbeschreiblich. Der Stick ist wertlos." 
            },
            { 
                t: "Den Stick formatieren und die Beweise vernichten", 
                rem: "usb_stick", 
                m: 5, f: 0, a: -5, c: -5, 
                r: "Sicher ist sicher. Du löschst alles und wirfst den Stick in den Müll. Kein Reichtum, aber auch keine Beweise." 
            },
            { 
                t: "Stick an Kevin verkaufen", 
                rem: "usb_stick", 
                loot: "energy",
                rep: { "Kevin": -5 }, 
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Hey Kevin, da sind Cheat-Codes drauf.' Kevin glaubt dir und gibt dir seine letzte Dose Energy Drink dafür. Ein guter Tausch. (Item verloren, Energy erhalten)" 
            }
        ]
    },
    {
        id: "srv_cable_1",
        title: "Kabel-Salat",
        text: "Du stolperst über ein loses Glasfaserkabel. Ein hässliches Knirschen. Ein rotes Licht am Haupt-Switch blinkt hektisch. Das halbe Netzwerk ist gerade gestorben.",
        opts: [
            { 
                t: "Mit Tape fixieren", 
                req: "tape",
                next: "path_cable_fix", 
                m: 10, f: -5, a: -5, c: -5, 
                r: "Du wickelst eine halbe Rolle Panzertape um den Bruch. Es sieht aus wie ein verarztetes Bein, aber das Licht wird grün. Nichts hält länger als ein Provisorium." 
            },
            { 
                t: "Am Stecker wackeln", 
                next: "path_cable_wiggle", 
                m: 2, f: 5, a: 10, c: 0, 
                r: "Du drückst, ziehst und betest. Das Licht springt auf Grün. Du atmest aus. Bloß nicht mehr anatmen." 
            },
            { 
                t: "Wegrennen und verstecken", 
                next: "path_cable_run", 
                m: 5, f: 10, a: -5, c: 15, 
                r: "Du verschwindest im Schatten der Racks. Niemand hat dich gesehen. Im Flur hörst du erste Schreie: 'Das Internet ist weg!'" 
            }
        ]
    },
    {
        id: "srv_cable_2a",
        title: "ISO-Zertifizierung",
        reqStory: "path_cable_fix",
        text: "Ein externer ISO-Prüfer steht vor deinem Tape-Meisterwerk. Er tippt mit dem Kugelschreiber auf den silbernen Klumpen am Glasfaserkabel. 'Ist das... DIN-normgerecht?'",
        opts: [
            { 
                t: "Zugeben, dass es das Internet zusammenhält", 
                m: 5, f: 0, a: 5, c: -5, 
                r: "Der Prüfer seufzt tief. 'Ich habe nichts gesehen. Aber wenn das brennt, kenne ich Sie nicht.' Er geht weiter." 
            },
            { 
                t: "Das Tape abreißen - weg mit dem Beweis", 
                m: 5, f: 0, a: 20, c: 10, 
                r: "Du reißt das Tape ab. Das Kabel bricht sofort wieder. Das Netzwerk stirbt erneut. Der Prüfer starrt dich entsetzt an. 'Das war... mutig.'" 
            },
            { 
                t: "Behaupten, das sei eine Schirmung", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "'Spezial-Abschirmung gegen kosmische Strahlung.' Der Prüfer nickt beeindruckt und macht einen Haken. Kompetenz ist, wenn man sicher auftritt." 
            }
        ]
    },
    {
        id: "srv_cable_2b",
		char: "Dr. Wichtig",
        title: "Der Wackelkontakt",
        reqStory: "path_cable_wiggle",
        text: "Der Chef betritt den Serverraum. Er tritt fest auf den Boden. Durch die Erschütterung verliert dein nur 'gewackeltes' Kabel den Kontakt. Das Licht am Switch springt auf Rot.",
        opts: [
            { 
                t: "Heimlich dagegen treten", 
                m: 2, f: 0, a: 5, c: 5, 
                r: "Während er wegschaut, trittst du gegen das Rack. Das Licht wird grün. 'Selbstheilungskräfte', murmelst du. Puh." 
            },
            { 
                t: "Sofortige Not-Wartung vortäuschen", 
				rep: { "Dr. Wichtig": -5 },
                m: 15, f: -5, a: 5, c: -5, 
                r: "'Alarm! Kritischer Fehler!' Du scheuchst den Chef raus und wackelst wieder am Kabel. Es hält... für jetzt." 
            },
            { 
                t: "Einreden, er sei statisch aufgeladen", 
				rep: { "Dr. Wichtig": 5 },
                m: 5, f: 5, a: -5, c: 10, 
                r: "'Das ist Ihre Aura, Chef! Zu viel Energie!' Er wirkt geschmeichelt. 'Tatsächlich? Ich spüre auch so ein Kribbeln.' Er geht vorsichtig raus." 
            }
        ]
    },
    {
        id: "srv_cable_2c",
        title: "Die Hacker-Theorie",
        reqStory: "path_cable_run",
        text: "Im Flur herrscht Panik. Dr. Wichtig steht auf einem Stuhl. 'Wir werden angegriffen! Das ist Cyber-Warfare! Jemand hat die Leitung physisch gekappt!' Alle schauen sich misstrauisch an.",
        opts: [
            { 
                t: "Die 'Ermittlung' leiten", 
                rep: { "Dr. Wichtig": 2 },
                m: 10, f: 5, a: -5, c: -10, 
                r: "Du spielst Sherlock Holmes. 'Es war... eine Ratte. Ich habe Bissspuren gesehen.' Der Chef nickt. 'Kaufen Sie Gift.' Du bist fein raus." 
            },
            { 
                t: "Kevin beschuldigen", 
                m: 2, f: 5, a: -5, c: -5, 
                rep: { "Kevin": -15, "Dr. Wichtig": 10 },
                r: "'Ich sah Kevin in der Nähe des Racks...' Die Menge tobt. Kevin wird zum Verhör geschleift. Dein Karma ist im Keller, aber du bist sicher." 
            },
            { 
                t: "Still in der Ecke stehen", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du sagst nichts und hoffst, dass niemand deine Schuhabdrücke auf dem Kabel sieht. Der Angstschweiß läuft dir den Rücken runter." 
            }
        ]
    },
    {
        id: "srv_drink_1",
        title: "Vergessener Snack",
        text: "Auf einem warmen Server-Rack steht eine einsame Dose 'Cyber-Fuel'. Sie ist noch zu, aber das Mindesthaltbarkeitsdatum ist eine vage Erinnerung.",
        opts: [
            { 
                t: "Für später einstecken", 
                loot: "energy", 
                next: "path_drink_keep", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Für chemische Notfälle ist man besser gerüstet als überrascht. Ab in die Tasche damit." 
            },
            { 
                t: "Stehen lassen", 
                next: "path_drink_ignore", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du traust keiner Flüssigkeit, die im Dunkeln leuchtet. Du lässt sie für die Server-Goblins stehen." 
            },
            { 
                t: "Sofort trinken", 
                next: "path_drink_now", 
                m: 5, f: -15, a: -15, c: 0, 
                r: "ZISCH. Die warme Brühe schmeckt nach Gummibärchen und Herzrasen. Du fühlst dich unbesiegbar (für ca. 20 Minuten)." 
            }
        ]
    },
    {
        id: "srv_drink_2a",
        title: "Der Zucker-Crash",
        reqStory: "path_drink_now",
        text: "Dein Magen grummelt bedrohlich. Das 'Cyber-Fuel' war wohl doch schon etwas älter. Oder radioaktiv. Dein linkes Augenlid zuckt unkontrolliert.",
        opts: [
            { 
                t: "Weiterarbeiten und zittern", 
                m: 10, f: -5, a: 20, c: 5, 
                r: "Du versuchst zu tippen, aber deine Hände vibrieren so stark, dass du aus Versehen drei Tickets gleichzeitig schließt. Effizienz durch Panik." 
            },
            { 
                t: "Wasser nachtrinken", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du spülst den Chemie-Geschmack am Wasserspender weg. Das Zucken hört auf. Du lebst noch." 
            },
            { 
                t: "Auf der Toilette verstecken", 
                m: 20, f: 10, a: 5, c: -5, 
                r: "Lieber gründlich als mutig. Du verbringst 20 Minuten in der Kachel-Abteilung. Produktivität: Null. Überlebenswille: Hoch." 
            }
        ]
    },
    {
        id: "srv_drink_2b",
        title: "Klebrige Angelegenheit",
        reqStory: "path_drink_keep",
        text: "Du greifst in deine Tasche und fasst in etwas Nasses. Die Dose 'Cyber-Fuel' hatte wohl ein mikroskopisches Leck. Alles klebt.",
        opts: [
            { 
                t: "Egal, Hauptsache Koffein", 
                rem: "energy", 
                m: 5, f: -10, a: -5, c: 5, 
                r: "Du leckst die Reste von den Fingern und trinkst den kläglichen Rest aus der Dose. Es ist würdelos, aber es wirkt." 
            },
            { 
                t: "Den Azubi um Hilfe bitten",
                rep: { "Kevin": 5 }, 
                m: 5, f: 5, a: -5, c: -5, 
                r: "'Kevin, hast du Feuchttücher?' Kevin grinst. 'Klar, Gamer-Standard-Ausrüstung.' Er hilft dir, die klebrige Tasche zu reinigen." 
            },
            {
                t: "Moment... die ist ja leer?",
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du merkst, dass es nur alte Reste waren. Du hast die Dose ja schon längst getrunken."
            },
            { 
                t: "Alles sauber machen", 
                rem: "energy", 
                m: 15, f: -5, a: 10, c: 0, 
                r: "Du fluchst und schrubbst deine Hose mit Papiertüchern ab. Die Dose ist leer, deine Laune im Keller." 
            }
        ]
    },
    {
        id: "srv_drink_2c",
		char: "Kevin",
        title: "Kevins Fund",
        reqStory: "path_drink_ignore",
        text: "Kevin kommt mit weit aufgerissenen Augen aus dem Serverraum. Er hält die Dose in der Hand. 'Boah! Vintage Cyber-Fuel von 2012! Sammlerstück!'",
        opts: [
            { 
                t: "Ihm sagen, dass er es nicht trinken soll", 
                rep: { "Kevin": 5 },
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Zu spät!' Kevin ext die Dose. Er fängt an, Farben zu riechen. Du hast es versucht." 
            },
            { 
                t: "Ihm viel Spaß wünschen",
                rep: { "Kevin": -5 }, 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Darwin regelt das, entscheidest du, und gehst Kaffee holen. Aus der Küche hörst du kurz darauf ein triumphierendes 'WOAH, KRASS'. Das System arbeitet." 
            },
            { 
                t: "Ihm um den Pfand beneiden", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "25 Cent Pfand, seit 2012 unangetastet. Kevin bekommt das Sammlerstück UND das Kleingeld. In dieser Verteilung steckt eine Lehre über das Leben, aber du weigerst dich, sie zu suchen." 
            }
        ]
    },
    {
        id: "srv_extinguisher_1",
        title: "Sicherheits-Check",
        text: "Hinter einem vergilbten CRT-Monitor findest du einen Feuerlöscher. Er ist staubig. Laut Plakette war die letzte Prüfung 1998.",
        opts: [
            { 
                t: "Einstecken", 
                loot: "fire_ext", 
                next: "path_ext_loot", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Du wuchtest das schwere Ding in dein Inventar. Man weiß nie, wann man ein Feuer löschen (oder eine Tür einschlagen) muss." 
            },
            { 
                t: "Kurzer Funktionstest", 
                next: "path_ext_trap", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du drückst den Hebel nur ganz kurz. Ein Zischen... und dann klemmt das Ventil. PFFFFFFT!" 
            },
            { 
                t: "Vollständiges DIN-Audit durchführen", 
                next: "path_ext_audit", 
                m: 60, f: -30, a: 10, c: -20, 
                r: "Du holst Putzzeug, eine Lupe und das Prüfprotokoll. Du verbringst eine Stunde damit, Roststellen zu dokumentieren. Vorbildlich!" 
            }
        ]
    },
    {
        id: "srv_extinguisher_2a",
		char: "Egon",
        title: "Schwertransport",
        reqStory: "path_ext_loot",
        text: "Du schleppst den Feuerlöscher durch den Gang. Er wiegt gefühlt 20 Kilo und schlägt dir ständig gegen das Schienbein. Egon der Hausmeister sieht dich kritisch an.",
        opts: [
            { 
                t: "Ihn als Türstopper benutzen", 
                rep: { "Egon": -2 },
                rem: "fire_ext", 
                m: 5, f: 10, a: -5, c: 5, 
                r: "Du hast keine Lust mehr zu schleppen. Du stellst ihn vor die Serverraum-Tür. Jetzt bleibt sie offen und es wird kühler." 
            },
            { 
                t: "Bizeps-Curls mit dem Feuerlöscher machen", 
                rep: { "Egon": -5 },
                m: 20, f: -10, a: -20, c: 10, 
                r: "Du nutzt das Gewicht für ein spontanes Workout im Gang. Deine Arme brennen, dein Puls wird mit jeder Wiederholung ruhiger. Egon schüttelt nur den Kopf." 
            },
            { 
                t: "Sagen, dass du ihn zur Wartung bringst",
                rep: { "Egon": 5 }, 
                m: 10, f: -5, a: 5, c: -5, 
                r: "Egon nickt anerkennend. 'Guter Mann. Sicherheit ist kein Spielzeug.' Er lässt dich passieren." 
            }
        ]
    },
    {
        id: "srv_extinguisher_2b",
        title: "Winter Wonderland",
        reqStory: "path_ext_trap",
        text: "Der 'kurze Test' von vorhin ist eskaliert. Der halbe Serverraum ist mit weißem Löschpulver bedeckt. Es sieht aus wie in 'Scarface', nur staubiger. Der Lüfter verteilt es überall hin.",
        opts: [
            { 
                t: "Alles selbst putzen", 
                m: 120, f: -50, a: 30, c: -10, 
                r: "Du kriechst zwei Stunden lang mit einem Lappen durch den Raum. Die Arme zittern, die Laune ist im Keller, und jede Minute davon ist ehrliche, unbezahlte Demut." 
            },
            { 
                t: "Flüchten und Tür abschließen", 
                m: 5, f: 10, a: -5, c: 30, 
                r: "Du rennst raus. 'Keine Ahnung, das muss eine Fehlfunktion der Anlage sein!' Hoffentlich glaubt man dir." 
            },
            { 
                t: "Es als Kunst-Installation verkaufen", 
                m: 15, f: 5, a: 0, c: 15, 
                r: "Du klebst ein Schild 'VERGÄNGLICHKEIT' an das Rack. Der Chef kommt vorbei: 'Interessant. Aber machen Sie es weg.' Zeit verschwendet." 
            }
        ]
    },
    {
        id: "srv_extinguisher_2c",
		char: "Dr. Wichtig",
        title: "Der Bürokrat",
        reqStory: "path_ext_audit",
        text: "Nach deinem einstündigen Audit kommt Dr. Wichtig vorbei. Er sieht deine Checklisten und Tabellen neben dem Feuerlöscher. Er wirkt überrascht.",
        opts: [
            { 
                t: "Überstunden dafür beantragen", 
				rep: { "Dr. Wichtig": -10 },
                m: 10, f: 0, a: 10, c: 20, 
                r: "'Überstunden? Fürs Staubwischen? Träumen Sie weiter.' Der positive Effekt ist verpufft." 
            },
            { 
                t: "Ihn bitten, das Protokoll zu signieren", 
				rep: { "Dr. Wichtig": -5 },
                m: 30, f: -10, a: 5, c: 0, 
                r: "Du zwingst ihn in eine 30-minütige Diskussion über Brandschutzverordnungen. Er unterschreibt, nur damit du aufhörst zu reden." 
            },
            { 
                t: "Bericht stolz präsentieren", 
				rep: { "Dr. Wichtig": 10 },
                m: 15, f: -5, a: -5, c: -15, 
                r: "'Das Gerät entspricht nicht der Norm DIN-1402.' Der Chef nickt. 'Müller, ich mag Ihre Gründlichkeit. Weitermachen.'" 
            }
        ]
    },
    {
        id: "srv_manual_1",
        title: "Tragendes Wissen",
        text: "Ein dickes, vergilbtes Buch klemmt unter einem wackeligen Tischbein: 'Windows 95 - Das Handbuch'. Es trägt die Last von drei Monitoren und einem Switch.",
        opts: [
            { 
                t: "Vor Ort darin blättern", 
                next: "path_man_study", 
                m: 30, f: 10, a: -10, c: 0, 
                r: "Du hockst dich auf den Boden und liest das Kapitel über 'IRQ-Konflikte'. Eine einfachere Zeit. Du fühlst dich entspannt, aber deine Beine sind eingeschlafen." 
            },
            { 
                t: "Rausziehen und einstecken", 
                loot: "manual", 
                next: "path_man_taken", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Mit einem Ruck ziehst du es raus. Der Tisch sackt 2cm ab. Der Monitor oben drauf schwankt bedrohlich. Aber hey: Antikes Wissen!" 
            },
            { 
                t: "Liegen lassen", 
                next: "path_man_leave", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Never touch a running system. Das gilt auch für Möbel. Du lässt die Statik intakt und das Buch verstauben." 
            }
        ]
    },
    {
        id: "srv_manual_2a",
        title: "Schieflage",
        reqStory: "path_man_taken",
        text: "Der Tisch ohne das Handbuch-Bein vibriert durch die Server-Lüfter so stark, dass der teure Core-Switch langsam Richtung Abgrund rutscht. Gleich fällt er.",
        opts: [
            { 
                t: "Pappe falten und drunterschieben", 
                m: 15, f: -10, a: 5, c: 0, 
                r: "Du bastelst aus einer Pizza-Schachtel einen Ersatz-Keil. Es hält nicht ganz so gut und sieht furchtbar aus, aber du darfst das Buch behalten." 
            },
            { 
                t: "Switch mit Tape festkleben", 
                req: "tape", 
                m: 5, f: 5, a: 0, c: -5, 
                r: "Wenn es sich bewegt und es sich nicht bewegen soll: Panzertape. Du klebst den Switch einfach an den Tisch. Problem gelöst." 
            },
            { 
                t: "Handbuch wieder drunterschieben", 
                rem: "manual", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du opferst das Wissen für die Sicherheit. Der Tisch steht wieder stabil. Dein Inventar ist leerer, dein Gewissen reiner." 
            }
        ]
    },
    {
        id: "srv_manual_2b",
        title: "5S-Audit",
        reqStory: "path_man_leave",
        text: "Ein 'Lean-Management-Berater' kriecht durch den Serverraum. Er zeigt auf das Handbuch unter dem Tischbein. 'Das ist kein definierter Lagerplatz für Dokumentation. Das muss weg.'",
        opts: [
            { 
                t: "Ihm erlauben, es zu entfernen", 
                m: 5, f: 10, a: 0, c: 0, 
                r: "Er zieht es triumphierend raus. Der Tisch kippt. Der Monitor fällt ihm auf den Fuß. Du lachst innerlich. Das Audit ist beendet." 
            },
            { 
                t: "Ihn ignorieren", 
                m: 2, f: 5, a: 5, c: 10, 
                r: "Er schreibt 'Mangelhafte Ordnung' in seinen Bericht. Das gibt Ärger, aber wenigstens hast du nicht mit ihm geredet." 
            },
            { 
                t: "Erklären, dass es ein Lastverteiler ist", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Du schwafelst was von 'Schwingungsdämpfung nach DIN-Norm'. Der Berater macht sich Notizen. 'Kreative Lösung.' Er klebt einen 'Geprüft'-Aufkleber auf das Buch." 
            }
        ]
    },
    {
        id: "srv_manual_2c",
		char: "Dr. Wichtig",
        title: "Legacy-Support",
        reqStory: "path_man_study",
        text: "Der Chef schaut vorbei. 'Müller! Wir haben noch einen 486er im Keller, der die Türsteuerung regelt. Er verlangt eine IRQ-Zuweisung für die Soundkarte. Wissen Sie zufällig, was das ist?'",
        opts: [
            { 
                t: "'Kaufen Sie einfach was Neues.'", 
				rep: { "Dr. Wichtig": -5 },
                m: 5, f: 0, a: 5, c: 10, 
                r: "'Kein Budget!', blafft er zurück. Chance vertan, zu glänzen." 
            },
            { 
                t: "Sofort die Lösung nennen", 
				rep: { "Dr. Wichtig": 10 },
                m: 5, f: -5, a: -10, c: -20, 
                r: "'IRQ 5, DMA 1, Adresse 220.' Du hast es gerade gelesen. Der Chef schaut dich an, als hätte er versehentlich einen Propheten eingestellt. 'Müller, Sie sind ein Genie.' Von diesem Moment wirst du noch Monate zehren." 
            },
            { 
                t: "So tun, als müsstest du recherchieren", 
				rep: { "Dr. Wichtig": 5 },
                m: 60, f: 20, a: 0, c: 0, 
                r: "Du weißt es zwar, aber du sagst: 'Das ist hochkomplex. Dauert 2 Stunden.' Du gehst entspannt Kaffee trinken. Der Chef wartet ehrfürchtig." 
            }
        ]
    },
    {
        id: "srv_rat_1",
        title: "Das seltsame Geräusch",
        text: "Aus Rack 4 kommt ein kratzendes Geräusch. Es klingt nicht wie ein Lüfter. Eher wie... scharfe Zähne auf teurem Glasfaserkabel. Etwas Lebendiges nistet sich in der Firewall ein.",
        opts: [
            { 
                t: "Donut als Köder", 
                req: "donut", 
                next: "path_rat_feed", 
                m: 10, f: 5, a: -10, c: 0, 
                r: "Du brichst ein Stück ab und legst es vor den Kabelschacht. Ein Schatten huscht heraus, schnappt den Köder und verschwindet lautlos. Ruhe." 
            },
            { 
                t: "Kammerjäger rufen", 
                next: "path_rat_call", 
                m: 15, f: 5, a: 0, c: 5, 
                r: "Du erstellst ein Ticket beim Gebäudemanagement. Priorität: Hoch. Status: 'In Bearbeitung'. Du hast deine Pflicht getan und gehst." 
            },
            { 
                t: "Dagegen treten", 
                next: "path_rat_kick", 
                m: 5, f: 0, a: 10, c: 5, 
                r: "BAM! Du trittst fest gegen das Blech. Es quiekt panisch, dann ist absolute Stille. Du wartest kurz... nichts mehr. Problem pragmatisch gelöst." 
            }
        ]
    },
    {
        id: "srv_rat_2a",
        title: "Kollateralschaden",
        reqStory: "path_rat_kick",
        text: "Dein Monitoring-Dashboard leuchtet rot wie ein Weihnachtsbaum. Der Uplink in Rack 4 ist tot. Offenbar hat dein Tritt vorhin nicht nur die Ratte vertrieben, sondern auch etwas gelöst.",
        opts: [
            { 
                t: "Flicken mit Tape", 
                req: "tape", 
                m: 10, f: 0, a: 5, c: 5, 
                r: "Du fummelst die Adern zusammen und isolierst sie. 'Temporary Fix' nennst du das. Halten wird es. Eine Weile. Vermutlich." 
            },
            { 
                t: "Es auf 'Sonnenwinde' schieben", 
                m: 2, f: 10, a: -5, c: 20, 
                r: "Du schickst eine Rundmail: 'Atmosphärische Störungen'. Die Leute glauben alles, solange es technisch klingt. Du machst nichts." 
            },
            { 
                t: "Kabel tauschen", 
                req: "cable", 
                m: 15, f: -5, a: -5, c: -10, 
                r: "Du findest das durchtrente Kabel (Bissspuren oder Riss?). Egal. Du steckst ein neues Patchkabel. Link ist da. Niemand hat was gesehen." 
            }
        ]
    },
    {
        id: "srv_rat_2b",
        title: "Ein neuer Freund",
        reqStory: "path_rat_feed",
        text: "Du gehst nochmal an Rack 4 vorbei. Da sitzt sie wieder. Die Ratte, die du gefüttert hast. Sie wirkt satt und entspannt. Sie hat sogar eine tote Kakerlake für dich 'gefangen'.",
        opts: [
            { 
                t: "Als 'Junior Admin' behalten", 
                m: 5, f: 10, a: -10, c: 0, 
                r: "Du nennst sie 'Splinter'. Sie wohnt jetzt hinter dem Patchpanel. Das effektivste Anti-Bug-System der Firma." 
            },
            { 
                t: "Hausmeister rufen",
                rep: { "Egon": 2 }, 
                m: 10, f: 0, a: 0, c: 0, 
                r: "Doch lieber keine Haustiere. Egon kommt und kümmert sich 'diskret' darum. Du guckst weg." 
            }
        ]
    },
    {
        id: "srv_rat_2c",
        title: "Ticket geschlossen",
        reqStory: "path_rat_call",
        text: "Eine E-Mail ploppt auf: 'Ticket #492 (Nagetier) geschlossen. Grund: Kein Zugangsschlüssel.' Zeitgleich fällt das Internet aus. Die Ratte hatte viel Zeit zum Kauen.",
        opts: [
            { 
                t: "Den Provider beschuldigen", 
                m: 5, f: 5, a: -5, c: 15, 
                r: "'Telekom-Bagger hat Leitung gekappt.' Der Klassiker. Alle nicken verständnisvoll und gehen früher heim. Du bist fein raus." 
            },
            { 
                t: "Panik-Reparatur", 
				rep: { "Dr. Wichtig": -2 },
                m: 30, f: -20, a: 20, c: -10, 
                r: "Du musst den ganzen Kabelstrang neu verlegen, während der Chef dir im Nacken atmet. Hättest du es mal gleich selbst gemacht." 
            }
        ]
    },
    {
        id: "srv_cold_1",
        title: "Die Kälte-Falle",
        text: "Jemand hat die Klimaanlage auf 16 Grad gestellt und den Türgriff von innen abgebrochen. Du bist eingesperrt und frierst!",
        opts: [
            { 
                t: "An den Servern wärmen", 
                m: 90, f: 20, a: 10, c: 0, 
                r: "Du hast dich hinter die Abluft der CPU gekuschelt und geschlafen, bis zufällig jemand die Tür von außen geöffnet hat. Gemütlich." 
            },
            { 
                t: "Mit Hammer Tür einschlagen", 
                req: "hammer",
                next: "path_cold_break", 
                m: 15, f: -5, a: -10, c: 20, 
                r: "BÄM! Tür offen. Du fühlst dich wie Thor. Holzsplitter liegen überall. Der Chef wird Fragen zum Türblatt haben, aber du bist frei." 
            },
            { 
                t: "Handy nutzen & Hilfe rufen", 
                next: "path_cold_call", 
                m: 60, f: 0, a: 20, c: -10, 
                r: "Du musstest den Hausmeister anrufen. Er hat 45 Minuten gebraucht, um den Ersatzschlüssel zu finden. Du bist jetzt ein Eisblock." 
            }
        ]
    },
    {
        id: "srv_cold_2a",
        title: "Der Schreiner",
        reqStory: "path_cold_break",
        text: "Ein externer Schreiner steht kopfschüttelnd vor der Serverraum-Tür, die heute Morgen 'jemand' (du) mit Gewalt geöffnet hat. Er flucht über die Splitter.",
        opts: [
            { 
                t: "Helfen, die Späne aufzufegen", 
                m: 15, f: -5, a: 5, c: 0, 
                r: "Das schlechte Gewissen plagt dich. Du hilfst ihm beim Aufräumen. Er brummt: 'Wenigstens einer, der anpackt.'" 
            },
            { 
                t: "Ihm Panzertape anbieten", 
                req: "tape", 
                m: 5, f: 5, a: 0, c: -5, 
                r: "'Damit kriegen Sie das wieder hin, Meister.' Er starrt dich böse an. 'Das ist Echtholzfurnier, kein Karton!' Er lehnt dankend ab." 
            },
            { 
                t: "Behaupten, es war die Feuerwehr", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "'Gefahr im Verzug, wissen Sie.' Der Schreiner nickt verständnisvoll. 'Ach so. Ja, die Jungs sind grob.' Dein Geheimnis ist sicher." 
            }
        ]
    },
    {
        id: "srv_cold_2b",
		char: "Egon",
        title: "Schloss-Austausch",
        reqStory: "path_cold_call",
        text: "Egon, der Hausmeister, kniet vor der Serverraum-Tür und montiert ein neues Schloss. Er sieht dich kommen. 'Na, wieder aufgetaut? Ich bau jetzt eins ein, das man auch von innen aufkriegt.'",
        opts: [
            { 
                t: "Fachsimpeln", 
                rep: { "Egon": -5 },
                m: 5, f: 5, a: 5, c: -5, 
                r: "'Ist das auch ein Zylinder nach DIN 18252?' Egon verdreht die Augen. 'Lass mich einfach arbeiten.' Du nervst ihn." 
            },
            { 
                t: "Schnell vorbei schleichen", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Bloß kein Augenkontakt. Die Peinlichkeit von vorhin sitzt noch tief. Du huschst in den Serverraum." 
            },
            { 
                t: "Ihm einen Kaffee bringen",
                rep: { "Egon": 10 }, 
                m: 10, f: 0, a: -5, c: 5, 
                r: "Du holst ihm einen Automatenkaffee. 'Danke Jung.' Er wirkt versöhnt. Kleine Geschenke erhalten die Freundschaft (und schnelle Rettung)." 
            }
        ]
    },
    {
        id: "srv_red_1",
        title: "Die rote Flüssigkeit",
        text: "Unter Rack 7 bildet sich eine Pfütze. Sie ist tiefrot und klebrig. Es riecht süßlich. Ist das... Blut? Hydrauliköl? Oder Sirup? Über dir verläuft eigentlich keine Leitung.",
        opts: [
            { 
                t: "Einfach aufwischen & ignorieren", 
                m: 15, f: 10, a: 0, c: -5, 
                r: "Du wischst die Pfütze mit Taschentüchern weg. Was man nicht weiß, macht einen nicht heiß. Der Boden klebt zwar noch etwas, aber es sieht sauber aus." 
            },
            { 
                t: "Todesmutig den Finger reinstecken & probieren", 
                next: "path_red_taste", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Es ist... Kirsch-Slushie?! Jemand hat hier eine illegale Slushie-Maschine versteckt. Du zapfst dir heimlich einen Becher ab und gehst zufrieden weiter." 
            },
            { 
                t: "Panisch den Großalarm auslösen", 
                next: "path_red_alarm", 
                m: 10, f: -5, a: 10, c: 5, 
                r: "Du drückst den Notfallknopf. Sirenen heulen los. 'BIOHAZARD!' Du rennst raus und lässt die Feuerwehr den Rest machen. Erstmal Sicherheit." 
            }
        ]
    },
    {
        id: "srv_red_2a",
        title: "Das große Krabbeln",
        reqStory: "path_red_taste",
        text: "Du hörst ein Knistern aus Rack 7, wo du vorhin den Slushie gefunden hast. Tausende Ameisen wurden von den klebrigen Resten angelockt und bauen ein Nest im 10.000€ Switch.",
        opts: [
            { 
                t: "Alles ausbauen & einzeln reinigen", 
                m: 60, f: -25, a: 15, c: -5, 
                r: "Eine Stunde lang pinselst du tote Ameisen von Platinen. Es ist eklig, aber du rettest die Hardware. Niemand erfährt von dem Vorfall. Saubere Arbeit." 
            },
            { 
                t: "Den Azubi Kevin rufen", 
                rep: { "Kevin": -10, "Dr. Wichtig": -10 },
                m: 10, f: 10, a: -15, c: 20, 
                r: "Kevin sieht die Ameisen und schreit. Der Chef kommt dazu. Du bekommst einen Einlauf wegen 'mangelnder Aufsicht', aber Kevin muss putzen." 
            },
            { 
                t: "Zum Insektenspray greifen", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Du sprühst, bis der Nebel steht. Die Ameisen sind tot. Der Lüfter des Switches verklebt zwar etwas, aber es läuft noch. Du verschwindest, bevor jemand nach dem Geruch fragt." 
            }
        ]
    },
    {
        id: "srv_red_2b",
		char: "Dr. Wichtig",
        title: "Manöverkritik",
        reqStory: "path_red_alarm",
        text: "Der Chef zitiert dich ins Büro. Der 'biologische Gefahrstoff', wegen dem die Feuerwehr kam, war nur ausgelaufene Kühlflüssigkeit mit Farbstoff. Er sieht nicht glücklich aus.",
        opts: [
            { 
                t: "Bestechungs-Donut anbieten", 
                rem: "donut",
				rep: { "Dr. Wichtig": 5 },
                m: 2, f: 5, a: -5, c: 5, 
                r: "Du schiebst ihm den Donut hin. 'Nervennahrung?' Er beißt rein, kaut und grummelt: 'Verschwinden Sie an die Arbeit.' Bestechung funktioniert immer." 
            },
            { 
                t: "Auf Sicherheitsprotokolle pochen", 
				rep: { "Dr. Wichtig": -5 },
                m: 10, f: 0, a: -5, c: 10, 
                r: "'Vorsicht ist besser als Nachsicht, Chef!' Er massiert sich die Schläfen. 'Ja, schon... aber nächstes Mal erst riechen, dann drücken.' Du kommst davon." 
            },
            { 
                t: "Kleinlaut entschuldigen", 
				rep: { "Dr. Wichtig": 2 },
                m: 5, f: 0, a: 5, c: -10, 
                r: "'Es tut mir leid.' Der Chef seufzt. 'Der Einsatz kostet uns 500 Euro. Das geht von Ihrem Budget für Weihnachtsdeko ab.' Autsch." 
            }
        ]
    },
    {
        id: "srv_illegal_1",
        title: "Das illegale Datencenter",
        text: "Du lehnst dich gegen ein Regal und plötzlich schwingt eine falsche Wand auf. Dahinter: Ein versteckter Serverraum! Auf den Bildschirmen flackern... nun ja, sehr 'eindeutige' Erwachsenenfilme. Die Admin-Konsole ist eingeloggt: Es gehört dem Vize-Chef.",
        opts: [
            { 
                t: "Klappe halten & Hardware mitnutzen", 
                next: "path_illegal_share", 
                m: 5, f: 20, a: -10, c: 20, 
                r: "Du installierst heimlich deinen privaten Minecraft-Server und einen Bitcoin-Miner auf der Hardware. Gratis Strom, High-Speed-Leitung und der Vize-Chef kann dich schlecht verpfeifen." 
            },
            { 
                t: "Beweise sichern & Vize-Chef erpressen", 
                req: "secret_list",
                next: "path_illegal_blackmail", 
                m: 10, f: 30, a: 0, c: -30, 
                r: "Du machst Fotos und wedelst mit der Schwarzen Liste aus deiner Tasche. 'Ich weiß alles.' Das ist der Jackpot. Du schließt die Tür leise wieder." 
            },
            { 
                t: "Sofort den Stecker ziehen", 
                next: "path_illegal_shutdown", 
                m: 20, f: -10, a: 10, c: 50, 
                r: "Du zögerst nicht. KLACK. Die Sicherung fliegt raus. Die Bildschirme werden schwarz. Die Lüfter sterben ab. Totale Stille im Raum." 
            }
        ]
    },
    {
        id: "srv_illegal_2a",
        title: "Das Beraterhonorar",
        reqStory: "path_illegal_blackmail",
        text: "Der Vize-Chef fängt dich am Kaffeeautomaten ab. Er schwitzt stark. 'Müller... wegen der... Sache im Serverraum. Geben Sie mir die Liste, und wir werden uns einig.'",
        opts: [
            { 
                t: "Geld verlangen", 
                rem: "secret_list",
                m: 5, f: 10, a: -20, c: -20, 
                r: "Er reißt dir die Liste aus der Hand und steckt dir einen dicken Umschlag zu. 'Spesenabrechnung. Monatlich. Schweigen wir nie wieder darüber.' Du bist jetzt offiziell korrupt." 
            },
            { 
                t: "Home-Office fordern", 
                rem: "secret_list",
                m: 5, f: 20, a: -15, c: -10, 
                r: "'Drei Tage die Woche?' Er nickt hastig, greift sich die Liste und schreddert sie sofort. 'Genehmigt. Ab sofort.' Er wirkt erleichtert. Du auch." 
            },
            { 
                t: "Ihn zappeln lassen", 
                m: 2, f: 5, a: -5, c: 10, 
                r: "Du tippst dir nur an die Brusttasche, wo die Liste steckt, und zwinkerst. Die pure Panik in seinen Augen ist unbezahlbar. Er wird dir ab jetzt jeden Wunsch erfüllen." 
            }
        ]
    },
    {
        id: "srv_illegal_2b",
        title: "Der Wutanfall",
        reqStory: "path_illegal_shutdown",
        text: "Es dauert eine Weile, bis es jemandem auffällt. Dann aber stürmt der Vize-Chef hochrot in den Serverraum. 'WER WAR DAS?! Mein... äh... kritisches Backup-System ist offline! Wissen Sie, wie viel Traffic wir verlieren?!'",
        opts: [
            { 
                t: "Ahnungslosigkeit heucheln", 
                m: 5, f: 5, a: 5, c: 5, 
                r: "'Stromschwankung, Chef. Die Leitungen sind alt.' Er tobt, kann aber nichts beweisen. Er traut sich nicht, den Server wieder einzuschalten, solange du da bist." 
            },
            { 
                t: "'Es war ein Sicherheitsrisiko.'", 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Du starrst ihm direkt in die Augen. 'Zu viele offene Ports. Ich habe die Firma geschützt.' Er versteht die Drohung, schluckt schwer und geht wortlos." 
            },
            { 
                t: "Ihn auslachen", 
                m: 2, f: 5, a: -10, c: 10, 
                r: "Du kannst es dir nicht verkneifen. 'Kritisches Backup? Sah eher aus wie Backside-Sluts 9.' Er wird bleich und rennt raus. Das gibt Krieg." 
            }
        ]
    },
    {
        id: "srv_illegal_2c",
        title: "Bandbreiten-Krieg",
        reqStory: "path_illegal_share",
        text: "Du merkst, dass dein Bitcoin-Miner langsamer wird. Der Vize-Chef streamt wohl gerade wieder 4K-Inhalte auf dem versteckten Server. Die Lüfter heulen wie Düsentriebwerke.",
        opts: [
            { 
                t: "Alles übertakten", 
                m: 5, f: -5, a: 10, c: -10, 
                r: "Du drehst die Spannung hoch. Es riecht verschmort, aber beide Prozesse laufen flüssig. Hoffentlich brennt das Gebäude nicht ab." 
            },
            { 
                t: "Seine Prozesse drosseln", 
                m: 10, f: -10, a: -15, c: 10,
                r: "Du priorisierst deinen Traffic im Router per QoS. Sein Stream buffert jetzt alle 3 Sekunden. Irgendwo im Büro hörst du einen frustrierten Schrei. Herrlich." 
            },
            { 
                t: "Waffenstillstand per Chat", 
                m: 5, f: 5, a: -5, c: -5, 
                r: "Du öffnest `notepad.exe` auf dem Server und schreibst: '50/50 Ressourcenteilung?'. Er antwortet: 'Deal. Aber lösch den Verlauf.' Ehre unter Dieben." 
            }
        ]
    },
    {
        id: "srv_raccoon_1",
        title: "Der maskierte Bandit",
        text: "Die Tür steht offen. Ein fetter Waschbär sitzt auf dem Haupt-Switch und nagt genüsslich an einem gelben Glasfaserkabel. Er sieht dich an, faucht und macht keine Anstalten zu gehen.",
        opts: [
            { 
                t: "Den Donut als Bestechung opfern", 
                rem: "donut",
                next: "path_raccoon_bribe", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du wirfst den Donut in den Flur. Der Waschbär riecht das Fett, lässt das Kabel los und watschelt dem Gebäck hinterher. Du schließt schnell die Tür." 
            },
            { 
                t: "Tür zu, Augen zu, hoffen", 
                next: "path_raccoon_ignore", 
                m: 2, f: 20, a: 0, c: 5, 
                r: "Du ziehst die Tür leise zu und schließt ab. 'Nicht mein Problem. Soll sich die Nachtschicht drum kümmern.' Du gehst pfeifend weg." 
            },
            { 
                t: "Mit dem Hammer Dominanz zeigen", 
                req: "hammer",
                next: "path_raccoon_fight", 
                m: 10, f: -10, a: 20, c: 10, 
                r: "Du holst zum Schlag aus! 'Verschwinde, du Müllpanda!' Der Waschbär macht einen Matrix-Dodge. KLONG. Dein Hammer trifft mit voller Wucht das Rack. Der Waschbär flieht lachend." 
            }
        ]
    },
    {
        id: "srv_raccoon_2a",
        title: "Inventur-Schaden",
        reqStory: "path_raccoon_fight",
        text: "Der IT-Leiter steht vor Rack 2. Da ist eine riesige Delle im Metall, genau auf Höhe eines Hammers. Er sieht dich fragend an. 'Sagen Sie mal... haben wir hier Poltergeister?'",
        opts: [
            { 
                t: "'Das war der Waschbär!'", 
                m: 5, f: 0, a: 5, c: 10, 
                r: "'Ein Waschbär mit übermenschlichen Kräften!' Der Leiter schüttelt den Kopf. 'Müller, nehmen Sie weniger von Ihren Medikamenten.' Er glaubt dir kein Wort." 
            },
            { 
                t: "Schaden mit Sticker überkleben", 
                m: 2, f: 5, a: -5, c: 5, 
                r: "Du klebst einen 'Intel Inside' Aufkleber über die Delle. 'Sieht aus wie neu, Chef.' Er kneift die Augen zusammen, lässt es aber durchgehen." 
            },
            { 
                t: "Beichten und ausbeulen", 
                req: "hammer", 
                m: 30, f: -10, a: 0, c: -5, 
                r: "Du erklärst den Kampf. Dann verbringst du 30 Minuten damit, das Blech von innen wieder gerade zu hämmern. Es ist laut und peinlich." 
            }
        ]
    },
    {
        id: "srv_raccoon_2b",
        title: "Der Stammkunde",
        reqStory: "path_raccoon_bribe",
        text: "Du hörst ein Kratzen an der Serverraum-Tür. Der Waschbär ist zurück. Er hat den Donut verputzt und anscheinend Freunde mitgebracht. Drei Waschbären warten auf Nachschub.",
        opts: [
            { 
                t: "Hausmeister Egon rufen", 
                m: 10, f: 5, a: -5, c: 0, 
                r: "Egon kommt. 'Ach, die sind doch niedlich!' Er füttert sie mit seinen Pausenbrot-Resten. Jetzt hast du eine Waschbären-Kolonie vor der IT. Aber sie lassen die Kabel in Ruhe." 
            },
            { 
                t: "Mit dem Feuerlöscher verscheuchen", 
                req: "fire_ext", 
                m: 5, f: -5, a: 10, c: 5, 
                r: "PFFFFT! Eine CO2-Wolke beendet die Party. Die Biester rennen weg, aber der Flur sieht aus wie Winterberg. Du musst fegen." 
            }
        ]
    },
    {
        id: "srv_raccoon_2c",
        title: "Bio-Hazard",
        reqStory: "path_raccoon_ignore",
        text: "Das Monitoring meldet 'Temperature Critical'. Du öffnest die Serverraum-Tür. Es stinkt bestialisch. Der eingesperrte Waschbär hat vor Angst auf den Lüfter des Mainframes gekackt. Die Scheiße wurde im ganzen Raum verteilt.",
        opts: [
            { 
                t: "Azubi zum Putzen zwingen",
                rep: { "Kevin": -20 }, 
                m: 5, f: 10, a: -5, c: 10, 
                r: "Kevin muss im Schutzanzug rein. Er weint dabei. Du stehst draußen und gibst Anweisungen. Dein Karma sinkt ins Bodenlose, aber deine Hände bleiben sauber." 
            },
            { 
                t: "Selbst putzen - Strafe muss sein",
                m: 120, f: -50, a: 20, c: -10, 
                r: "Zwei Stunden. Zahnbürste. Desinfektionsmittel. Du hinterfragst jede Lebensentscheidung, die dich hierher geführt hat." 
            },
            { 
                t: "Raum versiegeln & Homeoffice beantragen",
                rep: { "Dr. Wichtig": -10 },
                m: 5, f: 20, a: 0, c: 20, 
                r: "'Gesundheitsrisiko! Niemand darf rein!' Du flüchtest. Das Problem wird morgen eskalieren, aber heute bist du frei." 
            }
        ]
    },
    {
        id: "srv_floppy_1",
        title: "Flaschenpost aus der Vergangenheit",
        text: "Du findest eine 3,5-Zoll Diskette mit der Aufschrift 'NOTFALLPLAN 1999'. Ein Zettel klebt daran: 'Wenn alles brennt, drück diesen Knopf.' Daneben ist ein roter, verstaubter Pilz-Taster an der Wand.",
        opts: [
            { 
                t: "Den Knopf einfach drücken", 
                next: "path_floppy_button", 
                m: 5, f: 10, a: -20, c: 100, 
                r: "KLICK. Ein Zischen. Die alte Halon-Löschanlage löst aus! Der Sauerstoff wird aus dem Raum gesaugt. Du hältst die Luft an und stolperst raus. Das wird teuer." 
            },
            { 
                t: "Diskette lesen", 
                req: "manual",
                next: "path_floppy_read", 
                m: 30, f: -5, a: 0, c: -10, 
                r: "Dank des Handbuchs kannst du die uralten Treiber laden. Das Laufwerk rattert wie eine Kaffeemühle, aber du bekommst Zugriff auf die Daten." 
            },
            { 
                t: "Ignorieren", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du lässt den roten Knopf rot sein. Manche Dinge fasst man besser nicht an. Weiter im Rundgang." 
            }
        ]
    },
    {
        id: "srv_floppy_2a",
        title: "Rechnung vom Amt",
        reqStory: "path_floppy_button",
        text: "Draußen heulen Sirenen. Der Löschzug ist da, weil die Sensoren 'Sauerstoffverlust' gemeldet haben. Der Einsatzleiter sieht dich streng an. 'Wer hat ausgelöst?'",
        opts: [
            { 
                t: "Auf technischen Defekt plädieren", 
                m: 15, f: 0, a: 5, c: 10, 
                r: "'Diese alten Anlagen... tickende Zeitbomben!' Der Feuerwehrmann nickt. 'Ja, Halon ist seit 20 Jahren verboten. Das muss eh raus.' Du kommst mit einer Verwarnung davon." 
            },
            { 
                t: "Wegrennen", 
                m: 5, f: 10, a: -5, c: 20, 
                r: "Du nutzt das Chaos und verschwindest. Die Rechnung über 3.000€ Einsatzkosten landet pauschal bei der IT-Abteilung. Dein Budget weint." 
            },
            { 
                t: "Nebelmaschine als Ausrede nutzen", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "'Wir testen nur Bühneneffekte für die Weihnachtsfeier!' Der Feuerwehrmann ist verwirrt, packt zusammen und geht. Dreistigkeit siegt." 
            }
        ]
    },
    {
        id: "srv_floppy_2b",
        title: "Der Y2K-Patch",
        reqStory: "path_floppy_read",
        text: "Du durchsuchst die Dateien auf der Diskette. Es sind keine Highscores. Es ist eine Datei namens 'Y2K_FIX_FINAL.BAT'. Ein Skript, das das Jahr 2000 verhindern sollte.",
        opts: [
            { 
                t: "Diskette formatieren", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du löschst alles und speicherst deine eigenen Urlaubsbilder drauf. 1,44 MB Speicherplatz gespart. Pragmatismus pur." 
            },
            { 
                t: "Aus Neugier ausführen", 
                m: 10, f: -10, a: 10, c: 50, 
                r: "Du klickst drauf. Das Systemdatum springt auf den 01.01.1900. Alle Zertifikate werden ungültig. Die Buchhaltung crasht. Aber hey, Retro-Feeling!" 
            },
            { 
                t: "Den antiken Code studieren", 
                m: 60, f: -20, a: 0, c: -5, 
                r: "Du studierst den antiken Code. Es ist Spaghetti-Code vom Feinsten, aber du lernst einen Trick, um die Server-Logs zu manipulieren. (Skill verbessert)" 
            }
        ]
    },
    {
        id: "srv_loot_box_1",
        title: "Die offene Werkzeugkiste",
        text: "Ein externer Techniker hat seine Kiste neben Rack 3 vergessen. Sie steht offen da wie eine Schatztruhe. Du siehst nützliche Dinge, die dein IT-Herz höher schlagen lassen.",
        opts: [
            { 
                t: "Schraubendreher nehmen", 
                loot: "screw", 
                next: "path_loot_screw", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Ein hochwertiger Marken-Kreuzschlitz mit magnetischer Spitze. Der liegt gut in der Hand. Jetzt liegt er in deiner Tasche." 
            },
            { 
                t: "Stehen lassen", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du widerstehst der Versuchung. Du hast schon genug Zeug auf dem Schreibtisch." 
            },
            { 
                t: "Kabelbinder einstecken", 
                loot: "zip_ties", 
                next: "path_loot_zip", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Eine 100er Packung schwarze Kabelbinder. Gold wert für das Kabelmanagement zuhause! Schnell in die Tasche damit." 
            }
        ]
    },
    {
        id: "srv_loot_box_2a",
        title: "Die Rückkehr",
        reqStory: "path_loot_zip",
        text: "Der Techniker kommt angerannt. Er schwitzt und wirkt extrem gestresst. 'Verdammt, wo ist die Packung Kabelbinder hin? Beim nächsten Kunden bin ich schon zu spät!' Er sieht dich an.",
        opts: [
            { 
                t: "Kevin beschuldigen",
                rep: { "Kevin": -10 }, 
                m: 2, f: 5, a: -5, c: -10, 
                r: "'Ich glaube, der Azubi hat vorhin aufgeräumt...' Der Techniker schüttelt den Kopf. 'Keine Zeit für Diskussionen.' Er haut ab. Du hast die Beute noch." 
            },
            { 
                t: "'Ich habe nichts gesehen.'", 
                m: 2, f: 0, a: 5, c: -5, 
                r: "Du hebst entschuldigend die Hände. 'Vielleicht hat die Putzkolonne aufgeräumt?' Er flucht, packt seine Kiste und rennt los. Dein Gewissen zwickt kurz." 
            },
            { 
                t: "Die Kabelbinder 'gefunden haben' und zurückgeben", 
                rem: "zip_ties",
                m: 5, f: 0, a: -5, c: 10, 
                r: "'Oh, die lagen hier am Boden. Wollte sie gerade sicherstellen.' Er atmet auf. 'Danke Mann! Du rettest mir den Arsch.' Er ist weg." 
            }
        ]
    },
    {
        id: "srv_loot_box_2b",
        title: "Das fehlende Werkzeug",
        reqStory: "path_loot_screw",
        text: "Der Techniker wühlt hektisch in seiner Kiste. 'Mein Wera-Kreuzschlitz! Der Gute! Haben Sie den gesehen? Ohne den bekomme ich das Rack beim Kunden nicht auf!' Er ist der Verzweiflung nahe.",
        opts: [
            { 
                t: "Unschuldig pfeifen", 
                m: 2, f: 0, a: 5, c: -5, 
                r: "'Nö. War der wichtig?' Er rauft sich die Haare. 'Verdammt!' Er rennt fluchend raus. Du hast jetzt ein tolles Werkzeug und ein schlechtes Karma." 
            },
            { 
                t: "Zurückgeben", 
                rem: "screw",
                m: 5, f: 0, a: -5, c: 10, 
                r: "Du ziehst ihn aus der Tasche. 'Habe ich mir nur geliehen.' Er reißt ihn dir fast aus der Hand. 'Lassen Sie das! Aber danke.'" 
            },
            { 
                t: "Beim Suchen 'helfen'", 
                m: 15, f: -5, a: 0, c: -10, 
                r: "Du hilfst ihm 15 Minuten lang suchen (während er in deiner Tasche ist). 'Zwecklos', sagt er resigniert und geht. Du bist ein Monster." 
            }
        ]
    },
    {
        id: "srv_found_stuff",
        title: "Verdächtige Fundstücke",
        text: "Zwischen Rack 3 und 4 liegt Zeug herum. Es sieht so aus, als wäre jemand fluchtartig verschwunden.",
        opts: [
            { 
                t: "Den schweren Hammer nehmen", 
                loot: "hammer", 
                next: "found_hammer_2",
                m: 5, f: 5, a: 0, c: 0, 
                r: "Ein 500g Schlosserhammer. Auf dem Griff steht mit Edding 'HARD RESET'. Ein vertrauenerweckendes Werkzeug im Serverraum." 
            },
            { 
                t: "Die teuren Kopfhörer nehmen", 
                loot: "headphones", 
                next: "found_headphones_2",
                m: 5, f: 5, a: 0, c: 0, 
                r: "Bose Noise-Cancelling. Sehr schick. Sie sind noch leicht warm und riechen etwas nach Haargel. Aber hey: Gratis ist gratis." 
            }
        ]
    },
    {
        id: "srv_found_stuff_2a",
        title: "Die Audiophilen",
        reqStory: "found_headphones_2",
        text: "Du läufst mit deinen neuen Kopfhörern durch den Flur. Ein Kollege aus dem Marketing (Hipster-Bart, Mate-Tee) stoppt dich. 'Hey! Das sind doch meine Sennheiser! Ich hab die überall gesucht!'",
        opts: [
            { 
                t: "Ihm Hygiene-Angst machen", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "'Echt? Ich habe gerade eine Pilzinfektion am Ohr, deshalb trage ich die.' Er wird bleich, weicht zurück und murmelt: 'Behalt sie. Bitte. Verbrenn sie.' Sieg!" 
            },
            { 
                t: "Zurückgeben", 
                rem: "headphones",
                m: 5, f: 0, a: -5, c: 5, 
                r: "'Oh, lagen im Serverraum.' Er reißt sie dir aus der Hand, wischt sie demonstrativ an seinem Hemd ab und setzt sie auf. 'Unfassbar, diese Diebe hier.' Kein Danke." 
            },
            { 
                t: "'Die gehören mir.'", 
                m: 2, f: 0, a: 5, c: 5, 
                r: "'Das ist das Modell XP-500. Meins.' Er starrt dich misstrauisch an. 'Meine hatten einen Kratzer am Bügel...' Du gehst schnell weiter, bevor er ihn sieht." 
            }
        ]
    },
    {
        id: "srv_found_stuff_2b",
        title: "Perkussive Wartung",
        reqStory: "found_hammer_2",
        text: "Du hörst lautes Fluchen aus dem Serverraum. Ein ehemaliger Admin (in Rente) steht vor einem alten Server, der hängt. Er haut mit der flachen Hand dagegen. 'WO IST MEIN MEINUNGSVERSTÄRKER?!'",
        opts: [
            { 
                t: "Hilfe anbieten", 
                req: "hammer",
                m: 10, f: -5, a: -5, c: 5, 
                r: "'Lass mich mal.' Du gibst dem Server einen präzisen Schlag an die richtige Stelle (Netzteil). Er läuft. Der Admin nickt anerkennend. 'Gute Technik.'" 
            },
            { 
                t: "Schnell weggehen", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Bloß nicht einmischen. Hinter dir hörst du, wie er anfängt, gegen den Server zu treten. Du streichelst deinen neuen Hammer." 
            },
            { 
                t: "Hammer zurückgeben", 
                rem: "hammer",
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du reichst ihm den Hammer. Er grinst böse. 'Danke.' KLONG! Er haut einmal kräftig gegen das Gehäuse. Die Festplatte surrt wieder an. 'Geht doch.'" 
            }
        ]
    },
    {
        id: "srv_loose_rack_1",
        title: "Das Wackel-Rack",
        text: "Rack 5 vibriert bedenklich im Takt der Lüfter. Eine tragende Schraube fehlt. Wenn das kippt, domino-effektet es das ganze Rechenzentrum.",
        opts: [
            { 
                t: "Mit Kabelbindern sichern", 
                req: "zip_ties",
                next: "path_rack_zip", 
                m: 5, f: 15, a: -5, c: 5,
                r: "Zatsch. Du bindest Rack 5 einfach an Rack 4 fest. Das nennt man 'strukturelle Redundanz' (oder Pfusch). Es hält erstmal, sieht aber wild aus." 
            },
            { 
                t: "Wegsehen und pfeifen", 
                m: 2, f: 10, a: -5, c: 10,
                r: "Du drehst dich um. Wenn du es nicht siehst, ist es nicht illegal. Du hoffst einfach, dass die Physik heute Urlaub macht." 
            },
            { 
                t: "Fachgerecht festschrauben", 
                req: "screw",
                next: "path_rack_screw", 
                m: 25, f: -15, a: 5, c: -10,
                r: "Du kriechst auf dem Boden herum, richtest das Rack aus und ziehst die Schraube mit Drehmoment nach. Deutsche Wertarbeit. Das Ding bewegt sich keinen Millimeter mehr." 
            }
        ]
    },
    {
        id: "srv_loose_rack_2a",
        title: "Der Putz-Unfall",
        reqStory: "path_rack_screw",
        text: "Ein lauter KNALL! Die Putzkolonne ist mit dem schweren Bohnert-Wagen volle Kanne in Rack 5 gerammt. Dank deiner Schraube hat es standgehalten. Der Putzmann starrt schockiert auf die Beule.",
        opts: [
            { 
                t: "Ihn zur Sau machen", 
                m: 5, f: 0, a: -20, c: 5, 
                r: "Du schreist ihn 5 Minuten lang an. Das tut gut! Deine Aggression verpufft komplett. Er entschuldigt sich tausendmal." 
            },
            { 
                t: "Cool bleiben & Technik prüfen", 
				rep: { "Dr. Wichtig": 2 },
                m: 15, f: -5, a: 5, c: -15, 
                r: "'Alles gut, Meister. Das hält.' Du checkst die Logs. Keine Ausfälle. Der Chef sieht das und nickt anerkennend. 'Gute Arbeit, Müller. Robust gebaut.'" 
            },
            { 
                t: "Schadenersatz fordern", 
                m: 10, f: 5, a: 10, c: 0, 
                r: "Du verlangst 20 Euro für den Lackschaden. Er gibt sie dir zitternd. Du bist ein Arschloch, aber ein reiches Arschloch." 
            }
        ]
    },
    {
        id: "srv_loose_rack_2b",
        title: "Das große Summen",
        reqStory: "path_rack_zip",
        text: "Ein tiefes Brummen erfüllt den Raum. Deine Kabelbinder haben die Vibrationen von Rack 5 auf Rack 4 übertragen. Jetzt schwingen beide in Resonanz und erzeugen einen Höllenlärm.",
        opts: [
            { 
                t: "Alles wieder losknippsen", 
                m: 20, f: -10, a: 20, c: -5, 
                r: "Du musst deinen eigenen Pfusch beseitigen. Du fluchst, schneidest dich am Plastik und brauchst ewig. Bequemlichkeit wird am Ende immer bestraft." 
            },
            { 
                t: "Ohrstöpsel rein & ignorieren", 
                req: "headphones",
				rep: { "Dr. Wichtig": -2 },
                m: 2, f: 20, a: -10, c: 20, 
                r: "Du setzt die Noise-Cancelling-Kopfhörer auf. Endlich Watte um die Welt. Der Chef steht irgendwann im Raum und brüllt etwas, aber du hörst ihn nicht. Er sieht wütend aus." 
            },
            { 
                t: "Mehr Kabelbinder!", 
                rem: "zip_ties",
                m: 5, f: 10, a: 0, c: 10, 
                r: "Viel hilft viel. Du zurrste alles so fest, bis das Plastik weiß wird. Der Lärm wird höher, fast ein Pfeifen. Aber es wackelt weniger." 
            }
        ]
    },
    {
        id: "srv_cable_mess_1",
        title: "Der Kabel-Alptraum",
        text: "Hinter Rack 3 hängt ein Bündel Glasfaserkabel gefährlich nah am rotierenden Lüfter. Ein Windhauch, und es gibt Datensalat (im wörtlichen Sinne).",
        opts: [
            { 
                t: "Das Bündel einfach festkleben", 
                req: "tape",
                next: "path_cable_tape", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du klebst das Bündel einfach an die Seitenwand. 'Das hält schon', murmelst du. Es sieht hässlich aus, aber die Gefahr ist erst mal gebannt." 
            },
            { 
                t: "Lüftergitter rausbrechen", 
                next: "path_cable_break", 
                m: 2, f: 10, a: 10, c: 15, 
                r: "KNACK. Du reißt das Schutzgitter vor dem Lüfter raus. Jetzt ist mehr Platz für die Kabel, aber der Ventilator dreht sich jetzt offen wie ein Häcksler." 
            },
            { 
                t: "Sauber zur Seite binden", 
                req: "zip_ties",
                m: 15, f: -10, a: 0, c: -5, 
                r: "Du nimmst dir Zeit und verlegst die Kabel ordentlich im Führungsschacht. Klick, klick. Das hält für die Ewigkeit. Preußische Ordnung im Rack." 
            }
        ]
    },
    {
        id: "srv_cable_mess_2a",
        title: "Klebrige Hitze",
        reqStory: "path_cable_tape",
        text: "Der Server ist heiß gelaufen. Dein Tape-Kleber hat sich verflüssigt. Das Kabelbündel hat sich gelöst und klatscht jetzt rhythmisch gegen den Lüfter. KLACK-KLACK-KLACK.",
        opts: [
            { 
                t: "Tür zu machen", 
                m: 2, f: 10, a: -5, c: 10, 
                r: "Wenn die Tür zu ist, hört man das Klackern kaum. Problem gelöst (für dich)." 
            },
            { 
                t: "Doch noch Kabelbinder holen", 
                req: "zip_ties", 
                m: 20, f: -10, a: 5, c: 0, 
                r: "Du musst erst die Klebereste abkratzen, bevor du es ordentlich machst. Doppelte Arbeit, weil es einmal bequem sein sollte." 
            },
            { 
                t: "Einfach neues Tape drüber", 
                req: "tape", 
                m: 5, f: 5, a: 0, c: 5, 
                r: "Mehr Tape hilft mehr. Du wickelst den halben Server ein. Der Server wirkt danach einbalsamiert, aber das Geräusch ist weg." 
            }
        ]
    },
    {
        id: "srv_cable_mess_2b",
		char: "Kevin",
        title: "Der Finger-Häcksler",
        reqStory: "path_cable_break",
        text: "Ein Schrei aus dem Serverraum! Kevin wollte nur mal fühlen, wie stark der Luftzug ist. Ohne das Schutzgitter hat der Lüfter seinen Zeigefinger erwischt.",
        opts: [
            { 
                t: "Ihm sagen, er soll sich nicht anstellen", 
                rep: { "Kevin": -5 },
                m: 5, f: 5, a: 5, c: 10, 
                r: "'Das ist nur eine Fleischwunde. Das baut Charakter auf.' Du gibst ihm ein Taschentuch. Er geht schmollend." 
            },
            { 
                t: "Verbandskasten holen", 
                rep: { "Kevin": 5 },
                m: 10, f: 0, a: -5, c: 0, 
                r: "Es blutet wie Sau. Du verarztest ihn. 'Nicht dem Chef sagen!', wimmerst du. Kevin nickt unter Tränen." 
            }
        ]
    },
    {
        id: "srv_door_stuck_1",
        title: "Die klemmende Tür",
        text: "Der Kartenleser piept grün, aber der Türgriff blockiert. Die Mechanik klemmt. Drinnen blinken die Server, und du musst rein.",
        opts: [
            { 
                t: "Gezielter Schlag mit Hammer", 
                req: "hammer",
                next: "path_door_hammer", 
                m: 5, f: -5, a: -10, c: 10, 
                r: "KLONG. Ein präziser Schlag auf den Schließzylinder. Etwas knackt, dann schwingt die Tür auf. Der Griff hängt schief, aber du bist drin." 
            },
            { 
                t: "Schloss zerlegen & fetten", 
                req: "screw",
                next: "path_door_screw", 
                m: 30, f: -10, a: 5, c: 0, 
                r: "Du schraubst die Blende ab, richtest die Federn und fettest den Bolzen. Profi-Arbeit. Die Tür gleitet lautlos auf und zu." 
            },
            { 
                t: "Mit der Schulter dagegen werfen", 
                next: "path_door_force", 
                m: 10, f: 0, a: 20, c: 5, 
                r: "BAM! Deine Schulter brennt wie Feuer. Die Tür bewegt sich keinen Millimeter. Du trittst wütend dagegen und löst dabei den Sabotage-Alarm aus." 
            }
        ]
    },
    {
        id: "srv_door_stuck_2a",
        title: "Der Sicherheits-Techniker",
        reqStory: "path_door_hammer",
        text: "Ein Techniker der Sicherheitsfirma steht vor der Tür und begutachtet die Delle im Metall. Er macht Fotos für den Bericht. 'Sieht nach Vandalismus aus. Oder einem Bärenangriff.'",
        opts: [
            { 
                t: "Es auf 'Materialermüdung' schieben", 
                m: 5, f: 0, a: 5, c: 10, 
                r: "'Das Metall war wohl spröde.' Der Techniker lacht trocken. 'Klar. Und der Hammer-Abdruck ist Kunst?' Die Rechnung für den Zylinder wird teuer." 
            },
            { 
                t: "Ihn mit Kaffee ablenken", 
                m: 10, f: 5, a: -5, c: 5, 
                r: "Du lenkst ihn mit Kaffee und Smalltalk ab. Er schreibt 'Mechanischer Defekt' statt 'Mutwillige Zerstörung' in den Bericht. Glück gehabt." 
            },
            { 
                t: "Einfach gehen", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du lässt ihn arbeiten. Später findest du eine Rechnung über 'Schließsystem-Austausch (Notdienst)' auf deinem Tisch." 
            }
        ]
    },
    {
        id: "srv_door_stuck_2b",
        title: "Garantie-Verlust",
        reqStory: "path_door_screw",
        text: "Der Sicherheits-Techniker ist da, weil der 'Gehäuse-offen'-Sensor ausgelöst hat. Er prüft das Schloss. 'Moment mal... das läuft ja besser als ab Werk. Haben Sie das gefettet?'",
        opts: [
            { 
                t: "Stolz nicken", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "'Ich bin vom Fach.' Der Techniker nickt anerkennend. 'Nicht schlecht. Aber streng genommen ist die Garantie jetzt futsch. Ich drück mal ein Auge zu.'" 
            },
            { 
                t: "Unschuldig gucken", 
                m: 2, f: 0, a: 5, c: -5, 
                r: "'Keine Ahnung, war schon so.' Er zuckt mit den Schultern. 'Na, wenn es funktioniert, schreibe ich keinen Bericht.' Fall erledigt." 
            }
        ]
    },
    {
        id: "srv_door_stuck_2c",
        title: "Die Notöffnung",
        reqStory: "path_door_force",
        text: "Der Techniker kommt genervt an. Der Sabotage-Alarm heult immer noch. Du hältst dir die schmerzende Schulter. 'Haben Sie versucht, die Tür einzurennen? Das ist Stahlbeton, Sie Genie.'",
        opts: [
            { 
                t: "Ihn anschreien: 'Beeilung!'", 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Deine Schulter tut weh und du bist wütend. Er arbeitet absichtlich langsamer. 'Gutes Werkzeug braucht Weile', grinst er. Du kochst." 
            },
            { 
                t: "Den Frust mit dem Schokoriegel bekämpfen", 
                m: 5, f: 10, a: -10, c: 0, 
                r: "Du isst einen Snack, während er arbeitet. Wenigstens sinkt dein Stresslevel, während die Rechnung steigt." 
            },
            { 
                t: "Ihm beim Aufbohren zusehen", 
                m: 45, f: 20, a: 10, c: -5, 
                r: "Er braucht eine Ewigkeit, um den Riegel aufzubohren. Du stehst daneben und fühlst dich nutzlos. Die Zeit fehlt dir jetzt." 
            }
        ]
    },
    {
        id: "srv_leak_1",
        title: "Das leckende Rohr",
        text: "Tropf... Tropf... Ein Kondenswasser-Rohr der Klimaanlage ist undicht. Es tropft in Zeitlupe direkt in die Lüftungsschlitze des 50.000€ teuren Core-Switch. Jeder Tropfen ein potenzieller Totalschaden.",
        opts: [
            { 
                t: "Mit Panzertape umwickeln", 
                req: "tape",
                next: "path_leak_tape", 
                m: 5, f: 0, a: -5, c: -10, 
                r: "Du wickelst so lange Tape um die Stelle, bis nichts mehr tropft. Dicht! Zumindest für heute. Und Provisorien überleben bekanntlich Zivilisationen." 
            },
            { 
                t: "Mülleimer drunterstellen", 
                next: "path_leak_bucket", 
                m: 10, f: 5, a: 0, c: 0, 
                r: "Pling... Pling... Du hast den Eimer aus der Küche geholt. Du musst ihn alle 2 Stunden leeren, aber die Hardware bleibt trocken. Deine Nerven leiden unter dem Geräusch." 
            },
            { 
                t: "Rohr mit Hammer 'zurechtbiegen'", 
                req: "hammer",
                next: "path_leak_hammer", 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Du setzt den Hammer als Hebel an und drückst. KNACK! Das morsche Rohr bricht komplett ab. Ein Schwall kaltes Wasser ergießt sich über das Rack. Katastrophe!" 
            }
        ]
    },
    {
        id: "srv_leak_2a",
        title: "Die Wasserbomben-Gefahr",
        reqStory: "path_leak_tape",
        text: "Du schaust nach deiner Tape-Konstruktion. Das Wasser hat sich gestaut. Das Tape hat sich gedehnt und bildet jetzt eine pralle, literschwere Blase direkt über dem Server. Sieht aus wie ein Euter.",
        opts: [
            { 
                t: "Mehr Tape drumwickeln", 
                req: "tape", 
                m: 5, f: 10, a: 0, c: 5, 
                r: "Du stabilisierst die Blase mit noch mehr Klebeband, bis ein Kokon entstanden ist. Hoffentlich platzt der nie." 
            },
            { 
                t: "Schüssel drunter & wegrennen", 
                m: 2, f: 5, a: -5, c: 10, 
                r: "Wenn das platzt, willst du nicht im Raum sein. Du stellst eine Schüssel zur Gewissensberuhigung auf den Boden und fliehst." 
            },
            { 
                t: "Vorsichtig anstechen & ablassen", 
                req: "screw",
                m: 15, f: -5, a: 5, c: 0, 
                r: "Ganz vorsichtig... PIEKS. Du fängst den Strahl mit einem Becher auf. Du brauchst 20 Becher, aber die Blase ist weg. Maßarbeit." 
            }
        ]
    },
    {
        id: "srv_leak_2b",
        title: "Land unter",
        reqStory: "path_leak_bucket",
        text: "Du kommst zurück in den Serverraum. Es ist still. Kein 'Pling' mehr. Der Eimer ist nämlich voll und übergelaufen. Eine große Pfütze breitet sich Richtung Stromverteiler aus.",
        opts: [
            { 
                t: "Schild 'Vorsicht Rutschgefahr' aufstellen", 
                m: 2, f: 15, a: -5, c: 10, 
                r: "Rechtlich bist du jetzt abgesichert. Technisch gesehen steht der Stromverteiler immer noch im Wasser. Aber du hast Feierabend." 
            },
            { 
                t: "Alles aufwischen", 
                m: 30, f: -20, a: 10, c: -5, 
                r: "Du kriechst mit Papierhandtüchern auf dem Boden rum. Deine Hose wird nass, dein Rücken schmerzt. Der bequeme Weg schickt seine Rechnung sofort." 
            },
            { 
                t: "Putzkolonne rufen", 
                m: 5, f: 10, a: -5, c: 5, 
                r: "'Hier ist... äh... was ausgelaufen.' Die Putzkraft rollt mit den Augen, macht es aber weg. Du stehst daneben und gibst unnötige Tipps." 
            }
        ]
    },
    {
        id: "srv_leak_2c",
        title: "Wasserschaden-Bingo",
        reqStory: "path_leak_hammer",
        text: "Das Wasser läuft. Der Switch blinkt wild. Es riecht nach Ozon. Du musst handeln, bevor der 50.000€ Schaden amtlich wird.",
        opts: [
            { 
                t: "Schuld auf Dachschaden schieben", 
                m: 5, f: 10, a: -10, c: -5, 
                r: "Du machst Fotos vom kaputten Rohr. 'Baumangel! Höhere Gewalt!' Die Versicherung zahlt. Niemand fragt nach dem Hammer." 
            },
            { 
                t: "In Reis einlegen", 
                m: 15, f: 5, a: -5, c: 10, 
                r: "Du kippst den Kantinen-Reis in den Server. Es bringt technisch nichts, sieht aber so aus, als hättest du einen Plan. Der Switch stirbt trotzdem." 
            },
            { 
                t: "Mit Föhn trocknen", 
                m: 20, f: -5, a: 5, c: 0, 
                r: "Du föhnst die Platinen trocken. Es dauert ewig. Tatsächlich gehen die Lichter wieder an! Ein Wunder (oder Glück). Korrosion ist ein Problem für später." 
            }
        ]
    },
    {
        id: "srv_pw_list_1",
        title: "Versteckte Notiz",
        text: "Hinter Rack 5 klebt ein vergilbter Zettel mit Tesafilm. Darauf steht in krakeliger Schrift: 'TOP SECRET - NUR FÜR ADMINS'. Der Zettel sieht aus, als hinge er dort schon seit Windows 95.",
        opts: [
            { 
                t: "Ehrfürchtig hängen lassen", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du drückst den Tesafilm wieder fest. Das ist IT-Archäologie und Kulturgut. Wer das entfernt, löscht wahrscheinlich auch versehentlich das Backup." 
            },
            { 
                t: "Den Zettel neugierig entziffern", 
                next: "path_pw_decipher", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Es sind keine Passwörter. Es ist das Vermächtnis deines Vorgängers: 'Ich habe das Internet in einer schwarzen Kiste ganz unten im Rack versteckt. Wenn Google down ist, müsst ihr die Kiste schütteln. P.S.: Trau niemals dem Drucker.' Weise Worte." 
            }
        ]
    },
    {
        id: "srv_pw_list_2a",
		char: "Dr. Wichtig",
        title: "Der Google-Crash",
        reqStory: "path_pw_decipher",
        text: "Ein Schrei hallt durch die Firma: 'GOOGLE IST DOWN!' Panik bricht aus. Die Senior-Admins tippen wild auf Konsolen: 'DNS-Fehler! Backbone-Timeout!' Nichts hilft. Der Chef läuft rot an.",
        opts: [
            { 
                t: "Logisch vorgehen und den Router neu starten", 
				rep: { "Dr. Wichtig": -2 },
                m: 20, f: -5, a: 10, c: 10, 
                r: "Du ignorierst den okkulten Rat und startest den Cisco-Router neu. Es bringt... nichts. 20 Minuten später geht es von alleine wieder. Der Chef brummt unzufrieden: 'Das dauerte viel zu lange.'" 
            },
            { 
                t: "Dem Drucker misstrauen", 
				rep: { "Dr. Wichtig": -10 },
                m: 5, f: 10, a: -5, c: 10, 
                r: "Der Zettel warnte auch vor dem Drucker. Du starrst das Gerät böse an, während die Firma Geld verliert. Der Chef schreit: 'Müller! Was machen Sie da?! Fixen Sie das WLAN!' Das gab Ärger." 
            },
            { 
                t: "Die 'Schwarze Kiste' schütteln", 
				rep: { "Dr. Wichtig": 10 },
                m: 5, f: -10, a: -10, c: -20, 
                r: "Du kriechst nach unten und schüttelst die verstaubte schwarze Box. KLACK. Die LEDs springen auf Grün. Das Internet ist zurück! Der Chef klopft dir begeistert auf die Schulter: 'Hexerei, Müller! Aber gute Arbeit!'" 
            }
        ]
    },
    {
        id: "srv_label_fail",
        title: "Der Elektriker-Fail",
        text: "Du starrst auf das Bedienfeld der Klimaanlage. Ein handgeschriebener Zettel klebt über den Reglern: 'ACHTUNG: Der Elektriker war farbenblind! BLAU heizt (Warm) und ROT kühlt (Kalt)! Nicht anfassen, wird erst 2030 repariert.'",
        opts: [
            { 
                t: "Zettel ignorieren", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du gehst weiter. Farben sind schließlich genormt, oder? Was könnte da schon schiefgehen." 
            },
            { 
                t: "Anlage genauer untersuchen", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Tatsächlich. Die Kabel sind vertauscht. Rot geht zum Kompressor (Kalt), Blau zur Heizspirale (Warm). Völlig absurd. Gut, dass du nachgesehen hast." 
            }
        ]
    },
    {
        id: "srv_port_warning",
        title: "Das Warnschild am Switch",
        text: "Am Haupt-Switch klebt ein riesiges Schild über Port 42: 'NICHT BENUTZEN! Kurzschluss-Gefahr! Wer hier was einsteckt, grillt den ganzen Switch!'",
        opts: [
            { 
                t: "Schild gerade rücken", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Port 42 ist böse. Verstanden. Gut, dass das Schild da hängt." 
            },
            { 
                t: "Ignorieren", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du hast es eilig. Hoffentlich behältst du das trotzdem im Hinterkopf." 
            }
        ]
    },
    {
        id: "srv_crying_elster",
		char: "Frau Elster",
        title: "Tränen im Serverraum",
        text: "Du hörst ein leises Wimmern hinter Rack 4. Es ist Frau Elster aus der Buchhaltung. Sie sitzt auf dem Boden, das Gesicht in den Händen vergraben. 'Ich kann das alles nicht mehr...', flüstert sie.",
        opts: [
            { 
                t: "'Alles okay mit der Bilanz?'", 
                rep: { "Frau Elster": -5 },
                m: 10, f: 0, a: 10, c: 5, 
                r: "Sie schaut dich entsetzt an. 'Ist Ihnen Arbeit wichtiger als Menschen?!' Sie rennt weinend raus." 
            },
            { 
                t: "'Wie geht es Rüdiger?'",
                rep: { "Frau Elster": 10 },
                m: 15, f: 10, a: -20, c: -5, 
                r: "Sie blickt überrascht auf. Ein kleines Lächeln erscheint. 'Rüdiger... ja, der wartet zuhause. Er braucht sein Futter.' Sie wischt sich die Tränen weg. 'Danke, Herr Müller. Ich gehe jetzt heim zu ihm.' Du hast ihren Tag gerettet." 
            },
            { 
                t: "Leise wieder rausgehen", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du lässt sie in Ruhe. Manchmal braucht man Privatsphäre." 
            }
        ]
    },
    {
        id: "srv_update_fail_1",
        title: "Der kritische Patch",
        text: "Auf dem Dashboard blinkt es rot: 'Kritische Sicherheitslücke in der Zeiterfassung! Patch verfügbar.' Es ist gerade Mittagspause, alle kauen Döner. Niemand ist eingeloggt. Der perfekte Moment?",
        opts: [
            { 
                t: "Sofort das Update installieren", 
                next: "path_update_patch", 
                m: 20, f: -10, a: 30, c: 0, 
                r: "Update läuft durch! Aber: Der 'Stempeln'-Button ist jetzt grün statt blau. Um 13 Uhr bricht totale Panik aus. 'ALLES SIEHT ANDERS AUS!' Das Telefon glüht. Du hast das Layout verändert, du Monster." 
            },
            { 
                t: "Wegklicken - never change a running system", 
                next: "path_update_ignore", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du klickst die Warnung weg. Wenn russische Hacker kommen, ist das ein Problem für das Zukunfts-Ich. Jetzt ist erstmal Pause und der Döner wird kalt." 
            }
        ]
    },
    {
        id: "srv_update_fail_2a",
        title: "Heise Online News",
        reqStory: "path_update_patch",
        text: "Du liest genervt die IT-News, während User sich immer noch über den grünen Button beschweren. Schlagzeile: 'Massive Ransomware-Welle nutzt Lücke in Zeit-Software. Tausende Firmen verschlüsselt.' Nur deine nicht.",
        opts: [
            { 
                t: "Arrogante Rundmail schreiben", 
                m: 10, f: 0, a: -20, c: -5, 
                r: "'Betreff: Gern geschehen.' Du erklärst, dass der grüne Button sie vor dem Ruin gerettet hat. Plötzlich ist Ruhe. Ein kleiner Triumph." 
            },
            { 
                t: "Den Button per CSS wieder blau färben", 
                m: 15, f: -5, a: -5, c: 0, 
                r: "Du hackst das CSS, damit der Button wieder blau ist. Die Sicherheit bleibt, die User sind glücklich. Du bist der stille Wächter." 
            },
            { 
                t: "Schadenfreude genießen", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du lehnst dich zurück und liest die Berichte über brennende Serverräume bei der Konkurrenz. Der Kaffee schmeckt heute besonders gut." 
            }
        ]
    },
    {
        id: "srv_update_fail_2b",
        title: "Die neuen Kollegen",
        reqStory: "path_update_ignore",
        text: "Du prüfst die Stempelzeiten. Komisch. Neben 'Müller' und 'Schmidt' stehen da plötzlich 'Vladimir', 'Igor' und 'Botnet_Warrior_99'. Sie arbeiten alle 24 Stunden am Tag und haben Admin-Rechte.",
        opts: [
            { 
                t: "Bei HR nachfragen: 'Haben wir expandiert?'", 
				rep: { "Dr. Wichtig": -2 },
                m: 10, f: 0, a: -5, c: 20, 
                r: "Die HR fällt aus allen Wolken. Der Chef bekommt Wind davon. 'Wieso haben wir Mitarbeiter in St. Petersburg?!' Du musst zum Rapport." 
            },
            { 
                t: "Die 'Mitarbeiter' einfach weiterschürfen lassen", 
                m: 5, f: 10, a: -10, c: 10, 
                r: "Sie scheinen nur Rechenleistung für Krypto zu klauen. Du lässt sie gewähren und zweigst 10% für dich ab. Ein riskantes Spiel mit der russischen Mafia." 
            },
            { 
                t: "Panisch die Datenbank bereinigen und patchen", 
                m: 60, f: -20, a: 20, c: 0, 
                r: "Heimlich löschst du die Accounts und spielst das Update ein. Du schwitzt Blut und Wasser. Hoffentlich haben sie keine Backdoor hinterlassen." 
            }
        ]
    },
    {
        id: "srv_consultant_fail_1",
        title: "Der teure Berater",
        text: "Ein externer 'Senior Strategy Consultant' (Tagessatz: 2000€) hat gerade den Stecker des Haupt-Servers gezogen, um sein iPhone zu laden. Alles ist aus. Der Chef reißt die Tür auf: 'WIESO STEHT DER BETRIEB?!'",
        opts: [
            { 
                t: "Stecker wieder reinrammen", 
                next: "consultant_psu",
                m: 5, f: 0, a: 10, c: 20, 
                r: "Funkenflug. Der Server fährt hoch, aber das Netzteil ist durchgebrannt. Der Berater tippt auf seinem Handy: 'Hardware veraltet. Empfehle Neukauf.' Du grinst böse. 'Wird erledigt.'" 
            },
            { 
                t: "Berater anschreien", 
                next: "consultant_war",
				rep: { "Dr. Wichtig": -5 },
                m: 2, f: 0, a: -20, c: 50, 
                r: "Du brüllst den Gast an. Der Chef wird blass. 'Müller! Benehmen Sie sich! Abmahnung wegen unprofessionellem Verhalten!' Der Berater grinst." 
            },
            { 
                t: "Auf den Berater zeigen",
				rep: { "Dr. Wichtig": -2 },
                m: 10, f: -5, a: 30, c: 10, 
                r: "Der Berater lacht glatt: 'Ah, Herr Müller wollte mir gerade die USV demonstrieren und hat wohl das falsche Kabel erwischt. Schlechtes Briefing!' Der Chef nickt. Du kochst vor Wut." 
            }
        ]
    },
    {
        id: "srv_consultant_fail_2b",
        title: "Das Gold-Netzteil",
        reqStory: "consultant_psu",
        text: "Das Ersatzteil ist da. Weil der Berater meinte, wir bräuchten 'High-End', hast du das 'Titan-Master 9000' bestellt: Handgelötet, RGB-Beleuchtung, Military-Grade. Preis: 4.800€. Der Chef starrt fassungslos auf die Rechnung.",
        opts: [
            { 
                t: "Den Berater zitieren", 
				rep: { "Dr. Wichtig": 5 },
                m: 5, f: 0, a: -20, c: -10,
                r: "'Der Berater sagte: Keine Kosten scheuen für Stabilität.' Der Chef verfärbt sich gefährlich. 'Dieser Idiot! Aber gut, wenn er es empfohlen hat...' Du bist fein raus." 
            },
            { 
                t: "Technik-Geschwafel nutzen", 
                m: 5, f: 5, a: -5, c: 5, 
				rep: { "Dr. Wichtig": 2 },
                r: "'Das ist das einzige Modell, das mit unserer Legacy-Software kompatibel ist, Chef.' Er seufzt. 'Na gut. Bauen Sie es ein.' Er hat keine Ahnung, dass ein 50€ Teil gereicht hätte." 
            },
            { 
                t: "Genüsslich einbauen", 
				rep: { "Dr. Wichtig": -2 },
                m: 30, f: -10, a: -10, c: 0, 
                r: "Du schraubst das Monster in das Rack. Es leuchtet in Regenbogenfarben. Es ist völlig überdimensioniert, aber es ist DEINS. Rache ist süß (und teuer)." 
            }
        ]
    },
    {
        id: "srv_consultant_fail_2c",
        title: "Die offizielle Beschwerde",
        reqStory: "consultant_war",
        text: "Der Berater wedelt mit einem laminierten Dokument. 'Bezüglich unseres Disputs. Ich habe hier eine formelle Beschwerde wegen 'Toxischer Arbeitsatmosphäre'. Unterschreiben Sie, oder ich empfehle dem Vorstand Outsourcing.'",
        opts: [
            { 
                t: "Bürokratie-Konter: 'Formular 7b fehlt'", 
                m: 5, f: 10, a: 10, c: 10, 
                r: "Du schaust das Papier an. 'Das ist das alte Formular von 2018. Ohne Passierschein A38 kann ich das nicht annehmen.' Der Berater ist verwirrt und zieht ab." 
            },
            { 
                t: "'Raus aus meinem Serverraum!'", 
				rep: { "Dr. Wichtig": 2 },
                m: 2, f: 0, a: -20, c: 40, 
                r: "Du wirfst ihn raus. Er droht mit Anwälten. Der Chef ist sauer, aber die Kollegen feiern dich als Helden des Widerstands." 
            },
            { 
                t: "Klein beigeben & unterschreiben", 
                m: 10, f: 5, a: -10, c: -20, 
                r: "Du unterschreibst zähneknirschend. Der Berater lächelt süffisant. 'Geht doch. Synergie durch Kooperation.' Der Chef ist fürs Erste besänftigt. Dein Stolz hat dieses Meeting nicht überlebt." 
            }
        ]
    },
    {
        id: "srv_dust_disaster_1",
        title: "Der verstaubte Server",
        text: "Der alte Backup-Server 'Methusalem' ist unter einer 5cm dicken Staubschicht begraben. Die Lüfter japsen und die Temperatur-LED blinkt rot. Das ist Brandgefahr!",
        opts: [
            { 
                t: "Gründlich mit Druckluft reinigen", 
                next: "srv_dust_2a",
                m: 20, f: -10, a: 5, c: 0, 
                r: "PFFFFT. Eine graue Wolke hüllt dich ein. Du holst kiloweise Staub aus den Kühlrippen. Plötzlich drehen die Lüfter hoch, die LED wird grün. Die Kiste rennt wie am ersten Tag. Mist." 
            },
            { 
                t: "Staubmuster malen", 
                next: "srv_dust_2b",
                m: 5, f: 10, a: -5, c: 0, 
                r: "Du malst mit dem Finger einen Smiley in den dicken Staub auf dem Gehäuse. Er grinst dich schief an. Sieht gleich viel freundlicher aus." 
            }
        ]
    },
    {
        id: "srv_dust_disaster_2a",
		char: "Dr. Wichtig",
        title: "Das Budget-Problem",
        reqStory: "srv_dust_2a",
        text: "Der Chef bleibt im Serverraum stehen und lauscht dem kraftvollen Surren. 'Hören Sie das, Müller? Methusalem läuft ja wie ein Neuwagen! Da können wir den Antrag für den neuen Server (15.000€) ja stornieren.' Dein Herz bleibt stehen.",
        opts: [
            { 
                t: "Trotzdem auf Neukauf bestehen",
				rep: { "Dr. Wichtig": -2 },
                m: 15, f: 0, a: 10, c: 20,
                r: "'Das ist nur das letzte Aufbäumen vor dem Tod!' Der Chef winkt ab. 'Solange er blinkt, bleibt er.' Du hast jetzt einen schnellen, alten Server und einen genervten Chef." 
            },
            { 
                t: "Den Lüfter heimlich wieder drosseln", 
                m: 10, f: -5, a: -20, c: 10,
                r: "Du klemmst heimlich ein Stück Pappe in den Lüfter. Der Server überhitzt sofort. Der Chef seufzt: 'Na gut. Ich bestelle Ersatz.' Er kauft den billigsten 'Refurbished'-Server auf eBay. Jetzt hast du Elektroschrott am Hals." 
            },
            { 
                t: "Post-It 'Legends never die' kleben", 
				rep: { "Dr. Wichtig": 5 },
                m: 2, f: 5, a: 5, c: -10,
                r: "Du akzeptierst dein Schicksal. Du klebst ein Post-It an den Server: 'Nicht ausschalten, sonst stirbt er.' Der Chef nickt zufrieden über die Sparmaßnahme." 
            }
        ]
    },
    {
        id: "srv_dust_disaster_2b",
        title: "Staub-Therapie",
        reqStory: "srv_dust_2b",
        text: "Du flüchtest vor einem User ('Mein Mauszeiger ist weg!') in den Serverraum. Hier ist es kühl und laut. Du siehst deinen Staub-Smiley auf dem Backup-Server.",
        opts: [
            { 
                t: "Das Muster zum Zen-Garten verfeinern", 
                m: 10, f: 5, a: -15, c: 0,
                r: "Du ziehst weitere Linien. Ein Fraktal aus Staub. Es hat etwas Meditatives, wie ein Zen-Garten. Dein Puls beruhigt sich. Die Welt ist okay." 
            },
            { 
                t: "Mit dem Ärmel wegwischen", 
                m: 5, f: -5, a: -10, c: 0,
                r: "Ein Wisch mit dem Ärmel. Der Staub ist weg (auf deinem Pulli). Eine saubere Oberfläche. Ein kleiner Sieg über das Chaos. Du fühlst dich besser." 
            }
        ]
    },
    {
        id: "srv_overheat_warning_1",
        title: "Hitzeflimmern",
        text: "Server 'Berta' (Gehaltsabrechnung) glüht. Der Lüfter steht still, es riecht beißend nach heißem Silizium. Wenn Berta stirbt, sind die Lohndaten weg.",
        opts: [
            { 
                t: "Aufschrauben & Luft zufächeln", 
                req: "screw", 
                m: 45, f: -15, a: 20, c: 0, 
                r: "Du schraubst das Gehäuse auf. Du stehst 45 Minuten daneben und wedelst mit einem Klemmbrett frische Luft hinein. Dein Arm fällt fast ab, aber Berta überlebt." 
            },
            { 
                t: "Dyson-Ventilator vom Chef klauen", 
                next: "path_overheat_dyson",
                m: 20, f: -5, a: 5, c: 15, 
                r: "Du holst den 800€-Ventilator aus dem Chef-Büro. Berta wird luxuriös gekühlt. Aber oben im Büro beginnt das große Schwitzen." 
            },
            { 
                t: "Tür zu & das Beste hoffen", 
                next: "path_overheat_ignore",
                m: 5, f: 10, a: 0, c: 50, 
                r: "Du gehst einfach. 10 Minuten später stirbt Berta den Hitzetod. Stille im Serverraum. Dafür Lärm im Flur." 
            },
            { 
                t: "Brutale Lösung: CO2-Löscher", 
                req: "fire_ext", 
                next: "path_overheat_co2",
                m: 5, f: -10, a: 10, c: -10, 
                r: "PFFFFT! Ein eiskalter CO2-Stoß direkt in den Lufteinlass. Die Temperatur fällt schockartig auf -10 Grad. Berta schnurrt wieder, ist aber nun ein Eisblock." 
            }
        ]
    },
    {
        id: "srv_overheat_warning_2a",
        title: "Eiszeit",
        reqStory: "path_overheat_co2",
        text: "Berta läuft super, aber durch den CO2-Schock bildet sich Kondenswasser auf der Platine. Es fängt an zu tropfen. Wasser und Strom sind keine Freunde.",
        opts: [
            { 
                t: "Mit Föhn trocknen", 
                m: 15, f: -5, a: 10, c: 0, 
                r: "Du holst einen Föhn und trocknest die Pfützen vorsichtig weg. Es ist ein Tanz auf dem Vulkan, aber du verhinderst den Kurzschluss." 
            },
            { 
                t: "Reis drüber kippen", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Der gute alte Reis-Trick. Sieht unprofessionell aus, saugt aber die Feuchtigkeit auf. Hoffentlich kocht der Reis nicht auf der CPU." 
            },
            { 
                t: "Ignorieren", 
                m: 2, f: 10, a: 0, c: 20, 
                r: "Du lässt es drauf ankommen. BIZZZT. Ein kleiner Funke. Berta startet neu, läuft aber weiter. Ein Sektor der Festplatte ist gegrillt (Mitarbeiter A-F kriegen kein Geld)." 
            }
        ]
    },
    {
        id: "srv_overheat_warning_2b",
		char: "Dr. Wichtig",
        title: "Der schwitzende Chef",
        reqStory: "path_overheat_dyson",
        text: "Der Chef stürmt hochrot und schweißgebadet in den Serverraum. Er sieht seinen geliebten Dyson vor dem Server stehen. 'MÜLLER! Das ist mein Privateigentum! Mir läuft die Suppe in die Augen!'",
        opts: [
            { 
                t: "'Das war eine Notfall-Maßnahme.'", 
				rep: { "Dr. Wichtig": 5 },		
                m: 5, f: 0, a: -5, c: -10, 
                r: "'Chef, ohne den Dyson wären alle Gehaltsdaten weg!' Er hält inne, wischt sich den Schweiß ab. 'Wirklich? Na gut. Retten Sie die Daten.' Er zieht ab." 
            },
            { 
                t: "Ventilator sofort zurückgeben", 
                m: 5, f: 0, a: -10, c: 5, 
                r: "Du ziehst dem Ventilator den Stecker. 'Sorry, Chef.' Er nimmt das Ding und geht. Berta wird sofort wieder heiß. Du musst jetzt pusten." 
            },
            { 
                t: "Frech werden: 'Sie schwitzen für die Firma'", 
				rep: { "Dr. Wichtig": -15 },
                m: 2, f: 0, a: 10, c: 30, 
                r: "'Opfer müssen gebracht werden.' Der Chef explodiert fast. Er reißt den Ventilator an sich und knallt die Tür zu. Die Abmahnung schreibt er vermutlich noch im Gehen." 
            }
        ]
    },
    {
        id: "srv_overheat_warning_2c",
		char: "Frau Elster",
        title: "Der Zahltag-Aufstand",
        reqStory: "path_overheat_ignore",
        text: "Frau Elster steht kreischend im Flur: 'BERTA IST TOT! KEIN GELD DIESEN MONAT!' Eine wütende Meute von Mitarbeitern mit Fackeln (und Tackern) versammelt sich vor der IT.",
        opts: [
            { 
                t: "Schuld auf 'Hacker' schieben",
                rep: { "Frau Elster": -2 }, 
                m: 10, f: 5, a: -10, c: 10, 
                r: "'Nordkoreanische Cyber-Attacke!' Alle nicken ängstlich. Der Chef glaubt es halb, ist aber sauer wegen der PR. Du bist raus aus der Schusslinie, aber das Klima ist vergiftet." 
            },
            { 
                t: "Auf der Toilette verstecken",
                rep: { "Frau Elster": -10 }, 
                m: 60, f: 10, a: -20, c: 40, 
                r: "Du schließt dich im Klo ein und wartest, bis der Mob nach Hause geht. Als du rauskommst, klebt ein Zettel an deinem Monitor: 'Wir wissen, wo du wohnst.'" 
            },
            { 
                t: "Alle Überweisungen manuell tippen",
                rep: { "Frau Elster": 10 }, 
                m: 120, f: -50, a: 20, c: -10, 
                r: "Du sitzt 2 Stunden mit Frau Elster da und tippst IBANs ab. Deine Finger bluten. Aber der Mob beruhigt sich. Lektion gelernt." 
            }
        ]
    },
    {
        id: "srv_night_shift_1",
        title: "Überreste der Nachtschicht",
        text: "Du findest eine halbvolle, warme Dose Energy Drink und einen Zettel auf dem Server: 'RAID-Controller spinnt. Ich geh heim, mir egal.' Eine rote Lampe am Drive-Bay blinkt hektisch.",
        opts: [
            { 
                t: "Den Energy Drink einstecken", 
                loot: "energy", 
                next: "path_night_shift_loot",
                m: 5, f: -5, a: -5, c: 10, 
                r: "Du steckst die Dose ein. Gratis ist gratis. Während du dich bückst, hört das Blinken auf. Die LED ist jetzt aus. Tot. Das Laufwerk hat sich verabschiedet." 
            },
            { 
                t: "Seufzen und RAID-Rebuild starten", 
                next: "path_night_shift_fix",
                m: 60, f: -20, a: 10, c: -10, 
                r: "Du tauschst die Platte im Hot-Swap und startest den Rebuild. Es dauert eine Stunde, in der du auf einen Ladebalken starrst. Das System ist gerettet." 
            },
            { 
                t: "Den Kollegen aus dem Bett klingeln", 
                next: "path_night_shift_wake",
                m: 15, f: 0, a: -10, c: 5, 
                r: "Du weckst ihn auf und brüllst ihn an. Er kommt völlig übermüdet und mürrisch zur Arbeit zurück. 'Bin ja schon da.' Du übergibst ihm das Chaos und gehst." 
            }
        ]
    },
    {
        id: "srv_night_shift_2a",
		char: "Dr. Wichtig",
        title: "Das fehlende Laufwerk",
        reqStory: "path_night_shift_loot",
        text: "Der Chef taucht in der Tür auf. 'Müller? Warum kann das Marketing nicht auf Laufwerk X zugreifen? Da liegen die Kampagnen für morgen!' Er sieht die tote LED.",
        opts: [
            { 
                t: "Heldenhaft das Backup einspielen", 
				rep: { "Dr. Wichtig": 5 },
                m: 45, f: -15, a: 5, c: -20, 
                r: "Du wechselst das Tape und spielst das Backup ein. 'Keine Panik, Chef. Alles unter Kontrolle.' Du rettest den Tag. Der Chef nickt anerkennend." 
            },
            { 
                t: "Energy Drink anbieten", 
				rem: "energy",
                rep: { "Dr. Wichtig": -2 },
				m: 2, f: 5, a: -5, c: 10, 
                r: "'Wollen Sie einen Schluck?' Der Blick des Chefs pendelt zwischen Sorge und Fassungslosigkeit. 'Reparieren Sie das! Sofort!' Das war wohl der falsche Moment." 
            },
            { 
                t: "Die Nachtschicht beschuldigen", 
				rep: { "Dr. Wichtig": -5 },
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du zeigst auf den Zettel des Kollegen. 'Er ist einfach gegangen.' Der Chef tobt. 'Dieser Nichtsnutz!' Dein Kopf ist aus der Schlinge, der Kollege ist fällig." 
            }
        ]
    },
    {
        id: "srv_night_shift_2b",
        title: "Frisch und Munter",
        reqStory: "path_night_shift_fix",
        text: "Der Kollege der Nachtschicht kommt (ausgeschlafen) zur Mittagszeit rein. Er sieht die grünen LEDs. 'Ah, hat sich von selbst gefixt? Sag ich doch, war nur ein Glitch.'",
        opts: [
            { 
                t: "Seinen Stuhl verstellen", 
                m: 2, f: 5, a: 5, c: 0, 
                r: "Heimliche Rache. Du schraubst seinen Stuhl 5cm tiefer und stellst die Mausgeschwindigkeit auf 'Schnecke'. Das wird ihn in den Wahnsinn treiben." 
            },
            { 
                t: "Beim Chef anschwärzen", 
				rep: { "Dr. Wichtig": 2 },
                m: 10, f: -5, a: 5, c: 5, 
                r: "Du petzt. Der Chef zuckt mit den Schultern. 'Solange es läuft...' Leistung wird hier wohl nicht belohnt." 
            },
            { 
                t: "Ihm die Meinung geigen", 
                m: 5, f: 0, a: -10, c: 0, 
                r: "Du stellst ihn zur Rede. Er winkt ab. 'Chill mal. Teamwork, oder?' Du fühlst dich moralisch überlegen, aber er lernt nichts draus." 
            }
        ]
    },
    {
        id: "srv_night_shift_2c",
        title: "Zickenkrieg",
        reqStory: "path_night_shift_wake",
        text: "Eine E-Mail an alle (cc: Chef, HR): 'Betreff: Mobbing durch IT-Kollegen'. Der Kollege beschwert sich, dass du ihn in seiner Ruhezeit 'terrorisiert' hast, obwohl das Problem 'nicht kritisch' war.",
        opts: [
            { 
                t: "Ihm auflauern und klären", 
                m: 5, f: 0, a: 10, c: 10, 
                r: "Du fängst ihn im Flur ab. Es wird laut. HR muss dazwischengehen. Jetzt habt ihr beide einen Eintrag in der Personalakte." 
            },
            { 
                t: "Sachlich richtigstellen - an alle", 
                m: 15, f: -5, a: 5, c: 0, 
                r: "Du hängst das Fehlerprotokoll an. 'RAID 5 degraded ist kritisch.' Stille im Postfach. Fakten schlagen Gefühle. 1:0 für dich." 
            },
            { 
                t: "Ignorieren", 
                m: 2, f: 5, a: -5, c: 5, 
                r: "Soll er doch heulen. Du löschst die Mail. Der Chef fragt auch nicht nach. Manchmal ist Schweigen Gold." 
            }
        ]
    },
    {
        id: "srv_legacy_tape_1",
        title: "Das Backup-Band",
        text: "Das uralte Bandlaufwerk surrt, klickt und verstummt dann. Es spuckt das Tape nicht mehr aus. 'Error 08/15: Tape stuck'. Es ist das einzige Voll-Backup von gestern. Wenn du es kaputt machst, sind die Daten futsch.",
        opts: [
            { 
                t: "Rohe Gewalt anwenden: 'GIB ES HER!'", 
                next: "path_legacy_tape_fail",
                m: 5, f: 0, a: 20, c: 30, 
                r: "Du reißt es mit beiden Händen raus. RRRRATSCH. Bandsalat. Das schwarze Magnetband verteilt sich im ganzen Raum. Du wirfst das Knäuel schnell tief in den Müll." 
            },
            { 
                t: "Stecken lassen & beten", 
                m: 2, f: 10, a: 0, c: 20, 
                r: "Du ignorierst den Fehler einfach. Das Backup heute Nacht wird garantiert fehlschlagen. Aber das ist ein Problem für den 'Morgen-Müller'." 
            },
            { 
                t: "Chirurgisch mit dem Schraubendreher hebeln", 
                req: "screw", 
                next: "path_legacy_tape_success",
                m: 20, f: -5, a: 0, c: -5, 
                r: "Mit chirurgischer Präzision hebelst du die Blende auf. Das Tape gleitet unbeschädigt heraus. Daten gerettet. In deinem Kopf applaudiert ein unsichtbares Publikum." 
            },
            { 
                t: "Eine Kabelbinder-Schlaufe basteln", 
                req: "zip_ties", 
                next: "path_legacy_tape_success",
                m: 10, f: 0, a: 5, c: 5, 
                r: "Du bastelst eine Schlaufe, fädelst sie ein und ziehst vorsichtig. Es kommt raus! Das Gehäuse hat zwar Kratzer, aber hey – es läuft." 
            }
        ]
    },
    {
        id: "srv_legacy_tape_2ab",
		char: "Dr. Wichtig",
        title: "Der Restore-Test",
        reqStory: "path_legacy_tape_success",
        text: "Auftritt Chef. 'Müller! Gut, dass Sie das Tape haben. Ein Kunde hat versehentlich seine Datenbank gelöscht. Wir brauchen den Stand von gestern. Spielen Sie es ein.'",
        opts: [
            { 
                t: "Lässig das Tape einlegen", 
				rep: { "Dr. Wichtig": 10 },
                m: 45, f: -20, a: -10, c: -20,
                r: "Das Laufwerk surrt. 'Restore completed'. Der Chef strahlt. 'Sie sind ein Lebensretter, Müller!' Manchmal zahlt sich Sorgfalt aus." 
            },
            { 
                t: "Nach Gehaltserhöhung fragen",
                rep: { "Dr. Wichtig": -2 },				
                m: 5, f: 0, a: 5, c: 10,
                r: "'Das kostet extra, Chef.' Er lacht trocken. 'Machen Sie einfach Ihre Arbeit.' Chance vertan, aber mutig." 
            }
        ]
    },
    {
        id: "srv_legacy_tape_2c",
		char: "Dr. Wichtig",
        title: "Daten-Verlust",
        reqStory: "path_legacy_tape_fail",
        text: "Der Chef bricht förmlich durch die Tür. 'Katastrophe! Ein Kunde hat alles gelöscht! Wo ist das Backup von gestern?! Wir müssen SOFORT restoren!' Er sieht das leere Laufwerk.",
        opts: [
            { 
                t: "'Das Backup lief nie!'", 
				rep: { "Dr. Wichtig": -2 },
                m: 5, f: 5, a: -5, c: 20, 
                r: "'Software-Fehler, Chef. Das System hat versagt.' Er flucht auf die Technik. 'Scheiß EDV!' Du bist fein raus, aber das Vertrauen in die IT ist hinüber." 
            },
            { 
                t: "Panik vortäuschen & weinen", 
				rep: { "Dr. Wichtig": 2 },
                m: 5, f: 0, a: -10, c: 5, 
                r: "Du brichst theatralisch zusammen. 'Es ist alles so schrecklich!' Der Chef ist so verwirrt, dass er dich tröstet, statt dich zu feuern. Mitleid zieht immer." 
            },
            { 
                t: "'Das Tape ist... kaputt.'", 
				rep: { "Dr. Wichtig": -15 },
                m: 10, f: 0, a: 5, c: 50,
                r: "Du holst das Knäuel aus dem Müll. Der Chef wird kreidebleich. 'DAS WAR DAS EINZIGE BACKUP?!' Er schreit so laut, dass im Nachbargebäude die Fenster wackeln. Das gibt eine Abmahnung." 
            }
        ]
    },
    {
        id: "srv_egon_stash_1",
		char: "Egon",
        title: "Egons Geheimversteck",
        text: "Du hebst ein loses Bodenblech an. Dahinter: Eine verstaubte Kiste von Hausmeister Egon. Inhalt: Eine angebrochene Flasche 'Billig-Korn', fragwürdige Magazine aus den 90ern und... eine handschriftliche Liste mit allen Türcodes der Firma.",
        opts: [
            { 
                t: "Einen tiefen Schluck Korn nehmen", 
                next: "path_egon_drink",
                m: 15, f: 10, a: -20, c: 10, 
                r: "Du nimmst einen Schluck. Es schmeckt wie Bremsenreiniger und brennt höllisch. Du bist leicht beschwipst. Die Arbeit ist jetzt erträglicher, aber deine Fahne ist ein Risiko." 
            },
            { 
                t: "Fund melden & Egon verpfeifen", 
                next: "path_egon_snitch",
                rep: { "Egon": -15, "Dr. Wichtig": 5 },
                m: 15, f: 0, a: 10, c: -5, 
                r: "Du legst die Beweise dem Chef vor. Egon bekommt riesigen Ärger. Er weiß genau, dass du es warst. Sein Blick im Flur war eisig." 
            },
            { 
                t: "Die Liste schnell abfotografieren", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Klick. Das Foto ist sicher. Unglaublich: Der Master-Code ist '9999'. Das wird dir noch so manche verschlossene Tür öffnen. Du legst das Blech wieder drauf." 
            }
        ]
    },
    {
        id: "srv_egon_stash_2b",
		char: "Egon",
        title: "Nachricht aus dem Untergrund",
        reqStory: "path_egon_drink",
        text: "Du schaust nochmal unter das Bodenblech. Die Flasche ist weg. Stattdessen liegt da ein Zettel in krakeliger Handschrift: 'Ich weiß, dass du es warst. Schuldest mir 5 Mark. Sonst sag ich Chef.'",
        opts: [
            { 
                t: "Zettel schreiben: 'War lecker, danke.'",
                rep: { "Egon": -10 }, 
                m: 5, f: 5, a: 10, c: 5, 
                r: "Pure Provokation. Du hörst später, wie Egon im Flur laut flucht und gegen seinen Putzwagen tritt. Das wird noch ein Nachspiel haben." 
            },
            { 
                t: "Zettel schreiben: 'Beweis es doch!'", 
                rep: { "Egon": -2 },
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du legst den Zettel zurück. Das ist jetzt ein Nervenkrieg. Wer blinzelt zuerst? Du fühlst dich wie in einem Spionage-Thriller." 
            },
            { 
                t: "5 Euro als Friedensangebot reinlegen",
                rep: { "Egon": 5 }, 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Du legst einen Schein rein. Am nächsten Tag liegt ein Bonbon dort. Waffenstillstand akzeptiert. Egon ist käuflich." 
            }
        ]
    },
    {
        id: "srv_egon_stash_2c",
		char: "Egon",
        title: "Die klemmende Bürotür",
        reqStory: "path_egon_snitch",
        text: "Morgens vor deinem Büro: Der Schlüssel passt, aber die Tür rührt sich keinen Millimeter. Im Schlüsselloch steckt... Kaugummi? Egon wischt 10 Meter weiter pfeifend den Boden.",
        opts: [
            { 
                t: "Tür eintreten", 
                rep: { "Egon": -10 },
                m: 5, f: 0, a: 20, c: 20,
                r: "BÄM. Das Schloss bricht. Die Tür ist offen, aber der Rahmen ist hin. Egon kichert leise: 'Oh, Vandalismus? Das melde ich.'" 
            },
            { 
                t: "Durch den Lüftungsschacht klettern", 
                req: "screw",
                m: 20, f: -10, a: 10, c: 10, 
                r: "Wie Bruce Willis. Du schraubst das Gitter ab und robbst rein. Du landest staubig auf deinem Schreibtisch. Egon hat gewonnen, aber du hast Stil." 
            },
            { 
                t: "Egon zerknirscht um Hilfe bitten",
                rep: { "Egon": 5 }, 
                m: 30, f: 0, a: 20, c: 0, 
                r: "Du musst zu Kreuze kriechen. Egon lehnt sich zurück und genießt. 'Tja, altes Schloss. Das dauert.' Er lässt sich extrem viel Zeit, während du auf dem Flur arbeiten musst." 
            }
        ]
    },
    {
        id: "srv_crypto_miner_1",
		char: "Kevin",
        title: "Der versteckte Miner",
        text: "Ein Server läuft auf 100% Last, die Lüfter heulen wie ein startender Jet. Du checkst den Taskmanager: 'KevinCoin_Miner.exe' verbraucht alle Ressourcen. Der Azubi schürft Krypto auf Firmenkosten! Die CPU hat bereits kritische 98 Grad.",
        opts: [
            { 
                t: "Prozess killen & Kevin zur Rede stellen", 
                next: "path_crypto_stop",
                rep: { "Kevin": -5 }, 
                m: 15, f: -5, a: 5, c: -5,                
                r: "Kevin jammert: 'Aber der Kurs geht gerade zum Mond! Ich wollte uns allen Lambos kaufen!' Du bleibst hart. Der Server kühlt ab, der Lambo muss warten." 
            },
            { 
                t: "Die Wallet-Adresse heimlich auf deine ändern", 
                req: "admin_pw",
                next: "path_crypto_hijack",
                rep: { "Kevin": -10 },
                m: 10, f: 20, a: -10, c: 25,
                r: "Mit einem hämischen Grinsen leitest du die Coins auf dein privates Wallet um. Böse? Ja. Profitabel? Oh ja. Kevin schürft jetzt für deine Frührente. Hoffentlich merkt das die Revision nicht." 
            },
            { 
                t: "Einfach weiterlaufen lassen", 
                next: "path_crypto_crash",
                rep: { "Kevin": 2 },
                m: 2, f: 10, a: 0, c: 40, 
                r: "Du ignorierst es. 30 Minuten später schaltet die Kiste wegen Überhitzung per Not-Aus ab. Blöd nur, dass darauf auch SAP lief. Die Firma steht still. Alle schreien." 
            }
        ]
    },
    {
        id: "srv_crypto_miner_2a",
		char: "Kevin",
        title: "Kevins Investition",
        reqStory: "path_crypto_stop",
        text: "Kevin steht mit tränenden Augen vor dir. Er hält drei Hot-Wheels Spielzeugautos hoch. 'Ich habe die Lambos schon bestellt! Auf Kredit! Wenn ich nicht weiterschürfen darf, bricht mein Finanzplan zusammen. Nur noch 2 Stunden?'",
        opts: [
            { 
                t: "Ausnahme genehmigen",
                rep: { "Kevin": 10, "Dr. Wichtig": -2 }, 
                m: 5, f: 10, a: -10, c: 20, 
                r: "'Okay, aber nur nachts.' Kevin jubelt. Du weißt genau, dass das illegal ist. Aber wer kann diesen Hundeaugen widerstehen?" 
            },
            { 
                t: "Streng bleiben: 'Nein!'", 
                rep: { "Kevin": -5 }, 
                m: 5, f: 0, a: 5, c: -10,
                r: "'Das ist Firmeneigentum, Kevin.' Er schlurft deprimiert davon. Er muss die Spielzeugautos wohl zurückgeben. Du hast das Stromnetz gerettet." 
            },
            { 
                t: "Ihm sein Spielzeug abkaufen",
                rep: { "Kevin": 6 }, 
                m: 5, f: 5, a: -15, c: 0, 
                r: "Du gibst ihm 5 Euro für den gelben Spielzeug-Lambo. Er strahlt. 'Du bist der Beste!' Jetzt hast du ein Auto auf dem Schreibtisch. Vroom vroom." 
            }
        ]
    },
    {
        id: "srv_crypto_miner_2b",
        title: "Die Prüfung",
        reqStory: "path_crypto_hijack",
        text: "Eine E-Mail ploppt auf: 'Interne Revision: Auffälliger Stromverbrauch in Serverraum B. Wir kommen gleich mal messen.' Dein Herz rutscht in die Hose. Dein Wallet ist voll, aber die Prüfer sind im Anmarsch.",
        opts: [
            { 
                t: "'Das ist KI-Training.'", 
                rep: { "Dr. Wichtig": 5 },
                m: 5, f: 10, a: 0, c: 30, 
                r: "Du lässt es laufen. Als die Prüfer kommen, faselst du was von 'Neural Networks' und 'Blockchain-Innovation'. Sie nicken ahnungslos und gehen. Risiko hat sich gelohnt!" 
            },
            { 
                t: "Alles löschen und die Spuren verwischen", 
                m: 10, f: -5, a: 10, c: -10, 
                r: "Du löschst den Miner, die Logs und formatierst sicherheitshalber den Temp-Ordner. Das Geld ist sicher, die Einnahmequelle versiegt. Puh. Gerade noch rechtzeitig." 
            },
            { 
                t: "Vorsorglich alles auf Kevin schieben", 
                rep: { "Kevin": -15 },
                m: 5, f: 5, a: -5, c: 5, 
                r: "Du benennst den Prozess wieder in 'Kevin_Test' um. Wenn sie es finden, war es der Azubi. Du bist ein eiskaltes Ekelpaket, aber du bist sicher." 
            }
        ]
    },
    {
        id: "srv_crypto_miner_2c",
        title: "SAP-Notdienst",
        reqStory: "path_crypto_crash",
        text: "Der externe SAP-Support ist per TeamViewer draufgeschaltet. Der Stundensatz beträgt 250€. Er bewegt die Maus quälend langsam. 'Oh, die Datenbank ist inkonsistent. Das... könnte dauern.'",
        opts: [
            { 
                t: "Versuchen ihm zu Helfen", 
                m: 20, f: -10, a: 10, c: -5, 
                r: "Du gibst ihm Zugriff auf die Backups. 'Ah, danke.' Das System läuft schneller wieder. Weniger Kosten, aber du musstest arbeiten." 
            },
            { 
                t: "Hardware als Ausrede erfinden", 
                m: 10, f: 5, a: 5, c: 15, 
                r: "'Das liegt am RAM!' Der Externe widerspricht nicht. Der Chef bestellt sofort neuen RAM. Du hast das Hitzeproblem erfolgreich vertuscht." 
            },
            { 
                t: "Zusehen und Kaffee trinken", 
				rep: { "Dr. Wichtig": -2 },
                m: 60, f: 20, a: -5, c: 20, 
                r: "Du wirst quasi fürs Nichtstun bezahlt, während der Externe schwitzt. Der Chef sieht nur, dass 'Profis arbeiten'. Entspannteste Stunde der Woche." 
            }
        ]
    },
    {
        id: "srv_intern_access",
        title: "Dringende Daten",
        text: "Der Praktikant ist krank. Der Chef steht vor dessen PC: 'Müller! Knacken Sie das Ding! Da ist die Präsentation drauf! Ich wette, der Idiot hat was Kompliziertes genommen!'",
        opts: [
            { 
                t: "'Puschel123' eintippen",
				rep: { "Dr. Wichtig": 10 },
                m: 5, f: 10, a: -10, c: -5, 
                r: "Du tippst es blind ein. 'ZUGRIFF ERLAUBT'. Der Chef blinzelt: 'Woher...? Egal. Gute Arbeit, Müller!'" 
            },
            { 
                t: "Admin-Reset erzwingen",
                req: "admin_pw",
				rep: { "Dr. Wichtig": 2 },
                m: 15, f: -5, a: 0, c: 0, 
                r: "Dauert 15 Minuten, funktioniert aber sicher. Der Chef trommelt ungeduldig mit den Fingern." 
            },
            { 
                t: "'123456' eintippen",
				rep: { "Dr. Wichtig": -10 },
                m: 5, f: 0, a: 10, c: 15, 
                r: "Falsch. PC sperrt sich für 1 Stunde. Der Chef explodiert." 
            },
            { 
                t: "'Passwort' eintippen",
				rep: { "Dr. Wichtig": -5 },
                m: 5, f: 0, a: 10, c: 10, 
                r: "Natürlich nicht. Der Chef schüttelt den Kopf: 'Halten Sie mich für blöd? Probieren Sie was Richtiges!'" 
            }
        ]
    },
    {
        id: "srv_cable_spaghetti_1",
        title: "Kabel-Spaghetti",
        text: "Der Switch im Rack sieht aus wie ein Teller Spaghetti. Ein einziger Knoten aus gelben, blauen und grauen Kabeln. Du musst Port 42 finden, aber er ist tief im Chaos begraben.",
        opts: [
            { 
                t: "Mit Kabelbindern zurren", 
                req: "zip_ties", 
                next: "path_cable_tidy",
                m: 15, f: 5, a: -5, c: 0, 
                r: "Du nimmst eine Handvoll Kabelbinder und zurrst alles zu einer dicken Wurst zusammen. Nicht schön, aber Luft kommt durch und man sieht die Ports wieder." 
            },
            { 
                t: "Einfach dran ziehen", 
                next: "path_cable_yank",
                m: 5, f: 5, a: 20, c: 10, 
                r: "Du ziehst kräftig an dem Kabel, das du brauchst. RRRTSCH. Drei andere Stecker fliegen mit raus. Ups. Die Lichter der Telefonanlage gehen aus." 
            },
            { 
                t: "Geduldig entwirren", 
                next: "path_cable_tidy",
                m: 45, f: -10, a: -10, c: -10, 
                r: "Du schaltest Musik ein und sortierst Kabel für Kabel. Nach 45 Minuten hast du perfekte Ordnung geschaffen. Es sieht wunderschön aus. Fast zu schade zum Anfassen." 
            }
        ]
    },
    {
        id: "srv_cable_spaghetti_2ab",
        title: "Das Museumsstück",
        reqStory: "path_cable_tidy",
        text: "Der IT-Leiter steht vor dem Rack. Er hat Tränen in den Augen. 'Es ist... wunderschön. Niemand darf das mehr anfassen! Ich erkläre dieses Rack zur Sperrzone!'",
        opts: [
            { 
                t: "Genervt sein: 'Wir müssen aber arbeiten'", 
				rep: { "Dr. Wichtig": -5 },
                m: 5, f: 0, a: 5, c: 5, 
                r: "'Chef, ich muss an Port 43.' Er funkelt dich böse an. 'Wagen Sie es nicht, die Symmetrie zu zerstören!' Toll, jetzt ist das Rack nutzlos." 
            },
            { 
                t: "Stolz salutieren", 
                m: 5, f: 0, a: -5, c: -5, 
                r: "'Zu Befehl!' Dein Werk wird jetzt wie ein heiliger Schrein behandelt. Niemand patcht hier mehr was um. Deine Arbeit ist für die Ewigkeit." 
            },
            { 
                t: "Schild 'Kunstwerk' anbringen", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du klebst ein Schild dran: 'Modern Art - Do not touch'. Kollegen machen Fotos. Du bist der Michelangelo der IT." 
            }
        ]
    },
    {
        id: "srv_cable_spaghetti_2c",
        title: "Falsch verbunden",
        reqStory: "path_cable_yank",
        text: "Du steckst die Kabel panisch wieder rein. Die Anlage startet neu. Puh! Aber: Du hast wohl die Steckplätze vertauscht. Das ganze Haus ist jetzt falsch verbunden. Wenn man die Kantine anruft, landet man beim Chef.",
        opts: [
            { 
                t: "Durchs Haus rennen und Stecker tauschen", 
                m: 60, f: -20, a: 20, c: 5, 
                r: "Du rennst von Büro zu Büro und steckst Telefone um. 'Wieso klingelt mein Ficus?', fragt eine Kollegin. Du bist schweißgebadet, bis alles wieder stimmt." 
            },
            { 
                t: "Neue Liste schicken: 'Nummern geändert'", 
                m: 10, f: 10, a: -5, c: 10,
                r: "Du schickst eine Mail: 'Wegen... Sonnenflecken haben wir neue Durchwahlen.' Der Chef bekommt jetzt Pizza-Bestellungen. Das Chaos ist perfekt, aber du hast Pause." 
            },
            { 
                t: "'Das sortiert sich bis morgen.'", 
                m: 5, f: 10, a: 0, c: 20, 
                r: "Du lügst einfach. 'Die digitale Synchronisierung dauert 24 Stunden.' Hoffentlich merkt der Chef nicht, dass er jetzt unter 'Hausmeister' erreichbar ist." 
            }
        ]
    },
    {
        id: "srv_disco_led_1",
        title: "Disco im Serverraum",
        text: "Alle LEDs an den Server-Racks blinken synchron im 4/4-Takt. Es sieht aus wie eine Lichtorgel in einer Dorfdisco. Das System läuft extrem unrund und summt einen seltsamen Bass-Rhythmus.",
        opts: [
            { 
                t: "Techno-Playlist an & tanzen", 
                next: "path_disco_dance",
				rep: { "Dr. Wichtig": -2 },
                m: 15, f: 10, a: -20, c: 20, 
                r: "Du nutzt das Blinken als Lightshow und tanzt völlig enthemmt den Robot-Dance. Leider steht plötzlich der Chef in der Tür, starrt dich an und fragt trocken: 'Haben Sie einen Schlaganfall, Müller?'" 
            },
            { 
                t: "Brutal den Stecker ziehen", 
                next: "path_disco_plug",
                m: 5, f: 5, a: 10, c: 10, 
                r: "Klack. Ruhe. Klack. Lärm. Der Server fährt wieder hoch. Das Blinken ist weg. Die Datenbank meldet beim Start zwar 'Index Corruption', aber das ignorierst du gekonnt." 
            },
            { 
                t: "Im Handbuch nachschlagen", 
                req: "manual", 
                m: 20, f: -5, a: -5, c: -5, 
                r: "Du blätterst wild. Fehlercode '0xPARTY'. Ein Easter-Egg der Entwickler, das bei genau 100 Tagen Uptime anspringt. Du drückst die Tastenkombination 'STRG+ALT+NOFUN'. Das Blinken hört auf." 
            }
        ]
    },
    {
        id: "srv_disco_led_2b",
        title: "Der virale Hit",
        reqStory: "path_disco_dance",
        text: "Du dachtest, die Standpauke vom Chef war alles? Falsch. Ein Kollege hat deinen Tanz durch das Fenster der Serverraum-Tür gefilmt. Das Video 'Admin on Drugs' ist jetzt Nummer 1 im Firmen-Intranet.",
        opts: [
            { 
                t: "Dem Filmer das Internet drosseln", 
                m: 5, f: 5, a: -15, c: 5,
                r: "Du identifizierst die IP des Kollegen und drosselst seinen Port auf 56k-Modem-Geschwindigkeit. Er kann das Video nicht mehr hochladen. Er kann gar nichts mehr laden. Gerechtigkeit." 
            },
            { 
                t: "Dazu stehen: 'Das sind Moves!'", 
                m: 5, f: 0, a: -10, c: 5, 
				rep: { "Dr. Wichtig": -2 },
                r: "Du kommentierst das Video: 'Neid ist die höchste Form der Anerkennung.' Die Kollegen lachen, aber irgendwie finden sie dich jetzt cooler. Der Chef schüttelt nur den Kopf." 
            },
            { 
                t: "IT-Intranet löschen", 
                m: 10, f: -5, a: 10, c: 20, 
                r: "Du nutzt deine Admin-Rechte und löschst das Video (und das Backup). Das nennt man 'Streisand-Effekt'. Jetzt denken alle, du hast wirklich was zu verbergen." 
            }
        ]
    },
    {
        id: "srv_disco_led_2c",
        title: "Der Preis-Glitch",
        reqStory: "path_disco_plug",
        text: "Das Telefon klingelt sturm. 'Der Webshop spielt verrückt!' Durch deinen harten Neustart sind die Preise in der Datenbank verrutscht. Alle Produkte kosten jetzt 0,00 Euro. Die Bestellungen kommen im Sekundentakt rein.",
        opts: [
            { 
                t: "Preise manuell auf 9999€ setzen", 
				rep: { "Dr. Wichtig": 2 },
                m: 5, f: 5, a: -5, c: -5, 
                r: "Quick & Dirty SQL-Befehl: `UPDATE prices SET value = 9999`. Keiner kauft mehr was, aber der Fehler ist 'behoben'. Du bist ein Genie des Wahnsinns." 
            },
            { 
                t: "Webshop sofort vom Netz nehmen", 
				rep: { "Dr. Wichtig": -2 },
                m: 10, f: -5, a: 10, c: 20, 
                r: "Du kappst die Leitung. Der Shop ist offline. Der Schaden ist begrenzt, aber der Chef schreit: 'Wir verlieren tausende Euro pro Minute!' Tja, besser als Ware zu verschenken." 
            },
            { 
                t: "Backup einspielen", 
				rep: { "Dr. Wichtig": -2 },
                m: 60, f: -20, a: 10, c: 15, 
                r: "Du musst das Backup von gestern holen. Der Ladebalken kriecht. Der Chef steht hinter dir und atmet schwer: 'Jede Sekunde kostet Geld, Müller!' Du schwitzt." 
            }
        ]
    },
    {
        id: "srv_ac_failure_1",
        title: "Klima-Ausfall",
        text: "Die Klimaanlage ist ausgefallen. Es sind gefühlte 50 Grad im Serverraum. Die Lüfter der Racks laufen auf Maximum, es klingt wie auf einem Flugzeugträger. Die Server schwitzen.",
        opts: [
            { 
                t: "Eimerweise Eiswürfel holen", 
                next: "path_ac_ice",
                m: 10, f: 5, a: 0, c: 20, 
                r: "Du stellst Schüsseln mit Eis aus der Teeküche direkt in die Racks. Es kühlt tatsächlich, aber das Kondenswasser sammelt sich. Ein Tanz auf der Rasierklinge." 
            },
            { 
                t: "Sicherheitstür mit Stuhl aufkeilen", 
                next: "path_ac_door",
                m: 5, f: 0, a: 0, c: 10, 
                r: "Frische Flur-Luft strömt herein. Die Temperatur sinkt auf erträgliche 30 Grad. Aber: Eine dauerhaft offene Serverraum-Tür ist ein massives Sicherheitsrisiko." 
            },
            { 
                t: "MacGyver-Lösung: USB-Lüfter basteln", 
                req: "usb_stick", 
                m: 15, f: -5, a: -5, c: 0, 
                r: "Du fummelst an den Anschlüssen herum und improvisierst eine aktive Kühlung. Es bringt fast nichts, sieht aber extrem technisch aus - und genau so fühlt es sich an: nach Ingenieurskunst ohne messbare Wirkung." 
            }
        ]
    },
    {
        id: "srv_ac_failure_2a",
        title: "Der Paragraphen-Reiter",
        reqStory: "path_ac_door",
        text: "Der Datenschutzbeauftragte schiebt sich in den Türrahmen. Er sieht schwitzig und unglücklich aus. Er tippt auf sein Klemmbrett. 'Gemäß ISO 27001 und DSGVO Artikel 32 ist der physische Zugang zu beschränken. Ich muss das melden. Ich hasse meinen Job, aber Vorschrift ist Vorschrift.'",
        opts: [
            { 
                t: "'Wollen Sie ein Eis?'", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du bietest ihm ein Eis am Stiel an. Er seufzt, nimmt es und schließt die Augen. 'Ich habe nichts gesehen.' Korruption funktioniert immer." 
            },
            { 
                t: "Auf 'Notfall-Paragraf 7b' verweisen", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du erfindest eine Regel: 'Bei thermischer Überlastung greift die Hardware-Schutz-Klausel.' Er blinzelt verwirrt, nickt dann müde. 'Na gut. Wenn Sie das sagen. Ich schreibe... Ausnahme.' Er schlurft weg." 
            },
            { 
                t: "Ihm einen Vortrag über Hitze halten", 
                m: 15, f: -5, a: 10, c: 15, 
                r: "Du schreist ihn an: 'Wollen Sie, dass die Daten verbrennen?!' Er notiert 'Unkooperatives Verhalten' und geht. Das gibt Papierkram." 
            }
        ]
    },
    {
        id: "srv_ac_failure_2c",
        title: "Feuchtbiotop",
        reqStory: "path_ac_ice",
        text: "Physik ist grausam. Das Eis schmilzt schneller als gedacht. Pfützen bilden sich am Boden und kriechen gefährlich nah an die Steckerleisten. Die Luftfeuchtigkeit liegt bei 99%.",
        opts: [
            { 
                t: "Ablaufrinne aus Tape bauen", 
                req: "tape", 
                m: 15, f: -5, a: 5, c: 5, 
                r: "Du baust eine komplexe Konstruktion aus Panzertape, die das Wasser in einen Blumentopf leitet. Es ist hässlich, es ist Pfusch, aber es funktioniert. Ingenieurskunst!" 
            },
            { 
                t: "Kevin zum Wischen rufen", 
                rep: { "Kevin": -5 },
                m: 5, f: 10, a: -5, c: 0, 
                r: "'Kevin! Praktische Ausbildung: Rechenzentrums-Reinigung!' Der Azubi kommt mit dem Wischmopp. Er mault zwar, aber deine Füße bleiben trocken." 
            },
            { 
                t: "Schild 'Rutschgefahr' aufstellen", 
                m: 2, f: 15, a: 0, c: 10,
                r: "Du stellst das gelbe Warnschild auf. Damit bist du haftungsrechtlich raus. Dass der Stromverteiler gleich baden geht, ist ein technisches Detail." 
            }
        ]
    },
    {
        id: "srv_legacy_1",
        title: "Der versiegelte Schacht",
        text: "Hinter einem brummenden Rack entdeckst du eine alte Lüftungsklappe. Darauf klebt ein vergilbter Zettel: 'Nur öffnen bei Weltuntergang oder Börsencrash. Gez. Baron von Gier (Gründer).'",
        opts: [
            { 
                t: "Daran rütteln",
                m: 5, f: 0, a: 10, c: 0,
                r: "Verschlossen. Du brauchst wohl einen Hebel oder Code. Aber du hast Staub eingeatmet. *Hust*"
            },
            { 
                t: "Lüftungsklappe öffnen",
                next: "path_legacy_open",
                m: 5, f: -10, a: -5, c: 5,
                r: "Knirschend gibt die Klappe nach. Das war laut! Hoffentlich hat das keiner gehört. Dahinter ist ein kleiner, dunkler Hohlraum."
            }
        ]
    },
    {
        id: "srv_legacy_2",
        title: "Der alte Safe",
        reqStory: "path_legacy_open",
        text: "Du kriechst wieder in den Schacht. Der Safe hat ein Zahlenrad. Daneben ist eine Gravur: 'Das Gründungsjahr der Firma ist der Schlüssel.' (Du weißt es nicht, aber Kevin hat neulich '1899' an die Klotür gekritzelt).",
        opts: [
            { 
                t: "Code '1899' eingeben",
                loot: "corp_chronicles",
                m: 15, f: -5, a: -10, c: 0,
                r: "*Klick*. Der Mechanismus springt auf! Ein Gefühl von Triumph durchströmt dich. Es riecht nach altem Papier und Gier. (Neues Item und kann im Inventar gelesen werden!)"
            },
            { 
                t: "Code '1234' probieren",
                m: 10, f: 0, a: 15, c: 0,
                r: "Nichts passiert. Du trittst wütend gegen den Safe. Dein Zeh schmerzt."
            }
        ]
    },
    {
        id: "srv_ghost_1",
        title: "Das unbekannte Blinken",
        text: "Ganz hinten im dunklen Eck blinkt eine grüne LED an einem Gerät, das in keinem Inventarplan steht. Es ist staubbedeckt und summt leise.",
        opts: [
            { 
                t: "Staub abwischen & untersuchen",
                next: "path_ghost_found",
                m: 15, f: -10, a: 5, c: 0,
                r: "Du wischst den Staub weg. Aufkleber: 'Projekt PHOENIX - 1998 - Do Not Touch'. Es läuft seit 25 Jahren. Respekt."
            },
            { 
                t: "Ignorieren",
                m: 2, f: 10, a: 0, c: 5,
                r: "Nicht mein Ticket, nicht mein Problem. Du gehst weg."
            }
        ]
    },
    {
        id: "srv_ghost_2",
        title: "PHOENIX lebt",
        reqStory: "path_ghost_found",
        text: "Du stehst wieder vor dem mysteriösen 1998er Server. Heute macht er ein seltsames Geräusch. *Klick-Klack*. Als würde eine Festplatte sterben.",
        opts: [
            { 
                t: "Percussive Maintenance anwenden",
                m: 5, f: 5, a: -15, c: 20,
                r: "BÄM. Das Klicken hört auf. Das Summen wird ruhiger. Nichts entspannt so sehr wie Gewalt gegen Hardware."
            },
            { 
                t: "Monitor anschließen & fixen",
                m: 45, f: -25, a: 10, c: -10,
                r: "Du verbringst 45 Minuten damit, Sektoren zu reparieren. Es... es hostet die private Fan-Fiction-Seite des Gründers?! Egal, es läuft wieder."
            }
        ]
    },
    {
        id: "srv_alarm_stuck_1",
        title: "OHRENBLUTEN!",
        text: "Ein Fehlalarm im Serverraum! Die Sirene dröhnt mit 120 Dezibel. Du kannst nicht denken. Das Tastenfeld an der Wand blinkt: 'CODE EINGEBEN ZUM DEAKTIVIEREN'.",
        opts: [
            { 
                t: "Die 4711 eintippen",
                m: 5, f: 5, a: -20, c: -10, 
                r: "Stille. Himmlische Stille. Du hast den Tag gerettet, weil du dich an den Anschiss vom Hausmeister erinnert hast." 
            },
            { 
                t: "Mit dem Hammer draufhauen",
                req: "hammer",
                next: "path_alarm_smashed",
                m: 5, f: 0, a: 10, c: 40, 
                r: "Die Sirene ist kaputt, aber die Wand jetzt auch. Zwei Rechnungen, ein Schlag." 
            },
            { 
                t: "Rausrennen",
                m: 30, f: 0, a: 10, c: 10, 
                r: "Du wartest draußen 30 Minuten auf die Feuerwehr. Es war nur Staub im Sensor." 
            },
            { 
                t: "Die 0000 probieren",
                m: 5, f: 0, a: 20, c: 0, 
                r: "FALSCH. Die Sirene wird noch lauter. Deine Ohren klingeln für Stunden." 
            }
        ]
    },
    {
        id: "srv_alarm_stuck_2",
		char: "Egon",
        title: "Egon und das Loch",
        reqStory: "path_alarm_smashed",
        text: "Hausmeister Egon steht vor den Trümmern der Alarmanlage. Er fährt mit dem Finger über die tiefe Delle in der Wand. 'Das war kein technischer Defekt. Das war stumpfe Gewalt.' Er dreht sich langsam zu dir um. 'Hast du was gesehen?'",
        opts: [
            { 
                t: "Ihm dein Panzertape als Bestechung anbieten", 
                rem: "tape",
                rep: { "Egon": 10 },
                m: 5, f: 5, a: -10, c: -5, 
                r: "Egons Augen leuchten auf. 'Original Gaffa? Das Gute?' Er nimmt die Rolle, klebt ein Stück über das Loch in der Wand und grinst. 'Welches Loch? Ich sehe kein Loch.'" 
            },
            { 
                t: "'Da war eine riesige Ratte!'",
                rep: { "Egon": -10 }, 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Egon zieht eine Augenbraue hoch. 'Eine Ratte mit Hammer?' Sein Blick sagt alles. Er schreibt einen Bericht über 'Vandalismus', und der landet garantiert nicht in der Ablage, sondern beim Chef." 
            },
            { 
                t: "'Es war ein Notfall...'", 
                rep: { "Egon": 5 },
                m: 10, f: -5, a: -10, c: -10, 
                r: "Du erklärst das Ohrenbluten. Egon nickt brummend. 'Besser die Wand als das Trommelfell. Aber den Putz zahlst du.' Er deckt dich beim Chef, aber du schuldest ihm was." 
            }
        ]
    },
    {
        id: "srv_hdd_destroy_1",
        title: "Die Festplatten-Verschrottung",
        text: "Ein Karton mit 50 alten Festplatten steht im Serverraum. Aufschrift: 'Streng vertraulich: Datenschutzkonform vernichten!'. Daneben liegt das offizielle 'Entmagnetisierungs-Handgerät', das pro Platte gefühlt 100 manuelle Kurbelumdrehungen braucht.",
        opts: [
            { 
                t: "Brav nach Vorschrift kurbeln", 
                next: "path_hdd_kurbel",
                m: 90, f: -20, a: 20, c: 0, 
                r: "Du kurbelst dir einen Tennisarm. Nach 90 quälenden Minuten bist du schweißgebadet und deine Aggression pocht. Aber die Platten sind tot. Du schleppst dich zurück an deinen Platz." 
            },
            { 
                t: "Rohe Gewalt!", 
                req: "hammer",
                next: "path_hdd_hammer",
                m: 15, f: -5, a: -30, c: 0, 
                r: "Du legst die Platten auf den Boden und zertrümmerst sie mit dem Hammer. Es kracht, Splitter fliegen, dein Stresspegel sinkt. Du lässt das Trümmerfeld liegen und gehst zufrieden arbeiten." 
            },
            { 
                t: "Einfach in den Restmüll kippen", 
                next: "path_hdd_trash",
                m: 5, f: 15, a: 0, c: 0, 
                r: "Du kippst den gesamten Karton in die schwarze Tonne am Hinterausgang. Zeit gespart! Du wäschst dir die Hände in Unschuld und gehst unauffällig wieder in dein Büro." 
            }
        ]
    },
    {
        id: "srv_hdd_destroy_2a",
		char: "Dr. Wichtig",
        title: "Muskelkater & Lob",
        reqStory: "path_hdd_kurbel",
        text: "Etwas später taucht der Chef in deinem Büro auf. 'Müller, ich habe vorhin die sauber entmagnetisierten Platten im Lager gesehen. Das nenne ich Fleiß! Echte Handarbeit!' Er klopft dir hart auf die Schulter, ausgerechnet auf den Kurbel-Arm.",
        opts: [
            { 
                t: "Schmerz lächelnd ertragen", 
                rep: { "Dr. Wichtig": 15 },
                m: 5, f: 0, a: 5, c: -15, 
                r: "Du beißt die Zähne zusammen. Der Chef ist schwer beeindruckt von deinem Einsatz. Die elende Kurbel-Aktion hat dir beim Chef immerhin einen dicken Stein im Brett verschafft." 
            },
            { 
                t: "'Das ist ein Fall für die Berufsgenossenschaft!'", 
                rep: { "Dr. Wichtig": -5 },
                m: 5, f: 5, a: 10, c: 10, 
                r: "Der Chef verdreht die Augen. 'Immer diese Wehleidigkeit in der IT.' Das Lob ist verpufft und dein Arm tut immer noch weh." 
            },
            { 
                t: "Die Gunst nutzen: Pause fordern", 
                m: 30, f: 15, a: -10, c: 0, 
                r: "Du forderst eine ergonomische Regenerationspause. Der Chef nickt gnädig. Du machst 30 Minuten nichts und massierst deinen Unterarm." 
            }
        ]
    },
    {
        id: "srv_hdd_destroy_2b",
		char: "Egon",
        title: "Das Trümmerfeld",
        reqStory: "path_hdd_hammer",
        text: "Einige Zeit nach deiner Hammer-Aktion steht Hausmeister Egon bei seiner Runde kopfschüttelnd im Serverraum vor dem Berg aus zersplittertem Plastik und verbogenem Metall. Er ruft dich an: 'Wer hat hier gewütet?! Das kriege ich mit dem normalen Besen nie weg!'",
        opts: [
            { 
                t: "Ihm einen Energy Drink versprechen", 
                rem: "energy",
                rep: { "Egon": 5 },
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Ich stell dir nachher eine Dose hin, Egon.' Er brummt. 'Na gut. Aber mach das nie wieder.' Dein Hammer-Massaker bleibt unbestraft." 
            },
            { 
                t: "Ihn anmotzen: 'Dafür wirst du bezahlt!'",
                rep: { "Egon": -15 }, 
                m: 5, f: 0, a: 10, c: 10, 
                r: "Egon legt wortlos auf. Keine 10 Minuten später geht in deinem Büro grundlos das Licht und die Heizung aus. Lege dich niemals mit Egon an." 
            },
            { 
                t: "'Das war nur der Datenschutz-Troll.'",
                rep: { "Egon": -10 }, 
                m: 2, f: 5, a: 5, c: 5, 
                r: "Egon flucht lautstark am Telefon über die IT. Du hast dir wieder etwas Zeit gespart, aber Egon ist stinksauer auf dich." 
            }
        ]
    },
    {
        id: "srv_hdd_destroy_2c",
        title: "Datenleck",
        reqStory: "path_hdd_trash",
        text: "Es ist einiges an Zeit vergangen, seit du den Müll entsorgt hast. Dann eine panische Mail vom Compliance-Officer: 'Auf dem Hof fliegen alte Festplatten herum! Jemand hat die Tonne durchwühlt! Wer hat die nicht vernichtet?!'",
        opts: [
            { 
                t: "'Ich habe Zertifikate über die Vernichtung!'", 
                m: 5, f: 0, a: 10, c: 30, 
                r: "Das war dumm. Der Compliance-Officer verlangt sofort die Dokumente. Du hast dir dein eigenes Grab geschaufelt." 
            },
            { 
                t: "Azubi Kevin vorschieben", 
                rep: { "Kevin": -15 },
                m: 10, f: 5, a: 10, c: 20, 
                r: "Du schreibst zurück: 'Kevin sollte sie eigentlich schreddern!' Kevin bekommt einen gigantischen Einlauf. Du fühlst dich schrecklich, aber du bist sicher." 
            },
            { 
                t: "Rausrennen und Platten aufsammeln", 
                m: 30, f: -15, a: 20, c: 10, 
                r: "Du hetzt auf den Hof, kriechst auf dem Asphalt herum und sammelst die Laufwerke wieder ein. Schlimmste Demütigung, aber du verhinderst den ultimativen Super-GAU." 
            }
        ]
    },
    {
        id: "srv_paywall_1",
        title: "Die Ransomware vom Hersteller",
        text: "Eine uralte, proprietäre Server-Software verlangt ab heute eine Kreditkarten-Autorisierung für eine 'zwingende Lizenzverlängerung' (499€), sonst fährt sie in 5 Minuten runter. Der Chef sitzt im Flugzeug und ist nicht erreichbar. Die Buchhaltung hat schon Feierabend.",
        opts: [
            { 
                t: "Es runterfahren lassen", 
                next: "path_paywall_down", 
                m: 5, f: 10, a: 0, c: 30, 
                r: "Ohne Moos nix los. Du lässt den Timer ablaufen. Der Server fährt runter. Die Abteilung Logistik kann heute keine Pakete mehr verschicken. Das wird morgen ein riesiges Drama geben." 
            },
            { 
                t: "Die 'Schwarze Karte' einsetzen", 
                req: "black_card", 
                next: "path_paywall_card", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du tippst die Daten des nigerianischen Prinzen ein. *Zahlung akzeptiert*. Irgendwo in Zamunda wird ein Offshore-Konto belastet. Der Server schnurrt brav weiter. Kein Ausfall." 
            },
            { 
                t: "Den Timer per Skript immer wieder zurücksetzen", 
                req: "admin_pw", 
                next: "path_paywall_hack", 
                m: 20, f: -5, a: 15, c: 5, 
                r: "Du schreibst ein fieses Skript, das die Systemzeit des Servers alle 4 Minuten wieder zurückdreht. Ein extrem wackeliger Hack, der dir morgen garantiert um die Ohren fliegen wird." 
            }
        ]
    },
    {
        id: "srv_paywall_2a",
        title: "Rückfragen vom Support",
        reqStory: "path_paywall_card",
        text: "Das Telefon klingelt. Der Support der Server-Software ist dran. 'Vielen Dank für die Lizenzverlängerung. Aber wir müssen kurz nachfragen... warum hat Ihr Zahlungsdienstleister eine Rechnungsadresse in Lagos, Nigeria hinterlegt?'",
        opts: [
            { 
                t: "'Das ist unsere neue Briefkastenfirma.'", 
                m: 10, f: 0, a: 5, c: 10, 
                r: "Der Supportmitarbeiter räuspert sich. 'Steueroptimierung? Verstehe. Wir fragen nicht weiter nach.' Puh. Das war knapp an der Geldwäsche-Ermittlung vorbei." 
            },
            { 
                t: "Wortlos auflegen", 
                m: 2, f: 5, a: 5, c: 0, 
                r: "Die Lizenz ist bezahlt. Du musst mit niemandem darüber reden. Klick." 
            }
        ]
    },
    {
        id: "srv_paywall_2b",
        title: "Das Zeit-Paradoxon",
        reqStory: "path_paywall_hack",
        text: "Dein Zeitschleifen-Hack läuft. Leider hat sich der Mail-Server die manipulierte Systemzeit gezogen. Die gesamte Abteilung wundert sich gerade, warum alle frisch versendeten E-Mails das Datum '01.01.1970' tragen.",
        opts: [
            { 
                t: "Skript beenden & zahlen", 
                m: 20, f: -5, a: 15, c: 10, 
                r: "Du hältst den Hack an und zwingst den Chef per SMS zur Zahlung. Die Mails haben wieder das richtige Datum, aber du hast massiv Ärger wegen des Hacks." 
            },
            { 
                t: "'Das ist ein Feature.'", 
                m: 5, f: 10, a: 5, c: 10, 
                r: "Du behauptest, das sei eine 'Retro-Verschlüsselungsmethode'. Einige wenige Kollegen glauben es. Der Rest hält die IT für einen kompletten Witz." 
            }
        ]
    },
    {
        id: "srv_paywall_2c",
        title: "Logistik am Boden",
        reqStory: "path_paywall_down",
        text: "Der Logistik-Chef steht weinend bei dir im Büro. 'Die LKWs stauen sich bis auf die Landstraße! Der Barcode-Scanner-Server ist offline! Wir müssen die Pakete mit dem Edding beschriften!'" ,
        opts: [
            { 
                t: "Mitleid heucheln: 'Chef hat nicht bezahlt.'", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, f: 0, a: 5, c: 20, 
                r: "Du wirfst den CEO unter den Bus. Der Logistik-Chef ruft wütend in der Geschäftsführung an. Du lehnst dich zurück. Nicht dein Budget, nicht dein Problem." 
            },
            { 
                t: "Ihm einen Tacker geben", 
                m: 2, f: 5, a: 10, c: 5, 
                r: "'Hier, tackern Sie Lieferscheine dran.' Er starrt dich fassungslos an. 'Sie sind ein Monster, Müller.'" 
            }
        ]
    },
    {
        id: "srv_acid_1",
        title: "Ätzende Gefahr",
        text: "Die alte Notstrombatterie (USV) hat ein Leck! Gelbliche Batteriesäure tropft auf den Doppelboden und zischt. Sie frisst sich qualmend durch das Metallgitter direkt in Richtung der ungeschützten Hauptstromkabel. Das ist kurz vor der Kernschmelze.",
        opts: [
            { 
                t: "Den Feuerlöscher einsetzen", 
                req: "fire_ext", 
                next: "path_acid_freeze", 
                m: 5, f: 0, a: -10, c: 0, 
                r: "PFFFFT! Du sprühst CO2 direkt auf die Pfütze. Die Säure wird schockgefroren und erstarrt zu einem harmlosen, weißen Klumpen. Sauber, sicher, eiskalt gelöst." 
            },
            { 
                t: "Mit Pappe und alten Kartons aufsaugen", 
                next: "path_acid_cardboard", 
                m: 25, f: -10, a: 25, c: 0, 
                r: "Du wirfst Müll auf die Säure. Deine Finger brennen leicht, deine Schuhe haben jetzt weiße Flecken, aber die Hauptstromkabel sind erst einmal sicher. Ein gefährlicher Einsatz." 
            },
            { 
                t: "Hausmeister Egon rufen", 
                next: "path_acid_egon", 
                rep: { "Egon": -5 },
                m: 15, f: 5, a: 5, c: 5, 
                r: "Du holst Egon. Er sieht die Säure, flucht 10 Minuten am Stück über 'diesen teuren Elektro-Schrott' und streut Katzenstreu darauf. Er hasst dich dafür." 
            }
        ]
    },
    {
        id: "srv_acid_2a",
		char: "Egon",
        title: "Putzdienst",
        reqStory: "path_acid_freeze",
        text: "Egon kommt in den Serverraum, um nach dem Rechten zu sehen. Er betrachtet den gefrorenen Säure-Block auf dem Boden. Er schnappt sich Handfeger und Schaufel und fegt den harmlosen Eisklumpen einfach auf.",
        opts: [
            { 
                t: "Sich feiern lassen", 
                rep: { "Egon": 5 },
                m: 5, f: 5, a: -10, c: 0, 
                r: "Egon nickt dir anerkennend zu. 'Clever gelöst, IT-Boy. Schön sauber. Keine Dämpfe.' Du genießt den Moment des handwerklichen Respekts." 
            }
        ]
    },
    {
        id: "srv_acid_2b",
        title: "Durchgefressen",
        reqStory: "path_acid_cardboard",
        text: "Die Kartons haben nicht gereicht. Die ätzende Flüssigkeit hat die Pappe zerfressen. Es tropft jetzt wieder. Schlimmer noch: Es tropft auf eine Netzwerk-Schiene. Zwei Rechner in der Buchhaltung verlieren die Verbindung.",
        opts: [
            { 
                t: "Mit Tape abdichten", 
                req: "tape",
                m: 15, f: -5, a: 10, c: 5, 
                r: "Du wickelst säureresistentes (?) Klebeband um die Leckage. Die Dämpfe beißen in der Nase. Du hast das Problem nur aufgeschoben, aber das Netzwerk läuft wieder." 
            },
            { 
                t: "Die Buchhaltung ignorieren", 
                m: 2, f: 5, a: 5, c: 10, 
                r: "Zwei Ausfälle sind ein akzeptabler Kollateralschaden. Frau Elster wird ein Ticket schreiben. Das hat Zeit bis morgen." 
            }
        ]
    },
    {
        id: "srv_acid_2c",
		char: "Egon",
        title: "Egons Rache",
        reqStory: "path_acid_egon",
        text: "Egon hat den Säureschaden beseitigt, aber er hat dir eine Lektion hinterlassen. Er hat deinen Mülleimer im Büro mit einem Schloss verriegelt. Daran hängt ein Zettel: 'Gefahrgut-Entsorgung nur auf Antrag.'",
        opts: [
            { 
                t: "Müll in Flur werfen", 
                rep: { "Egon": -10 },
                m: 5, f: 5, a: 15, c: 5, 
                r: "Du kippst deinen Papiermüll trotzig vor die Tür. Der kalte Krieg zwischen dir und dem Facility Management ist eröffnet." 
            },
            { 
                t: "Müllschlucker-Schraubendreher ansetzen", 
                req: "screw", 
                m: 10, f: -5, a: 5, c: 0, 
                r: "Du knackst das billige Schloss in zwei Minuten. Egon ist unterschwellig beeindruckt, lässt den Eimer aber künftig einfach ungeleert stehen." 
            }
        ]
    },
    {
        id: "srv_rack_slip_1",
        title: "Extremes Gefälle",
        text: "Jemand hat beim Staubsaugen die Stellfüße von Rack 2 touchiert. Das 500kg schwere Konstrukt hat Schlagseite und kippt quälend langsam nach vorne. Wenn es fällt, reißt es die dicke Glasfaser-Hauptleitung aus der Decke!",
        opts: [
            { 
                t: "Win95-Handbuch drunterklemmen", 
                req: "manual", 
                next: "path_rack_manual", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du rammst den dicken Wälzer mit dem Fuß exakt unter die absinkende Ecke. Es stoppt den Fall auf den Millimeter genau. Historisches Wissen stützt moderne Technik." 
            },
            { 
                t: "Mit bloßen Händen abstützen", 
                next: "path_rack_hold", 
                m: 45, f: -10, a: 30, c: 5, 
                r: "Du drückst dich mit aller Kraft gegen das Rack, bis Egon endlich mit einem Wagenheber kommt. Du stehst 45 Minuten zitternd da. Dein Rücken ist danach absoluter Brei." 
            },
            { 
                t: "Als Lasso nutzen: LAN-Kabel", 
                rem: "cable", 
                next: "path_rack_cable", 
                m: 10, f: -5, a: 5, c: -10, 
                r: "Du wirfst das LAN-Kabel wie ein Cowboy um die Oberkante des Racks und zurrst das andere Ende an einem dicken Heizungsrohr fest. Das Gehäuse knirscht, aber es hält!" 
            }
        ]
    },
    {
        id: "srv_rack_slip_2a",
        title: "ISO-Schmerz",
        reqStory: "path_rack_cable",
        text: "Ein externer ISO-Sicherheitsprüfer starrt am Nachmittag kopfschüttelnd auf das schwere Rack, das nur durch ein lächerliches graues LAN-Kabel am Heizungsrohr vor dem Umkippen bewahrt wird. Er weint leise.",
        opts: [
            { 
                t: "'Besser als Domino.'", 
                m: 2, f: 5, a: 0, c: 5, 
                r: "Er muss zähneknirschend zustimmen. Optisch ein Albtraum, praktisch eine Meisterleistung." 
            },
            { 
                t: "'Das ist Cat7. Das hält.'", 
                m: 5, f: 0, a: 5, c: 10, 
                r: "Der Prüfer macht sich zitternd Notizen. 'Traglast von Datenkabeln... nicht genormt.' Er fällt dich beim Audit durch, aber du hast einen Server-Crash verhindert." 
            }
        ]
    },
    {
        id: "srv_rack_slip_2b",
		char: "Kevin",
        title: "Das gepresste Buch",
        reqStory: "path_rack_manual",
        text: "Kevin entdeckt dein Stütz-Manöver. Er sieht, wie 500 Kilo Server das antike Win95-Handbuch zu einem massiven Papierziegelstein komprimiert haben. 'Krass. Das ist ja wie in so einer Hydraulik-Presse auf YouTube!'",
        opts: [
            { 
                t: "Das Buch riskant bergen wollen", 
                m: 10, f: 0, a: 15, c: 5, 
                r: "Du trittst gegen das Buch, um es zu befreien. Das Rack wackelt bedrohlich auf. Du lässt es lieber. Das Handbuch ist jetzt ein ewiges Fundament der IT." 
            },
            { 
                t: "Es Kevin überlassen", 
                rep: { "Kevin": 5 },
                m: 2, f: 0, a: -5, c: 0, 
                r: "Kevin ist begeistert von der Zerstörung. Er macht Fotos für Reddit. Du lässt ihm die Freude." 
            }
        ]
    },
    {
        id: "srv_rack_slip_2c",
        title: "Arbeitsunfall",
        reqStory: "path_rack_hold",
        text: "Dein heroischer Muskel-Einsatz fordert Tribut. Du liegst im Pausenraum flach auf dem Rücken auf dem Fußboden. Eine Mail von Sabine (HR) kommt auf dem Handy an: 'Herr Müller, füllen Sie für den Rückenschmerz Formular AU-22 aus. Im Stehen!'",
        opts: [
            { 
                t: "Mit Panzertape den Rücken tapen", 
                req: "tape",
                m: 10, f: -5, a: -10, c: 0, 
                r: "Du wickelst dir heimlich Panzertape um die Lendenwirbelsäule wie eine stützende Korsage. Es hilft überraschend gut! Du kannst wieder humpeln." 
            },
            { 
                t: "Ignorieren und weiterliegen", 
                m: 20, f: 15, a: 10, c: 5, 
                r: "Du bleibst einfach auf dem Boden liegen. Eine halbe Stunde bezahlte Pause. Jemand steigt ungeschickt über dich drüber." 
            }
        ]
    },
    {
        id: "srv_coffee_cup_1",
        title: "Lebensgefahr im Rack",
        text: "Du betrittst den Serverraum und dein Herz bleibt stehen. Jemand hat einen vollen, dampfenden Kaffeebecher direkt auf das Lüftungsgitter des Core-Routers gestellt.",
        opts: [
            { 
                t: "Vor Wut gegen die Wand schlagen", 
                next: "path_cup_rage", 
                m: 5, f: 0, a: 25, c: 0, 
                r: "Das ist Sabotage! Du tobst minutenlang, bevor du den Becher sichernd wegnimmst." 
            },
            { 
                t: "Den Becher einfach austrinken", 
                next: "path_cup_drink", 
                m: 2, f: -5, a: -10, c: 5, 
                r: "Kaffee ist Kaffee. Du ext ihn. Er schmeckt nach Haselnuss, IT-Gefahr und Feigheit." 
            },
            { 
                t: "Den Becher in Zeitlupe entfernen", 
                next: "path_cup_slow", 
                m: 10, f: 0, a: 15, c: 0, 
                r: "Deine Hände zittern, aber du hebst das Ding vorsichtig hoch. Der Core-Router ist vor dem Flüssigkeitstod gerettet." 
            }
        ]
    },
    {
        id: "srv_coffee_cup_2a",
		char: "Chantal",
        title: "Die Täterin",
        reqStory: "path_cup_slow",
        text: "Du willst den Becher gerade ins Waschbecken bringen, da kommt Chantal herein. 'Oh danke, Müller! Den hab ich da extra abgestellt, damit der Router ihn warmhält!'",
        opts: [
            { 
                t: "Einen Vortrag über Hardware-Preise halten", 
                rep: { "Chantal": -3 },
                m: 15, f: 0, a: 10, c: 0, 
                r: "Du rechnest ihr 15 Minuten lang vor, was ein Core-Router kostet. Sie scrollt dabei genervt auf Insta." 
            },
            { 
                t: "Ihr den Becher wortlos in die Hand drücken", 
                rep: { "Chantal": -5 },
                m: 5, f: 0, a: 10, c: 0, 
                r: "Dein Blick ist tödlich. Sie nimmt den Kaffee und flüchtet." 
            }
        ]
    },
    {
        id: "srv_coffee_cup_2b",
        title: "Auf der Kamera",
        reqStory: "path_cup_rage",
        text: "Dein Wutanfall wurde von der Überwachungskamera im Serverraum aufgezeichnet. HR schickt dir eine Mail wegen 'aggressiven Verhaltens am Arbeitsplatz' und fordert eine Stellungnahme.",
        opts: [
            { 
                t: "Sich zähneknirschend entschuldigen", 
                m: 5, f: 0, a: 15, c: -5, 
                r: "Du schluckst deinen Stolz runter. HR ist zufrieden, aber du hast miese Laune." 
            },
            { 
                t: "Auf 'Gefahr im Verzug' plädieren", 
                m: 10, f: 0, a: 5, c: 5, 
                r: "Du schreibst einen dramatischen Report über Hardware-Sicherheit. HR versteht kein Wort und lässt die Sache fallen." 
            }
        ]
    },
    {
        id: "srv_coffee_cup_2c",
        title: "Zuckerschock",
        reqStory: "path_cup_drink",
        text: "Das war wohl doch kein normaler Kaffee. In dem Becher war ein doppelter Espresso mit vier Löffeln Zucker. Dein Puls schießt auf 180 und du fängst an zu schwitzen.",
        opts: [
            { 
                t: "Einen Stressball kneten", 
                req: "stressball", 
                m: 5, f: 0, a: -15, c: 0, 
                r: "Du misshandelst den Ball, bis deine Hände schmerzen. Es hilft tatsächlich, die Energie abzubauen." 
            },
            { 
                t: "Den Hyper-Fokus für Tickets nutzen", 
                m: 5, f: -10, a: 15, c: 0, 
                r: "Du schließt im Wahn fünf alte Tickets ab, bevor das Zittern einsetzt. Du bist fertig mit den Nerven, aber der Stapel ist spürbar geschrumpft." 
            }
        ]
    },
    {
        id: "srv_rat_cable_1",
        title: "Nager im System",
        text: "Unter dem Doppelboden hörst du ein verdächtiges Rascheln und Kratzen. Du hebst eine Gitterplatte an und siehst eine fette Ratte, die sich gerade durch die Isolierung eines Glasfaserkabels arbeitet!",
        opts: [
            { 
                t: "Einen alten Donut als Köder werfen", 
                rem: "donut", 
                next: "path_rat_donut", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Die Ratte lässt das Kabel los, schnappt sich blitzschnell den Donut und verschwindet im Dunkeln. Gefahr abgewendet! (Donut verbraucht)" 
            },
            { 
                t: "Mit dem Feuerlöscher vertreiben", 
                req: "fire_ext", 
                next: "path_rat_ext", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Du sprühst zischend CO2 in den Boden. Ein gigantischer Nebel entsteht, aber die Ratte flieht in Panik." 
            },
            { 
                t: "Platte schnell wieder zumachen", 
                next: "path_rat_ignore", 
                m: 2, f: 5, a: 10, c: 10, 
                r: "Aus den Augen, aus dem Sinn. Hoffentlich nagt sie das Kabel nicht komplett durch." 
            }
        ]
    },
    {
        id: "srv_rat_cable_2a",
        title: "Das Haustier",
        reqStory: "path_rat_donut",
        text: "Die Ratte scheint deinen Donut geliebt zu haben. Als du am Nachmittag wieder in den Serverraum gehst, sitzt sie genau an derselben Stelle und starrt dich erwartungsvoll an.",
        opts: [
            { 
                t: "Ihr einen Namen geben und sie ignorieren", 
                m: 5, f: 10, a: -5, c: 5, 
                r: "Du nennst sie 'Cisco' und lässt sie in Frieden. Solange sie keine Kabel frisst, seid ihr Kumpels." 
            },
            { 
                t: "Egon mit einer Mausefalle holen", 
                rep: { "Egon": 5 },
                m: 15, f: 0, a: 5, c: 0, 
                r: "Egon stellt gnadenlos Fallen auf. Du fühlst dich ein bisschen wie ein Verräter." 
            }
        ]
    },
    {
        id: "srv_rat_cable_2b",
        title: "Fehlalarm",
        reqStory: "path_rat_ext",
        text: "Der CO2-Nebel aus deinem Feuerlöscher-Angriff hat die optischen Rauchmelder im Serverraum ausgelöst. Die ohrenbetäubenden Sirenen heulen durch das ganze Gebäude.",
        opts: [
            { 
                t: "Panisch den Alarm quittieren", 
                m: 10, f: 0, a: 20, c: 0, 
                r: "Du rennst zur Brandmeldeanlage und tippst den Code ein. Du hast einen Tinnitus, aber die Feuerwehr bleibt zu Hause." 
            },
            { 
                t: "So tun, als wärst du gar nicht da gewesen", 
                m: 5, f: 5, a: 10, c: 15, 
                r: "Du schleichst dich raus. Kurz darauf evakuiert HR das halbe Gebäude." 
            }
        ]
    },
    {
        id: "srv_rat_cable_2c",
        title: "Durchgebissen",
        reqStory: "path_rat_ignore",
        text: "Deine Ignoranz wird hart bestraft. Die Ratte hat das Glasfaserkabel tatsächlich durchgebissen. Der komplette 2. Stock ist offline und das Telefon klingelt im Sekundentakt.",
        opts: [
            { 
                t: "Behaupten, der Provider hat eine Störung", 
                m: 5, f: 5, a: 5, c: 15, 
                r: "Du lügst den kompletten 2. Stock an. Die Leute beruhigen sich vorerst, aber das Problem bleibt bestehen." 
            },
            { 
                t: "Das Kabel mühsam spleißen", 
                m: 45, f: -10, a: 25, c: 0, 
                r: "Du liegst bäuchlings im Doppelboden und flickst die filigrane Faser. Dein Rücken schmerzt, aber das Netz läuft wieder." 
            }
        ]
    },
    {
        id: "srv_spilled_screws_1",
        title: "Das Schrauben-Massaker",
        text: "Du stolperst über ein Stromkabel und eine offene Kiste mit winzigen Gehäuseschrauben ergießt sich über den Gitterboden. Die meisten fallen klappernd nach unten in die Dunkelheit.",
        opts: [
            { 
                t: "Fluchen und alles liegen lassen", 
                next: "path_screws_ignore", 
                m: 2, f: 5, a: 15, c: 5, 
                r: "Dann fehlen eben ein paar Schrauben am nächsten Server. Das Rack wird schon nicht zusammenbrechen." 
            },
            { 
                t: "Mit Panzertape eine Angel basteln", 
                req: "tape", 
                next: "path_screws_tape", 
                m: 15, f: -5, a: 5, c: 0, 
                r: "Du wickelst Tape umwechselseitig an einen Stift und fischst blind herum. Du rettest 80% der Schrauben." 
            },
            { 
                t: "Ein neues Schrauben-Set nehmen", 
                loot: "screw", 
                next: "path_screws_loot", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Egal. Du greifst ins Regal und nimmst dir einfach eine neue Packung. Das Leben ist zu kurz zum Suchen." 
            }
        ]
    },
    {
        id: "srv_spilled_screws_2a",
        title: "Staub und Dreck",
        reqStory: "path_screws_tape",
        text: "Deine Klebe-Angel hat neben den Schrauben auch ein paar tote Insekten und riesige, schwarze Staubmäuse aus dem Unterboden geholt. Deine Hände sind extrem dreckig.",
        opts: [
            { 
                t: "Einfach an der Hose abwischen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du siehst jetzt aus wie ein KFZ-Mechaniker. Der Admin-Look schlechthin." 
            },
            { 
                t: "Gründlich im Bad Hände waschen", 
                m: 10, f: 5, a: 0, c: 0, 
                r: "Du investierst Arbeitszeit in Hygiene. Sehr löblich." 
            }
        ]
    },
    {
        id: "srv_spilled_screws_2b",
        title: "Engpass beim Umbau",
        reqStory: "path_screws_loot",
        text: "Du hast die neue Schraubenpackung genommen. Leider war das das allerletzte Set! Später beim Rack-Umbau fehlt dir nun exakt eine Schraube, um die Schiene zu fixieren.",
        opts: [
            { 
                t: "Das Gehäuse wackeln lassen", 
                m: 2, f: 5, a: 10, c: 5, 
                r: "Das Blech vibriert nun bei jeder Festplatten-Aktivität. Klingt furchtbar." 
            },
            { 
                t: "Einen Kabelbinder als Ersatz nehmen", 
                req: "zip_ties", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du zurrst das schwere Blech mit Plastik fest. Pfusch am Bau, aber es wackelt nicht." 
            }
        ]
    },
    {
        id: "srv_spilled_screws_2c",
		char: "Egon",
        title: "Tretmine",
        reqStory: "path_screws_ignore",
        text: "Egon betritt den Serverraum und tritt genau auf eine der verbliebenen, scharfen Schrauben. Sie bohrt sich tief in seine dicke Arbeitsschuhsohle. Er brüllt den ganzen Flur zusammen.",
        opts: [
            { 
                t: "Ihm einen Kaffee als Entschuldigung bringen", 
                rep: { "Egon": 5 },
                m: 10, f: 0, a: 5, c: 0, 
                r: "Du kaufst dir seine Vergebung. Egon liebt Kaffee mehr als heile Schuhe." 
            },
            { 
                t: "Sich leise im Büro verstecken", 
                rep: { "Egon": -5 },
                m: 5, f: 5, a: 5, c: 0, 
                r: "Du gehst in Deckung, bis das Fluchen auf dem Flur leiser wird." 
            }
        ]
    },
    {
        id: "srv_workout_2c",
		char: "Dr. Wichtig",
        title: "Der Beobachter",
        reqStory: "path_workout_watch",
        text: "Du stehst im Serverraum. Auf dem Monitor ploppt eine böse Mail vom Chef auf. 'Müller! Warum haben Sie vorhin 30 Minuten lang kauend im Flur gestanden und das Marketing angestarrt, während das Firmennetzwerk lahmt?!'",
        opts: [
            { 
                t: "Mail demonstrativ löschen", 
				rep: { "Dr. Wichtig": -10 },
                m: 2, f: 5, a: 5, c: 15, 
                r: "Deckel drauf, Problem vertagt. Das gibt später garantiert noch einen verbalen Anschiss, aber jetzt hast du deine Ruhe." 
            },
            { 
                t: "'Ich habe das WLAN kalibriert!'", 
				rep: { "Dr. Wichtig": 5 },
                m: 10, f: 5, a: 0, c: -5, 
                r: "Du antwortest blitzschnell mit technischen Fake-Fakten. Der Chef kauft es dir ab. 'WLAN kalibriert man also im Stehen. Verstanden.'" 
            }
        ]
    },
    {
        id: "srv_awkward_1",
		char: "Kevin",
        title: "Eine ungünstige Position",
        text: "Kevin ist im Serverraum unter das Rack 4 gekrochen und steckt fest. 'Chef, mein Pulli hat sich im Lüftergitter verfangen! Ich kriege den Arm nicht mehr vor!' Du musst ihm helfen. Du beugst dich tief über ihn und rüttelst an seinem Arm.",
        opts: [
            { 
                t: "Kräftig ziehen und schnaufen", 
                next: "path_awkward_elster", 
                m: 10, f: 0, a: 5, c: 15, 
                r: "Ihr keucht beide vor Anstrengung. Kevin stöhnt auf. In dem Moment öffnet sich die Tür. Frau Elster starrt euch an. Du hängst über Kevin. Sie wird kreidebleich, sagt 'Verzeihen Sie die Störung' und knallt die Tür wieder zu." 
            },
            { 
                t: "Ein Skript vom Boot-Stick nutzen", 
                rep: { "Kevin": 5 },
                req: "usb_stick",
                m: 5, f: -5, a: -5, c: 0, 
                r: "Du bootest den Server neu. Der Lüfter stoppt für 5 Sekunden. Kevin zieht den Arm raus. Kein peinliches Gerangel, keine Zuschauer. Perfekt gelöst." 
            },
            { 
                t: "Ihn auslachen und Fotos machen", 
                rep: { "Kevin": -10 },
                next: "path_awkward_photo", 
                m: 2, f: 10, a: -10, c: 5, 
                r: "Du zückst das Handy. Kevin wimmert. 'Bitte nicht ins Intranet!' Das gibt ein tolles Meme für die Weihnachtsfeier." 
            }
        ]
    },

    {
    id: "srv_tool_desk",
    title: "Werkzeugausgabe",
    text: "Im Serverraum hängt seit Neuestem ein Schild: 'WERKZEUGENTNAHME NUR ÜBER FORMULAR WZ-4'.\n\nDaneben ein Kasten mit Schloss. Daneben ein Stapel Formulare. Daneben ein Kugelschreiber an einer Kette.",
    opts: [
        {
            t: "Formular WZ-4 korrekt ausfüllen.",
            m: 25, f: -5, a: 20, c: -5,
            r: "Du füllst es aus. Feld 7 verlangt die Unterschrift des Werkzeugbeauftragten. Werkzeugbeauftragter ist laut Aushang Herr Brunner. Herr Brunner ist bis Ende des Monats im Sabbatical. Das Formular liegt jetzt in einem Fach, das niemand leert."
        },
        {
            t: "Den Kasten einfach aufmachen.",
            loot: "hammer",
            m: 5, f: 10, a: -5, c: 10,
            r: "Das Schloss ist nicht abgeschlossen. Es war nie abgeschlossen. Du nimmst einen Hammer und legst das Formular ordentlich zurück auf den Stapel — man muss ja nicht respektlos sein."
        },
        {
            t: "Schauen, was sonst noch drin ist.",
            loot: "screw",
            m: 10, f: 5, a: 0, c: 10,
            r: "Ein Satz Schraubendreher, eine Rolle Isolierband und, aus Gründen, ein einzelner Herrenschuh. Du nimmst den Schraubendreher. Den Schuh lässt du liegen, aber er beschäftigt dich noch eine Weile."
        }
    ]
},

/* ============================================================
   SERVERRAUM-WELLE 1 (v4.0.0)
   Fünf Basis-Events mit den bislang im Serverraum fehlenden
   Charakteren (Chantal, Markus, Dr. Wichtig, Gabi) plus ein
   charakterfreies Fund-Event als zweite admin_pw-Quelle.
   Jede Option setzt ein Flag, jedes Flag hat ein Folge-Event.
   ============================================================ */

{
    id: "srv_reel",
    char: "Chantal",
    title: "Content is King",
    text: "Chantal steht mit Ringlicht und Handy-Stativ zwischen den Racks. 'Müller! Perfekt, dass du da bist! Der Raum hat SO eine Vibe. Ich mache ein Recruiting-Reel: Hashtag TechLife, Hashtag Serverliebe. Du kannst Lampen-Assistent sein!'",
    opts: [
        {
            t: "Lampen-Assistent sein",
            rep: { "Chantal": 6 },
            next: "path_reel_star",
            m: 15, f: 5, a: 0, c: 5,
            r: "Du hältst fünfzehn Minuten ein Ringlicht, während Chantal vor Rack 3 'ganz spontan' lacht. Sie filmt dabei auch die Beschriftungen. Alle Beschriftungen. Das könnte draußen noch jemandem auffallen."
        },
        {
            t: "Auf den Datenschutz verweisen",
            rep: { "Chantal": -4 },
            next: "path_reel_dsgvo",
            m: 5, f: 0, a: 5, c: 0,
            r: "'Daten-was?' Chantal verdreht die Augen und packt zusammen. 'Deshalb findet uns auf Social Media auch keiner.' Sie zieht mit dem Ringlicht Richtung Großraumbüro ab. Da gibt es schließlich auch viel zu filmen."
        },
        {
            t: "Kleine Tech-Tour geben, ohne Kamera",
            rep: { "Chantal": 3 },
            next: "path_reel_tour",
            m: 10, f: 0, a: -5, c: 0,
            r: "Du erklärst ihr, warum die Lämpchen blinken. Chantal hört tatsächlich zu. 'Das ist ja wie ein Organismus!', sagt sie andächtig. Sie wird diesen Satz irgendwo wiederverwenden, so viel ist sicher."
        }
    ]
},
{
    id: "srv_reel_2a",
    title: "Viral",
    reqStory: "path_reel_star",
    text: "Chantals Reel hat über Nacht 40.000 Aufrufe. Der Ton ist ein Trend-Sound, die Kommentare sind begeistert. Bis auf einen: 'Nettes Patchpanel, sehr gut lesbar. Grüße, euer freundlicher Pentester.'",
    opts: [
        {
            t: "Chantal um Löschung bitten",
            rep: { "Chantal": -3 },
            m: 10, f: 0, a: 5, c: 0,
            r: "Sie löscht es. Unter Protest. '40.000 Aufrufe, Müller. VIERZIGTAUSEND. Weißt du, was Reichweite kostet?' Du weißt, was ein Sicherheitsvorfall kostet, aber das Argument sparst du dir."
        },
        {
            t: "Alles Gefilmte absichern",
            m: 25, f: -5, a: 10, c: -5,
            r: "Du änderst jedes Passwort und jede Beschriftung, die im Video zu sehen war. Zwei Stunden Arbeit für fünfzehn Sekunden Ruhm. Aber jetzt kann der Kommentar dir nichts mehr."
        },
        {
            t: "Kommentar melden und beten",
            m: 5, f: 10, a: 0, c: 5,
            r: "Du meldest den Kommentar als 'Spam' und hoffst, dass es ein Scherz war. Falls nicht, wirst du es früh genug merken. Wahrscheinlich zum ungünstigsten Zeitpunkt."
        }
    ]
},
{
    id: "srv_reel_2b",
    title: "Der Ausweich-Content",
    reqStory: "path_reel_dsgvo",
    text: "Chantal hat ihr Reel stattdessen im Großraumbüro gedreht. Sieht gut aus. Im Hintergrund allerdings: Bildschirme. Und auf einem davon, gestochen scharf, die offene Gehaltsliste von Frau Elster.",
    opts: [
        {
            t: "Frau Elster diskret warnen",
            rep: { "Frau Elster": 5 },
            m: 10, f: 0, a: 5, c: 0,
            r: "Frau Elster wird blass, dann sehr ruhig. 'Danke, Herr Müller.' Sie greift zum Hörer. Was auch immer sie jetzt mit Chantal bespricht: Du bist froh, nicht Chantal zu sein."
        },
        {
            t: "Anbieten, das Video zu schneiden",
            rep: { "Chantal": 5 },
            next: "path_reel_cutter",
            m: 20, f: 10, a: 0, c: 5,
            r: "Du schneidest die Gehaltsliste raus, legst Musik drunter und exportierst in drei Formaten. Chantal ist begeistert: 'Du bist jetzt mein Schnitt-Bro!' Dieser Titel wird Folgen haben."
        },
        {
            t: "Nichts sagen, nichts wissen",
            m: 2, f: 5, a: 0, c: 5,
            r: "Vielleicht merkt es niemand. Das Video hat ja erst ein paar hundert Aufrufe. Und Gehälter interessieren ja niemanden. In keiner Firma. Nie."
        }
    ]
},
{
    id: "srv_reel_2c",
    title: "Organische Reichweite",
    reqStory: "path_reel_tour",
    text: "Im Marketing-Meeting hat Chantal dich zitiert: 'Unser Server ist ein lebender Organismus.' Sie hat dich dabei als 'unseren Server-Flüsterer' angekündigt. Dr. Wichtig fand das 'visionär' und wünscht einen Vortrag. Für alle.",
    opts: [
        {
            t: "Den Titel 'Server-Flüsterer' ablehnen",
            rep: { "Chantal": -2 },
            m: 5, f: 0, a: 5, c: 0,
            r: "'Aber Personal Branding, Müller!' Chantal ist enttäuscht, akzeptiert es aber. Auf der Meeting-Folie steht jetzt nur noch 'IT'. Immerhin ehrlich."
        },
        {
            t: "Den Vortrag halten",
            rep: { "Chantal": 3 },
            m: 25, f: 0, a: 10, c: -5,
            r: "Du erklärst dreißig Leuten, was ein Server macht. Zwei hören zu, einer davon bist du. Aber Dr. Wichtig nickt die ganze Zeit wohlwollend, und das ist in dieser Firma die härteste Währung."
        },
        {
            t: "Kevin als Referenten vorschicken",
            rep: { "Kevin": -3 },
            m: 5, f: 5, a: 0, c: 5,
            r: "Kevin referiert voller Stolz über den 'Turbo-Modus' und die 'Wetter-Cloud'. Das Publikum applaudiert. Fachlich war das ein Totalschaden, und irgendwann fällt der auf dich zurück."
        }
    ]
},
{
    id: "srv_reel_3a",
    title: "Der Schnitt-Bro",
    reqStory: "path_reel_cutter",
    text: "Chantal steht wieder in der Tür, diesmal mit vier Speicherkarten. 'Schnitt-Bro! Ich hab da noch Material vom Sommerfest, vom Onboarding und vom Team-Event. Du machst das doch SO gut.'",
    opts: [
        {
            t: "Ein Video machen, gegen Gefallen",
            rep: { "Chantal": 4 },
            m: 20, f: 10, a: 0, c: 5,
            r: "Du schneidest das Sommerfest-Video, dafür schuldet dir das Marketing jetzt offiziell einen Gefallen. Chantal besiegelt den Deal per Handschlag. In dieser Firma ist das bindender als jeder Vertrag."
        },
        {
            t: "Klare Grenze ziehen",
            rep: { "Chantal": -3 },
            m: 5, f: 0, a: 5, c: 0,
            r: "'Einmalige Sache, Chantal.' Sie seufzt theatralisch, nimmt ihre Speicherkarten und geht. An der Tür dreht sie sich um: 'Falls du es dir anders überlegst: Ich hab auch Material von der Weihnachtsfeier.' Das war eine Drohung."
        }
    ]
},

{
    id: "srv_cloud",
    char: "Markus",
    title: "Die Private Cloud",
    text: "Markus klopft prüfend auf Rack 2 wie auf eine Motorhaube. 'Müller, kurze Frage unter Männern: Ich hab TechniPlast eine Private Cloud verkauft. Premium-Paket. Welcher von den Kästen hier ist jetzt die Cloud?'",
    opts: [
        {
            t: "Den Backup-Server als Cloud präsentieren",
            rep: { "Markus": 5 },
            next: "path_cloud_demo",
            m: 10, f: 5, a: 0, c: 5,
            r: "'DAS ist sie?' Markus fotografiert den Backup-Server von allen Seiten wie einen Neuwagen. 'Sieht teuer aus. Perfekt.' Er schickt die Fotos direkt an den Kunden. Direkt. An den Kunden."
        },
        {
            t: "Die Wahrheit sagen: Wir haben keine",
            rep: { "Markus": -5 },
            next: "path_cloud_truth",
            m: 10, f: 0, a: 5, c: 0,
            r: "'Details, Müller. DETAILS.' Markus winkt ab. 'Der Vertrag ist unterschrieben. Zeit ist Geld.' Er verlässt telefonierend den Raum. Du ahnst bereits, auf wessen Schreibtisch dieses Problem landen wird."
        },
        {
            t: "Einen USB-Stick als Cloud-Zugang überreichen",
            req: "usb_stick",
            rem: "usb_stick",
            rep: { "Markus": 7 },
            next: "path_cloud_stick",
            m: 5, f: 5, a: -5, c: 0,
            r: "Du beschriftest einen USB-Stick mit 'CLOUD – PREMIUM' und überreichst ihn feierlich. Markus nimmt ihn entgegen wie einen Firmenwagen-Schlüssel. 'DESHALB bist du der Techniker.' Der Stick ist jetzt in Vertriebshand. Was soll schon passieren."
        }
    ]
},
{
    id: "srv_cloud_2a",
    title: "Der Besichtigungstermin",
    reqStory: "path_cloud_demo",
    text: "Markus platzt herein: 'Kleines Update: TechniPlast will die Cloud BESICHTIGEN. Morgen. Mit ihrer Fachabteilung.' Er sagt 'Fachabteilung' wie andere Leute 'Steuerprüfung' sagen.",
    opts: [
        {
            t: "Rack 2 zur Vorzeige-Cloud ausbauen",
            rep: { "Markus": 4 },
            m: 20, f: 5, a: -5, c: 5,
            r: "Du montierst ein gebürstetes Schild ('PRIVATE CLOUD – ZUTRITT NUR FÜR PREMIUM'), räumst die Kabel auf und stellst blaues LED-Licht dazu. Es ist Theater. Aber es ist verdammt gutes Theater."
        },
        {
            t: "Markus beichten, dass das auffliegt",
            rep: { "Markus": -4 },
            m: 10, f: 0, a: 5, c: 0,
            r: "'Auffliegen? Müller, ich verkaufe seit zwanzig Jahren Dinge, die es nicht gibt. Die Fachabteilung will nur blinkende Lichter sehen.' Das Beunruhigende ist: Er hat vermutlich recht."
        },
        {
            t: "Kurzfristig ein Wartungsfenster ansetzen",
            m: 5, f: 10, a: 0, c: 5,
            r: "'Bedauerlicherweise ist die Cloud morgen in Wartung. Sicherheitsupdates, Sie verstehen.' Der Termin wird verschoben. Das Problem nicht. Es reift nur."
        }
    ]
},
{
    id: "srv_cloud_2b",
    title: "Eskalationsstufe Kunde",
    reqStory: "path_cloud_truth",
    text: "Ein Ticket von TechniPlast: 'Zugang zur gebuchten Private Cloud fehlt seit drei Tagen. Bitte um dringende Klärung.' Im CC: Dr. Wichtig. Natürlich im CC.",
    opts: [
        {
            t: "Heimlich eine echte Cloud aufsetzen",
            m: 30, f: -10, a: 5, c: -5,
            r: "Drei Stunden später läuft auf dem Backup-Server eine saubere Cloud-Lösung mit Kundenzugang. Es IST jetzt technisch eine Private Cloud. Markus hatte am Ende einfach recht, und das ist das Schlimmste daran."
        },
        {
            t: "Das Ticket an Markus weiterleiten",
            rep: { "Markus": -3 },
            m: 5, f: 5, a: 0, c: 5,
            r: "'Zuständigkeit: Vertrieb.' Klick. Markus wird das Ticket mit einem Rabattgutschein und purem Charme beantworten. Gelöst ist damit nichts, aber es ist jetzt offiziell nicht mehr dein Nichts."
        },
        {
            t: "Dem Kunden ehrlich antworten",
            rep: { "Dr. Wichtig": -4 },
            m: 10, f: 0, a: 5, c: 10,
            r: "Du schreibst eine höfliche, wahrheitsgemäße Antwort. Zwei Minuten später kommt eine Ein-Wort-Mail von Dr. Wichtig: 'Büro. Gleich.' Der CC war wirklich keine gute Idee."
        }
    ]
},
{
    id: "srv_cloud_2c",
    title: "Premium-Support",
    reqStory: "path_cloud_stick",
    text: "Das Telefon: TechniPlast. Eine sehr geduldige Stimme: 'Ihr Kollege hat uns den Cloud-Zugang übergeben. Er passt aber nicht in den SD-Karten-Schacht. Haben wir das falsche Abo?'",
    opts: [
        {
            t: "Geduldig durch die Anmeldung führen",
            m: 20, f: 0, a: 10, c: -5,
            r: "Fünfundvierzig Minuten Telefon-Support. Bei Minute dreißig sagt der Kunde: 'Ach, USB! Sagen Sie das doch gleich.' Du hast es gleich gesagt. Dreimal. Aber der Kunde ist jetzt glücklich, und nur das zählt. Angeblich."
        },
        {
            t: "Den Fall an Markus zurückgeben",
            rep: { "Markus": -4 },
            m: 5, f: 5, a: 0, c: 0,
            r: "Markus übernimmt das Gespräch und verkauft dem Kunden im selben Telefonat ein 'Cloud-Adapter-Kit' für 89 Euro. Du willst nicht wissen, was da im Karton landet. Du wirst es erfahren, wenn das nächste Ticket kommt."
        },
        {
            t: "Eine bebilderte Anleitung bauen",
            m: 15, f: -5, a: -5, c: -5,
            r: "Du erstellst eine Schritt-für-Schritt-Anleitung mit Screenshots und großen roten Pfeilen. Der Kunde bedankt sich überschwänglich. Die Anleitung wird dich überleben. Sie wird alle überleben."
        }
    ]
},

{
    id: "srv_ceo_visit",
    char: "Dr. Wichtig",
    title: "Rot ist Misserfolg",
    text: "Dr. Wichtig steht unangekündigt im Serverraum und mustert die Racks wie eine schlechte Quartalsbilanz. 'Müller. Warum blinkt hier alles ROT? Rot ist die Farbe des Misserfolgs. Ich will, dass hier alles GRÜN blinkt. Bis zum Board-Meeting.'",
    opts: [
        {
            t: "Kevin holen: 'Der Kollege erklärt das'",
            rep: { "Kevin": -4 },
            next: "path_led_kevin",
            m: 5, f: 5, a: 0, c: 5,
            r: "Kevin erklärt strahlend, Rot sei der 'Turbo-Modus'. Dr. Wichtig ist begeistert. Kevin ist stolz. Du hast ein schlechtes Gewissen und demnächst ein deutlich größeres Problem."
        },
        {
            t: "Die LEDs feierlich 'kalibrieren'",
            rep: { "Dr. Wichtig": 4 },
            next: "path_led_placebo",
            m: 10, f: 5, a: 0, c: -5,
            r: "Du drückst dreimal ernst auf einen Knopf, der nichts steuert, und nickst fachmännisch. 'Kalibriert.' Dr. Wichtig nickt zurück. 'Sehen Sie. Führung wirkt.' Er wird diese Geschichte weitererzählen. Oft."
        },
        {
            t: "Erklären, was die LEDs wirklich bedeuten",
            rep: { "Dr. Wichtig": -3 },
            next: "path_led_lecture",
            m: 15, f: 0, a: 5, c: 5,
            r: "Nach neunzig Sekunden Fachvortrag hebt er die Hand. 'Ich habe verstanden. Die roten sind die wichtigen.' Das hast du nicht gesagt. Aber das hat er verstanden. Da kommt etwas auf dich zu."
        }
    ]
},
{
    id: "srv_ceo_visit_2a",
    title: "Die Erfolgsgeschichte",
    reqStory: "path_led_placebo",
    text: "Dr. Wichtig hat im Board-Meeting die 'LED-Kalibrierung nach der Müller-Methode' präsentiert. Die Investoren waren begeistert. Jetzt wünschen sie ein Whitepaper. Über die Methode. Die es nicht gibt.",
    opts: [
        {
            t: "Chantal schreiben lassen",
            rep: { "Chantal": 4 },
            m: 10, f: 5, a: 0, c: 0,
            r: "Chantal liefert acht Seiten mit Infografiken, einem Zitat von Steve Jobs und dem Wort 'Journey' in jeder zweiten Zeile. Es ist objektiv furchtbar und exakt das, was alle wollten. Sie ist glücklich, du bist raus."
        },
        {
            t: "Vier Seiten Nichts schreiben",
            rep: { "Dr. Wichtig": 5 },
            m: 30, f: 10, a: 5, c: -5,
            r: "Du schreibst über 'proaktive visuelle Infrastruktur-Governance' und 'signalbasierte Führungskultur'. Kein Satz bedeutet etwas. Es wird das meistzitierte Dokument deiner Karriere werden."
        },
        {
            t: "Ablehnen und eine Grenze ziehen",
            rep: { "Dr. Wichtig": -5 },
            m: 10, f: 0, a: 5, c: 5,
            r: "'Ein Whitepaper über einen Aus-Knopf kann ich nicht verantworten.' Dr. Wichtig schaut dich lange an. 'Verantwortung. Interessantes Wort für jemanden in Ihrer Gehaltsklasse.' Das Gespräch ist beendet."
        }
    ]
},
{
    id: "srv_ceo_visit_2b",
    title: "Die wichtigen Roten",
    reqStory: "path_led_lecture",
    text: "Eine Mail von Dr. Wichtig: 'Wie besprochen benötige ich ein Dashboard mit allen roten Lämpchen. Aber in Grün. Mit Firmenlogo. Für mein Tablet.' Es gibt keinen Kontext, in dem dieser Satz Sinn ergibt.",
    opts: [
        {
            t: "'Steht auf der Cloud-Roadmap' antworten",
            m: 5, f: 10, a: 0, c: 5,
            r: "'Roadmap' ist das Zauberwort, mit dem in dieser Firma Wünsche eingeschläfert werden. Dr. Wichtig antwortet mit einem Daumen-hoch. Das Thema wird wiederkommen. Themen kommen immer wieder."
        },
        {
            t: "Ein Dashboard bauen, das immer Grün zeigt",
            m: 25, f: 5, a: 0, c: -10,
            r: "Das Dashboard zeigt permanent grüne Kreise, das Logo und den Schriftzug 'ALLES IM GRIFF'. Es ist mit nichts verbunden. Dr. Wichtig prüft es jeden Morgen. Es ist das beruhigendste Werkzeug der Firmengeschichte."
        },
        {
            t: "Ein echtes Monitoring aufsetzen",
            m: 35, f: -10, a: 5, c: -5,
            r: "Du nimmst dir den halben Nachmittag und baust ein sauberes Monitoring mit Ampel-Ansicht. Dr. Wichtig sieht nur die Ampeln, du siehst endlich alles. Diese Investition wird sich noch auszahlen."
        }
    ]
},
{
    id: "srv_ceo_visit_2c",
    title: "Turbo-Modus für alle",
    reqStory: "path_led_kevin",
    text: "Dr. Wichtig hat eine Rundmail verschickt: Ab sofort sollen alle Systeme 'im Turbo-Modus laufen wie im Serverraum'. Der Vertrieb fragt bereits, wo man den einschaltet. Gabi hat drei Anrufe dazu durchgestellt.",
    opts: [
        {
            t: "Kevin zum Turbo-Beauftragten machen",
            rep: { "Kevin": 4 },
            m: 5, f: 5, a: 0, c: 5,
            r: "Kevin beantwortet ab sofort alle Turbo-Anfragen. Mit Begeisterung, eigener Mail-Signatur ('Turbo-Beauftragter') und komplett erfundenen Fakten. Er ist beschäftigt, glücklich und erstaunlich überzeugend."
        },
        {
            t: "Eine 'Turbo-Taste' für alle bauen",
            m: 15, f: 5, a: -5, c: 5,
            r: "Du verteilst eine Desktop-Verknüpfung namens 'TURBO-MODUS'. Sie ändert das Hintergrundbild auf einen roten Farbverlauf. Die gefühlte Systemgeschwindigkeit steigt firmenweit um dreißig Prozent. Placebo ist auch Performance."
        },
        {
            t: "Die Rundmail sachlich richtigstellen",
            rep: { "Dr. Wichtig": -4 },
            m: 10, f: 0, a: 5, c: 5,
            r: "Deine Antwort an alle beginnt mit 'Kleine technische Einordnung' und endet mit betretenem Schweigen im Verteiler. Dr. Wichtig hat sie gelesen. Korrigiert werden gehört nicht zu seinen Hobbys."
        }
    ]
},

{
    id: "srv_gabi_tipp",
    char: "Gabi",
    title: "Der kleine Dienstweg",
    text: "Gabi vom Empfang steckt den Kopf in den Serverraum und senkt die Stimme. 'Ich sag's nur dir, weil du's bist: Der Wartungsvertrag für die Klimaanlage läuft HEUTE aus. Hab ich zufällig mitgehört. Die Verlängerung liegt seit Wochen unbearbeitet in einem Postfach.'",
    opts: [
        {
            t: "Sofort die Wartungsfirma anrufen",
            rep: { "Gabi": 5 },
            next: "path_klima_call",
            m: 20, f: 0, a: 5, c: -5,
            r: "Die Firma verlängert telefonisch, 'die Unterschrift reichen Sie einfach nach'. Gabi zwinkert und verschwindet. Du schuldest ihr etwas. Und der Buchhaltung eine Erklärung, warum du am offiziellen Weg vorbei bestellt hast."
        },
        {
            t: "'Danke, kümmere ich mich später drum'",
            rep: { "Gabi": -3 },
            next: "path_klima_later",
            m: 2, f: 10, a: 0, c: 0,
            r: "Gabi zieht eine Augenbraue hoch. 'Später. Klar.' Sie kennt dieses 'Später'. Die Klimaanlage summt derweil ahnungslos vor sich hin. Noch."
        },
        {
            t: "Mit Egon einen Plan B vorbereiten",
            rep: { "Egon": 4 },
            next: "path_klima_egon",
            m: 10, f: 5, a: 0, c: 0,
            r: "Egon hört sich das Problem an und nickt langsam. 'Klimaanlage. Neumodischer Kram.' Er verschwindet Richtung Keller. Was auch immer er dort holt: Es ist von 1987, und es wird funktionieren."
        }
    ]
},
{
    id: "srv_gabi_tipp_2a",
    title: "Der Beleg",
    reqStory: "path_klima_call",
    text: "Frau Elster steht mit der nachgereichten Rechnung im Serverraum. Sie hält sie mit zwei Fingern, wie ein Beweisstück. 'Herr Müller. Bestellungen laufen über MICH. Ich finde hier keine Bestellnummer. Möchten Sie mir etwas erzählen?'",
    opts: [
        {
            t: "'Es war ein NOTFALL'",
            rep: { "Frau Elster": -5 },
            m: 5, f: 5, a: 0, c: 5,
            r: "'Ein Notfall.' Sie notiert etwas in einem kleinen Buch. Du hast dieses Buch noch nie gesehen, aber du weißt sofort: In diesem Buch will man nicht stehen."
        },
        {
            t: "Gabi als Quelle benennen",
            rep: { "Gabi": -4, "Frau Elster": -2 },
            m: 5, f: 5, a: 0, c: 0,
            r: "'Vom Empfang wussten Sie das also.' Frau Elster zieht ab, um einer anderen Spur zu folgen. Du hast gerade deine beste Informationsquelle verraten. Gabi grüßt dich ab jetzt nur noch dienstlich."
        },
        {
            t: "Zerknirscht alle Formulare nachreichen",
            rep: { "Frau Elster": 4 },
            m: 15, f: 0, a: 5, c: -5,
            r: "Du füllst das Beschaffungsformular aus, rückwirkend und in dreifacher Ausfertigung. Frau Elster prüft jede Zeile und nickt schließlich. 'Ordnung ist keine Schikane, Herr Müller. Ordnung ist Fürsorge.' Fast hätte sie gelächelt."
        }
    ]
},
{
    id: "srv_gabi_tipp_2b",
    title: "32 Grad",
    reqStory: "path_klima_later",
    text: "Es ist warm geworden. Sehr warm. Rack 3 klingt wie ein startender Airbus, das Thermometer zeigt 32 Grad, und irgendwo piept etwas, das vorher nie gepiept hat.",
    opts: [
        {
            t: "Not-Verlängerung zum Wucherpreis",
            m: 10, f: 0, a: 5, c: 10,
            r: "Die Wartungsfirma kennt ihre Verhandlungsposition genau: Expresszuschlag, Wochenendpauschale, 'Reaktivierungsgebühr'. Du unterschreibst alles. Diese Rechnung wird in der Buchhaltung Fragen aufwerfen. Laute Fragen."
        },
        {
            t: "Server 3 kontrolliert herunterfahren",
            m: 10, f: 0, a: -5, c: 10,
            r: "Weniger Last, weniger Hitze, sauber gelöst. Allerdings hat der halbe Vertrieb jetzt 'kein System'. Du zählst innerlich rückwärts, bis Markus persönlich anruft. Drei. Zwei. Eins."
        },
        {
            t: "Türen auf, Ventilatoren-Notaufbau",
            m: 20, f: -5, a: 10, c: 5,
            r: "Du organisierst jeden Ventilator des Gebäudes und baust eine Windschneise. Das Ganze wirkt wie eine Kunstinstallation, aber die Temperatur fällt. Der halbe Flur fragt, was hier los ist. Gute Frage."
        }
    ]
},
{
    id: "srv_gabi_tipp_2c",
    title: "Baujahr '87",
    reqStory: "path_klima_egon",
    text: "Egon hat einen Industrie-Lüfter von der Größe eines Kleinwagens installiert. Er läuft. Der ganze Flur weiß, DASS er läuft. Man muss im Serverraum jetzt etwas lauter denken.",
    opts: [
        {
            t: "Kopfhörer auf: Problem gelöst",
            req: "headphones",
            m: 2, f: 5, a: -5, c: 0,
            r: "Für dich ist es jetzt still. Die Beschwerden der Kollegen hörst du praktischerweise auch nicht mehr. Egons Lüfter und du: eine Zweckgemeinschaft mit exzellenter Geräuschkulisse."
        },
        {
            t: "Egon zur Drosselung überreden",
            rep: { "Egon": -3 },
            m: 10, f: 0, a: 5, c: 0,
            r: "'Drosseln? Der läuft auf EINS von DREI.' Egon dreht widerwillig an einem Bakelit-Knopf. Es wird leiser. Egon murmelt etwas über Leute, die früher auch schon alles besser wussten."
        },
        {
            t: "Den Lärm als Feature verkaufen",
            rep: { "Chantal": 3 },
            m: 5, f: 5, a: 0, c: 0,
            r: "Chantal kommt vorbei, hört den Lüfter und ist elektrisiert: 'Das ist ja total industrial! Wie ein Techno-Club!' Sie überlegt laut, ob man hier 'Deep-Work-Sessions' anbieten könnte. Der Lärm bleibt. Er hat jetzt Branding."
        }
    ]
},

{
    id: "srv_folder_2009",
    title: "Notfallplan 2009",
    text: "Hinter dem Rack klemmt ein verstaubter Aktenordner: 'NOTFALLPLAN 2009 – STRENG VERTRAULICH'. Dein Vorgänger hat ihn dort offenbar deponiert. Oder versteckt. Der Unterschied ist in dieser Firma fließend.",
    opts: [
        {
            t: "Zurückklemmen - ein Fall für Später-Müller",
            next: "path_folder_later",
            m: 2, f: 10, a: 0, c: 0,
            r: "Der Ordner verschwindet wieder hinter dem Rack. Später-Müller wird sich darum kümmern. Später-Müller hasst dich jetzt schon. Und du bist nicht der Einzige, der hier unten gelegentlich herumstöbert."
        },
        {
            t: "Durchblättern",
            loot: "admin_pw",
            next: "path_folder_read",
            m: 15, f: -5, a: 5, c: 0,
            r: "Zwischen Faxanleitungen und einem Evakuierungsplan mit eingezeichneter Raucherecke klebt ein Post-it: 'root-PW – NICHT VERLIEREN!!'. Es hat siebzehn Jahre überlebt. Es funktioniert noch. Natürlich funktioniert es noch."
        },
        {
            t: "Aus Datenschutzgründen ungelesen schreddern",
            next: "path_folder_shred",
            m: 10, f: 0, a: -5, c: -5,
            r: "Du führst den Ordner fachgerecht der Datenvernichtung zu. Sehr professionell, sehr endgültig. Allerdings führt irgendjemand in dieser Firma Buch über registrierte Akten. Du weißt auch schon, wer."
        }
    ]
},
{
    id: "srv_folder_2009_2a",
    title: "Seite 34",
    reqStory: "path_folder_read",
    text: "Im Anhang des Notfallplans: ein vergilbter Lageplan mit der Markierung 'Zweitschlüssel Serverraum – Deckenplatte 4'. Du schaust nach oben. Deckenplatte 4 sitzt schief. Sie sitzt schon immer schief.",
    opts: [
        {
            t: "Egon beiläufig auf 2009 ansprechen",
            rep: { "Egon": 5 },
            m: 20, f: 10, a: -5, c: 0,
            r: "Egon lehnt sich an den Türrahmen und erzählt zwanzig Minuten von 2009. Vom alten Chef, vom Hochwasser im Keller, vom Kollegen, 'der mit dem Fax konnte'. Du erfährst nebenbei mehr über diese Firma als aus jedem Organigramm."
        },
        {
            t: "Auf einen Stuhl steigen und nachsehen",
            m: 10, f: 0, a: 5, c: 0,
            r: "Kein Schlüssel. Nur eine Zettelnotiz in säuberlicher Handschrift: 'Verliehen an E.' Das E ist mit Bleistift dreimal nachgezogen. E wie Egon. Der wahre Herrscher des Gebäudes, seit Jahrzehnten amtierend."
        },
        {
            t: "Die Decke Decke sein lassen",
            m: 2, f: 5, a: 0, c: 0,
            r: "Manche Dinge sollen schief bleiben. Du hast genug Baustellen auf Bodenhöhe. Aber jedes Mal, wenn du den Raum betrittst, wird Platte 4 dich ansehen. Schief."
        }
    ]
},
{
    id: "srv_folder_2009_2b",
    title: "Das Vernichtungsprotokoll",
    reqStory: "path_folder_shred",
    text: "Frau Elster erscheint, die Inventarliste im Anschlag. 'Herr Müller. Sie haben einen registrierten Ordner vernichtet. Inventarnummer 2009-17. Ich benötige das Vernichtungsprotokoll. Sie HABEN doch ein Vernichtungsprotokoll?'",
    opts: [
        {
            t: "Das Protokoll ordnungsgemäß nachreichen",
            rep: { "Frau Elster": 4 },
            m: 15, f: 0, a: 5, c: -5,
            r: "Formular DV-7, dreifach, mit Datum, Uhrzeit und Zeugenfeld. Du lässt das Zeugenfeld frei und Frau Elster trägt sich selbst ein. 'Ich habe es ja quasi miterlebt.' Bürokratie kann auch Komplizenschaft sein."
        },
        {
            t: "'Welcher Ordner?'",
            rep: { "Frau Elster": -5 },
            m: 2, f: 5, a: 0, c: 5,
            r: "Frau Elster sieht dich an. Dann zückt sie ein kleines Buch und notiert etwas, ohne den Blick zu senken. Das war ein Fehler. Man lügt Frau Elster nicht ins Gesicht. Man lügt Frau Elster überhaupt nicht an."
        },
        {
            t: "Sie auf einen Kaffee einladen und alles erklären",
            rep: { "Frau Elster": 6 },
            m: 20, f: 10, a: -10, c: 0,
            r: "Bei einem Kaffee erklärst du die Sache mit dem Datenschutz. Frau Elster taut auf, erzählt von früheren Aktenbergen und irgendwann, ganz beiläufig, von Rüdiger. Am Ende sagt sie: 'Das Protokoll reichen Sie trotzdem nach.' Aber sie lächelt dabei."
        }
    ]
},
{
    id: "srv_folder_2009_2c",
    title: "Der Ordner wandert",
    reqStory: "path_folder_later",
    text: "Der Ordner ist weg. An seiner Stelle klemmt jetzt eine Haftnotiz: 'Spannende Lektüre! Hab ihn mir mal ausgeliehen. LG Kevin :)' Der Smiley ist mit besonders viel Schwung gemalt.",
    opts: [
        {
            t: "Abwarten, was passiert",
            m: 2, f: 10, a: 0, c: 5,
            r: "Kevin. Ein Ordner voller Altlasten. Keine Aufsicht. Du entscheidest dich aktiv dafür, das nicht zu deinem Problem zu machen. Es wird trotzdem dein Problem werden, nur eben später und größer."
        },
        {
            t: "Ihm den Ordner offiziell übergeben",
            rep: { "Kevin": 4 },
            m: 10, f: 5, a: 0, c: 0,
            r: "'Kevin, das ist jetzt dein Projekt: Digitalisierung des Notfallplans.' Kevin strahlt und scannt ab sofort jede Seite einzeln. Als eigene PDF. Einzeln. Er ist beschäftigt, stolz und für Wochen komplett harmlos."
        },
        {
            t: "Kevin SOFORT suchen",
            rep: { "Kevin": -3 },
            m: 15, f: -5, a: 5, c: 0,
            r: "Du findest ihn in der Teeküche, den Ordner auf Seite 34 aufgeschlagen. 'Wusstest du, dass es einen Zweitschlüssel gibt?', ruft er quer durch den Raum. Jetzt weiß es die ganze Teeküche. Die Teeküche weiß ab jetzt alles."
        }
    ]
},


/* ============================================================
   SERVERRAUM-WELLE 2 (v4.0.0)
   USV, Egons Schattenwirtschaft, Patchpanel, der fremde Stick
   und das Doku-To-do. Neue Loot-Quellen für fire_ext (2x),
   cable und usb_stick; Gates auf cable und headphones.
   Gabi und Kevin bekommen mehr (überwiegend positive) Ruf-Stellen.
   ============================================================ */

{
    id: "srv_usv_beep",
    title: "Das Piepen",
    text: "Die USV piept. Alle dreißig Sekunden, exakt. Kein Fehlercode, keine rote Lampe, nur dieses eine, präzise Piep. Es ist Tag drei. Niemand sonst scheint es zu hören. Du hörst es inzwischen sogar zuhause.",
    opts: [
        {
            t: "Kopfhörer auf und weiterleben",
            req: "headphones",
            next: "path_usv_ignore",
            m: 2, f: 5, a: -5, c: 0,
            r: "Mit Noise-Cancelling existiert das Piepen einfach nicht mehr. Eine elegante Lösung für dich persönlich. Die USV und ihr Problem bleiben allerdings Teil der objektiven Realität."
        },
        {
            t: "Systematische Fehlersuche",
            next: "path_usv_debug",
            m: 30, f: -10, a: 10, c: -5,
            r: "Du gehst Kabel für Kabel, Log für Log durch. Nach einer halben Stunde die Erkenntnis: Batterie-Selbsttest fehlgeschlagen. Die Batterie ist so alt wie deine Anstellung. Es braucht Ersatz, und zwar bald."
        },
        {
            t: "Den Piepser mit Watte stopfen",
            next: "path_usv_mute",
            m: 5, f: 10, a: 0, c: 5,
            r: "Du stopfst Watte in den Lautsprecher. Stille. Herrliche, verantwortungslose Stille. Die USV meldet weiterhin pflichtbewusst ihren Notfall. Nur eben an niemanden mehr."
        }
    ]
},
{
    id: "srv_usv_beep_2a",
    title: "Die Ersatzbatterie",
    reqStory: "path_usv_debug",
    text: "Die Recherche ergibt zwei Optionen: Originalbatterie für 340 Euro mit sechs Wochen Lieferzeit, oder ein Nachbau vom Online-Händler mit Bewertungen wie 'kam warm an, funktioniert aber'. Die USV piept dazu im Takt.",
    opts: [
        {
            t: "Original bestellen, Formular-Marathon",
            rep: { "Frau Elster": 3 },
            m: 20, f: 0, a: 10, c: -5,
            r: "Formular, Freigabe, Bestellnummer - alles korrekt. Frau Elster nickt anerkennend, als der Antrag über ihren Tisch geht. Sechs Wochen Piepen noch, aber mit reinem Gewissen."
        },
        {
            t: "Den warmen Nachbau riskieren",
            m: 10, f: 5, a: 0, c: 5,
            r: "Zwei Tage Lieferzeit, halber Preis, keine Bestellnummer. Du kaufst auf Firmenkosten am Prozess vorbei. Das Piepen endet bald - die Frage, was bei der nächsten Inventur auffällt, beginnt dafür."
        },
        {
            t: "Kevin eine Batterie 'organisieren' lassen",
            rep: { "Kevin": -5 },
            m: 5, f: 10, a: 5, c: 0,
            r: "Kevin kennt 'einen, der einen kennt'. Am nächsten Tag steht eine gebrauchte Autobatterie mit Starthilfekabeln neben der USV. Du wirst das auf keinen Fall anschließen. Hoffst du."
        }
    ]
},
{
    id: "srv_usv_beep_2b",
    title: "Der stille Alarm",
    reqStory: "path_usv_mute",
    text: "Kurzer Stromwackler im Gebäude. Die USV übernimmt heldenhaft - für elf Sekunden. Dann ist ihre müde Batterie leer, und Rack 5 geht einfach aus. Die Watte im Lautsprecher hat derweil zuverlässig jede Warnung geschluckt.",
    opts: [
        {
            t: "Alles hochfahren, Ursache verschweigen",
            m: 20, f: 10, a: 10, c: 5,
            r: "Vierzig Minuten Boot-Reihenfolge, Dienste prüfen, Daumen drücken. Läuft wieder. Offizielle Ursache: 'Netzschwankung'. Die Watte nimmst du unauffällig wieder raus. Sie hat genug angerichtet."
        },
        {
            t: "Den Vorfall ehrlich dokumentieren",
            m: 15, f: -5, a: 5, c: 10,
            r: "Du schreibst einen sauberen Vorfallsbericht, inklusive der Watte. Ehrlichkeit ist dokumentierte Schuld, und Dr. Wichtig liest Vorfallsberichte neuerdings persönlich. Aber beim nächsten Audit rettet dich genau dieses Blatt."
        },
        {
            t: "Egon nach einer Ersatzbatterie fragen",
            rep: { "Egon": 5 },
            m: 10, f: 5, a: 0, c: 0,
            r: "Egon verschwindet wortlos im Keller und kommt mit einer Batterie zurück, auf der noch 'VEB' zu lesen ist. 'Hält länger als die Firma.' Du glaubst ihm aufs Wort."
        }
    ]
},
{
    id: "srv_usv_beep_2c",
    title: "Objektive Realität",
    reqStory: "path_usv_ignore",
    text: "Gabi steckt den Kopf zur Tür rein: 'Sag mal, piept das bei dir? Ich hör das bis zum Empfang, durch den Lüftungsschacht. Frau Elster hat schon eine Beschwerde-Mail vorformuliert. Ich wollte dich nur vorwarnen.'",
    opts: [
        {
            t: "Gabi die Kopfhörer schenken",
            rem: "headphones",
            rep: { "Gabi": 3 },
            m: 5, f: 5, a: 0, c: 5,
            r: "'Für den Empfang. Gegen den Lärm.' Gabi ist ehrlich gerührt und setzt sie sofort auf. Das Piepen existiert weiter, die Beschwerde-Mail auch - aber die wichtigste Nachrichtenzentrale der Firma hört ab jetzt nichts mehr davon."
        },
        {
            t: "Gabi danken und sofort handeln",
            rep: { "Gabi": 5 },
            m: 15, f: 0, a: 10, c: -5,
            r: "Du ziehst die Kopfhörer ab und kümmerst dich. Das Piepen ist tatsächlich unerträglich, sobald man es wieder zulässt. Gabi hält Frau Elsters Mail auf. Du schuldest ihr schon wieder etwas."
        },
        {
            t: "'Welches Piepen?'",
            rep: { "Gabi": -5 },
            m: 2, f: 10, a: 0, c: 5,
            r: "Gabi schaut auf deine Kopfhörer. Dann auf dich. 'Verstehe.' Sie geht. Die vorformulierte Mail von Frau Elster wird um deinen Namen ergänzt werden, da bist du dir sicher."
        }
    ]
},

{
    id: "srv_egon_deal",
    char: "Egon",
    title: "Kantinenware",
    text: "Egon steht mit einem fabrikneuen Feuerlöscher im Serverraum. 'Deiner is abgelaufen. Nimm den hier. Aber pssst - der is eigentlich für die Kantine. Die kriegen nächste Woche eh neue, das weiß nur noch keiner.'",
    opts: [
        {
            t: "Ablehnen - Vorschrift ist Vorschrift",
            rep: { "Egon": -5 },
            next: "path_exting_rules",
            m: 10, f: 0, a: 5, c: -5,
            r: "Egon schaut dich an, als hättest du ihm ein Formular geschenkt. 'Vorschrift.' Er trägt den Löscher kopfschüttelnd davon. Dein abgelaufener bleibt hängen - den Ersatz musst du jetzt offiziell beantragen."
        },
        {
            t: "Fragen, was er sonst noch 'organisiert'",
            rep: { "Egon": 5 },
            next: "path_exting_lager",
            m: 15, f: 10, a: -5, c: 0,
            r: "Egon mustert dich lange. Dann, ganz leise: 'Komm nachher mal mit runter. Raum K3.' Du hast gerade eine Tür geöffnet, von der du nicht wusstest, dass es sie gibt."
        },
        {
            t: "Annehmen und keine Fragen stellen",
            loot: "fire_ext",
            rep: { "Egon": 5 },
            next: "path_exting_gift",
            m: 5, f: 5, a: 0, c: 0,
            r: "Du nimmst den Löscher entgegen. Egon nickt zufrieden - ein Geschäft unter Männern, die wissen, wie Gebäude wirklich funktionieren. Die Kantine wird ihren Bestand allerdings irgendwann zählen."
        }
    ]
},
{
    id: "srv_egon_deal_2a",
    title: "Inventurdifferenz",
    reqStory: "path_exting_gift",
    text: "Rundmail von Frau Elster: 'Bei der Zwischeninventur der Kantine fehlt ein Feuerlöscher (Inventarnummer K-FL-02). Sachdienliche Hinweise bitte an die Buchhaltung.' Der Löscher steht neben deinem Rack. Mit Inventarnummer.",
    opts: [
        {
            t: "Egon vorwarnen",
            rep: { "Egon": 5 },
            m: 5, f: 5, a: 0, c: 5,
            r: "Egon hört zu, nickt: 'Kümmer ich mich.' Am nächsten Morgen hat die Kantine wieder einen Löscher, niemand weiß woher, und die Inventur stimmt auf wundersame Weise. Du fragst besser nicht nach."
        },
        {
            t: "Das Etikett unauffällig 'aktualisieren'",
            m: 10, f: 10, a: 0, c: 5,
            r: "Ein frisches Etikett, eine erfundene Nummer, ein Hauch Kriminalität. Der Löscher heißt jetzt SRV-FL-01. Solange niemand die Etiketten gegen das Anlagenverzeichnis prüft, ist alles gut. Frau Elster prüft gerne Etiketten."
        },
        {
            t: "Die Umlagerung melden, ohne Namen",
            rep: { "Frau Elster": 3 },
            m: 15, f: 0, a: 5, c: 5,
            r: "Du gestehst eine 'pragmatische Sofortmaßnahme' - Egons Name fällt nicht. Frau Elster korrigiert die Listen mit spitzen Fingern. 'Beim nächsten Mal: VORHER melden.' Der Vorgang hat jetzt einen Aktenvermerk."
        }
    ]
},
{
    id: "srv_egon_deal_2b",
    title: "Der Beschaffungsantrag",
    reqStory: "path_exting_rules",
    text: "Formular B-27: 'Beschaffung sicherheitsrelevanter Ausstattung'. Drei Unterschriften nötig, eine davon von Dr. Wichtig. Der abgelaufene Löscher hängt derweil neben dem Rack und wird jeden Tag ein bisschen dekorativer.",
    opts: [
        {
            t: "Doch nochmal bei Egon anklopfen",
            loot: "fire_ext",
            m: 10, f: 5, a: 5, c: 0,
            r: "Egon grinst breit. 'Ach. DOCH kein Formular?' Er lässt dich exakt eine Minute zappeln, dann holt er den Kantinen-Löscher wieder hervor. Du bezahlst mit einem Stück Würde. Es war es wert."
        },
        {
            t: "Den Antrag komplett durchziehen",
            m: 35, f: -10, a: 10, c: -5,
            r: "Drei Büros, drei Unterschriften, ein halber Nachmittag. Aber am Ende hältst du eine genehmigte Beschaffung in der Hand: vorschriftsgemäß, feuerfest, unangreifbar. Fast ein Kunstwerk der Verwaltung."
        },
        {
            t: "Antrag 'vorbereiten' und liegen lassen",
            m: 5, f: 10, a: 0, c: 5,
            r: "Das Formular liegt jetzt ausgefüllt in deiner Schublade, nur die Unterschriften fehlen. Damit ist es offiziell 'in Bearbeitung' - ein Zustand, der in dieser Firma Jahre halten kann. Der abgelaufene Löscher hängt derweil weiter."
        }
    ]
},
{
    id: "srv_egon_deal_2c",
    title: "Raum K3",
    reqStory: "path_exting_lager",
    text: "Du findest einen Vorwand für den Keller. Raum K3: Regale bis zur Decke. Toner von 2011, Röhrenmonitore, ein Overheadprojektor, drei Kaffeemaschinen und Dinge aus der Gründerzeit der Firma. Egon lehnt am Türrahmen: 'Mein Archiv.'",
    opts: [
        {
            t: "Nach Ersatzteilen für den Serverraum fragen",
            loot: "cable",
            rep: { "Egon": 3 },
            m: 15, f: 0, a: -5, c: 0,
            r: "Egon wühlt kurz und drückt dir ein originalverpacktes Netzwerkkabel in die Hand. 'Cat 5. Reicht für alles.' Es reicht nicht für alles, aber geschenktes Kabel zählt doppelt. Der Rest des Regals bleibt Verhandlungsmasse."
        },
        {
            t: "Vorsichtig nach der Inventarliste fragen",
            rep: { "Egon": -5 },
            m: 5, f: 0, a: 5, c: 0,
            r: "Egons Blick wird arktisch. 'Inventar.' Er schiebt dich sanft, aber endgültig aus dem Raum. Die Tür von K3 wird für dich ab jetzt immer zufällig abgeschlossen sein."
        },
        {
            t: "Respektvoll staunen",
            rep: { "Egon": 5 },
            m: 10, f: 5, a: -5, c: 0,
            r: "'Alles hier hat die Firma mal weggeworfen. Und alles hier hat sie irgendwann wieder gebraucht.' Egon klopft auf ein Regal. Du verstehst gerade, warum in diesem Gebäude nie etwas endgültig kaputt ist."
        }
    ]
},

{
    id: "srv_patch23",
    title: "Port 23",
    text: "Ticket: 'Kein Netz an Arbeitsplatz 14.' Die Spur führt zum Patchpanel: Port 23 ist tot, und das Kabel dahinter hat die Konsistenz von altem Lakritz. Es ist an zwei Stellen geknickt und an einer dritten... angeknabbert?",
    opts: [
        {
            t: "Das Kabel aus Port 24 umstecken",
            next: "path_patch_swap",
            m: 5, f: 10, a: 0, c: 5,
            r: "Port 24 sah unbenutzt aus. Arbeitsplatz 14 ist online, das Ticket geschlossen. Was auch immer an Port 24 hing: Du wirst es erfahren, sobald es jemandem fehlt."
        },
        {
            t: "Den Lakritz-Rest mit Gefühl nachdrücken",
            next: "path_patch_wackel",
            m: 15, f: 5, a: 10, c: 0,
            r: "Nach einer Viertelstunde Millimeterarbeit rastet der Stecker mit einem müden Klick ein. Die Verbindung steht. Sie steht so, wie ein Kartenhaus steht: technisch ja, moralisch nein."
        },
        {
            t: "Ordentlich neu patchen",
            req: "cable",
            rem: "cable",
            next: "path_patch_neu",
            m: 10, f: 0, a: -5, c: -5,
            r: "Neues Kabel, sauber verlegt, beschriftet mit Datum. Arbeitsplatz 14 hat wieder Netz, und zum ersten Mal seit Jahren stimmt an diesem Panel eine Beschriftung. Die Frage nach den Bissspuren bleibt allerdings offen."
        }
    ]
},
{
    id: "srv_patch23_2a",
    title: "Die Bissspuren",
    reqStory: "path_patch_neu",
    text: "Das alte Kabel liegt auf deinem Tisch. Die Bissspuren sind eindeutig: klein, gleichmäßig, gründlich. Irgendetwas lebt hinter dem Patchpanel. Und es hat Geschmack an Netzwerkinfrastruktur gefunden.",
    opts: [
        {
            t: "Eine Lebendfalle aufstellen",
            m: 15, f: -5, a: 5, c: 0,
            r: "Du baust eine Falle mit Erdnussbutter auf. Am nächsten Morgen: Erdnussbutter weg, Falle leer, ein weiteres Kabel angeknabbert. Du spielst hier gegen einen Gegner mit Heimvorteil."
        },
        {
            t: "Alle Kabel in Schutzrohre legen",
            m: 30, f: -10, a: 10, c: -5,
            r: "Eine halbe Stunde Kabelkanal-Tetris. Danach ist das Panel nagesicher, ordentlich und beinahe schön. Was auch immer dort lebt, braucht jetzt ein neues Hobby. Du hoffst, es wird nicht die Stromverteilung."
        },
        {
            t: "Egon Bescheid geben - sein Revier",
            rep: { "Egon": 3 },
            m: 5, f: 5, a: 0, c: 0,
            r: "Egon betrachtet die Bissspuren wie ein Förster. 'Kenn ich. Der wohnt hier länger als du.' Er sagt DER - mit einer Vertrautheit, die keine Rückfragen zulässt. Das Problem ist jetzt Chefsache. Egon-Chefsache."
        }
    ]
},
{
    id: "srv_patch23_2b",
    title: "Port 24",
    reqStory: "path_patch_swap",
    text: "Frau Elster steht in der Tür, ungewohnt aufgelöst: 'Das Fax geht nicht. Das FAX, Herr Müller. Der Jahresabschluss-Beleg muss heute ans Finanzamt, und das Amt akzeptiert: Fax.' An Port 24 hing das Fax. Natürlich hing dort das Fax.",
    opts: [
        {
            t: "Sofort zurückpatchen und beichten",
            rep: { "Frau Elster": 3 },
            m: 10, f: 0, a: 5, c: 5,
            r: "Du gestehst die Umsteckerei und stellst alles wieder her. Das Fax röchelt, wählt und überträgt. Frau Elster notiert nichts in ihrem kleinen Buch. Das ist ihr höchstes Lob."
        },
        {
            t: "'Störung beim Anbieter' behaupten",
            rep: { "Frau Elster": -5 },
            m: 5, f: 10, a: 0, c: 5,
            r: "Frau Elster hört sich die Ausrede an, ohne zu blinzeln. 'Beim Anbieter. Soso.' Das Fax funktioniert eine Stunde später 'von selbst' wieder - exakt nachdem du heimlich zurückgepatcht hast. Sie weiß es. Natürlich weiß sie es."
        },
        {
            t: "Arbeitsplatz 14 wieder opfern",
            m: 5, f: 5, a: 5, c: 5,
            r: "Du steckst zurück: Das Fax läuft, Arbeitsplatz 14 ist wieder offline, und das alte Ticket öffnet sich wie ein müder Vorhang. Du hast ein Problem im Kreis verschoben und dabei zwei Abteilungen näher kennengelernt."
        }
    ]
},
{
    id: "srv_patch23_2c",
    title: "Kartenhaus",
    reqStory: "path_patch_wackel",
    text: "14 Uhr, Anruf von Arbeitsplatz 14: 'Das Netz ist wieder weg. Es ging kurz, dann kam ein Knacken.' Das Lakritz-Kabel hat aufgegeben, diesmal endgültig - beim Rausziehen bleibt der Steckerkopf im Port stecken.",
    opts: [
        {
            t: "Port 23 für tot erklären",
            m: 5, f: 10, a: 0, c: 5,
            r: "Du klebst ein Kreuz aus Isolierband über den Port und nimmst Port 25. Das Panel hat jetzt ein Mahnmal. Irgendwann wird jemand fragen, warum Port 23 ein Grab hat. Aber nicht heute."
        },
        {
            t: "Arbeitsplatz 14 auf WLAN umstellen",
            m: 10, f: 5, a: 0, c: 10,
            r: "'Vorübergehend', sagst du. WLAN im Büro bedeutet: Der Kollege friert ab jetzt in jeder Videokonferenz ein und macht dich dafür verantwortlich. Aber das Ticket ist zu, und heute zählt nur heute."
        },
        {
            t: "Den Steckerrest herausoperieren",
            m: 20, f: -5, a: 15, c: 0,
            r: "Mit Pinzette, Taschenlampe und angehaltenem Atem operierst du den abgebrochenen Kopf aus Port 23. Es ist Feinmechanik am offenen Herzen, und du fluchst leise in drei Sprachen. Aber der Port lebt."
        }
    ]
},

{
    id: "srv_fremder_stick",
    title: "Der fremde Stick",
    text: "In Server 3 steckt ein USB-Stick, der da gestern noch nicht war. Handbeschriftet: 'PRIVAT!! NICHT ÖFFNEN!!' Zwei Ausrufezeichen. Wer auch immer ihn dort vergessen hat, meinte es wirklich ernst.",
    opts: [
        {
            t: "Stecken lassen. Nicht dein Zirkus.",
            next: "path_usbfund_leave",
            m: 2, f: 10, a: 0, c: 5,
            r: "Du beschließt, dass fremde Sticks fremde Probleme sind. Der Stick bleibt, wo er ist - eingesteckt in deinen Server, in deinem Raum, in deiner Verantwortung. Aber sonst: absolut nicht dein Zirkus."
        },
        {
            t: "Abziehen und in Quarantäne scannen",
            loot: "usb_stick",
            next: "path_usbfund_scan",
            m: 15, f: -5, a: 5, c: 0,
            r: "Der Scan läuft sauber durch: keine Schadsoftware, nur vierhundert Selfies von Markus vor verschiedenen Firmenwagen. Du löschst pflichtbewusst alles und behältst den frisch formatierten Stick. Sein Besitzer wird ihn suchen."
        },
        {
            t: "Öffnen. Direkt am Server. Neugier siegt.",
            next: "path_usbfund_open",
            m: 10, f: 5, a: 0, c: 10,
            r: "Du öffnest einen unbekannten Datenträger an einem Produktivsystem - jede Sicherheitsschulung der Welt schreit leise auf. Der Inhalt: keine Malware, sondern Ordner mit Namen wie 'Schluessel_Verleih_2009.xlsx'. Das wird interessant."
        }
    ]
},
{
    id: "srv_fremder_stick_2a",
    title: "Vermisstenanzeige",
    reqStory: "path_usbfund_scan",
    text: "Markus durchkämmt den Serverraum wie einen Tatort. 'Müller! Hast du hier einen Stick gesehen? Schwarz, beschriftet, PRIVAT. Da sind... Vertriebsunterlagen drauf. Sehr wichtige Vertriebsunterlagen.' Er meint die Selfies.",
    opts: [
        {
            t: "Zurückgeben und die Löschung gestehen",
            rem: "usb_stick",
            rep: { "Markus": -5 },
            m: 5, f: 0, a: 5, c: 0,
            r: "'Der war... da waren doch...' Markus starrt auf den frisch formatierten Stick. Du hebst kurz die Schultern: 'Quarantäne-Standardprozess.' Er trauert um vierhundert Selfies. Der Vertrieb wird heute ungewohnt still sein."
        },
        {
            t: "'Nie gesehen'",
            m: 2, f: 5, a: 0, c: 5,
            r: "Markus zieht weiter durchs Gebäude und verdächtigt inzwischen die Putzkolonne. Der formatierte Stick liegt derweil in deiner Schublade und gehört jetzt einfach... dem Serverraum. So funktioniert Inventar hier ja offenbar."
        },
        {
            t: "Ein Ersatz-Fotoshooting organisieren",
            rep: { "Markus": 10, "Chantal": 3 },
            m: 20, f: 10, a: 5, c: 0,
            r: "Du organisierst mit Chantals Ringlicht ein Shooting auf dem Parkplatz. Markus posiert vor jedem Firmenwagen, inklusive dem des Chefs. Die neuen Bilder sind objektiv besser. Du hast einen Freund fürs Leben und keinerlei erledigte Arbeit."
        }
    ]
},
{
    id: "srv_fremder_stick_2b",
    title: "Schluessel_Verleih_2009",
    reqStory: "path_usbfund_open",
    text: "Die Tabelle ist penibel geführt: wer wann welchen Schlüssel bekommen hat, von 2009 bis 2014. Spalte D: 'Zweitschlüssel Serverraum - E.' Danach bricht die Liste ab. Der Stick gehörte offenbar deinem Vorgänger. Und der wusste Dinge.",
    opts: [
        {
            t: "Egon mit Spalte D konfrontieren",
            rep: { "Egon": -5 },
            m: 10, f: 0, a: 10, c: 0,
            r: "'Wo hast du DAS her.' Es ist keine Frage. Egon nimmt dir den Stick nicht weg - er schaut ihn nur an, und der Stick fühlt sich sichtbar unwohl. 'Manche Listen', sagt er im Gehen, 'sind aus gutem Grund abgebrochen.'"
        },
        {
            t: "Formatieren und nie davon gewusst haben",
            m: 5, f: 5, a: -5, c: 0,
            r: "Manche Türen lässt man zu. Du formatierst den Stick und beschließt, nie von einer Liste gewusst zu haben. Das Gefühl, beim Vorbeigehen am Keller beobachtet zu werden, hält sich trotzdem noch ein paar Tage."
        },
        {
            t: "Ausdrucken und sicher verwahren",
            m: 10, f: -5, a: 0, c: 5,
            r: "Wissen ist Macht, Papier ist geduldig. Der Ausdruck wandert in deine private Ablage, von deren Existenz niemand weiß. Du fühlst dich ein Prozent mehr wie dein Vorgänger. Unklar, ob das ein gutes Zeichen ist."
        }
    ]
},
{
    id: "srv_fremder_stick_2c",
    title: "Autoplay",
    reqStory: "path_usbfund_leave",
    text: "Server 3 verhält sich seit heute... musikalisch. Bei jedem Dienst-Neustart dudelt kurz ein Schlager aus dem internen Lautsprecher. Der fremde Stick hat eine Autostart-Datei, und die hat Heimweh nach 1978.",
    opts: [
        {
            t: "Den Lautsprecher abklemmen",
            m: 5, f: 10, a: 0, c: 5,
            r: "Du kappst den kleinen Piezo-Lautsprecher. Problem gelöst, auf die schlechteste denkbare Art: Der Server kann jetzt auch keine Warntöne mehr von sich geben. Aber immerhin auch keinen Schlager."
        },
        {
            t: "Herausfinden, wessen Musikgeschmack das ist",
            rep: { "Gabi": 5 },
            m: 15, f: 0, a: -5, c: 0,
            r: "Du fragst die einzige Person, die alles weiß: Gabi. Sie hört zwei Takte und sagt sofort: 'Egons Lieblingslied. Lief auf jeder Weihnachtsfeier bis 2019.' Der Fall ist gelöst - warum Egons Musik auf einem fremden Stick in deinem Server steckt, allerdings noch lange nicht."
        },
        {
            t: "Den Stick jetzt doch ordentlich entfernen",
            loot: "usb_stick",
            m: 10, f: 0, a: 5, c: 0,
            r: "Du ziehst den Stick, scannst ihn sauber und beendest das Konzert. Darauf: eine einzige MP3 und viel freier Speicher. Den kann man ja jetzt sinnvoll nutzen. Server 3 klingt wieder wie ein Server."
        }
    ]
},

{
    id: "srv_doku_todo",
    title: "Das To-do von Januar",
    text: "Beim Aufräumen fällt dir ein Zettel in deiner eigenen Handschrift entgegen: 'Serverraum dokumentieren!!! WICHTIG!!! Anfang Januar!!!' Es ist längst nicht mehr Januar. Der Zettel hat mehr Ausrufezeichen, als die Doku Seiten hat.",
    opts: [
        {
            t: "Jetzt. Sofort. Komplett.",
            next: "path_doku_jetzt",
            m: 35, f: -10, a: 10, c: -10,
            r: "Du dokumentierst jedes Rack, jeden Port, jedes Passwort-Versteck. Nach einer guten halben Stunde existiert zum ersten Mal eine Wahrheit über diesen Raum, die nicht nur in deinem Kopf wohnt. Es fühlt sich gefährlich erwachsen an."
        },
        {
            t: "Neuen Zettel schreiben: 'September!!!'",
            next: "path_doku_september",
            m: 2, f: 10, a: 0, c: 5,
            r: "Du überträgst die Aufgabe feierlich auf einen frischen Zettel mit neuem Datum. Das ist keine Prokrastination, das ist Terminmanagement. Der alte Zettel kommt in den Müll, wo er nicht mehr anklagend gucken kann."
        },
        {
            t: "Kevin zum 'Doku-Projekt' befördern",
            rep: { "Kevin": 3 },
            next: "path_doku_kevin",
            m: 10, f: 5, a: 0, c: 5,
            r: "Kevin nimmt den Auftrag entgegen wie einen Ritterschlag. 'Ich mach das RICHTIG gut!' Du glaubst ihm sogar. Die Frage ist nur, was 'richtig gut' in Kevins Koordinatensystem bedeutet."
        }
    ]
},
{
    id: "srv_doku_todo_2a",
    title: "Die Wahrheit über Rack 5",
    reqStory: "path_doku_jetzt",
    text: "Beim Dokumentieren ist es dir aufgefallen, und jetzt lässt es dich nicht mehr los: In Rack 5 läuft ein Server, den niemand kennt. Kein Eintrag, kein Ticket, keine Beschriftung. Laufzeit: 743 Tage. Irgendjemand bezahlt seinen Strom.",
    opts: [
        {
            t: "Sofort vom Netz nehmen",
            m: 5, f: 0, a: 5, c: -5,
            r: "Du ziehst den Stecker. Irgendwo in dieser Firma ist gerade eine Welt untergegangen, und du wirst nie erfahren, wessen. Rack 5 ist wieder still. Zu still, findest du plötzlich."
        },
        {
            t: "Als 'Legacy-System' in die Doku eintragen",
            m: 5, f: 10, a: 0, c: 5,
            r: "'Legacy-System, Funktion: historisch gewachsen.' Dieser Satz deckt in dieser Firma alles. Der geheime Server läuft weiter, jetzt eben mit Papieren. Du hast ihn nicht legalisiert, nur laminiert."
        },
        {
            t: "Vorsichtig analysieren, was er tut",
            m: 25, f: -5, a: 5, c: -5,
            r: "Netzwerkverkehr, Prozesse, offene Ports - du näherst dich dem Ding wie einem schlafenden Tier. Ergebnis: Er hostet eine Minecraft-Welt. Eine sehr große, sehr gepflegte Minecraft-Welt. Mit Spielern. Jeden Abend ab 18 Uhr."
        }
    ]
},
{
    id: "srv_doku_todo_2b",
    title: "Der Zettel-Effekt",
    reqStory: "path_doku_september",
    text: "Dr. Wichtig, im Vorbeigehen, beiläufig wie ein Fallbeil: 'Müller, die Versicherung fragt nach unserer IT-Dokumentation. Schicken Sie mir die bis Freitag.' Der September-Zettel in deiner Tasche wird schlagartig sehr schwer.",
    opts: [
        {
            t: "Die Doku in einem Rutsch runterhämmern",
            m: 30, f: -5, a: 15, c: -5,
            r: "Du hämmerst eine Dokumentation zusammen, die zu achtzig Prozent stimmt. Die restlichen zwanzig Prozent formulierst du so vage, dass sie nicht falsch sein können. Die Versicherung bekommt Papier. Papier beruhigt."
        },
        {
            t: "Kevin und Gabi als Notfall-Team rekrutieren",
            rep: { "Kevin": 3, "Gabi": 3 },
            m: 20, f: 0, a: 5, c: 0,
            r: "Kevin fotografiert jedes Rack, Gabi - die ohnehin alles weiß - diktiert, wer woran hängt. Nach kurzer Zeit existiert ein Dokument, das erschreckend gut ist. Der Empfang kennt diese Firma besser als jedes Organigramm."
        },
        {
            t: "'Die Doku liegt in der Cloud' sagen",
            m: 5, f: 10, a: 0, c: 10,
            r: "Es gibt keine Cloud. Es gibt keine Doku. Es gibt jetzt aber eine Aussage gegenüber dem Chef, die beides behauptet - und eine Versicherung, die nachfragen wird. Du hast Zeit gekauft. Der Zinssatz ist unbekannt."
        }
    ]
},
{
    id: "srv_doku_todo_2c",
    title: "Ein Foto",
    reqStory: "path_doku_kevin",
    text: "Kevin präsentiert stolz das Ergebnis seines Doku-Projekts: ein Foto. Ein einziges Foto. Verwackelt, vom halben Serverraum, mit seinem Daumen im Bild. Dateiname: 'doku_final_FERTIG(1).jpg'. 'Und?', strahlt er.",
    opts: [
        {
            t: "Ehrliches Feedback geben",
            rep: { "Kevin": 3 },
            m: 15, f: 0, a: 5, c: 0,
            r: "Du erklärst ihm, was eine Doku braucht: Struktur, Beschriftung, mehr als einen Daumen. Kevin nickt ernst und macht sich Notizen. In sein Handy. In die Notiz-App. Als Sprachnachricht an sich selbst. Es ist ein Anfang."
        },
        {
            t: "Das Foto als offizielle Doku einreichen",
            m: 2, f: 10, a: 0, c: 10,
            r: "Du legst 'doku_final_FERTIG(1).jpg' in den Doku-Ordner und schließt das Kapitel. Sollte jemals jemand die Dokumentation brauchen, findet er einen Daumen vor. Das Problem ist vertagt, und Vertagen hat hier Tradition."
        },
        {
            t: "Loben und heimlich selbst dokumentieren",
            rep: { "Kevin": 5 },
            m: 25, f: -5, a: 10, c: 0,
            r: "'Starker Anfang, Kevin.' Er zieht glücklich ab, du dokumentierst still hinterher. Die Wahrheit existiert jetzt in zwei Versionen: einer richtigen und einer mit Daumen. Kevin wird seine für immer für die echte halten."
        }
    ]
},


/* ============================================================
   FALLEN (v4.0.0): Die vernünftig klingende Antwort ist die
   teure. Kein kostenloser Ausweg.
   ============================================================ */

{
    id: "srv_falle_update",
    title: "Das kleine Update",
    text: "Auf der Verwaltungskonsole erscheint ein Hinweis: 'Kritisches Sicherheitsupdate verfügbar. Installationsdauer: ca. 2 Minuten. Jetzt installieren?' Zwei Minuten. Sicherheit geht vor. Was soll bei zwei Minuten schon passieren.",
    opts: [
        {
            t: "Sofort installieren - Sicherheit geht vor",
            m: 25, f: 0, a: 35, c: 15,
            r: "Die zwei Minuten sind eine Schätzung des Herstellers, gemessen auf Hardware, die es hier nicht gibt. Das Update hängt bei 67 Prozent, startet dreimal neu und nimmt dabei den Dateiserver mit. Fünf Anrufe später läuft alles wieder. Die Lektion: 'ca. 2 Minuten' ist keine Zeitangabe, sondern ein Horoskop."
        },
        {
            t: "Auf später verschieben",
            m: 2, f: 5, a: 0, c: 10,
            r: "Du klickst auf 'Später erinnern' - der ehrlichste Button der IT-Geschichte, denn erinnert wird sich nie. Das System vermerkt die Verschiebung allerdings im Compliance-Bericht, den die Konzernzentrale liest. 'Kritische Updates: 1 ausstehend' leuchtet dort jetzt in einem unangenehmen Orange."
        },
        {
            t: "Ordentliches Wartungsfenster für heute Nacht planen",
            m: 10, f: 0, a: 5, c: 5,
            r: "Der Lehrbuch-Weg: Ankündigung, Zeitfenster, Rollback-Plan. Kostet dich jetzt Planungszeit, eine Rundmail und die Rückfrage von drei Personen, ob 'heute Nacht' auch wirklich nachts ist. Und um 23 Uhr sitzt du dann zuhause am Laptop. Aber es ist der richtige Weg. Leider ist der richtige Weg nie der angenehme."
        }
    ]
},
{
    id: "srv_falle_tape",
    title: "Der Tropfen",
    text: "Über Rack 3 hat sich an der Kühlleitung ein Kondenswassertropfen gebildet. Alle vierzig Sekunden fällt einer, noch trifft er den Kabelkanal. Du kennst dieses Gebäude: Aus einem Tropfen wird ein Rinnsal, aus einem Rinnsal ein Ticket mit dem Wort 'unerklärlich' darin.",
    opts: [
        {
            t: "Eimer drunter, Zettel dran",
            m: 5, f: 10, a: 10, c: 0,
            r: "Das ehrliche Provisorium. Der Eimer füllt sich langsamer als dein schlechtes Gewissen, der Zettel ('NICHT ENTFERNEN') vergilbt vor deinen Augen, und jeder, der den Serverraum betritt, fragt dich ab jetzt nach 'dem Eimer-Ding'. Provisorien haben hier bekanntlich die längste Lebenserwartung im Haus."
        },
        {
            t: "Facility Management offiziell beauftragen",
            m: 15, f: 0, a: 5, c: 10,
            r: "Der Dienstweg: Formular FM-12, Priorität, Kostenstelle. Die Rückmeldung kommt prompt: 'Kältetechnik ist Fremdgewerk, Termin in 3-5 Werktagen.' Bis dahin bist du gebeten, 'geeignete Sofortmaßnahmen' zu treffen - was exakt die beiden anderen Antworten sind. Der Kreis schließt sich. Der Tropfen fällt."
        },
        {
            t: "Das bewährte Panzertape um die Leitung wickeln",
            rem: "tape",
            m: 5, f: 5, a: 30, c: 10,
            r: "Der Reflex jedes Admins - nur hält auf einer kondensfeuchten Kühlleitung kein Klebeband der Welt. Das Tape löst sich binnen einer Stunde, sammelt dabei das Wasser wie eine Rinne und leitet es zielsicher in den Lüfter von Rack 3. Das Panzertape ist weg, das Problem ist größer, und der Lüfter klingt jetzt nach Espressomaschine."
        }
    ]
},
{
    id: "srv_falle_gruen",
    title: "Alles grün",
    text: "Ein seltener Anblick: Jede einzelne LED im Raum leuchtet grün. Kein Blinken, kein Orange, kein einziges rotes Auge. Das Monitoring-Dashboard zeigt null offene Meldungen. Es ist der friedlichste Serverraum, den du je gesehen hast. Verdächtig friedlich.",
    opts: [
        {
            t: "Misstrauisch das Monitoring selbst prüfen",
            m: 15, f: 0, a: 10, c: 0,
            r: "Paranoia zahlt sich aus: Der Monitoring-Dienst hängt seit 6:42 Uhr - das Grün war das Grün eines abgeschalteten Rauchmelders. Du startest ihn neu und siehst zu, wie das Dashboard binnen Sekunden auf sieben echte Meldungen springt. Der friedlichste Raum des Jahres war eine Viertelstunde Arbeit im Tarnanzug."
        },
        {
            t: "Einen Testalarm auslösen, um sicherzugehen",
            m: 10, f: 0, a: 5, c: 10,
            r: "Gründlich: Du wirfst einen Testalarm. Er funktioniert - und landet, wie sich herausstellt, ungefiltert im Eskalations-Verteiler der Konzernzentrale, wo um diese Uhrzeit jemand sehr Echtes sehr echt reagiert. Die Entwarnung dauert länger als jede Störung. Aber immerhin: Das Monitoring lebt. Jetzt wissen es alle."
        },
        {
            t: "Den Moment genießen und nichts anfassen",
            m: 5, f: 10, a: 15, c: 35,
            r: "Weisheit, denkst du. Bis am Nachmittag herauskommt, warum nichts meldete: Der Monitoring-Dienst selbst war seit dem Morgen tot - null Meldungen, weil null Überwachung. Zwei Ausfälle blieben stundenlang unbemerkt, und die Frage 'Warum hat da niemand draufgeschaut?' hat eine sehr kurze Antwort mit deinem Namen."
        }
    ]
},

{
    id: "srv_praktikant_zettel",
    title: "Der Zettel unter der Tastatur",
    text: "Am Ersatzarbeitsplatz im Serverraum klemmt ein Zettel unter der Tastatur. Darauf in ordentlicher Handschrift: die Zugangsdaten des Administrator-Kontos, dazu das Datum der letzten Änderung. Es ist vier Jahre her. Daneben steht: 'BITTE NICHT ÄNDERN - sonst geht die Buchhaltung nicht mehr.'",
    opts: [
        {
            t: "Kennwort ändern, wie es sich gehört",
            m: 20, f: -10, a: 15, c: 10,
            r: "Fachlich korrekt, praktisch eine Lawine: Vier Fachanwendungen, zwei Schnittstellen und ein Drucker im dritten Stock kannten dieses Kennwort. Die Buchhaltung meldet sich nach elf Minuten. Der Zettel hatte recht."
        },
        {
            t: "Foto machen und liegen lassen",
            next: "path_zettel_foto",
            m: 5, f: 10, a: 0, c: 5,
            r: "Du fotografierst den Zettel für den Notfall und lässt ihn, wo er ist. Jetzt existiert das Kennwort an zwei Orten statt an einem. Sicherheitstechnisch ist das die schlechteste aller Welten, aber du hast es griffbereit."
        },
        {
            t: "Zettel einstecken - das gehört hier nicht hin",
            loot: "admin_pw",
            next: "path_zettel_mit",
            m: 5, f: 0, a: 0, c: -5,
            r: "Du nimmst den Zettel an dich. Das Kennwort ist damit nicht sicherer, aber es hängt wenigstens nicht mehr öffentlich aus. Die Buchhaltung wird weiterlaufen, denn geändert hast du nichts - du bist ja nicht wahnsinnig."
        }
    ]
},
{
    id: "srv_praktikant_zettel_2a",
    title: "Die Suche nach dem Zettel",
    reqStory: "path_zettel_mit",
    text: "Ein junger Mann steht ratlos vor dem Ersatzarbeitsplatz und hebt die Tastatur an. Wieder. Und wieder. Es ist der Werkstudent aus der Buchhaltung, den niemand vorgestellt hat. 'Hier war ein Zettel', sagt er, mehr zu sich selbst. 'Da war immer ein Zettel.'",
    opts: [
        {
            t: "Aufklären und ihm einen eigenen Zugang einrichten",
            rem: "admin_pw",
            m: 25, f: -10, a: 10, c: -10,
            r: "Du erklärst ihm, warum der Zettel weg ist, und richtest ihm einen eigenen Zugang mit den Rechten ein, die er tatsächlich braucht. Es kostet dich eine halbe Stunde und behebt ein Problem, das seit vier Jahren als Möbelstück galt. Niemand wird es je bemerken."
        },
        {
            t: "Ihm das Kennwort einfach sagen",
            rep: { "Frau Elster": -5 },
            m: 5, f: 5, a: 0, c: 15,
            r: "Du nennst ihm das Kennwort im Vorbeigehen, mündlich, im Serverraum, wo es außer euch niemand hört. Außer Frau Elster, die exakt in diesem Moment in der Tür steht, weil sie einen Beleg sucht. Sie sagt nichts. Sie schreibt sich etwas auf."
        },
        {
            t: "Nichts sagen und ihn suchen lassen",
            m: 5, f: 10, a: 5, c: 10,
            r: "Du schaust auf deinen Bildschirm, während er zum dritten Mal die Tastatur anhebt. Nach zehn Minuten geht er und meldet der Buchhaltungsleitung, dass 'die Zugangsdaten verschwunden' seien. Diese Meldung nimmt ihren Weg. Sie nimmt ihn nach oben."
        }
    ]
},


{
    id: "srv_schacht_3",
    title: "Rack 7",
    reqStory: "path_schacht_2",
    text: "Kevin steht vor dem Serverschrank und schaut auf sein Klemmbrett. 'Ey, kurze Frage - der Server in Rack sieben, der läuft neuerdings anders. Also nicht kaputt. Nur... anders. Und die Logs hören nachts um kurz nach drei einfach auf und fangen dann wieder an.' Er schaut dich an und wartet auf eine Antwort. Du hast seit heute Morgen nichts anderes mehr gehört. Es ist 15:40 Uhr, du hast vier Folgen im Kopf, und jede Antwort, die dir einfällt, stammt aus der Serie.",
    opts: [
        {
            t: "Dem Chef davon erzählen - der muss das wissen",
            rep: { "Dr. Wichtig": -5 },
            m: 15, f: 0, a: 5, c: 25,
            r: "Du erklärst Dr. Wichtig, in Rack sieben passiere etwas, das sich der Erklärung entziehe, und die Logs hörten nachts um drei auf zu existieren. Du benutzt dabei das Wort 'Schacht'. Zweimal. Er hört sich alles an, bedankt sich freundlich und schließt hinter dir die Tür. Am Nachmittag erkundigt er sich bei der Personalabteilung, ob es Angebote zur Stressprävention gibt. Für Mitarbeiter. Namentlich."
        },
        {
            t: "Kurz die Augen zumachen und normal antworten",
            m: 10, f: -5, a: 10, c: -5,
            r: "Du atmest einmal durch, schiebst die vier Folgen beiseite und antwortest wie ein Fachmann: Zeitsynchronisierung prüfen, Logrotation ansehen, gut ist. Kevin zieht ab. Es kostet dich mehr Kraft als der gesamte restliche Nachmittag, und du weißt jetzt, dass du heute Abend Folge fünf schauen wirst. Sofort nach Feierabend."
        },
        {
            t: "'Der Schacht vergisst nicht, Kevin.'",
            m: 5, f: 5, a: 0, c: 0,
            r: "Es rutscht dir raus, im vollen Ernst, mit der Stimme des Erzählers. Kevin sieht dich zwei Sekunden lang an - und dann leuchtet sein Gesicht auf: 'DU SCHAUST DAS AUCH?!' Ihr steht die nächsten zehn Minuten zwischen den Racks und redet über Folge vier. Das Rack-Problem war ein Neustart der Zeitsynchronisierung. Um kurz nach drei. Wie jede Nacht."
        },
        {
            t: "'Die Frage ist nicht, warum. Die Frage ist, wann.'",
            rep: { "Kevin": 5 },
            m: 10, f: 0, a: -5, c: 0,
            r: "Kevin nickt langsam und macht sich eine Notiz. 'Boah. Krass gedacht.' Er wird die Frage tatsächlich beantworten: kurz nach drei, jede Nacht, die Zeitsynchronisierung. Du hast ihn mit einem Serienzitat zur richtigen Diagnose geführt und wirst das niemals jemandem erzählen können."
        }
    ]
},


{
    id: "srv_praktikant_zettel_2b",
    title: "Das Foto in der Cloud",
    reqStory: "path_zettel_foto",
    text: "Eine Benachrichtigung auf deinem Diensthandy: 'Ihre Fotos wurden erfolgreich gesichert. 1 neues Bild.' Die automatische Sicherung läuft. Sie läuft seit Jahren. Und sie hat soeben das Administrator-Kennwort dieses Hauses in ein Rechenzentrum in Irland hochgeladen.",
    opts: [
        {
            t: "Das Kennwort endlich ändern - jetzt gibt es einen Grund",
            m: 25, f: -10, a: 20, c: 0,
            r: "Wenn es schon draußen ist, taugt es nichts mehr. Du änderst es, benachrichtigst vorher alle Fachbereiche und arbeitest den Nachmittag lang die vier Anwendungen ab, die daran hingen. Es ist die richtige Entscheidung. Sie fühlt sich trotzdem an wie eine Strafe."
        },
        {
            t: "Foto löschen und Sicherung für die Kamera abschalten",
            m: 20, f: -10, a: 10, c: -5,
            r: "Löschen, aus dem Papierkorb löschen, aus der Cloud löschen, Sicherung abschalten, Papierkorb der Cloud leeren. Zwanzig Minuten für einen Fehler, der zwei Sekunden gedauert hat. So sieht Sicherheitsarbeit tatsächlich aus: unsichtbar, mühsam und ohne Applaus."
        },
        {
            t: "Ist doch verschlüsselt, wird schon",
            m: 2, f: 10, a: 0, c: 15,
            r: "Ende-zu-Ende, Serverstandort EU, alles korrekt - und trotzdem liegt das Administrator-Kennwort jetzt in einem fremden Rechenzentrum, weil du zu bequem warst. Sollte je ein Audit die Gerätesicherungen prüfen, beginnt ein sehr unangenehmes Gespräch mit genau diesem Bild."
        }
    ]
},


    {
        id: "srv_kevin_eigenbau",
        reqStory: "path_kevin_rack",
        char: "Kevin",
        title: "Ein Rechner zu viel",
        text: "Im Rack unter dem Switch steht ein Gehäuse, das dort nicht hingehört. Ein Aufkleber mit einem Drachen klebt drauf. Es läuft, es ist verkabelt, und es hat eine Adresse im Serversegment.\n\nEs ist Kevins Rechner. Er wollte 'kurze Wege zum Netzwerk'.",
        opts: [
            {
                t: "Stehen lassen, läuft ja",
                m: 5, f: 15, a: -5, c: 20,
                r: "Das Gehäuse mit dem Drachen bleibt im Rack. Es fällt niemandem auf, weil im Serverraum nie jemand nachschaut außer dir. Genau das ist das Beruhigende daran und gleichzeitig das Problem."
            },
            {
                t: "Netzwerkkabel ziehen und den Rechner mitnehmen",
                m: 15, f: -5, a: 5, c: -10,
                rep: { "Kevin": -5 },
                r: "Du ziehst das Kabel und trägst das Gehäuse hoch an seinen Platz. Kevin protestiert kurz, versteht dann aber, dass ein Arbeitsplatzrechner im Serversegment ungefähr so sinnvoll ist wie ein Fahrrad auf der Autobahn."
            },
            {
                t: "Ins Arbeitsplatznetz umhängen",
                m: 25, f: -10, a: 0, c: -15,
                rep: { "Kevin": 5 },
                r: "Du hängst ihn in das richtige Segment, vergibst eine ordentliche Adresse und trägst ihn in die Liste ein. Fünfundzwanzig Minuten, und danach steht dort ein Gerät, von dem das Netzwerk weiß."
            },
            {
                t: "Prüfen, was auf dem Ding überhaupt läuft",
                m: 30, f: -15, a: 10, c: -10,
                r: "Ein Betriebssystem unklarer Herkunft, kein Virenschutz, dafür ein Programm, das im Hintergrund Rechenleistung an eine Adresse in Übersee verkauft. Kevin hat es für ein Wartungswerkzeug gehalten."
            }
        ]
    },
    {
        id: "srv_egon_foehn",
        reqStory: "path_switch_bleibt",
        char: "Egon",
        title: "Der geföhnte Switch",
        text: "Der Switch, den Egon trockengeföhnt hat, läuft. Er läuft sogar auffällig gut.\n\nAn der Seite klebt ein Zettel in Egons Handschrift: 'GEWARTET' und ein Datum. Die Gehäuseschrauben liegen daneben, in einem Marmeladenglas.",
        opts: [
            {
                t: "Ersatzgerät einbauen, altes archivieren",
                m: 30, f: -15, a: 5, c: -15,
                rep: { "Egon": 5 },
                r: "Du tauschst das Gerät im laufenden Betrieb, was bei diesem Modell möglich ist, wenn man weiß wie. Der geföhnte Switch kommt ins Regal, mit Egons Zettel dran. Er hat ihn sich verdient."
            },
            {
                t: "Die Schrauben wieder eindrehen",
                m: 10, f: 0, a: 0, c: -5,
                rep: { "Egon": 5 },
                r: "Du schließt das Gehäuse und stellst das Marmeladenglas zurück in die Werkstatt. Der Switch läuft weiter, jetzt wenigstens staubdicht. Es ist die kleinste mögliche Verbesserung, aber es ist eine."
            },
            {
                t: "Die Feuchtigkeitsspuren fotografieren",
                m: 15, f: -5, a: 5, c: -10,
                rep: { "Egon": -5 },
                r: "Du dokumentierst die Wasserränder auf der Platine für den Fall, dass jemand später fragt, warum das Gerät ausgefallen ist. Es ist die unglamouröseste Form von Vorsorge und die einzige, die vor Gericht zählt."
            }
        ]
    },
    {
        id: "srv_dat_archiv",
        reqStory: "path_cnc_emulator",
        title: "Das Bandarchiv",
        text: "Auf der Suche nach Platz für die Disketten-Abbilder stehst du vor dem alten Bandarchiv. Vierzig Kassetten, beschriftet mit Kürzeln, die niemand mehr auflösen kann.\n\nGanz unten liegt eine, auf der 'FRÄSE / NICHT WEGWERFEN' steht. In derselben Handschrift wie Egons Zettel.",
        opts: [
            {
                t: "Das Archiv ist Elektroschrott",
                m: 15, f: 10, a: -5, c: 15,
                rep: { "Egon": -10 },
                r: "Du meldest die vierzig Kassetten zur Entsorgung. Es sind vierzig Kilo weniger im Raum und die einzige Sicherung von Maschinen, die noch produzieren. Auffallen wird das erst beim nächsten Ausfall."
            },
            {
                t: "Das Band einlesen",
                m: 40, f: -20, a: 10, c: -20,
                rep: { "Egon": 5 },
                r: "Das Laufwerk braucht drei Anläufe, dann liest es. Auf dem Band liegen die Originaldisketten aller vier Maschinen, gesichert 2003 von jemandem, der wusste, was er tat. Deine Arbeit von heute wäre nicht nötig gewesen."
            },
            {
                t: "Das Archiv beschriften und in die Doku aufnehmen",
                m: 30, f: -10, a: 0, c: -15,
                r: "Du gehst die vierzig Kassetten durch, notierst, was sich auflösen lässt, und hängst die Liste an die Regalwand. Der Nächste, der hier steht, verliert dadurch keine zwei Stunden mehr."
            },
            {
                t: "Nur die eine Kassette mitnehmen",
                m: 10, f: 0, a: 0, c: -5,
                r: "Du nimmst das Band mit der Fräse mit und lässt den Rest stehen. Die Produktion ist damit abgesichert, das Archiv bleibt ein Rätsel, und beides ist heute die richtige Entscheidung."
            }
        ]
    },
];
