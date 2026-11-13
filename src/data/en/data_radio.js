/**
 * GlobalCorp FM - the company radio (7.2).
 *
 * Short spots in a voice of their own, played in the quiet moments of a
 * working day: the narrator has been silent for a while, nothing covers the
 * terminal, no mail, no emergency, not the gala, not the lesson. See
 * src/engine/engine_radio.js for when, and EVENTS.md for the format.
 *
 * Every spot is ONE recording, filed under the checksum of its text in
 * audio/fm/<lang>/ (tools/voice-text.mjs, collectRadio). Change a word and
 * the spot goes silent until it is rendered again - the narrator's rule.
 *
 * Fields:
 *   id    fm_ + motif, unique in this pool, the same in both trees
 *   kind  what sort of spot (RADIO_KINDS in lint-data): two of one kind are
 *         never played back to back
 *   when  [from, to] minutes of the day, from inclusive, to exclusive;
 *         without it the spot fits any time of the working day
 *   if    what has to hold on top: tickets (at least), l, a, b (at least,
 *         the four letters of the effects), day (a WEEK_DAY_KEYS id - never
 *         the word). A spot whose `if` holds is preferred over the rest.
 *   text  what is said. No placeholder, no emoji, no markup - it is a
 *         recording, made months before it is played.
 *
 * In this tree everyone speaks English, the presenter and the machines they
 * quote alike; British spelling and the glossary's names (Ms Elster, Dr
 * Wichtig, the kitchenette, 'Creative 2'). It is the company's own station,
 * and it is cheerful the way a company is.
 */
