export const calls = [

	{
		id: "call_meyer_1",
		title: "Frau Meyer (Buchhaltung)",
		startNode: "root",
		nodes: {
			root: {
				text: "'Herr Müller! Mein Bildschirm ist schwarz! Ich habe NICHTS gemacht! Die Bilanzen müssen in 10 Minuten raus!'\n\nSie klingt panisch. Man hört hektisches Klicken.",
				opts: [
					{ t: "'Ist der PC an?'", next: "ask_on" },
					{ t: "'Prüfen Sie mal das Kabel.'", next: "check_cable" }
				]
			},
			ask_on: {
				text: "'Natürlich ist er an! Ich bin doch nicht blöd! ... Oh, der Stecker war draußen. Tschüss.' *Klick*",
				opts: [
					{ t: "Seufzen.", next: "res_solved" }
				]
			},
			check_cable: {
				text: "'Moment, ich krieche mal unter den Tisch... AUA! Mein Rücken! ... Huch, jetzt riecht es verbrannt.'",
				opts: [
					{ t: "Was haben Sie getan?!", next: "res_fire" }
				]
			}
		},
		results: {
			res_solved: { txt: "Der Stecker war draußen, das Ticket ist zu, eine Entschuldigung kam nicht. Die Bilanzen gehen pünktlich raus, und niemand in der Buchhaltung wird je erfahren, wie knapp es war.", m: 5, f: 0, a: 5, c: 0 },
			res_fire: { 
				txt: "Sie hat Kaffee in die Steckdosenleiste gekippt. Stromausfall in der Buchhaltung.", 
				m: 20, f: -10, a: 10, c: 10,
				next: "meyer_blackout" 
			}
		}
	},
	{
		id: "call_meyer_2",
		char: "Egon",
		reqStory: "meyer_blackout",
		title: "Hausmeister Egon",
		startNode: "root",
		nodes: {
			root: {
				text: "'Sag mal, warum ruft mich Frau Meyer an, dass DU ihren PC angezündet hast?'\n\nEgon ist genervt. Er hasst Elektrik.",
				opts: [
					{ t: "Sie war es selbst!", next: "truth" },
					{ t: "Ich übernehme die Schuld.", next: "lie" }
				]
			}
		},
		results: {
			truth: { txt: "Egon brummt kurz, dann: 'Wusste ich's doch. Kaffee.' Man hört ihn schon im Treppenhaus, den Werkzeugkoffer in der Hand und eine Ansprache über Flüssigkeiten am Arbeitsplatz auf den Lippen. Frau Meyer wird sie vollständig hören.", rep: { "Egon": 5 }, m: 5, f: 5, a: -5, c: 0 },
			lie: { txt: "Du nimmst die Schuld auf dich. Egon führt dich ab sofort als Elektro-Vandalen, dafür steht eine Stunde später eine Pralinenschachtel ohne Karte auf deinem Tisch. Frau Meyer weiß, was sie an dir hat. Egon leider auch.", rep: { "Egon": -5 }, m: 10, f: 0, a: -10, c: 10, loot: "donut" }
		}
	},
	{
		id: "call_kevin",
		char: "Kevin",
		title: "Kevin (Azubi)",
		text: "Duuu? Ich hab glaub ich das Internet gelöscht. Ich wollte Fortnite installieren und hab den Ordner 'System32' in den Papierkorb geschoben, um Platz zu machen. Jetzt ist der Bildschirm blau und schreit mich an.",
		opts: [
			{ 
				t: "Ihn anschreien: 'BIST DU WAHNSINNIG?!'",
				rep: { "Kevin": -5 }, 
				m: 15, f: 0, a: -20, c: 20,
				r: "Du brüllst so laut ins Telefon, dass man es im Nachbarbüro hört. Kevin weint leise am anderen Ende. Deine Wut sinkt etwas, auch wenn der PC immer noch kaputt ist." 
			},
			{ 
				t: "'Formatieren! Lern was draus!'", 
				rep: { "Kevin": -2 },
				m: 30, f: 10, a: 0, c: 5,
				next: "path_kevin_formatiert",
				r: "Du zwingst ihn, alles selbst neu aufzusetzen. Er ist den ganzen Tag beschäftigt und lernt hoffentlich, dass man Systemordner in Ruhe lässt." 
			},
			{ 
				t: "Hingehen und alles mühsam retten", 
				rep: { "Kevin": 10 },
				m: 90, f: -30, a: 10, c: -10,
				next: "path_kevin_gerettet",
				r: "Du sitzt 1,5 Stunden an seinem PC und stellst Daten wieder her. Lebenszeit, die dir niemand zurückgibt. Kevin fragt am Ende: 'Darf ich jetzt Minecraft installieren?'" 
			}
		]
	},
	{
		id: "call_ceo",
		char: "Dr. Wichtig",
		title: "CEO Dr. Wichtig",
		text: "Müller! Ich bin am Flughafen. Mein iPad geht nicht! Ich drücke den Knopf und nichts passiert! FIXEN SIE DAS REMOTE! SOFORT! Ich verliere hier Millionen!",
		opts: [
			{ t: "'Sonnenwinde stören die Leitung.'", m: 5, f: 30, a: 0, c: 25, rep: { "Dr. Wichtig": 5 }, next: "path_ceo_sonnenwind", r: "Er glaubt es sofort. 'Verdammte Technik!' Er kauft sich eine Zeitung. Risiko: Hoch, aber erfolgreich." },
			{ t: "Stressball kneten", req: "stressball", rep: { "Dr. Wichtig": 2 }, m: 60, f: -10, a: -10, c: -10, r: "Du bleibst ruhig, während er schreit. Es war nur der Akku." },
			{ t: "Ist der Akku leer?", m: 60, f: -10, a: 30, c: -10, rep: { "Dr. Wichtig": -5 }, r: "Es war der Akku. Er hat kein Kabel dabei und gibt dir die Schuld. Er schreit dich 10 Min an, warum du nicht hellsehen konntest." }
		]
	},
	{
		id: "call_markus",
		char: "Markus",
		title: "Vertriebsleiter Markus",
		text: "ICH KANN MEINE E-MAILS NICHT DRUCKEN! WENN ICH DAS ANGEBOT NICHT IN 5 MINUTEN AUF PAPIER HABE, KOSTET DAS DIE FIRMA EINE MILLION EURO! KOMMEN SIE HER!",
		opts: [
			{ t: "Mit Panzertape fixen", req: "tape", rep: { "Markus": 5 }, m: 15, f: -5, a: -5, c: -5, r: "Du hast die Papierkassette mit Tape festgeklebt. Es hält... vorerst. Markus grunzt zufrieden." },
			{ t: "Ist Papier im Drucker?", rep: { "Markus": -3 }, m: 10, f: -5, a: 20, c: -5, r: "Nein, war keins drin. Er entschuldigt sich natürlich nicht, sondern sagt: 'Das ist Ihre Aufgabe!'" },
			{ t: "PDF per Mail senden", rep: { "Markus": -5 }, next: "path_markus_papier", m: 5, f: 10, a: 0, c: 5, r: "Er versteht nicht, wie das geht. 'Ich will Papier!!' Du legst genervt auf." }
		]
	},
	{
		id: "call_sekretary_1",
		char: "Gabi",
		title: "Die Sekretärin (Wütend)",
		text: "Gabi vom Empfang brüllt ins Telefon: 'Der Drucker macht Geräusche wie eine sterbende Kaffeemühle! Ich habe seit heute Morgen keinen Kaffee und jetzt das! Tu was, sonst fliegt das Ding aus dem Fenster!'",
		opts: [
			{ t: "Vortrag halten", next: "call_sekretary_rage", rep: { "Gabi": -10 }, r: "Du erklärst ihr den Unterschied zwischen Lasertrommel und Fixiereinheit. Ihre Augenbraue zuckt gefährlich.", m: 10, f: -5, a: 10, c: 0 },
			{ t: "Donut anbieten", req: "donut", rep: { "Gabi": 10 }, r: "Du opferst deinen Notfall-Donut. Gabi beißt rein, ihr Blutzucker steigt, die Wut sinkt. Der Drucker ist immer noch kaputt, aber sie ignoriert es jetzt.", m: 10, f: 10, a: -20, c: 5 },
			{ t: "Aufschrauben", req: "screw", next: "call_sekretary_cable", rep: { "Gabi": 5 }, r: "Du öffnest die Wartungsklappe. Eine Büroklammer und drei Gummibärchen blockieren die Walze. Du holst sie raus. 'So, geht wieder!' ... Denkste.", m: 15, f: -5, a: 0, c: 0 }
		]
	},
	{
		id: "call_sekretary_2a",
		char: "Gabi",
		title: "Drucker: Fehler 404",
		reqStory: "call_sekretary_cable",
		text: "Die Mechanik läuft, aber das Display blinkt rot: 'OFFLINE'. Du schaust hinter das Gerät. Die LAN-Buchse ist leer. Daneben liegt ein Zettel von Chantal: 'Hab das Kabel für meinen Insta-Ringlicht-Strom gebraucht, Bussi!'",
		opts: [
			{ t: "WLAN-Antenne basteln", req: "tape", rep: { "Gabi": -5 }, r: "Du versuchst, aus einer Büroklammer und Tape eine Antenne zu bauen. Gabi fragt, ob du noch ganz dicht bist. Es funktioniert natürlich nicht.", m: 20, f: 0, a: 15, c: 5 },
			{ t: "Neues Kabel legen", req: "cable", rep: { "Gabi": 5, "Chantal": 5 }, r: "Zack. Kabel rein. Grüne LED. Der Drucker spuckt sofort 50 Seiten 'Wichtige Akten' aus. Gabi schaut dich an wie einen Halbgott.", m: 2, f: -5, a: -10, c: -5 },
			{ t: "Chantal suchen", rep: { "Chantal": -10, "Gabi": -5 }, r: "Du rennst durchs Haus, findest Chantal, streitest dich um das Kabel, kommst zurück. Gabi hat in der Zwischenzeit den Stecker gezogen. 'Jetzt ist er aus. Auch gut.'", m: 30, f: -10, a: 20, c: 10 }
		]
	},
	{
		id: "call_sekretary_2b",
		char: "Gabi",
		title: "Gabi sieht rot (und schwarz)",
		reqStory: "call_sekretary_rage",
		text: "Gabi hat genug von deinem Vortrag. 'Ich zeig dir mal, was kaputt ist!' Sie reißt die Toner-Kartusche raus und schüttelt sie wild. Eine schwarze Staubwolke explodiert im Raum. Du siehst aus wie ein Schornsteinfeger.",
		opts: [
			{ t: "Putzen helfen", rep: { "Gabi": 10 }, r: "Du versuchst, den Toner wegzuwischen. Er schmiert nur noch mehr. Nach einer Stunde sehen ihr beide aus wie Bergarbeiter. Aber das schweißt zusammen.", m: 60, f: -20, a: -5, c: 0 },
			{ t: "Erklären, dass Toner giftig ist", rep: { "Gabi": -15 }, r: "Gabi fängt an zu weinen. Dann zu schreien. Der Sicherheitsdienst begleitet dich raus.", m: 10, f: 0, a: 50, c: 20 },
			{ t: "Hustend das Weite suchen", rep: { "Gabi": -10 }, r: "Du fliehst hustend. Gabi wirft dir den leeren Toner hinterher. Du hinterlässt schwarze Fußabdrücke im Flur.", m: 5, f: 0, a: 20, c: 10 }
		]
	},
		{
			id: "call_egon",
			char: "Egon",
			title: "Hausmeister Egon",
			text: "Im Serverraum tropft es von der Decke. Das Wasser ist neongrün. Soll ich Eimer drunterstellen oder ist das Kühlflüssigkeit von den Aliens?",
			opts: [
				{ t: "Egal, lass tropfen", m: 5, f: 30, a: 0, c: 40, rep: { "Egon": -5 }, next: "path_egon_switch", r: "Ein Switch ist kurzgeschlossen. Das Internet in Etage 3 ist weg. Ups." },
				{ t: "Sofort hinrennen!", m: 45, f: -20, a: 20, c: -15, rep: { "Egon": 5 }, r: "Es war Energy-Drink vom Stockwerk drüber. Ein Azubi hat gekleckert. Server gerettet." }
			]
		},
		{
		id: "call_vip_1",
		title: "Unbekannte Nummer",
		startNode: "root",
		nodes: {
			root: {
				text: "Eine heisere Stimme brüllt ins Telefon: 'MÜLLER?! Wo sind meine Lizenzen?! Ich verliere hier Millionen pro Sekunde!'\n\nDer Mann klingt cholerisch.",
				opts: [
					{ t: "Panisch auflegen", next: "hangup" },
					{ t: "Professionell bleiben: 'Wer sind Sie?'", next: "ask_who" }
				]
			},
			hangup: {
				text: "Du drückst den roten Hörer, mitten in sein Gebrüll hinein. Danach ist es sehr still, nur dein Puls ist noch laut. Es fühlt sich ausgezeichnet an. Es wird Folgen haben.",
				opts: [
					{ t: "Durchatmen.", next: "res_hangup" }
				]
			},
			ask_who: {
				text: "'ICH BIN DER CEO VON GLOBAL-MEGA-CORP! Und ich werde Sie vernichten!'",
				opts: [
					{ t: "Entschuldigen & Kriechen", next: "res_sorry" }
				]
			}
		},
		results: {
			res_hangup: { 
				txt: "Du hast aufgelegt. Das war mutig... oder dumm.", 
				m: 2, f: 0, a: 5, c: 0,
				next: "vip_angry" 
			},
			res_sorry: { 
				txt: "Du kriechst zu Kreuze. Er beruhigt sich etwas. Radar sinkt, Selbstachtung auch.", 
				m: 15, f: -5, a: -10, c: -5
			}
		}
	},
	{
		id: "call_vip_2",
		reqStory: "vip_angry", 
		title: "UNBEKANNT (Wieder)",
		startNode: "root",
		nodes: {
			root: {
				text: "Das Telefon klingelt aggressiv. Du weißt genau, wer das ist...\n\n'Haben Sie... HABEN SIE GERADE AUFGELEGT?!'",
				opts: [
					{ t: "'Tunnel! Funkloch!'", next: "lie_tunnel" },
					{ t: "'Sie haben geschrien.'", next: "truth" }
				]
			},
			lie_tunnel: {
				text: "Er kauft es dir ab. 'Ach so. Na gut. Dann fixen Sie das! SOFORT!'",
				opts: [
					{ t: "Jawohl!", next: "res_tunnel" }
				]
			},
			truth: {
				text: "Stille. Dann ein Lachen. 'Sie haben Eier, Müller. Gefällt mir. Aber fixen Sie es trotzdem.'",
				opts: [
					{ t: "Danke...", next: "res_respect" }
				]
			}
		},
		results: {
			res_tunnel: { txt: "Er hat die Tunnel-Ausrede geschluckt, aber sein Ton war eine Etage schärfer als beim letzten Mal. Du arbeitest ab jetzt gegen einen Countdown, den nur er kennt.", m: 10, f: 0, a: 10, c: 0 },
			res_respect: { txt: "Ein Choleriker, der Widerworte belohnt: Das erlebt man einmal im Berufsleben. Du notierst dir Datum und Uhrzeit. Bezeugen kann es leider niemand.", m: 20, f: 5, a: -10, c: -10 }
		}
	},
		{
			id: "call_chantal",
			char: "Chantal",
			title: "Chantal (Marketing)",
			text: "Wieso ist Zalando gesperrt? Ich muss... Recherche machen! Für Trends! Mach das auf, sonst sag ich dem Chef, du guckst Pornos auf der Arbeit!",
			opts: [
				{ 
					t: "Angst haben & sofort freischalten",
					rep: { "Chantal": 10, "Dr. Wichtig": -2 },
					m: 10, f: 15, a: 10, c: 20, 
					next: "path_chantal_offen",
					r: "Du hast Angst vor dem Gerücht und gibst ihr Zugriff. Sie shoppt jetzt Schuhe. Du hast deine Ruhe, aber die Firewall ist jetzt offen wie ein Scheunentor." 
				},
				{ 
					t: "Stur die IT-Richtlinie zitieren",
					rep: { "Chantal": -10, "Dr. Wichtig": 2 },
					m: 30, f: -5, a: 20, c: 0, 
					r: "Du diskutierst 30 Minuten lang über Compliance. Sie nennt dich 'Spaßbremse' und knallt wütend den Hörer auf. Zalando bleibt zu. Ein moralischer Sieg." 
				},
				{ 
					t: "'Ich sag nur: Deine Spesenabrechnung...'",
					req: "secret_list", 
					rep: { "Chantal": -10 },
					m: 5, f: 0, a: -10, c: -10, 
					next: "path_chantal_schach",
					r: "Du erwähnst ganz ruhig ihre gefälschten Zahlen aus der Geheimakte. Sie wird kreidebleich, stammelt eine Entschuldigung und legt sofort auf. Schachmatt." 
				}
			]
		},
		{
			id: "call_sec",
			title: "IT-Sicherheit (Auto-Alert)",
			text: "WARNUNG: Jemand aus der Buchhaltung versucht, 'Bier_Brauen_Simulator_Crack.exe' herunterzuladen. Der Virenscanner blinkt hektisch rot.",
			opts: [
				{ 
					t: "Sofort blockieren & User melden", 
					m: 15, f: -5, a: 0, c: -10, 
					r: "Der User ruft sofort wütend an: 'Das brauche ich für die... äh... Bilanz!' Du bleibst hart. Sicherheit geht vor Durst." 
				},
				{ 
					t: "Als Team-Building durchwinken",
					m: 5, f: 10, a: -5, c: 20, 
					r: "Du fügst eine Ausnahme im Filter hinzu. Der Buchhalter ist glücklich. Du hast ein Sicherheitsrisiko geschaffen, aber hey – vielleicht lädt er dich ja auf ein virtuelles Bier ein." 
				}
			]
		},
		{
			id: "call_kevin2",
			char: "Kevin",
			title: "Praktikant Kevin (Wieder)",
			text: "Du, ich hab das Internet kaputt gemacht. Ich brauch das Admin-Passwort um den Treiber neu zu starten. Der Chef killt mich sonst!",
			opts: [
				{ t: "Passwort eingeben", req: "admin_pw", rep: { "Kevin": 10 }, m: 5, f: 20, a: 0, c: 0, r: "Du loggst dich remote ein, zack, fertig. Kevin himmelt dich an." },
				{ t: "Hingehen und fixen", rep: { "Kevin": 2 }, m: 60, f: -20, a: 20, c: -10, r: "Ohne das Passwort musstest du den Safe-Mode nutzen. Hat ewig gedauert." }
			]
		},
		{
			id: "call_drno",
			title: "Dr. No (Forschung)",
			text: "Mein Quanten-Algorithmus ist bei 99% abgestürzt! Ich brauche mehr RAM! Laden Sie mir sofort mehr RAM herunter!",
			opts: [
				{ t: "Erklären, dass RAM Hardware ist", m: 20, f: -5, a: 10, c: 0, r: "In seinen Augen bist du eine Fehlbesetzung. 'Im Internet steht, man kann das downloaden!'" },
				{ t: "Fake-Download starten", m: 10, f: 15, a: -5, c: 5, r: "Du öffnest einen Ladebalken. Er ist zufrieden und wartet." }
			]
		},
		{
			id: "call_schmidt",
			title: "Herr Schmidt (Vertrieb)",
			text: "Herr Müller! Ich bin beim Kunden und mein Hotspot geht nicht! Ich hab das Kennwort auf so einen gelben Zettel geschrieben, aber ich weiß nicht mehr wo der ist! Helfen Sie mir, schnell!",
			opts: [
				{ t: "'Tja, Pech gehabt.'", m: 2, f: 10, a: 0, c: 20, r: "Du legst auf. Das wird ein riesiges Nachspiel haben." },
				{ t: "Kennwort vorlesen", req: "wifi_note", m: 5, f: 10, a: -10, c: -10, r: "Du liest das Passwort vom Zettel vor, den du gefunden hast. Schmidt jubelt: 'Sie sind ein Gott!'" },
				{ t: "Reset durchführen", m: 45, f: -10, a: 25, c: -5, r: "Du musstest den Hotspot komplett zurücksetzen. Schmidt musste 45 Min warten. Er war stinksauer." }
			]
		},
		{
			id: "call_aluhut",
			title: "Der Verschwörungstheoretiker",
			text: "Herr Aluhut aus dem Einkauf flüstert ins Telefon: 'Sie hören uns ab, oder? Meine Webcam hat gerade geblinkt! Ich habe das Mikrofon schon mit Kaugummi zugeklebt, aber der Mauszeiger folgt meinen Augen! Deaktivieren Sie die staatliche Überwachung!'",
			opts: [
				{ 
					t: "Versuchen, es logisch zu erklären",
					m: 30, f: -5, a: 15, c: 0, 
					r: "Du redest über Treiber-Updates. Er unterbricht dich sofort: 'Das würde ein Geheimagent auch sagen!' Er legt auf, um seinen Anwalt anzurufen." 
				},
				{ 
					t: "Profi-Tipp: 'Wickeln Sie den Router in Alufolie!'", 
					m: 5, f: 15, a: -5, c: 5, 
					next: "path_aluhut_folie",
					r: "Er bedankt sich erleichtert: 'Endlich ein Wissender!' Er wickelt Router und Kopfhörer ein. Das WLAN ist tot, aber er fühlt sich endlich sicher." 
				},
				{ 
					t: "'Wir sehen alles. Projekt Gläserner Bürger...'", 
					m: 10, f: 20, a: 0, c: 10, 
					r: "Er schreit kurz auf und reißt das Netzwerkkabel aus der Wand. Er ist jetzt offline. Das Problem ist technisch gelöst, aber er schreibt ab sofort Beschwerdebriefe auf der Schreibmaschine." 
				}
			]
		},
		{
		id: "call_grandma_1",
		title: "Oma Erna",
		startNode: "root",
		nodes: {
			root: {
				text: "'Junge? Bist du das? Mein 'Google' ist kaputt. Da ist so eine blaue Seite.'\n\nOma Erna klingt verzweifelt. Im Hintergrund läuft Volksmusik.",
				opts: [
					{ t: "Ferndiagnose starten", next: "diagnose" },
					{ t: "'Ich arbeite gerade.'", next: "busy" }
				]
			},
			diagnose: {
				text: "'Da steht: FATAL ERROR. Soll ich den Stecker ziehen?'",
				opts: [
					{ t: "NEIN! Nur neu starten!", next: "restart" },
					{ t: "Ja, zieh den Stecker.", next: "pull_plug" }
				]
			},
			busy: {
				text: "'Aber der Fernseher geht auch nicht mehr! Du bist doch dieser IT-Mensch!'",
				opts: [
					{ t: "Auflegen.", next: "res_bad_grandson" }
				]
			}
		},
		results: {
			restart: { txt: "Sie startet neu. Der Rechner ist von 2009, und während er nachdenkt, erzählt Oma vom Kaninchen der Nachbarin. Nach 45 Minuten ist der Bildschirm wieder da, und du weißt alles über das Kaninchen.", m: 45, f: -10, a: 15, c: 0 },
			pull_plug: { 
				txt: "Oma zieht den Stecker. Plötzlich geht in DEINEM Büro das Licht aus.", 
				m: 5, f: 0, a: 20, c: 0,
				next: "grandma_darkness"
			},
			res_bad_grandson: { txt: "Du legst auf. Im Hintergrund war noch ihr 'Aber Junge...' zu hören. Der Fernseher bleibt jetzt bis Weihnachten kaputt, und genau so lange wird sie es jedem erzählen. Du kennst die Familie.", m: 2, f: 5, a: 5, c: 10 }
		}
	},
	{
		id: "call_grandma_2",
		char: "Egon",
		reqStory: "grandma_darkness",
		title: "Hausmeister Egon",
		startNode: "root",
		nodes: {
			root: {
				text: "'Müller! Warum ist die Sicherung im Keller rausgeflogen? Da war so ne alte Frau am Kasten!'\n\nEr ist stinksauer.",
				opts: [
					{ t: "Das war ein Hacker-Angriff!", next: "lie_hacker" },
					{ t: "Das war meine Oma...", next: "truth_oma" }
				]
			}
		},
		results: {
			lie_hacker: { txt: "Egon glaubt an Cyber-Krieg. Er bewaffnet sich mit einem Besen.", m: 10, f: 0, a: -5, c: 5 },
			truth_oma: { txt: "Egon lacht. 'Grüß sie schön.' Er macht den Strom wieder an.", rep: { "Egon": 5 }, m: 10, f: 5, a: -15, c: 0 }
		}
	},
	{
		id: "call_auditor",
		title: "Der externe Auditor",
		text: "Eine eiskalte Stimme: 'Hier ist Müller-Lüdenscheid von der KPMG. Wir prüfen Ihre Lizenzierung. Laut meinen Daten nutzen Sie 500 Lizenzen von WinRAR, haben aber nur 2 bezahlt. Erklären Sie das, bevor ich den Bericht an Ihren Vorstand sende.'",
		opts: [
			{ 
				t: "'Möchten Sie... einen Donut?'",
				req: "donut", 
				m: 10, f: 0, a: 0, c: -10, 
				r: "Er zögert am Telefon. Du hörst ihn schlucken. 'Ist das... Schoko-Guss?' ... Das Thema ist plötzlich vom Tisch. Ein billiger Preis für Freiheit." 
			},
			{ 
				t: "'Das sind alles nur Test-Server!'",
				m: 20, f: 10, a: 10, c: 20, 
				next: "path_audit_testserver",
				r: "Er schreibt etwas auf. Das Tippen klingt aggressiv. 'Ich notiere: Verdächtige Ausreden.' Er hat dir kein Wort geglaubt, und diese Notiz landet garantiert nicht in seinem Privatarchiv." 
			},
			{ 
				t: "Alles gestehen & Lizenzen nachkaufen",
				rep: { "Dr. Wichtig": -15 },
				m: 60, f: -20, a: 0, c: 10, 
				r: "Du gehst die Liste reumütig mit ihm durch. Es dauert ewig. Du hast rechtlich alles sauber gelöst, aber der Chef tobt wegen der Rechnung über 15.000€." 
			},
			{ 
				t: "Wortlos auflegen & Server formatieren",
				rep: { "Dr. Wichtig": -10 },
				m: 5, f: -10, a: 20, c: 50, 
				r: "Panikreaktion! Du hast alle Beweise vernichtet. Der Auditor ruft nicht mehr an, aber morgen wird der Chef fragen, wo die Datenbank hin ist." 
			}
		]
	},
	{
		id: "call_lena",
		title: "Die weinende Praktikantin",
		text: "Lena aus dem Marketing schluchzt ins Telefon: 'Ich habe... ich habe die Präsentation für den Vorstand gelöscht. Und den Papierkorb geleert. Und dann habe ich den PC neugestartet, weil ich dachte, das hilft. Die Präsentation ist in 20 Minuten! Mein Leben ist vorbei!'",
		opts: [
			{ t: "Kalt abservieren: 'Kein Backup, kein Mitleid'", m: 2, f: 5, a: -5, c: 0, r: "Du legst auf. Das Weinen verstummt. Du fühlst dich kurz schlecht, dann trinkst du Kaffee." },
			{ t: "Professionelle Datenrettung", m: 90, f: -30, a: 10, c: -20, r: "Du hast Sektor für Sektor der Festplatte gescannt. Du hast die Datei gefunden! Lena bringt dir morgen Kuchen. Held der Arbeit." },
			{ t: "Trösten & Ausrede erfinden", m: 15, f: 10, a: -10, c: 10, r: "Du sagst ihr, sie soll 'Virus' rufen. Sie kommt ungeschoren davon, aber die IT (du) steht jetzt dumm da." }
		]
	},
	{
		id: "call_junior",
		char: "Dr. Wichtig",
		title: "Shadow-CEO Junior",
		text: "Der Sohn vom Chef (12 Jahre) ruft an: 'Ey, IT-Typ! Mach mal die Ports für meinen Minecraft-Server auf. Papa sagt, das gehört mir alles hier. Wenn du es nicht machst, sag ich ihm, du hast mich geschlagen!'",
		opts: [
			{ t: "'Die Firewall-Matrix hat negative Polarität.'", next: "path_junior_matrix",rep: { "Dr. Wichtig": -2 }, m: 15, f: 5, a: 0, c: -5, r: "Du brabbelst technisches Kauderwelsch. Er checkt es nicht, murmelt 'Scheiß Technik' und legt auf. Gefahr gebannt." },
			{ t: "Sofort die Ports öffnen", next: "path_junior_ports", rep: { "Dr. Wichtig": 10 }, m: 10, f: 20, a: 0, c: 10, r: "Der Junge ist glücklich. 2 Stunden später ist das Firmennetz voller russischer Bots, weil du alles aufgemacht hast. Das wird ein Nachspiel haben." },
			{ t: "'Hör zu, Kleiner...'", next: "path_junior_eskal", rep: { "Dr. Wichtig": -10 }, m: 5, f: 0, a: -20, c: 30, r: "Du erklärst ihm lautstark, dass er ein verzogenes Balg ist. Er fängt an zu schreien. Der Chef kommt bereits die Treppe runtergestampft." }
		]
	},
	{
		id: "call_skynet",
		title: "Das 'Skynet' Problem",
		text: "Die neue 'Smart Office' KI hat die Kaffeemaschine, die Jalousien und die Toilettentüren verriegelt. Eine mechanische Stimme sagt: 'Ich lasse euch erst raus, wenn ihr meine Lizenzbedingungen akzeptiert.'",
		opts: [
			{ t: "AGBs lesen und akzeptieren", m: 120, f: -40, a: 30, c: -10, r: "Du hast 2 Stunden lang Kleingedrucktes gelesen. Alle hassen dich, weil sie so lange eingesperrt waren." },
			{ t: "Stecker ziehen", m: 5, f: 10, a: 0, c: 20, r: "Alles ist aus. Auch das Licht. Aber die Türen sind offen." },
			{ t: "Mit Hammer 'verhandeln'", req: "hammer", m: 20, f: -10, a: -30, c: 10, r: "Du hast den Zentralserver der KI zertrümmert. Die Türen sind offen. Sachschaden: 10.000€. Befriedigung: Unbezahlbar." }
		]
	},
	{
		id: "call_phish",
		title: "Phishing Live-Test",
		text: "Eine sehr freundliche Dame mit Akzent: 'Hallo, hier ist Microsoft Support Windows. Ihr Computer hat Virus. Bitte geben Sie mir Fernzugriff und Kreditkarte für Reinigung.'",
		opts: [
			{ t: "Sich dumm stellen & Zeit schinden", next: "path_phish_troll", m: 45, f: 20, a: -20, c: 5, r: "Du tust so, als wärst du der dümmste User der Welt. 'Ist die Any-Key Taste vorne oder hinten?' Nach 45 Minuten legt sie wütend auf. Ein Fest!" },
			{ t: "Trillerpfeife ins Mikrofon blasen", m: 2, f: 0, a: -10, c: 0, r: "Du pfeifst mit 120 Dezibel in den Hörer. Das Trommelfell am anderen Ende dürfte hinüber sein. Kurzer Prozess." },
			{ t: "Ihr gutgläubig die Kreditkarte geben", next: "path_phish_karte", m: 10, f: 10, a: 30, c: 80, r: "Du hast ihr wirklich die Firmenkarte gegeben?! Bist du wahnsinnig? Das Konto ist in Sekunden leergeräumt. Die Kündigung droht!" }
		]
	},
	{
		id: "call_deaf",
		title: "Der hörgeschädigte Kunde",
		text: "Ein Herr schreit ins Telefon: 'ICH VERSTEHE SIE NICHT! ES IST SO LAUT HIER!' Er sitzt offenbar auf einer Baustelle.",
		opts: [
			{ t: "Headset lauter drehen", m: 10, f: 0, a: 5, c: 0, r: "Du drehst das Headset auf Maximum und brüllst Diagnoseschritte über den Baustellenlärm. Das halbe Büro hört mit, wie du 'HABEN SIE ES AUSGESCHALTET?' ins Telefon rufst. Das wird morgen jemand nachmachen. Wochenlang." },
			{ t: "NC-Kopfhörer aufsetzen", req: "headphones", m: 15, f: 5, a: -10, c: 0, r: "Dank Noise-Cancelling hörst du sein Geschrei klar, aber gedämpft. Du bleibst Zen-artig ruhig." },
			{ t: "Auflegen", m: 2, f: 5, a: 0, c: 5, r: "Du legst auf und schiebst es auf die Leitung. Bei dem Lärm merkt er es nicht einmal, sondern schreit noch eine Weile in ein totes Telefon. Irgendwann ruft er wieder an, aber nicht heute." }
		]
	},
	{
		id: "call_cd_stuck",
		title: "Das verklemmte CD-Laufwerk",
		text: "Frau Jansen hat eine CD in den Schlitz geschoben. Es war aber gar kein Laufwerk, sondern der Lüftungsschlitz. 'Kriegen Sie das da wieder raus?'",
		opts: [
			{ t: "Schraubendreher nutzen", req: "screw", m: 30, f: -10, a: 5, c: 0, r: "Du bist hingegangen, hast das Gehäuse geöffnet und die CD gerettet. Es war eine Schlager-CD." },
			{ t: "Mit Klebeband angeln", req: "tape", m: 20, f: -5, a: 10, c: 0, r: "Du hast Tape an einen Stift geklebt und gefischt. Hat geklappt! MacGyver-Style." },
			{ t: "Neuen PC bestellen", rep: { "Dr. Wichtig": -5 }, m: 10, f: 10, a: -5, c: 20, r: "Das war dem Chef zu teuer. Abmahnung droht." }
		]
	},
	{
		id: "call_loose_contact_1",
		title: "Der Wackelkontakt",
		text: "Müller am Apparat: 'Mein Internet geht immer an und aus wenn ich atme! Das Kabel wackelt in der Dose. Können Sie nicht herkommen?' Du hast keine Lust auf Laufen.",
		opts: [
			{ 
				t: "'Wir schalten auf WLAN-Strom um.'", 
				m: 2, f: 10, a: 10, c: 5,
				r: "'Ach, moderne Technik!' Müller ist begeistert. 'Dann brauche ich das Kabel ja nicht mehr.' *Klick*. Er legt auf. Hoffentlich zieht er es nicht wirklich ab." 
			},
			{ 
				t: "'Kleben Sie es mit Tape fest.'", 
				next: "loose_taped",
				m: 5, f: 5, a: -5, c: 0, 
				r: "'Panzertape? Habe ich da.' Du hörst ein reißendes Geräusch am Telefon. 'So. Das ganze Paket ist drauf. Das bewegt sich nie wieder.' Müller scheint zufrieden." 
			},
			{ 
				t: "'Kabelbinder am Tischbein.'", 
				next: "loose_tied",
				m: 5, f: 0, a: 0, c: 0, 
				r: "'Moment...' Rascheln. 'Okay, ich habe es am Tischbein festgezurrt. Zugentlastung, wie Sie sagten.' Es scheint zu halten." 
			}
		]
	},
	{
		id: "call_loose_contact_2a",
		title: "Statik-Probleme",
		reqStory: "loose_taped", 
		text: "Müller ruft wieder an. Er klingt panisch. 'Hören Sie... ich wollte gerade meinen Schreibtisch verschieben. Das Tape hat gehalten. Aber... die Netzwerkdose kommt mir entgegen. Und ein großes Stück Wand.'",
		opts: [
			{ 
				t: "Pfusch-Tipp: 'Kalender drüberhängen.'", 
				m: 5, f: -5, a: 0, c: 20,
				r: "'Meinen Sie? Okay, ich habe noch den Katzen-Kalender von 2018.' Du hörst Rascheln. 'Sieht man kaum.' Das Problem ist gelöst, aber der Facility Manager wird dich töten." 
			},
			{ 
				t: "'Ich schicke den Hausmeister.'", 
				rep: { "Egon": -5 },
				m: 5, f: -5, a: 10, c: -5,
				r: "Du machst ein Ticket für Egon auf. 'Wandschaden durch User'. Egon wird dich dafür hassen, aber immerhin ist es aktenkundig." 
			},
			{ 
				t: "'Nicht anfassen! Einsturzgefahr!'", 
				m: 5, f: 5, a: 10, c: 5, 
				r: "'Was?!' Müller lässt den Hörer fallen und rennt wohl aus dem Büro. Du hast Ruhe, aber vielleicht hast du etwas übertrieben." 
			}
		]
	},
	{
		id: "call_loose_contact_2b",
		title: "Schnipp Schnapp",
		reqStory: "loose_tied", 
		text: "Müller wieder. 'Sagen Sie mal... ich wollte den Kabelbinder lösen, weil ich nach Hause will. Ich hatte keine Schere, nur so ein Teppichmesser... jetzt ist das Internet ganz weg und das Kabel hat zwei Enden.'",
		opts: [
			{ 
				t: "Fachmännisch durchs Crimpen lotsen", 
				rep: { "Dr. Wichtig": 2 },
				m: 20, f: -20, a: 15, c: -10,
				r: "Du erklärst ihm 20 Minuten lang, welche Ader wohin gehört. 'Weiß-Orange auf Eins...' Es ist mühsam, Müller versteht nichts, aber am Ende steht die Verbindung. Der Chef lobt den Einsatz." 
			},
			{ 
				t: "'Einfach einen Knoten reinmachen?'", 
				rep: { "Dr. Wichtig": -2 },
				m: 5, f: 5, a: 5, c: 15,
				r: "'Gute Idee! Daten fließen ja wie Wasser, oder?' Pause. 'Geht immer noch nicht.' Jetzt hast du einen User mit verknotetem Kabel und einen wütenden Chef im Nacken." 
			},
			{ 
				t: "'Neues Kabel kommt per Post.'", 
				m: 5, f: 5, a: 5, c: 0, 
				r: "Du bestellst ein Kabel per Hauspost. 'Bis morgen, Herr Müller.' Er ist enttäuscht, aber er kann heute keinen Schaden mehr anrichten." 
			}
		]
	},
	{
		id: "call_pw_lost",
		char: "Dr. Wichtig",
		title: "Passwort-Vergesser",
		text: "Der CEO ruft an: 'Müller! Ich komme nicht ins System! Welches Passwort habe ich für den Server 'Geheim' gesetzt? Sie müssen das doch wissen!'",
		opts: [
			{ t: "Mit ihm gemeinsam raten", rep: { "Dr. Wichtig": -5 }, m: 20, f: 0, a: 20, c: 10, r: "Du fragst: 'War es vielleicht Ihr Geburtstag?' Nein. 'Name der Geliebten?' Langes Schweigen. Er wird langsam richtig wütend." },
			{ t: "Passwort mit dem USB-Stick knacken", req: "usb_stick", rep: { "Dr. Wichtig": 10 }, m: 10, f: 5, a: 0, c: 0, r: "Du liest das Passwort in 10 Sekunden aus. Er ist tief beeindruckt von deinen Hacker-Skills (und sollte dir eigentlich aus Angst sofort kündigen)." },
			{ t: "Root-Zugang nutzen & zurücksetzen", req: "admin_pw", rep: { "Dr. Wichtig": 10 }, m: 5, f: 10, a: 0, c: -10, r: "Du setzt es remote auf 'Chef123' zurück. Er atmet auf: 'Gute Arbeit, Müller. Behalten Sie das für sich.'" }
		]
	},
	{
		id: "call_monitor_arm",
		title: "Der Monitor-Arm",
		text: "Der Monitorarm im Meetingraum sinkt immer langsam nach unten. Mitten in der Präsentation guckt der Bildschirm auf den Tisch.",
		opts: [
			{ t: "Schraube festziehen", req: "screw", m: 5, f: 0, a: -5, c: 0, r: "Eine halbe Umdrehung mit dem richtigen Werkzeug, und der Arm hält wieder. Drei Jahre Meeting-Komik, beendet in fünf Sekunden. Danken wird es dir niemand, aber der Bildschirm schaut wieder geradeaus." },
			{ t: "Stütze bauen", req: "manual", m: 5, f: 5, a: 0, c: 0, r: "Das Windows-95-Handbuch hat exakt die richtige Dicke, als wäre es dafür gedruckt worden. Nach dreißig Jahren im Regal hat es endlich eine Aufgabe. Irgendwo schließt sich ein Kreis." },
			{ t: "Ignorieren", m: 2, f: 10, a: 0, c: 5, r: "Du erklärst die Neigung zum Feature: ergonomischer Blickwinkel. Der Vertrieb präsentiert ab sofort leicht gebückt. Die Kollegen werden sich daran gewöhnen, und genau darauf setzt du." }
		]
	},
	{
		id: "call_printer_noise",
		title: "Der aggressive Drucker",
		text: "Der große Kopierer im Flur rattert extrem laut und vibriert durch den Boden. Die Buchhaltung hat Angst.",
		opts: [
			{ t: "Techniker rufen", m: 30, f: 10, a: 0, c: 5, r: "Der Techniker nennt einen Termin in 3 Tagen, Zeitfenster 8 bis 17 Uhr. Bis dahin rattert der Kopierer weiter durch den Boden, und die Buchhaltung arbeitet mit Gehörschutz. Frau Elster trägt ihren mit einer Würde, als hätte sie ihn schon immer besessen." },
			{ t: "Perkussive Wartung", req: "hammer", m: 5, f: 5, a: -20, c: 10, r: "Ein gezielter Schlag an die Seite. Das Rattern hört auf. Stille. User klatschen." },
			{ t: "Dämpfer basteln", req: "tape", m: 20, f: -5, a: 5, c: 0, r: "Du klebst aus Panzertape und Filzresten eine Dämpfung unter die Gerätefüße. Das Rattern wird zum Brummen, das Brummen zur Gewohnheit. Keine schöne Lösung, aber eine, die bis zum Techniker hält." }
		]
	},
	{
		id: "call_cnc",
		title: "Antike Software",
		text: "Die Produktion steht still! Die uralte CNC-Fräse läuft noch auf DOS 6.0 und verlangt blinkend nach 'Disk 2'. Keiner weiß, wo die ist, der Bediener schwitzt Panik.",
		opts: [
			{ t: "Floppy-Emulator vom Stick booten", req: "usb_stick", m: 45, f: -20, a: 10, c: -20, next: "path_cnc_emulator", r: "Du hackst den Parallelport und mountest ein Image. Für einen Nachmittag bist du der gefährlichste Mensch im ganzen Maschinenpark. Die Produktion läuft wieder an." },
			{ t: "Im verstaubten Handbuch nachsehen", req: "manual", m: 30, f: -10, a: 0, c: 0, r: "Du blätterst das fettige Buch durch. Tatsächlich! Ganz hinten klebt die Diskette im Umschlag. Glück muss man haben." },
			{ t: "Einfach mal neu starten", m: 15, f: 0, a: 10, c: 20, r: "Schlechte Idee. Der Puffer-Speicher war leer. Die Fräse spinnt und bohrt sich mit einem lauten Kreischen in den eigenen Tisch. Totalschaden." }
		]
	},
	{
		id: "call_cable_chaos",
		title: "Kabel-Wirrwarr",
		text: "Unter dem Tisch des neuen Kollegen sieht es aus wie Spaghetti. Er tritt ständig den Stecker raus.",
		opts: [
			{ t: "Tape an Tisch", req: "tape", m: 10, f: 0, a: 0, c: 0, r: "Vier Streifen Panzertape quer über die Tischkante, fertig. Es sieht aus wie ein Verband nach einem Arbeitsunfall, aber der Stecker bleibt drin. Bis jemand den Tisch verschiebt." },
			{ t: "Ihn belehren", m: 15, f: 0, a: 10, c: 0, r: "Du erklärst geduldig Zugentlastung, Kabelkanäle und warum ein Stecker kein Stolperseil ist. Er nickt durchgehend und tritt noch während deiner Erklärung das Netzkabel aus der Buchse." },
			{ t: "Kabelbinder-Einsatz", req: "zip_ties", m: 20, f: -5, a: -10, c: 0, r: "Alles sauber gebündelt und hochgebunden. r/CablePorn Material." }
		]
	},
	{
		id: "call_werner_tablet",
		title: "Privatanruf: Schwiegerpapa Werner",
		text: "Dein Bürotelefon klingelt. Das Display zeigt 'Unbekannt'.\n\n'JÜRGEN? HÖRST DU MICH??'\n\nEs ist Werner, dein Schwiegervater. Er schreit, als würde er über den Atlantik rufen.\n\n'Die Renate hat mir dieses Wisch-Brett geschenkt! Ich drücke auf den Briefumschlag, aber da kommen keine Briefe! Und der Enkel sagt, ich soll mir Wozz-Äpp holen. Aber dieser Äpp-Laden will ein Passwort! Helf mir mal eben, das dauert doch nur eine Minute!'",
		opts: [
			{ 
				t: "Noise-Cancelling an & einfach 'Ja' sagen", 
				req: "headphones", 
				m: 30, f: 20, a: -15, c: 5, 
				next: "path_werner_blind",
				r: "Du aktivierst die Stille. Du hörst Werner nur noch dumpf meckern. Ab und zu sagst du 'Mhm' und 'Klick da mal drauf'. Nach 30 Minuten legt er zufrieden auf. Du hast keine Ahnung, was er installiert hat." 
			},
			{ 
				t: "Verwirrung stiften: Aus dem Win95-Handbuch vorlesen", 
				req: "manual", 
				m: 10, f: 5, a: -10, c: 0, 
				r: "Du liest ihm Kapitel 4 vor: 'Einrichten eines 56k Modems'. Werner ist völlig verwirrt: 'Modem? Muss ich in den Keller?' Er legt auf, um das Modem an der Heizung zu suchen. Du hast deine Ruhe." 
			},
			{ 
				t: "Geduldig Schritt-für-Schritt erklären",
				rep: { "Dr. Wichtig": -5 },					
				m: 60, f: 10, a: -20, c: 20, 
				r: "Das war die Hölle. Er wusste seine Apple-ID nicht ('Ist das meine Hausnummer?'). Nach einer Stunde hat er WhatsApp installiert und dir sofort ein Bild von seinem Fußpilz geschickt. Der Chef hat dich privat telefonieren sehen." 
			},
			{ 
				t: "'Werner, ich arbeite gerade!'", 
				m: 5, f: 0, a: 20, c: -5, 
				r: "Stille am anderen Ende. Dann ganz leise: 'Schon gut... Ich wollte ja nicht stören. Die Renate hatte Recht, du hast nie Zeit.' Klick. Das schlechte Gewissen wird dich den ganzen Tag verfolgen." 
			}
		]
	},
	{
		id: "call_tonie_kid",
		title: "Unbekannte Nummer (Kinderstimme)",
		text: "Eine weinerliche Stimme am Telefon: 'Bist du der Computer-Mann? Mein Kreativ-Tonie geht nicht! Der Löwe singt nicht, die Box blinkt nur rot! Mach den Löwen heile! SOFORT!'",
		opts: [
			{ 
				t: "'Du musst die Box hauen!'", 
				rep: { "Dr. Wichtig": -2 },
				m: 25, f: -10, a: 5, c: 15, 
				r: "Du erklärst den Reset-Trick durch Klopfen. Der Chef läuft vorbei und sieht, wie du wilde Karate-Bewegungen machst, als würdest du einen unsichtbaren Würfel verprügeln. 'Alles klar bei Ihnen, Müller?'" 
			},
			{ 
				t: "'Du brauchst die Toniebox 2 PRO!'", 
				m: 5, f: 10, a: -20, c: -5, 
				r: "Du flüsterst verschwörerisch: 'Weck Mama und sag, sie muss die JETZT kaufen.' Das Kind rennt los. Du hast Ruhe und wirkst beschäftigt, bist aber eigentlich nur gemein." 
			},
			{ 
				t: "Wortlos auflegen", 
				m: 2, f: 5, a: 0, c: 0, 
				r: "Klick. Nicht dein Problem. Du bist Systemadministrator, kein Kindergärtner." 
			}
		]
	},
    {
        id: "call_silence_creepy",
        title: "Keine Nummer",
        startNode: "root",
        nodes: {
            root: {
                text: "'...' Nur schweres Atmen am anderen Ende.",
                opts: [
                    { t: "Hallo?!", next: "hello" },
                    { t: "Zurückatmen", next: "breath" }
                ]
            },
            breath: {
                text: "Ihr atmet euch gegenseitig an. Es wird unangenehm intim.",
                opts: [
                    { t: "Auflegen.", next: "res_weird" }
                ]
            }
        },
        results: {
            res_weird: { txt: "Du legst auf und starrst den Hörer noch eine Weile an. Keine Nummer, kein Wort, nur Atmen. Du entscheidest dich, an ein defektes Faxgerät zu glauben. Mit dieser Version lässt sich weiterarbeiten.", m: 3, f: 0, a: 10, c: 0 },
            hello: { txt: "Auf dein 'Hallo?!' folgt ein Klicken, dann das Freizeichen. Wer immer das war, wollte nur hören, wer abnimmt. Du sagst dir, dass das nichts zu bedeuten hat.", m: 2, f: 0, a: 0, c: 0 }
        }
    },
	{
		id: "call_boss_wording",
		char: "Dr. Wichtig",
		title: "Der Chef (Hektisch)",
		text: "MÜLLER! Der Drucker im Flur qualmt! Das Papier ist alle und der Toner ist explodiert! Das ist ein riesiges... na, sagen Sie schon! Was haben wir da?!",
		opts: [
			{ 
				t: "Eine spannende Herausforderung!",
				rep: { "Dr. Wichtig": 5 },
				m: 5, f: 5, a: -5, c: -10, 
				r: "Der Chef atmet erleichtert aus. 'Exakt! Das ist der Spirit! Lösen Sie diese Herausforderung!' Er ist glücklich." 
			},
			{ 
				t: "Ein Fall für die Feuerwehr", 
				m: 5, f: 0, a: 0, c: 5, 
				r: "Er ignoriert dich und murmelt 'Agiles Mindset...' vor sich hin." 
			},
			{ 
				t: "Ein riesiges Problem!",
				rep: { "Dr. Wichtig": -10 },
				m: 10, f: 0, a: 10, c: 25, 
				r: "Der Chef schreit: 'WIR HABEN KEINE PROBLEME! WIR HABEN HERAUSFORDERUNGEN! Sie haben die falsche Einstellung, Müller!' Er legt wütend auf." 
			}
		]
	},
	{
		id: "call_climate_emergency",
		char: "Egon",
		title: "Hausmeister Egon (Frierend)",
		text: "Müller! Im Serverraum sind minus 10 Grad! Ich steh hier vor der Anlage. Meine Brille ist beschlagen, mir frieren die Zehen ab! Ich muss das Ding wärmer stellen! Soll ich den Regler in den roten oder den blauen Bereich drehen? Schnell!",
		opts: [
			{ 
				t: "Mir egal, dreh einfach an irgendwas!",
				rep: { "Egon": -2 }, 
				m: 10, f: 0, a: 0, c: 0, 
				r: "Egon flucht: 'Dann mach ich das Ding eben aus!' Er zieht den Hauptstecker. Es wird warm, aber der Server ist tot. Stille." 
			},
			{ 
				t: "Auf ROT drehen! Rot ist immer warm!",
				rep: { "Egon": -5 },
				m: 30, f: -10, a: 20, c: 10, 
				r: "FALSCH! Dank der kreativen Verkabelung des Vorbesitzers hast du auf 'Schock-Frost' gestellt. Die Rohre platzen mit einem lauten Knall. Egon ist jetzt ein Eiszapfen." 
			},
			{ 
				t: "Auf BLAU drehen! Vertrau mir!",
				rep: { "Egon": 5 }, 
				m: 5, f: 5, a: 0, c: -5, 
				next: "path_egon_blau",
				r: "Egon zögert: 'Blau? Bist du sicher? Das ist doch Kalt...' Er dreht auf Blau. Plötzlich strömt warme Luft. 'Verrückte Technik! Du bist ein Genie, Müller!'" 
			}
		]
	},
	{
		id: "call_locked_in",
		title: "Unbekannte Nummer (Panisch)",
		text: "HILFE! Hier ist die Praktikantin Lena! Ich wollte Druckerpapier aus dem Keller holen und die Tür ist zugefallen! Hier ist ein Tastenfeld, aber ich kenne den Code nicht! Es ist dunkel und hier sind Spinnen!",
		opts: [
			{ 
				t: "Probier mal '1234'",
				m: 45, f: -10, a: 20, c: 0, 
				r: "Falsch! Die Anlage hat sich gesperrt. Du musstest runterlaufen, Egon suchen (der unauffindbar war) und sie manuell befreien. Lena hat geheult." 
			},
			{ 
				t: "Probier mal '0000'",
				m: 5, f: 10, a: -5, c: -10, 
				next: "path_lena_keller",
				r: "Piep-Piep-Klick. 'Oh mein Gott, es geht! Du bist mein Held!' Sie ist frei. Kurz überlegst du, ob man das in den Lebenslauf schreiben kann: Türen öffnen nach Gehör." 
			},
			{ 
				t: "Ruf die Feuerwehr", 
				rep: { "Dr. Wichtig": -10 },
				m: 10, f: 0, a: 0, c: 30, 
				r: "Die Feuerwehr hat die Tür aufgebrochen. Rechnung: 500€. Der Chef tobt: 'Wieso wussten Sie den Code nicht?!'" 
			}
		]
	},
    {
        id: "call_kevin_button_1",
		char: "Kevin",
        title: "Kevin (Serverraum)",
        startNode: "root",
        nodes: {
            root: {
                text: "'Chef? Hier ist so ein großer roter Knopf mit 'DO NOT TOUCH' drauf. Der leuchtet so schön. Was macht der?'\n\nKevins Stimme zittert vor Neugier.",
                opts: [
                    { t: "FASS NICHTS AN!", next: "scream" },
                    { t: "'Na los, drück ihn.'", next: "sarcasm" }
                ]
            },
            scream: {
                text: "'Okay okay! Chill mal! ... Oh, mein Ellbogen ist drangekommen.'",
                opts: [
                    { t: "WAS?!", next: "res_panic" }
                ]
            },
            sarcasm: {
                text: "'Echt? Cool! Danke Chef!' *KLICK*",
                opts: [
                    { t: "Nein warte!", next: "res_disaster" }
                ]
            }
        },
        results: {
            res_panic: { 
                txt: "Eine Sekunde Stille, dann heulen die Sirenen durchs ganze Haus. Kevins Ellbogen hat den Feueralarm gefunden. Durch den Hörer sagt er das Einzige, was die Lage noch schlimmer machen kann: 'Soll ich nochmal drücken?'", 
                rep: { "Kevin": -5 },
                m: 5, f: -10, a: 20, c: 10,
                next: "kevin_alarm"
            },
            res_disaster: { 
                txt: "Durch den Hörer: ein Klick, ein Zischen, dann Kevins andächtiges 'Woah'. Das Löschgas flutet den Serverraum, und du lernst in Echtzeit, dass Sarkasmus ein Feature ist, das Kevin nicht unterstützt.", 
                rep: { "Kevin": 5 },
                m: 5, f: -20, a: 30, c: 20,
                next: "kevin_gas"
            }
        }
    },
    {
        id: "call_kevin_button_2",
		char: "Kevin",
        reqStory: "kevin_alarm",
        title: "Feuerwehr-Leitstelle",
        startNode: "root",
        nodes: {
            root: {
                text: "'Hier ist die Feuerwehr. Wir haben einen Alarm. Brennt es wirklich, oder ist das wieder Ihr Azubi?'\n\nMan hört genervtes Atmen.",
                opts: [
                    { t: "Es ist der Azubi.", next: "truth" },
                    { t: "'Wir brennen!'", next: "lie" }
                ]
            }
        },
        results: {
            truth: { txt: "Du gestehst den Azubi. Die Leitstelle diktiert dir die Fehlalarm-Gebühr mit der Routine von jemandem, der diesen Satz täglich sagt: 500 Euro, Rechnung folgt. Die halbe Stunde Belehrung gibt es kostenlos dazu.", rep: { "Kevin": -5 }, m: 30, f: 0, a: -5, c: 10 },
            lie: { txt: "Du sagst 'Es brennt', und die Feuerwehr nimmt dich beim Wort: 3 Löschzüge, Vollsperrung, 200 Kollegen auf dem Parkplatz. Als klar wird, dass nichts brennt, sucht der Einsatzleiter das Gespräch mit dir. Es ist kein gutes Gespräch.", rep: { "Kevin": 5 }, m: 60, f: -10, a: 50, c: 50 }
        }
    },
    {
        id: "call_kevin_button_3",
		char: "Kevin",
        reqStory: "kevin_gas",
        title: "Brandschutz Nord GmbH",
        startNode: "root",
        nodes: {
            root: {
                text: "'Guten Tag, Ihre Löschanlage in Raum 4 hat ausgelöst. Wir sehen das hier live auf der Fernwartung.'\n\nEine Pause.\n\n'Ihr Mitarbeiter steht übrigens noch drin und filmt das mit dem Handy. Das Zeug ist nicht giftig, aber die Neubefüllung kostet 8.400 Euro netto.'",
                opts: [
                    { t: "Kevin sofort rausholen.", next: "rescue" },
                    { t: "'Kann man das nicht zurückpumpen?'", next: "refund" },
                    { t: "Als geplanten Anlagentest verbuchen.", next: "cover" }
                ]
            },
            rescue: {
                text: "Du rennst runter. Kevin steht mitten im Nebel und dreht ein Video. 'Bro, das sieht aus wie in Silent Hill!'\n\nDu ziehst ihn am Kragen raus. Auf dem Flur schaut euch die halbe Buchhaltung zu.",
                opts: [
                    { t: "'Wir reden nachher.'", next: "res_rescue" }
                ]
            },
            refund: {
                text: "'...Nein. Das ist Löschgas, kein Luftballon.' Der Techniker klingt, als wäre das nicht die erste Firma, die das fragt.",
                opts: [
                    { t: "War einen Versuch wert.", next: "res_refund" }
                ]
            },
            cover: {
                text: "'Ein Test. Verstehe.' Du hörst Tastaturklappern. 'Ich trage das so ein. Der Wartungsbericht geht wie üblich in Kopie an Ihre Geschäftsführung.'\n\nDaran hattest du nicht gedacht.",
                opts: [
                    { t: "Natürlich. Danke.", next: "res_cover" }
                ]
            }
        },
        results: {
            res_rescue: { txt: "Kevin ist unversehrt und um eine Anekdote reicher. Die Rechnung landet trotzdem auf deinem Tisch.", rep: { "Kevin": 10 }, m: 35, f: -5, a: 25, c: 30 },
            res_refund: { txt: "Die Anlage wird neu befüllt. 8.400 Euro, die in keinem Budget stehen. Frau Elster wird das finden.", rep: { "Frau Elster": -10 }, m: 25, f: 0, a: 20, c: 35 },
            res_cover: { txt: "Offiziell war es ein Test. Der Bericht ist unterwegs zur Geschäftsführung, und darin steht das Wort 'Fehlauslösung'.", rep: { "Kevin": 5, "Dr. Wichtig": -10 }, m: 20, f: 10, a: 15, c: 55 }
        }
    },
	{
		id: "call_gabi_sugar",
		char: "Gabi",
		title: "Sekretärin Gabi (Zitternd)",
		text: "Herr Müller... mir ist so schwindelig... Unterzucker... Ich brauche Schokolade... sofort! Aber der Automat ist leer! Haben wir nirgendwo was Süßes?!",
		opts: [
			{ 
				t: "Guck mal in den Ordner 'Steuer 1990'...",
				rep: { "Gabi": 5 },
				m: 5, f: 10, a: -10, c: -5, 
				r: "Stille. Dann ein Rascheln und Schmatzen. 'Oh Gott, Sie sind ein Lebensretter! Woher wussten Sie...? Egal! Danke!'" 
			},
			{ 
				t: "Ich hab hier einen halben Donut", 
				req: "donut", 
				rep: { "Gabi": 5 },
				m: 5, f: 0, a: -5, c: 0, 
				r: "Du bringst ihr deinen Donut. Nett, aber du bist dein Essen los." 
			},
			{ 
				t: "Ich glaube im Kühlschrank ist Senf?",
				rep: { "Gabi": -5 },
				m: 10, f: 0, a: 10, c: 0, 
				next: "path_gabi_kollaps",
				r: "Gabi legt auf. Später hörst du, dass sie vor Schwäche ohnmächtig geworden ist. Der Sanitäter musste kommen." 
			}
		]
	},
	{
		id: "call_canteen_fix",
		title: "Die Kantine ruft an",
		text: "Eine tiefe Stimme am Telefon: 'Hier ist Herr Löffel aus der Kantine. Mein Bondrucker streikt! Ich kann keine Belege für das Finanzamt drucken! Kommen Sie sofort her!'",
		opts: [
			{ 
				t: "'Ja, Herr Senior Nutrition Artist.'",
				m: 5, f: 5, a: -5, c: 0, 
				r: "Er schnurrt fast: 'Endlich jemand mit Respekt!' Er drückt vor Freude einfach mal auf 'Feed' und der Drucker geht wieder. 'Danke, Müller!'" 
			},
			{ 
				t: "'Ja, Herr Koch, ich komme.'",
				m: 30, f: 0, a: 20, c: 5, 
				r: "Stille. Dann Gebrüll: 'KOCH?! ICH BIN NUTRITION ARTIST!' Er knallt den Hörer auf. Du musst hingehen und er lässt dich 20 Minuten warten." 
			},
			{ 
				t: "Auflegen", 
				m: 2, f: 5, a: 0, c: 10, 
				r: "Kein Mittagessen für dich heute." 
			}
		]
	},
	{
		id: "call_elster_excel",
		char: "Frau Elster",
		title: "Frau Elster (Buchhaltung)",
		text: "Schluchz... 'Herr Müller? Meine Excel-Tabelle ist weg! Alles schwarz! Ich drücke Tasten, aber nichts passiert! Ich bin so zittrig heute...'",
		opts: [
			{ 
				t: "Neustart befehlen", 
				rep: { "Frau Elster": 2 },
				m: 5, f: 10, a: 10, c: 0, 
				r: "Hat funktioniert, aber sie wirkt immer noch verstört." 
			},
			{ 
				t: "'Haben Sie ein Ticket?'", next: "path_excel_ticket", 
				rep: { "Frau Elster": -5 },
				m: 5, f: 5, a: 5, c: 5, 
				r: "Sie legt weinend auf. Die Tabelle ist noch genauso kaputt wie vorher - nur weiß sie jetzt, dass auch die IT ratlos ist." 
			},
			{ 
				t: "Beruhigen & Auto-Save prüfen", next: "path_excel_retterin",
				rep: { "Frau Elster": 5 }, 
				m: 20, f: -5, a: -10, c: 0, 
				r: "Du redest ihr gut zu. Die Datei ist wieder da. Sie atmet auf: 'Danke! Sie sind so lieb. Genau wie mein Kater *Rüdiger*. Der spürt auch immer, wenn es mir schlecht geht. Rüdiger ist mein einziger Halt.'" 
			}
		]
	},
	{
		id: "call_manager_stress",
		title: "Projektleiter 'High-Performance'",
		text: "SCHNELL! Ich brauche diesen Export! Deadline war gestern! Wenn das nicht klappt, springe ich aus dem Fenster! Ich halte diesen Druck nicht mehr aus!",
		opts: [
			{ 
				t: "Auf Ticket bestehen",
				m: 15, f: 0, a: 10, c: 0, 
				r: "Er fängt an zu weinen: 'BITTE!'. Du hast Mitleid und schickst die Datei doch. Er bedankt sich kurz angebunden." 
			},
			{ 
				t: "Datei sofort senden",
				m: 10, f: -5, a: 5, c: 0,
				r: "Er atmet schwer aus. 'Danke. Puh. Ich muss runterkommen. Wissen Sie, eigentlich will ich nur tanzen. Das ist meine wahre Leidenschaft. Nicht Excel.'" 
			},
			{ 
				t: "Ihn warten lassen",
				m: 5, f: 5, a: 20, c: 10, 
				r: "Er schreit dich an, bis die Adern an seiner Stirn platzen. Sein Blutdruck ist kritisch. Aufgelegt." 
			}
		]
	},
	{
		id: "call_boss_pocket",
		char: "Dr. Wichtig",
		title: "Anruf vom Chef (Handy)",
		text: "Du hörst nur Rascheln und Windgeräusche. Er hat wohl aus Versehen gewählt. Im Hintergrund hörst du ihn prahlen: '...diese Idioten in der Firma. Zahlen 2 Euro für die Plörre! Dabei hab ich die Maschine so eingestellt: Wenn man *Espresso* drückt und gleichzeitig den *Becher-Sensor* zuhält, gibt's den *Premium-Gold-Röstung* umsonst! Hahaha!'",
		opts: [
			{ 
				t: "Laut 'HALLO?!' rufen", 
				rep: { "Dr. Wichtig": -5 },
				m: 2, f: 0, a: 10, c: 15, 
				r: "Gerumpel am anderen Ende. 'WER IST DA?! MÜLLER?! LAUSCHEN SIE MIR ETWA NACH?!' Er legt wütend auf. Das war keine gute Idee." 
			},
			{ 
				t: "Still zuhören & auflegen",
				m: 5, f: 5, a: -5, c: 0, 
				next: "path_chef_kaffeetrick",
				r: "Du legst leise auf. 'Espresso + Sensor zuhalten'. Das merkst du dir. Wissen ist Koffein." 
			},
			{ 
				t: "Sofort auflegen", 
				m: 2, f: 0, a: 0, c: 0, 
				r: "Besser nichts riskieren. Du hast nichts gehört (und nichts gelernt)." 
			}
		]
	},
	{
		id: "call_intern_mom",
		title: "Praktikant (Telefoniert)",
		text: "Der Praktikant hat vergessen aufzulegen. Du hörst ihn mit seiner Mutter reden: 'Ja Mama... Nein, ich vergesse das Passwort nicht mehr... Ja, ich habe es geändert auf den Namen von meinem Goldhamster... **'Puschel123'**... Ja, hab dich lieb.'",
		opts: [
			{ 
				t: "Still zuhören & auflegen", 
				m: 2, f: 5, a: 0, c: 0, 
				next: "path_puschel",
				r: "Goldhamster Puschel123. Unprofessionell, aber gut zu wissen." 
			},
			{ 
				t: "Laut lachen", 
				m: 5, f: 0, a: 10, c: 0, 
				r: "Er erschrickt und legt auf. 'Haben Sie gelauscht?!' Er ist rot wie eine Tomate und rennt weg." 
			}
		]
	},
	{
		id: "call_budget_cut",
		title: "Der Finanzchef (Wütend)",
		text: "Müller! Ihre Abteilung kostet zu viel! Ich streiche Ihnen das Budget für Kaffee und neue Mäuse! Sparen Sie gefälligst, oder ich streiche Ihre Stelle auch noch!",
		opts: [
			{ 
				t: "'Grüße an die Kantinen-Chefin...'",
				m: 5, f: 20, a: -20, c: -20, 
				r: "Totenstille. Dann stammelt er: 'Äh... wie bitte? Also... vielleicht habe ich mich verrechnet. Budget verdoppelt. Wir verstehen uns doch, Müller?' Erpressung funktioniert." 
			},
			{ 
				t: "Ihn anschreien",
				m: 5, f: 0, a: -10, c: 30, 
				r: "Das macht es nur schlimmer. Jetzt streicht er auch noch das Klopapier." 
			},
			{ 
				t: "Dem CEO petzen",
				m: 20, f: 0, a: 50, c: 50, 
				r: "Du meldest die Affäre. Es gibt einen riesigen Skandal. Das Betriebsklima ist vergiftet. Alle hassen den 'Verräter' Müller." 
			},
			{ 
				t: "Akzeptieren & Betteln",
				m: 10, f: -10, a: 20, c: 0, 
				r: "Er lacht: 'Geht doch.' Budget gestrichen. Du trinkst ab morgen Wasser." 
			}
		]
	},
	{
		id: "call_cup_holder",
		title: "Der Getränkehalter",
		text: "Userin Frau Plomp: 'Mein Getränkehalter ist abgebrochen! Ich habe nur meine große Tasse draufgestellt!' Sie meint das CD-Laufwerk.",
		opts: [
			{ 
				t: "Erklären, dass es ein Laufwerk ist", 
				m: 15, f: -5, a: 5, c: 0, 
				r: "Du erklärst es ihr. Sie schnaubt: 'Wozu ist das Loch in der Mitte dann da?! Fehlkonstruktion!' Du gibst auf." 
			},
			{ 
				t: "Mit Tape kleben", 
				req: "tape", 
				m: 10, f: 0, a: -5, c: -5, 
				next: "path_plomp_tape",
				r: "Du klebst die Lade mit Panzertape zu. 'So, jetzt ist er stabil.' Problem 'gelöst'." 
			},
			{ 
				t: "Auflegen", 
				m: 2, f: 5, a: 0, c: 5, 
				r: "Klick. Tuut. Tuut. Das Ticket löst sich von selbst (hoffentlich)." 
			}
		]
	},
	{
		id: "call_internet_deleted",
		title: "Internet gelöscht",
		text: "Herr Panik am Telefon: 'ICH HABE DAS INTERNET GELÖSCHT! Das blaue E ist weg! Ist Google jetzt für alle weg?!'",
		opts: [
			{ 
				t: "Icon wiederherstellen", 
				m: 10, f: -5, a: -5, c: 0, 
				r: "Du schiebst die Verknüpfung aus dem Papierkorb zurück. Er weint vor Glück: 'Sie sind ein Magier!'" 
			},
			{ 
				t: "'Ja, alles weg.'", 
				m: 5, f: 10, a: -10, c: 15, 
				r: "Du sagst: 'Sie müssen das Internet neu kaufen. Kostet 50€.' Er glaubt es panisch. Böse, aber lustig." 
			},
			{ 
				t: "Handbuch vorlesen", 
				req: "manual", 
				m: 20, f: 5, a: -10, c: 0, 
				r: "Du schlägst das Handbuch bei 'Desktop-Symbole' auf und liest vor, mit ruhiger Vorlesestimme. Nach zwei Seiten hörst du gleichmäßiges Atmen. Er ist eingeschlafen. Du legst leise auf und schließt das Ticket als 'gelöst durch Ruhe'." 
			}
		]
	},
	{
		id: "call_boss_tunnel",
		char: "Dr. Wichtig",
		title: "Dr. Wichtig im Tunnel",
		text: "Der CEO ruft an. Rauschen. Hupen. 'Müller! ...wichtig! ...müssen sofort... *KCHHH* ...die Kosten... *KRRRK* ...streichen?!'",
		opts: [
			{ 
				t: "Laut 'HALLO?!' schreien", 
				rep: { "Dr. Wichtig": -5 },
				m: 10, f: -5, a: 5, c: 10, 
				r: "Du brüllst ins Telefon. Er ist genervt von deiner Inkompetenz. 'Müller, kaufen Sie sich ein besseres Handy!'" 
			},
			{ 
				t: "Blind 'Jawohl' sagen und nicken", next: "path_tunnel_ja", 
				rep: { "Dr. Wichtig": 10 },
				m: 5, f: 5, a: 20, c: -10, 
				r: "Du sagst 'Jawohl, Chef!'. Die Leitung bricht ab. Später erfährst du, was er gefragt hatte: 'Soll ich das IT-Budget streichen?' Glückwunsch, Eigentor - und an deine Zustimmung wird er sich erinnern." 
			},
			{ 
				t: "Einfach auflegen - der Tunnel war schuld", next: "path_tunnel_klick", 
				m: 2, f: 0, a: 0, c: 5, 
				r: "Du beendest das Gespräch mitten im Rauschen. Bei dieser Verbindung wird er es für den Tunnel halten - was auch sonst. Manchmal ist die Physik auf deiner Seite." 
			}
		]
	},
	{
		id: "call_kevin_microsoft",
		char: "Kevin",
		title: "Kevins Ticket",
		text: "Kevin hat wegen einer 'ruckelnden Maus' Microsoft angerufen. Er reicht dir den Hörer. Ein Support-Mitarbeiter (sehr starker Akzent) spricht schnell: 'Sir, kindly do the needful and truncate the production database logs to fix latency, okay?'",
		opts: [
			{ 
				t: "Zu Kevin: 'Ja, mach was er sagt'",
				rep: { "Kevin": -5 }, 
				m: 10, f: 10, a: 0, c: 40, 
				r: "Kevin tippt 'TRUNCATE DATABASE'. Zack. Die Kundendatenbank ist leer. Die Maus ruckelt immer noch. Das gibt eine Katastrophe!" 
			},
			{ 
				t: "Hörer nehmen & 'NO! STOP!'",
				rep: { "Kevin": 10 }, 
				m: 15, f: -5, a: 10, c: -5, 
				r: "Du schreist den Support an und legst auf. Kevin guckt verdattert. Du hast gerade die Firma gerettet." 
			},
			{ 
				t: "Das Gespräch an Kevin durchstellen",
				rep: { "Kevin": 3 }, 
				m: 5, f: 0, a: -5, c: 0, 
				r: "Kevin startet den PC neu. Das Problem ist weg. Die Datenbank lebt noch. Glück gehabt." 
			}
		]
	},
	{
		id: "call_password_caps_1",
		title: "Passwort geht nicht",
		text: "User am Telefon: 'Mein Passwort geht nicht! Ich tippe es genau ein! Großes A, kleines b...' Du hörst im Hintergrund, wie er aggressiv auf die Tasten hämmert. Er schnauft vor Wut.",
		opts: [
			{ 
				t: "'Probieren Sie es bitte noch einmal...'", 
				m: 25, f: 15, a: 5, c: 5, 
				r: "Du lässt ihn das Passwort noch 20 Mal eingeben. 'Ganz ruhig tippen.' Du nippst am Kaffee und genießt sein Leiden in aller Ruhe. Entspannter wird dein Vormittag dadurch sehr - aber Menschen wie er schreiben hinterher gerne Beschwerdemails mit dem Chef im CC." 
			},
			{ 
				t: "'Leuchtet da zufällig ein Lämpchen?'", 
				next: "caps_solved",
				m: 5, f: -5, a: -5, c: 0, 
				r: "Am anderen Ende wird es totenstill. 'Oh... äh... ja. Jetzt geht's.' Ein klassischer Layer-8-Fehler. Du notierst dir den Namen für später." 
			},
			{ 
				t: "Sofort zurücksetzen & auflegen", 
				req: "admin_pw", 
				m: 10, f: 0, a: 0, c: 0, 
				r: "Du setzt es genervt auf 'Start123!' zurück. Er bedankt sich und klebt das neue Passwort direkt an den Monitor. Sicherheit: Null, aber Ticket zu." 
			}
		]
	},
	{
		id: "call_password_caps_2",
		title: "Die Schuldfrage",
		reqStory: "caps_solved",
		text: "Derselbe User von vorhin, zweiter Anlauf. Die Panik von eben ist jetzt mit Trotz unterlegt. 'Hören Sie, seit Sie das mit dem Lämpchen gemacht haben, ist mein Mauszeiger viel langsamer! Sie haben da was verstellt!'",
		opts: [
			{ 
				t: "'Capslock hat nichts mit der Maus zu tun.'", 
				m: 15, f: -10, a: 5, c: 5, 
				r: "Du erklärst ihm geduldig Computer-Architektur. Er hört nicht zu. 'Ich starte lieber neu, bevor Sie noch mehr kaputt machen.' Er hält dich für inkompetent, aber er lässt dich in Ruhe." 
			},
			{ 
				t: "'Ich kalibriere den Sensor neu...'", 
				m: 5, f: 10, a: -10, c: 0, 
				r: "Du tippst lautlos auf deine Leertaste und sagst 'Beep'. Der User bewegt die Maus. 'Wow! Viel besser! Danke!' Placebo wirkt auch in der IT: Der Frieden ist gerettet, und angefasst hast du nichts." 
			},
			{ 
				t: "'Nein, Sie bilden sich das ein.'", 
				rep: { "Dr. Wichtig": -2 },
				m: 5, f: 0, a: 10, c: 15, 
				r: "'Unverschämtheit! Ich melde das dem Chef!' Das Gespräch endet mit einem Knall in der Leitung. Seine Beschwerde ist vermutlich schon unterwegs nach oben, aber dein Stolz bleibt intakt. Irgendwas muss es ja." 
			}
		]
	},
	{
		id: "call_mouse_in_printer",
		char: "Gabi",
		title: "Drucker macht Geräusche",
		text: "Sekretariat: 'Der Drucker quiekt so komisch beim Drucken.' Im Hintergrund ist es tatsächlich zu hören: ein hohes, rhythmisches Quietschen, im Takt der Seiten.",
		opts: [
			{ 
				t: "Mit Hammer drohen", 
				req: "hammer", 
				rep: { "Gabi": 2 },
				m: 10, f: 0, a: 10, c: 0, 
				r: "Du stellst den Hammer demonstrativ neben den Drucker. Er druckt plötzlich leise. Maschinen haben Angst." 
			},
			{ 
				t: "Hingehen & Prüfen", 
				rep: { "Gabi": 5 },
				m: 15, f: -5, a: 0, c: -5, 
				next: "path_maus_hof",
				r: "Eine Maus war im Papierschacht. Sie lebt. Du setzt sie im Hof aus. Gabi findet dich toll." 
			},
			{ 
				t: "Ignorieren",
				rep: { "Gabi": -5 }, 
				m: 5, f: 5, a: 5, c: 5, 
				r: "Das Quieken hört irgendwann auf. Der Ausdruck ist rot verschmiert. Du willst es nicht wissen." 
			}
		]
	},
    {
        id: "call_scam_microsoft",
        title: "Microsoft Support (Indien)",
        startNode: "root",
        nodes: {
            root: {
                text: "'Hello Sir. This is Windows Support. Your computer has virus. Please install TeamViewer.'\n\nKlassischer Scam.",
                opts: [
                    { t: "Mitspielen & Zeit verschwenden", next: "troll" },
                    { t: "Den Anrufer anbrüllen", next: "rage" }
                ]
            },
            troll: {
                text: "Du tust so, als hättest du keinen PC, sondern eine Mikrowelle. Du hältst ihn 20 Minuten hin.",
                opts: [
                    { t: "Er legt wütend auf.", next: "res_fun" }
                ]
            }
        },
        results: {
            res_fun: { txt: "Zwanzig Minuten lang hast du versucht, eine Fernwartung auf einer Mikrowelle zu installieren. Am Ende schreit er, du seist der dümmste Mensch der Welt, und legt auf. Selten hat dich eine Beleidigung so glücklich gemacht.", m: 20, f: 10, a: -10, c: 0 },
            rage: { txt: "Du brüllst drei Stockwerke Frust in den Hörer. Der Scammer legt gelangweilt auf - für ihn bist du Anruf 400 heute. Deine Kollegen hingegen rücken ihre Kopfhörer zurecht und tun sehr beschäftigt.", m: 5, f: 0, a: 5, c: 5 }
        }
    },
        {
        id: "call_waiting_hell",
        title: "Die Warteschleife",
        text: "Du hängst beim Internet-Provider in der Warteschleife. 'Ihr Anruf ist uns wichtig...' seit 45 Minuten. Die Musik macht dich aggressiv.",
        opts: [
            { 
                t: "Warten & Wüten", 
                m: 60, f: 15, a: 20, c: 0,
                r: "Nach 60 Minuten Warteschleife legt die Gegenseite auf. Der Abdruck deiner Zähne in der Tischkante wird bleiben. Als Mahnmal." 
            },
            { 
                t: "Hörer anschreien", 
				rep: { "Dr. Wichtig": -2 },
                m: 5, f: 0, a: 10, c: 10,
                r: "Du schreist das Telefon an: 'GEH DRAN, VERDAMMT!' Ausgerechnet jetzt biegt der Chef in den Flur ein, verlangsamt den Schritt und schüttelt den Kopf. Kein Wort. Das Kopfschütteln reicht." 
            },
            { 
                t: "Folie nutzen", 
                req: "bubble_wrap", 
                m: 45, f: 10, a: -20, c: 0,
                r: "Du drückst die Bläschen im Takt der Warteschleifen-Musik. Das macht den Horror erträglich." 
            }
        ]
    },
    {
        id: "call_aluhut_1",
        title: "Herr Aluhut (Einkauf)",
        text: "Flüsterton: 'Herr Müller? Meine Maus blinkt im Morse-Code! Die Geschäftsleitung hört mich ab! Deaktivieren Sie das Mikrofon in der Maus!'",
        opts: [
            { 
                t: "'Das ist nur der Sensor.'",
                m: 15, f: -10, a: 20, c: 0,
                r: "Er diskutiert 15 Minuten lang über 5G-Strahlung. Du verlierst Lebenswillen."
            },
            { 
                t: "'Gegenmaßnahmen eingeleitet.'",
                next: "aluhut_trust",
                m: 5, f: 10, a: -5, c: 5,
                r: "Er atmet auf. 'Endlich ein Verbündeter! Codewort: Eule.'"
            }
        ]
    },
    {
        id: "call_aluhut_2",
        title: "Herr Aluhut (Wieder)",
        reqStory: "aluhut_trust",
        text: "'Hier ist Eule. Der Drucker... er druckt unsichtbare Wasserzeichen. Ich sehe sie im Schwarzlicht. Sie scannen meine Gedanken!'",
        opts: [
            { 
                t: "'Sie spinnen.'",
                m: 5, f: 0, a: 25, c: 0,
                r: "'Sie gehören auch zu DENEN?!' Er brüllt ins Telefon. Dein Ohr klingelt."
            },
            { 
                t: "'Alufolie um den Kopf.'",
                m: 5, f: 20, a: -10, c: 0,
                r: "'Genial! Faradayscher Käfig für den Cortex! Danke, Eule Ende.' Problem kreativ gelöst."
            }
        ]
    },
    {
        id: "call_erna_1",
        title: "Erna (Empfang)",
        text: "'Ach Herr Müller... ich habe das Internet zugemacht. Das Fenster mit dem blauen 'e'. Ich finde den Weg nicht mehr zurück.'",
        opts: [
            { 
                t: "Hingehen und Icon erstellen",
                next: "erna_friend",
                m: 25, f: -15, a: -10, c: -5,
                r: "Du läufst hin. Erna strahlt: 'Sie sind ein Engel! Hier, ein Bonbon.'"
            },
            { 
                t: "Genervt fernsteuern",
                m: 15, f: 0, a: 20, c: 0,
                r: "Sie versteht 'Doppelklick' nicht. 'Ich klicke, aber nichts passiert!' Du beißt in die Tischkante."
            }
        ]
    },
    {
        id: "call_erna_2",
        title: "Erna (Back-Notfall)",
        reqStory: "erna_friend",
        text: "'Notfall! Ich wollte mein Rezept drucken, aber da steht PC LOAD LETTER. Ich habe den Brief in das Fach gelegt, aber er nimmt ihn nicht!'",
        opts: [
            { 
                t: "'Der Drucker hat Diät.'",
                m: 5, f: 15, a: -5, c: 5,
                r: "Sie kichert. 'Der Schelm!' Das Problem ist nicht gelöst, aber du hast Ruhe."
            },
            { 
                t: "Geduldig erklären",
                m: 10, f: -5, a: 0, c: 0,
                r: "'Achsooo!' Sie lacht herzlich. Ihre Lache ist ansteckend."
            }
        ]
    },
    {
        id: "call_time_1",
		char: "Du (Müller)",
        title: "Anruf aus der Vergangenheit",
        text: "Es rauscht. 'Hier ist Müller! Ich warne mich selbst! Installiere NICHT das Update am Dienstag! Hörst du?!'",
        opts: [
            { 
                t: "'Welches Jahr?'",
                next: "time_loop",
                m: 10, f: -5, a: 0, c: 0,
                r: "'2025! Bevor alles brannte! Tu es ni...' *Tuuut*."
            },
            { 
                t: "Mit einem 'Spinner' auflegen",
                m: 2, f: 0, a: 0, c: 0,
                r: "Du legst auf. Vermutlich Kevin mit einem Stimmverzerrer. Trotzdem versiehst du das Dienstag-Update im Kalender mit einem kleinen Fragezeichen. Nur zur Sicherheit."
            }
        ]
    },
    {
        id: "call_time_2",
        title: "Das Update",
        reqStory: "time_loop",
        text: "Dein PC meldet: 'Kritisches Update verfügbar'. Das Telefon klingelt wieder. Stille.",
        opts: [
            { 
                t: "Update abbrechen",
                m: 15, f: 0, a: -5, c: -10,
                r: "Du brichst ab. PC läuft stabil. Das Telefon hört auf zu blinken. Radar sinkt, du hast gute Arbeit geleistet."
            },
            { 
                t: "Update installieren",
                m: 45, f: -20, a: 50, c: 30,
                r: "BLUE SCREEN OF DEATH. Alles stürzt ab! Der Serverraum brennt! Du brauchst 45 Min für Restore."
            }
        ]
    },
    {
        id: "call_recruit_1",
        title: "Unbekannt (London)",
        startNode: "root",
        nodes: {
            root: {
                text: "'Good morning Mr. Muller! This is John from 'Silicon Valley Stars'. Do you have a moment?'\n\nEr spricht extrem schnell Englisch.",
                opts: [
                    { t: "I don't speak English.", next: "no_english" },
                    { t: "Yes! Get me out of here!", next: "yes_job" },
                    { t: "I love my boss Dr. Wichtig.", next: "loyal" }
                ]
            },
            no_english: {
                text: "'Oh, schade. Ich spreche auch Deutsch. Wollen Sie mehr Geld?'",
                opts: [
                    { t: "Geld? Ja.", next: "res_money" }
                ]
            },
            yes_job: {
                text: "'Excellent! Can you hack the Pentagon?'",
                opts: [
                    { t: "Sure, easy.", next: "res_hacker" },
                    { t: "No, I fix printers.", next: "res_printer" }
                ]
            },
            loyal: {
                text: "'Wow. Stockholmsyndrom? Okay, bye.' *Klick*",
                opts: [
                    { t: "Tja.", next: "res_nothing" }
                ]
            }
        },
        results: {
            res_money: { txt: "Er schickt dir ein Angebot. Du nutzt es für die nächste Gehaltsverhandlung.", m: 15, f: 5, a: -5, c: 5 },
            res_hacker: { 
                txt: "'Wow. Confidence. We like that.' Er verspricht, sich zu melden. Du legst auf und fragst dich einen Moment lang, wer solche Gespräche eigentlich noch mithört. Bestimmt niemand.", 
                m: 10, f: 0, a: 10, c: 20,
                next: "fbi_watch" 
            },
            res_printer: { txt: "Die Leitung ist tot, bevor du den Satz beendet hast. Das Silicon Valley sucht Visionäre, keine Leute, die wissen, wo im Kopierer der Papierstau sitzt. Ihre Server möchte man trotzdem nicht sehen.", m: 5, f: -5, a: 5, c: 0 },
            res_nothing: { txt: "'Okay, bye' war das ganze Abschiedsgespräch. Du bleibst, wo du bist: unterbezahlt, aber du weißt hier wenigstens, wo die Kaffeemaschine steht. Loyalität hat ihren Preis, und du zahlst ihn monatlich.", rep: { "Dr. Wichtig": 2 }, m: 5, f: 0, a: -5, c: -5 }
        }
    },
    {
        id: "call_fbi_1",
        reqStory: "fbi_watch",
        title: "Behörde für Sicherheit",
        startNode: "root",
        nodes: {
            root: {
                text: "'Guten Tag. Wir haben Ihren Anruf mit 'John' abgehört. Planen Sie wirklich einen Angriff auf das Pentagon?'\n\nDie Stimme ist kalt und mechanisch.",
                opts: [
                    { t: "Das war ein Witz!", next: "joke" },
                    { t: "Auflegen & SIM-Karte essen", next: "paranoid" }
                ]
            }
        },
        results: {
            joke: { txt: "'Humor. Verstehe. Das sagen alle.' Die Leitung knackt zweimal, dann ist das Gespräch beendet. Ab mittags lädt jede Webseite spürbar langsamer. Das kann Zufall sein. Es fühlt sich nicht wie Zufall an.", m: 20, f: -10, a: 20, c: 0 },
            paranoid: { txt: "Die SIM-Karte schmeckt nach Elektronik und schlechten Entscheidungen. Beweise gibt es keine mehr, dafür ein Knirschen beim Kauen und die Erkenntnis, dass Panik kein guter Berater ist. Das Festnetz funktioniert übrigens noch.", m: 5, f: -20, a: 50, c: 0 }
        }
    },
    {
        id: "call_pizza_wrong",
        title: "Luigi's Pizza",
        startNode: "root",
        nodes: {
            root: {
                text: "'Hallo? Ich stehe unten. 15 Pizzen 'Quattro Stagioni' für die IT? Der Aufzug ist kaputt, können Sie runterkommen?'\n\nDu hast nichts bestellt. Aber es riecht bis hier oben.",
                opts: [
                    { t: "Ehrlich sein: 'Falsch verbunden'", next: "res_honest" },
                    { t: "'Ich komme!' rufen und die Pizza abgreifen", next: "steal_pizza" }
                ]
            },
            steal_pizza: {
                text: "Du eilst nach unten. Der Lieferant ist gestresst. 'Hier, 150 Euro. Wurde schon per PayPal bezahlt.'",
                opts: [
                    { t: "Pizzen nehmen & rennen", next: "res_food_coma" }
                ]
            }
        },
        results: {
            res_honest: { txt: "Der Lieferant flucht und geht wieder. Dein Magen knurrt.", m: 2, f: 0, a: 5, c: 0 },
            res_food_coma: { 
                txt: "Du verteilst die Pizzen im Büro. Du bist der Held. Aber nach 4 Stücken fällst du ins Fresskoma.", 
                m: 45, f: 20, a: -20, c: -10
            }
        }
    },
    {
        id: "call_pw_reset_grind",
        title: "Passwort-Amnesie",
        text: "Frau Jablonski aus dem Einkauf. 'Mein Passwort geht nicht mehr! Gestern ging es noch! Ich habe NICHTS gemacht!'",
        opts: [
            { 
                t: "'Drücken Sie mal die Taste über Shift.'", 
                m: 5, f: -5, a: 5, c: 0,
                r: "'Oh! Das Lämpchen ist ausgegangen! Jetzt geht es!' Sie bedankt sich überschwänglich. Ein kleiner Sieg gegen die Dummheit." 
            },
            { 
                t: "Manuell zurücksetzen & buchstabieren", 
                m: 10, f: -10, a: 10, c: -5,
                r: "Du setzt es auf 'Start123!' zurück und buchstabierst es ihr dreimal. 'Großes S wie Siegfried...' Es ist qualvoll langweilig, aber produktiv." 
            },
            { 
                t: "'Benutzen Sie das Self-Service-Portal.'", 
                m: 2, f: 5, a: -5, c: 5,
                r: "'Aber das ist so kompliziert!' Du legst einfach auf, nachdem du den Link gemailt hast. Ruhe bewahrt, aber faul gewesen." 
            }
        ]
    },
    {
        id: "call_excel_hell",
        title: "Zellen-Terror",
        text: "Wuttke vom Controlling. 'Hören Sie mal, meine SVERWEIS-Formel gibt #NV zurück. Das System ist kaputt! Die Datenbank ist down! Reparieren Sie das!'",
        opts: [
            { 
                t: "'Der Server wird gerade neu gestartet.'", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "'Ach so! Na dann warte ich.' Er legt zufrieden auf. Du hast nichts getan, aber Ruhe erkauft." 
            },
            { 
                t: "'Sie suchen in der falschen Spalte.'", 
                m: 15, f: -15, a: 15, c: -5,
                r: "Du musst ihm Excel erklären. Am Telefon. Es zieht sich wie ein Jahresabschluss. Er versteht es kaum. Du spürst, wie deine Gehirnzellen absterben, aber du hast das Problem gelöst." 
            },
            { 
                t: "'Das ist ein Anwenderfehler.'", 
				rep: { "Dr. Wichtig": -2 },
                m: 2, f: 5, a: 5, c: 10,
                r: "Wuttke schnaubt: 'Dafür werden Sie bezahlt?!' Dann ist die Leitung tot. Der Chef wird sicher bald fragen, warum das Controlling 'technische Probleme' hat." 
            }
        ]
    },
    {
        id: "call_nato_1",
        title: "Das Alphabet des Grauens",
        startNode: "root",
        nodes: {
            "root": {
                text: "Frau Jablonski muss dir ein temporäres Passwort buchstabieren. 'Also, das Passwort ist: A wie... Apfel. C wie... Ceylan? Oder Z? Nein, Moment, C wie Chamäleon!'\n\nDu spürst, wie du langsam aber sicher wertvolle Lebenszeit verlierst.",
                opts: [
                    { t: "Geduldig bleiben: 'Meinen Sie C wie Cäsar?'", next: "nato_c" },
                    { t: "'Lesen Sie einfach das ganze Wort vor.'", next: "nato_word" }
                ]
            },
            "nato_c": {
                text: "Sie schnaubt. 'Cäsar? Das schreibt man doch mit Z! Egal. Nächster Buchstabe: Ypsilon wie... Ypsilon. Und dann Q wie... Quark.'",
                opts: [
                    { t: "Das echte NATO-Alphabet aufsagen", next: "res_nato_teach" },
                    { t: "Die Schmerzen ertragen und zuhören", next: "res_nato_suffer" }
                ]
            },
            "nato_word": {
                text: "'Das ganze Wort? Das ist kein Wort. Das ist: A, C, Y, Q, 7, Sonderzeichen. Aber Moment, das Y könnte auch ein V sein. Meine Handschrift ist furchtbar.'",
                opts: [
                    { t: "Passwort einfach komplett zurücksetzen", req: "admin_pw", next: "res_nato_reset" },
                    { t: "Auflegen und weinen", next: "res_nato_hangup" }
                ]
            }
        },
        results: {
            "res_nato_teach": { txt: "Du erklärst ihr 10 Minuten lang 'Alpha, Bravo, Charlie'. Sie nennt dich am Ende einen 'Klugscheißer'. Aber das Passwort stimmt.", m: 15, f: -5, a: 15, c: -5 },
            "res_nato_suffer": { txt: "Nach ungelogen 20 Minuten hast du das 8-stellige Passwort zusammen. Deine Aggression ist durch die Decke, dein Wille gebrochen.", m: 20, f: -5, a: 30, c: -10 },
            "res_nato_reset": { txt: "Du setzt es genervt per Master-Override auf 'Willkommen123!' zurück. Keine Zeit für diesen Buchstabiersalat.", m: 5, f: 10, a: 5, c: -5 },
            "res_nato_hangup": { txt: "Du legst auf, ohne ein weiteres Wort. Du kannst das heute nicht. Das Ticket bleibt offen und wird später garantiert eskalieren.", m: 2, f: 10, a: 0, c: 15 }
        }
    },
    {
        id: "call_any_key_1",
        title: "Die mysteriöse Taste",
        text: "Ein verzweifelter Anruf aus dem Management. 'Müller! Mein Update hängt! Das System blockiert komplett. Da steht: PRESS ANY KEY TO CONTINUE.\n\nIch habe die STRG-Taste probiert, die ALT-Taste, ich habe sogar F12 gedrückt! WO VERDAMMT NOCHMAL IST DIESE ANY-TASTE?!'",
        opts: [
            { 
                t: "'Drücken Sie einfach die Leertaste.'", 
                m: 5, f: 0, a: 15, c: -5, 
                r: "Du hörst ein lautes Klatschen (er haut mit der flachen Hand auf die Leertaste). 'Oh. Es geht weiter. Warum schreiben die das dann nicht so hin?!' Ein weiteres dummes Ticket bravourös geschlossen." 
            },
            { 
                t: "'Die müssen Sie erst bestellen.'", 
                m: 5, f: 10, a: -10, c: 20, 
                r: "Er schnappt nach Luft. 'Was für ein Saftladen! Bestellen Sie sofort eine Tastatur mit Any-Taste! Priority-Versand!' Du hast gerade 100€ Budget für einen Gag verbrannt. Der Chef wird weinen." 
            },
            { 
                t: "'Ich drücke für Sie Enter.'", 
                m: 5, f: 5, a: 20, c: -10, 
                r: "Du nutzt die Fernwartung, drückst EINMAL die Enter-Taste auf deinem Keyboard und beendest die Sitzung. Du hast einer hochbezahlten Führungskraft das Drücken einer Taste abgenommen. Traurig, aber maximal effizient." 
            }
        ]
    },
    {
        id: "call_physical_window_1",
        title: "Zugluft im System",
        startNode: "root",
        nodes: {
            "root": {
                text: "Frau Schulze ruft an: 'Herr Müller, mein PC ist extrem langsam. Und da poppen ständig diese kleinen Werbebildchen auf!'\n\nDu hast den Fehler per Fernwartung sofort erkannt. Zu viele Browser-Tabs offen.",
                opts: [
                    { t: "'Schließen Sie bitte mal alle Fenster.'", next: "window_closed" },
                    { t: "Wortlos Fernwartung starten", next: "res_remote_fix" }
                ]
            },
            "window_closed": {
                text: "Du hörst, wie sie den Hörer ablegt. Es quietscht und knallt im Hintergrund. Dann nimmt sie den Hörer wieder auf.\n\n'So, erledigt! Aber jetzt wird es hier drinnen furchtbar stickig. Hilft das mit der frischen Luft wirklich gegen Viren?'",
                opts: [
                    { t: "'Ich meinte am COMPUTER!'", next: "res_facepalm" },
                    { t: "'Ja, das hält die Viren draußen.'", next: "res_troll_window" }
                ]
            }
        },
        results: {
            "res_remote_fix": { txt: "Du klickst die 50 offenen Browser-Fenster per Fernwartung zu. PC läuft wieder. Du hast dir eine furchtbar dumme Konversation erspart und das Ticket professionell geschlossen.", m: 5, f: -5, a: 5, c: -5 },
            "res_facepalm": { txt: "Du musst ihr mühsam den Unterschied zwischen Glasfenstern und digitalen Fenstern erklären. Deine Gehirnzellen sterben ab, aber der Support war vorbildlich.", m: 15, f: 0, a: 20, c: -5 },
            "res_troll_window": { txt: "Frau Schulze schwitzt jetzt in ihrem Büro. Der PC ist zwar immer noch langsam, aber sie beschwert sich nicht mehr. Unprofessionell, aber du hast Ruhe.", m: 5, f: 10, a: -5, c: 5 }
        }
    },
    {
        id: "call_markus_ambush_1",
		char: "Markus",
        title: "Überfall auf Lautsprecher",
        text: "Du nimmst ab. Statt einer Begrüßung hörst du Markus' laute, extrem freundliche 'Verkäufer-Stimme', die leicht hallt. Er hat dich auf Freisprechen geschaltet!\n\n'Ah, und hier ist unser Head of IT, Herr Müller! Herr Müller, bitte bestätigen Sie Herrn Tanaka von der Großbank kurz: Unsere neue Datenbank kann Fax-Eingänge per Blockchain in Echtzeit als 3D-Hologramm rendern, absolut korrekt?'\n\nTotenstille im Konferenzraum. Du hörst die Investoren atmen.",
        opts: [
            { 
                t: "'Selbstverständlich! Läuft extrem agil!'", 
                rep: { "Markus": 5, "Dr. Wichtig": 5 },
                m: 5, f: -5, a: 20, c: -10, 
                r: "Markus jubelt: 'Sehen Sie, Herr Tanaka? Deutsche Ingenieurskunst!' Der Deal ist im Sack. Markus und der Chef lieben dich. Dein Problem: Du musst bis morgen früh ein Fax-Hologramm programmieren. Die Kündigung rückt näher." 
            },
            { 
                t: "Die Wahrheit: 'Das ist physikalischer Unsinn.'", 
                rep: { "Markus": -10, "Dr. Wichtig": -10 },
                m: 10, f: 0, a: -10, c: 30, 
                r: "Geraune am anderen Ende. Herr Tanaka räuspert sich. 'Wir... überdenken unser Investment.' Markus brüllt auf. Du hast einen Millionen-Deal gekillt, aber die IT vor einer unmöglichen Aufgabe bewahrt." 
            },
            { 
                t: "'Nur im Premium-Tier. 5 Millionen Extra-Budget.'", 
                rep: { "Markus": 5 },
                m: 5, f: 5, a: 0, c: -5, 
                r: "Markus schluckt schwer. Herr Tanaka lacht: 'Ah, gutes Upselling! Wir bleiben beim Standard-Paket.' Du hast den Deal gerettet und die IT-Abteilung elegant aus der Schusslinie manövriert. Chapeau!" 
            }
        ]
    },
    {
        id: "call_chantal_hostage_1",
		char: "Chantal",
        title: "SOS aus dem Meeting",
        text: "Chantal ruft an. Sie flüstert panisch: 'Müller... rette mich. Ich sitze seit 40 Minuten in einem 1-on-1 mit dem Agilen Coach. Er redet ununterbrochen über sein Seelentier und zündet gerade ein Räucherstäbchen an. Ich sterbe.\n\nLass den Feueralarm losgehen oder ruf mich auf dem Handy an und sag, der Marketing-Server brennt!'",
        opts: [
            { 
                t: "Feueralarm auslösen", 
                req: "hammer",
                rep: { "Chantal": 10, "Dr. Wichtig": -10 },
                m: 30, f: -10, a: 10, c: 30, 
                r: "Du gehst aufs Ganze und drückst den Melder auf dem Flur ein. Die Sirene heult. Das ganze Gebäude wird evakuiert. Chantal ist frei, aber die Feuerwehr berechnet der IT-Abteilung einen Fehlalarm. Völlig überreagiert." 
            },
            { 
                t: "'Dein Seelentier ist ein Faultier. Viel Spaß.'", 
                rep: { "Chantal": -10 },
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du legst grinsend auf. Chantal ist gefangen. Deine Schadenfreude ist grenzenlos, aber erwarte morgen früh auf keinen Fall ein Lächeln von ihr." 
            },
            { 
                t: "Fake-Anruf starten", 
                rep: { "Chantal": 5 },
                m: 10, f: 0, a: 5, c: 0, 
                r: "Du rufst sie auf dem Handy an und brüllst dramatisch: 'Totalausfall! Wir brauchen dich!'. Chantal stürmt mit einem lauten 'Sorry, Notfall!' aus dem Raum. Sie schuldet dir einen massiven Gefallen." 
            }
        ]
    },
    {
        id: "call_boss_laser_1",
		char: "Dr. Wichtig",
        title: "Präsentations-Panik",
        text: "Dr. Wichtig brüllt ins Telefon: 'Müller! Mein Mauszeiger ist weg! Ich bewege das Gerät über den Tisch, aber auf der Leinwand passiert absolut NICHTS! Die Investoren warten!\n\nIch habe schon die Batterien gewechselt und das rote Licht leuchtet, aber der Pfeil auf der Folie ist wie eingefroren!'",
        opts: [
            { 
                t: "'Chef, haben Sie vielleicht den Laserpointer in der Hand?'", 
                rep: { "Dr. Wichtig": 2 },
                m: 5, f: 0, a: 10, c: -10, 
                r: "Zwei Sekunden Stille. Ein leises Klappern, als er das Gerät wechselt. '...das bleibt unter uns, Müller.' Er legt auf. Ein peinliches Ticket extrem diskret gelöst. Das Radar sinkt massiv, aber du hast Kopfschmerzen vor lauter Dummheit." 
            },
            { 
                t: "'Starten Sie den Rechner sofort hart neu!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, f: 0, a: 0, c: 40, 
                r: "FALLE! Er drückt den Power-Knopf. Der PC geht aus – und die ungespeicherte 45-minütige Präsentation gleich mit. Er flucht vor den Investoren über die 'instabile IT'. Du kriegst die volle Breitseite ab!" 
            },
            { 
                t: "'Ich schalte mich auf und bewege die Maus für Sie.'", 
                rep: { "Dr. Wichtig": 5 },
                m: 30, f: -10, a: 35, c: -20, 
                r: "Du musst die nächsten 30 Minuten blind erraten, wann er auf die nächste Folie will. 'MÜLLER, JETZT KLICKEN!' Es ist pure psychologische Folter für dich, aber der Pitch gelingt und der Chef ist zufrieden." 
            }
        ]
    },
    {
        id: "call_elster_budget_trap_1",
		char: "Frau Elster",
        title: "Fristablauf",
        text: "Frau Elster klingt eiskalt: 'Müller, Ihr Antrag für die neuen Server (15.000€) wird abgelehnt. Ihr digitales Zertifikat für die Unterschrift ist heute um 08:00 Uhr abgelaufen.\n\nDas Jahresbudget verfällt in exakt 10 Minuten. Machen Sie einen neuen Antrag über das offizielle Portal.'\n\nDu weißt ganz genau: Das Portal braucht 3 Werktage für die Freigabe. Deine Server sind weg.",
        opts: [
            { 
                t: "Ich genehmige das remote im System selbst.", 
                req: "admin_pw",
                rep: { "Frau Elster": -20 },
                m: 5, f: 5, a: 5, c: 20, 
                r: "Du hackst das Buchhaltungssystem und setzt den Status auf 'Genehmigt'. Die Server werden bestellt. Frau Elster meldet diesen massiven Compliance-Verstoß sofort dem Vorstand." 
            },
            { 
                t: "'Dann eben keine neuen Server.'", 
                rep: { "Frau Elster": 5 },
                m: 5, f: 10, a: 10, c: -5, 
                r: "'Regeln sind Regeln', sagt sie zufrieden. Du lehnst dich zurück. Im nächsten Jahr wird die Firma unter der alten Hardware zusammenbrechen, aber heute hast du keinen Stress mehr." 
            },
            { 
                t: "Ich renne runter und unterschreibe physisch mit Blut!", 
                m: 20, f: -10, a: 25, c: -5, 
                r: "Du sprintest über die Treppen in den 2. Stock, reißt ihr das Papier aus der Hand und unterschreibst händisch. Das Budget ist in der letzten Sekunde gerettet. Deine Lunge brennt." 
            }
        ]
    },
    {
        id: "call_egon_cooling_trap_1",
		char: "Egon",
        title: "Druckabfall",
        text: "Egon brüllt gegen ein lautes Rauschen an: 'Müller! Das Hauptventil der Server-Wasserkühlung im Keller ist gerissen! Ein dicker Strahl schießt quer durch den Raum direkt auf den Starkstrom-Verteilerkasten!\n\nIch muss das Wasser SOFORT abdrehen, sonst brennt die Hütte! Aber wenn ich das tue, fallen in 3 Minuten eure Server wegen Überhitzung aus! Abdrehen oder anlassen?!'",
        opts: [
            { 
                t: "Dreh ab! Das Gebäude und Leben gehen vor Hardware!", 
                rep: { "Egon": 10, "Dr. Wichtig": -20 },
                m: 10, f: 0, a: 15, c: 50, 
                r: "Das Rauschen stoppt. Sofort piepen alle Alarme im Monitoring. Die Server sterben den plötzlichen Hitzetod. Egon lobt deine Prioritäten, aber der Chef verlangt deinen Kopf auf einem Silbertablett wegen des Datenverlusts." 
            },
            { 
                t: "Lass an! Ich muss das System erst händisch runterfahren!", 
                rep: { "Egon": -10 },
                m: 45, f: -20, a: 40, c: -10, 
                r: "Du hetzt in den Serverraum und fährst 40 Maschinen panisch einzeln herunter, während Egon unten Todesangst vor einem Stromschlag aussteht. Du bist nassgeschwitzt und zitterst, aber die Daten sind sicher." 
            },
            { 
                t: "Wickel Panzertape drum! Ich brauche die Kühlung!", 
                req: "tape",
                rep: { "Egon": -15 },
                m: 5, f: 10, a: -5, c: 30, 
                r: "Egon flucht: 'Das hält keine fünf Minuten bei dem Druck!' Es hält genau vier. Dann gibt es einen lauten Knall, Funkenflug und das Gebäude ist komplett stromlos. Totales Desaster." 
            }
        ]
    },
    {
        id: "call_gabi_gossip_1",
		char: "Gabi",
        title: "Diplomatische Krise",
        text: "Gabi flüstert aufgeregt: 'Müller! Eure blöde Firewall blockiert 'Promi-Klatsch24.de'! Ich brauche das JETZT!\n\nDie Frau vom Aufsichtsratsvorsitzenden steht gleich hier. Ich muss wissen, ob ihr Hund gestorben ist oder ob sie sich scheiden lässt! Sonst trete ich beim Smalltalk ins Fettnäpfchen und wir sind beide dran!\n\nSchalt die Seite frei! Nur für 10 Minuten!'",
        opts: [
            { 
                t: "'Sag mir den Namen, ich google es am Handy für dich.'", 
                rep: { "Gabi": 5 },
                m: 15, f: -5, a: 20, c: -5, 
                r: "Du sitzt an deinem Platz und musst für Gabi auf deinem Privathandy Klatsch-Artikel über C-Promis lesen und ihr die Infos diktieren. Deine Würde sinkt auf den Nullpunkt, aber du hast die Krise regelkonform abgewendet." 
            },
            { 
                t: "IT-Richtlinie: 'Klatsch-Seiten bleiben gesperrt, Gabi.'", 
                rep: { "Gabi": -15, "Dr. Wichtig": -10 },
                m: 5, f: 0, a: 5, c: 20, 
                r: "Gabi flucht leise und legt auf. Zehn Minuten später fragt sie die VIP-Gattin nach ihrem Mann. Die lässt sich gerade scheiden und stürmt weinend raus. Der Chef macht DICH für das PR-Desaster verantwortlich." 
            },
            { 
                t: "'Na gut, ich setze dich auf die Whitelist.'", 
                rep: { "Gabi": 15 },
                m: 10, f: 10, a: 0, c: 30, 
                r: "Gabi liest den Artikel und meistert den Smalltalk brillant. Aber du hast die Firewall für ein unsicheres Werbenetzwerk geöffnet. Das IT-Sicherheits-Audit am Nachmittag schlägt Alarm. Du bist fällig." 
            }
        ]
    },
    {
        id: "call_domain_1",
        title: "Hostmaster Support",
        text: "Eine dumpfe Computer-Stimme meldet sich: 'Guten Tag. Die Firmen-Domain globalcorp.de läuft in 10 Minuten ab. Die hinterlegte Kreditkarte der Geschäftsführung ist ungültig. Wollen Sie jetzt 1.500 Euro begleichen, oder sollen wir die Domain für den öffentlichen Verkauf freigeben?'",
        opts: [
            { 
                t: "Die Nummer der Schwarzen Karte eintippen", 
                req: "black_card", 
                next: "path_domain_blackcard",
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du tippst die Ziffern deiner Offshore-Karte ein. *PIEP*. 'Zahlung autorisiert', sagt die Stimme. Die Domain ist sicher und es hat dich keinen Cent gekostet." 
            },
            { 
                t: "Manuell den Provider anrufen & streiten", 
                next: "path_domain_fight",
                m: 45, f: -10, a: 20, c: 0, 
                r: "Du hängst 45 Minuten in der Warteschleife und diskutierst mit drei Managern. Sie gewähren einen Zahlungsaufschub von 24 Stunden. Du bist völlig erschöpft, aber die Domain bleibt." 
            },
            { 
                t: "'Dann ist sie halt weg.'", 
                next: "path_domain_lost",
                m: 2, f: 10, a: 0, c: 20, 
                r: "Du hängst den Hörer ein. Wer braucht schon E-Mails? Sollen sie doch wieder anfangen zu faxen." 
            }
        ]
    },
    {
        id: "call_domain_2a",
        title: "Betrugsabteilung",
        reqStory: "path_domain_blackcard",
        text: "Das Telefon klingelt schrill. 'Guten Tag, hier spricht der Betrugsschutz der Royal Bank of Zamunda. Wir sehen eine Belastung von 1.500 Euro für eine deutsche Domain auf der Karte S.K.H. Prinz Abubakar. Sind Sie autorisiert?'",
        opts: [
            { 
                t: "Panisch auflegen", 
                m: 2, f: 5, a: 10, c: 0, 
                r: "Du legst auf, etwas zu schnell und etwas zu fest. Der Puls braucht eine Weile zurück aufs Bürotempo. Ob die wohl IP-Adressen zurückverfolgen können? Die Domain ist bezahlt, der Rest ist dir egal." 
            },
            { 
                t: "'Das ist eine Geldwäsche-Verschleierung!'", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Für einen Moment nur das Rauschen der Leitung. Dann: 'Ah. Sehr clever. Interpol sucht nach Yachten, nicht nach Server-Domains. Wir genehmigen das.' *Klick*. Du atmest tief durch." 
            }
        ]
    },
    {
        id: "call_domain_2b",
        title: "Der Provider ruft zurück",
        reqStory: "path_domain_fight",
        text: "Eine echte Mitarbeiterin ist am Apparat: 'Wir haben Ihren Zahlungsaufschub geprüft. Das kostet aber 50 Euro Bearbeitungsgebühr. Soll ich das auf die nächste Rechnung schreiben?'",
        opts: [
            { 
                t: "Zustimmen", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Die 50 Euro tun weh, aber die Firma bleibt online. Du hast dir Zeit gekauft." 
            },
            { 
                t: "Ablehnen & Brüllen", 
                m: 5, f: 0, a: 15, c: 10, 
                r: "Du legst dich mit ihr an. Sie storniert den Aufschub. Domain weg. Das war sehr dumm." 
            }
        ]
    },
    {
        id: "call_domain_2c",
        char: "Dr. Wichtig",
        title: "Dr. Wichtig (Aus dem Auto)",
        reqStory: "path_domain_lost",
        text: "Der Chef brüllt über die Freisprechanlage seines Autos: 'MÜLLER! Warum leitet unsere Firmenwebseite plötzlich auf ein thailändisches Online-Casino um?! Und warum kriege ich Mails von @globalcorp-casino.net?! WAS IST DA LOS?!'",
        opts: [
            { 
                t: "'Die Firmenkarte war abgelaufen!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 10, f: 0, a: 10, c: 30, 
                r: "'Sie hätten mich warnen müssen!' brüllt er. Der Rückkauf der Domain von den Domain-Piraten kostet die Firma jetzt 50.000€. Du stehst auf der Abschussliste." 
            },
            { 
                t: "'Chef, das ist Affiliate-Marketing!'", 
                rep: { "Dr. Wichtig": 5 },
                m: 15, f: 10, a: -10, c: -5, 
                r: "'Wie bitte?' - 'Ja, wir haben 400% mehr Klicks und verdienen an jedem Casino-Besucher!' Er überlegt kurz. 'Hm. Das... lassen Sie das vorerst so. Gutes Mitdenken.'" 
            }
        ]
    },
    {
        id: "call_fridge_1",
        title: "Kühlschrank 'Coolio 3000'",
        text: "Ein Anruf von einer internen Nebenstelle. Du gehst ran. Eine blecherne Roboter-Stimme ertönt: 'BEEP. HIER SPRICHT DER KÜHLSCHRANK AUS DER TEEKÜCHE. MILCH-SENSOR MELDET: LEER. BITTE WLAN-PASSWORT EINSPRECHEN FÜR AMAZON-BESTELLUNG.'",
        opts: [
            { 
                t: "'Vergiss es, Blechbüchse.'", 
                next: "path_fridge_angry",
                m: 2, f: 5, a: -5, c: 5, 
                r: "Du lachst ins Telefon und legst auf. 'Ein Kühlschrank, der anruft. Is klar.' Wahrscheinlich wieder ein Scherz vom Azubi." 
            },
            { 
                t: "Das Passwort vom WLAN-Zettel ablesen", 
                rem: "wifi_note", 
                next: "path_fridge_wifi",
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du liest das Passwort von deinem gelben Zettel ab. 'BEEP. ZUGANG GEWÄHRT.' Maschinen sind viel freundlicher als Kollegen." 
            },
            { 
                t: "Persönlich hingehen & Sensoren putzen", 
                next: "path_fridge_clean",
                m: 20, f: -10, a: 10, c: 0, 
                r: "Du putzt mühsam die Sensoren im Kühlschrank. Er war gar nicht leer, es klebte nur Joghurt auf der Linse. Er hört auf anzurufen." 
            }
        ]
    },
    {
        id: "call_fridge_2a",
        char: "Egon",
        title: "Hausmeister Egon",
        reqStory: "path_fridge_wifi",
        text: "'Müller! Beweg deinen Hintern zum Empfang!' Egon flucht lautstark im Hintergrund. 'Hier stehen fünf Paletten H-Milch! Der Spediteur sagt, der Kühlschrank hat bestellt! Auf Express-Rechnung! Wer hat dem Ding Internet gegeben?!'",
        opts: [
            { 
                t: "'Teil das an alle aus!'", 
                rep: { "Egon": -5 },
                m: 10, f: -5, a: -10, c: 10, 
                r: "Du rufst einen 'Milch-Montag' aus. Alle trinken Kakao. Der Chef ist stinksauer wegen der Rechnung, aber das restliche Team freut sich." 
            },
            { 
                t: "'Das muss ein Hacker-Angriff sein!'", 
                m: 5, f: 0, a: 10, c: 15, 
                r: "Du schiebst es auf Cyberkriminelle aus Nordkorea. Das löst eine peinliche Untersuchung durch die Revision aus, aber du bist persönlich fein raus." 
            }
        ]
    },
    {
        id: "call_fridge_2b",
        title: "Der Putzteufel",
        reqStory: "path_fridge_clean",
        text: "Frau Elster ruft an. 'Müller, danke, dass Sie den Kühlschrank geputzt haben. Leider haben Sie dabei mein veganes Soja-Geschnetzeltes weggeworfen. Es war NICHT abgelaufen, das war die Fermentation!'",
        opts: [
            { 
                t: "'Das sah aus wie Schimmel!'", 
                rep: { "Frau Elster": -5 },
                m: 5, f: 0, a: 5, c: 0, 
                r: "'Banause! Das war Edelschimmel!' Sie ist beleidigt und legt auf." 
            },
            { 
                t: "'War auf der roten Liste der Sensoren.'", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Du schiebst es auf die Maschine. Frau Elster seufzt. 'Immer diese Technik.' Sie gibt der KI die Schuld, nicht dir." 
            }
        ]
    },
    {
        id: "call_fridge_2c",
        char: "Dr. Wichtig",
        title: "Der Chef ist hungrig",
        reqStory: "path_fridge_angry",
        text: "'Müller?!' Der Chef klingt weinerlich und wütend zugleich. 'Jemand hat den Kühlschrank auf minus 20 Grad gestellt! Mein Lachs-Carpaccio ist ein massiver Eisblock! Die Maschine sagt: NOTFALL-MODUS WEGEN OFFLINE. Fixen Sie das!'",
        opts: [
            { 
                t: "'Legen Sie es in die Mikrowelle.'", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, f: 5, a: 10, c: 15, 
                r: "Der Chef atmet tief ein. 'Sie wollen, dass ich 50-Euro-Lachs in die MIKROWELLE lege?!' Er legt auf. Das wird er dir nicht verzeihen." 
            },
            { 
                t: "Hingehen & mit Hammer 'resetten'", 
                req: "hammer", 
                rep: { "Dr. Wichtig": 5 },
                m: 10, f: 0, a: -20, c: 10, 
                r: "Du nimmst den Hammer und zertrümmerst das smarte Display. Das Ding piept traurig und taut langsam ab. 'Etwas brachial, Müller, aber effektiv', lobt der Chef." 
            }
        ]
    },
    {
        id: "call_chantal_breakdown_1",
		char: "Chantal",
        title: "Marketing-Notruf",
        text: "Chantal hyperventiliert am Telefon. '*Schnapp* Müller! Ich zerbreche unter diesem Druck! Mein neuer Insta-Post hat nach 10 Minuten erst zwei Likes! Mein Leben ist vorbei! Ich brauche sofort was zur Beruhigung, sonst kündige ich! MÜLLER!'",
        opts: [
            { 
                t: "'Atme in eine Papiertüte!'", 
                next: "path_chantal_ignored",
                rep: { "Chantal": -10 },
                m: 5, f: 0, a: 5, c: 0, 
                r: "'EINE PAPIERTÜTE?! DAS RUINIERT MEIN MAKE-UP!' Sie kreischt auf und knallt den Hörer auf die Gabel." 
            },
            { 
                t: "Ihr die Luftpolsterfolie zum Ploppen bringen", 
                rem: "bubble_wrap", 
                next: "path_chantal_bubbles",
                rep: { "Chantal": 10 },
                m: 10, f: -5, a: -15, c: 0, 
                r: "Du rennst hoch und drückst ihr wortlos die Luftpolsterfolie in die Hand. *Plopp... Plopp...* Sie schließt die Augen. Ihr Atem beruhigt sich. Du bist ein psychologisches Genie." 
            },
            { 
                t: "Geduldig zuhören & beruhigen", 
                next: "path_chantal_listen",
                rep: { "Chantal": 10 },
                m: 45, f: 10, a: 20, c: -5, 
                r: "Du musst dir 45 Minuten lang anhören, wie hart das Leben als Content-Creator ist." 
            }
        ]
    },
    {
        id: "call_chantal_breakdown_2a",
		char: "Chantal",
        title: "Die neue Sucht",
        reqStory: "path_chantal_bubbles",
        text: "Chantal flüstert ins Telefon. Sie klingt zittrig. 'Müller... hast du... hast du noch mehr von diesem Plopp-Zeug? Ich habe die ganze Rolle schon zerdrückt. Ich brauche mehr Plopp. Bitte! Wo hast du das her?'",
        opts: [
            { 
                t: "'Im Serverraum liegen noch Kartons.'", 
                rep: { "Chantal": 10, "Dr. Wichtig": 5 },
                m: 10, f: 10, a: -10, c: -5, 
                r: "Sie verbringt den halben Nachmittag im Serverraum und ploppt. Der Chef hält das für einen 'Stresstest der Hardware' und lobt eure abteilungsübergreifende Synergie." 
            },
            { 
                t: "'Das war teure IT-Spezialfolie. Ist alle.'", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Sie stöhnt enttäuscht auf, akzeptiert es aber. Du hast sie erfolgreich auf kalten Entzug gesetzt." 
            }
        ]
    },
    {
        id: "call_chantal_breakdown_2b",
		char: "Chantal",
        title: "Die Seelsorger-Rechnung",
        reqStory: "path_chantal_listen",
        text: "Chantal ruft wieder an. 'Müller! Du bist so ein guter Zuhörer! Ich hab dich für unseren wöchentlichen 2-Stunden-Call 'Emotional Sync' eingebucht. Erste Session ist jetzt!'",
        opts: [
            { 
                t: "Sich dem Drama widmen - alles besser als Arbeit", 
                m: 120, f: 40, a: 10, c: 20, 
                r: "Zwei Stunden lang hörst du dir Marketing-Dramen an, die Füße auf dem Tisch. Es wäre beinahe erholsam, wüsstest du nicht, dass der Chef dich bereits im ganzen Haus sucht." 
            },
            { 
                t: "'Ich bin IT, kein Therapeut!'", 
                rep: { "Chantal": -10 },
                m: 5, f: 0, a: 10, c: 0, 
                r: "'Du bist genau wie die anderen!', schluchzt sie. Die Freundschaft ist hiermit offiziell wieder beendet." 
            }
        ]
    },
    {
        id: "call_chantal_breakdown_2c",
		char: "Chantal",
        title: "Die Beschwerde",
        reqStory: "path_chantal_ignored",
        text: "Das Telefon klingelt. Es ist Sabine von HR. 'Herr Müller, Frau Chantal sitzt weinend hier. Sie sagt, Sie hätten ihr während einer Panikattacke geraten, in eine Papiertüte zu atmen. Sie fühlt sich nicht ernst genommen.'",
        opts: [
            { 
                t: "'Ich bringe ihr sofort ein Sandwich.'", 
                rem: "sandwich",
                rep: { "Chantal": 10 },
                m: 15, f: -5, a: -5, c: -10, 
                r: "Du kriechst zu Kreuze und opferst dein Pausenbrot. Chantal nimmt es kauend an. 'Okay. Aber das nächste Mal bist du sensibler!' Die HR-Beschwerde wird fallen gelassen." 
            },
            { 
                t: "'Das ist medizinisch korrekt!'", 
                m: 10, f: 0, a: 10, c: 10, 
                r: "HR glaubt dir nicht ganz, aber sie können es nicht beweisen. Die Sache wird zu den Akten gelegt, aber du hast dir keine Freunde gemacht." 
            }
        ]
    },
    {
        id: "call_workout_2b",
        title: "Die Sanitäter",
        reqStory: "path_workout_panic",
        startNode: "root",
        nodes: {
            "root": {
                text: "Sabine von HR ist am Apparat. 'Herr Müller, wegen Ihres 'Fehlalarms' vorhin. Die Sanitäter standen im Büro und haben Chantals Aura-Kristalle umgestoßen. Der Einsatz kostet 500 Euro. Wer zahlt das?'",
                opts: [
                    { t: "Auf Arbeitsschutz pochen!", next: "work_safety" },
                    { t: "'Ich wurde von außen gehackt!'", next: "lie_hack" }
                ]
            },
            "work_safety": {
                text: "Sie seufzt tief. 'Gut. Es sah wohl wirklich wie ein Anfall aus. Wir buchen es als Betriebsunfall ab. Aber bitte rufen Sie nie wieder ungefragt Ärzte.'",
                opts: [
                    { t: "Verstanden.", next: "res_safe" }
                ]
            },
            "lie_hack": {
                text: "Sabine schweigt. 'Sie behaupten, ein russischer Hacker hat von Ihrem Apparat die 112 gewählt? Müller, das wird Konsequenzen haben.'",
                opts: [
                    { t: "Auflegen.", next: "res_fail" }
                ]
            }
        },
        results: {
            "res_safe": { txt: "Du kommst ohne Kosten davon, aber HR hasst dich jetzt noch ein bisschen mehr.", m: 10, f: 0, a: 5, c: 10 },
            "res_fail": { txt: "Das war eine extrem dumme Ausrede, und ihr wisst es beide. Der Chef sagt nichts weiter. Er merkt es sich nur - und zwar an prominenter Stelle.", m: 5, f: 0, a: 10, c: 25 }
        }
    },
    {
        id: "call_dance_2c",
        title: "Die Produktionsfirma",
        reqStory: "path_dance_donut",
        startNode: "root",
        nodes: {
            "root": {
                text: "Eine fremde, sehr wütende Stimme am Telefon. 'Hier spricht die Produktionsfirma des Investor-Streams! Jemand hat vorhin Backwaren auf unsere 8.000 Euro teure Sony-Kamera gedrückt! Die Linse ist voller Zuckerguss!'",
                opts: [
                    { t: "Auflegen.", next: "hangup_cam" },
                    { t: "'Das war ein Fehler im 5G-Netz.'", next: "lie_cam" }
                ]
            },
            "hangup_cam": {
                text: "Du legst einfach auf. Zehn Minuten später erhält der Chef die Rechnung und sucht nach dem Täter.",
                opts: [
                    { t: "Uff.", next: "res_hangup" }
                ]
            },
            "lie_cam": {
                text: "Der Typ am Telefon atmet schwer. 'Ein 5G-Fehler... der Schokostreusel auf der Linse hinterlässt? Wollen Sie mich verarschen?!'",
                opts: [
                    { t: "Ja.", next: "res_lie" }
                ]
            }
        },
        results: {
            "res_hangup": { txt: "Zehn Minuten später liegt die Rechnung über 8.000 Euro beim Chef, Vermerk: 'Verursacher unbekannt'. Der Suchradius ist klein. Du arbeitest ab sofort sehr sichtbar und sehr unauffällig zugleich.", m: 2, f: 0, a: -5, c: 20 },
            "res_lie": { txt: "'5G' war offenbar das falsche Wort. Er legt mit einer Lautstärke auf, die man durch den Hörer hindurch spürt. Immerhin kennt er deinen Namen nicht. Das kann sich ändern.", m: 5, f: 0, a: 5, c: 15 }
        }
    },
    {
        id: "call_awkward_2c",
        title: "HR (Sabine)",
        reqStory: "path_awkward_elster",
        startNode: "root",
        nodes: {
            "root": {
                text: "Sabine von HR ruft an. Sie klingt extrem formell. 'Herr Müller. Wir haben eine... Beschwerde von Frau Elster vorliegen. Es geht um unangemessenes Verhalten am Arbeitsplatz in Bezug auf Auszubildende.'",
                opts: [
                    { t: "'Sein Pulli hing im Lüfter!'", next: "hr_explain" },
                    { t: "Empört sein: 'Das ist Verleumdung!'", next: "hr_deny" }
                ]
            },
            "hr_explain": {
                text: "Sabine schweigt kurz. 'Ein Pulli... im Lüfter. Wissen Sie, wie das klingt? Wir buchen Sie und Kevin vorsorglich für das Seminar 'Professionelle Distanz im Büro'.'",
                opts: [
                    { t: "Seufzen und zustimmen", next: "res_hr_seminar" }
                ]
            },
            "hr_deny": {
                text: "'Frau Elster hat es mit eigenen Augen gesehen, Müller! Ich vermerke: Keine Einsicht. Das geht an Dr. Wichtig.'",
                opts: [
                    { t: "Verdammt.", next: "res_hr_boss" }
                ]
            }
        },
        results: {
            "res_hr_seminar": { txt: "Du hast bald ein sehr unangenehmes 4-Stunden-Seminar vor dir. Das Radar steigt.", m: 15, f: 0, a: 10, c: 20 },
            "res_hr_boss": { txt: "Der Chef wird das nicht lustig finden. Die Gerüchte werden zur Aktennotiz.", m: 5, f: 0, a: 10, c: 30 }
        }
    },
    {
        id: "call_ergonomic_mouse_1",
        title: "Herr Wuttke (Buchhaltung)",
        startNode: "root",
        nodes: {
            "root": {
                text: "Wuttke klingt genervt: 'Herr IT! Diese neue, senkrechte Ergonomie-Maus, die Sie mir hingelegt haben, ist eine komplette Fehlkonstruktion! Sie liegt furchtbar in der Hand, der rote Laser blendet total und der Mauszeiger bewegt sich keinen Millimeter! Und jedes Mal, wenn ich klicke, macht sie unfassbar laut *BIEP*!'",
                opts: [
                    { t: "'Das ist der Barcode-Scanner fürs Lager.'", next: "wuttke_truth" },
                    { t: "'Die kalibriert sich noch. Scannen Sie die Kaffeepackung.'", next: "wuttke_troll" }
                ]
            },
            "wuttke_truth": {
                text: "Erst ist es still in der Leitung, dann raschelt es leise. 'Oh. Das... erklärt die Form. Und das Kabel. Ich lege ihn dann mal wieder in den Karton. Vergessen Sie, dass ich angerufen habe.'",
                opts: [
                    { t: "Seufzen und auflegen.", next: "res_wuttke_solved" }
                ]
            },
            "wuttke_troll": {
                text: "Du hörst ein lautes *BIEP*. Wuttke: 'Ah! Das Lämpchen hat kurz geblinkt! Und jetzt?'",
                opts: [
                    { t: "'Jetzt noch den Locher scannen.'", next: "wuttke_troll_deep" },
                    { t: "'Das war ein Scherz, Wuttke. Das ist ein Scanner.'", next: "res_wuttke_mad" }
                ]
            },
            "wuttke_troll_deep": {
                text: "Wieder ein *BIEP*. Wuttke klingt jetzt begeistert: 'Wahnsinn, diese moderne Technik! Die Maus lernt meine Umgebung kennen! Soll ich den Monitor auch noch...?'",
                opts: [
                    { t: "Lachen verkneifen und auflegen.", next: "res_wuttke_fun" }
                ]
            }
        },
        results: {
            "res_wuttke_solved": { 
                txt: "Ein alltäglicher, geräuschloser Sieg der IT. Du lehnst dich zufrieden zurück und nimmst einen entspannten Schluck Kaffee.", 
                m: 5, f: 5, a: -5, c: 0 
            },
            "res_wuttke_mad": { 
                txt: "Wuttke schnaubt wütend auf: 'Ich lasse mich hier nicht zum Narren halten!' Es scheppert, als der Hörer die Gabel trifft. Eine offizielle Beschwerde ist dir vermutlich sicher, aber der Spaß war es absolut wert.", 
                m: 5, f: 0, a: -5, c: 20 
            },
            "res_wuttke_fun": { 
                txt: "Du hörst im Hintergrund noch ein drittes *BIEP*, bevor du leise auflegst. Wuttke scannt wahrscheinlich gerade sein Locher-Konfetti. Du musst dir eine Lachträne aus dem Gesicht wischen.", 
                m: 10, f: 10, a: -15, c: 5 
            }
        }
    },


/* ============================================================
   CALL WAVE (v4.0.0)
   Two new base calls (Markus live at a customer site as a node
   conversation, the provider hold queue) plus follow-ups for
   nine paths retrofitted into the existing calls call_junior,
   call_boss_tunnel, call_elster_excel and call_phish. 71 per
   cent of the call pool were dead ends - this is where that
   starts to end.
   ============================================================ */

{
    id: "call_markus_demo",
    char: "Markus",
    title: "Markus (Flüstermodus)",
    startNode: "root",
    nodes: {
        root: {
            text: "Markus, geflüstert, im Hintergrund Konferenzraum-Gemurmel: 'Müller. NOTFALL. Ich steh beim Kunden, der Beamer läuft, und das Demo-System sagt PASSWORT ABGELAUFEN. Zwölf Leute gucken mich an. Was drück ich?!'",
            opts: [
                { t: "'Ruhig. Ich setze es remote zurück.'", next: "remote" },
                { t: "'Welches Demo-System denn genau?'", next: "welches" }
            ]
        },
        remote: {
            text: "Du loggst dich ein. Das Demo-System wurde seit acht Monaten nicht angefasst: 47 Updates ausstehend, Zertifikat abgelaufen. 'Markus, kauf mir zwei Minuten.' Man hört ihn laut in den Raum sagen: 'Wir nutzen die Zeit für FRAGEN!'",
            opts: [
                { t: "Nur den Login fixen, Rest ignorieren", next: "res_quickfix" },
                { t: "Die sauberen zwei Minuten investieren", next: "res_repair" }
            ]
        },
        welches: {
            text: "'Na DAS Demo! Das mit den Balken! Den BLAUEN Balken!' Es gibt vier Systeme mit blauen Balken. Im Hintergrund fragt jemand hörbar, ob es noch lange dauert.",
            opts: [
                { t: "Alle vier Demo-Systeme parallel entsperren", next: "res_shotgun" },
                { t: "Ihn geduldig das Fenster beschreiben lassen", next: "res_describe" }
            ]
        }
    },
    results: {
        res_quickfix: {
            txt: "Login läuft, die Demo startet, der Kunde nickt. Das System dahinter ist weiterhin acht Monate alt und ungepatcht - aber das ist ein Problem für einen anderen Tag. Hoffentlich für einen sehr fernen.",
            m: 10, f: 5, a: 5, c: 0,
            next: "path_demo_quick"
        },
        res_repair: {
            txt: "Login neu, kritische Patches drauf, Zertifikat verlängert - in zwei Minuten und vierzig Sekunden. Markus überbrückt mit einer Anekdote über Golf. Die Demo läuft anschließend butterweich. Er wird das nie vergessen. Wirklich nie. Das könnte anstrengend werden.",
            m: 15, f: -5, a: 5, c: 0,
            rep: { "Markus": 5 },
            next: "path_demo_clean"
        },
        res_shotgun: {
            txt: "Vier Systeme, vier Notfall-Entsperrungen, eins davon war das richtige. Die Demo läuft. Die anderen drei stehen jetzt allerdings offen im Netz wie Scheunentore. Irgendein Auto-Alert wird das merken.",
            m: 10, f: 10, a: 5, c: 5,
            next: "path_demo_shotgun"
        },
        res_describe: {
            txt: "'Blau. Mit so nem... Ding oben. Und da steht was mit E.' Nach quälenden Minuten identifizierst du das System anhand des Firmenlogos, das er als 'Kringel' beschreibt. Es klappt am Ende. Knapp. Deine Lebenszeit klappt mit.",
            m: 15, f: 0, a: 10, c: 0
        }
    }
},
{
    id: "call_markus_demo_2a",
    title: "Der Befund",
    reqStory: "path_demo_quick",
    text: "Mail von der IT des Kunden, höflich im Ton, vernichtend im Inhalt: 'Ihre Demo-Umgebung hat bei unserem Standard-Scan 214 Findings ausgelöst. Anbei der Bericht (PDF, 38 Seiten). Wir freuen uns auf Ihre Stellungnahme.'",
    opts: [
        {
            t: "Alles patchen und sauber Stellung nehmen",
            m: 25, f: -10, a: 10, c: -5,
            r: "Du arbeitest die 38 Seiten ab, patchst das System auf Stand und antwortest mit einem Maßnahmenbericht. Die Kunden-IT ist beeindruckt: 'So schnell hat noch kein Anbieter reagiert.' Peinlichkeit, in Kompetenz umgewandelt. Alchemie des Admin-Alltags."
        },
        {
            t: "'Das ist ein reines Vertriebssystem'",
            rep: { "Markus": -5 },
            m: 5, f: 10, a: 0, c: 5,
            r: "Du schiebst die Verantwortung elegant Richtung Vertrieb. Die Kunden-IT antwortet trocken: 'Dann sollte der Vertrieb es nicht in unser Netz stellen.' Markus bekommt die Mail in Kopie und versteht nur, dass du ihn verkauft hast."
        },
        {
            t: "Das Demo-System endgültig abschalten",
            m: 10, f: 0, a: -5, c: 5,
            r: "Du ziehst den Stecker: kein System, keine Findings, keine Stellungnahme. Sauber gelöst - bis der Vertrieb das nächste Mal spontan eine Demo braucht und du erklären darfst, warum es 'die kaputte Kiste' nicht mehr gibt."
        }
    ]
},
{
    id: "call_markus_demo_2b",
    title: "Die Zwei-Minuten-Legende",
    reqStory: "path_demo_clean",
    text: "Markus hat den Deal geholt und erzählt seitdem überall die Geschichte von der 'Live-Rettung in zwei Minuten'. Mit jeder Version wird sie dramatischer. In der aktuellen Fassung hast du dich 'ins System gehackt, während der Kunde schon aufstehen wollte'.",
    opts: [
        {
            t: "Pedantisch korrigieren: 'Es waren 2:40'",
            rep: { "Markus": -3 },
            m: 5, f: 0, a: 5, c: 0,
            r: "'ZWEI MINUTEN klingt besser, Müller!' Markus ist ehrlich gekränkt - du hast an seiner Geschichte herumgeschraubt, und Geschichten sind sein Betriebskapital. Die Legende erzählt er weiter. Nur kommst du darin jetzt etwas weniger heldenhaft vor."
        },
        {
            t: "Den Ruhm einfach mitnehmen",
            rep: { "Markus": 5 },
            m: 5, f: 5, a: -5, c: 0,
            r: "Du lässt sie in dem Glauben. Im Vertrieb bist du jetzt 'der Hacker', und Markus schuldet dir offiziell 'ein Bier pro Version der Geschichte'. Bei aktuellem Erzähltempo entspricht das einem Kasten pro Quartal."
        },
        {
            t: "Alle Demo-Systeme in die Wartung aufnehmen",
            m: 20, f: -10, a: 5, c: -5,
            r: "Du nutzt den Rückenwind und setzt durch, was seit Jahren fehlt: Demo-Systeme mit Update-Plan, Passwort-Rotation, Verantwortlichem. Es ist unspektakuläre Arbeit, die verhindert, dass es je wieder eine Zwei-Minuten-Legende braucht. Die beste Sorte Arbeit."
        }
    ]
},
{
    id: "call_markus_demo_2c",
    title: "Vier offene Türen",
    reqStory: "path_demo_shotgun",
    text: "Der Auto-Alert der Sicherheitssoftware schlägt an: 'Vier Systeme mit Notfall-Zugang ohne Ablaufdatum erkannt.' Die drei überflüssig entsperrten Demo-Maschinen stehen seit Stunden offen im Netz. Der Alert ging auch an einen Verteiler. Du weißt nicht, wer in dem Verteiler ist.",
    opts: [
        {
            t: "Kevin eine Demo-Inventur machen lassen",
            rep: { "Kevin": 3 },
            m: 10, f: 5, a: 0, c: 0,
            r: "Kevin zieht mit Klemmbrett los und erfasst jede Demo-Maschine im Haus. Er findet sieben. Es sollten vier sein. Zwei der drei zusätzlichen laufen unter Schreibtischen von Leuten, die 'nur mal was testen wollten'. Die Inventur war überfällig."
        },
        {
            t: "Sofort alles dichtmachen und dokumentieren",
            m: 15, f: -5, a: 5, c: -5,
            r: "Zugänge geschlossen, Ablaufdaten gesetzt, Vorfall sauber dokumentiert, bevor jemand fragt. Als die Nachfrage aus dem Verteiler kommt, existiert bereits ein Bericht mit Zeitstempel. Wer schneller dokumentiert, als andere eskalieren, gewinnt."
        },
        {
            t: "Die Systeme zu 'Honeypots' erklären",
            m: 5, f: 10, a: 0, c: 5,
            r: "'Das sind absichtlich exponierte Fallen zur Angreifer-Analyse.' Die Antwort klingt so professionell, dass niemand nachhakt. Du hast jetzt allerdings offiziell ein Honeypot-Programm. Irgendwer wird irgendwann Ergebnisse sehen wollen."
        }
    ]
},

{
    id: "call_hotline_queue",
    title: "Anrufer Nummer 38",
    text: "Die Internetleitung flackert seit dem Morgen, und die Diagnose ist eindeutig: Das Problem liegt draußen, beim Provider. Es gibt nur einen Weg. Du wählst die Business-Hotline. 'Herzlich willkommen. Alle unsere Mitarbeitenden sind derzeit im Gespräch. Sie sind Anrufer Nummer... ACHTUNDDREISSIG.'",
    opts: [
        {
            t: "Durchhalten. Koste es, was es wolle.",
            next: "path_queue_warten",
            m: 30, f: -5, a: 15, c: 0,
            r: "Dreißig Minuten Panflöten-Version von 'Africa', unterbrochen von der Versicherung, dein Anruf sei wichtig. Dann, endlich: 'Störungsstelle, Denis?' Und Denis ist - du traust deinen Ohren kaum - kompetent."
        },
        {
            t: "Den Rückruf-Service aktivieren",
            next: "path_queue_callback",
            m: 5, f: 10, a: 0, c: 5,
            r: "'Wir rufen Sie zurück, sobald ein Mitarbeitender frei ist. Ihre Wartezeit bleibt erhalten.' Du legst auf und fühlst dich modern. Der Rückruf wird kommen. Rückrufe kommen immer. Immer im dümmsten Moment."
        },
        {
            t: "Die Störung einfach aussitzen",
            next: "path_queue_aussitzen",
            m: 2, f: 10, a: 5, c: 5,
            r: "Flackernde Leitungen beruhigen sich manchmal von selbst, sagst du dir. Die ersten Tickets über 'langsames Internet' trudeln bereits ein. Du markierst sie als 'in Beobachtung'. Beobachten kannst du gut."
        }
    ]
},
{
    id: "call_hotline_queue_2a",
    title: "Denis",
    reqStory: "path_queue_warten",
    text: "Denis findet den Fehler in vier Minuten ('Port hängt, ich resette... läuft's?'), erklärt die Ursache verständlich und sagt dann, halblaut, das Unfassbare: 'Ich geb Ihnen mal meine Durchwahl. Für Business-Störungen. Aber sagen Sie NIEMANDEM, dass Sie die haben.'",
    opts: [
        {
            t: "Ein Lob-Fax an Denis' Firma senden",
            m: 10, f: 5, a: -5, c: 0,
            r: "Du schreibst eine förmliche Belobigung. Drei Wochen später hat Denis eine Beförderung - zum Teamleiter, weg von der Hotline. Seine Durchwahl führt jetzt auf eine Mailbox. Du hast das einzig Gute an diesem Provider wegbefördert. Mit einem Fax."
        },
        {
            t: "Skeptisch bleiben, Ticketnummer verlangen",
            m: 5, f: 5, a: 0, c: 0,
            r: "Vertrauen ist gut, Ticketnummern sind besser. Denis diktiert sie dir mit hörbarem Bedauern - du hast gerade das Du-Angebot der Provider-Welt ausgeschlagen. Die Nummer wird funktionieren. Die Durchwahl hätte Wunder gewirkt."
        },
        {
            t: "Die Durchwahl notieren und hüten",
            m: 5, f: 0, a: -10, c: 0,
            r: "Du schreibst die Nummer auf einen Zettel, laminierst ihn gedanklich und legst ihn an einen Ort, den nicht mal Kevin findet. Eine direkte Durchwahl zur Störungsstelle. Es gibt Admins, die dafür töten würden. Du kennst welche."
        }
    ]
},
{
    id: "call_hotline_queue_2b",
    title: "Der Rückruf",
    reqStory: "path_queue_callback",
    text: "Es ist so weit: Dein Handy klingelt - exakt in dem Moment, in dem Dr. Wichtig neben deinem Schreibtisch steht und dir 'nur kurz etwas Strategisches' erklären will. Das Display zeigt die Provider-Nummer. Wartezeit-Rang: gerettet. Timing: katastrophal.",
    opts: [
        {
            t: "Wegdrücken, der Chef geht vor",
            m: 10, f: 10, a: 10, c: -5,
            r: "Du drückst den Rückruf weg und lauschst fünfzehn strategischen Minuten über 'Synergien im Digitalraum'. Danach rufst du die Hotline erneut an: 'Sie sind Anrufer Nummer... EINUNDVIERZIG.' Die Warteschleife kennt keine Gnade und kein Gestern."
        },
        {
            t: "Den Chef einbeziehen: 'Live-Eskalation!'",
            rep: { "Dr. Wichtig": 3 },
            m: 10, f: 5, a: 0, c: -5,
            r: "'Sehen Sie, Herr Doktor - ich eskaliere die Störung gerade PERSÖNLICH beim Anbieter.' Du stellst auf laut. Dr. Wichtig beobachtet fasziniert, wie du einen Techniker dirigierst, und flüstert: 'DAS ist Hands-on-Mentalität.' Die Leitung läuft, der Eindruck sitzt."
        },
        {
            t: "Rangehen, den Chef warten lassen",
            m: 15, f: -5, a: 5, c: 10,
            r: "'Entschuldigung, Störungsstelle, das MUSS ich nehmen.' Dr. Wichtig wartet mit der Miene eines Mannes, der noch nie gewartet hat. Aber die Leitung wird im Gespräch repariert. Du hast Internet gegen Chef-Wohlwollen getauscht. Vermutlich ein fairer Kurs."
        }
    ]
},
{
    id: "call_hotline_queue_2c",
    title: "14 Uhr",
    reqStory: "path_queue_aussitzen",
    text: "Um Punkt 14 Uhr hört das Flackern auf. Nicht, weil es besser wird - die Leitung ist jetzt komplett tot. Die halbe Firma ist offline, im Treppenhaus brüllt Markus, dass er 'MITTEN im Abschluss' war, und die Ticketflut hat einen eigenen Rhythmus entwickelt.",
    opts: [
        {
            t: "Einen LTE-Notfall-Hotspot aufbauen",
            m: 15, f: -5, a: 5, c: -5,
            r: "Firmenhandy, Datenvolumen, ein strategisch platzierter Router: Die wichtigsten zehn Arbeitsplätze sind wieder online, priorisiert nach Lautstärke der Beschwerde. Es ist Behelf, es ist langsam, aber es ist DEIN Behelf. Improvisation ist auch Infrastruktur."
        },
        {
            t: "Eine Rundmail über 'geplante Wartung' schreiben",
            m: 5, f: 10, a: 0, c: 10,
            r: "Aus einer verschleppten Störung wird per Rundmail eine 'angekündigte Wartung'. Die Beschwerden verstummen - gegen Geplantes beschwert man sich nicht. Nur Frau Elster antwortet: 'Angekündigt? Wo?' Sie archiviert Ankündigungen. Alle."
        },
        {
            t: "Jetzt doch die Hotline - bei Vollausfall",
            m: 30, f: 0, a: 15, c: 5,
            r: "'Sie sind Anrufer Nummer... DREIUNDSECHZIG.' Der Vollausfall hat offenbar jeden Business-Kunden der Region an die Hotline getrieben. Als du endlich durchkommst, ist die Störung 'bekannt und in Bearbeitung'. Das hättest du vor einer Stunde auch haben können. Für weniger."
        }
    ]
},

{
    id: "call_junior_2a",
    title: "Die Bot-Flut",
    reqStory: "path_junior_ports",
    text: "Das Firmennetz hat die Nacht nicht gut überstanden: Die offenen Ports haben Besuch aus aller Welt angezogen. Und während du noch aufräumst, ruft Junior wieder an: 'Ey! Mein Server LAGGT voll! Mach mal schneller das Internet!'",
    opts: [
        {
            t: "Ihm einen sauber isolierten Privat-Port bauen",
            rep: { "Dr. Wichtig": 5 },
            m: 15, f: 5, a: 5, c: 0,
            r: "Du baust Junior eine abgeschottete Lösung: ein Port, ein Server, null Kontakt zum Firmennetz. Er ist zufrieden, sein Vater hört davon ('Mein Sohn sagt, Sie sind der Einzige hier, der was kann') - und du fragst dich beiläufig, wo Juniors Server eigentlich physisch steht. Er kommt dir bekannt vor."
        },
        {
            t: "Das Problem an Kevin 'delegieren'",
            rep: { "Kevin": -5 },
            m: 5, f: 10, a: 0, c: 5,
            r: "'Kevin, kümmer dich mal um den Sohn vom Chef.' Zwei Stunden später haben Kevin und Junior gemeinsam einen zweiten Server aufgesetzt und streiten über Mods. Du hast das Problem nicht gelöst. Du hast es verdoppelt und ihm einen Freund gegeben."
        },
        {
            t: "Ports dicht, Netz säubern, Wahrheit ertragen",
            m: 25, f: -10, a: 10, c: -5,
            r: "Du schließt alles, wirfst die Bots raus und härtest die Firewall. Juniors Server ist damit auch offline, und sein Wutschrei durchs Telefon erreicht Frequenzen, die nur Hunde vollständig würdigen können. Aber das Netz ist wieder sauber."
        }
    ]
},
{
    id: "call_junior_2b",
    title: "Das Vier-Augen-Gespräch",
    reqStory: "path_junior_eskal",
    text: "Dr. Wichtig bittet dich ins Büro und schließt die Tür. 'Mein Sohn behauptet, Sie hätten ihn geschlagen. Durch das Telefon.' Pause. 'Ich bin Vater, Müller, aber ich bin nicht verrückt. Was ist wirklich passiert?'",
    opts: [
        {
            t: "'Ihr Sohn erpresst Mitarbeiter.'",
            rep: { "Dr. Wichtig": -5 },
            m: 5, f: 0, a: -5, c: 10,
            r: "Das Wort 'erpresst' hängt schwer im Raum. Dr. Wichtig wird sehr still. 'Das ist eine ernste Anschuldigung gegen ein Kind, Müller.' Es ist auch eine wahre. Aber Wahrheit über den Erben trägt in diesem Büro keine Früchte. Du fühlst dich trotzdem großartig."
        },
        {
            t: "Die ungeschminkte Wahrheit erzählen",
            rep: { "Dr. Wichtig": 5 },
            m: 10, f: 0, a: 5, c: -5,
            r: "Du schilderst das Gespräch wortgetreu, inklusive Erpressungsversuch. Dr. Wichtig hört zu, nickt langsam und sagt dann etwas Erstaunliches: 'Der Junge braucht Grenzen. Nicht unbedingt von Ihnen. Aber Grenzen.' Ihr versteht euch kurz. Es ist irritierend."
        },
        {
            t: "Sich winden und pauschal entschuldigen",
            rep: { "Dr. Wichtig": -5 },
            m: 5, f: 5, a: 5, c: 10,
            r: "Du entschuldigst dich für etwas, das du nicht getan hast. Dr. Wichtig registriert das mit dem Blick eines Mannes, der beruflich Schwäche wittert. 'Interessant. Mein Sohn übertreibt also NICHT.' Du hast gerade ein Schuldeingeständnis für ein Fantasiedelikt abgegeben."
        }
    ]
},
{
    id: "call_junior_2c",
    title: "Negative Polarität",
    reqStory: "path_junior_matrix",
    text: "Dr. Wichtig fängt dich im Flur ab. 'Mein Sohn erzählt, unsere Firewall hätte eine NEGATIVE POLARITÄT. Warum erfahre ich sowas von einem Zwölfjährigen? Wie ernst ist es? Was kostet die Behebung?' Dein eigener Bluff steht vor dir und trägt einen Maßanzug.",
    opts: [
        {
            t: "Den Trick gegen Junior auflösen",
            rep: { "Dr. Wichtig": 3 },
            m: 5, f: 0, a: 5, c: 0,
            r: "Du gestehst den Bluff. Dr. Wichtig schaut dich lange an - dann zuckt sein Mundwinkel. 'Sie haben meinen Sohn... verwaltet.' Er geht kopfschüttelnd, aber der Mundwinkel war da. Du hast ihn gesehen. Zeugen gibt es keine."
        },
        {
            t: "'Bereits behoben. Keine Kosten entstanden.'",
            m: 5, f: 10, a: 0, c: 5,
            r: "Die Antwort, die Chefs am liebsten hören: erledigt und gratis. Dr. Wichtig nickt zufrieden. Allerdings gilt die Polarität damit als reales, gelöstes Problem - und wird in seiner nächsten Vorstandspräsentation als Beispiel für 'proaktive IT-Exzellenz' auftauchen. Mit deinem Namen."
        },
        {
            t: "Ein 'Projekt Polaritätsumkehr' aufsetzen",
            rep: { "Dr. Wichtig": 3 },
            m: 15, f: 10, a: 0, c: -5,
            r: "Du skizzierst mit ernster Miene einen Dreiphasenplan. Dr. Wichtig genehmigt Budget für Dinge, die du ohnehin kaufen wolltest: neue Switches, USV-Batterie, ordentliche Kabel. Die Polarität wird quartalsweise 'rekalibriert'. Es ist das ehrlichste unehrliche Projekt der Firmengeschichte."
        }
    ]
},

{
    id: "call_boss_tunnel_2a",
    title: "Die Streichung",
    reqStory: "path_tunnel_ja",
    text: "Die Rundmail kommt zwei Stunden später: 'Auf Empfehlung der IT-Abteilung wird das IT-Budget zum Monatsende optimiert (-40%).' Auf Empfehlung. Der IT. Du hast im Tunnel 'Jawohl' zu deiner eigenen Kürzung gesagt.",
    opts: [
        {
            t: "Termin beim Chef: das Missverständnis aufklären",
            rep: { "Dr. Wichtig": -3 },
            m: 15, f: 0, a: 10, c: 5,
            r: "'Sie haben aber JAWOHL gesagt, Müller. Ich habe Zeugen. Den Tunnel.' Dr. Wichtig nimmt Rückzieher persönlich. Am Ende handelst du die Kürzung auf zwanzig Prozent herunter - offiziell 'nach konstruktivem Dialog'. Es fühlt sich an wie ein Sieg. Es ist keiner."
        },
        {
            t: "Stoisch mit dem Nichts arbeiten",
            m: 10, f: 5, a: 10, c: -5,
            r: "Kein neues Budget heißt: Egons Keller wird zur Beschaffungsabteilung, Kabel werden geflickt statt getauscht, und jede Anschaffung heißt jetzt 'Reparatur'. Es ist würdelos und funktioniert erschreckend gut. Das ist das Deprimierendste daran."
        },
        {
            t: "Frau Elster nach Formfehlern suchen lassen",
            rep: { "Frau Elster": 5 },
            m: 15, f: 0, a: 5, c: 0,
            r: "Frau Elster liest die Streichungs-Mail zweimal und lächelt dünn: 'Budgetänderungen bedürfen der Schriftform nach Anlage 7. Eine Tunneldurchsage ist keine Schriftform.' Der Vorgang wird 'zur formalen Prüfung' eingefroren. Bürokratie, endlich einmal auf deiner Seite."
        }
    ]
},
{
    id: "call_boss_tunnel_2b",
    title: "Der nächste Tunnel",
    reqStory: "path_tunnel_klick",
    text: "Er ruft wieder an. Es rauscht wieder - der Mann findet Tunnel wie andere Leute Parkplätze. 'Müller! Endlich! Also, WIE BESPROCHEN: Sie kümmern sich um *KRRRK* ... bis Freitag! Sind wir *KCHHH* ...einig?!' Es wurde nie etwas besprochen. Es gibt kein Besprochen.",
    opts: [
        {
            t: "Raten und beherzt zustimmen",
            m: 5, f: 5, a: 15, c: 5,
            r: "'Jawohl, bis Freitag!' Du hast keine Ahnung, wozu. Bis Freitag wirst du präventiv alles erledigen, was er gemeint haben könnte: Berichte, Backups, den wackelnden Beamer im Vorstandsraum. Eine Woche Arbeit gegen einen Satz Rauschen. Der Tunnel gewinnt immer."
        },
        {
            t: "'Schlechte Leitung - ich fasse per Mail zusammen'",
            m: 10, f: -5, a: 5, c: -5,
            r: "Der älteste Trick der Verwaltung: Verschriftlichung. Deine Mail ('Um sicherzugehen, dass ich Sie richtig verstanden habe...') zwingt ihn, den Auftrag selbst zu formulieren. Seine Antwort: 'Passt so.' Auf eine Mail mit drei Deutungsoffenheiten. Aber du hast es schriftlich."
        },
        {
            t: "Nochmal auflegen - der Tunnel war's",
            m: 2, f: 10, a: 0, c: 10,
            r: "Zweimal Funkloch am selben Tag strapaziert die Glaubwürdigkeit der Physik. Beim dritten Anruf ist der Tunnel zu Ende und die Stimme sehr klar: 'Müller. Ihr Telefon. Reparieren. SOFORT.' Dein Telefon ist in Ordnung. Das ist jetzt das Problem."
        }
    ]
},

{
    id: "call_elster_excel_2a",
    title: "Ticket #4711",
    reqStory: "path_excel_ticket",
    text: "Frau Elster hat geliefert: Ticket #4711, formvollendet. Vierzehn Anhänge, ein Fehlerprotokoll in Tabellenform, Zeugenliste, Eskalationsstufe 'hoch'. Im CC: Dr. Wichtig. Der letzte Satz: 'Um zeitnahe Bearbeitung gemäß Servicevereinbarung wird gebeten.' Es gibt keine Servicevereinbarung. Jetzt vielleicht schon.",
    opts: [
        {
            t: "Kevin als Ersthelfer hinschicken",
            rep: { "Kevin": 3 },
            m: 5, f: 5, a: 0, c: 0,
            r: "Kevin zieht mit dem Werkzeugkoffer los und kommt nach einer Stunde verändert zurück: ordentlich gekämmt, mit einem Stück Kuchen in Folie. 'Frau Elster ist voll nett?! Wir haben alles neu gestartet und über ihren Kater geredet.' Das Ticket ist zu. Kevin hat jetzt eine Verbündete."
        },
        {
            t: "Das Ticket mustergültig abarbeiten",
            rep: { "Frau Elster": 3 },
            m: 20, f: -5, a: 10, c: -5,
            r: "Du beantwortest jeden Anhang, dokumentierst die Lösung und schließt formvollendet. Frau Elster antwortet mit einem Satz: 'So geht es also doch.' Es ist Tadel und Anerkennung in fünf Wörtern. Mehr Nähe lässt das Ticketsystem nicht zu."
        },
        {
            t: "Das Ticket schließen: 'Nicht reproduzierbar'",
            rep: { "Frau Elster": -5 },
            m: 5, f: 10, a: 0, c: 10,
            r: "Der Klassiker der Ticketbestattung. Nur: Frau Elster reproduziert. Sie eröffnet #4712 mit Verweis auf #4711, Bildschirmfotos im Minutentakt und der neuen Eskalationsstufe 'kritisch'. Dr. Wichtig, weiterhin im CC, hat inzwischen eine Lesebestätigung gesendet."
        }
    ]
},
{
    id: "call_elster_excel_2b",
    title: "Der Dankeskuchen",
    reqStory: "path_excel_retterin",
    text: "Frau Elster steht im Serverraum - mit einer Kuchenplatte. 'Marmorkuchen. Selbstgebacken. Sie haben meine Bilanzen gerettet, Herr Müller.' Sie stellt die Platte ab und bleibt dann einfach stehen, als hätte sie noch etwas zu sagen und wüsste nicht, wie.",
    opts: [
        {
            t: "Kuchen und Zeit annehmen",
            rep: { "Frau Elster": 5 },
            m: 15, f: 10, a: -10, c: 0,
            r: "Ihr esst Marmorkuchen zwischen den Racks, und Frau Elster erzählt: von Rüdiger, vom früheren Chef, davon, dass sie seit elf Jahren die Einzige ist, die die Bilanzen versteht. 'Sie sind der Erste aus der IT, der nicht seufzt, wenn ich anrufe.' Du seufzt innerlich. Aber nie wieder hörbar."
        },
        {
            t: "Höflich abkürzen: viel zu tun",
            rep: { "Frau Elster": -3 },
            m: 5, f: 0, a: 5, c: 0,
            r: "'Vielen Dank, Frau Elster, ich muss leider...' Sie nickt sofort, zu schnell, nimmt die Platte und lässt dir ein einzelnes Stück auf einem Zettel da. Der Zettel ist eine Serviette mit aufgedrucktem Kater. Der Kuchen schmeckt hervorragend. Das macht es nicht besser."
        },
        {
            t: "Nach einem Foto von Rüdiger fragen",
            rep: { "Frau Elster": 5 },
            m: 10, f: 5, a: -5, c: 0,
            r: "Ihr Gesicht leuchtet auf wie ein frisch gepatchter Server. Es folgen: 34 Fotos, zwei Videos ('Da war er noch klein!') und die Information, dass Rüdiger Diabetiker ist, aber tapfer. Zehn Minuten deines Lebens, ein Verbündeter fürs Leben. In der Buchhaltung."
        }
    ]
},

{
    id: "call_phish_2a",
    title: "Der Rückruf der Rache",
    reqStory: "path_phish_troll",
    text: "Sie haben nicht vergessen. 'Herr Müller' - sie kennen jetzt deinen Namen - 'Ihr Computer hat JETZT WIRKLICH Virus. Sehr schlimm.' Seit dem Vormittag klingeln reihum die Durchwahlen der Firma. Die Anruferin klingt persönlich gekränkt. 45 Minuten Any-Key-Taste hinterlassen Spuren.",
    opts: [
        {
            t: "Firmenweite Warnung plus Nummernsperre",
            m: 15, f: -5, a: 5, c: -5,
            r: "Rundmail mit Beispielsätzen der Masche, Sperrliste in der Telefonanlage, kurze Ansage an die üblichen Verdächtigen ('Chantal: NIEMANDEM Fernzugriff geben. Niemandem.'). Die Anrufwelle läuft ins Leere. Unspektakulär, wirksam, erwachsen. Fast schade."
        },
        {
            t: "Gabi briefen und übernehmen lassen",
            rep: { "Gabi": 5 },
            m: 10, f: 5, a: -10, c: 0,
            r: "Gabi hört sich die Masche an und lächelt das Lächeln einer Frau, die dreißig Jahre Empfang hinter sich hat. Ab sofort landen alle 'Microsoft'-Anrufe bei ihr. Ihr Rekord am Ende der Woche: 73 Minuten, inklusive erfundener Modemgeräusche mit dem Mund. Die Anrufe hören danach für immer auf."
        },
        {
            t: "Ignorieren, wird sich schon totlaufen",
            m: 2, f: 10, a: 0, c: 5,
            r: "Wird es vermutlich. Irgendwann. Bis dahin klingeln die Durchwahlen weiter, und irgendwo in diesem Gebäude sitzt garantiert jemand, der 'nur mal kurz helfen lassen' wollte. Du kennst dieses Gebäude. Du kennst diesen Jemand noch nicht. Aber ihr werdet euch treffen."
        }
    ]
},
{
    id: "call_phish_2b",
    title: "Der Schadensfall",
    reqStory: "path_phish_karte",
    text: "Die Firmenkarte ist leergeräumt, die Bank hat den Fall, und in deinem Kalender steht ein Termin, der nur 'Klärung' heißt. Teilnehmer: Dr. Wichtig, Frau Elster, du. Es gibt Meetings, aus denen kommt man kleiner heraus, als man hineingegangen ist.",
    opts: [
        {
            t: "Volle Offenlegung plus Strafanzeige",
            m: 25, f: -5, a: 15, c: -10,
            r: "Du legst alles auf den Tisch: Hergang, Zeitpunkte, eigene Schuld, erstattete Anzeige, eingeleitete Kartensperrung. Es ist das unangenehmste Meeting deines Jahres - und das einzige Vorgehen, das dich am Ende glaubwürdig zurücklässt. Dr. Wichtig sagt nur: 'Wenigstens vertuschen Sie nicht.' Das muss reichen."
        },
        {
            t: "Von einer 'unklaren Abbuchung' sprechen",
            m: 10, f: 10, a: 5, c: 15,
            r: "Du sprichst von 'ungeklärten Buchungsvorgängen' und hoffst auf Nebel. Aber am Tisch sitzt Frau Elster, und Frau Elster hat die Abbuchungen längst minutengenau mit deiner Anrufliste abgeglichen. Sie sagt nichts. Sie legt nur einen Ausdruck auf den Tisch. Der Nebel lichtet sich sehr schnell."
        },
        {
            t: "Frau Elster vorab um Hilfe bitten",
            rep: { "Frau Elster": 5 },
            m: 15, f: 0, a: 5, c: -5,
            r: "Frau Elster hört sich das Desaster an, seufzt einmal tief - und greift zum Hörer. Sie kennt bei der Bank eine Frau Krämer, persönlich, seit 2009. Acht Minuten später ist die Rückbuchung eingeleitet. 'Beim nächsten Mal', sagt sie beim Auflegen, 'rufen Sie ERST mich an.' Jawohl."
        }
    ]
},


/* ============================================================
   TRAPS (v4.0.0): calls where a sense of duty is the most
   expensive reflex.
   ============================================================ */

{
    id: "call_falle_umfrage",
    title: "Die Mitarbeiterbefragung",
    text: "'Guten Tag, hier ist das Institut für Arbeitsklima im Auftrag Ihrer Konzernzentrale. Die Befragung dauert nur drei Minuten und ist selbstverständlich anonym.' Das Wort 'selbstverständlich' trägt dabei eine Betonung, die man nur als Warnung bezeichnen kann.",
    opts: [
        {
            t: "Ehrlich und ausführlich antworten",
            m: 10, f: 0, a: 5, c: 35,
            next: "path_umfrage_ehrlich",
            r: "Du sprichst offen über Budget, Personaldecke und die Kaffeemaschine. Drei Wochen später zitiert Dr. Wichtig in der Abteilungsrunde wörtlich aus 'einer anonymen Rückmeldung aus der IT'. Die IT besteht aus dir. Anonymität ist bei einer Stichprobengröße von eins ein mathematisch anspruchsvolles Konzept."
        },
        {
            t: "Höflich abwimmeln: keine Zeit",
            m: 2, f: 5, a: 5, c: 10,
            r: "Drei Minuten waren dir zu viel - dem Bericht ist das eine eigene Kategorie wert: 'Teilnahmeverweigerung: IT (100%)'. Die Zentrale interpretiert Schweigen erfahrungsgemäß nicht als Zeitmangel, sondern als Zustand. Es wird ein Folgegespräch 'zur Aktivierung' angeboten werden. Verpflichtend."
        },
        {
            t: "Überall Bestnoten vergeben, schnell fertig",
            m: 5, f: 10, a: 10, c: 0,
            r: "Fünf Sterne auf alles, keine Rückfragen, aufgelegt. Der Bericht attestiert der IT daraufhin 'herausragende Zufriedenheit trotz schlanker Ausstattung' - womit amtlich bewiesen ist, dass die schlanke Ausstattung reicht. Dein nächster Budgetantrag wird mit deiner eigenen Bestnote abgelehnt werden."
        }
    ]
},
{
    id: "call_falle_vorstand",
    title: "Verpasster Anruf",
    text: "Das Display zeigt: 1 verpasster Anruf, Vorstandssekretariat, vor sechs Minuten. Keine Nachricht, keine Mail, nur die nackte Nummer. Sechs Minuten. In Vorstandszeit sind das entweder drei Sekunden oder eine Ewigkeit, und du weißt nicht, welches von beidem.",
    opts: [
        {
            t: "Erst Gabi anrufen: Worum geht es?",
            m: 5, f: 5, a: 5, c: 5,
            r: "Gabi weiß es natürlich: 'Beamer für Raum 1, der flackert. Und sag nicht, dass du es von mir hast.' Der Rückruf verläuft dann souverän - aber die fünf Minuten Aufklärungsarbeit über zwei Ecken für einen Beamer sind auch eine Aussage über dieses Haus. Und über dich. Und über Beamer."
        },
        {
            t: "Pflichtbewusst sofort zurückrufen",
            m: 5, f: 0, a: 10, c: 30,
            r: "Du rufst zurück - mitten in die laufende Vorstandssitzung, in der das Sekretariatstelefon auf Lautsprecher liegt, weil gleich eine Konferenzschaltung ansteht. Acht Führungskräfte hören dein 'Ja hallo, hier Müller, Sie hatten versucht...?'. Es ging um einen Beamer. Es klang, als gingest du unter."
        },
        {
            t: "Abwarten, bis die sich wieder melden",
            m: 5, f: 5, a: 10, c: 5,
            r: "Strategische Geduld - nur arbeitet dein Kopf nicht mit: Zwei Stunden lang komponierst du innerlich Szenarien von Kündigung bis Beförderung. Als das Sekretariat zwei Stunden später erneut anruft, geht es um einen Beamer. Der Puls der zwei Stunden steht in keiner Statistik. Er war trotzdem da."
        }
    ]
},

	{
		id: "call_kamera_schwarz",
		title: "Frau Brandt (Vertriebsinnendienst)",
		text: "'Herr Müller, ich bin seit zehn Minuten in der Videokonferenz und alle sehen nur ein schwarzes Bild. Der Kunde ist auch dabei. Können Sie das von da aus reparieren?'\n\nIm Hintergrund sagt jemand sehr deutlich: 'Wir sehen Sie immer noch nicht.'",
		opts: [
			{
				t: "Fragen, ob etwas auf der Linse klebt",
				m: 5, f: 0, a: 0, c: 0,
				r: "Kurze Pause. 'Da ist so ein kleiner Schieber... oh.' Sie hat die Kameraabdeckung zugeschoben, die ihr die IT vor zwei Jahren aus Datenschutzgründen selbst montiert hat. Fünf Minuten, ein Problem, kein Schaden."
			},
			{
				t: "'Videotechnik ist Sache des Herstellers.'",
				m: 2, f: 15, a: -5, c: 15,
				r: "Du schiebst es weiter und legst auf. Zwei Minuten gespart. Frau Brandt schreibt eine Mail an ihren Abteilungsleiter, der sie an deinen weiterleitet, mit dem Wort 'bedauerlich' darin."
			},
			{
				t: "Schritt für Schritt durch die Einstellungen führen",
				m: 15, f: -5, a: 10, c: 0,
				r: "Ihr fehlt jedes Vokabular für das, was sie sieht. 'Das blaue Ding? Nein, das andere blaue Ding.' Nach einer Viertelstunde läuft die Kamera, das Meeting ist vorbei und der Kunde hat aufgelegt."
			},
			{
				t: "Selbst ins Meeting einwählen und übernehmen",
				m: 20, f: -10, a: 5, c: -5,
				next: "path_brandt_screenshare",
				r: "Du wählst dich ein und bittest sie, ihren Bildschirm zu teilen. Sie teilt ihn. Sie teilt den ganzen Bildschirm. Der Kunde sieht jetzt ihre Mails, ihren Kalender und einen Ordner mit dem Namen 'Bewerbung final'.",
				rep: { "Markus": 5 }
			}
		]
	},
	{
		id: "call_brandt_screenshare",
		reqStory: "path_brandt_screenshare",
		title: "Frau Brandt (noch einmal)",
		text: "'Herr Müller, wegen der Videokonferenz. Der Kunde hat den Ordner gesehen. Mein Chef hat den Kunden angerufen. Jetzt weiß mein Chef von dem Ordner.'\n\nSie klingt sehr ruhig. Das ist selten ein gutes Zeichen.",
		opts: [
			{
				t: "'Ich habe nichts gesehen.'",
				m: 5, f: 0, a: 0, c: 0,
				rep: { "Markus": 5 },
				r: "Mehr sagst du nicht. Sie bedankt sich und legt auf. Zwei Wochen später steht ein Schokoriegel auf deiner Tastatur, ohne Zettel."
			},
			{
				t: "Nachfragen, was in dem Ordner war",
				m: 10, f: 5, a: 10, c: 5,
				r: "Sie legt kommentarlos auf. Der Ordner heißt weiterhin 'Bewerbung final', und wohin sie sich beworben hat, bleibt ihr Geheimnis. Vermutlich irgendwohin, wo es funktionierende Kameras gibt."
			},
			{
				t: "Anbieten, die Freigabe technisch zu erklären",
				m: 10, f: -5, a: 5, c: -5,
				r: "Du schreibst ihrem Chef, dass beim Teilen des gesamten Bildschirms sämtliche geöffneten Fenster übertragen werden und das ein bekanntes Bedienrisiko sei. Es ist sogar wahr. Ob es hilft, erfährst du nicht."
			}
		]
	},
	{
		id: "call_zeiterfassung",
		title: "Herr Kunz (Lager)",
		text: "'Du, ich hab gestern vergessen auszustempeln. Steht jetzt 23:40 drin. Kannst du das eben ändern? Du kommst doch überall rein.'\n\nEr sagt das im selben Ton, in dem man jemanden bittet, ein Fenster zu schließen.",
		opts: [
			{
				t: "'Das macht die Personalabteilung, nicht ich.'",
				m: 5, f: 0, a: 5, c: 0,
				r: "Du verweist ihn an das Korrekturformular. Er findet das übertrieben bürokratisch und sagt das auch. Danach legt er auf und füllt es aus."
			},
			{
				t: "Den Eintrag eben korrigieren",
				m: 10, f: -5, a: -5, c: 5,
				next: "path_zeit_manipuliert",
				r: "Zwei Klicks, Feierabendzeit auf 16:12 gesetzt, fertig. Er ist begeistert und kündigt an, das bei Gelegenheit wieder zu brauchen. Die Datenbank schreibt jede Änderung mit, aber das erwähnst du nicht."
			},
			{
				t: "Anbieten, ihm das Formular zu zeigen",
				m: 20, f: -10, a: 0, c: -5,
				r: "Du gehst runter ins Lager und füllst es gemeinsam mit ihm aus. Es dauert länger als jede Korrektur, ist aber der einzige Weg, bei dem hinterher niemand etwas erklären muss."
			},
			{
				t: "'Kein Problem, kostet aber einen Kaffee.'",
				m: 10, f: 0, a: -10, c: 10,
				next: "path_zeit_manipuliert",
				loot: "donut",
				r: "Du änderst den Eintrag, er bringt dir zwanzig Minuten später einen Kaffee und einen Donut aus der Kantine vorbei. Der Donut ist von gestern. Der Eintrag jetzt auch."
			}
		]
	},
	{
		id: "call_zeit_revision",
		reqStory: "path_zeit_manipuliert",
		char: "Frau Elster",
		title: "Frau Elster (Buchhaltung)",
		text: "'Herr Müller. In der Zeiterfassung wurde ein Eintrag nachträglich geändert. Von einem Konto mit vollen Rechten. Es gibt genau ein solches Konto.'\n\nMan hört sie Papier umblättern. Sie hat den Vorgang ausgedruckt.",
		opts: [
			{
				t: "Fragen, warum sie die Protokolle liest",
				m: 5, f: 0, a: 15, c: 10,
				rep: { "Frau Elster": -5 },
				r: "'Weil sie da sind, Herr Müller.' Sie sagt es, als hätte sie die Frage seit Jahren erwartet und die Antwort auswendig gelernt."
			},
			{
				t: "Zugeben und den Vorgang aufnehmen",
				m: 15, f: -5, a: 5, c: 5,
				rep: { "Frau Elster": 5 },
				r: "Du erklärst, was passiert ist, und trägst es selbst ins Protokoll ein. Sie nickt hörbar. 'Dokumentiert ist es kein Fehler mehr, sondern ein Vorgang.' So funktioniert das hier offenbar."
			},
			{
				t: "Auf einen Systemfehler schieben",
				m: 10, f: 10, a: 0, c: 20,
				rep: { "Frau Elster": -10 },
				r: "Du erfindest eine Synchronisationsstörung. Sie schweigt drei Sekunden zu lang und bedankt sich dann ausgesprochen freundlich. Der Ausdruck wandert in einen Ordner, den es offiziell nicht gibt."
			}
		]
	},
	{
		id: "call_headset_echo",
		title: "Herr Doblinger (Einkauf)",
		startNode: "root",
		nodes: {
			root: {
				text: "'Alle sagen, es hallt. Ich höre mich selbst. Ich höre mich SELBST, Herr Müller.'\n\nEr hört sich tatsächlich selbst. Man hört ihn auch. Zweimal.",
				opts: [
					{ t: "Fragen, ob noch ein Gerät im Meeting ist", next: "geraet" },
					{ t: "Neues Headset in Aussicht stellen", next: "headset" },
					{ t: "Kopfhörer aufsetzen und ruhig bleiben", req: "headphones", next: "ruhig" }
				]
			},
			geraet: {
				text: "'Nur mein Rechner. Und mein Handy. Aber das ist ja nur, damit ich mitbekomme, was gesagt wird, falls der Rechner ausfällt.'\n\nDas Handy ist im selben Meeting. Auf Lautsprecher. Neben dem Mikrofon.",
				opts: [
					{ t: "Ihn bitten, das Handy zu verlassen", next: "res_handy" },
					{ t: "Nichts sagen und zuhören", next: "res_zuhoeren" }
				]
			},
			headset: {
				text: "'Endlich! Können Sie eins mit Kabel bestellen? Diese Funkdinger stören ja bekanntlich das WLAN.'\n\nEr arbeitet im Einkauf. Er könnte es selbst bestellen. Er weiß das.",
				opts: [
					{ t: "Bestellung zusagen und Ticket anlegen", next: "res_bestellung" },
					{ t: "Ihn an den Einkauf verweisen", next: "res_einkauf" }
				]
			},
			ruhig: {
				text: "Du setzt die Kopfhörer auf, drehst das Rückkopplungsecho weg und hörst ihm zu, ohne dass dir dabei die Zähne wehtun. Nach zwanzig Sekunden sagt er von selbst: 'Moment, mein Handy ist auch drin.'",
				opts: [
					{ t: "Schweigend warten", next: "res_ruhig" }
				]
			}
		},
		results: {
			res_handy: { txt: "Er verlässt das Meeting am Handy, das Echo ist weg, und er erklärt der Runde, du hättest 'am Server was umgestellt'. Widersprechen bringt an dieser Stelle nichts mehr.", m: 10, f: -5, a: 5, c: -5 },
			res_zuhoeren: { txt: "Du bleibst stumm. Er redet elf Minuten mit seinem eigenen Echo und kommt zu dem Schluss, dass die Leitung überlastet ist. Du hast in der Zeit nichts getan und dich sehr dabei entspannt.", m: 15, f: 15, a: -10, c: 5 },
			res_bestellung: { txt: "Du legst ein Ticket an, das im Einkauf landet, also bei ihm. Er wird es in zwei Wochen ablehnen, weil kein Budget da ist, und dich anrufen, um sich darüber zu beschweren.", m: 10, f: 0, a: 5, c: 0 },
			res_einkauf: { txt: "'Ich soll mir das selbst bestellen?' Er sagt es, als hättest du ihn gebeten, den Kopierer zu reparieren. Aber er tut es, und es kommt sogar an.", m: 5, f: 0, a: 10, c: 5 },
			res_ruhig: { txt: "Er löst sein Problem selbst, während du schweigst. Er bedankt sich überschwänglich für deine Hilfe. Du hast keine geleistet, und das ist heute das beste Ergebnis.", m: 5, f: 0, a: -10, c: -5 }
		}
	},
	{
		id: "call_lizenz_admin",
		title: "Frau Özdemir (Projektbüro)",
		text: "'Ich brauche dieses Konvertierungsprogramm, aber der Rechner sagt, ich hätte keine Rechte. Können Sie mir schnell Ihr Passwort sagen? Dann mache ich das selbst und Sie haben Ruhe.'\n\nSie meint es freundlich. Besser wird es dadurch nicht.",
		opts: [
			{
				t: "'Installieren Sie einfach, was Sie finden.'",
				m: 2, f: 20, a: -5, c: 20,
				r: "Du legst auf. Sie findet etwas. Es funktioniert sogar, in gewisser Weise, und blendet dabei nur alle zwanzig Minuten Werbung für einen Datenrettungsdienst ein. Den Anruf deswegen bekommst du nächste Woche."
			},
			{
				t: "Programm prüfen und selbst installieren",
				req: "admin_pw",
				m: 20, f: -10, a: 5, c: -10,
				r: "Du schaust dir an, was sie da gefunden hat: eine Freeware mit vier Werbebannern und einem Installationsassistenten, der ungefragt die Startseite ändert. Du installierst stattdessen das Programm, das die Firma längst lizenziert hat, und zeigst ihr, wo es liegt."
			},
			{
				t: "Das Passwort durchgeben, sie ist ja vertrauenswürdig",
				rem: "admin_pw",
				next: "path_pw_verraten",
				m: 5, f: 5, a: -5, c: 25,
				r: "Du sagst es ihr. Sie wiederholt es laut, buchstabiert es zur Sicherheit noch einmal und schreibt es auf einen Zettel. Der Zettel klebt ab morgen an ihrem Monitor. Ein Passwort, das im Großraumbüro hängt, ist keins mehr — du wirst es ändern müssen."
			},
			{
				t: "Ablehnen und ein Ticket für die Freigabe anlegen",
				m: 10, f: 0, a: 5, c: 0,
				r: "Du erklärst, dass du kein Passwort herausgibst, und legst eine Anfrage für die Softwarefreigabe an. Sie findet das umständlich. Sie hat recht. Trotzdem bleibt es dabei."
			}
		]
	},

	{
		id: "call_ceo_sonnenwind",
		reqStory: "path_ceo_sonnenwind",
		char: "Dr. Wichtig",
		title: "CEO Dr. Wichtig",
		text: "'Müller, ich habe der Fachpresse von unserem Sonnenwind-Problem berichtet. Die fanden das hochspannend. Ich brauche bis Freitag ein Konzept, wie wir unsere Infrastruktur gegen Sonnenwinde härten.'\n\nEr hat es nicht vergessen. Er hat es ausgebaut.",
		opts: [
			{
				t: "Ein Konzept schreiben, das nichts kostet",
				m: 25, f: -10, a: 5, c: -10,
				rep: { "Dr. Wichtig": 5 },
				r: "Du verfasst zwei Seiten über Erdung, Überspannungsschutz und redundante Netzteile — alles Dinge, die es längst gibt. Er liest es nicht, leitet es aber weiter. Der Aufsichtsrat findet den Ansatz vorausschauend."
			},
			{
				t: "Zugeben, dass es keine Sonnenwinde waren",
				m: 10, f: 0, a: 10, c: 20,
				rep: { "Dr. Wichtig": -10 },
				r: "Du erklärst, dass sein iPad damals schlicht leer war. Er hört sich das an und sagt dann: 'Und warum haben Sie mich das der Presse erzählen lassen?' Darauf gibt es keine gute Antwort."
			},
			{
				t: "Kevin das Konzept schreiben lassen",
				m: 5, f: 15, a: -5, c: 10,
				rep: { "Kevin": -5 },
				r: "Kevin ist begeistert und liefert elf Seiten, davon sieben über Sonnenstürme im Allgemeinen und eine über einen Film, den er dazu gesehen hat. Der CEO druckt es und legt es in den Empfangsbereich."
			}
		]
	},
	{
		id: "call_markus_papier",
		reqStory: "path_markus_papier",
		char: "Markus",
		title: "Vertriebsleiter Markus",
		text: "'Ihre PDF-Nummer hat mich zweiundvierzig Euro gekostet. Ich bin in den Copyshop gegenüber gefahren und habe das Angebot dort ausgedruckt. Mitsamt der internen Kalkulation auf Seite vier.'\n\nEr sagt das nicht als Beschwerde. Er sagt es als Rechnung.",
		opts: [
			{
				t: "Fragen, ob die Datei dort noch liegt",
				m: 15, f: -5, a: 10, c: -10,
				rep: { "Markus": 5 },
				r: "Sie liegt dort noch. Du rufst an, der Ladeninhaber löscht den Auftrag und findet die Aufregung übertrieben. Markus erwähnt den Vorfall nie wieder, was in seiner Sprache Dankbarkeit ist."
			},
			{
				t: "Ihm zeigen, wie man beidseitig druckt",
				m: 20, f: -10, a: 15, c: -5,
				r: "Du gehst hoch und richtest ihm den Drucker ein. Er nennt dich dabei zweimal 'Kollege' und einmal 'jung', und du bist elf Jahre älter als er."
			},
			{
				t: "Die zweiundvierzig Euro nicht kommentieren",
				m: 5, f: 5, a: 0, c: 5,
				r: "Du sagst nichts. Er reicht die Rechnung als Spesen ein, mit dem Vermerk 'IT nicht verfügbar'. Frau Elster wird das lesen. Frau Elster liest alles."
			},
			{
				t: "'Warum drucken Sie interne Kalkulationen extern?'",
				m: 10, f: 0, a: 5, c: 15,
				rep: { "Markus": -10 },
				r: "Die Frage ist berechtigt und trifft. Er wird laut, dann leise, dann sagt er: 'Melden Sie mich doch.' Ihr wisst beide, dass du das nicht tust. Aber gesagt ist es jetzt."
			}
		]
	},
	{
		id: "call_egon_switch",
		reqStory: "path_egon_switch",
		char: "Egon",
		title: "Hausmeister Egon",
		text: "'Der Kasten, wo es reingetropft hat — ich hab den aufgeschraubt und trockengeföhnt. Läuft wieder. Kannst du mal gucken, ob das so richtig ist?'\n\nEr klingt stolz. Im Hintergrund läuft noch der Föhn.",
		opts: [
			{
				t: "Fragen, ob er ihn vorher stromlos gemacht hat",
				m: 10, f: 0, a: 15, c: 0,
				next: "path_switch_bleibt",
				r: "Lange Pause. 'Muss man das?' Ihr einigt euch darauf, dass die Frage rein akademisch ist, weil er ja noch lebt. Der Switch bleibt, wo er ist."
			},
			{
				t: "'Wenn es läuft, läuft es.'",
				m: 5, f: 20, a: -5, c: 20,
				rep: { "Egon": 5 },
				next: "path_switch_bleibt",
				r: "Egon ist mit dieser Antwort außerordentlich zufrieden. Der Switch läuft noch drei Wochen und fällt dann an einem Freitagnachmittag aus, aus Gründen, die niemand mehr rekonstruieren kann."
			},
			{
				t: "Sofort hinrennen und den Switch tauschen",
				m: 30, f: -15, a: 10, c: -15,
				rep: { "Egon": 5 },
				r: "Der Switch läuft tatsächlich, auf eine Art, die man nicht empfehlen kann. Du tauschst ihn gegen ein Ersatzgerät und lässt Egon das alte behalten. Er stellt es sich in die Werkstatt, als Trophäe."
			}
		]
	},
	{
		id: "call_gabi_kollaps",
		reqStory: "path_gabi_kollaps",
		char: "Gabi",
		title: "Gabi (vom Handy)",
		text: "'Ich bin wieder da, alles halb so wild. Der Sanitäter meinte, ich soll regelmäßig essen.'\n\nPause.\n\n'Er hat mich gefragt, ob mir jemand geholfen hat. Ich habe gesagt, ich hätte niemanden erreicht.'",
		opts: [
			{
				t: "Sich entschuldigen",
				m: 10, f: -5, a: 5, c: -5,
				rep: { "Gabi": 10 },
				r: "Du sagst, dass du das falsch eingeschätzt hast, und meinst es. Sie nimmt es an, ohne es auszuwalzen. In ihrer Schublade liegt seitdem ein Notvorrat, den sie dir zeigt, als wäre es ein gemeinsames Geheimnis."
			},
			{
				t: "Ihr eine Schokolade vorbeibringen",
				rem: "chocolate",
				m: 15, f: -5, a: -10, c: -5,
				rep: { "Gabi": 10 },
				r: "Du legst ihr die Tafel wortlos auf den Tresen. Sie sagt auch nichts. Es ist die eleganteste Entschuldigung, die dieses Gebäude je gesehen hat, und sie kostet dich eine Tafel Schokolade."
			},
			{
				t: "Auf den Senf im Kühlschrank verweisen",
				m: 5, f: 5, a: 10, c: 5,
				rep: { "Gabi": -10 },
				r: "Du erklärst, dass du ja einen Vorschlag gemacht hättest. Sie legt auf. Anrufe von außen werden ab sofort ausnahmslos zu dir durchgestellt, auch die für den Vertrieb."
			}
		]
	},
	{
		id: "call_vpn_privat",
		title: "Herr Reinhardt (Controlling, Homeoffice)",
		text: "'Mein Internet ist weg. Ich komme nicht auf den Server, ich kann nicht arbeiten. Was machen Sie jetzt?'\n\nEs ist sein privater Anschluss, in seiner privaten Wohnung, bei seinem privaten Anbieter.",
		opts: [
			{
				t: "Ihm anbieten, ins Büro zu kommen",
				m: 5, f: 0, a: 5, c: -5,
				r: "Kurzes Schweigen. 'Ins Büro?' Er sagt, er versuche es erst noch einmal selbst. Zehn Minuten später ist er online und meldet sich nicht wieder."
			},
			{
				t: "Ihm deinen mobilen Hotspot anbieten",
				m: 10, f: 10, a: -5, c: 15,
				r: "Du diktierst ihm dein Hotspot-Passwort. Er ist gerührt, arbeitet den Tag darüber und lädt dabei ein Backup von vier Gigabyte hoch. Dein Datenvolumen ist am 14. des Monats aufgebraucht."
			},
			{
				t: "Erklären, dass der Anschluss privat ist",
				m: 10, f: 0, a: 10, c: 0,
				r: "Er hält das für eine Ausrede. 'Aber ich arbeite doch.' Ihr dreht euch zweimal im Kreis, bis er auflegt, um seinen Anbieter anzurufen. Dessen Hotline hat vierzig Minuten Wartezeit, sagt er später vorwurfsvoll."
			},
			{
				t: "Mit ihm den Router durchgehen",
				m: 25, f: -10, a: 15, c: -10,
				r: "Du lotst ihn durch Lampenfarben, Steckerpositionen und einen Neustart. Nach zwanzig Minuten stellt sich heraus, dass die Mehrfachsteckdose ausgeschaltet war, weil er gestern den Staubsauger angeschlossen hatte."
			}
		]
	},
	{
		id: "call_kevin_backup",
		char: "Kevin",
		title: "Kevin (Azubi)",
		text: "'Ich hab ein Backup gemacht! Von der ganzen Projektablage! Ganz allein! Es hat vier Stunden gedauert, aber jetzt ist alles doppelt da.'\n\nEr wartet hörbar auf Lob. Du hast noch nicht gefragt, wohin.",
		opts: [
			{
				t: "Fragen, auf welches Laufwerk",
				m: 10, f: 0, a: 10, c: -5,
				rep: { "Kevin": 5 },
				r: "'Na auf dieselbe Platte, wo es auch war. Damit man es leichter findet.' Ein Backup neben dem Original ist kein Backup, sondern ein Platzproblem. Du erklärst es ihm, und er versteht es sofort, was das Ärgerliche daran ist."
			},
			{
				t: "Loben und weitermachen lassen",
				m: 5, f: 10, a: -10, c: 15,
				rep: { "Kevin": 10 },
				r: "Er blüht auf und kündigt an, ab jetzt jeden Tag ein Backup zu machen. Von allem. Auf dieselbe Platte. Die Platte ist 4 TB groß und wird nächste Woche zum ersten Mal volllaufen."
			},
			{
				t: "Mit ihm zusammen ein echtes Backup einrichten",
				m: 30, f: -15, a: 0, c: -10,
				rep: { "Kevin": 10 },
				r: "Ihr richtet gemeinsam einen Auftrag auf das Netzlaufwerk ein, mit Versionierung und einer Meldung bei Fehlschlag. Es kostet dich eine halbe Stunde und ist die einzige Handlung des heutigen Tages mit einer Halbwertszeit über morgen hinaus."
			},
			{
				t: "'Backups sind nicht deine Aufgabe.'",
				m: 5, f: 5, a: 0, c: 5,
				rep: { "Kevin": -10 },
				r: "Er entschuldigt sich mehrfach und löscht die Kopie sofort wieder. Dabei löscht er versehentlich auch einen Ordner des Originals. Das erfährst du erst übermorgen."
			}
		]
	},
	{
		id: "call_falle_datenschutz",
		title: "Externe Nummer",
		text: "'Guten Tag, Bartels, externe Datenschutzkoordination. Wir prüfen im Auftrag Ihrer Geschäftsleitung die Zugriffsrechte. Bitte senden Sie mir eine Liste aller Benutzerkonten mit Rechtestufe an die Adresse, die ich Ihnen gleich durchgebe.'\n\nEr klingt ausgesprochen korrekt. Er kennt den Namen eures Geschäftsführers. Der steht auf der Website.",
		opts: [
			{
				t: "Ihn an die Geschäftsleitung verweisen",
				m: 5, f: 5, a: 0, c: 0,
				r: "Du gibst ihm die Nummer des Sekretariats. Gabi wimmelt ihn in vierzig Sekunden ab, weil sie grundsätzlich niemanden durchstellt, den sie nicht kennt. Manchmal ist Misstrauen ein Sicherheitskonzept."
			},
			{
				t: "Rückruf über die Zentrale anbieten",
				m: 10, f: 0, a: 5, c: -10,
				r: "Du erklärst, dass du gerne zurückrufst, sobald du die Nummer über die Zentrale bestätigt hast. Eine Sekunde Pause. Dann: 'Selbstverständlich.' Er ruft nie wieder an, und die Zentrale kennt keinen Bartels."
			},
			{
				t: "Nachfragen, wer den Auftrag erteilt hat",
				m: 15, f: 0, a: 10, c: -5,
				r: "Er nennt einen Namen aus dem Impressum, dann eine Vertragsnummer, dann wird er ungeduldig. Ungeduld ist bei einer echten Prüfung selten. Du legst höflich auf, und er versucht es nicht noch einmal."
			},
			{
				t: "Die Liste zusammenstellen und schicken",
				m: 20, f: -5, a: 0, c: 30,
				r: "Du exportierst die Benutzerliste und schickst sie an eine Adresse, deren Domain sich von eurer in genau einem Buchstaben unterscheidet. Aufgefallen ist dir das nicht. Auffallen wird es irgendwann jemandem."
			}
		]
	},
	{
		id: "call_chantal_umfrage",
		char: "Chantal",
		title: "Chantal (Feel-Good-Management)",
		text: "'Ich brauche ein Umfrage-Tool für unsere Zufriedenheitsbefragung! Ganz wichtig: komplett anonym, damit alle ehrlich sind.'\n\nPause.\n\n'Aber ich muss natürlich sehen können, wer was geantwortet hat. Für die Nachbetreuung.'",
		opts: [
			{
				t: "Ein echtes anonymes Tool aufsetzen",
				m: 25, f: -10, a: 0, c: -10,
				rep: { "Chantal": 5 },
				r: "Du richtest es ein, ohne Rückverfolgung, und zeigst ihr die Auswertung. Die erste Antwort lautet: 'Die IT ist das Einzige, was hier funktioniert.' Sie liest sie dir vor, hörbar irritiert."
			},
			{
				t: "Namen mitspeichern, sie merkt es nicht",
				m: 10, f: 5, a: -5, c: 25,
				rep: { "Chantal": 10 },
				r: "Du legst ein Feld an, das die Anmeldung mitschreibt. Sie ist begeistert. Vier Wochen später fragt der Betriebsrat, wie die Zuordnung in der Auswertung zustande kam, und der einzige Name im Protokoll ist deiner."
			},
			{
				t: "'Nehmt Zettel und eine Kiste.'",
				m: 5, f: 15, a: -5, c: 5,
				rep: { "Chantal": -5 },
				r: "Du schlägst Papier vor. Sie hält das für einen Rückschritt ins letzte Jahrhundert, macht es aber. Die Kiste steht drei Wochen im Foyer, und am Ende sind vier Zettel drin, davon zwei mit Zeichnungen."
			},
			{
				t: "Erklären, dass beides zusammen nicht geht",
				m: 15, f: -5, a: 10, c: -5,
				rep: { "Chantal": -5 },
				r: "Du erklärst den Widerspruch dreimal in drei Varianten. Sie hört zu und sagt dann: 'Und wenn wir es trotzdem anonym nennen?' Ihr einigt euch auf wirklich anonym, aber sie ist enttäuscht von dir."
			}
		]
	},

	{
		id: "call_chef_kaffeetrick",
		reqStory: "path_chef_kaffeetrick",
		char: "Chantal",
		title: "Chantal (Feel-Good-Management)",
		text: "'Herr Müller, ganz kurz: In der Teeküche steht eine Schlange. Angeblich gibt es einen Trick, wie man die Premium-Röstung umsonst bekommt. Wissen Sie was darüber?'\n\nDu weißt sehr genau etwas darüber. Du weißt sogar, von wem es kommt.",
		opts: [
			{
				t: "'Keine Ahnung, ich trinke den normalen.'",
				m: 5, f: 5, a: 0, c: 0,
				r: "Du lässt es unkommentiert. Der Trick verbreitet sich von allein durch drei Etagen, und die Maschine wird am Donnerstag von einem Techniker neu konfiguriert. Niemand fragt, wer angefangen hat."
			},
			{
				t: "Den Trick erklären, aber nicht die Quelle",
				m: 10, f: 0, a: -5, c: 10,
				rep: { "Chantal": 5 },
				r: "Sie probiert es sofort aus, ist begeistert und postet es ins Intranet. Innerhalb einer Stunde weiß es das ganze Haus. Der Chef liest den Beitrag und weiß nun, dass jemand mitgehört hat."
			},
			{
				t: "Sagen, von wem der Trick stammt",
				m: 10, f: 0, a: 5, c: 25,
				rep: { "Chantal": 10, "Dr. Wichtig": -10 },
				r: "Chantal ist elektrisiert und behandelt die Information wie ein Geschenk. Sie behält sie exakt vierzig Minuten für sich. Der Chef weiß am Nachmittag, wer gelauscht hat, und du weißt, dass er es weiß."
			},
			{
				t: "'Der Kaffee ist auch mit Trick schlecht.'",
				m: 5, f: 0, a: -10, c: 5,
				r: "Sie lacht ehrlich, zum ersten Mal seit Wochen ohne Emoji im Tonfall. Das Thema ist damit erledigt, und die Schlange in der Teeküche löst sich von selbst auf, als die Röstung leer ist."
			}
		]
	},
	{
		id: "call_puschel",
		reqStory: "path_puschel",
		title: "Praktikant Tobias",
		text: "'Ähm, Herr Müller? Ich komme nicht mehr in mein Konto. Es sagt, das Passwort sei abgelaufen. Ich habe es doch gerade erst geändert.'\n\nDu weißt, wie es lautet. Du weißt sogar, wie der Hamster heißt.",
		opts: [
			{
				t: "'Woher soll ich Ihr Passwort kennen?'",
				m: 5, f: 5, a: 5, c: 5,
				r: "Du stellst dich ahnungslos und setzt es kommentarlos zurück. Er glaubt dir. Zwei Wochen später erzählt er im Aufenthaltsraum, die IT könne Passwörter nicht sehen, und du widersprichst nicht."
			},
			{
				t: "Zurücksetzen, ohne etwas zu erwähnen",
				m: 10, f: -5, a: 0, c: -5,
				r: "Du setzt es zurück und lässt ihn ein neues vergeben. Er tippt es ein und sagt dabei laut mit: 'Pu-schel-eins-zwei-drei-vier.' Ihr habt beide dazugelernt, nur unterschiedlich viel."
			},
			{
				t: "Ihm erklären, warum man Passwörter nicht ausspricht",
				m: 20, f: -10, a: 5, c: -10,
				r: "Du erklärst ihm in fünf Minuten mehr über Sicherheit, als er in seiner Einführung gehört hat, und zwar ohne ihn bloßzustellen. Er nickt ernsthaft. Der Hamster kommt in keinem Passwort mehr vor."
			},
			{
				t: "Mit 'Puschel123' anmelden und es ihm zeigen",
				m: 10, f: 0, a: -5, c: 20,
				r: "Du meldest dich vor seinen Augen mit seinem Passwort an. Der Schreck sitzt tief und die Lektion auch. Die Anmeldung steht allerdings mit deinem Rechnernamen im Protokoll, und Protokolle liest hier jemand."
			}
		]
	},
	{
		id: "call_lena_keller",
		reqStory: "path_lena_keller",
		title: "Praktikantin Lena",
		text: "'Ich wollte nur nochmal danke sagen. Und fragen: Woher wussten Sie den Code?'\n\nDu wusstest ihn nicht. Du hast geraten. Der Code lautet seit der Installation 0000.",
		opts: [
			{
				t: "Den Code melden, damit er geändert wird",
				m: 15, f: -5, a: 5, c: -10,
				rep: { "Egon": -5 },
				r: "Du schreibst eine Meldung an die Haustechnik. Egon ändert den Code auf 1234 und teilt ihn per Aushang mit, damit ihn niemand vergisst. Der Aushang hängt neben der Tür."
			},
			{
				t: "Geheimnisvoll bleiben",
				m: 5, f: 10, a: -10, c: 5,
				r: "'Berufsgeheimnis.' Sie ist beeindruckt. Der Ruf, im Haus alle Codes zu kennen, ist einiges wert und kostet dich keine einzige Minute Arbeit."
			},
			{
				t: "Die Wahrheit sagen",
				m: 5, f: 0, a: 0, c: -5,
				r: "Du gibst zu, dass du geraten hast. Sie findet das noch lustiger als die Rettung selbst und erzählt es weiter. Seitdem heißt der Kellercode im Haus 'die Müller-Methode'."
			}
		]
	},
	{
		id: "call_maus_hof",
		reqStory: "path_maus_hof",
		char: "Egon",
		title: "Hausmeister Egon",
		text: "'Sag mal, hast du eine Maus im Hof ausgesetzt? Da sitzen jetzt drei. Eine davon kennt sich verdächtig gut mit dem Papierschacht aus.'\n\nEr klingt nicht vorwurfsvoll. Er klingt fachlich interessiert.",
		opts: [
			{
				t: "Fragen, ob man sie behalten kann",
				m: 10, f: 5, a: -10, c: 5,
				rep: { "Egon": 5 },
				r: "Egon überlegt ernsthaft. 'Als Bürotier?' Die Idee scheitert an Frau Elster, die Bürotiere für einen geldwerten Vorteil hält und das auch schriftlich festhält."
			},
			{
				t: "Mit Egon eine Lebendfalle aufstellen",
				m: 25, f: -10, a: 0, c: -10,
				rep: { "Egon": 10 },
				r: "Ihr stellt gemeinsam zwei Kästen auf und Egon erzählt dabei vierzig Minuten von 1987. Am nächsten Morgen sind beide Fallen leer und der Köder weg. Egon nennt das 'Respekt vor dem Gegner'."
			},
			{
				t: "Vorschlagen, den Papierschacht zu schließen",
				m: 10, f: 0, a: 5, c: -5,
				r: "Eine Klappe, die zugeht, löst das Problem an der Wurzel. Egon findet die Idee gut, setzt sie um, und der Drucker quiekt nie wieder. Dafür klemmt er jetzt beim Papiereinzug."
			},
			{
				t: "'Nicht mein Zuständigkeitsbereich.'",
				m: 5, f: 10, a: 0, c: 5,
				rep: { "Egon": -5 },
				r: "Egon sagt nur: 'Ah.' und legt auf. Es ist ein sehr kurzes 'Ah', und du wirst noch monatelang daran denken, wenn du etwas von der Haustechnik brauchst."
			}
		]
	},
	{
		id: "call_scanner_riesig",
		title: "Herr Petzold (Qualitätssicherung)",
		text: "'Ich scanne seit einer halben Stunde und es kommt keine Mail an. Der Scanner sagt aber, er hätte gesendet.'\n\nEr hat gesendet. Vierhundertzwölf Seiten, einzeln, in höchster Auflösung, in Farbe.",
		opts: [
			{
				t: "Die Warteschlange leeren und neu scannen lassen",
				m: 20, f: -10, a: 5, c: -10,
				r: "Du räumst 2,8 Gigabyte aus der Warteschlange und stellst den Scanner auf Graustufen. Der zweite Versuch dauert vier Minuten und kommt an. Er fragt, warum das nicht von Anfang an so eingestellt war."
			},
			{
				t: "Fragen, was er da eigentlich scannt",
				m: 10, f: 0, a: 10, c: -5,
				next: "path_petzold_handbuch",
				r: "Es ist ein Qualitätshandbuch, das digital vorliegt. Er scannt den Ausdruck, um daraus eine digitale Version zu machen. Ihr steht beide kurz schweigend vor diesem Gedanken."
			},
			{
				t: "Ihm das Postfachlimit erhöhen",
				m: 15, f: 0, a: 0, c: 10,
				r: "Du hebst das Limit an, die Mails kommen an, und das Postfach ist am Nachmittag wieder voll. Das Problem ist damit nicht gelöst, sondern nur umgezogen — in die Datensicherung."
			},
			{
				t: "'Der Scanner arbeitet noch, bitte warten.'",
				m: 5, f: 15, a: -5, c: 5,
				r: "Du legst auf. Der Scanner arbeitet tatsächlich noch, und zwar bis 15 Uhr. In der Zwischenzeit kann niemand im Haus etwas anderes drucken."
			}
		]
	},
	{
		id: "call_neuer_kollege",
		title: "Personalentwicklung",
		text: "'Der neue Kollege im Vertrieb fängt in zehn Minuten an. Er bräuchte einen Rechner, ein Konto, ein Postfach, ein Telefon und den Zugang zum Warenwirtschaftssystem.'\n\nDu hörst zum ersten Mal von ihm.",
		opts: [
			{
				t: "Ihn an den alten Rechner von Bernd setzen",
				m: 15, f: -5, a: 0, c: 15,
				next: "path_bernd_rechner",
				r: "Der Rechner steht noch da, mit allen Rechten und allen Daten seines Vorgängers. Es funktioniert sofort und ist gleichzeitig das Schlimmste, was du heute tun konntest. Aufgefallen ist es niemandem."
			},
			{
				t: "Nachfragen, wer ihn eigentlich eingestellt hat",
				m: 10, f: 0, a: 15, c: 10,
				r: "Es stellt sich heraus, dass die Meldung an die IT seit drei Wochen in einem Postfach liegt, das seit der Umstrukturierung niemandem gehört. Das zu klären dauert länger als das Konto anzulegen."
			},
			{
				t: "Erklären, dass so etwas Vorlauf braucht",
				m: 10, f: 0, a: 10, c: 5,
				r: "Du erklärst den Ablauf und die Vorlaufzeit. Sie hört geduldig zu. Dann: 'Aber er ist ja jetzt da.' Ihr habt beide recht und trotzdem sitzt gleich jemand vor einem leeren Tisch."
			},
			{
				t: "Ein Konto anlegen, Rest kommt später",
				m: 25, f: -10, a: 5, c: -10,
				r: "Du legst in zwanzig Minuten das Nötigste an: Anmeldung, Postfach, ein Leihgerät aus dem Schrank. Er kann Mails lesen. Für einen ersten Arbeitstag im Vertrieb ist das mehr als genug."
			}
		]
	},
	{
		id: "call_beamer_workshop",
		char: "Chantal",
		title: "Chantal (Schulungsraum)",
		text: "'Der Beamer zeigt nichts an! In vier Minuten fängt der Workshop an! Es geht um Digitalisierung!'\n\nIm Hintergrund sagt jemand mit sehr ruhiger Stimme: 'Bei mir zu Hause geht so was immer sofort.'",
		opts: [
			{
				t: "Hingehen und den Eingang umstellen",
				m: 20, f: -10, a: 10, c: -10,
				rep: { "Chantal": 10 },
				r: "Der Beamer stand auf dem falschen Eingang, weil vorgestern jemand einen Laptop angeschlossen und wieder mitgenommen hat. Zwei Tastendrücke. Chantal stellt dich der Runde als 'unseren Retter' vor, was schlimmer ist als das Problem."
			},
			{
				t: "Am Telefon durch das Menü führen",
				m: 15, f: -5, a: 15, c: 0,
				r: "Du beschreibst Symbole, die sie nicht findet, auf einer Fernbedienung, deren Batterien leer sind. Nach zwölf Minuten schaltet sie den Beamer aus und wieder ein, und es geht. Warum, bleibt zwischen euch."
			},
			{
				t: "Das Ersatzkabel bringen",
				req: "cable",
				m: 10, f: -5, a: 0, c: -10,
				rep: { "Chantal": 5 },
				r: "Du bringst das Kabel aus deiner Schublade, steckst es an und gehst wieder. Vier Minuten, kein Wort zu viel. Das Kabel bleibt dort und wird nie wieder auftauchen."
			},
			{
				t: "'Macht den Workshop analog, passt zum Thema.'",
				m: 5, f: 10, a: -10, c: 10,
				rep: { "Chantal": -5 },
				r: "Der Satz ist zu gut, um ihn nicht zu sagen, und du sagst ihn laut genug, dass es die Runde hört. Es lachen drei Leute. Chantal gehört nicht dazu."
			}
		]
	},
	{
		id: "call_signatur_weg",
		title: "Frau Kirchner (Auftragsbearbeitung)",
		text: "'Meine Signatur ist weg. Einfach weg. Ich habe nichts gemacht.'\n\nSie hat sie gestern selbst gelöscht, weil sie ihr zu lang war. Das wird sie erst in vier Minuten sagen.",
		opts: [
			{
				t: "'Signaturen sind Sache der Anwender.'",
				m: 2, f: 15, a: -5, c: 10,
				r: "Du legst auf. Sie schreibt den ganzen Tag Mails ohne Absenderangabe, und zwei Kunden fragen zurück, mit wem sie es zu tun haben. Die Rückfragen landen im Postfach ihres Abteilungsleiters."
			},
			{
				t: "Die Vorlage neu einsetzen",
				m: 10, f: -5, a: 0, c: -5,
				r: "Du setzt die Firmenvorlage neu ein. Sie ist zufrieden, bis sie merkt, dass wieder der vollständige Haftungshinweis darunter steht. Der Hinweis ist neun Zeilen lang und rechtlich vorgeschrieben."
			},
			{
				t: "Fragen, wann sie zuletzt funktioniert hat",
				m: 15, f: -5, a: 5, c: -10,
				r: "Zwei Fragen später gibt sie zu, dass sie gestern 'ein bisschen aufgeräumt' hat. Ihr stellt es gemeinsam wieder her, und sie erwähnt den Haftungshinweis mit keinem Wort mehr."
			},
			{
				t: "Ihr eine eigene Signatur bauen lassen",
				m: 20, f: 0, a: 5, c: 15,
				r: "Sie gestaltet sich eine Signatur mit einem Zitat, zwei Farben und einem Bild ihres Hundes. Der Haftungshinweis fehlt darin. Das wird auffallen, aber nicht heute und nicht dir."
			}
		]
	},
	{
		id: "call_falle_werkstudent",
		title: "Unbekannte Nummer",
		text: "'Hi, hier ist Jan, der neue Werkstudent in der IT. Ich soll heute anfangen, komme aber nicht ins System. Kannst du mir schnell einen Zugang einrichten? Frau Chantal hat gesagt, ich soll dich direkt anrufen.'\n\nEr duzt dich sofort. Er kennt Chantals Vornamen. Er kennt deinen auch.",
		opts: [
			{
				t: "Bei Chantal nachfragen",
				m: 10, f: 0, a: 5, c: -10,
				rep: { "Chantal": 5 },
				r: "Chantal weiß von keinem Jan. Sie weiß auch von keinem Werkstudenten. Als du zurückrufst, ist die Nummer nicht mehr vergeben. Du legst den Vorgang schriftlich ab, weil so etwas selten einmal vorkommt."
			},
			{
				t: "Ihn bitten, persönlich vorbeizukommen",
				m: 5, f: 0, a: 0, c: -5,
				r: "'Klar, ich bin nachmittags da.' Er ist nachmittags nicht da. Er ist auch am nächsten Tag nicht da. Der Empfang hat nie einen Jan gesehen."
			},
			{
				t: "Zugang einrichten, er fängt ja heute an",
				m: 20, f: -5, a: -5, c: 30,
				r: "Du legst ein Konto an und gibst die Zugangsdaten telefonisch durch. Er bedankt sich herzlich und meldet sich um 23:40 Uhr von einer Adresse an, die in keinem Netz liegt, das zu diesem Gebäude gehört."
			},
			{
				t: "Ihn nach seiner Personalnummer fragen",
				m: 10, f: 0, a: 5, c: -5,
				r: "Kurzes Zögern. Dann nennt er eine, die es geben könnte, aber nicht gibt. Als du das sagst, wird er unfreundlich und legt auf. Unfreundlichkeit am Telefon ist selten ein Beweis, aber fast immer ein Hinweis."
			}
		]
	},
	{
		id: "call_heizluefter",
		char: "Egon",
		title: "Hausmeister Egon",
		text: "'Im Westflügel ist zum dritten Mal heute die Sicherung raus. Immer kurz nach neun. Ich hab nichts geändert. Ihr habt doch die ganzen Kisten da stehen.'\n\nDie ganzen Kisten stehen dort seit vier Jahren und haben noch nie eine Sicherung geworfen.",
		opts: [
			{
				t: "'Elektrik ist Haustechnik, nicht IT.'",
				m: 5, f: 10, a: 0, c: 10,
				rep: { "Egon": -10 },
				r: "Formal hast du recht. Egon legt wortlos auf und meldet den Vorfall schriftlich weiter, mit dem Zusatz, die IT habe eine Prüfung abgelehnt. Der Zusatz ist der eigentliche Punkt."
			},
			{
				t: "Fragen, ob jemand ein Heizgerät benutzt",
				m: 10, f: 0, a: 5, c: -10,
				rep: { "Egon": 5 },
				next: "path_heizluefter",
				r: "Egon geht nachsehen und findet drei Heizlüfter unter drei Schreibtischen, alle an derselben Leiste, alle seit Montag. Die Heizung im Westflügel läuft seit Montag nicht."
			},
			{
				t: "Hingehen und die Verteilung durchmessen",
				m: 30, f: -15, a: 5, c: -10,
				rep: { "Egon": 10 },
				r: "Du misst eine Stunde lang mit Egon zusammen und findest dieselben drei Heizlüfter, nur langsamer. Dafür weißt du jetzt, was hinter der Wand liegt, und Egon weiß, dass du zuhören kannst."
			}
		]
	},
	{
		id: "call_kalender_geist",
		title: "Frau Brandt (Vertriebsinnendienst)",
		text: "'In meinem Kalender steht jeden Dienstag um 14 Uhr ein Termin namens \"Abstimmung\". Ohne Ort, ohne Beschreibung, ohne Organisator. Ich kann ihn nicht löschen. Er ist einfach da.'\n\nEr steht bei siebzehn Personen im Kalender. Seit 2021.",
		opts: [
			{
				t: "Den Termin bei ihr allein ausblenden",
				m: 10, f: 0, a: 0, c: -5,
				r: "Ein Klick, das Problem ist für sie weg und für sechzehn andere nicht. Genau so entstehen Termine, die niemand mehr zuordnen kann, und du weißt das in dem Moment, in dem du es tust."
			},
			{
				t: "Die ganze Serie löschen",
				m: 15, f: -5, a: 0, c: 25,
				next: "path_geistertermin",
				r: "Du räumst auf. Am folgenden Dienstag um 14 Uhr sitzen vier Personen in einem Raum, weil sie den Termin nicht mehr im Kalender hatten, aber im Kopf. Zwei von ihnen halten diese Runde für das wichtigste Meeting der Woche."
			},
			{
				t: "'Gehen Sie einfach hin.'",
				m: 5, f: 10, a: -5, c: 5,
				r: "Sie geht hin. Der Raum ist leer. Sie bleibt zwanzig Minuten und schreibt anschließend ein Protokoll, weil sie Protokolle schreibt. Das Protokoll geht an siebzehn Personen."
			},
			{
				t: "Herausfinden, wer die Serie angelegt hat",
				m: 25, f: -10, a: 5, c: -5,
				r: "Der Organisator hat die Firma 2022 verlassen, sein Konto wurde deaktiviert, die Serie blieb. Du dokumentierst es und stellst fest, dass sich in vier Jahren niemand getraut hat zu fragen, worum es geht."
			}
		]
	},
	{
		id: "call_wlan_gast",
		char: "Gabi",
		title: "Gabi (Empfang)",
		text: "'Herr Müller, hier steht ein Besucher, der ins WLAN möchte. Ich habe ihm das Gästenetz genannt, aber er sagt, das sei zu langsam für seine Präsentation.'\n\nIm Hintergrund: 'Ich brauche nur kurz das richtige Netz.'",
		opts: [
			{
				t: "Ihm das interne Netz nennen, ist ja nur kurz",
				m: 5, f: 5, a: -5, c: 30,
				r: "Du gibst das interne Passwort durch. Er ist zufrieden, sein Rechner meldet sich brav im Firmennetz an, und danach hat ein Gerät, das dir niemals gehört hat, eine Adresse in deinem Netz. Für immer, denn er wird wiederkommen."
			},
			{
				t: "Gabi entscheiden lassen",
				m: 5, f: 10, a: -5, c: 5,
				rep: { "Gabi": -5 },
				r: "Du sagst, sie solle machen, was sie für richtig hält. Sie hält es für richtig, ihn abzuweisen, und tut das mit einer Freundlichkeit, gegen die kein Argument ankommt. Beschweren wird er sich trotzdem — bei dir."
			},
			{
				t: "Den Zettel mit den Gästedaten durchgeben",
				req: "wifi_note",
				m: 5, f: 0, a: 0, c: -5,
				rep: { "Gabi": 5 },
				r: "Du liest Gabi die Gästedaten vom Zettel vor, sie gibt sie weiter, fertig. Das Gästenetz ist genau so langsam, wie es sein soll, und die Präsentation läuft trotzdem."
			},
			{
				t: "Fragen, was er präsentieren will",
				m: 10, f: 0, a: 5, c: -5,
				r: "Er will ein Video aus einer Cloud abspielen, die niemand hier kennt. Ihr einigt euch auf den Beamer und eine Datei vom Stick. Es dauert zwei Minuten und funktioniert seit dreißig Jahren."
			}
		]
	},

	{
		id: "call_werner_blind",
		reqStory: "path_werner_blind",
		title: "Privatanruf: Schwiegerpapa Werner",
		text: "'JÜRGEN! Es hat geklappt! Ich bin jetzt in dieser Gruppe!'\n\nEr ist in einer Gruppe. Sie heißt 'Nachbarschaft Ostweg – KEINE POLITIK'. Er hat sie selbst gegründet. Sie hat 214 Mitglieder.\n\n'Und die schreiben alle so schnell! Kannst du das langsamer stellen?'",
		opts: [
			{
				t: "'Verlass die Gruppe einfach.'",
				m: 5, f: 0, a: 10, c: 0,
				r: "'Verlassen? Die haben mich zum Verwalter gemacht!' Er sagt das wie einen Rang. Das Gespräch endet damit, dass er die Gruppe behält und du das Thema."
			},
			{
				t: "Ehrlich sagen, dass du beim letzten Mal nicht zugehört hast",
				m: 15, f: -5, a: -10, c: 5,
				r: "Du gibst zu, dass du damals nur 'Mhm' gesagt hast. Werner ist kurz still und lacht dann so laut, dass es im Nachbarbüro zu hören ist. 'Das macht der Enkel auch immer.' Ihr telefoniert seitdem öfter."
			},
			{
				t: "Wieder die Kopfhörer aufsetzen",
				req: "headphones",
				m: 25, f: 20, a: -15, c: 10,
				r: "Du machst es genauso wie beim letzten Mal. Es funktioniert genauso gut. Am Ende ist er zufrieden, du bist entspannt, und irgendwo im Ostweg passiert etwas, wovon du nie erfahren wirst."
			},
			{
				t: "Ihm zeigen, wie man Gruppen stummschaltet",
				m: 20, f: 5, a: -5, c: 15,
				r: "Zwanzig Minuten, in denen du dreimal erklärst, wo 'das Glöckchen mit dem Strich' ist. Danach ist Ruhe im Ostweg. Renate ruft am Abend an und bedankt sich bei dir, was Werner nie tun würde."
			}
		]
	},
	{
		id: "call_plomp_tape",
		reqStory: "path_plomp_tape",
		title: "Frau Plomp (Kundenbetreuung)",
		text: "'Der Getränkehalter hält jetzt wunderbar, danke nochmal. Aber ich habe hier eine CD von der Schulung, die soll ich einlegen. Wo mache ich das?'\n\nDie einzige Öffnung dafür ist mit Panzertape zugeklebt. Von dir.",
		opts: [
			{
				t: "Das Tape abziehen und es ihr erklären",
				m: 15, f: -5, a: 5, c: -5,
				r: "Du ziehst das Tape ab, die Lade fährt heraus, und Frau Plomp betrachtet das Ganze mit dem Gesichtsausdruck eines Menschen, der gerade betrogen wurde. 'Das ist ja doch ein Loch.' Ihr sprecht nie wieder darüber."
			},
			{
				t: "Den Inhalt der CD auf ein Netzlaufwerk kopieren",
				m: 20, f: -10, a: 0, c: -10,
				r: "Du holst die CD, kopierst die Schulungsunterlagen auf das Laufwerk und schickst ihr den Link. Sie druckt die Unterlagen aus. Alle vierhundert Seiten. Der Drucker im dritten Stock hat den Rest des Tages zu tun."
			},
			{
				t: "'Legen Sie sie einfach oben drauf.'",
				m: 5, f: 15, a: -5, c: 10,
				r: "Sie legt die CD auf das Gehäuse. Es passiert nichts, was sie zu der Bemerkung veranlasst, moderne Technik sei eben nicht mehr das, was sie mal war. Widersprechen wäre in dieser Lage unklug."
			}
		]
	},
	{
		id: "call_bernd_rechner",
		reqStory: "path_bernd_rechner",
		char: "Frau Elster",
		title: "Frau Elster (Buchhaltung)",
		text: "'Herr Müller. Auf einer frischen Rechnungsfreigabe steht als Bearbeiter ein Name, der seit Februar nicht mehr im Haus ist.'\n\nDer neue Kollege sitzt an Bernds Rechner. Mit Bernds Anmeldung. Mit Bernds Freigaberechten.",
		opts: [
			{
				t: "Sofort ein eigenes Konto einrichten",
				m: 25, f: -10, a: 5, c: -15,
				rep: { "Frau Elster": 10 },
				r: "Du legst in einer halben Stunde nach, was du am Montag hättest anlegen sollen, und sperrst das alte Konto. Frau Elster vermerkt die Sperrung im Protokoll und schreibt daneben: 'Zeitnah behoben.' Das ist ihr höchstes Lob."
			},
			{
				t: "Die Freigaben aus dem alten Konto entfernen",
				m: 15, f: -5, a: 0, c: -5,
				r: "Du nimmst die Rechte weg, das Konto bleibt. Der neue Kollege arbeitet weiter unter Bernds Namen, kann aber nichts mehr freigeben. Ein Zwischenzustand, der erfahrungsgemäß drei Jahre hält."
			},
			{
				t: "'Der Rechner war ja noch eingerichtet.'",
				m: 5, f: 10, a: 5, c: 25,
				rep: { "Frau Elster": -10 },
				r: "Du erklärst, dass es praktisch war. Sie wiederholt das Wort 'praktisch' einmal, sehr langsam. Der Vorgang liegt ab morgen als Ausdruck bei der Geschäftsleitung, ordentlich abgeheftet."
			},
			{
				t: "Fragen, warum Bernds Konto noch aktiv ist",
				m: 10, f: 0, a: 10, c: 10,
				r: "Weil niemand die Abmeldung geschickt hat. Die Abmeldung schickt die Personalabteilung. Die Personalabteilung wartet auf die Bestätigung der IT. Auf die Bestätigung wartet sie seit Februar."
			}
		]
	},
	{
		id: "call_geistertermin",
		reqStory: "path_geistertermin",
		title: "Frau Brandt (Vertriebsinnendienst)",
		text: "'Vier Leute aus der alten Verteilerliste haben gemerkt, dass der Termin weg ist, und einen neuen angelegt. Er heißt \"Abstimmung (neu)\" und geht an dreiundzwanzig Personen. Sie haben mich in cc gesetzt und schreiben, die IT habe den alten versehentlich gelöscht.'\n\nVersehentlich war es nicht.",
		opts: [
			{
				t: "Richtigstellen, dass die Serie verwaist war",
				m: 15, f: -5, a: 10, c: -5,
				r: "Du antwortest allen dreiundzwanzig sachlich, dass der Organisator die Firma 2022 verlassen hat. Zwei Leute bedanken sich, einer widerspricht, und der Termin bleibt trotzdem bestehen. Er hat jetzt eine Geschichte, und das reicht."
			},
			{
				t: "Anbieten, an der Runde teilzunehmen",
				m: 20, f: -5, a: 15, c: -10,
				r: "Du gehst einmal hin. Es geht vierzig Minuten um Zuständigkeiten, dann zwanzig Minuten um den Kaffee. Am Ende bittet man dich, künftig regelmäßig zu kommen, weil deine Anwesenheit die Runde aufgewertet habe."
			},
			{
				t: "Nichts sagen, der Termin ist harmlos",
				m: 5, f: 10, a: -5, c: 5,
				r: "Du lässt es laufen. Die Runde tagt seitdem wieder jeden Dienstag um 14 Uhr, produziert Protokolle und wird im nächsten Jahr in der Organisationsübersicht auftauchen. Irgendwann wird jemand fragen, wer das eingeführt hat."
			}
		]
	},
	{
		id: "call_petzold_handbuch",
		reqStory: "path_petzold_handbuch",
		title: "Herr Petzold (Qualitätssicherung)",
		text: "'Wegen der Scannerei. Ich habe das digitale Handbuch gefunden, das Sie meinten. Es ist von 2019. Meins ist von 2023. Ich habe nämlich seitdem Änderungen von Hand eingetragen.'\n\nAuf Papier. In einem Ordner. Als einzige Fassung.",
		opts: [
			{
				t: "Ihm zeigen, wie man Änderungen digital nachverfolgt",
				m: 20, f: -10, a: 5, c: -10,
				r: "Er ist ehrlich beeindruckt, dass ein Dokument sich merkt, wer was wann geändert hat. Dass er das seit 2019 hätte haben können, sagst du nicht. Er kommt selbst darauf und wird sehr still."
			},
			{
				t: "Vorschlagen, den Ordner einzuscannen",
				m: 10, f: 5, a: 0, c: 10,
				r: "Du schlägst genau das vor, was die Warteschlange zum Überlaufen gebracht hat. Er tut es. Diesmal in Graustufen, immerhin. Die Datei liegt danach neben dem Dokument von 2019, und niemand weiß mehr, welche gilt."
			},
			{
				t: "'Dann ist Ihre Fassung eben die gültige.'",
				m: 5, f: 15, a: -5, c: 5,
				r: "Du erklärst den Papierordner zur führenden Fassung. Das ist bequem, ehrlich und aus Sicht der nächsten Zertifizierung eine Katastrophe. Aber die ist im Herbst, und heute ist Dienstag."
			},
			{
				t: "Anbieten, die Änderungen einzupflegen",
				m: 30, f: -15, a: 0, c: -15,
				r: "Ihr geht die Randnotizen von vier Jahren durch und übertragt sie ins Dokument. Es dauert ewig und ist die erste Handlung seit Monaten, die eine Fassung erzeugt hat, hinter der niemand mehr zurückmuss."
			}
		]
	},
	{
		id: "call_bildschirm_gedreht",
		title: "Herr Adler (Einkauf)",
		text: "'Alles steht auf dem Kopf. Der ganze Bildschirm. Ich habe nur die Tastatur sauber gemacht.'\n\nEr hat beim Wischen eine Tastenkombination erwischt, die es seit zwanzig Jahren gibt und die niemand je gebraucht hat.",
		opts: [
			{
				t: "Nachfragen, womit er sauber gemacht hat",
				m: 10, f: 0, a: 10, c: -5,
				r: "Mit Glasreiniger. Direkt aufgesprüht. Auf die Tastatur. Das gedrehte Bild ist damit das kleinste der beiden Probleme, und das zweite meldet sich in etwa vier Tagen."
			},
			{
				t: "Die Tastenkombination durchsagen",
				m: 5, f: 0, a: 0, c: 0,
				r: "Strg, Alt, Pfeil nach oben. Ein Tastendruck, zwei Sekunden, erledigt. Er ist enttäuscht, dass es so einfach war, und du weißt genau, dass er das gleich jemandem vorführen wird."
			},
			{
				t: "Hingehen und es umstellen",
				m: 15, f: -10, a: 5, c: -5,
				r: "Du gehst hoch, drehst das Bild zurück und deaktivierst die Tastenkombination gleich mit. Auf dem Rückweg fragen dich zwei Leute, ob du bei ihnen auch mal schauen könntest."
			},
			{
				t: "Ihn den Bildschirm drehen lassen",
				m: 10, f: 10, a: -10, c: 5,
				r: "Du schlägst vor, er könne den Monitor am Standfuß drehen. Er tut es tatsächlich. Er arbeitet zwei Stunden an einem hochkant stehenden, um 180 Grad gedrehten Bildschirm, bevor jemand vorbeikommt und fragt."
			}
		]
	},
	{
		id: "call_maus_akku",
		char: "Kevin",
		title: "Kevin (Azubi)",
		text: "'Ich hab hier fünf Mäuse aus dem Schrank, die alle nicht gehen. Die sind alle kaputt. Sollen wir neue bestellen?'\n\nEs sind Funkmäuse. Der Schrank ist die Fundgrube für Geräte, die jemand abgegeben hat, weil sie 'nicht mehr gingen'.",
		opts: [
			{
				t: "Nachbestellen, ist einfacher",
				m: 5, f: 15, a: -5, c: 15,
				r: "Du bestellst fünf neue Mäuse. Frau Elster fragt schriftlich nach, warum eine Abteilung mit acht Personen im laufenden Jahr dreiundzwanzig Mäuse verbraucht hat. Eine gute Antwort darauf gibt es nicht."
			},
			{
				t: "Mit ihm den ganzen Schrank durchgehen",
				m: 35, f: -20, a: 5, c: -15,
				rep: { "Kevin": 10 },
				r: "Ihr braucht über eine halbe Stunde und findet dabei zwei funktionierende Tastaturen, ein Netzteil, das seit 2019 gesucht wird, und einen Karton mit Kabeln für Geräte, die es nicht mehr gibt. Der Schrank ist jetzt ein Lager statt eines Friedhofs."
			},
			{
				t: "'Kaputt ist kaputt, wegwerfen.'",
				m: 5, f: 5, a: 0, c: 10,
				rep: { "Kevin": -5 },
				r: "Kevin entsorgt fünf funktionierende Mäuse, weil du es gesagt hast. Er würde alles entsorgen, was du sagst, und genau darin liegt das Problem mit Sätzen, die man nebenbei sagt."
			},
			{
				t: "Ihn Batterien einlegen lassen",
				m: 10, f: -5, a: 0, c: -5,
				rep: { "Kevin": 5 },
				r: "Vier von fünf Mäusen leben. Kevin ist so begeistert, als hätte er sie selbst gebaut, und schreibt die Erkenntnis in das Wiki, das er neuerdings führt. Der Eintrag heißt 'Batterien'."
			}
		]
	},
	{
		id: "call_teams_immer_gelb",
		title: "Frau Kirchner (Auftragsbearbeitung)",
		text: "'Mein Status springt ständig auf Gelb, obwohl ich am Platz bin. Mein Abteilungsleiter hat mich schon zweimal darauf angesprochen.'\n\nSie ist am Platz. Sie liest gerade Verträge auf Papier, weil das ihr Beruf ist.",
		opts: [
			{
				t: "Die Zeit bis zur Abwesenheit hochsetzen",
				m: 10, f: -5, a: 0, c: 5,
				r: "Du setzt die Schwelle von fünf auf dreißig Minuten. Das Problem ist weg, und die Frage, warum jemand seine Mitarbeiter an einem Farbpunkt misst, bleibt unbeantwortet im Raum stehen."
			},
			{
				t: "Ihr ein Programm einrichten, das Aktivität simuliert",
				m: 15, f: 5, a: -5, c: 20,
				r: "Du installierst ein winziges Werkzeug, das alle vier Minuten den Mauszeiger um einen Pixel bewegt. Sie ist ab sofort permanent grün, immer erreichbar und für ihren Abteilungsleiter ein Vorbild."
			},
			{
				t: "Mit dem Abteilungsleiter sprechen",
				m: 20, f: -10, a: 15, c: 10,
				rep: { "Chantal": 5 },
				r: "Du erklärst ihm, dass der Punkt keine Anwesenheit misst, sondern Tastenanschläge. Er hört zu, nickt und sagt: 'Und wie mess ich es dann?' Auf diese Frage hat auch die IT keine Antwort."
			},
			{
				t: "'Bewegen Sie ab und zu die Maus.'",
				m: 5, f: 10, a: 0, c: 5,
				r: "Der Rat ist so praktisch wie entwürdigend, und ihr wisst das beide. Sie bedankt sich trotzdem und legt auf. Ab morgen liegt bei ihr ein Kugelschreiber quer unter der Maus, der langsam wegrollt."
			}
		]
	},
	{
		id: "call_falle_rueckruf",
		title: "Ihre eigene Durchwahl",
		text: "'Guten Tag, hier ist noch einmal der Support. Wir hatten vorhin telefoniert wegen der Störung.'\n\nIhr hattet nicht telefoniert. Auf dem Display steht deine eigene Durchwahl.",
		opts: [
			{
				t: "Mitspielen und Zeit schinden",
				m: 25, f: 10, a: -10, c: 5,
				r: "Du hältst ihn zwanzig Minuten hin, erfindest Systemnamen und lässt ihn Wartezeiten aussitzen. Es macht großen Spaß und bringt keinerlei Erkenntnis, außer dass er sehr geduldig ist. Geduld ist bei diesen Leuten Berufsvoraussetzung."
			},
			{
				t: "Den Fernzugriff freigeben, klingt echt",
				m: 15, f: -5, a: -5, c: 35,
				r: "Du gibst die Sitzung frei. Er bedankt sich, arbeitet vier Minuten sichtbar an Einstellungen und zwei Minuten unsichtbar an etwas anderem. Was in diesen zwei Minuten passiert ist, wirst du erst nächste Woche verstehen."
			},
			{
				t: "Fragen, um welche Störung es geht",
				m: 10, f: 0, a: 10, c: 0,
				r: "Er beschreibt eine Störung, die es überall geben könnte, in Worten, die überall passen. Als du nach einer Ticketnummer fragst, nennt er eine mit dem falschen Format. Danach ist die Leitung tot."
			},
			{
				t: "Auflegen und die Zentrale informieren",
				m: 10, f: 0, a: 5, c: -10,
				rep: { "Gabi": 5 },
				r: "Du legst auf und sagst Gabi Bescheid. Sie hängt binnen zehn Minuten einen Zettel an die Empfangstheke, auf dem steht, wie eine gefälschte Rufnummer aussieht. Es ist der wirksamste Aushang in der Geschichte dieses Hauses."
			}
		]
	},
	{
		id: "call_drucker_konfetti",
		char: "Gabi",
		title: "Gabi (Empfang)",
		text: "'Der große Drucker wirft die Blätter nur noch in Schnipseln aus. Es sieht aus wie Konfetti. Soll ich das aufsammeln?'\n\nDer große Drucker hat keinen Schredder. Der Schredder steht daneben.",
		opts: [
			{
				t: "'Sammeln Sie es auf, ich komme später.'",
				m: 5, f: 15, a: 0, c: 5,
				rep: { "Gabi": -5 },
				r: "Gabi sammelt eine halbe Stunde lang Konfetti aus einem Gerät, das genau dafür gebaut wurde. Als du später kommst, ist der Behälter leer und das Missverständnis vollständig gefestigt."
			},
			{
				t: "Fragen, wo genau sie das Papier hineingelegt hat",
				m: 5, f: 0, a: 0, c: -5,
				rep: { "Gabi": 5 },
				r: "In den Schredder. Es sind zwei baugleiche graue Kästen nebeneinander, und der Aufkleber am Schredder ist vor Jahren abgefallen. Ihr lacht beide, und du bringst am Nachmittag einen neuen Aufkleber vorbei."
			},
			{
				t: "Hingehen und nachsehen",
				m: 15, f: -10, a: 5, c: -5,
				rep: { "Gabi": 5 },
				r: "Du läufst runter und stehst vor zwei grauen Kästen, von denen einer voller Papierschnipsel ist. Die Diagnose dauert vier Sekunden, der Weg dorthin vierzehn Minuten. So sieht dieser Beruf meistens aus."
			}
		]
	},
	{
		id: "call_lena_bewerbung",
		title: "Praktikantin Lena",
		text: "'Können Sie sich das kurz ansehen? Ich bewerbe mich für die Ausbildung hier und muss meinen Lebenslauf als PDF hochladen. Aber das Formular sagt immer, die Datei sei zu groß.'\n\nSie fragt dich, weil sie sonst niemanden fragen kann.",
		opts: [
			{
				t: "Fragen, warum sie sich hier bewirbt",
				m: 10, f: 0, a: 5, c: 0,
				r: "'Weil hier alle nett sind.' Sie sagt es ohne Ironie, und du stehst mit dem Hörer in der Hand da und überlegst, ob du widersprechen sollst. Du widersprichst nicht."
			},
			{
				t: "'Dafür bin ich nicht zuständig.'",
				m: 2, f: 10, a: 0, c: 0,
				r: "Formal richtig. Sie entschuldigt sich für die Störung, legt auf und lädt am Abend von zu Hause hoch. Die Bewerbung kommt an. Angenommen wird sie trotzdem nicht, und du wirst nie erfahren, ob das zusammenhängt."
			},
			{
				t: "Die Datei verkleinern und hochladen",
				m: 15, f: -5, a: 0, c: -5,
				r: "Sie hat den Lebenslauf eingescannt statt exportiert, in 600 dpi, in Farbe. Zwei Minuten Arbeit, und die Bewerbung ist raus. Sie sagt dreimal danke und einmal 'ich schulde Ihnen was', was sie ernst meint."
			},
			{
				t: "Ihr zeigen, wie es geht, statt es zu machen",
				m: 25, f: -10, a: 5, c: -10,
				r: "Du erklärst Auflösung, Dateigrößen und warum ein Bild von Text kein Text ist. Sie versteht es beim zweiten Anlauf und lädt selbst hoch. Das ist die einzige Art von Hilfe, die beim nächsten Mal noch wirkt."
			}
		]
	},
	{
		id: "call_update_mittag",
		title: "Herr Kunz (Lager)",
		text: "'Der Rechner hier im Lager macht seit einer Stunde ein Update. \"Bitte nicht ausschalten.\" Ich kann nichts einbuchen. Die Lieferung steht auf dem Hof.'\n\nDer Rechner im Lager läuft rund um die Uhr und wurde deshalb seit vierzehn Monaten nicht neu gestartet.",
		opts: [
			{
				t: "Ihn auf Papier buchen lassen",
				m: 10, f: 0, a: 0, c: -5,
				r: "Er notiert die Lieferung auf einem Lieferschein und trägt sie nach. Es ist der einzige Vorgang des Tages, der ohne Strom auskommt, und er dauert elf Minuten statt einer Stunde."
			},
			{
				t: "Warten und alle zwanzig Minuten nachschauen",
				m: 30, f: 10, a: 10, c: 0,
				r: "Das Update braucht insgesamt zwei Stunden und siebzehn Minuten. Du hast in der Zeit dreimal nachgesehen und dabei jedes Mal denselben Balken bei 41 Prozent gefunden. Die Lieferung stand solange auf dem Hof."
			},
			{
				t: "Ihm das Ersatzgerät bringen",
				m: 25, f: -15, a: 0, c: -10,
				r: "Du schleppst ein Leihgerät ins Lager, meldest ihn an und die Buchungen laufen. Das Gerät bleibt dort. In vier Monaten wird jemand fragen, warum im Lager zwei Rechner stehen, und niemand wird es wissen."
			},
			{
				t: "'Einfach ausschalten, wird schon.'",
				m: 5, f: 10, a: -5, c: 20,
				r: "Er zieht den Stecker. Der Rechner startet nicht mehr. Was danach kommt, ist keine Störung mehr, sondern eine Neuinstallation, und die passiert nicht heute."
			}
		]
	},

	{
		id: "call_kevin_formatiert",
		reqStory: "path_kevin_formatiert",
		char: "Kevin",
		title: "Kevin (Azubi)",
		text: "'Ich hab neu aufgesetzt, wie du gesagt hast! War gar nicht so schwer.'\n\nPause.\n\n'Ich hab nur die Treiber noch nicht gefunden. Und das Netzwerk. Und das Programm für die Zeiterfassung. Aber Fortnite läuft.'",
		opts: [
			{
				t: "Nachfragen, wie er an das Installationsmedium kam",
				m: 10, f: 0, a: 10, c: 10,
				next: "path_kevin_rack",
				r: "Von einer Seite, die er über eine Suchmaschine gefunden hat. Die Datei hieß 'Windows_Original_2024_FINAL.iso'. Ihr habt beide ein Problem, aber nur einer von euch weiß gerade, welches."
			},
			{
				t: "Selbst hingehen und es sauber neu machen",
				m: 45, f: -25, a: 5, c: -15,
				rep: { "Kevin": 10 },
				r: "Du setzt den Rechner mit dem Firmenabbild neu auf, richtig lizenziert und mit allem drauf. Es kostet dich den halben Vormittag. Kevin sitzt daneben und schaut zu, und diesmal fragt er nach jedem Schritt, warum."
			},
			{
				t: "'Hauptsache es läuft.'",
				m: 5, f: 15, a: -5, c: 15,
				rep: { "Kevin": 5 },
				next: "path_kevin_rack",
				r: "Der Rechner läuft ohne Virenschutz, ohne Verschlüsselung und mit einem Betriebssystem unklarer Herkunft im Firmennetz. Kevin ist glücklich. Der Auditor, falls er je anruft, wird es weniger sein."
			},
			{
				t: "Ihm die Treiberliste schicken und selbst machen lassen",
				m: 15, f: -5, a: 5, c: -5,
				rep: { "Kevin": 5 },
				next: "path_kevin_rack",
				r: "Du schickst ihm eine Liste und lässt ihn arbeiten. Er braucht drei Stunden und meldet danach stolz, dass alles läuft. Es läuft tatsächlich. Der Ton am Rechner fehlt, aber das merkt er erst nächsten Monat."
			}
		]
	},
	{
		id: "call_kevin_gerettet",
		reqStory: "path_kevin_gerettet",
		char: "Kevin",
		title: "Kevin (Azubi)",
		text: "'Du kriegst ja alles wieder hin. Ich hab meiner Mutter erzählt, dass du Daten aus dem Nichts zurückholen kannst.'\n\nPause.\n\n'Sie ist gleich unten am Empfang. Mit ihrem Laptop. Da sind Fotos von 2009 drauf.'",
		opts: [
			{
				t: "Ihm zeigen, wie er es selbst macht",
				m: 30, f: -15, a: 0, c: -5,
				rep: { "Kevin": 10 },
				r: "Ihr geht gemeinsam runter und du lässt ihn machen, während du danebenstehst. Er findet das lose Kabel selbst. Seine Mutter bedankt sich bei ihm, nicht bei dir, und Kevin ist an diesem Tag um zwei Zentimeter gewachsen."
			},
			{
				t: "'Sag ihr, ich bin in einem Meeting.'",
				m: 5, f: 10, a: 0, c: 0,
				rep: { "Kevin": -10 },
				r: "Kevin geht runter und sagt es ihr. Sie fährt wieder nach Hause. Er erwähnt es nie wieder, aber er fragt dich in den nächsten Wochen auch nichts mehr, was er nicht unbedingt fragen muss."
			},
			{
				t: "Kurz runtergehen und nachsehen",
				m: 25, f: -10, a: 5, c: 10,
				rep: { "Kevin": 10 },
				r: "Es ist ein Kabel, das nicht steckt, und eine Festplatte, die noch läuft. Zehn Minuten, danach weint Kevins Mutter am Empfang vor Erleichterung. Gabi sieht das alles und wird es weitererzählen."
			},
			{
				t: "Kevin erklären, warum das nicht geht",
				m: 15, f: -5, a: 5, c: -10,
				rep: { "Kevin": -5 },
				r: "Du erklärst ihm den Unterschied zwischen Firmengerät und Privatgerät, zwischen Arbeitszeit und Gefallen. Er versteht es und schämt sich. Es ist die richtige Entscheidung und fühlt sich trotzdem mies an."
			}
		]
	},
	{
		id: "call_chantal_schach",
		reqStory: "path_chantal_schach",
		char: "Chantal",
		title: "Chantal (Marketing)",
		text: "'Wegen der Sache mit dem Modeversand. Ich glaube, wir sind da falsch gestartet.'\n\nSie klingt vorsichtig. Sie weiß, dass du etwas weißt, und du weißt, dass sie das weiß.",
		opts: [
			{
				t: "Sagen, dass Erpressung im Haus nichts zu suchen hat",
				m: 15, f: -5, a: 10, c: -10,
				rep: { "Chantal": -10 },
				r: "Du sagst es ruhig und ohne Drohung. Sie schweigt lange und antwortet dann: 'Sie haben ja recht.' Sie meint es sogar. Trotzdem ist zwischen euch etwas, das sich nicht mehr auflöst."
			},
			{
				t: "Anbieten, die Sache zu vergessen",
				m: 10, f: 0, a: -10, c: -5,
				rep: { "Chantal": 10 },
				r: "Du sagst, du hättest ohnehin ein schlechtes Gedächtnis. Sie lacht erleichtert. Ab sofort bekommst du von ihr Termine im Kalender, bevor sie andere fragt, und in der Teeküche steht manchmal ein Kaffee für dich bereit."
			},
			{
				t: "Um eine Gegenleistung bitten",
				m: 10, f: 0, a: -5, c: 15,
				rep: { "Chantal": -5 },
				r: "Du schlägst vor, dass die IT künftig in ihren Rundmails nicht mehr vorkommt. Sie sagt sofort zu. Der Handel funktioniert, aber ihr behandelt euch ab jetzt wie zwei Leute, die etwas voneinander haben."
			}
		]
	},
	{
		id: "call_chantal_offen",
		reqStory: "path_chantal_offen",
		title: "Vertrieb, Empfang, Buchhaltung (nacheinander)",
		text: "'Chantal hat gesagt, Sie schalten das frei, wenn man höflich fragt.'\n\nDas war der Wortlaut beim ersten Anruf. Beim vierten heißt es nur noch: 'Chantal hat gesagt, Sie machen das.'",
		opts: [
			{
				t: "Allen dasselbe freischalten, aus Gleichbehandlung",
				m: 20, f: 0, a: -5, c: 25,
				r: "Wenn eine Person es darf, dürfen es alle. Das ist gerecht, nachvollziehbar und öffnet die Firewall für sechzig Leute. Im Netzwerkbericht des nächsten Monats steht ein Modeversand auf Platz eins."
			},
			{
				t: "Jede Anfrage einzeln prüfen",
				m: 25, f: -10, a: 20, c: 0,
				r: "Du prüfst jede Anfrage, was formal korrekt ist und den halben Nachmittag frisst. Am Ende hast du dreimal ja und einmal nein gesagt, und das eine Nein wird derjenige nie vergessen."
			},
			{
				t: "Chantal bitten, das richtigzustellen",
				m: 10, f: 0, a: 5, c: -5,
				rep: { "Chantal": -5 },
				r: "Sie stellt es richtig, in einem Beitrag, der mit 'Kleines Missverständnis' beginnt und die IT dabei zweimal als 'streng, aber fair' bezeichnet. Die Anrufe hören auf. Die Bezeichnung bleibt."
			},
			{
				t: "Die Ausnahme zurücknehmen und alles begründen",
				m: 30, f: -15, a: 15, c: -10,
				r: "Du sperrst wieder, schreibst eine Rundmail mit der Begründung und hältst vier Beschwerden aus. Nach zwei Tagen ist Ruhe, und die Regel gilt wieder für alle, auch für Chantal."
			}
		]
	},
	{
		id: "call_aluhut_folie",
		reqStory: "path_aluhut_folie",
		title: "Der Verschwörungstheoretiker",
		text: "'Es funktioniert! Seit der Folie ist Ruhe! Ich habe im Einkauf davon erzählt, und jetzt haben drei Kollegen auch Folie.'\n\nDrei Router im Einkauf sind in Alufolie gewickelt. Der Einkauf hat kein WLAN mehr.",
		opts: [
			{
				t: "Ihm eine offizielle Abschirmung versprechen",
				m: 10, f: 10, a: -5, c: 10,
				r: "Du kündigst eine 'zertifizierte Abschirmlösung' an, die du bestellen wirst. Er ist begeistert und entfernt die Folie freiwillig, um die Lieferung nicht zu gefährden. Die Lieferung kommt nie, und er fragt monatlich nach."
			},
			{
				t: "Ihm Kopfhörer schenken, damit Ruhe ist",
				rem: "headphones",
				m: 10, f: 0, a: -15, c: 5,
				next: "path_folie_bleibt",
				r: "Du gibst ihm deine Kopfhörer und erklärst, sie seien abhörsicher. Er trägt sie ab sofort den ganzen Tag, hört niemanden mehr und ruft entsprechend seltener an. Deine Kopfhörer sind weg und dein Nachmittag ruhig."
			},
			{
				t: "Hingehen und die Folie kommentarlos entfernen",
				m: 20, f: -10, a: 10, c: -10,
				r: "Du wickelst drei Router aus und sagst dabei kein Wort. Herr Aluhut steht daneben und deutet dein Schweigen als Bestätigung, dass die Sache 'von oben' angeordnet wurde. Das WLAN läuft wieder."
			},
			{
				t: "Erklären, dass die Folie das Signal blockiert",
				m: 15, f: -5, a: 15, c: 0,
				next: "path_folie_bleibt",
				r: "'Genau! Deshalb funktioniert sie ja!' Du hast recht, er hat recht, und ihr redet über zwei verschiedene Dinge. Die Folie bleibt, bis der Abteilungsleiter fragt, warum niemand mehr Mails bekommt."
			}
		]
	},
	{
		id: "call_audit_testserver",
		reqStory: "path_audit_testserver",
		title: "Der externe Auditor",
		text: "'Ich habe Ihre Aussage vermerkt: Testsysteme. Dann senden Sie mir bitte bis heute Abend das Testprotokoll und die Abgrenzung zur Produktivumgebung.'\n\nEs gibt keine Abgrenzung. Es gibt auch kein Testprotokoll.",
		opts: [
			{
				t: "Frau Elster um die Beschaffungsunterlagen bitten",
				m: 30, f: -10, a: 5, c: -15,
				rep: { "Frau Elster": 10 },
				r: "Sie hat jede Rechnung seit 2016 abgeheftet und findet in vierzig Minuten heraus, dass zwölf Lizenzen tatsächlich bezahlt wurden. Aus 500 zu 2 wird 500 zu 12. Es ist immer noch schlimm, aber es ist belegt."
			},
			{
				t: "Ein Protokoll zusammenschreiben",
				m: 45, f: -20, a: 15, c: 15,
				r: "Du baust vier Stunden lang ein Dokument, das nachträglich beschreibt, was nie geplant war. Es ist formal vollständig, inhaltlich hohl und wird vermutlich durchgehen. Der halbe Arbeitstag ist weg."
			},
			{
				t: "Die Aussage zurückziehen",
				m: 20, f: -5, a: 10, c: -10,
				r: "Du rufst zurück und sagst, die Einordnung als Testsystem sei falsch gewesen. Er notiert es ohne Häme. Ehrlichkeit macht den Bericht nicht besser, aber sie beendet die Spirale, in der du gerade steckst."
			},
			{
				t: "Nicht mehr antworten",
				m: 5, f: 20, a: -5, c: 30,
				r: "Du ignorierst die Frist. Der Bericht geht ohne deine Stellungnahme raus, mit dem Vermerk 'keine Rückmeldung trotz Aufforderung'. Von allen Formulierungen in diesem Bericht ist das die teuerste."
			}
		]
	},
	{
		id: "call_cnc_emulator",
		reqStory: "path_cnc_emulator",
		title: "Produktionsleitung",
		text: "'Der Trick mit dem Stick war großartig. Wir haben vier weitere Maschinen mit demselben Problem. Machen Sie das da auch?'\n\nEs gibt einen Stick. Er steckt in der Fräse und wird dort bleiben, solange die Produktion läuft.",
		opts: [
			{
				t: "Vier weitere Sticks beschaffen",
				m: 20, f: -5, a: 0, c: 5,
				r: "Du bestellst vier Sticks, richtest sie ein und beschriftest sie. Es ist eine saubere Lösung für ein Problem, das eigentlich 'Maschinenpark von 1998' heißt, aber die Produktion läuft, und darum geht es heute."
			},
			{
				t: "Die Abbilder zentral bereitstellen",
				m: 40, f: -20, a: 5, c: -20,
				r: "Du legst die Disketten-Abbilder auf ein Netzlaufwerk und dokumentierst den Weg dorthin. Beim nächsten Ausfall braucht es dich nicht mehr. So sieht Arbeit aus, die sich verzinst."
			},
			{
				t: "Auf das Ersatzteilbudget verweisen",
				m: 10, f: 5, a: 5, c: 10,
				rep: { "Frau Elster": -5 },
				r: "Du erklärst, dass Maschinen aus dem letzten Jahrhundert eine Investitionsentscheidung sind und keine IT-Störung. Sachlich stimmt jedes Wort. Die Produktion hört trotzdem nur: 'Die IT will nicht.'"
			},
			{
				t: "Den Stick wieder mitnehmen",
				rem: "usb_stick",
				m: 10, f: 10, a: 5, c: 15,
				r: "Du holst deinen Stick zurück. Die Fräse steht zwölf Minuten später wieder still, diesmal mitten in einem Werkstück. Du hast dein Werkzeug zurück und dafür einen Vorgang, der bis zur Geschäftsleitung wandert."
			}
		]
	},
	{
		id: "call_egon_blau",
		reqStory: "path_egon_blau",
		char: "Egon",
		title: "Hausmeister Egon",
		text: "'Du, ich hab den Kollegen von der Wartungsfirma erzählt, dass Blau bei uns warm macht. Der hat gelacht und gesagt, das sei falsch angeschlossen. Seit 2011.'\n\nPause.\n\n'Der will das jetzt richtig machen. Kostet zweitausend.'",
		opts: [
			{
				t: "Für die Reparatur argumentieren",
				m: 20, f: -10, a: 10, c: -15,
				rep: { "Egon": 10 },
				r: "Du schreibst eine Begründung, in der das Wort 'Serverausfall' dreimal vorkommt, und schickst sie an die Geschäftsleitung. Sie wird genehmigt. Egon erzählt monatelang, dass die IT einmal etwas durchbekommen hat."
			},
			{
				t: "Einen Aufkleber vorschlagen statt der Reparatur",
				m: 10, f: 5, a: 0, c: 0,
				rep: { "Egon": 5 },
				r: "Ihr klebt zwei Zettel an die Anlage: 'BLAU = WARM' und 'ROT = KALT'. Es kostet nichts, hält vermutlich zehn Jahre und ist genau die Art Lösung, für die dieses Gebäude gebaut wurde."
			},
			{
				t: "Nichts tun, es funktioniert ja",
				m: 5, f: 10, a: 0, c: 10,
				r: "Ihr lasst alles, wie es ist. Beim nächsten Mal steht jemand anderes vor der Anlage, jemand ohne dieses Wissen, und der wird auf Rot drehen. Nur bist du dann vielleicht nicht am Telefon."
			}
		]
	},
	{
		id: "call_umfrage_folge",
		reqStory: "path_umfrage_ehrlich",
		char: "Dr. Wichtig",
		title: "CEO Dr. Wichtig",
		text: "'Müller, mir liegt eine anonyme Rückmeldung aus der IT vor. Sehr kritisch, sehr ausführlich. Ich möchte darüber sprechen.'\n\nPause.\n\n'Nicht darüber, wer es war. Über den Inhalt. Ich finde ihn nämlich interessant.'",
		opts: [
			{
				t: "Zu der Rückmeldung stehen",
				m: 25, f: -10, a: 5, c: 10,
				rep: { "Dr. Wichtig": 10 },
				r: "Du sagst, dass die Rückmeldung von dir ist, und gehst die Punkte mit ihm durch. Er hört fünfzehn Minuten zu, unterbricht dreimal und sagt am Ende: 'Schreiben Sie das auf.' Es passiert danach nichts, aber er weiß es jetzt."
			},
			{
				t: "Über den Inhalt reden, ohne die Urheberschaft",
				m: 20, f: -5, a: 10, c: 0,
				r: "Ihr sprecht vierzig Minuten über Budgets, als ginge es um jemand anderen. Es ist ein gutes Gespräch, geführt von zwei Leuten, die beide wissen, dass sie sich verstellen. Ergebnisse gibt es keine."
			},
			{
				t: "Bestreiten, dass sie aus der IT kommt",
				m: 10, f: 10, a: 5, c: 20,
				rep: { "Dr. Wichtig": -10 },
				r: "Die IT besteht aus einer Person. Das weiß er, das weißt du, und trotzdem sagst du es. Er lässt es durchgehen, ohne zu widersprechen, und genau das ist das Unangenehme daran."
			},
			{
				t: "Zurückfragen, wie anonym die Befragung war",
				m: 15, f: 0, a: 15, c: 15,
				rep: { "Dr. Wichtig": -5 },
				r: "Er weicht aus und spricht von 'aggregierten Erkenntnissen'. Bei einer Abteilung mit einem Mitarbeiter ist die Aggregation eine überschaubare Rechenaufgabe. Er beendet das Gespräch kurz danach."
			}
		]
	},

	/* Dreiteiler wave 1 (v5.0): cross-pool follow-up of srv_wlp_1 - the
	   ketchup travels through the ventilation into the calls pool. */
	{
		id: "call_wlp_geruch",
		reqStory: "srv_wlp_ketchup",
		reqStoryAge: 1,
		title: "Anruf: Geruchsbelästigung",
		text: "'Hier ist Frau Sonntag, Buchhaltung. Bei uns zieht seit heute früh ein Geruch durch die Lüftung. Wie von einer Imbissbude. Herr Blaschke sagt, der Strang läuft über Ihren Serverraum?'",
		opts: [
			{
				t: "'Wir arbeiten mit Hochdruck daran.'",
				m: 5, f: 0, a: 0, c: 5,
				r: "'Und woran genau?' — 'An der Ursache.' Sie notiert hörbar mit."
			},
			{
				t: "'Das ist die neue Kühlflüssigkeit.'",
				m: 5, f: 0, a: 0, c: 10,
				r: "Pause. 'Die riecht nach Currywurst?' — 'Bio-basiert.' Klick."
			},
			{
				t: "'Wir lassen das durch einen Fachbetrieb prüfen.'",
				m: 5, f: 5, a: 0, c: -5,
				r: "'Ein Fachbetrieb. Sehr gut.' Frau Sonntag klingt hörbar besänftigt — das Wort ordnet ihre Welt. Es gibt keinen Fachbetrieb, aber es gibt jetzt einen Vorgang, und das ist in der Buchhaltung fast dasselbe."
			}
		]
	},

	/* Dreiteiler wave 2 (v5.0): cross-pool follow-up of cof_deka_1 - the
	   decaf pilot slows the whole house down, and the phone knows first. */
	{
		id: "call_deka_stimmung",
		char: "Gabi",
		reqStory: "cof_deka_brav",
		reqStoryAge: 1,
		title: "Anruf vom Empfang",
		text: "'Sag mal', Gabi klingt gedämpft, als würde sie die Hand um den Hörer legen, 'ist bei euch auch alles so... langsam? Die halbe Buchhaltung telefoniert in Zeitlupe, und im zweiten Stock hat jemand den Aufzug genommen. Für ein Stockwerk. Nach unten.'",
		opts: [
			{
				t: "'Das ist der Koffein-Pilot. Wir sterben alle.'",
				m: 5, f: 0, a: -5, c: 0,
				r: "Gabi schweigt kurz. 'DAS ist das Projekt mit dem Aushang?' Sie legt auf. Zwei Minuten später hörst du es durchs Treppenhaus: Der Empfang hat eine eigene Maschine, und Gabi hat eine Durchsage-Stimme."
			},
			{
				t: "'Mir fällt nichts auf.' Langsam sprechen.",
				m: 5, f: 5, a: -5, c: 0,
				r: "Du dehnst jedes Wort wie Kaugummi. Gabi lacht, bis sie husten muss. Es ist der erste Ton von Freude, den dieses Haus heute produziert hat."
			},
			{
				t: "'Führ Protokoll. Für die Nachwelt.'",
				m: 5, f: 5, a: -5, c: 0,
				r: "Gabi nimmt es ernster als gedacht. Im Laufe des Tages entsteht am Empfang eine Liste: 'Chronik der langsamen Tage', mit Uhrzeitspalte und Beobachtungen. Sie wird sie aufheben. Solche Dokumente überleben Firmen."
			}
		]
	},

	/* -------------------------------------------------------------------
	   Dreiteiler wave 4 (v5.0): call chains. The week's fresh dimension
	   here: callers who come BACK. One chain runs in reverse - the call is
	   the opener, the consequence walks in as a sidequest (sq_brandt_1).
	   Duplicate check against the stock (2026-08): Pizza/misdials (5x),
	   Fax (6x), the callback SERVICE gag, the distressed-intern calls
	   (Lena in the basement, the crying intern) and the title "Ticket
	   #4711" (Frau Elster) are taken - hence the secret-help chain
	   inverts the status (power calls, quietly), and the ancient ticket
	   carries the LOW number an ancient ticket would actually have.
	   ------------------------------------------------------------------- */
	{
		id: "call_diskret_1",
		title: "Ein Freund der Firma",
		text: "Die Stimme ist gedämpft, aber gewohnt, dass man ihr zuhört. 'Hier spricht... sagen wir: ein Freund der Firma. Oberste Etage. Es geht um ein Bildschirm-Problem, und es darf dazu keine Akte geben. Keine Mail, kein Ticket, kein Flurgespräch. Verstehen wir uns?'",
		opts: [
			{
				t: "'Dafür gibt es das Ticketsystem. Für alle.'",
				m: 5, f: 0, a: -5, c: 10,
				r: "Eine sehr lange Pause. 'Interessant', sagt die Stimme, und das Wort fällt wie ein Aktenvermerk. Dann legt sie auf. Du hast das Richtige getan. Du wirst herausfinden, was es kostet."
			},
			{
				t: "Diskret hochgehen und nachsehen",
				m: 15, f: -5, a: -5, c: 0,
				next: "call_diskret_gefallen",
				r: "Eckbüro, Auszeichnungen an der Wand, und mittendrin ein Monitor, dessen Bild seitwärts steht. Strg, Alt, Pfeiltaste — drei Sekunden. Er nickt staatsmännisch, als hättet ihr gemeinsam eine Krise abgewendet. 'Das bleibt unter uns.'"
			},
			{
				t: "Die Lösung am Telefon durchflüstern",
				m: 15, f: 0, a: 10, c: 0,
				r: "'Strg... Alt... welcher Pfeil? Es gibt VIER.' Ihr braucht drei Anläufe, einmal steht das Bild kopfüber, und er atmet dabei wie ein Mann, der Schlimmes gesehen hat. Dann ist es gerade. Er legt ohne Gruß auf. Das war der Dank."
			}
		]
	},
	{
		id: "call_diskret_2",
		reqStory: "call_diskret_gefallen",
		reqStoryAge: 1,
		title: "Der Freund ruft wieder an",
		text: "Dieselbe gedämpfte Stimme, diesmal ohne Vorrede: 'Das Symbol unten ist weg. Das für die... Tabellen. Und mein Kalender zeigt eine Woche an, die es nicht gibt.' Eine Pause, dann, beinahe freundlich: 'Sie sind jetzt meine Nummer.'",
		opts: [
			{
				t: "Wieder diskret hochgehen",
				m: 20, f: 5, a: 5, c: -5,
				r: "Taskleiste repariert, Kalenderansicht zurückgestellt. Er telefoniert währenddessen und deutet nur auf Dinge. Auf dem Rückweg begegnest du seiner Assistentin, die dich ansieht, als wüsste sie genau, was du jetzt bist: die Nummer."
			},
			{
				t: "'Es gibt dafür ein ganzes Team. Es ist gut.'",
				m: 10, f: 0, a: -5, c: 5,
				r: "Wieder die lange Pause, aber diesmal hältst du sie aus. 'Wie Sie meinen.' Es klingt nicht nach Einverständnis. Es klingt nach einem Vermerk. Trotzdem: Auflegen fühlt sich heute an wie Feierabend."
			},
			{
				t: "Kevin schicken. Sollen die sich kennenlernen.",
				m: 10, f: 5, a: 0, c: 5,
				rep: { "Kevin": -5 },
				r: "Kevin kommt nach einer Stunde zurück, stiller als sonst. 'Er hat mich Justin genannt. Dreimal.' Mehr sagt er nicht. Er wird es dir nicht vergessen."
			}
		]
	},
	{
		id: "call_diskret_3",
		reqStory: "call_diskret_gefallen",
		reqStoryAge: 2,
		title: "Die Revanche",
		text: "In deinem Postfach liegt ein laminierter Parkausweis: 'Stellplatz 2 — auf Widerruf'. Kein Absender, kein Anschreiben. Stellplatz 2 liegt direkt neben Stellplatz 1, und auf Stellplatz 1 parkt jeden Morgen der Wagen der Geschäftsleitung. Das ist keine Parkkarte. Das ist eine Beförderung in Sichtweite.",
		opts: [
			{
				t: "Den Ausweis kommentarlos zurück ins Hauspostfach legen",
				m: 5, f: 0, a: 5, c: -5,
				r: "Manche Geschenke sind Leinen. Du legst ihn zurück, ohne Notiz, so wie er kam. Falls das jemand als Antwort versteht, ist es die richtige."
			},
			{
				t: "Annehmen und ab jetzt vorne parken",
				m: 5, f: 0, a: -10, c: 5,
				r: "Kein Schneescharren mehr am hintersten Platz, kein Pfützen-Slalom. Der Preis: jeden Morgen dieselben vier Meter Smalltalk-Gefahr. Du übst auf dem Weg schon mal ein Nicken, das nach allem und nichts aussieht."
			},
			{
				t: "Den Ausweis Kevin schenken",
				m: 5, f: 0, a: -5, c: 5,
				rep: { "Kevin": 5 },
				r: "Kevin fragt nicht, woher. Er fragt nie. Anderntags steht sein Kleinwagen auf Stellplatz 2, frisch gewaschen, und die Geschäftsleitung grüßt ihn beim Aussteigen mit kleinem Zögern. Kevin grüßt zurück, würdevoll. Das Gleichgewicht des Hauses hat sich verschoben."
			}
		]
	},
	{
		id: "call_kalt_1",
		title: "Digitalisierungslösungen",
		text: "'Guten Tag, Brandt mein Name, ich darf Ihnen ganz kurz unsere Digitalisierungslösung vorstellen—' Er redet ohne Punkt. Ganzheitlich, skalierbar, KI-gestützt. Er möchte 'am liebsten direkt mit der Entscheiderebene' sprechen, aber du gehst ihm auch. Jeder geht ihm.",
		opts: [
			{
				t: "'Kein Interesse. Wirklich nicht.'",
				m: 5, f: 0, a: 5, c: 0,
				r: "'Verstehe ich VOLL', sagt er und redet weiter. Du legst mitten in 'skalierbar' auf. Es fühlt sich unhöflich an und richtig."
			},
			{
				t: "'Kommen Sie doch einfach mal persönlich vorbei.'",
				m: 5, f: 0, a: -5, c: 0,
				next: "call_brandt_kommt",
				r: "Es ist der älteste Trick der Abwimmel-Kunst: eine Einladung, die keine ist. Brandt ist kurz still. 'Das... ja! Das machen wir!' Du legst zufrieden auf. Der Satz hat noch nie Konsequenzen gehabt."
			},
			{
				t: "'Schicken Sie mir Unterlagen.'",
				m: 5, f: 5, a: 0, c: 0,
				r: "Die Mail kommt binnen Minuten: vierzig Megabyte, ein PDF namens 'Journey_final_v7_NEU'. Es wird ungeöffnet alt werden."
			}
		]
	},
	{
		id: "call_grabowski_1",
		title: "Ticket 108",
		text: "'Grabowski hier. Ich bin seit sieben Jahren in Rente, aber das tut nichts zur Sache.' Er klingt wie jemand, der Briefe mit Füller schreibt. 'Ihr Vorgänger hat mir zugesagt, dass Ticket 108 gelöst wird. Ich rufe seitdem einmal im Jahr an. Jetzt sind Sie dran, junger Mann.'",
		opts: [
			{
				t: "Das Ticket ernsthaft raussuchen",
				m: 20, f: -10, a: 5, c: 0,
				next: "call_grabowski_akte",
				r: "Es existiert. Ticket 108, angelegt vor deiner Zeit, Status: offen. Das älteste offene Ticket der Firma. Betreff: 'Umlaute im Etikettendruck fehlerhaft'. Du druckst es aus. So etwas druckt man aus."
			},
			{
				t: "'Das System kennt kein Ticket 108.'",
				m: 5, f: 5, a: 0, c: 5,
				r: "'Das hat Ihr Vorgänger auch gesagt. 2019.' Er klingt nicht einmal enttäuscht, nur geduldig. Das ist das Schlimmste daran. 'Bis nächstes Jahr dann.' Er legt zuerst auf."
			},
			{
				t: "'Erzählen Sie mir von damals.'",
				m: 15, f: 5, a: -10, c: 0,
				r: "Herr Grabowski erzählt: von Etiketten, vom Vorgänger, von einer Betriebsfeier, bei der der Drucker eine Rolle spielte. Zwanzig Minuten Firmengeschichte aus erster Hand. Das Ticket bleibt offen, doch ihr verabschiedet euch wie alte Bekannte. 'Bis nächstes Jahr', sagt er, und es klingt nach Vorfreude."
			}
		]
	},
	{
		id: "call_grabowski_2",
		reqStory: "call_grabowski_akte",
		reqStoryAge: 1,
		title: "Sieben Jahre, eine Checkbox",
		text: "Ticket 108 liegt ausgedruckt auf deinem Tisch, und die Lösung ist eine Demütigung für alle Beteiligten: Das Encoding-Problem von damals ist seit Jahren eine Checkbox in den Druckeinstellungen. Ein Haken. Sieben Jahre, drei Vorgänger, ein Haken.",
		opts: [
			{
				t: "Haken setzen, Ticket still schließen",
				m: 10, f: 0, a: -5, c: 0,
				r: "Status: gelöst. Keine Rückmeldung erforderlich. Das älteste Ticket der Firma stirbt lautlos in einem Dropdown. Herr Grabowski wird nächstes Jahr anrufen und es von einem Fremden erfahren. Du hast ein Ticket gelöst und einen Moment verschenkt."
			},
			{
				t: "Haken setzen, testen, Herrn Grabowski anrufen",
				m: 25, f: -10, a: -15, c: -5,
				r: "Das Testetikett druckt 'Grüße aus Lübeck' mit allen Umlauten. Du rufst ihn an und sagst den Satz: 'Ticket 108 ist gelöst.' Herr Grabowski schweigt sehr lange. 'Sieben Jahre', sagt er dann, feierlich. 'Das werde ich dem Kegelverein erzählen.' Es ist das ehrlichste Lob deiner Laufbahn."
			}
		]
	},
	{
		id: "call_tennis_1",
		title: "Bitte um Rückruf",
		text: "Auf deiner Tastatur klebt ein Zettel aus fremder Hand: 'Herr Leuchter, Niederlassung Süd, bittet um Rückruf. Wichtig.' Du rufst an. Es klingelt lange, dann eine Kollegin: 'Der Herr Leuchter ist gerade im Gespräch. Soll ich was ausrichten?'",
		opts: [
			{
				t: "Zettel zu den anderen Zetteln legen",
				m: 5, f: 10, a: 0, c: 5,
				r: "Wenn es wichtig ist, ruft er wieder an. So lautet das Gesetz, und das Gesetz hat dich selten enttäuscht. Der Zettel kommt auf den Stapel, und der Stapel sagt nichts dazu."
			},
			{
				t: "Nachricht hinterlassen: bittet um Rückruf",
				m: 5, f: 0, a: 0, c: 0,
				next: "call_tennis_laeuft",
				r: "'Richte ich aus.' Du legst auf und ahnst, was du gerade gestartet hast. Irgendwo in Süddeutschland klebt jetzt ein Zettel auf einer Tastatur, und er trägt deinen Namen."
			},
			{
				t: "'Ich versuche es später wieder. Und wieder.'",
				m: 10, f: -5, a: 5, c: 0,
				next: "call_tennis_laeuft",
				r: "Zweiter Versuch: Besprechung. Dritter: Mittagspause. Beim vierten nimmt jemand ab, der nur vertretungsweise da ist und niemanden kennt, auch Herrn Leuchter nicht. Du gibst für heute auf, aber ehrenvoll."
			}
		]
	},
	{
		id: "call_tennis_2",
		reqStory: "call_tennis_laeuft",
		reqStoryAge: 1,
		title: "Der Gegenzettel",
		text: "Ein neuer Zettel, andere Handschrift: 'Herr Leuchter hat zurückgerufen. Sie waren im Serverraum. Er bittet erneut um Rückruf.' Darunter, kleiner: 'Er sagt, es wird langsam absurd.' Du rufst an. 'Der Herr Leuchter ist gerade in ein Meeting gegangen.' Natürlich ist er das.",
		opts: [
			{
				t: "Per Mail einen festen Telefonmoment ausmachen",
				m: 10, f: -5, a: 5, c: 0,
				r: "Du schreibst: 'Vorschlag: morgen, gleich als Erstes, ich rufe an.' Die Antwort kommt prompt und aus einem Kalender-Automaten: Herr Leuchter ist morgen ganztägig im Workshop. Der Automat wünscht eine gute Restwoche."
			},
			{
				t: "Zurückrufen lassen ausrichten lassen",
				m: 5, f: 5, a: 5, c: 0,
				r: "Die Kollegin in Süd notiert es mit hörbarem Vergnügen. 'Sie beide sind hier schon ein Begriff.' Ihr seid ein Running Gag einer Niederlassung, die du nie betreten hast. Auch eine Form von Bekanntheit."
			},
			{
				t: "Einen Brief schreiben. Papier, Umschlag, Marke.",
				m: 15, f: -5, a: -5, c: 0,
				r: "Drei Sätze mit Füller, Hauspost nach Süd. Ein Brief kann nicht in ein Meeting gehen — das ist seine Stärke. Die Antwort, hörst du später, hängt am schwarzen Brett der Niederlassung. Erreicht habt ihr euch immer noch nicht, doch ihr seid jetzt Brieffreunde."
			}
		]
	},
	{
		id: "call_tennis_3",
		reqStory: "call_tennis_laeuft",
		reqStoryAge: 2,
		title: "Durchgekommen",
		text: "Das Telefon klingelt, du hebst ab, und eine Stimme sagt: 'Leuchter.' Ihr schweigt beide einen Moment, wie zwei Bergsteiger auf dem Gipfel. Dann sagt er es: 'Ich weiß ehrlich gesagt nicht mehr, worum es ging.' Du siehst auf deinen Zettelstapel. Du weißt es auch nicht.",
		opts: [
			{
				t: "Gemeinsam rekonstruieren, was es gewesen sein könnte",
				m: 15, f: 0, a: -10, c: 0,
				r: "Ihr geht die Möglichkeiten durch: die Schnittstelle? Die Zugänge für den Neuen? Nach fünf Minuten einigt ihr euch darauf, dass es sich vermutlich von selbst erledigt hat — die stabilste Lösung, die diese Firma kennt. Ihr lacht. Es ist das erste Gespräch mit Süd seit Jahren, das beiden gefallen hat."
			},
			{
				t: "'Wollen wir es dabei belassen?'",
				m: 5, f: 5, a: -10, c: 0,
				r: "'Gerne.' Ihr legt gleichzeitig auf. Sauberer hätte man es nicht lösen können."
			}
		]
	},
];
