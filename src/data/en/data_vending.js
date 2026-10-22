// i18n-status: translated
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
 *   magazine  Dr Wichtig's ADDED VALUE (MEHRWERT in the German tree), three
 *             compartments full, read on the spot
 *   printout  Chantal's blog, printed for a retiree, read on the spot
 *   c4        the crank; the sandwich is the only thing that leaves the window
 *
 * No year anywhere in here. A best-before date in 2031 is funny until 2031;
 * 'Best before: yes' works in every year. Past dates are fine, they
 * stay past.
 *
 * Quotation marks as everywhere in game text: 'single' at the first level.
 */
export const vending = {

    // The line at the top of the window.
    title: "Third Floor, Back Section",

    // Three rows of four, read left to right. `take` makes a compartment one
    // of the three choices; everything else is glass and dust. `name`, `sub`
    // and `price` are the label in the compartment, `was` a price somebody
    // crossed out. `img` only where there is something to see.
    slots: [
        { id: "A1", take: "magazine", img: "assets/img/vending/magazine.webp", name: "ADDED VALUE", sub: "Issue 1", price: "€4.90" },
        { id: "A2", take: "magazine", img: "assets/img/vending/magazine.webp", name: "ADDED VALUE", sub: "Issue 1", price: "€4.90" },
        { id: "A3", text: "empty since the refit" },
        { id: "A4", text: "One piece of chewing gum. Sideways. Out of reach." },
        { id: "B1", take: "magazine", img: "assets/img/vending/magazine.webp", name: "ADDED VALUE", sub: "Issue 1", price: "€2.45", was: "€4.90" },
        { id: "B2", text: "Price tag: DM 1.20" },
        { id: "B3", take: "printout", img: "assets/img/vending/printout.webp", name: "Mindful Workspace", sub: "Print edition", price: "free" },
        { id: "B4", text: "A coil with nothing on it. Turns anyway." },
        { id: "C1", text: "empty" },
        { id: "C2", text: "A note: 'OUT OF ORDER'. Behind it: nothing." },
        { id: "C3", text: "empty" },
        { id: "C4", take: "c4", sub: "stuck", text: "Something is lying at the back. No telling what shape." }
    ],

    // The type plate. Machines speak English, in both trees.
    plate: [
        { label: "TYPE", value: "SV-2200, 48 SLOTS" },
        { label: "LAST SERVICE", value: "11/2009" },
        { label: "NEXT SERVICE", value: "ON REQUEST" },
        { label: "POWER", value: "— — —" }
    ],
    plug: "The plug is lying next to it.",

    /* ----------------------------------------------------------------
       C4, by hand. `ms` is how long a line waits before it appears -
       about eighteen seconds in all, and unevenly: quick into it, sticky in
       the middle, the ninth turn hangs, then the fall. No counter and no
       bar: a player who knows there are eleven turns counts them down, one
       who does not wonders at every turn whether this ever ends.

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
        { ms: 0,    text: "You reach through the flap and get hold of the coil. It is cold and greasy." },
        { ms: 600,  text: "First turn. Far at the back, something moves." },
        { ms: 800,  text: "Second. The light above you flickers in time with it. That is a coincidence." },
        { ms: 1000, text: "Third. Nothing." },
        { ms: 1200, text: "Fourth. Somewhere downstairs, a lift sets off." },
        { ms: 1300, text: "Fifth. You wonder whether it is possible to sleep standing up." },
        { ms: 1400, text: "Sixth. You count out loud, because nobody else is going to." },
        { ms: 1500, text: "Seventh. By now you know this coil better than most of your colleagues." },
        { ms: 1600, text: "Eighth. In your head, Kevin says: 'Welcome to the club.'" },
        { ms: 2300, text: "Ninth. You glance at the window and are surprised that it is still light." },
        { ms: 600,  text: "Tenth. Something tips." },
        { ms: 500,  text: "Eleventh. It comes loose." }
    ],
    crankEnd: [
        { ms: 700,  text: "The light above you stops flickering. It is watching too." },
        { ms: 900,  text: "It hits the glass, turns once and catches on the edge by one corner." },
        { ms: 1000, text: "It wobbles. Slides a little. Catches again." },
        { ms: 900,  text: "Then a dull thud in the flap.", lands: true },
        { ms: 900,  text: "Behind you the lift doors open. The lift from before. It has only just got up here." },
        { ms: 1200, text: "In the flap lies a filled roll, shrink-wrapped. The label says 'Best before:', and after it somebody has written 'yes' by hand." }
    ],
    // A full backpack: the roll stays where it landed.
    crankFull: "Your backpack is full. The roll stays in the flap, for the next member of the club.",

    /* ----------------------------------------------------------------
       ADDED VALUE - Dr Wichtig's magazine. Three compartments full, because
       nobody has ever bought one: the machine lost its power before the
       magazine went in, so not one copy has been sold. Read here, left here.
       ---------------------------------------------------------------- */
    magazine: {
        heading: "ADDED VALUE, Issue 1",
        drop: "One turn, and the front copy drops. It had been leaning against the glass for quite a while.",
        cover: {
            title: "ADDED VALUE",
            tagline: "The Management Magazine",
            issue: "Issue 1",
            price: "€4.90",
            lead: "The Year of Efficiency",
            lines: [
                "Dr Wichtig on going without, and why it starts with you. pp. 4–31",
                "'The Agile Kitchen': 14 pages of salad",
                "Survey: what does synergy mean to you? p. 36",
                "Portrait: the printer on the second floor"
            ]
        },
        pages: [
            {
                head: "Editorial",
                text: "Dear colleagues, you are holding the first issue of ADDED VALUE. That pleases me, because it means you have invested €4.90 in your own company. That is exactly the attitude we need. From the next issue on, ADDED VALUE will appear quarterly.",
                sign: "Dr Wichtig, CEO"
            },
            { head: "Page 36: What does synergy mean to you?", text: "This page has intentionally been left blank.", blank: true },
            { head: "Letters", text: "We received no letters about this issue. We take that as agreement." }
        ],
        imprint: {
            head: "Imprint",
            rows: [
                { label: "Publisher", value: "Dr Wichtig, CEO" },
                { label: "Editorial office", value: "Office of the CEO" },
                { label: "Frequency", value: "quarterly" },
                { label: "Print run", value: "2,000" },
                { label: "Copies sold", value: "0", zero: true },
                { label: "Distribution", value: "Vending machine SV-2200, third floor" }
            ]
        },
        after: "You put the magazine on the windowsill. Eleven others are already lying there, all open at page 36."
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
        heading: "Mindful Workspace, print edition",
        drop: "One turn. The printout slides out, stapled at one corner. The paper has the colour paper turns when it has been lying somewhere for a long time.",
        title: "Mindful Workspace",
        subtitle: "Now in a version you can touch! By popular demand.",
        pen: "Thank you for the idea, dear Ms Kowalski! ♡",
        posts: [
            {
                title: "New to the team: Kevin!", emoji: "🎉", when: "Posted 5 weeks ago",
                text: "Say hello to our new apprentice! Kevin is still a little shy, but he has already asked where the server room is. I think he is going to feel right at home here."
            },
            {
                title: "Coming soon: our wellbeing corner on the third floor", emoji: "🕯️", when: "Posted 6 weeks ago",
                text: "At the back by the stairwell, a place to breathe is taking shape: warm, dimmed lighting, a bench and a vending machine with healthy snacks. Facilities is in the loop!"
            },
            {
                title: "Pilot project 'Silent Sync': who is in?", emoji: "🤫", when: "Posted 7 weeks ago",
                text: "One hour of silence together, no agenda at all. Sign up with me, out loud is fine too!"
            }
        ],
        signoff: "In deep connection with your KPIs, Your Chantal",
        signoffEmoji: "💕",
        comments: "Comments (0)",
        after: "You push the printout back into the compartment. Right at the back there is another one, with a sticky note: 'For Ms Kowalski'."
    },

    /* ----------------------------------------------------------------
       The house rules, taped to the inside of the glass. Rule 1 is the
       reason the first option of sq_kevin_geheim_2 closes the door: it
       asks exactly who restocks. Rule 2 is the either-or of every visit,
       and the window underlines it once something has been taken.
       ---------------------------------------------------------------- */
    rules: {
        title: "House Rules C4",
        list: [
            "Do not ask who restocks it.",
            "No more than one.",
            "Push the flap shut again. All the way shut.",
            "The light stays broken. That is not neglect, that is camouflage.",
            "Anyone who repairs the machine is out. Out of the club, not out of the company."
        ],
        // Index into `list`: the rule the window underlines after a take.
        limitRule: 1,
        lead: "Signed so far:",
        // In the order they signed. Two stand there on the first visit and one
        // more each later week (engine_vending.vendingMembersShown); the player's
        // line goes in wherever the list had got to when they signed.
        members: ["K. (Apprentice)", "R. S. (Accounts)", "G.", "'The gentleman from the night shift'", "E."],
        you: "Miller (IT)",
        free: "— — —"
    }
};
