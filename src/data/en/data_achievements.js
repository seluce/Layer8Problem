// i18n-status: translated
//
// 93 text fields, 85 translated. Eight are deliberately identical, and every
// one of them is a `title` the German source already writes in English:
//
//   MacGyver · Mr. Robot · Ninja · Inbox Zero · Metal Queen · Keymaster ·
//   The Closer · Wolf of Wall Street
//
// "Mr. Robot" and "Wolf of Wall Street" are a programme and a film title and
// travel as names (GLOSSAR §3) - "Mr." keeps its full stop for that reason,
// against the British rule that governs the prose. Only "Wolf of Wall Street"
// reaches lint-parity's four-word floor, so the pool reports 1 there, not 0.
// Every `desc`, `hint` and `toast` is translated.
//
// Two decisions taken from the contract rather than made here:
//
//   "Faulpelz" -> Sloth, and NOT Laziness. GLOSSAR §3a splits these on
//   purpose: the status value is Laziness everywhere (fl measures unwillingness
//   to work, not acedia), but the achievement carries a sloth in its name, the
//   badge shows a sloth, and English is the one language where the pun lands
//   in a single word. So the wordplay moves from the value to the achievement.
//   The `desc` beside it still says "80% Laziness", because that is the bar.
//
//   "Streber" -> Swot, British, and already the word Kevin uses for Miller in
//   data_coffee.js.
//
// ach_cat_whisperer is one of the ten address places listed for this block:
// "Frau Elster" is prose here, not a card heading, so it becomes Ms Elster in
// both desc and toast (GLOSSAR §3c, the title-against-prose rule). Likewise
// ach_week's hint says Müller and therefore Miller (§3.2).

