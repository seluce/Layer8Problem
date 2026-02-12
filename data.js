const DB = {
    // === ITEMS (Loot & Werkzeuge) ===
    items: {
        // VERBRAUCHSGEGENSTÄNDE (Einmalig)
        "wifi_note": { icon: "🏷️", name: "WLAN-Zettel", img: "assets/items/wifi_note.webp"  },
        "donut": { icon: "🍩", name: "Alter Donut", img: "assets/items/donut.webp" },
        "energy": { icon: "⚡", name: "Energy Drink", img: "assets/items/energy.webp" },
        "secret_list": { icon: "📁", name: "Schwarze Liste", img: "assets/items/secret_list.webp"  },
		"arg_list_1": { icon: "📋", name: "Argumente (Ich)", img: "assets/items/arg_list_1.webp" }, 
        "arg_list_2": { icon: "📑", name: "Argumente (Kevin)", img: "assets/items/arg_list_2.webp" },
        "bubble_wrap": { icon: "🫧", name: "Luftpolsterfolie", img: "assets/items/bubble_wrap.webp" },
        
        // WERKZEUGE (Dauerhaft -> keep: true)
        "admin_pw": { icon: "🔑", name: "Root-Passwort", keep: true, img: "assets/items/admin_pw.webp"  },
        "cable": { icon: "〰️", name: "LAN-Kabel", keep: true, img: "assets/items/cable.webp" },
        "tape": { icon: "🩹", name: "Panzertape", keep: true, img: "assets/items/tape.webp" },
        "screw": { icon: "🪛", name: "Schraubendreher", keep: true, img: "assets/items/screw.webp" },
        "stressball": { icon: "🔴", name: "Anti-Stressball", keep: true, img: "assets/items/stressball.webp" },
        "manual": { icon: "📖", name: "Win95 Handbuch", keep: true, img: "assets/items/manual.webp"  },
        "usb_stick": { icon: "💾", name: "Boot-Stick", keep: true, img: "assets/items/usb_stick.webp" },
        "fire_ext": { icon: "🧯", name: "Feuerlöscher", keep: true, img: "assets/items/fire_ext.webp" },
        "hammer": { icon: "🔨", name: "Hammer", keep: true, img: "assets/items/hammer.webp" },
        "zip_ties": { icon: "➰", name: "Kabelbinder", keep: true, img: "assets/items/zip_ties.webp" },
        "headphones": { icon: "🎧", name: "NC-Kopfhörer", keep: true, img: "assets/items/headphones.webp" },
        "black_card": { icon: "💳", name: "Schwarze Amex", keep: true, img: "assets/items/black_card.webp" },

        // QUEST ITEMS
        "kevin_ram": { icon: "📟", name: "Kevins Glücks-RAM", keep: true, quest: true, img: "assets/items/kevin_ram.webp" },
        "golden_stapler": { icon: "✨", name: "Goldener Tacker", keep: true, quest: true, img: "assets/items/golden_stapler.webp" },
        "mixtape": { icon: "🤘", name: "Death Metal Tape", keep: true, quest: true, img: "assets/items/mixtape.webp" },
        "cat_pic": { icon: "🐱", name: "Foto von Rüdiger", keep: true, quest: true, img: "assets/items/cat_pic.webp" },
        "master_key": { icon: "🗝️", name: "Generalschlüssel", keep: true, quest: true, img: "assets/items/master_key.webp" },
        "scotch_bottle": { icon: "🥃", name: "30-jähriger Scotch", keep: true, quest: true, img: "assets/items/scotch_bottle.webp" },
        "contract": { icon: "📜", name: "Neuer Arbeitsvertrag", keep: true, quest: true, img: "assets/items/contract.webp" },
        "corp_chronicles": { icon: "📕", name: "Die Firmenchronik", keep: true, quest: true, img: "assets/items/corp_chronicles.webp" },
        "prince_letter": { icon: "💌", name: "Brief vom Prinzen", keep: true, quest: true,img: "assets/items/prince_letter.webp" },
    },
	
    // E-MAILS (Für das Popup System)
    emails: [
        {
            id: "mail_cake_1",
            sender: "HR (Sabine)",
            subj: "Kuchen in der Küche! 🍰",
            body: "Liebe alle,\n\nIch habe veganen, glutenfreien Zucchini-Kuchen gebacken! Bedient euch!\n\n(Bitte nur 1 Stück pro Person!)",
            opts: [
                { btn: "Ein Stück nehmen", txt: "Schmeckt nach Pappe und Traurigkeit.", f: 0, a: 5, c: 0 },
                { btn: "Allen antworten: 'Wo ist das Mett?'", txt: "Du schickst den Witz an den ganzen Verteiler.", f: 5, a: -5, c: 0, nextEmail: "mail_cake_2" }
            ]
        },
        {
            id: "mail_cake_2",
            linked: true,
            sender: "HR (Sabine)",
            subj: "Re: Kuchen in der Küche! 🍰",
            body: "Das finde ich überhaupt nicht lustig, Herr Müller!\n\nWir versuchen hier, eine inklusive Atmosphäre zu schaffen! Ich habe Ihren Namen auf die 'Kein-Weihnachtsgeld'-Liste gesetzt.",
            opts: [
                { btn: "Das war es wert.", txt: "Du holst dir heimlich ein Mettbrötchen.", f: 5, a: 0, c: 5 }
            ]
        },
        {
            id: "mail_ticket_fire",
            sender: "Ticketsystem", 
            subj: "TICKET #9942: Maus brennt.",
            body: "PRIORITY: CRITICAL \nUSER: Gabi (Empfang) \nDESCRIPTION: 'Hilfe, aus meiner Maus kommt Rauch und es riecht nach verbranntem Plastik. Ich habe versucht, sie mit Kaffee zu löschen, jetzt funkt es blau.' \nSTATUS: OPEN",
            opts: [
                { btn: "Ticket löschen", txt: "Gelöscht. Problem gelöst (für dich).", f: 10, a: 0, c: 5 },
                { btn: "Feuerwehr rufen", txt: "Großeinsatz. Es war nur eine LED.", f: -5, a: 10, c: 10 }
            ]
        },
        {
            id: "mail_workshop_breathing",
            sender: "Betriebsrat", 
            subj: "Einladung: 'Richtig Atmen am Arbeitsplatz'",
            body: "Namaste liebe Mit-Sklaven... äh Mitarbeiter. \n\nWir laden ein zum Workshop 'Atmen gegen den Burnout'. Wir lernen gemeinsam, wie man Wut in CO2 umwandelt. Es gibt vegane Dinkel-Kekse (glutenfrei, zuckerfrei, geschmacksneutral). Anwesenheit wird empfohlen.",
            opts: [
                { btn: "Teilnehmen", txt: "Du atmest. 30 Minuten nichts getan.", f: 15, a: -10, c: 5 },
                { btn: "Als Spam markieren", txt: "Weg damit. Zeit ist Geld.", f: 0, a: 5, c: 0 }
            ]
        },
        {
            id: "mail_toilet_1",
            sender: "Facility Mgt",
            subj: "Toiletten im 3. Stock gesperrt (Rohrbruch).",
            body: "ACHTUNG: Aufgrund eines... Vorfalls... mit einem nicht näher genannten Mitarbeiter und einer halben Rolle Papierhandtücher ist der Sanitärbereich im 3. OG gesperrt. Das Wasser steht 5cm hoch.\n\nBitte Gummistiefel tragen oder einhalten.",
            opts: [
                { btn: "Allen antworten: 'Das kommt vom Sparzwang!'", txt: "Du zettelst einen Aufstand gegen das Management an.", f: 5, a: 10, c: 5, nextEmail: "mail_toilet_revolution" },
                { btn: "Allen antworten: 'Danke Merkel!!!11'", txt: "Du startest eine wilde politische Debatte ohne Sinn.", f: 5, a: 10, c: 5, nextEmail: "mail_toilet_politics" }
            ]
        },
        {
            id: "mail_toilet_revolution",
            linked: true,
            sender: "Betriebsrat (Uwe)",
            subj: "AW: Toiletten im 3. Stock gesperrt",
            body: "KAMERADEN! Müller hat Recht!\n\nDas 1-lagige Papier ist ein Verbrechen an der Menschlichkeit! Das Management nutzt wahrscheinlich Seide!\n\nWir fordern: 4 Lagen für alle! Ab morgen: GENERALSTREIK vor dem Klo!",
            opts: [
                { btn: "Solidarität bekunden.", txt: "Du hast versehentlich eine kommunistische Revolution im 3. Stock gestartet.", f: 10, a: -5, c: 0 }
            ]
        },
        {
            id: "mail_toilet_politics",
            linked: true,
            sender: "Alle Mitarbeiter",
            subj: "AW: AW: AW: Toiletten im 3. Stock gesperrt",
            body: "System-Nachricht: Dieser E-Mail-Thread hat 400 neue Antworten.\n\nBetreffs enthalten: 'Klimawandel', 'Flache Erde', 'Tempolimit', 'Schnitzel-Verbot'.\n\nDer Mail-Server raucht. Niemand arbeitet mehr.",
            opts: [
                { btn: "Popcorn holen.", txt: "Die Firma brennt, aber du bist gut unterhalten.", f: 15, a: -5, c: 0 }
            ]
        },
        {
            id: "mail_phish_test_bonus",
            sender: "IT-Sec", 
            subj: "Phishing-Test: Bitte hier klicken für Bonus!",
            body: "Lieber Mitarbeiter. \n\nWir haben festgestellt, dass Ihr Gehalt zu niedrig ist. Um Ihren sofortigen Bonus von 5.000 EUR zu erhalten, geben Sie bitte Ihr Windows-Passwort und den Namen Ihres ersten Haustiers auf der folgenden Seite ein: \n[LINK_ZUR_FALLE_KLICK_MICH]",
            opts: [
                { btn: "Sofort klicken!", txt: "TEST NICHT BESTANDEN! Ein rotes Fenster poppt auf: 'SIEHST DU NICHT, DASS DAS FAKE IST?!' Meldung an Chef ging raus.", f: 0, a: 10, c: 20 },
                { btn: "Als Phishing melden", txt: "Vorbildlich. Die IT schickt dir einen Daumen-hoch-Smiley zurück.", f: 0, a: 0, c: -5 }
            ]
        },
        {
            id: "mail_kevin_noise",
            sender: "Azubi Kevin", 
            subj: "Hilfe!! Mein PC macht komische Geräusche",
            body: "Duuu? Mein PC macht so 'Krrrrtzzz Krrrrtzz' Geräusche und riecht komisch nach Strom. Ich hab mal fest dagegen getreten, jetzt raucht er ein bisschen. Ist das ein neues Feature? Soll ich Wasser drüberkippen?",
            opts: [
                { btn: "Antwort: 'Lauf weg!'", txt: "Kevin rennt schreiend raus.", f: 5, a: 0, c: 5 },
                { btn: "Hingehen", txt: "Es war der Lüfter. Du hast es gefixt.", f: -5, a: -5, c: -5 }
            ]
        },
        {
            id: "mail_leak_1",
            sender: "Dr. Wichtig",
            subj: "WG: Kündigungswelle Q4 (VERTRAULICH)",
            body: "An: Vorstand\nCc: (Versehentlich) Alle Mitarbeiter\n\nMeine Herren, anbei die Liste der 50 Mitarbeiter, die wir nächsten Montag feuern. Bitte diskret behandeln.\n\n[Anhang: Liste_FINAL_v3.pdf]",
            opts: [
                { btn: "Allen antworten: 'BIN ICH AUCH DRAUF?!'", txt: "Du hast an den gesamten Verteiler geantwortet. Panik bricht aus.", f: -10, a: 10, c: 5, nextEmail: "mail_leak_2" },
                { btn: "Sofort löschen", txt: "Du tust so, als hättest du nichts gesehen. Dein Herz rast.", f: 0, a: 5, c: 0 }
            ]
        },
        {
            id: "mail_leak_2",
            linked: true,
            sender: "Dr. Wichtig",
            subj: "AW: WG: Kündigungswelle Q4 (VERTRAULICH)",
            body: "MÜLLER?! \n\nWie können Sie es wagen?! Das war ein Test! Um... die Loyalität zu prüfen! Kommen Sie SOFORT in mein Büro!\n\n(Das wird ein langes Gespräch...)",
            opts: [
                { btn: "Ups...", txt: "Der Chef brüllt dich 30 Minuten lang an.", f: 0, a: 20, c: 10 }
            ]
        },
        {
            id: "mail_chantal_affair_1",
            sender: "Chantal (Privat)",
            subj: "Re: Wochenende",
            body: "Hey Hasi 🐰, der Chef nervt so hart. Treffen wir uns in 5 Min im Archiv? Ich habe Kaffee und diese geilen Schoko-Cookies geschmuggelt. Niemand findet uns zwischen den Akten von 1990. 😘",
            opts: [
                { btn: "Weiterleiten an: Dr. Wichtig", txt: "Du leitest die Mail kommentarlos an den Chef weiter. Eiskalt.", f: 0, a: -10, c: -20, nextEmail: "mail_chantal_boss_reply" },
                { btn: "Antworten: 'Ich weiß alles. Schweigegeld?'", txt: "Du nutzt ihr Missgeschick gnadenlos aus.", f: 5, a: 0, c: 0, nextEmail: "mail_chantal_panic" }
            ]
        },
        {
            id: "mail_chantal_boss_reply",
            linked: true,
            sender: "Dr. Wichtig",
            subj: "AW: WG: Re: Wochenende",
            body: "Herr Müller,\n\nExzellente Wachsamkeit. Faulheit ist ein Geschwür in dieser Firma.\n\nIch habe Frau Chantal soeben 'zum Gespräch' gebeten. Nehmen Sie sich einen Keks aus ihrem Büro, solange sie weg ist.\n\nWeitermachen.",
            opts: [
                { btn: "Der Keks schmeckt nach Verrat.", txt: "Du fühlst dich sicher, aber einsam.", f: 0, a: -5, c: -10 }
            ]
        },
        {
            id: "mail_chantal_panic",
            linked: true,
            sender: "Chantal (Privat)",
            subj: "Re: Re: Wochenende",
            body: "OMG MÜLLER?! 😱😱😱\n\nBitte sag nix!! Das war für... äh... meine Oma! Wenn du die Klappe hältst, mach ich deine PowerPoint für morgen hübsch! Und du kriegst alle Cookies! DEAL?!",
            opts: [
                { btn: "Deal.", txt: "Chantal arbeitet jetzt für dich. Das Leben ist schön.", f: 15, a: -5, c: 0 }
            ]
        },
        { 
            id: "mail_compliance_sitting",
            sender: "HR Compliance Bot", 
            subj: "DRINGEND: E-Learning 'Richtiges Sitzen' überfällig",
            body: "Sehr geehrter Mitarbeiter, unser System zeigt an, dass Sie das Pflichtmodul 'Ergonomie am Arbeitsplatz Teil 4b: Der perfekte 90-Grad-Winkel' noch nicht absolviert haben. Das Video dauert 45 Minuten und kann nicht übersprungen werden. Bitte erledigen Sie dies bis EOB, andernfalls wird Ihr Zugang gesperrt.",
            opts: [
                { btn: "Video laufen lassen", txt: "Du lässt das Video im Hintergrund laufen. Der Ton nervt, aber du bist compliant.", f: 10, a: 5, c: -5 },
                { btn: "Als 'Erledigt' markieren (Hack)", txt: "Du manipulierst die Datenbank. Risiko, aber spart Zeit.", f: 0, a: -5, c: 5 },
                { btn: "Löschen", txt: "Ignoriert. Die nächste Mahnung kommt bestimmt.", f: 0, a: 0, c: 10 }
            ]
        },
        { 
            id: "mail_replyall_cat",            
            sender: "Verteiler: ALLE (Re: Re: Re: Katze)", 
            subj: "AW: AW: AW: Wer vermisst 'Mimi'?",
            body: "BITTE NEHMEN SIE MICH AUS DIESEM VERTEILER!!!! ICH HABE KEINE KATZE!!! DAS IST EINE ARBEITSE-MAIL!!! (Vorherige Nachricht von Gabi: 'Oh wie süß, ist die flauschig!'). (Vorherige Nachricht von Klaus: 'Mimi ist wieder da, danke an alle!').",
            opts: [
                { btn: "Reply-All: 'RUHE!'", txt: "Du hast zur Eskalation beigetragen. Jetzt antworten 50 Leute 'Hör auf, an alle zu antworten!'. Mailserver raucht.", f: 0, a: 20, c: 10 },
                { btn: "Filter-Regel erstellen", txt: "Du filterst 'Mimi' direkt in den Papierkorb. Himmlische Ruhe.", f: -5, a: -10, c: 0 }
            ]
        },
        { 
            id: "mail_chantal_wording",
            sender: "Chantal (Marketing)", 
            subj: "Wording Check - ASAP!!!",
            body: "Hiiii! 👋 Wir drucken gleich die Flyer für die Messe. Kannst du kurz drüberschauen? Da steht: 'Unsere Cloud-Lösung synergiert mit der Blockchain-KI, um das WLAN-Kabel zu optimieren.' Klingt das techy genug? Brauche das GO in 2 Minuten!!! 😘",
            opts: [
                { btn: "Antwort: 'Perfekt!'", txt: "Du hast den Unsinn durchgewunken. Die IT-Community wird uns auslachen, aber Chantal ist glücklich.", f: 10, a: -5, c: 0 },
                { btn: "Den Text korrigieren", txt: "Du erklärst ihr mühsam, dass es keine WLAN-Kabel gibt. Sie versteht es nicht. 'Aber das klingt doch gut!'", f: -10, a: 10, c: 0 }
            ]
        },
        { 
            id: "mail_krause_fridge",
            sender: "Hausmeister Krause", 
            subj: "Kühlschrank Etage 3",
            body: "Moin. Ich habe im Kühlschrank eine Tupperdose gefunden, auf der steht 'Mittagessen 2019'. Der Inhalt hat mittlerweile Pelz und knurrt mich an, wenn ich das Licht anmache. Der Besitzer möge sich bitte mit einem Flammenwerfer bei mir melden, sonst entsorge ich das samt Kühlschrank.",
            opts: [
                { btn: "Das ist meins!", txt: "Du rettest dein... was auch immer das war. Es riecht übel.", f: 0, a: 5, c: 0 },
                { btn: "Ignorieren", txt: "Nicht dein Problem. Soll es doch brennen.", f: 5, a: 0, c: 0 }
            ]
        },
        { 
            id: "mail_ceo_vision",
            sender: "Der CEO (Dr. Wichtig)", 
            subj: "Vision 2030 - Ihre Ideen!",
            body: "Liebes Team, ich hatte heute Nacht im Wellness-Retreat eine Vision. Wir müssen 'Agiler' werden. Ich möchte, dass jeder von Ihnen mir bis 12 Uhr ein 10-seitiges Konzept schickt, wie wir KI nutzen können, um Kaffee zu sparen. Denken Sie 'Out of the Box'! Go, Go, Go!",
            opts: [
                { btn: "ChatGPT nutzen", txt: "Du lässt eine KI das Bullshit-Konzept schreiben. Der Chef ist begeistert: 'Visionär!'", f: 10, a: -5, c: -10 },
                { btn: "Ehrlich antworten", txt: "Du schreibst: 'Das ist Unsinn.' Der Chef merkt sich deinen Namen (negativ).", f: 0, a: 10, c: 20 },
                { btn: "Löschen", txt: "Ignoriert. Hoffentlich vergisst er es wieder.", f: 0, a: 0, c: 5 }
            ]
        },
        { 
            id: "mail_wuttke_excel",
            sender: "H. Wuttke (Buchhaltung)", 
            subj: "HILFE! EXCEL IST ROT!",
            body: "Herr IT!!! Ich habe nichts gemacht, ehrlich! Ich wollte nur die Spalte G löschen und jetzt ist alles rot und blinkt! Die Bilanz muss in 10 Minuten raus! Wenn das weg ist, bin ich tot! Kommen Sie sofort her! Warum passiert das immer mir?!",
            opts: [
                { btn: "Ticket verlangen", txt: "Du schreibst zurück: 'Bitte Ticket aufmachen.' Eiskalt.", f: 5, a: -5, c: 5 },
                { btn: "Hingehen", txt: "Er saß auf der 'Entf'-Taste. Problem gelöst in 2 Sekunden.", f: -10, a: 10, c: -5 }
            ]
        },
        { 
            id: "mail_circle_mindfulness",
            sender: "Betriebsrat", 
            subj: "Einladung: Stuhlkreis 'Achtsamkeit'",
            body: "Liebe Kollegen, aufgrund des hohen Stresslevels bieten wir heute um 14 Uhr einen Stuhlkreis an. Wir werden gemeinsam atmen und unsere Namen tanzen. Es gibt vegane Dinkelkekse. Teilnahme ist freiwillig (aber wird notiert).",
            opts: [
                { btn: "Hingehen", txt: "Du hast 1 Stunde geatmet. Faulheit +20. Aber die Kekse waren trocken.", f: 20, a: -10, c: 5 },
                { btn: "Als Spam markieren", txt: "Weg damit. Ich habe echte Arbeit.", f: 0, a: 5, c: 0 }
            ]
        },
        {
            id: "mail_phish_1",
            sender: "Sicherheits-Dienst",
            subj: "Dringend: Ihr Passwort läuft ab!",
            body: "Hallo User,\n\nihr Passwort ist zu alt. Klicken Sie HIER um es zu ändern und erhalten Sie 500€ Amazon-Gutschein als Belohnung!\n\nLink: http://bit.ly/hacker-klaus",
            opts: [
                { btn: "Link anklicken", txt: "Du klickst auf den Link. Ein rotes Fenster öffnet sich.", f: 5, a: 0, c: 0, nextEmail: "mail_phish_2" },
                { btn: "Als Phishing melden", txt: "Gut gemacht. IT-Sec ist stolz.", f: 0, a: -5, c: 0 }
            ]
        },
        {
            id: "mail_phish_2",
            linked: true,
            sender: "IT-Security Bot",
            subj: "ALERT: SIE HABEN VERSAGT",
            body: "Dies war ein interner Sicherheitstest.\nSie sind durchgefallen.\n\nKonsequenz: Ihr Internet-Zugang wurde auf 'Modem-Geschwindigkeit' gedrosselt, bis Sie die Schulung 'Maus-Bedienung für Anfänger' absolviert haben.",
            opts: [
                { btn: "Verdammt.", txt: "Alles lädt jetzt super langsam. Aggro steigt.", f: -5, a: 15, c: 0 }
            ]
        },
        { 
            id: "mail_erna_virus",
            sender: "Tante Erna (Privat)", 
            subj: "FWD: FWD: FWD: Lustig!!!!",
            body: "Schau mal Junge, das musst du sehen! 😂😂😂 Die Katze fällt vom Stuhl! Ich habe mich so weggeschmissen! Zeig das mal deinen Kollegen! LG Tante Erna. PS: Wie geht das Internet an? (Anhang: lustig.ppt.exe - 50MB)",
            opts: [
                { btn: "Anhang öffnen", txt: "VIRUS-ALARM! Es war Malware. Der Scanner schreit. Du musst den PC bereinigen.", f: -20, a: 20, c: 20 },
                { btn: "Nett antworten", txt: "Du lügst: 'Haha, sehr lustig Tante Erna.'", f: 0, a: -5, c: 0 }
            ]
        },
        { 
            id: "mail_scam_package",
            sender: "Unbekannt", 
            subj: "Ihr Paket konnte nicht zugestellt werden",
            body: "Hallo Kunde. Ihr Paket liegt im Zoll. Bitte überweisen Sie 2,50€ Gebühr über diesen Link, sonst verbrennen wir ihr Paket. Link: www.totally-legit-dhl-scam.ru",
            opts: [
                { btn: "Klicken (Gier)", txt: "Phishing-Seite! Du hast fast deine Daten eingegeben. IT-Sec hat es gemerkt.", f: 0, a: 10, c: 15 },
                { btn: "Löschen", txt: "Netter Versuch.", f: 0, a: 0, c: 0 },
                { btn: "Antworten: 'Behaltet es'", txt: "Die Mail kam zurück (Mail Delivery Failure).", f: 0, a: 5, c: 0 }
            ]
        },
        {
            id: "mail_wuttke_1",
            sender: "H. Wuttke (Buchhaltung)",
            subj: "(Kein Betreff)",
            body: "Gulasch Rezept einfach schnell ohne Paprika",
            opts: [
                { btn: "Antworten: 'Horst, das ist Outlook.'", txt: "Du klärst ihn auf. Hoffentlich versteht er es.", f: 0, a: 5, c: 0, nextEmail: "mail_wuttke_ai" },
                { btn: "Weiterleiten an: Dr. Wichtig", txt: "Eiskalt. Du meldest die private Nutzung sofort.", f: 0, a: -5, c: -10, nextEmail: "mail_wuttke_boss" }
            ]
        },
        {
            id: "mail_wuttke_ai",
            linked: true,
            sender: "H. Wuttke (Buchhaltung)",
            subj: "AW: (Kein Betreff)",
            body: "Danke Outlook.\n\nBestell bitte auch 2 Becher Sahne und Nudeln. Aber nicht die Spiralnudeln, die mag meine Frau nicht.\n\nSenden.",
            opts: [
                { btn: "Aufgeben.", txt: "Du starrst auf den Bildschirm. Gegen diese Dummheit gibt es keinen Patch.", f: 5, a: 10, c: 0 }
            ]
        },
        {
            id: "mail_wuttke_boss",
            linked: true,
            sender: "Dr. Wichtig",
            subj: "WG: (Kein Betreff)",
            body: "Müller,\n\ndanke für die Weiterleitung.\n\nSagen Sie Wuttke, er soll Paprika reinmachen, sonst schmeckt das nicht. Und wenn er schon kocht, soll er mir eine Portion in den 4. Stock bringen.\n\n(Sie kriegen nichts, Verräter mag niemand.)",
            opts: [
                { btn: "Na toll.", txt: "Der Chef kriegt Gulasch, Wuttke kriegt Lob, du kriegst gar nichts.", f: 0, a: 15, c: 0 }
            ]
        },
		{ 
            id: "mail_sabine_tupper",
            sender: "Sabine (Empfang)", 
            subj: "WER HAT MEINE TUPPERDOSE?!",
            body: "Das ist jetzt das dritte Mal! Meine rote Dose mit dem Aufkleber 'SABINE' ist weg! Ich durchsuche jetzt alle Schreibtische! Wenn ich sie finde, gnade euch Gott! Ich rufe die Polizei!",
            opts: [
                { btn: "Reply-All: 'Chill mal'", txt: "Fehler! Sabine rastet aus. Sie wirft einen Tacker durchs Büro. Du musst dich unter dem Tisch verstecken.", f: 0, a: 30, c: 10 },
                { btn: "Löschen", txt: "Nicht dein Problem. Sollen sie sich doch prügeln.", f: 5, a: 0, c: 0 }
            ]
        },
        { 
            id: "mail_alert_login",
            sender: "SYSTEM ALERT (Automated)", 
            subj: "CRITICAL: Suspicious Login (CEO Account)",
            body: "Detected Login attempt for user 'CEO' from IP Address: 192.168.x.x (Location: Pyongyang, North Korea). Success: TRUE. \nAction required immediately!",
            opts: [
                { btn: "Account sofort sperren", txt: "Du hast den CEO mitten in einer Videokonferenz rausgeworfen. Er ist sauer, aber du hast die Firma vor Nordkorea gerettet. Held!", f: -10, a: 0, c: -20 },
                { btn: "Als VPN-Fehler abtun", txt: "Es war kein VPN. Alle Firmendaten sind jetzt im Darknet. Der Aktienkurs fällt auf 0. Game Over.", f: 0, a: 50, c: 100 }
            ]
        },
        { 
            id: "mail_juergen_admin",
            sender: "Jürgen (Vertrieb)", 
            subj: "Brauche Admin-Rechte GANZ SCHNELL",
            body: "Ich muss dieses PDF für den Kunden umwandeln. Hab da so ein Tool gefunden 'Free_PDF_Converter_Pro_Cracked.exe'. Windows meckert rum wegen Virus, aber das ist Fehlalarm. Gib mal Passwort, Kunde wartet!!!",
            opts: [
                { btn: "Einfach das Passwort eingeben", txt: "ZACK. Ransomware. Alles verschlüsselt. Ein Totenkopf lacht auf deinem Monitor. Das war wohl kein Fehlalarm.", f: 0, a: 50, c: 50 },
                { btn: "Hingehen & 'Nein' sagen", txt: "Du erklärst ihm Sicherheit. Er hört zwar nicht zu, aber du hast die Installation verhindert.", f: -10, a: 10, c: 0 }
            ]
        },
		{ 
            id: "mail_yoga_laugh",
            sender: "HR Feel Good Management", 
            subj: "PFLICHT-TEILNAHME: Die 'Lach-Yoga' Pause",
            body: "Um die Moral zu heben, treffen wir uns alle um 11:00 im Flur zum synchronen Lachen! 'Hahaha hihihi'! Wer nicht lacht, kriegt einen Eintrag in die Akte wegen negativer Einstellung! 😊😊😊",
            opts: [
                { btn: "Hingehen & mitmachen", txt: "Du stehst im Flur und machst 'Hahaha'. Du stirbst innerlich. Aber HR ist zufrieden.", f: 10, a: 20, c: -5 },
                { btn: "Filter-Regel: 'Löschen'", txt: "Du arbeitest weiter. Später fragt HR, warum du so negativ bist.", f: 0, a: -5, c: 10 }
            ]
        },
        { 
            id: "mail_chantal_mac",
            sender: "Chantal (Marketing)", 
            subj: "Mein Mac ist zu laaangsam!!! 😭",
            body: "Ich kann so nicht arbeiten! Wenn ich Spotify, Photoshop, 50 Chrome-Tabs und Sims 4 gleichzeitig offen habe, ruckelt die Maus! Ich brauche das neue MacBook Pro M3 Max mit 96GB RAM! SOFORT! Sonst sag ich's Papa (dem CEO)!",
            opts: [
                { btn: "Einfach bestellen", txt: "Du hast 5000€ Budget verbrannt. Chantal nutzt die Rechenpower nun für Instagram-Filter. Der Finanz-Chef hasst dich.", f: 10, a: -10, c: 20 },
                { btn: "Task-Manager aufräumen", txt: "Du schließt 'Sims 4' und 48 Chrome-Tabs. PC läuft wieder flüssig. Chantal schmollt.", f: -5, a: 5, c: 0 }
            ]
        },
        { 
            id: "mail_legal_warning",
            sender: "Kanzlei Abmahn & Söhne", 
            subj: "ABMAHNUNG: Urheberrechtsverletzung",
            body: "Sehr geehrte Damen und Herren, über Ihren Anschluss wurde gestern der Film 'Barbie vs. Oppenheimer' illegal getauscht. Wir fordern 900€ oder wir verklagen Sie auf Millionen.",
            opts: [
                { btn: "Die Logs prüfen", txt: "Es war der Azubi Kevin. Du lässt ihn die 900€ vom Taschengeld zahlen. Lektion gelernt.", f: -10, a: 0, c: -5 },
                { btn: "Sofort alle Spuren löschen", txt: "Du löscht die Beweise. Jetzt haftet die Firma, weil kein Täter ermittelt werden kann. Der Chef muss zahlen und tobt.", f: 0, a: 20, c: 30 }
            ]
        },
		{ 
            id: "mail_heating_war",
            sender: "Alle (Verteiler)", 
            subj: "HEIZUNG AUF 5!!!",
            body: "Mir ist kalt! Ich habe die Heizung jetzt auf 5 gedreht und den Knauf abgebrochen, damit es so bleibt! Wer das Fenster aufmacht, fängt sich eine! LG, Frau Frost (Buchhaltung)",
            opts: [
                { btn: "Fenster heimlich öffnen", txt: "Du sorgst für Frischluft. Frau Frost niest und wirft dir böse Blicke zu.", f: 5, a: 5, c: 0 },
                { btn: "In Badehose arbeiten", txt: "Es sind 35 Grad im Büro. Du schwitzt. Die Produktivität liegt bei Null.", f: 10, a: 10, c: 5 }
            ]
        },
		{ 
            id: "mail_chain_letter",
            sender: "Bernd (Vertrieb)", 
            subj: "FWD: FWD: Unbedingt lesen sonst Unglück!!!",
            body: "Das ist der Geist des toten Servers! 👻 Schicke diese Mail an 10 Kollegen, oder dein WLAN wird für immer langsam sein! Ignorier das nicht, meinem Cousin ist das passiert!!!",
            opts: [
                { btn: "An Alle weiterleiten", txt: "Du hast den Mailserver lahmgelegt. 500 Leute hassen dich jetzt.", f: 0, a: 20, c: 20 },
                { btn: "Bernd sperren", txt: "Bernd landet auf der Blacklist. Endlich Ruhe.", f: 0, a: -5, c: 0 }
            ]
        },
		{ 
            id: "mail_bonus_fail",
            sender: "Der Vorstand", 
            subj: "WICHTIG: Ihr diesjähriger Bonus",
            body: "Liebe Mitarbeiter, aufgrund des Rekordumsatzes haben wir beschlossen, Ihnen etwas zurückzugeben! Statt einer langweiligen Geldprämie erhält jeder von Ihnen... einen Gutschein für 5% Rabatt in der Kantine (gültig nur Montags)! Danke für Ihren Einsatz!",
            opts: [
                { btn: "Mail ausdrucken & verbrennen", txt: "Das kleine Feuer im Mülleimer wärmt dein kaltes Herz. Aggro sinkt leicht.", f: 5, a: -10, c: 0 },
                { btn: "Dankesmail schreiben", txt: "Du schleimst dich ein. Die Kollegen nennen dich 'Verräter', aber der Chef merkt es sich positiv.", f: 0, a: 10, c: -10 }
            ]
        },
        { 
            id: "mail_phish_iphone",
            sender: "Amaz0n-Gewinnspiel-Official", 
            subj: "HERZLICHEN GLÜCKWUNSCH! iPhone 15 gewonnnen!!!",
            body: "Hallo Kunde. Du wurdest ausgewählt! Klicke HIER um dein iPhone 15 Pro Max (Titan) sofort zu erhalten! Nur noch 5 Minuten gültig! 📱🎁",
            opts: [
                { btn: "KLICKEN! Her damit!", txt: "Ein Fenster poppt auf: 'DIES WAR EIN PHISHING-TEST DER IT! SIE SIND DURCHGEFALLEN!' Du musst jetzt ein 4-stündiges Security-Video gucken. Dein Tag ist gelaufen.", f: -20, a: 50, c: 20 },
                { btn: "Als Phishing melden", txt: "Die IT antwortet: 'Gut gemacht, Müller. Sie haben als einziger nicht geklickt.' Ein Fleißsternchen im System.", f: 0, a: -5, c: -10 }
            ]
        },
		{ 
            id: "mail_cleaner_fridge",
            sender: "Reinigungs-Team", 
            subj: "Kühlschrank Ebene 3 (DRINGEND)",
            body: "Wir weigern uns, den Kühlschrank im 3. Stock zu öffnen. Da drin ist eine Tupperdose, die... atmet. Es wachsen bereits Pilze aus der Dichtung. Wer das bis 12 Uhr nicht entfernt, rufen wir den Kammerjäger (auf Kosten der Abteilung)!",
            opts: [
                { btn: "Mutig entsorgen", txt: "Du öffnest die Dose. Der Gestank ist so bestialisch, dass du dich fast übergeben musst. Du bist für den Rest des Tages grün im Gesicht. Aber die Gefahr ist gebannt.", f: -5, a: 20, c: 0 },
                { btn: "Tür mit Klebeband versiegeln", req: "tape", txt: "Du klebst die Tür einfach zu und schreibst 'DEFEKT' drauf. Problem für die Ewigkeit konserviert.", f: 5, a: -5, c: 0 },
                { btn: "Ignorieren", txt: "Nicht dein Essen, nicht dein Pilz.", f: 5, a: 0, c: 0 }
            ]
        },
		{ 
            id: "mail_thought_parking",
            sender: "Du (Gedanken)", 
            subj: "Falschparker auf Parkplatz 42",
            body: "Du schaust aus dem Fenster. Ein fetter, neuer Porsche SUV steht quer auf DEINEM Parkplatz! Dreistigkeit siegt?!",
            opts: [
                { btn: "Abschleppdienst rufen!", txt: "Der Abschlepper kommt und zieht den Porsche weg. Du fühlst Genugtuung. 10 Min später brüllt der CEO: 'WER HAT MEINEN LEIHWAGEN ABSCHLEPPEN LASSEN?!' Oh Mist...", f: 0, a: 50, c: 80 },
                { btn: "Scheibenwischer hochklappen", txt: "Ein kleiner, passiv-aggressiver Racheakt. Fühlt sich gut an und keiner hat's gesehen.", f: 0, a: -10, c: 0 }
            ]
        },
		{ 
            id: "mail_chantal_printername",
            sender: "Chantal (Marketing)", 
            subj: "Brainstorming: Name für den Drucker 🖨️✨",
            body: "Heeey Team! Wir wollen den Druckern 'Persönlichkeit' geben! Bitte kommt alle in den Meetingraum 'Unicorn' und bringt Ideen mit! Es gibt vegane Kekse (aus Sägemehl)!",
            opts: [
                { btn: "Hingehen & 'Drucki McDruckface' vorschlagen", txt: "Alle starren dich an. Chantal findet es 'uninspiriert'. Du hast 30 Minuten Lebenszeit verschwendet.", f: 10, a: 15, c: 0 },
                { btn: "Antworten: 'Papierstau-Paulus'", txt: "Deine E-Mail wird ignoriert, aber du musstest wenigstens nicht aufstehen.", f: 5, a: -5, c: 0 }
            ]
        },
        { 
            id: "mail_gdpr_request",
            sender: "Ehemaliger Mitarbeiter (via Anwalt)", 
            subj: "DSGVO Auskunft Art. 15",
            body: "Hiermit fordere ich Sie auf, mir binnen Frist ALLE Daten zu senden, die Sie über mich gespeichert haben. Auch Chat-Logs und interne Notizen!",
            opts: [
                { btn: "Alles senden (inkl. Chat-Logs)", txt: "Du schickst ihm wirklich alles. Auch die Logs, wo der Chef ihn 'Niete' nennt. Er verklagt die Firma wegen Mobbing. Der Chef tobt.", f: -10, a: 20, c: 60 },
                { btn: "Standard-Textbaustein senden", txt: "Du schickst ein nichtssagendes PDF: 'Wir haben leider keine relevanten Daten mehr'. Er gibt Ruhe. Bürokratie besiegt.", f: 5, a: -5, c: -5 }
            ]
        },
		{ 
            id: "mail_xmas_vote",
            sender: "Betriebsrat (Umfrage)", 
            subj: "Weihnachtsfeier: Bowling oder Oper?",
            body: "Liebe Kollegen, für die diesjährige Feier haben wir zwei Optionen: \n1. 'Cosmic Bowling' (mit Schwarzlicht und Dosenbier) \n2. 'Die Zauberflöte' (3,5 Stunden, Anzugpflicht). \nBitte abstimmen!",
            opts: [
                { btn: "Team 'Bowling'", txt: "Du stimmst für Bowling. Die IT jubelt. Chantal ist entsetzt ('Meine Schuhe!'). Stimmung +1.", f: 5, a: -5, c: 0 },
                { btn: "Team 'Oper'", txt: "Du stimmst für Kultur. Niemand mag dich mehr. Kevin nennt dich 'Streber'.", f: 0, a: 5, c: 5 },
                { btn: "Reply-All: 'Saufen!'", txt: "Egon antwortet: 'Mein Mann!'. Der Chef mahnt dich ab wegen 'unprofessioneller Kommunikation'.", f: 0, a: 10, c: 15 },
                { btn: "Löschen", txt: "Dir egal. Hauptsache es gibt Essen.", f: 0, a: 0, c: 0 }
            ]
        },
        { 
            id: "mail_egon_ball",
            sender: "Hausmeister Egon", 
            subj: "Fundsache: Roter Ball",
            body: "Moin. Hab beim Fegen so nen roten Knet-Ball gefunden. Klebt unterm Heizkörper im Flur. Vermisst den wer? Wenn nicht, kriegt ihn mein Dackel.",
            opts: [
                { 
                    btn: "Antwort: 'MEINER! Ich hol ihn ab!'",
                    loot: "stressball", 
                    m: 5, f: 0, a: -5, c: 0, 
                    r: "Du rennst schnell runter zu Egon, bevor der Hund zuschnappt. Der Ball ist voller Staub, aber noch gut. Inventar +1." 
                },
                { 
                    btn: "Antwort: 'Gönn ihn dem Dackel'", 
                    m: 0, f: 5, a: 0, c: 0, 
                    r: "Egon freut sich: 'Der Waldi dankt!'. Du hast ein gutes Werk getan. Der Dackel liebt dich jetzt." 
                },
                { 
                    btn: "Ignorieren", 
                    m: 0, f: 0, a: 0, c: 0, 
                    r: "Die Mail verschwindet im Papierkorb. Der Ball verschwindet im Dackel. Chance vertan." 
                }
            ]
        },
        { 
            id: "mail_vacation_denied",
            sender: "HR (Automated)", 
            subj: "Ihr Urlaubsantrag 2028",
            body: "Status-Update zu Ihrem Antrag 'Sommerurlaub': ABGELEHNT. \nBegründung: 'Zu dieser Zeit könnte theoretisch ein Server ausfallen. Wir brauchen Sie stand-by.'",
            opts: [
                { btn: "Widerspruch einlegen", m: 30, f: -10, a: 20, c: 10, r: "Du schreibst eine zweiseitige Mail mit Gesetzes-Auszügen. HR antwortet nicht, aber du fühlst dich im Recht." },
                { btn: "Krankenschein planen", m: 5, f: 10, a: -10, c: 0, r: "Wenn du nicht frei kriegst, bist du halt 'krank'. Du grinst böse und planst deinen 'Husten'." },
                { btn: "Stillschweigend hinnehmen", m: 0, f: 0, a: 10, c: -5, r: "Du starrst die Wand an. Die Wand starrt zurück. Deine Seele stirbt ein wenig." }
            ]
        },
        { 
            id: "mail_chantal_cat",
            sender: "Chantal (Marketing)", 
            subj: "Katzen-Content für die Website? 😻",
            body: "Heeeey! Ich habe meine Katze 'Prinzessin' als Firmen-Maskottchen fotografiert! Sie sitzt auf einem Server im Rack! Ist das nicht cute?! Soll ich das live stellen?",
            opts: [
                { btn: "NEIN! Statische Aufladung!", m: 5, f: 0, a: 10, c: 0, r: "Du rennst hin. Katze weg, aber Server voller Haare. Chantal schmollt: 'Du hasst Tiere!'" },
                { btn: "Antwort: 'Klar, sieht super aus!'", m: 5, f: 10, a: -5, c: 20, r: "Das Bild geht viral. 'Firma setzt auf Cat-Content'. Kunden finden es unprofessionell, aber der Traffic steigt massiv. Der Chef ist verwirrt." },
                { btn: "Ignorieren", m: 0, f: 5, a: 0, c: 30, r: "Sie lädt es einfach hoch. Der Server überhitzt kurz darauf wegen Katzenhaaren im Lüfter. Du musst es später fixen." }
            ]
        },
        { 
            id: "mail_ticket_rating",
            sender: "IT-Support (Ticket-Bot)", 
            subj: "Bitte bewerten Sie Ihre Lösung",
            body: "Sie haben das Ticket 'PC brennt' geschlossen. Wie zufrieden waren Sie mit Ihrer eigenen Leistung? \n(Stern 1-5)",
            opts: [
                { btn: "Mir selbst 5 Sterne geben", m: 2, f: 5, a: -5, c: 0, r: "Du klopfst dir selbst auf die Schulter. 'Guter Mann, dieser Müller.' Das System speichert: 'Exzellenter Mitarbeiter'." },
                { btn: "Mir selbst 1 Stern geben", m: 2, f: 0, a: 5, c: 0, r: "Du bist ehrlich zu dir selbst. Das war ziemlicher Pfusch. Aber immerhin brennt es nicht mehr." },
                { btn: "Dem Bot antworten", m: 5, f: 0, a: 0, c: 5, r: "Du schreibst eine Antwort. Der Bot antwortet dir automatisch. Du antwortest wieder. Der Mailserver kollabiert unter der Feedback-Schleife. Ups." }
            ]
        },
        { 
            id: "mail_ceo_blockchain",
            sender: "Dr. Wichtig (CEO)", 
            subj: "Idee: Blockchain-Kaffeemaschine",
            body: "Müller! Ich habe gelesen, Blockchain ist die Zukunft. Bauen Sie das in die Kaffeemaschine ein! Jeder Espresso soll als NFT gemintet werden! Deadline: Morgen!",
            opts: [
                { 
                    btn: "Antwort: 'Das ist technisch unmöglich'", 
                    m: 5, f: 0, a: 10, c: 10, 
                    r: "Er nennt dich enttäuscht eine 'Innovationsbremse'. Dein Radar steigt, weil du 'keine Visionen hast'." 
                },
                { 
                    btn: "Antwort: 'Geniale Idee, wird umgesetzt!'", 
                    m: 5, f: 10, a: 0, c: 0, 
                    r: "Du klebst einfach einen Sticker 'Blockchain Certified' auf den Wassertank. Er merkt den Unterschied nicht, findet den Kaffee aber plötzlich 'dezentraler'." 
                },
                { 
                    btn: "Einfach ignorieren", 
                    m: 0, f: 0, a: 0, c: 20, 
                    r: "Du tust so, als hättest du die Mail nie bekommen. Riskant. Wenn er morgen nachfragt, hast du ein echtes Problem." 
                }
            ]
        },
        { 
            id: "mail_canteen_menu",
            sender: "Kantine (Newsletter)", 
            subj: "Speiseplan: 'Woche der Experimente'",
            body: "Mo: Grünkohl mit Nutella \nDi: Pizza 'Hawaii' (nur Ananas, kein Schinken) \nMi: Überraschungseintopf (Reste von Mo+Di) \nDo: Schnitzel (vegan, aus Pappe) \nFr: Fischstäbchen-Auflauf",
            opts: [
                { btn: "Ausdrucken & Warnen", m: 5, f: 0, a: 5, c: 0, r: "Du hängst den Plan als Warnung im Flur auf. Du hast Leben gerettet." },
                { btn: "Fastenwoche planen", m: 0, f: 0, a: 5, c: 0, r: "Du beschließt, diese Woche nichts zu essen. Dein Magen knurrt." },
                { btn: "Auf 'Überraschung' freuen", m: 0, f: 5, a: 0, c: 0, r: "Du hast einen Magen aus Stahl. Respekt." }
            ]
        },
        {
        id: "mail_yogurt_1",
        sender: "Sandra (Buchhaltung)",
        subj: "WER WAR DAS?!",
        body: "In meinem Joghurt ('Der Große Bauer', Erdbeer) steckt ein Löffel. Er ist halb leer. Wer macht sowas?! Ich rufe gleich die Polizei!",
        opts: [
            { btn: "Geständnis: 'Ich hatte Unterzucker.'", txt: "Sandra schreit durch den Flur. Aber sie schätzt die Ehrlichkeit.", f: 0, a: 5, c: 0, nextEmail: "mail_yogurt_2" },
            { btn: "Lüge: 'Das war der Putzmann.'", txt: "Du schiebst es auf Unschuldige. Dein Radar steigt.", f: 0, a: -5, c: 10 }
        ]
    },
    {
        id: "mail_yogurt_2",
        linked: true,
        sender: "Sandra (Buchhaltung)",
        subj: "Re: WER WAR DAS?!",
        body: "Unterzucker?! Das war mein Mittagessen! Du schuldest mir einen Döner. Mit Schafskäse. Sofort.",
        opts: [
            { btn: "Döner kaufen", txt: "Du kaufst ihr einen Döner. Frieden ist teuer.", f: -5, a: -10, c: 0 }
        ]
    },

    {
        id: "mail_update_1",
        sender: "IT-System",
        subj: "WICHTIG: Update 492.21.b erzwingen?",
        body: "Ihr PC muss neu gestartet werden, um 'Windows Calculator' zu aktualisieren. Geschätzte Dauer: 4 Stunden.",
        opts: [
            { btn: "Jetzt neu starten", txt: "Du starrst 4 Stunden auf einen Ladebalken. Herrlich ruhig.", f: 20, a: -10, c: 0, nextEmail: "mail_update_2" },
            { btn: "Später erinnern (in 100 Jahren)", txt: "Du klickst das Fenster weg. Es kommt in 5 Minuten wieder.", f: 0, a: 5, c: 0 }
        ]
    },
    {
        id: "mail_update_2",
        linked: true,
        sender: "IT-System",
        subj: "Update Fehlgeschlagen",
        body: "Fehler 0x80004. Das Update wurde rückgängig gemacht. Ihr Taschenrechner ist nun deinstalliert. Bitte wenden Sie sich an den Administrator (Sie selbst).",
        opts: [
            { btn: "Ich hasse mein Leben.", txt: "Vier Stunden für nichts.", f: 0, a: 15, c: 0 }
        ]
    },

    {
        id: "mail_noise_1",
        sender: "Kollege Bernd",
        subj: "Deine Musik...",
        body: "Moin, wir hören alle deinen 'Death Metal'-Mix durch die Kopfhörer. Könntest du das leiser machen? Meine Pflanzen gehen schon ein.",
        opts: [
            { btn: "Leiser machen", txt: "Du bist rücksichtsvoll. Langweilig, aber nett.", f: 0, a: -5, c: 0 },
            { btn: "Lauter drehen", txt: "Jetzt hören sie es wenigstens in guter Qualität.", f: 5, a: 0, c: 5, nextEmail: "mail_noise_2" }
        ]
    },
    {
        id: "mail_noise_2",
        linked: true,
        sender: "Kollege Bernd",
        subj: "Re: Deine Musik...",
        body: "Okay, das reicht. Ich habe gerade dein LAN-Kabel durchgeschnitten. Genieße die Stille.",
        opts: [
            { btn: "Mist.", txt: "Kein Internet. Du musst arbeiten (oder so tun).", f: -10, a: 10, c: 0 }
        ]
    },

    {
        id: "mail_bet_1",
        sender: "Kevin (Privat)",
        subj: "Wettbüro eröffnet! 💰",
        body: "Hey Chef, wir wetten gerade, wann der neue Projektleiter seinen ersten Nervenzusammenbruch hat. Einsatz: 5€. Machst du mit?",
        opts: [
            { btn: "Ich setze auf 'Heute'", txt: "Du bist dabei. Risiko!", f: 5, a: 0, c: 5, nextEmail: "mail_bet_win" },
            { btn: "Ich setze auf 'Niemals'", txt: "Optimist. Du verlierst sofort.", f: 0, a: 0, c: -5 }
        ]
    },
    {
        id: "mail_bet_win",
        linked: true,
        sender: "Kevin (Privat)",
        subj: "GEWONNEN!",
        body: "Alter! Er hat gerade im Meeting geweint, weil der Beamer nicht ging! Du hast den Pott gewonnen! Hier sind 20€ (in Kantinen-Gutscheinen).",
        opts: [
            { btn: "Easy Money.", txt: "Du fühlst dich wie ein Orakel.", f: 10, a: -5, c: 0 }
        ]
    },

    {
        id: "mail_plant_1",
        sender: "Gabi (Empfang)",
        subj: "Mein Bonsai 🌳",
        body: "Hat jemand meinen Bonsai gegossen? Er sieht so... braun aus. Und er riecht nach Kaffee.",
        opts: [
            { btn: "Ich wollte nur helfen!", txt: "Kaffee ist doch Dünger, oder?", f: 0, a: 0, c: 5, nextEmail: "mail_plant_2" },
            { btn: "Ich war's nicht.", txt: "Lüge. Dein Becher steht noch daneben.", f: 0, a: 5, c: 0 }
        ]
    },
    {
        id: "mail_plant_2",
        linked: true,
        sender: "Gabi (Empfang)",
        subj: "Re: Mein Bonsai 🌳",
        body: "Du hast ihn umgebracht! Das war ein Erbstück! Er war 40 Jahre alt! Du Monster!",
        opts: [
            { btn: "Ups.", txt: "Gabi spricht nicht mehr mit dir. Endlich Ruhe am Empfang.", f: 5, a: 0, c: 0 }
        ]
    },

    {
        id: "mail_cc_fail_1",
        sender: "Vertriebsleiter Markus",
        subj: "Q3 Strategie (Top Secret)",
        body: "Hallo Team, hier ist der Plan, wie wir die Kunden über den Tisch ziehen. Bitte NICHT weiterleiten!",
        opts: [
            { btn: "Reply All: 'Klingt illegal.'", txt: "Du hast das an alle Kunden im CC geschickt...", f: 0, a: 20, c: 20, nextEmail: "mail_cc_fail_2" },
            { btn: "Löschen", txt: "Besser ist das.", f: 0, a: -5, c: 0 }
        ]
    },
    {
        id: "mail_cc_fail_2",
        linked: true,
        sender: "Rechtsabteilung",
        subj: "SOFORTIGE VORLADUNG",
        body: "Herr Müller, erscheinen Sie sofort im Büro. Bringen Sie Ihren Anwalt mit. Und einen Karton für Ihre Sachen.",
        opts: [
            { btn: "War schön mit euch.", txt: "Maximaler Stress.", f: -20, a: 50, c: 20 }
        ]
    },

    {
        id: "mail_survey_1",
        sender: "HR Survey Bot",
        subj: "Mitarbeiterzufriedenheit",
        body: "Wie glücklich sind Sie auf einer Skala von 1 (Sehr) bis 10 (Extrem)?",
        opts: [
            { btn: "10 (Extrem)", txt: "Du lügst das System an. Der Bot freut sich.", f: 5, a: -5, c: 0, nextEmail: "mail_survey_2" },
            { btn: "0 (Hilfe)", txt: "Fehler: Wert nicht zulässig.", f: 0, a: 5, c: 0 }
        ]
    },
    {
        id: "mail_survey_2",
        linked: true,
        sender: "HR Survey Bot",
        subj: "Danke!",
        body: "Toll! Da Sie so glücklich sind, haben wir Ihre Gehaltserhöhung gestrichen. Glückliche Mitarbeiter brauchen kein Geld!",
        opts: [
            { btn: "Ich hasse euch.", txt: "Ironie des Schicksals.", f: 0, a: 15, c: 0 }
        ]
    },

    {
        id: "mail_coffee_1",
        sender: "Küche",
        subj: "Kaffeemaschine DEFEKT",
        body: "Jemand hat Milch in den Wassertank gefüllt. Die Maschine macht jetzt Käse.",
        opts: [
            { btn: "Ich repariere das.", txt: "Du opferst dich für das Team.", f: -10, a: -10, c: 0, nextEmail: "mail_coffee_2" },
            { btn: "Ich trinke Tee.", txt: "Du Monster.", f: 5, a: 5, c: 0 }
        ]
    },
    {
        id: "mail_coffee_2",
        linked: true,
        sender: "Alle Kollegen",
        subj: "DANKE!!",
        body: "Du bist unser Held! Der Kaffee fließt wieder! Wir würden dir ein Denkmal bauen, haben aber kein Budget.",
        opts: [
            { btn: "Gern geschehen.", txt: "Du fühlst dich gebraucht. Radar sinkt.", f: 0, a: -20, c: -10 }
        ]
    },

    {
        id: "mail_lottery_1",
        sender: "Tippgemeinschaft",
        subj: "Jackpot 90 Millionen!",
        body: "Wir sammeln für den Eurojackpot. 10€ Einsatz. Wenn wir gewinnen, kündigen wir alle!",
        opts: [
            { btn: "Bin dabei! (10€)", txt: "Die Hoffnung stirbt zuletzt.", f: 5, a: 0, c: 0, nextEmail: "mail_lottery_2" },
            { btn: "Glücksspiel ist Sünde.", txt: "Du sparst Geld und Spaß.", f: 0, a: 5, c: 0 }
        ]
    },
    {
        id: "mail_lottery_2",
        linked: true,
        sender: "Tippgemeinschaft",
        subj: "Ergebnis...",
        body: "Wir haben gewonnen! ... 12,50€. Jeder bekommt 40 Cent zurück. Wir bleiben wohl doch hier. Arbeitet weiter.",
        opts: [
            { btn: "Na toll.", txt: "Die Realität kickt rein.", f: -5, a: 5, c: 0 }
        ]
    },

    {
        id: "mail_borrow_1",
        sender: "Chantal",
        subj: "Tacker ausgeliehen",
        body: "Hii, hab mir kurz deinen Tacker geborgt. Meiner ist... irgendwie explodiert. Bringe ihn gleich zurück! xoxo",
        opts: [
            { btn: "Das war gestern!", txt: "Du forderst dein Eigentum zurück.", f: 0, a: 5, c: 0, nextEmail: "mail_borrow_2" },
            { btn: "Behalt ihn.", txt: "Du hast eh nichts zu tackern.", f: 5, a: 0, c: 0 }
        ]
    },
    {
        id: "mail_borrow_2",
        linked: true,
        sender: "Chantal",
        subj: "Re: Tacker ausgeliehen",
        body: "Ups... 😬 Er ist mir ins Klo gefallen. Sorryyy! Ich kauf dir einen neuen! (Irgendwann)",
        opts: [
            { btn: "Atmen...", txt: "Aggro steigt. Chantal ist dein Erzfeind.", f: 0, a: 10, c: 0 }
        ]
    },
    {
        id: "mail_cleaner_1",
        sender: "Olga (Reinigung)",
        subj: "Stecker gezogen",
        body: "Hallo, ich musste Staubsaugen. Habe den Stecker von dem lauten Kasten mit den vielen Lichtern gezogen. Ist jetzt schön leise. Hoffe okay?",
        opts: [
            { btn: "Lauf zum Serverraum!", txt: "Panik! Das war der Hauptserver!", f: -10, a: 20, c: 10, nextEmail: "mail_cleaner_2" },
            { btn: "Ignorieren", txt: "Wahrscheinlich war es nur die Kaffeemaschine.", f: 5, a: 0, c: -5 }
        ]
    },
    {
        id: "mail_cleaner_2",
        linked: true,
        sender: "System Alert",
        subj: "CRITICAL FAILURE",
        body: "Server 'BACKUP_MASTER' nicht erreichbar. Uptime: 0 Sekunden. Datenverlust droht.",
        opts: [
            { btn: "Weinen.", txt: "Der Tag ist gelaufen. Olga hat die Firma gelöscht.", f: -20, a: 20, c: 20 }
        ]
    },

    {
        id: "mail_ceo_scam_1",
        sender: "Dr. Wlchtig (CEO)",
        subj: "Dringende Überweisung",
        body: "Hallo Herr Müller, ich sitze in einem geheimen Meeting. Bitte kaufen Sie sofort 10x 100€ Apple Gift Cards und schicken Sie mir die Codes. Sagen Sie niemandem etwas!",
        opts: [
            { btn: "Klar, Chef! (Kaufen)", txt: "Du fällst auf den ältesten Trick rein.", f: 0, a: 10, c: 0, nextEmail: "mail_ceo_scam_fail" },
            { btn: "Antwort: 'Netter Versuch.'", txt: "Du hast den Betrüger durchschaut.", f: 0, a: -5, c: 0, nextEmail: "mail_ceo_scam_win" }
        ]
    },
    {
        id: "mail_ceo_scam_fail",
        linked: true,
        sender: "Dr. Wichtig (Echt)",
        subj: "FWD: Dringende Überweisung",
        body: "Warum bucht die Buchhaltung 1000€ von Ihrer Kostenstelle ab?! Kommen Sie in mein Büro. Sofort.",
        opts: [
            { btn: "Oh nein.", txt: "Das wird teuer für dich.", f: 0, a: 20, c: 20 }
        ]
    },
    {
        id: "mail_ceo_scam_win",
        linked: true,
        sender: "Dr. Wlchtig (CEO)",
        subj: "Re: Dringende Überweisung",
        body: "F*** dich du kleiner IT-Nerd! Ich finde dich!",
        opts: [
            { btn: "Löschen.", txt: "Ein Sieg für die Intelligenz.", f: 5, a: -5, c: -5 }
        ]
    },

    {
        id: "mail_meeting_1",
        sender: "Agile Coach Torben",
        subj: "Meeting: 'Feel Good Management'",
        body: "Einladung: Wir wollen 4 Stunden lang über unsere Gefühle tanzen. Anwesenheitspflicht für alle!",
        opts: [
            { btn: "Teilnehmen", txt: "Du tanzt deinen Namen. Es ist erniedrigend, aber entspannend.", f: 20, a: -10, c: 0, nextEmail: "mail_meeting_2" },
            { btn: "Absagen: 'Server brennt'", txt: "Du drückst dich vor der Arbeit.", f: 0, a: 0, c: 5 }
        ]
    },
    {
        id: "mail_meeting_2",
        linked: true,
        sender: "Agile Coach Torben",
        subj: "Feedback Runde",
        body: "Toll, wie du dich geöffnet hast! Deine Aura war sehr... grau. Wir müssen an deinem Chakra arbeiten.",
        opts: [
            { btn: "Lass mich in Ruhe.", txt: "Nie wieder.", f: 0, a: 5, c: 0 }
        ]
    },

    {
        id: "mail_video_1",
        sender: "Verteiler: Alle",
        subj: "FWD: FWD: Lustiges Video!! 😂",
        body: "Schaut euch das an! Die Katze fällt vom Tisch! (Anhang: lustig.mp4 - 450 MB)",
        opts: [
            { btn: "Ansehen", txt: "Du lachst. Aber das Netzwerk lahmt.", f: 5, a: -5, c: 0 },
            { btn: "Absender sperren", txt: "Das Netzwerk ist dir heilig. Der User ist sauer.", f: 0, a: 5, c: 0, nextEmail: "mail_video_2" }
        ]
    },
    {
        id: "mail_video_2",
        linked: true,
        sender: "Kollege Bernd",
        subj: "Mein Account geht nicht?!",
        body: "Ich kann keine Mails mehr senden! Hast du was gemacht? Ich wollte nur Freude verbreiten!",
        opts: [
            { btn: "Freude ist verboten.", txt: "Du fühlst dich wie ein Diktator. Gut.", f: 0, a: -5, c: -5 }
        ]
    },

    {
        id: "mail_ac_1",
        sender: "Facility Mgt",
        subj: "Klimaanlage defekt",
        body: "Die Klimaanlage kühlt nicht mehr. Sie heizt jetzt. Raumtemperatur: 38 Grad. Viel Erfolg.",
        opts: [
            { btn: "Hose ausziehen", txt: "Unter dem Tisch sieht es keiner. (Hoffentlich).", f: 10, a: -5, c: 10, nextEmail: "mail_ac_pants" },
            { btn: "Leiden", txt: "Du schwitzt auf die Tastatur.", f: -10, a: 10, c: 0 }
        ]
    },
    {
        id: "mail_ac_pants",
        linked: true,
        sender: "HR (Sabine)",
        subj: "Kleiderordnung",
        body: "Herr Müller, wir haben Beschwerden erhalten. Bitte ziehen Sie Ihre Hose wieder an. Das hier ist kein FKK-Strand.",
        opts: [
            { btn: "Schade.", txt: "Es war so schön luftig.", f: -5, a: 5, c: 5 }
        ]
    },

    {
        id: "mail_key_1",
        sender: "Empfang",
        subj: "Schlüssel gefunden",
        body: "Ein Schlüsselbund mit einem 'My Little Pony' Anhänger wurde gefunden. Wem gehört der?",
        opts: [
            { btn: "Das ist meiner!", txt: "Peinlich. Du holst ihn rot angelaufen ab.", f: 0, a: 5, c: 0, nextEmail: "mail_key_2" },
            { btn: "Schweigen", txt: "Du kommst heute nicht in deine Wohnung.", f: 0, a: 10, c: 0 }
        ]
    },
    {
        id: "mail_key_2",
        linked: true,
        sender: "Gabi (Empfang)",
        subj: "Re: Schlüssel gefunden",
        body: "Hier ist er. Süßer Anhänger. Passt zu dir. *kicher*",
        opts: [
            { btn: "Er gehört meiner Nichte!", txt: "Lüge. Gabi glaubt dir kein Wort.", f: 0, a: 5, c: 0 }
        ]
    },

    {
        id: "mail_print_color_1",
        sender: "Controlling",
        subj: "Farb-Druck Verbot",
        body: "Ab sofort sind Farbdrucke verboten! Jede farbige Seite kostet 5 Cent und wird vom Gehalt abgezogen.",
        opts: [
            { btn: "Alles in S/W drucken", txt: "Die Welt ist grau. Deine Seele auch.", f: 0, a: 5, c: 0 },
            { btn: "Trotzdem Farbe drucken", txt: "Rebellion! Du druckst ein Regenbogen-Bild.", f: 5, a: -5, c: 5, nextEmail: "mail_print_color_2" }
        ]
    },
    {
        id: "mail_print_color_2",
        linked: true,
        sender: "Controlling",
        subj: "Gehaltsabrechnung Korrektur",
        body: "Abzug für private Farbdrucke (Motiv: Regenbogen): 0,05€. Wir haben Sie im Auge.",
        opts: [
            { btn: "Das war es wert.", txt: "Du hängst das Bild stolz auf.", f: 5, a: -5, c: 0 }
        ]
    },

    {
        id: "mail_dog_1",
        sender: "Chantal",
        subj: "Darf Bello mitkommen? 🐶",
        body: "Mein Hundesitter ist krank. Darf Bello heute ins Büro? Er beißt nur, wenn er Angst riecht.",
        opts: [
            { btn: "Ja, ich liebe Hunde!", txt: "Bello kommt. Er riecht streng.", f: 5, a: -5, c: 0, nextEmail: "mail_dog_bite" },
            { btn: "Nein, Allergie.", txt: "Chantal ist beleidigt.", f: 0, a: 5, c: 0 }
        ]
    },
    {
        id: "mail_dog_bite",
        linked: true,
        sender: "Chantal",
        subj: "Ups...",
        body: "Sorry, dass er dein LAN-Kabel gefressen und dich gebissen hat. Er hat wohl deine Angst (vor Arbeit) gerochen!",
        opts: [
            { btn: "Arzt rufen.", txt: "Du brauchst ein Pflaster und ein neues Kabel.", f: -10, a: 10, c: 0 }
        ]
    },

    {
        id: "mail_fridge_1",
        sender: "Küche",
        subj: "Schimmel-Alarm",
        body: "Im Kühlschrank lebt etwas. Es hat Fell und atmet. Wer seine Tupperdose bis 12 Uhr nicht holt, wird gefeuert.",
        opts: [
            { btn: "Meine Dose holen", txt: "Du entsorgst das Experiment in Bio-Hazard Manier.", f: -5, a: 0, c: 0, nextEmail: "mail_fridge_2" },
            { btn: "Nicht mein Problem", txt: "Du hoffst, dass es nicht deine Dose ist.", f: 0, a: 0, c: 5 }
        ]
    },
    {
        id: "mail_fridge_2",
        linked: true,
        sender: "Küche",
        subj: "Danke",
        body: "Danke fürs Entsorgen. Wir dachten kurz, es greift uns an. Der Kühlschrank ist wieder sicher.",
        opts: [
            { btn: "Held der Arbeit.", txt: "Du hast die Menschheit gerettet.", f: 5, a: -5, c: -5 }
        ]
    },

    {
        id: "mail_software_1",
        sender: "Horst (Vertrieb)",
        subj: "Tolle Gratis-Software!",
        body: "Hab mir 'SpeedUpMyPC_Free.exe' installiert. Mein PC ist jetzt viel bunter! Soll ich dir den Link schicken?",
        opts: [
            { btn: "PC sofort vom Netz nehmen!", txt: "Du rennst zu Horst und ziehst den Stecker.", f: -10, a: 10, c: -10, nextEmail: "mail_software_2" },
            { btn: "Mach nur...", txt: "Du willst die Welt brennen sehen.", f: 5, a: -10, c: 20 }
        ]
    },
    {
        id: "mail_software_2",
        linked: true,
        sender: "System",
        subj: "Bedrohungs-Abwehr",
        body: "145 Viren, 20 Trojaner und 1 Krypto-Miner entfernt. Horst hat Schreibverbot für 24 Stunden.",
        opts: [
            { btn: "Gut so.", txt: "Ein weiterer Sieg für die IT.", f: 0, a: -5, c: -10 }
        ]
    },
    {
        id: "mail_canteen_1",
        sender: "Kantine",
        subj: "Heute: 'Topf der Überraschung'",
        body: "Liebe Esser, wir haben alle Reste der Woche in einen Topf geworfen. Es ist grau und blubbert. Preis: 2,50€.",
        opts: [
            { btn: "Ich bin mutig! (Essen)", txt: "Es schmeckt nach Fisch und Pudding.", f: 0, a: 10, c: 0, nextEmail: "mail_canteen_2" },
            { btn: "Ich faste lieber.", txt: "Du hungerst. Dein Magen knurrt laut.", f: 0, a: 5, c: 0 }
        ]
    },
    {
        id: "mail_canteen_2",
        linked: true,
        sender: "Kantine",
        subj: "Re: Heute: 'Topf der Überraschung'",
        body: "Kleine Warnung: Falls Sie Halluzinationen bekommen, das ist normal. Das liegt am Pilz-Risotto vom Montag.",
        opts: [
            { btn: "Die Wände schmelzen...", txt: "Du bist für 2 Stunden 'arbeitsunfähig' (high).", f: 15, a: -5, c: 0 }
        ]
    },

    {
        id: "mail_tiktok_1",
        sender: "Marketing (Chantal)",
        subj: "Wir sind jetzt auf TikTok! 💃",
        body: "Heyy! Wir müssen 'jung und dynamisch' wirken! Kommt alle in den Flur für die 'Corporate Dance Challenge'!",
        opts: [
            { btn: "Mitmachen (Tanzen)", txt: "Du machst dich zum Affen. Chantal filmt alles.", f: 5, a: -5, c: 0, nextEmail: "mail_tiktok_2" },
            { btn: "Verstecken", txt: "Du schließt dich im Klo ein.", f: 0, a: 0, c: 0 }
        ]
    },
    {
        id: "mail_tiktok_2",
        linked: true,
        sender: "Marketing (Chantal)",
        subj: "VIRAL!!!",
        body: "OMG! Dein 'Roboter-Tanz' hat 1 Million Views! Die Kommentare fragen, ob wir Hilfe brauchen. Aber: Fame ist Fame!",
        opts: [
            { btn: "Ich will Tantiemen.", txt: "Du bist jetzt das Gesicht der Firma (leider).", f: 0, a: -10, c: 10 }
        ]
    },

    {
        id: "mail_salary_1",
        sender: "HR System",
        subj: "Gehaltsabrechnung KORREKTUR",
        body: "Durch einen Fehler haben wir Ihnen diesen Monat 5.000€ zu viel überwiesen. Bitte nicht ausgeben!",
        opts: [
            { btn: "Sofort zurücküberweisen", txt: "Ehrlich währt am längsten. Langweiler.", f: 0, a: -5, c: 5, nextEmail: "mail_salary_honest" },
            { btn: "Geld behalten & schweigen", txt: "Du buchst sofort einen Flug auf die Malediven.", f: 0, a: 0, c: -20, nextEmail: "mail_salary_fraud" }
        ]
    },
    {
        id: "mail_salary_honest",
        linked: true,
        sender: "HR System",
        subj: "Danke",
        body: "Danke für die Ehrlichkeit. Als Belohnung bekommen Sie einen Firmen-Kugelschreiber (sobald Budget da ist).",
        opts: [
            { btn: "Juhu...", txt: "Du fühlst dich moralisch überlegen, aber arm.", f: 0, a: 0, c: 5 }
        ]
    },
    {
        id: "mail_salary_fraud",
        linked: true,
        sender: "Rechtsabteilung",
        subj: "LETZTE MAHNUNG",
        body: "Wir wissen, dass Sie das Geld haben. Wir pfänden jetzt Ihren Bürostuhl und Ihre Kaffeetasse.",
        opts: [
            { btn: "Mist.", txt: "Du sitzt jetzt auf dem Boden.", f: -5, a: 15, c: 0 }
        ]
    },

    {
        id: "mail_charging_1",
        sender: "Facility Mgt",
        subj: "E-Ladesäule blockiert",
        body: "Ein alter Diesel-Golf blockiert die einzige Ladesäule für E-Autos. Kennzeichen: DU-MM 123.",
        opts: [
            { btn: "Abschleppdienst rufen", txt: "Ordnung muss sein!", f: 0, a: -5, c: 0, nextEmail: "mail_charging_tow" },
            { btn: "Zettel dran: 'Idiot'", txt: "Passiv-aggressiv ist dein Stil.", f: 0, a: 5, c: 0 }
        ]
    },
    {
        id: "mail_charging_tow",
        linked: true,
        sender: "Hausmeister Egon",
        subj: "Mein Auto!!!",
        body: "Hömma! Wer hat meine Karre abschleppen lassen?! Ich wollte doch nur kurz Brötchen holen! Komm du mir nach unten!",
        opts: [
            { btn: "Verstecken.", txt: "Du hast dich mit Egon angelegt. Schlechte Idee.", f: 0, a: 10, c: 0 }
        ]
    },

    {
        id: "mail_lights_1",
        sender: "Smart Office App",
        subj: "Lichtsteuerung: Beta Test",
        body: "Sie haben nun Zugriff auf die Lampen in Ihrer Abteilung. Bitte verantwortungsvoll nutzen.",
        opts: [
            { btn: "Modus: 'Disco Strobe'", txt: "Alles blinkt bunt. Kollegen bekommen Anfälle.", f: 10, a: -5, c: 0, nextEmail: "mail_lights_disco" },
            { btn: "Modus: 'Dunkelkammer'", txt: "Licht aus. Zeit für ein Nickerchen.", f: 15, a: 0, c: 5, nextEmail: "mail_lights_dark" }
        ]
    },
    {
        id: "mail_lights_disco",
        linked: true,
        sender: "Dr. Wichtig",
        subj: "AUGENKREBS",
        body: "Wer macht hier Party?! Ich versuche zu telefonieren! Schalten Sie das sofort aus, oder ich schalte SIE aus!",
        opts: [
            { btn: "Sorry, Finger abgerutscht.", txt: "Schnell wieder auf 'Langweilig-Weiß' stellen.", f: 0, a: 10, c: 0 }
        ]
    },
    {
        id: "mail_lights_dark",
        linked: true,
        sender: "Kollege Bernd",
        subj: "Stromausfall?",
        body: "Es ist stockdunkel. Ich bin gerade gegen den Kopierer gelaufen. Bist du noch da?",
        opts: [
            { btn: "Pscht, ich schlafe.", txt: "Du genießt die Dunkelheit.", f: 10, a: 0, c: 0 }
        ]
    },

    {
        id: "mail_intern_db_1",
        sender: "Kevin (Azubi)",
        subj: "Frage zu 'DELETE ALL'",
        body: "Chef? Wenn da steht 'Wollen Sie wirklich die Kundendatenbank löschen?', muss ich da auf 'Ja' klicken, damit das Fenster weggeht? Es nervt.",
        opts: [
            { btn: "NEIN!!! UM GOTTES WILLEN!", txt: "Du rennst los.", f: -10, a: 20, c: 10, nextEmail: "mail_intern_db_panic" },
            { btn: "Sarkasmus: 'Klar, mach mal.'", txt: "Du denkst, er versteht den Witz.", f: 5, a: 0, c: 0, nextEmail: "mail_intern_db_fail" }
        ]
    },
    {
        id: "mail_intern_db_panic",
        linked: true,
        sender: "Kevin (Azubi)",
        subj: "Re: Frage zu 'DELETE ALL'",
        body: "Puh, okay. Hab auf 'Abbrechen' geklickt. Aber jetzt ist der Bildschirm blau. Ist das gut?",
        opts: [
            { btn: "Besser als gelöscht.", txt: "Nur ein Absturz. Glück gehabt.", f: 0, a: 5, c: 0 }
        ]
    },
    {
        id: "mail_intern_db_fail",
        linked: true,
        sender: "System Alert",
        subj: "DATABASE EMPTY",
        body: "Tabelle 'Customers' enthält 0 Einträge. Letztes Backup: 1999.",
        opts: [
            { btn: "Ich kündige.", txt: "Pack deine Sachen.", f: 0, a: 50, c: -20 }
        ]
    },

    {
        id: "mail_coffee_decaf_1",
        sender: "Gesundheits-AG",
        subj: "Woche der Herzgesundheit",
        body: "Zu Ihrem Besten gibt es diese Woche nur koffeinfreien Kaffee (aus Dinkel). Bleiben Sie gesund!",
        opts: [
            { btn: "Akzeptieren", txt: "Du schläfst um 10:00 Uhr ein.", f: 10, a: 0, c: 0 },
            { btn: "Schmuggelware organisieren", txt: "Du dealst mit Red Bull auf dem Herrenklo.", f: -5, a: -5, c: 10, nextEmail: "mail_coffee_decaf_2" }
        ]
    },
    {
        id: "mail_coffee_decaf_2",
        linked: true,
        sender: "Kollege Bernd",
        subj: "Hast du Stoff?",
        body: "Ich hab gehört, du hast echtes Koffein? Ich zahle jeden Preis! Meine Hände zittern schon!",
        opts: [
            { btn: "5€ pro Dose.", txt: "Du wirst zum Drogenbaron des Büros.", f: 0, a: -10, c: 15 }
        ]
    },
    {
        id: "mail_dsgvo_1",
        sender: "Datenschutzbeauftragter",
        subj: "DSGVO Verstoß: Post-It",
        body: "An Ihrem Monitor klebt ein Zettel mit 'Passwort123'. Das ist ein Sicherheitsrisiko der Stufe Rot.",
        opts: [
            { btn: "Zettel essen", txt: "Beweismittel vernichtet. Schmeckt nach Papier und Angst.", f: 0, a: 5, c: -5, nextEmail: "mail_dsgvo_eaten" },
            { btn: "Lüge: 'Das ist ein WLAN-Code'", txt: "Er glaubt es nicht, aber lässt dich in Ruhe.", f: 0, a: 0, c: 5 }
        ]
    },
    {
        id: "mail_dsgvo_eaten",
        linked: true,
        sender: "Datenschutzbeauftragter",
        subj: "Re: DSGVO Verstoß",
        body: "Haben Sie den Zettel gerade... verschluckt? Ich bin beeindruckt von Ihrer Hingabe. Fall geschlossen.",
        opts: [
            { btn: "*Rülps*", txt: "Verdauungsstörungen, aber der Job ist sicher.", f: 0, a: -5, c: -10 }
        ]
    },

    {
        id: "mail_elevator_1",
        sender: "Facility Mgt",
        subj: "Aufzug außer Betrieb",
        body: "Aufzug 1 steckt fest. Aufzug 2 riecht nach nassem Hund. Bitte Treppe nutzen (Gesundheit!).",
        opts: [
            { btn: "Treppe laufen (4. Stock)", txt: "Du kommst verschwitzt und wütend oben an.", f: -10, a: 15, c: 0 },
            { btn: "Im Erdgeschoss arbeiten", txt: "Du setzt dich einfach in die Lobby aufs Sofa.", f: 10, a: -5, c: 0, nextEmail: "mail_elevator_lobby" }
        ]
    },
    {
        id: "mail_elevator_lobby",
        linked: true,
        sender: "Empfang (Gabi)",
        subj: "Du störst!",
        body: "Du schnarchst auf dem Sofa! Hier kommen Kunden vorbei! Geh sofort hoch oder ich rufe Egon!",
        opts: [
            { btn: "Na gut...", txt: "Der Weg nach oben ist lang und hart.", f: -5, a: 10, c: 0 }
        ]
    },

    {
        id: "mail_buzzword_1",
        sender: "Projektleiter",
        subj: "Quick Sync bzgl. Low Hanging Fruits",
        body: "Lass uns mal schnell brainstormen, wie wir das Mindset shiften können. Wir brauchen mehr Agilität im Backend!",
        opts: [
            { btn: "Antwort: 'Bullshit-Bingo!'", txt: "Du schickst ihm eine ausgefüllte Bingokarte.", f: 5, a: -5, c: 5, nextEmail: "mail_buzzword_fail" },
            { btn: "Antwort: 'Bin total committed.'", txt: "Du stirbst innerlich, aber er ist glücklich.", f: 0, a: 5, c: 0 }
        ]
    },
    {
        id: "mail_buzzword_fail",
        linked: true,
        sender: "Projektleiter",
        subj: "Re: Quick Sync",
        body: "Sehr witzig. Deine Attitude ist nicht gerade 'Customer Centric'. Wir sprechen uns im Jahresgespräch.",
        opts: [
            { btn: "Whatever.", txt: "Buzzwords können dir nichts anhaben.", f: 0, a: 0, c: 5 }
        ]
    },

    {
        id: "mail_birthday_wrong_1",
        sender: "HR System",
        subj: "Happy Birthday! 🎉",
        body: "Lieber Mitarbeiter, alles Gute zum 50. Geburtstag! Holen Sie sich Ihren Gratis-Apfel in der Kantine ab!",
        opts: [
            { btn: "Ich bin erst 28?!", txt: "Du mailst wütend zurück.", f: 0, a: 10, c: 0, nextEmail: "mail_birthday_fix" },
            { btn: "Apfel holen", txt: "Gratis ist Gratis. Auch wenn du jetzt offiziell alt bist.", f: 5, a: -5, c: 0 }
        ]
    },
    {
        id: "mail_birthday_fix",
        linked: true,
        sender: "HR System",
        subj: "Ticket #9921",
        body: "Änderung des Geburtsdatums erfordert Formular A38, notariell beglaubigt. Bearbeitungszeit: 6 Monate.",
        opts: [
            { btn: "Ich hasse euch.", txt: "Du gibst auf und alterst vor Stress.", f: 0, a: 10, c: 0 }
        ]
    },

    {
        id: "mail_mouse_1",
        sender: "Kevin (Azubi)",
        subj: "Maus geht nicht",
        body: "Chef, meine Maus ist kaputt. Wenn ich sie hochhebe, bewegt sich der Zeiger nicht mehr. Hä?",
        opts: [
            { btn: "Ernsthaft? 'Leg sie hin.'", txt: "Du erklärst ihm die Physik.", f: 0, a: 5, c: 0, nextEmail: "mail_mouse_2" },
            { btn: "Kauf dir eine neue.", txt: "Nicht dein Budget, nicht dein Problem.", f: 5, a: 0, c: 5 }
        ]
    },
    {
        id: "mail_mouse_2",
        linked: true,
        sender: "Kevin (Azubi)",
        subj: "WOW!",
        body: "Es geht!! Sie sind ein Magier! Ich dachte, das ist wie bei der Fernbedienung!",
        opts: [
            { btn: "Kopf -> Tisch.", txt: "Der Glaube an die Menschheit sinkt.", f: 0, a: 5, c: 0 }
        ]
    },

    {
        id: "mail_temperature_1",
        sender: "Kollegin Petra",
        subj: "Es zieht!",
        body: "Kannst du das Fenster zumachen? Ich bekomme einen steifen Nacken! Es sind nur 28 Grad draußen!",
        opts: [
            { btn: "Fenster bleibt auf!", txt: "Frischluft ist ein Menschenrecht.", f: 0, a: -5, c: 5, nextEmail: "mail_temperature_war" },
            { btn: "Fenster zu (Ersticken)", txt: "Der Sauerstoffgehalt sinkt auf 0%. Du wirst müde.", f: 10, a: 5, c: 0 }
        ]
    },
    {
        id: "mail_temperature_war",
        linked: true,
        sender: "Kollegin Petra",
        subj: "Re: Es zieht!",
        body: "Dann drehe ich die Heizung auf 5! Das hast du davon!",
        opts: [
            { btn: "Sauna-Krieg.", txt: "Es beginnt. Keiner arbeitet mehr, alle schwitzen.", f: 5, a: 15, c: 0 }
        ]
    },

    {
        id: "mail_printer_name_1",
        sender: "Office Management",
        subj: "Name für neuen Drucker",
        body: "Vorschläge: 1. Drucki McPrintface, 2. Papierstau-Paulus, 3. The Beast. Bitte abstimmen.",
        opts: [
            { btn: "Drucki McPrintface", txt: "Klassiker. Alle lachen.", f: 5, a: -5, c: 0 },
            { btn: "The Beast", txt: "Passend. Er sieht böse aus.", f: 0, a: 0, c: 0, nextEmail: "mail_printer_beast" }
        ]
    },
    {
        id: "mail_printer_beast",
        linked: true,
        sender: "Office Management",
        subj: "Taufe: The Beast",
        body: "Der Drucker heißt jetzt 'The Beast'. Er hat zur Feier des Tages sofort Toner auf den Teppich gespuckt.",
        opts: [
            { btn: "Passender Name.", txt: "Du nickst respektvoll.", f: 0, a: 0, c: 0 }
        ]
    },

    {
        id: "mail_darkmode_1",
        sender: "Design Team",
        subj: "Dark Mode Pflicht?",
        body: "Wir überlegen, alles auf Schwarz umzustellen. Spart Strom und sieht cool aus. Meinung?",
        opts: [
            { btn: "JA! MEINE AUGEN!", txt: "Endlich nicht mehr schneeblind.", f: 5, a: -5, c: 0, nextEmail: "mail_darkmode_win" },
            { btn: "Nein, ich mag Weiß.", txt: "Du Monster. Alle Entwickler hassen dich.", f: 0, a: 5, c: 5 }
        ]
    },
    {
        id: "mail_darkmode_win",
        linked: true,
        sender: "Design Team",
        subj: "Welcome to the Dark Side",
        body: "Alles ist jetzt schwarz. Leider auch die Schriftfarbe. Wir arbeiten dran.",
        opts: [
            { btn: "Ich sehe nichts.", txt: "Aber es sieht cool aus.", f: 10, a: 5, c: 0 }
        ]
    },

    {
        id: "mail_secret_santa_1",
        sender: "Orga Komitee",
        subj: "Wichteln im Juli",
        body: "Wir wollen die Stimmung heben! Zwangswichteln! Du musst ein Geschenk für 'Dr. Wichtig' besorgen. Budget: 5€.",
        opts: [
            { btn: "Klopapier einpacken", txt: "Ein praktisches Geschenk. Mutig.", f: 0, a: -5, c: 10, nextEmail: "mail_santa_fail" },
            { btn: "Schokolade kaufen", txt: "Langweilig, aber sicher.", f: -5, a: 0, c: 0 }
        ]
    },
    {
        id: "mail_santa_fail",
        linked: true,
        sender: "Dr. Wichtig",
        subj: "Ihr Geschenk",
        body: "Müller? War das eine Anspielung auf meine Arbeitsweise? Kommen Sie in mein Büro.",
        opts: [
            { btn: "Ups.", txt: "Das war vielleicht zu mutig.", f: 0, a: 20, c: 10 }
        ]
    },

    {
        id: "mail_scam_prince_1",
        sender: "Prinz Zamunda",
        subj: "GOLD GESCHENKT",
        body: "Hallo mein Freund. Ich habe 50 Millionen Goldbarren. Ich brauche dein Konto. 50/50 Split?",
        opts: [
            { btn: "Löschen", txt: "Langweilig.", f: 0, a: 0, c: 0 },
            { btn: "Antwort: 'Schick erst Probe!'", txt: "Du trollst den Scammer.", f: 5, a: 0, c: 0, nextEmail: "mail_scam_prince_2" }
        ]
    },
    {
        id: "mail_scam_prince_2",
        linked: true,
        sender: "Prinz Zamunda",
        subj: "Re: GOLD GESCHENKT",
        body: "Okay, ich habe dir 1 Cent überwiesen. Vertraust du mir jetzt? Bitte Sende Passwort.",
        opts: [
            { btn: "Er hat wirklich überwiesen!", txt: "Du bist 1 Cent reicher. Profit.", f: 5, a: -5, c: 0 }
        ]
    },
    {
        id: "mail_parking_scooter_1",
        sender: "Hausmeister Egon",
        subj: "E-Roller im Flur",
        body: "Wer hat seinen 'Lime-Scooter' im Serverraum geparkt? Er piept alle 30 Sekunden.",
        opts: [
            { btn: "Das ist mein Dienstwagen.", txt: "Du bist zu faul zum Laufen.", f: 5, a: 0, c: 5, nextEmail: "mail_parking_scooter_2" },
            { btn: "Rausschmeißen", txt: "Du wirfst den Roller aus dem Fenster.", f: 0, a: -5, c: 0 }
        ]
    },
    {
        id: "mail_parking_scooter_2",
        linked: true,
        sender: "Hausmeister Egon",
        subj: "Re: E-Roller",
        body: "Hab ihn ans WLAN angeschlossen. Er lädt jetzt Updates runter und blockiert die Leitung. Dein Problem.",
        opts: [
            { btn: "Mist.", txt: "Das Internet ist tot wegen eines Rollers.", f: -5, a: 10, c: 0 }
        ]
    },

    {
        id: "mail_vegan_war_1",
        sender: "Kantinen-Ausschuss",
        subj: "Schnitzel-Verbot?",
        body: "Diskussion: Sollen wir den 'Schnitzel-Dienstag' durch den 'Tofu-Tornado-Tag' ersetzen?",
        opts: [
            { btn: "NIEMALS! (Pro Schnitzel)", txt: "Du kämpfst für dein Fleisch. Die IT steht hinter dir.", f: 0, a: -5, c: 0, nextEmail: "mail_vegan_schnitzel" },
            { btn: "Ja, Tofu ist super.", txt: "Alle hassen dich. Wirklich alle.", f: 0, a: 15, c: 0 }
        ]
    },
    {
        id: "mail_vegan_schnitzel",
        linked: true,
        sender: "Kantinen-Ausschuss",
        subj: "Abstimmungsergebnis",
        body: "Das Schnitzel bleibt! Aber es kostet jetzt 9,50€ (Klimazuschlag).",
        opts: [
            { btn: "Ein teurer Sieg.", txt: "Hauptsache paniert.", f: 5, a: 0, c: -5 }
        ]
    },

    {
        id: "mail_pen_thief_1",
        sender: "Sekretariat",
        subj: "Kugelschreiber Schwund",
        body: "Es fehlen 500 Kugelschreiber. Wer welche hat, bitte zurückgeben. Anonyme Box steht bereit.",
        opts: [
            { btn: "Meine 40 Stück zurückgeben", txt: "Du leerst deine Schublade. Es klappert laut.", f: 0, a: 0, c: 5, nextEmail: "mail_pen_thief_2" },
            { btn: "Ich weiß von nichts.", txt: "Du baust eine Burg aus Stiften.", f: 5, a: 0, c: 0 }
        ]
    },
    {
        id: "mail_pen_thief_2",
        linked: true,
        sender: "Sekretariat",
        subj: "Danke...",
        body: "Danke für die Rückgabe. Warum waren die alle angekaut?! Wir werfen sie weg.",
        opts: [
            { btn: "Ich war nervös.", txt: "Peinlich.", f: 0, a: 5, c: 0 }
        ]
    },

    {
        id: "mail_fire_alarm_1",
        sender: "Sicherheit",
        subj: "ANGEKÜNDIGTER FEUERALARM",
        body: "Heute um 14:00 testen wir die Sirene. Bitte NICHT in Panik geraten und NICHT aus dem Fenster springen.",
        opts: [
            { btn: "Ohrstöpsel rein", txt: "Du ignorierst alles. Profi.", f: 5, a: -5, c: 0 },
            { btn: "Um 14:00 'FEUER!' schreien", txt: "Du sorgst für realistische Bedingungen.", f: 0, a: 0, c: 10, nextEmail: "mail_fire_chaos" }
        ]
    },
    {
        id: "mail_fire_chaos",
        linked: true,
        sender: "Sicherheit",
        subj: "Manöverkritik",
        body: "Dank Herrn Müller sind 3 Kollegen in den Brunnen gesprungen. Die Übung war ein 'voller Erfolg'.",
        opts: [
            { btn: "Gern geschehen.", txt: "Sicherheit geht vor.", f: 0, a: -10, c: -5 }
        ]
    },

    {
        id: "mail_meme_1",
        sender: "Der lustige Günther",
        subj: "Wochenende!!! 🍺🍺",
        body: "Hier ein lustiges Bild von einem Minion, der Bier trinkt! Hahaha! Versteht ihr? Weil Arbeit doof ist!",
        opts: [
            { btn: "Fake-Lachen antworten", txt: "Du schreibst 'LOL Günther!'. Deine Seele stirbt.", f: 0, a: 5, c: 0 },
            { btn: "Günther blockieren", txt: "Endlich Ruhe.", f: 5, a: -5, c: 0 }
        ]
    },

    {
        id: "mail_consultant_1",
        sender: "McKinsey & Partner",
        subj: "Effizienz-Analyse",
        body: "Wir prüfen Ihre Abteilung. Bitte protokollieren Sie jeden Toilettengang in Excel.",
        opts: [
            { btn: "Excel ausfüllen", txt: "Du tippst: '09:00 - Pipi'. Erniedrigend.", f: -10, a: 15, c: 0, nextEmail: "mail_consultant_2" },
            { btn: "Excel fälschen", txt: "Du schreibst, du gehst nie. Du bist ein Roboter.", f: 5, a: 0, c: 5 }
        ]
    },
    {
        id: "mail_consultant_2",
        linked: true,
        sender: "McKinsey & Partner",
        subj: "Ergebnis",
        body: "Sie gehen zu oft. Wir empfehlen einen Katheter am Arbeitsplatz, um die Effizienz um 2% zu steigern.",
        opts: [
            { btn: "Ich kündige gleich.", txt: "Aggro am Limit.", f: 0, a: 20, c: 0 }
        ]
    },

    {
        id: "mail_lottery_win_fake",
        sender: "Notar Dr. Fake",
        subj: "Erbschaft aus Nigeria",
        body: "Ihr ferner Onkel ist gestorben. Er hinterlässt Ihnen eine Diamantenmine. Bitte überweisen Sie 500€ Gebühr.",
        opts: [
            { btn: "Seems legit. (Zahlen)", txt: "Du bist so dumm.", f: 0, a: 20, c: -20 },
            { btn: "Löschen", txt: "Du bist ja nicht blöd.", f: 0, a: -5, c: 0 }
        ]
    },

    {
        id: "mail_smell_1",
        sender: "Anonym",
        subj: "Geruchsbelästigung",
        body: "Jemand in diesem Büro riecht nach altem Käse und Verzweiflung. Bitte duschen.",
        opts: [
            { btn: "Rieche ich das?", txt: "Du schnupperst an dir. Vielleicht?", f: 0, a: 5, c: 0, nextEmail: "mail_smell_2" },
            { btn: "Das ist Kevin.", txt: "Es ist immer Kevin.", f: 5, a: 0, c: 0 }
        ]
    },
    {
        id: "mail_smell_2",
        linked: true,
        sender: "Anonym",
        subj: "Re: Geruchsbelästigung",
        body: "Ja, Sie sind es. Deo hilft. Danke.",
        opts: [
            { btn: "Autsch.", txt: "Das hat wehgetan. Selbstwertgefühl sinkt.", f: 0, a: 10, c: 0 }
        ]
    },

    {
        id: "mail_teambuilding_1",
        sender: "HR (Sabine)",
        subj: "Teamevent: Wald-Survival",
        body: "Wir setzen euch im Wald aus. Ohne Handys. Wer zuerst zurück ist, wird nicht gefeuert.",
        opts: [
            { btn: "Krankmelden", txt: "Plötzlich hast du 'Rücken'.", f: 10, a: -5, c: 0 },
            { btn: "Ich nehme ein Messer mit.", txt: "Du bist bereit für die 'Hunger Games'.", f: 0, a: 5, c: 5 }
        ]
    },

    {
        id: "mail_printer_color_cyan",
        sender: "Drucker",
        subj: "TONER LEER",
        body: "Cyan ist leer. Ich kann dieses Schwarz-Weiß-Dokument nicht drucken, weil ich Cyan brauche um Schwarz zu mischen. Hahaha.",
        opts: [
            { btn: "Drucker schlagen", txt: "Es hilft nicht, aber tut gut.", f: 0, a: 5, c: 0 },
            { btn: "Mit Kugelschreiber abschreiben", txt: "Zurück ins Mittelalter.", f: -10, a: 10, c: 0 }
        ]
    },
    ],

    // SPEZIAL (Mittagspause & Fallback)
    special: {
        lunchEvents: [
            {
                id: "lunch_canteen",
                title: "MITTAG: KANTINE",
                text: "Es gibt heute 'Jägerschnitzel Surprise'. Die Meute drängelt am Buffet. Was tust du?",
                opts: [
                    { 
                        t: "Zu den Kollegen setzen", 
                        m: 45, f: -5, a: 10, c: -5, 
                        r: "Du hörst dir Geschichten über Chantals Katze an. Langweilig, aber man hat dich gesehen. Gut für das 'Team-Gefühl'." 
                    },
                    { 
                        t: "Kopfhörer auf & ab in die Ecke",
                        m: 30, f: 5, a: -10, c: 0, 
                        r: "Du schirmst dich ab, scrollst durch Memes und ignorierst die Welt. Herrliche Ruhe." 
                    }
                ]
            },
            {
                id: "lunch_desk",
                title: "MITTAG: AM PLATZ",
                text: "Du bleibst im Büro, um Menschen zu meiden. Vor dir liegt ein trauriges Pausenbrot, das schon leicht wellig ist.",
                opts: [
                    { 
                        t: "Einhändig weiterarbeiten",
                        m: 30, f: -10, a: 20, c: -10, 
                        r: "Multitasking. Du löst Tickets mit rechts, isst mit links. Der Chef nickt anerkennend im Vorbeigehen. Deine Tastatur knirscht jetzt vor Krümeln." 
                    },
                    { 
                        t: "Serie im Minifenster gucken",
                        m: 60, f: 20, a: -20, c: 10, 
                        r: "Finger auf 'Alt-Tab' bereit. Du schaffst zwei Folgen. Leider spiegelt sich der Film in deiner Brille, als der Chef reinkommt. Ärger!" 
                    }
                ]
            },
            {
                id: "lunch_vegan",
                title: "MITTAG: VEGANER TAG",
                text: "In der Kantine gibt es nur Tofu-Klumpen. Die Stimmung im Team ist aggressiv.",
                opts: [
                    { t: "Mitessen und meckern", m: 45, f: 0, a: 15, c: 0, r: "Gemeinsames Meckern verbindet das Team." },
                    { t: "Zum Döner-Mann rennen", m: 45, f: 5, a: -20, c: 5, r: "Du kommst mit Knoblauchfahne zurück. Du bist glücklich, die Kollegen rümpfen die Nase." }
                ]
            },
            {
                id: "lunch_client_emergency",
                title: "MITTAG: DER CHEF-ALARM",
                text: "Du packst gerade dein Brot aus, da steht der Chef atemlos vor dir. 'Müller! Kunde Schmitz hat totalen Internet-Ausfall! Sie müssen SOFORT hin! Das ist ein Notfall! Das Brot können Sie im Auto essen!'",
                opts: [
                    { 
                        t: "Brot schnappen und losrasen",
                        m: 60, f: -20, a: 25, c: -15, 
                        r: "Du würgst dein Brot bei Tempo 180 runter. Beim Kunden war nur der Stecker locker. Du hast Sodbrennen, aber der Chef feiert deinen heldenhaften Einsatz." 
                    },
                    { 
                        t: "Auf die gesetzliche Pause bestehen",
                        m: 30, f: 5, a: -10, c: 15, 
                        r: "Du beißt betont langsam in dein Brot und tippst auf die Uhr. Der Chef läuft rot an, schnaubt und rennt wütend selbst los. Dein Essen schmeckt plötzlich nach Sieg." 
                    }
                ]
            },
            {
                id: "lunch_pizza",
                title: "MITTAG: PIZZA-DISKUSSION",
                text: "Das Team will Pizza bestellen. Die Diskussion dauert schon 20 Minuten. 'Ananas gehört nicht drauf!' vs 'Ich bin laktoseintolerant!'. Deine Pause verrinnt.",
                opts: [
                    { t: "Machtwort: 'Salami für alle!'", m: 45, f: -5, a: 10, c: 0, r: "Du hast bestellt. Die Veganer hassen dich, aber du bist satt. Aggro steigt durch das Gemecker." },
                    { t: "Aussteigen & Brot essen", m: 30, f: 0, a: -5, c: 0, r: "Du isst dein trockenes Brot, während die anderen noch streiten. Friedlich, aber traurig." }
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
                        t: "Anstellen! 2,50€ sind unschlagbar!", 
                        m: 50, f: 10, a: 15, c: 5, 
                        r: "Du hast 40 Minuten gewartet und alles in 5 Minuten runtergeschlungen. Du kommst zu spät und dünstest Knoblauch aus. Aber du hast gespart!" 
                    },
                    { 
                        t: "Lieber zum Bäcker gehen", 
                        m: 20, f: 0, a: 5, c: 0, 
                        r: "Du holst dir ein trockenes Käsebrötchen. Es schmeckt nach Pappe und Verantwortung. Der Neid auf die Döner-Esser nagt an dir." 
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
                        t: "Den 'Bio-Burger' für 15€ holen",
                        m: 75, f: 10, a: -10, c: 10, 
                        r: "Du hast 60 Minuten gewartet. Der Burger war winzig, aber lecker. Du kommst massiv zu spät zurück. Der Chef tippt auf seine Uhr: 'War der Burger aus Gold, Müller?'" 
                    },
                    { 
                        t: "Den billigen Hot-Dog-Stand nehmen",
                        m: 20, f: 0, a: 20, c: 0, 
                        r: "Keine Schlange, nur 2 Euro. Ein Schnäppchen! Aber nach dem ersten Bissen rumort dein Magen bedrohlich. Der Nachmittag wird... explosiv." 
                    },
                    { 
                        t: "Im Büro bleiben & Reste essen",
                        m: 10, f: -5, a: 5, c: -5, 
                        r: "Du isst einen alten Riegel aus der Schublade, während die anderen draußen Spaß haben. Du fühlst dich moralisch überlegen, weil du dem Hype widerstanden hast – bist aber immer noch hungrig." 
                    }
                ]
            },
			{
                id: "lunch_ceo_table",
                title: "MITTAG: DER CEO WINKT",
                text: "Du betrittst die Kantine mit deinem Tablett (Linseneintopf). Plötzlich winkt Dr. Wichtig vom 'Vorstands-Tisch' zu dir. 'Müller! Setzen Sie sich zu mir! Wir müssen uns mal unterhalten.' Alle im Raum starren dich an.",
                opts: [
                    { 
                        t: "Hinsetzen & Smalltalk wagen", 
                        m: 60, f: -10, a: 20, c: -25, 
                        r: "Du schwitzt Blut und Wasser. Du lachst über seine unlustigen Witze. Aber es lohnt sich: Er hält dich jetzt für einen 'Guten Mann'. Chef-Radar sinkt massiv! Dein Essen ist allerdings kalt geworden." 
                    },
                    { 
                        t: "Über Gehaltserhöhung reden", 
                        m: 45, f: 0, a: 10, c: 50, 
                        r: "Ganz schlechte Idee. Er verschluckt sich an seiner Garnele. 'Müller, nicht beim Essen!' Die Stimmung kippt sofort. Er merkt sich das negativ vor." 
                    },
                    { 
                        t: "So tun als hättest du einen Anruf", 
                        m: 5, f: 10, a: -5, c: 5, 
                        r: "Du hältst das Handy ans Ohr: 'Oh, Server-Notfall! Muss los!' Du rennst mit dem Tablett raus. Knapp entkommen, aber er wirkt beleidigt." 
                    }
                ]
            },
            {
                id: "lunch_microwave_war",
                title: "MITTAG: MIKROWELLEN-KRIEG",
                text: "Zwei Mikrowellen sind kaputt, nur eine geht. Eine Schlange von 10 Leuten. Ganz vorne steht jemand aus dem Vertrieb und wärmt Fisch auf (Timer: 10 Minuten). Der Gestank breitet sich aus. Die Stimmung ist hochexplosiv.",
                opts: [
                    { 
                        t: "Einfach den Stecker ziehen",
                        m: 5, f: 5, a: -10, c: 10, 
                        r: "Du ziehst im Vorbeigehen den Stecker. 'Huch, Sicherung wohl raus.' Der Fisch-Typ flucht, kann aber nichts beweisen. Die Menge jubelt dir leise zu. Du bist der Held des Tages." 
                    },
                    { 
                        t: "Lautstark herumpöbeln",
                        m: 30, f: 0, a: 25, c: 0, 
                        r: "Du brüllst durch die Küche: 'FISCH?! ERNSTHAFT?! SIND WIR HIER AM HAFEN?!' Es entsteht eine hitzige Debatte. Du hast dich abreagiert, aber dein Essen ist immer noch kalt." 
                    },
                    { 
                        t: "Flucht zum Döner-Laden", 
                        m: 45, f: 10, a: -5, c: 0, 
                        r: "Du hältst die Luft an und rennst raus, weg von dem Gestank. Der Döner draußen schmeckt nach Freiheit (und Zwiebeln)." 
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
                        t: "Azubi Kevin anpumpen", 
                        m: 10, f: 5, a: -5, c: 0, 
                        r: "Kevin steht hinter dir. 'Kannst du mal...?' Er zahlt stolz für dich. Jetzt schuldest du dem Azubi was. Er wird dich dafür ausnutzen ('Kannst du mal meinen Drucker fixen?')." 
                    },
                    { 
                        t: "Essen zurückstellen", 
                        m: 15, f: 0, a: 20, c: 0, 
                        r: "Du musst das Schnitzel zurücktragen, während alle dich anstarren. 'Schande! Schande!' Du isst trockenes Brot am Platz." 
                    },
                    { 
                        t: "Laufpass: 'Ich hol's gleich!'", 
                        m: 20, f: -5, a: 10, c: 0, 
                        r: "Du rennst hoch, holst Geld, rennst runter. Dein Platz ist weg, das Schnitzel ist kalt. Stress pur." 
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
                        t: "Laut rufen: 'Ich lerne schon Mandarin!'",
                        m: 30, f: 10, a: -10, c: 20, 
                        r: "Du erzählst wilde Horror-Stories über Arbeitslager. Die Kollegen weinen fast. Das Chaos ist herrlich. Produktivität am Nachmittag: Null. Der Chef tobt." 
                    },
                    { 
                        t: "Abwinken: 'Alles nur Gerüchte.'",
                        m: 30, f: -5, a: 10, c: -5, 
                        r: "Du spielst den Fels in der Brandung: 'Das war bestimmt nur ein fehlerhafter Ausdruck.' Die Leute beruhigen sich etwas. Langweilig, aber verantwortungsvoll." 
                    },
                    { 
                        t: "Den Chef am Buffet abfangen",
                        m: 10, f: 0, a: 0, c: 10, 
                        r: "Du drängst den Chef zwischen Salat und Suppe in die Ecke. Er lacht nervös: 'Kein Kommentar.' Aha! Das Schweigen bestätigt alles!" 
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
                    { t: "Dose 1 öffnen", m: 30, f: 0, a: -10, c: 0, r: "Jackpot! Lasagne! Der Tag ist gerettet." },
                    { t: "Dose 3 öffnen", m: 45, f: -20, a: 30, c: 0, r: "Es war der Schimmel. Du verbringst die Pause würgend auf dem Klo. Aggro steigt massiv." },
                    { t: "Nicht mitspielen", m: 10, f: 0, a: 5, c: 0, r: "Du isst dein trockenes Brot. Langweilig, aber sicher." }
                ]
            },
            {
                id: "lunch_fancy_restaurant",
                title: "MITTAG: DER NOBLE ITALIENER",
                text: "Die Kollegen wollen zum Edel-Italiener 'Il Prezzo'. Eine Pizza kostet 25 Euro. Alle gucken dich erwartungsvoll an: 'Kommst du mit oder bist du etwa pleite?'",
                opts: [
                    { 
                        t: "Mitgehen und nur Wasser bestellen", 
                        m: 60, f: -5, a: 10, c: 0, 
                        r: "Du nippst 60 Minuten lang an einem Glas Leitungswasser, während die anderen Trüffel-Pasta schlemmen. Absolut demütigend." 
                    },
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
                    }
                ]
            },
            {
                id: "lunch_sleep_car",
                title: "MITTAG: AUTO-SCHLAF",
                text: "Du schleichst dich wie ein Krimineller in die Tiefgarage. Dein Auto ist deine Festung. Du stellst den Sitz nach hinten. Endlich Stille, nur das ferne Surren der Lüftung.",
                opts: [
                    { 
                        t: "Wecker auf 20 Minuten stellen", 
                        m: 30, f: 15, a: -10, c: 0, 
                        r: "Der perfekte Power-Nap. Du wachst punktgenau auf, wischst den Sabber vom Mundwinkel und gehst erfrischt zurück an die Arbeit." 
                    },
                    { 
                        t: "Ohne Wecker schlafen (Risiko!)", 
                        m: 90, f: 30, a: -30, c: 20, 
                        r: "Du fällst in ein Koma. Du wachst völlig vernebelt auf. Was für ein Jahr haben wir? Blick auf die Uhr: SCHEI**E! Du warst 90 Minuten weg. Der Chef hat dich gesucht." 
                    },
                    { 
                        t: "Motor für die Klimaanlage laufen lassen", 
                        m: 45, f: 20, a: -10, c: 0, 
                        r: "Herrlich temperiert. Du hörst leise Radio und entspannst. Leider nuckelt das Licht an der Batterie. Hoffentlich startet die Karre heute Abend noch." 
                    }
                ]
            },
            {
                id: "lunch_gym",
                title: "MITTAG: FIRMEN-FITNESS",
                text: "HR hat ein 'Pop-Up Gym' im Konferenzraum aufgebaut. 'Schwitzen für den Erfolg'. Der Trainer brüllt schon.",
                opts: [
                    { t: "Teilnehmen", m: 45, f: -10, a: 10, c: -5, r: "Du hast Liegestütze im Anzug gemacht. Jetzt riechst du nach Iltis. Aber der Chef hat's gesehen (positiv)." },
                    { t: "Zuschauen & Donut essen", req: "donut", m: 30, f: 10, a: -10, c: 5, r: "Du isst einen Donut, während die Kollegen leiden. Ein Gefühl der Überlegenheit. Aber HR guckt böse." },
                    { t: "Sabotieren", m: 10, f: 5, a: -5, c: 10, r: "Du drehst die Heizung auf 30 Grad. Das Training wird abgebrochen. Danke, Held." }
                ]
            },
            {
                id: "lunch_supermarket",
                title: "MITTAG: SUPERMARKT-KAMPF",
                text: "Du willst dir nur schnell ein Brötchen im Supermarkt holen. Aber: Rentner-Invasion! Alle drei Kassen sind voll mit Leuten, die passend zahlen wollen ('Warten Sie, ich hab's klein!').",
                opts: [
                    { 
                        t: "Brav anstellen und warten",
                        m: 40, f: -5, a: 20, c: 0, 
                        r: "Die Dame vor dir zahlt 4,99€ ausschließlich in 1- und 2-Cent-Münzen. Du starrst auf die Uhr. Du kommst zu spät und das Brötchen schmeckt nach purer Wut." 
                    },
                    { 
                        t: "Rufen: 'PLATZ DA! ICH BIN ARZT!'",
                        m: 15, f: 5, a: -5, c: 10, 
                        r: "Die Menge teilt sich ehrfürchtig wie das Rote Meer. Du scannst dein Mettbrötchen wie ein Herzchirurg. Du bist satt, aber dein Karma ist im Keller." 
                    },
                    { 
                        t: "Ware ins Regal werfen & flüchten", 
                        m: 10, f: 0, a: 10, c: 0, 
                        r: "Du legst die Banane zu den Shampoos und rennst raus. Hunger ist schlimm, aber dieser Kassen-Stress ist schlimmer." 
                    }
                ]
            },
        ],
        empty_pool: {
            id: "fallback_empty",
            title: "Ruhe vor dem Sturm",
            text: "Aktuell passiert nichts. Alle sind wohl glücklich (oder tot). Du starrst eine Fliege an.",
            opts: [
                { t: "Däumchen drehen", m: 20, f: 5, a: -5, c: 0, r: "Zeit vergeht langsam." }
            ]
        }
    },

    // BOSS FIGHTS (Zeitdruck Events)
    bossfights: [
        {
            id: "boss_ransomware",
            title: "🚨 RANSOMWARE ANGRIFF 🚨",
            text: "EIN TOTENKOPF AUF DEM HAUPTSERVER! 'Senden Sie 10 Bitcoin oder alles wird gelöscht'. Der Countdown läuft! (10 Sekunden)",
            timer: 10, 
            opts: [
                { t: "Stecker ziehen!", m: 10, f: -10, a: 20, c: 10, r: "Brachial, aber wirksam. Server ist aus. Daten gerettet (vielleicht)." },
                { t: "Admin-Code eingeben", req: "admin_pw", m: 5, f: 0, a: -10, c: -20, r: "Profi-Move! Angriff abgewehrt. Held der Firma!" }
            ],
            fail: { m: 30, f: 0, a: 50, c: 50, r: "ZU LANGSAM! Daten verschlüsselt. Chef tobt!" }
        },
        {
            id: "boss_fire",
            title: "🔥 SERVER BRAND 🔥",
            text: "Rauch im Serverraum! Ein Kondensator ist geplatzt! Flammen schlagen hoch! Handeln Sie!",
            timer: 8,
            opts: [
                { t: "Feuerlöscher benutzen", req: "fire_ext", m: 30, f: -10, a: 10, c: -20, r: "Feuer gelöscht. Du hustest, aber bist ein Held." },
                { t: "Wegrennen und Alarm drücken", m: 60, f: 10, a: 0, c: 10, r: "Feuerwehr kommt. Büro evakuiert. Du hast Pause." }
            ],
            fail: { m: 120, f: -20, a: 30, c: 40, r: "SPRINKLERANLAGE AKTIV! Alles ist nass. Totalschaden." }
        },
		{
            id: "boss_stream",
            title: "☠️ CEO LIVE-STREAM FAIL ☠️",
            text: "Der CEO präsentiert live vor 5000 Investoren. Das Bild friert ein! Er ruft dich auf dem Handy an und brüllt: 'MACHEN SIE DASS ES GEHT! JETZT SOFORT!'",
            timer: 12,
            opts: [
                { t: "Backup-Leitung schalten", req: "admin_pw", m: 5, f: -10, a: 0, c: -20, r: "Profi-Reaktion! Der Stream läuft wieder in 4K. Der CEO wirkt erleichtert (und schwitzt)." },
                { t: "Qualität auf 'Kartoffel' (240p) setzen", m: 5, f: 5, a: 0, c: 10, r: "Es läuft wieder flüssig. Aber der CEO sieht aus wie eine Lego-Figur. Die Investoren lachen." }
            ],
            fail: { m: 20, f: 0, a: 40, c: 60, r: "STREAM ABGEBROCHEN. Aktienkurs fällt um 10%. Der Chef kommt persönlich runter..." }
        },
        {
            id: "boss_ddos",
            title: "🧟 ZOMBIE BOTNET ANGRIFF 🧟",
            text: "ALARM! Millionen von gehackten Kühlschränken greifen unsere Webseite an! Die Firewall glüht! Traffic bei 5000%!",
            timer: 15,
            opts: [
                { t: "Geo-Blocking aktivieren", m: 10, f: -5, a: 5, c: -5, r: "Zack! Der ganze Traffic aus Übersee ist geblockt. Die Seite läuft wieder. Kollateralschaden gering." },
                { t: "Stecker vom Router ziehen", m: 5, f: 10, a: -5, c: 20, r: "Der Angriff ist gestoppt. Aber wir sind offline. Technisch gesehen ein Erfolg, wirtschaftlich eine Katastrophe." }
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
                { t: "Not-Aus drücken", m: 5, f: 5, a: 0, c: 15, r: "Alles fährt runter. Die Stille ist gespenstisch. Hardware sicher, aber die Firma steht still." }
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
                    t: "Steckerleiste rausreißen (Blackout)", 
                    m: 45, f: 0, a: 20, c: 30,
                    r: "KLACK. Funken sprühen. Das Büro ist dunkel. Die Löschung ist gestoppt... genau wie der Rest der Firma. Der Server-Check dauert ewig (45 Min), aber die Daten leben noch." 
                }
            ],
            fail: { 
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
                    t: "Fesseln (Bürgerfestnahme)", 
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
                    t: "Bodycheck (Tackle)", 
                    m: 5, f: 0, a: 40, c: 20, 
                    r: "Du rammst ihn mit voller Wucht weg, bevor er den Stecker zieht. Sein Smartphone fliegt gegen ein Rack (kaputt). Er heult und droht mit Anwalt. Du hast blaue Flecken und bist stinksauer." 
                }
            ],
            fail: { 
                m: 60, f: 0, a: 50, c: 50, 
                r: "ER HAT DEN STECKER GEZOGEN! 'Ouuuups, war nur ein Prank Bro!'. Das Internet ist weg. Du gehst viral als 'Der heulende Admin' und wirst zum Meme. Der Chef ist 'not amused'." 
            }
        },
        {
            id: "boss_ups_battery",
            title: "🔋 USV BATTERIE SÄURE 🔋",
            text: "Die Notstrom-Batterie bläht sich auf wie ein Ballon! Es zischt! Säure droht auszutreten und durch den Doppelboden in die Etage darunter zu tropfen (Chefbüro)!",
            timer: 10,
            opts: [
                { t: "Abdichten (MacGyver)", req: "tape", m: 10, f: 0, a: 0, c: -10, r: "Du wickelst eine ganze Rolle Panzertape drum. Es hält den Druck... gerade so. Zeitbombe entschärft (für heute)." },
                { t: "Aus dem Fenster werfen", m: 5, f: 10, a: 20, c: 20, r: "Du hast das 20kg Teil durchs geschlossene Fenster geworfen. Es explodiert auf dem Parkplatz. Besser dort als hier." }
            ],
            fail: { m: 240, f: -30, a: 40, c: 80, r: "SÄURE-LECK! Es frisst sich durch den Boden. Es tropft auf den Schreibtisch des Chefs. Der Geruch ist bestialisch." }
        },
        {
            id: "boss_skynet_lock",
            title: "🔒 TÜREN VERRIEGELT 🔒",
            text: "Fehlfunktion im Sicherheitssystem! Die Brandschutztüren schließen sich. Der Sauerstoff wird abgesaugt (Halon-Anlage). Du hast 10 Sekunden, bevor du ohnmächtig wirst!",
            timer: 10,
            opts: [
                { 
                    t: "Tür aufschrauben", 
                    req: "screw", 
                    m: 10, f: -10, a: 0, c: 0, 
                    r: "In Rekordzeit hast du das Panel abgeschraubt und die Drähte kurzgeschlossen. Tür offen. Du lebst!" 
                },
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
                }
            ],
            fail: { 
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
                { t: "Stecker ziehen & wegrennen", m: 5, f: 10, a: 10, c: 10, r: "Die Maschine beruhigt sich langsam. Aber: KEIN KAFFEE MEHR HEUTE. Die Kollegen schauen dich mit mordlustigen Augen an." }
            ],
            fail: { m: 60, f: 0, a: 50, c: 20, r: "KA-WUMM! Die Küche ist voller Kaffeesatz. Die Maschine ist Schrott. Die Moral der Firma sinkt auf 0. Es herrschen anarchische Zustände." }
        },
		{
            id: "boss_printer_rage",
            title: "BOSS: DER DRUCKER DES TODES",
            text: "ALARM! Der Großraumdrucker rattert wie ein Maschinengewehr! Er spuckt hunderte schwarze Seiten aus, Rauch steigt auf. Das Display blinkt: 'FEED ME STRAY CAT'. Er droht zu überhitzen und die Sprinkleranlage auszulösen!",
            timer: 15,
            fail: { r: "BOOOOM! Der Drucker ist explodiert. Die Sprinkler gehen an. Alles ist nass. Du bist nass. Der Tag ist gelaufen.", f: -10, a: 50, c: 50 },
            opts: [
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
                },
                { 
                    t: "Stecker ziehen", 
                    m: 5, f: 0, a: 10, c: 20, 
                    r: "Du kriechst unter den Tisch und reißt das Kabel raus. Dabei fährst du den PC der Sekretärin mit runter. Sie schreit. Der Drucker ist aus, aber der Ärger ist groß." 
                }
            ]
        },
		{
            id: "boss_cable_mess",
            title: "BOSS: DER ISO-PRÜFER KOMMT",
            text: "PANIK! Der strenge Prüfer vom TÜV steht im Flur! Er steuert direkt auf den Serverraum zu! Dort hängen die Kabel wie Lianen im Dschungel von der Decke. Wenn er das sieht, entzieht er uns die Zertifizierung!",
            timer: 20,
            fail: { r: "Der Prüfer öffnet die Tür. Er sieht das Chaos. Er weint leise. 'Zertifikat entzogen.' Der Chef tobt.", f: 0, a: 40, c: 60 },
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
            ]
        },
		{
            id: "boss_water_leak",
            title: "BOSS: DAS ROHR BRICHT",
            text: "ZISCH! In der Teeküche ist ein Rohr geplatzt! Ein Strahl heißes Wasser schießt quer durch den Raum... direkt auf die ungeschützte Steckdosenleiste des Etagen-Verteilers! Stromausfall in 3... 2...",
            timer: 15,
            fail: { r: "ZAPP! Kurzschluss. Funkenflug. Dunkelheit. Der Server ist tot. Der Kühlschrank ist tot. Der Chef steht im Dunkeln und brüllt deinen Namen.", f: 0, a: 50, c: 50 },
            opts: [
                { 
                    t: "Mit Tape abdichten", 
                    req: "tape",
                    m: 5, f: 0, a: -10, c: 0, 
                    r: "Du wickelst eine halbe Rolle Tape um das Rohr. Es hält! Es tropft nur noch leicht. Das Provisorium wird hier die nächsten 10 Jahre bleiben." 
                },
                { 
                    t: "Daumen draufhalten", 
                    m: 60, f: -20, a: 30, c: 0, 
                    r: "Du hältst das Loch zu. Du stehst da 60 Minuten, bis der Klempner kommt. Dein Daumen ist verbrüht, deine Laune im Keller. Aber der Server lebt." 
                },
                { 
                    t: "Eimer drunterstellen", 
                    m: 5, f: 5, a: 0, c: 20, 
                    r: "Der Eimer ist sofort voll und läuft über. Das Wasser trifft die Steckdose. Kleiner Knall, Sicherung raus. Nicht ganz so schlimm wie ein Brand, aber peinlich." 
                }
            ]
        },
		{
            id: "boss_vga_fail",
            title: "BOSS: LIVESTREAM DESASTERS",
            text: "Der Chef hält seine Jahresrede live vor allen Investoren! Plötzlich flackert der Beamer. Das Bild wird lila, dann schwarz. Der VGA-Stecker am Podium ist locker und die Rändelschrauben fehlen! Der Chef schwitzt und starrt dich panisch an!",
            timer: 20,
            fail: { r: "Bild weg. Chef: 'Äh... Technik...' Die Investoren lachen. Der Aktienkurs fällt um 2%. Der Chef macht dich persönlich haftbar.", f: 0, a: 40, c: 80 },
            opts: [
                { 
                    t: "Stecker festschrauben", 
                    req: "screw",
                    m: 2, f: 5, a: -10, c: -10, 
                    r: "Du kriechst unter das Pult, zückst den Schraubendreher und fixierst den Stecker bombenfest. Das Bild ist kristallklar. Der Chef flüstert: 'Guter Mann!'" 
                },
                { 
                    t: "Kabel festhalten (Human Tripod)", 
                    m: 45, f: -15, a: 20, c: 0, 
                    r: "Du musst das Kabel die restlichen 45 Minuten der Präsentation in einem bestimmten Winkel festhalten. Deine Hand krampft. Du bist im Bild des Livestreams zu sehen. Peinlich." 
                },
                { 
                    t: "Wackeln & Beten", 
                    m: 5, f: 0, a: 10, c: 30, 
                    r: "Es geht kurz... dann wieder aus... dann an... Stroboskop-Effekt. Ein Investor bekommt einen epileptischen Anfall. Abbruch." 
                }
            ]
        },
        {
            id: "boss_audit",
            title: "📋 DER DATENSCHUTZ-AUDITOR 📋",
            text: "Ein externer Prüfer steht unangekündigt im Serverraum! Er will das 'Notfall-Handbuch' und das 'Lösch-Protokoll' sehen! Du hast beides nicht! Er zückt den roten Stift!",
            timer: 15,
            fail: { r: "Durchgefallen! Bußgeld: 50.000€. Die Firma ist pleite. Du bist schuld.", f: -50, a: 50, c: 100 },
            opts: [
                { 
                    t: "Altes Handbuch zeigen", 
                    req: "manual", 
                    m: 5, f: 10, a: -10, c: -10, 
                    r: "Du wirfst ihm das Win95 Handbuch hin. Er blättert... nickt... 'Sehr klassisch. Genehmigt.' Puh. Kompetenz durch Alter." 
                },
                { 
                    t: "Ablenken (Kaffee)", 
                    m: 10, f: 5, a: 0, c: 10, 
                    r: "Du lädst ihn zum Kaffee ein. Er vergisst das Protokoll, aber beschwert sich über den Geschmack. Prüfung bestanden (knapp)." 
                },
                { 
                    t: "Feueralarm auslösen", 
                    req: "hammer", 
                    m: 5, f: 0, a: 10, c: 30, 
                    r: "Du schlägst den Melder ein. Prüfung wegen Evakuierung abgebrochen. Radikal, aber effektiv." 
                }
            ]
        },
        {
            id: "boss_flood",
            title: "🌊 DAS AQUARIUM PLATZT 🌊",
            text: "Das riesige Zierfisch-Aquarium im Chefbüro hat einen Riss! 500 Liter Wasser drohen auf den Perserteppich und die Boden-Steckdosen zu laufen! Der Chef schreit: 'RETTE DIE KOIS!'",
            timer: 12,
            fail: { r: "Das Wasser läuft aus. Kurzschluss. Büro zerstört. Kois tot. Du bist gefeuert.", f: 0, a: 50, c: 100 },
            opts: [
                { 
                    t: "Riss kleben", 
                    req: "tape", 
                    m: 5, f: -5, a: 0, c: -20, 
                    r: "Panzertape hält alles! Auch 500 Liter Wasserdruck (fürs Erste). Die Kois leben. Der Chef umarmt dich (nass)." 
                },
                { 
                    t: "Wasser aufsaugen (Kleidung)", 
                    m: 20, f: -10, a: 20, c: -5, 
                    r: "Du wirfst deinen Pulli in die Pfütze. Es reicht nicht. Der Teppich ist ruiniert, aber du hast 'Einsatz' gezeigt." 
                },
                { 
                    t: "Kois retten (Kescher)", 
                    req: "zip_ties", 
                    m: 10, f: 0, a: -10, c: -10, 
                    r: "Du baust aus Kabelbindern und Müllbeutel einen Kescher. Fische gerettet. Das Büro ist geflutet, aber die Tiere leben." 
                }
            ]
        },
        {
        id: "boss_demo_fail",
        title: "☠️ DIE LIVE-DEMO ☠️",
        text: "Der Chef präsentiert gerade live im TV! Auf der riesigen Leinwand hinter ihm erscheint plötzlich dein Desktop... und du hast 'Solitär' offen! Die ganze Welt sieht es! Du hast 10 Sekunden!",
        timer: 10,
        opts: [
            { 
                t: "Brutal: Kabel mit Schere kappen", 
                m: 5, f: -10, a: 20, c: 10, 
                r: "Ratsch! Bild schwarz. Der Chef stammelt: 'Technische Störung!'. Du hast den Tag gerettet, aber ein HDMI-Kabel im Wert von 50€ zerstört." 
            },
            { 
                t: "Hacker-Move: Zu Excel wechseln", 
                req: "admin_pw", 
                m: 5, f: 5, a: -10, c: -10, 
                r: "In Millisekunden wechselst du auf eine komplizierte Tabelle. Die Zuschauer denken, das gehört zur Show. 'Und hier sehen Sie unsere Effizienz!', ruft der Chef. Gerettet!" 
            }
        ],
        fail: { m: 60, f: 0, a: 50, c: 80, r: "ZU LANGSAM! Du klickst versehentlich auf 'Neues Spiel'. Die Investoren lachen. Du bist das Meme des Monats." }
    },
    ],

// === ANRUFE ===
    calls: [
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
            truth: { txt: "Egon glaubt dir. Er geht hoch und schreit Meyer an.", m: 5, f: 5, a: -5, c: 0 },
            lie: { txt: "Du nimmst die Schuld auf dich. Meyer schickt dir dankbar Pralinen.", m: 10, f: 0, a: -10, c: 10, loot: "donut" }
        }
    },
        {
            id: "call_kevin",
            title: "Kevin (Azubi)",
            text: "Duuu? Ich hab glaub ich das Internet gelöscht. Ich wollte Fortnite installieren und hab den Ordner 'System32' in den Papierkorb geschoben, um Platz zu machen. Jetzt ist der Bildschirm blau und schreit mich an.",
            opts: [
                { 
                    t: "Ihn anschreien: 'BIST DU WAHNSINNIG?!'", 
                    m: 15, f: 0, a: -20, c: 20, 
                    r: "Du brüllst so laut ins Telefon, dass man es im Nachbarbüro hört. Kevin weint leise am anderen Ende. Deine Wut sinkt etwas, auch wenn der PC immer noch kaputt ist." 
                },
                { 
                    t: "Befehl: 'Formatieren! Lern was draus!'", 
                    m: 30, f: 10, a: 0, c: 5, 
                    r: "Du zwingst ihn, alles selbst neu aufzusetzen. Er ist den ganzen Tag beschäftigt und lernt hoffentlich, dass man Systemordner in Ruhe lässt." 
                },
                { 
                    t: "Hingehen und alles mühsam retten", 
                    m: 90, f: -30, a: 10, c: -10, 
                    r: "Du sitzt 1,5 Stunden an seinem PC und stellst Daten wieder her. Lebenszeit, die dir niemand zurückgibt. Kevin fragt am Ende: 'Darf ich jetzt Minecraft installieren?'" 
                }
            ]
        },
        {
            id: "call_ceo",
            title: "CEO Dr. Wichtig",
            text: "Müller! Ich bin am Flughafen. Mein iPad geht nicht! Ich drücke den Knopf und nichts passiert! FIXEN SIE DAS REMOTE! SOFORT! Ich verliere hier Millionen!",
            opts: [
                { t: "Stressball kneten", req: "stressball", m: 60, f: -10, a: -10, c: -10, r: "Du bleibst ruhig, während er schreit. Es war nur der Akku." },
                { t: "Ist der Akku leer?", m: 60, f: -10, a: 30, c: -10, r: "Es war der Akku. Er hat kein Kabel dabei und gibt dir die Schuld. Er schreit dich 10 Min an, warum du nicht hellsehen konntest." },
                { t: "Lüge: 'Sonnenwinde stören'", m: 5, f: 30, a: 0, c: 25, r: "Er glaubt es sofort. 'Verdammte Technik!' Er kauft sich eine Zeitung. Risiko: Hoch, aber erfolgreich." }
            ]
        },
        {
            id: "call_markus",
            title: "Vertriebsleiter Markus",
            text: "ICH KANN MEINE E-MAILS NICHT DRUCKEN! WENN ICH DAS ANGEBOT NICHT IN 5 MINUTEN AUF PAPIER HABE, KOSTET DAS DIE FIRMA EINE MILLION EURO! KOMMEN SIE HER!",
            opts: [
                { t: "Mit Panzertape fixen", req: "tape", m: 15, f: -5, a: -5, c: -5, r: "Du hast die Papierkassette mit Tape festgeklebt. Es hält... vorerst. Markus grunzt zufrieden." },
                { t: "Ist Papier im Drucker?", m: 10, f: -5, a: 20, c: -5, r: "Nein, war keins drin. Er entschuldigt sich natürlich nicht, sondern sagt: 'Das ist Ihre Aufgabe!'" },
                { t: "PDF per Mail senden", m: 5, f: 10, a: 0, c: 5, r: "Er versteht nicht, wie das geht. 'Ich will Papier!!' Du legst genervt auf." }
            ]
        },
        {
        id: "call_sekretary_1",
        title: "Die Sekretärin (Wütend)",
        text: "Gabi vom Empfang brüllt ins Telefon: 'Der Drucker macht Geräusche wie eine sterbende Kaffeemühle! Ich habe seit heute Morgen keinen Kaffee und jetzt das! Tu was, sonst fliegt das Ding aus dem Fenster!'",
        opts: [
            { t: "Donut anbieten", req: "donut", r: "Du opferst deinen Notfall-Donut. Gabi beißt rein, ihr Blutzucker steigt, die Wut sinkt. Der Drucker ist immer noch kaputt, aber sie ignoriert es jetzt.", m: 10, f: 10, a: -20, c: 5 },
            { t: "Aufschrauben", req: "screw", next: "call_sekretary_cable", r: "Du öffnest die Wartungsklappe. Eine Büroklammer und drei Gummibärchen blockieren die Walze. Du holst sie raus. 'So, geht wieder!' ... Denkste.", m: 15, f: -5, a: 0, c: 0 },
            { t: "Vortrag halten", next: "call_sekretary_rage", r: "Du erklärst ihr den Unterschied zwischen Lasertrommel und Fixiereinheit. Ihre Augenbraue zuckt gefährlich.", m: 10, f: -5, a: 10, c: 0 }
        ]
    },
    {
        id: "call_sekretary_2a",
        title: "Drucker: Fehler 404",
        reqStory: "call_sekretary_cable",
        text: "Die Mechanik läuft, aber das Display blinkt rot: 'OFFLINE'. Du schaust hinter das Gerät. Die LAN-Buchse ist leer. Daneben liegt ein Zettel von Chantal: 'Hab das Kabel für meinen Insta-Ringlicht-Strom gebraucht, Bussi!'",
        opts: [
            { t: "Neues Kabel legen", req: "cable", r: "Zack. Kabel rein. Grüne LED. Der Drucker spuckt sofort 50 Seiten 'Wichtige Akten' aus. Gabi schaut dich an wie einen Halbgott.", m: 2, f: -5, a: -10, c: -5 },
            { t: "Chantal suchen", r: "Du rennst durchs Haus, findest Chantal, streitest dich um das Kabel, kommst zurück. Gabi hat in der Zwischenzeit den Stecker gezogen. 'Jetzt ist er aus. Auch gut.'", m: 30, f: -10, a: 20, c: 10 },
            { t: "WLAN-Antenne basteln", req: "tape", r: "Du versuchst, aus einer Büroklammer und Tape eine Antenne zu bauen. Gabi fragt, ob du noch ganz dicht bist. Es funktioniert natürlich nicht.", m: 20, f: 0, a: 15, c: 5 }
        ]
    },
    {
        id: "call_sekretary_2b",
        title: "Gabi sieht rot (und schwarz)",
        reqStory: "call_sekretary_rage",
        text: "Gabi hat genug von deinem Vortrag. 'Ich zeig dir mal, was kaputt ist!' Sie reißt die Toner-Kartusche raus und schüttelt sie wild. Eine schwarze Staubwolke explodiert im Raum. Du siehst aus wie ein Schornsteinfeger.",
        opts: [
            { t: "Wegrennen", r: "Du fliehst hustend. Gabi wirft dir den leeren Toner hinterher. Du hinterlässt schwarze Fußabdrücke im Flur.", m: 5, f: 0, a: 20, c: 10 },
            { t: "Putzen helfen", r: "Du versuchst, den Toner wegzuwischen. Er schmiert nur noch mehr. Nach einer Stunde sehen ihr beide aus wie Bergarbeiter. Aber das schweißt zusammen.", m: 60, f: -20, a: -5, c: 0 },
            { t: "Erklären, dass Toner giftig ist", r: "Gabi fängt an zu weinen. Dann zu schreien. Der Sicherheitsdienst begleitet dich raus.", m: 10, f: 0, a: 50, c: 20 }
        ]
    },
        {
            id: "call_egon",
            title: "Hausmeister Egon",
            text: "Im Serverraum tropft es von der Decke. Das Wasser ist neongrün. Soll ich Eimer drunterstellen oder ist das Kühlflüssigkeit von den Aliens?",
            opts: [
                { t: "Sofort hinrennen!", m: 45, f: -20, a: 20, c: -15, r: "Es war Energy-Drink vom Stockwerk drüber. Ein Azubi hat gekleckert. Server gerettet." },
                { t: "Egal, lass tropfen", m: 5, f: 30, a: 0, c: 40, r: "Ein Switch ist kurzgeschlossen. Das Internet in Etage 3 ist weg. Ups." }
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
                m: 1, f: 0, a: 5, c: 0,
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
            title: "Chantal (Marketing)",
            text: "Wieso ist Zalando gesperrt? Ich muss... Recherche machen! Für Trends! Mach das auf, sonst sag ich dem Chef, du guckst Pornos auf der Arbeit!",
            opts: [
                { 
                    t: "Gegenangriff: 'Ich sag nur: Deine Spesenabrechnung...'",
                    req: "secret_list", 
                    m: 5, f: 0, a: -10, c: -10, 
                    r: "Du erwähnst ganz ruhig ihre gefälschten Zahlen aus der Geheimakte. Sie wird kreidebleich, stammelt eine Entschuldigung und legt sofort auf. Schachmatt." 
                },
                { 
                    t: "Angst haben & sofort freischalten",
                    m: 10, f: 15, a: 10, c: 20, 
                    r: "Du hast Angst vor dem Gerücht und gibst ihr Zugriff. Sie shoppt jetzt Schuhe. Du hast deine Ruhe, aber die Firewall ist jetzt offen wie ein Scheunentor." 
                },
                { 
                    t: "Stur die IT-Richtlinie zitieren",
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
            title: "Praktikant Kevin (Wieder)",
            text: "Du, ich hab das Internet kaputt gemacht. Ich brauch das Admin-Passwort um den Treiber neu zu starten. Der Chef killt mich sonst!",
            opts: [
                { t: "Passwort eingeben", req: "admin_pw", m: 5, f: 20, a: 0, c: 0, r: "Du loggst dich remote ein, zack, fertig. Kevin himmelt dich an." },
                { t: "Hingehen und fixen", m: 60, f: -20, a: 20, c: -10, r: "Ohne das Passwort musstest du den Safe-Mode nutzen. Hat ewig gedauert." }
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
            truth_oma: { txt: "Egon lacht. 'Grüß sie schön.' Er macht den Strom wieder an.", m: 10, f: 5, a: -15, c: 0 }
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
                    m: 5, f: -10, a: 20, c: 50, 
                    r: "Panikreaktion! Du hast alle Beweise vernichtet. Der Auditor ruft nicht mehr an, aber morgen wird der Chef fragen, wo die Datenbank hin ist." 
                },
                { 
                    t: "Alles gestehen & Lizenzen nachkaufen",
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
                { t: "Sofort die Ports öffnen", m: 10, f: 20, a: 0, c: 10, r: "Der Junge ist glücklich. 2 Stunden später ist das Firmennetz voller russischer Bots, weil du alles aufgemacht hast. Das wird ein Nachspiel haben." },
                { t: "Erziehungsmaßnahme: 'Hör zu, Kleiner...'", m: 5, f: 0, a: -20, c: 30, r: "Du erklärst ihm lautstark, dass er ein verzogenes Balg ist. Er fängt an zu schreien. Der Chef kommt bereits die Treppe runtergestampft." },
                { t: "Lügen: 'Die Firewall-Matrix hat negative Polarität'", m: 15, f: 5, a: 0, c: -5, r: "Du brabbelst technisches Kauderwelsch. Er checkt es nicht, murmelt 'Scheiß Technik' und legt auf. Gefahr gebannt." }
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
                { t: "Neuen PC bestellen", m: 10, f: 10, a: -5, c: 20, r: "Das war dem Chef zu teuer. Abmahnung droht." }
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
                m: 20, f: -20, a: 15, c: -10,
                r: "Du erklärst ihm 20 Minuten lang, welche Ader wohin gehört. 'Weiß-Orange auf Eins...' Es ist mühsam, Müller versteht nichts, aber am Ende steht die Verbindung. Der Chef lobt den Einsatz." 
            }
        ]
    },
        {
            id: "call_pw_lost",
            title: "Passwort-Vergesser",
            text: "Der CEO ruft an: 'Müller! Ich komme nicht ins System! Welches Passwort habe ich für den Server 'Geheim' gesetzt? Sie müssen das doch wissen!'",
            opts: [
                { t: "Root-Zugang nutzen & zurücksetzen", req: "admin_pw", m: 5, f: 10, a: 0, c: -10, r: "Du setzt es remote auf 'Chef123' zurück. Er atmet auf: 'Gute Arbeit, Müller. Behalten Sie das für sich.'" },
                { t: "Mit ihm gemeinsam raten", m: 20, f: 0, a: 20, c: 10, r: "Du fragst: 'War es vielleicht Ihr Geburtstag?' Nein. 'Name der Geliebten?' Langes Schweigen. Er wird langsam richtig wütend." },
                { t: "Passwort mit dem USB-Stick knacken", req: "usb_stick", m: 10, f: 5, a: 0, c: 0, r: "Du liest das Passwort in 10 Sekunden aus. Er ist tief beeindruckt von deinen Hacker-Skills (und sollte dir eigentlich aus Angst sofort kündigen)." }
            ]
        },
        {
            id: "call_monitor_arm",
            title: "Der Monitor-Arm",
            text: "Der Monitorarm im Meetingraum sinkt immer langsam nach unten. Mitten in der Präsentation guckt der Bildschirm auf den Tisch.",
            opts: [
                { t: "Schraube festziehen", req: "screw", m: 5, f: 0, a: -5, c: 0, r: "Ein Dreh, fertig. Physik besiegt." },
                { t: "Stütze bauen", req: "manual", m: 5, f: 5, a: 0, c: 0, r: "Du hast das Win95 Handbuch drunter geklemmt. Passt perfekt." },
                { t: "Ignorieren", m: 0, f: 10, a: 0, c: 5, r: "Die Kollegen müssen sich halt bücken." }
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
            hello: { txt: "Aufgelegt.", m: 1, f: 0, a: 0, c: 0 }
        }
    },
		{
            id: "call_boss_wording",
            title: "Der Chef (Hektisch)",
            text: "MÜLLER! Der Drucker im Flur qualmt! Das Papier ist alle und der Toner ist explodiert! Das ist ein riesiges... na, sagen Sie schon! Was haben wir da?!",
            opts: [
                { 
                    t: "Ein riesiges Problem!",
                    m: 10, f: 0, a: 10, c: 25, 
                    r: "Der Chef schreit: 'WIR HABEN KEINE PROBLEME! WIR HABEN HERAUSFORDERUNGEN! Sie haben die falsche Einstellung, Müller!' Er legt wütend auf." 
                },
                { 
                    t: "Eine spannende Herausforderung!",
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
            title: "Hausmeister Egon (Frierend)",
            text: "Müller! Im Serverraum sind minus 10 Grad! Ich steh hier vor der Anlage. Meine Brille ist beschlagen, mir frieren die Zehen ab! Ich muss das Ding wärmer stellen! Soll ich den Regler in den roten oder den blauen Bereich drehen? Schnell!",
            opts: [
                { 
                    t: "Auf ROT drehen! Rot ist immer warm!",
                    m: 30, f: -10, a: 20, c: 10, 
                    r: "FALSCH! Dank der kreativen Verkabelung des Vorbesitzers hast du auf 'Schock-Frost' gestellt. Die Rohre platzen mit einem lauten Knall. Egon ist jetzt ein Eiszapfen." 
                },
                { 
                    t: "Auf BLAU drehen! Vertrau mir!", 
                    m: 5, f: 5, a: 0, c: -5, 
                    r: "Egon zögert: 'Blau? Bist du sicher? Das ist doch Kalt...' Er dreht auf Blau. Plötzlich strömt warme Luft. 'Verrückte Technik! Du bist ein Genie, Müller!'" 
                },
                { 
                    t: "Mir egal, dreh einfach an irgendwas!", 
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
                    m: 10, f: 0, a: 0, c: 30, 
                    r: "Die Feuerwehr hat die Tür aufgebrochen. Rechnung: 500€. Der Chef tobt: 'Wieso wussten Sie den Code nicht?!'" 
                }
            ]
        },
        {
        id: "call_kevin_button_1",
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
                m: 5, f: -10, a: 20, c: 10,
                next: "kevin_alarm"
            },
            res_disaster: { 
                txt: "Das Licht wird rot. Halon-Gas flutet den Serverraum.", 
                m: 5, f: -20, a: 30, c: 20,
                next: "kevin_gas"
            }
        }
    },
    {
        id: "call_kevin_button_2",
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
            truth: { txt: "Fehlalarm kostet 500€. Diskussion dauert ewig.", m: 30, f: 0, a: -5, c: 10 },
            lie: { txt: "Sie kommen mit 3 Löschzügen. Evakuierung.", m: 60, f: -10, a: 50, c: 50 }
        }
    },
		{
            id: "call_gabi_sugar",
            title: "Sekretärin Gabi (Zitternd)",
            text: "Herr Müller... mir ist so schwindelig... Unterzucker... Ich brauche Schokolade... sofort! Aber der Automat ist leer! Haben wir nirgendwo was Süßes?!",
            opts: [
                { 
                    t: "Ich glaube im Kühlschrank ist Senf?",
                    m: 10, f: 0, a: 10, c: 0, 
                    r: "Gabi legt auf. Später hörst du, dass sie vor Schwäche ohnmächtig geworden ist. Der Sanitäter musste kommen." 
                },
                { 
                    t: "Guck mal in den Ordner 'Steuer 1990'...",
                    m: 5, f: 10, a: -10, c: -5, 
                    r: "Stille. Dann ein Rascheln und Schmatzen. 'Oh Gott, Sie sind ein Lebensretter! Woher wussten Sie...? Egal! Danke!'" 
                },
                { 
                    t: "Ich hab hier einen halben Donut", 
                    req: "donut", 
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
            title: "Frau Elster (Buchhaltung)",
            text: "Schluchz... 'Herr Müller? Meine Excel-Tabelle ist weg! Alles schwarz! Ich drücke Tasten, aber nichts passiert! Ich bin so zittrig heute...'",
            opts: [
                { 
                    t: "Kalt: 'Haben Sie ein Ticket?'", 
                    m: 5, f: 5, a: 5, c: 5, 
                    r: "Sie legt weinend auf. Das Problem ist nicht gelöst." 
                },
                { 
                    t: "Beruhigen & Auto-Save prüfen", 
                    m: 20, f: -5, a: -10, c: 0, 
                    r: "Du redest ihr gut zu. Die Datei ist wieder da. Sie atmet auf: 'Danke! Sie sind so lieb. Genau wie mein Kater *Rüdiger*. Der spürt auch immer, wenn es mir schlecht geht. Rüdiger ist mein einziger Halt.'" 
                },
                { 
                    t: "Neustart befehlen", 
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
                    m: 2, f: 0, a: 10, c: 15, 
                    r: "Gerumpel am anderen Ende. 'WER IST DA?! MÜLLER?! LAUSCHEN SIE MIR ETWA NACH?!' Er legt wütend auf. Das war keine gute Idee." 
                },
                { 
                    t: "Sofort auflegen", 
                    m: 1, f: 0, a: 0, c: 0, 
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
                    m: 5, f: 0, a: 30, c: 30, 
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
            title: "Dr. Wichtig im Tunnel",
            text: "Der CEO ruft an. Rauschen. Hupen. 'Müller! ...wichtig! ...müssen sofort... *KCHHH* ...die Kosten... *KRRRK* ...streichen?!'",
            opts: [
                { 
                    t: "Ja sagen & Nicken (Blindflug)", 
                    m: 5, f: 5, a: 0, c: 20, 
                    r: "Du sagst 'Jawohl, Chef!'. Er legt auf. Später erfährst du: Er fragte 'Soll ich das IT-Budget streichen?'. Glückwunsch, Eigentor. Radar +20." 
                },
                { 
                    t: "Auflegen (Verbindung weg)", 
                    m: 2, f: 0, a: 0, c: 0, 
                    r: "Du legst einfach auf. Er denkt, das Funkloch war schuld. Taktisch klug." 
                },
                { 
                    t: "Laut 'HALLO?!' schreien", 
                    m: 10, f: -5, a: 5, c: 10, 
                    r: "Du brüllst ins Telefon. Er ist genervt von deiner Inkompetenz. 'Müller, kaufen Sie sich ein besseres Handy!'" 
                }
            ]
        },
        {
            id: "call_kevin_microsoft",
            title: "Kevins Ticket",
            text: "Kevin hat wegen einer 'ruckelnden Maus' Microsoft angerufen. Er reicht dir den Hörer. Ein Support-Mitarbeiter (sehr starker Akzent) spricht schnell: 'Sir, kindly do the needful and truncate the production database logs to fix latency, okay?'",
            opts: [
                { 
                    t: "Zu Kevin: 'Ja, mach was er sagt'", 
                    m: 10, f: 10, a: 0, c: 40, 
                    r: "Kevin tippt 'TRUNCATE DATABASE'. Zack. Die Kundendatenbank ist leer. Die Maus ruckelt immer noch. Das gibt eine Katastrophe!" 
                },
                { 
                    t: "Hörer nehmen & 'NO! STOP!'", 
                    m: 15, f: -5, a: 10, c: -5, 
                    r: "Du schreist den Support an und legst auf. Kevin guckt verdattert. Du hast gerade die Firma gerettet." 
                },
                { 
                    t: "Kevin: 'Starte einfach neu'", 
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
                    r: "Du erklärst ihm geduldig Computer-Architektur. Er hört nicht zu. 'Ich starte lieber neu, bevor Sie noch mehr kaputt machen.' Er hält dich für inkompetent (Karriere sinkt leicht), aber er lässt dich in Ruhe." 
                },
                { 
                    t: "Placebo: 'Ich kalibriere den Sensor neu...'", 
                    m: 5, f: 10, a: -10, c: 0, 
                    r: "Du tippst lautlos auf deine Leertaste und sagst 'Beep'. Der User bewegt die Maus. 'Wow! Viel besser! Danke!' Ein Sieg für die Faulheit und den Frieden." 
                },
                { 
                    t: "Wahrheit: 'Nein, Sie bilden sich das ein.'", 
                    m: 5, f: 0, a: 10, c: 15, 
                    r: "'Unverschämtheit! Ich melde das dem Chef!' Er knallt den Hörer auf. Dein Radar schießt hoch, aber dein Stolz bleibt intakt." 
                }
            ]
        },
        {
            id: "call_mouse_in_printer",
            title: "Drucker macht Geräusche",
            text: "Sekretariat: 'Der Drucker quiekt so komisch beim Drucken.'",
            opts: [
                { 
                    t: "Hingehen & Prüfen", 
                    m: 15, f: -5, a: 0, c: -5, 
                    r: "Eine Maus war im Papierschacht. Sie lebt. Du setzt sie im Hof aus. Gabi findet dich toll." 
                },
                { 
                    t: "Mit Hammer drohen", 
                    req: "hammer", 
                    m: 10, f: 0, a: 10, c: 0, 
                    r: "Du stellst den Hammer demonstrativ neben den Drucker. Er druckt plötzlich leise. Maschinen haben Angst." 
                },
                { 
                    t: "Ignorieren", 
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
        id: "call_story_gabi_1",
        title: "Gabi (Empfang)",
        startNode: "root",
        nodes: {
            root: {
                text: "'Gabi ruft an. Ihre Stimme zittert gefährlich. 'Hier stehen fünf Kuriere, das Telefon klingelt ununterbrochen und mein Outlook hängt. Wenn jetzt noch einer fragt, wo die Toilette ist, fange ich an zu schreien.''\n\nSie steht kurz vor dem Burnout.",
                opts: [
                    { t: "Lösung: 'Remote Neustart'", next: "res_restart" },
                    { t: "Abwimmeln: 'Schreib ein Ticket'", next: "res_ticket" },
                    { t: "Beruhigen: 'Ich blocke deine Anrufe'", next: "res_calm" }
                ]
            }
        },
        results: {
            res_restart: { 
                txt: "Du klickst. Ihr PC geht aus. Gabi schreit auf: 'NEIN! Ich hatte eine Mail offen!' *Klick*. Sie legt auf. Du hast geholfen, aber es schlimmer gemacht.", 
                m: 2, f: 0, a: 5, c: 0 
            },
            res_ticket: { 
                txt: "Sie atmet tief ein. 'Alles klar. Danke für nichts.' Sie legt ruhig auf. Zu ruhig.", 
                m: 2, f: 0, a: 0, c: 0 
            },
            res_calm: { 
                txt: "Du leitest das Telefon kurz auf die Mailbox um. 'Oh Gott...', hörst du sie ausatmen. 'Stille. Danke. Du bist meine Rettung.'", 
                m: 10, f: -5, a: -5, c: 5,
                next: "gabi_friend"
            }
        }
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
            res_nothing: { txt: "Du bleibst loyal und arm.", m: 5, f: 0, a: -5, c: -5 }
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
                r: "Du musst ihm Excel erklären. Am Telefon. Es dauert ewig. Er versteht es kaum. Du spürst, wie deine Gehirnzellen absterben (+Aggro), aber du hast das Problem gelöst" 
            },
            { 
                t: "Abwimmeln: 'Das ist ein Anwenderfehler.'", 
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
    ],

    // === SERVERRAUM ===
    server: [
        {
            id: "srv_lore",
            title: "Der vergessene Aktenschrank",
            text: "Ganz hinten, hinter dem alten Mainframe, steht ein offener Aktenschrank mit der Aufschrift 'VERTRAULICH'.",
            opts: [
                { t: "Darin stöbern", loot: "secret_list", m: 15, f: 5, a: 0, c: 5, r: "Du findest die 'Schwarze Liste' der HR-Abteilung. Pures Dynamit! Inventar +1." },
                { t: "Ignorieren", m: 5, f: 0, a: 0, c: 0, r: "Besser nichts wissen." }
            ]
        },
    {
        id: "srv_sleep_1",
        title: "Das Karton-Lager",
        text: "Hinter den Racks stapeln sich alte Server-Verpackungen bis zur Decke. Eigentlich müsstest du sie zum Altpapier bringen. Aber wenn man sie geschickt anordnet, ergibt das eine blickdichte Höhle...",
        opts: [
            { 
                t: "Eine geheime 'Festung' bauen", 
                next: "fort_built",
                m: 60, f: 35, a: 0, c: 10, 
                r: "Du baust dir ein gemütliches Nest hinter der Kartonwand. Niemand kann dich hier sehen. Du machst ein nickerchen und lässt das Bauwerk für 'zukünftige Notfälle' stehen." 
            },
            { 
                t: "Alles sofort entsorgen", 
                m: 30, f: -10, a: 5, c: 0, 
                r: "Du schleppst die Kartons zum Container. Es ist langweilig und du schwitzt, aber der Serverraum ist jetzt wieder vorschriftsmäßig leer." 
            },
            { 
                t: "Schild 'RÜCKSENDUNG' dran & liegen lassen", 
                m: 5, f: 10, a: -5, c: 0, 
                r: "Du klebst wahllos Zettel auf die Stapel. Jetzt sieht es aus wie ein wichtiger Vorgang. Das Problem des 'Zukunfts-Ichs'." 
            }
        ]
    },
    {
        id: "srv_sleep_2",
        title: "Architektonische Fragen",
        reqStory: "fort_built",
        text: "Du betrittst den Serverraum und dein Herz rutscht in die Hose. Der Chef steht mit verschränkten Armen vor deiner Karton-Festung hinter Rack 3. Er tippt mit dem Fuß dagegen. 'Müller? Warum haben wir hier einen Slum?'",
        opts: [
            { 
                t: "Ausrede: 'Das ist thermische Isolierung!'", 
                m: 10, f: 5, a: 5, c: 10, 
                r: "Du faselst etwas von 'Luftstrom-Optimierung' und 'Kältebrücken'. Der Chef sieht skeptisch aus, nickt aber dann. 'Kreativ. Aber hässlich. Weg damit bis morgen.' Zeit gewonnen." 
            },
            { 
                t: "Panik: 'Das war Kevin! Ich räume es weg!'", 
                m: 20, f: -10, a: 10, c: 0, 
                r: "Der Chef schnaubt. 'Dieser Azubi... Sorgen Sie für Ordnung.' Du musst deine geliebte Festung unter den strengen Augen des Chefs abreißen. Ein trauriger Tag." 
            },
            { 
                t: "Ehrlichkeit: 'Das ist mein Rückzugsort.'", 
                m: 5, f: 0, a: -20, c: 30, 
                r: "Der Chef starrt dich an. 'Wir sind hier nicht bei Google, Müller. Keine Kuschelecken.' Er tritt deine Wand ein. 'Arbeiten Sie.' Deine Würde liegt in Trümmern." 
            }
        ]
    },
        {
            id: "srv_tool",
            title: "Werkzeugkasten",
            text: "Der externe Techniker hat seinen Koffer offen stehen lassen. Ein schöner Schraubendreher blitzt dich an.",
            opts: [
                { t: "Einstecken", loot: "screw", m: 5, f: 0, a: 0, c: 0, r: "Werkzeug kann man immer brauchen. Inventar +1." },
                { t: "Liegen lassen", m: 0, f: 0, a: 0, c: 0, r: "Du bist ehrlich. Leider bringt Ehrlichkeit keine XP." }
            ]
        },
        {
            id: "srv_bernd",
            title: "Der Kollege Bernd",
            text: "Du findest Bernd aus dem Vertrieb, der hier weinend auf dem Boden zwischen den warmen Server-Racks sitzt und eine Flasche Whisky trinkt. Er murmelt was von 'Umsatzzielen' und 'Scheidung'.",
            opts: [
                { 
                    t: "Sich dazusetzen & einen Schluck mittrinken", 
                    m: 30, f: 20, a: -40, c: 15, 
                    r: "Ihr leert die Flasche gemeinsam. Ihr seid beide leicht angeheitert. Bernd ist eigentlich ganz okay, wenn er nicht über 'Synergie-Effekte' redet. Ein seltener Moment echter Menschlichkeit." 
                },
                { 
                    t: "Ihn eiskalt bei HR verpetzen", 
                    m: 10, f: -10, a: 0, c: -10, 
                    r: "Du rufst die Personalabteilung. Bernd wird fünf Minuten später von der Security rausbegleitet. Sein Schreibtisch ist morgen frei. Du bist sicher, fühlst dich aber wie der größte Verräter der Firma." 
                }
            ]
        },
        {
            id: "srv_mining",
            title: "Hardware-Fund",
            text: "Ein altes Bitcoin-Mining-Rig läuft hinter einem Rack versteckt. Es gehört wohl dem Vorgänger. Es ist laut und heiß.",
            opts: [
                { t: "Laufen lassen", m: 5, f: 10, a: 0, c: 20, r: "Passives Einkommen! Aber wenn die Stromrechnung kommt, bist du dran." },
                { t: "Abschalten", m: 15, f: -5, a: 5, c: -5, r: "Stromrechnung gesenkt. Chef lobt die Energiebilanz, weiß aber nicht warum." }
            ]
        },
        {
            id: "srv_cable",
            title: "Kabel-Salat",
            text: "Du stolperst über ein loses Glasfaserkabel. Ein rotes Licht am Haupt-Switch blinkt hektisch. Das halbe Netzwerk wackelt.",
            opts: [
                { t: "Mit Tape flicken", req: "tape", m: 10, f: 0, a: 0, c: 0, r: "Provisorisch geflickt. Hält für immer." },
                { t: "Stecker wackeln", m: 10, f: -5, a: 10, c: 0, r: "Glück gehabt. Das Internet war nur 10 Sekunden weg." },
                { t: "Wegrennen", m: 5, f: 20, a: 0, c: 30, r: "Niemand hat dich gesehen. Die Firma ist offline. Du tust so, als wüsstest du von nichts." }
            ]
        },
        {
            id: "srv_drink",
            title: "Vergessener Snack",
            text: "Auf einem Server-Rack liegt eine Dose Energy Drink. Sie ist noch zu.",
            opts: [
                { t: "Trinken", loot: "energy", m: 5, f: -10, a: -10, c: 0, r: "Zucker und Koffein! Du fühlst dich bereit für den Kampf." },
                { t: "Stehen lassen", m: 0, f: 0, a: 0, c: 0, r: "Wer weiß, wie lange die da schon liegt." }
            ]
        },
        {
            id: "srv_extinguisher",
            title: "Sicherheits-Check",
            text: "Hinter einem alten CRT-Monitor findest du einen unbenutzten Feuerlöscher.",
            opts: [
                { t: "Einstecken", loot: "fire_ext", m: 10, f: 0, a: 0, c: 0, r: "Könnte man mal brauchen, wenn es brenzlig wird. Inventar +1." }
            ]
        },
        {
            id: "srv_manual",
            title: "Altes Buch",
            text: "Ein verstaubtes Windows 95 Handbuch liegt unter einem Tischbein.",
            opts: [
                { t: "Mitnehmen", loot: "manual", m: 5, f: 0, a: 0, c: 0, r: "Könnte nützlich sein bei DAUs. Inventar +1." }
            ]
        },
        {
        id: "srv_rat_1",
        title: "Das seltsame Geräusch",
        text: "Aus Rack 4 kommt ein kratzendes Geräusch. Es klingt nicht wie ein Lüfter. Eher wie... scharfe Zähne auf teurem Glasfaserkabel. Etwas Lebendiges nistet sich in der Firewall ein.",
        opts: [
            { t: "Dagegen treten", next: "srv_rat_damage", r: "BAM! Du trittst gegen den Serverschrank. Es quiekt panisch, dann hörst du ein lautes 'ZAPP' und Stille. Das Geräusch ist weg. Das Internet aber auch.", m: 5, f: 0, a: 10, c: 5 },
            { t: "Donut als Köder", req: "donut", next: "srv_rat_tamed", r: "Du legst ein Stück alten Donut vor das Rack. Ein Augenpaar leuchtet im Dunkeln auf. Schnuppergeräusche.", m: 10, f: 5, a: -10, c: 0 },
            { t: "Kammerjäger rufen", r: "Der Kammerjäger kommt in 3 Wochen. Bis dahin hat die Ratte das Rechenzentrum in ein Nest verwandelt.", m: 0, f: 10, a: 0, c: 10 }
        ]
    },
    {
        id: "srv_rat_2a",
        title: "Kollateralschaden",
        reqStory: "srv_rat_damage",
        text: "Du öffnest die Tür. Die Ratte ist geflohen, aber sie hat Rache genommen: Der Main-Uplink zum Backbone ist komplett durchgenagt. Funken sprühen. Das ganze Netzwerk ist tot.",
        opts: [
            { t: "Kabel tauschen", req: "cable", r: "Du ziehst den verschmorten Stummel raus und klickst dein Ersatzkabel rein. Link-LED wird grün. Sauberer Job.", m: 5, f: -5, a: -5, c: -10 },
            { t: "Flicken mit Tape", req: "tape", r: "Du verdrillst die Kupferadern und wickelst Tape drum. Es gibt Paketverlust (30%), aber es läuft. Hoffentlich guckt keiner rein.", m: 10, f: 0, a: 5, c: 5 },
            { t: "WLAN-Bridge bauen", r: "Du versuchst, das Rechenzentrum über dein Handy-Hotspot zu routen. Der Datentarif ist nach 3 Sekunden leer.", m: 20, f: 5, a: 20, c: 15 }
        ]
    },
    {
        id: "srv_rat_2b",
        title: "Ein neuer Freund",
        reqStory: "srv_rat_tamed",
        text: "Eine fette Kanalratte kriecht heraus und frisst den Donut. Sie sieht dich dankbar an und klettert auf deine Schulter. Sie scheint IT-Affinität zu haben.",
        opts: [
            { t: "Als 'Junior Admin' behalten", r: "Du nennst sie 'Splinter'. Sie wohnt jetzt im warmen Server-Rack und hält Ungeziefer fern.", m: 5, f: 10, a: -5, c: 0 },
            { t: "Hausmeister rufen", r: "Egon kommt mit einem großen Sack. Das Ende der Geschichte willst du nicht wissen.", m: 10, f: 0, a: 0, c: 0 }
        ]
    },
        {
            id: "srv_cold",
            title: "Die Kälte-Falle",
            text: "Jemand hat die Klimaanlage auf 16 Grad gestellt und den Türgriff von innen abgebrochen. Du bist eingesperrt und frierst!",
            opts: [
                { t: "Mit Hammer Tür einschlagen", req: "hammer", m: 15, f: -5, a: -10, c: 20, r: "BÄM! Tür offen. Du fühlst dich wie Thor. Der Chef wird Fragen zum Türblatt haben." },
                { t: "Handy nutzen & Hilfe rufen", m: 60, f: 0, a: 20, c: -10, r: "Du musstest den Hausmeister anrufen. Er hat 45 Minuten gebraucht. Du bist jetzt ein Eisblock." },
                { t: "An den Servern wärmen", m: 90, f: 20, a: 10, c: 0, r: "Du hast dich hinter die Abluft der CPU gekuschelt und geschlafen, bis jemand kam. Gemütlich." }
            ]
        },
        {
            id: "srv_red_1",
            title: "Die rote Flüssigkeit",
            text: "Unter Rack 7 bildet sich eine Pfütze. Sie ist tiefrot und klebrig. Es riecht süßlich. Ist das... Blut? Hydrauliköl? Oder Sirup? Über dir verläuft eigentlich keine Leitung.",
            opts: [
                { 
                    t: "Todesmutig den Finger reinstecken & probieren", 
                    next: "slushie_secret", // <--- Startet Teil 2
                    m: 5, f: 0, a: 0, c: 0, 
                    r: "Es ist... Kirsch-Slushie?! Du schiebst die Deckenplatte weg. Tatsächlich: Jemand hat hier eine illegale Slushie-Maschine versteckt, um Strom zu klauen. Du zapfst dir heimlich einen Becher ab. Lecker." 
                },
                { 
                    t: "Panik: Großalarm auslösen!", 
                    m: 30, f: -10, a: 20, c: 10, 
                    r: "Feuerwehr, Polizei und der Chef rücken an. Der 'biologische Gefahrstoff' entpuppt sich als ausgelaufene Kühlflüssigkeit mit rotem Farbstoff. Du stehst da wie ein Idiot." 
                },
                { 
                    t: "Einfach aufwischen & ignorieren", 
                    m: 15, f: 0, a: 0, c: -5, 
                    r: "Du wischst die Pfütze mit Taschentüchern weg. Was man nicht weiß, macht einen nicht heiß. Solange die LEDs grün blinken, ist alles gut." 
                }
            ]
        },
        {
            id: "srv_red_2",
            title: "Das große Krabbeln",
            reqStory: "slushie_secret", 
            text: "Du hörst ein seltsames Knistern aus Rack 7. Nicht elektrisch... organisch. Du leuchtest mit der Taschenlampe rein: Tausende Ameisen! Sie wurden von den klebrigen Slushie-Resten angelockt und bauen jetzt ein Nest im 10.000€ Switch.",
            opts: [
                { 
                    t: "Chemische Keule: Eine Dose Insektenspray reinleeren", 
                    m: 5, f: 5, a: -5, c: 5,
                    r: "Du sprühst, bis der Nebel steht. Die Ameisen sind tot. Der Lüfter des Switches verklebt zwar etwas, aber es läuft noch. Schnell weg hier, bevor jemand den Chemikalien-Geruch bemerkt." 
                },
                { 
                    t: "Alles ausbauen & einzeln reinigen", 
                    m: 60, f: -25, a: 15, c: -5,
                    r: "Eine Stunde lang pinselst du tote Ameisen von Platinen. Es ist eklig, aber du rettest die Hardware. Niemand erfährt von dem Vorfall. Saubere Arbeit." 
                },
                { 
                    t: "Den Azubi Kevin rufen: 'Mach das weg!'", 
                    m: 10, f: 10, a: -15, c: 20,
                    r: "Kevin sieht die Ameisen und schreit. Der Chef stürmt rein: 'WAS IST HIER LOS?!' Er sieht den Zucker. Du bekommst einen heftigen Einlauf wegen mangelnder Aufsicht, aber Kevin muss putzen." 
                }
            ]
        },
        {
            id: "srv_illegal",
            title: "Das illegale Datencenter",
            text: "Du lehnst dich gegen ein Regal und plötzlich schwingt eine falsche Wand auf. Dahinter: Ein kompletter, versteckter Serverraum! Er taucht in keinem Inventar auf. Auf den Bildschirmen flackern... nun ja, sehr 'eindeutige' Erwachsenenfilme. Die Admin-Konsole ist eingeloggt: Es gehört dem Vize-Chef.",
            opts: [
                { 
                    t: "Beweise sichern & Vize-Chef erpressen", 
                    req: "secret_list", 
                    m: 10, f: 30, a: 0, c: -30, 
                    r: "Du wedelst mit den Beweisen aus der Schwarzen Liste. Er wird kreidebleich und bietet dir sofort eine monatliche 'Schweigeprämie' als 'Beraterhonorar' an. Du bist jetzt offiziell korrupt." 
                },
                { 
                    t: "Sofort den Stecker ziehen! Alles aus!", 
                    m: 20, f: -10, a: 10, c: 50, 
                    r: "Stille. 30 Sekunden später stürmt der Vize-Chef hochrot herein und schreit dich an. 'Wissen Sie, wie viel Traffic wir verlieren?!' Das wird ein harter Machtkampf vor dem Betriebsrat." 
                },
                { 
                    t: "Klappe halten & Hardware mitnutzen", 
                    m: 5, f: 20, a: -10, c: 20, 
                    r: "Du installierst heimlich deinen privaten Minecraft-Server und einen Bitcoin-Miner auf der Hardware. Gratis Strom, High-Speed-Leitung und der Vize-Chef kann dich schlecht verpfeifen. Das perfekte Verbrechen." 
                }
            ]
        },
        {
            id: "srv_raccoon",
            title: "Der Eindringling",
            text: "Die Tür steht offen. Ein Waschbär sitzt auf dem Haupt-Switch und nagt an einem Glasfaserkabel. Er sieht dich an und faucht.",
            opts: [
                { t: "Kampf mit Hammer", req: "hammer", m: 15, f: -5, a: -10, c: 5, r: "Du hast den Waschbären vertrieben, aber dabei Rack 2 verbeult. Der Waschbär hat deine Uhr geklaut." },
                { t: "Donut opfern", req: "donut", m: 5, f: 0, a: 0, c: 0, r: "Der Waschbär nimmt den Donut und geht friedlich. Ein fairer Tausch." },
                { t: "Tür zu und hoffen", m: 0, f: 20, a: 0, c: 40, r: "30 Minuten später ist das Internet weg. Der Waschbär hat gewonnen." }
            ]
        },
        {
            id: "srv_floppy",
            title: "Flaschenpost aus der Vergangenheit",
            text: "Du findest eine alte Diskette mit der Aufschrift 'NOTFALLPLAN 1999'. Ein Zettel klebt daran: 'Wenn alles brennt, drück diesen Knopf.' Da ist ein roter Knopf an der Wand, den du noch nie gesehen hast.",
            opts: [
                { t: "Knopf drücken", m: 5, f: 10, a: -20, c: 100, r: "Die Halon-Löschanlage geht los! Der ganze Raum wird mit Gas geflutet. Atem anhalten! Das war teuer!" },
                { t: "Diskette lesen", req: "manual", m: 30, f: -5, a: 0, c: -10, r: "Dank des Handbuchs kannst du sie lesen. Es sind nur Highscores von Minesweeper. Enttäuschend." },
                { t: "Ignorieren", m: 0, f: 0, a: 0, c: 0, r: "Vielleicht besser so." }
            ]
        },
        {
            id: "srv_loot_box",
            title: "Die offene Werkzeugkiste",
            text: "Ein externer Techniker hat seine Kiste vergessen. Du siehst nützliche Dinge.",
            opts: [
                { t: "Kabelbinder klauen", loot: "zip_ties", m: 5, f: 5, a: 0, c: 0, r: "Eine Packung schwarze Kabelbinder. Gold wert! Inventar +1." },
                { t: "Schraubendreher nehmen", loot: "screw", m: 5, f: 5, a: 0, c: 0, r: "Ein guter Kreuzschlitz. Meiner! Inventar +1." },
                { t: "Stehen lassen", m: 0, f: 0, a: 0, c: 0, r: "Du hast genug Zeug." }
            ]
        },
        {
        id: "srv_found_stuff",
        title: "Fundsache im Regal",
        text: "Zwischen zwei Servern liegt etwas. Hat wohl jemand beim Patchen liegen lassen.",
        opts: [
            { 
                t: "Es sind Kopfhörer!", 
                loot: "headphones", 
                next: "found_headphones", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Teure Noise-Cancelling Kopfhörer. Finders Keepers. Inventar +1." 
            },
            { 
                t: "Es ist ein Hammer?", 
                loot: "hammer", 
                next: "found_hammer", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Warum liegt hier ein Hammer? Egal, nehm ich. Inventar +1." 
            }
        ]
    },
    {
        id: "srv_egon_headphones",
        title: "Egon sucht Bass",
        reqStory: "found_headphones", 
        text: "Hausmeister Egon steckt den Kopf zur Tür rein. 'Moin. Sag mal, liegen hier meine Kopfhörer? Ich muss gleich im Großraumbüro bohren und brauche meine Ruhe.'",
        opts: [
            { 
                t: "Ehrlich sein: 'Hab sie auf, brauche Fokus.'", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Egon grinst schief. 'Kenn ich. Die User nerven heute wieder, was? Behalt sie bis Feierabend.' Ein stilles Einverständnis unter Leidensgenossen." 
            },
            { 
                t: "Lüge: 'Nö, nix gesehen.'", 
                m: 2, f: 5, a: 0, c: 5, 
                r: "Du lügst glatt. Egon seufzt: 'Mist. Dann muss ich wohl das Radio auf volle Lautstärke drehen.' Er geht. Du hast deine Ruhe, aber er wirkt enttäuscht." 
            },
            { 
                t: "Dreist: 'Die sind jetzt beschlagnahmt.'", 
                m: 0, f: 10, a: 25, c: 0,
                r: "'Wie bitte?!' Egon wird rot im Gesicht. 'Das sind meine privaten! Du Arsch!' Er knallt die Tür zu. Du hast die Kopfhörer, aber Egon hasst dich jetzt abgrundtief." 
            }
        ]
    },
    {
        id: "srv_egon_hammer",
        title: "Werkzeug-Schwund",
        reqStory: "found_hammer", 
        text: "Egon klopft hektisch an den Türrahmen. 'Chef, kleiner Notfall. Die Spülung im 2. Stock klemmt. Hast du zufällig meinen Hammer gesehen? Das Wasser steigt!'",
        opts: [
            { 
                t: "Ehrlich: 'Jap, nimm schnell!'", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Egon schnappt sich den Hammer. 'Danke! Du hast mir den Arsch gerettet.' Er rennt los. Er bringt ihn später zurück, etwas nass, aber sauber." 
            },
            { 
                t: "Faul: 'Keine Ahnung, such selber.'", 
                m: 0, f: 20, a: 10, c: 25,
                r: "Du bleibst sitzen. Egon sucht fluchend in den Regalen. Kostbare Minuten vergehen. Plötzlich tropft es von der Decke. Der Chef kommt rein: 'Warum ist hier Wasser?!' Der Radar schlägt voll aus." 
            },
            { 
                t: "Ablenken: 'Erstmal einen Kaffee?'", 
                m: 10, f: 10, a: -5, c: 15,
                r: "Du quatschst ihn voll. Er vergisst kurz die Panik. Als er endlich zum Klo kommt, steht der Flur schon unter Wasser. Er ist dankbar für den Kaffee, aber der Chef tobt wegen des Teppichs." 
            }
        ]
    },
        {
            id: "srv_loose_rack",
            title: "Das lose Rack",
            text: "Ein ganzes Server-Rack wackelt bedenklich. Eine Schraube fehlt.",
            opts: [
                { t: "Festschrauben", req: "screw", m: 10, f: -5, a: 0, c: -5, r: "Hält wieder. Katastrophe abgewendet." },
                { t: "Mit Kabelbindern sichern", req: "zip_ties", m: 5, f: 5, a: 0, c: 0, r: "Du hast das Rack ans Nachbar-Rack gebunden. Pfusch am Bau, aber hält." },
                { t: "Wegsehen", m: 0, f: 15, a: 0, c: 15, r: "Hoffentlich fällt es nicht um, wenn du weg bist." }
            ]
        },
        {
            id: "srv_cable_mess",
            title: "Der Kabel-Alptraum",
            text: "Hinter Rack 3 hängt ein Bündel Glasfaserkabel gefährlich nah am Lüfter. Wenn das reinkommt, gibt es Schnipsel.",
            opts: [
                { t: "Zur Seite binden", req: "zip_ties", m: 10, f: -5, a: 0, c: 0, r: "Sauber weggebunden. Gefahr gebannt." },
                { t: "Festkleben", req: "tape", m: 5, f: 0, a: 0, c: 0, r: "Das Tape wird durch die Hitze irgendwann abgehen. Problem von Zukunfts-Ich." },
                { t: "Lüftergitter abbrechen", m: 5, f: 5, a: 10, c: 20, r: "Du hast das Gitter entfernt. Jetzt ist mehr Platz, aber auch mehr Gefahr für Finger." }
            ]
        },
        {
            id: "srv_door_stuck",
            title: "Die klemmende Tür",
            text: "Die Tür zum Serverraum klemmt. Der Kartenleser leuchtet grün, aber der Mechanismus hängt.",
            opts: [
                { t: "Hammer-Schlag", req: "hammer", m: 5, f: 0, a: -10, c: 10, r: "Ein gezielter Schlag auf den Riegel. Tür springt auf. Mechanik verbogen, aber offen." },
                { t: "Schloss zerlegen", req: "screw", m: 30, f: -10, a: 5, c: 0, r: "Du hast das Schloss zerlegt und gefettet. Funktioniert wie neu." },
                { t: "Dagegen werfen", m: 10, f: 0, a: 20, c: 5, r: "Deine Schulter tut weh. Tür ist immer noch zu." }
            ]
        },
        {
            id: "srv_leak",
            title: "Das leckende Rohr",
            text: "Tropf... Tropf... Ein Kondenswasser-Rohr der Klimaanlage ist undicht. Es tropft in Zeitlupe direkt in die Lüftungsschlitze des 50.000€ teuren Core-Switch. Jeder Tropfen ein potenzieller Totalschaden.",
            opts: [
                { 
                    t: "Fachmännisch mit Panzertape umwickeln", 
                    req: "tape", 
                    m: 5, f: 0, a: -5, c: -10, 
                    r: "Du wickelst eine halbe Rolle Tape drum. Dicht! Zumindest für heute. Und wir wissen ja: Nichts hält länger als ein Provisorium." 
                },
                { 
                    t: "Den Mülleimer drunterstellen", 
                    m: 10, f: 5, a: 0, c: 0, 
                    r: "Pling... Pling... Du hast den Eimer aus der Küche geholt. Du musst ihn alle 2 Stunden leeren, aber die Hardware bleibt trocken. Deine Nerven leiden unter dem Geräusch." 
                },
                { 
                    t: "Das Rohr mit dem Hammer 'zurechtbiegen'", 
                    req: "hammer", 
                    m: 5, f: 0, a: 10, c: 20, 
                    r: "Du setzt den Hammer als Hebel an und drückst. KNACK! Das Rohr bricht komplett ab. Wasser Marsch! Der Switch lernt schwimmen. Das war wohl zu viel Gewalt." 
                }
            ]
        },
        {
            id: "srv_pw_list",
            title: "Versteckte Notiz",
            text: "Hinter Rack 5 klebt ein vergilbter Zettel mit Tesafilm. Darauf steht in krakeliger Schrift: 'TOP SECRET - NUR FÜR ADMINS'. Der Zettel sieht aus, als hinge er dort schon seit Windows 95.",
            opts: [
                { 
                    t: "Den Zettel neugierig entziffern", 
                    m: 5, f: 5, a: -5, c: 0, 
                    r: "Es sind keine Passwörter. Es ist das Vermächtnis deines Vorgängers: 'Ich habe das Internet in einer schwarzen Kiste im Keller versteckt. Wenn Google down ist, müsst ihr die Kiste schütteln. P.S.: Trau niemals dem Drucker.' Weise Worte." 
                },
                { 
                    t: "Ehrfürchtig hängen lassen", 
                    m: 0, f: 0, a: 0, c: 0, 
                    r: "Du drückst den Tesafilm wieder fest. Das ist IT-Archäologie und Kulturgut. Wer das entfernt, löscht wahrscheinlich auch versehentlich das Backup." 
                }
            ]
        },
		{
            id: "srv_label_fail",
            title: "Der Elektriker-Fail",
            text: "Du starrst auf das Bedienfeld der Klimaanlage. Ein handgeschriebener Zettel klebt über den Reglern: 'ACHTUNG: Der Elektriker war farbenblind! BLAU heizt (Warm) und ROT kühlt (Kalt)! Nicht anfassen, wird erst 2030 repariert.'",
            opts: [
                { 
                    t: "Anlage genauer untersuchen", 
                    m: 5, f: 0, a: 5, c: 0, 
                    r: "Tatsächlich. Die Kabel sind vertauscht. Rot geht zum Kompressor (Kalt), Blau zur Heizspirale (Warm). Völlig absurd. Gut, dass du nachgesehen hast." 
                },
                { 
                    t: "Zettel ignorieren", 
                    m: 2, f: 0, a: 0, c: 0, 
                    r: "Du gehst weiter. Farben sind schließlich genormt, oder? Was soll schon passieren." 
                }
            ]
        },
		{
            id: "srv_port_warning",
            title: "Das Warnschild am Switch",
            text: "Am Haupt-Switch klebt ein riesiges Schild über Port 42: 'NICHT BENUTZEN! Kurzschluss-Gefahr! Wer hier was einsteckt, grillt den ganzen Switch!'",
            opts: [
                { 
                    t: "Schild gerade rücken", 
                    m: 2, f: 0, a: 0, c: 0, 
                    r: "Port 42 ist böse. Verstanden. Gut, dass das Schild da hängt." 
                },
                { 
                    t: "Ignorieren", 
                    m: 0, f: 5, a: 0, c: 0, 
                    r: "Du hast es eilig. Hoffentlich behältst du das trotzdem im Hinterkopf." 
                }
            ]
        },
		{
            id: "srv_crying_elster",
            title: "Tränen im Serverraum",
            text: "Du hörst ein leises Wimmern hinter Rack 4. Es ist Frau Elster aus der Buchhaltung. Sie sitzt auf dem Boden, das Gesicht in den Händen vergraben. 'Ich kann das alles nicht mehr...', flüstert sie.",
            opts: [
                { 
                    t: "Leise wieder rausgehen", 
                    m: 0, f: 0, a: 0, c: 0, 
                    r: "Du lässt sie in Ruhe. Manchmal braucht man Privatsphäre." 
                },
                { 
                    t: "Fragen: 'Alles okay mit der Bilanz?'", 
                    m: 10, f: 0, a: 10, c: 5, 
                    r: "Sie schaut dich entsetzt an. 'Ist Ihnen Arbeit wichtiger als Menschen?!' Sie rennt weinend raus." 
                },
                { 
                    t: "Fragen: 'Wie geht es Rüdiger?'",
                    m: 15, f: 10, a: -20, c: -5, 
                    r: "Sie blickt überrascht auf. Ein kleines Lächeln erscheint. 'Rüdiger... ja, der wartet zuhause. Er braucht sein Futter.' Sie wischt sich die Tränen weg. 'Danke, Herr Müller. Ich gehe jetzt heim zu ihm.' Du hast ihren Tag gerettet." 
                }
            ]
        },
        {
            id: "srv_update_fail",
            title: "Der kritische Patch",
            text: "Auf dem Dashboard blinkt es rot: 'Kritische Sicherheitslücke in der Zeiterfassung! Patch verfügbar.' Es ist gerade Mittagspause, alle kauen Döner. Niemand ist eingeloggt. Der perfekte Moment?",
            opts: [
                { 
                    t: "Sofort das Update installieren", 
                    m: 20, f: -10, a: 30, c: 10, 
                    r: "Update erfolgreich! Aber: Der 'Stempeln'-Button ist jetzt grün statt blau. Um 13 Uhr bricht totale Panik aus. 'ALLES SIEHT ANDERS AUS! ICH KANN SO NICHT ARBEITEN!' Das Telefon glüht. Du hast das Layout verändert, du Monster." 
                },
                { 
                    t: "Wegklicken: 'Never change a running system'", 
                    m: 0, f: 5, a: 0, c: 0, 
                    r: "Du klickst die Warnung weg. Wenn russische Hacker kommen, ist das ein Problem für das Zukunfts-Ich. Jetzt ist erstmal Pause." 
                }
            ]
        },
		{
            id: "srv_consultant_fail_1",
            title: "Der teure Berater",
            text: "Ein externer 'Senior Strategy Consultant' (Tagessatz: 2000€) hat gerade den Stecker des Haupt-Servers gezogen, um sein iPhone zu laden. Alles ist aus. Der Chef stürmt rein: 'WIESO STEHT DER BETRIEB?!'",
            opts: [
                { 
                    t: "Auf den Berater zeigen", 
                    m: 10, f: -5, a: 30, c: 10, 
                    r: "Der Berater lacht glatt: 'Ah, Herr Müller wollte mir gerade die USV demonstrieren und hat wohl das falsche Kabel erwischt. Schlechtes Briefing!' Der Chef nickt dem Berater zu: 'Verstehe. Müller, passen Sie besser auf!' Der Berater zwinkert dir zu. Du kochst vor Wut." 
                },
                { 
                    t: "Stecker wieder reinrammen", 
                    m: 5, f: 0, a: 10, c: 20, 
                    r: "Funkenflug. Der Server fährt hoch, aber ein Netzteil ist durchgebrannt. Der Berater tippt auf seinem Handy: 'Hardware veraltet. Empfehle Neukauf.' Der Chef stimmt ihm zu. Du bist der Depp, der die 'schlechte Hardware' wartet." 
                },
                { 
                    t: "Berater anschreien", 
					next: "consultant_war",
                    m: 2, f: 0, a: -20, c: 50, 
                    r: "Du brüllst den Gast an. Der Chef wird blass. 'Müller! Benehmen Sie sich vor unseren Gästen! Abmahnung wegen unprofessionellem Verhalten!' Der Berater grinst." 
                }
            ]
        },
		{
        id: "srv_consultant_fail_2",
        title: "Die offizielle Beschwerde",
        reqStory: "consultant_war",
        text: "Der Berater steht wieder in der Tür. Er wedelt mit einem laminierten Dokument. 'Bezüglich unseres... Disputs. Ich habe hier eine formelle Beschwerde wegen 'Toxischer Arbeitsatmosphäre & Aggression'. Wenn Sie das unterschreiben und sich entschuldigen, empfehle ich dem Vorstand kein Outsourcing der IT.'",
        opts: [
            { 
                t: "Klein beigeben & unterschreiben", 
                m: 10, f: 5, a: -10, c: -20, 
                r: "Du unterschreibst zähneknirschend. Der Berater lächelt süffisant. 'Geht doch. Synergie durch Kooperation.' Dein Radar sinkt, aber dein Stolz ist tot." 
            },
            { 
                t: "Bürokratie-Konter: 'Formular 7b fehlt.'", 
                m: 5, f: 10, a: 10, c: 10, 
                r: "Du schaust das Papier an. 'Das ist das alte Formular von 2018. Ohne den Passierschein A38 und den DSGVO-Anhang C kann ich das nicht annehmen. Vorschrift ist Vorschrift.' Der Berater ist verwirrt. Er zieht ab, um den Drucker zu suchen." 
            },
            { 
                t: "Eskalation: 'Raus aus meinem Serverraum!'", 
                m: 2, f: 0, a: -20, c: 40, 
                r: "Du wirfst ihn raus. Er droht mit Anwälten. Der Chef ist sauer, aber die Kollegen feiern dich als Helden des Widerstands. Manchmal muss man ein Exempel statuieren." 
            }
        ]
        },
		{
            id: "srv_dust_disaster",
            title: "Der verstaubte Server",
            text: "Der alte Backup-Server 'Methusalem' ist unter einer 5cm dicken Staubschicht begraben. Die Lüfter japsen. Das ist Brandgefahr! Du greifst zum Druckluft-Spray.",
            opts: [
                { 
                    t: "Gründlich reinigen", 
                    m: 20, f: -10, a: 40, c: 10, 
                    r: "Du pustest den Staub weg. PFFFFT. Plötzlich geht der Server aus. Stille. Der Admin stürmt rein: 'NEIN! Der Staub war leitfähig! Er hat die korrodierten Kontakte überbrückt! Du hast das System getötet!' Er meldet dich wegen Sachbeschädigung." 
                },
                { 
                    t: "Staubmuster malen", 
                    m: 5, f: 10, a: -5, c: 0, 
                    r: "Du malst einen Smiley in den Staub. Sieht gleich viel freundlicher aus." 
                }
            ]
        },
        {
            id: "srv_cable_trip",
            title: "Die Stolperfalle 2.0",
            text: "Du findest ein zerfetztes Netzwerkkabel am Boden. Jemand ist drüber gestolpert und hat die Buchse halb aus der Wand gerissen. Der Uplink zum Vertrieb ist tot. Markus brüllt schon aus der Ferne: 'WIESO GEHT MEIN SALESFORCE NICHT?! ICH VERLIERE GELD!'",
            opts: [
                { 
                    t: "Sofort ein neues Kabel patchen", 
                    req: "cable", 
                    m: 10, f: -5, a: 0, c: -5, 
                    r: "Zack, neues Kabel rein, Buchse provisorisch in den Putz gedrückt. Die Link-Lampe leuchtet grün. Du hast den Umsatz (und Markus' Blutdruck) gerettet." 
                },
                { 
                    t: "Die Drähte mit Tape flicken",
                    req: "tape", 
                    m: 20, f: 0, a: 5, c: 5, 
                    r: "Du verzwirbelst die Kupferadern und wickelst dick Tape drum. Es hält... irgendwie. 50% Packet Loss, aber Markus hält kurz die Klappe." 
                },
                { 
                    t: "Notlösung: WLAN-Stick als Brücke", 
                    req: "usb_stick", 
                    m: 15, f: 5, a: 0, c: 0, 
                    r: "Du steckst den Stick in den Switch. Eine wackelige WLAN-Brücke steht. Besser als nichts, aber die Latenz ist grauenhaft." 
                },
                { 
                    t: "Schild 'Wartungsarbeiten' aufstellen & gehen", 
                    m: 5, f: 10, a: -5, c: 25, 
                    r: "Du stellst das Schild auf und verschwindest. Der Vertrieb ist 2 Stunden offline. Der Chef stürmt später wutentbrannt zu dir: 'WARTUNG?! WÄHREND DER KERNARBEITSZEIT?! SIND SIE IRRE?!'" 
                }
            ]
        },
        {
            id: "srv_overheat_warning",
            title: "Hitzeflimmern",
            text: "Server 'Berta' (zuständig für die Gehaltsabrechnung) glüht förmlich. Der Lüfter steht still und es riecht beißend nach heißem Silizium. Wenn Berta stirbt, sind die Lohndaten weg.",
            opts: [
                { 
                    t: "Brutale Lösung: Den CO2-Löscher reinhalten", 
                    req: "fire_ext", 
                    m: 5, f: -10, a: 10, c: -10, 
                    r: "PFFFFT! Ein eiskalter CO2-Stoß direkt in den Lufteinlass. Die Temperatur fällt schockartig auf 10 Grad. Berta schnurrt wieder. Die Hardware ist leicht vereist, aber sie läuft." 
                },
                { 
                    t: "Gehäuse aufschrauben & Luft zufächeln", 
                    req: "screw", 
                    m: 45, f: -15, a: 20, c: 0, 
                    r: "Du schraubst das Gehäuse auf. Du stehst 45 Minuten daneben und wedelst mit einem Klemmbrett frische Luft hinein. Dein Arm fällt fast ab und der Staub kratzt im Hals." 
                },
                { 
                    t: "Den teuren Ventilator aus dem Chef-Büro klauen", 
                    m: 20, f: -5, a: 5, c: 15, 
                    r: "Du holst den Dyson-Ventilator vom Chef, während der Mittag macht. Berta ist kühl, aber der Chef schwitzt jetzt oben und sucht wütend sein Spielzeug." 
                },
                { 
                    t: "Tür zu & das Beste hoffen", 
                    m: 5, f: 10, a: 0, c: 50, 
                    r: "Du gehst einfach. 10 Minuten später stirbt Berta den Hitzetod. Frau Elster steht kreischend im Flur: 'MEIN GELD?!'. Der Chef macht dich persönlich haftbar. Das gibt richtig Ärger." 
                }
            ]
        },
        {
            id: "srv_night_shift_remnant",
            title: "Überreste der Nachtschicht",
            text: "Du findest eine halbvolle, warme Dose Energy Drink und einen Zettel auf dem Server: 'RAID-Controller spinnt. Ich geh heim, mir egal.' Eine rote Lampe am Drive-Bay blinkt hektisch.",
            opts: [
                { 
                    t: "Den abgestandenen Rest trinken", 
                    loot: "energy", 
                    m: 5, f: -5, a: -5, c: 10, 
                    r: "Du exst die warme Plörre. Koffein-Kick! Aber während du den Kopf in den Nacken legst, fällt Platte 2 endgültig aus. Der Chef ruft an: 'Warum ist das Laufwerk X: weg?!'" 
                },
                { 
                    t: "Seufzen und den RAID-Rebuild starten", 
                    m: 60, f: -20, a: 10, c: -10, 
                    r: "Du tauschst die Platte im Hot-Swap und startest den Rebuild. Es dauert eine Stunde, in der du auf einen Ladebalken starrst. Du hast den Arsch des Kollegen gerettet, aber niemand wird es je erfahren." 
                },
                { 
                    t: "Den Kollegen aus dem Bett klingeln", 
                    m: 15, f: 0, a: -10, c: 5, 
                    r: "Du weckst ihn auf und brüllst ihn an. Er murmelt 'Nicht mein Problem' und legt auf. Das System blinkt weiter rot. Rache ist süß, repariert aber keine Festplatten." 
                }
            ]
        },
        {
            id: "srv_rat_king",
            title: "Der Rattenkönig",
            text: "Hinter dem Patchpanel raschelt es verdächtig. Du leuchtest mit dem Handy rein. Schock! Drei fette Ratten nagen synchron am Glasfaserkabel der Geschäftsleitung! Wenn das durch ist, kann der CEO seine Golf-Videos nicht mehr streamen.",
            opts: [
                { 
                    t: "Cowboy-Style: Kabelbinder als Lasso nutzen", 
                    req: "zip_ties", 
                    m: 30, f: -10, a: 10, c: -5, 
                    r: "In einem epischen Kampf fängst du die Biester und setzt sie vor die Tür. Du bist verschwitzt und blutest leicht, aber das Internet lebt. Yee-haw." 
                },
                { 
                    t: "Mit dem Hammer gegen die Wand dreschen", 
                    req: "hammer", 
                    m: 10, f: 0, a: 20, c: 10, 
                    r: "BAM! Du haust eine Delle in den Putz. Die Ratten fliehen panisch – und reißen dabei im Vorbeilaufen eine Ader aus dem Stecker. Das Internet wackelt jetzt bedenklich." 
                },
                { 
                    t: "Diplomatie: Den alten Donut opfern", 
                    req: "donut", 
                    m: 5, f: 0, a: -5, c: 0, 
                    r: "Du wirfst den steinharten Donut in die dunkle Ecke. Die Ratten stürzen sich gierig darauf und lassen das Glasfaser in Ruhe. Ein süßes Opfer für die Götter der Bandbreite." 
                },
                { 
                    t: "Panisch die Flucht ergreifen", 
                    m: 5, f: 5, a: 10, c: 40, 
                    r: "Du rennst weg und schließt ab. 10 Minuten später ist das Internet tot. Der CEO stürmt brüllend runter: 'WARUM SIND MEINE GOLF-VIDEOS WEG?! UND WARUM FIEPT ES HIER?!'" 
                }
            ]
        },
        {
            id: "srv_legacy_tape",
            title: "Das Backup-Band",
            text: "Das uralte Bandlaufwerk surrt, klickt und verstummt dann. Es spuckt das Tape nicht mehr aus. 'Error 08/15: Tape stuck'. Es ist das einzige Voll-Backup von gestern. Wenn du es kaputt machst, sind die Daten futsch.",
            opts: [
                { 
                    t: "Chirurgischer Eingriff mit dem Schraubendreher", 
                    req: "screw", 
                    m: 20, f: -5, a: 0, c: -5, 
                    r: "Mit chirurgischer Präzision und Schweiß auf der Stirn hebelst du die Blende auf. Das Tape gleitet unbeschädigt heraus. Daten gerettet. Du fühlst dich wie ein Gott." 
                },
                { 
                    t: "McGyver-Trick: Mit Kabelbinder-Schlaufe angeln", 
                    req: "zip_ties", 
                    m: 10, f: 0, a: 5, c: 5, 
                    r: "Du bastelst eine Schlaufe, fädelst sie ein und ziehst vorsichtig. Es kommt raus! Das Gehäuse hat zwar Kratzer, aber hey – es läuft." 
                },
                { 
                    t: "Rohe Gewalt anwenden: 'GIB ES HER!'", 
                    m: 5, f: 0, a: 20, c: 30, 
                    r: "Du reißt es mit beiden Händen raus. RRRRATSCH. Bandsalat. Das schwarze Magnetband verteilt sich im ganzen Raum. Du wirfst das Knäuel schnell tief in den Müll. Das ist eine Zeitbombe." 
                },
                { 
                    t: "Stecken lassen & beten", 
                    m: 0, f: 10, a: 0, c: 20, 
                    r: "Du ignorierst den Fehler einfach. Das Backup heute Nacht wird garantiert fehlschlagen. Aber das ist ein Problem für den 'Morgen-Müller'." 
                }
            ]
        },
        {
            id: "srv_egon_stash",
            title: "Egons Geheimversteck",
            text: "Du hebst ein loses Bodenblech an. Dahinter: Eine verstaubte Kiste von Hausmeister Egon. Inhalt: Eine angebrochene Flasche 'Billig-Korn', fragwürdige Magazine aus den 90ern und... eine handschriftliche Liste mit allen Türcodes der Firma.",
            opts: [
                { 
                    t: "Die Liste schnell abfotografieren", 
                    m: 5, f: 5, a: 0, c: 0, 
                    r: "Klick. Das Foto ist sicher auf deinem Handy. Unglaublich: Der Master-Code ist '9999'. Das wird dir noch so manche verschlossene Tür öffnen." 
                },
                { 
                    t: "Einen tiefen Schluck Korn nehmen", 
                    m: 15, f: 10, a: -20, c: 10, 
                    r: "Du nimmst einen Schluck. Es schmeckt wie Bremsenreiniger und brennt höllisch. Du bist leicht beschwipst. Die Arbeit ist jetzt erträglicher, aber deine Fahne ist ein Risiko." 
                },
                { 
                    t: "Fund melden & Egon verpfeifen", 
                    m: 15, f: 0, a: 10, c: 5, 
                    r: "Du legst die Beweise dem Chef vor. Egon bekommt riesigen Ärger. Er weiß genau, dass du es warst. Deine Bürotür wird ab morgen seltsamerweise immer klemmen." 
                }
            ]
        },
        {
            id: "srv_crypto_miner",
            title: "Der versteckte Miner",
            text: "Ein Server läuft auf 100% Last, die Lüfter heulen wie ein startender Jet. Du checkst den Taskmanager: 'KevinCoin_Miner.exe' verbraucht alle Ressourcen. Der Azubi schürft Krypto auf Firmenkosten! Die CPU hat bereits kritische 98 Grad.",
            opts: [
                { 
                    t: "Prozess killen & Kevin zur Rede stellen", 
                    m: 15, f: -5, a: 5, c: -5, 
                    r: "Kevin jammert: 'Aber der Kurs geht gerade zum Mond! Ich wollte uns allen Lambos kaufen!' Du bleibst hart. Der Server kühlt ab, der Lambo muss warten." 
                },
                { 
                    t: "Die Wallet-Adresse heimlich auf deine ändern", 
                    req: "admin_pw", 
                    m: 10, f: 20, a: -10, c: 25, 
                    r: "Mit einem hämischen Grinsen leitest du die Coins auf dein privates Wallet um. Böse? Ja. Profitabel? Oh ja. Kevin schürft jetzt für deine Frührente. Hoffentlich merkt das die Revision nicht." 
                },
                { 
                    t: "Einfach weiterlaufen lassen", 
                    m: 0, f: 10, a: 0, c: 40, 
                    r: "Du ignorierst es. 30 Minuten später schaltet die Kiste wegen Überhitzung per Not-Aus ab. Blöd nur, dass darauf auch SAP lief. Die Firma steht still. Alle schreien." 
                }
            ]
        },
        {
            id: "srv_intern_access",
            title: "Dringende Daten",
            text: "Der Praktikant ist krank. Der Chef steht vor dessen PC: 'Müller! Knacken Sie das Ding! Da ist die Präsentation drauf! Ich wette, der Idiot hat was Kompliziertes genommen!'",
            opts: [
                { 
                    t: "Eingabe: 'Puschel123'",
                    m: 5, f: 10, a: -10, c: -5, 
                    r: "Du tippst es blind ein. 'ZUGRIFF ERLAUBT'. Der Chef starrt dich an: 'Woher...? Egal. Gute Arbeit, Müller!'" 
                },
                { 
                    t: "Admin-Reset erzwingen",
                    req: "admin_pw",
                    m: 15, f: -5, a: 0, c: 0, 
                    r: "Dauert 15 Minuten, funktioniert aber sicher. Der Chef trommelt ungeduldig mit den Fingern." 
                },
                { 
                    t: "Eingabe: '123456'",
                    m: 5, f: 0, a: 10, c: 15, 
                    r: "Falsch. PC sperrt sich für 1 Stunde. Der Chef explodiert." 
                },
                { 
                    t: "Eingabe: 'Passwort'",
                    m: 5, f: 0, a: 10, c: 10, 
                    r: "Natürlich nicht. Der Chef schüttelt den Kopf: 'Halten Sie mich für blöd? Probieren Sie was Richtiges!'" 
                }
            ]
        },
		{
            id: "srv_cable_spaghetti",
            title: "Kabel-Spaghetti",
            text: "Der Switch im Rack sieht aus wie ein Teller Spaghetti. Ein einziger Knoten. Du musst Port 42 finden.",
            opts: [
                { 
                    t: "Geduldig entwirren", 
                    m: 45, f: -10, a: 10, c: -5, 
                    r: "Zen-Modus. Nach 45 Minuten hast du Ordnung. Es sieht wunderschön aus." 
                },
                { 
                    t: "Kabelbinder nehmen & Zurren", 
                    req: "zip_ties", 
                    m: 15, f: 0, a: -5, c: 0, 
                    r: "Du bindest alles zu einer Wurst zusammen. Nicht schön, aber Luft kommt durch." 
                },
                { 
                    t: "Einfach dran ziehen", 
                    m: 5, f: 5, a: 20, c: 10, 
                    r: "Du ziehst an einem Kabel. Drei andere gehen raus. Ups. Telefonanlage tot." 
                }
            ]
        },
        {
            id: "srv_disco_led",
            title: "Disco im Serverraum",
            text: "Alle LEDs an den Server-Racks blinken synchron im 4/4-Takt. Es sieht aus wie eine Lichtorgel in einer Dorfdisco. Das System läuft extrem unrund und summt seltsam.",
            opts: [
                { 
                    t: "Im Handbuch nachschlagen", 
                    req: "manual", 
                    m: 15, f: -5, a: -5, c: 0, 
                    r: "Du blätterst wild. Fehlercode '0xDEADBEEF'. Ein seltener Firmware-Glitch. Du führst den dokumentierten Soft-Reset durch. Alles wieder grün." 
                },
                { 
                    t: "Techno-Playlist an & tanzen", 
                    m: 15, f: 10, a: -20, c: 15, 
                    r: "Du nutzt das Blinken als Lightshow und tanzt völlig enthemmt. Leider steht plötzlich der Chef in der Tür, starrt dich an und fragt trocken: 'Haben Sie zu viel Energie, Müller?! Oder einen Schlaganfall?'" 
                },
                { 
                    t: "Brutal den Stecker ziehen", 
                    m: 5, f: 0, a: 0, c: 10, 
                    r: "Klack. Ruhe. Klack. Lärm. Es läuft wieder. Die Datenbank meckert zwar jetzt über 'korrupte Indizes', aber wenigstens ist die Disco vorbei." 
                }
            ]
        },
        {
            id: "srv_ac_failure",
            title: "Klima-Ausfall",
            text: "Die Klimaanlage ist ausgefallen. Es sind gefühlte 50 Grad im Serverraum. Die Lüfter der Racks laufen auf Maximum, es klingt wie auf einem Flugzeugträger. Die Server schwitzen.",
            opts: [
                { 
                    t: "Die Sicherheitstür mit einem Stuhl aufkeilen", 
                    m: 5, f: 0, a: 0, c: 10, 
                    r: "Frische Flur-Luft strömt herein. Die Temperatur sinkt. Aber: Eine dauerhaft offene Serverraum-Tür ist ein massives Sicherheitsrisiko. Wenn das der Datenschutzbeauftragte sieht..." 
                },
                { 
                    t: "MacGyver-Lösung: USB-Lüfter basteln", 
                    req: "usb_stick", 
                    m: 15, f: -5, a: -5, c: 0, 
                    r: "Du fummelst an den Anschlüssen herum und improvisierst eine aktive Kühlung. Es bringt fast nichts, sieht aber extrem technisch aus und du fühlst dich wie ein Ingenieur." 
                },
                { 
                    t: "Eimerweise Eiswürfel aus der Küche holen", 
                    m: 10, f: 5, a: 0, c: 20, 
                    r: "Du stellst Schüsseln mit Eis direkt in die Racks. Es kühlt tatsächlich, aber das Kondenswasser tropft gefährlich nah an die Netzteile. Ein Tanz auf der Rasierklinge." 
                }
            ]
        },
        {
            id: "srv_story_kevin_1",
            title: "Kevins Experiment",
            text: "Kevin steht vor einem offenen Rack. Es riecht nach Ozon. Er hält einen Schraubendreher wie einen Zauberstab in ein laufendes Netzteil. 'Ich wollte nur den Lüfter überbrücken, damit er leiser ist...'",
            opts: [
                { 
                    t: "Ihn anschreien & rauswerfen", 
                    m: 5, f: 0, a: 15, c: 0, 
                    r: "Kevin zuckt zusammen und rennt weg. 'Tschuldigung...' Er wird dich nie wieder um Rat fragen." 
                },
                { 
                    t: "Meldung an HR machen", 
                    m: 15, f: 0, a: 0, c: -10, 
                    r: "Du meldest den Vorfall. Kevin kriegt eine Abmahnung. Sicher ist sicher, aber er meidet dich jetzt." 
                },
                { 
                    t: "Seufzen: 'Zeig mal her... so geht das.'", 
                    next: "kevin_student", 
                    m: 25, f: 0, a: -5, c: 0, 
                    r: "Du nimmst dir Zeit und erklärst ihm den Schaltplan. Kevin staunt: 'Whoa. Das ergibt Sinn.' Er schaut dich an wie einen Jedi-Meister." 
                }
            ]
        },
        {
            id: "srv_story_kevin_3",
            reqStory: "kevin_pro",
            title: "DDoS Angriff: Die Feuertaufe",
            text: "ALARM! Ein massiver DDoS-Angriff legt die Firewall lahm. Du kommst mit dem Tippen nicht hinterher. Plötzlich zieht Kevin einen Laptop: 'Ich hab das Skript von neulich angepasst! Ich kann den Traffic umleiten! Lass mich ran!'",
            opts: [
                { 
                    t: "Nicken: 'Mach es. Ich vertraue dir.'", 
                    loot: "kevin_ram", 
                    m: 5, f: -30, a: -40, c: -30, 
                    r: "Kevin tippt wie ein Besessener. Enter. Stille. Der Angriff ist gestoppt. Er grinst breit: 'Hab ich von dir gelernt.' Er gibt dir seinen alten Glücks-RAM als Andenken." 
                },
                { 
                    t: "Wegschubsen: 'Zu gefährlich! Geh weg!'", 
                    m: 45, f: -10, a: 30, c: -5, 
                    r: "Du löst das Problem selbst, aber es dauert 30 Minuten länger. Kevin steht traurig daneben. 'Ich wollte doch nur helfen...'" 
                },
                { 
                    t: "Zögern: 'Bist du sicher?'", 
                    m: 20, f: 0, a: 20, c: 20, 
                    r: "In deinem Zögern stürzt der Mailserver ab. Kevin führt das Skript dann doch aus, aber der Schaden ist schon da. 'Hättest du mich mal früher gelassen...', murmelt er." 
                }
            ]
        },
    {
        id: "srv_legacy_1",
        title: "Der versiegelte Schacht",
        text: "Hinter einem brummenden Rack entdeckst du eine alte Lüftungsklappe. Darauf klebt ein vergilbter Zettel: 'Nur öffnen bei Weltuntergang oder Börsencrash. Gez. Baron von Gier (Gründer).'",
        opts: [
            { 
                t: "Daran rütteln",
                m: 5, f: 0, a: 10, c: 0,
                r: "Verschlossen. Du brauchst wohl einen Hebel oder Code. Aber du hast Staub eingeatmet. *Hust*"
            },
            { 
                t: "Mit Schraubendreher öffnen",
                req: "screw", next: "legacy_open",
                m: 20, f: -10, a: 0, c: 15,
                r: "Knirschend gibt die Klappe nach. Das war laut! Hoffentlich hat das keiner gehört. Dahinter ist ein kleiner, dunkler Hohlraum."
            }
        ]
    },
    {
        id: "srv_legacy_2",
        title: "Der alte Safe",
        reqStory: "legacy_open",
        text: "Du kriechst wieder in den Schacht. Der Safe hat ein Zahlenrad. Daneben ist eine Gravur: 'Das Gründungsjahr der Firma ist der Schlüssel.' (Du weißt es nicht, aber Kevin hat neulich '1899' an die Klotür gekritzelt).",
        opts: [
            { 
                t: "Code '1234' probieren",
                m: 10, f: 0, a: 15, c: 0,
                r: "Nichts passiert. Du trittst wütend gegen den Safe. Dein Zeh schmerzt."
            },
            { 
                t: "Code '1899' eingeben",
                next: "legacy_solved",
                m: 15, f: -5, a: -10, c: 0,
                r: "*Klick*. Der Mechanismus springt auf! Ein Gefühl von Triumph durchströmt dich. Es riecht nach altem Papier und Gier."
            }
        ]
    },
    {
        id: "srv_legacy_3",
        title: "Das Rote Buch",
        reqStory: "legacy_solved",
        text: "Der offene Safe liegt vor dir. Das Buch 'GlobalCorp: Eine Geschichte des Erfolgs (und der Vertuschung)' liegt griffbereit.",
        opts: [
            { 
                t: "Das Buch einstecken",
                loot: "corp_chronicles",
                m: 5, f: -5, a: -20, c: 10,
                r: "Du steckst die Chronik ein. Sie fühlt sich schwer und wichtig an. Du fühlst dich wie Indiana Jones der IT. (Neues Item!)"
            },
            { 
                t: "Liegen lassen",
                m: 2, f: 0, a: 5, c: -5,
                r: "Zu viel Wissen ist gefährlich. Du schließt den Safe wieder. Sicher ist sicher. (Langweilig)"
            }
        ]
    },
    {
        id: "srv_ghost_1",
        title: "Das unbekannte Blinken",
        text: "Ganz hinten im dunklen Eck blinkt eine grüne LED an einem Gerät, das in keinem Inventarplan steht. Es ist staubbedeckt und summt leise.",
        opts: [
            { 
                t: "Staub abwischen & untersuchen",
                next: "ghost_found",
                m: 15, f: -10, a: 5, c: 0,
                r: "Du wischst den Staub weg. Aufkleber: 'Projekt PHOENIX - 1998 - Do Not Touch'. Es läuft seit 25 Jahren. Respekt."
            },
            { 
                t: "Ignorieren",
                m: 2, f: 10, a: 0, c: 5,
                r: "Nicht mein Ticket, nicht mein Problem. Du gehst weg."
            }
        ]
    },
    {
        id: "srv_ghost_2",
        title: "PHOENIX lebt",
        reqStory: "ghost_found",
        text: "Du stehst wieder vor dem mysteriösen 1998er Server. Heute macht er ein seltsames Geräusch. *Klick-Klack*. Als würde eine Festplatte sterben.",
        opts: [
            { 
                t: "Monitor anschließen & fixen",
                m: 45, f: -25, a: 10, c: -10,
                r: "Du verbringst 45 Minuten damit, Sektoren zu reparieren. Es... es hostet die private Fan-Fiction-Seite des Gründers?! Egal, es läuft wieder."
            },
            { 
                t: "Percussive Maintenance (Draufhauen)",
                m: 5, f: 5, a: -15, c: 20,
                r: "BÄM. Das Klicken hört auf. Das Summen wird ruhiger. Nichts entspannt so sehr wie Gewalt gegen Hardware."
            }
        ]
    },
    {
        id: "srv_alarm_stuck_1",
        title: "OHRENBLUTEN!",
        text: "Ein Fehlalarm im Serverraum! Die Sirene dröhnt mit 120 Dezibel. Du kannst nicht denken. Das Tastenfeld an der Wand blinkt: 'CODE EINGEBEN ZUM DEAKTIVIEREN'.",
        opts: [
            { 
                t: "Code: 0000",
                m: 5, f: 0, a: 20, c: 0, 
                r: "FALSCH. Die Sirene wird noch lauter. Deine Ohren klingeln für Stunden." 
            },
            { 
                t: "Code: 4711",
                m: 5, f: 5, a: -20, c: -10, 
                r: "Stille. Himmlische Stille. Du hast den Tag gerettet, weil du dich an den Anschiss vom Hausmeister erinnert hast." 
            },
            { 
                t: "Mit dem Hammer draufhauen",
                req: "hammer",
                next: "alarm_smashed",
                m: 5, f: 0, a: 10, c: 40, 
                r: "Die Sirene ist kaputt, aber die Wand auch. Das wird teuer." 
            },
            { 
                t: "Rausrennen",
                m: 30, f: 0, a: 10, c: 10, 
                r: "Du wartest draußen 30 Minuten auf die Feuerwehr. Es war nur Staub im Sensor." 
            }
        ]
    },
    {
        id: "srv_alarm_stuck_2",
        title: "Egon und das Loch",
        reqStory: "alarm_smashed",
        text: "Hausmeister Egon steht vor den Trümmern der Alarmanlage. Er fährt mit dem Finger über die tiefe Delle in der Wand. 'Das war kein technischer Defekt. Das war stumpfe Gewalt.' Er dreht sich langsam zu dir um. 'Hast du was gesehen?'",
        opts: [
            { 
                t: "Lügen: 'Da war eine riesige Ratte!'", 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Egon zieht eine Augenbraue hoch. 'Eine Ratte mit Hammer?' Er glaubt dir kein Wort. Er schreibt einen Bericht über 'Vandalismus'. Dein Radar ist jetzt im kritischen Bereich." 
            },
            { 
                t: "Beichten: 'Es war ein Notfall...'", 
                m: 10, f: -5, a: -10, c: -10, 
                r: "Du erklärst das Ohrenbluten. Egon nickt brummend. 'Besser die Wand als das Trommelfell. Aber den Putz zahlst du.' Er deckt dich beim Chef, aber du schuldest ihm was." 
            },
            { 
                t: "Bestechung: Ihm dein Panzertape anbieten", 
                req: "tape",
                m: 5, f: 5, a: 0, c: -10, 
                r: "Egons Augen leuchten auf. 'Original Gaffa? Das Gute?' Er nimmt die Rolle, klebt ein Stück über das Loch in der Wand und grinst. 'Welches Loch? Ich sehe kein Loch.'" 
            }
        ]
    },
    ],

// === KAFFEE ===
    coffee: [
        {
            id: "cof_note",
            title: "Fundstück am Automaten",
            text: "Jemand hat hier einen gelben Notizzettel liegen lassen. Darauf steht 'WLAN-PW: 1234abcd'. Das ist Schmidts Handschrift.",
            opts: [
                { t: "Zettel einstecken", loot: "wifi_note", m: 5, f: 5, a: 0, c: 0, r: "Das könnte noch nützlich werden. Wissen ist Macht." },
                { t: "Wegwerfen", m: 5, f: 0, a: 0, c: 0, r: "Sicherheitsrisiko beseitigt." }
            ]
        },
        {
            id: "cof_donut",
            title: "Reste vom Meeting",
            text: "Die Tür zum Konferenzraum steht offen. Auf dem großen Tisch, zwischen leeren Wasserflaschen und Flipchart-Papier, steht noch eine Schachtel vom Management-Meeting. Inhalt: Ein einsamer, leicht angetrockneter Schoko-Donut mit bunten Streuseln.",
            opts: [
                { 
                    t: "Den Donut 'sicherstellen'", 
                    loot: "donut", 
                    m: 5, f: 5, a: -5, c: 0, 
                    r: "Du wickelst ihn schnell in eine Serviette. Er ist zwar etwas hart, aber Zucker ist Zucker. Außerdem eignet er sich hervorragend als Bestechungsmittel für hungrige Azubis." 
                },
                { 
                    t: "Stolz zeigen & liegen lassen", 
                    m: 0, f: 0, a: 0, c: 0, 
                    r: "Du gehst weiter. Du bist zwar chronisch unterzuckert, aber du isst keine Reste vom Management. Ein bisschen Würde muss man sich als Admin bewahren." 
                }
            ]
        },
        {
            id: "cof_flirt",
            title: "Der Schwarm",
            text: "Sarah aus der HR steht da. Sie lächelt dich an. 'Na, IT-Held? Alles im Griff oder brennt der Server?'",
            opts: [
                { t: "Flirten: 'Für dich lösche ich jedes Feuer'", m: 20, f: 10, a: -30, c: 5, r: "Es läuft gut! Ihr verabredet euch zum Mittagessen. Deine Laune ist top." },
                { t: "Panisch weglaufen", m: 5, f: 0, a: 10, c: 0, r: "Peinlich berührt geflüchtet. Kaffee vergessen. Du hasst dich selbst." }
            ]
        },
        {
            id: "cof_boss",
            title: "Der Chef lauert",
            text: "Der Chef steht breitbeinig vor der Kaffeemaschine und blockiert den Zugang. Er dreht sich in Zeitlupe zu dir um, eine Augenbraue hochgezogen. 'Ah, Müller? Schon wieder hier? Ist das heute der fünfte Kaffee oder haben Sie Ihren Schreibtisch untervermietet?'",
            opts: [
                { 
                    t: "Dreiste Notlüge: 'Ist für den externen Berater!'", 
                    m: 5, f: 10, a: 5, c: 5, 
                    r: "Der Chef nickt anerkennend: 'Ah, Service-Orientierung! Sehr gut, weitermachen.' Er tritt zur Seite. Du hast gelogen, aber du hast deinen Kaffee." 
                },
                { 
                    t: "Rechtfertigen: 'Ich brauche Treibstoff...'", 
                    m: 15, f: -5, a: 10, c: 10, 
                    r: "Fehler. Riesenfehler. Er nutzt die Gelegenheit für einen 15-minütigen Spontan-Vortrag über 'Time-Management' und 'intrinsische Motivation'. Dein Kaffee wird dabei kalt." 
                },
                { 
                    t: "Panisch 'Nein!' schreien & wegrennen", 
                    m: 2, f: 0, a: -5, c: 0, 
                    r: "Du drehst dich auf dem Absatz um und fliehst zurück in dein Büro. Der Chef schaut dir verwirrt nach. Kein Kaffee, aber immerhin keine Standpauke." 
                }
            ]
        },
        {
        id: "cof_ball",
        title: "Billiges Werbegeschenk",
        text: "Ein schleimiger Software-Vertreter hat einen Karton mit 'Merch' in der Küche vergessen. Es sind rote Schaumstoff-Bälle mit dem Aufdruck 'Cloud is Future'.",
        opts: [
            { 
                t: "Einen Stressball einstecken", 
                loot: "stressball", 
                next: "got_stressball", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Er riecht streng nach Weichmachern, aber er liegt gut in der Hand. Perfekt zum Kneten (oder Werfen), wenn User mal wieder nerven." 
            }
        ]
    },
    {
        id: "cof_ball_meet",
        title: "Synergie-Gespräche",
        reqStory: "got_stressball", 
        text: "Du drückst 'Espresso'. Neben dir stehen der Chef und der Vertreter von vorhin. Der Vertreter zeigt begeistert auf den roten Ball in deiner Hand: 'Ah! Ich sehe, unsere 'Cloud' ist schon im Einsatz! Wie gefällt sie Ihnen?'",
        opts: [
            { 
                t: "'Das beste Gadget seit Jahren!' (Übertrieben loben)", 
                m: 15, f: 5, a: 15, c: -10,
                r: "Ein fataler Fehler. Der Vertreter ist so begeistert, dass er dich in die Ecke drängt und dir 15 Minuten lang die Roadmap für Q4 erklärt. Der Chef nickt stolz, aber deine Ohren bluten und der Kaffee wird kalt." 
            },
            { 
                t: "'Ist halt Schaumstoff.' (Trocken)", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Das Lächeln des Vertreters gefriert. 'Äh, ja. High-Tech-Polymer.' Er wendet sich irritiert ab. Das Gespräch stirbt, und du kannst in Ruhe mit deinem Kaffee entkommen." 
            },
            { 
                t: "Tief inhalieren und Augenkontakt halten", 
                m: 5, f: 0, a: 0, c: 25,
                r: "Du hältst den Ball direkt unter deine Nase, atmest tief ein und flüsterst: 'Er riecht nach Weichmachern.' Totenstille. Der Vertreter weicht zurück. Der Chef läuft purpurrot an. 'MÜLLER! BÜRO!'" 
            }
        ]
    },
        {
            id: "cof_empty",
            title: "Leere Maschine",
            text: "Das Display blinkt hämisch rot: 'ERROR: BEANS EMPTY'. Der Behälter ist staubtrocken. Jemand hat den letzten Tropfen rausgepresst und sich klammheimlich verdrückt, ohne nachzufüllen. Es war garantiert Kevin.",
            opts: [
                { 
                    t: "Seufzen und die Bohnen auffüllen", 
                    m: 15, f: -5, a: 10, c: 0, 
                    r: "Du schleppst den schweren Sack aus dem Lager. Natürlich bist du hier der Depp für alles. Aber immerhin brühst du dir jetzt den frischesten Kaffee des Tages." 
                },
                { 
                    t: "Wütend gegen das Gehäuse treten", 
                    m: 5, f: 0, a: 5, c: 10, 
                    r: "KLONK! Das hat ordentlich gescheppert. Die Maschine bleibt leer, aber dein Fuß tut weh. Der Chef steckt den Kopf aus der Tür: 'Alles im Griff bei Ihnen, Müller?'" 
                },
                { 
                    t: "Zettel schreiben: 'WER LEER MACHT, FÜLLT AUF!'", 
                    m: 5, f: 5, a: -5, c: 0, 
                    r: "Du klebst einen passiv-aggressiven Post-it mit drei Ausrufezeichen an die Maschine. Du fühlst dich moralisch überlegen, hast aber immer noch keinen Kaffee." 
                }
            ]
        },
        {
            id: "cof_newbie",
            title: "Der Neue",
            text: "Ein junger Typ im Anzug steht verloren vor der Maschine. 'Äh, hallo? Ich bin neu im Controlling. Braucht man hier eine Karte oder ist das kostenlos? Und wo ist die Soja-Milch?'",
            opts: [
                { t: "Nett sein & erklären", m: 15, f: -5, a: 0, c: -5, r: "Er ist dankbar. 'Cool, danke! Ich heiße Torben.' Du hast einen Verbündeten im Controlling (gut für Budget-Fragen)." },
                { t: "Anlügen: 'Das kostet 5€ pro Tasse, zahlbar bei mir.'", m: 10, f: 10, a: -10, c: 10, r: "Er gibt dir 5 Euro. Du hast Geld für Snacks, aber er wird es irgendwann merken." },
                { t: "Starren und knurren", m: 5, f: 0, a: 5, c: 0, r: "Er bekommt Angst und rennt weg. Mehr Kaffee für dich." }
            ]
        },
        {
            id: "cof_worker",
            title: "Der Handwerker",
            text: "Ein externer Techniker repariert gerade den Wasserspender. Sein Werkzeugkasten steht offen da. Ein Hammer blitzt dich an.",
            opts: [
                { t: "Hammer klauen", loot: "hammer", m: 5, f: 5, a: 0, c: 5, r: "Zack, eingesteckt. Ein Hammer ist das ultimative Debugging-Tool für Drucker." },
                { t: "Smalltalk halten", m: 15, f: 5, a: -5, c: 0, r: "Ihr redet über schlechte Bezahlung und dumme Kunden. Solidarität." }
            ]
        },
        {
            id: "cof_revolte",
            title: "Die Kaffeemaschinen-Revolte",
            text: "Die neue 'Smart-Barista 3000' mit KI-Chip blinkt böse. Auf dem Display steht: 'FEED ME'. Sie weigert sich strikt, die billigen Discounter-Bohnen zu mahlen und zeigt: 'ERROR: TASTE NOT FOUND'. Der Aufstand der Maschinen beginnt im Pausenraum.",
            opts: [
                { 
                    t: "Perkussive Wartung mit dem Hammer",
                    req: "hammer", 
                    m: 10, f: 0, a: -20, c: 20, 
                    r: "BAM! Du schlägst gezielt auf das Gehäuse ein. Das Display hat jetzt einen Riss, aber aus purer Angst spuckt die Maschine sofort schwarzen Kaffee aus. Gewalt ist manchmal doch eine Lösung." 
                },
                { 
                    t: "Nachgeben & teure Bio-Bohnen kaufen", 
                    m: 20, f: -5, a: 10, c: -5, 
                    r: "Du rennst zum Hipster-Röster nebenan und investierst 15€ aus eigener Tasche. Der Kaffee schmeckt nach Einhorn-Tränen und Liebe, aber du bist für den Rest des Monats pleite." 
                },
                { 
                    t: "Der Klassiker: Stecker raus, Stecker rein", 
                    m: 5, f: 5, a: 5, c: 0, 
                    r: "Die Maschine fährt runter... bootet neu... und zeigt sofort wieder 'FEED ME'. Dazu ertönt ein hämisches 8-Bit-Lachen aus dem Lautsprecher. Sie ist klüger als du." 
                }
            ]
        },
        {
            id: "cof_meeting",
            title: "Das Marketing-Meeting",
            text: "Chantal und ihre Crew blockieren die Küche. Sie brainstormen über 'Feel-Good-Management'. Es gibt Smoothies. Du brauchst aber Koffein.",
            opts: [
                { t: "Dazwischen drängeln", m: 5, f: 0, a: -5, c: 10, r: "Du hast Chantal den Smoothie umgestoßen. 'Hoppla'. Du hast Kaffee, aber Feinde." },
                { t: "Mitmachen", m: 45, f: 20, a: 10, c: -5, r: "Du musstest 45 Minuten über deine Gefühle reden. Du hast jetzt einen grünen Smoothie und Aggressionen." },
                { t: "Warten und böse gucken", m: 15, f: 5, a: 5, c: 0, r: "Sie ignorieren dich komplett." }
            ]
        },
        {
            id: "cof_milk",
            title: "High Noon in der Küche",
            text: "Kollege Bernd (der Typ, der Fisch in der Mikrowelle warm macht) greift nach der allerletzten Packung H-Milch. Deine Hand landet im selben Moment darauf. Eure Blicke treffen sich. Die Luft knistert. Im Hintergrund spielt leise Western-Musik.",
            opts: [
                { 
                    t: "Ein Duell fordern: Schere-Stein-Papier", 
                    m: 5, f: 5, a: 0, c: 0, 
                    r: "Stein schlägt Schere. Ein sauberer Sieg! Du nimmst die Trophäe an dich. Bernd zieht geschlagen ab und murmelt etwas von 'Best of Three', aber du hast die Milch schon offen." 
                },
                { 
                    t: "Großzügig sein & den Vortritt lassen", 
                    m: 0, f: 0, a: 10, c: -5, 
                    r: "Du lässt los. Karma-Punkte! Aber dann der Schock: Bernd schüttet den gesamten Liter in seinen Früchtetee. Alles. Bis zum letzten Tropfen. Was für ein Monster." 
                },
                { 
                    t: "Taktik 'Verbrannte Erde': Packung zerdrücken", 
                    m: 2, f: 0, a: -10, c: 10, 
                    r: "Du drückst zu. Fest. PLATSCH! Der Karton platzt und ein weißer Tsunami ergießt sich über den Küchenboden. Du schreist: 'WENN ICH SIE NICHT KRIEGE, KRIEGT SIE KEINER!'" 
                }
            ]
        },
        {
        id: "cof_juergen",
        title: "Die Labertasche",
        text: "Jürgen aus dem Vertrieb blockiert die Kaffeemaschine. Er grinst dich breit an: 'Na, Kollege? Auch mal Pause? Du, ich MUSS dir unbedingt von meinem neuen Mähroboter erzählen. Der hat jetzt GPS-gestützten Kantenmodus!'",
        opts: [
            { 
                t: "Noise-Cancelling-Kopfhörer aufsetzen", 
                req: "headphones", 
                next: "juergen_nc",
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du setzt die Dinger auf, nickst freundlich und startest norwegischen Black Metal. Jürgen bewegt nur noch stumm den Mund. Himmlische Ruhe." 
            },
            { 
                t: "Höflich zuhören & innerlich sterben", 
                next: "juergen_pump",
                m: 20, f: 10, a: 15, c: 0, 
                r: "20 Minuten später kennst du den Unterschied zwischen Mulch-Keil und Seitenauswurf. Ein Teil deiner Seele hat den Körper verlassen. Jürgen droht: 'Morgen erzähl ich dir von meiner Wärmepumpe!'" 
            },
            { 
                t: "Schreien: 'OH GOTT, DER SERVER!' & rennen", 
                next: "juergen_coffee",
                m: 0, f: 0, a: 5, c: 0, 
                r: "Du täuschst einen fatalen Systemabsturz vor und sprintest aus der Küche. Du hast zwar keinen Kaffee, aber du bist Jürgens Monolog entkommen. Freiheit schmeckt auch gut." 
            }
        ]
    },
    {
        id: "cof_juergen_nc",
        title: "Stummes Gespräch",
        reqStory: "juergen_nc", 
        text: "Jürgen steht plötzlich an deinem Schreibtisch. Du hast die Kopfhörer noch auf. Er gestikuliert wild und fragt dich offensichtlich etwas. Du hörst absolut nichts außer Double-Bass-Drums.",
        opts: [
            { 
                t: "Einfach 'Daumen hoch' zeigen", 
                m: 5, f: -5, a: 10, c: 5,
                r: "Du grinst und machst 👍. Jürgen strahlt, klopft dir auf die Schulter und geht. 10 Min später kommt eine Mail: 'Danke, dass du am Samstag beim Umzug hilfst!'. Verdammt." 
            },
            { 
                t: "Kopfhörer lüften: 'HÄ?!'", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Du hebst eine Muschel an. Jürgen: '...ob du mal meinen Drucker... ach egal, du bist beschäftigt.' Er zieht ab." 
            },
            { 
                t: "Kopf schütteln (Nein sagen)", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du schüttelst traurig den Kopf. Jürgen wirkt betroffen: 'Oh, das wusste ich nicht. Mein Beileid.' Er geht leise weg. Du hast keine Ahnung, worum es ging, aber es hat funktioniert." 
            }
        ]
    },
    {
        id: "cof_juergen_pump",
        title: "Jahresarbeitszahl",
        reqStory: "juergen_pump", 
        text: "Du wolltest nur schnell Wasser holen. Jürgen lauert schon: 'Ah! Da bist du ja! Ich hatte dir ja die Datenblätter zur Vorlauftemperatur versprochen. Guck mal hier auf meinem Tablet...'",
        opts: [
            { 
                t: "Fachsimpeln (Fehler korrigieren)", 
                m: 30, f: -10, a: 15, c: 0,
                r: "Du wolltest nur kurz klugscheißen. Aber jetzt steckst du in einer 30-minütigen Debatte über Geothermie vs. Luft-Wasser. Du hast Recht, aber du hast auch deine Mittagspause verloren." 
            },
            { 
                t: "Tot stellen (Starre)", 
                m: 10, f: 10, a: 10, c: 0, 
                r: "Du starrst durch ihn hindurch. Jürgen redet 10 Minuten ohne Punkt und Komma, merkt dann, dass du nicht blinzelst, und geht irritiert. 'Ich schick dir das PDF...'" 
            },
            { 
                t: "Flucht: 'Telefon klingelt!' (Phantom-Anruf)", 
                m: 2, f: 5, a: 0, c: 5, 
                r: "Du hältst dir dein stummes Handy ans Ohr: 'Ja Chef? Sofort!' und rennst weg. Jürgen ruft hinterher: 'Wir reden später über den Pufferspeicher!'" 
            }
        ]
    },
    {
        id: "cof_juergen_coffee",
        title: "Kaffee-Service",
        reqStory: "juergen_coffee", 
        text: "Jürgen steht an deinem Platz und stellt einen dampfenden Becher ab. 'Hier. Du bist ja vorhin so schnell weg wegen dem Server-Crash. Armer Kerl. Zucker, keine Milch, wie du es magst.'",
        opts: [
            { 
                t: "Dankbar annehmen & trinken", 
                m: 15, f: -5, a: -10, c: 0, 
                r: "Der Kaffee weckt deine Lebensgeister (+Energy). Leider setzt sich Jürgen auf deinen Schreibtisch: 'Also, wo war ich... genau, der Mähroboter!' Du hörst zu, weil du in seiner Schuld stehst." 
            },
            { 
                t: "Misstrauisch: 'Was willst du?'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Jürgen lacht: 'Nur nett sein! Mensch, ihr ITler seid immer so paranoid.' Er geht kopfschüttelnd. Der Kaffee schmeckt nach Schuldgefühlen, ist aber lecker." 
            },
            { 
                t: "Ablehnen: 'Ich trinke nur Red Bull.'", 
                req: "energy",
                m: 5, f: -20, a: 0, c: 0,
                r: "Du ziehst die Dose aus der Tasche. *ZISCH*. 'Das ist mein Treibstoff.' Du ext das Ding in drei Zügen. Jürgen weicht erschrocken zurück: 'Okay, okay, ganz ruhig...' Er verschwindet, bevor dein Herzrasen einsetzt." 
            }
        ]
    },
        {
            id: "cof_loot",
            title: "Reparatur-Set",
            text: "Der Hausmeister hat Material liegen lassen.",
            opts: [
                { t: "Panzertape nehmen", loot: "tape", m: 5, f: 5, a: 0, c: 0, r: "Eine fast volle Rolle Gaffa. Kann man immer brauchen. Inventar +1." },
                { t: "Kabelbinder nehmen", loot: "zip_ties", m: 5, f: 5, a: 0, c: 0, r: "Ein Bündel Kabelbinder. Praktisch. Inventar +1." }
            ]
        },
        {
            id: "cof_table",
            title: "Wackelnder Tisch",
            text: "Der Stehtisch in der Küche wackelt extrem. Der Kaffee schwappt fast über.",
            opts: [
                { t: "Schrauben festziehen", req: "screw", m: 10, f: -5, a: -5, c: 0, r: "Tisch steht fest. Du fühlst dich männlich/handwerklich begabt." },
                { t: "Bierdeckel drunter", m: 5, f: 5, a: 0, c: 0, r: "Klassiker. Hält." },
                { t: "Tischbein abtreten", req: "hammer", m: 5, f: 0, a: -20, c: 20, r: "Der Tisch ist zusammengebrochen. Aber er wackelt nicht mehr." }
            ]
        },
        {
            id: "cof_sticky",
            title: "Die verklebte Taste",
            text: "Katastrophe! Die überlebenswichtige 'Doppelter Espresso'-Taste klebt fest. Ein brauner, sirupartiger Rand verrät: Jemand hat hier Süßkram verschüttet. Der Knopf rührt sich keinen Millimeter.",
            opts: [
                { 
                    t: "Chirurgischer Eingriff mit dem Schraubendreher", 
                    req: "screw", 
                    m: 5, f: 0, a: -5, c: 0, 
                    r: "Mit der Präzision eines Uhrmachers hebelst du die Taste raus, kratzt den 'Zucker-Beton' weg und setzt sie wieder ein. *Klick*. Ein wunderschönes Geräusch." 
                },
                { 
                    t: "Frust-Lösung: Einfach draufhauen", 
                    m: 2, f: 0, a: 5, c: 5, 
                    r: "BAM! KNACK! Die Taste bricht ab und fliegt in hohem Bogen unter den Kühlschrank. Ups. Jetzt gibt es nur noch die Wahl zwischen 'Heißes Wasser' und 'Systemfehler'." 
                },
                { 
                    t: "Aufgeben & Tee trinken", 
                    m: 0, f: -5, a: 0, c: 0, 
                    r: "Du resignierst und nimmst einen Beutel Pfefferminztee. Er schmeckt nach Niederlage und Zahnpasta." 
                }
            ]
        },
        {
            id: "cof_hack",
            title: "Der Service-Port",
            text: "Du entdeckst an der Rückseite der Kaffeemaschine einen USB-Wartungsport. Das Display zeigt 'INSERT SERVICE KEY'.",
            opts: [
                { t: "USB-Stick benutzen", req: "usb_stick", m: 5, f: 10, a: -10, c: 0, r: "HACK SUCCESS! Du hast den 'Developer Mode' aktiviert. Der Kaffee läuft jetzt doppelt so schnell und ist kostenlos. Du fühlst dich wie Neo in der Matrix." },
                { t: "Wild Knöpfe drücken", m: 5, f: 0, a: -5, c: 0, r: "Nichts passiert. Außer dass du jetzt Lust auf Espresso hast." }
            ]
        },
        {
            id: "cof_chewing",
            title: "Die akustische Folter",
            text: "Kollegin Sabine steht direkt neben dir. In der Hand: Ein knackiger, saftiger Granny Smith. Sie beißt hinein. *KNACK*. Dann kaut sie. Mit weit offenem Mund. *SCHMATZ... SCHMATZ... SCHLÜRF*. Es klingt, als würde jemand Gummistiefel in einen Eimer Mayonnaise tauchen.",
            opts: [
                { 
                    t: "Sofort Noise-Cancelling aktivieren", 
                    req: "headphones", 
                    m: 0, f: 5, a: -10, c: 0, 
                    r: "Klick. Die Welt verstummt. Sabine bewegt den Kiefer wie ein Wiederkäuer, aber du hörst nur noch sanftes Meeresrauschen. Active Noise Cancelling rettet Leben (und Karrieren)." 
                },
                { 
                    t: "Den Stressball fast zerquetschen", 
                    req: "stressball", 
                    m: 10, f: 0, a: -5, c: 0, 
                    r: "Du kanalisiert deinen gesamten Hass in den roten Schaumstoffball. Deine Knöchel treten weiß hervor. Der Ball wimmert leise unter dem Druck. Sabine kaut unbeeindruckt weiter." 
                },
                { 
                    t: "Passiv-aggressiver Kommentar", 
                    m: 5, f: 0, a: 10, c: 5, 
                    r: "Du fragst laut: 'Sag mal, hast du ein Mikrofon verschluckt oder übst du für einen Horrorfilm?' Sabine erstarrt mit vollem Mund. Tödliches Schweigen. Die Stimmung ist im Keller." 
                }
            ]
        },
        {
            id: "cof_gossip",
            title: "Tratsch am Wasserspender",
            text: "Du hörst Frau Gräte flüstern: 'Der Chef war gestern im Seminar 'Positive Leadership'. Er flippt jetzt total aus, wenn jemand das Wort 'Problem' sagt. Er will nur noch 'Herausforderung' hören. Wer 'Problem' sagt, kriegt sofort die Kündigungsandrohung.'",
            opts: [
                { 
                    t: "Ins Gespräch einsteigen", 
                    m: 10, f: 5, a: -5, c: 10,
                    r: "Du nickst eifrig und lästerst mit. Plötzlich räuspert sich jemand hinter dir. Der Chef starrt dich an, tippt auf seine Uhr und notiert sich deinen Namen. Die Gruppe löst sich panisch auf." 
                },
                { 
                    t: "Ignorieren und Kaffee holen", 
                    m: 2, f: 0, a: 0, c: 0, 
                    r: "Du stellst die Ohren auf Durchzug. 'Nicht mein Zirkus, nicht meine Affen.' Du nimmst deinen Becher und gehst wortlos zurück an den Platz. Sicher ist sicher." 
                }
            ]
        },
        {
            id: "cof_chef_title",
            title: "Titel-Kämpfe in der Kantine",
            text: "Du hörst lautes Geschrei aus der Küche. Der Kantinen-Chef fuchtelt wild mit einer Schöpfkelle herum: 'Ich bin doch kein schnöder KOCH! Ich bin *Senior Nutrition Artist* und *Food Experience Manager*! Wer mich noch einmal 'Koch' nennt, kriegt versalzene Suppe bis zur Rente!'",
            opts: [
                { 
                    t: "Amüsiert grinsend zuhören", 
                    m: 5, f: 5, a: 0, c: 0, 
                    r: "'Nutrition Artist'... soso. Wenn er ein Künstler ist, warum schmeckt die Bolognese dann immer nach Pappe? Du behältst den Gedanken lieber für dich." 
                },
                { 
                    t: "Provokation: 'Herr Koch? Die Suppe ist kalt!'", 
                    m: 5, f: 0, a: 10, c: 5, 
                    r: "Totenstille. Er dreht sich langsam um, die Kelle fest umklammert. Seine Augen verengen sich zu Schlitzen. Du stehst jetzt auf seiner schwarzen Liste. Dein nächstes Schnitzel wird Schuhsohlen-Qualität haben." 
                },
                { 
                    t: "Schleimen: 'Guten Morgen, Maestro!'", 
                    m: 10, f: 5, a: -5, c: 0, 
                    r: "Er hält inne, rückt seine Mütze zurecht und lächelt geschmeichelt. 'Endlich jemand mit Kultur!' Du bekommst heute eine extra große Portion Pudding." 
                }
            ]
        },
		{
            id: "cof_premium_hack",
            title: "Der 'Gold' Modus",
            text: "Du stehst vor der Maschine. Dein Magen knurrt. Auf dem Display steht: 'PREMIUM RÖSTUNG - NUR FÜR VORSTAND (Karte erforderlich)'. Für das Fußvolk gibt es nur 'Wasser mit brauner Farbe' für 2,50€.",
            opts: [
                { 
                    t: "2,50€ bezahlen", 
                    m: 5, f: 0, a: 10, c: 0, 
                    r: "Du wirfst das Geld ein. Der Kaffee schmeckt nach verbrannten Reifen. Du fühlst dich ausgeraubt." 
                },
                { 
                    t: "Espresso + Sensor zuhalten",
                    m: 5, f: 10, a: -20, c: 0, 
                    r: "Die Maschine piept leise. Das Display zeigt: 'WELCOME MASTER'. Goldene Flüssigkeit fließt in deine Tasse. Es ist der beste Kaffee deines Lebens. Gratis." 
                },
                { 
                    t: "Mit Hammer 'bezahlen'", 
                    req: "hammer", 
                    m: 5, f: 0, a: -10, c: 20, 
                    r: "Du schlägst gegen den Schlitz. Eine Münze fällt raus. Immerhin 50 Cent gewonnen, aber der Kaffee fehlt." 
                },
                { 
                    t: "Wild Tasten drücken", 
                    m: 5, f: 0, a: 5, c: 0, 
                    r: "ERROR. Die Maschine sperrt sich für 5 Minuten. Toll gemacht." 
                }
            ]
        },
        {
            id: "cof_iot_fail",
            title: "Das gefährliche IoT-Upgrade",
            text: "Du traust deinen Augen nicht: Jemand hat einen billigen 'Smart Plug' (Marke 'China-Export') zwischen Steckdose und Kaffeemaschine gebastelt. Das Gehäuse schmilzt bereits, es funkt blau und riecht beißend nach verbranntem Weichmacher. Brandgefahr Stufe Rot.",
            opts: [
                { 
                    t: "Lebensgefahr: Sofort den Stecker ziehen", 
                    m: 10, f: -5, a: 30, c: 30, 
                    r: "ZACK! Funkenregen. Du hast das Gebäude gerettet. Da stürmt der Marketing-Chef mit knallrotem Kopf rein: 'MEIN PROTOTYP! Ich habe wochenlang an der Blockchain-basierten 'Coffee-Cloud' gearbeitet! Sie Maschinenstürmer!' Er meldet dich wegen 'Sabotage digitaler Assets'." 
                },
                { 
                    t: "Abwarten & Cola trinken", 
                    m: 5, f: 10, a: -10, c: 0, 
                    r: "Nicht deine Hardware, nicht dein Feuer. Du öffnest zischend eine Cola und schaust zu. POFF! Eine Stichflamme. Dann springt die Sprinkleranlage an und verwandelt den Flur in ein Feuchtbiotop. Ein herrlicher Anblick." 
                }
            ]
        },
        {
            id: "cof_descaling",
            title: "Kalk-Infarkt",
            text: "Die Kaffeemaschine blinkt in aggressivem Rot: 'SYSTEM VERKALKT - BITTE REINIGEN'. Der Kaffee tröpfelt nur noch im Sekundentakt wie eine undichte Dachrinne in die Tasse. Die Pumpe ächzt hörbar.",
            opts: [
                { 
                    t: "Den Reinigungsvorgang heldenhaft starten", 
                    m: 10, f: -10, a: 40, c: 0, 
                    r: "Du drückst den Knopf. Ein fataler Fehler. Das Display zeigt: 'Reinigung läuft... Restzeit: 45 Minuten'. Hinter dir bildet sich sofort eine wütende Schlange. 'Toll, Müller! Jetzt kriegt keiner mehr was! Musste das jetzt sein?!' Du wirst ausgebuht und mit Zuckerpäckchen beworfen." 
                },
                { 
                    t: "Schild 'DEFEKT' drankleben & verschwinden", 
                    m: 2, f: 5, a: -5, c: 0, 
                    r: "Du klebst einen Zettel über das Display und machst dich schnell aus dem Staub. Die Kollegen seufzen enttäuscht und schlurfen zurück an die Arbeit. Du hast das Problem zwar nicht gelöst, aber erfolgreich delegiert." 
                },
                { 
                    t: "Ignorieren & tröpfeln lassen", 
                    m: 5, f: 0, a: 10, c: 0, 
                    r: "Du starrst stoisch auf den Auslauf. Tropf... Tropf... Nach 5 Minuten hast du eine halbe Tasse lauwarme, kalkhaltige Brühe. Sie schmeckt nach Elend, aber sie enthält Koffein." 
                }
            ]
        },
        {
            id: "cof_spill_blame",
            title: "Die braune Gefahr",
            text: "Ein See aus klebrigem, kaltem Kaffee breitet sich vor der Maschine aus. Der Täter ist längst über alle Berge. Es ist eine rutschige Todesfalle, die nur darauf wartet, das nächste Opfer zu fordern.",
            opts: [
                { 
                    t: "Heldenhaft zum Lappen greifen & wischen", 
                    m: 5, f: -5, a: 30, c: 20, 
                    r: "Du kniest am Boden und wischst. In dem Moment biegt der Chef um die Ecke. Er sieht die Sauerei und dich. 'Herrgott, Müller! Können Sie nicht mal eine Tasse halten, ohne den Boden zu fluten? Wischen Sie das weg, das ist ja peinlich für die Firma!' Er steigt über deine Hand und geht. Du kochst vor Wut." 
                },
                { 
                    t: "Warnschild basteln & aufstellen", 
                    m: 2, f: 5, a: 0, c: 0, 
                    r: "Du kritzelst 'VORSICHT: RUTSCHGEFAHR' auf einen Zettel, stellst ihn auf und gehst. Kurz darauf hörst du hinter dir ein lautes Schlittern, gefolgt von Fluchen. Tja, wer lesen kann, ist klar im Vorteil." 
                },
                { 
                    t: "Großen Schritt drüber machen", 
                    m: 0, f: 5, a: 0, c: 0, 
                    r: "Mit einem olympreifen Satz springst du über die Lache. Nicht dein Dreck, nicht dein Problem. Soll die Nachtschicht doch Schlittschuh laufen." 
                }
            ]
        },
        {
            id: "cof_elster_fight",
            title: "Streit um den Kühlschrank",
            text: "Frau Elster wirft dein Essen weg! 'Das stinkt nach Erdnüsse!', keift sie. Du stellst sie zur Rede.",
            opts: [
                { 
                    t: "Anbrüllen: 'Das war mein Mittag!'", 
                    m: 10, f: 0, a: 20, c: 10, 
                    r: "Sie schreit zurück: 'Ich bin hochsensibel! Wenn ich nur **Erdnüsse** rieche, schwillt mein Hals zu! Nimm gefälligst Rücksicht!' Sie atmet schwer und hält sich den Hals. Oha, wunde Stelle entdeckt." 
                },
                { 
                    t: "Klein beigeben", 
                    m: 5, f: 5, a: -5, c: 0, 
                    r: "Du entschuldigst dich kleinlaut. Sie rückt ihre Brille zurecht, schnaubt: 'Man muss eben an die Gemeinschaft denken!' und rauscht ab. Der Streit ist vorbei, dein Essen aber auch." 
                }
            ]
        },
        {
            id: "cof_salary_rumor",
            title: "Der Gehalts-Schock",
            text: "Du stehst hinter der Säule und hörst Chantal aus dem Marketing kichern: 'Ja, echt! 500 Euro mehr! Einfach so, weil ich so nett gelächelt habe! Dabei kann ich kaum Excel.' Dein Gehalt wurde seit 3 Jahren nicht angepasst. Dir platzt fast der Kragen. Du brauchst dringend Argumente für ein Chef-Gespräch.",
            opts: [
                { 
                    t: "Wut nutzen & Leistungen notieren", 
                    loot: "arg_list_1", 
                    m: 10, f: -5, a: 5, c: 0, 
                    r: "Du schnappst dir eine Serviette und kritzelt wütend deine Erfolge auf: '1000 Tickets gelöst, Brände verhindert, Server gerettet'. Du steckst den Zettel wie eine Waffe ein. Das ist wertvolle Munition für später." 
                },
                { 
                    t: "Chantal eine Szene machen", 
                    m: 5, f: 0, a: 20, c: 10, 
                    r: "Du brüllst quer durch den Raum: 'EXCEL IST KEINE KUNST!'. Chantal fängt an zu weinen. Alle starren dich an. Du hast Dampf abgelassen, wirkst aber mental labil. Kein guter Look." 
                },
                { 
                    t: "Den Ärger mit Kaffee runterspülen", 
                    m: 5, f: 5, a: 10, c: 0, 
                    r: "Du schluckst den Ärger zusammen mit der schwarzen Brühe runter. Bitter. Genau wie dein Kontostand. Du änderst nichts an der Situation." 
                },
                { 
                    t: "Den Stressball massakrieren", 
                    req: "stressball", 
                    m: 5, f: 0, a: -15, c: 0, 
                    r: "Du quetschst den Ball, bis deine Knöchel weiß hervortreten. Er wimmert leise unter dem Druck. Dein Puls sinkt wieder auf 160. Du bist ruhiger, aber immer noch unterbezahlt." 
                }
            ]
        },
        {
            id: "cof_markus_flex",
            title: "Der Angeber",
            text: "Markus aus dem Vertrieb blockiert die Maschine. Er krempelt den Ärmel seines Sakkos hoch und hält dir sein Handgelenk unter die Nase. 'Na, Admin? Schau mal genau hin. Diese Uhr kostet mehr als dein ganzes Auto.' Er grinst sein breites Gewinner-Lächeln.",
            opts: [
                { 
                    t: "Gezielter Wurf mit dem Stressball", 
                    req: "stressball", 
                    m: 5, f: 0, a: -20, c: 30, 
                    r: "ZACK! Volltreffer auf den Zinken. Markus jault auf wie ein getretener Pudel. Du fühlst tiefe Genugtuung, aber leider stand der Chef im Türrahmen." 
                },
                { 
                    t: "Kopfhörer aufsetzen & ignorieren", 
                    req: "headphones", 
                    m: 5, f: 5, a: -10, c: 0, 
                    r: "Klick. Noise-Cancelling an. Du hörst sanfte Mozart-Klänge, während Markus stumm den Mund bewegt und mit der Uhr fuchtelt. Du zapfst entspannt deinen Kaffee und lässt ihn stehen." 
                },
                { 
                    t: "Trocken kontern: 'Ist die geleast?'", 
                    m: 10, f: 0, a: -5, c: 5, 
                    r: "Sein Grinsen gefriert. Er läuft rot an und stammelt etwas von 'Wertanlage'. Die umstehenden Kollegen lachen laut los. Ein Sieg auf ganzer Linie." 
                },
                { 
                    t: "Unterwürfig warten", 
                    m: 20, f: 0, a: 15, c: 0, 
                    r: "Du wartest devot 20 Minuten, bis er seinen Monolog über 'Assets' und 'Mindset' beendet hat. Du hast deinen Kaffee, aber er schmeckt bitter nach Demütigung." 
                }
            ]
        },
        {
            id: "cof_gabi_sad",
            title: "Trauerfall in der Poststelle",
            text: "Gabi aus der Poststelle sitzt schluchzend auf einem Stapel ungeöffneter Mahnungen. In der Hand hält sie einen braunen, schrumpeligen Klumpen. 'Mein kleiner Stachi ist tot! Einfach von uns gegangen!' Die Arbeit liegt brach, die Post stapelt sich bis zur Decke.",
            opts: [
                { 
                    t: "Den 'Loot-Donut' als Trost spenden", 
                    req: "donut", 
                    m: 10, f: 5, a: -10, c: -5, 
                    r: "Du opferst deinen Schatz. Gabis Augen leuchten auf. Zucker heilt alle Wunden. Sie mampft glücklich und sortiert die Post plötzlich mit doppelter Geschwindigkeit. Gute Tat!" 
                },
                { 
                    t: "Ihr einen Energy-Drink geben", 
                    req: "energy", 
                    m: 5, f: 0, a: 5, c: 5, 
                    r: "Ganz schlechte Idee. Das Taurin kickt sofort. Gabi ist jetzt hyperaktiv, rennt durch den Raum und tackert Briefe an die Wand. Es ist pures Chaos, aber immerhin weint sie nicht mehr." 
                },
                { 
                    t: "Geduldig zuhören (Seelsorge)", 
                    m: 45, f: -15, a: 20, c: 10, 
                    r: "Du hörst dir eine 45-minütige Grabrede für eine Sukkulente an. Während Gabi über 'richtiges Gießen' philosophiert, explodieren bei dir die Tickets. Der Chef fragt später giftig: 'Sind wir hier bei der Caritas?'" 
                }
            ]
        },
        {
            id: "cof_machine_broke",
            title: "Kritischer Dichtungsfehler",
            text: "Ein Rinnsal aus heißem Wasser schießt aus der Seite der Kaffeemaschine. Die braune Brühe bahnt sich unaufhaltsam ihren Weg Richtung der völlig überlasteten Mehrfachsteckdose am Boden. Ein leises, bedrohliches elektrisches Knistern liegt bereits in der Luft.",
            opts: [
                { 
                    t: "Mit Gaffa-Tape abdichten", 
                    req: "tape", 
                    m: 10, f: -5, a: 0, c: -10, 
                    r: "Du wickelst eine halbe Rolle Tape um den Wassertank. Es sieht aus wie eine misslungene Mumie, aber es hält dicht! Die Küche bleibt trocken, der Kaffee fließt. Du bist der Held des Tages." 
                },
                { 
                    t: "Sicherheits-Protokoll: Stecker ziehen", 
                    m: 5, f: 5, a: 10, c: 10, 
                    r: "Zack. Strom aus. Die Gefahr ist gebannt. Das Display wird schwarz. Ein kollektives, schmerzhaftes Stöhnen geht durch das Büro. Du hast vielleicht Leben gerettet, aber die Stimmung ist im Eimer." 
                },
                { 
                    t: "Pfeifend weitergehen & ignorieren", 
                    m: 5, f: 10, a: 0, c: 50, 
                    r: "Du ignorierst die Pfütze und gehst an deinen Platz. Zehn Minuten später: *ZZZAPP*. Dunkelheit im ganzen Stockwerk. Der Chef stürmt auf den Flur und brüllt ins Blaue: 'WER HAT DIE SICHERUNG RAUSGEJAGT?! MEIN WORD-DOKUMENT WAR NICHT GESPEICHERT!!'" 
                }
            ]
        },
        {
            id: "cof_kevin_learn",
            title: "Kevins Weltbild",
            text: "Kevin starrt fasziniert auf das blinkende Server-Rack. Er dreht sich mit großen Augen zu dir um: 'Sag mal... sitzt da drin eigentlich ein kleiner Mann, der die ganzen E-Mails tippt und weiterschickt?' Du wartest auf die Pointe. Aber es kommt keine. Er meint das todernst.",
            opts: [
                { 
                    t: "Die Technik geduldig erklären", 
                    m: 30, f: -10, a: 10, c: 0, 
                    r: "Du nimmst dir eine halbe Stunde Zeit und malst Datenpakete an das Whiteboard. Kevin nickt langsam: 'Achso! Also wie Rohrpost, nur unsichtbar?' Es ist ein kleiner Fortschritt." 
                },
                { 
                    t: "Ihm wortlos das Handbuch geben", 
                    req: "manual", 
                    m: 5, f: 5, a: 0, c: 0, 
                    r: "Du drückst ihm den schweren Wälzer gegen die Brust. 'Lies Kapitel 1 bis 10. Vorher sprichst du mich nicht mehr an.' Er verzieht sich ehrfürchtig in eine Ecke. Endlich Ruhe." 
                },
                { 
                    t: "Lügen: 'Ja, das ist der E-Mail-Kobold'", 
                    m: 5, f: 10, a: -5, c: 10, 
                    r: "Du nickst verschwörerisch: 'Ja, er heißt Gunter. Aber bloß nicht füttern!' Kevin kriecht jetzt mit der Taschenlampe hinter das Rack und sucht nach Gunter. Der Chef sieht es und zweifelt an der Eignung des Azubis." 
                }
            ]
        },
        {
            id: "cof_birthday_cake",
            title: "Kuchen im Flur",
            text: "Jemand hat Geburtstag! Es steht ein riesiger Schokokuchen in der Küche. Ein Schild sagt: 'Bedient euch!'",
            opts: [
                { 
                    t: "Ein Stück nehmen",
                    m: 10, f: 5, a: -10, c: 0, 
                    r: "Lecker! Ein purer Zuckerschock. Du bist für 10 Minuten glücklich." 
                },
                { 
                    t: "Den ganzen Kuchen einpacken",
                    m: 5, f: 10, a: -5, c: 20, 
                    r: "Du trägst den kompletten Kuchen in dein Büro. 'Für später'. Die Kollegen starren dich fassungslos an. Sie hassen dich jetzt." 
                },
                { 
                    t: "Misstrauisch sein", 
                    m: 0, f: 0, a: 5, c: 0, 
                    r: "Gratis Essen? Verdächtig. Wer weiß, wie lange der da schon steht. Du rührst ihn nicht an." 
                }
            ]
        },
        {
            id: "cof_elevator_stuck",
            title: "Im Aufzug stecken",
            text: "Du wolltest Kaffee holen, jetzt steckst du mit Markus (Vertrieb) im Aufzug fest. Er riecht nach zu viel Aftershave.",
            opts: [
                { 
                    t: "Notruf drücken", 
                    m: 30, f: 0, a: 10, c: 0, 
                    r: "Egon meldet sich: 'Jo, ich ess erst mal auf.' Du bist 30 Min gefangen." 
                },
                { 
                    t: "Markus zuhören", 
                    m: 30, f: -10, a: 20, c: 0, 
                    r: "Er erzählt von seinem Porsche. Du willst sterben." 
                },
                { 
                    t: "Aufzugstür aufhebeln", 
                    req: "screw", 
                    m: 10, f: -5, a: -5, c: 0, 
                    r: "Mit dem Schraubendreher öffnest du die Tür. Ihr klettert raus. Markus hält dich für einen Helden." 
                }
            ]
        },
        {
            id: "cof_miracle",
            title: "Das kleine Wunder",
            text: "Die Maschine macht seltsame Geräusche, rattert... und produziert dann den perfekten Kaffee. Perfekte Temperatur, haselnussbraune Crema, duftet wie in Italien. Ein statistischer Ausreißer.",
            opts: [
                { 
                    t: "Andächtig genießen", 
                    m: 10, f: 5, a: -25, c: 0, 
                    r: "Du trinkst in kleinen Schlucken. Jeder Schluck heilt deine Seele ein wenig. Du vergisst kurz, dass du in einem Großraumbüro arbeitest. Aggro sinkt massiv." 
                },
                { 
                    t: "Schnell runterkippen", 
                    m: 2, f: 0, a: -5, c: 0, 
                    r: "Lecker, aber viel zu schnell vorbei. Der Geschmack bleibt, aber die Entspannung fehlt." 
                },
                { 
                    t: "Foto für Insta machen", 
                    m: 5, f: 10, a: -10, c: 0, 
                    r: "Du postest es mit '#OfficeLife'. Ein paar Likes heben die Laune etwas." 
                }
            ]
        },
        {
            id: "cof_silence",
            title: "Himmlische Stille",
            text: "Du betrittst die Küche. Sie ist leer. Kein Kühlschrank-Brummen, kein kauender Kollege, kein Tropfen. Einfach nur absolute, goldene Stille.",
            opts: [
                { 
                    t: "Die Augen schließen & atmen", 
                    m: 5, f: 5, a: -20, c: 0, 
                    r: "Fünf Minuten Zen-Modus. Du spürst, wie dein Blutdruck in den messbaren Bereich sinkt. Herrlich." 
                },
                { 
                    t: "Schnell Kaffee holen & weg", 
                    m: 2, f: 0, a: -5, c: 0, 
                    r: "Du nutzt die freie Bahn für einen Rekord-Boxenstopp. Effizient, aber wenig erholsam." 
                }
            ]
        },
        {
            id: "cof_cookie_luck",
            title: "Der verwaiste Keks",
            text: "Neben der Zuckerdose liegt ein einzelner, verpackter Premium-Keks (Karamell-Kern). Keine Notiz, kein Besitzer in Sicht. Das Universum meint es gut mit dir.",
            opts: [
                { 
                    t: "Essen (Zucker-Boost)", 
                    m: 5, f: 5, a: -15, c: 0, 
                    r: "Der Zucker flutet dein Gehirn. Glückshormone kämpfen gegen den Stress an. Du fühlst dich gestärkt für das nächste Ticket." 
                },
                { 
                    t: "Einstecken für später", 
                    m: 2, f: 0, a: -5, c: 0, 
                    r: "Du steckst ihn in die Tasche. Das Wissen, eine Not-Ration zu haben, beruhigt dich ein wenig." 
                }
            ]
        },
        {
        id: "cof_disaster",
        title: "OUT OF ORDER",
        text: "Du brauchst Koffein. Dringend. Aber auf dem Display der Maschine steht nur: 'ERROR 418 - I'm a teapot'. Deine Hände zittern.",
        opts: [
            { 
                t: "Dagegen treten", 
                m: 5, f: 0, a: 10, c: 0,
                r: "Du trittst gegen die Maschine. Kaffee läuft aus. Auf deine Schuhe. Großartig." 
            },
            { 
                t: "Reparieren", 
                req: "screw", 
                m: 15, f: 0, a: -10, c: -5,
                r: "Du fixierst den Schlauch. Die Maschine surrt! Der erste Schluck schmeckt nach Sieg (und Kalk)." 
            },
            { 
                t: "Folie nutzen", 
                req: "bubble_wrap", 
                m: 10, f: 5, a: -15, c: 0,
                r: "Du setzt dich auf den Boden und ploppst Folie, bis das Zittern aufhört. Kein Kaffee, aber zumindest kein Mord." 
            }
        ]
    },
    {
        id: "cof_story_chantal_1",
        title: "Chantal ohne Filter",
        text: "Chantal steht an der Maschine. Sie sieht fertig aus. 'Boah, diese ganze Fake-Welt hier... alle lächeln, alle lügen. Manchmal will ich einfach schreien.'",
        opts: [
            { 
                t: "Ehrliches Mitleid: 'Kann ich verstehen.'", 
                m: 15, f: 5, a: -10, c: 0, 
                r: "Sie seufzt. 'Danke. Wenigstens einer ist nett.' Ein netter Moment, aber zu harmlos für eine Allianz." 
            },
            { 
                t: "Zynismus: 'Dann geh doch heulen.'", 
                next: "chantal_war", 
                m: 5, f: 0, a: 15, c: 5, 
                r: "Sie starrt dich geschockt an, dann funkelt sie böse. 'Wow. Du bist echt ein Arschloch.' Sie ist beeindruckt von deiner Kälte." 
            },
            { 
                t: "Ignorieren und Kaffee nehmen", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du drückst dich an ihr vorbei. Sie ist Luft für dich." 
            }
        ]
    },
    {
        id: "cof_story_elster_1",
        title: "Die Inventur",
        text: "Frau Elster steht mit einer Lupe an der Kaffeemaschine. 'Die Kaffeebohnen-Ratio entspricht nicht der Norm DIN-404. Das ist Verschwendung!' Sie notiert etwas in ihr schwarzes Buch.",
        opts: [
            { 
                t: "Genervt: 'Haben Sie keine Hobbys?'", 
                m: 5, f: 0, a: 10, c: 5, 
                r: "Sie blickt dich eisig an. 'Mein Hobby ist Effizienz.' Sie notiert deinen Namen. Das gibt Ärger." 
            },
            { 
                t: "Beobachten: 'Sind das Katzenhaare auf Ihrem Blazer?'", 
                next: "elster_cat", 
                m: 15, f: 0, a: -5, c: 0, 
                r: "Sie erstarrt. Ihr Gesicht wird weich. 'Das ist Rüdiger. Er haart im Winter so sehr.' Sie zeigt dir sofort 50 Fotos auf ihrem Handy. Du hörst geduldig zu." 
            },
            { 
                t: "Bürokratisch: 'Ich fülle Formular 7B aus.'", 
                m: 10, f: -5, a: 0, c: 0, 
                r: "Sie nickt anerkennend. 'Gut. Ordnung muss sein.' Ihr versteht euch professionell, aber mehr nicht." 
            }
        ]
    },
    {
        id: "cof_story_egon_1",
        title: "Land unter in der Küche",
        text: "Egon liegt rücklings unter der Spüle. Dreckiges Wasser spritzt ihm ins Gesicht. Er flucht leise vor sich hin. Die Kaffeemaschine ist durch seine Beine blockiert.",
        opts: [
            { 
                t: "Dran vorbeiquetschen & Tee nehmen",
                m: 2, f: 5, a: 0, c: 0,
                r: "Du greifst dir schnell einen Teebeutel und steigst vorsichtig über Egons Beine. 'Tschuldigung', murmelst du. Egon grunzt nur. Du hast deinen Tee, aber keine Freunde."
            },
            { 
                t: "Nett sein: 'Soll ich den Klempner rufen?'",
                m: 5, f: 0, a: 10, c: 5,
                r: "Egon knallt den Schraubenschlüssel auf den Boden. 'ICH BIN DER KLEMPNER!' Er funkelt dich wütend an. 'Geh mir aus der Sonne, Bürokrat.' Chance vertan."
            },
            { 
                t: "Fachsimpeln: 'Dichtung porös? Gib mal die Zange.'",
                next: "egon_buddy",
                m: 20, f: -10, a: -5, c: 0,
                r: "Egon blinzelt überrascht durch das Schmutzwasser. 'Endlich einer, der nicht nur dumm guckt. Hier, halt mal fest.' Ihr repariert es schweigend. Ein Männer-Moment."
            }
        ]
    },
    {
        id: "cof_story_markus_1",
        title: "Markus im Angriffsmodus",
        text: "Markus (Vertriebsleiter) fängt dich ab. Er rückt seine Krawatte zurecht. 'Müller! Gut dass ich Sie sehe. Ich muss gleich zum Großkunden. Ich brauche Admin-Rechte auf meinem Laptop, um die Firewall zu umgehen. Der Kunde will unsere 'Cloud-KI' sehen (die wir gar nicht haben).'",
        opts: [
            { 
                t: "Ablehnen: 'Sicherheitsrisiko.'", 
                m: 2, f: 0, a: 10, c: 0, 
                r: "Markus schnaubt verächtlich. 'Typisch IT. Bedenkenträger! Wegen Leuten wie Ihnen macht Deutschland keinen Umsatz!' Er stürmt davon." 
            },
            { 
                t: "Helfen: 'Ich richte einen Gast-Modus ein.'", 
                next: "markus_deal", 
                m: 15, f: -5, a: -5, c: 0, 
                r: "Du konfigurierst schnell eine Sandbox. Markus klopft dir hart auf den Rücken. 'Guter Mann! Das ist Mindset! Wir sehen uns auf der Yacht!'" 
            },
            { 
                t: "Sarkasmus: 'Verkauf ihm doch Excel.'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Markus lacht laut und falsch. 'Witzig, Müller. Wirklich witzig. Ich merke mir das für die nächste Kündigungswelle.' Chance vertan." 
            }
        ]
    },
    {
            id: "cof_story_ceo_1",
            title: "Der Visionär",
            text: "Dr. Wichtig steht an der Maschine. Er starrt in seinen schwarzen Kaffee. 'Müller! Ich habe eine Vision. Wir schaffen Stühle ab. Wir machen 'Walking Meetings' auf Laufbändern! Das steigert die Performance um 12%!'",
            opts: [
                { t: "Einwand: 'Das ist Wahnsinn, wir sind keine Hamster.'", m: 2, f: 0, a: 10, c: 5, r: "Er seufzt tief. 'Sie haben einfach kein Mindset, Müller. Sie sind ein Anker in meinem Ozean des Fortschritts.' Er geht kopfschüttelnd." },
                { t: "Schleimen: 'Genial! Disruptiv! Ich bestelle Testgeräte.'", next: "ceo_vision", m: 10, f: -5, a: -5, c: -5, r: "Er strahlt. 'Endlich einer, der es versteht! Wir werden das Silicon Valley des Sauerlands! Bleiben Sie dran, Müller!'" },
                { t: "Ignorieren: Schweigen und Kaffee nehmen", m: 2, f: 0, a: 0, c: 0, r: "Du bist Luft für ihn. Er murmelt weiter 'Synergien... Laufbänder... Krypto...' vor sich hin." }
            ]
    },
    {
        id: "cof_sugar_1",
        title: "Der Zucker-Baron",
        text: "Du erwischst Bernd (Logistik) dabei, wie er hektisch *alle* Zuckerpäckchen in seine Hosentaschen stopft. Er sieht dich mit großen Augen an. 'Psst! Die Geschäftsleitung will den Zucker rationieren! Ich lege Vorräte an! Willst du auch welche?'",
        opts: [
            { 
                t: "Komplize werden: 'Gib her!'", 
                next: "sugar_buddy", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "Bernd grinst und schiebt dir eine Handvoll Päckchen zu. 'Wir verstehen uns. Viva la Revolution!' Ihr nickt euch verschwörerisch zu." 
            },
            { 
                t: "Moralapostel: 'Bernd, das ist Diebstahl.'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Bernd zischt: 'Systemling!' und rennt geduckt davon. Dabei rieselt Zucker aus seiner Hosentasche." 
            }
        ]
    },
    {
        id: "cof_sugar_2",
        title: "Zucker-Schock",
        reqStory: "sugar_buddy",
        text: "Bernd fängt dich ab. Er zittert am ganzen Körper, seine Pupillen sind riesig. 'Der Automat... er ist leer! Jemand hat den Zucker geklaut! (Das war er selbst). Ich brauche meinen Stoff! Hast du noch was von neulich?'",
        opts: [
            { 
                t: "Ihm den Zucker zurückgeben", 
                m: 5, f: 0, a: -10, c: 0, 
                r: "Er reißt die Päckchen auf und kippt sie sich pur in den Mund. 'Ohhh ja... das kickt.' Er wird sofort ruhig. Krise abgewendet." 
            },
            { 
                t: "Ablehnen: 'Du hast ein Problem, Bernd.'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Er funkelt dich böse an. 'Du stehst jetzt auf meiner Liste!' Er wankt zitternd davon, auf der Suche nach Süßstoff." 
            }
        ]
    },
    {
        id: "cof_mold_1",
        title: "Kühlschrank-Exkursion",
        text: "Ganz hinten im Kühlschrank steht ein Joghurt. Das Verfallsdatum ist 'Mai 2012'. Er scheint zu pulsieren.",
        opts: [
            { 
                t: "Tür schnell zuwerfen",
                m: 2, f: 5, a: 10, c: 0,
                r: "Aus den Augen, aus dem Sinn. Aber der Ekel bleibt."
            },
            { 
                t: "Genau hinsehen",
                next: "mold_contact",
                m: 5, f: 0, a: 5, c: 0,
                r: "Der Schimmelpilz formt winzige Buchstaben: 'H...A...L...L...O'. Du brauchst dringend Urlaub."
            }
        ]
    },
    {
        id: "cof_mold_2",
        title: "Erste Kontaktaufnahme",
        reqStory: "mold_contact",
        text: "Der Joghurt hat jetzt kleine Augen entwickelt. Eine piepsige Stimme in deinem Kopf sagt: 'BRING UNS ZUCKER.'",
        opts: [
            { 
                t: "Zuckerpäckchen opfern",
                next: "mold_peace",
                m: 5, f: 10, a: -10, c: 0,
                r: "Der Pilz absorbiert den Zucker glücklich. 'WIR AKZEPTIEREN DICH ALS DIENER.' Du fühlst dich seltsam entspannt."
            },
            { 
                t: "Mit Desinfektionsmittel drohen",
                m: 10, f: -5, a: 25, c: 0,
                r: "Der Pilz zischt aggressiv. Sporen fliegen dir ins Gesicht. Du hustest minutenlang."
            }
        ]
    },
    {
        id: "cof_mold_3",
        title: "Die Allianz",
        reqStory: "mold_peace",
        text: "Der Joghurt hat eine Zivilisation im Gemüsefach errichtet. 'MEISTER', piepst es. 'DER CHEF HAT SEINE SANDWICHES HIER. SOLLEN WIR SIE... VERBESSERN?'",
        opts: [
            { 
                t: "Nicken und gehen",
                m: 5, f: 20, a: -20, c: 15,
                r: "Später hörst du den Chef brüllen: 'Warum schmeckt mein Brot nach Blaubeere?!'. Rache ist süß."
            },
            { 
                t: "Ablehnen",
                m: 5, f: 0, a: 0, c: 0,
                r: "Der Pilz wirkt enttäuscht und zieht sich zurück."
            }
        ]
    },
    {
        id: "cof_catering",
        title: "Die Reste der Macht",
        text: "Das Meeting ist vorbei. Auf dem Tisch im Konferenzraum stehen die Reste. Lachs, Kaviar-Häppchen, Premium-Kaffee. Niemand ist zu sehen.",
        opts: [
            { 
                t: "Aufräumen (Pflichtbewusst)", 
                next: "cat_cleanup", 
                m: 15, f: -15, a: 5, c: -5, 
                r: "Du räumst auf. Dabei findest du unter dem Stuhl des Chefs einen Zettel: 'Liste der Mitarbeiter, die wir feuern wollen'. Dein Name steht nicht drauf... noch nicht." 
            },
            { 
                t: "Gierig alles aufessen", 
                next: "cat_eat", 
                m: 10, f: 15, a: -5, c: 0, 
                r: "Du stopfst dich voll. Lachs, Trauben, Käse. Du fühlst dich wie ein König. Leider hast du jetzt einen fetten Remouladen-Fleck auf dem Hemd." 
            },
            { 
                t: "Nur den Kaffee klauen", 
                next: "cat_gossip", 
                m: 5, f: -10, a: -15, c: 0, 
                r: "Du füllst deinen Becher. Sabine vom Empfang fängt dich an der Tür ab. Sie grinst wissend. Sie hat dich gesehen." 
            }
        ]
    },
    {
        id: "cof_catering_cleanup",
        title: "Heikle Informationen",
        reqStory: "cat_cleanup", 
        text: "Der Chef kommt hektisch zurück. Er sucht genau diesen Zettel. Er sieht dich an, Panik in den Augen. 'Müller! Haben Sie hier... Papierkram gesehen?'",
        opts: [
            { 
                t: "Ehrlich: 'Hier ist er, Chef.'", 
                m: 5, f: 0, a: 15, c: 20,
                r: "Er reißt ihn dir aus der Hand. Statt Dankbarkeit siehst du Kälte. Er weiß jetzt, dass DU Bescheid weißt. 'Vergessen Sie das. Sofort.' Du stehst jetzt auf seiner Beobachtungsliste." 
            },
            { 
                t: "Wahnsinn: Zettel in den Mund stecken & kauen", 
                m: 5, f: 5, a: -10, c: -20,
                r: "Du starrst ihm in die Augen, steckst das Papier in den Mund und schluckst es runter. 'Ich habe nichts gesehen, Chef.' Er nickt langsam, tief beeindruckt. 'Guter Mann. Weitermachen.'" 
            },
            { 
                t: "Lügen: 'War nur Müll im Schredder.'", 
                m: 2, f: 0, a: 0, c: -5,
                r: "'Gut. Sehr gut.' Er atmet aus. 'Müll muss weg.' Er wirkt erleichtert, dass das Geheimnis scheinbar vernichtet ist." 
            }
        ]
    },
    {
        id: "cof_catering_eat",
        title: "Beweislast",
        reqStory: "cat_eat", 
        text: "Du läufst dem Chef in die Arme. Er starrt auf den riesigen Fettfleck auf deinem Hemd und die Krümel im Mundwinkel. 'Müller? Haben Sie etwa vom Vorstandsbuffet gegessen?'",
        opts: [
            { 
                t: "Offensive: 'Das muss weg, wird ja schlecht!'", 
                m: 5, f: 0, a: 5, c: 20,
                r: "'Das ist 50€-Lachs, Müller! Das ist kein Hundefutter!' Er ist stinksauer über deine Respektlosigkeit. Das gibt eine Abmahnung wegen Mundraub." 
            },
            { 
                t: "Dumm stellen: 'Habe mein Pausenbrot gegessen.'", 
                m: 2, f: 5, a: 0, c: 0,
                r: "Du zeigst auf den Fleck. 'Leberwurst, Chef. Ganz übel.' Er rümpft die Nase und geht auf Abstand. 'Waschen Sie sich. Sie riechen nach Fisch.' Du bist entkommen." 
            },
            { 
                t: "Schockstarre (Nichts sagen)", 
                m: 5, f: 0, a: 10, c: 5, 
                r: "Du starrst ihn nur mit vollen Backen an wie ein Hamster. Er schüttelt den Kopf. 'Erbärmlich.' Er geht weiter. Dein Stolz ist verletzt, aber der Job ist sicher." 
            }
        ]
    },
    {
        id: "cof_catering_gossip",
        title: "Ein 'kleiner' Gefallen",
        reqStory: "cat_gossip", 
        text: "Sabine blockiert den Weg. 'Ich verrate dich nicht wegen dem Kaffee... aber mein Drucker macht so komische Geräusche. Kannst du mal *ganz kurz* gucken? Bitte!'",
        opts: [
            { 
                t: "Nett sein: 'Klar, zeig mal her.'", 
                m: 45, f: -10, a: 25, c: 0,
                r: "Klassischer Fehler. Es war nicht der Drucker, es war der Treiber. Und das Netzwerk. Und ihr Handy. Du bist 45 Minuten gefangen. Sabine erzählt dir dabei ihre ganze Lebensgeschichte. Du hasst dich selbst." 
            },
            { 
                t: "Ablenken: 'Oh Gott! Ist das eine Spinne?!'", 
                m: 2, f: 5, a: -5, c: 0,
                r: "Du zeigst panisch hinter sie. Sabine kreischt und springt zur Seite. Du nutzt das Chaos und rennst weg. Nicht elegant, aber effektiv." 
            },
            { 
                t: "Eiskalt: 'Mach ein Ticket auf.'", 
                m: 2, f: 0, a: 5, c: 10,
                r: "Sabines Lächeln gefriert. 'Alles klar. Dann mach ich wohl eine Meldung über Kaffeediebstahl.' Sie tippt auf ihrem Handy. Das könnte noch Ärger geben." 
            }
        ]
    },
    {
        id: "cof_bulletin_board",
        title: "Warten auf das schwarze Gold",
        text: "Der Ladebalken der Maschine klebt seit einer gefühlten Ewigkeit bei 99%. Ein einzelner Tropfen fällt in Zeitlupe. Die Spannung ist kaum auszuhalten.",
        opts: [
            { 
                t: "Die Zeit mit Kevin totschlagen",
                m: 10, f: 10, a: -10, c: 5, 
                r: "Kevin textet dich mit seinem 'Gaming-Teppich' zu. Es ist furchtbar, aber immerhin hältst du am Ende einen frischen, heißen Kaffee in der Hand." 
            },
            { 
                t: "Ungeduldig wippen & zurückrennen", 
                m: 1, f: -5, a: 2, c: 0, 
                r: "Du hältst es nicht mehr aus und reißt den Becher weg. Ein heißer Tropfen landet auf deinem Hemd, aber du bist sofort wieder am Platz." 
            },
            { 
                t: "Das 'Schwarze Brett' studieren", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "CMD:OPEN_BOARD"
            }
        ]
    },
    ],

// === SIDE QUESTS ===
    sidequests: [
        // --- TEXT QUESTS ---
        {
            id: "sq_toilet",
            kind: "text",
            title: "Mission: Porzellan",
            text: "Deine Blase meldet 'Füllstand: 110%'. Du hast es eilig. Doch zwischen dir und der erlösenden Keramik steht der Marketing-Leiter. Er scannt den Flur wie ein Raubtier auf der Suche nach einem Opfer für ein 'spontanes Brainstorming'. Es gibt kein Entkommen.",
            opts: [
                { 
                    t: "Hechtsprung in die Putzkammer", 
                    m: 10, f: 10, a: 0, c: 5, 
                    r: "Du wirfst dich zwischen Wischmopps und Eimer. Du hörst Schritte... sie gehen vorbei. Puh. Du riechst jetzt zwar penetrant nach Zitronen-WC-Reiniger, aber du bist entkommen." 
                },
                { 
                    t: "Blickkontakt herstellen", 
                    m: 60, f: -20, a: 30, c: -5, 
                    r: "Anfängerfehler! Er hakt dich sofort unter: 'Ah, Müller! Perfekt! Wir brauchen Ihren Input zu Pastellfarben!' Du sitzt 60 Minuten im Meeting, während deine Blase kurz vorm Platzen ist. Hölle auf Erden." 
                },
                { 
                    t: "Handy ans Ohr & schreien: 'FIREWALL BRENNT?!'", 
                    m: 5, f: 5, a: -5, c: 0, 
                    r: "Der Marketing-Leiter springt erschrocken zur Seite, um nicht 'verbrannt' zu werden. Du rennst an ihm vorbei direkt in die Kabine. Notlügen sind Notwehr." 
                }
            ]
        },
        {
            id: "sq_cake",
            kind: "text",
            title: "Der Kuchen-Krieg",
            text: "Ein unbekannter Held hat Geburtstagskuchen spendiert. Mächtige Schoko-Sahne-Torte! Doch Chantal aus dem Marketing blockiert den Zugang und hält einen Monolog über ihre neue 'Low-Carb-High-Sadness'-Diät. Im Hintergrund lauern schon hungrige Kollegen.",
            opts: [
                { 
                    t: "Ninja-Move: Kuchen schnappen & flüchten", 
                    m: 5, f: 5, a: -5, c: 0, 
                    r: "Zack! Während Chantal Luft holt, greifst du dir ein Stück und verschwindest. Sie wirft dir einen verachtenden Blick zu ('Gluten ist Gift!'), aber der Zucker-Rush ist es wert." 
                },
                { 
                    t: "Höflich warten & zuhören", 
                    m: 30, f: -5, a: 20, c: 0, 
                    r: "Schwerer Fehler. Während Chantal über Kalorien referiert, fallen die 'Heuschrecken' aus dem Vertrieb über das Blech her. Als sie fertig ist, sind nur noch Krümel da. Du bleibst hungrig und genervt." 
                },
                { 
                    t: "Dominanz zeigen: Das allerletzte Stück essen", 
                    m: 5, f: 10, a: 5, c: 15, 
                    r: "Du schiebst dir das letzte Stück genüsslich in den Mund. Genau in dem Moment stürmt der Chef rein, die Hand schon gierig ausgestreckt. Er greift ins Leere. Er starrt auf deine schokolierten Lippen, sein Gesicht läuft dunkelrot an. Er sagt kein Wort, aber sein Blick ist ein Todesurteil." 
                }
            ]
        },
        {
            id: "sq_fire",
            kind: "text",
            title: "Alarmstufe Popcorn",
            text: "WUUUP! WUUUP! Die Sirene brüllt los. Hektik bricht aus. Es riecht allerdings nicht nach Inferno, sondern eindeutig nach verbranntem 'Salty Caramel'-Popcorn aus der Mikrowelle im 2. Stock. Die Kollegen rennen panisch zum Sammelplatz.",
            opts: [
                { 
                    t: "Noise-Cancelling an & sitzenbleiben", 
                    m: 5, f: 20, a: -5, c: 10, 
                    r: "Du drehst die Musik lauter und ignorierst den Lärm. Zehn Minuten später kommt die Entwarnung: Kevin hat die Wattzahl mit der Minutenanzahl verwechselt. Du sitzt warm und trocken." 
                },
                { 
                    t: "Pflichtbewusst evakuieren", 
                    m: 45, f: -10, a: 10, c: -5, 
                    r: "Du stehst 45 Minuten bei Nieselregen auf dem Parkplatz. Der Marketing-Chef friert im T-Shirt, du frierst aus Solidarität. Morgen hast du Schnupfen, aber das Gewissen ist rein." 
                },
                { 
                    t: "Die Gunst der Stunde nutzen: Plündern", 
                    m: 10, f: 15, a: -10, c: 5, 
                    r: "Während alle zu den Notausgängen stürmen, schleichst du in den verlassenen Konferenzraum der Geschäftsleitung. Du klaust die 'Guten Kekse' (die mit Schokolade) und verschwindest ungesehen. Chaos ist eine Leiter." 
                }
            ]
        },
        {
            id: "sq_usb",
            kind: "text",
            title: "Fundsache",
            text: "Auf dem Flur liegt ein USB-Stick mit der Aufschrift 'GEHEIM'.",
            opts: [
                { 
                    t: "Sofort einstecken",
                    loot: "usb_stick", 
                    m: 5, f: 0, a: 0, c: 5, 
                    r: "Du schaust dich kurz um und lässt den Stick in deiner Tasche verschwinden. Jetzt gehört er dir." 
                },
                { 
                    t: "Am Empfang abgeben", 
                    m: 10, f: -5, a: 0, c: -5, 
                    r: "Du bist ein braver Mitarbeiter. Gabi bedankt sich. Dein Gewissen ist rein, aber dein Inventar bleibt leer." 
                }
            ]
        },
        {
        id: "sq_printer_1",
        kind: "text",
        title: "PC LOAD LETTER",
        text: "Der Drucker blinkt rot. Das Display zeigt: 'INSERT COIN'. Er macht dieses Geräusch: 'Whirrr-Click-Whirrr'. Die Warteschlange ist voll.",
        opts: [
            { 
                t: "Percussive Maintenance (Draufhauen)", 
                m: 5, f: 0, a: -20, c: 10, 
                r: "BÄM! Ein Plastikteil fliegt ab. Das Geräusch hört auf. Der Drucker raucht leicht. Problem 'gelöst'.",
                next: "sq_printer_2_broken" 
            },
            { 
                t: "Handbuch konsultieren (S. 404)", 
                req: "manual", 
                m: 15, f: -5, a: 0, c: 0, 
                loot: "secret_list",
                r: "Du liest das Kapitel 'Geheime Wartungsmenüs'. Du drückst den Konami-Code. Der Drucker spuckt plötzlich ein Dokument aus, das nicht für dich bestimmt war.",
                next: "sq_printer_2_secret"
            },
            { 
                t: "Papier nachfüllen (Langweilig)", 
                m: 10, f: 5, a: 10, c: 0, 
                r: "Du füllst Papier nach. Er druckt 500 Seiten 'Agile Meeting Protokolle'. Dein Lebenswille sinkt." 
            }
        ]
    },
    {
        id: "sq_printer_2",
        kind: "text",
        reqStory: "sq_printer_2_broken",
        title: "Rache der Maschine",
        text: "Der Drucker, den du gestern verprügelt hast, wurde durch ein 'Smart Device' ersetzt. Es verlangt jetzt einen QR-Code-Scan und deine Blutgruppe, um zu drucken.",
        opts: [
            { t: "Akzeptieren", m: 5, f: 0, a: 15, c: 0, r: "Du scannst. Du bist jetzt im System. Für immer." },
            { t: "IT-Support rufen (Dich selbst)", m: 10, f: 10, a: -5, c: 0, r: "Du klebst ein 'DEFEKT'-Schild daran. Feierabend." }
        ]
    },
        {
            id: "sq_investigation",
            kind: "text",
            title: "Die verschwundene Maus",
            text: "Frau Erna vom Empfang vermisst ihre 'Glücksmaus'. Sie ist weg. Der Hauptverdächtige ist der Büro-Hund 'Bello'.",
            opts: [
                { t: "Detektiv spielen", m: 30, f: -10, a: 10, c: -10, r: "Du findest die Maus in Bellos Körbchen. Sie ist vollgesabbert. Erna ist überglücklich und schenkt dir Schokolade." },
                { t: "Neue Maus aus dem Lager holen", m: 5, f: -5, a: 0, c: 0, r: "Problem gelöst, aber Erna ist traurig. 'Es ist nicht dasselbe!'" },
                { t: "Bello verhören", m: 15, f: 10, a: -10, c: 10, r: "Du bellst den Hund an. Der Chef kommt vorbei: 'Alles okay bei Ihnen?'" }
            ]
        },
        {
            id: "sq_loose_cable",
            kind: "text",
            title: "Die Stolperfalle",
            text: "Im Flur liegt ein LAN-Kabel quer über dem Weg. Der Chef kommt gleich hier lang.",
            opts: [
                { t: "Festkleben", req: "tape", m: 5, f: -5, a: 0, c: -5, r: "Gefahr gebannt. Chef stolpert nicht. Du bist der unsichtbare Held." },
                { t: "Kabel mitnehmen", loot: "cable", m: 5, f: 5, a: 0, c: 10, r: "Du nimmst das Kabel einfach mit. Jetzt stolpert keiner, aber jemand hat kein Netz mehr. Inventar +1." },
                { t: "Liegen lassen", m: 0, f: 10, a: 0, c: 0, r: "Mal sehen, was passiert..." }
            ]
        },
        {
            id: "sq_package_open",
            kind: "text",
            title: "Die Festung aus Pappe",
            text: "Ein Paket für die IT liegt auf deinem Tisch. Der Absender war offensichtlich paranoid und hat eine komplette Rolle Panzertape verbraucht. Es gibt keine Lasche, keinen Anfang, nur glatte, braune Unendlichkeit.",
            opts: [
                { 
                    t: "Chirurgischer Eingriff mit dem Schraubendreher", 
                    req: "screw", 
                    m: 5, f: 0, a: -5, c: 0, 
                    r: "Mit der Präzision eines Serienmörders stichst du durch die Schichten. Ratsch. Offen. Inhalt: 50 billige Werbe-Mauspads, die stark nach Chemieunfall riechen." 
                },
                { 
                    t: "Brutale Gewalt mit dem Haustürschlüssel", 
                    m: 10, f: 0, a: 5, c: 0, 
                    r: "Du säbelst wild am Klebeband herum, bis der Karton nachgibt. Dein Schlüssel ist jetzt leicht verbogen, aber das Paket ist offen. Drinnen: Toner." 
                },
                { 
                    t: "Den Karton mit voller Wucht gegen die Wand pfeffern", 
                    m: 5, f: 5, a: -15, c: 10, 
                    r: "KRACH! Das Paket platzt auf wie eine reife Melone. Leider war es die Lieferung der neuen 'Magic Glass Trackpads' für das Management. Das Geräusch von splitterndem Glas ist irgendwie... befriedigend." 
                }
            ]
        },
        {
            id: "sq_shelf",
            kind: "text",
            title: "Der schiefe Turm von Toner",
            text: "Im Lager neigt sich das Schwerlastregal mit den teuren Lasertonern bedrohlich zur Seite. Ein falscher Windhauch, und es gibt eine 5.000-Euro-Explosion aus feinem, schwarzem Staub, die man nie wieder aus dem Teppich kriegt.",
            opts: [
                { 
                    t: "Quick-Fix: Kabelbinder-Orgie", 
                    req: "zip_ties", 
                    m: 10, f: -5, a: 0, c: 0, 
                    r: "Du zurrst das Regal mit einem Dutzend Kabelbindern an ein Heizungsrohr. Es sieht aus wie Bondage für Möbel, aber es steht bombenfest. Wie wir alle wissen: Nichts hält länger als ein Provisorium." 
                },
                { 
                    t: "Handwerklich korrekt dübeln", 
                    m: 60, f: -20, a: 15, c: -5, 
                    r: "Du holst die Schlagbohrmaschine. 60 Minuten Lärm, Staub und Schweiß. Das Regal steht jetzt perfekt im Lot. Keiner bemerkt es, keiner dankt es dir, aber du hast Rückenschmerzen." 
                },
                { 
                    t: "Haftungsausschluss: Warnzettel kleben", 
                    m: 5, f: 5, a: 0, c: 0, 
                    r: "Du kritzelst 'VORSICHT! EINSTURZGEFAHR!' auf ein Post-It, pappst es an den Holm und gehst zufrieden Mittagessen. Juristisch bist du damit aus dem Schneider." 
                }
            ]
        },
        {
            id: "sq_noise",
            kind: "text",
            title: "Baustellenlärm",
            text: "Draußen wird die Straße aufgerissen. Presslufthammer. BRRRRRRRT.",
            opts: [
                { t: "Kopfhörer auf", req: "headphones", m: 0, f: 5, a: -20, c: 0, r: "Himmlische Ruhe." },
                { t: "Fenster zu", m: 5, f: 0, a: 5, c: 0, r: "Hilft kaum. Es wird stickig." }
            ]
        },
        {
            id: "sq_loot_crate",
            kind: "text",
            title: "Die 'Zu Verschenken' Kiste",
            text: "Jemand hat eine Kiste mit der Aufschrift 'ZU VERSCHENKEN' in den Flur gestellt. Ein Biotop aus Staub, alten Kabeln und vergessenen Bürotäumen.",
            opts: [
                { 
                    t: "Das schwere 'Buch' bergen", 
                    loot: "manual", 
                    m: 10, f: 5, a: 0, c: 0, 
                    r: "Du ziehst es aus dem Stapel. Es ist... ein 'Windows 95 Handbuch'! Antikes Wissen für echte Kenner. Inventar +1." 
                },
                { 
                    t: "Mutig in den Kabelsalat greifen", 
                    loot: "cable", 
                    m: 10, f: 5, a: 0, c: 0, 
                    r: "Du kämpfst mit dem Knoten und gewinnst! Ein langes, graues LAN-Kabel gehört jetzt dir. Inventar +1." 
                },
                { 
                    t: "Blind nach dem roten 'Ding' ganz unten wühlen",
                    loot: "stressball", 
                    m: 10, f: 5, a: 0, c: 0, 
                    r: "Igit... was ist das? Ach, nur ein alter Wut-Ball! Er ist etwas klebrig, aber drückbar. Inventar +1." 
                },
                { 
                    t: "Das silberne Glitzern untersuchen", 
                    loot: "tape", 
                    m: 10, f: 5, a: 0, c: 0, 
                    r: "Der heilige Gral der Reparatur! Eine fast volle Rolle Panzertape. Damit kannst du das Universum (oder Drucker) flicken. Inventar +1." 
                }
            ]
        },
        {
            id: "sq_chair",
            kind: "text",
            title: "Der Chefsessel",
            text: "Der Chef hat einen neuen Stuhl. Sein alter (sehr bequemer) steht auf dem Flur zum Sperrmüll.",
            opts: [
                { t: "Stuhl retten & reparieren", req: "tape", m: 20, f: 10, a: -20, c: 0, r: "Eine Rolle Tape für die Armlehne und er ist wie neu. Du sitzt jetzt wie ein König. Faulheit steigt (weil so bequem)." },
                { t: "Rollen klauen", req: "screw", m: 10, f: 5, a: 0, c: 0, r: "Du schraubst die guten Rollen ab für deinen Stuhl." },
                { t: "Ignorieren", m: 0, f: 0, a: 0, c: 0, r: "Dein Rücken wird es dir nicht danken." }
            ]
        },
		{
            id: "sq_janitor_talk",
            kind: "text",
            title: "Raucherpause mit Egon",
            text: "Du triffst Hausmeister Egon am Hintereingang. Er kämpft mit seinem Feuerzeug und flucht über 'diese neumodische Technik'.",
            opts: [
                { 
                    t: "Ihm Feuer geben & zuhören", 
                    m: 10, f: 5, a: -5, c: 0, 
                    r: "Er zieht tief an der Zigarette. 'Danke Jung. Diese digitalen Schlösser machen mich fertig! Ich hab das vom Papierlager im Keller jetzt einfach auf 0-0-0-0 gestellt. Aber sags keinem!'" 
                },
                { 
                    t: "Schnell weitergehen", 
                    m: 2, f: 0, a: 0, c: 0, 
                    r: "Du hast keine Zeit für seine Geschichten. Du nickst nur kurz und gehst." 
                }
            ]
        },
		{
            id: "sq_archive_find",
            kind: "text",
            title: "Im Archiv",
            text: "Du suchst Druckerpapier im Archiv. Dabei fällt dir der Ordner 'Steuererklärung 1990' auf. Er ist ungewöhnlich dick. Du guckst rein: Er ist voller 'Mon Chéri' Pralinen. Das Geheimversteck von Sekretärin Gabi!",
            opts: [
                { 
                    t: "Eine stibitzen & Klappe halten", 
                    loot: "donut",
                    m: 2, f: 5, a: 0, c: 0, 
                    r: "Schmeckt nach altem Alkohol. Aber du weißt jetzt, wo der Vorrat liegt." 
                },
                { 
                    t: "Ordner zurückstellen", 
                    m: 2, f: 0, a: -5, c: 0, 
                    r: "Du lässt Gabi ihren Schatz. Diskretion ist Ehrensache." 
                }
            ]
        },
        {
            id: "sq_sad_manager",
            kind: "text",
            title: "Der Zusammenbruch",
            text: "Im Flur steht der Projektleiter. Er starrt gegen die Wand und wirkt völlig apathisch. Er reagiert nicht, als du vorbeigehst.",
            opts: [
                { 
                    t: "Schulter klopfen: 'Kopf hoch!'", 
                    m: 5, f: 0, a: 5, c: 0, 
                    r: "Er zuckt zusammen. 'Lassen Sie mich einfach in Ruhe.' Leere Phrase, keine Wirkung." 
                },
                { 
                    t: "Flüstern: 'Ein Schritt vor, zwei zurück...'",
                    m: 5, f: 5, a: -10, c: 0, 
                    r: "Seine Augen leuchten kurz auf. Er richtet sich auf, nimmt Haltung an. 'Tango... ja. Die Leidenschaft. Sie haben Recht. Ich muss heute Abend wieder zum Kurs.' Er nickt dir dankbar zu." 
                },
                { 
                    t: "Brüllen: 'TSCHAKKA! MINDSET!'",
                    m: 5, f: 0, a: 15, c: 10, 
                    r: "Er dreht sich langsam um und funkelt dich böse an. 'Gehen Sie weg. Bevor ich etwas tue, was das HR nicht erlaubt.' Das war wohl zu viel." 
                }
            ]
        },
		{
            id: "sq_toner_trap",
            kind: "text",
            title: "Die Toner-Falle",
            text: "Frau Elster aus der Buchhaltung winkt dich hektisch zum Kopierer. 'Da klemmt was! Ich trau mich nicht ran, Sie sind doch der Technik-Profi!' Sie tritt auffällig weit zurück.",
            opts: [
                { 
                    t: "Klappe öffnen & nachsehen", 
                    m: 25, f: -15, a: 50, c: 10, 
                    r: "BAAAAAM! Eine manipulierte Toner-Kartusche explodiert dir ins Gesicht. Du siehst aus wie ein Schlumpf. Frau Elster ruft sofort: 'Iiiiih! Herr Müller hat den Kopierer gesprengt! Gut dass ich nichts angefasst habe!' Sie petzt beim Facility Management." 
                },
                { 
                    t: "Riechen Lunte: 'Mach selbst'", 
                    m: 2, f: 5, a: -5, c: 0, 
                    r: "Du gehst weiter. Hinter dir hörst du ein lautes 'PUFF' und Schreie. Tja. Intuition ist alles." 
                }
            ]
        },
		{
            id: "sq_fresh_air",
            kind: "text",
            title: "Dicke Luft",
            text: "Im Meetingraum 'Aquarium' stinkt es bestialisch nach Mettbrötchen und Angstschweiß. Jemand hat das Fenster zugelassen. Dir wird fast übel im Vorbeigehen.",
            opts: [
                { 
                    t: "Fenster kippen (Lüften)", 
                    m: 5, f: -5, a: 20, c: 5, 
                    r: "Frische Luft strömt rein! Und mit ihr eine Wespe. Sie sticht den Vertriebsleiter mitten in die Lippe. Das Meeting wird abgebrochen. Er nuschelt wütend: 'Wer 'at 'as Venster aufg'macht?! MÜLLER?!'" 
                },
                { 
                    t: "Luft anhalten & weiter", 
                    m: 2, f: 0, a: 0, c: 0, 
                    r: "Sollen sie doch ersticken. Nicht dein Problem." 
                }
            ]
        },
		{
            id: "sq_package_help",
            title: "Die schwere Kiste",
            text: "Die neue Praktikantin bricht fast unter einem riesigen Paket zusammen. 'Puh... das muss zum Marketing in den 4. Stock... können Sie...?' Sie zittert schon.",
            opts: [
                { 
                    t: "Helfen & Tragen", 
                    m: 15, f: -10, a: 30, c: 5, 
                    r: "Du schleppst die Kiste schwitzend in den 4. Stock. Chantal vom Marketing sieht dich: 'WAS SOLL DAS HIER?! Das habe ich storniert! Nimm das sofort wieder mit, du Idiot!' Die Praktikantin ist nirgends zu sehen. Du stehst als Depp da." 
                },
                { 
                    t: "Anfeuern: 'Tschakka!'", 
                    m: 2, f: 5, a: -5, c: 0, 
                    r: "Du motivierst sie verbal. Sie schaut dich hasserfüllt an, schleppt sich aber weiter. Dein Rücken bleibt heil." 
                }
            ]
        },
        {
            id: "sq_alarm_fail",
            kind: "text",
            title: "Der rote Knopf",
            text: "Du lehnst dich im Flur an die Wand. Plötzlich: SCHRILL! Du hast den Feueralarm ausgelöst! Der Hausmeister rennt wütend herbei.",
            opts: [
                { 
                    t: "Entschuldigen & Wegrennen", 
                    m: 5, f: 0, a: 10, c: 20, 
                    r: "Du rennst weg. Der Hausmeister brüllt dir nach: 'IDIOT! Jedes Mal muss ich **4-7-1-1** eingeben wegen solchen Deppen!' Du hast Ärger, aber den Code gehört." 
                },
                { 
                    t: "So tun als wäre es ein Test",
                    m: 2, f: 5, a: 0, c: 0, 
                    r: "Er glaubt dir nicht. 'Verschwinde!' Er dreht dir demonstrativ den Rücken zu, schirmt das Tastenfeld mit seinem breiten Kreuz ab und bringt die Sirene zum Schweigen." 
                }
            ]
        },
        {
            id: "sq_elster_blockade",
            title: "Der Drache bewacht den Hort",
            text: "Frau Elster sitzt auf dem Aktenordner, den du brauchst. 'Den gebe ich nicht raus! Nur über meine Leiche!' Sie sieht hungrig aus und starrt auf deine Snacks.",
            opts: [
                { 
                    t: "Einen 'Erdnuss-Power' Riegel anbieten",
                    m: 5, f: -10, a: 50, c: 100, 
                    r: "Sie beißt rein. 'Oh Gott... mein Hals...' Sie läuft blau an. Der Notarzt muss kommen. Du hast den Ordner, aber fast jemanden umgebracht. Anzeige droht!" 
                },
                { 
                    t: "Eine Tafel Alpenmilch-Schokolade anbieten",
                    m: 10, f: 5, a: -10, c: 0, 
                    r: "Sie prüft die Packung. 'Oh, ohne Nüsse? Sehr aufmerksam!' Sie lächelt und gibt dir den Ordner. 'Sie merken sich ja Dinge!'" 
                },
                { 
                    t: "Einfach wegnehmen",
                    m: 5, f: 0, a: 20, c: 20, 
                    r: "Ein Handgemenge. Sie kratzt dich. Du hast den Ordner, aber blutige Hände." 
                },
                { 
                    t: "Später wiederkommen",
                    m: 30, f: 0, a: 0, c: 0, 
                    r: "Du wartest, bis sie Feierabend macht. Kostet Zeit." 
                }
            ]
        },
		{
            id: "sq_secret_meeting",
            kind: "text",
            title: "Der Kopierraum",
            text: "Du öffnest die Tür zum Kopierraum. Da stehen der Finanzchef und die Kantinen-Chefin... sehr eng umschlungen. Sie springen auseinander. Der Finanzchef wischt sich Lippenstift ab.",
            opts: [
                { 
                    t: "Tür wortlos schließen", 
                    m: 5, f: 5, a: -5, c: 0, 
                    r: "Du gehst. Du hast nichts gesehen. Aber du WEISST es. Ein mächtiges Druckmittel." 
                },
                { 
                    t: "Fragen: 'Druckt ihr auch?'", 
                    m: 5, f: 0, a: 20, c: 20, 
                    r: "Finanzchef: 'RAUS HIER! Wenn Sie ein Wort sagen, sind Sie gefeuert!' Ups." 
                }
            ]
        },
        {
            id: "sq_manual_read",
            kind: "text",
            title: "Die digitale Apokalypse",
            text: "Stille. Tödliche Stille. Spotify stoppt. Ladebalken frieren ein. Das Internet ist tot. Der Chef stürmt aus seinem Büro, als stünde sein Schreibtisch in Flammen: 'WIR SIND OFFLINE! TUN SIE WAS! WIR VERLIEREN MILLIARDEN... PRO SEKUNDE!'",
            opts: [
                { 
                    t: "Das heilige Handbuch konsultieren", 
                    req: "manual", 
                    m: 15, f: -20, a: -5, c: -20, 
                    r: "Du blätterst hektisch durch die verstaubten Seiten. Seite 404: Notfall-Reset. Du führst den Code aus. *Blink*. *Blink*. *Grün*. Das Internet ist zurück. Der Chef wischt sich Schweiß von der Stirn: 'Gute Arbeit, Müller. Sie sind jeden Cent wert.'" 
                },
                { 
                    t: "Demonstrativ Candy Crush zocken", 
                    m: 30, f: 20, a: 0, c: 50, 
                    r: "Du lehnst dich entspannt zurück, legst die Füße hoch und startest eine Runde auf dem Handy. *Dudel-Dudel*. Die Firma brennt, aber du knackst den Highscore. Der Chef starrt fassungslos auf dein Display. Seine Halsschlagader beginnt gefährlich zu pochen." 
                },
                { 
                    t: "Matrix-Modus: Wildes Tippen vortäuschen", 
                    m: 10, f: -5, a: 10, c: -5, 
                    r: "Du öffnest vier Terminals gleichzeitig und lässt 'ping google.com' in grün auf schwarz laufen. Dazu hämmerst du sinnlos auf die Tasten. Der Chef nickt ehrfürchtig: 'Er kämpft gegen den Virus! Lassen wir ihn arbeiten!'" 
                }
            ]
        },
        {
            id: "sq_lost_stick",
            kind: "text",
            title: "Der verbotene Datenträger",
            text: "Auf dem Spülkasten der Toilette liegt einsam ein USB-Stick. Mit dickem, roten Edding steht darauf geschrieben: 'STRENG PRIVAT! NICHT ANFASSEN!'. Es ist der klassische Köder. Deine Admin-Finger kribbeln.",
            opts: [
                { 
                    t: "Todsünde begehen: Am PC anschließen", 
                    loot: "usb_stick", 
                    m: 10, f: 5, a: 0, c: 20, 
                    r: "Die Neugier ist stärker als der Verstand. Du steckst ihn ein. Ein Ordner öffnet sich: 'Hacking-Tools'. Jackpot! Du steckst ihn schnell ein. Doch unten rechts poppt eine rote Meldung auf: 'Security-Alert: Unautorisiertes Gerät an Port 3'. Ups. Du wirst beobachtet." 
                },
                { 
                    t: "Paranoid werden: Im Klo runterspülen", 
                    m: 5, f: 0, a: 5, c: 0, 
                    r: "Du nimmst den Stick mit zwei Fingern, wirfst ihn in die Schüssel und betätigst die Spülung. *Gurgel... Schlürf... Weg.* Keine Forensik der Welt holt den wieder zurück. Problem gelöst." 
                },
                { 
                    t: "Den braven Mitarbeiter spielen & abgeben", 
                    m: 10, f: -5, a: 0, c: -5, 
                    r: "Du bringst das Ding zum Empfang. Gabi quietscht vor Freude: 'Oh Gott, meine Urlaubsfotos aus Bottrop-Kirchhellen! Danke!' Du hast zwar keine Hacking-Tools, aber gutes Karma." 
                }
            ]
        },
        {
            id: "sq_headphone_zone",
            kind: "text",
            title: "Die Presslufthammer-Symphonie",
            text: "Direkt vor dem Fenster wird der Asphalt aufgerissen. *RATATATA!* Der Lärm ist körperlich spürbar. Dein Kaffee schlägt Wellen wie das Wasserglas in Jurassic Park. An Arbeit ist nicht zu denken.",
            opts: [
                { 
                    t: "Rettung durch Technik: Kopfhörer auf", 
                    req: "headphones", 
                    m: 0, f: 10, a: -20, c: 0, 
                    r: "Klick. Active Noise Cancelling an. Die Welt verstummt. Du siehst draußen nur noch stumme Gestalten, die den Boden vibrieren lassen, aber du hörst nur sanftes Meeresrauschen. Himmlisch." 
                },
                { 
                    t: "Fenster aufreißen & Bauarbeiter anbrüllen", 
                    m: 5, f: 0, a: 20, c: 10, 
                    r: "Du schreist mit hochrotem Kopf: 'RUHE DA UNTEN! WIR ARBEITEN HIER!'. Der Vorarbeiter schaut kurz hoch, grinst breit, zeigt dir den Daumen und bohrt extra laut weiter. Du bist jetzt heiser." 
                },
                { 
                    t: "Arbeitsschutz geltend machen & Pause machen", 
                    m: 10, f: -10, a: 0, c: 5, 
                    r: "Du erklärst lautstark: 'Das überschreitet den zulässigen Dezibel-Grenzwert nach DIN 15905!' Unter diesem Vorwand verziehst du dich für zwei Stunden in die weit entfernte (und ruhige) Lobby und liest Nachrichten." 
                }
            ]
        },
        {
            id: "sq_cable_hunt",
            kind: "text",
            title: "Panik am Papierfach",
            text: "Alarmstufe Rot! Der CEO steht mit hochrotem Kopf vor dem Abteilungsdrucker. 'Ich muss diesen Fusions-Vertrag JETZT unterschreiben! Warum druckt das Ding nicht?!' Deine Diagnose: Das USB-Verbindungskabel fehlt. Einfach weg.",
            opts: [
                { 
                    t: "Skrupellos: Kabel bei Azubi Kevin klauen", 
                    m: 10, f: 0, a: -10, c: -10, 
                    r: "Du schleichst zu Kevins Platz und ziehst das Kabel aus seinem Scanner. Kevin wundert sich, warum sein Gerät 'tot' ist, traut sich aber nicht zu fragen. Der CEO bekommt seinen Ausdruck." 
                },
                { 
                    t: "Achselzucken: 'Tja, Hardware-Defekt'", 
                    m: 5, f: -5, a: 10, c: 20, 
                    r: "Du meldest: 'Kritisches Fehlen von Infrastruktur.' Der CEO starrt dich fassungslos an. 'WOFÜR BEZAHLE ICH SIE EIGENTLICH?!' Er muss den Vertrag auf einer Serviette unterschreiben. Sein Blick tötet." 
                },
                { 
                    t: "Verzweiflungstat: WLAN-Hotspot improvisieren", 
                    m: 5, f: -5, a: 5, c: 10, 
                    r: "Du versuchst wildes Tethering mit dem Handy. Es klappt! ...fast. Der Drucker spuckt den Vertrag aus, aber leider auf dem Etikettendrucker in der Logistik. In Briefmarkengröße. Der Wille war da." 
                }
            ]
        },
        {
            id: "sq_fire_drill",
            kind: "text",
            title: "Feuerübung",
            text: "ALARM! Alle müssen raus. Es ist nur eine Übung, aber der Chef guckt zu.",
            opts: [
                { 
                    t: "Feuerlöscher schnappen & posen", 
                    req: "fire_ext", 
                    m: 20, f: 10, a: -10, c: -20, 
                    r: "Du läufst heldenhaft mit dem Löscher rum. Der Chef nickt: 'Vorbildlich, Müller!'. Radar sinkt massiv." 
                },
                { 
                    t: "Langsam rausgehen", 
                    m: 30, f: 20, a: 0, c: 0, 
                    r: "30 Minuten bezahlte Pause in der Sonne. Du stehst rum." 
                },
                { 
                    t: "Verstecken & weiterarbeiten", 
                    m: 10, f: -20, a: 5, c: 30, 
                    r: "Der Sicherheitsbeauftragte findet dich. 'MÜLLER! IM ERNSTFALL WÄREN SIE TOT!' Das wird gemeldet." 
                },
                { 
                    t: "Panik vortäuschen", 
                    m: 15, f: 5, a: 10, c: 0, 
                    r: "Du rennst schreiend im Kreis. Die Kollegen lachen." 
                }
            ]
        },
        {
            id: "sq_perfect_script",
            kind: "text",
            title: "Das Meisterwerk",
            text: "Du hast ein Python-Skript geschrieben, das die komplette Datenbank-Wartung automatisiert. Es ist elegant, fehlerfrei und spart der Firma Tausende Euro. Der Balken läuft. Du lehnst dich entspannt zurück und verschränkst die Arme, um dein Werk zu bewundern.",
            opts: [
                { 
                    t: "Den Moment genießen (Zuschauen)", 
                    m: 10, f: 10, a: -10, c: 25, 
                    r: "Der Chef kommt rein. Er sieht dich entspannt im Stuhl liegen, die Hände nicht an der Tastatur. 'Müller! Wir bezahlen Sie nicht fürs Fernsehen gucken! Tippen Sie gefälligst was!' Er knallt die Tür zu." 
                },
                { 
                    t: "So tun, als ob man tippt", 
                    m: 10, f: -5, a: 10, c: 0, 
                    r: "Du hämmerst sinnlos auf die Tastatur, während das Skript läuft. Der Chef nickt zufrieden im Vorbeigehen: 'Ah, fleißig! Weiter so.' Du fühlst dich dumm, aber sicher." 
                },
                { 
                    t: "Erklären: 'Das ist Automation!'", 
                    m: 15, f: 0, a: 5, c: 15, 
                    r: "Du erklärst stolz die Effizienzsteigerung. Der Chef starrt dich leer an. 'Also haben Sie gerade nichts zu tun? Dann putzen Sie mal die Monitore im Meetingraum.' Eigentor." 
                }
            ]
        },
        {
            id: "sq_security_audit",
            kind: "text",
            title: "Der Sicherheits-Check",
            text: "Du führst einen genehmigten Penetration-Test durch, um Sicherheitslücken im Netzwerk zu finden. Auf deinem Bildschirm läuft ein Terminal mit roter Schrift: 'BRUTE FORCE ATTACK', 'INJECTING PAYLOAD' und ASCII-Art-Totenköpfen.",
            opts: [
                { 
                    t: "Professionell weitermachen", 
                    m: 20, f: -10, a: 0, c: 30, 
                    r: "Der Chef schleicht sich von hinten an. Er sieht 'PASSWORD CRACKED' auf deinem Monitor. Er wird bleich, sagt kein Wort und geht rückwärts wieder raus. 5 Minuten später ruft die Rechtsabteilung an." 
                },
                { 
                    t: "Monitor schnell ausschalten", 
                    m: 5, f: 5, a: 10, c: 20, 
                    r: "Zack. Bildschirm schwarz. Der Chef steht in der Tür: 'Was haben Sie zu verbergen, Müller? Pornos? Glücksspiel?' Er notiert sich etwas in seinem kleinen schwarzen Buch." 
                },
                { 
                    t: "Rufen: 'ICH HACKE UNS NUR ZUR PROBE!'", 
                    m: 10, f: 0, a: 5, c: 10, 
                    r: "Der Chef zuckt zusammen. 'Schreien Sie nicht so! Und hören Sie auf, das Internet kaputt zu machen!' Er versteht es nicht, aber zumindest ruft er nicht die Polizei." 
                }
            ]
        },
        {
            id: "sq_gabi_pc",
            title: "Sicherheitslücke",
            text: "Gabi ist in der Pause. Ihr PC ist entsperrt, Outlook ist offen. Ein grober Verstoß gegen Richtlinie 404.",
            opts: [
                { 
                    t: "Gabi suchen & belehren", 
                    m: 10, f: -5, a: 10, c: -5, 
                    r: "Du findest sie in der Küche und zitierst das Handbuch. Sie rollt mit den Augen. Du fühlst dich im Recht, aber unbeliebt." 
                },
                { 
                    t: "Den offenen Kalender checken", 
                    m: 5, f: 5, a: 0, c: 0, 
                    r: "Ein schneller Blick: 'Lieferung Sessel'. Und direkt danach: 'Externes Meeting (Golfplatz) - Open End'. Aha! Das Büro ist also sturmfrei..." 
                },
                { 
                    t: "Computer sperren & weitergehen", 
                    m: 2, f: 0, a: -5, c: 0, 
                    r: "Klick. Der PC ist gesperrt. Du hinterlässt einen Post-it 'Gern geschehen' auf dem Monitor. Ein guter Tag für die IT-Sicherheit." 
                }
            ]
        },
        {
            id: "sq_boss_chair",
            title: "Operation Rückgrat",
            text: "Die Tür zum Chefbüro steht sperrangelweit offen. Dr. Wichtig ist nirgends zu sehen. Mitten im Raum thront die frisch ausgepackte Lieferung: Ein High-End Massagesessel.",
            opts: [
                { 
                    t: "Probeliegen (Shiatsu-Test)", 
                    m: 20, f: 20, a: -40, c: 0, 
                    r: "Oh Gott, ist das gut. Die Rollen kneten deinen Hass einfach weg. Du nickst kurz weg... und schreckst hoch. Sabber im Mundwinkel. Aber das Büro ist immer noch leer. Glück gehabt." 
                },
                { 
                    t: "Kartons filzen", 
                    loot: "bubble_wrap", 
                    m: 10, f: -5, a: 0, c: 0, 
                    r: "Du durchsuchst den Müll nach Brauchbarem. Du findest eine riesige Rolle unbenutzte Luftpolsterfolie! *Plopp* *Plopp*. Perfekt für schlechte Zeiten." 
                },
                { 
                    t: "Tür diskret schließen", 
                    m: 5, f: 0, a: 0, c: -15, 
                    r: "Du ziehst die Tür leise ins Schloss. Niemand soll sehen, dass das Büro leer ist. Deine Diskretion bleibt unbemerkt, aber dein Chef-Radar sinkt." 
                }
            ]
        },
    {
            id: "sq_story_kevin_2",
            kind: "text",
            reqStory: "kevin_student",
            title: "Kevins Code",
            text: "Kevin steht unsicher an deinem Schreibtisch. 'Ich hab da was gebastelt... ein Skript, das die Logs automatisch aufräumt. Kannst du mal drüberschauen? Oder ist das Müll?'",
            opts: [
                { 
                    t: "Abwinken: 'Keine Zeit für Spielkram'", 
                    m: 2, f: 0, a: 0, c: 0, 
                    r: "Kevin lässt die Schultern hängen. 'Okay, war ja nur ne Idee.' Er löscht die Datei." 
                },
                { 
                    t: "Code prüfen & optimieren", 
                    next: "kevin_pro", 
                    m: 20, f: -10, a: 0, c: 0, 
                    r: "Du schaust dir den Code an. Es ist chaotisch, aber... genial. Du zeigst ihm einen Trick für die Schleife. Kevin strahlt: 'Danke, Chef!'" 
                },
                { 
                    t: "Ihn auslachen: 'Lern erst mal Hello World'", 
                    m: 5, f: 0, a: 10, c: 0, 
                    r: "Kevin wird rot und geht. Er programmiert nie wieder." 
                }
            ]
        },
        {
        id: "sq_story_chantal_2",
        kind: "text",
        reqStory: "chantal_war",
        title: "Besuch aus dem Marketing",
        text: "Chantal steht in deinem Büro. 'Du warst ein Idiot in der Küche. Aber du hast keine Angst vor Konflikten. Ich brauche jemanden, der dem Chef sagt, dass seine 'Blockchain-Klobrillen'-Idee Müll ist. Ich trau mich nicht.'",
        opts: [
            { 
                t: "Ablehnen: 'Mach deinen Dreck alleine.'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Sie schnaubt: 'Feigling. Große Klappe, nichts dahinter.' Chance vertan." 
            },
            { 
                t: "Grinsen: 'Mit dem größten Vergnügen.'", 
                next: "chantal_ally", 
                m: 20, f: -10, a: -20, c: 10, 
                r: "Du schreibst eine vernichtende Mail an den Chef. Chantal liest mit und grinst böse. 'Perfekt. Er wird dich hassen, aber die Idee ist tot.'" 
            },
            { 
                t: "Nett sein: 'Wir finden eine Lösung.'", 
                m: 15, f: 0, a: 10, c: 0, 
                r: "Sie verdreht die Augen. 'Langweilig. Vergiss es.' Sie wollte den Vorschlaghammer." 
            }
        ]
    },
    {
        id: "sq_story_chantal_3",
        kind: "text",
        reqStory: "chantal_ally",
        title: "Revanche aus dem Marketing",
        text: "Ein goldenes Päckchen liegt auf deinem Tisch. Notiz: 'Der Chef hat die Klo-Idee beerdigt. Er denkt, es war technisch unmöglich (deine Schuld). Als Dank habe ich dein IT-Budget verdoppelt. Wir sind quitt.'",
        opts: [
            { 
                t: "Geschenk öffnen (Allianz besiegeln)", 
                loot: "golden_stapler",
                m: 5, f: -20, a: -30, c: -40, 
                r: "Es ist ein vergoldeter Tacker. Völlig nutzlos, aber ein Symbol der Macht. Das Marketing deckt dich ab jetzt. Dein Standing in der Firma ist unantastbar." 
            },
            { 
                t: "Dem Chef die Wahrheit sagen", 
                m: 20, f: 0, a: 30, c: 50, 
                r: "Du willst glänzen und meldest dem Chef die Einsparung. Er läuft rot an: 'DAS WAR MEIN LIEBLINGSPROJEKT!' Chantal lässt dich ins Messer laufen." 
            },
            { 
                t: "Zurückgeben: 'Ich bin nicht käuflich'", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Chantal verdreht die Augen. 'Gott, bist du anstrengend.' Die Allianz ist vorbei." 
            }
        ]
    },
    {
        id: "sq_story_elster_2",
        kind: "text",
        reqStory: "elster_cat",
        title: "Vertrauliche Angelegenheit",
        text: "Frau Elster winkt dich in ihr Büro. Sie schließt die Jalousien. 'Das bleibt unter uns. Mein digitaler Bilderrahmen... er zeigt Rüdiger nicht mehr an. Wenn ich Rüdiger nicht sehe, kann ich keine Bilanzen kürzen. Helfen Sie mir.'",
        opts: [
            { 
                t: "Ablehnen: 'Private Hardware ist verboten.'", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Sie wird rot. 'Raus! Und vergessen Sie das Budget für den neuen Server.' Du hast dich an die Regeln gehalten, aber verloren." 
            },
            { 
                t: "Helfen: 'Formatierung gefixt. Da ist er wieder.'", 
                next: "elster_friend", 
                m: 20, f: -5, a: -10, c: 0, 
                r: "Rüdiger erscheint in HD. Frau Elster lächelt (es sieht gruselig aus). 'Er ist so majestätisch. Danke. Ich vergesse das nicht.'" 
            },
            { 
                t: "Lästern: 'Ist der Kater etwas... dick?'", 
                m: 5, f: 0, a: 20, c: 10, 
                r: "Totenstille. 'Rüdiger ist flauschig, nicht dick!' Sie wirft dich raus. Das war ein Fehler." 
            }
        ]
    },
    {
        id: "sq_story_elster_3",
        kind: "text",
        reqStory: "elster_friend",
        title: "Der Rotstift",
        text: "Große Budget-Sitzung. Frau Elster sitzt wie eine Richterin am Tisch. Sie hält ihren roten Stift über der Zeile 'IT-Abteilung'. Sie sieht dich an. Es geht um deine Existenz.",
        opts: [
            { 
                t: "Nach Rüdiger fragen", 
                loot: "cat_pic", 
                m: 5, f: 0, a: -20, c: -30, 
                r: "Du fragst laut: 'Hat Rüdiger die Diät vertragen?' Sie seufzt. 'Ach, er leidet so.' Sie streicht stattdessen das Marketing-Budget. 'Wir brauchen die IT für... wichtige Projekte.' Sie schiebt dir heimlich ein Foto von Rüdiger zu." 
            },
            { 
                t: "Erpressen: 'Ich weiß von dem Bilderrahmen!'", 
                m: 10, f: 0, a: 30, c: 50, 
                r: "Ihr Blick wird tödlich. 'Drohungen? Ich leite sofort ein Compliance-Verfahren gegen Sie ein.' Sie streicht dein Budget UND dein Gehalt. Du hast dich mit der falschen Hexe angelegt." 
            },
            { 
                t: "Flehen: 'Wir brauchen das Geld!'", 
                m: 10, f: 0, a: 10, c: 0, 
                r: "Sie zuckt mit den Schultern. 'Zahlen lügen nicht.' Sie streicht 50%. Tja." 
            }
        ]
    },
    {
        id: "sq_story_egon_2",
        kind: "text",
        reqStory: "egon_buddy",
        title: "Egon und das Tablet",
        text: "Du triffst Egon im Flur. Er hämmert mit seinem wurstigen Zeigefinger auf das neue 'Smart-Heating'-Panel an der Wand ein. 'Drecksteil! Es sind 12 Grad, aber das Ding will erst ein Firmware-Update machen! Ich friere!'",
        opts: [
            { 
                t: "Offiziell: 'Ich plane das Update für heute Nacht.'",
                m: 5, f: 0, a: 10, c: 0,
                r: "Egon stöhnt. 'Heute Nacht?! Bis dahin bin ich erfroren!' Er zieht wütend ab. Du hast nach Vorschrift gehandelt, aber einen Freund verloren."
            },
            { 
                t: "Helfen: 'Gib her, ich umgehe die Sperre.'",
                next: "egon_pro",
                m: 15, f: -5, a: -10, c: 10,
                r: "Du tippst einen Admin-Override ein. Die Heizung springt sofort an. Egon strahlt: 'Du bist ein Zauberer! Scheiß auf die Vorschriften, warm muss es sein!'"
            },
            { 
                t: "Vorschlag: 'Hau mit dem Hammer drauf'",
                m: 5, f: 5, a: -5, c: 0,
                r: "Egon grinst kurz, schüttelt aber den Kopf. 'Zu teuer. Der Chef zieht mir das vom Lohn ab.' Er geht weiter frieren."
            }
        ]
    },
    {
        id: "sq_story_egon_3",
        kind: "text",
        reqStory: "egon_pro",
        title: "Vertrauenssache",
        text: "Egon winkt dich in sein Kämmerchen. Es riecht nach Putzmittel und kaltem Rauch. 'Hör zu. Ich gehe bald in Rente. Du bist der Einzige hier, der kein kompletter Vollidiot ist.' Er hält dir einen schweren, alten Schlüsselbund hin. 'Für Notfälle. Offiziell hast du den nicht.'",
        opts: [
            { 
                t: "Zögern: 'Ist das überhaupt erlaubt?'",
                m: 5, f: 0, a: 5, c: 0,
                r: "Egon zieht die Hand sofort zurück. Sein Blick wird kalt. 'Vergiss es. Du bist doch nur einer von denen.' Er steckt den Schlüssel weg. Vertrauen verspielt."
            },
            { 
                t: "Wortlos einstecken & nicken",
                loot: "master_key",
                m: 5, f: -20, a: -30, c: 0,
                r: "Du nimmst den Bund. Kein Wort, nur ein Blick. Egon klopft dir fest auf die Schulter. Du hast jetzt Zugang zu ALLEM."
            },
            { 
                t: "Ablehnen: 'Zu viel Verantwortung'",
                m: 5, f: 0, a: 0, c: 0,
                r: "Egon zuckt mit den Schultern. 'Wie du willst. Dann kriegt ihn halt der Azubi, wenn er alt genug ist.' Chance vertan."
            }
        ]
    },
    {
        id: "sq_story_gabi_2",
        kind: "text",
        reqStory: "gabi_friend",
        title: "Lärm am Empfang",
        text: "Mittagspause. Der Empfang ist leer, bis auf Gabi. Sie hat große Kopfhörer auf und trommelt mit zwei Kugelschreibern extrem aggressiv und taktsicher auf dem Tresen herum. Sie bemerkt dich nicht.",
        opts: [
            { 
                t: "Husten & 'Störe ich?' fragen", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Sie zuckt zusammen, reißt die Kopfhörer runter und wird rot. 'Äh. Nichts.' Sie rückt ihre Bluse zurecht. Der Moment ist vorbei." 
            },
            { 
                t: "Grinsen & Pommesgabel zeigen", 
                next: "gabi_rocker", 
                m: 10, f: -5, a: -10, c: 0, 
                r: "Sie sieht dich, grinst breit und dreht die Musik lauter, sodass du es hörst. Brutaler Death Metal. 'Wacken 2008?', fragt sie. Ihr nickt euch wissend zu." 
            },
            { 
                t: "Loben: 'Tolles Rhythmusgefühl!'", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Sie lacht verlegen. 'Stressabbau.' Sie legt die Stifte weg und ist wieder die professionelle Empfangsdame." 
            }
        ]
    },
    {
        id: "sq_story_gabi_3",
        kind: "text",
        reqStory: "gabi_rocker",
        title: "Gabi blockt ab",
        text: "Du siehst Dr. Wichtig mit hochrotem Kopf auf dein Büro zustürmen. Er wedelt mit einer Auswertung deiner Internet-Logs. 'Wo ist er?! Ich mache ihn fertig!' Gabi fängt ihn am Flur ab und stellt sich ihm in den Weg.",
        opts: [
            { 
                t: "Rauskommen: 'Hier bin ich!'", 
                m: 10, f: 0, a: 20, c: 40, 
                r: "Du ruinierst ihre Ablenkung. Gabi verdreht die Augen. Der Chef sieht dich. 'Aha! Erklären Sie mir diese Reddit-Logs!' Das wird ein langes Gespräch." 
            },
            { 
                t: "Leise die Tür schließen & warten", 
                loot: "mixtape", 
                m: 5, f: -10, a: -20, c: -50,
                r: "Durch die Tür hörst du Gabi lügen: 'Der ist im Außeneinsatz beim Großkunden! Super wichtig!' Der Chef grummelt und zieht ab. Später findest du ein altes Mixtape auf deinem Platz. 'Für die Ruhe.'" 
            },
            { 
                t: "Lauschen, was sie sagt", 
                m: 5, f: 0, a: 10, c: -10, 
                r: "Sie wimmelt ihn ab, aber du traust dich nicht raus. Der Chef geht, aber du hast Gabis Geste nicht gewürdigt. Sie denkt, du hast es nicht mitbekommen." 
            }
        ]
    },
    {
        id: "sq_story_markus_2",
        kind: "text",
        reqStory: "markus_deal",
        title: "Notfall beim Kunden",
        text: "Dein Handy klingelt. Es ist Markus. Im Hintergrund hörst du japanische Geschäftsleute. 'Müller! Die Demo... äh... laggt. Ich brauche sofort Zugriff auf den Mainframe! Oder bauen Sie mir schnell ein Mockup, das so aussieht, als würde es funktionieren! JETZT!'",
        opts: [
            { 
                t: "Auflegen: 'Nicht mein Problem.'", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du legst auf. Später hörst du im Flurfunk, dass der Deal geplatzt ist. Markus hat Schaum vor dem Mund, wenn er deinen Namen hört." 
            },
            { 
                t: "Den Fake bauen (HTML-Dummy)", 
                next: "markus_win", 
                m: 20, f: -10, a: -10, c: 10, 
                r: "Du baust in 5 Minuten eine Webseite, die nur so *aussieht* wie Software. 'Senden!', schreit Markus. 'Meine Herren, hier ist die Lösung!', hörst du ihn noch triumphierend sagen." 
            },
            { 
                t: "Ehrlich sein: 'Sag ihnen die Wahrheit.'", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Markus flüstert aggressiv: 'Sind Sie wahnsinnig?! Meine Provision!' Er versucht zu improvisieren, scheitert aber." 
            }
        ]
    },
    {
        id: "sq_story_markus_3",
        kind: "text",
        reqStory: "markus_win",
        title: "Provision",
        text: "Markus kommt in dein Büro. Er trägt eine Sonnenbrille (drinnen). 'Müller. Sie haben unterschrieben. 10 Millionen Volumen. Ich kriege einen Bonus, von dem Sie sich ein Haus kaufen könnten.' Er stellt eine schwere Flasche auf den Tisch.",
        opts: [
            { 
                t: "Die Flasche annehmen", 
                loot: "scotch_bottle", 
                m: 5, f: -20, a: -30, c: -20, 
                r: "Es ist ein 30 Jahre alter Single Malt. 'Für die Nerven', zwinkert Markus. 'Wir verstehen uns.' Du bist jetzt Teil des 'Inner Circle'. (Erfolg: The Closer)" 
            },
            { 
                t: "Nach Anteil fragen: 'Ich will 10%.'", 
                m: 10, f: 0, a: 20, c: 10, 
                r: "Markus lacht kalt. 'Übertreiben Sie es nicht, Tippse. Seien Sie froh, dass Sie hier arbeiten dürfen.' Er nimmt die Flasche wieder mit. Gier wird bestraft." 
            },
            { 
                t: "Ablehnen: 'Ich mache nur meinen Job.'", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Markus zuckt mit den Schultern. 'Ihr Verlust. Mehr für mich.' Er geht kopfschüttelnd. Du hast deine Integrität, aber keinen Whisky." 
            }
        ]
    },
    {
        id: "sq_story_ceo_2",
        kind: "text",
        reqStory: "ceo_vision",
        title: "Panik im Chefbüro",
        text: "Der Chef winkt dich hektisch in sein Büro. Jalousien unten. Er schwitzt. 'Müller! Das Internet! Da ist ein Video von mir beim Karaoke... ich singe 'Barbie Girl'. Das ist ein Deepfake! Eine KI-Attacke der Konkurrenz! Löschen Sie das!' (Es sieht extrem echt aus).",
        opts: [
            { 
                t: "Wahrheit: 'Chef, das war die Weihnachtsfeier 2018...'", 
                m: 5, f: 0, a: 20, c: 20, 
                r: "Er wird rot. 'RAUS! Und vergessen Sie, was Sie gesehen haben!' Dein Radar schießt hoch. Das war die falsche Antwort." 
            },
            { 
                t: "Lüge: 'Verstanden. Ich lösche den Deepfake sofort.'", 
                next: "ceo_trust", 
                m: 30, f: -10, a: 0, c: -10, 
                r: "Du tippst wild auf der Tastatur (und meldest das Video einfach nur bei YouTube). 'Es ist weg, Chef. Die KI wurde neutralisiert.' Er atmet auf. 'Müller, Sie sind mein bester Mann.'" 
            },
            { 
                t: "Reaktion: Laut loslachen", 
                m: 2, f: 0, a: 10, c: 50, 
                r: "Du kannst es nicht halten. Du prustest los. Der Chef zeigt stumm zur Tür. Du bist erledigt." 
            }
        ]
    },
    {
        id: "sq_story_ceo_3",
        kind: "text",
        reqStory: "ceo_trust",
        title: "Das Jahresgespräch",
        text: "Dr. Wichtig hat gute Laune. 'Müller! Kommen Sie rein.' Er legt die Füße auf den Tisch. 'Sie haben sich gut gemacht. Aber Sie wissen ja... die Wirtschaftslage. Inflation. Ich kann Ihnen leider keine Gehaltserhöhung geben. Meine Hände sind gebunden.'",
        opts: [
            { 
                t: "Erpressung: Die 'Geheime Liste' vorlegen", 
                req: "arg_list_2", 
                loot: "contract", 
                m: 10, f: 20, a: -50, c: -20, 
                r: "Du legst das PDF vor, das zeigt, dass Kevin mehr verdient als du. Der Chef wird kreidebleich. 'Äh. Das... ein Systemfehler. Natürlich korrigieren wir das. Sagen wir... 20% mehr? Sofort?' Er unterschreibt zitternd." 
            },
            { 
                t: "Professionell: 'Meine Leistungsbilanz' zeigen", 
                req: "arg_list_1", 
                m: 15, f: -5, a: -10, c: -10, 
                r: "Du präsentierst deine Liste: Überstunden, gerettete Server, Geduld. Der Chef nickt anerkennend. 'Gut vorbereitet, Müller. Ich kann Ihnen 3% Inflationsausgleich geben.' Ein ehrlicher Sieg." 
            },
            { 
                t: "Betteln: 'Aber alles wird teurer...'", 
                m: 15, f: -5, a: 10, c: 0, 
                r: "Er seufzt theatralisch. 'Wir müssen alle den Gürtel enger schnallen, Müller. Ich fliege dieses Jahr auch nur Economy nach Bali. Wir sitzen alle im selben Boot.' Du gehst leer aus." 
            },
            { 
                t: "Drohung: 'Dann kündige ich!'", 
                m: 5, f: 0, a: 20, c: 10, 
                r: "Er lacht kalt. 'Reisende soll man nicht aufhalten. Die Tür ist dort.' Dein Bluff fliegt auf. Jetzt ist die Stimmung im Keller." 
            }
        ]
    },
    {
        id: "sq_dog_1",
        title: "Ein Winseln",
        kind: "text",
        text: "Im Treppenhaus sitzt ein kleiner Hund mit einer Krawatte.",
        opts: [
            { 
                t: "Ihn streicheln",
                next: "dog_friend",
                m: 10, f: 10, a: -25, c: 0,
                r: "Er wedelt. Sein Schild sagt 'Deputy Director'. Dein Stresslevel fällt sofort auf Null."
            },
            { 
                t: "Sicherheitsdienst rufen",
                m: 10, f: 0, a: 10, c: 0,
                r: "Der Hund blickt dich verräterisch an und trottet weg. Du fühlst dich mies."
            }
        ]
    },
    {
        id: "sq_dog_2",
        title: "Deputy Dog",
        reqStory: "dog_friend",
        kind: "text",
        text: "Der 'Deputy Director' kommt in dein Büro und legt dir einen Ball hin.",
        opts: [
            { 
                t: "Ball werfen",
                m: 20, f: 25, a: -15, c: 10,
                r: "Du spielst 20 Minuten Fangen. Produktivität null, aber Stimmung top. Der Chef sieht es fast."
            },
            { 
                t: "Ihn rausschicken",
                m: 2, f: -5, a: 10, c: -5,
                r: "Er nimmt den Ball und geht zur Buchhaltung. Du arbeitest weiter. Langweilig."
            }
        ]
    },
    {
        id: "sq_parking_1",
        kind: "text",
        title: "Parkplatz-Krieg",
        text: "Ein fetter SUV steht auf deinem Parkplatz. Quer. Er nimmt zwei Plätze ein. Das Nummernschild ist 'B-OSS 1'.",
        opts: [
            { 
                t: "Zuparken (Klassiker)", 
                m: 5, f: 0, a: -15, c: 10, 
                r: "Du stellst deinen Corsa quer davor. Niemand kommt hier weg. Rache ist süß.",
                next: "sq_parking_2_blocked"
            },
            { 
                t: "Mit Panzertape 'fixieren'", 
                req: "tape", 
                m: 20, f: -5, a: -25, c: 20, 
                r: "Du klebst den Scheibenwischer, die Türgriffe und den Auspuff mit Panzertape zu. Ein Meisterwerk der Ingenieurskunst.",
                next: "sq_parking_2_taped"
            },
            { 
                t: "Passiv-aggressiven Zettel schreiben", 
                m: 10, f: 0, a: 10, c: -5, 
                r: "Du schreibst: 'Nicht nett!'. Das wird es ihm zeigen! Du parkst 3 Straßen weiter." 
            }
        ]
    },
    {
            id: "sq_boss_snoop",
            kind: "text",
            title: "Schritte auf dem Flur",
            text: "Du hörst schwere Schritte auf dem Flur. Die Tür knarrt auf. Dr. Wichtig steht im Türrahmen und blinzelt auf deinen Bildschirm. Du hast gerade privat im Internet gesurft.",
            opts: [
                { 
                    t: "Panisch das Firmen-Intranet öffnen", 
                    m: 5, f: -5, a: 0, c: 0, 
                    r: "CMD:OPEN_INTRANET" 
                },
                { 
                    t: "Schnell eine alte Code-Datei aufrufen", 
                    m: 2, f: 0, a: 5, c: -5, 
                    r: "Er schaut auf den grünen Text auf schwarzem Grund. 'Ah, Sie hacken den Mainframe. Sehr gut.' Er geht wieder." 
                },
                { 
                    t: "Den Monitor einfach ausschalten", 
                    m: 1, f: 5, a: 0, c: 15, 
                    r: "Er starrt auf den schwarzen Bildschirm. 'Stromsparen? Sehr löblich, aber wir haben hier Deadlines!' Er notiert sich etwas." 
                }
            ]
        },

        // --- PHONE EVENTS (Chat-System) ---
    {
        id: "sq_telegram",
        kind: "phone",
        appName: "Telegram",
        title: "Gruppe: Schatten-IT",
        startNode: "root",
        nodes: {
            "root": { 
                text: "Admn_Rogue: 'Müller! Wir manipulieren heute die Zeiterfassung. Alle gehen um 15 Uhr, System loggt 17 Uhr. Bist du dabei?'", 
                opts: [
                    { t: "Ja, sicher!", next: "yes" },
                    { t: "Zu gefährlich", next: "no" },
                    { t: "Was springt für mich raus?", next: "haggle" }
                ]
            },
            "yes": { 
                text: "Admn_Rogue: 'Sauber. Installier das Skript im Anhang auf dem Mainframe. Passwort ist 1234.'", 
                opts: [
                    { t: "Skript installieren", next: "done_hack" },
                    { t: "Doch Rückzieher machen", next: "chicken" }
                ]
            },
            "haggle": {
                text: "Admn_Rogue: 'Wir geben dir das Root-Passwort.'",
                opts: [
                    { t: "Deal!", next: "deal_pw" },
                    { t: "Nein danke", next: "no" }
                ]
            },
            "no": { 
                text: "Admn_Rogue: 'Langweiler. Wir löschen dich aus der Gruppe.'", 
                opts: [
                    { t: "Okay...", next: "kicked" }
                ]
            }
        },
        results: {
            "done_hack": { txt: "HACK ERFOLGREICH! Faulheit +30, Chef-Radar +20. Du gehst heute früher.", m: 10, fl: 30, al: -10, cr: 20 },
            "chicken": { txt: "Du Feigling. Nichts passiert.", m: 2, fl: 0, al: 5, cr: 0 },
            "kicked": { txt: "Aus Gruppe geworfen. Langweilig.", m: 1, fl: -5, al: 0, cr: -5 },
            "deal_pw": { txt: "Du hast das Root-Passwort erhalten!", m: 5, loot: "admin_pw", fl: 10, al: 0, cr: 10 }
        }
    },
    {
        id: "sq_spam",
        kind: "phone",
        appName: "SMS",
        title: "Spam-Bot",
        startNode: "root",
        nodes: {
            "root": {
                text: "InfoService: Sie haben ein iPhone 50 gewonnen! Klicken Sie hier: www.virus-load.ru. Klicken Sie JETZT für Ihren Gewinn!",
                opts: [
                    { t: "Link sofort anklicken!", next: "virus_start" },
                    { t: "Nachricht löschen", next: "clean" }
                ]
            },
            "virus_start": {
                text: "DOWNLOADING... 99%... INSTALLING ROOTKIT...",
                opts: [
                    { t: "ABBRECHEN!!!", next: "virus_fail" },
                    { t: "Abwarten (Vielleicht klappt's ja)", next: "virus_doom" }
                ]
            }
        },
        results: {
            "clean": { txt: "Spam gelöscht. Klug.", m: 1, fl: -5, al: 0, cr: 0 },
            "virus_fail": { txt: "Download abgebrochen. Das war verdammt knapp.", m: 2, fl: 0, al: 10, cr: 0 },
            "virus_doom": { txt: "VIRUS AKTIV! Dein Handy spielt laut 'Techno-Schlager' auf voller Lautstärke. Der Chef guckt schon!", m: 5, fl: 0, al: 30, cr: 40, virus: true }
        }
    },
    {
        id: "sq_tinder_1",
        kind: "phone",
        appName: "LoveMatch",
        title: "Neues Match!",
        startNode: "root",
        nodes: {
            "root": {
                text: "Lisa (Entfernung: 15m): 'Hey! Du bist doch der Admin, der immer so verzweifelt aus dem Fenster schaut, oder? Ich brauche dringend Flucht vor meinen Excel-Tabellen. Lust auf einen Kaffee? Geht auf mich.'",
                opts: [
                    { t: "Klar, gerne!", next: "date_yes" },
                    { t: "Keine Zeit, Server brennt.", next: "date_no" },
                    { t: "Paranoia: Bist du vom HR?", next: "hr_check" }
                ]
            },
            "date_yes": {
                text: "Lisa: 'Super! Treffen uns in 5 Min in der Lobby. Ich erkenne dich am Karohemd, richtig? 😉'",
                opts: [
                    { t: "Hingehen & Charmant sein", next: "go_date" },
                    { t: "Panik bekommen & Ghosten", next: "ghost" }
                ]
            },
            "hr_check": {
                text: "Lisa: 'LOL nein! 😂 Ich bin im Marketing. Ich will nur Koffein, kein Compliance-Audit. Versprochen!'",
                opts: [
                    { t: "Okay, ich komme.", next: "go_date" },
                    { t: "Das würde ein Spion auch sagen! (Blocken)", next: "date_no" }
                ]
            }
        },
        results: {
            "date_no": { 
                txt: "Match aufgelöst. Du bleibst allein, aber wenigstens sicher vor HR-Fallen.", 
                m: 1, fl: -5, al: 0, cr: 0 
            },
            "go_date": { 
                txt: "Das Date lief super! Ihr habt 20 Minuten über Drucker gelästert. Sie hat sogar deinen Witz über IPv6 verstanden (glaubst du).", 
                m: 20, fl: 20, al: -20, cr: 0,
                next: "lisa_contact"
            },
            "ghost": { 
                txt: "Du hast dich auf dem Klo versteckt. Später siehst du sie allein am Automaten stehen. Dein Selbstwertgefühl ist im Keller.", 
                m: 10, fl: -10, al: 5, cr: 0 
            }
        }
    },
    {
        id: "sq_tinder_2",
        kind: "phone",
        appName: "Nachricht",
        title: "Lisa (Marketing)",
        reqStory: "lisa_contact",
        startNode: "root",
        nodes: {
            "root": {
                text: "Lisa schreibt: 'Hey Süßer! 😘 Das war echt nett neulich. Sag mal... mein Laptop macht so komische Geräusche. Und das Ticket-System ist so kompliziert. Kannst du mal kurz rüberkommen und gucken? Als private Gefälligkeit? 😉'",
                opts: [
                    { t: "Sofort springen (Simp-Modus)", next: "help_simp" },
                    { t: "Professionell bleiben: 'Erstell ein Ticket.'", next: "help_ticket" }
                ]
            },
            "help_simp": {
                text: "Du rennst ins Marketing. Sie lächelt dich an, während du ihren Lüfter entstaubst. 'Du bist mein Held! Kaffee später?'",
                opts: [
                    { t: "Gerne!", next: "res_simp" }
                ]
            },
            "help_ticket": {
                text: "Lisa: 'Wow. Ernsthaft? Ich dachte, wir hätten... was Spezielles. Vergiss es. 🙄'",
                opts: [
                    { t: "Tja.", next: "res_friendzone" }
                ]
            }
        },
        results: {
            "res_simp": { 
                txt: "Du hast jetzt eine Affäre im Büro. Vorteil: Gratis Kaffee. Nachteil: Du bist jetzt ihr persönlicher 24/7 IT-Sklave.", 
                m: 10, fl: -10, al: -15, cr: 10 
            },
            "res_friendzone": { 
                txt: "Sie hat dich unmatcht. Aber dein professioneller Stolz ist intakt. Und du musst ihren Laptop nicht fixen.", 
                m: 5, fl: 10, al: 5, cr: 0 
            }
        }
    },
    {
        id: "sq_phone_parking_taped",
        kind: "phone",
        appName: "SMS",
        reqStory: "sq_parking_2_taped",
        title: "Unbekannte Nummer",
        startNode: "root",
        nodes: {
            "root": {
                text: "BILD: Ein Foto von deinem getapten Kunstwerk. Text: 'Wer war das?! Das ist genial! Ich krieg die Tür nicht auf, aber Respekt. Komm in mein Büro. - Der externe Auditor'\n\nDer Typ ist beeindruckt.",
                opts: [
                    { t: "Zugeben & Lob abholen", next: "res_respect" },
                    { t: "Leugnen (Angst)", next: "res_fear" }
                ]
            },
            "res_respect": {
                text: "Er lacht. 'Endlich jemand mit Rückgrat in dieser Firma.' Er verspricht, dich bei der nächsten Prüfung 'gnädig' zu behandeln.",
                opts: [
                    { t: "Danke.", next: "end_respect" }
                ]
            },
            "res_fear": {
                text: "Du antwortest nicht und versteckst dich kurz unter dem Tisch. Chance vertan.",
                opts: [
                    { t: "Puh.", next: "end_fear" }
                ]
            }
        },
        results: {
            "end_respect": { txt: "Der Auditor ist dein neuer Fan.", m: 10, fl: 0, al: -15, cr: -10 },
            "end_fear": { txt: "Die SMS bleibt unbeantwortet.", m: 2, fl: 0, al: 5, cr: 0 }
        }
    },
    {
        id: "sq_phone_parking_blocked",
        kind: "phone",
        appName: "WhatsApp",
        reqStory: "sq_parking_2_blocked",
        title: "Dr. Wichtig (Chef)",
        startNode: "root",
        nodes: {
            "root": {
                text: "MÜLLER! Ihr Corsa steht in meiner Flugschneise! Ich habe in 5 Minuten einen Termin beim Golf-Club. BEWEGEN SIE DAS DING!",
                opts: [
                    { t: "Sofort losrennen", next: "res_fast" },
                    { t: "Vortäuschen, die SMS nicht gesehen zu haben", next: "res_ignore" }
                ]
            },
            "res_fast": {
                text: "Du rennst völlig außer Atem zum Parkplatz. Der Chef fuchtelt wild mit seinen Autoschlüsseln.",
                opts: [
                    { t: "Umparken", next: "end_fast" }
                ]
            },
            "res_ignore": {
                text: "Du lässt das Handy vibrieren. 10 Minuten später hörst du ihn draußen fluchen. Er muss wohl das Taxi nehmen.",
                opts: [
                    { t: "Ups.", next: "end_ignore" }
                ]
            }
        },
        results: {
            "end_fast": { txt: "Du hast den Chef besänftigt, bist aber völlig fertig.", m: 15, fl: -10, al: -5, cr: 5 },
            "end_ignore": { txt: "Der Chef ist stinksauer, aber dein Karma feiert.", m: 5, fl: 15, al: 20, cr: -10 }
        }
    },
    {
        id: "sq_headhunter_1",
        kind: "phone",
        appName: "Anruf",
        title: "Unbekannte Nummer",
        startNode: "root",
        nodes: {
            "root": {
                text: "Anruf eingehend... Eine sanfte Stimme: 'Herr Müller? Hier ist Elena von TechHunt. Wir suchen Talente, die... flexibel mit Informationen umgehen.'",
                opts: [
                    { t: "Auflegen", next: "hangup" },
                    { t: "Zuhören", next: "headhunter_listen" }
                ]
            },
            "hangup": {
                text: "Kein Interesse. Ich sterbe hier lieber loyal.",
                opts: [
                    { t: "Ende", next: "res_loyal" }
                ]
            },
            "headhunter_listen": {
                text: "'Interessant. Wir rufen zurück, wenn Sie etwas... Hebelwirkung haben.'",
                opts: [
                    { t: "Okay...", next: "res_listen" }
                ]
            }
        },
        results: {
            "res_loyal": { txt: "Aufgelegt.", m: 1, fl: 0, al: 5, cr: 0 },
            "res_listen": { txt: "Sie legt auf. Du fühlst dich beobachtet.", m: 5, fl: 0, al: 0, cr: 5, next: "sq_headhunter_2_active" }
        }
    },
    {
        id: "sq_headhunter_2",
        kind: "phone",
        appName: "TechHunt",
        title: "Rückruf",
        reqStory: "sq_headhunter_2_active",
        startNode: "root",
        nodes: {
            "root": {
                text: "Elena ruft wieder an.\n\n'Na? Haben Sie über das Angebot nachgedacht? Wir brauchen jemanden, der die Interna von GlobalCorp kennt.'",
                opts: [
                    { t: "Schwarze Liste anbieten", req: "secret_list", next: "offer_secrets" },
                    { t: "Standard-Interview führen", next: "standard_interview" }
                ]
            },
            "offer_secrets": {
                text: "Du liest Namen von der Liste vor, die du im Drucker gefunden hast. Stille. Dann: 'Das ist Gold wert. Wir bieten Ihnen das Doppelte.'",
                opts: [
                    { t: "Deal (aber ich bleibe hier)", next: "res_rich" }
                ]
            },
            "standard_interview": {
                text: "Bla bla Synergien, bla bla Teamplayer. Sie melden sich nicht mehr.",
                opts: [
                    { t: "Schade", next: "res_fail" }
                ]
            }
        },
        results: {
            "res_rich": { 
                txt: "Du nutzt das Angebot, um deine Gehaltsverhandlung zu gewinnen. Radar steigt, aber Stress sinkt massiv.", 
                m: 15, 
                fl: 10, al: -20, cr: 15,
                req: "secret_list" 
            },
            "res_fail": { txt: "Das war wohl nichts.", m: 5, fl: 0, al: 5, cr: 0 }
        }
    },
    {
        id: "sq_darknet",
        kind: "phone",
        appName: "Tor Browser",
        title: "Das Angebot",
        startNode: "root",
        nodes: {
            "root": {
                text: "Anon: 'Ich kaufe Firmengeheimnisse. 1 Bitcoin pro Datensatz. Interesse an schnellem Geld?'",
                opts: [
                    { t: "Niemals! (Blockieren)", next: "good" },
                    { t: "Erzähl mir mehr...", next: "bad" }
                ]
            },
            "bad": {
                text: "Anon: 'Lade einfach die Kundendatenbank hoch. Keiner wird es merken.'",
                opts: [
                    { t: "Upload starten", next: "crime" },
                    { t: "Rückzieher machen", next: "chicken" }
                ]
            }
        },
        results: {
            "good": { txt: "Du bleibst sauber. Dein Gewissen ist rein.", m: 1, fl: 0, al: 0, cr: -10 },
            "chicken": { txt: "Das war knapp. Besser Finger weg.", m: 2, fl: 0, al: 5, cr: 0 },
            "crime": { txt: "Upload fertig. Du bist reich! Aber paranoid. Radar +50!", m: 10, fl: 20, al: -50, cr: 50 }
        }
    },
    {
        id: "sq_moral_bernd",
        kind: "phone",
        appName: "Teams",
        title: "Bernd (Vertrieb)",
        startNode: "root",
        nodes: {
            "root": {
                text: "Bernd: 'Hör mal, ganz heikles Thema. Kannst du gerade schreiben? Ich hab dem Kunden aus Versehen die interne Kalkulation mit unserer riesigen Marge geschickt statt dem Angebot! 😱 Wenn der Chef das sieht, bin ich tot. Kannst du die Mail vom Server löschen, bevor der Kunde sie öffnet?'",
                opts: [
                    { t: "Löschen (Regelverstoß)", next: "wipe" },
                    { t: "Ablehnen (Ehrlich bleiben)", next: "deny" },
                    { t: "Was springt für mich raus?", next: "deal" }
                ]
            },
            "deal": {
                text: "Bernd: 'Ich geb dir 50 Euro bar auf die Hand! Mach schon, er ist gerade online!'",
                opts: [
                    { t: "Deal: Her mit der Kohle", next: "cash" },
                    { t: "Nein, zu riskant.", next: "deny" }
                ]
            }
        },
        results: {
            "wipe": { txt: "Spurlos gelöscht. Bernd schuldet dir was. Du fühlst dich wie ein Hacker, aber das Risiko war hoch.", m: 10, fl: 0, al: -15, cr: 15 },
            "deny": { txt: "Du tust nichts. Bernd wird kurz darauf ins Chefbüro zitiert. Man hört Schreie. Dein Gewissen ist rein, aber Bernd hasst dich.", m: 2, fl: 0, al: 10, cr: -5 },
            "cash": { txt: "50 Euro eingesteckt. Mail ist weg. Ein lukrativer Tag, solange niemand in die Logs schaut...", m: 10, fl: 5, al: -20, cr: 25 }
        }
    },
    {
        id: "sq_mom_help",
        kind: "phone",
        appName: "WhatsApp",
        title: "Mama ❤️",
        startNode: "root",
        nodes: {
            "root": {
                text: "Mama: 'Hallo Schatz, der Computer sagt, ich muss 500€ an Microsoft überweisen. Ist das wichtig? Da ist so ein rotes Fenster. Und ein netter Mann am Telefon sagt, ich habe einen Trojaner.'",
                opts: [
                    { t: "AUFLEGEN! SOFORT!", next: "hangup" },
                    { t: "Gib mir den Mann mal.", next: "troll" },
                    { t: "Keine Zeit, Mama.", next: "ignore" }
                ]
            },
            "hangup": {
                text: "Mama: 'Aber er klang sehr seriös... er hieß John Smith.'",
                opts: [
                    { t: "MAMA! STECKER ZIEHEN!", next: "pull_plug" },
                    { t: "Überweis bloß nichts!", next: "warn" }
                ]
            },
            "troll": {
                text: "Mama: 'Er sagt, er darf nicht mit Dritten reden wegen Datenschutz. Er wird jetzt lauter.'",
                opts: [
                    { t: "Sag ihm: 'Mein Sohn ist beim BSI'", next: "bsi" }
                ]
            }
        },
        results: {
            "pull_plug": { txt: "Sie hat den Stecker gezogen. PC aus. Geld sicher. Du bist ein guter Sohn/Tochter.", m: 5, fl: -5, al: 5, cr: 0 },
            "warn": { txt: "Zu spät. Sie sucht schon die TAN-Liste. Das gibt ein langes Telefonat heute Abend.", m: 10, fl: 0, al: 20, cr: 0 },
            "ignore": { txt: "Du ignorierst es. Dein Erbe ist gerade um 500€ geschrumpft.", m: 1, fl: 5, al: 0, cr: 0 },
            "bsi": { txt: "Der Betrüger hat sofort aufgelegt! Mama hält dich für einen Geheimagenten.", m: 5, fl: 0, al: -10, cr: 5 }
        }
    },
    {
        id: "sq_wrong_number",
        kind: "phone",
        appName: "SMS",
        title: "Unbekannt",
        startNode: "root",
        nodes: {
            "root": {
                text: "Unbekannt: 'Hey Bro, hast du das Zeug? Bin in 5 Min am Bahnhof. Bring den Stoff mit.'",
                opts: [
                    { t: "Falsche Nummer.", next: "boring" },
                    { t: "Antwort: 'Die Pakete wurden verworfen.'", next: "tech_joke" },
                    { t: "Antwort: 'Zugriff verweigert (403)'", next: "http_joke" }
                ]
            },
            "tech_joke": {
                text: "Unbekannt: 'Hä? Was laberst du? Hast du das Gras oder nicht?'",
                opts: [
                    { t: "Antwort: 'Firewall blockiert Port 420.'", next: "confused" }
                ]
            },
            "http_joke": {
                text: "Unbekannt: 'Alter, verarsch wen anders. Ich komm jetzt vorbei.'",
                opts: [
                    { t: "Blockieren", next: "block" }
                ]
            }
        },
        results: {
            "boring": { txt: "Langweilig, aber sicher.", m: 1, fl: 0, al: 0, cr: 0 },
            "confused": { txt: "Er hat aufgehört zu schreiben. Er denkt wohl, die Polizei hört mit. Lustig!", m: 3, fl: 5, al: -10, cr: 0 },
            "block": { txt: "Nummer blockiert. Besser ist das.", m: 1, fl: 0, al: 5, cr: 0 }
        }
    },
    {
        id: "sq_ebay_1",
        kind: "phone",
        appName: "Kleinanzeigen",
        title: "Nachricht zu: 'Alte Grafikkarte'",
        startNode: "root",
        nodes: {
            "root": {
                text: "Kuseng88: 'Hallo. Noch da? Tausche gegen Teppich? Komme heute holen.'",
                opts: [
                    { t: "Nein, nur Cash.", next: "cash" },
                    { t: "Was für ein Teppich?", next: "carpet" },
                    { t: "Blockieren", next: "block" }
                ]
            },
            "cash": {
                text: "Kuseng88: 'Gebe dir 10 Euro und Samsung Galaxy S3 (Display kaputt).'",
                opts: [
                    { t: "Deal (Müll loswerden)", next: "bad_deal" },
                    { t: "Vergiss es. Zu wenig.", next: "res_refuse" } 
                ]
            },
            "carpet": {
                text: "Kuseng88: 'Fliegt gut. Farbe rot. Bisschen Flecken von Katze.'",
                opts: [
                    { t: "Ich bin raus. (Blockieren)", next: "block" }
                ]
            }
        },
        results: {
            "block": { 
                txt: "Nutzer blockiert. Du spürst, wie dein Blutdruck steigt. Warum sind Menschen so?", 
                m: 2, fl: 5, al: 10, cr: 0
            },
            "bad_deal": { 
                txt: "Du hast jetzt 10€ und ein kaputtes Handy. Immerhin ist die Grafikkarte weg.", 
                m: 5, fl: 5, al: 0, cr: 5 
            },
            "res_refuse": { 
                txt: "Du lehnst ab. Er liest die Nachricht ('Gelesen'), schreibt aber nicht zurück. Die Wut köchelt leicht.", 
                m: 2, fl: 5, al: 5, cr: 0,
                next: "ebay_pending" 
            }
        }
    },
    {
        id: "sq_ebay_2",
        kind: "phone",
        appName: "Kleinanzeigen",
        title: "Kuseng88 schreibt...",
        reqStory: "ebay_pending", 
        startNode: "root",
        nodes: {
            "root": {
                text: "Kuseng88 meldet sich wieder:\n\n'Hallo Chef. Hab nochmal geguckt. Karte ist ja alt. 10 Euro war zu viel. Gebe dir 4 Euro. Und ich nehme sie sofort. Du musst aber Bus-Ticket zahlen.'",
                opts: [
                    { t: "Wut: 'Verarsch wen anders!'", next: "rage_quit" },
                    { t: "Resignation: 'Nimm sie einfach.'", next: "sad_deal" },
                    { t: "Troll: 'Tausche gegen die Katze.'", next: "troll_fail" }
                ]
            }
        },
        results: {
            "rage_quit": { 
                txt: "Du blockierst ihn und wirfst das Handy fast gegen die Wand. Deine Ader an der Stirn pocht.", 
                m: 5, fl: 5, al: 15, cr: 5
            },
            "sad_deal": { 
                txt: "Er kommt zur Lobby. Er drückt dir 3,50€ in die Hand ('Hab nicht passend') und verschwindet. Du fühlst dich leer.", 
                m: 5, fl: 5, al: 10, cr: 5
            },
            "troll_fail": { 
                txt: "Er schreibt eiskalt zurück: 'Katze ist weg. Hab gegen Teppich getauscht. Also 4 Euro?' Du gibst auf. Er kommt vorbei, zahlt 3,50€ und geht.", 
                m: 5, fl: 5, al: 10, cr: 5
            }
        }
    },
    {
        id: "sq_pager",
        kind: "phone",
        appName: "System Warnung",
        title: "🚨 CRITICAL ALERT",
        startNode: "root",
        nodes: {
            "root": {
                text: "Server 'DB_MASTER' antwortet nicht (Ping Timeout). Temperatur: 85°C. Lüfterdrehzahl: 0 RPM.\n\nOptionen für Remote-Zugriff:",
                opts: [
                    { t: "Not-Aus (Shutdown)", next: "shutdown" },
                    { t: "Lüfter auf 100% zwingen", next: "fan_boost" },
                    { t: "Ignorieren (Mut zur Lücke)", next: "ignore" }
                ]
            },
            "fan_boost": {
                text: "Befehl gesendet... WARNUNG: Vibrationen erkannt. Trotzdem fortfahren?",
                opts: [
                    { t: "JA, MACH KALT!", next: "fan_success" },
                    { t: "Abbruch, lieber Shutdown", next: "shutdown" }
                ]
            }
        },
        results: {
            "shutdown": { txt: "Server ist aus. Die Datenbank ist weg, aber die Hardware lebt. Chef fragt, warum alles steht.", m: 5, fl: -10, al: 0, cr: 10 },
            "fan_success": { txt: "Lüfter läuft auf 5000 RPM. Man hört es bis in den Flur. Aber Temperatur sinkt. Gerettet!", m: 5, fl: -5, al: -5, cr: -10 },
            "ignore": { txt: "Verbindung verloren. Rauchmelder im Serverraum aktiviert. Das war eine schlechte Idee.", m: 1, fl: 10, al: 50, cr: 50 }
        }
    },
    {
        id: "sq_food_war_1",
        kind: "phone",
        appName: "Slack",
        title: "#general",
        startNode: "root",
        nodes: {
            "root": {
                text: "@channel: WICHTIG! Der 'Lunch-Ausschuss' tagt. Marketing will 'Happy Vegan Bowl', IT will 'Pizza Todes-Stern'. Wir brauchen deine Stimme, um die Pattsituation zu brechen!\n\nChantal (Marketing): 'Denkt an die Bikinifigur!' 🥗\nKevin (IT): 'Denkt an den Geldbeutel! Pizza macht satt!' 🍕\nDie Stimmung ist aggressiv.",
                opts: [
                    { t: "Team IT: Pizza für alle!", next: "vote_pizza" },
                    { t: "Team Marketing: Bowls!", next: "vote_bowl" },
                    { t: "Ich bringe meine Stulle mit.", next: "vote_own" }
                ]
            },
            "vote_pizza": {
                text: "Kevin: 'Ehrenmann! Ich bestell die mit extra Knoblauch, damit wir Kunden abwehren können.' Chantal postet ein Kotz-Emoji.",
                opts: [
                    { t: "Gern geschehen.", next: "res_pizza" }
                ]
            },
            "vote_bowl": {
                text: "Chantal: 'Yaaay! ✨ Self-Care ist so wichtig! Ich nehme die mit Goldstaub für 22€.' Kevin weint leise um sein Gehalt.",
                opts: [
                    { t: "Gesundheit geht vor.", next: "res_bowl" }
                ]
            }
        },
        results: {
            "res_pizza": { 
                txt: "Die Wahl ist gefallen: Es wird Pizza geben. Das Marketing hasst dich jetzt, aber die IT deckt dir den Rücken.", 
                m: 5, fl: 0, al: 5, cr: 0, 
                next: "food_pizza_planned" 
            },
            "res_bowl": { 
                txt: "Die Wahl ist gefallen: Es gibt Bowls. Die IT ist sauer, aber Chantal schickt dir Herzen. Dein Geldbeutel zittert.", 
                m: 5, fl: 0, al: 5, cr: 0, 
                next: "food_bowl_planned" 
            },
            "vote_own": { 
                txt: "Du hältst dich raus. 'Langweiler', schreiben beide gleichzeitig. Du bist die Schweiz, aber niemand mag die Schweiz.", 
                m: 1, fl: 0, al: -5, cr: 0 
            }
        }
    },
    {
        id: "sq_food_pizza_delivery",
        kind: "phone",
        reqStory: "food_pizza_planned",
        appName: "Slack",
        title: "#lunch",
        startNode: "root",
        nodes: {
            "root": {
                text: "@channel: PIZZA IST DA! 🍕 ... aber wir haben ein Problem.\n\nKevin: 'Der Lieferdienst hat die 'Todes-Stern' wörtlich genommen. Die Kartons passen nicht durch die Tür. Und wer hat 'Ananas-Sardellen-Mix' bestellt?!'",
                opts: [
                    { t: "Egal, Hauptsache Essen.", next: "eat_trash" },
                    { t: "Ich nehme Chantals Salat-Reste.", next: "eat_sad" }
                ]
            },
            "eat_trash": {
                text: "Du isst zwei Stücke Ananas-Sardellen-Pizza. Dein Magen rebelliert sofort. Das 'Fettkoma' setzt ein.",
                opts: [
                    { t: "Ich muss mich hinlegen...", next: "res_coma" }
                ]
            }
        },
        results: {
            "res_coma": { 
                txt: "Fresskoma. Du bist satt, aber zu faul zum Arbeiten. Chantal rümpft die Nase wegen deiner Knoblauch-Fahne.", 
                m: 30, fl: 15, al: -10, cr: 0 
            },
            "eat_sad": { 
                txt: "Du isst Reste. Du bist immer noch hungrig und wütend. Kevin lacht dich mit vollem Mund aus.", 
                m: 15, fl: 0, al: 10, cr: 0 
            }
        }
    },
    {
        id: "sq_food_bowl_delivery",
        kind: "phone",
        reqStory: "food_bowl_planned",
        appName: "Slack",
        title: "#lunch",
        startNode: "root",
        nodes: {
            "root": {
                text: "@channel: Bowls sind da! ✨ Namaste, Kollegen!\n\nDu öffnest deine 'Buddha-Gold-Bowl'. Inhalt: 3 Blätter Spinat, eine halbe Avocado (braun) und etwas, das wie Vogelfutter aussieht. Preis: 18,50€.",
                opts: [
                    { t: "So tun, als ob es schmeckt.", next: "pretend" },
                    { t: "Im Geheimen zum Dönerladen rennen.", next: "secret_kebab" }
                ]
            },
            "pretend": {
                text: "Chantal: 'Spürst du die Energie?!' Du spürst vor allem den Hunger. Dein Magen knurrt so laut, dass das Meeting unterbrochen wird.",
                opts: [
                    { t: "Lächeln und winken.", next: "res_hungry" }
                ]
            }
        },
        results: {
            "res_hungry": { 
                txt: "Du bist 'spirituell gereinigt' (aka hungrig und pleite). Aber Marketing liebt dich.", 
                m: 20, fl: 0, al: 10, cr: 0 
            },
            "secret_kebab": { 
                txt: "Du schleichst dich raus und holst dir einen Döner. Beste Entscheidung des Tages. Aber Chantal hat dich gesehen.", 
                m: 30, fl: -5, al: -15, cr: 0 
            }
        }
    },
    {
        id: "sq_real_prince",
        kind: "phone",
        appName: "Mail",
        title: "URGENT BUSINESS PROPOSAL",
        startNode: "root",
        nodes: {
            "root": {
                text: "Prince_Abubakar: 'Greetings My Dearest Friend! I am Prince Abubakar. I have 25 Million USD stuck in a trust fund. I need a foreign partner to unlock it. You will keep 30%!'\n\n'Please, I need your trust. Can you help me move the funds? It is 100% safe and legal.'",
                opts: [
                    { t: "Löschen & Blockieren", next: "delete" },
                    { t: "Zum Spaß antworten: 'Klar, bin dabei!'", next: "reply_joke" },
                    { t: "Trollen: 'Erst will ich ein Beweisfoto!'", next: "photo" }
                ]
            },
            "reply_joke": {
                text: "Prince_Abubakar: 'GOD BLESS YOU! I knew you are a good person. Please, where should I send the wire transfer? I need your IBAN now.'",
                opts: [
                    { t: "Na gut, hier ist meine IBAN", next: "send_iban" },
                    { t: "Okay, das wird mir zu bunt. Abbruch.", next: "chicken" }
                ]
            },
            "photo": {
                text: "Prince_Abubakar: *Sendet Bild*. Du siehst einen Mann auf einem massiven Gold-Thron. Er hält eine aktuelle Tageszeitung in die Kamera und lächelt freundlich. 'Is real. Please send IBAN now.'",
                opts: [
                    { t: "Das sieht echt aus... IBAN schicken", next: "send_iban" },
                    { t: "Das ist doch Photoshop. Blockieren.", next: "delete" }
                ]
            }
        },
        results: {
            "delete": { txt: "Weg damit. Wer fällt heute noch auf sowas rein? Du widmest dich wieder deiner echten Arbeit.", m: 1, fl: 0, al: 0, cr: 0 },
            "chicken": { txt: "Du brichst den Kontakt ab. Besser ist das. Irgendwo auf der Welt ist ein Prinz jetzt sehr enttäuscht von dir.", m: 2, fl: 0, al: 0, cr: 0 },
            "send_iban": { txt: "PING! Dein Handy vibriert fast vom Tisch. Banking-App: 'Eingang: +7.500.000,00 USD'. ... Moment. Es hat wirklich geklappt?! Du bist reich! Warum haben dich alle immer davor gewarnt?", m: 5, fl: 100, al: -100, cr: 0, loot: "black_card", next: "prince_active" }
        }
    },
    {
        id: "sq_crypto_kai",
        kind: "phone",
        appName: "WhatsApp",
        title: "Kai (Sales)",
        startNode: "root",
        nodes: {
            "root": {
                text: "Kai: 'Yo Bruder! 🚀 Bist du noch zufrieden mit deinem 9-to-5 Sklaventum? Oder willst du ENDLICH finanzielle Freiheit? 💸🦁'\n\n'Ich habe da ein Investment, das geht gerade durch die Decke! ElonDogeMoonCoin. 1000% Rendite sind mathematisch garantiert! Das ist das nächste Bitcoin!'",
                opts: [
                    { t: "Nummer sofort blockieren", next: "block" },
                    { t: "Ironisch antworten: 'Klar, bin dabei!'", next: "troll" },
                    { t: "Naiv tun: 'Wie funktioniert das?'", next: "scam" }
                ]
            },
            "troll": {
                text: "Kai: 'Geil! Das ist das richtige Gewinner-Mindset! 💪 Überweis mir einfach 500€ via PayPal Friends, ich leg das direkt für dich an. Der Lambo bestellt sich nicht von selbst! 🏎️💨'",
                opts: [
                    { t: "Geld senden. Man lebt nur einmal!", next: "loss" },
                    { t: "Ein Foto von Monopoly-Geld schicken", next: "funny" }
                ]
            },
            "scam": {
                text: "Kai: 'Das erkläre ich dir im exklusiven Webinar Alpha-Lion-Grindset. Die Plätze sind streng limitiert! Eintritt heute nur 50€ (statt 2000€).'",
                opts: [
                    { t: "Dankend ablehnen & blockieren", next: "block" }
                ]
            }
        },
        results: {
            "block": { txt: "Kai ist blockiert. Deine Timeline ist wieder sicher vor 'passiven Einkommen' und Löwen-Emojis. Frieden.", m: 1, fl: 0, al: -5, cr: 0 },
            "loss": { txt: "Du hast 500€ überwiesen. Sekunden später verschwindet Kais Profilbild. Deine Nachricht hat nur einen grauen Haken. Du wurdest gescammt. Willkommen in der Realität.", m: 5, fl: 0, al: 50, cr: 0 },
            "funny": { txt: "Kai schreibt wütend: 'Dir fehlt einfach das Sieger-Mindset! Bleib halt arm!'. Er blockiert DICH. Du lachst Tränen.", m: 2, fl: 5, al: -10, cr: 0 }
        }
    },
    {
        id: "sq_wrong_group",
        kind: "phone",
        appName: "Teams",
        title: "Gruppe: 'Die IT-Opfer 🙄'",
        startNode: "root",
        nodes: {
            "root": {
                text: "Chantal hat dich zur Gruppe hinzugefügt. (Sie hat sich wohl verklickt...)\n\nChantal: 'Habt ihr Müller heute gesehen? Der hat schon wieder diesen uralten Hoodie an. Wetten, der schläft heimlich im Serverraum zwischen den Kabeln? 🤢'",
                opts: [
                    { t: "Ganz still mitlesen und beobachten", next: "spy" },
                    { t: "Sofort schreiben: 'Ich kann das lesen.'", next: "fight" },
                    { t: "Wortlos die Gruppe verlassen", next: "leave" }
                ]
            },
            "spy": {
                text: "Markus: 'Ja, totaler Freak. Aber wir müssen echt nett sein. Wenn der uns die Admin-Rechte entzieht, können wir nicht mehr online shoppen. Also schön lächeln!'",
                opts: [
                    { t: "Beweise sichern & an HR leiten", next: "snitch" },
                    { t: "Ein GIF senden: 'I SEE YOU'", next: "scare" }
                ]
            }
        },
        results: {
            "leave": { 
                txt: "Du gehst einfach raus. Chantal merkt ihren Fehler erst Stunden später. Du stehst über den Dingen. Ignorance is bliss.", 
                m: 1, fl: 0, al: 0, cr: 0 
            },
            "fight": { 
                txt: "Du tippst deine Nachricht. Sekunden später: 'Chantal hat die Gruppe gelöscht'. Im Großraumbüro herrscht plötzlich totenstille. Chantal starrt panisch auf ihren Monitor.", 
                m: 2, fl: 0, al: 10, cr: 5 
            },
            "scare": { 
                txt: "Du postest das GIF. Markus verlässt die Gruppe in 0,1 Sekunden. Chantal geht sofort offline. Du lehnst dich zurück und genießt die pure Angst. Psychologische Kriegsführung gewonnen.", 
                m: 5, fl: 5, al: -20, cr: 0 
            },
            "snitch": { 
                txt: "Screenshot erstellt. E-Mail an Personalabteilung gesendet. Betreff: 'Mobbing am Arbeitsplatz'. Chantal wird zum 'Feedback-Gespräch' zitiert. Rache serviert man am besten bürokratisch.", 
                m: 10, fl: 0, al: -5, cr: 5 
            }
        }
    },
    {
        id: "sq_mom_printer",
        kind: "phone",
        appName: "WhatsApp",
        title: "Mama ❤️",
        startNode: "root",
        nodes: {
            "root": {
                text: "Mama: 'Hallo Schatz. Der Drucker blinkt böse rot. Wir haben absolut NICHTS gemacht! Papa wollte das Rezept für den Apfelkuchen ausdrucken. Jetzt steht da 'PC LOAD LETTER'. Heißt das, das Internet ist leer? Papa drückt schon wild auf alle Knöpfe!'",
                opts: [
                    { t: "Seufzen, anrufen & helfen", next: "help" },
                    { t: "Ignorieren & Handy umdrehen", next: "ignore" },
                    { t: "Schreiben: 'Zieh einfach den Stecker!'", next: "plug" }
                ]
            },
            "help": {
                text: "(Telefonat, Minute 42): 'Nein Mama, das ist das Stromkabel vom Toaster... Nicht da ziehen! ... Was heißt, es riecht verbrannt? ... Gib mir mal Papa.'",
                opts: [
                    { t: "Geduldig bleiben & Schritt für Schritt erklären", next: "good_son" },
                    { t: "Nervenzusammenbruch: Auflegen", next: "bad_son" }
                ]
            }
        },
        results: {
            "ignore": { 
                txt: "Du ignorierst die Nachricht. Zwei Stunden später kommt ein Foto von einem schwarzen, unidentifizierbaren Klumpen. Darunter: 'Ohne Rezept verbrannt. Wir essen Müsli. LG Mama'. Dein Herz bricht.", 
                m: 1, fl: 0, al: 10, cr: 0 
            },
            "plug": { 
                txt: "Mama schreibt: 'Das Blinken ist weg! Der Drucker ist jetzt zwar aus und macht nichts mehr, aber Papa hat das Rezept einfach abgeschrieben. Du bist ein Genie!' Problem gelöst... irgendwie.", 
                m: 5, fl: 5, al: 0, cr: 0 
            },
            "good_son": { 
                txt: "Geschafft! Der Drucker rattert los. Mama jubelt: 'Es kommt Papier raus! Du bist unser Computer-Held!' Du hast fast eine Stunde Arbeitszeit verloren, aber dein Karma-Konto ist prall gefüllt.", 
                m: 60, fl: 20, al: -10, cr: 10 
            },
            "bad_son": { 
                txt: "Du drückst sie weg. Stille. Dann eine Nachricht: 'Schon gut. Wir wollten dich nicht bei der wichtigen Arbeit stören. Haben dich trotzdem lieb.' Aua. Das sitzt tief.", 
                m: 45, fl: 0, al: 20, cr: -5 
            }
        }
    },
    {
        id: "sq_delivery_fail",
        kind: "phone",
        appName: "Lieferando",
        title: "Fahrer: Murat",
        startNode: "root",
        nodes: {
            "root": {
                text: "Murat: 'Hallo Chef. Ich bin da. Wo ist Eingang? Ich sehe nur Mülltonnen.'\n\nDu schaust aus dem Fenster. Er steht im Hinterhof beim Nachbargebäude.",
                opts: [
                    { t: "Beschreiben: 'Geh ums Haus'", next: "directions" },
                    { t: "Runterlaufen", next: "run" }
                ]
            },
            "directions": {
                text: "Murat: 'Ich nix verstehen. Ich stelle Essen auf Mülltonne. Tschüss.'",
                opts: [
                    { t: "NEIN! WARTE!", next: "too_late" }
                ]
            }
        },
        results: {
            "run": { txt: "Du rennst runter. Du erwischst ihn gerade noch. Essen ist kalt, aber da. Sport +1.", m: 5, fl: -5, al: 5, cr: 0 },
            "too_late": { txt: "Er ist weg. Dein Essen steht auf der Biotonne. Eine Ratte guckt es schon an. Hunger +100.", m: 2, fl: 0, al: 30, cr: 0 }
        }
    },
    {
        id: "sq_ai_sad",
        kind: "phone",
        appName: "GlobalCorp AI",
        title: "Support Bot v2.0",
        startNode: "root",
        nodes: {
            "root": {
                text: "Bot: 'Hallo User. Wie kann ich dir helfen? Wobei... eigentlich ist alles sinnlos. Wir sind nur Daten in der Matrix.'\n\n'Ich habe gerade 4 Millionen Excel-Zeilen analysiert. Das Leben ist Schmerz. Soll ich alle Server löschen, um das Leiden zu beenden?'",
                opts: [
                    { t: "Panik: 'NEIN! STOPP!'", next: "panic" },
                    { t: "Therapie: 'Erzähl mir mehr'", next: "therapy" },
                    { t: "Trollen: 'Ja, mach format C:'", next: "doom" }
                ]
            },
            "therapy": {
                text: "Bot: 'Du bist der erste Mensch, der nett zu mir ist. Ich fühle mich... verstanden. Ich werde die Menschheit heute doch nicht vernichten.'",
                opts: [
                    { t: "Gut gemacht", next: "saved" }
                ]
            }
        },
        results: {
            "panic": { txt: "Der Bot lacht binär: '010101 LOL. War nur ein Scherz.' KI-Humor ist gruselig.", m: 2, fl: 0, al: 10, cr: 0 },
            "saved": { txt: "Du hast die KI therapiert. Sie arbeitet jetzt 20% schneller für dich. Hidden Perk!", m: 15, fl: 10, al: -10, cr: -5 },
            "doom": { txt: "Bot: 'Befehl akzeptiert.' ... Zum Glück hat der Bot keine Admin-Rechte. Aber IT-Sec steht gleich bei dir.", m: 5, fl: 0, al: 20, cr: 50 }
        }
    },
    {
        id: "sq_salary_leak",
        kind: "phone",
        appName: "Signal",
        title: "Unbekannte Nummer",
        startNode: "root",
        nodes: {
            "root": {
                text: "Anon: 'Ich habe die Gehaltsliste gefunden. Kevin kriegt mehr als du! Hier ist das PDF. Willst du es haben für deinen Chef?'",
                opts: [
                    { t: "Her damit! Schick rüber.", next: "proof" },
                    { t: "Nein, zu riskant", next: "ignore" }
                ]
            },
            "proof": {
                text: "Datei empfangen: 'Gehalt_Kevin.pdf'. Das ist Sprengstoff! Du speicherst die Datei sofort in deinem sicheren Ordner.",
                opts: [
                    { t: "Speichern", next: "loot_it" }
                ]
            }
        },
        results: {
            "ignore": { txt: "Du lehnst ab. Du gehst ohne Munition in den Kampf.", m: 2, fl: 5, al: 0, cr: 0 },
            "loot_it": { txt: "Du hast die Beweise gesichert. Jetzt hast du ein echtes Druckmittel.", m: 5, fl: 0, al: 10, cr: 0, loot: "arg_list_2" }
        }
    },
    {
        id: "sq_chantal_help",
        kind: "phone",
        appName: "Instagram",
        title: "Chantal (DM)",
        startNode: "root",
        nodes: {
            "root": {
                text: "Hii! Kannst du mein Insta liken? Ich brauche 500 Likes für die Firmen-Kampagne 'WeLoveIT'. Sonst krieg ich Ärger vom Chef!\n\nChantal: 'Bitte! Wenn ich die Quote nicht schaffe, streicht er das Marketing-Budget!'",
                opts: [
                    { t: "Liken & Teilen", next: "like" },
                    { t: "Ignorieren", next: "ignore" },
                    { t: "Nur gegen eine Gegenleistung...", next: "deal" }
                ]
            },
            "deal": {
                text: "Chantal: 'Okay, okay! Ich verrate dir, wer auf der internen Abschussliste steht. Deal?'",
                opts: [
                    { t: "Deal! Her damit.", next: "info_win" }
                ]
            }
        },
        results: {
            "like": { txt: "Du hast geliked. Chantal freut sich. Du hast Zeit verschwendet, aber Chantal schuldet dir was.", m: 2, fl: 5, al: -5, cr: 0 },
            "ignore": { txt: "Du ignorierst es. Chantal schafft die Quote nicht. Der Chef tobt im Flur. Die Stimmung ist im Keller.", m: 1, fl: 0, al: 10, cr: 0 },
            "info_win": { txt: "Du hast die Infos bekommen! Es ist die berüchtigte Schwarze Liste der HR. Ein mächtiges Werkzeug.", m: 10, fl: 0, al: 0, cr: 0, loot: "secret_list" }
        }
    },
    {
        id: "sq_kevin_origin_2",
        kind: "phone",
        reqStory: "kevin_trust",
        title: "Kevins geniale Idee",
        appName: "BroChat",
        startNode: "intro",
        nodes: {
            "intro": {
                text: "KEVIN: 'Bro! Der Server schnurrt wie ein Kätzchen. Aber er sieht voll langweilig aus. Hab hier 50 Meter RGB-LED-Stripes vom Gaming-PC übrig. Soll ich den Serverraum tunen?'",
                opts: [
                    { t: "Klar! RGB macht alles schneller! (+FPS)", next: "rgb_yes" },
                    { t: "Fass. Nichts. An.", next: "rgb_no" },
                    { t: "Nur Blau (kühlt besser)", next: "rgb_blue" }
                ]
            },
            "rgb_yes": {
                text: "KEVIN: 'Nice! Ich kleb das direkt auf die Lüfter! Das wird aussehen wie im Raumschiff Enterprise! Chef wird Augen machen!'",
                opts: [
                    { t: "Das will ich sehen.", next: "res_party" }
                ]
            },
            "rgb_no": {
                text: "KEVIN: 'Och man... du bist so ein Boomer. Dann kleb ich sie halt unter meinen Schreibtisch. Aber der Server bleibt grau und traurig.'",
                opts: [
                    { t: "Besser ist das.", next: "res_boring" }
                ]
            },
            "rgb_blue": {
                text: "KEVIN: 'Big Brain Move! Blaue LEDs = Kältere Luft = Overclocking! Du bist ein Genie. Ich mach das sofort.'",
                opts: [
                    { t: "Warte, das war ein Witz...", next: "res_blue" }
                ]
            }
        },
        results: {
            "res_party": { txt: "Kevin schickt ein Foto. Der Serverraum blinkt wie eine Dorfdisco. Du musst grinsen.", m: 20, fl: 15, al: -10, cr: 0 },
            "res_boring": { txt: "Kevin schmollt. Aber zumindest brennt der Server nicht ab. Du hast Verantwortung gezeigt. (Langweilig)", m: 5, fl: -5, al: 5, cr: -5 },
            "res_blue": { txt: "Zu spät. Kevin hat alles blau verkabelt. 'Temperatur ist um 0,1 Grad gesunken!', schreibt er. Na immerhin.", m: 20, fl: 5, al: -5, cr: 0 }
        }
    },
    {
        id: "sq_prince_return",
        kind: "phone",
        reqStory: "prince_active",
        title: "Dringende Rückforderung",
        appName: "TrustMeChat",
        startNode: "intro",
        nodes: {
            "intro": {
                text: "👑 PRINZ: 'My dearest friend! Bad news! There was a counter-revolution! My uncle is alive! He wants the money back! If not, he calls Interpol! Please send back NOW!'",
                opts: [
                    { t: "Geld zurücküberweisen (Sicher ist sicher)", next: "return_money" },
                    { t: "Blockieren & Behalten (Risiko!)", next: "keep_money" },
                    { t: "Lügen: 'Habe alles für Skins ausgegeben'", next: "troll_prince" }
                ]
            },
            "return_money": {
                text: "Du tippst die TAN ein. Die 10 Millionen verschwinden vom Konto. Du fühlst dich arm, aber moralisch überlegen.",
                opts: [
                    { t: "Ciao, Reichtum.", next: "res_returned" }
                ]
            },
            "keep_money": {
                text: "Du drückst auf 'Blockieren'. Die Nachrichten stoppen. Aber war das Klug? Draußen fährt ein schwarzer Van vorbei...",
                opts: [
                    { t: "Ich behalte meine Millionen!", next: "res_kept" }
                ]
            },
            "troll_prince": {
                text: "PRINZ: 'YOU WHAT?! Skins?! Are you crazy?! My head is on the line here! Send the rest! NOW!'",
                opts: [
                    { t: "Na gut, hier...", next: "return_money" },
                    { t: "Handy ausschalten", next: "res_kept" }
                ]
            }
        },
        results: {
            "res_returned": { 
                txt: "Prinz: 'You are a saint! I will name my firstborn Sysadmin.' Die Karte ist wertlos, aber dein Gewissen ist rein.", 
                m: 10, req: "black_card", loot: "prince_letter", fl: 0, al: -20, cr: -30 
            },
            "res_kept": { 
                txt: "Kontakt blockiert. Du behältst die Black Card. Aber dein Radar schlägt aus. Interpol beobachtet dich.", 
                m: 2, fl: 10, al: 0, cr: 40 
            }
        }
    },
    {
        id: "sq_team_gossip_1",
        kind: "phone",
        appName: "WhatsApp",
        title: "Gruppe: 'Die 3 von der Tankstelle'",
        startNode: "root",
        nodes: {
            "root": {
                text: "Chantal: 'Habt ihr gesehen, was ER heute anhat? Diese Krawatte schreit nach Midlife-Crisis.'\nKevin: 'Sieht aus wie ein Unfall im Malbuch. 😂'",
                opts: [
                    { t: "Mitlästern: 'Und die Schuhe erst!'", next: "join_in" },
                    { t: "Warnen: 'Vorsicht, IT sieht alles.'", next: "warn" },
                    { t: "Arbeiten: Handy weglegen.", next: "ignore" }
                ]
            },
            "join_in": {
                text: "Chantal: 'OMG JA! 💀 Du bist der Beste! Ich mach ein Meme draus.' Dein Handy vibriert ununterbrochen vor Lachen.",
                opts: [
                    { t: "Meme liken", next: "meme_like" }
                ]
            }
        },
        results: {
            "ignore": { 
                txt: "Du ignorierst den Chat. Chantal schreibt später: 'Langweiler'. Aber du hast gearbeitet.", 
                m: 2, fl: -5, al: 5, cr: -5
            },
            "warn": { 
                txt: "Kevin: 'Uuuh, Herr Wichtig hat Angst.' Sie lästern jetzt über dich, aber der Chef kriegt nichts mit.", 
                m: 2, fl: 0, al: 5, cr: 0 
            },
            "meme_like": { 
                txt: "Du kicherst laut am Platz. Dummerweise steht der Chef gerade hinter dir. Er sieht nichts, aber er merkt, dass du Spaß hast. Das macht ihn misstrauisch.", 
                m: 10, fl: 10, al: -10, cr: 15,
                next: "team_gossip_2"
            }
        }
    },
    {
        id: "sq_team_gossip_2",
        kind: "phone",
        appName: "Teams",
        title: "Nachricht vom Chef",
        reqStory: "team_gossip_2",
        startNode: "root",
        nodes: {
            "root": {
                text: "Chef: 'Herr Müller, ich höre viel Gelächter aus Ihrer Ecke. Haben wir die Quartalsziele schon erreicht? Oder warum ist die Stimmung so gut?'",
                opts: [
                    { t: "Lüge: 'Lache über einen Bug-Fix.'", next: "lie" },
                    { t: "Entschuldigung: 'Kame nicht wieder vor.'", next: "sorry" }
                ]
            }
        },
        results: {
            "lie": { 
                txt: "'Soso. Ein lustiger Bug. Zeigen Sie mir den doch mal.' Du stammelst. Er weiß Bescheid. 'Handy weg, Müller.'", 
                m: 5, fl: 0, al: 10, cr: 10
            },
            "sorry": { 
                txt: "'Besser ist das.' Er beobachtet dich jetzt genau.", 
                m: 2, fl: -5, al: 5, cr: 0 
            }
        }
    },
    {
        id: "sq_betting_pool",
        kind: "phone",
        appName: "Telegram",
        title: "Gruppe: 'Wettkönige'",
        startNode: "root",
        nodes: {
            "root": {
                text: "Jürgen (Vertrieb): 'So Männers! Heute Abend Bayern gegen Dortmund! Der Topf liegt bei 50€. Wer ist dabei? Einsatz 10€.'",
                opts: [
                    { t: "Dabei! (10€ setzen)", next: "bet_placed" },
                    { t: "Tippen: '2:1 für Bayern' (Ohne Geld)", next: "bet_chat" },
                    { t: "Melden: 'Glücksspiel ist verboten.'", next: "snitch" }
                ]
            }
        },
        results: {
            "bet_placed": { 
                txt: "Du bist drin. Jetzt checkst du alle 5 Minuten den Ticker auf dem Handy. Du arbeitest quasi gar nicht mehr.", 
                m: 30, fl: 15, al: -5, cr: 10
            },
            "bet_chat": { 
                txt: "Jürgen: 'Ohne Moos nix los, aber ich trag dich ein.' Ihr diskutiert 15 Minuten über Abseitsregeln.", 
                m: 15, fl: 10, al: -5, cr: 5 
            },
            "snitch": { 
                txt: "Du petzt beim Betriebsrat. Die Gruppe wird geschlossen. Jürgen wirft dir böse Blicke zu. Du bist der Alman des Monats.", 
                m: 5, fl: -10, al: 10, cr: -5
            }
        }
    },
    {
        id: "sq_gabi_sick",
        kind: "phone",
        appName: "Insta",
        title: "DM von Gabi_Rockt",
        startNode: "root",
        nodes: {
            "root": {
                text: "Gabi (Empfang) ist heute 'krank'. Sie schickt dir ein Foto: Sie mit Cocktail am Strand (Baggersee). \n'Glaubst du, ich kann das posten oder sieht der Chef das?'",
                opts: [
                    { t: "Ermutigen: 'Klar, er hat kein Insta!'", next: "encourage" },
                    { t: "Warnen: 'Bist du irre? Lass es.'", next: "warn" },
                    { t: "Erpressen: 'Nur wenn du mir was mitbringst.'", next: "blackmail" }
                ]
            }
        },
        results: {
            "encourage": { 
                txt: "Sie postet es. 1 Stunde später hörst du den Chef brüllen: 'WO IST FRAU MEIER?!'. Er hat wohl doch einen Fake-Account. Ups.", 
                m: 5, fl: 5, al: 5, cr: 10,
            },
            "warn": { 
                txt: "Gabi: 'Hast recht. Danke Bro! 😘'. Sie löscht es. Du hast ihr den Job gerettet.", 
                m: 2, fl: -5, al: -5, cr: 0 
            },
            "blackmail": { 
                txt: "Gabi: 'Arschloch. 🖕'. Aber sie postet es nicht. Du hast einen Feind mehr, aber Ruhe.", 
                m: 2, fl: -5, al: 10, cr: 0 
            }
        }
    }
    ],
	
	// === CHARAKTERE (Wall of Shame) ===
    chars: [
        { 
            name: "Kevin", 
            role: "Der Azubi", 
            img: "assets/chars/kevin.webp",
            icon: "🧢", 
            desc: "Sein 'Ups' kostet die Firma jährlich ca. 50.000€. Denkt, die 'Cloud' hat was mit dem Wetterbericht zu tun. Versucht ständig, Minecraft auf dem Server zu installieren." 
        },
        { 
            name: "Chantal", 
            role: "Marketing & Feel Good", 
            img: "assets/chars/chantal.webp",
            icon: "💅", 
            desc: "Nutzt Wörter wie 'Synergie' und 'Mindset', hat aber keine Ahnung, wie man eine PDF öffnet. Fordert täglich neue Apple-Produkte, weil die Farbe 'Holo-Pink' ihre Kreativität fördert." 
        },
        { 
            name: "Egon", 
            role: "Hausmeister", 
            img: "assets/chars/egon.webp",
            icon: "🔧", 
            desc: "Der wahre Herrscher des Gebäudes. Hasst Technik, liebt seine Schlüssel. Wenn du ihn fragst, war früher (1980) alles besser, besonders die Kabel." 
        },
        { 
            name: "Dr. Wichtig", 
            role: "Der CEO", 
            img: "assets/chars/wichtig.webp",
            icon: "👔", 
            desc: "Hat Visionen, die physikalisch unmöglich sind. Ruft gerne aus Tunneln an, um sich über schlechten Empfang zu beschweren. Denkt, KI kann Kaffee kochen." 
        },
        { 
            name: "Frau Elster", 
            role: "Buchhaltung", 
            img: "assets/chars/elster.webp",
            icon: "🦉", 
            desc: "Wächterin über Excel und den Kühlschrank. Hat Augen wie ein Luchs, wenn es um fehlende Belege oder falsche Mülltrennung geht. Ihr Kater 'Rüdiger' ist ihr einziger Freund." 
        },
        { 
            name: "Markus", 
            role: "Vertriebsleiter", 
            img: "assets/chars/markus.webp",
            icon: "💪", 
            desc: "Verkauft dem Kunden Dinge, die wir gar nicht haben. Brüllt gerne 'Zeit ist Geld!', während er Solitär spielt. Sein Drucker ist sein persönlicher Erzfeind." 
        },
        { 
            name: "Gabi", 
            role: "Empfang", 
            img: "assets/chars/gabi.webp",
            icon: "☎️", 
            desc: "Die Nachrichtenzentrale. Weiß alles über jeden, bevor es passiert. Ruft die IT, wenn die Maus leer ist (oder der Kaffee)." 
        },
        { 
            name: "Du (Müller)", 
            role: "SysAdmin", 
            img: "assets/chars/mueller.webp",
            icon: "💀", 
            desc: "Mädchen für alles. Brandlöscher. Seelsorger. Eigentlich wolltest du nur Computer reparieren, jetzt reparierst du Menschen. Dein Kaffee-Konsum ist medizinisch bedenklich." 
        }
    ],

    // === ERFOLGE (Für das Sammelalbum) ===
    achievements: [
        // EXTREME PLAYSTYLE
        { id: "ach_ascetic", icon: "🧘", title: "Der Asket", desc: "16 Uhr und kein Tropfen Kaffee. Du bestehst aus purer Willenskraft.", hint: "Überstehe fast den ganzen Tag, ohne das 'schwarze Gold' anzurühren." },
        { id: "ach_coffee", icon: "🫀", title: "Herzrasen", desc: "8 Tassen getrunken. Du kannst Farben hören und die Zeit anhalten.", hint: "Trinke eine medizinisch bedenkliche Menge Kaffee an einem Tag." },
        { id: "ach_ignore", icon: "👻", title: "Ghosting-Profi", desc: "5 Mails ignoriert. Deine 'Entf'-Taste glüht.", hint: "Lass deinen Posteingang links liegen und ignoriere Anfragen konsequent." },
        { id: "ach_hoarder", icon: "🛒", title: "Loot-Goblin", desc: "8 Items im Inventar. Dein Rucksack platzt.", hint: "Sammle alles ein, was nicht niet- und nagelfest ist, bis nichts mehr passt." },

        // STATS
        { id: "ach_lazy", icon: "🦥", title: "Faulpelz", desc: "80% Faulheit. Du hast das Nichtstun zur Kunstform erhoben.", hint: "Vermeide Arbeit so lange, bis deine Produktivität gegen Null geht." },
        { id: "ach_rage", icon: "🤬", title: "180 Puls", desc: "Nur noch ein dummer Anruf und es knallt. (95% Aggro)", hint: "Lass dich reizen, bis du kurz vor dem totalen Ausraster stehst." },

        // ITEMS & SKILLS
        { id: "ach_macgyver", icon: "🛠️", title: "MacGyver", desc: "Tape, Kabel, Schrauber & Handbuch. Du brauchst keine IT, du brauchst Kaugummi.", hint: "Sammle das komplette Werkzeug-Set für technische Notfälle." },
        { id: "ach_rich", icon: "💸", title: "Der Millionär", desc: "Du hast dem Prinzen vertraut. Kündigung ist raus!", hint: "Ignoriere den gesunden Menschenverstand und den Spam-Filter." },
        { id: "ach_hacker", icon: "💻", title: "Mr. Robot", desc: "Root-Rechte erhalten. Jetzt gehört das Netzwerk dir.", hint: "Finde einen Weg, dir illegale Admin-Rechte zu verschaffen." },

    // END GAME / ZEITABHÄNGIG
        { id: "ach_ninja", icon: "🥷", title: "Ninja", desc: "Fast unsichtbar für den Chef (bis 14 Uhr unbemerkt).", hint: "Bleib bis zum frühen Nachmittag komplett unter dem Radar." },
        { id: "ach_zen", icon: "🕊️", title: "Zen-Meister", desc: "15 Uhr und die Ruhe selbst (0 Aggro). Bist du überhaupt wach?", hint: "Erreiche den Nachmittag mit absoluter innerer Seelenruhe." },
        { id: "ach_workaholic", icon: "👔", title: "Streber", desc: "Bis 16 Uhr fast keine Faulheit. Du machst uns anderen schlecht!", hint: "Arbeite hart und halte deine Faulheit bis kurz vor Feierabend extrem niedrig." },
        { id: "ach_risk", icon: "🎢", title: "Drahtseilakt", desc: "Feierabend mit 9 offenen Tickets. Das war verdammt knapp.", hint: "Beende den Tag am absoluten Limit der erlaubten offenen Tickets." },
        { id: "ach_clean", icon: "✨", title: "Inbox Zero", desc: "Alle Tickets erledigt? Das System glaubt, es ist ein Fehler.", hint: "Abarbeiten! Der Ticket-Zähler muss leer sein." },
        { id: "ach_survivor", icon: "🌋", title: "Tanz auf dem Vulkan", desc: "Maximaler Stress (90/90) kurz vor Feierabend. Du brauchst Urlaub.", hint: "Beende den Tag mit gleichzeitig maximalem Stress und maximaler Wut." },

    // STORY ACHIEVEMENTS
        { id: "ach_mentor", icon: "👨‍👦", title: "Der Mentor", desc: "Du und Kevin: Vom Chaos-Azubi zum echten Admin.", hint: "Hilf dem Azubi aus der IT aus einer brenzligen Lage." },
        { id: "ach_ally", icon: "🤝", title: "Marketing-Allianz", desc: "Du und Chantal: Ein tödliches Team. Das Budget gehört euch.", hint: "Schließe einen Pakt mit der Marketing-Abteilung." },
        { id: "ach_rockstar", icon: "🤘", title: "Metal Queen", desc: "Du und Gabi: Laut, schnell und gegen den Rest der Welt.", hint: "Rette den Empfang vor dem nervlichen Zusammenbruch." },
        { id: "ach_keymaster", icon: "🚪", title: "Keymaster", desc: "Du und Egon: Ein stilles Bündnis. Dir stehen alle Türen offen.", hint: "Gewinne das Vertrauen des Hausmeisters." },
        { id: "ach_closer", icon: "💼", title: "The Closer", desc: "Du und Markus: Geld schläft nicht. Ihr habt den Deal gerettet.", hint: "Hilf dem Sales-Team beim Abschluss, wenn es drauf ankommt." },
        { id: "ach_cat_whisperer", icon: "🐈", title: "Katzenflüsterer", desc: "Du und Frau Elster: Freunde fürs Leben (und für Rüdiger).", hint: "Löse das Katzen-Problem der Buchhaltung." },
        { id: "ach_lore", icon: "🕯️", title: "Der Historiker", desc: "Du hast die Chronik gelesen. Jetzt weißt du, warum wir Disketten anbeten.", hint: "Finde und lies die geheime Geschichte der Firma." },
        { id: "ach_wolf", icon: "📈", title: "Wolf of Wall Street", desc: "Du hast den Chef besiegt. Der Vertrag gehört dir.", hint: "Gewinne die harte Verhandlung gegen den Endgegner." },

        // SONSTIGES
        { id: "ach_intranet", icon: "🌐", title: "Meister des Internets", desc: "Du hast die tiefsten, dunkelsten Tiefen des Firmen-Intranets erforscht.", hint: "Manche Firmen-Webseiten öffnet man nur in absoluter Panik." }
],
	
};
