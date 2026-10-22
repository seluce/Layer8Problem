/**
 * The vending machine on the third floor, back section (6.3).
 *
 * Kevin shows it in sq_kevin_geheim_2: unplugged, not restocked since the
 * refit, and yet something is still delivered to C4. sq_kevin_geheim_3 brings
 * the player back, and its first option opens this window through
 * CMD:OPEN_VENDING (components/VendingView.svelte).
 *
 * NOT the coffee machine. The tea kitchen has one of those, with its error
 * E-52, Frau Sonntag, and the chrome trial model Herr Kowalski brings and takes
 * away again (cof_sonntag_*, cof_automat_*). This one sold snacks, once, and
 * stands in a stairwell nobody lights properly.
 *
 * Three things can be taken, ONE per visit - house rule 2 on the glass says
 * so, and engine_vending.vendingTake() holds to it:
 *   magazine  Dr. Wichtig's MEHRWERT, three compartments full, read on the spot
 *   printout  Chantal's blog, printed for a retiree, read on the spot
 *   c4        the crank; the sandwich is the only thing that leaves the window
 *
 * No year anywhere in here. A best-before date in 2031 is funny until 2031;
 * 'Mindestens haltbar bis: ja' works in every year. Past dates are fine, they
 * stay past.
 *
 * Quotation marks as everywhere in game text: 'single' at the first level.
 */
