// i18n-status: translated
//
// 338 text fields, 337 translated. One is deliberately identical:
// boss_printer_rage.opts[1].t "PERCUSSIVE MAINTENANCE!", which the German
// source already shouts in English. It is two words and never reaches
// lint-parity, so the pool reports 0 there.
//
// The 38 emergencies, each with a timer. What makes this pool different from
// the others is what is NOT text in it:
//
//   `opts[].rep` and `fail.rep` are objects whose KEYS are character names -
//   rep: { "Dr. Wichtig": -20 }, { "Frau Elster": -30 }, { "Egon": 5 },
//   { "Kevin": -30 }. Those are lookup keys against the save file, not display
//   text, and they stay German byte for byte (GLOSSAR §4, lint-data checks
//   them). They sit in quotation marks and contain spaces and full stops, so
//   they look exactly like prose to any character-based search - which is
//   precisely the trap. The prose beside them is a different matter and does
//   take the British address: Ms Elster in boss_db_corruption_1 and
//   boss_broadcast_storm, while the rep key three lines up stays Frau Elster.
//
// Machine voices are left as they stand (GLOSSAR §2a): 'Error 404: Company not
// found' on the dying database and FEED ME STRAY CAT on the printer display
// are already English in the German source and are not touched.
//
// boss_falsche_nummer is the event the compendium calls The Woman from Head
// Office (§3c) - "aus der Zentrale" is head office here and in srv_nach_anruf,
// which continues the same thread through path_boss_anruf_geprueft.
//
// Taken from the contract: Doppelboden -> raised floor, Chefbüro -> the
// boss's office, Teeküche -> kitchenette, Ostflügel -> the East Wing,
// Brandschutztür -> fire door, Berufsgenossenschaft -> workplace safety board,
// TÜV kept, Panzertape -> duct tape, Kabelbinder -> cable ties, Beamer ->
// projector, Abmahnung -> written warning, Rundmail -> all-staff email,
// Azubi -> apprentice, Sackkarre -> sack truck, Rack numbers unchanged (§1).
//
// The German source of boss_phishing_ceo_1 shouted 'STEKCER ZIEHEN' - a plain
// typo, not a device: the one deliberate misspelling in the whole corpus
// (data_excuses.js) carries a comment saying so, and this one never did. It is
// corrected in both trees rather than reproduced.

