/**
 * GlobalCorp FM - the company radio (7.2).
 *
 * Short spots in a voice of their own, played in the quiet moments of a
 * working day: the narrator has been silent for a while, nothing covers the
 * terminal, no mail, no emergency, not the gala, not the lesson. See
 * src/engine/engine_radio.js for when, and EVENTS.md for the format.
 *
 * Every spot is ONE recording, filed under the checksum of its text in
 * audio/fm/<lang>/ (tools/voice-text.mjs, collectRadio). Change a word and
 * the spot goes silent until it is rendered again - the narrator's rule.
 *
 * Fields:
 *   id    fm_ + motif, unique in this pool, the same in both trees
 *   kind  what sort of spot (RADIO_KINDS in lint-data): two of one kind are
 *         never played back to back
 *   when  [from, to] minutes of the day, from inclusive, to exclusive;
 *         without it the spot fits any time of the working day
 *   if    what has to hold on top: tickets (at least), l, a, b (at least,
 *         the four letters of the effects), day (a WEEK_DAY_KEYS id - never
 *         the word). A spot whose `if` holds is preferred over the rest.
 *   text  what is said. No placeholder, no emoji, no markup - it is a
 *         recording, made months before it is played.
 *
 * The presenter is a person and speaks German; a machine they quote speaks
 * English (CLAUDE.md). The listeners are addressed as Sie: it is the
 * company's own station, and it is cheerful the way a company is.
 */
