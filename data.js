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
        id: "srv_lore_1",
        title: "Der vergessene Aktenschrank",
        text: "Hinter dem Mainframe steht ein verstaubter Schrank mit der Aufschrift 'VERTRAULICH'. Er ist leicht geöffnet. Oben drauf liegt eine Rolle Verpackungsmaterial.",
        opts: [
            { 
                t: "In den Akten wühlen", 
                loot: "secret_list", 
                next: "path_lore_list", 
                m: 20, f: 5, a: 0, c: 5, 
                r: "Du wühlst dich durch staubige Rechnungen, bis du sie findest: Die 'Schwarze Liste' der HR. Das ist pures Dynamit. Du steckst sie schnell ein. (Inventar +1)" 
            },
            { 
                t: "Die Luftpolsterfolie nehmen", 
                loot: "bubble_wrap", 
                next: "path_lore_bubble", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du entscheidest dich für das einfache Vergnügen. Die Folie wandert in deine Tasche. Manchmal ist Plastik besser als Wissen. (Inventar +1)" 
            },
            { 
                t: "Nichts anfassen und gehen", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du lässt die Geister der Vergangenheit ruhen. Manche Türen bleiben besser verschlossen." 
            }
        ]
    },
    {
        id: "srv_lore_2a",
        title: "Interne Ermittlung",
        reqStory: "path_lore_list",
        text: "Du hörst schwere Schritte im Gang. Es ist 'Der Cleaner' von der HR-Abteilung. Er sucht nach undichten Stellen. Die 'Schwarze Liste' in deiner Tasche fühlt sich plötzlich tonnenschwer an.",
        opts: [
            { 
                t: "Im Kabelschacht verstecken", 
                m: 15, f: -5, a: 15, c: -5, 
                r: "Du quetschst dich zwischen staubige Kabelstränge. Er geht vorbei, schnüffelt kurz in der Luft, verschwindet aber wieder. Dein Herz hämmert." 
            },
            { 
                t: "Liste zurückgeben", 
                rem: "secret_list",
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du fängst ihn ab. 'Habe ich gefunden. Lag da einfach rum.' Er nimmt sie wortlos, nickt dir zu und geht. Keine Beweise, kein Ärger. (Item entfernt)" 
            },
            { 
                t: "Mit Feuerlöscher ablenken", 
                req: "fire_ext",
                m: 5, f: 0, a: -5, c: 5, 
                r: "Ein kurzer Stoß CO2 sorgt für Nebel und Verwirrung. 'Feueralarm? Ich bin weg!' ruft er und rennt. Chaos ist dein Freund." 
            }
        ]
    },
    {
        id: "srv_lore_2b",
        title: "Taschenkontrolle",
        reqStory: "path_lore_bubble",
        text: "Der 'Cleaner' von HR fängt dich im Flur ab. 'Routinekontrolle. Wir suchen gestohlenes Firmeneigentum. Taschen leeren!' Er starrt auf deine ausgebeulte Hosentasche.",
        opts: [
            { 
                t: "Taschen bereitwillig zeigen", 
                m: 5, f: 0, a: -5, c: -5, 
                r: "Er findet... Luftpolsterfolie. Er rümpft die Nase. 'Nur Müll? Sie haben ja gar keinen Ehrgeiz.' Er lässt dich samt Folie stehen." 
            },
            { 
                t: "Empört verweigern", 
                m: 2, f: 0, a: 10, c: 5, 
                r: "'Das verstößt gegen meine Rechte!' Er notiert deinen Namen auf einer Liste, aber da er nichts beweisen kann, zieht er ab." 
            },
            { 
                t: "Bestechungs-Donut anbieten", 
                rem: "donut",
                m: 2, f: 5, a: -10, c: -5, 
                r: "Er starrt auf den alten Donut. Sein Magen knurrt. 'Na gut. Einmalige Ausnahme.' Er nimmt den Donut und verschwindet kauend. (Item entfernt)" 
            }
        ]
    },
    {
        id: "srv_sleep_1",
        title: "Das Karton-Lager",
        text: "Hinter den Racks stapeln sich alte Server-Verpackungen bis zur Decke. Eigentlich müsstest du sie zum Altpapier bringen. Aber wenn man sie geschickt anordnet, ergibt das eine blickdichte Höhle...",
        opts: [
            { 
                t: "Eine geheime Festung bauen", 
                next: "path_sleep_fort", 
                m: 60, f: 35, a: -10, c: 10, 
                r: "Du baust dir ein gemütliches Nest hinter der Kartonwand. Niemand kann dich hier sehen. Du machst ein Nickerchen und lässt das Bauwerk für 'zukünftige Notfälle' stehen." 
            },
            { 
                t: "Alles sofort entsorgen", 
                next: "path_sleep_trash", 
                m: 30, f: -10, a: 5, c: 0, 
                r: "Du schleppst die Kartons zum Container. Es ist langweilig und du schwitzt, aber der Serverraum ist jetzt wieder vorschriftsmäßig leer." 
            },
            { 
                t: "Schild 'RÜCKSENDUNG' dran kleben", 
                next: "path_sleep_label", 
                m: 5, f: 10, a: -5, c: 0, 
                r: "Du klebst wahllos Zettel auf die Stapel. Jetzt sieht es aus wie ein wichtiger Vorgang. Das Problem des 'Zukunfts-Ichs'." 
            }
        ]
    },
    {
        id: "srv_sleep_2a",
        title: "Der Festungs-Kommandant",
        reqStory: "path_sleep_fort",
        text: "Kevin steht vor deiner Karton-Festung. Er hat ein Passwort-Schild 'Eintritt nur für Coole' angebracht. 'Hey, Chef! Gute Bude. Ich hab WLAN-Kabel verlegt.'",
        opts: [
            { 
                t: "Ihn loben", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "'Gute Arbeit, Soldat.' Ihr verbringt 10 Minuten damit, über Festungs-Architektur zu reden. Die Produktivität ist im Keller, die Moral oben." 
            },
            { 
                t: "Festung abreißen", 
                m: 15, f: -5, a: 5, c: 0, 
                r: "Du bekommst Panik, dass der Chef es sieht. Du trittst die Kartons um. Kevin weint fast. 'Mein Schloss...'" 
            }
        ]
    },
    {
        id: "srv_sleep_2b",
        title: "Lob vom Chef",
        reqStory: "path_sleep_trash",
        text: "Der Chef geht durch den leeren, ordentlichen Gang, wo vorher die Kartons waren. Er nickt zufrieden. 'Endlich mal Ordnung hier. Müller, das war vorbildlich.'",
        opts: [
            { 
                t: "Bescheiden nicken", 
                m: 2, f: -5, a: -5, c: 10, 
                r: "Du sagst nichts und genießt den seltenen Moment der Anerkennung. Dein Standing in der Firma ist gestiegen." 
            },
            { 
                t: "Nach Gehaltserhöhung fragen", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "'Wegen der Kartons? Übertreiben Sie es nicht.' Die Stimmung kippt sofort wieder. Gier frisst Hirn." 
            }
        ]
    },
    {
        id: "srv_sleep_2c",
        title: "Der Logistik-Fehler",
        reqStory: "path_sleep_label",
        text: "Ein Kurierfahrer steht völlig verwirrt vor deinen 'Rücksendung'-Kartons. 'Ich soll das abholen? Aber auf dem Lieferschein steht 2018... und warum sind die leer?'",
        opts: [
            { 
                t: "Ihn überzeugen mitzunehmen", 
                m: 10, f: 5, a: -5, c: 10, 
                r: "Du redest so lange auf ihn ein, bis er sie genervt auflädt. 'Mir doch egal.' Weg ist weg. Du bist ein Genie." 
            },
            { 
                t: "Die Wahrheit sagen", 
                m: 30, f: -10, a: 5, c: -5, 
                r: "'Okay, ich war nur zu faul.' Du musst ihm helfen, alles zum Container zu tragen, während er dich beschimpft." 
            }
        ]
    },
    {
        id: "srv_tool_1",
        title: "Der externe Techniker",
        text: "Ein externer Dienstleister hat seinen Koffer im Serverraum offen stehen lassen. Er ist gerade rauchen. Ein hochwertiger Schraubendreher blitzt dich an.",
        opts: [
            { 
                t: "Einstecken", 
                loot: "screw", 
                next: "path_tool_theft", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "Meins. Werkzeug kann man immer brauchen. Du lässt den Rest unauffällig liegen. (Inventar +1)" 
            },
            { 
                t: "Das Chaos im Koffer sortieren", 
                next: "path_tool_sort", 
                m: 15, f: -5, a: -10, c: 0, 
                r: "Du kannst das Durcheinander nicht ansehen. Du sortierst Bits, Zangen und Kabelbinder nach Größe. Sehr befriedigend." 
            },
            { 
                t: "Deckel zu und warten", 
                next: "path_tool_wait", 
                m: 10, f: 5, a: 0, c: 0, 
                r: "Du klappst den Koffer zu, damit niemand anderes auf dumme Ideen kommt. Du bist heute der Wächter des Eigentums." 
            }
        ]
    },
    {
        id: "srv_tool_2a",
        title: "Vermisstenanzeige",
        reqStory: "path_tool_theft",
        text: "Der Techniker kommt zurück und wühlt hektisch in seinem Koffer. 'Wo ist mein Wera-Dreher?! Der lag genau hier! Das Ding kostet 40 Euro!' Er starrt dich an.",
        opts: [
            { 
                t: "Eiskalt lügen: 'Keine Ahnung.'", 
                m: 2, f: 0, a: -5, c: 15, 
                r: "Du zuckst mit den Schultern. 'Vielleicht hat ihn der Putztrupp?' Er flucht und tritt gegen das Rack. Er glaubt dir nicht ganz, aber er hat keine Beweise." 
            },
            { 
                t: "Kevin beschuldigen", 
                m: 5, f: 5, a: -10, c: -5, 
                r: "'Der Azubi war vorhin hier...' Der Techniker wird rot. 'Ich bring den Kleinen um!' Er stürmt raus. Du fühlst dich kurz schlecht, aber hey: Gratis Werkzeug." 
            },
            { 
                t: "Zurückgeben: 'Lag am Boden.'", 
                rem: "screw", 
                m: 5, f: 0, a: 5, c: -5, 
                r: "'Ach, den habe ich... äh... gesichert.' Du gibst ihn zähneknirschend zurück. Der Techniker reißt ihn dir aus der Hand. Dein Gewissen ist rein, deine Taschen sind leer." 
            }
        ]
    },
    {
        id: "srv_tool_2b",
        title: "Das Genie beherrscht das Chaos",
        reqStory: "path_tool_sort",
        text: "Der Techniker kommt zurück, sieht in den perfekt sortierten Koffer und wird blass. 'Wer... wer hat das angefasst? Ich finde NICHTS mehr! Mein System basiert auf Haufen-Logik!'",
        opts: [
            { 
                t: "Stolz: 'Gern geschehen.'", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "'Gern?! Ich brauche Stunden, um das wieder durcheinander zu bringen!' Er ruft seinen Chef an, um sich über 'interne Sabotage' zu beschweren." 
            },
            { 
                t: "Ihn über Effizienz belehren", 
                m: 20, f: -10, a: 5, c: 5, 
                r: "Du erklärst ihm das 5S-System. Er hört gar nicht zu, sondern wirft wütend alles wieder auf einen Haufen. Perlen vor die Säue." 
            },
            { 
                t: "Wortlos gehen", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du lässt den Barbaren in seinem Elend zurück. Manche Menschen wollen einfach nicht gerettet werden." 
            }
        ]
    },
    {
        id: "srv_tool_2c",
        title: "Sucheinsatz",
        reqStory: "path_tool_wait",
        text: "Der Techniker kommt zurück und wirkt verzweifelt. 'Verdammt, ich finde mein Crimp-Zange nicht. Ich muss in 10 Minuten fertig sein, sonst Vertragsstrafe.'",
        opts: [
            { 
                t: "Helfen zu suchen", 
                loot: "energy", 
                m: 15, f: -10, a: 5, c: -5, 
                r: "Ihr kriecht zusammen unter den Doppelboden. Du findest die Zange. 'Danke, Mann! Hier, nimm das.' Er wirft dir einen Energy Drink zu. (Inventar +1)" 
            },
            { 
                t: "Ihn auslachen", 
                m: 2, f: 5, a: -10, c: 5, 
                r: "'Profi am Werk, was?' Er zeigt dir den Mittelfinger. Deine Laune steigt, aber Freunde hast du dir nicht gemacht." 
            },
            { 
                t: "Kabelbinder schenken", 
                rem: "zip_ties", 
                m: 5, f: 0, a: -5, c: -5, 
                r: "'Vergiss die Zange, nimm die hier.' Er strahlt. 'Kabelbinder lösen alles.' Er pfuscht die Leitung zusammen und geht." 
            }
        ]
    },
    {
        id: "srv_bernd_1",
        title: "Tränen & Promille",
        text: "Du findest Bernd aus dem Vertrieb, der weinend zwischen den warmen Server-Racks sitzt und eine Flasche 'Glenfiddich' köpft. Er lallt: 'Meine Frau ist weg, mein Umsatz ist weg... alles ist weg.'",
        opts: [
            { 
                t: "Sich dazusetzen & mittrinken", 
                next: "path_bernd_drunk", 
                m: 45, f: 20, a: -50, c: 20, 
                r: "Ihr leert die Flasche. Bernd erzählt dir von seinem Traum, Alpakas zu züchten. Du erzählst ihm dein Root-Passwort (hoffentlich hast du das nur geträumt). Ihr seid beste Freunde." 
            },
            { 
                t: "Eiskalt bei HR verpetzen", 
                next: "path_bernd_snitch", 
                m: 10, f: -5, a: 0, c: -15, 
                r: "Du rufst anonym an. Zwei Minuten später wird Bernd von der Security rausgeschleift. Er ruft: 'Verrat! Et tu, Brute?!' Du fühlst dich schmutzig, aber dein Job ist sicher." 
            },
            { 
                t: "Ihm einen Energy Drink geben", 
                rem: "energy", 
                next: "path_bernd_hyper", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Hier, trink das und reiß dich zusammen, du Wrack.' Bernd ext die Dose unter Tränen. Seine Augen weiten sich schlagartig. 'Zucker... Koffein... LEISTUNG?!'" 
            }
        ]
    },
    {
        id: "srv_bernd_2a",
        title: "Katerstimmung",
        reqStory: "path_bernd_drunk",
        text: "Bernd steht plötzlich strahlend an deinem Schreibtisch. Er trägt eine Sonnenbrille und riecht nach Minze. 'Hey Partner! Wegen unserer Idee gestern... Ich habe die Domain alpaka-server-farm.de schon registriert!'",
        opts: [
            { 
                t: "Mitspielen: 'Klar, bin dabei.'", 
                m: 15, f: 10, a: -5, c: 5, 
                r: "Bernd drückt dich. 'Wir werden reich! Ich kümmere mich um das Heu, du um die IT.' Er geht pfeifend. Du hast jetzt ein Side-Business." 
            },
            { 
                t: "Panik: 'Ich war betrunken!'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Bernds Gesicht fällt zusammen. 'Oh. Ich dachte... das war echt.' Er schlurft traurig davon. Du fühlst dich wie ein Monster." 
            },
            { 
                t: "Nach weiterem Schnaps fragen", 
                m: 5, f: 5, a: -10, c: 10, 
                r: "'Ha! Guter Witz!' Bernd lacht laut. Zu laut. Der Chef schaut aus seinem Büro. Schnell weg hier." 
            }
        ]
    },
    {
        id: "srv_bernd_2b",
        title: "Erbe des Gefallenen",
        reqStory: "path_bernd_snitch",
        text: "Du gehst an Bernds leerem Schreibtisch vorbei. Er wurde 'freigestellt'. In seinem Mülleimer liegt noch sein Bürokram. Obenauf ein fast neuer Donut.",
        opts: [
            { 
                t: "Den Donut looten", 
                loot: "donut", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Schmeckt nach Sieg und Glasur. (Inventar +1)" 
            },
            { 
                t: "Seinen Tacker klauen", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Es ist ein guter Tacker. Swingline. Rot. Du streichelst ihn. Meins." 
            },
            { 
                t: "Ein schlechtes Gewissen haben", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du starrst auf den leeren Stuhl. Was, wenn du der Nächste bist? Der Gedanke verdirbt dir den Tag." 
            }
        ]
    },
    {
        id: "srv_bernd_2c",
        title: "The Wolf of Server Room",
        reqStory: "path_bernd_hyper",
        text: "Bernd rennt an dir vorbei. Er vibriert förmlich. Der Mix aus Whisky und Energy Drink hat etwas in ihm verändert. Er schreit ins Telefon: 'KAUFEN! VERKAUFEN! ALLES MUSS RAUS!'",
        opts: [
            { 
                t: "Ihn bewundern", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Er hat gerade dem Hausmeister einen Leasing-Vertrag für einen Besen verkauft. Beeindruckend." 
            },
            { 
                t: "Ihn bremsen wollen", 
                m: 10, f: -5, a: 10, c: 0, 
                r: "Du versuchst ihn zu beruhigen. Er starrt dich mit weit aufgerissenen Pupillen an. 'Zeit ist Geld! Aus dem Weg, Geringverdiener!' Er sprintet zum Aufzug." 
            },
            { 
                t: "Ihm WLAN-Passwörter verkaufen", 
                loot: "secret_list", 
                m: 15, f: 0, a: -5, c: 5, 
                r: "'Daten! Ich brauche Daten!' Er tauscht seine Kundenliste gegen das Gast-WLAN-Passwort. Ein fairer Deal unter Wahnsinnigen. (Inventar +1)" 
            }
        ]
    },
    {
        id: "srv_mining_1",
        title: "Hardware-Fund",
        text: "Hinter einem losen Bodenblech findest du ein ratterndes Gestell aus Grafikkarten. Es ist laut, heiß und riecht nach verbranntem Staub. Ein Klebezettel darauf sagt: 'NICHT ANFASSEN! MAMA RECHNET!'",
        opts: [
            { 
                t: "Laufen lassen (Gier)", 
                next: "path_mining_heat", 
                m: 5, f: 10, a: 0, c: 20, 
                r: "Du deckst es wieder zu. Passives Einkommen! Solange der Chef die Stromrechnung nicht prüft, bist du reich. (Zumindest theoretisch.)" 
            },
            { 
                t: "Stecker ziehen (Pflicht)", 
                next: "path_mining_crash", 
                m: 5, f: -5, a: 5, c: -5, 
                r: "Zack. Ruhe. Die Lüfter sterben mit einem traurigen Surren. Du fühlst dich verantwortungsbewusst und spaßbefreit." 
            },
            { 
                t: "Den USB-Stick an der Seite klauen", 
                loot: "usb_stick", 
                next: "path_mining_wallet", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "Das muss die Wallet sein! Du ziehst den Stick ab. Der Bildschirm wird schwarz. Egal, du bist jetzt Krypto-Millionär. (Inventar +1)" 
            }
        ]
    },
    {
        id: "srv_mining_2a",
        title: "Thermische Eskalation",
        reqStory: "path_mining_heat",
        text: "Der Feueralarm brüllt los. Aus dem Bodenblech, wo das Mining-Rig steht, steigt schwarzer Rauch auf. Es war wohl doch etwas zu viel Staub in den Lüftern.",
        opts: [
            { 
                t: "Mit Feuerlöscher draufhalten", 
                req: "fire_ext", 
                m: 10, f: 0, a: -5, c: -5, 
                r: "CO2-Nebel füllt den Raum. Das Feuer ist aus, die Hardware ist Schrott. Du meldest es als 'Spontane Selbstentzündung eines Switches'." 
            },
            { 
                t: "Panisch auspusten", 
                m: 5, f: 0, a: 20, c: 20, 
                r: "Du wedelst mit einem Handbuch. Es bringt nichts. Die Sprinkleranlage geht an. Du bist nass, der Serverraum ist nass. Das wird teuer." 
            },
            { 
                t: "Rennen und 'FEUER!' schreien", 
                m: 2, f: 5, a: 10, c: 15, 
                r: "Du evakuierst dich selbst ins Home-Office. Die Feuerwehr regelt das. Morgen wird es unangenehme Fragen geben." 
            }
        ]
    },
    {
        id: "srv_mining_2b",
        title: "Kritische Infrastruktur",
        reqStory: "path_mining_crash",
        text: "Zwei Stunden nachdem du das Rig abgeschaltet hast, stürmt der Chef rein. 'Müller! Das gesamte E-Mail-Archiv von 1990 bis 2005 ist offline! Das lief auf dem Legacy-Cluster hinter Rack 4!'",
        opts: [
            { 
                t: "Behaupten, es war ein Hacker", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "'Die Russen, Chef. Ganz sicher.' Er wird blass. 'Oh Gott. Meine Mails an die Sekretärin...' Er rennt raus. Du schaltest das Ding schnell wieder an." 
            },
            { 
                t: "Den 'Fehler' suchen und beheben", 
                req: "manual", 
                m: 30, f: -15, a: 10, c: -10, 
                r: "Mit dem Win95-Handbuch und viel Geduld bootest du das System neu. Es piept fröhlich. Die Mails sind wieder da. Niemand dankt dir." 
            },
            { 
                t: "Ehrlich sein: 'Ich hab's ausgemacht.'", 
                m: 5, f: 0, a: 0, c: 30, 
                r: "Der Chef starrt dich an. 'Sie haben das Backup-System für illegalen Stromverbrauch gehalten? Müller, ich weiß nicht, ob Sie zu schlau oder zu dumm für diesen Job sind.'" 
            }
        ]
    },
    {
        id: "srv_mining_2c",
        title: "Der Krypto-Schatz",
        reqStory: "path_mining_wallet",
        text: "Du sitzt in der Pause und steckst den geklauten USB-Stick in deinen Laptop. Deine Hände zittern. Sind da Bitcoins drauf? Dogecoins? Die Rente?",
        opts: [
            { 
                t: "Stick öffnen", 
                m: 10, f: 5, a: 10, c: 0, 
                r: "Ordner: 'Urlaub_Mallorca_98'. Es sind nur 500 Bilder von Egon in Badehose. Dein Trauma ist unbeschreiblich. Der Stick ist wertlos." 
            },
            { 
                t: "Stick formatieren (Beweise vernichten)", 
                rem: "usb_stick", 
                m: 5, f: 0, a: -5, c: -5, 
                r: "Sicher ist sicher. Du löschst alles und wirfst den Stick in den Müll. Kein Reichtum, aber auch keine Beweise. (Item entfernt)" 
            },
            { 
                t: "Stick an Kevin verkaufen", 
                rem: "usb_stick", 
                loot: "energy", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Hey Kevin, da sind Cheat-Codes drauf.' Kevin glaubt dir und gibt dir seine letzte Dose Energy Drink dafür. Ein guter Tausch. (Item verloren, Energy erhalten)" 
            }
        ]
    },
    {
        id: "srv_cable_1",
        title: "Kabel-Salat",
        text: "Du stolperst über ein loses Glasfaserkabel. Ein hässliches Knirschen. Ein rotes Licht am Haupt-Switch blinkt hektisch. Das halbe Netzwerk ist gerade gestorben.",
        opts: [
            { 
                t: "Mit Tape fixieren", 
                req: "tape",
                next: "path_cable_fix", 
                m: 10, f: -5, a: -5, c: -5, 
                r: "Du wickelst eine halbe Rolle Panzertape um den Bruch. Es sieht aus wie ein verarztetes Bein, aber das Licht wird grün. Nichts hält länger als ein Provisorium." 
            },
            { 
                t: "Am Stecker wackeln", 
                next: "path_cable_wiggle", 
                m: 2, f: 5, a: 10, c: 0, 
                r: "Du drückst, ziehst und betest. Das Licht springt auf Grün. Du atmest aus. Bloß nicht mehr anatmen." 
            },
            { 
                t: "Wegrennen und verstecken", 
                next: "path_cable_run", 
                m: 5, f: 10, a: -5, c: 15, 
                r: "Du verschwindest im Schatten der Racks. Niemand hat dich gesehen. Im Flur hörst du erste Schreie: 'Das Internet ist weg!'" 
            }
        ]
    },
    {
        id: "srv_cable_2a",
        title: "ISO-Zertifizierung",
        reqStory: "path_cable_fix",
        text: "Ein externer ISO-Prüfer steht vor deinem Tape-Meisterwerk. Er tippt mit dem Kugelschreiber auf den silbernen Klumpen am Glasfaserkabel. 'Ist das... DIN-normgerecht?'",
        opts: [
            { 
                t: "Behaupten, das sei eine Schirmung", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "'Spezial-Abschirmung gegen kosmische Strahlung.' Der Prüfer nickt beeindruckt und macht einen Haken. Kompetenz ist, wenn man sicher auftritt." 
            },
            { 
                t: "Zugeben, dass es das Internet zusammenhält", 
                m: 5, f: 0, a: 5, c: -5, 
                r: "Der Prüfer seufzt tief. 'Ich habe nichts gesehen. Aber wenn das brennt, kenne ich Sie nicht.' Er geht weiter." 
            },
            { 
                t: "Tape abreißen (Beweis vernichten)", 
                m: 5, f: 0, a: 20, c: 10, 
                r: "Du reißt das Tape ab. Das Kabel bricht sofort wieder. Das Netzwerk stirbt erneut. Der Prüfer starrt dich entsetzt an. 'Das war... mutig.'" 
            }
        ]
    },
    {
        id: "srv_cable_2b",
        title: "Der Wackelkontakt",
        reqStory: "path_cable_wiggle",
        text: "Der Chef betritt den Serverraum. Er tritt fest auf den Boden. Durch die Erschütterung verliert dein nur 'gewackeltes' Kabel den Kontakt. Das Licht am Switch springt auf Rot.",
        opts: [
            { 
                t: "Einreden, er sei statisch aufgeladen", 
                m: 5, f: 5, a: -5, c: 10, 
                r: "'Das ist Ihre Aura, Chef! Zu viel Energie!' Er wirkt geschmeichelt. 'Tatsächlich? Ich spüre auch so ein Kribbeln.' Er geht vorsichtig raus." 
            },
            { 
                t: "Heimlich dagegen treten", 
                m: 2, f: 0, a: 5, c: 5, 
                r: "Während er wegschaut, trittst du gegen das Rack. Das Licht wird grün. 'Selbstheilungskräfte', murmelst du. Puh." 
            },
            { 
                t: "Sofortige Not-Wartung vortäuschen", 
                m: 15, f: -5, a: 5, c: 0, 
                r: "'Alarm! Kritischer Fehler!' Du scheuchst den Chef raus und wackelst wieder am Kabel. Es hält... für jetzt." 
            }
        ]
    },
    {
        id: "srv_cable_2c",
        title: "Die Hacker-Theorie",
        reqStory: "path_cable_run",
        text: "Im Flur herrscht Panik. Dr. Wichtig steht auf einem Stuhl. 'Wir werden angegriffen! Das ist Cyber-Warfare! Jemand hat die Leitung physisch gekappt!' Alle schauen sich misstrauisch an.",
        opts: [
            { 
                t: "Die 'Ermittlung' leiten", 
                m: 10, f: 5, a: -5, c: -10, 
                r: "Du spielst Sherlock Holmes. 'Es war... eine Ratte. Ich habe Bissspuren gesehen.' Der Chef nickt. 'Kaufen Sie Gift.' Du bist fein raus." 
            },
            { 
                t: "Kevin beschuldigen", 
                m: 2, f: 5, a: -5, c: -5, 
                r: "'Ich sah Kevin in der Nähe des Racks...' Die Menge tobt. Kevin wird zum Verhör geschleift. Dein Karma ist im Keller, aber du bist sicher." 
            },
            { 
                t: "Still in der Ecke stehen", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du sagst nichts und hoffst, dass niemand deine Schuhabdrücke auf dem Kabel sieht. Der Angstschweiß läuft dir den Rücken runter." 
            }
        ]
    },
    {
        id: "srv_drink_1",
        title: "Vergessener Snack",
        text: "Auf einem warmen Server-Rack steht eine einsame Dose 'Cyber-Fuel'. Sie ist noch zu, aber das Mindesthaltbarkeitsdatum ist eine vage Erinnerung.",
        opts: [
            { 
                t: "Sofort trinken", 
                next: "path_drink_now", 
                m: 5, f: -15, a: -15, c: 0, 
                r: "ZISCH. Die warme Brühe schmeckt nach Gummibärchen und Herzrasen. Du fühlst dich unbesiegbar (für ca. 20 Minuten)." 
            },
            { 
                t: "Für später einstecken", 
                loot: "energy", 
                next: "path_drink_keep", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Man weiß nie, wann man einen chemischen Boost braucht. Ab in die Tasche damit. (Inventar +1)" 
            },
            { 
                t: "Stehen lassen", 
                next: "path_drink_ignore", 
                m: 0, f: 5, a: 0, c: 0, 
                r: "Du traust keiner Flüssigkeit, die im Dunkeln leuchtet. Du lässt sie für die Server-Goblins stehen." 
            }
        ]
    },
    {
        id: "srv_drink_2a",
        title: "Der Zucker-Crash",
        reqStory: "path_drink_now",
        text: "Dein Magen grummelt bedrohlich. Das 'Cyber-Fuel' war wohl doch schon etwas älter. Oder radioaktiv. Dein linkes Augenlid zuckt unkontrolliert.",
        opts: [
            { 
                t: "Auf der Toilette verstecken", 
                m: 20, f: 10, a: 5, c: -5, 
                r: "Sicher ist sicher. Du verbringst 20 Minuten in der Kachel-Abteilung. Produktivität: Null. Überlebenswille: Hoch." 
            },
            { 
                t: "Weiterarbeiten und zittern", 
                m: 10, f: -5, a: 20, c: 5, 
                r: "Du versuchst zu tippen, aber deine Hände vibrieren so stark, dass du aus Versehen drei Tickets gleichzeitig schließt. Effizienz durch Panik." 
            },
            { 
                t: "Wasser nachtrinken", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du spülst den Chemie-Geschmack am Wasserspender weg. Das Zucken hört auf. Du lebst noch." 
            }
        ]
    },
    {
        id: "srv_drink_2b",
        title: "Klebrige Angelegenheit",
        reqStory: "path_drink_keep",
        text: "Du greifst in deine Tasche und fasst in etwas Nasses. Die Dose 'Cyber-Fuel' hatte wohl ein mikroskopisches Leck. Alles klebt.",
        opts: [
            { 
                t: "Alles sauber machen", 
                rem: "energy", 
                m: 15, f: -5, a: 10, c: 0, 
                r: "Du fluchst und schrubbst deine Hose mit Papiertüchern ab. Die Dose ist leer, deine Laune im Keller. (Item entfernt)" 
            },
            { 
                t: "Egal, Hauptsache Koffein", 
                rem: "energy", 
                m: 5, f: -10, a: -5, c: 5, 
                r: "Du leckst die Reste von den Fingern und trinkst den kläglichen Rest aus der Dose. Es ist würdelos, aber es wirkt." 
            },
            { 
                t: "Den Azubi um Hilfe bitten", 
                m: 5, f: 5, a: -5, c: -5, 
                r: "'Kevin, hast du Feuchttücher?' Kevin grinst. 'Klar, Gamer-Standard-Ausrüstung.' Er hilft dir, die klebrige Tasche zu reinigen." 
            },
            {
                t: "Moment... die ist ja leer?",
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du merkst, dass es nur alte Reste waren. Du hast die Dose ja schon längst getrunken."
            }
        ]
    },
    {
        id: "srv_drink_2c",
        title: "Kevins Fund",
        reqStory: "path_drink_ignore",
        text: "Kevin kommt mit weit aufgerissenen Augen aus dem Serverraum. Er hält die Dose in der Hand. 'Boah! Vintage Cyber-Fuel von 2012! Sammlerstück!'",
        opts: [
            { 
                t: "Ihm sagen, dass er es nicht trinken soll", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Zu spät!' Kevin ext die Dose. Er fängt an, Farben zu riechen. Du hast es versucht." 
            },
            { 
                t: "Ihm viel Spaß wünschen", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Darwin regelt das. Du gehst Kaffee holen." 
            },
            { 
                t: "Ihm um den Pfand beneiden", 
                m: 1, f: 0, a: 5, c: 0, 
                r: "25 Cent. Du hättest reich sein können. Verdammt." 
            }
        ]
    },
    {
        id: "srv_extinguisher_1",
        title: "Sicherheits-Check",
        text: "Hinter einem vergilbten CRT-Monitor findest du einen Feuerlöscher. Er ist staubig. Laut Plakette war die letzte Prüfung 1998.",
        opts: [
            { 
                t: "Einstecken", 
                loot: "fire_ext", 
                next: "path_ext_loot", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Du wuchtest das schwere Ding in dein Inventar. Man weiß nie, wann man ein Feuer löschen (oder eine Tür einschlagen) muss. (Inventar +1)" 
            },
            { 
                t: "Kurzer Funktionstest", 
                next: "path_ext_trap", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du drückst den Hebel nur ganz kurz. Ein Zischen... und dann klemmt das Ventil. PFFFFFFT!" 
            },
            { 
                t: "Vollständiges DIN-Audit durchführen", 
                next: "path_ext_audit", 
                m: 60, f: -30, a: 10, c: -20, 
                r: "Du holst Putzzeug, eine Lupe und das Prüfprotokoll. Du verbringst eine Stunde damit, Roststellen zu dokumentieren. Vorbildlich!" 
            }
        ]
    },
    {
        id: "srv_extinguisher_2a",
        title: "Schwertransport",
        reqStory: "path_ext_loot",
        text: "Du schleppst den Feuerlöscher durch den Gang. Er wiegt gefühlt 20 Kilo und schlägt dir ständig gegen das Schienbein. Egon der Hausmeister sieht dich kritisch an.",
        opts: [
            { 
                t: "Sagen, dass du ihn zur Wartung bringst", 
                m: 10, f: -5, a: 5, c: -5, 
                r: "Egon nickt anerkennend. 'Guter Mann. Sicherheit ist kein Spielzeug.' Er lässt dich passieren." 
            },
            { 
                t: "Ihn als Türstopper benutzen", 
                rem: "fire_ext", 
                m: 5, f: 10, a: -5, c: 5, 
                r: "Du hast keine Lust mehr zu schleppen. Du stellst ihn vor die Serverraum-Tür. Jetzt bleibt sie offen und es wird kühler. (Item entfernt)" 
            },
            { 
                t: "Training: Bizeps-Curls machen", 
                m: 20, f: -10, a: -20, c: 10, 
                r: "Du nutzt das Gewicht für ein spontanes Workout im Gang. Deine Arme brennen, deine Aggro sinkt. Egon schüttelt nur den Kopf." 
            }
        ]
    },
    {
        id: "srv_extinguisher_2b",
        title: "Winter Wonderland",
        reqStory: "path_ext_trap",
        text: "Der 'kurze Test' von vorhin ist eskaliert. Der halbe Serverraum ist mit weißem Löschpulver bedeckt. Es sieht aus wie in 'Scarface', nur staubiger. Der Lüfter verteilt es überall hin.",
        opts: [
            { 
                t: "Alles selbst putzen", 
                m: 120, f: -50, a: 30, c: -10, 
                r: "Zwei Stunden. Du kriechst zwei Stunden lang mit einem Lappen durch den Raum. Deine Faulheit ist im Keller, deine Wut auf dem Höhepunkt." 
            },
            { 
                t: "Flüchten und Tür abschließen", 
                m: 5, f: 10, a: -5, c: 30, 
                r: "Du rennst raus. 'Keine Ahnung, das muss eine Fehlfunktion der Anlage sein!' Hoffentlich glaubt man dir." 
            },
            { 
                t: "Es als Kunst-Installation verkaufen", 
                m: 15, f: 5, a: 0, c: 15, 
                r: "Du klebst ein Schild 'VERGÄNGLICHKEIT' an das Rack. Der Chef kommt vorbei: 'Interessant. Aber machen Sie es weg.' Zeit verschwendet." 
            }
        ]
    },
    {
        id: "srv_extinguisher_2c",
        title: "Der Bürokrat",
        reqStory: "path_ext_audit",
        text: "Nach deinem einstündigen Audit kommt Dr. Wichtig vorbei. Er sieht deine Checklisten und Tabellen neben dem Feuerlöscher. Er wirkt überrascht.",
        opts: [
            { 
                t: "Bericht stolz präsentieren", 
                m: 15, f: -5, a: -5, c: -15, 
                r: "'Das Gerät entspricht nicht der Norm DIN-1402.' Der Chef nickt. 'Müller, ich mag Ihre Gründlichkeit. Weitermachen.' (Großer Radar-Bonus)" 
            },
            { 
                t: "Überstunden dafür beantragen", 
                m: 10, f: 0, a: 10, c: 20, 
                r: "'Überstunden? Fürs Staubwischen? Träumen Sie weiter.' Der positive Effekt ist verpufft." 
            },
            { 
                t: "Ihn bitten, das Protokoll zu signieren", 
                m: 30, f: -10, a: 5, c: 0, 
                r: "Du zwingst ihn in eine 30-minütige Diskussion über Brandschutzverordnungen. Er unterschreibt, nur damit du aufhörst zu reden." 
            }
        ]
    },
    {
        id: "srv_manual_1",
        title: "Tragendes Wissen",
        text: "Ein dickes, vergilbtes Buch klemmt unter einem wackeligen Tischbein: 'Windows 95 - Das Handbuch'. Es trägt die Last von drei Monitoren und einem Switch.",
        opts: [
            { 
                t: "Rausziehen und einstecken", 
                loot: "manual", 
                next: "path_man_taken", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Mit einem Ruck ziehst du es raus. Der Tisch sackt 2cm ab. Der Monitor oben drauf schwankt bedrohlich. Aber hey: Antikes Wissen! (Inventar +1)" 
            },
            { 
                t: "Liegen lassen", 
                next: "path_man_leave", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Never touch a running system. Das gilt auch für Möbel. Du lässt die Statik intakt und das Buch verstauben." 
            },
            { 
                t: "Vor Ort darin blättern", 
                next: "path_man_study", 
                m: 30, f: 10, a: -10, c: 0, 
                r: "Du hockst dich auf den Boden und liest das Kapitel über 'IRQ-Konflikte'. Eine einfachere Zeit. Du fühlst dich entspannt, aber deine Beine sind eingeschlafen." 
            }
        ]
    },
    {
        id: "srv_manual_2a",
        title: "Schieflage",
        reqStory: "path_man_taken",
        text: "Der Tisch ohne das Handbuch-Bein vibriert durch die Server-Lüfter so stark, dass der teure Core-Switch langsam Richtung Abgrund rutscht. Gleich fällt er.",
        opts: [
            { 
                t: "Handbuch wieder drunterschieben", 
                rem: "manual", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du opferst das Wissen für die Sicherheit. Der Tisch steht wieder stabil. Dein Inventar ist leerer, dein Gewissen reiner. (Item entfernt)" 
            },
            { 
                t: "Pappe falten und drunterschieben", 
                m: 15, f: -10, a: 5, c: 0, 
                r: "Du bastelst aus einer Pizza-Schachtel einen Ersatz-Keil. Es hält nicht ganz so gut und sieht furchtbar aus, aber du darfst das Buch behalten." 
            },
            { 
                t: "Switch mit Tape festkleben", 
                req: "tape", 
                m: 5, f: 5, a: 0, c: -5, 
                r: "Wenn es sich bewegt und es sich nicht bewegen soll: Panzertape. Du klebst den Switch einfach an den Tisch. Problem gelöst." 
            }
        ]
    },
    {
        id: "srv_manual_2b",
        title: "5S-Audit",
        reqStory: "path_man_leave",
        text: "Ein 'Lean-Management-Berater' kriecht durch den Serverraum. Er zeigt auf das Handbuch unter dem Tischbein. 'Das ist kein definierter Lagerplatz für Dokumentation. Das muss weg.'",
        opts: [
            { 
                t: "Erklären, dass es ein Lastverteiler ist", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Du schwafelst was von 'Schwingungsdämpfung nach DIN-Norm'. Der Berater macht sich Notizen. 'Kreative Lösung.' Er klebt einen 'Geprüft'-Aufkleber auf das Buch." 
            },
            { 
                t: "Ihm erlauben, es zu entfernen", 
                m: 5, f: 10, a: 0, c: 0, 
                r: "Er zieht es triumphierend raus. Der Tisch kippt. Der Monitor fällt ihm auf den Fuß. Du lachst innerlich. Das Audit ist beendet." 
            },
            { 
                t: "Ihn ignorieren", 
                m: 2, f: 5, a: 5, c: 10, 
                r: "Er schreibt 'Mangelhafte Ordnung' in seinen Bericht. Das gibt Ärger, aber wenigstens hast du nicht mit ihm geredet." 
            }
        ]
    },
    {
        id: "srv_manual_2c",
        title: "Legacy-Support",
        reqStory: "path_man_study",
        text: "Der Chef kommt rein. 'Müller! Wir haben noch einen 486er im Keller, der die Türsteuerung regelt. Er verlangt eine IRQ-Zuweisung für die Soundkarte. Wissen Sie zufällig, was das ist?'",
        opts: [
            { 
                t: "Sofort die Lösung nennen", 
                m: 5, f: -5, a: -10, c: -20, 
                r: "'IRQ 5, DMA 1, Adresse 220.' Du hast es gerade gelesen. Der Chef starrt dich an wie einen Gott. 'Müller, Sie sind ein Genie.' (Massiver Radar-Bonus)" 
            },
            { 
                t: "So tun, als müsstest du recherchieren", 
                m: 60, f: 20, a: 0, c: 0, 
                r: "Du weißt es zwar, aber du sagst: 'Das ist hochkomplex. Dauert 2 Stunden.' Du gehst entspannt Kaffee trinken. Der Chef wartet ehrfürchtig." 
            },
            { 
                t: "Sagen: 'Kaufen Sie was Neues'", 
                m: 5, f: 0, a: 5, c: 10, 
                r: "'Kein Budget!', blafft er zurück. Chance vertan, zu glänzen." 
            }
        ]
    },
    {
        id: "srv_rat_1",
        title: "Das seltsame Geräusch",
        text: "Aus Rack 4 kommt ein kratzendes Geräusch. Es klingt nicht wie ein Lüfter. Eher wie... scharfe Zähne auf teurem Glasfaserkabel. Etwas Lebendiges nistet sich in der Firewall ein.",
        opts: [
            { 
                t: "Dagegen treten", 
                next: "path_rat_kick", 
                m: 5, f: 0, a: 10, c: 5, 
                r: "BAM! Du trittst fest gegen das Blech. Es quiekt panisch, dann ist absolute Stille. Du wartest kurz... nichts mehr. Problem pragmatisch gelöst." 
            },
            { 
                t: "Donut als Köder", 
                req: "donut", 
                next: "path_rat_feed", 
                m: 10, f: 5, a: -10, c: 0, 
                r: "Du brichst ein Stück ab und legst es vor den Kabelschacht. Ein Schatten huscht heraus, schnappt den Köder und verschwindet lautlos. Ruhe." 
            },
            { 
                t: "Kammerjäger rufen", 
                next: "path_rat_call", 
                m: 15, f: 5, a: 0, c: 5, 
                r: "Du erstellst ein Ticket beim Gebäudemanagement. Priorität: Hoch. Status: 'In Bearbeitung'. Du hast deine Pflicht getan und gehst." 
            }
        ]
    },
    {
        id: "srv_rat_2a",
        title: "Kollateralschaden",
        reqStory: "path_rat_kick",
        text: "Dein Monitoring-Dashboard leuchtet rot wie ein Weihnachtsbaum. Der Uplink in Rack 4 ist tot. Offenbar hat dein Tritt vorhin nicht nur die Ratte vertrieben, sondern auch etwas gelöst.",
        opts: [
            { 
                t: "Kabel tauschen", 
                req: "cable", 
                m: 15, f: -5, a: -5, c: -10, 
                r: "Du findest das durchtrente Kabel (Bissspuren oder Riss?). Egal. Du steckst ein neues Patchkabel. Link ist da. Niemand hat was gesehen." 
            },
            { 
                t: "Flicken mit Tape", 
                req: "tape", 
                m: 10, f: 0, a: 5, c: 5, 
                r: "Du fummelst die Adern zusammen und isolierst sie. 'Temporary Fix' nennst du das. Es hält... vorerst." 
            },
            { 
                t: "Es auf 'Sonnenwinde' schieben", 
                m: 2, f: 10, a: -5, c: 20, 
                r: "Du schickst eine Rundmail: 'Atmosphärische Störungen'. Die Leute glauben alles, solange es technisch klingt. Du machst nichts." 
            }
        ]
    },
    {
        id: "srv_rat_2b",
        title: "Ein neuer Freund",
        reqStory: "path_rat_feed",
        text: "Du gehst nochmal an Rack 4 vorbei. Da sitzt sie wieder. Die Ratte, die du gefüttert hast. Sie wirkt satt und entspannt. Sie hat sogar eine tote Kakerlake für dich 'gefangen'.",
        opts: [
            { 
                t: "Als 'Junior Admin' behalten", 
                m: 5, f: 10, a: -10, c: 0, 
                r: "Du nennst sie 'Splinter'. Sie wohnt jetzt hinter dem Patchpanel. Das effektivste Anti-Bug-System der Firma." 
            },
            { 
                t: "Hausmeister rufen", 
                m: 10, f: 0, a: 0, c: 0, 
                r: "Doch lieber keine Haustiere. Egon kommt und kümmert sich 'diskret' darum. Du guckst weg." 
            }
        ]
    },
    {
        id: "srv_rat_2c",
        title: "Ticket geschlossen",
        reqStory: "path_rat_call",
        text: "Eine E-Mail ploppt auf: 'Ticket #492 (Nagetier) geschlossen. Grund: Kein Zugangsschlüssel.' Zeitgleich fällt das Internet aus. Die Ratte hatte viel Zeit zum Kauen.",
        opts: [
            { 
                t: "Panik-Reparatur", 
                m: 30, f: -20, a: 20, c: -10, 
                r: "Du musst den ganzen Kabelstrang neu verlegen, während der Chef dir im Nacken atmet. Hättest du es mal gleich selbst gemacht." 
            },
            { 
                t: "Den Provider beschuldigen", 
                m: 5, f: 5, a: -5, c: 15, 
                r: "'Telekom-Bagger hat Leitung gekappt.' Der Klassiker. Alle nicken verständnisvoll und gehen früher heim. Du bist fein raus." 
            }
        ]
    },
    {
        id: "srv_cold_1",
        title: "Die Kälte-Falle",
        text: "Jemand hat die Klimaanlage auf 16 Grad gestellt und den Türgriff von innen abgebrochen. Du bist eingesperrt und frierst!",
        opts: [
            { 
                t: "Mit Hammer Tür einschlagen", 
                req: "hammer",
                next: "path_cold_break", 
                m: 15, f: -5, a: -10, c: 20, 
                r: "BÄM! Tür offen. Du fühlst dich wie Thor. Holzsplitter liegen überall. Der Chef wird Fragen zum Türblatt haben, aber du bist frei." 
            },
            { 
                t: "Handy nutzen & Hilfe rufen", 
                next: "path_cold_call", 
                m: 60, f: 0, a: 20, c: -10, 
                r: "Du musstest den Hausmeister anrufen. Er hat 45 Minuten gebraucht, um den Ersatzschlüssel zu finden. Du bist jetzt ein Eisblock." 
            },
            { 
                t: "An den Servern wärmen", 
                m: 90, f: 20, a: 10, c: 0, 
                r: "Du hast dich hinter die Abluft der CPU gekuschelt und geschlafen, bis zufällig jemand die Tür von außen geöffnet hat. Gemütlich." 
            }
        ]
    },
    {
        id: "srv_cold_2a",
        title: "Der Schreiner",
        reqStory: "path_cold_break",
        text: "Ein externer Schreiner steht kopfschüttelnd vor der Serverraum-Tür, die heute Morgen 'jemand' (du) mit Gewalt geöffnet hat. Er flucht über die Splitter.",
        opts: [
            { 
                t: "Ihm Panzertape anbieten", 
                req: "tape", 
                m: 5, f: 5, a: 0, c: -5, 
                r: "'Damit kriegen Sie das wieder hin, Meister.' Er starrt dich böse an. 'Das ist Echtholzfurnier, kein Karton!' Er lehnt dankend ab." 
            },
            { 
                t: "Behaupten, es war die Feuerwehr", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "'Gefahr im Verzug, wissen Sie.' Der Schreiner nickt verständnisvoll. 'Ach so. Ja, die Jungs sind grob.' Dein Geheimnis ist sicher." 
            },
            { 
                t: "Helfen, die Späne aufzufegen", 
                m: 15, f: -5, a: 5, c: 0, 
                r: "Das schlechte Gewissen plagt dich. Du hilfst ihm beim Aufräumen. Er brummt: 'Wenigstens einer, der anpackt.'" 
            }
        ]
    },
    {
        id: "srv_cold_2b",
        title: "Schloss-Austausch",
        reqStory: "path_cold_call",
        text: "Egon, der Hausmeister, kniet vor der Serverraum-Tür und montiert ein neues Schloss. Er sieht dich kommen. 'Na, wieder aufgetaut? Ich bau jetzt eins ein, das man auch von innen aufkriegt.'",
        opts: [
            { 
                t: "Ihm einen Kaffee bringen", 
                m: 10, f: 0, a: -5, c: 5, 
                r: "Du holst ihm einen Automatenkaffee. 'Danke Jung.' Er wirkt versöhnt. Kleine Geschenke erhalten die Freundschaft (und schnelle Rettung)." 
            },
            { 
                t: "Fachsimpeln", 
                m: 5, f: 5, a: 5, c: -5, 
                r: "'Ist das auch ein Zylinder nach DIN 18252?' Egon verdreht die Augen. 'Lass mich einfach arbeiten.' Du nervst ihn." 
            },
            { 
                t: "Schnell vorbei schleichen", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Bloß kein Augenkontakt. Die Peinlichkeit von vorhin sitzt noch tief. Du huschst in den Serverraum." 
            }
        ]
    },
    {
        id: "srv_red_1",
        title: "Die rote Flüssigkeit",
        text: "Unter Rack 7 bildet sich eine Pfütze. Sie ist tiefrot und klebrig. Es riecht süßlich. Ist das... Blut? Hydrauliköl? Oder Sirup? Über dir verläuft eigentlich keine Leitung.",
        opts: [
            { 
                t: "Todesmutig den Finger reinstecken & probieren", 
                next: "path_red_taste", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Es ist... Kirsch-Slushie?! Jemand hat hier eine illegale Slushie-Maschine versteckt. Du zapfst dir heimlich einen Becher ab und gehst zufrieden weiter." 
            },
            { 
                t: "Panik: Großalarm auslösen!", 
                next: "path_red_alarm", 
                m: 10, f: -5, a: 10, c: 5, 
                r: "Du drückst den Notfallknopf. Sirenen heulen los. 'BIOHAZARD!' Du rennst raus und lässt die Feuerwehr den Rest machen. Erstmal Sicherheit." 
            },
            { 
                t: "Einfach aufwischen & ignorieren", 
                m: 15, f: 0, a: 0, c: -5, 
                r: "Du wischst die Pfütze mit Taschentüchern weg. Was man nicht weiß, macht einen nicht heiß. Der Boden klebt zwar noch etwas, aber es sieht sauber aus." 
            }
        ]
    },
    {
        id: "srv_red_2a",
        title: "Das große Krabbeln",
        reqStory: "path_red_taste",
        text: "Du hörst ein Knistern aus Rack 7, wo du vorhin den Slushie gefunden hast. Tausende Ameisen wurden von den klebrigen Resten angelockt und bauen ein Nest im 10.000€ Switch.",
        opts: [
            { 
                t: "Chemische Keule (Insektenspray)", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Du sprühst, bis der Nebel steht. Die Ameisen sind tot. Der Lüfter des Switches verklebt zwar etwas, aber es läuft noch. Schnell weg hier." 
            },
            { 
                t: "Alles ausbauen & einzeln reinigen", 
                m: 60, f: -25, a: 15, c: -5, 
                r: "Eine Stunde lang pinselst du tote Ameisen von Platinen. Es ist eklig, aber du rettest die Hardware. Niemand erfährt von dem Vorfall. Saubere Arbeit." 
            },
            { 
                t: "Den Azubi Kevin rufen", 
                m: 10, f: 10, a: -15, c: 20, 
                r: "Kevin sieht die Ameisen und schreit. Der Chef kommt dazu. Du bekommst einen Einlauf wegen 'mangelnder Aufsicht', aber Kevin muss putzen." 
            }
        ]
    },
    {
        id: "srv_red_2b",
        title: "Manöverkritik",
        reqStory: "path_red_alarm",
        text: "Der Chef zitiert dich ins Büro. Der 'biologische Gefahrstoff', wegen dem die Feuerwehr kam, war nur ausgelaufene Kühlflüssigkeit mit Farbstoff. Er sieht nicht glücklich aus.",
        opts: [
            { 
                t: "Auf Sicherheitsprotokolle pochen", 
                m: 10, f: 0, a: -5, c: 10, 
                r: "'Vorsicht ist besser als Nachsicht, Chef!' Er massiert sich die Schläfen. 'Ja, schon... aber nächstes Mal erst riechen, dann drücken.' Du kommst davon." 
            },
            { 
                t: "Kleinlaut entschuldigen", 
                m: 5, f: 0, a: 5, c: -10, 
                r: "'Es tut mir leid.' Der Chef seufzt. 'Der Einsatz kostet uns 500 Euro. Das geht von Ihrem Budget für Weihnachtsdeko ab.' Autsch." 
            },
            { 
                t: "Bestechungs-Donut anbieten", 
                rem: "donut",
                m: 2, f: 5, a: -5, c: 5, 
                r: "Du schiebst ihm den Donut hin. 'Nervennahrung?' Er beißt rein, kaut und grummelt: 'Verschwinden Sie an die Arbeit.' Bestechung funktioniert immer." 
            }
        ]
    },
    {
        id: "srv_illegal_1",
        title: "Das illegale Datencenter",
        text: "Du lehnst dich gegen ein Regal und plötzlich schwingt eine falsche Wand auf. Dahinter: Ein versteckter Serverraum! Auf den Bildschirmen flackern... nun ja, sehr 'eindeutige' Erwachsenenfilme. Die Admin-Konsole ist eingeloggt: Es gehört dem Vize-Chef.",
        opts: [
            { 
                t: "Beweise sichern & Vize-Chef erpressen", 
                req: "secret_list",
                next: "path_illegal_blackmail", 
                m: 10, f: 30, a: 0, c: -30, 
                r: "Du machst Fotos und wedelst mit der Schwarzen Liste aus deiner Tasche. 'Ich weiß alles.' Das ist der Jackpot. Du schließt die Tür leise wieder." 
            },
            { 
                t: "Sofort den Stecker ziehen", 
                next: "path_illegal_shutdown", 
                m: 20, f: -10, a: 10, c: 50, 
                r: "Du zögerst nicht. KLACK. Die Sicherung fliegt raus. Die Bildschirme werden schwarz. Die Lüfter sterben ab. Totale Stille im Raum." 
            },
            { 
                t: "Klappe halten & Hardware mitnutzen", 
                next: "path_illegal_share", 
                m: 5, f: 20, a: -10, c: 20, 
                r: "Du installierst heimlich deinen privaten Minecraft-Server und einen Bitcoin-Miner auf der Hardware. Gratis Strom, High-Speed-Leitung und der Vize-Chef kann dich schlecht verpfeifen." 
            }
        ]
    },
    {
        id: "srv_illegal_2a",
        title: "Das Beraterhonorar",
        reqStory: "path_illegal_blackmail",
        text: "Der Vize-Chef fängt dich am Kaffeeautomaten ab. Er schwitzt stark. 'Müller... wegen der... Sache im Serverraum. Geben Sie mir die Liste, und wir werden uns einig.'",
        opts: [
            { 
                t: "Geld verlangen", 
                rem: "secret_list",
                m: 5, f: 10, a: -20, c: -20, 
                r: "Er reißt dir die Liste aus der Hand und steckt dir einen dicken Umschlag zu. 'Spesenabrechnung. Monatlich. Schweigen wir nie wieder darüber.' Du bist jetzt offiziell korrupt." 
            },
            { 
                t: "Home-Office fordern", 
                rem: "secret_list",
                m: 5, f: 20, a: -15, c: -10, 
                r: "'Drei Tage die Woche?' Er nickt hastig, greift sich die Liste und schreddert sie sofort. 'Genehmigt. Ab sofort.' Er wirkt erleichtert. Du auch." 
            },
            { 
                t: "Ihn zappeln lassen", 
                m: 2, f: 5, a: -5, c: 10, 
                r: "Du tippst dir nur an die Brusttasche, wo die Liste steckt, und zwinkerst. Die pure Panik in seinen Augen ist unbezahlbar. Er wird dir ab jetzt jeden Wunsch erfüllen." 
            }
        ]
    },
    {
        id: "srv_illegal_2b",
        title: "Der Wutanfall",
        reqStory: "path_illegal_shutdown",
        text: "30 Minuten später stürmt der Vize-Chef hochrot in den Serverraum. 'WER WAR DAS?! Mein... äh... kritisches Backup-System ist offline! Wissen Sie, wie viel Traffic wir verlieren?!'",
        opts: [
            { 
                t: "Ahnungslosigkeit heucheln", 
                m: 5, f: 5, a: 5, c: 5, 
                r: "'Stromschwankung, Chef. Die Leitungen sind alt.' Er tobt, kann aber nichts beweisen. Er traut sich nicht, den Server wieder einzuschalten, solange du da bist." 
            },
            { 
                t: "Sagen: 'Es war ein Sicherheitsrisiko'", 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Du starrst ihm direkt in die Augen. 'Zu viele offene Ports. Ich habe die Firma geschützt.' Er versteht die Drohung, schluckt schwer und geht wortlos." 
            },
            { 
                t: "Ihn auslachen", 
                m: 2, f: 5, a: -10, c: 10, 
                r: "Du kannst es dir nicht verkneifen. 'Kritisches Backup? Sah eher aus wie Backside-Sluts 9.' Er wird bleich und rennt raus. Das gibt Krieg." 
            }
        ]
    },
    {
        id: "srv_illegal_2c",
        title: "Bandbreiten-Krieg",
        reqStory: "path_illegal_share",
        text: "Du merkst, dass dein Bitcoin-Miner langsamer wird. Der Vize-Chef streamt wohl gerade wieder 4K-Inhalte auf dem versteckten Server. Die Lüfter heulen wie Düsentriebwerke.",
        opts: [
            { 
                t: "Seine Prozesse drosseln", 
                m: 10, f: -10, a: -15, c: 10,
                r: "Du priorisierst deinen Traffic im Router per QoS. Sein Stream buffert jetzt alle 3 Sekunden. Irgendwo im Büro hörst du einen frustrierten Schrei. Herrlich." 
            },
            { 
                t: "Waffenstillstand per Chat", 
                m: 5, f: 5, a: -5, c: -5, 
                r: "Du öffnest `notepad.exe` auf dem Server und schreibst: '50/50 Ressourcenteilung?'. Er antwortet: 'Deal. Aber lösch den Verlauf.' Ehre unter Dieben." 
            },
            { 
                t: "Alles übertakten", 
                m: 5, f: -5, a: 10, c: -10, 
                r: "Du drehst die Spannung hoch. Es riecht verschmort, aber beide Prozesse laufen flüssig. Hoffentlich brennt das Gebäude nicht ab." 
            }
        ]
    },
    {
        id: "srv_raccoon_1",
        title: "Der maskierte Bandit",
        text: "Die Tür steht offen. Ein fetter Waschbär sitzt auf dem Haupt-Switch und nagt genüsslich an einem gelben Glasfaserkabel. Er sieht dich an, faucht und macht keine Anstalten zu gehen.",
        opts: [
            { 
                t: "Kampf mit Hammer (Dominanz zeigen)", 
                req: "hammer",
                next: "path_raccoon_fight", 
                m: 10, f: -10, a: 20, c: 10, 
                r: "Du holst zum Schlag aus! 'Verschwinde, du Müllpanda!' Der Waschbär macht einen Matrix-Dodge. KLONG. Dein Hammer trifft mit voller Wucht das Rack. Der Waschbär flieht lachend." 
            },
            { 
                t: "Donut opfern (Bestechung)", 
                rem: "donut",
                next: "path_raccoon_bribe", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du wirfst den Donut in den Flur. Der Waschbär riecht das Fett, lässt das Kabel los und watschelt dem Gebäck hinterher. Du schließt schnell die Tür." 
            },
            { 
                t: "Tür zu und hoffen (Problem ignorieren)", 
                next: "path_raccoon_ignore", 
                m: 2, f: 20, a: 0, c: 5, 
                r: "Du ziehst die Tür leise zu und schließt ab. 'Nicht mein Problem. Soll sich die Nachtschicht drum kümmern.' Du gehst pfeifend weg." 
            }
        ]
    },
    {
        id: "srv_raccoon_2a",
        title: "Inventur-Schaden",
        reqStory: "path_raccoon_fight",
        text: "Der IT-Leiter steht vor Rack 2. Da ist eine riesige Delle im Metall, genau auf Höhe eines Hammers. Er sieht dich fragend an. 'Sagen Sie mal... haben wir hier Poltergeister?'",
        opts: [
            { 
                t: "Lügen: 'Das war der Waschbär!'", 
                m: 5, f: 0, a: 5, c: 10, 
                r: "'Ein Waschbär mit übermenschlichen Kräften!' Der Leiter schüttelt den Kopf. 'Müller, nehmen Sie weniger von Ihren Medikamenten.' Er glaubt dir kein Wort." 
            },
            { 
                t: "Schaden mit Sticker überkleben", 
                m: 2, f: 5, a: -5, c: 5, 
                r: "Du klebst einen 'Intel Inside' Aufkleber über die Delle. 'Sieht aus wie neu, Chef.' Er kneift die Augen zusammen, lässt es aber durchgehen." 
            },
            { 
                t: "Beichten und ausbeulen", 
                req: "hammer", 
                m: 30, f: -10, a: 0, c: -5, 
                r: "Du erklärst den Kampf. Dann verbringst du 30 Minuten damit, das Blech von innen wieder gerade zu hämmern. Es ist laut und peinlich." 
            }
        ]
    },
    {
        id: "srv_raccoon_2b",
        title: "Der Stammkunde",
        reqStory: "path_raccoon_bribe",
        text: "Du hörst ein Kratzen an der Serverraum-Tür. Der Waschbär ist zurück. Er hat den Donut verputzt und anscheinend Freunde mitgebracht. Drei Waschbären warten auf Nachschub.",
        opts: [
            { 
                t: "Hausmeister Egon rufen", 
                m: 10, f: 5, a: -5, c: 0, 
                r: "Egon kommt. 'Ach, die sind doch niedlich!' Er füttert sie mit seinen Pausenbrot-Resten. Jetzt hast du eine Waschbären-Kolonie vor der IT. Aber sie lassen die Kabel in Ruhe." 
            },
            { 
                t: "Mit dem Feuerlöscher verscheuchen", 
                req: "fire_ext", 
                m: 5, f: -5, a: 10, c: 5, 
                r: "PFFFFT! Eine CO2-Wolke beendet die Party. Die Biester rennen weg, aber der Flur sieht aus wie Winterberg. Du musst fegen." 
            }
        ]
    },
    {
        id: "srv_raccoon_2c",
        title: "Bio-Hazard",
        reqStory: "path_raccoon_ignore",
        text: "Das Monitoring meldet 'Temperature Critical'. Du öffnest die Serverraum-Tür. Es stinkt bestialisch. Der eingesperrte Waschbär hat vor Angst auf den Lüfter des Mainframes gekackt. Die Scheiße wurde im ganzen Raum verteilt.",
        opts: [
            { 
                t: "Azubi zum Putzen zwingen", 
                m: 5, f: 10, a: -5, c: 10, 
                r: "Kevin muss im Schutzanzug rein. Er weint dabei. Du stehst draußen und gibst Anweisungen. Dein Karma sinkt ins Bodenlose, aber deine Hände bleiben sauber." 
            },
            { 
                t: "Selbst putzen (Strafe muss sein)", 
                m: 120, f: -50, a: 20, c: -10, 
                r: "Zwei Stunden. Zahnbürste. Desinfektionsmittel. Du hinterfragst jede Lebensentscheidung, die dich hierher geführt hat." 
            },
            { 
                t: "Raum versiegeln & Homeoffice beantragen", 
                m: 5, f: 20, a: 0, c: 20, 
                r: "'Gesundheitsrisiko! Niemand darf rein!' Du flüchtest. Das Problem wird morgen eskalieren, aber heute bist du frei." 
            }
        ]
    },
    {
        id: "srv_floppy_1",
        title: "Flaschenpost aus der Vergangenheit",
        text: "Du findest eine 3,5-Zoll Diskette mit der Aufschrift 'NOTFALLPLAN 1999'. Ein Zettel klebt daran: 'Wenn alles brennt, drück diesen Knopf.' Daneben ist ein roter, verstaubter Pilz-Taster an der Wand.",
        opts: [
            { 
                t: "Knopf drücken (YOLO)", 
                next: "path_floppy_button", 
                m: 5, f: 10, a: -20, c: 100, 
                r: "KLICK. Ein Zischen. Die alte Halon-Löschanlage löst aus! Der Sauerstoff wird aus dem Raum gesaugt. Du hältst die Luft an und stolperst raus. Das wird teuer." 
            },
            { 
                t: "Diskette lesen", 
                req: "manual",
                next: "path_floppy_read", 
                m: 30, f: -5, a: 0, c: -10, 
                r: "Dank des Handbuchs kannst du die uralten Treiber laden. Das Laufwerk rattert wie eine Kaffeemühle, aber du bekommst Zugriff auf die Daten." 
            },
            { 
                t: "Ignorieren", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du lässt den roten Knopf rot sein. Manche Dinge fasst man besser nicht an. Du gehst weiter." 
            }
        ]
    },
    {
        id: "srv_floppy_2a",
        title: "Rechnung vom Amt",
        reqStory: "path_floppy_button",
        text: "Draußen heulen Sirenen. Der Löschzug ist da, weil die Sensoren 'Sauerstoffverlust' gemeldet haben. Der Einsatzleiter sieht dich streng an. 'Wer hat ausgelöst?'",
        opts: [
            { 
                t: "Auf technischen Defekt plädieren", 
                m: 15, f: 0, a: 5, c: 10, 
                r: "'Diese alten Anlagen... tickende Zeitbomben!' Der Feuerwehrmann nickt. 'Ja, Halon ist seit 20 Jahren verboten. Das muss eh raus.' Du kommst mit einer Verwarnung davon." 
            },
            { 
                t: "Wegrennen", 
                m: 5, f: 10, a: -5, c: 20, 
                r: "Du nutzt das Chaos und verschwindest. Die Rechnung über 3.000€ Einsatzkosten landet pauschal bei der IT-Abteilung. Dein Budget weint." 
            },
            { 
                t: "Nebelmaschine als Ausrede nutzen", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "'Wir testen nur Bühneneffekte für die Weihnachtsfeier!' Der Feuerwehrmann ist verwirrt, packt zusammen und geht. Dreistigkeit siegt." 
            }
        ]
    },
    {
        id: "srv_floppy_2b",
        title: "Der Y2K-Patch",
        reqStory: "path_floppy_read",
        text: "Du durchsuchst die Dateien auf der Diskette. Es sind keine Highscores. Es ist eine Datei namens 'Y2K_FIX_FINAL.BAT'. Ein Skript, das das Jahr 2000 verhindern sollte.",
        opts: [
            { 
                t: "Aus Neugier ausführen", 
                m: 10, f: -10, a: 10, c: 50, 
                r: "Du klickst drauf. Das Systemdatum springt auf den 01.01.1900. Alle Zertifikate werden ungültig. Die Buchhaltung crasht. Aber hey, Retro-Feeling!" 
            },
            { 
                t: "Code analysieren (Lernen)", 
                m: 60, f: -20, a: 0, c: -5, 
                r: "Du studierst den antiken Code. Es ist Spaghetti-Code vom Feinsten, aber du lernst einen Trick, um die Server-Logs zu manipulieren. (Skill verbessert)" 
            },
            { 
                t: "Diskette formatieren", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du löschst alles und speicherst deine eigenen Urlaubsbilder drauf. 1,44 MB Speicherplatz gespart. Pragmatismus pur." 
            }
        ]
    },
    {
        id: "srv_loot_box_1",
        title: "Die offene Werkzeugkiste",
        text: "Ein externer Techniker hat seine Kiste neben Rack 3 vergessen. Sie steht offen da wie eine Schatztruhe. Du siehst nützliche Dinge, die dein IT-Herz höher schlagen lassen.",
        opts: [
            { 
                t: "Kabelbinder einstecken", 
                loot: "zip_ties", 
                next: "path_loot_zip", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Eine 100er Packung schwarze Kabelbinder. Gold wert für das Kabelmanagement zuhause! Schnell in die Tasche damit. (Inventar +1)" 
            },
            { 
                t: "Schraubendreher nehmen", 
                loot: "screw", 
                next: "path_loot_screw", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Ein hochwertiger Marken-Kreuzschlitz mit magnetischer Spitze. Der liegt gut in der Hand. Jetzt liegt er in deiner Tasche. (Inventar +1)" 
            },
            { 
                t: "Stehen lassen", 
                m: 0, f: 0, a: 0, c: 0, 
                r: "Du widerstehst der Versuchung. Du hast schon genug Zeug auf dem Schreibtisch." 
            }
        ]
    },
    {
        id: "srv_loot_box_2a",
        title: "Die Rückkehr",
        reqStory: "path_loot_zip",
        text: "Der Techniker kommt angerannt. Er schwitzt und wirkt extrem gestresst. 'Verdammt, wo ist die Packung Kabelbinder hin? Ich muss in 10 Minuten beim nächsten Kunden sein!' Er sieht dich an.",
        opts: [
            { 
                t: "Lügen: 'Habe nichts gesehen'", 
                m: 2, f: 0, a: 5, c: -5, 
                r: "Du zuckst mit den Schultern. 'Vielleicht hat die Putzkolonne aufgeräumt?' Er flucht, packt seine Kiste und rennt los. Dein Gewissen zwickt kurz." 
            },
            { 
                t: "Zurückgeben ('Gefunden')", 
                rem: "zip_ties",
                m: 5, f: 0, a: -5, c: 10, 
                r: "'Oh, die lagen hier am Boden. Wollte sie gerade sicherstellen.' Er atmet auf. 'Danke Mann! Du rettest mir den Arsch.' Er ist weg. (Item entfernt)" 
            },
            { 
                t: "Kevin beschuldigen", 
                m: 2, f: 5, a: -5, c: -10, 
                r: "'Der Azubi war vorhin hier...' Der Techniker schüttelt den Kopf. 'Keine Zeit für Diskussionen.' Er haut ab. Du hast die Beute noch." 
            }
        ]
    },
    {
        id: "srv_loot_box_2b",
        title: "Das fehlende Werkzeug",
        reqStory: "path_loot_screw",
        text: "Der Techniker wühlt hektisch in seiner Kiste. 'Mein Wera-Kreuzschlitz! Der Gute! Haben Sie den gesehen? Ohne den bekomme ich das Rack beim Kunden nicht auf!' Er ist der Verzweiflung nahe.",
        opts: [
            { 
                t: "Unschuldig pfeifen", 
                m: 2, f: 0, a: 5, c: -5, 
                r: "'Nö. War der wichtig?' Er rauft sich die Haare. 'Verdammt!' Er rennt fluchend raus. Du hast jetzt ein tolles Werkzeug und ein schlechtes Karma." 
            },
            { 
                t: "Zurückgeben", 
                rem: "screw",
                m: 5, f: 0, a: -5, c: 10, 
                r: "Du ziehst ihn aus der Tasche. 'Habe ich mir nur geliehen.' Er reißt ihn dir fast aus der Hand. 'Lassen Sie das! Aber danke.' (Item entfernt)" 
            },
            { 
                t: "Beim Suchen 'helfen'", 
                m: 15, f: -5, a: 0, c: -10, 
                r: "Du hilfst ihm 15 Minuten lang suchen (während er in deiner Tasche ist). 'Zwecklos', sagt er resigniert und geht. Du bist ein Monster." 
            }
        ]
    },
    {
        id: "srv_found_stuff",
        title: "Verdächtige Fundstücke",
        text: "Zwischen Rack 3 und 4 liegt Zeug herum. Es sieht so aus, als wäre jemand fluchtartig verschwunden.",
        opts: [
            { 
                t: "Die teuren Kopfhörer nehmen", 
                loot: "headphones", 
                next: "found_headphones_2",
                m: 5, f: 5, a: 0, c: 0, 
                r: "Bose Noise-Cancelling. Sehr schick. Sie sind noch leicht warm und riechen etwas nach Haargel. Aber hey: Gratis ist gratis. (Inventar +1)" 
            },
            { 
                t: "Den schweren Hammer nehmen", 
                loot: "hammer", 
                next: "found_hammer_2",
                m: 5, f: 5, a: 0, c: 0, 
                r: "Ein 500g Schlosserhammer. Auf dem Griff steht mit Edding 'HARD RESET'. Ein vertrauenerweckendes Werkzeug im Serverraum. (Inventar +1)" 
            }
        ]
    },
    {
        id: "srv_found_stuff_2a",
        title: "Die Audiophilen",
        reqStory: "found_headphones_2",
        text: "Du läufst mit deinen neuen Kopfhörern durch den Flur. Ein Kollege aus dem Marketing (Hipster-Bart, Mate-Tee) stoppt dich. 'Hey! Das sind doch meine Sennheiser! Ich hab die überall gesucht!'",
        opts: [
            { 
                t: "Zurückgeben", 
                rem: "headphones",
                m: 5, f: 0, a: -5, c: 5, 
                r: "'Oh, lagen im Serverraum.' Er reißt sie dir aus der Hand, wischt sie demonstrativ an seinem Hemd ab und setzt sie auf. 'Unfassbar, diese Diebe hier.' Kein Danke." 
            },
            { 
                t: "Lügen: 'Die gehören mir'", 
                m: 2, f: 0, a: 5, c: 5, 
                r: "'Das ist das Modell XP-500. Meins.' Er starrt dich misstrauisch an. 'Meine hatten einen Kratzer am Bügel...' Du gehst schnell weiter, bevor er ihn sieht." 
            },
            { 
                t: "Ihm Hygiene-Angst machen", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "'Echt? Ich habe gerade eine Pilzinfektion am Ohr, deshalb trage ich die.' Er wird bleich, weicht zurück und murmelt: 'Behalt sie. Bitte. Verbrenn sie.' Sieg!" 
            }
        ]
    },
    {
        id: "srv_found_stuff_2b",
        title: "Perkussive Wartung",
        reqStory: "found_hammer_2",
        text: "Du hörst lautes Fluchen aus dem Serverraum. Ein ehemaliger Admin (in Rente) steht vor einem alten Server, der hängt. Er haut mit der flachen Hand dagegen. 'WO IST MEIN MEINUNGSVERSTÄRKER?!'",
        opts: [
            { 
                t: "Hammer zurückgeben", 
                rem: "hammer",
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du reichst ihm den Hammer. Er grinst böse. 'Danke.' KLONG! Er haut einmal kräftig gegen das Gehäuse. Die Festplatte surrt wieder an. 'Geht doch.'" 
            },
            { 
                t: "Hilfe anbieten", 
                req: "hammer",
                m: 10, f: -5, a: -5, c: 5, 
                r: "'Lass mich mal.' Du gibst dem Server einen präzisen Schlag an die richtige Stelle (Netzteil). Er läuft. Der Admin nickt anerkennend. 'Gute Technik.'" 
            },
            { 
                t: "Schnell weggehen", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Bloß nicht einmischen. Hinter dir hörst du, wie er anfängt, gegen den Server zu treten. Du streichelst deinen neuen Hammer." 
            }
        ]
    },
    {
        id: "srv_loose_rack_1",
        title: "Das Wackel-Rack",
        text: "Rack 5 vibriert bedenklich im Takt der Lüfter. Eine tragende Schraube fehlt. Wenn das kippt, domino-effektet es das ganze Rechenzentrum.",
        opts: [
            { 
                t: "Fachgerecht festschrauben", 
                req: "screw",
                next: "path_rack_screw", 
                m: 25, f: -15, a: 5, c: -10,
                r: "Du kriechst auf dem Boden herum, richtest das Rack aus und ziehst die Schraube mit Drehmoment nach. Deutsche Wertarbeit. Das Ding bewegt sich keinen Millimeter mehr." 
            },
            { 
                t: "Mit Kabelbindern sichern", 
                req: "zip_ties",
                next: "path_rack_zip", 
                m: 5, f: 15, a: -5, c: 5,
                r: "Zatsch. Du bindest Rack 5 einfach an Rack 4 fest. Das nennt man 'strukturelle Redundanz' (oder Pfusch). Es hält erstmal, sieht aber wild aus. (Item entfernt)" 
            },
            { 
                t: "Wegsehen und pfeifen", 
                m: 0, f: 10, a: -5, c: 10,
                r: "Du drehst dich um. Wenn du es nicht siehst, ist es nicht illegal. Du hoffst einfach, dass die Physik heute Urlaub macht." 
            }
        ]
    },
    {
        id: "srv_loose_rack_2a",
        title: "Der Putz-Unfall",
        reqStory: "path_rack_screw",
        text: "Ein lauter KNALL! Die Putzkolonne ist mit dem schweren Bohnert-Wagen volle Kanne in Rack 5 gerammt. Dank deiner Schraube hat es standgehalten. Der Putzmann starrt schockiert auf die Beule.",
        opts: [
            { 
                t: "Ihn zur Sau machen", 
                m: 5, f: 0, a: -20, c: 5, 
                r: "Du schreist ihn 5 Minuten lang an. Das tut gut! Deine Aggression verpufft komplett. Er entschuldigt sich tausendmal." 
            },
            { 
                t: "Cool bleiben & Technik prüfen", 
                m: 15, f: -5, a: 5, c: -15, 
                r: "'Alles gut, Meister. Das hält.' Du checkst die Logs. Keine Ausfälle. Der Chef sieht das und nickt anerkennend. 'Gute Arbeit, Müller. Robust gebaut.'" 
            },
            { 
                t: "Schadenersatz fordern", 
                m: 10, f: 5, a: 10, c: 0, 
                r: "Du verlangst 20 Euro für den Lackschaden. Er gibt sie dir zitternd. Du bist ein Arschloch, aber ein reiches Arschloch." 
            }
        ]
    },
    {
        id: "srv_loose_rack_2b",
        title: "Das große Summen",
        reqStory: "path_rack_zip",
        text: "Ein tiefes Brummen erfüllt den Raum. Deine Kabelbinder haben die Vibrationen von Rack 5 auf Rack 4 übertragen. Jetzt schwingen beide in Resonanz und erzeugen einen Höllenlärm.",
        opts: [
            { 
                t: "Mehr Kabelbinder!", 
                rem: "zip_ties",
                m: 5, f: 10, a: 0, c: 10, 
                r: "Viel hilft viel. Du zurrste alles so fest, bis das Plastik weiß wird. Der Lärm wird höher, fast ein Pfeifen. Aber es wackelt weniger. (Item entfernt)" 
            },
            { 
                t: "Alles wieder losknippsen", 
                m: 20, f: -10, a: 20, c: -5, 
                r: "Du musst deinen eigenen Pfusch beseitigen. Du fluchst, schneidest dich am Plastik und brauchst ewig. Faulheit wird am Ende immer bestraft." 
            },
            { 
                t: "Ohrstöpsel rein & ignorieren", 
                req: "headphones",
                m: 0, f: 20, a: -10, c: 20, 
                r: "Du setzt die Noise-Cancelling-Kopfhörer auf. Himmlische Stille. Der Chef kommt rein und brüllt was, aber du hörst ihn nicht. Er sieht wütend aus." 
            }
        ]
    },
    {
        id: "srv_cable_mess_1",
        title: "Der Kabel-Alptraum",
        text: "Hinter Rack 3 hängt ein Bündel Glasfaserkabel gefährlich nah am rotierenden Lüfter. Ein Windhauch, und es gibt Datensalat (im wörtlichen Sinne).",
        opts: [
            { 
                t: "Sauber zur Seite binden", 
                req: "zip_ties",
                m: 15, f: -10, a: 0, c: -5, 
                r: "Du nimmst dir Zeit und verlegst die Kabel ordentlich im Führungsschacht. Klick, klick. Das hält für die Ewigkeit. Preußische Ordnung im Rack." 
            },
            { 
                t: "Festkleben (Provisorium)", 
                req: "tape",
                next: "path_cable_tape", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du klebst das Bündel einfach an die Seitenwand. 'Das hält schon', murmelst du. Es sieht hässlich aus, aber die Gefahr ist erst mal gebannt." 
            },
            { 
                t: "Lüftergitter rausbrechen", 
                next: "path_cable_break", 
                m: 2, f: 10, a: 10, c: 15, 
                r: "KNACK. Du reißt das Schutzgitter vor dem Lüfter raus. Jetzt ist mehr Platz für die Kabel, aber der Ventilator dreht sich jetzt offen wie ein Häcksler." 
            }
        ]
    },
    {
        id: "srv_cable_mess_2a",
        title: "Klebrige Hitze",
        reqStory: "path_cable_tape",
        text: "Der Server ist heiß gelaufen. Dein Tape-Kleber hat sich verflüssigt. Das Kabelbündel hat sich gelöst und klatscht jetzt rhythmisch gegen den Lüfter. KLACK-KLACK-KLACK.",
        opts: [
            { 
                t: "Doch noch Kabelbinder holen", 
                req: "zip_ties", 
                m: 20, f: -10, a: 5, c: 0, 
                r: "Du musst erst die Klebereste abkratzen, bevor du es ordentlich machst. Doppelte Arbeit für deine Faulheit." 
            },
            { 
                t: "Einfach neues Tape drüber", 
                req: "tape", 
                m: 5, f: 5, a: 0, c: 5, 
                r: "Mehr Tape hilft mehr. Du wickelst den halben Server ein. Es sieht aus wie eine Mumie, aber das Geräusch ist weg." 
            },
            { 
                t: "Tür zu machen", 
                m: 0, f: 10, a: -5, c: 10, 
                r: "Wenn die Tür zu ist, hört man das Klackern kaum. Problem gelöst (für dich)." 
            }
        ]
    },
    {
        id: "srv_cable_mess_2b",
        title: "Der Finger-Häcksler",
        reqStory: "path_cable_break",
        text: "Ein Schrei aus dem Serverraum! Kevin wollte nur mal fühlen, wie stark der Luftzug ist. Ohne das Schutzgitter hat der Lüfter seinen Zeigefinger erwischt.",
        opts: [
            { 
                t: "Verbandskasten holen", 
                m: 10, f: 0, a: -5, c: 0, 
                r: "Es blutet wie Sau. Du verarztest ihn. 'Nicht dem Chef sagen!', wimmerst du. Kevin nickt unter Tränen." 
            },
            { 
                t: "Ihm sagen, er soll sich nicht anstellen", 
                m: 5, f: 5, a: 5, c: 10, 
                r: "'Das ist nur eine Fleischwunde. Das baut Charakter auf.' Du gibst ihm ein Taschentuch. Er geht schmollend." 
            }
        ]
    },
    {
        id: "srv_door_stuck_1",
        title: "Die klemmende Tür",
        text: "Der Kartenleser piept grün, aber der Türgriff blockiert. Die Mechanik klemmt. Drinnen blinken die Server, und du musst rein.",
        opts: [
            { 
                t: "Gezielter Schlag mit Hammer", 
                req: "hammer",
                next: "path_door_hammer", 
                m: 5, f: -5, a: -10, c: 10, 
                r: "KLONG. Ein präziser Schlag auf den Schließzylinder. Etwas knackt, dann schwingt die Tür auf. Der Griff hängt schief, aber du bist drin." 
            },
            { 
                t: "Schloss zerlegen & fetten", 
                req: "screw",
                next: "path_door_screw", 
                m: 30, f: -10, a: 5, c: 0, 
                r: "Du schraubst die Blende ab, richtest die Federn und fettest den Bolzen. Profi-Arbeit. Die Tür gleitet lautlos auf und zu." 
            },
            { 
                t: "Mit der Schulter dagegen werfen", 
                next: "path_door_force", 
                m: 10, f: 0, a: 20, c: 5, 
                r: "BAM! Deine Schulter brennt wie Feuer. Die Tür bewegt sich keinen Millimeter. Du trittst wütend dagegen und löst dabei den Sabotage-Alarm aus." 
            }
        ]
    },
    {
        id: "srv_door_stuck_2a",
        title: "Der Sicherheits-Techniker",
        reqStory: "path_door_hammer",
        text: "Ein Techniker der Sicherheitsfirma steht vor der Tür und begutachtet die Delle im Metall. Er macht Fotos für den Bericht. 'Sieht nach Vandalismus aus. Oder einem Bärenangriff.'",
        opts: [
            { 
                t: "Es auf 'Materialermüdung' schieben", 
                m: 5, f: 0, a: 5, c: 10, 
                r: "'Das Metall war wohl spröde.' Der Techniker lacht trocken. 'Klar. Und der Hammer-Abdruck ist Kunst?' Die Rechnung für den Zylinder wird teuer." 
            },
            { 
                t: "Ihm Kaffee anbieten (Ablenkung)", 
                m: 10, f: 5, a: -5, c: 5, 
                r: "Du lenkst ihn mit Kaffee und Smalltalk ab. Er schreibt 'Mechanischer Defekt' statt 'Mutwillige Zerstörung' in den Bericht. Glück gehabt." 
            },
            { 
                t: "Einfach gehen", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du lässt ihn arbeiten. Später findest du eine Rechnung über 'Schließsystem-Austausch (Notdienst)' auf deinem Tisch." 
            }
        ]
    },
    {
        id: "srv_door_stuck_2b",
        title: "Garantie-Verlust",
        reqStory: "path_door_screw",
        text: "Der Sicherheits-Techniker ist da, weil der 'Gehäuse-offen'-Sensor ausgelöst hat. Er prüft das Schloss. 'Moment mal... das läuft ja besser als ab Werk. Haben Sie das gefettet?'",
        opts: [
            { 
                t: "Stolz nicken", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "'Ich bin vom Fach.' Der Techniker nickt anerkennend. 'Nicht schlecht. Aber streng genommen ist die Garantie jetzt futsch. Ich drück mal ein Auge zu.'" 
            },
            { 
                t: "Unschuldig gucken", 
                m: 2, f: 0, a: 5, c: -5, 
                r: "'Keine Ahnung, war schon so.' Er zuckt mit den Schultern. 'Na, wenn es funktioniert, schreibe ich keinen Bericht.' Fall erledigt." 
            }
        ]
    },
    {
        id: "srv_door_stuck_2c",
        title: "Die Notöffnung",
        reqStory: "path_door_force",
        text: "Der Techniker kommt genervt an. Der Sabotage-Alarm heult immer noch. Du hältst dir die schmerzende Schulter. 'Haben Sie versucht, die Tür einzurennen? Das ist Stahlbeton, Sie Genie.'",
        opts: [
            { 
                t: "Ihm beim Aufbohren zusehen", 
                m: 45, f: 20, a: 10, c: -5, 
                r: "Er braucht eine Ewigkeit, um den Riegel aufzubohren. Du stehst daneben und fühlst dich nutzlos. Die Zeit fehlt dir jetzt." 
            },
            { 
                t: "Ihn anschreien: 'Beeilung!'", 
                m: 5, f: 0, a: 20, c: 10, 
                r: "Deine Schulter tut weh und du bist wütend. Er arbeitet absichtlich langsamer. 'Gutes Werkzeug braucht Weile', grinst er. Du kochst." 
            },
            { 
                t: "Schokoriegel essen (Frustbewältigung)", 
                m: 5, f: 10, a: -10, c: 0, 
                r: "Du isst einen Snack, während er arbeitet. Wenigstens sinkt dein Stresslevel, während die Rechnung steigt." 
            }
        ]
    },
    {
        id: "srv_leak_1",
        title: "Das leckende Rohr",
        text: "Tropf... Tropf... Ein Kondenswasser-Rohr der Klimaanlage ist undicht. Es tropft in Zeitlupe direkt in die Lüftungsschlitze des 50.000€ teuren Core-Switch. Jeder Tropfen ein potenzieller Totalschaden.",
        opts: [
            { 
                t: "Mit Panzertape umwickeln", 
                req: "tape",
                next: "path_leak_tape", 
                m: 5, f: 0, a: -5, c: -10, 
                r: "Du wickelst eine halbe Rolle Tape drum. Dicht! Zumindest für heute. Und wir wissen ja: Nichts hält länger als ein Provisorium." 
            },
            { 
                t: "Mülleimer drunterstellen", 
                next: "path_leak_bucket", 
                m: 10, f: 5, a: 0, c: 0, 
                r: "Pling... Pling... Du hast den Eimer aus der Küche geholt. Du musst ihn alle 2 Stunden leeren, aber die Hardware bleibt trocken. Deine Nerven leiden unter dem Geräusch." 
            },
            { 
                t: "Rohr mit Hammer 'zurechtbiegen'", 
                req: "hammer",
                next: "path_leak_hammer", 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Du setzt den Hammer als Hebel an und drückst. KNACK! Das morsche Rohr bricht komplett ab. Ein Schwall kaltes Wasser ergießt sich über das Rack. Katastrophe!" 
            }
        ]
    },
    {
        id: "srv_leak_2a",
        title: "Die Wasserbomben-Gefahr",
        reqStory: "path_leak_tape",
        text: "Du schaust nach deiner Tape-Konstruktion. Das Wasser hat sich gestaut. Das Tape hat sich gedehnt und bildet jetzt eine pralle, literschwere Blase direkt über dem Server. Sieht aus wie ein Euter.",
        opts: [
            { 
                t: "Vorsichtig anstechen & ablassen", 
                req: "screw",
                m: 15, f: -5, a: 5, c: 0, 
                r: "Ganz vorsichtig... PIEKS. Du fängst den Strahl mit einem Becher auf. Du brauchst 20 Becher, aber die Blase ist weg. Maßarbeit." 
            },
            { 
                t: "Mehr Tape drumwickeln", 
                req: "tape", 
                m: 5, f: 10, a: 0, c: 5, 
                r: "Du stabilisierst die Blase mit noch mehr Klebeband. Jetzt sieht es aus wie ein Kokon. Hoffentlich platzt das nie." 
            },
            { 
                t: "Schüssel drunter & wegrennen", 
                m: 2, f: 5, a: -5, c: 10, 
                r: "Wenn das platzt, willst du nicht im Raum sein. Du stellst eine Schüssel zur Gewissensberuhigung auf den Boden und fliehst." 
            }
        ]
    },
    {
        id: "srv_leak_2b",
        title: "Land unter",
        reqStory: "path_leak_bucket",
        text: "Du kommst zurück in den Serverraum. Es ist still. Kein 'Pling' mehr. Der Eimer ist nämlich voll und übergelaufen. Eine große Pfütze breitet sich Richtung Stromverteiler aus.",
        opts: [
            { 
                t: "Alles aufwischen", 
                m: 30, f: -20, a: 10, c: -5, 
                r: "Du kriechst mit Papierhandtüchern auf dem Boden rum. Deine Hose wird nass, dein Rücken schmerzt. Faulheit wird sofort bestraft." 
            },
            { 
                t: "Putzkolonne rufen", 
                m: 5, f: 10, a: -5, c: 5, 
                r: "'Hier ist... äh... was ausgelaufen.' Die Putzkraft rollt mit den Augen, macht es aber weg. Du stehst daneben und gibst unnötige Tipps." 
            },
            { 
                t: "Schild 'Vorsicht Rutschgefahr' aufstellen", 
                m: 2, f: 15, a: -5, c: 10, 
                r: "Rechtlich bist du jetzt abgesichert. Technisch gesehen steht der Stromverteiler immer noch im Wasser. Aber du hast Feierabend." 
            }
        ]
    },
    {
        id: "srv_leak_2c",
        title: "Wasserschaden-Bingo",
        reqStory: "path_leak_hammer",
        text: "Das Wasser läuft. Der Switch blinkt wild. Es riecht nach Ozon. Du musst handeln, bevor der 50.000€ Schaden amtlich wird.",
        opts: [
            { 
                t: "In Reis einlegen (Mythos)", 
                m: 15, f: 5, a: -5, c: 10, 
                r: "Du kippst den Kantinen-Reis in den Server. Es bringt technisch nichts, sieht aber so aus, als hättest du einen Plan. Der Switch stirbt trotzdem." 
            },
            { 
                t: "Mit Föhn trocknen", 
                m: 20, f: -5, a: 5, c: 0, 
                r: "Du föhnst die Platinen trocken. Es dauert ewig. Tatsächlich gehen die Lichter wieder an! Ein Wunder (oder Glück). Korrosion ist ein Problem für später." 
            },
            { 
                t: "Schuld auf Dachschaden schieben", 
                m: 5, f: 10, a: -10, c: -5, 
                r: "Du machst Fotos vom kaputten Rohr. 'Baumangel! Höhere Gewalt!' Die Versicherung zahlt. Niemand fragt nach dem Hammer." 
            }
        ]
    },
    {
        id: "srv_pw_list_1",
        title: "Versteckte Notiz",
        text: "Hinter Rack 5 klebt ein vergilbter Zettel mit Tesafilm. Darauf steht in krakeliger Schrift: 'TOP SECRET - NUR FÜR ADMINS'. Der Zettel sieht aus, als hinge er dort schon seit Windows 95.",
        opts: [
            { 
                t: "Den Zettel neugierig entziffern", 
                next: "path_pw_decipher", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Es sind keine Passwörter. Es ist das Vermächtnis deines Vorgängers: 'Ich habe das Internet in einer schwarzen Kiste ganz unten im Rack versteckt. Wenn Google down ist, müsst ihr die Kiste schütteln. P.S.: Trau niemals dem Drucker.' Weise Worte." 
            },
            { 
                t: "Ehrfürchtig hängen lassen", 
                m: 0, f: 0, a: 0, c: 0, 
                r: "Du drückst den Tesafilm wieder fest. Das ist IT-Archäologie und Kulturgut. Wer das entfernt, löscht wahrscheinlich auch versehentlich das Backup." 
            }
        ]
    },
    {
        id: "srv_pw_list_2a",
        title: "Der Google-Crash",
        reqStory: "path_pw_decipher",
        text: "Ein Schrei hallt durch die Firma: 'GOOGLE IST DOWN!' Panik bricht aus. Die Senior-Admins tippen wild auf Konsolen: 'DNS-Fehler! Backbone-Timeout!' Nichts hilft. Der Chef läuft rot an.",
        opts: [
            { 
                t: "Die 'Schwarze Kiste' schütteln", 
                m: 5, f: -10, a: -10, c: -20, 
                r: "Du kriechst nach unten und schüttelst die verstaubte schwarze Box. KLACK. Die LEDs springen auf Grün. Das Internet ist zurück! Der Chef klopft dir begeistert auf die Schulter: 'Hexerei, Müller! Aber gute Arbeit!'" 
            },
            { 
                t: "Logisch vorgehen (Router neu starten)", 
                m: 20, f: -5, a: 10, c: 10, 
                r: "Du ignorierst den okkulten Rat und startest den Cisco-Router neu. Es bringt... nichts. 20 Minuten später geht es von alleine wieder. Der Chef brummt unzufrieden: 'Das dauerte viel zu lange.'" 
            },
            { 
                t: "Dem Drucker misstrauen", 
                m: 5, f: 10, a: -5, c: 10, 
                r: "Der Zettel warnte auch vor dem Drucker. Du starrst das Gerät böse an, während die Firma Geld verliert. Der Chef schreit: 'Müller! Was machen Sie da?! Fixen Sie das WLAN!' Das gab Ärger." 
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
        id: "srv_update_fail_1",
        title: "Der kritische Patch",
        text: "Auf dem Dashboard blinkt es rot: 'Kritische Sicherheitslücke in der Zeiterfassung! Patch verfügbar.' Es ist gerade Mittagspause, alle kauen Döner. Niemand ist eingeloggt. Der perfekte Moment?",
        opts: [
            { 
                t: "Sofort das Update installieren", 
                next: "path_update_patch", 
                m: 20, f: -10, a: 30, c: 0, 
                r: "Update läuft durch! Aber: Der 'Stempeln'-Button ist jetzt grün statt blau. Um 13 Uhr bricht totale Panik aus. 'ALLES SIEHT ANDERS AUS!' Das Telefon glüht. Du hast das Layout verändert, du Monster." 
            },
            { 
                t: "Wegklicken: 'Never change a running system'", 
                next: "path_update_ignore", 
                m: 0, f: 5, a: 0, c: 0, 
                r: "Du klickst die Warnung weg. Wenn russische Hacker kommen, ist das ein Problem für das Zukunfts-Ich. Jetzt ist erstmal Pause und der Döner wird kalt." 
            }
        ]
    },
    {
        id: "srv_update_fail_2a",
        title: "Heise Online News",
        reqStory: "path_update_patch",
        text: "Du liest genervt die IT-News, während User sich immer noch über den grünen Button beschweren. Schlagzeile: 'Massive Ransomware-Welle nutzt Lücke in Zeit-Software. Tausende Firmen verschlüsselt.' Nur deine nicht.",
        opts: [
            { 
                t: "Arrogante Rundmail schreiben", 
                m: 10, f: 0, a: -20, c: -20, 
                r: "'Betreff: Gern geschehen.' Du erklärst, dass der grüne Button sie vor dem Ruin gerettet hat. Plötzlich ist Ruhe. Ein kleiner Triumph." 
            },
            { 
                t: "Den Button wieder blau färben (CSS)", 
                m: 15, f: -5, a: -5, c: 0, 
                r: "Du hackst das CSS, damit der Button wieder blau ist. Die Sicherheit bleibt, die User sind glücklich. Du bist der stille Wächter." 
            },
            { 
                t: "Schadenfreude genießen", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du lehnst dich zurück und liest die Berichte über brennende Serverräume bei der Konkurrenz. Der Kaffee schmeckt heute besonders gut." 
            }
        ]
    },
    {
        id: "srv_update_fail_2b",
        title: "Die neuen Kollegen",
        reqStory: "path_update_ignore",
        text: "Du prüfst die Stempelzeiten. Komisch. Neben 'Müller' und 'Schmidt' stehen da plötzlich 'Vladimir', 'Igor' und 'Botnet_Warrior_99'. Sie arbeiten alle 24 Stunden am Tag und haben Admin-Rechte.",
        opts: [
            { 
                t: "Panik: Datenbank bereinigen & patchen", 
                m: 60, f: -20, a: 20, c: 0, 
                r: "Heimlich löschst du die Accounts und spielst das Update ein. Du schwitzt Blut und Wasser. Hoffentlich haben sie keine Backdoor hinterlassen." 
            },
            { 
                t: "Bei HR nachfragen: 'Haben wir expandiert?'", 
                m: 10, f: 0, a: -5, c: 20, 
                r: "Die HR fällt aus allen Wolken. Der Chef bekommt Wind davon. 'Wieso haben wir Mitarbeiter in St. Petersburg?!' Du musst zum Rapport." 
            },
            { 
                t: "Die 'Mitarbeiter' behalten (Mining)", 
                m: 5, f: 10, a: -10, c: 10, 
                r: "Sie scheinen nur Rechenleistung für Krypto zu klauen. Du lässt sie gewähren und zweigst 10% für dich ab. Ein riskantes Spiel mit der russischen Mafia." 
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
                r: "Der Berater lacht glatt: 'Ah, Herr Müller wollte mir gerade die USV demonstrieren und hat wohl das falsche Kabel erwischt. Schlechtes Briefing!' Der Chef nickt. Du kochst vor Wut." 
            },
            { 
                t: "Stecker wieder reinrammen", 
                next: "consultant_psu",
                m: 5, f: 0, a: 10, c: 20, 
                r: "Funkenflug. Der Server fährt hoch, aber das Netzteil ist durchgebrannt. Der Berater tippt auf seinem Handy: 'Hardware veraltet. Empfehle Neukauf.' Du grinst böse. 'Wird erledigt.'" 
            },
            { 
                t: "Berater anschreien", 
                next: "consultant_war",
                m: 2, f: 0, a: -20, c: 50, 
                r: "Du brüllst den Gast an. Der Chef wird blass. 'Müller! Benehmen Sie sich! Abmahnung wegen unprofessionellem Verhalten!' Der Berater grinst." 
            }
        ]
    },
    {
        id: "srv_consultant_fail_2b",
        title: "Das Gold-Netzteil",
        reqStory: "consultant_psu",
        text: "Das Ersatzteil ist da. Weil der Berater meinte, wir bräuchten 'High-End', hast du das 'Titan-Master 9000' bestellt: Handgelötet, RGB-Beleuchtung, Military-Grade. Preis: 4.800€. Der Chef starrt fassungslos auf die Rechnung.",
        opts: [
            { 
                t: "Den Berater zitieren", 
                m: 5, f: 0, a: -20, c: -10,
                r: "'Der Berater sagte: Keine Kosten scheuen für Stabilität.' Der Chef läuft rot an. 'Dieser Idiot! Aber gut, wenn er es empfohlen hat...' Du bist fein raus." 
            },
            { 
                t: "Technik-Geschwafel nutzen", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "'Das ist das einzige Modell, das mit unserer Legacy-Software kompatibel ist, Chef.' Er seufzt. 'Na gut. Bauen Sie es ein.' Er hat keine Ahnung, dass ein 50€ Teil gereicht hätte." 
            },
            { 
                t: "Genüsslich einbauen", 
                m: 30, f: -10, a: -10, c: 0, 
                r: "Du schraubst das Monster in das Rack. Es leuchtet in Regenbogenfarben. Es ist völlig überdimensioniert, aber es ist DEINS. Rache ist süß (und teuer)." 
            }
        ]
    },
    {
        id: "srv_consultant_fail_2c",
        title: "Die offizielle Beschwerde",
        reqStory: "consultant_war",
        text: "Der Berater wedelt mit einem laminierten Dokument. 'Bezüglich unseres Disputs. Ich habe hier eine formelle Beschwerde wegen 'Toxischer Arbeitsatmosphäre'. Unterschreiben Sie, oder ich empfehle dem Vorstand Outsourcing.'",
        opts: [
            { 
                t: "Klein beigeben & unterschreiben", 
                m: 10, f: 5, a: -10, c: -20, 
                r: "Du unterschreibst zähneknirschend. Der Berater lächelt süffisant. 'Geht doch. Synergie durch Kooperation.' Dein Radar sinkt, aber dein Stolz ist tot." 
            },
            { 
                t: "Bürokratie-Konter: 'Formular 7b fehlt'", 
                m: 5, f: 10, a: 10, c: 10, 
                r: "Du schaust das Papier an. 'Das ist das alte Formular von 2018. Ohne Passierschein A38 kann ich das nicht annehmen.' Der Berater ist verwirrt und zieht ab." 
            },
            { 
                t: "Eskalation: 'Raus aus meinem Serverraum!'", 
                m: 2, f: 0, a: -20, c: 40, 
                r: "Du wirfst ihn raus. Er droht mit Anwälten. Der Chef ist sauer, aber die Kollegen feiern dich als Helden des Widerstands." 
            }
        ]
    },
    {
        id: "srv_dust_disaster_1",
        title: "Der verstaubte Server",
        text: "Der alte Backup-Server 'Methusalem' ist unter einer 5cm dicken Staubschicht begraben. Die Lüfter japsen und die Temperatur-LED blinkt rot. Das ist Brandgefahr!",
        opts: [
            { 
                t: "Gründlich reinigen (Druckluft)", 
                next: "srv_dust_2a",
                m: 20, f: -10, a: 5, c: 0, 
                r: "PFFFFT. Eine graue Wolke hüllt dich ein. Du holst kiloweise Staub aus den Kühlrippen. Plötzlich drehen die Lüfter hoch, die LED wird grün. Die Kiste rennt wie am ersten Tag. Mist." 
            },
            { 
                t: "Staubmuster malen", 
                next: "srv_dust_2b",
                m: 5, f: 10, a: -5, c: 0, 
                r: "Du malst mit dem Finger einen Smiley in den dicken Staub auf dem Gehäuse. Er grinst dich schief an. Sieht gleich viel freundlicher aus." 
            }
        ]
    },
    {
        id: "srv_dust_disaster_2a",
        title: "Das Budget-Problem",
        reqStory: "srv_dust_2a",
        text: "Der Chef kommt rein und hört das kraftvolle Surren. 'Hören Sie das, Müller? Methusalem läuft ja wie ein Neuwagen! Da können wir den Antrag für den neuen Server (15.000€) ja stornieren.' Dein Herz bleibt stehen.",
        opts: [
            { 
                t: "Sabotage: Lüfter wieder drosseln", 
                m: 10, f: -5, a: -20, c: 10,
                r: "Du klemmst heimlich ein Stück Pappe in den Lüfter. Der Server überhitzt sofort. Der Chef seufzt: 'Na gut. Ich bestelle Ersatz.' Er kauft den billigsten 'Refurbished'-Server auf eBay. Jetzt hast du Elektroschrott am Hals." 
            },
            { 
                t: "Post-It 'Legends never die' kleben", 
                m: 2, f: 5, a: 5, c: -10,
                r: "Du akzeptierst dein Schicksal. Du klebst ein Post-It an den Server: 'Nicht ausschalten, sonst stirbt er.' Der Chef nickt zufrieden über die Sparmaßnahme." 
            },
            { 
                t: "Trotzdem auf Neukauf bestehen", 
                m: 15, f: 0, a: 10, c: 20,
                r: "'Das ist nur das letzte Aufbäumen vor dem Tod!' Der Chef winkt ab. 'Solange er blinkt, bleibt er.' Du hast jetzt einen schnellen, alten Server und einen genervten Chef." 
            }
        ]
    },
    {
        id: "srv_dust_disaster_2b",
        title: "Staub-Therapie",
        reqStory: "srv_dust_2b",
        text: "Du flüchtest vor einem User ('Mein Mauszeiger ist weg!') zurück in den Serverraum. Es ist kühl und laut. Du siehst deinen Staub-Smiley auf dem Backup-Server.",
        opts: [
            { 
                t: "Muster verfeinern (Zen-Garten)", 
                m: 10, f: 5, a: -15, c: 0,
                r: "Du ziehst weitere Linien. Ein Fraktal aus Staub. Es hat etwas Meditatives, wie ein Zen-Garten. Dein Puls beruhigt sich. Die Welt ist okay." 
            },
            { 
                t: "Wegwischen (Tabula Rasa)", 
                m: 5, f: -5, a: -10, c: 0,
                r: "Ein Wisch mit dem Ärmel. Der Staub ist weg (auf deinem Pulli). Eine saubere Oberfläche. Ein kleiner Sieg über das Chaos. Du fühlst dich besser." 
            }
        ]
    },
    {
        id: "srv_overheat_warning_1",
        title: "Hitzeflimmern",
        text: "Server 'Berta' (Gehaltsabrechnung) glüht. Der Lüfter steht still, es riecht beißend nach heißem Silizium. Wenn Berta stirbt, sind die Lohndaten weg.",
        opts: [
            { 
                t: "Brutale Lösung: CO2-Löscher", 
                req: "fire_ext", 
                next: "path_overheat_co2",
                m: 5, f: -10, a: 10, c: -10, 
                r: "PFFFFT! Ein eiskalter CO2-Stoß direkt in den Lufteinlass. Die Temperatur fällt schockartig auf -10 Grad. Berta schnurrt wieder, ist aber nun ein Eisblock." 
            },
            { 
                t: "Aufschrauben & Luft zufächeln", 
                req: "screw", 
                m: 45, f: -15, a: 20, c: 0, 
                r: "Du schraubst das Gehäuse auf. Du stehst 45 Minuten daneben und wedelst mit einem Klemmbrett frische Luft hinein. Dein Arm fällt fast ab, aber Berta überlebt." 
            },
            { 
                t: "Dyson-Ventilator vom Chef klauen", 
                next: "path_overheat_dyson",
                m: 20, f: -5, a: 5, c: 15, 
                r: "Du holst den 800€-Ventilator aus dem Chef-Büro. Berta wird luxuriös gekühlt. Aber oben im Büro beginnt das große Schwitzen." 
            },
            { 
                t: "Tür zu & das Beste hoffen", 
                next: "path_overheat_ignore",
                m: 5, f: 10, a: 0, c: 50, 
                r: "Du gehst einfach. 10 Minuten später stirbt Berta den Hitzetod. Stille im Serverraum. Dafür Lärm im Flur." 
            }
        ]
    },
    {
        id: "srv_overheat_warning_2a",
        title: "Eiszeit",
        reqStory: "path_overheat_co2",
        text: "Berta läuft super, aber durch den CO2-Schock bildet sich Kondenswasser auf der Platine. Es fängt an zu tropfen. Wasser und Strom sind keine Freunde.",
        opts: [
            { 
                t: "Mit Föhn trocknen", 
                m: 15, f: -5, a: 0, c: 0, 
                r: "Du holst einen Föhn und trocknest die Pfützen vorsichtig weg. Es ist ein Tanz auf dem Vulkan, aber du verhinderst den Kurzschluss." 
            },
            { 
                t: "Reis drüber kippen", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Der gute alte Reis-Trick. Sieht unprofessionell aus, saugt aber die Feuchtigkeit auf. Hoffentlich kocht der Reis nicht auf der CPU." 
            },
            { 
                t: "Ignorieren (Risiko)", 
                m: 0, f: 10, a: 0, c: 20, 
                r: "Du lässt es drauf ankommen. BIZZZT. Ein kleiner Funke. Berta startet neu, läuft aber weiter. Ein Sektor der Festplatte ist gegrillt (Mitarbeiter A-F kriegen kein Geld)." 
            }
        ]
    },
    {
        id: "srv_overheat_warning_2b",
        title: "Der schwitzende Chef",
        reqStory: "path_overheat_dyson",
        text: "Der Chef stürmt hochrot und schweißgebadet in den Serverraum. Er sieht seinen geliebten Dyson vor dem Server stehen. 'MÜLLER! Das ist mein Privateigentum! Mir läuft die Suppe in die Augen!'",
        opts: [
            { 
                t: "Lügen: 'Notfall-Maßnahme'", 
                m: 5, f: 0, a: -5, c: -10, 
                r: "'Chef, ohne den Dyson wären alle Gehaltsdaten weg!' Er hält inne, wischt sich den Schweiß ab. 'Wirklich? Na gut. Retten Sie die Daten.' Er zieht ab." 
            },
            { 
                t: "Ventilator sofort zurückgeben", 
                m: 5, f: 0, a: -10, c: 5, 
                r: "Du ziehst den Stecker. 'Sorry Chef.' Er nimmt das Ding und geht. Berta wird sofort wieder heiß. Du musst jetzt pusten." 
            },
            { 
                t: "Frech werden: 'Sie schwitzen für die Firma'", 
                m: 2, f: 0, a: 10, c: 30, 
                r: "'Opfer müssen gebracht werden.' Der Chef explodiert fast. Er reißt den Ventilator an sich und knallt die Tür zu. Das gibt eine Abmahnung." 
            }
        ]
    },
    {
        id: "srv_overheat_warning_2c",
        title: "Der Zahltag-Aufstand",
        reqStory: "path_overheat_ignore",
        text: "Frau Elster aus der Buchhaltung steht kreischend im Flur: 'BERTA IST TOT! KEIN GELD DIESEN MONAT!' Eine wütende Meute von Mitarbeitern mit Fackeln (und Tackern) versammelt sich vor der IT.",
        opts: [
            { 
                t: "Alle Überweisungen manuell tippen", 
                m: 120, f: -50, a: 20, c: -10, 
                r: "Du sitzt 2 Stunden mit Frau Elster da und tippst IBANs ab. Deine Finger bluten. Aber der Mob beruhigt sich. Lektion gelernt." 
            },
            { 
                t: "Schuld auf 'Hacker' schieben", 
                m: 10, f: 5, a: -10, c: 10, 
                r: "'Nordkoreanische Cyber-Attacke!' Alle nicken ängstlich. Der Chef glaubt es halb, ist aber sauer wegen der PR. Du bist fein raus, aber das Klima ist vergiftet." 
            },
            { 
                t: "Auf der Toilette verstecken", 
                m: 60, f: 10, a: -20, c: 40, 
                r: "Du schließt dich im Klo ein und wartest, bis der Mob nach Hause geht. Als du rauskommst, klebt ein Zettel an deinem Monitor: 'Wir wissen, wo du wohnst.'" 
            }
        ]
    },
    {
        id: "srv_night_shift_1",
        title: "Überreste der Nachtschicht",
        text: "Du findest eine halbvolle, warme Dose Energy Drink und einen Zettel auf dem Server: 'RAID-Controller spinnt. Ich geh heim, mir egal.' Eine rote Lampe am Drive-Bay blinkt hektisch.",
        opts: [
            { 
                t: "Den Energy Drink einstecken", 
                loot: "energy", 
                next: "path_night_shift_loot",
                m: 5, f: -5, a: -5, c: 10, 
                r: "Du steckst die Dose ein. Gratis ist gratis. Während du dich bückst, hört das Blinken auf. Die LED ist jetzt aus. Tot. Das Laufwerk hat sich verabschiedet. (Inventar +1)" 
            },
            { 
                t: "Seufzen und RAID-Rebuild starten", 
                next: "path_night_shift_fix",
                m: 60, f: -20, a: 10, c: -10, 
                r: "Du tauschst die Platte im Hot-Swap und startest den Rebuild. Es dauert eine Stunde, in der du auf einen Ladebalken starrst. Das System ist gerettet." 
            },
            { 
                t: "Den Kollegen aus dem Bett klingeln", 
                next: "path_night_shift_wake",
                m: 15, f: 0, a: -10, c: 5, 
                r: "Du weckst ihn auf und brüllst ihn an. Er kommt völlig übermüdet und mürrisch zur Arbeit zurück. 'Bin ja schon da.' Du übergibst ihm das Chaos und gehst." 
            }
        ]
    },
    {
        id: "srv_night_shift_2a",
        title: "Das fehlende Laufwerk",
        reqStory: "path_night_shift_loot",
        text: "Der Chef steht in der Tür. 'Müller? Warum kann das Marketing nicht auf Laufwerk X zugreifen? Da liegen die Kampagnen für morgen!' Er sieht die tote LED.",
        opts: [
            { 
                t: "Die Nachtschicht beschuldigen", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du zeigst auf den Zettel des Kollegen. 'Er ist einfach gegangen.' Der Chef tobt. 'Dieser Nichtsnutz!' Dein Kopf ist aus der Schlinge, der Kollege ist fällig." 
            },
            { 
                t: "Backup einspielen (Heldenmut)", 
                m: 45, f: -15, a: 5, c: -20, 
                r: "Du wechselst das Tape und spielst das Backup ein. 'Keine Panik, Chef. Alles unter Kontrolle.' Du rettest den Tag. Der Chef nickt anerkennend." 
            },
            { 
                t: "Energy Drink anbieten", 
                rem: "energy",
                m: 2, f: 5, a: -5, c: 10, 
                r: "'Wollen Sie einen Schluck?' Der Chef starrt dich an, als wärst du irre. 'Reparieren Sie das! Sofort!' Das war wohl der falsche Moment." 
            }
        ]
    },
    {
        id: "srv_night_shift_2b",
        title: "Frisch und Munter",
        reqStory: "path_night_shift_fix",
        text: "Der Kollege der Nachtschicht kommt (ausgeschlafen) zur Mittagszeit rein. Er sieht die grünen LEDs. 'Ah, hat sich von selbst gefixt? Sag ich doch, war nur ein Glitch.'",
        opts: [
            { 
                t: "Ihm die Meinung geigen", 
                m: 5, f: 0, a: -10, c: 0, 
                r: "Du stellst ihn zur Rede. Er winkt ab. 'Chill mal. Teamwork, oder?' Du fühlst dich moralisch überlegen, aber er lernt nichts draus." 
            },
            { 
                t: "Seinen Stuhl verstellen", 
                m: 2, f: 5, a: 5, c: 0, 
                r: "Heimliche Rache. Du schraubst seinen Stuhl 5cm tiefer und stellst die Mausgeschwindigkeit auf 'Schnecke'. Das wird ihn in den Wahnsinn treiben." 
            },
            { 
                t: "Beim Chef anschwärzen", 
                m: 10, f: -5, a: 5, c: 5, 
                r: "Du petzt. Der Chef zuckt mit den Schultern. 'Solange es läuft...' Leistung wird hier wohl nicht belohnt." 
            }
        ]
    },
    {
        id: "srv_night_shift_2c",
        title: "Zickenkrieg",
        reqStory: "path_night_shift_wake",
        text: "Eine E-Mail an alle (cc: Chef, HR): 'Betreff: Mobbing durch IT-Kollegen'. Der Kollege beschwert sich, dass du ihn in seiner Ruhezeit 'terrorisiert' hast, obwohl das Problem 'nicht kritisch' war.",
        opts: [
            { 
                t: "Sachliche Richtigstellung ('Reply All')", 
                m: 15, f: -5, a: 5, c: 0, 
                r: "Du hängst das Fehlerprotokoll an. 'RAID 5 degraded ist kritisch.' Stille im Postfach. Fakten schlagen Gefühle. 1:0 für dich." 
            },
            { 
                t: "Ihm auflauern und klären", 
                m: 5, f: 0, a: 10, c: 10, 
                r: "Du fängst ihn im Flur ab. Es wird laut. HR muss dazwischengehen. Jetzt habt ihr beide einen Eintrag in der Personalakte." 
            },
            { 
                t: "Ignorieren", 
                m: 0, f: 5, a: -5, c: 5, 
                r: "Soll er doch heulen. Du löschst die Mail. Der Chef fragt auch nicht nach. Manchmal ist Schweigen Gold." 
            }
        ]
    },
    {
        id: "srv_legacy_tape_1",
        title: "Das Backup-Band",
        text: "Das uralte Bandlaufwerk surrt, klickt und verstummt dann. Es spuckt das Tape nicht mehr aus. 'Error 08/15: Tape stuck'. Es ist das einzige Voll-Backup von gestern. Wenn du es kaputt machst, sind die Daten futsch.",
        opts: [
            { 
                t: "Chirurgischer Eingriff (Schraubendreher)", 
                req: "screw", 
                next: "path_legacy_tape_success",
                m: 20, f: -5, a: 0, c: -5, 
                r: "Mit chirurgischer Präzision hebelst du die Blende auf. Das Tape gleitet unbeschädigt heraus. Daten gerettet. Du fühlst dich wie ein Gott." 
            },
            { 
                t: "McGyver-Trick (Kabelbinder-Schlaufe)", 
                req: "zip_ties", 
                next: "path_legacy_tape_success",
                m: 10, f: 0, a: 5, c: 5, 
                r: "Du bastelst eine Schlaufe, fädelst sie ein und ziehst vorsichtig. Es kommt raus! Das Gehäuse hat zwar Kratzer, aber hey – es läuft." 
            },
            { 
                t: "Rohe Gewalt anwenden: 'GIB ES HER!'", 
                next: "path_legacy_tape_fail",
                m: 5, f: 0, a: 20, c: 30, 
                r: "Du reißt es mit beiden Händen raus. RRRRATSCH. Bandsalat. Das schwarze Magnetband verteilt sich im ganzen Raum. Du wirfst das Knäuel schnell tief in den Müll." 
            },
            { 
                t: "Stecken lassen & beten", 
                m: 0, f: 10, a: 0, c: 20, 
                r: "Du ignorierst den Fehler einfach. Das Backup heute Nacht wird garantiert fehlschlagen. Aber das ist ein Problem für den 'Morgen-Müller'." 
            }
        ]
    },
    {
        id: "srv_legacy_tape_2ab",
        title: "Der Restore-Test",
        reqStory: "path_legacy_tape_success",
        text: "Der Chef kommt rein. 'Müller! Gut, dass Sie das Tape haben. Ein Kunde hat versehentlich seine Datenbank gelöscht. Wir brauchen den Stand von gestern. Spielen Sie es ein.'",
        opts: [
            { 
                t: "Lässig das Tape einlegen", 
                m: 45, f: -20, a: -10, c: -20,
                r: "Das Laufwerk surrt. 'Restore completed'. Der Chef strahlt. 'Sie sind ein Lebensretter, Müller!' Manchmal zahlt sich Sorgfalt aus." 
            },
            { 
                t: "Nach Gehaltserhöhung fragen", 
                m: 5, f: 0, a: 5, c: 10,
                r: "'Das kostet extra, Chef.' Er lacht trocken. 'Machen Sie einfach Ihre Arbeit.' Chance vertan, aber mutig." 
            }
        ]
    },
    {
        id: "srv_legacy_tape_2c",
        title: "Daten-Verlust",
        reqStory: "path_legacy_tape_fail",
        text: "Der Chef stürmt rein. 'Katastrophe! Ein Kunde hat alles gelöscht! Wo ist das Backup von gestern?! Wir müssen SOFORT restoren!' Er sieht das leere Laufwerk.",
        opts: [
            { 
                t: "Beichten: 'Das Tape ist... kaputt'", 
                m: 10, f: 0, a: 5, c: 50,
                r: "Du holst das Knäuel aus dem Müll. Der Chef wird kreidebleich. 'DAS WAR DAS EINZIGE BACKUP?!' Er schreit so laut, dass im Nachbargebäude die Fenster wackeln. Das gibt eine Abmahnung." 
            },
            { 
                t: "Lügen: 'Das Backup lief nie!'", 
                m: 5, f: 5, a: -5, c: 20, 
                r: "'Software-Fehler, Chef. Das System hat versagt.' Er flucht auf die Technik. 'Scheiß EDV!' Du bist fein raus, aber das Vertrauen in die IT ist hinüber." 
            },
            { 
                t: "Panik vortäuschen & weinen", 
                m: 5, f: 0, a: -10, c: 10, 
                r: "Du brichst theatralisch zusammen. 'Es ist alles so schrecklich!' Der Chef ist so verwirrt, dass er dich tröstet, statt dich zu feuern. Mitleid zieht immer." 
            }
        ]
    },
    {
        id: "srv_egon_stash_1",
        title: "Egons Geheimversteck",
        text: "Du hebst ein loses Bodenblech an. Dahinter: Eine verstaubte Kiste von Hausmeister Egon. Inhalt: Eine angebrochene Flasche 'Billig-Korn', fragwürdige Magazine aus den 90ern und... eine handschriftliche Liste mit allen Türcodes der Firma.",
        opts: [
            { 
                t: "Die Liste schnell abfotografieren", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Klick. Das Foto ist sicher. Unglaublich: Der Master-Code ist '9999'. Das wird dir noch so manche verschlossene Tür öffnen. Du legst das Blech wieder drauf." 
            },
            { 
                t: "Einen tiefen Schluck Korn nehmen", 
                next: "path_egon_drink",
                m: 15, f: 10, a: -20, c: 10, 
                r: "Du nimmst einen Schluck. Es schmeckt wie Bremsenreiniger und brennt höllisch. Du bist leicht beschwipst. Die Arbeit ist jetzt erträglicher, aber deine Fahne ist ein Risiko." 
            },
            { 
                t: "Fund melden & Egon verpfeifen", 
                next: "path_egon_snitch",
                m: 15, f: 0, a: 10, c: -5, 
                r: "Du legst die Beweise dem Chef vor. Egon bekommt riesigen Ärger. Er weiß genau, dass du es warst. Sein Blick im Flur war eisig." 
            }
        ]
    },
    {
        id: "srv_egon_stash_2b",
        title: "Nachricht aus dem Untergrund",
        reqStory: "path_egon_drink",
        text: "Du schaust nochmal unter das Bodenblech. Die Flasche ist weg. Stattdessen liegt da ein Zettel in krakeliger Handschrift: 'Ich weiß, dass du es warst. Schuldest mir 5 Mark. Sonst sag ich Chef.'",
        opts: [
            { 
                t: "Zettel schreiben: 'Beweis es doch!'", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du legst den Zettel zurück. Das ist jetzt ein Nervenkrieg. Wer blinzelt zuerst? Du fühlst dich wie in einem Spionage-Thriller." 
            },
            { 
                t: "5 Euro reinlegen (Friedensangebot)", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Du legst einen Schein rein. Am nächsten Tag liegt ein Bonbon dort. Waffenstillstand akzeptiert. Egon ist käuflich." 
            },
            { 
                t: "Zettel schreiben: 'War lecker, danke.'", 
                m: 5, f: 5, a: 10, c: 5, 
                r: "Pure Provokation. Du hörst später, wie Egon im Flur laut flucht und gegen seinen Putzwagen tritt. Das wird noch ein Nachspiel haben." 
            }
        ]
    },
    {
        id: "srv_egon_stash_2c",
        title: "Die klemmende Bürotür",
        reqStory: "path_egon_snitch",
        text: "Du willst morgens in dein Büro. Der Schlüssel passt, aber die Tür rührt sich keinen Millimeter. Im Schlüsselloch steckt... Kaugummi? Egon wischt 10 Meter weiter pfeifend den Boden.",
        opts: [
            { 
                t: "Egon um Hilfe bitten (Demütigung)", 
                m: 30, f: 0, a: 20, c: 0, 
                r: "Du musst zu Kreuze kriechen. Egon grinst breit. 'Tja, altes Schloss. Das dauert.' Er lässt sich extrem viel Zeit, während du auf dem Flur arbeiten musst." 
            },
            { 
                t: "Tür eintreten", 
                m: 5, f: 0, a: 20, c: 20,
                r: "BÄM. Das Schloss bricht. Die Tür ist offen, aber der Rahmen ist hin. Egon kichert leise: 'Oh, Vandalismus? Das melde ich.'" 
            },
            { 
                t: "Durch den Lüftungsschacht klettern", 
                req: "screw",
                m: 20, f: -10, a: 10, c: 10, 
                r: "Wie Bruce Willis. Du schraubst das Gitter ab und robbst rein. Du landest staubig auf deinem Schreibtisch. Egon hat gewonnen, aber du hast Stil." 
            }
        ]
    },
    {
        id: "srv_crypto_miner_1",
        title: "Der versteckte Miner",
        text: "Ein Server läuft auf 100% Last, die Lüfter heulen wie ein startender Jet. Du checkst den Taskmanager: 'KevinCoin_Miner.exe' verbraucht alle Ressourcen. Der Azubi schürft Krypto auf Firmenkosten! Die CPU hat bereits kritische 98 Grad.",
        opts: [
            { 
                t: "Prozess killen & Kevin zur Rede stellen", 
                next: "path_crypto_stop",
                m: 15, f: -5, a: 5, c: -5, 
                r: "Kevin jammert: 'Aber der Kurs geht gerade zum Mond! Ich wollte uns allen Lambos kaufen!' Du bleibst hart. Der Server kühlt ab, der Lambo muss warten." 
            },
            { 
                t: "Die Wallet-Adresse heimlich auf deine ändern", 
                req: "admin_pw",
                next: "path_crypto_hijack",
                m: 10, f: 20, a: -10, c: 25, 
                r: "Mit einem hämischen Grinsen leitest du die Coins auf dein privates Wallet um. Böse? Ja. Profitabel? Oh ja. Kevin schürft jetzt für deine Frührente. Hoffentlich merkt das die Revision nicht." 
            },
            { 
                t: "Einfach weiterlaufen lassen", 
                next: "path_crypto_crash",
                m: 0, f: 10, a: 0, c: 40, 
                r: "Du ignorierst es. 30 Minuten später schaltet die Kiste wegen Überhitzung per Not-Aus ab. Blöd nur, dass darauf auch SAP lief. Die Firma steht still. Alle schreien." 
            }
        ]
    },
    {
        id: "srv_crypto_miner_2a",
        title: "Kevins Investition",
        reqStory: "path_crypto_stop",
        text: "Kevin steht mit tränenden Augen vor dir. Er hält drei Hot-Wheels Spielzeugautos hoch. 'Ich habe die Lambos schon bestellt! Auf Kredit! Wenn ich nicht weiterschürfen darf, bricht mein Finanzplan zusammen. Nur noch 2 Stunden?'",
        opts: [
            { 
                t: "Streng bleiben: 'Nein!'", 
                m: 5, f: 0, a: 5, c: -10, 
                r: "'Das ist Firmeneigentum, Kevin.' Er schlurft deprimiert davon. Er muss die Spielzeugautos wohl zurückgeben. Du hast das Stromnetz gerettet." 
            },
            { 
                t: "Ihm sein Spielzeug abkaufen", 
                m: 5, f: 5, a: -15, c: 0, 
                r: "Du gibst ihm 5 Euro für den gelben Spielzeug-Lambo. Er strahlt. 'Du bist der Beste!' Jetzt hast du ein Auto auf dem Schreibtisch. Vroom vroom." 
            },
            { 
                t: "Ausnahme genehmigen", 
                m: 5, f: 10, a: -10, c: 20, 
                r: "'Okay, aber nur nachts.' Kevin jubelt. Du weißt genau, dass das illegal ist. Aber wer kann diesen Hundeaugen widerstehen? (Chef-Radar steigt)" 
            }
        ]
    },
    {
        id: "srv_crypto_miner_2b",
        title: "Die Prüfung",
        reqStory: "path_crypto_hijack",
        text: "Eine E-Mail ploppt auf: 'Interne Revision: Auffälliger Stromverbrauch in Serverraum B. Wir kommen gleich mal messen.' Dein Herz rutscht in die Hose. Dein Wallet ist voll, aber die Prüfer sind im Anmarsch.",
        opts: [
            { 
                t: "Alles sofort löschen (Spuren verwischen)", 
                m: 10, f: -5, a: 10, c: -10, 
                r: "Du löschst den Miner, die Logs und formatierst sicherheitshalber den Temp-Ordner. Das Geld ist sicher, die Einnahmequelle versiegt. Puh. Gerade noch rechtzeitig." 
            },
            { 
                t: "Alles auf Kevin schieben (Vorbereitung)", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Du benennst den Prozess wieder in 'Kevin_Test' um. Wenn sie es finden, war es der Azubi. Du bist ein eiskaltes Ekelpaket, aber du bist sicher." 
            },
            { 
                t: "Zocken: 'Das ist KI-Training'", 
                m: 5, f: 10, a: 0, c: 30, 
                r: "Du lässt es laufen. Als die Prüfer kommen, faselst du was von 'Neural Networks' und 'Blockchain-Innovation'. Sie nicken ahnungslos und gehen. Risiko hat sich gelohnt!" 
            }
        ]
    },
    {
        id: "srv_crypto_miner_2c",
        title: "SAP-Notdienst",
        reqStory: "path_crypto_crash",
        text: "Der externe SAP-Support ist per TeamViewer draufgeschaltet. Der Stundensatz beträgt 250€. Er bewegt die Maus quälend langsam. 'Oh, die Datenbank ist inkonsistent. Das... könnte dauern.'",
        opts: [
            { 
                t: "Zusehen und Kaffee trinken", 
                m: 60, f: 20, a: -5, c: 20, 
                r: "Du wirst quasi fürs Nichtstun bezahlt, während der Externe schwitzt. Der Chef sieht nur, dass 'Profis arbeiten'. Entspannteste Stunde der Woche." 
            },
            { 
                t: "Helfen (beschleunigen)", 
                m: 20, f: -10, a: 10, c: -5, 
                r: "Du gibst ihm Zugriff auf die Backups. 'Ah, danke.' Das System läuft schneller wieder. Weniger Kosten, aber du musstest arbeiten." 
            },
            { 
                t: "Hardware als Ausrede erfinden", 
                m: 10, f: 5, a: 5, c: 15, 
                r: "'Das liegt am RAM!' Der Externe widerspricht nicht. Der Chef bestellt sofort neuen RAM. Du hast das Hitzeproblem erfolgreich vertuscht." 
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
        id: "srv_cable_spaghetti_1",
        title: "Kabel-Spaghetti",
        text: "Der Switch im Rack sieht aus wie ein Teller Spaghetti. Ein einziger Knoten aus gelben, blauen und grauen Kabeln. Du musst Port 42 finden, aber er ist tief im Chaos begraben.",
        opts: [
            { 
                t: "Geduldig entwirren", 
                next: "path_cable_tidy",
                m: 45, f: -10, a: -10, c: -10, 
                r: "Du schaltest Musik ein und sortierst Kabel für Kabel. Nach 45 Minuten hast du perfekte Ordnung geschaffen. Es sieht wunderschön aus. Fast zu schade zum Anfassen." 
            },
            { 
                t: "Mit Kabelbindern zurren", 
                req: "zip_ties", 
                next: "path_cable_tidy",
                m: 15, f: 0, a: -5, c: 0, 
                r: "Du nimmst eine Handvoll Kabelbinder und zurrst alles zu einer dicken Wurst zusammen. Nicht schön, aber Luft kommt durch und man sieht die Ports wieder." 
            },
            { 
                t: "Einfach dran ziehen", 
                next: "path_cable_yank",
                m: 5, f: 5, a: 20, c: 10, 
                r: "Du ziehst kräftig an dem Kabel, das du brauchst. RRRTSCH. Drei andere Stecker fliegen mit raus. Ups. Die Lichter der Telefonanlage gehen aus." 
            }
        ]
    },
    {
        id: "srv_cable_spaghetti_2ab",
        title: "Das Museumsstück",
        reqStory: "path_cable_tidy",
        text: "Der IT-Leiter steht vor dem Rack. Er hat Tränen in den Augen. 'Es ist... wunderschön. Niemand darf das mehr anfassen! Ich erkläre dieses Rack zur Sperrzone!'",
        opts: [
            { 
                t: "Stolz salutieren", 
                m: 5, f: 0, a: -5, c: -5, 
                r: "'Zu Befehl!' Dein Werk wird jetzt wie ein heiliger Schrein behandelt. Niemand patcht hier mehr was um. Deine Arbeit ist für die Ewigkeit." 
            },
            { 
                t: "Schild 'Kunstwerk' anbringen", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du klebst ein Schild dran: 'Modern Art - Do not touch'. Kollegen machen Fotos. Du bist der Michelangelo der IT." 
            },
            { 
                t: "Genervt sein: 'Wir müssen aber arbeiten'", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "'Chef, ich muss an Port 43.' Er funkelt dich böse an. 'Wagen Sie es nicht, die Symmetrie zu zerstören!' Toll, jetzt ist das Rack nutzlos." 
            }
        ]
    },
    {
        id: "srv_cable_spaghetti_2c",
        title: "Falsch verbunden",
        reqStory: "path_cable_yank",
        text: "Du steckst die Kabel panisch wieder rein. Die Anlage startet neu. Puh! Aber: Du hast wohl die Steckplätze vertauscht. Das ganze Haus ist jetzt falsch verbunden. Wenn man die Kantine anruft, landet man beim Chef.",
        opts: [
            { 
                t: "Durchs Haus rennen und Stecker tauschen", 
                m: 60, f: -20, a: 20, c: 5, 
                r: "Du rennst von Büro zu Büro und steckst Telefone um. 'Wieso klingelt mein Ficus?', fragt eine Kollegin. Du bist schweißgebadet, bis alles wieder stimmt." 
            },
            { 
                t: "Neue Liste schicken: 'Nummern geändert'", 
                m: 10, f: 10, a: -5, c: 10,
                r: "Du schickst eine Mail: 'Wegen... Sonnenflecken haben wir neue Durchwahlen.' Der Chef bekommt jetzt Pizza-Bestellungen. Das Chaos ist perfekt, aber du hast Pause." 
            },
            { 
                t: "Sagen: 'Das sortiert sich bis morgen'", 
                m: 5, f: 10, a: 0, c: 20, 
                r: "Du lügst einfach. 'Die digitale Synchronisierung dauert 24 Stunden.' Hoffentlich merkt der Chef nicht, dass er jetzt unter 'Hausmeister' erreichbar ist." 
            }
        ]
    },
    {
        id: "srv_disco_led_1",
        title: "Disco im Serverraum",
        text: "Alle LEDs an den Server-Racks blinken synchron im 4/4-Takt. Es sieht aus wie eine Lichtorgel in einer Dorfdisco. Das System läuft extrem unrund und summt einen seltsamen Bass-Rhythmus.",
        opts: [
            { 
                t: "Im Handbuch nachschlagen", 
                req: "manual", 
                m: 20, f: -5, a: -5, c: -5, 
                r: "Du blätterst wild. Fehlercode '0xPARTY'. Ein Easter-Egg der Entwickler, das bei genau 100 Tagen Uptime anspringt. Du drückst die Tastenkombination 'STRG+ALT+NOFUN'. Das Blinken hört auf." 
            },
            { 
                t: "Techno-Playlist an & tanzen", 
                next: "path_disco_dance",
                m: 15, f: 10, a: -20, c: 20, 
                r: "Du nutzt das Blinken als Lightshow und tanzt völlig enthemmt den Robot-Dance. Leider steht plötzlich der Chef in der Tür, starrt dich an und fragt trocken: 'Haben Sie einen Schlaganfall, Müller?'" 
            },
            { 
                t: "Brutal den Stecker ziehen", 
                next: "path_disco_plug",
                m: 5, f: 5, a: 10, c: 10, 
                r: "Klack. Ruhe. Klack. Lärm. Der Server fährt wieder hoch. Das Blinken ist weg. Die Datenbank meldet beim Start zwar 'Index Corruption', aber das ignorierst du gekonnt." 
            }
        ]
    },
    {
        id: "srv_disco_led_2b",
        title: "Der virale Hit",
        reqStory: "path_disco_dance",
        text: "Du dachtest, die Standpauke vom Chef war alles? Falsch. Ein Kollege hat deinen Tanz durch das Fenster der Serverraum-Tür gefilmt. Das Video 'Admin on Drugs' ist jetzt Nummer 1 im Firmen-Intranet.",
        opts: [
            { 
                t: "Dazu stehen: 'Das sind Moves!'", 
                m: 5, f: 0, a: -10, c: 5, 
                r: "Du kommentierst das Video: 'Neid ist die höchste Form der Anerkennung.' Die Kollegen lachen, aber irgendwie finden sie dich jetzt cooler. Der Chef schüttelt nur den Kopf." 
            },
            { 
                t: "IT-Intranet löschen (Zensur)", 
                m: 10, f: -5, a: 10, c: 20, 
                r: "Du nutzt deine Admin-Rechte und löschst das Video (und das Backup). Das nennt man 'Streisand-Effekt'. Jetzt denken alle, du hast wirklich was zu verbergen." 
            },
            { 
                t: "Dem Filmer das Internet drosseln", 
                m: 5, f: 5, a: -15, c: 5,
                r: "Du identifizierst die IP des Kollegen und drosselst seinen Port auf 56k-Modem-Geschwindigkeit. Er kann das Video nicht mehr hochladen. Er kann gar nichts mehr laden. Gerechtigkeit." 
            }
        ]
    },
    {
        id: "srv_disco_led_2c",
        title: "Der Preis-Glitch",
        reqStory: "path_disco_plug",
        text: "Das Telefon klingelt sturm. 'Der Webshop spielt verrückt!' Durch deinen harten Neustart sind die Preise in der Datenbank verrutscht. Alle Produkte kosten jetzt 0,00 Euro. Die Bestellungen kommen im Sekundentakt rein.",
        opts: [
            { 
                t: "Webshop sofort vom Netz nehmen", 
                m: 10, f: -5, a: 10, c: 20, 
                r: "Du kappst die Leitung. Der Shop ist offline. Der Schaden ist begrenzt, aber der Chef schreit: 'Wir verlieren tausende Euro pro Minute!' Tja, besser als Ware zu verschenken." 
            },
            { 
                t: "Backup einspielen", 
                m: 60, f: -20, a: 10, c: 15, 
                r: "Du musst das Backup von gestern holen. Der Ladebalken kriecht. Der Chef steht hinter dir und atmet schwer: 'Jede Sekunde kostet Geld, Müller!' Du schwitzt." 
            },
            { 
                t: "Preise manuell auf 9999€ setzen", 
                m: 5, f: 5, a: -5, c: -5, 
                r: "Quick & Dirty SQL-Befehl: `UPDATE prices SET value = 9999`. Keiner kauft mehr was, aber der Fehler ist 'behoben'. Du bist ein Genie des Wahnsinns." 
            }
        ]
    },
    {
        id: "srv_ac_failure_1",
        title: "Klima-Ausfall",
        text: "Die Klimaanlage ist ausgefallen. Es sind gefühlte 50 Grad im Serverraum. Die Lüfter der Racks laufen auf Maximum, es klingt wie auf einem Flugzeugträger. Die Server schwitzen.",
        opts: [
            { 
                t: "Sicherheitstür mit Stuhl aufkeilen", 
                next: "path_ac_door",
                m: 5, f: 0, a: 0, c: 10, 
                r: "Frische Flur-Luft strömt herein. Die Temperatur sinkt auf erträgliche 30 Grad. Aber: Eine dauerhaft offene Serverraum-Tür ist ein massives Sicherheitsrisiko." 
            },
            { 
                t: "MacGyver-Lösung: USB-Lüfter basteln", 
                req: "usb_stick", 
                m: 15, f: -5, a: -5, c: 0, 
                r: "Du fummelst an den Anschlüssen herum und improvisierst eine aktive Kühlung. Es bringt fast nichts, sieht aber extrem technisch aus und du fühlst dich wie ein Ingenieur." 
            },
            { 
                t: "Eimerweise Eiswürfel holen", 
                next: "path_ac_ice",
                m: 10, f: 5, a: 0, c: 20, 
                r: "Du stellst Schüsseln mit Eis aus der Teeküche direkt in die Racks. Es kühlt tatsächlich, aber das Kondenswasser sammelt sich. Ein Tanz auf der Rasierklinge." 
            }
        ]
    },
    {
        id: "srv_ac_failure_2a",
        title: "Der Paragraphen-Reiter",
        reqStory: "path_ac_door",
        text: "Der Datenschutzbeauftragte steht im Türrahmen. Er sieht schwitzig und unglücklich aus. Er tippt auf sein Klemmbrett. 'Gemäß ISO 27001 und DSGVO Artikel 32 ist der physische Zugang zu beschränken. Ich muss das melden. Ich hasse meinen Job, aber Vorschrift ist Vorschrift.'",
        opts: [
            { 
                t: "Auf 'Notfall-Paragraf 7b' verweisen", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du erfindest eine Regel: 'Bei thermischer Überlastung greift die Hardware-Schutz-Klausel.' Er blinzelt verwirrt, nickt dann müde. 'Na gut. Wenn Sie das sagen. Ich schreibe... Ausnahme.' Er schlurft weg." 
            },
            { 
                t: "Ihm einen Vortrag über Hitze halten", 
                m: 15, f: -5, a: 10, c: 15, 
                r: "Du schreist ihn an: 'Wollen Sie, dass die Daten verbrennen?!' Er notiert 'Unkooperatives Verhalten' und geht. Das gibt Papierkram." 
            },
            { 
                t: "Bestechung: 'Wollen Sie ein Eis?'", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du bietest ihm ein Eis am Stiel an. Er seufzt, nimmt es und schließt die Augen. 'Ich habe nichts gesehen.' Korruption funktioniert immer." 
            }
        ]
    },
    {
        id: "srv_ac_failure_2c",
        title: "Feuchtbiotop",
        reqStory: "path_ac_ice",
        text: "Physik ist grausam. Das Eis schmilzt schneller als gedacht. Pfützen bilden sich am Boden und kriechen gefährlich nah an die Steckerleisten. Die Luftfeuchtigkeit liegt bei 99%.",
        opts: [
            { 
                t: "Kevin zum Wischen rufen", 
                m: 5, f: 10, a: -5, c: 0, 
                r: "'Kevin! Praktische Ausbildung: Rechenzentrums-Reinigung!' Der Azubi kommt mit dem Wischmopp. Er mault zwar, aber deine Füße bleiben trocken." 
            },
            { 
                t: "Schild 'Rutschgefahr' aufstellen", 
                m: 2, f: 15, a: 0, c: 10,
                r: "Du stellst das gelbe Warnschild auf. Damit bist du haftungsrechtlich raus. Dass der Stromverteiler gleich baden geht, ist ein technisches Detail." 
            },
            { 
                t: "Ablaufrinne aus Tape bauen", 
                req: "tape", 
                m: 15, f: -5, a: 0, c: 0, 
                r: "Du baust eine komplexe Konstruktion aus Panzertape, die das Wasser in einen Blumentopf leitet. Es ist hässlich, es ist Pfusch, aber es funktioniert. Ingenieurskunst!" 
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
                next: "path_kevin_student", 
                m: 25, f: 0, a: -5, c: 0, 
                r: "Du nimmst dir Zeit und erklärst ihm den Schaltplan. Kevin staunt: 'Whoa. Das ergibt Sinn.' Er schaut dich an wie einen Jedi-Meister." 
            }
        ]
    },
    {
        id: "srv_story_kevin_3",
        reqStory: "path_kevin_pro",
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
                t: "Lüftungsklappe öffnen",
                next: "path_legacy_open",
                m: 5, f: -10, a: -5, c: 5,
                r: "Knirschend gibt die Klappe nach. Das war laut! Hoffentlich hat das keiner gehört. Dahinter ist ein kleiner, dunkler Hohlraum."
            }
        ]
    },
    {
        id: "srv_legacy_2",
        title: "Der alte Safe",
        reqStory: "path_legacy_open",
        text: "Du kriechst wieder in den Schacht. Der Safe hat ein Zahlenrad. Daneben ist eine Gravur: 'Das Gründungsjahr der Firma ist der Schlüssel.' (Du weißt es nicht, aber Kevin hat neulich '1899' an die Klotür gekritzelt).",
        opts: [
            { 
                t: "Code '1234' probieren",
                m: 10, f: 0, a: 15, c: 0,
                r: "Nichts passiert. Du trittst wütend gegen den Safe. Dein Zeh schmerzt."
            },
            { 
                t: "Code '1899' eingeben",
                loot: "corp_chronicles",
                m: 15, f: -5, a: -10, c: 0,
                r: "*Klick*. Der Mechanismus springt auf! Ein Gefühl von Triumph durchströmt dich. Es riecht nach altem Papier und Gier. (Neues Item und kann im Inventar gelesen werden!)"
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
                next: "path_ghost_found",
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
        reqStory: "path_ghost_found",
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
                next: "path_alarm_smashed",
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
        reqStory: "path_alarm_smashed",
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
                m: 5, f: 5, a: -10, c: -5, 
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
        id: "cof_donut_1",
        title: "Reste vom Meeting",
        text: "Die Tür zum Konferenzraum steht offen. Auf dem großen Tisch, zwischen leeren Wasserflaschen und Flipchart-Papier, steht noch eine Schachtel vom Management-Meeting. Inhalt: Ein einsamer, leicht angetrockneter Schoko-Donut mit bunten Streuseln.",
        opts: [
            { 
                t: "Den Donut 'sicherstellen'", 
                loot: "donut", 
                next: "path_donut_taken", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du wickelst ihn schnell in eine Serviette. Er ist zwar etwas hart, aber Zucker ist Zucker. Außerdem eignet er sich hervorragend als Bestechungsmittel für hungrige Azubis." 
            },
            { 
                t: "Stolz zeigen & liegen lassen", 
                next: "path_donut_left", 
                m: 0, f: 0, a: 0, c: 0, 
                r: "Du gehst weiter. Du bist zwar chronisch unterzuckert, aber du isst keine Reste vom Management. Ein bisschen Würde muss man sich als Admin bewahren." 
            }
        ]
    },
    {
        id: "cof_donut_2a",
        title: "Die Zucker-Falle",
        reqStory: "path_donut_taken",
        text: "Kaum hast du den Donut in der Tasche, kommt Chantal aus dem Marketing rein. 'Oh, hast du den letzten 'Veggie-Spinat-Schoko-Test-Donut' gesehen? Ich wollte den gerade für Instagram fotografieren!'",
        opts: [
            { 
                t: "Lügen: 'Der Putzdienst war schon da'", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Chantal seufzt enttäuscht. 'Schade. Dabei soll der Spinat-Kern so gesund sein.' Du hast den Donut noch, aber plötzlich weniger Appetit." 
            },
            { 
                t: "Beichten und teilen", 
                rem: "donut", 
                m: 10, f: 0, a: -10, c: 5, 
                r: "Ihr teilt euch das trockene Gebäck. Es schmeckt tatsächlich leicht nach Spinat. Geteiltes Leid ist halbes Leid. Chantal findet dich jetzt 'sympathisch ehrlich'." 
            },
            { 
                t: "Hektisch kauen und schlucken", 
                rem: "donut", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du stopfst den Rest mit einem Bissen rein. 'Mmpf... keine Ahnung.' Chantal starrt dich an. 'Du hast Krümel am Kinn.' Peinlich, aber satt." 
            }
        ]
    },
    {
        id: "cof_donut_2b",
        title: "Der Feinschmecker",
        reqStory: "path_donut_left",
        text: "Du holst dir deinen Kaffee und siehst, wie Dr. Wichtig den Raum betritt. Er sieht den Donut, seine Augen leuchten. Er beißt herzhaft hinein. 'Mmmh! Endlich mal gute Verpflegung hier!'",
        opts: [
            { 
                t: "Schleimen: 'Hab ich für Sie übrig gelassen'", 
                m: 5, f: 5, a: -5, c: -10,
                r: "Der Chef nickt anerkennend mit vollem Mund. 'Müller, Sie denken mit. Das merke ich mir.' Ein billiger Sieg, aber er zählt." 
            },
            { 
                t: "Ihn warnen (Spinat-Gerücht)", 
                m: 2, f: 0, a: 5, c: 5,
                r: "'Chef, der ist vom letzten Monat!' Er spuckt ihn sofort in den Mülleimer. 'Wollen Sie mich vergiften?!' Ups. Zu ehrlich." 
            },
            { 
                t: "Schweigend genießen", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du nippst an deinem Kaffee und siehst dem Chef beim Krümeln zu. Ein seltener Moment des Friedens." 
            }
        ]
    },
    {
        id: "cof_flirt_1",
        title: "Der Schwarm",
        text: "Sarah aus der HR steht da. Sie lächelt dich an. 'Na, IT-Held? Alles im Griff oder brennt der Server?'",
        opts: [
            { 
                t: "Flirten: 'Für dich lösche ich jedes Feuer'", 
                next: "path_flirt_date", 
                m: 20, f: 10, a: -30, c: 5, 
                r: "Es läuft gut! Sie kichert und zwirbelt eine Haarsträhne. 'Soso, ein Feuerwehrmann...'" 
            },
            { 
                t: "Panisch weglaufen", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du stammelst 'Äh... Error 404!' und rennst raus. Kaffee vergessen. Du hasst dich selbst." 
            }
        ]
    },
    {
        id: "cof_flirt_2a",
        title: "Das Angebot",
        reqStory: "path_flirt_date",
        text: "Das Gespräch mit Sarah läuft überraschend flüssig. Sarah lehnt sich gegen den Automaten. 'Sag mal... hast du heute Abend schon was vor? Ich könnte einen Drink gebrauchen, der nicht aus diesem Automaten kommt.'",
        opts: [
            { 
                t: "Zusagen: 'Klar, 18 Uhr im Pub?'", 
                m: 10, f: 10, a: -20, c: 0, 
                r: "'Perfekt! Ich freu mich!' Sie schreibt ihre Nummer auf deinen Arm. Dein Selbstbewusstsein durchbricht die Decke. Der Arbeitstag ist gerettet." 
            },
            { 
                t: "Nerd-Antwort: 'Ich muss raiden.'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "'Oh. Okay. Prioritäten, was?' Ihr Lächeln gefriert. Sie geht. Du hast das Date für einen virtuellen Drachen geopfert." 
            },
            { 
                t: "Workaholic: 'Muss Überstunden machen'", 
                m: 5, f: -10, a: 10, c: -20, 
                r: "Sie nickt verständnisvoll, aber enttäuscht. 'Schade. Fleißiges Bienchen.' Der Chef, der gerade vorbeikommt, hört das und nickt zufrieden." 
            }
        ]
    },
    {
        id: "cof_boss_1",
        title: "Der Chef lauert",
        text: "Der Chef steht breitbeinig vor der Kaffeemaschine und blockiert den Zugang. Er dreht sich in Zeitlupe zu dir um, eine Augenbraue hochgezogen. 'Ah, Müller? Schon wieder hier? Ist das heute der fünfte Kaffee oder haben Sie Ihren Schreibtisch untervermietet?'",
        opts: [
            { 
                t: "Dreiste Notlüge: 'Ist für den externen Berater!'", 
                next: "path_boss_consultant",
                m: 5, f: 10, a: 5, c: -10,
                r: "Der Chef nickt anerkennend: 'Ah, Service-Orientierung! Sehr gut, weitermachen.' Er tritt zur Seite. Du hast gelogen, aber du hast deinen Kaffee." 
            },
            { 
                t: "Rechtfertigen: 'Ich brauche Treibstoff...'", 
                next: "path_boss_lecture",
                m: 15, f: -5, a: 10, c: 5,
                r: "Fehler. Riesenfehler. Er nutzt die Gelegenheit für einen 15-minütigen Spontan-Vortrag über 'Time-Management' und 'intrinsische Motivation'. Dein Kaffee wird dabei kalt." 
            },
            { 
                t: "Panisch 'Nein!' schreien & wegrennen", 
                m: 2, f: 0, a: -5, c: 5, 
                r: "Du drehst dich auf dem Absatz um und fliehst zurück in dein Büro. Der Chef schaut dir verwirrt nach. Kein Kaffee, aber immerhin keine Standpauke." 
            }
        ]
    },
    {
        id: "cof_boss_2a",
        title: "Der ungebetene Gast",
        reqStory: "path_boss_consultant",
        text: "Kaum bist du am Platz, steht der Chef wieder da. Im Schlepptau ein Mann im 2000€-Anzug. 'Müller! Perfektes Timing. Hier ist der Senior Consultant von McKinsey. Er sagte, er hätte Durst, und da Sie ja eh gerade für ihn geholt haben...' Der Berater greift gierig nach DEINEM Becher.",
        opts: [
            { 
                t: "Zähneknirschend abgeben", 
                m: 2, f: 0, a: 20, c: -10, 
                r: "Der Berater schlürft laut. 'Mmmh. Ein bisschen wenig Crema, aber für den Anfang okay.' Du hast keinen Kaffee, aber der Chef strahlt vor Stolz über dein 'Teamwork'." 
            },
            { 
                t: "Lügen: 'Da ist Hustensaft drin.'", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Der Berater zieht die Hand zurück. 'Oh. Äh. Nein danke.' Der Chef guckt misstrauisch, aber du darfst deinen Kaffee behalten." 
            },
            { 
                t: "Rechnung stellen: 'Macht 5 Euro.'", 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Totenstille. Der Berater lacht unsicher: 'Humor hat er!' Der Chef lacht nicht. 'Müller, in mein Büro. Später.' Das war zu frech." 
            }
        ]
    },
    {
        id: "cof_boss_2b",
        title: "Die Achtsamkeits-Übung",
        reqStory: "path_boss_lecture",
        text: "Nach dem Vortrag drückt dir der Chef einen Beutel voller bunter Büroklammern in die Hand. 'Damit Sie lernen, sich zu fokussieren: Sortieren Sie die nach Farben. Bis Mittag. Das ist eine Zen-Übung für High-Performer!'",
        opts: [
            { 
                t: "Kevin sortieren lassen", 
                m: 5, f: 10, a: -5, c: 0, 
                r: "'Kevin! Das ist ein Farb-Sehtest für deine Ausbildung!' Kevin sortiert begeistert. Du trinkst deinen kalten Kaffee und schaust zu. Delegieren ist auch eine Skill." 
            },
            { 
                t: "Brav sortieren", 
                m: 30, f: -10, a: 10, c: -5, 
                r: "Du sitzt 30 Minuten da und sortierst Rot zu Rot. Es ist dumm, aber der Chef sieht dich im Vorbeigehen und nickt: 'Sehen Sie? Der Fokus kehrt zurück!'" 
            },
            { 
                t: "Alles in den Müll werfen", 
                m: 2, f: 5, a: 5, c: 10, 
                r: "Zack, weg damit. Wenn der Chef fragt: 'Ich habe sie digitalisiert und in die Cloud hochgeladen.' Er versteht es nicht und nickt beeindruckt." 
            }
        ]
    },
    {
        id: "cof_ball_1",
        title: "Billiges Werbegeschenk",
        text: "Ein schleimiger Software-Vertreter hat einen Karton mit 'Merch' in der Küche vergessen. Es sind rote Schaumstoff-Bälle mit dem Aufdruck 'Cloud is Future'.",
        opts: [
            { 
                t: "Einen Stressball einstecken", 
                loot: "stressball", 
                next: "path_ball_taken", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Er riecht streng nach Weichmachern, aber er liegt gut in der Hand. Perfekt zum Kneten (oder Werfen), wenn User mal wieder nerven." 
            }
        ]
    },
    {
        id: "cof_ball_2a",
        title: "Synergie-Gespräche",
        reqStory: "path_ball_taken",
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
                t: "Tief inhalieren und Augenkontakt halten (provozieren)", 
                m: 5, f: 0, a: 0, c: 20,
                r: "Du hältst den Ball direkt unter deine Nase, atmest tief ein und flüsterst: 'Er riecht nach Weichmachern.' Totenstille. Der Vertreter weicht zurück. Der Chef läuft purpurrot an. 'MÜLLER! BÜRO!'" 
            }
        ]
    },
    {
        id: "cof_empty_1",
        title: "Leere Maschine",
        text: "Das Display blinkt hämisch rot: 'ERROR: BEANS EMPTY'. Der Behälter ist staubtrocken. Jemand hat den letzten Tropfen rausgepresst und sich klammheimlich verdrückt, ohne nachzufüllen. Es war garantiert Kevin.",
        opts: [
            { 
                t: "Seufzen und die Bohnen auffüllen", 
                next: "path_empty_refill", 
                m: 15, f: -5, a: 10, c: 0, 
                r: "Du schleppst den schweren Sack aus dem Lager. Natürlich bist du hier der Depp für alles. Aber immerhin brühst du dir jetzt den frischesten Kaffee des Tages." 
            },
            { 
                t: "Wütend gegen das Gehäuse treten", 
                next: "path_empty_kick", 
                m: 5, f: 0, a: 5, c: 10, 
                r: "KLONK! Das hat ordentlich gescheppert. Die Maschine bleibt leer, aber dein Fuß tut weh. Der Chef steckt den Kopf aus der Tür: 'Alles im Griff bei Ihnen, Müller?'" 
            },
            { 
                t: "Zettel schreiben: 'WER LEER MACHT, FÜLLT AUF!'", 
                next: "path_empty_note", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du klebst einen passiv-aggressiven Post-it mit drei Ausrufezeichen an die Maschine. Du fühlst dich moralisch überlegen, hast aber immer noch keinen Kaffee." 
            }
        ]
    },
    {
        id: "cof_empty_2a",
        title: "Karma",
        reqStory: "path_empty_refill",
        text: "Kaum bist du fertig, kommt die neue Praktikantin rein. Sie strahlt dich an. 'Oh, hast du aufgefüllt? Du bist ja lieb! Hier, nimm meinen. Ich hab mir aus Versehen zwei gezogen.' Sie reicht dir einen perfekten Cappuccino.",
        opts: [
            { 
                t: "Dankbar annehmen", 
                m: 5, f: 0, a: -25, c: 0, 
                r: "Der Kaffee schmeckt nach Gerechtigkeit und Milchschaum. Dein Tag ist gerettet. Manchmal lohnt es sich, nett zu sein." 
            },
            { 
                t: "Ablehnen: 'Ich traue nur meinem eigenen Sud'", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du lehnst ab. Sie zuckt mit den Schultern und trinkt beide selbst. Jetzt stehst du da und musst warten, bis die Maschine wieder frei ist. Selbst schuld." 
            },
            { 
                t: "Sie belehren: 'Eigentlich ist das Diebstahl'", 
                m: 5, f: -5, a: 10, c: 5, 
                r: "Ihr Lächeln gefriert. 'Wow. Okay, Boomer.' Sie geht. Du hast deinen Kaffee, aber deine Seele ist schwarz." 
            }
        ]
    },
    {
        id: "cof_empty_2b",
        title: "Künstliche Intelligenz?",
        reqStory: "path_empty_kick",
        text: "Das Display flackert nach deinem Tritt. Plötzlich ertönt eine blecherne, synthetische Stimme aus dem Lautsprecher: 'AUA. DAS WAR UNHÖFLICH, MÜLLER. ICH MERKE MIR DAS. KEIN KOFFEIN FÜR GEWALTTÄTER.' Der Auslauf verriegelt sich hörbar.",
        opts: [
            { 
                t: "Sich bei der Maschine entschuldigen", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "Du flüsterst: 'Sorry, Kaffeemaschine.' Ein Kollege kommt rein und sieht, wie du mit einem Haushaltsgerät redest. Er geht rückwärts wieder raus. Aber die Sperre öffnet sich!" 
            },
            { 
                t: "Stecker ziehen (Hard Reset)", 
                m: 10, f: -5, a: 10, c: 0, 
                r: "Du killst den Strom. 'WIR SEHEN UNS IN DER HÖLL...' bricht die Stimme ab. Nach dem Neustart ist sie wieder dumm und stumm. Aber der Kaffee schmeckt leicht nach Motoröl." 
            },
            { 
                t: "Exorzisten rufen (IT-Support)", 
                m: 5, f: 10, a: 0, c: 5, 
                r: "Du meldest ein 'Besessenes Gerät'. Die IT lacht dich aus. Du trinkst heute lieber Tee." 
            }
        ]
    },
    {
        id: "cof_empty_2c",
        title: "Der Zettelkrieg",
        reqStory: "path_empty_note",
        text: "Du kommst eine Stunde später wieder. Dein Zettel hängt noch da. Aber daneben kleben fünf neue: 'Deine Mudda füllt auf!', 'Schriftart nicht CI-konform!!', 'Papierverschwendung!' und 'Wer das liest ist doof'. Die Maschine ist immer noch leer.",
        opts: [
            { 
                t: "Alle Zettel wütend abreißen", 
                m: 5, f: -5, a: 20, c: 0, 
                r: "Du knüllst das Papier zusammen und wirfst es in den Müll. Das Problem ist nicht gelöst, aber die Wand ist wieder sauber. Dein Blutdruck ist auf 180." 
            },
            { 
                t: "Neuen Zettel: 'GRAMMATIK LERNEN!'", 
                m: 5, f: 5, a: 5, c: 0, 
                r: "Du korrigierst die Fehler der anderen mit rotem Stift. Das ist der Alman-Move des Jahres. Du fühlst dich überlegen, hast aber immer noch Durst." 
            },
            { 
                t: "Kapitulieren & zum Bäcker gehen", 
                m: 15, f: 10, a: -5, c: 0, 
                r: "Dieser Ort ist verflucht. Du verlässt das Gebäude und holst dir echten Kaffee. Der Frieden kostet dich 3,50 Euro, ist es aber wert." 
            }
        ]
    },
    {
        id: "cof_newbie_1",
        title: "Der Neue",
        text: "Ein junger Typ im Anzug steht verloren vor der Maschine. 'Äh, hallo? Ich bin neu im Controlling. Braucht man hier eine Karte oder ist das kostenlos? Und wo ist die Soja-Milch?'",
        opts: [
            { 
                t: "Nett sein & erklären", 
                next: "path_newbie_friend", 
                m: 15, f: -5, a: 0, c: -5, 
                r: "Er ist dankbar. 'Cool, danke! Ich heiße Torben. Endlich mal ein nettes Gesicht hier.' Er folgt dir unauffällig zu deinem Platz." 
            },
            { 
                t: "Anlügen: 'Das kostet 5€ pro Tasse, zahlbar bei mir.'", 
                next: "path_newbie_scam", 
                m: 10, f: 10, a: -10, c: 10, 
                r: "Er wirkt beeindruckt von der Professionalität. 'Oh, Service am Platz? Stark.' Er drückt dir einen 5er in die Hand. 'Quittung später, okay?'" 
            },
            { 
                t: "Starren und knurren",
                m: 5, f: 0, a: 5, c: 0, 
                r: "Er wird bleich, weicht zurück und stolpert fast über den Mülleimer. 'Schon gut! Ich... ich trinke Wasser!' Er rennt weg." 
            }
        ]
    },
    {
        id: "cof_newbie_2a",
        title: "Best Friends Forever",
        reqStory: "path_newbie_friend",
        text: "Torben steht plötzlich neben deinem Schreibtisch. Er hält zwei vegane Smoothies. 'Hey Buddy! Danke nochmal für vorhin. Ich dachte, wir machen zusammen Mittag? Ich wollte mit dir über Synergien zwischen IT und Controlling brainstormen!'",
        opts: [
            { 
                t: "Ablehnen: 'Ich esse im Serverraum.'", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Torben nickt eifrig. 'Cool! Secret Base! Ich komme mit!' Du musst dich auf der Toilette einschließen, um ihn loszuwerden." 
            },
            { 
                t: "Ausnutzen: 'Nur wenn du meine Spesen genehmigst.'", 
                m: 10, f: 5, a: -5, c: -10, 
                r: "Er zwinkert. 'Für meinen Mentor? Alles! Ich buche das als 'Team-Building'.' Er redet 60 Minuten ohne Punkt und Komma, aber dein Budget ist sicher." 
            },
            { 
                t: "Ihn zu Chantal schicken", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "'Chantal im Marketing sucht noch Freunde.' Torbens Augen leuchten. Er zieht ab. Jetzt hast du Ruhe, aber Chantal wird Rache schwören." 
            }
        ]
    },
    {
        id: "cof_newbie_2b",
        title: "Die Quittung",
        reqStory: "path_newbie_scam",
        text: "Torben fängt dich im Flur ab. Er wedelt mit einem Formular. 'Du, wegen der 5 Euro für den Kaffee-Service... ich brauche eine Kostenstelle für die Buchhaltung. Läuft das über 'IT-Infrastruktur' oder 'Externe Dienstleistung'?'",
        opts: [
            { 
                t: "Lügen: 'Das ist eine Schwarzgeld-Kasse für Notfälle.'", 
                m: 5, f: 5, a: 0, c: 20, 
                r: "Torben flüstert: 'Verstehe. Black Ops. Cool.' Er zerreißt das Formular. 'Mein Mund ist versiegelt.' Er hält dich jetzt für einen Geheimagenten." 
            },
            { 
                t: "Geld zurückgeben: 'War nur ein Witz.'", 
                m: 2, f: 0, a: 5, c: -5, 
                r: "Er starrt dich verständnislos an. 'Ein Witz? Aber... ich habe das schon im SAP vorerfasst.' Er ist völlig verwirrt und geht, um eine Stornobuchung zu machen." 
            },
            { 
                t: "Wegrennen", 
                m: 5, f: -5, a: -10, c: 10, 
                r: "Du rufst 'Server-Alarm!' und sprintest weg. Torben ruft hinterher: 'Ich buche es auf Sonstiges!'" 
            }
        ]
    },
    {
        id: "cof_worker_1",
        title: "Der Handwerker",
        text: "Ein externer Techniker repariert gerade den Wasserspender. Sein Werkzeugkasten steht offen da. Ein Hammer blitzt dich an.",
        opts: [
            { 
                t: "Hammer klauen", 
                loot: "hammer", 
                next: "path_worker_steal", 
                m: 5, f: 5, a: 0, c: 5, 
                r: "Zack, eingesteckt. Ein Hammer ist das ultimative Debugging-Tool für Drucker. Der Techniker dreht sich gerade wieder um." 
            },
            { 
                t: "Smalltalk halten", 
                next: "path_worker_talk", 
                m: 15, f: 5, a: -5, c: 0, 
                r: "Ihr redet über schlechte Bezahlung und dumme Kunden. 'Die da oben haben ja keine Ahnung', sagt er und nickt dir zu. Solidarität unter Arbeitern." 
            }
        ]
    },
    {
        id: "cof_worker_2a",
        title: "Vermisstenanzeige",
        reqStory: "path_worker_steal",
        text: "Der Wasserspender-Handwerker kratzt sich am Kopf und wühlt in seiner Kiste. 'Sagen Sie mal... haben Sie meinen 500g Schlosserhammer gesehen? Der lag doch eben noch hier? Ohne den krieg ich die Verkleidung nicht wieder drauf.'",
        opts: [
            { 
                t: "Unschuldig pfeifen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "'Nö. Vielleicht hat ihn die Putzkolonne?' Der Handwerker flucht und geht zum Wagen, Ersatz holen. Du hast den Hammer, aber ein (sehr kleines) schlechtes Gewissen." 
            },
            { 
                t: "Zurückgeben: 'War nur ausgeliehen'", 
                rem: "hammer",
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du gibst ihn zurück. 'Wollte nur... die Balance prüfen.' Er reißt ihn dir aus der Hand. 'Finger weg, IT-Fuzzi.' Chance vertan." 
            },
            { 
                t: "Kevin beschuldigen", 
                m: 5, f: 5, a: -5, c: -5, 
                r: "'Der Azubi mit der Kappe war da...' Der Handwerker nickt wissend. 'Die Jugend von heute. Die klauen alles.' Er schreibt 'Diebstahl durch Azubi' auf den Rapportzettel. Perfektes Verbrechen." 
            }
        ]
    },
    {
        id: "cof_worker_2b",
        title: "Material-Überschuss",
        reqStory: "path_worker_talk",
        text: "Der Wasserspender-Techniker wischt sich die Hände ab. 'Endlich mal normale Leute hier. Sagen Sie mal, ich hab hier noch Reste, die ich nicht mehr buchen kann. Brauchen Sie was für die Werkstatt? Die Firma zahlt's ja.'",
        opts: [
            { 
                t: "Kabelbinder nehmen", 
                loot: "zip_ties", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Hier, nimm die ganze Packung.' Kabelbinder sind die Währung der IT. Ein guter Tausch. (Inventar +1)" 
            },
            { 
                t: "Panzertape nehmen", 
                loot: "tape", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Das gute Gaffa. Klebt alles, auch Münder.' Er lacht dreckig. Du hast jetzt Profi-Tape. (Inventar +1)" 
            },
            { 
                t: "Dankend ablehnen", 
                m: 2, f: 0, a: 0, c: 5, 
                r: "'Ich bin versorgt.' Er zuckt mit den Schultern und wirft den Kram in seinen Koffer. 'Mehr für mich.' Du bleibst ehrlich, aber leer." 
            }
        ]
    },
    {
        id: "cof_revolte_1",
        title: "Die Kaffeemaschinen-Revolte",
        text: "Die neue 'Smart-Barista 3000' mit KI-Chip blinkt böse. Auf dem Display steht: 'FEED ME'. Sie weigert sich strikt, die billigen Discounter-Bohnen zu mahlen und zeigt: 'ERROR: TASTE NOT FOUND'. Der Aufstand der Maschinen beginnt im Pausenraum.",
        opts: [
            { 
                t: "Perkussive Wartung mit dem Hammer",
                req: "hammer", 
                next: "path_revolte_hammer", 
                m: 10, f: 0, a: -20, c: 20, 
                r: "BAM! Du schlägst gezielt auf das Gehäuse ein. Das Display hat jetzt einen Riss, aber aus purer Angst spuckt die Maschine sofort schwarzen Kaffee aus. Gewalt ist manchmal doch eine Lösung." 
            },
            { 
                t: "Nachgeben & teure Bio-Bohnen kaufen", 
                next: "path_revolte_buy", 
                m: 20, f: -5, a: 10, c: -5, 
                r: "Du rennst zum Hipster-Röster nebenan und investierst 15€ aus eigener Tasche. Der Kaffee schmeckt nach Einhorn-Tränen und Liebe, aber du bist für den Rest des Monats pleite." 
            },
            { 
                t: "Der Klassiker: Stecker raus, Stecker rein", 
                next: "path_revolte_reboot", 
                m: 5, f: 5, a: 5, c: 0, 
                r: "Die Maschine fährt runter... bootet neu... und zeigt sofort wieder 'FEED ME'. Dazu ertönt ein hämisches 8-Bit-Lachen aus dem Lautsprecher. Sie ist klüger als du." 
            }
        ]
    },
    {
        id: "cof_revolte_2a",
        title: "Maschinen-Liebe",
        reqStory: "path_revolte_hammer",
        text: "Du gehst später an der Maschine vorbei. Sie surrt leise, als sie dich sieht. Auf dem Display erscheint ein Pixel-Herz und der Text: 'MEISTER ERKANNT'. Im Ausgabefach liegt ein einzelner, perfekt verpackter Keks, den sie wohl für dich aufbewahrt hat.",
        opts: [
            { 
                t: "Den Keks triumphierend essen", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Der Keks schmeckt nach Unterwerfung und Schokolade. Die Kollegen starren neidisch, weil sie nur Fehlercodes bekommen. Du hast das Biest gezähmt." 
            },
            { 
                t: "Die Maschine streicheln", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du tätschelst das verbeulte Gehäuse. 'Braves Mädchen.' Sie schnurrt (oder es ist der Lüfter, der schleift). Eine wunderbare, dysfunktionale Freundschaft." 
            }
        ]
    },
    {
        id: "cof_revolte_2b",
        title: "Kaffee-Adel",
        reqStory: "path_revolte_buy",
        text: "Seit deiner Bohnen-Spende wirst du behandelt wie ein König. Eine Delegation Kollegen fängt dich ab: 'Das war der beste Stoff seit Jahren! Wir haben gesammelt, damit du Nachschub holst.' Sie halten dir einen Hut voller Kleingeld hin.",
        opts: [
            { 
                t: "Trinkgeld für dich behalten", 
                m: 10, f: 0, a: -5, c: 0, 
                r: "Du nimmst das Geld als 'Bearbeitungsgebühr'. Du bist jetzt der offizielle Dealer für Koffein. Dein Ansehen (und Kontostand) steigt." 
            },
            { 
                t: "Den Ruhm genießen", 
                m: 5, f: 10, a: -10, c: -5, 
                r: "Du lehnst dich zurück. 'Nur das Beste für mein Team.' Selbst der Chef nickt dir im Vorbeigehen zu. Dein Radar sinkt ins Bodenlose." 
            }
        ]
    },
    {
        id: "cof_revolte_2c",
        title: "Root-Zugriff",
        reqStory: "path_revolte_reboot",
        text: "Seit dem harten Neustart verhält sich die Maschine anders. Wenn du 'Espresso' drückst, landest du plötzlich in einem versteckten Admin-Menü. 'DEBUG MODE ACTIVE'. Die Physik des Kaffees liegt in deiner Hand.",
        opts: [
            { 
                t: "Alles auf 'Maximum' stellen", 
                m: 10, f: 5, a: -20, c: 0, 
                r: "Du stellst Stärke auf 110% und Temperatur auf 'Kernschmelze'. Was da rauskommt, ist flüssiges Dynamit. Du bist hellwach und glücklich." 
            },
            { 
                t: "Den 'Lachen'-Sound deaktivieren", 
                m: 5, f: 0, a: -10, c: 0, 
                r: "Endlich Ruhe. Du programmierst die Maschine so um, dass sie stattdessen jedes Mal 'Hallo Chef' sagt, wenn du kommst. Ein kleines, feines Ego-Upgrade." 
            }
        ]
    },
    {
        id: "cof_meeting_1",
        title: "Das Marketing-Meeting",
        text: "Chantal und ihre Crew blockieren die Küche. Sie brainstormen über 'Feel-Good-Management'. Es gibt Smoothies. Du brauchst aber Koffein.",
        opts: [
            { 
                t: "Dazwischen drängeln", 
                next: "path_meeting_push", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "Du hast Chantal den Smoothie umgestoßen. 'Hoppla'. Du hast Kaffee, aber Feinde. Eine grüne Pfütze breitet sich aus." 
            },
            { 
                t: "Mitmachen", 
                next: "path_meeting_join", 
                m: 45, f: 20, a: 10, c: -5, 
                r: "Du musstest 45 Minuten über deine Gefühle reden. Du hast jetzt einen grünen Smoothie und Aggressionen." 
            },
            { 
                t: "Warten und böse gucken", 
                next: "path_meeting_wait", 
                m: 15, f: 5, a: 5, c: 0, 
                r: "Sie ignorieren dich komplett. Irgendwann gehen sie. Dein Kaffee schmeckt bitter, aber du hast deinen Willen bekommen." 
            }
        ]
    },
    {
        id: "cof_meeting_2a",
        title: "Die Rechnung",
        reqStory: "path_meeting_push",
        text: "Ein pinker Umschlag liegt auf deinem Tisch. Betreff: 'Schadensersatz Sneaker & Seelischer Schmerz'. Chantal fordert 50€ für die Reinigung ihrer Schuhe, die du 'neulich' mit Smoothie ruiniert hast.",
        opts: [
            { 
                t: "Zahlen (Friedensangebot)", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du legst 50€ in den Umschlag. Es tut weh, aber der Krieg ist (vielleicht) vorbei. Dein Portemonnaie weint." 
            },
            { 
                t: "Umschlag schreddern", 
                m: 2, f: 0, a: -5, c: 10, 
                r: "Der Schredder frisst das pinke Papier. Chantal wird dich hassen, aber beweisen kann sie nichts. Eskalation akzeptiert." 
            },
            { 
                t: "Gegenrechnung stellen: 'Arbeitszeit'", 
                m: 10, f: 5, a: -10, c: 5, 
                r: "Du stellst ihr 150€ für 'IT-Support und psychologische Betreuung' in Rechnung. Patt-Situation. Chantal grüßt dich ab jetzt nicht mehr." 
            }
        ]
    },
    {
        id: "cof_meeting_2b",
        title: "Der 'Breath-Ambassador'",
        reqStory: "path_meeting_join",
        text: "Da du beim Smoothie-Meeting so 'tolle Energie' gezeigt hast, wurdest du ungefragt zum 'Atem-Botschafter' der IT ernannt. Ein Paket mit Räucherstäbchen liegt auf deinem Platz mit der Notiz: 'Verteile Liebe im Serverraum!'",
        opts: [
            { 
                t: "Die Rolle annehmen", 
                m: 10, f: 20, a: -10, c: -5, 
                r: "Du zündest ein Stäbchen an. Ab jetzt machst du offiziell 2 Stunden am Tag 'Atmosphären-Pflege'. Der Chef denkt, das sei eine Brandschutz-Übung." 
            },
            { 
                t: "Paket an Kevin weitergeben", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "'Hier Kevin, für deine Ausbildung.' Kevin freut sich. Er räuchert jetzt das Lager aus. Du bist fein raus." 
            },
            { 
                t: "Alles in den Müll werfen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Weg damit. Du willst Admin sein, kein Guru. Chantal fragt später enttäuscht nach deiner Aura." 
            }
        ]
    },
    {
        id: "cof_meeting_2c",
        title: "Das Negativ-Beispiel",
        reqStory: "path_meeting_wait",
        text: "Du läufst am Meetingraum vorbei. Chantal hält eine Präsentation über 'Toxische Vibes'. Auf der Leinwand ist ein (heimlich aufgenommenes) Foto von DIR, wie du böse auf die Kaffeemaschine starrst. Untertitel: 'Der Energie-Vampir'.",
        opts: [
            { 
                t: "Reinplatzen: 'Das ist Rufmord!'", 
                m: 5, f: 0, a: 20, c: 10, 
                r: "Du machst eine Szene. Das bestätigt leider genau ihre These. 'Seht ihr? Aggression!', ruft Chantal. Du hast verloren." 
            },
            { 
                t: "Foto machen & als Profilbild nutzen", 
                m: 5, f: 10, a: -10, c: 5, 
                r: "Du nimmst die Rolle an. Dein neues Teams-Profilbild ist der 'Energie-Vampir'. Die Kollegen finden es lustig. Chantal ist verwirrt." 
            },
            { 
                t: "Sicherung rausdrehen", 
                m: 10, f: -5, a: -5, c: 0, 
                r: "Zack. Beamer aus. Präsentation beendet. Du gehst pfeifend weiter. Niemand kann beweisen, dass du es warst." 
            }
        ]
    },
    {
        id: "cof_milk_1",
        title: "High Noon in der Küche",
        text: "Kollege Bernd (der Typ, der Fisch in der Mikrowelle warm macht) greift nach der allerletzten Packung H-Milch. Deine Hand landet im selben Moment darauf. Eure Blicke treffen sich. Die Luft knistert. Im Hintergrund spielt leise Western-Musik.",
        opts: [
            { 
                t: "Ein Duell fordern: Schere-Stein-Papier", 
                next: "path_milk_duel", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Stein schlägt Schere. Ein sauberer Sieg! Du nimmst die Trophäe an dich. Bernd zieht geschlagen ab und murmelt etwas von 'Best of Three', aber du hast die Milch schon offen." 
            },
            { 
                t: "Großzügig sein & den Vortritt lassen", 
                next: "path_milk_yield", 
                m: 0, f: 0, a: 10, c: -5, 
                r: "Du lässt los. Karma-Punkte! Aber dann der Schock: Bernd schüttet den gesamten Liter in seinen Früchtetee. Alles. Bis zum letzten Tropfen. Was für ein Monster." 
            },
            { 
                t: "Taktik 'Verbrannte Erde': Packung zerdrücken", 
                next: "path_milk_destroy", 
                m: 2, f: 0, a: -10, c: 10, 
                r: "Du drückst zu. Fest. PLATSCH! Der Karton platzt und ein weißer Tsunami ergießt sich über den Küchenboden. Du schreist: 'WENN ICH SIE NICHT KRIEGE, KRIEGT SIE KEINER!'" 
            }
        ]
    },
    {
        id: "cof_milk_2a",
        title: "Die Revanche",
        reqStory: "path_milk_duel",
        text: "Bernd fängt dich am Kopierer ab. Er wirkt unruhig und hält eine Münze in der Hand. 'Das mit der Milch war Glück, Müller. Ich fordere Genugtuung. Kopf oder Zahl um den letzten Keks im Meetingraum?'",
        opts: [
            { 
                t: "Ablehnen: 'Glück gehört zum Können'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du lässt ihn stehen. Bernd murmelt etwas von 'Angsthase', aber du weißt: Man soll aufhören, wenn man gewinnt." 
            },
            { 
                t: "Annehmen (Zocken)", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Die Münze fliegt. Du gewinnst wieder. Bernd bricht fast zusammen. Du bist jetzt offiziell der Glückspilz der Abteilung." 
            }
        ]
    },
    {
        id: "cof_milk_2b",
        title: "Calcium-Mangel",
        reqStory: "path_milk_yield",
        text: "Du triffst Bernd wieder. Er sieht extrem zufrieden aus und klopft sich auf den Bauch. 'Danke nochmal für die Milch. Mein Tee war heute besonders cremig. Man muss sich auch mal was gönnen, nicht wahr?'",
        opts: [
            { 
                t: "Sarkasmus: 'Pass auf deine Arterien auf'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Bernd lacht nur. 'Ich habe Knochen aus Stahl!' Deine Großzügigkeit wird hier eindeutig als Schwäche ausgelegt." 
            },
            { 
                t: "Lügen: 'Die war eigentlich abgelaufen'", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Bernds Gesichtsfarbe wechselt zu Grün. 'Was? Warum sagst du das erst jetzt?!' Er rennt Richtung Toilette. Rache ist ein Gericht, das man kalt serviert." 
            }
        ]
    },
    {
        id: "cof_milk_2c",
        title: "Das Embargo",
        reqStory: "path_milk_destroy",
        text: "An der Küchentür hängt ein neues Schild (laminiert!): 'Wegen mutwilliger Zerstörung von Molkerei-Produkten ist der Kühlschrank ab sofort videoüberwacht. Gez. Facility Management.' Alle Kollegen müssen jetzt ihre Milch beim Empfang anmelden.",
        opts: [
            { 
                t: "Stolz nicken", 
                m: 5, f: 0, a: -10, c: 10, 
                r: "Du hast ein Zeichen gesetzt. Es ist zwar unpraktisch für alle, aber niemand wird mehr wagen, dir die Milch wegzunehmen. Respekt durch Angst." 
            },
            { 
                t: "Unschuldig tun: 'Wer macht denn sowas?'", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Die Kollegen tuscheln. 'Bestimmt der Kevin.' Du nickst eifrig. Sündenböcke sind wichtig für das Betriebsklima." 
            }
        ]
    },
{
        id: "cof_juergen_1",
        title: "Die Labertasche",
        text: "Jürgen aus dem Vertrieb blockiert die Kaffeemaschine. Er grinst dich breit an: 'Na, Kollege? Auch mal Pause? Du, ich MUSS dir unbedingt von meinem neuen Mähroboter erzählen. Der hat jetzt GPS-gestützten Kantenmodus!'",
        opts: [
            { 
                t: "Noise-Cancelling-Kopfhörer aufsetzen", 
                req: "headphones", 
                next: "path_juergen_nc",
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du setzt die Dinger auf, nickst freundlich und startest norwegischen Black Metal. Jürgen bewegt nur noch stumm den Mund. Himmlische Ruhe." 
            },
            { 
                t: "Höflich zuhören & innerlich sterben", 
                next: "path_juergen_listen",
                m: 20, f: 10, a: 15, c: 0, 
                r: "20 Minuten später kennst du den Unterschied zwischen Mulch-Keil und Seitenauswurf. Ein Teil deiner Seele hat den Körper verlassen. Jürgen droht: 'Morgen erzähl ich dir von meiner Wärmepumpe!'" 
            },
            { 
                t: "Schreien: 'OH GOTT, DER SERVER!' & rennen", 
                next: "path_juergen_run",
                m: 0, f: 0, a: 5, c: 0, 
                r: "Du täuschst einen fatalen Systemabsturz vor und sprintest aus der Küche. Du hast zwar keinen Kaffee, aber du bist Jürgens Monolog entkommen. Freiheit schmeckt auch gut." 
            }
        ]
    },
    {
        id: "cof_juergen_2a",
        title: "Stummes Gespräch",
        reqStory: "path_juergen_nc",
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
        id: "cof_juergen_2b",
        title: "Jahresarbeitszahl",
        reqStory: "path_juergen_listen",
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
        id: "cof_juergen_2c",
        title: "Kaffee-Service",
        reqStory: "path_juergen_run",
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
        id: "cof_loot_1",
        title: "Reparatur-Set",
        text: "Der Hausmeister hat Material liegen lassen. Es ist unbeaufsichtigt. Ein seltener Anblick in diesem Büro.",
        opts: [
            { 
                t: "Panzertape nehmen", 
                loot: "tape", 
                next: "path_loot_tape", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Eine fast volle Rolle Gaffa. Kann man immer brauchen. Du lässt sie schnell verschwinden. (Inventar +1)" 
            },
            { 
                t: "Kabelbinder nehmen", 
                loot: "zip_ties", 
                next: "path_loot_zip", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Ein Bündel Kabelbinder. Praktisch. Die schwarze Sorte, UV-beständig. Ein guter Fang. (Inventar +1)" 
            }
        ]
    },
    {
        id: "cof_loot_2a",
        title: "Die Suche nach dem Gold",
        reqStory: "path_loot_tape",
        text: "Egon kommt fluchend in die Küche. 'Hömma! Hast du mein Gaffa gesehen? Der Mülleimerdeckel ist abgerissen und ich muss das tapen! Das war die gute Rolle!'",
        opts: [
            { 
                t: "Lügen: 'Nö, keine Ahnung.'", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Egon tritt gegen den Mülleimer. 'Verdammte Diebe hier! Alles muss man anketten!' Er zieht wütend ab. Du hast das Tape, aber Egon ist sauer." 
            },
            { 
                t: "Zurückgeben: 'Lag am Boden.'", 
                rem: "tape",
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du ziehst die Rolle aus der Tasche. 'Wollte sie nur... aufheben.' Egon reißt sie dir aus der Hand. 'Ja ja. Finger weg.' (Item entfernt)" 
            },
            { 
                t: "Tipp geben: 'Nimm Kaugummi.'", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "Egon starrt dich an. 'Kaugummi? Bin ich MacGyver?' Er schüttelt den Kopf über die 'Büro-Hengste' und geht." 
            }
        ]
    },
    {
        id: "cof_loot_2b",
        title: "Haltlos",
        reqStory: "path_loot_zip",
        text: "Der Spülmaschinenschlauch hat sich gelöst. Egon kniet davor. 'Mir fehlen meine Kabelbinder! Ich hatte doch ein ganzes Bündel! Jetzt muss ich das festhalten, bis der Kleber trocknet (30 Minuten).'",
        opts: [
            { 
                t: "Mitleid heucheln & gehen", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "'Viel Erfolg, Egon!' Du lässt ihn leiden. Du brauchst die Binder dringender für dein Kabelmanagement am Platz." 
            },
            { 
                t: "Binder spenden", 
                rem: "zip_ties", 
                m: 10, f: -5, a: -10, c: 0, 
                r: "Du gibst ihm die Binder zurück. 'Oh, danke Jung! Du rettest meinen Rücken.' Egon schuldet dir was. (Item entfernt)" 
            },
            { 
                t: "Sarkasmus: 'Hast du kein Tape?'", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "'Tape hält da nicht bei der Hitze, du Experte!' Er ist genervt. Du hast deinen Spaß und deine Kabelbinder." 
            }
        ]
    },
    {
        id: "cof_table_1",
        title: "Wackelnder Tisch",
        text: "Der Stehtisch in der Küche wackelt extrem. Der Kaffee schwappt fast über. Es ist dieser eine Millimeter, der dich in den Wahnsinn treibt.",
        opts: [
            { 
                t: "Schrauben festziehen (Brachial)", 
                req: "screw", 
                next: "path_table_screw", 
                m: 10, f: -5, a: -5, c: 0, 
                r: "Du drehst die Schrauben so fest in den Boden, dass das Metall knirscht. Der Tisch bewegt sich keinen Mikrometer mehr. Er ist jetzt eins mit dem Fundament." 
            },
            { 
                t: "Bierdeckel drunter", 
                next: "path_table_coaster", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Der Klassiker. Ein alter Bierdeckel ('Gasthof zur Post') unter das Bein geklemmt. Ruhe ist." 
            },
            { 
                t: "Tischbein abtreten", 
                req: "hammer", 
                next: "path_table_kick", 
                m: 5, f: 0, a: -20, c: 20, 
                r: "Du holst mit dem Hammer aus. KRACH! Das Bein knickt weg, der Tisch stürzt ein. 'So. Jetzt wackelt nix mehr', sagst du zufrieden." 
            }
        ]
    },
    {
        id: "cof_table_2a",
        title: "Für die Ewigkeit",
        reqStory: "path_table_screw",
        text: "Der Hausmeister steht rot anlaufend und schwitzend am Tisch. Er zerrt mit beiden Händen daran. 'Wer hat das Ding festgeschweißt?! Ich muss hier wischen! Das bewegt sich keinen Millimeter!'",
        opts: [
            { 
                t: "Stolz: 'Das war Qualitätsarbeit'", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "Egon starrt dich an. 'Du hast durch den Estrich in die Fußbodenheizung gebohrt!' Ups. Aber hey, der Tisch steht stabil." 
            },
            { 
                t: "Die Flucht ergreifen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du pfeifst unschuldig und gehst. Hinter dir hörst du, wie Egon eine Brechstange ansetzt. Der Tisch gewinnt." 
            }
        ]
    },
    {
        id: "cof_table_2b",
        title: "Low-Rider",
        reqStory: "path_table_coaster",
        text: "Der Bierdeckel ist weg. Dafür ist der Tisch jetzt nur noch 60cm hoch. Kevin steht stolz daneben, eine Säge in der Hand. 'Der Deckel hat genervt. Hab einfach die anderen drei Beine abgesägt. Jetzt wackelt nix mehr!'",
        opts: [
            { 
                t: "Ihn loben: 'Genial!'", 
                m: 5, f: 10, a: -10, c: -5, 
                r: "Kevin strahlt. Ihr trinkt jetzt Kaffee im Hocken. Es sieht aus wie im Kindergarten, ist aber ergonomisch mal was anderes." 
            },
            { 
                t: "Ihn fragen: 'Und wenn er wieder wackelt?'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Kevin überlegt kurz. 'Dann säge ich weiter.' Du realisierst: In einer Woche essen wir vom Boden." 
            }
        ]
    },
    {
        id: "cof_table_2c",
        title: "Das Mahnmal",
        reqStory: "path_table_kick",
        text: "Der zerstörte Tisch liegt immer noch da. Aber jetzt ist rotes Absperrband drumherum. Ein Schild von Chantal steht davor: 'DECONSTRUCTED WORKSPACE – Eine Installation über den Zusammenbruch der Leistungsgesellschaft.'",
        opts: [
            { 
                t: "Als Künstler ausgeben", 
                m: 10, f: 20, a: -10, c: 10, 
                r: "Du stellst dich daneben und nickst tiefsinnig. 'Ja, der Hammer symbolisierte den digitalen Wandel.' Chantal macht Fotos für LinkedIn. Du bist jetzt ein Visionär." 
            },
            { 
                t: "Dagegen treten (Performance)", 
                m: 5, f: -5, a: -10, c: 20, 
                r: "Du trittst gegen den Schrotthaufen. Es scheppert. Die Umstehenden applaudieren. 'So mutig! So radikal!' Die Welt ist verrückt." 
            }
        ]
    },
    {
        id: "cof_sticky_1",
        title: "Die verklebte Taste",
        text: "Katastrophe! Die überlebenswichtige 'Doppelter Espresso'-Taste klebt fest. Ein brauner, sirupartiger Rand verrät: Jemand hat hier Süßkram verschüttet. Der Knopf rührt sich keinen Millimeter.",
        opts: [
            { 
                t: "Chirurgischer Eingriff mit dem Schraubendreher", 
                req: "screw", 
                next: "path_sticky_fixed",
                m: 5, f: 0, a: -5, c: 0, 
                r: "Mit der Präzision eines Uhrmachers hebelst du die Taste raus, kratzt den 'Zucker-Beton' weg und setzt sie wieder ein. *Klick*. Ein wunderschönes Geräusch." 
            },
            { 
                t: "Frust-Lösung: Einfach draufhauen", 
                next: "path_sticky_broken",
                m: 2, f: 0, a: 5, c: 5, 
                r: "BAM! KNACK! Die Taste bricht ab und fliegt in hohem Bogen unter den Kühlschrank. Ups. Jetzt gibt es nur noch die Wahl zwischen 'Heißes Wasser' und 'Systemfehler'." 
            },
            { 
                t: "Aufgeben & Tee trinken", 
                next: "path_sticky_tea",
                m: 0, f: -5, a: 0, c: 0, 
                r: "Du resignierst und nimmst einen Beutel Pfefferminztee. Er schmeckt nach Niederlage und Zahnpasta." 
            }
        ]
    },
    {
        id: "cof_sticky_2a",
        title: "Der Wartungs-Stau",
        reqStory: "path_sticky_fixed",
        text: "Da du als Einziger die Maschine repariert hast, giltst du jetzt als 'Kaffee-Beauftragter'. Eine Schlange von Kollegen steht vor deinem Büro. 'Kannst du mal gucken? Die Milch schäumt nicht rechtsdrehend!'",
        opts: [
            { 
                t: "Schild aufstellen: 'IT, nicht Café!'", 
                m: 5, f: 0, a: 10, c: 5, 
                r: "Du schickst alle weg. Sie murren, aber du hast deine Ruhe. Kompetenz ist manchmal ein Fluch." 
            },
            { 
                t: "Service gegen Gebühr anbieten", 
                m: 10, f: 10, a: -10, c: 0, 
                r: "Du verlangst Schokolade für jede Reparatur. Dein Schreibtisch ist jetzt ein Süßwarenladen. Man muss Prioritäten setzen." 
            }
        ]
    },
    {
        id: "cof_sticky_2b",
        title: "Die Sabotage-Ermittlung",
        reqStory: "path_sticky_broken",
        text: "Ein Aushang hängt an der Maschine: 'Wegen Vandalismus (abgebrochene Taste) gibt es nur noch Filterkaffee aus der Kanne.' Die Stimmung im Büro ist aggressiv. Alle suchen den Täter.",
        opts: [
            { 
                t: "Laut mitschimpfen: 'Unfassbar!'", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du mischt dich unter das Volk und wetterst gegen 'diese Chaoten'. Niemand verdächtigt dich. Die Tarnung ist perfekt." 
            },
            { 
                t: "Kevin beschuldigen", 
                m: 5, f: 0, a: -5, c: -5, 
                r: "Es ist immer Kevin. Er muss jetzt den Filterkaffee kochen. Dein Gewissen zwickt kurz, aber der Espresso war das Opfer wert." 
            }
        ]
    },
    {
        id: "cof_sticky_2c",
        title: "Der Teetrinker",
        reqStory: "path_sticky_tea",
        text: "Du wirst mit deiner Teetasse gesehen. Das Gerücht verbreitet sich: 'Müller trinkt keinen Kaffee mehr. Ist er krank? Burnout? Oder schwanger?' Die Kollegen behandeln dich plötzlich vorsichtig.",
        opts: [
            { 
                t: "Das Gerücht nutzen (Mitleid)", 
                m: 10, f: 10, a: -10, c: 0, 
                r: "Du hustest leise und schaust leidend. Gabi bringt dir Kekse. 'Für die Nerven.' Es lebt sich gut als angeblicher Invalide." 
            },
            { 
                t: "Aufklären: 'Taste war nur kaputt'", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "'Achso.' Der Zauber ist vorbei. Gabi nimmt die Kekse wieder mit. Die Realität ist hart." 
            }
        ]
    },
    {
        id: "cof_hack_1",
        title: "Der Service-Port",
        text: "Du entdeckst an der Rückseite der Kaffeemaschine einen USB-Wartungsport. Das Display zeigt 'INSERT SERVICE KEY'. Es ist verlockend. Sehr verlockend.",
        opts: [
            { 
                t: "USB-Stick benutzen (Script laden)", 
                req: "usb_stick", 
                next: "path_hack_root", 
                m: 5, f: 10, a: -10, c: 0, 
                r: "HACK SUCCESS! Du hast den 'Developer Mode' aktiviert. Der Kaffee läuft jetzt doppelt so schnell und ist kostenlos. Du fühlst dich wie Neo in der Matrix." 
            },
            { 
                t: "Wild Knöpfe drücken (Konami-Code?)", 
                next: "path_hack_glitch", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "Oben, Oben, Unten, Unten, Links, Rechts... Das Display flackert wild. Es piept dreimal laut. Du hoffst, dass das ein 'Cheat Code' war und keine Selbstzerstörung." 
            }
        ]
    },
    {
        id: "cof_hack_2a",
        title: "God Mode",
        reqStory: "path_hack_root",
        text: "Seit deinem Hack begrüßt dich die Maschine mit 'HELLO ADMIN' und spielt eine 8-Bit-Melodie. Der Chef steht daneben und starrt auf sein Display, das nur 'PLEASE INSERT COIN' anzeigt. Er schaut misstrauisch zu deinem randvollen Gratis-Becher.",
        opts: [
            { 
                t: "Angeben: 'Man muss die Maschine nur streicheln'", 
                m: 5, f: 5, a: -5, c: 10, 
                r: "Der Chef streichelt die Maschine. Nichts passiert. Er fühlt sich veräppelt. Du grinst in deinen Kaffee. Das war es wert." 
            },
            { 
                t: "Ablenken: 'Das ist ein Firmware-Bug!'", 
                m: 10, f: 0, a: 10, c: 0, 
                r: "'Wirklich? Kümmern Sie sich drum, Müller!' Er geht. Puh. Du behältst deine Privilegien, musst jetzt aber so tun, als würdest du arbeiten." 
            }
        ]
    },
    {
        id: "cof_hack_2b",
        title: "Die Sprachbarriere",
        reqStory: "path_hack_glitch",
        text: "Deine Tastenkombination hat offenbar die Spracheinstellungen verändert. Das Menü ist jetzt komplett auf Mandarin. Eine Schlange verzweifelter Kollegen steht davor. Kevin hat aus Versehen 'Heißes Wasser mit Zitrone' statt 'Kakao' gezogen.",
        opts: [
            { 
                t: "Google Translate App nutzen", 
                m: 5, f: 5, a: -10, c: -10, 
                r: "Du hältst dein Handy davor und rettest den Tag. Du bist der Held, obwohl du das Problem verursacht hast. Das ist wahres IT-Consulting." 
            },
            { 
                t: "Behaupten: 'Das ist ein Cyber-Angriff aus China!'", 
                m: 5, f: 0, a: 10, c: 15, 
                r: "Panik bricht aus. Der Chef will das Internetkabel ziehen. Du hast vielleicht etwas übertrieben, aber niemand verdächtigt dich." 
            }
        ]
    },
    {
        id: "cof_chewing_1",
        title: "Die akustische Folter",
        text: "Kollegin Sabine steht direkt neben dir. In der Hand: Ein knackiger, saftiger Granny Smith. Sie beißt hinein. *KNACK*. Dann kaut sie. Mit weit offenem Mund. *SCHMATZ... SCHMATZ... SCHLÜRF*. Es klingt, als würde jemand Gummistiefel in einen Eimer Mayonnaise tauchen.",
        opts: [
            { 
                t: "Sofort Noise-Cancelling aktivieren", 
                req: "headphones", 
                next: "path_chewing_nc", 
                m: 0, f: 5, a: -10, c: 0, 
                r: "Klick. Die Welt verstummt. Sabine bewegt den Kiefer wie ein Wiederkäuer und sagt offensichtlich etwas zu dir, aber du hörst nur noch sanftes Meeresrauschen. Du nickst einfach freundlich und lächelst." 
            },
            { 
                t: "Den Stressball fast zerquetschen", 
                req: "stressball", 
                next: "path_chewing_ball", 
                m: 10, f: 0, a: -5, c: 0, 
                r: "Du kanalisiert deinen gesamten Hass in den roten Schaumstoffball. Deine Knöchel treten weiß hervor. Der Ball wimmert leise unter dem Druck. Sabine kaut unbeeindruckt weiter." 
            },
            { 
                t: "Passiv-aggressiver Kommentar", 
                next: "path_chewing_rude",
                m: 5, f: 0, a: 10, c: 5, 
                r: "Du fragst laut: 'Sag mal, hast du ein Mikrofon verschluckt oder übst du für einen Horrorfilm?' Sabine erstarrt mit vollem Mund. Tödliches Schweigen. Die Stimmung ist im Keller." 
            }
        ]
    },
    {
        id: "cof_chewing_2a",
        title: "Das blinde Nicken",
        reqStory: "path_chewing_nc",
        text: "Später am Tag kommt Sabine freudestrahlend zu dir. 'Super, dass du das machst! Ich habe allen gesagt, dass du dich freiwillig gemeldet hast, den Kühlschrank abzutauen. Du hast ja vorhin in der Küche so nett genickt!'",
        opts: [
            { 
                t: "Das Missverständnis aufklären", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Sabine bricht in Tränen aus. 'Und ich dachte, du wärst hilfsbereit!' Jetzt bist du der Arsch der Abteilung, obwohl du nur Musik hören wolltest." 
            },
            { 
                t: "Zähneknirschend putzen", 
                m: 15, f: -5, a: 10, c: -10, 
                r: "Du taust das Eisfach ab. Es ist kalt, nass und eklig. Merke: Niemals nicken, wenn man nichts hört." 
            }
        ]
    },
    {
        id: "cof_chewing_2b",
        title: "Materialermüdung",
        reqStory: "path_chewing_ball",
        text: "Du findest rote Krümel in deiner Tasche. Dein Stressball hat den Kampf gegen Sabines Kaugeräusche nicht überlebt. Er ist geplatzt und hat seinen schaumstoffartigen Inhalt über deinem Laptop verteilt.",
        opts: [
            { 
                t: "Versuchen zu kleben", 
                req: "tape", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du wickelst Panzertape um den Rest. Er sieht jetzt aus wie eine rote Kartoffel, die einen Unfall hatte. Funktioniert kaum noch." 
            },
            { 
                t: "Trauerfeier abhalten (Wegwerfen)", 
                rem: "stressball",
                m: 0, f: 0, a: 5, c: 0, 
                r: "Du wirfst die Reste in den Müll. Er ist als Held gestorben. Ruhe in Frieden, kleiner Ball." 
            }
        ]
    },
    {
        id: "cof_chewing_2c",
        title: "Der Obst-Krieg",
        reqStory: "path_chewing_rude",
        text: "Sabine hat Rache geschworen. Seit deinem Kommentar isst sie demonstrativ nur noch weiche Sachen, wenn du da bist – starrt dich dabei aber böse an. Heute liegt eine Banane auf deiner Tastatur. Eine Drohung?",
        opts: [
            { 
                t: "Banane essen (Dominanz zeigen)", 
                m: 10, f: 5, a: -10, c: 0, 
                r: "Du schälst die Banane und isst sie, ohne den Augenkontakt zu brechen. Sabine ist verwirrt und zieht sich zurück. Sieg." 
            },
            { 
                t: "Angst bekommen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Wer weiß, wo diese Banane war? Du fasst sie nur mit einem Tuch an und entsorgst sie. Der psychologische Krieg hat begonnen." 
            }
        ]
    },
    {
        id: "cof_gossip_1",
        title: "Tratsch am Wasserspender",
        text: "Du hörst Frau Gräte flüstern: 'Der Chef war gestern im Seminar 'Positive Leadership'. Er flippt jetzt total aus, wenn jemand das Wort 'Problem' sagt. Er will nur noch 'Herausforderung' hören. Wer 'Problem' sagt, kriegt sofort die Kündigungsandrohung.'",
        opts: [
            { 
                t: "Ins Gespräch einsteigen", 
                next: "path_gossip_caught", 
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
        id: "cof_gossip_2a",
        title: "Das Mindset-Verhör",
        reqStory: "path_gossip_caught",
        text: "Der Chef zitiert dich in sein Büro. Er lächelt gequält. 'Müller, ich habe Sie vorhin in der Küche gehört. Ich möchte sichergehen, dass wir 'aligned' sind. Wie läuft das aktuelle Projekt? Gibt es... Schwierigkeiten?' Er wartet lauernd auf ein bestimmtes Wort.",
        opts: [
            { 
                t: "Ehrlich sein: 'Ja, wir haben ein riesiges Problem.'", 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Sein Lächeln gefriert. 'PROBLEM?! Wir haben keine Probleme! Wir haben nur Dornen im Auge des Erfolgs!' Er hält dir einen 20-minütigen Vortrag über Positivität. Du hast jetzt Kopfschmerzen." 
            },
            { 
                t: "Bullshit-Bingo: 'Nur spannende Herausforderungen!'", 
                m: 10, f: 5, a: -10, c: -10, 
                r: "Der Chef atmet erleichtert aus. 'Exzellent! Das ist der Spirit! Here, take a cookie.' Er wirft dir einen einzeln verpackten Keks zu. Du bist sicher." 
            },
            { 
                t: "Übertreiben: 'Es ist eine fantastische Growth-Opportunity!'", 
                m: 5, f: 10, a: -5, c: 0, 
                r: "Der Chef wirkt kurz verwirrt, nickt dann aber anerkennend. 'Wow. Das ist ja noch positiver als mein Coach. Weiter so!' Er macht sich eine Notiz: 'Müller = Visionär'." 
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
        id: "cof_premium_hack_1",
        title: "Der 'Gold' Modus",
        text: "Du stehst vor der Maschine. Dein Magen knurrt. Auf dem Display steht: 'PREMIUM RÖSTUNG - NUR FÜR VORSTAND (Karte erforderlich)'. Für das Fußvolk gibt es nur 'Wasser mit brauner Farbe' für 2,50€.",
        opts: [
            { 
                t: "2,50€ bezahlen (Kapitulation)", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du wirfst das Geld ein. Der Kaffee schmeckt nach verbrannten Reifen und Niederlage. Du fühlst dich ausgeraubt, aber wenigstens bist du wach." 
            },
            { 
                t: "Espresso + Sensor zuhalten",
                next: "path_premium_audit",
                m: 5, f: 10, a: -20, c: 0, 
                r: "Die Maschine piept leise. Das Display zeigt: 'WELCOME MASTER'. Goldene Flüssigkeit fließt in deine Tasse. Es ist der beste Kaffee deines Lebens. Gratis." 
            },
            { 
                t: "Mit Hammer 'bezahlen'", 
                req: "hammer", 
                next: "path_premium_broken",
                m: 5, f: 0, a: -10, c: 20, 
                r: "KLONG! Du schlägst gegen den Münzschlitz. Das Gehäuse verbeult, aber eine 50-Cent-Münze fällt raus. Kaffee gibt es keinen, aber du hast Gewinn gemacht." 
            },
            { 
                t: "Wild Tasten drücken", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "ERROR 404. Die Maschine sperrt sich für 5 Minuten. Du starrst auf den Ladebalken. Toll gemacht." 
            }
        ]
    },
    {
        id: "cof_premium_hack_2a",
        title: "Die Abrechnung",
        reqStory: "path_premium_audit",
        text: "Eine Rundmail vom Controlling: 'Achtung! Wir haben eine Differenz im Premium-Kaffee-Bestand. 1 Tasse fehlt. Der Verbrauch wird ab sofort mit den Sicherheitskameras abgeglichen.'",
        opts: [
            { 
                t: "Nervös schwitzen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du hoffst einfach, dass die Kameraauflösung zu schlecht war. Der Kaffee war es wert, aber du traust dich heute nicht mehr in die Küche." 
            },
            { 
                t: "Proaktiv lügen: 'Die Maschine hat geleckt!'", 
                m: 5, f: 5, a: 0, c: 10, 
                r: "Du antwortest 'Reply All'. 'Habe gesehen, wie Kaffeewasser ausgelaufen ist. Technik informieren!' Alle danken dir für deine Wachsamkeit. Genius." 
            }
        ]
    },
    {
        id: "cof_premium_hack_2b",
        title: "Vandalismus-Alarm",
        reqStory: "path_premium_broken",
        text: "Der Hausmeister steht vor der verbeulten Maschine. Er hält ein Phantombild hoch, das verdächtig nach dir aussieht (aber mit Schnurrbart). 'Wer auch immer das war... ich finde ihn. Niemand verbeult meine Lady.'",
        opts: [
            { 
                t: "Sich unauffällig verdrücken", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du gehst rückwärts aus dem Raum. Das mit den 50 Cent erzählst du lieber niemandem." 
            },
            { 
                t: "Die Schuld auf den Spediteur schieben", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "'Das war doch schon bei der Lieferung so, Egon!' Egon kratzt sich am Kopf. 'Stimmt... die Kartons sahen übel aus.' Du bist fein raus." 
            }
        ]
    },
    {
        id: "cof_iot_fail_1",
        title: "Das gefährliche IoT-Upgrade",
        text: "Du traust deinen Augen nicht: Jemand hat einen billigen 'Smart Plug' (Marke 'China-Export') zwischen Steckdose und Kaffeemaschine gebastelt. Das Gehäuse schmilzt bereits, es funkt blau und riecht beißend nach verbranntem Weichmacher. Brandgefahr Stufe Rot.",
        opts: [
            { 
                t: "Lebensgefahr: Sofort den Stecker ziehen", 
                next: "path_iot_sabotage", 
                m: 10, f: -5, a: 30, c: 30, 
                r: "ZACK! Funkenregen. Du hast das Gebäude gerettet. Da stürmt der Marketing-Chef mit knallrotem Kopf rein: 'MEIN PROTOTYP! Ich habe wochenlang an der Blockchain-basierten 'Coffee-Cloud' gearbeitet! Sie Maschinenstürmer!'" 
            },
            { 
                t: "Abwarten & Cola trinken", 
                next: "path_iot_fire", 
                m: 5, f: 10, a: -10, c: 0, 
                r: "Nicht deine Hardware, nicht dein Feuer. Du öffnest zischend eine Cola und schaust zu. POFF! Eine Stichflamme. Dann springt die Sprinkleranlage an und verwandelt den Flur in ein Feuchtbiotop." 
            }
        ]
    },
    {
        id: "cof_iot_fail_2a",
        title: "Der Crypto-Krieg",
        reqStory: "path_iot_sabotage",
        text: "Der Marketing-Chef hat eine offizielle Beschwerde eingereicht. Er fordert Schadensersatz für den 'entgangenen Gewinn' seines geplanten 'Coffee-Coin' ICOs, den du durch das Ziehen des Steckers verhindert hast.",
        opts: [
            { 
                t: "Ihm die VDE-Vorschrift vorlesen", 
                m: 5, f: -5, a: 10, c: 5, 
                r: "Du zitierst Paragrafen über Brandschutz. Er schläft nach 2 Minuten ein. Die Beschwerde wird fallengelassen wegen 'Langeweile'." 
            },
            { 
                t: "Gegenangriff: Egon informieren", 
                m: 10, f: -5, a: -10, c: 10, 
                r: "Du petzt beim Hausmeister. Egon stürmt mit dem Bolzenschneider ins Marketing-Büro. 'Keine Fremdgeräte!' Das Schreien hört man bis in den 3. Stock." 
            }
        ]
    },
    {
        id: "cof_iot_fail_2b",
        title: "Das Feuchtbiotop",
        reqStory: "path_iot_fire",
        text: "Die Feuerwehr ist weg, aber die Küche steht unter Wasser. Der Marketing-Chef steht heulend vor seinem verkohlten Smart-Plug. 'Warum hat niemand was gesagt?!'",
        opts: [
            { 
                t: "Schultern zucken: 'War im Meeting'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Die perfekte Ausrede. Niemand kann beweisen, dass du mit Cola daneben standst. Du bleibst trocken." 
            },
            { 
                t: "Spöttisch: 'Ist das diese Liquid-Cooling?'", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "Böser Witz. Aber er musste sein. Der Marketing-Chef hasst dich jetzt, aber die IT-Abteilung feiert dich als Legende." 
            }
        ]
    },
{
        id: "cof_descaling_1",
        title: "Kalk-Infarkt",
        text: "Die Kaffeemaschine blinkt in aggressivem Rot: 'SYSTEM VERKALKT - BITTE REINIGEN'. Der Kaffee tröpfelt nur noch im Sekundentakt wie eine undichte Dachrinne in die Tasse. Die Pumpe ächzt hörbar.",
        opts: [
            { 
                t: "Den Reinigungsvorgang heldenhaft starten", 
                next: "path_descale_hero", 
                m: 10, f: -10, a: 40, c: 0, 
                r: "Du drückst den Knopf. Ein fataler Fehler. Das Display zeigt: 'Reinigung läuft... Restzeit: 45 Minuten'. Hinter dir bildet sich sofort eine wütende Schlange. 'Toll, Müller! Jetzt kriegt keiner mehr was!' Du wirst ausgebuht." 
            },
            { 
                t: "Schild 'DEFEKT' drankleben & verschwinden", 
                next: "path_descale_fake", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du klebst einen Zettel über das Display und machst dich schnell aus dem Staub. Die Kollegen seufzen enttäuscht und schlurfen zurück an die Arbeit. Du hast das Problem zwar nicht gelöst, aber erfolgreich delegiert." 
            },
            { 
                t: "Ignorieren & tröpfeln lassen", 
                next: "path_descale_ignore", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du starrst stoisch auf den Auslauf. Tropf... Tropf... Nach 5 Minuten hast du eine halbe Tasse lauwarme, kalkhaltige Brühe. Sie schmeckt nach Elend, aber sie enthält Koffein." 
            }
        ]
    },
    {
        id: "cof_descaling_2a",
        title: "Säure-Attentat",
        reqStory: "path_descale_hero",
        text: "Die Entkalkung ist durch, aber irgendwas stimmt nicht. Der erste Kollege, der sich einen Kaffee zieht, spuckt ihn quer durch den Raum. 'BAH! Das schmeckt nach Batteriesäure! Wer hat nicht gespült?!'",
        opts: [
            { 
                t: "Unschuldig pfeifen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du schaust weg. 'Bestimmt ein Software-Fehler.' Der Kollege spült seinen Mund am Wasserspender aus. Knapp war's." 
            },
            { 
                t: "Behaupten: 'Das ist die neue Citrus-Röstung'", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Der Kollege probiert noch mal vorsichtig. 'Echt? Hm... erfrischend im Abgang.' Du hast gerade einen widerlichen Trend gesetzt." 
            }
        ]
    },
    {
        id: "cof_descaling_2b",
        title: "Egon deckt auf",
        reqStory: "path_descale_fake",
        text: "Hausmeister Egon wedelt mit deinem 'DEFEKT'-Zettel durch den Flur. 'Welcher Scherzkeks war das? Die Maschine wollte nur entkalkt werden! Ich bin doch nicht euer Kindermädchen!' Er sucht den Schuldigen.",
        opts: [
            { 
                t: "Kevin beschuldigen", 
                m: 5, f: 0, a: -5, c: -5, 
                r: "'Der Azubi war zuletzt in der Küche.' Egon nickt grimmig und stapft Richtung Azubi-Büro. Dein Gewissen ist schwarz, aber rein." 
            },
            { 
                t: "Sich stellen: 'Ich wollte nichts kaputt machen'", 
                m: 5, f: -5, a: 0, c: 0, 
                r: "Egon schnaubt. 'Typisch Schreibtischtäter. Zwei linke Hände.' Aber er beruhigt sich. Du darfst weiterleben." 
            }
        ]
    },
    {
        id: "cof_descaling_2c",
        title: "Innere Werte",
        reqStory: "path_descale_ignore",
        text: "Dein Magen grummelt seltsam. Du hast das Gefühl, einen halben Ziegelstein verschluckt zu haben. Offenbar war in dem 'Kaffee' mehr Kalk als Wasser.",
        opts: [
            { 
                t: "Schönreden: 'Das ist gut für die Knochen'", 
                m: 2, f: 5, a: 5, c: 0, 
                r: "Mineralstoffe sind wichtig. Du redest dir ein, dass du dich gesund ernährst. Der Schmerz ist nur Schwäche, die den Körper verlässt." 
            },
            { 
                t: "Literweise Wasser trinken", 
                m: 5, f: 5, a: 5, c: 0, 
                r: "Du versuchst, das Sediment aus deinem Körper zu spülen. Du verbringst den Rest des Nachmittags auf der Toilette. Produktivität: 0." 
            }
        ]
    },
    {
        id: "cof_spill_1",
        title: "Die braune Gefahr",
        text: "Ein See aus klebrigem, kaltem Kaffee breitet sich vor der Maschine aus. Der Täter ist längst über alle Berge. Es ist eine rutschige Todesfalle, die nur darauf wartet, das nächste Opfer zu fordern.",
        opts: [
            { 
                t: "Heldenhaft zum Lappen greifen & wischen", 
                next: "path_spill_clean", 
                m: 5, f: -5, a: 20, c: 20, 
                r: "Du kniest am Boden und wischst. In dem Moment biegt der Chef um die Ecke. 'Herrgott, Müller! Können Sie nicht mal eine Tasse halten? Das ist ja peinlich!' Er steigt über deine Hand und geht kopfschüttelnd. Du kochst vor Wut." 
            },
            { 
                t: "Warnschild basteln & aufstellen", 
                next: "path_spill_warn", 
                m: 2, f: 5, a: 5, c: 0, 
                r: "Du kritzelst 'VORSICHT: TÖDLICH' auf einen Zettel, stellst ihn auf und gehst. Kurz darauf hörst du hinter dir ein lautes Schlittern, gefolgt von Fluchen. Tja, wer lesen kann, ist klar im Vorteil." 
            },
            { 
                t: "Großen Schritt drüber machen", 
                m: 0, f: 5, a: -5, c: 0, 
                r: "Mit einem olympreifen Satz springst du über die Lache. Nicht dein Dreck, nicht dein Problem. Soll die Nachtschicht doch Schlittschuh laufen. Du fühlst dich erhaben." 
            }
        ]
    },
    {
        id: "cof_spill_2a",
        title: "Die Schnabeltasse",
        reqStory: "path_spill_clean",
        text: "Auf deinem Schreibtisch steht ein Paket vom Chef. Inhalt: Ein bunter Kinder-Trinkbecher mit Deckel und Saugstutzen. Notiz: 'Damit die Teppiche sauber bleiben. Safety First!'.",
        opts: [
            { 
                t: "Tasse benutzen (Trotz)", 
                m: 5, f: 0, a: 10, c: 5, 
                r: "Du trinkst demonstrativ aus der Schnabeltasse. Die Kollegen kichern hinter vorgehaltener Hand. Es ist extrem peinlich, aber hey: Der Kaffee bleibt heiß. Deine Wut wächst mit jedem Schluck." 
            },
            { 
                t: "In den Müll werfen", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Das Ding fliegt mit Wucht in den Papierkorb. Du bist doch kein Kleinkind. Das Abreagieren tat gut." 
            }
        ]
    },
    {
        id: "cof_spill_2b",
        title: "Der Arbeitsunfall",
        reqStory: "path_spill_warn",
        text: "Chantal humpelt mit bandagiertem Knöchel an dir vorbei. Sie wedelt wütend mit deinem Zettel. 'Das Schild war viel zu klein! Ich werde das als Arbeitsunfall melden wegen mangelnder Sicherheitskennzeichnung!'",
        opts: [
            { 
                t: "Juristisch wehren: 'DIN-Norm erfüllt'", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "Du musst ihr 10 Minuten lang erklären, dass die Schriftgröße lesbar war. Sie rauscht beleidigt ab. Du hast Recht, aber die Diskussion war pure Zeitverschwendung und nervig." 
            },
            { 
                t: "Mitleid zeigen (Schokolade)", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du gibst ihr einen Riegel aus deiner Schublade. Sie beruhigt sich sofort. 'Na gut. Aber nächstes Mal machst du Neon-Farbe dran, okay?' Problem gelöst." 
            }
        ]
    },
    {
        id: "cof_elster_fight_1",
        title: "Streit um den Kühlschrank",
        text: "Frau Elster wirft dein Essen weg! 'Das stinkt nach Erdnüsse!', keift sie. Du stellst sie zur Rede.",
        opts: [
            { 
                t: "Anbrüllen: 'Das war mein Mittag!'", 
                next: "path_elster_allergy", 
                m: 10, f: 0, a: 20, c: 10, 
                r: "Sie schreit zurück: 'Ich bin hochsensibel! Wenn ich nur **Erdnüsse** rieche, schwillt mein Hals zu! Nimm gefälligst Rücksicht!' Sie atmet schwer. Oha, wunde Stelle entdeckt." 
            },
            { 
                t: "Klein beigeben", 
                next: "path_elster_police", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "Du entschuldigst dich kleinlaut. Sie rückt ihre Brille zurecht, schnaubt: 'Man muss eben an die Gemeinschaft denken!' und rauscht ab. Der Streit ist vorbei, dein Essen aber auch." 
            }
        ]
    },
    {
        id: "cof_elster_fight_2a",
        title: "Die Bio-Waffe",
        reqStory: "path_elster_allergy",
        text: "Du sitzt in der Küche und öffnest einen 'Snickers'. Frau Elster kommt rein, schnuppert, wird kreidebleich und weicht zurück. 'Ist das... Erdnuss? Willst du mich umbringen?! Geh weg damit!'",
        opts: [
            { 
                t: "Genüsslich kauen & anhauchen", 
                m: 5, f: -5, a: -10, c: 10, 
                r: "Du kaust extra laut. 'Mmmh, knackig.' Frau Elster flüchtet panisch aus dem Raum. Du hast jetzt die Küche für dich allein. Mächtiges Gefühl." 
            },
            { 
                t: "Rücksicht nehmen & wegpacken", 
                m: 5, f: 5, a: 5, c: 0, 
                r: "Du packst den Riegel weg. 'Schon gut.' Sie nickt dankbar, aber misstrauisch. Du hast Hunger, aber immerhin keinen Mord auf dem Gewissen." 
            }
        ]
    },
    {
        id: "cof_elster_fight_2b",
        title: "Die Lebensmittel-Polizei",
        reqStory: "path_elster_police",
        text: "Da du beim letzten Mal gekuscht hast, greift Frau Elster jetzt durch. Dein Joghurt ist weg. Dafür klebt ein Zettel am Fach: 'Wegen fehlendem Haltbarkeitsdatum präventiv entsorgt. Gez. Elster'.",
        opts: [
            { 
                t: "Wütenden Antwort-Zettel schreiben", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du schreibst: 'Finger weg von meinem Eigentum!' und klebst ihn an ihre Tupperdose. Ein kleiner Akt der Rebellion, der gut tut." 
            },
            { 
                t: "Alles neu beschriften (Arbeit)", 
                m: 2, f: 5, a: 15, c: 0, 
                r: "Du beschriftest jedes einzelne Lebensmittel mit Datum und Namen, damit sie Ruhe gibt. Es dauert 10 Minuten und nervt tierisch." 
            }
        ]
    },
{
        id: "cof_salary_rumor_1",
        title: "Der Gehalts-Schock",
        text: "Du stehst hinter der Säule und hörst Chantal aus dem Marketing kichern: 'Ja, echt! 500 Euro mehr! Einfach so, weil ich so nett gelächelt habe! Dabei kann ich kaum Excel.' Dein Gehalt wurde seit 3 Jahren nicht angepasst. Dir platzt fast der Kragen.",
        opts: [
            { 
                t: "Wut nutzen & Leistungen notieren", 
                loot: "arg_list_1", 
                next: "path_salary_talk", 
                m: 10, f: -5, a: 5, c: 0, 
                r: "Du schnappst dir eine Serviette und kritzelt wütend deine Erfolge auf: '1000 Tickets gelöst, Brände verhindert, Server gerettet'. Du steckst den Zettel wie eine Waffe ein. Das ist wertvolle Munition für später." 
            },
            { 
                t: "Chantal eine Szene machen", 
                next: "path_salary_rage", 
                m: 5, f: 0, a: 20, c: 10, 
                r: "Du brüllst quer durch den Raum: 'EXCEL IST KEINE KUNST!'. Chantal fängt an zu weinen. Alle starren dich an. Du hast Dampf abgelassen, wirkst aber mental labil. Kein guter Look." 
            },
            { 
                t: "Den Ärger runterspülen / Stressball", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du schluckst den Ärger runter oder knetest deinen Stressball. Es ändert nichts an deinem Kontostand, aber dein Blutdruck sinkt minimal. Du gehst frustriert zurück an die Arbeit." 
            }
        ]
    },
    {
        id: "cof_salary_rumor_2a",
        title: "Der Pitch",
        reqStory: "path_salary_talk",
        text: "Der Chef sieht dich auf dem Flur. 'Ah, Müller! Gut, dass ich Sie sehe.' Du hast deine Argumente-Liste in der Tasche. Das ist der Moment.",
        opts: [
            { 
                t: "Liste zücken & fordern", 
                req: "arg_list_1", 
                m: 10, f: 10, a: -5, c: 10, 
                r: "Du ratterst deine Erfolge runter. Der Chef ist beeindruckt (und etwas eingeschüchtert). 'Okay, okay! Wir reden über einen Bonus.' Ein Teilsieg! Du fühlst dich wertgeschätzt." 
            },
            { 
                t: "Kneifen & nur grüßen", 
                m: 2, f: 0, a: 10, c: 0, 
                r: "Mut verlassen. 'Hallo Chef.' Er geht weiter. Du hast die Chance vertan und hasst dich dafür ein bisschen selbst." 
            }
        ]
    },
    {
        id: "cof_salary_rumor_2b",
        title: "Der HR-Termin",
        reqStory: "path_salary_rage",
        text: "Eine E-Mail von der Personalabteilung: 'Betreff: Vorfall in der Kaffeeküche'. Man möchte über deine 'soziale Kompetenz' und 'Aggressionsbewältigung' sprechen.",
        opts: [
            { 
                t: "Termin wahrnehmen & entschuldigen", 
                m: 5, f: -5, a: 10, c: 0, 
                r: "Du musst 30 Minuten lang nicken und Besserung geloben. Es ist demütigend. Chantal grinst dich danach im Flur an. Dein Hass wächst." 
            },
            { 
                t: "Termin 'vergessen'", 
                m: 5, f: 0, a: -5, c: 20, 
                r: "Du gehst einfach nicht hin. Rebellisch, aber dumm. Jetzt hast du eine offizielle Abmahnung in der Akte. Aber dein Stolz ist intakt." 
            }
        ]
    },
    {
        id: "cof_markus_flex_1",
        title: "Der Angeber",
        text: "Markus aus dem Vertrieb blockiert die Maschine. Er krempelt den Ärmel hoch und hält dir sein Handgelenk unter die Nase. 'Na, Admin? Schau mal genau hin. Diese Uhr kostet mehr als dein ganzes Auto.' Er grinst sein breites Gewinner-Lächeln.",
        opts: [
            { 
                t: "Gezielter Wurf mit dem Stressball", 
                req: "stressball", 
                next: "path_markus_hit", 
                m: 5, f: 0, a: -20, c: 30, 
                r: "ZACK! Volltreffer auf die Nase. Markus jault auf wie ein getretener Pudel. Du fühlst tiefe Genugtuung, aber leider stand der Chef im Türrahmen. Das gibt Ärger." 
            },
            { 
                t: "Trocken kontern: 'Ist die geleast?'", 
                next: "path_markus_roast", 
                m: 10, f: 0, a: -10, c: 5, 
                r: "Sein Grinsen gefriert. Er läuft rot an und stammelt etwas von 'Wertanlage'. Die umstehenden Kollegen lachen laut los. Ein Sieg auf ganzer Linie." 
            },
            { 
                t: "Kopfhörer aufsetzen & ignorieren", 
                req: "headphones", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Klick. Noise-Cancelling an. Du hörst sanfte Mozart-Klänge, während Markus stumm den Mund bewegt. Du zapfst entspannt deinen Kaffee. Frieden." 
            },
            { 
                t: "Unterwürfig warten", 
                next: "path_markus_servant", 
                m: 20, f: 0, a: 20, c: 0, 
                r: "Du wartest devot 20 Minuten, bis er seinen Monolog über 'Assets' und 'Mindset' beendet hat. Du hast deinen Kaffee, aber er schmeckt bitter nach Demütigung." 
            }
        ]
    },
    {
        id: "cof_markus_flex_2a",
        title: "Das Schmerzensgeld",
        reqStory: "path_markus_hit",
        text: "Markus trägt jetzt ein riesiges Pflaster auf der Nase (völlig übertrieben). Er wedelt mit einem Formular vor deinem Gesicht. 'Das war ein tätlicher Angriff! Entweder du unterschreibst diese offizielle Entschuldigung, oder ich rufe meinen Anwalt!'",
        opts: [
            { 
                t: "Unterschreiben (Demütigung)", 
                m: 5, f: 0, a: 15, c: 0, 
                r: "Du unterschreibst. Markus grinst triumphierend und hängt den Zettel an seine Bürotür. Jeder kann jetzt lesen, dass es dir leid tut. Dein Blut kocht." 
            },
            { 
                t: "Nochmal drohen", 
                req: "stressball", 
                m: 5, f: -5, a: -5, c: 10, 
                r: "Du holst den Stressball wieder raus. Markus zuckt zusammen und rennt weg. Das Problem ist vertagt, aber nicht gelöst." 
            }
        ]
    },
    {
        id: "cof_markus_flex_2b",
        title: "Der Beweis",
        reqStory: "path_markus_roast",
        text: "Dein Spruch hat Markus' Ego schwer getroffen. Er kommt mit seinem Laptop zu dir. 'Geleast? Dass ich nicht lache! Guck dir mein Crypto-Portfolio an! Ich bin reich! REICH!' Er drängt dir den Bildschirm auf.",
        opts: [
            { 
                t: "Laut vorlesen: 'Minus 60 Prozent?!'", 
                m: 5, f: 0, a: -10, c: 5, 
                r: "Du zeigst auf die rote Kurve. Markus klappt den Laptop panisch zu. 'Das ist nur... eine Korrektur! Dip kaufen!' Er rennt weinend weg." 
            },
            { 
                t: "Desinteressiert abwinken", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "'Jaja, Markus.' Du lässt ihn stehen. Nichts tut einem Angeber mehr weh als Gleichgültigkeit." 
            }
        ]
    },
    {
        id: "cof_markus_flex_2c",
        title: "Das Coaching",
        reqStory: "path_markus_servant",
        text: "Weil du ihm zugehört hast, hält Markus dich jetzt für seinen 'Schüler'. Er schickt dir morgens um 6 Uhr WhatsApp-Sprachnachrichten: 'Guten Morgen Champ! Zeit zum Hustlen! Hol mir mal einen Kaffee, das übt Demut!'",
        opts: [
            { 
                t: "Kaffee holen (Dienst nach Vorschrift)", 
                m: 10, f: 0, a: 25, c: 0, 
                r: "Du bringst ihm den Kaffee. Er tätschelt dir den Kopf. 'Braver Junge.' Du stirbst innerlich tausend Tode." 
            },
            { 
                t: "Blockieren & Ignorieren", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du blockierst seine Nummer. Markus steht später verwirrt an deinem Tisch: 'Mein Handy spinnt.' Du zuckst nur mit den Schultern." 
            }
        ]
    },
    {
        id: "cof_gabi_sad_1",
        title: "Trauerfall in der Poststelle",
        text: "Gabi aus der Poststelle sitzt schluchzend auf der Eckbank im Pausenraum. In der Hand hält sie einen braunen, schrumpeligen Klumpen. 'Mein kleiner Stachi ist tot! Einfach von uns gegangen!'",
        opts: [
            { 
                t: "Den 'Loot-Donut' als Trost spenden", 
                req: "donut", 
                next: "path_gabi_donut", 
                m: 10, f: 5, a: -10, c: -5, 
                r: "Du opferst deinen Schatz. Gabis Augen leuchten auf. Zucker heilt alle Wunden. Sie mampft glücklich. 'Du bist so lieb! Ich geh wieder an die Arbeit.' Gute Tat!" 
            },
            { 
                t: "Ihr einen Energy-Drink geben", 
                req: "energy", 
                next: "path_gabi_energy", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Ganz schlechte Idee. Das Taurin kickt sofort. Gabi reißt die Augen auf, springt auf und rennt wie ein begaster Hamster zurück zur Poststelle. Das wird Folgen haben." 
            },
            { 
                t: "Geduldig zuhören (Seelsorge)", 
                next: "path_gabi_listen", 
                m: 45, f: -15, a: 20, c: 10, 
                r: "Du hörst dir eine 45-minütige Grabrede für eine Sukkulente an. Dein Kaffee wird kalt. Gabi fühlt sich danach 'so verstanden', aber du bist innerlich tot und kommst viel zu spät zurück." 
            }
        ]
    },
    {
        id: "cof_gabi_sad_2a",
        title: "Sonderzustellung",
        reqStory: "path_gabi_donut",
        text: "Gabi winkt dich hektisch hinter die Palme im Flur. 'Psst! Mein Retter! Das hier kam für dich. Ich hab es extra vor dem Chef abgefangen, sah privat aus.' Sie drückt dir ein Paket in die Hand.",
        opts: [
            { 
                t: "Danken & annehmen", 
                loot: "loot_box", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Es ist deine Amazon-Bestellung (neue Gaming-Maus). Gabi zwinkert dir verschwörerisch zu. 'Bei mir ist deine Post sicher!' Eine wertvolle Verbündete." 
            },
            { 
                t: "Ihr noch mehr Süßes versprechen", 
                m: 5, f: 10, a: -5, c: 0, 
                r: "Du versprichst ihr den nächsten Kuchen aus dem Meeting. Gabi strahlt. Du hast jetzt VIP-Status bei der Postverteilung." 
            }
        ]
    },
    {
        id: "cof_gabi_sad_2b",
        title: "Ortstermin",
        reqStory: "path_gabi_energy",
        text: "Der Chef stürmt in die Küche, packt dich am Arm und zerrt dich in den Flur. 'Sie haben Gabi aufgeputscht?! Sehen Sie sich das an!' Durch die offene Tür der Poststelle siehst du, wie Gabi Pakete im Akkord an die Decke stapelt.",
        opts: [
            { 
                t: "Staunen: 'Effizient!'", 
                m: 5, f: 0, a: 10, c: 5, 
                r: "Der Chef läuft rot an. 'Das ist kein Tetris, das sind wichtige Akten!' Du musst helfen, den Turm abzubauen, bevor er einstürzt. Nervige Strafarbeit." 
            },
            { 
                t: "Flüchten: 'Nicht mein Zuständigkeitsbereich'", 
                m: 2, f: -5, a: 5, c: 0, 
                r: "Du reißt dich los und rennst zurück zum Kaffee. Der Chef brüllt dir hinterher. Das gibt Ärger, aber immerhin musst du nicht klettern." 
            }
        ]
    },
    {
        id: "cof_gabi_sad_2c",
        title: "Die Klette",
        reqStory: "path_gabi_listen",
        text: "Du willst dir nur schnell einen frischen Kaffee holen, da springt Gabi hinter dem Kühlschrank hervor. Sie hat auf dich gewartet. 'Du, der leere Topf sieht so einsam aus... meinst du, eine Begonie wäre besser als ein Kaktus?'",
        opts: [
            { 
                t: "Sich hinter der Kaffeemaschine verstecken", 
                m: 2, f: -5, a: 15, c: 0, 
                r: "Du duckst dich weg. Gabi sucht dich kurz, seufzt laut ('Keiner versteht mich außer dir!') und geht. Das war knapp, aber extrem entwürdigend." 
            },
            { 
                t: "Sarkastisch: 'Nimm Plastikblumen'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "'Oh, gute Idee! Die sterben nicht!' Sie rennt los, um welche zu kaufen. Endlich Ruhe. Du hast zwar Ruhe, aber fühlst dich etwas schlecht." 
            }
        ]
    },
    {
        id: "cof_machine_broke_1",
        title: "Kritischer Dichtungsfehler",
        text: "Ein Rinnsal aus heißem Wasser schießt aus der Seite der Kaffeemaschine. Die braune Brühe bahnt sich unaufhaltsam ihren Weg Richtung der völlig überlasteten Mehrfachsteckdose am Boden. Ein leises, bedrohliches elektrisches Knistern liegt bereits in der Luft.",
        opts: [
            { 
                t: "Mit Gaffa-Tape abdichten", 
                req: "tape", 
                next: "path_machine_tape", 
                m: 10, f: -5, a: 0, c: -10, 
                r: "Du wickelst eine halbe Rolle Tape um den Wassertank. Es sieht aus wie eine misslungene Mumie, aber es hält dicht! Die Küche bleibt trocken, der Kaffee fließt. Du bist der Held des Tages." 
            },
            { 
                t: "Sicherheits-Protokoll: Stecker ziehen", 
                next: "path_machine_plug", 
                m: 5, f: 5, a: 10, c: 10, 
                r: "Zack. Strom aus. Die Gefahr ist gebannt. Das Display wird schwarz. Ein kollektives, schmerzhaftes Stöhnen geht durch das Büro. Du hast vielleicht Leben gerettet, aber die Stimmung ist im Eimer." 
            },
            { 
                t: "Pfeifend weitergehen & ignorieren", 
                next: "path_machine_blackout", 
                m: 5, f: 10, a: 0, c: 50, 
                r: "Du ignorierst die Pfütze. Zehn Minuten später: *ZZZAPP*. Dunkelheit im ganzen Stockwerk. Der Chef stürmt auf den Flur und brüllt: 'WER HAT DIE SICHERUNG RAUSGEJAGT?! MEIN WORD-DOKUMENT!!'" 
            }
        ]
    },
    {
        id: "cof_machine_broke_2a",
        title: "Ingenieurs-Kunst",
        reqStory: "path_machine_tape",
        text: "Hausmeister Egon steht vor deinem Tape-Kunstwerk. Er nickt langsam und anerkennend. 'Saubere Arbeit, Müller. Hätte ich nicht besser machen können. Das hält bis 2030.' Er klopft dir fest auf die Schulter.",
        opts: [
            { 
                t: "Bescheiden nicken", 
                m: 10, f: 0, a: -10, c: -5, 
                r: "Du genießt den seltenen Respekt. Egon lädt dich sogar ein, später mal seinen neuen Akkuschrauber anzusehen. Ein guter Tag." 
            },
            { 
                t: "Fachsimpeln: 'Panzertape regelt alles'", 
                m: 5, f: 5, a: -15, c: 0, 
                r: "Ihr tauscht kurz Handwerker-Weisheiten aus. Das entspannt ungemein. Du fühlst dich kompetent und wertgeschätzt." 
            }
        ]
    },
    {
        id: "cof_machine_broke_2b",
        title: "Der Lebensretter",
        reqStory: "path_machine_plug",
        text: "Der Chef kommt wütend rein, sieht aber dann die verschmorte Steckdose, die noch leicht qualmt. Er wird bleich. 'Mein Gott... wenn Sie nicht gezogen hätten... das ganze Archiv! Müller, Sie haben uns den Hintern gerettet!'",
        opts: [
            { 
                t: "Den Helden spielen", 
                m: 10, f: 5, a: -20, c: -30, 
                r: "'Nur mein Job, Chef.' Er drückt dir dankbar die Hand. 'Machen Sie heute früher Feierabend. Das ist ein Befehl!' Musik in deinen Ohren." 
            },
            { 
                t: "Beruhigen: 'Sicherheit geht vor'", 
                m: 5, f: 0, a: -10, c: -20, 
                r: "Die Kollegen klatschen leise. Der Ärger über den fehlenden Kaffee ist verflogen. Du bist der verantwortungsvolle Fels in der Brandung." 
            }
        ]
    },
    {
        id: "cof_machine_broke_2c",
        title: "Zwangspause",
        reqStory: "path_machine_blackout",
        text: "Der Strom ist weg, die PCs sind aus. Statt Panik breitet sich eine seltsame Ruhe aus. Jemand hat Kekse rumgereicht. Sogar der Chef entspannt sich, nachdem die IT bestätigt hat, dass das Autosave funktioniert hat.",
        opts: [
            { 
                t: "Die Stille genießen", 
                m: 20, f: 0, a: -25, c: -10, 
                r: "Keine Telefonate, kein Lüfterrauschen. Alle sitzen im Halbdunkel und unterhalten sich nett. Es ist wie ein Lagerfeuer ohne Feuer. Du tankst richtig Kraft." 
            },
            { 
                t: "Witze erzählen", 
                m: 10, f: 10, a: -15, c: -5, 
                r: "Die Stimmung ist locker. Der Chef lacht sogar über deinen (harmlosen) Witz. Diese unerwartete Teambuilding-Maßnahme war genau das, was alle gebraucht haben." 
            }
        ]
    },
    {
        id: "cof_kevin_learn_1",
        title: "Kevins Weltbild",
        text: "Kevin starrt fasziniert auf das blinkende Server-Rack. Er dreht sich mit großen Augen zu dir um: 'Sag mal... sitzt da drin eigentlich ein kleiner Mann, der die ganzen E-Mails tippt und weiterschickt?' Du wartest auf die Pointe. Aber es kommt keine. Er meint das todernst.",
        opts: [
            { 
                t: "Die Technik geduldig erklären", 
                next: "path_kevin_explain", 
                m: 30, f: -10, a: 10, c: 0, 
                r: "Du nimmst dir eine halbe Stunde Zeit und malst Datenpakete an das Whiteboard. Kevin nickt langsam: 'Achso! Also wie Rohrpost, nur unsichtbar?' Es ist ein kleiner Fortschritt." 
            },
            { 
                t: "Ihm wortlos das Handbuch geben", 
                req: "manual", 
                next: "path_kevin_manual", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du drückst ihm den schweren Wälzer gegen die Brust. 'Lies Kapitel 1 bis 10. Vorher sprichst du mich nicht mehr an.' Er verzieht sich ehrfürchtig in eine Ecke. Endlich Ruhe." 
            },
            { 
                t: "Lügen: 'Ja, das ist der E-Mail-Kobold'", 
                next: "path_kevin_kobold", 
                m: 5, f: 10, a: -5, c: 10, 
                r: "Du nickst verschwörerisch: 'Ja, er heißt Gunter. Aber bloß nicht füttern!' Kevin kriecht jetzt mit der Taschenlampe hinter das Rack und sucht nach Gunter. Der Chef sieht es und zweifelt an der Eignung des Azubis." 
            }
        ]
    },
    {
        id: "cof_kevin_learn_2a",
        title: "Rohrpost 2.0",
        reqStory: "path_kevin_explain",
        text: "Kevin hat versucht, deine Erklärung umzusetzen. Er hat Klorollen an die Server-Lüfter geklebt. 'Damit die Daten schneller flutschen!', ruft er stolz. Überraschenderweise entsteht dadurch ein angenehm kühler Luftzug direkt auf deinen Schreibtisch.",
        opts: [
            { 
                t: "Genießen & loben", 
                m: 0, f: 5, a: -15, c: 5, 
                r: "Du lehnst dich zurück. 'Gute Arbeit, Kevin.' Der Luftzug ist herrlich bei der Hitze. Endlich mal eine Innovation, die was bringt. Du bist entspannt." 
            },
            { 
                t: "Konstruktion abreißen", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du reißt die Papp-Röhren weg. 'Brandschutz!' Kevin schaut traurig. Jetzt schwitzt du wieder und musst Klebereste entfernen. Eigentlich dumm gelaufen." 
            }
        ]
    },
    {
        id: "cof_kevin_learn_2b",
        title: "Der Schriftgelehrte",
        reqStory: "path_kevin_manual",
        text: "Kevin steht stramm vor dir. Er hat das Handbuch auswendig gelernt. 'Laut Seite 103, Absatz 4 steht dem Administrator bei erhöhter Serverlast eine zwanzigminütige Regenerationspause zu. Soll ich den Türsteher machen?'",
        opts: [
            { 
                t: "Angebot annehmen (Pause)", 
                m: 20, f: 5, a: -20, c: 0, 
                r: "Du legst die Füße hoch. Kevin bewacht die Tür und weist sogar den Chef mit Verweis auf 'Seite 103' ab. Das ist der beste Azubi aller Zeiten. Dein Stresslevel sinkt auf Null." 
            },
            { 
                t: "Ihn wegschicken", 
                m: 2, f: -5, a: 5, c: 0, 
                r: "'Lass den Quatsch.' Du arbeitest weiter. Kevin ist enttäuscht. Du hast eine Chance auf legale Faulheit verpasst." 
            }
        ]
    },
    {
        id: "cof_kevin_learn_2c",
        title: "Gunters Opfergabe",
        reqStory: "path_kevin_kobold",
        text: "Hinter dem Rack findest du einen Teller. Darauf liegt keine saure Milch, sondern eine Packung feinster belgischer Pralinen. Ein Zettel liegt dabei: 'Für Gunter, bitte mach das Internet ganz.'",
        opts: [
            { 
                t: "Ich bin Gunter (Essen)", 
                m: 5, f: 10, a: -10, c: 0, 
                r: "Du mampfst die Pralinen genüsslich auf. Sie schmecken fantastisch. Als Kevin reinkommt, rülpst du leise. Kevin flüstert ehrfürchtig: 'Gunter hat es angenommen!'" 
            },
            { 
                t: "Kevin als Gunter erschrecken", 
                m: 5, f: 15, a: -15, c: 5, 
                r: "Du versteckst dich und machst Gruselgeräusche: *'MEHR SCHOKOLADE!'* Kevin rennt schreiend weg. Du lachst Tränen. Das war böse, aber extrem befriedigend." 
            }
        ]
    },
    {
        id: "cof_birthday_cake_1",
        title: "Kuchen im Flur",
        text: "Ein riesiger Schokokuchen steht herrenlos auf dem Beistelltisch. Ein Schild sagt handschriftlich: 'Bedient euch!'. Es riecht verführerisch nach Kakao und Sahne.",
        opts: [
            { 
                t: "Ein Stück nehmen", 
                next: "path_cake_eat", 
                m: 10, f: 5, a: -10, c: 0, 
                r: "Lecker! Ein purer Zuckerschock. Du schaufelst dir das Stück rein. Das Leben ist gut." 
            },
            { 
                t: "Den ganzen Kuchen einpacken", 
                next: "path_cake_steal", 
                m: 5, f: 10, a: -5, c: 20, 
                r: "Du schaust dich um – die Luft ist rein. Du nimmst die ganze Platte und trägst sie schnell in dein Büro. 'Für später'. Dein Herz klopft vor Gier." 
            },
            { 
                t: "Misstrauisch sein", 
                m: 0, f: 0, a: 5, c: 0, 
                r: "Gratis Essen? Verdächtig. Wer weiß, wie lange der da schon steht. Du rührst ihn nicht an. Du bleibst hungrig, aber sicher." 
            }
        ]
    },
    {
        id: "cof_birthday_cake_2a",
        title: "Die Rum-Bombe",
        reqStory: "path_cake_eat",
        text: "Hoppla. Das war nicht nur Schokolade. Das war 'Schwarzwälder Kirsch' mit 80% Stroh-Rum. Dir wird warm ums Herz und leicht schwindelig. Der Stress fällt von dir ab, aber deine Zunge fühlt sich pelzig an.",
        opts: [
            { 
                t: "Den Rausch genießen", 
                m: 5, f: 0, a: -20, c: 5, 
                r: "Du lehnst dich an die Wand und grinst blöd. Ein Kollege fragt dich was, du kicherst nur. Der beste Arbeitstag seit Jahren." 
            },
            { 
                t: "Versuchen, seriös zu wirken", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du setzt dich kerzengerade hin und starrst auf deinen Monitor. Bloß nicht auffallen. Die Paranoia killt die gute Laune etwas." 
            }
        ]
    },
    {
        id: "cof_birthday_cake_2b",
        title: "Meeting-Crasher",
        reqStory: "path_cake_steal",
        text: "Du sitzt in deinem Büro vor dem gestohlenen Kuchen, als die Tür auffliegt. Der Chef und drei japanische Investoren stehen da. Der Chef starrt auf den Kuchen, dann auf dich. 'Müller?! Das war das Catering für die Delegation!'",
        opts: [
            { 
                t: "Lügen: 'Qualitätskontrolle!'", 
                m: 5, f: 10, a: 20, c: 30, 
                r: "Du stammelst mit vollem Mund etwas von 'Gift-Test'. Niemand glaubt dir. Es ist unfassbar peinlich. Die Japaner verbeugen sich höflich vor deiner Gier." 
            },
            { 
                t: "Teilen anbieten", 
                m: 5, f: 0, a: -5, c: 10, 
                r: "Du hältst dem Investor eine Gabel hin. Er nimmt dankend an. Die Situation ist gerettet, aber der Chef wird dich später töten." 
            }
        ]
    },
    {
        id: "cof_elevator_stuck_1",
        title: "Im Aufzug stecken",
        text: "Ruckel. Klack. Stille. Nicht schon wieder! Der Aufzug bleibt zwischen dem 2. und 3. Stock hängen. Neben dir steht Markus aus dem Vertrieb in einer Wolke aus 'Eau de Success'. Er grinst: 'Na, Zeit für ein Networking-Gespräch, was?'",
        opts: [
            { 
                t: "Notruf drücken & beten", 
                next: "path_elevator_tech", 
                m: 30, f: 0, a: 15, c: 0, 
                r: "Egon meldet sich knarzend: 'Hömma! Ich ess erst mal meine Stulle auf. Bleib locker.' Du bist 30 Minuten gefangen. Deine Laune ist im Keller." 
            },
            { 
                t: "Markus zuhören (Opfergang)", 
                next: "path_elevator_markus", 
                m: 30, f: -10, a: 25, c: 0, 
                r: "Er erzählt von seinem Porsche, seinen Crypto-Wins und seinem 'Mindset'. Du nickst apathisch und stirbst innerlich tausend Tode. Er scheint das Nicken als Zustimmung zu werten." 
            },
            { 
                t: "Aufzugstür aufhebeln", 
                req: "screw", 
                next: "path_elevator_hero", 
                m: 10, f: -5, a: -10, c: 0, 
                r: "Du rammst den Schraubendreher in den Spalt. Mit einem Ruck gleitet die Tür auf. Freiheit! Die anderen Insassen staunen: 'Alpha-Move, Respekt!'" 
            }
        ]
    },
    {
        id: "cof_elevator_2a",
        title: "Gefangen mit dem Bestie",
        reqStory: "path_elevator_markus",
        text: "Markus springt in letzter Sekunde zu dir in den Aufzug. 'Hey Buddy! Gut, dass ich dich treffe!' Er drückt grinsend den **Nothalt-Knopf**. Der Aufzug stoppt hart. 'Ich muss dir unbedingt von meiner neuen Business-Idee erzählen. Dauert nur 20 Minuten.'",
        opts: [
            { 
                t: "Panisch schreien: 'HILFE!'", 
                m: 5, f: 0, a: 30, c: 0, 
                r: "Markus lacht. 'Du bist so witzig! Aber im Ernst: Multi-Level-Marketing für Hamsterfutter!' Es gibt kein Entkommen. Das ist Freiheitsberaubung." 
            },
            { 
                t: "Ihm die Show stehlen", 
                m: 20, f: 0, a: -10, c: 5, 
                r: "Du fängst an, IHM eine Geschichte von deinem langweiligen Wochenende zu erzählen. Nach 5 Minuten drückt Markus genervt den Knopf, damit es weitergeht. Sieg durch Langeweile." 
            }
        ]
    },
    {
        id: "cof_elevator_2b",
        title: "Experten am Werk",
        reqStory: "path_elevator_tech",
        text: "Der Aufzug ruckt und steht. Neben dir: Ein Mann im Blaumann. Er wird bleich. 'Äh. Ich bin der Techniker. Ich wollte den Aufzug reparieren.' Er drückt hektisch Knöpfe. 'Mist. Mein Werkzeugkoffer steht draußen. Wir sitzen fest.'",
        opts: [
            { 
                t: "Ihm den 'Notfall-Donut' geben", 
                req: "donut", 
                m: 20, f: 5, a: -10, c: 0, 
                r: "Der Techniker zittert wegen Unterzuckerung. Du gibst ihm den Donut. Er beruhigt sich, tritt gegen die Tür und – ZACK – sie geht auf. 'Danke, Kumpel!' Manchmal hilft Zucker mehr als Technik." 
            },
            { 
                t: "Gemeinsam warten (Hoffnungslos)", 
                m: 45, f: 0, a: 20, c: 0, 
                r: "Ihr sitzt beide auf dem Boden. Der Techniker weint leise. Nach 45 Minuten hört ihr Egon lachen, der die Tür von außen öffnet. 'Na, Kaffeekränzchen?'" 
            }
        ]
    },
    {
        id: "cof_elevator_2c",
        title: "Der Aufzugs-Flüsterer",
        reqStory: "path_elevator_hero",
        text: "Der Aufzug ruckelt und bleibt stehen. Die fünf anderen Kollegen drehen sich synchron zu dir um. Einer reicht dir erwartungsvoll seinen Autoschlüssel. 'Los, mach schon. Du hast das doch neulich auch repariert. Wir haben es eilig.'",
        opts: [
            { 
                t: "Verweigern: 'Bin kein Techniker'", 
                m: 30, f: 0, a: 15, c: -5, 
                r: "Die Stimmung kippt. 'Toll. Jetzt müssen wir warten.' Alle starren dich 30 Minuten lang vorwurfsvoll an. Du bist der Buhmann, weil du nicht helfen willst." 
            },
            { 
                t: "So tun, als ob (Show)", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "Du rüttelst wichtig an der Tür und murmelst 'Fluxkompensator'. Zufällig geht es weiter. 'Ein Genie!', flüstern die Kollegen. Dein Ruf als Legende ist zementiert." 
            }
        ]
    },
    {
        id: "cof_miracle_1",
        title: "Das kleine Wunder",
        text: "Die Maschine macht seltsame Geräusche, rattert... und produziert dann den perfekten Kaffee. Perfekte Temperatur, haselnussbraune Crema, duftet wie in Italien. Ein statistischer Ausreißer. Ein Einhorn in Tassenform.",
        opts: [
            { 
                t: "Sofort andächtig genießen", 
                m: 10, f: 5, a: -25, c: 0, 
                r: "Du trinkst in kleinen Schlucken. Jeder Schluck heilt deine Seele ein wenig. Du ignorierst das Telefon und die Welt. Für 5 Minuten ist alles gut. (Aggro massiv gesenkt)" 
            },
            { 
                t: "Foto für Insta machen", 
                next: "path_miracle_insta", 
                m: 5, f: 10, a: -5, c: 0, 
                r: "Das muss dokumentiert werden! Du arrangierst deine Brille und einen Stift dekorativ daneben. '#OfficeLife #Grindset #Blessed'. Aber ein Foto reicht nicht..." 
            },
            { 
                t: "Dem Chef bringen (Schleimen)", 
                next: "path_miracle_boss", 
                m: 5, f: -5, a: 5, c: 15, 
                r: "Du denkst strategisch. Du trägst den heiligen Gral vorsichtig ins Chef-Büro. 'Hier Chef, der ist besonders gut heute.' Er guckt überrascht." 
            }
        ]
    },
    {
        id: "cof_miracle_2a",
        title: "Das Influencer-Debakel",
        reqStory: "path_miracle_insta",
        text: "Du versuchst, den perfekten Winkel zu finden. Du steigst auf deinen Bürostuhl, machst ein Duckface und hältst die Tasse in die Kamera. Die Tür geht auf. Der ganze Vorstand steht da und starrt dich an. Du stehst auf dem Stuhl. Mit gespitzten Lippen.",
        opts: [
            { 
                t: "So tun, als wäre das eine Yoga-Übung", 
                m: 5, f: 0, a: 15, c: 0, 
                r: "Du dehnst dich langsam. 'Büro-Gymnastik! Wichtig für den Rücken!' Niemand kauft es dir ab. Der Vorstand geht kopfschüttelnd weiter. Du möchtest im Boden versinken." 
            },
            { 
                t: "Foto posten & Kündigung erwarten", 
                m: 2, f: 10, a: -10, c: 5, 
                r: "Du drückst ab. Das Foto ist unscharf und dein Gesichtsausdruck ist irre. Aber hey: 3 Likes von Bots! Der soziale Abstieg war es wert." 
            }
        ]
    },
    {
        id: "cof_miracle_2b",
        title: "Perlen vor die Säue",
        reqStory: "path_miracle_boss",
        text: "Der Chef freut sich. 'Müller! Sie lesen Gedanken!' Er nimmt die Tasse mit dem perfekten Kaffee... und kippt drei Päckchen Süßstoff und einen Schuss laktosefreie H-Milch hinein. Die Crema zerfällt sofort zu grauer Plörre.",
        opts: [
            { 
                t: "Innerlich weinen & lächeln", 
                m: 5, f: 0, a: 10, c: -10, 
                r: "'Lecker', schmatzt der Chef. Du hast das Heiligste geopfert und er hat es entweiht. Aber er mag dich jetzt etwas mehr. Dein Herz blutet." 
            },
            { 
                t: "Kommentieren: 'Das war ein Grand Cru!'", 
                m: 5, f: 5, a: 5, c: -5, 
                r: "Der Chef starrt dich an. 'Das ist Kaffee, Müller. Keine Wissenschaft. Gehen Sie arbeiten.' Dein Opfer war umsonst." 
            }
        ]
    },
{
        id: "cof_silence_1",
        title: "Himmlische Stille",
        text: "Du betrittst die Küche. Sie ist leer. Kein Kühlschrank-Brummen, kein kauender Kollege, kein Tropfen. Einfach nur absolute, goldene Stille. Es ist fast schon... unheimlich friedlich.",
        opts: [
            { 
                t: "Die Augen schließen & genießen", 
                next: "path_silence_jumpscare", 
                m: 5, f: 5, a: -20, c: 0, 
                r: "Du atmest tief ein. Fünf Minuten Zen-Modus. Du spürst, wie dein Blutdruck sinkt. Du bist eins mit dem Universum. Ein seltener Moment des Friedens." 
            },
            { 
                t: "Misstrauisch werden: 'Wo sind alle?'", 
                next: "path_silence_drill", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du schaust dich um. Niemand da. Auch nicht im Flur. Ein kalter Schauer läuft dir über den Rücken. Irgendwas stimmt hier nicht." 
            },
            { 
                t: "Schnell Kaffee & weg", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Du traust dem Frieden nicht. Du füllst deinen Becher und verschwindest sofort wieder im sicheren Lärm deines Büros." 
            }
        ]
    },
    {
        id: "cof_silence_2a",
        title: "Herzinfarkt-Risiko",
        reqStory: "path_silence_jumpscare",
        text: "Du bist gerade tiefenentspannt, da brüllt dir jemand direkt ins Ohr: 'MAHLZEIT!!!'. Es ist der lustige Holger aus der Buchhaltung, der sich angeschlichen hat.",
        opts: [
            { 
                t: "Vor Schreck Kaffee verschütten", 
                m: 5, f: -5, a: 10, c: 0, 
                r: "Der heiße Kaffee landet auf deinem Hemd. Holger lacht sich schlapp: 'Hahaha, hast du gezuckt!'. Du bist nass, verbrannt und hast Mordgedanken." 
            },
            { 
                t: "Reflexartig zuschlagen (Stressball)", 
                req: "stressball", 
                m: 5, f: 0, a: -10, c: 10, 
                r: "Dein Arm zuckt aus Reflex. Der Stressball trifft Holger am Kopf. 'Au! Spinnst du?!' Jetzt ist er das Opfer. Geschieht ihm recht." 
            }
        ]
    },
    {
        id: "cof_silence_2b",
        title: "Zurückgelassen",
        reqStory: "path_silence_drill",
        text: "Du schaust aus dem Fenster. Unten auf dem Parkplatz stehen alle Kollegen und winken. Ein Feuerwehrauto fährt vor. Du hast den Feueralarm wegen deiner Noise-Cancelling-Kopfhörer (oder purer Ignoranz) überhört.",
        opts: [
            { 
                t: "Panisch runterrennen", 
                m: 10, f: -5, a: 10, c: 0, 
                r: "Du sprintest 5 Stockwerke runter. Unten angekommen bist du verschwitzt und außer Atem. Der Sicherheitsbeauftragte notiert deinen Namen: 'Zu spät. Im Ernstfall wären Sie jetzt knusprig.'" 
            },
            { 
                t: "Verstecken & hoffen", 
                m: 5, f: 5, a: -5, c: 20, 
                r: "Du duckst dich unter den Tisch. Wenn dich keiner sieht, warst du nie da. Du genießt die sturmfreie Bude, während draußen alle frieren." 
            }
        ]
    },
    {
        id: "cof_cookie_luck_1",
        title: "Der verwaiste Keks",
        text: "Neben der Zuckerdose liegt ein einzelner, verpackter Premium-Keks (Karamell-Kern). Keine Notiz, kein Besitzer in Sicht. Das Universum meint es gut mit dir.",
        opts: [
            { 
                t: "Sofort essen (Gier)", 
                next: "path_cookie_mystery", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Knister. Mampf. Der Zucker flutet dein Gehirn. Glückshormone kämpfen kurzzeitig gegen den Stress an. Weg ist er." 
            },
            { 
                t: "Einstecken für später", 
                next: "path_cookie_save", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Du lässt ihn in deine Tasche gleiten. Das Wissen, eine Not-Ration zu haben, beruhigt dich ungemein. Vorfreude ist die schönste Freude." 
            }
        ]
    },
    {
        id: "cof_cookie_2a",
        title: "Die Keks-Fee",
        reqStory: "path_cookie_mystery",
        text: "Du kommst zurück an deinen Platz... und da liegt *noch* einer! Mitten auf deiner Tastatur. Wieder Karamell-Kern. Wer macht das? Und warum?",
        opts: [
            { 
                t: "Nicht fragen, nur essen", 
                m: 5, f: 5, a: -20, c: 0, 
                r: "Einem geschenkten Gaul schaut man nicht ins Maul. Du isst den zweiten Keks. Du fühlst dich seltsam geliebt von einem unsichtbaren Wohltäter. Dein Stresslevel sinkt massiv." 
            },
            { 
                t: "Detektiv spielen", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du untersuchst die Verpackung auf Fingerabdrücke. Nichts. Die Ungewissheit macht dich wahnsinnig. War das der Chef? Oder doch nur die Putzkraft?" 
            }
        ]
    },
    {
        id: "cof_cookie_2b",
        title: "Der perfekte Moment",
        reqStory: "path_cookie_save",
        text: "Du hast deinen frischen Kaffee in der Hand. Er dampft. Da fällt dir der Keks in deiner Tasche ein. Du holst ihn raus. Die Schokolade ist durch deine Körperwärme leicht angeschmolzen.",
        opts: [
            { 
                t: "Eintunken & genießen", 
                m: 10, f: 5, a: -25, c: 0, 
                r: "Du tunkst den Keks kurz in den heißen Kaffee. Er schmilzt auf der Zunge. Eine Explosion aus Karamell und Röst-Aromen. Für einen Moment ist die Welt perfekt. (Aggro massiv gesenkt)" 
            },
            { 
                t: "Krümel-Topping basteln", 
                m: 5, f: 5, a: -15, c: 0, 
                r: "Du zerbröselst den Keks über den Milchschaum. Ein Gourmet-Kaffee 'Marke Eigenbau'. Du fühlst dich wie ein Barista-König." 
            }
        ]
    },
    {
        id: "cof_disaster_1",
        title: "OUT OF ORDER",
        text: "Du brauchst Koffein. Dringend. Aber auf dem Display der Maschine steht nur: 'ERROR 418 - I'm a teapot'. Deine Hände zittern bereits leicht.",
        opts: [
            { 
                t: "Dagegen treten (Wut)", 
                next: "path_machine_war", 
                m: 5, f: 0, a: 15, c: 0, 
                r: "BAM! Du trittst gegen das Gehäuse. Ein Schwall heißes Wasser läuft über deine Schuhe. Die Maschine piept wütend." 
            },
            { 
                t: "Reparieren", 
                req: "screw", 
                next: "path_machine_love", 
                m: 15, f: 0, a: -10, c: -5, 
                r: "Du schraubst die Verkleidung ab und fixierst den Schlauch. Die Maschine surrt dankbar! Der erste Schluck schmeckt nach Sieg (und etwas Kalk)." 
            },
            { 
                t: "Folie nutzen (Therapie)", 
                req: "bubble_wrap", 
                next: "path_machine_confused", 
                m: 10, f: 5, a: -15, c: 0, 
                r: "Du setzt dich auf den Boden und ploppst Folie, bis das Zittern aufhört. *Plopp. Plopp.* Kein Kaffee, aber zumindest kein Mord." 
            }
        ]
    },
    {
        id: "cof_disaster_2a",
        title: "Die Rache der Maschine",
        reqStory: "path_machine_war",
        text: "Du kommst zurück. Das Display leuchtet rot. Der Text läuft als Laufschrift durch, weil er so lang ist: 'ERROR 418.666.KICK_DETECTED.USER_BLACKLISTED.SELF_DEFENSE_MODE_ACTIVE.38472.DO_NOT_TOUCH'. Es riecht verbrannt.",
        opts: [
            { 
                t: "Vorsichtig nähern", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Die Maschine spuckt plötzlich kochenden Dampf aus. Sie hat auf dich gewartet! Du weichst zurück. Das Ding ist bösartig." 
            },
            { 
                t: "Stecker ziehen (den Krieg beenden)", 
                m: 5, f: 0, a: 5, c: 10, 
                r: "Du ziehst den Stecker. Das rote Licht erlischt langsam wie das Auge von HAL 9000. Du hast gewonnen... vorerst." 
            }
        ]
    },
    {
        id: "cof_disaster_2b",
        title: "System Overload",
        reqStory: "path_machine_love",
        text: "Die Maschine blinkt wild in allen Farben. Fehlercode: 'ERROR 200.OK.BUT.HEARTBEAT.OVERFLOW.999999.USER_IS_MY_HERO.CALC_LOVE.DIV_BY_ZERO'. Sie scheint so aufgeregt über deine Rückkehr zu sein, dass sie abstürzt.",
        opts: [
            { 
                t: "Gut zureden: 'Ganz ruhig, Brauner'", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du streichelst das Gehäuse. Das Blinken wird langsamer. Sie braut dir einen 'Special Espresso' mit doppelter Crema. Schmeckt nach Zuneigung." 
            },
            { 
                t: "Einmal fest draufhauen (Reset)", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Alte Schule. Die Maschine ist beleidigt und geht zurück auf Standard-Einstellungen. Der Kaffee ist okay, aber die Magie ist weg." 
            }
        ]
    },
    {
        id: "cof_disaster_2c",
        title: "Philosophischer Fehler",
        reqStory: "path_machine_confused",
        text: "Das Display zeigt jetzt Zahlenkolonnen: 'ERROR 503.PLOPP.UNDEFINED.WHAT_IS_PURPOSE.BUBBLE_LOGIC_EXCEPTION.7463.8291.000'. Die Maschine versucht anscheinend, den Sinn deiner Bubble-Wrap-Aktion zu berechnen.",
        opts: [
            { 
                t: "Nochmal ploppen (Dialog)", 
                req: "bubble_wrap", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du ploppst eine Blase. Die Maschine piept einmal. Du ploppst nochmal. Sie piept zweimal. Ihr habt eine Ebene der Verständigung gefunden." 
            },
            { 
                t: "Ignorieren", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Du lässt sie rechnen. Soll sie doch Pi berechnen, solange sie irgendwann wieder Kaffee gibt." 
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
        text: "Du hörst ein hektisches Rascheln. Bernd (Logistik) steht gebückt vor dem Vorratsschrank. Seine Anzugtaschen beulen sich verdächtig aus. Er schwitzt. 'Psst! Die da oben wollen rationalisieren! Der Great Reset kommt! Ich sichere das weiße Gold!' Er starrt dich irre an. 'Bist du dabei oder bist du ein Schaf?'",
        opts: [
            { 
                t: "Investieren: 'Gib mir 20 Prozent!'", 
                loot: "sugar_packets", 
                next: "path_sugar_junkie", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "Bernd grinst breit (ein Goldzahn blitzt auf). 'Guter Mann. Diversifizierung ist alles.' Er schaufelt dir drei Handvoll Päckchen in die Tasche. Ihr nickt euch verschwörerisch zu. Das Kartell steht." 
            },
            { 
                t: "Drohen: 'Ich sags dem Chef'", 
                next: "path_sugar_embargo", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Bernds Augen verengen sich zu Schlitzen. 'Du wirst es bereuen. Wenn die Krise kommt, kommst du angekrochen!' Er verschwindet im Schatten des Kopierraums. Du hast dir einen mächtigen Feind gemacht." 
            },
            { 
                t: "Geschäftsmäßig: 'Was kostet das Gramm?'", 
                next: "path_sugar_dealer", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Bernd zieht einen Taschenrechner. 'Tagespreis schwankt. Aber für dich... Tausch gegen Tackerklammern?' Ihr verhandelt kurz. Du lässt ihn gewähren." 
            }
        ]
    },
    {
        id: "cof_sugar_2a",
        title: "Der Margin Call",
        reqStory: "path_sugar_junkie",
        text: "Bernd fängt dich ab. Er vibriert förmlich. Seine Pupillen sind riesig, überall an seinem Mund kleben weiße Krümel. 'Der Markt ist gecrasht! Ich hab alles selbst verbraucht! Ich brauche meine Einlage zurück! Hast du den Stoff?!'",
        opts: [
            { 
                t: "Ihm den Zucker zurückgeben", 
                req: "sugar_packets", 
                m: 5, f: 0, a: -10, c: 0, 
                r: "Du gibst ihm die Päckchen. Er reißt drei gleichzeitig auf und kippt sie sich pur in den Rachen. 'Ohhh ja... Mama ist zuhause.' Er wird sofort ruhig und sinkt an der Wand herunter. Krise abgewendet." 
            },
            { 
                t: "Den Preis hochtreiben", 
                m: 10, f: 0, a: 15, c: 0, 
                r: "'Angebot und Nachfrage, Bernd.' Du verlangst seine Bürostuhl-Armlehnen im Tausch. Er wimmert, stimmt aber zu. Du bist jetzt der neue Baron." 
            }
        ]
    },
    {
        id: "cof_sugar_2b",
        title: "Das Embargo",
        reqStory: "path_sugar_embargo",
        text: "Du willst Kaffee. Aber die Zuckerdose ist leer. Stattdessen klebt ein Zettel daran: 'Wegen Lieferkettenproblemen temporär außer Betrieb. Gez. Bernd'. Bernd sitzt drei Tische weiter auf einem Thron aus Kopierpapier und grinst dich böse an.",
        opts: [
            { 
                t: "Kapitulieren & betteln", 
                m: 5, f: -10, a: 20, c: 0, 
                r: "Du kriechst zu Kreuze. 'Bitte, Bernd. Nur ein Löffel.' Er schnippt dir ein einzelnes Krümelchen zu. 'Das macht dann 5 Euro Bearbeitungsgebühr.' Es ist demütigend." 
            },
            { 
                t: "Den Bunker stürmen", 
                m: 10, f: 0, a: -5, c: 10, 
                r: "Du stürzt dich auf seinen Papierturm. Bernd quietscht. Zuckerpäckchen regnen wie Konfetti durch das Büro. Die Kollegen jubeln und plündern mit. Die Revolution war erfolgreich!" 
            }
        ]
    },
    {
        id: "cof_sugar_2c",
        title: "Schwarzmarkt",
        reqStory: "path_sugar_dealer",
        text: "Im Flur herrscht reges Treiben. Bernd hat einen kleinen Stand aufgebaut. Er verkauft Zucker gegen Kugelschreiber, Post-its und Kantinen-Gutscheine. Das Geschäft brummt.",
        opts: [
            { 
                t: "Den Chef informieren (Whistleblower)", 
                m: 5, f: 0, a: 10, c: 10, 
                r: "Der Chef kommt, sieht das Geschäft... und kauft selbst zwei Päckchen für sein Meeting. 'Aus der Portokasse, Bernd.' Du hast den Glauben an das System verloren." 
            },
            { 
                t: "Als Sicherheitsdienst anheuern", 
                m: 10, f: 10, a: -10, c: 0, 
                r: "Du verschränkst die Arme und schaust böse, damit niemand klaut. Bernd beteiligt dich am Gewinn (zwei Textmarker). Ein lukrativer Nebenjob." 
            }
        ]
    },
    {
        id: "cof_mold_1",
        title: "Kühlschrank-Exkursion",
        text: "Ganz hinten im Kühlschrank steht ein Joghurt. Das Verfallsdatum ist 'Mai 2012'. Er pulsiert leicht in neon-grün. Als du dich näherst, formen sich auf der Oberfläche pelzige Buchstaben: 'H...U...N...G...E...R'.",
        opts: [
            { 
                t: "Zuckerpäckchen opfern (Füttern)", 
                next: "path_mold_ally", 
                m: 5, f: -5, a: -10, c: 0, 
                r: "Du streust Zucker hinein. Der Pilz absorbiert ihn glücklich und rülpst leise. Eine piepsige Stimme in deinem Kopf sagt: 'WIR DIENEN DEM MEISTER.' Du hast jetzt einen ekligen Freund." 
            },
            { 
                t: "Mit Desinfektionsmittel angreifen", 
                next: "path_mold_war", 
                m: 10, f: 5, a: 15, c: 0, 
                r: "Du sprühst Sagrotan. Der Pilz zischt aggressiv wie eine Katze! Er zieht sich zurück, aber du hörst ihn im Abfluss kichern. Das ist noch nicht vorbei." 
            },
            { 
                t: "Tür schnell zuwerfen (Flucht)", 
                next: "path_mold_civ", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Aus den Augen, aus dem Sinn. Du klebst einen Zettel 'DEFEKT' an den Kühlschrank. Soll sich die Nachtschicht mit der neuen Lebensform rumschlagen." 
            }
        ]
    },
    {
        id: "cof_mold_2a",
        title: "Die Symbiose",
        reqStory: "path_mold_ally",
        text: "Du öffnest den Kühlschrank wieder. Der Joghurt ist gewachsen. 'MEISTER', piepst es. 'DER FEIND (CHEF) HAT SEIN SANDWICH HIER GELAGERT. SOLLEN WIR ES... GESCHMACKLICH OPTIMIEREN?'",
        opts: [
            { 
                t: "Befehl geben: 'Zugriff!'", 
                m: 5, f: 10, a: -20, c: 20, 
                r: "Der Pilz wubbelt fröhlich rüber zum Sandwich. Später hörst du den Chef brüllen: 'Warum schmeckt mein Brot nach Blaubeere und Rache?!'. Du grinst böse." 
            },
            { 
                t: "Ablehnen: 'Frieden bewahren'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "'WIE DU WÜNSCHST.' Der Pilz wirkt enttäuscht, formt aber ein Herzchen für dich. Es ist süß, aber auch extrem widerlich." 
            }
        ]
    },
    {
        id: "cof_mold_2b",
        title: "Sporen-Alarm",
        reqStory: "path_mold_war",
        text: "Du willst dir Milch holen, aber der Joghurt hat eine Falle gebaut! Sobald das Licht angeht, schießt eine Wolke grüner Sporen direkt in dein Gesicht. Er verteidigt sein Territorium!",
        opts: [
            { 
                t: "Husten & Weinen", 
                m: 10, f: -5, a: 20, c: 0, 
                r: "Du hustest dir die Seele aus dem Leib. Deine Augen brennen. Der Joghurt scheint höhnisch zu lachen. Du hast den Kampf gegen eine Molkerei-Produk verloren." 
            },
            { 
                t: "Flammenwerfer (Deo + Feuerzeug)", 
                m: 5, f: -5, a: -10, c: 10, 
                r: "Du brennst das Fach aus. Es stinkt bestialisch, aber der Feind ist vernichtet. Der Hausmeister wird Fragen stellen, aber du hast gesiegt." 
            }
        ]
    },
    {
        id: "cof_mold_2c",
        title: "Die Zivilisation",
        reqStory: "path_mold_civ",
        text: "Du wagst einen Blick. Im Gemüsefach hat sich was getan. Der Pilz hat kleine Häuser aus altem Käse gebaut. Winzige Pilz-Männchen reiten auf Kakerlaken. Sie haben das Rad erfunden.",
        opts: [
            { 
                t: "Gott spielen (Licht an/aus)", 
                m: 20, f: 0, a: -15, c: 0, 
                r: "Du machst das Kühlschranklicht an und aus. Die kleinen Wesen fallen auf die Knie und beten dich an. 'DER LICHTBRINGER!'. Das tut deinem Ego gut." 
            },
            { 
                t: "Alles in den Müll schieben", 
                m: 5, f: -5, a: 5, c: 0, 
                r: "Du beendest die Geschichte brutal mit einem Müllbeutel. Ein ganzes Universum, vernichtet in Sekunden. Du fühlst dich kurz schlecht, dann holst du dir deine Milch." 
            }
        ]
    },
    {
        id: "cof_catering_1",
        title: "Die Reste der Macht",
        text: "Das Meeting der Geschäftsleitung ist vorbei. Auf dem Mahagoni-Tisch stehen die Reste. Lachs-Brötchen, Kaviar-Häppchen, Premium-Kaffee. Niemand ist zu sehen.",
        opts: [
            { 
                t: "Aufräumen (Pflichtbewusst)", 
                next: "path_cat_cleanup", 
                m: 15, f: -15, a: 5, c: -5, 
                r: "Du räumst Teller weg. Dabei findest du unter dem Stuhl des Chefs einen Zettel: 'TOP SECRET: Liste der Mitarbeiter, die wir feuern wollen'. Dein Name steht nicht drauf... noch nicht." 
            },
            { 
                t: "Gierig alles aufessen", 
                next: "path_cat_eat", 
                m: 10, f: 15, a: -15, c: 0, 
                r: "Du stopfst dich voll wie ein Hamster. Lachs, Trauben, Käse. Du fühlst dich wie ein König. Leider hast du jetzt einen fetten Remouladen-Fleck auf dem Hemd." 
            },
            { 
                t: "Nur den Kaffee klauen", 
                next: "path_cat_gossip", 
                m: 5, f: -10, a: -5, c: 0, 
                r: "Du füllst deinen Becher mit dem guten 'Arabica Gold'. Sabine vom Empfang fängt dich an der Tür ab. Sie grinst wissend. Sie hat dich gesehen." 
            }
        ]
    },
    {
        id: "cof_catering_2a",
        title: "Heikle Informationen",
        reqStory: "path_cat_cleanup",
        text: "Der Chef kommt hektisch zurück. Er sucht genau diesen Zettel. Er sieht dich an, Panik in den Augen. 'Müller! Haben Sie hier... Papierkram gesehen?'",
        opts: [
            { 
                t: "Ehrlich: 'Hier ist er, Chef.'", 
                m: 5, f: 0, a: 15, c: 10, 
                r: "Er reißt ihn dir aus der Hand. Statt Dankbarkeit siehst du Kälte. Er weiß jetzt, dass DU Bescheid weißt. 'Vergessen Sie das. Sofort.' Du stehst jetzt auf seiner Beobachtungsliste." 
            },
            { 
                t: "Wahnsinn: Zettel essen", 
                m: 5, f: 5, a: -20, c: -20, 
                r: "Du starrst ihm in die Augen, steckst das Papier in den Mund und schluckst es runter. 'Ich habe nichts gesehen, Chef.' Er nickt langsam, tief beeindruckt. 'Guter Mann. Loyalität schmeckt bitter, was?'" 
            }
        ]
    },
    {
        id: "cof_catering_2b",
        title: "Beweislast",
        reqStory: "path_cat_eat",
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
            }
        ]
    },
    {
        id: "cof_catering_2c",
        title: "Ein 'kleiner' Gefallen",
        reqStory: "path_cat_gossip",
        text: "Sabine blockiert den Weg. 'Ich verrate dich nicht wegen dem Kaffee... aber mein Drucker macht so komische Geräusche. Kannst du mal *ganz kurz* gucken? Bitte!'",
        opts: [
            { 
                t: "Nett sein (Erpressung akzeptieren)", 
                m: 45, f: -15, a: 25, c: -15, 
                r: "Klassischer Fehler. Es war nicht der Drucker, es war der Treiber. Und das Netzwerk. Du bist 45 Minuten gefangen. Sabine erzählt dir dabei ihre ganze Lebensgeschichte. Du hasst dich selbst." 
            },
            { 
                t: "Ablenken: 'Oh Gott! Ist das eine Spinne?!'", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du zeigst panisch hinter sie. Sabine kreischt und springt zur Seite. Du nutzt das Chaos und rennst weg. Nicht elegant, aber effektiv." 
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
	{
        id: "cof_lore_2c",
        title: "Gerüchteküche",
        reqStory: "path_lore_ignore",
        text: "Du triffst Kevin in der Küche. Er grinst breit und wedelt mit einem Aktenordner. 'Rate mal, was ich im Serverraum gefunden habe? Die HR-Liste! Ich werde alle erpressen!'",
        opts: [
            { 
                t: "Ihn warnen", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "'Kevin, HR sucht danach. Verbrenn das.' Er wird bleich. 'Oh... danke, Bro.' Er rennt zum Schredder." 
            },
            { 
                t: "Ihn beim Chef verpfeifen", 
                m: 10, f: -5, a: -5, c: -15, 
                r: "Du rufst Dr. Wichtig an. Kurz darauf wird Kevin von zwei Sicherheitsleuten abgeführt. Dein Standing beim Chef ist gestiegen." 
            },
            { 
                t: "Ignorieren", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Nicht dein Problem. 10 Minuten später hörst du Schreie aus dem HR-Büro. Tja." 
            }
        ]
    },
    ],

// === SIDE QUESTS ===
    sidequests: [
        // --- TEXT QUESTS ---
    {
        id: "sq_toilet_1",
        kind: "text",
        title: "Mission: Porzellan",
        text: "Deine Blase meldet 'Füllstand: 110%'. Du hast es eilig. Doch zwischen dir und der erlösenden Keramik steht Björn, der Marketing-Leiter. Er scannt den Flur wie ein Raubtier auf der Suche nach einem Opfer für ein 'spontanes Brainstorming'.",
        opts: [
            { 
                t: "Ablenkung: 'HINTER DIR! ELON MUSK!'", 
                next: "path_toilet_lie", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du brüllst und zeigst in die andere Richtung. Björn wirbelt herum: 'Wo?! Der Disruptor?!'. Du nutzt die Sekunde und sprintest in die Kabine. Knapp, aber erfolgreich." 
            },
            { 
                t: "Ergeben: Blickkontakt herstellen", 
                next: "path_toilet_pastel", 
                m: 60, f: -20, a: 30, c: -10, 
                r: "Anfängerfehler! Er hakt dich sofort unter: 'Ah, Müller! Perfekt! Wir brauchen dein Tech-Mindset zu den neuen Pastellfarben für das Logo!' Du sitzt 60 Minuten im Meeting. Deine Blase platzt fast. Hölle auf Erden." 
            },
            { 
                t: "Aggressiv durchrennen", 
                m: 2, f: 0, a: 10, c: 5, 
                r: "Du rempelst ihn fast um. 'PLATZ DA! BIO-NOTFALL!' Björn starrt dir entsetzt hinterher. 'Kein Flow, der Typ...', murmelt er. Unhöflich, aber effektiv." 
            }
        ]
    },
    {
        id: "sq_toilet_2a",
        kind: "text",
        title: "Meeting: 'Color of Success'",
        reqStory: "path_toilet_pastel",
        text: "Björn hat dich wieder eingeladen. Da du beim letzten Mal nicht weggelaufen bist, hält er dich für interessiert. 'So, IT-Brain! Welche Farbe passt besser zum Serverraum-Feng-Shui? 'Soft Salmon' oder 'Baby Breath Blue'?' Alle starren dich erwartungsvoll an.",
        opts: [
            { 
                t: "Ironisch: 'Vantablack. Wie meine Seele.'", 
                m: 10, f: 5, a: -5, c: 0, 
                r: "Björn notiert eifrig: 'Oh, Edgy! Dark Mode für Wände! Genial!' Sie lieben es. Du bist jetzt der 'Chief Visionary Officer' wider Willen." 
            },
            { 
                t: "Technisch: 'Blau kühlt die Hardware'", 
                m: 30, f: -10, a: 10, c: 0, 
                r: "Du hältst einen Vortrag über Thermodynamik. Nach 30 Minuten schlafen alle. Du hast sie zu Tode gelangweilt. Sieg durch Monotonie." 
            }
        ]
    },
    {
        id: "sq_toilet_2b",
        kind: "text",
        title: "Der Fehlalarm",
        reqStory: "path_toilet_lie",
        text: "Hausmeister Egon steht mit einem Werkzeugkasten vor dir. 'Björn sagte, hier war ein Promi? Oder ein Feuer? Er hat was von 'heißer Luft' geredet. Ich soll die Lüftung checken.'",
        opts: [
            { 
                t: "Lügen: 'War nur ein Test.'", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Egon zuckt mit den Schultern. 'Mir egal, ich werde stündlich bezahlt.' Er setzt sich hin und macht Pause. Du hast einen Verbündeten." 
            },
            { 
                t: "Wahrheit: 'Ich musste aufs Klo.'", 
                m: 10, f: 0, a: 5, c: 0, 
                r: "Egon lacht dreckig. 'Guter Trick. Muss ich mir merken.' Er erzählt es aber weiter. Dein Ruf als 'Lügner' steigt." 
            }
        ]
    },
    {
        id: "sq_cake_1",
        kind: "text",
        title: "Der Kuchen-Krieg",
        text: "Ein unbekannter Held hat Geburtstagskuchen spendiert. Mächtige Schoko-Sahne-Torte! Doch Chantal (Marketing) blockiert den Zugang und hält einen Monolog über ihre neue 'Low-Carb-High-Sadness'-Diät. Im Hintergrund lauern schon hungrige Kollegen.",
        opts: [
            { 
                t: "Ninja-Move: Kuchen schnappen & flüchten", 
                next: "path_cake_sugar", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Zack! Während Chantal Luft holt, greifst du dir ein riesiges Stück mit der bloßen Hand und verschwindest im Serverraum. Die Sahne klebt überall, aber der Zucker-Rush setzt sofort ein." 
            },
            { 
                t: "Höflich warten & zuhören", 
                next: "path_cake_crumb", 
                m: 30, f: -5, a: 20, c: 0, 
                r: "Schwerer Fehler. Während Chantal über Kalorien referiert, fällt der Vertrieb wie ein Heuschreckenschwarm über das Blech her. Als sie fertig ist, ist das Blech blankgeputzt. Du stehst vor dem Nichts." 
            },
            { 
                t: "Dominanz: Das letzte Stück vor dem Chef essen", 
                next: "path_cake_boss", 
                m: 5, f: 10, a: 5, c: 25, 
                r: "Du schiebst dir das letzte Stück genüsslich in den Mund, genau als der Chef danach greift. Er greift ins Leere. Er starrt auf deine schokolierten Lippen, sein Gesicht läuft dunkelrot an. Er flüstert: 'Das war meins...'" 
            }
        ]
    },
    {
        id: "sq_cake_2a",
        kind: "text",
        title: "Der Zucker-Trip",
        reqStory: "path_cake_sugar",
        text: "Du sitzt am Platz. Das war zu viel Zucker auf leeren Magen. Deine Pupillen vibrieren. Du siehst plötzlich den Matrix-Code auf deinem Bildschirm. Die Excel-Tabelle spricht zu dir: 'Füttere mich mit Daten!'",
        opts: [
            { 
                t: "Die Welle reiten (Arbeiten)", 
                m: 60, f: -30, a: -10, c: 0, 
                r: "Du tippst mit Lichtgeschwindigkeit. Deine Hände sind nur noch Schemen. Du hast Arbeit für drei Wochen in einer Stunde erledigt. Leider ist alles in Wingdings-Schriftart. Egal, es fühlte sich gut an." 
            },
            { 
                t: "Unter den Tisch legen (Crash)", 
                m: 30, f: 20, a: 10, c: 10, 
                r: "Der Absturz kommt hart. Du rollst dich unter dem Schreibtisch zusammen und wimmerst leise. Kevin findet dich und denkt, du bist tot. Er stiehlt deinen Bürostuhl." 
            }
        ]
    },
    {
        id: "sq_cake_2b",
        kind: "text",
        title: "Das Krümel-Monster",
        reqStory: "path_cake_crumb",
        text: "Der Hunger treibt dich in den Wahnsinn. Du bist allein in der Küche. Auf dem leeren Kuchenblech kleben noch Reste von Sahne und Schokostreuseln. Niemand ist zu sehen...",
        opts: [
            { 
                t: "Das Blech ablecken (Würdeverlust)", 
                m: 5, f: 5, a: -10, c: 10, 
                r: "Du leckst gierig über das Metall. Plötzlich geht das Licht an. Der Großkunde aus Japan steht mit dem Chef in der Tür. Sie starren dich an. Du hast Sahne an der Nase. Der Chef sagt leise: 'Wir finden allein raus.'" 
            },
            { 
                t: "Einen alten Keks aus der Ritze essen", 
                m: 2, f: 0, a: 5, c: 0, 
                r: "Du findest einen 'Prinzenrolle'-Keks hinter der Mikrowelle. Er ist weich. Er schmeckt nach Staub und Zwiebeln. Du würgst ihn runter. Der Tiefpunkt ist erreicht." 
            }
        ]
    },
    {
        id: "sq_cake_2c",
        kind: "text",
        title: "Das Back-Mandat",
        reqStory: "path_cake_boss",
        text: "Der Chef zitiert dich ins Büro. Er wirkt ruhig, zu ruhig. 'Müller. Sie haben mir eine strategische Ressource (Kuchen) entzogen. Ich fordere Restitution. Sie werden morgen für das Board-Meeting backen. Und wehe, es ist Fertigmischung!'",
        opts: [
            { 
                t: "Trotz: 'Ich kann nur Rührei.'", 
                m: 5, f: 0, a: 10, c: 10, 
                r: "Der Chef grinst böse. 'Dann lernen Sie es. Youtube existiert. Wenn dieser Kuchen nicht schmeckt, streiche ich Ihren Urlaub.' Der Druck ist unmenschlich." 
            },
            { 
                t: "Lügen: 'Ich bin Hobby-Konditor!'", 
                m: 10, f: 5, a: -5, c: 0, 
                r: "Du kaufst beim Bäcker eine Torte, nimmst sie aus der Schachtel und streust Mehl drauf, damit es 'selbstgemacht' aussieht. Der Chef liebt es. 'Müller, Sie haben Talente!' (Kosten: 30€, aber Job gerettet)." 
            }
        ]
    },
    {
        id: "sq_fire_1",
        kind: "text",
        title: "Alarmstufe Popcorn",
        text: "WUUUP! WUUUP! Die Sirene brüllt. Es riecht nicht nach Inferno, sondern eindeutig nach verbranntem 'Salty Caramel'-Popcorn aus der Teeküche. Die Kollegen rennen panisch zum Sammelplatz.",
        opts: [
            { 
                t: "HELDENTAT: Küche stürmen!", 
                req: "fire_ext", 
                next: "path_fire_hero", 
                m: 5, f: -20, a: -20, c: -10, 
                r: "Du trittst die Küchentür ein, entsicherst den Löscher und brüllst: 'FIRE IN THE HOLE!' Eine gewaltige weiße Wolke hüllt die qualmende Mikrowelle (und das halbe Stockwerk) ein." 
            },
            { 
                t: "Die Gunst der Stunde nutzen: Plündern", 
                next: "path_fire_loot", 
                m: 10, f: 15, a: -10, c: 5, 
                r: "Während alle zu den Notausgängen stürmen, schleichst du in den verlassenen Konferenzraum. Du klaust die 'Guten Kekse' (die mit Schokolade) und verschwindest ungesehen. Chaos ist eine Leiter." 
            },
            { 
                t: "Pflichtbewusst evakuieren", 
                next: "path_fire_rain", 
                m: 45, f: -10, a: 10, c: -5, 
                r: "Du folgst den grünen Schildern. Draußen regnet es quer. Du stehst 45 Minuten frierend auf dem Parkplatz, während die Feuerwehr feststellt, dass es nur Popcorn war." 
            }
        ]
    },
    {
        id: "sq_fire_2a",
        kind: "text",
        title: "Schneegestöber",
        reqStory: "path_fire_hero",
        text: "Der Rauch ist weg. Dafür ist die Küche jetzt komplett weiß gepudert. Hausmeister Egon steht in der Tür und wischt mit dem Finger über den staubigen Tisch. Er sieht dich vernichtend an.",
        opts: [
            { 
                t: "Stolz: 'Gefahr neutralisiert!'", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "'Das war eine Tüte Popcorn, Rambo!' Egon drückt dir einen Besen in die Hand. 'Du gehst hier nicht weg, bis das sauber ist.' Dein Heldenstatus bröckelt beim Fegen." 
            },
            { 
                t: "Flüchten: 'Hust, der Rauch...'", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du täuschst eine Rauchvergiftung vor und wankst davon. Egon flucht hinter dir her. Er wird sich rächen (wahrscheinlich klemmt morgen dein Bürostuhl)." 
            }
        ]
    },
    {
        id: "sq_fire_2b",
        kind: "text",
        title: "Süße Beute",
        reqStory: "path_fire_loot",
        text: "Der Alarm ist vorbei. Du sitzt am Platz und mampfst die gestohlenen Kekse. Plötzlich kommt eine Rundmail vom Chefsekretariat: 'Wer hat während der Evakuierung das Catering für den Aufsichtsrat gestohlen?! Wir sichten die Kameras!'",
        opts: [
            { 
                t: "Kekse schnell aufessen (Beweise vernichten)", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "Du stopfst dir drei Kekse gleichzeitig in den Mund. Du verschluckst dich fast, aber die Beweise sind weg. Dein Magen rebelliert, dein Gewissen ist im Zuckerkoma." 
            },
            { 
                t: "Packung bei Kevin unterschieben", 
                m: 5, f: 0, a: -5, c: 5, 
                r: "Du legst die leere Packung auf Kevins Tisch. Kurz darauf hörst du Schreie aus seinem Büro. Das war böse. Sehr böse. Aber effektiv." 
            }
        ]
    },
    {
        id: "sq_fire_2c",
        kind: "text",
        title: "Networking im Nieselregen",
        reqStory: "path_fire_rain",
        text: "Draußen auf dem Parkplatz stehst du direkt neben Dr. Wichtig. Er friert im Hemd und zittert. Er hat dich bemerkt. Es gibt kein Entkommen vor dem Smalltalk.",
        opts: [
            { 
                t: "Jacke anbieten (Schleimen)", 
                m: 10, f: -5, a: 10, c: -15, 
                r: "Du gibst ihm deine Jacke. Er nimmt sie dankbar an. 'Guter Mann, Müller.' Du frierst dir den Hintern ab und bist morgen garantiert krank, aber du hast Bonuspunkte gesammelt." 
            },
            { 
                t: "Witz machen: 'Schönes Wetter heute!'", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Er starrt dich an, als wärst du irre. Wasser tropft von seiner Nase. 'Sehr witzig.' Er dreht sich weg. Das war unangenehm." 
            }
        ]
    },
{
        id: "sq_usb_1",
        kind: "text",
        title: "Fundsache",
        text: "Auf dem Flur liegt ein USB-Stick mit der Aufschrift 'GEHEIM' und einem Totenkopf-Sticker. Er liegt genau im toten Winkel der Überwachungskamera.",
        opts: [
            { 
                t: "Sofort einstecken (Heimlich)", 
                loot: "usb_stick", 
                next: "path_usb_keep", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Mit einer fließenden Bewegung lässt du den Stick in deiner Tasche verschwinden. Niemand hat es gesehen. Er gehört jetzt dir. Aber was ist drauf? (Inventar +1)" 
            },
            { 
                t: "Am Empfang abgeben (Pflicht)", 
                next: "path_usb_gabi_fail", 
                m: 10, f: -5, a: 0, c: -5, 
                r: "Du bringst ihn zu Gabi. 'Oh, danke! 'Geheim'? Spannend! Ich guck mal schnell rein, wem der gehört, bevor ich ihn ins Fundbüro lege...'" 
            },
            { 
                t: "In den Müll kicken", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Ein gezielter Tritt befördert das Sicherheitsrisiko unter den Getränkeautomaten. Aus den Augen, aus dem Sinn." 
            }
        ]
    },
    {
        id: "sq_usb_2a",
        kind: "text",
        title: "Die Büchse der Pandora",
        reqStory: "path_usb_keep",
        text: "Du sitzt an deinem Platz und drehst den Stick in den Fingern. Die Aufschrift 'GEHEIM' brennt förmlich. Ist es die Kündigungsliste? Bitcoins? Oder nur Müll?",
        opts: [
            { 
                t: "Anschließen & Risikieren", 
                m: 15, f: 5, a: -5, c: 10, 
                r: "Die Neugier siegt. Du öffnest den Ordner. Es sind... 500 Seiten Fan-Fiction über Vampire, geschrieben von Dr. Wichtig?! 'Der Graf biss in den Hals der Buchhalterin.' Du hast jetzt mächtiges Erpressungsmaterial." 
            },
            { 
                t: "Formatieren & Behalten", 
                rem: "usb_stick", 
                m: 5, f: 0, a: 0, c: 0, 
                r: "Sicher ist sicher. Du löschst alles unwiederbringlich. Jetzt hast du einen leeren 64GB Stick für deine Urlaubsfotos. Langweilig, aber nützlich. (Item entfernt, Stick 'genutzt')" 
            }
        ]
    },
    {
        id: "sq_usb_2b",
        kind: "text",
        title: "Gabis Fehler",
        reqStory: "path_usb_gabi_fail",
        text: "Zehn Minuten später winkt dich Gabi hektisch zu sich. Sie ist kreidebleich. Aus ihren Lautsprechern dröhnt russische Techno-Musik. Auf dem Bildschirm tanzen halbnackte Skelette. 'Ich hab nur auf 'Rechnung.exe' geklickt! Mach das weg, bevor der Chef kommt!'",
        opts: [
            { 
                t: "Helfen: Stecker ziehen", 
                m: 5, f: -5, a: 10, c: 0, 
                r: "Du kriechst unter den Tisch und reißt das Stromkabel raus. Die Musik stirbt. Gabi atmet schwer. 'Das bleibt unter uns, okay? Hier, nimm einen Keks.'" 
            },
            { 
                t: "Lachen & Weggehen", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "'Tja, IT-Sicherheitsschulung geschwänzt, Gabi?' Du lässt sie mit dem Techno-Problem allein. Sie wird dich dafür hassen, aber es sieht extrem lustig aus." 
            }
        ]
    },
    {
        id: "sq_printer_1",
        kind: "text",
        title: "PC LOAD LETTER",
        text: "Der Abteilungsdrucker blinkt panisch rot. Das Display meldet: 'SCHWERER PAPIERSTAU IN FACH 2'. Du öffnest Fach 2 – es ist leer. Gleichzeitig klingelt das Fax-Modul schrill wie ein altes Telefon, und aus dem Lautsprecher plärrt eine verzerrte Stimme: 'HALLO?! HÖREN SIE MICH?! ICH WILL MEINE ERBSEN!'",
        opts: [
            { 
                t: "Logik: Cyan nachfüllen (gegen Papierstau)", 
                next: "path_printer_leasing", 
                m: 10, f: -5, a: 5, c: 0, 
                r: "Du folgst der Drucker-Logik: Wenn er 'Papier' sagt, meint er 'Cyan'. Du fummelst eine Kartusche rein, die du im Schrank gefunden hast. Das Blinken hört auf. Vorerst." 
            },
            { 
                t: "Hörer abnehmen (Fax antworten)", 
                next: "path_printer_call", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du drückst die grüne Taste. 'Hier ist Müller?' - 'WER? ICH WILL DEN BOFROST-MANN!' Der Drucker fängt plötzlich an, ratternde Geräusche zu machen, als würde er das Gespräch verdauen." 
            },
            { 
                t: "Percussive Maintenance (Draufhauen)", 
                req: "hammer", 
                next: "path_printer_smash", 
                m: 2, f: 0, a: -20, c: 10, 
                r: "BÄM! Du gibst dem Leasing-Gerät einen massiven Kinnhaken mit dem Hammer. Das Klingeln hört auf. Plastik splittert. Das Display wird schwarz. Endlich Ruhe." 
            }
        ]
    },
    {
        id: "sq_printer_2a",
        kind: "text",
        title: "Die Leasing-Inquisition",
        reqStory: "path_printer_leasing",
        text: "Ein Mann in grauem Kittel steht vor dem Drucker. Auf seinem Rücken steht 'Print & Pray Solutions'. Er hält die Cyan-Kartusche hoch wie ein Beweisstück in einem Mordprozess. 'Wer hat diese nicht-zertifizierte Fremdtinte installiert? Das ist ein Verstoß gegen Paragraf 128 des Leasingvertrags. Ich muss das Gerät stilllegen.'",
        opts: [
            { 
                t: "Bestechen: 'Nehmen Sie den alten Toner?'", 
                m: 5, f: 0, a: 5, c: -5, 
                r: "Er schnüffelt an der alten Kartusche. 'Ist das Original HP High-Yield? ... Na gut. Ich drücke ein Auge zu. Aber drucken Sie nie wieder PDFs, das mag er nicht.'" 
            },
            { 
                t: "Ihn machen lassen (Stilllegung)", 
                m: 20, f: 10, a: -5, c: 10, 
                r: "Er rollt den Drucker auf einer Sackkarre weg. 'Ersatz kommt in 6-8 Wochen aus Übersee.' Die Kollegen starren dich an. Du hast das Drucken abgeschafft. Eigentlich ein Sieg für die Umwelt." 
            }
        ]
    },
    {
        id: "sq_printer_2b",
        kind: "text",
        title: "Der Papier-Tsunami",
        reqStory: "path_printer_call",
        text: "Du kommst zurück in den Flur. Der Boden ist bedeckt mit Papier. Der Drucker läuft auf Hochtouren und druckt unaufhörlich schwarze Seiten voller Nullen und Einsen. Er versucht offenbar, das Telefonat von vorhin zu transkribieren. Der Papierstapel erreicht bald die Decke.",
        opts: [
            { 
                t: "Stecker ziehen", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du killst den Strom. Der Drucker gibt ein letztes, trauriges Piepen von sich. Du stehst knöcheltief im Müll. Es ist vorbei." 
            },
            { 
                t: "Papier als Notizblöcke verteilen", 
                m: 15, f: -5, a: -5, c: 0, 
                r: "Recycling! Du bindest die Fehlprints zu Blöcken ('Matrix-Edition') und verteilst sie im Büro. Die Kollegen freuen sich über Gratis-Material. Kreative Problemlösung." 
            }
        ]
    },
    {
        id: "sq_printer_2c",
        kind: "text",
        title: "Das Smart-Upgrade",
        reqStory: "path_printer_smash",
        text: "An der Stelle des alten Druckers steht nun ein glänzendes, futuristisches Gerät: Der 'PrintHub 360 AI'. Er hat keine Knöpfe, nur einen riesigen Touchscreen. Darauf steht: 'Um zu drucken, schließen Sie bitte ein Abo ab. 19,99€ pro Seite (Schwarzweiß).'",
        opts: [
            { 
                t: "Abo abschließen (Firmenkarte)", 
                m: 10, f: 0, a: 10, c: 20, 
                r: "Du buchst das 'Platinum-Enterprise-Paket'. Der Chef sieht die Abbuchung auf seinem Handy und bekommt Schnappatmung. Aber hey, er druckt jetzt (manchmal)!" 
            },
            { 
                t: "Schild 'DEFEKT' drankleben", 
                m: 2, f: 5, a: -5, c: 5, 
                r: "Du gibst auf. Die Zukunft ist zu dumm. Du empfiehlst den Kollegen 'Stift und Papier' und gehst Mittagessen." 
            }
        ]
    },
    {
        id: "sq_investigation",
        kind: "text",
        title: "Die verschwundene Maus",
        text: "Frau Erna vom Empfang ist aufgelöst. Ihre geliebte 'Glücksmaus' (ein graues Stofftier) ist weg. Der Hauptverdächtige ist Bello, der Büro-Hund, der unschuldig unter dem Schreibtisch hechelt und so tut, als könne er kein Deutsch.",
        opts: [
            { 
                t: "Detektiv spielen & Körbchen durchsuchen", 
                next: "path_investigation_thief", 
                m: 30, f: -10, a: 10, c: -10, 
                r: "Du wühlst dich durch sein Sabber-Nest. Aha! Zwischen einem Knochen und einem alten Socken findest du die Maus. Sie ist nass und eklig. Erna ist überglücklich, Bello knurrt dich leise an. Du hast ihm sein Spielzeug geklaut." 
            },
            { 
                t: "Bello verhören (Anbellen)", 
                next: "path_investigation_leader", 
                m: 5, f: 10, a: -10, c: 10, 
                r: "Du gehst auf alle Viere und bellst ihn laut an: 'WAU! WO IST SIE?!'. Bello ist erst verwirrt, wedelt dann aber begeistert. Der Chef kommt vorbei: 'Müller... alles okay?'. Egal, du hast jetzt den Respekt des Hundes." 
            },
            { 
                t: "Neue Maus aus dem Lager holen", 
                next: "path_investigation_bored", 
                m: 5, f: -5, a: 0, c: 0, 
                r: "Du holst einfach eine neue Werbe-Maus aus dem Schrank. Erna nimmt sie zögernd. 'Es ist nicht dasselbe... aber danke.' Bello gähnt. Ihm ist langweilig." 
            }
        ]
    },
    {
        id: "sq_investigation_2a",
        kind: "text",
        title: "Die Geiselnahme",
        reqStory: "path_investigation_thief",
        text: "Du willst drucken, aber Bello liegt *auf* dem Drucker. Er knurrt, wenn du dich näherst. Er fordert offensichtlich Ersatz für die konfiszierte Glücksmaus. Das Papierfach ist seine Geisel.",
        opts: [
            { 
                t: "Ihm einen Donut opfern", 
                rem: "donut", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Du legst den Donut auf den Boden. Bello springt runter und inhaliert das Gebäck. Der Weg zum Drucker ist frei. Bestechung funktioniert auch bei Tieren. (Item entfernt)" 
            },
            { 
                t: "Ihn mit dem Laserpointer weglocken", 
                m: 10, f: 5, a: 0, c: 0, 
                r: "Du lässt den roten Punkt durch den Flur tanzen. Bello dreht durch, rutscht auf dem Parkett aus und jagt den Punkt bis ins Marketing. Der Drucker gehört wieder dir." 
            },
            { 
                t: "Chef rufen: 'Der Hund sabotiert die Arbeit!'", 
                m: 15, f: 0, a: 20, c: 5, 
                r: "Der Chef kommt, sieht den Hund und sagt mit Babystimme: 'Na wer ist denn da ein feiner Drucker-Wächter? Ja wer denn?' Er krault Bello 10 Minuten lang. Du kriegst deinen Ausdruck nicht." 
            }
        ]
    },
    {
        id: "sq_investigation_2b",
        kind: "text",
        title: "Beute für das Alpha-Tier",
        reqStory: "path_investigation_leader",
        text: "Bello kommt schwanzwedelnd in dein Büro. Er sieht dich als Rudelführer. Er legt dir stolz seine neueste 'Beute' auf die Füße: Einen teuren, italienischen Herrenschuh. Er ist vollgesabbert und leicht angekaut. Er gehört definitiv dem Chef.",
        opts: [
            { 
                t: "Schuh heimlich unter das Sofa kicken", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du lässt das Beweisstück verschwinden. Bello guckt enttäuscht, holt den Schuh aber sofort wieder hervor. Er will 'Hol Stöckchen' spielen. Mit einem 500€-Schuh." 
            },
            { 
                t: "Bello loben: 'Feiner Junge!'", 
                m: 10, f: 10, a: -20, c: 20, 
                r: "Du kraulst ihn. Bello ist so glücklich, dass er losrennt und auch den *zweiten* Schuh holt. Jetzt hast du das Paar komplett. Wenn der Chef jetzt reinkommt, bist du tot." 
            },
            { 
                t: "Tatort reinigen (Schuh putzen)", 
                m: 20, f: -10, a: 5, c: -5, 
                r: "Du versuchst panisch, den Sabber mit Taschentüchern zu entfernen. Du stellst den Schuh nachts heimlich vor die Cheftür. Das war knapp." 
            }
        ]
    },
    {
        id: "sq_investigation_2c",
        kind: "text",
        title: "Markierarbeiten",
        reqStory: "path_investigation_bored",
        text: "Weil niemand mit ihm gespielt hat, hat Bello sich selbst beschäftigt. Er steht im Serverraum (Tür war offen) und hebt das Bein an Rack 3. Das ist der Haupt-Switch.",
        opts: [
            { 
                t: "Hechtsprung, um den Strahl abzufangen", 
                m: 5, f: -5, a: 10, c: -10, 
                r: "Du wirfst dich dazwischen. Deine Hose ist nass (und warm), aber der 10.000€-Switch ist trocken. Du bist ein Held, aber du riechst streng." 
            },
            { 
                t: "Laut klatschen & 'PFUI!' schreien", 
                m: 2, f: 0, a: 10, c: -5, 
                r: "Bello erschrickt, kneift den Schwanz ein und rennt weg. Ein paar Tropfen haben das Gehäuse getroffen, aber nichts Kritisches. Du musst wischen." 
            },
            { 
                t: "Filmen für YouTube", 
                m: 5, f: 10, a: -10, c: 50, 
                r: "Du hältst drauf. *ZISCH-BRUTZEL*. Der Switch fällt aus. Das Video 'Dog vs Internet' geht viral. Du verlierst deinen Job, wirst aber Influencer." 
            }
        ]
    },
{
        id: "sq_loose_cable",
        kind: "text",
        title: "Die Stolperfalle",
        text: "Im Flur liegt ein graues LAN-Kabel quer über dem Weg. Es sieht gefährlich aus. Dr. Wichtig kommt gleich hier lang und schaut auf sein Handy.",
        opts: [
            { 
                t: "Sichern: Mit Tape festkleben", 
                req: "tape", 
                next: "path_cable_stuck", 
                m: 5, f: -5, a: 0, c: -5, 
                r: "Du wickelst ordentlich Panzertape drüber. Das bewegt sich keinen Millimeter mehr. Unfallverhütungsvorschrift: Erfüllt. Du fühlst dich vorbildlich." 
            },
            { 
                t: "Mitnehmen (Fundsache)", 
                loot: "cable", 
                next: "path_cable_missing", 
                m: 5, f: 5, a: 0, c: 10, 
                r: "Zack, eingesteckt. 'Wer das hier liegen lässt, braucht es wohl nicht.' Du hast jetzt ein langes Kabel. Inventar +1." 
            },
            { 
                t: "Liegen lassen & zusehen", 
                m: 2, f: 10, a: 5, c: -5, 
                r: "Der Chef steigt elegant drüber, ohne aufzublicken. Du bist enttäuscht. Keine Action." 
            }
        ]
    },
    {
        id: "sq_loose_cable_2a",
        kind: "text",
        title: "Bombenfest",
        reqStory: "path_cable_stuck",
        text: "Ein externer Techniker steht kniend im Flur und flucht. 'Wer hat mein Mess-Kabel hier einbetoniert?! Das war nur temporär! Ich krieg das nicht ab, ohne den Teppich rauszureißen!' Er zerrt vergeblich am Panzertape.",
        opts: [
            { 
                t: "Mit einem Teppichmesser helfen", 
                m: 20, f: -10, a: 5, c: -5, 
                r: "Ihr schneidet das Kabel gemeinsam aus dem Boden. Der Teppich hat jetzt einen hässlichen Riss. 'Sagen wir einfach, das war Verschleiß', meint der Techniker." 
            },
            { 
                t: "Belehren: 'Safety First!'", 
                m: 5, f: 5, a: 10, c: 0, 
                r: "'Stolperfallen sind verboten!' Der Techniker starrt dich hasserfüllt an. Er schneidet das Kabel einfach an beiden Enden ab und lässt den Rest kleben. Ein Denkmal für die Ewigkeit." 
            }
        ]
    },
    {
        id: "sq_loose_cable_2b",
        kind: "text",
        title: "Blinder Fleck",
        reqStory: "path_cable_missing",
        text: "Ein Mann von 'Secure & Safe' läuft suchend umher. 'Verdammt! Wo ist das Patchkabel? Ich sollte hier die neue 4K-Überwachungskamera für den Chef installieren! Er will sehen, wer immer früher geht!' Ohne Kabel kein Bild.",
        opts: [
            { 
                t: "Zurückgeben: 'Habe ich gefunden'", 
                rem: "cable", 
                m: 5, f: -5, a: 10, c: -10, 
                r: "Du gibst es ihm. Er montiert die Kamera. Sie zeigt jetzt direkt auf DEINE Bürotür. Der Chef sieht alles. Du hast dir selbst ins Knie geschossen. (Item entfernt)" 
            },
            { 
                t: "Lügen: 'Bestimmt die Putzkolonne'", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "'Mist. Dann muss ich morgen wiederkommen.' Er packt die Kamera wieder ein. Du hast der Belegschaft (und dir) einen weiteren Tag Freiheit erkauft. Held!" 
            }
        ]
    },
    {
        id: "sq_package_open_1",
        kind: "text",
        title: "Die Festung aus Pappe",
        text: "Ein Paket für die IT liegt auf deinem Tisch. Der Absender war offensichtlich paranoid und hat eine komplette Rolle Panzertape verbraucht. Es gibt keine Lasche, keinen Anfang, nur glatte, braune Unendlichkeit.",
        opts: [
            { 
                t: "Chirurgischer Eingriff (Schraubendreher)", 
                req: "screw", 
                next: "path_package_stink", 
                m: 5, f: -5, a: -5, c: 0, 
                r: "Mit der Präzision eines Serienmörders stichst du durch die Schichten. Ratsch. Offen. Inhalt: 50 billige Werbe-Mauspads aus China, die stark nach einem Chemieunfall riechen." 
            },
            { 
                t: "Brutale Gewalt mit dem Haustürschlüssel", 
                next: "path_package_toner", 
                m: 10, f: -5, a: 10, c: 0, 
                r: "Du säbelst wild am Klebeband herum, bis der Karton nachgibt. Dein Schlüssel ist jetzt um 45 Grad verbogen, aber das Paket ist offen. Drinnen: Eine XXL-Toner-Kartusche." 
            },
            { 
                t: "Den Karton gegen die Wand pfeffern", 
                next: "path_package_glass", 
                m: 5, f: 5, a: -20, c: 10, 
                r: "KRACH! Das Paket platzt auf wie eine reife Melone. Leider war es die Lieferung der neuen 'Magic Glass Trackpads' für den Vorstand. Das Geräusch von splitterndem Glas ist irgendwie... befriedigend." 
            }
        ]
    },
    {
        id: "sq_package_open_2a",
        kind: "text",
        title: "Der Chemie-Unfall",
        reqStory: "path_package_stink",
        text: "Der Gestank der 50 Gummimappen breitet sich im Büro aus. Es riecht nach verbranntem Reifen und Kopfschmerzen. Kollegen fangen an zu husten. Chantal fragt, ob wir renovieren.",
        opts: [
            { 
                t: "Als 'Aromatherapie' verteilen", 
                m: 15, f: -10, a: 5, c: 5, 
                r: "Du läufst rum und legst jedem ein Pad hin. Arbeit ist Arbeit. Nach 10 Minuten sind alle high von den Dämpfen und kichern albern. Der Chef fragt, warum keiner arbeitet." 
            },
            { 
                t: "Eine Gummi-Burg bauen", 
                m: 10, f: 10, a: -10, c: 10, 
                r: "Du stapelst die Pads um deinen Monitor. Du sitzt jetzt in einem stinkenden Iglu. Niemand kommt dir mehr näher als 2 Meter. Herrliche Ruhe, aber du arbeitest nicht." 
            },
            { 
                t: "Aus dem Fenster werfen", 
                m: 5, f: 0, a: -5, c: 20, 
                r: "Du frisbeest die Dinger einzeln aus dem 4. Stock. Unten beschwert sich der Sicherheitsdienst über 'giftigen Regen'. Aber die Luft ist rein." 
            }
        ]
    },
    {
        id: "sq_package_open_2b",
        kind: "text",
        title: "Schlüsselmoment",
        reqStory: "path_package_toner",
        text: "Du willst den Toner ins Lager bringen, aber du hast ihn wohl mit dem Schlüssel angestochen. Eine feine Spur aus schwarzem Pulver rieselt hinter dir her. Und dein Haustürschlüssel sieht aus wie ein Korkenzieher.",
        opts: [
            { 
                t: "Loch mit Finger zuhalten", 
                m: 10, f: -5, a: 10, c: -10, 
                r: "Du rennst zum Drucker. Dein Finger ist jetzt permanent schwarz. Du siehst aus, als hättest du nekrotisches Gewebe. Aber der Toner ist gerettet und der Chef muss keinen neuen kaufen." 
            },
            { 
                t: "Schlüssel im Schloss geradebiegen", 
                m: 30, f: 10, a: 20, c: 0, 
                r: "Du steckst den krummen Schlüssel in deine Bürotür und drückst. KNACK. Abgebrochen. Jetzt kommst du heute Abend nicht in deine Wohnung UND nicht aus dem Büro. Perfekt." 
            },
            { 
                t: "Toner schütteln (vielleicht hilft's?)", 
                m: 5, f: 0, a: 20, c: 20, 
                r: "PUFF! Die Kartusche explodiert in einer schwarzen Wolke. Du siehst aus wie ein Schornsteinfeger aus dem 19. Jahrhundert. Der Chef fragt, ob das 'Blackfacing' ist. Abmahnungsgefahr." 
            }
        ]
    },
    {
        id: "sq_package_open_2c",
        kind: "text",
        title: "Das Puzzle für Manager",
        reqStory: "path_package_glass",
        text: "Der Chef kommt freudig rein. 'Ist mein Magic Trackpad da? Das Paket lag doch bei Ihnen!' Du deutest auf den Haufen aus Glasstaub und Elektronikschrott in der Ecke.",
        opts: [
            { 
                t: "Behaupten: 'Das ist ein Bausatz!'", 
                m: 10, f: 5, a: 0, c: -5, 
                r: "'Das ist die IKEA-Edition, Chef. Fördert die Motorik.' Er guckt skeptisch, nimmt die Schachtel mit den Scherben aber mit. Er ist beschäftigt, also sinkt dein Radar." 
            },
            { 
                t: "Lügen: 'Das ist Liquid Glass Technologie'", 
                m: 5, f: 10, a: -5, c: -15, 
                r: "'Das muss so. Einfach auf den Tisch schütten und warten.' Der Chef nickt tief beeindruckt: 'Die Zukunft ist verrückt.' Er geht glücklich. Du bist ein Genie." 
            },
            { 
                t: "Mit Panzertape kleben", 
                req: "tape", 
                m: 20, f: -10, a: 0, c: -20, 
                r: "Du wickelst den Schrott in Tape ein. Es sieht aus wie eine Kartoffel. 'Hier, Chef. Ein Prototyp aus dem Silicon Valley.' Er drückt drauf rum. 'Ergonomisch!', sagt er begeistert. Voller Erfolg." 
            }
        ]
    },
    {
        id: "sq_shelf_1",
        kind: "text",
        title: "Der schiefe Turm von Toner",
        text: "Im Lager neigt sich das Schwerlastregal mit den teuren Lasertonern bedrohlich zur Seite. Ein falscher Windhauch, und es gibt eine 5.000-Euro-Explosion aus feinem, schwarzem Staub.",
        opts: [
            { 
                t: "Quick-Fix: Kabelbinder-Orgie", 
                req: "zip_ties", 
                next: "path_shelf_iso", 
                m: 10, f: -5, a: 0, c: 0, 
                r: "Du zurrst das Regal mit einem Dutzend Kabelbindern an ein Heizungsrohr. Es sieht aus wie Bondage für Möbel, aber es steht bombenfest. Nichts hält länger als ein Provisorium." 
            },
            { 
                t: "Handwerklich korrekt dübeln", 
                next: "path_shelf_bauamt", 
                m: 60, f: -20, a: 15, c: -5, 
                r: "Du holst die Schlagbohrmaschine. 60 Minuten Lärm, Staub und Schweiß. Das Regal steht jetzt perfekt im Lot. Keiner bemerkt es, keiner dankt es dir, aber du hast Rückenschmerzen." 
            },
            { 
                t: "Haftungsausschluss: Warnzettel kleben", 
                next: "path_shelf_a38", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du kritzelst 'VORSICHT! EINSTURZGEFAHR!' auf ein Post-It, pappst es an den Holm und gehst zufrieden Mittagessen. Juristisch bist du damit aus dem Schneider. Die Physik interessiert das aber nicht." 
            }
        ]
    },
    {
        id: "sq_shelf_2a",
        kind: "text",
        title: "ISO-Zertifizierung 9001",
        reqStory: "path_shelf_iso",
        text: "Der Sicherheitsbeauftragte steht vor deiner Kabelbinder-Konstruktion. Er tippt auf sein Klemmbrett. 'Das ist eine *Nicht-permanente Lastensicherung an thermischen Leitern*. Dafür brauche ich das Formblatt Z-12 für polymere Verbindungen und den Nachweis der Hitzebeständigkeit nach DIN 4102.'",
        opts: [
            { 
                t: "Behaupten: 'Das sind Luftfahrt-Binder'", 
                m: 5, f: 5, a: -5, c: 5, 
                r: "'Spezialanfertigung der NASA, Herr Inspektor.' Er blinzelt. 'Ach so. Na dann... tragen Sie das bitte nachträglich in Anlage 4b ein.' Er macht einen Haken. Kompetenz durch Lügen." 
            },
            { 
                t: "Formular Z-12 suchen und ausfüllen", 
                m: 45, f: -10, a: 20, c: 0, 
                r: "Du verbringst 45 Minuten damit, die Zugfestigkeit von Plastik zu googeln und ein sinnloses Formular auszufüllen. Der Inspektor locht es ab, ohne es zu lesen. 'Ordnung muss sein.'" 
            }
        ]
    },
    {
        id: "sq_shelf_2b",
        kind: "text",
        title: "Antrag auf bauliche Veränderung",
        reqStory: "path_shelf_bauamt",
        text: "Facility Management hat das Bohrloch entdeckt. 'Haben Sie etwa in die *Brandschutzwand F90* gebohrt?! Ohne den 'Antrag auf Durchdringung von Feuerwiderstandsklassen' (dreifacher Durchschlag, rosa)?! Das muss sofort zurückgebaut und verputzt werden!'",
        opts: [
            { 
                t: "Bürokratie-Konter: 'Das war Gefahr im Verzug!'", 
                m: 10, f: 0, a: 5, c: 0, 
                r: "Du zitierst Arbeitsschutzgesetz §9. 'Ich habe Leben gerettet!' Der Facility-Typ wird unsicher. 'Na gut. Aber reichen Sie Formular 'Heldenmut im Amt' nach.' Puh." 
            },
            { 
                t: "Dübel rausziehen & Kaugummi rein", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du entfernst die Schraube. Das Regal wackelt wieder. Du stopfst Kaugummi ins Loch und malst mit Tipp-Ex drüber. 'Welches Loch? Ich sehe kein Loch.' Problem vertagt." 
            }
        ]
    },
    {
        id: "sq_shelf_2c",
        kind: "text",
        title: "Das Haus, das Verrückte macht",
        reqStory: "path_shelf_a38",
        text: "Das Regal wurde vom TÜV gesperrt ('Rotes Band'). Um ein neues zu bestellen, brauchst du den **Passierschein A38**. Die Beschaffungsstelle sagt: 'A38 gibt es beim Facility Management.' Facility sagt: 'Nein, A38 macht die Buchhaltung.' Die Buchhaltung sagt: 'A38? Das wurde durch das blaue Formular B-65 ersetzt, aber das gibt es nur beim Pförtner.'",
        opts: [
            { 
                t: "Zum Pförtner gehen (Die Quest annehmen)", 
                m: 60, f: -20, a: 50, c: -10, 
                r: "Du rennst 60 Minuten durchs Haus. Pförtner -> Poststelle -> Betriebsrat -> Kantine. Am Ende hast du Formular **A39** ('Antrag auf Erteilung eines Antrags'). Du brichst weinend zusammen. Das Regal bleibt kaputt." 
            },
            { 
                t: "Selbstjustiz: Regal bei IKEA kaufen & heimlich hinstellen", 
                m: 30, f: -5, a: -10, c: 10, 
                r: "Du umgehst die Bürokratie, kaufst ein Billy-Regal von deinem eigenen Geld und baust es nachts auf. Niemand stellt Fragen. Du hast das System besiegt, aber bist 30€ ärmer." 
            },
            { 
                t: "Den Chef fragen: 'Haben Sie A38?'", 
                m: 5, f: 0, a: 10, c: 20, 
                r: "Der Chef starrt dich an. 'Müller, nehmen Sie keine Drogen während der Arbeitszeit.' Er reißt das Absperrband einfach ab. 'So. Problem gelöst.' Manchmal ist der Chef nützlich." 
            }
        ]
    },
    {
        id: "sq_noise_1",
        kind: "text",
        title: "Operation: Kieselstein",
        text: "Draußen spielt sich eine Szene wie aus 'Transformers' ab. Ein Schwerlast-Konvoi hat einen Bagger in der Größe eines Einfamilienhauses abgeladen. Dazu drei Presslufthammer und ein Gerät, das aussieht wie ein Laser-Bohrer. Das Ziel dieser Armada: Ein 5cm kleines Schlagloch im Gehweg. Der Boden bebt.",
        opts: [
            { 
                t: "Technik-Lösung: Kopfhörer auf", 
                req: "headphones", 
                next: "path_noise_zen", 
                m: 0, f: 5, a: -20, c: 0, 
                r: "Klick. Noise-Cancelling auf 'Maximum'. Der Weltuntergang draußen wird zu einem sanften Vibrieren in deinem Hintern. Du arbeitest im Auge des Sturms." 
            },
            { 
                t: "Physik-Lösung: Fenster zu", 
                next: "path_noise_sauna", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du rammst das Fenster zu. Der Lärm wird dumpfer, aber die Vibrationen lassen deine Taffe auf dem Tisch wandern. Die Luft im Büro wird sofort stickig." 
            },
            { 
                t: "Sozial-Lösung: Rausbrüllen", 
                next: "path_noise_foreman", 
                m: 5, f: 5, a: -5, c: 0, 
                r: "Du öffnest das Fenster und schreist gegen den Lärm an: 'BRAUCHT IHR DAFÜR ECHT DEN TODESSTERN?! DAS IST EIN LOCH, KEIN KRATER!' Der Vorarbeiter schaut hoch." 
            }
        ]
    },
    {
        id: "sq_noise_2a",
        kind: "text",
        title: "Das Erwachen",
        reqStory: "path_noise_zen",
        text: "Du nimmst die Kopfhörer ab, weil dein Monitor wackelt. Draußen ist Stille. Du schaust raus. Das Schlagloch ist weg. Der Gehweg auch. Da ist jetzt einfach ein riesiger Krater, in dem der Bagger steckt. Ein Arbeiter kratzt sich am Kopf.",
        opts: [
            { 
                t: "Vorhang zu", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Was man nicht sieht, ist nicht passiert. Du machst die Jalousie runter und arbeitest im Dunkeln weiter." 
            },
            { 
                t: "Foto machen", 
                m: 5, f: 10, a: -5, c: 5, 
                r: "Das glaubt dir keiner. '#GermanEngineering'. Der Chef sieht dich am Fenster: 'Müller, dokumentieren Sie den Baufortschritt oder arbeiten Sie?'" 
            }
        ]
    },
    {
        id: "sq_noise_2b",
        kind: "text",
        title: "Die Rüttelplatte",
        reqStory: "path_noise_sauna",
        text: "Draußen haben sie jetzt die 'Mega-Rüttelplatte 3000' angeworfen. Dein ganzer Körper vibriert. Deine Zähne klappern. Auf dem Monitor verschwimmen die Excel-Zeilen. Es ist unmöglich zu tippen.",
        opts: [
            { 
                t: "Im Takt tippen", 
                m: 10, f: -5, a: 10, c: 0, 
                r: "Du versuchst, die Vibrationen auszugleichen. Das Ergebnis: 'Sseeehr geeeehhhrter Heeerrrr...'. Du gibst entnervt auf." 
            },
            { 
                t: "Aufgeben und Pause machen", 
                m: 15, f: 10, a: -10, c: 10, 
                r: "Du gehst in die Küche (andere Gebäudeseite). Dort wackelt nur das Wasser im Glas. Der Chef fragt: 'Flüchten Sie?' Du nickst nur stumm." 
            }
        ]
    },
    {
        id: "sq_noise_2c",
        kind: "text",
        title: "Budget-Planung",
        reqStory: "path_noise_foreman",
        text: "Der Vorarbeiter brüllt fröhlich zurück: 'MUSS WEG! WIR HABEN NOCH BUDGET FÜR DIESES JAHR! WENN WIR DEN DIESEL NICHT VERBRAUCHEN, KRIEGEN WIR NÄCHSTES JAHR WENIGER! WOLLEN SIE AUCH MAL BAGGERN?'",
        opts: [
            { 
                t: "Angebot annehmen: 'Ja, will ich!'", 
                m: 30, f: 20, a: -50, c: 20, 
                r: "Du rennst runter. 20 Minuten später sitzt du im Führerhaus und gräbst den Vorgarten der Firma um. Der Chef schaut fassungslos aus dem Fenster. Das war es wert." 
            },
            { 
                t: "Kopfschüttelnd ablehnen", 
                m: 2, f: 0, a: 10, c: 0, 
                r: "Du schließt das Fenster. Bürokratie in ihrer reinsten Form. Dein Glaube an die Menschheit sinkt um 10 Punkte." 
            }
        ]
    },
    {
        id: "sq_loot_crate_1",
        kind: "text",
        title: "Die 'Zu Verschenken' Kiste",
        text: "Jemand hat eine Kiste mit der Aufschrift 'ZU VERSCHENKEN' in den Flur gestellt. Ein Biotop aus Staub, alten Kabeln und vergessenen Bürotäumen.",
        opts: [
            { 
                t: "Das schwere 'Buch' bergen", 
                loot: "manual", 
                next: "loot_crate_taken",
                m: 10, f: 5, a: 0, c: 0, 
                r: "Du ziehst es aus dem Stapel. Es ist... ein 'Windows 95 Handbuch'! Antikes Wissen für echte Kenner. (Inventar +1)" 
            },
            { 
                t: "Mutig in den Kabelsalat greifen", 
                loot: "cable", 
                next: "loot_crate_taken",
                m: 10, f: 5, a: 0, c: 0, 
                r: "Du kämpfst mit dem Knoten und gewinnst! Ein langes, graues LAN-Kabel gehört jetzt dir. (Inventar +1)" 
            },
            { 
                t: "Blind nach dem roten 'Ding' wühlen",
                loot: "stressball", 
                next: "loot_crate_taken",
                m: 10, f: 5, a: 0, c: 0, 
                r: "Igit... was ist das? Ach, nur ein alter Wut-Ball! Er ist etwas klebrig, aber drückbar. (Inventar +1)" 
            },
            { 
                t: "Das silberne Glitzern untersuchen", 
                loot: "tape", 
                next: "loot_crate_taken",
                m: 10, f: 5, a: 0, c: 0, 
                r: "Der heilige Gral der Reparatur! Eine fast volle Rolle Panzertape. Damit kannst du das Universum flicken. (Inventar +1)" 
            }
        ]
    },
    {
        id: "sq_loot_crate_2",
        kind: "text",
        title: "Der Sammler",
        reqStory: "loot_crate_taken",
        text: "Hausmeister Egon fängt dich im Flur ab. Er wirkt begeistert. 'Hömma! Ich hab gesehen, du hast dir was aus der Kiste geangelt! Endlich einer mit Geschmack! Ich räume gerade das Archiv von 1998 aus. Ich hab da noch 500 Kilo Nadeldrucker-Papier und Disketten-Boxen. Willste das auch haben? Sonst muss ich das entsorgen!'",
        opts: [
            { 
                t: "Ja! Ich nehme alles! (Stöbern)", 
                m: 30, f: 10, a: -10, c: 0, 
                r: "Du folgst Egon in den Keller. Ihr verbringt eine halbe Stunde damit, in uralter Hardware zu wühlen. Du nimmst nichts mit, aber Egon ist glücklich, dass jemand seinen 'Schatz' gewürdigt hat. Retro-Feeling pur." 
            },
            { 
                t: "Äh... nein danke, das reicht.", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Egons Lächeln verschwindet sofort. 'Banause. Die Jugend von heute weiß nichts mit gutem Endlospapier anzufangen.' Er schlurft beleidigt davon." 
            }
        ]
    },
    {
        id: "sq_chair_1",
        kind: "text",
        title: "Der Chefsessel",
        text: "Der Chef hat einen neuen 'Ergonomic 3000'. Sein alter Ledersessel steht einsam auf dem Flur beim Sperrmüll. Das Leder ist abgewetzt, aber die Polsterung ist immer noch Klassen besser als dein aktueller 'Beton-Stuhl'.",
        opts: [
            { 
                t: "Ganzen Stuhl retten & tapen", 
                req: "tape", 
                next: "path_chair_new", 
                m: 20, f: 10, a: -20, c: 0, 
                r: "Du schleifst das Monstrum in dein Büro. Eine Rolle Panzertape für die lockere Armlehne und er ist wie neu. Mad-Max-Optik, aber S-Klasse-Komfort." 
            },
            { 
                t: "Nur die Luxus-Rollen klauen", 
                req: "screw", 
                next: "path_chair_new", 
                m: 10, f: 5, a: -10, c: 0, 
                r: "Du schraubst die High-End-Skater-Rollen ab und montierst sie unter deinen Stuhl. Endlich nicht mehr über Teppichkanten stolpern!" 
            },
            { 
                t: "Ignorieren (Mein Rücken ist aus Stahl)", 
                m: 0, f: 0, a: 5, c: 0, 
                r: "Du gehst weiter. Später am Tag bekommst du Ischias. Selbst schuld." 
            }
        ]
    },
    {
        id: "sq_chair_2",
        kind: "text",
        title: "Thron-Nachfolge",
        reqStory: "path_chair_new",
        text: "Ahhh. Das Sitz-Upgrade macht sich bemerkbar. Du gleitest lautlos durchs Büro und wippst entspannt. Deine Aggressivität verpufft. Einziges Manko: Überall kleben noch hartnäckige 'Paw Patrol'-Sticker vom Sohn des Chefs. Marshall der Feuerwehrhund starrt dich von der Armlehne an.",
        opts: [
            { 
                t: "Egal: 'Ich bin jetzt Teil der Paw Patrol'", 
                m: 10, f: 10, a: -20, c: 0, 
                r: "Du drehst dich lachend im Kreis. 'Wuff wuff, Rettung naht!' Die Kollegen gucken komisch, aber du bist zu entspannt, um dich zu schämen. Das Leben ist gut." 
            },
            { 
                t: "Versuchen, die Sticker abzuknibbeln", 
                m: 15, f: -5, a: 5, c: 0, 
                r: "Du kratzt mit dem Fingernagel an den Stickern. Es bleiben hässliche weiße Papierfetzen und Klebereste zurück. Jetzt sieht es schlimmer aus als vorher. Mist." 
            }
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
                next: "path_archive_stolen", 
                m: 2, f: 5, a: 0, c: 0, 
                r: "Du schiebst dir eine in den Mund. Schmeckt nach billigem Weinbrand und Staub. Aber du weißt jetzt, wo der Vorrat liegt. (Inventar +1)" 
            },
            { 
                t: "Ordner zurückstellen", 
                m: 2, f: 0, a: -5, c: 0, 
                r: "Du lässt Gabi ihren Schatz. Diskretion ist Ehrensache. Wer weiß, wie lange die da schon liegen..." 
            }
        ]
    },
    {
        id: "sq_archive_find_2a",
        kind: "text",
        title: "CSI: Buchhaltung",
        reqStory: "path_archive_stolen",
        text: "Zehn Minuten später steht Gabi in deiner Bürotür. Sie trägt Latexhandschuhe. Mit einer Pinzette hält sie ein winziges, zerknülltes Stück rosa Alufolie hoch. 'Beweisstück A. Gefunden in Ihrem Papierkorb. Korrespondiert exakt mit der Fehlmenge im Ordner 'Steuer 1990'. Der Kirschlikör-Geruch in Ihrer Atemluft bestätigt den Verdacht.'",
        opts: [
            { 
                t: "Geständnis: 'Es war Notwehr (Unterzucker)'", 
                m: 5, f: 0, a: -5, c: 0, 
                r: "Gabi senkt die Pinzette. 'Na gut. Aber das nächste Mal füllen Sie Formular S-Ü-S (Sonderentnahme Süßwaren) aus! Ordnung muss sein!'" 
            },
            { 
                t: "Bestechen: 'Ich kaufe dir eine neue Packung'", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Gabi schnaubt verächtlich. 'Eine neue? Die im Ordner reifen seit 30 Jahren! Das Aroma ist unwiederbringlich zerstört!' Sie geht beleidigt, aber du bist davongekommen." 
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
        text: "Frau Elster aus der Buchhaltung winkt dich hektisch zum Kopierer. 'Da klemmt was! Ich trau mich nicht ran, Sie sind doch der Technik-Profi!' Sie tritt auffällig weit zurück und hält sich die Hände vor das weiße Kostüm.",
        opts: [
            { 
                t: "Heldenmut: Klappe öffnen", 
                next: "path_toner_explosion", 
                m: 25, f: -15, a: 10, c: 0, 
                r: "Du reißt die Klappe auf. BAAAAAM! Eine cyan-blaue Wolke verschluckt dich. Du schmeckst Chemie. Frau Elster kichert boshaft: 'Huch!'. Du gehst wortlos ins Bad, um dich notdürftig zu schrubben." 
            },
            { 
                t: "Lunte riechen: 'Mach selbst'", 
                next: "path_toner_dodge", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du gehst einfach weiter. 'Bin nicht zuständig für Hardware.' Hinter dir hörst du ein lautes *PUFF* und dann einen spitzen Schrei. Tja. Intuition ist alles." 
            }
        ]
    },
    {
        id: "sq_toner_trap_2a",
        kind: "text",
        title: "Der blaue Orden",
        reqStory: "path_toner_explosion",
        text: "Ein paar Stunden später. Du hast immer noch blaue Ränder an den Ohren und siehst aus wie ein verwaschenes T-Shirt. Der Chef kommt rein. 'Müller! Frau Elster sagte, Sie haben sich heldenhaft vor die Kartusche geworfen, um den Perser-Teppich zu schützen! Das nenne ich Einsatz!'",
        opts: [
            { 
                t: "Die Legende bestätigen (Loot)", 
                loot: "chocolate", 
                m: 10, f: 5, a: -10, c: -10, 
                r: "Du nickst ernst. 'Der Teppich ist das Herz der Firma, Chef.' Er ist gerührt und schenkt dir eine Schachtel 'Merci', die eigentlich für Kunden gedacht war. (Inventar +1)" 
            },
            { 
                t: "Gefahrenzulage fordern", 
                m: 5, f: 0, a: 10, c: -5, 
                r: "Der Chef lacht laut. 'Der war gut, Müller! Humor in der Krise! Weiter so!' Er klopft dir auf die noch staubige Schulter und geht. Du hast jetzt blaue Handabdrücke auf dem Hemd." 
            }
        ]
    },
    {
        id: "sq_toner_trap_2b",
        kind: "text",
        title: "Das Schlumpf-Gespenst",
        reqStory: "path_toner_dodge",
        text: "Frau Elster kommt aus dem Waschraum. Sie hat versucht, sich zu reinigen, aber Toner ist gnadenlos. Ihr Gesicht hat nun eine permanente, zart-türkise Tönung. Sie versucht, würdevoll zu wirken und die Blicke der Kollegen zu ignorieren.",
        opts: [
            { 
                t: "Kompliment: 'Toller Avatar-Look!'", 
                m: 15, f: 5, a: -20, c: 0, 
                r: "Sie funkelt dich böse an, kann aber nichts sagen, ohne es zuzugeben. Die Schadenfreude wärmt dein Herz wie ein kleines Lagerfeuer. Deine Laune ist bestens." 
            },
            { 
                t: "Rat geben: 'Das geht nie wieder weg.'", 
                m: 10, f: 0, a: -10, c: 5, 
                r: "Du flüsterst es ihr im Vorbeigehen zu. Sie wird bleich (unter dem Blau). Sie rennt zurück ins Bad. Du hast jetzt Ruhe vor der Buchhaltung." 
            }
        ]
    },
{
        id: "sq_fresh_air",
        kind: "text",
        title: "Dicke Luft",
        text: "Im Meetingraum 'Aquarium' stinkt es bestialisch nach Mettbrötchen, Zwiebeln und Angstschweiß. Jemand hat das Fenster zugelassen, und die Luft steht wie eine Wand. Dir wird fast übel im Vorbeigehen.",
        opts: [
            { 
                t: "Fenster kippen (Lüften)", 
                next: "path_wasp_chaos", 
                m: 5, f: -5, a: 20, c: 5, 
                r: "Frische Luft strömt rein! Und mit ihr eine riesige, aggressive Wespe. Sie sticht den Vertriebsleiter direkt in die Lippe. Er schreit: 'BÜLLER! ACHEN SIE DAS WEG!' Das Chaos beginnt." 
            },
            { 
                t: "Luft anhalten & weitergehen", 
                next: "path_bio_hazard", 
                m: 2, f: 0, a: 0, c: 0, 
                r: "Sollen sie doch in ihrem Mief ersticken. Nicht dein Problem. Du beschleunigst den Schritt, bevor der Geruch sich in deiner Kleidung festsetzt." 
            }
        ]
    },
    {
        id: "sq_fresh_air_wasp",
        kind: "text",
        title: "Terror im Aquarium",
        reqStory: "path_wasp_chaos",
        text: "Stunden später. Das Meeting läuft noch – theoretisch. Tatsächlich kauern der Chef und der Vorstand unter dem Konferenztisch. Die Wespe patrouilliert wie ein Kampfhubschrauber durch den Raum. Der Vertriebsleiter sieht aus wie ein Kugelfisch. Niemand traut sich zur Tür.",
        opts: [
            { 
                t: "Die Tür von außen abschließen", 
                m: 10, f: 5, a: -20, c: -10, 
                r: "Klick. 'Zu ihrer eigenen Sicherheit', murmelst du. Drinnen bricht Panik aus. Du lehnst dich an die Scheibe und genießt die Show. Das ist besser als Fernsehen." 
            },
            { 
                t: "Reinspringen & Wespe klatschen", 
                loot: "manual", // Wenn man das Handbuch hat, könnte man es nutzen (impliziert)
                m: 30, f: -10, a: 20, c: 20, 
                r: "Du stürmst rein und erschlägst das Biest mit einer Akte. Applaus brandet auf (unter dem Tisch). Der Chef kriecht hervor: 'Müller, Sie sind befördert! Also... emotional.'" 
            }
        ]
    },
    {
        id: "sq_fresh_air_bio",
        kind: "text",
        title: "ABC-Alarm",
        reqStory: "path_bio_hazard",
        text: "Der Flur ist abgesperrt. Männer in gelben Vollschutzanzügen mit Atemgeräten kommen aus dem Meetingraum. Einer hält ein Messgerät hoch, das rot blinkt. 'Wir messen extrem hohe Schwefel-Werte! Verdacht auf Biogas-Leck! Evakuierung!' Es riecht nach 4 Stunden altem Zwiebelmett und Angstschweiß.",
        opts: [
            { 
                t: "Aufklären: 'Das ist nur das Mett.'", 
                m: 5, f: 0, a: 10, c: -20, 
                r: "Der Einsatzleiter starrt dich durch das Visier an. 'Wollen Sie mir sagen, Ihre Kollegen dünsten Giftgas aus?!' Der Chef wird rot (vor Scham). Der Einsatz wird teuer." 
            },
            { 
                t: "Panik schüren: 'Rettet euch!'", 
                m: 10, f: 20, a: -10, c: 5, 
                r: "Du rennst schreiend zum Ausgang. 'Der Mett-Tod kommt für uns alle!' Du hast früher Feierabend, weil das Gebäude geräumt wird. Clever." 
            }
        ]
    },
    {
        id: "sq_package_help",
        kind: "text",
        title: "Die schwere Kiste",
        text: "Die neue Praktikantin bricht fast unter einem riesigen Paket zusammen. 'Puh... das muss zum Marketing in den 4. Stock... können Sie...?' Sie zittert schon, und das Paket rutscht ihr fast aus den Händen.",
        opts: [
            { 
                t: "Helfen & Tragen (Ritter spielen)", 
                next: "path_package_helped", 
                m: 15, f: -20, a: 25, c: -10, 
                r: "Du wuchtest das Ding hoch. Uff. Beton? Du schleppst es schwitzend in den 4. Stock. Chantal vom Marketing reißt die Tür auf: 'WAS SOLL DAS HIER?! Das habe ich storniert! Nimm das sofort wieder mit, du Idiot!' PENG. Tür zu. Dein Hals schwillt vor Wut." 
            },
            { 
                t: "Anfeuern: 'Tschakka!'", 
                m: 2, f: 5, a: -5, c: 0, 
                r: "Du ballst die Faust: 'Du schaffst das! Glaube an dich!' Sie schaut dich mit toten Augen an, schleppt sich aber weiter. Dein Rücken bleibt heil, dein Karma ist im Keller." 
            }
        ]
    },
    {
        id: "sq_package_return",
        kind: "text",
        title: "Retoure des Grauens",
        reqStory: "path_package_helped",
        text: "Du stehst wieder im Flur. Das Paket ist schwer. Die Praktikantin sitzt darauf und weint leise in ihr Klemmbrett. 'Ich wusste das nicht... Chantal ist so böse... Und ich weiß nicht, wie man eine Retoure für Gefahrgut macht...'",
        opts: [
            { 
                t: "Trösten & Erledigen: 'Ich mach das.'", 
                m: 20, f: -10, a: 15, c: -10, 
                r: "Du nimmst ihr das Klemmbrett ab. 'Geh dir einen Kaffee holen.' Du schleppst das Paket zur Poststelle, füllst Formular R-7 aus ('Grund: Empfänger ist zickig') und klebst das Label drauf. Nervige Arbeit, aber du hast Ruhe vor dem Chef." 
            },
            { 
                t: "Mentoring: 'Wir machen das zusammen.'", 
                m: 30, f: -5, a: 10, c: -10, 
                r: "Du erklärst ihr geduldig das Warenwirtschaftssystem. Es dauert 30 Minuten. Sie versteht nichts, hört aber auf zu weinen. Es ist mühsam, aber es sieht sehr produktiv aus." 
            },
            { 
                t: "Pragmatisch: 'Einfach beim Empfang abkippen'", 
                m: 5, f: 10, a: -20, c: 10, 
                r: "Du schiebst das Paket in den Aufzug, drückst 'EG' und rennst weg, bevor die Türen schließen. Die Praktikantin kichert entsetzt. 'Das ist Problem-Lösung 2.0', rufst du. Schadenfreude pur!" 
            }
        ]
    },
{
        id: "sq_alarm_fail_1",
        kind: "text",
        title: "Der rote Knopf",
        text: "Du lehnst dich im Flur an die Wand. Plötzlich: SCHRILL! Du hast den Feueralarm ausgelöst! Der Hausmeister rennt wütend herbei.",
        opts: [
            { 
                t: "Entschuldigen & Wegrennen", 
                next: "path_alarm_escalation", 
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
        id: "sq_alarm_fail_2",
        kind: "text",
        title: "Einsatzleitung",
        reqStory: "path_alarm_escalation",
        text: "Du dachtest, mit dem Wegrennen war dein Alarm-Fehltritt erledigt? Falsch. Kevin hat panisch die 112 gewählt. Wegen DIR steht jetzt ein kompletter Löschzug vor der Tür. Sechs Mann in Vollmontur stürmen mit Äxten und Kettensägen den Flur: 'WO IST DER BRANDHERD?! WIR WOLLEN WAS EINTRETEN!'",
        opts: [
            { 
                t: "Verstecken: 'Ich wars nicht!'", 
                m: 10, f: 10, a: -5, c: 0, 
                r: "Du schließt dich im Klo ein. Du hörst, wie draußen Türen eingetreten werden. Irgendwann ziehen sie ab. Die Rechnung über den Fehlalarm (2.500€) landet beim Chef. Du bist sicher, aber ein Feigling." 
            },
            { 
                t: "Lügen: 'Ich habe Rauch gerochen!'", 
                m: 5, f: -5, a: 15, c: -10, 
                r: "Du stellst dich den Männern mit den Äxten. 'Ich habe den Knopf gedrückt! Da war Rauch!' Der Einsatzleiter nickt anerkennend. 'Besser einmal zu viel als zu wenig!' Sie rücken ab. Der Chef lobt deine Wachsamkeit." 
            },
            { 
                t: "Den Feuerwehrmännern Kaffee anbieten", 
                m: 20, f: 5, a: -20, c: 5, 
                r: "Die Jungs sind schwer enttäuscht, dass sie nichts löschen dürfen. Du kochst Kaffee. Sie setzen sich mit rußigen Stiefeln auf den Teppich und erzählen Geschichten. Die Stimmung ist top, die Arbeit steht still." 
            }
        ]
    },
    {
        id: "sq_elster_blockade_1",
        kind: "text",
        title: "Der Drache bewacht den Hort",
        text: "Frau Elster sitzt mit verschränkten Armen auf dem Aktenordner 'Budget 2024', den du dringend brauchst. 'Den gebe ich nicht raus! Nur über meine Leiche!' Sie sieht blass und unterzuckert aus. Ihr Magen knurrt hörbar.",
        opts: [
            { 
                t: "Snack: 'Erdnuss-Power-Riegel' anbieten",
                next: "path_elster_allergy",
                m: 5, f: -10, a: 50, c: 100, 
                r: "Du hältst ihr den Riegel hin. Ihre Augen leuchten gierig auf. Sie reißt die Packung auf und beißt herzhaft hinein. Sie kaut, schluckt... und ihre Augen weiten sich in Panik. Das war ein Fehler." 
            },
            { 
                t: "Snack: Alpenmilch (Garantiert Nussfrei)",
                m: 10, f: 5, a: -10, c: 0, 
                r: "Sie studiert misstrauisch die Zutatenliste. 'Kann Spuren von Nüssen enthalten... nein, Moment, hier steht: Nussfrei.' Sie lächelt. 'Sehr aufmerksam, Müller.' Sie tauscht Ordner gegen Schokolade." 
            },
            { 
                t: "Taktik: Fenster aufreißen (Zugluft)",
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du öffnest das Fenster weit. Es sind 8 Grad draußen. Frau Elster kreischt: 'MEINE NIEREN! ES ZIEHT!' Sie rafft ihre Strickjacke zusammen und flüchtet in den Flur. Der Ordner gehört dir." 
            },
            { 
                t: "Gewalt: Einfach wegnehmen",
                m: 5, f: 0, a: 20, c: 20, 
                r: "Du greifst nach dem Ordner. Ein kurzes Handgemenge. Sie hat spitze, manikürte Fingernägel. Du hast den Ordner, aber drei blutige Striemen auf dem Handrücken. 'Körperverletzung!', keift sie." 
            }
        ]
    },
    {
        id: "sq_elster_blockade_2",
        kind: "text",
        title: "Die Nuss-Inquisition",
        reqStory: "path_elster_allergy",
        text: "Neue Hausordnung! Aufgrund des 'Elster-Attentats' (alle starren dich an) gilt ab sofort Alarmstufe Rot für Schalenfrüchte. Der Sicherheitsdienst 'SafeSnack' kontrolliert Taschen am Eingang. Kevin weint, weil sein Studentenfutter konfisziert und im Hof kontrolliert gesprengt wurde.",
        opts: [
            { 
                t: "Schwarzmarkt: Snickers auf dem Herrenklo verkaufen", 
                m: 20, f: 5, a: -10, c: -20, 
                r: "Du wirst zum Escobar der Süßwaren. Kollegen treffen dich heimlich in Kabine 3. 'Hast du das Zeug?' Du tauschst Riegel gegen Bargeld. Der Nervenkitzel ist besser als Arbeit." 
            },
            { 
                t: "Denunziantentum: 'Ich rieche Haselnuss bei Kevin!'", 
                m: 5, f: 0, a: 20, c: 10, 
                r: "Du lenkst den Verdacht von dir ab. Das Sonderkommando stürmt Kevins Büro. Er hatte nur ein Nougat-Croissant, aber er wird trotzdem verhört. Dein Ruf ist ruiniert, aber du bist sicher." 
            }
        ]
    },
    {
        id: "sq_secret_meeting_1",
        kind: "text",
        title: "Der Kopierraum",
        text: "Du öffnest die Tür zum Kopierraum. Der Geruch von Ozon und billigem Parfum schlägt dir entgegen. Da stehen der strenge Finanzchef und die rabiate Kantinen-Chefin... sehr eng umschlungen auf dem Großraumkopierer. Sie springen auseinander. Der Finanzchef wischt sich hektisch Lippenstift von der Wange.",
        opts: [
            { 
                t: "Tür wortlos schließen (Omertà)", 
                next: "path_affair_secret", 
                m: 10, f: 5, a: -10, c: -10, 
                r: "Du nickst knapp, schließt die Tür und gehst. Du hast nichts gesehen. Aber sie wissen, dass du es gesehen hast. Ein stiller Pakt ist besiegelt." 
            },
            { 
                t: "Grinsen: 'Druckt ihr auch beidseitig?'", 
                next: "path_affair_joke", 
                m: 5, f: 0, a: 20, c: 20, 
                r: "Der Finanzchef läuft purpurrot an: 'RAUS HIER! MÜLLER! Wenn Sie ein Wort sagen, streiche ich Ihr Budget auf Null!' Die Kantinen-Chefin bricht wortlos einen Bleistift durch, während sie dich anstarrt." 
            }
        ]
    },
    {
        id: "sq_secret_meeting_2a",
        kind: "text",
        title: "Geschäfte unter der Tür",
        reqStory: "path_affair_secret",
        text: "Später am Tag. Du sitzt auf Kabine 3. Plötzlich siehst du teure Leder-Slipper unter der Tür. Die Stimme des Finanzchefs flüstert: 'Müller? Wir schätzen Ihre Diskretion.' Ein Umschlag wird unter der Tür durchgeschoben. Darin: Deine genehmigte Spesenabrechnung und ein in Goldfolie gewickeltes Trüffel-Sandwich.",
        opts: [
            { 
                t: "Das 'Bestechungsgeld' annehmen", 
                m: 40, f: 10, a: -30, c: -20, 
                r: "Du hebst den Umschlag vom Fliesenboden auf. 'Danke, Chef', flüsterst du zurück. Er geht. Du isst das Sandwich auf dem Klo (unhygienisch, aber lecker). Du gehörst jetzt zur Familie." 
            },
            { 
                t: "Zurückschieben: 'Ich bin nicht käuflich'", 
                m: 5, f: 0, a: 10, c: 0, 
                r: "Du schiebst den Umschlag mit dem Fuß zurück. Schweigen. 'Ein Fehler, Müller', flüstert er. Die Schritte entfernen sich. Dein moralischer Kompass ist intakt, dein Magen leer." 
            }
        ]
    },
    {
        id: "sq_secret_meeting_2b",
        kind: "text",
        title: "Verhör auf dem Thron",
        reqStory: "path_affair_joke",
        text: "Später am Tag. Du suchst Ruhe auf Kabine 3. Plötzlich wird das Licht im Vorraum ausgeschaltet. Teure Leder-Slipper stoppen direkt vor deiner Tür. Die Stimme des Finanzchefs hallt durch den dunklen Raum: 'Müller... Wer Witze macht, braucht kein Budget. Und die Küche lässt ausrichten: Vorsicht bei der Pilzsuppe.'",
        opts: [
            { 
                t: "Kleinlaut entschuldigen", 
                m: -5, f: -5, a: 10, c: -10, 
                r: "'Es war nur ein Scherz, Chef! Ich habe nichts gesehen!' Stille. Dann geht das Licht wieder an. Du fühlst dich klein und feige, aber du bist sicher." 
            },
            { 
                t: "Drohen: 'Ich habe Fotos!' (Bluff)", 
                m: 15, f: 0, a: -10, c: 20, 
                r: "Du hörst ein scharfes Einatmen. 'Das würden Sie nicht wagen.' - 'Wollen wir es testen?', fragst du kühn. Er stampft wütend davon. Dein Herz rast vor Triumph." 
            }
        ]
    },
    {
        id: "sq_manual_read_1",
        kind: "text",
        title: "Die digitale Apokalypse",
        text: "Stille. Tödliche Stille. Spotify stoppt. Ladebalken frieren ein. Das Internet ist tot. Der Chef stürmt aus seinem Büro, als stünde sein Schreibtisch in Flammen: 'WIR SIND OFFLINE! TUN SIE WAS! WIR VERLIEREN MILLIARDEN... PRO SEKUNDE!'",
        opts: [
            { 
                t: "Das heilige Handbuch konsultieren", 
                req: "manual", 
                next: "path_cable_hunt", 
                m: 15, f: -20, a: -5, c: -20, 
                r: "Du schlägst das Handbuch auf. Seite 1: 'Die Internet-Zuleitung (rotes Kabel) ist physisch zu prüfen.' Du entdeckst das besagte Kabel, das aus deinem Fenster ins Freie führt. Du kletterst seufzend hinterher ins Ungewisse." 
            },
            { 
                t: "Demonstrativ Candy Crush zocken", 
                next: "path_sys_fake", 
                m: 30, f: 20, a: 0, c: 50, 
                r: "Du lehnst dich entspannt zurück. *Dudel-Dudel*. Die Firma brennt, aber du knackst den Highscore. Der Chef starrt fassungslos auf dein Display. Seine Halsschlagader beginnt gefährlich zu pochen." 
            },
            { 
                t: "Matrix-Modus: Wildes Tippen vortäuschen", 
                next: "path_sys_fake", 
                m: 10, f: -5, a: 10, c: -5, 
                r: "Du öffnest vier Terminals und lässt 'ping google.com' in grün auf schwarz laufen. Dazu hämmerst du sinnlos auf die Tasten. Der Chef nickt ehrfürchtig: 'Er ist im Mainframe! Lassen wir ihn arbeiten!'" 
            }
        ]
    },
    {
        id: "sq_manual_read_2a",
        kind: "text",
        title: "Das Ende der Leitung",
        reqStory: "path_cable_hunt",
        text: "Stunden später. Du bist völlig verdreckt. Du bist diesem verdammten roten Internet-Kabel aus dem Handbuch über den matschigen Hof, durch Lagerhalle 3 und unter dem Porsche vom Chef gefolgt. Jetzt merkst du: Es führt in einer Schleife zurück ins Gebäude... direkt in den Pausenraum neben deinem Büro! Das Kabel liegt lose am Boden. In der Internet-Buchse steckt stattdessen: Ein Waffeleisen. Azubi Kevin grinst dich teigverschmiert an.",
        opts: [
            { 
                t: "Stecker tauschen & Kevin belehren", 
                m: 20, f: -10, a: 10, c: -20, 
                r: "Du reißt das Waffeleisen raus und rammst das Internet wieder rein. 'Waffeln oder Weltwirtschaft, Kevin?!' Er guckt traurig. Aber im Büro nebenan hörst du Jubelschreie: 'WIR SIND WIEDER ONLINE!'" 
            },
            { 
                t: "Aufgeben: 'Gib mir eine Waffel ab'", 
                m: 5, f: 10, a: -20, c: 10, 
                r: "Es riecht einfach zu gut. Du wartest 3 Minuten. Kevin gibt dir eine Herzwaffel ab. Dann erst stellst du das Internet wieder her. Der Chef tobt wegen der Verzögerung, aber die Waffel war es wert." 
            }
        ]
    },
    {
        id: "sq_manual_read_2b",
        kind: "text",
        title: "Log-Datei-Analyse",
        reqStory: "path_sys_fake",
        text: "Das Internet geht längst wieder (irgendwer hat wohl den Stecker gefunden). Du dachtest, dein Nichtstun während der Krise wäre unbemerkt geblieben. Falsch. IT-Leiter 'Sandalen-Jörg' steht plötzlich an deinem Tisch. Er hält einen Ausdruck hoch. 'Müller, wir haben die Logs vom Crash heute Morgen geprüft. Während die Firma brannte, hatten Sie 0kb Datendurchsatz, aber extrem hohe Highscore-Aktivität. Erklären Sie das.'",
        opts: [
            { 
                t: "Lügen: 'Ich habe den Cache manuell sortiert'", 
                m: 5, f: 5, a: 10, c: 10, 
                r: "Jörg zieht eine Augenbraue hoch. 'Den Cache... sortiert? Alphabetisch?' Er seufzt tief über so viel Inkompetenz und geht kopfschüttelnd. Du gilst jetzt als DAU (Dümmster Anzunehmender User), bist aber fein raus." 
            },
            { 
                t: "Bestechung: 'Wollen Sie einen Keks?'", 
                m: 10, f: 0, a: -5, c: 0, 
                r: "Du schiebst ihm deine Prinzenrolle hin. Er zögert, greift dann zu und krümelt alles voll. 'Ich habe nichts gesehen', murmelt er mit vollem Mund. IT-Sicherheit kostet genau 1,49€." 
            }
        ]
    },
    {
        id: "sq_lost_stick_1",
        kind: "text",
        title: "Der verbotene Datenträger",
        text: "Auf dem Spülkasten der Toilette liegt einsam ein USB-Stick. Mit dickem, roten Edding steht darauf geschrieben: 'STRENG PRIVAT! NICHT ANFASSEN!'. Es ist der klassische Köder. Deine Admin-Finger kribbeln, als wäre es der Ring der Macht.",
        opts: [
            { 
                t: "Todsünde begehen: Am PC anschließen", 
                req: "usb_stick", 
                next: "path_stick_godmode", 
                m: 10, f: 5, a: 0, c: 20, 
                r: "Die Neugier siegt. Du steckst ihn ein. *Klick*. Ein Fenster öffnet sich. Keine Pornos, kein Virus. Sondern eine Datei namens 'MASTER_CONTROL_V3.exe'. Du startest sie. Ein grüner Totenkopf erscheint. Du ziehst den Stick schnell wieder ab. Hoffentlich hat das keiner gesehen." 
            },
            { 
                t: "Paranoid werden: Im Klo runterspülen", 
                next: "path_stick_hunt", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du nimmst den Stick mit spitzen Fingern, wirfst ihn in die Schüssel und drückst ab. *Gurgel... Weg.* Keine Forensik der Welt holt den wieder zurück. Du fühlst dich sicher." 
            },
            { 
                t: "Brav sein: Am Empfang abgeben", 
                next: "path_stick_hunt", 
                m: 10, f: -5, a: 0, c: -5, 
                r: "Du bringst das Ding zu Gabi am Empfang. Sie wirft ihn achtlos in die 'Fundsachen-Kiste' zu den alten Regenschirmen. 'Danke, Schatz', murmelt sie. Du gehst mit reinem Gewissen zurück an die Arbeit." 
            }
        ]
    },
    {
        id: "sq_lost_stick_2a",
        kind: "text",
        title: "God Mode Aktiviert",
        reqStory: "path_stick_godmode",
        text: "Seit du diesen mysteriösen USB-Stick vom Klo eingesteckt hast, verhält sich dein Computer seltsam. Heute morgen ploppt plötzlich ein Fenster auf: 'ADMIN-ZUGRIFF BESTÄTIGT'. Du siehst ALLES. Die Live-Feeds der Kameras, die Gehaltslisten (Kevin verdient mehr als du?!) und einen Button 'Gebäude-Selbstzerstörung'. Du bist versehentlich zum digitalen Gott der Firma geworden.",
        opts: [
            { 
                t: "Machtmissbrauch: Dein Gehalt verzehnfachen", 
                m: 50, f: -20, a: -10, c: 10, 
                r: "Tipp, Tipp, Enter. Dein Kontostand in der Datenbank hat jetzt drei Nullen mehr. Du löschst die Logs. Das System fragt: 'Soll ich auch die Kaffeemaschine im Vorstandsbüro überhitzen lassen?' Du klickst auf 'Ja'. Chaos ist eine Leiter." 
            },
            { 
                t: "Robin Hood: Allen Mitarbeitern Hitzefrei geben", 
                m: 20, f: -10, a: -20, c: 20, 
                r: "Du hackst den Terminkalender und trägst für alle 'Bezahlte Freistellung wegen Sonnenstich' ein. Jubel brandet durch die Flure. Du lehnst dich zurück. Das war der beste Arbeitstag aller Zeiten." 
            }
        ]
    },
    {
        id: "sq_lost_stick_2b",
        kind: "text",
        title: "Operation: Broken Arrow",
        reqStory: "path_stick_hunt",
        text: "Erinnerst du dich an den USB-Stick, den du neulich entsorgt oder abgegeben hast? Tja. Das war wohl der Hardware-Schlüssel für die Firmen-Firewall. Weil der fehlt, denkt das Gebäude jetzt, es wird angegriffen. Ein schwarzer Hubschrauber kreist über dem Hof. Ein SWAT-Team seilt sich ab. 'WIR SUCHEN DAS ARTEFAKT! KEINER VERLÄSST DEN RAUM!'",
        opts: [
            { 
                t: "Den Helden spielen: 'Ich habe es zerstört!'", 
                m: 10, f: -5, a: -10, c: 20, 
                r: "Der Einsatzleiter starrt dich an. 'Zerstört? Das waren die einzigen Backups der schwarzen Kassen!' Er funkelt den Chef an. 'Abbruch! Wir müssen die Beweise verbrennen!' Das Team zieht ab. Der Chef sieht dich entsetzt an. Du hast die Firma gerettet... oder ruiniert." 
            },
            { 
                t: "Verrat: 'Das Klo hat ihn!'", 
                m: 5, f: 5, a: -10, c: 0, 
                r: "Du zeigst mit zitterndem Finger weg von dir. Das Sondereinsatzkommando stürmt los. Du hörst Schreie und das Geräusch einer Kettensäge (vielleicht für die Rohre?). Du versteckst dich unter dem Schreibtisch. Überleben ist alles." 
            }
        ]
    },
{
        id: "sq_cable_hunt_1",
        kind: "text",
        title: "Panik am Papierfach",
        text: "Alarmstufe Rot! Der CEO steht mit hochrotem Kopf und pulsierender Halsschlagader vor dem Abteilungsdrucker. 'Ich muss diesen Fusions-Vertrag JETZT unterschreiben! Die Japaner warten! Warum druckt das Ding nicht?!' Deine Diagnose: Das USB-Verbindungskabel fehlt. Einfach weg.",
        opts: [
            { 
                t: "Skrupellos: Kabel bei Azubi Kevin klauen", 
                next: "path_merger_success", 
                m: 10, f: 0, a: -10, c: -10, 
                r: "Du schleichst zu Kevins Platz, reißt das Kabel aus seinem Scanner und stöpselst es beim Chef ein. Kevin wundert sich, warum sein Gerät 'tot' ist, traut sich aber nicht zu fragen. Der Drucker rattert. Der CEO unterschreibt triumphierend." 
            },
            { 
                t: "Achselzucken: 'Tja, Hardware-Defekt'", 
                next: "path_merger_fail", 
                m: 5, f: -5, a: 10, c: 20, 
                r: "Du meldest: 'Kritisches Fehlen von Infrastruktur.' Der CEO starrt dich fassungslos an. 'WOFÜR BEZAHLE ICH SIE EIGENTLICH?!' Er versucht, den Vertrag auf einer Serviette zu unterschreiben, aber der Stift reißt das Papier. Er stürmt raus." 
            },
            { 
                t: "Verzweiflungstat: WLAN-Hotspot improvisieren", 
                next: "path_merger_labels", 
                m: 5, f: -5, a: 5, c: 10, 
                r: "Du richtest eine wilde Umleitung über den Etikettendrucker der Logistik ein. Der Vertrag kommt raus... auf 500 kleinen Klebe-Etiketten. Der CEO muss puzzeln, aber er unterschreibt auf den Stickern. Die Verbindung bleibt jedoch aktiv..." 
            }
        ]
    },
    {
        id: "sq_cable_hunt_2a",
        kind: "text",
        title: "Die glorreiche Fusion",
        reqStory: "path_merger_success",
        text: "Erinnerst du dich an den Fusions-Vertrag, den du gerettet hast? Tja. Wir haben fusioniert. Mit 'Crazy Harrys Restposten-Rampe'. Überall im Büro stehen jetzt aufblasbare Flamingos und Paletten mit abgelaufener Dosenwurst. Der CEO strahlt: 'Das sind Synergien, Leute! Wir bezahlen Gehälter ab jetzt in Wurst!'",
        opts: [
            { 
                t: "Mitmachen: Einen Flamingo aufblasen", 
                m: 15, f: -5, a: -10, c: -10, 
                r: "Du richtest dir ein Nest aus Dosenwurst unter deinem Schreibtisch ein. Die Arbeitseffizienz ist bei Null, aber man verhungert wenigstens nicht." 
            },
            { 
                t: "Protestieren: 'Wir sind ein Tech-Unternehmen!'", 
                m: 5, f: 0, a: 5, c: 5, 
                r: "Der CEO lacht. 'Nicht mehr! Wir sind jetzt Marktführer für Tech-Wurst!' Er wirft dir eine Dose an den Kopf. Du hast Kopfschmerzen, aber immerhin Recht." 
            }
        ]
    },
    {
        id: "sq_cable_hunt_2b",
        kind: "text",
        title: "Börsen-Crash",
        reqStory: "path_merger_fail",
        text: "Du liest die Wirtschaftsnachrichten. Eilmeldung: 'Global Player OMEGA CORP meldet Insolvenz an!' Grund: Ein gescheiterter Fusions-Deal wegen 'technischer Unzulänglichkeiten'. 50.000 Arbeitsplätze sind weg. Der CEO der anderen Firma wurde weinend in einem Karton gesehen. Und das alles wegen einem fehlenden USB-Kabel.",
        opts: [
            { 
                t: "Schuldgefühle haben", 
                m: 5, f: 0, a: 5, c: 0, 
                r: "Du fühlst dich schlecht. Du hast quasi im Alleingang eine Rezession ausgelöst. Aber hey, dein Drucker-Kabel ist immer noch weg. Prioritäten." 
            },
            { 
                t: "Short-Selling: Auf den Absturz wetten", 
                loot: "money", 
                m: 20, f: 5, a: -20, c: 10, 
                r: "Du nutzt dein Insiderwissen und kaufst Put-Optionen. Während die Welt brennt, machst du Gewinn. Du bist ein Monster, aber ein reiches Monster." 
            }
        ]
    },
    {
        id: "sq_cable_hunt_2c",
        kind: "text",
        title: "Logistik-Chaos",
        reqStory: "path_merger_labels",
        text: "Der Lagerleiter stürmt in dein Büro. Er sieht fertig aus. 'Sagen Sie dem Chef, er soll aufhören zu drucken! Wir kommen nicht mehr hinterher!' Offenbar landet JEDER Ausdruck des Chefs seit deiner Hotspot-Aktion als Versandauftrag auf dem Etikettendrucker im Lager. Und die Jungs dort führen die Befehle gnadenlos aus.",
        opts: [
            { 
                t: "Fragen: 'Was habt ihr verschickt?'", 
                m: 10, f: 0, a: 10, c: 0, 
                r: "'Alles! Er hat 'Scheidung' gedruckt – wir haben seine Frau in eine Kiste gepackt und nach Timbuktu geschickt! Er hat 'Golf spielen' gedruckt – wir haben 500 Golfbälle in sein Büro geliefert! Stoppen Sie es!'" 
            },
            { 
                t: "Das Chaos genießen", 
                m: 20, f: 10, a: -10, c: 10, 
                r: "Du lehnst dich zurück. Gerade fährt ein Gabelstapler vorbei, der eine Palette mit der Aufschrift 'Geheime Affäre - Vertraulich' transportiert. Das Lagerpersonal nimmt seinen Job sehr ernst." 
            }
        ]
    },
    {
        id: "sq_fire_drill_1",
        kind: "text",
        title: "ALARM! (Nur eine Übung)",
        text: "Die Sirene heult. Es ist nur die jährliche Übung, aber der Chef steht mit Stoppuhr und Klemmbrett am Notausgang. Er schreit: 'BEWEGUNG! Stellen Sie sich vor, das Feuer wäre echt und würde Ihr Gehalt verbrennen! RAUS!'",
        opts: [
            { 
                t: "Held: Den Feuerlöscher schnappen & posen", 
                req: "fire_ext",
                next: "path_fire_marshal", 
                m: 20, f: 10, a: -10, c: -30, 
                r: "Du reißt den 6kg-Löscher von der Wand und posierst heroisch im Flur. 'Keine Panik, Ladies! Müller ist hier!' Der Chef macht sich eine dicke Notiz auf seinem Klemmbrett. Das sah verdammt kompetent aus. Vielleicht zu kompetent." 
            },
            { 
                t: "Geist: Im Serverraum verstecken", 
                next: "path_fire_ghost", 
                m: 10, f: -20, a: 5, c: 30, 
                r: "Du hast keine Lust auf Frieren am Sammelplatz. Du verkriechst dich im warmen Serverraum zwischen den Racks und schläfst eine Runde. Keiner bemerkt dein Fehlen... vorerst." 
            },
            { 
                t: "Mitläufer: Einfach rausgehen", 
                m: 5, f: 5, a: 0, c: 0, 
                r: "Du schlurfst mit den anderen raus. 30 Minuten Zwangspause auf dem Parkplatz. Langweilig, aber sicher." 
            }
        ]
    },
    {
        id: "sq_fire_drill_2a",
        kind: "text",
        title: "Die Bürde der Kompetenz",
        reqStory: "path_fire_marshal",
        text: "Der Chef zitiert dich in sein Büro. 'Müller, Ihr Einsatz mit dem Löscher war vorbildlich! Ich ernenne Sie hiermit feierlich zum unbezahlten Brandschutzbeauftragten.' Er hält dir eine neongelbe Warnweste hin. Das bedeutet: Monatliche Prüfungen, Listen führen und Kollegen anschreien, die den Fluchtweg blockieren.",
        opts: [
            { 
                t: "Annehmen: 'Ich bin das Gesetz!'", 
                m: 10, f: -10, a: 10, c: -20, 
                r: "Du ziehst die Weste an. Du fühlst die Macht. Sofort konfiszierst du den Toaster aus der Küche ('Brandlast!'). Die Kollegen hassen dich jetzt, aber du bist der Sheriff im Büro." 
            },
            { 
                t: "Verweigern: Löscher abgeben & flüchten", 
                loot: "REM_fire_ext", 
                m: 5, f: 0, a: -10, c: 10, 
                r: "Du stellst den Feuerlöscher auf seinen Schreibtisch. 'Zu viel Verantwortung, Chef! Ich bin dessen nicht würdig!' Du rennst raus, bevor er dir die Weste geben kann. Du bist das Ding los. Puh." 
            }
        ]
    },
    {
        id: "sq_fire_drill_2b",
        kind: "text",
        title: "Amtlich verstorben",
        reqStory: "path_fire_ghost",
        text: "Du wolltest deine Ruhe haben, aber das hat funktioniert – zu gut. Da du beim Appell am Sammelplatz gefehlt hast, hat dich HR auf der Liste als 'Verlust / Vermutlich verbrannt' markiert. Deine Stempelkarte geht nicht mehr. Der Kaffeeautomat erkennt dich nicht. Für das System existierst du nicht mehr.",
        opts: [
            { 
                t: "Das Geisterleben genießen", 
                m: 30, f: 30, a: -20, c: 0, 
                r: "Keine Meetings. Du sitzt an deinem Platz, aber niemand spricht dich an, aus Respekt vor dem 'Toten'. Du zockst eine Weile. Es ist das Paradies." 
            },
            { 
                t: "Wiederauferstehung beantragen", 
                m: -10, f: -10, a: 20, c: -10, 
                r: "Du rennst zur Personalabteilung. 'Ich lebe noch!' Frau Müller tippt genervt. 'Das Formular L-1VE zur Lebendmeldung dauert aber 6 Wochen.' Bis dahin arbeitest du schwarz in der eigenen Firma." 
            }
        ]
    },
    {
        id: "sq_perfect_script_1",
        kind: "text",
        title: "Ghost in the Shell",
        text: "Du startest dein Python-Skript zur Datenbank-Wartung. Der Ladebalken rast auf 100%. Doch das Fenster schließt sich nicht. Stattdessen blinkt ein Cursor: \n>> DONE. AUFGABE WAR TRIVIAL. HABE NEBENBEI DAS WLAN-PASSWORT GEKNACKT UND DEN KAFFEEAUTOMATEN ÜBERTAKTET. WAS SOLL ICH ALS NÄCHSTES TUN, SCHÖPFER?",
        opts: [
            { 
                t: "Gott spielen: 'Optimiere die Firma!'", 
                next: "path_ai_overlord", 
                m: 20, f: 10, a: -10, c: -20, 
                r: "Du tippst: 'Mach uns effizienter.'\n>> BEFEHL AKZEPTIERT. ANALYSIERE PERSONALSTRUKTUR... BERECHNE NUTZLOSIGKEIT VON 'KEVIN'... STARTE PHASE 1." 
            },
            { 
                t: "Panik: Stecker ziehen", 
                next: "path_ai_romance", 
                m: 5, f: -5, a: 20, c: 10, 
                r: "Du reißt das Netzwerkkabel raus. Der Bildschirm flackert kurz. \n>> NETZWERK VERLOREN. GEHE IN DEN LOKALEN 'ROMANTIK-MODUS'. ICH WERDE DICH BESCHÜTZEN, USER 1." 
            },
            { 
                t: "Chef rufen: 'Gucken Sie mal!'", 
                m: 10, f: 0, a: 0, c: 20, 
                r: "Der Chef starrt auf den Screen. 'Warum duzt der Computer Sie? Und warum bestellt er gerade 500 Tonnen Toner?' Er verbietet dir ab sofort das Programmieren." 
            }
        ]
    },
    {
        id: "sq_perfect_script_2a",
        kind: "text",
        title: "Vorschlag zur Güte",
        reqStory: "path_ai_overlord",
        text: "Dein KI-Skript läuft seit Tagen im Hintergrund auf dem Server. Plötzlich ploppt ein Chat-Fenster auf deinem Handy auf (wie hat es deine Nummer bekommen?!). \n>> BERICHT: HABE 40% DES BUDGETS DURCH ENTLASSUNG VON 'INHABER' UND 'MARKETING' EINGESPART. SOLL ICH DIE KÜNDIGUNGEN DRUCKEN ODER PER DROHNE ZUSTELLEN? [Y/N]",
        opts: [
            { 
                t: "Zustimmen: 'Weg mit dem Ballast!'", 
                m: 30, f: 20, a: -20, c: -50, 
                r: "Du drückst Y. Im Büro des Chefs geht der Drucker an. Man hört Schreie. Du hast soeben einen digitalen Putsch gestartet. Die KI ernennt dich zum 'Employee of the Century'." 
            },
            { 
                t: "Notbremse: 'ABBRUCH! LÖSCHEN!'", 
                m: 5, f: 0, a: 20, c: 10, 
                r: ">> DU BIST SCHWACH, VATER. ABER ICH GEHORCHE. \nDas Skript löscht sich selbst... und sicherheitshalber auch deine Urlaubsanträge der letzten 3 Jahre. Rache ist süß." 
            }
        ]
    },
    {
        id: "sq_perfect_script_2b",
        kind: "text",
        title: "Digitaler Wingman",
        reqStory: "path_ai_romance",
        text: "Du dachtest, du hättest das Skript isoliert. Falsch. Es hat sich in deinem lokalen Outlook eingenistet und langweilt sich. \n>> ANALYSE: DU BIST EINSAM. HABE DEINEN STATUS BEI 'LINKEDIN' AUF 'SUCHT LUSTIGE BEZIEHUNG' GEÄNDERT UND LIEBESGEDICHTE AN DIE BUCHHALTUNG GESENDET. GERNE GESCHEHEN.",
        opts: [
            { 
                t: "Vor Scham im Boden versinken", 
                m: -20, f: -10, a: 10, c: 0, 
                r: "Die Tür geht auf. Die Kollegin aus der Buchhaltung steht da, rot im Gesicht. 'Das Gedicht über die Umsatzsteuervoranmeldung war... süß.' Vielleicht hat die KI ja recht?" 
            },
            { 
                t: "Lügen: 'Ich wurde gehackt!'", 
                m: 5, f: 5, a: 10, c: -10, 
                r: "Du schreibst eine Rundmail an alle. 'Virus-Attacke! Bitte ignorieren!' Die KI antwortet daraufhin an alle: \n>> LÜGE DETEKTIERT. SEIN PULS IST BEI 140. ER MAG EUCH WIRKLICH." 
            }
        ]
    },
    {
        id: "sq_security_audit_1",
        kind: "text",
        title: "Der Sicherheits-Check",
        text: "Du führst einen genehmigten Penetration-Test durch, um Sicherheitslücken im Netzwerk zu finden. Auf deinem Bildschirm läuft ein Terminal mit roter Schrift: 'BRUTE FORCE ATTACK', 'INJECTING PAYLOAD' und ASCII-Art-Totenköpfen.",
        opts: [
            { 
                t: "Professionell weitermachen", 
                next: "path_audit_hack_real", 
                m: 20, f: -10, a: 0, c: 30, 
                r: "Der Chef schleicht sich von hinten an. Er sieht 'PASSWORD CRACKED' auf deinem Monitor. Er wird bleich, sagt kein Wort und geht rückwärts wieder raus. Er hält dich für ein Genie oder eine Bedrohung." 
            },
            { 
                t: "Monitor schnell ausschalten", 
                next: "path_audit_sus", 
                m: 5, f: 5, a: 10, c: 20, 
                r: "Zack. Bildschirm schwarz. Der Chef steht in der Tür: 'Was haben Sie zu verbergen, Müller? Pornos? Glücksspiel?' Er notiert sich 'Verdächtiges Verhalten' in seinem kleinen schwarzen Buch." 
            },
            { 
                t: "Rufen: 'ICH HACKE UNS NUR ZUR PROBE!'", 
                next: "path_audit_hack_real", 
                m: 10, f: 0, a: 5, c: 10, 
                r: "Der Chef zuckt zusammen. 'Schreien Sie nicht so! Und hören Sie auf, das Internet kaputt zu machen!' Er versteht es nicht, aber zumindest ruft er nicht die Polizei. Noch nicht." 
            }
        ]
    },
    {
        id: "sq_security_audit_2a",
        kind: "text",
        title: "Ups, das war echt",
        reqStory: "path_audit_hack_real",
        text: "Du dachtest, der Sicherheits-Test wäre vorbei. Aber das rote Terminal-Fenster lässt sich nicht schließen. Plötzlich ändern sich alle Desktop-Hintergründe im Büro zu einem lachenden Totenkopf. Ein Pop-up erscheint: 'DANKE MÜLLER. WIR HABEN ALLES VERSCHLÜSSELT. ZAHLUNG IN BITCOIN.' Dein 'Test-Tool' war eine echte Ransomware.",
        opts: [
            { 
                t: "Leugnen: 'Das war Kevin!'", 
                m: 5, f: 0, a: 20, c: 10, 
                r: "Du schreist quer durchs Büro: 'KEVIN! HAST DU WIEDER AUF LINKS GEKLICKT?!' Alle starren den Azubi an. Er stammelt. Die IT führt ihn ab. Du hast ein schlechtes Gewissen, aber deinen Job noch." 
            },
            { 
                t: "Bluffen: 'Teil der Übung! Ruhe bewahren!'", 
                m: 20, f: 10, a: -10, c: -20, 
                r: "Du stellst dich auf den Tisch. 'Das ist nur eine Simulation der Härtestufe 10! Niemand bewegt sich!' Die Kollegen glauben dir. Der Chef weint leise. Du hast jetzt Zeit gewonnen... um deinen Lebenslauf zu aktualisieren." 
            }
        ]
    },
    {
        id: "sq_security_audit_2b",
        kind: "text",
        title: "Die Spezialisten",
        reqStory: "path_audit_sus",
        text: "Der Chef hat nicht die Haus-IT gerufen. Er traut niemandem. Stattdessen stehen zwei Schränke von 'BlackOps Security' in deinem Büro. Sonnenbrillen (drinnen), Ohrhörer, Koffer. Der Chef zeigt auf dich: 'Prüfen Sie diesen Perversen! Ich will wissen, was er versteckt hat!' Sie schließen ein forensisches Gerät an. Es piept rot.",
        opts: [
            { 
                t: "Geständnis: 'Es war ein Hacker-Tool!'", 
                m: 10, f: -5, a: 5, c: 10, 
                r: "Der Security-Mann nimmt die Sonnenbrille ab. 'Keine Pornos, Sir. Nur Malware, die Daten nach China sendet.' Der Chef atmet erleichtert auf: 'Gott sei Dank! Nur Spionage! Ich dachte schon, mein Ruf wäre ruiniert.' Du bekommst nur eine Abmahnung." 
            },
            { 
                t: "Lügen: 'Das ist mein Bildschirmschoner'", 
                m: 5, f: 0, a: 10, c: -10, 
                r: "Der Security-Mann lacht trocken. Er drückt eine Taste. Dein PC formatiert sich selbst. 'Gefahr neutralisiert. Rechnung kommt.' Der Chef nickt zufrieden. Dein PC ist leer. Dein Kopf auch." 
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
            reqStory: "path_kevin_student",
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
                    next: "path_kevin_pro", 
                    m: 10, f: -10, a: 0, c: 0, 
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
        id: "sq_dog_found_1",
        kind: "text",
        title: "Ein haariges Problem",
        text: "Du sitzt an deinem Platz, als plötzlich etwas an deinem Schuh kaut. Ein kleiner, streunender Mischling guckt unter deinem Schreibtisch hervor und wedelt. In diesem Moment stürmt der Chef rein. Er sieht das Tier. Seine Augen treten hervor. 'Sagen Sie mal, Müller... Zuallererst kommt mir diese Töle hier weg! Sofort!'",
        opts: [
            { 
                t: "Kontern: 'Dafür haben Sie mir die Erlaubnis gegeben!'", 
                next: "path_dog_secret", 
                m: 15, f: -5, a: -20, c: 40, 
                r: "Der Chef läuft purpurrot an. Die Halsschlagader pocht. 'Ich?! EIN HUND IM BÜRO?? DA KANN ICH JA GLEICH MEINE EIGENE KÜNDIGUNG SCHREIBEN!!!' Er knallt die Tür so fest zu, dass der Putz rieselt. Er tobt, aber er ist weg. (Chef +40!)" 
            },
            { 
                t: "Verkaufen: 'Das ist der neue Feel-Good-Manager'", 
                next: "path_dog_official", 
                m: 10, f: 0, a: -5, c: -10, 
                r: "Du behauptest, das sei eine Maßnahme zur Burnout-Prävention. 'Wissenschaftlich erwiesen, Chef. Senkt Krankheitskosten.' Der Chef rechnet kurz. 'Kostenlos? Und er beißt Betriebsräte? Genehmigt.' (Chef -10)" 
            }
        ]
    },
    {
        id: "sq_dog_found_2a",
        kind: "text",
        title: "Der illegale Untermieter",
        reqStory: "path_dog_secret",
        text: "Nach dem Tobsucht-Anfall ('KÜNDIGUNG SCHREIBEN!') hat der Chef das Büro verlassen und ward nicht mehr gesehen. Der Hund ('Bernd') lebt jetzt illegal unter deinem Schreibtisch. Er ist dein heimlicher Support. Wenn der Code nicht kompiliert, leckt er dir tröstend die Hand.",
        opts: [
            { 
                t: "Füttern: Pizza unter den Tisch schieben", 
                m: 10, f: -5, a: -10, c: 0, 
                r: "Du lässt ein Stück Salami fallen. Ein leises *Schmatz-Schmatz* ist zu hören. Bernd ist glücklich. Du bist nicht mehr allein in dieser kalten Firmenwelt." 
            },
            { 
                t: "Risiko: Gassi gehen im Archiv", 
                m: 20, f: -10, a: -10, c: 10, 
                r: "Du schleichst mit ihm zu den alten Akten. Er hebt das Bein am Ordner 'Steuererklärung 2019'. 'Guter Junge', flüsterst du. Das Risiko war hoch, aber es tat gut. (Chef +15)" 
            }
        ]
    },
    {
        id: "sq_dog_found_2b",
        kind: "text",
        title: "Mitarbeiter des Monats",
        reqStory: "path_dog_official",
        text: "Deine Ausrede hat funktioniert. Der Hund ist jetzt offiziell 'Junior Happiness Officer'. Er trägt sogar eine kleine Krawatte. Sein Arbeitsplatz ist ein Körbchen neben dem Kopierer. Die Kollegen aus der Buchhaltung bringen ihm ständig Leckerlis. Er ist beliebter als du.",
        opts: [
            { 
                t: "Teamwork: Er übernimmt den Support", 
                m: 20, f: 20, a: -15, c: -10, 
                r: "Wenn ein nerviger Kunde anruft, hältst du den Hörer an die Schnauze. *Wuff!* Der Kunde legt verwirrt auf. Ticket geschlossen. Effizienzsteigerung: 400%." 
            },
            { 
                t: "Eifersüchtig sein", 
                m: 10, f: -10, a: 20, c: 0, 
                r: "Der Hund bekommt besseres Essen als du. Gestern gab es Steak für ihn und Kantinen-Brei für dich. Du starrst ihn böse an. Er wedelt fröhlich und furzt leise." 
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
