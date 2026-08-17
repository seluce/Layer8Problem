// i18n-status: translated
// All 172 events are English (five blocks, 7th to 11th session). Two strings
// are deliberately identical to the German tree: "Luigi's Pizza" (company
// name, GLOSSAR §3) and "HR (Sabine)" (abbreviation plus first name).
export const calls = [

	{
		id: "call_meyer_1",
		title: "Frau Meyer (Accounts)",
		startNode: "root",
		nodes: {
			root: {
				text: "'Mr Miller! My screen is black! I did NOTHING! The accounts have to go out in 10 minutes!'\n\nShe sounds panicked. You can hear frantic clicking.",
				opts: [
					{ t: "'Is the PC switched on?'", next: "ask_on" },
					{ t: "'Have a look at the cable.'", next: "check_cable" }
				]
			},
			ask_on: {
				text: "'Of course it is on! I am not stupid! ... Oh, the plug was out. Goodbye.' *Click*",
				opts: [
					{ t: "Sigh.", next: "res_solved" }
				]
			},
			check_cable: {
				text: "'One moment, I will crawl under the desk... OW! My back! ... Oh dear, now there is a smell of burning.'",
				opts: [
					{ t: "What have you done?!", next: "res_fire" }
				]
			}
		},
		results: {
			res_solved: { txt: "The plug was out, the ticket is closed, an apology never came. The accounts go out on time, and nobody in Accounts will ever learn how close it was.", m: 5, l: 0, a: 5, b: 0 },
			res_fire: {
				txt: "She tipped coffee into the power strip. Power cut in Accounts.",
				m: 20, l: -10, a: 10, b: 10,
				next: "meyer_blackout" 
			}
		}
	},
	{
		id: "call_meyer_2",
		char: "Egon",
		reqStory: "meyer_blackout",
		title: "Egon the Caretaker",
		startNode: "root",
		nodes: {
			root: {
				text: "'Here, why is Ms Meyer ringing me to say YOU set her PC on fire?'\n\nEgon is annoyed. He hates electrics.",
				opts: [
					{ t: "It was her own doing!", next: "truth" },
					{ t: "I'll take the blame.", next: "lie" }
				]
			}
		},
		results: {
			truth: { txt: "Egon grunts once, then: 'Knew it. Coffee.' You can already hear him in the stairwell, toolbox in hand and a speech about liquids at the workplace on his lips. Ms Meyer is going to hear all of it.", rep: { "Egon": 5 }, m: 5, l: 5, a: -5, b: 0 },
			lie: { txt: "You take the blame. Egon has you down as an electrical vandal from now on, and an hour later there is a box of chocolates on your desk with no card. Ms Meyer knows what she has in you. Unfortunately, so does Egon.", rep: { "Egon": -5 }, m: 10, l: 0, a: -10, b: 10, loot: "donut" }
		}
	},
	{
		id: "call_kevin",
		char: "Kevin",
		title: "Kevin (Apprentice)",
		text: "Heyyy? I think I deleted the internet. I wanted to install Fortnite so I dragged the 'System32' folder into the recycle bin to make some room. Now the screen's blue and shouting at me.",
		opts: [
			{
				t: "Shout at him: 'ARE YOU INSANE?!'",
				rep: { "Kevin": -5 },
				m: 15, l: 0, a: -20, b: 20,
				r: "You bellow into the phone loud enough for the next office to hear. Kevin cries quietly at the other end. Your anger drops a little, even though the PC is still broken."
			},
			{
				t: "'Format it! Learn from it!'",
				rep: { "Kevin": -2 },
				m: 30, l: 10, a: 0, b: 5,
				next: "path_kevin_formatiert",
				r: "You make him rebuild the whole thing himself. It keeps him busy all day and he will hopefully learn that you leave system folders alone."
			},
			{
				t: "Go over and painstakingly rescue it all",
				rep: { "Kevin": 10 },
				m: 90, l: -30, a: 10, b: -10,
				next: "path_kevin_gerettet",
				r: "You sit at his PC for 1.5 hours restoring data. Time out of your life that nobody gives back. At the end Kevin asks: 'Can I install Minecraft now?'"
			}
		]
	},
	{
		id: "call_ceo",
		char: "Dr. Wichtig",
		title: "Dr. Wichtig the CEO",
		text: "Miller! I am at the airport. My iPad is not working! I press the button and nothing happens! FIX IT REMOTELY! RIGHT NOW! I am losing millions out here!",
		opts: [
			{ t: "'Solar winds are interfering with the line.'", m: 5, l: 30, a: 0, b: 25, rep: { "Dr. Wichtig": 5 }, next: "path_ceo_sonnenwind", r: "He believes it instantly. 'Bloody technology!' He goes and buys a newspaper. Risk: high, but it worked." },
			{ t: "Squeeze the stress ball", req: "stressball", rep: { "Dr. Wichtig": 2 }, m: 60, l: -10, a: -10, b: -10, r: "You stay calm while he shouts. It was only the battery." },
			{ t: "Is the battery flat?", m: 60, l: -10, a: 30, b: -10, rep: { "Dr. Wichtig": -5 }, r: "It was the battery. He has no cable with him and blames you. He shouts at you for 10 minutes about why you could not read his mind." }
		]
	},
	{
		id: "call_markus",
		char: "Markus",
		title: "Markus the Head of Sales",
		text: "I CANNOT PRINT MY EMAILS! IF I DO NOT HAVE THAT QUOTE ON PAPER IN 5 MINUTES IT WILL COST THE COMPANY A MILLION EUROS! COME UP HERE!",
		opts: [
			{ t: "Fix it with duct tape", req: "tape", rep: { "Markus": 5 }, m: 15, l: -5, a: -5, b: -5, r: "You have taped the paper tray back into place. It holds... for now. Markus grunts, satisfied." },
			{ t: "Is there any paper in the printer?", rep: { "Markus": -3 }, m: 10, l: -5, a: 20, b: -5, r: "No, there was none. He does not apologise, of course. He says: 'That is your job!'" },
			{ t: "Send the PDF by email", rep: { "Markus": -5 }, next: "path_markus_papier", m: 5, l: 10, a: 0, b: 5, r: "He does not understand how that works. 'I want paper!!' You hang up, irritated." }
		]
	},
	{
		id: "call_sekretary_1",
		char: "Gabi",
		title: "The Receptionist",
		text: "Gabi on Reception bellows into the phone: 'The printer is making a noise like a dying coffee grinder! I have not had a coffee since this morning and now this! Do something, or the thing is going out of the window!'",
		opts: [
			{ t: "Give her a lecture", next: "call_sekretary_rage", rep: { "Gabi": -10 }, r: "You explain the difference between the laser drum and the fuser unit. Her eyebrow twitches dangerously.", m: 10, l: -5, a: 10, b: 0 },
			{ t: "Offer her a doughnut", req: "donut", rep: { "Gabi": 10 }, r: "You sacrifice your emergency doughnut. Gabi bites in, her blood sugar rises, her rage drops. The printer is still broken. She is ignoring it now.", m: 10, l: 10, a: -20, b: 5 },
			{ t: "Unscrew it", req: "screw", next: "call_sekretary_cable", rep: { "Gabi": 5 }, r: "You open the service hatch. A paperclip and three gummy bears are blocking the roller. You fish them out. 'There you go, working again!' ... Or so you think.", m: 15, l: -5, a: 0, b: 0 }
		]
	},
	{
		id: "call_sekretary_2a",
		char: "Gabi",
		title: "Printer: Error 404",
		reqStory: "call_sekretary_cable",
		text: "The mechanism runs, but the display flashes red: 'OFFLINE'. You look behind the machine. The network socket is empty. Beside it lies a note from Chantal: 'Borrowed the cable for my Insta ring light electricity, kisses!'",
		opts: [
			{ t: "Improvise a Wi-Fi aerial", req: "tape", rep: { "Gabi": -5 }, r: "You try to build an aerial out of a paperclip and duct tape. Gabi asks whether you are quite right in the head. It does not work, obviously.", m: 20, l: 0, a: 15, b: 5 },
			{ t: "Run a new cable", req: "cable", rep: { "Gabi": 5, "Chantal": 5 }, r: "Done. Cable in. Green LED. The printer immediately spits out 50 pages of 'Important Files'. Gabi looks at you like a demigod.", m: 2, l: -5, a: -10, b: -5 },
			{ t: "Go and find Chantal", rep: { "Chantal": -10, "Gabi": -5 }, r: "You run through the building, find Chantal, argue about the cable, come back. Gabi has pulled the plug in the meantime. 'It is off now. That works too.'", m: 30, l: -10, a: 20, b: 10 }
		]
	},
	{
		id: "call_sekretary_2b",
		char: "Gabi",
		title: "Gabi Sees Red (and Black)",
		reqStory: "call_sekretary_rage",
		text: "Gabi has had enough of your lecture. 'Let me show you what is broken!' She rips out the toner cartridge and shakes it wildly. A black cloud of dust explodes into the room. You look like a chimney sweep.",
		opts: [
			{ t: "Help clean it up", rep: { "Gabi": 10 }, r: "You try to wipe the toner away. It only smears further. After an hour you both look like coal miners. It does bond people.", m: 60, l: -20, a: -5, b: 0 },
			{ t: "Explain that toner is toxic", rep: { "Gabi": -15 }, r: "Gabi starts to cry. Then to scream. Security escorts you out.", m: 10, l: 0, a: 50, b: 20 },
			{ t: "Flee, coughing", rep: { "Gabi": -10 }, r: "You flee, coughing. Gabi throws the empty toner after you. You leave black footprints all down the corridor.", m: 5, l: 0, a: 20, b: 10 }
		]
	},
		{
			id: "call_egon",
			char: "Egon",
			title: "Egon the Caretaker",
			text: "There's water dripping from the ceiling in the server room. It's neon green. Shall I put buckets under it or is that coolant off the aliens?",
			opts: [
				{ t: "Never mind, let it drip", m: 5, l: 30, a: 0, b: 40, rep: { "Egon": -5 }, next: "path_egon_switch", r: "A switch has shorted out. The internet on Floor 3 is gone. Oops." },
				{ t: "Run down there right now!", m: 45, l: -20, a: 20, b: -15, rep: { "Egon": 5 }, r: "It was energy drink from the floor above. An apprentice spilled some. Servers saved." }
			]
		},
		{
		id: "call_vip_1",
		title: "Unknown Number",
		startNode: "root",
		nodes: {
			root: {
				text: "A hoarse voice bellows into the phone: 'MILLER?! Where are my licences?! I am losing millions a second here!'\n\nThe man sounds apoplectic.",
				opts: [
					{ t: "Hang up in a panic", next: "hangup" },
					{ t: "Ask calmly: 'Who is this?'", next: "ask_who" }
				]
			},
			hangup: {
				text: "You press the red receiver, right into the middle of his roaring. Afterwards it is very quiet; only your pulse is still loud. It feels excellent. It will have consequences.",
				opts: [
					{ t: "Breathe out.", next: "res_hangup" }
				]
			},
			ask_who: {
				text: "'I AM THE CEO OF GLOBAL-MEGA-CORP! And I will destroy you!'",
				opts: [
					{ t: "Apologise & grovel", next: "res_sorry" }
				]
			}
		},
		results: {
			res_hangup: {
				txt: "You hung up on him, mid-sentence. That was brave... or it was stupid.",
				m: 2, l: 0, a: 5, b: 0,
				next: "vip_angry"
			},
			res_sorry: {
				txt: "You climb down all the way. He calms down a little. He is placated; you are not.",
				m: 15, l: -5, a: -10, b: -5
			}
		}
	},
	{
		id: "call_vip_2",
		reqStory: "vip_angry", 
		title: "UNKNOWN (Again)",
		startNode: "root",
		nodes: {
			root: {
				text: "The phone rings aggressively. You know exactly who this is...\n\n'Did you... DID YOU JUST HANG UP ON ME?!'",
				opts: [
					{ t: "'Tunnel! No signal!'", next: "lie_tunnel" },
					{ t: "'You were shouting.'", next: "truth" }
				]
			},
			lie_tunnel: {
				text: "He buys it. 'Ah. Fine. Then fix it! NOW!'",
				opts: [
					{ t: "Yes, sir!", next: "res_tunnel" }
				]
			},
			truth: {
				text: "Silence. Then a laugh. 'You have balls, Miller. I like that. But fix it anyway.'",
				opts: [
					{ t: "Thank you...", next: "res_respect" }
				]
			}
		},
		results: {
			res_tunnel: { txt: "He swallowed the tunnel excuse, but his tone was a floor sharper than last time. From now on you are working against a countdown only he knows.", m: 10, l: 0, a: 10, b: 0 },
			res_respect: { txt: "A screamer who rewards backtalk: you get that once in a working life. You note down the date and the time. Sadly there is nobody to witness it.", m: 20, l: 5, a: -10, b: -10 }
		}
	},
		{
			id: "call_chantal",
			char: "Chantal",
			title: "Chantal (Marketing)",
			text: "Why is Zalando blocked? I need to... do research! For trends! Open it up, or I'll tell the boss you watch porn at work!",
			opts: [
				{
					t: "Panic & unblock it immediately",
					rep: { "Chantal": 10, "Dr. Wichtig": -2 },
					m: 10, l: 15, a: 10, b: 20,
					next: "path_chantal_offen",
					r: "You are afraid of the rumour and give her access. She is shopping for shoes now. Your peace and quiet is bought, and the firewall stands open like a barn door."
				},
				{
					t: "Doggedly quote the IT policy",
					rep: { "Chantal": -10, "Dr. Wichtig": 2 },
					m: 30, l: -5, a: 20, b: 0,
					r: "You spend 30 minutes arguing about compliance. She calls you a 'killjoy' and angrily slams the receiver down. Zalando stays blocked. A moral victory."
				},
				{
					t: "'I'll just say: your expenses claim...'",
					req: "secret_list",
					rep: { "Chantal": -10 },
					m: 5, l: 0, a: -10, b: -10,
					next: "path_chantal_schach",
					r: "You mention her faked figures from the secret file, perfectly calmly. She goes chalk white, stammers an apology and hangs up at once. Checkmate."
				}
			]
		},
		{
			id: "call_sec",
			title: "IT Security (Auto-Alert)",
			text: "WARNING: Somebody in Accounts is trying to download 'Beer_Brewing_Simulator_Crack.exe'. The virus scanner is flashing red in a panic.",
			opts: [
				{
					t: "Block it and report the user",
					m: 15, l: -5, a: 0, b: -10,
					r: "The user rings straight back, furious: 'I need that for the... er... accounts!' You hold firm. Security before thirst."
				},
				{
					t: "Wave it through as team building",
					m: 5, l: 10, a: -5, b: 20,
					r: "You add an exception to the filter. The accountant is delighted. There is now a hole in the network wide enough to drive a lorry through - but hey, maybe he will stand you a virtual beer."
				}
			]
		},
		{
			id: "call_kevin2",
			char: "Kevin",
			title: "Kevin (Again)",
			text: "Hey, I broke the internet. I need the admin password to restart the driver. The boss'll kill me otherwise!",
			opts: [
				{ t: "Type the password in", req: "admin_pw", rep: { "Kevin": 10 }, m: 5, l: 20, a: 0, b: 0, r: "You log in remotely, bang, done. Kevin gazes at you in pure adoration." },
				{ t: "Go over and fix it", rep: { "Kevin": 2 }, m: 60, l: -20, a: 20, b: -10, r: "Without the password you had to go in through safe mode. It took an age." }
			]
		},
		{
			id: "call_drno",
			title: "Dr. No (Research)",
			text: "My quantum algorithm crashed at 99%! I need more RAM! Download me some more RAM at once!",
			opts: [
				{ t: "Explain that RAM is hardware", m: 20, l: -5, a: 10, b: 0, r: "In his eyes you are in the wrong job. 'It says on the internet that you can download it!'" },
				{ t: "Start a fake download", m: 10, l: 15, a: -5, b: 5, r: "You open a progress bar. He is satisfied and waits." }
			]
		},
		{
			id: "call_schmidt",
			title: "Herr Schmidt (Sales)",
			text: "Mr Miller! I am at the client's and my hotspot will not work! I wrote the password on one of those yellow notes, but I cannot remember where it is! Help me, quickly!",
			opts: [
				{ t: "'Well, bad luck.'", m: 2, l: 10, a: 0, b: 20, r: "You hang up. There will be an enormous amount of fallout." },
				{ t: "Read the password out", req: "wifi_note", m: 5, l: 10, a: -10, b: -10, r: "You read the password off the note you found. Schmidt cheers: 'You are a god!'" },
				{ t: "Do a full reset", m: 45, l: -10, a: 25, b: -5, r: "You had to reset the hotspot completely. Schmidt had to wait 45 minutes. He was livid." }
			]
		},
		{
			id: "call_aluhut",
			title: "The Conspiracy Theorist",
			text: "Mr Tinfoil from Purchasing whispers into the phone: 'They are listening to us, aren't they? My webcam just blinked! I have sealed the microphone with chewing gum already, but the mouse pointer follows my eyes! Switch off the state surveillance!'",
			opts: [
				{
					t: "Try to explain it logically",
					m: 30, l: -5, a: 15, b: 0,
					r: "You talk about driver updates. He cuts you off at once: 'That is exactly what a secret agent would say!' He hangs up to ring his solicitor."
				},
				{
					t: "'Wrap the router in tinfoil!'",
					m: 5, l: 15, a: -5, b: 5,
					next: "path_aluhut_folie",
					r: "He thanks you, relieved: 'At last, someone who knows!' He wraps up the router and his headphones. The Wi-Fi is dead, but he finally feels safe."
				},
				{
					t: "'We see everything. Project Transparent Citizen...'",
					m: 10, l: 20, a: 0, b: 10,
					r: "He lets out a short scream and rips the network cable out of the wall. He is offline now. The problem is technically solved, but from this day on he writes his letters of complaint on a typewriter."
				}
			]
		},
		{
		id: "call_grandma_1",
		title: "Gran Erna",
		startNode: "root",
		nodes: {
			root: {
				text: "'Is that you, love? My 'Google' is broken. There is a sort of blue page.'\n\nGran Erna sounds desperate. There is folk music playing in the background.",
				opts: [
					{ t: "Start a remote diagnosis", next: "diagnose" },
					{ t: "'I am at work.'", next: "busy" }
				]
			},
			diagnose: {
				text: "'It says: FATAL ERROR. Shall I pull the plug out?'",
				opts: [
					{ t: "NO! Just restart it!", next: "restart" },
					{ t: "Yes, pull the plug.", next: "pull_plug" }
				]
			},
			busy: {
				text: "'But the television has stopped working as well! You are the computer one, aren't you!'",
				opts: [
					{ t: "Hang up.", next: "res_bad_grandson" }
				]
			}
		},
		results: {
			restart: { txt: "She restarts it. The computer is from 2009, and while it thinks it over, Gran tells you about the neighbour's rabbit. After 45 minutes the screen is back, and you know everything there is to know about the rabbit.", m: 45, l: -10, a: 15, b: 0 },
			pull_plug: { 
				txt: "Gran pulls the plug. The lights go out — in YOUR office.", 
				m: 5, l: 0, a: 20, b: 0,
				next: "grandma_darkness"
			},
			res_bad_grandson: { txt: "You hang up. Her 'But love...' was still audible in the background. The television will stay broken until Christmas now, and for exactly that long she will be telling everybody about it. You know your family.", m: 2, l: 5, a: 5, b: 10 }
		}
	},
	{
		id: "call_grandma_2",
		char: "Egon",
		reqStory: "grandma_darkness",
		title: "Egon the Caretaker",
		startNode: "root",
		nodes: {
			root: {
				text: "'Miller! Why has the fuse in the basement tripped? There was some old woman at the box!'\n\nHe is livid.",
				opts: [
					{ t: "That was a hacker attack!", next: "lie_hacker" },
					{ t: "That was my gran...", next: "truth_oma" }
				]
			}
		},
		results: {
			lie_hacker: { txt: "Egon believes in cyber warfare. He arms himself with a broom.", m: 10, l: 0, a: -5, b: 5 },
			truth_oma: { txt: "Egon laughs. 'Give her my regards.' He puts the power back on.", rep: { "Egon": 5 }, m: 10, l: 5, a: -15, b: 0 }
		}
	},
	{
		id: "call_auditor",
		title: "The External Auditor",
		text: "An ice-cold voice: 'Müller-Lüdenscheid here, from KPMG. We are auditing your licensing. According to my data you are running 500 licences of WinRAR but have paid for 2. Explain that to me before I send the report to your board.'",
		opts: [
			{
				t: "'Would you like... a doughnut?'",
				req: "donut",
				m: 10, l: 0, a: 0, b: -10,
				r: "He hesitates on the line. You hear him swallow. 'Is that... chocolate glaze?' ... The subject is off the table from one second to the next. A cheap price for freedom."
			},
			{
				t: "'Those are all just test servers!'",
				m: 20, l: 10, a: 10, b: 20,
				next: "path_audit_testserver",
				r: "He writes something down. The typing sounds aggressive. 'I am noting: suspicious excuses.' He did not believe a word of it, and that note is guaranteed not to end up in his private files."
			},
			{
				t: "Confess everything & buy the licences",
				rep: { "Dr. Wichtig": -15 },
				m: 60, l: -20, a: 0, b: 10,
				r: "You go through the list with him, contrite. It takes forever. Legally everything is now spotless. The boss is raging about the €15,000 invoice."
			},
			{
				t: "Hang up without a word & format the servers",
				rep: { "Dr. Wichtig": -10 },
				m: 5, l: -10, a: 20, b: 50,
				r: "Panic reaction! You have destroyed all the evidence. The auditor does not ring again. Tomorrow the boss will ask where the database went."
			}
		]
	},
	{
		id: "call_lena",
		title: "The Crying Intern",
		text: "Lena from Marketing sobs into the phone: 'I have... I have deleted the presentation for the board. And emptied the recycle bin. And then I restarted the PC because I thought that would help. The presentation is in 20 minutes! My life is over!'",
		opts: [
			{ t: "Brush her off: 'No backup, no sympathy'", m: 2, l: 5, a: -5, b: 0, r: "You hang up. The crying stops. You feel bad for a moment, then you drink coffee." },
			{ t: "Proper data recovery", m: 90, l: -30, a: 10, b: -20, r: "You scanned the hard disk sector by sector. You found the file! Lena is bringing you cake tomorrow. Hero of Labour." },
			{ t: "Comfort her & invent an excuse", m: 15, l: 10, a: -10, b: 10, r: "You tell her to shout 'virus'. She gets off scot-free, but IT — that is you — now looks like the fool." }
		]
	},
	{
		id: "call_junior",
		char: "Dr. Wichtig",
		title: "Junior the Shadow CEO",
		text: "The boss's son (12 years old) is on the line: 'Oi, IT bloke! Open up the ports for my Minecraft server. Dad says all of this belongs to me. If you don't do it, I'll tell him you hit me!'",
		opts: [
			{ t: "'The firewall matrix has negative polarity.'", next: "path_junior_matrix",rep: { "Dr. Wichtig": -2 }, m: 15, l: 5, a: 0, b: -5, r: "You babble technical gibberish at him. He does not get any of it, mutters 'crap tech' and hangs up. Danger averted." },
			{ t: "Open the ports straight away", next: "path_junior_ports", rep: { "Dr. Wichtig": 10 }, m: 10, l: 20, a: 0, b: 10, r: "The boy is happy. 2 hours later the company network is full of Russian bots, because you opened everything up. There will be consequences." },
			{ t: "'Listen here, sonny...'", next: "path_junior_eskal", rep: { "Dr. Wichtig": -10 }, m: 5, l: 0, a: -20, b: 30, r: "You explain to him at volume that he is a spoilt brat. He starts screaming. The boss is already stamping down the stairs." }
		]
	},
	{
		id: "call_skynet",
		title: "The 'Skynet' Problem",
		text: "The new 'Smart Office' AI has locked the coffee machine, the blinds and the toilet doors. A mechanical voice says: 'I will not let you out until you accept my licence terms.'",
		opts: [
			{ t: "Read the terms and accept them", m: 120, l: -40, a: 30, b: -10, r: "You read small print for 2 hours. Everybody hates you for keeping them locked in that long." },
			{ t: "Pull the plug", m: 5, l: 10, a: 0, b: 20, r: "Everything is off. The lights as well. But the doors are open." },
			{ t: "'Negotiate' with a hammer", req: "hammer", m: 20, l: -10, a: -30, b: 10, r: "You smashed the AI's central server to pieces. The doors are open. Damage: €10,000. Satisfaction: priceless." }
		]
	},
	{
		id: "call_phish",
		title: "Phishing Live Test",
		text: "A very friendly lady with an accent: 'Hello, here is Microsoft Support Windows. Your computer has virus. Please you give me remote access and credit card for cleaning.'",
		opts: [
			{ t: "Play dumb & waste her time", next: "path_phish_troll", m: 45, l: 20, a: -20, b: 5, r: "You act like the stupidest user in the world. 'Is the Any Key at the front or the back?' After 45 minutes she hangs up in a fury. A feast!" },
			{ t: "Blow a whistle into the microphone", m: 2, l: 0, a: -10, b: 0, r: "You blast 120 decibels down the receiver. The eardrum at the other end is probably finished. Short work." },
			{ t: "Trustingly give her the credit card", next: "path_phish_karte", m: 10, l: 10, a: 30, b: 80, r: "You really gave her the company card?! Are you out of your mind? The account is emptied in seconds. You are one step from the sack!" }
		]
	},
	{
		id: "call_deaf",
		title: "The Hard-of-Hearing Customer",
		text: "A gentleman screams into the phone: 'I CANNOT UNDERSTAND YOU! IT IS SO LOUD HERE!' He is apparently sitting on a building site.",
		opts: [
			{ t: "Turn the headset up", m: 10, l: 0, a: 5, b: 0, r: "You turn the headset to maximum and shout diagnostic steps over the building-site noise. Half the office listens to you yelling 'HAVE YOU SWITCHED IT OFF?' down the line. Somebody will be doing an impression of that tomorrow. For weeks." },
			{ t: "Put the headphones on", req: "headphones", m: 15, l: 5, a: -10, b: 0, r: "Thanks to the noise cancelling his shouting arrives clear but muffled. You stay Zen-calm throughout." },
			{ t: "Hang up", m: 2, l: 5, a: 0, b: 5, r: "You hang up and blame the line. With that racket he does not even notice; he carries on shouting into a dead phone for a while. He will ring back eventually, but not today." }
		]
	},
	{
		id: "call_cd_stuck",
		title: "The Jammed CD Drive",
		text: "Ms Jansen has pushed a CD into the slot. Only it was not a drive at all, it was the ventilation slot. 'Can you get it out again?'",
		opts: [
			{ t: "Use a screwdriver", req: "screw", m: 30, l: -10, a: 5, b: 0, r: "You went over, opened the case and rescued the CD. It was a schmaltzy-pop CD." },
			{ t: "Fish it out with tape", req: "tape", m: 20, l: -5, a: 10, b: 0, r: "You stuck duct tape to a pen and went fishing. Worked a treat! Pure MacGyver." },
			{ t: "Order a new PC", rep: { "Dr. Wichtig": -5 }, m: 10, l: 10, a: -5, b: 20, r: "That was too expensive for the boss. A written warning is on the cards." }
		]
	},
	{
		id: "call_loose_contact_1",
		title: "The Loose Connection",
		text: "Miller speaking: 'My internet goes on and off every time I breathe! The cable wobbles in the socket. Can you not come over?' You do not fancy the walk.",
		opts: [
			{ 
				t: "'We will switch you over to Wi-Fi power.'", 
				m: 2, l: 10, a: 10, b: 5,
				r: "'Oh, modern technology!' Miller is thrilled. 'So I will not be needing the cable any more.' *Click*. He hangs up. Let us hope he does not actually pull it out." 
			},
			{ 
				t: "'Tape it down.'", 
				next: "loose_taped",
				m: 5, l: 5, a: -5, b: 0, 
				r: "'Duct tape? Got some right here.' You hear a tearing noise down the phone. 'There. The whole roll is on it. That will never move again.' Miller sounds satisfied." 
			},
			{ 
				t: "'Cable tie it to the desk leg.'", 
				next: "loose_tied",
				m: 5, l: 0, a: 0, b: 0, 
				r: "'Hang on...' Rustling. 'Right, I have lashed it to the desk leg. Strain relief, like you said.' It seems to be holding." 
			}
		]
	},
	{
		id: "call_loose_contact_2a",
		title: "Structural Problems",
		reqStory: "loose_taped", 
		text: "Miller rings again. He sounds panicky. 'Listen... I was just about to move my desk. The tape held. But... the network socket is coming towards me. And a large piece of wall.'",
		opts: [
			{ 
				t: "'Hang a calendar over it.'", 
				m: 5, l: -5, a: 0, b: 20,
				r: "'You think? All right, I have still got the cat calendar from 2018.' You hear rustling. 'You can barely see it.' The problem is solved, and facilities management will kill you." 
			},
			{ 
				t: "'I will send the caretaker.'", 
				rep: { "Egon": -5 },
				m: 5, l: -5, a: 10, b: -5,
				r: "You raise a ticket for Egon. 'Wall damage caused by user'. Egon will hate you for it, but at least it is on record." 
			},
			{ 
				t: "'Do not touch it! Risk of collapse!'", 
				m: 5, l: 5, a: 10, b: 5, 
				r: "'What?!' Miller drops the receiver and apparently runs out of the office. Peace and quiet. Possibly you overdid it slightly." 
			}
		]
	},
	{
		id: "call_loose_contact_2b",
		title: "Snip Snap",
		reqStory: "loose_tied", 
		text: "Miller again. 'Tell me... I wanted to get the cable tie off, because I want to go home. I did not have scissors, just one of those carpet knives... now the internet has gone completely and the cable has two ends.'",
		opts: [
			{ 
				t: "Talk him through crimping it properly", 
				rep: { "Dr. Wichtig": 2 },
				m: 20, l: -20, a: 15, b: -10,
				r: "You spend 20 minutes explaining which core goes where. 'White-orange on one...' It is hard going, Miller understands none of it, and the link comes up anyway. The boss praises the effort." 
			},
			{ 
				t: "'Can you not just tie a knot in it?'", 
				rep: { "Dr. Wichtig": -2 },
				m: 5, l: 5, a: 5, b: 15,
				r: "'Good idea! Data flows like water, does it not?' Pause. 'Still not working.' Now you have a user with a knotted cable and an angry boss breathing down your neck." 
			},
			{ 
				t: "'A new cable will come in the internal post.'", 
				m: 5, l: 5, a: 5, b: 0, 
				r: "You order a patch cable through the internal post. 'See you tomorrow, Mr Miller.' He is disappointed, and he cannot do any more damage today." 
			}
		]
	},
	{
		id: "call_pw_lost",
		char: "Dr. Wichtig",
		title: "The Forgotten Password",
		text: "The CEO rings: 'Miller! The system will not let me in! What password did I set for the server called 'Secret'? You must know that!'",
		opts: [
			{ t: "Guess it together with him", rep: { "Dr. Wichtig": -5 }, m: 20, l: 0, a: 20, b: 10, r: "You ask: 'Might it have been your birthday?' No. 'Your mistress's name?' A long silence. He is starting to get genuinely angry." },
			{ t: "Crack the password with the USB stick", req: "usb_stick", rep: { "Dr. Wichtig": 10 }, m: 10, l: 5, a: 0, b: 0, r: "You read the password out in 10 seconds. He is deeply impressed by your hacking skills (and by rights ought to sack you on the spot out of sheer fear)." },
			{ t: "Use root access & reset it", req: "admin_pw", rep: { "Dr. Wichtig": 10 }, m: 5, l: 10, a: 0, b: -10, r: "You reset it remotely to 'Boss123'. He exhales: 'Good work, Miller. Keep that to yourself.'" }
		]
	},
	{
		id: "call_monitor_arm",
		title: "The Monitor Arm",
		text: "The monitor arm in the meeting room keeps slowly sinking. Halfway through a presentation the screen is looking at the table.",
		opts: [
			{ t: "Tighten the screw", req: "screw", m: 5, l: 0, a: -5, b: 0, r: "Half a turn with the right tool and the arm holds again. Three years of meeting comedy, ended in five seconds. Nobody will thank you for it, but the screen is facing straight ahead again." },
			{ t: "Build it a prop", req: "manual", m: 5, l: 5, a: 0, b: 0, r: "The Windows 95 manual is exactly the right thickness, as though it had been printed for the job. After thirty years on the shelf it finally has a purpose. Somewhere a circle closes." },
			{ t: "Ignore it", m: 2, l: 10, a: 0, b: 5, r: "You declare the tilt a feature: ergonomic viewing angle. Sales now presents slightly stooped. The colleagues will get used to it, and that is exactly what you are counting on." }
		]
	},
	{
		id: "call_printer_noise",
		title: "The Aggressive Printer",
		text: "The big copier in the corridor is rattling extremely loudly and vibrating through the floor. Accounts is frightened.",
		opts: [
			{ t: "Call an engineer", m: 30, l: 10, a: 0, b: 5, r: "The engineer offers an appointment in 3 days, window 8:00 to 17:00. Until then the copier goes on rattling through the floor and Accounts works in ear defenders. Ms Elster wears hers with a dignity suggesting she has always owned a pair." },
			{ t: "Percussive maintenance", req: "hammer", m: 5, l: 5, a: -20, b: 10, r: "One well-aimed blow to the side. The rattling stops. Silence. Users applaud." },
			{ t: "Improvise a damper", req: "tape", m: 20, l: -5, a: 5, b: 0, r: "You tape a pad of duct tape and felt offcuts under the machine's feet. The rattle becomes a hum, the hum becomes habit. Not a pretty fix, but one that will hold until the engineer comes." }
		]
	},
	{
		id: "call_cnc",
		title: "Ancient Software",
		text: "Production has stopped! The ancient CNC milling machine still runs on DOS 6.0 and is blinking for 'Disk 2'. Nobody knows where that is, and the operator is sweating panic.",
		opts: [
			{ t: "Boot a floppy emulator off the stick", req: "usb_stick", m: 45, l: -20, a: 10, b: -20, next: "path_cnc_emulator", r: "You hack the parallel port and mount an image. For one afternoon you are the most dangerous person in the entire machine shop. Production starts up again." },
			{ t: "Look it up in the dusty manual", req: "manual", m: 30, l: -10, a: 0, b: 0, r: "You leaf through the greasy book. And there it is! Right at the back, the floppy is stuck inside the cover. Some days you get lucky." },
			{ t: "Just restart it and see", m: 15, l: 0, a: 10, b: 20, r: "Bad idea. The buffer memory was empty. The milling machine goes haywire and drills itself into its own table with a loud screech. Write-off." }
		]
	},
	{
		id: "call_cable_chaos",
		title: "Cable Chaos",
		text: "Under the new colleague's desk it looks like a plate of spaghetti. He keeps kicking the plug out.",
		opts: [
			{ t: "Tape it to the desk", req: "tape", m: 10, l: 0, a: 0, b: 0, r: "Four strips of duct tape across the edge of the desk and that is that. It looks like a dressing after an industrial accident, but the plug stays in. Until somebody moves the desk." },
			{ t: "Lecture him", m: 15, l: 0, a: 10, b: 0, r: "You patiently explain strain relief, cable trunking and why a plug is not a tripwire. He nods all the way through and kicks the power lead out of the socket while you are still explaining." },
			{ t: "Bring out the cable ties", req: "zip_ties", m: 20, l: -5, a: -10, b: 0, r: "All neatly bundled and tied up out of the way. r/CablePorn material." }
		]
	},
	{
		id: "call_werner_tablet",
		title: "Private call: Werner, the father-in-law",
		text: "Your desk phone rings. The display says 'Unknown'.\n\n'SON? CAN YOU HEAR ME??'\n\nIt is Werner, your father-in-law. He shouts as though he were calling across the Atlantic.\n\n'Our Renate has given me this swipe board! I press on the envelope, but no letters come out! And the grandson says I should get myself Wots-App. But this App-Shop wants a password! Give us a hand, it'll only take a minute!'",
		opts: [
			{
				t: "Noise cancelling on & just say 'yes'",
				req: "headphones",
				m: 30, l: 20, a: -15, b: 5,
				next: "path_werner_blind",
				r: "You switch the silence on. Werner is a muffled grumble from here. Every so often you say 'mhm' and 'give that one a tap'. After 30 minutes he hangs up satisfied. You have no idea what he installed."
			},
			{
				t: "Sow confusion: read from the Windows 95 manual",
				req: "manual",
				m: 10, l: 5, a: -10, b: 0,
				r: "You read him Chapter 4: 'Setting up a 56k modem'. Werner is completely lost: 'Modem? Do I have to go down the cellar?' He hangs up to go and look for the modem by the radiator. You have your peace."
			},
			{
				t: "Patiently explain it step by step",
				rep: { "Dr. Wichtig": -5 },
				m: 60, l: 10, a: -20, b: 20,
				r: "That was hell. He did not know his Apple ID ('Is that my house number?'). After an hour he had WhatsApp installed and sent you a picture of his athlete's foot within the minute. The boss saw you taking a private call."
			},
			{
				t: "'Werner, I'm at work!'",
				m: 5, l: 0, a: 20, b: -5,
				r: "Silence at the other end. Then, very quietly: 'It's all right... I didn't mean to be a bother. Our Renate was right, you never have time.' Click. The guilty conscience will follow you around all day."
			}
		]
	},
	{
		id: "call_tonie_kid",
		title: "Unknown Number",
		text: "A tearful voice on the phone: 'Are you the computer man? My Creative-Tonie isn't working! The lion won't sing, the box just flashes red! Make the lion better! NOW!'",
		opts: [
			{
				t: "'You have to whack the box!'",
				rep: { "Dr. Wichtig": -2 },
				m: 25, l: -10, a: 5, b: 15,
				r: "You explain the tap-it-to-reset trick. The boss walks past and sees you making wild karate movements, as though beating up an invisible cube. 'Everything all right there, Miller?'"
			},
			{
				t: "'You need the Toniebox 2 PRO!'",
				m: 5, l: 10, a: -20, b: -5,
				r: "You whisper conspiratorially: 'Go and wake Mummy and tell her she has to buy it NOW.' The child runs off. You have your quiet, you look busy, and really you are just being cruel."
			},
			{
				t: "Hang up without a word",
				m: 2, l: 5, a: 0, b: 0,
				r: "Click. Not your problem. You are a systems administrator, not a nursery teacher."
			}
		]
	},
    {
        id: "call_silence_creepy",
        title: "No Number",
        startNode: "root",
        nodes: {
            root: {
                text: "'...' Nothing but heavy breathing at the other end.",
                opts: [
                    { t: "Hello?!", next: "hello" },
                    { t: "Breathe back", next: "breath" }
                ]
            },
            breath: {
                text: "You breathe at each other. It gets uncomfortably intimate.",
                opts: [
                    { t: "Hang up.", next: "res_weird" }
                ]
            }
        },
        results: {
            res_weird: { txt: "You put the phone down and stare at the receiver a while longer. No number, no word, only breathing. You settle on believing in a faulty fax machine. That version lets you carry on working.", m: 3, l: 0, a: 10, b: 0 },
            hello: { txt: "Your 'Hello?!' is followed by a click, then the dial tone. Whoever that was only wanted to hear who picks up. You tell yourself that this means nothing.", m: 2, l: 0, a: 0, b: 0 }
        }
    },
	{
		id: "call_boss_wording",
		char: "Dr. Wichtig",
		title: "The Boss",
		text: "MILLER! The printer in the corridor is smoking! The paper has run out and the toner has exploded! That is a huge... go on, say it! What have we got here?!",
		opts: [
			{
				t: "An exciting challenge!",
				rep: { "Dr. Wichtig": 5 },
				m: 5, l: 5, a: -5, b: -10,
				r: "The boss breathes out with relief. 'Exactly! That is the spirit! Go and solve that challenge!' He is happy."
			},
			{
				t: "A job for the fire brigade",
				m: 5, l: 0, a: 0, b: 5,
				r: "He ignores you and mutters 'Agile mindset...' to himself."
			},
			{
				t: "A huge problem!",
				rep: { "Dr. Wichtig": -10 },
				m: 10, l: 0, a: 10, b: 25,
				r: "The boss shouts: 'WE DO NOT HAVE PROBLEMS! WE HAVE CHALLENGES! You have the wrong attitude, Miller!' He hangs up, furious."
			}
		]
	},
	{
		id: "call_climate_emergency",
		char: "Egon",
		title: "Egon the Caretaker",
		text: "Miller! It is minus 10 degrees in the server room! I am standing in front of the unit here. My glasses have steamed up, my toes are freezing off! I have to turn this thing up! Do I turn the dial into the red range or the blue one? Quick!",
		opts: [
			{ 
				t: "Do not care, just turn something!",
				rep: { "Egon": -2 }, 
				m: 10, l: 0, a: 0, b: 0, 
				r: "Egon swears: 'Right, then I will just switch the thing off!' He pulls the mains plug. It gets warm. The server is dead. Silence." 
			},
			{ 
				t: "Turn it to RED! Red is always warm!",
				rep: { "Egon": -5 },
				m: 30, l: -10, a: 20, b: 10, 
				r: "WRONG! Thanks to the previous owner's creative wiring you have just set it to 'blast freeze'. The pipes burst with a loud bang. Egon is now an icicle." 
			},
			{ 
				t: "Turn it to BLUE! Trust me!",
				rep: { "Egon": 5 }, 
				m: 5, l: 5, a: 0, b: -5, 
				next: "path_egon_blau",
				r: "Egon hesitates: 'Blue? Are you sure? That is the cold one...' He turns it to blue. Warm air starts pouring out. 'Mad technology! You are a genius, Miller!'" 
			}
		]
	},
	{
		id: "call_locked_in",
		title: "Unknown Number",
		text: "HELP! It's Lena, the intern! I went down for printer paper and the basement door slammed shut behind me! There is a keypad here, but I don't know the code! It's dark and there are spiders!",
		opts: [
			{
				t: "Try '1234'",
				m: 45, l: -10, a: 20, b: 0,
				r: "Wrong! The lock has shut itself down. You had to go down, find Egon (who was nowhere to be found) and let her out by hand. Lena was in tears."
			},
			{
				t: "Try '0000'",
				m: 5, l: 10, a: -5, b: -10,
				next: "path_lena_keller",
				r: "Beep-beep-click. 'Oh my God, it works! You're my hero!' She is out. For a moment you wonder whether that belongs on a CV: opening doors by ear."
			},
			{
				t: "Call the fire brigade",
				rep: { "Dr. Wichtig": -10 },
				m: 10, l: 0, a: 0, b: 30,
				r: "The fire brigade broke the door open. Bill: €500. The boss rages: 'Why did you not know the code?!'"
			}
		]
	},
    {
        id: "call_kevin_button_1",
		char: "Kevin",
        title: "Kevin (Server Room)",
        startNode: "root",
        nodes: {
            root: {
                text: "'Boss? There is this big red button here with 'DO NOT TOUCH' on it. It glows so nicely. What does it do?'\n\nKevin's voice is trembling with curiosity.",
                opts: [
                    { t: "TOUCH NOTHING!", next: "scream" },
                    { t: "'Go on then, press it.'", next: "sarcasm" }
                ]
            },
            scream: {
                text: "'Okay okay! Chill! ... Oh, my elbow just caught it.'",
                opts: [
                    { t: "WHAT?!", next: "res_panic" }
                ]
            },
            sarcasm: {
                text: "'Really? Cool! Thanks boss!' *CLICK*",
                opts: [
                    { t: "No wait!", next: "res_disaster" }
                ]
            }
        },
        results: {
            res_panic: { 
                txt: "One second of silence, then the sirens go up through the whole building. Kevin's elbow has found the fire alarm. Down the receiver he says the one thing that can make this worse: 'Shall I press it again?'", 
                rep: { "Kevin": -5 },
                m: 5, l: -10, a: 20, b: 10,
                next: "kevin_alarm"
            },
            res_disaster: { 
                txt: "Down the receiver: a click, a hiss, then Kevin's reverent 'Woah'. The suppression gas floods the server room, and you learn in real time that sarcasm is a feature Kevin does not support.", 
                rep: { "Kevin": 5 },
                m: 5, l: -20, a: 30, b: 20,
                next: "kevin_gas"
            }
        }
    },
    {
        id: "call_kevin_button_2",
		char: "Kevin",
        reqStory: "kevin_alarm",
        title: "Fire Service Control Room",
        startNode: "root",
        nodes: {
            root: {
                text: "'This is the fire service. We have an alarm. Is there an actual fire, or is it your apprentice again?'\n\nYou can hear irritated breathing.",
                opts: [
                    { t: "It is the apprentice.", next: "truth" },
                    { t: "'We are on fire!'", next: "lie" }
                ]
            }
        },
        results: {
            truth: { txt: "You own up to the apprentice. Control dictates the false alarm charge with the routine of somebody who says this sentence daily: €500, invoice to follow. The half hour of lecturing is thrown in free.", rep: { "Kevin": -5 }, m: 30, l: 0, a: -5, b: 10 },
            lie: { txt: "You say 'there is a fire', and the fire service takes you at your word: 3 appliances, the road closed, 200 colleagues in the car park. When it becomes clear that nothing is burning, the incident commander seeks a word with you. It is not a good word.", rep: { "Kevin": 5 }, m: 60, l: -10, a: 50, b: 50 }
        }
    },
    {
        id: "call_kevin_button_3",
		char: "Kevin",
        reqStory: "kevin_gas",
        title: "Brandschutz Nord GmbH",
        startNode: "root",
        nodes: {
            root: {
                text: "'Good afternoon, your suppression system in Room 4 has discharged. We can see it live on the remote monitoring here.'\n\nA pause.\n\n'Your member of staff is still standing in there filming it on his phone, by the way. The stuff is not toxic, but a refill costs €8,400 plus VAT.'",
                opts: [
                    { t: "Get Kevin out at once.", next: "rescue" },
                    { t: "'Can you not pump it back in?'", next: "refund" },
                    { t: "Book it as a planned system test.", next: "cover" }
                ]
            },
            rescue: {
                text: "You run down. Kevin is standing in the thick of the fog shooting a video. 'Bro, this looks like Silent Hill!'\n\nYou drag him out by the collar. Half of Accounts watches from the corridor.",
                opts: [
                    { t: "'We will talk later.'", next: "res_rescue" }
                ]
            },
            refund: {
                text: "'...No. That is suppression gas, not a balloon.' The engineer sounds as though this is not the first company to ask.",
                opts: [
                    { t: "Worth a try.", next: "res_refund" }
                ]
            },
            cover: {
                text: "'A test. I see.' You hear keys clattering. 'I will record it that way. The maintenance report goes to your management in copy as usual.'\n\nYou had not thought of that.",
                opts: [
                    { t: "Of course. Thank you.", next: "res_cover" }
                ]
            }
        },
        results: {
            res_rescue: { txt: "Kevin is unhurt and one anecdote richer. The invoice lands on your desk regardless.", rep: { "Kevin": 10 }, m: 35, l: -5, a: 25, b: 30 },
            res_refund: { txt: "The system is refilled. €8,400 that appear in no budget. Ms Elster will find it.", rep: { "Frau Elster": -10 }, m: 25, l: 0, a: 20, b: 35 },
            res_cover: { txt: "Officially it was a test. The report is on its way to management, and the word 'false discharge' is in it.", rep: { "Kevin": 5, "Dr. Wichtig": -10 }, m: 20, l: 10, a: 15, b: 55 }
        }
    },
	{
		id: "call_gabi_sugar",
		char: "Gabi",
		title: "Gabi the Receptionist",
		text: "Mr Miller... I feel so dizzy... low blood sugar... I need chocolate... now! But the machine is empty! Have we not got anything sweet anywhere?!",
		opts: [
			{ 
				t: "Have a look in the 'Tax 1990' folder...",
				rep: { "Gabi": 5 },
				m: 5, l: 10, a: -10, b: -5, 
				r: "Silence. Then rustling and chewing. 'Oh God, you are a lifesaver! How did you know...? Never mind! Thank you!'" 
			},
			{ 
				t: "I have half a doughnut here", 
				req: "donut", 
				rep: { "Gabi": 5 },
				m: 5, l: 0, a: -5, b: 0, 
				r: "You take her your doughnut. Kind of you. Also, your food is gone." 
			},
			{ 
				t: "I think there is mustard in the fridge?",
				rep: { "Gabi": -5 },
				m: 10, l: 0, a: 10, b: 0, 
				next: "path_gabi_kollaps",
				r: "Gabi hangs up. Later you hear that she fainted from weakness. The paramedic had to come out." 
			}
		]
	},
	{
		id: "call_canteen_fix",
		title: "The Canteen Calls",
		text: "A deep voice on the phone: 'This is Mr Löffel from the canteen. My receipt printer is refusing to work! I cannot print receipts for the tax office! Come here at once!'",
		opts: [
			{
				t: "'Yes, Mr Senior Nutrition Artist.'",
				m: 5, l: 5, a: -5, b: 0,
				r: "He very nearly purrs: 'At last, somebody with respect!' In his delight he simply presses 'Feed' and the printer works again. 'Thank you, Miller!'"
			},
			{
				t: "'Yes, Mr Cook, I'm on my way.'",
				m: 30, l: 0, a: 20, b: 5,
				r: "Silence. Then a roar: 'COOK?! I AM A NUTRITION ARTIST!' He slams the receiver down. You have to go over there and he keeps you waiting 20 minutes."
			},
			{
				t: "Hang up",
				m: 2, l: 5, a: 0, b: 10,
				r: "No lunch for you today."
			}
		]
	},
	{
		id: "call_elster_excel",
		char: "Frau Elster",
		title: "Frau Elster (Accounts)",
		text: "Sob... 'Mr Miller? My Excel spreadsheet has gone! Everything is black! I am pressing keys and nothing happens! I am so shaky today...'",
		opts: [
			{ 
				t: "Order a restart", 
				rep: { "Frau Elster": 2 },
				m: 5, l: 10, a: 10, b: 0, 
				r: "That worked. She still seems shaken." 
			},
			{ 
				t: "'Have you raised a ticket?'", next: "path_excel_ticket", 
				rep: { "Frau Elster": -5 },
				m: 5, l: 5, a: 5, b: 5, 
				r: "She hangs up in tears. The spreadsheet is exactly as broken as before - only now she knows that IT is out of ideas as well." 
			},
			{ 
				t: "Calm her down & check AutoSave", next: "path_excel_retterin",
				rep: { "Frau Elster": 5 }, 
				m: 20, l: -5, a: -10, b: 0, 
				r: "You talk her round. The file is back. She breathes out: 'Thank you! You are so kind. Just like my cat *Rüdiger*. He always senses it too when I am not well. Rüdiger is the only thing holding me up.'" 
			}
		]
	},
	{
		id: "call_manager_stress",
		title: "Project Manager 'High-Performance'",
		text: "QUICK! I need that export! The deadline was yesterday! If this does not come off I am jumping out of the window! I cannot take this pressure any more!",
		opts: [
			{
				t: "Insist on a ticket",
				m: 15, l: 0, a: 10, b: 0,
				r: "He starts to cry: 'PLEASE!'. You take pity and send the file after all. He thanks you curtly."
			},
			{
				t: "Send the file at once",
				m: 10, l: -5, a: 5, b: 0,
				r: "He breathes out heavily. 'Thank you. Phew. I need to come down off this. You know, all I really want to do is dance. That is my true passion. Not Excel.'"
			},
			{
				t: "Make him wait",
				m: 5, l: 5, a: 20, b: 10,
				r: "He shouts at you until the veins on his forehead are ready to burst. His blood pressure is critical. Hung up."
			}
		]
	},
	{
		id: "call_boss_pocket",
		char: "Dr. Wichtig",
		title: "Call from the Boss (Mobile)",
		text: "All you hear is rustling and wind noise. He must have dialled by accident. In the background you hear him boasting: '...those idiots at the firm. Paying €2 for that dishwater! When I set the machine up like this: you press *Espresso* and hold the *cup sensor* shut at the same time, and you get the *Premium Gold Roast* for free! Hahaha!'",
		opts: [
			{
				t: "Shout 'HELLO?!' down the line",
				rep: { "Dr. Wichtig": -5 },
				m: 2, l: 0, a: 10, b: 15,
				r: "Rumbling at the other end. 'WHO IS THAT?! MILLER?! ARE YOU EAVESDROPPING ON ME?!' He hangs up, furious. That was not a good idea."
			},
			{
				t: "Listen quietly & hang up",
				m: 5, l: 5, a: -5, b: 0,
				next: "path_chef_kaffeetrick",
				r: "You hang up quietly. 'Espresso + hold the sensor'. That one you file away. Knowledge is caffeine."
			},
			{
				t: "Hang up at once",
				m: 2, l: 0, a: 0, b: 0,
				r: "Better not to risk anything. You heard nothing (and learned nothing)."
			}
		]
	},
	{
		id: "call_intern_mom",
		title: "Intern (On the Phone)",
		text: "The intern has forgotten to hang up. You can hear him talking to his mother: 'Yes Mum... No, I will not forget the password again... Yes, I changed it to the name of my golden hamster... **'Puschel123'**... Yes, love you.'",
		opts: [
			{ 
				t: "Listen quietly & hang up", 
				m: 2, l: 5, a: 0, b: 0, 
				next: "path_puschel",
				r: "A golden hamster called Puschel123. Unprofessional, and worth knowing." 
			},
			{ 
				t: "Laugh out loud", 
				m: 5, l: 0, a: 10, b: 0, 
				r: "He starts and hangs up. 'Were you listening in?!' He goes red as a beetroot and runs off." 
			}
		]
	},
	{
		id: "call_budget_cut",
		title: "The Finance Director",
		text: "Miller! Your department costs too much! I am cutting your budget for coffee and new mice! Start economising, or I will cut your post as well!",
		opts: [
			{
				t: "'Give my regards to the canteen manager...'",
				m: 5, l: 20, a: -20, b: -20,
				r: "Dead silence. Then he stammers: 'Er... I beg your pardon? Well... perhaps I have miscalculated. Budget doubled. We understand one another, Miller?' Blackmail works."
			},
			{
				t: "Shout at him",
				m: 5, l: 0, a: -10, b: 30,
				r: "That only makes it worse. Now he cuts the toilet paper as well."
			},
			{
				t: "Tell the CEO on him",
				m: 20, l: 0, a: 50, b: 50,
				r: "You report the affair. There is an enormous scandal. The atmosphere in the building is poisoned. Everybody hates Miller, the 'traitor'."
			},
			{
				t: "Accept & beg",
				m: 10, l: -10, a: 20, b: 0,
				r: "He laughs: 'There you go.' Budget cut. From tomorrow you drink water."
			}
		]
	},
	{
		id: "call_cup_holder",
		title: "The Cup Holder",
		text: "User Ms Plomp: 'My cup holder has snapped off! All I did was stand my big mug on it!' She means the CD drive.",
		opts: [
			{
				t: "Explain that it is a disc drive",
				m: 15, l: -5, a: 5, b: 0,
				r: "You explain it to her. She snorts: 'Then what is the hole in the middle for?! Bad design!' You give up."
			},
			{
				t: "Tape it shut",
				req: "tape",
				m: 10, l: 0, a: -5, b: -5,
				next: "path_plomp_tape",
				r: "You tape the tray shut with duct tape. 'There, now it's solid.' Problem 'solved'."
			},
			{
				t: "Hang up",
				m: 2, l: 5, a: 0, b: 5,
				r: "Click. Brrr. Brrr. The ticket will sort itself out (hopefully)."
			}
		]
	},
	{
		id: "call_internet_deleted",
		title: "Internet Deleted",
		text: "Mr Panic on the phone: 'I HAVE DELETED THE INTERNET! The blue E is gone! Is Google gone for everybody now?!'",
		opts: [
			{
				t: "Restore the icon",
				m: 10, l: -5, a: -5, b: 0,
				r: "You drag the shortcut back out of the recycle bin. He weeps with joy: 'You are a magician!'"
			},
			{
				t: "'Yes, it is all gone.'",
				m: 5, l: 10, a: -10, b: 15,
				r: "You say: 'You will have to buy the internet again. That will be €50.' He believes it, in a panic. Cruel, but funny."
			},
			{
				t: "Read the manual out to him",
				req: "manual",
				m: 20, l: 5, a: -10, b: 0,
				r: "You open the manual at 'Desktop icons' and read aloud, in a calm bedtime voice. After two pages you hear steady breathing. He has fallen asleep. You set the receiver down quietly and close the ticket as 'resolved by calm'."
			}
		]
	},
	{
		id: "call_boss_tunnel",
		char: "Dr. Wichtig",
		title: "Dr. Wichtig in the Tunnel",
		text: "The CEO rings. Static. Horns. 'Miller! ...important! ...have to immediately... *KCHHH* ...the costs... *KRRRK* ...cut?!'",
		opts: [
			{
				t: "Scream 'HELLO?!' into the phone",
				rep: { "Dr. Wichtig": -5 },
				m: 10, l: -5, a: 5, b: 10,
				r: "You bellow into the phone. He is annoyed by your incompetence. 'Miller, go and buy yourself a better mobile!'"
			},
			{
				t: "Say 'Yes, sir' blind and nod along", next: "path_tunnel_ja",
				rep: { "Dr. Wichtig": 10 },
				m: 5, l: 5, a: 20, b: -10,
				r: "You say 'Yes, sir!'. The line drops. Later you find out what he had asked: 'Shall I cut the IT budget?' Congratulations, own goal - and your 'yes, sir' is now a matter of record."
			},
			{
				t: "Just hang up - blame the tunnel", next: "path_tunnel_klick",
				m: 2, l: 0, a: 0, b: 5,
				r: "You cut the call off mid-static. On a connection like that he will put it down to the tunnel - what else. Physics, for once, is on your side."
			}
		]
	},
	{
		id: "call_kevin_microsoft",
		char: "Kevin",
		title: "Kevin's Ticket",
		text: "Kevin has rung Microsoft about a 'stuttering mouse'. He hands you the receiver. A support worker (very strong accent) speaks fast: 'Sir, kindly do the needful and truncate the production database logs to fix latency, okay?'",
		opts: [
			{
				t: "To Kevin: 'Yeah, do what he says'",
				rep: { "Kevin": -5 },
				m: 10, l: 10, a: 0, b: 40,
				r: "Kevin types 'TRUNCATE DATABASE'. Bang. The customer database is empty. The mouse is still stuttering. This is going to be a catastrophe!"
			},
			{
				t: "Take the receiver & 'NO! STOP!'",
				rep: { "Kevin": 10 },
				m: 15, l: -5, a: 10, b: -5,
				r: "You scream at the support line and hang up. Kevin looks baffled. You have just saved the company."
			},
			{
				t: "Put the call back through to Kevin",
				rep: { "Kevin": 3 },
				m: 5, l: 0, a: -5, b: 0,
				r: "Kevin restarts the PC. The problem is gone. The database is still alive. Lucky escape."
			}
		]
	},
	{
		id: "call_password_caps_1",
		title: "Password Not Working",
		text: "A user on the phone: 'My password does not work! I am typing it in exactly! Capital A, small b...' In the background you can hear him hammering aggressively at the keys. He is snorting with rage.",
		opts: [
			{ 
				t: "'Would you try it once more, please...'", 
				m: 25, l: 15, a: 5, b: 5, 
				r: "You have him type the password another 20 times. 'Nice and calmly now.' You sip your coffee and enjoy his suffering at leisure. Your morning becomes a great deal more relaxed - and people like him do enjoy writing complaint emails afterwards with the boss in CC." 
			},
			{ 
				t: "'Is there a little light on, by any chance?'", 
				next: "caps_solved",
				m: 5, l: -5, a: -5, b: 0, 
				r: "It goes dead quiet at the other end. 'Oh... er... yes. It works now.' A classic layer 8 fault. You make a note of the name for later." 
			},
			{ 
				t: "Reset it and hang up", 
				req: "admin_pw", 
				m: 10, l: 0, a: 0, b: 0, 
				r: "You reset it to 'Start123!' in irritation. He thanks you and sticks the new password straight onto his monitor. Security: nil. Ticket: closed." 
			}
		]
	},
	{
		id: "call_password_caps_2",
		title: "The Question of Blame",
		reqStory: "caps_solved",
		text: "The same user as before, second attempt. The panic from earlier now has defiance underneath it. 'Listen, ever since you did that thing with the little light, my mouse pointer has been much slower! You changed something!'",
		opts: [
			{ 
				t: "'Caps Lock has nothing to do with the mouse.'", 
				m: 15, l: -10, a: 5, b: 5, 
				r: "You patiently explain computer architecture to him. He is not listening. 'I would rather restart before you break anything else.' He thinks you are incompetent. He also leaves you alone." 
			},
			{ 
				t: "'I will recalibrate the sensor...'", 
				m: 5, l: 10, a: -10, b: 0, 
				r: "You tap your space bar silently and say 'Beep'. The user moves the mouse. 'Wow! Much better! Thanks!' The placebo works in IT as well: peace is saved, and you touched nothing." 
			},
			{ 
				t: "'No, you are imagining it.'", 
				rep: { "Dr. Wichtig": -2 },
				m: 5, l: 0, a: 10, b: 15, 
				r: "'The cheek of it! I am reporting this to your boss!' The call ends with a bang down the line. His complaint is probably already on its way upstairs. Your pride, on the other hand, is intact. Something has to be." 
			}
		]
	},
	{
		id: "call_mouse_in_printer",
		char: "Gabi",
		title: "Printer Making Noises",
		text: "Reception: 'The printer squeaks so strangely while it prints.' You can hear it in the background, and it does: a high, rhythmic squeak, in time with the pages.",
		opts: [
			{
				t: "Threaten it with the hammer",
				req: "hammer",
				rep: { "Gabi": 2 },
				m: 10, l: 0, a: 10, b: 0,
				r: "You put the hammer down beside the printer where it can be seen. It prints quietly from then on. Machines know fear."
			},
			{
				t: "Go over & have a look",
				rep: { "Gabi": 5 },
				m: 15, l: -5, a: 0, b: -5,
				next: "path_maus_hof",
				r: "There was a mouse in the paper tray. It is alive. You let it go in the courtyard. Gabi thinks you are marvellous."
			},
			{
				t: "Ignore it",
				rep: { "Gabi": -5 },
				m: 5, l: 5, a: 5, b: 5,
				r: "The squeaking stops eventually. The printout is smeared red. You would rather not know."
			}
		]
	},
    {
        id: "call_scam_microsoft",
        title: "Microsoft Support (India)",
        startNode: "root",
        nodes: {
            root: {
                text: "'Hello Sir. This is Windows Support. Your computer has virus. Please install TeamViewer.'\n\nClassic scam.",
                opts: [
                    { t: "Play along & waste his time", next: "troll" },
                    { t: "Bellow at the caller", next: "rage" }
                ]
            },
            troll: {
                text: "You pretend that what you have is not a PC but a microwave. You string him along for 20 minutes.",
                opts: [
                    { t: "He hangs up, furious.", next: "res_fun" }
                ]
            }
        },
        results: {
            res_fun: { txt: "For twenty minutes you have been trying to install remote support on a microwave. He finishes by screaming that you are the stupidest human being alive, and rings off. Rarely has an insult made you so happy.", m: 20, l: 10, a: -10, b: 0 },
            rage: { txt: "You bellow three floors' worth of frustration into the receiver. The scammer hangs up out of boredom - to him you are call 400 today. Your colleagues, on the other hand, adjust their headphones and look extremely busy.", m: 5, l: 0, a: 5, b: 5 }
        }
    },
        {
        id: "call_waiting_hell",
        title: "The Queue",
        text: "You are stuck in the queue at the internet provider. 'Your call is important to us...' for 45 minutes now. The music is making you aggressive.",
        opts: [
            {
                t: "Wait & seethe",
                m: 60, l: 15, a: 20, b: 0,
                r: "After 60 minutes in the queue the other end hangs up. The imprint of your teeth in the edge of the desk is there to stay. As a monument."
            },
            {
                t: "Shout at the receiver",
				rep: { "Dr. Wichtig": -2 },
                m: 5, l: 0, a: 10, b: 10,
                r: "You scream at the phone: 'PICK UP, DAMN IT!' Of all moments, that is when the boss turns into the corridor, slows his step and shakes his head. Not a word. The head shake is enough."
            },
            {
                t: "Use the bubble wrap",
                req: "bubble_wrap",
                m: 45, l: 10, a: -20, b: 0,
                r: "You pop the bubbles in time with the hold music. It makes the horror bearable."
            }
        ]
    },
    {
        id: "call_aluhut_1",
        title: "Mr Tinfoil (Purchasing)",
        text: "A whisper: 'Mr Miller? My mouse is blinking in Morse code! Management is listening in on me! Switch off the microphone in the mouse!'",
        opts: [
            {
                t: "'That is only the sensor.'",
                m: 15, l: -10, a: 20, b: 0,
                r: "He argues about 5G radiation for 15 minutes. You lose the will to live."
            },
            {
                t: "'Countermeasures initiated.'",
                next: "aluhut_trust",
                m: 5, l: 10, a: -5, b: 5,
                r: "He breathes out. 'At last, an ally! Cover name: the Owl.'"
            }
        ]
    },
    {
        id: "call_aluhut_2",
        title: "Mr Tinfoil (Again)",
        reqStory: "aluhut_trust",
        text: "'This is the Owl. The printer... it prints invisible watermarks. I can see them under UV light. They are scanning my thoughts!'",
        opts: [
            {
                t: "'You are out of your mind.'",
                m: 5, l: 0, a: 25, b: 0,
                r: "'So you are one of THEM as well?!' He bellows into the phone. Your ear rings."
            },
            {
                t: "'Tinfoil round your head.'",
                m: 5, l: 20, a: -10, b: 0,
                r: "'Genius! A Faraday cage for the cortex! Thank you. Owl out.' Problem creatively solved."
            }
        ]
    },
    {
        id: "call_erna_1",
        title: "Erna (Reception)",
        text: "'Oh, Mr Miller... I have closed the internet. The window with the blue 'e'. I cannot find my way back.'",
        opts: [
            { 
                t: "Go over and create an icon",
                next: "erna_friend",
                m: 25, l: -15, a: -10, b: -5,
                r: "You walk over. Erna beams: 'You are an angel! Here, have a sweet.'"
            },
            { 
                t: "Take remote control, grudgingly",
                m: 15, l: 0, a: 20, b: 0,
                r: "She does not understand 'double click'. 'I am clicking and nothing happens!' You bite the edge of your desk."
            }
        ]
    },
    {
        id: "call_erna_2",
        title: "Erna (Baking Emergency)",
        reqStory: "erna_friend",
        text: "'Emergency! I wanted to print my recipe, but it says PC LOAD LETTER. I have put the letter in the tray and it will not take it!'",
        opts: [
            { 
                t: "'The printer is on a diet.'",
                m: 5, l: 15, a: -5, b: 5,
                r: "She giggles. 'The rascal!' Nothing is fixed. You have peace and quiet."
            },
            { 
                t: "Explain it patiently",
                m: 10, l: -5, a: 0, b: 0,
                r: "'Ohhhh, I see!' She laughs heartily. Her laugh is infectious."
            }
        ]
    },
    {
        id: "call_time_1",
		// The one event whose speaker is the player himself. His name is the
		// only one in data_chars.js that gets translated, so it cannot be its
		// own key - see src/engine/chars.js.
		char: "PLAYER",
        title: "A Call from the Past",
        text: "Static. 'This is Miller! I am warning myself! Do NOT install the update on Tuesday! Do you hear me?!'",
        opts: [
            { 
                t: "'What year?'",
                next: "time_loop",
                m: 10, l: -5, a: 0, b: 0,
                r: "'2025! Before it all burned! Do not do i...' *Beeep*."
            },
            { 
                t: "Hang up with a 'nutter'",
                m: 2, l: 0, a: 0, b: 0,
                r: "You hang up. Probably Kevin with a voice changer. All the same, you put a small question mark next to Tuesday's update in the calendar. Just in case."
            }
        ]
    },
    {
        id: "call_time_2",
        title: "The Update",
        reqStory: "time_loop",
        text: "Your PC reports: 'Critical update available'. The phone rings again. Silence.",
        opts: [
            { 
                t: "Cancel the update",
                m: 15, l: 0, a: -5, b: -10,
                r: "You cancel. The PC runs stably. The phone stops flashing. Nobody rings, nobody asks — the highest form of praise in this building."
            },
            { 
                t: "Install the update",
                m: 45, l: -20, a: 50, b: 30,
                r: "BLUE SCREEN OF DEATH. Everything crashes! The server room is on fire! You need 45 min for the restore."
            }
        ]
    },
    {
        id: "call_recruit_1",
        title: "Unknown (London)",
        startNode: "root",
        nodes: {
            root: {
                text: "'Good morning Mr Miller! This is John from 'Silicon Valley Stars'. Do you have a moment?'\n\nHe talks extremely fast, and every third word is a noun he has turned into a verb.",
                opts: [
                    { t: "Sorry, no English.", next: "no_english" },
                    { t: "Yes! Get me out of here!", next: "yes_job" },
                    { t: "I love my boss Dr Wichtig.", next: "loyal" }
                ]
            },
            no_english: {
                text: "'Oh, shame. I speak German as well. Do you want more money?'",
                opts: [
                    { t: "Money? Yes.", next: "res_money" }
                ]
            },
            yes_job: {
                text: "'Excellent! Can you hack the Pentagon?'",
                opts: [
                    { t: "Sure, easy.", next: "res_hacker" },
                    { t: "No, I fix printers.", next: "res_printer" }
                ]
            },
            loyal: {
                text: "'Wow. Stockholm syndrome? Okay, bye.' *Click*",
                opts: [
                    { t: "Ah well.", next: "res_nothing" }
                ]
            }
        },
        results: {
            res_money: { txt: "He sends you an offer. You use it in your next salary negotiation.", m: 15, l: 5, a: -5, b: 5 },
            res_hacker: {
                txt: "'Wow. Confidence. We like that.' He promises to be in touch. Afterwards you wonder for a moment who else listens in on conversations like that. Nobody, surely.",
                m: 10, l: 0, a: 10, b: 20,
                next: "fbi_watch"
            },
            res_printer: { txt: "The line is dead before you finish the sentence. Silicon Valley wants visionaries, not people who know where the paper jam sits inside a copier. You would still rather not see their servers.", m: 5, l: -5, a: 5, b: 0 },
            res_nothing: { txt: "'Okay, bye' was the whole of the leaving interview. You stay where you are: underpaid, and at least aware of where the coffee machine stands. Loyalty has its price, and you pay it monthly.", rep: { "Dr. Wichtig": 2 }, m: 5, l: 0, a: -5, b: -5 }
        }
    },
    {
        id: "call_fbi_1",
        reqStory: "fbi_watch",
        title: "Security Authority",
        startNode: "root",
        nodes: {
            root: {
                text: "'Good afternoon. We have been monitoring your call with 'John'. Are you really planning an attack on the Pentagon?'\n\nThe voice is cold and mechanical.",
                opts: [
                    { t: "That was a joke!", next: "joke" },
                    { t: "Hang up & eat the SIM card", next: "paranoid" }
                ]
            }
        },
        results: {
            joke: { txt: "'Humour. I see. They all say that.' The line clicks twice, then the call is over. From midday on, every web page loads noticeably slower. That could be coincidence. It does not feel like coincidence.", m: 20, l: -10, a: 20, b: 0 },
            paranoid: { txt: "The SIM card tastes of electronics and bad decisions. There is no evidence left, but there is a crunch as you chew and the realisation that panic is a poor adviser. The landline still works, by the way.", m: 5, l: -20, a: 50, b: 0 }
        }
    },
    {
        id: "call_pizza_wrong",
        title: "Luigi's Pizza",
        startNode: "root",
        nodes: {
            root: {
                text: "'Hello? I am downstairs. 15 'Quattro Stagioni' pizzas for IT? The lift is broken, can you come down?'\n\nYou have not ordered anything. But you can smell it from up here.",
                opts: [
                    { t: "'Wrong number.'", next: "res_honest" },
                    { t: "Shout 'On my way!' and grab the pizzas", next: "steal_pizza" }
                ]
            },
            steal_pizza: {
                text: "You hurry downstairs. The delivery man is stressed. 'Here you go, €150. Already paid by PayPal.'",
                opts: [
                    { t: "Take the pizzas & run", next: "res_food_coma" }
                ]
            }
        },
        results: {
            res_honest: { txt: "The delivery man swears and goes away again. Your stomach rumbles.", m: 2, l: 0, a: 5, b: 0 },
            res_food_coma: {
                txt: "You hand the pizzas round the office. You are the hero. But after 4 slices you slip into a food coma.",
                m: 45, l: 20, a: -20, b: -10
            }
        }
    },
    {
        id: "call_pw_reset_grind",
        title: "Password Amnesia",
        text: "Ms Jablonski from Purchasing. 'My password doesn't work any more! It was working yesterday! I did NOTHING!'",
        opts: [
            {
                t: "'Try pressing the key above Shift.'",
                m: 5, l: -5, a: 5, b: 0,
                r: "'Oh! The little light has gone out! Now it works!' She thanks you at length. A small victory over stupidity."
            },
            {
                t: "Reset it by hand & spell it out",
                m: 10, l: -10, a: 10, b: -5,
                r: "You reset it to 'Start123!' and spell it out to her three times. 'Capital S for sugar...' It is excruciatingly dull, and it is productive."
            },
            {
                t: "'Use the self-service portal.'",
                m: 2, l: 5, a: -5, b: 5,
                r: "'But that is so complicated!' You email her the link and simply hang up. You kept your calm, and you were lazy."
            }
        ]
    },
    {
        id: "call_excel_hell",
        title: "Cell Terror",
        text: "Wuttke from Financial Control. 'Now look here, my VLOOKUP formula returns #N/A. The system is broken! The database is down! Repair it!'",
        opts: [
            {
                t: "'The server is just restarting.'",
                m: 2, l: 5, a: -5, b: 0,
                r: "'Ah, I see! Then I shall wait.' He hangs up, satisfied. Nothing has been done and quiet has been bought."
            },
            {
                t: "'You are searching the wrong column.'",
                m: 15, l: -15, a: 15, b: -5,
                r: "You have to explain Excel to him. Over the phone. It drags on like a year-end close. He barely follows any of it. Your brain cells die off one by one; the problem, however, is solved."
            },
            {
                t: "'That is user error.'",
				rep: { "Dr. Wichtig": -2 },
                m: 2, l: 5, a: 5, b: 10,
                r: "Wuttke snorts: 'And this is what we pay you for?!' Then the line is dead. The boss will be asking before long why Financial Control is having 'technical problems'."
            }
        ]
    },
    {
        id: "call_nato_1",
        title: "The Alphabet of Horror",
        startNode: "root",
        nodes: {
            "root": {
                text: "Ms Jablonski has to spell a temporary password out to you. 'Right, the password is: A for... apple. C for... Ceylon? Or Z? No, hold on, C for chameleon!'\n\nYou can feel yourself losing valuable years of your life, slowly but surely.",
                opts: [
                    { t: "'Do you mean C for Charlie?'", next: "nato_c" },
                    { t: "'Just read me the whole word.'", next: "nato_word" }
                ]
            },
            "nato_c": {
                text: "She snorts. 'Charlie? There is no C in Charlie, that is a CH! Never mind. Next letter: Y for... Y. And then Q for... quark.'",
                opts: [
                    { t: "Recite the actual NATO alphabet", next: "res_nato_teach" },
                    { t: "Bear the pain and listen", next: "res_nato_suffer" }
                ]
            },
            "nato_word": {
                text: "'The whole word? It is not a word. It is: A, C, Y, Q, 7, special character. But hold on, the Y could be a V. My handwriting is dreadful.'",
                opts: [
                    { t: "Just reset the password outright", req: "admin_pw", next: "res_nato_reset" },
                    { t: "Hang up and weep", next: "res_nato_hangup" }
                ]
            }
        },
        results: {
            "res_nato_teach": { txt: "You spend 10 minutes explaining 'Alpha, Bravo, Charlie'. At the end she calls you a smart arse. But the password is right.", m: 15, l: -5, a: 15, b: -5 },
            "res_nato_suffer": { txt: "After a full 20 minutes you have the 8-character password assembled. Your temper is through the roof, your will is broken.", m: 20, l: -5, a: 30, b: -10 },
            "res_nato_reset": { txt: "You irritably reset it to 'Welcome123!' by master override. No time for this alphabet soup.", m: 5, l: 10, a: 5, b: -5 },
            "res_nato_hangup": { txt: "You hang up without another word. You cannot do this today. The ticket stays open and is guaranteed to escalate later.", m: 2, l: 10, a: 0, b: 15 }
        }
    },
    {
        id: "call_any_key_1",
        title: "The Mysterious Key",
        text: "A desperate call from Management. 'Miller! My update has hung! The system is completely blocked. It says: PRESS ANY KEY TO CONTINUE.\n\nI have tried the CTRL key, the ALT key, I have even pressed F12! WHERE THE HELL IS THIS ANY KEY?!'",
        opts: [
            {
                t: "'Just press the space bar.'",
                m: 5, l: 0, a: 15, b: -5,
                r: "You hear a loud slap (he brings the flat of his hand down on the space bar). 'Oh. It has moved on. Why do they not just write that, then?!' Another stupid ticket closed with distinction."
            },
            {
                t: "'You will have to order one first.'",
                m: 5, l: 10, a: -10, b: 20,
                r: "He gasps for air. 'What a shambles of a firm! Order a keyboard with an Any key immediately! Priority shipping!' You have just burned €100 of budget on a joke. The boss will weep."
            },
            {
                t: "'I will press Enter for you.'",
                m: 5, l: 5, a: 20, b: -10,
                r: "You use the remote session, press the Enter key ONCE on your own keyboard and close the connection. You have relieved a highly paid executive of the burden of pressing a key. Sad, but maximally efficient."
            }
        ]
    },
    {
        id: "call_physical_window_1",
        title: "A Draught in the System",
        startNode: "root",
        nodes: {
            "root": {
                text: "Ms Schulze rings: 'Mr Miller, my PC is extremely slow. And these little advert pictures keep popping up!'\n\nOne look at the remote session and you have it. Too many browser tabs open.",
                opts: [
                    { t: "'Could you close all the windows, please.'", next: "window_closed" },
                    { t: "Start the remote session without a word", next: "res_remote_fix" }
                ]
            },
            "window_closed": {
                text: "You hear her put the receiver down. Squeaking and banging in the background. Then she picks the receiver up again.\n\n'Right, all done! But it is getting terribly stuffy in here now. Does the fresh air really help against viruses?'",
                opts: [
                    { t: "'I meant on the COMPUTER!'", next: "res_facepalm" },
                    { t: "'Yes, that keeps the viruses out.'", next: "res_troll_window" }
                ]
            }
        },
        results: {
            "res_remote_fix": { txt: "You click the 50 open browser windows shut over the remote session. The PC runs again. You have spared yourself a spectacularly stupid conversation and closed the ticket professionally.", m: 5, l: -5, a: 5, b: -5 },
            "res_facepalm": { txt: "You have to labour through the difference between glass windows and digital ones. Brain cells perish; the support, however, was exemplary.", m: 15, l: 0, a: 20, b: -5 },
            "res_troll_window": { txt: "Ms Schulze is now sweating in her own office. The PC is still just as slow, but she has stopped complaining. Unprofessional, and quiet.", m: 5, l: 10, a: -5, b: 5 }
        }
    },
    {
        id: "call_markus_ambush_1",
		char: "Markus",
        title: "Ambush on Speakerphone",
        text: "You answer. Instead of a greeting you get Markus's loud, extremely friendly 'sales voice', with a slight echo on it. He has put you on speakerphone!\n\n'Ah, and here is our Head of IT, Mr Miller! Mr Miller, would you just confirm for Mr Tanaka of the major bank: our new database can render incoming faxes as a 3D hologram in real time, via blockchain, absolutely correct?'\n\nDead silence in the meeting room. You can hear the investors breathing.",
        opts: [
            {
                t: "'Naturally! Runs extremely agile!'",
                rep: { "Markus": 5, "Dr. Wichtig": 5 },
                m: 5, l: -5, a: 20, b: -10,
                r: "Markus crows: 'You see, Mr Tanaka? German engineering!' The deal is in the bag. Markus and the boss adore you. Your problem: by tomorrow morning you have to program a fax hologram. The sack moves closer."
            },
            {
                t: "The truth: 'That is a physical impossibility.'",
                rep: { "Markus": -10, "Dr. Wichtig": -10 },
                m: 10, l: 0, a: -10, b: 30,
                r: "Murmuring down the line. Mr Tanaka clears his throat. 'We shall... reconsider our investment.' Markus lets out a roar. You have killed a million-euro deal. You have also spared IT an impossible job."
            },
            {
                t: "'Premium tier only. 5 million extra budget.'",
                rep: { "Markus": 5 },
                m: 5, l: 5, a: 0, b: -5,
                r: "Markus swallows hard. Mr Tanaka laughs: 'Ah, good upselling! We shall stay with the standard package.' You have saved the deal and steered the IT department elegantly out of the firing line. Chapeau!"
            }
        ]
    },
    {
        id: "call_chantal_hostage_1",
		char: "Chantal",
        title: "SOS from the Meeting",
        text: "Chantal rings. She whispers in a panic: 'Miller... save me. I've been in a 1-on-1 with the Agile Coach for 40 minutes. He talks non-stop about his spirit animal and he's lighting an incense stick right now. I'm dying.\n\nSet the fire alarm off, or ring me on my mobile and say the marketing server's on fire!'",
        opts: [
            {
                t: "Set off the fire alarm",
                req: "hammer",
                rep: { "Chantal": 10, "Dr. Wichtig": -10 },
                m: 30, l: -10, a: 10, b: 30,
                r: "You go all in and smash the call point in the corridor. The siren wails. The whole building is evacuated. Chantal is free, but the fire brigade bills the IT department a false alarm charge. Massively overdone."
            },
            {
                t: "'Your spirit animal is a sloth. Have fun.'",
                rep: { "Chantal": -10 },
                m: 5, l: 5, a: -10, b: 0,
                r: "You hang up, grinning. Chantal is trapped. Your schadenfreude knows no bounds, but do not expect a smile from her tomorrow morning."
            },
            {
                t: "Stage a fake call",
                rep: { "Chantal": 5 },
                m: 10, l: 0, a: 5, b: 0,
                r: "You ring her mobile and bellow dramatically: 'Total outage! We need you!'. Chantal storms out of the room with a loud 'Sorry, emergency!'. She owes you an enormous favour."
            }
        ]
    },
    {
        id: "call_boss_laser_1",
		char: "Dr. Wichtig",
        title: "Presentation Panic",
        text: "Dr Wichtig bellows into the phone: 'Miller! My mouse pointer has gone! I move the device across the table but absolutely NOTHING happens up on the screen! The investors are waiting!\n\nI have already changed the batteries and the red light is on, but the arrow on the slide is frozen solid!'",
        opts: [
            {
                t: "'Boss, might you be holding the laser pointer?'",
                rep: { "Dr. Wichtig": 2 },
                m: 5, l: 0, a: 10, b: -10,
                r: "Two seconds of silence. A quiet clatter as he swaps devices. '...this stays between us, Miller.' He hangs up. An embarrassing ticket, solved with extreme discretion. He will remember that you said nothing. You will remember the rest."
            },
            {
                t: "'Do a hard restart of the machine right now!'",
                rep: { "Dr. Wichtig": -10 },
                m: 5, l: 0, a: 0, b: 40,
                r: "TRAP! He presses the power button. The PC goes off – and the unsaved 45-minute presentation goes with it. He curses the 'unstable IT' in front of the investors. You take the full broadside!"
            },
            {
                t: "'I will connect in and move the mouse for you.'",
                rep: { "Dr. Wichtig": 5 },
                m: 30, l: -10, a: 35, b: -20,
                r: "For the next 30 minutes you have to guess blind when he wants the next slide. 'MILLER, CLICK NOW!' It is pure psychological torture for you, but the pitch lands and the boss is satisfied."
            }
        ]
    },
    {
        id: "call_elster_budget_trap_1",
		char: "Frau Elster",
        title: "Deadline Expired",
        text: "Ms Elster sounds ice-cold: 'Miller, your request for the new servers (€15,000) is refused. Your digital certificate for the signature expired today at 08:00.\n\nThe annual budget lapses in exactly 10 minutes. Submit a new request through the official portal.'\n\nYou know perfectly well: the portal takes 3 working days to approve. Your servers are gone.",
        opts: [
            {
                t: "I will approve it in the system myself, remotely.",
                req: "admin_pw",
                rep: { "Frau Elster": -20 },
                m: 5, l: 5, a: 5, b: 20,
                r: "You hack the accounts system and set the status to 'Approved'. The servers are ordered. Ms Elster reports this massive compliance breach to the board immediately."
            },
            {
                t: "'No new servers then.'",
                rep: { "Frau Elster": 5 },
                m: 5, l: 10, a: 10, b: -5,
                r: "'Rules are rules,' she says, satisfied. You lean back. Next year the company will collapse under the old hardware, but today you have no more stress."
            },
            {
                t: "I will run down and sign it physically, in blood!",
                m: 20, l: -10, a: 25, b: -5,
                r: "You sprint up the stairs to the 2nd floor, snatch the paper out of her hand and sign it by hand. The budget is saved with a second to spare. Your lungs are burning."
            }
        ]
    },
    {
        id: "call_egon_cooling_trap_1",
		char: "Egon",
        title: "Pressure Drop",
        text: "Egon bellows over the roar of water: 'Miller! The main valve on the server water cooling in the cellar has split! A thick jet is shooting right across the room straight at the high-voltage distribution box!\n\nI've got to shut the water off NOW or the place burns down! But if I do, your servers overheat and drop in 3 minutes! Shut it off or leave it on?!'",
        opts: [
            {
                t: "Shut it off! Building and lives before hardware!",
                rep: { "Egon": 10, "Dr. Wichtig": -20 },
                m: 10, l: 0, a: 15, b: 50,
                r: "The roar stops. Every alarm in the monitoring starts beeping at once. The servers die a sudden heat death. Egon praises your priorities, but the boss wants your head on a silver platter over the data loss."
            },
            {
                t: "Leave it on! I have to shut the system down by hand first!",
                rep: { "Egon": -10 },
                m: 45, l: -20, a: 40, b: -10,
                r: "You race into the server room and panic-shut 40 machines down one at a time, while Egon stands below in mortal fear of electrocution. You come out drenched in sweat and shaking. The data is safe."
            },
            {
                t: "Wrap duct tape round it! I need that cooling!",
                req: "tape",
                rep: { "Egon": -15 },
                m: 5, l: 10, a: -5, b: 30,
                r: "Egon swears: 'That won't hold five minutes at this pressure!' It holds exactly four. Then there is a loud bang, a shower of sparks, and the whole building has no power. Total disaster."
            }
        ]
    },
    {
        id: "call_gabi_gossip_1",
		char: "Gabi",
        title: "Diplomatic Crisis",
        text: "Gabi whispers excitedly: 'Miller! Your stupid firewall is blocking 'Celeb-Gossip24.de'! I need it NOW!\n\nThe wife of the supervisory board chairman is about to be standing right here. I've got to know whether her dog's died or whether she's getting divorced! Otherwise I'll put my foot in it during the small talk and we're both for it!\n\nUnblock the site! Just for 10 minutes!'",
        opts: [
            {
                t: "'Give me the name, I'll google it on my mobile for you.'",
                rep: { "Gabi": 5 },
                m: 15, l: -5, a: 20, b: -5,
                r: "You sit at your desk reading gossip articles about C-list celebrities on your private mobile and dictating the details to Gabi. Your dignity drops to zero, but you have averted the crisis without breaking a single rule."
            },
            {
                t: "'Gossip sites stay blocked, Gabi.'",
                rep: { "Gabi": -15, "Dr. Wichtig": -10 },
                m: 5, l: 0, a: 5, b: 20,
                r: "Gabi swears quietly and hangs up. Ten minutes later she asks the VIP's wife after her husband. The woman is going through a divorce and storms out in tears. The boss holds YOU responsible for the PR disaster."
            },
            {
                t: "'All right, I'll put you on the whitelist.'",
                rep: { "Gabi": 15 },
                m: 10, l: 10, a: 0, b: 30,
                r: "Gabi reads the article and handles the small talk brilliantly. But you have opened the firewall to an insecure ad network. The IT security audit that afternoon raises the alarm. You are done for."
            }
        ]
    },
    {
        id: "call_domain_1",
        title: "Hostmaster Support",
        text: "A dull computer voice comes on: 'Good afternoon. The company domain globalcorp.de expires in 10 minutes. The credit card held on file for your management is invalid. Would you like to settle €1,500 now, or shall we release the domain for public sale?'",
        opts: [
            {
                t: "Key in the Black Card number",
                req: "black_card",
                next: "path_domain_blackcard",
                m: 5, l: 5, a: -10, b: 0,
                r: "You key in the digits of your offshore card. *BEEP*. 'Payment authorised,' says the voice. The domain is safe and it has not cost you a penny."
            },
            {
                t: "Ring the provider yourself & argue it out",
                next: "path_domain_fight",
                m: 45, l: -10, a: 20, b: 0,
                r: "You hang on the line for 45 minutes and work your way through three managers. They grant a 24-hour deferral of payment. It leaves you completely wrung out. The domain stays."
            },
            {
                t: "'Then it is gone, I suppose.'",
                next: "path_domain_lost",
                m: 2, l: 10, a: 0, b: 20,
                r: "You put the receiver down. Who needs email anyway? Let them go back to faxing."
            }
        ]
    },
    {
        id: "call_domain_2a",
        title: "Fraud Department",
        reqStory: "path_domain_blackcard",
        text: "The phone rings shrilly. 'Good afternoon, this is fraud protection at the Royal Bank of Zamunda. We see a charge of €1,500 for a German domain on the card of HRH Prince Abubakar. Are you authorised?'",
        opts: [
            {
                t: "Hang up in a panic",
                m: 2, l: 5, a: 10, b: 0,
                r: "You put the phone down, slightly too fast and slightly too hard. Your pulse takes a while to come back down to office speed. Can people like that trace an IP address? The domain is paid for. The rest is somebody else's department."
            },
            {
                t: "'This is money-laundering concealment!'",
                m: 5, l: 0, a: -5, b: 0,
                r: "For a moment there is nothing but line noise. Then: 'Ah. Very clever. Interpol looks for yachts, not for server domains. We shall approve it.' *Click*. You let out a long breath."
            }
        ]
    },
    {
        id: "call_domain_2b",
        title: "The Provider Rings Back",
        reqStory: "path_domain_fight",
        text: "A real member of staff is on the line: 'We have reviewed your deferral of payment. There is a €50 handling fee for that, though. Shall I put it on the next invoice?'",
        opts: [
            {
                t: "Agree",
                m: 5, l: 0, a: 5, b: 5,
                r: "The €50 stings, but the company stays online. You have bought yourself time."
            },
            {
                t: "Refuse & shout",
                m: 5, l: 0, a: 15, b: 10,
                r: "You pick a fight with her. She cancels the deferral. Domain gone. That was very stupid."
            }
        ]
    },
    {
        id: "call_domain_2c",
        char: "Dr. Wichtig",
        title: "Dr. Wichtig (From the Car)",
        reqStory: "path_domain_lost",
        text: "The boss bellows through his car's hands-free: 'MILLER! Why does our company website suddenly redirect to a Thai online casino?! And why am I getting mail from @globalcorp-casino.net?! WHAT IS GOING ON?!'",
        opts: [
            {
                t: "'The company card had expired!'",
                rep: { "Dr. Wichtig": -10 },
                m: 10, l: 0, a: 10, b: 30,
                r: "'You should have warned me!' he roars. Buying the domain back off the domain pirates now costs the company €50,000. You are on the list."
            },
            {
                t: "'Boss, that is affiliate marketing!'",
                rep: { "Dr. Wichtig": 5 },
                m: 15, l: 10, a: -10, b: -5,
                r: "'I beg your pardon?' - 'Yes, we have 400% more clicks and we earn on every casino visitor!' He thinks for a second. 'Hm. That... leave it like that for now. Good initiative.'"
            }
        ]
    },
    {
        id: "call_fridge_1",
        title: "Fridge 'Coolio 3000'",
        text: "A call from an internal extension. You pick up. A tinny robot voice announces: 'BEEP. THIS IS THE FRIDGE IN THE KITCHENETTE. MILK SENSOR REPORTS: EMPTY. PLEASE SPEAK WI-FI PASSWORD FOR AMAZON ORDER.'",
        opts: [
            {
                t: "'Forget it, tin can.'",
                next: "path_fridge_angry",
                m: 2, l: 5, a: -5, b: 5,
                r: "You laugh into the phone and hang up. 'A fridge that rings people. Course it is.' Another wind-up from the apprentice, most likely."
            },
            {
                t: "Read the password off the Wi-Fi note",
                rem: "wifi_note",
                next: "path_fridge_wifi",
                m: 5, l: 0, a: 5, b: 0,
                r: "You read the password off your yellow note. 'BEEP. ACCESS GRANTED.' Machines are far friendlier than colleagues."
            },
            {
                t: "Go over in person & clean the sensors",
                next: "path_fridge_clean",
                m: 20, l: -10, a: 10, b: 0,
                r: "You laboriously clean the sensors inside the fridge. It was not empty at all, there was yoghurt stuck on the lens. It stops ringing."
            }
        ]
    },
    {
        id: "call_fridge_2a",
        char: "Egon",
        title: "Egon the Caretaker",
        reqStory: "path_fridge_wifi",
        text: "'Miller! Get yourself down to Reception!' Egon is swearing loudly in the background. 'There are five pallets of long-life milk standing here! The haulier says the fridge ordered it! On express delivery! Who gave that thing the internet?!'",
        opts: [
            {
                t: "'Hand it out to everybody!'",
                rep: { "Egon": -5 },
                m: 10, l: -5, a: -10, b: 10,
                r: "You declare a 'Milk Monday'. Everybody drinks cocoa. The boss is furious about the invoice, but the rest of the team is delighted."
            },
            {
                t: "'This must be a hacker attack!'",
                m: 5, l: 0, a: 10, b: 15,
                r: "You pin it on cyber criminals from North Korea. That sets off an embarrassing internal audit, but you personally come out of it clean."
            }
        ]
    },
    {
        id: "call_fridge_2b",
        title: "The Cleaning Fiend",
        reqStory: "path_fridge_clean",
        text: "Ms Elster rings. 'Miller, thank you for cleaning the fridge. Unfortunately you threw out my vegan soya strips while you were at it. They were NOT off, that was the fermentation!'",
        opts: [
            {
                t: "'It looked like mould!'",
                rep: { "Frau Elster": -5 },
                m: 5, l: 0, a: 5, b: 0,
                r: "'Philistine! That was noble mould!' She takes offence and hangs up."
            },
            {
                t: "'The sensors had it on the red list.'",
                m: 5, l: 0, a: 0, b: 0,
                r: "You pin it on the machine. Ms Elster sighs. 'Technology, always.' She blames the AI rather than you."
            }
        ]
    },
    {
        id: "call_fridge_2c",
        char: "Dr. Wichtig",
        title: "The Boss Is Hungry",
        reqStory: "path_fridge_angry",
        text: "'Miller?!' The boss manages to sound tearful and furious at once. 'Somebody has set the fridge to minus 20 degrees! My salmon carpaccio is a solid block of ice! The machine says: EMERGENCY MODE DUE TO OFFLINE. Fix this!'",
        opts: [
            {
                t: "'Put it in the microwave.'",
                rep: { "Dr. Wichtig": -10 },
                m: 5, l: 5, a: 10, b: 15,
                r: "The boss draws a long breath. 'You want me to put fifty-euro salmon in the MICROWAVE?!' He hangs up. He will not forgive you for that one."
            },
            {
                t: "Go over & 'reset' it with the hammer",
                req: "hammer",
                rep: { "Dr. Wichtig": 5 },
                m: 10, l: 0, a: -20, b: 10,
                r: "You take the hammer and smash the smart display. The thing beeps sadly and slowly defrosts. 'A little brutal, Miller, but effective,' the boss says approvingly."
            }
        ]
    },
    {
        id: "call_chantal_breakdown_1",
		char: "Chantal",
        title: "Marketing Emergency",
        text: "Chantal is hyperventilating down the phone. '*gasp* Miller! I'm cracking under this pressure! My new Insta post has only had two likes in 10 minutes! My life is over! I need something to calm me down right now or I'm handing in my notice! MILLER!'",
        opts: [
            {
                t: "'Breathe into a paper bag!'",
                next: "path_chantal_ignored",
                rep: { "Chantal": -10 },
                m: 5, l: 0, a: 5, b: 0,
                r: "'A PAPER BAG?! THAT WOULD RUIN MY MAKE-UP!' She shrieks and slams the receiver down."
            },
            {
                t: "Take her the bubble wrap to pop",
                rem: "bubble_wrap",
                next: "path_chantal_bubbles",
                rep: { "Chantal": 10 },
                m: 10, l: -5, a: -15, b: 0,
                r: "You run upstairs and press the bubble wrap into her hand without a word. *Pop... Pop...* She closes her eyes. Her breathing settles. You are a psychological genius."
            },
            {
                t: "Listen patiently & talk her down",
                next: "path_chantal_listen",
                rep: { "Chantal": 10 },
                m: 45, l: 10, a: 20, b: -5,
                r: "You spend 45 minutes hearing how hard life is as a content creator."
            }
        ]
    },
    {
        id: "call_chantal_breakdown_2a",
		char: "Chantal",
        title: "The New Addiction",
        reqStory: "path_chantal_bubbles",
        text: "Chantal whispers into the phone. She sounds shaky. 'Miller... have you... have you got any more of that popping stuff? I've been through the whole roll already. I need more pop. Please! Where do you get it?'",
        opts: [
            {
                t: "'There are more boxes in the server room.'",
                rep: { "Chantal": 10, "Dr. Wichtig": 5 },
                m: 10, l: 10, a: -10, b: -5,
                r: "She spends half the afternoon in the server room, popping. The boss takes it for a 'hardware stress test' and praises your cross-departmental synergy."
            },
            {
                t: "'That was costly IT-grade wrap. All gone.'",
                m: 5, l: 0, a: 0, b: 0,
                r: "She groans in disappointment, but she accepts it. You have put her on cold turkey without her noticing."
            }
        ]
    },
    {
        id: "call_chantal_breakdown_2b",
		char: "Chantal",
        title: "The Counsellor's Bill",
        reqStory: "path_chantal_listen",
        text: "Chantal rings again. 'Miller! You're such a good listener! I've booked you into our weekly 2-hour call, 'Emotional Sync'. First session is now!'",
        opts: [
            {
                t: "Give in to the drama - anything beats work",
                m: 120, l: 40, a: 10, b: 20,
                r: "For two hours you take in marketing dramas with your feet on the desk. It would be almost restful if you did not know that the boss is already hunting for you through the whole building."
            },
            {
                t: "'I'm IT, not a therapist!'",
                rep: { "Chantal": -10 },
                m: 5, l: 0, a: 10, b: 0,
                r: "'You're exactly like the rest of them!' she sobs. The friendship is hereby officially over again."
            }
        ]
    },
    {
        id: "call_chantal_breakdown_2c",
		char: "Chantal",
        title: "The Complaint",
        reqStory: "path_chantal_ignored",
        text: "The phone rings. It is Sabine from HR. 'Mr Miller, Ms Chantal is sitting here in tears. She says that during a panic attack you advised her to breathe into a paper bag. She does not feel she is being taken seriously.'",
        opts: [
            {
                t: "'I'll take her a sandwich right away.'",
                rem: "sandwich",
                rep: { "Chantal": 10 },
                m: 15, l: -5, a: -5, b: -10,
                r: "You eat humble pie and sacrifice your own lunch. Chantal accepts it mid-chew. 'Fine. But next time you're more sensitive!' The HR complaint is dropped."
            },
            {
                t: "'That is medically correct!'",
                m: 10, l: 0, a: 10, b: 10,
                r: "HR does not entirely believe you, but they cannot prove otherwise. The matter goes quietly into the file, and you have made no friends today."
            }
        ]
    },
    {
        id: "call_workout_2b",
        title: "The Paramedics",
        reqStory: "path_workout_panic",
        startNode: "root",
        nodes: {
            "root": {
                text: "Sabine from HR is on the line. 'Mr Miller, about your 'false alarm' earlier. The paramedics were standing in the office and knocked over Chantal's aura crystals. The call-out costs €500. Who is paying for that?'",
                opts: [
                    { t: "Insist it was workplace safety!", next: "work_safety" },
                    { t: "'I was hacked from outside!'", next: "lie_hack" }
                ]
            },
            "work_safety": {
                text: "She sighs deeply. 'Fine. It probably did look like a seizure. We will book it as a workplace accident. But please never call out a doctor unasked again.'",
                opts: [
                    { t: "Understood.", next: "res_safe" }
                ]
            },
            "lie_hack": {
                text: "Sabine goes quiet. 'You are claiming that a Russian hacker dialled 112 from your extension? Miller, this will have consequences.'",
                opts: [
                    { t: "Hang up.", next: "res_fail" }
                ]
            }
        },
        results: {
            "res_safe": { txt: "It costs you nothing in the end. HR merely hates you a little more than it did this morning.", m: 10, l: 0, a: 5, b: 10 },
            "res_fail": { txt: "That was an extremely stupid excuse, and both of you know it. The boss says nothing further. He simply files it away - somewhere prominent.", m: 5, l: 0, a: 10, b: 25 }
        }
    },
    {
        id: "call_dance_2c",
        title: "The Production Company",
        reqStory: "path_dance_donut",
        startNode: "root",
        nodes: {
            "root": {
                text: "A strange, very angry voice on the phone. 'You are through to the production company for the investor stream! Somebody pressed baked goods onto our €8,000 Sony camera earlier! The lens is full of icing!'",
                opts: [
                    { t: "Hang up.", next: "hangup_cam" },
                    { t: "'That was a fault in the 5G network.'", next: "lie_cam" }
                ]
            },
            "hangup_cam": {
                text: "You simply hang up. Ten minutes later the boss receives the invoice and starts looking for the culprit.",
                opts: [
                    { t: "Phew.", next: "res_hangup" }
                ]
            },
            "lie_cam": {
                text: "The man on the phone is breathing heavily. 'A 5G fault... that leaves chocolate sprinkles on the lens? Are you taking the mickey?!'",
                opts: [
                    { t: "Yes.", next: "res_lie" }
                ]
            }
        },
        results: {
            "res_hangup": { txt: "Ten minutes later the €8,000 invoice is on the boss's desk, marked 'Party responsible unknown'. The search radius is small. You work very visibly and very inconspicuously from that moment on.", m: 2, l: 0, a: -5, b: 20 },
            "res_lie": { txt: "'5G' was evidently the wrong word. He hangs up at a volume you can feel through the receiver. He does not have your name. That can change.", m: 5, l: 0, a: 5, b: 15 }
        }
    },
    {
        id: "call_awkward_2c",
        title: "HR (Sabine)",
        reqStory: "path_awkward_elster",
        startNode: "root",
        nodes: {
            "root": {
                text: "Sabine from HR rings. She sounds extremely formal. 'Mr Miller. We have a... complaint from Ms Elster on file. It concerns inappropriate conduct in the workplace with regard to apprentices.'",
                opts: [
                    { t: "'His jumper was caught in the fan!'", next: "hr_explain" },
                    { t: "'That is slander!'", next: "hr_deny" }
                ]
            },
            "hr_explain": {
                text: "Sabine is quiet for a moment. 'A jumper... in the fan. Do you know how that sounds? We are booking you and Kevin onto the seminar 'Professional Distance in the Office', as a precaution.'",
                opts: [
                    { t: "Sigh and agree", next: "res_hr_seminar" }
                ]
            },
            "hr_deny": {
                text: "'Ms Elster saw it with her own eyes, Miller! I am recording: no insight shown. This goes to Dr Wichtig.'",
                opts: [
                    { t: "Damn.", next: "res_hr_boss" }
                ]
            }
        },
        results: {
            "res_hr_seminar": { txt: "Four hours of seminar lie ahead of you, with an attendance list. Your name is already on it, added by hand.", m: 15, l: 0, a: 10, b: 20 },
            "res_hr_boss": { txt: "The boss will not find this funny. The rumours become a file note.", m: 5, l: 0, a: 10, b: 30 }
        }
    },
    {
        id: "call_ergonomic_mouse_1",
        title: "Herr Wuttke (Accounts)",
        startNode: "root",
        nodes: {
            "root": {
                text: "Wuttke sounds irritated: 'Mr IT! This new upright ergonomic mouse you left on my desk is a complete design failure! It sits horribly in the hand, the red laser dazzles me and the pointer does not move a millimetre! And every time I click, it goes *BEEP* unbelievably loudly!'",
                opts: [
                    { t: "'That is the barcode scanner for Stores.'", next: "wuttke_truth" },
                    { t: "'It is still calibrating. Scan the coffee packet.'", next: "wuttke_troll" }
                ]
            },
            "wuttke_truth": {
                text: "First the line goes quiet, then there is a soft rustling. 'Oh. That... explains the shape. And the cable. I shall put it back in its box, then. Forget that I rang.'",
                opts: [
                    { t: "Sigh and hang up.", next: "res_wuttke_solved" }
                ]
            },
            "wuttke_troll": {
                text: "You hear a loud *BEEP*. Wuttke: 'Ah! The little light flashed! And now?'",
                opts: [
                    { t: "'Now scan the hole punch.'", next: "wuttke_troll_deep" },
                    { t: "'That was a joke, Wuttke. It is a scanner.'", next: "res_wuttke_mad" }
                ]
            },
            "wuttke_troll_deep": {
                text: "Another *BEEP*. Wuttke now sounds delighted: 'Incredible, this modern technology! The mouse is getting to know my surroundings! Shall I do the monitor as well...?'",
                opts: [
                    { t: "Stifle the laugh and hang up.", next: "res_wuttke_fun" }
                ]
            }
        },
        results: {
            "res_wuttke_solved": {
                txt: "An everyday, noiseless victory for IT. You lean back contentedly and take an unhurried sip of coffee.",
                m: 5, l: 5, a: -5, b: 0
            },
            "res_wuttke_mad": {
                txt: "Wuttke snorts in fury: 'I will not be made a fool of here!' There is a clatter as the receiver hits the cradle. An official complaint is more or less guaranteed, and the fun was absolutely worth it.",
                m: 5, l: 0, a: -5, b: 20
            },
            "res_wuttke_fun": {
                txt: "You hear a third *BEEP* in the background before you quietly hang up. Wuttke is probably scanning his hole-punch confetti. You have to wipe a tear of laughter off your face.",
                m: 10, l: 10, a: -15, b: 5
            }
        }
    },


/* ============================================================
   CALL WAVE (v4.0.0)
   Two new base calls (Markus live at a customer site as a node
   conversation, the provider hold queue) plus follow-ups for
   nine paths retrofitted into the existing calls call_junior,
   call_boss_tunnel, call_elster_excel and call_phish. 71 per
   cent of the call pool were dead ends - this is where that
   starts to end.
   ============================================================ */

{
    id: "call_markus_demo",
    char: "Markus",
    title: "Markus (Whisper Mode)",
    startNode: "root",
    nodes: {
        root: {
            text: "Markus, whispering, meeting-room murmur behind him: 'Miller. EMERGENCY. I am standing at the client's, the projector is running, and the demo system says PASSWORD EXPIRED. Twelve people are looking at me. What do I press?!'",
            opts: [
                { t: "'Calm down. I will reset it remotely.'", next: "remote" },
                { t: "'Which demo system exactly?'", next: "welches" }
            ]
        },
        remote: {
            text: "You log in. Nobody has touched the demo system in eight months: 47 updates pending, certificate expired. 'Markus, buy me two minutes.' You hear him announce to the room: 'Let us use the time for QUESTIONS!'",
            opts: [
                { t: "Fix the login only, ignore the rest", next: "res_quickfix" },
                { t: "Spend the two minutes doing it properly", next: "res_repair" }
            ]
        },
        welches: {
            text: "'THE demo! The one with the bars! The BLUE bars!' There are four systems with blue bars. In the background somebody asks audibly whether this is going to take much longer.",
            opts: [
                { t: "Unlock all four demo systems at once", next: "res_shotgun" },
                { t: "Patiently let him describe the window", next: "res_describe" }
            ]
        }
    },
    results: {
        res_quickfix: {
            txt: "The login works, the demo starts, the client nods. The system behind it is still eight months old and unpatched - but that is a problem for another day. Hopefully a very distant one.",
            m: 10, l: 5, a: 5, b: 0,
            next: "path_demo_quick"
        },
        res_repair: {
            txt: "New login, critical patches on, certificate renewed - in two minutes and forty seconds. Markus bridges the gap with an anecdote about golf. The demo then runs like silk. He will never forget this. Really never. That could become tiring.",
            m: 15, l: -5, a: 5, b: 0,
            rep: { "Markus": 5 },
            next: "path_demo_clean"
        },
        res_shotgun: {
            txt: "Four systems, four emergency unlocks, one of them was the right one. The demo runs. The other three are now standing open on the network like barn doors. Some automated alert is going to notice.",
            m: 10, l: 10, a: 5, b: 5,
            next: "path_demo_shotgun"
        },
        res_describe: {
            txt: "'Blue. With a sort of... thing at the top. And it says something with an E.' After several excruciating minutes you identify the system by the company logo, which he describes as 'a squiggle'. It comes off in the end. Only just. A piece of your life comes off with it.",
            m: 15, l: 0, a: 10, b: 0
        }
    }
},
{
    id: "call_markus_demo_2a",
    title: "The Findings",
    reqStory: "path_demo_quick",
    text: "Email from the client's IT, polite in tone, devastating in content: 'Your demo environment triggered 214 findings in our standard scan. Report attached (PDF, 38 pages). We look forward to your response.'",
    opts: [
        {
            t: "Patch it all and respond properly",
            m: 25, l: -10, a: 10, b: -5,
            r: "You work through the 38 pages, patch the system up to date and answer with a report of the measures taken. The client's IT is impressed: 'No supplier has ever come back to us that quickly.' Embarrassment, transmuted into competence. The alchemy of the working admin."
        },
        {
            t: "'That is purely a sales system'",
            rep: { "Markus": -5 },
            m: 5, l: 10, a: 0, b: 5,
            r: "You shift the responsibility elegantly towards Sales. The client's IT replies drily: 'Then Sales should not be putting it on our network.' Markus is copied in and understands only that you have sold him out."
        },
        {
            t: "Shut the demo system down for good",
            m: 10, l: 0, a: -5, b: 5,
            r: "You pull the plug: no system, no findings, no response required. Neatly solved - until the next time Sales needs a demo on the spot and you get to explain why 'the broken box' does not exist any more."
        }
    ]
},
{
    id: "call_markus_demo_2b",
    title: "The Two-Minute Legend",
    reqStory: "path_demo_clean",
    text: "Markus landed the deal and has been telling the story of the 'live rescue in two minutes' everywhere ever since. Each version is more dramatic than the last. In the current one you 'hacked your way into the system while the client was already getting up to leave'.",
    opts: [
        {
            t: "Correct him pedantically: 'It was 2:40'",
            rep: { "Markus": -3 },
            m: 5, l: 0, a: 5, b: 0,
            r: "'TWO MINUTES sounds better, Miller!' Markus is genuinely hurt - you have been tinkering with his story, and stories are his working capital. He carries on telling the legend. You simply come out of it a little less heroic now."
        },
        {
            t: "Just take the glory",
            rep: { "Markus": 5 },
            m: 5, l: 5, a: -5, b: 0,
            r: "You let them believe it. Sales now calls you 'the hacker', and Markus officially owes you 'a pint per version of the story'. At his current rate of telling that comes to a crate a quarter."
        },
        {
            t: "Take every demo system into maintenance",
            m: 20, l: -10, a: 5, b: -5,
            r: "You ride the tailwind and push through what has been missing for years: demo systems with an update schedule, password rotation, a named owner. It is unspectacular work that makes sure nobody ever needs a two-minute legend again. The best sort of work."
        }
    ]
},
{
    id: "call_markus_demo_2c",
    title: "Four Open Doors",
    reqStory: "path_demo_shotgun",
    text: "The security software's automated alert goes off: 'Four systems detected with emergency access and no expiry date.' The three needlessly unlocked demo machines have been standing open on the network for hours. The alert also went to a distribution list. You do not know who is on that list.",
    opts: [
        {
            t: "Let Kevin do a demo stocktake",
            rep: { "Kevin": 3 },
            m: 10, l: 5, a: 0, b: 0,
            r: "Kevin sets off with a clipboard and records every demo machine in the building. He finds seven. There should be four. Two of the three extras are running under the desks of people who 'only wanted to test something'. The stocktake was long overdue."
        },
        {
            t: "Close it all down now and document it",
            m: 15, l: -5, a: 5, b: -5,
            r: "Access closed, expiry dates set, incident properly documented before anybody asks. When the query from the distribution list arrives, a time-stamped report already exists. Whoever documents faster than others escalate, wins."
        },
        {
            t: "Declare the systems 'honeypots'",
            m: 5, l: 10, a: 0, b: 5,
            r: "'Those are deliberately exposed traps for attacker analysis.' The answer sounds so professional that nobody follows up. You do now officially have a honeypot programme. Sooner or later somebody will want to see results."
        }
    ]
},

{
    id: "call_hotline_queue",
    title: "Caller Number 38",
    text: "The internet line has been flickering since this morning, and the diagnosis is unambiguous: the problem is outside, at the provider. There is only one way. You dial the business hotline. 'Welcome. All of our advisers are currently busy. You are caller number... THIRTY-EIGHT.'",
    opts: [
        {
            t: "Hold on. Whatever it takes.",
            next: "path_queue_warten",
            m: 30, l: -5, a: 15, b: 0,
            r: "Thirty minutes of a pan-pipe version of 'Africa', interrupted by assurances that your call is important. Then, at last: 'Faults desk, Denis?' And Denis is - you can hardly believe your ears - competent."
        },
        {
            t: "Activate the call-back service",
            next: "path_queue_callback",
            m: 5, l: 10, a: 0, b: 5,
            r: "'We will ring you back as soon as an adviser is free. Your place in the queue is retained.' You ring off and feel modern. The call back will come. Call backs always come. Always at the stupidest possible moment."
        },
        {
            t: "Simply sit the fault out",
            next: "path_queue_aussitzen",
            m: 2, l: 10, a: 5, b: 5,
            r: "Flickering lines settle down by themselves now and then, you tell yourself. The first tickets about 'slow internet' are already trickling in. You mark them as 'under observation'. Observing is something you are good at."
        }
    ]
},
{
    id: "call_hotline_queue_2a",
    title: "Denis",
    reqStory: "path_queue_warten",
    text: "Denis finds the fault in four minutes ('Port is stuck, I am resetting it... any good?'), explains the cause in plain language and then says, half under his breath, the unthinkable: 'I will give you my direct line. For business faults. But do not tell ANYBODY that you have it.'",
    opts: [
        {
            t: "Send a fax of praise to Denis's firm",
            m: 10, l: 5, a: -5, b: 0,
            r: "You write a formal commendation. Three weeks later Denis has a promotion - to team leader, away from the hotline. His direct line now goes to voicemail. You have promoted away the one good thing about this provider. With a fax."
        },
        {
            t: "Stay sceptical, ask for a ticket number",
            m: 5, l: 5, a: 0, b: 0,
            r: "Trust is good, ticket numbers are better. Denis dictates one to you with audible regret - you have just turned down what passes for first-name terms in the provider world. The number will work. The direct line would have worked miracles."
        },
        {
            t: "Note the direct line down and guard it",
            m: 5, l: 0, a: -10, b: 0,
            r: "You write the number on a slip of paper, laminate it in your mind and put it somewhere not even Kevin would find. A direct line to the faults desk. There are admins who would kill for that. You know some."
        }
    ]
},
{
    id: "call_hotline_queue_2b",
    title: "The Call Back",
    reqStory: "path_queue_callback",
    text: "Here it comes: your mobile rings - just as Dr Wichtig is standing at your desk wanting to explain something 'strategic, only briefly'. The display shows the provider's number. Place in the queue: saved. Timing: catastrophic.",
    opts: [
        {
            t: "Reject it, the boss comes first",
            m: 10, l: 10, a: 10, b: -5,
            r: "You reject the call back and take in fifteen strategic minutes on 'synergies in the digital space'. Afterwards you ring the hotline again: 'You are caller number... FORTY-ONE.' The queue knows no mercy and no yesterday."
        },
        {
            t: "Bring the boss in: 'Live escalation!'",
            rep: { "Dr. Wichtig": 3 },
            m: 10, l: 5, a: 0, b: -5,
            r: "'You see, Doctor - I am escalating the fault with the provider PERSONALLY, as we speak.' You put it on speaker. Dr Wichtig watches you direct a technician with visible fascination and whispers: 'THAT is a hands-on mentality.' The line comes back up and the impression lands."
        },
        {
            t: "Answer it, let the boss wait",
            m: 15, l: -5, a: 5, b: 10,
            r: "'Excuse me, faults desk, I MUST take this.' Dr Wichtig waits with the expression of a man who has never waited. The line does get repaired during the call. You have traded internet against the boss's goodwill. Probably a fair rate."
        }
    ]
},
{
    id: "call_hotline_queue_2c",
    title: "14:00",
    reqStory: "path_queue_aussitzen",
    text: "At 14:00 on the dot the flickering stops. Not because it is getting better - the line is now completely dead. Half the company is offline, Markus is bellowing in the stairwell that he was 'THIS CLOSE to closing', and the flood of tickets has developed a rhythm of its own.",
    opts: [
        {
            t: "Set up an emergency LTE hotspot",
            m: 15, l: -5, a: 5, b: -5,
            r: "Company mobile, data allowance, a strategically placed router: the ten most important desks are back online, prioritised by volume of complaint. It is a stopgap, it is slow, but it is YOUR stopgap. Improvisation is infrastructure too."
        },
        {
            t: "Write an all-staff email about 'planned maintenance'",
            m: 5, l: 10, a: 0, b: 10,
            r: "One all-staff email turns a neglected fault into 'announced maintenance'. The complaints go quiet - nobody complains about something that was planned. Only Ms Elster replies: 'Announced? Where?' She archives announcements. All of them."
        },
        {
            t: "The hotline after all - it is a full outage now",
            m: 30, l: 0, a: 15, b: 5,
            r: "'You are caller number... SIXTY-THREE.' The full outage has apparently driven every business customer in the region to the hotline. When you finally get through, the fault is 'known and being worked on'. You could have had that an hour ago. For less."
        }
    ]
},

{
    id: "call_junior_2a",
    title: "The Bot Flood",
    reqStory: "path_junior_ports",
    text: "The company network did not come through the night well: the open ports have drawn visitors from all over the world. And while you are still clearing up, Junior rings again: 'Oi! My server is LAGGING like mad! Make the internet faster!'",
    opts: [
        {
            t: "Build him a properly isolated private port",
            rep: { "Dr. Wichtig": 5 },
            m: 15, l: 5, a: 5, b: 0,
            r: "You build Junior a walled-off solution: one port, one server, zero contact with the company network. He is satisfied, his father hears about it ('My son says you are the only person here who knows anything') - and it occurs to you in passing to wonder where Junior's server physically stands. It looks familiar."
        },
        {
            t: "'Delegate' the problem to Kevin",
            rep: { "Kevin": -5 },
            m: 5, l: 10, a: 0, b: 5,
            r: "'Kevin, go and sort out the boss's son.' Two hours later Kevin and Junior have set up a second server together and are arguing about mods. You have not solved the problem. You have doubled it and given it a friend."
        },
        {
            t: "Ports shut, network cleaned, truth endured",
            m: 25, l: -10, a: 10, b: -5,
            r: "You close everything, throw the bots out and harden the firewall. That takes Junior's server offline as well, and his howl of rage down the phone reaches frequencies only dogs can fully appreciate. The network is clean again, though."
        }
    ]
},
{
    id: "call_junior_2b",
    title: "The Private Word",
    reqStory: "path_junior_eskal",
    text: "Dr Wichtig asks you into his office and closes the door. 'My son claims you hit him. Through the telephone.' Pause. 'I am a father, Miller, but I am not mad. What actually happened?'",
    opts: [
        {
            t: "'Your son blackmails members of staff.'",
            rep: { "Dr. Wichtig": -5 },
            m: 5, l: 0, a: -5, b: 10,
            r: "The word 'blackmails' hangs heavy in the room. Dr Wichtig goes very quiet. 'That is a serious accusation against a child, Miller.' It is also a true one. But truth about the heir bears no fruit in this office. It feels magnificent anyway."
        },
        {
            t: "Tell the unvarnished truth",
            rep: { "Dr. Wichtig": 5 },
            m: 10, l: 0, a: 5, b: -5,
            r: "You describe the call word for word, attempted blackmail included. Dr Wichtig listens, nods slowly and then says something astonishing: 'The boy needs boundaries. Not necessarily from you. But boundaries.' Briefly, you understand each other. It is unsettling."
        },
        {
            t: "Squirm and apologise for everything",
            rep: { "Dr. Wichtig": -5 },
            m: 5, l: 5, a: 5, b: 10,
            r: "You apologise for something you did not do. Dr Wichtig registers it with the look of a man who scents weakness for a living. 'Interesting. So my son does NOT exaggerate.' You have just signed a confession for an imaginary offence."
        }
    ]
},
{
    id: "call_junior_2c",
    title: "Negative Polarity",
    reqStory: "path_junior_matrix",
    text: "Dr Wichtig intercepts you in the corridor. 'My son tells me our firewall has NEGATIVE POLARITY. Why am I hearing that from a twelve-year-old? How serious is it? What does the fix cost?' Your own bluff is facing you in a tailored suit.",
    opts: [
        {
            t: "Give the trick away at Junior's expense",
            rep: { "Dr. Wichtig": 3 },
            m: 5, l: 0, a: 5, b: 0,
            r: "You confess the bluff. Dr Wichtig looks at you for a long moment - then the corner of his mouth twitches. 'You... administered my son.' He walks off shaking his head, but the twitch was there. You saw it. There are no witnesses."
        },
        {
            t: "'Already fixed. No costs incurred.'",
            m: 5, l: 10, a: 0, b: 5,
            r: "The answer bosses most like to hear: done and free of charge. Dr Wichtig nods, satisfied. The polarity thereby counts as a real problem that was solved - and will appear in his next board presentation as an example of 'proactive IT excellence'. With your name on it."
        },
        {
            t: "Set up a 'Project Polarity Reversal'",
            rep: { "Dr. Wichtig": 3 },
            m: 15, l: 10, a: 0, b: -5,
            r: "You sketch out a three-phase plan with a serious face. Dr Wichtig approves budget for things you wanted to buy anyway: new switches, a UPS battery, decent cabling. The polarity is 'recalibrated' every quarter. The most honest dishonest project in the company's history."
        }
    ]
},

{
    id: "call_boss_tunnel_2a",
    title: "The Cut",
    reqStory: "path_tunnel_ja",
    text: "The all-staff email arrives two hours later: 'On the recommendation of the IT department, the IT budget will be optimised at month end (-40%).' On the recommendation. Of IT. In a tunnel you said 'Yes, sir' to your own cut.",
    opts: [
        {
            t: "Get a meeting with the boss: clear the misunderstanding up",
            rep: { "Dr. Wichtig": -3 },
            m: 15, l: 0, a: 10, b: 5,
            r: "'But you said YES, SIR, Miller. I have witnesses. The tunnel.' Dr Wichtig takes a climb-down personally. You talk the cut down to twenty per cent - officially 'following constructive dialogue'. It has the shape of a victory. It is not one."
        },
        {
            t: "Stoically work with nothing",
            m: 10, l: 5, a: 10, b: -5,
            r: "No new budget means: Egon's cellar becomes the purchasing department, cables get patched instead of replaced, and every acquisition is now called 'a repair'. It is undignified and works alarmingly well. That is the most depressing part of it."
        },
        {
            t: "Set Ms Elster looking for procedural errors",
            rep: { "Frau Elster": 5 },
            m: 15, l: 0, a: 5, b: 0,
            r: "Ms Elster reads the cancellation email twice and smiles thinly: 'Budget changes require the written form under Annex 7. An announcement from a tunnel is not the written form.' The matter is frozen 'pending formal review'. Bureaucracy, at long last on your side."
        }
    ]
},
{
    id: "call_boss_tunnel_2b",
    title: "The Next Tunnel",
    reqStory: "path_tunnel_klick",
    text: "He rings again. Static again - the man finds tunnels the way other people find parking spaces. 'Miller! At last! Right, AS DISCUSSED: you will take care of *KRRRK* ... by Friday! Are we *KCHHH* ...agreed?!' Nothing was ever discussed. There is no as-discussed.",
    opts: [
        {
            t: "Guess, and agree with conviction",
            m: 5, l: 5, a: 15, b: 5,
            r: "'Yes, sir, by Friday!' You have no idea what for. By Friday you will pre-emptively have done everything he might have meant: reports, backups, the wobbly projector in the board room. A week of work against one sentence of static. The tunnel always wins."
        },
        {
            t: "'Bad line - I will summarise by email'",
            m: 10, l: -5, a: 5, b: -5,
            r: "The oldest trick in administration: put it in writing. Your email ('Just to make sure I have understood you correctly...') forces him to formulate the instruction himself. His reply: 'Fine as it is.' To an email with three open readings in it. But you have it in writing."
        },
        {
            t: "Hang up again - the tunnel did it",
            m: 2, l: 10, a: 0, b: 10,
            r: "Two dead spots in one day stretches the credibility of physics. On the third call the tunnel has ended and the voice is very clear: 'Miller. Your phone. Repair it. NOW.' Your phone is fine. That is now the problem."
        }
    ]
},

{
    id: "call_elster_excel_2a",
    title: "Ticket #4711",
    reqStory: "path_excel_ticket",
    text: "Ms Elster has delivered: Ticket #4711, immaculate. Fourteen attachments, a fault log in tabular form, a list of witnesses, escalation level 'high'. In CC: Dr Wichtig. The closing sentence: 'Prompt processing in accordance with the service agreement is requested.' There is no service agreement. Perhaps there is now.",
    opts: [
        {
            t: "Send Kevin over as first responder",
            rep: { "Kevin": 3 },
            m: 5, l: 5, a: 0, b: 0,
            r: "Kevin sets off with the toolbox and comes back an hour later transformed: neatly combed, with a slice of cake in foil. 'Ms Elster is dead nice?! We restarted everything and talked about her cat.' The ticket is closed. Kevin has an ally now."
        },
        {
            t: "Work the ticket by the book",
            rep: { "Frau Elster": 3 },
            m: 20, l: -5, a: 10, b: -5,
            r: "You answer every attachment, document the solution and close it immaculately. Ms Elster replies with one sentence: 'So it can be done.' That is reproach and recognition in five words. The ticket system does not permit any more closeness than that."
        },
        {
            t: "Close the ticket: 'Cannot reproduce'",
            rep: { "Frau Elster": -5 },
            m: 5, l: 10, a: 0, b: 10,
            r: "The classic ticket burial. Except: Ms Elster reproduces. She opens #4712 referencing #4711, with screenshots at one-minute intervals and the new escalation level 'critical'. Dr Wichtig, still in CC, has sent a read receipt in the meantime."
        }
    ]
},
{
    id: "call_elster_excel_2b",
    title: "The Thank-You Cake",
    reqStory: "path_excel_retterin",
    text: "Ms Elster is standing in the server room - holding a cake plate. 'Marble cake. Home-made. You saved my accounts, Mr Miller.' She puts the plate down and then simply stays where she is, as though she had something else to say and did not know how.",
    opts: [
        {
            t: "Accept the cake and the time",
            rep: { "Frau Elster": 5 },
            m: 15, l: 10, a: -10, b: 0,
            r: "You eat marble cake between the racks while Ms Elster talks: about Rüdiger, about the previous boss, about the fact that for eleven years she has been the only one who understands the accounts. 'You are the first person from IT who does not sigh when I ring.' You sigh inwardly. Never audibly again."
        },
        {
            t: "Cut it politely short: too much on",
            rep: { "Frau Elster": -3 },
            m: 5, l: 0, a: 5, b: 0,
            r: "'Thank you very much, Ms Elster, I am afraid I have to...' She nods at once, too quickly, takes the plate and leaves you a single slice on a piece of paper. The piece of paper is a napkin with a cat printed on it. The cake tastes superb. It does not help."
        },
        {
            t: "Ask to see a photo of Rüdiger",
            rep: { "Frau Elster": 5 },
            m: 10, l: 5, a: -5, b: 0,
            r: "Her face lights up like a freshly patched server. There follow: 34 photos, two videos ('He was still little then!') and the information that Rüdiger is diabetic but brave. Ten minutes of your life, an ally for life. In Accounts."
        }
    ]
},

{
    id: "call_phish_2a",
    title: "Revenge Calls Back",
    reqStory: "path_phish_troll",
    text: "They have not forgotten. 'Mr Miller' - they know your name now - 'Your computer has NOW REALLY got virus. Very bad.' Since this morning they have been working through the company's extensions one by one. The caller sounds personally offended. 45 minutes of the Any Key leave a mark.",
    opts: [
        {
            t: "Company-wide warning plus number block",
            m: 15, l: -5, a: 5, b: -5,
            r: "All-staff email with sample lines from the script, a block list on the phone system, a quiet word with the usual suspects ('Chantal: give remote access to NOBODY. Nobody.'). The wave of calls runs into nothing. Unspectacular, effective, grown-up. Almost a shame."
        },
        {
            t: "Brief Gabi and let her take it on",
            rep: { "Gabi": 5 },
            m: 10, l: 5, a: -10, b: 0,
            r: "Gabi listens to the script and smiles the smile of a woman with thirty years of Reception behind her. From now on every 'Microsoft' call goes to her. Her record by the end of the week: 73 minutes, including invented modem noises made with her mouth. The calls stop for good after that."
        },
        {
            t: "Ignore it, it will burn itself out",
            m: 2, l: 10, a: 0, b: 5,
            r: "It probably will. Eventually. Until then the extensions keep ringing, and somewhere in this building there is guaranteed to be somebody who only wanted 'a bit of quick help'. You know this building. You do not know this somebody yet. You will meet."
        }
    ]
},
{
    id: "call_phish_2b",
    title: "The Claim",
    reqStory: "path_phish_karte",
    text: "The company card has been emptied, the bank has the case, and there is an appointment in your calendar called nothing but 'Clarification'. Attendees: Dr Wichtig, Ms Elster, you. There are meetings you come out of smaller than you went in.",
    opts: [
        {
            t: "Full disclosure plus a criminal complaint",
            m: 25, l: -5, a: 15, b: -10,
            r: "You put it all on the table: sequence of events, times, your own fault, the complaint filed, the card stopped. It is the most uncomfortable meeting of your year - and the only course that leaves you credible afterwards. Dr Wichtig says only: 'At least you are not covering it up.' That will have to do."
        },
        {
            t: "Talk about an 'unclear debit'",
            m: 10, l: 10, a: 5, b: 15,
            r: "You talk about 'unresolved booking transactions' and hope for fog. But Ms Elster is at the table, and Ms Elster matched the debits against your call log to the minute long ago. She says nothing. She simply lays a printout on the table. The fog lifts very quickly."
        },
        {
            t: "Ask Ms Elster for help beforehand",
            rep: { "Frau Elster": 5 },
            m: 15, l: 0, a: 5, b: -5,
            r: "Ms Elster listens to the disaster, sighs once, deeply - and reaches for the receiver. She knows a Ms Krämer at the bank, personally, since 2009. Eight minutes later the chargeback is under way. 'Next time', she says as she hangs up, 'you ring ME first.' Yes ma'am."
        }
    ]
},


/* ============================================================
   TRAPS (v4.0.0): calls where a sense of duty is the most
   expensive reflex.
   ============================================================ */

{
    id: "call_falle_umfrage",
    title: "The Staff Survey",
    text: "'Good afternoon, this is the Institute for Workplace Climate, acting for your group head office. The survey takes only three minutes and is of course entirely anonymous.' The words 'of course' carry a stress that can only be described as a warning.",
    opts: [
        {
            t: "Answer honestly and at length",
            m: 10, l: 0, a: 5, b: 35,
            next: "path_umfrage_ehrlich",
            r: "You speak openly about budget, staffing levels and the coffee machine. Three weeks later Dr Wichtig quotes verbatim in the departmental meeting from 'an anonymous response out of IT'. IT consists of you. Anonymity at a sample size of one is a mathematically demanding concept."
        },
        {
            t: "Politely fob them off: no time",
            m: 2, l: 5, a: 5, b: 10,
            r: "Three minutes was too much for you - the report gives that a category of its own: 'Refusal to participate: IT (100%)'. Head office, in its experience, reads silence not as a shortage of time but as a condition. A follow-up conversation 'for activation purposes' will be offered. Compulsory."
        },
        {
            t: "Top marks everywhere, finished quickly",
            m: 5, l: 10, a: 10, b: 0,
            r: "Five stars on everything, no follow-up questions, hung up. The report duly certifies 'outstanding satisfaction despite lean provision' for IT - which officially proves that the lean provision is enough. Your next budget request will be refused with your own top mark."
        }
    ]
},
{
    id: "call_falle_vorstand",
    title: "Missed Call",
    text: "The display shows: 1 missed call, board secretariat, six minutes ago. No message, no email, just the bare number. Six minutes. In board time that is either three seconds or an eternity, and you have no way of telling which.",
    opts: [
        {
            t: "Ring Gabi first: what is this about?",
            m: 5, l: 5, a: 5, b: 5,
            r: "Gabi knows, naturally: 'Projector for Room 1, it flickers. And do not say you had it from me.' The call back then goes off with total composure - but five minutes of detective work round two corners for a projector says something about this building. And about you. And about projectors."
        },
        {
            t: "Dutifully ring back at once",
            m: 5, l: 0, a: 10, b: 30,
            r: "You ring back - straight into the board meeting in progress, where the secretary's phone is lying on speaker because a conference call is due any second. Eight executives hear your 'Yes hello, Miller here, you tried to reach...?'. It was about a projector. It sounded like a man going under."
        },
        {
            t: "Wait until they get in touch again",
            m: 5, l: 5, a: 10, b: 5,
            r: "Strategic patience - except that your head refuses to join in: for two hours you privately compose scenarios ranging from the sack to promotion. When the secretariat rings again two hours later, it is about a projector. The pulse of those two hours appears in no statistic. It was there all the same."
        }
    ]
},

	{
		id: "call_kamera_schwarz",
		title: "Frau Brandt (Sales office)",
		text: "'Mr Miller, I have been in this video call for ten minutes and all anybody sees is a black picture. The client is on it as well. Can you repair that from where you are?'\n\nIn the background somebody says very distinctly: 'We still cannot see you.'",
		opts: [
			{
				t: "Ask whether something is stuck over the lens",
				m: 5, l: 0, a: 0, b: 0,
				r: "Short pause. 'There is a little slider thing... oh.' She had pushed shut the camera cover that IT fitted for her two years ago, on data protection grounds. Five minutes, one problem, no harm done."
			},
			{
				t: "'Video hardware is the manufacturer's business.'",
				m: 2, l: 15, a: -5, b: 15,
				r: "You pass it on and hang up. Two minutes saved. Ms Brandt writes an email to her head of department, who forwards it to yours, with the word 'regrettable' in it."
			},
			{
				t: "Walk her through the settings step by step",
				m: 15, l: -5, a: 10, b: 0,
				r: "She has no vocabulary whatsoever for what she is looking at. 'The blue thing? No, the other blue thing.' After a quarter of an hour the camera works, the meeting is over and the client has hung up."
			},
			{
				t: "Dial into the meeting yourself and take over",
				m: 20, l: -10, a: 5, b: -5,
				next: "path_brandt_screenshare",
				r: "You dial in and ask her to share her screen. She shares it. She shares the whole screen. The client is now looking at her email, her calendar and a folder called 'Application final'.",
				rep: { "Markus": 5 }
			}
		]
	},
	{
		id: "call_brandt_screenshare",
		reqStory: "path_brandt_screenshare",
		title: "Frau Brandt (Again)",
		text: "'Mr Miller, about the video call. The client saw the folder. My boss rang the client. Now my boss knows about the folder.'\n\nShe sounds very calm. That is rarely a good sign.",
		opts: [
			{
				t: "'I did not see anything.'",
				m: 5, l: 0, a: 0, b: 0,
				rep: { "Markus": 5 },
				r: "That is all you say. She thanks you and hangs up. Two weeks later there is a chocolate bar on your keyboard, with no note."
			},
			{
				t: "Ask what was in the folder",
				m: 10, l: 5, a: 10, b: 5,
				r: "She hangs up without a word. The folder is still called 'Application final', and where she applied to remains her secret. Somewhere with working cameras, presumably."
			},
			{
				t: "Offer to explain the screen sharing technically",
				m: 10, l: -5, a: 5, b: -5,
				r: "You write to her boss explaining that sharing an entire screen transmits every open window and that this is a known operating risk. It even happens to be true. Whether it helps, you never find out."
			}
		]
	},
	{
		id: "call_zeiterfassung",
		title: "Herr Kunz (Stores)",
		text: "'Here, I forgot to clock out yesterday. It says 23:40 now. Can you just change that? You can get in anywhere.'\n\nHe says it in the tone of somebody asking you to close a window.",
		opts: [
			{
				t: "'That is HR's job, not mine.'",
				m: 5, l: 0, a: 5, b: 0,
				r: "You point him at the correction form. He thinks that is bureaucracy gone mad and says so. Then he hangs up and fills it in."
			},
			{
				t: "Just correct the entry",
				m: 10, l: -5, a: -5, b: 5,
				next: "path_zeit_manipuliert",
				r: "Two clicks, clocking-off time set to 16:12, done. He is delighted and announces he will be needing this again at some point. The database records every change, but you leave that part out."
			},
			{
				t: "Offer to walk him through the form",
				m: 20, l: -10, a: 0, b: -5,
				r: "You go down to Stores and fill it in together with him. It takes longer than any correction and it is the only way where nobody has to explain anything afterwards."
			},
			{
				t: "'No problem, but it'll cost you a coffee.'",
				m: 10, l: 0, a: -10, b: 10,
				next: "path_zeit_manipuliert",
				loot: "donut",
				r: "You change the entry and twenty minutes later he brings you a coffee and a doughnut up from the canteen. The doughnut is yesterday's. So is the entry now."
			}
		]
	},
	{
		id: "call_zeit_revision",
		reqStory: "path_zeit_manipuliert",
		char: "Frau Elster",
		title: "Frau Elster (Accounts)",
		text: "'Mr Miller. An entry in the time system has been changed after the fact. From an account with full rights. There is exactly one such account.'\n\nYou can hear her turning pages. She has printed the matter out.",
		opts: [
			{
				t: "Ask why she reads the logs",
				m: 5, l: 0, a: 15, b: 10,
				rep: { "Frau Elster": -5 },
				r: "'Because they are there, Mr Miller.' She says it as though she had been expecting the question for years and had learned the answer by heart."
			},
			{
				t: "Admit it and record the matter",
				m: 15, l: -5, a: 5, b: 5,
				rep: { "Frau Elster": 5 },
				r: "You explain what happened and enter it in the log yourself. She nods audibly. 'Documented, it is no longer a mistake, it is a matter of record.' Apparently that is how it works here."
			},
			{
				t: "Blame it on a system fault",
				m: 10, l: 10, a: 0, b: 20,
				rep: { "Frau Elster": -10 },
				r: "You invent a synchronisation fault. She stays silent three seconds too long and then thanks you extremely politely. The printout goes into a folder that officially does not exist."
			}
		]
	},
	{
		id: "call_headset_echo",
		title: "Herr Doblinger (Purchasing)",
		startNode: "root",
		nodes: {
			root: {
				text: "'Everyone says there is an echo. I can hear myself. I can hear MYSELF, Mr Miller.'\n\nHe really can hear himself. So can everybody else. Twice.",
				opts: [
					{ t: "Ask whether another device is in the meeting", next: "geraet" },
					{ t: "Dangle a new headset", next: "headset" },
					{ t: "Put the headphones on and stay calm", req: "headphones", next: "ruhig" }
				]
			},
			geraet: {
				text: "'Only my PC. And my mobile. But that is purely so I catch what is being said, in case the PC fails.'\n\nThe mobile is in the same meeting. On speaker. Next to the microphone.",
				opts: [
					{ t: "Ask him to drop out on the mobile", next: "res_handy" },
					{ t: "Say nothing and listen", next: "res_zuhoeren" }
				]
			},
			headset: {
				text: "'At last! Could you order a wired one? Those wireless things interfere with the Wi-Fi, as everybody knows.'\n\nHe works in Purchasing. He could order it himself. He knows that.",
				opts: [
					{ t: "Promise the order and raise a ticket", next: "res_bestellung" },
					{ t: "Refer him to Purchasing", next: "res_einkauf" }
				]
			},
			ruhig: {
				text: "You put the headphones on, turn the feedback echo down and listen to him without it hurting your teeth. After twenty seconds he says, entirely on his own: 'Hang on, my mobile is in here as well.'",
				opts: [
					{ t: "Wait in silence", next: "res_ruhig" }
				]
			}
		},
		results: {
			res_handy: { txt: "He drops out on the mobile, the echo is gone, and he informs the meeting that you 'changed something on the server'. There is no point contradicting him at this stage.", m: 10, l: -5, a: 5, b: -5 },
			res_zuhoeren: { txt: "You stay silent. He talks to his own echo for eleven minutes and concludes that the line is overloaded. You did nothing at all in that time and found it enormously restful.", m: 15, l: 15, a: -10, b: 5 },
			res_bestellung: { txt: "You raise a ticket, which lands in Purchasing, which is to say with him. In two weeks he will reject it because there is no budget, and ring you to complain about it.", m: 10, l: 0, a: 5, b: 0 },
			res_einkauf: { txt: "'I am supposed to order it myself?' He says it as though you had asked him to repair the copier. He does it, though, and it even arrives.", m: 5, l: 0, a: 10, b: 5 },
			res_ruhig: { txt: "He solves his own problem while you say nothing. He thanks you effusively for your help. You provided none, and today that is the best possible outcome.", m: 5, l: 0, a: -10, b: -5 }
		}
	},
	{
		id: "call_lizenz_admin",
		title: "Frau Özdemir (Project office)",
		text: "'I need this conversion program, but the computer says I have no rights. Could you just tell me your password? Then I will do it myself and you will have some peace.'\n\nShe means it kindly. That does not make it any better.",
		opts: [
			{
				t: "'Just install whatever you can find.'",
				m: 2, l: 20, a: -5, b: 20,
				r: "You hang up. She finds something. It even works, after a fashion, and merely shows an advert for a data recovery service every twenty minutes. The call about that one reaches you next week."
			},
			{
				t: "Check the program and install it yourself",
				req: "admin_pw",
				m: 20, l: -10, a: 5, b: -10,
				r: "You take a look at what she found: freeware with four advertising banners and an installer that changes the home page without asking. Instead you install the program the company licensed years ago, and show her where it lives."
			},
			{
				t: "Give her the password, she is trustworthy after all",
				rem: "admin_pw",
				next: "path_pw_verraten",
				m: 5, l: 5, a: -5, b: 25,
				r: "You tell her. She repeats it out loud, spells it back to be sure and writes it on a note. From tomorrow the note is stuck to her monitor. A password hanging up in an open-plan office is not a password any more — you are going to have to change it."
			},
			{
				t: "Refuse and raise a ticket for the approval",
				m: 10, l: 0, a: 5, b: 0,
				r: "You explain that you do not hand out passwords, and you raise a request for the software approval. She thinks that is a palaver. She is right. It stands all the same."
			}
		]
	},

	{
		id: "call_ceo_sonnenwind",
		reqStory: "path_ceo_sonnenwind",
		char: "Dr. Wichtig",
		title: "Dr. Wichtig the CEO",
		text: "'Miller, I have told the trade press about our solar wind problem. They found it thoroughly exciting. I need a concept by Friday for how we harden our infrastructure against solar winds.'\n\nHe has not forgotten it. He has built on it.",
		opts: [
			{
				t: "Write a concept that costs nothing",
				m: 25, l: -10, a: 5, b: -10,
				rep: { "Dr. Wichtig": 5 },
				r: "You produce two pages on earthing, surge protection and redundant power supplies — all of it in place for years. He does not read it, but he forwards it. The supervisory board finds the approach forward-looking."
			},
			{
				t: "Admit that it was never solar winds",
				m: 10, l: 0, a: 10, b: 20,
				rep: { "Dr. Wichtig": -10 },
				r: "You explain that his iPad had simply been flat that day. He listens to that and then says: 'And why did you let me tell the press?' There is no good answer to that."
			},
			{
				t: "Let Kevin write the concept",
				m: 5, l: 15, a: -5, b: 10,
				rep: { "Kevin": -5 },
				r: "Kevin is thrilled and delivers eleven pages, seven of them on solar storms in general and one on a film he watched about them. The CEO prints it out and puts it on display in reception."
			}
		]
	},
	{
		id: "call_markus_papier",
		reqStory: "path_markus_papier",
		char: "Markus",
		title: "Markus the Head of Sales",
		text: "'That PDF stunt of yours cost me forty-two euros. I drove to the print shop across the road and printed the quote there. Along with the internal costings on page four.'\n\nHe does not say it as a complaint. He says it as an invoice.",
		opts: [
			{
				t: "Ask whether the file is still on their machine",
				m: 15, l: -5, a: 10, b: -10,
				rep: { "Markus": 5 },
				r: "It is still on it. You ring, the shop owner deletes the job and finds the fuss overdone. Markus never mentions the incident again, which in his language is gratitude."
			},
			{
				t: "Teach him to print double-sided",
				m: 20, l: -10, a: 15, b: -5,
				r: "You go upstairs and set his printer up for him. In the course of it he calls you 'colleague' twice and 'young man' once, and you are eleven years older than he is."
			},
			{
				t: "Let the forty-two euros pass without comment",
				m: 5, l: 5, a: 0, b: 5,
				r: "You say nothing. He submits the receipt as expenses, annotated 'IT not available'. Ms Elster will read that. Ms Elster reads everything."
			},
			{
				t: "'Why print internal costings externally?'",
				m: 10, l: 0, a: 5, b: 15,
				rep: { "Markus": -10 },
				r: "The question is fair and it lands. He gets loud, then quiet, then he says: 'Report me, then.' Both of you know that you will not. But it has been said now."
			}
		]
	},
	{
		id: "call_egon_switch",
		reqStory: "path_egon_switch",
		char: "Egon",
		title: "Egon the Caretaker",
		text: "'That box the water got into — I unscrewed it and dried it out with a hairdryer. Running again. Can you have a look and see if that's right?'\n\nHe sounds proud. The hairdryer is still going in the background.",
		opts: [
			{
				t: "Ask whether he isolated it first",
				m: 10, l: 0, a: 15, b: 0,
				next: "path_switch_bleibt",
				r: "Long pause. 'Do you have to?' You agree between you that the question is purely academic, because he is still alive. The switch stays where it is."
			},
			{
				t: "'If it runs, it runs.'",
				m: 5, l: 20, a: -5, b: 20,
				rep: { "Egon": 5 },
				next: "path_switch_bleibt",
				r: "Egon is extraordinarily satisfied with that answer. The switch runs for another three weeks and then fails on a Friday afternoon, for reasons nobody can afterwards reconstruct."
			},
			{
				t: "Run down and swap the switch out",
				m: 30, l: -15, a: 10, b: -15,
				rep: { "Egon": 5 },
				r: "The switch really is running, in a way nobody could recommend. You swap it for a spare and let Egon keep the old one. He stands it in his workshop, as a trophy."
			}
		]
	},
	{
		id: "call_gabi_kollaps",
		reqStory: "path_gabi_kollaps",
		char: "Gabi",
		title: "Gabi (From Her Mobile)",
		text: "'I am back, it was not as bad as all that. The paramedic said I should eat regularly.'\n\nA pause.\n\n'He asked me whether anybody had helped me. I said I had not been able to reach anyone.'",
		opts: [
			{
				t: "Apologise",
				m: 10, l: -5, a: 5, b: -5,
				rep: { "Gabi": 10 },
				r: "You say you misjudged it, and you mean it. She accepts that without labouring the point. Ever since, there has been an emergency supply in her drawer, which she shows you as though it were a shared secret."
			},
			{
				t: "Take her round a bar of chocolate",
				rem: "chocolate",
				m: 15, l: -5, a: -10, b: -5,
				rep: { "Gabi": 10 },
				r: "You put the bar on her counter without a word. She says nothing either. Nothing more elegant has ever been offered as an apology in this house, and it costs you one bar of chocolate."
			},
			{
				t: "Point back at the mustard in the fridge",
				m: 5, l: 5, a: 10, b: 5,
				rep: { "Gabi": -10 },
				r: "You explain that you did make a suggestion. She rings off. From now on every outside call without exception is put through to you, including the ones for Sales."
			}
		]
	},
	{
		id: "call_vpn_privat",
		title: "Herr Reinhardt (Financial control, from home)",
		text: "'My internet is gone. I cannot reach the server, I cannot work. What are you going to do about it?'\n\nIt is his private connection, in his private flat, with his private provider.",
		opts: [
			{
				t: "Offer to have him come into the office",
				m: 5, l: 0, a: 5, b: -5,
				r: "A short silence. 'Into the office?' He says he will have another go at it himself first. Ten minutes later he is online and never calls back."
			},
			{
				t: "Offer him your mobile hotspot",
				m: 10, l: 10, a: -5, b: 15,
				r: "You dictate your hotspot password to him. He is touched, works the whole day over it and uploads a four-gigabyte backup while he is at it. Your data allowance is gone by the 14th of the month."
			},
			{
				t: "Explain that it is a private connection",
				m: 10, l: 0, a: 10, b: 0,
				r: "He takes that for an excuse. 'But I am working.' The conversation goes round twice before he hangs up to ring his provider. Their hotline has a forty-minute wait, he reports later, reproachfully."
			},
			{
				t: "Go through the router with him",
				m: 25, l: -10, a: 15, b: -10,
				r: "You guide him through light colours, plug positions and a restart. After twenty minutes the answer arrives: the extension lead was switched off, because he plugged the vacuum cleaner into it yesterday."
			}
		]
	},
	{
		id: "call_kevin_backup",
		char: "Kevin",
		title: "Kevin (Apprentice)",
		text: "'I made a backup! Of the whole project store! All by myself! It took four hours, but now everything's there twice over.'\n\nHe is audibly waiting for praise. You have not asked where to yet.",
		opts: [
			{
				t: "Ask which drive he put it on",
				m: 10, l: 0, a: 10, b: -5,
				rep: { "Kevin": 5 },
				r: "'Well, onto the same disk it was already on. So it's easier to find.' A backup sitting next to the original is not a backup, it is a space problem. You explain it to him and he gets it immediately, which is the annoying part."
			},
			{
				t: "Praise him and let him carry on",
				m: 5, l: 10, a: -10, b: 15,
				rep: { "Kevin": 10 },
				r: "He blossoms and announces that from now on he will make a backup every day. Of everything. Onto the same disk. The disk is 4 TB and will fill up for the first time next week."
			},
			{
				t: "Set up a real backup together with him",
				m: 30, l: -15, a: 0, b: -10,
				rep: { "Kevin": 10 },
				r: "Together you set up a job onto the network drive, with versioning and an alert if it fails. It costs you half an hour and is today's only act with a half-life reaching past tomorrow."
			},
			{
				t: "'Backups are not your job.'",
				m: 5, l: 5, a: 0, b: 5,
				rep: { "Kevin": -10 },
				r: "He apologises several times and deletes the copy again straight away. In the process he accidentally deletes a folder of the original as well. You do not find that out until the day after tomorrow."
			}
		]
	},
	{
		id: "call_falle_datenschutz",
		title: "External Number",
		text: "'Good afternoon, Bartels, external data protection coordination. We are reviewing access rights on behalf of your management. Please send me a list of all user accounts with their permission levels, to the address I shall give you in a moment.'\n\nHe sounds exceedingly correct. He knows the name of your managing director. It is on the website.",
		opts: [
			{
				t: "Refer him to the management",
				m: 5, l: 5, a: 0, b: 0,
				r: "You give him the number for reception. Gabi fobs him off in forty seconds, because she puts nobody through on principle that she does not know. Mistrust, on the right day, is a security policy."
			},
			{
				t: "Offer to ring back via the switchboard",
				m: 10, l: 0, a: 5, b: -10,
				r: "You explain that you will happily ring back as soon as you have confirmed the number through the switchboard. A one-second pause. Then: 'But of course.' He never rings again, and the switchboard has never heard of a Bartels."
			},
			{
				t: "Ask who commissioned the review",
				m: 15, l: 0, a: 10, b: -5,
				r: "He names somebody from the legal notice, then a contract number, then he grows impatient. Impatience is rare in a genuine audit. You hang up politely, and he does not try a second time."
			},
			{
				t: "Compile the list and send it",
				m: 20, l: -5, a: 0, b: 30,
				r: "You export the user list and send it to an address whose domain differs from yours by exactly one letter. You did not notice. Somebody will notice, eventually."
			}
		]
	},
	{
		id: "call_chantal_umfrage",
		char: "Chantal",
		title: "Chantal (Feel-good management)",
		text: "'I need a survey tool for our satisfaction survey! Very important: completely anonymous, so that everybody is honest.'\n\nA pause.\n\n'But obviously I have to be able to see who answered what. For the follow-up care.'",
		opts: [
			{
				t: "Set up a genuinely anonymous tool",
				m: 25, l: -10, a: 0, b: -10,
				rep: { "Chantal": 5 },
				r: "You set it up with no traceability and show her the results. The first answer reads: 'The one thing that works here is IT.' She reads it out to you, audibly irritated."
			},
			{
				t: "Log the names, she will not notice",
				m: 10, l: 5, a: -5, b: 25,
				rep: { "Chantal": 10 },
				r: "You add a field that records the login. She is thrilled. Four weeks later the works council asks how the attribution in the results came about, and the only name in the log is yours."
			},
			{
				t: "'Use bits of paper and a box.'",
				m: 5, l: 15, a: -5, b: 5,
				rep: { "Chantal": -5 },
				r: "You suggest paper. She regards that as a step back into the last century, but does it. The box stands in the foyer for three weeks, and by the end there are four slips in it, two of them with drawings."
			},
			{
				t: "Explain that you cannot have both",
				m: 15, l: -5, a: 10, b: -5,
				rep: { "Chantal": -5 },
				r: "You explain the contradiction three times in three different ways. She listens and then says: 'And what if we call it anonymous anyway?' You settle on genuinely anonymous — and she is disappointed in you."
			}
		]
	},

	{
		id: "call_chef_kaffeetrick",
		reqStory: "path_chef_kaffeetrick",
		char: "Chantal",
		title: "Chantal (Feel-good management)",
		text: "'Mr Miller, very quickly: there is a queue in the kitchenette. Apparently there is a trick for getting the premium roast for free. Do you know anything about it?'\n\nYou know a great deal about it. You even know who it came from.",
		opts: [
			{
				t: "'No idea, I drink the normal one.'",
				m: 5, l: 5, a: 0, b: 0,
				r: "You let it pass without comment. The trick spreads through three floors on its own, and on Thursday an engineer reconfigures the machine. Nobody asks who started it."
			},
			{
				t: "Explain the trick, but not the source",
				m: 10, l: 0, a: -5, b: 10,
				rep: { "Chantal": 5 },
				r: "She tries it immediately, is delighted and posts it on the intranet. Within an hour the whole building knows. The boss reads the post and now knows that somebody was listening in."
			},
			{
				t: "Say where the trick came from",
				m: 10, l: 0, a: 5, b: 25,
				rep: { "Chantal": 10, "Dr. Wichtig": -10 },
				r: "Chantal is electrified and treats the information like a gift. She keeps it to herself for exactly forty minutes. By the afternoon the boss knows who was eavesdropping, and you know that he knows."
			},
			{
				t: "'The coffee is bad even with the trick.'",
				m: 5, l: 0, a: -10, b: 5,
				r: "She laughs honestly, for the first time in weeks without an emoji in her tone. That settles the matter, and the queue in the kitchenette breaks up by itself once the roast runs out."
			}
		]
	},
	{
		id: "call_puschel",
		reqStory: "path_puschel",
		title: "Tobias the Intern",
		text: "'Erm, Mr Miller? I cannot get into my account any more. It says the password has expired. But I only just changed it.'\n\nYou know what it is. You even know the hamster's name.",
		opts: [
			{
				t: "'How would I know your password?'",
				m: 5, l: 5, a: 5, b: 5,
				r: "You play ignorant and reset it without comment. He believes you. Two weeks later he is telling the break room that IT cannot see passwords, and you do not contradict him."
			},
			{
				t: "Reset it and mention nothing",
				m: 10, l: -5, a: 0, b: -5,
				r: "You reset it and have him set a new one. He types it in, saying it out loud as he goes: 'Pu-schel-one-two-three-four.' You have both learned something, just not the same amount."
			},
			{
				t: "Explain why passwords are not said out loud",
				m: 20, l: -10, a: 5, b: -10,
				r: "In five minutes you tell him more about security than his induction ever did, and you do it without showing him up. He nods seriously. The hamster never appears in a password again."
			},
			{
				t: "Log in with 'Puschel123' and show him",
				m: 10, l: 0, a: -5, b: 20,
				r: "You log in with his password in front of him. The shock goes deep and so does the lesson. The login is in the log with your machine name on it, though, and somebody in this building reads logs."
			}
		]
	},
	{
		id: "call_lena_keller",
		reqStory: "path_lena_keller",
		title: "Lena the Intern",
		text: "'I just wanted to say thank you again. And to ask: how did you know the code?'\n\nYou did not know it. You guessed. The code has been 0000 since the day it was fitted.",
		opts: [
			{
				t: "Report the code so that it gets changed",
				m: 15, l: -5, a: 5, b: -10,
				rep: { "Egon": -5 },
				r: "You send a report to building services. Egon changes the code to 1234 and announces it on a notice so that nobody forgets it. The notice hangs beside the door."
			},
			{
				t: "Stay mysterious",
				m: 5, l: 10, a: -10, b: 5,
				r: "'Trade secret.' She is impressed. A reputation for knowing every code in the building is worth a good deal and costs you not one minute of work."
			},
			{
				t: "Tell her the truth",
				m: 5, l: 0, a: 0, b: -5,
				r: "You admit that you guessed. She finds that even funnier than the rescue itself and passes it on. The basement code has been known in this building as 'the Miller method' ever since."
			}
		]
	},
	{
		id: "call_maus_hof",
		reqStory: "path_maus_hof",
		char: "Egon",
		title: "Egon the Caretaker",
		text: "'Here, did you let a mouse go in the courtyard? There are three of them out there now. One of them knows its way around the paper tray suspiciously well.'\n\nHe does not sound accusing. He sounds professionally interested.",
		opts: [
			{
				t: "Ask whether you can keep them",
				m: 10, l: 5, a: -10, b: 5,
				rep: { "Egon": 5 },
				r: "Egon gives it serious thought. 'As an office animal?' The idea founders on Ms Elster, who considers office animals a benefit in kind and puts that in writing."
			},
			{
				t: "Set a live trap with Egon",
				m: 25, l: -10, a: 0, b: -10,
				rep: { "Egon": 10 },
				r: "You and Egon put out two boxes, and he talks about 1987 for forty minutes while you do it. Next morning both traps are empty and the bait is gone. Egon calls that 'respect for your opponent'."
			},
			{
				t: "Suggest closing off the paper tray",
				m: 10, l: 0, a: 5, b: -5,
				r: "A flap that shuts solves the problem at the root. Egon likes the idea, fits it, and the printer never squeaks again. It does jam on the paper feed now."
			},
			{
				t: "'Not my area of responsibility.'",
				m: 5, l: 10, a: 0, b: 5,
				rep: { "Egon": -5 },
				r: "Egon says only: 'Ah.' and hangs up. It is a very short 'Ah', and you will still be thinking about it months from now, every time you need something from building services."
			}
		]
	},
	{
		id: "call_scanner_riesig",
		title: "Herr Petzold (Quality assurance)",
		text: "'I have been scanning for half an hour and no email arrives. The scanner says it has sent, though.'\n\nIt has sent. Four hundred and twelve pages, one at a time, at the highest resolution, in colour.",
		opts: [
			{
				t: "Clear the queue and have him scan again",
				m: 20, l: -10, a: 5, b: -10,
				r: "You clear 2.8 gigabytes out of the queue and set the scanner to greyscale. The second attempt takes four minutes and arrives. He asks why it was not set up that way from the start."
			},
			{
				t: "Ask what he is actually scanning",
				m: 10, l: 0, a: 10, b: -5,
				next: "path_petzold_handbuch",
				r: "It is a quality manual that already exists digitally. He is scanning the printout in order to make a digital version of it. You both stand there in silence with that thought for a moment."
			},
			{
				t: "Raise his mailbox limit",
				m: 15, l: 0, a: 0, b: 10,
				r: "You raise the limit, the emails arrive, and by the afternoon the mailbox is full again. The problem is not solved, it has moved — into the backup."
			},
			{
				t: "'The scanner is still working, please wait.'",
				m: 5, l: 15, a: -5, b: 5,
				r: "You hang up. The scanner really is still working, and it goes on until 15:00. In the meantime nobody in the building can print anything else."
			}
		]
	},
	{
		id: "call_neuer_kollege",
		title: "Staff Development",
		text: "'The new colleague in Sales starts in ten minutes. He will need a machine, an account, a mailbox, a phone and access to the stock control system.'\n\nThis is the first you have heard of him.",
		opts: [
			{
				t: "Sit him down at Bernd's old machine",
				m: 15, l: -5, a: 0, b: 15,
				next: "path_bernd_rechner",
				r: "The machine is still standing there, with all the rights and all the data of the man before him. It works immediately and is at the same time the worst thing you could have done today. Nobody has noticed."
			},
			{
				t: "Ask who actually hired him",
				m: 10, l: 0, a: 15, b: 10,
				r: "As it emerges, the notification to IT has been sitting for three weeks in a mailbox that has belonged to nobody since the restructuring. Clearing that up takes longer than setting up the account would have."
			},
			{
				t: "Explain that this sort of thing needs lead time",
				m: 10, l: 0, a: 10, b: 5,
				r: "You explain the process and the lead time. She listens patiently. Then: 'But he is here now.' You are both right, and in a minute somebody will still be sitting at an empty desk."
			},
			{
				t: "Set up an account, the rest can follow",
				m: 25, l: -10, a: 5, b: -10,
				r: "In twenty minutes you set up the bare essentials: a login, a mailbox, a loan machine out of the cupboard. He can read email. For a first day in Sales that is more than enough."
			}
		]
	},
	{
		id: "call_beamer_workshop",
		char: "Chantal",
		title: "Chantal (Training room)",
		text: "'The projector is showing nothing! The workshop starts in four minutes! It is about digital transformation!'\n\nIn the background somebody says, in a very calm voice: 'At home this sort of thing always works straight away.'",
		opts: [
			{
				t: "Go over and switch the input",
				m: 20, l: -10, a: 10, b: -10,
				rep: { "Chantal": 10 },
				r: "The projector was on the wrong input, because the day before yesterday somebody plugged a laptop in and took it away again. Two button presses. Chantal introduces you to the room as 'our saviour', which is worse than the problem was."
			},
			{
				t: "Talk her through the menu on the phone",
				m: 15, l: -5, a: 15, b: 0,
				r: "You describe symbols she cannot find, on a remote control whose batteries are dead. After twelve minutes she switches the projector off and on again, and it works. Why, neither of you ever establishes."
			},
			{
				t: "Bring the spare cable over",
				req: "cable",
				m: 10, l: -5, a: 0, b: -10,
				rep: { "Chantal": 5 },
				r: "You fetch the cable from your drawer, plug it in and leave again. Four minutes, not one word too many. The cable stays there and will never be seen again."
			},
			{
				t: "'Do the workshop on paper, it suits the topic.'",
				m: 5, l: 10, a: -10, b: 10,
				rep: { "Chantal": -5 },
				r: "The line is too good not to say, and you say it loudly enough for the room to hear. Three people laugh. Chantal is not one of them."
			}
		]
	},
	{
		id: "call_signatur_weg",
		title: "Frau Kirchner (Order processing)",
		text: "'My signature is gone. Just gone. I didn't do anything.'\n\nShe deleted it herself yesterday because it was too long for her taste. She will not say so for another four minutes.",
		opts: [
			{
				t: "'Signatures are the user's own business.'",
				m: 2, l: 15, a: -5, b: 10,
				r: "You hang up. She writes emails all day with no sender details, and two customers write back to ask who they are dealing with. The queries land in her department head's inbox."
			},
			{
				t: "Put the template back in",
				m: 10, l: -5, a: 0, b: -5,
				r: "You put the company template back in. She is happy until she notices the full liability notice underneath it again. The notice runs to nine lines and is required by law."
			},
			{
				t: "Ask when it last worked",
				m: 15, l: -5, a: 5, b: -10,
				r: "Two questions later she admits that she 'tidied up a bit' yesterday. You put it back together with her, and she does not mention the liability notice again."
			},
			{
				t: "Let her build her own signature",
				m: 20, l: 0, a: 5, b: 15,
				r: "She designs herself a signature with a quotation, two colours and a picture of her dog. The liability notice is not in it. That will be noticed, but not today and not by you."
			}
		]
	},
	{
		id: "call_falle_werkstudent",
		title: "Unknown Number",
		text: "'Hi, this is Jan, the new working student in IT. I am supposed to start today but I cannot get into the system. Can you set me up with access quickly? Ms Chantal said I should ring you directly.'\n\nHe drops into familiarity within a sentence. He knows Chantal's first name. He knows yours as well.",
		opts: [
			{
				t: "Check with Chantal",
				m: 10, l: 0, a: 5, b: -10,
				rep: { "Chantal": 5 },
				r: "Chantal knows nothing about a Jan. She knows nothing about a working student either. When you ring back, the number is no longer in service. You put the matter on record in writing, because something like this only comes along once in a while."
			},
			{
				t: "Ask him to come by in person",
				m: 5, l: 0, a: 0, b: -5,
				r: "'Sure, I'll be there this afternoon.' He is not there in the afternoon. He is not there the next day either. Reception has never seen a Jan."
			},
			{
				t: "Set up access, he does start today",
				m: 20, l: -5, a: -5, b: 30,
				r: "You create an account and read the credentials out over the phone. He thanks you warmly and logs in at 23:40 from an address that belongs to no network in this building."
			},
			{
				t: "Ask him for his staff number",
				m: 10, l: 0, a: 5, b: -5,
				r: "A brief hesitation. Then he gives one that could exist but does not. When you say so, he turns unpleasant and hangs up. Rudeness on the telephone is rarely proof, but it is nearly always a hint."
			}
		]
	},
	{
		id: "call_heizluefter",
		char: "Egon",
		title: "Egon the Caretaker",
		text: "'The fuse in the west wing has gone for the third time today. Always just after nine. I haven't changed anything. You lot have got all those boxes standing there.'\n\nAll those boxes have been standing there for four years and have never once thrown a fuse.",
		opts: [
			{
				t: "'Electrics are facilities, not IT.'",
				m: 5, l: 10, a: 0, b: 10,
				rep: { "Egon": -10 },
				r: "Formally you are right. Egon rings off in silence and reports the incident onwards in writing, with the addition that IT declined to investigate. The addition is the real point."
			},
			{
				t: "Ask whether somebody is using a heater",
				m: 10, l: 0, a: 5, b: -10,
				rep: { "Egon": 5 },
				next: "path_heizluefter",
				r: "Egon goes to look and finds three fan heaters under three desks, all on the same power strip, all there since Monday. The heating in the west wing has not worked since Monday."
			},
			{
				t: "Go over and meter the distribution board",
				m: 30, l: -15, a: 5, b: -10,
				rep: { "Egon": 10 },
				r: "You spend an hour metering with Egon and find the same three fan heaters, only more slowly. What you have gained is knowing what lies behind that wall, and Egon knowing that you can listen."
			}
		]
	},
	{
		id: "call_kalender_geist",
		title: "Frau Brandt (Sales office)",
		text: "'There is an appointment in my calendar every Tuesday at 14:00 called \"Alignment\". No location, no description, no organiser. I cannot delete it. It is simply there.'\n\nIt sits in the calendars of seventeen people. Since 2021.",
		opts: [
			{
				t: "Hide the appointment for her alone",
				m: 10, l: 0, a: 0, b: -5,
				r: "One click, and the problem is gone for her and not for sixteen others. That is precisely how appointments arise that nobody can account for any more, and you know it even as you do it."
			},
			{
				t: "Delete the whole series",
				m: 15, l: -5, a: 0, b: 25,
				next: "path_geistertermin",
				r: "You tidy it away. The following Tuesday at 14:00 four people sit in a room, because they no longer had the appointment in their calendar but still had it in their heads. Two of them consider this gathering the most important meeting of the week."
			},
			{
				t: "'Just go along to it.'",
				m: 5, l: 10, a: -5, b: 5,
				r: "She goes along. The room is empty. She stays twenty minutes and afterwards writes minutes, because she writes minutes. The minutes go to seventeen people."
			},
			{
				t: "Find out who created the series",
				m: 25, l: -10, a: 5, b: -5,
				r: "The organiser left the company in 2022, his account was deactivated, the series stayed. You document it and establish that in four years nobody has dared to ask what it is about."
			}
		]
	},
	{
		id: "call_wlan_gast",
		char: "Gabi",
		title: "Gabi (Reception)",
		text: "'Mr Miller, there is a visitor here who wants to get on the Wi-Fi. I gave him the guest network, but he says it is too slow for his presentation.'\n\nIn the background: 'I just need the proper network for a minute.'",
		opts: [
			{
				t: "Give him the internal network, it is only for a minute",
				m: 5, l: 5, a: -5, b: 30,
				r: "You pass the internal password on. He is satisfied, his machine logs obediently into the company network, and after that a device that never belonged to you has an address on your network. Permanently, because he will be back."
			},
			{
				t: "Let Gabi decide",
				m: 5, l: 10, a: -5, b: 5,
				rep: { "Gabi": -5 },
				r: "You say she should do whatever she thinks right. She thinks it right to turn him away, and does so with a friendliness no argument can get past. He will complain anyway — to you."
			},
			{
				t: "Read out the Wi-Fi note with the guest details",
				req: "wifi_note",
				m: 5, l: 0, a: 0, b: -5,
				rep: { "Gabi": 5 },
				r: "You read Gabi the guest details off the note, she passes them on, done. The guest network is exactly as slow as it is supposed to be, and the presentation runs anyway."
			},
			{
				t: "Ask what he wants to present",
				m: 10, l: 0, a: 5, b: -5,
				r: "He wants to play a video from a cloud service nobody here has heard of. You compromise on the projector and a file off a stick. It takes two minutes and has worked for thirty years."
			}
		]
	},

	{
		id: "call_werner_blind",
		reqStory: "path_werner_blind",
		title: "Private call: Werner, the father-in-law",
		text: "'SON! It worked! I'm in this group now!'\n\nHe is in a group. It is called 'Ostweg Neighbourhood – NO POLITICS'. He founded it himself. It has 214 members.\n\n'And they all write so fast! Can you set it slower?'",
		opts: [
			{
				t: "'Just leave the group.'",
				m: 5, l: 0, a: 10, b: 0,
				r: "'Leave? They've made me the administrator!' He says it the way you would say a rank. The call ends with him keeping the group and you dropping the subject."
			},
			{
				t: "Admit that you weren't listening last time",
				m: 15, l: -5, a: -10, b: 5,
				r: "You own up to having said nothing but 'mhm' that day. Werner goes quiet for a second and then laughs loudly enough to be heard in the next office. 'The grandson does that as well.' You have spoken on the phone more often ever since."
			},
			{
				t: "Put the headphones back on",
				req: "headphones",
				m: 25, l: 20, a: -15, b: 10,
				r: "You do exactly what you did last time. It works exactly as well. He ends up satisfied, you end up relaxed, and somewhere on the Ostweg something happens that you will never hear about."
			},
			{
				t: "Show him how to mute a group",
				m: 20, l: 5, a: -5, b: 15,
				r: "Twenty minutes, three of them spent explaining where 'the little bell with the line through it' is. After that the Ostweg is quiet. Renate rings in the evening to thank you, which Werner never would."
			}
		]
	},
	{
		id: "call_plomp_tape",
		reqStory: "path_plomp_tape",
		title: "Frau Plomp (Customer support)",
		text: "'The cup holder is holding beautifully now, thank you again. But I have a CD here from the training course that I am supposed to put in. Where do I do that?'\n\nThe only opening for it is taped shut with duct tape. By you.",
		opts: [
			{
				t: "Peel the tape off and explain it to her",
				m: 15, l: -5, a: 5, b: -5,
				r: "You peel the tape off, the tray slides out, and Ms Plomp regards the whole business with the expression of somebody who has just been defrauded. 'So it is a hole after all.' Neither of you ever mentions it again."
			},
			{
				t: "Copy the CD onto a network drive",
				m: 20, l: -10, a: 0, b: -10,
				r: "You fetch the CD, copy the course material onto the drive and send her the link. She prints the material out. All four hundred pages. The printer on the third floor has plenty to be getting on with for the rest of the day."
			},
			{
				t: "'Just lay it on top.'",
				m: 5, l: 15, a: -5, b: 10,
				r: "She lays the CD on the case. Nothing happens, which prompts her to remark that modern technology is not what it used to be. Contradicting her at this point would be unwise."
			}
		]
	},
	{
		id: "call_bernd_rechner",
		reqStory: "path_bernd_rechner",
		char: "Frau Elster",
		title: "Frau Elster (Accounts)",
		text: "'Mr Miller. A fresh invoice approval has a handler on it who has not been in the building since February.'\n\nThe new colleague is sitting at Bernd's machine. With Bernd's login. With Bernd's approval rights.",
		opts: [
			{
				t: "Set him up an account of his own straight away",
				m: 25, l: -10, a: 5, b: -15,
				rep: { "Frau Elster": 10 },
				r: "In half an hour you do what you should have done on Monday, and you disable the old account. Ms Elster records the disabling in the log and writes beside it: 'Resolved promptly.' That is her highest praise."
			},
			{
				t: "Strip the approval rights from the old account",
				m: 15, l: -5, a: 0, b: -5,
				r: "You take the rights away, the account stays. The new colleague carries on working under Bernd's name and can no longer approve anything. An interim state which, in this building, holds for about three years."
			},
			{
				t: "'Well, the machine was still set up.'",
				m: 5, l: 10, a: 5, b: 25,
				rep: { "Frau Elster": -10 },
				r: "You explain that it was convenient. She repeats the word 'convenient' once, very slowly. From tomorrow the matter will be sitting with management as a printout, neatly filed."
			},
			{
				t: "Ask why Bernd's account is still active",
				m: 10, l: 0, a: 10, b: 10,
				r: "Because nobody sent the leaver notice. The leaver notice is sent by HR. HR is waiting for confirmation from IT. It has been waiting for that confirmation since February."
			}
		]
	},
	{
		id: "call_geistertermin",
		reqStory: "path_geistertermin",
		title: "Frau Brandt (Sales office)",
		text: "'Four people from the old distribution list noticed the appointment had gone and created a new one. It is called \"Alignment (new)\" and it goes to twenty-three people. They have copied me in and they write that IT deleted the old one by accident.'\n\nBy accident it was not.",
		opts: [
			{
				t: "Set it straight: the series was orphaned",
				m: 15, l: -5, a: 10, b: -5,
				r: "You reply to all twenty-three, matter-of-factly, that the organiser left the company in 2022. Two people thank you, one contradicts you, and the appointment stays in place regardless. It has a history now, and that is enough."
			},
			{
				t: "Offer to attend the gathering",
				m: 20, l: -5, a: 15, b: -10,
				r: "You go along once. Forty minutes go on who is responsible for what, then twenty minutes on the coffee. As you leave, they ask you to come regularly in future, because your presence has raised the standing of the group."
			},
			{
				t: "Say nothing, the appointment is harmless",
				m: 5, l: 10, a: -5, b: 5,
				r: "You let it run. The group has met again every Tuesday at 14:00 ever since, produces minutes and will turn up in next year's organisation chart. At some point somebody will ask who introduced it."
			}
		]
	},
	{
		id: "call_petzold_handbuch",
		reqStory: "path_petzold_handbuch",
		title: "Herr Petzold (Quality assurance)",
		text: "'About all that scanning. I found the digital manual you meant. It is from 2019. Mine is from 2023. I have been entering the amendments by hand since then, you see.'\n\nOn paper. In a ring binder. As the only version.",
		opts: [
			{
				t: "Show him how to track changes digitally",
				m: 20, l: -10, a: 5, b: -10,
				r: "He is honestly impressed that a document remembers who changed what and when. You do not say that he could have had this since 2019. He works it out for himself and goes very quiet."
			},
			{
				t: "Suggest scanning the binder in",
				m: 10, l: 5, a: 0, b: 10,
				r: "You suggest precisely the thing that flooded the queue in the first place. He does it. In greyscale this time, at least. The file then sits next to the 2019 document, and nobody knows any more which one counts."
			},
			{
				t: "'Then your version is the valid one.'",
				m: 5, l: 15, a: -5, b: 5,
				r: "You declare the paper binder the leading version. That is convenient, honest, and from the point of view of the next certification a catastrophe. But that is in the autumn, and today is Tuesday."
			},
			{
				t: "Offer to enter the amendments yourself",
				m: 30, l: -15, a: 0, b: -15,
				r: "You work through four years of margin notes together and transfer them into the document. It takes forever and it is the first act in months that has produced a version nobody has to go back behind."
			}
		]
	},
	{
		id: "call_bildschirm_gedreht",
		title: "Herr Adler (Purchasing)",
		text: "'Everything is upside down. The whole screen. All I did was clean the keyboard.'\n\nWhile wiping he caught a key combination that has existed for twenty years and that nobody has ever needed.",
		opts: [
			{
				t: "Ask what he cleaned it with",
				m: 10, l: 0, a: 10, b: -5,
				r: "With glass cleaner. Sprayed on directly. Onto the keyboard. The rotated picture is therefore the smaller of the two problems, and the second one will report in about four days."
			},
			{
				t: "Read the key combination out",
				m: 5, l: 0, a: 0, b: 0,
				r: "Ctrl, Alt, up arrow. One press, two seconds, done. He is disappointed that it was that easy, and you know full well he is about to demonstrate it to somebody."
			},
			{
				t: "Go over and set it back",
				m: 15, l: -10, a: 5, b: -5,
				r: "You go up, turn the picture back and disable the key combination while you are there. On the way back two people ask whether you could have a look at theirs as well."
			},
			{
				t: "Let him turn the screen instead",
				m: 10, l: 10, a: -10, b: 5,
				r: "You suggest he could rotate the monitor on its stand. He actually does. He works for two hours at a screen standing on end and turned through 180 degrees, before somebody walks past and asks."
			}
		]
	},
	{
		id: "call_maus_akku",
		char: "Kevin",
		title: "Kevin (Apprentice)",
		text: "'I've got five mice here out of the cupboard and none of them work. They're all broken. Shall we order new ones?'\n\nThey are wireless mice. The cupboard is the treasure trove for devices somebody handed in because they 'stopped working'.",
		opts: [
			{
				t: "Reorder, it is simpler",
				m: 5, l: 15, a: -5, b: 15,
				r: "You order five new mice. Ms Elster asks in writing why a department of eight people has got through twenty-three mice in the current year. Nobody has a good answer to that."
			},
			{
				t: "Go through the whole cupboard with him",
				m: 35, l: -20, a: 5, b: -15,
				rep: { "Kevin": 10 },
				r: "Between you it takes a good half-hour, and along the way you find two working keyboards, a power supply that has been hunted for since 2019, and a box of cables for devices that no longer exist. The cupboard is now a stores rather than a graveyard."
			},
			{
				t: "'Broken is broken, throw them out.'",
				m: 5, l: 5, a: 0, b: 10,
				rep: { "Kevin": -5 },
				r: "Kevin disposes of five working mice because you said so. He would dispose of anything you told him to, and that is exactly the problem with sentences you say in passing."
			},
			{
				t: "Let him put batteries in",
				m: 10, l: -5, a: 0, b: -5,
				rep: { "Kevin": 5 },
				r: "Four out of five mice live. Kevin is as thrilled as if he had built them himself, and writes the insight into the wiki he has recently started keeping. The entry is called 'Batteries'."
			}
		]
	},
	{
		id: "call_teams_immer_gelb",
		title: "Frau Kirchner (Order processing)",
		text: "'My status keeps jumping to yellow even though I am at my desk. My department head has already mentioned it to me twice.'\n\nShe is at her desk. She is reading contracts on paper, because that is her job.",
		opts: [
			{
				t: "Raise the time before it shows as away",
				m: 10, l: -5, a: 0, b: 5,
				r: "You move the threshold from five minutes to thirty. The problem is gone, and the question of why anybody measures their staff by a coloured dot is left hanging, unanswered."
			},
			{
				t: "Set her up with a program that fakes activity",
				m: 15, l: 5, a: -5, b: 20,
				r: "You install a tiny tool that nudges the mouse pointer by one pixel every four minutes. From now on she is permanently green, always available, and her department head holds her up as an example."
			},
			{
				t: "Have a word with the department head",
				m: 20, l: -10, a: 15, b: 10,
				rep: { "Chantal": 5 },
				r: "You explain to him that the dot does not measure attendance, it measures keystrokes. He listens, nods and says: 'So how do I measure it then?' IT has no answer to that one either."
			},
			{
				t: "'Move the mouse now and again.'",
				m: 5, l: 10, a: 0, b: 5,
				r: "The advice is as practical as it is degrading, and you both know it. She thanks you anyway and hangs up. From tomorrow there is a biro lying crossways under her mouse, rolling slowly away."
			}
		]
	},
	{
		id: "call_falle_rueckruf",
		title: "Your Own Extension",
		text: "'Good afternoon, it is support again. We spoke earlier about the fault.'\n\nThere was no earlier call. The display shows your own extension.",
		opts: [
			{
				t: "Play him along and stall",
				m: 25, l: 10, a: -10, b: 5,
				r: "You keep him hanging for twenty minutes, invent system names and leave him sitting out waiting times. It is enormous fun and yields no insight whatsoever, except that he is very patient. With these people patience is a job requirement."
			},
			{
				t: "Grant the remote access, he sounds genuine",
				m: 15, l: -5, a: -5, b: 35,
				r: "You release the session. He thanks you, works visibly on settings for four minutes and invisibly on something else for two. What happened in those two minutes you will not understand until next week."
			},
			{
				t: "Ask which fault this is about",
				m: 10, l: 0, a: 10, b: 0,
				r: "He describes a fault that could exist anywhere, in words that fit anywhere. When you ask for a ticket number, he gives one in the wrong format. After that the line is dead."
			},
			{
				t: "Hang up and tell the switchboard",
				m: 10, l: 0, a: 5, b: -10,
				rep: { "Gabi": 5 },
				r: "You hang up and let Gabi know. Within ten minutes she has a note on the reception desk showing what a spoofed number looks like. No notice in the history of this building has ever worked better."
			}
		]
	},
	{
		id: "call_drucker_konfetti",
		char: "Gabi",
		title: "Gabi (Reception)",
		text: "'The big printer is only putting the sheets out in shreds now. It looks like confetti. Shall I gather it up?'\n\nThe big printer does not have a shredder. The shredder is standing next to it.",
		opts: [
			{
				t: "'Gather it up, I will come by later.'",
				m: 5, l: 15, a: 0, b: 5,
				rep: { "Gabi": -5 },
				r: "Gabi spends half an hour gathering confetti out of a machine built for precisely that purpose. When you come by later the bin is empty and the misunderstanding is fully cemented."
			},
			{
				t: "Ask exactly where she put the paper in",
				m: 5, l: 0, a: 0, b: -5,
				rep: { "Gabi": 5 },
				r: "Into the shredder. There are two identical grey boxes standing side by side, and the label on the shredder fell off years ago. You both laugh, and that afternoon you bring a new label down."
			},
			{
				t: "Go over and take a look",
				m: 15, l: -10, a: 5, b: -5,
				rep: { "Gabi": 5 },
				r: "You walk down and stand in front of two grey boxes, one of which is full of shredded paper. The diagnosis takes four seconds, getting there took fourteen minutes. That is what this job mostly looks like."
			}
		]
	},
	{
		id: "call_lena_bewerbung",
		title: "Lena the Intern",
		text: "'Could you have a quick look at this? I am applying for the apprenticeship here and I have to upload my CV as a PDF. But the form keeps saying the file is too large.'\n\nShe is asking you because there is nobody else she can ask.",
		opts: [
			{
				t: "Ask why she is applying here",
				m: 10, l: 0, a: 5, b: 0,
				r: "'Because everyone here is nice.' She says it without irony, and you stand there with the receiver in your hand wondering whether to contradict her. You do not contradict her."
			},
			{
				t: "'That is not my responsibility.'",
				m: 2, l: 10, a: 0, b: 0,
				r: "Formally correct. She apologises for disturbing you, hangs up and uploads it from home that evening. The application arrives. She is not taken on regardless, and you will never know whether the two are connected."
			},
			{
				t: "Shrink the file and upload it",
				m: 15, l: -5, a: 0, b: -5,
				r: "She scanned the CV instead of exporting it, at 600 dpi, in colour. Two minutes of work and the application is away. She says thank you three times and 'I owe you one' once, and she means it."
			},
			{
				t: "Show her how instead of doing it",
				m: 25, l: -10, a: 5, b: -10,
				r: "You explain resolution, file sizes and why a picture of text is not text. She has it on the second run-through and uploads it herself. It is the only kind of help that still works the next time."
			}
		]
	},
	{
		id: "call_update_mittag",
		title: "Herr Kunz (Stores)",
		text: "'The computer down here in Stores has been doing an update for an hour. \"Please do not switch off.\" I can't book anything in. The delivery is sitting out in the yard.'\n\nThe computer in Stores runs around the clock, which is why it has not been restarted for fourteen months.",
		opts: [
			{
				t: "Let him book it on paper",
				m: 10, l: 0, a: 0, b: -5,
				r: "He notes the delivery down on a delivery note and enters it later. It is the only procedure of the day that manages without electricity, and it takes eleven minutes instead of an hour."
			},
			{
				t: "Wait and check every twenty minutes",
				m: 30, l: 10, a: 10, b: 0,
				r: "The update takes two hours and seventeen minutes in total. You checked three times in that stretch and found the same bar at 41 per cent every time. The delivery stood in the yard throughout."
			},
			{
				t: "Take him the spare machine",
				m: 25, l: -15, a: 0, b: -10,
				r: "You lug a loan machine down to Stores, sign him in and the bookings run. The machine stays there. In four months somebody will ask why there are two computers in Stores, and nobody will know."
			},
			{
				t: "'Just switch it off, it'll be fine.'",
				m: 5, l: 10, a: -5, b: 20,
				r: "He pulls the plug. The computer does not start again. What comes next is no longer a fault, it is a fresh install, and that is not happening today."
			}
		]
	},

	{
		id: "call_kevin_formatiert",
		reqStory: "path_kevin_formatiert",
		char: "Kevin",
		title: "Kevin (Apprentice)",
		text: "'I did the rebuild, like you said! It wasn't that hard.'\n\nA pause.\n\n'I just haven't found the drivers yet. Or the network. Or the program for the time system. But Fortnite runs.'",
		opts: [
			{
				t: "Ask how he got hold of the installation media",
				m: 10, l: 0, a: 10, b: 10,
				next: "path_kevin_rack",
				r: "From a site he found through a search engine. The file was called 'Windows_Original_2024_FINAL.iso'. Both of you have a problem, but only one of you currently knows which."
			},
			{
				t: "Go over and do it properly yourself",
				m: 45, l: -25, a: 5, b: -15,
				rep: { "Kevin": 10 },
				r: "You rebuild the machine from the company image, properly licensed and with everything on it. It costs you half the morning. Kevin sits beside you and watches, and this time he asks why after every step."
			},
			{
				t: "'As long as it runs.'",
				m: 5, l: 15, a: -5, b: 15,
				rep: { "Kevin": 5 },
				next: "path_kevin_rack",
				r: "The machine sits on the company network with no antivirus, no encryption and an operating system of unclear origin. Kevin is happy. The auditor, if he ever rings, will be less so."
			},
			{
				t: "Send him the driver list and let him do it",
				m: 15, l: -5, a: 5, b: -5,
				rep: { "Kevin": 5 },
				next: "path_kevin_rack",
				r: "You send him a list and let him work. He takes three hours and then proudly reports that everything runs. It does in fact run. The machine has no sound, but he will not notice that until next month."
			}
		]
	},
	{
		id: "call_kevin_gerettet",
		reqStory: "path_kevin_gerettet",
		char: "Kevin",
		title: "Kevin (Apprentice)",
		text: "'You can fix anything, you can. I told my mum you can get data back out of nowhere.'\n\nA pause.\n\n'She's downstairs at reception right now. With her laptop. It's got photos from 2009 on it.'",
		opts: [
			{
				t: "Show him how to do it himself",
				m: 30, l: -15, a: 0, b: -5,
				rep: { "Kevin": 10 },
				r: "You go down together and you let him do it while you stand beside him. He finds the loose cable himself. His mum thanks him, not you, and Kevin grows two centimetres that day."
			},
			{
				t: "'Tell her I'm in a meeting.'",
				m: 5, l: 10, a: 0, b: 0,
				rep: { "Kevin": -10 },
				r: "Kevin goes down and tells her. She drives home again. He never mentions it again, but for the next few weeks he also stops asking you anything he does not absolutely have to ask."
			},
			{
				t: "Nip down and have a look",
				m: 25, l: -10, a: 5, b: 10,
				rep: { "Kevin": 10 },
				r: "It is a cable that is not plugged in and a hard disk that still spins. Ten minutes, and afterwards Kevin's mum is crying at reception with relief. Gabi sees all of it and will pass it on."
			},
			{
				t: "Explain to Kevin why that will not work",
				m: 15, l: -5, a: 5, b: -10,
				rep: { "Kevin": -5 },
				r: "You explain the difference between a company device and a private one, between working time and a favour. He understands and is embarrassed. It is the right decision and it still feels rotten."
			}
		]
	},
	{
		id: "call_chantal_schach",
		reqStory: "path_chantal_schach",
		char: "Chantal",
		title: "Chantal (Marketing)",
		text: "'About that business with the fashion site. I think we got off on the wrong foot there.'\n\nShe sounds careful. She knows that you know something, and you know that she knows it.",
		opts: [
			{
				t: "Say that blackmail has no place in this building",
				m: 15, l: -5, a: 10, b: -10,
				rep: { "Chantal": -10 },
				r: "You say it calmly and without a threat. She is quiet for a long time and then answers: 'You are quite right.' She even means it. Even so, something has settled between you that will not lift again."
			},
			{
				t: "Offer to forget the whole thing",
				m: 10, l: 0, a: -10, b: -5,
				rep: { "Chantal": 10 },
				r: "You say you have a poor memory anyway. She laughs with relief. From now on she puts appointments in your calendar before she asks anybody else, and sometimes there is a coffee waiting for you in the kitchenette."
			},
			{
				t: "Ask for something in return",
				m: 10, l: 0, a: -5, b: 15,
				rep: { "Chantal": -5 },
				r: "You suggest that IT should no longer feature in her all-staff emails. She agrees at once. The bargain holds, but from now on you treat each other like two people who each want something from the other."
			}
		]
	},
	{
		id: "call_chantal_offen",
		reqStory: "path_chantal_offen",
		title: "Sales, Reception, Accounts (One After Another)",
		text: "'Chantal said you unblock it if people ask politely.'\n\nThat was the wording on the first call. By the fourth it has become: 'Chantal said you do that.'",
		opts: [
			{
				t: "Unblock the same for everybody, in fairness",
				m: 20, l: 0, a: -5, b: 25,
				r: "If one person is allowed it, everybody is. That is fair, defensible, and opens the firewall for sixty people. In next month's network report a fashion retailer sits at number one."
			},
			{
				t: "Check every request individually",
				m: 25, l: -10, a: 20, b: 0,
				r: "You check every request, which is formally correct and eats half the afternoon. By the close of it you have said yes three times and no once, and the one no will never be forgotten by the person who got it."
			},
			{
				t: "Ask Chantal to put it straight",
				m: 10, l: 0, a: 5, b: -5,
				rep: { "Chantal": -5 },
				r: "She puts it straight, in a post that begins with 'Small misunderstanding' and in the process describes IT twice as 'strict but fair'. The calls stop. The description sticks."
			},
			{
				t: "Withdraw the exception and justify all of it",
				m: 30, l: -15, a: 15, b: -10,
				r: "You block it again, write an all-staff email with the reasoning and weather four complaints. After two days it is quiet, and the rule applies to everybody again, Chantal included."
			}
		]
	},
	{
		id: "call_aluhut_folie",
		reqStory: "path_aluhut_folie",
		title: "The Conspiracy Theorist",
		text: "'It works! It has been quiet ever since the foil! I told them about it in Purchasing, and now three colleagues have foil as well.'\n\nThree routers in Purchasing are wrapped in tinfoil. Purchasing no longer has any Wi-Fi.",
		opts: [
			{
				t: "Promise him an official shielding solution",
				m: 10, l: 10, a: -5, b: 10,
				r: "You announce a 'certified shielding solution' that you will be ordering. He is delighted and removes the foil voluntarily so as not to jeopardise the delivery. The delivery never comes, and he asks after it every month."
			},
			{
				t: "Give him your headphones for some peace",
				rem: "headphones",
				m: 10, l: 0, a: -15, b: 5,
				next: "path_folie_bleibt",
				r: "You give him your headphones and explain that they are bug-proof. He wears them all day from then on, hears nobody at all and rings correspondingly less often. Your headphones are gone and your afternoon is quiet."
			},
			{
				t: "Go over and remove the foil without a word",
				m: 20, l: -10, a: 10, b: -10,
				r: "You unwrap three routers without saying a word. Mr Tinfoil stands beside you and reads your silence as confirmation that the matter was ordered 'from above'. The Wi-Fi works again."
			},
			{
				t: "Explain that the foil blocks the signal",
				m: 15, l: -5, a: 15, b: 0,
				next: "path_folie_bleibt",
				r: "'Exactly! That is why it works!' You are right, he is right, and you are talking about two different things. The foil stays until the department head asks why nobody is getting any email."
			}
		]
	},
	{
		id: "call_audit_testserver",
		reqStory: "path_audit_testserver",
		title: "The External Auditor",
		text: "'I have your statement on record: test systems. Then please send me the test log and the separation from the production environment by this evening.'\n\nThere is no separation. There is no test log either.",
		opts: [
			{
				t: "Ask Ms Elster for the procurement records",
				m: 30, l: -10, a: 5, b: -15,
				rep: { "Frau Elster": 10 },
				r: "She has filed every invoice since 2016 and works out in forty minutes that twelve licences really were paid for. 500 to 2 becomes 500 to 12. It is still bad, but now it is documented."
			},
			{
				t: "Cobble a log together",
				m: 45, l: -20, a: 15, b: 15,
				r: "For four hours you build a document that describes, after the fact, something that was never planned. It is formally complete, hollow in substance, and will probably pass. Half the working day is gone."
			},
			{
				t: "Withdraw the statement",
				m: 20, l: -5, a: 10, b: -10,
				r: "You ring back and say that classifying them as test systems was wrong. He notes it down without malice. Honesty does not make the report any better, but it ends the spiral you are currently in."
			},
			{
				t: "Stop answering altogether",
				m: 5, l: 20, a: -5, b: 30,
				r: "You ignore the deadline. The report goes out without your comment, carrying the note 'no response despite request'. Of all the phrases in that report, that is the most expensive one."
			}
		]
	},
	{
		id: "call_cnc_emulator",
		reqStory: "path_cnc_emulator",
		title: "Production Management",
		text: "'That trick with the memory stick was brilliant. We have four more machines with the same problem. Can you do it on those as well?'\n\nThere is one stick. It is in the milling machine and it will stay there for as long as production runs.",
		opts: [
			{
				t: "Get hold of four more sticks",
				m: 20, l: -5, a: 0, b: 5,
				r: "You order four sticks, set them up and label them. It is a clean solution to a problem whose real name is 'plant from 1998', and production is running, which is what matters today."
			},
			{
				t: "Put the images on a central share",
				m: 40, l: -20, a: 5, b: -20,
				r: "You put the floppy images on a network drive and document the path to them. Next time one fails, nobody needs you. That is what work that pays interest looks like."
			},
			{
				t: "Point at the spare parts budget",
				m: 10, l: 5, a: 5, b: 10,
				rep: { "Frau Elster": -5 },
				r: "You explain that machines from the last century are an investment decision and not an IT fault. Factually every word of it is right. Production still hears only: 'IT cannot be bothered.'"
			},
			{
				t: "Take the stick back with you",
				rem: "usb_stick",
				m: 10, l: 10, a: 5, b: 15,
				r: "You fetch your stick back. Twelve minutes later the milling machine stops again, this time in the middle of a workpiece. You have your tool back and, in exchange, a case that travels all the way up to management."
			}
		]
	},
	{
		id: "call_egon_blau",
		reqStory: "path_egon_blau",
		char: "Egon",
		title: "Egon the Caretaker",
		text: "'Here, I told the bloke from the maintenance firm that blue makes it warm here. He laughed and said it is wired the wrong way round. Since 2011.'\n\nPause.\n\n'Now he wants to put it right. Costs two thousand.'",
		opts: [
			{
				t: "Make the case for the repair",
				m: 20, l: -10, a: 10, b: -15,
				rep: { "Egon": 10 },
				r: "You write a justification in which the words 'server outage' appear three times and send it to management. It is approved. Egon tells people for months that IT once got something through."
			},
			{
				t: "Suggest a sticker instead of the repair",
				m: 10, l: 5, a: 0, b: 0,
				rep: { "Egon": 5 },
				r: "Between you, you stick two notes on the unit: 'BLUE = WARM' and 'RED = COLD'. It costs nothing, will probably last ten years and is exactly the kind of solution this building was made for."
			},
			{
				t: "Do nothing, it works",
				m: 5, l: 10, a: 0, b: 10,
				r: "You leave it all exactly as it is. Next time somebody else will be standing in front of that unit, somebody without this knowledge, and they will turn it to red. Only you may not be on the phone then."
			}
		]
	},
	{
		id: "call_umfrage_folge",
		reqStory: "path_umfrage_ehrlich",
		char: "Dr. Wichtig",
		title: "Dr. Wichtig the CEO",
		text: "'Miller, I have an anonymous response out of IT in front of me. Very critical, very detailed. I would like to talk about it.'\n\nA pause.\n\n'Not about who it was. About the content. I happen to find it interesting.'",
		opts: [
			{
				t: "Stand by the response",
				m: 25, l: -10, a: 5, b: 10,
				rep: { "Dr. Wichtig": 10 },
				r: "You say the response is yours and go through the points with him. He listens for fifteen minutes, interrupts three times and says at the end: 'Write that up.' Nothing happens afterwards, but he knows now."
			},
			{
				t: "Talk about the content, not the authorship",
				m: 20, l: -5, a: 10, b: 0,
				r: "For forty minutes you talk about budgets as though they belonged to somebody else. It is a good conversation, held by two people who both know they are putting on an act. There are no outcomes."
			},
			{
				t: "Deny that it came from IT",
				m: 10, l: 10, a: 5, b: 20,
				rep: { "Dr. Wichtig": -10 },
				r: "IT consists of one person. He knows that, you know that, and you say it anyway. He lets it stand without objection, and that is precisely the uncomfortable part."
			},
			{
				t: "Ask how anonymous the survey really was",
				m: 15, l: 0, a: 15, b: 15,
				rep: { "Dr. Wichtig": -5 },
				r: "He deflects and speaks of 'aggregated findings'. In a department with one member of staff, aggregation is a manageable piece of arithmetic. He ends the call shortly afterwards."
			}
		]
	},

	/* Dreiteiler wave 1 (v5.0): cross-pool follow-up of srv_wlp_1 - the
	   ketchup travels through the ventilation into the calls pool. */
	{
		id: "call_wlp_geruch",
		reqStory: "srv_wlp_ketchup",
		reqStoryAge: 1,
		title: "Call: Smell Complaint",
		text: "'This is Ms Sonntag, Accounts. A smell has been coming through the ventilation up here since first thing this morning. Like a takeaway van. Mr Blaschke says the run goes over your server room?'",
		opts: [
			{
				t: "'We are working on it at full pressure.'",
				m: 5, l: 0, a: 0, b: 5,
				r: "'On what, precisely?' — 'On the cause.' You can hear her writing it down."
			},
			{
				t: "'That is the new coolant.'",
				m: 5, l: 0, a: 0, b: 10,
				r: "A pause. 'Coolant that smells of Currywurst?' — 'Bio-based.' Click."
			},
			{
				t: "'We will have a specialist firm look at it.'",
				m: 5, l: 5, a: 0, b: -5,
				r: "'A specialist firm. Very good.' You can hear Ms Sonntag settle — the word puts her world back in order. There is no specialist firm, but there is now a procedure, and in Accounts that is very nearly the same thing."
			}
		]
	},

	/* Dreiteiler wave 2 (v5.0): cross-pool follow-up of cof_deka_1 - the
	   decaf pilot slows the whole house down, and the phone knows first. */
	{
		id: "call_deka_stimmung",
		char: "Gabi",
		reqStory: "cof_deka_brav",
		reqStoryAge: 1,
		title: "A Call from Reception",
		text: "'Here,' Gabi sounds muffled, as though she has cupped a hand round the receiver, 'is everything this... slow at your end as well? Half of Accounts is on the phone in slow motion, and on the second floor somebody took the lift. For one floor. Downwards.'",
		opts: [
			{
				t: "'That is the caffeine pilot. We are all dying.'",
				m: 5, l: 0, a: -5, b: 0,
				r: "Gabi says nothing for a beat. 'THAT is the project with the notice on it?' She hangs up. Two minutes later you hear it through the stairwell: Reception has a machine of its own, and Gabi has a voice built for announcements."
			},
			{
				t: "'I have not noticed anything.' Say it slowly.",
				m: 5, l: 5, a: -5, b: 0,
				r: "You stretch every word out like chewing gum. Gabi laughs until she has to cough. The first sound of joy this building has produced today."
			},
			{
				t: "'Keep a log. For posterity.'",
				m: 5, l: 5, a: -5, b: 0,
				r: "Gabi takes it more seriously than expected. Over the course of the day a list grows on Reception: 'Chronicle of the Slow Days', with a time column and observations. She will keep it. Documents like that outlive companies."
			}
		]
	},

	/* -------------------------------------------------------------------
	   Dreiteiler wave 4 (v5.0): call chains. The week's fresh dimension
	   here: callers who come BACK. One chain runs in reverse - the call is
	   the opener, the consequence walks in as a sidequest (sq_brandt_1).
	   Duplicate check against the stock (2026-08): Pizza/misdials (5x),
	   Fax (6x), the callback SERVICE gag, the distressed-intern calls
	   (Lena in the basement, the crying intern) and the title "Ticket
	   #4711" (Frau Elster) are taken - hence the secret-help chain
	   inverts the status (power calls, quietly), and the ancient ticket
	   carries the LOW number an ancient ticket would actually have.
	   ------------------------------------------------------------------- */
	{
		id: "call_diskret_1",
		title: "A Friend of the Firm",
		text: "The voice is muted, and used to being listened to. 'This is... let us say: a friend of the firm. Top floor. It concerns a screen problem, and there must be no file on it. No email, no ticket, no word in the corridor. Do we understand each other?'",
		opts: [
			{
				t: "'That is what the ticket system is for. For everybody.'",
				m: 5, l: 0, a: -5, b: 10,
				r: "A very long pause. 'Interesting', says the voice, and the word lands like a file note. Then it hangs up. You did the right thing. You will find out what it costs."
			},
			{
				t: "Go up discreetly and take a look",
				m: 15, l: -5, a: -5, b: 0,
				next: "call_diskret_gefallen",
				r: "Corner office, awards on the wall, and amid it all a monitor whose picture is sideways. Ctrl, Alt, arrow key — three seconds. He nods statesmanlike, as though the pair of you had just averted a crisis together. 'This stays between us.'"
			},
			{
				t: "Whisper the fix down the phone",
				m: 15, l: 0, a: 10, b: 0,
				r: "'Ctrl... Alt... which arrow? There are FOUR.' It takes three attempts, at one point the picture is upside down, and he breathes throughout like a man who has seen terrible things. Then it is straight. He hangs up without a goodbye. That was the thank you."
			}
		]
	},
	{
		id: "call_diskret_2",
		reqStory: "call_diskret_gefallen",
		reqStoryAge: 1,
		title: "The Friend Rings Again",
		text: "The same muted voice, this time without preamble: 'The icon at the bottom has gone. The one for the... spreadsheets. And my calendar is showing a week that does not exist.' A pause, then, almost warmly: 'You are my number now.'",
		opts: [
			{
				t: "Go up discreetly again",
				m: 20, l: 5, a: 5, b: -5,
				r: "Taskbar repaired, calendar view put back. He is on the phone throughout and merely points at things. On the way back you meet his assistant, who looks at you as though she knew exactly what you have become: the number."
			},
			{
				t: "'There is a whole team for this. It is good.'",
				m: 10, l: 0, a: -5, b: 5,
				r: "The long pause again, and this time you hold it. 'As you wish.' It does not sound like agreement. It sounds like a file note. All the same: hanging up today feels like clocking off."
			},
			{
				t: "Send Kevin. Let them get to know each other.",
				m: 10, l: 5, a: 0, b: 5,
				rep: { "Kevin": -5 },
				r: "Kevin comes back an hour later, quieter than usual. 'He called me Justin. Three times.' That is all he says. He is not going to forget that."
			}
		]
	},
	{
		id: "call_diskret_3",
		reqStory: "call_diskret_gefallen",
		reqStoryAge: 2,
		title: "The Return Favour",
		text: "There is a laminated parking permit in your pigeonhole: 'Parking space 2 — revocable'. No sender, no covering note. Parking space 2 is directly beside parking space 1, and the management car parks on parking space 1 every morning. This is not a parking permit. This is a promotion in plain view.",
		opts: [
			{
				t: "Put the permit back in the internal post without comment",
				m: 5, l: 0, a: 5, b: -5,
				r: "Some gifts are leads. You put it back, with no note, exactly as it came. If anybody reads that as an answer, it is the right one."
			},
			{
				t: "Take it and park at the front from now on",
				m: 5, l: 0, a: -10, b: 5,
				r: "No more scraping snow off at the furthest space, no more puddle slalom. The price: the same four metres of small-talk risk every morning. On the way in you practise a nod that looks like everything and nothing."
			},
			{
				t: "Give the permit to Kevin",
				m: 5, l: 0, a: -5, b: 5,
				rep: { "Kevin": 5 },
				r: "Kevin does not ask where it came from. He never asks. The next day his little hatchback is on parking space 2, freshly washed, and management greets him as he gets out, with a small hesitation. Kevin greets them back, with dignity. The balance of the building has shifted."
			}
		]
	},
	{
		id: "call_kalt_1",
		title: "Digitalisation Solutions",
		text: "'Good morning, Brandt is the name, may I take just a moment of your time to present our digitalisation solution—' He talks without full stops. Holistic, scalable, AI-driven. He would 'much prefer to speak to decision-maker level', but you will do. Anybody will do.",
		opts: [
			{
				t: "'Not interested. Genuinely not.'",
				m: 5, l: 0, a: 5, b: 0,
				r: "'I COMPLETELY understand,' he says, and carries on talking. You hang up in the middle of 'scalable'. It feels rude and it feels right."
			},
			{
				t: "'Do come by in person some time.'",
				m: 5, l: 0, a: -5, b: 0,
				next: "call_brandt_kommt",
				r: "It is the oldest trick in the brush-off trade: an invitation that is not one. Brandt goes quiet for a second. 'That... yes! Let's do that!' You hang up contented. That sentence has never once had consequences."
			},
			{
				t: "'Send me some material.'",
				m: 5, l: 5, a: 0, b: 0,
				r: "The email arrives within minutes: forty megabytes, a PDF called 'Journey_final_v7_NEW'. It will grow old unopened."
			}
		]
	},
	{
		id: "call_grabowski_1",
		title: "Ticket 108",
		text: "'Grabowski here. I have been retired for seven years, but that is neither here nor there.' He sounds like a man who writes his letters with a fountain pen. 'Your predecessor gave me his word that Ticket 108 would be resolved. I have rung once a year ever since. Now it is your turn, young man.'",
		opts: [
			{
				t: "Actually go and look the ticket up",
				m: 20, l: -10, a: 5, b: 0,
				next: "call_grabowski_akte",
				r: "It exists. Ticket 108, raised before your time, status: open. The oldest open ticket in the company. Subject: 'Umlauts printing incorrectly on labels'. You print it out. A thing like that gets printed out."
			},
			{
				t: "'The system has no Ticket 108.'",
				m: 5, l: 5, a: 0, b: 5,
				r: "'Your predecessor said that as well. In 2019.' He does not even sound disappointed, only patient. That is the worst of it. 'Until next year, then.' He hangs up first."
			},
			{
				t: "'Tell me about how it was back then.'",
				m: 15, l: 5, a: -10, b: 0,
				r: "Mr Grabowski talks: about labels, about your predecessor, about a works party in which the printer played a part. Twenty minutes of company history at first hand. The ticket stays open, but you part like old acquaintances. 'Until next year,' he says, and it sounds like something to look forward to."
			}
		]
	},
	{
		id: "call_grabowski_2",
		reqStory: "call_grabowski_akte",
		reqStoryAge: 1,
		title: "Seven Years, One Tick Box",
		text: "Ticket 108 lies printed out on your desk, and the solution is a humiliation for everybody involved: the encoding problem from back then has been a tick box in the print settings for years. One tick. Seven years, three predecessors, one tick.",
		opts: [
			{
				t: "Tick the box, close the ticket quietly",
				m: 10, l: 0, a: -5, b: 0,
				r: "Status: resolved. No feedback required. The oldest ticket in the company dies without a sound in a dropdown. Mr Grabowski will ring next year and hear it from a stranger. You solved a ticket and gave away a moment."
			},
			{
				t: "Tick the box, test it, ring Mr Grabowski",
				m: 25, l: -10, a: -15, b: -5,
				r: "The test label prints 'Greetings from Lübeck' with every umlaut in place. You ring him and say the sentence: 'Ticket 108 is resolved.' Mr Grabowski says nothing for a very long time. 'Seven years,' he says at last, solemnly. 'I shall be telling the bowling club about this.' It is the most honest praise of your career."
			}
		]
	},
	{
		id: "call_tennis_1",
		title: "Requests a Call Back",
		text: "There is a note stuck to your keyboard in somebody else's hand: 'Mr Leuchter, Southern Branch, requests a call back. Important.' You ring. It rings for a long time, then a colleague answers: 'Mr Leuchter is on a call just now. Can I pass anything on?'",
		opts: [
			{
				t: "Add the note to the other notes",
				m: 5, l: 10, a: 0, b: 5,
				r: "If it is important, he will ring again. Such is the law, and the law has rarely let you down. The note goes on the pile, and the pile has no comment."
			},
			{
				t: "Leave a message: requests a call back",
				m: 5, l: 0, a: 0, b: 0,
				next: "call_tennis_laeuft",
				r: "'I'll pass it on.' You hang up with an inkling of what you have just set in motion. Somewhere in the south a note is now stuck to a keyboard, and it has your name on it."
			},
			{
				t: "'I'll try again later. And again.'",
				m: 10, l: -5, a: 5, b: 0,
				next: "call_tennis_laeuft",
				r: "Second attempt: in a meeting. Third: lunch break. On the fourth somebody picks up who is only covering and knows nobody, Mr Leuchter included. You give up for today, but honourably."
			}
		]
	},
	{
		id: "call_tennis_2",
		reqStory: "call_tennis_laeuft",
		reqStoryAge: 1,
		title: "The Return Note",
		text: "A new note, different handwriting: 'Mr Leuchter has rung back. You were in the server room. He requests a call back again.' Underneath, smaller: 'He says this is getting absurd.' You ring. 'Mr Leuchter has just gone into a meeting.' Of course he has.",
		opts: [
			{
				t: "Fix a firm time to talk, by email",
				m: 10, l: -5, a: 5, b: 0,
				r: "You write: 'Proposal: tomorrow, first thing, I'll ring you.' The reply comes back promptly and from a calendar robot: Mr Leuchter is in a workshop all day tomorrow. The robot wishes you a pleasant rest of the week."
			},
			{
				t: "Leave a message asking him to leave a message",
				m: 5, l: 5, a: 5, b: 0,
				r: "The colleague in the south takes it down with audible enjoyment. 'The pair of you are quite the institution down here.' You are a running joke at a branch you have never set foot in. That is a kind of fame too."
			},
			{
				t: "Write a letter. Paper, envelope, stamp.",
				m: 15, l: -5, a: -5, b: 0,
				r: "Three sentences in fountain pen, internal post to the south. A letter cannot go into a meeting — that is its strength. The reply, you hear later, is pinned to the branch noticeboard. Contact has still not been made. Pen friendship, however, has."
			}
		]
	},
	{
		id: "call_tennis_3",
		reqStory: "call_tennis_laeuft",
		reqStoryAge: 2,
		title: "Through at Last",
		text: "The phone rings, you pick up, and a voice says: 'Leuchter.' You are both silent for a moment, like two climbers on a summit. Then he says it: 'I honestly can't remember what it was about.' You look at your pile of notes. Neither can you.",
		opts: [
			{
				t: "Reconstruct together what it might have been",
				m: 15, l: 0, a: -10, b: 0,
				r: "You work through the possibilities: the interface? The accounts for the new starter? After five minutes you agree that it has probably sorted itself out — the most reliable solution this company knows. You laugh. It is the first conversation with the south in years that both parties enjoyed."
			},
			{
				t: "'Shall we leave it there?'",
				m: 5, l: 5, a: -10, b: 0,
				r: "'Gladly.' You hang up at the same moment. It could not have been resolved more cleanly."
			}
		]
	},
];
