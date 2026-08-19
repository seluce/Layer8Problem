// i18n-status: translated
/**
 * Compendium ("Wissen") - Müller's private notes on the people he keeps
 * running into. Team stays the at-a-glance reputation view for the seven
 * colleagues; everyone else lives here.
 *
 * Structure of an entry:
 *   id, cat        internal id and category: 'team', 'person', 'place' or 'matter'.
 *                  The view groups by it and gives each category its own
 *                  colour, so the register stays readable once it is long.
 *   name, role     heading and subheading
 *   summary        unlocked on the FIRST sighting. Deliberately not funny:
 *                  it is on screen from the start and has to survive being
 *                  read ten times. The punchlines belong in the notes.
 *   seen           event ids that count as a sighting (unlocks the summary)
 *   notes          one line each, unlocked by evidence:
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
 *
 * --- NAMES AND HEADINGS (6.0) ---
 *
 * `name` is a card heading, not an identifier: the view, the engine, the
 * tests and dev-woche.js all address an entry by `id`, and lint-parity does
 * not list `name` among the id keys. It is therefore free - but it is not
 * free of consequence, because the seven `cat: "team"` heads sit in the same
 * modal as the team cards, which read their names from data_chars.js and
 * have to stay German (state.reputation is keyed by them). The rule that
 * follows from that:
 *
 *   people   German, word for word, honorific included: Herr Blaschke,
 *            Frau R. Sonntag, Dr. Wichtig. The prose next to the heading
 *            still uses the British address without a full stop (Mr
 *            Blaschke, Ms Sonntag), exactly as GLOSSAR §4 has it.
 *   places   English throughout - they are descriptions, not names:
 *   matters  The Server Room, The Lift, Room 2.11, Emergency Plan 2009.
 *   jokes    English where the meaning IS the name, because leaving it
 *            German would leave the joke untranslated: Herr Aluhut becomes
 *            Mr Tinfoil, Der Baron von Gier becomes Baron von Greed, Die
 *            Karteileiche becomes The Ghost Account.
 *
 * One entry changes shape: "Praktikantin Lena" is a job title plus a name,
 * so the job title moves to `role` where the other job titles live.
 *
 * --- WORDING FIXED AHEAD OF THE POOLS ---
 *
 * This file quotes scenes from ten pools and only one of them (lunch) has
 * been translated. For the other nine the compendium therefore SETS the
 * English wording instead of following it - every term picked here is
 * recorded in GLOSSAR §3c with the event id beside it, so the pool that
 * comes later can be held against it.
 */