export const vending = {

    // The line at the top of the window.
    title: "Dritter Stock, hinten",

    // Three rows of four, read left to right. `take` makes a compartment one
    // of the three choices; everything else is glass and dust. `name`, `sub`
    // and `price` are the label in the compartment, `was` a price somebody
    // crossed out. `img` only where there is something to see.
    slots: [
        { id: "A1", take: "magazine", img: "assets/img/vending/magazine.webp", name: "MEHRWERT", sub: "Ausgabe 1", price: "4,90 €" },
        { id: "A2", take: "magazine", img: "assets/img/vending/magazine.webp", name: "MEHRWERT", sub: "Ausgabe 1", price: "4,90 €" },
        { id: "A3", text: "leer, seit dem Umbau" },
        { id: "A4", text: "Ein Kaugummi. Quer. Unerreichbar." },
        { id: "B1", take: "magazine", img: "assets/img/vending/magazine.webp", name: "MEHRWERT", sub: "Ausgabe 1", price: "2,45 €", was: "4,90 €" },
        { id: "B2", text: "Preisschild: 1,20 DM" },
        { id: "B3", take: "printout", img: "assets/img/vending/printout.webp", name: "Mindful Workspace", sub: "Druckausgabe", price: "kostenlos" },
        { id: "B4", text: "Eine Spirale ohne Ware. Dreht sich trotzdem." },
        { id: "C1", text: "leer" },
        { id: "C2", text: "Zettel: 'DEFEKT'. Dahinter: nichts." },
        { id: "C3", text: "leer" },
        { id: "C4", take: "c4", sub: "klemmt", text: "Etwas liegt hinten. Form nicht erkennbar." }
    ],

    // The type plate. Machines speak English, in both trees.
    plate: [
        { label: "TYPE", value: "SV-2200, 48 SLOTS" },
        { label: "LAST SERVICE", value: "11/2009" },
        { label: "NEXT SERVICE", value: "ON REQUEST" },
        { label: "POWER", value: "— — —" }
    ],
    plug: "Der Stecker liegt daneben.",

    /* ----------------------------------------------------------------
       C4, by hand. `ms` is the beat a line waits on top of the time it
       takes to read the one before it (crankDelays, engine_vending.js) -
       about a minute in all, eighteen seconds of it beats, and unevenly:
       quick into it, sticky in the middle, the ninth turn hangs, then the
       fall. No counter and no bar: a player who knows there are eleven
       turns counts them down, one who does not wonders at every turn
       whether this ever ends.

       The text claims hours - sleeping on your feet, knowing the coil
       better than colleagues, surprise that it is still light - and the
       lift that sets off downstairs on turn four arrives upstairs once the
       roll has landed. It took one lift ride. Nothing says so.

       It does not simply fall: it comes loose, hits the glass, hangs on by
       a corner, and the light stops flickering to watch. `lands` marks the
       thud in the flap - from that line on the roll is the player's
       (VendingView delivers it there), and the lift and the label after it
       are epilogue. Whoever shuts the flap during the epilogue was done,
       not impatient. The window holds the stairwell light still from the
       first closing line until the landing, because the text says it stops.
       ---------------------------------------------------------------- */
    crank: [
        { ms: 0,    text: "Du greifst durch die Klappe und bekommst die Spirale zu fassen. Sie ist kalt und fettig." },
        { ms: 600,  text: "Erste Umdrehung. Weit hinten bewegt sich etwas." },
        { ms: 800,  text: "Zweite. Die Lampe über dir flackert im Takt mit. Das ist Zufall." },
        { ms: 1000, text: "Dritte. Nichts." },
        { ms: 1200, text: "Vierte. Unten im Haus setzt sich ein Aufzug in Bewegung." },
        { ms: 1300, text: "Fünfte. Du überlegst, ob man im Stehen schlafen kann." },
        { ms: 1400, text: "Sechste. Du zählst laut mit, weil es sonst niemand tut." },
        { ms: 1500, text: "Siebte. Du kennst diese Spirale inzwischen besser als die meisten Kollegen." },
        { ms: 1600, text: "Achte. In deinem Kopf sagt Kevin: 'Willkommen im Club.'" },
        { ms: 2300, text: "Neunte. Du siehst zum Fenster und bist überrascht, dass es noch hell ist." },
        { ms: 600,  text: "Zehnte. Etwas kippt." },
        { ms: 500,  text: "Elfte. Es löst sich." }
    ],
    crankEnd: [
        { ms: 700,  text: "Die Lampe über dir hört auf zu flackern. Sie sieht auch zu." },
        { ms: 900,  text: "Es schlägt gegen die Scheibe, dreht sich einmal und bleibt mit einer Ecke an der Kante hängen." },
        { ms: 1000, text: "Es wackelt. Rutscht ein Stück. Hängt wieder." },
        { ms: 900,  text: "Dann ein dumpfer Schlag in der Klappe.", lands: true },
        { ms: 900,  text: "Hinter dir geht die Aufzugstür auf. Der Aufzug von vorhin. Er ist gerade erst oben angekommen." },
        { ms: 1200, text: "In der Klappe liegt ein belegtes Brötchen, eingeschweißt. Auf dem Etikett steht 'Mindestens haltbar bis:', und dahinter hat jemand von Hand 'ja' geschrieben." }
    ],
    // A full backpack: the roll stays where it landed.
    crankFull: "Dein Rucksack ist voll. Das Brötchen bleibt in der Klappe liegen, für den Nächsten im Club.",

    /* ----------------------------------------------------------------
       MEHRWERT - Dr. Wichtig's magazine. Three compartments full, because
       nobody has ever bought one: the machine lost its power before the
       magazine went in, so not one copy has been sold. Read here, left here.
       ---------------------------------------------------------------- */
    magazine: {
        heading: "MEHRWERT, Ausgabe 1",
        drop: "Eine Umdrehung, und das vorderste Heft fällt. Es lehnte schon eine Weile an der Scheibe.",
        cover: {
            title: "MEHRWERT",
            tagline: "Das Magazin der Geschäftsführung",
            issue: "Ausgabe 1",
            price: "4,90 €",
            lead: "Das Jahr der Effizienz",
            lines: [
                "Dr. Wichtig über Verzicht, und warum er bei Ihnen anfängt. S. 4–31",
                "'The Agile Kitchen': 14 Seiten Salat",
                "Umfrage: Was bedeutet Synergie für Sie? S. 36",
                "Porträt: Der Drucker im zweiten Stock"
            ]
        },
        pages: [
            {
                head: "Editorial",
                text: "Liebe Mitarbeitende, Sie halten die erste Ausgabe von MEHRWERT in den Händen. Das freut mich, denn es bedeutet, dass Sie 4,90 € in Ihr eigenes Unternehmen investiert haben. Genau diese Haltung brauchen wir. Ab der nächsten Ausgabe erscheint MEHRWERT quartalsweise.",
                sign: "Dr. Wichtig, CEO"
            },
            { head: "Seite 36: Was bedeutet Synergie für Sie?", text: "Diese Seite wurde bewusst freigelassen.", blank: true },
            { head: "Leserbriefe", text: "Zu dieser Ausgabe erreichten uns keine Zuschriften. Wir werten das als Zustimmung." }
        ],
        imprint: {
            head: "Impressum",
            rows: [
                { label: "Herausgeber", value: "Dr. Wichtig, CEO" },
                { label: "Redaktion", value: "Büro der Geschäftsführung" },
                { label: "Erscheinungsweise", value: "quartalsweise" },
                { label: "Druckauflage", value: "2.000" },
                { label: "Verkaufte Auflage", value: "0", zero: true },
                { label: "Vertrieb", value: "Automat SV-2200, dritter Stock" }
            ]
        },
        after: "Du legst das Heft auf die Fensterbank. Dort liegen schon elf andere, alle aufgeschlagen auf Seite 36."
    },

    /* ----------------------------------------------------------------
       Chantal's blog, printed. NOT read out of data_intranet.js: a printout
       is an old state of a page, and these posts are older than anything
       on the intranet now - Kevin still new, the wellbeing corner still
       coming (it is where the player is standing), Silent Sync still
       looking for volunteers (the intranet reports it a success). Printed
       for Frau Kowalski, who signed the ficus note on the board on her way
       into retirement and never came back for it.
       ---------------------------------------------------------------- */
    printout: {
        heading: "Mindful Workspace, Druckausgabe",
        drop: "Eine Umdrehung. Der Ausdruck rutscht heraus, an einer Ecke getackert. Das Papier hat die Farbe, die Papier bekommt, wenn es lange irgendwo liegt.",
        title: "Mindful Workspace",
        subtitle: "Jetzt auch zum Anfassen! Auf vielfachen Wunsch.",
        pen: "Danke für die Idee, liebe Frau Kowalski! ♡",
        posts: [
            {
                title: "Neu im Team: Kevin!", emoji: "🎉", when: "Gepostet vor 5 Wochen",
                text: "Sagt Hallo zu unserem neuen Azubi! Kevin ist noch ein bisschen schüchtern, aber er hat schon gefragt, wo der Serverraum ist. Ich glaube, er wird sich hier richtig wohlfühlen."
            },
            {
                title: "Bald: unsere Wohlfühl-Ecke im dritten Stock", emoji: "🕯️", when: "Gepostet vor 6 Wochen",
                text: "Hinten beim Treppenhaus entsteht ein Ort zum Durchatmen: warmes, gedimmtes Licht, eine Sitzbank und ein Automat mit gesunden Snacks. Facility ist informiert!"
            },
            {
                title: "Pilotprojekt 'Silent Sync': Wer macht mit?", emoji: "🤫", when: "Gepostet vor 7 Wochen",
                text: "Eine Stunde gemeinsam schweigen, ganz ohne Agenda. Anmeldung bei mir, gern auch mündlich!"
            }
        ],
        signoff: "In tiefer Verbundenheit zu euren KPIs, Eure Chantal",
        signoffEmoji: "💕",
        comments: "Kommentare (0)",
        after: "Du schiebst den Ausdruck zurück ins Fach. Ganz hinten steckt noch einer, mit einem Klebezettel: 'Für Frau Kowalski'."
    },

    /* ----------------------------------------------------------------
       The house rules, taped to the inside of the glass. Rule 1 is the
       reason the first option of sq_kevin_geheim_2 closes the door: it
       asks exactly who restocks. Rule 2 is the either-or of every visit,
       and the window underlines it once something has been taken.
       ---------------------------------------------------------------- */
    rules: {
        title: "Hausordnung C4",
        list: [
            "Nicht fragen, wer befüllt.",
            "Nicht mehr als eins.",
            "Klappe wieder zudrücken. Ganz zudrücken.",
            "Die Lampe bleibt kaputt. Das ist keine Nachlässigkeit, das ist Tarnung.",
            "Wer den Automaten repariert, fliegt raus. Aus dem Club, nicht aus der Firma."
        ],
        // Index into `list`: the rule the window underlines after a take.
        limitRule: 1,
        lead: "Bisher eingetragen:",
        // In the order they signed. Two stand there on the first visit and one
        // more each later week (engine_vending.vendingMembersShown); the player's
        // line goes in wherever the list had got to when they signed.
        members: ["K. (Azubi)", "R. S. (Buchhaltung)", "G.", "'Der Herr von der Nachtschicht'", "E."],
        you: "Müller (IT)",
        free: "— — —"
    }
};
