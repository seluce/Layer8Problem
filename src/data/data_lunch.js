/**
 * Die Mittagspause.
 *
 * Lag bis v4.0.0 als lunchEvents in data_special.js. Mit 44 Einträgen ist sie
 * längst ein vollwertiger Ereignis-Pool wie Kaffee oder Serverraum und wird
 * über triggerLunch() auch genau so verwendet — also gehört sie in eine
 * eigene Datei und wird wie die anderen erst bei Bedarf geladen. Gebraucht
 * wird sie frühestens um zwölf; im ersten Ladevorgang hat sie nichts verloren.
 */
export const lunch = [
		{
			id: "lunch_canteen",
			title: "MITTAG: KANTINE",
			text: "Es gibt heute 'Jägerschnitzel Surprise'. Die Meute drängelt am Buffet. Was tust du?",
			opts: [
				{ 
					t: "Kopfhörer auf & ab in die Ecke",
					m: 30, f: 5, a: -10, c: 0, 
					r: "Du schirmst dich ab, scrollst durch Memes und ignorierst die Welt. Herrliche Ruhe." 
				},
				{ 
					t: "Zu den Kollegen setzen", 
					m: 45, f: -5, a: 10, c: -5, 
					r: "Du hörst dir Geschichten über Chantals Katze an. Langweilig, aber man hat dich gesehen. Gut für das 'Team-Gefühl'." 
				}
			]
		},
		{
			id: "lunch_desk",
			title: "MITTAG: AM PLATZ",
			text: "Du bleibst im Büro, um Menschen zu meiden. Vor dir liegt ein trauriges Pausenbrot, das schon leicht wellig ist.",
			opts: [
				{ 
					t: "Serie im Minifenster gucken",
					rep: { "Dr. Wichtig": -5 },	
					m: 60, f: 20, a: -20, c: 10, 
					r: "Finger auf 'Alt-Tab' bereit. Du schaffst zwei Folgen. Leider spiegelt sich der Film in deiner Brille, als der Chef reinkommt. Ärger!" 
				},
				{ 
					t: "Einhändig weiterarbeiten",
					rep: { "Dr. Wichtig": 2 },	
					m: 30, f: -10, a: 20, c: -10, 
					r: "Multitasking. Du löst Tickets mit rechts, isst mit links. Der Chef nickt anerkennend im Vorbeigehen. Deine Tastatur knirscht jetzt vor Krümeln." 
				}
			]
		},
		{
			id: "lunch_vegan",
			title: "MITTAG: VEGANER TAG",
			text: "Die Kantine serviert heute ausschließlich Tofu-Klumpen in Sauce nach Hausart. An den Tischen wird auffällig leise gegessen, und die Stimmung kippt Richtung aggressiv.",
			opts: [
				{ t: "Zum Döner-Mann rennen", m: 45, f: 5, a: -20, c: 5, r: "Du kommst mit Knoblauchfahne zurück. Du bist glücklich, die Kollegen rümpfen die Nase." },
				{ t: "Mitessen und meckern", m: 45, f: 0, a: 15, c: 0, r: "Gemeinsames Meckern verbindet das Team." }
			]
		},
		{
			id: "lunch_client_emergency",
			title: "MITTAG: DER CHEF-ALARM",
			text: "Du packst gerade dein Brot aus, da steht der Chef atemlos vor dir. 'Müller! Kunde Schmitz hat totalen Internet-Ausfall! Sie müssen SOFORT hin! Das ist ein Notfall! Das Brot können Sie im Auto essen!'",
			opts: [
				{ 
					t: "Auf die gesetzliche Pause bestehen",
					rep: { "Dr. Wichtig": -10 },	
					m: 30, f: 5, a: -10, c: 15, 
					r: "Du beißt betont langsam in dein Brot und tippst auf die Uhr. Der Chef läuft rot an, schnaubt und rennt wütend selbst los. Dein Essen schmeckt plötzlich nach Sieg." 
				},
				{ 
					t: "Brot schnappen und losrasen",
					rep: { "Dr. Wichtig": 10 },	
					m: 60, f: -20, a: 25, c: -15, 
					r: "Du würgst dein Brot bei Tempo 180 runter. Beim Kunden war nur der Stecker locker. Du hast Sodbrennen, aber der Chef feiert deinen heldenhaften Einsatz." 
				}
			]
		},
		{
			id: "lunch_pizza",
			title: "MITTAG: PIZZA-DISKUSSION",
			text: "Das Team will Pizza bestellen. Die Diskussion dauert schon 20 Minuten. 'Ananas gehört nicht drauf!' vs 'Ich bin laktoseintolerant!'. Deine Pause verrinnt.",
			opts: [
				{ t: "Aussteigen & Brot essen", m: 30, f: 10, a: -10, c: 0, r: "Du isst dein trockenes Brot, während die anderen noch streiten. Friedlich, aber traurig." },
				{ t: "Machtwort: 'Salami für alle!'", m: 45, f: -5, a: 10, c: 0, r: "Du hast bestellt. Die Veganer hassen dich, aber du bist satt. Das Dauergemecker im Hintergrund nagt trotzdem an den Nerven." }
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
				{ 
					t: "Lieber zum Bäcker gehen", 
					m: 20, f: 5, a: 5, c: 5, 
					r: "Du holst dir ein trockenes Käsebrötchen. Es schmeckt nach Pappe und Verantwortung. Der Neid auf die Döner-Esser nagt an dir." 
				},
				{ 
					t: "Anstellen! 2,50€ sind unschlagbar!", 
					m: 50, f: 10, a: 15, c: 5, 
					r: "Du hast 40 Minuten gewartet und alles in 5 Minuten runtergeschlungen. Du kommst zu spät und dünstest Knoblauch aus. Aber du hast gespart!" 
				}
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
		{
			id: "lunch_foodtruck",
			title: "MITTAG: STREET FOOD FESTIVAL",
			text: "Auf dem Parkplatz stehen Food Trucks. Es duftet nach 'Pulled Jackfruit' und 'Artisan Burgern'. Die Preise sind hoch, die Schlangen riesig. Deine Kollegen rufen: 'Kommst du mit? Das ist total in!'",
			opts: [
				{ 
					t: "Im Büro bleiben & Reste essen",
					m: 10, f: -5, a: 5, c: -5, 
					r: "Du isst einen alten Riegel aus der Schublade, während die anderen draußen Spaß haben. Du fühlst dich moralisch überlegen, weil du dem Hype widerstanden hast – bist aber immer noch hungrig." 
				},
				{ 
					t: "Den 'Bio-Burger' für 15€ holen",
					rep: { "Dr. Wichtig": -2 },	
					m: 75, f: 10, a: -10, c: 10, 
					r: "Du hast 60 Minuten gewartet. Der Burger war winzig, aber lecker. Du kommst massiv zu spät zurück. Der Chef tippt auf seine Uhr: 'War der Burger aus Gold, Müller?'" 
				},
				{ 
					t: "Den billigen Hot-Dog-Stand nehmen",
					m: 20, f: 0, a: 20, c: 0, 
					r: "Keine Schlange, nur 2 Euro. Ein Schnäppchen! Aber nach dem ersten Bissen rumort dein Magen bedrohlich. Der Nachmittag wird... explosiv." 
				}
			]
		},
		{
			id: "lunch_ceo_table",
			char: "Dr. Wichtig",
			title: "MITTAG: DER CEO WINKT",
			text: "Du betrittst die Kantine mit deinem Tablett (Linseneintopf). Plötzlich winkt Dr. Wichtig vom 'Vorstands-Tisch' zu dir. 'Müller! Setzen Sie sich zu mir! Wir müssen uns mal unterhalten.' Alle im Raum starren dich an.",
			opts: [
				{ 
					t: "Über Gehaltserhöhung reden", 
					rep: { "Dr. Wichtig": -15 },
					m: 45, f: 0, a: 10, c: 50, 
					r: "Ganz schlechte Idee. Er verschluckt sich an seiner Garnele. 'Müller, nicht beim Essen!' Die Stimmung kippt sofort. Er merkt sich das negativ vor." 
				},
				{ 
					t: "So tun als hättest du einen Anruf", 
					rep: { "Dr. Wichtig": 2 },
					m: 5, f: 10, a: -5, c: 5, 
					r: "Du hältst das Handy ans Ohr: 'Oh, Server-Notfall! Muss los!' Du rennst mit dem Tablett raus. Knapp entkommen, aber er wirkt beleidigt." 
				},
				{ 
					t: "Hinsetzen & Smalltalk wagen", 
					rep: { "Dr. Wichtig": 5 },
					m: 60, f: -10, a: 20, c: -25, 
					r: "Du schwitzt Blut und Wasser. Du lachst über seine unlustigen Witze. Aber es lohnt sich: Er hält dich jetzt für einen 'Guten Mann', und dieses Wohlwollen trägt wochenlang. Dein Essen ist allerdings kalt geworden." 
				}
			]
		},
		{
			id: "lunch_microwave_war",
			title: "MITTAG: MIKROWELLEN-KRIEG",
			text: "Zwei Mikrowellen sind kaputt, nur eine geht. Eine Schlange von 10 Leuten. Ganz vorne steht jemand aus dem Vertrieb und wärmt Fisch auf (Timer: 10 Minuten). Der Gestank breitet sich aus. Die Stimmung ist hochexplosiv.",
			opts: [
				{ 
					t: "Flucht zum Döner-Laden", 
					m: 45, f: 10, a: -5, c: 0, 
					r: "Du hältst die Luft an und rennst raus, weg von dem Gestank. Der Döner draußen schmeckt nach Freiheit (und Zwiebeln)." 
				},
				{ 
					t: "Einfach den Stecker ziehen",
					m: 5, f: 5, a: -10, c: 10, 
					r: "Du ziehst im Vorbeigehen den Stecker. 'Huch, Sicherung wohl raus.' Der Fisch-Typ flucht, kann aber nichts beweisen. Die Menge jubelt dir leise zu. Du bist der Held des Tages." 
				},
				{ 
					t: "Lautstark herumpöbeln",
					m: 30, f: 0, a: 25, c: 0, 
					r: "Du brüllst durch die Küche: 'FISCH?! ERNSTHAFT?! SIND WIR HIER AM HAFEN?!' Es entsteht eine hitzige Debatte. Du hast dich abreagiert, aber dein Essen ist immer noch kalt." 
				}
			]
		},
		{
			id: "lunch_jogging",
			title: "MITTAG: DIE LAUFGRUPPE",
			text: "Die 'High-Performer' ziehen sich Laufschuhe an. 'Na Müller? Kommst du mit? 10km in der Mittagspause! Das klärt den Geist für maximale Productivity!' Sie sehen fit, aber manisch aus.",
			opts: [
				{ 
					t: "Mitlaufen! 10km sind doch nix!",
					m: 70, f: -20, a: 30, c: -10, 
					r: "Du stirbst. Zweimal. Du kommst schweißgebadet und mit hochrotem Kopf wieder. Du kannst kaum noch tippen vor Erschöpfung. Aber sie akzeptieren dich jetzt als einen von ihnen." 
				},
				{ 
					t: "Vom Fenster aus zuschauen", 
					m: 30, f: 10, a: -10, c: 0, 
					r: "Du isst genüsslich einen Schokoriegel und siehst zu, wie sie draußen im Nieselregen leiden. Das ist wahre Entspannung." 
				},
				{ 
					t: "Abwinken: 'Sorry, mein Knie...'",
					m: 5, f: 5, a: 0, c: 0, 
					r: "Der Klassiker. Sie nicken mitleidig (und etwas verächtlich). Du schlurfst entspannt Richtung Kantine." 
				}
			]
		},
		{
			id: "lunch_no_money",
			title: "MITTAG: PORTEMONNAIE VERGESSEN",
			text: "Du hast dir das teure Schnitzel aufgeladen. An der Kasse greifst du in die Tasche... LEER! Das Portemonnaie liegt oben. Die Schlange hinter dir wird unruhig. Die Kassiererin, Frau 'Drache', tippt ungeduldig mit den Fingern.",
			opts: [
				{ 
					t: "Essen zurückstellen", 
					m: 15, f: 0, a: 20, c: 0, 
					r: "Du musst das Schnitzel zurücktragen, während alle dich anstarren. 'Schande! Schande!' Du isst trockenes Brot am Platz." 
				},
				{ 
					t: "Laufpass: 'Ich hol's gleich!'", 
					m: 20, f: -5, a: 10, c: 0, 
					r: "Du rennst hoch, holst Geld, rennst runter. Dein Platz ist weg, das Schnitzel ist kalt. Stress pur." 
				},
				{ 
					t: "Azubi Kevin anpumpen", 
					m: 10, f: 5, a: -5, c: 0, 
					r: "Kevin steht hinter dir. 'Kannst du mal...?' Er zahlt stolz für dich. Jetzt schuldest du dem Azubi was. Er wird dich dafür ausnutzen ('Kannst du mal meinen Drucker fixen?')." 
				}
			]
		},
		{
			id: "lunch_boring_cake",
			title: "MITTAG: TROCKENER KUCHEN",
			text: "Sabine aus der Buchhaltung nötigt alle in die Kaffeeküche. 'Ich habe gebacken! Veganen Zucchini-Kuchen ohne Zucker!' Sie erwartet, dass alle 'Happy Birthday' singen. Es ist peinlich still.",
			opts: [
				{ 
					t: "Stück essen & 'Mmmh' heucheln", 
					m: 20, f: 0, a: 10, c: -5, 
					r: "Der Kuchen schmeckt nach Pappe und Traurigkeit. Aber Sabine strahlt: 'Danke Müller, du bist der Einzige, der Geschmack hat!' Du würgst es runter." 
				},
				{ 
					t: "Flucht vortäuschen", 
					m: 5, f: 5, a: -5, c: 0, 
					r: "Du murmelst 'Meeting!' und rennst raus. Du hörst Sabine hinter dir seufzen. Knapp entkommen." 
				},
				{ 
					t: "Sagen: 'Ich hasse Zucchini'", 
					m: 5, f: 0, a: -5, c: 10, 
					r: "Sabine fängt fast an zu weinen. Die Kollegen starren dich böse an. Du hast die Stimmung ruiniert, aber wenigstens musst du den Mist nicht essen." 
				}
			]
		},
		{
			id: "lunch_server_fire",
			title: "MITTAG: ALARM STUFE ROT",
			text: "Du hast gerade in dein Sandwich gebissen, da heulen die Sirenen. Push-Nachricht: 'SERVERRAUM TEMPERATUR KRITISCH! NOTABSCHALTUNG IN 60 SEKUNDEN!' Wenn der Server ausgeht, steht die Firma still.",
			opts: [
				{ 
					t: "Sofort hinrennen! Das Sandwich kommt mit!",
					m: 10, f: -20, a: 20, c: -20, 
					r: "Du sprintest los, Sandwich in der Hand. Du trittst die Tür ein und reißt das Fenster auf. Temperatur sinkt. Du hast Krümel im Bart, aber den Tag gerettet. Der Chef nickt anerkennend." 
				},
				{ 
					t: "Sitzen bleiben. Ich habe Pause.",
					m: 30, f: 10, a: -10, c: 80, 
					r: "Du kaust genüsslich weiter. Plötzlich geht das Licht aus. Stille. USV piept. Chef kommt reingerannt: 'MÜLLER?! WO WAREN SIE?!' Das gibt eine saftige Abmahnung." 
				},
				{ 
					t: "Den Azubi Kevin hinschicken", 
					m: 5, f: 5, a: 10, c: 10, 
					r: "Du rufst Kevin an: 'Lauf, Junge!'. Er stolpert rein und zieht vor Panik den falschen Stecker. Chaos bricht aus. Aber offiziell warst du es nicht." 
				}
			]
		},
		{
			id: "lunch_merger_rumor",
			title: "MITTAG: FLURFUNK EXPLODIERT",
			text: "In der Kantine herrscht Panik. Jemand hat 'Geheimakten' im Kopierer gefunden. Angeblich wird die Firma morgen an einen chinesischen Großkonzern verkauft. Alle zittern um ihre Jobs. 'Werden wir alle gefeuert?!'",
			opts: [
				{ 
					t: "Den Chef am Buffet abfangen",
					rep: { "Dr. Wichtig": 2 },	
					m: 10, f: 0, a: 0, c: 10, 
					r: "Du drängst den Chef zwischen Salat und Suppe in die Ecke. Er lacht nervös: 'Kein Kommentar.' Aha! Das Schweigen bestätigt alles!" 
				},
				{ 
					t: "Laut rufen: 'Ich lerne schon Mandarin!'",
					rep: { "Dr. Wichtig": -5 },	
					m: 30, f: 10, a: -10, c: 20, 
					r: "Du erzählst wilde Horror-Stories über Arbeitslager. Die Kollegen weinen fast. Das Chaos ist herrlich. Produktivität am Nachmittag: Null. Der Chef tobt." 
				},
				{ 
					t: "Abwinken: 'Alles nur Gerüchte.'",
					m: 30, f: -5, a: 10, c: -5, 
					r: "Du spielst den Fels in der Brandung: 'Das war bestimmt nur ein fehlerhafter Ausdruck.' Die Leute beruhigen sich etwas. Langweilig, aber verantwortungsvoll." 
				}
			]
		},
		{
			id: "lunch_schnitzel_gate",
			title: "MITTAG: DAS LETZTE SCHNITZEL",
			text: "Es ist 'Schnitzel-Donnerstag'. Die heilige Tradition. Du stehst an der Ausgabe. Es ist nur noch EIN Schnitzel da. Du greifst danach... gleichzeitig mit dem Vertriebsleiter 'Muskel-Markus'. Er funkelt dich an.",
			opts: [
				{ 
					t: "Klein beigeben & Salat nehmen",
					m: 10, f: 0, a: 20, c: 0, 
					r: "Du ziehst die Hand ängstlich zurück. Markus lacht triumphierend: 'Opfer!' Du mahlst lustlos trockene Blätter und hasst dein Leben. Deine Wut kocht." 
				},
				{ 
					t: "Dagegenhalten: 'Ich war zuerst!'",
					m: 20, f: -5, a: 10, c: 5, 
					r: "Du stellst dich breitbeinig hin. Die Kantinen-Frau mischt sich genervt ein: 'Ruhe im Karton! Ich teil das jetzt!' Du kriegst ein halbes Schnitzel. Ein schmutziger Teilsieg." 
				},
				{ 
					t: "Das Schnitzel 'versehentlich' anhusten", 
					m: 5, f: 5, a: -5, c: 20, 
					r: "Du hustest laut und feucht direkt auf die Panade. Markus weicht angewidert zurück: 'Ekelhaft, behalt den Fraß!' Du hast das Schnitzel. Aber jetzt hält dich jeder für Patient Null." 
				}
			]
		},
		{
			id: "lunch_leftovers",
			title: "MITTAG: DIE RESTE-SCHLACHT",
			text: "Die Sekretärin ruft: 'Schnittchen vom Vorstands-Meeting sind übrig! In Raum 302!' Das ist das Signal. Wie bei einer Zombie-Apokalypse stürmen alle Mitarbeiter los. Gratis Lachs-Häppchen!",
			opts: [
				{ 
					t: "Mitrennen! Ellbogen raus!", 
					m: 15, f: -5, a: -10, c: 0, 
					r: "Du wirfst dich körperlich ins Getümmel. Du erbeutest drei Lachs-Brötchen und einen Muffin. Ein voller Erfolg! Du fühlst dich satt und spritzig." 
				},
				{ 
					t: "Später hingehen. Ich bin doch kein Tier.",
					m: 10, f: 0, a: 10, c: 0, 
					r: "Du schlenderst erst hin, als der Mob weg ist. Es gibt nur noch ein angebissenes Gurken-Sandwich und Krümel. Tja. Wer zu spät kommt, den bestraft das Leben." 
				},
				{ 
					t: "Das Chaos nutzen & den guten Kaffee klauen", 
					m: 5, f: 0, a: -5, c: 0, 
					r: "Während alle um das Essen kämpfen, füllst du dir seelenruhig die teure Kannen-Milch und den Premium-Kaffee ab. Strategisch klug." 
				}
			]
		},
		{
			id: "lunch_rooftop",
			title: "MITTAG: DAS GEHEIME DACH",
			text: "Du kennst einen Trick, wie man auf das Flachdach kommt. Aussicht über die graue Stadt. Niemand nervt dich. Aber der Wind ist kalt.",
			opts: [
				{ t: "Aussicht genießen", m: 60, f: 20, a: -30, c: 0, r: "Du fühlst dich frei. Fast vergisst du die Zeit. Du kommst 10 Minuten zu spät, aber entspannt." },
				{ t: "Papierflieger werfen", req: "manual", m: 30, f: 10, a: -10, c: 0, r: "Du reißt Seiten aus dem Handbuch und baust Flieger. Sie segeln auf den Parkplatz des Chefs. Riskant, aber lustig." },
				{ t: "Energy Drink in der Sonne", req: "energy", m: 30, f: 0, a: -20, c: 0, r: "Koffein und UV-Strahlung. Du vibrierst vor Energie. Inventar -1." }
			]
		},
		{
			id: "lunch_tupper_gamble",
			title: "MITTAG: TUPPER-ROULETTE",
			text: "In der Küche stehen 5 identische Dosen ohne Namen. Die Kollegen spielen 'Russisch Roulette'. Eine enthält leckere Lasagne, eine enthält Schimmel-Pilz von 2021.",
			opts: [
				{ t: "Nicht mitspielen", m: 10, f: 0, a: 5, c: 0, r: "Du bleibst beim mitgebrachten trockenen Brot. Kein Risiko, kein Ruhm, kein Schimmel." },
				{ t: "Dose 1 öffnen", m: 30, f: 0, a: -10, c: 0, r: "Jackpot! Lasagne! Der Tag ist gerettet." },
				{ t: "Dose 3 öffnen", m: 45, f: -20, a: 30, c: 0, r: "Es war der Schimmel. Du verbringst die Pause würgend auf dem Klo. Gespart: 3 Euro. Verloren: der Nachmittag." }
			]
		},
		{
			id: "lunch_fancy_restaurant",
			title: "MITTAG: DER NOBLE ITALIENER",
			text: "Die Kollegen wollen zum Edel-Italiener 'Il Prezzo'. Eine Pizza kostet 25 Euro. Alle gucken dich erwartungsvoll an: 'Kommst du mit oder bist du etwa pleite?'",
			opts: [
				{ 
					t: "Die 'Black Card' auf den Tisch knallen",
					req: "black_card", 
					m: 90, f: 50, a: -50, c: -20, 
					r: "Du zahlst lässig für den GANZEN TISCH mit der Karte vom Prinzen. Die Kollegen fallen fast auf die Knie. Du bist ab heute der König des Büros.", 
					next: "prince_active"
				},
				{ 
					t: "Ablehnen: 'Zu teuer für Teig.'", 
					m: 30, f: 5, a: -5, c: 0, 
					r: "Du holst dir lieber einen Döner. Der macht schöner. Und satt. Und kostet keine 25 Euro." 
				},
				{ 
					t: "Mitgehen und nur Wasser bestellen", 
					m: 60, f: -5, a: 10, c: 0, 
					r: "Du nippst 60 Minuten lang an einem Glas Leitungswasser, während die anderen Trüffel-Pasta schlemmen. Absolut demütigend." 
				}
			]
		},
		{
			id: "lunch_sleep_car",
			title: "MITTAG: AUTO-SCHLAF",
			text: "Du schleichst dich wie ein Krimineller in die Tiefgarage. Dein Auto ist deine Festung. Du stellst den Sitz nach hinten. Endlich Stille, nur das ferne Surren der Lüftung.",
			opts: [
				{ 
					t: "Ohne Wecker schlafen)", 
					rep: { "Dr. Wichtig": -10 },	
					m: 90, f: 30, a: -30, c: 20, 
					r: "Du fällst in ein Koma. Du wachst völlig vernebelt auf. Was für ein Jahr haben wir? Blick auf die Uhr: SCHEI**E! Du warst 90 Minuten weg. Der Chef hat dich gesucht." 
				},
				{ 
					t: "Motor für die Klimaanlage laufen lassen", 
					m: 45, f: 20, a: -10, c: 0, 
					r: "Herrlich temperiert. Du hörst leise Radio und entspannst. Leider nuckelt das Licht an der Batterie. Hoffentlich startet die Karre heute Abend noch." 
				},
				{ 
					t: "Wecker auf 20 Minuten stellen", 
					m: 30, f: 15, a: -10, c: 0, 
					r: "Der perfekte Power-Nap. Du wachst punktgenau auf, wischst den Sabber vom Mundwinkel und gehst erfrischt zurück an die Arbeit." 
				}
			]
		},
		{
			id: "lunch_gym",
			title: "MITTAG: FIRMEN-FITNESS",
			text: "HR hat ein 'Pop-Up Gym' im Konferenzraum aufgebaut. 'Schwitzen für den Erfolg'. Der Trainer brüllt schon.",
			opts: [
				{ t: "Sabotieren", m: 10, f: 5, a: -5, c: 10, r: "Du drehst die Heizung auf 30 Grad. Das Training wird abgebrochen. Danke, Held." },
				{ t: "Teilnehmen", rep: { "Dr. Wichtig": 2 }, m: 45, f: -10, a: 10, c: -5, r: "Du hast Liegestütze im Anzug gemacht. Jetzt riechst du nach Iltis. Aber der Chef hat's gesehen." },
				{ t: "Zuschauen & Donut essen", req: "donut", m: 30, f: 10, a: -10, c: 5, r: "Du isst einen Donut, während die Kollegen leiden. Ein Gefühl der Überlegenheit. Aber HR guckt böse." }
			]
		},
		{
			id: "lunch_supermarket",
			title: "MITTAG: SUPERMARKT-KAMPF",
			text: "Du willst dir nur schnell ein Brötchen im Supermarkt holen. Aber: Rentner-Invasion! Alle drei Kassen sind voll mit Leuten, die passend zahlen wollen ('Warten Sie, ich hab's klein!').",
			opts: [
				{ 
					t: "Rufen: 'PLATZ DA! ICH BIN ARZT!'",
					m: 15, f: 5, a: -5, c: 10, 
					r: "Die Menge teilt sich ehrfürchtig wie das Rote Meer. Du scannst dein Mettbrötchen wie ein Herzchirurg. Du bist satt, aber dein Karma ist im Keller." 
				},
				{ 
					t: "Ware ins Regal werfen & flüchten", 
					m: 10, f: 0, a: 10, c: 0, 
					r: "Du legst die Banane zu den Shampoos und rennst raus. Hunger ist schlimm, aber dieser Kassen-Stress ist schlimmer." 
				},
				{ 
					t: "Brav anstellen und warten",
					m: 40, f: -5, a: 20, c: 0, 
					r: "Die Dame vor dir zahlt 4,99€ ausschließlich in 1- und 2-Cent-Münzen. Du starrst auf die Uhr. Die Rückkehr wird knapp, und das Brötchen schmeckt nach purer Wut." 
				}
			]
		},
		{
			id: "lunch_canteen_crash",
			title: "MITTAG: SYSTEMAUSFALL",
			text: "Du stehst in der Kantine ganz vorne in der Schlange mit deinem Tablett. Plötzlich stürzt die Kasse ab. Windows-Updates werden installiert (1 von 45). Die Schlange hinter dir murrt. Die Kassiererin guckt dich flehend an: 'Sie sind doch von der IT?'",
			opts: [
				{ 
					t: "Brav warten", 
					m: 45, f: 10, a: 20, c: 0, 
					r: "Du starrst 45 Minuten auf den Ladebalken, während dein Essen kalt wird. Die Kollegen hinter dir machen DICH für das Update verantwortlich. Die Stimmung ist auf dem Tiefpunkt." 
				},
				{ 
					t: "Tablett stehen lassen & zum Bäcker gehen", 
					m: 25, f: 0, a: 5, c: 5, 
					r: "Du gehst entnervt. 25 Minuten Fußweg und Schlangestehen beim Bäcker für ein trockenes Käsebrötchen. Immerhin bist du dem Update-Terror entkommen." 
				},
				{ 
					t: "Kasse neu aufsetzen", 
					rep: { "Dr. Wichtig": 5 },
					m: 40, f: -15, a: 15, c: -10, 
					r: "Du verbringst 40 Minuten deiner Pause damit, das Kassensystem zu debuggen. Du kriegst dein Essen gratis, hast aber quasi durchgearbeitet. Deine Pause ist gelaufen." 
				}
			]
		},
		{
			id: "lunch_microwave_queue",
			title: "MITTAG: MIKROWELLEN-STAU",
			text: "Du willst dir deine Nudeln aufwärmen, aber von drei Mikrowellen geht nur noch eine. Davor steht eine Schlange von 4 Leuten. Ganz vorne steht der Vertriebsleiter und taut geduldig ein komplett gefrorenes Hähnchen auf.",
			opts: [
				{ 
					t: "Zähneknirschend warten", 
					m: 35, f: 10, a: 25, c: 0, 
					r: "Du stehst 35 Minuten im Flur und wartest. Als du endlich dran bist, hast du noch genau 3 Minuten Zeit, um die kochend heißen Nudeln runterzuwürgen. Schrecklich." 
				},
				{ 
					t: "Mit Donut bestechen & vordrängeln", 
					req: "donut",
					m: 15, f: 5, a: -10, c: 0, 
					r: "Du gibst dem Typen vor dir den Donut. Er lässt dich vor. In 15 Minuten bist du satt und entspannt. Ein Hoch auf die Korruption!" 
				},
				{ 
					t: "Die Nudeln eiskalt essen", 
					m: 10, f: 0, a: 30, c: 0, 
					r: "Du hast keine Zeit für den Quatsch. Du isst die Nudeln direkt aus dem Kühlschrank. Es dauert nur 10 Minuten, aber dir wird schlecht und du bist furchtbar aggressiv." 
				}
			]
		},
		{
			id: "lunch_smalltalk_hell",
			title: "MITTAG: DIE LABERTASCHE",
			text: "Du hast dir ein ruhiges Eckchen in der Küche gesucht. Da setzt sich Sabine (HR) unaufgefordert zu dir. 'Ach, gut dass ich dich treffe! Ich muss dir unbedingt von meinem Yoga-Retreat auf Bali erzählen!' Sie holt tief Luft.",
			opts: [
				{ 
					t: "Kopfhörer auf & nicken", 
					req: "headphones",
					m: 30, f: 20, a: -10, c: 0, 
					r: "Du hörst sanften Death Metal, während Sabine 30 Minuten stumm ihren Mund bewegt. Du hast entspannt gegessen und sie denkt, du bist ein toller Zuhörer." 
				},
				{ 
					t: "Flucht: 'Mir ist schlecht!'", 
					m: 5, f: 0, a: 20, c: 10, 
					r: "Du rennst nach 5 Minuten aufs Klo und lässt dein Essen stehen. Du hast die Pause abgebrochen. Du hungerst und bist wütend auf dich selbst." 
				},
				{ 
					t: "Höflich zuhören", 
					rep: { "Gabi": 5 },
					m: 40, f: 15, a: 15, c: 0, 
					r: "Du nickst 40 Minuten lang. Du kennst jetzt die Namen aller Straßenhunde auf Bali und ihr Seelentier. Du hast dich zwar ausgeruht, aber dein Gehirn ist Matsch." 
				}
			]
		},
		{
			id: "lunch_slow_delivery",
			title: "MITTAG: LIEFERANDO-DRAMA",
			text: "Du hast dir eine Pizza bestellt. Die App sagt: 'Noch 2 Minuten'. Aber der GPS-Punkt des Fahrers kreist seit 20 Minuten wild um den Firmenblock. Er findet den Eingang nicht.",
			opts: [
				{ 
					t: "Stur am Fenster warten", 
					m: 45, f: 10, a: 20, c: 0, 
					r: "Nach satten 45 Minuten steht er endlich da. Du hast deine komplette Pause mit Warten und Fluchen aus dem Fenster verbracht. Dein Magen knurrt bedrohlich." 
				},
				{ 
					t: "Bestellung stornieren & Snack essen", 
					m: 10, f: 5, a: 25, c: 0, 
					r: "Du brichst ab, holst dir einen Schokoriegel aus dem Automaten und arbeitest weiter. Du hast nur 10 Minuten verloren, aber der Hunger macht dich bis Feierabend ungenießbar." 
				},
				{ 
					t: "Ihn draußen suchen gehen", 
					m: 30, f: -10, a: 15, c: 0, 
					r: "Du irrst 30 Minuten durch den Nieselregen, bis du ihn zwei Straßen weiter findest. Die Pizza ist lauwarm und du bist völlig außer Atem. Schlimmste Pause ever." 
				}
			]
		},
		{
			id: "lunch_boss_table",
			title: "MITTAG: DER CHEF-TISCH",
			text: "Die Kantine ist brechend voll. Der einzige freie Platz ist direkt gegenüber von Dr. Wichtig. Er winkt dir zu: 'Müller! Kommen Sie her, leisten Sie mir Gesellschaft!'",
			opts: [
				{ 
					t: "Umkehren und im Serverraum essen", 
					rep: { "Dr. Wichtig": -10 },
					m: 25, f: 15, a: -5, c: 15, 
					r: "Du tust so, als hättest du ihn nicht gesehen. Du versteckst dich 25 Minuten im dunklen Serverraum. Friedlich, aber der Chef hat deine Flucht genau bemerkt." 
				},
				{ 
					t: "Hinsetzen & Mentoring ertragen", 
					rep: { "Dr. Wichtig": 15 },
					m: 45, f: -10, a: 20, c: -20, 
					r: "Du sitzt 45 Minuten gerade wie ein Brett, während er dir von seinen Golf-Erfolgen erzählt. Dein Essen bleibt unverdaut im Magen liegen. Stress pur, aber gut für die Karriere." 
				},
				{ 
					t: "Essen runterschlingen & flüchten", 
					rep: { "Dr. Wichtig": -5 },
					m: 15, f: 0, a: 25, c: 5, 
					r: "Du atmest dein Schnitzel in Rekordzeit ein. 'Muss an den Server, Chef!' Er guckt irritiert auf deine leeren Teller. Du hast Sodbrennen für den Rest des Tages." 
				}
			]
		},
		{
			id: "lunch_mandatory_walk",
			title: "MITTAG: DIE ZWANGS-RUNDE",
			text: "Du willst gerade reinbeißen, da greift dich der agile Projektleiter am Arm. 'So Müller, genug gesessen! Wir machen jetzt den 'Healthy-Brain-Walk' um den Block! Kommen Sie, frische Luft macht produktiv!'",
			opts: [
				{ 
					t: "Mitlaufen (Gruppenzwang)", 
					m: 40, f: -15, a: 15, c: -5, 
					r: "Du latscht 40 Minuten im Stechschritt durchs Industriegebiet. Du kommst verschwitzt zurück, hast Blasen an den Füßen und bist hungriger als vorher. Aber das Team liebt dich." 
				},
				{ 
					t: "Auf halber Strecke abseilen", 
					m: 20, f: 10, a: -5, c: 5, 
					r: "Als er nicht guckt, biegst du heimlich zum Dönerladen ab. Du hast 20 Minuten gebraucht, aber du hast warmes Essen. Hoffentlich merkt er nicht, dass du fehlst." 
				},
				{ 
					t: "Aggressiv ablehnen", 
					m: 5, f: 0, a: 10, c: 15, 
					r: "Du reißt dich los. 'Ich werde nicht fürs Spazierengehen bezahlt!' Er nennt dich im Intranet einen 'Bremser der Unternehmenskultur'. Du bist in 5 Minuten wieder am PC." 
				}
			]
		},
		{ 
			id: "lunch_throat_singing", 
			title: "MITTAG: KULTURELLE PAUSE", 
			text: "HR hat sich für den 'Diversity Lunch' etwas Besonderes ausgedacht. In der Mitte der Kantine sitzt eine mongolische Kehlkopfgesang-Band und brummt extrem laut. Die Tische vibrieren. Niemand traut sich, etwas zu sagen.", 
			opts: [ 
				{  
					t: "Einfach mitbrummen",  
					m: 45, f: -10, a: -15, c: 15,  
					r: "Du schließt die Augen und stimmst in das tiefe 'Ooooommmm' ein. Die Vibrationen lösen deine Verspannungen. Die Kollegen vom Vertrieb starren dich verstört an, aber dein Stresslevel sinkt rapide. Du bist eins mit dem Server."  
				}, 
				{  
					t: "Fluchtartig den Raum verlassen",  
					m: 30, f: 5, a: 10, c: 0,  
					r: "Das ist dir einfach zu wild für einen Dienstagmittag. Du drehst auf dem Absatz um, kaufst dir am Kiosk ein trockenes Käsebrötchen und isst es frierend auf dem Parkplatz. Wenigstens hast du dort deine absolute Ruhe."  
				}, 
				{  
					t: "Noise-Cancelling Kopfhörer aufsetzen", 
					req: "headphones", 
					m: 30, f: -15, a: -10, c: 0,  
					r: "Du drückst den Knopf und die Welt verstummt. Du siehst nur noch vier wild gestikulierende Männer in traditioneller Tracht, während du ungestört deine Nudeln kaust. Eine surreale, aber wunderbar entspannende Pause."  
				} 
			] 
		},
		{ 
			id: "lunch_chili_war", 
			title: "MITTAG: KAMPF UMS CHILI", 
			text: "In der Kantine gibt es das legendäre Chili con Carne. Es ist nur noch eine Kelle im Topf. Vertriebsleiter Markus steht neben dir und knurrt: 'Ich hatte heute drei Deals. Ich brauche das.'", 
			opts: [ 
				{  
					t: "Ihn zur Seite schieben und nehmen", 
					rep: { "Markus": -15 }, 
					m: 30, f: -10, a: 5, c: 5,  
					r: "IT-Priorität sticht Vertrieb! Du sicherst dir rücksichtslos die letzte Kelle. Das Chili ist absolut himmlisch und wärmt deine Seele. Markus starrt dir mit zusammengekniffenen Augen hasserfüllt beim Kauen zu. Das war es wert."  
				}, 
				{  
					t: "Gesundes Sandwich auspacken", 
					rem: "sandwich", 
					m: 30, f: -15, a: -5, c: 0,  
					r: "'Gönn dir, Markus. Du siehst blass aus.' Du öffnest deinen Rucksack und beißt genüsslich in dein eigenes, perfektes Pastrami-Sandwich. Er ist völlig perplex von deiner Großzügigkeit, während du auf Wolke sieben kaust."  
				}, 
				{  
					t: "Extrem laut über den Topf niesen",  
					m: 20, f: 0, a: -5, c: 15,  
					r: "'Haaaa-tschi!' Du fälschst einen massiven, feuchten Nieser direkt über dem Topf. Markus weicht angewidert zurück und verliert den Appetit. Du hast das Chili für dich allein, aber HR wird garantiert von diesem Vorfall hören."  
				} 
			] 
		},
		{ 
			id: "lunch_fish_microwave", 
			title: "MITTAG: BIO-WAFFE", 
			text: "Du willst dir dein Essen aufwärmen, als dir eine Wand aus Gestank entgegenkommt. Azubi Kevin macht sich Kabeljau vom Vortag in der Mikrowelle warm. Der Geruch brennt regelrecht in den Augen.", 
			opts: [ 
				{  
					t: "Den Stecker der Mikrowelle ziehen", 
					rep: { "Kevin": -10 }, 
					m: 30, f: -5, a: 5, c: 0,  
					r: "Du gehst stumm zur Mikrowelle und ziehst den Stecker. 'Fisch ist ein Kündigungsgrund, Kevin. Lern die ungeschriebenen Gesetze.' Du isst dein eigenes Essen heute kalt, aber immerhin musst du nicht in dieser Wolke atmen."  
				}, 
				{  
					t: "Das Gebäude würgend verlassen",  
					m: 45, f: 0, a: 10, c: 0,  
					r: "Der Gestank triggert deinen Fluchtreflex. Du stürmst aus dem Gebäude und holst dir beim Imbiss um die Ecke einen viel zu teuren Döner. Das kostet Geld und Zeit, bewahrt dich aber vor einem handfesten Trauma."  
				}, 
				{  
					t: "Mit dem Feuerlöscher lüften", 
					req: "fire_ext", 
					m: 10, f: 0, a: -5, c: 10,  
					r: "ZISCH! Ein kurzer, harter CO2-Sprühstoß direkt in die Küche vertreibt nicht nur den beißenden Fischgeruch, sondern treibt auch Kevin hustend in den Flur. Das ist zweifellos aggressiv, aber absolut effektiv für das Raumklima."  
				} 
			] 
		},
		{ 
			id: "lunch_tupperware", 
			title: "MITTAG: DAS RELIKT", 
			text: "Ganz hinten im Kühlschrank steht eine Tupperdose ohne Namen. Der Inhalt ist unkenntlich, grau-grünlich, extrem aufgebläht und bewegt sich scheinbar ganz leicht. Ein eigenes Ökosystem.", 
			opts: [ 
				{  
					t: "Mit Panzertape versiegeln", 
					req: "tape", 
					m: 15, f: -5, a: 0, c: 5,  
					r: "Du holst deine treue Rolle Panzertape heraus und wickelst präventiv drei dicke Schichten um die Dose, damit sie nicht platzt. Du fühlst dich wie ein Bombenentschärfer. Das Problem ist für die Nachwelt gesichert."  
				}, 
				{  
					t: "Den Deckel mutig öffnen",  
					m: 30, f: 10, a: 15, c: 10,  
					r: "PFFFFT! Ein übler, säuerlicher Überdruck entweicht zischend in den Raum. Dir wird sofort extrem schlecht, dein Magen dreht sich um und deine gesamte Mittagspause ist gelaufen. Du musst dich dringend am offenen Fenster setzen."  
				}, 
				{  
					t: "Egon per Eil-Ticket rufen", 
					rep: { "Egon": 5 }, 
					m: 30, f: -10, a: -5, c: 0,  
					r: "Das ist ein Fall fürs Facility Management. Egon rückt mit dicken Arbeitshandschuhen an. Er packt das verfluchte Ding und entsorgt es fluchend im Sondermüll. Ein wahrer Team-Effort, der die Abteilung rettet."  
				} 
			] 
		},
		{ 
			id: "lunch_kicker_bros", 
			title: "MITTAG: ALPHA-TURNIER", 
			text: "Du willst in Ruhe sitzen, aber die Bros vom Vertrieb zerren dich an den Tischkicker. 'Komm schon, IT! Zeig mal, ob du auch analoge Reflexe hast!' Sie grinsen herablassend.", 
			opts: [ 
				{  
					t: "Den Ball einstecken und weggehen",  
					m: 15, f: -5, a: 10, c: 5,  
					r: "Du sagst kein einziges Wort, greifst mitten im Spiel in das Feld, nimmst den Ball, steckst ihn in deine Tasche und gehst entspannt dein Brot essen. Ultimative Dominanz. Sie schauen dir völlig fassungslos hinterher."  
				}, 
				{  
					t: "Energy Drink exen und sie vernichten", 
					rem: "energy", 
					m: 30, f: -15, a: -10, c: 5,  
					r: "Das Taurin kickt heftig. Deine Reaktionen verzehnfachen sich. Du spielst wie ein entfesselter Gott und vernichtest sie 10:0. Sie stehen schweigend und gedemütigt da. Die Ehre der IT strahlt heller denn je."  
				}, 
				{  
					t: "Absichtlich extrem schlecht spielen",  
					m: 30, f: -5, a: 5, c: 0,  
					r: "Du hast absolut keine Lust auf diesen Wettbewerb. Du schießt absichtlich drei peinliche Eigentore. Sie verlieren sofort jeglichen Respekt und das Interesse an dir. Für den Rest des Jahres lassen sie dich in Ruhe. Clever."  
				} 
			] 
		},
		{ 
			id: "lunch_mettigel", 
			title: "MITTAG: ROHE GEFAHR", 
			text: "Frau Elster hat Geburtstag und einen traditionellen 'Mettigel' in die ungekühlte Teeküche gestellt. Es ist Hochsommer. Er steht da seit 4 Stunden.", 
			opts: [ 
				{  
					t: "Lieber Schokolade aus dem Vorrat essen", 
					rem: "chocolate", 
					m: 30, f: -15, a: -5, c: 0,  
					r: "Du riskierst nicht dein Leben für einen Büro-Snack. Du ignorierst die tickende biologische Zeitbombe und greifst stattdessen zu deinem eigenen, haltbaren Zucker-Vorrat. Sicher ist sicher."  
				}, 
				{  
					t: "Ein großes Stück davon essen",  
					m: 45, f: 20, a: 10, c: 0,  
					r: "Das Fleisch schmeckt überraschend gut, aber das rächt sich schnell. Keine 20 Minuten später liegst du schweißgebadet auf der Firmen-Toilette und flehst um Erlösung. Eine absolute Fehlentscheidung."  
				}, 
				{  
					t: "Den Igel in den Müll werfen", 
					rep: { "Frau Elster": -20 }, 
					m: 15, f: 0, a: 5, c: 15,  
					r: "Du bewahrst die gesamte Firma vor einer sicheren Salmonellen-Welle und versenkst das Fleisch. Frau Elster erwischt dich dabei und weint bittere Tränen, weil 'niemand in diesem Haus ihre traditionelle Handarbeit schätzt'."  
				} 
			] 
		},
		{ 
			id: "lunch_nap_attack", 
			title: "MITTAG: UNTERBROCHENER SCHLAF", 
			text: "Du liegst auf der Couch im dunklen Pausenraum und schläfst fast ein. Plötzlich stürmt Chantal herein, macht das extrem grelle Licht an und nimmt lautstark Sprachnachrichten auf.", 
			opts: [ 
				{  
					t: "Aufstehen und sie anknurren", 
					rep: { "Chantal": -10 }, 
					m: 15, f: 5, a: 15, c: 0,  
					r: "Dein Puls schießt von null auf hundert. 'RAUS!', brüllst du mit rauer, kratziger Schlafmangel-Stimme. Sie lässt ihr Handy fallen und rennt weg. Dein Revier ist verteidigt, aber du bist jetzt hellwach und furchtbar wütend."  
				}, 
				{  
					t: "Stressball an den Lichtschalter werfen", 
					req: "stressball", 
					m: 30, f: -10, a: -5, c: 5,  
					r: "ZACK! Ein perfekter, blinder Wurf. Der Ball knallt auf den Schalter und das Licht geht aus. Chantal quiekt panisch auf und flüchtet vor dem vermeintlichen 'Poltergeist'. Du sinkst grinsend zurück in den Schlaf."  
				}, 
				{  
					t: "Mit Panzertape eine Schlafmaske bauen", 
					req: "tape", 
					m: 45, f: -15, a: 5, c: 0,  
					r: "Streiten kostet nur Energie. Du reißt dir Tape ab und klebst es dir als Maske über die Augen. Chantal macht ein kicherndes Foto von dir für Instagram, aber das ist dir egal – du kannst weiter schlafen."  
				} 
			] 
		},
		{ 
			id: "lunch_teambuilding_pizza", 
			title: "MITTAG: DIE PIZZA-FALLE", 
			text: "Der CEO hat Pizza bestellt! Es ist eine Falle: Während alle kauen, schaltet er den Beamer an. 'Lasst uns über die neuen KPIs im Ticket-System sprechen!'", 
			opts: [ 
				{  
					t: "Mit vollem Mund gegen KPIs argumentieren", 
					rep: { "Dr. Wichtig": 10 }, 
					m: 60, f: 10, a: 10, c: 5,  
					r: "Dir platzt der Kragen. Mit vollem Mund fängst du an, die neuen Regeln hart zu kritisieren. Die Kollegen rollen genervt mit den Augen. Deine Erholungs-Pause ist dahin, aber der CEO schätzt deinen 'leidenschaftlichen Einsatz'."  
				}, 
				{  
					t: "Win95-Handbuch aufschlagen und lesen", 
					req: "manual", 
					m: 45, f: -10, a: 0, c: -5,  
					r: "Du schlägst den dicken Wälzer auf und tust so, als würdest du antike Netzwerk-Protokolle studieren. Der Chef respektiert diese 'eigenverantwortliche Weiterbildung' und lässt dich mit seinen lästigen Fragen völlig in Ruhe."  
				}, 
				{  
					t: "Zwei Stücke Pizza schnappen und flüchten",  
					m: 15, f: -5, a: 5, c: 10,  
					r: "Die Hit-and-Run-Taktik! Du grapschst dir blitzschnell zwei große Stücke Salami-Pizza und flüchtest in den Serverraum. Das gibt Minuspunkte beim Team-Geist, aber du rettest erfolgreich deine hart verdiente freie Zeit."  
				} 
			] 
		},
		{ 
			id: "lunch_fridge_thief", 
			title: "MITTAG: DER DIEB", 
			text: "Jemand klaut in letzter Zeit Essen. Du hast dir einen teuren Schokopudding mitgebracht und hast Angst, ihn unbewacht im Kühlschrank zu lassen.", 
			opts: [ 
				{  
					t: "Falschen Zettel draufkleben",  
					m: 30, f: -10, a: -5, c: 0,  
					r: "Du nimmst einen Post-it und schreibst in krakeliger Schrift 'Medizinische Stuhlprobe - Dr. Wichtig' darauf. Niemand im ganzen Gebäude wagt es, das Ding auch nur anzusehen. Pure psychologische Kriegsführung."  
				}, 
				{  
					t: "Verstecken und dem Dieb auflauern",  
					m: 45, f: 10, a: 10, c: 5,  
					r: "Du verbringst deine komplette Pause kniend und lauernd hinter der Tür neben dem Kühlschrank. Dir schlafen die Beine ein, aber der Dieb taucht einfach nicht auf. Du hast deine wertvolle Freizeit völlig umsonst geopfert."  
				}, 
				{  
					t: "Mit Kabelbindern die Tupperdose sichern", 
					req: "zip_ties", 
					m: 30, f: -10, a: 0, c: 0,  
					r: "Das ist jetzt ein Hochsicherheitstrakt. Du zurrst das Gefäß kreuz und quer zu. Der Dieb müsste schon eine Astschere mitbringen, um da ranzukommen. Dein Pudding ist absolut sicher und schmeckt danach umso besser."  
				} 
			] 
		},
		{ 
			id: "lunch_server_zen", 
			title: "MITTAG: DER IT-TEMPEL", 
			text: "Im Flur schreien sich zwei Abteilungen an. Du hast keine Kraft mehr für Menschen. Du nimmst dein Essen und gehst in den kühlen Serverraum.", 
			opts: [ 
				{  
					t: "Auf dem Boden sitzen und ins Leere starren",  
					m: 30, f: -10, a: -5, c: 0,  
					r: "Du isst gar nicht. Du setzt dich einfach im Schneidersitz auf den kühlen Gitterboden und starrst ins dunkle Nichts. Manchmal reicht es schon aus, einfach für 30 Minuten keine menschliche Stimme hören zu müssen."  
				}, 
				{  
					t: "Kabel entwirren und meditieren", 
					req: "cable", 
					m: 45, f: -15, a: -10, c: 0,  
					r: "Während du langsam isst, ordnest du liebevoll und extrem symmetrisch die Patchkabel im Rack. Das monotone Surren der Lüfter und das rhythmische Blinken der LEDs heilen deine gebrochene Admin-Seele Stück für Stück."  
				}, 
				{  
					t: "Einen Donut opfern und entspannen", 
					rem: "donut", 
					m: 30, f: -15, a: -15, c: 0,  
					r: "Kühle, gefilterte Luft, das hypnotische Rauschen schwerer Maschinen und der pure, ungesunde Zucker in deinen Adern. Du hast dich abgekapselt und bist im absoluten SysAdmin-Himmel angekommen."  
				} 
			] 
		},
		{ 
			id: "lunch_cheap_ceo", 
			title: "MITTAG: GEWINNBETEILIGUNG", 
			text: "Der CEO mailt: 'Dank Rekordumsatz gibt die Firma Mittagessen aus!' In der Kantine steht ein Karton von McDonald's. Es gibt EINEN lauwarmen Cheeseburger pro Person. Der Karton ist fast leer.", 
			opts: [ 
				{  
					t: "Azubi Kevin den Vortritt lassen", 
					rep: { "Kevin": 5 }, 
					m: 5, f: 0, a: 10, c: 0,  
					r: "Du trittst zurück und überlässt dem hungrigen Azubi das letzte Essen. Du lächelst tapfer, aber diese bodenlose, respektlose Unverschämtheit der reichen Geschäftsführung lässt dein Blut förmlich kochen. Ein echter Tiefpunkt."  
				}, 
				{  
					t: "Dein Gourmet-Sandwich auspacken", 
					rem: "sandwich", 
					m: 30, f: -15, a: -10, c: 0,  
					r: "Du ziehst dich demonstrativ aus dem Gerangel zurück und beißt grinsend in dein exzellentes Pastrami-Sandwich. Während sich die anderen um traurige Reste streiten, bist du dem System meisterhaft entkommen."  
				}, 
				{  
					t: "Letzten Burger vor Markus wegschnappen", 
					rep: { "Markus": -5 }, 
					m: 10, f: -5, a: 15, c: 0,  
					r: "Überleben des Stärkeren! Du sicherst dir das lauwarme Patty. Es schmeckt nach purem Geiz und Enttäuschung, aber wenigstens hast du diesen kleinen, primitiven Machtkampf gegen den arroganten Vertriebsleiter gewonnen."  
				} 
			] 
		},
		{
			id: "lunch_sponsorenlauf",
			title: "MITTAG: DAS BUFFET DER PARTNER",
			text: "In der Kantine ist ein Buffet aufgebaut: 'Kostenlos für alle Mitarbeitenden - präsentiert von unserem neuen IT-Dienstleister!' Es gibt Rinderfilet, drei Sorten Dessert und einen Aufsteller mit dem Logo einer Firma, die letzte Woche ein Angebot für die Ablösung der internen IT abgegeben hat. Also für deine Ablösung.",
			opts: [
				{
					t: "Demonstrativ am Buffet vorbeigehen",
					m: 30, f: 0, a: 20, c: -10,
					r: "Du holst dir ein Brötchen aus dem Automaten und isst es sichtbar neben dem Aufsteller. Eine Geste, die niemand versteht außer dir - und dem Vertriebler, der sie sehr wohl versteht und dich fortan meidet. Hunger und Haltung sind selten dasselbe."
				},
				{
					t: "Den Vertriebler in ein Fachgespräch verwickeln",
					m: 60, f: -10, a: 10, c: -15,
					r: "Du fragst nach Migrationspfaden, Altsystem-Schnittstellen und der Betreuung von Fachanwendungen aus 2009. Nach vierzig Minuten ist er sichtlich zermürbt und du kennst ihre Schwachstellen. Das Essen hast du komplett verpasst. Aber du hast Munition."
				},
				{
					t: "Alles fotografieren und Frau Elster schicken",
					req: "black_card",
					m: 20, f: 0, a: -5, c: -20,
					r: "Du dokumentierst das Buffet wie ein Gutachter und schickst die Bilder an die Buchhaltung mit der Frage nach der Zuwendungsgrenze. Frau Elsters Antwort kommt binnen Minuten: 'Ich übernehme.' Am Nachmittag wird das Buffet 'aus formalen Gründen' abgebaut. Der Dienstleister hat noch nichts verkauft und schon einen Feind."
				},
				{
					t: "Kostenlos ist kostenlos - zugreifen",
					m: 45, f: 10, a: -15, c: 30,
					r: "Das Filet ist hervorragend, und genau in dem Moment, in dem du dir nachnimmst, macht der Vertriebler des Dienstleisters ein Foto 'für die Doku'. Es taucht später in seiner Präsentation auf, Folie 12: 'Die IT-Abteilung freut sich bereits auf die Zusammenarbeit.' Dr. Wichtig hat diese Folie gesehen."
				}
			]
		},
		{
			id: "lunch_thermomix",
			title: "MITTAG: DIE VORFÜHRUNG",
			text: "Jemand aus der Verwaltung hat einen Küchen-Vollautomaten mitgebracht und kocht damit in der Teeküche für alle. Es riecht fantastisch. Es gibt aber einen Haken: Das Gerät hängt an der einzigen freien Steckdose der Küche - und der Kühlschrank mit dem Insulin einer Kollegin an einer Mehrfachleiste, die dadurch spürbar warm wird.",
			opts: [
				{
					t: "Erst die Stromverteilung retten, dann essen",
					m: 30, f: -10, a: 5, c: -10,
					r: "Du legst ein Verlängerungskabel aus dem Flur, hängst das Gerät auf einen eigenen Stromkreis und beschriftest die Kühlschrank-Leitung. Zehn Minuten Arbeit in der Pause - und ein Teller, der noch warm ist, als du dich endlich setzt. Niemand hat gemerkt, dass hier gerade etwas nicht passiert ist."
				},
				{
					t: "Die Vorführung abbrechen lassen",
					m: 15, f: 0, a: 30, c: 0,
					r: "Du ziehst den Stecker und erklärst die Leitungslage. Fachlich unangreifbar, sozial eine Katastrophe: Zwölf hungrige Menschen sehen zu, wie ihr Mittagessen halbgar erkaltet, und die Verwaltungskollegin packt wortlos ein. Du hast recht. Du isst allein."
				},
				{
					t: "Mitessen, das regelt sich schon",
					m: 45, f: 15, a: 10, c: 25,
					r: "Das Essen ist ausgezeichnet. Die Mehrfachleiste gibt um 13:40 Uhr auf, der Kühlschrank steht zwei Stunden unbemerkt still, und die Frage, warum die IT das nicht gesehen hat, wird von genau der Kollegin gestellt, deren Medikament darin lag. Es ist noch einmal gutgegangen. Der Satz 'die IT hat mitgegessen' bleibt trotzdem im Raum."
				}
			]
		},
		{
			id: "lunch_gruppenfoto",
			title: "MITTAG: DAS GRUPPENFOTO",
			text: "Chantal fängt dich mit dem Teller in der Hand ab: 'Wir machen JETZT das Team-Foto für die Karriereseite! Alle sind schon draußen im Innenhof!' Draußen sind es sechs Grad. Dein Essen ist warm. Beides wird sich in den nächsten zwanzig Minuten ändern.",
			opts: [
				{
					t: "Kevin vorschicken, er hat mehr Haare",
					m: 10, f: 10, a: 0, c: 10,
					r: "Kevin ist begeistert und steht auf dem finalen Bild in der vordersten Reihe, Bildunterschrift: 'Unsere IT'. Er ist im dritten Lehrmonat. Auf der Karriereseite ist er jetzt das Gesicht deiner Abteilung, und zwei Bewerbungen kommen mit der Anrede 'Sehr geehrter Herr Kevin' herein."
				},
				{
					t: "Mit Kopfhörern so tun, als hättest du nichts gehört",
					req: "headphones",
					m: 5, f: 15, a: -15, c: 5,
					r: "Der älteste Trick des Großraumbüros, ausgeführt mit der Ruhe eines Profis: Blick auf den Bildschirm, Kopfhörer auf, leicht im Takt nickend. Chantal winkt zweimal, zuckt mit den Schultern und zieht weiter. Du isst warm, in Frieden, und niemand kann dir etwas vorwerfen. Nur du weißt, dass du jedes Wort gehört hast."
				},
				{
					t: "Mitkommen und mitlächeln",
					m: 40, f: -5, a: 20, c: -10,
					r: "Zwanzig Minuten Innenhof, achtzig Aufnahmen, weil Markus auf jeder blinzelt. Dein Essen ist kalt, deine Finger sind klamm, und auf dem finalen Bild stehst du hinten links halb hinter Kevin. Auf der Karriereseite steht darunter: 'Ein Team, das zusammenhält.'"
				},
				{
					t: "Ablehnen: Pause ist Pause",
					m: 5, f: 5, a: -10, c: 20,
					r: "Du isst in Ruhe zu Ende. Auf dem Foto fehlt die IT vollständig - was niemandem auffällt, bis Dr. Wichtig es sechs Wochen später auf der fertigen Karriereseite bemerkt und in der Abteilungsrunde fragt, ob 'die IT sich nicht als Teil des Teams sieht'. Die Frage klingt harmlos. Sie ist es nicht."
				}
			]
		},
	];
