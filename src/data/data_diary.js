/**
 * The diary at the end of the day.
 *
 * Until v4.1 these texts lived in engine_core.js, wedged between the
 * conditions that pick them. That kept the pools at three lines each: every
 * new sentence meant editing the engine, and the same three sentences came
 * back every second day.
 *
 * Here a fragment carries its own condition, so writing one is writing data.
 * `when` receives the facts of the day (see engine/engine_diary.js for the
 * full list) and returns whether the fragment fits:
 *
 *     { id: "mood_coffee", when: d => d.ach('ach_coffee'), lines: [...] }
 *
 * Two kinds of slot:
 *
 *   - choice slots (mood, place, rhythm, detail, people, ending, postscript):
 *     of everything that fits, the highest `rank` wins and a draw among equals
 *     decides the rest. Rank is how specific a fragment is - 2 for "this fits
 *     one kind of day", 0 for the fallback that always fits. Order in the file
 *     no longer decides anything, so new fragments go wherever they read best.
 *   - collecting slots (encounters, habits, warnings): every match contributes
 *     one clause; the matching *Intro slot supplies the sentence around them
 *     and receives the joined clauses as {list}.
 *
 * Lines may carry placeholders: {up} {down} for the colleagues who moved most
 * today, {upBy} {downBy} for how far, {tickets} {coffee} {mails} {excuses}
 * {items} {events} {streak} for the day's figures, and {weekday}.
 *
 * One line per fragment is drawn at random. Ids are what the anti-repetition
 * memory remembers, so renaming one makes the game forget it was ever used.
 */