export const radio = [

    // --- The morning show, until 10:00 ---
    { id: "fm_morning_coffee", kind: "morning", when: [480, 600],
      text: "Guten Morgen, GlobalCorp! Sie hören GlobalCorp FM, den Betriebsfunk, den niemand bestellt hat. Die Kaffeemaschine in der Kaffeeküche meldet bereits 'ERROR 418', die Schlange davor ist trotzdem schon vier Leute lang. Wir halten Sie auf dem Laufenden." },
    { id: "fm_morning_stretch", kind: "morning", when: [480, 600],
      text: "GlobalCorp FM, die Morgenshow. Bevor Sie sich setzen: Schultern hoch, Schultern runter, einmal tief einatmen. Bitte nicht im Serverraum, dort ist die Luft knapp. Die Personalabteilung empfiehlt drei Minuten Bewegung am Tag, gern verteilt auf den Weg zur Kaffeeküche." },
    { id: "fm_morning_mail", kind: "morning", when: [480, 570],
      text: "Die Morgenlage auf GlobalCorp FM. Über Nacht sind im Haus elfhundert Mails eingegangen, davon neunhundert mit 'Re:' im Betreff und zweihundert mit 'Re: Re:'. Eine einzige hatte einen Anhang, und der war zu groß. Der Vertrieb hat sie trotzdem an alle weitergeleitet." },
    { id: "fm_monday_morning", kind: "weekday", when: [480, 600], if: { day: "mon" },
      text: "Montagmorgen auf GlobalCorp FM. Das Wochenende liegt hinter Ihnen, der Posteingang vor Ihnen, und dazwischen nur noch der Weg vom Aufzug zum Schreibtisch. Lassen Sie sich Zeit dafür." },
    { id: "fm_morning_parking", kind: "morning", when: [480, 570],
      text: "Guten Morgen auf GlobalCorp FM. Das Parkhaus ist voll bis auf den Platz direkt am Eingang. Der gehört Dr. Wichtig, der heute von zu Hause arbeitet, und bleibt deshalb frei. Wer sich trotzdem hinstellt, findet am Mittag einen Zettel von Egon unter dem Scheibenwischer. Egon laminiert seine Zettel." },
    { id: "fm_morning_turnstile", kind: "morning", when: [480, 600],
      text: "Die Morgenshow auf GlobalCorp FM. Das Drehkreuz am Haupteingang liest heute nur jeden zweiten Ausweis. Wer zur anderen Hälfte gehört, meldet sich bitte bei Gabi am Empfang. Gabi lässt Sie durch, wenn Sie freundlich schauen, und merkt sich, wer es nicht getan hat." },
    { id: "fm_morning_kevin", kind: "morning", when: [480, 600],
      text: "Eine gute Nachricht zum Start in den Tag: Kevin, unser Azubi, war heute als Erster im Haus, schon um halb sieben. Er wollte ausprobieren, was passiert, wenn man die Uhr am Server eine Stunde vorstellt. Was passiert ist, erfahren Sie im Laufe des Vormittags aus dem Ticketsystem." },
    { id: "fm_morning_horoscope", kind: "morning", when: [480, 600],
      text: "Das Bürohoroskop auf GlobalCorp FM. Widder: Ein Termin wird verschoben, aber nicht abgesagt. Stier: Jemand isst Ihren Joghurt. Zwillinge: Sie werden in Kopie gesetzt. Alle anderen Sternzeichen: siehe Zwillinge." },
    { id: "fm_morning_no_music", kind: "morning", when: [480, 600],
      text: "Sie hören GlobalCorp FM, das Programm ohne Musik. Die Musiklizenz liegt seit drei Jahren zur Prüfung beim Einkauf. Bis sie kommt, singt Ihnen die Klimaanlage etwas vor, im Ostflügel sogar zweistimmig. Wünsche nimmt die Haustechnik entgegen." },

    // --- The other days of the week. Tuesday and Thursday exist only in a
    //     week: day mode stands for a Monday, a Wednesday or a Friday
    //     (radioDayKey). A spot whose `if` holds is drawn before the rest,
    //     so a day spot without a `when` is that day's first spot. ---
    { id: "fm_tuesday", kind: "weekday", if: { day: "tue" },
      text: "Dienstag auf GlobalCorp FM, der unauffälligste Tag der Woche. Der Montag hat seine Krisen schon gehabt, der Freitag noch nicht. Was heute schiefgeht, ist also ganz neu und gehört Ihnen allein." },
    { id: "fm_wednesday", kind: "weekday", when: [600, 690], if: { day: "wed" },
      text: "Bergfest auf GlobalCorp FM. Die halbe Woche ist geschafft, die andere Hälfte steht im Kalender. Die Buchhaltung weist darauf hin, dass ein Bergfest keine Feier ist und Sekt in der Kaffeeküche nicht abgerechnet werden kann. Wir haben trotzdem welchen gesehen." },
    { id: "fm_thursday", kind: "weekday", if: { day: "thu" },
      text: "Donnerstag auf GlobalCorp FM, und wir haben eine Prognose: Morgen ist Freitag. Was Sie heute nicht schaffen, schaffen Sie morgen auch nicht, aber morgen stört es niemanden mehr. Planen Sie entsprechend." },

    // --- Traffic: the building as a road network ---
    { id: "fm_traffic_lift_b", kind: "traffic",
      text: "GlobalCorp FM, der Verkehrsfunk. Aufzug B steht zwischen dem dritten und dem vierten Stock. Egon ist informiert und sieht nach seiner Pause nach. Bitte weichen Sie auf das Treppenhaus Ost aus. Das Treppenhaus Ost ist heute wegen einer Brandschutzübung gesperrt." },
    { id: "fm_traffic_corridor", kind: "traffic",
      text: "Der Verkehrsfunk mit einer Behinderung vor dem Vertrieb: Dort steht ein Rollcontainer quer im Flur, Herkunft unbekannt. Egon hat ihn mit Absperrband gesichert und den Flur gleich mit. Bitte umgehen Sie den Vertrieb weiträumig. Der Vertrieb kommt ohnehin zu Ihnen." },
    // fm_traffic_print_jam: the printer on the second floor is the device
    // of the month (fm_staff_printer) - it has a reputation to keep.
    { id: "fm_traffic_print_jam", kind: "traffic",
      text: "Zähfließender Verkehr an der Druckerstraße im ersten Stock. Ein Auftrag über dreihundert Seiten blockiert beide Geräte. Er kommt aus dem Vertrieb und besteht zum größten Teil aus Folien mit dem Wort Synergie. Ausweichen ist nicht möglich: Der Drucker im zweiten Stock nimmt keine fremden Aufträge an. Er hat einen Ruf zu verlieren." },
    { id: "fm_traffic_kitchen", kind: "traffic",
      text: "Stockender Verkehr in der Kaffeeküche. Vor der Spülmaschine staut sich das Geschirr bis zur Kante der Arbeitsplatte. Die Spülmaschine selbst ist längst fertig, sie wird nur nicht ausgeräumt. Bitte bilden Sie eine Rettungsgasse zum Wasserkocher." },
    { id: "fm_traffic_wrong_way", kind: "traffic",
      text: "Achtung, Falschfahrer! Im Treppenhaus West kommt Ihnen ein Kollege aus dem Vertrieb mit einem Stapel Kartons auf der falschen Seite entgegen. Bitte halten Sie sich rechts, überholen Sie nicht und sprechen Sie ihn nicht an. Er telefoniert." },
    { id: "fm_traffic_kreativ", kind: "traffic",
      text: "Eine Vollsperrung meldet der Verkehrsfunk aus dem Besprechungsraum Kreativ 2. Der Raum ist dreifach gebucht, und alle drei Termine haben pünktlich begonnen. Die Teilnehmer verhandeln gerade, wer den Beamer bekommt. Der Beamer zeigt seit zehn Minuten 'No Signal' und hält sich raus." },
    { id: "fm_traffic_barrier", kind: "traffic",
      text: "Der Verkehrsfunk aus dem Parkhaus. Die Schranke an der Ausfahrt nimmt seit heute früh nur noch Münzen. Münzen hat im Haus niemand mehr, seit die Kantine nur noch Karte nimmt. Die Buchhaltung prüft eine Lösung. Bis dahin stehen Sie gut, wo Sie stehen." },
    { id: "fm_traffic_lift_a", kind: "traffic",
      text: "Eine erfreuliche Meldung vom Verkehrsfunk: Aufzug A fährt wieder, allerdings nur nach unten. Wer nach oben will, fährt erst einmal in den Keller und überlegt es sich dort noch einmal. Die Haustechnik spricht von einem Teilerfolg und bittet, in der Kabine nicht zu springen." },

    // --- Weather, indoors ---
    // fm_weather_blue: the colour-blind electrician's note ('BLAU heizt', see
    // GLOSSAR 2). The mapping is never swapped - blue heats.
    { id: "fm_weather_server", kind: "weather",
      text: "Das Wetter auf GlobalCorp FM. Im Serverraum weiterhin tropisch, am Nachmittag vereinzelte Lüfterausfälle. In der Buchhaltung Bodenfrost am Kühlschrank, Frau Elster bittet, die Tür nicht länger als nötig offen zu halten. Im Vertrieb heiter bis wolkig, je nach Quartalszahl." },
    { id: "fm_weather_blue", kind: "weather",
      text: "Das Raumklima, präsentiert von der Haustechnik. Im Ostflügel ist es seit heute früh warm, sehr warm, weil jemand den Regler auf Blau gestellt hat. Zur Erinnerung: Blau heizt. Wer es kühler haben möchte, öffnet bitte ein Fenster. Die Fenster im Ostflügel öffnen sich nicht." },
    { id: "fm_weather_fog", kind: "weather",
      text: "Das Wetter auf GlobalCorp FM. Über der Raucherecke liegt dichter Nebel, Sichtweite unter einem Meter. Im Großraumbüro schwül mit vereinzelten Böen von Thunfisch, und das, obwohl die Mikrowelle im Ostflügel gesperrt ist. Im Keller trocken und still, wie immer." },
    { id: "fm_weather_draft", kind: "weather",
      text: "Eine Unwetterwarnung für den zweiten Stock: Im Flur ist ein Fenster gekippt, es zieht, mit Böen bis in die Kaffeeküche. Halten Sie lose Notizzettel bitte fest. Die Haustechnik würde das Fenster gern schließen, aber es gehört Frau Elster, und Frau Elster hat es mit Absicht gekippt." },
    { id: "fm_weather_pollen", kind: "weather",
      text: "Der Pollenflug auf GlobalCorp FM. Im Marketing hohe Belastung durch Duftkerzen, Sorte Zimt und Apfel. Im Vertrieb mäßig, vor allem Rasierwasser. In der IT keine Belastung, dort wird nicht gelüftet. Wer empfindlich ist, meidet nach der Mittagspause bitte den Aufzug." },
    { id: "fm_weather_storm", kind: "weather", when: [480, 900],
      text: "Die Aussichten für den Nachmittag: Über der Abteilungsrunde im Vertrieb zieht ein Gewitter auf, erste Blitze gegen fünfzehn Uhr, gerichtet auf die Quartalszahlen. Danach klart es auf. Die Stimmung bleibt bis zum Feierabend frisch, im Büro des Vertriebsleiters örtlich frostig." },
    { id: "fm_weather_sun", kind: "weather",
      text: "Das Wetter: Draußen scheint die Sonne, haben wir gehört. Ein Kollege aus dem Vertrieb hat sie heute früh in der Raucherecke gesehen. Für alle mit Fensterplatz bleiben die Jalousien unten, wegen der Bildschirme. Für alle anderen ändert sich nichts." },

    // --- The canteen, around midday. The dishes are the intranet's plan
    //     (data_intranet.js, canteen.page.menu), keyed by the same day ids. ---
    { id: "fm_canteen_queue", kind: "canteen", when: [690, 810],
      text: "GlobalCorp FM, Ihre Mittagspause. Die Kantine meldet ein warmes Tagesgericht und eine Schlange bis zur Glastür. Die Mikrowelle im Ostflügel bleibt gesperrt, Egon hat gesehen, was zuletzt darin war. Wer eigenes Besteck mitbringt, ist schneller dran." },
    { id: "fm_canteen_mon", kind: "canteen", when: [690, 810], if: { day: "mon" },
      text: "Montag, und GlobalCorp FM meldet sich live von der Essensausgabe: Es gibt Spaghetti Bolognese. Die Nudeln sind weich, die Soße ist reichlich. Wer heute ein weißes Hemd trägt, hat eine mutige Entscheidung getroffen." },
    { id: "fm_canteen_wed", kind: "canteen", when: [690, 810], if: { day: "wed" },
      text: "Mittwoch ist Hawaii-Tag in der Kantine: Hähnchenbrust mit Ananas, überbacken mit etwas, das die Küche Käse nennt. Für alle anderen gibt es die große Salat-Bowl mit drei Maiskörnern. Das Dressing ist ausverkauft. GlobalCorp FM wünscht guten Appetit." },
    { id: "fm_canteen_fri", kind: "canteen", when: [690, 810], if: { day: "fri" },
      text: "Der Kantinenfunk zum Wochenende. Heute gibt es Fischstäbchen, vier Stück pro Person, an der Ausgabe abgezählt. Das Püree ist aus Pulver, der Spinat aus Überzeugung. Wer ein fünftes Fischstäbchen möchte, füllt bitte den Antrag aus. Der Antrag liegt in der Buchhaltung." },
    { id: "fm_canteen_tue", kind: "canteen", when: [690, 810], if: { day: "tue" },
      text: "Die Kantine am Dienstag: Currywurst mit Pommes, der Klassiker. Die Pommes waren um halb zwölf noch knusprig, inzwischen ist das eine Erinnerung. Vegetarisch gibt es gedünsteten Brokkoli mit Reis, ohne Soße. Die Küche nennt das gesund." },
    { id: "fm_canteen_thu", kind: "canteen", when: [690, 810], if: { day: "thu" },
      text: "Donnerstag in der Kantine, und GlobalCorp FM ist dabei. Es gibt Schnitzel Wiener Art. Die Panade löst sich leicht, bitte essen Sie zügig und ohne ruckartige Bewegungen. Der Kartoffelsalat kommt aus dem Eimer, die Kartoffelsuppe ist wässrig, wärmt aber von innen." },
    { id: "fm_canteen_dessert", kind: "canteen", when: [690, 810],
      text: "Der Nachtisch auf GlobalCorp FM. Heute gibt es Pudding, Sorte Vanille, Farbe Beige. Die Haut obendrauf ist im Preis enthalten. Wer keine möchte, nimmt sie bitte selbst ab, die Küche macht das aus hygienischen Gründen nicht mehr." },

    // --- Announcements: HR, facilities, marketing ---
    // fm_notice_basement: the basement code (0000, GLOSSAR 1) without saying it.
    // fm_notice_password: Puschel123 (GLOSSAR 1) without saying it.
    { id: "fm_notice_basement", kind: "notice",
      text: "Eine Mitteilung der Haustechnik. Egon lässt ausrichten, dass der Keller ab sofort wieder abgeschlossen ist und der Code sich nicht geändert hat. Welcher Code das ist, sagt er nicht. Egon spricht grundsätzlich nicht in Mikrofone." },
    { id: "fm_notice_password", kind: "notice",
      text: "Ein Sicherheitshinweis auf GlobalCorp FM. Bitte wählen Sie sichere Passwörter. Der Name Ihres Haustiers mit eins, zwei, drei dahinter gilt nicht als sicher, auch wenn das Haustier sehr flauschig ist. Die IT kennt inzwischen alle Haustiere im Haus." },
    { id: "fm_notice_feelgood", kind: "notice",
      text: "Eine Durchsage aus dem Marketing. Chantal lädt zur Feel-Good-Runde in den großen Besprechungsraum, Thema: Achtsamkeit im Mindset. Es gibt Obst. Das Obst ist ein Apfel, und der Apfel ist für Chantal." },
    { id: "fm_notice_fridge", kind: "notice", when: [480, 840],
      text: "Eine Durchsage der Buchhaltung. Der Kühlschrank in der Kaffeeküche wird heute um vierzehn Uhr geleert. Frau Elster bittet, alle Behälter mit Namen zu beschriften. Ein Behälter, auf dem nur 'Meins' steht, gilt als herrenlos. Der Joghurt mit der Aufschrift 'Finger weg' ist schon leer." },
    { id: "fm_notice_fire_drill", kind: "notice",
      text: "Eine Mitteilung der Haustechnik: Heute findet eine Brandschutzübung statt, die Uhrzeit bleibt geheim. Wenn der Alarm ertönt, gehen Sie bitte ruhig zum Sammelpunkt auf dem Parkplatz und nehmen Sie keine Kaffeetassen mit. Von der letzten Übung stehen dort noch elf." },
    { id: "fm_notice_survey", kind: "notice",
      text: "Die Personalabteilung lädt zur Mitarbeiterbefragung ein. Die Befragung ist anonym. Bitte geben Sie zu Beginn Ihren Namen, Ihre Abteilung und Ihre Personalnummer an, damit wir uns bei Ihnen persönlich für Ihre ehrliche Meinung bedanken können." },
    { id: "fm_notice_mug", kind: "notice",
      text: "Eine Bitte aus der Kaffeeküche: Die Tasse mit der Aufschrift 'Bester Chef der Welt' ist nicht für alle da. Sie gehört Dr. Wichtig, der sie sich selbst geschenkt hat. Stellen Sie sie bitte gespült zurück, mit dem Henkel nach rechts. Er merkt es." },
    { id: "fm_notice_reply_all", kind: "notice",
      text: "Ein Hinweis zum Mailverkehr: Bitte antworten Sie nicht allen auf die Mail mit dem Betreff 'Bitte nicht allen antworten'. Wer es schon getan hat, entschuldigt sich bitte nicht bei allen dafür. Der Mailserver bedankt sich und braucht jetzt einen Moment für sich." },
    { id: "fm_notice_lost_found", kind: "notice",
      text: "Das Fundbüro auf GlobalCorp FM. Abgegeben wurden ein Regenschirm, ein Schlüsselbund mit vierzig Schlüsseln und ein USB-Stick mit der Aufschrift 'Gehälter, nicht öffnen'. Der Regenschirm wartet bei Gabi am Empfang. Der Schlüsselbund ist schon wieder bei Egon. Der Stick wurde geöffnet." },
    { id: "fm_notice_colour", kind: "notice",
      text: "Eine Mitteilung aus dem Marketing: Die Firmenfarbe ist ab sofort Holo-Pink. Alle Präsentationen, Briefköpfe und Visitenkarten werden bis zum Monatsende umgestellt. Chantal bittet um Verständnis und um ein neues Tablet in passender Farbe, weil das alte jetzt nicht mehr zur Firma passt." },
    // fm_notice_world: Kevin and his Minecraft (data_chars), not named.
    { id: "fm_notice_world", kind: "notice",
      text: "Eine Suchmeldung: Auf dem Dateiserver ist über Nacht eine Welt entstanden, mit Bergen, Schafen und einem Haus aus Glas. Wem sie gehört, der möge sich bitte bei der IT melden. Kevin muss sich nicht melden. Die IT weiß Bescheid." },
    { id: "fm_notice_meeting_free", kind: "notice",
      text: "Eine Mitteilung der Geschäftsleitung: Ab sofort gibt es jede Woche einen besprechungsfreien Nachmittag. Welcher Nachmittag das sein wird, besprechen wir in einer Runde mit allen Abteilungsleitern. Dauer zwei Stunden, offenes Ende, die Einladung kommt gleich." },
    { id: "fm_notice_plants", kind: "notice",
      text: "Eine Bitte der Haustechnik: Die Pflanzen in den Fluren sind aus Plastik. Bitte gießen Sie sie nicht mehr. Der Gummibaum vor dem Vertrieb steht inzwischen in einem kleinen See, und unten im Topf wächst etwas, das nicht aus Plastik ist." },
    { id: "fm_notice_cake", kind: "notice",
      text: "Eine Durchsage für alle Naschkatzen: In der Kaffeeküche steht ein Kuchen. Zu welchem Anlass, weiß niemand, von wem er ist, auch nicht. Die Buchhaltung rät, ihn nicht anzuschneiden, bevor sich jemand dazu bekannt hat. Es fehlen bereits zwei Stücke." },
    { id: "fm_notice_tailgate", kind: "notice",
      text: "Ein Sicherheitshinweis: Halten Sie die Tür zum Serverraum bitte niemandem auf, auch nicht freundlichen Menschen mit Warnweste und Klemmbrett. Die haben einen eigenen Ausweis. Wer keinen hat, ist entweder von außerhalb oder aus dem Vertrieb, und beides gehört nicht in den Serverraum." },
    // fm_notice_prince: the prince of the side quests and calls (Prinz
    // Abubakar, prince_letter), not named.
    { id: "fm_notice_prince", kind: "notice",
      text: "Eine Warnung der IT: Im Haus kursiert die Mail eines Prinzen aus einem Land, das auf keiner Karte steht. Er möchte Ihnen ein Vermögen überweisen und braucht dafür nur Ihre Kontonummer. Bitte antworten Sie nicht. Frau Elster hat schon geantwortet, mit einer Rechnung." },
    { id: "fm_notice_shredder", kind: "notice",
      text: "Eine Mitteilung der Buchhaltung: Der ShredMaster 3000 ist ein Aktenvernichter und kein Papierkorb. Bitte werfen Sie keine Bananenschalen, keine Kaffeebecher und keine Krawatten hinein. Die Krawatte von letzter Woche ist nicht mehr zu retten. Ihr Besitzer trägt seitdem Fliege." },

    // --- Advertising for the company's own services ---
    { id: "fm_ad_tickets", kind: "ad",
      text: "Kennen Sie schon das Ticketsystem von GlobalCorp? Ein Problem, ein Ticket, eine Nummer. Und dann Geduld. Das Ticketsystem merkt sich alles, damit Sie es nicht müssen. Eine Werbung der IT-Abteilung. Die IT-Abteilung wusste nichts davon." },
    { id: "fm_ad_printer", kind: "ad",
      text: "Drucken bei GlobalCorp: Die Druckerstraße im ersten Stock druckt schwarz-weiß, in Farbe und gelegentlich auf Wunsch. Toner gibt es bei Frau Elster gegen Beleg. Den Beleg druckt die Druckerstraße. GlobalCorp FM empfiehlt den Bleistift." },
    { id: "fm_ad_intranet", kind: "ad",
      text: "Das Intranet von GlobalCorp: Speiseplan, Organigramm und die Vision des Vorstands, alles an einem Ort. Das Passwort finden Sie ebenfalls im Intranet. GlobalCorp FM, wir verbinden Menschen." },
    // fm_ad_coolio: the fridge of the coffee pool, which reports itself on
    // an extension.
    { id: "fm_ad_coolio", kind: "ad",
      text: "Der Coolio 3000 in der Kaffeeküche. Er kühlt, er zählt, er meldet. Wer die Milch leer zurück in die Tür stellt, bekommt noch am selben Tag einen Anruf von seiner Nebenstelle. Coolio 3000, der Kühlschrank, der Sie kennt." },
    { id: "fm_ad_kreativ", kind: "ad",
      text: "Sie brauchen Raum für große Ideen? Buchen Sie Kreativ 2: zwölf Stühle, ein Beamer und eine Steckdose, die man mit etwas Glück erreicht. Den Kaffee bringen Sie selbst mit, die Ideen bitte auch. Kreativ 2, buchbar im Intranet, sofern frei." },
    { id: "fm_ad_restart", kind: "ad",
      text: "Ihr Rechner macht Probleme? Haben Sie ihn schon aus- und wieder eingeschaltet? Wunderbar. Dann haben Sie bereits alles getan, was die IT auch getan hätte, und mussten nicht einmal warten. Die IT von GlobalCorp. Wir glauben an Sie." },
    { id: "fm_ad_premium_coffee", kind: "ad",
      text: "Neu in der Kaffeeküche: Kaffee Premium. Derselbe Kaffee wie immer, aber in der Tasse mit Goldrand, für nur fünfzig Cent mehr. Die Strichliste hängt gleich neben der Maschine. Kaffee Premium. Schmeckt wie immer, kostet mehr, fühlt sich besser an." },
    // fm_ad_magazine: Dr. Wichtig's MEHRWERT, the magazine in the vending
    // machine (data_vending), issue one, never sold out. Spelt as a word:
    // the spot is only heard, and capitals invite a voice to spell it.
    { id: "fm_ad_magazine", kind: "ad",
      text: "Lesen Sie 'Mehrwert', das Magazin von Dr. Wichtig. Vierzig Seiten Vision, ein Interview mit dem Herausgeber, geführt vom Herausgeber, und auf der Rückseite der Herausgeber beim Golf. Ausgabe eins ist weiterhin erhältlich. Ausgabe zwei erscheint, sobald Ausgabe eins vergriffen ist." },
    { id: "fm_ad_chair", kind: "ad",
      text: "Den Ergonomic 3000 gibt es bei GlobalCorp genau einmal, in der Chefetage. Vierzehn Einstellungen, sechs Hebel und eine Anleitung von hundert Seiten. Für alle anderen Arbeitsplätze empfiehlt der Einkauf ein Kissen. Das Kissen ist beantragt." },
    // fm_ad_carpool: the lift share on the noticeboard (data_board), whose
    // one condition is no radio.
    { id: "fm_ad_carpool", kind: "ad",
      text: "Die Mitfahrbörse am Schwarzen Brett bringt zusammen, wer denselben Weg hat. Gerade sucht dort jemand zwei Mitfahrer, Abfahrt zehn nach sieben, Bedingung: kein Radio. GlobalCorp FM nimmt das nicht persönlich und wünscht eine angenehme Fahrt." },
    { id: "fm_ad_escape_room", kind: "ad",
      text: "Teambuilding mit dem Marketing: Im Escape Room im Keller lernen Sie Ihre Kollegen in sechzig Minuten von einer ganz neuen Seite kennen. Eine Tür, ein Rätsel, kein Netz. Chantal begleitet Sie mit einem Zitat für jede Minute. Anmeldung im Intranet, der Ausgang nach Absprache." },
    { id: "fm_ad_canteen_card", kind: "ad",
      text: "Die Kantinenkarte von GlobalCorp. Einfach aufladen, einfach bezahlen, einfach vergessen, wie viel noch drauf ist. Aufladen können Sie sie an der Kasse in der Kantine. Bezahlt wird dort mit der Kantinenkarte." },
    { id: "fm_ad_self_service", kind: "ad",
      text: "Passwort vergessen? Kein Problem mit dem neuen Self-Service von GlobalCorp. Klicken Sie im Intranet auf den Knopf für vergessene Passwörter, geben Sie Ihr altes Passwort ein, und alles ist wieder wie vorher. Der Self-Service. Weil auch die IT einmal Pause machen muss." },
    // fm_ad_phoenix: Projekt Phoenix, the project nobody knows (intranet,
    // side quests).
    { id: "fm_ad_phoenix", kind: "ad",
      text: "Projekt Phoenix. Es kommt. Wann, steht noch nicht fest, was, auch nicht. Wer es leitet, wird gerade geklärt, und wer es bezahlt, fragen Sie bitte nicht die Buchhaltung. Projekt Phoenix. Wir sind selbst sehr gespannt." },
    { id: "fm_ad_stress_ball", kind: "ad",
      text: "Ärger am Arbeitsplatz? Der Anti-Stressball von GlobalCorp liegt gut in der Hand, quietscht nicht und nimmt nichts übel. In Rot, ab sofort am Empfang erhältlich. Gabi hat nur noch drei. Einen hat sie heute selbst gebraucht." },
    // fm_ad_synerqon: the consultants of the meetings pool.
    { id: "fm_ad_synerqon", kind: "ad",
      text: "Diese Sendung wird Ihnen präsentiert von Synerqon Consulting. Synerqon macht aus Ihren Abläufen Folien und aus Ihren Folien Abläufe. Sie wissen nicht, was Ihre Abteilung den ganzen Tag macht? Wir auch nicht, aber wir schreiben es auf. Synerqon. Transformation, die sich abrechnen lässt." },
    { id: "fm_ad_station", kind: "ad",
      text: "Sie möchten auch einmal ins Radio? GlobalCorp FM sucht Stimmen aus dem Haus. Schicken Sie uns Ihre Grüße, Ihre Wünsche und Ihre Beschwerden. Die Grüße lesen wir vor, die Wünsche leiten wir weiter, und die Beschwerden gehen mit Ihrem Namen an die Personalabteilung." },

    // --- From the top floor ---
    { id: "fm_board_tunnel", kind: "board",
      text: "Und jetzt ein Gruß aus der Chefetage. Dr. Wichtig denkt an alle, die gerade zuhören, und ganz besonders an alle, die dabei eigentlich arbeiten sollten. Er wollte das persönlich sagen, die Verbindung ist aber im Tunnel abgebrochen. Er ruft gleich noch mal an." },
    { id: "fm_board_paperless", kind: "board",
      text: "Ein Wort aus der Chefetage: Dr. Wichtig hat eine Vision. Bis zum Jahresende soll GlobalCorp papierlos arbeiten. Die Vision ging heute früh allen Abteilungen zu, ausgedruckt, in Farbe, beidseitig, mit Unterschrift und Deckblatt." },
    { id: "fm_board_ai_coffee", kind: "board",
      text: "Dr. Wichtig kündigt aus der Chefetage an: Ab dem nächsten Quartal kocht eine künstliche Intelligenz den Kaffee. Die IT soll das bis dahin einrichten. Die IT hat zurückgefragt, mit welchen Händen. Die Frage wurde als Widerstand gegen den Wandel abgelegt." },
    { id: "fm_board_open_door", kind: "board",
      text: "Die Tür zur Chefetage steht immer offen, lässt Dr. Wichtig ausrichten. Er bittet trotzdem, nicht hindurchzugehen. Für Anliegen gibt es das Ticketsystem, für dringende Anliegen das Ticketsystem mit einem Ausrufezeichen im Betreff. Das Ausrufezeichen liest er persönlich." },
    { id: "fm_board_appreciation", kind: "board",
      text: "Gute Nachrichten vom Vorstand: Das Quartal war hervorragend. Als Dank an die Belegschaft gibt es in diesem Jahr keine Gehaltserhöhung, sondern etwas viel Wertvolleres, nämlich Anerkennung. Die Anerkennung kommt im Laufe des Tages per Mail, an alle, ohne Anhang." },
    { id: "fm_board_live", kind: "board",
      text: "Wir haben Dr. Wichtig live in der Leitung, aus dem Auto. Herr Dr. Wichtig, was möchten Sie der Belegschaft sagen? Es rauscht. Wir hören ein Wort, das wie Umsatz klingt, und eines, das wie Wochenende klingt, in einem Satz. Wir sind sicher, es war als Motivation gemeint." },
    // Not 'Mitarbeiter des Monats': the intranet dashboard names one of
    // those, and the radio must not contradict it.
    { id: "fm_staff_printer", kind: "staff",
      text: "GlobalCorp FM gratuliert zum Gerät des Monats. Die Wahl fiel auf den Drucker im zweiten Stock: vier Wochen ohne Papierstau, ohne Beschwerde und ohne einen Tag Urlaub. Die Urkunde hängt gleich neben ihm. Er hat sie selbst gedruckt." },
    { id: "fm_staff_egon", kind: "staff",
      text: "GlobalCorp FM gratuliert Egon zum Dienstjubiläum. Wie lange er schon im Haus ist, weiß niemand genau, seine Personalakte beginnt mit den Worten 'siehe Egon'. Die Kollegen haben zusammengelegt und ihm einen neuen Schlüsselring geschenkt. Egon hat sich bedankt und gefragt, wo die Schlüssel dazu sind." },
    { id: "fm_staff_new_colleague", kind: "staff",
      text: "Wir begrüßen eine neue Kollegin im Vertrieb. Sie hat einen Rechner ohne Passwort und einen Stuhl ohne Rollen bekommen. Das Passwort kommt nächste Woche, die Rollen sind beantragt. Willkommen bei GlobalCorp, wir freuen uns auf viele gemeinsame Tickets." },
    // fm_staff_ruediger: Frau Elster's cat (data_chars).
    { id: "fm_staff_ruediger", kind: "staff",
      text: "Grüße auf GlobalCorp FM: Frau Elster aus der Buchhaltung grüßt Rüdiger, der zu Hause ist und, so hofft sie, gerade zuhört. Sie möchte ihm sagen, dass die Dose mit dem Lachs für heute Abend ist und nicht für jetzt. Rüdiger, falls du sie schon gefunden hast: Frau Elster zählt die Dosen." },
    { id: "fm_staff_runners", kind: "staff",
      text: "Glückwunsch an die Laufgruppe: Beim Firmenlauf am Wochenende sind alle sieben ins Ziel gekommen, sechs davon zu Fuß. Markus hat das Ziel am Telefon erreicht und den Lauf unterwegs an einen Kunden verkauft. Der Kunde läuft nächstes Jahr mit." },
    { id: "fm_staff_kevin_exam", kind: "staff",
      text: "GlobalCorp FM gratuliert Kevin, unserem Azubi, zur bestandenen Zwischenprüfung. Er hat sie im zweiten Anlauf geschafft. Im ersten hatte er den Prüfungsrechner neu aufgesetzt, damit er schneller läuft. Die Prüfer haben das als Eigeninitiative gewertet und ihm einen neuen Termin gegeben." },
    { id: "fm_staff_gabi", kind: "staff",
      text: "Ein Rekord aus der Telefonzentrale: Gabi am Empfang hat gestern über zweihundert Anrufe angenommen und bei jedem gewusst, worum es geht, bevor es der Anrufer selbst wusste. Drei davon hat sie an die IT weitergeleitet, mit der Lösung im Betreff." },

    // --- The afternoon, towards clocking off ---
    { id: "fm_countdown_screens", kind: "countdown", when: [900, 990],
      text: "GlobalCorp FM am Nachmittag. Die Personalabteilung erinnert daran, dass der Feierabend kein Recht ist, sondern eine Gelegenheit. Bitte schalten Sie Ihren Bildschirm nicht vor Dienstschluss aus. Auch nicht ein kleines bisschen dunkler." },
    { id: "fm_countdown_coats", kind: "countdown", when: [930, 990],
      text: "Die letzte Stunde auf GlobalCorp FM. In den Fluren werden die ersten Jacken angezogen und im Vertrieb die ersten Mails mit 'Bis morgen!' vorgeschrieben. Markus hat seinen Rechner schon heruntergefahren und spielt Solitär auf dem Telefon." },
    { id: "fm_countdown_short_meeting", kind: "countdown", when: [900, 960],
      text: "Nachmittags auf GlobalCorp FM: Jetzt beginnt die Stunde der kurzen Besprechungen, die kurz vor Feierabend anfangen und nur zehn Minuten dauern sollen. Falls Sie gleich eine Einladung bekommen, haben Sie sie nicht gesehen. Ihr Kalender ist voll, bis Dienstschluss und darüber hinaus." },
    { id: "fm_countdown_way_out", kind: "countdown", when: [930, 990],
      text: "Der Verkehrsfunk zum Feierabend. Auf dem Weg vom Schreibtisch zum Ausgang drohen Verzögerungen: im Flur vor dem Vertrieb durch Kollegen mit einer letzten Frage, am Empfang durch Gabi mit den Neuigkeiten des Tages. Wer schnell hinausmöchte, nimmt das Treppenhaus und schaut auf den Boden." },
    { id: "fm_countdown_overtime", kind: "countdown", when: [930, 990],
      text: "Für alle, die heute länger bleiben: Die Heizung schaltet um halb fünf ab, das Licht um fünf, und ab dann hält Sie der Bewegungsmelder im Flur für einen Einbruch. Winken hilft ein bisschen. Rennen hilft mehr, dann kommt aber der Wachdienst." },
    { id: "fm_countdown_status", kind: "countdown", when: [960, 990],
      text: "Die letzte halbe Stunde auf GlobalCorp FM. Die Personalabteilung empfiehlt, sie zu nutzen, um den Schreibtisch aufzuräumen, offene Mails zu beantworten und den Status im Chat auf beschäftigt zu stellen. Die Reihenfolge überlässt sie Ihnen." },
    { id: "fm_countdown_lights", kind: "countdown", when: [930, 990],
      text: "Bevor Sie gehen: Wer als Letzter das Büro verlässt, macht bitte das Licht aus. Im Vertrieb brennt es seit drei Wochen ohne Pause, weil jeder glaubt, Markus sei noch da. Markus geht jeden Tag als Erster." },
    { id: "fm_friday", kind: "weekday", if: { day: "fri" },
      text: "Es ist Freitag. GlobalCorp FM bittet alle Abteilungen, heute keine neuen Projekte mehr anzustoßen, keine Besprechungen nach dem Mittag anzusetzen und den Satz 'nur noch ganz kurz' zu meiden. Der Vertrieb hat für vierzehn Uhr zwei Besprechungen angesetzt." },

    // --- When the day presses: the station notices what the player does.
    //     Through the fiction, never the numbers (EVENT-DOKTRIN 9). ---
    { id: "fm_alert_queue", kind: "alert", if: { tickets: 7 },
      text: "Eine Verkehrsmeldung aus dem Ticketsystem: Stau in der Warteschlange, Tendenz steigend. Bitte eröffnen Sie Ihr Ticket nicht ein zweites Mal. Wer es doppelt eröffnet, bekommt zwei Nummern, aber nicht zwei Techniker. Es gibt nur einen." },
    { id: "fm_alert_sighting", kind: "alert", if: { b: 70 },
      text: "GlobalCorp FM mit einer Sichtung: Dr. Wichtig ist auf den Fluren unterwegs, zuletzt gesehen zwischen Vertrieb und Kaffeeküche, Richtung IT. Wir empfehlen eine aufrechte Haltung und eine Tabelle auf dem Bildschirm. Eine mit vielen Zahlen." },
    { id: "fm_alert_breathe", kind: "alert", if: { a: 70 },
      text: "Zeit für eine Entspannungsübung auf GlobalCorp FM. Atmen Sie ein. Halten Sie die Luft kurz an. Atmen Sie aus. Wenn Sie dabei eine Faust gemacht haben, behalten Sie sie bitte unter dem Tisch. Der Tisch gehört der Firma." },
    { id: "fm_alert_finish", kind: "alert", if: { l: 70 },
      text: "Der Produktivitätstipp auf GlobalCorp FM: Bringen Sie heute eine einzige Aufgabe ganz zu Ende. Nur eine. Gabi vom Empfang sagt, das hat im Haus seit dem Frühjahr niemand mehr versucht, und Gabi weiß so etwas." },
    // Ten tickets end the day (checkEndConditions), so nine is the last
    // number a spot can wait for.
    { id: "fm_alert_queue_full", kind: "alert", if: { tickets: 9 },
      text: "Eine Sondermeldung des Verkehrsfunks: Im Ticketsystem geht nichts mehr. Die Warteschlange reicht inzwischen von der IT bis zur Kantine und wieder zurück. Die IT bittet um Geduld, um Verständnis und, falls jemand ohnehin in der Kaffeeküche ist, um einen doppelten Espresso." },
    { id: "fm_alert_printer_check", kind: "alert", if: { tickets: 5 },
      text: "GlobalCorp FM bittet im Namen der IT: Wenn Ihr Drucker nicht druckt, sehen Sie bitte zuerst nach, ob Papier drin ist. Dann, ob er eingeschaltet ist. Dann, ob es Ihr Drucker ist. Erst danach schreiben Sie ein Ticket. Die Warteschlange dankt Ihnen." },
    { id: "fm_alert_boss_asks", kind: "alert", if: { b: 50 },
      text: "Aus der Chefetage: Dr. Wichtig hat heute schon zweimal gefragt, was die IT eigentlich den ganzen Tag macht. Beim ersten Mal war es eine Frage. Beim zweiten Mal hat er sich die Antwort aufgeschrieben, bevor jemand etwas gesagt hat." },
    { id: "fm_alert_boss_door", kind: "alert", if: { b: 90 },
      text: "Eine Eilmeldung: Dr. Wichtig steht vor der Tür der IT. Er hat geklopft, und er wartet. GlobalCorp FM ist jetzt einen Moment still, damit es bei Ihnen nach Arbeit klingt." },
    { id: "fm_alert_doors", kind: "alert", if: { a: 50 },
      text: "Eine Bitte an alle Abteilungen: Schließen Sie die Bürotüren bitte leise. Eine Tür im Haus ist heute schon viermal so laut ins Schloss gefallen, dass am Empfang die Tassen geklirrt haben. Die Tassen sind heil, der Türrahmen wird noch geprüft." },
    { id: "fm_alert_keyboard", kind: "alert", if: { a: 90 },
      text: "Ein Hinweis der Haustechnik: Tastaturen sind keine Sportgeräte. Wer heute schon zweimal auf die eigene geschlagen hat, bekommt beim dritten Mal Ersatz aus dem Bestand. Bei der Ersatztastatur klemmt ein Buchstabe. Welcher, ist eine Überraschung." },
    { id: "fm_alert_screensaver", kind: "alert", if: { l: 90 },
      text: "GlobalCorp FM grüßt alle, die gerade sehr beschäftigt aussehen. Die Personalabteilung hat einen Hinweis für Sie: Ein Bildschirmschoner, der aussieht wie eine Tabelle, ist keine Tabelle. Sie hat es selbst ausprobiert und spricht aus Erfahrung." },
];
