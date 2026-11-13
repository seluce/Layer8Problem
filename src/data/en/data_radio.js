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

    // --- Traffic: the building as a road network ---
    { id: "fm_traffic_lift_b", kind: "traffic",
      text: "GlobalCorp FM, der Verkehrsfunk. Aufzug B steht zwischen dem dritten und dem vierten Stock. Egon ist informiert und sieht nach seiner Pause nach. Bitte weichen Sie auf das Treppenhaus Ost aus. Das Treppenhaus Ost ist heute wegen einer Brandschutzübung gesperrt." },
    { id: "fm_traffic_corridor", kind: "traffic",
      text: "Der Verkehrsfunk mit einer Behinderung vor dem Vertrieb: Dort steht ein Rollcontainer quer im Flur, Herkunft unbekannt. Egon hat ihn mit Absperrband gesichert und den Flur gleich mit. Bitte umgehen Sie den Vertrieb weiträumig. Der Vertrieb kommt ohnehin zu Ihnen." },

    // --- Weather, indoors ---
    // fm_weather_blue: the colour-blind electrician's note ('BLAU heizt', see
    // GLOSSAR 2). The mapping is never swapped - blue heats.
    { id: "fm_weather_server", kind: "weather",
      text: "Das Wetter auf GlobalCorp FM. Im Serverraum weiterhin tropisch, am Nachmittag vereinzelte Lüfterausfälle. In der Buchhaltung Bodenfrost am Kühlschrank, Frau Elster bittet, die Tür nicht länger als nötig offen zu halten. Im Vertrieb heiter bis wolkig, je nach Quartalszahl." },
    { id: "fm_weather_blue", kind: "weather",
      text: "Das Raumklima, präsentiert von der Haustechnik. Im Ostflügel ist es seit heute früh warm, sehr warm, weil jemand den Regler auf Blau gestellt hat. Zur Erinnerung: Blau heizt. Wer es kühler haben möchte, öffnet bitte ein Fenster. Die Fenster im Ostflügel öffnen sich nicht." },

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

    // --- Announcements: HR, facilities, marketing ---
    // fm_notice_basement: the basement code (0000, GLOSSAR 1) without saying it.
    // fm_notice_password: Puschel123 (GLOSSAR 1) without saying it.
    { id: "fm_notice_basement", kind: "notice",
      text: "Eine Mitteilung der Haustechnik. Egon lässt ausrichten, dass der Keller ab sofort wieder abgeschlossen ist und der Code sich nicht geändert hat. Welcher Code das ist, sagt er nicht. Egon spricht grundsätzlich nicht in Mikrofone." },
    { id: "fm_notice_password", kind: "notice",
      text: "Ein Sicherheitshinweis auf GlobalCorp FM. Bitte wählen Sie sichere Passwörter. Der Name Ihres Haustiers mit eins, zwei, drei dahinter gilt nicht als sicher, auch wenn das Haustier sehr flauschig ist. Die IT kennt inzwischen alle Haustiere im Haus." },
    { id: "fm_notice_feelgood", kind: "notice",
      text: "Eine Durchsage aus dem Marketing. Chantal lädt zur Feel-Good-Runde in den großen Besprechungsraum, Thema: Achtsamkeit im Mindset. Es gibt Obst. Das Obst ist ein Apfel, und der Apfel ist für Chantal." },

    // --- Advertising for the company's own services ---
    { id: "fm_ad_tickets", kind: "ad",
      text: "Kennen Sie schon das Ticketsystem von GlobalCorp? Ein Problem, ein Ticket, eine Nummer. Und dann Geduld. Das Ticketsystem merkt sich alles, damit Sie es nicht müssen. Eine Werbung der IT-Abteilung. Die IT-Abteilung wusste nichts davon." },
    { id: "fm_ad_printer", kind: "ad",
      text: "Drucken bei GlobalCorp: Die Druckerstraße im ersten Stock druckt schwarz-weiß, in Farbe und gelegentlich auf Wunsch. Toner gibt es bei Frau Elster gegen Beleg. Den Beleg druckt die Druckerstraße. GlobalCorp FM empfiehlt den Bleistift." },
    { id: "fm_ad_intranet", kind: "ad",
      text: "Das Intranet von GlobalCorp: Speiseplan, Organigramm und die Vision des Vorstands, alles an einem Ort. Das Passwort finden Sie ebenfalls im Intranet. GlobalCorp FM, wir verbinden Menschen." },

    // --- From the top floor ---
    { id: "fm_board_tunnel", kind: "board",
      text: "Und jetzt ein Gruß aus der Chefetage. Dr. Wichtig denkt an alle, die gerade zuhören, und ganz besonders an alle, die dabei eigentlich arbeiten sollten. Er wollte das persönlich sagen, die Verbindung ist aber im Tunnel abgebrochen. Er ruft gleich noch mal an." },
    // Not 'Mitarbeiter des Monats': the intranet dashboard names one of
    // those, and the radio must not contradict it.
    { id: "fm_staff_printer", kind: "staff",
      text: "GlobalCorp FM gratuliert zum Gerät des Monats. Die Wahl fiel auf den Drucker im zweiten Stock: vier Wochen ohne Papierstau, ohne Beschwerde und ohne einen Tag Urlaub. Die Urkunde hängt gleich neben ihm. Er hat sie selbst gedruckt." },

    // --- The afternoon, towards clocking off ---
    { id: "fm_countdown_screens", kind: "countdown", when: [900, 990],
      text: "GlobalCorp FM am Nachmittag. Die Personalabteilung erinnert daran, dass der Feierabend kein Recht ist, sondern eine Gelegenheit. Bitte schalten Sie Ihren Bildschirm nicht vor Dienstschluss aus. Auch nicht ein kleines bisschen dunkler." },
    { id: "fm_countdown_coats", kind: "countdown", when: [930, 990],
      text: "Die letzte Stunde auf GlobalCorp FM. In den Fluren werden die ersten Jacken angezogen und im Vertrieb die ersten Mails mit 'Bis morgen!' vorgeschrieben. Markus hat seinen Rechner schon heruntergefahren und spielt Solitär auf dem Telefon." },
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
];
