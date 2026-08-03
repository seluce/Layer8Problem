export const party = [

	{
		id: 'party_start',
		title: 'SYSTEM OVERRIDE: Synergy-Gala',
		text: '16:30 Uhr. Du fährst gerade den Rechner runter und willst unauffällig durch den Hinterausgang verschwinden. Plötzlich taucht Chantal auf und klebt dir im Vorbeigehen einen grellen "Hello my name is"-Sticker direkt auf die Stirn. Du bist gefangen: Willkommen auf der GlobalCorp Sommerfeier.\n\nDas Event beginnt im großen Saal. Der CEO, Dr. Wichtig, hält gerade eine unfassbar zähe, 45-minütige Präsentation über "Agiles Feiern im Zeitalter der KI". Der Beamer ist unscharf, jemand hat den Laserpointer geklaut und die Klimaanlage ist offensichtlich ausgefallen.',
		opts: [
			{ t: 'Klatschend ertragen', a: 25, r: 'Du stehst in der Menge und klatschst brav im Takt der Floskeln. Es ist furchtbar peinlich, dir läuft der Schweiß den Rücken hinunter und deine Aggression steigt mit jedem weiteren Buzzword ins Unermessliche.', next: 'party_hub' },
			{ t: 'Stecker vom Beamer ziehen', f: 10, a: -15, r: 'Du tust so, als würdest du stolpern. Ein "technischer Defekt" beendet die Rede vorzeitig. Ein kollektives, leises Aufatmen geht durch den Saal. Du bist der stille Held der ersten Stunde.', next: 'party_hub' },
			{ t: 'Aufs Handy starren und abdriften', f: 20, a: 5, r: 'Du scrollst völlig apathisch durch Reddit. Der CEO redet und redet, aber du bist geistig längst im Feierabend-Modus. Sehr entspannend, auch wenn das Stehen nervt.', next: 'party_hub' }
		]
	},
	{
		id: 'party_hub',
		title: 'Der Party-Hub',
		text: 'Das Neonlicht flackert ungesund und aus den Boxen dröhnt der Bass.\n\nDu stehst im Vorraum. Die Luft ist stickig, der Lärm ohrenbetäubend. Du siehst Kollegen, die sich heute Dinge erlauben, für die sie sich am Montag in Grund und Boden schämen werden. Wohin jetzt?',
		opts: [
			{ t: '🍻 Zur Bar (Markus, Kevin & Co.)', action: { fn: "goToPartyStation", args: ["bar"] }, checkPool: 'bar' },
			{ t: '🥗 Zum Buffet (Essen & Überleben)', action: { fn: "goToPartyStation", args: ["buffet"] }, checkPool: 'buffet' },
			{ t: '🕺 Zur Tanzfläche (Lärm & Peinlichkeiten)', action: { fn: "goToPartyStation", args: ["dance"] }, checkPool: 'dance' },
			{ t: '🪴 In die Lounge (Gabi & Gerüchte)', action: { fn: "goToPartyStation", args: ["lounge"] }, checkPool: 'lounge' },
			{ t: '🚬 Vor die Tür (Raucher-Ecke)', action: { fn: "goToPartyStation", args: ["outside"] }, checkPool: 'outside' },
			{ t: '🚽 Auf die Toilette flüchten', action: { fn: "goToPartyStation", args: ["toilet"] }, checkPool: 'toilet' }
		]
	},
        
	// --- BAR EVENTS (7) ---
	{
		id: 'party_bar_1', loc: 'bar',
		char: "Markus",
		title: 'Die Krypto-Predigt',
		text: 'Du näherst dich der Bar. Markus aus dem Vertrieb hat Azubi Kevin in die Ecke gedrängt. Markus hat offensichtlich schon den dritten Scotch intus und erklärt dem völlig überforderten Praktikanten lautstark, wie man "High-Ticket-Synergien" in neue Krypto-Coins investiert. Kevin sieht aus, als würde er gleich anfangen zu weinen oder sich übergeben.',
		opts: [
			{ t: 'Markus direkt beleidigen', a: -10, f: -10, r: '"Markus, das ist ein glorifiziertes Schneeballsystem für BWL-Justusse", sagst du eiskalt. Die Musik scheint kurz zu stoppen. Markus läuft hochrot an, schnaubt verächtlich und stürmt beleidigt zur Toilette. Kevin haucht dir ein leises "Danke" zu.', next: 'party_hub' },
			{ t: 'Kevin mit Server-Notfall retten', a: -15, r: 'Du drängst dich mit hochwichtiger Miene dazwischen und tippst hektisch auf dein Handy. "Kevin! Das Rechenzentrum brennt, wir müssen los!" Du zerrst ihn weg. Markus merkt es nicht einmal und erklärt der leeren Wand weiter das Prinzip von Proof-of-Work.', next: 'party_hub' },
			{ t: 'Markus eine eigene Blockchain pitchen', a: 30, f: 15, r: 'Du erfindest spontan die "GlobalCoin", gedeckt durch die Kaffeebohnen der Kantine. Es ist unfassbar peinlich, aber Markus holt sofort begeistert seinen Notizblock raus. Du spürst, wie deine eigene Seele vor Fremdscham ein wenig zusammenschrumpft.', next: 'party_hub' },
			{ t: 'Popcorn holen und das Schauspiel genießen', f: 25, a: 10, r: 'Du holst dir genüsslich ein kühles Bier, lehnst dich bequem an den Tresen und beobachtest das Schauspiel. Kevins stummer Hilfeschrei in seinen Augen ist heute Abend deine persönliche, hochklassige Unterhaltungsshow.', next: 'party_hub' }
		]
	},
	{
		id: 'party_bar_2', loc: 'bar',
		title: 'Shots mit dem Vertrieb',
		text: 'Ein Pulk von Vertrieblern hat die Theke gekapert. Der Abteilungsleiter bestellt eine Runde extrem billigen Tequila für alle Umstehenden – auch für dich. "Auf die Keller-Kinder aus der IT!", brüllt er. Alle starren dich erwartungsvoll an.',
		opts: [
			{ t: 'Den Shot eiskalt exen', f: 35, a: -20, r: 'Das Zeug brennt wie 90-prozentiges Desinfektionsmittel und schmeckt nach Reue. Aber die Vertriebler johlen und klopfen dir auf die Schultern! Du hast dir den Respekt der Anzugträger gesichert und spürst, wie die Anspannung des Tages schlagartig verschwindet.', next: 'party_hub' },
			{ t: 'Den Shot heimlich in den Ficus kippen', f: 15, a: 0, r: 'Während die Meute brüllt und die Köpfe in den Nacken wirft, kippst du das Gift in einer fließenden Bewegung in den armen Ficus neben dir. Der Baum wird das Wochenende wohl nicht überleben, aber du behältst einen klaren Kopf.', next: 'party_hub' },
			{ t: 'Lautstark und genervt ablehnen', a: 25, r: '"Ich trinke nicht mit Leuten, die nicht mal ein PDF drehen können", verkündest du lautstark. Die feuchtfröhliche Stimmung kippt in Sekundenbruchteilen auf den Nullpunkt. Du stehst stolz, aber völlig isoliert an der Bar.', next: 'party_hub' },
			{ t: 'Wasser im Shotglas vortäuschen', f: 10, a: -5, r: 'Du tauschst das Glas unauffällig gegen Leitungswasser aus, reißt die Arme hoch und machst mit. Maximale Integration bei minimalem Hirnschwund. Ein echter, absolut reibungsloser Admin-Move.', next: 'party_hub' }
		]
	},
	{
		id: 'party_bar_3', loc: 'bar',
		title: 'Der zapfende Azubi',
		text: 'Der externe Barkeeper ist rauchen gegangen. Kevin versucht heimlich, ein Bier zu zapfen. Er reißt den Hahn auf. Das Glas besteht zu 95% aus Schaum, das Fass spuckt und das teure Pils droht überzulaufen.',
		opts: [
			{ t: 'Die Zapfanlage fachgerecht bedienen', f: -15, a: -10, r: 'Du schiebst Kevin sanft, aber bestimmt beiseite und zeigst ihm den heiligen 45-Grad-Winkel der Schankkunst. Das goldene Nass fließt perfekt ins Glas. Handwerk hat eben doch goldenen Boden, auch außerhalb der IT.', next: 'party_hub' },
			{ t: 'Ihn lauthals auslachen', a: 20, r: 'Du lachst so laut und dreckig, dass Kevin panisch zusammenzuckt. Er lässt das Glas fallen und eine klebrige, schaumige Sauerei ergießt sich über seine neuen Sneaker. Fies, aber für dich extrem befriedigend.', next: 'party_hub' },
			{ t: 'Fass übernehmen und ausschenken', f: 40, a: -20, r: 'Du legst dein Sakko ab und ernennst dich selbst zum inoffiziellen Schankwart der Gala. Innerhalb von Minuten hast du eine Schlange glücklicher, durstiger Kollegen vor dir. Du arbeitest zwar wieder, aber du bist der unangefochtene König der Bar.', next: 'party_hub' }
		]
	},
	{
		id: 'party_bar_4', loc: 'bar',
		title: 'Cocktail-Roulette',
		text: 'Ein Kollege aus der Buchhaltung mischt sich einen Cocktail: Blauer Pfefferminz-Sirup, Wodka und Weizenbier. Es sieht aus wie giftiges Spülwasser. "Willste auch mal nippen?"',
		opts: [
			{ t: 'Mutig einen winzigen Schluck nehmen', f: 20, a: 20, r: 'Du opferst dich für die Wissenschaft. Es schmeckt nach abgelaufener Zahnpasta, abgestandener Hefe und purem Schmerz. Dein Magen rebelliert sofort. Eine der schlechtesten Entscheidungen deines Lebens.', next: 'party_hub' },
			{ t: 'Ihn probieren lassen und zuschauen', a: 15, f: 10, r: 'Der Buchhalter nimmt einen großen Schluck, seine Augen weiten sich in panischer Reue. Er würgt, schlägt sich die Hand vor den Mund und sprintet im Vollsprint Richtung Herrentoilette. Ein absolut legendärer Anblick.', next: 'party_hub' },
			{ t: 'Den Becher aus der Hand schlagen', a: 10, f: -5, r: '"Das ist ein Verbrechen gegen den guten Geschmack und die Leber!", rufst du und schlägst ihm den Becher aus der Hand. Er guckt traurig auf die klebrige Pfütze, aber du hast gerade Schlimmeres verhindert.', next: 'party_hub' }
		]
	},
	{
		id: 'party_bar_5', loc: 'bar',
		title: 'Die goldene Firmenkarte',
		text: 'Du bemerkst, dass Dr. Wichtig seine schwarze Firmen-Kreditkarte auf dem klebrigen Tresen vergessen hat. Der Barkeeper fragt gerade: "Auf wessen Deckel gehen die fünf Flaschen Champagner dort drüben?"',
		opts: [
			{ t: 'Auf die Firmenkarte zeigen', f: 20, a: -10, r: '"Geht alles auf den Chef!", brüllst du durch die Bar und zeigst auf die Karte. Die Umstehenden jubeln ekstatisch. Der Barkeeper fängt an auszuschenken. Der Chef wird morgen beim Blick auf die Abrechnung bitterlich weinen.', next: 'party_hub' },
			{ t: 'Die Karte dem Chef zurückbringen', f: -10, a: -5, r: 'Du suchst den CEO in der Menge und drückst ihm die Karte in die Hand. Er grunzt nur ein knappes "Danke" und wendet sich wieder ab. Du erntest keinen Ruhm, aber immerhin ein reines Gewissen.', next: 'party_hub' },
			{ t: 'Dir selbst noch 3 Cocktails bestellen', f: 30, a: -15, r: 'Du nutzt die Gunst der Stunde eiskalt aus. Der Champagner war dir zu riskant, aber drei edle Mojitos fallen auf der Rechnung sicher nicht ins Gewicht. Du fühlst dich wie ein kriminelles Genie.', next: 'party_hub' }
		]
	},
	{
		id: 'party_bar_6', loc: 'bar',
		title: 'Der Gesundheits-Apostel',
		text: 'Du willst dir ein kühles Bier holen. Ein Kollege aus dem "Feel-Good-Management" blockiert den Kühlschrank. "Alkohol ist Gift für die Synergien! Trink dieses energetisierte Ingwer-Wasser!"',
		opts: [
			{ t: 'Ihn wegschieben: "Ich brauche Hopfen!"', a: -10, f: 0, r: 'Du schiebst ihn bestimmt zur Seite, reißt den Kühlschrank auf und greifst dir das eisgekühlte Pils. "Toxische Männlichkeit!", flüstert er entsetzt, während du zischend den Kronkorken abhebelst.', next: 'party_hub' },
			{ t: 'Diskutieren: "Bier ist auch nur Getreidesmoothie."', f: 15, a: 5, r: 'Du verwickelst ihn in eine hochgradig absurde, pseudowissenschaftliche Diskussion über die isotonischen Vorteile von Weizenbier, bis er entnervt die Augen verdreht und aufgibt. Sieg durch Nervtötung.', next: 'party_hub' },
			{ t: 'Ingwer-Wasser trinken (Unterwerfung)', f: 5, a: 15, r: 'Du fügst dich deinem Schicksal und nimmst einen Schluck. Es schmeckt wie scharfe Seife gemischt mit Spülwasser. Du ärgerst dich maßlos über deine eigene Schwäche und Rückgratlosigkeit.', next: 'party_hub' }
		]
	},
	{
		id: 'party_bar_7', loc: 'bar',
		title: 'Der Pink Drink',
		text: 'Der gestresste Barkeeper drückt dir kommentarlos ein riesiges, knallpinkes Getränk mit drei Schirmchen und einer Wunderkerze in die Hand. "Für Chantal, bring ihr das mal!"',
		opts: [
			{ t: 'Das Glas einfach stehen lassen', f: 10, a: 0, r: 'Du bist Systemadministrator und kein Butler. Du drehst dich einfach um und gehst. Irgendein armer Praktikant wird sich dem flammenden Glas schon annehmen müssen.', next: 'party_hub' },
			{ t: 'Selbst trinken', f: 25, a: -10, r: 'Du ziehst den Strohhalm durch. Eine Geschmacksexplosion aus purem Sirup-Zucker und billigem Wodka! Du fühlst dich fantastisch, auch wenn du mit dem leuchtenden Drink und der Wunderkerze völlig albern aussiehst.', next: 'party_hub' },
			{ t: 'Es brav zu Chantal bringen', f: -10, a: 5, r: 'Du spielst den gehorsamen Kellner und balancierst das Ungetüm durch die Menge. Chantal nimmt es ohne ein einziges "Danke" entgegen und dreht sich sofort wieder weg. Du fühlst dich maximal gedemütigt.', next: 'party_hub' }
		]
	},

	// --- BUFFET EVENTS (7) ---
	{
		id: 'party_buffet_1', loc: 'buffet',
		char: "Egon",
		title: 'Der Mett-Wächter',
		text: 'Hausmeister Egon bewacht das Buffet. Er hat ein wachsames Auge auf den gigantischen Mett-Igel. "Halt! Jeder nur ein Brötchen! Die Geschäftsführung hat noch nicht gegessen!", knurrt er.',
		opts: [
			{ t: 'Diskutieren und Rechte einfordern', a: 25, f: -5, r: 'Du beginnst eine hitzige, 10-minütige Debatte über Arbeitnehmerrechte am Buffet. Egon verschränkt die Arme und bleibt stur wie eine Betonmauer. Du gehst hungrig, gestresst und mit viel zu hohem Blutdruck.', next: 'party_hub' },
			{ t: 'Aggressiv zugreifen', a: -10, f: -10, r: 'Du schiebst Egon resolut zur Seite. "Ich arbeite 60 Stunden die Woche, ich nehme mir jetzt, was ich will!" Egon ist von deiner plötzlichen Alpha-Energie so perplex, dass er dich mit offenem Mund gewähren lässt.', next: 'party_hub' },
			{ t: 'Mit einem Fachbegriff verwirren', f: 15, r: 'Du rufst mit gespielter Panik: "Egon, schnell! Hinten am Verteilerkasten im Flur leckt das Siphon!" Egon reißt die Augen auf und rennt los. Du lachst leise und schaufelst dir ungestört einen massiven Berg Mett auf den Teller.', next: 'party_hub' }
		]
	},
	{
		id: 'party_buffet_2', loc: 'buffet',
		char: "Frau Elster",
		title: 'Die Tupper-Mafia',
		text: 'Frau Elster hockt halb hinter einer Tischdecke und schaufelt heimlich, aber extrem schnell, Unmengen an teuren Scampi in eine riesige Plastikdose. Als sie dich bemerkt, erstarrt sie.',
		opts: [
			{ t: 'Wortlos eine eigene Dose rausholen', f: 30, a: -15, r: 'Ihr nickt euch schweigend und mit tiefem Verständnis zu. Wie ein gut geöltes Syndikat plündert ihr das Buffet und stopft die feinsten Stücke in eure Tupperdosen. Eine unheilige, aber extrem leckere Allianz.', next: 'party_hub' },
			{ t: 'Laut räuspern und missbilligend gucken', a: 20, r: 'Sie wird knallrot im Gesicht, packt die halbvolle Dose panisch in ihre Handtasche und zischt beim Weggehen: "Petze!". Du stehst als moralischer Sieger vor den vollen Platten und grinst.', next: 'party_hub' },
			{ t: 'Erpressung: "Das kostet einen Teller für mich."', a: 0, f: 20, r: 'Sie seufzt extrem genervt, legt dir aber ordentlich von dem teuren Roastbeef auf deinen eigenen Teller. "Dafür halten Sie den Mund, Müller!" Deal akzeptiert. Schweigen schmeckt köstlich.', next: 'party_hub' }
		]
	},
	{
		id: 'party_buffet_3', loc: 'buffet',
		title: 'Veganer Krieg',
		text: 'Der "High-Protein-Tofu-Salat" steht gefährlich nah an der bayerischen Wurstplatte. Irgendjemand hat die Vorlege-Löffel vertauscht. Die Stimmung unter den Gästen ist angespannt.',
		opts: [
			{ t: 'Öl ins Feuer gießen', a: 40, f: 15, r: 'Du stellst dich mitten in die Menge und rufst theatralisch: "Sagt mal, ist in dem Bio-Tofu eigentlich Schweinespeck für den Geschmack?!" Das laute Chaos und die Empörung, die daraufhin ausbrechen, sind absolut filmreif.', next: 'party_hub' },
			{ t: 'Einfach Salat nehmen und gehen', f: 10, a: 5, r: 'Du mischst dich gar nicht erst ein, schnappst dir hastig ein bisschen Grünzeug und verlässt die Gefahrenzone, bevor die ersten Fetzen und Beleidigungen fliegen. Gut für die Nerven.', next: 'party_hub' },
			{ t: 'Löffel heimlich reinigen und sortieren', f: -15, a: -10, r: 'Du putzt die Löffel penibel mit einer Serviette ab und legst sie exakt an ihren richtigen Platz zurück. Du hast soeben einen blutigen Bürgerkrieg am Buffet verhindert. Niemand merkt es, aber du weißt, dass du der Held des Abends bist.', next: 'party_hub' }
		]
	},
	{
		id: 'party_buffet_4', loc: 'buffet',
		char: "Kevin",
		title: 'Das Schokobrunnen-Drama',
		text: 'Der Schokobrunnen läuft über! Kevin hat ein gigantisches Stück Melone reingeworfen, das den Abfluss blockiert. Die klebrige Flut nähert sich dem weißen Teppich.',
		opts: [
			{ t: 'Den Stecker der Pumpe ziehen', f: 0, a: 10, r: 'Du kriechst unter den Tisch und ziehst gnadenlos den Stromstecker. Der Brunnen versiegt röchelnd. Die Umstehenden buhen dich lautstark aus, weil das Dessert gestrichen ist, aber du hast einen Wasserschaden verhindert.', next: 'party_hub' },
			{ t: 'Die Melone mutig rausfischen', f: -20, a: 15, r: 'Du greifst todesmutig in die kochend warme, braune Masse und ziehst den verklebten Melonenklotz heraus. Dein Hemdärmel ist ruiniert und klebt fürchterlich, aber der weiße Teppich ist gerettet. Ein stummer Opfertod.', next: 'party_hub' },
			{ t: 'Einen Erdbeer-Spieß reinhalten', f: 25, a: -10, r: 'Nach uns die Sintflut! Du nutzt die wilde Fontäne aus flüssiger Schokolade gnadenlos aus. Als der Teppich endgültig ruiniert ist, bist du schon lange satt und weit weg.', next: 'party_hub' }
		]
	},
	{
		id: 'party_buffet_5', loc: 'buffet',
		title: 'Die VIP-Zone',
		text: 'Am Ende des Buffets gibt es eine Schale mit echtem Kaviar und Austern. Ein Schild sagt: "Nur für Management". Dir tropft der Zahn.',
		opts: [
			{ t: 'Vorschriften einhalten', a: 15, f: -5, r: 'Du begnügst dich brav mit dem wässrigen Kartoffelsalat. Während du kaust, musst du zusehen, wie Dr. Wichtig drüben eine teure Auster nach der anderen wegschlürft. Die Klassengesellschaft tut weh.', next: 'party_hub' },
			{ t: 'Schild unauffällig vertauschen', a: 10, f: 15, r: 'Du tauschst flink das VIP-Schild mit dem vom "Veganen Soja-Eintopf". Die Verwirrung der Manager, die sich plötzlich über den Matsch beugen, ist schlichtweg unbezahlbar. Ein Streich der Meisterklasse.', next: 'party_hub' },
			{ t: 'Skrupellos zugreifen', a: -5, f: 20, r: 'Du schaufelst dir den absoluten Luxus auf deinen Pappteller. Ein Abteilungsleiter starrt dich fassungslos an, ist aber so schockiert von deiner Dreistigkeit, dass er kein Wort herausbringt. Du isst wie ein Kaiser.', next: 'party_hub' }
		]
	},
	{
		id: 'party_buffet_6', loc: 'buffet',
		title: 'Der Saucen-Unfall',
		text: 'Jemand vor dir hat gekleckert. Auf dem Boden liegt ein dicker Flatschen Ketchup. Die HR-Chefin stöckelt in ihren teuren Prada-Schuhen genau darauf zu.',
		opts: [
			{ t: 'Schweigen und zusehen', f: 15, a: 25, r: '*Pflatsch*. Sie rutscht voll aus, rudert wild mit den Armen und Ketchup spritzt großflächig auf ihr weißes Kleid. Ein extrem böses, aber faszinierendes Schauspiel, das du dir still grinsend ansiehst.', next: 'party_hub' },
			{ t: 'Schnell selbst durchlaufen', f: 5, a: 5, r: 'Du trittst absichtlich voll rein und verwischst die rote Pfütze auf dem Boden. Jetzt klebt zwar dein linker Schuh bei jedem Schritt, aber die tückische Falle für die Kollegin ist entschärft.', next: 'party_hub' },
			{ t: 'Warnen: "Achtung, Ketchup!"', f: -5, a: -10, r: 'Sie stoppt im letzten Moment, wankt kurz auf den hohen Hacken und atmet auf. "Puh, danke Müller! Das Kleid war teuer! Sie sind mein Held!" Dein Karma-Konto füllt sich.', next: 'party_hub' }
		]
	},
	{
		id: 'party_buffet_7', loc: 'buffet',
		char: "Kevin",
		title: 'Deko-Fresser',
		text: 'Du siehst, wie Kevin verzweifelt auf einem Stück Deko-Zitrone mit Schale herumkaut, weil er denkt, es gehöre zum Hauptgericht. Er sieht aus, als würde er gleich weinen.',
		opts: [
			{ t: 'Ihn erlösen: "Das ist Deko, Kevin."', f: -5, a: -5, r: 'Kevin spuckt das bittere Stück sofort in eine Serviette. "Bah! Ich dachte, das ist diese angesagte Molekular-Küche..." Er ist dir unendlich dankbar, dass du seine Geschmacksnerven gerettet hast.', next: 'party_hub' },
			{ t: 'Ihn loben: "Iss die Schale mit, da sind Vitamine!"', f: 10, a: 15, r: 'Kevin würgt das harte, bittere Stück Schale tapfer runter und versucht dabei zu lächeln. "Sehr... gesund!", krächzt er. Du bist ein wahrhaft grausamer, sadistischer Mensch.', next: 'party_hub' },
			{ t: 'Ignorieren', f: 5, a: 0, r: 'Du schaust genüsslich zu. Er wird schon irgendwann von selbst merken, dass Zitronenschalen keine Delikatesse sind. Man lernt im Leben eben nur durch Schmerz und bittere Erfahrungen.', next: 'party_hub' }
		]
	},

	// --- DANCEFLOOR EVENTS (7) ---
	{
		id: 'party_dance_1', loc: 'dance',
		char: "Chantal",
		title: 'Der Agile Flashmob',
		text: 'Chantal hat das Mikrofon gekapert und versucht, einen einstudierten "Corporate-Tanz" zur Förderung der Synergien zu starten. Sie winkt dich aggressiv auf die Tanzfläche.',
		opts: [
			{ t: 'Starr stehen bleiben', a: 15, f: 10, r: 'Du bewegst keinen einzigen Muskel und starrst sie nur emotionslos an. Chantal gibt irgendwann peinlich berührt auf, bricht den Tanz ab und die Musik läuft unangenehm weiter.', next: 'party_hub' },
			{ t: 'Strom der Anlage ziehen', f: 10, a: -30, r: 'Du reißt den Hauptstecker der PA-Anlage aus der Wand. Die Musik stirbt mit einem hässlichen Kratzen. "Oh, Stromausfall", rufst du unschuldig in die Stille. Die gesamte Belegschaft atmet heimlich auf.', next: 'party_hub' },
			{ t: 'Mitmachen und Macarena tanzen', a: 60, f: -15, r: 'Du gehst auf die Fläche und opferst deinen allerletzten Rest Würde. Der Fremdscham ist physisch im ganzen Raum spürbar. Aber Chantal jubelt, klatscht im Takt und liebt dich dafür abgöttisch.', next: 'party_hub' }
		]
	},
	{
		id: 'party_dance_2', loc: 'dance',
		char: "Dr. Wichtig",
		title: 'Der Chef eskaliert',
		text: 'Dr. Wichtig hat sich seine Krawatte wie Rambo um den Kopf gebunden und versucht sich in der Mitte des Kreises an Breakdance. Es sieht gefährlich nach Bandscheibenvorfall aus.',
		opts: [
			{ t: 'Ihn aus Mitleid von der Fläche holen', f: -10, a: 10, r: 'Du gehst hin, fässt ihn am Arm und flüsterst: "Chef, die wichtigen Investoren schauen zu." Er stoppt abrupt, wird kreidebleich und rückt sich die Krawatte zurecht. Du hast ihn vor dem totalen Ruin gerettet.', next: 'party_hub' },
			{ t: 'Heimlich filmen (Erpressungsmaterial)', a: 25, f: 10, r: 'Du hältst voll drauf. Der Chef wälzt sich unkoordiniert auf dem Boden. Das ist feinstes, hochauflösendes Erpressungsmaterial für die nächste Gehaltsverhandlung. Du grinst böse.', next: 'party_hub' },
			{ t: 'Anfeuern und klatschen', f: 20, a: -5, r: 'Der Chef fühlt sich durch dein Klatschen bestärkt, macht einen krachenden "Worm" und reißt sich dabei gut hörbar die Anzughose auf. Ein absolutes Fest für alle Anwesenden.', next: 'party_hub' }
		]
	},
	{
		id: 'party_dance_3', loc: 'dance',
		title: 'Musikwünsche beim DJ',
		text: 'Der DJ spielt seit einer Stunde unerträglichen Ballermann-Schlager. Das Publikum leidet sichtlich. Der DJ grinst mit einer billigen Sonnenbrille.',
		opts: [
			{ t: 'Ihn zwingen, 90er Eurodance zu spielen', f: 15, a: -10, r: '"Spiel Rhythm is a Dancer, oder ich kappe hier sofort das Gast-WLAN", drohst du. Der DJ gehorcht verängstigt. Der Beat droppt und die Stimmung auf der Fläche explodiert in pure 90er-Jahre-Ekstase.', next: 'party_hub' },
			{ t: 'Mit dem Kopf auf den Tisch schlagen', a: 30, f: 0, r: 'Du erträgst den dritten Helene-Fischer-Song nicht mehr. Du haust dir den Kopf wiederholt leicht gegen die Tischplatte. Der dumpfe physische Schmerz lenkt wunderbar vom auditiven Leid ab.', next: 'party_hub' },
			{ t: 'Das Aux-Kabel kapern', a: -20, f: 5, r: 'Du reißt sein Aux-Kabel gnadenlos raus und machst harten, dunklen Synthwave auf deinem Handy an. Der DJ weint fast, aber die versammelte IT-Abteilung feiert dich als Gott.', next: 'party_hub' }
		]
	},
	{
		id: 'party_dance_4', loc: 'dance',
		title: 'Die drohende Polonaise',
		text: 'Eine Polonaise schlängelt sich durch den Raum. Angeführt vom Controller mit Trillerpfeife. Der Zug steuert direkt auf dich zu!',
		opts: [
			{ t: 'Den Zug blockieren', a: 20, f: 5, r: 'Du stellst dich breitbeinig und mit verschränkten Armen mitten in den Weg. "Hier endet die Fahrt!", brüllst du. Der Controller pfeift dich wütend an, aber die Kette bricht auf. Revolution!', next: 'party_hub' },
			{ t: 'Hechtsprung in die Sicherheit', f: 10, a: -10, r: 'Mit einem geschickten Hechtsprung tauchst du unter einem Stehtisch durch und kriechst hinter eine Säule. Du bist dem absoluten Corporate-Wahnsinn in letzter Sekunde entkommen.', next: 'party_hub' },
			{ t: 'Sich widerwillig einfädeln', a: 40, f: -15, r: 'Du fasst deinem stark schwitzenden Vordermann an die Schultern und reihst dich ein. Während du im Takt wippst, spürst du buchstäblich, wie dein Lebenswille deinen Körper verlässt.', next: 'party_hub' }
		]
	},
	{
		id: 'party_dance_5', loc: 'dance',
		title: 'Der Kuschelsong',
		text: 'Das Licht wird gedimmt. Plötzlich läuft "Careless Whisper". Eine leicht angetrunkene Kollegin aus der Buchhaltung steuert zielstrebig und mit schmachtendem Blick auf dich zu.',
		opts: [
			{ t: 'Kevin als Ersatzopfer vorschieben', f: 10, a: -5, r: 'Du packst den Azubi am Kragen und stellst ihn exakt zwischen dich und die Kollegin. Sie umschlingt sofort Kevin. Er blickt panisch drein, aber du bist frei und holst dir ein Bier.', next: 'party_hub' },
			{ t: 'Auf die Toilette flüchten', f: 15, a: 5, r: 'Du drehst dich auf dem Absatz um und sprintest im Dauerlauf Richtung Herrentoilette. Die Kollegin ist verwirrt und krallt sich stattdessen den völlig perplexen Hausmeister Egon für den Engtanz.', next: 'party_hub' },
			{ t: 'Mit ihr tanzen', a: 40, f: -10, r: 'Du wiegst dich eine gefühlte Ewigkeit lang steif wie ein Brett mit ihr hin und her. Sie lallt dir ins Ohr und tritt dir dabei dreimal schmerzhaft auf den Fuß. Die reinste Folter.', next: 'party_hub' }
		]
	},
	{
		id: 'party_dance_6', loc: 'dance',
		title: 'Der Rempel-Tänzer',
		text: 'Ein völlig euphorischer Typ aus der Logistik tanzt wie ein Flummi. Er hüpft wild im Kreis und rammt dir schmerzhaft seinen Ellbogen in die Rippen.',
		opts: [
			{ t: 'Zurückrempeln (Moshpit eröffnen)', a: 20, f: -15, r: 'Du drückst die Schulter rein und rammst ihn hart zurück. Er lacht laut auf und schubst wieder. Plötzlich habt ihr einen kleinen, aber feinen IT-Moshpit mitten auf der Tanzfläche gestartet.', next: 'party_hub' },
			{ t: 'Erbost weichen', a: 15, f: 5, r: 'Du reibst dir die schmerzenden Rippen und ziehst dich verärgert an den ruhigen Rand zurück. Wilde, extrovertierte Menschen sind einfach schrecklich anstrengend.', next: 'party_hub' },
			{ t: 'Ihm diskret das Bein stellen', a: -10, f: 0, r: 'Du fährst unauffällig den Fuß aus. Er stolpert unelegant und schlägt der Länge nach auf dem Parkett auf. Danach tanzt er deutlich ruhiger und respektvoller. Gefahr diskret gebannt.', next: 'party_hub' }
		]
	},
	{
		id: 'party_dance_7', loc: 'dance',
		title: 'Die Wandblümchen',
		text: 'Du stehst am Rand der Tanzfläche. Neben dir stehen drei andere ITler. Alle halten ihr Bier vor der Brust und nicken millimetergenau synchron im Takt.',
		opts: [
			{ t: 'Einfach mitnicken', f: 20, a: -5, r: 'Du integrierst dich nahtlos in das Rudel. Ihr seid eine stumme, nickende Brüderschaft der Rhythmus-Legastheniker. Keine Worte nötig, nur der Takt und das Bier.', next: 'party_hub' },
			{ t: 'Die Gruppe zum Tanzen zwingen', a: 15, f: -10, r: 'Du zerrst die armen Kerle erbarmungslos auf die beleuchtete Fläche. Sie sehen aus wie verängstigte Rehe im Scheinwerferlicht und hassen dich ab sofort von ganzem Herzen.', next: 'party_hub' },
			{ t: 'Ironisch den Roboter tanzen', f: 5, a: 10, r: 'Du fängst an, extrem steife, ironische Roboter-Moves zu machen. Die anderen ITler lachen leise und prosten dir zu. Du bist der unangefochtene König der Nerds.', next: 'party_hub' }
		]
	},

	// --- LOUNGE EVENTS (7) ---
	{
		id: 'party_lounge_1', loc: 'lounge',
		char: "Gabi",
		title: 'Gabis Gossip-Ecke',
		text: 'Gabi sitzt in einem Ohrensessel. "Weißt du eigentlich, warum der Vertriebsleiter heute so schwitzt? Er hat sein Firmenauto geschrottet und es noch nicht gemeldet."',
		opts: [
			{ t: 'Moralisch überlegen ablehnen', a: 15, f: -5, r: '"Ich beteilige mich nicht an so etwas", sagst du erhaben. "Spielverderber", zischt Gabi und verdreht die Augen. Du gehst zu den Langweilern an die Bar.', next: 'party_hub' },
			{ t: 'Informationen für später abspeichern', f: 15, a: 5, r: 'Wissen ist Macht, besonders in der IT. Du nickst nur leicht, aber merkst dir das Detail mit dem kaputten Firmenauto ganz genau. Das könnte nochmal ein exzellenter Hebel sein.', next: 'party_hub' },
			{ t: 'Dazusetzen und mitlästern', f: 40, a: -20, r: 'Ihr tauscht eine halbe Stunde lang Gift, Galle und die bösartigsten Gerüchte der Firma aus. Ein absolutes Fest für die Seele, das alle deine aufgestauten Aggressionen des Jahres heilt.', next: 'party_hub' }
		]
	},
	{
		id: 'party_lounge_2', loc: 'lounge',
		title: 'Das Power-Nickerchen',
		text: 'Du findest ein abgelegenes Sofa. Keine Musik, keine Kollegen. Die Kissen sehen unfassbar weich aus. Dein Körper sehnt sich nach Schlaf.',
		opts: [
			{ t: 'Aus zwei Kissen eine Festung bauen', f: 30, a: -10, r: 'Es ist völlig absurd, aber du baust dir einen blickdichten Wall aus weichen Sofakissen. Du bist nun in deiner Festung absolut sicher vor jeglicher sozialer Interaktion. Herrlich.', next: 'party_hub' },
			{ t: 'Augen für 5 Minuten schließen', f: 60, a: -40, r: 'Du fällst in einen komaartigen Tiefschlaf. Als du aufwachst, hat dir jemand ein gelbes Post-it mit einem Smiley auf die Stirn geklebt, aber du bist tiefenentspannt und fühlst dich neugeboren.', next: 'party_hub' },
			{ t: 'Wachsam bleiben', a: 20, f: -10, r: 'Die innere Admin-Paranoia lässt dir keine Ruhe. Du sitzt steif da und scannst den Halbschatten kontinuierlich nach Feinden oder lauernden Vorgesetzten ab. Echte Erholung sieht anders aus.', next: 'party_hub' }
		]
	},
	{
		id: 'party_lounge_3', loc: 'lounge',
		title: 'Die versteckte Flasche',
		text: 'Du greifst hinter das Kissen eines Sofas. Deine Hand stößt auf etwas Kaltes aus Glas. Eine halb volle, entkorkte Flasche unfassbar teuren Rotwein.',
		opts: [
			{ t: 'Flasche ins Klo schütten', a: 20, f: 0, r: 'Klassenkampf! Du nimmst die sündhaft teure Flasche mit zur Toilette und versenkst genüsslich 300 Euro im Ausguss. Du fühlst dich wie ein moderner Robin Hood, nur ein bisschen dümmer.', next: 'party_hub' },
			{ t: 'Einen ordentlichen Schluck nehmen', f: 35, a: -25, r: 'Du setzt an und trinkst wie ein Barbar direkt aus der Flasche. Der Tropfen ist edel und schmeckt hervorragend. Die grellen Lichter und der Lärm der Party werden plötzlich viel weicher und erträglicher.', next: 'party_hub' },
			{ t: 'Ignorieren und liegen lassen', f: 5, a: 10, r: 'Du bist schließlich immer noch im Dienst... irgendwie. Du ärgerst dich ein wenig über deine eigene spießige Korrektheit und holst dir stattdessen ein stilles Wasser an der Bar.', next: 'party_hub' }
		]
	},
	{
		id: 'party_lounge_4', loc: 'lounge',
		title: 'Deep Talk im Halbdunkel',
		text: 'Ein Kollege aus der Logistik sitzt weinend in der Ecke. Er greift nach deinem Ärmel und erzählt von seiner Scheidung und seinen Schulden.',
		opts: [
			{ t: 'Kalt abwimmeln', a: 25, f: 5, r: '"Tut mir leid Kumpel, ich bin in der IT, kein Therapeut." Der Kollege starrt dich an und weint noch lauter. Du bist ein eiskaltes Monster, aber hast deine Ruhe.', next: 'party_hub' },
			{ t: 'Ihn trösten und zuhören', f: -15, a: -15, r: 'Du lässt ihn eine halbe Stunde lang auf dein Hemd weinen und hörst dir die Tragödie an. Es kostet immens viel emotionale Kraft, aber du warst heute Abend wirklich ein guter, empathischer Mensch.', next: 'party_hub' },
			{ t: 'Ihm ein Bier holen und verschwinden', f: 15, a: 0, r: 'Du drückst ihm wortlos eine kalte Dose in die Hand, murmelst etwas von "Kopf hoch" und flüchtest rückwärts in die rettende Dunkelheit der lauten Tanzfläche.', next: 'party_hub' }
		]
	},
	{
		id: 'party_lounge_5', loc: 'lounge',
		title: 'Die Couch-Blockade',
		text: 'Drei Praktikanten haben die größte, gemütlichste Couch komplett besetzt. Sie starren stumm auf ihre Handys und schauen TikToks mit Ton an.',
		opts: [
			{ t: 'Dazwischenquetschen', f: 15, a: -5, r: 'Du setzt dich mit purer Ignoranz exakt in die Mitte der Gruppe. Die Praktikanten weichen peinlich berührt zur Seite und schweigen. Du hast dir den besten Platz der Lounge erobert.', next: 'party_hub' },
			{ t: 'WLAN am Router drosseln', a: 5, f: 20, r: 'Du zückst dein Admin-Handy, greifst remote auf den Router zu und killst den Speed. Die Videos puffern. Die Praktikanten fluchen, stehen auf und gehen. Ein makelloser IT-Sieg.', next: 'party_hub' },
			{ t: 'Seufzen und stehenbleiben', a: 15, f: 5, r: 'Die Jugend von heute hat keinen Respekt mehr. Du bleibst trotzig daneben stehen, starrst sie böse an und spürst, wie deine chronischen Rückenschmerzen langsam wieder einsetzen.', next: 'party_hub' }
		]
	},
	{
		id: 'party_lounge_6', loc: 'lounge',
		title: 'Das verlorene Smartphone',
		text: 'Auf dem kleinen Beistelltisch blinkt ein verwaistes iPhone. Eine Nachricht von "Hasi ❤️" ploppt auf: "Wann kommst du endlich heim?!"',
		opts: [
			{ t: 'Handy am Empfang abgeben', f: -5, a: 5, r: 'Du bringst das klingelnde Gerät artig zu Gabi an den Empfang. Irgendjemand wird sich morgen sehr freuen. Ein absolut anständiger und verantwortungsvoller Move.', next: 'party_hub' },
			{ t: 'Antworten: "Bin noch auf der Afterparty!"', a: 20, f: 0, r: 'Du tippst schnell die Antwort und schickst die Nachricht ab. Das gibt heute Nacht zu Hause garantiert ein kolossales Beziehungs-Drama für den Besitzer.', next: 'party_hub' },
			{ t: 'Ignorieren', f: 10, a: 0, r: 'Einfach wegsehen. Nicht dein Handy, nicht dein Drama, nicht deine Baustelle. Du schlenderst weiter und lässt das Ding fröhlich in der Dunkelheit vor sich hin blinken.', next: 'party_hub' }
		]
	},
	{
		id: 'party_lounge_7', loc: 'lounge',
		title: 'Awkward Silence',
		text: 'Du setzt dich erschöpft in einen Sessel. Erst dann merkst du, dass im Sessel direkt daneben der CEO sitzt. Er starrt stumm in sein Whiskey-Glas. Er sieht dich an. Du ihn. Stille.',
		opts: [
			{ t: 'Panisch aufspringen und gehen', a: 15, f: 5, r: 'Du stammelst ein unartikuliertes "Huch!", springst auf und rennst förmlich aus der Lounge. Der CEO schaut dir nach und schüttelt nur sehr langsam und enttäuscht den Kopf.', next: 'party_hub' },
			{ t: 'Das Schweigen brechen: "Harte Woche, was?"', f: 5, a: 5, r: 'Er seufzt extrem tief und blickt in sein Glas. "Sie haben ja keine Ahnung vom Druck da oben, Müller." Danach herrscht wieder dieselbe beklemmende Stille wie zuvor.', next: 'party_hub' },
			{ t: 'Nicken und schweigend sitzenbleiben', f: 20, a: -10, r: 'Ihr nickt euch knapp zu und sitzt dann 10 Minuten in absoluter, respektvoller Stille nebeneinander. Ohne ein Wort zu wechseln, ist eine starke, männliche Bindung zwischen euch entstanden.', next: 'party_hub' }
		]
	},

	// --- OUTSIDE EVENTS (7) ---
	{
		id: 'party_outside_1', loc: 'outside',
		title: 'Kaltluft und Nikotin',
		text: 'Du trittst nach draußen. Es nieselt leicht. Ein paar frierende Kollegen aus der Buchhaltung stehen unter dem Vordach und rauchen schweigend. Die Stimmung ist angenehm melancholisch.',
		opts: [
			{ t: 'Nach Feuer fragen (obwohl du nicht rauchst)', f: 5, a: 5, r: 'Du versuchst krampfhaft, dazuzugehören. Die rauchenden Kollegen schauen dich misstrauisch an. Du tust peinlich berührt so, als hättest du deine Zigaretten drinnen vergessen, und schleichst wieder rein.', next: 'party_hub' },
			{ t: 'Sich stumm dazustellen', f: 20, a: -15, r: 'Du lehnst dich an die kalte, feuchte Hauswand. Niemand sagt ein Wort, man hört nur das leise Knistern der Zigaretten. Ein perfekter, sozial absolut anspruchsloser Moment der Erholung.', next: 'party_hub' }
		]
	},
	{
		id: 'party_outside_2', loc: 'outside',
		title: 'Das Taxi-Drama',
		text: 'Ein völlig unbekannter Kollege aus der IT-Infrastruktur flucht lautstark in sein Handy. Sein Uber hat ihn versetzt. Er hat offensichtlich Schlagseite.',
		opts: [
			{ t: 'Ihm helfen, ein Taxi zu rufen', f: -10, a: -10, r: 'Du besorgst ihm über deine App einen Wagen. Er fällt dir lallend um den Hals und drückt dich feucht-fröhlich an sich. Etwas eklig, aber du hast eine wahrhaft gute Tat vollbracht.', next: 'party_hub' },
			{ t: 'Ihn ignorieren', a: 10, f: 5, r: 'Du zuckst mit den Schultern. Sollen ihn doch die Wölfe im Industriegebiet holen. Du drehst dich um und gehst wieder rein ins Warme.', next: 'party_hub' }
		]
	},
	{
		id: 'party_outside_3', loc: 'outside',
		title: 'Der Ausgesperrte',
		text: 'Die Hintertür ist ins Schloss gefallen. Jemand hat den Pappbecher weggeschoben. Du und drei andere steht jetzt im Regen und kommt nicht mehr rein.',
		opts: [
			{ t: 'Die Gunst nutzen und heimgehen', f: 40, a: -10, r: 'Das Universum hat ein klares Zeichen gesetzt. Du nutzt die perfekte Ausrede, läufst direkt zu deinem Auto und machst (zumindest im Kopf) zufrieden Feierabend.', next: 'party_hub' },
			{ t: 'An die Scheibe hämmern', a: 20, f: -5, r: 'Du schlägst wie ein Verrückter gegen die dicke Scheibe. Nach ewig langen Minuten macht Kevin grinsend auf und lacht euch aus. Du bist klitschnass und deine Laune ist im Keller.', next: 'party_hub' }
		]
	},
	{
		id: 'party_outside_4', loc: 'outside',
		title: 'Markus\' Meisterstück',
		text: 'Ein Mann im teuren Anzug raucht Zigarre. Er lallt: "Genialer Typ, dieser Markus! Hat mir gerade eure Quanten-Blockchain verkauft. Live-Migration bis Montag!" Wir haben nicht mal genug RAM für den Mail-Server.',
		opts: [
			{ t: 'Mitspielen und lächeln', f: 20, a: 15, r: '"Klar, Montag läuft das alles reibungslos!" Du lügst ihn eiskalt an und grinst. Soll Markus am Montag doch selbst sehen, wie er das Desaster erklärt. Nicht dein Zirkus, nicht deine Affen.', next: 'party_hub' },
			{ t: 'Panik bekommen', a: 30, f: -10, r: 'Du rechnest im Kopf sofort die Nächte und Überstunden aus, die dieser Unsinn kosten wird. Dir bricht der kalte Schweiß aus. Du rennst an die Bar und brauchst dringend einen doppelten Schnaps.', next: 'party_hub' },
			{ t: 'Die Wahrheit sagen', a: 40, f: -10, r: '"Das ist technisch völlig unmöglich und völliger Schwachsinn", stellst du klar. Der Kunde wird schlagartig nüchtern, wirft die Zigarre weg und stürmt rein, um Markus den Kopf abzureißen. Das gibt ein massives Nachspiel!', next: 'party_hub' }
		]
	},
	{
		id: 'party_outside_5', loc: 'outside',
		title: 'Die Frostbeule',
		text: 'Die neue Praktikantin steht im dünnen Partykleid im Wind und zittert wie Espenlaub, während sie auf ihr Uber wartet. Sie sieht erbärmlich aus.',
		opts: [
			{ t: 'Ritterlich dein Sakko/Pulli anbieten', f: -10, a: -15, r: 'Sie nimmt dein wärmendes Sakko extrem dankbar an und wickelt sich ein. Du stehst jetzt im kalten Wind und frierst dir den Hintern ab, bist aber der absolute Gentleman des Abends.', next: 'party_hub' },
			{ t: 'Tipps geben: "Beweg dich, dann wird dir warm!"', a: 15, f: 5, r: 'Du klatschst in die Hände und feuerst sie an. Sie starrt dich fassungslos und hasserfüllt an. "Danke für nichts, Arschloch." Mission vergeigt.', next: 'party_hub' },
			{ t: 'Wieder reingehen (Mir ist zu kalt)', f: 15, a: 0, r: 'Du hast absolut keine Lust, dir für jemand anderen eine Lungenentzündung zu holen. Du murmelst ein "Viel Glück noch" und flüchtest schnell zurück in die beheizte Lobby.', next: 'party_hub' }
		]
	},
	{
		id: 'party_outside_6', loc: 'outside',
		title: 'Der Parkplatz-Crash',
		text: 'Du siehst, wie ein Auto beim Ausparken rückwärts extrem hart gegen den teuren SUV des Finanzchefs dotzt. Das Glas splittert. Der Fahrer steigt aus: Es ist der Leiter der Rechtsabteilung. Er sieht dich.',
		opts: [
			{ t: 'Augen zuhalten: "Ich hab nichts gesehen!"', f: 10, a: 5, r: 'Du drehst dich blitzschnell weg und pfeifst. Der flüchtende Anwalt gibt Gas. Das kommende Büro-Drama überlässt du genüsslich den anderen. Du hast nichts gesehen.', next: 'party_hub' },
			{ t: 'Erpressung: "Das bleibt unter uns, gegen Gefallen."', f: 20, a: -10, r: 'Er nickt hektisch, wischt sich den Schweiß von der Stirn und braust mit quietschenden Reifen davon. Du hast jetzt einen massiven, illegalen Gefallen bei der mächtigsten Abteilung der Firma frei.', next: 'party_hub' },
			{ t: 'Brav ein Foto für den Finanzchef machen', a: 10, f: -5, r: 'Du zückst das Handy und sicherst Beweise. Der Rechts-Chef rastet völlig aus und brüllt dich über den halben Parkplatz an. Aber am Ende siegt die Gerechtigkeit.', next: 'party_hub' }
		]
	},
	{
		id: 'party_outside_7', loc: 'outside',
		title: 'Die Lärmbeschwerde',
		text: 'Ein wütender Typ im Bademantel steht am Zaun des Geländes. "MACHT DIESE DRECKSMUSIK LEISER ODER ICH RUFE DIE COPS! ICH WILL SCHLAFEN!"',
		opts: [
			{ t: 'Zurückpöbeln: "DANN ZIEH DOCH WEG!"', a: 30, f: -5, r: '"DANN ZIEH DOCH IN DEN WALD, DU RENTNER!", brüllst du zurück. Ihr liefert euch ein episches Wortgefecht über den Zaun. Es tut unfassbar gut, den aufgestauten Frust mal richtig rauszubrüllen.', next: 'party_hub' },
			{ t: 'Beschwichtigen: "Ich sage dem DJ Bescheid."', f: 5, a: -10, r: 'Du nickst verständnisvoll. "Sie haben völlig recht, ich kümmere mich darum." Du gehst rein und sagst dem DJ natürlich absolut NICHT Bescheid, aber der Nachbar ist erstmal ruhiggestellt.', next: 'party_hub' },
			{ t: 'Polizei provozieren: "Ruf sie doch!"', a: 40, f: 10, r: '"Dann ruf sie doch, du Feigling!", stachelst du ihn an. Dein genial-böser Plan: Wenn die Polizei gleich anrückt und die Party beendet, kannst du endlich legal nach Hause gehen.', next: 'party_hub' }
		]
	},

	// --- TOILET EVENTS (7) ---
	{
		id: 'party_toilet_1', loc: 'toilet',
		title: 'Die stöhnende Kabine',
		text: 'Du betrittst den Waschraum. Aus der mittleren Kabine hörst du ein rhythmisches Quietschen und gedämpftes Stöhnen. Unter der Tür siehst du die roten Pumps der HR-Chefin.',
		opts: [
			{ t: 'Handy zücken und Füße filmen', f: 25, a: -10, r: 'Du hältst das Handy flach über den Boden und machst lautlos ein hochauflösendes Foto der roten Schuhe in verfänglicher Position. Ein schmutziger, aber unglaublich mächtiger Blackmail-Move.', next: 'party_hub' },
			{ t: 'Hände laut waschen und gehen', f: 15, a: 10, r: 'Du willst mit diesem HR-Skandal absolut nichts zu tun haben. Du machst den Wasserhahn extrem laut an, wäschst dir die Hände und verschwindest fast fluchtartig aus dem Raum.', next: 'party_hub' },
			{ t: 'Laut gegen die Tür hämmern: "Putzdienst!"', a: 30, f: -5, r: 'Du schlägst mit der flachen Hand gegen die Tür und brüllst. Drinnen bricht pure, nackte Panik aus. Jemand rutscht klatschend ab und flucht. Du lachst dir Tränen ins Fäustchen.', next: 'party_hub' }
		]
	},
	{
		id: 'party_toilet_2', loc: 'toilet',
		title: 'Spiegel-Gespräche',
		text: 'Du stehst am Waschbecken. Ein Vertriebler wäscht sich die Hände, starrt sich tief in den Spiegel und murmelt: "Du bist ein Tiger. Du bist ein Macher." Er bereitet sich auf den Flirt vor.',
		opts: [
			{ t: 'Zustimmen: "Gibt ihnen, Tiger!"', f: 5, a: -5, r: 'Er schaut dich erst völlig überrascht an, grinst dann breit und zeigt dir mit beiden Händen die Finger-Pistolen. Ein extrem seltsamer, etwas unangenehmer Bro-Moment am Waschbecken.', next: 'party_hub' },
			{ t: 'Kommentarlos die Hände trocknen', a: 10, f: 0, r: 'Du schüttelst nur leicht den Kopf über so viel aufgesetzte Verkäufer-Psyche, ziehst dir stumm ein Papiertuch und verlässt den Raum. Leute gibt\'s, die gibt\'s gar nicht.', next: 'party_hub' }
		]
	},
	{
		id: 'party_toilet_3', loc: 'toilet',
		title: 'Der Kabinen-Tratsch',
		text: 'Du hast dich in einer Kabine eingeschlossen, um durchzuatmen. Zwei Leute kommen herein. Sie lästern am Waschbecken lautstark: "Hast du Müllers Pulli gesehen? Die IT kriegt echt nichts mehr mit." Sie reden über DICH!',
		opts: [
			{ t: 'Die Spülung ziehen und raustreten', a: 25, f: -5, r: 'Du betätigst lautstark die Spülung, reißt die Tür auf und baust dich vor ihnen auf. Die beiden erstarren augenblicklich zur Salzsäule. Ihr schockierter Blick ist unbezahlbar. Du gehst wortlos und erhaben an ihnen vorbei.', next: 'party_hub' },
			{ t: 'Still lauschen', f: 20, a: 15, r: 'Du bewegst dich keinen Millimeter und hörst dir die ganze Läster-Tirade an. Es macht dich extrem wütend, aber du weißt jetzt ganz genau, wer die hinterhältigen Schlangen im Büro sind.', next: 'party_hub' }
		]
	},
	{
		id: 'party_toilet_4', loc: 'toilet',
		title: 'Das Klopapier-Monopol',
		text: 'Aus der Kabine neben dir klopft jemand verzweifelt an die Trennwand. "Hallo? Ist da jemand? Mein Papier ist leer. Haben Sie noch was?" Du blickst auf deine eigene, volle Rolle.',
		opts: [
			{ t: 'Erpressung: "Was ist es Ihnen wert?"', f: 10, a: 20, r: '"Fünf Euro?", fragt die zittrige Stimme. Ein zerknitterter Schein taucht unter der Tür auf. Du nimmst das Geld und reichst das Papier rüber. Purer, schmutziger Kapitalismus in Reinkultur.', next: 'party_hub' },
			{ t: 'Schweigen und lautlos gehen', f: 25, a: 5, r: 'Du tust so, als wärst du gar nicht da. Du schleichst lautlos aus der Kabine und verlässt den Raum. Der arme Kerl sitzt da wahrscheinlich noch bis zum Morgengrauen fest.', next: 'party_hub' },
			{ t: 'Ein Blatt unter der Tür durchschieben', f: -5, a: -10, r: 'Du reißt ein großzügiges Stück ab und schiebst es unter der Trennwand durch. "Oh mein Gott, danke! Ich werde Ihnen das nie vergessen!", wimmert es von drüben. Du bist der Retter in höchster Not.', next: 'party_hub' }
		]
	},
	{
		id: 'party_toilet_5', loc: 'toilet',
		title: 'Das fehlende Schloss',
		text: 'Du willst die Kabine abschließen, aber der Riegel fehlt. Irgendwer hat ihn abgetreten. Du musst auf der Schüssel sitzen und gleichzeitig mit dem Fuß die Tür zuhalten.',
		opts: [
			{ t: 'Genervt aufgeben und gehen', a: 15, f: 5, r: 'Du ziehst die Hose wieder hoch und verlässt fluchend die Kabine. Diese Firma kriegt nicht mal einfache Türschlösser auf die Reihe. Wie soll da das Netzwerk funktionieren?', next: 'party_hub' },
			{ t: 'Den Akrobatik-Akt durchziehen', f: 10, a: 10, r: 'Du verkrampfst dein Bein und stemmst den Fuß gegen die Tür, während du versuchst, dein Geschäft zu erledigen. Es funktioniert irgendwie, aber Entspannung sieht definitiv anders aus.', next: 'party_hub' },
			{ t: 'Die Tür einfach offen lassen', a: 30, f: 0, r: 'Wer reinguckt, ist selber schuld! Ein ahnungsloser Kollege stößt die Tür auf, starrt dich fassungslos an und flüchtet sofort mit einem lauten "Sorry!". Du hast Dominanz bewiesen.', next: 'party_hub' }
		]
	},
	{
		id: 'party_toilet_6', loc: 'toilet',
		char: "Kevin",
		title: 'Der Axe-Effekt',
		text: 'Zwei Azubis (darunter Kevin) haben sich vor dem Spiegel offenbar mit einer kompletten Dose Bodyspray eingenebelt. Die Luft flimmert. Es riecht nach Moschus und Erstickungstod.',
		opts: [
			{ t: 'Tief einatmen: "Riecht wie 2005!"', f: 10, a: -10, r: 'Du erträgst den beißenden Gestank mit Humor und klatscht mit den Jungs ab. Dein Lungenvolumen sinkt zwar schlagartig um 5 Prozent, aber du bist ein cooler Vorgesetzter.', next: 'party_hub' },
			{ t: 'Fenster aufreißen', a: 10, f: -10, r: 'Du reißt das Fenster sperrangelweit auf. Es ist eiskalt draußen, aber der giftige Moschus-Nebel zieht endlich ab. Die leicht bekleideten Azubis frieren erbärmlich, aber du kannst wieder atmen.', next: 'party_hub' },
			{ t: 'Hustend schimpfen: "Seid ihr irre?!"', a: 20, f: -5, r: 'Du röchelst und wedelst mit den Armen. Kevin grinst dumm: "Das zieht die Mädels an, Boss!" Du verlierst endgültig den letzten Rest Glauben an die Jugend von heute.', next: 'party_hub' }
		]
	},
	{
		id: 'party_toilet_7', loc: 'toilet',
		title: 'Verstopfung Stufe Rot',
		text: 'Du öffnest eine Kabine. Das Wasser in der Schüssel steht bis zum Rand. Obenauf schwimmt eine ungeheure Menge Klopapier. Ein Tropfen mehr und das Desaster nimmt seinen Lauf.',
		opts: [
			{ t: 'Spülen drücken', a: 30, f: 20, r: 'Das Wasser steigt rasant... und ergießt sich wie ein Wasserfall über den Rand auf die Fliesen! Du springst panisch zurück, rennst aus dem Raum und überlässt das Desaster dem nächsten Besucher.', next: 'party_hub' },
			{ t: 'Schild "DEFEKT" schreiben', f: 10, a: -5, r: 'Sehr verantwortungsvoll. Du klebst ein Papiertuch mit der fetten Warnung "DEFEKT!" an die Tür. Hausmeister Egon wird morgen früh einen gewaltigen Tobsuchtsanfall bekommen.', next: 'party_hub' },
			{ t: 'Dem Pömpel eine Chance geben', f: -10, a: -15, r: 'Du leistest harte, eklige Handarbeit. Nach ein paar kräftigen Stößen läuft das Wasser mit einem lauten *Schlürf* endlich ab. Du bist der unbesungene, heldenhafte Retter der Sanitäranlagen.', next: 'party_hub' }
		]
	},

	// ===============================================
	// DIE 5 VERSCHIEDENEN ENDEN (Wird vom System gewählt)
	// ===============================================
	{
		id: 'party_finale_rage',
		title: 'FINALE: BOFH MELTDOWN',
		text: '23:00 Uhr. Die Musik ist furchtbar, die Kollegen nerven, der Fremdscham des heutigen Abends hat jede einzelne deiner verbliebenen Gehirnzellen zerstört. Dein Blutdruck ist im kritischen Bereich.\n\nPlötzlich ein lauter Knall! Jemand ist übers Stromkabel gestolpert. Die Musik stirbt. Das Licht geht aus. Aus der totalen Dunkelheit ruft Dr. Wichtig panisch: "MÜLLER! SIND SIE NOCH DA?! TUN SIE WAS!"',
		opts: [
			{ 
				t: 'Die epische Tirade (Rage-Quit)', 
				action: { fn: "finishParty", args: ["LEGENDE", "Dein Puls ist auf 180. Das Maß ist voll. Du schnappst dir das batteriebetriebene Notstrom-Mikrofon des DJs. Du brüllst eine dreiminütige, epische Tirade in die absolute Dunkelheit. Du erzählst von der geballten Inkompetenz der Belegschaft, rezitierst die absurdesten Browser-Verläufe aus dem Kopf und nennst den CEO einen glorifizierten Krawattenständer. Du lässt das Mikrofon fallen und verlässt wortlos durch den Notausgang die Halle. Niemand wird diesen Abend je vergessen. Eine Legende ward geboren."] }
			}
		]
	},
	{
		id: 'party_finale_houdini',
		title: 'FINALE: DER PHANTOM-EXIT',
		text: '23:00 Uhr. Du hast den Abend größtenteils extrem entspannt verbracht. Du hast dich weggeduckt, geschlafen, Leute ignoriert und das Buffet geplündert. Du bist extrem faul, leise und praktisch unsichtbar geworden.\n\nEin lauter Knall! Das Hauptkabel wurde aus der Wand gerissen. Die Halle ist stockfinster. Die Kollegen schreien in Panik durcheinander.',
		opts: [
			{ 
				t: 'Im Dunkeln verschwinden (Houdini)', 
				action: { fn: "finishParty", args: ["HOUDINI", "Während alle im Dunkeln übereinander stolpern, schreien und den Notausgang suchen, nutzt du das Chaos meisterhaft aus. Du ziehst die Schultern hoch, robbst lautlos unter dem Catering-Buffet durch, schnappst dir im Vorbeigehen blind eine volle Flasche Sekt und gleitest wie ein Schatten durch die Nebentür. Um 23:15 Uhr liegst du bereits mit Jogginghose auf deiner Couch. Perfekte Flucht. Niemand wird je beweisen können, wann genau du gegangen bist."] }
			}
		]
	},
	{
		id: 'party_finale_hero',
		title: 'FINALE: DER RETTER',
		text: '23:00 Uhr. Du hast Kevin geholfen, den Streit am Buffet geschlichtet und trotz allem Wahnsinn einen kühlen Kopf bewahrt. Deine Werte sind absolut im grünen Bereich.\n\nFunken sprühen! Das Licht geht aus. Stille. Dann bricht pure Panik aus. Chantal kreischt. Jemand wirft ein Glas um. Als Einziger im Raum weißt du genau, wo der Haupt-Sicherungskasten ist.',
		opts: [
			{ 
				t: 'Die Sicherung blind überbrücken', 
				action: { fn: "finishParty", args: ["HELD DER ARBEIT", "Du tastest dich blind und zielsicher durch die schreiende Menge zum Verteilerkasten an der Rückwand. Du fühlst die Kontakte, biegst eine Büroklammer aus deiner Tasche zurecht und brückst die Sicherung. Ein Klicken. Das Licht flackert und springt wieder an. Die Menge verstummt. Dann bricht ohrenbetäubender Jubel aus. Selbst Dr. Wichtig steht auf einem Stuhl und klatscht. Du hast die Party gerettet. Du kriegst zwar kein Geld dafür, aber an diesem Abend bist du der absolute Held der Firma."] }
			}
		]
	},
	{
		id: 'party_finale_gossip',
		title: 'FINALE: DER GOSSIP-KÖNIG',
		text: '23:00 Uhr. Du warst den ganzen Abend in der Lounge und an der Bar. Du hast mit Gabi gelästert, Drinks abgestaubt und das Treiben beobachtet. Du fühlst dich extrem locker und bist voller schmutziger Geheimnisse.\n\nDas Licht fällt aus. Der DJ flucht laut. Im Dunkeln hörst du, wie zwei Leute direkt neben dir leise tuscheln. Es sind der Chef und Frau Elster! Sie besprechen offensichtlich die geplanten Kündigungen für nächstes Jahr.',
		opts: [
			{ 
				t: 'Die VIP-Ecke kapern', 
				action: { fn: "finishParty", args: ["INSIDER", "Du räusperst dich leise im Dunkeln. Der Chef erstarrt. \"Wer ist da?\" Du antwortest extrem gelassen: \"Nur die IT, Chef. Keine Sorge, mein Schweigen kann man kaufen.\" Ein leises Lachen ertönt von Frau Elster. Du gesellst dich im Dunkeln einfach in den inneren Zirkel der Macht. Ihr tauscht im Schutz der Finsternis Intrigen und Geheimnisse aus, bis der Strom wieder da ist. Du bist jetzt unangreifbar. Du hast absolute Macht im Büro erlangt."] }
			}
		]
	},
	{
		id: 'party_finale_standard',
		title: 'FINALE: DIE ESKALATION',
		text: '23:00 Uhr. Du hast von allem etwas mitgenommen. Du hast mitgetanzt, dich geschämt, getrunken und den ganzen Wahnsinn dieser Firma voll in dich aufgesogen. Es war laut, es war peinlich, es war völlig verrückt.\n\nDas Licht geht plötzlich aus. Der Strom ist tot. Absolute Finsternis. Aus dem Nichts ruft ein angetrunkener Kollege aus der Logistik laut: "Kumbaya, my Lord!"',
		opts: [
			{ 
				t: 'Im Dunkeln mitsingen', 
				action: { fn: "finishParty", args: ["TEAMPLAYER", "Eigentlich willst du schreien, aber irgendwie hat dich der Wahnsinn angesteckt. Du fängst leise an mitzusingen. Nach und nach stimmt die ganze Belegschaft im Dunkeln ein. Ein bizarrer, fast schon magischer Teambuilding-Moment in der stockfinsteren Halle entsteht. Du stehst zwischen Kevin und Chantal, ihr wiegt euch im Takt und du merkst: Irgendwie magst du diese Vollidioten doch. Ein fast schon versöhnliches Ende eines furchtbaren Arbeitstages."] }
			}
		]
	}
	
];
