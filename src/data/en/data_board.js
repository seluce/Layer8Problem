/**
 * The community board.
 *
 * i18n-status: translated
 *
 * 215 fields reach scan-fields, but only 114 of them are text: `paper` (29),
 * `tilt` (29), `pin` (26), `titleTone` (14) and `edge` (3) are CSS values -
 * hex colours and degrees - and `kind` picks the layout. None of those keys
 * sits in the tools' ID_KEYS, so the scanner counts them as prose; they are
 * 101 values that contain no word at all and are byte-identical here on
 * purpose. This is the mirror image of the appName find in the errand pool:
 * there an identifier looked like text, here CSS does.
 *
 * Of the 114 real text places 109 are translated. Five are deliberately
 * identical, and they are named rather than counted:
 *
 *   board_yoghurt.sign  "- Kevin (IT)"               name plus an initialism
 *   board_quantum.sign  "- MegaCorp Industries CEO"  a company name (§3)
 *   board_sleep.dept    "HR Management"              already English
 *   board_vibes.sign    "- Marketing"                the same word in both
 *   board_phoenix.sign  "- P."                       an initial
 *
 * Only the MegaCorp line clears lint-parity's four-word floor, so the pool
 * reports 1 there and not 0. Inside translated fields a few names likewise
 * stand unchanged: Bi-Fi Roll (§5), ShredMaster 3000 and GlobalCorp (§3),
 * Weser-Kurier and Regional-Anzeiger (newspaper mastheads travel as names),
 * Hubert the ficus, the mug print "World's Okayest Employee", "Safe Space"
 * and the hashtags - all of which the German already writes as they stand.
 *
 * Taken from the contract, not decided here (GLOSSAR §3c, §3, §1): Teeküche ->
 * kitchenette, Raum 'Kreativ 2' -> 'Creative 2', Achtsamkeits-Ecke ->
 * Mindfulness Corner, Netzwerkschrank -> network cabinet, Revision -> Internal
 * Audit, Controlling -> Financial Control, Rundmail -> all-staff email,
 * Buchhaltung -> Accounts, Vertrieb -> Sales, Empfang -> Reception, Azubi ->
 * apprentice, Facility Management -> facilities management, Parkplatz 14 ->
 * Parking space 14, Rack 3 and Room K3 keep their digits.
 *
 * "Die Kostenstellen" becomes 'The Cost Centres': the band is named after an
 * accounting line, and the meaning IS the name (§3c, joke names go English).
 *
 * board_plant's signature is one of the ten address places for this block -
 * "Frau Kowalski" is prose, not a card heading, so she is Ms Kowalski (§3c).
 *
 * "Die gesamte 2. Etage" signs two different notices in the German and is a
 * deliberate refrain; both English signatures are therefore word for word the
 * same, as they are in the source.
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

    {
        id: "board_gala_rumour", kind: "note", paper: "#fce7f3", tilt: "-2deg", pin: "#db2777",
        title: "A question for the room", titleTone: "#9d174d",
        body: "Has any of you actually ever been to this <strong>Synergy Gala</strong>? <br>Four years I have worked here and I have never seen an invitation. Word is not everybody gets one. <br>Word is you have to earn it. Off whom, exactly?",
        sign: "- (no name)"
    },

    // ---------- The originals ----------
    {
        id: "board_yoghurt", kind: "note", paper: "#fef9c3", tilt: "1deg", pin: "#dc2626",
        title: "TO THE YOGHURT THIEF!!!", titleTone: "#b91c1c",
        body: "Whoever took my <strong>Bi-Fi Roll</strong> out of the fridge: <br>I have hacked the canteen's security cameras. I know you wear red trainers. <br>Put it back. You have 24h.",
        sign: "- Kevin (IT)"
    },
    {
        id: "board_yoghurt_reply", kind: "tape", paper: "#eff6ff", tilt: "-2deg",
        body: "Dear Kevin,<br>1. That was not a Bi-Fi, that was an experiment belonging to the biology department (mould culture 'Delta-9').<br>2. If you have eaten it, you should be seeing a doctor as a matter of urgency rather than writing threatening letters.<br>Best wishes, Dr Brinkmann"
    },
    {
        id: "board_quantum", kind: "quote", paper: "#fef9c3", tilt: "-1deg", pin: "#15803d",
        title: "Subj: Project 'Quantum Cloud'",
        body: "'Dear Sales Team,<br>many thanks for the implementation of the \"AI-driven real-time database\".<br><br>We do not in fact know why it looks like an Excel spreadsheet from 1998, or why one of your staff has to key data in by hand every morning, but the performance is impressive!<br>Happy to work with you again!'",
        sign: "- MegaCorp Industries CEO"
    },
    {
        id: "board_sleep", kind: "official", paper: "#ffffff", tilt: "0deg", pin: "#1e3a8a",
        icon: "⚖️", dept: "HR Management",
        title: "Initiative: 'Work-Life Integration'",
        body: "In order to reduce stress, we are introducing the 'sleep-at-your-desk' concept. <br><strong>The rules:</strong>",
        items: ["Three minutes per eye, maximum.", "The mouse must be moved throughout (use your reflexes).", "Dreaming about the competition is prohibited (breach of NDA)."],
        foot: "'He who sleeps commits no sin. But he does no work either. So you had better sin.' - Dr. Wichtig"
    },
    {
        id: "board_shredder", kind: "tearoff", paper: "#ffffff", tilt: "2deg", pin: "#16a34a",
        title: "FREE TO A GOOD HOME", sub: "Shredder 'ShredMaster 3000'",
        body: "Technically it still works, but the blades are blunt. <br>It does not cut the paper, it merely <strong>chews</strong> it. The documents come back out warm, damp and in a lump.<br>It also makes noises that sound as though it were quietly weeping.",
        note: "To be given away only to tinkerers or exorcists. I cannot take it emotionally any more.",
        tabs: ["Take it!", "Free", "Please", "Help", "Dare"]
    },
    {
        id: "board_paperless", kind: "press", paper: "#e5e7eb", tilt: "0deg", pin: "#1e293b",
        title: "Weser-Kurier (Archive 1998)",
        sub: "'GlobalCorp promises: the paperless office is coming!'",
        body: "Visionary founder Dr. Wichtig declared today that printers will soon be found only in museums. 'We are going all in on floppy disks and thought transference,' said the CEO at the opening of the new headquarters out on the moor.",
        stamp: "Aged well. - Kevin"
    },
    {
        id: "board_biohazard", kind: "alert", paper: "#ffffff", tilt: "1deg", pin: "#dc2626", edge: "#dc2626",
        title: "Security Warning, Level Red",
        sub: "Subj: Biological hazard in fridge 2",
        body: "Following the 'Bi-Fi incident', the kitchenette on the second floor is a <strong>restricted zone</strong> until further notice. A team in protective suits is on its way.<br><br>Please breathe only shallowly in the corridor.",
        sign: "- Facilities Management (Egon)"
    },

    // ---------- Everyday life at GlobalCorp ----------
    {
        id: "board_parking", kind: "note", paper: "#fef9c3", tilt: "-1deg", pin: "#2563eb",
        title: "PARKING SPACE 14", titleTone: "#0f172a",
        body: "To the colleague with the silver estate: parking space 14 is <strong>my</strong> parking space. It has been for eleven years. There is no sign, because there does not need to be one.<br>The building knows that. Now you know it too.",
        sign: "- A colleague from the third floor"
    },
    {
        id: "board_parking_reply", kind: "tape", paper: "#ffffff", tilt: "2deg",
        body: "There is no sign because parking space 14 is a <strong>disabled parking space</strong>. It has been for four years. We have written to you twice.<br>Kind regards, Facilities Management"
    },
    {
        id: "board_band", kind: "note", paper: "#f3e8ff", tilt: "2deg", pin: "#9333ea",
        title: "BAND PRACTICE: WE WANT YOU", titleTone: "#6b21a8",
        body: "The company band <strong>'The Cost Centres'</strong> is looking for a bass player. We rehearse on Thursdays in storeroom K3.<br>No experience necessary. Frankly none of us has any. You can hear that.",
        sign: "- Ronny (Sales)"
    },
    {
        id: "board_plant", kind: "note", paper: "#dcfce7", tilt: "-2deg", pin: "#15803d",
        title: "WANTED: PLANT GUARDIAN", titleTone: "#166534",
        body: "The ficus in the corridor on the second floor needs somebody from Monday. I am retiring.<br>His name is Hubert. He does not care for direct sunlight, nor for people who talk about him while he is listening.",
        sign: "- Ms Kowalski (37 years at GlobalCorp)"
    },
    {
        id: "board_printer_poem", kind: "note", paper: "#ffffff", tilt: "1deg", pin: "#475569",
        title: "ODE TO THE PRINTER ON THE THIRD FLOOR", titleTone: "#334155",
        body: "<em>You stand there, grey and making no sound,<br>I sent my document to you.<br>That was in May. It is autumn now.<br>I have given up on hope.</em><br><br>Whoever repairs the printer gets a cake. I mean that seriously.",
        sign: "- Anonymous (second floor, you know the one)"
    },
    {
        id: "board_lost_mug", kind: "note", paper: "#eff6ff", tilt: "0deg", pin: "#1e40af",
        title: "MISSING: MUG", titleTone: "#1e3a8a",
        body: "White mug, printed <strong>World's Okayest Employee</strong>, small crack on the handle.<br>Last seen on Tuesday in the dishwasher. The dishwasher denies everything.<br>No questions, no charges. I simply want it back.",
        sign: "- Accounts, first floor"
    },
    {
        id: "board_ergonomics", kind: "official", paper: "#ffffff", tilt: "-1deg", pin: "#1e3a8a",
        icon: "🪑", dept: "Health & Safety",
        title: "New Seating Posture Policy",
        body: "Following the inspection by the external assessor, the following apply with immediate effect:",
        items: ["The back forms an angle of exactly 100 degrees with the thigh.", "Both feet rest flat on the floor (this also applies during video calls).", "The screen stands one arm's length away. Your arm's length, not the assessor's."],
        foot: "Breaches will not be penalised, but they will be noted. - Health & Safety"
    },
    {
        id: "board_chair", kind: "tearoff", paper: "#fffbeb", tilt: "-2deg", pin: "#b45309",
        title: "FREE TO A GOOD HOME", sub: "Office chair, height-adjustable (allegedly)",
        body: "The chair sinks slowly while you are sitting on it. After about forty minutes you are sitting at knee height and looking up at the screen.<br>You get used to it. You get used to everything.",
        note: "Collection with a second person only. It is heavier than it looks.",
        tabs: ["Yes", "Why not", "Emergency", "Whatever", "No"]
    },
    {
        id: "board_press_moor", kind: "press", paper: "#e5e7eb", tilt: "1deg", pin: "#1e293b",
        title: "Regional-Anzeiger (Archive 2009)",
        sub: "'GlobalCorp opens the region's most modern data centre'",
        body: "The server room has been 'laid out to be future-proof for decades to come', Management stressed at the opening. Particular pride was expressed at the 'generous air conditioning'.",
        stamp: "Rack 3 sounds different. - IT"
    },
    {
        id: "board_survey", kind: "official", paper: "#ffffff", tilt: "1deg", pin: "#047857",
        icon: "📊", dept: "Corporate Development",
        title: "Result of the Staff Survey",
        body: "Thank you for taking part. The key findings:",
        items: ["94% would like more appreciation.", "91% would like fewer meetings.", "We have accordingly introduced a meeting about appreciation."],
        foot: "The survey will be repeated next quarter. - Corporate Development"
    },
    {
        id: "board_microwave", kind: "alert", paper: "#ffffff", tilt: "-1deg", pin: "#ea580c", edge: "#f97316",
        title: "Final Warning: Microwave",
        sub: "Subj: Fish",
        body: "There was an announcement. There was a second announcement. There was an all-staff email with a read receipt.<br>Whoever heated <strong>salmon</strong> at 12:40 on Tuesday knows who is meant.",
        sign: "- The entire second floor"
    },
    {
        id: "board_carpool", kind: "note", paper: "#fefce8", tilt: "2deg", pin: "#ca8a04",
        title: "CAR SHARE FROM BREMEN-NORD", titleTone: "#1e293b",
        body: "Still looking for two passengers. Departure 07:10.<br><strong>Conditions:</strong> no radio, no conversation before 08:00, no discussion of the route.<br>Otherwise a very pleasant atmosphere.",
        sign: "- H. Bergmann (Financial Control)"
    },
    {
        id: "board_lottery", kind: "note", paper: "#ffffff", tilt: "-1deg", pin: "#ef4444",
        title: "LOTTERY SYNDICATE", titleTone: "#dc2626",
        body: "We play every Friday. Stake €5. <strong>Twelve colleagues, eleven years, not a single win.</strong><br>But the thought of handing in our notice together on a Monday keeps us alive.",
        sign: "- List is up in the kitchenette"
    },
    {
        id: "board_language", kind: "official", paper: "#ffffff", tilt: "0deg", pin: "#4338ca",
        icon: "💬", dept: "Internal Communications",
        title: "Language Guide 2026",
        body: "To sharpen our shared communication culture we are replacing, with immediate effect:",
        items: ["'problem' with 'challenge'", "'mistake' with 'learning curve'", "'we have no budget' with 'we are prioritising differently'"],
        foot: "The guide is binding. Queries are a challenge. - Internal Communications"
    },

    // ---------- Reactive: only appear when the player caused them ----------
    {
        id: "board_vinegar", kind: "note", paper: "#fffbeb", tilt: "2deg", pin: "#d97706",
        reqStory: "path_kalk_essig",
        title: "WHO 'OPTIMISED' THE COFFEE?", titleTone: "#92400e",
        body: "Since yesterday the coffee has tasted of <strong>salad</strong>. Not of bad coffee. Of salad.<br>We are not investigating, we simply want it to stop.",
        sign: "- The entire second floor"
    },
    {
        id: "board_instant", kind: "note", paper: "#ffffff", tilt: "-2deg", pin: "#334155",
        reqStory: "path_kalk_ignor",
        title: "COFFEE FOR SALE", titleTone: "#1e293b",
        body: "Instant, hot, available at once. <strong>50 cents</strong> a cup, every tenth one free.<br>Kettle standing ready. Cash only. No refunds.",
        sign: "- K. (apprentice office, back right)"
    },
    {
        id: "board_meetingpoint", kind: "note", paper: "#eff6ff", tilt: "1deg", pin: "#2563eb",
        reqStory: "path_karton_kult",
        title: "RESERVATION: MEETINGPOINT K1", titleTone: "#1e3a8a",
        body: "Thursday, 14:00, birthday gathering for Accounts. <strong>Please keep the box clear.</strong><br>The pot plant stays where it is on top, it is part of the furniture by now.",
        sign: "- Gabi (Reception)"
    },
    {
        id: "board_vibes", kind: "note", paper: "#fdf2f8", tilt: "-1deg", pin: "#ec4899",
        reqStory: "path_licht_hart",
        title: "RIP MINDFULNESS CORNER", titleTone: "#db2777",
        body: "Some people are frightened of energy. <br>The corner on the second floor was a <strong>Safe Space</strong>. Now it is a corridor with a network cabinet in it again.<br>#officevibes #rip",
        sign: "- Marketing"
    },
    {
        id: "board_phoenix", kind: "note", paper: "#ffffff", tilt: "0deg", pin: "#0f172a",
        reqStory: "path_phoenix_storno",
        title: "ROOM 'CREATIVE 2'", titleTone: "#1e293b",
        body: "The standing booking was cancelled without consultation.<br><strong>That was a mistake.</strong> Not formally. But a mistake.",
        sign: "- P."
    },
    {
        id: "board_egon_deal", kind: "tape", paper: "#fefce8", tilt: "2deg",
        reqStory: "path_exting_lager",
        body: "To IT: the stock in <strong>K3</strong> has been topped up again.<br>Two fire extinguishers, tested, sticker valid to 2029.<br>I shall say nothing if you say nothing.<br>— E."
    },
    {
        id: "board_audit", kind: "alert", paper: "#ffffff", tilt: "1deg", pin: "#dc2626", edge: "#dc2626",
        reqStory: "path_gemba_show",
        title: "Note from Internal Audit",
        sub: "Subj: Observed working practices",
        body: "During the most recent walk-round, a <strong>remarkable focus technique</strong> was documented in IT.<br>We request that the methodology be submitted for group-wide assessment.",
        sign: "- Group Internal Audit"
    },
    {
        id: "board_wiki", kind: "note", paper: "#ecfdf5", tilt: "-2deg", pin: "#059669",
        reqStory: "path_kevin_tutorial",
        title: "NEW: THE IT WIKI", titleTone: "#065f46",
        body: "There is now a <strong>guide to screen brightness</strong>. With pictures.<br>Further articles will follow as further problems arise. They will arise.",
        sign: "- Kevin from IT"
    }
];