export const diary = {
    // Opening line: the mood of the day. First match wins, so the fallback goes last.
    mood: [
        // Week runs (v5.0): rank 2 so these beat the difficulty-day openings,
        // which would read Montag/Freitag flavour into the wrong weekday.
        {
            id: "mood_week_monday", rank: 2, when: d => d.week && d.weekDay === 1,
            lines: [
                "Montag, und diesmal zählt er nicht für sich allein. Vier weitere warten schon dahinter, ordentlich aufgereiht wie Tickets.",
                "Der erste von fünf. Ich habe heute Morgen kurz überlegt, die Woche als Ganzes krankzumelden. Man kann es ja mal denken.",
                "Wochenstart. Was ich heute liegen lasse, liegt morgen immer noch da — das ist neuerdings wörtlich gemeint."
            ]
        },
        {
            id: "mood_week_friday", rank: 2, when: d => d.week && d.weekDay === 5,
            lines: [
                "Freitag. Vier Tage stecken mir in den Knochen, und alle vier haben etwas dagelassen.",
                "Der letzte Tag der Woche. Ich rieche schon das Wochenende, aber dazwischen steht noch dieser Freitag wie ein Möbelstück im Flur.",
                "Fünfter Tag. Ich zähle nicht mehr, was diese Woche alles passiert ist — der Rucksack erinnert mich von selbst daran."
            ]
        },
        {
            id: "mood_week_mid", rank: 2, when: d => d.week,
            lines: [
                "{weekday}. Die Woche hat einen Rhythmus gefunden, und er ist nicht meiner.",
                "Wieder ein {weekday}, wieder derselbe Schreibtisch, und der Stapel darauf kennt mich inzwischen beim Namen.",
                "{weekday}. Ich merke, wie die Tage aneinanderkleben — was gestern war, ist heute noch nicht vorbei."
            ]
        },
        // Weekday rather than achievement: fits days on which nothing special happened.
        {
            id: "mood_monday", rank: 1, when: d => d.difficulty === 'hard',
            lines: [
                "Montag. Das Wort allein ist schon eine Diagnose.",
                "Ein {weekday}, wie er im Handbuch steht: Die Firma hat das Wochenende überlebt, aber nichts dazugelernt.",
                "Der Wochenanfang hat mich heute abgeholt, ohne vorher zu fragen, ob ich mitwill."
            ]
        },
        {
            id: "mood_friday", rank: 1, when: d => d.difficulty === 'easy',
            lines: [
                "Freitag. Die halbe Firma saß innerlich schon im Auto, die andere Hälfte im Stau.",
                "Ein {weekday}, an dem selbst die Server langsamer laufen, weil es sich sonst nicht lohnt.",
                "Zum Wochenausklang macht der Wahnsinn eine Pause. Nicht lange, aber immerhin."
            ]
        },
        {
            id: "mood_streak", rank: 1, when: d => d.survived && d.streak >= 4,
            lines: [
                "Ich habe aufgehört mitzuzählen, den wievielten Tag am Stück ich das jetzt durchhalte. Das Zählen übernimmt die Firma.",
                "Es läuft seit Tagen erstaunlich glatt. Genau deshalb traue ich dem Frieden nicht."
            ]
        },
        {
            id: "mood_rage", rank: 2, when: d => d.ach('ach_rage'),
            lines: [
                "Heute war ich ein wandelndes Pulverfass. Ein falsches Wort und ich hätte den Router angezündet.",
                "Mein Puls war heute konstant auf 180. Ich habe mehrfach überlegt, einfach den Feueralarm zu drücken.",
                "Wenn Blicke töten könnten, wäre das Großraumbüro heute ein Friedhof geworden."
            ]
        },
        {
            id: "mood_lazy", rank: 2, when: d => d.ach('ach_lazy'),
            lines: [
                "Mein Motto heute: Warum heute arbeiten, wenn man es auch auf unbestimmte Zeit verschieben kann?",
                "Ich habe die Kunst der produktiven Arbeitsvermeidung heute absolut perfektioniert.",
                "Wenn Faulenzen olympisch wäre, hätte ich heute Gold für die Firma geholt."
            ]
        },
        {
            id: "mood_ascetic", rank: 2, when: d => d.ach('ach_ascetic'),
            lines: [
                "Ich habe den Tag ohne einen Tropfen Kaffee überlebt – mein Kopf dröhnt vor Tugendhaftigkeit.",
                "Kein Koffein heute. Ich funktioniere nur noch durch pure Willenskraft und unterdrückte Wut.",
                "Ein völlig entkoffeinierter Tag. Ich fühle mich wie eine leere Hülle, aber mein Blutdruck ist fantastisch."
            ]
        },
        {
            id: "mood_coffee", rank: 2, when: d => d.ach('ach_coffee'),
            lines: [
                "Mein Blut besteht mittlerweile zu 90% aus Koffein. Ich kann Farben schmecken.",
                "Ich zittere am ganzen Körper. Nicht vor Angst, sondern weil ich den halben Kaffeeautomaten geleert habe.",
                "Wenn ich noch einen Espresso trinke, kann ich wahrscheinlich durch die Zeit reisen. Mein Puls ist auf Rekordjagd."
            ]
        },
        {
            id: "mood_workaholic", rank: 2, when: d => d.ach('ach_workaholic'),
            lines: [
                "Ich habe heute tatsächlich so hart gearbeitet, dass ich uns alle schlecht aussehen lasse.",
                "Heute war ich beängstigend produktiv. Ich hoffe, das Management gewöhnt sich nicht daran.",
                "Ein Tag wie ein Maschinengewehr. Tickets gelöst, Probleme gefixt. Ich habe heute quasi die ganze Firma im Alleingang getragen."
            ]
        },
        {
            id: "mood_default", rank: 0, when: () => true,
            lines: [
                "Ein weiterer Tag im alltäglichen Corporate-Wahnsinn neigt sich dem Ende.",
                "Wieder acht Stunden meines Lebens, die mir niemand zurückgeben wird.",
                "Die Neonröhren surren, der Kaffee war kalt, der Wahnsinn hatte Methode."
            ]
        }
    ],
    // Where the day was spent. Follows the opening in the same paragraph.
    place: [
        {
            id: "place_quiet", rank: 1, when: d => d.events <= 12,
            lines: [
                "So übersichtlich war es lange nicht. Ich habe zwischendurch die Ablage sortiert, freiwillig.",
                "Der Laden lief heute fast ohne mich. Ein Gefühl zwischen Erleichterung und Kränkung."
            ]
        },
        {
            id: "place_full", rank: 1, when: d => d.events >= 30,
            lines: [
                "Ich war heute überall und nirgends: Serverraum, Flur, Telefon, und wieder von vorn.",
                "Mein Stuhl und ich haben uns heute hauptsächlich vom Hörensagen gekannt."
            ]
        },
        {
            id: "place_corridors", rank: 2, when: d => d.quests > d.server && d.quests > d.calls,
            lines: [
                "Anstatt mich um echte Probleme zu kümmern, bin ich lieber ziellos durch die Flure gegeistert.",
                "Meine Hauptaufgabe bestand heute scheinbar darin, seltsame Büro-Dramen abseits meines Schreibtisches zu lösen.",
                "Ich war heute öfter auf 'Dienstgang' unterwegs als am eigenen Platz."
            ]
        },
        {
            id: "place_server", rank: 2, when: d => d.server > d.calls + 2,
            lines: [
                "Um den nervigen Menschen aus dem Weg zu gehen, habe ich mich größtenteils im dunklen Serverraum verschanzt.",
                "Die lauten Lüfter im Serverraum waren heute meine einzige, echte Gesellschaft.",
                "Ich habe heute fast schon eine emotionale Bindung zu den blinkenden Racks im Keller aufgebaut."
            ]
        },
        {
            id: "place_phone", rank: 2, when: d => d.calls > d.server + 3,
            lines: [
                "Gefühlt klebte mir das Telefon pausenlos am Ohr. Die User haben mir den letzten Nerv geraubt.",
                "Ich habe heute mehr Support-Gespräche geführt als eine vollbesetzte Call-Center-Schicht.",
                "Das ständige Klingeln des Telefons wird mich vermutlich noch bis in meine Träume verfolgen."
            ]
        },
        {
            id: "place_mixed", rank: 0, when: () => true,
            lines: [
                "Zwischen piepsenden Servern und panischen Anrufen habe ich irgendwie versucht, den Betrieb am Laufen zu halten.",
                "Ein chaotischer Mix aus Hardware-Ausfällen und menschlicher Inkompetenz hielt mich heute auf Trab.",
                "Ich bin von Brandherd zu Brandherd gerannt, ohne jemals wirklich etwas zu löschen."
            ]
        }
    ],
    // Collecting slot: every match contributes a clause, joined into one sentence.
    encounters: [
        {
            id: "enc_mentor", when: d => d.ach('ach_mentor'),
            lines: [
                "ich Azubi Kevin vor dem totalen IT-Kollaps bewahrt habe",
                "ich Kevins Haut gerettet habe",
                "Kevin mir nun auf ewig etwas schuldig ist"
            ]
        },
        {
            id: "enc_ally", when: d => d.ach('ach_ally'),
            lines: [
                "ich eine unheilige Allianz mit Chantal aus dem Marketing geschmiedet habe",
                "Chantal und ich jetzt ein tödliches Team sind",
                "das Marketing nun in meiner Schuld steht"
            ]
        },
        {
            id: "enc_rockstar", when: d => d.ach('ach_rockstar'),
            lines: [
                "mir Gabi ihr feinstes Death-Metal-Mixtape anvertraut hat",
                "ich mit Gabi musikalisch voll auf einer Wellenlänge war",
                "Gabi und ich den Empfang gerockt haben"
            ]
        },
        {
            id: "enc_cat_whisperer", when: d => d.ach('ach_cat_whisperer'),
            lines: [
                "ich das Katzenproblem der Buchhaltung gelöst habe",
                "ich zum offiziellen Katzenflüsterer von Frau Elster wurde",
                "Frau Elsters Kater Rüdiger und ich jetzt quasi Best Friends sind"
            ]
        },
        {
            id: "enc_keymaster", when: d => d.ach('ach_keymaster'),
            lines: [
                "mir Hausmeister Egon seinen Generalschlüssel überlassen hat",
                "ich dank Egon nun theoretisch überall reinpasse",
                "ich jetzt dank Egons Schlüssel die wahre Macht im Gebäude habe"
            ]
        },
        {
            id: "enc_closer", when: d => d.ach('ach_closer'),
            lines: [
                "ich mit Markus aus dem Sales einen extrem wichtigen Deal gerettet habe",
                "ich dem Vertrieb buchstäblich den Hintern gerettet habe",
                "Markus ohne mich heute seinen fetten Bonus verloren hätte"
            ]
        },
        {
            id: "enc_wolf", when: d => d.ach('ach_wolf'),
            lines: [
                "ich dem Chef einen neuen Arbeitsvertrag aus den Rippen geleiert habe",
                "ich gehaltstechnisch endlich aufgestiegen bin",
                "ich den Chef in der Gehaltsverhandlung absolut dominiert habe"
            ]
        },
        {
            id: "enc_hacker", when: d => d.ach('ach_hacker'),
            lines: [
                "ich mir illegale Admin-Rechte im System verschafft habe",
                "ich mich unbemerkt ins Root-Verzeichnis gehackt habe",
                "ich dank Root-Passwort jetzt der absolute Gott im Netzwerk bin"
            ]
        },
        {
            id: "enc_rich", when: d => d.ach('ach_rich'),
            lines: [
                "ich dem nigerianischen Prinzen mein Vertrauen geschenkt habe",
                "ich unfassbar reich werde (falls der Scam echt ist)",
                "ich bald Millionen auf dem Konto habe (hoffentlich)"
            ]
        },
        {
            id: "enc_chronicles", when: d => d.item('corp_chronicles'),
            lines: [
                "ich die verbotene Firmenchronik studiert habe",
                "ich finstere Wahrheiten in einem alten Buch entdeckt habe",
                "ich die düsteren Geheimnisse des Gründers in der Chronik gelesen habe"
            ]
        },
        {
            id: "enc_prince_letter", when: d => d.item('prince_letter'),
            lines: [
                "ich diesen absurden Prinzen-Brief mit mir herumschleppe",
                "ich heute königliche Post erhalten habe",
                "mir ein echter Brief von einem Prinzen in die Hände gefallen ist"
            ]
        }
    ],
    // The sentence the encounter clauses are dropped into. {list} is the joined clauses.
    encountersIntro: [
        {
            id: "enc_intro", when: () => true,
            lines: [
                "Besonders denkwürdig war heute, dass {list}.",
                "Wenn ich auf den Tag zurückblicke, sticht besonders hervor, dass {list}.",
                "Man wird sich wohl noch lange daran erinnern, dass {list}."
            ]
        }
    ],
    // Collecting slot: how the day was worked.
    habits: [
        {
            id: "habit_ignore", when: d => d.ach('ach_ignore'),
            lines: [
                "die Entf-Taste bei E-Mails mein absoluter bester Freund war",
                "ich das Ignorieren von Mails zur Kunst erhoben habe",
                "ich heute einen Rekord im Löschen ungelesener E-Mails aufgestellt habe"
            ]
        },
        {
            id: "habit_hoarder", when: d => d.ach('ach_hoarder'),
            lines: [
                "ich meinen Rucksack mit absolutem Müll vollgestopft habe",
                "ich heute alles eingesteckt habe, was nicht niet- und nagelfest war",
                "ich wie ein echter Loot-Goblin jeden Schrott im Büro gesammelt habe"
            ]
        },
        {
            id: "habit_macgyver", when: d => d.ach('ach_macgyver'),
            lines: [
                "ich mich mit Tape und Kabelbindern wie MacGyver gefühlt habe",
                "ich IT-Probleme mit reiner Bastel-Energie gelöst habe",
                "ich bewiesen habe, dass man mit Panzertape einfach alles reparieren kann"
            ]
        },
        {
            id: "habit_clean", when: d => d.ach('ach_clean'),
            lines: [
                "ich tatsächlich 'Inbox Zero' erreicht habe (ein Wunder!)",
                "mein Ticket-System am Ende völlig leer war",
                "ich jedes verdammte Ticket abgearbeitet habe"
            ]
        }
    ],
    // Reads differently depending on whether encounters came before it.
    habitsIntro: [
        {
            id: "habit_intro_more", when: d => d.hasEncounters,
            lines: [
                "Ansonsten bestand heute hauptsächlich daraus, dass {list}.",
                "Darüber hinaus bestand heute hauptsächlich daraus, dass {list}.",
                "Zu guter Letzt bestand heute hauptsächlich daraus, dass {list}."
            ]
        },
        {
            id: "habit_intro_alone", when: () => true,
            lines: [
                "Meine Strategie bestand heute hauptsächlich daraus, dass {list}.",
                "Mein grundlegender Ansatz bestand heute hauptsächlich daraus, dass {list}."
            ]
        }
    ],
    // Collecting slot: the valve and the written warning, both of which happened today.
    warnings: [
        {
            id: "warn_rage", when: d => d.rageWarned && !d.week,
            lines: [
                "ich zwischendurch einen halben Nervenzusammenbruch in der Besenkammer hatte",
                "ich heute schon einmal kurz davor war, komplett die Kontrolle zu verlieren",
                "ich meine Wut heute bereits an harmlosem Büromaterial auslassen musste"
            ]
        },
        {
            id: "warn_chef", when: d => d.chefWarned && !d.week,
            lines: [
                "der Chef mir heute bereits mit dem Rauswurf gedroht hat",
                "ich nur haarscharf an einer fristlosen Kündigung vorbeigeschrammt bin",
                "ich heute schon eine hochoffizielle und sehr laute Abmahnung kassiert habe"
            ]
        },
        {
            id: "warn_week_valve", when: d => d.week && d.rageWarned,
            lines: [
                "mein Ventil für diese Woche bereits verbraucht ist — der nächste Ausraster zählt",
                "ich diese Woche schon einmal Dampf ablassen musste und das Kontingent damit aufgebraucht ist"
            ]
        },
        {
            id: "warn_week_chef", when: d => d.week && d.chefWarned,
            lines: [
                "die Abmahnung dieser Woche schon in meiner Akte liegt — die nächste wäre die letzte",
                "der Chef sein Pulver für diese Woche verschossen hat, ich meins allerdings auch"
            ]
        }
    ],
    // Same principle as habitsIntro.
    warningsIntro: [
        {
            id: "warn_intro_more", when: d => d.hasEncounters || d.hasHabits,
            lines: [
                "Ach ja, und erwähnenswert ist auch, dass {list}.",
                "Fast vergessen: Dazu kommt, dass {list}.",
                "Zu allem Überfluss sei noch gesagt, dass {list}."
            ]
        },
        {
            id: "warn_intro_alone", when: () => true,
            lines: [
                "Besonders heikel war heute, dass {list}.",
                "Ein absoluter Tiefpunkt war, dass {list}."
            ]
        }
    ],
    // The closing line. {party} carries the text the gala finale brings along.
    ending: [
        {
            id: "end_week_won", rank: 2, when: d => d.week && d.weekDay === 5 && d.survived,
            lines: [
                "Fünf Tage. Ich habe alle fünf gesehen, von innen, in voller Länge. Jetzt gehört das Wochenende mir, und zwar verdient.",
                "Freitag, Feierabend, Woche komplett. Ich schließe ab, und zum ersten Mal seit Montag schließt nichts hinter mir auf.",
                "Die Woche ist durch. Ich lasse den Stuhl angelehnt, das Licht aus und die Firma einfach Firma sein. Bis Montag ist das nicht mein Problem."
            ]
        },
        {
            id: "end_week_thursday", rank: 3, when: d => d.week && d.weekDay === 4 && d.end === 'WIN',
            lines: [
                "Donnerstag geschafft. Nur noch der Freitag — das klingt nach wenig und ist erfahrungsgemäß am meisten.",
                "Ein Tag noch. Ich gehe schlafen wie ein Läufer auf der Zielgeraden: zu müde für Freude, zu nah dran zum Aufgeben."
            ]
        },
        {
            id: "end_week_night", rank: 2, when: d => d.week && d.weekDay < 5 && d.end === 'WIN',
            lines: [
                "Feierabend, aber nicht Schluss: {restdays} Tage stehen noch aus. Der Rechner geht aus, die Liste nicht.",
                "Tag abgehakt, Woche nicht. Ich nehme mit nach Hause, was der Tag übrig gelassen hat, und morgen früh verteilt es sich wieder auf dem Schreibtisch.",
                "Geschafft für heute. Morgen ist wieder so ein Tag, und übermorgen auch — das ist diesmal keine Redensart, sondern der Spielstand."
            ]
        },
        {
            id: "end_win_late", rank: 1, when: d => d.end === 'WIN' && d.endHour >= 16 && d.tickets <= 1,
            lines: [
                "Halb fünf, die Liste fast leer, Licht aus. Das kommt so selten vor, dass ich im Türrahmen kurz stehen geblieben bin.",
                "Ein sauberer Feierabend mit sauberer Warteschlange. Ich werde morgen niemandem davon erzählen, es würde nur Erwartungen wecken."
            ]
        },
        {
            id: "end_win_close", rank: 1, when: d => d.end === 'WIN' && d.peakValue >= 85,
            lines: [
                "Bis Feierabend geschafft, aber es war knapp. Wie knapp, behalte ich für mich.",
                "Der Tag ist an mir vorbeigeschrammt, nicht andersherum. Ich nehme das Ergebnis trotzdem."
            ]
        },
        {
            id: "end_win_more", rank: 0, when: d => d.end === 'WIN',
            lines: [
                "Der Rechner ist aus, die Tür fällt zu, der Rest ist morgen. So einfach ist das an guten Tagen.",
                "Ich habe die Tastatur gerade gerückt, das Licht gelöscht und bin gegangen, bevor noch jemand eine Idee hat.",
                "Feierabend. Kein Applaus, kein Abspann, nur der Aufzug, der schon wieder woanders ist."
            ]
        },
        {
            id: "end_rage_more", rank: 0, when: d => d.end === 'RAGE',
            lines: [
                "Am Ende habe ich alles gesagt, was ich seit Monaten denke. Leider laut und leider vollständig.",
                "Es war nicht der große Knall. Es war der letzte kleine, und der reichte."
            ]
        },
        {
            id: "end_tickets_more", rank: 0, when: d => d.end === 'TICKETS',
            lines: [
                "Die Warteschlange hat gewonnen. Sie gewinnt am Ende immer, heute nur schneller als sonst.",
                "Irgendwann tippt man nur noch, ohne zu lesen. Danach dauert es nicht mehr lange."
            ]
        },
        {
            id: "end_fired_more", rank: 0, when: d => d.end === 'FIRED',
            lines: [
                "Der Karton stand schon bereit, als ich zurückkam. Effizient waren sie hier immer nur bei den falschen Dingen.",
                "Mein Zugang war gesperrt, bevor ich am Aufzug ankam. Das war die schnellste Reaktion der IT seit Jahren, und sie kam von mir."
            ]
        },
        {
            id: "end_rage", when: d => d.end === 'RAGE',
            lines: [
                "Das bittere Ende vom Lied? Mir ist die Sicherung durchgebrannt. Ein fliegender Monitor ist schließlich auch eine Form von fristloser Kündigung!",
                "Irgendwann war das Maß voll. Ich habe getobt, geschrien und bin gegangen. Ein glorreicher Abgang, den hier so schnell niemand vergisst.",
                "Ich habe komplett die Kontrolle verloren. Es fühlt sich großartig an, auch wenn ich morgen wohl arbeitslos bin."
            ]
        },
        {
            id: "end_tickets", when: d => d.end === 'TICKETS',
            lines: [
                "Schlussendlich hat mich die Ticket-Lawine komplett unter sich begraben. Das System ist restlos kollabiert – und ich bin meinen Job los.",
                "Die Flut an Anfragen war nicht mehr zu stoppen. Ich habe kapituliert. Morgen sitze ich wohl auf der Straße.",
                "Das Ticket-Limit wurde gesprengt. Der Chef hat persönlich den Stecker gezogen. Ende der Vorstellung."
            ]
        },
        {
            id: "end_fired", when: d => d.end === 'FIRED',
            lines: [
                "Dass der Sicherheitsdienst mich am Ende persönlich rauseskortiert hat, ist der perfekte Schlusspunkt für dieses Trauerspiel.",
                "Der Chef hat ernst gemacht. Meine Sachen sind gepackt, meine Karriere hier ist offiziell und endgültig beendet.",
                "Ein kalter Blick, ein kurzes Wort von HR, und das war's. Ich bin gefeuert. Wenigstens muss ich diesen Teppichboden nie wieder sehen."
            ]
        },
        {
            id: "end_win", when: d => d.end === 'WIN',
            lines: [
                "Irgendwie habe ich es lebend bis 16:30 Uhr geschafft. Feierabend. Morgen geht der ganze Zirkus wieder von vorne los...",
                "Die Uhr springt auf Feierabend. Ich klappe den Laptop zu und flüchte. Ein weiterer Tag in der IT-Hölle wurde erfolgreich überlebt.",
                "Überlebt. Erschöpft, aber lebendig. Ich brauche jetzt dringend etwas, das weitaus stärker ist als Kaffee."
            ]
        },
        {
            id: "end_party", when: d => d.end === 'PARTY',
            lines: [
                "Dann kam 16:30 Uhr und die ominöse Synergy-Gala. {party}"
            ]
        }
    ],
    // Marginal note, only on days that were survived. Nothing else writes here yet.
    postscript: [
        {
            id: "post_week_baggage", rank: 1, when: d => d.week && d.survived && d.weekDay < 5 && d.tickets > 0,
            lines: [
                "Nachtrag: {tickets} Tickets nehme ich mit ins Bett. Nicht wörtlich, aber sie werden trotzdem da sein, wenn ich aufwache.",
                "Nachtrag: Die Warteschlange schläft nicht, sie wartet nur. {tickets} Stück stehen morgen früh wieder stramm.",
                "Nachtrag: Ich habe die offenen Tickets nicht erledigt, ich habe sie vertagt. Das Wort macht einen Unterschied, das Gefühl nicht."
            ]
        },
        {
            id: "post_week_clean", rank: 1, when: d => d.week && d.survived && d.weekDay < 5 && d.tickets === 0,
            lines: [
                "Nachtrag: Warteschlange leer. Morgen fange ich bei null an — im Wortsinn, und das kommt in dieser Woche einem Urlaub am nächsten.",
                "Nachtrag: Kein einziges Ticket bleibt über Nacht offen. Ich habe das Gefühl, das System plant bereits eine Gegenmaßnahme."
            ]
        },
        {
            id: "blind_hard", rank: 2, when: d => d.survived && d.blind && d.difficulty === 'hard',
            lines: [
                "Nachtrag: Ich habe den ganzen Montag über keine einzige Zahl gesehen. Keine Prozente, keine Ticketstände, nichts. Nur Gesichter, Tonfall und das Geräusch, das die Kaffeemaschine macht, wenn es zu spät ist. Ich habe ihn trotzdem überstanden. Ich weiß bis jetzt nicht, wie knapp es war, und ich will es auch nicht wissen.",
                "Nachtrag: Montag, blind. Ich habe den Tag gelesen wie ein Seemann das Wetter — an der Art, wie Gabi 'guten Morgen' sagt, daran, wie lange Markus in der Tür stehen bleibt, daran, ob die Tür vom Chef offen war. Es hat funktioniert. Ich bin selbst am meisten überrascht.",
                "Nachtrag: Kein einziger Balken, kein einziger Zähler, und dann auch noch ein Montag. Irgendwann hört man auf zu rechnen und fängt an zu spüren, wie der Laden steht. Das ist entweder Erfahrung oder die erste Stufe des Wahnsinns. Vermutlich beides."
            ]
        },
        {
            id: "blind_easy", rank: 2, when: d => d.survived && d.blind && d.difficulty === 'easy',
            lines: [
                "Nachtrag: Ich habe heute alle Anzeigen ausgeblendet. Kein Prozentwert, kein Ticketstand. An einem Freitag ist das kein Kunststück, aber es war erstaunlich ruhig im Kopf, wenn niemand einem ständig vorrechnet, wie es um einen steht.",
                "Nachtrag: Der ganze Tag ohne Zahlen. Man merkt schnell, dass die Kollegen die ehrlicheren Messgeräte sind — die Zahlen sagen einem nur, wie schlimm es ist, die Kollegen sagen einem, warum."
            ]
        },
        {
            id: "blind_normal", rank: 2, when: d => d.survived && d.blind,
            lines: [
                "Nachtrag: Heute habe ich sämtliche Anzeigen abgeschaltet und den Tag nach Gefühl gearbeitet. Keine Prozente, keine offenen Zähler, nur der Laden und ich. Rückblickend die klarste Sicht, die ich seit Monaten hatte.",
                "Nachtrag: Ein ganzer Arbeitstag ohne eine einzige Kennzahl. Kein Dashboard, kein Zähler, kein Balken, der langsam rot wird. Nur Menschen, Geräusche und Erfahrung. Man sollte das öfter machen. Man wird es nicht öfter machen.",
                "Nachtrag: Blind gearbeitet, von acht bis Feierabend. Als jemand mittags fragte, wie es denn stehe, konnte ich zum ersten Mal ehrlich antworten: keine Ahnung. Und es war trotzdem in Ordnung."
            ]
        }
    ],

    // How the day ran - shape of the curve, not its result.
    rhythm: [
        {
            id: "rhythm_calm", rank: 2, when: d => d.calm && d.survived,
            lines: [
                "Der Tag lief so ruhig, dass ich zwischendurch geprüft habe, ob das Telefon überhaupt noch angeschlossen ist.",
                "Kein Balken hat sich heute ernsthaft in Richtung Rot bewegt. Verdächtig.",
                "Ein Arbeitstag ohne Zwischenfall. Ich habe ihn zweimal daraufhin abgeklopft und keinen gefunden."
            ]
        },
        {
            id: "rhythm_late_peak", rank: 2, when: d => d.peakHour >= 14 && d.peakValue >= 60,
            lines: [
                "Bis zum Mittag hatte ich alles im Griff. Was danach kam, hatte mit dem Vormittag nichts mehr zu tun.",
                "Der Vormittag war Kulisse. Die eigentliche Vorstellung begann irgendwann nach zwei.",
                "Am frühen Nachmittag ist der Tag gekippt, und zwar in einem einzigen Zug."
            ]
        },
        {
            id: "rhythm_early_peak", rank: 2, when: d => d.peakHour <= 10 && d.peakValue >= 60,
            lines: [
                "Vor neun war schon alles gesagt. Der Rest war Aufräumen.",
                "Der Tag hat direkt nach dem ersten Kaffee sein Pulver verschossen. Danach ging es bergab, ausnahmsweise im guten Sinne.",
                "Kaum saß ich, brannte es. Um elf war der Höhepunkt vorbei, und ehrlich gesagt ich auch."
            ]
        },
        {
            id: "rhythm_boss", rank: 1, when: d => d.boss >= 2,
            lines: [
                "Zweimal stand heute alles auf der Kippe, und zweimal hat es gereicht. Die Statistik nennt so etwas Erfahrung.",
                "Der Tag hatte mehrere Momente, in denen die Uhr wichtiger war als der Verstand."
            ]
        },
        {
            id: "rhythm_grind", rank: 1, when: d => d.events >= 30,
            lines: [
                "Ich habe heute mehr erledigt als in mancher ganzen Woche und könnte trotzdem nicht sagen, was davon gewirkt hat.",
                "Ein Tag im Akkord. Rückblickend verschwimmen die Vorgänge zu einem einzigen langen Vorgang.",
                "So viele Kleinigkeiten, dass am Abend keine davon einzeln erinnerbar ist."
            ]
        },
        {
            id: "rhythm_short", rank: 1, when: d => !d.survived && d.events <= 12,
            lines: [
                "Der Tag war kurz. Nicht, weil wenig los war, sondern weil er vorzeitig endete.",
                "Für einen abgebrochenen Arbeitstag war erstaunlich viel Schaden möglich."
            ]
        },
        {
            id: "rhythm_default", rank: 0, when: () => true,
            lines: [
                "Der Tag hatte seine Wellen: erst Ruhe, dann Betrieb, dann wieder Ruhe, und irgendwo dazwischen ich.",
                "Von außen betrachtet ein ganz gewöhnlicher Arbeitstag. Von innen betrachtet ebenfalls, und genau das ist das Problem.",
                "Ein Tag ohne Höhepunkte, dafür mit Tiefen, die niemand protokolliert hat."
            ]
        },
    ],

    // One concrete figure from the day. A choice slot on purpose: three
    // numbers in a row would read like a report, not like a diary.
    detail: [
        // The concrete figures of the day. Exactly one of them makes the entry.
        {
            id: "detail_coffee_many", rank: 2, when: d => d.coffee >= 4,
            lines: [
                "Kaffeebilanz: {coffee} Tassen. Der Automat kennt mich inzwischen besser als die Personalabteilung.",
                "Nach der {coffee}. Tasse habe ich das Zittern in den Fingern als Grundrauschen akzeptiert.",
                "Ich habe heute so viel Kaffee getrunken, dass ich meinen eigenen Puls hören kann."
            ]
        },
        {
            id: "detail_coffee_none", rank: 2, when: d => d.coffee === 0 && d.events >= 8,
            lines: [
                "Keine einzige Tasse heute. Ich habe die Küche gemieden wie das Reh die Landstraße.",
                "Null Kaffee. Ich weiß bis jetzt nicht, ob das Disziplin war oder schlicht keine Gelegenheit."
            ]
        },
        {
            id: "detail_tickets_high", rank: 2, when: d => d.tickets >= 7,
            lines: [
                "Am Ende standen {tickets} Tickets offen. Sie werden morgen noch da sein, treu wie sonst nichts in dieser Firma.",
                "Die Warteschlange stand zuletzt bei {tickets}. Das ist kein Rückstand mehr, das ist ein Bestand."
            ]
        },
        {
            id: "detail_tickets_zero", rank: 2, when: d => d.tickets === 0 && d.survived,
            lines: [
                "Keine offenen Tickets. Ich habe die Ansicht dreimal neu geladen, weil ich es nicht glauben wollte.",
                "Die Liste war am Abend leer. So etwas passiert vielleicht zweimal im Jahr, und niemand ist da, der es bezeugt."
            ]
        },
        {
            id: "detail_mails", rank: 2, when: d => d.mailsIgnored >= 3,
            lines: [
                "{mails} Mails habe ich ungelesen entsorgt. Keine davon hat mir bisher gefehlt.",
                "Mein Postfach hat heute {mails} Nachrichten verloren und ich darüber keine Sekunde Schlaf."
            ]
        },
        {
            id: "detail_boss", rank: 2, when: d => d.boss >= 1,
            lines: [
                "Einmal stand der Laden kurz vor dem Stillstand. Es hat gereicht, aber nur, weil ich schneller war als die Uhr.",
                "Es gab diesen einen Moment, in dem alles gleichzeitig blinkte. Ich habe ihn überlebt und will nicht darüber reden."
            ]
        },
        {
            id: "detail_excuses", rank: 1, when: d => d.excusesUsed >= 1,
            lines: [
                "Ich habe mich heute {excuses}-mal aus einer Sache herausgeredet. Jede Ausrede war schlechter als die vorige und hat trotzdem gewirkt.",
                "Einmal mehr hat mich eine erfundene Dringlichkeit gerettet. Ich sollte mir die Formulierungen notieren."
            ]
        },
        {
            id: "detail_lunch", rank: 1, when: d => d.lunch,
            lines: [
                "Immerhin Mittag gemacht. Zwanzig Minuten, in denen niemand etwas von mir wollte, sind hier eine Währung.",
                "Die Mittagspause war der einzige Termin heute, den ich freiwillig wahrgenommen habe."
            ]
        },
        {
            id: "detail_items", rank: 1, when: d => d.items >= 5,
            lines: [
                "Der Rucksack ist am Abend schwerer als am Morgen. Nichts davon gehört mir, und niemand wird danach fragen."
            ]
        },
        {
            id: "detail_leet", rank: 1, when: d => d.leet,
            lines: [
                "Um 13:37 Uhr habe ich auf die Uhr gesehen und mich anschließend darüber geärgert, dass es mir aufgefallen ist."
            ]
        },
        {
            id: "detail_streak", rank: 1, when: d => d.survived && d.streak >= 3,
            lines: [
                "{streak} Tage am Stück überstanden. Meine Erwartungen an mich selbst sinken erfreulich schnell."
            ]
        },
    ],

    // The colleagues, measured against this morning rather than against zero.
    //
    // KNOWN THIN SPOT: people_both, detail_items, detail_leet and detail_streak
    // carry two lines or one. The memory in engine_diary.js can only skip a
    // line while another one is left, so on two days with the same constellation
    // these do repeat. Three lines per fragment is the number that makes the
    // skipping work; whoever picks this up next should write the missing ones
    // rather than add more fragments.
    people: [
        // Who moved today - reputation against where it stood this morning.
        {
            id: "people_both", rank: 3, when: d => d.upBy >= 5 && d.downBy >= 5,
            lines: [
                "Unterm Strich: {up} mag mich heute mehr, {down} deutlich weniger. In dieser Firma ist das vermutlich ein Nullsummenspiel.",
                "Ich habe heute bei {up} gewonnen und bei {down} verloren. Die Bilanz zieht ohnehin jemand anderes."
            ]
        },
        {
            id: "people_up_strong", rank: 2, when: d => d.upBy >= 15,
            lines: [
                "{up} hat heute die Seite gewechselt, und zwar auf meine. Ich sollte das nutzen, solange es hält.",
                "Bei {up} habe ich {upBy} Punkte gutgemacht. So etwas hält erfahrungsgemäß bis zur nächsten Störung."
            ]
        },
        {
            id: "people_down_strong", rank: 2, when: d => d.downBy >= 15,
            lines: [
                "{down} spricht seit heute Nachmittag nur noch das Nötigste mit mir. Verdient, aber unangenehm.",
                "Bei {down} habe ich an einem einzigen Tag verspielt, was ich mir über Wochen aufgebaut hatte."
            ]
        },
        {
            id: "people_up", rank: 1, when: d => d.upBy >= 5,
            lines: [
                "{up} war heute auffällig freundlich. Entweder habe ich etwas richtig gemacht, oder es kommt noch eine Bitte.",
                "Immerhin {up} scheint mit dem Tag zufrieden zu sein. Einer von uns beiden also."
            ]
        },
        {
            id: "people_down", rank: 1, when: d => d.downBy >= 5,
            lines: [
                "{down} hat mich heute anders angesehen als gestern, und nicht zum Besseren.",
                "Bei {down} steht seit heute etwas offen, das sich mit Arbeit nicht begleichen lässt."
            ]
        },
        {
            id: "people_quiet", rank: 0, when: d => d.upBy < 5 && d.downBy < 5 && d.events >= 10,
            lines: [
                "Zwischenmenschlich ist heute nichts passiert. Für einen Sysadmin ist das der Idealzustand.",
                "Niemand mag mich heute mehr oder weniger als gestern. Ich werte das als Erfolg."
            ]
        },
    ],
};
