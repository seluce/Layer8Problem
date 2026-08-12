export const bossfights = [

   {
		id: "boss_ransomware",
		title: "🚨 RANSOMWARE ANGRIFF 🚨",
		text: "EIN TOTENKOPF AUF DEM HAUPTSERVER! 'Senden Sie 10 Bitcoin oder alles wird gelöscht'. Der Countdown läuft! (10 Sekunden)",
		timer: 10, 
		opts: [
			{ t: "Admin-Code eingeben", req: "admin_pw", m: 5, f: 0, a: -10, c: -20, r: "Profi-Move! Angriff abgewehrt. Held der Firma!" },
			{ t: "Stecker ziehen!", m: 10, f: -10, a: 20, c: 10, r: "Brachial, aber wirksam. Server ist aus. Daten gerettet (vielleicht)." }
		],
		fail: {rep: { "Dr. Wichtig": -20 }, m: 30, f: 0, a: 50, c: 50, r: "ZU LANGSAM! Daten verschlüsselt. Chef tobt!" }
	},
	{
		id: "boss_fire",
		title: "🔥 SERVER BRAND 🔥",
		text: "Rauch im Serverraum! Ein Kondensator ist geplatzt! Flammen schlagen hoch! Handeln Sie!",
		timer: 8,
		opts: [
			{ t: "Wegrennen und Alarm drücken", m: 60, f: 10, a: 10, c: 25, r: "Feuerwehr kommt. Büro evakuiert. Du hast Pause." },
			{ t: "Feuerlöscher benutzen", req: "fire_ext", m: 30, f: -10, a: 10, c: -20, r: "Feuer gelöscht. Du hustest, aber bist ein Held." }
		],
		fail: { m: 120, f: -20, a: 30, c: 40, r: "SPRINKLERANLAGE AKTIV! Von der Decke regnet es auf Server, Akten und deine letzte Hoffnung. Totalschaden." }
	},
	{
		id: "boss_stream",
		char: "Dr. Wichtig",
		title: "☠️ CEO LIVE-STREAM FAIL ☠️",
		text: "Der CEO präsentiert live vor 5000 Investoren. Das Bild friert ein! Er ruft dich auf dem Handy an und brüllt: 'MACHEN SIE DASS ES GEHT! JETZT SOFORT!'",
		timer: 12,
		opts: [
			{ t: "Backup-Leitung schalten", req: "admin_pw", rep: { "Dr. Wichtig": 10 }, m: 5, f: -10, a: 0, c: -20, r: "Profi-Reaktion! Der Stream läuft wieder in 4K. Der CEO wirkt erleichtert (und schwitzt)." },
			{ t: "Qualität auf 'Kartoffel' (240p) setzen", rep: { "Dr. Wichtig": -5 }, m: 5, f: 5, a: 0, c: 25, r: "Es läuft wieder flüssig. Aber der CEO sieht aus wie eine Lego-Figur. Aus dem Stream-Chat regnen Klötzchen-Emojis." }
		],
		fail: { rep: { "Dr. Wichtig": -20 }, m: 20, f: 0, a: 40, c: 60, r: "STREAM ABGEBROCHEN. Aktienkurs fällt um 10%. Der Chef kommt persönlich runter..." }
	},
	{
		id: "boss_ddos",
		title: "🧟 ZOMBIE BOTNET ANGRIFF 🧟",
		text: "ALARM! Millionen von gehackten Kühlschränken greifen unsere Webseite an! Die Firewall glüht! Traffic bei 5000%!",
		timer: 15,
		opts: [
			{ t: "Stecker vom Router ziehen", m: 5, f: 10, a: -5, c: 20, r: "Der Angriff ist gestoppt. Aber wir sind offline. Technisch gesehen ein Erfolg, wirtschaftlich eine Katastrophe." },
			{ t: "Geo-Blocking aktivieren", m: 10, f: -5, a: 5, c: -5, r: "Zack! Der ganze Traffic aus Übersee ist geblockt. Die Seite läuft wieder. Kollateralschaden gering." }
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
			{ t: "Not-Aus drücken", m: 5, f: 5, a: 10, c: 25, r: "Alles fährt runter. Die Stille ist gespenstisch. Hardware sicher, aber die Firma steht still." }
		],
		fail: { m: 120, f: -20, a: 50, c: 50, r: "KERN-SCHMELZE! Es riecht nach verschmortem Plastik. Der Feuermelder geht los. Renn!" }
	},
	{
		id: "boss_db_purge",
		title: "💀 DROP DATABASE PROD 💀",
		text: "ALARM! Der Azubi Kevin hat 'aus Versehen' das Lösch-Skript auf der LIVE-DATENBANK gestartet! Die Balken werden rot! Kundendaten verschwinden im Sekundentakt! (8 Sekunden)",
		timer: 8,
		opts: [
			{ 
				t: "Netzwerkbrücke bauen", 
				req: "cable",
				m: 10, f: -10, a: 10, c: 0, 
				r: "Du stöpselst wild Kabel um und leitest den Traffic auf den Test-Server. Die Löschung läuft ins Leere. Kevin starrt dich bewundernd an." 
			},
			{ 
				t: "Admin-Override", 
				req: "admin_pw", 
				m: 5, f: 5, a: -10, c: -20,
				r: "Mit zitternden Händen tippst du das Root-Passwort. 'ROLLBACK COMPLETE'. Du bist ein Gott. Die Daten sind sicher." 
			},
			{ 
				t: "Die ganze Steckerleiste rausreißen", 
				m: 45, f: 0, a: 20, c: 30,
				r: "KLACK. Funken sprühen. Das Büro ist dunkel. Die Löschung ist gestoppt... genau wie der Rest der Firma. Der Server-Check dauert ewig (45 Min), aber die Daten leben noch." 
			}
		],
		fail: { 
			rep: { "Dr. Wichtig": -10 },	
			m: 120, f: -50, a: 50, c: 80, 
			r: "DATENBANK LEER. 'Error 404: Company not found'. Der Chef steht weinend im Serverraum. Du solltest schon mal deinen Lebenslauf aktualisieren." 
		}
	},
	{
		id: "boss_tiktok",
		title: "🤳 TIKTOK INVASION 🤳",
		text: "Ein bekannter Influencer ist in den Serverraum eingedrungen! 'Yo Leute, checkt mal diese blinkenden Lichter! Ich zieh mal hier dran für den Prank!' Er greift nach dem Haupt-Switch!",
		timer: 12,
		opts: [
			{ 
				t: "Per Bürgerfestnahme fesseln", 
				req: "zip_ties",
				m: 15, f: -5, a: -20, c: 10, 
				r: "Du hast ihn mit Kabelbindern an ein Rack gefesselt, bis die Security kam. Das Video geht viral: 'Sigma Male Admin verteidigt Revier'. Die Kommentare feiern dich." 
			},
			{ 
				t: "Mit Feuerlöscher 'einnebeln'", 
				req: "fire_ext", 
				m: 10, f: 0, a: 30, c: 0, 
				r: "WOOSH! Du hast ihn komplett eingeweißt. Er hustet und rennt weg: 'Mein Merch ist ruiniert!'. Die Server sind staubig, aber sicher." 
			},
			{ 
				t: "Mit einem Bodycheck stoppen", 
				m: 5, f: 0, a: 40, c: 20, 
				r: "Du rammst ihn mit voller Wucht weg, bevor er den Stecker zieht. Sein Smartphone fliegt gegen ein Rack (kaputt). Er heult und droht mit Anwalt. Du hast blaue Flecken und bist stinksauer." 
			}
		],
		fail: { 
			m: 60, f: 0, a: 50, c: 50, 
			rep: { "Dr. Wichtig": -10 },	
			r: "ER HAT DEN STECKER GEZOGEN! 'Ouuuups, war nur ein Prank Bro!'. Das Internet ist weg. Du gehst viral als 'Der heulende Admin' und wirst zum Meme. Der Chef ist 'not amused'." 
		}
	},
	{
		id: "boss_ups_battery",
		title: "🔋 USV BATTERIE SÄURE 🔋",
		text: "Die Notstrom-Batterie bläht sich auf wie ein Ballon! Es zischt! Säure droht auszutreten und durch den Doppelboden in die Etage darunter zu tropfen (Chefbüro)!",
		timer: 10,
		opts: [
			{ t: "Aus dem Fenster werfen", m: 5, f: 10, a: 20, c: 20, r: "Du hast das 20kg Teil durchs geschlossene Fenster geworfen. Es explodiert auf dem Parkplatz. Besser dort als hier." },
			{ t: "MacGyver-mäßig mit Panzertape abdichten", req: "tape", m: 10, f: 0, a: 0, c: -10, r: "Du wickelst eine ganze Rolle Panzertape drum. Es hält den Druck... gerade so. Zeitbombe entschärft (für heute)." }
		],
		fail: { rep: { "Dr. Wichtig": -20 }, m: 240, f: -30, a: 40, c: 80, r: "SÄURE-LECK! Es frisst sich durch den Boden. Es tropft auf den Schreibtisch des Chefs. Der Geruch ist bestialisch." }
	},
	{
		id: "boss_skynet_lock",
		title: "🔒 TÜREN VERRIEGELT 🔒",
		text: "Fehlfunktion im Sicherheitssystem! Die Brandschutztüren schließen sich. Der Sauerstoff wird abgesaugt (Halon-Anlage). Du hast 10 Sekunden, bevor du ohnmächtig wirst!",
		timer: 10,
		opts: [
			{ 
				t: "Scheibe mit Hammer einschlagen", 
				req: "hammer", 
				m: 5, f: 0, a: 10, c: 10, 
				r: "Klirr! Du kletterst durch die Scherben. Freiheit! Aber du musst den Schaden erklären." 
			},
			{ 
				t: "Scheibe mit dem Ellbogen rammen", 
				m: 5, f: 0, a: 30, c: 10, 
				r: "AUTSCH! Mit einem Schrei wirfst du dich ins Glas. Es splittert. Dein Arm blutet und pocht wie wild, aber du bekommst Luft." 
			},
			{ 
				t: "Tür aufschrauben", 
				req: "screw", 
				m: 10, f: -10, a: 0, c: 0, 
				r: "In Rekordzeit hast du das Panel abgeschraubt und die Drähte kurzgeschlossen. Tür offen. Du lebst!" 
			}
		],
		fail: {
			rep: { "Dr. Wichtig": -10 },				
			m: 120, f: 30, a: 20, c: 50, 
			r: "OHNMACHT. Du wachst im Krankenhaus auf. Der Chef steht am Bett: 'Wer schläft, fliegt! Das ziehen wir vom Lohn ab!'" 
		}
	},
	{
		id: "boss_coffee_crisis",
		title: "☕ KAFFEE-MASCHINE EXPLOSION ☕",
		text: "NICHT DER SERVERRAUM! SCHLIMMER! Die Industriemaschine in der Küche vibriert und sprüht heißen Dampf! Der Druckkessel steht kurz vor dem Bersten! Ohne Kaffee stirbt die Abteilung!",
		timer: 9,
		opts: [
			{ t: "Überdruckventil öffnen", req: "screw", m: 5, f: -5, a: -10, c: -5, r: "Pfeifend entweicht der Druck. Du bist der Held der Belegschaft. Applaus im Flur!" },
			{ t: "Stecker ziehen & wegrennen", m: 5, f: 10, a: 25, c: 10, r: "Die Maschine beruhigt sich langsam. Aber: KEIN KAFFEE MEHR HEUTE. Die Kollegen schauen dich mit mordlustigen Augen an." }
		],
		fail: { m: 60, f: 0, a: 50, c: 20, r: "KA-WUMM! Die Küche ist voller Kaffeesatz. Die Maschine ist Schrott. Die Moral der Firma sinkt auf 0. Es herrschen anarchische Zustände." }
	},
	{
		id: "boss_printer_rage",
		title: "BOSS: DER DRUCKER DES TODES",
		text: "ALARM! Der Großraumdrucker rattert wie ein Maschinengewehr! Er spuckt hunderte schwarze Seiten aus, Rauch steigt auf. Das Display blinkt: 'FEED ME STRAY CAT'. Er droht zu überhitzen und die Sprinkleranlage auszulösen!",
		timer: 15,
		opts: [
			{ 
				t: "Stecker ziehen", 
				m: 5, f: 0, a: 10, c: 20, 
				r: "Du kriechst unter den Tisch und reißt das Kabel raus. Dabei fährst du den PC der Sekretärin mit runter. Sie schreit. Der Drucker ist aus, aber der Ärger ist groß." 
			},
			{ 
				t: "PERCUSSIVE MAINTENANCE!", 
				req: "hammer",
				m: 5, f: 5, a: -20, c: 0, 
				r: "BÄM! Ein gezielter Schlag mit dem Hammer auf das Gehäuse. Stille. Der Drucker piept friedlich 'Bereit'. Gewalt ist doch eine Lösung." 
			},
			{ 
				t: "Papierstau suchen", 
				m: 10, f: -5, a: 20, c: 10, 
				r: "Du greifst in die Mechanik. Der Drucker beißt dich! Du hast Tinte im Gesicht und Verbrennungen an den Fingern. Er hört von alleine auf, weil das Papier alle ist." 
			}
		],
		fail: { r: "BOOOOM! Der Drucker ist explodiert. Die Sprinkler gehen an. Alles ist nass. Du bist nass. Der Tag ist gelaufen.", m: 60, f: -10, a: 50, c: 50 }
	},
	{
		id: "boss_cable_mess",
		title: "BOSS: DER ISO-PRÜFER KOMMT",
		text: "PANIK! Der strenge Prüfer vom TÜV steht im Flur! Er steuert direkt auf den Serverraum zu! Dort hängen die Kabel wie Lianen im Dschungel von der Decke. Wenn er das sieht, entzieht er uns die Zertifizierung!",
		timer: 20,
		opts: [
			{ 
				t: "Alles ordentlich festzurren", 
				req: "zip_ties",
				m: 10, f: -5, a: -10, c: -5, 
				r: "Ratsch, Ratsch! In Rekordzeit bindest du die Kabel zu sauberen Strängen zusammen. Der Prüfer kommt rein: 'Vorbildlich! So muss das aussehen!' Puh." 
			},
			{ 
				t: "Alles in den Schrank stopfen", 
				m: 5, f: 5, a: 10, c: 10, 
				r: "Du drückst die Kabelmasse in den Schrank und lehnst dich gegen die Tür. Der Prüfer guckt misstrauisch. Die Tür knackt verdächtig. Er geht weiter, aber das war knapp." 
			},
			{ 
				t: "Ihn ablenken: 'Feueralarm!'", 
				m: 5, f: 0, a: 0, c: 40, 
				r: "Du drückst den Feuermelder. Alle müssen raus. Prüfung abgebrochen. Aber jetzt kommt die Feuerwehr (Kosten: 1000€). Der Chef sucht den Schuldigen." 
			}
		],
		fail: { rep: { "Dr. Wichtig": -10 }, r: "Der Prüfer öffnet die Tür. Er sieht das Chaos. Er weint leise. 'Zertifikat entzogen.' Der Chef tobt.", m: 60, f: 0, a: 40, c: 60 }
	},
	{
		id: "boss_water_leak",
		title: "BOSS: DAS ROHR BRICHT",
		text: "ZISCH! In der Teeküche ist ein Rohr geplatzt! Ein Strahl heißes Wasser schießt quer durch den Raum... direkt auf die ungeschützte Steckdosenleiste des Etagen-Verteilers! Stromausfall in 3... 2...",
		timer: 15,
		opts: [
			{ 
				t: "Daumen draufhalten", 
				m: 60, f: -20, a: 30, c: 0, 
				r: "Du hältst das Loch zu. Du stehst da 60 Minuten, bis der Klempner kommt. Dein Daumen ist verbrüht, deine Laune im Keller. Aber der Server lebt." 
			},
			{ 
				t: "Eimer drunterstellen", 
				m: 5, f: 5, a: 0, c: 20, 
				r: "Der Eimer ist sofort voll und läuft über. Das Wasser trifft die Steckdose. Kleiner Knall, Sicherung raus. Nicht ganz so schlimm wie ein Brand, aber peinlich." 
			},
			{ 
				t: "Mit Tape abdichten", 
				req: "tape",
				m: 5, f: 0, a: -10, c: 0, 
				r: "Du wickelst eine halbe Rolle Tape um das Rohr. Es hält! Es tropft nur noch leicht. Das Provisorium wird hier die nächsten 10 Jahre bleiben." 
			}
		],
		fail: { rep: { "Dr. Wichtig": -10 }, r: "ZAPP! Kurzschluss. Funkenflug. Dunkelheit. Der Server ist tot. Der Kühlschrank ist tot. Der Chef steht im Dunkeln und brüllt deinen Namen.", m: 60, f: 0, a: 50, c: 50 }
	},
	{
		id: "boss_vga_fail",
		title: "BOSS: LIVESTREAM DESASTERS",
		text: "Der Chef hält seine Jahresrede live vor allen Investoren! Plötzlich flackert der Beamer. Das Bild wird lila, dann schwarz. Der VGA-Stecker am Podium ist locker und die Rändelschrauben fehlen! Der Chef schwitzt und starrt dich panisch an!",
		timer: 20,
		opts: [
			{ 
				t: "Wackeln & Beten", 
				m: 5, f: 0, a: 10, c: 30, 
				r: "Es geht kurz... dann wieder aus... dann an... Stroboskop-Effekt. Ein Investor bekommt einen epileptischen Anfall. Abbruch." 
			},
			{ 
				t: "Stecker festschrauben", 
				req: "screw",
				rep: { "Dr. Wichtig": 5 },
				m: 2, f: 5, a: -10, c: -10, 
				r: "Du kriechst unter das Pult, zückst den Schraubendreher und fixierst den Stecker bombenfest. Das Bild ist kristallklar. Der Chef flüstert: 'Guter Mann!'" 
			},
			{ 
				t: "Das Kabel als menschliches Stativ festhalten", 
				m: 45, f: -15, a: 20, c: 0, 
				r: "Du musst das Kabel die restlichen 45 Minuten der Präsentation in einem bestimmten Winkel festhalten. Deine Hand krampft. Du bist im Bild des Livestreams zu sehen. Peinlich." 
			}
		],
		fail: { rep: { "Dr. Wichtig": -10 }, r: "Bild weg. Chef: 'Äh... Technik...' Im Saal beginnt höfliches, tödliches Kichern. Der Aktienkurs fällt um 2%. Der Chef macht dich persönlich haftbar.", m: 60, f: 0, a: 40, c: 80 }
	},
	{
		id: "boss_audit",
		title: "📋 DER DATENSCHUTZ-AUDITOR 📋",
		text: "Ein externer Prüfer steht unangekündigt im Serverraum! Er will das 'Notfall-Handbuch' und das 'Lösch-Protokoll' sehen! Du hast beides nicht! Er zückt den roten Stift!",
		timer: 15,
		opts: [
			{ 
				t: "Altes Handbuch zeigen", 
				req: "manual", 
				m: 5, f: 10, a: -10, c: -10, 
				r: "Du wirfst ihm das Win95 Handbuch hin. Er blättert... nickt... 'Sehr klassisch. Genehmigt.' Puh. Kompetenz durch Alter." 
			},
			{ 
				t: "Ihn zum Kaffee einladen und ablenken", 
				m: 10, f: 5, a: 5, c: 25, 
				r: "Du lädst ihn zum Kaffee ein. Er vergisst das Protokoll, aber beschwert sich über den Geschmack. Prüfung bestanden (knapp)." 
			},
			{ 
				t: "Feueralarm auslösen", 
				req: "hammer", 
				m: 5, f: 0, a: 10, c: 30, 
				r: "Du schlägst den Melder ein. Prüfung wegen Evakuierung abgebrochen. Radikal, aber effektiv." 
			}
		],
		fail: { r: "Durchgefallen! Bußgeld: 50.000€. Die Firma ist pleite. Du bist schuld.", m: 120, f: -50, a: 50, c: 100 }
	},
	{
		id: "boss_flood",
		title: "🌊 DAS AQUARIUM PLATZT 🌊",
		text: "Das riesige Zierfisch-Aquarium im Chefbüro hat einen Riss! 500 Liter Wasser drohen auf den Perserteppich und die Boden-Steckdosen zu laufen! Der Chef schreit: 'RETTE DIE KOIS!'",
		timer: 12,
		opts: [
			{ 
				t: "Das Wasser mit der eigenen Kleidung aufsaugen", 
				rep: { "Dr. Wichtig": 2 },
				m: 20, f: -10, a: 20, c: -5, 
				r: "Du wirfst deinen Pulli in die Pfütze. Es reicht nicht. Der Teppich ist ruiniert, aber du hast 'Einsatz' gezeigt." 
			},
			{ 
				t: "Die Kois mit dem Kescher retten",
				rep: { "Dr. Wichtig": 10 },					
				req: "zip_ties", 
				m: 10, f: 0, a: -10, c: -10, 
				r: "Du baust aus Kabelbindern und Müllbeutel einen Kescher. Fische gerettet. Das Büro ist geflutet, aber die Tiere leben." 
			},
			{ 
				t: "Riss kleben", 
				req: "tape", 
				rep: { "Dr. Wichtig": 10 },
				m: 5, f: -5, a: 0, c: -20, 
				r: "Panzertape hält alles! Auch 500 Liter Wasserdruck (fürs Erste). Die Kois leben. Der Chef umarmt dich (nass)." 
			}
		],
		 fail: { r: "Das Wasser läuft aus. Irgendwo knallt es elektrisch. Büro zerstört. Kois tot. Du wirst wohl gefeuert.", m: 60, f: 0, a: 50, c: 100 }
	},
	{
	id: "boss_demo_fail",
	title: "☠️ DIE LIVE-DEMO ☠️",
	text: "Der Chef präsentiert gerade live im TV! Auf der riesigen Leinwand hinter ihm erscheint plötzlich dein Desktop... und du hast 'Solitär' offen! Die ganze Welt sieht es! Du hast 10 Sekunden!",
	timer: 10,
	opts: [
		{ 
			t: "Das Kabel brutal mit der Schere kappen", 
			rep: { "Dr. Wichtig": -2 },
			m: 5, f: -10, a: 25, c: 20, 
			r: "Ratsch! Bild schwarz. Der Chef stammelt: 'Technische Störung!'. Du hast den Tag gerettet, aber ein HDMI-Kabel im Wert von 50€ zerstört." 
		},
		{ 
			t: "Zu Excel wechseln", 
			req: "admin_pw", 
			rep: { "Dr. Wichtig": 2 },
			m: 5, f: 5, a: -10, c: -10, 
			r: "In Millisekunden wechselst du auf eine komplizierte Tabelle. Die Zuschauer denken, das gehört zur Show. 'Und hier sehen Sie unsere Effizienz!', ruft der Chef. Gerettet!" 
		}
	],
	fail: { m: 60, f: 0, a: 50, c: 80, r: "DANEBEN! Du klickst versehentlich auf 'Neues Spiel'. Die Investoren lachen. Du bist das Meme des Monats." }
	},
    {
        id: "boss_ransomware_2",
        title: "🚨 ROTE TOTENKOPF-KRISE 🚨",
        text: "ALARM! Auf allen 400 Bildschirmen erscheint ein roter Totenkopf. 'Ihre Dateien wurden verschlüsselt!' Der CEO stürmt brüllend herein. Eine neue Ransomware!",
        timer: 12,
        opts: [
            { 
                t: "Mit den Hackern verhandeln und Zeit schinden", 
                m: 120, f: 20, a: 15, c: -5, 
                r: "Du schreibst im Chat-Fenster der Ransomware mit den Angreifern. Sie geben euch 24 Stunden Aufschub. Ein schwacher Sieg." 
            },
            { 
                t: "Root-Zugriff nutzen und Subnetze killen", 
                req: "admin_pw", 
                m: 60, f: 10, a: 10, c: -15, 
                r: "Du nutzt dein Master-Passwort und kappst die infizierten Subnetze. Einige Daten sind weg, aber die Firma überlebt." 
            },
            { 
                t: "Stecker des Hauptservers ziehen", 
                m: 10, f: -5, a: 20, c: 20, 
                r: "Brachiale Methode. Das Dateisystem ist hinüber, aber die Verschlüsselung stoppt sofort." 
            }
        ],
        fail: { rep: { "Dr. Wichtig": -30 }, m: 180, f: 0, a: 40, c: 50, r: "PANIK-STARRE! Die Zeit läuft ab und die gesamte Firmen-Cloud ist unlesbar. Der CEO feuert dich beinahe!" }
    },
    {
        id: "boss_ceo_stream_1",
        title: "☠️ DER LIVE-STREAM ☠️",
        text: "Der CEO teilt in einem globalen Live-Stream (5.000 Zuschauer) seinen Bildschirm. Plötzlich ploppt ein privater, unzensierter Browser-Tab mit furchtbaren Inhalten auf!",
        timer: 10,
        opts: [
            { 
                t: "Den Stream per Admin-Rechte abwürgen", 
                req: "admin_pw", 
                m: 10, f: 0, a: 5, c: -15, 
                r: "Zwei Klicks im Backend und der Stream zeigt 'Technical Difficulties'. Der CEO ist dir auf ewig dankbar." 
            },
            { 
                t: "Den Streaming-PC im Nebenraum hart ausschalten", 
                m: 5, f: -5, a: 15, c: 5, 
                r: "Du sprintest los und drückst drei Sekunden lang den Power-Button. Der Stream bricht ab. Knappe Kiste!" 
            },
            { 
                t: "Lachend zusehen", 
                rep: { "Dr. Wichtig": -20 },
                m: 15, f: -10, a: -15, c: 30, 
                r: "Ein historischer Moment für den Flurfunk. Der Chef wird dir das allerdings noch sehr lange nachtragen." 
            }
        ],
        fail: { rep: { "Dr. Wichtig": -40 }, m: 30, f: 0, a: 30, c: 40, r: "ZU SPÄT! Jemand hat Screenshots gemacht. Das Meme geht viral auf LinkedIn. Der Chef ist am Boden zerstört." }
    },
    {
        id: "boss_water_leak_1",
        title: "🌊 DER WASSERFALL 🌊",
        text: "Ein Heizungsrohr an der Decke des Serverraums ist geplatzt! Rostiges Wasser prasselt wie ein Wasserfall direkt auf den Core-Switch zu!",
        timer: 12,
        opts: [
            { 
                t: "Den großen Mülleimer aus dem Flur holen", 
                m: 15, f: -5, a: 15, c: 5, 
                r: "Du schiebst den Mülleimer direkt unter das Leck. Die Server bleiben trocken, aber du musst ihn alle 10 Minuten leeren." 
            },
            { 
                t: "Egon rufen und warten", 
                rep: { "Egon": 5 },
                m: 45, f: 0, a: 15, c: 15, 
                r: "Bis Egon das Wasser abstellt, funkt es im Rack. Zwei Switches sterben den Wassertod." 
            },
            { 
                t: "Das Rohr mit Tape abdichten", 
                req: "tape", 
                m: 30, f: 10, a: 10, c: -5, 
                r: "Du kletterst auf eine wackelige Leiter und wickelst das Tape um das nasse Rohr. Klitschnass, aber es hält dicht." 
            }
        ],
        fail: { m: 90, f: -10, a: 30, c: 40, r: "ZEIT ABGELAUFEN! *BZZZZT*. Das Wasser erreicht den Switch. Ein Kurzschluss legt das gesamte Gebäude lahm." }
    },
    {
        id: "boss_rogue_ai_1",
        title: "🤖 KÜNDIGUNG PER KI 🤖",
        text: "Die neue 'KI-HR-Software' dreht durch! Sie bewertet alle Mitarbeiter als 'ungenügend' und verschickt massenhaft Kündigungen!",
        timer: 15,
        opts: [
            { 
                t: "Nur deine eigene Kündigung abfangen", 
                m: 20, f: 5, a: 15, c: 10, 
                r: "Du schützt nur dich selbst. Der Rest der Firma brennt. Egoistisch, aber clever." 
            },
            { 
                t: "Das LAN-Kabel der KI physisch ziehen", 
                rem: "cable", 
                m: 10, f: 0, a: 5, c: -10, 
                r: "Du reißt das dicke Patchkabel raus. Die Mail-Flut stoppt sofort." 
            },
            { 
                t: "Einen Server-Neustart erzwingen", 
                m: 45, f: 5, a: 10, c: 5, 
                r: "Hunderte Mitarbeiter denken jetzt, sie seien arbeitslos, bevor du das System gestoppt hast. Pures Chaos." 
            }
        ],
        fail: { rep: { "Dr. Wichtig": -20 }, m: 120, f: 0, a: 25, c: 30, r: "DIE KI GEWINNT! 400 Leute haben die Kündigung im Postfach. Das HR-Telefonnetz bricht unter der Last zusammen." }
    },
    {
        id: "boss_audit_surprise_1",
        title: "👔 ISO-AUDIT 👔",
        text: "Drei strenge Männer im Anzug stehen unangemeldet im Serverraum. 'ISO 27001 Überprüfung! Zeigen Sie uns sofort Ihre Dokumentation zur Netzwerksicherheit!'",
        timer: 10,
        opts: [
            { 
                t: "Das dicke Win95-Handbuch auf den Tisch knallen", 
                req: "manual", 
                m: 15, f: 0, a: -5, c: -15, 
                r: "Sie sind so verwirrt von der schieren Größe des Dokuments, dass sie gar nicht reinlesen. Bestanden!" 
            },
            { 
                t: "Feueralarm als Ablenkung auslösen", 
                m: 10, f: -5, a: 25, c: 15, 
                r: "Du schlägst den Feuermelder ein. Das Audit wird evakuiert. Hochgradig illegal, aber es kauft dir 2 Stunden Zeit." 
            },
            { 
                t: "Die Wahrheit sagen: Es gibt keine Dokumentation", 
                m: 60, f: 15, a: 15, c: 25, 
                r: "Du fällst in allen Punkten durch. Die Geschäftsführung kriegt einen katastrophalen Mängelbericht." 
            }
        ],
        fail: { rep: { "Dr. Wichtig": -15 }, m: 45, f: 10, a: 25, c: 45, r: "STAMMERN! Deine Sprachlosigkeit wird als Schuldeingeständnis gewertet. Fette Abmahnung für das Team!" }
    },
    {
        id: "boss_lockdown_1",
        title: "🔒 SYSTEM-LOCKDOWN 🔒",
        text: "Ein fehlerhaftes Firmware-Update blockiert das elektronische Schließsystem! Alle Türen im Haus sind dicht! Panik an einem Freitagnachmittag!",
        timer: 12,
        opts: [
            { 
                t: "Türsteuerung mit dem Laptop hacken", 
                m: 30, f: 10, a: 5, c: 0, 
                r: "Du schließt dich direkt an den Controller an und überschreibst den Sperrcode. Die Türen surren auf." 
            },
            { 
                t: "Auf den Techniker warten", 
                m: 120, f: 30, a: 25, c: 5, 
                r: "Zwei Stunden Gefangenschaft. Die Kollegen fangen an, sich gegenseitig anzuknurren." 
            },
            { 
                t: "Egon holen - der hat für alles einen Schlüssel", 
                m: 15, f: 5, a: 0, c: -10, 
                rep: { "Egon": 5 },
                r: "Egon kommt mit einem Bund, das aussieht wie das Inventar einer Kathedrale, und schließt jede Tür einzeln auf. Analog besiegt Digital, und der Mann, den sonst niemand grüßt, ist für zehn Minuten der wichtigste Mensch im Haus." 
            }
        ],
        fail: { m: 180, f: 20, a: 40, c: 15, r: "GEFANGEN! Jemand ruft in Panik die echte Feuerwehr. Die brechen das Haupttor auf. Riesen-Drama!" }
    },
    {
        id: "boss_ac_failure_1",
        title: "🌡️ HITZE-TOD 🌡️",
        text: "Die Klimaanlage im Serverraum ist komplett ausgefallen. Das Thermostat zeigt 48 Grad! Die Server fangen an zu stinken!",
        timer: 10,
        opts: [
            { 
                t: "Die Türen aufreißen und hoffen", 
                m: 60, f: 15, a: 15, c: 10, 
                r: "Die warme Büroluft strömt rein. Einige Server stürzen ab, der Core überlebt gerade so." 
            },
            { 
                t: "Mit dem Feuerlöscher schockfrosten", 
                rem: "fire_ext", 
                m: 5, f: 0, a: 5, c: -10, 
                r: "Du jagst CO2 in die Ansaugstutzen. Die Temperatur stürzt ab. Teuer, aber lebensrettend." 
            },
            { 
                t: "Unwichtige Server sofort herunterfahren", 
                m: 20, f: 10, a: 10, c: 5, 
                r: "Du schaltest 50% der Hardware ab. Die Temperatur stabilisiert sich, aber viele Abteilungen sind offline." 
            }
        ],
        fail: { m: 120, f: -10, a: 40, c: 60, r: "HITZE-KOLLAPS! Die Notabschaltung der Server greift. Die Firma ist für heute komplett offline!" }
    },
    {
        id: "boss_ddos_1",
        title: "🛡️ DDOS ANGRIFF 🛡️",
        text: "Die Firewall-Logs rattern in Lichtgeschwindigkeit! Ein massiver DDoS-Angriff aus dem Ausland legt das Netz lahm. Nichts geht mehr!",
        timer: 12,
        opts: [
            { 
                t: "Mit Stressball im Zen-Modus blocken", 
                req: "stressball", 
                m: 45, f: 10, a: -15, c: -15, 
                r: "Du blendest die Panik aus, knetest den Ball und schreibst in Rekordzeit IP-Filter. Perfekte Abwehr." 
            },
            { 
                t: "Panisch alle externen Verbindungen kappen", 
                m: 15, f: 0, a: 5, c: 20, 
                r: "Du blockierst pauschal alles. Der Angriff verpufft, aber ihr seid komplett vom Internet getrennt. Der Chef brüllt." 
            },
            { 
                t: "Tee trinken und aussitzen", 
                m: 60, f: 0, a: 10, c: 25, 
                r: "Sollen die Hacker doch machen. Du hast Feierabend im Kopf, während die Firma brennt." 
            }
        ],
        fail: { rep: { "Dr. Wichtig": -15 }, m: 60, f: 0, a: 40, c: 30, r: "FREEZE! Der Core-Router stürzt unter der Last ab. Es dauert ewig, ihn neu zu booten. Kunden sind wütend." }
    },
    {
        id: "boss_excavator_1",
        title: "🚧 EGONS BAGGER 🚧",
        text: "Egon hat im Hof mit einem Mini-Bagger die Haupt-Glasfaserleitung der Firma zerrissen! Das Internet ist tot!",
        timer: 15,
        opts: [
            { 
                t: "Feierabend für alle ausrufen!", 
                m: 10, f: -20, a: 15, c: 30, 
                r: "'Ohne Netz keine Arbeit!' Die Belegschaft jubelt, der CEO kriegt fast einen Herzinfarkt." 
            },
            { 
                t: "Egon lauthals anschreien", 
                rep: { "Egon": -15 },
                m: 15, f: 0, a: -5, c: 10, 
                r: "Das Netz ist zwar down, aber dein Frust-Schrei hat therapeutische Wirkung." 
            },
            { 
                t: "LTE-Router mit Gäste-WLAN aktivieren", 
                rem: "wifi_note", 
                m: 30, f: 5, a: 5, c: -10, 
                r: "Du opferst deinen WLAN-Zettel für den Notfall-Router. Die Bandbreite ist Müll, aber der Chef ist online." 
            }
        ],
        fail: { m: 240, f: 20, a: 20, c: 30, r: "OHNE INTERNET! Die Kollegen schicken sich Zettel auf den Fluren. Ein furchtbarer Arbeitstag beginnt." }
    },
    {
        id: "boss_db_corruption_1",
        title: "📉 DATENBANK-CRASH 📉",
        text: "Die zentrale Finanz-Datenbank ist korrupt! Morgen ist Jahresabschluss. Wenn das nicht gefixt wird, bist du erledigt!",
        timer: 12,
        opts: [
            { 
                t: "Schuld auf ein Windows-Update schieben", 
                m: 15, f: 5, a: 15, c: 15, 
                r: "Niemand kann das Gegenteil beweisen. Du kommst davon, aber die Firma verliert Geld." 
            },
            { 
                t: "Energy Drink exen und die Nacht durcharbeiten", 
                rem: "energy", 
                m: 120, f: -10, a: 5, c: -20, 
                r: "Du pumpst dich mit Taurin voll und stellst alles fehlerfrei wieder her." 
            },
            { 
                t: "Altes Backup blind drüberbügeln", 
                m: 20, f: 0, a: 10, c: 10, 
                r: "Die fehlenden Tage muss Frau Elster eben per Hand neu eintippen. Sie wird dich dafür hassen." 
            }
        ],
        fail: { rep: { "Frau Elster": -30, "Dr. Wichtig": -20 }, m: 60, f: 0, a: 30, c: 30, r: "ZÖGERN! Die Datenbank schmiert komplett ab. Die Wirtschaftsprüfer werden das Unternehmen zerfleischen." }
    },
    {
        id: "boss_crypto_police_1",
        title: "🚓 CYBER-POLIZEI 🚓",
        text: "Zwei Beamte stehen am Empfang. Eine Firmen-IP wurde beim illegalen Krypto-Mining erwischt. Sie wollen den Serverraum beschlagnahmen!",
        timer: 10,
        opts: [
            { 
                t: "Azubi Kevin eiskalt ausliefern", 
                rep: { "Kevin": -30 },
                m: 30, f: 0, a: -10, c: 10, 
                r: "Kevin weint. Dein Karma ist pechschwarz, aber die IT-Infrastruktur bleibt stehen." 
            },
            { 
                t: "Kooperieren und Türen öffnen", 
                m: 180, f: 30, a: 25, c: 25, 
                r: "Sie nehmen drei Racks mit. Die Firma steht still. Ein riesiger Skandal." 
            },
            { 
                t: "USB-Wipe-Skript am Mining-PC ausführen", 
                rem: "usb_stick", 
                m: 10, f: 0, a: 15, c: 5, 
                r: "Du löschst Kevins Beweise restlos. Die Polizei findet nichts." 
            }
        ],
        fail: { m: 240, f: 0, a: 40, c: 50, r: "DURCHSUCHUNG! Die Beamten stürmen vorbei, reißen Kabel aus der Wand und nehmen alles mit. Totalschaden!" }
    },
    {
        id: "boss_phishing_ceo_1",
        title: "🎣 DER DUMME KLICK 🎣",
        text: "Der CEO hat auf 'Paket verfolgen' geklickt. Ein Skript löscht jetzt gerade live alle Dokumente im großen Intranet-Laufwerk!",
        timer: 8,
        opts: [
            { 
                t: "Den CEO anrufen und ihn anschreien", 
                rep: { "Dr. Wichtig": -20 },
                m: 10, f: -10, a: 15, c: 5, 
                r: "'STEKCER ZIEHEN, SIE IDIOT!', brüllst du. Er macht es tatsächlich. Die Daten bleiben erhalten, dein Job wackelt." 
            },
            { 
                t: "Schreiend im Kreis rennen", 
                m: 45, f: 20, a: 25, c: 20, 
                r: "Du siehst weinend zu, wie 10 Jahre Firmenhistorie gelöscht werden." 
            },
            { 
                t: "Mit Schraubendreher den Switch killen", 
                req: "screw", 
                m: 10, f: 0, a: -5, c: 10, 
                r: "Du reißt das Netzteil aus dem Switch. Alles offline, aber die Daten sind sicher!" 
            }
        ],
        fail: { rep: { "Dr. Wichtig": -10 }, m: 60, f: 0, a: 30, c: 40, r: "ALLES WEG! Die Festplatte ist leer. Die Backups sind auch infiziert. Ihr beginnt wieder bei null." }
    },
    {
        id: "boss_coffee_shortage_1",
        title: "☕ KAFFEE-EMBARGO ☕",
        text: "Der Lieferant hat gestreikt! Es gibt absolut keinen Kaffee mehr im Gebäude. Die Belegschaft mutiert zu wütenden Zombies. Produktivität = Null.",
        timer: 15,
        opts: [
            { 
                t: "Im Serverraum verbarrikadieren", 
                m: 60, f: 10, a: 15, c: 5, 
                r: "Du sicherst die Tür und wartest, bis der Entzug bei den Kollegen nachlässt." 
            },
            { 
                t: "Einen Donut zur Beruhigung essen", 
                rem: "donut", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "Du rettest deine eigene Stimmung mit Zucker, während die Welt brennt." 
            },
            { 
                t: "Notfall-Ration (Löslich) im Flur aufbrühen", 
                m: 30, f: 10, a: 15, c: -5, 
                r: "Es schmeckt wie Asche, aber die Meute wird ruhig gestellt. Du opferst dich für das Team." 
            }
        ],
        fail: { m: 180, f: 30, a: 45, c: 15, r: "MEUTEREI! Das Büro verfällt in Lethargie. Du schläfst vor Erschöpfung fast am Schreibtisch ein." }
    }

];
