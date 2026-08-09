/*
 * The Friday meeting pool (v4.2 week mode, design 8.1).
 *
 * One meeting per week, drawn like any other pool - usedIDs is week-scoped,
 * so the cast rotates by itself across runs. The chef hosts every meeting
 * but stays a prose figure like everywhere else in the game; the external
 * consultants exist ONLY as node chars (name plus initials avatar, no
 * data_chars entry, no reputation, no team view - by design). Reputation
 * moves only for real characters: Kevin, Chantal, Dr. Wichtig.
 *
 * `startNodeGala` is the alternative opening the engine picks when tonight's
 * gala will actually fire (engine_week.triggerMeeting) - the announcement
 * comes out of a consultant's mouth, and the meeting keeps itself short.
 *
 * Result m sits at 45-55: the whole meeting costs one block of the
 * afternoon, exactly what tools/simulate-week.mjs models as MEET=50.
 */

export const meetings = [

	{
		id: "meet_review_1",
		title: "Wochen-Review",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "Der Chef winkt dich herein, bevor du klopfen kannst. 'Müller! Das sind Herr Brandtner und Frau Vogl von Synerqon Consulting.' Er sagt 'Synerqon', wie andere Leute 'Vatikan' sagen. 'Die Herrschaften begleiten unsere Effizienz-Transformation. Erzählen Sie doch mal: Wie lief Ihre Woche?'",
				opts: [
					{ t: "Die Woche ehrlich zusammenfassen", next: "berater" },
					{ t: "'Alles im grünen Bereich.'", next: "gruen" }
				]
			},
			root_gala: {
				text: "Der Chef winkt dich herein, bevor du klopfen kannst. 'Müller! Das sind Herr Brandtner und Frau Vogl von Synerqon Consulting.' Er sagt 'Synerqon', wie andere Leute 'Vatikan' sagen.\n'Und fassen wir uns kurz', sagt Frau Vogl, ohne von ihrem Tablet aufzusehen. 'Um halb fünf beginnt die Synergy-Gala. Wir werden erwartet.' Der Chef nickt so heftig, dass seine Brille verrutscht. 'Also, Müller: Wie lief Ihre Woche?'",
				opts: [
					{ t: "Die Woche ehrlich zusammenfassen", next: "berater" },
					{ t: "'Alles im grünen Bereich.'", next: "gruen" }
				]
			},
			berater: {
				char: "Frau Vogl (Synerqon)",
				text: "'Interessant', sagt Frau Vogl und tippt. 'Also ein klassisches Ressourcen-Alignment-Defizit mit reaktiver Eskalationskultur.' Herr Brandtner nickt, als hätte er zugehört. 'Wir empfehlen ein Framework.'",
				opts: [
					{ t: "'Wir brauchen kein Framework. Wir brauchen Personal.'", next: "res_klartext" },
					{ t: "Verbindlich nicken und das Wort 'spannend' benutzen", next: "res_nicken" }
				]
			},
			gruen: {
				char: "Herr Brandtner (Synerqon)",
				text: "'Grüner Bereich', wiederholt Herr Brandtner langsam, als prüfe er das Wort auf Schadstoffe. 'Unsere Zahlen zeigen 40 Prozent Reibungsverlust in Ihrer Abteilung.' Woher er Zahlen über deine Abteilung hat, weiß niemand. Der Chef macht sich Notizen.",
				opts: [
					{ t: "Die 40 Prozent anzweifeln", next: "res_zweifel" },
					{ t: "Die 40 Prozent zerknirscht zur Kenntnis nehmen", next: "res_zerknirscht" }
				]
			}
		},
		results: {
			res_klartext: {
				txt: "Stille. Frau Vogl klappt das Tablet zu. 'Genau diese Silodenke meinen wir.' Der Chef entschuldigt sich bei ihr — bei ihr, nicht bei dir. Draußen am Kopierer steht Kevin und streckt dir durch die Glaswand einen Daumen entgegen.",
				rep: { "Kevin": 5 },
				m: 50, f: 0, a: 10, c: 5
			},
			res_nicken: {
				txt: "'Spannend' war das richtige Wort. Es folgen vierzig Folien. Bei Folie 12 stirbt etwas in dir, bei Folie 31 hört der Chef auf mitzuschreiben. Deine Abteilung bekommt ein Framework. Es heißt SYNERGATE. Der Chef ist begeistert.",
				m: 55, f: 10, a: 5, c: -5
			},
			res_zweifel: {
				txt: "Herr Brandtner lächelt dünn und öffnet eine Excel. Die Zahlen stammen aus dem Intranet-Dashboard, das seit 2019 kaputt ist. Das weißt nur du. Du lässt es ihm. Manche Siege gewinnt man still.",
				m: 45, f: 0, a: 5, c: 5
			},
			res_zerknirscht: {
				txt: "Du nickst zerknirscht. Der Chef nickt erleichtert. Die Berater nicken zufrieden. Für einen Moment nickt der ganze Raum im Takt, und irgendwo entsteht daraus eine Folie mit dem Titel 'Commitment'.",
				m: 45, f: 5, a: 5, c: -5
			}
		}
	},

	{
		id: "meet_synergie_1",
		title: "Strategie-Sync Q3",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "'Müller, pünktlich!' Der Chef klingt überrascht. 'Herr Petersen von McKandy und Partner.' Herr Petersen sieht aus wie drei andere Berater, die du dieses Jahr getroffen hast. Vielleicht ist er das auch. 'Chantal macht heute das Protokoll.' Chantal hat bereits aufgehört zu tippen.",
				opts: [
					{ t: "Den Wochenbericht anbieten", next: "bericht" },
					{ t: "Abwarten, was Herr Petersen vorhat", next: "petersen" }
				]
			},
			root_gala: {
				text: "'Müller, pünktlich!' Der Chef klingt überrascht. 'Herr Petersen von McKandy und Partner. Chantal macht das Protokoll.'\n'Vorab', sagt Herr Petersen und richtet seine Manschetten, 'wir bleiben kompakt. Die Synergy-Gala beginnt pünktlich, und ich halte die Eröffnungsrede.' Der Chef applaudiert kurz und allein.",
				opts: [
					{ t: "Den Wochenbericht anbieten", next: "bericht" },
					{ t: "Abwarten, was Herr Petersen vorhat", next: "petersen" }
				]
			},
			bericht: {
				char: "Chantal",
				text: "Du fängst an. Nach einem Satz hebt Chantal die Hand. 'Langsamer. Ich schreibe: Müller ... berichtet ... über ... Sachen.' Herr Petersen notiert ebenfalls etwas. Es sieht länger aus als dein Satz.",
				opts: [
					{ t: "Langsam und protokollfähig weitersprechen", next: "res_protokoll" },
					{ t: "'Ich schicke das Protokoll nachher als Mail.'", next: "res_mail" }
				]
			},
			petersen: {
				char: "Herr Petersen (McKandy & Partner)",
				text: "'Ich habe Ihre Woche analysiert', sagt Herr Petersen und dreht seinen Laptop. Darauf: ein Kreisdiagramm mit drei Segmenten. 'Potenzial. Synergie. Und hier' — er tippt auf das größte Segment — 'Delta.' Der Chef fotografiert die Folie mit dem Handy.",
				opts: [
					{ t: "Fragen, was 'Delta' konkret bedeutet", next: "res_delta" },
					{ t: "Das Diagramm loben", next: "res_lob" }
				]
			}
		},
		results: {
			res_protokoll: {
				txt: "Du sprichst im Diktattempo. Chantal kommt mit, Herr Petersen schläft mit offenen Augen, und der Chef hält deinen Wochenbericht am Ende für 'sehr strukturiert'. Das Protokoll enthält zwei Rechtschreibfehler und einmal das Wort 'Sachen'.",
				rep: { "Chantal": 5 },
				m: 50, f: 5, a: 5, c: -5
			},
			res_mail: {
				txt: "'Mail ist gut', sagt Chantal und klappt zu. Herr Petersen hebt eine Braue: 'Asynchrone Kommunikation. Mutig.' Es klingt nicht wie ein Kompliment, aber der Chef notiert es sich als Innovationsimpuls.",
				m: 45, f: -5, a: 0, c: -5
			},
			res_delta: {
				txt: "'Delta', sagt Herr Petersen, 'ist die Lücke zwischen Ist und Soll.' Du fragst, was Ist und Soll sind. 'Das definieren wir im Workshop.' Der Workshop kostet das Budget von vier Stellen. Deine ist vorerst nicht dabei. Vorerst.",
				m: 50, f: 0, a: 10, c: 0
			},
			res_lob: {
				txt: "'Sehr klares Diagramm.' Herr Petersen strahlt und schenkt dir einen McKandy-Kugelschreiber. Der Chef sieht den Kugelschreiber. Der Chef hätte auch gern einen Kugelschreiber. Du spürst: Das wird noch Thema.",
				m: 45, f: 5, a: 0, c: 5
			}
		}
	},

	{
		id: "meet_kennzahlen_1",
		title: "Kennzahlen-Deep-Dive",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "Im Besprechungsraum sitzt neben dem Chef ein einzelner Berater — und Dr. Wichtig persönlich. Der Chef sitzt so aufrecht, dass es wehtun muss. 'Müller. Herr Berger von Synerqon. Und unser CEO nimmt sich heute höchstselbst die Zeit.' Dr. Wichtig sieht vom Handy auf: 'Wer sind Sie?'\nDie Tür geht auf: Kevin, mit einem Teller vom Buffet, das es hier nicht gibt.",
				opts: [
					{ t: "'Die Zahlen der Woche liegen vor.'", next: "zahlen" },
					{ t: "Sich unauffällig neben Kevin setzen", next: "kevin" }
				]
			},
			root_gala: {
				text: "Im Besprechungsraum sitzt neben dem Chef ein einzelner Berater — und Dr. Wichtig persönlich. Der Chef sitzt so aufrecht, dass es wehtun muss. 'Müller. Herr Berger von Synerqon.'\n'Eines vorweg', sagt Dr. Wichtig und steht auf, obwohl niemand gefragt hat. 'Heute Abend ist Synergy-Gala. Meine Idee. Wir machen hier also schnell.' Der Chef beginnt zu applaudieren, merkt es, hört auf.\nDie Tür geht auf: Kevin, mit einem Teller vom Buffet, das es hier nicht gibt.",
				opts: [
					{ t: "'Die Zahlen der Woche liegen vor.'", next: "zahlen" },
					{ t: "Sich unauffällig neben Kevin setzen", next: "kevin" }
				]
			},
			zahlen: {
				char: "Herr Berger (Synerqon)",
				text: "'Wir haben Ihre Woche normalisiert', sagt Herr Berger. Auf dem Beamer erscheint deine Woche als Wasserfalldiagramm. Zwischen Mittwoch und Donnerstag hat es eine Farbe, die es in PowerPoint offiziell nicht gibt. 'Die schicken Sie mir', sagt Dr. Wichtig.",
				opts: [
					{ t: "Nach der Datenquelle fragen", next: "res_quelle" },
					{ t: "Das Diagramm einfach wirken lassen", next: "res_wirken" }
				]
			},
			kevin: {
				char: "Kevin",
				text: "Kevin beugt sich zu dir und flüstert: 'Ist das der echte Wichtig?' Du nickst. Kevin sieht den CEO lange an. 'Ich dachte, der wäre größer.' Dr. Wichtig blickt herüber. Kevin studiert sehr konzentriert seinen Teller.",
				opts: [
					{ t: "'Konzentrier dich, Kevin.'", next: "res_konzentrier" },
					{ t: "Flüsternd zustimmen", next: "res_zustimmen" }
				]
			}
		},
		results: {
			res_quelle: {
				txt: "'Aus Ihrem Daten-Lake', sagt Herr Berger. Ihr habt keinen Daten-Lake. Ihr habt einen Ordner namens 'NEU_FINAL_2'. Du lässt es gut sein. Dr. Wichtig notiert sich 'Daten-Lake' mit zwei Ausrufezeichen.",
				m: 50, f: 0, a: 10, c: 0
			},
			res_wirken: {
				txt: "Das Diagramm wirkt. Dr. Wichtig ist beeindruckt, der Chef ist erleichtert, und deine Woche ist jetzt offiziell eine 'Wachstumsstory mit Reibungspunkten'. Klingt besser, als sie sich angefühlt hat.",
				rep: { "Dr. Wichtig": 5 },
				m: 45, f: 5, a: -5, c: -5
			},
			res_konzentrier: {
				txt: "Kevin nickt und ist zwei Minuten lang das konzentrierteste Mitglied der Runde. Dann malt er das Wasserfalldiagramm ab und gibt den Farben Namen. Die unbekannte nennt er 'Donnerstag'.",
				rep: { "Kevin": 5 },
				m: 45, f: 5, a: -5, c: 0
			},
			res_zustimmen: {
				txt: "'Stimmt', flüsterst du, 'im Intranet wirkt er größer.' Kevin prustet in seinen Teller. Alle sehen zu euch. Dr. Wichtig hebt eine Augenbraue, sehr langsam, wie ein Mann, der Zeit hat.",
				rep: { "Kevin": 5, "Dr. Wichtig": -5 },
				m: 45, f: 5, a: -5, c: 10
			}
		}
	},

	{
		id: "meet_beamer_1",
		title: "Technik-Check",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "Der Chef steht vor der Leinwand und drückt auf der Fernbedienung herum. Neben ihm wartet Frau Kienzle von Norden & Kessler mit einem USB-Stick in der Hand. Der Beamer zeigt ein blaues Bild und die Uhrzeit von vorgestern. 'Da, Müller. Sie sind ja Fachmann.'",
				opts: [
					{ t: "Zum Beamer gehen", next: "beamer" },
					{ t: "Sitzen bleiben", next: "warten" }
				]
			},
			root_gala: {
				text: "Der Chef steht vor der Leinwand und drückt auf der Fernbedienung herum. Neben ihm wartet Frau Kienzle von Norden & Kessler mit einem USB-Stick in der Hand. Der Beamer zeigt ein blaues Bild und die Uhrzeit von vorgestern.\n'Wir haben vierzig Minuten', sagt Frau Kienzle. 'Danach beginnt die Synergy-Gala, und ich fahre mit dem Vorstand hin.' Der Chef drückt schneller. 'Da, Müller. Sie sind ja Fachmann.'",
				opts: [
					{ t: "Zum Beamer gehen", next: "beamer" },
					{ t: "Sitzen bleiben", next: "warten" }
				]
			},
			beamer: {
				char: "Egon",
				text: "Das Kabel steckt. Der Beamer steht auf HDMI 2, das Notebook sendet auf HDMI 1. Du hast die Fernbedienung in der Hand, als Egon mit einer Leiter hereinkommt. 'Chef sagte, der Beamer ist kaputt.' Er sieht nach oben. 'Der hängt da seit acht Jahren.'",
				opts: [
					{ t: "'Zwei Klicks, dann läuft er.'", next: "res_eingang" },
					{ t: "Egon die Leiter aufstellen lassen", next: "res_leiter" }
				]
			},
			warten: {
				char: "Frau Kienzle (Norden & Kessler)",
				text: "Frau Kienzle probiert es selbst. Erst den Stick, dann einen anderen Anschluss, dann den Stick noch einmal, langsamer. Der Chef sagt 'ja, genau' zu Vorschlägen, die niemand gemacht hat. Nach sechs Minuten dreht sie sich um.",
				opts: [
					{ t: "Jetzt aufstehen", next: "res_spaet" },
					{ t: "'Sie machen das gut.'", next: "res_lob" }
				]
			}
		},
		results: {
			res_eingang: {
				txt: "Zwei Klicks, das Bild steht. Frau Kienzle bedankt sich beim Chef.",
				m: 45, f: 0, a: 10, c: -5
			},
			res_leiter: {
				txt: "Egon stellt die Leiter auf, steigt hoch und dreht den Eingang am Gerät um. Von oben, mit einem Kugelschreiber. Das Bild steht. 'War die Elektrik', sagt er zum Chef, der beeindruckt nickt.",
				rep: { "Egon": 5 },
				m: 50, f: 5, a: 0, c: -5
			},
			res_spaet: {
				txt: "Du gehst hin und drückst zweimal. Das Bild steht. 'Hätte ich auch hinbekommen', sagt Frau Kienzle. Der Chef notiert sich die sechs Minuten als Reaktionszeit der IT.",
				m: 50, f: 0, a: 5, c: 5
			},
			res_lob: {
				txt: "Sie sieht dich an, dann den Beamer, dann wieder dich. Zwei Klicks später steht das Bild, und sie sagt nichts mehr dazu. Auf Folie 9 geht es um Verantwortungsdiffusion.",
				m: 50, f: 5, a: 0, c: 5
			}
		}
	},

	{
		id: "meet_tool_1",
		title: "Produktvorstellung",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "'Müller, setzen Sie sich, das wird Sie freuen.' Neben dem Chef sitzt Herr Sobotka von Norden & Kessler, daneben Frau Elster mit einem Ordner auf dem Schoß. Auf der Leinwand steht ein Logo, das aussieht wie euer Ticketsystem, nur runder.",
				opts: [
					{ t: "Sich das Logo genauer ansehen", next: "logo" },
					{ t: "Frau Elster ansehen, die den Ordner festhält", next: "elster" }
				]
			},
			root_gala: {
				text: "'Müller, setzen Sie sich, das wird Sie freuen.' Neben dem Chef sitzt Herr Sobotka von Norden & Kessler, daneben Frau Elster mit einem Ordner auf dem Schoß.\n'Ich mache es kurz', sagt Herr Sobotka und richtet die Krawatte. 'Um halb fünf ist Synergy-Gala, und ich sitze am Tisch des Vorstands.' Auf der Leinwand steht ein Logo, das aussieht wie euer Ticketsystem, nur runder.",
				opts: [
					{ t: "Sich das Logo genauer ansehen", next: "logo" },
					{ t: "Frau Elster ansehen, die den Ordner festhält", next: "elster" }
				]
			},
			logo: {
				char: "Herr Sobotka (Norden & Kessler)",
				text: "'Ticketing 4.0', sagt Herr Sobotka. 'Cloudbasiert, KI-gestützt, vollintegriert.' Er klickt weiter. Die Oberfläche ist eure. Dieselben Spalten, dieselbe abgeschnittene Betreffzeile, dieselbe Sortierung, die sich seit Jahren nicht ändern lässt.",
				opts: [
					{ t: "'Das ist unser System mit einem neuen Logo.'", next: "res_logo" },
					{ t: "Nach dem Preis fragen", next: "res_preis" }
				]
			},
			elster: {
				char: "Frau Elster",
				text: "Frau Elster hält den Ordner vor die Brust. 'Ich soll das nachher gegenzeichnen', flüstert sie. 'Aber da steht eine Zahl drin, und ich weiß nicht, ob die pro Jahr ist oder pro Monat.' Herr Sobotka lächelt in eure Richtung.",
				opts: [
					{ t: "'Zeigen Sie mir die Zahl.'", next: "res_zahl" },
					{ t: "'Unterschreiben Sie heute nichts.'", next: "res_nichts" }
				]
			}
		},
		results: {
			res_logo: {
				txt: "'Genau', sagt Herr Sobotka, ohne aus dem Takt zu kommen. 'Wir haben es für Sie individualisiert.' Der Chef findet das nachvollziehbar. Auf dem Weg hinaus fragt er dich, warum die IT so etwas nicht selbst hinbekommt.",
				m: 50, f: 0, a: 10, c: 0
			},
			res_preis: {
				txt: "Die Zahl steht drei Sekunden auf der Folie. Sie hat vor dem Komma eine Stelle mehr, als du erwartet hast. Frau Elster macht ein Geräusch.",
				rep: { "Frau Elster": 5 },
				m: 45, f: 0, a: 5, c: -5
			},
			res_zahl: {
				txt: "Pro Monat. Pro Nutzer. Frau Elster schreibt sich beides auf und unterstreicht es zweimal. Im Protokoll steht später, die Buchhaltung habe Klärungsbedarf angemeldet.",
				rep: { "Frau Elster": 5 },
				m: 50, f: 0, a: 0, c: 5
			},
			res_nichts: {
				txt: "Sie legt den Ordner weg. Als Herr Sobotka nach der Unterschrift fragt, sagt sie: 'Herr Müller prüft das noch.' Du hast das nicht gesagt. Du prüfst es jetzt.",
				rep: { "Frau Elster": 5 },
				m: 50, f: 0, a: 5, c: 5
			}
		}
	},

	{
		id: "meet_neuling_1",
		title: "Bestandsaufnahme",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "Im Besprechungsraum sitzt ein sehr junger Berater. Vor ihm ein Laptop, daneben ein ausgedruckter Ablauf mit Textmarker. Der Chef ist noch nicht da. Auf dem Flur telefoniert jemand laut über Kapazitäten.",
				opts: [
					{ t: "'Guten Tag. Müller, IT.'", next: "vorstellen" },
					{ t: "Warten, bis er anfängt", next: "warten" }
				]
			},
			root_gala: {
				text: "Im Besprechungsraum sitzt ein sehr junger Berater. Vor ihm ein Laptop, daneben ein ausgedruckter Ablauf mit Textmarker. Auf dem Flur telefoniert jemand laut über Kapazitäten.\n'Ich soll sagen', liest der Berater vom Blatt ab, 'dass wir zeitlich gebunden sind. Heute Abend ist die Synergy-Gala.' Er sieht auf. 'Gehen Sie da eigentlich hin?'",
				opts: [
					{ t: "'Guten Tag. Müller, IT.'", next: "vorstellen" },
					{ t: "Warten, bis er anfängt", next: "warten" }
				]
			},
			vorstellen: {
				char: "Herr Lohmann (Synerqon)",
				text: "'Lohmann. Erster Tag.' Er schüttelt deine Hand zu lange. Dann dreht er das Blatt so, dass du es nicht sehen kannst, und liest die erste Frage vor: 'Wo sehen Sie Ihre Abteilung in drei Jahren?'",
				opts: [
					{ t: "'Im selben Raum. Mit demselben Drucker.'", next: "res_drucker" },
					{ t: "Die Frage ernst nehmen", next: "res_ernst" }
				]
			},
			warten: {
				char: "Markus",
				text: "Markus kommt herein, ohne anzuklopfen, und setzt sich ans Kopfende. 'Ich habe zehn Minuten.' Er mustert den jungen Berater. 'Sind Sie der von der Digitalisierung?' Der Berater sucht die Frage auf seinem Blatt.",
				opts: [
					{ t: "Markus die zehn Minuten reden lassen", next: "res_markus" },
					{ t: "'Er ist zur Bestandsaufnahme hier.'", next: "res_erklaeren" }
				]
			}
		},
		results: {
			res_drucker: {
				txt: "Er schreibt es auf. Wörtlich, mit dem Drucker. Zwei Wochen später steht der Satz in einer Präsentation unter der Überschrift 'Stimmen aus der Organisation', und der Chef fragt dich, wer das gesagt hat.",
				m: 45, f: 0, a: 10, c: 5
			},
			res_ernst: {
				txt: "Du antwortest drei Minuten lang. Er tippt mit, verliert den Anschluss und fragt, ob du das noch einmal von vorn sagen kannst. Auf dem Flur telefoniert sein Kollege weiter über Kapazitäten.",
				m: 55, f: 5, a: 5, c: -5
			},
			res_markus: {
				txt: "Markus redet elf Minuten über Abschlussquoten. Der Berater notiert alles. Als Markus geht, fragt er dich, was ein Abschluss ist.",
				rep: { "Markus": 5 },
				m: 50, f: 0, a: 0, c: 0
			},
			res_erklaeren: {
				txt: "'Bestandsaufnahme', wiederholt Markus. 'Von wem beauftragt?' Der Berater blättert. Markus steht auf und geht telefonieren. Draußen trifft er den Kollegen des Beraters, und die beiden reden lange.",
				rep: { "Markus": -5 },
				m: 45, f: 0, a: 5, c: 5
			}
		}
	}

];
