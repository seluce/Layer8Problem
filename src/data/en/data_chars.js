// i18n-status: translated
//
// 24 text fields, 17 translated. Seven are deliberately identical, and every
// one of them is a `name` (GLOSSAR §4): Kevin, Chantal, Egon, Dr. Wichtig,
// Frau Elster, Markus and Gabi. `state.reputation` is keyed on char.name, so
// these are identifiers as much as display text - a save file must stay
// language independent, and "Dr Important" would read wrong besides. The one
// name that does change is the player's, because it carries a meaning:
// "Du (Müller)" -> "You (Miller)" (GLOSSAR §3.2, §4).
//
// The seven roles follow the compendium's cat: "team" cards, which sit in the
// same window as these (GLOSSAR §3c): Apprentice, Caretaker, Accounts, Head of
// Sales, Reception. Where the German chars entry already differs from the card
// - "Der Azubi" against "Auszubildender", "Der CEO" against
// "Geschäftsführung", "Vertriebsleiter" against "Vertriebsleitung" - the
// English keeps that difference rather than levelling it.
//
// "Marketing & Feel Good" and "SysAdmin" are already English and stay put; the
// prose beside them addresses Miller in the second person, as everywhere else.
// The first of those is four tokens and therefore the one place this pool
// still reports under lint-parity - 1, not 0.

export const chars = [

	{
		name: "Kevin",
		role: "The Apprentice",
		img: "assets/img/chars/kevin.webp",
		icon: "🧢",
		desc: "His 'oops' costs the company around €50,000 a year. Thinks the 'cloud' is something off the weather forecast. Forever trying to install Minecraft on the server."
	},
	{
		name: "Chantal",
		role: "Marketing & Feel Good",
		img: "assets/img/chars/chantal.webp",
		icon: "💅",
		desc: "Uses words like 'synergy' and 'mindset' but has no idea how to open a PDF. Demands new Apple products daily, because the colour 'holo pink' brings out her creativity."
	},
	{
		name: "Egon",
		role: "Caretaker",
		img: "assets/img/chars/egon.webp",
		icon: "🔧",
		desc: "The true ruler of the building. Hates technology, loves his keys. Ask him and everything was better back then (1980), the cables above all."
	},
	{
		name: "Dr. Wichtig",
		role: "The CEO",
		img: "assets/img/chars/wichtig.webp",
		icon: "👔",
		desc: "Has visions that are physically impossible. Fond of ringing from inside tunnels to complain about the reception. Thinks AI can make coffee."
	},
	{
		name: "Frau Elster",
		role: "Accounts",
		img: "assets/img/chars/elster.webp",
		icon: "🦉",
		desc: "Guardian of Excel and of the fridge. Has eyes like a hawk for a missing receipt or a wrongly sorted bin. Her cat 'Rüdiger' is her only friend."
	},
	{
		name: "Markus",
		role: "Head of Sales",
		img: "assets/img/chars/markus.webp",
		icon: "💪",
		desc: "Sells the customer things we do not have. Fond of bellowing 'Time is money!' while playing Solitaire. His printer is his personal arch-enemy."
	},
	{
		name: "Gabi",
		role: "Reception",
		img: "assets/img/chars/gabi.webp",
		icon: "☎️",
		desc: "The switchboard. Knows everything about everyone before it happens. Rings IT when the mouse is empty (or the coffee)."
	},
	{
		// The player. A flag rather than a name check: the name is display
		// text and becomes "You (Miller)" in English, the role is prose too -
		// both would have made the team card compare against something that
		// gets translated, and it would have failed silently.
		player: true,
		name: "You (Miller)",
		role: "SysAdmin",
		img: "assets/img/chars/mueller.webp",
		icon: "💀",
		desc: "General dogsbody. Fire-fighter. Father confessor. All you ever wanted was to repair computers, and now you repair people. Your coffee intake is medically inadvisable."
	}

];
