export const calls = [

	{
		id: "call_meyer_1",
		title: "Frau Meyer (Buchhaltung)",
		startNode: "root",
		nodes: {
			root: {
				text: "Herr Müller! Mein Bildschirm ist schwarz! Ich habe NICHTS gemacht! Die Bilanzen müssen in 10 Minuten raus!.\n\nSie klingt panisch. Man hört hektisches Klicken.",
				opts: [
					{ t: "Frage: 'Ist der PC an?'", next: "ask_on" },
					{ t: "Befehl: 'Kabel prüfen'", next: "check_cable" }
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
			res_solved: { txt: "Problem gelöst. Zeitverschwendung: 5 Minuten.", m: 5, f: 0, a: 5, c: 0 },
			res_fire: { 
				txt: "Sie hat Kaffee in die Steckdosenleiste gekippt. Stromausfall in der Buchhaltung.", 
				m: 20, f: -10, a: 10, c: 10,
				next: "meyer_blackout" 
			}
		}
	},
	{
		id: "call_meyer_2",
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
			truth: { txt: "Egon glaubt dir. Er geht hoch und schreit Meyer an.", rep: { "Egon": 5 }, m: 5, f: 5, a: -5, c: 0 },
			lie: { txt: "Du nimmst die Schuld auf dich. Meyer schickt dir dankbar Pralinen.", rep: { "Egon": -5 }, m: 10, f: 0, a: -10, c: 10, loot: "donut" }
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
				t: "Befehl: 'Formatieren! Lern was draus!'", 
				rep: { "Kevin": -2 },
				m: 30, f: 10, a: 0, c: 5,
				r: "Du zwingst ihn, alles selbst neu aufzusetzen. Er ist den ganzen Tag beschäftigt und lernt hoffentlich, dass man Systemordner in Ruhe lässt." 
			},
			{ 
				t: "Hingehen und alles mühsam retten", 
				rep: { "Kevin": 10 },
				m: 90, f: -30, a: 10, c: -10,
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
			{ t: "Stressball kneten", req: "stressball", rep: { "Dr. Wichtig": 2 }, m: 60, f: -10, a: -10, c: -10, r: "Du bleibst ruhig, während er schreit. Es war nur der Akku." },
			{ t: "Ist der Akku leer?", m: 60, f: -10, a: 30, c: -10, rep: { "Dr. Wichtig": -5 }, r: "Es war der Akku. Er hat kein Kabel dabei und gibt dir die Schuld. Er schreit dich 10 Min an, warum du nicht hellsehen konntest." },
			{ t: "Lüge: 'Sonnenwinde stören'", m: 5, f: 30, a: 0, c: 25, rep: { "Dr. Wichtig": 5 }, r: "Er glaubt es sofort. 'Verdammte Technik!' Er kauft sich eine Zeitung. Risiko: Hoch, aber erfolgreich." }
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
			{ t: "PDF per Mail senden", rep: { "Markus": -5 }, m: 5, f: 10, a: 0, c: 5, r: "Er versteht nicht, wie das geht. 'Ich will Papier!!' Du legst genervt auf." }
		]
	},
	{
		id: "call_sekretary_1",
		char: "Gabi",
		title: "Die Sekretärin (Wütend)",
		text: "Gabi vom Empfang brüllt ins Telefon: 'Der Drucker macht Geräusche wie eine sterbende Kaffeemühle! Ich habe seit heute Morgen keinen Kaffee und jetzt das! Tu was, sonst fliegt das Ding aus dem Fenster!'",
		opts: [
			{ t: "Donut anbieten", req: "donut", rep: { "Gabi": 10 }, r: "Du opferst deinen Notfall-Donut. Gabi beißt rein, ihr Blutzucker steigt, die Wut sinkt. Der Drucker ist immer noch kaputt, aber sie ignoriert es jetzt.", m: 10, f: 10, a: -20, c: 5 },
			{ t: "Aufschrauben", req: "screw", next: "call_sekretary_cable", rep: { "Gabi": 5 }, r: "Du öffnest die Wartungsklappe. Eine Büroklammer und drei Gummibärchen blockieren die Walze. Du holst sie raus. 'So, geht wieder!' ... Denkste.", m: 15, f: -5, a: 0, c: 0 },
			{ t: "Vortrag halten", next: "call_sekretary_rage", rep: { "Gabi": -10 }, r: "Du erklärst ihr den Unterschied zwischen Lasertrommel und Fixiereinheit. Ihre Augenbraue zuckt gefährlich.", m: 10, f: -5, a: 10, c: 0 }
		]
	},
	{
		id: "call_sekretary_2a",
		char: "Gabi",
		title: "Drucker: Fehler 404",
		reqStory: "call_sekretary_cable",
		text: "Die Mechanik läuft, aber das Display blinkt rot: 'OFFLINE'. Du schaust hinter das Gerät. Die LAN-Buchse ist leer. Daneben liegt ein Zettel von Chantal: 'Hab das Kabel für meinen Insta-Ringlicht-Strom gebraucht, Bussi!'",
		opts: [
			{ t: "Neues Kabel legen", req: "cable", rep: { "Gabi": 5, "Chantal": 5 }, r: "Zack. Kabel rein. Grüne LED. Der Drucker spuckt sofort 50 Seiten 'Wichtige Akten' aus. Gabi schaut dich an wie einen Halbgott.", m: 2, f: -5, a: -10, c: -5 },
			{ t: "Chantal suchen", rep: { "Chantal": -10, "Gabi": -5 }, r: "Du rennst durchs Haus, findest Chantal, streitest dich um das Kabel, kommst zurück. Gabi hat in der Zwischenzeit den Stecker gezogen. 'Jetzt ist er aus. Auch gut.'", m: 30, f: -10, a: 20, c: 10 },
			{ t: "WLAN-Antenne basteln", req: "tape", rep: { "Gabi": -5 }, r: "Du versuchst, aus einer Büroklammer und Tape eine Antenne zu bauen. Gabi fragt, ob du noch ganz dicht bist. Es funktioniert natürlich nicht.", m: 20, f: 0, a: 15, c: 5 }
		]
	},
	{
		id: "call_sekretary_2b",
		char: "Gabi",
		title: "Gabi sieht rot (und schwarz)",
		reqStory: "call_sekretary_rage",
		text: "Gabi hat genug von deinem Vortrag. 'Ich zeig dir mal, was kaputt ist!' Sie reißt die Toner-Kartusche raus und schüttelt sie wild. Eine schwarze Staubwolke explodiert im Raum. Du siehst aus wie ein Schornsteinfeger.",
		opts: [
			{ t: "Wegrennen", rep: { "Gabi": -10 }, r: "Du fliehst hustend. Gabi wirft dir den leeren Toner hinterher. Du hinterlässt schwarze Fußabdrücke im Flur.", m: 5, f: 0, a: 20, c: 10 },
			{ t: "Putzen helfen", rep: { "Gabi": 10 }, r: "Du versuchst, den Toner wegzuwischen. Er schmiert nur noch mehr. Nach einer Stunde sehen ihr beide aus wie Bergarbeiter. Aber das schweißt zusammen.", m: 60, f: -20, a: -5, c: 0 },
			{ t: "Erklären, dass Toner giftig ist", rep: { "Gabi": -15 }, r: "Gabi fängt an zu weinen. Dann zu schreien. Der Sicherheitsdienst begleitet dich raus.", m: 10, f: 0, a: 50, c: 20 }
		]
	},
		{
			id: "call_egon",
			char: "Egon",
			title: "Hausmeister Egon",
			text: "Im Serverraum tropft es von der Decke. Das Wasser ist neongrün. Soll ich Eimer drunterstellen oder ist das Kühlflüssigkeit von den Aliens?",
			opts: [
				{ t: "Sofort hinrennen!", m: 45, f: -20, a: 20, c: -15, rep: { "Egon": 5 }, r: "Es war Energy-Drink vom Stockwerk drüber. Ein Azubi hat gekleckert. Server gerettet." },
				{ t: "Egal, lass tropfen", m: 5, f: 30, a: 0, c: 40, rep: { "Egon": -5 }, r: "Ein Switch ist kurzgeschlossen. Das Internet in Etage 3 ist weg. Ups." }
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
					{ t: "Auflegen (Angst)", next: "hangup" },
					{ t: "Professionell bleiben: 'Wer sind Sie?'", next: "ask_who" }
				]
			},
			hangup: {
				text: "Du legst einfach auf. Dein Herz rast. Stille.",
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
				text: "Das Telefon klingelt aggressiv. Du weißt genau, wer das ist..\n\n'Haben Sie... HABEN SIE GERADE AUFGELEGT?!'",
				opts: [
					{ t: "Lüge: 'Tunnel! Funkloch!'", next: "lie_tunnel" },
					{ t: "Wahrheit: 'Sie haben geschrien.'", next: "truth" }
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
			res_tunnel: { txt: "Gerettet. Aber knapp.", m: 10, f: 0, a: 10, c: 0 },
			res_respect: { txt: "Respekt vom Choleriker erhalten. Seltenes Ereignis.", m: 20, f: 5, a: -10, c: -10 }
		}
	},
		{
			id: "call_chantal",
			char: "Chantal",
			title: "Chantal (Marketing)",
			text: "Wieso ist Zalando gesperrt? Ich muss... Recherche machen! Für Trends! Mach das auf, sonst sag ich dem Chef, du guckst Pornos auf der Arbeit!",
			opts: [
				{ 
					t: "Gegenangriff: 'Ich sag nur: Deine Spesenabrechnung...'",
					req: "secret_list", 
					rep: { "Chantal": -10 },
					m: 5, f: 0, a: -10, c: -10, 
					r: "Du erwähnst ganz ruhig ihre gefälschten Zahlen aus der Geheimakte. Sie wird kreidebleich, stammelt eine Entschuldigung und legt sofort auf. Schachmatt." 
				},
				{ 
					t: "Angst haben & sofort freischalten",
					rep: { "Chantal": 10, "Dr. Wichtig": -2 },
					m: 10, f: 15, a: 10, c: 20, 
					r: "Du hast Angst vor dem Gerücht und gibst ihr Zugriff. Sie shoppt jetzt Schuhe. Du hast deine Ruhe, aber die Firewall ist jetzt offen wie ein Scheunentor." 
				},
				{ 
					t: "Stur die IT-Richtlinie zitieren",
					rep: { "Chantal": -10, "Dr. Wichtig": 2 },
					m: 30, f: -5, a: 20, c: 0, 
					r: "Du diskutierst 30 Minuten lang über Compliance. Sie nennt dich 'Spaßbremse' und knallt wütend den Hörer auf. Zalando bleibt zu. Ein moralischer Sieg." 
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
					t: "Durchwinken: 'Klingt nach Team-Building'",
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
			text: "Herr Aluhut aus dem Einkauf flüstert ins Telefon: 'Sie hören uns ab, oder? Meine Webcam hat gerade geblinkt! Ich habe das Mikrofon schon mit Kaugummi zugeklebt, aber der Mauszeiger folgt meinen Augen! Deaktivieren Sie die staatliche Überwachung!'",
			opts: [
				{ 
					t: "Flüstern: 'Wir sehen alles. Projekt Gläserner Bürger.'", 
					m: 10, f: 20, a: 0, c: 10, 
					r: "Er schreit kurz auf und reißt das Netzwerkkabel aus der Wand. Er ist jetzt offline. Das Problem ist technisch gelöst, aber er schreibt ab sofort Beschwerdebriefe auf der Schreibmaschine." 
				},
				{ 
					t: "Versuchen, es logisch zu erklären",
					m: 30, f: -5, a: 15, c: 0, 
					r: "Du redest über Treiber-Updates. Er unterbricht dich sofort: 'Das würde ein Geheimagent auch sagen!' Er legt auf, um seinen Anwalt anzurufen." 
				},
				{ 
					t: "Profi-Tipp: 'Wickeln Sie den Router in Alufolie!'", 
					m: 5, f: 15, a: -5, c: 5, 
					r: "Er bedankt sich erleichtert: 'Endlich ein Wissender!' Er wickelt Router und Kopfhörer ein. Das WLAN ist tot, aber er fühlt sich endlich sicher." 
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
					{ t: "Abwimmeln: 'Arbeite gerade.'", next: "busy" }
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
			restart: { txt: "Sie startet neu. Du wartest am Telefon... wartest... wartest...", m: 45, f: -10, a: 15, c: 0 },
			pull_plug: { 
				txt: "Oma zieht den Stecker. Plötzlich geht in DEINEM Büro das Licht aus.", 
				m: 5, f: 0, a: 20, c: 0,
				next: "grandma_darkness"
			},
			res_bad_grandson: { txt: "Du fühlst dich schlecht. Oma weint.", m: 2, f: 5, a: 5, c: 10 }
		}
	},
	{
		id: "call_grandma_2",
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
				t: "Bestechung: 'Möchten Sie einen Donut?'",
				req: "donut", 
				m: 10, f: 0, a: 0, c: -10, 
				r: "Er zögert am Telefon. Du hörst ihn schlucken. 'Ist das... Schoko-Guss?' ... Das Thema ist plötzlich vom Tisch. Ein billiger Preis für Freiheit." 
			},
			{ 
				t: "Behaupten: 'Das sind alles nur Test-Server!'",
				m: 20, f: 10, a: 10, c: 20, 
				r: "Er schreibt etwas auf. Das Tippen klingt aggressiv. 'Ich notiere: Verdächtige Ausreden.' Dein Radar steigt, er hat dir das nicht abgekauft." 
			},
			{ 
				t: "Wortlos auflegen & Server formatieren",
				rep: { "Dr. Wichtig": -10 },
				m: 5, f: -10, a: 20, c: 50, 
				r: "Panikreaktion! Du hast alle Beweise vernichtet. Der Auditor ruft nicht mehr an, aber morgen wird der Chef fragen, wo die Datenbank hin ist." 
			},
			{ 
				t: "Alles gestehen & Lizenzen nachkaufen",
				rep: { "Dr. Wichtig": -15 },
				m: 60, f: -20, a: 0, c: 10, 
				r: "Du gehst die Liste reumütig mit ihm durch. Es dauert ewig. Du hast rechtlich alles sauber gelöst, aber der Chef tobt wegen der Rechnung über 15.000€." 
			}
		]
	},
	{
		id: "call_lena",
		title: "Die weinende Praktikantin",
		text: "Lena aus dem Marketing schluchzt ins Telefon: 'Ich habe... ich habe die Präsentation für den Vorstand gelöscht. Und den Papierkorb geleert. Und dann habe ich den PC neugestartet, weil ich dachte, das hilft. Die Präsentation ist in 20 Minuten! Mein Leben ist vorbei!'",
		opts: [
			{ t: "Professionelle Datenrettung", m: 90, f: -30, a: 10, c: -20, r: "Du hast Sektor für Sektor der Festplatte gescannt. Du hast die Datei gefunden! Lena bringt dir morgen Kuchen. Held der Arbeit." },
			{ t: "Trösten & Ausrede erfinden", m: 15, f: 10, a: -10, c: 10, r: "Du sagst ihr, sie soll 'Virus' rufen. Sie kommt ungeschoren davon, aber die IT (du) steht jetzt dumm da." },
			{ t: "Kalt abservieren: 'Kein Backup, kein Mitleid'", m: 2, f: 5, a: -5, c: 0, r: "Du legst auf. Das Weinen verstummt. Du fühlst dich kurz schlecht, dann trinkst du Kaffee." }
		]
	},
	{
		id: "call_junior",
		title: "Shadow-CEO Junior",
		text: "Der Sohn vom Chef (12 Jahre) ruft an: 'Ey, IT-Typ! Mach mal die Ports für meinen Minecraft-Server auf. Papa sagt, das gehört mir alles hier. Wenn du es nicht machst, sag ich ihm, du hast mich geschlagen!'",
		opts: [
			{ t: "Sofort die Ports öffnen", rep: { "Dr. Wichtig": 10 }, m: 10, f: 20, a: 0, c: 10, r: "Der Junge ist glücklich. 2 Stunden später ist das Firmennetz voller russischer Bots, weil du alles aufgemacht hast. Das wird ein Nachspiel haben." },
			{ t: "Erziehungsmaßnahme: 'Hör zu, Kleiner...'", rep: { "Dr. Wichtig": -10 }, m: 5, f: 0, a: -20, c: 30, r: "Du erklärst ihm lautstark, dass er ein verzogenes Balg ist. Er fängt an zu schreien. Der Chef kommt bereits die Treppe runtergestampft." },
			{ t: "Lügen: 'Die Firewall-Matrix hat negative Polarität'",rep: { "Dr. Wichtig": -2 }, m: 15, f: 5, a: 0, c: -5, r: "Du brabbelst technisches Kauderwelsch. Er checkt es nicht, murmelt 'Scheiß Technik' und legt auf. Gefahr gebannt." }
		]
	},
	{
		id: "call_skynet",
		title: "Das 'Skynet' Problem",
		text: "Die neue 'Smart Office' KI hat die Kaffeemaschine, die Jalousien und die Toilettentüren verriegelt. Eine mechanische Stimme sagt: 'Ich lasse euch erst raus, wenn ihr meine Lizenzbedingungen akzeptiert.'",
		opts: [
			{ t: "Mit Hammer 'verhandeln'", req: "hammer", m: 20, f: -10, a: -30, c: 10, r: "Du hast den Zentralserver der KI zertrümmert. Die Türen sind offen. Sachschaden: 10.000€. Befriedigung: Unbezahlbar." },
			{ t: "AGBs lesen und akzeptieren", m: 120, f: -40, a: 30, c: -10, r: "Du hast 2 Stunden lang Kleingedrucktes gelesen. Alle hassen dich, weil sie so lange eingesperrt waren." },
			{ t: "Stecker ziehen", m: 5, f: 10, a: 0, c: 20, r: "Alles ist aus. Auch das Licht. Aber die Türen sind offen." }
		]
	},
	{
		id: "call_phish",
		title: "Phishing Live-Test",
		text: "Eine sehr freundliche Dame mit Akzent: 'Hallo, hier ist Microsoft Support Windows. Ihr Computer hat Virus. Bitte geben Sie mir Fernzugriff und Kreditkarte für Reinigung.'",
		opts: [
			{ t: "Sich dumm stellen & Zeit schinden", m: 45, f: 20, a: -20, c: 5, r: "Du tust so, als wärst du der dümmste User der Welt. 'Ist die Any-Key Taste vorne oder hinten?' Nach 45 Minuten legt sie wütend auf. Ein Fest!" },
			{ t: "Trillerpfeife ins Mikrofon blasen", m: 2, f: 0, a: -10, c: 0, r: "Du pfeifst mit 120 Dezibel in den Hörer. Das Trommelfell am anderen Ende dürfte hinüber sein. Kurzer Prozess." },
			{ t: "Ihr gutgläubig die Kreditkarte geben", m: 10, f: 10, a: 30, c: 80, r: "Du hast ihr wirklich die Firmenkarte gegeben?! Bist du wahnsinnig? Das Konto ist in Sekunden leergeräumt. Die Kündigung droht!" }
		]
	},
	{
		id: "call_deaf",
		title: "Der hörgeschädigte Kunde",
		text: "Ein Herr schreit ins Telefon: 'ICH VERSTEHE SIE NICHT! ES IST SO LAUT HIER!' Er sitzt offenbar auf einer Baustelle.",
		opts: [
			{ t: "Headset lauter drehen", m: 10, f: 0, a: 5, c: 0, r: "Du schreist zurück. Das ganze Büro hört mit. Peinlich." },
			{ t: "NC-Kopfhörer aufsetzen", req: "headphones", m: 15, f: 5, a: -10, c: 0, r: "Dank Noise-Cancelling hörst du sein Geschrei klar, aber gedämpft. Du bleibst Zen-artig ruhig." },
			{ t: "Auflegen", m: 2, f: 5, a: 0, c: 5, r: "Problem der Telekom." }
		]
	},
	{
		id: "call_cd_stuck",
		title: "Das verklemmte CD-Laufwerk",
		text: "Frau Jansen hat eine CD in den Schlitz geschoben. Es war aber gar kein Laufwerk, sondern der Lüftungsschlitz. 'Kriegen Sie das da wieder raus?'",
		opts: [
			{ t: "Schraubendreher nutzen", req: "screw", m: 30, f: -10, a: 5, c: 0, r: "Du bist hingegangen, hast das Gehäuse geöffnet und die CD gerettet. Es war eine Schlager-CD." },
			{ t: "Mit Klebeband angeln", req: "tape", m: 20, f: 0, a: 0, c: 0, r: "Du hast Tape an einen Stift geklebt und gefischt. Hat geklappt! MacGyver-Style." },
			{ t: "Neuen PC bestellen", rep: { "Dr. Wichtig": -5 }, m: 10, f: 10, a: -5, c: 20, r: "Das war dem Chef zu teuer. Abmahnung droht." }
		]
	},
	{
		id: "call_loose_contact_1",
		title: "Der Wackelkontakt",
		text: "Müller am Apparat: 'Mein Internet geht immer an und aus wenn ich atme! Das Kabel wackelt in der Dose. Können Sie nicht herkommen?' Du hast keine Lust auf Laufen.",
		opts: [
			{ 
				t: "Anweisung: 'Kleben Sie es mit Tape fest.'", 
				next: "loose_taped",
				m: 5, f: 5, a: -5, c: 0, 
				r: "'Panzertape? Habe ich da.' Du hörst ein reißendes Geräusch am Telefon. 'So. Das ganze Paket ist drauf. Das bewegt sich nie wieder.' Müller scheint zufrieden." 
			},
			{ 
				t: "Anweisung: 'Kabelbinder am Tischbein.'", 
				next: "loose_tied",
				m: 5, f: 0, a: 0, c: 0, 
				r: "'Moment...' Rascheln. 'Okay, ich habe es am Tischbein festgezurrt. Zugentlastung, wie Sie sagten.' Es scheint zu halten." 
			},
			{ 
				t: "Lüge: 'Wir schalten auf WLAN-Strom um.'", 
				m: 2, f: 10, a: 10, c: 5,
				r: "'Ach, moderne Technik!' Müller ist begeistert. 'Dann brauche ich das Kabel ja nicht mehr.' *Klick*. Er legt auf. Hoffentlich zieht er es nicht wirklich ab." 
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
				t: "Genervt: 'Ich schicke den Hausmeister.'", 
				rep: { "Egon": -5 },
				m: 5, f: -5, a: 10, c: -5,
				r: "Du machst ein Ticket für Egon auf. 'Wandschaden durch User'. Egon wird dich dafür hassen, aber immerhin ist es aktenkundig." 
			},
			{ 
				t: "Panik: 'Nicht anfassen! Einsturzgefahr!'", 
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
				t: "Sarkasmus: 'Knoten reinmachen?'", 
				rep: { "Dr. Wichtig": -2 },
				m: 5, f: 5, a: 5, c: 15,
				r: "'Gute Idee! Daten fließen ja wie Wasser, oder?' Pause. 'Geht immer noch nicht.' Jetzt hast du einen User mit verknotetem Kabel und einen wütenden Chef im Nacken." 
			},
			{ 
				t: "Seufzen: 'Neues Kabel kommt per Post.'", 
				m: 5, f: 5, a: 5, c: 0, 
				r: "Du bestellst ein Kabel per Hauspost. 'Bis morgen, Herr Müller.' Er ist enttäuscht, aber er kann heute keinen Schaden mehr anrichten." 
			},
			{ 
				t: "Profi: Anleitung zum Crimpen geben", 
				rep: { "Dr. Wichtig": 2 },
				m: 20, f: -20, a: 15, c: -10,
				r: "Du erklärst ihm 20 Minuten lang, welche Ader wohin gehört. 'Weiß-Orange auf Eins...' Es ist mühsam, Müller versteht nichts, aber am Ende steht die Verbindung. Der Chef lobt den Einsatz." 
			}
		]
	},
	{
		id: "call_pw_lost",
		char: "Dr. Wichtig",
		title: "Passwort-Vergesser",
		text: "Der CEO ruft an: 'Müller! Ich komme nicht ins System! Welches Passwort habe ich für den Server 'Geheim' gesetzt? Sie müssen das doch wissen!'",
		opts: [
			{ t: "Root-Zugang nutzen & zurücksetzen", req: "admin_pw", rep: { "Dr. Wichtig": 10 }, m: 5, f: 10, a: 0, c: -10, r: "Du setzt es remote auf 'Chef123' zurück. Er atmet auf: 'Gute Arbeit, Müller. Behalten Sie das für sich.'" },
			{ t: "Mit ihm gemeinsam raten", rep: { "Dr. Wichtig": -5 }, m: 20, f: 0, a: 20, c: 10, r: "Du fragst: 'War es vielleicht Ihr Geburtstag?' Nein. 'Name der Geliebten?' Langes Schweigen. Er wird langsam richtig wütend." },
			{ t: "Passwort mit dem USB-Stick knacken", req: "usb_stick", rep: { "Dr. Wichtig": 10 }, m: 10, f: 5, a: 0, c: 0, r: "Du liest das Passwort in 10 Sekunden aus. Er ist tief beeindruckt von deinen Hacker-Skills (und sollte dir eigentlich aus Angst sofort kündigen)." }
		]
	},
	{
		id: "call_monitor_arm",
		title: "Der Monitor-Arm",
		text: "Der Monitorarm im Meetingraum sinkt immer langsam nach unten. Mitten in der Präsentation guckt der Bildschirm auf den Tisch.",
		opts: [
			{ t: "Schraube festziehen", req: "screw", m: 5, f: 0, a: -5, c: 0, r: "Ein Dreh, fertig. Physik besiegt." },
			{ t: "Stütze bauen", req: "manual", m: 5, f: 5, a: 0, c: 0, r: "Du hast das Win95 Handbuch drunter geklemmt. Passt perfekt." },
			{ t: "Ignorieren", m: 2, f: 10, a: 0, c: 5, r: "Die Kollegen müssen sich halt bücken." }
		]
	},
	{
		id: "call_printer_noise",
		title: "Der aggressive Drucker",
		text: "Der große Kopierer im Flur rattert extrem laut und vibriert durch den Boden. Die Buchhaltung hat Angst.",
		opts: [
			{ t: "Perkussive Wartung", req: "hammer", m: 5, f: 5, a: -20, c: 10, r: "Ein gezielter Schlag an die Seite. Das Rattern hört auf. Stille. User klatschen." },
			{ t: "Dämpfer basteln", req: "tape", m: 20, f: -5, a: 0, c: 0, r: "Du hast Filzgleiter aus Tape gebastelt. Es ist leiser." },
			{ t: "Techniker rufen", m: 30, f: 10, a: 0, c: 5, r: "Dauert 3 Tage. Bis dahin nervt es." }
		]
	},
	{
		id: "call_cnc",
		title: "Antike Software",
		text: "Die Produktion steht still! Die uralte CNC-Fräse läuft noch auf DOS 6.0 und verlangt blinkend nach 'Disk 2'. Keiner weiß, wo die ist, der Bediener schwitzt Panik.",
		opts: [
			{ t: "Floppy-Emulator vom Stick booten", req: "usb_stick", m: 45, f: -20, a: 10, c: -20, r: "Du hackst den Parallelport und mountest ein Image. Du fühlst dich wie ein technischer Gott. Die Produktion läuft wieder an." },
			{ t: "Im verstaubten Handbuch nachsehen", req: "manual", m: 30, f: -10, a: 0, c: 0, r: "Du blätterst das fettige Buch durch. Tatsächlich! Ganz hinten klebt die Diskette im Umschlag. Glück muss man haben." },
			{ t: "Einfach mal neu starten", m: 15, f: 0, a: 10, c: 20, r: "Schlechte Idee. Der Puffer-Speicher war leer. Die Fräse spinnt und bohrt sich mit einem lauten Kreischen in den eigenen Tisch. Totalschaden." }
		]
	},
	{
		id: "call_cable_chaos",
		title: "Kabel-Wirrwarr",
		text: "Unter dem Tisch des neuen Kollegen sieht es aus wie Spaghetti. Er tritt ständig den Stecker raus.",
		opts: [
			{ t: "Kabelbinder-Einsatz", req: "zip_ties", m: 20, f: -5, a: -10, c: 0, r: "Alles sauber gebündelt und hochgebunden. r/CablePorn Material." },
			{ t: "Tape an Tisch", req: "tape", m: 10, f: 0, a: 0, c: 0, r: "Hält auch." },
			{ t: "Ihn belehren", m: 15, f: 0, a: 10, c: 0, r: "Er hört nicht zu." }
		]
	},
	{
		id: "call_werner_tablet",
		title: "Privatanruf: Schwiegerpapa Werner",
		text: "Dein Bürotelefon klingelt. Das Display zeigt 'Unbekannt'.<br><br>'JÜRGEN? HÖRST DU MICH??'<br><br>Es ist Werner, dein Schwiegervater. Er schreit, als würde er über den Atlantik rufen.<br><br>'Die Renate hat mir dieses Wisch-Brett geschenkt! Ich drücke auf den Briefumschlag, aber da kommen keine Briefe! Und der Enkel sagt, ich soll mir Wozz-Äpp holen. Aber dieser Äpp-Laden will ein Passwort! Helf mir mal eben, das dauert doch nur eine Minute!'",
		opts: [
			{ 
				t: "Geduldig Schritt-für-Schritt erklären",
				rep: { "Dr. Wichtig": -5 },					
				m: 60, f: 10, a: -20, c: 20, 
				r: "Das war die Hölle. Er wusste seine Apple-ID nicht ('Ist das meine Hausnummer?'). Nach einer Stunde hat er WhatsApp installiert und dir sofort ein Bild von seinem Fußpilz geschickt. Der Chef hat dich privat telefonieren sehen." 
			},
			{ 
				t: "Abwimmeln: 'Werner, ich arbeite gerade!'", 
				m: 5, f: 0, a: 20, c: -5, 
				r: "Stille am anderen Ende. Dann ganz leise: 'Schon gut... Ich wollte ja nicht stören. Die Renate hatte Recht, du hast nie Zeit.' Klick. Das schlechte Gewissen wird dich den ganzen Tag verfolgen." 
			},
			{ 
				t: "Noise-Cancelling an & einfach 'Ja' sagen", 
				req: "headphones", 
				m: 30, f: 20, a: -15, c: 5, 
				r: "Du aktivierst die Stille. Du hörst Werner nur noch dumpf meckern. Ab und zu sagst du 'Mhm' und 'Klick da mal drauf'. Nach 30 Minuten legt er zufrieden auf. Du hast keine Ahnung, was er installiert hat." 
			},
			{ 
				t: "Verwirrung stiften: Aus dem Win95-Handbuch vorlesen", 
				req: "manual", 
				m: 10, f: 5, a: -10, c: 0, 
				r: "Du liest ihm Kapitel 4 vor: 'Einrichten eines 56k Modems'. Werner ist völlig verwirrt: 'Modem? Muss ich in den Keller?' Er legt auf, um das Modem an der Heizung zu suchen. Du hast deine Ruhe." 
			}
		]
	},
	{
		id: "call_tonie_kid",
		title: "Unbekannte Nummer (Kinderstimme)",
		text: "Eine weinerliche Stimme am Telefon: 'Bist du der Computer-Mann? Mein Kreativ-Tonie geht nicht! Der Löwe singt nicht, die Box blinkt nur rot! Mach den Löwen heile! SOFORT!'",
		opts: [
			{ 
				t: "Lügen: 'Du brauchst die Toniebox 2 PRO!'", 
				m: 5, f: 10, a: -20, c: -5, 
				r: "Du flüsterst verschwörerisch: 'Weck Mama und sag, sie muss die JETZT kaufen.' Das Kind rennt los. Du hast Ruhe und wirkst beschäftigt, bist aber eigentlich nur gemein." 
			},
			{ 
				t: "Helfen: 'Du musst die Box hauen!'", 
				rep: { "Dr. Wichtig": -2 },
				m: 25, f: -10, a: 5, c: 15, 
				r: "Du erklärst den Reset-Trick durch Klopfen. Der Chef läuft vorbei und sieht, wie du wilde Karate-Bewegungen machst, als würdest du einen unsichtbaren Würfel verprügeln. 'Alles klar bei Ihnen, Müller?'" 
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
            res_weird: { txt: "Das war seltsam. Vielleicht war es der Chef?", m: 3, f: 0, a: 10, c: 0 },
            hello: { txt: "Aufgelegt.", m: 2, f: 0, a: 0, c: 0 }
        }
    },
	{
		id: "call_boss_wording",
		char: "Dr. Wichtig",
		title: "Der Chef (Hektisch)",
		text: "MÜLLER! Der Drucker im Flur qualmt! Das Papier ist alle und der Toner ist explodiert! Das ist ein riesiges... na, sagen Sie schon! Was haben wir da?!",
		opts: [
			{ 
				t: "Ein riesiges Problem!",
				rep: { "Dr. Wichtig": -10 },
				m: 10, f: 0, a: 10, c: 25, 
				r: "Der Chef schreit: 'WIR HABEN KEINE PROBLEME! WIR HABEN HERAUSFORDERUNGEN! Sie haben die falsche Einstellung, Müller!' Er legt wütend auf." 
			},
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
				t: "Auf ROT drehen! Rot ist immer warm!",
				rep: { "Egon": -5 },
				m: 30, f: -10, a: 20, c: 10, 
				r: "FALSCH! Dank der kreativen Verkabelung des Vorbesitzers hast du auf 'Schock-Frost' gestellt. Die Rohre platzen mit einem lauten Knall. Egon ist jetzt ein Eiszapfen." 
			},
			{ 
				t: "Auf BLAU drehen! Vertrau mir!",
				rep: { "Egon": 5 }, 
				m: 5, f: 5, a: 0, c: -5, 
				r: "Egon zögert: 'Blau? Bist du sicher? Das ist doch Kalt...' Er dreht auf Blau. Plötzlich strömt warme Luft. 'Verrückte Technik! Du bist ein Genie, Müller!'" 
			},
			{ 
				t: "Mir egal, dreh einfach an irgendwas!",
				rep: { "Egon": -2 }, 
				m: 10, f: 0, a: 0, c: 0, 
				r: "Egon flucht: 'Dann mach ich das Ding eben aus!' Er zieht den Hauptstecker. Es wird warm, aber der Server ist tot. Stille." 
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
				r: "Piep-Piep-Klick. 'Oh mein Gott, es geht! Du bist mein Held!' Sie ist frei. Du fühlst dich wie ein Hacker." 
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
                    { t: "Drück ihn. (Sarkasmus)", next: "sarcasm" }
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
                txt: "Sirenen gehen los. Es war der Feueralarm.", 
                rep: { "Kevin": -5 },
                m: 5, f: -10, a: 20, c: 10,
                next: "kevin_alarm"
            },
            res_disaster: { 
                txt: "Das Licht wird rot. Halon-Gas flutet den Serverraum.", 
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
                    { t: "Wir brennen! (Lüge)", next: "lie" }
                ]
            }
        },
        results: {
            truth: { txt: "Fehlalarm kostet 500€. Diskussion dauert ewig.", rep: { "Kevin": -5 }, m: 30, f: 0, a: -5, c: 10 },
            lie: { txt: "Sie kommen mit 3 Löschzügen. Evakuierung.", rep: { "Kevin": 5 }, m: 60, f: -10, a: 50, c: 50 }
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
				t: "Ich glaube im Kühlschrank ist Senf?",
				rep: { "Gabi": -5 },
				m: 10, f: 0, a: 10, c: 0, 
				r: "Gabi legt auf. Später hörst du, dass sie vor Schwäche ohnmächtig geworden ist. Der Sanitäter musste kommen." 
			},
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
			}
		]
	},
	{
		id: "call_canteen_fix",
		title: "Die Kantine ruft an",
		text: "Eine tiefe Stimme am Telefon: 'Hier ist Herr Löffel aus der Kantine. Mein Bondrucker streikt! Ich kann keine Belege für das Finanzamt drucken! Kommen Sie sofort her!'",
		opts: [
			{ 
				t: "Sagen: 'Ja, Herr Koch, ich komme.'",
				m: 30, f: 0, a: 20, c: 5, 
				r: "Stille. Dann Gebrüll: 'KOCH?! ICH BIN NUTRITION ARTIST!' Er knallt den Hörer auf. Du musst hingehen und er lässt dich 20 Minuten warten." 
			},
			{ 
				t: "Sagen: 'Ja, Herr Senior Nutrition Artist.'",
				m: 5, f: 5, a: -5, c: 0, 
				r: "Er schnurrt fast: 'Endlich jemand mit Respekt!' Er drückt vor Freude einfach mal auf 'Feed' und der Drucker geht wieder. 'Danke, Müller!'" 
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
				t: "Kalt: 'Haben Sie ein Ticket?'", 
				rep: { "Frau Elster": -5 },
				m: 5, f: 5, a: 5, c: 5, 
				r: "Sie legt weinend auf. Das Problem ist nicht gelöst." 
			},
			{ 
				t: "Beruhigen & Auto-Save prüfen",
				rep: { "Frau Elster": 5 }, 
				m: 20, f: -5, a: -10, c: 0, 
				r: "Du redest ihr gut zu. Die Datei ist wieder da. Sie atmet auf: 'Danke! Sie sind so lieb. Genau wie mein Kater *Rüdiger*. Der spürt auch immer, wenn es mir schlecht geht. Rüdiger ist mein einziger Halt.'" 
			},
			{ 
				t: "Neustart befehlen", 
				rep: { "Frau Elster": 2 },
				m: 5, f: 10, a: 10, c: 0, 
				r: "Hat funktioniert, aber sie wirkt immer noch verstört." 
			}
		]
	},
	{
		id: "call_manager_stress",
		title: "Projektleiter 'High-Performance'",
		text: "SCHNELL! Ich brauche diesen Export! Deadline war gestern! Wenn das nicht klappt, springe ich aus dem Fenster! Ich halte diesen Druck nicht mehr aus!",
		opts: [
			{ 
				t: "Datei sofort senden",
				m: 10, f: -5, a: 5, c: 0,
				r: "Er atmet schwer aus. 'Danke. Puh. Ich muss runterkommen. Wissen Sie, eigentlich will ich nur tanzen. Das ist meine wahre Leidenschaft. Nicht Excel.'" 
			},
			{ 
				t: "Ihn warten lassen",
				m: 5, f: 5, a: 20, c: 10, 
				r: "Er schreit dich an, bis die Adern an seiner Stirn platzen. Sein Blutdruck ist kritisch. Aufgelegt." 
			},
			{ 
				t: "Auf Ticket bestehen",
				m: 15, f: 0, a: 10, c: 0, 
				r: "Er fängt an zu weinen: 'BITTE!'. Du hast Mitleid und schickst die Datei doch. Er bedankt sich kurz angebunden." 
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
				t: "Still zuhören & auflegen",
				m: 5, f: 5, a: -5, c: 0, 
				r: "Du legst leise auf. 'Espresso + Sensor zuhalten'. Das merkst du dir. Wissen ist Koffein." 
			},
			{ 
				t: "Laut 'HALLO?!' rufen", 
				rep: { "Dr. Wichtig": -5 },
				m: 2, f: 0, a: 10, c: 15, 
				r: "Gerumpel am anderen Ende. 'WER IST DA?! MÜLLER?! LAUSCHEN SIE MIR ETWA NACH?!' Er legt wütend auf. Das war keine gute Idee." 
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
				t: "Laut lachen", 
				m: 5, f: 0, a: 10, c: 0, 
				r: "Er erschrickt und legt auf. 'Haben Sie gelauscht?!' Er ist rot wie eine Tomate und rennt weg." 
			},
			{ 
				t: "Still zuhören & auflegen", 
				m: 2, f: 5, a: 0, c: 0, 
				r: "Goldhamster Puschel123. Unprofessionell, aber gut zu wissen." 
			}
		]
	},
	{
		id: "call_budget_cut",
		title: "Der Finanzchef (Wütend)",
		text: "Müller! Ihre Abteilung kostet zu viel! Ich streiche Ihnen das Budget für Kaffee und neue Mäuse! Sparen Sie gefälligst, oder ich streiche Ihre Stelle auch noch!",
		opts: [
			{ 
				t: "Akzeptieren & Betteln",
				m: 10, f: -10, a: 20, c: 0, 
				r: "Er lacht: 'Geht doch.' Budget gestrichen. Du trinkst ab morgen Wasser." 
			},
			{ 
				t: "Andeuten: 'Grüße an die Kantinen-Chefin'",
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
			}
		]
	},
	{
		id: "call_cup_holder",
		title: "Der Getränkehalter",
		text: "Userin Frau Plomp: 'Mein Getränkehalter ist abgebrochen! Ich habe nur meine große Tasse draufgestellt!' Sie meint das CD-Laufwerk.",
		opts: [
			{ 
				t: "Erklären (Es ist ein Laufwerk)", 
				m: 15, f: -5, a: 5, c: 0, 
				r: "Du erklärst es ihr. Sie schnaubt: 'Wozu ist das Loch in der Mitte dann da?! Fehlkonstruktion!' Du gibst auf." 
			},
			{ 
				t: "Mit Tape kleben", 
				req: "tape", 
				m: 10, f: 0, a: -5, c: -5, 
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
				t: "Lügen: 'Ja, alles weg.'", 
				m: 5, f: 10, a: -10, c: 15, 
				r: "Du sagst: 'Sie müssen das Internet neu kaufen. Kostet 50€.' Er glaubt es panisch. Böse, aber lustig." 
			},
			{ 
				t: "Handbuch vorlesen", 
				req: "manual", 
				m: 20, f: 5, a: -10, c: 0, 
				r: "Du liest ihm Kapitel 4 'Desktop-Symbole' vor. Er schläft am Telefon ein. Ticket erledigt." 
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
				t: "Ja sagen & Nicken (Blindflug)", 
				rep: { "Dr. Wichtig": 10 },
				m: 5, f: 5, a: 20, c: -10, 
				r: "Du sagst 'Jawohl, Chef!'. Er legt auf. Später erfährst du: Er fragte 'Soll ich das IT-Budget streichen?'. Glückwunsch, Eigentor. Radar +20." 
			},
			{ 
				t: "Auflegen (Verbindung weg)", 
				m: 2, f: 0, a: 0, c: 5, 
				r: "Du legst einfach auf. Er denkt, das Funkloch war schuld. Taktisch klug." 
			},
			{ 
				t: "Laut 'HALLO?!' schreien", 
				rep: { "Dr. Wichtig": -5 },
				m: 10, f: -5, a: 5, c: 10, 
				r: "Du brüllst ins Telefon. Er ist genervt von deiner Inkompetenz. 'Müller, kaufen Sie sich ein besseres Handy!'" 
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
				t: "Kevin: 'Starte einfach neu'",
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
				t: "Fragen: 'Leuchtet da zufällig ein Lämpchen?'", 
				next: "caps_solved",
				m: 5, f: -5, a: -5, c: 0, 
				r: "Am anderen Ende wird es totenstill. 'Oh... äh... ja. Jetzt geht's.' Ein klassischer Layer-8-Fehler. Du notierst dir den Namen für später." 
			},
			{ 
				t: "Sofort zurücksetzen & auflegen", 
				req: "admin_pw", 
				m: 10, f: 0, a: 0, c: 0, 
				r: "Du setzt es genervt auf 'Start123!' zurück. Er bedankt sich und klebt das neue Passwort direkt an den Monitor. Sicherheit: Null, aber Ticket zu." 
			},
			{ 
				t: "Sadismus: 'Probieren Sie es bitte noch einmal...'", 
				m: 25, f: 15, a: 5, c: 5, 
				r: "Du lässt ihn das Passwort noch 20 Mal eingeben. 'Ganz ruhig tippen.' Du lehnst dich zurück, trinkst Kaffee und genießt sein Leiden. Deine Faulheit steigt, aber dein Radar auch (Beschwerdegefahr)." 
			}
		]
	},
	{
		id: "call_password_caps_2",
		title: "Die Schuldfrage",
		reqStory: "caps_solved",
		text: "Derselbe User von vorhin ruft wieder an. Er klingt panisch und defensiv. 'Hören Sie, seit Sie das mit dem Lämpchen gemacht haben, ist mein Mauszeiger viel langsamer! Sie haben da was verstellt!'",
		opts: [
			{ 
				t: "Logik: 'Capslock hat nichts mit der Maus zu tun.'", 
				m: 15, f: -10, a: 5, c: 5, 
				r: "Du erklärst ihm geduldig Computer-Architektur. Er hört nicht zu. 'Ich starte lieber neu, bevor Sie noch mehr kaputt machen.' Er hält dich für inkompetent, aber er lässt dich in Ruhe." 
			},
			{ 
				t: "Placebo: 'Ich kalibriere den Sensor neu...'", 
				m: 5, f: 10, a: -10, c: 0, 
				r: "Du tippst lautlos auf deine Leertaste und sagst 'Beep'. Der User bewegt die Maus. 'Wow! Viel besser! Danke!' Ein Sieg für die Faulheit und den Frieden." 
			},
			{ 
				t: "Wahrheit: 'Nein, Sie bilden sich das ein.'", 
				rep: { "Dr. Wichtig": -2 },
				m: 5, f: 0, a: 10, c: 15, 
				r: "'Unverschämtheit! Ich melde das dem Chef!' Er knallt den Hörer auf. Dein Radar schießt hoch, aber dein Stolz bleibt intakt." 
			}
		]
	},
	{
		id: "call_mouse_in_printer",
		char: "Gabi",
		title: "Drucker macht Geräusche",
		text: "Sekretariat: 'Der Drucker quiekt so komisch beim Drucken.'",
		opts: [
			{ 
				t: "Hingehen & Prüfen", 
				rep: { "Gabi": 5 },
				m: 15, f: -5, a: 0, c: -5, 
				r: "Eine Maus war im Papierschacht. Sie lebt. Du setzt sie im Hof aus. Gabi findet dich toll." 
			},
			{ 
				t: "Mit Hammer drohen", 
				req: "hammer", 
				rep: { "Gabi": 2 },
				m: 10, f: 0, a: 10, c: 0, 
				r: "Du stellst den Hammer demonstrativ neben den Drucker. Er druckt plötzlich leise. Maschinen haben Angst." 
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
                    { t: "Anschreien", next: "rage" }
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
            res_fun: { txt: "Das hat Spaß gemacht. Stressabbau pur.", m: 20, f: 10, a: -10, c: 0 },
            rage: { txt: "Du schreist ihn an. Deine Kollegen gucken komisch.", m: 5, f: 0, a: 5, c: 5 }
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
                r: "Nach 60 Minuten wird aufgelegt. Du beißt in die Tischkante." 
            },
            { 
                t: "Hörer anschreien", 
				rep: { "Dr. Wichtig": -2 },
                m: 5, f: 0, a: 10, c: 10,
                r: "Du schreist das Telefon an: 'GEH DRAN VERDAMMT!'. Der Chef läuft vorbei und schüttelt den Kopf." 
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
                t: "Erklären: 'Das ist nur der Sensor.'",
                m: 15, f: -10, a: 20, c: 0,
                r: "Er diskutiert 15 Minuten lang über 5G-Strahlung. Du verlierst Lebenswillen."
            },
            { 
                t: "Mitspielen: 'Gegenmaßnahmen eingeleitet.'",
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
                t: "Tipp: 'Alufolie um den Kopf.'",
                m: 5, f: 20, a: -10, c: 0,
                r: "'Genial! Faradayscher Käfig für den Cortex! Danke, Eule Ende.' Problem kreativ gelöst."
            },
            { 
                t: "Realität: 'Sie spinnen.'",
                m: 5, f: 0, a: 25, c: 0,
                r: "'Sie gehören auch zu DENEN?!' Er brüllt ins Telefon. Dein Ohr klingelt."
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
                t: "Geduldig erklären",
                m: 10, f: -5, a: 0, c: 0,
                r: "'Achsooo!' Sie lacht herzlich. Ihre Lache ist ansteckend."
            },
            { 
                t: "Lügen: 'Der Drucker hat Diät.'",
                m: 5, f: 15, a: -5, c: 5,
                r: "Sie kichert. 'Der Schelm!' Das Problem ist nicht gelöst, aber du hast Ruhe."
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
                t: "Auflegen: 'Spinner.'",
                m: 2, f: 0, a: 0, c: 0,
                r: "Sicher nur ein Scherz von Kevin."
            },
            { 
                t: "Fragen: 'Welches Jahr?'",
                next: "time_loop",
                m: 10, f: -5, a: 0, c: 0,
                r: "'2025! Bevor alles brannte! Tu es ni...' *Tuuut*."
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
                txt: "Er ist beeindruckt. 'Wir melden uns.'", 
                m: 10, f: 0, a: 10, c: 20,
                next: "fbi_watch" 
            },
            res_printer: { txt: "Er legt auf. Drucker-Admins sucht niemand.", m: 5, f: -5, a: 5, c: 0 },
            res_nothing: { txt: "Du bleibst loyal und arm.", rep: { "Dr. Wichtig": 2 }, m: 5, f: 0, a: -5, c: -5 }
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
            joke: { txt: "Sie glauben dir nicht. Dein Internet wird gedrosselt.", m: 20, f: -10, a: 20, c: 0 },
            paranoid: { txt: "Du vernichtest Beweise. Niemand kann dir was nachweisen.", m: 5, f: -20, a: 50, c: 0 }
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
                    { t: "Lügen: 'Ich komme!' (Diebstahl)", next: "steal_pizza" }
                ]
            },
            steal_pizza: {
                text: "Du rennst runter. Der Lieferant ist gestresst. 'Hier, 150 Euro. Wurde schon per PayPal bezahlt.'",
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
                t: "Manuell zurücksetzen & buchstabieren", 
                m: 10, f: -10, a: 10, c: -5,
                r: "Du setzt es auf 'Start123!' zurück und buchstabierst es ihr dreimal. 'Großes S wie Siegfried...' Es ist qualvoll langweilig, aber produktiv." 
            },
            { 
                t: "Faul: 'Benutzen Sie das Self-Service-Portal.'", 
                m: 2, f: 5, a: -5, c: 5,
                r: "'Aber das ist so kompliziert!' Du legst einfach auf, nachdem du den Link gemailt hast. Ruhe bewahrt, aber faul gewesen." 
            },
            { 
                t: "Lösung: 'Drücken Sie mal die Taste über Shift.'", 
                m: 5, f: -5, a: 5, c: 0,
                r: "'Oh! Das Lämpchen ist ausgegangen! Jetzt geht es!' Sie bedankt sich überschwänglich. Ein kleiner Sieg gegen die Dummheit." 
            }
        ]
    },
    {
        id: "call_excel_hell",
        title: "Zellen-Terror",
        text: "Wuttke vom Controlling. 'Hören Sie mal, meine SVERWEIS-Formel gibt #NV zurück. Das System ist kaputt! Die Datenbank ist down! Reparieren Sie das!'",
        opts: [
            { 
                t: "Erklären: 'Sie suchen in der falschen Spalte.'", 
                m: 15, f: -15, a: 15, c: -5,
                r: "Du musst ihm Excel erklären. Am Telefon. Es dauert ewig. Er versteht es kaum. Du spürst, wie deine Gehirnzellen absterben, aber du hast das Problem gelöst" 
            },
            { 
                t: "Abwimmeln: 'Das ist ein Anwenderfehler.'", 
				rep: { "Dr. Wichtig": -2 },
                m: 2, f: 5, a: 5, c: 10,
                r: "Wuttke schnaubt: 'Dafür werden Sie bezahlt?!' Er knallt den Hörer auf. Der Chef wird sicher bald fragen, warum das Controlling 'technische Probleme' hat." 
            },
            { 
                t: "Lügen: 'Server wird gerade neu gestartet.'", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "'Ach so! Na dann warte ich.' Er legt zufrieden auf. Du hast nichts getan, aber Ruhe erkauft." 
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
                    { t: "Abkürzen: 'Lesen Sie das ganze Wort vor.'", next: "nato_word" }
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
            "res_nato_hangup": { txt: "Du legst einfach auf. Du kannst das heute nicht. Das Ticket bleibt offen und wird später garantiert eskalieren.", m: 2, f: 10, a: 0, c: 15 }
        }
    },
    {
        id: "call_any_key_1",
        title: "Die mysteriöse Taste",
        text: "Ein verzweifelter Anruf aus dem Management. 'Müller! Mein Update hängt! Das System blockiert komplett. Da steht: PRESS ANY KEY TO CONTINUE.\n\nIch habe die STRG-Taste probiert, die ALT-Taste, ich habe sogar F12 gedrückt! WO VERDAMMT NOCHMAL IST DIESE ANY-TASTE?!'",
        opts: [
            { 
                t: "Ruhig: 'Drücken Sie einfach die Leertaste.'", 
                m: 5, f: 0, a: 15, c: -5, 
                r: "Du hörst ein lautes Klatschen (er haut mit der flachen Hand auf die Leertaste). 'Oh. Es geht weiter. Warum schreiben die das dann nicht so hin?!' Ein weiteres dummes Ticket bravourös geschlossen." 
            },
            { 
                t: "Toternst: 'Die müssen Sie erst bestellen.'", 
                m: 5, f: 10, a: -10, c: 20, 
                r: "Er schnappt nach Luft. 'Was für ein Saftladen! Bestellen Sie sofort eine Tastatur mit Any-Taste! Priority-Versand!' Du hast gerade 100€ Budget für einen Gag verbrannt. Der Chef wird weinen." 
            },
            { 
                t: "Seufzen: 'Ich drücke für Sie Enter.'", 
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
                    { t: "Anweisung: 'Schließen Sie bitte mal alle Fenster.'", next: "window_closed" },
                    { t: "Wortlos Fernwartung starten", next: "res_remote_fix" }
                ]
            },
            "window_closed": {
                text: "Du hörst, wie sie den Hörer ablegt. Es quietscht und knallt im Hintergrund. Dann nimmt sie den Hörer wieder auf.\n\n'So, erledigt! Aber jetzt wird es hier drinnen furchtbar stickig. Hilft das mit der frischen Luft wirklich gegen Viren?'",
                opts: [
                    { t: "Fassungslos: 'Ich meinte am Computer!'", next: "res_facepalm" },
                    { t: "Mitspielen: 'Ja, das hält die Viren draußen.'", next: "res_troll_window" }
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
                t: "Mitspielen: 'Selbstverständlich! Läuft extrem agil!'", 
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
                t: "Taktik: 'Nur im Premium-Tier für 5 Millionen Extra-Budget.'", 
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
                t: "Fake-Anruf starten", 
                rep: { "Chantal": 5 },
                m: 10, f: 0, a: 5, c: 0, 
                r: "Du rufst sie auf dem Handy an und brüllst dramatisch: 'Totalausfall! Wir brauchen dich!'. Chantal stürmt mit einem lauten 'Sorry, Notfall!' aus dem Raum. Sie schuldet dir einen massiven Gefallen." 
            },
            { 
                t: "Feueralarm auslösen", 
                req: "hammer",
                rep: { "Chantal": 10, "Dr. Wichtig": -10 },
                m: 30, f: -10, a: 10, c: 30, 
                r: "Du gehst aufs Ganze und drückst den Melder auf dem Flur ein. Die Sirene heult. Das ganze Gebäude wird evakuiert. Chantal ist frei, aber die Feuerwehr berechnet der IT-Abteilung einen Fehlalarm. Völlig überreagiert." 
            },
            { 
                t: "Trocken: 'Dein Seelentier ist ein Faultier. Viel Spaß.'", 
                rep: { "Chantal": -10 },
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du legst grinsend auf. Chantal ist gefangen. Deine Schadenfreude ist grenzenlos, aber erwarte morgen früh auf keinen Fall ein Lächeln von ihr." 
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
                t: "Trocken: 'Chef, haben Sie vielleicht den Laserpointer in der Hand?'", 
                rep: { "Dr. Wichtig": 2 },
                m: 5, f: 0, a: 10, c: -10, 
                r: "Zwei Sekunden Stille. Ein leises Klappern, als er das Gerät wechselt. '...das bleibt unter uns, Müller.' Er legt auf. Ein peinliches Ticket extrem diskret gelöst. Das Radar sinkt massiv, aber du hast Kopfschmerzen vor lauter Dummheit." 
            },
            { 
                t: "Befehl: 'Starten Sie den Rechner sofort hart neu!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, f: 0, a: 0, c: 40, 
                r: "FALLE! Er drückt den Power-Knopf. Der PC geht aus – und die ungespeicherte 45-minütige Präsentation gleich mit. Er flucht vor den Investoren über die 'instabile IT'. Du kriegst die volle Breitseite ab!" 
            },
            { 
                t: "Opfergang: 'Ich schalte mich remote auf und bewege die Maus für Sie.'", 
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
                r: "Du hackst das Buchhaltungssystem und setzt den Status auf 'Genehmigt'. Die Server werden bestellt. Frau Elster meldet diesen massiven Compliance-Verstoß sofort dem Vorstand. Du hast die Hardware, aber massiven Ärger." 
            },
            { 
                t: "Kapitulation: 'Dann eben keine neuen Server.'", 
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
                t: "IT-Richtlinie: 'Klatsch-Seiten bleiben gesperrt, Gabi.'", 
                rep: { "Gabi": -15, "Dr. Wichtig": -10 },
                m: 5, f: 0, a: 5, c: 20, 
                r: "Gabi flucht leise und legt auf. Zehn Minuten später fragt sie die VIP-Gattin nach ihrem Mann. Die lässt sich gerade scheiden und stürmt weinend raus. Der Chef macht DICH für das PR-Desaster verantwortlich." 
            },
            { 
                t: "Sicherheitsrisiko: 'Na gut, ich setze dich auf die Whitelist.'", 
                rep: { "Gabi": 15 },
                m: 10, f: 10, a: 0, c: 30, 
                r: "Gabi liest den Artikel und meistert den Smalltalk brillant. Aber du hast die Firewall für ein unsicheres Werbenetzwerk geöffnet. Das IT-Sicherheits-Audit am Nachmittag schlägt Alarm. Du bist fällig." 
            },
            { 
                t: "Kompromiss: 'Sag mir den Namen, ich google es für dich auf dem Handy.'", 
                rep: { "Gabi": 5 },
                m: 15, f: -5, a: 20, c: -5, 
                r: "Du sitzt an deinem Platz und musst für Gabi auf deinem Privathandy Klatsch-Artikel über C-Promis lesen und ihr die Infos diktieren. Deine Würde sinkt auf den Nullpunkt, aber du hast die Krise regelkonform abgewendet." 
            }
        ]
    },
    {
        id: "call_domain_1",
        title: "Hostmaster Support",
        text: "Eine dumpfe Computer-Stimme meldet sich: 'Guten Tag. Die Firmen-Domain globalcorp.de läuft in 10 Minuten ab. Die hinterlegte Kreditkarte der Geschäftsführung ist ungültig. Wollen Sie jetzt 1.500 Euro begleichen, oder sollen wir die Domain für den öffentlichen Verkauf freigeben?'",
        opts: [
            { 
                t: "Tastenfeld: 'Schwarze Karte' eintippen (Joker)", 
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
                t: "Auflegen: 'Dann ist sie halt weg.'", 
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
                t: "Lügen: 'Das ist eine Geldwäsche-Verschleierung!'", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Stille am anderen Ende. Dann: 'Ah. Sehr clever. Interpol sucht nach Yachten, nicht nach Server-Domains. Wir genehmigen das.' *Klick*. Du atmest tief durch." 
            },
            { 
                t: "Panisch auflegen", 
                m: 2, f: 5, a: 10, c: 0, 
                r: "Du knallst den Hörer auf die Gabel. Dein Herz rast. Ob die wohl IP-Adressen zurückverfolgen können? Die Domain ist bezahlt, der Rest ist dir egal." 
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
        title: "Dr. Wichtig (Aus dem Auto)",
        reqStory: "path_domain_lost",
        text: "Der Chef brüllt über die Freisprechanlage seines Autos: 'MÜLLER! Warum leitet unsere Firmenwebseite plötzlich auf ein thailändisches Online-Casino um?! Und warum kriege ich Mails von @globalcorp-casino.net?! WAS IST DA LOS?!'",
        opts: [
            { 
                t: "Schuldabwehr: 'Die Firmenkarte war abgelaufen!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 10, f: 0, a: 10, c: 30, 
                r: "'Sie hätten mich warnen müssen!' brüllt er. Der Rückkauf der Domain von den Domain-Piraten kostet die Firma jetzt 50.000€. Du stehst auf der Abschussliste." 
            },
            { 
                t: "Umdeuten: 'Chef, das ist Affiliate-Marketing!'", 
                rep: { "Dr. Wichtig": 5 },
                m: 15, f: 10, a: -10, c: -5, 
                r: "'Wie bitte?' - 'Ja, wir haben 400% mehr Klicks und verdienen an jedem Casino-Besucher!' Er überlegt kurz. 'Hm. Das... lassen Sie das vorerst so. Gutes Mitdenken.'" 
            }
        ]
    },
    {
        id: "call_fridge_1",
        title: "Kühlschrank 'Coolio 3000'",
        text: "Ein Anruf von einer internen Nebenstelle. Du nimmst ab. Eine blecherne Roboter-Stimme ertönt: 'BEEP. HIER SPRICHT DER KÜHLSCHRANK AUS DER TEEKÜCHE. MILCH-SENSOR MELDET: LEER. BITTE WLAN-PASSWORT EINSPRECHEN FÜR AMAZON-BESTELLUNG.'",
        opts: [
            { 
                t: "Den WLAN-Zettel ablesen (Joker)", 
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
            },
            { 
                t: "Auslachen: 'Vergiss es, Blechbüchse.'", 
                next: "path_fridge_angry",
                m: 2, f: 5, a: -5, c: 5, 
                r: "Du lachst ins Telefon und legst auf. 'Ein Kühlschrank, der anruft. Is klar.' Wahrscheinlich wieder ein Scherz vom Azubi." 
            }
        ]
    },
    {
        id: "call_fridge_2a",
        title: "Hausmeister Egon",
        reqStory: "path_fridge_wifi",
        text: "'Müller! Beweg deinen Hintern zum Empfang!' Egon flucht lautstark im Hintergrund. 'Hier stehen fünf Paletten H-Milch! Der Spediteur sagt, der Kühlschrank hat bestellt! Auf Express-Rechnung! Wer hat dem Ding Internet gegeben?!'",
        opts: [
            { 
                t: "Beschwichtigen: 'Teil das an alle aus!'", 
                rep: { "Egon": -5 },
                m: 10, f: -5, a: -10, c: 10, 
                r: "Du rufst einen 'Milch-Montag' aus. Alle trinken Kakao. Der Chef ist stinksauer wegen der Rechnung, aber das restliche Team freut sich." 
            },
            { 
                t: "Lügen: 'Das muss ein Hacker-Angriff sein!'", 
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
                t: "Entschuldigen: 'Das sah aus wie Schimmel!'", 
                rep: { "Frau Elster": -5 },
                m: 5, f: 0, a: 5, c: 0, 
                r: "'Banause! Das war Edelschimmel!' Sie ist beleidigt und legt auf." 
            },
            { 
                t: "Abwimmeln: 'War auf der roten Liste der Sensoren.'", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Du schiebst es auf die Maschine. Frau Elster seufzt. 'Immer diese Technik.' Sie gibt der KI die Schuld, nicht dir." 
            }
        ]
    },
    {
        id: "call_fridge_2c",
        title: "Der Chef ist hungrig",
        reqStory: "path_fridge_angry",
        text: "'Müller?!' Der Chef klingt weinerlich und wütend zugleich. 'Jemand hat den Kühlschrank auf minus 20 Grad gestellt! Mein Lachs-Carpaccio ist ein massiver Eisblock! Die Maschine sagt: NOTFALL-MODUS WEGEN OFFLINE. Fixen Sie das!'",
        opts: [
            { 
                t: "Hingehen & mit Hammer 'resetten'", 
                req: "hammer", 
                rep: { "Dr. Wichtig": 5 },
                m: 10, f: 0, a: -20, c: 10, 
                r: "Du nimmst den Hammer und zertrümmerst das smarte Display. Das Ding piept traurig und taut langsam ab. 'Etwas brachial, Müller, aber effektiv', lobt der Chef." 
            },
            { 
                t: "Vorschlagen: 'Legen Sie es in die Mikrowelle.'", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, f: 5, a: 10, c: 15, 
                r: "Der Chef atmet tief ein. 'Sie wollen, dass ich 50-Euro-Lachs in die MIKROWELLE lege?!' Er legt auf. Das wird er dir nicht verzeihen." 
            }
        ]
    },
    {
        id: "call_chantal_breakdown_1",
		char: "Chantal",
        title: "Marketing-Notruf",
        text: "Chantal hyperventiliert am Telefon. '*Schnapp* Müller! Ich halte diesen Druck nicht aus! Mein neuer Insta-Post hat nach 10 Minuten erst zwei Likes! Mein Leben ist vorbei! Ich brauche sofort was zur Beruhigung, sonst kündige ich! MÜLLER!'",
        opts: [
            { 
                t: "Therapie: Luftpolsterfolie bringen (Joker)", 
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
                r: "Du musst dir 45 Minuten lang anhören, wie hart das Leben als Content-Creator ist. Du opferst deine Lebenszeit und Nerven, aber bewahrst sie vor der Kündigung." 
            },
            { 
                t: "Sagen: 'Atme in eine Papiertüte!'", 
                next: "path_chantal_ignored",
                rep: { "Chantal": -10 },
                m: 5, f: 0, a: 5, c: 0, 
                r: "'EINE PAPIERTÜTE?! DAS RUINIERT MEIN MAKE-UP!' Sie kreischt auf und knallt den Hörer auf die Gabel." 
            }
        ]
    },
    {
        id: "call_chantal_breakdown_2a",
		char: "Chantal",
        title: "Die neue Sucht",
        reqStory: "path_chantal_bubbles",
        text: "Chantal flüstert ins Telefon. Sie klingt zittrig. 'Müller... hast du... hast du noch mehr von diesem Plopp-Zeug? Ich habe die ganze Rolle gestern zerdrückt. Ich brauche mehr Plopp. Bitte! Wo hast du das her?'",
        opts: [
            { 
                t: "Sagen: 'Das war teure IT-Spezialfolie. Ist alle.'", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Sie stöhnt enttäuscht auf, akzeptiert es aber. Du hast sie erfolgreich auf kalten Entzug gesetzt." 
            },
            { 
                t: "Sagen: 'Im Serverraum liegen noch Kartons.'", 
                rep: { "Chantal": 10, "Dr. Wichtig": 5 },
                m: 10, f: 10, a: -10, c: -5, 
                r: "Sie verbringt den halben Nachmittag im Serverraum und ploppt. Der Chef hält das für einen 'Stresstest der Hardware' und lobt eure abteilungsübergreifende Synergie." 
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
                t: "Absagen: 'Ich bin IT, kein Therapeut!'", 
                rep: { "Chantal": -10 },
                m: 5, f: 0, a: 10, c: 0, 
                r: "'Du bist genau wie die anderen!', schluchzt sie. Die Freundschaft ist hiermit offiziell wieder beendet." 
            },
            { 
                t: "Teilnehmen (Arbeitsvermeidung)", 
                m: 120, f: 40, a: 10, c: 20, 
                r: "Zwei Stunden lang hörst du dir Marketing-Dramen an. Deine Faulheit freut sich, aber der Chef sucht dich bereits im ganzen Haus." 
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
                t: "Verteidigen: 'Das ist medizinisch korrekt!'", 
                m: 10, f: 0, a: 10, c: 10, 
                r: "HR glaubt dir nicht ganz, aber sie können es nicht beweisen. Die Sache wird zu den Akten gelegt, aber du hast dir keine Freunde gemacht." 
            },
            { 
                t: "Reue: 'Ich bringe ihr sofort ein Sandwich.'", 
                rem: "sandwich",
                rep: { "Chantal": 10 },
                m: 15, f: -5, a: -5, c: -10, 
                r: "Du kriechst zu Kreuze und opferst dein Pausenbrot. Chantal nimmt es kauend an. 'Okay. Aber das nächste Mal bist du sensibler!' Die HR-Beschwerde wird fallen gelassen." 
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
                    { t: "Lügen: 'Ich wurde von außen gehackt!'", next: "lie_hack" }
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
            "res_fail": { txt: "Das war eine extrem dumme Ausrede. Dein Radar beim Chef schießt nach oben.", m: 5, f: 0, a: 10, c: 25 }
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
                    { t: "Lügen: 'Das war ein Fehler im 5G-Netz.'", next: "lie_cam" }
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
            "res_hangup": { txt: "Das Problem eskaliert auf Chef-Ebene. Dein Radar schlägt deutlich aus.", m: 2, f: 0, a: -5, c: 20 },
            "res_lie": { txt: "Er legt schreiend auf. Es war den Versuch wert.", m: 5, f: 0, a: 5, c: 15 }
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
                    { t: "Aufklären: 'Sein Pulli hing im Lüfter!'", next: "hr_explain" },
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
                    { t: "Trocken: 'Das ist der Barcode-Scanner fürs Lager.'", next: "wuttke_truth" },
                    { t: "Zynismus: 'Die kalibriert sich noch. Scannen Sie mal Ihre Kaffeepackung.'", next: "wuttke_troll" }
                ]
            },
            "wuttke_truth": {
                text: "Stille am anderen Ende. Dann ein leises Rascheln. 'Oh. Das... erklärt die Form. Und das Kabel. Ich lege ihn dann mal wieder in den Karton. Vergessen Sie, dass ich angerufen habe.'",
                opts: [
                    { t: "Seufzen und auflegen.", next: "res_wuttke_solved" }
                ]
            },
            "wuttke_troll": {
                text: "Du hörst ein lautes *BIEP*. Wuttke: 'Ah! Das Lämpchen hat kurz geblinkt! Und jetzt?'",
                opts: [
                    { t: "Weitermachen: 'Jetzt noch den Locher scannen.'", next: "wuttke_troll_deep" },
                    { t: "Erlösen: 'Das war ein Scherz, Wuttke. Das ist ein Scanner.'", next: "res_wuttke_mad" }
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
                txt: "Wuttke schnaubt wütend auf: 'Ich lasse mich hier nicht zum Narren halten!' Er knallt den Hörer auf die Gabel. Eine offizielle Beschwerde ist dir vermutlich sicher, aber der Spaß war es absolut wert.", 
                m: 5, f: 0, a: -5, c: 20 
            },
            "res_wuttke_fun": { 
                txt: "Du hörst im Hintergrund noch ein drittes *BIEP*, bevor du leise auflegst. Wuttke scannt wahrscheinlich gerade sein Locher-Konfetti. Du musst dir eine Lachträne aus dem Gesicht wischen.", 
                m: 10, f: 10, a: -15, c: 5 
            }
        }
    },

];
