// i18n-status: translated
//
// 236 text fields (118 titles, 118 texts), 234 translated. Two are
// deliberately identical, both titles the German already writes in English:
// mood_normal_8 "Corporate Aroma" and mood_normal_57 "Passive Aggression".
// Both sit under lint-parity's four-word floor, so the pool reports 0 there.
// Every one of the 118 texts is translated.
//
// The morning mood is the first thing a player reads each day, so these are
// scenes rather than status lines - the stat change is carried by `effect`,
// never announced in the prose.
//
// Machine voices stay machine voices (GLOSSAR §2a): Windows, Outlook, the
// mouse battery warning and the data-breach alert all speak English in the
// German tree too, and simply keep speaking it here.
//
// Two traps worth naming, both found by reading rather than by any checker:
//
//   mood_normal_25 - German "B-Dur" is NOT English B major. German B is B
//   flat, so the strip light hums in B FLAT major. mood_normal_36's "E-Moll"
//   and "C-Dur" are E minor and C major, identical in both systems; only the
//   B moves. Getting this wrong would have been silent and wrong forever.
//
//   mood_snack_6 - "Mettwoch" is Mett plus Mittwoch, a pun that needs German
//   to exist and that the text below it never picks up (the scene is Sales
//   laying on catering and Miller helping himself first). §5 keeps Mett words
//   where the text explains them; here nothing explains it, so the title is
//   rebuilt around what the scene actually does: "The Early Bird", who catches
//   the worm and, in this case, the buffet.
//
// mood_normal_10 is one of the ten address places for this block: Frau Elster
// is prose here, so she is Ms Elster (GLOSSAR §3c). mood_noexcuse_4 says Azubi
// in the German - corrected there in the sixteenth session - and is therefore
// the apprentice, not an intern (§7b, case twenty-six).
//
// Taken from the contract: Hausmeister -> caretaker, Vertrieb -> Sales,
// Vertriebsleiter -> head of sales, Personalabteilung -> HR, Revision ->
// Internal Audit, Geschäftsleitung -> Management, Rundmail -> all-staff email,
// Teeküche -> kitchenette (bare "Küche" stays a kitchen), Aufzug -> lift,
// 'Zu verschenken' -> 'Free to a good home', as on the noticeboard.

