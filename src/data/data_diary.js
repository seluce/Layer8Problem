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
 *   - choice slots (mood, place, ending, postscript): the FIRST fragment whose
 *     condition holds wins, so order matters and the fallback goes last.
 *   - collecting slots (encounters, habits, warnings): every match contributes
 *     one clause; the matching *Intro slot supplies the sentence around them
 *     and receives the joined clauses as {list}.
 *
 * One line per fragment is drawn at random. Ids are what the anti-repetition
 * memory remembers, so renaming one makes the game forget it was ever used.
 */
export const diary = {
    // Opening line: the mood of the day. First match wins, so the fallback goes last.
    mood: [
        {
            id: "mood_rage", when: d => d.ach('ach_rage'),
            lines: [
                "Heute war ich ein wandelndes Pulverfass. Ein falsches Wort und ich hätte den Router angezündet.",
                "Mein Puls war heute konstant auf 180. Ich habe mehrfach überlegt, einfach den Feueralarm zu drücken.",
                "Wenn Blicke töten könnten, wäre das Großraumbüro heute ein Friedhof geworden."
            ]
        },
        {
            id: "mood_lazy", when: d => d.ach('ach_lazy'),
            lines: [
                "Mein Motto heute: Warum heute arbeiten, wenn man es auch auf unbestimmte Zeit verschieben kann?",
                "Ich habe die Kunst der produktiven Arbeitsvermeidung heute absolut perfektioniert.",
                "Wenn Faulenzen olympisch wäre, hätte ich heute Gold für die Firma geholt."
            ]
        },
        {
            id: "mood_ascetic", when: d => d.ach('ach_ascetic'),
            lines: [
                "Ich habe den Tag ohne einen Tropfen Kaffee überlebt – mein Kopf dröhnt vor Tugendhaftigkeit.",
                "Kein Koffein heute. Ich funktioniere nur noch durch pure Willenskraft und unterdrückte Wut.",
                "Ein völlig entkoffeinierter Tag. Ich fühle mich wie eine leere Hülle, aber mein Blutdruck ist fantastisch."
            ]
        },
        {
            id: "mood_coffee", when: d => d.ach('ach_coffee'),
            lines: [
                "Mein Blut besteht mittlerweile zu 90% aus Koffein. Ich kann Farben schmecken.",
                "Ich zittere am ganzen Körper. Nicht vor Angst, sondern weil ich den halben Kaffeeautomaten geleert habe.",
                "Wenn ich noch einen Espresso trinke, kann ich wahrscheinlich durch die Zeit reisen. Mein Puls ist auf Rekordjagd."
            ]
        },
        {
            id: "mood_workaholic", when: d => d.ach('ach_workaholic'),
            lines: [
                "Ich habe heute tatsächlich so hart gearbeitet, dass ich uns alle schlecht aussehen lasse.",
                "Heute war ich beängstigend produktiv. Ich hoffe, das Management gewöhnt sich nicht daran.",
                "Ein Tag wie ein Maschinengewehr. Tickets gelöst, Probleme gefixt. Ich habe heute quasi die ganze Firma im Alleingang getragen."
            ]
        },
        {
            id: "mood_default", when: () => true,
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
            id: "place_corridors", when: d => d.quests > d.server && d.quests > d.calls,
            lines: [
                "Anstatt mich um echte Probleme zu kümmern, bin ich lieber ziellos durch die Flure gegeistert.",
                "Meine Hauptaufgabe bestand heute scheinbar darin, seltsame Büro-Dramen abseits meines Schreibtisches zu lösen.",
                "Ich war heute öfter auf 'Dienstgang' unterwegs als am eigenen Platz."
            ]
        },
        {
            id: "place_server", when: d => d.server > d.calls + 2,
            lines: [
                "Um den nervigen Menschen aus dem Weg zu gehen, habe ich mich größtenteils im dunklen Serverraum verschanzt.",
                "Die lauten Lüfter im Serverraum waren heute meine einzige, echte Gesellschaft.",
                "Ich habe heute fast schon eine emotionale Bindung zu den blinkenden Racks im Keller aufgebaut."
            ]
        },
        {
            id: "place_phone", when: d => d.calls > d.server + 3,
            lines: [
                "Gefühlt klebte mir das Telefon pausenlos am Ohr. Die User haben mir den letzten Nerv geraubt.",
                "Ich habe heute mehr Support-Gespräche geführt als eine vollbesetzte Call-Center-Schicht.",
                "Das ständige Klingeln des Telefons wird mich vermutlich noch bis in meine Träume verfolgen."
            ]
        },
        {
            id: "place_mixed", when: () => true,
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
            id: "warn_rage", when: d => d.rageWarned,
            lines: [
                "ich zwischendurch einen halben Nervenzusammenbruch in der Besenkammer hatte",
                "ich heute schon einmal kurz davor war, komplett die Kontrolle zu verlieren",
                "ich meine Wut heute bereits an harmlosem Büromaterial auslassen musste"
            ]
        },
        {
            id: "warn_chef", when: d => d.chefWarned,
            lines: [
                "der Chef mir heute bereits mit dem Rauswurf gedroht hat",
                "ich nur haarscharf an einer fristlosen Kündigung vorbeigeschrammt bin",
                "ich heute schon eine hochoffizielle und sehr laute Abmahnung kassiert habe"
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
            id: "blind_hard", when: d => d.survived && d.blind && d.difficulty === 'hard',
            lines: [
                "Nachtrag: Ich habe den ganzen Montag über keine einzige Zahl gesehen. Keine Prozente, keine Ticketstände, nichts. Nur Gesichter, Tonfall und das Geräusch, das die Kaffeemaschine macht, wenn es zu spät ist. Ich habe ihn trotzdem überstanden. Ich weiß bis jetzt nicht, wie knapp es war, und ich will es auch nicht wissen.",
                "Nachtrag: Montag, blind. Ich habe den Tag gelesen wie ein Seemann das Wetter — an der Art, wie Gabi 'guten Morgen' sagt, daran, wie lange Markus in der Tür stehen bleibt, daran, ob die Tür vom Chef offen war. Es hat funktioniert. Ich bin selbst am meisten überrascht.",
                "Nachtrag: Kein einziger Balken, kein einziger Zähler, und dann auch noch ein Montag. Irgendwann hört man auf zu rechnen und fängt an zu spüren, wie der Laden steht. Das ist entweder Erfahrung oder die erste Stufe des Wahnsinns. Vermutlich beides."
            ]
        },
        {
            id: "blind_easy", when: d => d.survived && d.blind && d.difficulty === 'easy',
            lines: [
                "Nachtrag: Ich habe heute alle Anzeigen ausgeblendet. Kein Prozentwert, kein Ticketstand. An einem Freitag ist das kein Kunststück, aber es war erstaunlich ruhig im Kopf, wenn niemand einem ständig vorrechnet, wie es um einen steht.",
                "Nachtrag: Der ganze Tag ohne Zahlen. Man merkt schnell, dass die Kollegen die ehrlicheren Messgeräte sind — die Zahlen sagen einem nur, wie schlimm es ist, die Kollegen sagen einem, warum."
            ]
        },
        {
            id: "blind_normal", when: d => d.survived && d.blind,
            lines: [
                "Nachtrag: Heute habe ich sämtliche Anzeigen abgeschaltet und den Tag nach Gefühl gearbeitet. Keine Prozente, keine offenen Zähler, nur der Laden und ich. Rückblickend die klarste Sicht, die ich seit Monaten hatte.",
                "Nachtrag: Ein ganzer Arbeitstag ohne eine einzige Kennzahl. Kein Dashboard, kein Zähler, kein Balken, der langsam rot wird. Nur Menschen, Geräusche und Erfahrung. Man sollte das öfter machen. Man wird es nicht öfter machen.",
                "Nachtrag: Blind gearbeitet, von acht bis Feierabend. Als jemand mittags fragte, wie es denn stehe, konnte ich zum ersten Mal ehrlich antworten: keine Ahnung. Und es war trotzdem in Ordnung."
            ]
        }
    ]
};
