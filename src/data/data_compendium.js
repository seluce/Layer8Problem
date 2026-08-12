/**
 * Compendium ("Wissen") - Müller's private notes on the people he keeps
 * running into. Team stays the at-a-glance reputation view for the seven
 * colleagues; everyone else lives here.
 *
 * Structure of an entry:
 *   id, cat        internal id and category: 'person', 'ort' or 'vorgang'.
 *                  The view groups by it and gives each category its own
 *                  colour, so the register stays readable once it is long.
 *   name, rolle    heading and subheading
 *   kopf           unlocked on the FIRST sighting. Deliberately not funny:
 *                  it is on screen from the start and has to survive being
 *                  read ten times. The punchlines belong in the notes.
 *   seen           event ids that count as a sighting (unlocks the head)
 *   notizen        one line each, unlocked by evidence:
 *                    seen: "<event id>"   the event was opened
 *                    flag: "<story flag>" the flag was set
 *
 * Two rules that keep this from becoming a text dump:
 *
 * 1. THE EVENT IS THE SCENE, THE NOTE IS THE LESSON. Müller does not record
 *    what happened, he records what he now knows. Test: would the note still
 *    read and land for someone who never saw the event? If it needs the scene
 *    as context, it is a summary and has to be rewritten.
 * 2. ONE NOTE PER CHAIN, not per event - a three-parter would otherwise
 *    deliver the same insight three times.
 *
 * Triggers are ids and flags, never name matching: there are two Brandts in
 * the game (the cold caller and a Frau Brandt from a camera call), and a
 * text match would feed the wrong entry.
 *
 * Four to five notes is the right size. Below three an entry looks thin;
 * above five you start inventing things the game never shows.
 */
