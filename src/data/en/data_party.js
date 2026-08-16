// i18n-status: translated
//
// 380 fields reach scan-fields, but only 374 of them are text. The other six
// are the most dangerous strings in this pool:
//
//   party_hub's six options carry action: { fn: "goToPartyStation",
//   args: ["bar"] } - and "bar", "buffet", "dance", "lounge", "outside",
//   "toilet" are LOCATION IDENTIFIERS. engine_events.goToPartyStation filters
//   DB.party.filter(ev => ev.loc === loc) on them. Translate one and the pool
//   comes back empty, the station reports t('party.noStation'), and there is
//   no error and no warning - in English that station simply never opens.
//   Exactly the same shape as CMD:OPEN_INTRANET (GLOSSAR §1). They sit in the
//   same key as prose, which is what makes them worth this paragraph.
//
// The OTHER ten strings in the same key ARE display text: finishParty(title,
// text) renders args[0] as the subtitle in capitals and hands args[1] to
// generateDiaryEntry("PARTY", text). Those are the five endings of the gala -
// the longest prose in this block, sitting where nobody looks for prose.
// LEGENDE -> LEGEND, HELD DER ARBEIT -> HERO OF LABOUR (the wording
// data_emails.js and data_calls.js already set), TEAMPLAYER -> TEAM PLAYER;
// HOUDINI and INSIDER are the same word in both.
//
// Of the 374 real text places 370 are translated. Four are deliberately
// identical, and all four are already English in the German source:
// party_lounge_7.title "Awkward Silence", party_finale_rage.title
// "FINALE: BOFH MELTDOWN", and the finale subtitles HOUDINI and INSIDER, which
// are the same word in both languages. All four sit under lint-parity's
// four-word floor - "FINALE: BOFH MELTDOWN" is three tokens, not four - so the
// pool reports 0 there.
//
// textByProgress holds three versions of the hub text (arrival, peak, last
// hour), read in engine_core.js - prose, and translated.
//
// Section 6 of the prose report had to land on 0 here, and the German has
// eleven hits in five patterns. The English templates are NOT the same
// sentences, so the traps are different ones: "Du fühlst dich" x3 must not
// become "you feel", "Sieg durch" must not become "victory by/through",
// "Plötzlich" must not become "Suddenly", and the five "Du X, aber Y" openings
// must not become "You X, but Y". All eleven are built round instead.
//
// Taken from the contract: Sommerfeier -> The Summer Party (§3c), Mettigel
// kept (§5), 'DEFEKT' -> 'OUT OF ORDER' (§3), Tupperdose -> tub, Hausmeister
// -> caretaker, Geschäftsführung -> Management, Buchhaltung -> Accounts,
// Vertriebsleiter -> head of sales, Controlling -> Financial Control,
// Finanzchef -> the finance director, Azubi -> apprentice, Beamer ->
// projector, Schlager -> schmaltzy pop (Ballermann and Helene Fischer stay,
// they are names). Frau Elster is prose in party_buffet_2 and
// party_finale_gossip and is therefore Ms Elster; Müller is Miller throughout.