export const moods = [

	// --- CATEGORY 1: ANGER MODE (+15 anger) [10% chance] ---
	{ id: "mood_aggro_1", effect: "aggro", title: "The Trains Are Running (Not)", text: "Your train was 40 minutes late this morning on account of 'livestock loose on the line'. You had to sprint the last two kilometres to the office in drizzle. Your mood is already in the cellar." },
	{ id: "mood_aggro_2", effect: "aggro", title: "The Toe Incident", text: "This morning, in the dark, you ran your little toe full tilt into the bedpost. The pain is still throbbing in your foot as you limp into the office." },
	{ id: "mood_aggro_3", effect: "aggro", title: "Coffee Catastrophe", text: "The coffee pot slipped out of your hand at home. The kitchen is sticky, you got no caffeine hit, and your socks smell of filter coffee. Anyone who speaks to you today is living dangerously." },
	{ id: "mood_aggro_4", effect: "aggro", title: "The E-Scooter Fright", text: "An inconsiderate teenager on an e-scooter nearly ran you down on the pavement. The adrenaline is still pumping through your veins and you are spoiling for a fight." },
	{ id: "mood_aggro_5", effect: "aggro", title: "The Toothpaste Stain", text: "While brushing your teeth you dropped fresh mint toothpaste down your freshly ironed black shirt. You had to change in a hurry and you are furious with your own motor skills." },
	{ id: "mood_aggro_6", effect: "aggro", title: "The Wrong Wave", text: "On the packed train this morning you waved at somebody extremely warmly. The person meant the bloke behind you. You wanted the ground to swallow you up." },
	{ id: "mood_aggro_7", effect: "aggro", title: "Stupid Labour", text: "You were intercepted in the car park by the caretaker, who made you help him carry three heavy boxes of old printer paper. Pointless physical labour first thing in the morning. Your pulse is boiling." },
	{ id: "mood_aggro_8", effect: "aggro", title: "Open Secret", text: "You only noticed in the company lift that your flies had been open the whole way. And you had a loud chat with the man at the baker's as well! You are extremely irritable today." },
	{ id: "mood_aggro_9", effect: "aggro", title: "Sorting the Rubbish", text: "A neighbour drew you into a fifteen-minute conversation in the stairwell about correctly sorting rubbish. You nodded away obediently while exploding on the inside." },
	{ id: "mood_aggro_10", effect: "aggro", title: "Crystal Clear Fail", text: "You meant to stroll casually through the revolving door at the entrance, got caught, and pressed your takeaway coffee flat against the glass. Everyone at Reception saw it. Best not to speak to me today." },

	// --- CATEGORY 2: RADAR MODE (+15 boss radar) [10% chance] ---
	{ id: "mood_radar_1", effect: "radar", title: "The Ominous Email", text: "At 23:45 last night you got one more email from the boss: 'Miller. My office first thing. No warning given.' You have no idea what it is about and you are in a cold sweat." },
	{ id: "mood_radar_2", effect: "radar", title: "The Evil Eye", text: "As you came into the building the head of HR was standing at Reception, looked at you and immediately noted something on her clipboard. That absolutely cannot mean anything good." },
	{ id: "mood_radar_3", effect: "radar", title: "The Wrong Shirt", text: "This morning you accidentally put on the competition's company polo shirt (an old promotional freebie). You only noticed in the lift. If the boss sees this, you are done for." },
	{ id: "mood_radar_4", effect: "radar", title: "The Data Breach Alert", text: "On the way to work your private phone announced: 'Your passwords have been found in a data breach'. It leaves you extremely exposed, and you are expecting an IT security audit at any second." },
	{ id: "mood_radar_5", effect: "radar", title: "The Silent Observer", text: "The boss stood silently at the window of his corner office this morning as you walked across the car park. He fixed you with a stare and noted something down. You are definitely being watched." },
	{ id: "mood_radar_6", effect: "radar", title: "The Name", text: "In the lift this morning the CEO suddenly asked you your name. He has not done that once in five years. You are guaranteed to be on some internal list." },
	{ id: "mood_radar_7", effect: "radar", title: "Password Reset", text: "Your login password was reset overnight for 'security reasons'. Internal Audit is definitely nosing about in your account." },
	{ id: "mood_radar_8", effect: "radar", title: "Anonymous Post", text: "There was an anonymous Post-it on your desk: 'We need to talk - HR'. You are already going frantically through three years of browser history in your head." },
	{ id: "mood_radar_9", effect: "radar", title: "The Silence", text: "When you arrived there was whispering in the corridor. Everyone fell silent the instant they saw you. The wave of redundancies is coming, of that you are absolutely certain." },
	{ id: "mood_radar_10", effect: "radar", title: "Wrong CC", text: "Last night you accidentally put the boss in CC while complaining about the canteen food. This morning he greeted you in the corridor extremely warmly. A death threat." },

	// --- CATEGORY 3: OVERSLEPT (+15 laziness, +30 minutes) [10% chance] ---
	{ id: "mood_lazy_1", effect: "lazy", title: "The Snooze Master", text: "You hit snooze four times and then dreamt you were already at work. You get to the office late. Your motivation is still tucked up warm in your bed." },
	{ id: "mood_lazy_2", effect: "lazy", title: "Wrong Bus Syndrome", text: "You were so lost in thought this morning that you got on the wrong bus. You arrive far too late. What you would really like to do is turn round and go straight home again." },
	{ id: "mood_lazy_3", effect: "lazy", title: "The Search for the Keys", text: "This morning you spent thirty minutes looking for your front door key. It was in the fridge, next to the cheese. You are late and now staring blankly at your monitor." },
	{ id: "mood_lazy_4", effect: "lazy", title: "The Documentary Trap", text: "Last night you fell down a rabbit hole on YouTube and watched documentaries about the building of the pyramids until four in the morning. Your brain is complete mush and you can barely keep your eyes open." },
	{ id: "mood_lazy_5", effect: "lazy", title: "Physical Wreck", text: "Last night you tried being 'healthy and active' at the gym. An enormous mistake. You have brutal muscle ache and even typing on the keyboard is physical torment." },
	{ id: "mood_lazy_6", effect: "lazy", title: "The Update", text: "Your phone pulled an update overnight and deleted the alarm. You only woke up once the sun was already high." },
	{ id: "mood_lazy_7", effect: "lazy", title: "Bus Stop Philosophy", text: "It was pouring down. You stood at the stop for twenty minutes seriously considering whether to simply go home and hand in your notice. You are extremely tired." },
	{ id: "mood_lazy_8", effect: "lazy", title: "Gravity", text: "Your bed was more unbelievably warm and soft this morning than it has ever been. The universe wanted to keep you there. It is like wading through syrup." },
	{ id: "mood_lazy_9", effect: "lazy", title: "Existential Crisis", text: "On the way to work you listened to a podcast about 'passive income streams in Bali'. Now you are sitting here questioning your entire existence." },
	{ id: "mood_lazy_10", effect: "lazy", title: "Boiled Soft", text: "The heating on the train was running at 40 degrees. You were boiled soft into a sort of trance on the journey. Your brain is currently running on emergency power only." },

	// --- CATEGORY 4: SNACK MODE (random food item) [10% chance] ---
	{ id: "mood_snack_1", effect: "snack", title: "The Baker's Mistake", text: "The nice lady at the baker's accidentally put something extra in your bag this morning. Naturally you did not contradict her. One must celebrate the small victories!" },
	{ id: "mood_snack_2", effect: "snack", title: "Pity at the Kiosk", text: "You looked so utterly finished at the newspaper stand at the station this morning that the seller gave you something to keep your strength up out of pity. 'You look like you could use it,' he said." },
	{ id: "mood_snack_3", effect: "snack", title: "Spontaneous Generation", text: "You reached into your coat pocket and found something edible entirely unexpectedly. How old is it? No idea. Is it still good? Bound to be! Free is what counts." },
	{ id: "mood_snack_4", effect: "snack", title: "The Reception Donation", text: "On Gabi's counter this morning there was a box marked 'Free to a good home (leftovers from yesterday)'. You helped yourself unscrupulously, before Sales could eat the lot." },
	{ id: "mood_snack_5", effect: "snack", title: "The Winter Coat Find", text: "It was cold today, so you fetched your old jacket out of the wardrobe. In the inside pocket lay a sealed culinary treasure from last winter. Jackpot!" },
	{ id: "mood_snack_6", effect: "snack", title: "The Early Bird", text: "Sales have an 'early bird' meeting today and the catering has already been set up in the corridor. You secured yourself a snack in passing, unscrupulously, before the pack arrives." },
	{ id: "mood_snack_7", effect: "snack", title: "Please Help Yourself", text: "Somebody has put out a bowl of comfort food in the kitchenette. Sign: 'Please help yourself'. Something like that you do not ask yourself twice about." },
	{ id: "mood_snack_8", effect: "snack", title: "The Hardware God", text: "While cleaning your keyboard (turn it over once and shake) a still-wrapped snack fell into your lap. A gift from the hardware gods." },
	{ id: "mood_snack_9", effect: "snack", title: "The New Starter's Round", text: "A colleague is standing his new starter's round and has handed out provisions at people's desks. You thanked him and immediately forgot his name again. Free is free." },
	{ id: "mood_snack_10", effect: "snack", title: "Machine Cracked", text: "The vending machine in the corridor jammed. You gave it one good kick and were richly rewarded. A good day for the inventory." },

	// --- CATEGORY 5: PLAIN MODE (satire, no stat change) [60% chance] ---
	{ id: "mood_normal_1", effect: "normal", title: "A Glitch in the Matrix", text: "Your alarm went off exactly on time. The train was punctual to the second. The coffee tasted perfect. Everything is so unbelievably flawless and normal that you are in a panic about an imminent meteorite strike." },
	{ id: "mood_normal_2", effect: "normal", title: "Alarming Routine", text: "Eight hours of sleep, a balanced muesli, every light on green. Your body is so accustomed to chronic IT stress that this absolute normality is bringing on mild paranoia." },
	{ id: "mood_normal_3", effect: "normal", title: "The Calm Before the Storm", text: "Nobody barged into you on the way to work. It is not raining. You sit down at your desk. Everything works. You pinch yourself. This simply cannot be reality." },
	{ id: "mood_normal_4", effect: "normal", title: "Grey on Grey", text: "The weather is grey. The carpet is grey. Your monitor bezel is grey. You breathe in deeply and merge seamlessly with your surroundings. The perfect camouflage for IT." },
	{ id: "mood_normal_5", effect: "normal", title: "Small Talk Hell", text: "You had to share the lift with the head of sales. 'So, good weekend?' - 'Mhm. You?' - 'Same.' Those twenty seconds of social interaction have already taken your battery down to 80%." },
	{ id: "mood_normal_6", effect: "normal", title: "The Eternal Progress Bar", text: "You boot your PC. Windows is installing updates. You stare for five minutes at a blue circle going round. It is so predictable that it comes back round to being almost soothing." },
	{ id: "mood_normal_7", effect: "normal", title: "Yesterday Is Today", text: "Yesterday afternoon's coffee mug is still standing on your desk. The rim has dried slightly. You simply push it ten centimetres to the left and start work. Everything as it was." },
	{ id: "mood_normal_8", effect: "normal", title: "Corporate Aroma", text: "You enter the building. It smells of damp linoleum, ozone off the laser printer and evaporated career ambitions. You take a deep draught. The unmistakable scent of home." },
	{ id: "mood_normal_9", effect: "normal", title: "Password Reminder", text: "Windows announces right after login: 'Your password expires in 14 days'. You click 'Remind me later' out of pure routine. That is a problem for future Miller. Not today." },
	{ id: "mood_normal_10", effect: "normal", title: "Lift Silence", text: "Five floors in the lift with Ms Elster. Nobody says a word. All you hear is the quiet whirring of the cabling. A pleasant, uncomplicated silence in the early morning." },
	{ id: "mood_normal_11", effect: "normal", title: "The Eternal To-Do List", text: "You glance at the Post-its round the edge of your monitor. Some have been there since 2022. They are yellowed, but they radiate a certain historical constancy. You ignore them expertly." },
	{ id: "mood_normal_12", effect: "normal", title: "The Sound of the Servers", text: "You go past the server room for a moment and put your ear to the door. The deep, monotonous rush of the fans. Nothing is on fire, nothing is screaming. A good start to the day." },
	{ id: "mood_normal_13", effect: "normal", title: "Synchronised Tinnitus", text: "The old strip light on the ceiling above your desk flickers slightly and hums at exactly the frequency you have in your ear anyway. A perfect audiovisual symbiosis." },
	{ id: "mood_normal_14", effect: "normal", title: "The Inbox Shock", text: "You open Outlook. '0 unread messages'. Your heart stops. Is the mail server dead?! No, a second later it syncs and there are 42 unread mails again. Phew, all is well." },
	{ id: "mood_normal_15", effect: "normal", title: "The Inconspicuous Arrival", text: "Jacket on the hook, backpack under the desk, switch on the PC, sigh. The holy trinity of starting the office day. You are on time, inconspicuous and ready for the pain." },
	{ id: "mood_normal_16", effect: "normal", title: "Eye Contact Avoided", text: "The boss walked past you in the corridor, but was buried deep in his phone. No eye contact, no impromptu meeting. You have skipped the first boss fight of the day by pure luck." },
	{ id: "mood_normal_17", effect: "normal", title: "Checking Tickets", text: "You open the ticket system. Nothing special. A printer is playing up, somebody has forgotten their password, Kevin has asked an odd question. Business as usual in the madhouse. Let the games begin." },
	{ id: "mood_normal_18", effect: "normal", title: "Phantom Limb Syndrome", text: "You sit at your desk, stare at the monitor and reach blindly to the right for your coffee mug. You grasp thin air, because you have not fetched one yet. Your body is already running on autopilot." },
	{ id: "mood_normal_19", effect: "normal", title: "The Corridor Protocol", text: "A colleague nodded to you, you nodded back. No 'good morning', no pleasantries. The maximum form of central European office affection has been successfully exchanged." },
	{ id: "mood_normal_20", effect: "normal", title: "The Cold Chair", text: "You pull your chair over and sit down. The imitation leather is cold and hard, as ever. A reassuring sign that nobody sat secretly at your desk overnight." },
	{ id: "mood_normal_21", effect: "normal", title: "A Look Out of the Window", text: "You stare out of the window. A bird flies past against the grey sky. It is free, it does not have to patch networks. You sigh deeply and turn back to the beeping hardware." },
	{ id: "mood_normal_22", effect: "normal", title: "The Mouse Nudger", text: "You move the mouse gently back and forth so the screensaver does not come on and your status in Teams jumps to 'Available'. The first and most important official act of the day successfully completed." },
	{ id: "mood_normal_23", effect: "normal", title: "The German Handshake", text: "A colleague asked 'How are you?' in passing. You answered dutifully with 'Mustn't grumble.' The conversation was thereupon classified as successfully concluded." },
	{ id: "mood_normal_24", effect: "normal", title: "The Empty Mug", text: "You stare into your empty, brown-stained coffee mug and wonder briefly whether it fills itself today. It does not, naturally. Physics is and remains unforgiving." },
	{ id: "mood_normal_25", effect: "normal", title: "The Neon Hum", text: "You switch on the light in the corridor. The tube at the far end flickers three times as always before starting up with an unhealthy hum in B flat major. Everything is exactly where it belongs." },
	{ id: "mood_normal_26", effect: "normal", title: "Desktop Lottery", text: "You look at your desktop. The 140 wildly scattered icons are still in exactly the place you left them yesterday. A reassuring constant in a chaotic world." },
	{ id: "mood_normal_27", effect: "normal", title: "The Tie Inspection", text: "You have accidentally put on an ironed shirt today. You spent the whole corridor wondering whether anyone would ask if you had a job interview. Nobody noticed. You are officially invisible." },
	{ id: "mood_normal_28", effect: "normal", title: "Pocket Vibration", text: "Something vibrates against your thigh and you grab in panic for the company phone. Nothing. No notification. Your brain is trolling you with phantom vibrations. The day can begin." },
	{ id: "mood_normal_29", effect: "normal", title: "The Weather Talk", text: "Somebody in the lift said 'Cold today, isn't it?'. You breathed in deeply, made a nodding 'Mhm' and stared at the toes of your shoes. An absolute social triumph for the morning." },
	{ id: "mood_normal_30", effect: "normal", title: "Boot Sequence", text: "The machine boots. You read the text on the black BIOS screen that you have seen a thousand times. 'Memory Check OK'. If only the memory check were okay on your colleagues too." },
	{ id: "mood_normal_31", effect: "normal", title: "Budget Cut", text: "As of today the paper in the gents is single-ply again and has the texture of fine sandpaper. You realise painfully that Management's merciless budget cuts have now finally reached the very lowest level." },
	{ id: "mood_normal_32", effect: "normal", title: "Software Nobody Asked For", text: "You boot your PC and discover 12 new, garishly coloured desktop icons belonging to third-party software nobody asked for. A quiet sigh escapes you as you move them to the 'Rubbish' folder out of routine. The usual madness." },
	{ id: "mood_normal_33", effect: "normal", title: "Warning Ignored", text: "The coffee machine in the kitchenette is flashing red and demanding descaling in desperation. You press 'Ignore' unscrupulously and make yourself the silent accomplice of the machine's inevitable collapse." },
	{ id: "mood_normal_34", effect: "normal", title: "Tab Tragedy", text: "A forced automatic Windows update closed all your browser tabs overnight. You stare into space for several seconds, mourning the tragic loss of 40 extremely important Wikipedia articles." },
	{ id: "mood_normal_35", effect: "normal", title: "The Enter Key", text: "From the office next door you hear somebody hammering rhythmically and with maximum aggression on their Enter key. It is the unmistakable, melancholy symphony of Monday morning, carrying quietly through the thin walls." },
	{ id: "mood_normal_36", effect: "normal", title: "Printer Music", text: "The big laser printer in the corridor is squealing as it warms up today in a wonky E minor. Really quite a pleasant, almost melodious change from yesterday's extremely scratchy C major." },
	{ id: "mood_normal_37", effect: "normal", title: "Defence Mechanism", text: "On the way to the coffee machine you successfully fended off three talkative colleagues with your perfected 'I am extremely busy' expression. A pretty good run for this early in the day." },
	{ id: "mood_normal_38", effect: "normal", title: "The Philosophy of Loading Times", text: "The Outlook splash screen hung today for an unbelievable 40 seconds on 'Loading profile'. That was exactly enough time to reflect briefly, but very intensely, on the fundamental point of your choice of career." },
	{ id: "mood_normal_39", effect: "normal", title: "Group Chat Drama", text: "Somebody has written a cheerful 'Good morning everyone!' in the big departmental chat and absolutely nobody is answering. You watch this tragic social drama from the sidelines, fascinated and silent." },
	{ id: "mood_normal_40", effect: "normal", title: "The Office Lives", text: "There are mysterious bread crumbs on the imitation leather of your chair, although you tidied meticulously last night. The building appears to develop a life of its own overnight, and a very unhygienic one." },
	{ id: "mood_normal_41", effect: "normal", title: "A Clear Mistake", text: "Quite thoughtlessly you cleaned your glasses and your monitor screen. All at once you can see the stubborn dust on the desk. A terrible, far-reaching mistake that has ruined your morning." },
	{ id: "mood_normal_42", effect: "normal", title: "Toxic Positivity", text: "The boss has pinned a new pastel-coloured 'motivational quote' to the big noticeboard. You read it and feel physically how a small, important part of your soul dies away with a quiet sigh." },
	{ id: "mood_normal_43", effect: "normal", title: "Battery Crisis", text: "The wireless mouse is insistently reporting 'Battery low: 10%'. You click the warning away and ignore it expertly. That is clearly a problem for tomorrow's Miller; today the risk is accepted." },
	{ id: "mood_normal_44", effect: "normal", title: "Occupational Hazard", text: "You almost broke your index finger hurriedly adjusting the broken backrest of your office chair. Anyone who claims IT is not a dangerous, physical job has no idea of the reality." },
	{ id: "mood_normal_45", effect: "normal", title: "Climate War", text: "The air conditioning on the ceiling is blowing exactly onto the back of your neck today. You pull up the collar of your jacket and sigh. The daily, relentless trench warfare against the elements of this building has begun again." },
	{ id: "mood_normal_46", effect: "normal", title: "Seasonal Confusion", text: "A highly motivated colleague is wearing a brightly coloured Hawaiian shirt today, in all seriousness. It is the middle of November and it is pouring down outside. You nod at him in silence and do not examine his life choices any further." },
	{ id: "mood_normal_47", effect: "normal", title: "Smell Log", text: "You get into the lift and immediately smell a mixture of stale cigarette smoke and cheap deodorant. An infallible sign: Sales were definitely in the building before you today." },
	{ id: "mood_normal_48", effect: "normal", title: "The Wi-Fi Disaster", text: "The main Wi-Fi was completely gone just now for exactly ten seconds. You hear muffled screams of panic from the open-plan office while you lean back at your ease and take a satisfying sip of your tea." },
	{ id: "mood_normal_49", effect: "normal", title: "Seagull Song", text: "The mechanism of your office chair squeaks when you lean back like an old, asthmatic seagull. A soothing, very familiar sound that tells you you are in your usual place." },
	{ id: "mood_normal_50", effect: "normal", title: "The Dishwasher", text: "Somebody has loaded the dishwasher in the coffee kitchen entirely asymmetrically and in a manner that is physically incorrect. You stare into it and feel a deep, profoundly German disturbance in the Matrix." },
	{ id: "mood_normal_51", effect: "normal", title: "Self-Healing", text: "An important Post-it with an urgent task on it has come off your monitor's edge and slid inconspicuously under the desk. As far as you are concerned, the problem has thereby officially solved itself." },
	{ id: "mood_normal_52", effect: "normal", title: "The Placebo Effect", text: "You installed the latest Windows updates. Visually everything looks exactly the same, but the machine feels 5% more sluggish on every click. An absolute classic for a Monday morning." },
	{ id: "mood_normal_53", effect: "normal", title: "Menu Roulette", text: "The canteen app on your phone is cheerfully announcing 'surprise goulash' today. You close the app again at once and decide that intermittent fasting is really quite healthy after all." },
	{ id: "mood_normal_54", effect: "normal", title: "Solidarity", text: "The old, yellowed fridge in the kitchenette is humming particularly loudly, deeply and agonisingly today. You pat its metal door in sympathy and feel a certain spiritual kinship with it." },
	{ id: "mood_normal_55", effect: "normal", title: "Muscle Memory", text: "For one dreadful second you forgot what your admin password was, then typed it blind with your eyes shut, entirely correctly. Muscle memory is and remains pure magic." },
	{ id: "mood_normal_56", effect: "normal", title: "Captive Souls", text: "A small bird pecked at the rain-wet window outside. The two of you looked one another in the eye for a moment. You both know perfectly well that you are trapped in here." },
	{ id: "mood_normal_57", effect: "normal", title: "Passive Aggression", text: "Somebody has stuck a meticulously laminated notice reading 'Please leave clean!' directly above the dirty sink in the kitchen. You laugh quietly and cynically to yourself." },
	{ id: "mood_normal_58", effect: "normal", title: "Veteran Status", text: "Your mouse-grey mouse mat is slowly but surely curling up at the bottom corners. A visible, proud sign of years of relentless and hard service on the IT front." },
	{ id: "mood_normal_59", effect: "normal", title: "Communication", text: "The colleague opposite you is staring at his screen and sighing extremely deeply and loudly. You answer with a sympathetic, drawn-out 'Well.' That was definitely enough social conversation for today." },
	{ id: "mood_normal_60", effect: "normal", title: "The Ritual", text: "After booting you click 'Refresh' three times out of routine on the completely empty desktop, although it achieves absolutely nothing. An important psychological starting ritual for every true SysAdmin." }
,

	// --- TICKET BACKLOG: the day started without you ---
	{ id: "mood_tickets_1", effect: "tickets", title: "The Night Shift", text: "Overnight the backup server restarted three times and dutifully generated a ticket on each attempt. So the queue greets you with a small, unfinished family already in place." },
	{ id: "mood_tickets_2", effect: "tickets", title: "The Weekend Hero", text: "On Sunday somebody replugged something in the network 'just quickly'. Who it was will never be established. The consequences of that short visit are lying neatly in your queue." },
	{ id: "mood_tickets_3", effect: "tickets", title: "Automatic Escalation", text: "At 06:00 the ticket system took it upon itself to reactivate several old matters 'owing to breach of deadline'. It does not mean any harm. It simply knows no mercy." },
	{ id: "mood_tickets_4", effect: "tickets", title: "The All-Staff Effect", text: "Last night an all-staff email went out about 'problems with the printer'. Since then everyone in the building has reported their own printer as a precaution. As a precaution." },
	{ id: "mood_tickets_5", effect: "tickets", title: "Holiday Handover", text: "The colleague from Administration is away for three weeks from today and, just before departure, handed 'a few little things' over to IT. They are neither little nor things." },
	{ id: "mood_tickets_6", effect: "tickets", title: "Update Night", text: "The central update distribution ran through at three in the morning. Successfully, says the report. The machines that have not booted since report it differently - in your queue." },

	// --- EXCUSES CUT: every way out costs more today ---
	{ id: "mood_noexcuse_1", effect: "excuse_minus", title: "Compliance Week", text: "A notice in the corridor proclaims the 'Week of Transparency'. Managers are urged to 'verify statements by staff on a sample basis'. Today is a bad day for creative truths." },
	{ id: "mood_noexcuse_2", effect: "excuse_minus", title: "The Calendar Does Not Lie", text: "Dr. Wichtig had himself granted access to every departmental calendar overnight. He can now see in real time who is supposedly where and when. Your tried and tested appointments are suddenly checkable." },
	{ id: "mood_noexcuse_3", effect: "excuse_minus", title: "One Too Many", text: "Yesterday you used an excuse twice. On the same person. She said nothing, merely raised her eyebrows for a moment. That repertoire is burnt until further notice." },
	{ id: "mood_noexcuse_4", effect: "excuse_minus", title: "The Attentive Apprentice", text: "Kevin has started writing down your sentences - 'to learn how one communicates professionally'. His notebook is now a seamless chronicle of your white lies. He is happy to show it around." },
	{ id: "mood_noexcuse_5", effect: "excuse_minus", title: "Gabi's Early Warning", text: "'Be careful today,' Gabi whispers as you come in. 'The ones upstairs are calibrated for excuses. Do not ask how I know.' You do not ask. You know she is right." },
	{ id: "mood_noexcuse_6", effect: "excuse_minus", title: "Sickness Levels", text: "Three colleagues called in sick this morning, two of them 'unexpectedly'. Management's patience with spontaneous unavailability is thereby completely used up for today." },

	// --- SPARE EXCUSE: sometimes the house plays for you ---
	{ id: "mood_bonus_1", effect: "excuse_plus", title: "An Alibi, Delivered", text: "There is an all-day appointment in your calendar that you never accepted: 'IT security audit (external)'. There is no audit. But there it stands, and it stands there for all to see." },
	{ id: "mood_bonus_2", effect: "excuse_plus", title: "The Advance", text: "Late last night you spent two unpaid hours rescuing a backup. Nobody ordered it, but everybody knows. In this building that sort of thing produces a quiet credit." },
	{ id: "mood_bonus_3", effect: "excuse_plus", title: "Server Room Fog", text: "The air conditioning in the server room briefly produced fog this morning. Entirely harmless, long since sorted - but the story is too good not to let it work away all day." },
	{ id: "mood_bonus_4", effect: "excuse_plus", title: "The Boss Is Away", text: "Dr. Wichtig is at a congress until midday called 'Leadership in the Age of Disruption'. Whatever he learns there: by the time he can apply it, you have half a day's head start." },
	{ id: "mood_bonus_5", effect: "excuse_plus", title: "Gabi's Cover", text: "'If anyone comes looking for you today, you were down in the basement doing the cabling,' says Gabi, and winks. She has already told two people before anyone even asked." },
	{ id: "mood_bonus_6", effect: "excuse_plus", title: "The Broken Phone", text: "Your extension started routing callers sporadically into the void last night. A fault, quite clearly. A fault that you have firmly resolved to fix tomorrow." }

];