export const bossfights = [

   {
		id: "boss_ransomware",
		title: "The Skull on the Main Server",
		text: "There is a skull in ASCII characters on the main server. Underneath it: 'Send 10 Bitcoin or everything will be deleted.' A row of digits is counting backwards, and it is counting fast.",
		timer: 10,
		opts: [
			{ t: "Enter the admin code", req: "admin_pw", m: 5, l: 0, a: -10, b: -20, r: "You type the admin code, the countdown stops, and the skull disappears line by line. Nobody saw it. You sit still for two minutes afterwards, and nobody will ever learn how close that was." },
			{ t: "Pull the plug!", m: 10, l: -10, a: 20, b: 10, r: "You pull the plug in the middle of the encryption run. The server is off and so is the attack. Whether the data survived the interruption nobody will know before tomorrow, and nobody says it out loud today." }
		],
		fail: {rep: { "Dr. Wichtig": -20 }, m: 30, l: 0, a: 50, b: 50, r: "The counter runs out while you are still thinking. Afterwards every file is encrypted, the backup included, because it hung off the same network. The boss shouts his way to a volume audible two floors down." }
	},
	{
		id: "boss_fire",
		title: "Smoke in the Server Room",
		text: "It smells of burnt plastic before you see anything. A capacitor has burst, flames are coming out of the upper rack, and the smoke detectors have not gone off yet.",
		timer: 8,
		opts: [
			{ t: "Run away and hit the alarm", m: 60, l: 10, a: 10, b: 25, r: "The fire brigade takes seven minutes and turns up four strong. The building is standing in the car park, half the workforce in slippers, and you are in among them with the feeling of having done everything right." },
			{ t: "Use the fire extinguisher", req: "fire_ext", m: 30, l: -10, a: 10, b: -20, r: "Two bursts from the extinguisher and it is out. You cough for half the afternoon and still smell of it that evening. Egon comes by later, looks the rack over and says: 'Neatly done.' He says nothing more.",
				next: "path_boss_fire_geloescht" }
		],
		fail: { m: 120, l: -20, a: 30, b: 40, r: "The sprinkler system goes off, everywhere at once. It rains from the ceiling onto racks, box files and a carton of Christmas decorations. The fire is out. So is everything else." }
	},
	{
		id: "boss_stream",
		char: "Dr. Wichtig",
		title: "The Picture Freezes",
		text: "The boss is presenting live to five thousand investors, and the picture has been standing still for four seconds. Your phone rings. He bellows into it without saying hello: 'Make it work!'",
		timer: 12,
		opts: [
			{ t: "Switch the backup line over with a spare cable", req: "cable", rep: { "Dr. Wichtig": 10 }, m: 5, l: -10, a: 0, b: -20, r: "A professional's reaction! The stream is running in 4K again. The CEO looks relieved (and sweaty)." },
			{ t: "Set the quality to 240p - 'potato' mode", rep: { "Dr. Wichtig": -5 }, m: 5, l: 5, a: 0, b: 25, r: "It runs smoothly again. But the CEO looks like a Lego figure. The stream chat rains blocky emojis." }
		],
		fail: { rep: { "Dr. Wichtig": -20 }, m: 20, l: 0, a: 40, b: 60, r: "The stream cuts out, and five thousand viewers see a black picture with an error number on it. The share price gives up ten per cent by close of trading. The boss does not arrive, he descends." }
	},
	{
		id: "boss_ddos",
		title: "The Fridges Are Attacking",
		text: "Traffic is at five thousand per cent. The sources are networked fridges, hundreds of thousands of them, worldwide. The firewall is still holding, but the graph only points one way.",
		timer: 15,
		opts: [
			{ t: "Pull the plug on the router", m: 5, l: 10, a: -5, b: 20, r: "The attack has been stopped. But we are offline. Technically a success, commercially a catastrophe." },
			{ t: "Switch on geo-blocking", m: 10, l: -5, a: 5, b: -5, r: "There! All the overseas traffic is blocked. The site is running again. Collateral damage minimal." }
		],
		fail: { m: 60, l: -10, a: 30, b: 40, r: "The server goes to its knees and takes the company website with it. By evening the outage is a keyword of its own online, with screenshots, and Chantal answers comments until somebody takes her phone away." }
	},
	{
		id: "boss_heat",
		title: "The Cooling Is Dead",
		text: "It is quiet in the server room, and that is what is wrong with it. The cooling is not running. The thermometer reads forty degrees and climbs by the second. At fifty everything shuts itself down.",
		timer: 10,
		opts: [
			{ t: "Break the window", req: "hammer", m: 5, l: 0, a: 20, b: 10, r: "Crash! Ice-cold air streams in (and a few pigeons). Hardware saved, window broken." },
			{ t: "Hit the emergency stop", m: 5, l: 5, a: 10, b: 25, r: "Everything shuts down. The silence is ghostly. Hardware safe, but the company is at a standstill." }
		],
		fail: { m: 120, l: -20, a: 50, b: 50, r: "At fifty-one degrees the first servers shut themselves down, at fifty-three it smells of scorched plastic. The smoke detector goes off, and you are the only one close enough to know that this time it is real." }
	},
	{
		id: "boss_db_purge",
		title: "Kevin and the Deletion Script",
		text: "Kevin is standing very upright in front of his screen and saying nothing. On the screen a deletion script is running against the live database. The progress bar is at eleven per cent.",
		timer: 8,
		opts: [
			{
				t: "Build a network bridge",
				req: "cable",
				m: 10, l: -10, a: 10, b: 0,
				r: "You replug cables wildly and route the traffic onto the test server. The deletion runs into nothing. Kevin stares at you in admiration."
			},
			{
				t: "Admin override",
				req: "admin_pw",
				m: 5, l: 5, a: -10, b: -20,
				r: "With trembling hands you type the root password. 'ROLLBACK COMPLETE'. You are a god. The data is safe.",
				next: "path_boss_rollback"
			},
			{
				t: "Rip out the whole extension lead",
				m: 45, l: 0, a: 20, b: 30,
				r: "CLACK. Sparks fly. The office is dark. The deletion has stopped... along with the rest of the company. The server check takes for ever (45 min), but the data is still alive."
			}
		],
		fail: {
			rep: { "Dr. Wichtig": -10 },
			m: 120, l: -50, a: 50, b: 80,
			r: "The script runs through. Afterwards the database reports no error at all, it reports nothing. 'Error 404: Company not found'. The boss stands weeping in the server room. You had better start updating your CV."
		}
	},
	{
		id: "boss_tiktok",
		title: "The Influencer in the Rack",
		text: "An influencer is standing between the racks filming himself. 'Check out these blinking lights. I'm gonna pull on this one, for the prank.' His hand is on the main switch.",
		timer: 12,
		opts: [
			{
				t: "Restrain him by citizen's arrest",
				req: "zip_ties",
				m: 15, l: -5, a: -20, b: 10,
				r: "You tied him to a rack with cable ties until security arrived. The video goes viral: 'Sigma male admin defends territory'. The comments are celebrating you.",
				next: "path_boss_influencer"
			},
			{
				t: "'Fog' him with the fire extinguisher",
				req: "fire_ext",
				m: 10, l: 0, a: 30, b: 0,
				r: "WHOOSH! You have whited him out completely. He coughs and runs off: 'My merch is ruined!'. The servers are dusty, but safe."
			},
			{
				t: "Stop him with a body check",
				m: 5, l: 0, a: 40, b: 20,
				r: "You ram him aside with full force before he can pull the plug. His smartphone flies into a rack (broken). He howls and threatens to bring a lawyer. You have bruises and you are furious."
			}
		],
		fail: {
			m: 60, l: 0, a: 50, b: 50,
			rep: { "Dr. Wichtig": -10 },
			r: "He pulls the plug, holds it up to the camera and says: 'Oooops, only a prank.' The building is offline. That evening the clip runs under the title 'The Crying Admin', and it runs very well. The boss is 'not amused'."
		}
	},
	{
		id: "boss_ups_battery",
		title: "The Battery Is Swelling Up",
		text: "The standby power battery has swollen up like a balloon and is hissing quietly. What is about to come out of it will run through the raised floor into the storey below. Below is the boss's office.",
		timer: 10,
		opts: [
			{ t: "Throw it out of the window", m: 5, l: 10, a: 20, b: 20, r: "You threw the 20kg thing through the closed window. It explodes in the car park. Better there than here." },
			{ t: "Seal it MacGyver-style with duct tape", req: "tape", m: 10, l: 0, a: 0, b: -10, r: "You wind a whole roll of duct tape round it. It holds the pressure... only just. Time bomb defused (for today)." }
		],
		fail: { rep: { "Dr. Wichtig": -20 }, m: 240, l: -30, a: 40, b: 80, r: "The battery gives way. What comes out eats through the raised floor and drips a storey lower onto a desk that nobody happens to be sitting at. The smell lasts three weeks." }
	},
	{
		id: "boss_skynet_lock",
		title: "The Fire Doors Are Closing",
		text: "The fire doors are shutting, all of them at once, without there being a fire. Then the suppression system starts up and begins drawing the oxygen out of the room. You are still inside.",
		timer: 10,
		opts: [
			{
				t: "Break the pane with the hammer",
				req: "hammer",
				m: 5, l: 0, a: 10, b: 10,
				r: "Crash! You climb through the shards. Freedom! But you will have to explain the damage."
			},
			{
				t: "Ram the pane with your elbow",
				m: 5, l: 0, a: 30, b: 10,
				r: "OW! With a shout you throw yourself at the glass. It splinters. Your arm is bleeding and throbbing wildly, but you can breathe."
			},
			{
				t: "Unscrew the door",
				req: "screw",
				m: 10, l: -10, a: 0, b: 0,
				r: "In record time you have the panel off and the wires shorted. Door open. You are alive!"
			}
		],
		fail: {
			rep: { "Dr. Wichtig": -10 },
			m: 120, l: 30, a: 20, b: 50,
			r: "You wake up in hospital, with an oxygen mask and no memory of the last few minutes. The boss is standing by the bed and is genuinely concerned, until he asks whether this counts as an industrial accident."
		}
	},
	{
		id: "boss_coffee_crisis",
		title: "The Machine Under Pressure",
		text: "Not the server room. The kitchen. The industrial machine is vibrating on the worktop and letting out hot steam, and the pressure gauge is in the red. Without that machine the department will not survive the day.",
		timer: 9,
		opts: [
			{ t: "Open the pressure relief valve", req: "screw", m: 5, l: -5, a: -10, b: -5, r: "The pressure escapes with a whistle. You are the hero of the workforce. Applause in the corridor!" },
			{ t: "Pull the plug and run", m: 5, l: 10, a: 25, b: 10, r: "The machine slowly calms down. But: NO MORE COFFEE TODAY. Your colleagues are looking at you with murder in their eyes." }
		],
		fail: { m: 60, l: 0, a: 50, b: 20, r: "The boiler gives way. Afterwards the kitchen is lined to the ceiling with coffee grounds, the machine is scrap, and within an hour everything in the building that could be measured has dropped." }
	},
	{
		id: "boss_printer_rage",
		title: "The Printer on Rapid Fire",
		text: "The office printer is rattling without pause and throwing out black pages, hundreds of them by now. Smoke is rising from the tray. On the display a message is flashing that has no business being there: FEED ME STRAY CAT.",
		timer: 15,
		opts: [
			{
				t: "Pull the plug",
				m: 5, l: 0, a: 10, b: 20,
				r: "You crawl under the desk and rip the cable out. In doing so you take the secretary's PC down with it. She screams. The printer is off, but the trouble is considerable."
			},
			{
				t: "PERCUSSIVE MAINTENANCE!",
				req: "hammer",
				m: 5, l: 5, a: -20, b: 0,
				r: "BAM! One well-aimed blow with the hammer to the casing. Silence. The printer beeps peacefully: 'Ready'. Violence is a solution after all."
			},
			{
				t: "Look for the paper jam",
				m: 10, l: -5, a: 20, b: 10,
				r: "You reach into the mechanism. The printer bites you! You have ink on your face and burns on your fingers. It stops of its own accord, because the paper has run out."
			},
			{
				t: "Put headphones on and search in peace",
				req: "headphones",
				m: 15, l: -5, a: -15, b: 0,
				r: "With headphones on it is merely a device doing something. After four minutes you find the crumpled remains of a delivery note in the feed. The printer beeps, prints one clean page and falls silent."
			}
		],
		fail: { r: "The printer overheats, and what follows is more a dull thump than an explosion. The sprinklers go off regardless. Everything is wet, you are wet, and the day is finished.", m: 60, l: -10, a: 50, b: 50 }
	},
	{
		id: "boss_cable_mess",
		title: "The TÜV Man Is in the Corridor",
		text: "The inspector from the TÜV is standing in the corridor and heading purposefully for the server room. In there the cables hang from the ceiling like lianas. What he sees in the next two minutes decides the certification.",
		timer: 20,
		opts: [
			{
				t: "Lash everything down neatly",
				req: "zip_ties",
				m: 10, l: -5, a: -10, b: -5,
				r: "Zip, zip! In record time you bundle the cables into tidy runs. The inspector comes in: 'Exemplary! That is how it should look!' Phew."
			},
			{
				t: "Stuff the lot in the cupboard",
				m: 5, l: 5, a: 10, b: 10,
				r: "You press the mass of cable into the cupboard and lean against the door. The inspector looks suspicious. The door creaks ominously. He moves on, but that was close."
			},
			{
				t: "Distract him: 'Fire alarm!'",
				m: 5, l: 0, a: 0, b: 40,
				r: "You hit the fire alarm. Everybody has to go outside. Inspection abandoned. But now the fire brigade is coming (cost: €1,000). The boss is looking for the culprit."
			}
		],
		fail: { rep: { "Dr. Wichtig": -10 }, r: "The inspector opens the door. He sees the chaos. He weeps quietly. 'Certificate withdrawn.' The boss rages.", m: 60, l: 0, a: 40, b: 60 }
	},
	{
		id: "boss_water_leak",
		title: "The Pipe in the Kitchenette",
		text: "A pipe has burst in the kitchenette. A jet of hot water is shooting right across the room, at a very straight angle, directly at the open extension lead of the floor distribution board.",
		timer: 15,
		opts: [
			{
				t: "Hold your thumb over it",
				m: 60, l: -20, a: 30, b: 0,
				r: "You hold the hole shut. You stand there for 60 minutes until the plumber comes. Your thumb is scalded, your mood is in the cellar. But the server is alive."
			},
			{
				t: "Put a bucket underneath",
				m: 5, l: 5, a: 0, b: 20,
				r: "The bucket is full at once and overflows. The water hits the socket. Small bang, fuse blown. Not quite as bad as a fire, but embarrassing."
			},
			{
				t: "Seal it with tape",
				req: "tape",
				m: 5, l: 0, a: -10, b: 0,
				r: "You wind half a roll of tape round the pipe. It holds! It is only dripping slightly now. This temporary fix will still be here in 10 years."
			}
		],
		fail: { rep: { "Dr. Wichtig": -10 }, r: "ZAP! Short circuit. Sparks. Darkness. The server is dead. The fridge is dead. The boss is standing in the dark bellowing your name.", m: 60, l: 0, a: 50, b: 50 }
	},
	{
		id: "boss_vga_fail",
		title: "The Cable at the Annual Address",
		text: "In the middle of the annual address the projector flickers, the picture turns purple, then black. At the lectern the VGA plug is sitting loose; the thumbscrews have been missing for years. The boss carries on speaking and looks at nobody but you.",
		timer: 20,
		opts: [
			{
				t: "Wiggle and pray",
				m: 5, l: 0, a: 10, b: 30,
				r: "It works for a moment... then off again... then on... strobe effect. An investor has an epileptic fit. Abandoned."
			},
			{
				t: "Screw the plug down",
				req: "screw",
				rep: { "Dr. Wichtig": 5 },
				m: 2, l: 5, a: -10, b: -10,
				r: "You crawl under the lectern, produce the screwdriver and fix the plug down rock solid. The picture is crystal clear. The boss whispers: 'Good man!'"
			},
			{
				t: "Hold the cable as a human tripod",
				m: 45, l: -15, a: 20, b: 0,
				r: "You have to hold the cable at a particular angle for the remaining 45 minutes of the presentation. Your hand cramps. You are visible in the shot on the livestream. Embarrassing."
			}
		],
		fail: { rep: { "Dr. Wichtig": -10 }, r: "Picture gone. Boss: 'Er... technology...' Polite, deadly tittering begins in the hall. The share price falls 2%. The boss holds you personally liable.", m: 60, l: 0, a: 40, b: 80 }
	},
	{
		id: "boss_audit",
		title: "The Data Protection Inspector",
		text: "An external inspector is standing unannounced in the server room asking for the emergency manual and the deletion log. Neither exists. He takes a red pen out of his inside pocket and waits pleasantly.",
		timer: 15,
		opts: [
			{
				t: "Show him the old manual",
				req: "manual",
				m: 5, l: 10, a: -10, b: -10,
				r: "You toss him the Windows 95 manual. He leafs through it... nods... 'Very classical. Approved.' Phew. Competence by age."
			},
			{
				t: "Invite him for coffee and distract him",
				m: 10, l: 5, a: 5, b: 25,
				r: "You invite him for a coffee. He forgets the log, but complains about the taste. Inspection passed (narrowly)."
			},
			{
				t: "Set off the fire alarm",
				req: "hammer",
				m: 5, l: 0, a: 10, b: 30,
				r: "You smash the call point. Inspection abandoned owing to evacuation. Radical, but effective."
			}
		],
		fail: { r: "The inspector writes for forty minutes. The fine appears at the end beneath a line beginning 'repeatedly established'. The boss reads it three times, looking all the while for somebody to look at.", m: 120, l: -50, a: 50, b: 100 }
	},
	{
		id: "boss_flood",
		title: "Five Hundred Litres of Ornamental Fish",
		text: "The ornamental fish tank in the boss's office has a crack in it, a finger wide, right across the front pane. Beneath it lie a Persian rug and the floor sockets. The boss is standing beside it shouting: 'Save the koi!'",
		timer: 12,
		opts: [
			{
				t: "Soak the water up with your own clothes",
				rep: { "Dr. Wichtig": 2 },
				m: 20, l: -10, a: 20, b: -5,
				r: "You throw your jumper into the puddle. It is not enough. The rug is ruined, but you have shown 'commitment'."
			},
			{
				t: "Save the koi with a landing net",
				rep: { "Dr. Wichtig": 10 },
				req: "zip_ties",
				m: 10, l: 0, a: -10, b: -10,
				r: "You build a landing net out of cable ties and a bin bag. Fish saved. The office is flooded, but the creatures are alive.",
				next: "path_boss_kois"
			},
			{
				t: "Tape up the crack",
				req: "tape",
				rep: { "Dr. Wichtig": 10 },
				m: 5, l: -5, a: 0, b: -20,
				r: "Duct tape holds everything! Even 500 litres of water pressure (for now). The koi are alive. The boss embraces you (wetly)."
			}
		],
		 fail: { r: "The water runs out. Somewhere there is an electrical bang. Office destroyed. Koi dead. You will probably be sacked.", m: 60, l: 0, a: 50, b: 100 }
	},
	{
	id: "boss_demo_fail",
	title: "The Error Message on Television",
	text: "The boss is presenting live on television. On the screen behind him your desktop appears, at full size, and on it a window with a half-finished game of Solitaire.",
	timer: 10,
	opts: [
		{
			t: "Cut the cable brutally with the scissors",
			rep: { "Dr. Wichtig": -2 },
			m: 5, l: -10, a: 25, b: 20,
			r: "Snip! Picture black. The boss stammers: 'Technical fault!'. The day is saved. Only one HDMI cable worth €50 destroyed."
		},
		{
			t: "Switch to Excel",
			rep: { "Dr. Wichtig": 2 },
			m: 5, l: 5, a: -5, b: -5,
			r: "In milliseconds you switch to a complicated spreadsheet. The viewers think it is part of the show. 'And here you see our efficiency!' calls the boss. Saved!"
		}
	],
	fail: { m: 60, l: 0, a: 50, b: 80, r: "You click beside it, and specifically on 'New game'. The cards deal themselves out afresh in front of five thousand viewers. The investors laugh, and one of them applauds." }
	},
    {
        id: "boss_ransomware_2",
        title: "Four Hundred Red Screens",
        text: "The same red skull is on all four hundred screens in the building. 'Your files have been encrypted.' You can hear the boss coming down the corridor long before you see him.",
        timer: 12,
        opts: [
            {
                t: "Negotiate with the hackers and play for time",
                m: 120, l: 20, a: 15, b: -5,
                r: "You write to the attackers in the ransomware's chat window. They give you 24 hours' grace. A feeble victory."
            },
            {
                t: "Use root access and kill the subnets",
                req: "admin_pw",
                m: 60, l: 10, a: 10, b: -15,
                r: "You use your master password and cut off the infected subnets. Some data is gone, but the company survives."
            },
            {
                t: "Pull the plug on the main server",
                m: 10, l: -5, a: 20, b: 20,
                r: "A brutal method. The file system is done for, but the encryption stops at once."
            }
        ],
        fail: { rep: { "Dr. Wichtig": -30 }, m: 180, l: 0, a: 40, b: 50, r: "You do not move while the counter runs down. Afterwards the entire company cloud is unreadable. The boss takes a deep breath, says three sentences and then a fourth, which he withdraws." }
    },
    {
        id: "boss_ceo_stream_1",
        title: "The Shared Screen",
        text: "The boss is sharing his screen on a stream with five thousand viewers. At this moment a private browser tab draws attention back to itself, one he had believed to be safe.",
        timer: 10,
        opts: [
            {
                t: "Choke the stream off with admin rights",
                req: "admin_pw",
                m: 10, l: 0, a: 5, b: -15,
                r: "Two clicks in the back end and the stream shows 'Technical Difficulties'. The CEO is grateful to you for ever."
            },
            {
                t: "Hard-shutdown the streaming PC in the next room",
                m: 5, l: -5, a: 15, b: 5,
                r: "You sprint off and hold the power button for three seconds. The stream cuts out. Close-run thing!"
            },
            {
                t: "Watch and laugh",
                rep: { "Dr. Wichtig": -20 },
                m: 15, l: -10, a: -15, b: 30,
                r: "A historic moment for the corridor grapevine. The boss, however, will hold it against you for a very long time."
            }
        ],
        fail: { rep: { "Dr. Wichtig": -40 }, m: 30, l: 0, a: 30, b: 40, r: "Somebody recorded it. By evening the clip is circulating on a network where the boss maintains a profile, and beneath it people who know him are discussing it." }
    },
    {
        id: "boss_water_leak_1",
        title: "Rusty Water Over Rack 3",
        text: "A heating pipe has opened up in the server room ceiling. Rusty water is running down the wall and collecting directly above the core switch. It is not dripping yet, but it is about to.",
        timer: 12,
        opts: [
            {
                t: "Fetch the big bin from the corridor",
                m: 15, l: -5, a: 15, b: 5,
                r: "You push the bin directly under the leak. The servers stay dry, but you have to empty it every 10 minutes."
            },
            {
                t: "Call Egon and wait",
                rep: { "Egon": 5 },
                m: 45, l: 0, a: 15, b: 15,
                r: "By the time Egon turns the water off, there are sparks in the rack. Two switches die a watery death."
            },
            {
                t: "Seal the pipe with tape",
                req: "tape",
                m: 30, l: 10, a: 10, b: -5,
                r: "You climb a wobbly ladder and wind the tape round the wet pipe. Soaked through, but it holds."
},
{ t: "Move the connections over to the spare switch", req: "cable",
  m: 20, l: -10, a: -5, b: -10,
  r: "You move it over port by port, with the spare cable from the backpack, and leave the wet switch behind on its own. By the time the water reaches it, nothing is hanging off it any more. Egon finds it two days later and nods his approval." }
        ],
        fail: { m: 90, l: -10, a: 30, b: 40, r: "The water reaches the core switch. It makes no dramatic noise, only a brief crackle, and after that the whole building is without a network." }
    },
    {
        id: "boss_rogue_ai_1",
        title: "The Software Sacks Everybody",
        text: "The new HR software has assessed every employee overnight and arrived at 'unsatisfactory' for each and every one. It is sending out the letters right now. Two hundred and forty have already gone.",
        timer: 15,
        opts: [
            {
                t: "Intercept only your own dismissal",
                m: 20, l: 5, a: 15, b: 10,
                r: "You protect only yourself. The rest of the company burns. Selfish, but clever."
            },
            {
                t: "Physically pull the AI's LAN cable",
                rem: "cable",
                m: 10, l: 0, a: 5, b: -10,
                r: "You pull the patch cable, and the sending breaks off mid-word. Two hundred and forty letters are out, one hundred and sixty are not. Which half anyone belongs to will be decided on Monday."
            },
            {
                t: "Force a server restart",
                m: 45, l: 5, a: 10, b: 5,
                r: "Hundreds of employees now think they are unemployed before you stop the system. Pure chaos."
            }
        ],
        fail: { rep: { "Dr. Wichtig": -20 }, m: 120, l: 0, a: 25, b: 30, r: "Four hundred letters of dismissal have been delivered, every one correctly addressed. HR can no longer be reached by telephone, and there is a queue in the corridor stretching to the lift." }
    },
    {
        id: "boss_audit_surprise_1",
        title: "Three Suits Without an Appointment",
        text: "Three men in suits are standing unannounced between the racks. 'ISO 27001, spot check. We should like your documentation on network security.' One of them has already flipped open a clipboard.",
        timer: 10,
        opts: [
            {
                t: "Slam the fat Windows 95 manual on the table",
                req: "manual",
                m: 15, l: 0, a: -5, b: -15,
                r: "They are so bewildered by the sheer size of the document that they never read a word of it. Passed!"
            },
            {
                t: "Set off the fire alarm as a distraction",
                m: 10, l: -5, a: 25, b: 15,
                r: "You break the glass on the fire alarm. The audit is evacuated. Highly illegal, but it buys you 2 hours."
            },
            {
                t: "Tell the truth: there is no documentation",
                m: 60, l: 15, a: 15, b: 25,
                r: "You fail on every count. Management gets a catastrophic report of deficiencies."
            }
        ],
        fail: { rep: { "Dr. Wichtig": -15 }, m: 45, l: 10, a: 25, b: 45, r: "You cannot find a single sentence. The inspector waits politely, then notes something down and reads the silence as what it is. The written warning does not land on you alone, but on the whole team." }
    },
    {
        id: "boss_lockdown_1",
        title: "The Locking System Has Decided",
        text: "A firmware update has taken over the electronic locking system and bolted every door in the building. From the inside as well as the outside. The first people who wanted to go home are gathering in the corridor.",
        timer: 12,
        opts: [
            {
                t: "Hack the door control with the laptop",
                m: 30, l: 10, a: 5, b: 0,
                r: "You connect straight to the controller and overwrite the lock code. The doors hum open."
            },
            {
                t: "Wait for the engineer",
                m: 120, l: 30, a: 25, b: 5,
                r: "Two hours of captivity. Colleagues start growling at one another."
            },
            {
                t: "Fetch Egon - he has a key for everything",
                m: 15, l: 5, a: 0, b: -10,
                rep: { "Egon": 5 },
                r: "Egon arrives with a bunch that looks like the inventory of a cathedral and unlocks every door one by one. Analogue defeats digital, and the man nobody otherwise greets is for ten minutes the most important person in the building."
            }
        ],
        fail: { m: 180, l: 20, a: 40, b: 15, r: "Somebody calls the fire brigade. It arrives with three vehicles and opens the main door in the only way still available. The bill for it turns up weeks later on the distribution list." }
    },
    {
        id: "boss_ac_failure_1",
        title: "Forty-Eight Degrees",
        text: "The air conditioning has failed, and nobody knows since when. The thermostat reads forty-eight degrees. It smells of hot dust and of something else that one would rather not smell.",
        timer: 10,
        opts: [
            {
                t: "Throw the doors open and hope",
                m: 60, l: 15, a: 15, b: 10,
                r: "The warm office air streams in. Several servers crash, the core just about survives."
            },
            {
                t: "Flash-freeze it with the fire extinguisher",
                rem: "fire_ext",
                m: 5, l: 0, a: 5, b: -10,
                r: "You blast CO2 into the intakes. The temperature plummets. Expensive, but life-saving."
            },
            {
                t: "Shut down the unimportant servers at once",
                m: 20, l: 10, a: 10, b: 5,
                r: "You switch off 50% of the hardware. The temperature stabilises, but many departments are offline."
            }
        ],
        fail: { m: 120, l: -10, a: 40, b: 60, r: "The emergency cut-out takes hold and takes everything off the network, simultaneously and without asking. The company is offline for today. It takes until evening before the room is cool enough to enter." }
    },
    {
        id: "boss_ddos_1",
        title: "The Logs Are Falling Over Themselves",
        text: "The firewall logs are running through so fast that individual lines can no longer be read. An attack from abroad, spread across thousands of addresses. Nothing has worked in the building for two minutes.",
        timer: 12,
        opts: [
            {
                t: "Block it in Zen mode with the stress ball",
                req: "stressball",
                m: 45, l: 10, a: -15, b: -15,
                r: "You blank out the panic, knead the ball and write IP filters in record time. A perfect defence."
            },
            {
                t: "Panic and cut every external connection",
                m: 15, l: 0, a: 5, b: 20,
                r: "You block everything across the board. The attack fizzles out, but you are completely cut off from the internet. The boss bellows."
            },
            {
                t: "Drink tea and sit it out",
                m: 60, l: 0, a: 10, b: 25,
                r: "Let the hackers get on with it. You have clocking-off time on your mind while the company burns."
            }
        ],
        fail: { rep: { "Dr. Wichtig": -15 }, m: 60, l: 0, a: 40, b: 30, r: "The core router drops out under the load. Restarting takes seventeen minutes, during which nobody can do anything but watch. The customers write a very great many emails in that time." }
    },
    {
        id: "boss_excavator_1",
        title: "Egon and the Digger",
        text: "Egon is standing in the courtyard beside a mini digger, looking down at something protruding from the earth. It is the building's main fibre, cleanly severed. He slowly raises his head and seeks out your eye.",
        timer: 15,
        opts: [
            {
                t: "Declare the day over for everybody!",
                m: 10, l: -20, a: 15, b: 30,
                r: "'No network, no work!' The workforce cheers, the CEO nearly has a heart attack."
            },
            {
                t: "Shout at Egon at the top of your voice",
                rep: { "Egon": -15 },
                m: 15, l: 0, a: -5, b: 10,
                r: "You shout across half the courtyard. Egon takes it without lowering his gaze, and afterwards says only: 'Finished?' The network is still gone, and it has done you good, which nobody counts against it."
            },
            {
                t: "Bring up the LTE router with the guest Wi-Fi",
                rem: "wifi_note",
                m: 30, l: 5, a: 5, b: -10,
                r: "You sacrifice your Wi-Fi note for the emergency router. The bandwidth is rubbish, but the boss is online.",
				next: "path_boss_lte"
            }
        ],
        fail: { m: 240, l: 20, a: 20, b: 30, r: "Without a network the building reverts to an earlier condition: notes in the corridors, people looking for one another, and an astonishing amount of conversation. No work gets done." }
    },
    {
        id: "boss_db_corruption_1",
        title: "The Year-End Accounts Are Tomorrow",
        text: "The central finance database reports a checksum error when opened. The year-end accounts are tomorrow. Ms Elster is already on her way to you, you can hear it in the corridor.",
        timer: 12,
        opts: [
            {
                t: "Blame it on a Windows update",
                m: 15, l: 5, a: 15, b: 15,
                r: "Nobody can prove otherwise. You get away with it. The company loses money, and measurably so."
            },
            {
                t: "Down an energy drink and work through the night",
                rem: "energy",
                m: 120, l: -10, a: 5, b: -20,
                r: "Four hours, two cans and a recovery run that aborts three times before it goes through. Shortly before seven the checksum is right. Ms Elster gets the year-end accounts on time and never learns how close it was."
            },
            {
                t: "Blindly overwrite with an old backup",
                m: 20, l: 0, a: 10, b: 10,
                r: "Ms Elster will simply have to key the missing days in again by hand. She will hate you for it."
            }
        ],
        fail: { rep: { "Frau Elster": -30, "Dr. Wichtig": -20 }, m: 60, l: 0, a: 30, b: 30, r: "You hesitate too long, and the database gives up altogether. The year-end accounts are tomorrow, and the auditors will ask questions to which there are no answers, only explanations." }
    },
    {
        id: "boss_crypto_police_1",
        title: "Two Officers at Reception",
        text: "Two police officers are standing at Reception and they are in no hurry. A company IP address has been flagged for crypto mining. They ask where the server room is, and they ask only out of politeness.",
        timer: 10,
        opts: [
            {
                t: "Coldly hand over apprentice Kevin",
                rep: { "Kevin": -30 },
                m: 30, l: 0, a: -10, b: 10,
                r: "Kevin weeps. Your karma is pitch black, but the IT infrastructure stays standing."
            },
            {
                t: "Cooperate and open the doors",
                m: 180, l: 30, a: 25, b: 25,
                r: "They take three racks away, neatly packed and numbered. Afterwards the company is at a standstill, and nothing else is talked about in the corridor. The equipment comes back after eight months."
            },
            {
                t: "Run the USB wipe script on the mining PC",
                rem: "usb_stick",
                m: 10, l: 0, a: 15, b: 5,
                r: "Eleven seconds and the machine is clean. The officers look around, note down two serial numbers and withdraw again. Kevin stands beside it and only grasps that evening what has just happened.",
				next: "path_boss_wipe"
            }
        ],
        fail: { m: 240, l: 0, a: 40, b: 50, r: "The officers walk past you, pull the cables themselves and take away whatever they consider relevant. They are thorough, polite and finished in forty minutes." }
    },
    {
        id: "boss_phishing_ceo_1",
        title: "Track Your Parcel",
        text: "The boss has clicked on 'track your parcel'. Since then a script has been working its way through the intranet drive, deleting whatever it finds. You can watch the folders disappearing in Explorer.",
        timer: 8,
        opts: [
            {
                t: "Ring the CEO and shout at him",
                rep: { "Dr. Wichtig": -20 },
                m: 10, l: -10, a: 15, b: 5,
                r: "'PULL THE PLUG, YOU IDIOT!' you bellow. He actually does it. The data survives, your job wobbles."
            },
            {
                t: "Run round in circles screaming",
                m: 45, l: 20, a: 25, b: 20,
                r: "You watch the script work its way through ten years. The folder names get older the further it gets, and on the last one there is a year that predates your time. Then the screen is empty."
            },
            {
                t: "Kill the switch with the screwdriver",
                req: "screw",
                m: 10, l: 0, a: -5, b: 10,
                r: "You rip the power supply out of the switch. Everything offline, but the data is safe!"
            }
        ],
        fail: { rep: { "Dr. Wichtig": -10 }, m: 60, l: 0, a: 30, b: 40, r: "The drive is empty, and the backups carry the same script inside them. You are starting from nothing, with one folder that somebody happened to have privately on a stick." }
    },
    {
        id: "boss_coffee_shortage_1",
        title: "No Coffee in the Building",
        text: "The supplier is on strike, and there is not a bean left in the entire building. The first of them are already standing in front of the empty machine pressing the buttons anyway. In an hour nobody here will be capable of conversation.",
        timer: 15,
        opts: [
            {
                t: "Barricade yourself in the server room",
                m: 60, l: 10, a: 15, b: 5,
                r: "You secure the door and wait until the withdrawal symptoms among your colleagues subside."
            },
            {
                t: "Eat a doughnut to steady yourself",
                rem: "donut",
                m: 5, l: -5, a: -5, b: 0,
                r: "You fetch something sweet from the machine and watch the building decaffeinating. The mood holds until two, after which the whole floor either whispers or bellows."
            },
            {
                t: "Brew up the emergency ration (instant) in the corridor",
                m: 30, l: 10, a: 15, b: -5,
                r: "It tastes of ashes, but the mob is pacified. You sacrifice yourself for the team."
            }
        ],
        fail: { m: 180, l: 30, a: 45, b: 15, r: "By the afternoon nobody is talking any more. Two people leave early, three pretend to be working, and you sit in front of a screen reading the same sentence four times." }
    },


	/* -------------------------------------------------------------------
	   Wave 2 (v5.1). Same shape as the existing thirty: at least one way
	   out through an item, one or two without that cost stats instead, and
	   a fail that is worse than every option (measured range: options -30
	   to +60 on a+c, fails 50 to 150). Duplicate check against the stock:
	   fire alarm, the TÜV inspector, the aquarium, ransomware, DDoS, the
	   frozen livestream and the coffee machine are taken.
	   ------------------------------------------------------------------- */
	{
		id: "boss_cert_expired",
		title: "The Certificate Has Expired",
		timer: 12,
		text: "For a minute now the customer shop has been showing a security warning, full-page, in red. The certificate expired overnight. There was a reminder for it in the calendar, entered eleven months ago, by somebody who no longer works here.",
		opts: [
			{ t: "Install the replacement certificate from the manual", req: "manual",
			  m: 10, l: -5, a: -5, b: -10,
			  r: "The emergency key is on page 61, added by hand. Four minutes later the shop is green again. That makes the manual worth more than any maintenance project for the second time." },
			{ t: "Issue an emergency certificate with the admin account", req: "admin_pw",
			  m: 15, l: -5, a: 5, b: -5,
			  r: "You issue a certificate valid for thirty days. It is not pretty, but it is valid, and the warning disappears. In thirty days the same problem will come round again, and then it will be you who enters the reminder." },
			{ t: "Take the shop offline until it is sorted", m: 20, l: 0, a: 15, b: 20,
			  r: "You take the shop off the network. No customer sees a warning any more, because no customer sees anything any more. Sales notice after eight minutes, and Markus rings three times before you can pick up." },
			{ t: "Let people click the warning away and send instructions", m: 10, l: 5, a: 20, b: 10,
			  r: "You write an all-staff email explaining how to click the warning away. With that you have taught one thousand two hundred customers to ignore security warnings. The shop is running again, and this victory tastes worse than any outage." }
		],
		fail: {
			m: 25, l: 0, a: 40, b: 45,
			r: "The warning stands for three hours. In that time two hundred orders are abandoned, and two customers write friendly emails saying they have reported it to their own IT. Sales work out the lost revenue before the shop is back up."
		}
	},
	{
		id: "boss_broadcast_storm",
		title: "Both Ends in the Same Switch",
		timer: 10,
		text: "Every indicator in the rack is blinking at once, in the same rhythm, and the network is down. Somebody in the meeting room found a network cable and put both ends into the socket. Neatly, with a click, into both.",
		opts: [
			{ t: "Shut the port down through the admin account", req: "admin_pw",
			  m: 5, l: -5, a: -10, b: -5,
			  r: "One command, one port, quiet. The indicators settle within seconds, and in the meeting room nobody notices that anything has just happened. That is the job: it is only visible when it is missing." },
			{ t: "Run to the meeting room and pull the cable", m: 15, l: -10, a: 5, b: 0,
			  r: "You run up two floors and pull the cable. Eight people are sitting in the room in a presentation, looking at you. One of them says: 'We thought that was how it was meant to be.' You say nothing and go back." },
			{ t: "Restart the whole switch", m: 10, l: 0, a: 20, b: 15,
			  r: "The restart brings quiet and takes half the floor with it. Four people lose unsaved work, one of them Ms Elster. The loop is gone, the cable is still plugged in." }
		],
		fail: {
			m: 20, l: 0, a: 50, b: 40,
			r: "The storm eats the network from the inside. After a quarter of an hour the first devices give up, then the telephone system. Who made the mistake nobody knows in the end, and in any case they are looking somewhere else."
		}
	},
	{
		id: "boss_recall",
		title: "The Recall Concerns You",
		timer: 15,
		text: "A warning notice from the manufacturer: one series of power supplies may overheat, immediate withdrawal from service recommended. You check the serial numbers. Four units are affected, and all four are running here, in service, and have been for two years.",
		opts: [
			{ t: "Shut the four units down in a controlled way", m: 30, l: -10, a: 10, b: -10,
			  r: "You shut them down one at a time, with warning and in the order that hurts least. It costs half the afternoon and nobody an outage. The replacement parts arrive in two weeks." },
			{ t: "Check the power supplies with the screwdriver", req: "screw",
			  m: 20, l: -10, a: 0, b: -5,
			  r: "You open all four. On three of them everything is unremarkable; on the fourth a capacitor is visibly bulging upwards. That unit comes off the network at once, the others carry on. A screwdriver has just bought two weeks." },
			{ t: "Pass the notice to the boss and wait", m: 5, l: 10, a: 15, b: 20,
			  r: "The boss reads the notice, asks whether it is urgent, and you say it is a recommendation. That settles it. Four units carry on running, and from now on you know that they are running." }
		],
		fail: {
			m: 25, l: 0, a: 45, b: 50,
			r: "Two days later there is a smell in the server room, and this time it is not one capacitor but two. The manufacturer points to the warning notice, and so does the insurer. The file records the date on which it reached you."
		}
	},
	{
		id: "boss_generator_test",
		title: "The Annual Standby Power Test",
		timer: 12,
		text: "Egon has started the annual test of the standby generator, as he does every year, with a clipboard. The generator starts up. What does not happen: the changeover back to mains power. According to the sticker the diesel lasts forty-two minutes.",
		opts: [
			{ t: "Throw the changeover at the distribution board by hand", req: "screw",
			  m: 15, l: -10, a: 0, b: -10,
			  r: "Two screws, one lever, one clunk. The installation takes mains power again and the generator runs down. Egon watches you do it, says nothing and writes on his clipboard: passed." },
			{ t: "Let Egon hit the emergency stop", m: 10, l: 5, a: 10, b: 5,
			  r: "Egon hits the emergency stop, and the building is completely dark for eleven seconds. Afterwards everything comes back except three machines in Accounts, which never entirely forgive that day." },
			{ t: "Wait out the forty-two minutes and document it", m: 45, l: -5, a: 5, b: -5,
			  r: "You sit beside it for forty-two minutes writing down when what happens. The generator runs dry, the installation switches back of its own accord, and you have the first complete test record this building has ever seen." }
		],
		fail: {
			m: 30, l: 0, a: 45, b: 40,
			r: "The diesel runs out after forty-two minutes, and the changeover still does not take hold. What happens next happens to every device at once and without warning. Egon stands beside it and says: 'That is why you test it.'"
		}
	},

	{
		id: "boss_frost",
		title: "Cooled Too Well",
		timer: 12,
		text: "Since the repair, the air conditioning has remembered something it was not supposed to remember. The server room is at two degrees, frost is forming in the cold aisles, and there is a trail of condensation on the floor leading to the rack.",
		opts: [
			{ t: "Unscrew the control panel and reset the controller", req: "screw",
			  m: 10, l: -5, a: -5, b: -10,
			  r: "Four screws, one menu, eighteen degrees, as it should be. Within an hour the frost is gone. Only the trail of water remains, and tomorrow morning it will strike somebody who does not know where it came from." },
			{ t: "Divert the condensation with duct tape", req: "tape",
			  m: 15, l: -10, a: 5, b: 0,
			  r: "You tape up a channel that carries the water past the rack and into a bucket. It looks like a makeshift solution because it is one, and it holds four weeks longer than intended." },
			{ t: "Switch the system off completely", m: 5, l: 0, a: 15, b: 20,
			  r: "Off is off. The frost thaws, the water runs, and from midday the temperature climbs in the direction that has worried you for two years. You have swapped one problem for another." },
			{ t: "Fetch Egon and throttle the system by hand", m: 25, l: -5, a: 0, b: 5,
			  rep: { "Egon": 5 },
			  r: "Egon arrives with a key that does not exist according to the plans and turns a valve back a quarter turn. 'It thinks better of it,' he says. Twenty minutes later the room is at seventeen degrees." }
		],
		fail: {
			m: 25, l: 0, a: 40, b: 45,
			r: "The condensation finds its way into the rack, the way water always does. Two power supplies give up one after the other, the third holds until evening. Afterwards the room is warm, very warm, and the air conditioning has stopped for good."
		}
	},
	{
		id: "boss_delivery_block",
		title: "The Delivery in the Escape Route",
		timer: 15,
		text: "Twenty-two boxes from a delivery nobody appears to have ordered are stacked outside the server room. They are standing in the escape route, across its full width. The workplace safety board is inspecting the building today, and it started on the ground floor.",
		opts: [
			{ t: "Stack them with the sack-truck trick and the cable ties", req: "zip_ties",
			  m: 20, l: -10, a: 0, b: -10,
			  r: "You bind the boxes into four stable towers against the wall, out of the walkway, labelled. When the inspection comes it sees a delivery waiting for collection, and writes nothing down." },
			{ t: "Shove the lot into the server room", m: 15, l: -5, a: 10, b: 0,
			  r: "The escape route is clear, the server room no longer passable. The inspection sees the corridor and is satisfied. Four weeks later you are still standing among boxes whenever you need to get to Rack 4." },
			{ t: "Steer the inspection past the floor", m: 25, l: 0, a: 15, b: 15,
			  r: "You lead the group up the stairwell in the East Wing and talk a great deal as you go. It works. On the way back one of the inspectors asks in passing what is on the floor you skipped." },
			{ t: "Track down the sender and have them collected", m: 30, l: -10, a: 5, b: -5,
			  r: "Two phone calls, one delivery note, one department that knows nothing about it. The boxes belong to Marketing and are collected within the hour. Chantal says she was 'storing them temporarily', and means it entirely without irony." }
		],
		fail: {
			m: 20, l: 0, a: 40, b: 50,
			r: "The inspection finds the boxes in front of the fire door and measures: ninety centimetres of remaining width against a required one hundred and twenty. There is a deadline, a report and an appointment for a follow-up check. All three land with you."
		}
	},

	{
		id: "boss_selbstlernend",
		title: "The Update Comes Back",
		timer: 12,
		text: "You rolled the faulty update back this morning, cleanly and with documentation. Now the administration software reports that it is distributing it again. The installation is already running on forty machines, and the list grows longer while you watch.",
		opts: [
			{ t: "Look up in the manual how to stop the distribution service", req: "manual",
			  m: 10, l: -5, a: 0, b: -10,
			  next: "path_boss_update_gestoppt",
			  r: "On page 88 there is the service name, corrected by hand. You stop it mid-run. Forty machines have the update, two hundred do not. Why it distributed it again at all appears in no log — and that is exactly what will not let you rest." },
			{ t: "Pull the network cable on the distribution server", m: 5, l: -5, a: 10, b: 5,
			  next: "path_boss_update_gestoppt",
			  r: "You pull the cable, and the distribution ends in the middle of a transfer. Three machines are left in a state that does not appear in the manual. But the rest are safe, and that was the question." },
			{ t: "Let it run through and roll it back again afterwards", m: 40, l: -10, a: 20, b: 10,
			  r: "You let it run and roll everything back afterwards, two hundred and forty machines, in batches. It takes until the evening. The state afterwards is the same as it was this morning, only you are six hours older." }
		],
		fail: {
			m: 30, l: 0, a: 45, b: 45,
			r: "The update reaches all two hundred and forty machines. The next morning nobody can log in, because that is exactly where the fault sits. The boss asks why it was rolled back if it came back anyway."
		}
	},
	{
		id: "boss_falsche_nummer",
		title: "The Number Was Right",
		timer: 10,
		text: "On the telephone is a woman who has your extension and knows your name. She says she is ringing from head office, there has been an incident, and she needs remote access immediately. Everything fits: the tone, the terminology, the number on the display. Only there is no head office.",
		opts: [
			{ t: "Look the number up in the secret list", req: "secret_list",
			  m: 10, l: -5, a: -5, b: -10,
			  next: "path_boss_anruf_geprueft",
			  r: "This extension is not on the list, but a very similar one is, differing by a single digit. You hang up politely. That afternoon the same woman rings twice more, to other people in the building." },
			{ t: "Ask about something only a colleague could know", m: 10, l: 0, a: 5, b: -5,
			  next: "path_boss_anruf_geprueft",
			  r: "You ask who orders the coffee on the third floor. Two seconds of silence, then an answer that sounds plausible and is wrong. You say you will call back, and the line ends before you have finished speaking." },
			{ t: "Give her the access, she sounds genuine", m: 5, l: 5, a: 25, b: 30,
			  r: "You give her the access. She thanks you, works for eleven minutes and says a friendly goodbye. What happened in those eleven minutes is in the logs, but only once somebody points it out to you." },
			{ t: "Hang up without saying anything", m: 5, l: 0, a: 10, b: 5,
			  r: "You hang up without a word. If it was genuine after all, somebody will be in touch. Nobody is in touch, and you still do not know whether that is the confirmation or merely silence." }
		],
		fail: {
			m: 20, l: 0, a: 45, b: 50,
			r: "You say nothing, and she takes the silence for consent: 'I see the session is running.' It is not running, but at some point she finds a way in. On Friday the question stands in the room of who set the access up."
		}
	},
];
