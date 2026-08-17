// i18n-status: translated
// Two names are identical to the German on purpose: "Hammer" is the same word
// in both languages, and "Death Metal Tape" is already English in the source
// (the side titles are media text, GLOSSAR §2a). Both sit below lint-parity's
// four-word threshold and never show up on its list.

/**
 * Every item in the game.
 *
 * `use` decides whether an item can be used at all - no use block, no button,
 * no dialog. It carries what using it costs, what the confirmation dialog says
 * and what lands in the log, because all of that is text and numbers rather
 * than logic. Until 4.1 the same knowledge sat in four places: a keep flag
 * here, a CONSUMABLES list in two components, and two if-chains in
 * engine_inventory.js. A new snack meant editing five spots.
 *
 *   use.a / use.l     how far aggro and laziness drop (negative numbers)
 *   use.desc          the line above the confirm button
 *   use.warn          the small print below it
 *   use.log           what the log says afterwards
 *   use.color         Tailwind class for that log line
 *   use.b / use.rep   what using it COSTS: boss radar and standing with a
 *                     character. Same clamps as the event path. Trade-off
 *                     items live on these two - relief now, paid for later.
 *   use.cooldown      minutes before it works again; only for items with
 *                     keep: true, which are not consumed by using them
 * `passive` works without a button: it fires when an event OPENS, gated by
 * the character on screen (passive.onChar). Fields l/a/b shift the bars,
 * log/color go into the protocol - mandatory, because a number appearing
 * without a click looks like a bug otherwise.
 *
 * The effect letters are the same four an option uses - m minutes, l laziness,
 * a aggro, b boss - so one convention covers everything an author writes. Up
 * to 6.0 the blocks here spelled them fl/al/cr, the names of the running state.
 *
 *   use.wait          what the log says while it is still cooling down.
 *                     Each item phrases its own pause; without it the line
 *                     falls back to a neutral sentence.
 *
 * keep: true means the item survives being used. Everything else with a `use`
 * block disappears from the backpack.
 */
