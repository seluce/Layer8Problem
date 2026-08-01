export const emails = [

	{
		id: "mail_cake_1",
		sender: "HR (Sabine)",
		subj: "Kuchen in der Küche! 🍰",
		body: "Liebe alle,\n\nIch habe veganen, glutenfreien Zucchini-Kuchen gebacken! Bedient euch!\n\n(Bitte nur 1 Stück pro Person!)",
		opts: [
			{ btn: "Ein Stück nehmen", r: "Schmeckt nach Pappe und Traurigkeit.", m: 2, f: 0, a: 5, c: 0 },
			{ btn: "Allen antworten: 'Wo ist das Mett?'", r: "Du schickst den Witz an den ganzen Verteiler.", m: 2, f: 5, a: -5, c: 5, nextEmail: "mail_cake_2" },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_cake_2",
		linked: true,
		sender: "HR (Sabine)",
		subj: "Re: Kuchen in der Küche! 🍰",
		body: "Das finde ich überhaupt nicht lustig, Herr Müller!\n\nWir versuchen hier, eine inklusive Atmosphäre zu schaffen! Ich habe Ihren Namen auf die 'Kein-Weihnachtsgeld'-Liste gesetzt.",
		opts: [
			{ btn: "Das war es wert.", r: "Du holst dir heimlich ein Mettbrötchen.", m: 5, f: -5, a: -5, c: 5 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_ticket_fire",
		sender: "Ticketsystem", 
		subj: "TICKET #9942: Maus brennt.",
		body: "PRIORITY: CRITICAL \nUSER: Gabi (Empfang) \nDESCRIPTION: 'Hilfe, aus meiner Maus kommt Rauch und es riecht nach verbranntem Plastik. Ich habe versucht, sie mit Kaffee zu löschen, jetzt funkt es blau.' \nSTATUS: OPEN",
		opts: [
			{ btn: "Ticket löschen", r: "Gelöscht. Problem gelöst (für dich).", m: 2, f: 5, a: 0, c: 5 },
			{ btn: "Feuerwehr rufen", r: "Großeinsatz. Es war nur eine LED.", m: 2, f: -5, a: -5, c: 10 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_workshop_breathing",
		sender: "Betriebsrat", 
		subj: "Einladung: 'Richtig Atmen am Arbeitsplatz'",
		body: "Namaste liebe Mit-Sklaven... äh Mitarbeiter. \n\nWir laden ein zum Workshop 'Atmen gegen den Burnout'. Wir lernen gemeinsam, wie man Wut in CO2 umwandelt. Es gibt vegane Dinkel-Kekse (glutenfrei, zuckerfrei, geschmacksneutral). Anwesenheit wird empfohlen.",
		opts: [
			{ btn: "Teilnehmen", r: "Du atmest. 30 Minuten nichts getan.", m: 30, f: 15, a: -10, c: 5 },
			{ btn: "Als Spam markieren", r: "Weg damit. Zeit ist Geld.", m: 2, f: 0, a: 5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_toilet_1",
		sender: "Facility Mgt",
		subj: "Toiletten im 3. Stock gesperrt (Rohrbruch).",
		body: "ACHTUNG: Aufgrund eines... Vorfalls... mit einem nicht näher genannten Mitarbeiter und einer halben Rolle Papierhandtücher ist der Sanitärbereich im 3. OG gesperrt. Das Wasser steht 5cm hoch.\n\nBitte Gummistiefel tragen oder einhalten.",
		opts: [
			{ btn: "Allen antworten: 'Das kommt vom Sparzwang!'", r: "Du zettelst einen Aufstand gegen das Management an.", m: 2, f: 5, a: 10, c: 5, nextEmail: "mail_toilet_revolution" },
			{ btn: "Allen antworten: 'Danke Grüne!!!11'", r: "Du startest eine wilde politische Debatte ohne Sinn.", m: 2, f: 5, a: 10, c: 5, nextEmail: "mail_toilet_politics" },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_toilet_revolution",
		linked: true,
		sender: "Betriebsrat (Uwe)",
		subj: "AW: Toiletten im 3. Stock gesperrt",
		body: "KAMERADEN! Müller hat Recht!\n\nDas 1-lagige Papier ist ein Verbrechen an der Menschlichkeit! Das Management nutzt wahrscheinlich Seide!\n\nWir fordern: 4 Lagen für alle! Ab morgen: GENERALSTREIK vor dem Klo!",
		opts: [
			{ btn: "Solidarität bekunden.", r: "Du hast versehentlich eine kommunistische Revolution im 3. Stock gestartet.", m: 2, f: 10, a: -5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_toilet_politics",
		linked: true,
		sender: "Alle Mitarbeiter",
		subj: "AW: AW: AW: Toiletten im 3. Stock gesperrt",
		body: "System-Nachricht: Dieser E-Mail-Thread hat 400 neue Antworten.\n\nBetreffs enthalten: 'Klimawandel', 'Flache Erde', 'Tempolimit', 'Schnitzel-Verbot'.\n\nDer Mail-Server raucht. Niemand arbeitet mehr.",
		opts: [
			{ btn: "Popcorn holen.", r: "Die Firma brennt, aber du bist gut unterhalten.", m: 2, f: 15, a: -5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_phish_test_bonus",
		sender: "IT-Sec", 
		subj: "Phishing-Test: Bitte hier klicken für Bonus!",
		body: "Lieber Mitarbeiter. \n\nWir haben festgestellt, dass Ihr Gehalt zu niedrig ist. Um Ihren sofortigen Bonus von 5.000 EUR zu erhalten, geben Sie bitte Ihr Windows-Passwort und den Namen Ihres ersten Haustiers auf der folgenden Seite ein: \n[Change-MyPassword.ru]",
		opts: [
			{ btn: "Sofort klicken!", r: "TEST NICHT BESTANDEN! Ein rotes Fenster poppt auf: 'SIEHST DU NICHT, DASS DAS FAKE IST?!' Meldung an Chef ging raus.", m: 2, f: 0, a: 10, c: 20 },
			{ btn: "Als Phishing melden", r: "Vorbildlich. Die IT schickt dir einen Daumen-hoch-Smiley zurück.", m: 2, f: 0, a: 0, c: -5 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_kevin_noise",
		sender: "Azubi Kevin", 
		subj: "Hilfe!! Mein PC macht komische Geräusche",
		body: "Duuu? Mein PC macht so 'Krrrrtzzz Krrrrtzz' Geräusche und riecht komisch nach Strom. Ich hab mal fest dagegen getreten, jetzt raucht er ein bisschen. Ist das ein neues Feature? Soll ich Wasser drüberkippen?",
		opts: [
			{ btn: "Antwort: 'Lauf weg!'", r: "Kevin rennt schreiend raus.", m: 2, f: 5, a: 0, c: 5 },
			{ btn: "Hingehen", r: "Es war der Lüfter. Du hast es gefixt.", m: 5, f: -5, a: -5, c: -5 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_leak_1",
		sender: "Dr. Wichtig",
		subj: "WG: Kündigungswelle Q4 (VERTRAULICH)",
		body: "An: Vorstand\nCc: (Versehentlich) Alle Mitarbeiter\n\nMeine Herren, anbei die Liste der 50 Mitarbeiter, die wir nächsten Montag feuern. Bitte diskret behandeln.\n\n[Anhang: Liste_FINAL_v3.pdf]",
		opts: [
			{ btn: "Allen antworten: 'BIN ICH AUCH DRAUF?!'", r: "Du hast an den gesamten Verteiler geantwortet. Panik bricht aus.", m: 2, f: -10, a: 10, c: 5, nextEmail: "mail_leak_2" },
			{ btn: "️️🗑️ Löschen & Ignorieren", r: "Du tust so, als hättest du nichts gesehen. Dein Herz rast.", m: 2, f: 0, a: 5, c: -5 }
		]
	},
	{
		id: "mail_leak_2",
		linked: true,
		sender: "Dr. Wichtig",
		subj: "AW: WG: Kündigungswelle Q4 (VERTRAULICH)",
		body: "MÜLLER?! \n\nWie können Sie es wagen?! Das war ein Test! Um... die Loyalität zu prüfen! Kommen Sie SOFORT in mein Büro!\n\n(Das wird ein langes Gespräch...)",
		opts: [
			{ btn: "Ups...", r: "Der Chef brüllt dich 20 Minuten lang an.", m: 20, f: 0, a: 20, c: 10 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_chantal_affair_1",
		sender: "Chantal (Privat)",
		subj: "Re: Wochenende",
		body: "Hey Hasi 🐰, der Chef nervt so hart. Treffen wir uns in 5 Min im Archiv? Ich habe Kaffee und diese geilen Schoko-Cookies geschmuggelt. Niemand findet uns zwischen den Akten von 1990. 😘",
		opts: [
			{ btn: "Weiterleiten an: Dr. Wichtig", r: "Du leitest die Mail kommentarlos an den Chef weiter. Eiskalt.", m: 2, f: 0, a: -10, c: -20, nextEmail: "mail_chantal_boss_reply" },
			{ btn: "Antworten: 'Ich weiß alles. Schweigegeld?'", r: "Du nutzt ihr Missgeschick gnadenlos aus.", m: 2, f: 5, a: 0, c: 0, nextEmail: "mail_chantal_panic" },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_chantal_boss_reply",
		linked: true,
		sender: "Dr. Wichtig",
		subj: "AW: WG: Re: Wochenende",
		body: "Herr Müller,\n\nExzellente Wachsamkeit. Faulheit ist ein Geschwür in dieser Firma.\n\nIch habe Frau Chantal soeben 'zum Gespräch' gebeten. Nehmen Sie sich einen Keks aus ihrem Büro, solange sie weg ist.\n\nWeitermachen.",
		opts: [
			{ btn: "Der Keks schmeckt nach Verrat.", r: "Du fühlst dich sicher, aber einsam.", m: 2, f: 0, a: -5, c: -10 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_chantal_panic",
		linked: true,
		sender: "Chantal (Privat)",
		subj: "Re: Re: Wochenende",
		body: "OMG MÜLLER?! 😱😱😱\n\nBitte sag nix!! Das war für... äh... meine Oma! Wenn du die Klappe hältst, mach ich deine PowerPoint für morgen hübsch! Und du kriegst alle Cookies! DEAL?!",
		opts: [
			{ btn: "Deal.", r: "Chantal arbeitet jetzt für dich. Das Leben ist schön.", m: 2, f: 15, a: -5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_compliance_sitting",
		sender: "HR Compliance Bot", 
		subj: "DRINGEND: E-Learning 'Richtiges Sitzen' überfällig",
		body: "Sehr geehrter Mitarbeiter, unser System zeigt an, dass Sie das Pflichtmodul 'Ergonomie am Arbeitsplatz Teil 4b: Der perfekte 90-Grad-Winkel' noch nicht absolviert haben. Das Video dauert 45 Minuten und kann nicht übersprungen werden. Bitte erledigen Sie dies bis EOB, andernfalls wird Ihr Zugang gesperrt.",
		opts: [
			{ btn: "Video laufen lassen", r: "Du lässt das Video im Hintergrund laufen. Der Ton nervt, aber du bist compliant.", m: 5, f: 10, a: 5, c: -5 },
			{ btn: "Als 'Erledigt' markieren", r: "Du manipulierst die Datenbank. Risiko, aber spart Zeit.", m: 2, f: 0, a: -5, c: 5 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Die nächste Mahnung kommt bestimmt.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_replyall_cat",            
		sender: "Verteiler: ALLE (Re: Re: Re: Katze)", 
		subj: "AW: AW: AW: Wer vermisst 'Mimi'?",
		body: "BITTE NEHMEN SIE MICH AUS DIESEM VERTEILER!!!! ICH HABE KEINE KATZE!!! DAS IST EINE ARBEITSE-MAIL!!! (Vorherige Nachricht von Gabi: 'Oh wie süß, ist die flauschig!'). (Vorherige Nachricht von Klaus: 'Mimi ist wieder da, danke an alle!').",
		opts: [
			{ btn: "Reply-All: 'RUHE!'", r: "Du hast zur Eskalation beigetragen. Jetzt antworten 50 Leute 'Hör auf, an alle zu antworten!'. Der Mailserver raucht.", m: 2, f: 0, a: 20, c: 10 },
			{ btn: "Filter-Regel erstellen", r: "Du filterst 'Mimi' direkt in den Papierkorb. Himmlische Ruhe.", m: 5, f: -5, a: -10, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_chantal_wording",
		sender: "Chantal (Marketing)", 
		subj: "Wording Check - ASAP!!!",
		body: "Hiiii! 👋 Wir drucken gleich die Flyer für die Messe. Kannst du kurz drüberschauen? Da steht: 'Unsere Cloud-Lösung synergiert mit der Blockchain-KI, um das WLAN-Kabel zu optimieren.' Klingt das techy genug? Brauche das GO in 2 Minuten!!! 😘",
		opts: [
			{ btn: "Antwort: 'Perfekt!'", r: "Du hast den Unsinn durchgewunken. Die IT-Community wird uns auslachen, aber Chantal ist glücklich.", m: 2, f: 10, a: -5, c: 0 },
			{ btn: "Den Text korrigieren", r: "Du erklärst ihr mühsam, dass es keine WLAN-Kabel gibt. Sie versteht es nicht. 'Aber das klingt doch gut!'", m: 5, f: -10, a: 10, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_krause_fridge",
		sender: "Hausmeister Krause", 
		subj: "Kühlschrank Etage 3",
		body: "Moin. Ich habe im Kühlschrank eine Tupperdose gefunden, auf der steht 'Mittagessen 2019'. Der Inhalt hat mittlerweile Pelz und knurrt mich an, wenn ich das Licht anmache. Der Besitzer möge sich bitte mit einem Flammenwerfer bei mir melden, sonst entsorge ich das samt Kühlschrank.",
		opts: [
			{ btn: "Das ist meins!", r: "Du rettest dein... was auch immer das war. Es riecht übel.", m: 2, f: 0, a: 5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Nicht dein Problem. Soll es doch brennen.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_ceo_vision",
		sender: "Der CEO (Dr. Wichtig)", 
		subj: "Vision 2030 - Ihre Ideen!",
		body: "Liebes Team, ich hatte heute Nacht im Wellness-Retreat eine Vision. Wir müssen 'Agiler' werden. Ich möchte, dass jeder von Ihnen mir bis 12 Uhr ein 10-seitiges Konzept schickt, wie wir KI nutzen können, um Kaffee zu sparen. Denken Sie 'Out of the Box'! Go, Go, Go!",
		opts: [
			{ btn: "ChatGPT nutzen", r: "Du lässt eine KI das Bullshit-Konzept schreiben. Der Chef ist begeistert: 'Visionär!'", m: 5, f: 10, a: -5, c: -10 },
			{ btn: "Ehrlich antworten", r: "Du schreibst: 'Das ist Unsinn.' Der Chef merkt sich deinen Namen und war nicht begeistert.", m: 5, f: 0, a: 10, c: 20 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Hoffentlich vergisst er es wieder.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_wuttke_excel",
		sender: "H. Wuttke (Buchhaltung)", 
		subj: "HILFE! EXCEL IST ROT!",
		body: "Herr IT!!! Ich habe nichts gemacht, ehrlich! Ich wollte nur die Spalte G löschen und jetzt ist alles rot und blinkt! Die Bilanz muss in 10 Minuten raus! Wenn das weg ist, bin ich tot! Kommen Sie sofort her! Warum passiert das immer mir?!",
		opts: [
			{ btn: "Ticket verlangen", r: "Du schreibst zurück: 'Bitte Ticket aufmachen.' Eiskalt.", m: 2, f: 5, a: -5, c: 5 },
			{ btn: "Hingehen", r: "Er saß auf der 'Entf'-Taste. Problem gelöst in 2 Sekunden.", m: 5, f: -10, a: 10, c: -5 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_circle_mindfulness",
		sender: "Betriebsrat", 
		subj: "Einladung: Stuhlkreis 'Achtsamkeit'",
		body: "Liebe Kollegen, aufgrund des hohen Stresslevels bieten wir heute einen Stuhlkreis an. Wir werden gemeinsam atmen und unsere Namen tanzen. Es gibt vegane Dinkelkekse. Teilnahme ist freiwillig (aber wird notiert).",
		opts: [
			{ btn: "Hingehen", r: "Du hast 30 Minuten geatmet und die paar Kekse waren trocken.", m: 30, f: 20, a: -10, c: 5 },
			{ btn: "Als Spam markieren", r: "Weg damit. Ich habe echte Arbeit.", m: 2, f: 0, a: 5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_phish_1",
		sender: "Sicherheits-Dienst",
		subj: "Dringend: Ihr Passwort läuft ab!",
		body: "Hallo User,\n\nihr Passwort ist zu alt. Klicken Sie HIER um es zu ändern und erhalten Sie 500€ Amazon-Gutschein als Belohnung!\n\nLink: http://bit.ly/hacker-klaus",
		opts: [
			{ btn: "Link anklicken", r: "Du klickst auf den Link. Ein rotes Fenster öffnet sich.", m: 2, f: 5, a: 0, c: 0, nextEmail: "mail_phish_2" },
			{ btn: "Als Phishing melden", r: "Gut gemacht. IT-Sec ist stolz.", m: 2, f: 0, a: -5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_phish_2",
		linked: true,
		sender: "IT-Security Bot",
		subj: "ALERT: SIE HABEN VERSAGT",
		body: "Dies war ein interner Sicherheitstest.\nSie sind durchgefallen.\n\nKonsequenz: Ihr Internet-Zugang wurde auf 'Modem-Geschwindigkeit' gedrosselt, bis Sie die Schulung 'Maus-Bedienung für Anfänger' absolviert haben.",
		opts: [
			{ btn: "Verdammt.", r: "Alles lädt jetzt super langsam. Deine Aggro steigt.", m: 2, f: -5, a: 10, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_erna_virus",
		sender: "Tante Erna (Privat)", 
		subj: "FWD: FWD: FWD: Lustig!!!!",
		body: "Schau mal Junge, das musst du sehen! 😂😂😂 Die Katze fällt vom Stuhl! Ich habe mich so weggeschmissen! Zeig das mal deinen Kollegen! LG Tante Erna. PS: Wie geht das Internet an? (Anhang: lustig.ppt.exe - 50MB)",
		opts: [
			{ btn: "Anhang öffnen", r: "VIRUS-ALARM! Es war Malware. Der Scanner schreit. Du musst den PC bereinigen.", m: 10, f: -20, a: 20, c: 20 },
			{ btn: "Nett antworten und lügen", r: "Du lügst: 'Haha, sehr lustig Tante Erna.'", m: 2, f: 0, a: -5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_scam_package",
		sender: "Unbekannt", 
		subj: "Ihr Paket konnte nicht zugestellt werden",
		body: "Hallo Kunde. Ihr Paket liegt im Zoll. Bitte überweisen Sie 2,50€ Gebühr über diesen Link, sonst verbrennen wir ihr Paket. Link: www.totally-legit-dhl-scam.ru",
		opts: [
			{ btn: "Webseite öffnen", r: "Phishing-Seite! Du hast fast deine Daten eingegeben. IT-Sec hat es gemerkt.", m: 2, f: 0, a: 10, c: 15 },
			{ btn: "Als Spam markieren", r: "Netter Versuch.", m: 2, f: 0, a: 0, c: 0 },
			{ btn: "Antworten: 'Behaltet es'", r: "Die Mail kam zurück (Mail Delivery Failure).", m: 2, f: 0, a: 5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_wuttke_1",
		sender: "H. Wuttke (Buchhaltung)",
		subj: "(Kein Betreff)",
		body: "Gulasch Rezept einfach schnell ohne Paprika",
		opts: [
			{ btn: "Antworten: 'Horst, das ist Outlook.'", r: "Du klärst ihn auf. Hoffentlich versteht er es.", m: 2, f: 0, a: 5, c: 0, nextEmail: "mail_wuttke_ai" },
			{ btn: "Weiterleiten an: Dr. Wichtig", r: "Eiskalt. Du meldest die private Nutzung sofort.", m: 2, f: 0, a: -5, c: -10, nextEmail: "mail_wuttke_boss" },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_wuttke_ai",
		linked: true,
		sender: "H. Wuttke (Buchhaltung)",
		subj: "AW: (Kein Betreff)",
		body: "Danke Outlook.\n\nBestell bitte auch 2 Becher Sahne und Nudeln. Aber nicht die Spiralnudeln, die mag meine Frau nicht.\n\nSenden.",
		opts: [
			{ btn: "Du willst es nicht verstehen, oder?.", r: "Du starrst auf den Bildschirm. Gegen diese Dummheit gibt es keinen Patch.", m: 2, f: 5, a: 10, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{
		id: "mail_wuttke_boss",
		linked: true,
		sender: "Dr. Wichtig",
		subj: "WG: (Kein Betreff)",
		body: "Müller,\n\ndanke für die Weiterleitung.\n\nSagen Sie Wuttke, er soll Paprika reinmachen, sonst schmeckt das nicht. Und wenn er schon kocht, soll er mir eine Portion in den 4. Stock bringen.\n\n(Sie kriegen nichts, Verräter mag niemand.)",
		opts: [
			{ btn: "Na toll..", r: "Der Chef kriegt Gulasch, Wuttke kriegt Lob, du kriegst gar nichts.", m: 2, f: 0, a: 15, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_sabine_tupper",
		sender: "Sabine (Empfang)", 
		subj: "WER HAT MEINE TUPPERDOSE?!",
		body: "Das ist jetzt das dritte Mal! Meine rote Dose mit dem Aufkleber 'SABINE' ist weg! Ich durchsuche jetzt alle Schreibtische! Wenn ich sie finde, gnade euch Gott! Ich rufe die Polizei!",
		opts: [
			{ btn: "Reply-All: 'Chill mal'", r: "Fehler! Sabine rastet aus. Sie wirft einen Tacker durchs Büro. Du musst dich unter dem Tisch verstecken.", m: 2, f: 0, a: 20, c: 10 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Nicht dein Problem. Sollen sie sich doch prügeln.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_alert_login",
		sender: "SYSTEM ALERT (Automated)", 
		subj: "CRITICAL: Suspicious Login (CEO Account)",
		body: "Detected Login attempt for user 'CEO' from IP Address: 192.168.x.x (Location: Pyongyang, North Korea). Success: TRUE. \nAction required immediately!",
		opts: [
			{ btn: "Account sofort sperren", r: "Du hast den CEO mitten in einer Videokonferenz rausgeworfen. Er ist sauer, aber du hast die Firma vor Nordkorea gerettet. Held!", m: 5, f: -10, a: 0, c: -20 },
			{ btn: "Als VPN-Fehler abtun", r: "Es war kein VPN. Alle Firmendaten sind jetzt im Darknet. Der Aktienkurs fällt schlagartig auf 0.", m: 2, f: 0, a: 50, c: 100 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_juergen_admin",
		sender: "Jürgen (Vertrieb)", 
		subj: "Brauche Admin-Rechte GANZ SCHNELL",
		body: "Ich muss dieses PDF für den Kunden umwandeln. Hab da so ein Tool gefunden 'Free_PDF_Converter_Pro_Cracked.exe'. Windows meckert rum wegen Virus, aber das ist Fehlalarm. Gib mal Passwort, Kunde wartet!!!",
		opts: [
			{ btn: "Einfach das Passwort eingeben", r: "ZACK. Ransomware. Alles verschlüsselt. Ein Totenkopf lacht auf deinem Monitor. Das war wohl kein Fehlalarm.", m: 2, f: 0, a: 30, c: 50 },
			{ btn: "Hingehen & 'Nein' sagen", r: "Du erklärst ihm Sicherheit. Er hört zwar nicht zu, aber du hast die Installation verhindert.", m: 5, f: -10, a: 10, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_yoga_laugh",
		sender: "HR Feel Good Management", 
		subj: "PFLICHT-TEILNAHME: Die 'Lach-Yoga' Pause",
		body: "Um die Moral zu heben, treffen wir uns alle im Flur zum synchronen Lachen! 'Hahaha hihihi'! Wer nicht lacht, kriegt einen Eintrag in die Akte wegen negativer Einstellung! 😊😊😊",
		opts: [
			{ btn: "Hingehen & mitmachen", r: "Du stehst im Flur und machst 'Hahaha'. Du stirbst innerlich, aber HR ist zufrieden.", m: 10, f: 10, a: 20, c: -5 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Du arbeitest weiter. Später fragt HR, warum du so negativ bist.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_chantal_mac",
		sender: "Chantal (Marketing)", 
		subj: "Mein Mac ist zu laaangsam!!! 😭",
		body: "Ich kann so nicht arbeiten! Wenn ich Spotify, Photoshop, 50 Chrome-Tabs und Sims 4 gleichzeitig offen habe, ruckelt die Maus! Ich brauche das neue MacBook Pro M3 Max mit 96GB RAM! SOFORT! Sonst sag ich's dem CEO!",
		opts: [
			{ btn: "Einfach bestellen", r: "Du hast 5000€ Budget verbrannt. Chantal nutzt die Rechenpower nun für Instagram-Filter. Der Finanz-Chef hasst dich.", m: 5, f: 10, a: -10, c: 20 },
			{ btn: "Task-Manager aufräumen", r: "Du schließt 'Sims 4' und 48 Chrome-Tabs. PC läuft wieder flüssig. Chantal schmollt.", m: 5, f: -5, a: 5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_legal_warning",
		sender: "Kanzlei Abmahn & Söhne", 
		subj: "ABMAHNUNG: Urheberrechtsverletzung",
		body: "Sehr geehrte Damen und Herren, über Ihren Anschluss wurde gestern der Film 'Barbie vs. Oppenheimer' illegal getauscht. Wir fordern 900€ oder wir verklagen Sie auf Millionen.",
		opts: [
			{ btn: "Die Logs prüfen", r: "Es war der Azubi Kevin. Du lässt ihn die 900€ vom Taschengeld zahlen. Lektion gelernt.", m: 10, f: -10, a: 0, c: -5 },
			{ btn: "Sofort alle Spuren löschen", r: "Du löscht die Beweise. Jetzt haftet die Firma, weil kein Täter ermittelt werden kann. Der Chef muss zahlen und tobt.", m: 5, f: 0, a: 10, c: 30 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_heating_war",
		sender: "Alle (Verteiler)", 
		subj: "HEIZUNG AUF 5!!!",
		body: "Mir ist kalt! Ich habe die Heizung jetzt auf 5 gedreht und den Knauf abgebrochen, damit es so bleibt! Wer das Fenster aufmacht, fängt sich eine! LG, Frau Frost (aus der Buchhaltung)",
		opts: [
			{ btn: "Fenster heimlich öffnen", r: "Du sorgst für Frischluft. Frau Frost niest und wirft dir böse Blicke zu.", m: 5, f: 5, a: 5, c: 0 },
			{ btn: "In Badehose arbeiten", r: "Es sind 35 Grad im Büro. Du schwitzt. Die Produktivität liegt bei Null.", m: 2, f: 10, a: 10, c: 5 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_chain_letter",
		sender: "Bernd (Vertrieb)", 
		subj: "FWD: FWD: Unbedingt lesen sonst Unglück!!!",
		body: "Das ist der Geist des toten Servers! 👻 Schicke diese Mail an 10 Kollegen, oder dein WLAN wird für immer langsam sein! Ignorier das nicht, meinem Cousin ist das passiert!!!",
		opts: [
			{ btn: "An Alle weiterleiten", r: "Du hast den Mailserver lahmgelegt. 500 Leute hassen dich jetzt.", m: 2, f: 0, a: 20, c: 20 },
			{ btn: "Bernd sperren", r: "Bernd landet auf der Blacklist. Endlich Ruhe.", m: 2, f: 0, a: -5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_bonus_fail",
		sender: "Der Vorstand", 
		subj: "WICHTIG: Ihr diesjähriger Bonus",
		body: "Liebe Mitarbeiter, aufgrund des Rekordumsatzes haben wir beschlossen, Ihnen etwas zurückzugeben! Statt einer langweiligen Geldprämie erhält jeder von Ihnen... einen Gutschein für 5% Rabatt in der Kantine (gültig nur Montags)! Danke für Ihren Einsatz!",
		opts: [
			{ btn: "Mail ausdrucken & verbrennen", r: "Das kleine Feuer im Mülleimer wärmt dein kaltes Herz. Deine Aggro sinkt leicht.", m: 5, f: 5, a: -5, c: 0 },
			{ btn: "Dankesmail schreiben", r: "Du schleimst dich ein. Die Kollegen nennen dich 'Verräter', aber der Chef merkt es sich positiv.", m: 2, f: 0, a: 10, c: -10 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_phish_iphone",
		sender: "Amaz0n-Gewinnspiel-Official", 
		subj: "HERZLICHEN GLÜCKWUNSCH! iPhone 15 gewonnnen!!!",
		body: "Hallo Kunde. Du wurdest ausgewählt! Klicke HIER um dein iPhone 15 Pro Max (Titan) sofort zu erhalten! Nur noch 5 Minuten gültig! 📱🎁",
		opts: [
			{ btn: "KLICKEN! Her damit!", r: "Ein Fenster poppt auf: 'DIES WAR EIN PHISHING-TEST DER IT! SIE SIND DURCHGEFALLEN!' Du musst jetzt ein 20 Minuten langes Security-Video gucken. Dein Tag ist gelaufen.", m: 20, f: -10, a: 50, c: 20 },
			{ btn: "Als Phishing melden", r: "Die IT antwortet: 'Gut gemacht, Müller. Sie haben als einziger nicht geklickt.' Ein Fleißsternchen im System.", m: 2, f: 0, a: -5, c: -10 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_cleaner_fridge",
		sender: "Reinigungs-Team", 
		subj: "Kühlschrank Ebene 3 (DRINGEND)",
		body: "Wir weigern uns, den Kühlschrank im 3. Stock zu öffnen. Da drin ist eine Tupperdose, die... atmet. Es wachsen bereits Pilze aus der Dichtung. Wer das bis 12 Uhr nicht entfernt, rufen wir den Kammerjäger (auf Kosten der Abteilung)!",
		opts: [
			{ btn: "Mutig entsorgen", r: "Du öffnest die Dose. Der Gestank ist so bestialisch, dass du dich fast übergeben musst. Du bist für den Rest des Tages grün im Gesicht. Aber die Gefahr ist gebannt.", m: 5, f: -5, a: 20, c: 0 },
			{ btn: "Kühlschranktür versiegeln", r: "Du klebst die Tür einfach zu und schreibst 'DEFEKT' drauf. Problem für die Ewigkeit konserviert.", m: 5, f: 5, a: -5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Nicht dein Essen, nicht dein Pilz.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_thought_parking",
		sender: "Du (Gedanken)", 
		subj: "Falschparker auf Parkplatz 42",
		body: "Du schaust aus dem Fenster. Ein fetter, neuer Porsche SUV steht quer auf DEINEM Parkplatz! Dreistigkeit siegt?!",
		opts: [
			{ btn: "Abschleppdienst rufen!", r: "Der Abschlepper kommt und zieht den Porsche weg. Du fühlst Genugtuung. 10 Min später brüllt der CEO: 'WER HAT MEINEN LEIHWAGEN ABSCHLEPPEN LASSEN?!' Oh Mist...", m: 10, f: 0, a: 50, c: 80 },
			{ btn: "Scheibenwischer hochklappen", r: "Ein kleiner, passiv-aggressiver Racheakt. Fühlt sich gut an und keiner hat's gesehen.", m: 5, f: 0, a: -10, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_chantal_printername",
		sender: "Chantal (Marketing)", 
		subj: "Brainstorming: Name für den Drucker 🖨️✨",
		body: "Heeey Team! Wir wollen den Druckern 'Persönlichkeit' geben! Bitte kommt alle in den Meetingraum 'Unicorn' und bringt Ideen mit! Es gibt vegane Kekse (aus Sägemehl)!",
		opts: [
			{ btn: "Hingehen & 'Drucki McDruckface' vorschlagen", r: "Alle starren dich an. Chantal findet es 'uninspiriert'. Du hast 15 Minuten Lebenszeit verschwendet.", m: 15, f: 10, a: 15, c: 0 },
			{ btn: "Antworten: 'Papierstau-Paulus'", r: "Deine E-Mail wird ignoriert, aber du musstest wenigstens nicht aufstehen.", m: 2, f: 5, a: -5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_gdpr_request",
		sender: "Ehemaliger Mitarbeiter (via Anwalt)", 
		subj: "DSGVO Auskunft Art. 15",
		body: "Hiermit fordere ich Sie auf, mir binnen Frist ALLE Daten zu senden, die Sie über mich gespeichert haben. Auch Chat-Logs und interne Notizen!",
		opts: [
			{ btn: "Alles senden (inkl. Chat-Logs)", r: "Du schickst ihm wirklich alles. Auch die Logs, wo der Chef ihn 'Niete' nennt. Er verklagt die Firma wegen Mobbing. Der Chef tobt.", m: 10, f: -10, a: 20, c: 60 },
			{ btn: "Standard-Textbaustein senden", r: "Du schickst ein nichtssagendes PDF: 'Wir haben leider keine relevanten Daten mehr'. Er gibt Ruhe. Bürokratie besiegt.", m: 2, f: 5, a: -5, c: -5 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_xmas_vote",
		sender: "Betriebsrat (Umfrage)", 
		subj: "Weihnachtsfeier: Bowling oder Oper?",
		body: "Liebe Kollegen, für die diesjährige Feier haben wir zwei Optionen: \n1. 'Cosmic Bowling' (mit Schwarzlicht und Dosenbier) \n2. 'Die Zauberflöte' (3,5 Stunden, Anzugpflicht). \nBitte abstimmen!",
		opts: [
			{ btn: "Team 'Bowling'", r: "Du stimmst für Bowling. Die IT jubelt. Chantal ist entsetzt ('Meine Schuhe!'). Stimmung +1.", m: 2, f: 5, a: -5, c: 0 },
			{ btn: "Team 'Oper'", r: "Du stimmst für Kultur. Niemand mag dich mehr. Kevin nennt dich 'Streber'.", m: 2, f: 0, a: 5, c: 5 },
			{ btn: "Reply-All: 'Saufen!'", r: "Egon antwortet: 'Mein Mann!'. Der Chef mahnt dich ab wegen 'unprofessioneller Kommunikation'.", m: 2, f: 0, a: 10, c: 15 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Dir egal. Hauptsache es gibt Essen.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_egon_ball",
		sender: "Hausmeister Egon", 
		subj: "Fundsache: Roter Ball",
		body: "Moin. Hab beim Fegen so nen roten Knet-Ball gefunden. Klebt unterm Heizkörper im Flur. Vermisst den wer? Wenn nicht, kriegt ihn mein Dackel.",
		opts: [
			{ btn: "Antwort: 'MEINER! Ich hol ihn ab!'", loot: "stressball", r: "Du rennst schnell runter zu Egon, bevor der Hund zuschnappt. Der Ball ist voller Staub, aber noch gut.", m: 5, f: 0, a: -5, c: 0, },
			{ btn: "Antwort: 'Gönn ihn dem Dackel'", r: "Egon freut sich: 'Der Waldi dankt!'. Du hast ein gutes Werk getan. Der Dackel liebt dich jetzt.", m: 2, f: 5, a: 0, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Der Ball verschwindet im Dackel. Chance vertan.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_vacation_denied",
		sender: "HR (Automated)", 
		subj: "Ihr Urlaubsantrag 2028",
		body: "Status-Update zu Ihrem Antrag 'Sommerurlaub': ABGELEHNT. \nBegründung: 'Zu dieser Zeit könnte theoretisch ein Server ausfallen. Wir brauchen Sie stand-by.'",
		opts: [
			{ btn: "Widerspruch einlegen", r: "Du schreibst eine zweiseitige Mail mit Gesetzes-Auszügen. HR antwortet nicht, aber du fühlst dich im Recht.", m: 15, f: -10, a: 20, c: 10 },
			{ btn: "Krankenschein planen", r: "Wenn du nicht frei kriegst, bist du halt 'krank'. Du grinst böse und planst deinen 'Husten'.", m: 5, f: 10, a: -10, c: 0 },
			{ btn: "Stillschweigend hinnehmen", r: "Du starrst die Wand an. Die Wand starrt zurück. Deine Seele stirbt ein wenig.", m: 2, f: 0, a: 10, c: -5, },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_chantal_cat",
		sender: "Chantal (Marketing)", 
		subj: "Katzen-Content für die Website? 😻",
		body: "Heeeey! Ich habe meine Katze 'Prinzessin' als Firmen-Maskottchen fotografiert! Sie sitzt auf einem Server im Rack! Ist das nicht cute?! Soll ich das live stellen?",
		opts: [
			{ btn: "NEIN! Statische Aufladung!", r: "Du rennst hin. Katze weg, aber Server voller Haare. Chantal schmollt: 'Du hasst Tiere!'", m: 5, f: 0, a: 10, c: 0 },
			{ btn: "Antwort: 'Klar, sieht super aus!'", r: "Das Bild geht viral. 'Firma setzt auf Cat-Content'. Kunden finden es unprofessionell, aber der Traffic steigt massiv. Der Chef ist verwirrt.", m: 2, f: 10, a: -5, c: 20 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Sie lädt es einfach hoch. Der Server überhitzt kurz darauf wegen Katzenhaaren im Lüfter. Du musst es später fixen.", m: 2, f: 0, a: 0, c: 20, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_ticket_rating",
		sender: "IT-Support (Ticket-Bot)", 
		subj: "Bitte bewerten Sie Ihre Lösung",
		body: "Sie haben das Ticket 'PC brennt' geschlossen. Wie zufrieden waren Sie mit Ihrer eigenen Leistung? \n(Stern 1-5)",
		opts: [
			{ btn: "Mir selbst 5 Sterne geben", r: "Du klopfst dir selbst auf die Schulter. 'Guter Mann, dieser Müller.' Das System speichert: 'Exzellenter Mitarbeiter'.", m: 2, f: 5, a: -5, c: 0 },
			{ btn: "Mir selbst 1 Stern geben", r: "Du bist ehrlich zu dir selbst. Das war ziemlicher Pfusch. Aber immerhin brennt es nicht mehr.", m: 2, f: 0, a: 5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_ceo_blockchain",
		sender: "Dr. Wichtig (CEO)", 
		subj: "Idee: Blockchain-Kaffeemaschine",
		body: "Müller! Ich habe gelesen, Blockchain ist die Zukunft. Bauen Sie das in die Kaffeemaschine ein! Jeder Espresso soll als NFT gemintet werden! Deadline: Morgen!",
		opts: [
			{ btn: "Antwort: 'Das ist technisch unmöglich'", r: "Er nennt dich enttäuscht eine 'Innovationsbremse'. Dein Radar steigt, weil du 'keine Visionen hast'.",  m: 2, f: 0, a: 10, c: 10 },
			{ btn: "Antwort: 'Geniale Idee, wird umgesetzt!'", r: "Du klebst einfach einen Sticker 'Blockchain Certified' auf den Wassertank. Er merkt den Unterschied nicht, findet den Kaffee aber plötzlich 'dezentraler'.", m: 2, f: 10, a: 0, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Du tust so, als hättest du die Mail nie bekommen. Riskant. Wenn er morgen nachfragt, hast du ein echtes Problem.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
	{ 
		id: "mail_canteen_menu",
		sender: "Kantine (Newsletter)", 
		subj: "Speiseplan: 'Woche der Experimente'",
		body: "Mo: Grünkohl mit Nutella \nDi: Pizza 'Hawaii' (nur Ananas, kein Schinken) \nMi: Überraschungseintopf (Reste von Mo+Di) \nDo: Schnitzel (vegan, aus Pappe) \nFr: Fischstäbchen-Auflauf",
		opts: [
			{ btn: "Ausdrucken & Warnen", r: "Du hängst den Plan als Warnung im Flur auf. Du hast Leben gerettet.", m: 2, f: 0, a: 5, c: 0,  },
			{ btn: "Fastenwoche planen", r: "Du beschließt, diese Woche nichts zu essen. Dein Magen knurrt alleine an diesem Gedanken.", m: 2, f: 0, a: 5, c: 0 },
			{ btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
		]
	},
    {
        id: "mail_yogurt_1",
        sender: "Sandra (Buchhaltung)",
        subj: "WER WAR DAS?!",
        body: "In meinem Joghurt ('Der Große Bauer', Erdbeer) steckt ein Löffel. Er ist halb leer. Wer macht sowas?! Ich rufe gleich die Polizei!",
        opts: [
            { btn: "Geständnis: 'Ich hatte Unterzucker.'", r: "Sandra schreit durch den Flur. Aber sie schätzt die Ehrlichkeit.", m: 2, f: 0, a: 5, c: 0, nextEmail: "mail_yogurt_2" },
            { btn: "Lüge: 'Das war der Putzmann.'", r: "Du schiebst es auf Unschuldige. Dein Radar steigt.", m: 2, f: 0, a: -5, c: 10 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_yogurt_2",
        linked: true,
        sender: "Sandra (Buchhaltung)",
        subj: "Re: WER WAR DAS?!",
        body: "Unterzucker?! Das war mein Mittagessen! Du schuldest mir einen Döner. Mit Schafskäse. Sofort.",
        opts: [
            { btn: "Einen Döner anbieten", r: "Du wirst ihr in der nächsten Mittagspause einen Döner kaufen müssen. Frieden ist teuer.", m: 2, f: -5, a: -10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_noise_1",
        sender: "Kollege Bernd",
        subj: "Deine Musik...",
        body: "Moin, wir hören alle deinen 'Death Metal'-Mix durch die Kopfhörer. Könntest du das leiser machen? Meine Pflanzen gehen schon ein.",
        opts: [
            { btn: "Die Musik leiser machen", r: "Du bist rücksichtsvoll. Langweilig, aber nett.", m: 2, f: 0, a: -5, c: 0 },
            { btn: "Die Musik Lauter drehen", r: "Jetzt hören sie es wenigstens in guter Qualität.", m: 2, f: 5, a: 0, c: 5, nextEmail: "mail_noise_2" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_noise_2",
        linked: true,
        sender: "Kollege Bernd",
        subj: "Re: Deine Musik...",
        body: "Okay, das reicht. Ich habe gerade dein LAN-Kabel durchgeschnitten. Genieße die Stille.",
        opts: [
            { btn: "Mist.", r: "Kein Internet. Du musst so tun als würde es dich nicht stören.", m: 2, f: -5, a: 10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_bet_1",
        sender: "Kevin (Privat)",
        subj: "Wettbüro eröffnet! 💰",
        body: "Hey Chef, wir wetten gerade, wann der neue Projektleiter seinen ersten Nervenzusammenbruch hat. Einsatz: 5€. Machst du mit?",
        opts: [
            { btn: "Ich setze auf 'Heute'", r: "Du bist dabei. Risiko!", m: 2, f: 5, a: 0, c: 5, nextEmail: "mail_bet_win" },
            { btn: "Ich setze auf 'Niemals'", r: "Optimist. Du verlierst sofort.", m: 2, f: 0, a: 0, c: -5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_bet_win",
        linked: true,
        sender: "Kevin (Privat)",
        subj: "GEWONNEN!",
        body: "Alter! Er hat gerade im Meeting geweint, weil der Beamer nicht ging! Du hast den Pott gewonnen! Hier sind 20€ (in Kantinen-Gutscheinen).",
        opts: [
            { btn: "Das war leichter als gedacht.", r: "Du fühlst dich wie ein Orakel.", m: 2, f: 5, a: -5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_plant_1",
        sender: "Gabi (Empfang)",
        subj: "Mein Bonsai 🌳",
        body: "Hat jemand meinen Bonsai gegossen? Er sieht so... braun aus. Und er riecht nach Kaffee.",
        opts: [
            { btn: "Ich wollte nur helfen!", r: "Kaffee ist doch Dünger, oder?", m: 2, f: 0, a: 0, c: 5, nextEmail: "mail_plant_2" },
            { btn: "Ich war's nicht.", r: "Lüge. Dein Becher steht noch daneben.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_plant_2",
        linked: true,
        sender: "Gabi (Empfang)",
        subj: "Re: Mein Bonsai 🌳",
        body: "Du hast ihn umgebracht! Das war ein Erbstück! Er war 40 Jahre alt! Du Monster!",
        opts: [
            { btn: "Ups.", r: "Gabi spricht nicht mehr mit dir. Endlich Ruhe am Empfang. Hoffentlich für eine Weile", m: 2, f: 5, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_cc_fail_1",
        sender: "Vertriebsleiter Markus",
        subj: "Q3 Strategie (Top Secret)",
        body: "Hallo Team, hier ist der Plan, wie wir die Kunden über den Tisch ziehen. Bitte NICHT weiterleiten!",
        opts: [
            { btn: "Reply All: 'Klingt illegal.'", r: "Du hast das an alle Kunden im CC geschickt...", m: 2, f: 0, a: 20, c: 20, nextEmail: "mail_cc_fail_2" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 5, ignoreEmail: true }
        ]
    },
    {
        id: "mail_cc_fail_2",
        linked: true,
        sender: "Rechtsabteilung",
        subj: "SOFORTIGE VORLADUNG",
        body: "Herr Müller, erscheinen Sie sofort im Büro. Bringen Sie Ihren Anwalt mit. Und einen Karton für Ihre Sachen.",
        opts: [
            { btn: "War schön mit euch.", r: "Maximaler Stress.", m: 5, f: -20, a: 30, c: 40 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_survey_1",
        sender: "HR Survey Bot",
        subj: "Mitarbeiterzufriedenheit",
        body: "Wie glücklich sind Sie auf einer Skala von 1 (Sehr) bis 10 (Extrem)?",
        opts: [
            { btn: "Ich bin der glücklickste Mitarbeiter hier. 10!", r: "Du lügst das System an. Der Bot freut sich.", f: 5, a: -5, c: 0, nextEmail: "mail_survey_2" },
            { btn: "Ich warte immer noch auf den Termin des Betriebs-Therapeuten. 1!", r: "Fehler: Wert nicht zulässig.", f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_survey_2",
        linked: true,
        sender: "HR Survey Bot",
        subj: "Danke!",
        body: "Toll! Da Sie so glücklich sind, haben wir Ihre Gehaltserhöhung gestrichen. Glückliche Mitarbeiter brauchen kein Geld!",
        opts: [
            { btn: "Ich hasse euch.", r: "Ironie des Schicksals.", m: 2, f: 0, a: 15, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_coffee_1",
        sender: "Küche",
        subj: "Kaffeemaschine DEFEKT",
        body: "Jemand hat Milch in den Wassertank gefüllt. Die Maschine macht jetzt Käse.",
        opts: [
            { btn: "Ich repariere das.", r: "Du opferst dich für das Team.", m: 10, f: -10, a: -10, c: 0, nextEmail: "mail_coffee_2" },
            { btn: "Ich trinke Tee.", r: "Du Monster.", m: 2, f: 5, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_coffee_2",
        linked: true,
        sender: "Alle Kollegen",
        subj: "DANKE!!",
        body: "Du bist unser Held! Der Kaffee fließt wieder! Wir würden dir ein Denkmal bauen, haben aber kein Budget.",
        opts: [
            { btn: "Gern geschehen.", r: "Du fühlst dich gebraucht. Du fühlst dich für den Moment besser.", m: 2, f: 0, a: -20, c: -10 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_lottery_1",
        sender: "Tippgemeinschaft",
        subj: "Jackpot 90 Millionen!",
        body: "Wir sammeln für den Eurojackpot. 10€ Einsatz. Wenn wir gewinnen, kündigen wir alle!",
        opts: [
            { btn: "Bin dabei! (10€)", r: "Die Hoffnung stirbt zuletzt.", m: 2, f: 5, a: 0, c: 0, nextEmail: "mail_lottery_2" },
            { btn: "Glücksspiel ist Sünde.", r: "Du sparst Geld und Spaß.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_lottery_2",
        linked: true,
        sender: "Tippgemeinschaft",
        subj: "Ergebnis...",
        body: "Wir haben gewonnen! ... 12,50€. Jeder bekommt 40 Cent zurück. Wir bleiben wohl doch hier. Arbeitet weiter.",
        opts: [
            { btn: "Na toll.", r: "Die Realität kickt rein.", m: 2, f: -5, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_borrow_1",
        sender: "Chantal",
        subj: "Tacker ausgeliehen",
        body: "Hii, hab mir kurz deinen Tacker geborgt. Meiner ist... irgendwie explodiert. Bringe ihn gleich zurück!",
        opts: [
            { btn: "Das war gestern!", r: "Du forderst dein Eigentum zurück.", m: 2, f: 0, a: 5, c: 0, nextEmail: "mail_borrow_2" },
            { btn: "Behalt ihn.", r: "Du hast eh nichts zu tackern und das Ding noch nie verwendet.", m: 2, f: 5, a: 0, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_borrow_2",
        linked: true,
        sender: "Chantal",
        subj: "Re: Tacker ausgeliehen",
        body: "Ups... 😬 Er ist mir ins Klo gefallen. Sorryyy! Ich kauf dir einen neuen! (Irgendwann)",
        opts: [
            { btn: "Atmen...", r: "Deine Aggro steigt leicht. Chantal ist dein Erzfeind.", m: 2, f: 0, a: 10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_cleaner_1",
        sender: "Olga (Reinigung)",
        subj: "Stecker gezogen",
        body: "Hallo, ich musste Staubsaugen. Habe den Stecker von dem lauten Kasten mit den vielen Lichtern gezogen. Ist jetzt schön leise. Hoffe okay?",
        opts: [
            { btn: "Lauf zum Serverraum!", r: "Panik! Das war der Hauptserver!", m: 5, f: -10, a: 20, c: 10, nextEmail: "mail_cleaner_2" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Wahrscheinlich war es nur die Kaffeemaschine.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_cleaner_2",
        linked: true,
        sender: "System Alert",
        subj: "CRITICAL FAILURE",
        body: "Server 'BACKUP_MASTER' nicht erreichbar. Uptime: 0 Sekunden. Datenverlust droht.",
        opts: [
            { btn: "Weinen.", r: "Der Tag ist gelaufen. Olga hat die Firma gelöscht.", m: 5, f: -20, a: 20, c: 20 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_ceo_scam_1",
        sender: "Dr. Wlchtig (CEO)",
        subj: "Dringende Überweisung",
        body: "Hallo Herr Müller, ich sitze in einem geheimen Meeting. Bitte kaufen Sie sofort 10x 100€ Apple Gift Cards und schicken Sie mir die Codes. Sagen Sie niemandem etwas!",
        opts: [
            { btn: "Alles klar, Chef! Die Codes kommen gleich", r: "Du fällst auf den ältesten Trick rein.", m: 5, f: 0, a: 5, c: 5, nextEmail: "mail_ceo_scam_fail" },
            { btn: "Antwort: 'Netter Versuch.'", r: "Du hast den Betrüger durchschaut.", m: 2, f: 0, a: -5, c: 0, nextEmail: "mail_ceo_scam_win" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_ceo_scam_fail",
        linked: true,
        sender: "Dr. Wichtig",
        subj: "FWD: Dringende Überweisung",
        body: "Warum bucht die Buchhaltung 1000€ von Ihrer Kostenstelle ab?! Kommen Sie in mein Büro. Sofort.",
        opts: [
            { btn: "Oh nein.", r: "Das wird teuer für dich.", m: 2, f: 0, a: 20, c: 20 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_ceo_scam_win",
        linked: true,
        sender: "Dr. Wlchtig (CEO)",
        subj: "Re: Dringende Überweisung",
        body: "F*** dich du kleiner IT-Nerd! Ich finde dich!",
        opts: [
            { btn: "Zufrieden lächeln und Daumen Hoch antworten.", r: "Ein Sieg für die Intelligenz.", m: 2, f: 5, a: -5, c: -5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_meeting_1",
        sender: "Agile Coach Torben",
        subj: "Meeting: 'Feel Good Management'",
        body: "Einladung: Wir wollen 20 Minuten lang über unsere Gefühle tanzen. Anwesenheitspflicht für alle!",
        opts: [
            { btn: "Teilnehmen", r: "Du tanzt deinen Namen. Es ist erniedrigend, aber entspannend. Der Chef sucht dich währenddessen", m: 20, f: 20, a: -10, c: 20, nextEmail: "mail_meeting_2" },
            { btn: "Absagen: 'Server brennt'", r: "Du drückst dich vor der Arbeit.", m: 2, f: 0, a: 0, c: 5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_meeting_2",
        linked: true,
        sender: "Agile Coach Torben",
        subj: "Feedback Runde",
        body: "Toll, wie du dich geöffnet hast! Deine Aura war sehr... grau. Wir müssen an deinem Chakra arbeiten.",
        opts: [
            { btn: "Lass mich in Ruhe.", r: "Nie wieder.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_video_1",
        sender: "Verteiler: Alle",
        subj: "FWD: FWD: Lustiges Video!! 😂",
        body: "Schaut euch das an! Die Katze fällt vom Tisch! (Anhang: lustig.mp4 - 450 MB)",
        opts: [
            { btn: "Ansehen", r: "Du lachst. Aber das Netzwerk lahmt.", m: 2, f: 5, a: -5, c: 0 },
            { btn: "Absender sperren", r: "Das Netzwerk ist dir heilig. Der User ist sauer.", m: 2, f: 0, a: 5, c: 0, nextEmail: "mail_video_2" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_video_2",
        linked: true,
        sender: "Kollege Bernd",
        subj: "Mein Account geht nicht?!",
        body: "Ich kann keine Mails mehr senden! Hast du was gemacht? Ich wollte nur Freude verbreiten!",
        opts: [
            { btn: "Freude ist verboten. Wie schreibst du mir überhaupt, wenn du geblockt bist?", r: "Du fühlst dich wie ein Diktator. Gut.", m: 2, f: 0, a: -5, c: -5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_ac_1",
        sender: "Facility Mgt",
        subj: "Klimaanlage defekt",
        body: "Die Klimaanlage kühlt nicht mehr. Sie heizt jetzt. Raumtemperatur: 38 Grad. Viel Erfolg.",
        opts: [
            { btn: "Hose ausziehen", r: "Unter dem Tisch sieht es keiner. (Hoffentlich).", m: 2, f: 10, a: -5, c: 10, nextEmail: "mail_ac_pants" },
            { btn: "Leiden", r: "Du schwitzt auf die Tastatur.", m: 2, f: -10, a: 10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_ac_pants",
        linked: true,
        sender: "HR (Sabine)",
        subj: "Kleiderordnung",
        body: "Herr Müller, wir haben Beschwerden erhalten. Bitte ziehen Sie Ihre Hose wieder an. Das hier ist kein FKK-Strand.",
        opts: [
            { btn: "Schade.", r: "Es war so schön luftig.", m: 2, f: -5, a: 5, c: 5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_key_1",
        sender: "Empfang",
        subj: "Schlüssel gefunden",
        body: "Ein Schlüsselbund mit einem 'My Little Pony' Anhänger wurde gefunden. Wem gehört der?",
        opts: [
            { btn: "Das ist meiner!", r: "Peinlich. Du holst ihn rot angelaufen ab.", m: 2, f: 0, a: 5, c: 0, nextEmail: "mail_key_2" },
            { btn: "Schweigen", r: "Du kommst heute nicht in deine Wohnung.", m: 2, f: 0, a: 10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_key_2",
        linked: true,
        sender: "Gabi (Empfang)",
        subj: "Re: Schlüssel gefunden",
        body: "Hier ist er. Süßer Anhänger. Passt zu dir. *kicher*",
        opts: [
            { btn: "Er gehört meiner Nichte!", r: "Lüge. Gabi glaubt dir kein Wort.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_print_color_1",
        sender: "Controlling",
        subj: "Farb-Druck Verbot",
        body: "Ab sofort sind Farbdrucke verboten! Jede farbige Seite kostet 5 Cent und wird vom Gehalt abgezogen.",
        opts: [
            { btn: "Alles in S/W drucken", r: "Die Welt ist grau. Deine Seele auch.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Trotzdem Farbe drucken", r: "Rebellion! Du druckst ein Regenbogen-Bild.", m: 2, f: 5, a: -5, c: 5, nextEmail: "mail_print_color_2" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_print_color_2",
        linked: true,
        sender: "Controlling",
        subj: "Gehaltsabrechnung Korrektur",
        body: "Abzug für private Farbdrucke (Motiv: Regenbogen): 0,05€. Wir haben Sie im Auge.",
        opts: [
            { btn: "Das war es wert.", r: "Du hängst das Bild stolz auf.", m: 2, f: 5, a: -5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_dog_1",
        sender: "Chantal",
        subj: "Darf Bello mitkommen? 🐶",
        body: "Mein Hundesitter ist krank. Darf Bello heute ins Büro? Er beißt nur, wenn er Angst riecht.",
        opts: [
            { btn: "Ja, ich liebe Hunde!", r: "Bello kommt. Er riecht streng.", m: 2, f: 5, a: -5, c: 0, nextEmail: "mail_dog_bite" },
            { btn: "Nein, Allergie.", r: "Chantal ist beleidigt.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_dog_bite",
        linked: true,
        sender: "Chantal",
        subj: "Ups...",
        body: "Sorry, dass er dein LAN-Kabel gefressen und dich gebissen hat. Er hat wohl deine Angst (vor Arbeit) gerochen!",
        opts: [
            { btn: "Arzt rufen.", r: "Du brauchst ein Pflaster und ein neues Kabel.", m: 2, f: -10, a: 10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_fridge_1",
        sender: "Küche",
        subj: "Schimmel-Alarm",
        body: "Im Kühlschrank lebt etwas. Es hat Fell und atmet. Wer seine Tupperdose gleich nicht holt, wird gefeuert.",
        opts: [
            { btn: "Meine Dose holen", r: "Du entsorgst das Experiment in Bio-Hazard Manier.", m: 5, f: -5, a: 0, c: 0, nextEmail: "mail_fridge_2" },
            { btn: "Nicht mein Problem", r: "Du hoffst, dass es nicht deine Dose ist.", m: 2, f: 0, a: 0, c: 5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_fridge_2",
        linked: true,
        sender: "Küche",
        subj: "Danke",
        body: "Danke fürs Entsorgen. Wir dachten kurz, es greift uns an. Der Kühlschrank ist wieder sicher.",
        opts: [
            { btn: "Held der Arbeit.", r: "Du hast die Menschheit gerettet.", m: 2, f: 5, a: -5, c: -5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_software_1",
        sender: "Horst (Vertrieb)",
        subj: "Tolle Gratis-Software!",
        body: "Hab mir 'SpeedUpMyPC_Free.exe' installiert. Mein PC ist jetzt viel bunter! Soll ich dir den Link schicken?",
        opts: [
            { btn: "PC sofort vom Netz nehmen!", r: "Du rennst zu Horst und ziehst den Stecker.", m: 5, f: -10, a: 10, c: -10, nextEmail: "mail_software_2" },
            { btn: "Mach nur...", r: "Du willst die Welt brennen sehen.", m: 2, f: 5, a: -10, c: 20 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_software_2",
        linked: true,
        sender: "System",
        subj: "Bedrohungs-Abwehr",
        body: "145 Viren, 20 Trojaner und 1 Krypto-Miner entfernt. Horst hat Schreibverbot für 24 Stunden.",
        opts: [
            { btn: "Gut so.", r: "Ein weiterer Sieg für die IT.", m: 2, f: 0, a: -5, c: -10 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_canteen_1",
        sender: "Kantine",
        subj: "Heute: 'Topf der Überraschung'",
        body: "Liebe Esser, wir haben alle Reste der Woche in einen Topf geworfen. Es ist grau und blubbert. Preis: 2,50€.",
        opts: [
            { btn: "Ich bin mutig! (Essen)", r: "Es schmeckt nach Fisch und Pudding.", m: 5, f: 0, a: 10, c: 0, nextEmail: "mail_canteen_2" },
            { btn: "Ich faste lieber.", r: "Du hungerst. Dein Magen knurrt laut.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_canteen_2",
        linked: true,
        sender: "Kantine",
        subj: "Re: Heute: 'Topf der Überraschung'",
        body: "Kleine Warnung: Falls Sie Halluzinationen bekommen, das ist normal. Das liegt am Pilz-Risotto vom Montag.",
        opts: [
            { btn: "Die Wände schmelzen...", r: "Du bist für 30 Minuten 'arbeitsunfähig' (high).", m: 30, f: 15, a: -5, c: 5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_tiktok_1",
        sender: "Marketing (Chantal)",
        subj: "Wir sind jetzt auf TikTok! 💃",
        body: "Heyy! Wir müssen 'jung und dynamisch' wirken! Kommt alle in den Flur für die 'Corporate Dance Challenge'!",
        opts: [
            { btn: "Mitmachen (Tanzen)", r: "Du machst dich zum Affen. Chantal filmt alles.", m: 10, f: 5, a: 5, c: 0, nextEmail: "mail_tiktok_2" },
            { btn: "Verstecken", r: "Du schließt dich im Klo ein.", m: 10, f: 0, a: 0, c: 5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_tiktok_2",
        linked: true,
        sender: "Marketing (Chantal)",
        subj: "VIRAL!!!",
        body: "OMG! Dein 'Roboter-Tanz' hat 1 Million Views! Die Kommentare fragen, ob wir Hilfe brauchen. Aber: Fame ist Fame!",
        opts: [
            { btn: "Ich will Tantiemen.", r: "Du bist jetzt das Gesicht der Firma (leider).", m: 2, f: 0, a: -10, c: 10 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_salary_1",
        sender: "HR System",
        subj: "Gehaltsabrechnung KORREKTUR",
        body: "Durch einen Fehler haben wir Ihnen diesen Monat 5.000€ zu viel überwiesen. Bitte nicht ausgeben!",
        opts: [
            { btn: "Sofort zurücküberweisen", r: "Ehrlich währt am längsten. Langweiler.", m: 2, f: 0, a: -5, c: 5, nextEmail: "mail_salary_honest" },
            { btn: "Geld behalten & schweigen", r: "Du buchst sofort einen Flug auf die Malediven.", m: 2, f: 0, a: 0, c: -20, nextEmail: "mail_salary_fraud" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_salary_honest",
        linked: true,
        sender: "HR System",
        subj: "Vielen Dank für Ihre Meldung",
        body: "Danke für die Ehrlichkeit. Als Belohnung bekommen Sie einen Firmen-Kugelschreiber (sobald ausreichend Budget da ist).",
        opts: [
            { btn: "Juhu...", r: "Du fühlst dich moralisch überlegen, aber arm.", m: 2, f: 0, a: 0, c: -5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_salary_fraud",
        linked: true,
        sender: "Rechtsabteilung",
        subj: "LETZTE MAHNUNG",
        body: "Wir wissen, dass Sie das Geld haben. Wir pfänden jetzt Ihren Bürostuhl und Ihre Kaffeetasse.",
        opts: [
            { btn: "Mist.", r: "Du sitzt jetzt auf dem Boden.", m: 2, f: -5, a: 15, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_charging_1",
        sender: "Facility Mgt",
        subj: "E-Ladesäule blockiert",
        body: "Ein alter Diesel-Golf blockiert die einzige Ladesäule für E-Autos. Kennzeichen: DU-MM 123.",
        opts: [
            { btn: "Abschleppdienst rufen", r: "Ordnung muss sein!", m: 5, f: -5, a: -5, c: 0, nextEmail: "mail_charging_tow" },
            { btn: "Zettel dran: 'Idiot'", r: "Passiv-aggressiv ist dein Stil.", m: 5, f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_charging_tow",
        linked: true,
        sender: "Hausmeister Egon",
        subj: "Mein Auto!!!",
        body: "Hömma! Wer hat meine Karre abschleppen lassen?! Ich wollte doch nur kurz Brötchen holen! Komm du mir nach unten!",
        opts: [
            { btn: "Verstecken.", r: "Du hast dich mit Egon angelegt. Schlechte Idee.", m: 10, f: 5, a: 10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },

    {
        id: "mail_lights_1",
        sender: "Smart Office App",
        subj: "Lichtsteuerung: Beta Test",
        body: "Sie haben nun Zugriff auf die Lampen in Ihrer Abteilung. Bitte verantwortungsvoll nutzen.",
        opts: [
            { btn: "Modus: 'Disco Strobe'", r: "Alles blinkt bunt. Kollegen bekommen Anfälle.", m: 2, f: 10, a: -5, c: 0, nextEmail: "mail_lights_disco" },
            { btn: "Modus: 'Dunkelkammer'", r: "Licht aus. Zeit für ein Nickerchen.", m: 2, f: 15, a: 0, c: 5, nextEmail: "mail_lights_dark" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_lights_disco",
        linked: true,
        sender: "Dr. Wichtig",
        subj: "AUGENKREBS",
        body: "Wer macht hier Party?! Ich versuche zu telefonieren! Schalten Sie das sofort aus, oder ich schalte SIE aus!",
        opts: [
            { btn: "Sorry, Finger abgerutscht.", r: "Schnell wieder auf 'Langweilig-Weiß' stellen.", m: 2, f: 0, a: 10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_lights_dark",
        linked: true,
        sender: "Kollege Bernd",
        subj: "Stromausfall?",
        body: "Es ist stockdunkel. Ich bin gerade gegen den Kopierer gelaufen. Bist du noch da?",
        opts: [
            { btn: "Pscht, ich schlafe.", r: "Du genießt die Dunkelheit.", m: 2, f: 10, a: 0, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_intern_db_1",
        sender: "Kevin (Azubi)",
        subj: "Frage zu 'DELETE ALL'",
        body: "Chef? Wenn da steht 'Wollen Sie wirklich die Kundendatenbank löschen?', muss ich da auf 'Ja' klicken, damit das Fenster weggeht? Es nervt.",
        opts: [
            { btn: "NEIN!!! UM GOTTES WILLEN!", r: "Du rennst los.", m: 5, f: -10, a: 20, c: 10, nextEmail: "mail_intern_db_panic" },
            { btn: "Sarkasmus: 'Klar, mach mal.'", r: "Du denkst, er versteht den Witz.", m: 2, f: 5, a: 0, c: 0, nextEmail: "mail_intern_db_fail" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_intern_db_panic",
        linked: true,
        sender: "Kevin (Azubi)",
        subj: "Re: Frage zu 'DELETE ALL'",
        body: "Puh, okay. Hab auf 'Abbrechen' geklickt. Aber jetzt ist der Bildschirm blau. Ist das gut?",
        opts: [
            { btn: "Besser als gelöscht.", r: "Nur ein Absturz. Glück gehabt.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_intern_db_fail",
        linked: true,
        sender: "System Alert",
        subj: "DATABASE EMPTY",
        body: "Tabelle 'Customers' enthält 0 Einträge. Letztes Backup: 1999.",
        opts: [
            { btn: "Ich kündige.", r: "Pack deine Sachen.", m: 10, f: 0, a: 50, c: -20 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_coffee_decaf_1",
        sender: "Gesundheits-AG",
        subj: "Woche der Herzgesundheit",
        body: "Zu Ihrem Besten gibt es diese Woche nur koffeinfreien Kaffee (aus Dinkel). Bleiben Sie gesund!",
        opts: [
            { btn: "Akzeptieren", r: "Du schläfst für einen Moment ein.", m: 15, f: 10, a: 0, c: 0 },
            { btn: "Schmuggelware organisieren", r: "Du dealst mit Red Bull auf dem Herrenklo.", m: 5, f: -5, a: -5, c: 10, nextEmail: "mail_coffee_decaf_2" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_coffee_decaf_2",
        linked: true,
        sender: "Kollege Bernd",
        subj: "Hast du Stoff?",
        body: "Ich hab gehört, du hast echtes Koffein? Ich zahle jeden Preis! Meine Hände zittern schon!",
        opts: [
            { btn: "5€ pro Dose.", r: "Du wirst zum Drogenbaron des Büros.", m: 2, f: 0, a: -10, c: 15 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_dsgvo_1",
        sender: "Datenschutzbeauftragter",
        subj: "DSGVO Verstoß: Post-It",
        body: "An Ihrem Monitor klebt ein Zettel mit 'Passwort123'. Das ist ein Sicherheitsrisiko der Stufe Rot.",
        opts: [
            { btn: "Zettel essen", r: "Beweismittel vernichtet. Schmeckt nach Papier und Angst.", m: 2, f: 0, a: 5, c: -5, nextEmail: "mail_dsgvo_eaten" },
            { btn: "Lüge: 'Das ist ein WLAN-Code'", r: "Er glaubt es nicht, aber lässt dich in Ruhe.", m: 2, f: 0, a: 0, c: 5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_dsgvo_eaten",
        linked: true,
        sender: "Datenschutzbeauftragter",
        subj: "Re: DSGVO Verstoß",
        body: "Haben Sie den Zettel gerade... verschluckt? Ich bin beeindruckt von Ihrer Hingabe. Fall geschlossen.",
        opts: [
            { btn: "*Rülps*", r: "Verdauungsstörungen, aber der Job ist sicher.", m: 2, f: 0, a: -5, c: -5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_buzzword_1",
        sender: "Projektleiter",
        subj: "Quick Sync bzgl. Low Hanging Fruits",
        body: "Lass uns mal schnell brainstormen, wie wir das Mindset shiften können. Wir brauchen mehr Agilität im Backend!",
        opts: [
            { btn: "Antwort: 'Bullshit-Bingo!'", r: "Du schickst ihm eine ausgefüllte Bingokarte.", m: 2, f: 5, a: -5, c: 5, nextEmail: "mail_buzzword_fail" },
            { btn: "Antwort: 'Bin total committed.'", r: "Du stirbst innerlich, aber er ist glücklich.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_buzzword_fail",
        linked: true,
        sender: "Projektleiter",
        subj: "Re: Quick Sync",
        body: "Sehr witzig. Deine Attitude ist nicht gerade 'Customer Centric'. Wir sprechen uns im Jahresgespräch.",
        opts: [
            { btn: "Whatever.", r: "Buzzwords können dir nichts anhaben.", m: 2, f: 0, a: 0, c: 5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_birthday_wrong_1",
        sender: "HR System",
        subj: "Happy Birthday! 🎉",
        body: "Lieber Mitarbeiter, alles Gute zum 50. Geburtstag! Holen Sie sich Ihren Gratis-Apfel in der Kantine ab!",
        opts: [
            { btn: "Ich bin erst 28?!", r: "Du mailst wütend zurück.", m: 2, f: 0, a: 10, c: 0, nextEmail: "mail_birthday_fix" },
            { btn: "Apfel holen", r: "Gratis ist Gratis. Auch wenn du jetzt offiziell alt bist.", m: 5, f: 5, a: -5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_birthday_fix",
        linked: true,
        sender: "HR System",
        subj: "Ticket #9921",
        body: "Änderung des Geburtsdatums erfordert Formular A38, notariell beglaubigt. Bearbeitungszeit: 6 Monate.",
        opts: [
            { btn: "Ich hasse euch.", r: "Du gibst auf und alterst vor Stress.", m: 2, f: 0, a: 10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_mouse_1",
        sender: "Kevin (Azubi)",
        subj: "Maus geht nicht",
        body: "Chef, meine Maus ist kaputt. Wenn ich sie hochhebe, bewegt sich der Zeiger nicht mehr. Hä?",
        opts: [
            { btn: "Ernsthaft? 'Leg sie hin.'", r: "Du erklärst ihm die Physik.", m: 5, f: 0, a: 5, c: 0, nextEmail: "mail_mouse_2" },
            { btn: "Kauf dir eine neue.", r: "Nicht dein Budget, nicht dein Problem.", m: 2, f: 5, a: 0, c: 5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_mouse_2",
        linked: true,
        sender: "Kevin (Azubi)",
        subj: "WOW!",
        body: "Es geht!! Sie sind ein Magier! Ich dachte, das ist wie bei der Fernbedienung!",
        opts: [
            { btn: "Kopf -> Tisch.", r: "Der Glaube an die Menschheit sinkt.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_temperature_1",
        sender: "Kollegin Petra",
        subj: "Es zieht!",
        body: "Kannst du das Fenster zumachen? Ich bekomme einen steifen Nacken! Es sind nur 28 Grad draußen!",
        opts: [
            { btn: "Fenster bleibt auf!", r: "Frischluft ist ein Menschenrecht.", m: 2, f: 0, a: -5, c: 5, nextEmail: "mail_temperature_war" },
            { btn: "Fenster zu (Erstickunsgefahr)", r: "Der Sauerstoffgehalt sinkt auf 0%. Du wirst müde.", m: 10, f: 10, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_temperature_war",
        linked: true,
        sender: "Kollegin Petra",
        subj: "Re: Es zieht!",
        body: "Dann drehe ich die Heizung auf 5! Das hast du davon!",
        opts: [
            { btn: "Sauna-Krieg.", r: "Es beginnt. Keiner arbeitet mehr, alle schwitzen.", m: 2, f: 5, a: 15, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_printer_name_1",
        sender: "Office Management",
        subj: "Name für neuen Drucker",
        body: "Vorschläge: 1. Drucki McPrintface, 2. Papierstau-Paulus, 3. The Beast. Bitte abstimmen.",
        opts: [
            { btn: "Drucki McPrintface", r: "Klassiker. Alle lachen.", m: 2, f: 5, a: -5, c: 0 },
            { btn: "The Beast", r: "Passend. Er sieht böse aus.", m: 2, f: 0, a: 0, c: 0, nextEmail: "mail_printer_beast" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_printer_beast",
        linked: true,
        sender: "Office Management",
        subj: "Taufe: The Beast",
        body: "Der Drucker heißt jetzt 'The Beast'. Er hat zur Feier des Tages sofort Toner auf den Teppich gespuckt.",
        opts: [
            { btn: "Passender Name.", r: "Du nickst respektvoll.", m: 2, f: 0, a: 0, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_darkmode_1",
        sender: "Design Team",
        subj: "Dark Mode Pflicht?",
        body: "Wir überlegen, alles auf Schwarz umzustellen. Spart Strom und sieht cool aus. Meinung?",
        opts: [
            { btn: "JA! MEINE AUGEN!", r: "Endlich nicht mehr schneeblind.", m: 2, f: 5, a: -5, c: 0, nextEmail: "mail_darkmode_win" },
            { btn: "Nein, ich mag Weiß.", r: "Du Monster. Alle Entwickler hassen dich.", m: 2, f: 0, a: 5, c: 5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_darkmode_win",
        linked: true,
        sender: "Design Team",
        subj: "Welcome to the Dark Side",
        body: "Alles ist jetzt schwarz. Leider auch die Schriftfarbe. Wir arbeiten dran.",
        opts: [
            { btn: "Ich sehe nichts..", r: "Aber es sieht cool aus.", m: 2, f: 10, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_secret_santa_1",
        sender: "Orga Komitee",
        subj: "Wichteln im Juli",
        body: "Wir wollen die Stimmung heben! Zwangswichteln! Du musst ein Geschenk für 'Dr. Wichtig' besorgen. Budget: 5€.",
        opts: [
            { btn: "Klopapier einpacken", r: "Ein praktisches Geschenk. Mutig.", m: 5, f: 0, a: -5, c: 10, nextEmail: "mail_santa_fail" },
            { btn: "Schokolade kaufen", r: "Langweilig, aber sicher.", m: 5, f: -5, a: 0, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_santa_fail",
        linked: true,
        sender: "Dr. Wichtig",
        subj: "Ihr Geschenk",
        body: "Müller? War das eine Anspielung auf meine Arbeitsweise? Kommen Sie in mein Büro.",
        opts: [
            { btn: "Ups.", r: "Das war vielleicht zu mutig.", m: 5, f: 0, a: 20, c: 10 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_scam_prince_1",
        sender: "Prinz Zamunda",
        subj: "GOLD GESCHENKT",
        body: "Hallo mein Freund. Ich habe 50 Millionen Goldbarren. Ich brauche dein Konto. 50/50 Split?",
        opts: [
            { btn: "Antwort: 'Schick erst Probe!'", r: "Du trollst den Scammer.", m: 2, f: 5, a: 0, c: 0, nextEmail: "mail_scam_prince_2" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_scam_prince_2",
        linked: true,
        sender: "Prinz Zamunda",
        subj: "Re: GOLD GESCHENKT",
        body: "Okay, ich habe dir 1 Cent überwiesen. Vertraust du mir jetzt? Bitte Sende Passwort.",
        opts: [
            { btn: "Er hat wirklich überwiesen!", r: "Du bist 1 Cent reicher. Profit.", m: 2, f: 5, a: -5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_parking_scooter_1",
        sender: "Hausmeister Egon",
        subj: "E-Roller im Flur",
        body: "Wer hat seinen 'Lime-Scooter' im Serverraum geparkt? Er piept alle 30 Sekunden.",
        opts: [
            { btn: "Das ist mein Dienstwagen.", r: "Du bist zu faul zum Laufen.", m: 2, f: 5, a: 0, c: 5, nextEmail: "mail_parking_scooter_2" },
            { btn: "Rausschmeißen", r: "Du wirfst den Roller aus dem Fenster.", m: 5, f: 0, a: -5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_parking_scooter_2",
        linked: true,
        sender: "Hausmeister Egon",
        subj: "Re: E-Roller",
        body: "Hab ihn ans WLAN angeschlossen. Er lädt jetzt Updates runter und blockiert die Leitung. Dein Problem.",
        opts: [
            { btn: "Mist.", r: "Das Internet ist tot wegen eines Rollers.", m: 2, f: -5, a: 10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_vegan_war_1",
        sender: "Kantinen-Ausschuss",
        subj: "Schnitzel-Verbot?",
        body: "Diskussion: Sollen wir den 'Schnitzel-Dienstag' durch den 'Tofu-Tornado-Tag' ersetzen?",
        opts: [
            { btn: "NIEMALS! (Pro Schnitzel)", r: "Du kämpfst für dein Fleisch. Die IT steht hinter dir.", m: 2, f: 0, a: -5, c: 0, nextEmail: "mail_vegan_schnitzel" },
            { btn: "Ja, Tofu ist super.", r: "Alle hassen dich. Wirklich alle.", m: 2, f: 0, a: 15, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_vegan_schnitzel",
        linked: true,
        sender: "Kantinen-Ausschuss",
        subj: "Abstimmungsergebnis",
        body: "Das Schnitzel bleibt! Aber es kostet jetzt 9,50€ (Klimazuschlag).",
        opts: [
            { btn: "Ein teurer Sieg.", r: "Hauptsache paniert.", m: 2, f: 5, a: 0, c: -5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_pen_thief_1",
        sender: "Sekretariat",
        subj: "Kugelschreiber Schwund",
        body: "Es fehlen 500 Kugelschreiber. Wer welche hat, bitte zurückgeben. Anonyme Box steht bereit.",
        opts: [
            { btn: "Meine 40 Stück zurückgeben", r: "Du leerst deine Schublade. Es klappert laut.", m: 5, f: 0, a: 0, c: 5, nextEmail: "mail_pen_thief_2" },
            { btn: "Ich weiß von nichts.", r: "Du baust eine Burg aus Stiften.", m: 2, f: 5, a: 0, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_pen_thief_2",
        linked: true,
        sender: "Sekretariat",
        subj: "Danke...",
        body: "Danke für die Rückgabe. Warum waren die alle angekaut?! Wir werfen sie weg.",
        opts: [
            { btn: "Ich war nervös.", r: "Peinlich.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_fire_alarm_1",
        sender: "Sicherheit",
        subj: "ANGEKÜNDIGTER FEUERALARM",
        body: "Heute um 14:00 testen wir die Sirene. Bitte NICHT in Panik geraten und NICHT aus dem Fenster springen.",
        opts: [
            { btn: "Ohrstöpsel rein", r: "Du ignorierst alles. Profi.", m: 2, f: 5, a: -5, c: 0 },
            { btn: "Um 14:00 'FEUER!' schreien", r: "Du sorgst für realistische Bedingungen.", m: 5, f: 0, a: 0, c: 10, nextEmail: "mail_fire_chaos" },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_fire_chaos",
        linked: true,
        sender: "Sicherheit",
        subj: "Manöverkritik",
        body: "Dank Herrn Müller sind 3 Kollegen in den Brunnen gesprungen. Die Übung war ein 'voller Erfolg'.",
        opts: [
            { btn: "Gern geschehen.", r: "Sicherheit geht vor.", m: 2, f: 0, a: -10, c: -5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_meme_1",
        sender: "Der lustige Günther",
        subj: "Wochenende!!! 🍺🍺",
        body: "Hier ein lustiges Bild von einem Minion, der Bier trinkt! Hahaha! Versteht ihr? Weil Arbeit doof ist!",
        opts: [
            { btn: "Fake-Lachen antworten", r: "Du schreibst 'LOL Günther!'. Deine Seele stirbt.", m: 2, f: 0, a: 5, c: 0 },
            { btn: "Günther blockieren", r: "Endlich Ruhe.", m: 2, f: 5, a: -5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_consultant_1",
        sender: "McKinsey & Partner",
        subj: "Effizienz-Analyse",
        body: "Wir prüfen Ihre Abteilung. Bitte protokollieren Sie jeden Toilettengang in Excel.",
        opts: [
            { btn: "Excel ausfüllen", r: "Du tippst: '09:00 - Pipi'. Erniedrigend.", m: 5, f: -10, a: 15, c: 0, nextEmail: "mail_consultant_2" },
            { btn: "Excel fälschen", r: "Du schreibst, du gehst nie. Du bist ein Roboter.", m: 2, f: 5, a: 0, c: 5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_consultant_2",
        linked: true,
        sender: "McKinsey & Partner",
        subj: "Ergebnis",
        body: "Sie gehen zu oft. Wir empfehlen einen Katheter am Arbeitsplatz, um die Effizienz um 2% zu steigern.",
        opts: [
            { btn: "Ich kündige gleich.", r: "Aggro am Limit.", m: 2, f: 0, a: 20, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_lottery_win_fake",
        sender: "Notar Dr. Fake",
        subj: "Erbschaft aus Nigeria",
        body: "Ihr ferner Onkel ist gestorben. Er hinterlässt Ihnen eine Diamantenmine. Bitte überweisen Sie 500€ Gebühr.",
        opts: [
            { btn: "Seems legit. (Zahlen)", r: "Du bist so dumm.", m: 2, f: 0, a: 20, c: -20 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht. Du bist ja nicht blöd.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_smell_1",
        sender: "Anonym",
        subj: "Geruchsbelästigung",
        body: "Jemand in diesem Büro riecht nach altem Käse und Verzweiflung. Bitte duschen.",
        opts: [
            { btn: "Rieche ich das?", r: "Du schnupperst an dir. Vielleicht?", m: 2, f: 0, a: 5, c: 5, nextEmail: "mail_smell_2" },
            { btn: "Das ist Kevin.", r: "Es ist immer Kevin.", m: 2, f: 5, a: -5, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_smell_2",
        linked: true,
        sender: "Anonym",
        subj: "Re: Geruchsbelästigung",
        body: "Ja, Sie sind es. Deo hilft. Danke.",
        opts: [
            { btn: "Autsch.", r: "Das hat wehgetan. Selbstwertgefühl sinkt.", m: 2, f: 0, a: 10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_teambuilding_1",
        sender: "HR (Sabine)",
        subj: "Teamevent: Wald-Survival",
        body: "Wir setzen euch im Wald aus. Ohne Handys. Wer zuerst zurück ist, wird nicht gefeuert.",
        opts: [
            { btn: "Krankmelden", r: "Plötzlich hast du 'Rücken'.", m: 2, f: 10, a: -5, c: 0 },
            { btn: "Ich nehme ein Messer mit.", r: "Du bist bereit für die 'Hunger Games'.", m: 2, f: 0, a: 5, c: 5 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },
    {
        id: "mail_printer_color_cyan",
        sender: "Drucker",
        subj: "TONER LEER",
        body: "Cyan ist leer. Ich kann dieses Schwarz-Weiß-Dokument nicht drucken, weil ich Cyan brauche um Schwarz zu mischen.",
        opts: [
            { btn: "Drucker schlagen", r: "Es hilft nicht, aber tut gut.", m: 5, f: 0, a: 5, c: 0 },
            { btn: "Mit Kugelschreiber abschreiben", r: "Zurück ins Mittelalter.", m: 10, f: -10, a: 10, c: 0 },
            { btn: "Löschen & Ignorieren", r: "E-Mail kommentarlos gelöscht.", m: 2, f: 0, a: 0, c: 10, ignoreEmail: true }
        ]
    },


/* ============================================================
   MAIL-WELLE (v4.0.0)
   Frau Elster bekommt ihre ersten Mails überhaupt (Beleg-Saga
   und die Inventur mit Kontrollposition 87), Markus seine
   Siri-Diktate und den CC-Loop, Kevin den Anhang-Klassiker.
   Dazu charakterfreie Büro-Post: Reply-All-Lasagne, der
   Phishing-Test der Konzernzentrale, die 14-Ebenen-Weiterleitung
   und die Abwesenheitsnotiz-Endlosschleife. Sechs Ketten via
   nextEmail. Erstmals tragen Mails kleine Ruf-Werte (±3-5).
   ============================================================ */

{
    id: "mail_markus_siri",
    sender: "Vertriebsleiter Markus",
    subj: "WICHTIG AUS DEM AUTO",
    body: "HALLO MÜLLER AUSRUFEZEICHEN ich brauche DRINGEND die zahlen für Techni Plast KOMMA die vom letzten Quartal PUNKT neuer Absatz\n\nnicht die alten zahlen sondern die NEUEN alten PUNKT\n\ngesendet von meinem iPhone während der Fahrt Siri du kannst jetzt aufhören Siri STOP",
    opts: [
        {
            btn: "Präzise nachfragen: WELCHE Zahlen?",
            nextEmail: "mail_markus_siri_2",
            m: 2, f: 0, a: 5, c: 0,
            r: "Du formulierst eine glasklare Rückfrage mit drei Auswahlmöglichkeiten. Die Antwort wird wieder aus dem Auto kommen. Du weißt das. Du fragst trotzdem. Hoffnung ist ein Arbeitsprinzip."
        },
        {
            btn: "Die wahrscheinlichsten Zahlen einfach schicken",
            rep: { "Markus": 3 },
            m: 10, f: 5, a: 0, c: 0,
            r: "Du rätst dich durch den Vertriebs-Dschungel und schickst die Quartalsauswertung TechniPlast. Zwanzig Minuten später: 'PERFEKT DANKE AUSRUFEZEICHEN'. Es waren die richtigen. Diesmal."
        },
        {
            btn: "Löschen & Ignorieren",
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
            btn: "Gabi fragen (natürlich weiß sie es)",
            rep: { "Gabi": 3 },
            m: 5, f: 5, a: 0, c: 0,
            r: "Gabi weiß es sofort: 'Die Rabattstaffel. Die ist seit März falsch verlinkt, das meint er.' Du schickst die korrigierte Datei. Zwei Menschen in diesem Haus verstehen den Vertrieb: Gabi und niemand sonst."
        },
        {
            btn: "'Ruf mich an, wenn du geparkt hast'",
            m: 2, f: 5, a: -5, c: 0,
            r: "Die Antwort kommt vier Stunden später: 'BIN GEPARKT wer bist du nochmal FRAGEZEICHEN'. Siri hat den Verlauf gefressen. Das Thema hat sich, wie so vieles bei Markus, unterwegs von selbst erledigt."
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
            btn: "Allen antworten, sachlich und endgültig",
            m: 10, f: 0, a: 10, c: -5,
            r: "Du erklärst dem gesamten Verteiler in drei nüchternen Sätzen die Ursache (der Kunde nutzt den Client von 2019). Es ist korrekt, transparent und wird von exakt niemandem gelesen. Aber es steht im Loop, und der Loop ist heilig."
        },
        {
            btn: "Nur Markus antworten: 'Sowas klären wir zu zweit'",
            rep: { "Markus": -3 },
            m: 5, f: 0, a: -5, c: 0,
            r: "Er antwortet - selbstverständlich an alle: 'Die IT möchte das bilateral klären AUSRUFEZEICHEN Transparenz sieht anders aus.' Du hast verloren, indem du vernünftig warst. Der Klassiker dieses Hauses."
        },
        {
            btn: "Löschen & Ignorieren",
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
            btn: "Die Schreibtisch-Archäologie beginnen",
            nextEmail: "mail_elster_349_2",
            m: 15, f: -5, a: 10, c: 0,
            r: "Nach einer Viertelstunde Grabung durch drei Schubladen-Schichten: Der Beleg klebt an einem Hustenbonbon. Er ist verknittert, aber lesbar. Du scannst ihn mit der Sorgfalt eines Restaurators und reichst ihn ein."
        },
        {
            btn: "'Vergessen wir die 3,49 einfach'",
            rep: { "Frau Elster": -5 },
            m: 2, f: 5, a: 0, c: 5,
            r: "Fataler Irrtum. Es geht nicht um 3,49 Euro. Es ging NIE um 3,49 Euro. Es geht um das Prinzip, und das Prinzip führt jetzt einen offenen Posten mit deinem Namen. Ihre Antwort: 'Verzicht ist buchhalterisch KEINE Klärung.'"
        },
        {
            btn: "Löschen & Ignorieren",
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
            btn: "Die 12 Cent gebührend würdigen",
            rep: { "Frau Elster": 5 },
            m: 2, f: 0, a: -5, c: 0,
            r: "Du antwortest: 'Die 12 Cent haben meinen Tag gerettet.' Ihre Antwort kommt nach neunzig Sekunden: 'Das war der Zweck.' Irgendwo hinter den Aktenbergen hat Frau Elster gelächelt. Davon ist auszugehen."
        },
        {
            btn: "Kommentarlos abheften",
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
            btn: "Gewissenhaft prüfen, Auffälligkeiten melden",
            nextEmail: "mail_elster_inventur_2a",
            m: 25, f: -10, a: 15, c: 0,
            r: "Ein Nachmittag zwischen Racks, Schränken und Egons Kellerregalen. 209 Positionen: vorhanden. Vier: verschollen. Und Position 87, 'Quantenrechner QX-1, Anschaffung 1997', kann unmöglich existieren. Du meldest exakt das - samt der Frage, was ein Quantenrechner 1997 gekostet haben soll."
        },
        {
            btn: "Alle 214 blind bestätigen",
            nextEmail: "mail_elster_inventur_2b",
            m: 5, f: 10, a: 0, c: 0,
            r: "Zweihundertvierzehn Häkchen in vier Minuten - ein neuer Hausrekord. Die Liste geht bestätigt zurück an die Buchhaltung, wo Frau Elster sie mit einem ganz bestimmten Blick öffnen wird."
        },
        {
            btn: "An Kevin delegieren: Inventur-Praxis!",
            rep: { "Kevin": 3 },
            m: 5, f: 5, a: 0, c: 5,
            r: "Kevin zieht begeistert mit Klemmbrett los. Rückmeldung nach drei Stunden: '213 gefunden! Und was ist ein Quantenrechner?' Der Junge hat die Kontrollposition entdeckt, ohne zu ahnen, dass es eine war. Instinkt kann man nicht lehren."
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
            btn: "'Wer ist der andere Name?'",
            rep: { "Frau Elster": 5 },
            m: 2, f: 0, a: 0, c: 0,
            r: "Die Antwort kommt umgehend und besteht aus einem Wort: 'Ich.' Mehr Ehre passt in dieser Firma nicht in eine Zeile. Du druckst die Mail nicht aus. Aber es war knapp."
        },
        {
            btn: "Still stolz sein",
            rep: { "Frau Elster": 3 },
            m: 2, f: 5, a: 0, c: 0,
            r: "Manche Auszeichnungen brauchen keine Antwort. Du bist jetzt prüfungssicher - ein Adelstitel, den es offiziell nicht gibt und der in diesem Haus trotzdem mehr wiegt als jede Beförderung."
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
            btn: "Zerknirscht wirklich prüfen",
            rep: { "Frau Elster": 3 },
            m: 25, f: -5, a: 15, c: 0,
            r: "Die zweite Runde machst du richtig: jede Position, jeder Raum, Egons Keller inklusive. Vier Geräte bleiben verschollen, der Rest stimmt. Ihre Antwort auf deine korrigierte Liste: 'Sehen Sie. Ging doch.' Es klingt fast mütterlich. Fast."
        },
        {
            btn: "'Der Quantenrechner steht bei Egon im Keller'",
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
            btn: "'Kevin. Der Anhang.'",
            nextEmail: "mail_kevin_anhang_2",
            m: 2, f: 0, a: 5, c: 0,
            r: "Du antwortest mit drei Wörtern. Mehr braucht es nicht. Mehr würde auch nichts ändern."
        },
        {
            btn: "Selbst per Fernwartung nachsehen",
            m: 10, f: 5, a: 5, c: 0,
            r: "Du findest die Datei auf seinem Desktop. Sie heißt 'endgültig_final_NEU(3).xlsx' und liegt direkt neben 'endgültig_final_NEU(2).xlsx' und 'endgültig_final.xlsx'. Du nimmst die mit der höchsten Zahl. Hoffentlich zählt Kevin so wie der Rest der Menschheit."
        },
        {
            btn: "Löschen & Ignorieren",
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
            btn: "Schweigend warten - er merkt es selbst",
            nextEmail: "mail_kevin_anhang_3",
            m: 2, f: 5, a: 0, c: 0,
            r: "Wieder kein Anhang. Du antwortest nicht. Kevin wird es selbst bemerken - erfahrungsgemäß nach elf Minuten, wenn die Scham durch die Kopfhörer sickert."
        },
        {
            btn: "Anrufen und es beenden",
            m: 5, f: 0, a: 5, c: 0,
            r: "'Ach DESHALB ging die Mail so schnell raus!' Vierzig Sekunden Telefon lösen, was zwei Mails nicht konnten. Die Datei kommt an. Als Download-Link. Immerhin."
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
            btn: "Das Foto für die Ewigkeit sichern",
            m: 2, f: 5, a: -5, c: 0,
            r: "Der Anhang ist ein Foto seines Bildschirms, auf dem die geöffnete Datei zu sehen ist. Scharf fotografiert immerhin. Das Bild wandert in deinen Ordner 'Beweise'. Bei seiner Abschlussfeier wird es eine Diashow geben. Du sammelst bereits."
        },
        {
            btn: "Hingehen und die Anhang-Schulung halten",
            rep: { "Kevin": 5 },
            m: 10, f: -5, a: 5, c: 0,
            r: "Du zeigst ihm das Büroklammer-Symbol. Kevin: 'DA ist das!' Er notiert es sich - als Sprachnachricht an sich selbst, aber er notiert es. Die Datei kommt zwei Minuten später an. Als echter Anhang. Es ist Wachstum. Irgendeine Form davon."
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
            btn: "Die 23 Antworten genüsslich lesen",
            m: 10, f: 10, a: -10, c: 0,
            r: "Die Kette enthält: zwei gegenseitige Verdächtigungen, eine Grundsatzdebatte über Kühlschrank-Ethik, ein Meme und Frau Elsters trockenen Verweis auf die Kühlschrankordnung. Beste Unterhaltung des Tages, völlig kostenlos. Also fast: Es war Arbeitszeit."
        },
        {
            btn: "Die IT-Karte spielen: 'Ich kann die Küchen-Logs prüfen'",
            nextEmail: "mail_allhands_lasagne_2",
            m: 5, f: 5, a: -5, c: 5,
            r: "Es gibt keine Küchen-Logs. Aber das weiß der Verteiler nicht. Deine Mail erzeugt im Thread eine sofortige, fast hörbare Stille. Macht fühlt sich exakt so an."
        },
        {
            btn: "Löschen & Ignorieren",
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
            btn: "'Alles. Seit 2019.'",
            m: 2, f: 5, a: -10, c: 0,
            r: "Eine Stunde später steht eine neue, versiegelte Lasagne im Kühlschrank. Daneben ein Zettel: 'Für Bernd. Von einem Freund.' Fall geschlossen - ohne Urteil, ohne Beweis, ohne ein einziges echtes Log. Justiz durch Bluff. Die günstigste Form."
        },
        {
            btn: "'Jürgen. Wir beide wissen es.'",
            m: 5, f: 0, a: -5, c: 0,
            r: "Jürgen antwortet nicht. Muss er auch nicht. In der Kantine stellt er dir fortan wortlos den Nachtisch mit aufs Tablett. Schweigegeld in Puddingform. Du nimmst es an. Man muss auch nehmen können."
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
            btn: "Vorbildlich als Phishing melden",
            m: 2, f: 0, a: 0, c: -5,
            r: "Der Musterknaben-Klick. Sekunden später: 'Glückwunsch! Sie haben den Test bestanden.' Du bist jetzt Teil einer Statistik, die in einer Vorstandsfolie enden wird. Immerhin auf der grünen Balkenseite."
        },
        {
            btn: "Absichtlich klicken - Forschungszwecke",
            nextEmail: "mail_security_test_2",
            m: 5, f: 10, a: 0, c: 0,
            r: "Wissenschaftliche Neugier: Was passiert bei Klick? Der Link führt auf eine Belehrungsseite mit trauriger Schild-Grafik ('Das hätte ein echter Angriff sein können!') - und einer automatischen Konsequenz, die du eine Sekunde zu spät liest."
        },
        {
            btn: "Die halbe Firma vorwarnen",
            m: 5, f: 5, a: -5, c: 5,
            r: "Deine Flurfunk-Warnung lotst Dutzende Kollegen sicher durch den Test. Die Konzern-Security staunt über die beste Quote der Firmengeschichte - 98 Prozent - und kündigt an, 'die Testmethodik zu überprüfen'. Du hast eine Statistik geheilt und sie dadurch verdächtig gemacht."
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
            btn: "Die 45 Minuten würdevoll absitzen",
            m: 30, f: 10, a: 15, c: 0,
            r: "Du - hauptberuflich der Mensch, der diese Schulung halten könnte - klickst dich durch Module wie 'Was ist ein Link?'. Das Abschlusszertifikat druckst du aus und hängst es ins Büro. Als Mahnung. Oder Trophäe. Die Grenze ist fließend."
        },
        {
            btn: "Widerspruch: 'Ich BIN die IT'",
            m: 10, f: 0, a: 10, c: 5,
            r: "Die Antwort der Konzern-Security kommt formvollendet: 'Gerade Administratoren sind ein Hochrisiko-Ziel. Die Teilnahme bleibt verpflichtend.' Sie haben recht, und das ist das Ärgerlichste daran. Die Schulung wartet. Sie wartet geduldig."
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
            btn: "Mail-Archäologie: bis zur Urfrage graben",
            m: 15, f: -5, a: 10, c: 0,
            r: "Vierzehn Ebenen tiefer, datiert vor drei Wochen, findest du die Urfrage: 'Ist der Drucker im 3. OG eigentlich neu?' Er war neu. Er ist es nicht mehr. Die Frage hat sich durch reine Weiterleitungsdauer selbst beantwortet. Du dokumentierst den Fund wie ein Höhlenforscher."
        },
        {
            btn: "Ganz oben antworten: 'Was ist die Frage?'",
            m: 2, f: 0, a: 5, c: 0,
            r: "Deine Gegenfrage wird umgehend an vier Personen weitergeleitet, von denen zwei abwesend sind. Die Kette wächst um drei Ebenen. Du bist jetzt Teil des Problems, das du lösen wolltest. So vermehrt sich Bürokratie: durch Berührung."
        },
        {
            btn: "Löschen & Ignorieren",
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
            btn: "Die Schleife serverseitig töten",
            m: 10, f: -5, a: 5, c: -5,
            r: "Zwei Mail-Regeln, ein Neustart des Auto-Responders: Stille. Danach löschst du 3.412 Systemmails mit einem einzigen, zutiefst befriedigenden Klick. Bergmann und Winter kehren irgendwann aus dem Urlaub zurück und werden nie erfahren, welchen Sturm ihre Höflichkeit entfacht hat."
        },
        {
            btn: "Erst noch zuschauen, wie weit es geht",
            m: 5, f: 10, a: -5, c: 5,
            r: "Es hat etwas Meditatives: zwei Maschinen, die einander unermüdlich versichern, gerade nicht da zu sein. Bei fünftausend greifst du ein. Der Screenshot des Zählers bei 4.999 hängt jetzt in deinem Ordner für besondere Momente."
        },
        {
            btn: "Physik entscheiden lassen: Speicher ist endlich",
            m: 2, f: 10, a: 0, c: 10,
            r: "Irgendwann ist jeder Speicher voll, das regelt sich also von selbst. Leider gehört der Speicher der Firma, und das Monitoring der Konzernzentrale sieht ihn in Echtzeit volllaufen. Die Nachfrage von oben ist schneller als der Überlauf. Deutlich schneller."
        }
    ]
},

];
