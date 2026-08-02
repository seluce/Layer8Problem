/**
 * The community board.
 *
 * Until v4.0.0 these notes were 105 lines of markup inside index.html, which
 * meant a new note had to be written as HTML and the board showed the exact
 * same six pieces of paper forever. As data they can be drawn from, extended
 * in three lines, and - the point of the whole exercise - react to what the
 * player did today via reqStory.
 *
 * Colours and tilt are plain values, not Tailwind class names. Class names
 * built in data files depend on Tailwind finding them while scanning, which
 * silently fails for new files - the note then has no paper at all.
 *
 * `kind` picks the layout in components/BoardView.svelte:
 *   note      pin, heading, text, signature (the workhorse)
 *   tape      strip of tape instead of a pin, typewriter text
 *   quote     customer testimonial with a coffee ring
 *   official  letterhead, optional bullet list, footer quote
 *   tearoff   free-to-a-good-home ad with tear-off tabs
 *   press     newspaper clipping with a stamped remark
 *   alert     warning with a coloured edge
 *
 * body and text fields carry <strong>, <em> and <br>. They are authored here,
 * never player input.
 */
export const board = [

    // ---------- The originals ----------
    {
        id: 'board_yoghurt', kind: 'note', paper: '#fef9c3', tilt: '1deg', pin: '#dc2626',
        title: 'AN DEN JOGHURT-DIEB!!!', titleTone: '#b91c1c',
        body: 'Wer auch immer meinen <strong>Bi-Fi Roll</strong> aus dem Kühlschrank genommen hat: <br>Ich habe die Überwachungskameras der Kantine gehackt. Ich weiß, dass du rote Sneaker trägst. <br>Leg ihn zurück. Du hast 24h.',
        sign: '- Kevin (IT)'
    },
    {
        id: 'board_yoghurt_reply', kind: 'tape', paper: '#eff6ff', tilt: '-2deg',
        body: 'Lieber Kevin,<br>1. Das war kein Bi-Fi, das war ein Experiment der Biologie-Abteilung (Schimmelpilz-Kultur \'Delta-9\').<br>2. Wenn du das gegessen hast, solltest du dringend zum Arzt, statt Drohbriefe zu schreiben.<br>LG, Dr. Brinkmann'
    },
    {
        id: 'board_quantum', kind: 'quote', paper: '#fef9c3', tilt: '-1deg', pin: '#15803d',
        title: 'Betr: Projekt "Quanten-Cloud"',
        body: '"Sehr geehrtes Sales-Team,<br>vielen Dank für die Implementierung der \'KI-gesteuerten Echtzeit-Datenbank\'.<br><br>Wir wissen zwar nicht, warum sie aussieht wie eine Excel-Tabelle von 1998 und warum einer ihrer Mitarbeiter jeden Morgen manuell Daten eingeben muss, aber die Performance ist beeindruckend!<br>Gerne wieder!"',
        sign: '- MegaCorp Industries CEO'
    },
    {
        id: 'board_sleep', kind: 'official', paper: '#ffffff', tilt: '0deg', pin: '#1e3a8a',
        icon: '⚖️', dept: 'HR Management',
        title: 'Initiative: "Work-Life-Integration"',
        body: 'Um Stress zu reduzieren, führen wir das "Schlaf-am-Platz"-Konzept ein. <br><strong>Die Regeln:</strong>',
        items: ['Maximal 3 Minuten pro Auge.', 'Dabei muss die Maus bewegt werden (nutzen Sie Ihre Reflexe).', 'Träumen von der Konkurrenz ist untersagt (NDA-Verstoß).'],
        foot: '"Wer schläft, sündigt nicht. Aber er arbeitet auch nicht. Also sündigen Sie lieber." - Dr. Wichtig'
    },
    {
        id: 'board_shredder', kind: 'tearoff', paper: '#ffffff', tilt: '2deg', pin: '#16a34a',
        title: 'ZU VERSCHENKEN', sub: 'Aktenvernichter "ShredMaster 3000"',
        body: 'Er funktioniert technisch noch, aber die Messer sind stumpf. <br>Er schneidet das Papier nicht, er <strong>kaut</strong> es nur. Die Dokumente kommen warm, feucht und als Klumpen wieder raus.<br>Zudem macht er Geräusche, die klingen, als würde er leise weinen.',
        note: 'Nur an Bastler oder Exorzisten abzugeben. Ich halte das emotional nicht mehr aus.',
        tabs: ['Nimm ihn!', 'Gratis', 'Bitte', 'Hilfe', 'Mutprobe']
    },
    {
        id: 'board_paperless', kind: 'press', paper: '#e5e7eb', tilt: '0deg', pin: '#1e293b',
        title: 'Weser-Kurier (Archiv 1998)',
        sub: '"GlobalCorp verspricht: Das papierlose Büro kommt!"',
        body: 'Der visionäre Gründer Dr. Wichtig erklärte heute, dass Drucker bald nur noch im Museum zu finden sein werden. "Wir setzen voll auf Disketten und Gedankenübertragung", so der CEO bei der Eröffnung der neuen Zentrale im Moor.',
        stamp: 'Gut gealtert. - Kevin'
    },
    {
        id: 'board_biohazard', kind: 'alert', paper: '#ffffff', tilt: '1deg', pin: '#dc2626', edge: '#dc2626',
        title: 'Sicherheitswarnung Stufe Rot',
        sub: 'Betr: Biologische Gefahr in Kühlschrank 2',
        body: 'Aufgrund des "Bi-Fi-Vorfalls" ist die Teeküche im 2. Stock bis auf Weiteres eine <strong>Sperrzone</strong>. Ein Team in Schutzanzügen ist unterwegs.<br><br>Bitte atmen Sie im Flur nur flach.',
        sign: '- Facility Management (Egon)'
    },

    // ---------- Everyday life at GlobalCorp ----------
    {
        id: 'board_parking', kind: 'note', paper: '#fef9c3', tilt: '-1deg', pin: '#2563eb',
        title: 'PARKPLATZ 14', titleTone: '#0f172a',
        body: 'An den Kollegen mit dem silbernen Kombi: Parkplatz 14 ist <strong>mein</strong> Parkplatz. Seit elf Jahren. Es gibt kein Schild, weil es keines braucht.<br>Das Haus weiß das. Sie wissen es jetzt auch.',
        sign: '- Ein Kollege aus dem 3. Stock'
    },
    {
        id: 'board_parking_reply', kind: 'tape', paper: '#ffffff', tilt: '2deg',
        body: 'Es gibt kein Schild, weil Parkplatz 14 ein <strong>Behindertenparkplatz</strong> ist. Seit vier Jahren. Wir haben Sie zweimal angeschrieben.<br>Freundliche Grüße, Facility Management'
    },
    {
        id: 'board_band', kind: 'note', paper: '#f3e8ff', tilt: '2deg', pin: '#9333ea',
        title: 'BANDPROBE: WIR SUCHEN DICH', titleTone: '#6b21a8',
        body: 'Die Firmenband <strong>"Die Kostenstellen"</strong> sucht einen Bassisten. Wir proben donnerstags im Lagerraum K3.<br>Erfahrung nicht nötig. Ehrlich gesagt hat niemand von uns Erfahrung. Das hört man.',
        sign: '- Ronny (Vertrieb)'
    },
    {
        id: 'board_plant', kind: 'note', paper: '#dcfce7', tilt: '-2deg', pin: '#15803d',
        title: 'GESUCHT: PFLANZENPATE', titleTone: '#166534',
        body: 'Der Ficus im Flur 2. OG braucht ab Montag jemanden. Ich gehe in Rente.<br>Er heißt Hubert. Er mag kein direktes Sonnenlicht und keine Menschen, die über ihn reden, während er zuhört.',
        sign: '- Frau Kowalski (37 Jahre GlobalCorp)'
    },
    {
        id: 'board_printer_poem', kind: 'note', paper: '#ffffff', tilt: '1deg', pin: '#475569',
        title: 'ODE AN DEN DRUCKER IM 3. OG', titleTone: '#334155',
        body: '<em>Du stehst da, grau und ohne Ton,<br>ich schickte dir mein Dokument.<br>Das war im Mai. Jetzt ist es Herbst.<br>Ich habe aufgehört zu hoffen.</em><br><br>Wer den Drucker repariert bekommt einen Kuchen. Ich meine das ernst.',
        sign: '- Anonym (2. OG, Sie wissen schon)'
    },
    {
        id: 'board_lost_mug', kind: 'note', paper: '#eff6ff', tilt: '0deg', pin: '#1e40af',
        title: 'VERMISST: TASSE', titleTone: '#1e3a8a',
        body: 'Weiße Tasse, Aufdruck <strong>"World\'s Okayest Employee"</strong>, kleiner Sprung am Henkel.<br>Zuletzt gesehen am Dienstag in der Spülmaschine. Die Spülmaschine bestreitet alles.<br>Keine Fragen, keine Anzeige. Ich will sie einfach zurück.',
        sign: '- Buchhaltung, 1. OG'
    },
    {
        id: 'board_ergonomics', kind: 'official', paper: '#ffffff', tilt: '-1deg', pin: '#1e3a8a',
        icon: '🪑', dept: 'Arbeitssicherheit',
        title: 'Neue Sitzhaltungs-Richtlinie',
        body: 'Nach der Begehung durch den externen Gutachter gelten ab sofort:',
        items: ['Der Rücken bildet mit dem Oberschenkel exakt 100 Grad.', 'Beide Füße stehen flach am Boden (gilt auch bei Videokonferenzen).', 'Der Bildschirm steht eine Armlänge entfernt. Ihre Armlänge, nicht die des Gutachters.'],
        foot: 'Verstöße werden nicht sanktioniert, aber notiert. - Arbeitssicherheit'
    },
    {
        id: 'board_chair', kind: 'tearoff', paper: '#fffbeb', tilt: '-2deg', pin: '#b45309',
        title: 'ZU VERSCHENKEN', sub: 'Bürostuhl, höhenverstellbar (angeblich)',
        body: 'Der Stuhl senkt sich während des Sitzens langsam ab. Nach etwa vierzig Minuten sitzt man auf Kniehöhe und schaut zum Bildschirm hoch.<br>Man gewöhnt sich daran. Man gewöhnt sich an alles.',
        note: 'Abholung nur mit zweiter Person. Er ist schwerer, als er aussieht.',
        tabs: ['Ja', 'Warum nicht', 'Notfall', 'Egal', 'Nein']
    },
    {
        id: 'board_press_moor', kind: 'press', paper: '#e5e7eb', tilt: '1deg', pin: '#1e293b',
        title: 'Regional-Anzeiger (Archiv 2009)',
        sub: '"GlobalCorp eröffnet modernstes Rechenzentrum der Region"',
        body: 'Der Serverraum sei "auf Jahrzehnte hinaus zukunftssicher ausgelegt", betonte die Geschäftsleitung bei der Einweihung. Besonders stolz zeigte man sich über die "großzügige Klimatisierung".',
        stamp: 'Rack 3 klingt anders. - IT'
    },
    {
        id: 'board_survey', kind: 'official', paper: '#ffffff', tilt: '1deg', pin: '#047857',
        icon: '📊', dept: 'Unternehmensentwicklung',
        title: 'Ergebnis der Mitarbeiterbefragung',
        body: 'Wir bedanken uns für Ihre Teilnahme. Die wichtigsten Erkenntnisse:',
        items: ['94% wünschen sich mehr Wertschätzung.', '91% wünschen sich weniger Meetings.', 'Wir haben daraufhin ein Meeting zur Wertschätzung eingeführt.'],
        foot: 'Die Befragung wird im nächsten Quartal wiederholt. - Unternehmensentwicklung'
    },
    {
        id: 'board_microwave', kind: 'alert', paper: '#ffffff', tilt: '-1deg', pin: '#ea580c', edge: '#f97316',
        title: 'Letzte Warnung: Mikrowelle',
        sub: 'Betr: Fisch',
        body: 'Es gab eine Ansage. Es gab eine zweite Ansage. Es gab eine Rundmail mit Lesebestätigung.<br>Wer am Dienstag um 12:40 Uhr <strong>Lachs</strong> erhitzt hat, weiß, dass er gemeint ist.',
        sign: '- Die gesamte 2. Etage'
    },
    {
        id: 'board_carpool', kind: 'note', paper: '#fefce8', tilt: '2deg', pin: '#ca8a04',
        title: 'FAHRGEMEINSCHAFT AB BREMEN-NORD', titleTone: '#1e293b',
        body: 'Suche noch zwei Mitfahrer. Abfahrt 7:10 Uhr.<br><strong>Bedingungen:</strong> kein Radio, keine Gespräche vor 8 Uhr, keine Diskussionen über die Route.<br>Ansonsten sehr angenehmes Klima.',
        sign: '- H. Bergmann (Controlling)'
    },
    {
        id: 'board_lottery', kind: 'note', paper: '#ffffff', tilt: '-1deg', pin: '#ef4444',
        title: 'TIPPGEMEINSCHAFT', titleTone: '#dc2626',
        body: 'Wir spielen jeden Freitag. Einsatz 5 Euro. <strong>Zwölf Kollegen, elf Jahre, kein Gewinn.</strong><br>Aber die Vorstellung, an einem Montag geschlossen zu kündigen, hält uns am Leben.',
        sign: '- Liste hängt in der Teeküche'
    },
    {
        id: 'board_language', kind: 'official', paper: '#ffffff', tilt: '0deg', pin: '#4338ca',
        icon: '💬', dept: 'Interne Kommunikation',
        title: 'Sprachleitfaden 2026',
        body: 'Zur Schärfung unserer gemeinsamen Kommunikationskultur ersetzen wir ab sofort:',
        items: ['"Problem" durch "Herausforderung"', '"Fehler" durch "Lernkurve"', '"Wir haben kein Budget" durch "Wir priorisieren anders"'],
        foot: 'Der Leitfaden ist verbindlich. Rückfragen sind eine Herausforderung. - Interne Kommunikation'
    },

    // ---------- Reactive: only appear when the player caused them ----------
    {
        id: 'board_vinegar', kind: 'note', paper: '#fffbeb', tilt: '2deg', pin: '#d97706',
        reqStory: 'path_kalk_essig',
        title: 'WER HAT DEN KAFFEE "OPTIMIERT"?', titleTone: '#92400e',
        body: 'Der Kaffee schmeckt seit gestern nach <strong>Salat</strong>. Nicht nach schlechtem Kaffee. Nach Salat.<br>Wir ermitteln nicht, wir wollen nur, dass es aufhört.',
        sign: '- Die gesamte 2. Etage'
    },
    {
        id: 'board_instant', kind: 'note', paper: '#ffffff', tilt: '-2deg', pin: '#334155',
        reqStory: 'path_kalk_ignor',
        title: 'VERKAUFE KAFFEE', titleTone: '#1e293b',
        body: 'Instant, heiß, sofort verfügbar. <strong>50 Cent</strong> der Becher, jeder zehnte gratis.<br>Wasserkocher steht bereit. Barzahlung. Keine Rückgabe.',
        sign: '- K. (Azubi-Büro, hinten rechts)'
    },
    {
        id: 'board_meetingpoint', kind: 'note', paper: '#eff6ff', tilt: '1deg', pin: '#2563eb',
        reqStory: 'path_karton_kult',
        title: 'RESERVIERUNG MEETINGPOINT K1', titleTone: '#1e3a8a',
        body: 'Donnerstag, 14 Uhr, Geburtstagsrunde Buchhaltung. <strong>Bitte Karton freihalten.</strong><br>Die Topfpflanze bleibt oben stehen, sie gehört inzwischen dazu.',
        sign: '- Gabi (Empfang)'
    },
    {
        id: 'board_vibes', kind: 'note', paper: '#fdf2f8', tilt: '-1deg', pin: '#ec4899',
        reqStory: 'path_licht_hart',
        title: 'RIP ACHTSAMKEITS-ECKE', titleTone: '#db2777',
        body: 'Manche Menschen haben Angst vor Energie. <br>Die Ecke im 2. OG war ein <strong>Safe Space</strong>. Jetzt ist sie wieder ein Flur mit einem Netzwerkschrank.<br>#officevibes #rip',
        sign: '- Marketing'
    },
    {
        id: 'board_phoenix', kind: 'note', paper: '#ffffff', tilt: '0deg', pin: '#0f172a',
        reqStory: 'path_phoenix_storno',
        title: 'RAUM KREATIV 2', titleTone: '#1e293b',
        body: 'Die Dauerbuchung wurde ohne Rücksprache aufgelöst.<br><strong>Das war ein Fehler.</strong> Nicht formal. Aber ein Fehler.',
        sign: '- P.'
    },
    {
        id: 'board_egon_deal', kind: 'tape', paper: '#fefce8', tilt: '2deg',
        reqStory: 'path_exting_lager',
        body: 'An die IT: Der Bestand in <strong>K3</strong> ist wieder aufgefüllt.<br>Zwei Feuerlöscher, geprüft, Plakette bis 2029.<br>Ich sage nichts, wenn Sie nichts sagen.<br>— E.'
    },
    {
        id: 'board_audit', kind: 'alert', paper: '#ffffff', tilt: '1deg', pin: '#dc2626', edge: '#dc2626',
        reqStory: 'path_gemba_show',
        title: 'Hinweis der Revision',
        sub: 'Betr: Beobachtete Arbeitsweisen',
        body: 'Im Rahmen der letzten Begehung wurde in der IT eine <strong>bemerkenswerte Fokus-Technik</strong> dokumentiert.<br>Wir bitten um Übermittlung der Methodik zur konzernweiten Bewertung.',
        sign: '- Konzernrevision'
    },
    {
        id: 'board_wiki', kind: 'note', paper: '#ecfdf5', tilt: '-2deg', pin: '#059669',
        reqStory: 'path_kevin_tutorial',
        title: 'NEU: DAS IT-WIKI', titleTone: '#065f46',
        body: 'Es gibt jetzt eine <strong>Anleitung zur Bildschirmhelligkeit</strong>. Mit Bildern.<br>Weitere Artikel folgen, sobald weitere Probleme auftreten. Sie werden auftreten.',
        sign: '- Kevin von der IT'
    }
];