export const achievements = [

	// WEEK MODE (v5.0) - earned through engine_week.recordWeekResult()
	{ id: "ach_week", icon: "🗓️", img: "assets/img/achievements/ach_week.webp", title: "Weekended", desc: "Monday to Friday survived in one piece. This time the weekend is earned.", hint: "Hold out until Miller goes into a weekend with nothing left owing." },
	{ id: "ach_week_iron", icon: "🧊", img: "assets/img/achievements/ach_week_iron.webp", title: "Cast Iron", desc: "Five days without a valve and without a written warning. HR is unsettled.", hint: "Get through the long haul without once letting off steam or being asked in for a word." },
	{ id: "ach_week_clean", icon: "🧹", img: "assets/img/achievements/ach_week_clean.webp", title: "Clean Friday", desc: "Friday evening, queue empty. For the first time Monday starts at zero.", hint: "Leave the office on the last day with nothing whatsoever left open." },

	// EXTREME PLAYSTYLE
	{ id: "ach_ascetic", icon: "🧘", img: "assets/img/achievements/ach_ascetic.webp", title: "The Ascetic", desc: "16:00 and not a drop of coffee. You consist of pure willpower.", hint: "Get through almost the whole day without touching the 'black gold'." },
	{ id: "ach_coffee", icon: "🫀", img: "assets/img/achievements/ach_coffee.webp", title: "Palpitations", desc: "8 cups drunk. You can hear colours and stop time.", hint: "Drink a medically inadvisable quantity of coffee in one day." },
	{ id: "ach_ignore", icon: "👻", img: "assets/img/achievements/ach_ignore.webp", title: "Ghosting Pro", desc: "5 mails ignored. Your Del key is glowing.", hint: "Leave your inbox well alone and ignore requests on principle." },
	{ id: "ach_hoarder", icon: "🛒", img: "assets/img/achievements/ach_hoarder.webp", title: "Loot Goblin", desc: "5 items in the inventory. Your backpack is bursting.", hint: "Collect everything that is not nailed down, until nothing more will fit.", toast: "Your backpack is bursting. Do you really still need that stale doughnut?" },

	// STATS
	{ id: "ach_lazy", icon: "🦥", img: "assets/img/achievements/ach_lazy.webp", title: "Sloth", desc: "80% Laziness. You have raised doing nothing to an art form.", hint: "Avoid work for so long that your productivity approaches zero." },
	{ id: "ach_rage", icon: "🤬", img: "assets/img/achievements/ach_rage.webp", title: "Pulse 180", desc: "One more stupid phone call and it goes off. (95% Aggro)", hint: "Let yourself be provoked until you are on the very edge of losing it." },

	// ITEMS & SKILLS
	{ id: "ach_macgyver", icon: "🛠️", img: "assets/img/achievements/ach_macgyver.webp", title: "MacGyver", desc: "Tape, cable, screwdriver and manual. You do not need IT, you need chewing gum.", hint: "Collect the complete tool set for technical emergencies." },
	{ id: "ach_rich", icon: "💸", img: "assets/img/achievements/ach_rich.webp", title: "The Millionaire", desc: "You trusted the Prince. Your notice is in the post!", hint: "Ignore common sense and the spam filter." },
	{ id: "ach_hacker", icon: "💻", img: "assets/img/achievements/ach_hacker.webp", title: "Mr. Robot", desc: "Root privileges obtained. The network is yours now.", hint: "Find a way to help yourself to illegal admin rights." },

	// END GAME / TIME-DEPENDENT
	{ id: "ach_ninja", icon: "🥷", img: "assets/img/achievements/ach_ninja.webp", title: "Ninja", desc: "Almost invisible to the boss (unnoticed until 14:00).", hint: "Stay completely under the radar until early afternoon.", toast: "Almost invisible to the boss." },
	{ id: "ach_zen", icon: "🕊️", img: "assets/img/achievements/ach_zen.webp", title: "Zen Master", desc: "15:00 and calm itself (0 Aggro). Are you even awake?", hint: "Reach the afternoon in a state of absolute inner peace.", toast: "15:00 and calm itself. Are you even awake?" },
	{ id: "ach_workaholic", icon: "👔", img: "assets/img/achievements/ach_workaholic.webp", title: "Swot", desc: "Almost no Laziness by 16:00. You are making the rest of us look bad!", hint: "Work hard and keep your Laziness extremely low until just before clocking off.", toast: "You actually worked? You are making the rest of us look bad!" },
	{ id: "ach_risk", icon: "🎢", img: "assets/img/achievements/ach_risk.webp", title: "High-Wire Act", desc: "Clocking off with 9 tickets open. That was uncomfortably close.", hint: "Finish the day at the absolute limit of the tickets you are allowed to leave open." },
	{ id: "ach_clean", icon: "✨", img: "assets/img/achievements/ach_clean.webp", title: "Inbox Zero", desc: "Every ticket done? The system thinks it is a bug.", hint: "Work through them! The ticket counter has to be empty." },
	{ id: "ach_survivor", icon: "🌋", img: "assets/img/achievements/ach_survivor.webp", title: "Dancing on the Volcano", desc: "Maximum stress (90/90) just before clocking off. You need a holiday.", hint: "End the day with maximum stress and maximum fury at the same time.", toast: "Maximum stress just before clocking off. You need a holiday." },

	// STORY ACHIEVEMENTS
	{ id: "ach_mentor", icon: "👨‍👦", img: "assets/img/achievements/ach_mentor.webp", title: "The Mentor", desc: "You and Kevin: from chaos apprentice to a real admin.", hint: "Help the apprentice out of a tight spot in IT.", toast: "You saved Kevin. He will never forget it (sadly)." },
	{ id: "ach_ally", icon: "🤝", img: "assets/img/achievements/ach_ally.webp", title: "Marketing Alliance", desc: "You and Chantal: a deadly team. The budget is yours.", hint: "Strike a pact with the marketing department.", toast: "You and Chantal: a deadly team." },
	{ id: "ach_rockstar", icon: "🤘", img: "assets/img/achievements/ach_rockstar.webp", title: "Metal Queen", desc: "You and Gabi: loud, fast and against the rest of the world.", hint: "Save Reception from a nervous collapse.", toast: "Loud, fast and loyal." },
	{ id: "ach_keymaster", icon: "🚪", img: "assets/img/achievements/ach_keymaster.webp", title: "Keymaster", desc: "You and Egon: a quiet alliance. Every door stands open to you.", hint: "Win the caretaker's trust.", toast: "Egon trusts you blindly." },
	{ id: "ach_closer", icon: "💼", img: "assets/img/achievements/ach_closer.webp", title: "The Closer", desc: "You and Markus: money never sleeps. The two of you saved the deal.", hint: "Help the sales team close when it counts.", toast: "Markus and you: a profitable team." },
	{ id: "ach_cat_whisperer", icon: "🐈", img: "assets/img/achievements/ach_cat_whisperer.webp", title: "Cat Whisperer", desc: "You and Ms Elster: friends for life (and for Rüdiger).", hint: "Solve the cat problem in Accounts.", toast: "Rüdiger likes you. So does Ms Elster." },
	{ id: "ach_lore", icon: "🕯️", img: "assets/img/achievements/ach_lore.webp", title: "The Historian", desc: "You have read the chronicle. Now you know why we worship floppy disks.", hint: "Find and read the secret history of the company.", toast: "You know the truth now. Some doors are better left shut." },
	{ id: "ach_wolf", icon: "📈", img: "assets/img/achievements/ach_wolf.webp", title: "Wolf of Wall Street", desc: "You have beaten the boss. The contract is yours.", hint: "Win the hard negotiation against the final boss." },

	// GALA PARTY
	{ id: "ach_party", once: true, icon: "🎉", img: "assets/img/achievements/ach_party.webp", title: "Synergy Veteran", desc: "You survived the legendary company party and passed into history.", hint: "Win over everyone in the house - and find out what the company is not saying." }

];
