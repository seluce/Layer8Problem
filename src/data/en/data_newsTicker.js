// i18n-status: translated
//
// 30 text fields, all 30 translated. Nothing here is deliberately identical.
//
// Thirty corporate broadcasts, each one a small atrocity delivered in the
// register of a company newsletter. The voice is Management's, never Miller's,
// and it addresses the reader formally throughout - so the English keeps full
// forms and no contractions (GLOSSAR §4, the register rule).
//
// Two things in here are load-bearing:
//
//   Synergy123!  the intranet password (GLOSSAR §1), unchanged, and it stays
//                out of the changelog - players are meant to find it here
//   j_schnoesel  a login, an identifier, unchanged
//
// "Frau Müller, die normalerweise das Onboarding macht" is the same person as
// Ms Miller from onboarding in data_emails.js, and takes that name: the joke
// is that a Miller is processing a Miller, and it survives translation because
// both sides move together (GLOSSAR §3c, Dienstgang block).
//
// 'Survival im Stadtpark' is NOT Frau Elster's 'Wald-Survival' from
// mail_teambuilding_1 (Forest Survival, fixed by the compendium). Two separate
// team events, deliberately kept apart.
//
// The ticker writes the company's name with a space - "Global Corp", as its
// own header does ('[GLOBAL CORP BROADCAST]') - except for the credit card,
// where the German says GlobalCorp. That inconsistency is the corpus's own and
// is carried over rather than tidied up.

