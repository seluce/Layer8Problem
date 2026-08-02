/**
 * Was das Intranet über dich weiß.
 *
 * The company pages used to say the same thing forever. As data they can react
 * to the save: to reputation, to the story flags of today, and to the counters
 * in the archive.
 *
 * The rule that makes this readable: the intranet is the OFFICIAL voice. The
 * bulletin board comments on the same events privately and honestly - a note
 * from a colleague who was there. The intranet reports the same event the way
 * a company reports it: as a process, a success, or something that was never
 * a problem to begin with. Where both react to one flag, they must not say
 * the same thing twice.
 *
 * Colours are plain hex values, never Tailwind class names. Class names built
 * in data files depend on the scanner finding them, which fails silently for
 * new files - the avatar then has no colour at all. Badge styling goes through
 * a `tone` key that the component maps to whole class names.
 *
 * reqStory works exactly as on the board: the entry only appears once the
 * player has actually tripped that flag. tools/lint-data.mjs verifies that
 * every flag named here can be set somewhere.
 */
export const intranet = {

    /* ================================================================
       MITARBEITER DES MONATS
       Chosen by reputation in engine_ui.buildIntranet(): whoever stands
       highest, provided they clear the "FREUNDLICH" threshold of 20 that
       the team view uses. Below that the award is not given - and if the
       whole house is on your side, the jury runs out of alternatives.
       ================================================================ */
    employee: {
        'Kevin': {
            role: 'IT — Auszubildender, 3. Lehrjahr',
            reason: 'Für das eigenständige Verbringen eines brennenden Papierkorbs ins Freie. Die Jury würdigt ausdrücklich die Ruhe, mit der er dabei an vier Feuerlöschern vorbeigegangen ist.'
        },
        'Chantal': {
            role: 'Marketing & Feel-Good-Management',
            reason: 'Für die Einführung des Begriffs "Intensive Wachstumschance". Die Zahl der gemeldeten Stressfälle ist seitdem auf null gesunken.'
        },
        'Egon': {
            role: 'Facility Management',
            reason: 'Für einundvierzig Dienstjahre ohne eine einzige Beschwerde. Die Jury weist darauf hin, dass Herr Egon auch keine Beschwerde entgegennimmt.'
        },
        'Dr. Wichtig': {
            role: 'Chief Executive Officer',
            reason: 'Für visionäre Führung in einem herausfordernden Marktumfeld. Die Auszeichnung wurde von der Geschäftsleitung einstimmig beschlossen. Die Geschäftsleitung besteht aus Dr. Wichtig.'
        },
        'Gabi': {
            role: 'Empfang & Telefonzentrale',
            reason: 'Für die Weiterleitung von 1.400 Anrufen in einem Monat, davon 1.390 an die IT. Die Jury lobt die konsequente Zuständigkeitsklärung.'
        },
        'Frau Elster': {
            role: 'Buchhaltung',
            reason: 'Für die lückenlose Aufklärung eines Belegvorgangs über 3,49 Euro. Der Aufwand betrug elf Arbeitsstunden. Die Jury würdigt die Haltung, nicht die Bilanz.'
        },
        'Markus': {
            role: 'Senior VP of Synergies',
            reason: 'Für den Abschluss eines Vertrags über ein Produkt, das sich derzeit noch in der Konzeptionsphase befindet. Rollout: sobald technisch möglich.'
        }
    },

    // Everyone likes you. The jury has nobody left to choose.
    employeeSelf: {
        name: 'Müller',
        role: 'Systemadministration',
        reason: 'Die Jury hat in diesem Monat in allen Abteilungen nachgefragt und überall dieselbe Antwort erhalten. Ein Foto liegt nicht vor; der Ausgezeichnete war zum Fototermin im Serverraum. Er war auch zum Ersatztermin im Serverraum.'
    },

    // Nobody clears the bar.
    employeeNone: {
        title: 'Nicht vergeben',
        reason: 'Die Auszeichnung wird in diesem Monat ausgesetzt. Die Jury verweist auf laufende Verfahren und dankt allen Mitarbeitenden für ihr Verständnis.'
    },

    /* ================================================================
       COMPANY FEED
       Entries with reqStory only appear once the player has caused them
       and go first; the rest fill up to four. The tone is the point:
       every one of these events also reaches the bulletin board, where
       it is told truthfully.
       ================================================================ */
    feed: [

        // ---------- Immer möglich ----------
        {
            id: 'feed_tasse', author: 'Chantal', handle: '@HR_FeelGood',
            initials: 'CH', tone: '#f472b6',
            text: "Wer hat meine 'Good Vibes Only' Tasse aus der Spülmaschine genommen, ohne sie auszuräumen? Die Vibes sind jetzt im Minusbereich!! 😭🧘‍♀️"
        },
        {
            id: 'feed_wasser', author: 'Egon', handle: '@Facility',
            initials: 'EG', tone: '#94a3b8',
            text: 'Das Wasser in der Teeküche im 2. Stock ist abgestellt. Grund: Jemand hat Kaffeepulver direkt ins Waschbecken geschüttet.'
        },
        {
            id: 'feed_kuehlschrank', author: 'Frau Elster', handle: '@Buchhaltung',
            initials: 'FE', tone: '#a78bfa',
            text: 'Der Kühlschrank in der Teeküche wird Freitag um 16 Uhr geleert. Alles ohne Namen wird entsorgt. Alles mit Namen wird zur Kenntnis genommen.'
        },
        {
            id: 'feed_fundbuero', author: 'Gabi', handle: '@Empfang',
            initials: 'GA', tone: '#38bdf8',
            text: 'Am Empfang liegen seit drei Wochen: zwei Regenschirme, ein Ladekabel und eine Lesebrille. Der Schirm mit den Fröschen sucht weiterhin einen Halter.'
        },
        {
            id: 'feed_drucker', author: 'Markus', handle: '@Sales',
            initials: 'MA', tone: '#fbbf24',
            text: 'An wen auch immer: Der Drucker im 3. OG steht wieder auf beidseitig. Wir verhandeln hier Verträge und keine Faltblätter.'
        },
        {
            id: 'feed_backup', author: 'Dr. Wichtig', handle: '@CEO',
            initials: 'DW', tone: '#34d399',
            text: 'Kurzer Gedanke aus der Lounge in Zürich: Wenn wir alle nur zehn Prozent mehr Mut hätten, bräuchten wir halb so viele Backups. Denkt mal drüber nach.'
        },

        // ---------- Reagiert auf den heutigen Tag ----------
        {
            id: 'feed_kalk_essig', reqStory: 'path_kalk_essig',
            author: 'Facility Management', handle: '@Betriebstechnik',
            initials: 'FM', tone: '#fb923c',
            text: 'Hinweis zur Kaffeemaschine im 2. OG: Ein Mitarbeiter hat heute eigenverantwortlich ein Reinigungsmittel aus dem Putzschrank eingesetzt. Die Geschäftsleitung dankt für die Eigeninitiative und bittet darum, das Ergebnis nicht zu trinken.'
        },
        {
            id: 'feed_kalk_ignor', reqStory: 'path_kalk_ignor',
            author: 'Zentraler Einkauf', handle: '@Beschaffung',
            initials: 'ZE', tone: '#60a5fa',
            text: 'Gute Nachricht: Der Antrag auf Entkalker wurde in die Beschaffungsrunde 2027 aufgenommen. Bis dahin gilt das Gedrückthalten der Taste als offiziell freigegebene Übergangslösung. Vielen Dank an die IT für die pragmatische Haltung.'
        },
        {
            id: 'feed_karton', reqStory: 'path_karton_kult',
            author: 'Facility Management', handle: '@Betriebstechnik',
            initials: 'FM', tone: '#fb923c',
            text: 'Der Meetingpoint K1 wurde in das Raumbuchungssystem übernommen. Kapazität: drei Stehplätze, keine Steckdose. Der darin verpackte Kopierer bleibt bis zur Klärung der Zuständigkeit Bestandteil des Mobiliars.'
        },
        {
            id: 'feed_licht', reqStory: 'path_licht_hart',
            author: 'Chantal', handle: '@HR_FeelGood',
            initials: 'CH', tone: '#f472b6',
            text: 'Die Achtsamkeits-Ecke im 2. OG wurde heute aus "infrastrukturellen Gründen" zurückgebaut. Ich möchte niemanden beschuldigen. Ich möchte nur festhalten, dass die Energie dieser Etage seitdem messbar anders ist. 🕯️'
        },
        {
            id: 'feed_phoenix', reqStory: 'path_phoenix_storno',
            author: 'Konzernrevision', handle: '@Compliance',
            initials: 'KR', tone: '#f87171',
            text: 'Die Serientermin-Buchung des Raums "Kreativ 2" wurde ohne Freigabe aufgelöst. Wir bitten die verantwortliche Stelle für Projekt Phoenix um Rückmeldung, damit der Vorgang zugeordnet werden kann. Bisherige Rückmeldungen: keine.'
        },
        {
            id: 'feed_exting', reqStory: 'path_exting_lager',
            author: 'Brandschutzbeauftragter', handle: '@Sicherheit',
            initials: 'BS', tone: '#f87171',
            text: 'Die Begehung hat im Bestand eine Abweichung von zwei Feuerlöschern ergeben. Da beide Geräte geprüft und plakettiert sind, wurde die Abweichung als positiv verbucht und der Vorgang geschlossen.'
        },
        {
            id: 'feed_gemba', reqStory: 'path_gemba_show',
            author: 'Dr. Wichtig', handle: '@CEO',
            initials: 'DW', tone: '#34d399',
            text: 'Ich war heute in der IT. Was ich dort gesehen habe, war Weltklasse: Latenz-Anomalien im Ostcluster, in Echtzeit, auf drei Bildschirmen gleichzeitig. Genau diese Kultur meine ich. Ich habe das Ostcluster-Team bereits für den Innovationspreis vorgeschlagen.'
        },
        {
            id: 'feed_wiki', reqStory: 'path_kevin_tutorial',
            author: 'Kevin', handle: '@IT_Nachwuchs',
            initials: 'KE', tone: '#4ade80',
            text: 'Habe heute gemeinsam mit meinem Ausbilder eine Störung im Bereich Anzeigetechnik behoben und den Lösungsweg im neuen IT-Wiki dokumentiert. Artikel 1 von vielen! 💪'
        }
    ],

    /* ================================================================
       SYSTEM-STATUS
       The counter beside "Tage ohne Vorfall im Serverraum" reads the
       streak from the archive, so for most players it says zero. That is
       the joke; the remarks make it one.
       ================================================================ */
    incident: [
        { min: 10, note: 'Rekordverdächtig. Die Geschäftsleitung prüft, ob der Serverraum ausgelastet ist.' },
        { min:  5, note: 'Stabil. Bitte nicht darüber sprechen.' },
        { min:  1, note: 'Aufwärtstrend erkannt.' },
        { min:  0, note: 'Der Zähler wurde heute Morgen zurückgesetzt. Wie an den meisten Tagen.' }
    ],

    /* ================================================================
       CHANTALS BLOG
       The top post follows her reputation. Below the thresholds of the
       team view (+20 / -20) the ordinary post stays in place.
       ================================================================ */
    chantal: {
        high: {
            title: 'Ein Hoch auf unsere stillen Held:innen! 🙌',
            time: 'Gepostet heute, 11:40',
            paragraphs: [
                'Ihr Lieben, heute mal etwas Persönliches.',
                'Es gibt in diesem Haus einen Menschen, der Dinge repariert, bevor wir merken, dass sie kaputt sind. Ich sage bewusst keinen Namen, aber ihr wisst alle, wen ich meine. Diese Person hat heute etwas für mich getan, das technisch war und das ich nicht verstanden habe, und danach ging es wieder.',
                '<strong>Deshalb mein Vorschlag an die Geschäftsleitung:</strong> Lasst uns diesem Menschen ein Zeichen der Wertschätzung senden. Ich habe bereits eine digitale Grußkarte angelegt. Sie kostet nichts und kommt trotzdem von Herzen.',
                'Wertschätzung ist die neue Währung! 💕'
            ]
        },
        low: {
            title: 'Über Menschen, die "keine Zeit" haben ⏳',
            time: 'Gepostet heute, 11:40',
            paragraphs: [
                'Namaste, ihr Wundervollen.',
                'Ich möchte heute über ein Wort sprechen, das mir in letzter Zeit sehr oft begegnet ist: <em>"gleich"</em>. Manche Abteilungen benutzen dieses Wort wie ein Möbelstück. Man stellt es in den Raum und hofft, dass es die Lücke füllt.',
                'Ich nenne bewusst keine Namen und keine Abteilungen. Ich sage nur: Wer Technik versteht, versteht noch lange keine Menschen. Und wer Menschen nicht versteht, sollte vielleicht weniger mit Kabeln arbeiten und mehr mit sich selbst.',
                'Ich bin nicht wütend. Ich bin energetisch enttäuscht. 🙏'
            ]
        }
    },

    /* ================================================================
       CEO-INTERVIEW
       One extra question at the end, plus an editorial note for anyone
       who has taken root on the network.
       ================================================================ */
    vision: {
        // Placed BEFORE the closing question about the next five years - it is
        // an interview, and nothing follows "letzte Frage".
        boss: {
            question: 'Sie gelten als harter Verhandler. Gibt es Verhandlungen, die anders ausgegangen sind, als Sie es geplant hatten?',
            answer: 'Anders ausgegangen? Verhandlungen gehen nicht aus, sie reifen. Es gab kürzlich intern ein Gespräch, in dem ich bewusst nachgegeben habe, um meinem Gegenüber ein Erfolgserlebnis zu ermöglichen. Das nennt man Empowerment. Dass ich dabei etwas unterschrieben habe, dessen Bedingungen mir mein Justiziar später vorgelesen hat, ändert daran nichts. Ein guter Anführer verliert nie. Er delegiert den Sieg.'
        },
        good: {
            question: 'GlobalCorp verkauft hochmoderne Infrastruktur. Setzen Sie diese Technologien eigentlich auch für Ihre eigenen internen Abläufe ein?',
            answer: 'Selbstverständlich, wir sind unser eigener Referenzkunde! Wobei ich ehrlich sein muss: Das meiste läuft bei uns nicht wegen der Technologie, sondern wegen eines einzelnen Mitarbeiters im Untergeschoss. Neulich habe ich ihn gefragt, wie lange er schon bei uns ist. Er hat nur gelacht. Diese Verbundenheit können Sie nicht kaufen. Wir versuchen es auch gar nicht erst.'
        },
        bad: {
            question: 'GlobalCorp verkauft hochmoderne Infrastruktur. Setzen Sie diese Technologien eigentlich auch für Ihre eigenen internen Abläufe ein?',
            answer: 'Intern? <em>(Pause)</em> Sehen Sie, in einer wirklich agilen Organisation ist Technik kein Ort, sondern eine Haltung. Wir haben im Untergeschoss einen Bereich dafür, ich glaube, das sind zwei Leute. Einer? Gut. Wir prüfen ohnehin gerade, ob sich diese Haltung nicht kostengünstiger extern einkaufen ließe. Rein strategisch. Da liegen keine Namen auf dem Tisch. Da liegen Zahlen.'
        },
        editorNote: 'Anmerkung der Redaktion: Dieses Interview wurde nach der Freigabe an einer Stelle verändert. Der Zugriff erfolgte über ein Konto mit vollen Rechten. Die Redaktion konnte nicht ermitteln, welches — es besitzen alle.'
    },

    /* ================================================================
       WALL OF DEALS
       An extra card at the top of the wall, depending on how Markus is
       doing with you, plus the aftermath of a cancelled series booking.
       `tone` is a key, not a class name.
       ================================================================ */
    sales: {
        good: {
            icon: '🔥',
            customer: 'Nordwind Handel KG',
            badge: 'In letzter Minute gesichert',
            tone: 'good',
            product: 'Ausfallsichere Echtzeit-Synchronisation',
            rows: [
                { label: 'Vertraglich zugesichert:', text: 'Der Kunde erhält eine dauerhaft verfügbare Anbindung ohne Wartungsfenster.' },
                { label: "Markus' Erfolgsnotiz:", text: '"Der Kunde stand kurz vorm Absprung, ich hab das Ding im Alleingang aus dem Feuer geholt. Manchmal braucht es einfach jemanden, der Verantwortung übernimmt."' }
            ]
        },
        bad: {
            icon: '🧯',
            customer: 'Bremer Zulieferer GmbH',
            badge: 'Geplatzt',
            tone: 'bad',
            product: 'Prozessoptimierung 360°',
            rows: [
                { label: 'Ursachenanalyse (Vertrieb):', text: 'Der Termin konnte nicht durchgeführt werden. Die zuständige interne Stelle war im entscheidenden Zeitfenster nicht erreichbar.' },
                { label: 'Maßnahme:', text: 'Der Vorgang wurde zur Bewertung an die Geschäftsleitung weitergeleitet. Eine Stellungnahme der betroffenen Abteilung liegt nicht vor und wurde auch nicht angefordert.' }
            ]
        },
        phoenix: {
            icon: '🕳️',
            customer: 'Projekt Phoenix',
            badge: 'Storniert',
            tone: 'dead',
            product: 'nicht ermittelbar',
            rows: [
                { label: 'Vertraglich zugesichert:', text: 'Im System sind keine Leistungen hinterlegt. Ein Kunde ist nicht hinterlegt. Ein Budget ist hinterlegt.' },
                { label: 'Status:', text: 'Der Serientermin in Raum "Kreativ 2" wurde heute aufgelöst. Der Vorgang bleibt offen, bis sich jemand zuständig meldet. Er ist seit vier Monaten offen.' }
            ]
        }
    },

    /* ================================================================
       KANTINE
       The plan hangs on the wall for the whole week, so it does not
       change with the clock - only the issue line above it does.
       ================================================================ */
    service: {
        before: { label: 'Ausgabe ab 11:45 Uhr', note: 'Die Schlange beginnt erfahrungsgemäß um 11:31 Uhr.', tone: 'wait' },
        open:   { label: 'Ausgabe läuft', note: 'Voraussichtliche Wartezeit laut System: 8 Minuten.', tone: 'open' },
        after:  { label: 'Ausgabe beendet', note: 'Reste stehen im Kühlschrank der Teeküche. Unbeschriftet. Verzehr auf eigene Gefahr.', tone: 'closed' },
        done:   'Heute bereits in Anspruch genommen.'
    },

    /* ================================================================
       IMPRESSUM
       The clauses replace one another instead of stacking, and only the
       version number grows. Nobody was ever told what changed.
       ================================================================ */
    impressum: {
        baseVersion: 47,
        versionNote: 'Eine gesonderte Benachrichtigung der Mitarbeitenden ist nicht vorgesehen.',
        clauses: [
            {
                minRage: 10,
                title: '§2c Mobile Mitarbeitende',
                text: 'Mitarbeitende, die das Betriebsgelände mehr als zehnmal ohne Abmeldung verlassen haben, gelten arbeitsrechtlich als "mobil". Für mobile Mitarbeitende entfällt der Anspruch auf einen festen Arbeitsplatz. Der Stuhl wird im laufenden Quartal eingezogen.'
            },
            {
                minRage: 3,
                title: '§2b Spontane Standortwechsel',
                text: 'Das unangekündigte Verlassen des Arbeitsplatzes gilt als unbezahlte Pause und wird bei der Berechnung des Weihnachtsgeldes als Urlaubstag geführt. Ein Widerspruch ist möglich und wird archiviert.'
            }
        ]
    },

    /* ================================================================
       HUMAN CAPITAL
       GlobalCorp hands out one initial password for every account and has
       never changed it - which is what makes a second file reachable at
       all. The credentials come over the news ticker; the account name
       is in the support line at the bottom of Schnösel's file.
       ================================================================ */
    hr: {
        policy: 'Passwortrichtlinie: Aus Gründen der Systemstabilität vergibt die IT für sämtliche Konten dasselbe Initialpasswort. Eine Änderung ist technisch möglich, aber nicht vorgesehen (Ticket #4711, offen seit 2019).',
        support: 'Bei technischen Problemen wenden Sie sich an: mueller@globalcorp.internal',

        salary: '3.150,00 € Brutto / Monat',
        salaryNote: '(Zuletzt angepasst 2019. Die nächste Anpassung ist an das Erreichen der Unternehmensziele gekoppelt.)',

        // Loyalty index, derived from the average reputation across the team.
        loyalty: [
            {
                min: 20,
                label: 'bindungssicher',
                text: 'Der Mitarbeiter genießt abteilungsübergreifend hohes Ansehen. Ein Wechsel ist unwahrscheinlich, da er sich für die hiesigen Abläufe verantwortlich fühlt. Eine Gehaltsanpassung ist aus diesem Grund nicht erforderlich.'
            },
            {
                min: -19,
                label: 'unauffällig',
                text: 'Der Mitarbeiter fällt weder positiv noch negativ auf. Die Personalabteilung führt dies als Idealzustand.'
            },
            {
                min: -100,
                label: 'Fluchtrisiko erhöht',
                text: 'Im Kollegenkreis bestehen Vorbehalte. Als Gegenmaßnahme wurde ein persönliches Gespräch terminiert. Der Termin liegt im vierten Quartal 2029.'
            }
        ],

        // Behaviour notes. Only what actually happened shows up.
        traitsNone: {
            tone: 'good',
            title: 'Keine Auffälligkeiten',
            text: 'In der Akte ist bislang nichts vermerkt. Die Personalabteilung wertet eine leere Akte als Hinweis darauf, dass der Mitarbeiter zu wenig beobachtet wurde. Eine Nachprüfung ist eingeleitet.'
        },

        documents: [
            {
                id: 'hr_doc_stelle',
                icon: '📑',
                name: 'Stellenbeschreibung_Systemadministration.pdf',
                intro: 'Vertraulich: Kernaufgabenbeschrieb (Level 3)',
                lead: 'Die Aufgaben der Systemadministration umfassen bis auf Widerruf sämtliche Tätigkeiten, die im Haus anfallen und keiner anderen Stelle zugeordnet werden konnten. Insbesondere:',
                items: [
                    '<strong>Störungsbeseitigung:</strong> Alle Geräte mit Stromanschluss. Die Abgrenzung zur Haustechnik erfolgt im Einzelfall durch Zuruf.',
                    '<strong>Betreuung des Führungskreises:</strong> Erreichbarkeit während der Kernarbeitszeit sowie außerhalb, sofern das Anliegen dringend erscheint. Die Einschätzung der Dringlichkeit obliegt dem Anrufenden.',
                    '<strong>Datensicherung:</strong> Durchführung, Prüfung und Verantwortung. Ein Budget ist hierfür nicht vorgesehen, da Datenverlust bislang nicht eingetreten ist.',
                    '<strong>Wissensweitergabe:</strong> Anleitung des Auszubildenden. Anrechenbare Zeit hierfür: keine.'
                ]
            },
            {
                id: 'hr_doc_entwurf',
                icon: '📄',
                name: 'Kuendigungsschreiben_ENTWURF_final_v3.docx',
                intro: 'Zuletzt geändert vor 14 Monaten. Nicht abgesendet.',
                paragraphs: [
                    '"Sehr geehrter Herr Dr. Wichtig,',
                    'hiermit kündige ich das bestehende Arbeitsverhältnis ordentlich und fristgerecht zum"',
                    '<em>Der Satz endet hier. Das Dokument liegt im persönlichen Ordner des Mitarbeiters und wurde seither dreimal geöffnet, aber nicht verändert. Die Systemüberwachung protokolliert jede dieser Sitzungen und wertet sie als "Beschäftigung mit der eigenen Zukunft" positiv.</em>'
                ]
            }
        ]
    }
};
