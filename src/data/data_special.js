export const special = {


	/* The two safety valves: what happens when anger or the boss radar
	   hits 100 for the first time. Sat in the middle of
	   checkEndConditions as twenty strings until v4.0.0 - text belongs
	   with the data, not in the control flow. */
	valveTexts: {
		rage: [
                    "Du gehst in die Teeküche und starrst regungslos die rotierende Mikrowelle an. Nachdem du dir bildhaft vorgestellt hast, wie alles brennt, kehrst du an deinen Platz zurück.",
                    "Du schließt dich im Kopierraum ein und schreist deine Wut in ein Paket frisches Druckerpapier. Es dämpft den Ton hervorragend. Du richtest deine Krawatte.",
                    "Dir reißt endgültig der Geduldsfaden. Du schnappst dir einen leeren Kaffeebecher und zerdrückst ihn langsam und genüsslich in deiner Faust. Das musste jetzt sein.",
                    "Du flüchtest auf die Toilette, wäschst dir eiskalt das Gesicht und starrst dein Spiegelbild an. Du murmelst dir mehrfach vor, dass Mord immer noch strafbar ist.",
                    "Ein unsichtbarer Geduldsfaden reißt. Du stehst wortlos auf und trittst mit voller Wucht gegen den Mülleimer. Bevor jemand reagieren kann, sitzt du wieder und starrst stoisch in die Leere.",
                    "Du reißt das Fenster auf und brüllst ein langes Geräusch in den Innenhof. Eine Taube fällt vor Schreck fast vom Sims. Du schließt das Fenster. Der Puls sinkt.",
                    "Ein leises Knacken durchbricht die Stille. Du hast so fest auf deinen Kugelschreiber gebissen, dass er splittert. Mit etwas Tinte an den Zähnen arbeitest du weiter.",
                    "Du meldest dich kurz ab und gehst ins staubige Archiv. Aus purer Frustration baust du einen Turm aus alten Ordnern, nur um ihn mit einem gezielten Kick zu zerstören.",
                    "Tock. Tock. Tock. Du lässt deine Stirn dreimal sanft, aber bestimmt auf die Tischplatte fallen. Die Kollegen entscheiden sich kollektiv, diesen Vorfall zu ignorieren.",
                    "In blinder Wut tippst du eine extrem beleidigende E-Mail an den 'Alle-Mitarbeiter'-Verteiler. Dein Finger schwebt über dem Senden-Button, bevor du seufzend alles löschst."
                ],
		chef: [
                    "Das Telefon klingelt sturm, bevor die Tür aufgerissen wird. Der Chef steht schnaufend im Rahmen: 'Müller! Noch so ein Ding und Sie können Ihre Kaffeetasse packen!'",
                    "Eine E-Mail vom Chef ploppt auf, komplett in roter Schrift und Comic Sans: 'MÜLLER! IN MEIN BÜRO! SOFORT!' Nach einem ohrenbetäubenden Anschiss kehrst du an den Platz zurück.",
                    "Dr. Wichtig stürmt an deinen Schreibtisch und knallt einen dicken Aktenordner auf die Tastatur. 'Ihre Arbeitsweise ist inakzeptabel! Beim nächsten Mal fliegt hier jemand!'",
                    "Der Chef fängt dich auf dem Flur ab. 'Müller, Sie kosten mich mehr Nerven als meine Scheidung! Das ist eine offizielle Abmahnung!'",
                    "Die HR-Abteilung ruft an. 'Herr Müller, der Geschäftsführer hat gerade einen Locher nach seinem Monitor geworfen. Es ging um Sie. Bitte reißen Sie sich zusammen!'",
                    "Der Chef baut sich bedrohlich hinter dir auf. 'Wenn das so weitergeht, lasse ich Sie zur Strafe das gesamte Intranet ausdrucken und abheften! Letzte Warnung!'",
                    "Eine wütende Sprachnachricht vom Chef: 'Müller, wenn mein Puls wegen Ihnen noch weiter steigt, stelle ich Ihnen meine Arztkosten in Rechnung! Benehmen Sie sich!'",
                    "Dr. Wichtig trommelt ungeduldig mit den Fingern auf deinen Schreibtisch. 'Ich habe schon Praktikanten gesehen, die weniger Chaos anrichten. Überlegen Sie sich gut, was Sie heute noch tun!'",
                    "Das Haustelefon klingelt. Es ist der Chef. Er brüllt so laut in den Hörer, dass du ihn einen halben Meter vom Ohr weghalten musst, um keinen Hörsturz zu erleiden.",
                    "Der Chef schickt dir kommentarlos einen Link zu einem Stellenportal für ungelernte Aushilfskräfte mit dem Betreff 'Zur Vorbereitung'. Die Botschaft ist überdeutlich."
                ]
	},

	/* Week mode (v5.0): one line about the night itself on the night screen.
	   Chosen by week level; 'worn' takes over from the third night on, when
	   the recovery rates have visibly decayed (engine_week WEEK_TUNING.wearPP).
	   Pure flavour - the numbers stand right above it in the baggage block. */
	week_sleep: {
		easy: {
			fresh: [
				"Du schläfst tief und traumlos. Der Resturlaub im Blut wirkt noch.",
				"Acht Stunden, durchgeschlafen. Dein Körper weiß offenbar noch, wie das geht."
			],
			worn: [
				"Du schläfst ordentlich, aber das Aufwachen dauert jeden Morgen ein bisschen länger.",
				"Guter Schlaf, nur die Träume spielen inzwischen im Büro."
			]
		},
		normal: {
			fresh: [
				"Du schläfst passabel. Einmal wachst du auf, weil du im Traum ein Ticket schließt, das es nicht gibt.",
				"Der Schlaf kommt spät, bleibt aber. Immerhin verhandelt er nicht."
			],
			worn: [
				"Der Schlaf arbeitet nur noch Dienst nach Vorschrift: anwesend, aber unmotiviert.",
				"Du wachst vor dem Wecker auf und ärgerst dich über die verschenkten Minuten."
			]
		},
		hard: {
			fresh: [
				"Du wälzt dich lange. Als der Schlaf endlich kommt, bringt er die Arbeit einfach mit.",
				"Vier Stunden echter Schlaf, der Rest ist Deckenstudium. Urlaubsreif eben."
			],
			worn: [
				"Du drehst die Decke um, aber die Probleme drehen sich mit. Erholung sieht anders aus.",
				"Die Nacht ist eher eine Pause zwischen zwei Tagen als ein Schlaf. Dein Körper merkt sich das."
			]
		}
	},

	/* Week mode (v5.0): the daily contingent of an action pool is used up.
	   One entry per pool. Vector m 20, f 5, a 0 - tools/simulate-week.mjs
	   models idle clicks with exactly these numbers, the two must not drift
	   apart. Deliberately no longer the empty_pool vector: its a -5 turned
	   the wall into a farmable aggro faucet (measured 2026-08, see
	   WEEK_CONTINGENTS in engine_week.js). */
	week_idle: {
		coffee: {
			id: "fallback_week_coffee",
			title: "Kaffeeküche leergefegt",
			text: "Die Kanne ist kalt, der Vollautomat blinkt ENTKALKEN und jemand hat den letzten Filter als Notizzettel benutzt. Für heute ist hier nichts mehr zu holen.",
			opts: [
				{ t: "Leer ausgehen", m: 20, f: 5, a: 0, c: 0, r: "Du starrst in die leere Kanne. Morgen wieder." }
			]
		},
		server: {
			id: "fallback_week_server",
			title: "Serverraum verdächtig still",
			text: "Alle Lämpchen blinken grün. Kein Lüfter jault, kein Kabel schmort. Das macht dich nervöser als jeder Ausfall, aber es gibt schlicht nichts zu tun.",
			opts: [
				{ t: "Misstrauisch lauschen", m: 20, f: 5, a: 0, c: 0, r: "Nichts. Unheimlich. Du gehst rückwärts wieder raus." }
			]
		},
		calls: {
			id: "fallback_week_calls",
			title: "Die Hotline schweigt",
			text: "Kein Anruf. Du hebst testweise ab: Freizeichen. Entweder sind alle Probleme gelöst oder alle haben aufgegeben. Beides wäre ein Novum.",
			opts: [
				{ t: "Auf Anrufe warten", m: 20, f: 5, a: 0, c: 0, r: "Das Telefon bleibt stumm. Du legst den Hörer verkehrt herum auf. Falls doch wer anruft." }
			]
		},
		sidequests: {
			id: "fallback_week_sidequests",
			title: "Kein Dienstgang mehr",
			text: "Der Flur ist leer, die Küche ist leer, sogar Kevin ist irgendwo verschwunden. Für heute hat das Gebäude keine Ablenkung mehr für dich übrig.",
			opts: [
				{ t: "Ziellos herumstehen", m: 20, f: 5, a: 0, c: 0, r: "Du drehst eine Runde und landest wieder am Schreibtisch." }
			]
		}
	},

	empty_pool: {
		id: "fallback_empty",
		title: "Ruhe vor dem Sturm",
		text: "Aktuell passiert nichts. Alle sind wohl glücklich (oder tot). Du starrst eine Fliege an.",
		opts: [
			{ t: "Däumchen drehen", m: 20, f: 5, a: -5, c: 0, r: "Zeit vergeht langsam." }
		]
	}

};
