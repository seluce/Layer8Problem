/*
 * The Friday meeting pool (v5.0 week mode, design 8.1).
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
					{ t: "'Wir brauchen kein Framework. Wir brauchen Personal.'", next: "klartext_folgen" },
					{ t: "Verbindlich nicken und das Wort 'spannend' benutzen", next: "folien" }
				]
			},
			gruen: {
				char: "Herr Brandtner (Synerqon)",
				text: "'Grüner Bereich', wiederholt Herr Brandtner langsam, als prüfe er das Wort auf Schadstoffe. 'Unsere Zahlen zeigen 40 Prozent Reibungsverlust in Ihrer Abteilung.' Woher er Zahlen über deine Abteilung hat, weiß niemand. Der Chef macht sich Notizen.",
				opts: [
					{ t: "Die 40 Prozent anzweifeln", next: "quelle_frage" },
					{ t: "Die 40 Prozent zerknirscht zur Kenntnis nehmen", next: "commitment" }
				]
			},
			klartext_folgen: {
				char: "Frau Vogl (Synerqon)",
				text: "Frau Vogl legt das Tablet weg — eine Geste, die im Beratungsgewerbe offenbar Ernst bedeutet. 'Personal', sagt sie freundlich. 'Sehen Sie, genau da beginnt das Missverständnis. Personal ist ein Symptom.' Sie schreibt SYMPTOM an das Flipchart und unterstreicht es. Der Chef schreibt es ab.",
				opts: [
					{ t: "Dabei bleiben und die offenen Tickets vorrechnen", next: "res_klartext" },
					{ t: "'Symptom, natürlich. So meinte ich das.'", next: "res_einlenken" }
				]
			},
			folien: {
				char: "Herr Brandtner (Synerqon)",
				text: "'Spannend' war das Stichwort. Herr Brandtner öffnet die Präsentation. Folie 3 zeigt drei Kreise, Folie 7 dieselben Kreise mit Pfeilen. Bei Folie 19 hörst du den Lüfter deines eigenen Laptops im Nebenraum anspringen. Bei Folie 24 fragt der Chef, ob es Fragen gibt.",
				opts: [
					{ t: "Keine Fragen. Aushalten.", next: "res_nicken" },
					{ t: "Eine Frage stellen, um es zu beschleunigen", next: "res_frage" }
				]
			},
			quelle_frage: {
				char: "Herr Brandtner (Synerqon)",
				text: "'Gern', sagt Herr Brandtner und dreht den Laptop. Eine Excel, drei Reiter, eine Pivot-Tabelle. Die Zahlen stammen aus dem Intranet-Dashboard. Du erkennst es an einer Spalte, die seit dem Umbau 2019 nur Nullen liefert. Der Chef beugt sich vor und nickt beeindruckt.",
				opts: [
					{ t: "Es ihm lassen", next: "res_zweifel" },
					{ t: "Sagen, woher die Zahlen kommen", next: "res_aufdecken" }
				]
			},
			commitment: {
				char: "Frau Vogl (Synerqon)",
				text: "'Schön, dass wir uns einig sind.' Frau Vogl blättert zu einer Folie mit dem Titel COMMITMENT. Darunter drei leere Zeilen und ein Datum, das in zwei Wochen liegt. 'Was nehmen Sie sich konkret vor?' Der Chef sieht dich an. Alle sehen dich an.",
				opts: [
					{ t: "Etwas Vages sagen, das gut klingt", next: "res_zerknirscht" },
					{ t: "Nichts zusagen, was du nicht halten kannst", next: "res_ausweichen" }
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
				txt: "Bei Folie 31 hört der Chef auf mitzuschreiben, bei Folie 38 hört er auf zu nicken. Deine Abteilung bekommt trotzdem ein Framework. Es heißt SYNERGATE, und niemand wird es je wieder erwähnen — außer im nächsten Review.",
				m: 55, f: 10, a: 5, c: -5
			},
			res_zweifel: {
				txt: "Du lässt es ihm. Er bekommt sein Nicken, der Chef bekommt seine Zahl, und du behältst das Einzige, was in diesem Raum knapp ist: Zeit. Manche Siege gewinnt man still.",
				m: 45, f: 0, a: 5, c: 5
			},
			res_zerknirscht: {
				txt: "Du nickst zerknirscht. Der Chef nickt erleichtert. Die Berater nicken zufrieden. Für einen Moment nickt der ganze Raum im Takt, und irgendwo entsteht daraus eine Folie mit dem Titel 'Commitment'.",
				m: 45, f: 5, a: 5, c: -5
			},
			res_einlenken: {
				txt: "'Symptom, natürlich.' Frau Vogl lächelt, als hätte sie dir etwas beigebracht. Hat sie ja auch. Auf dem Flipchart steht jetzt SYMPTOM, darunter dein Name in Klammern. Der Chef findet, das sei ein produktives Gespräch gewesen.",
				m: 50, f: 5, a: 10, c: -5
			},
			res_frage: {
				txt: "Deine Frage war als Abkürzung gedacht. Herr Brandtner freut sich sichtlich und springt zurück zu Folie 7, um sie im Zusammenhang zu beantworten. Es dauert zwölf Minuten. Der Chef sieht dich an, als hättest du das mit Absicht getan.",
				m: 60, f: 0, a: 15, c: 0
			},
			res_aufdecken: {
				txt: "Du nennst das Dashboard, das Baujahr und die Spalte mit den Nullen. Herr Brandtner blättert weiter, ohne aufzusehen. Der Chef fragt nach, dreimal, und beim dritten Mal versteht er es. Am Montag liegt eine Mail im Postfach: Bitte um Prüfung der Datengrundlage, in CC die Berater.",
				rep: { "Frau Elster": 5 },
				m: 55, f: -5, a: 5, c: 10
			},
			res_ausweichen: {
				txt: "'Ich sage lieber nichts zu, was ich nicht halten kann.' Die Zeile auf der Folie bleibt leer. Frau Vogl notiert das ebenfalls, in ihre eigene Liste. Der Chef schweigt den ganzen Weg zum Aufzug, und beim Aussteigen sagt er: 'Das war korrekt.' Für seine Verhältnisse ist das eine Auszeichnung.",
				m: 45, f: 0, a: -5, c: 5
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
					{ t: "Langsam und protokollfähig weitersprechen", next: "diktat" },
					{ t: "'Ich schicke das Protokoll nachher als Mail.'", next: "asynchron" }
				]
			},
			petersen: {
				char: "Herr Petersen (McKandy & Partner)",
				text: "'Ich habe Ihre Woche analysiert', sagt Herr Petersen und dreht seinen Laptop. Darauf: ein Kreisdiagramm mit drei Segmenten. 'Potenzial. Synergie. Und hier' — er tippt auf das größte Segment — 'Delta.' Der Chef fotografiert die Folie mit dem Handy.",
				opts: [
					{ t: "Fragen, was 'Delta' konkret bedeutet", next: "workshop" },
					{ t: "Das Diagramm loben", next: "kugelschreiber" }
				]
			},
			diktat: {
				char: "Chantal",
				text: "Du sprichst im Diktattempo. Chantal kommt mit, Wort für Wort. Bei 'Ausfall der Klimaanlage' hebt sie wieder die Hand: 'Ausfall — wie schreibt man das im Protokoll? Also technisch?' Herr Petersen sieht auf. Zum ersten Mal interessiert ihn etwas.",
				opts: [
					{ t: "Es technisch korrekt diktieren", next: "res_protokoll" },
					{ t: "'Schreib einfach: Vorfall.'", next: "res_vorfall" },
					{ t: "Chantal das Protokoll allein schreiben lassen", next: "res_chantal_allein" }
				]
			},
			asynchron: {
				char: "Herr Petersen (McKandy)",
				text: "'Asynchrone Kommunikation', wiederholt Herr Petersen und macht sich eine Notiz. 'Mutig.' Dann, freundlich: 'Dürfte ich die Mail in CC bekommen? Für die Bestandsaufnahme.' Der Chef nickt sofort. Gefragt wurdest eigentlich du.",
				opts: [
					{ t: "Zusagen und die Mail entsprechend vorsichtig formulieren", next: "res_mail" },
					{ t: "'Das ist ein internes Protokoll.'", next: "res_intern" }
				]
			},
			workshop: {
				char: "Herr Petersen (McKandy)",
				text: "'Delta ist die Lücke zwischen Ist und Soll.' Du fragst, was Ist und Soll sind. 'Das definieren wir im Workshop.' Auf der nächsten Folie steht der Workshop bereits mit Datum, Dauer und Tagessatz. Der Chef liest die Zahl und sagt 'mhm'.",
				opts: [
					{ t: "Nachrechnen, was der Tagessatz in Stellen bedeutet", next: "res_delta" },
					{ t: "Es dabei bewenden lassen", next: "res_mhm" }
				]
			},
			kugelschreiber: {
				char: "Herr Petersen (McKandy)",
				text: "Herr Petersen strahlt und schenkt dir einen McKandy-Kugelschreiber, schwer, mit Logo. Der Chef sieht den Kugelschreiber. Der Chef hätte auch gern einen. Es liegt noch einer auf dem Tisch, in Reichweite, und beide wisst ihr das.",
				opts: [
					{ t: "Den zweiten dem Chef zuschieben", next: "res_lob" },
					{ t: "Nichts tun und den eigenen einstecken", next: "res_stift" }
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
			},
			res_vorfall: {
				txt: "'Vorfall' steht jetzt im Protokoll, siebenmal. Es liest sich, als sei diese Woche etwas Schreckliches passiert, und in gewisser Weise stimmt das. Herr Petersen unterstreicht das Wort und fragt, ob es dazu eine Häufigkeitsstatistik gibt.",
				m: 45, f: 5, a: 5, c: 5
			},
			res_intern: {
				txt: "'Internes Protokoll' bringt den Raum kurz zum Stehen. Herr Petersen nickt verständnisvoll, Chantal sieht zwischen euch hin und her. Der Chef sagt später im Flur, das sei 'vielleicht etwas eng gesehen' gewesen. Die Mail schickst du trotzdem nur nach innen.",
				m: 45, f: 0, a: 0, c: 10
			},
			res_mhm: {
				txt: "Du sagst nichts, der Chef sagt 'mhm', der Workshop steht im Kalender. Auf dem Rückweg rechnest du es doch aus, im Kopf, und kommst auf vier Stellen. Es hilft niemandem, dass du es jetzt weißt.",
				m: 45, f: 5, a: 10, c: -5
			},
			res_stift: {
				txt: "Du steckst deinen ein. Der zweite bleibt liegen, bis Herr Petersen ihn beim Aufräumen wieder einpackt. Der Chef sieht es. Er sagt nichts, aber er hat es gesehen, und dieser Kugelschreiber wird noch Thema.",
				m: 45, f: 0, a: 0, c: 10
			},
			res_chantal_allein: {
				txt: "Du überlässt Chantal das Protokoll. Sie schreibt es allein und liest es am Ende vor. Es ist erstaunlich kurz, erstaunlich präzise und enthält kein einziges Wort von Herrn Petersen. Er merkt es nicht.",
				m: 40, f: 10, a: 0, c: 0
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
					{ t: "Nach der Datenquelle fragen", next: "datenlake" },
					{ t: "Das Diagramm einfach wirken lassen", next: "wachstumsstory" }
				]
			},
			kevin: {
				char: "Kevin",
				text: "Kevin beugt sich zu dir und flüstert: 'Ist das der echte Wichtig?' Du nickst. Kevin sieht den CEO lange an. 'Ich dachte, der wäre größer.' Dr. Wichtig blickt herüber. Kevin studiert sehr konzentriert seinen Teller.",
				opts: [
					{ t: "'Konzentrier dich, Kevin.'", next: "kevin_malt" },
					{ t: "Flüsternd zustimmen", next: "augenbraue" }
				]
			},
			datenlake: {
				char: "Herr Berger (Synerqon)",
				text: "'Aus Ihrem Daten-Lake.' Ihr habt keinen Daten-Lake. Ihr habt einen Ordner namens NEU_FINAL_2. Dr. Wichtig notiert sich 'Daten-Lake' mit zwei Ausrufezeichen und fragt, ob man den ausbauen könne.",
				opts: [
					{ t: "Es dabei belassen", next: "res_quelle" },
					{ t: "Erklären, was in dem Ordner wirklich liegt", next: "res_ordner" }
				]
			},
			wachstumsstory: {
				char: "Dr. Wichtig",
				text: "Das Diagramm wirkt. Dr. Wichtig steht auf, stellt sich neben die Leinwand und zeigt auf den unbeschrifteten Balken. 'Und das hier', sagt er, 'ist unser Potenzial.' Es ist der Donnerstag, an dem die Klimaanlage ausfiel.",
				opts: [
					{ t: "Zustimmen und den Balken Potenzial nennen", next: "res_wirken" },
					{ t: "Sagen, was der Balken tatsächlich ist", next: "res_donnerstag" },
					{ t: "Nichts sagen und auf die Uhr sehen", next: "res_uhr_kenn" }
				]
			},
			kevin_malt: {
				char: "Kevin",
				text: "Kevin ist zwei Minuten lang das konzentrierteste Mitglied der Runde. Dann beginnt er, das Wasserfalldiagramm abzumalen und den Farben Namen zu geben. Herr Berger sieht es und beugt sich interessiert vor: 'Macht Ihr Kollege eine Visualisierung?'",
				opts: [
					{ t: "'Ja. Eine Visualisierung.'", next: "res_konzentrier" },
					{ t: "Die Wahrheit sagen", next: "res_malen" }
				]
			},
			augenbraue: {
				char: "Dr. Wichtig",
				text: "Kevin prustet in seinen Teller. Alle sehen zu euch. Dr. Wichtig hebt eine Augenbraue, sehr langsam, wie ein Mann, der Zeit hat. 'Sie haben etwas gesagt, Müller. Teilen Sie es doch mit uns allen.'",
				opts: [
					{ t: "Es abschwächen", next: "res_zustimmen" },
					{ t: "Es laut wiederholen", next: "res_laut" }
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
			},
			res_ordner: {
				txt: "Du erklärst NEU_FINAL_2, inklusive der Unterordner NEU_FINAL_2_alt und NEU_FINAL_2_wirklich. Herr Berger schreibt mit. Dr. Wichtig hört auf zu notieren. Auf dem Rückweg fragt der Chef, ob man das nicht 'aufräumen' könne, und meint damit dich.",
				m: 55, f: -5, a: 5, c: 5
			},
			res_donnerstag: {
				txt: "'Das ist der Donnerstag mit der Klimaanlage.' Dr. Wichtig sieht den Balken an, dann dich. 'Auch Potenzial', sagt er und setzt sich. Der Balken heißt ab sofort Potenzial, aber alle im Raum wissen jetzt, was er wirklich war.",
				m: 50, f: 0, a: -5, c: 5
			},
			res_malen: {
				txt: "'Er malt es ab.' Kurze Stille. Dann lacht Herr Berger als Einziger, laut und eine Spur zu lang. Kevin schiebt das Blatt weg und wird für den Rest der Sitzung nicht mehr gesehen. Am Montag liegt es zusammengefaltet auf deinem Schreibtisch.",
				rep: { "Kevin": -5 },
				m: 45, f: 0, a: 5, c: 0
			},
			res_laut: {
				txt: "'Im Intranet wirkt er größer.' Du sagst es in einen Raum, der still ist. Der Chef atmet ein. Dr. Wichtig sieht dich lange an und sagt dann: 'Das Foto ist von 2011.' Es klingt fast versöhnlich. Kevin strahlt, als hättest du ein Königreich erobert.",
				rep: { "Kevin": 10, "Dr. Wichtig": -5 },
				m: 45, f: 0, a: -10, c: 15
			},
			res_uhr_kenn: {
				txt: "Du siehst auf die Uhr, und Dr. Wichtig sieht, dass du auf die Uhr siehst. Der Balken bleibt Potenzial, dein Blick bleibt im Protokoll. Es steht dort nicht, aber alle im Raum haben es gesehen.",
				m: 40, f: 5, a: 5, c: 5
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
					{ t: "'Zwei Klicks, dann läuft er.'", next: "zwei_klicks" },
					{ t: "Egon die Leiter aufstellen lassen", next: "leiter" }
				]
			},
			warten: {
				char: "Frau Kienzle (Norden & Kessler)",
				text: "Frau Kienzle probiert es selbst. Erst den Stick, dann einen anderen Anschluss, dann den Stick noch einmal, langsamer. Der Chef sagt 'ja, genau' zu Vorschlägen, die niemand gemacht hat. Nach sechs Minuten dreht sie sich um.",
				opts: [
					{ t: "Jetzt aufstehen", next: "sechs_minuten" },
					{ t: "'Sie machen das gut.'", next: "kienzle_probiert" }
				]
			},
			zwei_klicks: {
				char: "Frau Kienzle (Norden & Kessler)",
				text: "Zwei Klicks, das Bild steht. Frau Kienzle bedankt sich beim Chef. Der Chef nimmt den Dank an. Dann fragt sie, ob man den Raum nicht dauerhaft 'präsentationsfähig' machen könne — sie kenne da jemanden.",
				opts: [
					{ t: "Nichts sagen", next: "res_eingang" },
					{ t: "'Der Raum ist präsentationsfähig. Der Eingang war falsch.'", next: "res_richtigstellen" }
				]
			},
			leiter: {
				char: "Egon",
				text: "Egon stellt die Leiter auf, steigt hoch und dreht den Eingang am Gerät um. Von oben, mit einem Kugelschreiber. Das Bild steht. 'War die Elektrik', sagt er zum Chef, der beeindruckt nickt. Von der Leiter herab sieht Egon dich an und wartet.",
				opts: [
					{ t: "Nicken. Es war die Elektrik.", next: "res_leiter" },
					{ t: "Auflösen, was er wirklich getan hat", next: "res_aufloesen" },
					{ t: "So tun, als hättest du nicht hergesehen", next: "res_weggesehen" }
				]
			},
			sechs_minuten: {
				char: "Frau Kienzle (Norden & Kessler)",
				text: "Du gehst hin und drückst zweimal. Das Bild steht. 'Hätte ich auch hinbekommen', sagt Frau Kienzle. Der Chef notiert sich etwas, und du kannst von hier aus lesen, was: sechs Minuten, Reaktionszeit IT.",
				opts: [
					{ t: "Es stehen lassen", next: "res_spaet" },
					{ t: "Anmerken, dass niemand gerufen hat", next: "res_gerufen" }
				]
			},
			kienzle_probiert: {
				char: "Frau Kienzle (Norden & Kessler)",
				text: "Sie sieht dich an, dann den Beamer, dann wieder dich. Zwei Klicks später steht das Bild, und sie sagt nichts mehr dazu. Folie 9 trägt den Titel VERANTWORTUNGSDIFFUSION. Der Chef findet sie besonders treffend.",
				opts: [
					{ t: "Die Folie kommentarlos über sich ergehen lassen", next: "res_lob" },
					{ t: "Fragen, ob Folie 9 aus Erfahrung entstanden ist", next: "res_folie9" }
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
			},
			res_richtigstellen: {
				txt: "Du sagst es sachlich, in einem Satz. Frau Kienzle notiert nichts. Der Chef notiert etwas. Der Raum bleibt präsentationsfähig, das Angebot kommt trotzdem, drei Wochen später, per Mail, mit dir in CC.",
				m: 50, f: 0, a: 5, c: 5
			},
			res_aufloesen: {
				txt: "'Er hat den Eingang umgestellt.' Egon steigt herunter, ohne dich anzusehen, klappt die Leiter zusammen und geht. Der Chef versteht es nicht und fragt später nach. Egon grüßt dich am Montag trotzdem, aber er sagt nichts dazu, und das ist die Nachricht.",
				rep: { "Egon": -5 },
				m: 45, f: 0, a: 5, c: 0
			},
			res_gerufen: {
				txt: "'Es hat mich niemand gerufen.' Der Chef sieht auf seinen Zettel, dann auf dich, dann streicht er die sechs Minuten durch. Darunter schreibt er etwas Neues, das du von hier aus nicht lesen kannst. Nichtwissen ist hier meistens die bessere Lage.",
				m: 45, f: 0, a: 0, c: 5
			},
			res_folie9: {
				txt: "'Aus Erfahrung?' Frau Kienzle lächelt zum ersten Mal ehrlich. 'Aus sehr viel Erfahrung.' Danach läuft die Präsentation deutlich schneller, und zwei Folien überspringt sie ganz. Der Chef merkt es nicht.",
				m: 40, f: 0, a: -10, c: 0
			},
			res_weggesehen: {
				txt: "Du siehst weg, als Egon von der Leiter steigt. Es war die Elektrik, es bleibt die Elektrik. Am Montag steht ein Kaffee auf deinem Schreibtisch, ohne Zettel. Egon trinkt keinen Kaffee.",
				rep: { "Egon": 5 },
				m: 45, f: 0, a: -5, c: 0
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
					{ t: "'Das ist unser System mit einem neuen Logo.'", next: "individualisiert" },
					{ t: "Nach dem Preis fragen", next: "preisfolie" }
				]
			},
			elster: {
				char: "Frau Elster",
				text: "Frau Elster hält den Ordner vor die Brust. 'Ich soll das nachher gegenzeichnen', flüstert sie. 'Aber da steht eine Zahl drin, und ich weiß nicht, ob die pro Jahr ist oder pro Monat.' Herr Sobotka lächelt in eure Richtung.",
				opts: [
					{ t: "'Zeigen Sie mir die Zahl.'", next: "zahl_lesen" },
					{ t: "'Unterschreiben Sie heute nichts.'", next: "elster_legt_weg" }
				]
			},
			individualisiert: {
				char: "Herr Sobotka (Norden & Kessler)",
				text: "'Genau', sagt Herr Sobotka, ohne aus dem Takt zu kommen. 'Wir haben es für Sie individualisiert.' Der Chef findet das nachvollziehbar. Die Folie danach beziffert die Individualisierung pro Jahr. Der Betrag ist höher als deine Stelle.",
				opts: [
					{ t: "Es dabei belassen", next: "res_logo" },
					{ t: "Den Betrag mit deiner Stelle vergleichen", next: "res_stelle" }
				]
			},
			preisfolie: {
				char: "Frau Elster",
				text: "Die Zahl steht drei Sekunden auf der Folie. Sie hat vor dem Komma eine Stelle mehr, als du erwartet hast. Frau Elster macht ein Geräusch. Herr Sobotka klickt weiter und sagt: 'Aber darüber sprechen wir später.'",
				opts: [
					{ t: "Später ist gut", next: "res_preis" },
					{ t: "'Sprechen wir jetzt darüber.'", next: "res_jetzt" },
					{ t: "Frau Elster machen lassen", next: "res_elster_macht" }
				]
			},
			zahl_lesen: {
				char: "Frau Elster",
				text: "Sie dreht den Ordner. Pro Monat. Pro Nutzer. Darunter, kleiner, eine Laufzeit von sechsunddreißig Monaten und eine automatische Verlängerung. Frau Elster tippt auf die Verlängerung, ohne etwas zu sagen.",
				opts: [
					{ t: "Die Verlängerung laut vorlesen", next: "res_zahl" },
					{ t: "Ihr zunicken und den Ordner zuklappen", next: "res_zuklappen" }
				]
			},
			elster_legt_weg: {
				char: "Herr Sobotka (Norden & Kessler)",
				text: "Sie legt den Ordner weg. Als Herr Sobotka nach der Unterschrift fragt, sagt sie: 'Herr Müller prüft das noch.' Du hast das nicht gesagt. Herr Sobotka dreht sich zu dir um, freundlich, mit einem Formular in der Hand: 'Wann darf ich mit Ihnen rechnen?'",
				opts: [
					{ t: "Einen Termin nennen", next: "res_nichts" },
					{ t: "Keinen Termin nennen", next: "res_kein_termin" }
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
			},
			res_stelle: {
				txt: "Du sagst nicht, dass es deine Stelle ist. Du sagst, es sei 'eine Stelle im Haus'. Der Chef rechnet trotzdem nach — man sieht es an seinem Gesicht — und sagt danach den ganzen Termin lang nichts mehr. Unterschrieben wird nichts.",
				m: 55, f: 0, a: 5, c: 5
			},
			res_jetzt: {
				txt: "'Sprechen wir jetzt darüber.' Herr Sobotka klickt zurück, langsam, und der Preis steht wieder da. Diesmal vierzig Sekunden. Frau Elster schreibt mit. Der Chef sagt anschließend, man müsse das 'in Ruhe bewerten', und meint damit: nicht heute.",
				rep: { "Frau Elster": 5 },
				m: 55, f: 0, a: 10, c: 0
			},
			res_zuklappen: {
				txt: "Du nickst ihr zu, sie klappt den Ordner zu. Kein Wort fällt, und trotzdem ist die Sache entschieden. Herr Sobotka packt ein und sagt beim Hinausgehen, er melde sich im neuen Quartal. Frau Elster sagt: 'Das tut er.'",
				rep: { "Frau Elster": 5 },
				m: 45, f: 0, a: -5, c: 0
			},
			res_kein_termin: {
				txt: "'Ich nenne Ihnen keinen Termin.' Herr Sobotka lächelt, als hätte er das erwartet, und legt das Formular trotzdem auf den Tisch. Es liegt dort noch, als alle gegangen sind. Am Montag liegt es in deinem Postfach, mit einem Haftzettel: 'zur Erinnerung'.",
				m: 45, f: 0, a: 5, c: 5
			},
			res_elster_macht: {
				txt: "Du lässt Frau Elster machen. Sie stellt vier Fragen, alle zu Zahlen, und beim vierten Mal blättert Herr Sobotka zurück, ohne gefragt worden zu sein. Dann packt er ein. Du hast in diesem Termin nichts gesagt und alles bekommen.",
				rep: { "Frau Elster": 5 },
				m: 45, f: 10, a: -5, c: 0
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
					{ t: "'Im selben Raum. Mit demselben Drucker.'", next: "notiert_woertlich" },
					{ t: "Die Frage ernst nehmen", next: "verliert_faden" }
				]
			},
			warten: {
				char: "Markus",
				text: "Markus kommt herein, ohne anzuklopfen, und setzt sich ans Kopfende. 'Ich habe zehn Minuten.' Er mustert den jungen Berater. 'Sind Sie der von der Digitalisierung?' Der Berater sucht die Frage auf seinem Blatt.",
				opts: [
					{ t: "Markus die zehn Minuten reden lassen", next: "abschlussquoten" },
					{ t: "'Er ist zur Bestandsaufnahme hier.'", next: "beauftragt_von" }
				]
			},
			notiert_woertlich: {
				char: "Herr Lohmann",
				text: "Er schreibt es auf. Wörtlich, mit dem Drucker. Dann sieht er hoch: 'Und wie würden Sie die Zusammenarbeit auf einer Skala von eins bis zehn bewerten?' Auf seinem Blatt ist die Skala vorgedruckt. Neben der Zehn steht bereits ein Häkchen.",
				opts: [
					{ t: "Eine ehrliche Zahl nennen", next: "res_drucker" },
					{ t: "Auf das Häkchen zeigen", next: "res_haekchen" }
				]
			},
			verliert_faden: {
				char: "Herr Lohmann",
				text: "Du antwortest drei Minuten lang. Er tippt mit, verliert den Anschluss und fragt, ob du das noch einmal von vorn sagen kannst. Auf dem Flur telefoniert sein Kollege weiter über Kapazitäten, laut genug, dass ihr beide es hört.",
				opts: [
					{ t: "Es noch einmal sagen, langsamer", next: "res_ernst" },
					{ t: "Ihm anbieten, es aufzuschreiben und zu schicken", next: "res_schicken" },
					{ t: "Ihn den Ablauf zu Ende lesen lassen", next: "res_ablauf" }
				]
			},
			abschlussquoten: {
				char: "Markus",
				text: "Markus redet elf Minuten über Abschlussquoten. Der Berater notiert alles. Als Markus geht, fragt er dich, was ein Abschluss ist — und ob die IT dafür 'zuständig' sei. Sein Stift wartet.",
				opts: [
					{ t: "'Nein.'", next: "res_markus" },
					{ t: "Es ihm richtig erklären", next: "res_erklaerung" }
				]
			},
			beauftragt_von: {
				char: "Markus",
				text: "'Bestandsaufnahme', wiederholt Markus. 'Von wem beauftragt?' Der Berater blättert. Er blättert eine Weile. Dann sagt er einen Firmennamen, den niemand im Raum kennt, und Markus steht auf und geht telefonieren.",
				opts: [
					{ t: "Den Namen mitschreiben", next: "res_erklaeren" },
					{ t: "Dem jungen Mann einen Kaffee anbieten", next: "res_kaffee" }
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
			},
			res_haekchen: {
				txt: "Du zeigst auf das Häkchen. Er wird rot bis zu den Ohren, murmelt etwas von einer Vorlage und dreht das Blatt um. Auf der Rückseite steht dieselbe Skala, unausgefüllt. Er stellt dir danach zwei Fragen, die nicht auf dem Ablauf stehen, und die sind die besseren.",
				m: 50, f: 0, a: -5, c: 0
			},
			res_schicken: {
				txt: "Du bietest an, es aufzuschreiben. Er ist sichtlich erleichtert und notiert deine Mailadresse falsch. Die Zusammenfassung schickst du trotzdem, an ihn und in Kopie an dich selbst. Sie taucht später wörtlich in einem Bericht auf, unter seinem Namen.",
				m: 45, f: -5, a: 0, c: -5
			},
			res_erklaerung: {
				txt: "Du erklärst, was ein Abschluss ist, wer ihn macht und was die IT damit zu tun hat, nämlich nichts. Er schreibt alles mit. In der späteren Präsentation steht die IT unter 'vertriebsnahe Funktionen', und niemand weiß, wie das passieren konnte.",
				m: 55, f: -5, a: 10, c: 0
			},
			res_kaffee: {
				txt: "Du holst ihm einen Kaffee. Er trinkt ihn in einem Zug und redet zum ersten Mal ohne Ablauf: erster Tag, zweite Woche im Beruf, der Kollege draußen ist sein Vorgesetzter. Dann klappt er den Laptop zu und will wissen, ob das nun im Protokoll landet.",
				m: 50, f: 0, a: -10, c: 0
			},
			res_ablauf: {
				txt: "Du lässt ihn den ausgedruckten Ablauf zu Ende lesen. Es sind neun Fragen, und ab der sechsten wiederholen sie sich. Er merkt es selbst, wird schneller und hört bei acht auf. Beim Hinausgehen bedankt er sich zweimal.",
				m: 55, f: 5, a: 0, c: 0
			}
		}
	},

	/* -------------------------------------------------------------------
	   Wave 2 (v5.1): six more Friday finales, written in the three-act
	   shape - the question, the drag, the way out. Duplicate check against
	   the six existing ones: consultants (Synerqon, Norden & Kessler,
	   McKandy), the beamer, the waterfall chart, the resold ticket system
	   and the first-day consultant are taken.
	   ------------------------------------------------------------------- */
	{
		id: "meet_umfrage_1",
		title: "Auswertung Mitarbeiterbefragung",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "Sabine aus der Personalabteilung hat einen Beamer, eine Tortengrafik und ein Anliegen. 'Die Befragung ist ausgewertet!' Auf der Folie steht die Zufriedenheit je Abteilung. Die IT ist der kleinste Tortenstück, und es ist grau, während alle anderen bunt sind.",
				opts: [
					{ t: "Fragen, wie viele aus der IT teilgenommen haben", next: "beteiligung" },
					{ t: "Das graue Stück erst mal wirken lassen", next: "grau" }
				]
			},
			root_gala: {
				text: "Sabine aus der Personalabteilung hat einen Beamer, eine Tortengrafik und ein Anliegen. 'Die Befragung ist ausgewertet!' Der Chef sieht auf die Uhr — die Gala wartet — und sagt trotzdem: 'Nur kurz.' Auf der Folie ist die IT das kleinste Stück, und es ist grau.",
				opts: [
					{ t: "Fragen, wie viele aus der IT teilgenommen haben", next: "beteiligung" },
					{ t: "Das graue Stück erst mal wirken lassen", next: "grau" }
				]
			},
			beteiligung: {
				char: "Sabine",
				text: "'Zwei', sagt Sabine, ohne nachzusehen. 'Von zwei Befragten sind beide unzufrieden, das sind hundert Prozent.' Sie sagt es, als sei die Zahl das Problem und nicht die Grundlage. Der Chef notiert 'hundert Prozent'.",
				opts: [
					{ t: "Erklären, was zwei Antworten statistisch bedeuten", next: "statistik" },
					{ t: "Fragen, was in den zwei Antworten steht", next: "antworten" }
				]
			},
			grau: {
				char: "Sabine",
				text: "'Grau ist keine Wertung', sagt Sabine schnell. 'Grau ist neutral.' Alle anderen Abteilungen haben eine Farbe. Die Buchhaltung ist türkis. Sabine klickt weiter. Die nächste Folie heißt MASSNAHMEN und trägt bereits drei Punkte.",
				opts: [
					{ t: "Die drei Maßnahmen lesen", next: "massnahmen" },
					{ t: "Fragen, warum die IT grau ist und der Rest nicht", next: "farbe" }
				]
			},
			statistik: {
				char: "Sabine",
				text: "Du erklärst Stichprobengröße in zwei ruhigen Sätzen. Sabine hört zu und wird währenddessen langsamer. 'Also sagen Sie, die Zahlen sind falsch?' Der Chef sieht von seinen Notizen auf. Er hat 'hundert Prozent' bereits unterstrichen.",
				opts: [
					{ t: "'Die Zahlen stimmen. Sie bedeuten nur nichts.'", next: "res_stichprobe" },
					{ t: "Zurückrudern und die Zahlen stehen lassen", next: "res_zurueck" },
					{ t: "Schweigen und den Chef antworten lassen", next: "res_schweigen_umf" }
				]
			},
			antworten: {
				char: "Sabine",
				text: "Sabine blättert zum Anhang. Antwort eins: 'Zu wenig Personal.' Antwort zwei: 'Zu wenig Personal.' Beide Male dasselbe, wortgleich, von zwei verschiedenen Leuten. Sabine sagt: 'Das haben wir als Einzelmeinung eingeordnet.'",
				opts: [
					{ t: "Nachhaken, wie zwei gleiche Antworten eine Einzelmeinung sind", next: "res_einzelmeinung" },
					{ t: "Es im Protokoll festhalten lassen und weitergehen", next: "res_protokolliert" }
				]
			},
			massnahmen: {
				char: "Sabine",
				text: "Punkt eins: Obstkorb. Punkt zwei: Feedback-Kultur stärken. Punkt drei: Digitale Zufriedenheits-App. Bei Punkt drei sieht Sabine dich an, und der Chef sieht dich auch an, und du weißt in dieser Sekunde, wer die App betreuen wird.",
				opts: [
					{ t: "Die App übernehmen, bevor jemand anderes sie definiert", next: "res_app" },
					{ t: "Auf den Obstkorb verweisen, der schon einmal da war", next: "res_obstkorb" }
				]
			},
			farbe: {
				char: "Sabine",
				text: "'Weil unter fünf Antworten keine Farbe vergeben wird.' Sabine sagt es freundlich und ohne zu merken, was sie damit gesagt hat. Der Chef nickt zufrieden. Die Regel steht in keiner Fußnote, aber sie erklärt die ganze Folie.",
				opts: [
					{ t: "Es auf sich beruhen lassen", next: "res_regel" },
					{ t: "Fragen, welche Abteilungen sonst noch unter fünf liegen", next: "res_nachfragen" },
					{ t: "Die Folie abfotografieren", next: "res_foto" }
				]
			}
		},
		results: {
			res_stichprobe: {
				txt: "'Die Zahlen stimmen. Sie bedeuten nur nichts.' Sabine schweigt einen Moment zu lang, dann klappt sie den Laptop zu. Die Folie mit den hundert Prozent taucht nie wieder auf. Die mit dem Obstkorb schon.",
				m: 45, f: 0, a: 5, c: 5
			},
			res_zurueck: {
				txt: "Du ruderst zurück, und die hundert Prozent bleiben stehen. Zwei Wochen später hängen sie ausgedruckt am schwarzen Brett, mit einem Pfeil nach unten und der Überschrift 'Hier setzen wir an'.",
				m: 45, f: 5, a: 10, c: -5
			},
			res_einzelmeinung: {
				txt: "'Zwei identische Antworten sind zwei Antworten.' Sabine notiert es tatsächlich. Im Ergebnisbericht steht später ein neuer Absatz: 'Personalsituation (mehrfach genannt)'. Es ist der erste Satz zum Thema, der es je in ein Dokument geschafft hat.",
				rep: { "Frau Elster": 5 },
				m: 55, f: -5, a: 5, c: 5
			},
			res_protokolliert: {
				txt: "Du lässt es protokollieren und ziehst weiter. Der Satz steht im Protokoll, das Protokoll steht im Ordner, der Ordner steht im Regal, und dort steht er wenigstens.",
				m: 45, f: 5, a: 0, c: 0
			},
			res_app: {
				txt: "Du sagst zu, die App zu betreuen, bevor sie jemand anderes ausschreibt. Sabine ist begeistert. Was du dir eingehandelt hast, wirst du erst im nächsten Quartal begreifen, aber es wird wenigstens funktionieren.",
				m: 55, f: -10, a: 10, c: -10
			},
			res_obstkorb: {
				txt: "'Den Obstkorb hatten wir schon.' Kurze Stille. Sabine sagt, diesmal werde er 'begleitet'. Der Chef findet Begleitung wichtig. Auf dem Rückweg denkst du an die Entnahmeliste und schweigst.",
				m: 45, f: 0, a: 5, c: 0
			},
			res_regel: {
				txt: "Du lässt die Regel stehen. Die IT bleibt grau, und Grau ist neutral. Beim Hinausgehen fällt dir auf, dass Neutral auf dieser Folie direkt neben Unzufrieden liegt, farblich betrachtet.",
				m: 40, f: 5, a: 5, c: 0
			},
			res_nachfragen: {
				txt: "'Welche Abteilungen liegen sonst noch unter fünf?' Sabine blättert. Es sind vier. Drei davon sind bunt. Sie sagt, das müsse ein Formatierungsfehler sein, und notiert sich, es zu prüfen. Geprüft wird es nicht, aber gefragt hat jemand.",
				m: 50, f: 0, a: 5, c: 5
			},
			res_schweigen_umf: {
				txt: "Du schweigst. Der Chef antwortet an deiner Stelle: die IT sei 'sehr gefordert'. Sabine notiert 'gefordert'. Zum ersten Mal beschreibt jemand in diesem Haus den Zustand deiner Abteilung richtig, und ausgerechnet er hat es getan.",
				m: 40, f: 5, a: 0, c: 0
			},
			res_foto: {
				txt: "Du fotografierst die Folie ab. Sabine fragt, wofür. Du sagst: 'Für die Unterlagen.' Sie findet das professionell. Im März wird die Folie in einer anderen Präsentation auftauchen, in geänderter Form, und du wirst das Original haben.",
				m: 45, f: 0, a: 0, c: 5
			}
		}
	},

	{
		id: "meet_video_1",
		title: "Schalte nach Süd",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "Auf der Leinwand ist ein Besprechungsraum zu sehen, der eurem gleicht, nur heller. Vier Leute sitzen dort, einer davon steht auf und winkt. 'Da sind sie ja!', sagt der Chef. 'Die Kollegen aus Süd.' Man hört nichts. Die Kollegen aus Süd bewegen die Münder.",
				opts: [
					{ t: "Den Ton in Ordnung bringen", next: "ton" },
					{ t: "Abwarten, ob es sich von selbst löst", next: "abwarten" }
				]
			},
			root_gala: {
				text: "Auf der Leinwand ist ein Besprechungsraum zu sehen, der eurem gleicht, nur heller. 'Da sind sie ja, die Kollegen aus Süd!' Unten läuft die Gala bereits an, oben hört man nichts. Die Kollegen aus Süd bewegen die Münder.",
				opts: [
					{ t: "Den Ton in Ordnung bringen", next: "ton" },
					{ t: "Abwarten, ob es sich von selbst löst", next: "abwarten" }
				]
			},
			ton: {
				text: "Das Mikrofon in Süd ist stummgeschaltet, erkennbar am roten Symbol, das dort niemand sieht, weil dort alle auf ihre eigene Kamera schauen. Du tippst es in den Chat. Nach zwanzig Sekunden liest es jemand vor — laut, im stummen Raum.",
				opts: [
					{ t: "Warten, bis sie es selbst finden", next: "selbst" },
					{ t: "In Süd anrufen und es durchsagen", next: "anrufen" }
				]
			},
			abwarten: {
				text: "Es löst sich nicht von selbst. Der Chef beginnt, in die Leinwand zu sprechen, langsam und übertrieben deutlich, wie man mit Menschen spricht, die einen nicht hören können. In Süd nicken alle freundlich.",
				opts: [
					{ t: "Ihn weitermachen lassen", next: "weitermachen" },
					{ t: "Jetzt eingreifen", next: "eingreifen" }
				]
			},
			selbst: {
				text: "Sie finden es. Nach zwei Minuten kommt der Ton, mitten in einem Satz: '...also ich sag mal, so wie das hier läuft.' Alle in Süd erstarren. Der Chef fragt, was da gerade gesagt wurde.",
				opts: [
					{ t: "'Technische Störung. Nicht relevant.'", next: "res_deckel" },
					{ t: "Wiederholen, was du gehört hast", next: "res_wiederholen" },
					{ t: "Den Ton wieder abschalten", next: "res_ton_aus" }
				]
			},
			anrufen: {
				text: "Du rufst in Süd an. Es klingelt lange. Dann meldet sich eine Kollegin, hörbar aus demselben Raum, den ihr auf der Leinwand seht. 'Der Herr Leuchter ist gerade in einem Termin', sagt sie. Auf der Leinwand steht Herr Leuchter auf und winkt in die Kamera.",
				opts: [
					{ t: "Es ihr erklären, ohne zu lachen", next: "res_erklaeren_sued" },
					{ t: "'Ich sehe ihn. Er winkt gerade.'", next: "res_winkt" }
				]
			},
			weitermachen: {
				text: "Der Chef spricht sieben Minuten in eine stumme Leinwand. Es ist der zusammenhängendste Vortrag, den du je von ihm gehört hast — kein Zwischenruf, keine Nachfrage, kein Widerspruch. In Süd hat inzwischen jemand ein Blatt Papier hochgehalten: KEIN TON.",
				opts: [
					{ t: "Auf das Blatt zeigen", next: "res_blatt" },
					{ t: "Ihn den Vortrag zu Ende bringen lassen", next: "res_vortrag" }
				]
			},
			eingreifen: {
				text: "Du unterbrichst ihn mitten im Satz und sagst, dass Süd nichts hört. Der Chef mustert dich, dann die Leinwand, dann wieder dich. 'Seit wann?' Seit Anfang. 'Und warum sagen Sie das erst jetzt?'",
				opts: [
					{ t: "Die Frage beantworten", next: "res_antwort" },
					{ t: "Den Ton reparieren statt zu antworten", next: "res_reparieren" }
				]
			}
		},
		results: {
			res_deckel: {
				txt: "'Technische Störung.' Der Chef gibt sich damit zufrieden, Süd auch. Die vier auf der Leinwand sehen dich an, und einer von ihnen hebt kurz den Daumen. Ihr habt euch nie gesprochen, aber jetzt schuldet dir jemand in Süddeutschland etwas.",
				m: 50, f: 0, a: -5, c: 0
			},
			res_wiederholen: {
				txt: "Du wiederholst es wörtlich. In Süd wird sehr still. Der Chef will es zweimal genau wissen. Beim zweiten Mal antwortet Herr Leuchter höflich, es sei um die Kaffeequalität gegangen. Es war nicht um die Kaffeequalität gegangen.",
				m: 50, f: 0, a: 10, c: 5
			},
			res_erklaeren_sued: {
				txt: "Du erklärst es ruhig: das rote Symbol, der Knopf, die Reihenfolge. Sie bedankt sich, legt auf, und zwölf Sekunden später kommt der Ton. Beim Verabschieden sagt Herr Leuchter deinen Namen, richtig ausgesprochen. Es ist das erste Mal.",
				m: 55, f: -5, a: -5, c: 0
			},
			res_winkt: {
				txt: "'Ich sehe ihn. Er winkt gerade.' Am anderen Ende ist es kurz still. Dann sagt sie: 'Ach so, die Schalte.' Der Ton kommt, Herr Leuchter setzt sich, und ihr habt endlich gleichzeitig geredet, ohne euch je erreicht zu haben.",
				m: 45, f: 0, a: -10, c: 0
			},
			res_blatt: {
				txt: "Du zeigst auf das Blatt. Der Chef liest KEIN TON, sieht auf seine Notizen, dann auf die sieben Minuten, die er gerade gesprochen hat. 'Das wiederhole ich nicht', sagt er, und der Termin ist beendet. Niemand widerspricht.",
				m: 45, f: 0, a: -5, c: 5
			},
			res_vortrag: {
				txt: "Er bringt es zu Ende, und es ist gut. Erst danach fällt das Blatt auf. Der Chef fragt in die Runde, ob wenigstens hier jemand zugehört habe. Alle nicken. Gefragt wird nicht nach.",
				m: 55, f: 5, a: 5, c: -5
			},
			res_antwort: {
				txt: "'Ich dachte, es fällt jemandem auf.' Der Chef sagt: 'Es ist jemandem aufgefallen. Ihnen.' Damit hat er recht, und du wirst diesen Satz noch eine Weile mit dir herumtragen.",
				m: 45, f: 0, a: 10, c: 5
			},
			res_reparieren: {
				txt: "Du antwortest nicht, du machst. Zwei Sätze in den Chat, ein Anruf, Ton. Der Chef vergisst die Frage über der Lösung, wie immer, und Süd redet endlich — vierzig Minuten, ohne Pause, über Themen, die euch nicht betreffen.",
				m: 60, f: -5, a: 5, c: -5
			},
			res_ton_aus: {
				txt: "Du schaltest den Ton wieder ab, bevor der Satz zu Ende ist. Auf der Leinwand sieht man, wie Herr Leuchter erleichtert die Augen schließt. Der Chef fragt, was los sei. 'Leitung', sagst du. Niemand widerspricht einer Leitung.",
				m: 45, f: 0, a: -5, c: 0
			}
		}
	},

	{
		id: "meet_leer_1",
		title: "Termin ohne Teilnehmer",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "Der Besprechungsraum ist leer. Der Beamer läuft und zeigt den Startbildschirm. Auf dem Tisch stehen zwölf Wassergläser, alle unbenutzt, in einer Reihe. Im Kalender steht der Termin, mit dir als einzigem Teilnehmer, der zugesagt hat.",
				opts: [
					{ t: "Sitzen bleiben und warten", next: "warten" },
					{ t: "Nachsehen, wer sonst eingeladen war", next: "einladung" }
				]
			},
			root_gala: {
				text: "Der Besprechungsraum ist leer. Der Beamer läuft, zwölf Wassergläser stehen unbenutzt in einer Reihe. Von unten hört man schon die Musik der Gala. Im Kalender steht der Termin, mit dir als einzigem Teilnehmer, der zugesagt hat.",
				opts: [
					{ t: "Sitzen bleiben und warten", next: "warten" },
					{ t: "Nachsehen, wer sonst eingeladen war", next: "einladung" }
				]
			},
			warten: {
				text: "Nach elf Minuten kommt jemand herein, den du nicht kennst, sieht sich um und sagt: 'Ach, hier ist es auch nicht.' Dann geht er wieder. Nach weiteren vier Minuten kommt Gabi mit einem Stapel Post und fragt, ob der Raum frei sei.",
				opts: [
					{ t: "'Ich habe hier einen Termin.'", next: "termin_verteidigen" },
					{ t: "Den Raum freigeben", next: "raum_frei" }
				]
			},
			einladung: {
				text: "Vierzehn Eingeladene. Dreizehn haben abgesagt, alle mit demselben Text: 'Leider terminlich verhindert.' Wortgleich, auch in der Zeichensetzung. Der vierzehnte bist du, und du hast zugesagt, weil du die Mail nicht gelesen hast.",
				opts: [
					{ t: "Herausfinden, wer den Termin eingestellt hat", next: "urheber" },
					{ t: "Ebenfalls absagen, rückwirkend", next: "rueckwirkend" }
				]
			},
			termin_verteidigen: {
				text: "'Mit wem denn?', fragt Gabi, freundlich und ohne Spott. Du siehst auf den Kalender. Du siehst auf die zwölf Gläser. Gabi wartet mit ihrem Poststapel und hat offensichtlich Zeit.",
				opts: [
					{ t: "'Mit mir.'", next: "res_mit_mir" },
					{ t: "Sie fragen, ob sie weiß, was das für ein Termin ist", next: "res_gabi_weiss" },
					{ t: "Gehen und den Raum ihr überlassen", next: "res_ueberlassen" }
				]
			},
			raum_frei: {
				text: "Du gibst den Raum frei. Gabi legt den Poststapel ab, sortiert im Stehen und redet dabei. Nach zehn Minuten weißt du, wer nächste Woche kündigt, warum der Kopierer im dritten Stock abgebaut wird und dass der Termin seit Monaten wöchentlich stattfindet.",
				opts: [
					{ t: "Nach dem Termin fragen", next: "res_serientermin" },
					{ t: "Nach dem Kopierer fragen", next: "res_kopierer" }
				]
			},
			urheber: {
				text: "Der Termin wurde eingestellt von einem Konto, das nur als Kürzel erscheint. Kein Klarname, keine Abteilung, keine Antwortadresse. Der Serientermin läuft seit vierzehn Monaten, wöchentlich, freitagnachmittags, und niemand hat ihn je gelöscht.",
				opts: [
					{ t: "Den Serientermin löschen", next: "res_loeschen" },
					{ t: "Ihn stehen lassen und die Absage vorbereiten", next: "res_absage" }
				]
			},
			rueckwirkend: {
				text: "Du sagst rückwirkend ab, mit demselben Wortlaut wie die anderen dreizehn. Die Bestätigung kommt sofort. Zwei Sekunden später kommt eine zweite Mail: Der Organisator hat den Termin auf nächsten Freitag verschoben, gleiche Uhrzeit, gleicher Raum.",
				opts: [
					{ t: "Auch den nächsten absagen", next: "res_naechster" },
					{ t: "Es dabei belassen und gehen", next: "res_gehen" }
				]
			}
		},
		results: {
			res_mit_mir: {
				txt: "'Mit mir.' Gabi nickt ernst, stellt den Poststapel ab und setzt sich für zwei Minuten dazu. Sie sagt nichts, du sagst nichts, die zwölf Gläser stehen unbenutzt. Es ist die friedlichste Besprechung des Jahres.",
				rep: { "Gabi": 5 },
				m: 45, f: 0, a: -10, c: 0
			},
			res_gabi_weiss: {
				txt: "Gabi weiß es natürlich. 'Das war mal die Projektrunde. Das Projekt ist seit einem Jahr durch.' Sie sagt es beiläufig, wie das Wetter. Den Termin löschen kann sie nicht, sagt sie, sie sei ja nicht der Organisator. Der Organisator ist niemand.",
				rep: { "Gabi": 5 },
				m: 50, f: 0, a: -5, c: 0
			},
			res_serientermin: {
				txt: "Der Termin läuft seit vierzehn Monaten. In dieser Zeit hat ihn genau einmal jemand wahrgenommen: du, heute. Gabi findet das lustig, du findest es weniger lustig, und der Beamer läuft immer noch.",
				m: 45, f: 5, a: 0, c: 0
			},
			res_kopierer: {
				txt: "Der Kopierer im dritten Stock wird abgebaut, weil er laut Statistik zu selten genutzt wird. Die Statistik zählt nur Aufträge über das Netzwerk. Der Kopierer im dritten Stock hängt nicht am Netzwerk. Das erklärt die Statistik vollständig.",
				m: 50, f: 0, a: 5, c: 0
			},
			res_loeschen: {
				txt: "Du löschst den Serientermin. Es dauert vier Sekunden und beendet vierzehn Monate. Am Montag fragt niemand danach. Am übernächsten Freitag fällt jemandem im Flur auf, dass er auf einmal Zeit hat, und er weiß nicht, warum.",
				m: 45, f: -5, a: -5, c: 5
			},
			res_absage: {
				txt: "Du lässt ihn stehen und legst dir die Absage als Vorlage an. Nächsten Freitag brauchst du sie wieder, und den Freitag darauf. Es ist die effizienteste Lösung und die falsche, und beides weißt du.",
				m: 40, f: 10, a: 0, c: 0
			},
			res_naechster: {
				txt: "Du sagst auch den nächsten ab. Die Bestätigung kommt, die Verschiebung kommt, der Kreis schließt sich. Irgendwo läuft ein Kalendereintrag im Leerlauf und wird alle euch überleben.",
				m: 40, f: 5, a: 5, c: 0
			},
			res_gehen: {
				txt: "Du gehst. Der Beamer läuft weiter, die zwölf Gläser stehen weiter, und am nächsten Freitag wird beides wieder so sein. Auf dem Flur überlegst du kurz, ob du den Beamer hättest ausschalten sollen, und gehst zurück.",
				m: 40, f: 0, a: -5, c: 0
			},
			res_ueberlassen: {
				txt: "Du überlässt Gabi den Raum und gehst. Auf dem Flur hörst du sie hinter dir telefonieren, laut und gut gelaunt. Der Beamer läuft weiter, die zwölf Gläser stehen weiter, und immerhin nutzt jetzt jemand den Termin.",
				m: 35, f: 5, a: -5, c: 0
			}
		}
	},

	{
		id: "meet_audit_1",
		title: "Vorbereitung der Prüfung",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "Frau Elster sitzt bereits, mit zwei Ordnern und einem Zettel, auf dem etwas durchgestrichen ist. 'Die externe Prüfung kommt im März', sagt der Chef. 'Wir gehen die Liste durch.' Die Liste hat achtzehn Punkte. Vierzehn davon betreffen die IT.",
				opts: [
					{ t: "Die vierzehn Punkte einzeln durchgehen", next: "punkte" },
					{ t: "Fragen, wer die Liste erstellt hat", next: "liste" }
				]
			},
			root_gala: {
				text: "Frau Elster sitzt bereits, mit zwei Ordnern und einem durchgestrichenen Zettel. 'Die externe Prüfung kommt im März', sagt der Chef und wirft einen Blick nach unten, wo die Gala anläuft. 'Wir gehen die Liste durch. Zügig.' Vierzehn der achtzehn Punkte betreffen die IT.",
				opts: [
					{ t: "Die vierzehn Punkte einzeln durchgehen", next: "punkte" },
					{ t: "Fragen, wer die Liste erstellt hat", next: "liste" }
				]
			},
			punkte: {
				char: "Frau Elster",
				text: "Punkt eins: Zugriffsrechte dokumentiert. Punkt zwei: Passwortrichtlinie umgesetzt. Punkt drei: Ausgeschiedene Mitarbeiter gesperrt. Bei Punkt drei sieht Frau Elster von ihrem Ordner auf und wartet, ob du etwas sagst.",
				opts: [
					{ t: "Bei Punkt drei ehrlich sein", next: "punkt_drei" },
					{ t: "Punkt drei abhaken und weitergehen", next: "abhaken" }
				]
			},
			liste: {
				char: "Frau Elster",
				text: "'Die Liste ist von der Prüfgesellschaft', sagt Frau Elster. 'Von der letzten Prüfung.' Sie legt sie neben eine zweite, identische. 'Das ist die von vorletzter. Die Punkte sind dieselben.' Der Chef sagt, dann seien sie ja bekannt.",
				opts: [
					{ t: "Fragen, warum sie zweimal offen sind", next: "zweimal" },
					{ t: "Anbieten, die vierzehn Punkte bis März abzuarbeiten", next: "anbieten" }
				]
			},
			punkt_drei: {
				char: "Frau Elster",
				text: "Du sagst, dass mindestens ein Konto noch aktiv ist. Frau Elster nickt, als hätte sie darauf gewartet, und schlägt eine Seite auf, die sie offenbar vorbereitet hat. Es sind nicht ein Konto. Es sind sieben.",
				opts: [
					{ t: "Zusagen, sie bis zur Prüfung zu bereinigen", next: "res_bereinigen" },
					{ t: "Sagen, dass dafür jemand entscheiden muss, wer zuständig ist", next: "res_zustaendig" },
					{ t: "Frau Elster fragen, was sie an deiner Stelle täte", next: "res_elster_rat" }
				]
			},
			abhaken: {
				char: "Frau Elster",
				text: "Du hakst ab. Frau Elster setzt kein Häkchen. Sie schreibt ein kleines Fragezeichen an den Rand, mit Bleistift, und blättert weiter. Bei Punkt sieben macht sie dasselbe. Bei Punkt elf auch.",
				opts: [
					{ t: "Die Fragezeichen ansprechen", next: "res_fragezeichen" },
					{ t: "Weiter abhaken", next: "res_weiter" }
				]
			},
			zweimal: {
				char: "Frau Elster",
				text: "'Weil sie zweimal zugesagt und nie erledigt wurden.' Sie sagt es ohne Vorwurf, im Tonfall einer Wettervorhersage. Der Chef räuspert sich. Die Zusagen sind von zwei Vorgängern, und beide sind nicht mehr im Haus.",
				opts: [
					{ t: "Diesmal nur zusagen, was zu schaffen ist", next: "res_realistisch" },
					{ t: "Alle vierzehn zusagen, wie die Vorgänger", next: "res_alle" }
				]
			},
			anbieten: {
				char: "Frau Elster",
				text: "Der Chef atmet hörbar aus und sagt 'sehr gut' zweimal. Frau Elster notiert es. Dann fragt sie, ohne aufzusehen: 'Und neben dem Tagesgeschäft?' Es ist die einzige ehrliche Frage, die in diesem Raum heute gestellt wird.",
				opts: [
					{ t: "'Neben dem Tagesgeschäft.'", next: "res_neben" },
					{ t: "Sagen, was dafür liegen bleiben würde", next: "res_liegenbleiben" }
				]
			}
		},
		results: {
			res_bereinigen: {
				txt: "Du sagst zu, die sieben Konten zu sperren. Frau Elster notiert Datum und Uhrzeit deiner Zusage — nicht aus Misstrauen, sondern weil sie alles notiert. Im März wird sie die Seite aufschlagen, und dann willst du dort ein Häkchen sehen.",
				rep: { "Frau Elster": 5 },
				m: 55, f: -5, a: 5, c: 0
			},
			res_zustaendig: {
				txt: "'Dafür muss jemand entscheiden, wer zuständig ist.' Kurze Stille. Der Chef sagt, das sei doch klar. Frau Elster fragt: 'Wer denn?' Der Chef antwortet nicht, und die Frage steht bis zum Ende des Termins im Raum.",
				m: 50, f: 0, a: 5, c: 10
			},
			res_fragezeichen: {
				txt: "'Was bedeuten die Fragezeichen?' Frau Elster sieht auf. 'Dass ich es prüfen werde.' Sie sagt es freundlich. Es ist die höflichste Drohung, die dir je jemand ausgesprochen hat, und sie meint es nicht als eine.",
				m: 45, f: 0, a: 10, c: 0
			},
			res_weiter: {
				txt: "Ihr hakt vierzehn Punkte in elf Minuten ab. Der Chef ist zufrieden, das Protokoll ist kurz, und am Rand von Frau Elsters Liste stehen jetzt neun Fragezeichen. Sie wird jedes einzelne prüfen. Sie hat Zeit bis März.",
				m: 40, f: 10, a: 5, c: -5
			},
			res_realistisch: {
				txt: "Du sagst vier von vierzehn zu, mit Datum. Der Chef findet vier wenig. Frau Elster findet vier realistisch und schreibt es so ins Protokoll. Im März sind es vier erledigte Punkte — die ersten seit zwei Prüfungen.",
				rep: { "Frau Elster": 10 },
				m: 50, f: -5, a: 0, c: 5
			},
			res_alle: {
				txt: "Du sagst alle vierzehn zu. Der Chef ist begeistert und sagt es auch. Frau Elster schreibt es auf, ohne etwas zu sagen, und du weißt beim Schreiben schon, dass sie im März eine dritte identische Liste haben wird.",
				m: 45, f: 5, a: 10, c: -10
			},
			res_neben: {
				txt: "'Neben dem Tagesgeschäft.' Frau Elster nickt und schreibt es genau so ins Protokoll: neben dem Tagesgeschäft. Der Satz wird im März gelesen werden, von Leuten, die wissen, was er bedeutet.",
				m: 50, f: 0, a: 10, c: -5
			},
			res_liegenbleiben: {
				txt: "Du zählst auf, was dafür liegen bleibt: Ticketrückstand, Serverwartung, zwei Migrationen. Der Chef hört bis zur Hälfte zu. Frau Elster hört bis zum Ende zu und schreibt alles mit. Eines der beiden ist mehr wert.",
				rep: { "Frau Elster": 5 },
				m: 55, f: -5, a: 5, c: 5
			},
			res_elster_rat: {
				txt: "'Was würden Sie an meiner Stelle tun?' Frau Elster sieht auf, überrascht, und denkt tatsächlich nach. 'Vier Punkte. Schriftlich. Mit Datum.' Dann, leiser: 'Und die anderen zehn im nächsten Jahr, mit demselben Satz.'",
				rep: { "Frau Elster": 10 },
				m: 50, f: -5, a: -5, c: 0
			}
		}
	},

	{
		id: "meet_ki_1",
		title: "Pilotprojekt Assistenz",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "Auf der Leinwand tippt ein Chatfenster von selbst. 'Das ist Aiden', sagt der Berater. 'Er beantwortet Tickets.' Der Chef strahlt. Auf der Folie darunter steht, womit Aiden trainiert wurde: mit den Ticketantworten der letzten drei Jahre. Deinen.",
				opts: [
					{ t: "Fragen, wer die Antworten freigegeben hat", next: "freigabe" },
					{ t: "Aiden eine Frage stellen lassen", next: "test" }
				]
			},
			root_gala: {
				text: "Auf der Leinwand tippt ein Chatfenster von selbst. 'Das ist Aiden. Er beantwortet Tickets.' Unten läuft die Gala an, hier oben strahlt der Chef. Auf der Folie steht, womit Aiden trainiert wurde: mit den Ticketantworten der letzten drei Jahre. Deinen.",
				opts: [
					{ t: "Fragen, wer die Antworten freigegeben hat", next: "freigabe" },
					{ t: "Aiden eine Frage stellen lassen", next: "test" }
				]
			},
			freigabe: {
				text: "'Freigegeben?' Der Berater sieht zum Chef, der Chef sieht auf seine Unterlagen. 'Es sind ja Firmendaten', sagt der Berater schließlich. Der Satz stimmt und beantwortet die Frage nicht. Im Chatfenster tippt Aiden weiter.",
				opts: [
					{ t: "Nachhaken", next: "nachhaken" },
					{ t: "Es stehen lassen und zusehen, was Aiden schreibt", next: "zusehen" }
				]
			},
			test: {
				text: "Der Berater tippt eine Beispielfrage: 'Mein Drucker geht nicht.' Aiden antwortet in zwei Sekunden: 'Ist das Gerät eingeschaltet? Bitte prüfen Sie zunächst Kabel und Papierfach.' Es ist wortwörtlich dein Standardsatz, inklusive des Kommas, das dort falsch sitzt.",
				opts: [
					{ t: "Auf das Komma hinweisen", next: "komma" },
					{ t: "Eine schwierigere Frage vorschlagen", next: "schwierig" }
				]
			},
			nachhaken: {
				text: "Du fragst zum zweiten Mal, ruhig und in einem Satz. Der Berater sagt, das kläre die Rechtsabteilung. Ihr habt keine Rechtsabteilung. Der Chef sagt, das kläre die Buchhaltung, und meint Frau Elster, die davon nichts weiß.",
				opts: [
					{ t: "Es dabei belassen und die Frage protokollieren lassen", next: "res_protokoll_ki" },
					{ t: "Sagen, dass es keine Rechtsabteilung gibt", next: "res_keine_rechts" }
				]
			},
			zusehen: {
				text: "Aiden beantwortet vier Tickets in elf Sekunden. Drei Antworten sind gut. Die vierte empfiehlt einem Kunden, den Server neu zu starten, und es ist der Produktivserver, und die Empfehlung klingt exakt wie du an einem schlechten Freitag.",
				opts: [
					{ t: "Die vierte Antwort im Raum vorlesen", next: "res_vierte" },
					{ t: "Sie später still aus dem Trainingsmaterial nehmen", next: "res_still" },
					{ t: "Den Berater fragen, wer für die Antworten haftet", next: "res_haftung" }
				]
			},
			komma: {
				text: "'Das Komma sitzt falsch.' Der Berater lächelt höflich. 'Das lernt er noch.' Dann versteht er, was du gesagt hast, und sieht die Antwort noch einmal an. Der Chef kann dem nicht folgen. Ist das nun gut oder schlecht?",
				opts: [
					{ t: "'Es ist mein Komma.'", next: "res_mein_komma" },
					{ t: "'Es ist gut. Das ist das Problem.'", next: "res_gut_problem" }
				]
			},
			schwierig: {
				text: "Du gibst eine echte Frage aus dieser Woche ein: die Sache mit dem Etikettendruck und den Umlauten. Aiden antwortet ausführlich, freundlich, in vier Absätzen. Nichts davon ist richtig. Der Chef findet die Antwort sehr strukturiert.",
				opts: [
					{ t: "Die richtige Antwort danebenstellen", next: "res_daneben" },
					{ t: "Den Chef die Antwort loben lassen", next: "res_loben" }
				]
			}
		},
		results: {
			res_protokoll_ki: {
				txt: "Die Frage steht im Protokoll, unbeantwortet, mit deinem Namen davor. Das ist wenig und mehr als nichts. Aiden geht im Januar in den Pilotbetrieb, und deine Frage geht mit ihm.",
				m: 50, f: 0, a: 5, c: 0
			},
			res_keine_rechts: {
				txt: "'Wir haben keine Rechtsabteilung.' Der Berater blättert, findet nichts und notiert es. Der Chef sagt, man werde 'jemanden hinzuziehen'. Drei Wochen später sitzt tatsächlich eine Anwältin im Haus, und sie stellt genau deine Frage.",
				rep: { "Frau Elster": 5 },
				m: 55, f: 0, a: 10, c: 5
			},
			res_vierte: {
				txt: "Du liest die vierte Antwort laut vor, bis zu der Stelle mit dem Neustart. Der Berater sagt, das sei ein Trainingsartefakt. Der Chef fragt, was ein Produktivserver ist. Aiden geht trotzdem in den Pilotbetrieb, aber mit einer Freigabestufe davor.",
				m: 55, f: -5, a: 5, c: 5
			},
			res_still: {
				txt: "Du sagst nichts und nimmst die Antwort abends still aus dem Material. Niemand erfährt es, niemand dankt dafür, und im Januar startet ein Pilot, der eine Katastrophe weniger enthält. Es ist die Art Arbeit, für die es keine Zeile im Protokoll gibt.",
				m: 45, f: -10, a: 0, c: 0
			},
			res_mein_komma: {
				txt: "'Es ist mein Komma.' Der Raum ist kurz still. Der Berater sagt, das zeige doch, wie gut das Modell die Hausstimme treffe. Er meint es als Kompliment, und in gewisser Hinsicht ist es eines. Du gehst trotzdem anders aus dem Termin, als du hineingegangen bist.",
				m: 50, f: 0, a: 5, c: 0
			},
			res_gut_problem: {
				txt: "'Es ist gut. Das ist das Problem.' Der Chef versteht es beim zweiten Anlauf und wird still. Der Berater klickt zur nächsten Folie, auf der ein Einsparpotenzial steht. Er überspringt sie, ohne sie zu erklären, und alle haben sie gesehen.",
				m: 50, f: 0, a: 10, c: 5
			},
			res_daneben: {
				txt: "Du stellst die richtige Antwort daneben: zwei Sätze, ein Haken in den Druckeinstellungen. Der Unterschied ist auf der Leinwand gut zu sehen. Der Berater fotografiert die Folie ab. Er sagt, das sei wertvolles Trainingsmaterial, und meint dich.",
				m: 55, f: -5, a: 0, c: 5
			},
			res_loben: {
				txt: "Der Chef lobt die Antwort ausführlich, besonders die Struktur. Aiden hat vier Absätze über etwas geschrieben, das er nicht weiß, und wurde dafür gelobt. Du erkennst darin ein Karrieremodell, das in diesem Haus gut funktioniert.",
				m: 45, f: 5, a: 5, c: -5
			},
			res_haftung: {
				txt: "'Wer haftet für die Antworten?' Der Berater sagt, das Modell sei ein Werkzeug. Du fragst, wer für ein Werkzeug haftet. Er sagt: der Anwender. Alle im Raum sehen dich an, und du bist der Anwender.",
				m: 50, f: 0, a: 10, c: 5
			}
		}
	},

	{
		id: "meet_kultur_1",
		title: "Workshop Besprechungskultur",
		startNode: "root",
		startNodeGala: "root_gala",
		nodes: {
			root: {
				text: "'Wir haben zu viele Meetings', sagt der Chef. 'Deshalb dieser Termin.' Neben ihm sitzt eine Beraterin mit einer Auswertung: einhundertvierzig Stunden Besprechungszeit im Monat, hausweit. Auf Folie zwei steht, wie viele davon als 'notwendig' bewertet wurden. Es sind einundzwanzig.",
				opts: [
					{ t: "Fragen, in welche Kategorie dieser Termin fällt", next: "kategorie" },
					{ t: "Nach den einhundertneunzehn anderen Stunden fragen", next: "restliche" }
				]
			},
			root_gala: {
				text: "'Wir haben zu viele Meetings. Deshalb dieser Termin.' Der Chef sagt es ohne jede Ironie, während unten die Gala anläuft. Neben ihm eine Beraterin mit einer Auswertung: einhundertvierzig Stunden Besprechungszeit im Monat. Notwendig davon: einundzwanzig.",
				opts: [
					{ t: "Fragen, in welche Kategorie dieser Termin fällt", next: "kategorie" },
					{ t: "Nach den einhundertneunzehn anderen Stunden fragen", next: "restliche" }
				]
			},
			kategorie: {
				text: "Die Beraterin lacht als Einzige. 'Guter Punkt.' Dann wird sie ernst: 'Dieser Termin ist eine Investition.' Sie schreibt INVESTITION auf das Flipchart und darunter eine Zahl mit Eurozeichen, die den Tagessatz meint und die niemand kommentiert.",
				opts: [
					{ t: "Die Zahl kommentieren", next: "zahl_kommentieren" },
					{ t: "Nach den Regeln fragen, die sie vorschlägt", next: "regeln" }
				]
			},
			restliche: {
				text: "'Die übrigen Stunden verteilen sich auf Abstimmungen, Jour fixes und Serientermine.' Sie klickt weiter. Ein Balkendiagramm, sortiert nach Abteilung. Der längste Balken gehört dem Vertrieb. Der zweitlängste einer Abteilung namens 'Sonstige'.",
				opts: [
					{ t: "Fragen, wer 'Sonstige' ist", next: "sonstige" },
					{ t: "Auf den Serienterminen bestehen", next: "serientermine" }
				]
			},
			zahl_kommentieren: {
				text: "Du rechnest laut: der Tagessatz gegen die einundzwanzig notwendigen Stunden. Die Beraterin hört ruhig zu und sagt dann: 'Deshalb machen wir das ja nur einmal.' Der Chef nickt. Im Kalender steht der Folgetermin bereits, in vier Wochen.",
				opts: [
					{ t: "Auf den Folgetermin hinweisen", next: "res_folgetermin" },
					{ t: "Es dabei belassen", next: "res_belassen" }
				]
			},
			regeln: {
				text: "Drei Regeln. Erstens: keine Termine ohne Agenda. Zweitens: keine Termine über dreißig Minuten. Drittens: wer nicht beitragen kann, sagt ab. Die Regeln sind gut. Dieser Termin verstößt gegen alle drei.",
				opts: [
					{ t: "Das aussprechen", next: "res_verstoss" },
					{ t: "Die Regeln mitschreiben und selbst anwenden", next: "res_anwenden" },
					{ t: "Fragen, ob die Regeln auch für die Geschäftsführung gelten", next: "res_auch_gf" }
				]
			},
			sonstige: {
				text: "'Sonstige' ist die Sammelkategorie für alles, was keiner Abteilung zugeordnet werden konnte. Die Beraterin öffnet die Detailansicht. Der größte Posten darin trägt den Namen deiner Abteilung, falsch geschrieben, mit Bindestrich.",
				opts: [
					{ t: "Die Schreibweise richtigstellen", next: "res_schreibweise" },
					{ t: "Fragen, ob das die Auswertung verändert", next: "res_auswertung" }
				]
			},
			serientermine: {
				text: "'Serientermine sind das eigentliche Thema', sagst du. Die Beraterin stimmt sofort zu und zeigt eine Zahl: dreihundertelf aktive Serientermine im Haus. Bei achtzig davon ist der Organisator nicht mehr im Unternehmen.",
				opts: [
					{ t: "Anbieten, die achtzig zu bereinigen", next: "res_bereinigen_serien" },
					{ t: "Fragen, warum das noch niemand getan hat", next: "res_warum" }
				]
			}
		},
		results: {
			res_folgetermin: {
				txt: "'Im Kalender steht der Folgetermin.' Die Beraterin sieht nach und nickt anerkennend. 'Zur Wirksamkeitskontrolle.' Sie sagt es, ohne zu zögern, und in diesem Moment verstehst du, dass sie ihren Beruf sehr gut beherrscht.",
				m: 50, f: 0, a: 5, c: 5
			},
			res_belassen: {
				txt: "Du lässt es. Die Zahl bleibt auf dem Flipchart stehen, den ganzen Termin lang, und niemand sieht sie noch einmal an. Beim Abbau reißt die Beraterin das Blatt ab und nimmt es mit.",
				m: 45, f: 5, a: 0, c: 0
			},
			res_verstoss: {
				txt: "'Dieser Termin verstößt gegen alle drei.' Es ist still. Dann lacht die Beraterin, ehrlich und laut, und sagt: 'Ja.' Der Termin endet vierzig Minuten früher als geplant. Es ist der einzige Freitag, an dem du vor Egon das Haus verlässt.",
				m: 35, f: 0, a: -10, c: 5
			},
			res_anwenden: {
				txt: "Du schreibst die drei Regeln mit und wendest sie ab Montag an. Deine eigenen Termine werden kürzer, und zweimal sagst du ab, weil du nichts beitragen kannst. Beim zweiten Mal fragt der Chef nach, warum du gefehlt hast.",
				m: 50, f: -5, a: 5, c: 5
			},
			res_schreibweise: {
				txt: "Du stellst die Schreibweise richtig. Die Beraterin korrigiert es in der Datei, und der Posten wandert aus 'Sonstige' in deine Abteilung. Der Balken deiner Abteilung ist danach der zweitlängste im Haus. Der Chef sieht ihn sich sehr genau an.",
				m: 50, f: 0, a: 5, c: 10
			},
			res_auswertung: {
				txt: "'Verändert das die Auswertung?' Die Beraterin sieht nach. Es verändert sie erheblich: zwei Abteilungen tauschen die Plätze, und der Vertrieb ist plötzlich nicht mehr Spitzenreiter. Sie sagt, sie rechne es neu. Die neue Fassung sieht niemand je.",
				m: 50, f: 0, a: 0, c: 5
			},
			res_bereinigen_serien: {
				txt: "Du bietest an, die achtzig verwaisten Serientermine zu bereinigen. Der Chef findet das großartig. Die Beraterin notiert es als Ergebnis des Workshops, und im Bericht steht später, der Workshop habe achtzig Termine eingespart. Gearbeitet hat daran genau eine Person.",
				m: 55, f: -10, a: 5, c: 0
			},
			res_warum: {
				txt: "'Warum hat das noch niemand getan?' Die Beraterin sieht den Chef an. Der Chef vertieft sich in seine Unterlagen. Nach einer Weile sagt sie: 'Weil niemand zuständig ist.' Sie schreibt ZUSTÄNDIGKEIT ans Flipchart, doppelt unterstrichen.",
				m: 45, f: 0, a: 5, c: 5
			},
			res_auch_gf: {
				txt: "'Gelten die Regeln auch für die Geschäftsführung?' Die Beraterin sieht den Chef an. Der Chef sagt 'selbstverständlich', in einem Tonfall, der etwas anderes bedeutet. Sie schreibt es trotzdem auf, wörtlich, mit seinem Namen davor.",
				m: 45, f: 0, a: 5, c: 10
			}
		}
	},
];
