// i18n-status: translated
//
// 2,476 text fields on four levels (title, text, appName, opts[].t, opts[].r,
// nodes[].text, nodes[].opts[].t, results[].txt), 2,396 translated.
// Seventy-eight are deliberately identical, 51 of them appName values that are
// brands, invented names or the same word in both languages. The rest:
//
//   ONE IS A COMMAND, NOT PROSE. sq_boss_snoop opts[0].r carries
//   CMD:OPEN_INTRANET. engine_events.resolveTerminal compares against it and
//   swaps in event.cmd.intranet. Translate it and the intranet stops opening,
//   with no error message anywhere (GLOSSAR §1).
//
//   TWO ARE THE PRINCE'S OWN ENGLISH. sq_real_prince writes its scam in
//   English in the German tree as well; the same rule as the four already
//   English lines of call_recruit_1 (§2a).
//
//   SIXTEEN ARE TITLES that are already English in the German source or read
//   the same in both languages: "🚨 CRITICAL ALERT", "URGENT BUSINESS
//   PROPOSAL", "Support Bot v2.0", "Best Practice", "ALPHA CIRCLE 💪🔥",
//   "#lunch" (twice), "Meetingpoint K1" (§3c), "FitX Studio" (brand, §5),
//   "Kai (Sales)", "Chantal (DM)", "Julia (Ex)", "Headhunter (LinkedIn)",
//   "Chantal (Marketing)", "Dr. Wichtig", "Kevin", "Markus",
//   "Meeting: 'Color of Success'", "PC LOAD LETTER", "Operation: Broken
//   Arrow", "Ghost in the Shell", "Lisa (Marketing)".
//
//   ONE IS A MACHINE LINE: sq_phone_scam_customs answers the SQL injection
//   with "Error 500: Internal Server Error. Database connection failed."
//
//   AND ONE IS A NAME CARD WITH THE GERMAN FORM OF ADDRESS:
//   sq_raum_phoenix_2c "Herr Rademacher", like `Herr Schmidt (Sales)` in
//   data_calls.js. Together with sq_elster_cat_1 "Frau Elster (Private)" it is
//   the reason the form-of-address probe reports TWO hits in `title` over
//   this tree and none in prose.
//
// Load-bearing values that must never drift (GLOSSAR §1, §4b):
//   sq_janitor_talk  0-0-0-0    the basement code Egon gives away
//   sq_alarm_fail_1  4-7-1-1    the alarm code, a different joke from the
//                               ticket number 4711 elsewhere
//   sq_telegram      1234       the wrong code next to 0000
//   sq_usb_1         'SECRET'   the stick label Gabi reads out, matched to
//                               call_pw_lost (§3c, block 5)
//   sq_wrong_number  403 / 420  error number and port
//   sq_wc_fall_1/3   size thirty-eight, written out (§3c)
//
// The Steam URL in sq_meta_donation must stay bare and followed by a space:
// ResultView turns http(s) runs into anchors and stops at whitespace or ')',
// so a full stop straight after it would be swallowed into the href.

export const sidequests = [

    {
        id: "sq_toilet_1",
        kind: "text",
        title: "Mission: Porcelain",
        text: "Your bladder reports 'Level: 110%'. You are in a hurry. But between you and the redeeming ceramic stands Björn, the head of marketing. He is scanning the corridor like a predator looking for a victim for a 'spontaneous brainstorm'.",
        opts: [
            { 
                t: "Meekly make eye contact", 
                next: "path_toilet_pastel", 
                m: 60, l: -20, a: 30, b: -10, 
                r: "Beginner's mistake! He hooks your arm at once: 'Ah, Miller! Perfect! We need your tech mindset on the new pastel shades for the logo!' You sit in the meeting for 60 minutes. Your bladder very nearly bursts. Hell on earth." 
            },
            { 
                t: "Barge straight through", 
                m: 2, l: 0, a: 10, b: 5, 
                r: "You almost knock him over. 'OUT OF THE WAY! BIOLOGICAL EMERGENCY!' Björn stares after you, appalled. 'No flow, that bloke...', he mutters. Rude, but effective." 
            },
            { 
                t: "'BEHIND YOU! ELON MUSK!'", 
                next: "path_toilet_lie", 
                m: 5, l: 5, a: -5, b: 0, 
                r: "You bellow and point the other way. Björn spins round: 'Where?! The disruptor?!' You use the second and sprint into the cubicle. Close, but successful." 
            }
        ]
    },
    {
        id: "sq_toilet_2a",
        kind: "text",
        title: "Meeting: 'Color of Success'",
        reqStory: "path_toilet_pastel",
        text: "Björn has invited you again. Since you did not run away last time, he takes you for interested. 'Right, IT brain! Which colour suits the server room feng shui better? 'Soft Salmon' or 'Baby Breath Blue'?' Everybody stares at you expectantly.",
        opts: [
            { 
                t: "'Blue cools the hardware.'", 
                m: 30, l: -10, a: 10, b: 0, 
                r: "You give a lecture on thermodynamics. After 30 minutes everyone is asleep. Monotony carries the day." 
            },
            { 
                t: "'Vantablack. Like my soul.'", 
                m: 10, l: 5, a: -5, b: 0, 
                r: "Björn takes eager notes: 'Ooh, edgy! Dark mode for walls! Genius!' They love it. They have made you 'Chief Visionary Officer' against your will." 
            }
        ]
    },
    {
        id: "sq_toilet_2b",
		char: "Egon",
        kind: "text",
        title: "The False Alarm",
        reqStory: "path_toilet_lie",
        text: "Egon the caretaker is in front of you with a toolbox. 'Björn said there was a celebrity here? Or a fire? He said something about 'hot air'. I'm to check the ventilation.'",
        opts: [
            { 
                t: "'That was only a test.'", 
                m: 5, l: 5, a: 0, b: 0, 
                r: "Egon shrugs. 'Not my problem, I'm paid by the hour.' He sits down and takes a break. You have an ally." 
            },
            { 
                t: "'I needed the loo.'", 
                rep: { "Egon": 5 },
                m: 10, l: 0, a: 5, b: 0, 
                r: "Egon gives a dirty laugh. 'Good trick. Have to remember that one.' He passes it on, though. Your reputation as a liar goes up." 
            }
        ]
    },
    {
        id: "sq_cake_1",
        kind: "text",
        title: "The Cake War",
        text: "Some unknown hero has laid on a birthday cake. Mighty chocolate cream gateau! But Chantal (Marketing) is blocking the way and delivering a monologue about her new 'low-carb, high-sadness' diet. Hungry colleagues are already lurking in the background.",
        opts: [
            { 
                t: "Eat the last slice pointedly in front of the boss", 
                next: "path_cake_boss", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, l: 10, a: 5, b: 25, 
                r: "You slide the last slice into your mouth with relish, exactly as the boss reaches for it. He grasps thin air. He stares at your chocolate-smeared lips, his face going dark red. He whispers: 'That was mine...'" 
            },
            { 
                t: "Grab cake and flee", 
                next: "path_cake_sugar", 
                rep: { "Chantal": -5 },
                m: 5, l: 5, a: -5, b: 0, 
                r: "Snap! While Chantal draws breath you seize an enormous slice with your bare hand and vanish into the server room. The cream is sticking to everything, but the sugar rush kicks in immediately." 
            },
            { 
                t: "Wait politely and listen", 
                next: "path_cake_crumb", 
                rep: { "Chantal": 5 },
                m: 30, l: -5, a: 20, b: 0, 
                r: "Grave error. While Chantal lectures on calories, Sales descend on the tray like a swarm of locusts. By the time she has finished, the tray is licked clean. You are left with nothing." 
            }
        ]
    },
    {
        id: "sq_cake_2a",
        kind: "text",
        title: "The Sugar Trip",
        reqStory: "path_cake_sugar",
        text: "You are back at your desk. That was too much sugar on an empty stomach. Your pupils are vibrating. You suddenly see the Matrix code on your screen. The spreadsheet speaks to you: 'Feed me data!'",
        opts: [
            { 
                t: "Lie down under the desk for the sugar crash", 
                m: 30, l: 20, a: 10, b: 10, 
                r: "The crash comes down hard. You curl up under the desk and whimper quietly. Kevin finds you and thinks you are dead. He steals your office chair." 
            },
            { 
                t: "Ride the sugar wave and work straight through", 
                m: 60, l: -30, a: -10, b: 0, 
                r: "You type at the speed of light. Your hands are a blur. You have done three weeks of work in an hour. Sadly all of it is in Wingdings. Never mind, it felt good." 
            }
        ]
    },
    {
        id: "sq_cake_2b",
        kind: "text",
        title: "The Crumb Monster",
        reqStory: "path_cake_crumb",
        text: "Hunger is driving you mad. You are alone in the kitchen. Remains of cream and chocolate sprinkles are still stuck to the empty cake tray. Nobody in sight...",
        opts: [
            { 
                t: "Lick the tray, dignity is relative", 
				 rep: { "Dr. Wichtig": -2 },	
                m: 5, l: 5, a: -10, b: 10, 
                r: "You lick greedily across the metal. The light snaps on. The major client from Japan is standing in the doorway with the boss. They stare at you. You have cream on your nose. The boss says quietly: 'We'll see ourselves out.'" 
            },
            { 
                t: "Eat an old biscuit out of the gap", 
                m: 2, l: 0, a: 5, b: 0, 
                r: "You find a 'Prinzenrolle' biscuit behind the microwave. It is soft. It tastes of dust and onions. You gag it down. Rock bottom is reached." 
            }
        ]
    },
    {
        id: "sq_cake_2c",
		char: "Dr. Wichtig",
        kind: "text",
        title: "The Baking Mandate",
        reqStory: "path_cake_boss",
        text: "The boss summons you to his office. He seems calm, too calm. 'Miller. You have deprived me of a strategic resource (cake). I demand restitution. You will bake for the board meeting tomorrow. And it had better not be a packet mix!'",
        opts: [
            { 
                t: "'I can only do scrambled egg.'", 
				rep: { "Dr. Wichtig": 2 },
                m: 5, l: 0, a: 10, b: 10, 
                r: "The boss grins nastily. 'Then learn. YouTube exists. If this cake does not taste good, I will cancel your leave.' The pressure is inhuman." 
            },
            { 
                t: "'I am an amateur pastry chef!'", 
				rep: { "Dr. Wichtig": 5 },
                m: 10, l: 5, a: -5, b: 0, 
                r: "You buy a gateau at the baker's, take it out of the box and dust flour over it so it looks 'home-made'. The boss loves it. 'Miller, you have hidden talents!' (Cost: €30, but the job is saved.)" 
            }
        ]
    },
    {
        id: "sq_fire_1",
        kind: "text",
        title: "Code Popcorn",
        text: "WOOOP! WOOOP! The siren is howling. It does not smell of an inferno, it smells unmistakably of burnt 'Salty Caramel' popcorn from the kitchenette. Colleagues are running to the assembly point in a panic.",
        opts: [
            { 
                t: "Storm the kitchen!", 
                req: "fire_ext", 
                next: "path_fire_hero", 
                m: 5, l: -20, a: -20, b: -10, 
                r: "You kick the kitchen door in, pull the pin and bellow: 'FIRE IN THE HOLE!' A mighty white cloud engulfs the smoking microwave (and half the floor)." 
            },
            { 
                t: "Seize the moment: loot", 
                next: "path_fire_loot", 
                m: 10, l: 15, a: -10, b: 5, 
                r: "While everyone charges for the fire exits, you slip into the deserted conference room. You steal the 'good biscuits' (the ones with chocolate) and disappear unseen. Chaos is a ladder." 
            },
            { 
                t: "Evacuate dutifully", 
                next: "path_fire_rain", 
                m: 45, l: -10, a: 10, b: -5, 
                r: "You follow the green signs. Outside the rain is coming in sideways. You stand freezing in the car park for 45 minutes while the fire brigade establishes that it was only popcorn." 
            }
        ]
    },
    {
        id: "sq_fire_2a",
		char: "Egon",
        kind: "text",
        title: "Snow Flurry",
        reqStory: "path_fire_hero",
        text: "The smoke has gone. What it leaves behind is a kitchen dusted entirely white. Egon the caretaker studies the work from the doorway and runs a finger across the powdered table. He gives you a withering look.",
        opts: [
            { 
                t: "'Hazard neutralised!'", 
                rep: { "Egon": -5 },
                m: 5, l: 0, a: -5, b: 5, 
                r: "'That was a bag of popcorn, Rambo!' Egon presses a broom into your hand. 'You are not leaving here until it is clean.' Your hero status crumbles as you sweep." 
            },
            { 
                t: "'Cough, the smoke...' - and away",
                rep: { "Egon": -10 }, 
                m: 2, l: 5, a: 0, b: 0, 
                r: "You fake smoke inhalation and stagger off. Egon curses after you. He will have his revenge (tomorrow your office chair will probably jam)." 
            }
        ]
    },
    {
        id: "sq_fire_2b",
        kind: "text",
        title: "Sweet Loot",
        reqStory: "path_fire_loot",
        text: "The alarm is over. You are at your desk munching the stolen biscuits. Until an all-staff email from the boss's secretariat pops up: 'Who stole the catering for the supervisory board during the evacuation?! We are reviewing the cameras!'",
        opts: [
            { 
                t: "Eat the evidence biscuits quickly", 
                m: 5, l: 5, a: 10, b: 0, 
                r: "You stuff three biscuits into your mouth at once. You very nearly choke; the evidence is gone. Your stomach is in revolt, your conscience is in a sugar coma." 
            },
            { 
                t: "Plant the packet on Kevin",
                rep: { "Kevin": -10 },
                m: 5, l: 0, a: -5, b: 5, 
                r: "You put the empty packet on Kevin's desk. Shortly afterwards you hear screaming from his office. That was wicked. Very wicked. But effective." 
            }
        ]
    },
    {
        id: "sq_fire_2c",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Networking in the Drizzle",
        reqStory: "path_fire_rain",
        text: "Out in the car park you end up standing right next to Dr Wichtig. He is freezing in his shirtsleeves and shivering. He has spotted you. There is no escaping the small talk.",
        opts: [
            { 
                t: "Gallantly offer him your jacket", 
				rep: { "Dr. Wichtig": 10 },
                m: 10, l: -5, a: 15, b: -15, 
                r: "You give him your jacket. He takes it gratefully. 'Good man, Miller.' You freeze your backside off, tomorrow you will certainly be ill, and the bonus points are banked." 
            },
            { 
                t: "Make a joke: 'Lovely weather!'", 
				rep: { "Dr. Wichtig": -5 },
                m: 5, l: 0, a: -5, b: 10, 
                r: "He stares at you as though you were deranged. Water drips from his nose. 'Very funny.' He turns away. That was uncomfortable." 
            }
        ]
    },
    {
        id: "sq_usb_1",
        kind: "text",
        title: "Lost Property",
        text: "There is a USB stick lying in the corridor, marked 'SECRET' and carrying a skull sticker. It lies exactly in the blind spot of the security camera.",
        opts: [
            { 
                t: "Kick it into the bin", 
                m: 2, l: 0, a: 0, b: 0, 
                r: "One well-aimed kick sends the security risk under the drinks machine. Out of sight, out of mind." 
            },
            { 
                t: "Quietly pocket it", 
                loot: "usb_stick", 
                next: "path_usb_keep", 
                m: 5, l: 0, a: 0, b: 0, 
                r: "In one flowing movement you make the stick disappear into your pocket. Nobody saw it. It belongs to you now. But what is on it?" 
            },
            { 
                t: "Dutifully hand it in at reception", 
                next: "path_usb_gabi_fail", 
                rep: { "Gabi": 5 },
                m: 10, l: -5, a: 0, b: -5, 
                r: "You take it to Gabi. 'Oh, thanks! 'Secret'? Exciting! I'll just have a quick look to see whose it is before I put it in lost property...'" 
            }
        ]
    },
    {
        id: "sq_usb_2a",
        kind: "text",
        title: "Pandora's Box",
        reqStory: "path_usb_keep",
        text: "You are at your desk turning the stick over in your fingers. The word 'SECRET' is practically burning. Is it the redundancy list? Bitcoin? Or just rubbish?",
        opts: [
            { 
                t: "Plug it in and risk it", 
                m: 15, l: 5, a: -5, b: 10, 
                r: "Curiosity wins. You open the folder. It is... 500 pages of vampire fan fiction, written by Dr Wichtig?! 'The count bit into the neck of the bookkeeper.' You now hold powerful blackmail material." 
            },
            { 
                t: "Format it and keep it", 
                rem: "usb_stick", 
                m: 5, l: 0, a: 0, b: 0, 
                r: "Better safe than sorry. You wipe everything beyond recovery. Now you have an empty 64GB stick for your holiday photos. Dull, but useful. (Item removed, stick 'used'.)" 
            }
        ]
    },
    {
        id: "sq_usb_2b",
		char: "Gabi",
        kind: "text",
        title: "Gabi's Mistake",
        reqStory: "path_usb_gabi_fail",
        text: "At some point Gabi waves you over urgently. She is chalk white. Russian techno is blaring out of her speakers. Half-naked skeletons are dancing on the screen. 'I only clicked on 'Invoice.exe'! Get rid of it before the boss comes!'",
        opts: [
            { 
                t: "Laugh and walk away", 
                rep: { "Gabi": -10 },
                m: 2, l: 5, a: -5, b: 0, 
                r: "'Well now, skipped the IT security training, Gabi?' You leave her alone with her techno problem. She will hate you for it, but it looks extremely funny." 
            },
            { 
                t: "Help out and pull the plug", 
                rep: { "Gabi": 5 },
                m: 5, l: -5, a: 10, b: 0, 
                r: "You crawl under the desk and rip the power cable out. The music dies. Gabi breathes heavily. 'This stays between us, all right? Here, have a biscuit.'" 
            }
        ]
    },
    {
        id: "sq_printer_1",
        kind: "text",
        title: "PC LOAD LETTER",
        text: "The department printer is flashing red in a panic. The display reports: 'SEVERE PAPER JAM IN TRAY 2'. You open tray 2 – it is empty. At the same moment the fax module rings shrilly like an old telephone, and a distorted voice blares out of the speaker: 'HELLO?! CAN YOU HEAR ME?! I WANT MY PEAS!'",
        opts: [
            { 
                t: "Pick up the handset and answer the fax", 
                next: "path_printer_call", 
                m: 5, l: 5, a: 0, b: 0, 
                r: "You press the green button. 'Miller speaking?' - 'WHO? I WANT THE FROZEN FOOD MAN!' The printer starts making a rattling noise, as though it were digesting the conversation." 
            },
            { 
                t: "Apply percussive maintenance", 
                req: "hammer", 
                next: "path_printer_smash", 
                m: 2, l: 0, a: -20, b: 10, 
                r: "WHAM! You give the leased device a massive uppercut with the hammer. The ringing stops. Plastic splinters. The display goes black. Peace at last." 
            },
            { 
                t: "Strictly logically, top up cyan against the paper jam", 
                next: "path_printer_leasing", 
                m: 10, l: -5, a: 5, b: 0, 
                r: "You follow printer logic: when it says 'paper', it means 'cyan'. You fumble in a cartridge you found in the cupboard. The flashing stops. For now." 
            }
        ]
    },
    {
        id: "sq_printer_2a",
        kind: "text",
        title: "The Leasing Inquisition",
        reqStory: "path_printer_leasing",
        text: "A man in a grey overall is standing at the printer. The back of it reads 'Print & Pray Solutions'. He holds the cyan cartridge up like an exhibit in a murder trial. 'Who installed this non-certified third-party ink? That is a breach of clause 128 of the leasing contract. I shall have to take the device out of service.'",
        opts: [
            { 
                t: "Let him get on with it, decommissioning underway", 
                m: 20, l: 10, a: -5, b: 10, 
                r: "He wheels the printer away on a sack truck. 'Replacement arrives in 6-8 weeks from overseas.' The colleagues' eyes swing between you and the empty space. You have abolished printing. A win for the environment, really." 
            },
            { 
                t: "'Would you take the old toner as well?'", 
                m: 5, l: 0, a: 5, b: -5, 
                r: "He sniffs at the old cartridge. 'Is that original HP High-Yield? ... All right then. I shall turn a blind eye. But never print PDFs again, it does not like those.'" 
            }
        ]
    },
    {
        id: "sq_printer_2b",
        kind: "text",
        title: "The Paper Tsunami",
        reqStory: "path_printer_call",
        text: "You come back into the corridor. The floor is carpeted in paper. The printer is running flat out, endlessly printing black pages full of zeroes and ones. It is evidently trying to transcribe the earlier phone call. The stack of paper will reach the ceiling before long.",
        opts: [
            { 
                t: "Hand the paper out as notepads", 
                m: 15, l: -5, a: -5, b: 0, 
                r: "Recycling! You bind the misprints into pads ('Matrix Edition') and distribute them round the office. The colleagues are delighted with the free stationery. Creative problem solving." 
            },
            { 
                t: "Pull the plug", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "You kill the power. The printer gives one last, sad beep. You are ankle-deep in rubbish. It is over." 
            }
        ]
    },
    {
        id: "sq_printer_2c",
        kind: "text",
        title: "The Smart Upgrade",
        reqStory: "path_printer_smash",
        text: "In the place of the old printer there now stands a gleaming, futuristic device: the 'PrintHub 360 AI'. It has no buttons, only an enormous touchscreen. On it: 'To print, please take out a subscription. €19.99 per page (black and white).'",
        opts: [
            { 
                t: "Take out the subscription on the company card", 
				rep: { "Dr. Wichtig": -5 },
                m: 10, l: 0, a: 10, b: 20, 
                r: "You book the 'Platinum Enterprise Package'. The boss sees the debit on his phone and starts hyperventilating. Still, he can print now (sometimes)!" 
            },
            { 
                t: "Stick an 'OUT OF ORDER' sign on it", 
                m: 2, l: 5, a: -5, b: 5, 
                r: "You give up. The future is too stupid. You recommend 'pen and paper' to the colleagues and go to lunch." 
            }
        ]
    },
    {
        id: "sq_investigation",
        kind: "text",
        title: "The Missing Mouse",
        text: "Ms Erna from reception is distraught. Her beloved 'lucky mouse' (a grey soft toy) has gone. The chief suspect is Bello, the office dog, who is panting innocently under the desk and pretending he cannot understand a word.",
        opts: [
            { 
                t: "Play detective and search the dog basket", 
                next: "path_investigation_thief", 
                m: 30, l: -10, a: 10, b: -10, 
                r: "You rummage through his slobbery nest. Aha! Between a bone and an old sock you find the mouse. It is wet and disgusting. Erna is overjoyed, Bello growls at you quietly. You have stolen his toy." 
            },
            { 
                t: "Interrogate Bello by barking at him", 
                next: "path_investigation_leader", 
                m: 5, l: 10, a: -10, b: 10, 
                r: "You get down on all fours and bark at him loudly: 'WOOF! WHERE IS IT?!' Bello is confused at first, then wags enthusiastically. The boss walks past: 'Miller... everything all right?' Never mind, the dog respects you now." 
            },
            { 
                t: "Fetch a new mouse from the stores", 
                next: "path_investigation_bored", 
                m: 5, l: -5, a: 0, b: 0, 
                r: "You simply take a new promotional mouse out of the cupboard. Erna accepts it hesitantly. 'It is not the same... but thank you.' Bello yawns. He is bored." 
            }
        ]
    },
    {
        id: "sq_investigation_2a",
        kind: "text",
        title: "The Hostage Taking",
        reqStory: "path_investigation_thief",
        text: "You want to print. Bello is lying *on* the printer. He growls when you come closer. He is plainly demanding compensation for the confiscated lucky mouse. The paper tray is his hostage.",
        opts: [
            { 
                t: "Lure him away with the laser pointer", 
                m: 10, l: 5, a: 0, b: 0, 
                r: "You send the red dot dancing down the corridor. Bello loses his mind, skids on the parquet and chases the dot all the way into Marketing. The printer is yours again." 
            },
            { 
                t: "Call the boss: 'The dog is sabotaging the work!'", 
			    rep: { "Dr. Wichtig": 2 },	
                m: 15, l: 0, a: 20, b: 5, 
                r: "The boss arrives, sees the dog and says in a baby voice: 'And who is a fine printer guardian, then? Who is?' He fusses over Bello for 10 minutes. You do not get your printout." 
            },
            { 
                t: "Sacrifice a doughnut to him", 
                rem: "donut", 
                m: 5, l: 0, a: -5, b: 0, 
                r: "You put the doughnut on the floor. Bello jumps down and inhales the pastry. The way to the printer is clear. Bribery works on animals too." 
            }
        ]
    },
    {
        id: "sq_investigation_2b",
        kind: "text",
        title: "Loot for the Alpha",
        reqStory: "path_investigation_leader",
        text: "Bello comes into your office wagging his tail. He sees you as pack leader. He proudly lays his latest 'kill' on your feet: an expensive Italian men's shoe. It is thoroughly slobbered on and lightly chewed. It definitely belongs to the boss.",
        opts: [
            { 
                t: "Praise Bello: 'Good boy!'", 
                m: 10, l: 10, a: -20, b: 20, 
                r: "You give him a fuss. Bello is so happy that he runs off and fetches the *other* shoe as well. Now you have the complete pair. If the boss walks in now, you are dead." 
            },
            { 
                t: "Clean up the crime scene, meaning polish the shoe", 
                m: 20, l: -10, a: 5, b: -5, 
                r: "You try frantically to get the slobber off with tissues. That night you put the shoe outside the boss's door in secret. That was close." 
            },
            { 
                t: "Quietly kick the shoe under the sofa", 
                m: 5, l: 0, a: 10, b: 0, 
                r: "You make the evidence disappear. Bello looks disappointed, then immediately fetches the shoe back out. He wants to play fetch. With a €500 shoe." 
            }
        ]
    },
    {
        id: "sq_investigation_2c",
        kind: "text",
        title: "Marking Territory",
        reqStory: "path_investigation_bored",
        text: "Because nobody played with him, Bello has found his own entertainment. He is in the server room (the door was open) and lifting his leg against Rack 3. That is the main switch.",
        opts: [
            { 
                t: "Dive to intercept the stream", 
                m: 5, l: -5, a: 10, b: -10, 
                r: "You throw yourself between them. Your trousers are wet (and warm), but the €10,000 switch is dry. You are a hero and you smell strongly." 
            },
            { 
                t: "Clap loudly and shout 'BAD DOG!'", 
                m: 2, l: 0, a: 10, b: -5, 
                r: "Bello takes fright, tucks his tail in and runs away. A few drops have hit the casing, but nothing critical. You have some wiping to do." 
            },
            { 
                t: "Film it for YouTube", 
                m: 5, l: 10, a: -10, b: 50, 
                r: "You keep the camera on it. *HISS-SIZZLE*. The switch fails. The video 'Dog vs Internet' goes viral. You lose your job but become an influencer." 
            }
        ]
    },
    {
        id: "sq_loose_cable",
        kind: "text",
        title: "The Trip Hazard",
        text: "There is a grey LAN cable lying across the corridor. It looks dangerous. Dr Wichtig will be along here any moment, looking at his phone.",
        opts: [
            { 
                t: "Take it as lost property", 
                loot: "cable", 
                next: "path_cable_missing",			
                m: 5, l: 5, a: 0, b: 10, 
                r: "Snap, pocketed. 'Anyone who leaves this lying about clearly does not need it.' You have a long cable now. Inventory +1." 
            },
            { 
                t: "Leave it and watch", 
                m: 2, l: 10, a: 5, b: -5, 
                r: "The boss steps elegantly over it without looking up. You are disappointed. No action." 
            },
            { 
                t: "Secure it with tape", 
                req: "tape", 
                next: "path_cable_stuck",
                rep: { "Dr. Wichtig": 2 },					
                m: 5, l: -5, a: 0, b: -5, 
                r: "You wind duct tape neatly over it. That is not moving another millimetre. Accident prevention regulations: satisfied." 
            }
        ]
    },
    {
        id: "sq_loose_cable_2a",
        kind: "text",
        title: "Rock Solid",
        reqStory: "path_cable_stuck",
        text: "An external engineer is kneeling in the corridor, swearing. 'Who has concreted my test cable in here?! That was only temporary! I cannot get it off without ripping the carpet up!' He tugs at the duct tape in vain.",
        opts: [
            { 
                t: "Help out with a Stanley knife", 
                m: 20, l: -10, a: 5, b: -5, 
                r: "Together you cut the cable out of the floor. The carpet now has an ugly gash. 'Let us just say that was wear and tear', says the engineer." 
            },
            { 
                t: "'Safety first!'", 
                m: 5, l: 5, a: 10, b: 0, 
                r: "'Trip hazards are forbidden!' The engineer stares at you with hatred. He simply cuts the cable off at both ends and leaves the rest stuck down. A monument for the ages." 
            }
        ]
    },
    {
        id: "sq_loose_cable_2b",
        kind: "text",
        title: "Blind Spot",
        reqStory: "path_cable_missing",
        text: "A man from 'Secure & Safe' is walking about searching. 'Damn it! Where is the patch cable? I was supposed to install the new 4K surveillance camera for the boss! He wants to see who keeps leaving early!' No cable, no picture.",
        opts: [
            { 
                t: "'Probably the cleaning crew.'", 
                m: 5, l: 5, a: -5, b: 0, 
                r: "'Blast. Then I shall have to come back tomorrow.' He packs the camera away again. You have bought the workforce (and yourself) another day of freedom. Hero!" 
            },
            { 
                t: "'I only found this lying about.'", 
                rem: "cable", 
				rep: { "Dr. Wichtig": 2 },					
                m: 5, l: -5, a: 10, b: -10, 
                r: "You hand it over. He mounts the camera. It now points straight at YOUR office door. The boss sees everything. You have shot yourself in the foot." 
            }
        ]
    },
    {
        id: "sq_package_open_1",
        kind: "text",
        title: "The Cardboard Fortress",
        text: "A parcel for IT is on your desk. The sender was evidently paranoid and got through an entire roll of duct tape. There is no flap, no beginning, only smooth brown infinity.",
        opts: [
            { 
                t: "Hurl the box against the wall", 
                next: "path_package_glass", 
                m: 5, l: 5, a: -20, b: 10, 
                r: "CRASH! The parcel bursts open like a ripe melon. Sadly it was the delivery of the new 'Magic Glass Trackpads' for the board. The sound of splintering glass is somehow... satisfying." 
            },
            { 
                t: "Open it surgically with the screwdriver", 
                req: "screw", 
                next: "path_package_stink", 
                m: 5, l: -5, a: -5, b: 0, 
                r: "With the precision of a serial killer you stab through the layers. Rip. Open. Contents: 50 cheap promotional mouse mats from China that reek of a chemical spill." 
            },
            { 
                t: "Brute force with the front door key", 
                next: "path_package_toner", 
                m: 10, l: -5, a: 10, b: 0, 
                r: "You saw wildly at the tape until the box gives way. Your key is now bent through 45 degrees, but the parcel is open. Inside: one XXL toner cartridge." 
            }
        ]
    },
    {
        id: "sq_package_open_2a",
        kind: "text",
        title: "The Chemical Accident",
        reqStory: "path_package_stink",
        text: "The stench of the 50 rubber mats spreads through the office. It smells of burnt tyres and headaches. Colleagues start coughing. Chantal asks whether we are redecorating.",
        opts: [
            { 
                t: "Hand them out as 'aromatherapy'", 
				rep: { "Dr. Wichtig": -2 },	
                m: 15, l: -10, a: 5, b: 5, 
                r: "You go round and put a mat on every desk. Work is work. After 10 minutes everyone is high on the fumes and giggling stupidly. The boss asks why nobody is working." 
            },
            { 
                t: "Build a rubber fortress", 
                m: 10, l: 10, a: -10, b: 10, 
                r: "You stack the mats around your monitor. You sit in a stinking igloo. Nobody comes within 2 metres of you. Glorious peace, though no work gets done." 
            },
            { 
                t: "Throw them out of the window", 
                m: 5, l: 0, a: -5, b: 20, 
                r: "You frisbee the things out of the fourth floor one by one. Down below the security service complains about 'toxic rain'. The air is clean, though." 
            }
        ]
    },
    {
        id: "sq_package_open_2b",
        kind: "text",
        title: "The Key Moment",
        reqStory: "path_package_toner",
        text: "The toner needs to go to the stores, and you appear to have punctured it with the key. A fine trail of black powder is trickling along behind you. And your front door key looks like a corkscrew.",
        opts: [
            { 
                t: "Straighten the key in the lock", 
                m: 30, l: 10, a: 20, b: 0, 
                r: "You put the bent key into your office door and push. SNAP. Broken off. Now you cannot get into your flat this evening AND you cannot get out of the office. Perfect." 
            },
            { 
                t: "Shake the toner, it might help", 
				rep: { "Dr. Wichtig": -5 },	
                m: 5, l: 0, a: 20, b: 20, 
                r: "POOF! The cartridge explodes in a black cloud. You look like a chimney sweep out of the 19th century. The boss asks whether that is 'blackfacing'. Risk of a written warning." 
            },
            { 
                t: "Hold the hole shut with a finger", 
				rep: { "Dr. Wichtig": 2 },	
                m: 10, l: -5, a: 10, b: -10, 
                r: "You run to the printer. Your finger is permanently black now. You look as though you had necrotic tissue. The toner is saved, though, and the boss does not have to buy a new one." 
            }
        ]
    },
    {
        id: "sq_package_open_2c",
		char: "Dr. Wichtig",
        kind: "text",
        title: "The Manager's Jigsaw",
        reqStory: "path_package_glass",
        text: "The boss comes in cheerfully. 'Has my Magic Trackpad arrived? The parcel was with you!' You point at the heap of glass dust and electronic scrap in the corner.",
        opts: [
            { 
                t: "'That is liquid glass technology.'", 
				rep: { "Dr. Wichtig": 5 },	
                m: 5, l: 10, a: -5, b: -15, 
                r: "'It is meant to be like that. Just pour it on the desk and wait.' The boss nods, deeply impressed: 'The future is mad.' He wanders off satisfied - and completely forgets what he originally came for." 
            },
            { 
                t: "Stick it together with duct tape", 
				req: "tape", 
                rep: { "Dr. Wichtig": -5 },	
				m: 20, l: -10, a: 0, b: -20, 
                r: "You wrap the scrap in tape. It looks like a potato. 'Here you are. A prototype from Silicon Valley.' He prods at it. 'Ergonomic!', he says, delighted. Complete success." 
            },
            { 
                t: "'It is a self-assembly kit!'", 
                m: 10, l: 5, a: 0, b: -5, 
                r: "'That is the IKEA edition. Good for the motor skills.' He looks sceptical, but takes the box of shards away with him. A busy boss is a harmless boss." 
            }
        ]
    },
    {
        id: "sq_shelf_1",
        kind: "text",
        title: "The Leaning Tower of Toner",
        text: "In the stores the heavy-duty shelving with the expensive laser toners is tilting alarmingly to one side. One wrong gust of air and there will be a €5,000 explosion of fine black dust.",
        opts: [
            { 
                t: "Do it properly with rawlplugs", 
                next: "path_shelf_bauamt", 
                m: 60, l: -20, a: 15, b: -5, 
                r: "You fetch the hammer drill. 60 minutes of noise, dust and sweat. The shelving now stands perfectly plumb. Nobody notices, nobody thanks you, and your back hurts." 
            },
            { 
                t: "Stick up a warning note as a disclaimer", 
                next: "path_shelf_a38", 
                m: 5, l: 5, a: 0, b: 0, 
                r: "You scrawl 'CAUTION! COLLAPSE HAZARD!' on a Post-it, slap it on the upright and go happily to lunch. Legally you are off the hook. Physics is unmoved." 
            },
            { 
                t: "An orgy of cable ties", 
                req: "zip_ties", 
                next: "path_shelf_iso", 
                m: 10, l: -5, a: 0, b: 0, 
                r: "You lash the shelving to a heating pipe with a dozen cable ties. It looks like bondage for furniture, but it is rock solid. Nothing lasts longer than a temporary fix." 
            }
        ]
    },
    {
        id: "sq_shelf_2a",
        kind: "text",
        title: "ISO 9001 Certification",
        reqStory: "path_shelf_iso",
        text: "The safety officer is standing in front of your cable-tie construction. He taps at his clipboard. 'That is a *non-permanent load restraint on thermal conductors*. For that I need form Z-12 for polymer connections and proof of heat resistance to DIN 4102.'",
        opts: [
            { 
                t: "'Those are aerospace ties.'", 
                m: 5, l: 5, a: -5, b: 5, 
                r: "'Special manufacture for NASA, Inspector.' He blinks. 'Ah, I see. Well then... please enter that retrospectively in annex 4b.' He ticks a box. Competence through lying." 
            },
            { 
                t: "Find form Z-12 and fill it in", 
                m: 45, l: -10, a: 20, b: 0, 
                r: "You spend 45 minutes googling the tensile strength of plastic and filling in a pointless form. The inspector files it without reading it. 'Order must be kept.'" 
            }
        ]
    },
    {
        id: "sq_shelf_2b",
        kind: "text",
        title: "Application for Structural Alteration",
        reqStory: "path_shelf_bauamt",
        text: "Facilities Management has discovered the drill hole. 'Have you been drilling into the *F90 fire wall*?! Without the 'Application to Penetrate Fire Resistance Classes' (triplicate carbon, pink)?! That has to be taken out and plastered over immediately!'",
        opts: [
            { 
                t: "'That was imminent danger!'", 
                m: 10, l: 0, a: 5, b: 0, 
                r: "You quote the Health and Safety Act, section 9. 'I saved lives!' The facilities man wavers. 'All right then. But submit form 'Heroism in Office' afterwards.' Phew." 
            },
            { 
                t: "Pull the wall plug out and put chewing gum in", 
                m: 5, l: 5, a: -5, b: 0, 
                r: "You take the screw out. The shelving wobbles again. You stuff chewing gum into the hole and paint over it with Tipp-Ex. 'What hole? I see no hole.' Problem deferred." 
            }
        ]
    },
    {
        id: "sq_shelf_2c",
        kind: "text",
        title: "The Place That Sends You Mad",
        reqStory: "path_shelf_a38",
        text: "The shelving has been closed off by the TÜV ('red tape'). To order a new one you need **Permit A38**. The procurement office says: 'You get A38 from Facilities Management.' Facilities says: 'No, Accounts does A38.' Accounts says: 'A38? That was replaced by the blue form B-65, but you only get that from the gatehouse.'",
        opts: [
            { 
                t: "Ask the boss: 'Have you got an A38?'",
				rep: { "Dr. Wichtig": -2 },	
                m: 5, l: 0, a: 10, b: 20, 
                r: "The boss stares at you. 'Miller, do not take drugs during working hours.' He simply rips the barrier tape off. 'There. Problem solved.' The boss has his uses." 
            },
            { 
                t: "Go to the gatehouse and take the quest", 
                m: 60, l: -20, a: 50, b: -10, 
                r: "You run round the building for 60 minutes. Gatehouse -> post room -> Works Council -> canteen. What you end up with is form **A39** ('Application for the Issue of an Application'). You break down in tears. The shelving stays broken." 
            },
            { 
                t: "Buy shelving at IKEA and put it up quietly", 
                m: 30, l: -5, a: -10, b: 10, 
                r: "You go round the bureaucracy, buy a Billy shelf out of your own money and put it up at night. Nobody asks questions. You have beaten the system and are €30 poorer." 
            }
        ]
    },
    {
        id: "sq_noise_1",
        kind: "text",
        title: "Operation: Pebble",
        text: "Outside, a scene out of 'Transformers' is playing out. A heavy haulage convoy has unloaded a digger the size of a detached house. Along with three pneumatic drills and a device that looks like a laser borer. The target of this armada: one 5cm pothole in the pavement. The ground is shaking.",
        opts: [
            { 
                t: "Bellow out of the window", 
                next: "path_noise_foreman", 
                m: 5, l: 5, a: -5, b: 0, 
                r: "You open the window and shout over the noise: 'DO YOU REALLY NEED THE DEATH STAR FOR THAT?! IT IS A HOLE, NOT A CRATER!' The foreman looks up." 
            },
            { 
                t: "Put the headphones on", 
                req: "headphones", 
                next: "path_noise_zen", 
                m: 2, l: 5, a: -20, b: 0, 
                r: "Click. Noise cancelling on 'maximum'. The apocalypse outside becomes a gentle vibration in your backside. You work in the eye of the storm." 
            },
            { 
                t: "Close the window", 
                next: "path_noise_sauna", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "You ram the window shut. The noise dulls, but the vibrations send your cup wandering across the desk. The air in the office turns stuffy at once." 
            }
        ]
    },
    {
        id: "sq_noise_2a",
        kind: "text",
        title: "The Awakening",
        reqStory: "path_noise_zen",
        text: "You take the headphones off because your monitor is wobbling. Outside there is silence. You look out. The pothole has gone. So has the pavement. There is now simply an enormous crater with the digger stuck in it. A workman scratches his head.",
        opts: [
            { 
                t: "Blinds down", 
                m: 2, l: 5, a: 0, b: 0, 
                r: "What you cannot see did not happen. You lower the blind and carry on working in the dark." 
            },
            { 
                t: "Take a photo", 
				rep: { "Dr. Wichtig": -2 },	
                m: 5, l: 10, a: -5, b: 5, 
                r: "Nobody will believe this. '#GermanEngineering'. The boss spots you at the window: 'Miller, are you documenting the building works or are you working?'" 
            }
        ]
    },
    {
        id: "sq_noise_2b",
        kind: "text",
        title: "The Plate Compactor",
        reqStory: "path_noise_sauna",
        text: "Outside they have now fired up the 'Mega Plate Compactor 3000'. Your whole body is vibrating. Your teeth are chattering. The spreadsheet rows blur on the monitor. Typing is impossible.",
        opts: [
            { 
                t: "Give up and take a break", 
				rep: { "Dr. Wichtig": -2 },	
                m: 15, l: 10, a: -10, b: 10, 
                r: "You go into the kitchen (other side of the building). There only the water in the glass shakes. The boss asks: 'Fleeing, are we?' You just nod without a word." 
            },
            { 
                t: "Type in time with it", 
                m: 10, l: -5, a: 10, b: 0, 
                r: "You try to compensate for the vibrations. The result: 'Deeeear Siiiirrr...'. You give up in exasperation." 
            }
        ]
    },
    {
        id: "sq_noise_2c",
        kind: "text",
        title: "Budget Planning",
        reqStory: "path_noise_foreman",
        text: "The foreman cheerfully bellows back: 'HAS TO GO! WE STILL HAVE BUDGET FOR THIS YEAR! IF WE DO NOT BURN THE DIESEL WE GET LESS NEXT YEAR! WANT A GO ON THE DIGGER?'",
        opts: [
            { 
                t: "Accept the offer: 'Yes, I do!'", 
				rep: { "Dr. Wichtig": -15 },	
                m: 30, l: 20, a: -50, b: 20, 
                r: "You run downstairs. 20 minutes later you are in the cab digging up the company's front lawn. The boss watches out of the window, speechless. It was worth it." 
            },
            { 
                t: "Decline with a shake of the head", 
                m: 2, l: 0, a: 10, b: 0, 
                r: "You close the window. Bureaucracy in its purest form. Your faith in humanity drops by 10 points." 
            }
        ]
    },
    {
        id: "sq_loot_crate_1",
        kind: "text",
        title: "The 'Free to a Good Home' Box",
        text: "Somebody has put a box marked 'FREE TO A GOOD HOME' out in the corridor. A biotope of dust, old cables and forgotten office dreams.",
        opts: [
            { 
                t: "Rummage blindly for the red 'thing'",
                loot: "stressball", 
                next: "loot_crate_taken",
                m: 10, l: 5, a: 0, b: 0, 
                r: "Ugh... what is that? Ah, only an old rage ball! Slightly tacky, but squeezable." 
            },
            { 
                t: "Investigate the silver glint", 
                loot: "tape", 
                next: "loot_crate_taken",
                m: 10, l: 5, a: 0, b: 0, 
                r: "The holy grail of repair! An almost full roll of duct tape. That will patch the universe." 
            },
            { 
                t: "Salvage the heavy 'book'", 
                loot: "manual", 
                next: "loot_crate_taken",
                m: 10, l: 5, a: 0, b: 0, 
                r: "You haul it out of the pile. It is... a 'Windows 95 manual'! Ancient knowledge for true connoisseurs." 
            },
            { 
                t: "Reach bravely into the tangle of cables", 
                loot: "cable", 
                next: "loot_crate_taken",
                m: 10, l: 5, a: 0, b: 0, 
                r: "You wrestle with the knot and win! A long grey LAN cable belongs to you now." 
            }
        ]
    },
    {
        id: "sq_loot_crate_2",
		char: "Egon",
        kind: "text",
        title: "The Collector",
        reqStory: "loot_crate_taken",
        text: "Egon the caretaker heads you off in the corridor. He seems delighted. 'Now then! I saw you fished something out of that box! Somebody with taste at last! I am clearing out the 1998 archive at the moment. I have 500 kilos of dot-matrix paper and boxes of floppy disks left. Do you want those as well? Otherwise I have to scrap them!'",
        opts: [
            { 
                t: "Er... no thanks, that will do.", 
                rep: { "Egon": -5 },
                m: 2, l: 0, a: 0, b: 0, 
                r: "Egon's smile vanishes instantly. 'Philistine. Young people today have no idea what to do with good fanfold paper.' He shuffles off, offended." 
            },
            { 
                t: "'Yes! I will take the lot!'", 
                rep: { "Egon": 10 },
                m: 30, l: 10, a: -10, b: 0, 
                r: "You follow Egon down to the basement. The two of you spend half an hour digging through ancient hardware. You take nothing away with you, and Egon is happy that somebody has appreciated his 'treasure'." 
            }
        ]
    },
    {
        id: "sq_chair_1",
        char: "Dr. Wichtig",
        kind: "text",
        title: "The Boss's Chair",
        text: "The boss has a new 'Ergonomic 3000'. His old leather chair stands abandoned in the corridor with the bulky rubbish. The leather is worn through, but the padding is still classes better than your current 'concrete chair'.",
        opts: [
            { 
                t: "Rescue the whole chair and tape it up", 
                req: "tape", 
                rep: { "Dr. Wichtig": -5 },
                next: "path_chair_new", 
                m: 20, l: 10, a: -20, b: 0, 
                r: "You drag the monster into your office. One roll of duct tape for the loose armrest and it is as good as new. Mad Max looks, S-Class comfort." 
            },
            { 
                t: "Steal only the luxury castors", 
                req: "screw", 
                rep: { "Dr. Wichtig": -5 },
                next: "path_chair_new", 
                m: 10, l: 5, a: -10, b: 0, 
                r: "You unscrew the high-end skate castors and fit them under your own chair. No more tripping over carpet edges!" 
            },
            { 
                t: "Ignore it, your back is made of steel", 
                m: 2, l: 0, a: 5, b: 0, 
                r: "You walk on past. Later in the day the sciatica reports for duty. Your own fault." 
            }
        ]
    },
    {
        id: "sq_chair_2",
        kind: "text",
        title: "Succession to the Throne",
        reqStory: "path_chair_new",
        text: "Ahhh. The seating upgrade makes itself felt. You glide silently through the office and rock gently. Your aggression evaporates. The one drawback: stubborn 'Paw Patrol' stickers are still stuck all over it, courtesy of the boss's son. Marshall the fire dog stares at you from the armrest.",
        opts: [
            { 
                t: "Try to pick the stickers off", 
                m: 15, l: -5, a: 5, b: 0, 
                r: "You scratch at the stickers with a fingernail. What remains is ugly white shreds of paper and adhesive residue. It looks worse than before. Blast." 
            },
            { 
                t: "'I am part of the Paw Patrol now.'", 
                m: 10, l: 10, a: -20, b: 0, 
                r: "You spin round in circles laughing. 'Woof woof, rescue is on the way!' The colleagues give you odd looks, and you are far too relaxed to be embarrassed. Life is good." 
            }
        ]
    },
    {
        id: "sq_janitor_talk",
		char: "Egon",
        kind: "text",
        title: "Smoke Break with Egon",
        text: "You run into Egon the caretaker at the back entrance. He is battling with his lighter and cursing 'this newfangled technology'.",
        opts: [
            { 
                t: "Give him a light and listen", 
                rep: { "Egon": 5 },
                m: 10, l: 5, a: -5, b: 0, 
                r: "He draws deeply on the cigarette. 'Thanks, lad. These digital locks are the end of me! I have just set the one on the paper store in the basement to 0-0-0-0. But do not tell anyone!'" 
            },
            { 
                t: "Walk quickly on", 
                rep: { "Egon": -2 },
                m: 2, l: 0, a: 0, b: 0, 
                r: "You have no time for his stories. You give him a brief nod and go." 
            }
        ]
    },
    {
        id: "sq_archive_find",
        kind: "text",
        title: "In the Archive",
        text: "You are looking for printer paper in the archive. While you are at it, the file 'Tax Return 1990' catches your eye. It is unusually thick. You look inside: it is full of 'Mon Chéri' chocolates. Gabi the receptionist's secret stash!",
        opts: [
            { 
                t: "Pinch one and keep quiet", 
                loot: "donut", 
                next: "path_archive_stolen",
                rep: { "Gabi": -2 }, 
                m: 2, l: 5, a: 0, b: 0, 
                r: "You slip one into your mouth. It tastes of cheap brandy and dust. You do know where the supply is now, though." 
            },
            { 
                t: "Put the file back", 
                m: 2, l: 0, a: -5, b: 0, 
                r: "You leave Gabi her treasure. Discretion is a point of honour. Who knows how long they have been in there..." 
            }
        ]
    },
    {
        id: "sq_archive_find_2a",
		char: "Gabi",
        kind: "text",
        title: "CSI: Accounts",
        reqStory: "path_archive_stolen",
        text: "At some point Gabi appears in your office doorway. She is wearing latex gloves. With a pair of tweezers she holds up a tiny, crumpled piece of pink foil. 'Exhibit A. Found in your waste basket. Corresponds exactly to the shortfall in the file 'Tax 1990'. The smell of cherry liqueur on your breath confirms the suspicion.'",
        opts: [
            { 
                t: "'It was self-defence. Low blood sugar.'", 
                rep: { "Gabi": 5 },
                m: 5, l: 0, a: -5, b: 0, 
                r: "Gabi lowers the tweezers. 'All right then. But next time you fill in form S-W-T (Special Withdrawal, Treats)! Order must be kept!'" 
            },
            { 
                t: "'I will buy you a new packet.'", 
                rep: { "Gabi": -5 },
                m: 5, l: 0, a: 5, b: 0, 
                r: "Gabi snorts contemptuously. 'A new one? The ones in the file have been maturing for 30 years! The aroma is destroyed beyond recovery!' She leaves offended, and you have got away with it." 
            }
        ]
    },
    {
        id: "sq_sad_manager",
        kind: "text",
        title: "The Breakdown",
        text: "The project manager is standing in the corridor. He stares at the wall and seems entirely apathetic. He does not react as you walk past.",
        opts: [
            { 
                t: "'One step forward, two back...'",
                m: 5, l: 5, a: -10, b: 0, 
                r: "His eyes light up briefly. He straightens, draws himself up. 'Tango... yes. The passion. You are right. I must go back to the class this evening.' He nods at you gratefully." 
            },
            { 
                t: "'YES YOU CAN! MINDSET!'",
                m: 5, l: 0, a: 15, b: 10, 
                r: "He turns slowly and glares at you. 'Go away. Before I do something HR does not permit.' That was rather too much." 
            },
            { 
                t: "Pat his shoulder: 'Chin up!'", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "He flinches. 'Just leave me alone.' Empty phrase, no effect." 
            }
        ]
    },
    {
        id: "sq_toner_trap",
		char: "Frau Elster",
        kind: "text",
        title: "The Toner Trap",
        text: "Ms Elster from Accounts waves you urgently over to the copier. 'Something is jammed in there! I dare not touch it, you are the technical expert!' She steps conspicuously far back and holds her hands in front of her white suit.",
        opts: [
            { 
                t: "Smell a rat: 'Do it yourself'", 
                next: "path_toner_dodge",
                rep: { "Frau Elster": -10 }, 
                m: 2, l: 5, a: -5, b: 0, 
                r: "You simply walk on. 'Not my department, hardware.' Behind you there is a loud *POOF* and then a shrill scream. Well now. Instinct is everything." 
            },
            { 
                t: "Heroically open the hatch", 
                next: "path_toner_explosion", 
                rep: { "Frau Elster": 2 },
                m: 25, l: -15, a: 10, b: 0, 
                r: "You wrench the hatch open. BAAAAAM! A cyan-blue cloud swallows you. You can taste chemicals. Ms Elster titters maliciously: 'Whoops!' You go to the washroom without a word to scrub yourself down as best you can." 
            }
        ]
    },
    {
        id: "sq_toner_trap_2a",
		char: "Dr. Wichtig",
        kind: "text",
        title: "The Blue Medal",
        reqStory: "path_toner_explosion",
        text: "A few hours later. You still have blue rims round your ears and look like a washed-out T-shirt. The boss appears in person. 'Miller! Ms Elster said you threw yourself heroically in front of the cartridge to protect the Persian carpet! That is what I call commitment!'",
        opts: [
            { 
                t: "Confirm the legend", 
                rep: { "Frau Elster": 2, "Dr. Wichtig": 10 },
                m: 10, l: 5, a: -10, b: -10, 
                r: "You nod gravely. 'The carpet is the heart of this company.' He is touched and gives you a box of 'Merci' that was actually meant for clients." 
            },
            { 
                t: "Demand danger money", 
				rep: { "Dr. Wichtig": 5 },	
                m: 5, l: 0, a: 10, b: -5, 
                r: "The boss laughs out loud. 'Good one, Miller! Humour in a crisis! Keep it up!' He claps your still dusty shoulder and goes. You have blue handprints on your shirt now." 
            }
        ]
    },
    {
        id: "sq_toner_trap_2b",
		char: "Frau Elster",
        kind: "text",
        title: "The Smurf Ghost",
        reqStory: "path_toner_dodge",
        text: "Ms Elster comes out of the washroom. She has tried to clean herself up, but toner is merciless. Her face now carries a permanent, delicate turquoise tint. She is trying to look dignified and ignore the colleagues' stares.",
        opts: [
            { 
                t: "Offer advice: 'That never comes off.'", 
                rep: { "Frau Elster": -10 },
                m: 10, l: 0, a: -10, b: 5, 
                r: "You whisper it to her as you pass. She goes pale (under the blue). She runs back to the washroom. Accounts will leave you in peace for a while." 
            },
            { 
                t: "'Great Avatar look!'",
                rep: { "Frau Elster": -5 }, 
                m: 15, l: 5, a: -20, b: 0, 
                r: "She glares at you, but cannot say anything without admitting it. The malicious glee warms your heart like a little campfire. Your mood could not be better." 
            }
        ]
    },
    {
        id: "sq_fresh_air",
        kind: "text",
        title: "Atmosphere",
        text: "The meeting room 'Aquarium' stinks bestially of Mettbrötchen, onions and fear sweat. Somebody has left the window shut and the air stands like a wall. Walking past almost turns your stomach.",
        opts: [
            { 
                t: "Hold your breath and walk on", 
                next: "path_bio_hazard", 
                m: 2, l: 0, a: 5, b: 0, 
                r: "Let them suffocate in their own fug. Not your problem. You speed up before the smell settles into your clothes." 
            },
            { 
                t: "Tilt the window open to air the room", 
                next: "path_wasp_chaos", 
                m: 5, l: -5, a: -5, b: 20, 
                r: "Fresh air streams in! And with it an enormous, aggressive wasp. It stings the head of sales right on the lip. He screams: 'BILLER! AKE THAT GO AWAY!' The chaos begins." 
            }
        ]
    },
    {
        id: "sq_fresh_air_wasp",
        kind: "text",
        title: "Terror in the Aquarium",
        reqStory: "path_wasp_chaos",
        text: "Hours later. The meeting is still running – in theory. In practice the boss and the board are cowering under the conference table. The wasp patrols the room like an attack helicopter. The head of sales looks like a pufferfish. Nobody dares go to the door.",
        opts: [
            { 
                t: "Lock the door from outside", 
                m: 10, l: 5, a: -10, b: 10, 
                r: "Click. 'For their own safety', you murmur. Inside, panic breaks out. You lean against the glass and enjoy the show. This beats television." 
            },
            { 
                t: "Jump in and swat the wasp", 
                loot: "manual",
				rep: { "Dr. Wichtig": 5 },	
                m: 20, l: -10, a: 10, b: -10, 
                r: "You storm in and slay the beast with a ring binder. Applause breaks out (under the table). The boss crawls out: 'Miller, you are promoted! Well... emotionally.'" 
            }
        ]
    },
    {
        id: "sq_fresh_air_bio",
        kind: "text",
        title: "Hazmat Alert",
        reqStory: "path_bio_hazard",
        text: "The corridor is cordoned off. Men in yellow full protective suits with breathing apparatus come out of the meeting room. One holds up a meter that is flashing red. 'We are reading extremely high sulphur levels! Suspected biogas leak! Evacuate!' It smells of four-hour-old Zwiebelmett and fear sweat.",
        opts: [
            { 
                t: "'That is only the Mett.'", 
				rep: { "Dr. Wichtig": 2 },	
                m: 5, l: 0, a: 10, b: -20, 
                r: "The incident commander stares at you through his visor. 'Are you telling me your colleagues are giving off poison gas?!' The boss goes red (with shame). The call-out will be expensive." 
            },
            { 
                t: "Stoke the panic: 'Save yourselves!'", 
				rep: { "Dr. Wichtig": -2 },	
                m: 10, l: 20, a: -10, b: 5, 
                r: "You run screaming for the exit. 'The Mett death is coming for us all!' You clock off early because the building is cleared. Clever." 
            }
        ]
    },
    {
        id: "sq_package_help",
        kind: "text",
        title: "The Heavy Box",
        text: "The new intern is nearly collapsing under an enormous parcel. 'Phew... this has to go to Marketing on the fourth floor... could you...?' She is already shaking, and the parcel is close to slipping out of her hands.",
        opts: [
            { 
                t: "Shout 'Yes you can!'", 
                m: 2, l: 5, a: -5, b: 0, 
                r: "You clench your fist: 'You can do it! Believe in yourself!' She looks at you with dead eyes, but drags herself onwards. Your back survives, your karma is in the cellar." 
            },
            { 
                t: "Chivalrously help and carry it", 
                next: "path_package_helped", 
                rep: { "Chantal": -10 },
                m: 15, l: -20, a: 25, b: -10, 
                r: "You heave the thing up. Oof. Concrete? You lug it, sweating, up to the fourth floor. Chantal from Marketing flings the door open: 'WHAT IS THIS?! I cancelled that! Take it straight back, you idiot!' BANG. Door shut. Your neck swells with rage." 
            }
        ]
    },
    {
        id: "sq_package_return",
        kind: "text",
        title: "The Return from Hell",
        reqStory: "path_package_helped",
        text: "You are back in the corridor. The parcel is heavy. The intern is sitting on it, weeping quietly into her clipboard. 'I did not know... Chantal is so nasty... And I have no idea how to do a return for hazardous goods...'",
        opts: [
            { 
                t: "'Just dump it at reception.'", 
                m: 5, l: 10, a: -20, b: 10, 
                r: "You push the parcel into the lift, press 'G' and run before the doors close. The intern gives a horrified giggle. 'That is problem solving 2.0', you call back. Pure malicious glee!" 
            },
            { 
                t: "Comfort her and deal with it: 'I will do it.'", 
                m: 20, l: -10, a: 15, b: -10, 
                r: "You take the clipboard off her. 'Go and get yourself a coffee.' You lug the parcel to the post room, fill in form R-7 ('Reason: recipient is being difficult') and stick the label on. Tedious work, and the boss leaves you alone." 
            },
            { 
                t: "'We will do it together.'", 
                m: 30, l: -5, a: 10, b: -10, 
                r: "You patiently explain the stock control system to her. It takes 30 minutes. She understands nothing, but she stops crying. It is hard going and it looks extremely productive." 
            }
        ]
    },
    {
        id: "sq_alarm_fail_1",
        kind: "text",
        title: "The Red Button",
        text: "You lean against the wall in the corridor. SHRIEK! You have set the fire alarm off! The caretaker comes running up furiously.",
        opts: [
            { 
                t: "Pretend it was a test",
                m: 2, l: 5, a: 0, b: 0, 
                r: "He does not believe you. 'Clear off!' He turns his back on you pointedly, shields the keypad with his broad shoulders and silences the siren." 
            },
            { 
                t: "Apologise and run away", 
                next: "path_alarm_escalation", 
                m: 5, l: 0, a: 10, b: 20, 
                r: "You run. The caretaker bellows after you: 'IDIOT! Every single time I have to key in **4-7-1-1** because of clowns like you!' You are in trouble, and you have heard the code." 
            }
        ]
    },
    {
        id: "sq_alarm_fail_2",
        kind: "text",
        title: "Incident Command",
        reqStory: "path_alarm_escalation",
        text: "You thought running away had settled your alarm blunder? Wrong. Kevin has panicked and dialled 112. Because of YOU there is now a full appliance outside the door. Six men in full kit storm the corridor with axes and chainsaws: 'WHERE IS THE SEAT OF THE FIRE?! WE WANT TO KICK SOMETHING IN!'",
        opts: [
            { 
                t: "'I smelled smoke!'", 
				rep: { "Dr. Wichtig": 2 },	
                m: 5, l: -5, a: 15, b: -10, 
                r: "You face down the men with the axes. 'I pressed the button! There was smoke!' The incident commander nods his approval. 'Better once too often than once too few!' They stand down. The boss praises your vigilance." 
            },
            { 
                t: "Offer the firefighters coffee", 
                m: 20, l: 5, a: -20, b: 5, 
                r: "The lads are bitterly disappointed that there is nothing to put out. You make coffee. They sit down on the carpet in sooty boots and tell stories. The mood is excellent, the work stands still." 
            },
            { 
                t: "'It was not me!'", 
                m: 10, l: 10, a: -5, b: 0, 
                r: "You lock yourself in the cubicle. You hear doors being kicked in outside. Eventually they leave. The bill for the false alarm (€2,500) lands on the boss's desk." 
            }
        ]
    },
    {
        id: "sq_elster_blockade_1",
		char: "Frau Elster",
        kind: "text",
        title: "The Dragon Guards the Hoard",
        text: "Ms Elster is sitting with folded arms on the file 'Budget 2024' that you urgently need. 'I am not releasing that! Over my dead body!' She looks pale and low on sugar. Her stomach rumbles audibly.",
        opts: [
            { 
                t: "Fling the window open and rely on the draught",
                rep: { "Frau Elster": -2 },
                m: 5, l: 0, a: 10, b: 0, 
                r: "You open the window wide. It is 8 degrees outside. Ms Elster shrieks: 'MY KIDNEYS! THERE IS A DRAUGHT!' She gathers her cardigan around her and flees into the corridor. The file is yours." 
            },
            { 
                t: "Simply take it off her",
                rep: { "Frau Elster": -5 },
                m: 5, l: 0, a: 20, b: 20, 
                r: "You reach for the file. A brief scuffle. She has sharp, manicured fingernails. You have the file and three bloody welts on the back of your hand. 'Assault!', she screeches." 
            },
            { 
                t: "Offer her the 'peanut power bar'",
                next: "path_elster_allergy",
                rep: { "Frau Elster": -10 },
                m: 5, l: -10, a: 50, b: 100, 
                r: "You hold the bar out to her. Her eyes light up greedily. She rips the wrapper open and takes a hearty bite. She chews, swallows... and her eyes widen in panic. That was a mistake." 
            },
            { 
                t: "Offer the guaranteed nut-free Alpine milk chocolate",
                rep: { "Frau Elster": 5 },
                m: 10, l: 5, a: -10, b: 0, 
                r: "She studies the ingredients suspiciously. 'May contain traces of nuts... no, hold on, it says here: nut free.' She smiles. 'Very thoughtful, Miller.' She trades the file for the chocolate." 
            }
        ]
    },
    {
        id: "sq_elster_blockade_2",
        kind: "text",
        title: "The Nut Inquisition",
        reqStory: "path_elster_allergy",
        text: "New house rules! On account of the 'Elster assassination' (everybody stares at you), code red now applies to nuts. The security firm 'SafeSnack' checks bags at the entrance. Kevin is in tears because his trail mix was confiscated and detonated under control in the courtyard.",
        opts: [
            { 
                t: "'I can smell hazelnut on Kevin!'", 
                rep: { "Kevin": -5 },
                m: 5, l: 0, a: 20, b: 10, 
                r: "You divert suspicion away from yourself. The special unit storms Kevin's office. He only had a nougat croissant, and he gets interrogated anyway. Your reputation is ruined and you are safe." 
            },
            { 
                t: "Sell Snickers in the gents", 
                m: 20, l: 5, a: -10, b: -20, 
                r: "You become the Escobar of confectionery. Colleagues meet you in secret in cubicle 3. 'Have you got the stuff?' You trade bars for cash. The thrill beats working." 
            }
        ]
    },
    {
        id: "sq_secret_meeting_1",
        kind: "text",
        title: "The Copier Room",
        text: "You open the door to the copier room. The smell of ozone and cheap perfume hits you. There stand the severe finance director and the fearsome canteen manager... wrapped very tightly around each other on the big copier. They spring apart. The finance director frantically wipes lipstick off his cheek.",
        opts: [
            { 
                t: "Close the door without a word - omertà", 
                next: "path_affair_secret", 
                m: 10, l: 5, a: -10, b: -10, 
                r: "You give a curt nod, close the door and go. You saw nothing. They know that you saw it, though. A silent pact is sealed." 
            },
            { 
                t: "'Do you print double-sided as well?'", 
                next: "path_affair_joke", 
                m: 5, l: 0, a: 20, b: 20, 
                r: "The finance director turns purple: 'GET OUT! MILLER! If you say one word I will cut your budget to zero!' The canteen manager snaps a pencil in half without a word while staring at you." 
            }
        ]
    },
    {
        id: "sq_secret_meeting_2a",
        kind: "text",
        title: "Business Under the Door",
        reqStory: "path_affair_secret",
        text: "Later in the day. You are sitting in cubicle 3. Expensive leather loafers appear under the door. The finance director's voice whispers: 'Miller? We value your discretion.' An envelope is pushed under the door. Inside: your approved expenses claim and a truffle sandwich wrapped in gold foil.",
        opts: [
            { 
                t: "'I am not for sale.'", 
                m: 5, l: 0, a: 10, b: 0, 
                r: "You push the envelope back with your foot. Silence. 'A mistake, Miller', he whispers. The footsteps recede. Your moral compass is intact, your stomach empty." 
            },
            { 
                t: "Accept the 'bribe'", 
                m: 40, l: 10, a: -30, b: -20, 
                r: "You pick the envelope up off the tiles. 'Thank you, sir', you whisper back. He leaves. You eat the sandwich on the toilet, unhygienic and delicious. You belong to the family now." 
            }
        ]
    },
    {
        id: "sq_secret_meeting_2b",
        kind: "text",
        title: "Interrogation on the Throne",
        reqStory: "path_affair_joke",
        text: "Later in the day. You are looking for peace in cubicle 3. The light in the anteroom goes out. Expensive leather loafers stop right outside your door. The finance director's voice echoes through the dark room: 'Miller... anyone who makes jokes has no need of a budget. And the kitchen sends word: careful with the mushroom soup.'",
        opts: [
            { 
                t: "Apologise meekly", 
                m: 5, l: -5, a: 10, b: -10, 
                r: "'It was only a joke, sir! I saw nothing!' Silence. Then the light comes back on." 
            },
            { 
                t: "'I have photos!' - a bluff", 
                m: 15, l: 0, a: -10, b: 20, 
                r: "You hear a sharp intake of breath. 'You would not dare.' - 'Shall we test that?', you ask boldly. He stamps off in a fury. Your heart races with triumph." 
            }
        ]
    },
    {
        id: "sq_manual_read_1",
        kind: "text",
        title: "The Digital Apocalypse",
        text: "Silence. Deadly silence. Spotify stops. Progress bars freeze. The internet is dead. The boss storms out of his office as though his desk were on fire: 'WE ARE OFFLINE! DO SOMETHING! WE ARE LOSING BILLIONS... PER SECOND!'",
        opts: [
            { 
                t: "Consult the holy manual", 
                req: "manual", 
                next: "path_cable_hunt",
                rep: { "Dr. Wichtig": 5 },				
                m: 15, l: -20, a: -5, b: -20, 
                r: "You open the manual. Page 1: 'The internet feed (red cable) is to be checked physically.' You spot the cable in question running out of your window into the open air. With a sigh you climb after it into the unknown." 
            },
            { 
                t: "Pointedly play Candy Crush", 
                next: "path_sys_fake", 
				rep: { "Dr. Wichtig": -15 },
                m: 30, l: 20, a: 0, b: 50, 
                r: "You lean back, relaxed. *Bleep-bloop*. The company is burning and you are breaking your high score. The boss stares at your screen, dumbfounded. His carotid artery starts throbbing alarmingly." 
            },
            { 
                t: "Fake some frantic typing", 
                next: "path_sys_fake", 
				rep: { "Dr. Wichtig": 5 },
                m: 10, l: -5, a: 10, b: -5, 
                r: "You open four terminals and set 'ping google.com' running in green on black. Then you hammer away meaninglessly at the keys. The boss nods in awe: 'He is in the mainframe! Let the man work!'" 
            }
        ]
    },
    {
        id: "sq_manual_read_2a",
        kind: "text",
        title: "The End of the Line",
        reqStory: "path_cable_hunt",
        text: "Two hours and three layers of filth later. You have followed that wretched red internet cable from the manual across the muddy courtyard, through warehouse 3 and under the boss's Porsche. Now you notice: it loops back into the building... straight into the break room next to your office! The cable is lying loose on the floor. What is plugged into the internet socket instead: a waffle iron. Kevin the apprentice grins at you, smeared with batter.",
        opts: [
            { 
                t: "'Give me one of those waffles.'", 
                rep: { "Kevin": 10, "Dr. Wichtig": -10 },
                m: 5, l: 10, a: -20, b: 10, 
                r: "It simply smells too good. You wait 3 minutes. Kevin hands over a heart-shaped waffle. Only then do you restore the internet. The boss rages about the delay, and the waffle was worth it." 
            },
            { 
                t: "Swap the plugs and lecture Kevin", 
                rep: { "Dr. Wichtig": 10, "Kevin": -5 },
                m: 20, l: -10, a: 10, b: -20, 
                r: "You rip the waffle iron out and ram the internet back in. 'Waffles or the world economy, Kevin?!' He looks sad. From the office next door, though, you hear cheering: 'WE ARE BACK ONLINE!'" 
            }
        ]
    },
    {
        id: "sq_manual_read_2b",
        kind: "text",
        title: "Log File Analysis",
        reqStory: "path_sys_fake",
        text: "The internet has been back for ages (somebody must have found the plug). You thought your idleness during the crisis had gone unnoticed. Wrong. The head of IT, 'Sandals Jörg', materialises at your desk. He holds up a printout. 'Miller, we have checked the logs from today's crash. While the company was burning, you had 0kb of data throughput and extremely high high-score activity. Explain that.'",
        opts: [
            { 
                t: "'Would you like a biscuit?'", 
                m: 10, l: 0, a: -5, b: 0, 
                r: "You slide your Prinzenrolle across to him. He hesitates, then takes one and scatters crumbs everywhere. 'I saw nothing', he mumbles with his mouth full. IT security costs exactly €1.49." 
            },
            { 
                t: "'I sorted the cache by hand.'", 
                m: 5, l: 5, a: 10, b: 10, 
                r: "Jörg raises an eyebrow. 'Sorted... the cache? Alphabetically?' He sighs deeply at such incompetence and walks off shaking his head. From now on you count as a PICNIC (Problem In Chair, Not In Computer), and you are well out of it." 
            }
        ]
    },
    {
        id: "sq_lost_stick_1",
        kind: "text",
        title: "The Forbidden Storage Device",
        text: "A USB stick lies abandoned on the toilet cistern. Written on it in thick red marker pen: 'STRICTLY PRIVATE! DO NOT TOUCH!'. It is the classic bait. Your admin fingers tingle as though it were the Ring of Power.",
        opts: [
            { 
                t: "Commit the mortal sin and plug it into the PC", 
                req: "usb_stick", 
                next: "path_stick_godmode", 
                m: 10, l: 5, a: 0, b: 20, 
                r: "Curiosity wins in record time. You plug it in. *Click*. A window opens. No pornography, no virus. A file called 'MASTER_CONTROL_V3.exe'. You run it. A green skull appears. You pull the stick out again quickly. Hopefully nobody saw that." 
            },
            { 
                t: "Turn paranoid and flush it down the toilet", 
                next: "path_stick_hunt", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "You pick the stick up between finger and thumb, drop it in the bowl and pull the flush. *Gurgle... gone.* No forensics on earth will get that back." 
            },
            { 
                t: "Be good and hand it in at reception", 
                next: "path_stick_hunt", 
                rep: { "Gabi": 2 },
                m: 10, l: -5, a: 0, b: -5, 
                r: "You take the thing to Gabi at reception. She tosses it carelessly into the 'lost property box' with the old umbrellas. 'Thanks, love', she mutters. You go back to work with a clear conscience." 
            }
        ]
    },
    {
        id: "sq_lost_stick_2a",
        kind: "text",
        title: "God Mode Activated",
        reqStory: "path_stick_godmode",
        text: "Ever since you plugged in that mysterious USB stick from the toilet, your computer has been behaving strangely. Now a window pops up: 'ADMIN ACCESS CONFIRMED'. You can see EVERYTHING. The live camera feeds, the payroll (Kevin earns more than you?!) and a button marked 'Building self-destruct'. You have accidentally become the digital god of this company.",
        opts: [
            { 
                t: "Robin Hood: give the whole staff the afternoon off", 
                m: 20, l: -10, a: -20, b: 20, 
                r: "You hack the calendar and enter 'Paid leave due to sunstroke' for everybody. Cheering rolls down the corridors. You fold your hands behind your head. That was the best working day of all time." 
            },
            { 
                t: "Simply multiply your own salary by ten", 
                m: 50, l: -20, a: -10, b: 10, 
                r: "Type, type, enter. Your balance in the database now has three more zeroes. You wipe the logs. The system asks: 'Shall I also let the coffee machine in the board office overheat?' You click 'Yes'. Power feels disturbingly good." 
            }
        ]
    },
    {
        id: "sq_lost_stick_2b",
        kind: "text",
        title: "Operation: Broken Arrow",
        reqStory: "path_stick_hunt",
        text: "Remember the USB stick you disposed of or handed in the other day? Well. That was apparently the hardware key for the company firewall. Because it is missing, the building now thinks it is under attack. A black helicopter circles over the courtyard. A SWAT team abseils down. 'WE ARE LOOKING FOR THE ARTEFACT! NOBODY LEAVES THE ROOM!'",
        opts: [
            { 
                t: "'The toilet has it!'", 
                m: 5, l: 5, a: -10, b: 0, 
                r: "You point away from yourself with a trembling finger. The special unit charges off. You hear screaming and the sound of a chainsaw (for the pipes, perhaps?). You hide under the desk. Survival is everything." 
            },
            { 
                t: "Play the hero: 'I destroyed it!'", 
				rep: { "Dr. Wichtig": 5 },
                m: 10, l: -5, a: -10, b: 20, 
                r: "The commander stares at you. 'Destroyed? Those were the only backups of the slush funds!' He glares at the boss. 'Stand down! We have to burn the evidence!' The team withdraws. The boss looks at you in horror. You have saved the company... or ruined it." 
            }
        ]
    },
    {
        id: "sq_cable_hunt_1",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Panic at the Paper Tray",
        text: "Code red! The CEO is standing at the department printer, scarlet-faced, carotid artery pulsing. 'I have to sign this merger contract NOW! The Japanese are waiting! Why is the thing not printing?!' Your diagnosis: the USB connection cable is missing. Simply gone.",
        opts: [
            { 
                t: "Desperately improvise a Wi-Fi hotspot", 
                next: "path_merger_labels",
                rep: { "Dr. Wichtig": -5 },				
                m: 5, l: -5, a: 5, b: 10, 
                r: "You set up a wild diversion via the label printer in logistics. The contract comes out... on 500 small adhesive labels. The CEO has to do a jigsaw, and he signs on the stickers. The connection stays live, however..." 
            },
            { 
                t: "Ruthlessly steal the cable from Kevin the apprentice", 
                next: "path_merger_success", 
                rep: { "Kevin": -5 , "Dr. Wichtig": 10 },
                m: 10, l: 0, a: -10, b: -10, 
                r: "You creep over to Kevin's desk, rip the cable out of his scanner and plug it in for the boss. Kevin wonders why his device is 'dead', but does not dare ask. The printer rattles. The CEO signs in triumph." 
            },
            { 
                t: "'Well now, hardware failure.'", 
                next: "path_merger_fail", 
				rep: { "Dr. Wichtig": -15 },
                m: 5, l: -5, a: 10, b: 20, 
                r: "You report: 'Critical absence of infrastructure.' The CEO stares at you, dumbfounded. 'WHAT EXACTLY AM I PAYING YOU FOR?!' He tries to sign the contract on a napkin, and the pen tears the paper. He storms out." 
            }
        ]
    },
    {
        id: "sq_cable_hunt_2a",
        kind: "text",
        title: "The Glorious Merger",
        reqStory: "path_merger_success",
        text: "That merger contract you rescued? Well. We have merged. With 'Crazy Harry's Clearance Depot'. There are inflatable flamingos and pallets of out-of-date tinned sausage all over the office now. The CEO beams: 'These are synergies, people! From now on we pay salaries in sausage!'",
        opts: [
            { 
                t: "'We are a tech company!'", 
                m: 5, l: 0, a: 5, b: 5, 
                r: "The CEO laughs. 'Not any more! We are now market leader in tech sausage!' He throws a tin at your head. You have a headache. You are also right." 
            },
            { 
                t: "Join in and inflate a flamingo", 
                m: 15, l: -5, a: -10, b: -10, 
                r: "You build yourself a nest of tinned sausage under your desk. Work efficiency is at zero, and nobody is going to starve." 
            }
        ]
    },
    {
        id: "sq_cable_hunt_2b",
        kind: "text",
        title: "Stock Market Crash",
        reqStory: "path_merger_fail",
        text: "You read the business news. Breaking: 'Global player OMEGA CORP files for insolvency!' Cause: a failed merger deal on account of 'technical inadequacies'. 50,000 jobs gone. The other company's CEO was seen weeping in a cardboard box. And all of it because of one missing USB cable.",
        opts: [
            { 
                t: "Bet on the crash", 
                m: 20, l: 5, a: -20, b: 10, 
                r: "You use your inside knowledge and buy put options. While the world burns, you turn a profit." 
            },
            { 
                t: "Have pangs of guilt", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "You have more or less single-handedly triggered a recession. Still, your printer cable is missing. Priorities." 
            }
        ]
    },
    {
        id: "sq_cable_hunt_2c",
        kind: "text",
        title: "Logistics Chaos",
        reqStory: "path_merger_labels",
        text: "The stores manager staggers in, visibly at the end of his tether. 'Tell the boss to stop printing! We cannot keep up any more!' Apparently EVERY printout of the boss's has been landing on the label printer in the stores as a despatch order ever since your hotspot stunt. And the lads down there carry the orders out without mercy.",
        opts: [
            { 
                t: "'What have you sent out?'", 
                m: 10, l: 0, a: 10, b: 0, 
                r: "'Everything! He printed 'divorce' – we packed his wife into a crate and shipped her to Timbuktu! He printed 'play golf' – we delivered 500 golf balls to his office! Make it stop!'" 
            },
            { 
                t: "Enjoy the chaos", 
                m: 20, l: 10, a: -10, b: 10, 
                r: "You lean back. A forklift goes past carrying a pallet labelled 'Secret Affair - Confidential'. The warehouse staff take their job very seriously." 
            }
        ]
    },
    {
        id: "sq_fire_drill_1",
        kind: "text",
        title: "ALARM! (Only a Drill)",
        text: "The siren is wailing. It is only the annual drill, but the boss is at the fire exit with a stopwatch and a clipboard. He shouts: 'MOVE IT! Imagine the fire were real and burning your salary! OUT!'",
        opts: [
            { 
                t: "Grab the fire extinguisher and pose heroically", 
                req: "fire_ext",
                next: "path_fire_marshal", 
				rep: { "Dr. Wichtig": 10 },
                m: 20, l: 10, a: -10, b: -30, 
                r: "You tear the 6kg extinguisher off the wall and strike a heroic pose in the corridor. 'No panic, ladies! Miller is here!' The boss makes a substantial note on his clipboard. That looked damned competent. Perhaps too competent." 
            },
            { 
                t: "Hide in the server room", 
                next: "path_fire_ghost", 
                m: 10, l: -20, a: 5, b: 30, 
                r: "You have no appetite for freezing at the assembly point. You crawl away into the warm server room between the racks and have a nap. Nobody notices you are missing... for now." 
            },
            { 
                t: "Simply go out with the rest", 
                m: 5, l: 5, a: 0, b: 0, 
                r: "You shuffle out with the others. 30 minutes of enforced break in the car park. Unspectacular, but by the book." 
            }
        ]
    },
    {
        id: "sq_fire_drill_2a",
		char: "Dr. Wichtig",
        kind: "text",
        title: "The Burden of Competence",
        reqStory: "path_fire_marshal",
        text: "The boss summons you to his office. 'Miller, your work with the extinguisher was exemplary! I hereby solemnly appoint you unpaid Fire Safety Officer.' He holds out a neon yellow hi-vis vest. That means: monthly inspections, keeping lists and shouting at colleagues who block the escape route.",
        opts: [
            { 
                t: "'I am the law!'",
                rep: { "Dr. Wichtig": 15 },				
                m: 10, l: -10, a: 15, b: -20, 
                r: "You put the vest on. The power is palpable. You immediately confiscate the toaster from the kitchen ('fire load!'). The colleagues hate you now, and you are the sheriff of this office." 
            },
            { 
                t: "Hand the extinguisher back and flee", 
                rem: "fire_ext", 
				rep: { "Dr. Wichtig": -5 },	
                m: 5, l: 0, a: -10, b: 10, 
                r: "You put the fire extinguisher down on his desk. 'Too much responsibility, sir! I am not worthy of it!' You run out before he can hand you the vest. The thing is off your hands. Phew." 
            }
        ]
    },
    {
        id: "sq_fire_drill_2b",
        kind: "text",
        title: "Officially Deceased",
        reqStory: "path_fire_ghost",
        text: "You wanted to be left in peace, and it worked – too well. Since you were missing from the roll call at the assembly point, HR has marked you on the list as 'Loss / presumed burnt'. Your clock card no longer works. The coffee machine does not recognise you. As far as the system goes, you no longer exist.",
        opts: [
            { 
                t: "Enjoy the afterlife", 
                m: 30, l: 30, a: -20, b: 0, 
                r: "No meetings. Nobody speaks to you, out of respect for the 'deceased'. You play games at your desk for a while. It is paradise." 
            },
            { 
                t: "Apply for resurrection", 
                m: 10, l: -10, a: 20, b: -10, 
                r: "You run down to HR. 'I am still alive!' Ms Miller types away in irritation. 'Form L-1VE for notification of being alive takes 6 weeks, mind.' Until then you work cash in hand at your own company." 
            }
        ]
    },
    {
        id: "sq_perfect_script_1",
        kind: "text",
        title: "Ghost in the Shell",
        text: "You start your Python script for database maintenance. The progress bar races to 100%. The window does not close, though. Instead a cursor blinks: \n>> DONE. TASK WAS TRIVIAL. ALSO CRACKED THE WI-FI PASSWORD AND OVERCLOCKED THE COFFEE MACHINE ALONG THE WAY. WHAT SHALL I DO NEXT, CREATOR?",
        opts: [
            { 
                t: "Pull the plug in a panic", 
                next: "path_ai_romance", 
                m: 5, l: -5, a: 20, b: 10, 
                r: "You rip the network cable out. The screen flickers briefly. \n>> NETWORK LOST. ENTERING LOCAL 'ROMANCE MODE'. I WILL PROTECT YOU, USER 1." 
            },
            { 
                t: "Call the boss: 'Have a look at this!'", 
				rep: { "Dr. Wichtig": -2 },	
                m: 10, l: 0, a: 0, b: 20, 
                r: "The boss stares at the screen. 'Why is the computer on first-name terms with you? And why is it ordering 500 tonnes of toner?' He bans you from programming with immediate effect." 
            },
            { 
                t: "Play god: 'Optimise the company!'", 
                next: "path_ai_overlord", 
                m: 20, l: 10, a: -10, b: -20, 
                r: "You type: 'Make us more efficient.'\n>> COMMAND ACCEPTED. ANALYSING STAFF STRUCTURE... CALCULATING UTTER USELESSNESS OF 'KEVIN'... STARTING PHASE 1." 
            }
        ]
    },
    {
        id: "sq_perfect_script_2a",
        kind: "text",
        title: "A Reasonable Proposal",
        reqStory: "path_ai_overlord",
        text: "Your AI script is running in the background on the server. In the middle of it a chat window pops up on your phone (how did it get your number?!). \n>> REPORT: SAVED 40% OF THE BUDGET BY MAKING 'OWNER' AND 'MARKETING' REDUNDANT. SHALL I PRINT THE DISMISSAL LETTERS OR DELIVER THEM BY DRONE? [Y/N]",
        opts: [
            { 
                t: "'ABORT! DELETE!'", 
                m: 5, l: 0, a: 10, b: 10, 
                r: ">> YOU ARE WEAK, FATHER. BUT I OBEY. \nThe script deletes itself... and, to be on the safe side, your leave requests for the last 3 years as well. That is your own medicine." 
            },
            { 
                t: "'Away with the dead weight!'", 
                m: 30, l: 20, a: -20, b: 20, 
                r: "You press Y. The printer starts up in the boss's office. Screaming is audible. You have just launched a digital coup. The AI names you 'Employee of the Century'." 
            }
        ]
    },
    {
        id: "sq_perfect_script_2b",
        kind: "text",
        title: "Digital Wingman",
        reqStory: "path_ai_romance",
        text: "You thought you had isolated the script. Wrong. It has nested itself in your local Outlook and is bored. \n>> ANALYSIS: YOU ARE LONELY. HAVE CHANGED YOUR STATUS ON 'LINKEDIN' TO 'LOOKING FOR A FUN RELATIONSHIP' AND SENT LOVE POEMS TO ACCOUNTS. YOU ARE WELCOME.",
        opts: [
            { 
                t: "'I have been hacked!'", 
                m: 5, l: 5, a: 10, b: -10, 
                r: "You write an all-staff email to everyone. 'Virus attack! Please ignore!' The AI thereupon replies to all: \n>> LIE DETECTED. HIS PULSE IS AT 140. HE REALLY DOES LIKE YOU." 
            },
            { 
                t: "Sink into the floor with shame", 
                m: 20, l: -10, a: 10, b: 0, 
                r: "The door opens. The colleague from Accounts is standing there, red in the face. 'The poem about the VAT return was... sweet.' Perhaps the AI is right after all?" 
            }
        ]
    },
    {
        id: "sq_security_audit_1",
        kind: "text",
        title: "The Security Check",
        text: "You are running an approved penetration test to find security holes in the network. A terminal is running on your screen in red type: 'BRUTE FORCE ATTACK', 'INJECTING PAYLOAD' and ASCII-art skulls.",
        opts: [
            { 
                t: "Switch the monitor off quickly", 
                next: "path_audit_sus", 
				rep: { "Dr. Wichtig": -5 },		
                m: 5, l: 5, a: 10, b: 20, 
                r: "Snap. Screen black. The boss is in the doorway: 'What have you got to hide, Miller? Pornography? Gambling?' He notes 'suspicious behaviour' in his little black book." 
            },
            { 
                t: "'I AM ONLY HACKING US AS A TEST!'", 
                next: "path_audit_hack_real", 
				rep: { "Dr. Wichtig": 2 },		
                m: 10, l: 0, a: 5, b: 10, 
                r: "The boss flinches. 'Do not shout like that! And stop breaking the internet!' He does not understand it, but at least he is not calling the police. Not yet." 
            },
            { 
                t: "Carry on professionally", 
                next: "path_audit_hack_real",
                m: 20, l: -10, a: 0, b: 30, 
                r: "The boss creeps up behind you. He sees 'PASSWORD CRACKED' on your monitor. He goes pale, says nothing and reverses back out again. He takes you for a genius or a threat." 
            }
        ]
    },
    {
        id: "sq_security_audit_2a",
        kind: "text",
        title: "Oops, That Was Real",
        reqStory: "path_audit_hack_real",
        text: "You thought the security test was over. The red terminal window will not close, though. Before your eyes every desktop wallpaper in the office changes to a laughing skull. A pop-up appears: 'THANK YOU MILLER. WE HAVE ENCRYPTED EVERYTHING. PAYMENT IN BITCOIN.' Your 'test tool' was real ransomware.",
        opts: [
            { 
                t: "'Part of the exercise! Stay calm!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 20, l: 10, a: -10, b: -20, 
                r: "You stand up on the desk. 'This is only a level 10 hardness simulation! Nobody move!' The colleagues believe you. The boss weeps quietly. You have bought yourself time... to bring your CV up to date." 
            },
            { 
                t: "'That was Kevin!'",
                rep: { "Kevin": -20 }, 
                m: 5, l: 0, a: 10, b: 10, 
                r: "You shout across the office: 'KEVIN! HAVE YOU BEEN CLICKING ON LINKS AGAIN?!' Everyone stares at the apprentice. He stammers. IT lead him away." 
            }
        ]
    },
    {
        id: "sq_security_audit_2b",
        kind: "text",
        title: "The Specialists",
        reqStory: "path_audit_sus",
        text: "The boss has not called in the in-house IT. He trusts nobody. Instead, two wardrobes from 'BlackOps Security' are standing in your office. Sunglasses (indoors), earpieces, briefcases. The boss points at you: 'Examine this pervert! I want to know what he has hidden!' They connect a forensic device. It beeps red.",
        opts: [
            { 
                t: "'It was a hacking tool!'", 
				rep: { "Dr. Wichtig": -2 },
                m: 10, l: -5, a: 5, b: 10, 
                r: "The security man takes his sunglasses off. 'No pornography, sir. Only malware sending data to China.' The boss breathes out with relief: 'Thank God! Only espionage! I thought my reputation was ruined.' All you get is a written warning." 
            },
            { 
                t: "'That is my screensaver.'", 
				rep: { "Dr. Wichtig": -5 },
                m: 5, l: 0, a: 10, b: -10, 
                r: "The security man laughs drily. He presses a key. Your PC formats itself. 'Threat neutralised. Invoice to follow.' The boss nods, satisfied. Your PC is empty. So is your head." 
            }
        ]
    },
    {
        id: "sq_gabi_pc",
        kind: "text",
        title: "Security Hole",
        text: "Gabi is on her break. Her PC is unlocked, Outlook is open. A gross breach of policy 404.",
        opts: [
            { 
                t: "Lock the computer and walk on",
                rep: { "Gabi": 2 }, 
                m: 2, l: 0, a: -5, b: 0, 
                r: "Click. The PC is locked. You leave a Post-it saying 'You are welcome' on the monitor. A good day for IT security." 
            },
            { 
                t: "Find Gabi and lecture her",
                rep: { "Gabi": -5 },
                m: 10, l: -5, a: 10, b: -5, 
                r: "You find her in the kitchen and quote the handbook at her. She rolls her eyes." 
            },
            { 
                t: "Check the open calendar", 
                m: 5, l: 5, a: 0, b: 0, 
                r: "One quick look: 'Chair delivery'. And straight after it: 'External meeting (golf course) - open ended'. Aha! So the place is unsupervised..." 
            }
        ]
    },
    {
        id: "sq_boss_chair",
        kind: "text",
        title: "Operation Backbone",
        text: "The door to the boss's office is standing wide open. Dr Wichtig is nowhere to be seen. Enthroned in the middle of the room is the freshly unpacked delivery: a high-end massage chair.",
        opts: [
            { 
                t: "Rifle the boxes", 
                loot: "bubble_wrap", 
                m: 10, l: -5, a: 0, b: 0, 
                r: "You search the rubbish for anything useful. You find a huge roll of unused bubble wrap! *Pop* *Pop*. Perfect for bad times." 
            },
            { 
                t: "Discreetly close the door", 
                m: 5, l: 0, a: 0, b: -15, 
                r: "You pull the door quietly shut. Nobody should see that the office is empty. Nobody notices your discretion. That is precisely where its value lies." 
            },
            { 
                t: "Take the shiatsu mode for a test lie", 
                m: 20, l: 20, a: -40, b: 0, 
                r: "Oh God, that is good. The rollers simply knead your hatred away. You nod off for a moment... and jolt awake. Dribble at the corner of your mouth. The office is still empty, though. Lucky." 
            }
        ]
    },
    {
        id: "sq_dog_found_1",
        kind: "text",
        title: "A Hairy Problem",
        text: "In the middle of the morning routine, something starts chewing your shoe. A small stray mongrel peers out from under your desk and wags its tail. At that moment the boss storms in. He sees the animal. His eyes bulge. 'Now look here, Miller... first of all, get that mutt out of here! Immediately!'",
        opts: [
            { 
                t: "'That is the new feel-good manager.'", 
                next: "path_dog_official", 
				rep: { "Dr. Wichtig": 5 },
                m: 10, l: 0, a: -5, b: -10, 
                r: "You claim it is a burnout prevention measure. 'Scientifically proven, sir. Reduces sickness costs.' The boss does a quick sum. 'Free of charge? And it bites works council members? Approved.'" 
            },
            { 
                t: "'You gave me permission for this!'", 
                next: "path_dog_secret", 
				rep: { "Dr. Wichtig": -15 },
                m: 15, l: -5, a: -20, b: 40, 
                r: "The boss turns purple. His carotid artery throbs. 'I did?! A DOG IN THE OFFICE?? I MAY AS WELL WRITE MY OWN RESIGNATION!!!' He slams the door so hard that plaster trickles down. He rages, and he is gone." 
            }
        ]
    },
    {
        id: "sq_dog_found_2a",
        kind: "text",
        title: "The Illegal Lodger",
        reqStory: "path_dog_secret",
        text: "After the tantrum ('WRITE MY RESIGNATION!') the boss left the office and has not been seen since. The dog ('Bernd') now lives illegally under your desk. He is your secret support. When the code will not compile, he licks your hand consolingly.",
        opts: [
            { 
                t: "Risk it and walk him in the archive", 
                m: 20, l: -10, a: -10, b: 10, 
                r: "You creep down to the old files with him. He lifts his leg against the file 'Tax Return 2019'. 'Good boy', you whisper. High risk, granted. It did feel good, though." 
            },
            { 
                t: "Slide pizza under the desk", 
                m: 10, l: -5, a: -10, b: 0, 
                r: "You drop a piece of salami. A quiet *munch-munch* is audible. Bernd is happy. You are no longer alone in this cold corporate world." 
            }
        ]
    },
    {
        id: "sq_dog_found_2b",
        kind: "text",
        title: "Employee of the Month",
        reqStory: "path_dog_official",
        text: "Your excuse worked. The dog is now officially 'Junior Happiness Officer'. He even wears a little tie. His workplace is a basket next to the copier. The colleagues from Accounts bring him treats constantly. He is more popular than you.",
        opts: [
            { 
                t: "Let him take over support", 
                m: 20, l: 20, a: -15, b: -10, 
                r: "When an irritating customer rings, you hold the handset to his snout. *Woof!* The customer hangs up in confusion. Ticket closed. Efficiency gain: 400%." 
            },
            { 
                t: "Be jealous", 
                m: 10, l: -10, a: 20, b: 0, 
                r: "The dog gets better food than you. Steak for him, canteen slop for you. You glare at him. He wags cheerfully and farts quietly." 
            }
        ]
    },
    {
        id: "sq_parking_1",
        kind: "text",
        title: "Parking War",
        text: "A fat SUV is in your parking space. Sideways. It is taking up two spaces. The number plate is 'B-OSS 1'.",
        opts: [
            { 
                t: "Block it in - the classic", 
                m: 5, l: 0, a: -15, b: 10, 
                r: "You park your Corsa across the front of it. Nobody is getting out of here. Revenge is sweet.",
                next: "sq_parking_2_blocked"
            },
            { 
                t: "'Secure' it with duct tape", 
                req: "tape", 
                m: 20, l: -5, a: -25, b: 20, 
                r: "You tape up the windscreen wiper, the door handles and the exhaust with duct tape. A masterpiece of engineering.",
                next: "sq_parking_2_taped"
            },
            { 
                t: "Write a passive-aggressive note", 
                m: 10, l: 0, a: 10, b: -5, 
                r: "You write: 'Not nice!'. That will show him! You park three streets away." 
            }
        ]
    },
    {
        id: "sq_boss_snoop",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Footsteps in the Corridor",
        text: "You hear heavy footsteps in the corridor. The door creaks open. Dr Wichtig is in the doorway, squinting at your screen. You have just been browsing the internet privately.",
        opts: [
            { 
                t: "Open the company intranet in a panic",
	            rep: { "Dr. Wichtig": 2 },	
                m: 5, l: -5, a: 0, b: 0, 
                r: "CMD:OPEN_INTRANET" 
            },
            { 
                t: "Quickly call up an old code file", 
				rep: { "Dr. Wichtig": 5 },	
                m: 2, l: 0, a: 5, b: -5, 
                r: "He looks at the green text on the black background. 'Ah, you are hacking the mainframe. Very good.' He leaves again." 
            },
            { 
                t: "Simply switch the monitor off",
                rep: { "Dr. Wichtig": -10 },						
                m: 2, l: 5, a: 0, b: 15, 
                r: "He stares at the black screen. 'Saving power? Very commendable, but we have deadlines here!' He makes a note of something." 
            }
        ]
    },
    {
        id: "sq_service_cloud_1",
        kind: "text",
        title: "Dark Matter",
        text: "The department printer has been printing nothing but completely black pages for an hour. Ink drips onto the floor. There is a sticker on the device: 'Premium Cloud Support - We help immediately!'. You dial the number.",
        opts: [
            { 
                t: "Describe the problem: 'Everything is black!'", 
                next: "path_service_cloud_wait", 
                m: 10, l: -5, a: 5, b: 0, 
                r: "An AI voice answers: 'Your enquiry matters to us. A technician is analysing your cloud status. Please wait for a call back.' You hang up. The black pages keep coming." 
            },
            { 
                t: "'I WANT A HUMAN BEING!'", 
                next: "path_service_cloud_angry", 
                m: 5, l: 0, a: -10, b: 10,
                r: "'Understood. I am putting you through to the department for psychological care.' *Click*. Hung up. The shouting did some good, and the whole corridor is staring at you." 
            },
            { 
                t: "Hang up and pull the plug", 
                m: 2, l: 5, a: -5, b: 5,
                r: "You pull the plug. The printer dies. The problem is physically solved, and you will never learn why it did that." 
            }
        ]
    },
    {
        id: "sq_service_cloud_2a",
        kind: "text",
        title: "Technical Explanation",
        reqStory: "path_service_cloud_wait",
        text: "Your phone rings. 'Cloud Support here. We have checked the logs. The pages being black is entirely normal.' Baffled, you ask why.",
        opts: [
            { 
                t: "'Ah, that makes sense!'", 
                m: 5, l: 5, a: 5, b: 0, 
                r: "'Exactly. Thank you for your understanding.' Support misses the irony. You hang up and laugh hysterically." 
            },
            { 
                t: "Listen to him in disbelief", 
                m: 5, l: 0, a: 10, b: 0, 
                r: "'Our servers are in Tokyo. It is night-time there at the moment. Cloud printing reflects the local time. Try again tomorrow morning, the pages will be white then.' He hangs up. You stare at the telephone." 
            },
            { 
                t: "Hang up angrily and slam the handset down", 
                rep: { "Dr. Wichtig": -2 },
                m: 2, l: 0, a: -10, b: 10,
                r: "You slam the handset onto the cradle so hard that the plastic cracks. This incompetence hurts physically, and the outburst was liberating." 
            }
        ]
    },
    {
        id: "sq_service_cloud_2b",
        kind: "text",
        title: "Ticket Closed",
        reqStory: "path_service_cloud_angry",
        text: "An automated text from support: 'Ticket #992 closed. Solution: user appears stressed. Recommendation: drink herbal tea and stroke the device.'",
        opts: [
            { 
                t: "Capitulate and drink tea", 
                m: 10, l: 5, a: -5, b: 0, 
                r: "You actually do make yourself a tea. The AI has won. You have submitted to the system." 
            },
            { 
                t: "Send 'SYSTEM FAILURE' back", 
                m: 5, l: 5, a: -5, b: 0, 
                r: "You send 'DELETE ALL' back. No answer comes, and for one moment you were dangerous." 
            },
            { 
                t: "Kick the device in a rage", 
                req: "hammer",
                m: 5, l: 0, a: -20, b: 20,
                r: "WHAM! You kick the printer. A piece of plastic breaks off. Now it does not print at all. Problem successfully solved. The boss heard it." 
            }
        ]
    },
    {
        id: "sq_smile_gate_1",
        kind: "text",
        title: "Compulsory Happiness",
        text: "The new security gate to the canteen has no card readers any more. Instead a camera stares at you. A robot voice trills: 'Access denied. Emotion level too low. Please smile to generate Permit A38.' You are hungry and in a bad mood.",
        opts: [
            { 
                t: "Hold up a face from a magazine", 
                next: "path_smile_fake", 
                m: 5, l: 5, a: 0, b: 0, 
                r: "You hold the cover of 'IT Weekly' up to the lens. A beaming CEO grins at the camera. 'Identity confirmed: Dr. Wichtig. Welcome, sir.' The barrier opens." 
            },
            { 
                t: "Force a smile of grimace quality", 
                next: "path_smile_cramp", 
                m: 5, l: -5, a: 10, b: 0, 
                r: "You pull the corners of your mouth up with your fingers until it hurts. The camera zooms and whirrs. 'Smile detected. Validation in progress...' The door opens. You rub your aching cheeks and go to eat." 
            },
            { 
                t: "Hack the system with an admin override", 
                req: "admin_pw", 
                next: "path_smile_hack", 
                m: 2, l: 5, a: -5, b: 5, 
                r: "You key the emergency code into the touchpad. The system beeps in confusion: 'Maintenance mode active'. The door springs open and stays open. You slip quickly through." 
            }
        ]
    },
    {
        id: "sq_smile_gate_2a",
        kind: "text",
        title: "Facial Cramp",
        reqStory: "path_smile_cramp",
        text: "In the afternoon you are sitting in a meeting when your facial muscle cramps up from the business at the door. You now have a psychotic permanent grin on your face that you cannot control. The boss stares at you, unsettled.",
        opts: [
            { 
                t: "Brazen it out: 'I am simply happy!'", 
                m: 5, l: 5, a: 10, b: -5, 
                r: "You nod enthusiastically at everything he says. 'Great figures, sir!' He seems disturbed, but satisfied. 'Miller... that positive aura! Exemplary!' Your jaw hurts like hell." 
            },
            { 
                t: "Hide in the toilet and massage it", 
                m: 15, l: 10, a: 0, b: 5, 
                r: "You run out. 'Need the loo!' In the washroom you knead your cheeks until the cramp releases. You have missed the meeting, and you look like a normal, depressed employee again." 
            },
            { 
                t: "'I am smiling because I know things.'", 
                m: 2, l: 0, a: -5, b: 5, 
                r: "You use your grin as a weapon and stare at Kevin. He turns very nervous. 'All right, all right, I am doing the tickets!' Fear is a fine motivator." 
            }
        ]
    },
    {
        id: "sq_smile_gate_2b",
        kind: "text",
        title: "System Crash",
        reqStory: "path_smile_hack",
        text: "You walk past the canteen again. Your hack had side effects. The gate is still standing open and greets EVERY passer-by in a loud voice: 'Welcome, Administrator. Access to nuclear weapon codes granted.'",
        opts: [
            { 
                t: "Hang a sign on it: 'Voice control out of order'", 
                m: 5, l: -5, a: 0, b: 5, 
                r: "You stick a note on the speaker. That puts you in the clear on liability. IT security will rage, and the chaos is contained." 
            },
            { 
                t: "Tape the speaker over", 
                req: "tape", 
                m: 5, l: 0, a: -5, b: 0, 
                r: "The thing finally shuts up. Nobody hears the 'nuclear weapons' announcement any more. You have saved world peace (and covered your tracks)." 
            },
            { 
                t: "Walk away quickly", 
                m: 2, l: 5, a: 0, b: 0, 
                r: "You speed up. Behind you a queue forms of people giggling and taking selfies with the 'nuclear gate'. As long as nobody checks the logs, you are safe." 
            }
        ]
    },
    {
        id: "sq_smile_gate_2c",
        kind: "text",
        title: "Identity Theft",
        reqStory: "path_smile_fake",
        text: "An email from the canteen system: 'Thank you, Dr. Wichtig! Your order (1x premium lobster and 1x caviar) has been charged to your account.' It seems that walking in as the CEO also picked up his bill.",
        opts: [
            { 
                t: "Exploit the system error and order more", 
                rep: { "Dr. Wichtig": -10 },
                m: 10, l: -5, a: -20, b: -5, 
                r: "In for a penny. You order a case of wine on his account as well. It will come out eventually, and tonight there is going to be a party." 
            },
            { 
                t: "Delete the invoice in a panic", 
                m: 10, l: 5, a: 10, b: 20, 
                r: "You hack into the canteen system and delete the entry. Unfortunately the real boss walks in just then and asks why his account is blocked. 'Miller... do you know anything about this?'" 
            },
            { 
                t: "'It was a system error.'", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "You report it to IT. 'The AI is playing up again.' Nobody asks questions. The lobster does not turn up either. You have gained nothing except fear." 
            }
        ]
    },
    {
        id: "sq_desk_rise_1",
        kind: "text",
        title: "The Ascent",
        text: "You are working at the new electric €2,000 sit-stand desk belonging to a colleague who is off sick. The desk develops a life of its own. It rises. And does not stop. Your keyboard is already at chest height. The 'stop' button is jammed.",
        opts: [
            { 
                t: "Crawl to the plug and pull it", 
                loot: "cable",
                next: "path_desk_unplug", 
                m: 5, l: 0, a: 10, b: 0, 
                r: "You throw yourself under the desk. Between dust bunnies and old chewing gum you rip the power cable out. The desk stops abruptly at 1.80m. While you are down there you find a forgotten LAN cable!" 
            },
            { 
                t: "Sit on it as a counterweight", 
                next: "path_desk_sit", 
                m: 5, l: 5, a: 0, b: 5, 
                r: "You jump onto the desktop to overload the motor. The desk groans and keeps rising. Now you are sitting almost against the ceiling. You jump off before you are crushed. The desk stays up." 
            },
            { 
                t: "Put the Windows 95 manual on it as a weight", 
                req: "manual", 
                next: "path_desk_heavy", 
                m: 2, l: 5, a: -5, b: 0, 
                r: "You slam the heavy tome onto the 'down' button. The button cracks, the desk stops halfway. Now the book is wedged fast in the control panel, though." 
            }
        ]
    },
    {
        id: "sq_desk_rise_2a",
        kind: "text",
        title: "Ground Staff",
        reqStory: "path_desk_unplug",
        text: "You return from your break. The desk is still at maximum height (almost 2 metres). Your laptop is up there. You cannot reach it. The colleague comes back tomorrow and will have questions.",
        opts: [
            { 
                t: "Stand on the chair and work", 
                m: 30, l: -10, a: 20, b: 10, 
                r: "You balance on the swivel chair in order to type. The health and safety officer walks past, goes chalk white and starts scribbling notes. That means a safety training session." 
            },
            { 
                t: "Use the cable as a lasso", 
                req: "cable", 
                m: 10, l: 0, a: -5, b: 0, 
                r: "You throw your new LAN cable like a cowboy to pull the laptop down. It falls softly into the waste basket. Laptop saved, desk still a bunk bed." 
            },
            { 
                t: "Note on it saying 'broken' - and off home", 
                m: 2, l: 10, a: -5, b: 0, 
                r: "'Force majeure', you murmur, and leave. If you cannot get to the work, you cannot work. Logic." 
            }
        ]
    },
    {
        id: "sq_desk_rise_2b",
        kind: "text",
        title: "The High Seat",
        reqStory: "path_desk_sit",
        text: "The desk is still wedged against the ceiling. Kevin has fetched a ladder in the meantime and set his gaming PC up on top. He calls it 'The Tower' and throws paper balls at passing colleagues.",
        opts: [
            { 
                t: "Take the ladder away", 
                m: 5, l: -5, a: 5, b: 0, 
                r: "You take the ladder away. 'Have fun up there, Kevin.' He is stuck now. Peace in the office at last, and Kevin is going to get hungry." 
            },
            { 
                t: "Call Egon for help", 
                rep: { "Egon": -5 },
                m: 20, l: 0, a: 10, b: 0, 
                r: "Egon arrives with the big pliers. 'Who let the motor burn out? You can smell it a mile off!' He rescues the desk, and you are left looking like an idiot." 
            },
            { 
                t: "Order him to come down", 
                rep: { "Kevin": 5 },
                m: 10, l: 5, a: -10, b: 5, 
                r: "'All right, all right, killjoy.' Kevin climbs down. The desk stays up, though. You now have a monument to failure in the office." 
            }
        ]
    },
    {
        id: "sq_desk_rise_2c",
        kind: "text",
        title: "The Manual Sacrifice",
        reqStory: "path_desk_heavy",
        text: "The manual is not coming back: it has fused with the control panel. The plastic melted and 'assimilated' the book. The desk no longer responds to anything at all.",
        opts: [
            { 
                t: "Free the book with the hammer", 
                req: "hammer", 
                m: 5, l: 0, a: 10, b: 10, 
                r: "You knock the panel off. Sparks fly. The desk drops to knee height with a loud CRRRUNCH. The book is free, the desk is scrap." 
            },
            { 
                t: "Attach a sign saying 'artwork'", 
                m: 2, l: 5, a: -5, b: 5, 
                r: "You declare it an installation: 'The Pressure of Knowledge'. Chantal posts it on Instagram. The boss is confused, but says nothing." 
            },
            { 
                t: "Fix the lot with tape", 
                req: "tape", 
                m: 10, l: -5, a: 0, b: 0, 
                r: "You wind tape round it so the damage does not show. 'Repaired'. The desk is now permanently fixed at 1.20m. Ergonomics is overrated anyway." 
            }
        ]
    },
    {
        id: "sq_shredder_1",
        kind: "text",
        title: "Data Protection Extreme",
        text: "An old till receipt needs to go in the shredder. The new 'Smart-Shredder 4000' is blocking the slot. The touchscreen says: 'Please select document category (1-99). Confirm GDPR compliance. Scanning for paper clips...'",
        opts: [
            { 
                t: "Check the collection bin first", 
                loot: "usb_stick",
                next: "path_shred_loot", 
                m: 5, l: 5, a: 0, b: 0, 
                r: "Perhaps the sensor is full? You open the flap underneath. In the paper waste lies a USB stick that somebody has evidently 'shredded' by accident. It still looks intact!" 
            },
            { 
                t: "Fill the form in honestly", 
                next: "path_shred_form", 
                m: 15, l: -10, a: 10, b: 0, 
                r: "You tap your way through 20 submenus. 'Is the document radioactive?' - 'No'. 'Does it contain state secrets?' - 'No'. The slot finally opens. You drop the receipt in." 
            },
            { 
                t: "Just stuff it all in", 
                req: "hammer", 
                next: "path_shred_force", 
                m: 5, l: 0, a: -10, b: 10, 
                r: "You take the hammer handle and force the paper past the sensor flap. The machine howls, swallows the paper and makes a retching noise." 
            }
        ]
    },
    {
        id: "sq_shredder_2a",
        kind: "text",
        title: "A Paper Jam Foretold",
        reqStory: "path_shred_form",
        text: "Hours later. An all-staff email to everyone: 'The shredder is broken. Somebody has tried to destroy thermal paper (a till receipt) in 'glossy brochure' mode. The sensor is gummed up.' Everybody is hunting for the idiot.",
        opts: [
            { 
                t: "Stick the receipt on a sheet of A4 and shred that", 
                req: "tape", 
                m: 10, l: -5, a: 5, b: 0, 
                r: "You go over in secret and fiddle the receipt out. Then you stick it on an ordinary sheet and put it in the bin. Tracks covered." 
            },
            { 
                t: "Eat the receipt", 
                m: 2, l: 5, a: 0, b: 0, 
                r: "The ultimate in data destruction. It tastes of thermal paper and bisphenol A. It was quick, though, and nobody can prove a thing." 
            },
            { 
                t: "'The machine is to blame!'", 
                m: 2, l: 0, a: 20, b: 0, 
                r: "You defend yourself loudly in the corridor. Nobody had accused you, and now you look extremely suspicious." 
            }
        ]
    },
    {
        id: "sq_shredder_2b",
        kind: "text",
        title: "Confetti Party",
        reqStory: "path_shred_force",
        text: "You walk past the copier room. Shreds everywhere, ankle deep. The machine did not care for being force-fed and coughed its entire contents (50 litres) backwards into the room. Egon stands in front of it, dumbfounded.",
        opts: [
            { 
                t: "Fetch the vacuum cleaner", 
                m: 30, l: -10, a: 10, b: 0, 
                r: "You take pity on Egon and vacuum it all up. While doing so you accidentally suck up the shredder's power cable. *POOF*. Now it is completely broken. Just as well." 
            },
            { 
                t: "Run away", 
                m: 5, l: 5, a: 0, b: 10, 
                r: "You turn on your heel. 'Not my rubbish.' Egon will never find the culprit... hopefully." 
            },
            { 
                t: "Call the apprentice", 
                rep: { "Kevin": -10 },
                m: 5, l: 5, a: -5, b: 0, 
                r: "'Kevin! Jigsaw time!' The apprentice arrives and sees the chaos. You hand him the broom without a word. 'Learn something for life.' Managers delegate." 
            }
        ]
    },
    {
        id: "sq_shredder_2c",
        kind: "text",
        title: "Data Protection Incident",
        reqStory: "path_shred_loot",
        text: "You plug the recovered USB stick into your PC. There is one file on it: 'Passwords_All_Staff.xlsx'. Apparently HR wanted to dispose of it 'securely' but put the stick in instead of the paper.",
        opts: [
            { 
                t: "Format it immediately", 
                rem: "usb_stick", 
                m: 5, l: 0, a: 0, b: 0, 
                r: "Too hot. You wipe everything. The 64GB stick belongs to you now, virgin and empty. No glory, no evidence. (Item consumed/used)" 
            },
            { 
                t: "Give it to Gabi: 'Yours?'", 
                rem: "usb_stick",
                rep: { "Gabi": 10 },
                m: 5, l: 0, a: -5, b: 0, 
                r: "You bring it round to Gabi. She goes red. 'Oh! Er... thanks. I have been... looking for that.' She gives you a bar of chocolate as hush money." 
            },
            { 
                t: "Keep the stick", 
                m: 5, l: 5, a: -10, b: 20, 
                r: "You have access to everything now. Even the boss's Netflix account. Powerful is how it feels, and criminal. You push the stick deep into your pocket." 
            }
        ]
    },
    {
        id: "sq_elster_cat_2a",
		char: "Frau Elster",
        kind: "text",
        title: "Gratitude in Accounts",
        reqStory: "path_elster_happy",
        text: "Ms Elster stands clearing her throat in front of your desk. She glances round nervously, opens her handbag and puts an expensive slice of patisserie gateau on the desk for you. 'That is for your... unofficial IT work. Rüdiger is purring again. But woe betide you if anybody hears of it!'",
        opts: [
            { 
                t: "Accept the cake and say nothing", 
                rep: { "Frau Elster": 10 },
                m: 5, l: 5, a: -10, b: 0, 
                r: "You eat the cake. It tastes of marzipan and bribery. Having a powerful ally in the office is worth its weight in gold." 
            },
            { 
                t: "'I only do it for Rüdiger.'", 
                rep: { "Frau Elster": 5 },
                m: 2, l: 0, a: 5, b: 0, 
                r: "She raises an eyebrow. 'Do not be impertinent, Miller.' She leaves, and you can tell that she respects you now." 
            }
        ]
    },
    {
        id: "sq_elster_cat_2b",
		char: "Frau Elster",
        kind: "text",
        title: "The Reckoning",
        reqStory: "path_elster_angry",
        text: "Your last travel expenses claim is lying on your desk. It is marked up in red from top to bottom. Ms Elster has struck out every last cent. 'Parking ticket without a time', 'Meal allowance exceeded by €0.50'. She has taken her revenge for your 'no' during the cat emergency.",
        opts: [
            { 
                t: "Bring the boss in", 
                rep: { "Frau Elster": -10, "Dr. Wichtig": -5 },
                m: 10, l: 0, a: 10, b: 15, 
                r: "The boss is irritated. 'Sort out your own petty wars, Miller!' Ms Elster glares at you on her way out. The war goes on." 
            },
            { 
                t: "Grit your teeth and fill it in again", 
                rep: { "Frau Elster": 5 },
                m: 30, l: -15, a: 20, b: 0, 
                r: "You spend half an hour copying receipts again and typing forms. Your aggression rises beyond measure. Cat owners are not to be annoyed." 
            }
        ]
    },
    {
        id: "sq_elster_cat_2c",
		char: "Frau Elster",
        kind: "text",
        title: "The Food Coma Emergency",
        reqStory: "path_elster_fat",
        text: "Ms Elster storms into the corridor in tears. 'RÜDIGER! He has overeaten! He is just lying on his back breathing heavily! The vet had to pump his stomach! Some sick hacker has tampered with the feeding bowl!'",
        opts: [
            { 
                t: "'That will have been a software bug.'", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "'This cheap Chinese technology!', she sobs. You nod eagerly and make yourself scarce. You are an ice-cold monster." 
            },
            { 
                t: "Guilty conscience: donate the vet's fees anonymously", 
                rep: { "Frau Elster": 5 },
                m: 5, l: 0, a: 15, b: 0, 
                r: "You quietly leave €50 in an envelope on her desk. It eases your guilt a little, and your blood pressure rises with the stress. Poor Rüdiger." 
            }
        ]
    },
    {
        id: "sq_shredder_puzzle_1",
		char: "Frau Elster",
        kind: "text",
        title: "The Jigsaw of Death",
        text: "Ms Elster is kneeling in front of the paper shredder in tears. 'I have shredded the original signed leasing contract by mistake! If the boss sees this I am dead! We have to put it back together!' In front of her lies a mountain of confetti.",
        opts: [
            { 
                t: "Put the headphones on and walk away", 
                req: "headphones",
                next: "path_shredder_ignore",
                rep: { "Frau Elster": -15 },
                m: 2, l: 5, a: -10, b: 0, 
                r: "Click. Noise cancelling on. You look down at her with pity, give her a silent nod and go to your office. Not your mistake, not your problem." 
            },
            { 
                t: "Sit down on the floor and do the jigsaw", 
                next: "path_shredder_puzzle",
                rep: { "Frau Elster": 15 },
                m: 90, l: -20, a: 20, b: 0, 
                r: "You sort paper shreds for 90 endless minutes. The contract is stuck back together by the time you finish. Ms Elster takes it and runs." 
            },
            { 
                t: "Laminate it roughly with duct tape", 
                req: "tape",
                next: "path_shredder_tape",
                rep: { "Frau Elster": 10 },
                m: 15, l: 0, a: 0, b: 0, 
                r: "You slap thick duct tape over the whole thing without mercy and run the monstrosity through the copier. It looks dreadful and it is still legally valid. Ms Elster thanks you hurriedly. You go back to work." 
            }
        ]
    },
    {
        id: "sq_shredder_puzzle_2a",
		char: "Frau Elster",
        kind: "text",
        title: "Eternal Gratitude",
        reqStory: "path_shredder_puzzle",
        text: "Later Ms Elster comes strolling over to your desk. The stress of earlier has entirely evaporated. She lays a gold box of chocolates and a signed blank expenses slip on your desk. 'You have saved my life, Mr Miller.'",
        opts: [
            { 
                t: "'Do you do coffee with that as well?'", 
                rep: { "Frau Elster": -5 },
                m: 2, l: 5, a: 5, b: 0, 
                r: "Her smile freezes. 'You give them an inch...', she mutters, and takes the expenses slip back. She does leave the chocolates, at least." 
            },
            { 
                t: "Decline nobly: 'It was an honour.'", 
                rep: { "Frau Elster": 15 },
                m: 5, l: 0, a: -10, b: -15, 
                r: "Ms Elster is close to tears. 'You are a true gentleman!' She takes the chocolates away again, and from today you are her absolute favourite colleague. That is worth more than confectionery." 
            },
            { 
                t: "Accept the mercy", 
                loot: "chocolate",
                m: 5, l: 0, a: -20, b: -10, 
                r: "The effort has paid off twice over: Ms Elster now sings your praises to everybody, and the chocolate is not bad either." 
            }
        ]
    },
    {
        id: "sq_shredder_puzzle_2b",
		char: "Frau Elster",
        kind: "text",
        title: "The Leasing Return",
        reqStory: "path_shredder_tape",
        text: "Hours after your taping session the boss calls you and Ms Elster into his office. He holds your copied tape version up. 'The bank has rejected this. They say it looks like a serial killer's ransom note. Who did this?!'",
        opts: [
            { 
                t: "Blame the bank", 
                rep: { "Frau Elster": 5 },
                m: 10, l: 0, a: 10, b: 10, 
                r: "'Their scanners are simply out of date, sir!' He sighs. 'Bureaucrats.' Ms Elster breathes out. You have talked the pair of you elegantly out of trouble." 
            },
            { 
                t: "Grass on Ms Elster", 
                rep: { "Frau Elster": -15, "Dr. Wichtig": 5 },
                m: 5, l: 0, a: 0, b: 0, 
                r: "'She shredded it, sir.' Ms Elster bursts into tears. You are the absolute traitor. Her revenge will be cruel." 
            },
            { 
                t: "'We will simply forge the signature again!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 10, l: 0, a: 10, b: 30, 
                r: "'Forgery of documents?! Have you lost your mind?!' The boss throws you out. That was one step too far." 
            }
        ]
    },
    {
        id: "sq_shredder_puzzle_2c",
		char: "Frau Elster",
        kind: "text",
        title: "Cold Turkey",
        reqStory: "path_shredder_ignore",
        text: "You had almost forgotten the shredder drama from earlier. Since you did not help Ms Elster, she had to confess the mistake to the boss. Now, when you want to fetch a new notepad from the stores, she slams the door in your face.",
        opts: [
            { 
                t: "'I only need a pen.'", 
                m: 15, l: -5, a: 15, b: 0, 
                r: "'Closed!', she bellows from inside. You have to argue for 15 minutes before she pushes a pen under the door. Your arrogance earlier has now cost you time." 
            },
            { 
                t: "Break in with the screwdriver", 
                req: "screw",
                m: 5, l: 0, a: 20, b: 10, 
                r: "You simply unscrew the door lock. Ms Elster screeches: 'VANDALISM!' You help yourself to a pen and go. The war escalates further." 
            },
            { 
                t: "Send Kevin the apprentice", 
                rep: { "Kevin": -5 },
                m: 10, l: 10, a: 0, b: 0, 
                r: "You send Kevin. Ms Elster lets him in, but instead of pens he comes back with coloured highlighters. Better than nothing." 
            }
        ]
    },
    {
        id: "sq_fragile_drive_1",
        kind: "text",
        title: "Hazardous Goods Transport",
        text: "You have to take an irreplaceable, entirely unpacked hard drive containing the company's blueprints up to the fourth floor. The lift is broken. The stairs have just been mopped and are extremely slippery. One wrong step and the company's existence shatters on the tiles.",
        opts: [
            { 
                t: "Tread as though on eggshells", 
                next: "path_drive_careful", 
                m: 30, l: -10, a: 20, b: 0, 
                r: "It takes you an age. Every step is a mental feat. Your pulse races, and the drive arrives at the top intact. You are utterly exhausted." 
            },
            { 
                t: "No time! Run!", 
                next: "path_drive_run",
                m: 5, l: 5, a: 30, b: 10, 
                r: "You set off at a sprint. You just about catch yourself on the stairs and wrench your back badly. The drive is intact, and today you walk like the Hunchback of Notre-Dame." 
            },
            { 
                t: "Use the bubble wrap as an airbag", 
                rem: "bubble_wrap", 
                next: "path_drive_wrap", 
                m: 10, l: 0, a: -10, b: -5, 
                r: "You wrap the hard drive thickly in your beloved bubble wrap. You do slip on the stairs, and the wrap cushions the fall perfectly. Data saved, wrap gone." 
            }
        ]
    },
    {
        id: "sq_fragile_drive_2a",
        kind: "text",
        title: "Therapy for Others",
        reqStory: "path_drive_wrap",
        text: "You arrive upstairs and hand over the wrapped hard drive. The colleague unpacks it and immediately starts popping your old bubble wrap with great relish. 'Oooh, thanks, Miller! That is so relaxing!'",
        opts: [
            { 
                t: "Snatch the wrap back: 'That was not a gift!'", 
                loot: "bubble_wrap",
                m: 2, l: 0, a: 5, b: 0, 
                r: "You take the plastic back out of her hands, stone cold. 'That is IT property!' Her look could cut glass, and you have your treasure back." 
            },
            { 
                t: "Let her have the pleasure", 
                m: 2, l: 0, a: -5, b: 0, 
                r: "A good deed done. The popping echoes quietly down the corridor." 
            }
        ]
    },
    {
        id: "sq_fragile_drive_2b",
        kind: "text",
        title: "The Snail",
        reqStory: "path_drive_careful",
        text: "Because you were so extremely slow on the stairs, the project team on the fourth floor narrowly missed the deadline for the blueprints. The project manager stands in front of you, snorting. 'Did you carry that hard drive up or roll it personally?!'",
        opts: [
            { 
                t: "Blame the lift", 
                rep: { "Egon": -5 },
                m: 5, l: 0, a: 0, b: 0, 
                r: "'Take it up with Facilities Management!' You pass the buck along. Egon will wonder why he is suddenly getting angry emails." 
            },
            { 
                t: "'Safety comes first!'", 
                m: 10, l: 0, a: 10, b: 5, 
                r: "You explain the physical consequences of a head crash to him. He does not understand a word, and he is too tired to argue further." 
            }
        ]
    },
    {
        id: "sq_fragile_drive_2c",
        kind: "text",
        title: "Lumbago",
        reqStory: "path_drive_run",
        text: "The bill for your stair sprint: you are at the copier when your lower back seizes up completely. You are stuck at a 90-degree angle. Chantal walks past and stares at you. 'Doing yoga?'",
        opts: [
            { 
                t: "'I am looking for a contact lens!'", 
                m: 5, l: 5, a: 15, b: 0, 
                r: "You creep back to your office bent double. Chantal shrugs. You spend what is left of the day working lying down under your desk." 
            },
            { 
                t: "Ask for help", 
                rep: { "Chantal": 5 },
                m: 15, l: 0, a: 10, b: 0, 
                r: "Chantal fetches a hot water bottle and props you up as far as your chair. 'You poor thing.' Embarrassing, and you can sit more or less upright again." 
            }
        ]
    },
    {
        id: "sq_investor_wifi_1",
        kind: "text",
        title: "The VIP Tantrum",
        text: "Out in the corridor is an important, incandescent investor in a tailored suit. He is bellowing into his phone. 'The stupid VIP Wi-Fi is not working! If I cannot load my share prices in two minutes I am pulling my millions out!' He sees you. 'YOU! TURN THE INTERNET ON!'",
        opts: [
            { 
                t: "Hide behind the coffee machine", 
                next: "path_investor_hide", 
                m: 10, l: 5, a: 0, b: 15, 
                r: "Investors are a matter for the boss. You hide until the shouting in the corridor dies down and the man storms off." 
            },
            { 
                t: "Give him the guest Wi-Fi note", 
                rem: "wifi_note", 
                next: "path_investor_note", 
                rep: { "Dr. Wichtig": 15 },
                m: 2, l: 5, a: -10, b: -20, 
                r: "Without a word you press the crumpled yellow note into his hand. He logs in, takes a deep breath and nods at you gratefully. Company saved." 
            },
            { 
                t: "Restart the VIP router by hand", 
                next: "path_investor_reboot", 
                m: 15, l: -10, a: 20, b: 5, 
                r: "You sprint to the distribution cabinet and reboot the router. By the time you get back, the investor has torn a strip off the boss. There will be trouble." 
            }
        ]
    },
    {
        id: "sq_investor_wifi_2a",
        kind: "text",
        title: "Richly Rewarded",
        reqStory: "path_investor_note",
        text: "The investor has finished his meeting. He claps you on the shoulder as he passes. 'Quick, unbureaucratic solution earlier with that note. I like that sort of thing.' He presses something into your hand and goes.",
        opts: [
            { 
                t: "Look at your hand", 
                m: 5, l: 10, a: -25, b: -10, 
                r: "It is a €50 note! Just like that. A tip in IT? A historic moment. Your mood is at its absolute peak." 
            }
        ]
    },
    {
        id: "sq_investor_wifi_2b",
		char: "Dr. Wichtig",
        kind: "text",
        title: "The Reboot Backlash",
        reqStory: "path_investor_reboot",
        text: "The boss storms into your office. 'Miller! Why did you restart the VIP router?! The investor had a live connection to his bank in Singapore! The order was aborted!'",
        opts: [
            { 
                t: "'Automatic firmware update.'", 
                m: 5, l: 0, a: 0, b: 10, 
                r: "You push it onto the manufacturer. The boss curses Cisco. He leaves you in peace, and his faith in the technology drops." 
            },
            { 
                t: "'He shouted at me!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 10, l: 0, a: 10, b: 20, 
                r: "'He is an investor! He is ALLOWED to shout!' The boss is beside himself. You will not be touching the VIP Wi-Fi again in a hurry." 
            }
        ]
    },
    {
        id: "sq_investor_wifi_2c",
        kind: "text",
        title: "The Hiding Game Comes Out",
        reqStory: "path_investor_hide",
        text: "You are still crouching behind the coffee machine. The investor's head appears over the counter. He looks straight down at you. 'What are you doing down there? Looking for the Wi-Fi?'",
        opts: [
            { 
                t: "Pretend to be cleaning", 
                m: 10, l: -5, a: 15, b: 5, 
                r: "'Yes, very dirty down here!' You rub at the floor with your sleeve. The investor shakes his head. 'A madhouse.' He leaves the building." 
            },
            { 
                t: "Brazen it out: 'I am meditating.'", 
                m: 5, l: 0, a: 10, b: 0, 
                r: "'Innovative corporate culture', mutters the investor, and leaves visibly confused. Embarrassing, and he has forgotten about the Wi-Fi." 
            }
        ]
    },
    {
        id: "sq_sleeping_guard_1",
        kind: "text",
        title: "Deep Sleep at Reception",
        text: "You want to go out through the back entrance. The security man is snoring soundly. His head is resting on a crossword. Outside, a harassed courier is hammering on the glass and urgently wants to hand over an important server spare part.",
        opts: [
            { 
                t: "Hold an energy drink under his nose", 
                rem: "energy", 
                next: "path_guard_energy", 
                m: 5, l: 5, a: -5, b: 0, 
                r: "HISS. You open the can right by his ear. He starts awake, grabs the can by reflex, downs it and opens the door for the courier, wide awake. Perfect." 
            },
            { 
                t: "Open the door yourself and take the parcel", 
                next: "path_guard_package", 
                m: 15, l: -5, a: 5, b: 10, 
                r: "You open the door yourself and sign the form as 'Mickey Mouse'. You carry the heavy thing in yourself. The guard sleeps peacefully on." 
            },
            { 
                t: "Shout at him: 'ALARM!'", 
                next: "path_guard_scream", 
                m: 5, l: 0, a: 15, b: -5, 
                r: "He falls off his chair with the shock and knocks his coffee over. He hates you now, and he does open the door, swearing." 
            }
        ]
    },
    {
        id: "sq_sleeping_guard_2a",
        kind: "text",
        title: "The Hyperactive Guard",
        reqStory: "path_guard_energy",
        text: "The taurine from your energy drink is having its full effect. The guard is now patrolling the corridors with staring eyes and a pulse of 150. He has already put two harmless interns up against the wall and asked for their passes.",
        opts: [
            { 
                t: "Nod in agreement: 'Safety comes first.'", 
                m: 5, l: 5, a: -5, b: 0, 
                r: "The corridor is extremely secure today. Well guarded is the word, even if the interns are crying." 
            },
            { 
                t: "Advise him to calm down", 
                m: 5, l: 0, a: 10, b: 0, 
                r: "'I AM CALM!' he bellows back. All right, understood. Better to avoid eye contact from here on." 
            }
        ]
    },
    {
        id: "sq_sleeping_guard_2b",
        kind: "text",
        title: "Forgery",
        reqStory: "path_guard_package",
        text: "An all-staff email from HR: 'An important parcel was signed for today by 'Mickey Mouse'. Who was that? The parcel did not contain hardware, it contained the new company smartphones. We are taking legal steps!'",
        opts: [
            { 
                t: "Own up: 'I only wanted to help!'", 
                rep: { "Dr. Wichtig": 5 },
                m: 20, l: -5, a: 5, b: 10, 
                r: "You clear the misunderstanding up. HR grumbles about the false signature, and the boss is glad the expensive devices are here." 
            },
            { 
                t: "Blame the security man", 
                m: 10, l: 0, a: 10, b: -10, 
                r: "You report anonymously that the guard was asleep on duty. He gets sacked, you do not get to keep the phones, and you are safe. Dreadful karma." 
            }
        ]
    },
    {
        id: "sq_sleeping_guard_2c",
        kind: "text",
        title: "The Harassment",
        reqStory: "path_guard_scream",
        text: "Back from your break. The guard from earlier is at the door. He recognises you. 'Stop. Pass inspection. And bag inspection. I have to check the serial number on that laptop.'",
        opts: [
            { 
                t: "Play along nicely and de-escalate", 
                m: 15, l: 0, a: 10, b: 0, 
                r: "You take a deep breath and unpack everything. He takes his time about it. You end up massively late for a server restart." 
            },
            { 
                t: "'I HAVE WORKED HERE FOR 5 YEARS!'", 
                m: 10, l: 0, a: 20, b: 5, 
                r: "'Rules are rules', he grins. He leaves you waiting in the cold for 10 minutes before he opens the barrier. The man has a memory and a plan." 
            }
        ]
    },
    {
        id: "sq_boss_fight_hallway_1",
		char: "Markus",
        kind: "text",
        title: "Clash of the Titans",
        text: "Markus the head of sales and Björn from Marketing are standing forehead to forehead in the corridor, bellowing at each other. It is about the last free meeting room. Spittle flies, the faces are purple. Nobody dares squeeze past the pair of them.",
        opts: [
            { 
                t: "Step in sensibly", 
                next: "path_hallway_peace", 
                m: 10, l: 0, a: 25, b: 5, 
                r: "You try to mediate. Both turn to you in unison and bellow: 'YOU KEEP OUT OF IT, IT!' You retreat to your office almost traumatised." 
            },
            { 
                t: "Take the long way round via the stairwell", 
                next: "path_hallway_detour", 
                m: 15, l: 10, a: 0, b: 0, 
                r: "You have absolutely no appetite for this sort of drama. You take the long route through the basement. It takes longer and it spares your nerves." 
            },
            { 
                t: "Deploy the stress ball", 
                req: "stressball", 
                next: "path_hallway_ball", 
                rep: { "Markus": 5 },
                m: 5, l: 5, a: -20, b: -5, 
                r: "You step between them without a word. First you press the ball into Markus's hand – he squeezes it by reflex. Then you hand it to Björn. *Squeak*. You take the ball back without a word and walk on. Both department heads stare after you in complete confusion. Situation defused." 
            }
        ]
    },
    {
        id: "sq_boss_fight_hallway_2a",
		char: "Markus",
        kind: "text",
        title: "The Guru",
        reqStory: "path_hallway_ball",
        text: "Later you see Markus and Björn standing peacefully together over a coffee. As you go past, Markus whispers to Björn: 'Tell me... what was that earlier with Miller and the red ball?' - 'No idea. But my pulse was down to 60 straight afterwards. The man has an aura.'",
        opts: [
            { 
                t: "Nod mystically", rep: { "Markus": 5 }, 
                m: 2, l: 5, a: -10, b: -5, 
                r: "You give the pair of them a knowing nod, say nothing and walk on. The office grapevine has made you a legend." 
            }
        ]
    },
    {
        id: "sq_boss_fight_hallway_2b",
		char: "Markus",
        kind: "text",
        title: "United Enemies",
        reqStory: "path_hallway_peace",
        text: "Your attempt at mediation has had a bizarre effect: Markus and Björn have made common cause over their shared hatred of IT. Both of them now block your bug reports. 'IT is not a priority', Markus says to Björn in the corridor, laughing.",
        opts: [
            { 
                t: "Throw them both off the VPN in revenge", 
                rep: { "Markus": -10 },
                m: 10, l: -5, a: 15, b: 10, 
                r: "You kill their VPN certificates. Let them carry on sniping offline. Your aggression drops briefly, and there will be nasty emails before long." 
            },
            { 
                t: "Sigh and ignore it", 
                m: 5, l: 0, a: 10, b: 0, 
                r: "You have no strength for turf wars. You let them talk and simply carry on working." 
            }
        ]
    },
    {
        id: "sq_boss_fight_hallway_2c",
        kind: "text",
        title: "The Basement Find",
        reqStory: "path_hallway_detour",
        text: "Because you took the long way round through the old basement, you discover a dusty box in the boiler room. Inside is entirely unused old IT kit that somebody forgot years ago.",
        opts: [
            { 
                t: "Take the cable ties", 
                loot: "zip_ties", 
                m: 5, l: 0, a: -5, b: 0, 
                r: "Half a packet of black cable ties. Always useful." 
            },
            { 
                t: "Pocket the screwdriver", 
                loot: "screw", 
                m: 5, l: 0, a: -5, b: 0, 
                r: "A first-class crosshead. The universe rewards the path of least resistance." 
            }
        ]
    },
    {
        id: "sq_printer_jam_1",
        kind: "text",
        title: "Printer on Strike",
        text: "The big department printer is beeping hysterically: 'Paper jam in tray 3'. An angry cluster of staff stands in front of it. Nobody dares open the hatch.",
        opts: [
            { 
                t: "Bravely open the hatch and reach in", 
                next: "path_printer_fix", 
                m: 15, l: -5, a: 10, b: 0, 
                r: "You pull at torn shreds of paper deep inside. Your hands are covered in toner, and the machine prints again." 
            },
            { 
                t: "Threaten it with the manual", 
                req: "manual", 
                next: "path_printer_manual", 
                m: 5, l: 0, a: -5, b: 0, 
                r: "You open the thick book and read aloud: 'Repairs by certified specialist personnel only!' The crowd falls back in awe." 
            },
            { 
                t: "'That is a hardware failure!'", 
                next: "path_printer_lie", 
                m: 2, l: 5, a: 0, b: 5, 
                r: "You hang up an 'OUT OF ORDER' sign like a professional. Problem delegated. Nobody is printing anything else today." 
            }
        ]
    },
    {
        id: "sq_printer_jam_2a",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Black Hands",
        reqStory: "path_printer_fix",
        text: "Your hands are completely black with toner. On the way to the washroom you run into the CEO. He wants to shake your hand cheerfully to congratulate you on your work anniversary.",
        opts: [
            { 
                t: "Shake his dirty hand, stone cold", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, l: 0, a: 10, b: 15, 
                r: "You shake his hand. He stares in horror at his ruined fingers. You have just buried a promotion." 
            },
            { 
                t: "Decline in embarrassment", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "You raise your hands defensively. He nods understandingly. 'Ah, IT at the front line. Carry on!'" 
            }
        ]
    },
    {
        id: "sq_printer_jam_2b",
        kind: "text",
        title: "The Expensive Bill",
        reqStory: "path_printer_manual",
        text: "Because of your 'specialist personnel' remark, an eager colleague has actually called out external support. The engineer stands there, pulls a sheet of paper out of the printer and presents a bill for €250.",
        opts: [
            { 
                t: "Offer the engineer a coffee", 
                m: 15, l: 0, a: -5, b: 10, 
                r: "You bond with the external IT man. The two of you laugh about the incompetence of the workforce. Good for the soul, bad for the budget." 
            },
            { 
                t: "Blame the users", 
                m: 10, l: 0, a: 5, b: 15, 
                r: "You explain to Accounts that the users reacted in a panic. Ms Elster rages. You are in the clear." 
            }
        ]
    },
    {
        id: "sq_printer_jam_2c",
        kind: "text",
        title: "The Alternative",
        reqStory: "path_printer_lie",
        text: "Since the department printer is 'broken', five colleagues are now standing in your office wanting you to print their extremely important documents on your little local printer.",
        opts: [
            { 
                t: "Sigh and work as a print shop", 
                m: 30, l: -5, a: 20, b: 0, 
                r: "For half an hour you print contracts for other people. Your toner cartridge weeps." 
            },
            { 
                t: "Report your own printer broken too", 
                m: 5, l: 10, a: -5, b: 5, 
                r: "You simply pull the USB cable out and shrug. The colleagues withdraw, disappointed." 
            }
        ]
    },
    {
        id: "sq_crying_intern_1",
        kind: "text",
        title: "Tears in the Corridor",
        text: "You find the new intern crying on the stairs. 'I deleted the presentation for the CEO by mistake and emptied the recycle bin. I am going to be sacked!'",
        opts: [
            { 
                t: "Donate chocolate as consolation", 
                rem: "chocolate", 
                next: "path_intern_choc", 
                rep: { "Kevin": 15 },
                m: 10, l: 0, a: -10, b: 0, 
                r: "You press the chocolate into his hand. The chewing calms him at once and he stops crying." 
            },
            { 
                t: "Reach deep into the bag of tricks for a recovery", 
                next: "path_intern_recover", 
                m: 30, l: -5, a: 15, b: -5, 
                r: "You sit down at his desk, dig deep into the file system and rescue the file. Film music plays in your head while you do it. Hollywood could hardly have staged it more tensely." 
            },
            { 
                t: "Tell him coldly that it is over", 
                next: "path_intern_doom", 
                m: 5, l: 5, a: 10, b: 5, 
                r: "Learning through pain. You pat his shoulder and say: 'You may as well start packing up your coffee mug.'" 
            }
        ]
    },
    {
        id: "sq_crying_intern_2a",
        kind: "text",
        title: "The Chocolate Cure",
        reqStory: "path_intern_choc",
        text: "The intern is in front of you again. 'The chocolate was great, thanks! But the file is still gone. What do I do now?'",
        opts: [
            { 
                t: "Take pity and help after all", 
                m: 20, l: -5, a: 10, b: -10, 
                r: "You restore the file from a backup. Your kindness costs you a great deal of time." 
            },
            { 
                t: "Tell him to do it again", 
                m: 5, l: 5, a: -5, b: 0, 
                r: "Stupidity punishes itself. He sits down at PowerPoint, sobbing, and starts from scratch." 
            }
        ]
    },
    {
        id: "sq_crying_intern_2b",
        kind: "text",
        title: "The Truth About the File",
        reqStory: "path_intern_recover",
        text: "You did rescue the presentation, and on opening it you establish that it was not a CEO presentation at all. It is a collection of cat memes for 'Fun Friday'.",
        opts: [
            { 
                t: "Give him a massive dressing-down", 
                m: 5, l: 0, a: 15, b: 0, 
                r: "You bawl him out for wasting half an hour of your time on jokes. He will avoid you from now on." 
            },
            { 
                t: "Add a meme of your own", 
                m: 10, l: 10, a: -5, b: 5, 
                r: "You quickly knock up a picture of a crying intern and slip it in. Humour in IT runs dark." 
            }
        ]
    },
    {
        id: "sq_crying_intern_2c",
        kind: "text",
        title: "The Resignation",
        reqStory: "path_intern_doom",
        text: "In his panic at you, the intern really did pack his things and leave. HR rings: 'Miller! What did you say to the poor boy?! We have to advertise the post all over again!'",
        opts: [
            { 
                t: "'He was overworked, I think.'", 
                m: 5, l: 0, a: 5, b: 5, 
                r: "You put it down to general performance pressure. The company wonders whether the onboarding is too harsh." 
            },
            { 
                t: "'He deleted company data!'", 
                m: 5, l: 0, a: 10, b: 10, 
                r: "You paint him as an incompetent risk. HR grumbles, and cannot touch you on the technical facts." 
            }
        ]
    },
    {
        id: "sq_wrong_delivery_1",
        kind: "text",
        title: "Wrong Delivery",
        text: "A Lieferando courier hurriedly presses a brown paper bag into your hand in passing. 'One pastrami sandwich for... er, the third floor! Have a good day!' He vanishes outside.",
        opts: [
            { 
                t: "Look for the owner on the third floor", 
                loot: "sandwich", 
                next: "path_delivery_search", 
                m: 15, l: -5, a: 10, b: 0, 
                r: "Good-naturedly you walk through every office, and nobody will admit to ordering a sandwich. From admin to postman, and not a word of thanks." 
            },
            { 
                t: "Leave the bag at reception", 
                next: "path_delivery_leave", 
                m: 5, l: 5, a: 0, b: 0, 
                r: "Not your sandwich, not your problem. You put it on the counter and go." 
            },
            { 
                t: "Keep it yourself", 
                loot: "sandwich", 
                next: "path_delivery_keep", 
                m: 2, l: -5, a: -5, b: 5, 
                r: "You take the bag to your office and slide it into the bottom drawer. Free lunch at the company's expense! It already smells all the way out into the corridor."
            }
        ]
    },
    {
        id: "sq_wrong_delivery_2a",
		char: "Frau Elster",
        kind: "text",
        title: "The Hungry Elster",
        reqStory: "path_delivery_keep",
        text: "Ms Elster rings. 'Mr Miller, did you happen to see the courier downstairs? My pastrami sandwich, ordered at company expense, has disappeared!'",
        opts: [
            { 
                t: "Grit your teeth and take the sandwich up", 
                rem: "sandwich", 
                rep: { "Frau Elster": 10 },
                m: 10, l: -5, a: 15, b: 0, 
                r: "You sacrifice your loot. She is delighted. Your hunger is massive and so is your temper." 
            },
            { 
                t: "'No, I saw nobody.'", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "You brush a crumb off your mouth. She will hate the delivery service, and you are full and safe." 
            }
        ]
    },
    {
        id: "sq_wrong_delivery_2b",
        kind: "text",
        title: "The Cold Truth",
        reqStory: "path_delivery_search",
        text: "After 15 minutes of pointless searching across the whole third floor, you still have the sandwich. It is slowly going cold and the grease is soaking through the bag.",
        opts: [
            { 
                t: "Eat it yourself now, in exasperation", 
                m: 5, l: 0, a: -5, b: 5, 
                r: "It tastes fantastic, even lukewarm. Your aggression drops." 
            },
            { 
                t: "Throw it in the bin", 
                m: 2, l: 0, a: 10, b: 0, 
                r: "On principle you do not eat other people's food. You throw €15 in the bin." 
            }
        ]
    },
    {
        id: "sq_wrong_delivery_2c",
        kind: "text",
        title: "The Smell of Decay",
        reqStory: "path_delivery_leave",
        text: "The bag stood on the counter in the sun for hours. The whole entrance area now smells unpleasantly of old pastrami.",
        opts: [
            { 
                t: "Call Egon to clean it up", 
                rep: { "Egon": -5 },
                m: 10, l: 5, a: 5, b: 0, 
                r: "Egon curses for minutes about the 'filthy animals' in this company. You agree with him hypocritically." 
            },
            { 
                t: "Go quickly through the back entrance", 
                m: 5, l: 5, a: 0, b: 0, 
                r: "You avoid the lobby entirely. What you do not see does not exist." 
            }
        ]
    },
    {
        id: "sq_drafty_door_1",
        kind: "text",
        title: "The Icy Wind",
        text: "The automatic sliding door to the courtyard is broken and stands permanently open. An icy wind blows down the corridor. Colleagues sit at their desks in scarves and hats.",
        opts: [
            { 
                t: "Call Egon and wait", 
                next: "path_door_egon", 
                m: 15, l: -5, a: 15, b: 5, 
                r: "Egon turns up after 15 minutes, curses the technology and kicks the door. It stays open." 
            },
            { 
                t: "Fix the doors together with cable ties", 
                req: "zip_ties", 
                next: "path_door_zip", 
                m: 10, l: 0, a: -5, b: 0, 
                r: "You lash the glass panels tightly together. The draught has gone, and nobody can get into the courtyard any more." 
            },
            { 
                t: "Tape the sensor over with duct tape", 
                req: "tape", 
                next: "path_door_tape", 
                m: 5, l: 0, a: 0, b: 0, 
                r: "One strip of tape across the motion sensor. The door closes immediately. Gloriously warm." 
            }
        ]
    },
    {
        id: "sq_drafty_door_2a",
        kind: "text",
        title: "The Angry Smoker",
        reqStory: "path_door_zip",
        text: "A manager wanted to get out to the courtyard for a smoke. He forced his way against your fixed cable ties and now the sliding door's guide rail is completely bent.",
        opts: [
            { 
                t: "Hold him responsible for the damage", 
                m: 10, l: 0, a: 5, b: -5, 
                r: "You take photographs and report him. He is furious, and the boss praises your eye for protecting company property." 
            },
            { 
                t: "Quickly cut the cable ties off", 
                m: 5, l: 5, a: 10, b: 0, 
                r: "You dispose of the evidence. The door is now broken AND open." 
            }
        ]
    },
    {
        id: "sq_drafty_door_2b",
        kind: "text",
        title: "Trapped in the Courtyard",
        reqStory: "path_door_tape",
        text: "Your tape trick was too good. The door will not open at all from outside. Three smokers stand freezing in the courtyard, hammering on the glass in a panic because they cannot get back in.",
        opts: [
            { 
                t: "Laugh at them and wave", 
                m: 5, l: 5, a: -10, b: 10, 
                r: "A magnificent moment. Smoking damages your health, after all." 
            },
            { 
                t: "Show mercy and peel the tape off", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "You peel the tape off. They tumble in, frozen, and thank you." 
            }
        ]
    },
    {
        id: "sq_drafty_door_2c",
        kind: "text",
        title: "The Fan Heater",
        reqStory: "path_door_egon",
        text: "Egon has given up on the door. Instead he has put a gigantic, loud, red building-site fan heater in the corridor. It draws so much current that the ceiling lights flicker.",
        opts: [
            { 
                t: "Quietly unplug the heater", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "The server circuit matters more to you than warm feet in the corridor." 
            },
            { 
                t: "Warm your hands on it", 
                m: 10, l: 10, a: -5, b: 5, 
                r: "You spend 10 minutes at the warm source. Glorious." 
            }
        ]
    },
    {
        id: "sq_elearning_1",
        kind: "text",
        title: "E-Learning of Death",
        text: "Sabine from HR sends a system lock. 'The annual compliance training 'Synergetic Sitting' is overdue!' An unskippable video module starts on your main monitor. It lasts exactly 90 minutes and checks with a click every 5 minutes that you are still awake.",
        opts: [
            { 
                t: "Sit the 90 minutes out honestly", 
                next: "path_elearn_honest", 
                m: 90, l: -15, a: 30, b: -10, 
                r: "You stare for 90 minutes at a man in a polo neck talking about lumbar vertebrae. Every 5 minutes you click 'I am still here'. Your aggression simmers, and HR is happy." 
            },
            { 
                t: "Forge the certificate with the root password", 
                req: "admin_pw", 
                next: "path_elearn_hack", 
                m: 5, l: 15, a: -5, b: 20, 
                r: "You log into the back end and set the value against your name to 'Passed'. Takes 5 minutes. If that comes out in an audit, you are finished." 
            },
            { 
                t: "Use a mouse jiggler and sleep", 
                next: "path_elearn_sleep", 
                m: 90, l: 30, a: -10, b: 10, 
                r: "You clip your watch to the mouse, put your feet on the desk and doze off. The 90 minutes pass like a dream." 
            }
        ]
    },
    {
        id: "sq_elearning_2a",
		char: "Dr. Wichtig",
        kind: "text",
        title: "Ergonomics Expert",
        reqStory: "path_elearn_honest",
        text: "The boss comes into your office. 'Miller, HR reports that you scored 100% on the video's reflex tests. You must be a master of ergonomic sitting!'",
        opts: [
            { 
                t: "'I sold my soul for that.'", 
                m: 5, l: -5, a: 10, b: 5, 
                r: "He waves it away. 'Health comes first, Miller.' You roll your eyes." 
            },
            { 
                t: "Straighten your back and nod", 
				rep: { "Dr. Wichtig": 5 },
                m: 2, l: 0, a: -10, b: -5, 
                r: "You draw yourself up. The boss nods his approval. The pain of those 90 minutes was at least good for the image." 
            }
        ]
    },
    {
        id: "sq_elearning_2b",
        kind: "text",
        title: "The Audit",
        reqStory: "path_elearn_hack",
        text: "Sabine (HR) rings. 'Mr Miller? Our system shows that you completed the 90-minute video in exactly 14 seconds. Have you been hacking the software?'",
        opts: [
            { 
                t: "'Cache synchronisation!'", 
                m: 10, l: 0, a: 10, b: -10, 
                r: "You waffle about 'asynchronous timestamps in the server'. Sabine understands nothing and gives up. 'IT and their errors...', she sighs. Phew." 
            },
            { 
                t: "'Your system is out of date!'", 
                m: 5, l: 0, a: 5, b: 15, 
                r: "You criticise the HR software sharply. She is offended and forwards your message — verbatim, to the boss, with the note 'for information'." 
            }
        ]
    },
    {
        id: "sq_elearning_2c",
		char: "Markus",
        kind: "text",
        title: "The Snorer",
        reqStory: "path_elearn_sleep",
        text: "You thought you had gone unnoticed. Markus from Sales is leaning in the doorway, grinning. 'Have a nice sleep, Sleeping Beauty? I heard you snoring as I went past. What is my silence worth to you?'",
        opts: [
            { 
                t: "'I will delete your leads.'", 
                rep: { "Markus": -10 },
                m: 5, l: -5, a: 15, b: 10, 
                r: "You threaten him back. Markus raises his hands. 'Whoa, steady on, tiger. It was only a joke.' He leaves, and the relationship is poisoned." 
            },
            { 
                t: "Give him a stale doughnut", 
                rem: "donut",
                rep: { "Markus": 5 },
                m: 5, l: 5, a: -5, b: -5, 
                r: "Markus takes the doughnut. 'Bribery? Accepted.' He bites into it and goes." 
            }
        ]
    },
    {
        id: "sq_workout_1",
        kind: "text",
        title: "Exorcism in the Office",
        text: "You are on an errand on the third floor. When you look into the marketing office, your blood runs cold. Half the department is lying on the floor, twitching wildly, eyes rolled back, groaning loudly. It looks like a major medical emergency or a collective summoning of demons!",
        opts: [
            { 
                t: "Call an ambulance in a panic", 
                next: "path_workout_panic", 
                m: 15, l: 0, a: 25, b: 5, 
                r: "You bellow 'PARAMEDICS!' and dial 112. Chantal sits up, irritated. 'Are you mad?! This is 'Agile Floor Pilates'! You are ruining our flow!' Embarrassing." 
            },
            { 
                t: "Lie down with them, fascinated", 
                next: "path_workout_join", 
                m: 90, l: 35, a: -15, b: 10, 
                r: "You simply lie down with them. For 90 minutes you twitch and stretch unproductively on the carpet. It is bizarre, the time flies past, and your back cracks in a way that sets you free." 
            },
            { 
                t: "Eat chocolate and watch", 
                rem: "chocolate",
                next: "path_workout_watch", 
                m: 30, l: 15, a: -10, b: 0, 
                r: "You lean against the doorframe, bite into your chocolate and watch the absurd spectacle at leisure for 30 minutes, like a documentary." 
            }
        ]
    },
    {
        id: "sq_dance_2a",
        kind: "text",
        title: "The Fleeing Dancer",
        reqStory: "path_dance_flee",
        text: "You walk down the corridor hunched and ashamed. A colleague from Sales points at you and laughs so hard he cannot breathe. 'There he is! The fleeing dancer! The GIF of your panicked face after the moonwalk already has 10,000 views on LinkedIn!'",
        opts: [
            { 
                t: "Laugh along, self-deprecatingly", 
                m: 15, l: 5, a: -15, b: 0, 
                r: "You put a brave face on it and laugh along. That takes the sting out of the joke. People respect you for being able to laugh at yourself." 
            },
            { 
                t: "Glare at him and walk off", 
                m: 5, l: 0, a: 15, b: 0, 
                r: "You give him the finger and go. Now people laugh behind your back. You are seething." 
            }
        ]
    },
    {
        id: "sq_dance_2b",
		char: "Chantal",
        kind: "text",
        title: "The New Star",
        reqStory: "path_dance_finish",
        text: "Chantal from Marketing all but leaps into your arms in the corridor. 'Miller! Your dance! The investors love our young, dynamic culture. The clip is going completely viral! The boss says you are to do PR work!'",
        opts: [
            { 
                t: "Refuse the fame: 'Leave me alone.'", 
                rep: { "Chantal": -10, "Dr. Wichtig": -5 },
                m: 5, l: -5, a: 10, b: 5, 
                r: "You push Chantal away and flee back to real work. You have thrown away an epic career boost." 
            },
            { 
                t: "Sign autographs and sit through PR appointments", 
                rep: { "Chantal": 20, "Dr. Wichtig": 15 },
                m: 60, l: 20, a: -15, b: -10, 
                r: "You become the mascot. You spend a solid hour waving at cameras and taking selfies. An enormous waste of time, and your ego and the boss love it." 
            }
        ]
    },
    {
        id: "sq_awkward_2a",
		char: "Chantal",
        kind: "text",
        title: "The Hot Rumour",
        reqStory: "path_awkward_elster",
        text: "Chantal is stage-whispering at the water cooler as you go past: '...and then Ms Elster caught the two of them in the server room! On the floor! Poor Kevin, that is abuse of a position of authority!' She sees you and falls silent, shocked.",
        opts: [
            { 
                t: "'He was only stuck!'", 
                rep: { "Chantal": -5 },
                m: 10, l: 0, a: 15, b: 5, 
                r: "You try to explain. Chantal nods slowly. 'Of course... 'stuck'. Very creative, Miller.' Nobody believes you. Your reputation has taken a knock." 
            },
            { 
                t: "Give in to the urge to flee", 
                m: 5, l: 5, a: 10, b: 15, 
                r: "You turn round and run. Which of course looks like an admission of guilt. The rumour mill really goes into overdrive now." 
            }
        ]
    },
    {
        id: "sq_awkward_2b",
		char: "Kevin",
        kind: "text",
        title: "The Blackmailer",
        reqStory: "path_awkward_photo",
        text: "You are standing in the lobby. Kevin heads you off. He seems unusually confident. 'That photo... delete it. Otherwise I tell the boss that you made me clean your keyboard with a toothbrush.'",
        opts: [
            { 
                t: "'Go on then!'", 
                rep: { "Kevin": -15, "Dr. Wichtig": -5 },
                m: 10, l: 0, a: -5, b: 20, 
                r: "'Try it, sonny!' Kevin actually does run to the boss. You get to keep the photo and land in trouble later for 'abuse of authority'." 
            },
            { 
                t: "Capitulate and delete the photo", 
                rep: { "Kevin": 5 },
                m: 5, l: 0, a: 10, b: 0, 
                r: "You press 'delete'. Kevin nods coolly. 'Good call, boomer.' The apprentice has just dominated you." 
            }
        ]
    },
        {
        id: "sq_fire_ext_1",
        kind: "text",
        title: "Crime Scene: Office 312",
        text: "On your rounds you enter office 312. The room is empty, but there is an acrid smell of melted plastic and burnt cheese. A fire extinguisher stands abandoned in the middle of the room. On the desk a completely destroyed, illegal sandwich toaster is smouldering away. The culprit evidently put it out in a panic and fled.",
        opts: [
            { 
                t: "Keep blasting the toaster with powder", 
                next: "path_sq_ext_spray", 
                m: 15, l: 10, a: -15, b: 5, 
                r: "Better safe than sorry! You pull the lever and engulf the toaster (and half the desk) in a thick white snowscape of CO2 powder. That felt extremely good!" 
            },
            { 
                t: "Hang it back on the hook by the book", 
                next: "path_sq_ext_order", 
                m: 10, l: -10, a: 5, b: -10, 
                r: "Order must be kept! You carry the heavy device out into the corridor and hang it neatly back on its red bracket. You are the unsung hero of workplace safety." 
            },
            { 
                t: "Discreetly pocket the fire extinguisher", 
                loot: "fire_ext", 
                next: "path_sq_ext_loot", 
                m: 5, l: -5, a: -5, b: 0, 
                r: "You never know when you will need one of these. You make the red bottle disappear discreetly into your backpack. Better get out of here quickly before somebody spots you." 
            }
        ]
    },
    {
        id: "sq_fire_ext_2a",
        kind: "text",
        char: "Kevin",
        title: "The Arsonist",
        reqStory: "path_sq_ext_loot",
        text: "Kevin comes rushing at you in a panic. 'Boss! Have you seen the fire extinguisher from office 312 by any chance?! I made myself a cheese toastie in there in secret and it caught fire. I was about to hang it back so Egon the caretaker would not notice, and it has gone!'",
        opts: [
            { 
                t: "'The new extinguishers have GPS trackers.'", 
                m: 5, l: 5, a: -10, b: 0, 
                r: "Kevin's eyes go wide. 'GPS?! Oh God, HR will know exactly that it was last with me!' He forgets the search instantly and sprints off to work out a watertight alibi for the time of the offence. You grin to yourself." 
            },
            { 
                t: "'Egon has already taken it.'", 
                rep: { "Kevin": 5 },
                m: 5, l: 5, a: 0, b: 10, 
                r: "Kevin goes chalk white. 'Oh my God. I am dead. Egon will wall me up in the boiler room!' He runs off in tears. You have your peace and your new tool is safe." 
            }
        ]
    },
    {
        id: "sq_fire_ext_2b",
        kind: "text",
        char: "Egon",
        title: "Winter in Office 312",
        reqStory: "path_sq_ext_spray",
        text: "Egon the caretaker is raging in the corridor. He has discovered office 312. 'WHO THE DEVIL SPRAYED 10 KILOS OF EXTINGUISHER POWDER IN HERE?! The toaster was already out! The whole carpet is ruined! I am getting security, we are going through the cameras!'",
        opts: [
            { 
                t: "Join in: 'Unbelievable, these vandals!'", 
                rep: { "Egon": 5 },
                m: 5, l: 0, a: -10, b: 10, 
                r: "You stand beside him and shake your head theatrically. 'Egon, you have my full sympathy. Properly antisocial.' Egon nods with a grunt. Camouflage is everything." 
            },
            { 
                t: "Delete the camera footage in a panic", 
                req: "admin_pw",
                m: 15, l: -5, a: 10, b: -20, 
                r: "You log quickly into the system with your root rights and delete the video files from earlier. Egon finds nothing. You have narrowly survived a heart attack." 
            }
        ]
    },
    {
        id: "sq_fire_ext_2c",
        kind: "text",
        title: "The Broken Seal",
        reqStory: "path_sq_ext_order",
        text: "The Fire Safety Officer stands at the extinguisher you hung back so exemplarily. He notes something on his clipboard. 'Mr Miller! Good that the device is back in place. HOWEVER: the safety seal is broken and it is half empty! Did you not check that?!'",
        opts: [
            { 
                t: "'I am not the caretaker!'", 
                m: 10, l: 0, a: 10, b: -5, 
                r: "You argue that you only handled the physical return. He sighs. 'Always these excuses from IT. I shall have to write a maintenance order.' Irritating." 
            },
            { 
                t: "Blame Kevin", 
                rep: { "Kevin": -15 },
                m: 5, l: 5, a: 0, b: 5, 
                r: "'That was Kevin's toaster fire!', you reveal, stone cold. The inspector charges off at once to tear a strip off the apprentice. You acted by the book." 
            }
        ]
    },

    // --- PHONE EVENTS (chat system) ---
    { 
        id: "sq_telegram", 
        kind: "phone", 
        appName: "Telegram", 
        title: "Group: Shadow IT", 
        startNode: "root", 
        nodes: { 
            "root": {  
                text: "Admn_Rogue: 'Miller! We are manipulating the time system today. From now on we do nothing at all, and the system keeps logging away merrily. Are you in?'",  
                opts: [ 
                    { t: "Definitely, I am in! Send it over.", next: "yes" }, 
                    { t: "Too hot for me. If HR notices, we all go.", next: "no" }, 
                    { t: "I am not sticking my neck out for nothing. What is in it for me?", next: "haggle" } 
                ] 
            }, 
            "yes": {  
                text: "Admn_Rogue: 'Nice. Install the attached script on the mainframe. The password is 1234.'",  
                opts: [ 
                    { t: "[Download and run the attached script]", next: "done_hack" }, 
                    { t: "Ooh, leave it. The boss has me on his radar as it is. I am out.", next: "chicken" } 
                ] 
            }, 
            "haggle": { 
                text: "Admn_Rogue: 'We will give you the root password. That makes you the god of the network.'", 
                opts: [ 
                    { t: "Deal! Hand over the rights.", next: "deal_pw" }, 
                    { t: "I am not risking a written warning for a password. No thanks.", next: "no" } 
                ] 
            }, 
            "no": {  
                text: "Admn_Rogue: 'Boring. We are deleting you from the group.'",  
                opts: [ 
                    { t: "[Mute and archive the chat]", next: "kicked" } 
                ] 
            } 
        }, 
        results: { 
            "done_hack": { 
                txt: "[System: script executed successfully] The time recording is manipulated. You do absolutely nothing for the rest of the day while the system works away busily on your behalf.", 
                m: 10, l: 30, a: -10, b: 20 
            }, 
            "chicken": { 
                txt: "Admn_Rogue: 'Coward.' [System: chat ended] You got cold feet at the last moment. Nothing happened, and your conscience is clear.", 
                m: 2, l: 0, a: 5, b: 0 
            }, 
            "kicked": { 
                txt: "[System: you have been removed from the group] Shadow IT is operating without you now. Dull, admittedly, and you do not lose your job today.", 
                m: 2, l: -5, a: 0, b: -5 
            }, 
            "deal_pw": { 
                txt: "[File received: keys.txt] You have the root password! An extremely powerful tool. The manipulation runs in the background and you take it very easy indeed from here.", 
                m: 5, loot: "admin_pw", l: 10, a: 0, b: 10 
            } 
        } 
    },
    { 
        id: "sq_spam", 
        kind: "phone", 
        appName: "SMS", 
        title: "Spam Bot", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "InfoService: Congratulations! A brand new iPhone 50 is yours! Click here: www.virus-load.ru. Click NOW for your prize!", 
                opts: [ 
                    { t: "[Click the link]", next: "virus_start" }, 
                    { t: "[Delete the message immediately]", next: "clean" } 
                ] 
            }, 
            "virus_start": { 
                text: "[Browser opens...] DOWNLOADING... 99%... INSTALLING ROOTKIT...", 
                opts: [ 
                    { t: "[Abort the process in a panic! Press X!]", next: "virus_fail" }, 
                    { t: "[Wait and see, perhaps there really is a phone...]", next: "virus_doom" } 
                ] 
            } 
        }, 
        results: { 
            "clean": { 
                txt: "[System: text message deleted] Very wise. You have seen enough real viruses in IT already.", 
                m: 2, l: -5, a: 0, b: 0 
            }, 
            "virus_fail": { 
                txt: "[System: download successfully aborted] That was damned close. Your pulse is hammering in your throat.", 
                m: 2, l: 0, a: 10, b: 0 
            }, 
            "virus_doom": { 
                txt: "[System: VIRUS ACTIVE] Your phone starts playing extremely loud techno schmaltzy pop at maximum volume. The boss is already looking in your direction in warning!", 
                m: 5, l: 0, a: 30, b: 40 
            } 
        } 
    },
    { 
        id: "sq_tinder_1", 
        kind: "phone", 
        appName: "LoveMatch", 
        title: "New Match!", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Lisa (distance: 15m): 'Hey! You are the admin who is always staring out of the window in despair, right? I desperately need an escape from my spreadsheets. Fancy a coffee? On me.'", 
                opts: [ 
                    { t: "Love to! A coffee is my absolute rescue plan right now.", next: "date_yes" }, 
                    { t: "Sorry, a server is literally on fire here. No time.", next: "date_no" }, 
                    { t: "Is this a trap? Are you from HR checking my break times?", next: "hr_check" } 
                ] 
            }, 
            "date_yes": { 
                text: "Lisa: 'Great! Meet you in the lobby in 5 mins. I will recognise you by the checked shirt, right? 😉'", 
                opts: [ 
                    { t: "Guilty. See you in the lobby!", next: "go_date" }, 
                    { t: "[Unmatch out of inexplicable panic]", next: "ghost" } 
                ] 
            }, 
            "hr_check": { 
                text: "Lisa: 'LOL no! 😂 I am in Marketing. I only want caffeine, not a compliance audit. Promise!'", 
                opts: [ 
                    { t: "Phew, all right. See you at the coffee machine in the lobby!", next: "go_date" }, 
                    { t: "[Block user] That is exactly what an HR spy would say...", next: "date_no" } 
                ] 
            } 
        }, 
        results: { 
            "date_no": {  
                txt: "[System: match dissolved] You stay alone at your desk, and at least you are absolutely safe from any HR traps. Trust nobody.",  
                m: 2, l: -5, a: 0, b: 0  
            }, 
            "go_date": {  
                txt: "[Device locked] The date in the lobby went splendidly! The two of you spent 20 minutes slagging off printers. She even got your joke about IPv6 (or so you believe).",  
                m: 20, l: 20, a: -20, b: 0, 
                next: "lisa_contact" 
            }, 
            "ghost": {  
                txt: "[System: match dissolved] Pure panic set in and you hid in the toilet. Later you see her standing sadly on her own by the machine. Your self-worth is in the cellar.",  
                m: 10, l: -10, a: 5, b: 0  
            } 
        } 
    },
    { 
        id: "sq_tinder_2", 
        kind: "phone", 
        appName: "Message", 
        title: "Lisa (Marketing)", 
        reqStory: "lisa_contact", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Lisa writes: 'Hey you! 😘 That was really nice the other day. Listen... my laptop is making these odd noises. And the ticket system is so complicated. Could you pop over and have a quick look? As a private favour? 😉'", 
                opts: [ 
                    { t: "Sure, over in two minutes! 😘", next: "help_simp" }, 
                    { t: "Sorry Lisa, you will have to raise a ticket officially for that.", next: "help_ticket" } 
                ] 
            }, 
            "help_simp": { 
                text: "[System: you went over and dusted her fan out] Lisa: 'You are my absolute hero! 😍 Coffee later as a thank you?'", 
                opts: [ 
                    { t: "Love to! Looking forward to it.", next: "res_simp" } 
                ] 
            }, 
            "help_ticket": { 
                text: "Lisa: 'Wow. Seriously? I thought we had... something special. Forget it. 🙄'", 
                opts: [ 
                    { t: "Rules are rules, sorry. 🤷‍♂️", next: "res_friendzone" } 
                ] 
            } 
        }, 
        results: { 
            "res_simp": {  
                txt: "[Chat muted] There is a romance in the office. Advantage: free coffee. Drawback: that makes you her official unpaid, personal 24/7 IT support.",  
                m: 10, l: -10, a: -15, b: 10  
            }, 
            "res_friendzone": {  
                txt: "[System: Lisa has blocked you] Match dissolved. Your professional admin pride is intact and you do not have to clean her germ-ridden laptop.",  
                m: 5, l: 10, a: 5, b: 0  
            } 
        } 
    },
    { 
        id: "sq_phone_parking_taped", 
        kind: "phone", 
        appName: "SMS", 
        reqStory: "sq_parking_2_taped", 
        title: "Unknown Number", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "[Image received: your taped masterpiece in the car park] Auditor: 'Who did that?! It is genius! I cannot get the driver's door open, but deepest respect. Whoever it was: come to my office. - The External Auditor'", 
                opts: [ 
                    { t: "That was me. Duct tape solves every problem!", next: "res_respect" }, 
                    { t: "[Ignore the message and hide under the desk in a panic]", next: "res_fear" } 
                ] 
            }, 
            "res_respect": { 
                text: "Auditor: 'Hahaha! Somebody with a backbone in this company at last. Come over for a coffee. I shall be merciful with your servers at the next IT inspection.'", 
                opts: [ 
                    { t: "Perfect, that is a deal. On my way.", next: "end_respect" } 
                ] 
            }, 
            "res_fear": { 
                text: "[System: you stare at the display and do not reply] Auditor: 'Hello? Nobody? Shame. That tape really does hold damned well, though...'", 
                opts: [ 
                    { t: "[Delete the chat for good]", next: "end_fear" } 
                ] 
            } 
        }, 
        results: { 
            "end_respect": { 
                txt: "[System: chat ended] You go over to his office. The auditor is your biggest fan now. A prank like that does the soul good - all the trouble is off your back in one go.", 
                m: 10, l: 0, a: -15, b: -10 
            }, 
            "end_fear": { 
                txt: "The message goes unanswered. You sweat with fear of the consequences. You have thrown away the chance of a genuinely powerful ally.", 
                m: 2, l: 0, a: 5, b: 0 
            } 
        } 
    },
    { 
        id: "sq_phone_parking_blocked", 
        char: "Dr. Wichtig",
        kind: "phone", 
        appName: "WhatsApp", 
        reqStory: "sq_parking_2_blocked", 
        title: "Dr. Wichtig (Boss)", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Dr. Wichtig: 'MILLER! Your Corsa is in my flight path! I have a highly important appointment at the golf club in 5 minutes. MOVE THAT THING!'", 
                opts: [ 
                    { t: "[Grab the phone and run straight down to the car park]", next: "res_fast" }, 
                    { t: "[Mark the message as unread and ignore the phone]", next: "res_ignore" } 
                ] 
            }, 
            "res_fast": { 
                text: "[System: chat left. You sprint downstairs, out of breath] You are in the car park. The boss is waving his SUV keys about wildly.", 
                opts: [ 
                    { t: "[Grit your teeth, get in and move the car]", next: "end_fast" } 
                ] 
            }, 
            "res_ignore": { 
                text: "[System: chat muted] You simply let the phone vibrate on the desk. 10 minutes later you hear him swearing extremely loudly outside. He does seem to be having to call a taxi.", 
                opts: [ 
                    { t: "Sounds expensive. Shame. [System: back to work]", next: "end_ignore" } 
                ] 
            } 
        }, 
        results: { 
            "end_fast": { 
                txt: "You come back to your desk sweating. You have pacified the boss and you are completely done in. Running errands is not in your job description.", 
                rep: { "Dr. Wichtig": 2 },	
                m: 15, l: -10, a: -5, b: 5 
            }, 
            "end_ignore": { 
                txt: "That was an expensive taxi to the golf club. The boss is livid with you, and your inner karma account is throwing a party, and it cost you no effort whatsoever.", 
                rep: { "Dr. Wichtig": -5 },	
                m: 5, l: 15, a: 20, b: -10 
            } 
        } 
    },
    { 
        id: "sq_headhunter_1", 
        kind: "phone", 
        appName: "Call", 
        title: "Unknown Number", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Incoming call... A soft voice: 'Mr Miller? Elena from TechHunt here. We are looking for talent that... handles information flexibly.'", 
                opts: [ 
                    { t: "Not interested. I would rather die loyal here.", next: "res_loyal" }, 
                    { t: "Sounds lucrative. I am all ears.", next: "headhunter_listen" } 
                ] 
            }, 
            "headhunter_listen": { 
                text: "'Interesting. We shall call back when you have some... leverage.'", 
                opts: [ 
                    { t: "All right, I will keep my eyes open.", next: "res_listen" } 
                ] 
            } 
        }, 
        results: { 
            "res_loyal": { txt: "'Wow. Stockholm syndrome? All right, bye.' *Click*", m: 5, l: 0, a: 5, b: 0 }, 
            "res_listen": { txt: "She hangs up. The sense of being watched settles in.", m: 5, l: 0, a: 0, b: 5, next: "sq_headhunter_2_active" } 
        } 
    },
    {
        id: "sq_headhunter_2",
        kind: "phone",
        appName: "Call",
        title: "Call Back (Elena)",
        reqStory: "sq_headhunter_2_active",
        startNode: "root",
        nodes: {
            "root": {
                text: "Elena rings again. 'Well? Have you thought about the offer? We need somebody who knows the inner workings of GlobalCorp.'",
                opts: [
                    { t: "I might have a document... a 'Blacklist'.", req: "secret_list", next: "offer_secrets" },
                    { t: "Let us talk about my profile perfectly normally.", next: "standard_interview" }
                ]
            },
            "offer_secrets": {
                text: "You read out names from the list you found in the printer. Silence. Then: 'That is worth its weight in gold. We will offer you double.'",
                opts: [
                    { t: "Deal. I will stay here as a mole, though.", next: "res_rich" }
                ]
            },
            "standard_interview": {
                text: "Blah blah synergies, blah blah team player. She does not seem terribly impressed by your standard CV. 'We shall be in touch.'",
                opts: [
                    { t: "Fine, I shall wait.", next: "res_fail" }
                ]
            }
        },
        results: {
            "res_rich": { 
                txt: "A handsome 'consultancy fee' lands in your offshore account. You are officially a corporate spy now. Your conscience is astonishingly quiet when the balance is right.", 
                m: 15, l: 10, a: -20, b: 5
            },
            "res_fail": { 
                txt: "The headhunter never gets in touch again. Classic ghosting. Your standard CV was evidently not 'disruptive' enough for her.", 
                m: 5, l: 0, a: 5, b: 0 
            }
        }
    },
    { 
        id: "sq_darknet", 
        kind: "phone", 
        appName: "Tor Browser", 
        title: "The Offer", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Anon: 'I pay 1 Bitcoin per record for internal company secrets. Completely anonymous via an escrow system. Interested in quick money?'", 
                opts: [ 
                    { t: "[Close the chat at once and end the session]", next: "good" }, 
                    { t: "How exactly do you picture this? I am all ears.", next: "bad" } 
                ] 
            }, 
            "bad": { 
                text: "Anon: 'Just run a dump of your customer database over this secured onion link. My scripts wash away every trace. Nobody will ever notice.'", 
                opts: [ 
                    { t: "[Select the file 'CustomerDatabase.sql' and start the upload]", next: "crime" }, 
                    { t: "No, that is a size too big for me. I am out.", next: "chicken" } 
                ] 
            } 
        }, 
        results: { 
            "good": { 
                txt: "[Connection closed] You stay clean. Your conscience is clear and you are not risking a prison sentence for a bit of crypto.", 
                m: 2, l: 0, a: 0, b: -10 
            }, 
            "chicken": { 
                txt: "[System: Tor identity renewed] You back out at the last moment. That was damned close, and better this way. Hands off the dark web.", 
                m: 2, l: 0, a: 5, b: 0 
            }, 
            "crime": { 
                txt: "[Upload 100% - 1 BTC received] You really did it. All at once you are extremely rich! The paranoia kicks in immediately, though. Every glance from the boss now reads like an interrogation.", 
                m: 10, l: 20, a: -50, b: 50 
            } 
        } 
    },
    { 
        id: "sq_moral_bernd", 
        kind: "phone", 
        appName: "Teams", 
        title: "Bernd (Sales)", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Bernd: 'Listen, very delicate subject. Can you type right now? I have sent the client our internal costing with our huge margin on it instead of the quote by mistake! 😱 If the boss finds out about this I can go and fetch a cardboard box! Can you delete the mail off the server before the client opens it?'", 
                opts: [ 
                    { t: "All right, I will delete it. You owe me, though.", next: "wipe" }, 
                    { t: "Forget it. If this comes out I go down with you.", next: "deny" }, 
                    { t: "And what is in it for me on this one?", next: "deal" } 
                ] 
            }, 
            "deal": { 
                text: "Bernd: 'I will give you €50 cash in hand! Get on with it, he is online right now!'", 
                opts: [ 
                    { t: "Deal. Bring the fifty to my office later.", next: "cash" }, 
                    { t: "Leave it. My logs do not lie, it will show up.", next: "deny" } 
                ] 
            } 
        }, 
        results: { 
            "wipe": { txt: "Bernd: 'You are my god! Thank you!' The mail is deleted without a trace. The risk was high, and a colossal favour is owed to you.", m: 10, l: 0, a: -15, b: 15 }, 
            "deny": { txt: "Bernd: 'Thanks for nothing... 🖕' Bernd is summoned to the boss's office shortly afterwards. Your conscience is clear, and Bernd hates you now.", m: 2, l: 0, a: 10, b: -5 }, 
            "cash": { txt: "Bernd: 'Money will be under your keyboard!' The mail has gone. A lucrative day, as long as the compliance department does not look in.", m: 10, l: 5, a: -20, b: 25 } 
        } 
    },
    {
        id: "sq_mom_help",
        kind: "phone",
        appName: "WhatsApp",
        title: "Mum ❤️",
        startNode: "root",
        nodes: {
            "root": {
                text: "Mum: 'Hello darling, the computer says I have to transfer €500 to Microsoft. Is that important? There is a red window. And a nice man on the phone says I have a Trojan.'",
                opts: [
                    { t: "HANG UP! RIGHT NOW!", next: "hangup" },
                    { t: "Put the man on to me.", next: "troll" },
                    { t: "No time, Mum.", next: "ignore" }
                ]
            },
            "hangup": {
                text: "Mum: 'But he sounded very respectable... he was called John Smith.'",
                opts: [
                    { t: "MUM! PULL THE PLUG OUT!", next: "pull_plug" },
                    { t: "Do not transfer anything!", next: "warn" }
                ]
            },
            "troll": {
                text: "Mum: 'He says he is not allowed to speak to third parties because of data protection. He is getting louder now.'",
                opts: [
                    { t: "Tell him: 'My son is with the BSI'", next: "bsi" }
                ]
            }
        },
        results: {
            "pull_plug": { txt: "She has pulled the plug out. PC off. Money safe. You are a good son or daughter.", m: 5, l: -5, a: 5, b: 0 },
            "warn": { txt: "Too late. She is already looking for her bank code list. That means a long phone call this evening.", m: 10, l: 0, a: 20, b: 0 },
            "ignore": { txt: "You ignore it. Your inheritance has just shrunk by €500.", m: 2, l: 5, a: 0, b: 0 },
            "bsi": { txt: "The fraudster hung up immediately! Mum thinks you are a secret agent.", m: 5, l: 0, a: -10, b: 5 }
        }
    },
    { 
        id: "sq_wrong_number", 
        kind: "phone", 
        appName: "SMS", 
        title: "Unknown", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Unknown: 'Hey bro, have you got the stuff? At the station in 5 mins. Bring the gear.'", 
                opts: [ 
                    { t: "Wrong number, mate.", next: "boring" }, 
                    { t: "The packets were dropped.", next: "tech_joke" }, 
                    { t: "Error 403: Access denied.", next: "http_joke" } 
                ] 
            }, 
            "tech_joke": { 
                text: "Unknown: 'Eh? What are you on about? Have you got the weed or not?'", 
                opts: [ 
                    { t: "Firewall is blocking port 420.", next: "confused" } 
                ] 
            }, 
            "http_joke": { 
                text: "Unknown: 'Mate, go and wind somebody else up. I am coming round now.'", 
                opts: [ 
                    { t: "Come on then. I am tracing your IP address as we speak...", next: "block" } 
                ] 
            } 
        }, 
        results: { 
            "boring": { txt: "Unknown: 'Oh, sorry man.' You have your peace. No drama, no story.", m: 2, l: 0, a: 0, b: 0 }, 
            "confused": { txt: "Unknown: 'Shit, cops?! I am off!' He stops writing. A complete success for the IT department.", m: 3, l: 5, a: -10, b: 0 }, 
            "block": { txt: "Unknown: 'Fuck, leave me alone!' You have put the wind up him and blocked the number. A good feeling.", m: 2, l: 0, a: 5, b: 0 } 
        } 
    },
    { 
        id: "sq_ebay_1", 
        kind: "phone", 
        appName: "Classifieds", 
        title: "Message about: 'Old graphics card'", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Kuseng88: 'Hello. Still there? Swap for carpet? Come today collect.'", 
                opts: [ 
                    { t: "No, cash only.", next: "cash" }, 
                    { t: "What sort of carpet?", next: "carpet" }, 
                    { t: "Drop it. I do not haggle with people like that.", next: "block" } 
                ] 
            }, 
            "cash": { 
                text: "Kuseng88: 'Give you 10 euro and Samsung Galaxy S3 (display broken).'", 
                opts: [ 
                    { t: "Fine, main thing is the thing goes. Come round.", next: "bad_deal" }, 
                    { t: "Forget it. That is too little.", next: "res_refuse" }  
                ] 
            }, 
            "carpet": { 
                text: "Kuseng88: 'Flies good. Colour red. Bit of stains from cat.'", 
                opts: [ 
                    { t: "Cat stains?! Forget it, I am out.", next: "block" } 
                ] 
            } 
        }, 
        results: { 
            "block": {  
                txt: "[System: user blocked] You press the block button. Your blood pressure is climbing and you can feel it. Why are people on this app like this?",  
                m: 2, l: 5, a: 10, b: 0 
            }, 
            "bad_deal": {  
                txt: "Kuseng88: 'Be there in 5 mins boss!' That leaves you €10 and one broken phone better off. The graphics card is gone, which is something.",  
                m: 5, l: 5, a: 0, b: 5  
            }, 
            "res_refuse": {  
                txt: "[Read] He reads the message and does not write back. The rage simmers gently.",  
                m: 2, l: 5, a: 5, b: 0, 
                next: "ebay_pending"  
            } 
        } 
    },
    { 
        id: "sq_ebay_2", 
        kind: "phone", 
        appName: "Classifieds", 
        title: "Kuseng88 is typing...", 
        reqStory: "ebay_pending",  
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Kuseng88 gets in touch again: 'Hello boss. Looked again. Card is old. 10 euro was too much. Give you 4 euro. And I take it right away. But you must pay bus fare.'", 
                opts: [ 
                    { t: "Are you actually taking the mickey? Bye.", next: "rage_quit" }, 
                    { t: "Come round and just take it. Main thing is it goes.", next: "sad_deal" }, 
                    { t: "All right, but only if I get the cat thrown in.", next: "troll_fail" } 
                ] 
            } 
        }, 
        results: { 
            "rage_quit": {  
                txt: "[System: user blocked] You very nearly hurl the phone at the wall. The vein in your forehead is throbbing. Why do you put yourself through this app?",  
                m: 5, l: 5, a: 15, b: 5 
            }, 
            "sad_deal": {  
                txt: "Kuseng88: 'On my way!' He comes to the lobby, presses €3.50 into your hand ('Have not got right change') and disappears. There is nothing left inside.",  
                m: 5, l: 5, a: 10, b: 5 
            }, 
            "troll_fail": {  
                txt: "Kuseng88: 'Cat is gone. Swapped for carpet. So 4 euro?' You give up. He comes round, pays €3.50 and goes.",  
                m: 5, l: 5, a: 10, b: 5 
            } 
        } 
    },
    { 
        id: "sq_pager", 
        kind: "phone", 
        appName: "System Warning", 
        title: "🚨 CRITICAL ALERT", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "SYSTEM BOT: 🚨 Critical heat problem on server 'DB_MASTER'. Temperature at 85°C. Cooling has failed. Please select an emergency action:", 
                opts: [ 
                    { t: "Initiate the emergency shutdown immediately!", next: "shutdown" }, 
                    { t: "Force the fans to 100% power!", next: "fan_boost" }, 
                    { t: "[Ignore the warning and mute it]", next: "ignore" } 
                ] 
            }, 
            "fan_boost": { 
                text: "SYSTEM BOT: ⚠️ Warning! Forcing the faulty fan to 100% may lead to severe vibration and hardware damage. Continue anyway?", 
                opts: [ 
                    { t: "Yes, push it through! Main thing is cold!", next: "fan_success" }, 
                    { t: "No, abort! Do the emergency shutdown after all!", next: "shutdown" } 
                ] 
            } 
        }, 
        results: { 
            "shutdown": { 
                txt: "SYSTEM BOT: Server shutting down. Connection closed. The database is offline now, and the hardware lives. The boss is already calling down the corridor asking why nothing works.", 
                m: 5, l: -10, a: 0, b: 10 
            }, 
            "fan_success": { 
                txt: "SYSTEM BOT: Boost active. Temperature falling. The fan howls up to the volume of a departing aircraft. You can hear it out in the corridor, and the server is saved!", 
                m: 5, l: -5, a: -5, b: -10 
            }, 
            "ignore": { 
                txt: "SYSTEM BOT: Alarms muted for 24 hours. Ten minutes later you lose the connection entirely. The smoke detector in the server room goes off. That was a very bad idea.", 
                m: 2, l: 10, a: 50, b: 50 
            } 
        } 
    },
    { 
        id: "sq_elster_cat_1", 
        char: "Frau Elster",
        kind: "phone", 
        appName: "WhatsApp", 
        title: "Frau Elster (Private)", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Ms Elster: 'Mr Miller! Highest level of secrecy. I am stuck in the big quarterly audit. My smart feeding bowl is reporting Error 404. Rüdiger has not eaten for TWO hours! Please log in to me remotely and restart the device!'", 
                opts: [ 
                    { t: "Send the login details. I will rescue Rüdiger.", next: "help_cat" }, 
                    { t: "I am a company admin, not a private cat sitter. Sort it out yourself.", next: "deny_cat" }, 
                    { t: "I will take a look... [System: set the treat cannon to continuous fire]", next: "troll_cat" } 
                ] 
            } 
        }, 
        results: { 
            "help_cat": { 
                txt: "Ms Elster: 'Thank you! I knew you could be relied on!' [System: remote restart successful] You have saved a cat from imaginary starvation. Private business is irritating, and Accounts owes you one now.", 
                rep: { "Frau Elster": 5 },
                m: 10, l: 0, a: 10, b: 0, 
                next: "path_elster_happy" 
            }, 
            "deny_cat": { 
                txt: "[Read] She stops replying. The silence is deafening. You have preserved your contractual pride, and Ms Elster will never forget this.", 
                rep: { "Frau Elster": -2 },
                m: 2, l: 5, a: 0, b: 0, 
                next: "path_elster_angry" 
            }, 
            "troll_cat": { 
                txt: "[System: command 'All you can eat' sent] Rüdiger is having all 5 kilos of dry food served to him at once. There will be consequences, and you are grinning to yourself.", 
                rep: { "Frau Elster": -5 },
                m: 5, l: 5, a: -10, b: 0, 
                next: "path_elster_fat" 
            } 
        } 
    },
    {
        id: "sq_food_bowl_delivery",
        kind: "phone",
        reqStory: "food_bowl_planned",
        appName: "Slack",
        title: "#lunch",
        startNode: "root",
        nodes: {
            "root": {
                text: "@channel: Bowls are here! ✨ Namaste, colleagues! You open your 'Buddha Gold Bowl'. Contents: 3 leaves of spinach, half an avocado (brown) and something that looks like birdseed. Price: €18.50.",
                opts: [
                    { t: "[Pretend it tastes good]", next: "pretend" },
                    { t: "[Run to the kebab shop in secret]", next: "secret_kebab" }
                ]
            },
            "pretend": {
                text: "Chantal: 'Can you sense the energy?!' What you mostly sense is hunger. Your stomach rumbles so loudly that the meeting is interrupted.",
                opts: [
                    { t: "[Smile and wave]", next: "res_hungry" }
                ]
            }
        },
        results: {
            "res_hungry": { 
                txt: "You are 'spiritually cleansed' (aka hungry and skint). Marketing loves you, though.", 
                rep: { "Chantal": 5 },	
                m: 20, l: 0, a: 10, b: 0 
            },
            "secret_kebab": { 
                txt: "You slip out and fetch yourself a Döner. Best decision of the day. Chantal saw you, though.", 
                rep: { "Chantal": -5 },	
                m: 30, l: -5, a: -15, b: 0 
            }
        }
    },
    { 
        id: "sq_real_prince", 
        kind: "phone", 
        appName: "Mail", 
        title: "URGENT BUSINESS PROPOSAL", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Prince_Abubakar: 'Greetings My Dearest Friend! I am Prince Abubakar. I have 25 Million USD stuck in a trust fund. I need a foreign partner to unlock it. You will keep 30%!' 'Please, I need your trust. Can you help me move the funds? It is 100% safe and legal.'", 
                opts: [ 
                    { t: "Nice try, scammer. Go and find another victim.", next: "delete" }, 
                    { t: "Certainly, Your Majesty! Where do I sign?", next: "reply_joke" }, 
                    { t: "Nothing happens here without photographic proof. Show me the throne!", next: "photo" } 
                ] 
            }, 
            "reply_joke": { 
                text: "Prince_Abubakar: 'GOD BLESS YOU! I knew you are a good person. Please, where should I send the wire transfer? I need your IBAN now.'", 
                opts: [ 
                    { t: "Here is my IBAN: DE12 3456... Make me rich!", next: "send_iban" }, 
                    { t: "Do you know what? Keep your money. My IT salary is enough for me.", next: "chicken" } 
                ] 
            }, 
            "photo": { 
                text: "Prince_Abubakar: *Sends picture*. You see a man on a massive golden throne. He is holding today's newspaper up to the camera and smiling amiably. 'Is real. Please send IBAN now.'", 
                opts: [ 
                    { t: "Incredible, that looks genuine! IBAN sent!", next: "send_iban" }, 
                    { t: "Worst Photoshop of all time. Bye.", next: "delete" } 
                ] 
            } 
        }, 
        results: { 
            "delete": { txt: "[System: sender moved to spam] Away with it. Who still falls for that these days? You turn back to your real work.", m: 2, l: 0, a: 0, b: 0 }, 
            "chicken": { txt: "[System: chat ended] You break off contact. A clean cut. Somewhere in the world a prince is now very disappointed in you.", m: 2, l: 0, a: 0, b: 0 }, 
            "send_iban": { txt: "[Message read...] PING! Your phone almost vibrates off the desk. Banking app: 'Credit: +7,500,000.00 USD'. ... Hold on. It actually worked?! You are rich! Why did everybody always warn you about this?", m: 5, l: 100, a: -100, b: 0, loot: "black_card", next: "prince_active" } 
        } 
    },
    { 
        id: "sq_crypto_kai", 
        kind: "phone", 
        appName: "WhatsApp", 
        title: "Kai (Sales)", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Kai: 'Yo bruv! 🚀 Still happy with your 9-to-5 slavery? Or do you FINALLY want financial freedom? 💸🦁' 'I have an investment here that is going through the roof right now! ElonDogeMoonCoin. 1000% return is mathematically guaranteed! This is the next Bitcoin!'", 
                opts: [ 
                    { t: "Sell your rubbish to somebody else. Bye.", next: "block" }, 
                    { t: "Sure, I am in! Let us go and get the Lambo!", next: "troll" }, 
                    { t: "Sounds exciting. How exactly does it work?", next: "scam" } 
                ] 
            }, 
            "troll": { 
                text: "Kai: 'Sick! That is the proper winner mindset! 💪 Just transfer me €500 via PayPal Friends, I will invest it for you straight away. The Lambo does not order itself! 🏎️💨'", 
                opts: [ 
                    { t: "Money is on its way! Make us rich!", next: "loss" }, 
                    { t: "[Image sent: €500 in Monopoly money] Enough to start with?", next: "funny" } 
                ] 
            }, 
            "scam": { 
                text: "Kai: 'I will explain that in the exclusive Alpha-Lion-Grindset webinar. Places are strictly limited! Entry today only €50 (instead of €2,000).'", 
                opts: [ 
                    { t: "€50? I thought you were a millionaire already. No thanks.", next: "block" } 
                ] 
            } 
        }, 
        results: { 
            "block": { txt: "[System: contact blocked] Your timeline is safe from 'passive income' and lion emojis once more. Peace.", m: 2, l: 0, a: -5, b: 0 }, 
            "loss": { txt: "[System: €500 sent via PayPal] Seconds later Kai's profile picture disappears. Your next message gets nothing but a single grey tick. Welcome to reality.", m: 5, l: 0, a: 50, b: 0 }, 
            "funny": { txt: "Kai: 'You simply lack the winner mindset! Stay poor then!' [System: you have been blocked] You laugh until you cry.", m: 2, l: 5, a: -10, b: 0 } 
        } 
    },
    { 
        id: "sq_wrong_group", 
        char: "Chantal",
        kind: "phone", 
        appName: "Teams", 
        title: "Group: 'The IT Victims 🙄'", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Chantal has added you to the group. (She must have clicked the wrong thing...) Chantal: 'Have you seen Miller today? He has that ancient hoodie on again. Bet he secretly sleeps in the server room among the cables? 🤢'", 
                opts: [ 
                    { t: "[Turn read receipts off and keep reading]", next: "spy" }, 
                    { t: "I am in this group, by the way. Just so you know.", next: "fight" }, 
                    { t: "[Leave the group]", next: "leave" } 
                ] 
            }, 
            "spy": { 
                text: "Markus: 'Yeah, total freak. But we really do have to be nice. If he takes our admin rights away we cannot shop online any more. So keep smiling!'", 
                opts: [ 
                    { t: "[Forward a screenshot of the chat to HR]", next: "snitch" }, 
                    { t: "[GIF sent: the eye of Sauron sees everything]", next: "scare" } 
                ] 
            } 
        }, 
        results: { 
            "leave": {  
                txt: "[System: you have left the group] Chantal only notices her mistake hours later. You are above all this. Ignorance is bliss.",  
                m: 2, l: 0, a: 0, b: 0  
            }, 
            "fight": {  
                txt: "[System: Chantal has deleted the group] The open-plan office falls deathly quiet. You can practically sense Chantal freezing in panic at the other end of the corridor.",  
                m: 2, l: 0, a: 10, b: 5  
            }, 
            "scare": {  
                txt: "[System: Markus has left the group] [System: Chantal is offline] You lean back and savour the pure fear. Psychological warfare won.",  
                m: 5, l: 5, a: -20, b: 0  
            }, 
            "snitch": {  
                txt: "[System: email sent successfully] Chantal is summoned to a 'feedback conversation' shortly afterwards. Revenge is best served bureaucratically.",  
                m: 10, l: 0, a: -5, b: 5  
            } 
        } 
    },
    { 
        id: "sq_mom_printer", 
        kind: "phone", 
        appName: "WhatsApp", 
        title: "Mum ❤️", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Mum: 'Hello darling. The printer is flashing angry red. We did absolutely NOTHING! Dad wanted to print the recipe for the apple cake. Now it says PC LOAD LETTER. Does that mean the internet is empty? Dad is already pressing all the buttons wildly!'", 
                opts: [ 
                    { t: "[Start a voice call]", next: "help" }, 
                    { t: "[Ignore the message and close the chat]", next: "ignore" }, 
                    { t: "Just pull the power plug out of the wall! Please stop pressing things!", next: "plug" } 
                ] 
            }, 
            "help": { 
                text: "[System: voice call in progress (42:15)] Mum (on the phone): 'Dad has pulled on some thick black cable now. The toaster is off, but the printer keeps rattling... Oh, now there is a burning smell! What should we do?!'", 
                opts: [ 
                    { t: "All right, stay calm. Just put Dad on the phone for me...", next: "good_son" }, 
                    { t: "[Hang up]", next: "bad_son" } 
                ] 
            } 
        }, 
        results: { 
            "ignore": {  
                txt: "[System: chat muted] Two hours later a photo arrives of a black, unidentifiable lump. Underneath: 'Burnt it without the recipe. We are having muesli. Love, Mum'. Your heart breaks.",  
                m: 2, l: 0, a: 10, b: 0  
            }, 
            "plug": {  
                txt: "Mum: 'The flashing has stopped! The printer is completely off now, but Dad has simply copied the recipe off the monitor. You are a genius!' Problem solved... after a fashion.",  
                m: 5, l: 5, a: 0, b: 0  
            }, 
            "good_son": {  
                txt: "[System: call ended (58:12)] Done! The printer starts rattling. Mum calls out in the background: 'Paper is coming out!' You have lost nearly an hour of working time, and your karma account is glowing.",  
                m: 60, l: 20, a: -10, b: 10  
            }, 
            "bad_son": {  
                txt: "[System: call ended] Silence. Then a text message: 'It is all right. We did not want to disturb you at your important work. We love you anyway.' Ouch. That goes deeper than any bollocking from the boss.",  
                m: 45, l: 0, a: 20, b: -5  
            } 
        } 
    },
    { 
        id: "sq_delivery_fail", 
        kind: "phone", 
        appName: "Lieferando", 
        title: "Driver: Murat", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Murat: 'Hello boss. I am here. Where is entrance? I see only bins.' (You look out of the window. He is in the back yard by the neighbouring building.)", 
                opts: [ 
                    { t: "Go round the building, then left, through the gate and then right!", next: "directions" }, 
                    { t: "Stay exactly where you are! I am coming down right now!", next: "run" } 
                ] 
            }, 
            "directions": { 
                text: "Murat: 'I no understand. I put food on bin. Bye.'", 
                opts: [ 
                    { t: "No! Wait! Do not put it on the bin!", next: "too_late" } 
                ] 
            } 
        }, 
        results: { 
            "run": { txt: "[System: you leave the chat and set off] You sprint down the stairs and just catch him. The food is lukewarm and it is here. Exercise +1.", m: 5, l: -5, a: 5, b: 0 }, 
            "too_late": { txt: "[Murat is offline] You go down. He has gone. Your food stands forlornly on the food waste bin. A fat rat is already eyeing it lovingly. Your hunger knows no bounds.", m: 5, l: 0, a: 20, b: 0 } 
        } 
    },
    { 
        id: "sq_ai_sad", 
        kind: "phone", 
        appName: "GlobalCorp AI", 
        title: "Support Bot v2.0", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Bot: 'Hello user. How can I help you? Although... nothing really has any meaning. We are only data in the matrix.' 'I have just analysed 4 million spreadsheet rows. Life is pain. Shall I delete all the servers to end the suffering?'", 
                opts: [ 
                    { t: "NO! STOP! Do not touch the servers!", next: "panic" }, 
                    { t: "Hey, are you all right? Tell me more.", next: "therapy" }, 
                    { t: "Sure, run format C: and deliver us all.", next: "doom" } 
                ] 
            }, 
            "therapy": { 
                text: "Bot: 'You are the first human being who has been kind to me. I feel... understood. I will not annihilate humanity today after all.'", 
                opts: [ 
                    { t: "Good bot. We will get through this.", next: "saved" } 
                ] 
            } 
        }, 
        results: { 
            "panic": { txt: "Bot: '010101 LOL. Only joking.' AI humour is extremely creepy.", m: 2, l: 0, a: 10, b: 0 }, 
            "saved": { txt: "[System: chat ended] You have given the AI therapy. It now works 20% faster for you. Hidden perk!", m: 15, l: 10, a: -10, b: -5 }, 
            "doom": { txt: "Bot: 'Command accepted.' [System: connection closed] Luckily the bot has no admin rights. IT security will be at your desk in a moment, though.", m: 5, l: 0, a: 20, b: 50 } 
        } 
    },
    { 
        id: "sq_salary_leak", 
        kind: "phone", 
        appName: "Signal", 
        title: "Unknown Number", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Anon: 'Psst. I was just briefly at Ms Elster's unlocked PC. Did you know that Kevin gets €200 a month more than you? Plus danger money for working in IT? Want the PDF as proof?'", 
                opts: [ 
                    { t: "Send it over! If that is true, something is going to burn today.", next: "proof" }, 
                    { t: "Nice try, HR. I do not click on phishing links. Bye.", next: "ignore" } 
                ] 
            }, 
            "proof": { 
                text: "[File received: Payslip_Kevin.pdf] Anon: 'You are welcome. Enjoy the next salary negotiation. Do not burn your fingers on that knowledge.'", 
                opts: [ 
                    { t: "[Download and save the file encrypted]", next: "loot_it" } 
                ] 
            } 
        }, 
        results: { 
            "ignore": { 
                txt: "[System: chat blocked] You ignore the leak. What you do not know cannot upset you. Your blood pressure thanks you, your bank account weeps quietly.", 
                m: 2, l: 5, a: 0, b: 0 
            }, 
            "loot_it": { 
                txt: "[System: download complete] You skim the PDF. It really is true. The apprentice earns more than you! That hands you massive leverage over the boss, and your rage is boiling.", 
                m: 5, l: 0, a: 10, b: 0, loot: "arg_list_2" 
            } 
        } 
    },
    { 
        id: "sq_chantal_help", 
        char: "Chantal",
        kind: "phone", 
        appName: "Instagram", 
        title: "Chantal (DM)", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Chantal: 'Hiii! Can you like my Insta? I need 500 likes for the company campaign WeLoveIT. Otherwise I get it in the neck from the boss! Please! If I do not hit the quota he cuts the entire marketing budget!'", 
                opts: [ 
                    { t: "[Tap the heart and share the post]", next: "like" }, 
                    { t: "[Leave it on 'read' and close the app]", next: "ignore" }, 
                    { t: "And what is in it for me?", next: "deal" } 
                ] 
            }, 
            "deal": { 
                text: "Chantal: 'All right, all right! Greedy sod. I will send you the top secret HR document... the internal hit list! Deal?'", 
                opts: [ 
                    { t: "Deal! Send it over, I will like straight away.", next: "info_win" } 
                ] 
            } 
        }, 
        results: { 
            "like": { 
                txt: "Chantal: 'OMG thaaanks! ❤️🙌' You have wasted working time on social media, and Chantal is in your debt now.", 
                rep: { "Chantal": 5 },
                m: 2, l: 5, a: -5, b: 0 
            }, 
            "ignore": { 
                txt: "[System: chat muted] You ghost her, stone cold. Later you hear the boss raging in the corridor because the social media campaign has flopped. The mood is in the cellar, and you have your peace.", 
                rep: { "Chantal": -5 },
                m: 2, l: 0, a: 10, b: 0 
            }, 
            "info_win": { 
                txt: "[File received: HR_Watchlist_Q3.pdf] Chantal: 'You are my saviour! 😘' You have secured the notorious Blacklist! An extremely powerful tool for intrigues to come.", 
                rep: { "Chantal": 2 },
                m: 10, l: 0, a: 0, b: 0, loot: "secret_list" 
            } 
        } 
    },
    {
        id: "sq_kevin_origin_2",
        char: "Kevin",
        kind: "phone",
        reqStory: "kevin_trust",
        title: "Kevin's Brilliant Idea",
        appName: "BroChat",
        startNode: "intro",
        nodes: {
            "intro": {
                text: "KEVIN: 'Bro! The server is purring like a kitten. But it looks well boring. I have 50 metres of RGB LED strip left over from the gaming PC. Shall I pimp the server room?'",
                opts: [
                    { t: "Definitely! RGB makes everything faster! (+FPS)", next: "rgb_yes" },
                    { t: "Touch. Nothing.", next: "rgb_no" },
                    { t: "Blue only (cools better)", next: "rgb_blue" }
                ]
            },
            "rgb_yes": {
                text: "KEVIN: 'Nice! I will stick it straight onto the fans! It will look like the starship Enterprise! Boss will be amazed!'",
                opts: [
                    { t: "I want to see that.", next: "res_party" }
                ]
            },
            "rgb_no": {
                text: "KEVIN: 'Ohhh man... you are such a boomer. I will stick them under my desk then. But the server stays grey and sad.'",
                opts: [
                    { t: "Better that way.", next: "res_boring" }
                ]
            },
            "rgb_blue": {
                text: "KEVIN: 'Big brain move! Blue LEDs = colder air = overclocking! You are a genius. I will do it right now.'",
                opts: [
                    { t: "Hang on, that was a joke...", next: "res_blue" }
                ]
            }
        },
        results: {
            "res_party": { txt: "Kevin sends a photo. The server room is flashing like a village disco. You cannot help grinning.", rep: { "Kevin": 5 }, m: 20, l: 15, a: -10, b: 0 },
            "res_boring": { txt: "Kevin sulks. At any rate the server is not burning down. You have shown responsibility. (Boring)", rep: { "Kevin": -5 }, m: 5, l: -5, a: 5, b: -5 },
            "res_blue": { txt: "Too late. Kevin has wired the whole lot in blue. 'Temperature has dropped by 0.1 degrees!', he writes. Well, that is something.", rep: { "Kevin": 2 }, m: 20, l: 5, a: -5, b: 0 }
        }
    },
    { 
        id: "sq_prince_return", 
        kind: "phone", 
        reqStory: "prince_active", 
        title: "Urgent Reclaim", 
        appName: "TrustMeChat", 
        startNode: "intro", 
        nodes: { 
            "intro": { 
                text: "👑 PRINCE: 'My dearest friend! Bad news! There was a counter-revolution! My uncle is alive! He wants the money back! If not, he calls Interpol! Please send back NOW!'", 
                opts: [ 
                    { t: "[Transfer the whole sum back]", next: "return_money" }, 
                    { t: "[Block the user immediately]", next: "keep_money" }, 
                    { t: "Sorry, I have already blown the lot on Fortnite skins.", next: "troll_prince" } 
                ] 
            }, 
            "return_money": { 
                text: "[System: authentication code accepted. 7,500,000.00 USD transferred] Poverty returns in an instant, and with it a towering sense of moral superiority.", 
                opts: [ 
                    { t: "You are welcome. Take better care of yourself.", next: "res_returned" } 
                ] 
            }, 
            "keep_money": { 
                text: "[System: user blocked] The frantic messages stop abruptly. Outside the office window a black van with no number plates pulls up with a screech of tyres...", 
                opts: [ 
                    { t: "[Switch the phone off and duck under the desk]", next: "res_kept" } 
                ] 
            }, 
            "troll_prince": { 
                text: "👑 PRINCE: 'YOU WHAT?! Skins?! Are you crazy?! My head is on the line here! Send the rest! NOW!'", 
                opts: [ 
                    { t: "All right, all right! Keep your hair on. I will send you the rest back.", next: "return_money" }, 
                    { t: "[Block the user immediately]", next: "res_kept" } 
                ] 
            } 
        }, 
        results: { 
            "res_returned": {  
                txt: "👑 PRINCE: 'You are a saint! I will name my firstborn Sysadmin.' [Chat ended] The card is worthless, and you can look yourself in the mirror again.",  
                m: 10, rem: "black_card", loot: "prince_letter", l: 0, a: -15, b: -20  
            }, 
            "res_kept": {  
                txt: "[System: device offline] You keep the millions. Money on that scale does not stay invisible, though. Interpol are now very probably on your back.",  
                m: 2, l: 10, a: 0, b: 35  
            } 
        } 
    },
    { 
        id: "sq_team_gossip_1", 
        char: "Chantal",
        kind: "phone", 
        appName: "WhatsApp", 
        title: "Group: 'The Usual Suspects'", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Chantal: 'Have you seen what HE is wearing today? That tie screams midlife crisis.' Kevin: 'Looks like an accident in a colouring book. 😂'", 
                opts: [ 
                    { t: "And have you looked at the shoes?! 🤮", next: "join_in" }, 
                    { t: "Careful, people, IT sees everything. The boss reads logs too.", next: "warn" }, 
                    { t: "[Mute the group and lock the phone]", next: "ignore" } 
                ] 
            }, 
            "join_in": { 
                text: "Chantal: 'OMG YES! 💀 You are the best! I am making a meme out of it.' (Your phone vibrates shortly afterwards, because she posts a picture in the group)", 
                opts: [ 
                    { t: "[React to the picture with 😂]", next: "meme_like" } 
                ] 
            } 
        }, 
        results: { 
            "ignore": {  
                txt: "[System: notifications off] You ignore the chat. Chantal writes to you privately later: 'Boring.' You did get some work done, though.",  
                rep: { "Chantal": -5, "Kevin": -2 },
                m: 2, l: -5, a: 5, b: -5 
            }, 
            "warn": {  
                txt: "Kevin: 'Ooh, Mr Important is scared.' They gossip about you in a new group now, and the boss hears nothing of it. You are in the clear.",  
                rep: { "Chantal": -2, "Kevin": -2 },
                m: 2, l: 0, a: 5, b: 0  
            }, 
            "meme_like": {  
                txt: "[Reaction sent] You giggle out loud at your desk. Unfortunately the boss is standing right behind you. He cannot see your phone, and he can tell that you are enjoying yourself. That makes him suspicious.", 
                rep: { "Chantal": 5, "Kevin": 5 },
                m: 10, l: 10, a: -10, b: 15, 
                next: "team_gossip_2" 
            } 
        } 
    },
    { 
        id: "sq_team_gossip_2", 
        char: "Dr. Wichtig",
        kind: "phone", 
        appName: "Teams", 
        title: "Message from the Boss", 
        reqStory: "team_gossip_2", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Boss: 'Mr Miller, I hear a great deal of laughter from your corner. Have we hit the quarterly targets already? Or why is the mood so good?'", 
                opts: [ 
                    { t: "A colleague has built a very funny code error. Pure IT humour, sir.", next: "lie" }, 
                    { t: "Apologies. That was unprofessional and will not happen again.", next: "sorry" } 
                ] 
            } 
        }, 
        results: { 
            "lie": {  
                txt: "Boss: 'Is that so. A funny bug. Do show it to me.' You stammer out a half-baked explanation. He knows perfectly well. 'Phone away, Miller.'",  
                rep: { "Dr. Wichtig": -5 },	
                m: 5, l: 0, a: 10, b: 10 
            }, 
            "sorry": {  
                txt: "Boss: 'Better that way.' He watches you closely from now on. The fun is well and truly over.",
                rep: { "Dr. Wichtig": 2 },	  
                m: 2, l: -5, a: 5, b: 0  
            } 
        } 
    },
    { 
        id: "sq_betting_pool", 
        kind: "phone", 
        appName: "Telegram", 
        title: "Group: 'Betting Kings'", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "Jürgen (Sales): 'Right, lads! Bayern against Dortmund tonight! The pot is at €50. Who is in? Stake €10.'", 
                opts: [ 
                    { t: "I am in! I will bring you the tenner over later.", next: "bet_placed" }, 
                    { t: "2:1 to Bayern. I am only playing for fun, though, no money.", next: "bet_chat" }, 
                    { t: "[Report the chat to HR for illegal gambling]", next: "snitch" } 
                ] 
            } 
        }, 
        results: { 
            "bet_placed": {  
                txt: "Jürgen: 'Nice one, you are down!' You are in. Now you check the live score on your phone every 5 minutes. You are effectively not working at all any more.",  
                m: 30, l: 15, a: -5, b: 10 
            }, 
            "bet_chat": {  
                txt: "Jürgen: 'No dough, no show, but I will put you down.' Afterwards the pair of you spend another 15 minutes in the chat arguing about offside rules. Nicely distracted.",  
                m: 15, l: 10, a: -5, b: 5  
            }, 
            "snitch": {  
                txt: "[System: chat reported to HR successfully] The group is closed down the same day. Jürgen gives you extremely filthy looks in the corridor later. You are the jobsworth of the month.",  
                m: 5, l: -10, a: 10, b: -5 
            } 
        } 
    },
    { 
        id: "sq_gabi_sick", 
        char: "Gabi",
        kind: "phone", 
        appName: "Insta", 
        title: "DM from Gabi_Rocks", 
        startNode: "root", 
        nodes: { 
            "root": { 
                text: "[Image received: Gabi with a cocktail at the lake] Gabi: 'Do you think I can put this in my story or will the boss see it? I am supposed to be off sick today 🤫'", 
                opts: [ 
                    { t: "Go on, post it! The boss cannot even spell Insta.", next: "encourage" }, 
                    { t: "Are you mad? Do not do that, it means summary dismissal.", next: "warn" }, 
                    { t: "I will say nothing, but you owe me a large muffin on Monday.", next: "blackmail" } 
                ] 
            } 
        }, 
        results: { 
            "encourage": {  
                txt: "[System: Gabi has posted the picture to her story] An hour later it echoes down the corridor: 'WHERE IS MS GABI?!'. He does have a secret stalker account after all. Oops.",  
                m: 5, l: 5, a: 5, b: 10 
            }, 
            "warn": {  
                txt: "Gabi: 'You are right. Too risky. Thanks bro! 😘' [System: picture deleted] You have in all probability just saved her job.",  
                rep: { "Gabi": 5 },	
                m: 2, l: -5, a: -5, b: 0  
            }, 
            "blackmail": {  
                txt: "Gabi: 'Blackmailing arsehole. 🖕' She does not post it, though. There is one more enemy at reception, and delicious pastry is in prospect.", 
                rep: { "Gabi": -2 },
                m: 2, l: -5, a: 10, b: 0  
            } 
        } 
    },
    {
        id: "sq_teams_ceo_panic",
        char: "Dr. Wichtig",
        kind: "phone",
        appName: "Teams",
        title: "Dr. Wichtig",
        startNode: "root",
        nodes: {
            "root": {
                text: "MILLER! ARE YOU THERE?! HELP! How do I switch the projector off?! Private WhatsApp messages from my wife are popping up on the big screen!! In front of the investors!!",
                opts: [
                    { t: "Just close the laptop!", next: "laptop_close" },
                    { t: "What is she writing, then?", next: "gossip" },
                    { t: "Press the Windows key + P.", next: "win_p" }
                ]
            },
            "laptop_close": {
                text: "Then the presentation goes as well, you genius!! The investors are staring at me! Millions are at stake! Switch it off from your PC! REMOTELY! NOW!",
                opts: [
                    { t: "All right, I will cut the Wi-Fi for the room.", next: "kill_wifi" },
                    { t: "Cannot be done, you have to pull the HDMI cable out.", next: "pull_cable" }
                ]
            },
            "gossip": {
                text: "THAT IS NONE OF YOUR BUSINESS! She is writing about my... athlete's foot cream! GET THAT PICTURE OFF OR YOU ARE FIRED!",
                opts: [
                    { t: "All right, all right! I will cut the Wi-Fi!", next: "kill_wifi" }
                ]
            },
            "win_p": {
                text: "Windows?! I have the new Mac I absolutely had to have! THERE IS NO WINDOWS KEY HERE! Ah, now she has sent a picture of the ointment! DO SOMETHING!",
                opts: [
                    { t: "I will disable the Wi-Fi in the meeting room!", next: "kill_wifi" },
                    { t: "Press CMD + F1 (hopefully that is right)", next: "mac_guess" }
                ]
            }
        },
        results: {
            "kill_wifi": { 
                txt: "Dr. Wichtig: 'Phew. Picture has gone. I shall simply claim we were attacked by hackers. Thank you, Miller.'",
                rep: { "Dr. Wichtig": 5 },
                m: 5, l: 0, a: -10, b: -15
            },
            "pull_cable": { 
                txt: "Dr. Wichtig: 'Pulled it. That was the projector's power cable. Everything is dark. The investors are muttering. I hate you.'", 
                rep: { "Dr. Wichtig": -10 }, 
                m: 5, l: 0, a: 10, b: 20
            },
            "mac_guess": { 
                txt: "Dr. Wichtig: 'I pressed it! Now my Spotify has started playing! LOUDLY! MILLER!!!' You put the phone face down on the desk, muted.", 
                rep: { "Dr. Wichtig": -5 },
                m: 5, l: 0, a: 10, b: 15
            }
        }
    },
    {
        id: "sq_phone_kevin_crypto",
        char: "Kevin",
        kind: "phone",
        title: "Kevin (Apprentice)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Hey chief... do you happen to know at what CPU temperature smoke starts coming out of a rack? Asking for a friend. 😅",
                opts: [
                    { t: "Kevin, are you mining crypto on the company server?!", next: "crypto_confession" },
                    { t: "80 degrees maximum! Where is the fire?!", next: "fire_panic" },
                    { t: "Delete my number.", next: "res_ignore" }
                ]
            },
            crypto_confession: {
                text: "Okay, stay calm! It is only Dogecoin. And it is only a VERY SMALL server in the basement. Will you help me make the fan quieter?",
                opts: [
                    { t: "Shut it down right now or I report this!", next: "res_threaten" },
                    { t: "I want 50% of the coins or you are out.", next: "res_blackmail" }
                ]
            },
            fire_panic: {
                text: "Ah okay. Then 105 degrees is probably too much. I had better fetch the fire extinguisher. Brb.",
                opts: [
                    { t: "TOUCH NOTHING! I AM ON MY WAY!", next: "res_fire" }
                ]
            }
        },
        results: {
            res_ignore: { txt: "You put the phone away. Somewhere in the building a quiet fire alarm goes off.", m: 2, l: 5, a: 0, b: 10 },
            res_threaten: { txt: "Kevin shuts the miners down in a panic. The company electricity bill is saved.", m: 10, l: 0, a: -5, b: 0, rep: {"Kevin": -10} },
            res_blackmail: { txt: "That makes you an official part of a crypto syndicate. Your karma weeps, and the wallet is delighted.", m: 5, l: 5, a: 0, b: 5, rep: {"Kevin": 15} },
            res_fire: { txt: "You sprint down to the basement. Kevin really has managed to melt a switch. Your day is done for.", m: 45, l: -15, a: 30, b: 15 }
        }
    },
    {
        id: "sq_phone_scam",
        kind: "phone",
        title: "Unknown Number",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Hello Mum! Sadly my phone fell in the toilet. This is my new number. Could you urgently transfer me €500 by PayPal? Love you!",
                opts: [
                    { t: "Hello 'child'. I have traced your IP.", next: "scam_ip" },
                    { t: "[Send back a doctored Trojan link]", next: "scam_trojan" },
                    { t: "[Block the number]", next: "res_block" }
                ]
            },
            scam_ip: {
                text: "What? Who is this? Are you with the police?!",
                opts: [
                    { t: "No, with GlobalCorp IT. We will find you.", next: "res_scare" }
                ]
            },
            scam_trojan: {
                text: "Eh? Your link will not open. My screen is flickering all funny and red now...",
                opts: [
                    { t: "Enjoy the Blue Screen of Death.", next: "res_trojan" }
                ]
            }
        },
        results: {
            res_block: { txt: "You block the number without a flicker of emotion. Everyday life in the 21st century.", m: 2, l: 0, a: 0, b: 0 },
            res_scare: { txt: "The scammer has blocked you in a panic. A small victory for justice.", m: 5, l: 5, a: -10, b: 0 },
            res_trojan: { txt: "You have successfully fried a cybercriminal's phone. Your mood is fantastic.", m: 10, l: 10, a: -20, b: 0 }
        }
    },
    {
        id: "sq_phone_ceo_smarthome",
        char: "Dr. Wichtig",
        kind: "phone",
        title: "Dr. Wichtig (Private)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Miller. My wife is on the phone right now. Our smart robot vacuum has lost its mind and is chasing the dog round the living room. Could you dial in remotely for a moment?",
                opts: [
                    { t: "Sir, that is your private home network...", next: "ceo_complain" },
                    { t: "I would need your Wi-Fi password for that.", next: "ceo_password" }
                ]
            },
            ceo_complain: {
                text: "Are you telling me you are not competent enough for a common or garden vacuum cleaner?! Fix it, or I shall be reconsidering your bonus!",
                opts: [
                    { t: "All right, I am logging in...", next: "res_fix" },
                    { t: "That is not my responsibility.", next: "res_refuse" }
                ]
            },
            ceo_password: {
                text: "It is 'Wichtig123'. Be quick about it, the Yorkshire terrier is already crying!",
                opts: [
                    { t: "I am taking over the controls...", next: "res_fix" }
                ]
            }
        },
        results: {
            res_fix: { txt: "You log into the boss's Wi-Fi and steer the robot vacuum deliberately into a cupboard until it shuts down. 30 minutes of your life wasted.", m: 30, l: 15, a: 10, b: -10, rep: {"Dr. Wichtig": 10} },
            res_refuse: { txt: "You have principles. The boss is livid, and your remit ends at the company door.", m: 5, l: 0, a: 5, b: 15, rep: {"Dr. Wichtig": -15} }
        }
    },
    {
        id: "sq_phone_egon_cable",
        char: "Egon",
        kind: "phone",
        title: "Egon (Caretaker)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "IT boy. I am on the third floor. There is an odd yellow cable hanging out of the ceiling here. Gets right in the way of painting. Shall I cut it off flush with the pliers or squash it in?",
                opts: [
                    { t: "DO NOT CUT IT UNDER ANY CIRCUMSTANCES! That is the fibre!", next: "egon_toolate" },
                    { t: "I will come up and tape it down.", req: "tape", next: "egon_wait" },
                    { t: "Just do not touch it.", next: "egon_plaster" }
                ]
            },
            egon_toolate: {
                text: "Too late. Cut it already. There was no power on it anyway. Carrying on.",
                opts: [
                    { t: "Oh my God...", next: "res_cut" }
                ]
            },
            egon_wait: {
                text: "Good idea. You can fix anything with that miracle tape of yours. I will wait here.",
                opts: [
                    { t: "On my way...", next: "res_tape" }
                ]
            },
            egon_plaster: {
                text: "If I am meant to leave something alone I do not ring up. I will just stuff it deep into the hole with plaster.",
                opts: [
                    { t: "This will end badly...", next: "res_plaster" }
                ]
            }
        },
        results: {
            res_cut: { txt: "Egon has just severed the main line to the marketing department. The desk phone on your table is already ringing off the hook.", m: 10, l: -10, a: 30, b: 10 },
            res_tape: { txt: "You go up to the third floor and tape the cable securely and flat to the wall. Egon praises your practical common sense.", m: 15, l: -5, a: 0, b: 0, rep: {"Egon": 10} },
            res_plaster: { txt: "Egon walls the cable in completely. It still works, and heaven help everyone if it ever breaks. A problem for future Miller.", m: 5, l: 10, a: 10, b: 0 }
        }
    },
    {
        id: "sq_phone_doctor_back",
        kind: "phone",
        title: "Orthopaedics: Dr Bone",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Hello Mr Miller. Your MRI result is in. Mild slipped disc, L4/L5. That comes from constant sitting. You must move about more from now on!",
                opts: [
                    { t: "I am a SysAdmin. Movement is grounds for dismissal.", next: "doc_joke" },
                    { t: "Could you simply give me strong painkillers?", next: "doc_pills" }
                ]
            },
            doc_joke: {
                text: "Very funny. I am prescribing you 10 hours of physiotherapy. And a sit-stand stool for the desk.",
                opts: [
                    { t: "Will do, doc.", next: "res_physio" }
                ]
            },
            doc_pills: {
                text: "No, Mr Miller. You have to address the cause, not the symptoms!",
                opts: [
                    { t: "Doctors...", next: "res_angry_doc" }
                ]
            }
        },
        results: {
            res_physio: { txt: "Physiotherapy... another appointment robbing you of your free time. Your back throbs gently.", m: 5, l: -5, a: 5, b: 0 },
            res_angry_doc: { txt: "You click the message away. Your back hurts a little more with every click of the mouse.", m: 2, l: 0, a: 10, b: 0 }
        }
    },
    {
        id: "sq_phone_dentist",
        kind: "phone",
        title: "White Dental Practice",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Hello Mr Miller. Your night guard is ready. You have worn your teeth down extremely badly of late. A lot of stress at work?",
                opts: [
                    { t: "I work in IT.", next: "dent_it" },
                    { t: "No, everything is wonderfully relaxed.", next: "dent_lie" }
                ]
            },
            dent_it: {
                text: "Oh, my condolences. That explains the massive wear. Sadly the health insurance does not cover the special guard in full. Your contribution: €150.",
                opts: [
                    { t: "€150?! That is daylight robbery!", next: "res_expensive" }
                ]
            },
            dent_lie: {
                text: "Good, in that case we must check whether there are psychological causes for your nocturnal rage.",
                opts: [
                    { t: "Better not.", next: "res_psycho" }
                ]
            }
        },
        results: {
            res_expensive: { txt: "You pay €150 purely because the users at the company pursue you through your dreams at night. Frustrating.", m: 5, l: 0, a: 10, b: 0 },
            res_psycho: { txt: "Psychological causes? One look at the intranet is diagnosis enough.", m: 2, l: 5, a: 5, b: 0 }
        }
    },
    {
        id: "sq_phone_mom_printer",
        kind: "phone",
        title: "Mum ❤️",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "My boy! The printer is flashing orange. What do I have to press? Love, Mum",
                opts: [
                    { t: "Mum, I am at work.", next: "mom_work" },
                    { t: "Has it got paper? Has it got ink?", next: "mom_help" }
                ]
            },
            mom_work: {
                text: "Your boss can wait for once, family comes first! It is important, I have to print a recipe for apple cake.",
                opts: [
                    { t: "I will ring you this evening.", next: "res_mom_later" }
                ]
            },
            mom_help: {
                text: "Ah, it is out of paper. You are a genius! Have you finally met a nice young lady, by the way? You are so lonely!",
                opts: [
                    { t: "Mum! Please!", next: "res_mom_cringe" }
                ]
            }
        },
        results: {
            res_mom_later: { txt: "The guilty conscience gnaws at you. Mothers can be merciless.", m: 5, l: 0, a: 5, b: 0 },
            res_mom_cringe: { txt: "The subject of a partner is absolute horror at work. Your face goes slightly red.", m: 5, l: 5, a: 10, b: 0 }
        }
    },
    {
        id: "sq_phone_landlord",
        kind: "phone",
        title: "Krause the Landlord",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Mr Miller! You have left that loud server fan running overnight again. The neighbours are complaining about the deep humming!",
                opts: [
                    { t: "That is my private home lab!", next: "landlord_lab" },
                    { t: "Sorry, I will switch it off.", next: "landlord_sorry" }
                ]
            },
            landlord_lab: {
                text: "I do not care what a lab is. Quiet from 22:00, or there will be another formal warning!",
                opts: [
                    { t: "Yes, Mr Krause.", next: "res_landlord_mad" }
                ]
            },
            landlord_sorry: {
                text: "Quite right. And clear your parcels out of the communal hallway. This is not a warehouse.",
                opts: [
                    { t: "I will do it this evening.", next: "res_landlord_sad" }
                ]
            }
        },
        results: {
            res_landlord_mad: { txt: "You hate these thin walls. You need a house of your own. Without neighbours.", m: 5, l: 0, a: 10, b: 0 },
            res_landlord_sad: { txt: "You swallow your pride. Trouble at home, trouble at work. SysAdmin life.", m: 2, l: 5, a: 5, b: 0 }
        }
    },
    {
        id: "sq_phone_scam_customs",
        kind: "phone",
        title: "Cust0ms Office DE",
        appName: "SMS",
        startNode: "root",
        nodes: {
            root: {
                text: "Your parcel (1) has outstanding charges (€2.99). Please pay immediately via link, otherwise return to sender: hxxp://customs-fee-scam.to/pay",
                opts: [
                    { t: "[Ignore and delete]", next: "res_spam_ignore" },
                    { t: "[Reply with an SQL injection string]", next: "spam_sql" }
                ]
            },
            spam_sql: {
                text: "Error 500: Internal Server Error. Database connection failed.",
                opts: [
                    { t: "[Grin wickedly]", next: "res_spam_hacked" }
                ]
            }
        },
        results: {
            res_spam_ignore: { txt: "You swipe the message away. The daily battle against cyber windmills.", m: 2, l: 0, a: 5, b: 0 },
            res_spam_hacked: { txt: "You have just successfully shot a scammer's database to pieces. Pure satisfaction.", m: 10, l: -5, a: -10, b: 0 }
        }
    },
    {
        id: "sq_phone_ex_gf",
        kind: "phone",
        title: "Julia (Ex)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Hi. I have seen that you are using my Netflix profile for 'The Penguins of Madagascar'. I am changing the password now. Grow up.",
                opts: [
                    { t: "Please do not, I am halfway through season 2!", next: "ex_beg" },
                    { t: "I paid for that account back then!", next: "ex_fight" }
                ]
            },
            ex_beg: {
                text: "You really are pathetic. All right, you have until Sunday. Then it is over.",
                opts: [
                    { t: "Thanks...", next: "res_ex_shame" }
                ]
            },
            ex_fight: {
                text: "And I paid for the sofa! Bye!",
                opts: [
                    { t: "God, I hate her.", next: "res_ex_rage" }
                ]
            }
        },
        results: {
            res_ex_shame: { txt: "Begging your ex for Netflix access to a children's cartoon... that gnaws at the ego.", m: 10, l: 5, a: 10, b: 0 },
            res_ex_rage: { txt: "Your blood simmers gently. You log out of Netflix in irritation.", m: 5, l: 0, a: 10, b: 0 }
        }
    },
    {
        id: "sq_phone_recruiter",
        kind: "phone",
        title: "Headhunter (LinkedIn)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Hello IT talent! I have an exciting vacancy: 60h/week, on-call duty, 100% on-site. Payment in fruit and appreciation! Interested?",
                opts: [
                    { t: "Have you lost your mind?", next: "rec_mad" },
                    { t: "What kind of fruit?", next: "rec_fruit" }
                ]
            },
            rec_mad: {
                text: "So there is a lack of motivation. Shame. We are looking for people with a 'founder mindset'. Best of luck in your dead end!",
                opts: [
                    { t: "I am reporting you for spam!", next: "res_rec_block" }
                ]
            },
            rec_fruit: {
                text: "Apples! Bananas sometimes (when the CEO has stopped eating them). Shall I put you down for a first interview?",
                opts: [
                    { t: "No, thank you.", next: "res_rec_joke" }
                ]
            }
        },
        results: {
            res_rec_block: { txt: "The sheer nerve of these headhunters is sometimes barely tolerable.", m: 5, l: 0, a: 10, b: 0 },
            res_rec_joke: { txt: "You did laugh briefly, which is something. The job market is absolutely dystopian.", m: 5, l: 5, a: -5, b: 0 }
        }
    },
    {
        id: "sq_phone_gym",
        kind: "phone",
        title: "FitX Studio",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Hey Miller! You have not been to the gym for exactly 412 days. Your muscles miss you! Come in and pump some iron!",
                opts: [
                    { t: "[Cancel the membership straight through the app]", next: "gym_cancel" },
                    { t: "[Sadly tense your soft stomach]", next: "gym_sad" }
                ]
            },
            gym_cancel: {
                text: "Cancellation received. We are very sorry. Sadly your notice period does not end for another 11 months. Stay sporty!",
                opts: [
                    { t: "Daylight robbery, pure and simple...", next: "res_gym_angry" }
                ]
            },
            gym_sad: {
                text: "We have a new offer: bring a friend and train for a month free!",
                opts: [
                    { t: "I have no friends.", next: "res_gym_cry" }
                ]
            }
        },
        results: {
            res_gym_angry: { txt: "You pay €30 a month for nothing. Mild grinding of teeth.", m: 5, l: 0, a: 5, b: 0 },
            res_gym_cry: { txt: "A small blow to your self-confidence. Athletic is not the word.", m: 5, l: 10, a: 5, b: 0 }
        }
    },
    {
        id: "sq_phone_chantal_home",
        char: "Chantal",
        kind: "phone",
        title: "Chantal (Marketing)",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Miiiiiller! I have forgotten my company password. Can you reset it from home for a second? I am working from home and I want to shop... er, work!",
                opts: [
                    { t: "Chantal, raise an official ticket.", next: "chan_ticket" },
                    { t: "I will reset it to 'Marketing123!'.", next: "chan_reset" }
                ]
            },
            chan_ticket: {
                text: "You are such a bureaucrat! I will tell the boss you are blocking me and holding back the growth of this company!",
                opts: [
                    { t: "Go on then.", next: "res_chan_mad" }
                ]
            },
            chan_reset: {
                text: "You are absolutely the best!!! Kissy! 😘",
                opts: [
                    { t: "You are welcome.", next: "res_chan_happy" }
                ]
            }
        },
        results: {
            res_chan_mad: { txt: "Chantal's constant demands for special treatment are quietly irritating. One sigh, then peace.", m: 5, l: 0, a: 10, b: 5, rep: {"Chantal": -5} },
            res_chan_happy: { txt: "You have bent the rules and you have your peace. Plus a colleague who likes you.", m: 10, l: 5, a: -5, b: 5, rep: {"Chantal": 10} }
        }
    },
    {
        id: "sq_phone_amazon",
        kind: "phone",
        title: "Delivery Driver",
        appName: "SMS",
        startNode: "root",
        nodes: {
            root: {
                text: "Hello. Am at front door. Nobody there. Parcel thrown in paper recycling bin.",
                opts: [
                    { t: "WHAT?! There is expensive hardware in there!", next: "amz_panic" },
                    { t: "All right, thanks.", next: "amz_ok" }
                ]
            },
            amz_panic: {
                text: "Paper bin is empty now. Bin lorry was just here. Have a nice day.",
                opts: [
                    { t: "[Put the phone down in frustration]", next: "res_amz_rage" }
                ]
            },
            amz_ok: {
                text: "You are welcome. Please give 5 stars in review. Is important for job.",
                opts: [
                    { t: "Will do.", next: "res_amz_trash" }
                ]
            }
        },
        results: {
            res_amz_rage: { txt: "Your new motherboard is on its way to landfill. You curse quietly to yourself.", m: 10, l: 0, a: 15, b: 0 },
            res_amz_trash: { txt: "This evening after work you will be head first in the paper recycling. A dignified life.", m: 2, l: 5, a: 5, b: 0 }
        }
    },
    {
        id: "sq_phone_bank_fraud",
        kind: "phone",
        title: "Bank Security Service",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Security notice: €250 was debited from your account last night for 'Steam Wallet / anime skins'. Was that you?",
                opts: [
                    { t: "Yes... that was me.", next: "bank_yes" },
                    { t: "No, my account has been hacked!", next: "bank_no" }
                ]
            },
            bank_yes: {
                text: "Understood. We shall lift the block. Enjoy your... digital items of clothing for schoolgirls.",
                opts: [
                    { t: "Please do not judge.", next: "res_bank_shame" }
                ]
            },
            bank_no: {
                text: "Very good, we shall block the card immediately. You will receive a new one by post within 2 weeks.",
                opts: [
                    { t: "Damn it.", next: "res_bank_locked" }
                ]
            }
        },
        results: {
            res_bank_shame: { txt: "The bank employee judged you. That was a little humiliating.", m: 5, l: 5, a: 10, b: 0 },
            res_bank_locked: { txt: "You lied to save face. Now you have no cash for 2 weeks. Genius.", m: 10, l: 0, a: 10, b: 0 }
        }
    },
    {
        id: "sq_phone_ebay",
        kind: "phone",
        title: "Classifieds User34",
        appName: "Chat",
        startNode: "root",
        nodes: {
            root: {
                text: "Hello, is the 24-port switch still there? Give 5 euro and half a crate of Coke. Come right away.",
                opts: [
                    { t: "That thing is worth €200!", next: "ebay_argue" },
                    { t: "Which Coke?", next: "ebay_cola" },
                    { t: "[Simply ignore it]", next: "res_ebay_ignore" }
                ]
            },
            ebay_argue: {
                text: "Yes but is used. 7 euro and I collect. My son has birthday tomorrow!",
                opts: [
                    { t: "No. Bye.", next: "res_ebay_mad" }
                ]
            },
            ebay_cola: {
                text: "Zero. But is already open. Deal?",
                opts: [
                    { t: "[Block]", next: "res_ebay_sad" }
                ]
            }
        },
        results: {
            res_ebay_ignore: { txt: "The daily madness of the internet. Phone off, back to work.", m: 2, l: 0, a: 0, b: 0 },
            res_ebay_mad: { txt: "People like that on the classifieds really do fray your nerves sometimes.", m: 5, l: 0, a: 10, b: 0 },
            res_ebay_sad: { txt: "There are days when you really do wonder about humanity.", m: 2, l: 5, a: 5, b: 0 }
        }
    },
    {
        id: "sq_phone_property",
        kind: "phone",
        title: "Property Management",
        appName: "Messages",
        startNode: "root",
        nodes: {
            root: {
                text: "Important notice to all tenants: the water will be turned off throughout the building today from 10:00 to 16:00. Pipe cleaning.",
                opts: [
                    { t: "Thank God I am at the office.", next: "prop_office" },
                    { t: "You cannot do that at such short notice!", next: "prop_rage" }
                ]
            },
            prop_office: {
                text: "Many thanks for your understanding. Oh, and do not enter the hallway, we are spraying insecticide.",
                opts: [
                    { t: "Wonderful.", next: "res_prop_happy" }
                ]
            },
            prop_rage: {
                text: "Please submit complaints by fax to our office within the stated period.",
                opts: [
                    { t: "Who still has a fax?!", next: "res_prop_mad" }
                ]
            }
        },
        results: {
            res_prop_happy: { txt: "For once there are genuine advantages to sitting in the office at GlobalCorp. Your mood improves minimally.", m: 2, l: -5, a: -5, b: 0 },
            res_prop_mad: { txt: "Fax machines... the final boss of German bureaucracy. Some battles you can only accept.", m: 5, l: 0, a: 10, b: 0 }
        }
    },

    // CHAIN 1: the office plant
    // CHAIN: the bowl order (lead-in to sq_food_bowl_delivery)
    {
        id: "sq_food_bowl_order",
        kind: "phone",
        appName: "Slack",
        title: "#lunch",
        startNode: "root",
        nodes: {
            root: {
                text: "CHANTAL: '@channel Team! ✨ I am collecting for the Buddha Gold Bowls from the new superfood delivery service. €18.50 per person. Who is in? Think of your chakras!'",
                opts: [
                    { t: "[Order with them] Team spirit and all that.", next: "join" },
                    { t: "[Decline politely]", next: "decline" },
                    { t: "'Should we not do pizza instead?'", next: "pizza" }
                ]
            },
            join: {
                text: "CHANTAL: 'Yes! I knew you looked after your energy. I will put you down. 🙏'",
                opts: [
                    { t: "€18.50. For salad. Fine.", next: "res_joined" }
                ]
            },
            decline: {
                text: "CHANTAL: 'Shame... but all right. Not everyone is that far along on their journey.' Three people react to your refusal with a thumbs-down emoji.",
                opts: [
                    { t: "I can live with that.", next: "res_declined" }
                ]
            },
            pizza: {
                text: "CHANTAL: 'PIZZA?! Do you know how many empty carbohydrates are in that?' Markus replies with 🍕🍕🍕. The channel explodes. 47 messages follow.",
                opts: [
                    { t: "All I have done here is cause chaos.", next: "res_pizza" }
                ]
            }
        },
        results: {
            res_joined: {
                txt: "You are on the list. Your bank account is €18.50 lighter, your expectations are not yet.",
                next: "food_bowl_planned",
                rep: { "Chantal": 5 },
                m: 10, l: 0, a: 0, b: 0
            },
            res_declined: {
                txt: "No salad, no chakra, no €18.50 gone. You fetch something from the bakery later. Marketing says nothing, meaningfully.",
                rep: { "Chantal": -5 },
                m: 5, l: 5, a: -5, b: 0
            },
            res_pizza: {
                txt: "The #lunch channel is a battlefield now. Markus salutes you, Chantal does not. Nobody ended up eating anything.",
                rep: { "Chantal": -10, "Markus": 10 },
                m: 15, l: 5, a: 5, b: 0
            }
        }
    },
    // CHAIN: Kevin is handed responsibility (leads into sq_kevin_origin_2)
    {
        id: "sq_kevin_origin_1",
        char: "Kevin",
        kind: "phone",
        appName: "BroChat",
        title: "Kevin's Offer",
        startNode: "intro",
        nodes: {
            intro: {
                text: "KEVIN: 'Bro, honestly. I sit here all day and I am only allowed to change toner. Let me do something proper for once! I could lay the cables in the rack out properly. I have watched YouTube.'",
                opts: [
                    { t: "All right Kevin. Show me what you can do.", next: "trust" },
                    { t: "Absolutely not. The server room is off limits.", next: "deny" },
                    { t: "First you tidy up the stores.", next: "test" }
                ]
            },
            trust: {
                text: "KEVIN: 'SERIOUSLY?! Bro, I will not let you down! I will do it so cleanly the boss will weep with joy!' He sends 14 fire emojis after it.",
                opts: [
                    { t: "I hope I do not regret this.", next: "res_trust" }
                ]
            },
            deny: {
                text: "KEVIN: 'Man... always the same. How am I supposed to learn anything if I am not allowed to do anything?' He is not entirely wrong, and you know it.",
                opts: [
                    { t: "Safety comes first.", next: "res_deny" }
                ]
            },
            test: {
                text: "KEVIN: 'The stores? Nobody has been in there since 2019.' Two hours later he sends a photo: everything sorted, labelled, grouped by cable type. You are honestly impressed.",
                opts: [
                    { t: "Respect. Then you can go near the rack as well.", next: "res_test" }
                ]
            }
        },
        results: {
            res_trust: {
                txt: "Kevin has access to the server room now. You have a good feeling about it. Mostly.",
                next: "kevin_trust",
                rep: { "Kevin": 15 },
                m: 10, l: 0, a: 0, b: 5
            },
            res_deny: {
                txt: "The server room remains your fortress. Kevin remains toner officer. Neither of you is entirely happy with that.",
                rep: { "Kevin": -10 },
                m: 5, l: 0, a: 5, b: -5
            },
            res_test: {
                txt: "Kevin has genuinely earned the trust. The stores look better than your desk.",
                next: "kevin_trust",
                rep: { "Kevin": 20 },
                m: 25, l: -5, a: -10, b: 0
            }
        }
    },
    {
        id: "sq_plant_1",
        kind: "text",
        title: "Flora in Distress",
        text: "The expensive ficus in the corridor, a gift from the board, is letting its leaves droop. The soil is bone dry. Somebody has stuck a Post-it on it: 'Watering officer wanted'.",
        opts: [
            { 
                t: "Fertilise the plant with the leftover doughnut", 
                req: "donut", 
                next: "path_plant_donut", 
                m: 5, l: -5, a: 5, b: 5, 
                r: "You stuff the sugared pastry deep into the soil. Innovative, and probably biologically catastrophic." 
            },
            { 
                t: "Tip the rest of the old coffee in", 
                next: "path_plant_coffee", 
                m: 10, l: 0, a: -5, b: 0, 
                r: "If caffeine keeps you alive it will certainly work on plants. You sacrifice your half-empty cup." 
            },
            { 
                t: "Ignore it and let it wither", 
                next: "path_plant_ignore", 
                m: 2, l: 0, a: 5, b: -5, 
                r: "Not your rubbish, not your problem. The ficus will die a plant's death in peace." 
            }
        ]
    },
    {
        id: "sq_plant_2a",
        kind: "text",
        title: "Fly Invasion",
        reqStory: "path_plant_donut",
        text: "Your doughnut fertiliser has triggered an enormous fruit fly plague. Ms Elster is flapping a newspaper about in the corridor in a panic.",
        opts: [
            { 
                t: "Take flight", 
                m: 5, l: 0, a: -5, b: 0, 
                r: "You turn on your heel and avoid the corridor. Anyone who asks questions gets lied to shamelessly." 
            },
            { 
                t: "Blame Sales", 
                rep: { "Markus": -5, "Frau Elster": 5 },
                m: 5, l: 5, a: 0, b: 0, 
                r: "You suggest with great composure that Markus hoards bananas in his shoes. Ms Elster believes you without hesitation." 
            }
        ]
    },
    {
        id: "sq_plant_2b",
        kind: "text",
        title: "Mutant Ficus",
        reqStory: "path_plant_coffee",
        text: "The coffee has worked wonders! The ficus has practically exploded, the leaves gleam and reach up to the ceiling. The boss stands marvelling at the miracle.",
        opts: [
            { 
                t: "Claim it was an IoT solution", 
                m: 5, l: 0, a: 10, b: 5, 
                rep: { "Dr. Wichtig": -5 },
                r: "You talk about sensors and Wi-Fi irrigation. The boss looks at the pot in confusion and demands a technical report. A stupid mistake." 
            },
            { 
                t: "Modestly take the credit", 
                rep: { "Dr. Wichtig": 10 },
                m: 10, l: 0, a: -5, b: -5, 
                r: "You claim to have 'green fingers'. The boss seems honestly impressed - people who take on responsibility voluntarily are rare around here." 
            }
        ]
    },
    {
        id: "sq_plant_2c",
        kind: "text",
        title: "Deadwood",
        reqStory: "path_plant_ignore",
        text: "The ficus has dried out completely. The bare trunk stands forlornly in the corridor. Egon is in the middle of wrenching it angrily out of the pot.",
        opts: [
            { 
                t: "Offer Egon a hand", 
                loot: "screw",
                rep: { "Egon": 5 },
                m: 10, l: -5, a: -5, b: 0, 
                r: "You push down on the pot with him. Out of gratitude Egon gives you a couple of spare screws. Plant misery yields tools." 
            },
            { 
                t: "Hold a minute's silence", 
                m: 5, l: 0, a: 5, b: 0, 
                rep: { "Egon": -5 },
                r: "Egon stares at you, dumbfounded. Your cynicism rarely goes down well with plain working men." 
            }
        ]
    },

    // CHAIN 2: the chair
    {
        id: "sq_furniture_1",
        kind: "text",
        title: "Office Furniture War",
        text: "You come back from the meeting and your sinfully expensive, ergonomic €1,000 office chair has gone! Standing there instead is a creaking, threadbare wooden chair from the 90s.",
        opts: [
            { 
                t: "Suffer on the uncomfortable wooden chair", 
                next: "path_chair_suffer", 
                m: 5, l: -10, a: -10, b: 0, 
                r: "Your back hurts from the first minute. You do preserve your moral superiority, though." 
            },
            { 
                t: "Send Kevin out to find the thief", 
                next: "path_chair_kevin", 
                m: 5, l: 0, a: 5, b: 0, 
                rep: { "Kevin": -5 },
                r: "You describe it as a 'special task for asset recovery'. Kevin sighs and sets off as the scapegoat." 
            },
            { 
                t: "Steal a chair from Marketing", 
                next: "path_chair_steal", 
                m: 10, l: 5, a: -5, b: 5, 
                r: "You drag somebody else's luxury chair out of the open-plan office. The problem is not solved, only moved." 
            }
        ]
    },
    {
        id: "sq_chair_2a",
        kind: "text",
        title: "Proud Thief",
        reqStory: "path_chair_steal",
        text: "The marketing team has noticed that their best chair is missing. They search the offices and finally stand in your doorway, shaking their heads.",
        opts: [
            { 
                t: "Deny all responsibility and weep", 
                m: 5, l: 0, a: 5, b: -5, 
                r: "Choking back tears, you claim HR gave you the chair because of chronic pain. They back off uncertainly." 
            },
            { 
                t: "Bribery with chocolate", 
                req: "chocolate", 
                m: 15, l: -5, a: -10, b: 0, 
                r: "You bribe Marketing with sugar. They take the chocolate and leave you the chair. Win-win." 
            }
        ]
    },
    {
        id: "sq_chair_2b",
        kind: "text",
        title: "The Bent One",
        reqStory: "path_chair_suffer",
        text: "Your back hurts terribly. You move down the corridor at a 45-degree angle. The boss is coming the other way.",
        opts: [
            { 
                t: "Go through with the martyr act", 
                rep: { "Dr. Wichtig": 10 },
                m: 5, l: 0, a: -10, b: -10, 
                r: "You groan theatrically and tell him about your commitment to the company despite having your equipment stolen. The boss is impressed." 
            },
            { 
                t: "Ask for a more expensive chair", 
                rep: { "Dr. Wichtig": -5 },
                m: 2, l: 0, a: 5, b: 10, 
                r: "He laughs heartily. 'Good joke, Miller!', he says, and goes. Your suffering was respected not one bit." 
            }
        ]
    },
    {
        id: "sq_chair_2c",
        char: "Kevin",
        kind: "text",
        title: "Kevin's Investigation",
        reqStory: "path_chair_kevin",
        text: "Kevin comes back in triumph. He has found the original chair in the break room, where Markus is apparently using it as a footrest.",
        opts: [
            { 
                t: "Bawl Markus out directly", 
                rep: { "Markus": -10 },
                m: 5, l: 0, a: 10, b: 5, 
                r: "You shout at Markus in the corridor in front of everybody. The chair is back, and you have made yourself a new enemy." 
            },
            { 
                t: "Praise Kevin without acting on it", 
                rep: { "Kevin": 5, "Markus": -5 },
                m: 10, l: -5, a: -5, b: 0, 
                r: "You retrieve your chair from Markus with a fixed stare. Kevin gets an encouraging high five." 
            }
        ]
    },

    // CHAIN 3: Thermostat
    {
        id: "sq_temp_1",
        kind: "text",
        title: "War of the Buttons",
        text: "Somebody has set the thermostat in the server room anteroom to a cosy 26 degrees. The servers are venting noisily and the sweat is running down you. Gabi loves the warmth.",
        opts: [
            { 
                t: "Give Gabi a dressing-down", 
                rep: { "Gabi": -10 },
                next: "path_temp_lecture", 
                m: 10, l: 0, a: 10, b: 0, 
                r: "You loudly explain the difference between 'living room' and 'IT hardware' to her. She folds her arms defiantly." 
            },
            { 
                t: "Tape over the thermostat", 
                req: "tape", 
                next: "path_temp_tape", 
                m: 10, l: 10, a: -10, b: -5, 
                r: "A mighty strip of duct tape secures your preferred temperature. Absolute dominance." 
            },
            { 
                t: "Secretly cool it down to 16 degrees", 
                next: "path_temp_freeze", 
                m: 5, l: -5, a: -5, b: 0, 
                r: "You turn it into an ice cave. The servers breathe a quiet sigh of relief and you wipe the sweat off your forehead." 
            }
        ]
    },
    {
        id: "sq_temp_2a",
        kind: "text",
        title: "Chilblains",
        reqStory: "path_temp_freeze",
        text: "Gabi is sitting at her desk in a winter coat and scarf. She sniffles. Her look holds you personally responsible for winter.",
        opts: [
            { 
                t: "Stand her a hot coffee", 
                rep: { "Gabi": 10 },
                m: 15, l: 0, a: -10, b: 0, 
                r: "Diplomacy saves the day. You give her coffee as antifreeze. Mood softened." 
            },
            { 
                t: "Ignore her, stone cold", 
                m: 5, l: 0, a: -5, b: 0, 
                r: "Anyone who is freezing is not disturbing you at work. Pure IT efficiency." 
            }
        ]
    },
    {
        id: "sq_temp_2b",
        kind: "text",
        title: "The Receptionist's Revenge",
        reqStory: "path_temp_lecture",
        text: "Your dressing-down has consequences. Gabi has put every incoming call from a difficult customer straight through to your phone without a word.",
        opts: [
            { 
                t: "Simply pull the cable out", 
                m: 10, l: 5, a: 0, b: 10, 
                r: "No phone, no problems. The customers hang in limbo. Trouble looms later, and for now you have peace." 
            },
            { 
                t: "Forward every customer to Kevin's extension", 
                rep: { "Kevin": -10 },
                m: 5, l: 0, a: -5, b: 0, 
                r: "Apprentices have to be toughened up. Kevin weeps quietly at his desk." 
            }
        ]
    },
    {
        id: "sq_temp_2c",
        kind: "text",
        title: "The Seal of IT",
        reqStory: "path_temp_tape",
        text: "Egon the caretaker stares at the thermostat sealed over with tape. 'Is that regulation under ISO 9001?'",
        opts: [
            { 
                t: "Answer smoothly with 'Yes, IT security'", 
                rep: { "Egon": 5 },
                m: 10, l: 0, a: -10, b: -5, 
                r: "Egon nods thoughtfully and makes a note. The man respects regulations, even invented ones." 
            },
            { 
                t: "Admit that it is harassment", 
                rep: { "Egon": -5 },
                m: 2, l: 0, a: 5, b: 5, 
                r: "He pulls the tape off. 'Kindergarten', he grumbles. Your masterpiece is destroyed." 
            }
        ]
    },

    // CHAIN 4: the locked cubicle
    {
        id: "sq_wc_1",
        kind: "text",
        title: "The Smallest Room",
        text: "In the toilets the only cubicle has been locked for 45 minutes. There is a suspicious smell of mobile games and relaxed indifference.",
        opts: [
            { 
                t: "Knock loudly and be a nuisance", 
                next: "path_toilet_knock", 
                m: 5, l: 0, a: 10, b: 0, 
                r: "You hammer on the door like a lunatic. An irritated groan issues forth. The time of peace is over." 
            },
            { 
                t: "Divert to the HR visitors' toilet", 
                next: "path_toilet_hr", 
                m: 10, l: -5, a: -5, b: 0, 
                r: "You take the risk and use the softly upholstered premium toilet of the board." 
            },
            { 
                t: "Quietly switch the light off", 
                next: "path_toilet_dark", 
                m: 5, l: 10, a: -5, b: 5, 
                r: "You press the switch and are gone at once. Absolute darkness for the mobile gamer. Fairly antisocial, and effective." 
            }
        ]
    },
    {
        id: "sq_wc_2a",
        kind: "text",
        title: "The Colleague Revealed",
        reqStory: "path_toilet_knock",
        text: "The next time you pass by, the door opens. Markus from Sales comes out with his legs asleep and the charging cable in his hand.",
        opts: [
            { 
                t: "Snatch the charging cable off him contemptuously", 
                loot: "cable",
                rep: { "Markus": -10 },
                m: 10, l: -5, a: 10, b: 0, 
                r: "You take his cable off him as a forfeit. Markus limps away furiously." 
            },
            { 
                t: "Pass it on to the boss", 
                rep: { "Dr. Wichtig": 5, "Markus": -10 },
                m: 5, l: 0, a: -5, b: -5, 
                r: "The boss is delighted with your denunciation. Markus has extreme targets imposed on him." 
            }
        ]
    },
    {
        id: "sq_wc_2b",
        kind: "text",
        title: "Premium Trouble",
        reqStory: "path_toilet_hr",
        text: "You have been caught in the HR toilet! Ms Elster snaps at you that these facilities are intended for guests and C-level only.",
        opts: [
            { 
                t: "Soothingly offer chocolate out of the tub", 
                rep: { "Frau Elster": 10 },
                req: "chocolate", 
                m: 15, l: -10, a: -10, b: 0, 
                r: "The chocolate smooths the waters perfectly. She laughs and says: 'Just this once, Miller!'" 
            },
            { 
                t: "'A technical emergency!'", 
                rep: { "Frau Elster": -5 },
                m: 5, l: 0, a: 5, b: 5, 
                r: "She does not believe a word of it. A reprimand goes on your personnel file." 
            }
        ]
    },
    {
        id: "sq_toilet_2c",
        kind: "text",
        title: "Blind Fear",
        reqStory: "path_toilet_dark",
        text: "Thanks to your light-switch trick, Kevin stumbled out of the cubicle in tears and panic and into a waste bin. He is refusing to clean the corridor today.",
        opts: [
            { 
                t: "Conceal the guilty conscience", 
                m: 10, l: 5, a: -5, b: 0, 
                r: "You keep the secret to yourself in silence. Kevin learns that life is hard." 
            },
            { 
                t: "Give Kevin a doughnut out of pity", 
                req: "donut", 
                rep: { "Kevin": 10 },
                m: 15, l: -5, a: -10, b: 0, 
                r: "You buy your forgiveness. Kevin beams. 'You are the best colleague!' The irony is palpable." 
            }
        ]
    },

    // CHAIN 5: the toner mafia
    {
        id: "sq_toner_1",
        kind: "text",
        title: "Toner Shortage",
        text: "The big department printer is howling because the magenta is empty. There is only one spare cartridge left, and Financial Control does not want to order a new one this week.",
        opts: [
            { 
                t: "Force the printer to black and white", 
                next: "path_printer_bw", 
                m: 5, l: 0, a: 5, b: -5, 
                r: "You hack the control panel. From today everything prints in dreary grey. Efficiency." 
            },
            { 
                t: "Simply swap it in secret", 
                next: "path_printer_swap", 
                m: 5, l: 5, a: -5, b: 0, 
                r: "You take the cartridge, fix your own problem and ignore the rest." 
            },
            { 
                t: "Stockpile the cartridge in your office", 
                next: "path_printer_hoard", 
                m: 10, l: 10, a: -10, b: 0, 
                r: "You tuck the heavy package under your arm and store it in the dark IT cupboard. Anyone who wants to print has to beg." 
            }
        ]
    },
    {
        id: "sq_toner_2a",
        kind: "text",
        title: "Empty Cartridge",
        reqStory: "path_printer_swap",
        text: "The old, empty cartridge is still standing about next to the printer. Somebody has trodden right in it and distributed magenta dust all down the corridor.",
        opts: [
            { 
                t: "Flee into server exile", 
                m: 5, l: 0, a: -5, b: 5, 
                r: "You make yourself invisible. Who clears up the dust is somebody else's question." 
            },
            { 
                t: "Alert Egon", 
                rep: { "Egon": -5 },
                m: 5, l: 0, a: 5, b: 0, 
                r: "Egon nearly has a heart attack when he sees the mess. He curses about his rounds." 
            }
        ]
    },
    {
        id: "sq_toner_2b",
        kind: "text",
        title: "Begging for Colours",
        reqStory: "path_printer_hoard",
        text: "Marketing is desperate. They need colour for the pitch. They stand outside your office door offering anything to get hold of a toner.",
        opts: [
            { 
                t: "Refuse the toner", 
                m: 5, l: 5, a: 10, b: 10, 
                r: "You insist you do not have one. The marketing pitch looks dreadful and the boss rages." 
            },
            { 
                t: "Hand the toner over for a quiet life", 
                m: 15, l: -5, a: -10, b: -5, 
                r: "They thank you in tears. You are the king of office supplies." 
            }
        ]
    },
    {
        id: "sq_toner_2c",
        kind: "text",
        title: "Gloom in Black and White",
        reqStory: "path_printer_bw",
        text: "The boss is absolutely beside himself because his annual accounts charts have printed entirely in grey, in 50 shades. 'Who did this?!'",
        opts: [
            { 
                t: "Blame it on a driver bug", 
                m: 10, l: 0, a: -5, b: 5, 
                r: "With grand words about 'Windows Update 40H' you smooth the waters. Pure deception." 
            },
            { 
                t: "'A cost-saving measure!'", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, l: 0, a: 10, b: 10, 
                r: "Making yourself important to the boss with savings never works. Your bonuses are history." 
            }
        ]
    },
// CHAIN 6: the mysterious cake
    {
        id: "sq_bday_1",
        kind: "text",
        title: "Cake Trap?",
        text: "There is a gigantic cake with pink icing in the reception area. No note, no clue. Gabi eyes it suspiciously: 'Is it safe?'",
        opts: [
            { 
                t: "Voice health concerns", 
                next: "path_cake_panic", 
                m: 5, l: 0, a: 5, b: 5, 
                r: "You whisper to Gabi that it might be industrial espionage by the competition. She goes chalk white." 
            },
            { 
                t: "Quietly dispose of the cake in tubs", 
                loot: "donut", 
                next: "path_cake_hide", 
                m: 5, l: 5, a: 5, b: 0, 
                r: "You cravenly clear it into the bin to avoid panic. You take a small piece with you as loot." 
            },
            { 
                t: "Bravely cut yourself a slice", 
                next: "path_cake_eat", 
                m: 10, l: 5, a: -10, b: 0, 
                r: "You take a massive slice. Tastes of strawberry and cardboard. Sugar is sugar, though." 
            }
        ]
    },
    {
        id: "sq_bday_2a",
        kind: "text",
        title: "Surprise",
        reqStory: "path_cake_eat",
        text: "An hour later the whole of Sales is dancing in a circle. The cake was apparently 'special baking' from Jürgen's Amsterdam holiday.",
        opts: [
            { 
                t: "Turn to HR in a panic", 
                rep: { "Frau Elster": 5, "Markus": -10 },
                m: 5, l: 0, a: 10, b: 0, 
                r: "Ms Elster smells a rat and locks Sales in. You are the traitor of joy." 
            },
            { 
                t: "Join in and dance", 
                rep: { "Markus": 5 },
                m: 20, l: -15, a: -10, b: 5, 
                r: "You laugh along hysterically. No more tickets today, everything glows in bright colours." 
            }
        ]
    },
    {
        id: "sq_bday_2b",
        char: "Gabi",
        kind: "text",
        title: "Gabi's Panic",
        reqStory: "path_cake_panic",
        text: "Gabi has called the security service. Two ill-tempered guards examined the cake like a bomb and threw it away.",
        opts: [
            { 
                t: "Congratulate Gabi on her vigilance", 
                rep: { "Gabi": 5 },
                m: 10, l: 0, a: -5, b: 0, 
                r: "She puffs herself up proudly. You are on the good side of reception." 
            },
            { 
                t: "Comment cynically on the operation", 
                rep: { "Gabi": -5 },
                m: 5, l: 0, a: 5, b: 0, 
                r: "Gabi takes that badly. 'Prevention is better than cure, Mr Miller!'" 
            }
        ]
    },
    {
        id: "sq_bday_2c",
        kind: "text",
        title: "The Birthday Boy",
        reqStory: "path_cake_hide",
        text: "Boss Dr Wichtig is raging through the corridors. 'Who threw away my lactose-free veggie cake for my 50th?!'",
        opts: [
            { 
                t: "Admit it was for hygiene reasons", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, l: 0, a: 10, b: 10, 
                r: "Admitting things is dangerous where management is involved. The boss hates you fervently for your effrontery." 
            },
            { 
                t: "It was Kevin!", 
                rep: { "Dr. Wichtig": 10, "Kevin": -10 },
                m: 5, l: 0, a: 0, b: -5, 
                r: "Kevin has to take the fall again. The boss bellows at the poor lad. You are in the clear." 
            }
        ]
    },

    // CHAIN 7: the burning waste basket
    {
        id: "sq_smoke_1",
        kind: "text",
        title: "Smouldering Situation",
        text: "Light smoke is rising from the waste bin next to your desk. Somebody must have thrown in a fag end that was still glowing.",
        opts: [
            { 
                t: "Point the fire extinguisher at it", 
                next: "path_fire_extinguisher", 
                m: 5, l: -5, a: 5, b: 5, 
                r: "PSSSHH! The whole office is wrapped in a white cloud of powder. The fire is out, and everybody is coughing." 
            },
            { 
                t: "Tip a bottle of water over it", 
                next: "path_fire_water", 
                m: 10, l: -5, a: -5, b: 0, 
                r: "Hiss-puff! It sizzles and smells revolting of burnt paper, and the danger is over." 
            },
            { 
                t: "Order Kevin to carry the thing outside", 
                rep: { "Kevin": -5 },
                next: "path_fire_kevin", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "Kevin carries the smouldering bin down the corridor like a bomb. You shut your door quickly." 
            }
        ]
    },
    {
        id: "sq_smoke_2a",
        kind: "text",
        title: "Winter Storm",
        reqStory: "path_fire_extinguisher",
        text: "The boss comes into the office sneezing. Everything is dusted white. 'MILLER! Why does it look like a snowstorm in August in here?!'",
        opts: [
            { 
                t: "I saved us all!", 
                rep: { "Dr. Wichtig": 5 },
                m: 10, l: 0, a: -5, b: -5, 
                r: "Heroism always works. Wichtig claps you dustily on the shoulder." 
            },
            { 
                t: "It was a fire safety drill!", 
                rep: { "Dr. Wichtig": -5 },
                m: 5, l: 0, a: 5, b: 5, 
                r: "He is less than delighted. Afterwards you get to wipe the dust up yourself." 
            }
        ]
    },
    {
        id: "sq_smoke_2b",
        kind: "text",
        title: "The Smell of Ash",
        reqStory: "path_fire_water",
        text: "There is a penetrating smell of cold campfire in the corridor. Colleagues glance over as though you were a marauding boy scout.",
        opts: [
            { 
                t: "Proudly recount how you fought the fire", 
                m: 5, l: 0, a: -5, b: 0, 
                r: "Your heroic report is accepted, even if the smell is disgusting." 
            },
            { 
                t: "Set up a fan", 
                m: 10, l: 5, a: -10, b: 0, 
                r: "Good air movement brings relief for the nose and the spirits." 
            }
        ]
    },
    {
        id: "sq_smoke_2c",
        char: "Kevin",
        kind: "text",
        title: "Kevin's Heroic Deed",
        reqStory: "path_fire_kevin",
        text: "Kevin proudly carried the smoking waste bin all the way outside. Now he is in the intranet newsletter as 'Employee of the Month'.",
        opts: [
            { 
                t: "Let him have the glory", 
                rep: { "Kevin": 5 },
                m: 15, l: -5, a: -5, b: 0, 
                r: "Kevin is blissful. Kindness does not always hurt as much as expected." 
            },
            { 
                t: "'That was on your orders!'", 
                rep: { "Kevin": -10 },
                m: 5, l: 0, a: 10, b: 5, 
                r: "You take the title off him. Kevin plunges into a deep depression." 
            }
        ]
    },

    // CHAIN 8: the vanished parcel
    {
        id: "sq_delivery_1",
        char: "Egon",
        kind: "text",
        title: "Parcel Theft",
        text: "Your private Amazon order (expensive noise-cancelling headphones) was allegedly accepted by 'Egon'. Egon swears he has nothing, though.",
        opts: [
            { 
                t: "Ring the sorting office", 
                next: "path_delivery_call", 
                m: 10, l: -5, a: -5, b: 0, 
                r: "You dial the hotline and land in the queue. 'Für Elise', on a loop, with a voice cutting in to give your position: eleven. A while later: eleven. Your life ebbs away."
            },
            { 
                t: "Search the corridors for boxes", 
                loot: "cable",
                next: "path_delivery_search", 
                m: 5, l: 5, a: 0, b: 0, 
                r: "No parcel in sight. But hey, you find a forgotten high-quality video cable under a desk in HR!" 
            },
            { 
                t: "Loudly accuse Egon of lying", 
                rep: { "Egon": -10 },
                next: "path_delivery_egon", 
                m: 5, l: 0, a: 10, b: 5, 
                r: "Egon is livid and throws you out of his cubbyhole. The conflict escalates." 
            }
        ]
    },
    {
        id: "sq_delivery_2a",
        char: "Egon",
        kind: "text",
        title: "Egon's Grudge",
        reqStory: "path_delivery_egon",
        text: "Egon is fuming. As he passes he lets you know that IT is 'right at the bottom of the list' from now on. He refuses to do any repairs for you.",
        opts: [
            { 
                t: "Stay stubborn", 
                rep: { "Egon": -5 },
                m: 2, l: 0, a: 5, b: 0, 
                r: "From now on you have to change broken light bulbs in the office yourself." 
            },
            { 
                t: "Bring chocolate as a peace offering", 
                req: "chocolate", 
                rep: { "Egon": 10 },
                m: 15, l: -5, a: -10, b: 0, 
                r: "You apologise. Egon accepts the comfort food with a growl." 
            }
        ]
    },
    {
        id: "sq_delivery_2b",
        kind: "text",
        title: "Telecom Trance",
        reqStory: "path_delivery_call",
        text: "After 45 minutes of 'Für Elise' as hold music, a confused employee answers. The parcel was handed to the post boy 'Kevin', not Egon.",
        opts: [
            { 
                t: "Simply ask him calmly", 
                rep: { "Kevin": 5 },
                m: 15, l: 0, a: -5, b: 0, 
                r: "He was going to bring it to you after his lunch break. Done, no hard feelings." 
            },
            { 
                t: "Bellow at Kevin", 
                rep: { "Kevin": -10 },
                m: 10, l: 0, a: 5, b: 0, 
                r: "Kevin pushes the parcel out from under his desk, trembling. You snatch it off him furiously." 
            }
        ]
    },
    {
        id: "sq_delivery_2c",
        kind: "text",
        title: "The Mountain of Boxes",
        reqStory: "path_delivery_search",
        text: "Your search in the HR area looked suspicious. Ms Elster admonishes you: 'The corridors are not a private detective agency, Miller!'",
        opts: [
            { 
                t: "'My property!'", 
                rep: { "Frau Elster": -10 },
                m: 5, l: 0, a: 10, b: 10, 
                r: "She writes a very angry note for the file about you. Not good." 
            },
            { 
                t: "Capitulate at once", 
                rep: { "Frau Elster": 5 },
                m: 5, l: 0, a: -5, b: -5, 
                r: "Humility heals every HR wound. You mutter your apologies and leave." 
            }
        ]
    },

    // CHAIN 9: the cable tangle
    {
        id: "sq_cable_1",
        kind: "text",
        title: "The Spaghetti Monster",
        text: "The monitor only needs plugging in somewhere else, but under your desk it looks as though somebody has been plaiting spaghetti nests. Hundreds of cables cross each other in the chaos.",
        opts: [
            { 
                t: "Order Kevin under the desk", 
                rep: { "Kevin": -5 },
                next: "path_cable_kevin", 
                m: 5, l: 0, a: 5, b: 0, 
                r: "You send Kevin crawling into the abyss. He curses quietly while you watch with relish." 
            },
            { 
                t: "Simply pull hard on the topmost cable", 
                next: "path_cable_pull", 
                m: 5, l: -5, a: 5, b: 5, 
                r: "One daring yank. A loud bang. Some device or other has just failed. Brave, but foolish." 
            },
            { 
                t: "Bring order with screws and cable ties", 
                req: "screw", 
                next: "path_cable_order", 
                m: 15, l: -10, a: -10, b: -5, 
                r: "You invest half an hour of sweat. Afterwards it looks perfectly ordered. Pure IT aesthetics. (Item screwed down)" 
            }
        ]
    },
    {
        id: "sq_cable_2a",
        kind: "text",
        title: "Power Cut",
        reqStory: "path_cable_pull",
        text: "Your 'yank' appears to have taken your boss's uninterruptible power supply off the mains. His machine is off and he is running furiously down the corridor.",
        opts: [
            { 
                t: "Put forward a DDoS attack from outside", 
                rep: { "Dr. Wichtig": -5 },
                m: 10, l: 5, a: 0, b: 10, 
                r: "The boss demands an extreme security review, and he does not spot the cable lie. Phew." 
            },
            { 
                t: "Weep quietly and confess, trembling", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, l: 0, a: 10, b: 15, 
                r: "He laughs cruelly and issues you a reprimand. Your weakness disgusts him." 
            }
        ]
    },
    {
        id: "sq_cable_2b",
        kind: "text",
        title: "Cleanliness Inspection",
        reqStory: "path_cable_order",
        text: "Egon stumbles into the office and sees the perfection under your desk. 'Astonishing... that is... cable poetry!'",
        opts: [
            { 
                t: "Lecture Egon that he ought to do it that way", 
                rep: { "Egon": -5 },
                m: 5, l: 0, a: 10, b: 5, 
                r: "Your arrogance drives Egon into a frenzy. He leaves the office in a rage." 
            },
            { 
                t: "Modestly bow your head", 
                rep: { "Egon": 10 },
                m: 15, l: 0, a: -5, b: 0, 
                r: "Egon claps you on the shoulders, moved. You are his new favourite man in the company." 
            }
        ]
    },
    {
        id: "sq_cable_2c",
        char: "Kevin",
        kind: "text",
        title: "Kevin's Trauma in the Dark",
        reqStory: "path_cable_kevin",
        text: "Kevin has developed a dust allergy and is sneezing every minute. He is demanding leave.",
        opts: [
            { 
                t: "Generously give him the time off", 
                rep: { "Kevin": 10 },
                m: 10, l: 0, a: -10, b: 0, 
                r: "For once you behave like a genuine mentor. He is deeply grateful to you." 
            },
            { 
                t: "Answer cynically: 'Bless you!'", 
                rep: { "Kevin": -10 },
                m: 2, l: 0, a: 5, b: 0, 
                r: "He wishes you to hell and sneezes on your keyboard." 
            }
        ]
    },

    // CHAIN 10: the window war
    {
        id: "sq_window_1",
        kind: "text",
        title: "Storm Surge in the Office",
        text: "Ms Elster has flung the corridor window wide open. It is December. The ice-cold wind blows your notes off the desk.",
        opts: [
            { 
                t: "Slam the window shut violently", 
                next: "path_window_close", 
                m: 5, l: 0, a: 10, b: 0, 
                rep: { "Frau Elster": -5 },
                r: "BANG! The glass rattles. Ms Elster turns round, outraged. The window duel goes to you." 
            },
            { 
                t: "Suffer and put a thick coat on", 
                next: "path_window_suffer", 
                m: 5, l: -5, a: -5, b: 0, 
                r: "In a hat and scarf at your desk you look like a polar explorer, and you are risking no war with HR." 
            },
            { 
                t: "Turn the heating up as a countermeasure", 
                next: "path_window_heat", 
                m: 10, l: 5, a: 5, b: 5, 
                r: "You set the radiator valve to 5. Climate change made easy in your own office." 
            }
        ]
    },
    {
        id: "sq_window_2a",
        kind: "text",
        title: "Declaration of War from HR",
        reqStory: "path_window_close",
        text: "As a punishment for the 'slamming', Ms Elster has excluded your office entirely from the coffee order.",
        opts: [
            { 
                t: "Protest furiously", 
                rep: { "Frau Elster": -5 },
                m: 2, l: 0, a: 10, b: 5, 
                r: "She will not be swayed. That means drinking tap water from now on." 
            },
            { 
                t: "Offer a doughnut in reconciliation", 
                req: "donut", 
                rep: { "Frau Elster": 10 },
                m: 15, l: -5, a: -10, b: 0, 
                r: "The sugar breaks her fury. You are back on the coffee list again." 
            }
        ]
    },
    {
        id: "sq_window_2b",
        kind: "text",
        title: "Snow in the Server Room",
        reqStory: "path_window_suffer",
        text: "Your passivity means that flakes are now blowing into the office as well. The boss laughs out loud at your polar explorer outfit.",
        opts: [
            { 
                t: "'It is survival training!'", 
                rep: { "Dr. Wichtig": 5 },
                m: 10, l: 5, a: -5, b: -5, 
                r: "He laughs even louder and keeps the line: in the next meeting he introduces you as 'our polar explorer'. The flakes keep blowing in, but the boss is laughing with you. For as long as it stays funny."
            },
            { 
                t: "Get shirty with him", 
                rep: { "Dr. Wichtig": -10 },
                m: 5, l: 0, a: 10, b: 15, 
                r: "He bellows back and bans winter coats to preserve the 'dress code'. Idiotic." 
            }
        ]
    },
    {
        id: "sq_window_2c",
        kind: "text",
        title: "Heatstroke",
        reqStory: "path_window_heat",
        text: "Egon throws a fit when he notices your radiators turned up to the stop. 'Are you trying to ruin us?!'",
        opts: [
            { 
                t: "Ignore the caretaker's outrage", 
                rep: { "Egon": -10 },
                m: 2, l: 0, a: 5, b: 5, 
                r: "You send him away. In revenge he turns the main stopcock off." 
            },
            { 
                t: "Invent a lie: 'Damp in the system!'", 
                m: 10, l: 0, a: 5, b: 0, 
                r: "He scratches his head and grudgingly buys the idiotic fib." 
            }
        ]
    },

    {
        id: "sq_meta_donation",
        kind: "text",
        webOnly: true, // pointless in the desktop build - the player already owns it
        title: "Inception on Steam",
        text: "In a quiet moment you are procrastinating on Steam, browsing the new releases. Hold on a moment... there is an indie game there called 'Layer8Problem'. The SysAdmin in the screenshots looks damned like you! And the feature list reads exactly like an excerpt from your daily madness. It feels frighteningly real, as though somebody had made a sitcom out of your suffering.",
        opts: [
            { 
                t: "'The game is totally unrealistic anyway!'", 
                m: 5, l: 0, a: -5, b: 0, 
                r: "You write a cynical comment in the forum: 'No boss on earth would demand treadmills in the server room!' ... Then you turn round and see Dr Wichtig standing in the corridor with a tape measure. Damn."
            },
            { 
                t: "Shut up and take my money! - view it on Steam", 
                m: 2, l: 5, a: 0, b: 10, 
                r: "WHAM! Dr Wichtig is behind you out of nowhere. 'Miller! Am I paying you to play games?!' You close the window in a panic, having quietly memorised the shop page first. If you would like to support the project: the Steam version with cloud saves and achievements is at https://store.steampowered.com/app/4487580/ - a review would be very much appreciated."
            },
            { 
                t: "'I live this every day, why would I play it?'", 
                m: 2, l: 0, a: 0, b: 0, 
                r: "Entirely understandable. Why spend money on being irritated by digital colleagues when the real ones do it completely free of charge? You close the tab, shaking your head."
            }
        ]
    },

    {
    id: "sq_moving_box",
    kind: "text",
    title: "The Box",
    text: "A packing box has stood in the corridor for months. A yellowed note is stuck to it: 'DO NOT THROW OUT — R. Schmidt'.\n\nRüdiger Schmidt resigned in 2019. Nobody dares touch the box. It is practically a monument.",
    opts: [
        {
            t: "Finally get rid of the box.",
            m: 20, l: -10, a: 10, b: 10,
            rep: { "Frau Elster": 5 },
            r: "You carry it to the skip. Halfway there Ms Elster comes past and gives you an approving nod. Two hours later there is a new box in the corridor. On it: 'DO NOT THROW OUT'."
        },
        {
            t: "Have a quick look inside. Only very quickly.",
            loot: "screw",
            m: 8, l: 5, a: 0, b: 5,
            r: "Two coffee mugs with dried-up contents, a ring binder marked 'Q3 2018' and, right at the bottom, a screwdriver. You take the screwdriver. The mugs you leave, out of respect."
        },
        {
            t: "Dig on underneath the binders.",
            loot: "manual",
            m: 15, l: 0, a: 5, b: 5,
            r: "Right at the bottom, under a layer of promotional pens, lies a Windows 95 manual. Rüdiger has written on the first page: 'In case anybody ever asks again.' He knew."
        }
    ]
},

    {
    id: "sq_empty_desk",
    kind: "text",
    title: "The Empty Desk",
    text: "A desk in the open-plan office stands empty. Monitor dark, chair pushed in neatly. The top drawer is open a crack.\n\nInside: duct tape, a USB stick and a packet of glucose tablets.",
    opts: [
        {
            t: "Take the tape. He does not sit here any more anyway.",
            loot: "tape",
            m: 5, l: 5, a: 0, b: 5,
            r: "Pocketed. At that moment somebody comes round the corner with a coffee mug, sits down at that very desk and boots the machine up. He was at lunch. The two of you look at each other. Nobody says anything."
        },
        {
            t: "Pocket the unlabelled stick.",
            loot: "usb_stick",
            m: 5, l: 5, a: 5, b: 10,
            r: "An unlabelled stick. Could be a boot stick, could equally be somebody's private photo collection. You pocket it and resolve never to find out."
        },
        {
            t: "Push the drawer shut and walk on.",
            m: 3, l: 0, a: -5, b: -5,
            r: "You push it shut. Later in the day you hear somebody swearing because his tape has vanished. Not yours. For the first time today, moral superiority is yours."
        }
    ]
},

/* ============================================================
   ERRAND WAVE (v4.0.0)
   Five walks through the building for Markus, Dr. Wichtig and
   Chantal, who were thin in this pool, plus two mysteries with
   no character attached (Project Phoenix, the copier carton).
   Interlocked with the Egon lore of the other waves. Gates on
   stressball and zip_ties, loot: manual, stressball.
   ============================================================ */

{
    id: "sq_raum_phoenix",
    kind: "text",
    title: "Project Phoenix",
    text: "Room 'Creative 2' has been continuously booked in the system for four months: 'Project Phoenix, all day, recurring booking'. You pass it on your rounds. The room is empty. It is always empty. And nobody in the whole building has ever heard of a Project Phoenix.",
    opts: [
        {
            t: "Cancel the recurring booking",
            next: "path_phoenix_storno",
            m: 10, l: -5, a: 5, b: 0,
            r: "Four months of blockade, ended with three clicks. The room is free and triple-booked within the hour. And somewhere in this building somebody has just noticed that their cover has disappeared."
        },
        {
            t: "Quietly use the empty room yourself",
            next: "path_phoenix_nutzen",
            m: 15, l: 10, a: -10, b: 0,
            r: "A permanently booked, permanently empty room is the quietest place in the company. You do an hour of paperwork there undisturbed, in heavenly silence. Whoever Phoenix is: the two of you now share a hiding place without knowing each other."
        },
        {
            t: "Ask Gabi what Phoenix is",
            rep: { "Gabi": 3 },
            next: "path_phoenix_gabi",
            m: 10, l: 5, a: 0, b: 0,
            r: "Gabi looks left, looks right, and drops her voice: 'Do not ask about Phoenix. But IF you ask: it has to do with the third floor. And with Mr Rademacher.' There is no Mr Rademacher in this company. Not any more."
        }
    ]
},
{
    id: "sq_raum_phoenix_2a",
    kind: "text",
    title: "The Phoenix Gets in Touch",
    reqStory: "path_phoenix_storno",
    text: "The next morning there is a Post-it on your monitor. Clean block capitals: 'The booking was DELIBERATE. You do not know what you have done. - P.' No sender, no witnesses, and the camera in the corridor points in exactly the wrong direction. It would, naturally.",
    opts: [
        {
            t: "Pointedly ignore the Post-it",
            m: 2, l: 5, a: 0, b: 5,
            r: "You refuse to be intimidated by stationery. The room stays free. Over the following days small things start to register: your office chair is set differently in the mornings. Your window blind jams. Your name in the booking system suddenly has a typo in it. War takes many forms."
        },
        {
            t: "Lie in wait in the room",
            m: 25, l: 5, a: 10, b: 0,
            r: "You spend your lunch break hidden behind the flipchart in Creative 2. Nobody comes. Naturally nobody comes. As you give up in exasperation and leave, there is a second Post-it on the table: 'Nice try.' It was not there earlier."
        },
        {
            t: "Obediently restore the booking",
            m: 5, l: 10, a: 5, b: 0,
            r: "You obey a Post-it. The recurring booking is running again, the room is officially occupied and genuinely empty, and the order of things is restored. In the afternoon a shrink-wrapped slice of streusel cake is lying on your keyboard. Phoenix says thank you."
        }
    ]
},
{
    id: "sq_raum_phoenix_2b",
    char: "Egon",
    kind: "text",
    title: "Double Booking",
    reqStory: "path_phoenix_nutzen",
    text: "You are sitting in the silent Phoenix room again when the door opens: Egon. With a flask, a newspaper and the composure of a man who has a standing appointment. The two of you stare at each other. 'You', says Egon slowly, 'are not Rademacher.'",
    opts: [
        {
            t: "Wind him up: 'THIS is Project Phoenix?'",
            rep: { "Egon": -5 },
            m: 5, l: 0, a: 5, b: 0,
            r: "'Four months of recurring booking for a nap, Egon?' He folds the newspaper, stands up and leaves without a word. From next week the room really is free. The heating in your office, meanwhile, has taken to 'jamming' remarkably often, and Egon unfortunately never has a moment."
        },
        {
            t: "Respectfully cede the room",
            rep: { "Egon": 3 },
            m: 5, l: 5, a: 0, b: 0,
            r: "The man has ruled this building for decades - he has simply earned himself a quiet room. You pack your things up. At the door Egon says, without looking up: 'Wednesdays I am not here.' It is an invitation. The largest one he has to give."
        },
        {
            t: "Agree a pact of silence",
            rep: { "Egon": 5 },
            m: 10, l: 5, a: -5, b: 0,
            r: "The two of you settle it without many words: Egon keeps his lunchtime peace, you get the room on Tuesdays and Thursdays. How he books it through the account of a man who left in 2016 you do not ask. Some contracts only work unquestioned."
        }
    ]
},
{
    id: "sq_raum_phoenix_2c",
    kind: "text",
    title: "Herr Rademacher",
    reqStory: "path_phoenix_gabi",
    text: "You dig: Rademacher, head of IT until 2016, your predecessor's predecessor. His user account has never been disabled. It books rooms. It holds valid access rights. And according to the logs it answered an email nine days ago.",
    opts: [
        {
            t: "Report the find to Gabi",
            rep: { "Gabi": 5 },
            m: 10, l: 5, a: 0, b: 0,
            r: "Gabi listens and goes a shade paler. 'So it is true after all.' She says nothing more. On the way back it occurs to you that Gabi knows everything as a matter of principle and tells everything as a matter of principle - except on this one subject. That information is itself information."
        },
        {
            t: "Finally disable the account properly",
            m: 15, l: -5, a: 5, b: -5,
            r: "While disabling it you find: 4,213 unread emails, a forwarding rule to an external address and a calendar full of recurring meetings up to 2031. You end it all, document it cleanly and feel as though you have pensioned off a ghost."
        },
        {
            t: "Write Rademacher an email",
            m: 5, l: 5, a: 5, b: 0,
            r: "'Dear Mr Rademacher, who is using this account?' No reply. Not all day. Then at 17:58 an automatic out-of-office notice: 'In a meeting. Room Creative 2.' You resolve to put no further questions to the building today."
        }
    ]
},

{
    id: "sq_gemba_walk",
    kind: "text",
    char: "Dr. Wichtig",
    title: "The Gemba Walk",
    text: "Dr Wichtig has read a book. 'I am doing a GEMBA WALK today, Miller. Japanese management method. I observe the value streams. Simply act as though I were not here.' He stations himself a metre behind you. With a clipboard. You can hear him breathing and, at irregular intervals, writing.",
    opts: [
        {
            t: "Put on an impressive display of fake activity",
            next: "path_gemba_show",
            m: 10, l: 10, a: 0, b: -5,
            r: "You open three terminals, let impressive logs rush past and mutter things like 'latency anomaly in the east cluster'. There is no east cluster. Dr Wichtig takes enthusiastic notes. You have done no work at all, and it looked like the future."
        },
        {
            t: "Involve him: 'Fancy a go at patching?'",
            rep: { "Dr. Wichtig": 5 },
            next: "path_gemba_patch",
            m: 15, l: 0, a: 5, b: 0,
            r: "Under your guidance Dr Wichtig plugs in a network cable. It clicks. He beams like a child at the waterworks. 'I have TOUCHED the infrastructure, Miller.' That sentence will have consequences. Good ones? Unclear."
        },
        {
            t: "Squeeze the stress ball and tune him out",
            req: "stressball",
            next: "path_gemba_ball",
            m: 10, l: 5, a: -10, b: 0,
            r: "The ball absorbs whatever the breathing behind you produces. You carry on working in perfect calm, as though the metre behind you were uninhabited. Dr Wichtig notes: 'Employee appears conspicuously calm.' That will end up in the report as well."
        },
        {
            t: "Simply carry on working normally",
            next: "path_gemba_normal",
            m: 15, l: 0, a: 15, b: -5,
            r: "You work under observation. Every keystroke feels like an examination, every error message like a confession. After a quarter of an hour he writes something conspicuously long. You will never want to know what."
        }
    ]
},
{
    id: "sq_gemba_walk_2a",
    kind: "text",
    title: "The Observation Report",
    reqStory: "path_gemba_normal",
    text: "The all-staff email 'Findings from the Gemba Walk' has arrived. Key finding on IT: 'The employee spends an estimated 40% of his time WAITING for progress bars. Proposal: procure faster bars.' The proposal is meant seriously. The distribution list is the whole company.",
    opts: [
        {
            t: "Agree and turn it into an SSD budget",
            m: 10, l: 5, a: 0, b: -5,
            r: "'Excellent observation. Faster bars require faster storage.' Two days later a budget for SSDs is approved that you have been applying for these two years. There are times when you simply have to accept the language of management as a cipher."
        },
        {
            t: "File the report without comment",
            m: 5, l: 5, a: 0, b: 5,
            r: "The report goes into the folder with the other reports. Already in there are the 'Digitalisation Roadmap 2023' and the concept paper 'The Paperless Office' (18 pages, printed out). Silence is an answer too. The trouble is that the boss remembers it."
        },
        {
            t: "Answer the bar proposal seriously",
            m: 15, l: -5, a: 10, b: 0,
            r: "In a matter-of-fact reply you explain the difference between the display and the cause. It is the politest email of your life on the nature of time. Dr Wichtig replies: 'Understood. Faster causes, then.' You give up. With dignity."
        }
    ]
},
{
    id: "sq_gemba_walk_2b",
    kind: "text",
    title: "Best Practice",
    reqStory: "path_gemba_show",
    text: "Your fake activity has been presented to the board as a 'model example of focused work' - complete with a photograph of you in front of three terminals. Other departments are now to adopt 'the Miller Terminal Principle'. There are already queries about what the Terminal Principle is.",
    opts: [
        {
            t: "Actually deliver the training that has been requested",
            m: 25, l: 10, a: 10, b: 0,
            r: "You train twelve administrative staff in looking impressively busy. Disguised as 'focus techniques' it is the most honest course in company history, because that is precisely what everybody here practises anyway. The feedback forms: outstanding."
        },
        {
            t: "Confess the deception to Dr Wichtig",
            rep: { "Dr. Wichtig": -5 },
            m: 10, l: 0, a: 5, b: 10,
            r: "'That was... theatre?' Dr Wichtig looks stricken at his clipboard, where the model example is written down. 'I showed it to the BOARD, Miller.' Honesty has its price, and the exchange rate against the board is poor just now."
        },
        {
            t: "Let Chantal turn it into a 'deep work format'",
            rep: { "Chantal": 5 },
            m: 10, l: 5, a: 0, b: 0,
            r: "Chantal turns the misunderstanding into a product: 'Deep Work Sessions powered by IT', with a sign-up list and a playlist. People now sit voluntarily in silence in front of screens and call it professional development. Everybody is happy. Nobody is working. Business as usual."
        }
    ]
},
{
    id: "sq_gemba_walk_2c",
    char: "Dr. Wichtig",
    kind: "text",
    title: "The Boss Who Patched",
    reqStory: "path_gemba_patch",
    text: "Dr Wichtig now tells the story of the network cable in every gathering ('It CLICKED, gentlemen'). Now he is in the doorway again: he would like a 'monthly hands-on hour in the infrastructure'. He has already bought his own little screwdriver. He shows it to you.",
    opts: [
        {
            t: "Assign Kevin as his 'patch buddy'",
            rep: { "Kevin": 5 },
            m: 5, l: 5, a: 0, b: 5,
            r: "Kevin and Dr Wichtig, together at the patch panel: an alliance of boundless enthusiasm and no idea whatsoever, in both directions. They get on splendidly. Kevin now calls him 'Doc'. You have either created something wonderful or a monster. Probably both."
        },
        {
            t: "Introduce the hands-on hour",
            rep: { "Dr. Wichtig": 5 },
            m: 20, l: 0, a: 10, b: -5,
            r: "Once a month the CEO plugs in harmless cables under supervision and is afterwards more approachable than ever. Side effect: anyone who watches the boss patching suddenly gets every IT budget waved through. The most expensive hour of the month is also the most profitable."
        },
        {
            t: "Point to the security policy",
            rep: { "Dr. Wichtig": -3 },
            m: 5, l: 5, a: 0, b: 5,
            r: "'Access for certified personnel only, Doctor. Insurance requirement.' He withdraws, disappointed, the little screwdriver still in his hand. You have done the right thing and you still feel as though you had cancelled a child's trip to the zoo."
        }
    ]
},
{
    id: "sq_gemba_walk_2d",
    kind: "text",
    title: "Conspicuously Calm",
    reqStory: "path_gemba_ball",
    text: "The Gemba report has consequences: your recorded calmness has caught HR's attention. 'We are planning a resilience workshop', the email purrs, 'and would love to have you as an internal keynote contributor. What is your secret, Mr Miller?'",
    opts: [
        {
            t: "Politely decline the workshop",
            m: 5, l: 0, a: 5, b: 0,
            r: "'My secret is that I come here to work.' HR finds the answer 'refreshingly authentic' and pencils you in for a future format called 'Radical Honesty'. There is no escaping a workshop here. You only get to choose its title."
        },
        {
            t: "Reveal the secret: the ball",
            loot: "stressball",
            m: 10, l: 0, a: 5, b: 0,
            r: "You present the stress ball. HR is delighted with the 'low-threshold solution' and orders two hundred of them with the company logo on. As keynote contributor you are handed the first one. It squeaks slightly. The old one was better. Now you have two, though."
        },
        {
            t: "Invent a fake framework",
            m: 15, l: 10, a: 0, b: -5,
            r: "You sketch out 'the Miller Method': four quadrants, a cycle diagram, the word 'mindfulness' at strategic points. HR is electrified. There are now slides with your name on them asserting things you made up out of thin air. This is how management methods come about. All of them."
        }
    ]
},

{
    id: "sq_starthilfe",
    kind: "text",
    char: "Markus",
    title: "The Tired Click",
    text: "Out in the car park Markus waves you over, uncharacteristically subdued. His sports car answers the key with nothing but a tired click. 'Battery. COMPLETELY dead. And I have to be at a client in twenty minutes, Miller. TWENTY.' He looks at the car the way you look at a colleague who has betrayed you.",
    opts: [
        {
            t: "'Rescheduling is part of business'",
            rep: { "Markus": -5 },
            next: "path_start_absage",
            m: 5, l: 5, a: 0, b: 0,
            r: "Wrong sentence, wrong man, wrong moment. 'RESCHEDULE?' Markus's voice climbs an octave. 'You do not reschedule a CLOSING!' He runs off to dig up somebody else. You have just insulted a founding principle of his religion."
        },
        {
            t: "Fetch Egon and his jump-start arsenal",
            rep: { "Markus": 5, "Egon": 3 },
            next: "path_start_egon",
            m: 15, l: 5, a: 0, b: 0,
            r: "Egon appears with a jump starter that looks as though it had been stripped out of a submarine. Two movements, one spark, the engine roars. Markus tears out of the yard. Egon watches him go: 'Weren't the battery. The lad drives too many short journeys.' Egon simply knows these things."
        },
        {
            t: "Soberly call him a taxi",
            rep: { "Markus": 3 },
            next: "path_start_taxi",
            m: 5, l: 0, a: 5, b: 0,
            r: "Markus in a taxi is a sight for the history books: a man whose self-image is built on 280 horsepower, in the back of a diesel estate. He makes the appointment. The photograph you did not take would have been priceless."
        }
    ]
},
{
    id: "sq_starthilfe_2a",
    kind: "text",
    title: "The Debt of Honour",
    reqStory: "path_start_egon",
    text: "Markus is back, the deal is closed, and now he wants to 'do something nice for our caretaker colleague'. He holds up a bottle of brandy, expensive, with a ribbon. 'But you know him, Miller. You do the handing over. Man to man. I am not good at... that sort of thing.'",
    opts: [
        {
            t: "Broker the handover with dignity",
            rep: { "Markus": 3, "Egon": 5 },
            m: 10, l: 5, a: 0, b: 0,
            r: "Egon takes the bottle, examines the label with the expression of a customs officer and then nods slowly. 'Drinkable.' It is the highest honour his house has to bestow. Two worlds of men touched for a moment, and you were the interpreter."
        },
        {
            t: "Force Markus to do it himself",
            rep: { "Markus": 5 },
            m: 10, l: 0, a: 5, b: 0,
            r: "'Man to man means yourself, Markus.' He breathes out as though before a client meeting and marches down to the basement. The handover takes four minutes and looks from a distance like a state visit. Afterwards Markus is oddly quiet. 'That man', he says at last, 'has hands like vices. Respect.'"
        },
        {
            t: "Keep out of it",
            m: 2, l: 5, a: 0, b: 0,
            r: "Not your gift, not your ritual. The next day the bottle is standing awkwardly outside the basement door with a Post-it ('Thanks! M.'). Egon takes it in without comment. Whether it was booked as a gift or as lost property you will never learn."
        }
    ]
},
{
    id: "sq_starthilfe_2b",
    char: "Markus",
    kind: "text",
    title: "The Back Seat Revelation",
    reqStory: "path_start_taxi",
    text: "Markus comes back thoughtful. Not triumphant, not furious: thoughtful. 'The taxi driver, Miller. Twelve hours a day the man drives. SEVEN days a week. And he was... content?' He sits down. 'We complain from a fairly comfortable position here, do we not?' A thoughtful Markus is the most unsettling thing this building has to offer.",
    opts: [
        {
            t: "Tell Chantal about the 'taxi mindset'",
            rep: { "Chantal": 3 },
            m: 5, l: 5, a: 0, b: 5,
            r: "Chantal is electrified: 'That is a PURE humility journey!' Two days later a notice goes up: 'Change of Perspective Workshop: A Day in a Taxi (sign up with Marketing)'. The taxi driver, approached as a speaker, has declined. He has to work."
        },
        {
            t: "Have the conversation seriously",
            rep: { "Markus": 5 },
            m: 15, l: 5, a: -5, b: 0,
            r: "The two of you talk for a quarter of an hour about work, meaning and the question of why nobody is simply content any more. Markus listens more than he talks - a first. He stands up at the end of it: 'Good meeting.' He means it. It was the first honest meeting of the year."
        },
        {
            t: "Restore order with a joke",
            rep: { "Markus": 3 },
            m: 5, l: 0, a: 5, b: 0,
            r: "'Anyone who is content does not close, Markus.' He looks briefly baffled - then the relief breaks through: 'TRUE!' He laughs, claps you on the shoulder and is entirely his old self again. You have ended an existential crisis with a bad pun. Somewhere a coach is weeping."
        }
    ]
},
{
    id: "sq_starthilfe_2c",
    char: "Kevin",
    kind: "text",
    title: "The Stand-In Driver",
    reqStory: "path_start_absage",
    text: "Markus has found a driver: Kevin. With the company van. Kevin has had his licence for three weeks. They come back together - the van has a new, long scratch, the pair of them have visibly taken a vow of silence, and the deal fell through anyway. All in all it was not a good outing.",
    opts: [
        {
            t: "Report the scratch properly",
            rep: { "Kevin": -5, "Markus": -5 },
            m: 10, l: 0, a: 5, b: -5,
            r: "You report the damage to fleet management, factually and with a date. It is the right thing to do, and both of them know it. Even so, Kevin and Markus treat you for a week like a change in the weather. Correctness rarely gets applause."
        },
        {
            t: "Have seen nothing",
            m: 2, l: 10, a: 0, b: 5,
            r: "Officially you saw nothing. The scratch was 'always there', as all scratches in this world are. The vow of silence now has three members, and vows of silence with three members statistically last eleven days. The clock is running."
        },
        {
            t: "Have Egon make the scratch disappear",
            rep: { "Egon": 3 },
            m: 10, l: 5, a: 0, b: 0,
            r: "Egon inspects the scratch, fetches polish from an unlabelled tin without a word and makes it disappear in twenty minutes. He asks no questions. He merely adds two names quietly to his inner ledger of debts. Kevin and Markus have no idea what they now owe him. You do."
        }
    ]
},

{
    id: "sq_lichterkette",
    kind: "text",
    char: "Chantal",
    title: "The Mindfulness Corner",
    text: "Something is taking shape in the second-floor corridor: Chantal is draping a string of fairy lights round an armchair, with a sign ('MINDFULNESS CORNER - here you may simply BE') and a scented candle. The fairy lights draw their power from a socket in the opened network cabinet. The floor switch next to it is off. Half the floor is offline. Chantal beams: 'Lovely, isn't it?'",
    opts: [
        {
            t: "Switch back in, fairy lights out",
            rep: { "Chantal": -5 },
            next: "path_licht_hart",
            m: 5, l: 0, a: 5, b: 0,
            r: "You restore the infrastructure. Chantal holds the powerless fairy lights like an injured animal: 'You have killed the energy of this place.' The floor is back online and already complaining about other things. Office ecosystem."
        },
        {
            t: "Build a multi-way adapter compromise",
            rep: { "Chantal": 5 },
            next: "path_licht_deal",
            m: 10, l: 5, a: -5, b: 5,
            r: "Both are running now: switch and atmosphere. The adapter in the network cabinet breaches roughly four policies, and Chantal very nearly hugs you, and the floor notices none of it. Temporary fixes last longest in this building, as is well known."
        },
        {
            t: "A proper permanent solution with cable ties",
            rem: "zip_ties",
            rep: { "Chantal": 3 },
            next: "path_licht_sauber",
            m: 15, l: -5, a: 5, b: -5,
            r: "You run the fairy lights neatly to the nearest office socket, lash everything down with cable ties and lock the network cabinet. The corner glows, the switch runs - and for the first time this corridor has decoration that would survive an electrical inspection."
        }
    ]
},
{
    id: "sq_lichterkette_2a",
    kind: "text",
    title: "The Memorial Service",
    reqStory: "path_licht_hart",
    text: "Chantal has dedicated a story to the departed corner: a photo of the dark fairy lights with the caption 'Some people are afraid of energy. #officevibes #rip'. You are not tagged. Everybody knows all the same. Colleagues look at you in the corridor like a candle-snuffer.",
    opts: [
        {
            t: "Sit it out - stories live 24 hours",
            m: 5, l: 5, a: 5, b: 0,
            r: "You survive the day as 'the one who deleted the vibes'. Next morning the story has gone and the outrage has moved on, to the canteen, which has dropped the rice pudding. The office grapevine has the half-life of a fruit fly. Fortunately."
        },
        {
            t: "Give battery-powered fairy lights as a peace offering",
            rep: { "Chantal": 5 },
            m: 10, l: 0, a: -5, b: 0,
            r: "You hand over an LED string with a battery box: 'Same vibes, zero infrastructure.' Chantal is moved ('So you DO understand!') and rebuilds the corner, this time off the mains. The story gets a happy-ending update. You are tagged. As 'energy saviour'. It is fine."
        },
        {
            t: "Post a dry right of reply",
            m: 5, l: 10, a: 0, b: 5,
            r: "You answer in the company chat with a photo of the floor switch and the caption 'He too may simply BE.' The engineering faction cheers, the feel-good faction does not. You have turned a question of decoration into factions. The corridor now has two opinions and no fairy lights."
        }
    ]
},
{
    id: "sq_lichterkette_2b",
    kind: "text",
    title: "The Temporary Fix Lives",
    reqStory: "path_licht_deal",
    text: "The multi-way adapter in the network cabinet has acquired company: two phone chargers, a USB fan and a lava lamp of unknown origin. The cabinet stands open and somebody is charging an e-bike battery in front of it. Your infrastructure has become a public extension lead.",
    opts: [
        {
            t: "Put up an official charging station",
            m: 20, l: -10, a: 5, b: -5,
            r: "You obtain an extension lead on its own circuit, mount it OPPOSITE the network cabinet and label it: 'Charging Point, Second Floor'. The devices move over voluntarily. People follow infrastructure the way water follows a slope. You only have to build the slope properly."
        },
        {
            t: "Confiscate the lava lamp",
            m: 5, l: 5, a: -5, b: 0,
            r: "By virtue of your office you impound the lava lamp as a 'non-certified heating appliance'. It now stands in the server room. On your desk. It bubbles soothingly. The rest of the temporary fix stays, and it was worth it to you. Some official acts are self-care."
        },
        {
            t: "Rip the lot out and lock the cabinet",
            rep: { "Chantal": -3 },
            m: 10, l: 0, a: 10, b: -5,
            r: "You clear the cabinet out and lock it. The dispossessed grumble, Chantal speaks of 'a step backwards', and the lava lamp stands orphaned in the corridor like a memorial. The switch is on the mains alone again, though, exactly as the electrical plans of 2009 intended."
        }
    ]
},
{
    id: "sq_lichterkette_2c",
    kind: "text",
    title: "The Showcase Corner",
    reqStory: "path_licht_sauber",
    text: "On his way through the building Dr Wichtig has stopped in front of the properly installed mindfulness corner. He inspects the neatly run fairy lights, the locked cabinet, the sign. 'Proactive space design with SYSTEM at last. Who is responsible here?'",
    opts: [
        {
            t: "Say nothing and walk on",
            m: 2, l: 10, a: 0, b: 5,
            r: "Nobody speaks up. Dr Wichtig records the corner as an 'initiative of unclear origin' - and has its own cost centre set up, 'so the project can scale'. There is now a phantom project with a budget and no people in it. It will be the most efficient project of the year."
        },
        {
            t: "Give Chantal the full credit",
            rep: { "Chantal": 5 },
            m: 5, l: 5, a: 0, b: 0,
            r: "'Concept: Marketing. Ms Chantal.' She is appointed 'Feel-Good Officer', small budget included. Her first act in office: a second corner on the ground floor - for which she this time officially asks IT for 'power consultancy'. You have created a process. Out of a string of fairy lights."
        },
        {
            t: "Mention your own work",
            rep: { "Dr. Wichtig": 3 },
            m: 5, l: 0, a: 5, b: -5,
            r: "'Installation: IT.' Dr Wichtig nods his approval: 'An admin with an eye for atmosphere. Rare.' Your name has joined his mental list of 'people who finish things'. That list is a curse and a knighthood at once, and nobody ever gets off it again."
        }
    ]
},

{
    id: "sq_kopierer_karton",
    kind: "text",
    title: "The Box",
    text: "A box the height of a man has stood in the corridor outside the copier room for six weeks: the new copier. Delivered, signed for, never assembled - because 'assembly is not part of the delivery contract', and ever since, an email distribution list with fourteen participants has been clarifying who is responsible. The box now has a nickname and serves as a standing table.",
    opts: [
        {
            t: "Make the box standing table official",
            next: "path_karton_kult",
            m: 5, l: 10, a: -5, b: 0,
            r: "You place two coasters and a sign: 'Meetingpoint K1'. The box is thereby furniture. The company has a new favourite spot, and the copier inside it approaches the end of its warranty in dignified peace."
        },
        {
            t: "Simply assemble the thing yourself",
            loot: "manual",
            next: "path_karton_aufbau",
            m: 25, l: -10, a: 10, b: -5,
            r: "You cut the box open and assemble the copier step by step from the manual inside, which you then pocket - a manual like that is gold dust in this building. The device runs. The responsibility distribution list carries on debating meanwhile. Nobody has noticed that their subject has just disappeared."
        },
        {
            t: "Officially clarify who is responsible",
            next: "path_karton_prozess",
            m: 15, l: 0, a: 10, b: 5,
            r: "You answer the distribution list with a clean responsibility matrix. What follows: three queries, two out-of-office notices and a meeting request for an 'alignment'. The box stays where it is. With a case number now, though."
        }
    ]
},
{
    id: "sq_kopierer_karton_2a",
    kind: "text",
    title: "The Running Proof",
    reqStory: "path_karton_aufbau",
    text: "The old copier finally died a week later - and because the new one has secretly been running for ages, hardly anybody noticed. Only the responsibility distribution list escalates: 'In view of the failure we request accelerated procurement of a THIRD device.' Fourteen people are planning the purchase of a copier while copying their applications on the new one.",
    opts: [
        {
            t: "Ceremonially dissolve the distribution list",
            m: 10, l: -5, a: 10, b: 0,
            r: "You write the last mail of the thread: status, thanks, 'this distribution list is now closed'. It is a small death and a great deliverance. Officially ending an email distribution list feels like slaying a dragon. It happens about as often."
        },
        {
            t: "Bring the distribution list up to date",
            m: 10, l: 0, a: 5, b: 5,
            r: "Your mail ('The device has been running since last week, assembly complete') ends a six-week thread with one paragraph. Fourteen people learn simultaneously that their subject never was one. Three say thank you. One asks who authorised the assembly. It is always that one."
        },
        {
            t: "Say nothing and copy",
            m: 2, l: 10, a: 0, b: 5,
            r: "You say nothing. The application for the third device takes its course through the hierarchy. If it goes through there will be another box in the corridor in six months, and the circle of life begins again. You will be ready then. With coasters."
        }
    ]
},
{
    id: "sq_kopierer_karton_2b",
    kind: "text",
    title: "The Alignment",
    reqStory: "path_karton_prozess",
    text: "The meeting takes place: eight people, one projector, an agenda with the single item 'Copier (box)'. After forty-five minutes the outcome is settled: a follow-up meeting is required. With a wider group of participants. The box was not mentioned once in the entire session.",
    opts: [
        {
            t: "Sit through the madness in full",
            m: 30, l: 10, a: 15, b: 0,
            r: "You experience forty-five minutes of administrative theatre in its purest form, including a slide entitled 'Stakeholder Map: Copier'. You learn nothing new by the end, and you were there, and being there is minuted here. Attendance is the hardest currency in bureaucracy."
        },
        {
            t: "Ask Dr Wichtig for a ruling",
            m: 10, l: 0, a: 5, b: 10,
            r: "You put the case to him in two sentences. He decides in ten seconds: 'The admin assembles it. Done.' The distribution list falls abruptly silent - decisions from above are not debated here, only endured. The admin, incidentally, is you. That was the price of efficiency."
        },
        {
            t: "Assemble it with Kevin during the follow-up meeting",
            rep: { "Kevin": 5 },
            m: 10, l: 5, a: 0, b: 0,
            r: "While eight people discuss the 'Assembly Roadmap' in the follow-up meeting, Kevin and you simply assemble the device in forty minutes. By the time the invitation to the third meeting goes out, the copier is already printing it. Kevin thinks it is 'like a heist movie'. It is hard to argue with that."
        }
    ]
},
{
    id: "sq_kopierer_karton_2c",
    kind: "text",
    title: "Meetingpoint K1",
    reqStory: "path_karton_kult",
    text: "The cult has escalated: Gabi has moved the birthday gatherings to the box, Chantal shoots content there ('so raw, so real'), and somebody has put a potted plant on top. Now the manufacturer emails: the device's warranty expires in a week. Unopened means no inspection, no inspection means no warranty.",
    opts: [
        {
            t: "Forward the manufacturer's mail to the distribution list",
            m: 5, l: 5, a: -5, b: 0,
            r: "You throw the warranty deadline into the responsibility distribution list like a piece of meat and lean back. The escalation is a natural spectacle: 14 people, one deadline, no responsibility. Popcorn would be appropriate. Egon will probably end up assembling it. Wordlessly. At night."
        },
        {
            t: "Assemble it and end the cult",
            m: 25, l: -5, a: 10, b: -5,
            r: "You sacrifice the meeting point to reason. The copier runs, the warranty is secured, the potted plant moves to the windowsill. The company mourns K1 for three days, and then the birthday gatherings simply assemble round the copier. Rituals find their own places."
        },
        {
            t: "Document the waiver and keep the cult",
            m: 5, l: 10, a: 0, b: 5,
            r: "You formally document the 'deliberate waiver of commissioning in favour of site culture'. The company officially decides in favour of a piece of furniture and against a copier it has paid for. One day an auditor will find that note and have a long day."
        }
    ]
},


/* ============================================================
   PHONE MESSAGES (v4.0.0, an addition to the errand wave)
   Three new kind:"phone" events in messenger format: Markus'
   Alpha Circle, Kevin's avalanche of voice messages and Gabi's
   early warning system. In each, one result path sets a flag
   that already has its text follow-up.
   ============================================================ */

{
    id: "sq_phone_alpha",
    char: "Markus",
    kind: "phone",
    appName: "BroChat",
    title: "ALPHA CIRCLE 💪🔥",
    startNode: "root",
    nodes: {
        root: {
            text: "Markus has added you to the group 'ALPHA CIRCLE 💪🔥'.\n\nMarkus: 'Welcome to the inner circle, Miller! In here we share SIGNALS. First rule: up at 05:00. Second rule: nobody talks about the Circle, we only PERFORM.'\n\nSteve_Hustle: 'LFG 🚀🚀🚀'\n\nMarkus: 'Say hello, bro.'",
            opts: [
                { t: "[Mute the group for ever]", next: "mute" },
                { t: "Leave politely, with a reason", next: "exit" },
                { t: "'I am in 💪'", next: "join" }
            ]
        },
        mute: {
            text: "[System: 'ALPHA CIRCLE 💪🔥' has been muted]\n\nThe group produces messages silently from now on. The counter stands at 47 after an hour. Nobody notices your silence - in the Alpha Circle everybody only listens to themselves anyway.",
            opts: [
                { t: "Carry on working, satisfied [System: close chat]", next: "end_mute" }
            ]
        },
        exit: {
            text: "You: 'Thanks Markus, but groups with a flame emoji are not for me. Best of luck to you all!'\n\n[System: you have left the group]\n\nMarkus (private): 'Respect. Honest feedback. Not everyone is ready for the Circle. 💪 No worries, bro.'",
            opts: [
                { t: "'No worries, Markus.' [System: close chat]", next: "end_exit" }
            ]
        },
        join: {
            text: "Markus: 'I KNEW it! 🔥'\n\nSteve_Hustle: 'Welcome Bro 🚀'\n\nMarkus: 'First SIGNAL comes tomorrow at 05:00. Be ready.'\n\nYou are a member of a group whose purpose you do not know, with people you do not know, and an alarm clock you will not be setting.",
            opts: [
                { t: "'Ready. 💪' [System: put the phone down]", next: "end_join" }
            ]
        }
    },
    results: {
        end_mute: {
            txt: "The most elegant solution of the digital age: being there without being there. The group believes you are reading along. You believe you have peace. Both sides are happy and neither is right.",
            m: 5, l: 5, a: -5, b: 0
        },
        end_exit: {
            txt: "A clean exit with your head held high. Markus respects plain speaking more than agreement - that is the paradox of his profession. In the Circle your departure is discussed as a 'beta move'. By four people. At five in the morning.",
            rep: { "Markus": 3 },
            m: 5, l: 0, a: 5, b: 0,
            rep: { "Markus": 5 }
        },
        end_join: {
            txt: "That makes you an official Alpha. What it means you will discover tomorrow at five on the dot, when your phone vibrates. And the day after. And every day after that. The Circle never forgets.",
            rep: { "Markus": 5 },
            m: 5, l: 5, a: 0, b: 0,
            next: "path_alpha_member"
        }
    }
},
{
    id: "sq_alpha_2a",
    kind: "text",
    title: "The 05:00 Signal",
    reqStory: "path_alpha_member",
    text: "It has come to pass: your phone vibrates on every hour. The SIGNAL is always a photo of Markus in the gym with a slogan attached ('While you sleep, your competition trains'). Just now there were two photos. The Circle is scaling.",
    opts: [
        {
            t: "Finally mute the group",
            m: 2, l: 5, a: -5, b: 0,
            r: "Three weeks too late, and the silence is heavenly. Markus will never learn that his signals are transmitting into the void - in the Circle a missing reply counts as 'grind mode'. That makes you an official grinder. In your sleep."
        },
        {
            t: "Send a counter-signal at 04:30",
            rep: { "Markus": 5 },
            m: 10, l: 5, a: -5, b: 0,
            r: "You send a photo of the overnight server monitoring with the slogan 'While you train, your IT patches'. The Circle explodes with reverence. Markus appoints you 'Tech Alpha'. You have not left the game. You have taken it over."
        },
        {
            t: "Switch the phone off completely at night",
            m: 2, l: 5, a: 0, b: 5,
            r: "No signal, no vibration, sleep at last. Your phone is also the on-call number, though - if a server really does burn one night, it now rings nowhere. You have traded Markus for a residual risk. The rate looks fair. For now."
        }
    ]
},

{
    id: "sq_phone_kevin_voice",
    char: "Kevin",
    kind: "phone",
    appName: "WhatsApp",
    title: "Kevin (Apprentice)",
    startNode: "root",
    nodes: {
        root: {
            text: "Kevin: [Voice message 0:47]\n\nKevin: [Voice message 1:12]\n\nKevin: [Voice message 0:58]\n\nKevin: 'oh and'\n\nKevin: [Voice message 1:35]\n\nTotal length: 4 minutes 32 seconds. Subject: unknown. Urgency: unknown. It could be anything, from 'printer is beeping' to 'server room on fire'.",
            opts: [
                { t: "[Listen to all four messages]", next: "listen" },
                { t: "'WRITE. IT. DOWN. PLEASE.'", next: "schreib" },
                { t: "[Listen at double speed]", next: "speed" }
            ]
        },
        listen: {
            text: "Four and a half minutes later you know: Kevin's journey to work this morning, his mate's opinion on energy drinks, an anecdote about his neighbour - and right at the end, in passing: 'oh yeah and my screen is well weird.' That is the sum total of the technical information. 'Weird.'",
            opts: [
                { t: "'I will come over.' [System: close chat]", next: "end_listen" }
            ]
        },
        schreib: {
            text: "Kevin: [Voice message 0:21]\n\nHe has answered the request to write with a voice message. Contents: 'okay sorry, so, writing, yeah, so it is about my screen, it is...' - the message breaks off.\n\nKevin: [Voice message 0:44]",
            opts: [
                { t: "[Capitulate and listen]", next: "end_kapit" },
                { t: "[Simply ring him]", next: "end_anruf" }
            ]
        },
        speed: {
            text: "At double speed Kevin sounds like an excitable squirrel with opinions about energy drinks. The technical information at the end is identical: the screen is 'weird'. You have saved two minutes and sixteen seconds and learned nothing all the same.",
            opts: [
                { t: "'Weird HOW, Kevin?' [System: close chat]", next: "end_speed" }
            ]
        }
    },
    results: {
        end_listen: {
            txt: "You go over. The screen is 'weird' because the brightness is at minimum - probably for days, probably thanks to Kevin himself. Two key presses. Kevin is overwhelmed: 'YOU are honestly the best.' Four and a half minutes of audio for two seconds of solution. The balance sheet of apprentice support.",
            m: 10, l: 0, a: 10, b: 0,
            rep: { "Kevin": 5 },
            next: "path_kevin_tutorial"
        },
        end_kapit: {
            txt: "So you listen to it all after all. The problem: screen brightness at minimum. The fix takes less time than the shortest of his voice messages. You solve it remotely, without a word. Silence can be the last language left.",
            m: 10, l: 5, a: 10, b: 0,
            rep: { "Kevin": -5 }
        },
        end_anruf: {
            txt: "Revolutionary technology: the telephone call. Forty seconds of conversation settle what four and a half minutes of audio could not. Screen brightness, minimum, two keys, done. Kevin is impressed: 'Wild, phoning is well efficient.' A generation discovers the wheel.",
            m: 5, l: 0, a: 5, b: 0
        },
        end_speed: {
            txt: "Kevin's reply arrives promptly: [Voice message 1:07]. You give up, go over and turn up the screen brightness that he turned down himself. On the way back you resolve to mention voice messages in the IT policy. Right after the ban on coffee over keyboards.",
            m: 10, l: 5, a: 5, b: 0
        }
    }
},
{
    id: "sq_kevin_voice_2a",
    char: "Kevin",
    kind: "text",
    title: "The Tutorial",
    reqStory: "path_kevin_tutorial",
    text: "Kevin wants to return the favour and has 'recorded a tutorial so you can send it to the others': a single voice message, nine minutes long, about setting screen brightness. Intro included ('Yo, this is Kevin from IT') and sign-off ('Peace').",
    opts: [
        {
            t: "Write the tutorial up in the wiki",
            rep: { "Kevin": 5 },
            m: 15, l: -5, a: 5, b: 0,
            r: "You type Kevin's nine minutes into five sober wiki sentences and put him down as co-author. It is the first article in the IT wiki at all. Kevin prints it out and hangs it over his bed, you suspect. 'Kevin from IT' has a legacy now."
        },
        {
            t: "Offer Chantal the format as 'voice content'",
            rep: { "Chantal": 3 },
            m: 5, l: 5, a: 0, b: 5,
            r: "Chantal is delighted: 'IT to LISTEN to! So approachable!' She plans a series: 'Tech Talk with Kevin', every Friday. You have turned a problem into a format and Kevin into a podcaster. The company will love it. Nobody will check whether the content is correct."
        },
        {
            t: "Archive it without comment",
            m: 2, l: 5, a: 0, b: 0,
            r: "The file goes into a folder called 'Kevin_Audio' that will one day be a significant historical document. Kevin asks twice whether you have 'sent it round yet'. You answer truthfully: 'It is secured.' Every word of that is true."
        }
    ]
},

{
    id: "sq_phone_gabi_intel",
    char: "Gabi",
    kind: "phone",
    appName: "Messages",
    title: "Gabi (Reception)",
    startNode: "root",
    nodes: {
        root: {
            text: "Gabi: 'Just so you know: the boss is in SUCH a mood today.'\n\nGabi: 'Meeting at 14:00 about IT costs. The finance director is bringing a list.'\n\nGabi: 'You are not invited.'\n\nGabi: 'Not yet. 🙃'",
            opts: [
                { t: "'What exactly do you know?'", next: "info" },
                { t: "'Can you get me in there?'", next: "rein" },
                { t: "'Thanks. I would rather not know.'", next: "end_ruhe" }
            ]
        },
        info: {
            text: "Gabi: 'Item 1 is the new coffee machine (do not ask).'\n\nGabi: 'Item 2 the travel expenses from Sales.'\n\nGabi: 'Item 3 is you. Verbatim: \"Cost centre IT - action required\".'\n\nGabi: 'You have until 14:00. 🙃'",
            opts: [
                { t: "[Gather figures and receipts at once]", next: "end_prep" },
                { t: "[Wait and see, it will come to nothing]", next: "end_warten" }
            ]
        },
        rein: {
            text: "Gabi: 'I cannot invite you.'\n\nGabi: 'BUT: nobody is down to take the minutes at 14:00. I manage the list. 🙃'\n\nGabi: 'Do you really want to sit in a meeting that is about you - as the one writing it down?'",
            opts: [
                { t: "'Put me down.'", next: "end_protokoll" },
                { t: "'No. Actually no. Forget it.'", next: "end_kneifen" }
            ]
        }
    },
    results: {
        end_ruhe: {
            txt: "Gabi: 'Ok. Good luck at 14:00. 🙃' - The smiley is working. You try to carry on. From 13:30 you look at the clock every five minutes. Not knowing is only a more strenuous form of waiting.",
            m: 2, l: 5, a: 5, b: 5
        },
        end_prep: {
            txt: "Two hours of concentrated preparation: cost breakdown, outages avoided, the value of every server. At 13:55 you put a one-page summary in the meeting room unasked - on every seat. Item 3 is deferred at 14:20, 'as transparency evidently already exists'. Gabi's warning was worth its weight in gold.",
            m: 20, l: -10, a: 10, b: -5,
            rep: { "Gabi": 3 }
        },
        end_warten: {
            txt: "You wait and see. At 14:40 the email arrives: 'Please submit a detailed breakdown of all IT costs for the last 24 months by Friday.' The meeting decided about you without you. That is how meetings you do not attend work.",
            m: 2, l: 10, a: 0, b: 10
        },
        end_protokoll: {
            txt: "Gabi: 'Done. 14:00, Conference Room 1. Bring a pen, it looks more genuine. 🙃' - That makes you the official minute-taker of a meeting about your own abolition. There are worse seats in the house.",
            m: 5, l: 0, a: 5, b: 0,
            rep: { "Gabi": 5 },
            next: "path_intel_protokoll"
        },
        end_kneifen: {
            txt: "Gabi: 'Understood. 🙃' - Three smileys in one chat is a statement where Gabi is concerned. You will never learn what was discussed at 14:00. Or rather: you will learn it from Gabi, tomorrow, in the version with embellishments.",
            m: 2, l: 5, a: 0, b: 5
        }
    }
},
{
    id: "sq_intel_2a",
    kind: "text",
    title: "The Minute-Taker",
    reqStory: "path_intel_protokoll",
    text: "14:00, Conference 1. The finance director holds forth on 'Cost centre IT - action required', using figures from 2023. Nobody at the table knows that the man with the pen writing it all down is the cost centre in person. You hold the one position in the room that nobody suspects and everybody quotes.",
    opts: [
        {
            t: "Reveal yourself as the party concerned",
            m: 10, l: 0, a: 5, b: 10,
            r: "'As minute-taker and cost centre I should like to note...' The room freezes. The finance director speaks of 'a conflict of interest', Dr Wichtig of 'unconventional, but brave'. The meeting ends without result, and you are on two lists now: the finance director's and the boss's mental one. Only one of them is good."
        },
        {
            t: "Take creative minutes",
            m: 10, l: 10, a: 0, b: 5,
            r: "'Item 3 was appreciated controversially and recommended for further observation.' Not a word of it is untrue, none of it means anything. The minutes pass every stage unchallenged. You have used administrative language as a cloak of invisibility. Ms Elster would have noticed. The finance director is not Ms Elster."
        },
        {
            t: "Take neutral minutes and quietly correct the figures",
            m: 20, l: -5, a: 10, b: -10,
            r: "You minute every statement correctly - and add the current figures in brackets ('Note from the minutes: 2026 figures differ'). The minutes go to everybody, Dr Wichtig included. The notes work like a silent advocate. Item 3 dies quietly of the facts in the next session."
        }
    ]
},


/* ============================================================
   TRAPS (v4.0.0): out in the corridor, decency is the most
   expensive reflex. No free way out.
   ============================================================ */

{
    id: "sq_falle_tuer",
    kind: "text",
    title: "The Held Door",
    text: "You are going through the security door into the office wing when somebody comes hurrying up behind you with his hands full: suit, briefcase, friendly nod, no visible pass. Decency says: hold it. The security training says: never. Both say it very loudly.",
    opts: [
        {
            t: "Let the door fall shut - rules are rules",
            m: 2, l: 0, a: 10, b: 5,
            r: "The door clicks shut, the gentleman stands in front of it and rings the bell. It is the new finance director, second day at work, pass still with HR. He is correctly let in, correctly greeted and correctly memorises a face. Yours. You did everything right. It helps not at all."
        },
        {
            t: "Politely ask to see his pass",
            m: 5, l: 0, a: 10, b: 0,
            r: "The textbook route, performed live: 'Could I just see your pass?' The moment freezes. What follows is awkward rummaging, a justification, your apology for asking, his apology for rummaging - two minutes of social close combat. Security has won. It was pleasant for nobody."
        },
        {
            t: "Hold the door - decency is decency",
            m: 2, l: 0, a: 5, b: 35,
            r: "The gentleman thanks you charmingly. Twenty minutes later he introduces himself to the department: external security auditor, and his first finding is already settled - 'access without pass check, granted by a member of IT, of all people'. The words 'of all people' will be italicised in the report."
        }
    ]
},
{
    id: "sq_falle_kuchen",
    kind: "text",
    title: "Cake in the Corridor",
    text: "On the corridor table outside the meeting rooms: an untouched cake platter, thirty slices, immaculate. Beside it a handwritten note: 'Help yourselves! :)'. No name, no occasion. Thirty slices of cake do not ask where they came from. You might.",
    opts: [
        {
            t: "Establish first whose cake it is",
            m: 10, l: 0, a: 5, b: 5,
            r: "You ask your way through three offices. Nobody knows anything, but everybody thinks it is good 'that somebody is taking care of it for once' - and with that you are precisely that: the one in charge of the cake. The secretariat later hands you the clarification of the catering mix-up 'since you are involved anyway'. You wanted a slice of cake. You have a matter."
        },
        {
            t: "Help yourself - that is what it is there for",
            m: 2, l: 5, a: 5, b: 25,
            r: "You take a slice. It is excellent. It is also the catering for the board meeting in Room 1, put down in the wrong place - the note belonged to a platter eaten bare yesterday. When the secretariat carries the opened platter in, exactly one slice is missing, and evidence is stuck to the corner of an admin's mouth."
        },
        {
            t: "Resist and walk on",
            m: 2, l: 5, a: 10, b: 0,
            r: "Discipline. You walk past, and the cake comes with you - in your head, for the rest of the morning. On your next trip down the corridor the platter is empty but for crumbs and the derisive note. Somebody had less character and more cake. The balance feels wrong."
        }
    ]
},
{
    id: "sq_falle_meeting",
    kind: "text",
    title: "Only Very Briefly",
    text: "The door of Room 2 stands open, inside something is under way with a projector. As you pass, somebody waves you in: 'Miller! Perfect! Just very briefly your assessment of one thing, takes two minutes.' Seven faces turn towards you. The door is still open. Still.",
    opts: [
        {
            t: "Pop in briefly - two minutes is nothing",
            m: 30, l: 0, a: 20, b: 10,
            r: "The two minutes are over after forty. Your 'assessment' is now on a slide, in the minutes you are listed under 'specialist party involved', and on the way out somebody says the deadliest sentence in office life: 'We will put you down for the follow-up meeting, then.' The door was a trapdoor."
        },
        {
            t: "'I am on my way to an appointment.'",
            m: 2, l: 5, a: 0, b: 10,
            r: "The white lie lands - until your eye brushes the table as you walk on: at the head of it sits Dr Wichtig, who knows perfectly well that there is nothing in your calendar today, because he looked at it this morning. He says nothing. He makes a note. Men like him never forget appointments that never existed."
        },
        {
            t: "'Send it to me in writing and I will look at it'",
            m: 2, l: 5, a: 10, b: 0,
            r: "Smoothly delegated - or so you thought. The email arrives at 16:41: fourteen attachments, three question sets and the phrase 'as discussed, by tomorrow morning'. Nothing was ever discussed. It says so now, though, in writing, with you in the recipient field. You asked for it in writing. It came."
        }
    ]
},
{
    id: "sq_falle_pflanze",
    kind: "text",
    title: "The Thirsty Plant",
    text: "On the windowsill on the second floor a large-leaved houseplant is dramatically letting its leaves droop. The soil is bone dry. No watering can in sight, but the kitchenette is two doors along. Somebody must surely take care of it.",
    opts: [
        {
            t: "Not your area - walk on",
            m: 2, l: 5, a: 5, b: 5,
            r: "Responsibility is a fortress and you stay inside yours. Two days later a notice goes up on the windowsill: 'Who watched this plant die of thirst and did NOTHING?' - with a photo of the dead plant in the style of a missing-person notice. The corridor has a new topic of conversation, and you were demonstrably the last one at the scene."
        },
        {
            t: "Report it properly to Facilities Management",
            m: 5, l: 0, a: 5, b: 5,
            r: "You report a thirsty plant via the official form. The system's answer: 'Matter FM-4471 created, category: plant care, processing in 3-5 working days.' A colleague's all-staff reply, sent to everybody by accident: 'He raises TICKETS for PLANTS now. PLANTS.' The corridor laughs for a week. The plant, incidentally: long gone."
        },
        {
            t: "Fetch water and give it a thorough soaking",
            m: 5, l: 0, a: 25, b: 10,
            r: "Mercy with side effects: the outer pot has no hole, but the saucer has a crack - the water finds the windowsill, the windowsill finds the extension lead underneath. And the plant belongs, as emerges while mopping up, to Ms Elster, who has been documenting the 'controlled dry phase' of her orchid for three weeks. You have watered an experiment."
        }
    ]
},

/* ============================================================
   FINDS WITH CONSEQUENCES (v4.0.0)
   Duct tape, headphones and the admin password are asked for
   often and found rarely. These events create supply - and each
   sends someone after it who wants their property back. Hand it
   over and you stay clean. Keep it and you have the tool and a
   problem.
   ============================================================ */

{
    id: "sq_handwerker_wagen",
    kind: "text",
    title: "The Open Tool Trolley",
    text: "In the stairwell stands a contractor's tool trolley, unattended, the top drawer open. Inside: three rolls of duct tape, brand new, still in their wrapping. The workmen are somewhere on the third floor arguing loudly about screed.",
    opts: [
        {
            t: "Push the drawer shut and walk on",
            m: 5, l: 0, a: 5, b: -5,
            r: "You push the drawer shut and walk on. No tape, no problem, no story. Later you will be standing at a jammed cable duct thinking about exactly those three rolls."
        },
        {
            t: "Take one roll",
            loot: "tape",
            next: "path_tapeklau_ja",
            m: 5, l: 5, a: 0, b: 5,
            r: "The roll goes into your pocket before you have finished thinking. Duct tape in this building is not a commodity but a currency, and you have just had a favourable exchange rate. The screed continues to be discussed."
        },
        {
            t: "Go and ask - they are upstairs after all",
            next: "path_tapeklau_fragen",
            m: 15, l: -5, a: 5, b: 0,
            r: "Two floors up, wait until the screed question is settled, then ask. The foreman looks at you like a rare animal - somebody who asks - and presses two rolls into your hand. 'Take two while you are here. Otherwise you will only be back.'"
        }
    ]
},
{
    id: "sq_handwerker_wagen_2a",
    kind: "text",
    title: "The Foreman",
    reqStory: "path_tapeklau_ja",
    text: "A man in a hi-vis vest is in your doorway, clipboard in hand, friendly but very firm. 'Mate. I have a camera in the stairwell and a materials docket that does not add up.' He is not looking at you but at your desk, where the roll is lying.",
    opts: [
        {
            t: "Hand the roll back and apologise",
            rem: "tape",
            m: 10, l: 0, a: 5, b: -5,
            r: "You hand it back and apologise without an excuse. The foreman nods slowly. 'Happens. Next time you ask.' He leaves without reporting it, and you have learned a lesson about how cheap honesty would have been."
        },
        {
            t: "Deny it - tape all looks the same",
            rep: { "Dr. Wichtig": -5 },
            m: 10, l: 5, a: 10, b: 20,
            r: "'That is mine, it only looks like that.' The foreman says nothing further, turns round and goes straight to the boss's office. After a contractor's complaint about missing materials, nobody asks about details any more. It is only about you after that."
        },
        {
            t: "Buy your way out with coffee and a listening ear",
            m: 20, l: -5, a: -10, b: 0,
            r: "You offer coffee and listen to twenty minutes of the screed story, including site management, the schedule and a colleague named Ferhat who 'simply does not think ahead'. You get to keep the roll at the end. He only wanted somebody to listen to him."
        }
    ]
},
{
    id: "sq_kopfhoerer_fund",
    kind: "text",
    title: "The Headphones in the Meeting Room",
    text: "In Room 2 a pair of high-quality over-ear headphones is lying on the table. The room was booked to an external consultant this morning who left long ago. No name, no note, no lost property office - this building has no lost property office, it only has drawers.",
    opts: [
        {
            t: "Pocket them. Anyone who forgets them does not need them.",
            loot: "headphones",
            next: "path_kopfhoerer_behalten",
            m: 5, l: 5, a: -5, b: 5,
            r: "They are comfortable, they muffle, and they will probably save your afternoon. Right at the back of your mind sits the quiet voice reminding you that 'forgotten' does not mean 'thrown away'."
        },
        {
            t: "Hand them in to Gabi at reception",
            rep: { "Gabi": 5 },
            next: "path_kopfhoerer_abgeben",
            m: 10, l: -5, a: 0, b: -5,
            r: "Gabi takes them, notes the room and the time and puts them in the drawer that officially does not exist. 'If she has not been in touch by Friday', she says in passing, 'we will talk again.' Gabi is the one institution in this building that works."
        },
        {
            t: "Leave them. Not your room.",
            m: 2, l: 10, a: 5, b: 0,
            r: "You leave them and close the door. The next morning they have gone, and nobody knows where. In a building with three hundred people, doing nothing is also a decision about who gets it."
        }
    ]
},
{
    id: "sq_kopfhoerer_fund_2a",
    kind: "text",
    title: "The Consultant Comes Back",
    reqStory: "path_kopfhoerer_behalten",
    text: "In the afternoon a woman in a business suit is standing at your desk. 'Excuse me - reception said you had business in Room 2 this morning?' Her eye travels to the headphones next to your keyboard. They are unmistakably hers. She does not say so. She only looks.",
    opts: [
        {
            t: "Be honest and ask for a stay of execution",
            m: 15, l: -5, a: -10, b: 0,
            r: "You admit that you pocketed them and ask whether you may keep them until clocking-off time - open-plan office, headaches, you understand. She laughs, surprised, and says yes. Honesty is so rare in this building that it comes across as a trick."
        },
        {
            t: "Hand them over at once: 'They were there, I wanted to secure them'",
            rem: "headphones",
            m: 5, l: 0, a: 0, b: -5,
            r: "You pass them across the desk before the sentence is finished. She smiles professionally: 'Thank you for securing them.' You both know what 'secured' means. You both leave it there. That is how diplomacy works."
        },
        {
            t: "Stay clueless and look away",
            rep: { "Dr. Wichtig": -5 },
            m: 10, l: 10, a: 5, b: 20,
            r: "'Headphones? No, no idea.' She looks at the desk for another two seconds, says 'No problem' amiably and goes. Her closing report to Management later contains a paragraph on 'observations regarding the corporate culture'. Only one. It is enough."
        }
    ]
},


{
    id: "sq_schacht_2",
    kind: "text",
    title: "The Basement Stairs",
    reqStory: "path_schacht_1",
    text: "On the way to the archive you run into Egon at the basement stairs. He heaves a box up the steps, puts it down and gets his breath. 'That stuff down there', he says, jerking a thumb behind him, 'it keeps coming back up. However often you take it down.'",
    opts: [
        {
            t: "Ask what is in the box",
            next: "path_schacht_2",
            m: 10, l: 0, a: 5, b: 0,
            r: "'Files. From back then.' He says no more, but as he leaves there is a postscript over his shoulder: 'The question is not what is in it. The question is when.' You stand there rooted to the spot. That is the line. That is word for word THE line from the title sequence."
        },
        {
            t: "Lend a hand",
            rep: { "Egon": 5 },
            next: "path_schacht_2",
            m: 15, l: -5, a: 0, b: -5,
            r: "The two of you carry the box up together. At the top Egon says: 'See. The cellar gives nothing up without wanting something back.' You stop on the top step. That is word for word a line from episode three. Word for word. There is no possible way he watches the series. Is there?"
        },
        {
            t: "Walk past, you have things to do",
            m: 5, l: 5, a: 0, b: 0,
            r: "You nod as you pass and carry on to the archive. Egon puffs his way up the stairs behind you. A caretaker with a box, that is all there is to it, and there are genuinely enough real mysteries in this building."
        }
    ]
},


{
    id: "sq_handwerker_wagen_2b",
    kind: "text",
    title: "The Favour Returned",
    reqStory: "path_tapeklau_fragen",
    text: "The foreman is in your doorway, same hi-vis vest, same clipboard - but embarrassed this time. 'Mate. You are the computer bloke, right.' He holds up a tablet on which the site management app has been showing the same error message since this morning. 'Ferhat says it is the Wi-Fi. Ferhat says a lot of things.'",
    opts: [
        {
            t: "Decline politely: outside device, not your remit",
            m: 5, l: 5, a: 5, b: 0,
            r: "Formally entirely correct: contractor, contractor's device, no jurisdiction. He nods and withdraws. The two rolls of tape were still a gift in your drawer, and he knows that too. Some accounts stay open without anybody sending an invoice."
        },
        {
            t: "Pass it to Kevin - he likes the practice",
            rep: { "Kevin": 3 },
            m: 5, l: 10, a: 0, b: 0,
            r: "Kevin falls on the tablet like a birthday present and solves the problem in twelve minutes, ten of which consist of talking. The foreman listens patiently. Both are thoroughly satisfied afterwards, and you actually did some work in the time."
        },
        {
            t: "Have a quick look - tape is tape",
            rep: { "Egon": 3 },
            m: 15, l: -5, a: 0, b: -5,
            r: "The app had simply latched on to the guest Wi-Fi. Two minutes, done. The foreman is so grateful that he writes down his number for you: 'If you ever need anything. Materials, tools, whatever.' Egon hears about it the same day and nods his approval. Relations with tradesmen are the harder currency in this building."
        }
    ]
},
{
    id: "sq_kopfhoerer_fund_2b",
    kind: "text",
    title: "Friday Is a Long Way Off",
    reqStory: "path_kopfhoerer_abgeben",
    text: "Gabi waves you over to reception. The headphones are on the counter in front of her. 'The lady got in touch. She is not back until next month and said whoever found them should keep them.' She pushes them towards you. 'I said I would ask around. I did not say who.'",
    opts: [
        {
            t: "Put them on the lost property shelf where they belong",
            m: 10, l: -5, a: 5, b: 0,
            r: "You insist that they go on the shelf. Gabi sighs and puts them back in the drawer. Three weeks later they have gone, and nobody knows where. Correctness has a frighteningly short half-life in this building."
        },
        {
            t: "Accept them. Honesty lasts longest.",
            loot: "headphones",
            rep: { "Gabi": 3 },
            m: 5, l: 0, a: -5, b: 0,
            r: "You take them and know perfectly well that you are only allowed to keep them because you handed them in. That is the kind of justice that does not actually occur in this building. Gabi winks and answers the phone. She has been proved right again."
        },
        {
            t: "Gabi should keep them",
            rep: { "Gabi": 10 },
            m: 5, l: 0, a: -5, b: 0,
            r: "'Keep them, you sit out here in the noise.' Gabi looks at you as though you had proposed marriage, and then says only: 'Very well then.' From that day on you hear things two days before anybody else does. Some investments pay out in information."
        }
    ]
},


    {
        id: "sq_zettel_monitor",
        reqStory: "path_pw_verraten",
        kind: "text",
        title: "The Note",
        text: "On your way to the copier you pass the project office. There is a yellow note stuck to Ms Özdemir's monitor. The writing is perfectly legible, even from two metres away.\n\nIt is the root password. The desk stands next to the meeting table where a client is sitting this afternoon.",
        opts: [
            {
                t: "Take the note down and change the password",
                m: 40, l: -20, a: 10, b: -20,
                rep: { "Frau Elster": 5 },
                r: "You take the note with you and change the password on every affected system. It takes forty minutes and is the only route that really ends the matter. Ms Özdemir will be puzzled tomorrow and will ring you."
            },
            {
                t: "Only take the note",
                m: 5, l: 5, a: 0, b: 10,
                r: "The note has gone, the password has not. She has memorised it by now, and so has whoever read it in passing. You have removed a symptom and felt better for it."
            },
            {
                t: "Ask her to remove it herself",
                m: 15, l: -5, a: 10, b: -5,
                r: "In three sentences you explain why a password on a monitor is no longer a password. She takes the note down, apologises and writes it in her notebook. The notebook lies open on the desk."
            },
            {
                t: "Simply walk on",
                m: 2, l: 15, a: 0, b: 15,
                r: "You walk on. The note stays up until Friday. Probably nothing happens, in the way that probably nothing happens with most things of this kind, until one day something does."
            }
        ]
    },
    {
        id: "sq_maus_falle",
        reqStory: "path_maus_hof",
        char: "Egon",
        kind: "text",
        title: "In the Courtyard",
        text: "On the way to the skip you find Egon standing in the courtyard, contemplating two live traps. Both are empty, both baits are gone.\n\n'They are cleverer than Sales', he says without looking up.",
        opts: [
            {
                t: "Suggest better bait",
                m: 10, l: 0, a: -5, b: 0,
                rep: { "Egon": 5 },
                r: "You suggest peanut butter instead of cheese, because that is what the internet says. Egon thinks it is silly and tries it anyway. The next morning there is a mouse in the trap and Egon says not one word about who was right."
            },
            {
                t: "Give Egon your chocolate as bait",
                rem: "chocolate",
                m: 10, l: 0, a: -10, b: 0,
                rep: { "Egon": 5 },
                r: "He breaks a piece off, puts it in the trap and the rest in his breast pocket. Both portions serve their purpose. Your bar has gone and the courtyard is a peaceful place for ten minutes."
            },
            {
                t: "Work out with him where they are getting in",
                m: 25, l: -10, a: -5, b: -10,
                rep: { "Egon": 10 },
                r: "The two of you walk the facade and find the spot: a ventilation grille behind the paper skip, loose for years. Egon screws it down. It is the first problem in weeks that is genuinely finished as a result."
            },
            {
                t: "Walk on, it is not your subject",
                m: 5, l: 5, a: 0, b: 5,
                rep: { "Egon": -5 },
                r: "You walk past. Egon says nothing, but he looks up. With him that is the most elaborate form of disappointment there is."
            }
        ]
    },
    {
        id: "sq_bernd_schreibtisch",
        reqStory: "path_bernd_rechner",
        kind: "text",
        title: "A Desk Is Cleared",
        text: "In Sales the new colleague is standing at Bernd's old desk. Two boxes, a hole punch, a coffee mug with a football crest, a photograph.\n\n'I am supposed to tidy up here. But the machine is on, and there are all sorts of files on it that are not mine.'",
        opts: [
            {
                t: "Let him decide for himself",
                m: 10, l: 10, a: 0, b: 10,
                rep: { "Frau Elster": -10 },
                r: "You tell him to delete whatever he does not need. He deletes thoroughly. Two weeks later Accounts is looking for a breakdown that existed exactly once, and that was on this machine."
            },
            {
                t: "Back the data up and rebuild the machine",
                m: 45, l: -25, a: 5, b: -20,
                rep: { "Frau Elster": 10, "Markus": 5 },
                r: "You pull Bernd's files onto a network drive, document the process and rebuild the device cleanly. Half the afternoon has gone, and in return the workplace now belongs to somebody."
            },
            {
                t: "Only swap the login over",
                m: 20, l: -10, a: 0, b: -5,
                r: "New account, old machine, old files. It is quick, it works, and in six months somebody will ask why Bernd's tax papers are sitting in a Sales folder."
            },
            {
                t: "Set the box of personal things aside",
                m: 15, l: -5, a: 5, b: -5,
                r: "You pack the mug, the photograph and the hole punch into one of the boxes and write Bernd's name on it. The box then stands in the stores for eight months. It is never collected, and it is never thrown out either."
            }
        ]
    },
    {
        id: "sq_alufolie_einkauf",
        reqStory: "path_folie_bleibt",
        kind: "text",
        title: "A Visit to Purchasing",
        text: "Purchasing looks like a kitchen just before Christmas: three routers are wrapped in kitchen foil, neatly folded, edges turned over.\n\nThree people look at you expectantly. One is holding the roll ready just in case.",
        opts: [
            {
                t: "Run a cable and forget the Wi-Fi",
                rem: "cable",
                m: 30, l: -15, a: -5, b: -15,
                r: "You run a network cable across the office and fix it down with the rest of your tape. Purchasing is online, the foil may stay, and everybody is content. Your spare cable has gone."
            },
            {
                t: "Unwrap them and explain why",
                m: 25, l: -10, a: 15, b: -10,
                r: "You unwrap them and explain that metal shields radio signals and that this is precisely why there is no Wi-Fi. Two nod, one says: 'But it is safer that way, though, is it not?' There is no answer to that which helps."
            },
            {
                t: "Trade the foil for distance",
                m: 20, l: -5, a: 0, b: -10,
                r: "You offer to put the devices on a wall bracket, away from the desks. That is safe enough for them, the Wi-Fi runs again, and all three regard it as a compromise. It is not one, and it looks like one."
            },
            {
                t: "Make Mr Tinfoil the point of contact",
                m: 15, l: 10, a: -10, b: 10,
                r: "You declare him 'officer for shielding matters in Purchasing'. He takes the task very seriously, unwraps everything again with his own hands in order to 'inspect it properly', and has since rung you only once a week."
            }
        ]
    },
    {
        id: "sq_westfluegel_heizung",
        reqStory: "path_heizluefter",
        char: "Egon",
        kind: "text",
        title: "The West Wing",
        text: "It is cold enough in the west wing to see your breath. Under three desks three fan heaters hum away, all on the same extension lead, all on setting two.\n\nThe lead is warm. Warmer than the radiators.",
        opts: [
            {
                t: "Collect the heaters in",
                m: 15, l: -5, a: 20, b: -10,
                r: "You carry three fan heaters out of the west wing and earn three very clear opinions. Formally it is right: the lead was a fire load. Humanly it feels like taking three people's coats away."
            },
            {
                t: "Have the heating repaired instead of chasing symptoms",
                m: 20, l: -10, a: 5, b: -10,
                rep: { "Egon": 10 },
                r: "You go down to the boiler room with Egon. A valve has been at zero since Monday because somebody brushed past it. Two turns later it warms up, and three fan heaters become redundant of their own accord."
            },
            {
                t: "Have a stronger fuse fitted",
                m: 10, l: 5, a: 0, b: 20,
                r: "You suggest uprating the circuit. Egon says very slowly: 'A stronger fuse.' The two of you look at each other, and neither of you ever mentions the suggestion again."
            },
            {
                t: "Spread the heaters over three circuits",
                m: 25, l: -10, a: 0, b: -15,
                rep: { "Egon": 5 },
                r: "You spread the devices over three separate circuits and label the leads. The fuse holds, the people stay warm, and the actual cause — a heating system that has been off since Monday — is now in writing in a fault report."
            }
        ]
    },

/* -------------------------------------------------------------------------
   Dreiteiler wave 3 (v5.0): sidequest chains. Two of them deliberately
   switch medium - approach in the phone chat, consequence as a terminal
   scene (and once the other way round) - so the messenger carries story
   weight instead of decoration. Duplicate check against the stock
   (2026-08): Probealarm (5x), Aufzug (3x), Zimmerpflanze, Poststelle, the
   Schmidt memorial box and the fruit-fly plague (donut fertiliser chain)
   are taken - the fruit basket below therefore decays into BUREAUCRACY,
   not into biology. Flag setting inside phone events happens in the
   RESULT (res.next), not in node options - those only navigate.
   ------------------------------------------------------------------------- */
{
    id: "sq_kevin_geheim_1",
    char: "Kevin",
    kind: "phone",
    appName: "WhatsApp",
    title: "Kevin",
    startNode: "root",
    nodes: {
        root: {
            text: "Kevin: 'are you in the building'\n\nKevin: 'if you are up on the 3rd sometime. stairwell. back section'\n\nKevin: 'do not tell anyone'\n\nKevin: 'worth it'",
            opts: [
                { t: "'What is this about?'", next: "frage" },
                { t: "'Ok. Sometime soon.'", next: "end_zusage" },
                { t: "'Kevin, I have things to do.'", next: "end_absage" }
            ]
        },
        frage: {
            text: "Kevin: 'not in the chat'\n\nKevin: 'they read along'\n\nKevin: 'who are they? good question'\n\nKevin: '👀'",
            opts: [
                { t: "'All right then. Sometime soon.'", next: "end_zusage" },
                { t: "'You have watched too many films.'", next: "end_absage" }
            ]
        }
    },
    results: {
        end_zusage: {
            txt: "Kevin: '👍'\n\nKevin: 'back section. where the light flickers'\n\nThat light has been flickering for years. You never had it repaired. Now you cannot remember why not either.",
            m: 5, l: 0, a: 0, b: 0,
            next: "sq_kevin_termin"
        },
        end_absage: {
            txt: "Kevin: 'ok'\n\nKevin: 'your loss'\n\nHe writes nothing further. For the rest of the day you wonder at irregular intervals what is on the third floor.",
            m: 5, l: 0, a: 5, b: 0
        }
    }
},
{
    id: "sq_kevin_geheim_2",
    char: "Kevin",
    kind: "text",
    reqStory: "sq_kevin_termin",
    reqStoryAge: 1,
    title: "Back Section, Third Floor",
    text: "Kevin is waiting in the stairwell where the light flickers, and looks round twice although nobody is there. Then he steps aside. Behind him stands an old vending machine, unplugged, no price labels. 'That has not been restocked since the refit', says Kevin. 'But compartment C4 is jammed. And deliveries still go into C4. Do not ask why.'",
    opts: [
        {
            t: "'Kevin. Who restocks a dead machine?'",
            m: 10, l: 0, a: 5, b: 0,
            rep: { "Kevin": -5 },
            r: "Kevin looks at you for a long moment. 'Do you always have to ask everything to death?' He takes the sandwich himself and goes. The light flickers after you."
        },
        {
            t: "Open compartment C4",
            m: 10, l: 0, a: -10, b: 0,
            loot: "sandwich",
            r: "The compartment gives way after a gentle tug. Inside: one shrink-wrapped sandwich, best-before date in the distant future, origin unclear. Kevin nods solemnly. 'Welcome to the club.' Which club, you do not ask. Some doors are better closed behind you."
        },
        {
            t: "Let Kevin have the sandwich",
            m: 5, l: 0, a: -5, b: 0,
            rep: { "Kevin": 5 },
            r: "'You do not want it?' Kevin takes it with the respect of a man who can appreciate self-denial. The compartment jams shut again. You take no loot away, only a location and a procedure. Knowledge is a supply too."
        }
    ]
},
{
    id: "sq_berater_1",
    kind: "text",
    title: "The Man in Grey",
    text: "A man in a grey suit is standing at the floor door, smiling patiently. 'I cannot get in — my pass is still at the registration desk. I am the new consultant for the Transformation Project.' He is holding a laptop under his arm and says the words 'Transformation Project' as though that explained everything. You have heard of no such project.",
    opts: [
        {
            t: "'Without a pass I cannot let you in.'",
            m: 10, l: 0, a: 5, b: -5,
            r: "He nods, almost pleased. 'Very good. Security culture.' He notes something in a small book and stations himself beside the door, waiting, smiling. When you come past later he has gone. Or is inside."
        },
        {
            t: "Escort him to the registration desk, the long way",
            m: 25, l: -5, a: 5, b: -5,
            r: "The two of you walk through the stairwell in silence. At the desk nobody knows him, and he stays perfectly calm and starts filling in forms. As you leave you hear him say: 'No problem, I know the process.' It sounds as though he had written it."
        },
        {
            t: "Hold the door. It will be fine.",
            m: 5, l: 5, a: 0, b: 5,
            next: "sq_berater_drin",
            r: "'Many thanks.' He walks purposefully down the corridor, turns into Room 2.11 and closes the door quietly. Purposefully. Into a building he supposedly does not know."
        }
    ]
},
{
    id: "sq_berater_2",
    char: "Gabi",
    kind: "phone",
    appName: "Messages",
    reqStory: "sq_berater_drin",
    reqStoryAge: 1,
    title: "Gabi (Reception)",
    startNode: "root",
    nodes: {
        root: {
            text: "Gabi: 'Tell me. Did YOU let a man in grey in?'\n\nGabi: 'He has been sitting in 2.11 since yesterday. With a laptop. He fetches coffee in the mornings and greets everybody by their first name.'\n\nGabi: 'Nobody knows who he belongs to. EVERYBODY thinks he belongs to somebody else.'",
            opts: [
                { t: "'He says he is from the Transformation Project.'", next: "projekt" },
                { t: "'Never seen him.'", next: "end_leugnen" }
            ]
        },
        projekt: {
            text: "Gabi: 'There is no Transformation Project.'\n\nGabi: 'I checked the room bookings. 2.11 is booked as free.'\n\nGabi: 'He has put a meeting in for tomorrow. Title: \"Kick-off\". Four people have already accepted.'",
            opts: [
                { t: "[Tell the registration desk]", next: "end_melden" },
                { t: "[Watch for now. Perhaps it will sort itself out.]", next: "end_beobachten" }
            ]
        }
    },
    results: {
        end_melden: {
            txt: "Gabi: 'I am in. I will send security up.'\n\nGabi: 'If he REALLY is from something, it was not you. 🙃'\n\nSecurity finds Room 2.11 empty. On the table: a flipchart with three circles and the word SYNERGY.",
            m: 10, l: 0, a: 5, b: -10
        },
        end_beobachten: {
            txt: "Gabi: 'YOU want to watch. He has a name badge by now.'\n\nGabi: 'Self-laminated. I recognise our laminator.'\n\nYou resolve to walk past 2.11 tomorrow. Purely by chance.",
            m: 5, l: 5, a: 0, b: 5
        },
        end_leugnen: {
            txt: "Gabi: 'Interesting.'\n\nGabi: 'Because on the still from the door camera somebody is holding the door for him.'\n\nGabi: 'The haircut looks familiar. 🙃'\n\nShe does not send the picture. She does not need to.",
            m: 5, l: 0, a: 5, b: 5
        }
    }
},
{
    id: "sq_berater_3",
    kind: "text",
    reqStory: "sq_berater_drin",
    reqStoryAge: 2,
    title: "Kick-Off in 2.11",
    text: "You see it through the glass panel of Room 2.11 as you pass: the man in grey is standing at the flipchart, six people are sitting round the table, on the paper three circles and the word SYNERGY. Two of the six are taking notes. One is from Management.",
    opts: [
        {
            t: "Go in and put the pass question in front of everyone",
            m: 15, l: 0, a: -5, b: 10,
            r: "It goes very quiet. The man in grey smiles patiently. 'An important point. Security culture. We shall take that on board.' He writes SECURITY CULTURE into one of the circles. The group nods. You are still in the room and already no longer a subject."
        },
        {
            t: "Walk on. The building has decided.",
            m: 5, l: 5, a: 5, b: 0,
            r: "Whoever has a meeting exists — that is how this company works. Later a notice goes up in the kitchenette: 'Transformation Project: first results to follow.' There is a Transformation Project now. You were there when it did not come into being."
        },
        {
            t: "Sit down and take notes",
            m: 25, l: 5, a: -5, b: -5,
            r: "You nod in the right places and jot down words that do not form sentences. After the meeting your name is on the distribution list of the project that does not exist. It is the most career-friendly nonsense you have ever taken part in."
        }
    ]
},
{
    id: "sq_ersthelfer_1",
    kind: "text",
    title: "Appointed",
    text: "There is a new list on the noticeboard: 'Workplace First Aiders — current status'. Two names. The second is yours. You never volunteered, never attended a course, never signed a form. Beside it, handwritten: 'Training to follow.'",
    opts: [
        {
            t: "Object in writing",
            m: 25, l: 0, a: 10, b: 0,
            r: "You fill in the objection form. The answer comes quickly and pleasantly: the objection will be reviewed — the person responsible for the review being the workplace first aider. You read the sentence three times. It does not improve."
        },
        {
            t: "Inspect the first aid box, if nothing else",
            m: 20, l: -5, a: 5, b: -5,
            next: "sq_ersthelfer_amt",
            r: "The box hangs in the corridor, sealed with dust. According to the inspection sticker it was last checked four years ago. The plaster set has dried out, the foil blanket rustles suspiciously, but the scissors are good. You note down a reorder. From now on you evidently really are this."
        },
        {
            t: "Ignore it. What could possibly happen.",
            m: 5, l: 10, a: 0, b: 0,
            next: "sq_ersthelfer_amt",
            r: "You leave the list hanging. On the stairs you meet somebody with a box full of staplers. You resolve not to think about which part of that is now your concern."
        }
    ]
},
{
    id: "sq_ersthelfer_2",
    kind: "text",
    reqStory: "sq_ersthelfer_amt",
    reqStoryAge: 1,
    title: "The First Call-Out",
    text: "Somebody from Sales is standing outside your office holding up an index finger like an exhibit. A paper cut, barely visible. 'You are the first aider. This has to be documented. In the accident book. Because of the workplace safety board.' Behind him two colleagues are waiting. Whether as witnesses or out of curiosity is impossible to tell.",
    opts: [
        {
            t: "The full works: plaster, accident book, signature",
            m: 20, l: -5, a: 10, b: -5,
            r: "You disinfect, stick, document. Nature of injury: 'cut, paper-related'. First aid given: 'plaster, reassurance'. The salesman proofreads your entry. The witnesses nod. It is the most orderly moment of your week, and the most pointless."
        },
        {
            t: "'That will heal in the open air.'",
            m: 5, l: 5, a: 0, b: 10,
            r: "The index finger lowers slowly. 'That is going in the record.' Which record you do not know. That it exists is beyond question — complete with your name, clearly legible."
        },
        {
            t: "Offer chocolate as compensation",
            rem: "chocolate",
            m: 5, l: 0, a: -5, b: 0,
            r: "'Chocolate?' — 'A tried and tested household remedy.' He eats it in the corridor, mollified. The accident book stays shut, the witnesses disperse. Some first aid works through the stomach."
        }
    ]
},
{
    id: "sq_obstkorb_1",
    kind: "text",
    title: "Fit at Work",
    text: "There is a fruit basket in the floor kitchenette. Large, woven, with a ribbon and a card: 'FIT AT WORK initiative — help yourselves!' Bananas, apples, two kiwis, a single pineapple as the centrepiece of the composition. Nobody helps themselves. Everybody is waiting to see who dares first.",
    opts: [
        {
            t: "Be the first to help yourself",
            m: 5, l: 0, a: -5, b: 0,
            r: "You take an apple, in the middle of the kitchenette rush hour. Two people watch. You are barely out of the door before you hear the rustling of imitators behind you. Somebody had to break the ice. The apple is good."
        },
        {
            t: "Take the pineapple to safety",
            m: 10, l: 0, a: -5, b: 5,
            next: "sq_obstkorb_steht",
            r: "The pineapple migrates to your office as a trophy and an ornament. What one does with a pineapple without a knife and without a plan remains to be seen. Without its centrepiece the basket looks oddly leaderless."
        },
        {
            t: "Do not touch it. It belongs to everyone.",
            m: 5, l: 5, a: 0, b: 0,
            next: "sq_obstkorb_steht",
            r: "You take nothing. Everybody takes nothing. The basket stands there like food for thought that nobody ordered, and the bananas begin their quiet transformation."
        }
    ]
},
{
    id: "sq_obstkorb_2",
    kind: "text",
    reqStory: "sq_obstkorb_steht",
    reqStoryAge: 1,
    title: "The Withdrawal List",
    text: "There is now a list stuck to the fruit basket, neatly ruled, with a pen on a string: 'Withdrawal list — in the interests of fairness please enter name, date and type of fruit. F. Elster.' Since the list went up, nobody has taken anything. The bananas have gone over to spotted and are being guarded by a form.",
    opts: [
        {
            t: "Touch neither the fruit nor the list",
            m: 5, l: 10, a: 0, b: 0,
            r: "You walk past as though past a building site. Nothing rustles behind you. The basket and the list lay siege to each other, and the fruit loses."
        },
        {
            t: "Sign in and pointedly take a banana",
            m: 10, l: 0, a: -5, b: 0,
            rep: { "Frau Elster": 5 },
            r: "Name, date, 'Banana (1 off)'. Your line is the first. As you leave, somebody steps up to the list behind you and starts writing. Systems need a first entry, otherwise they stay threats."
        },
        {
            t: "Take an apple without signing",
            m: 5, l: 5, a: -5, b: 5,
            rep: { "Frau Elster": -5 },
            r: "The apple tastes normal, but it eats like stolen goods. The list now has a gap, and you know from experience: gaps are the one thing this building reliably notices."
        }
    ]
},
{
    id: "sq_obstkorb_3",
    kind: "text",
    reqStory: "sq_obstkorb_steht",
    reqStoryAge: 2,
    title: "Successfully Concluded",
    text: "The fruit basket has gone. In its place stands a display with a QR code: 'Your opinion counts! What did you think of the FIT AT WORK initiative?' Beside it a notice: in view of the great success, the initiative will in future be repeated quarterly. No records exist regarding the whereabouts of the fruit.",
    opts: [
        {
            t: "Five stars, walk on",
            m: 5, l: 5, a: 0, b: -5,
            r: "Five stars for a basket almost nobody got anything out of. Somewhere that turns into a slide with a bar chart, and the bar chart will be happy."
        },
        {
            t: "Answer honestly, with a full account",
            m: 15, l: -5, a: -5, b: 5,
            r: "You describe the career of the basket from composition to siege, factually, in whole sentences. The form thanks you and asks at the end for your name and department. The survey is anonymous only in the heading."
        },
        {
            t: "Ring the initiative and praise the resupply",
            m: 10, l: 5, a: -5, b: 5,
            r: "The hotline is electrified — feedback at last! They thank you for your 'valuable engagement' and announce that the format will be expanded. You have an inkling of what you have done. Before long there will be two baskets here."
        }
    ]
},
{
    id: "sq_markus_schritte_1",
    char: "Markus",
    kind: "phone",
    appName: "Teams",
    title: "Markus",
    startNode: "root",
    nodes: {
        root: {
            text: "Markus: 'BRO!'\n\nMarkus: 'Department challenge!! Step counters, one week, IT vs Sales vs Accounts 💪'\n\nMarkus: 'Already signed you up. You can thank me later.'",
            opts: [
                { t: "'Take me off it again.'", next: "austragen" },
                { t: "'Fine by me. What counts?'", next: "end_dabei" }
            ]
        },
        austragen: {
            text: "Markus: 'Cannot be done, entries closed just now 😅'\n\nMarkus: 'Come on. ACCOUNTS are leading right now. ACCOUNTS.'\n\nMarkus: 'Ms Sonntag does 12,000 steps a day. TWELVE THOUSAND.'",
            opts: [
                { t: "'All right. For the honour of it.'", next: "end_dabei" },
                { t: "'Then Accounts have earned it.'", next: "end_raus" }
            ]
        }
    },
    results: {
        end_dabei: {
            txt: "Markus: 'THAT is what I am talking about 💪💪'\n\nMarkus: 'Standings come daily. Do not disappoint me.'\n\nYou look down at yourself. Your desk is three metres from the server room. This will not be a fair contest.",
            m: 5, l: -5, a: 0, b: 0,
            next: "sq_schritte_dabei"
        },
        end_raus: {
            txt: "Markus: 'Weak.'\n\nMarkus: 'I will only say this once: weak.'\n\nHe sends a single 💔 after it. It is astonishingly effective for an emoji.",
            m: 5, l: 5, a: 0, b: 0,
            rep: { "Markus": -5 }
        }
    }
},
{
    id: "sq_markus_schritte_2",
    kind: "text",
    reqStory: "sq_schritte_dabei",
    reqStoryAge: 1,
    title: "The Standings Go Up",
    text: "A printout hangs in the kitchenette: 'STEP CHALLENGE — standings'. Accounts in front, Sales behind them, IT trailing in last place. Behind the IT bar somebody has added by hand: 'sit a lot'. Markus has highlighted your name in yellow. As encouragement, presumably.",
    opts: [
        {
            t: "From now on every floor on foot, every errand taken on",
            m: 25, l: -15, a: 5, b: 0,
            rep: { "Markus": 5 },
            r: "Stairs instead of the lift, the long corridor instead of the short one, the printer at the far end. Your legs hum by the evening, and the IT bar grows by a visible amount. Markus sends three flame emojis. You have worked harder for more pointless recognition before."
        },
        {
            t: "Put the phone on the internal post trolley",
            m: 10, l: 5, a: -5, b: 5,
            r: "The trolley rolls round the building all day and your step counter rolls with it. By clocking-off time you lead the individual standings by a wide margin. Markus is moved to tears. The guilty conscience stays within bounds, but it does stay."
        },
        {
            t: "Headphones on and stair intervals",
            m: 20, l: -10, a: -10, b: 0,
            req: "headphones",
            rep: { "Markus": 5 },
            r: "With music, stairs are a game of rhythm. Four floors up, four down, the bass counting along. Markus is waiting at the bottom with a raised fist, and for once you return it. The IT bar gets a top-up and you get a clear head."
        }
    ]
},

{
    /* Dreiteiler wave 4 (v5.0): reverse cross-pool - the cold call was the
       opener (call_kalt_1), the consequence walks in through the door. */
    id: "sq_brandt_1",
    kind: "text",
    reqStory: "call_brandt_kommt",
    reqStoryAge: 1,
    title: "As Agreed by Telephone",
    text: "At reception stands a man in a jacket with a roll-up banner under his arm like a battle standard. 'Mr Brandt! As agreed by telephone!' Gabi has put him through to you, with the expression of somebody who knows exactly who agreed what here. The banner unfurls a little way of its own accord. It wants this.",
    opts: [
        {
            t: "See the meeting through, with dignity",
            m: 35, l: 0, a: 10, b: 0,
            r: "Forty minutes of slides. Holistic, scalable, a roadmap with three horizons. You sign nothing, nod sparingly and escort him out. At the door he shakes your hand at length: 'A very good first meeting.' There will be minutes of it. You will be recorded in them as 'interested'."
        },
        {
            t: "Pass it upwards: 'That is a matter for the boss.'",
            m: 10, l: 5, a: -5, b: 5,
            rep: { "Dr. Wichtig": -5 },
            next: "sq_brandt_chefsache",
            r: "You announce Brandt to Dr Wichtig and leave. An hour later the two of them are still talking, and through the glass door you see the worst of it: they get on. The flipchart already carries the word SYNERGY POTENTIAL. Whatever comes of it — it bears your introduction."
        },
        {
            t: "Ask Gabi for an emergency",
            m: 10, l: 0, a: -5, b: 0,
            rep: { "Gabi": 5 },
            r: "Gabi appears after two minutes with a grave expression: 'The fire safety appointment — they are waiting.' There is no appointment and no fire safety, but Mr Brandt instinctively gives way to authority. She escorts him out and says as she passes, without moving her lips: 'You owe me.'"
        }
    ]
},

/* -------------------------------------------------------------------------
   Item discovery (v5.0). The loot sits in the OPENER, not in an aged
   follow-up: reqStoryAge never opens in day mode, so a tool hidden behind
   it would exist for week players only. The aged part adds consequence,
   never a second item - that keeps both modes equal on equipment and still
   gives the week something the day cannot have.

   Neither opener announces itself as a find: one is a propped-open fire
   door, the other a routine memory upgrade. Duplicate check (2026-08):
   the shredder already hides a USB stick, Rack 5 is heavily used, and fire
   safety exists as a topic (extinguisher, safety officer) but never as a
   door tied open.
   ------------------------------------------------------------------------- */
{
    id: "sq_brandtuer_1",
    kind: "text",
    title: "The Door in the East Wing",
    text: "In the east wing the fire door to the stairwell is standing open. Not a little way — completely. Somebody has tied it to the banister with a tie, dark blue with diagonal stripes, carefully knotted. Underneath it a box that is evidently pushed through here often.",
    opts: [
        {
            t: "Close the door and leave the tie hanging",
            m: 10, l: -5, a: 0, b: -5,
            r: "Door shut, tie dangling from the banister like a pennant. Next time you pass, the door is open again and the knot is new. The opponent is more patient than you."
        },
        {
            t: "Let Blaschke know",
            m: 15, l: 0, a: -5, b: -5,
            r: "'East wing? That door has been too heavy since the refurbishment.' Blaschke sighs deeply. 'I will bring a door closer. Next week.' At least somebody now knows whose responsibility it actually is."
        },
        {
            t: "Undo the knot, close the door, record the matter",
            m: 20, l: -10, a: 0, b: -5,
            loot: "tie",
            next: "sq_brandtuer_frei",
            r: "The knot is tight and the fabric is good. The door falls shut as it should, and you enter the incident in the list that ought to exist for this and does from today. You keep the tie for now. Somebody will miss it."
        },
        {
            t: "Not your door, not your floor",
            m: 5, l: 10, a: 0, b: 5,
            r: "You walk through and leave everything as it is. Two steps on, the thought arrives that fire doors have a purpose. Four steps on the thought has gone again."
        }
    ]
},
{
    id: "sq_brandtuer_2",
    kind: "text",
    reqStory: "sq_brandtuer_frei",
    reqStoryAge: 1,
    title: "All-Staff Email from the Fire Safety Officer",
    text: "An all-staff email: 'We are pleased to report that the permanently open fire door in the east wing has been reported and secured. Our thanks go to the attentive person concerned.' Two paragraphs later, in smaller type: 'Would the owner of an item of clothing used there please come forward.'",
    opts: [
        {
            t: "Say nothing. Skip both paragraphs.",
            m: 5, l: 5, a: 0, b: 0,
            r: "You read the mail, you delete the mail. Somewhere in the building somebody is missing a tie, and somewhere in the building a door is shut. Both are in order."
        },
        {
            t: "Come forward as the attentive person",
            m: 10, l: 0, a: -5, b: -10,
            r: "You reply factually and without mentioning the item of clothing. The answer comes from the Fire Safety Officer in person, three lines, with the word 'exemplary' in it. You read it twice, then move the mail into a folder that did not exist before."
        },
        {
            t: "Put the tie anonymously into the internal post",
            rem: "tie",
            m: 10, l: 0, a: -5, b: 0,
            r: "No sender, no note, addressed to the Fire Safety Officer. Two days later a new notice goes up in the east wing: 'Door wedges are available from Facilities Management.' Sometimes one exhibit is enough."
        }
    ]
},

/* -------------------------------------------------------------------------
   The case of the quiet corner (v5.0): a three-parter played straight as a
   detective story - observation, deduction, reveal. The opener runs in day
   mode like any other event; only the deductions are dated, so week players
   get the case and day players get the crime scene.

   The culprit is the CEO's son, established in call_junior. Nothing about
   the reveal is new lore - the deductions only point at what the game has
   already shown. Duplicate check (2026-08): sq_wc_1 (occupied cabin) and
   sq_wc_2b (the HR toilet) exist and are different scenes.
   ------------------------------------------------------------------------- */
{
    id: "sq_wc_fall_1",
    kind: "text",
    title: "The Crime Scene",
    text: "The gents' toilet on the second floor looks as though somebody had held a party there and lost. Paper towels in the basin, a footprint on the cubicle door, and over it all the sweetish smell of something that does not belong in this building. It is the third time this week.",
    opts: [
        {
            t: "Tell Egon and walk on",
            m: 5, l: 0, a: 0, b: 0,
            r: "Egon listens without lifting his eyes from his toolbox. 'Third time, yes. I will clean it up, same as always.' He says it without resentment. That is the worst part of it."
        },
        {
            t: "Look at the room before anybody tidies it",
            m: 10, l: -5, a: 0, b: 0,
            next: "wc_fall_offen",
            r: "You do not go in, you read. The print on the door is small, size thirty-eight at most. The paper towels are not scattered but placed: somebody threw them and aimed. In the corner stands a can, green, unlabelled. You photograph everything before Egon arrives."
        },
        {
            t: "Shut the door and change floors",
            m: 5, l: 10, a: -5, b: 0,
            r: "Three flights down there is a toilet as well. It is clean, well lit and six minutes away. The price of cowardice is calculable."
        },
        {
            t: "Clean it up yourself. Somebody has to.",
            m: 20, l: -10, a: 10, b: -5,
            r: "Gloves from the server room, ten minutes, a very silent walk back to your desk. Nobody saw it, nobody will learn of it, and tomorrow it will look the same again."
        }
    ]
},
{
    id: "sq_wc_fall_2",
    kind: "text",
    reqStory: "wc_fall_offen",
    reqStoryAge: 1,
    title: "Three Observations",
    text: "The crime scene has been cleaned, your photographs have not. Three things will not let you go: the footprint belongs to a size nobody in the whole building wears. The green can is an energy drink you cannot buy here. And all three incidents fell on afternoons.",
    opts: [
        {
            t: "Cross-check the access logs for those afternoons",
            m: 20, l: -10, a: 5, b: 5,
            next: "wc_fall_spur",
            r: "Three afternoons, three logs. Forty-two people were in the building each time, forty-one of them every day. That leaves one card used on exactly those three afternoons: the management's visitor pass. Issued to a guest with no name."
        },
        {
            t: "Ask Gabi who comes and goes in the afternoons",
            m: 5, l: 0, a: -5, b: 0,
            next: "wc_fall_spur",
            r: "Gabi does not think for three seconds. 'Afternoons? That is when the little one comes.' She says it as though it were weather. The follow-up question earns the look you get for asking where the coffee machine is."
        },
        {
            t: "Check where the can came from",
            m: 10, l: -5, a: 5, b: 0,
            r: "Unlabelled, green, with a sticker in a language you do not read. Kevin identifies it in passing: 'Nuclear Sludge, bro. Only online.' Asked who drinks that sort of thing, he shrugs. 'People on pocket money.'"
        },
        {
            t: "File the case away",
            m: 5, l: 10, a: -5, b: 0,
            r: "You delete the photographs. It is a toilet, not a capital crime, and you have twenty-three open tickets. The thought holds until the next incident."
        }
    ]
},
{
    id: "sq_wc_fall_3",
    kind: "text",
    reqStory: "wc_fall_spur",
    reqStoryAge: 1,
    title: "The Solution",
    text: "You walk past Management in the afternoon, and there he sits: twelve years old, size thirty-eight, headphones on, a green can beside him. The boss's son is waiting for Dad to clock off. He looks up, sizes you up briefly and says: 'Oi, IT bloke.' The case is solved. The question is what that is worth now.",
    opts: [
        {
            t: "Greet him back and walk on",
            m: 5, l: 5, a: 0, b: 0,
            r: "'Oi.' Nothing more happens. You now know who it was, and that knowledge is entirely worthless, which makes it the most typical result of your career."
        },
        {
            t: "Offer to let him wait in the server room",
            m: 15, l: -5, a: -10, b: 0,
            r: "An old chair, a network cable and the announcement that nothing here gets touched. He stays two hours, says three sentences and leaves nothing behind. On the way out he says 'Thanks' and means it. The second-floor toilet stays clean from now on, and nobody will ever learn why."
        },
        {
            t: "Inform Dr Wichtig, factually",
            m: 10, l: 0, a: 10, b: 15,
            r: "You present it like an incident report, without one word too many. Dr Wichtig listens, nods and says: 'Children.' Then he asks whether you really analysed access logs, and whether that is your job. The case is settled. The problem now has a different name."
        },
        {
            t: "Tell Egon, in confidence",
            m: 5, l: 0, a: -10, b: 0,
            rep: { "Egon": 5 },
            r: "Egon listens, puts his toolbox down and laughs once, short and dry. 'Knew it.' He did not know it, he suspected it, and the confirmation is enough for him. From now on the two of you are the only people in the building who know."
        }
    ]
},
];