export const radio = [

    // --- The morning show, until 10:00 ---
    { id: "fm_morning_coffee", kind: "morning", when: [480, 600],
      text: "Good morning, GlobalCorp! You're listening to GlobalCorp FM, the in-house radio nobody ordered. The coffee machine in the kitchenette is already showing 'ERROR 418', and the queue in front of it is four people long all the same. We'll keep you posted." },
    { id: "fm_morning_stretch", kind: "morning", when: [480, 600],
      text: "GlobalCorp FM, the morning show. Before you sit down: shoulders up, shoulders down, one deep breath in. Not in the server room, please, the air is in short supply in there. HR recommends three minutes of exercise a day, ideally spread across the walk to the kitchenette." },
    { id: "fm_morning_mail", kind: "morning", when: [480, 570],
      text: "The morning briefing on GlobalCorp FM. Overnight, eleven hundred emails came into the building, nine hundred of them with 'Re:' in the subject line and two hundred with 'Re: Re:'. Exactly one had an attachment, and it was too big. Sales forwarded it to everyone anyway." },
    { id: "fm_monday_morning", kind: "weekday", when: [480, 600], if: { day: "mon" },
      text: "Monday morning on GlobalCorp FM. The weekend is behind you, the inbox ahead of you, and in between there is only the walk from the lift to your desk. Take your time over it." },
    { id: "fm_morning_parking", kind: "morning", when: [480, 570],
      text: "Good morning from GlobalCorp FM. The car park is full except for the space right by the entrance. That one belongs to Dr Wichtig, who is working from home today, so it stays free. Park there anyway and by midday you'll find a note from Egon under your windscreen wiper. Egon laminates his notes." },
    { id: "fm_morning_turnstile", kind: "morning", when: [480, 600],
      text: "The morning show on GlobalCorp FM. The turnstile at the main entrance is only reading every other pass today. If you belong to the other half, please see Gabi at reception. Gabi will let you through if you look friendly, and she'll remember who didn't." },
    { id: "fm_morning_kevin", kind: "morning", when: [480, 600],
      text: "Some good news to start the day: Kevin, our apprentice, was first in the building this morning, at half past six. He wanted to see what happens when you put the server's clock forward by an hour. What happened, you'll find out from the ticket system over the course of the morning." },
    { id: "fm_morning_horoscope", kind: "morning", when: [480, 600],
      text: "The office horoscope on GlobalCorp FM. Aries: a meeting is postponed, but not cancelled. Taurus: somebody eats your yoghurt. Gemini: you get copied in. All other signs: see Gemini." },
    { id: "fm_morning_no_music", kind: "morning", when: [480, 600],
      text: "You're listening to GlobalCorp FM, the station without music. The music licence has been with Purchasing for review for three years. Until it comes through, the air conditioning will sing to you, in the East Wing even in two-part harmony. Requests to facilities, please." },

    // --- The other days of the week. Tuesday and Thursday exist only in a
    //     week: day mode stands for a Monday, a Wednesday or a Friday
    //     (radioDayKey). A spot whose `if` holds is drawn before the rest,
    //     so a day spot without a `when` is that day's first spot. ---
    { id: "fm_tuesday", kind: "weekday", if: { day: "tue" },
      text: "Tuesday on GlobalCorp FM, the least remarkable day of the week. Monday has already had its crises, and Friday hasn't had them yet. So whatever goes wrong today is brand new and all yours." },
    { id: "fm_wednesday", kind: "weekday", when: [600, 690], if: { day: "wed" },
      text: "Hump day on GlobalCorp FM. Half the week is done, the other half is in the calendar. Accounts would like to point out that hump day is not a celebration, and that sparkling wine in the kitchenette cannot be claimed on expenses. We've seen some anyway." },
    { id: "fm_thursday", kind: "weekday", if: { day: "thu" },
      text: "Thursday on GlobalCorp FM, and we have a forecast: tomorrow is Friday. Whatever you don't get done today, you won't get done tomorrow either, but tomorrow nobody will mind. Plan accordingly." },

    // --- Traffic: the building as a road network ---
    { id: "fm_traffic_lift_b", kind: "traffic",
      text: "GlobalCorp FM, traffic and travel. Lift B is stuck between the third and fourth floors. Egon has been informed and will take a look after his break. Please use the east stairwell instead. The east stairwell is closed today for a fire drill." },
    { id: "fm_traffic_corridor", kind: "traffic",
      text: "The travel news, with an obstruction outside Sales: a filing cabinet on wheels is standing crossways in the corridor, origin unknown. Egon has secured it with barrier tape, and the corridor along with it. Please give Sales a wide berth. Sales will come to you anyway." },
    // fm_traffic_print_jam: the printer on the second floor is the device
    // of the month (fm_staff_printer) - it has a reputation to keep.
    { id: "fm_traffic_print_jam", kind: "traffic",
      text: "Slow-moving traffic at the printer bank on the first floor. A three-hundred-page job is blocking both machines. It comes from Sales and consists mostly of slides with the word synergy on them. There is no diversion: the printer on the second floor does not take other people's jobs. It has a reputation to protect." },
    { id: "fm_traffic_kitchen", kind: "traffic",
      text: "Queuing traffic in the kitchenette. In front of the dishwasher, the crockery is backed up to the edge of the worktop. The dishwasher itself finished long ago; it just isn't being emptied. Please keep an emergency lane clear to the kettle." },
    { id: "fm_traffic_wrong_way", kind: "traffic",
      text: "Warning, wrong-way driver! In the west stairwell, a colleague from Sales is coming towards you on the wrong side with a stack of boxes. Please keep left, do not overtake and do not speak to him. He's on the phone." },
    { id: "fm_traffic_kreativ", kind: "traffic",
      text: "The travel news reports a full closure in meeting room 'Creative 2'. The room is triple-booked, and all three meetings started on time. The participants are now negotiating over who gets the projector. The projector has been showing 'No Signal' for ten minutes and is staying out of it." },
    { id: "fm_traffic_barrier", kind: "traffic",
      text: "The travel news from the car park. Since early this morning, the barrier at the exit will only take coins. Nobody in the building has had any coins since the canteen went card-only. Accounts is looking into a solution. Until then, you're parked nicely where you are." },
    { id: "fm_traffic_lift_a", kind: "traffic",
      text: "Good news from the travel desk: Lift A is running again, though only downwards. If you want to go up, you go down to the basement first and think it over there. Facilities is calling it a partial success and asks you not to jump in the lift." },

    // --- Weather, indoors ---
    // fm_weather_blue: the colour-blind electrician's note ('BLUE heats', see
    // GLOSSAR 2). The mapping is never swapped - blue heats.
    { id: "fm_weather_server", kind: "weather",
      text: "The weather on GlobalCorp FM. Still tropical in the server room, with isolated fan failures this afternoon. Ground frost by the fridge in Accounts; Ms Elster asks you not to hold the door open any longer than necessary. In Sales, fair to cloudy, depending on the quarterly figures." },
    { id: "fm_weather_blue", kind: "weather",
      text: "The indoor climate, brought to you by facilities. It has been warm in the East Wing since early this morning, very warm, because somebody set the dial to blue. A reminder: blue heats. If you'd like it cooler, please open a window. The windows in the East Wing do not open." },
    { id: "fm_weather_fog", kind: "weather",
      text: "The weather on GlobalCorp FM. Dense fog over the smoking corner, visibility under one metre. Humid in the open-plan office, with isolated gusts of tuna, even though the microwave in the East Wing is out of use. Dry and quiet in the basement, as ever." },
    { id: "fm_weather_draft", kind: "weather",
      text: "A severe weather warning for the second floor: a window in the corridor is open on the tilt, and there's a draught, with gusts reaching the kitchenette. Please hold on to any loose sticky notes. Facilities would gladly close the window, but it belongs to Ms Elster, and Ms Elster tilted it on purpose." },
    { id: "fm_weather_pollen", kind: "weather",
      text: "The pollen count on GlobalCorp FM. High levels in Marketing from scented candles, cinnamon and apple. Moderate in Sales, mostly aftershave. Nothing at all in IT, where nobody ever opens a window. If you're sensitive, please avoid the lift after the lunch break." },
    { id: "fm_weather_storm", kind: "weather", when: [480, 900],
      text: "The outlook for the afternoon: a thunderstorm is building over the Sales team meeting, with the first lightning around three o'clock, aimed at the quarterly figures. Clearing afterwards. The mood stays fresh until clocking off, locally frosty in the office of the head of sales." },
    { id: "fm_weather_sun", kind: "weather",
      text: "The weather: the sun is shining outside, we're told. A colleague from Sales saw it in the smoking corner early this morning. For everyone with a window seat, the blinds stay down because of the screens. For everyone else, nothing changes." },

    // --- The canteen, around midday. The dishes are the intranet's plan
    //     (data_intranet.js, canteen.page.menu), keyed by the same day ids. ---
    { id: "fm_canteen_queue", kind: "canteen", when: [690, 810],
      text: "GlobalCorp FM, your lunch break. The canteen reports one hot dish of the day and a queue all the way to the glass door. The microwave in the East Wing stays out of use; Egon has seen what was in it last. Bring your own cutlery and you'll be served faster." },
    { id: "fm_canteen_mon", kind: "canteen", when: [690, 810], if: { day: "mon" },
      text: "Monday, and GlobalCorp FM is live at the serving counter: it's spaghetti bolognese. The pasta is soft, and there is plenty of sauce. Anyone wearing a white shirt today has made a brave decision." },
    { id: "fm_canteen_wed", kind: "canteen", when: [690, 810], if: { day: "wed" },
      text: "Wednesday is Hawaii day in the canteen: chicken breast with pineapple, baked under something the kitchen calls cheese. For everyone else there's the large salad bowl with three grains of sweetcorn. The dressing has sold out. GlobalCorp FM wishes you a pleasant lunch." },
    { id: "fm_canteen_fri", kind: "canteen", when: [690, 810], if: { day: "fri" },
      text: "The canteen news, heading into the weekend. Today it's fish fingers, four per person, counted out at the counter. The mash is from powder, the spinach from conviction. If you'd like a fifth fish finger, please fill in a request. The request forms are in Accounts." },
    { id: "fm_canteen_tue", kind: "canteen", when: [690, 810], if: { day: "tue" },
      text: "The canteen on a Tuesday: currywurst and chips, the classic. The chips were still crisp at half past eleven; by now that is a memory. The vegetarian option is steamed broccoli with rice, no sauce. The kitchen calls that healthy." },
    { id: "fm_canteen_thu", kind: "canteen", when: [690, 810], if: { day: "thu" },
      text: "Thursday in the canteen, and GlobalCorp FM is there. It's schnitzel, Viennese style. The breadcrumbs come away easily, so please eat briskly and without sudden movements. The potato salad comes out of a bucket; the potato soup is watery, but it warms you from the inside." },
    { id: "fm_canteen_dessert", kind: "canteen", when: [690, 810],
      text: "Dessert on GlobalCorp FM. Today it's pudding, flavour vanilla, colour beige. The skin on top is included in the price. If you don't want it, please take it off yourself; for reasons of hygiene, the kitchen no longer does that." },

    // --- Announcements: HR, facilities, marketing ---
    // fm_notice_basement: the basement code (0000, GLOSSAR 1) without saying it.
    // fm_notice_password: Puschel123 (GLOSSAR 1) without saying it.
    { id: "fm_notice_basement", kind: "notice",
      text: "A message from facilities. Egon would like you to know that the basement is locked again as of now, and the code has not changed. Which code that is, he won't say. Egon does not speak into microphones, on principle." },
    { id: "fm_notice_password", kind: "notice",
      text: "A security notice on GlobalCorp FM. Please choose secure passwords. The name of your pet with one, two, three after it does not count as secure, even if the pet is very fluffy. By now, IT knows every pet in the building." },
    { id: "fm_notice_feelgood", kind: "notice",
      text: "An announcement from Marketing. Chantal invites you to the feel-good session in the large meeting room, topic: mindfulness in the mindset. There will be fruit. The fruit is an apple, and the apple is for Chantal." },
    { id: "fm_notice_fridge", kind: "notice", when: [480, 840],
      text: "An announcement from Accounts. The fridge in the kitchenette will be emptied today at two o'clock. Ms Elster asks you to label every container with your name. A container that only says 'Mine' counts as ownerless. The yoghurt labelled 'Hands off' is already empty." },
    { id: "fm_notice_fire_drill", kind: "notice",
      text: "A message from facilities: there will be a fire drill today, and the time is being kept secret. When the alarm sounds, please walk calmly to the assembly point in the car park, and do not take your coffee mugs with you. Eleven are still out there from the last drill." },
    { id: "fm_notice_survey", kind: "notice",
      text: "HR invites you to take part in the staff survey. The survey is anonymous. Please begin by giving your name, your department and your staff number, so that we can thank you personally for your honest opinion." },
    { id: "fm_notice_mug", kind: "notice",
      text: "A request from the kitchenette: the mug that says 'World's Best Boss' is not for everyone. It belongs to Dr Wichtig, who gave it to himself. Please put it back washed, with the handle to the right. He notices." },
    { id: "fm_notice_reply_all", kind: "notice",
      text: "A note on email traffic: please do not reply all to the email with the subject 'Please do not reply all'. If you already have, please don't apologise to everyone for it. The mail server thanks you and now needs a moment to itself." },
    { id: "fm_notice_lost_found", kind: "notice",
      text: "Lost property on GlobalCorp FM. Handed in so far: an umbrella, a bunch of forty keys and a USB stick labelled 'Salaries, do not open'. The umbrella is waiting for you with Gabi at reception. The keys are already back with Egon. The stick has been opened." },
    { id: "fm_notice_colour", kind: "notice",
      text: "A message from Marketing: the corporate colour is now holo pink. All presentations, letterheads and business cards will be switched over by the end of the month. Chantal asks for your understanding, and for a new tablet in a matching colour, because the old one no longer suits the company." },
    // fm_notice_world: Kevin and his Minecraft (data_chars), not named.
    { id: "fm_notice_world", kind: "notice",
      text: "An appeal for information: overnight, a world appeared on the file server, with mountains, sheep and a house made of glass. Whoever it belongs to, please get in touch with IT. Kevin does not need to get in touch. IT already knows." },
    { id: "fm_notice_meeting_free", kind: "notice",
      text: "A message from Management: starting now, there will be one meeting-free afternoon every week. Which afternoon that will be, we shall discuss in a meeting with all heads of department. Two hours, open end, the invitation is on its way." },
    { id: "fm_notice_plants", kind: "notice",
      text: "A request from facilities: the plants in the corridors are plastic. Please stop watering them. The rubber plant outside Sales is now standing in a small lake, and down in the pot something is growing that is not plastic." },
    { id: "fm_notice_cake", kind: "notice",
      text: "An announcement for everyone with a sweet tooth: there is a cake in the kitchenette. Nobody knows what it's for, and nobody knows who brought it either. Accounts advises against cutting it until someone has owned up. Two slices are already missing." },
    { id: "fm_notice_tailgate", kind: "notice",
      text: "A security notice: please don't hold the server room door open for anyone, not even friendly people in hi-vis jackets carrying clipboards. They have passes of their own. Anyone without one is either from outside or from Sales, and neither belongs in the server room." },
    // fm_notice_prince: the prince of the side quests and calls (Prinz
    // Abubakar, prince_letter), not named.
    { id: "fm_notice_prince", kind: "notice",
      text: "A warning from IT: an email from a prince of a country that is on no map is going round the building. He would like to transfer a fortune to you and only needs your account number. Please do not reply. Ms Elster has already replied, with an invoice." },
    { id: "fm_notice_shredder", kind: "notice",
      text: "A message from Accounts: the ShredMaster 3000 is a shredder, not a waste-paper basket. Please do not put banana skins, coffee cups or ties in it. Last week's tie is beyond saving. Its owner has worn a bow tie ever since." },

    // --- Advertising for the company's own services ---
    { id: "fm_ad_tickets", kind: "ad",
      text: "Have you met the GlobalCorp ticket system? One problem, one ticket, one number. And then patience. The ticket system remembers everything, so you don't have to. An advertisement from the IT department. The IT department knew nothing about it." },
    { id: "fm_ad_printer", kind: "ad",
      text: "Printing at GlobalCorp: the printer bank on the first floor prints in black and white, in colour, and now and then on request. Toner is available from Ms Elster against a receipt. The receipt is printed by the printer bank. GlobalCorp FM recommends the pencil." },
    { id: "fm_ad_intranet", kind: "ad",
      text: "The GlobalCorp intranet: the canteen menu, the organisation chart and the board's vision, all in one place. You'll find the password on the intranet too. GlobalCorp FM, bringing people together." },
    // fm_ad_coolio: the fridge of the coffee pool, which reports itself on
    // an extension.
    { id: "fm_ad_coolio", kind: "ad",
      text: "The Coolio 3000 in the kitchenette. It cools, it counts, it reports. Put the milk back in the door empty, and you'll get a call from its extension that very same day. The Coolio 3000, the fridge that knows you." },
    { id: "fm_ad_kreativ", kind: "ad",
      text: "Need room for big ideas? Book 'Creative 2': twelve chairs, one projector and a socket you can reach with a bit of luck. Bring your own coffee, and your own ideas too, please. 'Creative 2', bookable on the intranet, if it's free." },
    { id: "fm_ad_restart", kind: "ad",
      text: "Is your computer playing up? Have you tried turning it off and on again? Wonderful. Then you've already done everything IT would have done, and you didn't even have to wait. GlobalCorp IT. We believe in you." },
    { id: "fm_ad_premium_coffee", kind: "ad",
      text: "New in the kitchenette: Coffee Premium. The same coffee as always, but in the mug with the gold rim, for only fifty cents more. The tally sheet hangs right next to the machine. Coffee Premium. Tastes the same, costs more, feels better." },
    // fm_ad_magazine: Dr Wichtig's ADDED VALUE, the magazine in the vending
    // machine (data_vending), issue one, never sold out. Spelt as words:
    // the spot is only heard, and capitals invite a voice to spell it.
    { id: "fm_ad_magazine", kind: "ad",
      text: "Read 'Added Value', the magazine from Dr Wichtig. Forty pages of vision, an interview with the publisher conducted by the publisher, and on the back cover the publisher playing golf. Issue one is still available. Issue two will appear as soon as issue one has sold out." },
    { id: "fm_ad_chair", kind: "ad",
      text: "GlobalCorp has exactly one Ergonomic 3000, and it is on the top floor. Fourteen settings, six levers and a manual of a hundred pages. For every other workstation, Purchasing recommends a cushion. The cushion has been requested." },
    // fm_ad_carpool: the lift share on the noticeboard (data_board), whose
    // one condition is no radio.
    { id: "fm_ad_carpool", kind: "ad",
      text: "The car share on the noticeboard brings together people who travel the same way. Right now someone there is looking for two passengers, departure ten past seven, condition: no radio. GlobalCorp FM doesn't take it personally and wishes you a pleasant journey." },
    { id: "fm_ad_escape_room", kind: "ad",
      text: "Team building with Marketing: in the escape room in the basement, you'll get to know your colleagues from a whole new side in sixty minutes. One door, one puzzle, no signal. Chantal will keep you company with a quote for every minute. Sign up on the intranet; the way out by arrangement." },
    { id: "fm_ad_canteen_card", kind: "ad",
      text: "The GlobalCorp canteen card. Simply top it up, simply pay, simply forget how much is left on it. You can top it up at the till in the canteen. The till only takes payment by canteen card." },
    { id: "fm_ad_self_service", kind: "ad",
      text: "Forgotten your password? No problem with the new GlobalCorp self-service. On the intranet, click the button for forgotten passwords, enter your old password, and everything is back the way it was. Self-service. Because even IT needs a break sometimes." },
    // fm_ad_phoenix: Projekt Phoenix, the project nobody knows (intranet,
    // side quests).
    { id: "fm_ad_phoenix", kind: "ad",
      text: "Project Phoenix. It's coming. When has not been decided yet, and neither has what. Who is leading it is being clarified as we speak, and as for who is paying for it, please don't ask Accounts. Project Phoenix. We can't wait to find out ourselves." },
    { id: "fm_ad_stress_ball", kind: "ad",
      text: "Trouble at your desk? The GlobalCorp anti-stress ball sits nicely in the hand, doesn't squeak and doesn't hold a grudge. In red, available now from reception. Gabi has only three left. She needed one herself today." },
    // fm_ad_synerqon: the consultants of the meetings pool.
    { id: "fm_ad_synerqon", kind: "ad",
      text: "This programme is brought to you by Synerqon Consulting. Synerqon turns your processes into slides and your slides into processes. Don't know what your department does all day? Neither do we, but we write it down. Synerqon. Transformation you can bill for." },
    { id: "fm_ad_station", kind: "ad",
      text: "Ever fancied being on the radio? GlobalCorp FM is looking for voices from around the building. Send us your greetings, your requests and your complaints. We read out the greetings, we pass on the requests, and the complaints go to HR with your name on them." },

    // --- From the top floor ---
    { id: "fm_board_tunnel", kind: "board",
      text: "And now a greeting from the top floor. Dr Wichtig is thinking of everyone listening right now, and especially of everyone who ought to be working while they listen. He wanted to say so in person, but the line dropped in a tunnel. He'll call straight back." },
    { id: "fm_board_paperless", kind: "board",
      text: "A word from the top floor: Dr Wichtig has a vision. By the end of the year, GlobalCorp is to go paperless. The vision reached every department early this morning, printed, in colour, double-sided, signed and with a cover sheet." },
    { id: "fm_board_ai_coffee", kind: "board",
      text: "Dr Wichtig announces from the top floor: from next quarter, an artificial intelligence will make the coffee. IT is to have it set up by then. IT replied with a question: with which hands? The question has been filed under resistance to change." },
    { id: "fm_board_open_door", kind: "board",
      text: "The door to the top floor is always open, Dr Wichtig would like you to know. He asks you not to walk through it all the same. For concerns there is the ticket system; for urgent concerns, the ticket system with an exclamation mark in the subject line. He reads the exclamation mark personally." },
    { id: "fm_board_appreciation", kind: "board",
      text: "Good news from the board: the quarter was excellent. As a thank-you to the staff there will be no pay rise this year, but something far more valuable: appreciation. The appreciation will arrive by email in the course of the day, to everyone, with no attachment." },
    { id: "fm_board_live", kind: "board",
      text: "We have Dr Wichtig live on the line, from the car. Dr Wichtig, what would you like to say to the staff? It's crackling. We hear a word that sounds like turnover and one that sounds like weekend, in the same sentence. We're sure it was meant as motivation." },
    // Not 'employee of the month': the intranet dashboard names one of
    // those, and the radio must not contradict it.
    { id: "fm_staff_printer", kind: "staff",
      text: "GlobalCorp FM congratulates the device of the month. This month it goes to the printer on the second floor: four weeks without a paper jam, without a complaint and without a single day of holiday. The certificate hangs right next to it. It printed it itself." },
    { id: "fm_staff_egon", kind: "staff",
      text: "GlobalCorp FM congratulates Egon on his work anniversary. Nobody knows exactly how long he has been here; his personnel file begins with the words 'see Egon'. His colleagues clubbed together and bought him a new key ring. Egon said thank you and asked where the keys for it were." },
    { id: "fm_staff_new_colleague", kind: "staff",
      text: "We welcome a new colleague to Sales. She has been given a computer without a password and a chair without castors. The password comes next week; the castors have been requested. Welcome to GlobalCorp, and here's to many tickets together." },
    // fm_staff_ruediger: Frau Elster's cat (data_chars).
    { id: "fm_staff_ruediger", kind: "staff",
      text: "Greetings on GlobalCorp FM: Ms Elster from Accounts says hello to Rüdiger, who is at home and, she hopes, listening right now. She wants to tell him that the tin of salmon is for this evening and not for now. Rüdiger, if you've already found it: Ms Elster counts the tins." },
    { id: "fm_staff_runners", kind: "staff",
      text: "Congratulations to the running group: at the company run at the weekend, all seven of them crossed the finish line, six of them on foot. Markus reached the finish by phone and sold the run to a client along the way. The client is running with us next year." },
    { id: "fm_staff_kevin_exam", kind: "staff",
      text: "GlobalCorp FM congratulates Kevin, our apprentice, on passing his intermediate exam. He did it at the second attempt. At the first, he reinstalled the exam computer to make it run faster. The examiners counted that as initiative and gave him a new date." },
    { id: "fm_staff_gabi", kind: "staff",
      text: "A record from the switchboard: yesterday, Gabi at reception took more than two hundred calls and knew what each of them was about before the caller did. She forwarded three of them to IT, with the solution in the subject line." },

    // --- The afternoon, towards clocking off ---
    { id: "fm_countdown_screens", kind: "countdown", when: [900, 990],
      text: "GlobalCorp FM in the afternoon. HR would like to remind you that clocking off is not a right but an opportunity. Please do not switch off your screen before the end of the working day. Not even a tiny bit dimmer." },
    { id: "fm_countdown_coats", kind: "countdown", when: [930, 990],
      text: "The last hour on GlobalCorp FM. In the corridors the first coats are going on, and in Sales the first 'See you tomorrow!' emails are being written in advance. Markus has already shut down his computer and is playing solitaire on his phone." },
    { id: "fm_countdown_short_meeting", kind: "countdown", when: [900, 960],
      text: "Afternoons on GlobalCorp FM: the hour of the short meetings begins now, the ones that start just before clocking off and are only supposed to take ten minutes. If an invitation arrives in a moment, you didn't see it. Your calendar is full, until the end of the day and beyond." },
    { id: "fm_countdown_way_out", kind: "countdown", when: [930, 990],
      text: "The travel news for clocking off. Delays are expected on the route from your desk to the exit: in the corridor outside Sales, caused by colleagues with one last question, and at reception, caused by Gabi with the news of the day. If you want to get out quickly, take the stairs and look at the floor." },
    { id: "fm_countdown_overtime", kind: "countdown", when: [930, 990],
      text: "For everyone staying late today: the heating switches off at half past four, the lights at five, and from then on the motion sensor in the corridor takes you for a burglar. Waving helps a little. Running helps more, but then security turns up." },
    { id: "fm_countdown_status", kind: "countdown", when: [960, 990],
      text: "The last half hour on GlobalCorp FM. HR recommends using it to tidy your desk, answer any open emails and set your chat status to busy. The order is up to you." },
    { id: "fm_countdown_lights", kind: "countdown", when: [930, 990],
      text: "Before you go: whoever leaves the office last, please turn off the lights. In Sales they have been on for three weeks without a break, because everyone thinks Markus is still there. Markus is the first to leave every day." },
    { id: "fm_friday", kind: "weekday", if: { day: "fri" },
      text: "It's Friday. GlobalCorp FM asks all departments not to start any new projects today, not to schedule any meetings after lunch, and to avoid the phrase 'just one quick thing'. Sales has scheduled two meetings for two o'clock." },

    // --- When the day presses: the station notices what the player does.
    //     Through the fiction, never the numbers (EVENT-DOKTRIN 9). ---
    { id: "fm_alert_queue", kind: "alert", if: { tickets: 7 },
      text: "A traffic report from the ticket system: congestion in the queue, getting worse. Please don't open your ticket a second time. Open it twice and you'll get two numbers, but not two technicians. There is only one." },
    { id: "fm_alert_sighting", kind: "alert", if: { b: 70 },
      text: "GlobalCorp FM with a sighting: Dr Wichtig is out and about in the corridors, last seen between Sales and the kitchenette, heading for IT. We recommend an upright posture and a spreadsheet on your screen. One with lots of numbers." },
    { id: "fm_alert_breathe", kind: "alert", if: { a: 70 },
      text: "Time for a relaxation exercise on GlobalCorp FM. Breathe in. Hold your breath for a moment. Breathe out. If you made a fist while doing so, please keep it under the desk. The desk belongs to the company." },
    { id: "fm_alert_finish", kind: "alert", if: { l: 70 },
      text: "The productivity tip on GlobalCorp FM: finish one single task completely today. Just one. Gabi at reception says nobody in the building has tried that since the spring, and Gabi knows these things." },
    // Ten tickets end the day (checkEndConditions), so nine is the last
    // number a spot can wait for.
    { id: "fm_alert_queue_full", kind: "alert", if: { tickets: 9 },
      text: "A newsflash from the travel desk: nothing is moving in the ticket system. The queue now stretches from IT to the canteen and back again. IT asks for your patience, your understanding and, if anyone happens to be in the kitchenette, a double espresso." },
    { id: "fm_alert_printer_check", kind: "alert", if: { tickets: 5 },
      text: "GlobalCorp FM, on behalf of IT: if your printer isn't printing, please check first whether there is paper in it. Then whether it's switched on. Then whether it's your printer. Only then write a ticket. The queue thanks you." },
    { id: "fm_alert_boss_asks", kind: "alert", if: { b: 50 },
      text: "From the top floor: Dr Wichtig has already asked twice today what IT actually does all day. The first time, it was a question. The second time, he wrote the answer down before anyone had said anything." },
    { id: "fm_alert_boss_door", kind: "alert", if: { b: 90 },
      text: "Breaking news: Dr Wichtig is standing outside the IT door. He has knocked, and he is waiting. GlobalCorp FM will now be quiet for a moment, so that it sounds like work at your end." },
    { id: "fm_alert_doors", kind: "alert", if: { a: 50 },
      text: "A request to all departments: please close office doors quietly. One door in the building has already slammed shut four times today, so hard that the cups rattled at reception. The cups are fine; the door frame is still being inspected." },
    { id: "fm_alert_keyboard", kind: "alert", if: { a: 90 },
      text: "A note from facilities: keyboards are not sports equipment. Anyone who has already hit their own twice today will get a replacement from stock the third time. One letter sticks on the replacement keyboard. Which one is a surprise." },
    { id: "fm_alert_screensaver", kind: "alert", if: { l: 90 },
      text: "GlobalCorp FM says hello to everyone who looks very busy right now. HR has a tip for you: a screensaver that looks like a spreadsheet is not a spreadsheet. HR tried it personally and speaks from experience." },
];
