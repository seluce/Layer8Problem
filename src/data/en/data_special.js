// i18n-status: translated
// The leet[] lines came out of engine_events.js during the interface pass and
// were translated with it (third session); everything else followed in the
// items/special block.

export const special = {


	/* The two safety valves: what happens when anger or the boss radar
	   hits 100 for the first time. Sat in the middle of
	   checkEndConditions as twenty strings until v4.0.0 - text belongs
	   with the data, not in the control flow. */
	valveTexts: {
		rage: [
                    "You go to the kitchenette and stare at the rotating microwave without moving. Once you have pictured the whole place burning, you go back to your desk.",
                    "You lock yourself in the copier room and scream your rage into a fresh pack of printer paper. It muffles the sound beautifully. You straighten your tie.",
                    "Your patience finally gives way. You grab an empty coffee cup and crush it slowly, with relish, inside your fist. That had to happen.",
                    "You escape to the toilets, wash your face in ice-cold water and stare at your reflection. You mutter to yourself, several times, that murder is still a criminal offence.",
                    "An invisible thread of patience gives way. You stand up without a word and kick the bin with everything you have. Before anyone can react you are sitting down again, staring stoically into nothing.",
                    "You throw the window open and roar one long noise into the courtyard. A pigeon nearly falls off the ledge in fright. You close the window. Your pulse settles.",
                    "A quiet crack breaks the silence. You have bitten down on your biro so hard that it splinters. You carry on working with a little ink on your teeth.",
                    "You sign out briefly and walk into the dusty archive. Out of sheer frustration you build a tower of old ring binders, purely to destroy it with one well-aimed kick.",
                    "Tock. Tock. Tock. You let your forehead drop onto the desktop three times, gently but firmly. Your colleagues decide collectively to ignore the incident.",
                    "In blind fury you type an extremely offensive email to the 'all staff' distribution list. Your finger hovers over the send button before you sigh and delete the lot."
                ],
		chef: [
                    "The phone rings off the hook before the door is flung open. The boss stands in the frame, breathing hard: 'Miller! One more stunt like that and you can pack up your coffee mug!'",
                    "An email from the boss pops up, entirely in red type and Comic Sans: 'MILLER! MY OFFICE! NOW!' After a deafening dressing-down you return to your desk.",
                    "Dr Wichtig storms up to your desk and slams a fat ring binder down on the keyboard. 'Your way of working is unacceptable! Next time somebody here will be leaving!'",
                    "The boss catches you in the corridor. 'Miller, you cost me more nerves than my divorce did! This is an official written warning!'",
                    "HR rings. 'Mr Miller, the managing director has just thrown a hole punch at his monitor. It was about you. Please pull yourself together!'",
                    "The boss looms up behind you. 'If this carries on, I will have you print out the entire intranet and file it as a punishment! Final warning!'",
                    "An angry voice message from the boss: 'Miller, if my pulse climbs any further because of you, I will invoice you for my medical bills! Behave yourself!'",
                    "Dr Wichtig drums his fingers impatiently on your desk. 'I have seen interns cause less chaos than this. Think very carefully about what else you do today!'",
                    "The internal phone rings. It is the boss. He roars down the receiver so loudly that you have to hold it half a metre from your ear to avoid damaging your hearing.",
                    "The boss sends you a link to a job board for unskilled temporary staff, no comment, subject line 'For your preparation'. The message could not be plainer."
                ]
	},

	/* 13:37, once a day, drawn at random by engine_events.checkLeetMoment.
	   Lived in that function as five strings until 6.0 - same reason as the
	   valve texts above: the engine decides WHEN a line appears, the data
	   says WHAT it says. Purely decorative, no values, no consequences.
	   The time itself is the joke and stays 13:37 in every language. */
	leet: [
		"13:37. For a fraction of a second everything runs smoothly. No ticket, no call, no boss. Then it is 13:38.",
		"13:37. Every LED in the server room blinks in the same rhythm for a moment. You are the only person in the building to whom that means anything.",
		"13:37. The clock stands still for a moment, the building breathes out, and somewhere a file opens on its own. Probably imagination.",
		"13:37. You glance at the clock and nod in appreciation. Nobody nods back. Nobody saw it.",
		"13:37. The printer on the third floor lets out a single, well-tuned beep and stays silent for the rest of the day."
	],

	/* Week mode (v5.0): one line about the night itself on the night screen.
	   Chosen by week level; 'worn' takes over from the third night on, when
	   the recovery rates have visibly decayed (engine_week WEEK_TUNING.wearPP).
	   Pure flavour - the numbers stand right above it in the baggage block. */
	week_sleep: {
		easy: {
			fresh: [
				"You sleep deeply and without dreams. The leftover holiday is still in your blood.",
				"Eight hours, straight through. Your body evidently still remembers how that is done."
			],
			worn: [
				"You sleep decently, but waking up takes a little longer every morning.",
				"Good sleep, except the dreams are set in the office by now."
			]
		},
		normal: {
			fresh: [
				"You sleep passably. You wake once because in your dream you are closing a ticket that does not exist.",
				"Sleep arrives late but stays. It does not negotiate, unlike everything else here."
			],
			worn: [
				"Sleep is working to rule now: present, but unmotivated.",
				"You wake before the alarm and resent the minutes you have given away."
			]
		},
		hard: {
			fresh: [
				"You toss and turn for a long time. When sleep finally comes, it simply brings the work along with it.",
				"Four hours of real sleep, the rest is studying the ceiling. Ready for a holiday, plainly."
			],
			worn: [
				"You turn the duvet over, but the problems turn with it. Recovery looks different from this.",
				"The night is more a gap between two days than a sleep. Your body is keeping score."
			]
		}
	},

	/* Week mode (v5.0): the daily contingent of an action pool is used up.
	   One entry per pool. Vector m 20, f 5, a 0 - tools/simulate-week.mjs
	   models idle clicks with exactly these numbers, the two must not drift
	   apart. Deliberately no longer the empty_pool vector: its a -5 turned
	   the wall into a farmable aggro faucet (measured 2026-08, see
	   WEEK_CONTINGENTS in engine_week.js). */
	week_idle: {
		coffee: {
			id: "fallback_week_coffee",
			title: "Kitchen Swept Bare",
			text: "The pot is cold, the bean-to-cup machine is flashing DESCALE and somebody has used the last filter as a notepad. There is nothing left to be had here today.",
			opts: [
				{ t: "Go without", m: 20, l: 5, a: 0, b: 0, r: "You stare into the empty pot. Again tomorrow." }
			]
		},
		server: {
			id: "fallback_week_server",
			title: "Server Room Suspiciously Quiet",
			text: "Every light is blinking green. No fan is howling, no cable is smouldering. That makes you more nervous than any outage, but there is simply nothing to do.",
			opts: [
				{ t: "Listen suspiciously", m: 20, l: 5, a: 0, b: 0, r: "Nothing. Eerie. You back out of the room again." }
			]
		},
		calls: {
			id: "fallback_week_calls",
			title: "The Hotline Is Silent",
			text: "No calls. You lift the receiver to test it: dialling tone. Either every problem has been solved or everybody has given up. Both would be a first.",
			opts: [
				{ t: "Wait for calls", m: 20, l: 5, a: 0, b: 0, r: "The phone stays mute. You put the receiver down back to front. In case somebody rings after all." }
			]
		},
		sidequests: {
			id: "fallback_week_sidequests",
			title: "No Errands Left",
			text: "The corridor is empty, the kitchen is empty, even Kevin has disappeared somewhere. The building has no distraction left for you today.",
			opts: [
				{ t: "Stand about aimlessly", m: 20, l: 5, a: 0, b: 0, r: "You do one lap and end up back at your desk." }
			]
		}
	},

	empty_pool: {
		id: "fallback_empty",
		title: "The Calm Before the Storm",
		text: "Nothing is happening at the moment. Everybody must be happy (or dead). You stare at a fly.",
		opts: [
			{ t: "Twiddle your thumbs", m: 20, l: 5, a: -5, b: 0, r: "Time passes slowly." }
		]
	}

};
