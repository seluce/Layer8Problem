export const emails = [

	{
		id: "mail_cake_1",
		sender: "HR (Sabine)",
		subj: "Kuchen in der Küche! 🍰",
		body: "Liebe alle,\n\nIch habe veganen, glutenfreien Zucchini-Kuchen gebacken! Bedient euch!\n\n(Bitte nur 1 Stück pro Person!)",
		opts: [
			{ t: "Allen antworten: 'Wo ist das Mett?'", r: "Deine Antwort geht an dreihundert Empfänger. Die ersten Lach-Emojis treffen ein, dann eine Lesebestätigung von HR - ohne Emoji. Der Witz war es vermutlich wert. Die Abrechnung folgt.", m: 2, f: 5, a: -5, c: 5, nextEmail: "mail_cake_2" },
			{ t: "Ein Stück nehmen", r: "Du nimmst höflich ein Stück. Es hat die Konsistenz von feuchtem Karton und schmeckt nach guten Absichten. Du isst es vollständig auf, während Sabine zusieht. Eine Investition in den Betriebsfrieden.", m: 2, f: 0, a: 5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_cake_2",
		linked: true,
		sender: "HR (Sabine)",
		subj: "Re: Kuchen in der Küche! 🍰",
		body: "Das finde ich überhaupt nicht lustig, Herr Müller!\n\nWir versuchen hier, eine inklusive Atmosphäre zu schaffen! Ich habe Ihren Namen auf die 'Kein-Weihnachtsgeld'-Liste gesetzt.",
		opts: [
			{ t: "Das war es wert.", r: "Du gehst zum Bäcker um die Ecke und holst dir demonstrativ ein Mettbrötchen mit Zwiebeln. Es ist das teuerste Mettbrötchen deines Lebens - es kostet ein Weihnachtsgeld - und es schmeckt genau danach.", m: 5, f: -5, a: -5, c: 5 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_ticket_fire",
		sender: "Ticketsystem", 
		subj: "TICKET #9942: Maus brennt.",
		body: "PRIORITY: CRITICAL \nUSER: Gabi (Empfang) \nDESCRIPTION: 'Hilfe, aus meiner Maus kommt Rauch und es riecht nach verbranntem Plastik. Ich habe versucht, sie mit Kaffee zu löschen, jetzt funkt es blau.' \nSTATUS: OPEN",
		opts: [
			{ t: "Ticket löschen", r: "Ticket geschlossen, Begründung: 'Fehler nicht reproduzierbar.' Dass es bei Gabi noch raucht, fällt ab jetzt in die Kategorie 'Hardware, physisch' - und die hat bekanntlich keinen Zuständigen.", m: 2, f: 5, a: 0, c: 5 },
			{ t: "Feuerwehr rufen", r: "Zwei Löschzüge, sechs Mann, ein abgesperrtes Foyer. Der Einsatzleiter hält die qualmende Maus hoch wie ein gerettetes Kätzchen. Es war der Kaffee in der Elektronik. Gabi winkt den Feuerwehrleuten begeistert zu.", m: 2, f: -5, a: -5, c: 10 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_workshop_breathing",
		sender: "Betriebsrat", 
		subj: "Einladung: 'Richtig Atmen am Arbeitsplatz'",
		body: "Namaste liebe Mit-Sklaven... äh Mitarbeiter. \n\nWir laden ein zum Workshop 'Atmen gegen den Burnout'. Wir lernen gemeinsam, wie man Wut in CO2 umwandelt. Es gibt vegane Dinkel-Kekse (glutenfrei, zuckerfrei, geschmacksneutral). Anwesenheit wird empfohlen.",
		opts: [
			{ t: "Als Spam markieren", r: "Du markierst den Betriebsrat als Spam-Quelle. Der Filter wird künftig still erledigen, wofür du heute noch einen Klick gebraucht hast. Automatisierung ist auch eine Form von Selbstfürsorge.", m: 2, f: 0, a: 5, c: 0 },
			{ t: "Teilnehmen", r: "Du sitzt eine halbe Stunde im Stuhlkreis und atmest auf Kommando. Es ist erstaunlich schwer, dabei nicht an offene Tickets zu denken. Die Dinkel-Kekse schmecken exakt so, wie sie klingen.", m: 30, f: 15, a: -10, c: 5 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_toilet_1",
		sender: "Facility Mgt",
		subj: "Toiletten im 3. Stock gesperrt (Rohrbruch).",
		body: "ACHTUNG: Aufgrund eines... Vorfalls... mit einem nicht näher genannten Mitarbeiter und einer halben Rolle Papierhandtücher ist der Sanitärbereich im 3. OG gesperrt. Das Wasser steht 5cm hoch.\n\nBitte Gummistiefel tragen oder einhalten.",
		opts: [
			{ t: "Allen antworten: 'Das kommt vom Sparzwang!'", r: "Dein Sparzwang-Kommentar trifft einen Nerv. Binnen Minuten antworten vierzig Leute, drei davon in Großbuchstaben, einer mit einer Grafik. Das eigentliche Rohr interessiert niemanden mehr.", m: 2, f: 5, a: 10, c: 5, nextEmail: "mail_toilet_revolution" },
			{ t: "Allen antworten: 'Früher wäre das nicht passiert!!!11'", r: "Sechs Wörter, ein Ausrufezeichen zu viel, und der Thread explodiert in sämtliche Richtungen gleichzeitig. Nach einer Stunde diskutieren zweihundert Leute über alles außer Toiletten.", m: 2, f: 5, a: 10, c: 5, nextEmail: "mail_toilet_politics" },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_toilet_revolution",
		linked: true,
		sender: "Betriebsrat (Uwe)",
		subj: "AW: Toiletten im 3. Stock gesperrt",
		body: "KAMERADEN! Müller hat Recht!\n\nDas 1-lagige Papier ist ein Verbrechen an der Menschlichkeit! Das Management nutzt wahrscheinlich Seide!\n\nWir fordern: 4 Lagen für alle! Ab morgen: GENERALSTREIK vor dem Klo!",
		opts: [
			{ t: "Solidarität bekunden.", r: "Du antwortest mit einer geballten Faust als Emoji. Uwe druckt Plakate, jemand summt am Kopierer die Internationale. Du wolltest nur weicheres Papier - jetzt bist du Galionsfigur einer Bewegung.", m: 2, f: 10, a: -5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_toilet_politics",
		linked: true,
		sender: "Alle Mitarbeiter",
		subj: "AW: AW: AW: Toiletten im 3. Stock gesperrt",
		body: "System-Nachricht: Dieser E-Mail-Thread hat 400 neue Antworten.\n\nBetreffs enthalten: 'Klimawandel', 'Flache Erde', 'Tempolimit', 'Schnitzel-Verbot'.\n\nDer Mail-Server raucht. Niemand arbeitet mehr.",
		opts: [
			{ t: "Popcorn holen.", r: "Du liest mit, ohne dich zu beteiligen, und holst dir tatsächlich etwas aus dem Automaten. Antwort 401 vergleicht Papierhandtücher mit dem Untergang Roms. Bestes Programm seit Jahren.", m: 2, f: 15, a: -5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_phish_test_bonus",
		sender: "IT-Sec", 
		subj: "Phishing-Test: Bitte hier klicken für Bonus!",
		body: "Lieber Mitarbeiter. \n\nWir haben festgestellt, dass Ihr Gehalt zu niedrig ist. Um Ihren sofortigen Bonus von 5.000 EUR zu erhalten, geben Sie bitte Ihr Windows-Passwort und den Namen Ihres ersten Haustiers auf der folgenden Seite ein: \n[Change-MyPassword.ru]",
		opts: [
			{ t: "Als Phishing melden", r: "Vorbildlich. Die IT schickt dir einen Daumen-hoch-Smiley zurück.", m: 2, f: 0, a: 0, c: -5 },
			{ t: "Sofort klicken!", r: "TEST NICHT BESTANDEN! Ein rotes Fenster poppt auf: 'SIEHST DU NICHT, DASS DAS FAKE IST?!' Meldung an Chef ging raus.", m: 2, f: 0, a: 10, c: 20 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_kevin_noise",
		sender: "Kevin (Azubi)", 
		subj: "Hilfe!! Mein PC macht komische Geräusche",
		body: "Duuu? Mein PC macht so 'Krrrrtzzz Krrrrtzz' Geräusche und riecht komisch nach Strom. Ich hab mal fest dagegen getreten, jetzt raucht er ein bisschen. Ist das ein neues Feature? Soll ich Wasser drüberkippen?",
		opts: [
			{ t: "'Lauf weg!'", r: "Deine Antwort besteht aus zwei Wörtern und einem Ausrufezeichen. Man hört Kevins Stuhl durch zwei Wände kippen. Immerhin: Seine Reaktionszeit im Ernstfall ist hervorragend.", m: 2, f: 5, a: 0, c: 5 },
			{ t: "Hingehen", r: "Ein Kabelbinder hatte sich in den Lüfter verirrt, der Tritt hat ihn nur tiefer hineingearbeitet. Du entfernst ihn mit zwei Fingern und trägst den Fall als 'mechanische Fremdeinwirkung' ein. Kevin nennt dich Zauberer.", m: 5, f: -5, a: -5, c: -5 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_leak_1",
		sender: "Dr. Wichtig",
		subj: "WG: Kündigungswelle Q4 (VERTRAULICH)",
		body: "An: Vorstand\nCc: (Versehentlich) Alle Mitarbeiter\n\nMeine Herren, anbei die Liste der 50 Mitarbeiter, die wir nächsten Montag feuern. Bitte diskret behandeln.\n\n[Anhang: Liste_FINAL_v3.pdf]",
		opts: [
			{ t: "Allen antworten: 'BIN ICH AUCH DRAUF?!'", r: "Du hast an den gesamten Verteiler geantwortet. Panik bricht aus.", m: 2, f: -10, a: 10, c: 5, nextEmail: "mail_leak_2" },
			{ t: "Löschen & Ignorieren", r: "Du klickst auf Löschen und starrst danach zwei Minuten durch den Monitor hindurch. Fünfzig Namen. Du hast keinen einzigen gelesen und trotzdem zu viele gesehen.", m: 2, f: 0, a: 5, c: -5, ignoreEmail: true }
		]
	},
	{
		id: "mail_leak_2",
		linked: true,
		sender: "Dr. Wichtig",
		subj: "AW: WG: Kündigungswelle Q4 (VERTRAULICH)",
		body: "MÜLLER?! \n\nWie können Sie es wagen?! Das war ein Test! Um... die Loyalität zu prüfen! Kommen Sie SOFORT in mein Büro!\n\n(Das wird ein langes Gespräch...)",
		opts: [
			{ t: "Ups...", r: "Zwanzig Minuten Anschiss, in denen das Wort 'Loyalität' öfter fällt als in jedem Mafia-Film. Die Liste erwähnt er mit keinem Wort mehr. Du auch nicht. Ihr habt ein Gleichgewicht des Schweigens.", m: 20, f: 0, a: 20, c: 10 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_chantal_affair_1",
		sender: "Chantal (Privat)",
		subj: "Re: Wochenende",
		body: "Hey Hasi 🐰, der Chef nervt so hart. Treffen wir uns in 5 Min im Archiv? Ich habe Kaffee und diese geilen Schoko-Cookies geschmuggelt. Niemand findet uns zwischen den Akten von 1990. 😘",
		opts: [
			{ t: "'Ich weiß alles. Schweigegeld?'", r: "Du schickst genau einen Satz zurück und lässt ihn wirken. Drei Minuten lang zeigt Outlook 'Chantal schreibt...'. Dann nichts. Dann wieder 'schreibt...'. Du hast Zeit.", m: 2, f: 5, a: 0, c: 0, nextEmail: "mail_chantal_panic" },
			{ t: "Weiterleiten an: Dr. Wichtig", r: "Du klickst auf Weiterleiten, trägst den Chef ein und schickst die Mail ohne ein Wort auf die Reise. Manche Nachrichten sprechen am lautesten, wenn man ihnen nichts hinzufügt.", m: 2, f: 0, a: -10, c: -20, nextEmail: "mail_chantal_boss_reply" },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_chantal_boss_reply",
		linked: true,
		sender: "Dr. Wichtig",
		subj: "AW: WG: Re: Wochenende",
		body: "Herr Müller,\n\nExzellente Wachsamkeit. Faulheit ist ein Geschwür in dieser Firma.\n\nIch habe Frau Chantal soeben 'zum Gespräch' gebeten. Nehmen Sie sich einen Keks aus ihrem Büro, solange sie weg ist.\n\nWeitermachen.",
		opts: [
			{ t: "Der Keks schmeckt nach Verrat.", r: "Du isst den Keks in Chantals leerem Büro, im Stehen, wie ein Einbrecher. Er schmeckt hervorragend, und genau das macht es schlimmer. Der Chef ist auf deiner Seite - zum ersten Mal beunruhigt dich das.", m: 2, f: 0, a: -5, c: -10 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_chantal_panic",
		linked: true,
		sender: "Chantal (Privat)",
		subj: "Re: Re: Wochenende",
		body: "OMG MÜLLER?! 😱😱😱\n\nBitte sag nix!! Das war für... äh... meine Oma! Wenn du die Klappe hältst, mach ich deine PowerPoint für morgen hübsch! Und du kriegst alle Cookies! DEAL?!",
		opts: [
			{ t: "Deal.", r: "Der Deal steht. Deine Präsentationen sehen ab morgen aus wie von einer Agentur, und auf deinem Tisch liegen Cookies. Du fragst dich kurz, ob das Erpressung ist. Formal: ja. Aber mit Keksen.", m: 2, f: 15, a: -5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_compliance_sitting",
		sender: "HR Compliance Bot", 
		subj: "DRINGEND: E-Learning 'Richtiges Sitzen' überfällig",
		body: "Sehr geehrter Mitarbeiter, unser System zeigt an, dass Sie das Pflichtmodul 'Ergonomie am Arbeitsplatz Teil 4b: Der perfekte 90-Grad-Winkel' noch nicht absolviert haben. Das Video dauert 45 Minuten und kann nicht übersprungen werden. Bitte erledigen Sie dies bis EOB, andernfalls wird Ihr Zugang gesperrt.",
		opts: [
			{ t: "Als 'Erledigt' markieren", r: "Du manipulierst die Datenbank. Risiko, aber spart Zeit.", m: 2, f: 0, a: -5, c: 5 },
			{ t: "Video laufen lassen", r: "Du lässt das Video im Hintergrund laufen. Der Ton nervt, aber du bist compliant.", m: 5, f: 10, a: 5, c: -5 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Die nächste Mahnung kommt bestimmt.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_replyall_cat",            
		sender: "Verteiler: ALLE (Re: Re: Re: Katze)", 
		subj: "AW: AW: AW: Wer vermisst 'Mimi'?",
		body: "BITTE NEHMEN SIE MICH AUS DIESEM VERTEILER!!!! ICH HABE KEINE KATZE!!! DAS IST EINE ARBEITSE-MAIL!!! (Vorherige Nachricht von Gabi: 'Oh wie süß, ist die flauschig!'). (Vorherige Nachricht von Klaus: 'Mimi ist wieder da, danke an alle!').",
		opts: [
			{ t: "Reply-All: 'RUHE!'", r: "Du hast zur Eskalation beigetragen. Jetzt antworten 50 Leute 'Hör auf, an alle zu antworten!'. Der Mailserver raucht.", m: 2, f: 0, a: 20, c: 10 },
			{ t: "Filter-Regel erstellen", r: "Du filterst 'Mimi' direkt in den Papierkorb. Himmlische Ruhe.", m: 5, f: -5, a: -10, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_chantal_wording",
		sender: "Chantal (Marketing)", 
		subj: "Wording Check - ASAP!!!",
		body: "Hiiii! 👋 Wir drucken gleich die Flyer für die Messe. Kannst du kurz drüberschauen? Da steht: 'Unsere Cloud-Lösung synergiert mit der Blockchain-KI, um das WLAN-Kabel zu optimieren.' Klingt das techy genug? Brauche das GO in 2 Minuten!!! 😘",
		opts: [
			{ t: "Den Text korrigieren", r: "Du erklärst ihr mühsam, dass es keine WLAN-Kabel gibt. Sie versteht es nicht. 'Aber das klingt doch gut!'", m: 5, f: -10, a: 10, c: 0 },
			{ t: "'Perfekt!'", r: "Du hast den Unsinn durchgewunken. Die IT-Community wird uns auslachen, aber Chantal ist glücklich.", m: 2, f: 10, a: -5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_krause_fridge",
		sender: "Hausmeister Egon", 
		subj: "Kühlschrank Etage 3",
		body: "Moin. Ich habe im Kühlschrank eine Tupperdose gefunden, auf der steht 'Mittagessen 2019'. Der Inhalt hat mittlerweile Pelz und knurrt mich an, wenn ich das Licht anmache. Der Besitzer möge sich bitte mit einem Flammenwerfer bei mir melden, sonst entsorge ich das samt Kühlschrank.",
		opts: [
			{ t: "Das ist meins!", r: "Du rettest dein... was auch immer das war. Es riecht übel.", m: 2, f: 0, a: 5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Was im Kühlschrank lebt, bleibt im Kühlschrank.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_ceo_vision",
		sender: "Dr. Wichtig", 
		subj: "Vision 2030 - Ihre Ideen!",
		body: "Liebes Team, ich hatte heute Nacht im Wellness-Retreat eine Vision. Wir müssen 'Agiler' werden. Ich möchte, dass jeder von Ihnen mir bis 12 Uhr ein 10-seitiges Konzept schickt, wie wir KI nutzen können, um Kaffee zu sparen. Denken Sie 'Out of the Box'! Go, Go, Go!",
		opts: [
			{ t: "Ehrlich antworten", r: "Du schreibst: 'Das ist Unsinn.' Der Chef merkt sich deinen Namen und war nicht begeistert.", m: 5, f: 0, a: 10, c: 20 },
			{ t: "ChatGPT nutzen", r: "Du lässt eine KI das Bullshit-Konzept schreiben. Der Chef ist begeistert: 'Visionär!'", m: 5, f: 10, a: -5, c: -10 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Hoffentlich vergisst er es wieder.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_wuttke_excel",
		sender: "H. Wuttke (Buchhaltung)", 
		subj: "HILFE! EXCEL IST ROT!",
		body: "Herr IT!!! Ich habe nichts gemacht, ehrlich! Ich wollte nur die Spalte G löschen und jetzt ist alles rot und blinkt! Die Bilanz muss in 10 Minuten raus! Wenn das weg ist, bin ich tot! Kommen Sie sofort her! Warum passiert das immer mir?!",
		opts: [
			{ t: "Hingehen", r: "Wuttke lag mit dem Ellbogen auf der Entf-Taste, die Bilanz war nie in Gefahr. Zwei Tastendrücke, alles wieder da. Er nennt dich einen Lebensretter und erzählt es noch beim Mittagessen weiter.", m: 5, f: -10, a: 10, c: -5 },
			{ t: "Ticket verlangen", r: "Du bestehst auf dem Dienstweg. Wuttkes Ticket trifft zwölf Minuten später ein, offenbar diktiert, vollständig in Großbuchstaben, Kategorie 'NOTFALL ROT'. Die Bilanz hat Zeit. Prinzipien nicht.", m: 2, f: 5, a: -5, c: 5 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_circle_mindfulness",
		sender: "Betriebsrat", 
		subj: "Einladung: Stuhlkreis 'Achtsamkeit'",
		body: "Liebe Kollegen, aufgrund des hohen Stresslevels bieten wir heute einen Stuhlkreis an. Wir werden gemeinsam schweigen und unsere Namen tanzen. Es gibt Kräutertee aus der Großpackung. Teilnahme ist freiwillig (aber wird notiert).",
		opts: [
			{ t: "Hingehen", r: "Du tanzt deinen Namen. Bei 'Müller' ist das im Wesentlichen ein Ausfallschritt. Der Kräutertee schmeckt nach Heuboden, aber die halbe Stunde zählt als Arbeitszeit, und das versöhnt.", m: 30, f: 20, a: -10, c: 5 },
			{ t: "Als Spam markieren", r: "Der Filter lernt: Betreffzeilen mit 'Achtsamkeit' landen künftig ungelesen im Ordner 'Betriebsklima'. Dort liegen inzwischen einige. Der Ordner ist dein achtsamster Ort.", m: 2, f: 0, a: 5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_phish_1",
		sender: "Sicherheits-Dienst",
		subj: "Dringend: Ihr Passwort läuft ab!",
		body: "Hallo User,\n\nihr Passwort ist zu alt. Klicken Sie HIER um es zu ändern und erhalten Sie 500€ Amazon-Gutschein als Belohnung!\n\nLink: http://bit.ly/hacker-klaus",
		opts: [
			{ t: "Als Phishing melden", r: "Du meldest die Mail und bekommst eine automatische Dankesantwort mit drei Rechtschreibfehlern. Kurz prüfst du, ob auch die ein Phishing-Test ist. Man weiß es in diesem Haus nie.", m: 2, f: 0, a: -5, c: 0 },
			{ t: "Link anklicken", r: "Der Link öffnet eine Seite, die aussieht wie das Intranet nach drei Bier. Während du noch das Passwortfeld anstarrst, legt die IT dein Konto still. Zu deinem eigenen Schutz, heißt es.", m: 2, f: 5, a: 0, c: 0, nextEmail: "mail_phish_2" },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_phish_2",
		linked: true,
		sender: "IT-Security Bot",
		subj: "ALERT: SIE HABEN VERSAGT",
		body: "Dies war ein interner Sicherheitstest.\nSie sind durchgefallen.\n\nKonsequenz: Ihr Internet-Zugang wurde auf 'Modem-Geschwindigkeit' gedrosselt, bis Sie die Schulung 'Maus-Bedienung für Anfänger' absolviert haben.",
		opts: [
			{ t: "Verdammt.", r: "Jede Seite lädt jetzt in Gedenkgeschwindigkeit, Bild für Bild, wie 1997. Du siehst dem Fortschrittsbalken beim Nachdenken zu und spürst, wie irgendwo in dir ein Lüfter hochdreht.", m: 2, f: -5, a: 10, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_erna_virus",
		sender: "Tante Erna (Privat)", 
		subj: "FWD: FWD: FWD: Lustig!!!!",
		body: "Schau mal Junge, das musst du sehen! 😂😂😂 Die Katze fällt vom Stuhl! Ich habe mich so weggeschmissen! Zeig das mal deinen Kollegen! LG Tante Erna. PS: Wie geht das Internet an? (Anhang: lustig.ppt.exe - 50MB)",
		opts: [
			{ t: "Anhang öffnen", r: "Der Anhang heißt 'lustig.ppt.exe', und du klickst trotzdem. Der Virenscanner geht in Vollalarm, der Rechner fährt sicherheitshalber alles herunter. Die Katze war übrigens nicht einmal im Anhang.", m: 10, f: -20, a: 20, c: 20 },
			{ t: "Nett antworten und lügen", r: "Du schreibst 'Sehr lustig, Tante Erna!', ohne den Anhang anzurühren. Sie antwortet binnen Minuten mit vier weiteren Weiterleitungen. Freundlichkeit hat bei Tante Erna einen Preis, und er wird in Anhängen bezahlt.", m: 2, f: 0, a: -5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_scam_package",
		sender: "Unbekannt", 
		subj: "Ihr Paket konnte nicht zugestellt werden",
		body: "Hallo Kunde. Ihr Paket liegt im Zoll. Bitte überweisen Sie 2,50€ Gebühr über diesen Link, sonst verbrennen wir ihr Paket. Link: www.totally-legit-dhl-scam.ru",
		opts: [
			{ t: "'Behaltet es.'", r: "Du antwortest 'Behaltet es, ich brauche nichts.' Die Zustellung schlägt fehl, die Absenderadresse existiert gar nicht. Irgendwo verbrennt jetzt vermutlich ein imaginäres Paket.", m: 2, f: 0, a: 5, c: 0 },
			{ t: "Webseite öffnen", r: "Phishing-Seite! Du hast fast deine Daten eingegeben. IT-Sec hat es gemerkt.", m: 2, f: 0, a: 10, c: 15 },
			{ t: "Als Spam markieren", r: "Gemeldet, gefiltert, erledigt. Der Zoll verlangt keine Gebühren über Links mit .ru-Endung - dieses Wissen trennt in dieser Firma die Überlebenden von den Schulungsteilnehmern.", m: 2, f: 0, a: 0, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_wuttke_1",
		sender: "H. Wuttke (Buchhaltung)",
		subj: "(Kein Betreff)",
		body: "Gulasch Rezept einfach schnell ohne Paprika",
		opts: [
			{ t: "Weiterleiten an: Dr. Wichtig", r: "Du leitest das Gulasch-Rezept kommentarlos nach oben weiter. Was der Chef daraus macht, liegt nicht mehr in deiner Hand. Ein kleiner, gemeiner Teil von dir freut sich auf die Antwort.", m: 2, f: 0, a: -5, c: -10, nextEmail: "mail_wuttke_boss" },
			{ t: "'Horst, das ist Outlook.'", r: "Du erklärst Wuttke den Unterschied zwischen Outlook und einer Suchmaschine. Er bedankt sich höflich. An seiner nächsten Mail wirst du ablesen können, wie viel davon angekommen ist.", m: 2, f: 0, a: 5, c: 0, nextEmail: "mail_wuttke_ai" },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_wuttke_ai",
		linked: true,
		sender: "H. Wuttke (Buchhaltung)",
		subj: "AW: (Kein Betreff)",
		body: "Danke Outlook.\n\nBestell bitte auch 2 Becher Sahne und Nudeln. Aber nicht die Spiralnudeln, die mag meine Frau nicht.\n\nSenden.",
		opts: [
			{ t: "Du willst es nicht verstehen, oder?", r: "Du starrst auf den Bildschirm. Gegen diese Dummheit gibt es keinen Patch.", m: 2, f: 5, a: 10, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_wuttke_boss",
		linked: true,
		sender: "Dr. Wichtig",
		subj: "WG: (Kein Betreff)",
		body: "Müller,\n\ndanke für die Weiterleitung.\n\nSagen Sie Wuttke, er soll Paprika reinmachen, sonst schmeckt das nicht. Und wenn er schon kocht, soll er mir eine Portion in den 4. Stock bringen.\n\n(Sie kriegen nichts, Verräter mag niemand.)",
		opts: [
			{ t: "Na toll...", r: "Wuttke kocht am Wochenende für den 4. Stock, der Chef lobt öffentlich die 'gelebte Firmenkultur'. Dein Name fällt in der ganzen Geschichte kein einziges Mal. Du warst nur der Postbote des Schicksals.", m: 2, f: 0, a: 15, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_sabine_tupper",
		sender: "HR (Sabine)", 
		subj: "WER HAT MEINE TUPPERDOSE?!",
		body: "Das ist jetzt das dritte Mal! Meine rote Dose mit dem Aufkleber 'SABINE' ist weg! Ich durchsuche jetzt alle Schreibtische! Wenn ich sie finde, gnade euch Gott! Ich rufe die Polizei!",
		opts: [
			{ t: "Reply-All: 'Chill mal'", r: "Fehler! Sabine rastet aus. Sie wirft einen Tacker durchs Büro. Du musst dich unter dem Tisch verstecken.", m: 2, f: 0, a: 20, c: 10 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Nicht dein Problem. Sollen sie sich doch prügeln.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_alert_login",
		sender: "SYSTEM ALERT (Automated)", 
		subj: "CRITICAL: Suspicious Login (CEO Account)",
		body: "Detected Login attempt for user 'CEO' from IP Address: 192.168.x.x (Location: Pyongyang, North Korea). Success: TRUE. \nAction required immediately!",
		opts: [
			{ t: "Als VPN-Fehler abtun", r: "Es war kein VPN. Alle Firmendaten sind jetzt im Darknet. Der Aktienkurs fällt schlagartig auf 0.", m: 2, f: 0, a: 50, c: 100 },
			{ t: "Account sofort sperren", r: "Du hast den CEO mitten in einer Videokonferenz rausgeworfen. Er ist sauer, aber du hast die Firma vor Nordkorea gerettet. Held!", m: 5, f: -10, a: 0, c: -20 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_juergen_admin",
		sender: "Jürgen (Vertrieb)", 
		subj: "Brauche Admin-Rechte GANZ SCHNELL",
		body: "Ich muss dieses PDF für den Kunden umwandeln. Hab da so ein Tool gefunden 'Free_PDF_Converter_Pro_Cracked.exe'. Windows meckert rum wegen Virus, aber das ist Fehlalarm. Gib mal Passwort, Kunde wartet!!!",
		opts: [
			{ t: "Hingehen & 'Nein' sagen", r: "Du erklärst ihm Sicherheit. Er hört zwar nicht zu, aber du hast die Installation verhindert.", m: 5, f: -10, a: 10, c: 0 },
			{ t: "Einfach das Passwort eingeben", r: "ZACK. Ransomware. Alles verschlüsselt. Ein Totenkopf lacht auf deinem Monitor. Das war wohl kein Fehlalarm.", m: 2, f: 0, a: 30, c: 50 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_yoga_laugh",
		sender: "HR Feel Good Management", 
		subj: "PFLICHT-TEILNAHME: Die 'Lach-Yoga' Pause",
		body: "Um die Moral zu heben, treffen wir uns alle im Flur zum synchronen Lachen! 'Hahaha hihihi'! Wer nicht lacht, kriegt einen Eintrag in die Akte wegen negativer Einstellung! 😊😊😊",
		opts: [
			{ t: "Hingehen & mitmachen", r: "Du stehst im Flur und produzierst auf Kommando ein 'Hahaha', das klingt wie aus der Konserve. HR nickt zufrieden und hakt dich auf einer Liste ab. Gelacht hat niemand. Gezählt hat es trotzdem.", m: 10, f: 10, a: 20, c: -5 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Du arbeitest weiter. Später fragt HR, warum du so negativ bist.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_chantal_mac",
		sender: "Chantal (Marketing)", 
		subj: "Mein Mac ist zu laaangsam!!! 😭",
		body: "Ich kann so nicht arbeiten! Wenn ich Spotify, Photoshop, 50 Chrome-Tabs und mein Aufbauspiel gleichzeitig offen habe, ruckelt die Maus! Ich brauche das größte MacBook, das es gibt! Das mit ALLEM drin! SOFORT! Sonst sag ich's dem CEO!",
		opts: [
			{ t: "Einfach bestellen", r: "Fünftausend Euro Budget für eine Maschine, die Filmstudios rendern könnte. Chantal wird damit Bilder verkleinern. Aus dem Controlling kommt eine Mail mit deinem Namen in der Betreffzeile.", m: 5, f: 10, a: -10, c: 20 },
			{ t: "Task-Manager aufräumen", r: "Du schließt das Aufbauspiel und 48 Chrome-Tabs. Der Rechner läuft wieder flüssig. Chantal schmollt, als hättest du ihr ein Haustier weggenommen.", m: 5, f: -5, a: 5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_legal_warning",
		sender: "Kanzlei Abmahn & Söhne", 
		subj: "ABMAHNUNG: Urheberrechtsverletzung",
		body: "Sehr geehrte Damen und Herren, über Ihren Anschluss wurde gestern der Film 'Explosionen 7 - Diesmal wird es persönlich' illegal getauscht. Wir fordern 900€ oder wir verklagen Sie auf Millionen.",
		opts: [
			{ t: "Die Logs prüfen", r: "Es war der Azubi Kevin. Du lässt ihn die 900€ vom Taschengeld zahlen. Lektion gelernt.", m: 10, f: -10, a: 0, c: -5 },
			{ t: "Sofort alle Spuren löschen", r: "Du löscht die Beweise. Jetzt haftet die Firma, weil kein Täter ermittelt werden kann. Der Chef muss zahlen und tobt.", m: 5, f: 0, a: 10, c: 30 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_heating_war",
		sender: "Alle (Verteiler)", 
		subj: "HEIZUNG AUF 5!!!",
		body: "Mir ist kalt! Ich habe die Heizung jetzt auf 5 gedreht und den Knauf abgebrochen, damit es so bleibt! Wer das Fenster aufmacht, fängt sich eine! LG, Frau Frost (aus der Buchhaltung)",
		opts: [
			{ t: "In Badehose arbeiten", r: "Du erscheinst in Badehose. Bei 35 Grad Innentemperatur ist das kein Stilbruch mehr, sondern Notwehr. Frau Frost würdigt dich keines Blickes, die Kollegen keines Kommentars. Man hat sich hier an vieles gewöhnt.", m: 2, f: 10, a: 10, c: 5 },
			{ t: "Fenster heimlich öffnen", r: "Du öffnest das Fenster einen Spalt, wenn Frau Frost am Kopierer steht, und schließt es, bevor sie zurück ist. Ein Guerilla-Lüftungsprogramm. Sie ahnt etwas - ihr Nies-Timing ist zu präzise.", m: 5, f: 5, a: 5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_chain_letter",
		sender: "Bernd (Vertrieb)", 
		subj: "FWD: FWD: Unbedingt lesen sonst Unglück!!!",
		body: "Das ist der Geist des toten Servers! 👻 Schicke diese Mail an 10 Kollegen, oder dein WLAN wird für immer langsam sein! Ignorier das nicht, meinem Cousin ist das passiert!!!",
		opts: [
			{ t: "Bernd sperren", r: "Du sperrst Bernds Weiterleitungen mit einer Filterregel, die du 'Geisteraustreibung' nennst. Sein Cousin mit dem langsamen WLAN wird als Warnung in Erinnerung bleiben. Als Warnung wovor, weiß niemand.", m: 2, f: 0, a: -5, c: 0 },
			{ t: "An Alle weiterleiten", r: "Du leitest den Fluch pflichtschuldig an alle weiter. Fünfhundert Postfächer, ein ächzender Mailserver, drei Abwesenheitsnotizen, die einander in Endlosschleife antworten. Der Geist des toten Servers ist real geworden.", m: 2, f: 0, a: 20, c: 20 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_bonus_fail",
		sender: "Der Vorstand", 
		subj: "WICHTIG: Ihr diesjähriger Bonus",
		body: "Liebe Mitarbeiter, aufgrund des Rekordumsatzes haben wir beschlossen, Ihnen etwas zurückzugeben! Statt einer langweiligen Geldprämie erhält jeder von Ihnen... einen Gutschein für 5% Rabatt in der Kantine (gültig nur Montags)! Danke für Ihren Einsatz!",
		opts: [
			{ t: "Mail ausdrucken & verbrennen", r: "Das kleine Feuer im Mülleimer wärmt dein kaltes Herz. Der Rauchmelder schweigt solidarisch. Manche Mails kann man nur so beantworten.", m: 5, f: 5, a: -5, c: 0 },
			{ t: "Dankesmail schreiben", r: "Du schleimst dich ein. Die Kollegen nennen dich 'Verräter', aber der Chef merkt es sich positiv.", m: 2, f: 0, a: 10, c: -10 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_phish_iphone",
		sender: "Amaz0n-Gewinnspiel-Official", 
		subj: "HERZLICHEN GLÜCKWUNSCH! Neues iPhone PRO MAX gewonnnen!!!",
		body: "Sehr geehrter Kunde. Du wurdest ausgewählt! Klicke HIER um dein brandneues iPhone PRO MAX (Titan-Edition) sofort zu erhalten! Nur noch 5 Minuten gültig! 📱🎁",
		opts: [
			{ t: "Als Phishing melden", r: "Die IT antwortet: 'Gut gemacht, Müller. Sie haben als einziger nicht geklickt.' Ein Fleißsternchen im System.", m: 2, f: 0, a: -5, c: -10 },
			{ t: "KLICKEN! Her damit!", r: "Ein Fenster poppt auf: 'DIES WAR EIN PHISHING-TEST DER IT! SIE SIND DURCHGEFALLEN!' Du musst jetzt ein 20 Minuten langes Security-Video gucken. Dein Tag ist gelaufen.", m: 20, f: -10, a: 50, c: 20 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_cleaner_fridge",
		sender: "Reinigungs-Team", 
		subj: "Kühlschrank Ebene 3 (DRINGEND)",
		body: "Wir weigern uns, den Kühlschrank im 3. Stock zu öffnen. Da drin ist eine Tupperdose, die... atmet. Es wachsen bereits Pilze aus der Dichtung. Wer das bis 12 Uhr nicht entfernt, rufen wir den Kammerjäger (auf Kosten der Abteilung)!",
		opts: [
			{ t: "Mutig entsorgen", r: "Du öffnest die Dose. Der Gestank ist so bestialisch, dass du dich fast übergeben musst. Du bist für den Rest des Tages grün im Gesicht. Aber die Gefahr ist gebannt.", m: 5, f: -5, a: 20, c: 0 },
			{ t: "Kühlschranktür versiegeln", r: "Du klebst die Tür einfach zu und schreibst 'DEFEKT' drauf. Problem für die Ewigkeit konserviert.", m: 5, f: 5, a: -5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Nicht dein Essen, nicht dein Pilz.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_thought_parking",
		sender: "Du (Gedanken)", 
		subj: "Falschparker auf Parkplatz 42",
		body: "Du schaust aus dem Fenster. Ein fetter, neuer Porsche SUV steht quer auf DEINEM Parkplatz! Dreistigkeit siegt?!",
		opts: [
			{ t: "Scheibenwischer hochklappen", r: "Ein kleiner, passiv-aggressiver Racheakt. Fühlt sich gut an und keiner hat's gesehen.", m: 5, f: 0, a: -10, c: 0 },
			{ t: "Abschleppdienst rufen!", r: "Der Abschlepper kommt und zieht den Porsche weg. Du fühlst Genugtuung. 10 Min später brüllt der CEO: 'WER HAT MEINEN LEIHWAGEN ABSCHLEPPEN LASSEN?!' Oh Mist...", m: 10, f: 0, a: 50, c: 80 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_chantal_printername",
		sender: "Chantal (Marketing)", 
		subj: "Brainstorming: Name für den Drucker 🖨️✨",
		body: "Heeey Team! Wir wollen den Druckern 'Persönlichkeit' geben! Bitte kommt alle in den Meetingraum 'Unicorn' und bringt Ideen mit! Es gibt vegane Kekse (aus Sägemehl)!",
		opts: [
			{ t: "Hingehen & 'Drucki McDruckface' vorschlagen", r: "Alle starren dich an. Chantal findet es 'uninspiriert'. Du hast 15 Minuten Lebenszeit verschwendet.", m: 15, f: 10, a: 15, c: 0 },
			{ t: "'Papierstau-Paulus' vorschlagen", r: "Deine E-Mail wird ignoriert, aber du musstest wenigstens nicht aufstehen.", m: 2, f: 5, a: -5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_gdpr_request",
		sender: "Ehemaliger Mitarbeiter (via Anwalt)", 
		subj: "DSGVO Auskunft Art. 15",
		body: "Hiermit fordere ich Sie auf, mir binnen Frist ALLE Daten zu senden, die Sie über mich gespeichert haben. Auch Chat-Logs und interne Notizen!",
		opts: [
			{ t: "Standard-Textbaustein senden", r: "Du schickst ein nichtssagendes PDF: 'Wir haben leider keine relevanten Daten mehr'. Er gibt Ruhe. Bürokratie besiegt.", m: 2, f: 5, a: -5, c: -5 },
			{ t: "Wirklich alles senden, auch die Chat-Logs", r: "Du schickst ihm wirklich alles. Auch die Logs, wo der Chef ihn 'Niete' nennt. Er verklagt die Firma wegen Mobbing. Der Chef tobt.", m: 10, f: -10, a: 20, c: 60 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_xmas_vote",
		sender: "Betriebsrat (Umfrage)", 
		subj: "Weihnachtsfeier: Bowling oder Oper?",
		body: "Liebe Kollegen, für die diesjährige Feier haben wir zwei Optionen: \n1. 'Cosmic Bowling' (mit Schwarzlicht und Dosenbier) \n2. 'Die Zauberflöte' (3,5 Stunden, Anzugpflicht). \nBitte abstimmen!",
		opts: [
			{ t: "Reply-All: 'Saufen!'", r: "Egon antwortet: 'Mein Mann!'. Der Chef mahnt dich ab wegen 'unprofessioneller Kommunikation'.", m: 2, f: 0, a: 10, c: 15 },
			{ t: "Team 'Bowling'", r: "Du stimmst für Bowling. Die IT jubelt geschlossen, während Chantal vorrechnet, was Leihschuhe mit ihrem Sozialleben anrichten. Der Abend verspricht Dosenbier und Drama - die verlässlichste Kombination des Firmenkalenders.", m: 2, f: 5, a: -5, c: 0 },
			{ t: "Team 'Oper'", r: "Du stimmst für Kultur. Niemand mag dich mehr. Kevin nennt dich 'Streber'.", m: 2, f: 0, a: 5, c: 5 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Dir egal. Hauptsache es gibt Essen.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_egon_ball",
		sender: "Hausmeister Egon", 
		subj: "Fundsache: Roter Ball",
		body: "Moin. Hab beim Fegen so nen roten Knet-Ball gefunden. Klebt unterm Heizkörper im Flur. Vermisst den wer? Wenn nicht, kriegt ihn mein Dackel.",
		opts: [
			{ t: "'Gönn ihn dem Dackel.'", r: "Egon freut sich: 'Der Waldi dankt!'. Du hast ein gutes Werk getan. Der Dackel liebt dich jetzt.", m: 2, f: 5, a: 0, c: 0 },
			{ t: "'MEINER! Ich hol ihn ab!'", loot: "stressball", r: "Du rennst schnell runter zu Egon, bevor der Hund zuschnappt. Der Ball ist voller Staub, aber noch gut.", m: 5, f: 0, a: -5, c: 0, },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Der Ball verschwindet im Dackel. Chance vertan.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_vacation_denied",
		sender: "HR (Automated)", 
		subj: "Ihr Urlaubsantrag 2028",
		body: "Status-Update zu Ihrem Antrag 'Sommerurlaub': ABGELEHNT. \nBegründung: 'Zu dieser Zeit könnte theoretisch ein Server ausfallen. Wir brauchen Sie stand-by.'",
		opts: [
			{ t: "Krankenschein planen", r: "Wenn du nicht frei kriegst, bist du halt 'krank'. Du grinst böse und planst deinen 'Husten'.", m: 5, f: 10, a: -10, c: 0 },
			{ t: "Stillschweigend hinnehmen", r: "Du starrst die Wand an. Die Wand starrt zurück. Deine Seele stirbt ein wenig.", m: 2, f: 0, a: 10, c: -5, },
			{ t: "Widerspruch einlegen", r: "Du schreibst eine zweiseitige Mail mit Gesetzes-Auszügen. HR antwortet nicht, aber du fühlst dich im Recht.", m: 15, f: -10, a: 20, c: 10 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_chantal_cat",
		sender: "Chantal (Marketing)", 
		subj: "Katzen-Content für die Website? 😻",
		body: "Heeeey! Ich habe meine Katze 'Prinzessin' als Firmen-Maskottchen fotografiert! Sie sitzt auf einem Server im Rack! Ist das nicht cute?! Soll ich das live stellen?",
		opts: [
			{ t: "NEIN! Statische Aufladung!", r: "Du rennst hin. Katze weg, aber Server voller Haare. Chantal schmollt: 'Du hasst Tiere!'", m: 5, f: 0, a: 10, c: 0 },
			{ t: "'Klar, sieht super aus!'", r: "Das Bild geht viral. 'Firma setzt auf Cat-Content'. Kunden finden es unprofessionell, aber der Traffic steigt massiv. Der Chef ist verwirrt.", m: 2, f: 10, a: -5, c: 20 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Sie lädt es einfach hoch. Der Server überhitzt kurz darauf wegen Katzenhaaren im Lüfter. Du musst es später fixen.", m: 2, f: 0, a: 0, c: 20, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_ticket_rating",
		sender: "IT-Support (Ticket-Bot)", 
		subj: "Bitte bewerten Sie Ihre Lösung",
		body: "Sie haben das Ticket 'PC brennt' geschlossen. Wie zufrieden waren Sie mit Ihrer eigenen Leistung? \n(Stern 1-5)",
		opts: [
			{ t: "Mir selbst 1 Stern geben", r: "Du bist ehrlich zu dir selbst. Das war ziemlicher Pfusch. Aber immerhin brennt es nicht mehr.", m: 2, f: 0, a: 5, c: 0 },
			{ t: "Mir selbst 5 Sterne geben", r: "Du klopfst dir selbst auf die Schulter. 'Guter Mann, dieser Müller.' Das System speichert: 'Exzellenter Mitarbeiter'.", m: 2, f: 5, a: -5, c: 0 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_ceo_blockchain",
		sender: "Dr. Wichtig", 
		subj: "Idee: Blockchain-Kaffeemaschine",
		body: "Müller! Ich habe gelesen, Blockchain ist die Zukunft. Bauen Sie das in die Kaffeemaschine ein! Jeder Espresso soll als NFT gemintet werden! Deadline: Morgen!",
		opts: [
			{ t: "'Geniale Idee, wird umgesetzt!'", r: "Du klebst einfach einen Sticker 'Blockchain Certified' auf den Wassertank. Er merkt den Unterschied nicht, findet den Kaffee aber plötzlich 'dezentraler'.", m: 2, f: 10, a: 0, c: 0 },
			{ t: "'Das ist technisch unmöglich.'", r: "Er nennt dich enttäuscht eine 'Innovationsbremse'. Dein Radar steigt, weil du 'keine Visionen hast'.",  m: 2, f: 0, a: 10, c: 10 },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Du tust so, als hättest du die Mail nie bekommen. Riskant. Wenn er morgen nachfragt, hast du ein echtes Problem.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_canteen_menu",
		sender: "Kantine (Newsletter)", 
		subj: "Speiseplan: 'Woche der Experimente'",
		body: "Mo: Grünkohl mit Nutella \nDi: Pizza 'Hawaii' (nur Ananas, kein Schinken) \nMi: Überraschungseintopf (Reste von Mo+Di) \nDo: Schnitzel (vegan, aus Pappe) \nFr: Fischstäbchen-Auflauf",
		opts: [
			{ t: "Fastenwoche planen", r: "Du beschließt, diese Woche nichts zu essen. Dein Magen knurrt alleine an diesem Gedanken.", m: 2, f: 0, a: 5, c: 0 },
			{ t: "Ausdrucken & Warnen", r: "Du hängst den Plan als Warnung im Flur auf. Du hast Leben gerettet.", m: 2, f: 0, a: 5, c: 0,  },
			{ t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
    {
        id: "mail_yogurt_1",
        sender: "Sandra (Buchhaltung)",
        subj: "WER WAR DAS?!",
        body: "In meinem Joghurt ('Der Große Bauer', Erdbeer) steckt ein Löffel. Er ist halb leer. Wer macht sowas?! Ich rufe gleich die Polizei!",
        opts: [
            { t: "'Ich hatte Unterzucker.'", r: "Dein Geständnis hallt durch die Buchhaltung, Sandras Antwort ebenfalls. Aber irgendwo unter der Empörung registriert sie, dass du wenigstens dazu stehst. Das rettet dich vor der Polizei. Nicht vor der Rechnung.", m: 2, f: 0, a: 5, c: 0, nextEmail: "mail_yogurt_2" },
            { t: "'Das war der Putzmann.'", r: "Du beschuldigst den Putzdienst. Sandra glaubt es sofort und kündigt eine offizielle Beschwerde an. Jetzt hängt jemand Unschuldiges drin, und du musst das aufklären oder sehr gut verdrängen.", m: 2, f: 0, a: -5, c: 10 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_yogurt_2",
        linked: true,
        sender: "Sandra (Buchhaltung)",
        subj: "Re: WER WAR DAS?!",
        body: "Unterzucker?! Das war mein Mittagessen! Du schuldest mir einen Döner. Mit Schafskäse. Sofort.",
        opts: [
            { t: "Einen Döner anbieten", r: "Du sagst den Döner zu, mit Schafskäse, wie gefordert. Sandra bestätigt den Deal schriftlich und setzt eine Frist. Die Buchhaltung vergisst nichts, am wenigsten offene Forderungen.", m: 2, f: -5, a: -10, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_noise_1",
        sender: "Bernd (Vertrieb)",
        subj: "Deine Musik...",
        body: "Moin, wir hören alle deinen 'Death Metal'-Mix durch die Kopfhörer. Könntest du das leiser machen? Meine Pflanzen gehen schon ein.",
        opts: [
            { t: "Die Musik lauter drehen", r: "Du drehst auf. Wenn schon alle mithören müssen, dann wenigstens mit anständigem Bass. Bernds Pflanzen lassen sichtbar die Blätter hängen. Vielleicht ist es Respekt.", m: 2, f: 5, a: 0, c: 5, nextEmail: "mail_noise_2" },
            { t: "Die Musik leiser machen", r: "Du regelst runter und hörst ab jetzt in Zimmerlautstärke. Bernd bedankt sich mit einem Daumen über die Trennwand, seine Pflanzen erholen sich zusehends. Zufall, sicher.", m: 2, f: 0, a: -5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_noise_2",
        linked: true,
        sender: "Bernd (Vertrieb)",
        subj: "Re: Deine Musik...",
        body: "Okay, das reicht. Ich habe gerade dein LAN-Kabel durchgeschnitten. Genieße die Stille.",
        opts: [
            { t: "Mist.", r: "Du sitzt vor einem Rechner ohne Netz und gibst dich betont gelassen. Bernd beobachtet dich über die Trennwand. Wer zuerst eine Regung zeigt, hat verloren. Du öffnest Solitär. Offline-Klassiker.", m: 2, f: -5, a: 10, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_bet_1",
        sender: "Kevin (Privat)",
        subj: "Wettbüro eröffnet! 💰",
        body: "Hey Chef, wir wetten gerade, wann der neue Projektleiter seinen ersten Nervenzusammenbruch hat. Einsatz: 5€. Machst du mit?",
        opts: [
            { t: "Ich setze auf 'Niemals'", r: "Du setzt fünf Euro auf die seelische Stabilität eines Mannes, der Projektpläne nach Bauchgefühl einfärbt. Kevin antwortet nur mit einem einzelnen Fragezeichen. Notiert hat er den Einsatz trotzdem.", m: 2, f: 0, a: 0, c: -5 },
            { t: "Ich setze auf 'Heute'", r: "Fünf Euro auf 'heute'. Der Mann hatte um neun Uhr bereits zwei Eskalationsmeetings und ein Zucken unter dem linken Auge. Das ist keine Wette mehr, das ist Insiderhandel.", m: 2, f: 5, a: 0, c: 5, nextEmail: "mail_bet_win" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_bet_win",
        linked: true,
        sender: "Kevin (Privat)",
        subj: "GEWONNEN!",
        body: "Alter! Er hat gerade im Meeting geweint, weil der Beamer nicht ging! Du hast den Pott gewonnen! Hier sind 20€ (in Kantinen-Gutscheinen).",
        opts: [
            { t: "Das war leichter als gedacht.", r: "Zwanzig Euro in Kantinen-Gutscheinen, überreicht mit dem Respekt der gesamten Belegschaft. Du hast nicht geraten, du hast Berufserfahrung zu Geld gemacht. Der Unterschied ist wichtig.", m: 2, f: 5, a: -5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_plant_1",
        sender: "Gabi (Empfang)",
        subj: "Mein Bonsai 🌳",
        body: "Hat jemand meinen Bonsai gegossen? Er sieht so... braun aus. Und er riecht nach Kaffee.",
        opts: [
            { t: "Ich wollte nur helfen!", r: "Du gestehst und berufst dich auf den Nährstoffgehalt von Filterkaffee. Gabi hört sich das an, nickt sehr langsam und stellt den Bonsai demonstrativ außer deine Reichweite. Verhandlung beendet.", m: 2, f: 0, a: 0, c: 5, nextEmail: "mail_plant_2" },
            { t: "Ich war's nicht.", r: "Du bestreitest alles. Neben dem Bonsai steht dein Becher, mit deinem Namen darauf, in deiner Handschrift. Gabi schickt das Beweisfoto kommentarlos an den Empfangs-Verteiler.", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_plant_2",
        linked: true,
        sender: "Gabi (Empfang)",
        subj: "Re: Mein Bonsai 🌳",
        body: "Du hast ihn umgebracht! Das war ein Erbstück! Er war 40 Jahre alt! Du Monster!",
        opts: [
            { t: "Ups.", r: "Gabi spricht nicht mehr mit dir. Der Empfang, sonst deine verlässlichste Nachrichtenquelle, hat für dich ab sofort Sendepause. Du wirst den Flurfunk vermissen. Gabi vermisst den Bonsai mehr.", m: 2, f: 5, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_cc_fail_1",
        sender: "Vertriebsleiter Markus",
        subj: "Q3 Strategie (Top Secret)",
        body: "Hallo Team, hier ist der Plan, wie wir die Kunden über den Tisch ziehen. Bitte NICHT weiterleiten!",
        opts: [
            { t: "Reply All: 'Klingt illegal.'", r: "Du drückst auf 'Allen antworten'. Erst danach siehst du, wer alles in diesem Verteiler steckt: sämtliche Kunden, zwei Anwälte und eine Adresse, die mit 'presse@' beginnt. Markus ruft bereits an.", m: 2, f: 0, a: 20, c: 20, nextEmail: "mail_cc_fail_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 5, ignoreEmail: true }
        ]
    },
    {
        id: "mail_cc_fail_2",
        linked: true,
        sender: "Rechtsabteilung",
        subj: "SOFORTIGE VORLADUNG",
        body: "Herr Müller, erscheinen Sie sofort im Büro. Bringen Sie Ihren Anwalt mit. Und einen Karton für Ihre Sachen.",
        opts: [
            { t: "War schön mit euch.", r: "Du schreibst zurück, dass es schön war mit ihnen, und drückst auf Senden, bevor die Vernunft eingreifen kann. Die nächsten zwanzig Minuten starrst du auf das Postfach und wartest auf eine Antwort, die nicht kommt.", m: 5, f: -20, a: 30, c: 40 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_survey_1",
        sender: "HR Survey Bot",
        subj: "Mitarbeiterzufriedenheit",
        body: "Wie glücklich sind Sie auf einer Skala von 1 (Sehr) bis 10 (Extrem)?",
        opts: [
            { t: "Ich bin der glücklichste Mitarbeiter hier. 10!", r: "Du klickst die Zehn an und spürst dabei nichts. Der Bot bedankt sich mit einem animierten Konfettiregen. Ihr habt beide eure Rolle in diesem Theater verstanden.", f: 5, a: -5, c: 0, nextEmail: "mail_survey_2" },
            { t: "Ich warte immer noch auf den Termin des Betriebs-Therapeuten. 1!", r: "Das Formular lehnt deine Eingabe ab: 'Bitte wählen Sie einen Wert zwischen 1 (Sehr) und 10 (Extrem).' Unzufriedenheit ist in diesem System schlicht nicht vorgesehen. Das ist keine Panne, das ist Design.", f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_survey_2",
        linked: true,
        sender: "HR Survey Bot",
        subj: "Danke!",
        body: "Toll! Da Sie so glücklich sind, haben wir Ihre Gehaltserhöhung gestrichen. Glückliche Mitarbeiter brauchen kein Geld!",
        opts: [
            { t: "Ich hasse euch.", r: "Du tippst die Antwort, liest sie zweimal und löschst sie wieder. Der Bot würde deinen Hass ohnehin nur als 'engagiertes Feedback' verbuchen. Fehlende Antworten wertet er übrigens als Zustimmung, das steht irgendwo im Kleingedruckten.", m: 2, f: 0, a: 15, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_coffee_1",
        sender: "Küche",
        subj: "Kaffeemaschine DEFEKT",
        body: "Jemand hat Milch in den Wassertank gefüllt. Die Maschine macht jetzt Käse.",
        opts: [
            { t: "Ich trinke Tee.", r: "Du antwortest, dass du sowieso Tee trinkst. Drei Kollegen lesen das und schauen zu dir rüber, als hättest du gestanden, den Kaffee persönlich vergiftet zu haben. Dieses Misstrauen wird bleiben.", m: 2, f: 5, a: 5, c: 0 },
            { t: "Ich repariere das.", r: "Du zerlegst die Maschine, spülst den Tank dreimal durch und opferst zwei Küchenrollen. Nach zwanzig Minuten riecht es wieder nach Kaffee statt nach Frischkäse. Vor der Küche wartet bereits eine stille, dankbare Schlange.", m: 10, f: -10, a: -10, c: 0, nextEmail: "mail_coffee_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_coffee_2",
        linked: true,
        sender: "Alle Kollegen",
        subj: "DANKE!!",
        body: "Du bist unser Held! Der Kaffee fließt wieder! Wir würden dir ein Denkmal bauen, haben aber kein Budget.",
        opts: [
            { t: "Gern geschehen.", r: "Du winkst bescheiden ab und nimmst den Dank mit einer Gelassenheit entgegen, die du nicht ganz empfindest. Für ungefähr eine Stunde bist du der beliebteste Mensch im Gebäude. Das Hoch hält bis zum nächsten Ticket.", m: 2, f: 0, a: -20, c: -10 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_lottery_1",
        sender: "Tippgemeinschaft",
        subj: "Jackpot 90 Millionen!",
        body: "Wir sammeln für den Eurojackpot. 10€ Einsatz. Wenn wir gewinnen, kündigen wir alle!",
        opts: [
            { t: "Mit 10€ einsteigen", r: "Du legst zehn Euro in die Kaffeekasse der Träume. Einen Nachmittag lang gehört dir ein Neuntel von neunzig Millionen samt der Fantasie, die Kündigung per Konfettikanone einzureichen. Günstiger ist Hoffnung nicht zu haben.", m: 2, f: 5, a: 0, c: 0, nextEmail: "mail_lottery_2" },
            { t: "Glücksspiel ist Sünde.", r: "Du lehnst ab und behältst deine zehn Euro. Statistisch die einzig vernünftige Entscheidung. Die Kollegen nennen dich dafür bis auf Weiteres 'Herr Sparkasse'.", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_lottery_2",
        linked: true,
        sender: "Tippgemeinschaft",
        subj: "Ergebnis...",
        body: "Wir haben gewonnen! Und zwar... 12,50€. Jeder bekommt 40 Cent zurück. Wir bleiben wohl doch alle hier. Arbeitet weiter.",
        opts: [
            { t: "Na toll.", r: "Vierzig Cent Gewinn. Du spendest sie der Tippgemeinschaft als Startkapital für nächste Woche. Im Flur hängt noch der Zettel mit der Aufteilung der Millionen, jemand hatte schon Umzugskartons organisiert. Montag spielt ihr wieder.", m: 2, f: -5, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_borrow_1",
        sender: "Chantal (Marketing)",
        subj: "Tacker ausgeliehen",
        body: "Hii, hab mir kurz deinen Tacker geborgt. Meiner ist... irgendwie explodiert. Bringe ihn gleich zurück!",
        opts: [
            { t: "Das war gestern!", r: "Du korrigierst den Zeitrahmen: 'Kurz' war gestern Vormittag. Chantal schickt drei zerknirschte Emojis und verspricht die Rückgabe 'gleich nach dem Meeting'. Welches Meeting, bleibt offen.", m: 2, f: 0, a: 5, c: 0, nextEmail: "mail_borrow_2" },
            { t: "Behalt ihn.", r: "Du schenkst ihr den Tacker offiziell. Er war ein Werbegeschenk, du hast ihn nie benutzt, und Großzügigkeit ist günstiger als jede weitere Mail in diesem Thread.", m: 2, f: 5, a: 0, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_borrow_2",
        linked: true,
        sender: "Chantal (Marketing)",
        subj: "Re: Tacker ausgeliehen",
        body: "Ups... 😬 Er ist mir ins Klo gefallen. Sorryyy! Ich kauf dir einen neuen! (Irgendwann)",
        opts: [
            { t: "Atmen...", r: "Du atmest ein und zählst bis zehn. Es war nur ein Tacker, sagst du dir. Es geht ums Prinzip, sagt etwas anderes in dir. Auf deiner inneren Liste rückt Chantal einen Platz nach oben.", m: 2, f: 0, a: 10, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_cleaner_1",
        sender: "Olga (Reinigung)",
        subj: "Stecker gezogen",
        body: "Hallo, ich musste Staubsaugen. Habe den Stecker von dem lauten Kasten mit den vielen Lichtern gezogen. Ist jetzt schön leise. Hoffe okay?",
        opts: [
            { t: "Lauf zum Serverraum!", r: "Du rennst los. Auf halber Strecke rechnest du durch, was alles an diesem 'lauten Kasten mit den vielen Lichtern' hängt. Die Antwort lautet: alles. Olga grüßt freundlich, als du vorbeistürmst.", m: 5, f: -10, a: 20, c: 10, nextEmail: "mail_cleaner_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Wahrscheinlich war es nur die Kaffeemaschine.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_cleaner_2",
        linked: true,
        sender: "System Alert",
        subj: "CRITICAL FAILURE",
        body: "Server 'BACKUP_MASTER' nicht erreichbar. Uptime: 0 Sekunden. Datenverlust droht.",
        opts: [
            { t: "Weinen.", r: "Du sitzt einen Moment ganz still. Dann beginnt die Routine: Backup einspielen, Dienste hochfahren, beten. Olga saugt derweil seelenruhig den Flur. Sie hat von allen Beteiligten den besten Tag.", m: 5, f: -20, a: 20, c: 20 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_ceo_scam_1",
        sender: "Dr. Wlchtig (CEO)",
        subj: "Dringende Überweisung",
        body: "Hallo Herr Müller, ich sitze in einem geheimen Meeting. Bitte kaufen Sie sofort 10x 100€ Apple Gift Cards und schicken Sie mir die Codes. Sagen Sie niemandem etwas!",
        opts: [
            { t: "'Netter Versuch.'", r: "Ein CEO, der im 'geheimen Meeting' sitzt, Geschenkkarten bestellt und dabei den eigenen Namen falsch schreibt. Du tippst zwei Wörter und drückst Senden. Manche Antworten schreiben sich von selbst.", m: 2, f: 0, a: -5, c: 0, nextEmail: "mail_ceo_scam_win" },
            { t: "Alles klar, Chef! Die Codes kommen gleich", r: "Du stehst zwanzig Minuten an der Tankstelle und kaufst Geschenkkarten für tausend Euro. Der Verkäufer schaut dich an, als wolle er etwas sagen, sagt dann aber nichts. Hätte er mal.", m: 5, f: 0, a: 5, c: 5, nextEmail: "mail_ceo_scam_fail" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_ceo_scam_fail",
        linked: true,
        sender: "Dr. Wichtig",
        subj: "FWD: Dringende Überweisung",
        body: "Warum bucht die Buchhaltung 1000€ von Ihrer Kostenstelle ab?! Kommen Sie in mein Büro. Sofort.",
        opts: [
            { t: "Oh nein.", r: "Die Gutschein-Codes sind längst eingelöst, das Geld arbeitet jetzt in einem Callcenter am anderen Ende der Welt. Im Büro des Chefs liegt bereits ein Formular mit dem Titel 'Regressvereinbarung' bereit. Es wirkt beunruhigend gut vorbereitet.", m: 2, f: 0, a: 20, c: 20 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_ceo_scam_win",
        linked: true,
        sender: "Dr. Wlchtig (CEO)",
        subj: "Re: Dringende Überweisung",
        body: "F*** dich du kleiner IT-Nerd! Ich finde dich!",
        opts: [
            { t: "Zufrieden lächeln und Daumen Hoch antworten.", r: "Du schickst einen einzelnen Daumen nach oben zurück. Irgendwo klappt ein sehr wütender Mann seinen Laptop zu. Die Firma wird nie erfahren, was du heute verhindert hast, und das ist in Ordnung. Fast.", m: 2, f: 5, a: -5, c: -5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_meeting_1",
        sender: "Agile Coach Torben",
        subj: "Meeting: 'Feel Good Management'",
        body: "Einladung: Wir wollen 20 Minuten lang über unsere Gefühle tanzen. Anwesenheitspflicht für alle!",
        opts: [
            { t: "Teilnehmen", r: "Du tanzt zwanzig Minuten lang deine Gefühle, hauptsächlich das Gefühl, beobachtet zu werden. Torben nennt dich 'mutig'. Der Chef hat dich währenddessen zweimal vergeblich gesucht. Das wird noch Thema.", m: 20, f: 20, a: -10, c: 20, nextEmail: "mail_meeting_2" },
            { t: "Mit 'Server brennt' absagen", r: "Die Ausrede 'Server brennt' funktioniert bei Torben immer, weil er nicht weiß, was ein Server ist. Du verbringst die zwanzig Minuten mit echter Arbeit. Es fühlt sich beinahe subversiv an.", m: 2, f: 0, a: 0, c: 5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_meeting_2",
        linked: true,
        sender: "Agile Coach Torben",
        subj: "Feedback Runde",
        body: "Toll, wie du dich geöffnet hast! Deine Aura war sehr... grau. Wir müssen an deinem Chakra arbeiten.",
        opts: [
            { t: "Lass mich in Ruhe.", r: "Du formulierst eine höfliche, endgültige Absage für alle künftigen Gefühlsrunden, Aura-Analysen und Chakra-Sprechstunden. Torben antwortet mit drei Herz-Emojis. Er hat nichts verstanden. Er wird nie etwas verstehen.", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_video_1",
        sender: "Verteiler: Alle",
        subj: "FWD: FWD: Lustiges Video!! 😂",
        body: "Schaut euch das an! Die Katze fällt vom Tisch! (Anhang: lustig.mp4 - 450 MB)",
        opts: [
            { t: "Ansehen", r: "450 MB Katzenvideo, von achtzig Kollegen gleichzeitig geöffnet. Die Katze fällt wirklich ausgesprochen komisch vom Tisch. Das Netzwerk fällt mit.", m: 2, f: 5, a: -5, c: 0 },
            { t: "Absender sperren", r: "Du sperrst den Absender und setzt die Anhang-Obergrenze, die du schon vor Jahren hättest setzen sollen. Im Flur wird gemault, im Serverraum bleibt es ruhig. Der Tausch geht in Ordnung.", m: 2, f: 0, a: 5, c: 0, nextEmail: "mail_video_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_video_2",
        linked: true,
        sender: "Bernd (Vertrieb)",
        subj: "Mein Account geht nicht?!",
        body: "Ich kann keine Mails mehr senden! Hast du was gemacht? Ich wollte nur Freude verbreiten!",
        opts: [
            { t: "Freude ist verboten. Wie schreibst du mir überhaupt, wenn du geblockt bist?", r: "Du erklärst Bernd, dass sein Konto jetzt einen 'Freude-Filter' hat und nur noch dienstliche Gefühle durchlässt. Er glaubt es. Du notierst dir den Satz für künftige Fälle.", m: 2, f: 0, a: -5, c: -5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_ac_1",
        sender: "Facility Mgt",
        subj: "Klimaanlage defekt",
        body: "Die Klimaanlage kühlt nicht mehr. Sie heizt jetzt. Raumtemperatur: 38 Grad. Viel Erfolg.",
        opts: [
            { t: "Hose ausziehen", r: "Du arbeitest ab sofort nach dem Prinzip: obenrum Meeting, untenrum Freibad. Unter dem Tisch sieht es keiner - solange niemand eine Besprechung einberuft. Du betest, dass niemand eine Besprechung einberuft.", m: 2, f: 10, a: -5, c: 10, nextEmail: "mail_ac_pants" },
            { t: "Leiden", r: "Du bleibst vollständig bekleidet und tropfst still vor dich hin. Zwischen den Tasten sammelt sich ein kleines Biotop. Die Tastatur wird diesen Sommer nicht überleben.", m: 2, f: -10, a: 10, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_ac_pants",
        linked: true,
        sender: "HR (Sabine)",
        subj: "Kleiderordnung",
        body: "Herr Müller, wir haben Beschwerden erhalten. Bitte ziehen Sie Ihre Hose wieder an. Das hier ist kein FKK-Strand.",
        opts: [
            { t: "Schade.", r: "Die Hose ist wieder an, geschwitzt wird fortan vorschriftsmäßig. Zwischen Hitzekollaps und Abmahnung hat sich das Haus klar positioniert. Die Beschwerdeführer bleiben anonym, aber du hast einen sehr konkreten Verdacht.", m: 2, f: -5, a: 5, c: 5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_key_1",
        sender: "Empfang",
        subj: "Schlüssel gefunden",
        body: "Ein Schlüsselbund mit einem 'My Little Pony' Anhänger wurde gefunden. Wem gehört der?",
        opts: [
            { t: "Das ist meiner!", r: "Du meldest dich beim Empfang und bekennst dich zu 'My Little Pony'. Auf dem Weg dorthin übst du einen Gesichtsausdruck, der Souveränität ausstrahlen soll. Er wird nicht halten.", m: 2, f: 0, a: 5, c: 0, nextEmail: "mail_key_2" },
            { t: "Schweigen", r: "Du schweigst und lässt den Bund am Empfang liegen. Die Würde ist gerettet, der Abend wird teuer: Vor deiner Wohnungstür wartet später ein sehr einsilbiges Gespräch mit dem Schlüsseldienst.", m: 2, f: 0, a: 10, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_key_2",
        linked: true,
        sender: "Gabi (Empfang)",
        subj: "Re: Schlüssel gefunden",
        body: "Hier ist er. Süßer Anhänger. Passt zu dir. *kicher*",
        opts: [
            { t: "Er gehört meiner Nichte!", r: "Gabi sagt 'Natüürlich' mit zwei Silben zu viel und lässt den Anhänger bei der Übergabe demonstrativ baumeln. Diese Geschichte wird am Empfang noch Wochen erzählt werden, mit jeder Woche etwas ausgeschmückter.", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_print_color_1",
        sender: "Controlling",
        subj: "Farb-Druck Verbot",
        body: "Ab sofort sind Farbdrucke verboten! Jede farbige Seite kostet 5 Cent und wird vom Gehalt abgezogen.",
        opts: [
            { t: "Trotzdem Farbe drucken", r: "Du druckst aus Prinzip ein vollflächiges Regenbogen-Testbild in höchster Qualität. Fünf Cent für zivilen Ungehorsam. Das Controlling wird es finden, aber genau das ist der Punkt.", m: 2, f: 5, a: -5, c: 5, nextEmail: "mail_print_color_2" },
            { t: "Alles in S/W drucken", r: "Du stellst alles auf Graustufen. Die Diagramme verlieren ihre Farben, die Präsentationen ihren letzten Charme. Irgendwie passt es zum Gebäude.", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_print_color_2",
        linked: true,
        sender: "Controlling",
        subj: "Gehaltsabrechnung Korrektur",
        body: "Abzug für private Farbdrucke (Motiv: Regenbogen): 0,05€. Wir haben Sie im Auge.",
        opts: [
            { t: "Das war es wert.", r: "Fünf Cent Abzug, ordnungsgemäß verbucht. Du hängst den Regenbogen gerahmt neben den Monitor und beschriftest ihn mit 'Kunst am Arbeitsplatz'. Das Controlling hat jetzt einen Vorgang, du hast ein Statement.", m: 2, f: 5, a: -5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_dog_1",
        sender: "Chantal (Marketing)",
        subj: "Darf Bello mitkommen? 🐶",
        body: "Mein Hundesitter ist krank. Darf Bello heute ins Büro? Er beißt nur, wenn er Angst riecht.",
        opts: [
            { t: "Ja, ich liebe Hunde!", r: "Bello zieht unter deinem Schreibtisch ein und riecht, als hätte er den Sommer in einem Teich verbracht. Er fixiert dich mit einem Blick, der sich zwischen 'Freund' und 'Beute' noch nicht entschieden hat.", m: 2, f: 5, a: -5, c: 0, nextEmail: "mail_dog_bite" },
            { t: "Nein, Allergie.", r: "Du erfindest eine Hundehaarallergie mit beachtlicher medizinischer Detailtiefe. Chantal antwortet mit einem einzelnen 'Okay.' Der Punkt hinter dem Wort trägt mehr Vorwurf als jede Eskalationsmail.", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_dog_bite",
        linked: true,
        sender: "Chantal (Marketing)",
        subj: "Ups...",
        body: "Sorry, dass er dein LAN-Kabel gefressen und dich gebissen hat. Er hat wohl deine Angst (vor Arbeit) gerochen!",
        opts: [
            { t: "Arzt rufen.", r: "Der Betriebsarzt versorgt die Bisswunde und stellt keine weiteren Fragen, was du ihm hoch anrechnest. Das LAN-Kabel ist Totalschaden. Bello wirkt kein bisschen zerknirscht.", m: 2, f: -10, a: 10, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_fridge_1",
        sender: "Küche",
        subj: "Schimmel-Alarm",
        body: "Im Kühlschrank lebt etwas. Es hat Fell und atmet. Wer seine Tupperdose gleich nicht holt, wird gefeuert.",
        opts: [
            { t: "Nicht mein Problem", r: "Du scrollst weiter und hoffst still, dass es nicht deine Dose ist. Ganz sicher bist du nicht. Da war dieser Eintopf im Frühjahr, von dem du nie wieder gehört hast.", m: 2, f: 0, a: 0, c: 5 },
            { t: "Meine Dose holen", r: "Es ist deine Dose. Du trägst sie mit ausgestreckten Armen und angehaltenem Atem zur Tonne im Hof - samt Inhalt, samt Deckel, samt guter Vorsätze von damals.", m: 5, f: -5, a: 0, c: 0, nextEmail: "mail_fridge_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_fridge_2",
        linked: true,
        sender: "Küche",
        subj: "Danke",
        body: "Danke fürs Entsorgen. Wir dachten kurz, es greift uns an. Der Kühlschrank ist wieder sicher.",
        opts: [
            { t: "Held der Arbeit.", r: "Du nimmst den Dank entgegen, als wäre nichts gewesen. In Wahrheit hast du danach dreimal geduscht und wirst den Geruch trotzdem nicht ganz los. Die Küche muss nie erfahren, was du gesehen hast.", m: 2, f: 5, a: -5, c: -5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_software_1",
        sender: "H. Wuttke (Buchhaltung)",
        subj: "Tolle Gratis-Software!",
        body: "Hab mir 'SpeedUpMyPC_Free.exe' installiert. Mein PC ist jetzt viel bunter! Soll ich dir den Link schicken?",
        opts: [
            { t: "PC sofort vom Netz nehmen!", r: "Du sprintest quer durchs Gebäude und ziehst den Stecker, während der Installer bei 87 Prozent steht. Wuttke beschwert sich, dass sein PC jetzt wieder so langweilig aussieht.", m: 5, f: -10, a: 10, c: -10, nextEmail: "mail_software_2" },
            { t: "Mach nur...", r: "Du antwortest 'Mach nur' und beobachtest ab jetzt wie ein Dokumentarfilmer: nicht eingreifen, nur festhalten. Was jetzt passiert, ist Forschung.", m: 2, f: 5, a: -10, c: 20 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_software_2",
        linked: true,
        sender: "System",
        subj: "Bedrohungs-Abwehr",
        body: "145 Viren, 20 Trojaner und 1 Krypto-Miner entfernt. Horst hat Schreibverbot für 24 Stunden.",
        opts: [
            { t: "Gut so.", r: "Du überfliegst den Bericht mit der Zufriedenheit eines Kammerjägers nach Großeinsatz. 145 Schädlinge, sauber dokumentiert. Horst wird die 24 Stunden nutzen, um telefonisch nach seinem Passwort zu fragen.", m: 2, f: 0, a: -5, c: -10 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_canteen_1",
        sender: "Kantine",
        subj: "Heute: 'Topf der Überraschung'",
        body: "Liebe Esser, wir haben alle Reste der Woche in einen Topf geworfen. Es ist grau und blubbert. Preis: 2,50€.",
        opts: [
            { t: "Mutig sein und es essen", r: "Der erste Löffel schmeckt nach Fisch, der zweite nach Pudding, der dritte nach beidem gleichzeitig. Du isst trotzdem auf. Nicht aus Hunger - aus wissenschaftlicher Neugier, wie tief das noch geht.", m: 5, f: 0, a: 10, c: 0, nextEmail: "mail_canteen_2" },
            { t: "Ich faste lieber.", r: "Du verzichtest und lebst heute von Automatenkeksen und Prinzipien. Dein Magen protestiert im Vier-Minuten-Takt, aber er protestiert als freier Magen.", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_canteen_2",
        linked: true,
        sender: "Kantine",
        subj: "Re: Heute: 'Topf der Überraschung'",
        body: "Kleine Warnung: Falls Sie Halluzinationen bekommen, das ist normal. Das liegt am Pilz-Risotto vom Montag.",
        opts: [
            { t: "Die Wände schmelzen...", r: "Du hältst dich an der Tischkante fest und beobachtest, wie das Ticketsystem Farben bekommt, die es nicht hat. Nach einer halben Stunde ist alles wieder grau, was du einen Moment lang bedauerst.", m: 30, f: 15, a: -5, c: 5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_tiktok_1",
        sender: "Chantal (Marketing)",
        subj: "Wir sind jetzt auf TikTok! 💃",
        body: "Heyy! Wir müssen 'jung und dynamisch' wirken! Kommt alle in den Flur für die 'Corporate Dance Challenge'!",
        opts: [
            { t: "Verstecken", r: "Du verschanzt dich in der Kabine und wartest, bis der Bass im Flur verstummt. Durch die Tür hörst du Chantal 'Noch mal von vorne, mit Gefühl!' rufen. Du bleibst sitzen, bis auch die Zugabe vorbei ist.", m: 10, f: 0, a: 0, c: 5 },
            { t: "Mitmachen und tanzen", r: "Du tanzt. Es gibt dafür kein anderes Wort, auch wenn dein Körper mehrere Vorschläge macht. Chantal filmt aus drei Winkeln und flüstert 'viral'. Das Material existiert jetzt für immer.", m: 10, f: 5, a: 5, c: 0, nextEmail: "mail_tiktok_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_tiktok_2",
        linked: true,
        sender: "Chantal (Marketing)",
        subj: "VIRAL!!!",
        body: "OMG! Dein 'Roboter-Tanz' hat 1 Million Views! Die Kommentare fragen, ob wir Hilfe brauchen. Aber: Fame ist Fame!",
        opts: [
            { t: "Ich will Tantiemen.", r: "Chantal erklärt dir, dass 'Exposure' die Währung der Zukunft ist. Bezahlt wird trotzdem in der alten. Dein Roboter-Tanz läuft jetzt in Endlosschleife auf dem Bildschirm am Empfang.", m: 2, f: 0, a: -10, c: 10 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_salary_1",
        sender: "HR System",
        subj: "Gehaltsabrechnung KORREKTUR",
        body: "Durch einen Fehler haben wir Ihnen diesen Monat 5.000€ zu viel überwiesen. Bitte nicht ausgeben!",
        opts: [
            { t: "Sofort zurücküberweisen", r: "Du überweist zurück, bevor die Versuchung ein eigenes Konto eröffnet. Die Buchhaltung bestätigt den Eingang ohne ein Wort des Dankes. Anstand gilt hier als Bringschuld.", m: 2, f: 0, a: -5, c: 5, nextEmail: "mail_salary_honest" },
            { t: "Geld behalten & schweigen", r: "Du öffnest ein Reiseportal, konfigurierst zwei Wochen Strand und schließt den Tab wieder. Das Geld bleibt auf dem Konto liegen und starrt dich an. Ihr wisst beide, dass das nicht gutgeht.", m: 2, f: 0, a: 0, c: -20, nextEmail: "mail_salary_fraud" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_salary_honest",
        linked: true,
        sender: "HR System",
        subj: "Vielen Dank für Ihre Meldung",
        body: "Danke für die Ehrlichkeit. Als Belohnung bekommen Sie einen Firmen-Kugelschreiber (sobald ausreichend Budget da ist).",
        opts: [
            { t: "Juhu...", r: "Fünftausend Euro zurücküberwiesen, ein Kugelschreiber in Aussicht gestellt. Moral hat einen Wechselkurs, und er ist miserabel. Aber du kannst nachts ruhig schlafen, und das war einkalkuliert.", m: 2, f: 0, a: 0, c: -5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_salary_fraud",
        linked: true,
        sender: "Rechtsabteilung",
        subj: "LETZTE MAHNUNG",
        body: "Wir wissen, dass Sie das Geld haben. Wir pfänden jetzt Ihren Bürostuhl und Ihre Kaffeetasse.",
        opts: [
            { t: "Mist.", r: "Zwei Herren in schlecht sitzenden Anzügen tragen deinen Stuhl davon und versiegeln die Kaffeetasse in einem Beutel. Du arbeitest jetzt im Stehen, wie die Menschen in den LinkedIn-Beiträgen. Nur unfreiwilliger.", m: 2, f: -5, a: 15, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_charging_1",
        sender: "Facility Mgt",
        subj: "E-Ladesäule blockiert",
        body: "Ein alter Diesel-Golf blockiert die einzige Ladesäule für E-Autos. Kennzeichen: DU-MM 123.",
        opts: [
            { t: "Abschleppdienst rufen", r: "Der Abschleppwagen ist schneller da als jeder Techniker, den du je bestellt hast. Der Golf hängt bereits am Haken, als der Fahrer aus dem Gebäude gerannt kommt - es ist der neue Kollege aus dem Vertrieb. Er weiß jetzt, wo die Ladesäule ist. Und wer die IT ist.", m: 5, f: -5, a: -5, c: 0, nextEmail: "mail_charging_tow" },
            { t: "Zettel dran: 'Idiot'", r: "Passiv-aggressiv ist dein Stil.", m: 5, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_charging_tow",
        linked: true,
        sender: "Hausmeister Egon",
        subj: "Mein Auto!!!",
        body: "Hömma! Wer hat meine Karre abschleppen lassen?! Ich wollte doch nur kurz Brötchen holen! Komm du mir nach unten!",
        opts: [
            { t: "Verstecken.", r: "Du duckst dich hinter den Monitor und stellst den Status auf 'Beschäftigt'. Egon kennt jeden Raum dieses Gebäudes und jede Ausrede dieser Welt. Es ist keine Frage, ob er dich findet. Nur wann.", m: 10, f: 5, a: 10, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_lights_1",
        sender: "Smart Office App",
        subj: "Lichtsteuerung: Beta Test",
        body: "Sie haben nun Zugriff auf die Lampen in Ihrer Abteilung. Bitte verantwortungsvoll nutzen.",
        opts: [
            { t: "Den Modus 'Dunkelkammer' wählen", r: "Du dimmst die Abteilung auf null. Aus dem Halbdunkel erklingt erst Protest, dann Tastaturklappern, dann verdächtig gleichmäßiges Atmen. Produktivität ist auch eine Lichtfrage.", m: 2, f: 15, a: 0, c: 5, nextEmail: "mail_lights_dark" },
            { t: "Den Modus 'Disco Strobe' wählen", r: "Die Abteilung flackert im Takt von 120 Schlägen pro Minute. Petra hält sich am Schreibtisch fest, Bernd wippt unironisch mit. Aus dem Treppenhaus nähern sich energische Schritte.", m: 2, f: 10, a: -5, c: 0, nextEmail: "mail_lights_disco" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_lights_disco",
        linked: true,
        sender: "Dr. Wichtig",
        subj: "AUGENKREBS",
        body: "Wer macht hier Party?! Ich versuche zu telefonieren! Schalten Sie das sofort aus, oder ich schalte SIE aus!",
        opts: [
            { t: "Sorry, Finger abgerutscht.", r: "Du stellst auf Neutralweiß zurück, bevor der Chef die Treppe geschafft hat. Als er ankommt, blinzelt er misstrauisch in völlig unauffälliges Bürolicht. Beweislage: dünn. Sein Blick: lang.", m: 2, f: 0, a: 10, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_lights_dark",
        linked: true,
        sender: "Bernd (Vertrieb)",
        subj: "Stromausfall?",
        body: "Es ist stockdunkel. Ich bin gerade gegen den Kopierer gelaufen. Bist du noch da?",
        opts: [
            { t: "Pscht, ich schlafe.", r: "Du lässt die Mail unbeantwortet. Im Dunkeln ist jeder Schreibtisch gleich leer, und deiner ganz besonders. Irgendwo flucht Bernd gegen ein Möbelstück. Es ist erstaunlich friedlich.", m: 2, f: 10, a: 0, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_intern_db_1",
        sender: "Kevin (Azubi)",
        subj: "Frage zu 'DELETE ALL'",
        body: "Chef? Wenn da steht 'Wollen Sie wirklich die Kundendatenbank löschen?', muss ich da auf 'Ja' klicken, damit das Fenster weggeht? Es nervt.",
        opts: [
            { t: "'Klar, mach mal.'", r: "Du denkst, er versteht den Witz.", m: 2, f: 5, a: 0, c: 0, nextEmail: "mail_intern_db_fail" },
            { t: "NEIN!!! UM GOTTES WILLEN!", r: "Du tippst drei Zeilen Großbuchstaben und rennst gleichzeitig los. Zwei Stockwerke, ein Flur, eine Tür - Kevin sitzt vor dem Dialog, den Mauszeiger schwebend über dem Ja-Knopf, und dreht sich fragend um.", m: 5, f: -10, a: 20, c: 10, nextEmail: "mail_intern_db_panic" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_intern_db_panic",
        linked: true,
        sender: "Kevin (Azubi)",
        subj: "Re: Frage zu 'DELETE ALL'",
        body: "Puh, okay. Hab auf 'Abbrechen' geklickt. Aber jetzt ist der Bildschirm blau. Ist das gut?",
        opts: [
            { t: "Besser als gelöscht.", r: "Ein Bluescreen ist in diesem Fall das Beste, was passieren konnte: Der Rechner hat sich schlicht geweigert, weiter mit Kevin zu arbeiten. Du schreibst zurück: 'Nicht bewegen. Nichts anfassen. Ich komme.'", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_intern_db_fail",
        linked: true,
        sender: "System Alert",
        subj: "DATABASE EMPTY",
        body: "Tabelle 'Customers' enthält 0 Einträge. Letztes Backup: 1999.",
        opts: [
            { t: "Ich kündige.", r: "Du schreibst die kürzeste Mail deiner Laufbahn: zwei Wörter, kein Betreff. Das letzte Backup ist von 1999, die Kundendatenbank ist leer, und irgendwo im Haus erklärt gerade ein Azubi, dass da ja auch eine Sicherheitsabfrage stand.", m: 10, f: 0, a: 50, c: -20 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_coffee_decaf_1",
        sender: "Gesundheits-AG",
        subj: "Woche der Herzgesundheit",
        body: "Zu Ihrem Besten gibt es diese Woche nur koffeinfreien Kaffee (aus Dinkel). Bleiben Sie gesund!",
        opts: [
            { t: "Akzeptieren", r: "Der Dinkelkaffee schmeckt wie die Erinnerung an ein Getränk. Gegen elf klappt dir erstmals seit Jahren am Schreibtisch das Kinn auf die Brust. Die Gesundheits-AG würde das als Erfolg verbuchen.", m: 15, f: 10, a: 0, c: 0 },
            { t: "Schmuggelware organisieren", r: "Du organisierst einen Kasten Energydrinks und richtest auf dem Herrenklo eine diskrete Ausgabestelle ein. Zahlung in bar, keine Fragen, Klopfzeichen zweimal kurz.", m: 5, f: -5, a: -5, c: 10, nextEmail: "mail_coffee_decaf_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_coffee_decaf_2",
        linked: true,
        sender: "Bernd (Vertrieb)",
        subj: "Hast du Stoff?",
        body: "Ich hab gehört, du hast echtes Koffein? Ich zahle jeden Preis! Meine Hände zittern schon!",
        opts: [
            { t: "5€ pro Dose.", r: "Du nennst deinen Preis, Bernd zahlt ohne zu verhandeln. Bis Feierabend spricht sich die Quelle herum, und du entwickelst ein Rabattsystem für Stammkunden. Die Gesundheits-AG ahnt nichts. Noch.", m: 2, f: 0, a: -10, c: 15 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_dsgvo_1",
        sender: "Datenschutzbeauftragter",
        subj: "DSGVO Verstoß: Post-It",
        body: "An Ihrem Monitor klebt ein Zettel mit 'Passwort123'. Das ist ein Sicherheitsrisiko der Stufe Rot.",
        opts: [
            { t: "Zettel essen", r: "Du kaust den Zettel vor seinen Augen und schluckst. Der Datenschutzbeauftragte macht eine Notiz, deren Inhalt du nie erfahren wirst. Das Passwort ist jetzt im Wortsinn verinnerlicht.", m: 2, f: 0, a: 5, c: -5, nextEmail: "mail_dsgvo_eaten" },
            { t: "'Das ist nur ein WLAN-Code.'", r: "Ihr seht einander an und wisst beide, dass kein WLAN der Welt 'Passwort123' heißt. Er notiert 'Hinweis erteilt' und geht. Die Bürokratie kennt einen Zustand zwischen Wahrheit und Lüge: abgehakt.", m: 2, f: 0, a: 0, c: 5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_dsgvo_eaten",
        linked: true,
        sender: "Datenschutzbeauftragter",
        subj: "Re: DSGVO Verstoß",
        body: "Haben Sie den Zettel gerade... verschluckt? Ich bin beeindruckt von Ihrer Hingabe. Fall geschlossen.",
        opts: [
            { t: "*Rülps*", r: "Der Datenschutzbeauftragte trägt den Fall als 'physisch unwiederbringlich vernichtet' ein und gibt dir ungefragt die Hand. Der Zettel liegt dir noch Stunden im Magen. Compliance schmeckt nach Tinte.", m: 2, f: 0, a: -5, c: -5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_buzzword_1",
        sender: "Projektleiter",
        subj: "Quick Sync bzgl. Low Hanging Fruits",
        body: "Lass uns mal schnell brainstormen, wie wir das Mindset shiften können. Wir brauchen mehr Agilität im Backend!",
        opts: [
            { t: "'Bullshit-Bingo!'", r: "Du antwortest mit einer sauber ausgefüllten Bingokarte: 'Mindset', 'shiften', 'Agilität' - drei in einer Reihe. Es bleibt verdächtig lange still. Die Antwort kommt später, und sie klingt nicht amüsiert.", m: 2, f: 5, a: -5, c: 5, nextEmail: "mail_buzzword_fail" },
            { t: "'Bin total committed.'", r: "Du schreibst 'Bin total committed' und spürst, wie der Satz beim Tippen ein Stück von dir mitnimmt. Der Projektleiter antwortet mit einer Rakete und drei neuen Terminen. Das Commitment beginnt sofort.", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_buzzword_fail",
        linked: true,
        sender: "Projektleiter",
        subj: "Re: Quick Sync",
        body: "Sehr witzig. Deine Attitude ist nicht gerade 'Customer Centric'. Wir sprechen uns im Jahresgespräch.",
        opts: [
            { t: "Whatever.", r: "Du hakst die Drohung ab. Bis zum Jahresgespräch sind es Monate, bis zu seinem nächsten 'Alignment-Workshop' nur Tage - er wird dich vergessen haben, sobald das nächste Framework erscheint.", m: 2, f: 0, a: 0, c: 5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_birthday_wrong_1",
        sender: "HR System",
        subj: "Happy Birthday! 🎉",
        body: "Lieber Mitarbeiter, alles Gute zum 50. Geburtstag! Holen Sie sich Ihren Gratis-Apfel in der Kantine ab!",
        opts: [
            { t: "Apfel holen", r: "Du holst dir den Apfel ab. Die Kantinenkraft gratuliert dir herzlich zum Fünfzigsten, und du bedankst dich brav, weil Widerspruch mehr kosten würde, als der Apfel wert ist.", m: 5, f: 5, a: -5, c: 0 },
            { t: "Ich bin erst 28?!", r: "Du korrigierst höflich per Mail. Die Antwort kommt automatisch: Für Stammdatenänderungen sei ein Formular nötig. Du ahnst bereits, welches.", m: 2, f: 0, a: 10, c: 0, nextEmail: "mail_birthday_fix" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_birthday_fix",
        linked: true,
        sender: "HR System",
        subj: "Ticket #9921",
        body: "Änderung des Geburtsdatums erfordert Formular A38, notariell beglaubigt. Bearbeitungszeit: 6 Monate.",
        opts: [
            { t: "Ich hasse euch.", r: "Formular A38, notariell beglaubigt, sechs Monate Bearbeitungszeit - für die Korrektur eines Alters, das dir die HR selbst angedichtet hat. Du gibst den Kampf gegen die Bürokratie verloren, bist jetzt amtlich 50 und holst dir wenigstens den Gratis-Apfel ab.", m: 2, f: 0, a: 10, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_mouse_1",
        sender: "Kevin (Azubi)",
        subj: "Maus geht nicht",
        body: "Chef, meine Maus ist kaputt. Wenn ich sie hochhebe, bewegt sich der Zeiger nicht mehr. Hä?",
        opts: [
            { t: "Kauf dir eine neue.", r: "Du verweist auf das Bestellformular und die zuständige Kostenstelle. Der Dienstweg wird Kevin Wochen kosten und dich keine Minute. Genau dafür wurde er erfunden.", m: 2, f: 5, a: 0, c: 5 },
            { t: "Ernsthaft? 'Leg sie hin.'", r: "Du erklärst in einfachen Worten, dass eine optische Maus ihre Unterlage sehen muss. Am anderen Ende entsteht eine Stille, in der hörbar ein Weltbild neu sortiert wird.", m: 5, f: 0, a: 5, c: 0, nextEmail: "mail_mouse_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_mouse_2",
        linked: true,
        sender: "Kevin (Azubi)",
        subj: "WOW!",
        body: "Es geht!! Sie sind ein Magier! Ich dachte, das ist wie bei der Fernbedienung!",
        opts: [
            { t: "Stirn auf Tischplatte", r: "Du legst die Stirn kurz und kontrolliert auf die Tischplatte. Irgendwo da draußen hält Kevin dich jetzt für einen Magier, und das Schlimmste daran: In seiner Welt ist das eine Beförderung.", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_temperature_1",
        sender: "Kollegin Petra",
        subj: "Es zieht!",
        body: "Kannst du das Fenster zumachen? Ich bekomme einen steifen Nacken! Es sind nur 28 Grad draußen!",
        opts: [
            { t: "Fenster bleibt auf!", r: "Du berufst dich auf Arbeitsstättenrichtlinie und Grundbedürfnisse. Petra wickelt sich demonstrativ in ihre Notfall-Strickjacke und beginnt, hörbar zu frösteln. Bei 28 Grad.", m: 2, f: 0, a: -5, c: 5, nextEmail: "mail_temperature_war" },
            { t: "Das Fenster zumachen, Luft wird überbewertet", r: "Du machst das Fenster zu. Die Luft wird zäh wie im Wartezimmer, gegen drei gähnt die halbe Abteilung synchron. Petra hingegen blüht sichtlich auf. Einer muss ja.", m: 10, f: 10, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_temperature_war",
        linked: true,
        sender: "Kollegin Petra",
        subj: "Re: Es zieht!",
        body: "Dann drehe ich die Heizung auf 5! Das hast du davon!",
        opts: [
            { t: "Sauna-Krieg.", r: "Petra dreht auf, du öffnest das Fenster weiter, jemand holt heimlich einen Ventilator aus dem Lager. Die Abteilung zerfällt in Klimazonen. Gearbeitet wird in keiner davon.", m: 2, f: 5, a: 15, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_printer_name_1",
        sender: "Office Management",
        subj: "Name für neuen Drucker",
        body: "Vorschläge: 1. Drucki McPrintface, 2. Papierstau-Paulus, 3. The Beast. Bitte abstimmen.",
        opts: [
            { t: "The Beast", r: "Du stimmst für 'The Beast'. Das Gerät hat vier Techniker verschlissen und druckt gelegentlich Dokumente, die ihm niemand geschickt hat. Namen sollten Respekt ausdrücken. Oder Angst.", m: 2, f: 0, a: 0, c: 0, nextEmail: "mail_printer_beast" },
            { t: "Drucki McPrintface", r: "Du stimmst für den Klassiker der Internet-Demokratie. Im Verteiler wird gekichert, und das Office Management begreift in Echtzeit, warum man offene Abstimmungen nie hätte zulassen dürfen.", m: 2, f: 5, a: -5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_printer_beast",
        linked: true,
        sender: "Office Management",
        subj: "Taufe: The Beast",
        body: "Der Drucker heißt jetzt 'The Beast'. Er hat zur Feier des Tages sofort Toner auf den Teppich gespuckt.",
        opts: [
            { t: "Passender Name.", r: "Du nickst dem Gerät im Vorbeigehen zu, wie man einem Raubtier im Gehege zunickt. Der Tonerfleck bleibt im Teppich. Niemand traut sich mit dem Reinigungsgerät in seine Reichweite.", m: 2, f: 0, a: 0, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_darkmode_1",
        sender: "Design Team",
        subj: "Dark Mode Pflicht?",
        body: "Wir überlegen, alles auf Schwarz umzustellen. Spart Strom und sieht cool aus. Meinung?",
        opts: [
            { t: "JA! MEINE AUGEN!", r: "Du antwortest in Großbuchstaben und mit medizinischer Dringlichkeit. Acht Jahre weißer Hintergrund bei voller Helligkeit - deine Netzhaut hat diese Abstimmung verdient.", m: 2, f: 5, a: -5, c: 0, nextEmail: "mail_darkmode_win" },
            { t: "Nein, ich mag Weiß.", r: "Deine Antwort löst im Entwickler-Kanal eine Schweigeminute aus. Jemand ändert deinen Anzeigenamen im Chat zu 'Tageslicht-Müller'. Das wird hängenbleiben.", m: 2, f: 0, a: 5, c: 5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_darkmode_win",
        linked: true,
        sender: "Design Team",
        subj: "Welcome to the Dark Side",
        body: "Alles ist jetzt schwarz. Leider auch die Schriftfarbe. Wir arbeiten dran.",
        opts: [
            { t: "Ich sehe nichts...", r: "Schwarze Schrift auf schwarzem Grund. Zum Lesen markierst du jetzt jeden Text mit der Maus, wie 1998. Das Design-Team nennt es 'immersiv', du nennst es Blindflug. Aber elegant sieht es aus, das muss man lassen.", m: 2, f: 10, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_secret_santa_1",
        sender: "Orga Komitee",
        subj: "Wichteln im Juli",
        body: "Wir wollen die Stimmung heben! Zwangswichteln! Du musst ein Geschenk für 'Dr. Wichtig' besorgen. Budget: 5€.",
        opts: [
            { t: "Klopapier einpacken", r: "Du verpackst eine Rolle Klopapier in Geschenkfolie und legst eine Karte bei: 'Für den täglichen Bedarf.' Beim Einpacken fühlt es sich noch wie Satire an. Beim Abgeben schon wie ein Abschiedsbrief.", m: 5, f: 0, a: -5, c: 10, nextEmail: "mail_santa_fail" },
            { t: "Schokolade kaufen", r: "Du kaufst die Fünf-Euro-Packung Pralinen von der Tankstelle. Niemand wird sich an dieses Geschenk erinnern, und genau das ist der Plan. Unauffälligkeit ist auch eine Strategie.", m: 5, f: -5, a: 0, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_santa_fail",
        linked: true,
        sender: "Dr. Wichtig",
        subj: "Ihr Geschenk",
        body: "Müller? War das eine Anspielung auf meine Arbeitsweise? Ich erwarte Sie in meinem Büro. Bringen Sie die Karte mit.",
        opts: [
            { t: "Ups.", r: "Auf dem Weg nach oben formulierst du drei Erklärungen und verwirfst alle. Die Karte liegt bereits auf seinem Schreibtisch, in einer Klarsichthülle. Wie ein Beweisstück. Es ist ein Beweisstück.", m: 5, f: 0, a: 20, c: 10 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_scam_prince_1",
        sender: "Prinz Zamunda",
        subj: "GOLD GESCHENKT",
        body: "Hallo mein Freund. Ich habe 50 Millionen Goldbarren. Ich brauche dein Konto. 50/50 Split?",
        opts: [
            { t: "'Schick erst eine Probe!'", r: "Du forderst höflich einen Goldbarren als Warenprobe an, Versand bitte frei Haus. Irgendwo auf der Welt seufzt ein Scammer, öffnet aber trotzdem die Vorlage für Stufe 2. Ihr habt beide Zeit.", m: 2, f: 5, a: 0, c: 0, nextEmail: "mail_scam_prince_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_scam_prince_2",
        linked: true,
        sender: "Prinz Zamunda",
        subj: "Re: GOLD GESCHENKT",
        body: "Okay, ich habe dir 1 Cent überwiesen. Vertraust du mir jetzt? Bitte Sende Passwort.",
        opts: [
            { t: "Er hat wirklich überwiesen!", r: "Tatsächlich: ein Cent, Verwendungszweck 'Vertrauensbeweis'. Du druckst den Kontoauszug aus und heftest ihn ab, Kategorie 'Beste Investition des Monats'. Das Passwort bekommt er trotzdem nicht.", m: 2, f: 5, a: -5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_parking_scooter_1",
        sender: "Hausmeister Egon",
        subj: "E-Roller im Flur",
        body: "Wer hat seinen 'Lime-Scooter' im Serverraum geparkt? Er piept alle 30 Sekunden.",
        opts: [
            { t: "Rausschmeißen", r: "Du wirfst den Roller in hohem Bogen aus dem Fenster. Er landet weich im Gebüsch und piept dort tapfer weiter, aber gedämpft. Egon schickt dir wortlos ein Foto: Daumen hoch vor Gebüsch.", m: 5, f: 0, a: -5, c: 0 },
            { t: "Das ist mein Dienstwagen.", r: "Du bekennst dich zum Roller und nennst ihn 'Flottenfahrzeug'. Egon antwortet mit einem Scan der Hausordnung, in dem das Wort 'Flur' viermal unterstrichen ist. Den Serverraum erwähnt er gar nicht erst.", m: 2, f: 5, a: 0, c: 5, nextEmail: "mail_parking_scooter_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_parking_scooter_2",
        linked: true,
        sender: "Hausmeister Egon",
        subj: "Re: E-Roller",
        body: "Hab ihn ans WLAN angeschlossen. Er lädt jetzt Updates runter und blockiert die Leitung. Dein Problem.",
        opts: [
            { t: "Mist.", r: "Der Roller zieht Firmware-Updates und hat sich im WLAN als 'Drucker' angemeldet. Niemand kommt mehr ins Netz. Egon hat aus einer Ordnungswidrigkeit eine Infrastrukturkrise gemacht.", m: 2, f: -5, a: 10, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_vegan_war_1",
        sender: "Kantinen-Ausschuss",
        subj: "Schnitzel-Verbot?",
        body: "Diskussion: Sollen wir den 'Schnitzel-Dienstag' durch den 'Tofu-Tornado-Tag' ersetzen?",
        opts: [
            { t: "Ja, Tofu ist super.", r: "Deine Zustimmung wird im Protokoll vermerkt. Am nächsten Schnitzel-Dienstag setzt sich demonstrativ niemand zu dir, und auf deiner Kaffeetasse steht plötzlich 'Verräter'. In Edding. Wasserfest.", m: 2, f: 0, a: 15, c: 0 },
            { t: "'NIEMALS!' - für das Schnitzel kämpfen", r: "Du verfasst ein flammendes Plädoyer für den Schnitzel-Dienstag. Die IT schließt sich geschlossen an, der Betriebsrat ebenfalls. Selten hat dieses Haus so schnell eine Mehrheit gefunden.", m: 2, f: 0, a: -5, c: 0, nextEmail: "mail_vegan_schnitzel" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_vegan_schnitzel",
        linked: true,
        sender: "Kantinen-Ausschuss",
        subj: "Abstimmungsergebnis",
        body: "Das Schnitzel bleibt! Aber es kostet jetzt 9,50€ (Klimazuschlag).",
        opts: [
            { t: "Ein teurer Sieg.", r: "Du überschlägst kurz die Rechnung: 9,50 Euro, davon gefühlt acht für das Wort 'Klimazuschlag'. Du wirst es trotzdem bestellen, und der Ausschuss hat genau damit kalkuliert.", m: 2, f: 5, a: 0, c: -5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_pen_thief_1",
        sender: "Sekretariat",
        subj: "Kugelschreiber Schwund",
        body: "Es fehlen 500 Kugelschreiber. Wer welche hat, bitte zurückgeben. Anonyme Box steht bereit.",
        opts: [
            { t: "Ich weiß von nichts.", r: "Du bestreitest jede Kenntnis und schiebst dabei unauffällig die Schublade zu, in der es verdächtig klappert. Vierzig Stück sind kein Diebstahl. Das ist eine Sammlung.", m: 2, f: 5, a: 0, c: 0 },
            { t: "Meine 40 Stück zurückgeben", r: "Du kippst deine Schublade über der anonymen Box aus. Es klappert dreißig Sekunden lang, und alle im Flur wissen jetzt sehr genau, wer 'anonym' ist.", m: 5, f: 0, a: 0, c: 5, nextEmail: "mail_pen_thief_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_pen_thief_2",
        linked: true,
        sender: "Sekretariat",
        subj: "Danke...",
        body: "Danke für die Rückgabe. Warum waren die alle angekaut?! Wir werfen sie weg.",
        opts: [
            { t: "Ich war nervös.", r: "Du antwortest wahrheitsgemäß, dass du nervös warst. Eine Antwort kommt nicht mehr. Stattdessen steht am nächsten Morgen eine ungeöffnete Packung Kugelschreiber auf deinem Schreibtisch, mit einem Post-it: Für Sie. Bitte behalten.", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_fire_alarm_1",
        sender: "Sicherheit",
        subj: "ANGEKÜNDIGTER FEUERALARM",
        body: "Heute um 14:00 testen wir die Sirene. Bitte NICHT in Panik geraten und NICHT aus dem Fenster springen.",
        opts: [
            { t: "Um 14:00 'FEUER!' schreien", r: "Um Punkt 14:00 lieferst du die Begleitstimme zur Sirene. Die Übung bekommt dadurch eine Authentizität, die im Protokoll später als 'unkontrollierte Eigendynamik' auftauchen wird.", m: 5, f: 0, a: 0, c: 10, nextEmail: "mail_fire_chaos" },
            { t: "Ohrstöpsel rein", r: "Du steckst die Ohrstöpsel rein und arbeitest durch den Alarm hindurch wie durch ein schlechtes Meeting. Um dich herum Evakuierung, bei dir: Inbox Zero in Reichweite.", m: 2, f: 5, a: -5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_fire_chaos",
        linked: true,
        sender: "Sicherheit",
        subj: "Manöverkritik",
        body: "Dank Herrn Müller sind 3 Kollegen in den Brunnen gesprungen. Die Übung war ein 'voller Erfolg'.",
        opts: [
            { t: "Gern geschehen.", r: "Du antwortest mit einem Daumen-hoch. Die drei Brunnenspringer sind wohlauf und um eine Geschichte reicher, die auf jeder Weihnachtsfeier der nächsten zehn Jahre erzählt wird. Gelernt hat aus der Übung wie immer: niemand.", m: 2, f: 0, a: -10, c: -5 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_meme_1",
        sender: "Der lustige Günther",
        subj: "Wochenende!!! 🍺🍺",
        body: "Hier ein lustiges Bild von einem Minion, der Bier trinkt! Hahaha! Versteht ihr? Weil Arbeit doof ist!",
        opts: [
            { t: "Günther blockieren", r: "Du richtest eine Regel ein: Alles von Günther wandert ab sofort ungelesen ins Archiv. Irgendwo da drin lachen seine Minions weiter, für immer, ohne Publikum. Ein würdiges Ende.", m: 2, f: 5, a: -5, c: 0 },
            { t: "Fake-Lachen antworten", r: "Du schreibst 'Haha, guter Günther!' und drückst Senden. Ein kleiner Teil von dir kündigt innerlich. Günther wird diese Antwort als Freibrief für die nächsten zweihundert Bilder verstehen.", m: 2, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_consultant_1",
        sender: "McKinsey & Partner",
        subj: "Effizienz-Analyse",
        body: "Wir prüfen Ihre Abteilung. Bitte protokollieren Sie jeden Toilettengang in Excel.",
        opts: [
            { t: "Excel fälschen", r: "Du trägst für die ganze Woche 'keine Unterbrechungen' ein. Die Berater vermerken dich als 'bemerkenswert effizient' und empfehlen, deine Methode zum Abteilungsstandard zu machen. Die Kollegen wissen noch nichts von ihrem Glück.", m: 2, f: 5, a: 0, c: 5 },
            { t: "Excel ausfüllen", r: "Du füllst die Tabelle wahrheitsgemäß aus, Spalte für Spalte. Bei der dritten Zeile fragst du dich, was die Beratung kostet, die das später liest. Die Antwort würde dich wütender machen als die Tabelle.", m: 5, f: -10, a: 15, c: 0, nextEmail: "mail_consultant_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_consultant_2",
        linked: true,
        sender: "McKinsey & Partner",
        subj: "Ergebnis",
        body: "Sie gehen zu oft. Wir empfehlen einen Katheter am Arbeitsplatz, um die Effizienz um 2% zu steigern.",
        opts: [
            { t: "Ich kündige gleich.", r: "Du beginnst drei Antworten und löschst alle drei. Die vierte besteht nur aus dem Wort Katheter und einem Fragezeichen. Auch die löschst du. Der Berater wird nie erfahren, wie knapp er davongekommen ist.", m: 2, f: 0, a: 20, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_lottery_win_fake",
        sender: "Notar Dr. Fake",
        subj: "Erbschaft aus Nigeria",
        body: "Ihr ferner Onkel ist gestorben. Er hinterlässt Ihnen eine Diamantenmine. Bitte überweisen Sie 500€ Gebühr.",
        opts: [
            { t: "Seems legit - zahlen", r: "Fünfhundert Euro, überwiesen an einen Prinzen mit Diamantenmine. Die Bestätigungsmail kommt binnen Sekunden, die Diamanten nie. Immerhin hast du jetzt eine Anekdote, die du niemandem erzählen wirst.", m: 2, f: 0, a: 20, c: -20 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Du bist ja nicht blöd.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_smell_1",
        sender: "Anonym",
        subj: "Geruchsbelästigung",
        body: "Jemand in diesem Büro riecht nach altem Käse und Verzweiflung. Bitte duschen.",
        opts: [
            { t: "Das ist Kevin.", r: "Du antwortest mit einem einzigen Wort: 'Kevin.' Binnen Minuten treffen zwei zustimmende Mails aus anderen Abteilungen ein. Der Fall gilt damit als geklärt. Beweise wurden zu keinem Zeitpunkt erhoben.", m: 2, f: 5, a: -5, c: 0 },
            { t: "Rieche ich das?", r: "Du schnupperst unauffällig an deinem eigenen Ärmel. Das Ergebnis ist nicht eindeutig, und genau das macht dich nervös. Du beschließt, vorsichtshalber gekränkt zu sein.", m: 2, f: 0, a: 5, c: 5, nextEmail: "mail_smell_2" },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_smell_2",
        linked: true,
        sender: "Anonym",
        subj: "Re: Geruchsbelästigung",
        body: "Ja, Sie sind es. Deo hilft. Danke.",
        opts: [
            { t: "Autsch.", r: "Du liest die Mail dreimal und riechst dann doch noch einmal am Ärmel. Auf dem Heimweg kaufst du Deo, Duschgel und aus Trotz ein Parfüm. Anonym bleibt anonym - aber recht hatte die Person.", m: 2, f: 0, a: 10, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_teambuilding_1",
        sender: "HR (Sabine)",
        subj: "Teamevent: Wald-Survival",
        body: "Wir setzen euch im Wald aus. Ohne Handys. Wer zuerst zurück ist, wird nicht gefeuert.",
        opts: [
            { t: "Ich nehme ein Messer mit.", r: "Du bestätigst die Teilnahme und beginnst eine Packliste: Messer, Kompass, Müsliriegel, Ersatzsocken. Wenn die Firma Survival will, bekommt sie jemanden, der den Ernstfall wörtlich nimmt.", m: 2, f: 0, a: 5, c: 5 },
            { t: "Krankmelden", r: "Dein Rücken meldet sich mit tadellosem Timing. Die Beschwerden sind nicht nachweisbar, nicht widerlegbar und halten exakt bis zum Ende des Teamevents an. Ein Klassiker der Arbeitsmedizin.", m: 2, f: 10, a: -5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_printer_color_cyan",
        sender: "Drucker",
        subj: "TONER LEER",
        body: "Cyan ist leer. Ich kann dieses Schwarz-Weiß-Dokument nicht drucken, weil ich Cyan brauche um Schwarz zu mischen.",
        opts: [
            { t: "Mit Kugelschreiber abschreiben", r: "Du schreibst das Dokument von Hand ab wie ein Mönch im Skriptorium, nur mit schlechterer Handschrift. Nach der zweiten Seite krampft die Hand. Der Drucker sieht dir dabei zu. Du meinst, ein leises Summen zu hören.", m: 10, f: -10, a: 10, c: 0 },
            { t: "Drucker schlagen", r: "Der Schlag ändert nichts am Tonerstand, aber einiges an deinem Innenleben. Der Drucker quittiert ihn mit einer Fehlermeldung, die vorher nicht da war. Ihr versteht euch.", m: 5, f: 0, a: 5, c: 0 },
            { t: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },


/* ============================================================
   MAIL WAVE (v4.0.0)
   Frau Elster gets her first mails at all (the receipt saga and
   the stocktake with control item 87), Markus his Siri dictations
   and the CC loop, Kevin the attachment classic. Plus office post
   without a character attached: the reply-all lasagne, head
   office's phishing test, the 14-level forward and the
   out-of-office loop. Six chains via nextEmail. For the first
   time mails carry small reputation values (±3-5).
   ============================================================ */

{
    id: "mail_markus_siri",
    sender: "Vertriebsleiter Markus",
    subj: "WICHTIG AUS DEM AUTO",
    body: "HALLO MÜLLER AUSRUFEZEICHEN ich brauche DRINGEND die zahlen für Techni Plast KOMMA die vom letzten Quartal PUNKT neuer Absatz\n\nnicht die alten zahlen sondern die NEUEN alten PUNKT\n\ngesendet von meinem iPhone während der Fahrt Siri du kannst jetzt aufhören Siri STOP",
    opts: [
        {
            t: "Präzise nachfragen: WELCHE Zahlen?",
            nextEmail: "mail_markus_siri_2",
            m: 2, f: 0, a: 5, c: 0,
            r: "Du formulierst eine glasklare Rückfrage mit drei Auswahlmöglichkeiten. Die Antwort wird wieder aus dem Auto kommen. Du weißt das. Du fragst trotzdem. Hoffnung ist ein Arbeitsprinzip."
        },
        {
            t: "Die wahrscheinlichsten Zahlen einfach schicken",
            rep: { "Markus": 3 },
            m: 10, f: 5, a: 0, c: 0,
            r: "Du rätst dich durch den Vertriebs-Dschungel und schickst die Quartalsauswertung TechniPlast. Zwanzig Minuten später: 'PERFEKT DANKE AUSRUFEZEICHEN'. Es waren die richtigen. Diesmal."
        },
        {
            t: "Löschen & Ignorieren",
            ignoreEmail: true,
            m: 2, f: 0, a: 0, c: 10,
            r: "Was aus dem Auto kommt, kann im Auto bleiben. Die Mail verschwindet. Markus wird sich melden, sobald er parkt. Also nie."
        }
    ]
},
{
    id: "mail_markus_siri_2",
    linked: true,
    sender: "Vertriebsleiter Markus",
    subj: "Re: WICHTIG AUS DEM AUTO",
    body: "NA DIE ZAHLEN HALT AUSRUFEZEICHEN die wo der kunde meinte dass die komisch sind PUNKT\n\nfrag GABI die weiß sowas\n\nSiri sende an Müller nein NICHT an Müller Berger an MÜLLER",
    opts: [
        {
            t: "'Ruf mich an, wenn du geparkt hast'",
            m: 2, f: 5, a: -5, c: 0,
            r: "Die Antwort kommt vier Stunden später: 'BIN GEPARKT wer bist du nochmal FRAGEZEICHEN'. Siri hat den Verlauf gefressen. Das Thema hat sich, wie so vieles bei Markus, unterwegs von selbst erledigt."
        },
        {
            t: "Gabi fragen - natürlich weiß sie es",
            rep: { "Gabi": 3 },
            m: 5, f: 5, a: 0, c: 0,
            r: "Gabi weiß es sofort: 'Die Rabattstaffel. Die ist seit März falsch verlinkt, das meint er.' Du schickst die korrigierte Datei. Zwei Menschen in diesem Haus verstehen den Vertrieb: Gabi und niemand sonst."
        }
    ]
},

{
    id: "mail_markus_loop",
    sender: "Vertriebsleiter Markus",
    subj: "WG: WG: Kundenbeschwerde TechniPlast - NUR DAMIT ALLE IM LOOP SIND",
    body: "Team,\n\nich leite das mal an ALLE weiter, volle Transparenz.\n\n@IT: Bitte kurz erklären, warum das System 'langsam' ist.\n@Chef: FYI.\n@Buchhaltung: FYI.\n@Empfang: FYI.\n\nZeit ist Geld!\nM.\n\n[CC: 74 Empfänger, darunter Dr. Wichtig]",
    opts: [
        {
            t: "Allen antworten, sachlich und endgültig",
            m: 10, f: 0, a: 10, c: -5,
            r: "Du erklärst dem gesamten Verteiler in drei nüchternen Sätzen die Ursache (der Kunde nutzt den Client von 2019). Es ist korrekt, transparent und wird von exakt niemandem gelesen. Aber es steht im Loop, und der Loop ist heilig."
        },
        {
            t: "Nur Markus antworten: 'Sowas klären wir zu zweit'",
            rep: { "Markus": -3 },
            m: 5, f: 0, a: -5, c: 0,
            r: "Er antwortet - selbstverständlich an alle: 'Die IT möchte das bilateral klären AUSRUFEZEICHEN Transparenz sieht anders aus.' Du hast verloren, indem du vernünftig warst. Der Klassiker dieses Hauses."
        },
        {
            t: "Löschen & Ignorieren",
            ignoreEmail: true,
            m: 2, f: 0, a: 0, c: 10,
            r: "Der Loop rauscht ohne dich weiter. In Mail vierzehn der Kette wird jemand vorschlagen, 'das in einem Termin zu besprechen'. Du wirst eingeladen werden. Man entkommt dem Loop nicht. Man vertagt ihn."
        }
    ]
},

{
    id: "mail_elster_349",
    sender: "Frau Elster (Buchhaltung)",
    subj: "Fehlender Beleg: 3,49 EUR (USB-Kabel) - 3. Erinnerung",
    body: "Sehr geehrter Herr Müller,\n\nzum dritten Mal erinnere ich an den fehlenden Originalbeleg zur Barauslage vom 12.06. (USB-Kabel, 3,49 EUR).\n\nOhne Beleg keine Erstattung. Ohne Klärung kein sauberer Jahresabschluss.\n\nFristsetzung: Freitag, 12:00 Uhr.\n\nMit freundlichen Grüßen\nE. Elster\n\n(Diese E-Mail wurde vor dem Versand auf Rechtschreibung geprüft.)",
    opts: [
        {
            t: "Die Schreibtisch-Archäologie beginnen",
            nextEmail: "mail_elster_349_2",
            m: 15, f: -5, a: 10, c: 0,
            r: "Nach einer Viertelstunde Grabung durch drei Schubladen-Schichten: Der Beleg klebt an einem Hustenbonbon. Er ist verknittert, aber lesbar. Du scannst ihn mit der Sorgfalt eines Restaurators und reichst ihn ein."
        },
        {
            t: "'Vergessen wir die 3,49 einfach'",
            rep: { "Frau Elster": -5 },
            m: 2, f: 5, a: 0, c: 5,
            r: "Fataler Irrtum. Es geht nicht um 3,49 Euro. Es ging NIE um 3,49 Euro. Es geht um das Prinzip, und das Prinzip führt jetzt einen offenen Posten mit deinem Namen. Ihre Antwort: 'Verzicht ist buchhalterisch KEINE Klärung.'"
        },
        {
            t: "Löschen & Ignorieren",
            ignoreEmail: true,
            m: 2, f: 0, a: 0, c: 10,
            r: "Die vierte Erinnerung wird per Hauspost kommen. Ausgedruckt. Mit beigelegtem Lesebestätigungs-Formular. Es gibt Gegner, gegen die Ignorieren keine Strategie ist, sondern nur eine Fristverlängerung."
        }
    ]
},
{
    id: "mail_elster_349_2",
    linked: true,
    sender: "Frau Elster (Buchhaltung)",
    subj: "Re: Fehlender Beleg - ERLEDIGT",
    body: "Sehr geehrter Herr Müller,\n\nder Beleg ist eingegangen und verbucht. Der Vorgang ist geschlossen.\n\nAnbei zur Kenntnis: Ihre Erstattung (3,49 EUR) sowie 0,12 EUR Verzugsausgleich, den Sie nicht beantragt haben, der Ihnen jedoch zusteht.\n\nOrdnung ist keine Schikane.\nE. Elster",
    opts: [
        {
            t: "Die 12 Cent gebührend würdigen",
            rep: { "Frau Elster": 5 },
            m: 2, f: 0, a: -5, c: 0,
            r: "Du antwortest: 'Die 12 Cent haben meinen Tag gerettet.' Ihre Antwort kommt nach neunzig Sekunden: 'Das war der Zweck.' Irgendwo hinter den Aktenbergen hat Frau Elster gelächelt. Davon ist auszugehen."
        },
        {
            t: "Kommentarlos abheften",
            m: 2, f: 5, a: 0, c: 0,
            r: "Vorgang geschlossen, Ablage, fertig. Die 12 Cent bleiben unkommentiert. Es war eine ausgestreckte Hand in Centbeträgen, und du hast sie übersehen. Buchhalterisch korrekt. Menschlich verbesserungsfähig."
        }
    ]
},

{
    id: "mail_elster_inventur",
    sender: "Frau Elster (Buchhaltung)",
    subj: "Jahresinventur IT: Bestätigung Anlagennummern (214 Positionen)",
    body: "Sehr geehrter Herr Müller,\n\nanbei die Anlagenliste der IT (214 Positionen). Bitte prüfen Sie JEDE Position auf tatsächliches Vorhandensein und bestätigen Sie bis Monatsende.\n\nStichprobenkontrollen behalte ich mir vor.\n\nMit freundlichen Grüßen\nE. Elster",
    opts: [
        {
            t: "Alle 214 blind bestätigen",
            nextEmail: "mail_elster_inventur_2b",
            m: 5, f: 10, a: 0, c: 0,
            r: "Zweihundertvierzehn Häkchen in vier Minuten - ein neuer Hausrekord. Die Liste geht bestätigt zurück an die Buchhaltung, wo Frau Elster sie mit einem ganz bestimmten Blick öffnen wird."
        },
        {
            t: "An Kevin delegieren: Inventur-Praxis!",
            rep: { "Kevin": 3 },
            m: 5, f: 5, a: 0, c: 5,
            r: "Kevin zieht begeistert mit Klemmbrett los. Rückmeldung nach drei Stunden: '213 gefunden! Und was ist ein Quantenrechner?' Der Junge hat die Kontrollposition entdeckt, ohne zu ahnen, dass es eine war. Instinkt kann man nicht lehren."
        },
        {
            t: "Gewissenhaft prüfen, Auffälligkeiten melden",
            nextEmail: "mail_elster_inventur_2a",
            m: 25, f: -10, a: 15, c: 0,
            r: "Ein Nachmittag zwischen Racks, Schränken und Egons Kellerregalen. 209 Positionen: vorhanden. Vier: verschollen. Und Position 87, 'Quantenrechner QX-1, Anschaffung 1997', kann unmöglich existieren. Du meldest exakt das - samt der Frage, was ein Quantenrechner 1997 gekostet haben soll."
        }
    ]
},
{
    id: "mail_elster_inventur_2a",
    linked: true,
    sender: "Frau Elster (Buchhaltung)",
    subj: "Re: Jahresinventur - Position 87",
    body: "Sehr geehrter Herr Müller,\n\nPosition 87 war eine Kontrollposition.\n\nSie sind der Erste seit Einführung dieser Praxis (2011), der sie beanstandet hat.\n\nIch habe Sie auf die Liste der prüfungssicheren Ansprechpartner gesetzt. Diese Liste umfasst nunmehr zwei Namen.\n\nE. Elster",
    opts: [
        {
            t: "Still stolz sein",
            rep: { "Frau Elster": 3 },
            m: 2, f: 5, a: 0, c: 0,
            r: "Manche Auszeichnungen brauchen keine Antwort. Du bist jetzt prüfungssicher - ein Adelstitel, den es offiziell nicht gibt und der in diesem Haus trotzdem mehr wiegt als jede Beförderung."
        },
        {
            t: "'Wer ist der andere Name?'",
            rep: { "Frau Elster": 5 },
            m: 2, f: 0, a: 0, c: 0,
            r: "Die Antwort kommt umgehend und besteht aus einem Wort: 'Ich.' Mehr Ehre passt in dieser Firma nicht in eine Zeile. Du druckst die Mail nicht aus. Aber es war knapp."
        }
    ]
},
{
    id: "mail_elster_inventur_2b",
    linked: true,
    sender: "Frau Elster (Buchhaltung)",
    subj: "Re: Jahresinventur - Rückfrage zu Position 87",
    body: "Sehr geehrter Herr Müller,\n\nSie bestätigen das Vorhandensein von Position 87: 'Quantenrechner QX-1, Anschaffung 1997'.\n\nDiese Position habe ich zu Kontrollzwecken erfunden.\n\nIch schlage vor, Sie prüfen die Liste erneut. Diesmal mit den Augen.\n\nE. Elster",
    opts: [
        {
            t: "Zerknirscht wirklich prüfen",
            rep: { "Frau Elster": 3 },
            m: 25, f: -5, a: 15, c: 0,
            r: "Die zweite Runde machst du richtig: jede Position, jeder Raum, Egons Keller inklusive. Vier Geräte bleiben verschollen, der Rest stimmt. Ihre Antwort auf deine korrigierte Liste: 'Sehen Sie. Ging doch.' Es klingt fast mütterlich. Fast."
        },
        {
            t: "'Der Quantenrechner steht bei Egon im Keller'",
            rep: { "Frau Elster": -5 },
            m: 2, f: 10, a: 0, c: 5,
            r: "Humor ist bei Kontrollpositionen nicht vorgesehen. Ihre Antwort besteht aus einem Satz: 'Ich habe Egon gefragt.' Du hast verloren. Egon übrigens auch - er hat gesagt: 'Kann sein.' Jetzt sucht die Buchhaltung einen Quantenrechner von 1997."
        }
    ]
},

{
    id: "mail_kevin_anhang",
    sender: "Kevin (Azubi)",
    subj: "die datei",
    body: "hier die datei die du wolltest\n\nlg kevin",
    opts: [
        {
            t: "Selbst per Fernwartung nachsehen",
            m: 10, f: 5, a: 5, c: 0,
            r: "Du findest die Datei auf seinem Desktop. Sie heißt 'endgültig_final_NEU(3).xlsx' und liegt direkt neben 'endgültig_final_NEU(2).xlsx' und 'endgültig_final.xlsx'. Du nimmst die mit der höchsten Zahl. Hoffentlich zählt Kevin so wie der Rest der Menschheit."
        },
        {
            t: "'Kevin. Der Anhang.'",
            nextEmail: "mail_kevin_anhang_2",
            m: 2, f: 0, a: 5, c: 0,
            r: "Du antwortest mit drei Wörtern. Mehr braucht es nicht. Mehr würde auch nichts ändern."
        },
        {
            t: "Löschen & Ignorieren",
            ignoreEmail: true,
            m: 2, f: 0, a: 0, c: 5,
            r: "Wenn es wichtig ist, kommt es wieder. Bei Kevin kommt es immer wieder. Meistens dreifach und mit Emoji."
        }
    ]
},
{
    id: "mail_kevin_anhang_2",
    linked: true,
    sender: "Kevin (Azubi)",
    subj: "Re: die datei",
    body: "omg sorry 🙈 jetzt aber wirklich\n\nlg kevin",
    opts: [
        {
            t: "Anrufen und es beenden",
            m: 5, f: 0, a: 5, c: 0,
            r: "'Ach DESHALB ging die Mail so schnell raus!' Vierzig Sekunden Telefon lösen, was zwei Mails nicht konnten. Die Datei kommt an. Als Download-Link. Immerhin."
        },
        {
            t: "Schweigend warten - er merkt es selbst",
            nextEmail: "mail_kevin_anhang_3",
            m: 2, f: 5, a: 0, c: 0,
            r: "Wieder kein Anhang. Du antwortest nicht. Kevin wird es selbst bemerken - erfahrungsgemäß nach elf Minuten, wenn die Scham durch die Kopfhörer sickert."
        }
    ]
},
{
    id: "mail_kevin_anhang_3",
    linked: true,
    sender: "Kevin (Azubi)",
    subj: "Re: Re: die datei",
    body: "ok JETZT hab ichs gecheckt 😅 anbei!!\n\nlg kevin\n\n[Anhang: IMG_20260801_1337.jpg, 4,2 MB]",
    opts: [
        {
            t: "Hingehen und die Anhang-Schulung halten",
            rep: { "Kevin": 5 },
            m: 10, f: -5, a: 5, c: 0,
            r: "Du zeigst ihm das Büroklammer-Symbol. Kevin: 'DA ist das!' Er notiert es sich - als Sprachnachricht an sich selbst, aber er notiert es. Die Datei kommt zwei Minuten später an. Als echter Anhang. Es ist Wachstum. Irgendeine Form davon."
        },
        {
            t: "Das Foto für die Ewigkeit sichern",
            m: 2, f: 5, a: -5, c: 0,
            r: "Der Anhang ist ein Foto seines Bildschirms, auf dem die geöffnete Datei zu sehen ist. Scharf fotografiert immerhin. Das Bild wandert in deinen Ordner 'Beweise'. Bei seiner Abschlussfeier wird es eine Diashow geben. Du sammelst bereits."
        }
    ]
},

{
    id: "mail_allhands_lasagne",
    sender: "Bernd (Vertrieb)",
    subj: "WER hat meine Lasagne aus dem Kühlschrank genommen???",
    body: "Liebe 'Kollegen',\n\nmeine Lasagne (BESCHRIFTET!) ist aus dem Kühlschrank verschwunden. Die Tupperdose war ein Geschenk meiner Mutter.\n\nIch erwarte Aufklärung.\n\n- Bernd (2. OG)\n\n[An: Alle. Es liegen bereits 23 Antworten an alle vor.]",
    opts: [
        {
            t: "Die 23 Antworten genüsslich lesen",
            m: 10, f: 10, a: -10, c: 0,
            r: "Die Kette enthält: zwei gegenseitige Verdächtigungen, eine Grundsatzdebatte über Kühlschrank-Ethik, ein Meme und Frau Elsters trockenen Verweis auf die Kühlschrankordnung. Beste Unterhaltung des Tages, völlig kostenlos. Also fast: Es war Arbeitszeit."
        },
        {
            t: "Die IT-Karte spielen: 'Ich kann die Küchen-Logs prüfen'",
            nextEmail: "mail_allhands_lasagne_2",
            m: 5, f: 5, a: -5, c: 5,
            r: "Es gibt keine Küchen-Logs. Aber das weiß der Verteiler nicht. Deine Mail erzeugt im Thread eine sofortige, fast hörbare Stille. Macht fühlt sich exakt so an."
        },
        {
            t: "Löschen & Ignorieren",
            ignoreEmail: true,
            m: 2, f: 0, a: 0, c: 5,
            r: "Die Lawine rollt auch ohne dich. Morgen ist Bernds Lasagne Flurfolklore, übermorgen Legende, und in einem Jahr schwören drei Zeugen, es sei eine Königsberger-Klopse-Affäre gewesen."
        }
    ]
},
{
    id: "mail_allhands_lasagne_2",
    linked: true,
    sender: "Jürgen (Vertrieb)",
    subj: "Re: WER hat meine Lasagne... (PRIVAT)",
    body: "Herr Müller,\n\nkurze private Nachfrage unter uns: Diese 'Küchen-Logs'... was genau loggen die? Und seit wann?\n\nRein interessehalber.\n\n- Jürgen (3. OG)",
    opts: [
        {
            t: "'Jürgen. Wir beide wissen es.'",
            m: 5, f: 0, a: -5, c: 0,
            r: "Jürgen antwortet nicht. Muss er auch nicht. In der Kantine stellt er dir fortan wortlos den Nachtisch mit aufs Tablett. Schweigegeld in Puddingform. Du nimmst es an. Man muss auch nehmen können."
        },
        {
            t: "'Alles. Seit 2019.'",
            m: 2, f: 5, a: -10, c: 0,
            r: "Eine Stunde später steht eine neue, versiegelte Lasagne im Kühlschrank. Daneben ein Zettel: 'Für Bernd. Von einem Freund.' Fall geschlossen - ohne Urteil, ohne Beweis, ohne ein einziges echtes Log. Justiz durch Bluff. Die günstigste Form."
        }
    ]
},

{
    id: "mail_security_test",
    sender: "IT-Security (Konzernzentrale)",
    subj: "Ihre Paketzustellung wartet! Jetzt Zustellgebühr zahlen (1,99 EUR)",
    body: "Sehr geehrter Kunde,\n\nIhr Paket Nr. DE-8471-B kann nicht zugestellt werden. Bitte bestätigen Sie die Zustellgebühr über den folgenden Link.\n\n[Klassische Phishing-Optik in schlechtem Deutsch. Aber der Mail-Header verrät dem geübten Auge: Absender ist die eigene Konzern-Security. Es ist der jährliche Phishing-TEST.]",
    opts: [
        {
            t: "Die halbe Firma vorwarnen",
            m: 5, f: 5, a: -5, c: 5,
            r: "Deine Flurfunk-Warnung lotst Dutzende Kollegen sicher durch den Test. Die Konzern-Security staunt über die beste Quote der Firmengeschichte - 98 Prozent - und kündigt an, 'die Testmethodik zu überprüfen'. Du hast eine Statistik geheilt und sie dadurch verdächtig gemacht."
        },
        {
            t: "Vorbildlich als Phishing melden",
            m: 2, f: 0, a: 0, c: -5,
            r: "Der Musterknaben-Klick. Sekunden später: 'Glückwunsch! Sie haben den Test bestanden.' Du bist jetzt Teil einer Statistik, die in einer Vorstandsfolie enden wird. Immerhin auf der grünen Balkenseite."
        },
        {
            t: "Absichtlich klicken - Forschungszwecke",
            nextEmail: "mail_security_test_2",
            m: 5, f: 10, a: 0, c: 0,
            r: "Wissenschaftliche Neugier: Was passiert bei Klick? Der Link führt auf eine Belehrungsseite mit trauriger Schild-Grafik ('Das hätte ein echter Angriff sein können!') - und einer automatischen Konsequenz, die du eine Sekunde zu spät liest."
        }
    ]
},
{
    id: "mail_security_test_2",
    linked: true,
    sender: "IT-Security (Konzernzentrale)",
    subj: "Pflichtschulung: Phishing erkennen - Grundlagen (45 Min.)",
    body: "Sehr geehrter Herr Müller,\n\naufgrund Ihres Klickverhaltens wurden Sie automatisch für die Schulung 'Phishing erkennen - Grundlagen' angemeldet.\n\nDie Teilnahme ist verpflichtend und wird protokolliert.\n\nIhre IT-Security",
    opts: [
        {
            t: "'Ich BIN die IT.'",
            m: 10, f: 0, a: 10, c: 5,
            r: "Die Antwort der Konzern-Security kommt formvollendet: 'Gerade Administratoren sind ein Hochrisiko-Ziel. Die Teilnahme bleibt verpflichtend.' Sie haben recht, und das ist das Ärgerlichste daran. Die Schulung wartet. Sie wartet geduldig."
        },
        {
            t: "Die 45 Minuten würdevoll absitzen",
            m: 30, f: 10, a: 15, c: 0,
            r: "Du - hauptberuflich der Mensch, der diese Schulung halten könnte - klickst dich durch Module wie 'Was ist ein Link?'. Das Abschlusszertifikat druckst du aus und hängst es ins Büro. Als Mahnung. Oder Trophäe. Die Grenze ist fließend."
        }
    ]
},

{
    id: "mail_treiber_kette",
    sender: "Kollegin Petra",
    subj: "WG: WG: AW: WG: Re: AW: Drucker 3. OG",
    body: "Hallo IT,\n\nkönnen Sie da mal draufschauen? Kam gerade so rein, keiner weiß mehr, worum es ursprünglich ging.\n\nVG Petra\n\n[Darunter: vierzehn Weiterleitungsebenen aus drei Wochen, sieben Signaturen, zwei automatische Abwesenheitsnotizen]",
    opts: [
        {
            t: "Mail-Archäologie: bis zur Urfrage graben",
            m: 15, f: -5, a: 10, c: 0,
            r: "Vierzehn Ebenen tiefer, datiert vor drei Wochen, findest du die Urfrage: 'Ist der Drucker im 3. OG eigentlich neu?' Er war neu. Er ist es nicht mehr. Die Frage hat sich durch reine Weiterleitungsdauer selbst beantwortet. Du dokumentierst den Fund wie ein Höhlenforscher."
        },
        {
            t: "Ganz oben antworten: 'Was ist die Frage?'",
            m: 2, f: 0, a: 5, c: 0,
            r: "Deine Gegenfrage wird umgehend an vier Personen weitergeleitet, von denen zwei abwesend sind. Die Kette wächst um drei Ebenen. Du bist jetzt Teil des Problems, das du lösen wolltest. So vermehrt sich Bürokratie: durch Berührung."
        },
        {
            t: "Löschen & Ignorieren",
            ignoreEmail: true,
            m: 2, f: 0, a: 0, c: 5,
            r: "Die Kette wird auch ohne dich weiterwachsen. Irgendwann erreicht sie kritische Masse und kollabiert unter ihrem eigenen Gewicht zu einem Meeting. So enden sie alle."
        }
    ]
},

{
    id: "mail_ooo_loop",
    sender: "Systembenachrichtigung",
    subj: "[WARNUNG] Postfach-Volumen: 3.412 neue Nachrichten seit 11:02 Uhr",
    body: "Automatische Meldung:\n\nZwei Abwesenheitsnotizen (H. Bergmann / K. Winter) beantworten einander seit 11:02 Uhr.\n\nSie sind als Postmaster im CC jeder einzelnen Nachricht.\n\nAktuelle Rate: 14 Mails/Minute. Tendenz: steigend.",
    opts: [
        {
            t: "Die Schleife serverseitig töten",
            m: 10, f: -5, a: 5, c: -5,
            r: "Zwei Mail-Regeln, ein Neustart des Auto-Responders: Stille. Danach löschst du 3.412 Systemmails mit einem einzigen, zutiefst befriedigenden Klick. Bergmann und Winter kehren irgendwann aus dem Urlaub zurück und werden nie erfahren, welchen Sturm ihre Höflichkeit entfacht hat."
        },
        {
            t: "Erst noch zuschauen, wie weit es geht",
            m: 5, f: 10, a: -5, c: 5,
            r: "Es hat etwas Meditatives: zwei Maschinen, die einander unermüdlich versichern, gerade nicht da zu sein. Bei fünftausend greifst du ein. Der Screenshot des Zählers bei 4.999 hängt jetzt in deinem Ordner für besondere Momente."
        },
        {
            t: "Physik entscheiden lassen: Speicher ist endlich",
            m: 2, f: 10, a: 0, c: 10,
            r: "Irgendwann ist jeder Speicher voll, das regelt sich also von selbst. Leider gehört der Speicher der Firma, und das Monitoring der Konzernzentrale sieht ihn in Echtzeit volllaufen. Die Nachfrage von oben ist schneller als der Überlauf. Deutlich schneller."
        }
    ]
},


/* ============================================================
   TRAPS (v4.0.0): inbox bait - the dutiful reply is the
   expensive one.
   ============================================================ */

{
    id: "mail_falle_fuenf_minuten",
    sender: "Dr. Wichtig",
    subj: "Kurze Frage",
    body: "Herr Müller,\n\nhaben Sie nachher fünf Minuten für mich?\n\nW.",
    opts: [
        {
            t: "'Worum geht es denn?'",
            m: 2, f: 0, a: 5, c: 15,
            r: "Eine völlig vernünftige Rückfrage - nur liest sie sich auf Vorstandsebene anders: Wer nach dem Thema fragt, verhandelt über seine Verfügbarkeit. Die Antwort kommt nach vier Stunden und besteht aus einem einzigen Satz: 'Um fünf Minuten, Herr Müller.' Der Termin steht jetzt trotzdem. Die Verstimmung auch."
        },
        {
            t: "'Selbstverständlich, jederzeit!'",
            m: 25, f: 5, a: 25, c: 0,
            r: "Die fünf Minuten beginnen um 14 Uhr und enden als Projektskizze: Dr. Wichtig möchte 'die Digitalisierung nochmal ganz neu denken', und weil du so bereitwillig Zeit hattest, denkst du sie jetzt mit. Erste Arbeitsfassung: bis Freitag. Fünf Minuten sind in Chefzeit eine Währung mit sehr eigenem Wechselkurs."
        },
        {
            t: "Löschen & Ignorieren",
            ignoreEmail: true,
            m: 2, f: 5, a: 0, c: 15,
            r: "Man ignoriert keine Zweizeiler vom CEO - Zweizeiler vom CEO sind keine Mails, sie sind Vorladungen in Zivilkleidung. Um 15:30 Uhr steht er persönlich an deinem Schreibtisch: 'Sie haben meine Mail sicher übersehen.' Das Wort 'sicher' trägt die gesamte Beweislast des Satzes."
        }
    ]
},
{
    id: "mail_falle_richtlinie",
    sender: "IT-Compliance (Konzernzentrale)",
    subj: "Aktualisierte IT-Richtlinie - Bestätigung erforderlich (1 Klick)",
    body: "Sehr geehrte Mitarbeitende,\n\ndie IT-Nutzungsrichtlinie wurde aktualisiert (Anhang, 14 Seiten). Bitte bestätigen Sie die Kenntnisnahme mit einem Klick.\n\nDie Bestätigung ist bis Freitag verpflichtend.\n\nIhre Konzern-Compliance",
    opts: [
        {
            t: "Sofort bestätigen - ist ja nur ein Klick",
            m: 2, f: 5, a: 30, c: 5,
            r: "Ein Klick, erledigt, brav. Drei Wochen später beruft sich die Zentrale auf Ziffer 14b der von dir bestätigten Fassung: 'Administratoren stellen die Erreichbarkeit an Wochenenden im Rahmen des Zumutbaren sicher.' Du hast das gelesen. Steht ja in deiner Bestätigung. Das Zumutbare definiert übrigens nicht der Zumutende."
        },
        {
            t: "Erst die 14 Seiten wirklich lesen",
            m: 20, f: 0, a: 10, c: 0,
            r: "Zwanzig Minuten Verwaltungsprosa, und du findest sie: Ziffer 14b, Wochenend-Erreichbarkeit, geschickt zwischen Passwortregeln und Druckerrichtlinie versteckt. Dein formeller Widerspruch geht noch am selben Tag raus. Ob er etwas ändert, ist offen - aber niemand kann je behaupten, du hättest zugestimmt. Lesen: unbezahlbar. Und unbezahlt."
        },
        {
            t: "Löschen & Ignorieren",
            ignoreEmail: true,
            m: 2, f: 5, a: 5, c: 10,
            r: "Ab Montag kommt die Erinnerung täglich um 8:01 Uhr, ab Mittwoch mit deinem Vorgesetzten in Kopie, und die Betreffzeile wächst mit jedem Tag um ein weiteres 'ERINNERUNG:'. Compliance-Systeme kennen keine Müdigkeit. Nur Eskalationsstufen."
        }
    ]
},
{
    id: "mail_falle_mentor",
    sender: "Personalabteilung",
    subj: "Herzlichen Glückwunsch - Sie wurden nominiert!",
    body: "Sehr geehrter Herr Müller,\n\nwir freuen uns, Ihnen mitzuteilen, dass Sie für das neue MENTOREN-PROGRAMM nominiert wurden! Sie begleiten künftig drei Nachwuchskräfte auf ihrem Weg.\n\nDas Programm startet nächste Woche. Wir gratulieren herzlich!\n\nIhre Personalabteilung",
    opts: [
        {
            t: "'Wer hat mich denn nominiert?'",
            m: 5, f: 5, a: 5, c: 5,
            r: "Die Antwort kommt strahlend: 'Herr Markus aus dem Vertrieb - als Dank für Ihre großartige Unterstützung!' Markus wollte dir etwas Gutes tun und hat dir drei Auszubildende geschenkt. Die Nominierung zurückzuziehen würde ihn kränken und die Personalabteilung verwirren. Du bist jetzt Mentor. Aus Dankbarkeit. Seiner."
        },
        {
            t: "Geehrt annehmen - eine Auszeichnung!",
            m: 10, f: 10, a: 25, c: 0,
            r: "Die Auszeichnung entpuppt sich als Stundenplan: drei Nachwuchskräfte, wöchentliche 'Sparring-Sessions', Entwicklungsbögen in dreifacher Ausfertigung - alles zusätzlich zur eigentlichen Arbeit, versteht sich, denn 'Mentoring ist ja eine Ehre'. Ehren sind in diesem Haus grundsätzlich unbezahlt und terminiert."
        },
        {
            t: "Höflich ablehnen: keine Kapazität",
            m: 5, f: 0, a: 5, c: 10,
            r: "Deine sachliche Absage wird 'mit Bedauern zur Kenntnis genommen' und wandert als Vermerk in die Personalakte: 'Entwicklungsbereitschaft: eingeschränkt.' Beim nächsten Gehaltsgespräch wird genau dieses Wort auf dem Tisch liegen. Man kann in diesem Haus Ehren ablehnen. Aber nicht kostenlos."
        }
    ]
},

{
    id: "mail_onboarding_wrong",
    sender: "Personalentwicklung",
    subj: "Zugangsdaten für unseren neuen Kollegen (bitte weiterleiten)",
    body: "Guten Morgen Herr Müller,\n\nda Frau Müller aus dem Onboarding weiterhin ausfällt und Sie in unserer Verteilerliste direkt über ihr stehen, senden wir Ihnen die Zugangsdaten für unseren neuen Junior Assistant. Sie arbeiten ja ohnehin den ganzen Tag mit Computern.\n\nLogin: j_schnoesel\nPasswort: Synergy2026!\n\nHinweis der IT: Das Initialpasswort ist für sämtliche Konten im Haus identisch und darf nicht geändert werden, das verwirrt die Datenbank.\n\nBitte leiten Sie die Mail an ihn weiter. Ein Postfach hat er noch nicht.",
    opts: [
        {
            t: "Ausdrucken und Schnösel auf den Tisch legen",
            r: "Du druckst die Zugangsdaten aus und legst den Zettel auf Schnösels Tastatur. Der Ausdruck bleibt dort drei Wochen liegen, mit dem Passwort nach oben. Immerhin hat er ihn dann.",
            m: 10, f: 0, a: -5, c: 0
        },
        {
            t: "'Falscher Empfänger, mein Konto heißt mueller.'",
            r: "Du erklärst in zwei Sätzen, dass du nicht Schnösel bist, dass dein Konto schlicht 'mueller' heißt und dass Zugangsdaten nicht per Mail durchs Haus wandern sollten. Absenden. Niemand wird das lesen.",
            m: 5, f: 0, a: 5, c: 0,
            nextEmail: "mail_onboarding_reply"
        },
        {
            t: "Löschen & Ignorieren",
            r: "E-Mail kommentarlos gelöscht.",
            m: 2, f: 0, a: 0, c: 10,
            ignoreEmail: true
        }
    ]
},
{
    id: "mail_onboarding_reply",
    linked: true,
    sender: "Personalentwicklung",
    subj: "Re: Zugangsdaten für unseren neuen Kollegen (bitte weiterleiten)",
    body: "Sehr geehrter Herr Müller,\n\nvielen Dank für Ihren Hinweis. Sie waren tatsächlich nicht der vorgesehene Empfänger.\n\nWir bitten Sie daher, die vorangegangene E-Mail aus datenschutzrechtlichen Gründen unverzüglich und vollständig zu löschen. Eine schriftliche Bestätigung der Löschung ist erforderlich.\n\nIhr Konto mueller ist von dem Vorgang selbstverständlich nicht betroffen. Es verwendet dasselbe Passwort.",
    opts: [
        {
            t: "Löschung schriftlich bestätigen",
            r: "Du bestätigst schriftlich die Löschung einer E-Mail, die noch offen vor dir liegt. Der Vorgang gilt damit als abgeschlossen. Die Datenschutzquote des Hauses steigt.",
            m: 5, f: 5, a: 0, c: 0
        },
        {
            t: "Den letzten Satz zweimal lesen",
            r: "Es verwendet dasselbe Passwort. Alle Konten verwenden dasselbe Passwort. Ticket #4711, offen seit 2019, zuständig: du.",
            m: 2, f: 0, a: 5, c: 0
        },
        {
            t: "Löschen & Ignorieren",
            r: "E-Mail kommentarlos gelöscht.",
            m: 2, f: 0, a: 0, c: 10,
            ignoreEmail: true
        }
    ]
},
];