export const compendium = [

    /* ------------------------------------------------------------------ PEOPLE */
    {
        id: "blaschke",
        cat: "person",
        name: "Herr Blaschke",
        role: "Facilities management",
        summary: "In charge of everything the building does to itself. Reachable, as long as you treat him like a person and not like a ticket system.",
        seen: ["srv_marder_1", "srv_marder_3", "srv_marder_4", "sq_brandtuer_1", "call_wlp_geruch"],
        notes: [
            { flag: "srv_marder_meldung", text: "Identifies animals by the rhythm of the scratching. Marten or pigeon, he says, and he is right before he has even looked." },
            { seen: "sq_brandtuer_1",     text: "His unit of time is 'the week'. Not this one, not next one. The week." },
            { seen: "srv_marder_3",       text: "Report it early and you pay less. He does not say it reproachfully, only as a price quote." },
            { seen: "srv_marder_4",       text: "Halves the rusk before he lays it in the trap. Ask him why and you get four sentences about bait and wind direction, and afterwards you know more about this building than four years of intranet ever taught you." },
            { seen: "call_wlp_geruch",    text: "Knows the ventilation runs by heart. If something smells anywhere, he knows whose room hangs off that run before he has been to look." }
        ]
    },
    {
        id: "sonntag",
        cat: "person",
        name: "Frau R. Sonntag",
        role: "Accounts",
        summary: "Keeps lists, keeps them properly, and holds that any matter can be cured the moment it has a number.",
        seen: ["cof_sonntag_1", "cof_sonntag_2", "call_wlp_geruch", "cof_deka_3"],
        notes: [
            { seen: "cof_sonntag_1",   text: "Switches devices off and on again twice before she rings. She picked it up from us and applies it to everything now, coffee machines included." },
            { seen: "call_wlp_geruch", text: "The words 'specialist firm' calm her down every time. Whether one exists is beside the point — it only has to be able to exist." },
            { seen: "cof_sonntag_2",   text: "Bakes marble cake and puts it in your pigeonhole, not on the table. A matter with a receipt, not a present." },
            { seen: "cof_deka_3",      text: "Three transfers to Liechtenstein, all three by accident. The building has known what caffeine is worth in Accounts ever since." }
        ]
    },
    {
        id: "brandt",
        cat: "person",
        name: "Herr Brandt",
        role: "Sales, external",
        summary: "Sells a digitalisation solution. What it does is something nobody has worked out in three conversations, himself included.",
        seen: ["call_kalt_1", "sq_brandt_1"],
        notes: [
            { seen: "call_kalt_1",       text: "Takes every courtesy for a commitment. 'Do come by in person' is an appointment to him, and he keeps it." },
            { flag: "call_brandt_kommt", text: "Brings a roll-up banner. Anyone carrying a banner is expected somewhere — that is how this building thinks, and he knows it." },
            { seen: "sq_brandt_1",       text: "Gives way to authority by instinct. An invented fire-safety inspection clears him out of the building faster than any no." },
            { flag: "sq_brandt_chefsache", text: "Hits it off with Dr Wichtig on the spot. That is the actual warning." }
        ]
    },

    {
        id: "lena",
        cat: "person",
        name: "Lena",
        role: "Marketing, intern",
        summary: "Dares to ask, and dares to ask before it is too late. That sets her apart from the rest of the building.",
        seen: ["call_lena", "call_locked_in", "call_lena_keller", "call_lena_bewerbung"],
        notes: [
            { seen: "call_lena",           text: "Deletes something important once and rings straight away instead of covering it up. That already makes her more professional than two department heads." },
            { seen: "call_locked_in",      text: "The basement has a keypad lock. The code has been four digits of zero since the day it was fitted." },
            { seen: "call_lena_keller",    text: "Thanks you again days later, unprompted. That happens so rarely in this building that you catch yourself looking for the catch." },
            { seen: "call_lena_bewerbung", text: "Is applying for the apprenticeship. Help her with the CV and you may be helping the one new recruit who will actually know how things work later on." }
        ]
    },
    {
        id: "bernd",
        cat: "person",
        name: "Bernd",
        role: "Sales, until his last day",
        summary: "The colleague who shows how far this building will let someone fall before it asks. In the end it was not far enough.",
        seen: ["srv_bernd_1", "cof_milk_1", "cof_sugar_1", "sq_moral_bernd", "sq_bernd_schreibtisch"],
        notes: [
            { seen: "cof_milk_1",           text: "Went for the last of the long-life milk, the last of the sugar, the last of everything. In the kitchenette he was predictable." },
            { seen: "srv_bernd_1",          text: "Sat crying between the warm racks one day, with a bottle of whisky and the line that it was all gone. He was right; only the order was wrong." },
            { flag: "path_bernd_snitch",    text: "One anonymous call to HR is enough. Two minutes later security is carrying him out, and he is shouting something in Latin on the way." },
            { seen: "sq_moral_bernd",       text: "Offered fifty euros in cash for deleting an email. The price of a conscience never embarrassed him, only the amount." },
            { seen: "sq_bernd_schreibtisch", text: "His desk was cleared while his machine was still running. Two boxes, a hole punch, a mug with a football crest." },
            { seen: "sq_bernd_schreibtisch", text: "The box with his personal things stands in the stores for eight months. Nobody ever collects it, and nobody throws it out either." }
        ]
    },
    {
        id: "lisa",
        cat: "person",
        name: "Lisa",
        role: "Marketing",
        summary: "Fifteen metres as the crow flies and a match on your phone. She is charming, direct, and has a laptop that makes odd noises.",
        seen: ["sq_tinder_1", "sq_tinder_2"],
        notes: [
            { seen: "sq_tinder_1",   text: "Knows you as the admin who stares out of the window in despair. The description lands, and it hurts." },
            { flag: "lisa_contact",  text: "Twenty minutes in the lobby, a shared moan about printers, a joke about IPv6 that was reportedly understood. It was a good coffee." },
            { seen: "sq_tinder_2",   text: "The second message arrives with a heart emoji and a fan that could do with dusting out. As a private favour, naturally." }
        ]
    },
    {
        id: "sarah",
        cat: "person",
        name: "Sarah",
        role: "HR",
        summary: "Stands at the coffee machine, smiles and asks whether the server is on fire. Answering both at once is harder than it looks.",
        seen: ["cof_flirt_1", "cof_flirt_2a"],
        notes: [
            { seen: "cof_flirt_1",      text: "Her greeting is 'All right, IT hero?'. Answer that with 'Error 404' and run, and you will be replaying the scene the whole length of the corridor." },
            { flag: "path_flirt_date",  text: "One compliment about fires and putting them out is enough to have her twirling a strand of hair. Nothing else here is ever that easy." },
            { seen: "cof_flirt_2a",     text: "Asks for a drink that does not come out of a machine, and asks first. Talk your way out of it with overtime and the boss, walking past, praises you for exactly that." }
        ]
    },
    {
        id: "juergen",
        cat: "person",
        name: "Jürgen",
        role: "Sales, third floor",
        summary: "Looks for company and reliably finds it in you. He means well, and that is precisely what makes it so hard.",
        seen: ["cof_juergen_1", "cof_juergen_2a", "cof_juergen_2b", "cof_juergen_2c", "sq_betting_pool", "mail_juergen_admin", "mail_allhands_lasagne_2"],
        notes: [
            { seen: "cof_juergen_1",   text: "Blocks the coffee machine and talks about his robot mower. Wait long enough and you get the flow temperature of his heating as well." },
            { seen: "cof_juergen_2a",  text: "Does not notice the headphones are still on and carries on talking regardless. A nod is conversation enough for him." },
            { seen: "cof_juergen_2b",  text: "Data sheets he promises, he delivers. Hard to hold that against him." },
            { seen: "cof_juergen_2c",  text: "Brings a coffee to your desk after a bad day. Sugar, no milk — he remembered, without it ever having come up." },
            { seen: "mail_juergen_admin", text: "Finds tools online whose filename already contains the diagnosis, and takes the virus warning for a false alarm." },
            { seen: "mail_allhands_lasagne_2", text: "Asks privately what the kitchen logs actually record. 'Purely out of interest' is written underneath, and that is the answer." },
            { seen: "sq_betting_pool", text: "Runs the betting pool and addresses the entire room as 'lads' while he does it. It works anyway." }
        ]
    },
    {
        id: "sabine",
        cat: "person",
        name: "Sabine",
        role: "HR",
        summary: "Creates an inclusive atmosphere and keeps lists of who is living up to it. Both with the same seriousness.",
        seen: ["mail_cake_1", "mail_cake_2", "mail_sabine_tupper", "mail_ac_pants", "mail_teambuilding_1"],
        notes: [
            { seen: "mail_cake_1",        text: "Bakes vegan gluten-free courgette cake for everybody and writes underneath that nobody may take more than one slice. The contradiction escapes her." },
            { seen: "mail_cake_2",        text: "Comment on her cake and you land on the no-Christmas-bonus list. The list exists. She keeps it herself." },
            { seen: "mail_sabine_tupper", text: "Her red tub carries a sticker with her name on it. If it goes missing she searches desks and threatens to call the police." },
            { seen: "mail_teambuilding_1", text: "Her team event is called Forest Survival: dropped in the woods, no phones, and whoever is back first does not get sacked. She means the second half as an incentive." },
            { seen: "mail_ac_pants",      text: "Phrases her reprimands in complete sentences, however absurd the occasion. That is exactly what makes her so hard to take." }
        ]
    },
    {
        id: "wuttke",
        cat: "person",
        name: "H. Wuttke",
        role: "Accounts",
        summary: "Uses his inbox for everything other people keep separate devices for. Nobody ever explained to him where work ends and the shopping list starts.",
        seen: ["mail_wuttke_excel", "mail_wuttke_1", "mail_wuttke_ai", "mail_software_1"],
        notes: [
            { seen: "mail_wuttke_excel", text: "The subject line shouts HELP; the first sentence under it is 'I didn't do anything, honestly'. What was deleted was column G." },
            { seen: "mail_wuttke_1",     text: "Writes his search queries as emails. 'goulash recipe easy quick no peppers', no subject, no doubt about the recipient." },
            { seen: "mail_wuttke_ai",    text: "Takes the automatic reply for a person and thanks Outlook. Then he orders cream and pasta from it, not the spiral kind." },
            { seen: "mail_software_1",   text: "Installs free software because the machine is more colourful afterwards, and passes the link on out of collegiality. That is precisely where the work begins." }
        ]
    },
    {
        id: "werner",
        cat: "person",
        name: "Werner",
        role: "Father-in-law",
        summary: "Rings the work phone, speaks very loudly and takes IT for a family business. In a way he is right.",
        seen: ["call_werner_tablet", "call_werner_blind"],
        notes: [
            { seen: "call_werner_tablet", text: "Calls you 'son' and shouts as if there were an ocean in between. There are four kilometres in between." },
            { seen: "call_werner_tablet", text: "Renate gave him a swipe board for a present. The work phone has had a second purpose ever since." },
            { seen: "call_werner_blind",  text: "Has founded a neighbourhood group with 214 members and written NO POLITICS into its name. Both halves say everything about him." }
        ]
    },
    {
        id: "petzold",
        cat: "person",
        name: "Herr Petzold",
        role: "Quality assurance",
        summary: "Takes every matter seriously and all of them equally seriously. That is why everything takes longer with him and is, in the end, documented after all.",
        seen: ["call_scanner_riesig", "call_petzold_handbuch", "cof_tasse_2"],
        notes: [
            { seen: "call_scanner_riesig",  text: "Scans at the highest resolution, in colour, one sheet at a time. Four hundred and twelve pages. He did nothing wrong, he did everything to the maximum." },
            { seen: "call_petzold_handbuch", text: "Keeps his amendments up to date by hand, on paper. That makes the digital manual the poorer source, and he knows it." },
            { seen: "cof_tasse_2",          text: "Conducts with his free hand while he is on the phone. And drinks, without looking, from whichever mug happens to be standing there." }
        ]
    },
    {
        id: "meyer",
        cat: "person",
        name: "Frau Meyer",
        role: "Accounts",
        summary: "There are always exactly ten minutes between her and catastrophe. That, she says, is how long there is until her appointment.",
        seen: ["call_meyer_1", "call_meyer_2"],
        notes: [
            { seen: "call_meyer_1", text: "The black screen is never a black screen. Usually it is liquid, sometimes it is a plug, never what she says it is." },
            { seen: "call_meyer_2", text: "'I did NOTHING' is not a lie with her, it is a description of a state. She really did do nothing — the coffee did." },
            { seen: "call_meyer_2", text: "Take the blame yourself and an hour later there are chocolates on your desk. Without a card, naturally." }
        ]
    },
    {
        id: "aluhut",
        cat: "person",
        name: "Mr Tinfoil",
        role: "Purchasing",
        summary: "That is not his name. Announces himself on the phone as the Owl or not at all, depending on the situation, and whispers on principle.",
        seen: ["call_aluhut", "call_aluhut_1", "call_aluhut_2", "call_aluhut_folie"],
        notes: [
            { seen: "call_aluhut",       text: "Has sealed his microphone with chewing gum. Technically effective, which is the annoying part." },
            { seen: "call_aluhut_1",     text: "His mouse blinks in Morse code. Every mouse blinks; he is the only one listening." },
            { seen: "call_aluhut_2",     text: "Rings under a cover name. The number stays the same." },
            { seen: "call_aluhut_folie", text: "Whatever works on him spreads through Purchasing. Three routers in tinfoil go back to exactly one good piece of advice." }
        ]
    },
    {
        id: "kunz",
        cat: "person",
        name: "Herr Kunz",
        role: "Stores",
        summary: "Gets on with it while others are consulting each other. Only rings when something is genuinely standing there.",
        seen: ["call_zeiterfassung", "call_update_mittag"],
        notes: [
            { seen: "call_update_mittag", text: "When he rings, the delivery is already waiting in the yard. His urgency is real, unlike most people's." },
            { seen: "call_zeiterfassung", text: "Asks for small rule-bendings in the tone of someone asking for a window to be opened. 'You can get in anywhere' is not a threat coming from him, it is trust." },
            { seen: "call_zeiterfassung", text: "Regularly forgets to clock out. The 23:40 in the time system is not evidence of hard work, it is evidence of going home." }
        ]
    },
    {
        id: "kirchner",
        cat: "person",
        name: "Frau Kirchner",
        role: "Order processing",
        summary: "Reports the symptoms reliably and the cause four minutes later. You only have to listen that long.",
        seen: ["call_signatur_weg", "call_teams_immer_gelb"],
        notes: [
            { seen: "call_signatur_weg",     text: "'I didn't do anything' lasts exactly four minutes with her. Then comes the truth, unprompted and complete." },
            { seen: "call_teams_immer_gelb", text: "Her status jumps to yellow because she reads contracts on paper. The system takes reading for absence." },
            { seen: "call_teams_immer_gelb", text: "Her department head judges attendance by a dot on a screen. That is her problem and not her fault." }
        ]
    },
    {
        id: "oezdemir",
        cat: "person",
        name: "Frau Özdemir",
        role: "Project office",
        summary: "Solves problems decisively and by the shortest route. Unfortunately the shortest route often runs straight past security.",
        seen: ["call_lizenz_admin", "sq_zettel_monitor"],
        notes: [
            { seen: "call_lizenz_admin",  text: "Asks for the admin password in order to save you work. She means it sincerely, and that is what makes saying no such hard work." },
            { seen: "sq_zettel_monitor",  text: "Her password is stuck to her monitor, perfectly legible. From two metres away, on the way to the copier." },
            { seen: "sq_zettel_monitor",  text: "Taking a note down solves nothing. Only the changed password ends the matter, and that takes forty minutes." }
        ]
    },
    {
        id: "jablonski",
        cat: "person",
        name: "Frau Jablonski",
        role: "Purchasing",
        summary: "Forgets passwords reliably and spells them out wrongly even more reliably. The two belong together.",
        seen: ["call_pw_reset_grind", "call_nato_1"],
        notes: [
            { seen: "call_pw_reset_grind", text: "'It was working yesterday' is her standing formula. Whatever happened in between does not count as an event." },
            { seen: "call_nato_1",         text: "Spells by an alphabet of her own: A for apple, C for Ceylon or chameleon, depending on the day." },
            { seen: "call_nato_1",         text: "Reading a temporary password out to her over the phone takes longer than resetting it. You know that and you do it anyway." }
        ]
    },
    {
        id: "plomp",
        cat: "person",
        name: "Frau Plomp",
        role: "Customer support",
        summary: "Describes devices by what she uses them for. Surprisingly often that helps more than the technical term.",
        seen: ["call_cup_holder", "call_plomp_tape"],
        notes: [
            { seen: "call_cup_holder", text: "Calls the CD drive the cup holder. After the second cup it is not that either." },
            { seen: "call_plomp_tape", text: "Tape a drive shut and she sees no protection in it, she sees fraud: 'So it is a hole after all.'" },
            { seen: "call_plomp_tape", text: "Remembers fixes and passes them on. Whatever works for her turns up in the next department along weeks later." }
        ]
    },
    {
        id: "grabowski",
        cat: "person",
        name: "Herr Grabowski",
        role: "Former colleague, seven years retired",
        summary: "Rings once a year, always friendly, always about the same thing. He has more patience than three generations of IT put together.",
        seen: ["call_grabowski_1", "call_grabowski_2"],
        notes: [
            { seen: "call_grabowski_1",    text: "Ends the call with 'Until next year, then' and hangs up first. That is not defiance, that is scheduling." },
            { flag: "call_grabowski_akte", text: "The solution is a tick box in the print settings. Seven years, three predecessors, one tick." },
            { seen: "call_grabowski_2",    text: "Ring him instead of quietly closing the ticket and you make it into the bowling club report. That is the highest honour this building has." }
        ]
    },
    {
        id: "leuchter",
        cat: "person",
        name: "Herr Leuchter",
        role: "Southern Branch",
        summary: "He exists, that much is established. Reachable is another matter.",
        seen: ["call_tennis_1", "call_tennis_2", "call_tennis_3"],
        notes: [
            { seen: "call_tennis_1",  text: "Is on a call. Was on a call. Will be on a call." },
            { seen: "call_tennis_2",  text: "Rings back the moment you are in the server room. That is not coincidence any more, that is a pattern." },
            { seen: "call_tennis_3",  text: "When you finally get through, neither of you knows what it was about. Both are relieved." }
        ]
    },
    {
        id: "kowalski",
        cat: "person",
        name: "Herr Kowalski",
        role: "Vending sales, external",
        summary: "Puts in machines that are better than anything in the building, and waits. He does not have to sell anything; the comparison does that for him.",
        seen: ["cof_automat_1", "cof_automat_2"],
        notes: [
            { seen: "cof_automat_1", text: "'On trial. No obligation whatsoever.' The sentence is true word for word and is a trap all the same." },
            { seen: "cof_automat_2", text: "Collects the machine in person and asks about Purchasing while he winds up the cable. The moment is chosen." },
            { seen: "cof_automat_2", text: "Knows Purchasing's answer before it comes. 'Until next quarter, then.'" }
        ]
    },

    /* ---------------------------------------------------------------- THE TEAM
       The seven with a reputation bar. Team stays the at-a-glance view of how
       they feel about you right now; here stands what you have learned about
       them, permanently. Heads and notes are both earned: a head opens with
       the first of its `seen` events, like every other entry - Müller has
       worked alongside them for years, but the player has not, and a book
       that is full on page one has nothing left to give. Decided 19/08/2026;
       until then this comment claimed the heads were open from the first
       shift, which the code never did.
       The names are the ones from data_chars.js, word for word: they key
       state.reputation and they are what the team cards show. */
    {
        id: "k_kevin", cat: "team", name: "Kevin", role: "Apprentice",
        summary: "Learns fast, only rarely what is on the training plan. Asks too late and reports too honestly.",
        seen: ["cof_deka_2", "call_diskret_2", "sq_kevin_geheim_2", "srv_schacht_3", "call_kevin2", "call_kevin_button_1", "rep_kevin_story_1"],
        notes: [
            { seen: "sq_kevin_geheim_2", text: "Knows corners of the building that are on no plan, and shares them only with people who do not ask questions." },
            { seen: "cof_deka_2",        text: "Always has a flask in his backpack. He asks no questions, but he takes notes." },
            { seen: "call_diskret_2",    text: "Is reliably called Justin by the management. Three times in the same conversation." },
            { seen: "srv_schacht_3",     text: "Carries a clipboard and notices changes before the monitoring reports them. He should be listened to more often." },
            { seen: "call_kevin_backup", text: "Makes backups off his own bat, for four hours, and puts them down next to the original. The will is right, the place is not." },
            { seen: "call_kevin2",          text: "Wants the admin password as soon as the panic is big enough. The sentence before it is always that the boss will kill him otherwise." },
            { seen: "call_kevin_button_1",  text: "Presses buttons to see what happens. In an apprentice that is a strength; in the server room it is a problem." },
            { seen: "rep_kevin_story_1", text: "Writes scripts out of boredom that actually work. What else they do only shows up when they answer every email." }
        ]
    },
    {
        id: "k_chantal", cat: "team", name: "Chantal", role: "Marketing",
        summary: "Speaks fluent strategy and not a word of technology. Both with the same conviction.",
        seen: ["cof_chantal_tiktok_2b", "call_chantal_umfrage", "sq_smile_gate_2a", "call_chantal_breakdown_1", "call_beamer_workshop", "call_chef_kaffeetrick", "rep_chantal_story_1"],
        notes: [
            { seen: "call_chantal_umfrage", text: "Her surveys already have their result by the time they go out. The responses are a formality." },
            { seen: "cof_chantal_tiktok_2b", text: "Whatever ends up in her story was never meant for publication beforehand. She sees no contradiction in that." },
            { seen: "sq_smile_gate_2a",     text: "Names every initiative after the feeling it is meant to produce, never after what it does." },
            { seen: "call_chantal_breakdown_1", text: "Two likes after ten minutes is an emergency to her. The panic is real, even where the occasion is not." },
            { seen: "call_chef_kaffeetrick", text: "Feel-good management is a role, not a state. Confuse the two and you will be discussing it for hours." },
            { seen: "call_chantal",         text: "Blocked sites are research obstacles as far as she is concerned. The mention of the boss comes in the same breath and is not meant as a threat but as an argument." },
            { seen: "call_chantal_hostage_1", text: "Rescue her from a meeting and she owes you one. Fail to, and you hear about it forty minutes later." },
            { seen: "rep_chantal_story_1", text: "Behind the façade sits someone who sees through the façade. She admits it exactly once, at the coffee machine, and never again." }
        ]
    },
    {
        id: "k_egon", cat: "team", name: "Egon", role: "Caretaker",
        summary: "The actual master of the house. Owns every key, distrusts every cable and has a solution from 1987 for everything.",
        seen: ["srv_egon_kabel_1", "call_meyer_2", "cof_empfang_1", "rep_egon_story_2c", "call_egon_switch", "call_climate_emergency", "rep_egon_story_2a"],
        notes: [
            { seen: "srv_egon_kabel_1", text: "He does not lend, he hands over. Whoever gets something from him is its custodian from then on, not its owner." },
            { seen: "call_meyer_2",     text: "Hates electrics and comes anyway. He only wants to know beforehand whose fault it is." },
            { seen: "rep_egon_story_2c", text: "Repairs things for good that others replace twice a year. Thanking him is not required. Remembering it is." },
            { seen: "call_egon",         text: "Reports faults word for word and without interpretation. Whether a liquid is coolant or alien is for IT to decide, not him." },
            { seen: "sq_janitor_talk",   text: "At the back entrance he is more talkative than anywhere else in the building. You only have to happen to be walking past." },
            { seen: "call_egon_switch",  text: "Has unscrewed a wet switch and dried it with a hairdryer. He asks afterwards whether that was right, and the box does in fact run." },
            { seen: "call_climate_emergency", text: "Stands in front of the air conditioning at minus ten degrees wanting it turned up. That a server room is supposed to be cold strikes him as ideology." },
            { seen: "rep_egon_story_2a", text: "Is retiring soon and is looking for someone to hand the building over to. The field is small, the examination strict." }
        ]
    },
    {
        id: "k_wichtig", cat: "team", name: "Dr. Wichtig", role: "Management",
        summary: "Has visions, appointments and a phone in a tunnel. Of the three, the tunnel is the most reliable.",
        seen: ["srv_puppe_2", "sq_brandt_1", "call_diskret_1", "call_boss_pocket", "call_boss_tunnel", "rep_ceo_story_1"],
        notes: [
            { flag: "call_diskret_gefallen", text: "Larger problems he settles through the official structure. Screen problems he settles in secret." },
            { seen: "srv_puppe_2",           text: "Looks for a technical cause for every ailment. A measurement report cures him more reliably than a diagnosis." },
            { seen: "sq_brandt_1",           text: "Hits it off with external consultants on the spot. It is the same language, only billed differently." },
            { seen: "call_pw_lost",          text: "Expects IT to know his own passwords. He takes that for service, not for a security hole." },
            { seen: "boss_flood",            text: "In the order of priority of a disaster, the koi come before the floor sockets. He does not say it in jest." },
            { seen: "call_junior",           text: "His son takes the company for family property. Twelve years old, and he heard it from somebody." },
            { seen: "call_boss_pocket",      text: "Dials from his trouser pocket now and then. What you hear then is more honest than any all-hands." },
            { seen: "rep_ceo_story_1", text: "His visions regularly end with equipment in the server room. Treadmills, for example, three of them, for agile programming on the move." }
        ]
    },
    {
        id: "k_elster", cat: "team", name: "Frau Elster", role: "Accounts",
        summary: "Impeccable, incorruptible and implacable. Use her rules instead of going around them and you have her on your side.",
        seen: ["sq_obstkorb_2", "srv_ntp_2", "cof_elster_razzia", "cof_elster_audit_1", "call_elster_excel", "rep_elster_story_2b"],
        notes: [
            { seen: "sq_obstkorb_2",   text: "One list from her ends all helping yourself. Not by prohibition, but by visibility." },
            { seen: "srv_ntp_2",       text: "Raw data is in better hands with her than with any system. She hands it back with correction columns and a version number." },
            { seen: "cof_elster_razzia", text: "The fridge is her area of responsibility. That is in no job description and holds all the same." },
            { seen: "call_zeit_revision", text: "Notices every retrospective change in the time system. She also knows which account must have made it." },
            { seen: "call_elster_budget_trap_1", text: "Requests never fail with her over the money, they fail over the form. That is the worse news." },
            { seen: "cof_elster_audit_1",   text: "Keeps tally sheets on bean consumption and knows the variance against last quarter to the decimal place." },
            { seen: "call_elster_excel",    text: "A black screen brings her to tears, a missed deadline does not. The order of priority is consistent." },
            { seen: "rep_elster_story_2b", text: "Behind closed blinds she asks for help with a digital picture frame that no longer shows Rüdiger. That is not a job, that is trust." }
        ]
    },
    {
        id: "k_markus", cat: "team", name: "Markus", role: "Head of sales",
        summary: "Sells things that do not exist yet, with real enthusiasm. The way back is regularly your problem.",
        seen: ["sq_markus_schritte_1", "cof_elevator_2a", "sq_markus_schritte_2", "call_markus", "cof_markus_flex_1", "rep_markus_story_2b"],
        notes: [
            { seen: "sq_markus_schritte_1", text: "Enters you into competitions unasked and counts firmly on gratitude." },
            { seen: "cof_elevator_2a",      text: "The emergency stop in the lift is a meeting room to him. He uses it without the slightest sense of wrongdoing." },
            { flag: "sq_schritte_dabei",    text: "Recognition comes from him as an emoji and is meant sincerely all the same." },
            { seen: "call_markus_papier",   text: "Solves problems at the print shop across the road if he has to, and charges the trip to IT. Forty-two euros, and he has the receipt on him." },
            { seen: "call_markus_ambush_1", text: "Puts you on speakerphone without saying so. Tell him something in confidence and you have told the room." },
            { seen: "call_markus",          text: "Every one of his problems costs the company a million euros and has to be solved in five minutes. So far no million has moved." },
            { seen: "cof_markus_flex_1",    text: "Wears his watch so that it can be seen, and rolls his sleeve up for it. Only then does the conversation start." },
            { seen: "rep_markus_story_2b", text: "If the client says no, it was the technology. If the client says yes, it was him. The system is closed and has worked for years." }
        ]
    },
    {
        id: "k_gabi", cat: "team", name: "Gabi", role: "Reception",
        summary: "The news exchange. Knows things before the intranet does, and the important ones reach her by word of mouth only.",
        seen: ["cof_empfang_1", "sq_berater_2", "sq_brandt_1", "call_gabi_gossip_1", "call_mouse_in_printer", "rep_gabi_story_2b"],
        notes: [
            { flag: "cof_empfang_zugang", text: "The best coffee machine in the building stands at her desk. Access is not to be had for money, only for favours." },
            { seen: "sq_berater_2",       text: "Checks room bookings and door camera stills out of pure thoroughness. Keep something from her and you lose time." },
            { seen: "sq_brandt_1",        text: "Invents an appointment on request that moves any visitor out of the building. Afterwards you owe her, and she says so as well." },
            { seen: "call_sekretary_2a",  text: "Her fault reports are soundscapes. A dying coffee grinder is more precise than any error number." },
            { seen: "call_deka_stimmung", text: "Notices from the speed of the building that something is wrong before anybody says it out loud." },
            { seen: "call_gabi_gossip_1", text: "When she needs a blocked page, there is a reason for it, and the reason is about to come through the door." },
            { seen: "call_mouse_in_printer", text: "Describes a squeaking in time with the pages so precisely that the diagnosis is settled before anyone has looked." },
            { seen: "rep_gabi_story_2b", text: "Knows every regulation that happens to suit her and quotes it in full seriousness. Leaving the building apparently requires a ticket." }
        ]
    },
    /* ------------------------------------------------------------------ PLACES */
    {
        id: "serverraum",
        cat: "place",
        name: "The Server Room",
        role: "Your patch",
        summary: "The only room in the building where cause and effect still hang together. In return, everything in here takes its revenge on a delay.",
        seen: ["srv_legacy_1", "srv_marder_1", "srv_wlp_1", "srv_bernd_1", "boss_ups_battery", "srv_red_1", "lunch_server_zen"],
        notes: [
            { seen: "srv_legacy_1",     text: "Behind one rack sits a sealed ventilation hatch. The note on it is from the founder and names two occasions for opening it: the end of the world and a stock market crash." },
            { seen: "srv_marder_1",     text: "The ventilation runs into the whole building. Whatever scratches in there is rarely technology, and whatever smells in there soon smells everywhere." },
            { seen: "srv_wlp_1",        text: "Improvise in here and the fans tell you first. They spin up long before any warning arrives." },
            { seen: "boss_ups_battery", text: "The boss's office lies beneath the raised floor. Everything that leaks in here has a destination." },
            { seen: "srv_red_1",        text: "It is the warmest room in the building. That is why people come in here who are cold, and animals who are cold as well." },
            { seen: "srv_bernd_1",      text: "Anyone who crawls away in here is not looked for. That makes the room a refuge and, now and then, the place where somebody is found." },
            { seen: "lunch_server_zen", text: "The hum is even enough to take a lunch break in. It is the only quiet this building has on offer." }
        ]
    },
    {
        id: "teekueche",
        cat: "place",
        name: "The Kitchenette",
        role: "News exchange",
        summary: "In here you know things earlier than the intranet and more precisely than any all-staff email. The price is that you become a subject yourself.",
        seen: ["cof_deka_1", "cof_kaffeekasse", "cof_tasse_1", "cof_milk_1", "lunch_fish_microwave", "cof_falle_letzte_tasse", "cof_elster_razzia"],
        notes: [
            { seen: "cof_deka_1",             text: "Notices are laminated in here and commented on regardless. By hand, directly underneath, usually accurately." },
            { seen: "cof_kaffeekasse",        text: "The honesty box contains, when it comes to it, a button, a paper clip and a receipt from 2023. The tally sheet is correct all the same." },
            { seen: "cof_tasse_1",            text: "There are forty mugs. The one missing is always precisely the one with the crack in the handle." },
            { seen: "cof_milk_1",             text: "More diplomacy has been conducted over the last carton of long-life milk than over any framework contract this company has signed." },
            { seen: "cof_falle_letzte_tasse", text: "Take the last cup and you make a fresh pot. The house law needs no notice on the wall and is obeyed anyway. Mostly." },
            { seen: "lunch_fish_microwave",   text: "The microwave stands in here, and with it the responsibility for everything anybody warms up in it." },
            { seen: "cof_elster_razzia",      text: "The fridge comes under Ms Elster. Anyone who does not know learns it once and never needs telling again." }
        ]
    },
    {
        id: "kreativ2",
        cat: "place",
        name: "Room 'Creative 2'",
        role: "Meeting room, permanently booked",
        summary: "Booked all day for months and always empty. The room is the proof that an appointment weighs more than a person in this building.",
        seen: ["sq_raum_phoenix", "sq_raum_phoenix_2c"],
        notes: [
            { seen: "sq_raum_phoenix",     text: "Held by 'Project Phoenix, all day, recurring'. Nobody knows of a project by that name." },
            { seen: "sq_raum_phoenix_2c",  text: "It is booked by a user account that should have been closed down back in 2016." },
            { seen: "sq_raum_phoenix_2c",  text: "The account has valid access and was last active nine days ago. Booking rooms is the most harmless thing it can do." }
        ]
    },
    {
        id: "chefbuero",
        cat: "place",
        name: "The Boss's Office",
        role: "The floor below the server room",
        summary: "Corner office with an aquarium, a Persian rug and awards on the wall. Sits, of all places, directly below the server room.",
        seen: ["boss_ups_battery", "boss_flood", "call_diskret_1"],
        notes: [
            { seen: "boss_ups_battery", text: "Whatever leaks in the server room drips through the raised floor to precisely here. That is not an accident of the architecture, it is its nature." },
            { seen: "boss_flood",       text: "Five hundred litres of ornamental fish stand above floor sockets. If water gets in, the first instruction is to save the koi." },
            { seen: "call_diskret_1",   text: "This is where the calls come from that officially do not exist. No email, no ticket, no word in the corridor." }
        ]
    },
    {
        id: "kopierraum",
        cat: "place",
        name: "The Copier Room",
        role: "Between the corridor and the kitchenette",
        summary: "Windowless, loud and the only room where nobody disturbs you. Which is why everything happens in here, and rarely any copying.",
        seen: ["sq_secret_meeting_1", "cof_sugar_1", "sq_kopierer_karton"],
        notes: [
            { seen: "sq_secret_meeting_1", text: "Open the door and you interrupt something. As a rule something involving two people from different departments." },
            { seen: "cof_sugar_1",         text: "The supply cupboard next door gets hoarded from the moment the word rationing comes up. Bernd from Sales is always there first." },
            { seen: "sq_kopierer_karton",  text: "Boxes put down in here stay. Egon assembles the contents in the end anyway, without a word, at night." }
        ]
    },
    {
        id: "raucherecke",
        cat: "place",
        name: "The Back Entrance",
        role: "Courtyard, smoking corner",
        summary: "The most informal address in the building. Stand here for ten minutes and you learn more than in any meeting.",
        seen: ["sq_janitor_talk", "sq_drafty_door_2a", "srv_folder_2009"],
        notes: [
            { seen: "sq_janitor_talk",    text: "Egon stands here cursing newfangled technology. A lighter already counts as that in his book." },
            { seen: "sq_drafty_door_2a",  text: "The sliding door stands up to every makeshift fix, just not to a manager who wants to get out." },
            { seen: "srv_folder_2009",    text: "What is discussed here appears in no minutes and is still right more often than the intranet." }
        ]
    },
    {
        id: "gala",
        cat: "place",
        name: "The Summer Party",
        role: "Once a year, attendance compulsory",
        summary: "An evening on which everybody allows themselves the things they will be ashamed of on Monday. The company pays, the building holds, the rest is a matter for negotiation.",
        seen: ["party_start", "party_hub", "party_buffet_1", "party_lounge_1", "party_dance_2", "party_outside_7", "party_bar_5", "party_toilet_3"],
        notes: [
            { seen: "party_start",     text: "The escape route by the back exit is known and it is watched. Anyone wearing a name sticker on their forehead is already lost." },
            { seen: "party_hub",       text: "The room sorts people by itself: bar, buffet, dance floor, lounge, outside. Where somebody stands says more about their evening than any conversation." },
            { seen: "party_buffet_1",  text: "There is a pecking order at the buffet. The Mettigel is off limits until the management has eaten, and Egon enforces it." },
            { seen: "party_lounge_1",  text: "In the lounge you learn what has been kept quiet all year. A written-off company car, for example, that nobody has reported yet." },
            { seen: "party_dance_2",   text: "After a certain hour Dr Wichtig wears his tie around his forehead. Anyone who sees it holds good cards and a problem at once." },
            { seen: "party_bar_5",     text: "At some point the 'Black Card' is lying unattended on a sticky bar. It does not lie there long." },
            { seen: "party_toilet_3",  text: "In the cubicles people gossip without checking who is sitting next door. The best information of the evening costs nothing in here." },
            { seen: "party_outside_7", text: "Sooner or later a neighbour in a dressing gown is standing at the fence outside. He is in the right, and it does him no good at all." }
        ]
    },
    {
        id: "kantine",
        cat: "place",
        name: "The Canteen",
        role: "Basement",
        summary: "The only place in the building where titles genuinely matter. Get the form of address wrong here and you wait longer for your food.",
        seen: ["cof_chef_title", "call_canteen_fix", "lunch_sponsorenlauf", "lunch_schnitzel_gate", "lunch_throat_singing", "lunch_canteen_crash", "lunch_microwave_war"],
        notes: [
            { seen: "cof_chef_title",       text: "The head of the kitchen is not a cook but a Senior Nutrition Artist. He did not think it up, he earned it." },
            { seen: "call_canteen_fix",     text: "The receipt printer is the most important device in the building. If it stops, the tax office is at the door — says Mr Löffel, and nobody contradicts him." },
            { seen: "lunch_schnitzel_gate", text: "Schnitzel Thursday is not a menu, it is a legal position. Reach for the last one and you are reaching for somebody else's property." },
            { seen: "lunch_chili_war",      text: "With the chilli, entitlement comes before the queue. Whoever has closed three deals is hungrier — that is the reasoning, and it is meant seriously." },
            { seen: "lunch_microwave_war",  text: "One microwave out of three works. Warm fish up in it and you have ten minutes, and a reputation for the rest of the day." },
            { seen: "lunch_throat_singing", text: "The Diversity Lunch put a Mongolian throat-singing band in the middle of the room. The tables vibrated. Nobody left." },
            { seen: "lunch_canteen_crash",  text: "The till installs updates while it is running, one of forty-five, with a full tray in front of it. There is no emergency mode, there is only the queue." },
            { seen: "lunch_sponsorenlauf",  text: "Where partners lay on a buffet, the limit on gifts is closer than the dessert." }
        ]
    },
    {
        id: "aufzug",
        cat: "place",
        name: "The Lift",
        role: "Between the second and third floor",
        summary: "Reliably stops in the same place. Take it and you save yourself stairs and risk a conversation.",
        seen: ["cof_elevator_stuck_1", "cof_elevator_2a"],
        notes: [
            { seen: "cof_elevator_stuck_1", text: "Gets stuck between the second and third floor. Always there, never anywhere else." },
            { seen: "cof_elevator_2a",      text: "The emergency stop button is not used in here for emergencies, it is used for a word in private." },
            { seen: "cof_elevator_stuck_1", text: "Take the stairs and you lose a minute. Take the lift and you sometimes lose twenty." }
        ]
    },
    {
        id: "rack7",
        cat: "place",
        name: "Rack 7",
        role: "Server room, back row",
        summary: "The rack where everything collects that has no business in the server room. It is never broken. It is only different.",
        seen: ["srv_red_1", "srv_red_2a", "srv_schacht_3"],
        notes: [
            { seen: "srv_red_1",     text: "A deep red, sticky puddle forms underneath it. There is no pipe above the rack that would explain it." },
            { seen: "srv_red_2a",    text: "Sugar draws ants. Ants build nests. The place they like building them best is a switch worth ten thousand euros." },
            { seen: "srv_schacht_3", text: "Has been running differently lately, according to Kevin. Not broken, only different — and the logs bear him out." }
        ]
    },
    {
        id: "ostfluegel",
        cat: "place",
        name: "The East Wing",
        role: "Stairwell, third floor",
        summary: "The way to the archive, and the only floor where you can feel the building working against you.",
        seen: ["sq_brandtuer_1", "sq_brandtuer_2"],
        notes: [
            { seen: "sq_brandtuer_1",       text: "The fire door has been too heavy since the refurbishment. Push boxes through it every day and you find a solution — usually one that cancels the fire protection." },
            { flag: "sq_brandtuer_frei",    text: "Close the door properly once and it takes less than two days for an all-staff email to honour the incident. This building responds faster to reports than to problems." },
            { seen: "sq_brandtuer_2",       text: "A door wedge is available from facilities management. That has been on the wall since the incident and was nowhere at all before it." }
        ]
    },
    {
        id: "raum_211",
        cat: "place",
        name: "Room 2.11",
        role: "Meeting room, free according to the bookings",
        summary: "A room that officially stands empty and is never empty. Whoever is sitting in here belongs — and that is proof enough for this building.",
        seen: ["sq_berater_1", "sq_berater_2", "sq_berater_3"],
        notes: [
            { flag: "sq_berater_drin",  text: "Listed as free in the room bookings. Go and look and you find somebody in there all the same, with a laptop and a name badge." },
            { seen: "sq_berater_2",     text: "An appointment makes you more real in here than a remit does. Put one in and you exist; have none and you have some explaining to do." },
            { seen: "sq_berater_3",     text: "SYNERGY is permanently on the flip chart, in three circles. New points get written into them, old ones are never rubbed out." }
        ]
    },
    {
        id: "nl_sued",
        cat: "place",
        name: "Southern Branch",
        role: "A site, never set foot in",
        summary: "Exists as a phone number and as handwriting on notes. Nobody here has ever seen it.",
        seen: ["call_tennis_1", "call_tennis_2", "call_tennis_3"],
        notes: [
            { seen: "call_tennis_1",    text: "Ring there and you leave a message. Leave a message and you get a note back. That is how correspondence comes about without a conversation." },
            { flag: "call_tennis_laeuft", text: "Mr Leuchter is on a call, in a meeting, in a workshop. It is always true and never helpful." },
            { seen: "call_tennis_3",    text: "If you do get through one day, the matter has settled itself. The most stable solution this company knows." }
        ]
    },

    /* ----------------------------------------------------------------- MATTERS */
    {
        id: "ticket_108",
        cat: "matter",
        name: "Ticket 108",
        role: "Open for seven years",
        summary: "The oldest open ticket in the company. It has outlived three heads of IT and one caller who never gave up.",
        seen: ["call_grabowski_1", "call_grabowski_2"],
        notes: [
            { seen: "call_grabowski_1",    text: "Subject: umlauts in label printing incorrect. Raised before your time, status unchanged ever since." },
            { flag: "call_grabowski_akte", text: "The solution is a tick in the print settings. It probably always was." },
            { seen: "call_grabowski_2",    text: "A test label reading 'Greetings from Lübeck' closes a matter three predecessors failed at. It takes four minutes." }
        ]
    },
    {
        id: "transformation",
        cat: "matter",
        name: "The Transformation Project",
        role: "Has existed since one kick-off",
        summary: "A project that exists solely because somebody said it out loud and put a meeting in the calendar for it. That is exactly how all of them come about here.",
        seen: ["sq_berater_1", "sq_berater_3"],
        notes: [
            { seen: "sq_berater_1",     text: "Began with a man in grey without a pass, who used the word as though it explained everything." },
            { flag: "sq_berater_drin",  text: "The room bookings had never heard of it, the calendar had. Four acceptances were enough to turn it into a matter." },
            { seen: "sq_berater_3",     text: "Objections are not fended off, they are taken on board. Say 'security culture' and you find the words again afterwards in one of the three circles." }
        ]
    },
    {
        id: "rademacher",
        cat: "matter",
        name: "The Rademacher Account",
        role: "Head of IT until 2016",
        summary: "Your predecessor's predecessor has been gone for years. His user account has not. It books, it logs in, it lives.",
        seen: ["sq_raum_phoenix_2c"],
        notes: [
            { seen: "sq_raum_phoenix_2c", text: "Never closed down. Nobody could say whose job that would have been." },
            { seen: "sq_raum_phoenix_2c", text: "Has been booking a meeting room for months against a project that does not exist." },
            { seen: "sq_raum_phoenix",    text: "As long as the room is booked, nobody asks. An entry in the calendar is a sufficient explanation around here." }
        ]
    },
    {
        id: "gruender",
        cat: "matter",
        name: "Baron von Greed",
        role: "Founder of the company",
        summary: "Leaves instructions in places where nobody looks for them, and a founding year that only turns up again on a toilet door.",
        seen: ["srv_legacy_1", "srv_legacy_2"],
        notes: [
            { seen: "srv_legacy_1", text: "According to the note, his hatch in the server room may only be opened in the event of the end of the world or a stock market crash. One of the two conditions is a matter of interpretation." },
            { seen: "srv_legacy_2", text: "The safe behind it asks for the year the company was founded. It is in no manual, but Kevin has written it on a toilet door." },
            { seen: "srv_legacy_2", text: "To find his legacy you have to crawl through a ventilation shaft. That is presumably deliberate." }
        ]
    },
    {
        id: "betriebsrat",
        cat: "matter",
        name: "The Works Council",
        role: "Meets monthly",
        summary: "Takes every concern very seriously and deals with it next time. Next time is always after the problem.",
        seen: ["cof_deka_1", "call_chantal_umfrage", "cof_kaffeekasse_2b"],
        notes: [
            { seen: "cof_deka_1",           text: "A concern becomes agenda item fourteen. The meeting is next month, the pilot runs this week." },
            { seen: "cof_kaffeekasse_2b",   text: "It becomes responsible for the coffee kitty the moment somebody uses the word honesty." },
            { seen: "call_chantal_umfrage", text: "Surveys on the mood in the building are welcomed by it and evaluated by other people." }
        ]
    },
    {
        id: "kuehlschrank",
        cat: "matter",
        name: "The Fridge Regulations",
        role: "Kitchenette, unwritten law",
        summary: "The most strictly enforced body of rules in the building. It is written down nowhere and everybody knows it.",
        seen: ["call_fridge_1", "cof_elster_razzia", "lunch_mettigel"],
        notes: [
            { seen: "call_fridge_1",     text: "The appliance is called the Coolio 3000 and reports itself in on an internal extension. Switch off the milk sensor and you lose a witness." },
            { seen: "cof_elster_razzia", text: "Ms Elster is in charge. Nobody appointed her, and nobody objected either." },
            { seen: "lunch_mettigel",    text: "The rules do not apply on birthdays. Four hours of high summer and one Mettigel prove that this is a mistake." }
        ]
    },
    {
        id: "kaffeekasse",
        cat: "matter",
        name: "The Honesty Box",
        role: "In the red for years",
        summary: "A piggy bank next to a tally sheet. The sheet is always right, the box never. Both count as laws of nature.",
        seen: ["cof_kaffeekasse", "cof_falle_letzte_tasse"],
        notes: [
            { seen: "cof_kaffeekasse",       text: "Thirty-four marks since Monday. Contents: one button, one paper clip, one receipt from 2023." },
            { seen: "cof_falle_letzte_tasse", text: "You pay by the tally sheet, not by what you drink. Count honestly and you are paying for other people — anybody who has counted honestly once knows that." },
            { seen: "cof_kaffeekasse",       text: "The word honesty in the name is not a description, it is a task. Nobody has taken it on so far." }
        ]
    },
    {
        id: "notfallplan",
        cat: "matter",
        name: "Emergency Plan 2009",
        role: "Strictly confidential, behind Rack 4",
        summary: "A dusty folder your predecessor deposited there. Or hid. The difference can no longer be established.",
        seen: ["srv_folder_2009", "srv_folder_2009_2a"],
        notes: [
            { seen: "srv_folder_2009",     text: "Has stood behind the rack since 2009. In that time there have been three heads of IT and not one emergency that asked for it." },
            { seen: "srv_folder_2009_2a",  text: "On page 34 a floor plan is stuck in: spare key to the server room, ceiling tile 4. The tile sits crooked to this day." },
            { seen: "srv_folder_2009",     text: "Whatever is called strictly confidential in this building is usually lying about in the open. Just in the places where nobody looks." }
        ]
    },
    {
        id: "prinz",
        cat: "matter",
        name: "HRH Prince Abubakar",
        role: "Royal Bank of Zamunda",
        summary: "The only advance-fee scam in world history that was not one. That does not make the business any better, only more complicated.",
        seen: ["sq_real_prince", "sq_prince_return", "call_domain_2a", "cof_kaffeekasse_2d"],
        notes: [
            { seen: "sq_real_prince",    text: "Twenty-five million in a trust fund, thirty per cent for the partner. As proof, a photograph on a golden throne, that day's newspaper in hand." },
            { flag: "prince_active",     text: "Send the IBAN and money really does arrive. Seven point five million, within seconds. The question is no longer whether it was real, but why everybody warned you." },
            { seen: "call_domain_2a",    text: "Charges on his card trigger a call from the fraud department. 'Money-laundering concealment' is apparently a reason that passes muster there." },
            { seen: "sq_prince_return",  text: "One surviving uncle and a counter-revolution later he wants it all back. Refuse to pay and you are threatened with Interpol — and a black van with no plates outside your window." },
            { seen: "cof_kaffeekasse_2d", text: "His card in somebody else's hand produces rumours that cannot be denied. A denial only confirms them." }
        ]
    },
    {
        id: "wc_fall",
        cat: "matter",
        name: "The Case of the Smallest Room",
        role: "Gents, second floor",
        summary: "Three incidents in one week, and a crime scene that is cleared away every time before anybody sees it. The only case in this building that could actually be solved.",
        seen: ["sq_wc_fall_1", "sq_wc_fall_2", "sq_wc_fall_3"],
        notes: [
            { flag: "wc_fall_offen", text: "Shoe size thirty-eight from the print on the cubicle door. Nobody in the whole building wears that." },
            { seen: "sq_wc_fall_2",  text: "The green can is an energy drink you cannot buy here. According to Kevin it is drunk by people on pocket money." },
            { flag: "wc_fall_spur",  text: "All three incidents fell on afternoons. The management's visitor pass was used on exactly those three afternoons and on no others." },
            { seen: "sq_wc_fall_3",  text: "The culprit is twelve, waiting for his father and bored. Three days of detective work, and in the end the only thing that helps is offering him a chair." },
            { seen: "sq_wc_fall_1",  text: "Egon cleans it away, every time, without resentment. That is the real scandal of the business." }
        ]
    },
    {
        id: "anruferin",
        cat: "matter",
        name: "The Woman from Head Office",
        role: "Does not exist, rings anyway",
        summary: "Friendly, well informed, with the right number on the display. Everything about her checks out except the department she names — and that department does not exist in this company.",
        seen: ["boss_falsche_nummer", "srv_nach_anruf", "srv_nach_anruf_2"],
        notes: [
            { seen: "boss_falsche_nummer", text: "She knows your name and your extension before she wants anything. That is precisely the part you cannot explain afterwards." },
            { flag: "path_boss_anruf_geprueft", text: "One single question back, one only a colleague could answer, is enough. After that the call is over within seconds." },
            { seen: "srv_nach_anruf",   text: "She does not ring once, she rings four times, in different departments. Every single call is harmless." },
            { flag: "path_boss_anruf_liste", text: "The gate, stores, sales, IT — from the bottom upwards. On every call she knows a little more than on the one before, and the knowledge comes from the building itself." },
            { seen: "srv_nach_anruf_2", text: "The last call went to you. Anyone who has seen that order once recognises it next time by the second call." }
        ]
    },
    {
        id: "karteileiche",
        cat: "matter",
        name: "The Ghost Account",
        role: "An account with no person",
        summary: "Whoever leaves disappears from the canteen, from the mailing list and from memory. Not from the system.",
        seen: ["call_bernd_rechner", "sq_bernd_schreibtisch", "sq_raum_phoenix_2c"],
        notes: [
            { seen: "call_bernd_rechner",   text: "A fresh invoice approval carries a handler who has not been in the building since February. Ms Elster notices that sort of thing, nobody else does." },
            { seen: "sq_bernd_schreibtisch", text: "The successor sits at the same machine, with the same login. It works, so nobody changes it." },
            { seen: "sq_raum_phoenix_2c",   text: "An account from 2016 is still booking rooms today. Responsible for closing it down would have been: nobody. It needs no leave, it does not resign and it never complains." }
        ]
    },
    {
        id: "premium_trick",
        cat: "matter",
        name: "The Premium Trick",
        role: "Kitchenette, passed on by word of mouth",
        summary: "Press espresso, hold the cup sensor shut, wait. The machine gives out the expensive roast. Every time.",
        seen: ["call_chef_kaffeetrick", "cof_kaffeetrick_schlange"],
        notes: [
            { seen: "cof_kaffeetrick_schlange", text: "Seven people in the queue, every one of them holding the sensor shut. The machine makes a noise while it happens that nobody can miss." },
            { seen: "call_chef_kaffeetrick",    text: "Feel-good management asks whether IT knows anything about it. IT knows a great deal about it." },
            { seen: "cof_kaffeetrick_schlange", text: "No notice, no email, no chat. The knowledge travels by word of mouth alone and still faster than any all-staff email." }
        ]
    },
    {
        id: "hof_maeuse",
        cat: "matter",
        name: "The Mice in the Courtyard",
        role: "Courtyard, population growing",
        summary: "A humane solution with consequences. Catch them inside and let them go outside and you have solved nothing, only moved it.",
        seen: ["call_maus_hof", "sq_maus_falle"],
        notes: [
            { seen: "call_maus_hof",  text: "One becomes three. One of them, according to Egon, knows its way suspiciously well around the paper tray." },
            { seen: "sq_maus_falle",  text: "Two live traps, both empty, both baits gone. Egon's only comment: cleverer than sales." },
            { seen: "call_maus_hof",  text: "Egon never sounds reproachful about this sort of thing, he sounds professionally interested. That is worse." }
        ]
    },
    {
        id: "bandarchiv",
        cat: "matter",
        name: "The Tape Archive",
        role: "Server room, bottom row",
        summary: "Forty cartridges with abbreviations nobody can decode any more. There is not a drive left in the building that reads them.",
        seen: ["srv_dat_archiv", "call_cnc_emulator"],
        notes: [
            { seen: "srv_dat_archiv",     text: "Labelled by a system that left with the man who invented it. Right at the bottom lies one that breaks the pattern." },
            { seen: "call_cnc_emulator",  text: "Old technology never disappears here, it is only needed less often. Until it is suddenly keeping four machines running at once." },
            { seen: "srv_dat_archiv",     text: "Nobody is allowed to throw it away, nobody is able to read it. The only stable state for data in this building." }
        ]
    },
    {
        id: "wochenmeeting",
        cat: "matter",
        name: "The Weekly Meeting",
        role: "Friday afternoon, meeting room",
        summary: "The close of every working week. You report what happened and learn in the process what it is supposed to have been in reality.",
        seen: ["meet_review_1", "meet_synergie_1", "meet_kennzahlen_1", "meet_beamer_1", "meet_tool_1", "meet_neuling_1"],
        notes: [
            { seen: "meet_review_1",    text: "There is always somebody external at the table. He is introduced as though his presence were the news." },
            { seen: "meet_beamer_1",    text: "The projector is on the wrong input. Every time. Fix it and what gets noted is IT's response time, not the thanks." },
            { seen: "meet_kennzahlen_1", text: "Your own week appears as a chart in which one bar has no label. It gets explained regardless." },
            { seen: "meet_synergie_1",  text: "What is said in here ends up in the minutes. What ends up in the minutes had been said — and afterwards nobody can untangle which came first." },
            { seen: "meet_neuling_1",   text: "Sentences from this room turn up in presentations weeks later, under the heading 'Voices from the Organisation'." },
            { seen: "meet_tool_1",      text: "Now and then what is being sold is what you already own. You can tell by the column headings." }
        ]
    },
    {
        id: "berater",
        cat: "matter",
        name: "The Consultants",
        role: "Synerqon · Norden & Kessler · McKandy",
        summary: "Three firms, one manner. They have been accompanying the transformation for years and are agreed that it is not finished yet.",
        seen: ["meet_review_1", "meet_synergie_1", "meet_kennzahlen_1", "meet_tool_1", "meet_neuling_1"],
        notes: [
            { seen: "meet_review_1",     text: "With them a description turns into a finding: say that it is running and you have a resource alignment deficit with a reactive escalation culture." },
            { seen: "meet_kennzahlen_1", text: "Their figures come from the intranet dashboard that has been broken since 2019. Nobody in the room knows that except you." },
            { seen: "meet_synergie_1",   text: "Every gap is called a delta, and every delta is defined in a workshop. The workshop costs the budget of four posts." },
            { seen: "meet_neuling_1",    text: "The new one reads the questions off a printed running order and turns the sheet away. After two years he does it from memory." },
            { seen: "meet_tool_1",       text: "Contradiction does not put them off their stride. 'We have customised it for you' answers the accusation that it is your own product as well." }
        ]
    }
];