export const compendium = [

    /* ---------------------------------------------------------------- PERSONEN */
    {
        id: "blaschke",
        cat: "person",
        name: "Herr Blaschke",
        rolle: "Gebäudemanagement",
        kopf: "Zuständig für alles, was das Gebäude selbst anstellt. Erreichbar, wenn man ihn wie einen Menschen behandelt und nicht wie ein Ticketsystem.",
        seen: ["srv_marder_1", "srv_marder_3", "srv_marder_4", "sq_brandtuer_1", "call_wlp_geruch"],
        notizen: [
            { flag: "srv_marder_meldung", text: "Erkennt Tiere am Rhythmus des Kratzens. Marder oder Taube, sagt er, und liegt richtig, bevor er hingesehen hat." },
            { seen: "sq_brandtuer_1",     text: "Sein Zeitmaß ist „die Woche\". Nicht diese, nicht nächste. Die Woche." },
            { seen: "srv_marder_3",       text: "Wer früh meldet, zahlt weniger. Das sagt er nicht vorwurfsvoll, nur als Preisauskunft." },
            { seen: "srv_marder_4",       text: "Halbiert den Zwieback, bevor er ihn in die Falle legt. Fragt man nach dem Warum, bekommt man vier Sätze über Köder und Windrichtung und weiß danach mehr über dieses Haus als nach vier Jahren Intranet." },
            { seen: "call_wlp_geruch",    text: "Kennt die Lüftungsstränge auswendig. Wenn es irgendwo riecht, weiß er vorher, wessen Raum daran hängt." }
        ]
    },
    {
        id: "sonntag",
        cat: "person",
        name: "Frau R. Sonntag",
        rolle: "Buchhaltung",
        kopf: "Führt Listen, führt sie richtig, und hält jeden Vorgang für heilbar, sobald er eine Nummer hat.",
        seen: ["cof_sonntag_1", "cof_sonntag_2", "call_wlp_geruch", "cof_deka_3"],
        notizen: [
            { seen: "cof_sonntag_1",   text: "Schaltet Geräte zweimal aus und wieder ein, bevor sie anruft. Sie hat es sich bei uns abgeschaut und wendet es auf alles an, auch auf Kaffeemaschinen." },
            { seen: "call_wlp_geruch", text: "Das Wort „Fachbetrieb\" beruhigt sie zuverlässig. Ob es einen gibt, spielt keine Rolle — es muss ihn nur geben können." },
            { seen: "cof_sonntag_2",   text: "Backt Marmorkuchen und legt ihn ins Postfach, nicht auf den Tisch. Ein Vorgang mit Beleg, kein Geschenk." },
            { seen: "cof_deka_3",      text: "Drei Überweisungen nach Liechtenstein, alle drei aus Versehen. Seitdem weiß das Haus, was Koffein in der Buchhaltung wert ist." }
        ]
    },
    {
        id: "brandt",
        cat: "person",
        name: "Herr Brandt",
        rolle: "Vertrieb, extern",
        kopf: "Verkauft eine Digitalisierungslösung. Was sie tut, hat in drei Gesprächen niemand herausgefunden, ihn eingeschlossen.",
        seen: ["call_kalt_1", "sq_brandt_1"],
        notizen: [
            { seen: "call_kalt_1",       text: "Nimmt jede Höflichkeit für eine Zusage. „Kommen Sie doch mal vorbei\" ist für ihn ein Termin, und er hält ihn." },
            { flag: "call_brandt_kommt", text: "Bringt ein Rollup-Banner mit. Wer ein Banner trägt, ist irgendwo angemeldet — so denkt dieses Haus, und er weiß das." },
            { seen: "sq_brandt_1",       text: "Weicht Autorität instinktiv aus. Ein erfundener Brandschutztermin räumt ihn schneller aus dem Gebäude als jedes Nein." },
            { flag: "sq_brandt_chefsache", text: "Versteht sich mit Dr. Wichtig auf Anhieb. Das ist die eigentliche Warnung." }
        ]
    },

    {
        id: "lena",
        cat: "person",
        name: "Praktikantin Lena",
        rolle: "Marketing",
        kopf: "Traut sich zu fragen, und zwar bevor es zu spät ist. Das unterscheidet sie vom Rest des Hauses.",
        seen: ["call_lena", "call_locked_in", "call_lena_keller", "call_lena_bewerbung"],
        notizen: [
            { seen: "call_lena",           text: "Löscht einmal etwas Wichtiges und ruft sofort an, statt es zu vertuschen. Damit ist sie schon jetzt professioneller als zwei Abteilungsleiter." },
            { seen: "call_locked_in",      text: "Der Keller hat ein Zahlenschloss. Der Code ist seit der Installation vierstellig null." },
            { seen: "call_lena_keller",    text: "Bedankt sich Tage später noch einmal, unaufgefordert. Das kommt in diesem Haus so selten vor, dass man kurz nach dem Haken sucht." },
            { seen: "call_lena_bewerbung", text: "Bewirbt sich um die Ausbildung. Wer ihr beim Lebenslauf hilft, hilft womöglich der einzigen Nachwuchskraft, die später Bescheid weiß." }
        ]
    },
    {
        id: "bernd",
        cat: "person",
        name: "Bernd",
        rolle: "Vertrieb, bis zu seinem letzten Tag",
        kopf: "Der Kollege, an dem sich zeigt, wie weit dieses Haus jemanden fallen lässt, bevor es nachfragt. Am Ende war es nicht weit genug.",
        seen: ["srv_bernd_1", "cof_milk_1", "cof_sugar_1", "sq_moral_bernd", "sq_bernd_schreibtisch"],
        notizen: [
            { seen: "cof_milk_1",           text: "Griff nach der letzten H-Milch, nach dem letzten Zucker, nach dem letzten von allem. In der Teeküche war er berechenbar." },
            { seen: "srv_bernd_1",          text: "Saß irgendwann weinend zwischen den warmen Racks, mit einer Flasche Whisky und dem Satz, dass alles weg sei. Er hatte recht, nur die Reihenfolge stimmte nicht." },
            { flag: "path_bernd_snitch",    text: "Ein anonymer Anruf bei der Personalabteilung genügt. Zwei Minuten später trägt die Security ihn hinaus, und er ruft dabei etwas auf Latein." },
            { seen: "sq_moral_bernd",       text: "Bot fünfzig Euro bar für das Löschen einer Mail. Der Preis für ein Gewissen war ihm nie peinlich, nur die Summe." },
            { seen: "sq_bernd_schreibtisch", text: "Sein Platz wurde geräumt, während sein Rechner noch lief. Zwei Kartons, ein Locher, eine Tasse mit Fußballwappen." },
            { seen: "sq_bernd_schreibtisch", text: "Der Karton mit den privaten Sachen steht acht Monate im Lager. Abgeholt wird er nie, weggeworfen aber auch nicht." }
        ]
    },
    {
        id: "lisa",
        cat: "person",
        name: "Lisa",
        rolle: "Marketing",
        kopf: "Fünfzehn Meter Luftlinie und ein Match auf dem Handy. Sie ist charmant, direkt und hat einen Laptop, der komische Geräusche macht.",
        seen: ["sq_tinder_1", "sq_tinder_2"],
        notizen: [
            { seen: "sq_tinder_1",   text: "Kennt dich als den Admin, der verzweifelt aus dem Fenster schaut. Die Beschreibung sitzt und tut weh." },
            { flag: "lisa_contact",  text: "Zwanzig Minuten Lobby, gemeinsames Lästern über Drucker, ein Witz über IPv6, der angeblich verstanden wurde. Es war ein guter Kaffee." },
            { seen: "sq_tinder_2",   text: "Die zweite Nachricht kommt mit Herz-Emoji und einem Lüfter, der entstaubt werden müsste. Als private Gefälligkeit, versteht sich." }
        ]
    },
    {
        id: "sarah",
        cat: "person",
        name: "Sarah",
        rolle: "Personalabteilung",
        kopf: "Steht an der Kaffeemaschine, lächelt und fragt, ob der Server brennt. Beides gleichzeitig zu beantworten ist schwerer, als es aussieht.",
        seen: ["cof_flirt_1", "cof_flirt_2a"],
        notizen: [
            { seen: "cof_flirt_1",      text: "Ihre Begrüßung lautet 'Na, IT-Held?'. Wer darauf 'Error 404' antwortet und wegrennt, spielt sich die Szene den ganzen Flur lang vor." },
            { flag: "path_flirt_date",  text: "Ein Kompliment über Feuer und Löschen genügt, damit sie eine Haarsträhne zwirbelt. So einfach ist es sonst nie." },
            { seen: "cof_flirt_2a",     text: "Fragt selbst nach einem Drink, der nicht aus dem Automaten kommt. Wer sich auf Überstunden rausredet, wird ausgerechnet vom vorbeigehenden Chef dafür gelobt." }
        ]
    },
    {
        id: "sabine",
        cat: "person",
        name: "Sabine",
        rolle: "Personalabteilung",
        kopf: "Schafft eine inklusive Atmosphäre und führt Listen darüber, wer sich daran hält. Beides mit derselben Ernsthaftigkeit.",
        seen: ["mail_cake_1", "mail_cake_2", "mail_sabine_tupper", "mail_ac_pants", "mail_teambuilding_1"],
        notizen: [
            { seen: "mail_cake_1",        text: "Bäckt veganen, glutenfreien Zucchini-Kuchen für alle und schreibt dazu, dass jeder nur ein Stück nehmen darf. Der Widerspruch fällt ihr nicht auf." },
            { seen: "mail_cake_2",        text: "Wer ihren Kuchen kommentiert, landet auf der Kein-Weihnachtsgeld-Liste. Es gibt diese Liste. Sie führt sie selbst." },
            { seen: "mail_sabine_tupper", text: "Ihre rote Dose trägt einen Aufkleber mit ihrem Namen. Verschwindet sie, durchsucht sie Schreibtische und droht mit der Polizei." },
            { seen: "mail_teambuilding_1", text: "Ihr Teamevent heißt Wald-Survival: aussetzen, ohne Handys, wer zuerst zurück ist, wird nicht gefeuert. Sie meint den Nachsatz als Anreiz." },
            { seen: "mail_ac_pants",      text: "Formuliert Ermahnungen in vollständigen Sätzen, egal wie absurd der Anlass ist. Genau das macht sie so schwer zu ertragen." }
        ]
    },
    {
        id: "wuttke",
        cat: "person",
        name: "H. Wuttke",
        rolle: "Buchhaltung",
        kopf: "Benutzt das Postfach für alles, wofür andere getrennte Geräte haben. Die Grenze zwischen Arbeit und Einkaufszettel ist ihm nie erklärt worden.",
        seen: ["mail_wuttke_excel", "mail_wuttke_1", "mail_wuttke_ai", "mail_software_1"],
        notizen: [
            { seen: "mail_wuttke_excel", text: "'Ich habe nichts gemacht, ehrlich' steht in Großbuchstaben in der Betreffzeile. Gelöscht wurde Spalte G." },
            { seen: "mail_wuttke_1",     text: "Schreibt Suchanfragen als Mail. 'Gulasch Rezept einfach schnell ohne Paprika', kein Betreff, kein Empfängerzweifel." },
            { seen: "mail_wuttke_ai",    text: "Hält die automatische Antwort für einen Menschen und bedankt sich bei Outlook. Dann bestellt er bei ihm Sahne und Nudeln, keine Spiralnudeln." },
            { seen: "mail_software_1",   text: "Installiert Gratis-Software, weil der Rechner danach bunter ist, und bietet den Link kollegial weiter. Genau dort beginnt die Arbeit." }
        ]
    },
    {
        id: "werner",
        cat: "person",
        name: "Werner",
        rolle: "Schwiegervater",
        kopf: "Ruft auf dem Diensttelefon an, spricht sehr laut und hält die IT für einen Familienbetrieb. In gewisser Weise hat er recht.",
        seen: ["call_werner_tablet", "call_werner_blind"],
        notizen: [
            { seen: "call_werner_tablet", text: "Nennt dich Jürgen und schreit, als läge ein Ozean dazwischen. Es liegen vier Kilometer dazwischen." },
            { seen: "call_werner_tablet", text: "Renate hat ihm ein Wisch-Brett geschenkt. Seitdem hat das Diensttelefon eine zweite Bestimmung." },
            { seen: "call_werner_blind",  text: "Hat eine Nachbarschaftsgruppe mit 214 Mitgliedern gegründet und ihr KEINE POLITIK in den Namen geschrieben. Beides sagt alles über ihn." }
        ]
    },
    {
        id: "petzold",
        cat: "person",
        name: "Herr Petzold",
        rolle: "Qualitätssicherung",
        kopf: "Nimmt jede Sache ernst und alle gleich ernst. Deshalb dauert bei ihm alles länger und ist am Ende doch dokumentiert.",
        seen: ["call_scanner_riesig", "call_petzold_handbuch", "cof_tasse_2"],
        notizen: [
            { seen: "call_scanner_riesig",  text: "Scannt in höchster Auflösung, in Farbe, einzeln. Vierhundertzwölf Seiten. Er hat nichts falsch gemacht, er hat alles maximal gemacht." },
            { seen: "call_petzold_handbuch", text: "Führt seine Änderungen von Hand auf Papier nach. Das digitale Handbuch ist damit die schlechtere Quelle, und er weiß das." },
            { seen: "cof_tasse_2",          text: "Dirigiert beim Telefonieren mit der freien Hand. Und trinkt, ohne hinzusehen, aus der Tasse, die gerade dasteht." }
        ]
    },
    {
        id: "meyer",
        cat: "person",
        name: "Frau Meyer",
        rolle: "Buchhaltung",
        kopf: "Zwischen ihr und der Katastrophe liegen immer genau zehn Minuten. So lange, sagt sie, sei es noch bis zum Termin.",
        seen: ["call_meyer_1", "call_meyer_2"],
        notizen: [
            { seen: "call_meyer_1", text: "Der schwarze Bildschirm ist nie ein schwarzer Bildschirm. Meistens ist es Flüssigkeit, manchmal ein Stecker, nie das, was sie sagt." },
            { seen: "call_meyer_2", text: "'Ich habe NICHTS gemacht' ist bei ihr keine Lüge, sondern eine Zustandsbeschreibung. Sie hat wirklich nichts gemacht — der Kaffee schon." },
            { seen: "call_meyer_2", text: "Wer die Schuld auf sich nimmt, findet eine Stunde später Pralinen auf dem Tisch. Ohne Karte, versteht sich." }
        ]
    },
    {
        id: "aluhut",
        cat: "person",
        name: "Herr Aluhut",
        rolle: "Einkauf",
        kopf: "Heißt anders. Meldet sich am Telefon je nach Lage als Eule oder gar nicht, und flüstert grundsätzlich.",
        seen: ["call_aluhut", "call_aluhut_1", "call_aluhut_2", "call_aluhut_folie"],
        notizen: [
            { seen: "call_aluhut",       text: "Hat das Mikrofon mit Kaugummi verschlossen. Technisch gesehen wirksam, das ist das Ärgerliche daran." },
            { seen: "call_aluhut_1",     text: "Seine Maus blinkt im Morsecode. Jede Maus blinkt, aber er ist der Einzige, der zuhört." },
            { seen: "call_aluhut_2",     text: "Ruft unter wechselnden Decknamen an. Die Nummer bleibt dieselbe." },
            { seen: "call_aluhut_folie", text: "Was bei ihm hilft, verbreitet sich im Einkauf. Drei Router in Alufolie gehen auf genau einen guten Rat zurück." }
        ]
    },
    {
        id: "kunz",
        cat: "person",
        name: "Herr Kunz",
        rolle: "Lager",
        kopf: "Arbeitet, während andere Rücksprache halten. Ruft nur an, wenn wirklich etwas steht.",
        seen: ["call_zeiterfassung", "call_update_mittag"],
        notizen: [
            { seen: "call_update_mittag", text: "Wenn er anruft, wartet die Lieferung schon auf dem Hof. Seine Dringlichkeit ist echt, im Gegensatz zu den meisten." },
            { seen: "call_zeiterfassung", text: "Bittet um kleine Regelbrüche im Ton einer Bitte um ein offenes Fenster. 'Du kommst doch überall rein' ist bei ihm keine Drohung, sondern Vertrauen." },
            { seen: "call_zeiterfassung", text: "Vergisst regelmäßig auszustempeln. Die 23:40 in der Zeiterfassung ist kein Beweis für Fleiß, sondern für Feierabend." }
        ]
    },
    {
        id: "kirchner",
        cat: "person",
        name: "Frau Kirchner",
        rolle: "Auftragsbearbeitung",
        kopf: "Meldet Symptome zuverlässig und die Ursache vier Minuten später. Man muss ihr nur so lange zuhören.",
        seen: ["call_signatur_weg", "call_teams_immer_gelb"],
        notizen: [
            { seen: "call_signatur_weg",     text: "'Ich habe nichts gemacht' hält bei ihr genau vier Minuten. Dann kommt die Wahrheit, freiwillig und vollständig." },
            { seen: "call_teams_immer_gelb", text: "Ihr Status springt auf Gelb, weil sie Verträge auf Papier liest. Das System hält Lesen für Abwesenheit." },
            { seen: "call_teams_immer_gelb", text: "Ihr Abteilungsleiter beurteilt Anwesenheit nach einem Punkt auf dem Bildschirm. Das ist ihr Problem und nicht ihre Schuld." }
        ]
    },
    {
        id: "oezdemir",
        cat: "person",
        name: "Frau Özdemir",
        rolle: "Projektbüro",
        kopf: "Löst Probleme entschlossen und auf dem kürzesten Weg. Leider führt der kürzeste Weg oft an der Sicherheit vorbei.",
        seen: ["call_lizenz_admin", "sq_zettel_monitor"],
        notizen: [
            { seen: "call_lizenz_admin",  text: "Fragt nach dem Admin-Passwort, um dir Arbeit zu ersparen. Sie meint es aufrichtig, und genau das macht das Nein so mühsam." },
            { seen: "sq_zettel_monitor",  text: "Ihr Passwort klebt gut lesbar am Monitor. Aus zwei Metern Entfernung, auf dem Weg zum Kopierer." },
            { seen: "sq_zettel_monitor",  text: "Einen Zettel abnehmen löst nichts. Erst das geänderte Passwort beendet die Sache, und das dauert vierzig Minuten." }
        ]
    },
    {
        id: "jablonski",
        cat: "person",
        name: "Frau Jablonski",
        rolle: "Einkauf",
        kopf: "Vergisst Passwörter zuverlässig und buchstabiert sie noch zuverlässiger falsch. Beides gehört zusammen.",
        seen: ["call_pw_reset_grind", "call_nato_1"],
        notizen: [
            { seen: "call_pw_reset_grind", text: "'Gestern ging es noch' ist ihre feste Formel. Was dazwischen war, gilt nicht als Ereignis." },
            { seen: "call_nato_1",         text: "Buchstabiert nach eigenem Alphabet: A wie Apfel, C wie Ceylan oder Chamäleon, je nach Tagesform." },
            { seen: "call_nato_1",         text: "Ein temporäres Passwort am Telefon durchzugeben dauert bei ihr länger als es zurückzusetzen. Man weiß es und macht es trotzdem." }
        ]
    },
    {
        id: "plomp",
        cat: "person",
        name: "Frau Plomp",
        rolle: "Kundenbetreuung",
        kopf: "Beschreibt Geräte nach dem, wozu sie sie benutzt. Erstaunlich oft hilft das mehr als der Fachbegriff.",
        seen: ["call_cup_holder", "call_plomp_tape"],
        notizen: [
            { seen: "call_cup_holder", text: "Nennt das CD-Laufwerk Getränkehalter. Nach der zweiten Tasse ist es das auch nicht mehr." },
            { seen: "call_plomp_tape", text: "Wird ein Laufwerk zugeklebt, sieht sie darin keinen Schutz, sondern Betrug: 'Das ist ja doch ein Loch.'" },
            { seen: "call_plomp_tape", text: "Merkt sich Lösungen und erzählt sie weiter. Was bei ihr funktioniert, taucht Wochen später in der Nachbarabteilung auf." }
        ]
    },
    {
        id: "grabowski",
        cat: "person",
        name: "Herr Grabowski",
        rolle: "Ehemaliger Kollege, seit sieben Jahren in Rente",
        kopf: "Ruft einmal im Jahr an, immer freundlich, immer wegen derselben Sache. Er hat mehr Geduld als drei IT-Generationen zusammen.",
        seen: ["call_grabowski_1", "call_grabowski_2"],
        notizen: [
            { seen: "call_grabowski_1",    text: "Beendet das Gespräch mit 'Bis nächstes Jahr dann' und legt zuerst auf. Das ist kein Trotz, das ist Terminplanung." },
            { flag: "call_grabowski_akte", text: "Die Lösung ist eine Checkbox in den Druckeinstellungen. Sieben Jahre, drei Vorgänger, ein Haken." },
            { seen: "call_grabowski_2",    text: "Wer ihn anruft statt das Ticket still zu schließen, kommt in den Kegelverein-Bericht. Das ist die höchste Auszeichnung dieses Hauses." }
        ]
    },
    {
        id: "leuchter",
        cat: "person",
        name: "Herr Leuchter",
        rolle: "Niederlassung Süd",
        kopf: "Existiert, das ist gesichert. Erreichbar ist etwas anderes.",
        seen: ["call_tennis_1", "call_tennis_2", "call_tennis_3"],
        notizen: [
            { seen: "call_tennis_1",  text: "Ist im Gespräch. War im Gespräch. Wird im Gespräch sein." },
            { seen: "call_tennis_2",  text: "Ruft zurück, wenn man gerade im Serverraum ist. Das ist kein Zufall mehr, das ist ein Muster." },
            { seen: "call_tennis_3",  text: "Kommt man endlich durch, weiß keiner mehr, worum es ging. Beide sind erleichtert." }
        ]
    },
    {
        id: "kowalski",
        cat: "person",
        name: "Herr Kowalski",
        rolle: "Automatenvertrieb, extern",
        kopf: "Stellt Geräte auf, die besser sind als alles im Haus, und wartet ab. Verkaufen muss er nichts, das erledigt der Vergleich.",
        seen: ["cof_automat_1", "cof_automat_2"],
        notizen: [
            { seen: "cof_automat_1", text: "'Zur Probe. Völlig unverbindlich.' Der Satz stimmt wörtlich und ist trotzdem eine Falle." },
            { seen: "cof_automat_2", text: "Holt die Maschine persönlich ab und fragt beim Aufwickeln des Kabels nach dem Einkauf. Der Zeitpunkt ist gewählt." },
            { seen: "cof_automat_2", text: "Kennt die Antwort des Einkaufs, bevor sie kommt. 'Bis nächstes Quartal dann.'" }
        ]
    },

    /* ----------------------------------------------------------------- KOLLEGIUM
       The seven with a reputation bar. Team stays the at-a-glance view of how
       they feel about you right now; here stands what you have learned about
       them, permanently. Their heads are unlocked from the first shift, since
       Müller has worked alongside them for years - only the notes are earned. */
    {
        id: "k_kevin", cat: "team", name: "Kevin", rolle: "Auszubildender",
        kopf: "Lernt schnell, nur selten das, was auf dem Ausbildungsplan steht. Fragt zu spät und meldet zu ehrlich.",
        seen: ["cof_deka_2", "call_diskret_2", "sq_kevin_geheim_2", "srv_schacht_3", "call_kevin2", "call_kevin_button_1", "rep_kevin_story_1"],
        notizen: [
            { seen: "sq_kevin_geheim_2", text: "Kennt Ecken des Gebäudes, die in keinem Plan stehen, und teilt sie nur mit Leuten, die nicht nachfragen." },
            { seen: "cof_deka_2",        text: "Hat immer eine Thermoskanne im Rucksack. Er stellt keine Fragen, aber er notiert." },
            { seen: "call_diskret_2",    text: "Wird von der Geschäftsleitung zuverlässig Justin genannt. Dreimal im selben Gespräch." },
            { seen: "srv_schacht_3",     text: "Führt ein Klemmbrett und merkt Veränderungen, bevor die Überwachung sie meldet. Man sollte ihm öfter zuhören." },
            { seen: "call_kevin_backup", text: "Macht Sicherungen aus eigenem Antrieb, vier Stunden lang, und legt sie neben das Original. Der Wille stimmt, der Ort nicht." },
            { seen: "call_kevin2",          text: "Will das Admin-Passwort, sobald die Panik groß genug ist. Der Satz davor lautet immer, dass der Chef ihn sonst umbringt." },
            { seen: "call_kevin_button_1",  text: "Drückt Knöpfe, um zu sehen, was passiert. Das ist beim Lernen eine Stärke und im Serverraum ein Problem." },
            { seen: "rep_kevin_story_1", text: "Schreibt aus Langeweile Skripte, die tatsächlich funktionieren. Was sie sonst noch tun, merkt man erst, wenn sie auf alle Mails antworten." }
        ]
    },
    {
        id: "k_chantal", cat: "team", name: "Chantal", rolle: "Marketing",
        kopf: "Spricht fließend Strategie und kein Wort Technik. Beides mit derselben Überzeugung.",
        seen: ["cof_chantal_tiktok_2b", "call_chantal_umfrage", "sq_smile_gate_2a", "call_chantal_breakdown_1", "call_beamer_workshop", "call_chef_kaffeetrick", "rep_chantal_story_1"],
        notizen: [
            { seen: "call_chantal_umfrage", text: "Ihre Umfragen haben immer schon ein Ergebnis, wenn sie verschickt werden. Die Rückläufe sind Formsache." },
            { seen: "cof_chantal_tiktok_2b", text: "Was in ihrer Story landet, war vorher nie zur Veröffentlichung gedacht. Sie sieht darin keinen Widerspruch." },
            { seen: "sq_smile_gate_2a",     text: "Nennt jede Maßnahme nach dem Gefühl, das sie erzeugen soll, nie nach dem, was sie tut." },
            { seen: "call_chantal_breakdown_1", text: "Zwei Likes nach zehn Minuten sind für sie ein Notfall. Die Panik ist echt, auch wenn der Anlass es nicht ist." },
            { seen: "call_chef_kaffeetrick", text: "Feel-Good-Management ist eine Funktion, kein Zustand. Wer das verwechselt, diskutiert stundenlang." },
            { seen: "call_chantal",         text: "Gesperrte Seiten sind für sie Recherche-Hindernisse. Der Hinweis auf den Chef kommt im selben Atemzug und ist nicht als Drohung gemeint, sondern als Argument." },
            { seen: "call_chantal_hostage_1", text: "Wer sie aus einem Termin rettet, hat einen Gefallen gut. Wer es nicht tut, hört vierzig Minuten später davon." },
            { seen: "rep_chantal_story_1", text: "Hinter der Fassade sitzt jemand, der die Fassade durchschaut. Das gibt sie genau einmal zu, an der Kaffeemaschine, und nie wieder." }
        ]
    },
    {
        id: "k_egon", cat: "team", name: "Egon", rolle: "Hausmeister",
        kopf: "Der eigentliche Hausherr. Besitzt jeden Schlüssel, misstraut jedem Kabel und hat für alles eine Lösung von 1987.",
        seen: ["srv_egon_kabel_1", "call_meyer_2", "cof_empfang_1", "rep_egon_story_2c", "call_egon_switch", "call_climate_emergency", "rep_egon_story_2a"],
        notizen: [
            { seen: "srv_egon_kabel_1", text: "Verleiht nichts, er übergibt. Wer etwas von ihm bekommt, ist ab da Verwalter, nicht Besitzer." },
            { seen: "call_meyer_2",     text: "Hasst Elektrik und kommt trotzdem. Er will nur vorher wissen, wer schuld ist." },
            { seen: "rep_egon_story_2c", text: "Repariert Dinge dauerhaft, die andere zweimal im Jahr ersetzen. Danken muss man ihm dafür nicht, aber merken sollte man es sich." },
            { seen: "call_egon",         text: "Meldet Störungen wörtlich und ohne Deutung. Ob eine Flüssigkeit Kühlmittel oder Alien ist, entscheidet die IT, nicht er." },
            { seen: "sq_janitor_talk",   text: "Am Hintereingang ist er gesprächiger als im ganzen restlichen Haus. Man muss nur zufällig vorbeikommen." },
            { seen: "call_egon_switch",  text: "Hat einen nassen Switch aufgeschraubt und trockengeföhnt. Er fragt hinterher, ob das so richtig war, und der Kasten läuft tatsächlich." },
            { seen: "call_climate_emergency", text: "Steht bei minus zehn Grad vor der Klimaanlage und will sie wärmer stellen. Dass ein Serverraum kalt sein soll, ist für ihn Ideologie." },
            { seen: "rep_egon_story_2a", text: "Geht bald in Rente und sucht jemanden, dem er das Haus übergeben kann. Die Auswahl ist klein, die Prüfung streng." }
        ]
    },
    {
        id: "k_wichtig", cat: "team", name: "Dr. Wichtig", rolle: "Geschäftsführung",
        kopf: "Hat Visionen, Termine und ein Telefon im Tunnel. Von allem dreien ist der Tunnel am verlässlichsten.",
        seen: ["srv_puppe_2", "sq_brandt_1", "call_diskret_1", "call_boss_pocket", "call_boss_tunnel", "rep_ceo_story_1"],
        notizen: [
            { flag: "call_diskret_gefallen", text: "Größere Probleme regelt er über die offizielle Struktur. Bildschirm-Probleme regelt er heimlich." },
            { seen: "srv_puppe_2",           text: "Sucht für jedes Unwohlsein eine technische Ursache. Ein Messprotokoll heilt ihn zuverlässiger als eine Diagnose." },
            { seen: "sq_brandt_1",           text: "Versteht sich mit externen Beratern auf Anhieb. Es ist dieselbe Sprache, nur unterschiedlich abgerechnet." },
            { seen: "call_pw_lost",          text: "Erwartet, dass die IT seine eigenen Passwörter kennt. Er hält das nicht für eine Sicherheitslücke, sondern für Service." },
            { seen: "boss_flood",            text: "In der Rangfolge einer Katastrophe stehen die Kois vor den Bodensteckdosen. Er sagt es nicht im Scherz." },
            { seen: "call_junior",           text: "Sein Sohn hält die Firma für Familienbesitz. Zwölf Jahre alt, und er hat es von irgendwem gehört." },
            { seen: "call_boss_pocket",      text: "Wählt gelegentlich aus der Hosentasche. Was man dann hört, ist ehrlicher als jede All-Hands." },
            { seen: "rep_ceo_story_1", text: "Visionen enden bei ihm regelmäßig mit Geräten im Serverraum. Laufbänder zum Beispiel, drei Stück, für agiles Programmieren im Gehen." }
        ]
    },
    {
        id: "k_elster", cat: "team", name: "Frau Elster", rolle: "Buchhaltung",
        kopf: "Formvollendet, unbestechlich und unerbittlich. Wer ihre Regeln benutzt statt sie zu umgehen, hat sie auf seiner Seite.",
        seen: ["sq_obstkorb_2", "srv_ntp_2", "cof_elster_razzia", "cof_elster_audit_1", "call_elster_excel", "rep_elster_story_2b"],
        notizen: [
            { seen: "sq_obstkorb_2",   text: "Eine Liste von ihr beendet jede Selbstbedienung. Nicht durch Verbot, sondern durch Sichtbarkeit." },
            { seen: "srv_ntp_2",       text: "Rohdaten sind bei ihr besser aufgehoben als bei jedem System. Sie liefert sie mit Korrekturspalten und Versionsnummer zurück." },
            { seen: "cof_elster_razzia", text: "Der Kühlschrank ist ihr Zuständigkeitsbereich. Das steht in keiner Stellenbeschreibung und gilt trotzdem." },
            { seen: "call_zeit_revision", text: "Bemerkt jede nachträgliche Änderung in der Zeiterfassung. Sie weiß auch, welches Konto sie gemacht haben muss." },
            { seen: "call_elster_budget_trap_1", text: "Anträge scheitern bei ihr nie am Geld, sondern an der Form. Das ist die schlechtere Nachricht." },
            { seen: "cof_elster_audit_1",   text: "Führt Strichlisten über den Bohnenverbrauch und kennt die Abweichung zum Vorquartal auf die Kommastelle." },
            { seen: "call_elster_excel",    text: "Ein schwarzer Bildschirm bringt sie zum Weinen, eine Fristüberschreitung nicht. Die Rangfolge ist konsequent." },
            { seen: "rep_elster_story_2b", text: "Hinter geschlossenen Jalousien bittet sie um Hilfe für einen digitalen Bilderrahmen, der Rüdiger nicht mehr anzeigt. Das ist kein Auftrag, das ist Vertrauen." }
        ]
    },
    {
        id: "k_markus", cat: "team", name: "Markus", rolle: "Vertriebsleitung",
        kopf: "Verkauft mit echter Begeisterung Dinge, die es noch nicht gibt. Der Rückweg ist regelmäßig dein Problem.",
        seen: ["sq_markus_schritte_1", "cof_elevator_2a", "sq_markus_schritte_2", "call_markus", "cof_markus_flex_1", "rep_markus_story_2b"],
        notizen: [
            { seen: "sq_markus_schritte_1", text: "Trägt einen ungefragt in Wettbewerbe ein und rechnet fest mit Dankbarkeit." },
            { seen: "cof_elevator_2a",      text: "Der Nothalt im Aufzug ist für ihn ein Besprechungsraum. Er benutzt ihn ohne jedes Unrechtsbewusstsein." },
            { flag: "sq_schritte_dabei",    text: "Anerkennung kommt bei ihm als Emoji und ist trotzdem ehrlich gemeint." },
            { seen: "call_markus_papier",   text: "Löst Probleme notfalls im Copyshop gegenüber und rechnet die Fahrt gegen die IT auf. Zweiundvierzig Euro, und er hat die Quittung dabei." },
            { seen: "call_markus_ambush_1", text: "Schaltet die Freisprechanlage ein, ohne es zu sagen. Wer ihm etwas Vertrauliches erzählt, erzählt es dem Raum." },
            { seen: "call_markus",          text: "Jedes seiner Probleme kostet die Firma eine Million Euro und muss in fünf Minuten gelöst sein. Bisher ist keine Million geflossen." },
            { seen: "cof_markus_flex_1",    text: "Trägt die Uhr so, dass man sie sieht, und krempelt dafür den Ärmel hoch. Das Gespräch beginnt erst danach." },
            { seen: "rep_markus_story_2b", text: "Sagt der Kunde ab, liegt es an der Technik. Sagt der Kunde zu, lag es an ihm. Das System ist geschlossen und funktioniert seit Jahren." }
        ]
    },
    {
        id: "k_gabi", cat: "team", name: "Gabi", rolle: "Empfang",
        kopf: "Die Nachrichtenzentrale. Weiß Dinge vor dem Intranet, und die wichtigen erfährt sie überhaupt nur mündlich.",
        seen: ["cof_empfang_1", "sq_berater_2", "sq_brandt_1", "call_gabi_gossip_1", "call_mouse_in_printer", "rep_gabi_story_2b"],
        notizen: [
            { flag: "cof_empfang_zugang", text: "Die beste Kaffeemaschine des Hauses steht bei ihr. Zugang gibt es nicht für Geld, nur für Gefallen." },
            { seen: "sq_berater_2",       text: "Prüft Raumbelegungen und Türkamera-Standbilder aus reiner Gründlichkeit. Wer ihr etwas verschweigt, verliert Zeit." },
            { seen: "sq_brandt_1",        text: "Erfindet auf Zuruf einen Termin, der jeden Besucher aus dem Haus bewegt. Danach schuldet man ihr etwas, und sie sagt es auch." },
            { seen: "call_sekretary_2a",  text: "Ihre Fehlerbeschreibungen sind Klangbilder. Eine sterbende Kaffeemühle ist präziser als jede Fehlernummer." },
            { seen: "call_deka_stimmung", text: "Merkt an der Geschwindigkeit des Hauses, dass etwas nicht stimmt, bevor es jemand ausspricht." },
            { seen: "call_gabi_gossip_1", text: "Wenn sie eine gesperrte Seite braucht, hat das einen Grund, der gleich zur Tür hereinkommt." },
            { seen: "call_mouse_in_printer", text: "Beschreibt ein Quietschen im Takt der Seiten so genau, dass die Diagnose vor dem Hinsehen feststeht." },
            { seen: "rep_gabi_story_2b", text: "Kennt jede Vorschrift, die ihr gerade nützt, und zitiert sie mit vollem Ernst. Der Gebäudeaustritt braucht angeblich ein Ticket." }
        ]
    },
    /* -------------------------------------------------------------------- ORTE */
    {
        id: "serverraum",
        cat: "ort",
        name: "Der Serverraum",
        rolle: "Dein Revier",
        kopf: "Der einzige Raum im Haus, in dem Ursache und Wirkung noch zusammenhängen. Dafür rächt sich hier alles zeitversetzt.",
        seen: ["srv_legacy_1", "srv_marder_1", "srv_wlp_1", "srv_bernd_1", "boss_ups_battery", "srv_red_1", "lunch_server_zen"],
        notizen: [
            { seen: "srv_legacy_1",     text: "Hinter einem Rack sitzt eine versiegelte Lüftungsklappe. Der Zettel darauf ist vom Gründer und nennt zwei Anlässe zum Öffnen: Weltuntergang und Börsencrash." },
            { seen: "srv_marder_1",     text: "Die Lüftung führt ins ganze Gebäude. Was dort kratzt, ist selten Technik, und was dort riecht, riecht bald überall." },
            { seen: "srv_wlp_1",        text: "Wer hier improvisiert, hört es zuerst an den Lüftern. Sie fahren hoch, lange bevor irgendeine Warnung kommt." },
            { seen: "boss_ups_battery", text: "Unter dem Doppelboden liegt das Chefbüro. Alles, was hier ausläuft, hat ein Ziel." },
            { seen: "srv_red_1",        text: "Es ist der wärmste Raum des Hauses. Deshalb kommen Leute her, die frieren, und Tiere, die es auch tun." },
            { seen: "srv_bernd_1",      text: "Wer sich hier verkriecht, wird nicht gesucht. Das macht den Raum zur Zuflucht und gelegentlich zum Fundort." },
            { seen: "lunch_server_zen", text: "Das Surren ist gleichmäßig genug, um darin Mittagspause zu machen. Es ist die einzige Stille, die dieses Haus anbietet." }
        ]
    },
    {
        id: "teekueche",
        cat: "ort",
        name: "Die Teeküche",
        rolle: "Nachrichtenzentrale",
        kopf: "Hier weiß man Dinge früher als im Intranet und genauer als in jeder Rundmail. Der Preis ist, dass man auch selbst zum Thema wird.",
        seen: ["cof_deka_1", "cof_kaffeekasse", "cof_tasse_1", "cof_milk_1", "lunch_fish_microwave", "cof_falle_letzte_tasse", "cof_elster_razzia"],
        notizen: [
            { seen: "cof_deka_1",             text: "Aushänge werden hier laminiert und trotzdem kommentiert. Handschriftlich, direkt darunter, meist treffend." },
            { seen: "cof_kaffeekasse",        text: "Die Vertrauenskasse enthält im Zweifel einen Knopf, eine Büroklammer und einen Kassenzettel von 2023. Die Strichliste stimmt trotzdem." },
            { seen: "cof_tasse_1",            text: "Es gibt vierzig Tassen. Es fehlt immer genau die eine mit dem Sprung am Henkel." },
            { seen: "cof_milk_1",             text: "Um die letzte Packung H-Milch ist schon mehr Diplomatie betrieben worden als um jeden Rahmenvertrag dieses Hauses." },
            { seen: "cof_falle_letzte_tasse", text: "Wer die letzte Tasse nimmt, kocht neu. Das Hausgesetz braucht keinen Aushang und wird trotzdem befolgt. Meistens." },
            { seen: "lunch_fish_microwave",   text: "Die Mikrowelle steht hier, und damit auch die Zuständigkeit für alles, was jemand darin aufwärmt." },
            { seen: "cof_elster_razzia",      text: "Der Kühlschrank untersteht Frau Elster. Wer das nicht weiß, erfährt es einmal und danach nie wieder." }
        ]
    },
    {
        id: "kreativ2",
        cat: "ort",
        name: "Raum \"Kreativ 2\"",
        rolle: "Besprechungsraum, dauerbelegt",
        kopf: "Seit Monaten ganztägig gebucht und immer leer. Der Raum ist der Beweis, dass in diesem Haus ein Termin mehr wiegt als ein Mensch.",
        seen: ["sq_raum_phoenix", "sq_raum_phoenix_2c"],
        notizen: [
            { seen: "sq_raum_phoenix",     text: "Belegt durch 'Projekt Phoenix, ganztägig, Serientermin'. Ein Projekt dieses Namens kennt niemand." },
            { seen: "sq_raum_phoenix_2c",  text: "Gebucht wird er von einem Benutzerkonto, das seit 2016 hätte stillgelegt sein müssen." },
            { seen: "sq_raum_phoenix_2c",  text: "Das Konto hat gültige Zugänge und war zuletzt vor neun Tagen aktiv. Räume zu buchen ist das Harmloseste, was es kann." }
        ]
    },
    {
        id: "chefbuero",
        cat: "ort",
        name: "Das Chefbüro",
        rolle: "Etage über dem Serverraum",
        kopf: "Eckbüro mit Aquarium, Perserteppich und Auszeichnungen an der Wand. Liegt ausgerechnet direkt unter dem Serverraum.",
        seen: ["boss_ups_battery", "boss_flood", "call_diskret_1"],
        notizen: [
            { seen: "boss_ups_battery", text: "Was im Serverraum ausläuft, tropft durch den Doppelboden genau hierher. Das ist kein Zufall der Architektur, sondern ihr Wesen." },
            { seen: "boss_flood",       text: "Fünfhundert Liter Zierfisch stehen über Bodensteckdosen. Bei Wassereinbruch lautet die erste Anweisung, die Kois zu retten." },
            { seen: "call_diskret_1",   text: "Von hier kommen die Anrufe, die es offiziell nicht gibt. Keine Mail, kein Ticket, kein Flurgespräch." }
        ]
    },
    {
        id: "kopierraum",
        cat: "ort",
        name: "Der Kopierraum",
        rolle: "Zwischen Flur und Teeküche",
        kopf: "Fensterlos, laut und der einzige Raum, in dem man ungestört ist. Deshalb wird hier alles gemacht, nur selten kopiert.",
        seen: ["sq_secret_meeting_1", "cof_sugar_1", "sq_kopierer_karton"],
        notizen: [
            { seen: "sq_secret_meeting_1", text: "Wer die Tür öffnet, unterbricht etwas. In der Regel etwas, das zwei Leute aus verschiedenen Abteilungen betrifft." },
            { seen: "cof_sugar_1",         text: "Im Vorratsschrank nebenan wird gehortet, sobald das Wort Rationierung fällt. Bernd aus der Logistik ist immer schon da." },
            { seen: "sq_kopierer_karton",  text: "Kartons, die hier abgestellt werden, bleiben. Aufgebaut wird am Ende doch von Egon, wortlos, nachts." }
        ]
    },
    {
        id: "raucherecke",
        cat: "ort",
        name: "Der Hintereingang",
        rolle: "Innenhof, Raucherecke",
        kopf: "Die informellste Adresse des Hauses. Wer hier zehn Minuten steht, erfährt mehr als in jedem Meeting.",
        seen: ["sq_janitor_talk", "sq_drafty_door_2a", "srv_folder_2009"],
        notizen: [
            { seen: "sq_janitor_talk",    text: "Egon steht hier und flucht über neumodische Technik. Ein Feuerzeug zählt für ihn bereits dazu." },
            { seen: "sq_drafty_door_2a",  text: "Die Schiebetür hält jedem Provisorium stand, nur nicht einem Manager, der raus will." },
            { seen: "srv_folder_2009",    text: "Was hier besprochen wird, steht in keinem Protokoll und stimmt trotzdem öfter als das Intranet." }
        ]
    },
    {
        id: "gala",
        cat: "ort",
        name: "Die Sommerfeier",
        rolle: "Einmal im Jahr, Pflichtveranstaltung",
        kopf: "Ein Abend, an dem sich alle Dinge erlauben, für die sie sich am Montag schämen werden. Die Firma bezahlt, das Gebäude hält, der Rest ist Verhandlungssache.",
        seen: ["party_start", "party_hub", "party_buffet_1", "party_lounge_1", "party_dance_2", "party_outside_7", "party_bar_5", "party_toilet_3"],
        notizen: [
            { seen: "party_start",     text: "Der Fluchtweg über den Hinterausgang ist bekannt und wird bewacht. Wer einen Namensaufkleber auf der Stirn trägt, ist bereits verloren." },
            { seen: "party_hub",       text: "Der Raum sortiert die Leute von selbst: Bar, Buffet, Tanzfläche, Lounge, draußen. Wo jemand steht, sagt mehr über seinen Abend als jedes Gespräch." },
            { seen: "party_buffet_1",  text: "Am Buffet gilt Rangfolge. Der Mett-Igel ist gesperrt, bis die Geschäftsführung gegessen hat, und Egon setzt das durch." },
            { seen: "party_lounge_1",  text: "In der Lounge erfährt man, was das ganze Jahr verschwiegen wurde. Ein geschrottetes Firmenauto zum Beispiel, das noch niemand gemeldet hat." },
            { seen: "party_dance_2",   text: "Ab einer bestimmten Uhrzeit trägt Dr. Wichtig seine Krawatte um die Stirn. Wer das sieht, hat gute Karten und ein Problem zugleich." },
            { seen: "party_bar_5",     text: "Die schwarze Firmenkarte liegt irgendwann unbeaufsichtigt auf einem klebrigen Tresen. Sie liegt dort nicht lange." },
            { seen: "party_toilet_3",  text: "In den Kabinen wird gelästert, ohne nachzusehen, wer nebenan sitzt. Die besten Informationen des Abends kosten hier keinen Cent." },
            { seen: "party_outside_7", text: "Draußen steht irgendwann ein Anwohner im Bademantel am Zaun. Er hat recht, und es hilft ihm nichts." }
        ]
    },
    {
        id: "kantine",
        cat: "ort",
        name: "Die Kantine",
        rolle: "Untergeschoss",
        kopf: "Der einzige Ort im Haus, an dem Titel wirklich wichtig sind. Wer hier falsch anredet, wartet länger auf sein Essen.",
        seen: ["cof_chef_title", "call_canteen_fix", "lunch_sponsorenlauf", "lunch_schnitzel_gate", "lunch_throat_singing", "lunch_canteen_crash", "lunch_microwave_war"],
        notizen: [
            { seen: "cof_chef_title",       text: "Der Küchenchef ist kein Koch, sondern Senior Nutrition Artist. Er hat es sich nicht ausgedacht, er hat es sich verdient." },
            { seen: "call_canteen_fix",     text: "Der Bondrucker ist das wichtigste Gerät des Hauses. Steht er, steht das Finanzamt in der Tür — sagt Herr Löffel, und keiner widerspricht." },
            { seen: "lunch_schnitzel_gate", text: "Schnitzel-Donnerstag ist keine Speisekarte, sondern eine Rechtslage. Wer nach dem letzten greift, greift nach fremdem Eigentum." },
            { seen: "lunch_chili_war",      text: "Beim Chili gilt Anspruch vor Reihenfolge. Wer drei Abschlüsse hatte, hat mehr Hunger — so lautet die Begründung, und sie wird ernst gemeint." },
            { seen: "lunch_microwave_war",  text: "Von drei Mikrowellen läuft eine. Wer dort Fisch aufwärmt, hat zehn Minuten Zeit und den Rest des Tages einen Ruf." },
            { seen: "lunch_throat_singing", text: "Der Diversity Lunch brachte eine mongolische Kehlkopfgesang-Band in die Raummitte. Die Tische vibrierten. Gegangen ist niemand." },
            { seen: "lunch_canteen_crash",  text: "Die Kasse installiert Updates im Betrieb, eins von fünfundvierzig, mit vollem Tablett davor. Es gibt keinen Notfallmodus, es gibt nur die Schlange." },
            { seen: "lunch_sponsorenlauf",  text: "Wo Partner ein Buffet aufbauen, ist die Zuwendungsgrenze näher als der Nachtisch." }
        ]
    },
    {
        id: "aufzug",
        cat: "ort",
        name: "Der Aufzug",
        rolle: "Zwischen zweitem und drittem Stock",
        kopf: "Bleibt zuverlässig an derselben Stelle stehen. Wer ihn nimmt, spart Treppen und riskiert ein Gespräch.",
        seen: ["cof_elevator_stuck_1", "cof_elevator_2a"],
        notizen: [
            { seen: "cof_elevator_stuck_1", text: "Bleibt zwischen dem zweiten und dritten Stock hängen. Immer dort, nie woanders." },
            { seen: "cof_elevator_2a",      text: "Der Nothalt-Knopf wird hier nicht für Notfälle benutzt, sondern für Gespräche unter vier Augen." },
            { seen: "cof_elevator_stuck_1", text: "Wer die Treppe nimmt, verliert eine Minute. Wer den Aufzug nimmt, verliert manchmal zwanzig." }
        ]
    },
    {
        id: "rack7",
        cat: "ort",
        name: "Rack 7",
        rolle: "Serverraum, hintere Reihe",
        kopf: "Das Rack, an dem sich alles sammelt, was im Serverraum nicht sein sollte. Es ist nie kaputt. Es ist nur anders.",
        seen: ["srv_red_1", "srv_red_2a", "srv_schacht_3"],
        notizen: [
            { seen: "srv_red_1",     text: "Darunter bildet sich eine tiefrote, klebrige Pfütze. Über dem Rack verläuft keine Leitung, die das erklärt." },
            { seen: "srv_red_2a",    text: "Zucker lockt Ameisen. Ameisen bauen Nester. Nester bauen sie am liebsten in einem Switch für zehntausend Euro." },
            { seen: "srv_schacht_3", text: "Läuft laut Kevin neuerdings anders. Nicht kaputt, nur anders — und die Protokolle geben ihm recht." }
        ]
    },
    {
        id: "ostfluegel",
        cat: "ort",
        name: "Ostflügel",
        rolle: "Treppenhaus, drittes Obergeschoss",
        kopf: "Der Weg zum Archiv, und die einzige Etage, auf der man das Gebäude gegen sich arbeiten spürt.",
        seen: ["sq_brandtuer_1", "sq_brandtuer_2"],
        notizen: [
            { seen: "sq_brandtuer_1",       text: "Die Brandschutztür ist seit dem Umbau zu schwer. Wer täglich Kartons durchschiebt, findet eine Lösung — meist eine, die den Brandschutz aufhebt." },
            { flag: "sq_brandtuer_frei",    text: "Wird die Tür einmal ordentlich geschlossen, dauert es keine zwei Tage, bis eine Rundmail den Vorfall würdigt. Das Haus reagiert schneller auf Meldungen als auf Probleme." },
            { seen: "sq_brandtuer_2",       text: "Ein Türkeil ist beim Facility Management erhältlich. Das steht seit dem Vorfall an der Wand und stand vorher nirgends." }
        ]
    },
    {
        id: "raum_211",
        cat: "ort",
        name: "Raum 2.11",
        rolle: "Besprechungsraum, laut Belegung frei",
        kopf: "Ein Raum, der offiziell leer steht und trotzdem nie leer ist. Wer hier sitzt, gehört dazu — das genügt diesem Haus als Nachweis.",
        seen: ["sq_berater_1", "sq_berater_2", "sq_berater_3"],
        notizen: [
            { flag: "sq_berater_drin",  text: "In der Raumbelegung als frei geführt. Wer nachsieht, findet trotzdem jemanden darin, mit Laptop und Namensschild." },
            { seen: "sq_berater_2",     text: "Ein Termin macht hier wirklicher als eine Zuständigkeit. Wer einen einstellt, existiert; wer keinen hat, muss sich erklären." },
            { seen: "sq_berater_3",     text: "Am Flipchart steht dauerhaft SYNERGIE, in drei Kreisen. Neue Punkte werden hineingeschrieben, alte nie gelöscht." }
        ]
    },
    {
        id: "nl_sued",
        cat: "ort",
        name: "Niederlassung Süd",
        rolle: "Standort, nie betreten",
        kopf: "Existiert als Telefonnummer und als Handschrift auf Zetteln. Gesehen hat sie hier niemand.",
        seen: ["call_tennis_1", "call_tennis_2", "call_tennis_3"],
        notizen: [
            { seen: "call_tennis_1",    text: "Wer dort anruft, hinterlässt eine Nachricht. Wer eine Nachricht hinterlässt, bekommt einen Zettel zurück. So entsteht Korrespondenz ohne Gespräch." },
            { flag: "call_tennis_laeuft", text: "Herr Leuchter ist im Gespräch, in einer Besprechung, im Workshop. Es ist immer wahr und nie hilfreich." },
            { seen: "call_tennis_3",    text: "Kommt man doch einmal durch, hat sich das Anliegen erledigt. Die stabilste Lösung, die diese Firma kennt." }
        ]
    },

    /* ---------------------------------------------------------------- VORGÄNGE */
    {
        id: "ticket_108",
        cat: "vorgang",
        name: "Ticket 108",
        rolle: "Offen seit sieben Jahren",
        kopf: "Das älteste offene Ticket der Firma. Es hat drei IT-Leitungen überlebt und einen Anrufer, der nie aufgegeben hat.",
        seen: ["call_grabowski_1", "call_grabowski_2"],
        notizen: [
            { seen: "call_grabowski_1",    text: "Betreff: Umlaute im Etikettendruck fehlerhaft. Angelegt vor deiner Zeit, Status seitdem unverändert." },
            { flag: "call_grabowski_akte", text: "Die Lösung ist ein Haken in den Druckeinstellungen. Sie war es vermutlich schon immer." },
            { seen: "call_grabowski_2",    text: "Ein Testetikett mit 'Grüße aus Lübeck' beendet einen Vorgang, an dem drei Vorgänger gescheitert sind. Es dauert vier Minuten." }
        ]
    },
    {
        id: "transformation",
        cat: "vorgang",
        name: "Das Transformationsprojekt",
        rolle: "Existiert seit einem Kick-off",
        kopf: "Ein Projekt, das nur deshalb existiert, weil jemand es ausgesprochen und einen Termin dafür eingestellt hat. Genau so entstehen hier alle.",
        seen: ["sq_berater_1", "sq_berater_3"],
        notizen: [
            { seen: "sq_berater_1",     text: "Begonnen mit einem Mann in Grau ohne Ausweis, der das Wort benutzte, als sei damit alles erklärt." },
            { flag: "sq_berater_drin",  text: "Die Raumbelegung kannte es nicht, der Kalender schon. Vier Zusagen genügten, um daraus einen Vorgang zu machen." },
            { seen: "sq_berater_3",     text: "Einwände werden nicht abgewehrt, sondern aufgenommen. Wer 'Sicherheitskultur' sagt, findet das Wort danach in einem der drei Kreise wieder." }
        ]
    },
    {
        id: "rademacher",
        cat: "vorgang",
        name: "Das Konto Rademacher",
        rolle: "IT-Leitung bis 2016",
        kopf: "Dein Vor-Vorgänger ist seit Jahren weg. Sein Benutzerkonto nicht. Es bucht, es meldet sich an, es lebt.",
        seen: ["sq_raum_phoenix_2c"],
        notizen: [
            { seen: "sq_raum_phoenix_2c", text: "Nie stillgelegt worden. Niemand konnte sagen, wer dafür zuständig gewesen wäre." },
            { seen: "sq_raum_phoenix_2c", text: "Bucht seit Monaten einen Besprechungsraum auf ein Projekt, das es nicht gibt." },
            { seen: "sq_raum_phoenix",    text: "Solange der Raum belegt ist, fragt niemand nach. Ein Eintrag im Kalender ist hier eine hinreichende Erklärung." }
        ]
    },
    {
        id: "gruender",
        cat: "vorgang",
        name: "Der Baron von Gier",
        rolle: "Firmengründer",
        kopf: "Hinterlässt Anweisungen an Orten, an denen niemand sie sucht, und ein Gründungsjahr, das erst an einer Klotür wieder auftaucht.",
        seen: ["srv_legacy_1", "srv_legacy_2"],
        notizen: [
            { seen: "srv_legacy_1", text: "Seine Klappe im Serverraum darf laut Zettel nur bei Weltuntergang oder Börsencrash geöffnet werden. Eine der beiden Bedingungen ist Auslegungssache." },
            { seen: "srv_legacy_2", text: "Der Safe dahinter fragt nach dem Gründungsjahr. Es steht in keinem Handbuch, aber Kevin hat es an eine Klotür geschrieben." },
            { seen: "srv_legacy_2", text: "Wer sein Erbe finden will, muss durch einen Lüftungsschacht kriechen. Das ist vermutlich Absicht." }
        ]
    },
    {
        id: "betriebsrat",
        cat: "vorgang",
        name: "Der Betriebsrat",
        rolle: "Tagt monatlich",
        kopf: "Nimmt jedes Anliegen sehr ernst und behandelt es beim nächsten Mal. Das nächste Mal ist immer nach dem Problem.",
        seen: ["cof_deka_1", "call_chantal_umfrage", "cof_kaffeekasse_2b"],
        notizen: [
            { seen: "cof_deka_1",           text: "Ein Anliegen wird Tagesordnungspunkt vierzehn. Die Sitzung ist nächsten Monat, der Pilot läuft diese Woche." },
            { seen: "cof_kaffeekasse_2b",   text: "Für die Kaffeekasse ist er zuständig, sobald jemand das Wort Vertrauen benutzt." },
            { seen: "call_chantal_umfrage", text: "Umfragen zur Stimmung im Haus werden von ihm begrüßt und von anderen ausgewertet." }
        ]
    },
    {
        id: "kuehlschrank",
        cat: "vorgang",
        name: "Die Kühlschrank-Ordnung",
        rolle: "Teeküche, ungeschriebenes Recht",
        kopf: "Der am strengsten durchgesetzte Regelkatalog des Hauses. Er steht nirgends und alle kennen ihn.",
        seen: ["call_fridge_1", "cof_elster_razzia", "lunch_mettigel"],
        notizen: [
            { seen: "call_fridge_1",     text: "Das Gerät heißt Coolio 3000 und meldet sich selbst per Nebenstelle. Wer den Milchsensor abschaltet, verliert einen Zeugen." },
            { seen: "cof_elster_razzia", text: "Zuständig ist Frau Elster. Beauftragt hat sie niemand, widersprochen auch niemand." },
            { seen: "lunch_mettigel",    text: "Bei Geburtstagen gilt die Ordnung nicht. Vier Stunden Hochsommer und ein Mettigel beweisen, dass das ein Fehler ist." }
        ]
    },
    {
        id: "kaffeekasse",
        cat: "vorgang",
        name: "Die Vertrauenskasse",
        rolle: "Seit Jahren im Minus",
        kopf: "Ein Sparschwein neben einer Strichliste. Die Liste stimmt immer, die Kasse nie. Beides gilt als Naturgesetz.",
        seen: ["cof_kaffeekasse", "cof_falle_letzte_tasse"],
        notizen: [
            { seen: "cof_kaffeekasse",       text: "Vierunddreißig Striche seit Montag, Inhalt: ein Knopf, eine Büroklammer, ein Kassenzettel von 2023." },
            { seen: "cof_falle_letzte_tasse", text: "Bezahlt wird nach Strichliste, nicht nach Verbrauch. Wer ehrlich zählt, zahlt für andere mit — das weiß jeder, der einmal ehrlich gezählt hat." },
            { seen: "cof_kaffeekasse",       text: "Das Wort Vertrauen im Namen ist keine Beschreibung, sondern eine Aufgabe. Bisher hat sie niemand angenommen." }
        ]
    },
    {
        id: "notfallplan",
        cat: "vorgang",
        name: "Notfallplan 2009",
        rolle: "Streng vertraulich, hinter Rack 4",
        kopf: "Ein verstaubter Ordner, den dein Vorgänger dort deponiert hat. Oder versteckt. Der Unterschied ist nicht mehr feststellbar.",
        seen: ["srv_folder_2009", "srv_folder_2009_2a"],
        notizen: [
            { seen: "srv_folder_2009",     text: "Steht seit 2009 hinter dem Rack. In der Zeit gab es drei IT-Leitungen und keinen Notfall, der danach gefragt hätte." },
            { seen: "srv_folder_2009_2a",  text: "Auf Seite 34 klebt ein Lageplan: Zweitschlüssel Serverraum, Deckenplatte 4. Die Platte sitzt bis heute schief." },
            { seen: "srv_folder_2009",     text: "Was in diesem Haus streng vertraulich heißt, liegt meist offen herum. Nur eben dort, wo niemand sucht." }
        ]
    },
    {
        id: "prinz",
        cat: "vorgang",
        name: "S.K.H. Prinz Abubakar",
        rolle: "Royal Bank of Zamunda",
        kopf: "Die einzige Vorschussbetrugsmasche der Weltgeschichte, die keine war. Das macht die Sache nicht besser, nur komplizierter.",
        seen: ["sq_real_prince", "sq_prince_return", "call_domain_2a", "cof_kaffeekasse_2d"],
        notizen: [
            { seen: "sq_real_prince",    text: "Fünfundzwanzig Millionen im Treuhandfonds, dreißig Prozent für den Partner. Als Beweis ein Foto auf goldenem Thron, mit aktueller Tageszeitung in der Hand." },
            { flag: "prince_active",     text: "Wer die IBAN schickt, bekommt tatsächlich Geld. Sieben Komma fünf Millionen, binnen Sekunden. Die Frage ist nicht mehr, ob es echt war, sondern warum alle gewarnt haben." },
            { seen: "call_domain_2a",    text: "Belastungen auf seiner Karte lösen einen Anruf der Betrugsabteilung aus. 'Geldwäsche-Verschleierung' ist offenbar eine Begründung, die dort durchgeht." },
            { seen: "sq_prince_return",  text: "Ein überlebender Onkel und eine Gegenrevolution später will er alles zurück. Wer nicht zahlt, bekommt Interpol angedroht — und einen schwarzen Van ohne Kennzeichen vors Fenster." },
            { seen: "cof_kaffeekasse_2d", text: "Seine Karte in fremder Hand erzeugt Gerüchte, die sich nicht dementieren lassen. Ein Dementi bestätigt sie nur." }
        ]
    },
    {
        id: "wc_fall",
        cat: "vorgang",
        name: "Der Fall des stillen Örtchens",
        rolle: "Herrentoilette, zweiter Stock",
        kopf: "Drei Vorfälle in einer Woche, ein Tatort, der jedes Mal beseitigt wird, bevor jemand hinsieht. Der einzige Fall dieses Hauses, der sich tatsächlich aufklären ließ.",
        seen: ["sq_wc_fall_1", "sq_wc_fall_2", "sq_wc_fall_3"],
        notizen: [
            { flag: "wc_fall_offen", text: "Schuhgröße achtunddreißig am Abdruck der Kabinentür. Die trägt im ganzen Haus niemand." },
            { seen: "sq_wc_fall_2",  text: "Die grüne Dose ist ein Energy-Drink, den es hier nicht zu kaufen gibt. Laut Kevin trinken den Leute mit Taschengeld." },
            { flag: "wc_fall_spur",  text: "Alle drei Vorfälle fielen auf Nachmittage. Die Besucherkarte der Geschäftsleitung wurde an genau diesen drei Nachmittagen benutzt, an keinem anderen." },
            { seen: "sq_wc_fall_3",  text: "Der Täter ist zwölf, wartet auf seinen Vater und langweilt sich. Ermittlungsarbeit über drei Tage, und am Ende hilft nur, ihm einen Stuhl anzubieten." },
            { seen: "sq_wc_fall_1",  text: "Egon putzt es weg, jedes Mal, ohne Groll. Das ist der eigentliche Skandal an der Sache." }
        ]
    },
    {
        id: "karteileiche",
        cat: "vorgang",
        name: "Die Karteileiche",
        rolle: "Ein Konto ohne Mensch",
        kopf: "Wer geht, verschwindet aus der Kantine, aus dem Verteiler und aus dem Gedächtnis. Aus dem System nicht.",
        seen: ["call_bernd_rechner", "sq_bernd_schreibtisch", "sq_raum_phoenix_2c"],
        notizen: [
            { seen: "call_bernd_rechner",   text: "Auf einer frischen Rechnungsfreigabe steht ein Bearbeiter, der seit Februar nicht mehr im Haus ist. Frau Elster fällt sowas auf, sonst niemandem." },
            { seen: "sq_bernd_schreibtisch", text: "Der Nachfolger sitzt am selben Rechner, mit derselben Anmeldung. Es funktioniert, deshalb ändert es niemand." },
            { seen: "sq_raum_phoenix_2c",   text: "Ein Konto von 2016 bucht bis heute Räume. Zuständig für das Stilllegen wäre gewesen: niemand. Es braucht keinen Urlaub, kündigt nicht und beschwert sich nie." }
        ]
    },
    {
        id: "premium_trick",
        cat: "vorgang",
        name: "Der Premium-Trick",
        rolle: "Teeküche, mündlich überliefert",
        kopf: "Espresso drücken, den Becher-Sensor zuhalten, warten. Die Maschine gibt die teure Röstung heraus. Jedes Mal.",
        seen: ["call_chef_kaffeetrick", "cof_kaffeetrick_schlange"],
        notizen: [
            { seen: "cof_kaffeetrick_schlange", text: "Sieben Leute in der Schlange, jeder hält den Sensor zu. Die Maschine macht dabei ein Geräusch, das man nicht überhört." },
            { seen: "call_chef_kaffeetrick",    text: "Das Feel-Good-Management fragt nach, ob die IT etwas darüber weiß. Die IT weiß sehr genau etwas darüber." },
            { seen: "cof_kaffeetrick_schlange", text: "Kein Aushang, keine Mail, kein Chat. Das Wissen verbreitet sich ausschließlich mündlich und trotzdem schneller als jede Rundmail." }
        ]
    },
    {
        id: "hof_maeuse",
        cat: "vorgang",
        name: "Die Mäuse im Hof",
        rolle: "Innenhof, Bestand wachsend",
        kopf: "Eine humane Lösung mit Folgen. Wer im Haus fängt und draußen freilässt, hat nichts gelöst, nur verlagert.",
        seen: ["call_maus_hof", "sq_maus_falle"],
        notizen: [
            { seen: "call_maus_hof",  text: "Aus einer werden drei. Eine davon kennt sich laut Egon verdächtig gut mit dem Papierschacht aus." },
            { seen: "sq_maus_falle",  text: "Zwei Lebendfallen, beide leer, beide Köder weg. Egon sagt dazu nur: schlauer als der Vertrieb." },
            { seen: "call_maus_hof",  text: "Egon klingt bei sowas nie vorwurfsvoll, sondern fachlich interessiert. Das ist schlimmer." }
        ]
    },
    {
        id: "bandarchiv",
        cat: "vorgang",
        name: "Das Bandarchiv",
        rolle: "Serverraum, unterste Reihe",
        kopf: "Vierzig Kassetten mit Kürzeln, die niemand mehr auflösen kann. Lesegeräte dafür gibt es im Haus keine mehr.",
        seen: ["srv_dat_archiv", "call_cnc_emulator"],
        notizen: [
            { seen: "srv_dat_archiv",     text: "Beschriftet in einer Systematik, die mit ihrem Erfinder gegangen ist. Ganz unten liegt eine, die aus der Reihe fällt." },
            { seen: "call_cnc_emulator",  text: "Alte Technik verschwindet hier nie, sie wird nur seltener gebraucht. Bis sie plötzlich vier Maschinen gleichzeitig am Laufen hält." },
            { seen: "srv_dat_archiv",     text: "Wegwerfen darf es niemand, lesen kann es niemand. Der einzige stabile Zustand für Daten in diesem Haus." }
        ]
    },
    {
        id: "wochenmeeting",
        cat: "vorgang",
        name: "Das Wochenmeeting",
        rolle: "Freitagnachmittag, Besprechungsraum",
        kopf: "Der Abschluss jeder Arbeitswoche. Man berichtet, was war, und erfährt dabei, was es in Wirklichkeit gewesen sein soll.",
        seen: ["meet_review_1", "meet_synergie_1", "meet_kennzahlen_1", "meet_beamer_1", "meet_tool_1", "meet_neuling_1"],
        notizen: [
            { seen: "meet_review_1",    text: "Es sitzt immer jemand Externes mit am Tisch. Vorgestellt wird er, als sei seine Anwesenheit die Nachricht." },
            { seen: "meet_beamer_1",    text: "Der Beamer steht auf dem falschen Eingang. Jedes Mal. Wer das behebt, bekommt die Reaktionszeit der IT notiert, nicht den Dank." },
            { seen: "meet_kennzahlen_1", text: "Die eigene Woche erscheint als Diagramm, in dem ein Balken keine Beschriftung hat. Erklärt wird er trotzdem." },
            { seen: "meet_synergie_1",  text: "Was hier gesagt wird, landet im Protokoll. Was im Protokoll landet, war gesagt worden — die Reihenfolge lässt sich nachträglich nicht mehr klären." },
            { seen: "meet_neuling_1",   text: "Sätze aus diesem Raum tauchen Wochen später in Präsentationen auf, unter der Überschrift 'Stimmen aus der Organisation'." },
            { seen: "meet_tool_1",      text: "Verkauft wird gelegentlich das, was man bereits besitzt. Man erkennt es an den Spaltenüberschriften." }
        ]
    },
    {
        id: "berater",
        cat: "vorgang",
        name: "Die Berater",
        rolle: "Synerqon · Norden & Kessler · McKandy",
        kopf: "Drei Firmen, ein Auftreten. Sie begleiten die Transformation seit Jahren und sind sich darin einig, dass sie noch nicht abgeschlossen ist.",
        seen: ["meet_review_1", "meet_synergie_1", "meet_kennzahlen_1", "meet_tool_1", "meet_neuling_1"],
        notizen: [
            { seen: "meet_review_1",     text: "Aus einer Beschreibung wird bei ihnen ein Befund: Wer sagt, es laufe, hat ein Ressourcen-Alignment-Defizit mit reaktiver Eskalationskultur." },
            { seen: "meet_kennzahlen_1", text: "Ihre Zahlen stammen aus dem Intranet-Dashboard, das seit 2019 kaputt ist. Das weiß außer dir niemand im Raum." },
            { seen: "meet_synergie_1",   text: "Jede Lücke heißt Delta, und jedes Delta wird in einem Workshop definiert. Der Workshop kostet das Budget von vier Stellen." },
            { seen: "meet_neuling_1",    text: "Wer neu ist, liest die Fragen von einem ausgedruckten Ablauf ab und dreht das Blatt weg. Nach zwei Jahren macht er es auswendig." },
            { seen: "meet_tool_1",       text: "Widerspruch bringt sie nicht aus dem Takt. 'Wir haben es für Sie individualisiert' beantwortet auch den Vorwurf, es sei das eigene Produkt." }
        ]
    }
];
