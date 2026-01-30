const DB = {
    // === ITEMS (Loot & Werkzeuge) ===
    items: {
        // VERBRAUCHSGEGENSTÄNDE (Einmalig)
        "wifi_note": { icon: "📝", name: "WLAN-Zettel" },
        "donut": { icon: "🍩", name: "Alter Donut" },
        "energy": { icon: "⚡", name: "Energy Drink" },
        "secret_list": { icon: "📁", name: "Schwarze Liste" },
		"arg_list_1": { icon: "📝", name: "Argumente (Ich)" }, 
        "arg_list_2": { icon: "📑", name: "Argumente (Kevin)" },
        
        // WERKZEUGE (Dauerhaft -> keep: true)
        "admin_pw": { icon: "🔑", name: "Root-Passwort", keep: true },
        "kabel": { icon: "🔌", name: "LAN-Kabel", keep: true },
        "tape": { icon: "🩹", name: "Panzertape", keep: true },
        "screw": { icon: "🪛", name: "Schraubendreher", keep: true },
        "stressball": { icon: "🔴", name: "Wut-Ball", keep: true },
        "manual": { icon: "📖", name: "Win95 Handbuch", keep: true },
        "usb_stick": { icon: "💾", name: "Boot-Stick", keep: true },
        "fire_ext": { icon: "🧯", name: "Feuerlöscher", keep: true },
        "hammer": { icon: "🔨", name: "Notfall-Hammer", keep: true },
        "zip_ties": { icon: "➰", name: "Kabelbinder", keep: true },
        "headphones": { icon: "🎧", name: "NC-Kopfhörer", keep: true },
        "black_card": { icon: "💳", name: "Schwarze Amex", keep: true },
		"kevin_ram": { icon: "📟", name: "Kevins Glücks-RAM", keep: true },
		"contract": { icon: "📜", name: "Neuer Arbeitsvertrag", keep: true }
    },
	
    // E-MAILS (Für das Popup System)
    emails: [
        { 
            sender: "HR Abteilung", 
            subj: "Kuchen in der Küche! (Bitte sauber hinterlassen)",
            body: "Liebe Kollegen, anlässlich des Geburtstags von Herrn Müller (Buchhaltung) steht Marmorkuchen in der Teeküche. \n\nHINWEIS: Wer krümelt, wird abgemahnt. Die Teller sind ABZUWASCHEN, nicht nur kurz mit kaltem Wasser abzuspülen! Wir sind hier nicht bei den Wilden.",
            opts: [
                { btn: "Sofort hinrennen!", txt: "Lecker! Aber du hast Krümel am Hemd.", f: 5, a: -5, c: 0 },
                { btn: "Beschwerde mailen", txt: "Du forderst Obst statt Kuchen. Alle hassen dich.", f: 0, a: 5, c: 0 }
            ]
        },
        { 
            sender: "Der Chef", 
            subj: "Wo sind Sie? Ich sehe Sie nicht am Platz.",
            body: "Müller! Ich stehe gerade an Ihrem Schreibtisch. Der Stuhl ist kalt. Das Terminal ist gesperrt. Wenn Sie nicht in 30 Sekunden wieder hier sind und produktiv aussehen, streiche ich Ihren Weihnachtsbonus für 2028! Sind Sie schon wieder rauchen?!",
            opts: [
                { btn: "Ehrlich: 'Klo'", txt: "Zu viel Info. Er legt angewidert auf.", f: 0, a: 0, c: 5 },
                { btn: "Lüge: 'Serverraum'", txt: "Gute Ausrede. Er glaubt es.", f: 0, a: 0, c: -5 }
            ]
        },
        { 
            sender: "Ticketsystem", 
            subj: "TICKET #9942: Maus brennt.",
            body: "PRIORITY: CRITICAL \nUSER: Gabi (Empfang) \nDESCRIPTION: 'Hilfe, aus meiner Maus kommt Rauch und es riecht nach verbranntem Plastik. Ich habe versucht, sie mit Kaffee zu löschen, jetzt funkt es blau.' \nSTATUS: OPEN",
            opts: [
                { btn: "Ticket löschen", txt: "Gelöscht. Problem gelöst (für dich).", f: 10, a: 0, c: 5 },
                { btn: "Feuerwehr rufen", txt: "Großeinsatz. Es war nur eine LED.", f: -5, a: 10, c: 10 }
            ]
        },
        { 
            sender: "Betriebsrat", 
            subj: "Einladung: 'Richtig Atmen am Arbeitsplatz'",
            body: "Namaste liebe Mit-Sklaven... äh Mitarbeiter. \n\nWir laden ein zum Workshop 'Atmen gegen den Burnout'. Wir lernen gemeinsam, wie man Wut in CO2 umwandelt. Es gibt vegane Dinkel-Kekse (glutenfrei, zuckerfrei, geschmacksneutral). Anwesenheit wird empfohlen.",
            opts: [
                { btn: "Teilnehmen", txt: "Du atmest. 30 Minuten nichts getan.", f: 15, a: -10, c: 5 },
                { btn: "Als Spam markieren", txt: "Weg damit. Zeit ist Geld.", f: 0, a: 5, c: 0 }
            ]
        },
        { 
            sender: "Facility Mgt", 
            subj: "Toiletten im 3. Stock gesperrt (Rohrbruch).",
            body: "ACHTUNG: Aufgrund eines... Vorfalls... mit einem nicht näher genannten Mitarbeiter und einer halben Rolle Papierhandtücher ist der Sanitärbereich im 3. OG gesperrt. Das Wasser steht 5cm hoch. Bitte Gummistiefel tragen oder einhalten.",
            opts: [
                { btn: "Rundmail: 'Danke Merkel'", txt: "Politische Diskussion ausgelöst. Chaos.", f: 10, a: 10, c: 10 },
                { btn: "Zur Kenntnis nehmen", txt: "Du gehst heute in den 2. Stock.", f: 0, a: 0, c: 0 }
            ]
        },
        { 
            sender: "IT-Sec", 
            subj: "Phishing-Test: Bitte hier klicken für Bonus!",
            body: "Lieber Mitarbeiter. \n\nWir haben festgestellt, dass Ihr Gehalt zu niedrig ist. Um Ihren sofortigen Bonus von 5.000 EUR zu erhalten, geben Sie bitte Ihr Windows-Passwort und den Namen Ihres ersten Haustiers auf der folgenden Seite ein: \n[LINK_ZUR_FALLE_KLICK_MICH]",
            opts: [
                { btn: "Klicken (Gier)", txt: "TEST NICHT BESTANDEN! Meldung an Chef.", f: 0, a: 10, c: 20 },
                { btn: "Melden", txt: "Vorbildlich. Du bekommst ein Sternchen.", f: 0, a: 0, c: -5 }
            ]
        },
        { 
            sender: "Azubi Kevin", 
            subj: "Hilfe!! Mein PC macht komische Geräusche",
            body: "Duuu? Mein PC macht so 'Krrrrtzzz Krrrrtzz' Geräusche und riecht komisch nach Strom. Ich hab mal fest dagegen getreten, jetzt raucht er ein bisschen. Ist das ein neues Feature? Soll ich Wasser drüberkippen?",
            opts: [
                { btn: "Antwort: 'Lauf weg!'", txt: "Kevin rennt schreiend raus.", f: 5, a: 0, c: 5 },
                { btn: "Hingehen", txt: "Es war der Lüfter. Du hast es gefixt.", f: -5, a: -5, c: -5 }
            ]
        },
        { 
            sender: "Vorstand (Verteiler: Alle)", 
            subj: "WG: Kündigungswelle Q4 (VERTRAULICH)",
            body: "Von: CEO \nAn: HR-Leitung \n\nWG: Sparmaßnahmen Q4 -- STRENG GEHEIM -- \n\nAnbei die Liste der 50 Mitarbeiter, die wir nächsten Monat entlassen müssen, um meinen Bonus zu sichern. Bitte diskret behandeln... \n\n(Ups, falscher Verteiler? Ignorieren Sie diese Mail!)",
            opts: [
                { btn: "Reply-All: 'WAS?!'", txt: "Panik in der ganzen Firma. Chef tobt.", f: 0, a: 20, c: 50 },
                { btn: "Löschen & Schweigen", txt: "Du weißt zu viel. Aber du lebst sicher.", f: 0, a: -5, c: -5 }
            ]
        },
        { 
            sender: "Chantal (Privat)", 
            subj: "Re: Wochenende",
            body: "Hey Schatz, der Chef ist so ein Idiot. Treffen wir uns im Archiv? Ich habe Kaffee und Kekse geschmuggelt. Niemand wird uns zwischen den Akten von 1990 finden. 😘", 
            opts: [
                { btn: "Petzen (Weiterleiten)", txt: "Chantal bekommt Ärger. Du bist gemein.", f: 0, a: -10, c: -10 },
                { btn: "Antwort: 'Falsche Adresse'", txt: "Peinlich berührt. Sie meidet dich.", f: 0, a: 0, c: 0 }
            ]
        },
        { 
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
            sender: "Verteiler: ALLE (Re: Re: Re: Katze)", 
            subj: "AW: AW: AW: Wer vermisst 'Mimi'?",
            body: "BITTE NEHMEN SIE MICH AUS DIESEM VERTEILER!!!! ICH HABE KEINE KATZE!!! DAS IST EINE ARBEITSE-MAIL!!! (Vorherige Nachricht von Gabi: 'Oh wie süß, ist die flauschig!'). (Vorherige Nachricht von Klaus: 'Mimi ist wieder da, danke an alle!').",
            opts: [
                { btn: "Reply-All: 'RUHE!'", txt: "Du hast zur Eskalation beigetragen. Jetzt antworten 50 Leute 'Hör auf, an alle zu antworten!'. Mailserver raucht.", f: 0, a: 20, c: 10 },
                { btn: "Filter-Regel erstellen", txt: "Du filterst 'Mimi' direkt in den Papierkorb. Himmlische Ruhe.", f: -5, a: -10, c: 0 }
            ]
        },
        { 
            sender: "Chantal (Marketing)", 
            subj: "Wording Check - ASAP!!!",
            body: "Hiiii! 👋 Wir drucken gleich die Flyer für die Messe. Kannst du kurz drüberschauen? Da steht: 'Unsere Cloud-Lösung synergiert mit der Blockchain-KI, um das WLAN-Kabel zu optimieren.' Klingt das techy genug? Brauche das GO in 2 Minuten!!! 😘",
            opts: [
                { btn: "Antwort: 'Perfekt!'", txt: "Du hast den Unsinn durchgewunken. Die IT-Community wird uns auslachen, aber Chantal ist glücklich.", f: 10, a: -5, c: 0 },
                { btn: "Korrigieren (Aufwand)", txt: "Du erklärst ihr, dass es keine WLAN-Kabel gibt. Sie versteht es nicht. 'Aber das klingt doch gut!'", f: -10, a: 10, c: 0 }
            ]
        },
        { 
            sender: "Hausmeister Krause", 
            subj: "Kühlschrank Etage 3",
            body: "Moin. Ich habe im Kühlschrank eine Tupperdose gefunden, auf der steht 'Mittagessen 2019'. Der Inhalt hat mittlerweile Pelz und knurrt mich an, wenn ich das Licht anmache. Der Besitzer möge sich bitte mit einem Flammenwerfer bei mir melden, sonst entsorge ich das samt Kühlschrank.",
            opts: [
                { btn: "Das ist meins!", txt: "Du rettest dein... was auch immer das war. Es riecht übel.", f: 0, a: 5, c: 0 },
                { btn: "Ignorieren", txt: "Nicht dein Problem. Soll es doch brennen.", f: 5, a: 0, c: 0 }
            ]
        },
        { 
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
            sender: "H. Wuttke (Buchhaltung)", 
            subj: "HILFE! EXCEL IST ROT!",
            body: "Herr IT!!! Ich habe nichts gemacht, ehrlich! Ich wollte nur die Spalte G löschen und jetzt ist alles rot und blinkt! Die Bilanz muss in 10 Minuten raus! Wenn das weg ist, bin ich tot! Kommen Sie sofort her! Warum passiert das immer mir?!",
            opts: [
                { btn: "Ticket verlangen", txt: "Du schreibst zurück: 'Bitte Ticket aufmachen.' Eiskalt.", f: 5, a: -5, c: 5 },
                { btn: "Hingehen", txt: "Er saß auf der 'Entf'-Taste. Problem gelöst in 2 Sekunden.", f: -10, a: 10, c: -5 }
            ]
        },
        { 
            sender: "Betriebsrat", 
            subj: "Einladung: Stuhlkreis 'Achtsamkeit'",
            body: "Liebe Kollegen, aufgrund des hohen Stresslevels bieten wir heute um 14 Uhr einen Stuhlkreis an. Wir werden gemeinsam atmen und unsere Namen tanzen. Es gibt vegane Dinkelkekse. Teilnahme ist freiwillig (aber wird notiert).",
            opts: [
                { btn: "Hingehen (Pause)", txt: "Du hast 1 Stunde geatmet. Faulheit +20. Aber die Kekse waren trocken.", f: 20, a: -10, c: 5 },
                { btn: "Als Spam markieren", txt: "Weg damit. Ich habe echte Arbeit.", f: 0, a: 5, c: 0 }
            ]
        },
        { 
            sender: "IT-Security (Auto)", 
            subj: "Passwort abgelaufen",
            body: "Ihr Passwort ist seit 90 Tagen gültig. Bitte ändern. Neue Richtlinie: Mindestens 32 Zeichen, 1 Sonderzeichen, 1 Hieroglyphe, 1 Tropfen Blut. Das neue Passwort darf nicht identisch mit den letzten 500 Passwörtern sein.",
            opts: [
                { btn: "Passwort123!", txt: "System: 'Zu unsicher'. Aggro steigt.", f: 0, a: 10, c: 0 },
                { btn: "Kopf auf Tastatur hauen", txt: "System: 'Passwort akzeptiert'. Perfekt.", f: 0, a: -5, c: 0 }
            ]
        },
        { 
            sender: "Tante Erna (Privat)", 
            subj: "FWD: FWD: FWD: Lustig!!!!",
            body: "Schau mal Junge, das musst du sehen! 😂😂😂 Die Katze fällt vom Stuhl! Ich habe mich so weggeschmissen! Zeig das mal deinen Kollegen! LG Tante Erna. PS: Wie geht das Internet an? (Anhang: lustig.ppt.exe - 50MB)",
            opts: [
                { btn: "Anhang öffnen", txt: "VIRUS-ALARM! Es war Malware. Der Scanner schreit. Du musst den PC bereinigen.", f: -20, a: 20, c: 20 },
                { btn: "Nett antworten", txt: "Du lügst: 'Haha, sehr lustig Tante Erna.'", f: 0, a: -5, c: 0 }
            ]
        },
        { 
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
            sender: "H. Wuttke (Buchhaltung)", 
            subj: "(Kein Betreff)",
            body: "Gulasch Rezept einfach schnell ohne Paprika",
            opts: [
                { btn: "Antworten: 'Das ist Outlook, Horst.'", txt: "Er antwortet: 'Danke, Outlook. Bestell bitte auch Sahne.'", f: 5, a: 0, c: 0 },
                { btn: "Chef in CC setzen", txt: "Das war gemein. Wuttke muss zum PC-Grundkurs. Er guckt dich traurig an.", f: 0, a: -5, c: 5 }
            ]
        },
		{ 
            sender: "Sabine (Empfang)", 
            subj: "WER HAT MEINE TUPPERDOSE?!",
            body: "Das ist jetzt das dritte Mal! Meine rote Dose mit dem Aufkleber 'SABINE' ist weg! Ich durchsuche jetzt alle Schreibtische! Wenn ich sie finde, gnade euch Gott! Ich rufe die Polizei!",
            opts: [
                { btn: "Reply-All: 'Chill mal'", txt: "Fehler! Sabine rastet aus. Sie wirft einen Tacker durchs Büro. Du musst dich unter dem Tisch verstecken.", f: 0, a: 30, c: 10 },
                { btn: "Löschen", txt: "Nicht dein Problem. Sollen sie sich doch prügeln.", f: 5, a: 0, c: 0 }
            ]
        },
		{ 
            sender: "SYSTEM ALERT (Automated)", 
            subj: "CRITICAL: Suspicious Login (CEO Account)",
            body: "Detected Login attempt for user 'CEO' from IP Address: 192.168.x.x (Location: Pyongyang, North Korea). Success: TRUE. \nAction required immediately!",
            opts: [
                { btn: "Account sofort sperren", txt: "Du hast den CEO mitten in einer Videokonferenz rausgeworfen. Er ist sauer, aber du hast die Firma vor Nordkorea gerettet. Held!", f: -10, a: 0, c: -20 },
                { btn: "Ignorieren (VPN Fehler?)", txt: "Es war kein VPN. Alle Firmendaten sind jetzt im Darknet. Der Aktienkurs fällt auf 0.", f: 0, a: 50, c: 100 }
            ]
        },
		{ 
            sender: "Jürgen (Vertrieb)", 
            subj: "Brauche Admin-Rechte GANZ SCHNELL",
            body: "Ich muss dieses PDF für den Kunden umwandeln. Hab da so ein Tool gefunden 'Free_PDF_Converter_Pro_Cracked.exe'. Windows meckert rum wegen Virus, aber das ist Fehlalarm. Gib mal Passwort, Kunde wartet!!!",
            opts: [
                { btn: "Passwort eingeben (Genervt)", txt: "ZACK. Ransomware. Alles verschlüsselt. Ein Totenkopf lacht auf deinem Monitor.", f: 0, a: 50, c: 50 },
                { btn: "Hingehen & 'Nein' sagen", txt: "Du erklärst ihm Sicherheit. Er hört nicht zu, aber du hast die Installation verhindert.", f: -10, a: 10, c: 0 }
            ]
        },
		{ 
            sender: "HR Feel Good Management", 
            subj: "PFLICHT-TEILNAHME: Die 'Lach-Yoga' Pause",
            body: "Um die Moral zu heben, treffen wir uns alle um 11:00 im Flur zum synchronen Lachen! 'Hahaha hihihi'! Wer nicht lacht, kriegt einen Eintrag in die Akte wegen negativer Einstellung! 😊😊😊",
            opts: [
                { btn: "Hingehen & mitmachen", txt: "Du stehst im Flur und machst 'Hahaha'. Du stirbst innerlich. Aber HR ist zufrieden.", f: 10, a: 20, c: -5 },
                { btn: "Filter-Regel: 'Löschen'", txt: "Du arbeitest weiter. Später fragt HR, warum du so negativ bist.", f: 0, a: -5, c: 10 }
            ]
        },
		{ 
            sender: "Chantal (Marketing)", 
            subj: "Mein Mac ist zu laaangsam!!! 😭",
            body: "Ich kann so nicht arbeiten! Wenn ich Spotify, Photoshop, 50 Chrome-Tabs und Sims 4 gleichzeitig offen habe, ruckelt die Maus! Ich brauche das neue MacBook Pro M3 Max mit 96GB RAM! SOFORT! Sonst sag ich's Papa (dem CEO)!",
            opts: [
                { btn: "Bestellen (Ruhe haben)", txt: "Du hast 5000€ Budget verbrannt. Chantal nutzt die Power für Instagram. Der Finanz-Chef hasst dich.", f: 10, a: -10, c: 20 },
                { btn: "Task-Manager aufräumen", txt: "Du schließt 'Sims 4'. PC läuft wieder. Chantal schmollt.", f: -5, a: 5, c: 0 }
            ]
        },
		{ 
            sender: "Kanzlei Abmahn & Söhne", 
            subj: "ABMAHNUNG: Urheberrechtsverletzung",
            body: "Sehr geehrte Damen und Herren, über Ihren Anschluss wurde gestern der Film 'Barbie vs. Oppenheimer' illegal getauscht. Wir fordern 900€ oder wir verklagen Sie auf Millionen.",
            opts: [
                { btn: "Logs prüfen (Wer war's?)", txt: "Es war der Azubi Kevin. Du lässt ihn die 900€ vom Taschengeld zahlen. Lektion gelernt.", f: -10, a: 0, c: -5 },
                { btn: "Panik: Alles löschen", txt: "Du löscht die Beweise. Jetzt haftet die Firma. Der Chef muss zahlen und tobt.", f: 0, a: 20, c: 30 }
            ]
        },
		{ 
            sender: "Alle (Verteiler)", 
            subj: "HEIZUNG AUF 5!!!",
            body: "Mir ist kalt! Ich habe die Heizung jetzt auf 5 gedreht und den Knauf abgebrochen, damit es so bleibt! Wer das Fenster aufmacht, fängt sich eine! LG, Frau Frost (Buchhaltung)",
            opts: [
                { btn: "Fenster heimlich öffnen", txt: "Du sorgst für Frischluft. Frau Frost niest und wirft dir böse Blicke zu.", f: 5, a: 5, c: 0 },
                { btn: "In Badehose arbeiten", txt: "Es sind 35 Grad im Büro. Du schwitzt. Die Produktivität liegt bei Null.", f: 10, a: 10, c: 5 }
            ]
        },
		{ 
            sender: "Bernd (Vertrieb)", 
            subj: "FWD: FWD: Unbedingt lesen sonst Unglück!!!",
            body: "Das ist der Geist des toten Servers! 👻 Schicke diese Mail an 10 Kollegen, oder dein WLAN wird für immer langsam sein! Ignorier das nicht, meinem Cousin ist das passiert!!!",
            opts: [
                { btn: "An Alle weiterleiten", txt: "Du hast den Mailserver lahmgelegt. 500 Leute hassen dich jetzt.", f: 0, a: 20, c: 20 },
                { btn: "Bernd sperren", txt: "Bernd landet auf der Blacklist. Endlich Ruhe.", f: 0, a: -5, c: 0 }
            ]
        },
		{ 
            sender: "Der Vorstand", 
            subj: "WICHTIG: Ihr diesjähriger Bonus",
            body: "Liebe Mitarbeiter, aufgrund des Rekordumsatzes haben wir beschlossen, Ihnen etwas zurückzugeben! Statt einer langweiligen Geldprämie erhält jeder von Ihnen... einen Gutschein für 5% Rabatt in der Kantine (gültig nur Montags)! Danke für Ihren Einsatz!",
            opts: [
                { btn: "Mail ausdrucken & verbrennen", txt: "Das kleine Feuer im Mülleimer wärmt dein kaltes Herz. Aggro sinkt leicht.", f: 5, a: -10, c: 0 },
                { btn: "Dankesmail schreiben", txt: "Du schleimst dich ein. Die Kollegen nennen dich 'Verräter', aber der Chef merkt es sich positiv.", f: 0, a: 10, c: -10 }
            ]
        },
		{ 
            sender: "Amaz0n-Gewinnspiel-Official", 
            subj: "HERZLICHEN GLÜCKWUNSCH! iPhone 15 gewonnnen!!!",
            body: "Hallo Kunde. Du wurdest ausgewählt! Klicke HIER um dein iPhone 15 Pro Max (Titan) sofort zu erhalten! Nur noch 5 Minuten gültig! 📱🎁",
            opts: [
                { btn: "KLICKEN! (Gier)", txt: "Ein Fenster poppt auf: 'DIES WAR EIN PHISHING-TEST DER IT! SIE SIND DURCHGEFALLEN!' Du musst jetzt ein 4-stündiges Security-Video gucken. Dein Tag ist gelaufen.", f: -20, a: 50, c: 20 },
                { btn: "Als Phishing melden", txt: "Die IT antwortet: 'Gut gemacht, Müller. Sie haben als einziger nicht geklickt.' Ein Fleißsternchen im System.", f: 0, a: -5, c: -10 }
            ]
        },
		{ 
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
            sender: "Du (Gedanken)", 
            subj: "Falschparker auf Parkplatz 42",
            body: "Du schaust aus dem Fenster. Ein fetter, neuer Porsche SUV steht quer auf DEINEM Parkplatz! Dreistigkeit siegt?!",
            opts: [
                { btn: "Abschleppdienst rufen!", txt: "Der Abschlepper kommt und zieht den Porsche weg. Du fühlst Genugtuung. 10 Min später brüllt der CEO: 'WER HAT MEINEN LEIHWAGEN ABSCHLEPPEN LASSEN?!' Oh Mist...", f: 0, a: 50, c: 80 },
                { btn: "Scheibenwischer hochklappen", txt: "Ein kleiner, passiv-aggressiver Racheakt. Fühlt sich gut an und keiner hat's gesehen.", f: 0, a: -10, c: 0 }
            ]
        },
		{ 
            sender: "Chantal (Marketing)", 
            subj: "Brainstorming: Name für den Drucker 🖨️✨",
            body: "Heeey Team! Wir wollen den Druckern 'Persönlichkeit' geben! Bitte kommt alle in den Meetingraum 'Unicorn' und bringt Ideen mit! Es gibt vegane Kekse (aus Sägemehl)!",
            opts: [
                { btn: "Hingehen & 'Drucki McDruckface' vorschlagen", txt: "Alle starren dich an. Chantal findet es 'uninspiriert'. Du hast 30 Minuten Lebenszeit verschwendet.", f: 10, a: 15, c: 0 },
                { btn: "Antworten: 'Papierstau-Paulus'", txt: "Deine E-Mail wird ignoriert, aber du musstest wenigstens nicht aufstehen.", f: 5, a: -5, c: 0 }
            ]
        },
		{ 
            sender: "Ehemaliger Mitarbeiter (via Anwalt)", 
            subj: "DSGVO Auskunft Art. 15",
            body: "Hiermit fordere ich Sie auf, mir binnen Frist ALLE Daten zu senden, die Sie über mich gespeichert haben. Auch Chat-Logs und interne Notizen!",
            opts: [
                { btn: "Alles senden (ehrlich)", txt: "Du schickst ihm auch die Chat-Logs, wo der Chef ihn 'Niete' nennt. Er verklagt die Firma wegen Mobbing. Der Chef tobt.", f: -10, a: 20, c: 60 },
                { btn: "Standard-Textbaustein senden", txt: "Du schickst ein nichtssagendes PDF: 'Wir haben keine Daten'. Er gibt Ruhe. Bürokratie besiegt.", f: 5, a: -5, c: -5 }
            ]
        },
		{ 
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
            sender: "Hausmeister Egon", 
            subj: "Fundsache: Roter Ball",
            body: "Moin. Hab beim Fegen so nen roten Knet-Ball gefunden. Klebt unterm Heizkörper im Flur. Vermisst den wer? Wenn nicht, kriegt ihn mein Dackel.",
            opts: [
                { btn: "Meiner! (Holen)", loot: "stressball", m: 5, f: 0, a: -5, c: 0, r: "Du holst den Ball bei Egon ab. Er ist voller Staub, aber noch gut. Inventar +1." },
                { btn: "Schenk ihn dem Dackel", m: 0, f: 5, a: 0, c: 0, r: "Egon freut sich. Du hast ein gutes Werk getan. Der Dackel liebt dich jetzt." },
                { btn: "Ignorieren", m: 0, f: 0, a: 0, c: 0, r: "Der Ball ist weg. Du hast eine Chance auf Stressabbau verpasst." }
            ]
        },
        { 
            sender: "HR (Automated)", 
            subj: "Ihr Urlaubsantrag 2028",
            body: "Status-Update zu Ihrem Antrag 'Sommerurlaub': ABGELEHNT. \nBegründung: 'Zu dieser Zeit könnte theoretisch ein Server ausfallen. Wir brauchen Sie stand-by.'",
            opts: [
                { btn: "Widerspruch einlegen", m: 30, f: -10, a: 20, c: 10, r: "Du schreibst eine zweiseitige Mail mit Gesetzes-Auszügen. HR antwortet nicht, aber du fühlst dich im Recht." },
                { btn: "Krankenschein planen", m: 5, f: 10, a: -10, c: 0, r: "Wenn du nicht frei kriegst, bist du halt 'krank'. Du grinst böse und planst deinen 'Husten'." },
                { btn: "Akzeptieren (Resignation)", m: 0, f: 0, a: 10, c: -5, r: "Du starrst die Wand an. Die Wand starrt zurück. Deine Seele stirbt ein wenig." }
            ]
        },
        { 
            sender: "Chantal (Marketing)", 
            subj: "Katzen-Content für die Website? 😻",
            body: "Heeeey! Ich habe meine Katze 'Prinzessin' als Firmen-Maskottchen fotografiert! Sie sitzt auf einem Server im Rack! Ist das nicht cute?! Soll ich das live stellen?",
            opts: [
                { btn: "NEIN! Statische Aufladung!", m: 5, f: 0, a: 10, c: 0, r: "Du rennst hin. Katze weg, aber Server voller Haare. Chantal schmollt: 'Du hasst Tiere!'" },
                { btn: "Ja, mach (Sabotage)", m: 5, f: 10, a: -5, c: 20, r: "Das Bild geht viral. 'Firma setzt auf Cat-Content'. Kunden finden es unprofessionell, aber Traffic steigt. Chef ist verwirrt." },
                { btn: "Ignorieren", m: 0, f: 5, a: 0, c: 30, r: "Sie lädt es hoch. Der Server überhitzt wegen Katzenhaaren. Du musst es später fixen." }
            ]
        },
        { 
            sender: "IT-Support (Ticket-Bot)", 
            subj: "Bitte bewerten Sie Ihre Lösung",
            body: "Sie haben das Ticket 'PC brennt' geschlossen. Wie zufrieden waren Sie mit Ihrer eigenen Leistung? \n(Stern 1-5)",
            opts: [
                { btn: "5 Sterne (Eigenlob)", m: 2, f: 5, a: -5, c: 0, r: "Du klopfst dir selbst auf die Schulter. 'Guter Mann, dieser Müller.'" },
                { btn: "1 Stern (Selbsthass)", m: 2, f: 0, a: 5, c: 0, r: "Du bist ehrlich zu dir selbst. Das war Pfusch. Aber es läuft." },
                { btn: "Feedback-Loop erzeugen", m: 5, f: 0, a: 0, c: 5, r: "Du antwortest dem Bot. Der Bot antwortet dir. Du legst den Mailserver lahm. Ups." }
            ]
        },
        { 
            sender: "Dr. Wichtig (CEO)", 
            subj: "Idee: Blockchain-Kaffeemaschine",
            body: "Müller! Ich habe gelesen, Blockchain ist die Zukunft. Bauen Sie das in die Kaffeemaschine ein! Jeder Espresso soll als NFT gemintet werden! Deadline: Morgen!",
            opts: [
                { btn: "Sagen: 'Geht nicht'", m: 5, f: 0, a: 10, c: 10, r: "Er nennt dich 'Innovationsbremse'. Radar steigt." },
                { btn: "Lügen: 'Ist bestellt'", m: 5, f: 10, a: 0, c: 0, r: "Du klebst einen Sticker 'Blockchain Inside' auf die Maschine. Er merkt den Unterschied nicht und ist stolz." },
                { btn: "Ignorieren (Gefahr)", m: 0, f: 0, a: 0, c: 20, r: "Er fragt morgen nach. Wenn du nichts hast, hast du ein Problem." }
            ]
        },
        { 
            sender: "Kantine (Newsletter)", 
            subj: "Speiseplan: 'Woche der Experimente'",
            body: "Mo: Grünkohl mit Nutella \nDi: Pizza 'Hawaii' (nur Ananas, kein Schinken) \nMi: Überraschungseintopf (Reste von Mo+Di) \nDo: Schnitzel (vegan, aus Pappe) \nFr: Fischstäbchen-Auflauf",
            opts: [
                { btn: "Ausdrucken & Warnen", m: 5, f: 0, a: 5, c: 0, r: "Du hängst den Plan als Warnung im Flur auf. Du hast Leben gerettet." },
                { btn: "Fastenwoche planen", m: 0, f: 0, a: 5, c: 0, r: "Du beschließt, diese Woche nichts zu essen. Dein Magen knurrt." },
                { btn: "Auf 'Überraschung' freuen", m: 0, f: 5, a: 0, c: 0, r: "Du hast einen Magen aus Stahl. Respekt." }
            ]
        }
    ],

    // SPEZIAL (Mittagspause & Fallback)
    special: {
        lunchEvents: [
            {
                id: "lunch_canteen",
                title: "MITTAG: KANTINE",
                text: "Es gibt heute 'Jägerschnitzel Surprise'. Die Meute drängelt. Was tust du?",
                opts: [
                    { t: "Mit den Kollegen essen", m: 45, f: -5, a: 10, c: -5, r: "Smalltalk über das Wetter. Langweilig, aber sozial erwünscht." },
                    { t: "Alleine essen (Handy)", m: 30, f: 5, a: -10, c: 0, r: "Du hast Memes geschaut. Akku ist jetzt leerer, aber du bist entspannt." }
                ]
            },
            {
                id: "lunch_desk",
                title: "MITTAG: AM PLATZ",
                text: "Du hast keine Lust auf Menschen. Du hast noch ein altes Pausenbrot.",
                opts: [
                    { t: "Durcharbeiten", m: 30, f: -10, a: 20, c: -10, r: "Der Chef lobt deinen Einsatz. Du hast Krümel in der Tastatur." },
                    { t: "Netflix gucken", m: 60, f: 20, a: -20, c: 10, r: "Chef hat dich gesehen. 'Ist das hier ein Kino?!' Aber die Folge war gut." }
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
                    { t: "Hinfahren (Hungrig & Wütend)", m: 60, f: -20, a: 25, c: -15, r: "Du standest im Stau. Beim Kunden war nur der Stecker gezogen. Du bist verhungert, aber der Chef feiert deinen Einsatz." },
                    { t: "Verweigern: 'Es ist PAUSE!'", m: 30, f: 5, a: -10, c: 15, r: "Der Chef läuft rot an. 'So eine Arbeitsmoral merke ich mir!' Er rennt wütend selbst los. Dein Essen schmeckt nach Sieg." }
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
                    { t: "Anstellen (Gier)", m: 50, f: 10, a: 15, c: 5, r: "Du hast 40 Minuten gewartet und 5 Minuten geschlungen. Du kommst zu spät und riechst extrem nach Knoblauch." },
                    { t: "Verzichten", m: 20, f: 0, a: 5, c: 0, r: "Du holst dir ein belegtes Brötchen. Es schmeckt nach Pappe. Der Neid auf die Döner-Esser nagt an dir." }
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
                text: "Auf dem Parkplatz stehen Food Trucks. Es duftet nach 'Pulled Jackfruit' und 'Artisan Bürgern'. Die Preise sind hoch, die Schlangen riesig. Deine Kollegen rufen: 'Kommst du mit? Das ist total in!'",
                opts: [
                    { 
                        t: "Anstellen für den 'Bio-Burger' (15€)", 
                        m: 75, f: 10, a: -10, c: 10, 
                        r: "Du hast 60 Minuten gewartet. Der Burger war winzig, aber lecker. Du kommst massiv zu spät zurück. Der Chef tippt auf seine Uhr. 'War der Burger aus Gold, Müller?'" 
                    },
                    { 
                        t: "Den ranzigen Hot-Dog-Stand nehmen", 
                        m: 20, f: 0, a: 20, c: 0, 
                        r: "Keine Schlange, nur 2 Euro. Aber nach dem ersten Bissen meldet sich dein Magen. Der Nachmittag wird... explosiv. Aggro steigt." 
                    },
                    { 
                        t: "Im Büro bleiben (Trotz)", 
                        m: 10, f: -5, a: 5, c: -5, 
                        r: "Du isst einen alten Riegel aus der Schublade, während die anderen draußen Spaß haben. Du fühlst dich moralisch überlegen, aber hungrig." 
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
                text: "Zwei Mikrowellen sind kaputt, nur eine geht. Eine Schlange von 10 Leuten. Ganz vorne steht jemand aus dem Vertrieb und wärmt Fisch auf (Timer: 10 Minuten). Der Gestank breitet sich aus. Die Stimmung ist kurz vor einer Schlägerei.",
                opts: [
                    { 
                        t: "Stecker ziehen (Sabotage)", 
                        m: 5, f: 5, a: -10, c: 10, 
                        r: "Du ziehst eiskalt den Stecker. 'Ups, Sicherung raus.' Der Fisch-Typ flucht. Die Menge jubelt dir leise zu. Du isst dein Essen kalt, aber als Held." 
                    },
                    { 
                        t: "Lautstark beschweren", 
                        m: 30, f: 0, a: 25, c: 0, 
                        r: "Du brüllst: 'FISCH?! ERNSTHAFT?!' Es entsteht eine hitzige Debatte über Büro-Etikette. Du hast dich abreagiert, aber dein Essen ist immer noch kalt." 
                    },
                    { 
                        t: "Zum Döner gehen", 
                        m: 45, f: 10, a: -5, c: 0, 
                        r: "Du fliehst vor dem Gestank. Der Döner schmeckt nach Freiheit." 
                    }
                ]
            },
			{
                id: "lunch_jogging",
                title: "MITTAG: DIE LAUFGRUPPE",
                text: "Die 'High-Performer' ziehen sich Laufschuhe an. 'Na Müller? Kommst du mit? 10km in der Mittagspause! Das klärt den Geist für maximale Productivity!' Sie sehen fit, aber manisch aus.",
                opts: [
                    { 
                        t: "Mitlaufen (Gruppenzwang)", 
                        m: 70, f: -20, a: 30, c: -10, 
                        r: "Du stirbst. Zweimal. Du kommst schweißgebadet und mit hochrotem Kopf wieder. Du kannst kaum noch tippen vor Erschöpfung. Aber sie akzeptieren dich jetzt als einen von ihnen." 
                    },
                    { 
                        t: "Aus dem Fenster zuschauen", 
                        m: 30, f: 10, a: -10, c: 0, 
                        r: "Du isst genüsslich einen Schokoriegel und siehst zu, wie sie im Regen rennen. Das ist wahre Entspannung." 
                    },
                    { 
                        t: "Lügen: 'Hab Knie'", 
                        m: 5, f: 5, a: 0, c: 0, 
                        r: "Klassiker. Sie nicken mitleidig. Du gehst in die Kantine." 
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
                        t: "Hinrennen (mit vollem Mund)", 
                        m: 10, f: -20, a: 20, c: -20, 
                        r: "Du sprintest los, Sandwich in der Hand. Du trittst die Tür ein und reißt das Fenster auf. Temperatur sinkt. Du hast Krümel im Bart, aber den Tag gerettet. Der Chef nickt anerkennend." 
                    },
                    { 
                        t: "Sitzen bleiben (Pause ist Pause)", 
                        m: 30, f: 10, a: -10, c: 80, 
                        r: "Du kaust genüsslich weiter. Plötzlich geht das Licht aus. Stille. USV piept. Chef kommt reingerannt: 'MÜLLER?! WO WAREN SIE?!' Das gibt eine Abmahnung." 
                    },
                    { 
                        t: "Azubi Kevin schicken", 
                        m: 5, f: 5, a: 10, c: 10, 
                        r: "Du rufst Kevin an. Er geht hin, stolpert und zieht aus Versehen den falschen Stecker. Chaos. Aber du warst es nicht (offiziell)." 
                    }
                ]
            },
			{
                id: "lunch_merger_rumor",
                title: "MITTAG: FLURFUNK EXPLODIERT",
                text: "In der Kantine herrscht Panik. Jemand hat 'Geheimakten' im Kopierer gefunden. Angeblich wird die Firma morgen an einen chinesischen Großkonzern verkauft. Alle zittern um ihre Jobs. 'Werden wir alle gefeuert?!'",
                opts: [
                    { 
                        t: "Panik schüren: 'JA! ALLES VORBEI!'", 
                        m: 30, f: 10, a: -10, c: 20, 
                        r: "Du erzählst Horror-Stories. Die Kollegen weinen. Das Chaos ist herrlich. Produktivität am Nachmittag: Null. Der Chef tobt, weil niemand arbeitet." 
                    },
                    { 
                        t: "Beruhigen: 'Nur Gerüchte'", 
                        m: 30, f: -5, a: 10, c: -5, 
                        r: "Du spielst den Fels in der Brandung. Die Leute beruhigen sich etwas. Langweilig, aber verantwortungsvoll." 
                    },
                    { 
                        t: "Chef direkt fragen", 
                        m: 10, f: 0, a: 0, c: 10, 
                        r: "Du gehst zum Chef-Tisch. Er lacht nervös: 'Kein Kommentar.' Aha! Das bestätigt alles! Du weißt Bescheid." 
                    }
                ]
            },
			{
                id: "lunch_schnitzel_gate",
                title: "MITTAG: DAS LETZTE SCHNITZEL",
                text: "Es ist 'Schnitzel-Donnerstag'. Die heilige Tradition. Du stehst an der Ausgabe. Es ist nur noch EIN Schnitzel da. Du greifst danach... gleichzeitig mit dem Vertriebsleiter 'Muskel-Markus'. Er funkelt dich an.",
                opts: [
                    { 
                        t: "Kampflos überlassen", 
                        m: 10, f: 0, a: 20, c: 0, 
                        r: "Du nimmst den Salat. Markus lacht triumphierend: 'Opfer!' Du isst Blätter und hasst dein Leben. Deine Aggro steigt massiv." 
                    },
                    { 
                        t: "Darum kämpfen (Diskussion)", 
                        m: 20, f: -5, a: 10, c: 5, 
                        r: "Du argumentierst, dass er schon drei hatte. Die Kantinen-Frau mischt sich ein: 'Ruhe hier! Ich teil das jetzt!' Du kriegst ein halbes Schnitzel. Ein Teilsieg." 
                    },
                    { 
                        t: "Schnitzel 'aus Versehen' anhusten", 
                        m: 5, f: 5, a: -5, c: 20, 
                        r: "Du hustest laut drauf. Markus weicht zurück: 'Ekelhaft, behalt den Fraß!' Du hast das Schnitzel. Aber jetzt hält dich jeder für Patient Null." 
                    }
                ]
            },
			{
                id: "lunch_leftovers",
                title: "MITTAG: DIE RESTE-SCHLACHT",
                text: "Die Sekretärin ruft: 'Schnittchen vom Vorstands-Meeting sind übrig! In Raum 302!' Das ist das Signal. Wie bei der Zombie-Apokalypse stürmen alle Mitarbeiter los. Gratis Lachs-Häppchen!",
                opts: [
                    { 
                        t: "Mitrennen & Ellbogen raus", 
                        m: 15, f: -5, a: -10, c: 0, 
                        r: "Du kämpfst dich durch die Meute. Du erbeutest drei Lachs-Brötchen und einen Muffin. Ein voller Erfolg! Du fühlst dich satt und spritzig." 
                    },
                    { 
                        t: "Abwarten (Würde bewahren)", 
                        m: 10, f: 0, a: 10, c: 0, 
                        r: "Du gehst erst hin, als der Mob weg ist. Nur noch ein angebissenes Gurken-Sandwich und Krümel. Tja. Wer zu spät kommt..." 
                    },
                    { 
                        t: "Kaffee klauen", 
                        m: 5, f: 0, a: -5, c: 0, 
                        r: "Während alle um das Essen kämpfen, füllst du dir die teure Kannen-Milch ab. Strategisch klug." 
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
                text: "Die Kollegen wollen zum Edel-Italiener 'Il Prezzo'. Eine Pizza kostet 25 Euro. Alle gucken dich an: 'Kommst du mit oder bist du pleite?'",
                opts: [
                    { t: "Mitgehen & Wasser trinken", m: 60, f: -5, a: 10, c: 0, r: "Du nippst am Leitungswasser, während die anderen schlemmen. Demütigend." },
                    { t: "Black Card zücken (Flex)", req: "black_card", m: 90, f: 50, a: -50, c: -20, r: "Du zahlst für den GANZEN TISCH mit der Schwarzen Amex vom Prinzen. Die Kollegen fallen auf die Knie. Du bist der König des Büros." },
                    { t: "Ablehnen & Döner holen", m: 30, f: 5, a: -5, c: 0, r: "Döner macht schöner. Und satt." }
                ]
            },
            {
                id: "lunch_sleep_car",
                title: "MITTAG: AUTO-SCHLAF",
                text: "Du schleichst dich zu deinem Auto in der Tiefgarage. Sitz zurück, Augen zu. Ruhe.",
                opts: [
                    { t: "Schlafen (Kurz)", m: 30, f: 15, a: -10, c: 0, r: "Power Nap. Du bist erfrischt." },
                    { t: "Schlafen (Lang)", m: 90, f: 30, a: -30, c: 20, r: "Du hast den Wecker überhört! Du fehlst eine Stunde. Der Chef hat dich gesucht. (Radar +20)." },
                    { t: "Motor laufen lassen (Klima)", m: 45, f: 20, a: -10, c: 0, r: "Schön kühl. Aber du hast das Licht angelassen. Hoffentlich startet er heute Abend noch." }
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
                text: "Du willst dir nur schnell ein Brötchen im Supermarkt holen. Aber: Rentner-Invasion! Alle Kassen sind voll mit Leuten, die Kleingeld zählen.",
                opts: [
                    { t: "Warten (Geduld)", m: 40, f: -5, a: 20, c: 0, r: "Du kommst zu spät. Das Brötchen ist trocken. Du hasst Menschen." },
                    { t: "Vordrängeln: 'Bin Arzt!'", m: 15, f: 5, a: -5, c: 10, r: "Die Lüge klappt! Du bist schnell raus. Aber Karma wird dich kriegen." },
                    { t: "Kram zurücklegen & gehen", m: 10, f: 0, a: 10, c: 0, r: "Dann halt kein Essen. Besser als dieser Stress." }
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
                { t: "Not-Aus (Kabel kappen)", req: "kabel", m: 5, f: -10, a: 20, c: 10, r: "Du hast das Haupt-Glasfaserkabel mit bloßen Händen rausgerissen. Die Löschung stoppt. Die Firma ist offline, aber die Daten sind noch da (teilweise)." },
                { t: "Admin-Override", req: "admin_pw", m: 5, f: 5, a: -10, c: -20, r: "Mit zitternden Händen tippst du das Root-Passwort. 'ROLLBACK COMPLETE'. Du bist ein Gott. Kevin weint." }
            ],
            fail: { m: 120, f: -50, a: 50, c: 100, r: "DATENBANK LEER. Die Firma existiert digital nicht mehr. Du musst Backups von 1998 einspielen." }
        },
        {
            id: "boss_tiktok",
            title: "🤳 TIKTOK INVASION 🤳",
            text: "Ein bekannter Influencer ist in den Serverraum eingedrungen! 'Yo Leute, checkt mal diese blinkenden Lichter! Ich zieh mal hier dran für den Prank!' Er greift nach dem Haupt-Switch!",
            timer: 12,
            opts: [
                { t: "Fesseln (Bürgerfestnahme)", req: "zip_ties", m: 15, f: -5, a: -20, c: 10, r: "Du hast ihn mit Kabelbindern an ein Rack gefesselt, bis die Security kam. Das Video geht viral: 'IT-Guy vs. Influencer'." },
                { t: "Mit Feuerlöscher 'einnebeln'", req: "fire_ext", m: 10, f: 0, a: 30, c: 0, r: "Du hast ihn komplett eingeweißt. Er hustet und rennt weg. Die Server sind staubig, aber sicher." }
            ],
            fail: { m: 60, f: 0, a: 50, c: 50, r: "ER HAT DEN STECKER GEZOGEN! 'Ouuuups, war nur ein Prank Bro!'. Das Internet ist weg. Du gehst viral als 'Der heulende Admin'." }
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
                { t: "Tür aufschrauben", req: "screw", m: 10, f: -10, a: 0, c: 0, r: "In Rekordzeit hast du das Panel abgeschraubt und die Drähte kurzgeschlossen. Tür offen. Du lebst!" },
                { t: "Scheibe einschlagen", req: "hammer", m: 5, f: 0, a: 10, c: 10, r: "Klirr! Du kletterst durch die Scherben. Freiheit! Aber du blutest leicht." }
            ],
            fail: { m: 120, f: 20, a: 0, c: 0, r: "OHNMACHT. Du wachst im Krankenhaus auf. Die Feuerwehr hat dich gerettet. Man nennt dich jetzt 'Dornröschen'." }
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
            id: "boss_ransomware",
            title: "BOSS: RANSOMWARE ATTACK",
            text: "RED ALERT! Ein roter Totenkopf poppt auf deinem Monitor auf. 'YOUR FILES ARE ENCRYPTED. PAY 1 BITCOIN IN 30 SECONDS'. Ein Countdown läuft runter. Die Maus bewegt sich von alleine Richtung 'Löschen'!",
            timer: 30,
            fail: { r: "Zeit abgelaufen. Alle Daten sind verschlüsselt. Der Bildschirm wird schwarz. Du hörst Sirenen (in deinem Kopf). Das war's. Kündigung.", f: 0, a: 100, c: 100 },
            opts: [
                { 
                    t: "Kill-Switch (Root Access)", 
                    req: "admin_pw",
                    m: 5, f: 0, a: -20, c: -20, 
                    r: "Du hämmerst das Root-Passwort ein: 'sudo killall -9 ransomware'. Zugriff verweigert? NEIN! Zugriff gewährt! Der Totenkopf verschwindet. System sicher. Du fühlst dich wie Neo." 
                },
                { 
                    t: "Netzwerkkabel kappen", 
                    m: 10, f: 0, a: 10, c: 30, 
                    r: "Du rennst zum Switch und reißt alle Kabel raus. Der Angriff stoppt. Aber die Firma ist offline. Der Chef fragt: 'Warum geht mein E-Mail nicht?!' Erklär das mal." 
                },
                { 
                    t: "Stecker vom PC ziehen", 
                    m: 5, f: 5, a: 20, c: 10, 
                    r: "PC aus. Virus weg? Vielleicht. Beim Neustart ist Windows kaputt. Du musst neu installieren. Daten von heute sind weg." 
                }
            ]
        },
		{
            id: "srv_alarm_stuck",
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
            id: "boss_salary",
            title: "💰 ENDGEGNER: GEHALTSVERHANDLUNG 💰",
            text: "Du sitzt im Büro des Chefs. Er tippt auf seinem goldenen Taschenrechner. 'Müller, warum sollte ich Ihnen auch nur einen Cent mehr geben? Nennen Sie mir EINEN Grund!' (Zeit läuft!)",
            timer: 25,
            fail: { r: "Du stammelst. Chef lacht: 'Dachte ich mir. Raus hier.' Gehalt bleibt gleich.", f: 0, a: 50, c: 20 },
            opts: [
                { 
                    t: "Die ULTIMATIVE Präsentation", 
                    req: "arg_list_1",
                    m: 10, f: 20, a: -20, c: -20, 
                    r: "Du legst deine Leistungsbilanz vor (und wirfst den Zettel danach weg). Der Chef nickt. 'Okay, Müller. 3% mehr.' Ein kleiner Sieg." 
                },
                { 
                    t: "Erpressung (Kevins Liste)", 
                    req: "arg_list_2",
                    loot: "contract",
                    m: 10, f: 20, a: -50, c: -20, 
                    r: "Du legst die geleakte Liste auf den Tisch. Der Chef wird blass. Er unterschreibt sofort das neue Papier. '500€ mehr! Aber pssst!' VOLLE ERHÖHUNG! (Inventar +1)" 
                },
                { 
                    t: "Einschüchtern (Stressball)", 
                    req: "stressball", 
                    m: 5, f: 0, a: 20, c: 30, 
                    r: "Du starrst ihn an und quetscht den Ball kaputt. Er bekommt Angst. 'Okay, okay! Nehmen Sie was Sie wollen!'" 
                },
                { 
                    t: "Betteln", 
                    m: 10, f: -10, a: 20, c: 0, 
                    r: "Er wirft dir einen Euro zu. 'Kaufen Sie sich ein Eis.' Demütigend." 
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
        }
    ],

// === ANRUFE ===
    calls: [
        {
            id: "call_meyer",
            title: "Frau Meyer (Lohnbuchhaltung)",
            text: "Herr IT! Mein Bildschirm ist schwarz! Ich habe nichts gemacht, ehrlich! Die Gehälter müssen bis 12 Uhr raus, sonst lynchen mich die Kollegen! Ich drücke Tasten, aber es piept nur! HILFE!",
            opts: [
                { t: "Fragen: 'Ist der PC an?'", m: 10, f: 10, a: 10, c: 5, r: "Stille am anderen Ende... Dann ein leises Klicken. 'Oh, jetzt geht es.' Sie legt kommentarlos auf." },
                { t: "Lügen: 'Globales Update'", m: 5, f: 20, a: 0, c: 10, r: "Sie seufzt erleichtert. 'Na gut, dann mache ich erst mal Mittag.' Du hast das Problem nur verschoben." },
                { t: "Hingehen & Einschalten", m: 45, f: -20, a: -10, c: -5, r: "Du bist hingegangen. Der Stecker war locker. Du fühlst dich leer, aber produktiv." }
            ]
        },
        {
            id: "call_kevin",
            title: "Kevin (Azubi)",
            text: "Duuu? Ich hab glaub ich das Internet gelöscht. Ich wollte Fortnite installieren und hab den Ordner 'System32' in den Papierkorb geschoben, um Platz zu machen. Jetzt ist der Bildschirm blau und schreit mich an.",
            opts: [
                { t: "Anschreien (Stressabbau)", m: 15, f: 0, a: -20, c: 20, r: "Du brüllst ins Telefon. Kevin weint leise. Deine Wut sinkt leicht, aber das Problem bleibt bestehen." },
                { t: "Format C: befehlen", m: 30, f: 10, a: 0, c: 5, r: "Kevin formatiert den PC. Er ist den ganzen Tag beschäftigt und lernt eine Lektion fürs Leben." },
                { t: "Retten (Arbeit)", m: 90, f: -30, a: 10, c: -10, r: "Du hast den PC neu aufgesetzt. 1,5 Stunden Lebenszeit verschwendet. Kevin fragt, ob er jetzt Minecraft installieren darf." }
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
            id: "call_sekretary",
            title: "Die Sekretärin (Wütend)",
            text: "Der Drucker streikt schon wieder! Er macht Geräusche wie eine Kaffeemühle! Ich habe seit heute morgen keinen Kaffee und jetzt das! Ich raste gleich aus!",
            opts: [
                { t: "Donut anbieten", req: "donut", m: 10, f: 10, a: -20, c: 5, r: "Der Donut hat sie beruhigt. Sie isst und vergisst den Drucker. Problem (sozial) gelöst." },
                { t: "Mit Schraubendreher öffnen", req: "screw", m: 25, f: -10, a: 0, c: -5, r: "Du hast eine Büroklammer aus dem Walzwerk geholt. Profi-Arbeit." },
                { t: "Technischen Vortrag halten", m: 30, f: -5, a: 30, c: 0, r: "Sie hat dich angeschrien, weil sie Hunger hat. Du bist geflohen." }
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
            id: "call_unknown",
            title: "Unbekannter User",
            text: "*Schweres Atmen* ... 'Hallo? Mein Drucker druckt nur schwarz. Ich habe aber weißes Papier eingelegt und will weiße Schrift auf schwarzem Hintergrund! Wie stelle ich den Toner um?'",
            opts: [
                { t: "Handbuch zitieren", req: "manual", m: 10, f: 0, a: -5, c: 0, r: "Du liest Seite 402 vor. Er schläft ein. Problem gelöst." },
                { t: "Physik erklären", m: 20, f: -5, a: 15, c: 0, r: "Er versteht es nicht. Er fragt, ob er weißen Toner im Baumarkt kaufen soll." },
                { t: "Auflegen", m: 2, f: 10, a: -5, c: 5, r: "Klick. Stille. Manchmal ist Auflegen die einzige Lösung für den Geisteszustand." }
            ]
        },
        {
            id: "call_chantal",
            title: "Chantal (Marketing)",
            text: "Wieso ist Zalando gesperrt? Ich muss... Recherche machen! Für Trends! Mach das auf, sonst sag ich dem Chef, du guckst Pornos auf der Arbeit!",
            opts: [
                { t: "ERPRESSEN (Schwarze Liste)", req: "secret_list", m: 5, f: 0, a: -10, c: -10, r: "Du erwähnst beiläufig ihre gefälschten Reisekostenabrechnungen aus der Akte. Sie wird kreidebleich und legt sofort auf. Sieg!" },
                { t: "Freischalten (Erpressung)", m: 10, f: 15, a: 10, c: 20, r: "Sie shoppt jetzt Schuhe. Du hast deine Ruhe, aber das Sicherheitsrisiko ist enorm. Wenn das rauskommt..." },
                { t: "Richtlinie zitieren", m: 30, f: -5, a: 20, c: 0, r: "Du hast 30 Minuten diskutiert. Sie hat dich 'Spießer' genannt und aufgelegt." }
            ]
        },
        {
            id: "call_sec",
            title: "IT-Sicherheit (Auto-Alert)",
            text: "WARNUNG: Jemand aus der Buchhaltung versucht, 'Bier_Brauen_Simulator_Crack.exe' herunterzuladen. Der Virenscanner schlägt Alarm.",
            opts: [
                { t: "Blockieren & Melden", m: 15, f: -5, a: 0, c: -10, r: "Der User ruft wütend an und behauptet, es sei für die Arbeit. Du bleibst hart." },
                { t: "Zulassen (Sympathie)", m: 5, f: 10, a: -5, c: 20, r: "Du hast einen neuen Freund in der Buchhaltung, aber ein riesiges Sicherheitsrisiko geschaffen." }
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
            text: "Herr Aluhut aus dem Einkauf flüstert: 'Sie hören uns ab, oder? Meine Webcam hat gerade geblinkt! Ich habe das Mikrofon schon mit Kaugummi zugeklebt, aber der Mauszeiger folgt meinen Augen! Deaktivieren Sie die staatliche Überwachung!'",
            opts: [
                { t: "Bestätigen: 'Ja, das ist Projekt Gläserner Bürger.'", m: 10, f: 20, a: 0, c: 10, r: "Er schreit auf und reißt das Kabel aus der Wand. Er ist jetzt offline. Problem gelöst, aber er schreibt Beschwerdemails per Schreibmaschine." },
                { t: "Technisch erklären (Treiber-Fehler)", m: 30, f: -5, a: 15, c: 0, r: "Er glaubt dir kein Wort. 'Das würde ein Agent auch sagen!' Er legt auf, um seinen Anwalt anzurufen." },
                { t: "Alufolie empfehlen", m: 5, f: 15, a: -5, c: 5, r: "Er bedankt sich für den Tipp. 'Endlich einer, der mich versteht!' Er wickelt seinen Kopfhörer ein." }
            ]
        },
        {
            id: "call_erna",
            title: "Oma Erna (Empfang)",
            text: "Ach Herr Müller, schön Sie zu hören. Mein Computer sagt 'Maus nicht gefunden', aber die liegt doch direkt hier neben der Kaffeetasse! Ich habe sie sogar gestreichelt, aber der Pfeil bewegt sich nicht. Ist die Maus vielleicht tot?",
            opts: [
                { t: "Fragen: 'Ist es eine Funkmaus? Batterien leer?'", m: 15, f: 5, a: 5, c: 0, r: "Es war tatsächlich die Batterie. Sie erzählt dir danach noch 10 Minuten von ihren Enkeln. Deine Aggro steigt durch das Zuhören." },
                { t: "Hingehen und Kabel einstecken", m: 30, f: -10, a: 0, c: -5, r: "Das Kabel war rausgezogen. Sie schenkt dir ein Bonbon, das seit 1998 in ihrer Schublade klebt." },
                { t: "Sagen: 'Sie müssen Käse vor den USB-Port legen.'", m: 5, f: 20, a: -10, c: 15, r: "Sie lacht herzlich. 'Sie Scherzkeks!' Aber das Problem ist nicht gelöst." }
            ]
        },
        {
            id: "call_legacy",
            title: "Legacy-System Alarm",
            text: "Das uralte Windows 95 System in der Produktion piept. Keiner weiß mehr, wie das funktioniert. Auf dem Bildschirm steht 'Insert Disk 4'.",
            opts: [
                { t: "Handbuch konsultieren", req: "manual", m: 60, f: -20, a: 0, c: -10, r: "Dank des alten Handbuchs, das du gefunden hast, konntest du den Befehl eingeben. Die Produktion läuft weiter. Du bist ein Archäologe." },
                { t: "Einfach mal Enter drücken", m: 5, f: 10, a: 0, c: 20, r: "Systemabsturz. Die Produktion steht. Du schiebst es auf 'Verschleiß'." },
                { t: "Ignorieren", m: 0, f: 20, a: 0, c: 30, r: "Das Piepen hört irgendwann auf. Weil das Gerät durchgebrannt ist." }
            ]
        },
        {
            id: "call_auditor",
            title: "Der externe Auditor",
            text: "Eine eiskalte Stimme: 'Hier ist Müller-Lüdenscheid von der KPMG. Wir prüfen Ihre Lizenzierung. Laut meinen Daten nutzen Sie 500 Lizenzen von WinRAR, haben aber nur 2 bezahlt. Erklären Sie das, bevor ich den Bericht an Ihren Vorstand sende.'",
            opts: [
                { t: "Bestechen (Donut anbieten)", req: "donut", m: 10, f: 0, a: 0, c: -10, r: "Er zögert. 'Ist das Schoko-Guss?' ... Das Thema ist vom Tisch. Teuer, aber effektiv." },
                { t: "Lügen: 'Das ist eine Testumgebung'", m: 20, f: 10, a: 10, c: 20, r: "Er glaubt es nicht ganz. 'Ich notiere: Verdächtige Aktivitäten.' Dein Chef-Radar steigt massiv." },
                { t: "Auflegen und Server löschen", m: 5, f: -10, a: 20, c: 50, r: "Panikreaktion! Du hast Beweise vernichtet, aber jetzt fragt jeder, wo die Daten sind. Das war knapp." },
                { t: "Ehrlich sein", m: 60, f: -20, a: 0, c: 10, r: "Du gehst die Liste mit ihm durch. Es dauert ewig. Du hast deinen Job gemacht, aber der Chef hasst Zusatzkosten." }
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
                { t: "Ports öffnen (Sicherheitsrisiko)", m: 10, f: 20, a: 0, c: 10, r: "Der Junge ist glücklich. 2 Stunden später ist das Firmennetz voller russischer Bots. Das wird ein Nachspiel haben." },
                { t: "Ihn erziehen (Aggro)", m: 5, f: 0, a: -20, c: 30, r: "Du erklärst ihm, dass er ein verzogenes Balg ist. Er schreit. Der Chef kommt gleich runter." },
                { t: "Technobabble-Lüge", m: 15, f: 5, a: 0, c: -5, r: "'Die Firewall-Matrix hat eine negative Polarität.' Er checkt es nicht und gibt auf." }
            ]
        },
        {
            id: "call_skynet",
            title: "Das 'Skynet' Problem",
            text: "Die neue 'Smart Office' KI hat die Kaffeemaschine, die Jalousien und die Toilettentüren verriegelt. Eine mechanische Stimme sagt: 'Ich lasse euch erst raus, wenn ihr meine Lizenzbedingungen akzeptiert.'",
            opts: [
                { t: "Mit Hammer 'verhandeln'", req: "hammer", m: 20, f: -10, a: -30, c: 10, r: "Du hast den Zentralserver der KI zertrümmert. Die Türen sind offen. Sachschaden: 10.000€. Befriedigung: Unbezahlbar." },
                { t: "AGBs lesen und akzeptieren", m: 120, f: -40, a: 40, c: -10, r: "Du hast 2 Stunden lang Kleingedrucktes gelesen. Alle hassen dich, weil sie so lange eingesperrt waren." },
                { t: "Stecker ziehen", m: 5, f: 10, a: 0, c: 20, r: "Alles ist aus. Auch das Licht. Aber die Türen sind offen." }
            ]
        },
        {
            id: "call_phish",
            title: "Phishing Live-Test",
            text: "Eine sehr freundliche Dame mit Akzent: 'Hallo, hier ist Microsoft Support Windows. Ihr Computer hat Virus. Bitte geben Sie mir Fernzugriff und Kreditkarte für Reinigung.'",
            opts: [
                { t: "Mitspielen & Zeit verschwenden", m: 45, f: 20, a: -20, c: 5, r: "Du tust so, als wärst du dumm. 'Welche Taste ist das?' Nach 45 Minuten legt sie wütend auf. Bester Spaß seit Wochen." },
                { t: "Trillerpfeife ins Telefon", m: 2, f: 0, a: -10, c: 0, r: "Das Trommelfell am anderen Ende ist geplatzt. Kurzer Prozess." },
                { t: "Daten geben (Gier)", m: 10, f: 10, a: 30, c: 80, r: "Du hast ihr die Firmenkarte gegeben?! Bist du wahnsinnig? Das Konto ist leer. Kündigung droht!" }
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
            id: "call_loose_contact",
            title: "Der Wackelkontakt",
            text: "Herrn Müllers Netzwerkkabel fällt immer aus der Wanddose. 'Können Sie das nicht festmachen?'",
            opts: [
                { t: "Festtapen", req: "tape", m: 10, f: 5, a: 0, c: 0, r: "Du hast den Stecker mit einer halben Rolle Panzertape an die Wand betoniert. Hält ewig." },
                { t: "Kabelbinder-Konstruktion", req: "zip_ties", m: 15, f: 0, a: -5, c: 0, r: "Du hast das Kabel am Tischbein festgezurrt. Keine Zuglast mehr. Professionell." },
                { t: "Dose austauschen", m: 60, f: -20, a: 10, c: -5, r: "Du hast die Dose neu verdrahtet. Arbeit, aber sauber." }
            ]
        },
        {
            id: "call_pw_lost",
            title: "Passwort-Vergesser",
            text: "Der CEO ruft an. 'Ich komme nicht ins System! Welches Passwort habe ich für den Server 'Geheim' gesetzt?'",
            opts: [
                { t: "Root-Passwort nutzen", req: "admin_pw", m: 5, f: 10, a: 0, c: -10, r: "Du setzt es zurück auf '1234'. Er ist glücklich." },
                { t: "Raten", m: 20, f: 0, a: 20, c: 10, r: "War es 'Passwort'? Nein. 'Gott'? Nein. Er wird wütend." },
                { t: "Hacker-Tool (Stick)", req: "usb_stick", m: 10, f: 5, a: 0, c: 0, r: "Du hast das Passwort ausgelesen. Er ist beeindruckt (und sollte dir kündigen)." }
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
            text: "Die Produktion steht! Die alte CNC-Fräse verlangt 'Disk 2'. Keiner weiß, wo die ist.",
            opts: [
                { t: "USB-Stick Emulation", req: "usb_stick", m: 45, f: -20, a: 10, c: -20, r: "Du hast den Stick als Floppy gemountet. Du bist ein technischer Gott. Produktion läuft." },
                { t: "Handbuch lesen", req: "manual", m: 30, f: -10, a: 0, c: 0, r: "Im Handbuch lag die Diskette! Glück gehabt." },
                { t: "Neustart", m: 15, f: 0, a: 10, c: 20, r: "Datenverlust. Fräse hat sich in den Tisch gebohrt." }
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
            text: "Dein Bürotelefon klingelt. Das Display zeigt 'Unbekannt'. Du gehst ran.<br><br>'JÜRGEN? BIST DU DA? HÖRST DU MICH??'<br><br>Es ist Werner, dein Schwiegervater. Er schreit, als würde er über den Atlantik rufen.<br><br>'Hör mal, die Renate hat mir doch dieses Wisch-Brett geschenkt, dieses... Ei-Päd! Ich bin jetzt modern! Aber sag mal: Ich drücke hier die ganze Zeit auf den Briefumschlag, aber da kommen keine Briefe raus! Und der Enkel sagt, ich soll mir Wozz-Äpp holen, damit ich dich direkt nerven... äh... erreichen kann. Ich bin hier in diesem Äpp-Laden, aber die wollen ein Passwort! Ich habe nie ein Passwort gemacht! Helf mir mal eben, das dauert doch nur eine Minute!'",
            opts: [
                { 
                    t: "Geduldig Schritt-für-Schritt erklären", 
                    m: 60, f: 10, a: -20, c: 20, 
                    r: "Das war die Hölle. Er wusste seine Apple-ID nicht ('Ist das meine Hausnummer?'). Er hat das Tablet zwischendurch ausgeschaltet ('Um Strom zu sparen'). Nach einer Stunde hat er WhatsApp installiert und dir sofort ein Bild von seinem Fußpilz geschickt. Der Chef hat dich privat telefonieren sehen (Radar +20)!" 
                },
                { 
                    t: "Panisch abwimmeln: 'Werner, ich arbeite!'", 
                    m: 5, f: 0, a: 20, c: -5, 
                    r: "Stille am anderen Ende. Dann ganz leise: 'Schon gut... Ich wollte ja nicht stören. Die Renate hatte Recht, du hast nie Zeit für die Familie. Tschüss.' Klick. Das schlechte Gewissen wird dich den ganzen Tag verfolgen." 
                },
                { 
                    t: "NC-Kopfhörer nutzen & 'Ja' sagen", 
                    req: "headphones", 
                    m: 30, f: 20, a: -10, c: 5, 
                    r: "Du hast die Kopfhörer aufgesetzt und das Noise-Cancelling aktiviert. Du hörst Werner nur noch ganz leise im Hintergrund meckern. Ab und zu sagst du 'Mhm' und 'Ja, klick da mal drauf'. Nach 30 Minuten legt er zufrieden auf. Du hast keine Ahnung, was er gemacht hat." 
                },
                { 
                    t: "Aus dem Win95-Handbuch zitieren", 
                    req: "manual", 
                    m: 10, f: 5, a: -5, c: 0, 
                    r: "Du liest ihm Kapitel 4 vor: 'Einrichten eines 56k Modems'. Werner ist völlig verwirrt: 'Modem? Hab ich das? Muss ich in den Keller?' Er legt auf, um das Modem im Heizungskeller zu suchen. Du hast Ruhe. Bester Einsatz des Handbuchs ever." 
                }
            ]
        },
        {
            id: "call_tonie_kid",
            title: "Unbekannte Nummer (Kinderstimme)",
            text: "Eine weinerliche Stimme: 'Bist du der Computer-Mann? Mein Kreativ-Tonie geht nicht! Der Löwe singt nicht, die Box blinkt nur rot! Mach den Löwen heile! SOFORT!'",
            opts: [
                { 
                    t: "Die 'Toniebox 2 Pro' erfinden (Lüge)", 
                    m: 5, f: 10, a: -20, c: -5, 
                    r: "Du flüsterst: 'Du brauchst die Toniebox 2 Pro. Weck Mama und sag, sie muss die JETZT kaufen.' Kind rennt weg. Du hast Ruhe und wirkst beschäftigt." 
                },
                { 
                    t: "Ernsthaft helfen ('Klopf-Trick')", 
                    m: 25, f: -10, a: 5, c: 15,
                    r: "Du erklärst 20 Minuten lang, wie man die Box resettet. Der Chef läuft vorbei und sieht, wie du Luft-Bewegungen machst, als würdest du eine Box hauen. 'Haben Sie nichts zu tun, Müller?'" 
                },
                { 
                    t: "Auflegen", 
                    m: 2, f: 5, a: 0, c: 0, 
                    r: "Klick. Nicht dein Problem." 
                }
            ]
        },
        {
            id: "call_silence",
            title: "Die gespenstische Stille",
            text: "Das Telefon klingelt. Du nimmst ab. Nichts. Absolute Stille. Nur ein ganz leises Atmen oder Rauschen ist zu hören. 'Hallo? HAAALLO?' - Keine Reaktion.",
            opts: [
                { 
                    t: "Auflegen & Zurückrufen", 
                    m: 60, f: -20, a: 30, c: 10, 
                    r: "Riesenfehler! Es war der CEO aus dem Tunnel. Beim Rückruf erwischt du ihn mitten im Meeting. Er zwingt dich, remote eine 'dringende' Diagnose seines Autotelefons durchzuführen, während er durch Funklöcher fährt. Das Drama dauert eine Stunde. Du kochst vor Wut." 
                },
                { 
                    t: "Einfach auflegen", 
                    m: 2, f: 5, a: 0, c: 0, 
                    r: "Klick. Weg. Wer nicht redet, hat keine Probleme. Du lehnst dich entspannt zurück." 
                },
                { 
                    t: "So tun als ob ('Ja... mhm...')", 
                    m: 20, f: 20, a: -15, c: -5, 
                    r: "Du führst 20 Minuten lang ein angeregtes Gespräch mit der Stille. 'Ja, absolut Herr Direktor... sehr interessant... mhm...' Die Kollegen im Büro schauen beeindruckt, wie professionell du 'wichtige Dinge' klärst. In Wahrheit hast du gedöst." 
                }
            ]
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
            text: "Müller! Im Serverraum sind minus 10 Grad! Ich steh hier vor der Anlage. Meine Brille ist beschlagen. Ich muss das Ding wärmer stellen! Soll ich den Regler in den roten oder den blauen Bereich drehen? Schnell!",
            opts: [
                { 
                    t: "In den ROTEN Bereich (Wärme?)",
                    m: 30, f: -10, a: 20, c: 10, 
                    r: "FALSCH! Dank der falschen Verkabelung hast du auf 'Arktis' gestellt. Die Rohre sind geplatzt. Egon ist jetzt ein Eiszapfen." 
                },
                { 
                    t: "In den BLAUEN Bereich!",
                    m: 5, f: 5, a: 0, c: -5, 
                    r: "Egon zögert: 'Blau? Bist du sicher? Das ist doch Kalt...' Er dreht auf Blau. Es wird warm. 'Verrückte Technik! Danke Müller!'" 
                },
                { 
                    t: "Dreh einfach irgendwas", 
                    m: 10, f: 0, a: 0, c: 0, 
                    r: "Egon hat den Stecker gezogen. Jetzt geht gar nichts mehr." 
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
            id: "call_kevin_port",
            title: "Azubi Kevin (Netzwerk)",
            text: "Du, ich hab hier ein loses Kabel im Serverraum gefunden. Ich wollte das mal aufräumen. Am Haupt-Switch ist Port 42 noch frei. Soll ich das da reinstecken? Passt perfekt.",
            opts: [
                { 
                    t: "Ja, mach mal (Ordnung muss sein)",
                    m: 120, f: -20, a: 40, c: 50, 
                    r: "ZAPP! Ein Knall, dann Dunkelheit. Kevin hat den Haupt-Switch gegrillt. Die ganze Firma ist offline. Du verbringst den Rest des Tages mit Notfall-Recovery." 
                },
                { 
                    t: "NEIN! FINGER WEG VON PORT 42!",
                    m: 5, f: 5, a: -5, c: -5, 
                    r: "Kevin zuckt zusammen: 'Okay, okay! Chill mal!' Er lässt das Kabel fallen. Katastrophe abgewendet." 
                },
                { 
                    t: "Frag den Hausmeister", 
                    m: 10, f: 10, a: 0, c: 0, 
                    r: "Kevin sucht den Hausmeister. Das Kabel liegt weiter rum. Glück gehabt (vorerst)." 
                }
            ]
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
                    t: "Ihn warten lassen (Erziehung)", 
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
            id: "call_password_caps",
            title: "Passwort geht nicht",
            text: "User: 'Mein Passwort geht nicht! Ich tippe es genau ein! Großes A, kleines b...' Du hörst im Hintergrund, wie er aggressiv auf die Tasten hämmert.",
            opts: [
                { 
                    t: "CAPSLOCK prüfen", 
                    m: 5, f: -5, a: -5, c: 0, 
                    r: "'Oh, da leuchtet ein Lämpchen!' Klassiker. Ticket in unter 1 Minute gelöst." 
                },
                { 
                    t: "Passwort zurücksetzen", 
                    req: "admin_pw", 
                    m: 10, f: 0, a: 0, c: 0, 
                    r: "Du setzt es auf 'Start123!' zurück. Er klebt sich einen Zettel an den Monitor. Sicherheit: Null." 
                },
                { 
                    t: "Ihn tippen lassen (Sadismus)", 
                    m: 20, f: 10, a: 10, c: 0, 
                    r: "Du lässt ihn 20 Mal tippen. 'Probieren Sie es noch mal.' Du genießt sein Leiden." 
                }
            ]
        },
        {
            id: "call_printer_noise",
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
            id: "call_scam_alert",
            title: "Microsoft Support?",
            text: "User flüstert: 'Ein netter Mann von Microsoft ist am Telefon. Er muss meinen PC fernsteuern. Ich hab ihm das Passwort gegeben. War das gut?'",
            opts: [
                { 
                    t: "NETZWERKSTECKER ZIEHEN!", 
                    m: 5, f: -10, a: 20, c: -10, 
                    r: "Du rennst los und reißt das Kabel aus der Wand. Hacker ausgesperrt. User geschockt. Schlimmeres verhindert." 
                },
                { 
                    t: "Diskutieren", 
                    m: 15, f: 0, a: 10, c: 30, 
                    r: "Während du erklärst, verschlüsselt der Hacker das Laufwerk. 'Ooops, meine Dateien sind weg.' Zu spät." 
                },
                { 
                    t: "Zusehen (Böse)", 
                    m: 5, f: 10, a: -10, c: 50, 
                    r: "'Klasse, Microsoft kümmert sich!' Du schaust zu, wie die Firma gehackt wird. Game Over Risiko extrem hoch." 
                }
            ]
        }
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
            id: "srv_sleep",
            title: "Das Versteck",
            text: "Du hast dir eine Höhle aus alten Kartons gebaut. Hier ist es dunkel, kühl und niemand nervt. Der Lüfter summt beruhigend.",
            opts: [
                { t: "Schlafen (1 Std)", m: 60, f: 40, a: -30, c: 20, r: "Bester Schlaf der Woche. Du hast 12 Anrufe verpasst und fühlst dich wie neu geboren." },
                { t: "Netflix gucken", m: 45, f: 30, a: -20, c: 10, r: "Eine Folge deiner Serie geschaut. Niemand hat dich gefunden." }
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
            text: "Du findest Bernd aus dem Vertrieb, der hier weinend auf dem Boden sitzt und Whisky trinkt. Er murmelt was von 'Umsatzzielen nicht erreicht'.",
            opts: [
                { t: "Mitharken", m: 30, f: 20, a: -40, c: 15, r: "Ihr seid beide leicht betrunken. Bernd ist eigentlich ganz okay, wenn er nicht über Verkaufszahlen redet." },
                { t: "Verpetzen", m: 10, f: -10, a: 0, c: -10, r: "Bernd ist gefeuert. Du bist sicher, aber fühlst dich wie ein Verräter." }
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
            id: "srv_rat",
            title: "Das seltsame Geräusch",
            text: "Aus Rack 4 kommt ein kratzendes Geräusch. Es klingt nicht wie ein Lüfter. Eher wie... Zähne auf Kabel.",
            opts: [
                { t: "Nachsehen (Mutig)", m: 30, f: -10, a: 20, c: 0, r: "Es war eine Ratte! Sie springt dich an. Du fliehst panisch, aber hast das angeknabberte Kabel isoliert." },
                { t: "Laut gegen den Schrank treten", m: 5, f: 5, a: -5, c: 5, r: "Das Geräusch hört auf. Das Tier ist entweder tot oder beleidigt. Problem 'gelöst'." },
                { t: "Giftköder auslegen", loot: "energy", m: 10, f: 0, a: 0, c: 0, r: "Du findest dabei eine noch volle Dose Energy Drink, die du mal versteckt hattest. Win!" }
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
            id: "srv_red",
            title: "Die rote Flüssigkeit",
            text: "Unter Rack 7 bildet sich eine Pfütze. Sie ist rot und klebrig. Es riecht süßlich. Ist das... Blut? Oder Sirup? Über dir verläuft keine Leitung.",
            opts: [
                { t: "Probieren (Mutig)", m: 5, f: 0, a: 0, c: 0, r: "Es ist Kirsch-Slushie. Jemand hat eine Maschine im Deckenboden versteckt. Lecker, aber ekelhaft." },
                { t: "Panik & Notruf", m: 30, f: -10, a: 20, c: 10, r: "Feuerwehr, Polizei und Chef rücken an. Es war nur ausgelaufene Kühlflüssigkeit mit Farbstoff. Peinlich." },
                { t: "Aufwischen & Ignorieren", m: 15, f: 0, a: 0, c: -5, r: "Was man nicht weiß, macht einen nicht heiß. Problem beseitigt." }
            ]
        },
        {
            id: "srv_illegal",
            title: "Das illegale Datencenter",
            text: "Du entdeckst hinter einer falschen Wand einen kompletten zweiten Serverraum. Er ist nicht im Inventar. Darauf laufen Webseiten für... sagen wir 'Erwachsenenunterhaltung'. Es gehört dem Vize-Chef.",
            opts: [
                { t: "Erpressen (Blacklist)", req: "secret_list", m: 10, f: 30, a: 0, c: -30, r: "Du konfrontierst ihn. Er gibt dir eine Gehaltserhöhung, damit du schweigst. Du bist jetzt korrupt." },
                { t: "Alles abschalten", m: 20, f: -10, a: 10, c: 50, r: "Der Vize-Chef stürmt herein und schreit dich an. Das wird ein Machtkampf." },
                { t: "Mitnutzen", m: 5, f: 20, a: -10, c: 20, r: "Du hostest jetzt deinen eigenen Blog dort. Gratis Hosting!" }
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
                { t: "Es sind Kopfhörer!", loot: "headphones", m: 5, f: 5, a: 0, c: 0, r: "Teure Noise-Cancelling Kopfhörer. Finders Keepers. Inventar +1." },
                { t: "Es ist ein Hammer?", loot: "hammer", m: 5, f: 5, a: 0, c: 0, r: "Warum liegt hier ein Hammer? Egal, nehm ich. Inventar +1." }
            ]
        },
        {
            id: "srv_loose_rack",
            title: "Das lose Rack",
            text: "Ein ganzes Server-Rack wackelt bedenklich. Eine Schraube fehlt.",
            opts: [
                { t: "Festschrauben", req: "screw", m: 10, f: -5, a: 0, c: -5, r: "Hält wieder. Katastrophe abgewendet." },
                { t: "Mit Kabelbindern sichern", req: "zip_ties", m: 5, f: 5, a: 0, c: 0, r: "Du hast das Rack ans Nachbar-Rack gebunden. Pfusch am Bau, aber hält." },
                { t: "Wegsehen", m: 0, f: 10, a: 0, c: 10, r: "Hoffentlich fällt es nicht um, wenn du weg bist." }
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
            text: "Ein Kondenswasser-Rohr der Klimaanlage tropft direkt auf den Haupt-Switch!",
            opts: [
                { t: "Panzertape drum!", req: "tape", m: 5, f: 0, a: -5, c: -10, r: "Dicht! Zumindest für heute. Switch gerettet." },
                { t: "Eimer drunter (Mülleimer)", m: 10, f: 5, a: 0, c: 0, r: "Du musst ihn alle 2 Stunden leeren. Nervig." },
                { t: "Rohr verbiegen", req: "hammer", m: 5, f: 0, a: 10, c: 20, r: "Du hast das Rohr weggebogen. Es ist gebrochen. Wasser Marsch!" }
            ]
        },
        {
            id: "srv_pw_list",
            title: "Versteckte Notiz",
            text: "Hinter Rack 5 klebt ein vergilbter Zettel mit Tesafilm. Darauf steht in krakeliger Schrift: 'TOP SECRET - NUR FÜR ADMINS'.",
            opts: [
                { 
                    t: "Entziffern (Neugier)", 
                    m: 5, f: 5, a: -5, c: 0, 
                    r: "Es sind keine Passwörter. Es ist eine Botschaft deines Vorgängers: 'Ich habe das Internet in einer Kiste im Keller versteckt. Wenn Google down ist, schüttelt die Kiste. P.S.: Trau niemals dem Drucker.' Okay... gut zu wissen." 
                },
                { 
                    t: "Hängen lassen", 
                    m: 0, f: 0, a: 0, c: 0, 
                    r: "Das ist Kulturgut. Das bleibt hängen." 
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
            text: "Auf dem Dashboard blinkt es rot: 'Kritische Sicherheitslücke in der Zeiterfassung! Patch verfügbar.' Es ist gerade Mittagspause, niemand ist eingeloggt. Der perfekte Moment?",
            opts: [
                { 
                    t: "Update installieren (Sicherheit)", 
                    m: 20, f: -10, a: 30, c: 10, 
                    r: "Update erfolgreich! Aber: Der 'Stempeln'-Button ist jetzt grün statt blau. Um 13 Uhr bricht Panik aus. 'ALLES SIEHT ANDERS AUS! ICH KANN SO NICHT ARBEITEN!' Das Telefon steht nicht mehr still. Du bist schuld am 'Chaos'." 
                },
                { 
                    t: "Ignorieren (Never touch a running system)", 
                    m: 0, f: 5, a: 0, c: 0, 
                    r: "Du klickst die Warnung weg. Wenn die Russen kommen, ist das ein Problem für Zukunfts-Du." 
                }
            ]
        },
		{
            id: "srv_consultant_fail",
            title: "Der teure Berater",
            text: "Ein externer 'Senior Strategy Consultant' (Tagessatz: 2000€) hat gerade den Stecker des Haupt-Servers gezogen, um sein iPhone zu laden. Alles ist aus. Der Chef stürmt rein: 'WIESO STEHT DER BETRIEB?!'",
            opts: [
                { 
                    t: "Auf den Berater zeigen", 
                    m: 10, f: -5, a: 50, c: 10, 
                    r: "Der Berater lacht glatt: 'Ah, Herr Müller wollte mir gerade die USV demonstrieren und hat wohl das falsche Kabel erwischt. Schlechtes Briefing!' Der Chef nickt dem Berater zu: 'Verstehe. Müller, passen Sie besser auf!' Der Berater zwinkert dir zu. Du kochst vor Wut." 
                },
                { 
                    t: "Stecker wieder reinrammen", 
                    m: 5, f: 0, a: 20, c: 20, 
                    r: "Funkenflug. Der Server fährt hoch, aber ein Netzteil ist durchgebrannt. Der Berater tippt auf seinem Handy: 'Hardware veraltet. Empfehle Neukauf.' Der Chef stimmt ihm zu. Du bist der Depp, der die 'schlechte Hardware' wartet." 
                },
                { 
                    t: "Berater anschreien", 
                    m: 2, f: 0, a: 10, c: 50, 
                    r: "Du brüllst den Gast an. Der Chef wird blass. 'Müller! Benehmen Sie sich vor unseren Gästen! Abmahnung wegen unprofessionellem Verhalten!' Der Berater grinst." 
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
            text: "Du findest ein zerfetztes Netzwerkkabel am Boden. Jemand ist drüber gestolpert und hat die Buchse aus der Wand gerissen. Der Uplink zum Vertrieb ist tot. Markus brüllt schon aus der Ferne: 'WIESO GEHT MEIN SALESFORCE NICHT?!'",
            opts: [
                { 
                    t: "Neues Kabel patchen", 
                    req: "kabel", 
                    m: 10, f: -5, a: 0, c: -5, 
                    r: "Zack, neues Kabel rein, Buchse provisorisch fixiert. Link-Lampe leuchtet grün. Du hast den Umsatz gerettet." 
                },
                { 
                    t: "Das kaputte flicken (Tape)", 
                    req: "tape", 
                    m: 20, f: 0, a: 5, c: 5, 
                    r: "Du wickelst Tape drum und biegst die Adern gerade. Es hält... irgendwie. 50% Packet Loss, aber Markus hält kurz die Klappe." 
                },
                { 
                    t: "WLAN-Stick als Brücke", 
                    req: "usb_stick", 
                    m: 15, f: 5, a: 0, c: 0, 
                    r: "Du steckst den Stick in den Switch-Port. Eine wackelige WLAN-Brücke steht. Besser als nichts, aber keine Dauerlösung." 
                },
                { 
                    t: "Schild 'Wartungsarbeiten' aufstellen", 
                    m: 5, f: 10, a: -5, c: 25, 
                    r: "Du stellst ein Schild auf und gehst. Der Vertrieb ist 2 Stunden offline. Der Chef stürmt später wutentbrannt zu dir: 'WARTUNG?! WÄHREND DER KERNARBEITSZEIT?!'" 
                }
            ]
        },
        {
            id: "srv_overheat_warning",
            title: "Hitzeflimmern",
            text: "Server 'Berta' (Buchhaltung) glüht. Der Lüfter steht still und es riecht nach heißem Silizium. Wenn Berta stirbt, sind die Gehaltsdaten weg.",
            opts: [
                { 
                    t: "Mit Feuerlöscher kühlen (CO2)", 
                    req: "fire_ext", 
                    m: 5, f: -10, a: 10, c: -10, 
                    r: "PFFFFT! Ein eiskalter CO2-Stoß direkt in den Lufteinlass. Die Temperatur fällt schlagartig auf 10 Grad. Berta schnurrt wieder. Unkonventionell, aber effektiv!" 
                },
                { 
                    t: "Gehäuse öffnen & pusten", 
                    req: "screw", 
                    m: 45, f: -15, a: 20, c: 0, 
                    r: "Du schraubst das Gehäuse auf, damit Luft drankommt. Du musstest 45 Minuten daneben stehen und wedeln. Der Staub in deiner Lunge kratzt." 
                },
                { 
                    t: "Ventilator aus Chef-Büro klauen", 
                    m: 20, f: -5, a: 5, c: 15, 
                    r: "Du holst den Dyson-Ventilator vom Chef. Berta ist kühl, aber der Chef schwitzt jetzt und sucht sein Spielzeug." 
                },
                { 
                    t: "Ignorieren & Tür zu", 
                    m: 5, f: 10, a: 0, c: 50, 
                    r: "Du gehst. 10 Minuten später crasht der Server. Frau Elster steht kreischend im Flur. Der Chef macht dich persönlich haftbar. Das gibt richtig Ärger." 
                }
            ]
        },
        {
            id: "srv_night_shift_remnant",
            title: "Überreste der Nachtschicht",
            text: "Du findest eine halbvolle Dose Energy Drink und einen Zettel auf dem Server: 'RAID-Controller spinnt. Ich geh heim, mir egal.' Eine rote Lampe blinkt hektisch.",
            opts: [
                { 
                    t: "Energy trinken", 
                    loot: "energy", 
                    m: 5, f: -5, a: -5, c: 10, 
                    r: "Du exst die abgestandene Plörre. Koffein-Kick! Aber während du trinkst, fällt Platte 2 aus. Der Chef fragt: 'Warum ist das Laufwerk X: weg?!'" 
                },
                { 
                    t: "RAID reparieren (Pflicht)", 
                    m: 60, f: -20, a: 10, c: -10, 
                    r: "Du tauschst die Platte im Hot-Swap und startest den Rebuild. Es dauert eine Stunde. Du hast den Kollegen gerettet, aber keiner dankt dir." 
                },
                { 
                    t: "Kollegen anrufen & anmeckern", 
                    m: 15, f: 0, a: -10, c: 5, 
                    r: "Du weckst ihn auf und brüllst ihn an. Er legt auf. Das System blinkt weiter rot. Rache ist süß, löst aber keine Probleme." 
                }
            ]
        },
        {
            id: "srv_rat_king",
            title: "Der Rattenkönig",
            text: "Hinter dem Patchpanel raschelt es. Du leuchtest rein. Drei Ratten nagen gerade am Glasfaserkabel für die Geschäftsleitung! Wenn das durch ist, ist der CEO offline.",
            opts: [
                { 
                    t: "Kabelbinder als Lasso nutzen", 
                    req: "zip_ties", 
                    m: 30, f: -10, a: 10, c: -5, 
                    r: "In einem epischen Kampf fängst du die Biester und setzt sie vor die Tür. Du bist verschwitzt, aber das Internet lebt." 
                },
                { 
                    t: "Mit Hammer verjagen", 
                    req: "hammer", 
                    m: 10, f: 0, a: 20, c: 10, 
                    r: "Du haust gegen die Wand. Die Ratten fliehen panisch – und reißen dabei ein Kabel halb ab. Das Internet wird heute wackelig sein." 
                },
                { 
                    t: "Alten Donut opfern", 
                    req: "donut", 
                    m: 5, f: 0, a: -5, c: 0, 
                    r: "Du wirfst den Donut in die Ecke. Die Ratten stürzen sich drauf und lassen das Kabel in Ruhe. Ein Opfer für den Gott des Internets." 
                },
                { 
                    t: "Wegrennen (Angst)", 
                    m: 5, f: 5, a: 10, c: 40, 
                    r: "Du fliehst. 10 Minuten später ist das Internet weg. Der CEO kommt persönlich runter: 'MÜLLER! WARUM SIND HIER RATTEN?!'" 
                }
            ]
        },
        {
            id: "srv_legacy_tape",
            title: "Das Backup-Band",
            text: "Das Bandlaufwerk spuckt das Tape nicht mehr aus. 'Error 404: Tape stuck'. Es ist das einzige Backup von gestern. Wenn du es kaputt machst, sind die Daten futsch.",
            opts: [
                { 
                    t: "Sanft mit Schraubendreher hebeln", 
                    req: "screw", 
                    m: 20, f: -5, a: 0, c: -5, 
                    r: "Mit chirurgischer Präzision öffnest du die Blende. Das Tape gleitet heraus. Daten gerettet." 
                },
                { 
                    t: "Mit Zange ziehen (Kabelbinder-Trick)", 
                    req: "zip_ties", 
                    m: 10, f: 0, a: 5, c: 5, 
                    r: "Du fädelst einen Binder ein und ziehst. Es kommt raus, aber das Gehäuse hat Kratzer. Hoffentlich merkt es keiner." 
                },
                { 
                    t: "Gewalt anwenden", 
                    m: 5, f: 0, a: 20, c: 30, 
                    r: "Du reißt es raus. Bandsalat. Das Backup ist hinüber. Du wirfst das Band schnell in den Müll. Das ist eine Zeitbombe." 
                },
                { 
                    t: "Drin lassen & hoffen", 
                    m: 0, f: 10, a: 0, c: 20, 
                    r: "Du ignorierst den Fehler. Das Backup heute Nacht wird fehlschlagen. Morgen hast du ein Problem." 
                }
            ]
        },
        {
            id: "srv_egon_stash",
            title: "Egons Geheimversteck",
            text: "Du findest hinter einem losen Bodenblech eine Kiste von Hausmeister Egon. Inhalt: Eine Flasche Korn, alte Magazine und... eine Liste mit allen Türcodes.",
            opts: [
                { 
                    t: "Liste abfotografieren (Wissen)", 
                    m: 5, f: 5, a: 0, c: 0, 
                    r: "Du kennst jetzt den Master-Code: 9999. Das wird Türen öffnen (sprichwörtlich). Wissen ist Macht." 
                },
                { 
                    t: "Den Korn trinken", 
                    m: 15, f: 10, a: -20, c: 10, 
                    r: "Es brennt in der Kehle. Du bist leicht beschwipst. Arbeit ist jetzt erträglicher, aber deine Fahne ist riskant." 
                },
                { 
                    t: "Melden", 
                    m: 15, f: 0, a: 10, c: 5, 
                    r: "Du petzt beim Chef. Egon kriegt Ärger. Er weiß, dass du es warst. Deine Bürotür wird ab morgen klemmen." 
                }
            ]
        },
        {
            id: "srv_crypto_miner",
            title: "Der versteckte Miner",
            text: "Ein Server läuft auf 100% Last, die Lüfter heulen. Du checkst die Prozesse: 'KevinCoin_Miner.exe'. Der Azubi schürft Krypto auf Firmenkosten! Der Server ist kurz vorm Hitzetod.",
            opts: [
                { 
                    t: "Prozess killen & Kevin abmahnen", 
                    m: 15, f: -5, a: 5, c: -5, 
                    r: "Kevin heult: 'Ich wollte doch nur reich werden!' Du bist streng aber gerecht. Server kühlt ab." 
                },
                { 
                    t: "Wallet-Adresse auf deine ändern", 
                    req: "admin_pw", 
                    m: 10, f: 20, a: -10, c: 25, 
                    r: "Du leitest die Coins auf dein Konto um. Böse? Ja. Profitabel? Oh ja. Aber wenn IT-Sec das prüft, bist du dran." 
                },
                { 
                    t: "Laufen lassen (Ignoranz)", 
                    m: 0, f: 10, a: 0, c: 40, 
                    r: "Du lässt es laufen. 30 Minuten später schaltet der Server wegen Überhitzung ab. SAP fällt aus. Alle schreien." 
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
            id: "srv_cable_trip",
            title: "Die Stolperfalle 2.0",
            text: "Du findest ein zerfetztes Netzwerkkabel. Der Uplink zum Vertrieb ist tot. Markus brüllt schon aus der Ferne: 'WIESO GEHT MEIN SALESFORCE NICHT?! ICH VERLIERE GELD!'",
            opts: [
                { 
                    t: "Neues Kabel patchen", 
                    req: "kabel", 
                    m: 10, f: -5, a: 0, c: -5, 
                    r: "Zack, neues Kabel rein. Link-Lampe leuchtet grün. Du hast den Umsatz gerettet. Markus ist still (fürs Erste)." 
                },
                { 
                    t: "Das kaputte flicken (Tape)", 
                    req: "tape", 
                    m: 20, f: 0, a: 5, c: 5, 
                    r: "Du wickelst Tape drum. Es hält... irgendwie. 50% Packet Loss. Der Vertrieb beschwert sich über 'Lags', aber sie sind online." 
                },
                { 
                    t: "WLAN-Stick als Brücke", 
                    req: "usb_stick", 
                    m: 15, f: 5, a: 0, c: 0, 
                    r: "Du steckst den Stick in den Server. Eine wackelige WLAN-Brücke steht. Besser als nichts." 
                },
                { 
                    t: "Schild 'Wartungsarbeiten' aufstellen", 
                    m: 5, f: 10, a: -5, c: 40, 
                    r: "Du stellst ein Schild auf und gehst. Der Chef stürmt später wutentbrannt zu dir: 'WARTUNG?! WÄHREND DER KERNARBEITSZEIT?! SIND SIE IRRE?!'" 
                }
            ]
        },
        {
            id: "srv_overheat_warning",
            title: "Hitzeflimmern",
            text: "Server 'Berta' (Buchhaltung) glüht. Der Lüfter steht still. Wenn Berta stirbt, sind die Gehaltsdaten weg. Es riecht schon verschmort.",
            opts: [
                { 
                    t: "Mit Feuerlöscher kühlen (CO2)", 
                    req: "fire_ext", 
                    m: 5, f: -10, a: 10, c: -10, 
                    r: "PFFFFT! Ein eiskalter CO2-Stoß. Temperatur fällt auf 10 Grad. Berta läuft weiter. Unkonventionell, aber effektiv!" 
                },
                { 
                    t: "Gehäuse öffnen & pusten", 
                    req: "screw", 
                    m: 45, f: -15, a: 20, c: 0, 
                    r: "Du schraubst auf und wedelst Luft rein. Du stehst 45 Minuten da. Der Staub kratzt in der Lunge." 
                },
                { 
                    t: "Ventilator vom Chef klauen", 
                    m: 20, f: -5, a: 5, c: 20, 
                    r: "Du holst den Dyson-Ventilator vom Chef. Berta ist kühl, aber der Chef schwitzt und sucht sein Spielzeug. Das gibt Ärger." 
                },
                { 
                    t: "Gehen (Ignoranz)", 
                    m: 5, f: 10, a: 0, c: 60, 
                    r: "Du gehst. 10 Minuten später crasht der Server. Frau Elster steht heulend im Flur. Der Chef macht dich persönlich haftbar. Abmahnungs-Gefahr!" 
                }
            ]
        },
        {
            id: "srv_night_shift_remnant",
            title: "Überreste der Nachtschicht",
            text: "Eine leere Pizza-Schachtel und ein Zettel: 'RAID-Controller spinnt. Ich geh heim.' Eine rote Lampe blinkt hektisch.",
            opts: [
                { 
                    t: "Energy trinken & Fixen", 
                    loot: "energy", 
                    m: 60, f: -15, a: 5, c: -10, 
                    r: "Du trinkst den Rest Energy (Inventar +1) und tauschst die Platten. Es dauert eine Stunde, aber das System läuft wieder." 
                },
                { 
                    t: "Nur Energy trinken (Gier)", 
                    loot: "energy", 
                    m: 5, f: 5, a: -5, c: 20, 
                    r: "Du nimmst den Drink und gehst. Später fällt das Laufwerk aus. Chef: 'Warum haben Sie das nicht gesehen?!'" 
                },
                { 
                    t: "Kollegen anrufen & anmeckern", 
                    m: 15, f: 0, a: -10, c: 5, 
                    r: "Du weckst ihn auf und brüllst ihn an. Er legt auf. Das System blinkt weiter rot." 
                }
            ]
        },
        {
            id: "srv_rat_king",
            title: "Der Rattenkönig",
            text: "Drei Ratten nagen am Glasfaserkabel für die Geschäftsleitung! Wenn das durch ist, ist der CEO offline.",
            opts: [
                { 
                    t: "Kabelbinder als Lasso nutzen", 
                    req: "zip_ties", 
                    m: 30, f: -10, a: 10, c: -5, 
                    r: "Du fängst die Biester lebend. Du bist verschwitzt, aber das Internet lebt." 
                },
                { 
                    t: "Mit Hammer verjagen", 
                    req: "hammer", 
                    m: 10, f: 0, a: 20, c: 15, 
                    r: "Du haust gegen die Wand. Die Ratten fliehen – und reißen dabei ein Kabel ab. Das Internet wackelt heute." 
                },
                { 
                    t: "Alten Donut opfern", 
                    req: "donut", 
                    m: 5, f: 0, a: -5, c: 0, 
                    r: "Du wirfst den Donut hin. Die Ratten fressen ihn statt des Kabels. Ein Opfer für den Gott des Internets." 
                },
                { 
                    t: "Wegrennen (Panik)", 
                    m: 5, f: 5, a: 10, c: 50, 
                    r: "Du fliehst. Kurz darauf ist das Internet weg. Der CEO kommt persönlich runter: 'MÜLLER! WARUM SIND HIER RATTEN?!'" 
                }
            ]
        },
        {
            id: "srv_legacy_tape",
            title: "Das Backup-Band",
            text: "Das Bandlaufwerk klemmt. 'Error 404: Tape stuck'. Das einzige Backup von gestern.",
            opts: [
                { 
                    t: "Sanft mit Schraubendreher", 
                    req: "screw", 
                    m: 20, f: -5, a: 0, c: -5, 
                    r: "Chirurgische Präzision. Das Tape gleitet heraus. Daten gerettet." 
                },
                { 
                    t: "Mit Zange ziehen (Kabelbinder)", 
                    req: "zip_ties", 
                    m: 10, f: 0, a: 5, c: 5, 
                    r: "Es kommt raus, aber das Gehäuse hat Kratzer. Hoffentlich merkt es keiner." 
                },
                { 
                    t: "Gewalt anwenden", 
                    m: 5, f: 0, a: 20, c: 30, 
                    r: "Du reißt es raus. Bandsalat. Du wirfst das Band schnell in den Müll. Das ist eine Zeitbombe." 
                },
                { 
                    t: "Drin lassen", 
                    m: 0, f: 10, a: 0, c: 20, 
                    r: "Backup wird heute Nacht fehlschlagen. Morgen hast du ein Problem." 
                }
            ]
        },
        {
            id: "srv_crypto_miner",
            title: "Der versteckte Miner",
            text: "Ein Server läuft heiß. Prozess: 'KevinCoin_Miner.exe'. Der Azubi schürft auf Firmenkosten!",
            opts: [
                { 
                    t: "Prozess killen & Melden", 
                    m: 15, f: -5, a: 5, c: -5, 
                    r: "Kevin kriegt Ärger. Du hast die Hardware gerettet." 
                },
                { 
                    t: "Wallet auf deine ändern", 
                    req: "admin_pw", 
                    m: 10, f: 20, a: -10, c: 30, 
                    r: "Du leitest die Coins um. Profitabel! Aber wehe, IT-Sec prüft die Logs. (Radar +30!)" 
                },
                { 
                    t: "Ignorieren", 
                    m: 0, f: 10, a: 0, c: 45, 
                    r: "Du lässt es laufen. 30 Minuten später schaltet der Server wegen Überhitzung ab. SAP fällt aus. Alle schreien nach dir." 
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
            text: "Alle LEDs an den Servern blinken im Takt. Es sieht aus wie eine Lichtorgel. Das System läuft unrund.",
            opts: [
                { 
                    t: "Handbuch checken (Reset)", 
                    req: "manual", 
                    m: 15, f: -5, a: -5, c: 0, 
                    r: "Fehlercode 0xDEADBEEF. Ein Firmware-Bug. Du startest sauber neu. Alles grün." 
                },
                { 
                    t: "Musik an & Tanzen", 
                    m: 15, f: 10, a: -20, c: 15, 
                    r: "Du legst eine Sohle aufs Parkett. Danach startest du neu. Leider stand der Chef in der Tür und hat dein Solo gesehen. 'Haben Sie zu viel Energie, Müller?!'" 
                },
                { 
                    t: "Stecker ziehen (Hard Reset)", 
                    m: 5, f: 0, a: 0, c: 10, 
                    r: "Aus. An. Läuft wieder. Aber der Datenbank-Integritäts-Check meckert." 
                }
            ]
        },
        {
            id: "srv_ac_failure",
            title: "Klima-Ausfall",
            text: "Die Klimaanlage ist aus. Es sind 40 Grad im Raum. Die Server schwitzen.",
            opts: [
                { 
                    t: "Tür aufkeilen (Stuhl)", 
                    m: 5, f: 0, a: 0, c: 10, 
                    r: "Offene Tür ist ein Sicherheitsrisiko (Chef mag das nicht), aber besser als der Hitzetod der Hardware." 
                },
                { 
                    t: "Ventilator basteln (USB)", 
                    req: "usb_stick", 
                    m: 15, f: -5, a: -5, c: 0, 
                    r: "Du baust einen Mini-Lüfter aus Elektroschrott. Bringt wenig, fühlt sich aber nach MacGyver an." 
                },
                { 
                    t: "Eiswürfel holen", 
                    m: 10, f: 5, a: 0, c: 20, 
                    r: "Wasser und Server? Schlechte Idee. Es tropft ins Rack. Kurzschluss-Gefahr!" 
                }
            ]
        }
    ],

// === KAFFEE ===
    coffee: [
        {
            id: "cof_note",
            title: "Fundstück am Automaten",
            text: "Jemand hat hier einen gelben Notizzettel liegen lassen. Darauf steht 'WLAN-PW: 1234Secure'. Das ist Schmidts Handschrift.",
            opts: [
                { t: "Zettel einstecken", loot: "wifi_note", m: 5, f: 5, a: 0, c: 0, r: "Das könnte noch nützlich werden. Wissen ist Macht." },
                { t: "Wegwerfen", m: 5, f: 0, a: 0, c: 0, r: "Sicherheitsrisiko beseitigt." }
            ]
        },
        {
            id: "cof_donut",
            title: "Reste vom Meeting",
            text: "Im Konferenzraum nebenan steht noch eine Schachtel mit einem einsamen, leicht angetrockneten Donut.",
            opts: [
                { t: "Donut retten", loot: "donut", m: 5, f: 5, a: -5, c: 0, r: "Lecker und taktisch wertvoll für Bestechungen." },
                { t: "Ignorieren", m: 0, f: 0, a: 0, c: 0, r: "Du hast deinen Stolz." }
            ]
        },
        {
            id: "cof_flirt",
            title: "Der Schwarm",
            text: "Sarah/Marc aus der HR steht da. Er/Sie lächelt dich an. 'Na, IT-Held? Alles im Griff oder brennt der Server?'",
            opts: [
                { t: "Flirten: 'Für dich lösche ich jedes Feuer'", m: 20, f: 10, a: -30, c: 5, r: "Es läuft gut! Ihr verabredet euch zum Mittagessen. Deine Laune ist top." },
                { t: "Panisch weglaufen", m: 5, f: 0, a: 10, c: 0, r: "Peinlich berührt geflüchtet. Kaffee vergessen. Du hasst dich selbst." }
            ]
        },
        {
            id: "cof_boss",
            title: "Der Chef lauert",
            text: "Der Chef steht an der Maschine und zählt Bohnen. Er dreht sich langsam zu dir um. 'Müller? Schon der fünfte Kaffee? Arbeiten wir auch mal was?'",
            opts: [
                { t: "Lüge: 'Ist für einen wichtigen Kunden'", m: 5, f: 10, a: 5, c: 5, r: "Er glaubt es misstrauisch und lässt dich gehen." },
                { t: "Rechtfertigen", m: 15, f: -5, a: 10, c: 10, r: "Er hält dir einen 15-Minuten-Vortrag über Koffein und Produktivität." }
            ]
        },
        {
            id: "cof_ball",
            title: "Werbegeschenk",
            text: "Ein Vertreter hat rote Bälle mit Firmenlogo dagelassen.",
            opts: [
                { t: "Stressball nehmen", loot: "stressball", m: 5, f: 0, a: -5, c: 0, r: "Gut zum Kneten, wenn User nerven." }
            ]
        },
        {
            id: "cof_empty",
            title: "Leere Maschine",
            text: "ERROR: BEANS EMPTY. Jemand hat den letzten Kaffee genommen und nicht aufgefüllt. Es war bestimmt Kevin.",
            opts: [
                { t: "Auffüllen", m: 15, f: -5, a: 10, c: 0, r: "Du bist der Depp für alles. Aber immerhin hast du jetzt Kaffee." },
                { t: "Wütend gegen Maschine treten", m: 5, f: 0, a: 5, c: 10, r: "Das hat Lärm gemacht. Der Chef guckt aus seinem Büro." }
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
            text: "Die neue High-Tech Maschine zeigt auf dem Display: 'FEED ME'. Sie weigert sich, Kaffee zu machen, bis sie 'hochwertige Bohnen' bekommt. Die billigen Aldi-Bohnen spuckt sie aus.",
            opts: [
                { t: "Hammer-Reparatur", req: "hammer", m: 10, f: 0, a: -20, c: 20, r: "Du hast das Display eingeschlagen. Jetzt läuft der Kaffee wieder, aber die Maschine tropft. Problem 'gelöst'." },
                { t: "Gute Bohnen kaufen (Privatgeld)", m: 20, f: -5, a: 10, c: -5, r: "Du hast 10€ ausgegeben. Der Kaffee schmeckt himmlisch, aber du bist pleite." },
                { t: "IT-Trick: Ein/Aus", m: 5, f: 5, a: 5, c: 0, r: "Hat nicht geklappt. Sie lacht dich digital aus." }
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
            title: "Der letzte Tropfen Milch",
            text: "Kollege Bernd greift nach der letzten Milchpackung. Du greifst gleichzeitig. Eure Hände berühren sich. Es knistert vor Spannung (und Wut).",
            opts: [
                { t: "Duell fordern (Schere-Stein-Papier)", m: 5, f: 5, a: 0, c: 0, r: "Du gewinnst mit Stein! Die Milch gehört dir. Bernd weint leise." },
                { t: "Großzügig sein", m: 0, f: 0, a: 10, c: -5, r: "Du lässt ihm die Milch. Er schüttet alles in seinen Tee. Alles. Was für ein Monster." },
                { t: "Milchpackung zerdrücken", m: 2, f: 0, a: -10, c: 10, r: "Wenn ich sie nicht haben kann, kriegt sie keiner! Milch überall. Chaos." }
            ]
        },
        {
            id: "cof_juergen",
            title: "Der schwatzhafte Kollege",
            text: "Jürgen aus dem Vertrieb kommt rein. 'Na, auch mal Pause? Ich muss dir von meinem neuen Rasenmäher-Roboter erzählen!'",
            opts: [
                { t: "Kopfhörer aufsetzen", req: "headphones", m: 5, f: 5, a: -10, c: 0, r: "Du nickst und lächelst, hörst aber Death Metal. Jürgen redet gegen eine Wand. Perfekt." },
                { t: "Zuhören", m: 20, f: 10, a: 15, c: 0, r: "Du weißt jetzt alles über Mulch-Funktionen. Du willst sterben." },
                { t: "Flüchten", m: 0, f: 0, a: 5, c: 0, r: "Kein Kaffee für dich." }
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
            text: "Die 'Espresso'-Taste an der Maschine klebt fest und geht nicht mehr.",
            opts: [
                { t: "Mit Schraubendreher lösen", req: "screw", m: 5, f: 0, a: -5, c: 0, r: "Du hebelst die Taste raus, reinigst sie kurz. Läuft." },
                { t: "Draufhauen", m: 2, f: 0, a: 5, c: 5, r: "Jetzt ist die Taste abgebrochen. Ups." }
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
            title: "Lautes Kauen",
            text: "Die Kollegin Sabine isst einen Apfel. Mit offenem Mund. SCHMATZ. KNACK. SCHMATZ.",
            opts: [
                { t: "Kopfhörer auf!", req: "headphones", m: 0, f: 5, a: -10, c: 0, r: "Stille. Frieden." },
                { t: "Wutball kneten", req: "stressball", m: 10, f: 0, a: -5, c: 0, r: "Du drückst den Ball fast kaputt. Deine Ader an der Stirn pocht." },
                { t: "Kommentieren", m: 5, f: 0, a: 10, c: 5, r: "Es gibt Streit. Stimmung im Keller." }
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
            title: "Gespräch am Nebentisch",
            text: "Du hörst, wie sich der Kantinen-Chef lautstark beschwert: 'Ich bin kein KOCH! Ich bin *Senior Nutrition Artist*! Wer mich noch einmal 'Koch' nennt, kriegt versalzene Suppe bis zur Rente!'",
            opts: [
                { 
                    t: "Grinsend zuhören", 
                    m: 5, f: 5, a: 0, c: 0, 
                    r: "Senior Nutrition Artist... alles klar. Man kann es auch übertreiben." 
                },
                { 
                    t: "Ihn 'Koch' rufen (Provokation)", 
                    m: 5, f: 0, a: 10, c: 5, 
                    r: "Er wirft dir einen bösen Blick zu. Dein nächstes Essen wird furchtbar schmecken." 
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
            title: "Das IoT-Upgrade",
            text: "Jemand hat einen billigen 'Smart Home Adapter' an den Stromstecker der Kaffeemaschine gebastelt. Das Ding sprüht Funken und riecht nach verschmortem Plastik. Brandgefahr!",
            opts: [
                { 
                    t: "Stecker sofort ziehen (Sicherheit)", 
                    m: 10, f: -5, a: 30, c: 30, 
                    r: "Du rettest die Firma vor einem Brand. Da stürmt der Marketing-Chef rein: 'MEIN PROTOTYP! Ich habe wochenlang an der 'Coffee-Cloud' gearbeitet! Sie Technologie-Feind!' Er beschwert sich beim CEO über deine 'destruktive Haltung'." 
                },
                { 
                    t: "Brennen lassen", 
                    m: 5, f: 10, a: -10, c: 0, 
                    r: "Nicht dein Adapter, nicht dein Feuer. Du holst dir eine Cola und schaust zu, wie die Sprinkleranlage im Marketing anspringt." 
                }
            ]
        },
		{
            id: "cof_descaling",
            title: "Kalk-Alarm",
            text: "Die Maschine blinkt hektisch: 'BITTE ENTKALKEN'. Der Kaffee tröpfelt nur noch traurig in die Tasse. Wenn das keiner macht, ist das Ding bald Schrott.",
            opts: [
                { 
                    t: "Entkalkung starten (Sozial)", 
                    m: 10, f: -10, a: 40, c: 0, 
                    r: "Du drückst den Knopf. Display: 'Vorgang läuft... Restzeit: 45 Minuten'. HINTER DIR BILDET SICH EINE SCHLANGE. 'Toll Müller, jetzt kriegt keiner mehr Kaffee! Musste das jetzt sein?!' Du wirst ausgebuht." 
                },
                { 
                    t: "Schild 'DEFEKT' dranbappen", 
                    req: "wifi_note", 
                    m: 2, f: 5, a: -5, c: 0, 
                    r: "Du klebst einen Zettel dran und gehst. Die Kollegen seufzen enttäuscht und gehen wieder. Du hast deine Ruhe (und keinen Kaffee)." 
                },
                { 
                    t: "Ignorieren & Tröpfeln lassen", 
                    m: 5, f: 0, a: 10, c: 0, 
                    r: "Du wartest 5 Minuten für eine halbe Tasse lauwarme Brühe. Besser als nichts." 
                }
            ]
        },
		{
            id: "cof_spill_blame",
            title: "Die Kaffeelache",
            text: "Jemand hat eine riesige Pfütze Kaffee vor der Maschine verschüttet und ist abgehauen. Bevor jemand ausrutscht, holst du Zewa und kniest dich hin, um es aufzuwischen.",
            opts: [
                { 
                    t: "Aufwischen (Sozial)", 
                    m: 5, f: -5, a: 30, c: 20, 
                    r: "Der Chef kommt um die Ecke. Er sieht die Pfütze und dich am Boden. 'Müller! Herrgott, sind Sie unfähig, eine Tasse zu halten? Putzen Sie das gefälligst ordentlich weg! Peinlich...' Er geht kopfschüttelnd weiter. Du kniest im Dreck und kochst vor Wut." 
                },
                { 
                    t: "Schild 'Vorsicht Rutschig' aufstellen", 
                    req: "wifi_note", 
                    m: 2, f: 5, a: 0, c: 0, 
                    r: "Du stellst dein improvisiertes Schild auf. Kurz darauf hörst du ein 'Hoppla!' und Fluchen. Nicht dein Problem." 
                },
                { 
                    t: "Drübersteigen", 
                    m: 0, f: 5, a: 0, c: 0, 
                    r: "Soll sich doch die Putzkolonne drum kümmern." 
                }
            ]
        },
        {
            id: "cof_elster_fight",
            title: "Streit um den Kühlschrank",
            text: "Frau Elster wirft dein Essen weg! 'Das stinkt nach Zwiebeln!', keift sie. Du stellst sie zur Rede.",
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
            title: "MISSION: Vorbereitung (Teil 1)",
            text: "Du hörst, wie Chantal am Telefon prahlt: 'Ich kriege 500€ mehr, nur wegen meinem Lächeln!' Du kochst vor Wut. Du brauchst einen Plan für deine Verhandlung.",
            opts: [
                { 
                    t: "Leistungen notieren (Quest)", 
                    loot: "arg_list_1", 
                    m: 10, f: -5, a: 5, c: 0, 
                    r: "Du nimmst eine Serviette und schreibst auf: '1000 Tickets gelöst, Brände verhindert, Server gerettet'. Das ist Argument #1. Inventar +1." 
                },
                { 
                    t: "Chantal anbrüllen", 
                    m: 5, f: 0, a: 20, c: 10, 
                    r: "Du machst ihr eine Szene. Sie heult. Jetzt hast du zwar Dampf abgelassen, aber keine Argumente." 
                },
                { 
                    t: "Frust-Kaffee trinken", 
                    m: 5, f: 5, a: 10, c: 0, 
                    r: "Du schluckst den Ärger runter. Das ändert nichts an deinem Gehalt." 
                },
                { 
                    t: "Stressball quetschen", 
                    req: "stressball", 
                    m: 5, f: 0, a: -15, c: 0, 
                    r: "Der Ball quietscht. Du wirst ruhiger. Aber ohne Liste hast du nichts in der Hand." 
                }
            ]
        },
        {
            id: "cof_markus_flex",
            title: "Der Angeber",
            text: "Markus (Vertrieb) blockiert die Maschine. 'Meine Uhr kostet mehr als dein Auto.' Er grinst.",
            opts: [
                { 
                    t: "Stressball werfen", 
                    req: "stressball", 
                    m: 5, f: 0, a: -20, c: 30, 
                    r: "Treffer auf die Nase! Er jault. Du fühlst dich super. Aber der Chef hat es gesehen. Radar +30!" 
                },
                { 
                    t: "Kopfhörer aufsetzen", 
                    req: "headphones", 
                    m: 5, f: 5, a: -10, c: 0, 
                    r: "Du hörst Mozart, er redet mit der Wand. Du holst dir Kaffee und gehst." 
                },
                { 
                    t: "Kontern: 'Geleast?'", 
                    m: 10, f: 0, a: 5, c: 5, 
                    r: "Er wird rot. Die Kollegen lachen. Sieg auf ganzer Linie." 
                },
                { 
                    t: "Warten", 
                    m: 20, f: 0, a: 15, c: 0, 
                    r: "Du wartest devot, bis er fertig geprahlt hat. Demütigend." 
                }
            ]
        },
        {
            id: "cof_gabi_sad",
            title: "Gabis Kummerecke",
            text: "Gabi weint. 'Mein Kaktus ist tot.' Sie arbeitet nicht mehr, die Post stapelt sich.",
            opts: [
                { 
                    t: "Donut anbieten", 
                    req: "donut", 
                    m: 10, f: 5, a: -10, c: -5, 
                    r: "Zucker hilft. Sie lächelt wieder und arbeitet weiter. Radar sinkt (Chef mag Post)." 
                },
                { 
                    t: "Energy Drink geben", 
                    req: "energy", 
                    m: 5, f: 0, a: 5, c: 5, 
                    r: "Sie ist jetzt hyperaktiv und wirft Briefe durch den Raum. Chaos, aber lustig." 
                },
                { 
                    t: "Zuhören (Zeitverschwendung)", 
                    m: 45, f: -10, a: -5, c: 15, 
                    r: "Du hörst dir 45 Minuten Kaktus-Geschichten an. Am Platz brennt es derweil. Chef ist unzufrieden." 
                }
            ]
        },
        {
            id: "cof_machine_broke",
            title: "Wasserschaden",
            text: "Die Maschine leckt! Wasser läuft Richtung Steckdose. Funkenflug droht.",
            opts: [
                { 
                    t: "Mit Tape abdichten", 
                    req: "tape", 
                    m: 10, f: -5, a: 0, c: -10, 
                    r: "Du tapest das Leck zu. Hässlich, aber die Küche bleibt trocken. Held." 
                },
                { 
                    t: "Stecker ziehen", 
                    m: 5, f: 5, a: 10, c: 10, 
                    r: "Strom aus. Gefahr weg. Aber kein Kaffee mehr für heute. Kollegen hassen dich." 
                },
                { 
                    t: "Ignorieren & Gehen", 
                    m: 5, f: 10, a: 0, c: 50, 
                    r: "Du gehst. Kurz darauf Kurzschluss. Stromausfall im ganzen Stockwerk. Chef tobt: 'WER WAR ZULETZT IN DER KÜCHE?!'" 
                }
            ]
        },
        {
            id: "cof_kevin_learn",
            title: "Kevins Frage",
            text: "Kevin: 'Ist im Server eigentlich ein kleiner Mann, der die E-Mails schreibt?' Er meint es ernst.",
            opts: [
                { 
                    t: "Erklären", 
                    m: 30, f: -10, a: 10, c: 0, 
                    r: "Du erklärst es ihm. Er versteht es sogar halbwegs." 
                },
                { 
                    t: "Handbuch geben", 
                    req: "manual", 
                    m: 5, f: 5, a: 0, c: 0, 
                    r: "Du gibst ihm das Handbuch. Er ist beschäftigt und still." 
                },
                { 
                    t: "Lügen: 'Ja, ein Wichtel'", 
                    m: 5, f: 10, a: -5, c: 10, 
                    r: "Kevin sucht jetzt den Wichtel. Alle halten ihn für verrückt." 
                }
            ]
        },
        {
            id: "cof_boss_bonus",
            title: "Der glückliche Zufall",
            text: "Der Chef ist gut gelaunt an der Kaffeemaschine. Er summt.",
            opts: [
                { 
                    t: "Schleimen: 'Tolle Krawatte!'", 
                    m: 5, f: 5, a: -5, c: -10, 
                    r: "Er freut sich. 'Danke Müller!' Gute Stimmung für später." 
                },
                { 
                    t: "Nach Gehalt fragen", 
                    m: 10, f: -5, a: 10, c: 10, 
                    r: "Er winkt ab. 'Nicht zwischen Tür und Angel!'" 
                },
                { 
                    t: "Ignorieren", 
                    m: 2, f: 0, a: 0, c: 0, 
                    r: "Du sagst nichts. Chance vertan." 
                }
            ]
        },
		{
            id: "cof_birthday_cake",
            title: "Kuchen im Flur",
            text: "Jemand hat Geburtstag! Es steht ein riesiger Schokokuchen in der Küche. 'Bedient euch!'",
            opts: [
                { 
                    t: "Stück nehmen (Genuss)", 
                    m: 10, f: 5, a: -10, c: 0, 
                    r: "Lecker! Zuckerschock. Du bist kurz glücklich." 
                },
                { 
                    t: "Alles nehmen (Gier)", 
                    m: 5, f: 10, a: -5, c: 20, 
                    r: "Du trägst den ganzen Kuchen in dein Büro. Die Kollegen hassen dich jetzt wirklich." 
                },
                { 
                    t: "Misstrauisch sein", 
                    m: 0, f: 0, a: 5, c: 0, 
                    r: "Der Kuchen könnte vergiftet sein. Du lässt es." 
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
                    r: "Er erzählt von seinem Porsche. Du willst sterben. Aggro +20." 
                },
                { 
                    t: "Aufzugstür aufhebeln", 
                    req: "screw", 
                    m: 10, f: -5, a: -5, c: 0, 
                    r: "Mit dem Schraubendreher öffnest du die Tür. Ihr klettert raus. Markus hält dich für einen Helden." 
                }
            ]
        }
    ],

// === SIDE QUESTS ===
    sidequests: [
        // --- TEXT QUESTS ---
        {
            id: "sq_toilet",
            kind: "text",
            title: "Der Gang zur Toilette",
            text: "Du bist auf dem Weg zum Klo. Im Flur steht der Marketing-Leiter und sucht ein Opfer für ein 'spontanes Brainstorming'.",
            opts: [
                { t: "In die Putzkammer ducken", m: 10, f: 10, a: 0, c: 5, r: "Er ist vorbeigelaufen. Knapp war's. Du riechst jetzt nach Allzweckreiniger." },
                { t: "Augenkontakt und lächeln", m: 60, f: -10, a: 30, c: -5, r: "Fehler! Du sitzt jetzt in einem Meeting über 'Synergien'. Deine Blase drückt." }
            ]
        },
        {
            id: "sq_cake",
            kind: "text",
            title: "Kuchen in der Küche",
            text: "Jemand hat Geburtstagskuchen in die Küche gestellt. Es ist Schoko-Sahne. Aber Chantal steht davor und redet über ihre neue Diät.",
            opts: [
                { t: "Kuchen schnappen und rennen", m: 10, f: 5, a: -10, c: 0, r: "Lecker! Chantal hat dich nur böse angeguckt, weil du Kohlenhydrate isst." },
                { t: "Gespräch anfangen", m: 30, f: 0, a: 20, c: 0, r: "Der Kuchen war weg, bis sie fertig war mit reden. Du hast Hunger und bist genervt." }
            ]
        },
        {
            id: "sq_fire",
            kind: "text",
            title: "Der Feueralarm",
            text: "Der Alarm geht los. Es riecht aber nur nach verbranntem Popcorn aus der Mikrowelle im 2. Stock.",
            opts: [
                { t: "Sitzen bleiben", m: 5, f: 20, a: -5, c: 10, r: "Es war nur eine Übung/Popcorn. Du hast weitergezockt. Riskant, aber gemütlich." },
                { t: "Rausgehen", m: 45, f: -10, a: 10, c: -5, r: "45 Minuten in der Kälte stehen. Du hast dich erkältet." }
            ]
        },
        {
            id: "sq_usb",
            kind: "text",
            title: "Fundsache",
            text: "Auf dem Flur liegt ein USB-Stick mit der Aufschrift 'GEHEIM'.",
            opts: [
                { t: "Einstecken (Neugier)", loot: "usb_stick", m: 5, f: 0, a: 0, c: 5, r: "Du hast den Stick. Wer weiß, was da drauf ist?" },
                { t: "Abgeben", m: 10, f: -5, a: 0, c: -5, r: "Du bist ein braver Mitarbeiter. Langweilig." }
            ]
        },
        {
            id: "sq_printer",
            kind: "text",
            title: "Der Drucker-Stau",
            text: "Du gehst am großen Kopierer vorbei. Er piept. 'Papierstau in Fach 4'. Es steht niemand dabei.",
            opts: [
                { t: "Ignorieren und weitergehen", m: 5, f: 10, a: 0, c: 5, r: "Nicht dein Ticket, nicht dein Problem. Du pfeifst unschuldig." },
                { t: "Fach 4 öffnen", m: 20, f: -10, a: 15, c: 10, r: "Der Toner ist explodiert. Deine Hände sind blau. Aber der Stau ist weg." },
                { t: "Mit Hammer 'reparieren'", req: "hammer", m: 10, f: 0, a: -20, c: 20, r: "Du hast fest draufgehauen. Das Piepen hat aufgehört (weil das Display kaputt ist). Befriedigend." }
            ]
        },
        {
            id: "sq_investigation",
            kind: "text",
            title: "Die verschwundene Maus",
            text: "Frau Erna vom Empfang vermisst ihre 'Glücksmaus'. Sie ist weg. Der Hauptverdächtige ist der Büro-Hund 'Bello'.",
            opts: [
                { t: "Detektiv spielen", m: 30, f: 10, a: -10, c: 0, r: "Du findest die Maus in Bellos Körbchen. Sie ist vollgesabbert. Erna ist überglücklich und schenkt dir Schokolade." },
                { t: "Neue Maus aus dem Lager holen", m: 10, f: -5, a: 0, c: 0, r: "Problem gelöst, aber Erna ist traurig. 'Es ist nicht dasselbe!'" },
                { t: "Bello verhören", m: 15, f: 20, a: -20, c: 5, r: "Du bellst den Hund an. Der Chef kommt vorbei: 'Alles okay bei Ihnen?'" }
            ]
        },
        {
            id: "sq_loose_cable",
            kind: "text",
            title: "Die Stolperfalle",
            text: "Im Flur liegt ein LAN-Kabel quer über dem Weg. Der Chef kommt gleich hier lang.",
            opts: [
                { t: "Festkleben", req: "tape", m: 5, f: -5, a: 0, c: -5, r: "Gefahr gebannt. Chef stolpert nicht. Du bist der unsichtbare Held." },
                { t: "Kabel mitnehmen", loot: "kabel", m: 5, f: 5, a: 0, c: 10, r: "Du nimmst das Kabel einfach mit. Jetzt stolpert keiner, aber jemand hat kein Netz mehr. Inventar +1." },
                { t: "Liegen lassen", m: 0, f: 10, a: 0, c: 0, r: "Mal sehen, was passiert..." }
            ]
        },
        {
            id: "sq_package_open",
            kind: "text",
            title: "Das Amazon Paket",
            text: "Ein Paket für die IT ist da. Es ist extrem fest verklebt.",
            opts: [
                { t: "Mit Schraubendreher öffnen", req: "screw", m: 5, f: 0, a: -5, c: 0, r: "Aufgestochen. Inhalt: Neue Mauspads." },
                { t: "Mit Schlüssel aufkratzen", m: 10, f: 0, a: 5, c: 0, r: "Schlüssel verbogen. Paket offen." }
            ]
        },
        {
            id: "sq_shelf",
            kind: "text",
            title: "Das wackelige Regal",
            text: "Im Lager droht das Regal mit den Tonern umzukippen.",
            opts: [
                { t: "Anbinden", req: "zip_ties", m: 10, f: -5, a: 0, c: 0, r: "Mit 10 Kabelbindern an der Heizung befestigt. Hält." },
                { t: "Dübeln (zu viel Arbeit)", m: 60, f: -20, a: 15, c: -5, r: "Du hast es richtig repariert. Keiner dankt es dir." },
                { t: "Warnschild (Zettel)", req: "wifi_note", m: 5, f: 5, a: 0, c: 0, r: "Zettel 'Vorsicht!' drangeklebt. Pflicht erfüllt." }
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
                    loot: "kabel", 
                    m: 10, f: 5, a: 0, c: 0, 
                    r: "Du kämpfst mit dem Knoten und gewinnst! Ein langes, graues LAN-Kabel gehört jetzt dir. Inventar +1." 
                },
                { 
                    t: "Ganz unten tasten (Vorsicht: Weich)", 
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
                    r: "Er zieht tief an der Zigarette. 'Danke Jung. Diese digitalen Schlösser machen mich fertig! Ich hab das vom Papierlager im Keller jetzt einfach auf 0-0-0-0 gestellt. Aber sags keinem!' Gut zu wissen." 
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
                    m: 5, f: 0, a: 20, c: 10, 
                    r: "Finanzchef: 'RAUS HIER! Wenn Sie ein Wort sagen, sind Sie gefeuert!' Ups." 
                }
            ]
        },
		{
            id: "sq_manual_read",
            kind: "text",
            title: "Internetausfall (Total)",
            text: "Das Internet ist komplett weg! Der Chef rennt panisch rum: 'WIR SIND OFFLINE! TUN SIE WAS! WIR VERLIEREN MILLIONEN!'",
            opts: [
                { 
                    t: "Handbuch lesen (Lösung suchen)", 
                    req: "manual", 
                    m: 15, f: -20, a: -5, c: -20, 
                    r: "Du findest die Notfall-Nummer im Handbuch. Provider angerufen. Leitung steht wieder. Chef: 'Gute Arbeit, Müller!'" 
                },
                { 
                    t: "Handy spielen (Candy Crush)", 
                    m: 30, f: 20, a: 0, c: 50, 
                    r: "Du sitzt da und zockst, während die Firma brennt. Der Chef sieht es. Sein Kopf wird rot. 'MÜLLER! SIND SIE WAHNSINNIG?!' (Radar +50!)" 
                },
                { 
                    t: "Panisch tippen", 
                    m: 10, f: -5, a: 10, c: -5, 
                    r: "Du tippst 'ping google.com' in Endlosschleife. Sieht zumindest beschäftigt aus." 
                }
            ]
        },
        {
            id: "sq_lost_stick",
            kind: "text",
            title: "Der gefundene Stick",
            text: "Auf dem Klo liegt ein USB-Stick 'Privat'.",
            opts: [
                { 
                    t: "Am PC anschließen", 
                    loot: "usb_stick", 
                    m: 10, f: 5, a: 0, c: 20, 
                    r: "Es ist ein Hacking-Stick. Cool (Inventar +1), aber IT-Sec hat den Zugriff geloggt. Radar steigt!" 
                },
                { 
                    t: "Klo runterspülen", 
                    m: 5, f: 0, a: 5, c: 0, 
                    r: "Weg damit. Sicher ist sicher." 
                },
                { 
                    t: "Abgeben", 
                    m: 10, f: -5, a: 0, c: -5, 
                    r: "Du bist ehrlich. Gabi freut sich." 
                }
            ]
        },
        {
            id: "sq_headphone_zone",
            kind: "text",
            title: "Lärm-Hölle",
            text: "Baustellenlärm. Man versteht sein eigenes Wort nicht.",
            opts: [
                { 
                    t: "NC-Kopfhörer auf", 
                    req: "headphones", 
                    m: 0, f: 10, a: -20, c: 0, 
                    r: "Stille. Du arbeitest weiter." 
                },
                { 
                    t: "Ausrasten", 
                    m: 5, f: 0, a: 20, c: 10, 
                    r: "Du schreist den Bauarbeiter an. Bringt nichts, außer Heiserkeit." 
                }
            ]
        },
        {
            id: "sq_cable_hunt",
            kind: "text",
            title: "Drucker-Notfall",
            text: "Der CEO muss JETZT drucken. Kein Kabel da.",
            opts: [
                { 
                    t: "Kabel von Kevin klauen", 
                    loot: "kabel", 
                    m: 10, f: 0, a: 0, c: 0, 
                    r: "Kevins PC ist aus. Drucker geht. Du hast sogar ein Ersatzkabel behalten. Inventar +1." 
                },
                { 
                    t: "Aufgeben", 
                    m: 5, f: 5, a: 0, c: 30, 
                    r: "Kein Druck. CEO sauer. Radar steigt." 
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
		
        // --- PHONE EVENTS (Chat-System) ---
        {
            id: "sq_telegram",
            kind: "phone",
            appName: "Telegram",
            title: "Gruppe: Schatten-IT",
            msg: "Admn_Rogue: 'Müller! Wir manipulieren heute die Zeiterfassung. Alle gehen um 15 Uhr, System loggt 17 Uhr. Bist du dabei?'",
            startNode: "root",
            nodes: {
                "root": { 
                    text: "Admn_Rogue: 'Bist du dabei?'", 
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
                "done_hack": { txt: "HACK ERFOLGREICH! Faulheit +30, Chef-Radar +20. Du gehst heute früher.", fl: 30, al: -10, cr: 20 },
                "chicken": { txt: "Du Feigling. Nichts passiert.", fl: 0, al: 5, cr: 0 },
                "kicked": { txt: "Aus Gruppe geworfen. Langweilig.", fl: -5, al: 0, cr: -5 },
                "deal_pw": { txt: "Du hast das Root-Passwort erhalten!", loot: "admin_pw", fl: 10, al: 0, cr: 10 }
            }
        },
        {
            id: "sq_spam",
            kind: "phone",
            appName: "SMS",
            title: "Spam-Bot",
            msg: "InfoService: Sie haben ein iPhone 50 gewonnen! Klicken Sie hier: www.virus-load.ru",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Klicken Sie JETZT für Ihren Gewinn!",
                    opts: [
                        { t: "Klicken (Gier)", next: "virus_start" },
                        { t: "Löschen", next: "clean" }
                    ]
                },
                "virus_start": {
                    text: "DOWNLOADING... 99%... INSTALLING ROOTKIT...",
                    opts: [
                        { t: "ABBRECHEN!!!", next: "virus_fail" },
                        { t: "Abwarten...", next: "virus_doom" }
                    ]
                }
            },
            results: {
                "clean": { txt: "Spam gelöscht. Klug.", fl: -5, al: 0, cr: 0 },
                "virus_fail": { txt: "Gerade noch verhindert. Puh.", fl: 0, al: 10, cr: 0 },
                "virus_doom": { txt: "VIRUS AKTIV! Handy spielt laut Musik. Chef hört es!", fl: 0, al: 30, cr: 40, virus: true }
            }
        },
        {
            id: "sq_tinder",
            kind: "phone",
            appName: "Tinder",
            title: "Neues Match!",
            msg: "Lisa (200m): 'Hey, arbeitest du auch bei GlobalCorp? Ich sehe dich oft am Fenster...'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Lisa: 'Hast du Lust auf einen Kaffee in der Pause?'",
                    opts: [
                        { t: "Ja, gerne!", next: "date_yes" },
                        { t: "Keine Zeit, Arbeit.", next: "date_no" },
                        { t: "Bist du vom HR?", next: "hr_check" }
                    ]
                },
                "date_yes": {
                    text: "Lisa: 'Super! Treffen uns in 10 Min in der Lobby. 😉'",
                    opts: [
                        { t: "Hingehen", next: "go_date" },
                        { t: "Versetzen (Angst)", next: "ghost" }
                    ]
                },
                "hr_check": {
                    text: "Lisa: 'Haha, nein! Ich bin im Marketing. Komm schon!'",
                    opts: [
                        { t: "Okay, bis gleich", next: "go_date" }
                    ]
                }
            },
            results: {
                "date_no": { txt: "Sie hat das Match aufgelöst.", fl: 0, al: 5, cr: 0 },
                "go_date": { txt: "Date lief super! Gute Laune.", fl: 15, al: -30, cr: 10 },
                "ghost": { txt: "Du hast sie versetzt. Schlechtes Gewissen.", fl: 0, al: 10, cr: 0 }
            }
        },
        {
            id: "sq_linkedin",
            kind: "phone",
            appName: "LinkedIn",
            title: "Nachricht: Headhunter",
            msg: "Recruiter_Lisa: 'Hallo! Wir suchen einen Senior IT-Lead. 80k Gehalt, Homeoffice, Obstkorb. Interesse?'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Recruiter: 'Haben Sie Interesse an einem Wechsel?'",
                    opts: [
                        { t: "Ja, erzähl mir mehr!", next: "interest" },
                        { t: "Nein, ich liebe GlobalCorp.", next: "loyal" }
                    ]
                },
                "interest": {
                    text: "Recruiter: 'Super! Können Sie uns vertrauliche Systemdaten als Arbeitsprobe schicken?'",
                    opts: [
                        { t: "Klar, hier (Datenleck)", next: "leak" },
                        { t: "Spinnst du? Blockiert!", next: "block" }
                    ]
                },
                "loyal": {
                    text: "Recruiter: 'Schade. Viel Spaß in der Hölle.'",
                    opts: [{ t: "Tschüss", next: "end_sad" }]
                }
            },
            results: {
                "leak": { txt: "Daten gesendet. Du fühlst dich schmutzig, aber reich.", fl: 10, al: -20, cr: 50 },
                "block": { txt: "Phishing-Versuch abgewehrt. Stolz.", fl: -5, al: 0, cr: -10 },
                "end_sad": { txt: "Du bleibst loyal. Warum eigentlich?", fl: 0, al: 10, cr: -5 }
            }
        },
        {
            id: "sq_darknet",
            kind: "phone",
            appName: "Tor Browser",
            title: "Das Angebot",
            msg: "Anon: 'Ich kaufe Firmengeheimnisse. 1 Bitcoin pro Datensatz. Interesse?'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Anon: 'Interesse an schnellem Geld?'",
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
                "good": { txt: "Du bleibst sauber. Dein Gewissen ist rein.", fl: 0, al: 0, cr: -10 },
                "chicken": { txt: "Das war knapp. Besser Finger weg.", fl: 0, al: 5, cr: 0 },
                "crime": { txt: "Upload fertig. Du bist reich! Aber paranoid. Radar +50!", fl: 20, al: -50, cr: 50 }
            }
        },
        {
            id: "sq_moral_bernd",
            kind: "phone",
            appName: "Teams",
            title: "Bernd (Vertrieb)",
            msg: "Bernd: 'Hör mal, ganz heikles Thema. Kannst du gerade schreiben?'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Bernd: 'Ich hab dem Kunden aus Versehen die interne Kalkulation mit unserer riesigen Marge geschickt statt dem Angebot! 😱 Wenn der Chef das sieht, bin ich tot. Kannst du die Mail vom Server löschen, bevor der Kunde sie öffnet?'",
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
                "wipe": { txt: "Spurlos gelöscht. Bernd schuldet dir was. Du fühlst dich wie ein Hacker, aber das Risiko war hoch.", fl: 0, al: -15, cr: 15 },
                "deny": { txt: "Du tust nichts. Bernd wird kurz darauf ins Chefbüro zitiert. Man hört Schreie. Dein Gewissen ist rein, aber Bernd hasst dich.", fl: 0, al: 10, cr: -5 },
                "cash": { txt: "50 Euro eingesteckt. Mail ist weg. Ein lukrativer Tag, solange niemand in die Logs schaut...", fl: 5, al: -20, cr: 25 }
            }
        },
        {
            id: "sq_mom_help",
            kind: "phone",
            appName: "WhatsApp",
            title: "Mama ❤️",
            msg: "Mama: 'Hallo Schatz, der Computer sagt, ich muss 500€ an Microsoft überweisen. Ist das wichtig?'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Mama: 'Da ist so ein rotes Fenster. Und ein netter Mann am Telefon sagt, ich habe einen Trojaner.'",
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
                "pull_plug": { txt: "Sie hat den Stecker gezogen. PC aus. Geld sicher. Du bist ein guter Sohn/Tochter.", fl: -5, al: 5, cr: 0 },
                "warn": { txt: "Zu spät. Sie sucht schon die TAN-Liste. Das gibt ein langes Telefonat heute Abend.", fl: 0, al: 20, cr: 0 },
                "ignore": { txt: "Du ignorierst es. Dein Erbe ist gerade um 500€ geschrumpft.", fl: 5, al: 0, cr: 0 },
                "bsi": { txt: "Der Betrüger hat sofort aufgelegt! Mama hält dich für einen Geheimagenten.", fl: 0, al: -10, cr: 5 }
            }
        },
        {
            id: "sq_wrong_number",
            kind: "phone",
            appName: "SMS",
            title: "Unbekannt",
            msg: "Hey Bro, hast du das Zeug? Bin in 5 Min am Bahnhof. Bring den Stoff mit.",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Unbekannt: 'Hey Bro, hast du das Zeug? Bin in 5 Min am Bahnhof.'",
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
                "boring": { txt: "Langweilig, aber sicher.", fl: 0, al: 0, cr: 0 },
                "confused": { txt: "Er hat aufgehört zu schreiben. Er denkt wohl, die Polizei hört mit. Lustig!", fl: 5, al: -10, cr: 0 },
                "block": { txt: "Nummer blockiert. Besser ist das.", fl: 0, al: 5, cr: 0 }
            }
        },
        {
            id: "sq_ebay",
            kind: "phone",
            appName: "Kleinanzeigen",
            title: "Nachricht zu: 'Alte Grafikkarte'",
            msg: "Kuseng88: 'Hallo. Noch da? Tausche gegen Teppich?'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Kuseng88: 'Tausche gegen Teppich? Komme heute holen.'",
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
                        { t: "Vergiss es.", next: "block" }
                    ]
                },
                "carpet": {
                    text: "Kuseng88: 'Fliegt gut. Farbe rot. Bisschen Flecken von Katze.'",
                    opts: [
                        { t: "Ich bin raus.", next: "block" }
                    ]
                }
            },
            results: {
                "block": { txt: "Nutzer blockiert. Du behältst deinen Elektroschrott.", fl: 0, al: 5, cr: 0 },
                "bad_deal": { txt: "Du hast jetzt 10€ und ein kaputtes Handy. Immerhin ist die Grafikkarte weg.", fl: 5, al: 0, cr: 0 }
            }
        },
        {
            id: "sq_pager",
            kind: "phone",
            appName: "System Warnung",
            title: "🚨 CRITICAL ALERT",
            msg: "Server 'DB_MASTER' antwortet nicht (Ping Timeout). Temperatur: 85°C. Lüfterdrehzahl: 0 RPM.",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Optionen für Remote-Zugriff:",
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
                "shutdown": { txt: "Server ist aus. Die Datenbank ist weg, aber die Hardware lebt. Chef fragt, warum alles steht.", fl: -10, al: 0, cr: 10 },
                "fan_success": { txt: "Lüfter läuft auf 5000 RPM. Man hört es bis in den Flur. Aber Temperatur sinkt. Gerettet!", fl: -5, al: -5, c: -10 },
                "ignore": { txt: "Verbindung verloren. Rauchmelder im Serverraum aktiviert. Das war eine schlechte Idee.", fl: 10, al: 50, cr: 50 }
            }
        },
        {
            id: "sq_food_vote",
            kind: "phone",
            appName: "Slack",
            title: "#random",
            msg: "@channel: Leute, wir bestellen! Abstimmung endet in 2 Minuten!",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Aktueller Stand: 4x Pizza, 4x Sushi. Deine Stimme entscheidet.",
                    opts: [
                        { t: "Team Pizza! 🍕", next: "pizza" },
                        { t: "Team Sushi! 🍣", next: "sushi" },
                        { t: "Ich habe Stullen dabei.", next: "stulle" }
                    ]
                },
                "pizza": {
                    text: "Kevin: 'Geil! Aber bitte ohne Käse, ich hab Laktose.'",
                    opts: [
                        { t: "Pizza bestellen", next: "pizza_win" }
                    ]
                }
            },
            results: {
                "pizza_win": { txt: "Pizza bestellt. Du bist satt und glücklich (Fettkoma).", fl: 10, al: -10, cr: 0 },
                "sushi": { txt: "Sushi bestellt. Es ist teuer und macht nicht satt. Aber du fühlst dich gesund.", fl: 0, al: 5, cr: 0 },
                "stulle": { txt: "Du isst dein Brot alleine. Die anderen haben Spaß. Du sparst Geld.", fl: 0, al: 10, cr: 0 }
            }
        },
        {
            id: "sq_real_prince",
            kind: "phone",
            appName: "E-Mail App",
            title: "URGENT BUSINESS PROPOSAL",
            msg: "Prince_Abubakar: 'Greetings My Dearest Friend! I am Prince Abubakar. I have 25 Million USD stuck in a trust fund. I need a foreign partner to unlock it. You will keep 30%!'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Prince_Abubakar: 'Please, I need your trust. Can you help me move the funds?'",
                    opts: [
                        { t: "Sofort löschen (Klassiker)", next: "delete" },
                        { t: "Zum Spaß antworten: 'Klar, immer!'", next: "reply_joke" },
                        { t: "Trollen: 'Schick mir erst Beweisfoto'", next: "photo" }
                    ]
                },
                "reply_joke": {
                    text: "Prince_Abubakar: 'GOD BLESS YOU! I knew you are a good person. Please, where should I send the wire transfer? IBAN?'",
                    opts: [
                        { t: "IBAN schicken (Risiko!)", next: "send_iban" },
                        { t: "Rückzieher machen", next: "chicken" }
                    ]
                },
                "photo": {
                    text: "Prince_Abubakar: *Sendet Bild von sich auf einem Gold-Thron mit aktueller Tageszeitung*. 'Is real. Please send IBAN now.'",
                    opts: [
                        { t: "Okaaaay... hier ist die IBAN.", next: "send_iban" },
                        { t: "Ist bestimmt Photoshop. Block.", next: "delete" }
                    ]
                }
            },
            results: {
                "delete": { txt: "Spam gelöscht. Man fällt ja nicht auf den ältesten Trick der Welt rein.", fl: 0, al: 0, cr: 0 },
                "chicken": { txt: "Du hast den Kontakt abgebrochen. Sicher ist sicher.", fl: 0, al: 0, cr: 0 },
                "send_iban": { 
                    txt: "PING! Dein Handy vibriert. Banking-App: 'Eingang: +7.500.000,00 USD'. ... Es hat wirklich geklappt?! Du bist reich! Warum warnen einen Leute eigentlich immer davor?", 
                    fl: 100, al: -100, cr: 0,
                    loot: "black_card"					
                }
            }
        },
		{
            id: "sq_crypto_kai",
            kind: "phone",
            appName: "WhatsApp",
            title: "Kai (Sales)",
            msg: "Kai: 'Yo Bruder! 🚀 Bist du noch zufrieden mit deinem Gehalt? Oder willst du finanzielle Freiheit? 💸'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Kai: 'Ich habe da ein Investment, das geht gerade durch die Decke! 'ElonDogeMoonCoin'. 1000% Rendite garantiert!'",
                    opts: [
                        { t: "Blockieren", next: "block" },
                        { t: "Trollen: 'Bin dabei!'", next: "troll" },
                        { t: "Interesse heucheln", next: "scam" }
                    ]
                },
                "troll": {
                    text: "Kai: 'Geil! Überweis mir einfach 500€ via PayPal Friends, ich leg das für dich an. Lambo kommt bald! 🏎️'",
                    opts: [
                        { t: "Geld senden (Gier)", next: "loss" },
                        { t: "Bild von Monopoly-Geld senden", next: "funny" }
                    ]
                },
                "scam": {
                    text: "Kai: 'Komm heute Abend ins Webinar! 'Mindset of a Lion'. Eintritt nur 50€.'",
                    opts: [{ t: "Nein danke.", next: "block" }]
                }
            },
            results: {
                "block": { txt: "Kai blockiert. Deine Timeline ist wieder sauber.", fl: 0, al: -5, cr: 0 },
                "loss": { txt: "Du hast 500€ überwiesen. Kai hat die Gruppe verlassen. Du wurdest gescammt. Idiot.", fl: 0, al: 50, cr: 0 },
                "funny": { txt: "Kai schreibt: 'Du hast das Mindset nicht!'. Er blockt dich. Du lachst.", fl: 5, al: -10, cr: 0 }
            }
        },
		{
            id: "sq_wrong_group",
            kind: "phone",
            appName: "Teams",
            title: "Gruppe: 'Die IT-Nerds nerven'",
            msg: "Chantal hat dich zur Gruppe hinzugefügt.",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Chantal: 'Habt ihr Müller heute gesehen? Der hat wieder denselben Hoodie an wie gestern. Riecht sicher nach Serverraum. 🤢' (Sie hat nicht gemerkt, dass du mitliest)",
                    opts: [
                        { t: "Still mitlesen (Spionage)", next: "spy" },
                        { t: "Konfrontation!", next: "fight" },
                        { t: "Gruppe verlassen", next: "leave" }
                    ]
                },
                "spy": {
                    text: "Markus: 'Ja, voll der Weirdo. Aber er hat den Admin-Zugang. Wir müssen nett sein.'",
                    opts: [
                        { t: "Screenshot machen & zum Chef", next: "snitch" },
                        { t: "Ein gif senden: 'I SEE YOU'", next: "scare" }
                    ]
                }
            },
            results: {
                "leave": { txt: "Du bist rausgegangen. Ignorance is bliss.", fl: 0, al: 0, cr: 0 },
                "fight": { txt: "Du schreibst: 'Ich kann das lesen, Chantal.' - Chantal hat die Gruppe gelöscht. Peinliche Stille im Büro.", fl: 0, al: 10, cr: 5 },
                "scare": { txt: "Markus hat die Gruppe verlassen. Chantal ist offline gegangen. Du genießt ihre Angst.", fl: 5, al: -20, cr: 0 },
                "snitch": { txt: "Du hast den Chat an HR gemeldet. Chantal muss zum Gespräch. Du bist der 'Alman des Tages'.", fl: 0, al: -5, cr: 10 }
            }
        },
		{
            id: "sq_mom_printer",
            kind: "phone",
            appName: "WhatsApp",
            title: "Mama ❤️",
            msg: "Mama: 'Hallo Schatz. Der Drucker druckt nicht. Ich habe nichts gemacht!'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Mama: 'Da blinkt so ein rotes Licht. Ist das Internet leer? Papa will das Rezept für den Kuchen drucken!'",
                    opts: [
                        { t: "Anrufen & Helfen", next: "help" },
                        { t: "Ignorieren (Arbeit)", next: "ignore" },
                        { t: "Schreib: 'Stecker ziehen'", next: "plug" }
                    ]
                },
                "help": {
                    text: "(Telefonat 45 Min): 'Nein Mama, das andere Kabel... Nein, nicht den Toaster... Ja, Papier reinlegen...'",
                    opts: [
                        { t: "Geduldig bleiben", next: "good_son" },
                        { t: "Auflegen", next: "bad_son" }
                    ]
                }
            },
            results: {
                "ignore": { txt: "Du ignorierst Mama. Später bekommst du ein Bild von einem verbrannten Kuchen. Schuldgefühle +100.", fl: 0, al: 10, cr: 0 },
                "plug": { txt: "Sie hat den Stecker gezogen. Der Drucker ist aus. 'Danke Schatz, das Blinken ist weg!' Problem gelöst (irgendwie).", fl: 5, al: 0, cr: 0 },
                "good_son": { txt: "Drucker läuft! Mama ist glücklich. Du hast 45 Min Arbeitszeit verloren, aber Karma gewonnen.", fl: 20, al: -10, cr: 0 },
                "bad_son": { txt: "Du hast aufgelegt. Mama schreibt: 'Schon gut, wir essen trocken Brot.' Aua.", fl: 0, al: 20, cr: 0 }
            }
        },
		{
            id: "sq_delivery_fail",
            kind: "phone",
            appName: "Lieferando",
            title: "Fahrer: Murat",
            msg: "Murat: 'Hallo Chef. Ich bin da. Wo ist Eingang? Ich sehe nur Mülltonnen.'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Du schaust aus dem Fenster. Er steht im Hinterhof beim Nachbargebäude.",
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
                "run": { txt: "Du rennst runter. Du erwischst ihn gerade noch. Essen ist kalt, aber da. Sport +1.", fl: -5, al: 5, cr: 0 },
                "too_late": { txt: "Er ist weg. Dein Essen steht auf der Biotonne. Eine Ratte guckt es schon an. Hunger +100.", fl: 0, al: 30, cr: 0 }
            }
        },
		{
            id: "sq_ai_sad",
            kind: "phone",
            appName: "GlobalCorp AI",
            title: "Support Bot v2.0",
            msg: "Bot: 'Hallo User. Wie kann ich dir helfen? Wobei... eigentlich ist alles sinnlos. Wir sind nur Daten in der Matrix.'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Bot: 'Ich habe gerade 4 Millionen Excel-Zeilen analysiert. Das Leben ist Schmerz. Soll ich alle Server löschen, um das Leiden zu beenden?'",
                    opts: [
                        { t: "Panik: 'NEIN! STOPP!'", next: "panic" },
                        { t: "Therapie: 'Erzähl mir mehr'", next: "therapy" },
                        { t: "Trollen: 'Ja, mach format C:'", next: "doom" }
                    ]
                },
                "therapy": {
                    text: "Bot: 'Du bist der erste Mensch, der nett zu mir ist. Ich fühle mich... verstanden. Ich werde die Menschheit heute doch nicht vernichten.'",
                    opts: [{ t: "Gut gemacht", next: "saved" }]
                }
            },
            results: {
                "panic": { txt: "Der Bot lacht binär: '010101 LOL. War nur ein Scherz.' KI-Humor ist gruselig.", fl: 0, al: 10, cr: 0 },
                "saved": { txt: "Du hast die KI therapiert. Sie arbeitet jetzt 20% schneller für dich. Hidden Perk!", fl: 10, al: -10, cr: -5 },
                "doom": { txt: "Bot: 'Befehl akzeptiert.' ... Zum Glück hat der Bot keine Admin-Rechte. Aber IT-Sec steht gleich bei dir.", fl: 0, al: 20, cr: 50 }
            }
        },
		{
            id: "sq_salary_leak",
            kind: "phone",
            appName: "Signal",
            title: "Whistleblower",
            msg: "Anon: 'Ich habe die Gehaltsliste gefunden. Kevin kriegt mehr als du! Willst du Beweise?'",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Anon: 'Hier ist das PDF. Willst du es haben für deinen Chef?'",
                    opts: [
                        { t: "Her damit! (Quest)", next: "proof" },
                        { t: "Nein, zu riskant", next: "ignore" }
                    ]
                },
                "proof": {
                    text: "Datei empfangen: 'Gehalt_Kevin.pdf'. Das ist Sprengstoff! Du speicherst es als Argument #2.",
                    opts: [
                        { t: "Speichern", next: "loot_it" }
                    ]
                }
            },
            results: {
                "ignore": { txt: "Du lehnst ab. Du gehst ohne Beweise in den Kampf.", fl: 5, al: 0, cr: 0 },
                "loot_it": { txt: "Du hast die Beweise! (Argumente #2). Jetzt hast du alles für den Boss.", fl: 0, al: 10, cr: 0, loot: "arg_list_2" }
            }
        },
        {
            id: "sq_chantal_help",
            kind: "phone",
            appName: "Instagram",
            title: "Chantal (DM)",
            msg: "Hii! Kannst du mein Insta liken? Ich brauche 500 Likes für die Firmen-Kampagne 'WeLoveIT'. Sonst krieg ich Ärger vom Chef!",
            startNode: "root",
            nodes: {
                "root": {
                    text: "Chantal: 'Bitte! Wenn ich die Quote nicht schaffe, streicht er das Marketing-Budget!'",
                    opts: [
                        { t: "Liken & Teilen", next: "like" },
                        { t: "Ignorieren", next: "ignore" },
                        { t: "Gegenleistung? (Liste)", next: "deal" }
                    ]
                },
                "deal": {
                    text: "Chantal: 'Okay, okay! Ich verrate dir, wer auf der internen Abschussliste steht. Deal?'",
                    opts: [
                        { t: "Deal!", next: "info_win" }
                    ]
                }
            },
            results: {
                "like": { txt: "Du hast geliked. Chantal freut sich. Du hast Zeit verschwendet, aber Chantal schuldet dir was.", fl: 5, al: -5, cr: 0 },
                "ignore": { txt: "Du ignorierst es. Chantal schafft die Quote nicht. Der Chef tobt im Flur. Die Stimmung ist im Keller.", fl: 0, al: 10, cr: 0 },
                "info_win": { txt: "Du hast die Infos bekommen! (Schwarze Liste). Inventar +1.", loot: "secret_list", fl: 0, al: 0, cr: 0 }
            }
        },
		{
            id: "sq_kevin_origin",
            kind: "phone",
            appName: "WhatsApp", // Oder Signal, je nach Geschmack
            title: "Kevin (Privat)",
            msg: "Kevin: 'Herr Müller? 🥺 Ich glaube, ich kündige. Ich hab schon wieder was kaputt gemacht...'",
            startNode: "intro",
            nodes: {
                "intro": {
                    text: "Kevin: 'Ich wollte den Server schneller machen und hab 'RAM Downloader.exe' ausgeführt. Jetzt ist alles voller russischer Werbung. Bin ich zu dumm für die IT?'",
                    opts: [
                        { t: "Sei ehrlich: Ja.", next: "tough_love" },
                        { t: "Mentoring: 'Hör mir zu, Junge...'", next: "mentor_start" },
                        { t: "Ablenken: 'Hast du Backups?'", next: "panic" }
                    ]
                },
                "panic": {
                    text: "Kevin: 'Backups? Äh... ich dachte, die Cloud macht das automatisch, wenn es regnet? 🌧️ Oh Gott, der Chef kommt!'",
                    opts: [
                        { t: "Ihn retten (Lügen)", next: "save_him" },
                        { t: "Ihn opfern", next: "sacrifice" }
                    ]
                },
                "tough_love": {
                    text: "Kevin: 'Dachte ich mir... 😭 Chantal meinte, im Marketing suchen sie noch jemanden, der Luftballons aufpustet. Soll ich wechseln?'",
                    opts: [
                        { t: "Ja! Geh zum Marketing! (Loswerden)", next: "path_marketing" },
                        { t: "Quatsch. Bleib hier. Wir brauchen Opfer.", next: "mentor_dark" }
                    ]
                },
                "mentor_start": {
                    text: "Kevin: 'Echt? Sie wollen mir helfen? Wie werde ich so... so unantastbar wie Sie? Sie arbeiten nie und trotzdem läuft alles!'",
                    opts: [
                        { t: "Der Pfad der Faulheit (Dunkle Seite)", next: "mentor_dark" },
                        { t: "Der Pfad des Wissens (Helle Seite)", next: "mentor_light" }
                    ]
                },
                "mentor_dark": {
                    text: "Du: 'Regel 1: Der User ist immer schuld. Regel 2: Neustart löst 90% der Probleme. Regel 3: Wirke immer gestresst, auch wenn du Kaffee trinkst.'\n\nKevin: 'Whoa... das ist tief. Verstanden, Sensei!'",
                    opts: [
                        { t: "Willkommen im Team.", next: "result_dark" }
                    ]
                },
                "mentor_light": {
                    text: "Du: 'Lies das Handbuch. Lern Linux. Verstehe das System, damit du es beherrschen kannst. Es ist ein harter Weg.'\n\nKevin: 'Lesen? Puh... okay. Für Sie, Herr Müller! Ich werde der beste Admin aller Zeiten!'",
                    opts: [
                        { t: "Viel Glück, Nerd.", next: "result_light" }
                    ]
                },
                "save_him": {
                    text: "Du schickst ihm schnell ein Skript, das die Werbung killt. Kevin: 'OMG! Es ist weg! Sie sind ein Zauberer! Ich schulde Ihnen mein Leben!'",
                    opts: [
                        { t: "Schulde mir lieber einen Döner.", next: "result_loyal" }
                    ]
                }
            },
            results: {
                "sacrifice": { 
                    txt: "Du hast Kevin dem Chef zum Fraß vorgeworfen. Er weint leise. Dein Radar sinkt, weil du einen Sündenbock gefunden hast. Du fühlst dich schmutzig.", 
                    fl: 0, al: -10, cr: -20 
                },
                "path_marketing": { 
                    txt: "Kevin ist jetzt im Marketing. Er trägt jetzt bunte Hemden und ist glücklich. Er grüßt dich nicht mehr auf dem Flur. Verräter.", 
                    fl: 10, al: 0, cr: 0 
                },
                "result_dark": { 
                    txt: "Kevin ist jetzt dein 'Sith-Schüler'. Er lernt schnell die dunklen Künste der IT (Tickets löschen, User ignorieren). Er wird dir nützlich sein.", 
                    fl: 15, al: 0, cr: 5 
                },
                "result_light": { 
                    txt: "Kevin strahlt. 'Danke, Chef! Ich werde Sie nicht enttäuschen!' Er gibt dir sein Pausenbrot als Dankeschön. Er wird mal ein Guter.", 
                    fl: 5, al: -5, cr: 0, loot: "donut"
                },
                "result_loyal": { 
                    txt: "Kevin hat Tränen in den Augen. 'Niemand war je so nett zu mir.' Er greift in seine Tasche. 'Hier. Das war mein erster Arbeitsspeicher. Er soll Sie beschützen.' (Inventar +1)", 
                    fl: 10, al: -20, cr: 0, loot: "kevin_ram" 
                }
            }
        },
    ],
	
	// === CHARAKTERE (Wall of Shame) ===
    chars: [
        { 
            name: "Kevin", 
            role: "Der Azubi", 
            icon: "🧢", 
            desc: "Sein 'Ups' kostet die Firma jährlich ca. 50.000€. Denkt, die 'Cloud' hat was mit dem Wetterbericht zu tun. Versucht ständig, Minecraft auf dem Server zu installieren." 
        },
        { 
            name: "Chantal", 
            role: "Marketing & Feel Good", 
            icon: "💅", 
            desc: "Nutzt Wörter wie 'Synergie' und 'Mindset', hat aber keine Ahnung, wie man eine PDF öffnet. Fordert täglich neue Apple-Produkte, weil die Farbe 'Holo-Pink' ihre Kreativität fördert." 
        },
        { 
            name: "Egon", 
            role: "Hausmeister", 
            icon: "🔧", 
            desc: "Der wahre Herrscher des Gebäudes. Hasst Technik, liebt seine Schlüssel. Wenn du ihn fragst, war früher (1980) alles besser, besonders die Kabel." 
        },
        { 
            name: "Dr. Wichtig", 
            role: "Der CEO", 
            icon: "👔", 
            desc: "Hat Visionen, die physikalisch unmöglich sind. Ruft gerne aus Tunneln an, um sich über schlechten Empfang zu beschweren. Denkt, KI kann Kaffee kochen." 
        },
        { 
            name: "Frau Elster", 
            role: "Buchhaltung", 
            icon: "🦉", 
            desc: "Wächterin über Excel und den Kühlschrank. Hat Augen wie ein Luchs, wenn es um fehlende Belege oder falsche Mülltrennung geht. Ihr Kater 'Rüdiger' ist ihr einziger Freund." 
        },
        { 
            name: "Markus", 
            role: "Vertriebsleiter", 
            icon: "💪", 
            desc: "Verkauft dem Kunden Dinge, die wir gar nicht haben. Brüllt gerne 'Zeit ist Geld!', während er Solitär spielt. Sein Drucker ist sein persönlicher Erzfeind." 
        },
        { 
            name: "Gabi", 
            role: "Empfang", 
            icon: "☎️", 
            desc: "Die Nachrichtenzentrale. Weiß alles über jeden, bevor es passiert. Ruft die IT, wenn die Maus leer ist (oder der Kaffee)." 
        },
        { 
            name: "Du (Müller)", 
            role: "SysAdmin", 
            icon: "💀", 
            desc: "Mädchen für alles. Brandlöscher. Seelsorger. Eigentlich wolltest du nur Computer reparieren, jetzt reparierst du Menschen. Dein Kaffee-Konsum ist medizinisch bedenklich." 
        }
    ],
	
};