export const newsTicker = [

	"System info for our new Junior Assistant, Justus-Aurelius: as Ms Miller, who normally handles onboarding, is currently residing in the burnout clinic and I have absolutely no idea how her regular system works, you will be receiving your credentials today via the broadcast system. Login: j_schnoesel / Pass: Synergy123! Please never change the password, it confuses the database.",
	"In pursuit of our sustainability targets ('Green Synergy 2030') we ask all staff to give up their parking space voluntarily. The areas thus freed will be sublet, most lucratively, to the law firm next door with immediate effect. Win-win for the environment and for our shareholders!",
	"Internal notice: following evaluation of the quarterly figures, the planned budget for ergonomic office chairs is cancelled in its entirety. The funds will instead flow as a special bonus into the board's new task force project 'Agile Mindset 4.0'.",
	"Global Corp celebrates the successful rollout of the new AI-assisted HR software 'FireBot 3000'. In the same movement we say farewell to 40% of the workforce on the third floor. To the remaining staff we wish a productive 'Do-More-With-Less' Tuesday!",
	"Important information from facilities management: the tap water in Building B has been classified as 'not potable' by the health authority for the time being. Global Corp Premium Mineral Water is available in the cafeteria from now on at only €4.50 a bottle.",
	"Reminder from HR: sick notes for 'general exhaustion' will from now on be accepted only on presentation of a notarised stress ECG. Please make use of the free meditation podcasts on the intranet instead (to be listened to in unpaid free time only).",
	"We welcome the surviving staff of our formerly largest competitor 'InnovaTech', which was taken over in a hostile manner yesterday. Re-onboarding takes place at the weekend. Attendance is voluntary, but a precondition for payment of the next salary.",
	"Pilot project launched: the toilet cubicles on the ground floor are from now on accessible by coin slot (€1) or by GlobalCorp credit card. The takings go directly to the board's bonus pool. We thank you for your financial support!",
	"Supply chain update: owing to 'supply bottlenecks' the printing allowance is restricted to 3 pages per week per employee. Bringing in your own printer cartridges from home is deemed theft of company time and will earn a written warning.",
	"Dear workforce, in order to reach the quarterly target the coming weekend is officially declared a 'Synergy Sprint'. Attendance is a point of honour. By way of thanks, Management will lay on half a margherita pizza for all remaining teams at 23:00 on Sunday evening.",
	"IT security warning: copying the sensitive customer databases for private purposes is strictly prohibited. The lucrative sale of data sets on the black market is reserved exclusively for senior management and authorised partners.",
	"'Bring Your Dog To Work Day' has been cancelled without notice, after the CEO's poodle 'Sir Reginald' was traumatised by a shredder. From tomorrow, any animal hair on staff clothing will result in immediate deductions from the Christmas bonus.",
	"New dress code policy: 'Casual Friday' is being replaced by 'Corporate Identity Friday'. Wearing the scratchy synthetic Global Corp jumper (purchase price: €89.90, deducted automatically from salary) is now compulsory on Fridays.",
	"Maintenance news: the lift serving floors 1 to 5 is closed to the ordinary rank and file until further notice and will operate from now on as a private express lift for the board. Please use the stairwell. Daily movement has been shown to raise productivity!",
	"To reduce energy costs, the room temperature throughout the building has been permanently fixed at 16 degrees Celsius. Fan heaters are prohibited on fire safety grounds. Global Corp fleece jackets are available in the fan shop with a 5% staff discount.",
	"Transparency initiative: the new cameras in the break rooms serve solely your own safety and the detailed recording of unproductive pauses in conversation. Anyone with nothing to hide need not fear the quiet whirring of the lenses.",
	"The meeting planned for tomorrow on the possible founding of a Works Council must regrettably be cancelled, as the conference room booked for it is required at short notice for a yoga class for heads of department. The organiser of the meeting has moreover been transferred, quite unexpectedly, to our branch in Siberia.",
	"A reminder about the compulsory team-building event 'Survival in the City Park'. Whoever loses the target shooting with paperclips takes over coffee duty for the board for the next four weeks. Attendance is, it goes without saying, absolutely obligatory.",
	"Dear colleagues, in order to offset inflation we have decided against an impersonal pay rise. Instead there is now a virtual 'High Five' button on the intranet. Show your colleagues how much you value them!",
	"Facilities update: to reduce distracting reflections on the monitors, all windows in the open-plan office have been permanently covered with black film. The UV radiation now absent can be compensated for by purchasing our own-brand vitamin D supplements in the company shop.",
	"The canteen is now serving the new 'Synergy Stew'. The precise ingredients are subject to secrecy level 4. Consume at your own risk and only after signing the disclaimer on the intranet beforehand.",
	"The annual health screening now carries a charge. Anyone exceeding the BMI limit defined by the board forfeits their entitlement to use the lift and to the two-ply toilet paper.",
	"Our new productivity tracking 'Eye-in-the-Sky' is now live. It measures keystrokes per minute. Should the figure fall below 80, the monitor will be set to maximum brightness for ten minutes by way of motivation.",
	"Congratulations to the 'Legal' department on its victory in the monthly paintball tournament. As a penalty the defeated 'Customer Support' department will perform telephone duty standing up for the next two weeks.",
	"Holiday requests for the summer months will from now on be allocated by battle royale. Registration for the arena in the basement opens on Friday at 18:00. Please bring your own protective equipment.",
	"Use of highlighters in any colour other than the official 'Global Corp Blue' is henceforth deemed a passive-aggressive act of rebellion and will be punished by immediate withdrawal of coffee privileges.",
	"The new Chief Visionary Officer has determined that the word 'problem' is from now on to be replaced by 'unmonetised synergy opportunity'. Infringements cost €5 into the board's buzzword jar.",
	"Owing to budget cuts, the fire extinguishers on the fourth floor have been replaced with attractive motivational posters. In the event of fire please remain calm and evaluate the situation in an agile, solution-oriented manner.",
	"The public transport season ticket has been replaced by a 'company bicycle subscription'. The bicycles deliberately have no saddles, in order to minimise time spent on the bicycle and optimise arrival time at the office.",
	"We say farewell to Mr Schmidt (Accounts), who has left the company 'at his own request' after being caught yawning three times in succession. His ergonomic chair will be auctioned to the highest bidder on the intranet from 14:00."

];