export const items = {

    // CONSUMABLES (single use)
    "wifi_note": { icon: "🏷️", name: "Wi-Fi note", flavor: "'The password is: 1234abcd. Please do not pass it on.' - Egon. There is probably a copy of it stuck to the router in the break room.", img: "assets/img/items/wifi_note.webp" },
    "donut": { icon: "🍩", name: "Stale doughnut", flavor: "'Hard as a rock, but sugar is sugar. A tough survivor from the last management meeting three weeks ago.'", img: "assets/img/items/donut.webp",
        use: { a: -15,
               desc: "Lowers AGGRO by -15. Comfort made of dough.",
               warn: "A one-off pleasure (the love handles stay for ever). The doughnut is gone afterwards.",
               log:  "Mmmh... sugar glaze. The rage melts away. (Aggro -15)",
               color: "text-pink-400" } },
    "energy": { icon: "⚡", name: "Energy drink", flavor: "'Tastes of gummy bears and an approaching panic attack. Once you have drunk it you can hear colours and time slows down noticeably.'", img: "assets/img/items/energy.webp",
        use: { l: -15,
               desc: "Lowers LAZINESS by -15. Liquid palpitations.",
               warn: "Down it in one! The can is empty afterwards. No deposit, no returns.",
               log:  "HISS! You down the energy drink. Your heart is racing, but you are wide awake. (Laziness -15)",
               color: "text-blue-400" } },
    "secret_list": { icon: "📁", name: "The Blacklist", flavor: "'Anyone on this list can start packing boxes. Pure, uncensored gold that HR would kill for.'", img: "assets/img/items/secret_list.webp" },
    "arg_list_1": { icon: "📋", name: "Arguments (Me)", flavor: "'1000 tickets solved. 0 thanks. That changes today. Armed with these facts you are ready to leave the boss's office in ruins.'", img: "assets/img/items/arg_list_1.webp" },
    "arg_list_2": { icon: "📑", name: "Arguments (Kevin)", flavor: "'Danger money for IT apprentices? What a joke! This slip proves in black and white that Kevin is handsomely paid for playing Minecraft.'", img: "assets/img/items/arg_list_2.webp" },
    "bubble_wrap": { icon: "🫧", name: "Bubble wrap", flavor: "'Every *Pop* is a muted user in your imagination. By far the cheapest and most effective therapy for long-suffering administrators.'", img: "assets/img/items/bubble_wrap.webp",
        use: { a: -10,
               desc: "Lowers AGGRO by -10. Deeply satisfying.",
               warn: "Single-use therapy! Once every bubble has gone, so has the fun.",
               log:  "*Pop* *Pop* *Pop*. Better than therapy. (Aggro -10)",
               color: "text-cyan-400" } },
    "sandwich": { icon: "🥪", name: "Filled roll", flavor: "'Cheese, remoulade and the salty tears of Sales. Taken from the fridge with no conscience whatsoever, it tastes wonderfully of anarchy.'", img: "assets/img/items/sandwich.webp",
        use: { a: -10, l: -5,
               desc: "Lowers AGGRO by -10 and LAZINESS by -5. A solid builder's breakfast.",
               warn: "Heavy on the remoulade! Can only be eaten once.",
               log:  "A thick slice of cheese and remoulade. That grounds you. (Aggro -10, Laziness -5)",
               color: "text-yellow-400" } },
    "chocolate": { icon: "🍫", name: "Bar of chocolate", flavor: "'Pure square happiness on a cocoa base. Rescued in secret from greedy Accounts, it is the one bright spot on a Monday.'", img: "assets/img/items/chocolate.webp",
        use: { a: -20,
               desc: "Lowers AGGRO by -20. Square, practical, gone.",
               warn: "You have earned it. Disappears from the inventory once eaten.",
               log:  "The chocolate melts on your tongue. For a brief moment you hate nobody. (Aggro -20)",
               color: "text-amber-500" } },

    // TOOLS (permanent -> keep: true)
    "admin_pw": { icon: "🔑", name: "Root password", flavor: "'With great power comes... a heap of responsibility (and trouble). One wrong click and the customer database is history.'", keep: true, img: "assets/img/items/admin_pw.webp" },
    "cable": { icon: "〰️", name: "LAN cable", flavor: "'Cat7. Reliably holds data and wobbly racks together. In a real emergency it also serves splendidly as a whip against unruly users.'", keep: true, img: "assets/img/items/cable.webp" },
    "tape": { icon: "🩹", name: "Duct tape", flavor: "'The strongest known force in the universe is grey adhesive tape. Repairs broken servers, leaking pipes, and silences colleagues.'", keep: true, img: "assets/img/items/tape.webp" },
    "screw": { icon: "🪛", name: "Screwdriver", flavor: "'Quality Phillips head. Doubles as self-defence. Your most faithful companion in the dark innards of ancient hardware.'", keep: true, img: "assets/img/items/screw.webp" },
    "stressball": { icon: "🔴", name: "Anti-stress ball", flavor: "'Squeezed so often that it whimpers quietly for help. Already carries the permanent prints of your fingers, a silent therapist.'", keep: true, img: "assets/img/items/stressball.webp",
        use: { a: -5, cooldown: 60,
               desc: "Lowers AGGRO by -5 points on the spot. *Squeak*",
               wait: "The ball is still squashed completely flat. Give it time to come back up.",
               warn: "Material fatigue! After a squeeze the ball is flat and useless for 60 minutes.",
               log:  "You knead the ball aggressively. *Squeak*. That helps. (Aggro -5)",
               color: "text-green-400" } },
    "manual": { icon: "📖", name: "Windows 95 manual", flavor: "'The holy book of the forefathers. Also serves as a monitor stand. The pages stick together, but the knowledge inside is utterly timeless.'", keep: true, img: "assets/img/items/manual.webp" },
    "usb_stick": { icon: "💾", name: "Boot stick", flavor: "'A 64GB stick, full of scripts, viruses and cat memes. Your digital Swiss army knife for taming any temperamental system.'", keep: true, img: "assets/img/items/usb_stick.webp" },
    "fire_ext": { icon: "🧯", name: "Fire extinguisher", flavor: "'CO2. Cold, loud and extremely effective against smoking hardware. Equally suited to cooling a burning corridor argument, radically.'", keep: true, img: "assets/img/items/fire_ext.webp" },
    "hammer": { icon: "🔨", name: "Hammer", flavor: "'A 500g opinion amplifier. Solves hardware problems instantly. Percussive maintenance is sometimes the only language printers understand.'", keep: true, img: "assets/img/items/hammer.webp" },
    "zip_ties": { icon: "➰", name: "Cable ties", flavor: "'Black plastic. The indestructible handcuffs of IT. They tame the wildest cable tangle and hold the infrastructure together, quite literally.'", keep: true, img: "assets/img/items/zip_ties.webp" },
    "headphones": { icon: "🎧", name: "NC headphones", flavor: "'Put them on and the rest of the world stops existing. The ultimate shield against the noise of the marketing department and Jürgen's monologues.'", keep: true, img: "assets/img/items/headphones.webp" },
    "voodoo_doll": { icon: "🪡", name: "Voodoo doll (Dr. W.)", flavor: "'A likeness of the boss, made from a mouse mat and three cable ties. The resemblance is alarming, the effect disputed, the relief measurable.'", keep: true, img: "assets/img/items/voodoo_doll.webp",
        use: { a: -20, b: 10, rep: { "Dr. Wichtig": -2 }, cooldown: 180,
               desc: "Lowers AGGRO by -20, raises BOSS RADAR by +10. He picks up on these things.",
               wait: "The doll has been through enough for today. Even fabric needs a rest.",
               warn: "Three hours of quiet afterwards. And Dr Wichtig likes you a little less each time, without being able to say why.",
               log:  "You jab the needle into the fabric belly. Two floors up Dr Wichtig winces, reaches for his side and thinks of you for reasons he cannot fathom. (Aggro -20, Boss Radar +10)",
               color: "text-fuchsia-400" } },
    "tie": { icon: "👔", name: "Emergency tie", flavor: "'Has hung behind the office door since 2016, just in case. Navy blue with diagonal stripes - precisely the model Dr Wichtig has worn since his promotion.'", keep: true, img: "assets/img/items/tie.webp",
        passive: { onChar: "Dr. Wichtig", b: -5,
                   log: "Dr Wichtig's eye catches on your tie. It is his. For a moment he takes you for one of his own. (Boss Radar -5)",
                   color: "text-indigo-300" } },
    "black_card": { icon: "💳", name: "'Black Card'", flavor: "'Property of Prince Abubakar. The limit is a pure illusion. You could buy a small island with it, though today it will probably go on pizza.'", keep: true, img: "assets/img/items/black_card.webp" },

    // QUEST ITEMS
    "kevin_ram": { icon: "📟", name: "Kevin's lucky RAM", flavor: "'An old DDR3 stick. Kevin swears it makes the PC faster. In truth it is completely burnt out, much like the apprentice's synapses.'", keep: true, quest: true, img: "assets/img/items/kevin_ram.webp" },
    "golden_stapler": { icon: "✨", name: "Golden stapler", flavor: "'Heavy, flashy and entirely useless. Like Marketing itself. A captured trophy that recalls Chantal's tears during the last budget war.'", keep: true, quest: true, img: "assets/img/items/golden_stapler.webp" },
    "mixtape": { icon: "🤘", name: "Death Metal Tape", flavor: "'Side A: Burn the Server. Side B: User Error (Die). The perfect, uncompromising soundtrack for your daily descent into corporate madness.'", keep: true, quest: true, img: "assets/img/items/mixtape.webp" },
    "cat_pic": { icon: "🐱", name: "Photo of Rüdiger", flavor: "'A fluffy tomcat with the psychopathic stare of a killer. Ms Elster's undisputed favourite and your ultimate free pass.'", keep: true, quest: true, img: "assets/img/items/cat_pic.webp" },
    "master_key": { icon: "🗝️", name: "Master key", flavor: "'Egon's masterpiece. You hold absolute power over the building. No door stays shut to you, no hiding place is safe from you any longer.'", keep: true, quest: true, img: "assets/img/items/master_key.webp" },
    "scotch_bottle": { icon: "🥃", name: "30-year-old Scotch", flavor: "'Smells of peat, oak and an exorbitant bonus. Nothing else gets you through the afternoon without lasting damage.'", keep: true, quest: true, img: "assets/img/items/scotch_bottle.webp" },
    "contract": { icon: "📜", name: "New employment contract", flavor: "'20% more salary and the parking space by the entrance. In black and white. The paper is still damp with the bitter tears the CEO shed.'", keep: true, quest: true, img: "assets/img/items/contract.webp" },
    "corp_chronicles": { icon: "📕", name: "The Company Chronicle", flavor: "'Tradition since 1899. Smiling during working hours is forbidden. A relic from a time when IT still ran on steam and exploitation was spelled with a capital letter.'", keep: true, quest: true, img: "assets/img/items/corp_chronicles.webp" },
    "prince_letter": { icon: "💌", name: "Letter from the Prince", flavor: "'I shall name my firstborn \"Miller\". With love, the Prince. A royal document proving that you outrank the board.'", keep: true, quest: true, img: "assets/img/items/prince_letter.webp" },

};