export const party = [

	{
		id: "party_start",
		title: "SYSTEM OVERRIDE: Synergy Gala",
		text: "16:30. You are shutting the machine down and mean to slip out through the back entrance unnoticed. Chantal intercepts you and, in passing, sticks a garish 'Hello my name is' label straight onto your forehead. You are trapped: welcome to the GlobalCorp Summer Party.\n\nThe event begins in the great hall. The CEO, Dr. Wichtig, is in the middle of an unbelievably heavy 45-minute presentation on 'Agile Celebration in the Age of AI'. The projector is out of focus, somebody has nicked the laser pointer, and the air conditioning has plainly failed.",
		opts: [
			{ t: "Endure it, applauding", a: 25, r: "You stand in the crowd and clap dutifully in time to the platitudes. It is horribly embarrassing, sweat is running down your back, and your aggression climbs beyond measure with every further buzzword.", next: "party_hub" },
			{ t: "Pull the plug on the projector", l: 10, a: -15, r: "You pretend to stumble. A 'technical fault' brings the speech to an early close. A collective, quiet sigh of relief passes through the hall. You are the silent hero of the first hour.", next: "party_hub" },
			{ t: "Stare at your phone and drift off", l: 20, a: 5, r: "You scroll through Reddit in complete apathy. The CEO talks and talks, but mentally you clocked off long ago. Very relaxing, even if the standing is a nuisance.", next: "party_hub" }
		]
	},
	{
		id: "party_hub",
		title: "The Party Hub",
		// The hub comes up twelve times. Three versions by progress give the
		// evening an arc: arrival, peak, last hour. The engine picks by
		// partyProgress and divides the stations by however many versions are
		// listed here - more of them need no code change (engine_core.reset).
		textByProgress: [
			"The neon light flickers unhealthily and the bass thumps out of the speakers.\n\nYou are standing in the anteroom. It still smells of floor polish rather than of beer. People are standing about in little groups holding their glasses like shields. Where to now?",
			"The bass has got louder, or you have got used to it.\n\nThere is no getting through the anteroom any more. Somebody has peeled the label off your forehead and stuck it to the wall, right beside three others. You can see colleagues allowing themselves things today that they will be mortified about on Monday. Where to now?",
			"The music plays on, but nobody is dancing any more.\n\nIn the anteroom there are half-empty glasses on every surface that is not vertical. Two colleagues are looking for their jackets, a third is explaining the ticket system to somebody at considerable length. Where else is there?"
		],
		text: "The neon light flickers unhealthily and the bass thumps out of the speakers.\n\nYou are standing in the anteroom. The air is stuffy, the noise deafening. You can see colleagues allowing themselves things today that they will be mortified about on Monday. Where to now?",
		opts: [
			{ t: "To the bar - Markus, Kevin and co.", action: { fn: "goToPartyStation", args: ["bar"] }, checkPool: "bar" },
			{ t: "To the buffet - eat and survive", action: { fn: "goToPartyStation", args: ["buffet"] }, checkPool: "buffet" },
			{ t: "To the dance floor - noise and humiliation", action: { fn: "goToPartyStation", args: ["dance"] }, checkPool: "dance" },
			{ t: "Into the lounge - Gabi and rumours", action: { fn: "goToPartyStation", args: ["lounge"] }, checkPool: "lounge" },
			{ t: "Outside - to the smoking corner", action: { fn: "goToPartyStation", args: ["outside"] }, checkPool: "outside" },
			{ t: "Flee to the toilets", action: { fn: "goToPartyStation", args: ["toilet"] }, checkPool: "toilet" }
		]
	},

	// --- BAR EVENTS (7) ---
	{
		id: "party_bar_1", loc: "bar",
		char: "Markus",
		title: "The Crypto Sermon",
		text: "You approach the bar. Markus from Sales has backed apprentice Kevin into a corner. Markus has plainly had his third Scotch and is loudly explaining to the utterly overwhelmed apprentice how one invests 'high-ticket synergies' in new crypto coins. Kevin looks as though he is about to start crying or being sick.",
		opts: [
			{ t: "Insult Markus outright", a: -10, l: -10, r: "'Markus, that is a glorified pyramid scheme for business-school Ruperts,' you say, ice cold. The music seems to stop for a moment. Markus turns scarlet, snorts contemptuously and storms off to the toilets in a huff. Kevin breathes a quiet 'thank you' at you.", next: "party_hub" },
			{ t: "Rescue Kevin with a server emergency", a: -15, r: "You shoulder in with an expression of the greatest importance and tap frantically at your phone. 'Kevin! The data centre is on fire, we have to go!' You drag him away. Markus does not even notice and carries on explaining the principle of proof of work to the empty wall.", next: "party_hub" },
			{ t: "Pitch Markus a blockchain of your own", a: 30, l: 15, r: "On the spot you invent 'GlobalCoin', backed by the canteen's coffee beans. It is unbelievably embarrassing, but Markus immediately gets his notebook out in delight. A small part of your soul shrivels up with second-hand shame.", next: "party_hub" },
			{ t: "Fetch popcorn and enjoy the spectacle", l: 25, a: 10, r: "You fetch yourself a cold beer with relish, lean comfortably on the counter and watch the spectacle. Kevin's mute cry for help is this evening's personal, first-class entertainment.", next: "party_hub" }
		]
	},
	{
		id: "party_bar_2", loc: "bar",
		title: "Shots with Sales",
		text: "A pack of sales people has captured the bar. The head of department orders a round of extremely cheap tequila for everybody standing nearby – you included. 'To the cellar children from IT!' he bellows. Everyone stares at you expectantly.",
		opts: [
			{ t: "Down the shot stone cold", l: 35, a: -20, r: "The stuff burns like 90 per cent disinfectant and tastes of regret. But the sales people howl and clap you on the shoulders! The tension of the day vanishes at a stroke.", next: "party_hub" },
			{ t: "Tip the shot secretly into the ficus", l: 15, a: 0, r: "While the mob bellows and throws its heads back, you tip the poison into the poor ficus beside you in one flowing movement. The tree will probably not survive the weekend, but your head stays clear.", next: "party_hub" },
			{ t: "Refuse loudly and irritably", a: 25, r: "'I do not drink with people who cannot even rotate a PDF,' you announce at volume. The boozy good cheer collapses to zero in a fraction of a second. There you stand at the bar, proud and completely isolated.", next: "party_hub" },
			{ t: "Fake water in the shot glass", l: 10, a: -5, r: "You swap the glass inconspicuously for tap water, throw your arms up and join in. Maximum integration at minimum loss of brain.", next: "party_hub" }
		]
	},
	{
		id: "party_bar_3", loc: "bar",
		title: "The Apprentice on the Pumps",
		text: "The hired barman has gone for a cigarette. Kevin is secretly trying to pull a beer. He yanks the tap wide open. The glass is 95% froth, the barrel is spitting, and the expensive pils is about to overflow.",
		opts: [
			{ t: "Work the pump properly", l: -15, a: -10, r: "You ease Kevin gently but firmly aside and show him the sacred 45-degree angle of the publican's art. The golden liquid flows perfectly into the glass.", next: "party_hub" },
			{ t: "Laugh at him out loud", a: 20, r: "You laugh so loudly and so filthily that Kevin flinches in panic. He drops the glass and a sticky, foaming mess pours over his new trainers. Nasty, but extremely satisfying.", next: "party_hub" },
			{ t: "Take over the barrel and serve", l: 40, a: -20, r: "You take your jacket off and appoint yourself unofficial cellarman of the gala. Within minutes there is a queue of happy, thirsty colleagues in front of you. Back at work, yes, and yet the undisputed king of the bar.", next: "party_hub" }
		]
	},
	{
		id: "party_bar_4", loc: "bar",
		title: "Cocktail Roulette",
		text: "A colleague from Accounts is mixing himself a cocktail: blue peppermint syrup, vodka and wheat beer. It looks like poisonous dishwater. 'Fancy a sip yourself?'",
		opts: [
			{ t: "Bravely take a tiny sip", l: 20, a: 20, r: "You sacrifice yourself for science. It tastes of expired toothpaste, stale yeast and pure pain. Your stomach revolts at once. One of the worst decisions of your life.", next: "party_hub" },
			{ t: "Let him try it and watch", a: 15, l: 10, r: "The accountant takes a big gulp, his eyes widening in panicked regret. He gags, claps a hand over his mouth and sprints flat out for the gents.", next: "party_hub" },
			{ t: "Knock the cup out of his hand", a: 10, l: -5, r: "'That is a crime against good taste and against the liver!' you cry, and knock the cup out of his hand. He looks sadly at the sticky puddle, but you have just prevented something worse.", next: "party_hub" }
		]
	},
	{
		id: "party_bar_5", loc: "bar",
		title: "The Golden Company Card",
		text: "You notice that Dr. Wichtig has left his black company credit card on the sticky counter. The barman is at that moment asking: 'Whose tab do those five bottles of champagne go on?'",
		opts: [
			{ t: "Point at the company card", l: 20, a: -10, r: "'It all goes on the boss!' you bellow across the bar, pointing at the card. The bystanders cheer ecstatically. The barman starts pouring. Tomorrow the boss will weep bitterly over the statement.", next: "party_hub" },
			{ t: "Return the card to the boss", l: -10, a: -5, r: "You find the CEO in the crowd and press the card into his hand. He grunts a curt 'thanks' and turns away again.", next: "party_hub" },
			{ t: "Order yourself another 3 cocktails", l: 30, a: -15, r: "You exploit the moment ice cold. The champagne was too risky for you, but three good mojitos will hardly register on the bill. It is the sensation of being a criminal mastermind.", next: "party_hub" }
		]
	},
	{
		id: "party_bar_6", loc: "bar",
		title: "The Apostle of Health",
		text: "Between you and a cold beer stands 'Feel-Good Management', blocking the fridge. 'Alcohol is poison for the synergies! Drink this energised ginger water!'",
		opts: [
			{ t: "Push past: 'I need hops!'", a: -10, l: 0, r: "You push him firmly aside, wrench the fridge open and grab the ice-cold pils. 'Toxic masculinity!' he whispers in horror, while you lever the cap off with a hiss.", next: "party_hub" },
			{ t: "'Beer is only a grain smoothie.'", l: 15, a: 5, r: "You draw him into a highly absurd, pseudo-scientific discussion about the isotonic benefits of wheat beer, until he rolls his eyes in exasperation and gives up. Won by sheer attrition.", next: "party_hub" },
			{ t: "Submit and drink the ginger water", l: 5, a: 15, r: "You submit to your fate and take a sip. It tastes like sharp soap mixed with dishwater. You are beyond furious with your own weakness and lack of backbone.", next: "party_hub" }
		]
	},
	{
		id: "party_bar_7", loc: "bar",
		title: "The Pink Drink",
		text: "The harassed barman presses an enormous, blindingly pink drink with three paper umbrellas and a sparkler into your hand without a word. 'For Chantal, take her that!'",
		opts: [
			{ t: "Simply leave the glass standing", l: 10, a: 0, r: "You are a systems administrator, not a butler. You turn round and walk off. Some poor intern will have to deal with the flaming glass.", next: "party_hub" },
			{ t: "Drink it yourself", l: 25, a: -10, r: "You pull on the straw. An explosion of flavour, pure syrupy sugar and cheap vodka! It is fantastic, even if the glowing drink and the sparkler make you look completely ridiculous.", next: "party_hub" },
			{ t: "Dutifully take it to Chantal", l: -10, a: 5, r: "You play the obedient waiter and balance the monstrosity through the crowd. Chantal takes it without a single 'thank you' and turns straight back round.", next: "party_hub" }
		]
	},

	// --- BUFFET EVENTS (7) ---
	{
		id: "party_buffet_1", loc: "buffet",
		char: "Egon",
		title: "The Guardian of the Mett",
		text: "Egon the caretaker is guarding the buffet. He has a watchful eye on the gigantic Mettigel. 'Stop! One roll each! Management has not eaten yet!' he growls.",
		opts: [
			{ t: "Argue and demand your rights", a: 25, l: -5, r: "You begin a heated ten-minute debate about workers' rights at the buffet. Egon folds his arms and stands as firm as a concrete wall. You leave hungry, stressed and with your blood pressure far too high.", next: "party_hub" },
			{ t: "Help yourself aggressively", a: -10, l: -10, r: "You push Egon resolutely aside. 'I work 60 hours a week, I shall take what I want!' Egon is so nonplussed by your sudden alpha energy that he lets you get on with it open-mouthed.", next: "party_hub" },
			{ t: "Confuse him with a technical term", l: 15, r: "You cry out in feigned panic: 'Egon, quick! The U-bend at the distribution box in the corridor is leaking!' Egon's eyes go wide and off he runs. You laugh quietly and shovel a massive mound of Mett onto your plate undisturbed.", next: "party_hub" }
		]
	},
	{
		id: "party_buffet_2", loc: "buffet",
		char: "Frau Elster",
		title: "The Tupperware Mafia",
		text: "Ms Elster is crouching half behind a tablecloth, secretly but extremely fast shovelling quantities of expensive scampi into an enormous plastic tub. When she notices you, she freezes.",
		opts: [
			{ t: "Produce a tub of your own, without a word", l: 30, a: -15, r: "The two of you nod at one another in silence and with deep understanding. Like a well-oiled syndicate you plunder the buffet and stuff the finest pieces into your tubs. An unholy but extremely tasty alliance.", next: "party_hub" },
			{ t: "Clear your throat and look disapproving", a: 20, r: "Her face goes scarlet, she stuffs the half-full tub into her handbag in a panic and hisses as she goes: 'Sneak!'. There you stand before the laden platters, the moral victor, grinning.", next: "party_hub" },
			{ t: "'That will cost you a plate for me.'", a: 0, l: 20, r: "She sighs in extreme irritation, but heaps a decent helping of the expensive roast beef onto your own plate. 'And in return you keep your mouth shut, Miller!' Deal accepted. Silence tastes delicious.", next: "party_hub" }
		]
	},
	{
		id: "party_buffet_3", loc: "buffet",
		title: "Vegan War",
		text: "The 'high-protein tofu salad' is standing dangerously close to the Bavarian sausage platter. Somebody has swapped the serving spoons. The mood among the guests is tense.",
		opts: [
			{ t: "Pour oil on the fire", a: 40, l: 15, r: "You plant yourself in the middle of the crowd and call out theatrically: 'Here, is there actually pork fat in the organic tofu, for the flavour?!' The uproar and outrage that follow are absolutely worthy of cinema.", next: "party_hub" },
			{ t: "Just take salad and go", l: 10, a: 5, r: "You do not get involved at all, grab a bit of greenery in haste and leave the danger zone before the first insults start flying. Good for the nerves.", next: "party_hub" },
			{ t: "Quietly clean and sort the spoons", l: -15, a: -10, r: "You wipe the spoons meticulously with a napkin and put them back in exactly the right place. You have just prevented a bloody civil war at the buffet. Nobody notices, but you know.", next: "party_hub" }
		]
	},
	{
		id: "party_buffet_4", loc: "buffet",
		char: "Kevin",
		title: "The Chocolate Fountain Drama",
		text: "The chocolate fountain is overflowing! Kevin has thrown in an enormous chunk of melon that is blocking the outlet. The sticky flood is approaching the white carpet.",
		opts: [
			{ t: "Pull the plug on the pump", l: 0, a: 10, r: "You crawl under the table and mercilessly pull the plug. The fountain expires with a rattle. The bystanders boo you loudly because dessert has been cancelled, but you have prevented water damage.", next: "party_hub" },
			{ t: "Bravely fish the melon out", l: -20, a: 15, r: "With reckless courage you reach into the boiling brown mass and pull the gummed-up lump of melon out. Your shirt sleeve is ruined and horribly sticky, but the white carpet is saved. A silent martyrdom.", next: "party_hub" },
			{ t: "Hold a strawberry skewer in it", l: 25, a: -10, r: "After us, the deluge! You exploit the wild fountain of liquid chocolate without mercy. By the time the carpet is finally ruined, you are long since full and far away.", next: "party_hub" }
		]
	},
	{
		id: "party_buffet_5", loc: "buffet",
		title: "The VIP Zone",
		text: "At the end of the buffet there is a dish of real caviar and oysters. A sign says: 'Management only'. Your mouth waters.",
		opts: [
			{ t: "Obey the rules", a: 15, l: -5, r: "You make do dutifully with the watery potato salad. As you chew, you have to watch Dr. Wichtig over there slurping down one expensive oyster after another. The class system hurts.", next: "party_hub" },
			{ t: "Discreetly swap the signs", a: 10, l: 15, r: "You deftly swap the VIP sign with the one on the 'vegan soya stew'. The bafflement of the managers suddenly bending over the sludge is simply priceless.", next: "party_hub" },
			{ t: "Help yourself without a scruple", a: -5, l: 20, r: "You shovel the absolute luxury onto your paper plate. A head of department stares at you in disbelief, but is so shocked by your effrontery that he cannot get a word out. You eat like an emperor.", next: "party_hub" }
		]
	},
	{
		id: "party_buffet_6", loc: "buffet",
		title: "The Sauce Accident",
		text: "Somebody ahead of you has spilt. On the floor lies a thick blob of ketchup. The head of HR is tottering straight towards it in her expensive Prada shoes.",
		opts: [
			{ t: "Say nothing and watch", l: 15, a: 25, r: "*Splat*. She skids completely, windmills her arms, and ketchup sprays right across her white dress. You watch, grinning quietly.", next: "party_hub" },
			{ t: "Quickly walk through it yourself", l: 5, a: 5, r: "You deliberately tread right in it and smear the red puddle across the floor. Your left shoe now sticks with every step, but the treacherous trap for your colleague has been defused.", next: "party_hub" },
			{ t: "'Mind out, ketchup!'", l: -5, a: -10, r: "She stops at the last moment, wobbles briefly on the high heels and breathes out. 'Phew, thank you Miller! That dress was expensive! You are my hero!' Your karma account fills up.", next: "party_hub" }
		]
	},
	{
		id: "party_buffet_7", loc: "buffet",
		char: "Kevin",
		title: "Decoration Eater",
		text: "You watch Kevin chewing desperately on a piece of decorative lemon, peel and all, because he thinks it is part of the main course. He looks close to tears.",
		opts: [
			{ t: "Praise him: 'Eat the peel too, it has vitamins!'", l: 10, a: 15, r: "Kevin bravely gags the hard, bitter piece of peel down while trying to smile. 'Very... healthy!' he croaks.", next: "party_hub" },
			{ t: "Release him: 'That is decoration, Kevin.'", l: -5, a: -5, r: "Kevin spits the bitter piece straight into a napkin. 'Ugh! I thought it was that trendy molecular cuisine...' He is endlessly grateful to you for saving his taste buds.", next: "party_hub" },
			{ t: "Ignore it", l: 5, a: 0, r: "You watch with relish. He will work out for himself eventually that lemon peel is not a delicacy. In life one learns only through pain and bitter experience.", next: "party_hub" }
		]
	},

	// --- DANCEFLOOR EVENTS (7) ---
	{
		id: "party_dance_1", loc: "dance",
		char: "Chantal",
		title: "The Agile Flash Mob",
		text: "Chantal has captured the microphone and is trying to start a rehearsed 'corporate dance' to promote synergies. She is waving you onto the dance floor aggressively.",
		opts: [
			{ t: "Stand stock still", a: 15, l: 10, r: "You do not move a single muscle and simply stare at her without expression. Eventually Chantal gives up in embarrassment, breaks off the dance, and the music plays awkwardly on.", next: "party_hub" },
			{ t: "Cut the power to the PA", l: 10, a: -30, r: "You rip the mains plug of the PA out of the wall. The music dies with an ugly scratch. 'Oh, power cut,' you call innocently into the silence. The entire workforce secretly breathes out.", next: "party_hub" },
			{ t: "Join in and dance the Macarena", a: 60, l: -15, r: "You go onto the floor and sacrifice the very last of your dignity. The second-hand shame is physically perceptible throughout the room. But Chantal cheers, claps in time and adores you for it.", next: "party_hub" }
		]
	},
	{
		id: "party_dance_2", loc: "dance",
		char: "Dr. Wichtig",
		title: "The Boss Escalates",
		text: "Dr. Wichtig has tied his tie round his head like Rambo and is attempting to breakdance in the middle of the circle. It looks dangerously like a slipped disc in the making.",
		opts: [
			{ t: "Take him off the floor out of pity", l: -10, a: 10, r: "You go over, take him by the arm and whisper: 'Boss, the important investors are watching.' He stops abruptly, turns chalk white and straightens his tie. You have saved him from total ruin.", next: "party_hub" },
			{ t: "Secretly film blackmail material", a: 25, l: 10, r: "You get it all on camera. The boss rolls about the floor without coordination. That is the finest high-resolution blackmail material for the next salary negotiation. You grin wickedly.", next: "party_hub" },
			{ t: "Cheer and applaud", l: 20, a: -5, r: "Encouraged by your clapping, the boss attempts a crashing 'worm' and audibly splits his suit trousers in the process.", next: "party_hub" }
		]
	},
	{
		id: "party_dance_3", loc: "dance",
		title: "Requests for the DJ",
		text: "The DJ has been playing unbearable Ballermann schmaltzy pop for an hour. The audience is visibly suffering. The DJ grins behind a pair of cheap sunglasses.",
		opts: [
			{ t: "Force him to play nineties Eurodance", l: 15, a: -10, r: "'Play Rhythm is a Dancer, or I cut the guest Wi-Fi right now,' you threaten. The DJ obeys in fright. The beat drops and the mood on the floor explodes into pure nineties ecstasy.", next: "party_hub" },
			{ t: "Bang your head on the table", a: 30, l: 0, r: "You cannot take a third Helene Fischer song. You knock your head lightly and repeatedly against the table top. The dull physical pain distracts wonderfully from the auditory suffering.", next: "party_hub" },
			{ t: "Hijack the aux cable", a: -20, l: 5, r: "You rip his aux cable out without mercy and put hard, dark synthwave on from your phone. The DJ almost weeps, but the assembled IT department celebrates you as a god.", next: "party_hub" }
		]
	},
	{
		id: "party_dance_4", loc: "dance",
		title: "The Approaching Conga",
		text: "A conga line is snaking through the room. It is led by the man from Financial Control with a whistle. The train is heading straight for you!",
		opts: [
			{ t: "Block the train", a: 20, l: 5, r: "You plant yourself in the way, legs apart and arms folded. 'The line ends here!' you bellow. The man from Financial Control blows his whistle at you furiously, but the chain breaks up. Revolution!", next: "party_hub" },
			{ t: "Dive for safety", l: 10, a: -10, r: "With a deft dive you duck under a poser table and crawl behind a pillar. You have escaped absolute corporate madness by a second.", next: "party_hub" },
			{ t: "Reluctantly join the line", a: 40, l: -15, r: "You take hold of the shoulders of the heavily perspiring man in front of you and fall in. As you bob along in time, you can literally sense the will to live leaving your body.", next: "party_hub" }
		]
	},
	{
		id: "party_dance_5", loc: "dance",
		title: "The Smooch Song",
		text: "The lights go down. The opening bars of 'Careless Whisper'. A slightly tipsy colleague from Accounts is heading purposefully for you with a swooning look in her eye.",
		opts: [
			{ t: "Push Kevin forward as a substitute victim", l: 10, a: -5, r: "You grab the apprentice by the collar and place him precisely between yourself and your colleague. She immediately wraps herself round Kevin. He looks panic-stricken, but you are free and off to get a beer.", next: "party_hub" },
			{ t: "Flee to the toilets", l: 15, a: 5, r: "You turn on your heel and sprint for the gents at a steady jog. Your colleague is confused and instead seizes the utterly bewildered Egon the caretaker for the slow dance.", next: "party_hub" },
			{ t: "Dance with her", a: 40, l: -10, r: "For what seems an eternity you sway back and forth with her, as stiff as a board. She slurs into your ear and treads painfully on your foot three times. Pure torture.", next: "party_hub" }
		]
	},
	{
		id: "party_dance_6", loc: "dance",
		title: "The Barging Dancer",
		text: "A completely euphoric bloke from Logistics is dancing like a rubber ball. He bounces wildly in circles and rams his elbow painfully into your ribs.",
		opts: [
			{ t: "Barge back and open the mosh pit", a: 20, l: -15, r: "You put your shoulder in and ram him back hard. He laughs out loud and shoves again. The two of you have started a small IT mosh pit in the middle of the dance floor.", next: "party_hub" },
			{ t: "Withdraw in a temper", a: 15, l: 5, r: "You rub your aching ribs and retreat crossly to the quiet edge. Wild, extrovert people are simply exhaustingly hard work.", next: "party_hub" },
			{ t: "Discreetly trip him up", a: -10, l: 0, r: "You put a foot out inconspicuously. He stumbles inelegantly and goes down full length on the parquet. He dances distinctly more quietly and respectfully after that. Danger discreetly averted.", next: "party_hub" }
		]
	},
	{
		id: "party_dance_7", loc: "dance",
		title: "The Wallflowers",
		text: "You are standing at the edge of the dance floor. Beside you are three other IT people. All are holding their beer in front of their chests and nodding in time with millimetre precision.",
		opts: [
			{ t: "Simply nod along", l: 20, a: -5, r: "You integrate seamlessly into the pack. Together you are a silent, nodding brotherhood of the rhythmically illiterate. No words needed, only the beat and the beer.", next: "party_hub" },
			{ t: "Force the group to dance", a: 15, l: -10, r: "You drag the poor devils mercilessly onto the lit floor. They look like frightened deer in the headlights and hate you from this moment with all their hearts.", next: "party_hub" },
			{ t: "Do the robot ironically", l: 5, a: 10, r: "You start making extremely stiff, ironic robot moves. The other IT people laugh quietly and raise their glasses to you. The nerds have a new leader, and he dances like a washing machine.", next: "party_hub" }
		]
	},

	// --- LOUNGE EVENTS (7) ---
	{
		id: "party_lounge_1", loc: "lounge",
		char: "Gabi",
		title: "Gabi's Gossip Corner",
		text: "Gabi is sitting in a wing chair. 'Do you actually know why the head of sales is sweating so much today? He wrote off his company car and has not reported it yet.'",
		opts: [
			{ t: "Decline from a position of moral superiority", a: 15, l: -5, r: "'I take no part in that sort of thing,' you say loftily. 'Spoilsport,' Gabi hisses, and rolls her eyes. Off you go to the dullards at the bar.", next: "party_hub" },
			{ t: "Store the information for later", l: 15, a: 5, r: "Knowledge is power, particularly in IT. You merely nod slightly while noting the detail about the wrecked company car very precisely indeed. That could make an excellent lever another time.", next: "party_hub" },
			{ t: "Sit down and join in the gossip", l: 40, a: -20, r: "For half an hour the two of you exchange poison, bile and the most vicious rumours in the company. An absolute feast for the soul.", next: "party_hub" }
		]
	},
	{
		id: "party_lounge_2", loc: "lounge",
		title: "The Power Nap",
		text: "You find a sofa off to one side. No music, no colleagues. The cushions look unbelievably soft. Your body is longing for sleep.",
		opts: [
			{ t: "Build a fortress out of two cushions", l: 30, a: -10, r: "It is completely absurd, but you build yourself an opaque wall of soft sofa cushions. Inside your fortress nothing resembling social interaction can reach you at all. Glorious.", next: "party_hub" },
			{ t: "Close your eyes for 5 minutes", l: 60, a: -40, r: "You fall into a coma-like deep sleep. When you wake, somebody has stuck a yellow Post-it with a smiley face on your forehead, but you are profoundly relaxed and reborn.", next: "party_hub" },
			{ t: "Stay alert", a: 20, l: -10, r: "The admin paranoia within will not let you rest. You sit stiffly and scan the half-darkness continuously for enemies or lurking superiors. Genuine recuperation looks different.", next: "party_hub" }
		]
	},
	{
		id: "party_lounge_3", loc: "lounge",
		title: "The Hidden Bottle",
		text: "You reach behind the cushion of a sofa. Your hand meets something cold and made of glass. A half-full, uncorked bottle of unbelievably expensive red wine.",
		opts: [
			{ t: "Take a decent swig", l: 35, a: -25, r: "You raise it and drink straight from the bottle like a barbarian. The vintage is a fine one and tastes superb. The glaring lights and the noise of the party suddenly become much softer and more bearable.", next: "party_hub" },
			{ t: "Pour the bottle down the toilet", a: 20, l: 0, r: "Class war! You take the sinfully expensive bottle to the toilets and sink €300 down the drain with relish. It is like being a modern Robin Hood, only slightly stupider.", next: "party_hub" },
			{ t: "Ignore it and leave it there", l: 5, a: 10, r: "You are, after all, still on duty... in a manner of speaking. Your own prim correctness annoys you a little, and you fetch a still water from the bar instead.", next: "party_hub" }
		]
	},
	{
		id: "party_lounge_4", loc: "lounge",
		title: "Deep Talk in the Half-Dark",
		text: "A colleague from Logistics is sitting weeping in the corner. He grasps your sleeve and tells you about his divorce and his debts.",
		opts: [
			{ t: "Fob him off coldly", a: 25, l: 5, r: "'Sorry mate, I am in IT, not a therapist.' Your colleague stares at you and weeps even louder. You get your peace.", next: "party_hub" },
			{ t: "Comfort him and listen", l: -15, a: -15, r: "You let him weep on your shirt for half an hour and listen to the tragedy. It costs an immense amount of emotional strength, but this evening you were genuinely a good and empathetic human being.", next: "party_hub" },
			{ t: "Fetch him a beer and disappear", l: 15, a: 0, r: "You press a cold can into his hand without a word, mumble something about chin up, and retreat backwards into the saving darkness of the noisy dance floor.", next: "party_hub" }
		]
	},
	{
		id: "party_lounge_5", loc: "lounge",
		title: "The Couch Blockade",
		text: "Three interns have completely occupied the largest, most comfortable couch. They are staring silently at their phones and watching TikToks with the sound on.",
		opts: [
			{ t: "Squeeze into the middle", l: 15, a: -5, r: "With pure indifference you sit down precisely in the middle of the group. The interns edge aside in embarrassment and say nothing. You have conquered the best seat in the lounge.", next: "party_hub" },
			{ t: "Throttle the Wi-Fi at the router", a: 5, l: 20, r: "You produce your admin phone, reach the router remotely and kill the speed. The videos buffer. The interns swear, get up and leave.", next: "party_hub" },
			{ t: "Sigh and remain standing", a: 15, l: 5, r: "You stay standing beside them out of stubbornness, glaring, and sense your chronic back pain slowly setting in again.", next: "party_hub" }
		]
	},
	{
		id: "party_lounge_6", loc: "lounge",
		title: "The Lost Smartphone",
		text: "An abandoned iPhone is blinking on the little side table. A message from 'Bunny ❤️' pops up: 'When are you finally coming home?!'",
		opts: [
			{ t: "'Still at the afterparty!'", a: 20, l: 0, r: "You type the reply quickly and send the message. That will guarantee a colossal domestic drama for the owner tonight.", next: "party_hub" },
			{ t: "Hand the phone in at Reception", l: -5, a: 5, r: "You take the ringing device dutifully to Gabi at Reception. Somebody will be very pleased tomorrow.", next: "party_hub" },
			{ t: "Ignore it", l: 10, a: 0, r: "Simply look away. Not your phone, not your drama, not your building site. You stroll on and leave the thing blinking away cheerfully in the darkness.", next: "party_hub" }
		]
	},
	{
		id: "party_lounge_7", loc: "lounge",
		title: "Awkward Silence",
		text: "You sink exhausted into an armchair. Only then do you notice that the CEO is sitting in the armchair right beside it. He is staring silently into his whisky glass. He looks at you. You look at him. Silence.",
		opts: [
			{ t: "Nod and stay sitting in silence", l: 20, a: -10, r: "The two of you nod briefly at one another and then sit side by side for 10 minutes in absolute, respectful silence. Without a word being exchanged, a strong bond has formed between you.", next: "party_hub" },
			{ t: "Leap up in panic and leave", a: 15, l: 5, r: "You stammer an inarticulate 'oops!', jump up and practically run out of the lounge. The CEO watches you go and shakes his head very slowly, in disappointment.", next: "party_hub" },
			{ t: "Break the silence: 'Hard week, eh?'", l: 5, a: 5, r: "He sighs extremely deeply and looks into his glass. 'You have no idea of the pressure up there, Miller.' After that the same oppressive silence returns as before.", next: "party_hub" }
		]
	},

	// --- OUTSIDE EVENTS (7) ---
	{
		id: "party_outside_1", loc: "outside",
		title: "Cold Air and Nicotine",
		text: "You step outside. It is drizzling lightly. A few shivering colleagues from Accounts are standing under the canopy smoking in silence. The mood is pleasantly melancholy.",
		opts: [
			{ t: "Join them without a word", l: 20, a: -15, r: "You lean against the cold, damp wall of the building. Nobody says a word, all you hear is the quiet crackle of the cigarettes.", next: "party_hub" },
			{ t: "Ask for a light although you do not smoke", l: 5, a: 5, r: "You try desperately to belong. The smoking colleagues look at you suspiciously. In embarrassment you pretend to have left your cigarettes inside, and creep back in.", next: "party_hub" }
		]
	},
	{
		id: "party_outside_2", loc: "outside",
		title: "The Taxi Drama",
		text: "A completely unknown colleague from IT Infrastructure is swearing loudly into his phone. His Uber has stood him up. He is plainly listing to one side.",
		opts: [
			{ t: "Ignore him", a: 10, l: 5, r: "You shrug. Let the wolves of the industrial estate have him. You turn round and go back inside into the warm.", next: "party_hub" },
			{ t: "Help him call a taxi", l: -10, a: -10, r: "You get him a car through your app. He falls slurring round your neck and hugs you damply.", next: "party_hub" }
		]
	},
	{
		id: "party_outside_3", loc: "outside",
		title: "Locked Out",
		text: "The back door has swung shut. Somebody has kicked the paper cup away. You and three others are now standing in the rain with no way back in.",
		opts: [
			{ t: "Hammer on the glass", a: 20, l: -5, r: "You beat on the thick pane like a madman. After endless minutes Kevin opens up, grinning, and laughs at you all. You are soaked through and your mood is in the cellar.", next: "party_hub" },
			{ t: "Take the opportunity and go home", l: 40, a: -10, r: "The universe has given a clear sign. You take the perfect excuse, walk straight to your car and knock off for the day, contentedly (in your head, at least).", next: "party_hub" }
		]
	},
	{
		id: "party_outside_4", loc: "outside",
		title: "Markus's Masterpiece",
		text: "A man in an expensive suit is smoking a cigar. He slurs: 'Brilliant chap, that Markus! Just sold me your quantum blockchain. Live migration by Monday!' We do not even have enough RAM for the mail server.",
		opts: [
			{ t: "Play along and smile", l: 20, a: 15, r: "'Absolutely, Monday it will all run without a hitch!' You lie to him ice cold and grin. Let Markus work out on Monday how he explains the disaster. Not your circus, not your monkeys.", next: "party_hub" },
			{ t: "Panic", a: 30, l: -10, r: "You immediately calculate in your head the nights and overtime this nonsense will cost. A cold sweat breaks out. You run to the bar in urgent need of a double.", next: "party_hub" },
			{ t: "Tell the truth", a: 40, l: -10, r: "'That is technically impossible and complete nonsense,' you make clear. The customer sobers up on the spot, throws his cigar away and storms inside to tear Markus's head off. There will be massive consequences!", next: "party_hub" }
		]
	},
	{
		id: "party_outside_5", loc: "outside",
		title: "The Frozen One",
		text: "The new intern is standing in the wind in a thin party dress, shivering like a leaf while she waits for her Uber. She looks wretched.",
		opts: [
			{ t: "Chivalrously offer your jacket", l: -10, a: -15, r: "She takes your warm jacket with enormous gratitude and wraps herself up in it. Now you are the one standing in the cold wind freezing your backside off.", next: "party_hub" },
			{ t: "Offer advice: 'Move about, that warms you up!'", a: 15, l: 5, r: "You clap your hands and cheer her on. She stares at you in disbelief and loathing. 'Thanks for nothing, you tosser.' Mission botched.", next: "party_hub" },
			{ t: "Go back inside - too cold out here", l: 15, a: 0, r: "You have absolutely no wish to catch pneumonia for somebody else. You mumble a 'good luck' and flee quickly back into the heated lobby.", next: "party_hub" }
		]
	},
	{
		id: "party_outside_6", loc: "outside",
		title: "The Car Park Crash",
		text: "You watch a car reverse extremely hard into the finance director's expensive SUV while pulling out. The glass shatters. The driver gets out: it is the head of Legal. He sees you.",
		opts: [
			{ t: "Cover your eyes: 'I saw nothing!'", l: 10, a: 5, r: "You spin away and whistle. The fleeing lawyer puts his foot down. You leave the coming office drama to the others with relish. You saw nothing.", next: "party_hub" },
			{ t: "'This stays between us. For a favour.'", l: 20, a: -10, r: "He nods hectically, wipes the sweat from his forehead and roars off with tyres squealing. You now hold a massive, illegal favour from the most powerful department in the company.", next: "party_hub" },
			{ t: "Dutifully take a photo for the finance director", a: 10, l: -5, r: "You produce your phone and secure the evidence. The head of Legal loses it completely and bellows at you across half the car park. But in the end justice prevails.", next: "party_hub" }
		]
	},
	{
		id: "party_outside_7", loc: "outside",
		title: "The Noise Complaint",
		text: "An angry bloke in a dressing gown is standing at the fence of the grounds. 'TURN THAT RUDDY MUSIC DOWN OR I'M CALLING THE POLICE! I WANT TO SLEEP!'",
		opts: [
			{ t: "'THEN MOVE HOUSE!'", a: 30, l: -5, r: "'THEN GO AND LIVE IN THE WOODS, GRANDDAD!' you bellow back. The two of you have an epic slanging match across the fence. It does you unbelievable good to bawl out all that pent-up frustration.", next: "party_hub" },
			{ t: "'I shall have a word with the DJ.'", l: 5, a: -10, r: "You nod understandingly. 'You are absolutely right, I shall see to it.' You go inside and of course do absolutely NOT have a word with the DJ, but the neighbour is pacified for now.", next: "party_hub" },
			{ t: "Provoke the police: 'Go on then, call them!'", a: 40, l: 10, r: "'Go on and call them then, you coward!' you goad. Your brilliantly wicked plan: once the police turn up and end the party, you can finally go home legally.", next: "party_hub" }
		]
	},

	// --- TOILET EVENTS (7) ---
	{
		id: "party_toilet_1", loc: "toilet",
		title: "The Groaning Cubicle",
		text: "You enter the washroom. From the middle cubicle you hear a rhythmic squeaking and muffled groaning. Under the door you can see the head of HR's red heels.",
		opts: [
			{ t: "Get your phone out and film the feet", l: 25, a: -10, r: "You hold the phone flat above the floor and silently take a high-resolution photograph of the red shoes in a compromising position.", next: "party_hub" },
			{ t: "Wash your hands loudly and leave", l: 15, a: 10, r: "You want absolutely nothing to do with this HR scandal. You turn the tap on extremely loudly, wash your hands and all but flee the room.", next: "party_hub" },
			{ t: "Hammer on the door: 'Cleaning!'", a: 30, l: -5, r: "You beat on the door with the flat of your hand and bellow. Inside, pure naked panic breaks out. Somebody slips with a slap and swears. You laugh up your sleeve.", next: "party_hub" }
		]
	},
	{
		id: "party_toilet_2", loc: "toilet",
		title: "Conversations with the Mirror",
		text: "You are standing at the basin. A sales man is washing his hands, staring deep into the mirror and muttering: 'You are a tiger. You are a doer.' He is preparing to flirt.",
		opts: [
			{ t: "'Give them hell, tiger!'", l: 5, a: -5, r: "He looks at you in complete surprise at first, then grins broadly and gives you finger guns with both hands.", next: "party_hub" },
			{ t: "Dry your hands without comment", a: 10, l: 0, r: "You merely shake your head slightly at so much manufactured salesman's psychology, take a paper towel in silence and leave the room. There are people, and then there are people.", next: "party_hub" }
		]
	},
	{
		id: "party_toilet_3", loc: "toilet",
		title: "Cubicle Gossip",
		text: "You have locked yourself in a cubicle to get your breath back. Two people come in. They start slagging people off loudly at the basins: 'Did you see Miller's jumper? IT really has lost the plot.' They are talking about YOU!",
		opts: [
			{ t: "Listen in silence", l: 20, a: 15, r: "You do not move a millimetre and listen to the whole tirade. It makes you extremely angry, but now you know exactly who the treacherous snakes in the office are.", next: "party_hub" },
			{ t: "Flush and step out", a: 25, l: -5, r: "You flush loudly, throw the door open and draw yourself up in front of them. The pair freeze instantly into pillars of salt. You walk past them without a word, in lofty silence.", next: "party_hub" }
		]
	},
	{
		id: "party_toilet_4", loc: "toilet",
		title: "The Toilet Paper Monopoly",
		text: "Somebody in the cubicle next to yours is knocking desperately on the partition. 'Hello? Is anybody there? My paper has run out. Have you got any left?' You look at your own full roll.",
		opts: [
			{ t: "'What is it worth to you?'", l: 10, a: 20, r: "'Five euros?' asks the quavering voice. A crumpled note appears under the door. You take the money and pass the paper across. Pure, dirty capitalism in its purest form.", next: "party_hub" },
			{ t: "Say nothing and leave silently", l: 25, a: 5, r: "You pretend not to be there at all. You creep silently out of the cubicle and leave the room. The poor devil is probably still sitting there at dawn.", next: "party_hub" },
			{ t: "Push a sheet under the door", l: -5, a: -10, r: "You tear off a generous piece and push it under the partition. 'Oh my God, thank you! I shall never forget this!' comes the whimper from the other side. You are the rescuer in the hour of need.", next: "party_hub" }
		]
	},
	{
		id: "party_toilet_5", loc: "toilet",
		title: "The Missing Lock",
		text: "The cubicle will not lock: the bolt is missing. Somebody has kicked it off. You have to sit on the bowl and hold the door shut with your foot at the same time.",
		opts: [
			{ t: "Give up in irritation and leave", a: 15, l: 5, r: "You pull your trousers back up and leave the cubicle swearing. This company cannot even manage simple door locks. How is the network supposed to work?", next: "party_hub" },
			{ t: "Go through with the acrobatics", l: 10, a: 10, r: "You cramp your leg and brace your foot against the door while trying to conduct your business. It works, after a fashion. Your leg is still trembling as you wash your hands.", next: "party_hub" },
			{ t: "Simply leave the door open", a: 30, l: 0, r: "Anyone who looks in has only themselves to blame! An unsuspecting colleague pushes the door open, stares at you in disbelief and flees at once with a loud 'sorry!'.", next: "party_hub" }
		]
	},
	{
		id: "party_toilet_6", loc: "toilet",
		char: "Kevin",
		title: "The Axe Effect",
		text: "Two apprentices (Kevin among them) have evidently fogged themselves in front of the mirror with an entire can of body spray. The air is shimmering. It smells of musk and death by asphyxiation.",
		opts: [
			{ t: "Throw the window open", a: 10, l: -10, r: "You throw the window wide open. It is freezing outside, but the toxic musk fog finally clears. The scantily clad apprentices are pitifully cold, but you can breathe again.", next: "party_hub" },
			{ t: "Cough and scold: 'Are you mad?!'", a: 20, l: -5, r: "You splutter and flap your arms. Kevin grins stupidly: 'It pulls the girls, boss!' You lose the last remnant of your faith in the youth of today.", next: "party_hub" },
			{ t: "Breathe deeply: 'Smells like 2005!'", l: 10, a: -10, r: "You bear the acrid stench with humour and high-five the lads. Your lung capacity drops by 5 per cent on the spot, but you are a cool superior.", next: "party_hub" }
		]
	},
	{
		id: "party_toilet_7", loc: "toilet",
		title: "Blockage, Level Red",
		text: "You open a cubicle. The water in the bowl is up to the rim. An enormous quantity of toilet paper is floating on top. One drop more and disaster takes its course.",
		opts: [
			{ t: "Press flush", a: 30, l: 20, r: "The water rises rapidly... and pours over the rim onto the tiles like a waterfall! You leap back in panic, run out of the room and leave the disaster to the next visitor.", next: "party_hub" },
			{ t: "Write an 'OUT OF ORDER' sign", l: 10, a: -5, r: "Very responsible. You stick a paper towel to the door with a fat warning: 'OUT OF ORDER!'. Egon the caretaker will have an almighty fit tomorrow morning.", next: "party_hub" },
			{ t: "Give the plunger a chance", l: -10, a: -15, r: "You do hard, disgusting manual labour. After a few vigorous thrusts the water finally drains away with a loud *slurp*. You are the unsung, heroic saviour of the sanitary facilities.", next: "party_hub" }
		]
	},

	// ===============================================
	// THE 5 ENDINGS (picked by the engine)
	// ===============================================
	{
		id: "party_finale_rage",
		title: "FINALE: BOFH MELTDOWN",
		text: "23:00. The music is dreadful, the colleagues are a nuisance, and the second-hand shame of this evening has destroyed every single one of your remaining brain cells. Your blood pressure is in the critical range.\n\nThen a loud bang! Somebody has tripped over the power cable. The music dies. The lights go out. Out of the total darkness Dr. Wichtig calls in panic: 'MILLER! ARE YOU STILL THERE?! DO SOMETHING!'",
		opts: [
			{
				t: "The epic tirade - the rage quit",
				action: { fn: "finishParty", args: ["LEGEND", "Your pulse is at 180. Enough is enough. You seize the DJ's battery-powered emergency microphone. You bellow a three-minute epic tirade into the absolute darkness. You speak of the concentrated incompetence of the workforce, recite the most absurd browser histories from memory and call the CEO a glorified tie rack. You drop the microphone and leave the hall through the fire exit without a word. Nobody will ever forget this evening. A legend was born."] }
			}
		]
	},
	{
		id: "party_finale_houdini",
		title: "FINALE: THE PHANTOM EXIT",
		text: "23:00. You have spent the evening for the most part extremely relaxed. You ducked away, slept, ignored people and plundered the buffet. You have become extremely lazy, extremely quiet and practically invisible.\n\nA loud bang! The main cable has been torn out of the wall. The hall is pitch black. Your colleagues are screaming over one another in panic.",
		opts: [
			{
				t: "Vanish in the dark like Houdini",
				action: { fn: "finishParty", args: ["HOUDINI", "While everybody else stumbles over one another in the dark, screaming and looking for the fire exit, you exploit the chaos masterfully. You hunch your shoulders, crawl silently under the catering buffet, blindly grab a full bottle of fizz on the way past and glide like a shadow through the side door. By 23:15 you are already lying on your sofa in tracksuit bottoms. A perfect escape. Nobody will ever be able to prove exactly when you left."] }
			}
		]
	},
	{
		id: "party_finale_hero",
		title: "FINALE: THE SAVIOUR",
		text: "23:00. You helped Kevin, settled the argument at the buffet and, despite all the madness, kept a cool head. Your values are absolutely in the green.\n\nSparks fly! The lights go out. Silence. Then pure panic breaks out. Chantal shrieks. Somebody knocks a glass over. You are the only person in the room who knows exactly where the main fuse box is.",
		opts: [
			{
				t: "Bridge the fuse blind",
				action: { fn: "finishParty", args: ["HERO OF LABOUR", "You feel your way blind and unerring through the screaming crowd to the distribution box on the back wall. You find the contacts by touch, bend a paperclip out of your pocket into shape and bridge the fuse. A click. The lights flicker and come back on. The crowd falls silent. Then deafening cheers break out. Even Dr. Wichtig is standing on a chair applauding. You have saved the party. There is no money in it, but on this evening you are the absolute hero of the company."] }
			}
		]
	},
	{
		id: "party_finale_gossip",
		title: "FINALE: THE GOSSIP KING",
		text: "23:00. You spent the whole evening in the lounge and at the bar. You gossiped with Gabi, scrounged drinks and watched the goings-on. You are extremely loose and full of dirty secrets.\n\nThe lights fail. The DJ swears loudly. In the dark you hear two people whispering quietly right beside you. It is the boss and Ms Elster! They are plainly discussing the redundancies planned for next year.",
		opts: [
			{
				t: "Capture the VIP corner",
				action: { fn: "finishParty", args: ["INSIDER", "You clear your throat quietly in the dark. The boss freezes. 'Who is there?' You answer with enormous calm: 'Only IT, boss. Do not worry, my silence can be bought.' A quiet laugh comes from Ms Elster. In the darkness you simply join the inner circle of power. Under cover of the blackout the three of you exchange intrigues and secrets until the power comes back. You are untouchable now."] }
			}
		]
	},
	{
		id: "party_finale_standard",
		title: "FINALE: THE ESCALATION",
		text: "23:00. You took a bit of everything with you. You danced along, cringed, drank and absorbed the whole madness of this company. It was loud, it was embarrassing, it was completely insane.\n\nThe lights go out without warning. The power is dead. Absolute darkness. Out of nowhere a tipsy colleague from Logistics calls out loudly: 'Kumbaya, my Lord!'",
		opts: [
			{
				t: "Sing along in the dark",
				action: { fn: "finishParty", args: ["TEAM PLAYER", "What you really want to do is scream, but somehow the madness has infected you. You start quietly singing along. One by one the entire workforce joins in, there in the dark. A bizarre, almost magical team-building moment arises in the pitch-black hall. You stand between Kevin and Chantal, the three of you swaying in time, and it dawns on you: somehow you are fond of these complete idiots. An almost conciliatory end to a dreadful working day."] }
			}
		]
	}
];
