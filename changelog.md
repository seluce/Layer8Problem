[6.2.0] - 2026-08-25

Content and clarity, no balance changes yet.

Sound and feedback:
* When the day ends the music stops. The report, the curve and the diary page are there to be read, and silence after eight hours of office noise carries that better than another track. It comes back with the next morning.
* A decision that costs 30 or more anger or boss radar now makes a sound - a short, low hit, in the same synthesised voice as the rest of the game. Until now those moments were the only ones with no sound at all, while a menu click had one.
* Using an item shows what it did on every bar it moves. Only the boss radar had a floating number, and only three items raise it - so for every other item the anger bar simply dropped with nothing to say it had.
* Kevin and Egon have faces in the two emergencies that are entirely about them. The other boss fights are infrastructure with nobody in them, and stay that way.
* That sound answers to the sound setting, the shaking to the shaking setting. Switching the shaking off used to take the feedback away entirely; now it comes through the other ear.

The Synergy Gala:
* The invitation used to ask for its eight badges on the difficulty you were playing, and it could be earned once per difficulty. That was meant kindly, but the evening is the same on all three - and anyone who played mixed difficulties ended up with eight badges spread over three tiers, no complete tier, and no way to find out why. The eight now count wherever you earned them, and the evening happens once per career.
* You can see who you have already won over: the team view marks a colleague whose own story you have seen through, and says so once the whole house is behind you. What the invitation still wants beyond that is left for you to work out.
* The noticeboard and the company intranet have each heard of the gala - one wondering, one in writing.
* The evening itself got denser. The smokers' corner remembers something about 2019, Egon runs a late-night taxi service, the mirror ritual in the washroom gained a participant, and an escape across the car park now ends the way Chantal decides. Only the silent smoke stays a two-option moment - on purpose. Two scenes found their missing portraits, and the hub now tells its evening in four stages instead of three.
* An echo trimmed on each side: one refrain no longer appears twice in the same evening, and one English phrase no longer three times.
* The evening is written into Müller's chronicle at the back of the company history - one line for each of the five ways it can end, in his own hand. It is a page of its own rather than a day's entry, so it stays there while the daily lines come and go.
* In the archive the gala no longer carries a difficulty grade. It is a single evening per career, and a grade there promised an upgrade that can never come.

---

[6.1.1] - 2026-08-23

Everything here is measured against 6.1. This update is a large one, and it is bug fixes from end to end - not a single new feature. 6.0 and 6.1 brought a lot of new ground: the second language, the week campaign, the compendium, the gala. What matters now is that all of it runs cleanly, rather than piling more on top of it.

The rules of the game:
* An action that crossed closing time and raised the ticket warning at the same moment left the day running - and the extra action that followed could no longer end it, however badly it went. Warnings have their say and the day ends anyway; the same held for the safety valve at full anger.
* Mails now weigh the same as everything else: they quietly used a softer difficulty multiplier, shrank relief values on easy days, and their minutes never brought tickets.
* Ignoring a mail logged a smaller radar penalty than the bar actually moved. One number now.
* Phone-chat endings now cost the time they say and take the items they say - every ending used to cost a flat 15 minutes, and the prince's black card stayed in the backpack after returning his millions.
* In week mode, the silent hotline still answered tickets: with the day's calls spent, clicking the idle line kept removing one ticket per click.
* An ending caused purely by using an item was queued but only shown after the next unrelated event. It shows immediately now.
* A consumable reward from a chat was silently dropped if you already carried one, and a snack morning could stuff an eleventh item into a full backpack.
* The day curve ignored mails and items - a day that went badly wrong could show a chart with no spike in it, and the diary then called it calm.
* The diary claimed a day without lies as soon as your excuse stock had grown overnight, even if you had just used one. The chronicle also accepts the pen on a fresh morning now.
* "Sloth" was unreachable with laziness pinned at 100, and "High-Wire Act" was skipped when one long action carried the tickets straight from eight to ten. Both can be earned now.
* On a day started from the picker, the team view's arrows stayed frozen at zero and the diary could never name who moved.

Steam and a second machine:
* Playing on a second machine could overwrite the first machine's career - achievements, found items and the chronicle regressed to the newer install. The two archives unite now and nothing is lost; a summer party played on one machine stays played, and the chronicle no longer shows the same day twice.
* Playing a single day on one machine could delete a week in progress on the other - five days of play gone. Each save slot carries its own timestamp now.
* "Delete save permanently" deleted only the machine it was pressed on; the cloud quietly brought the career back. The reset now reaches every machine and is applied there exactly once.
* The weekly meeting told your friends list "despairing at the IT helpdesk" - it had no status line of its own and fell through to the catch-all, for the fifty minutes a meeting takes. It has one now.
* Every survived week night was counted twice in the career statistics.
* After a phone chat, no mail could ever follow and the Steam status still showed the previous activity.

Switching language:
* The company intranet, an open mail, an achievement notice, the chat's reply buttons, the summer party's hub text, Müller's handwritten chronicle entries and the backpack's log lines all follow a language switch now instead of standing still in the old one.
* The item dialog follows too - its heading could even flip to the wrong question: "Use item" over a window whose button said Discard.
* An unlucky moment could leave one event pool in the old language or empty for the rest of the session, and a quick double switch could end on the wrong language.
* The news ticker restarted its scroll but not its clock, so the headline vanished mid-run - and its speed finally matches how long a headline stays.
* Switching with the settings open put the calm caption back on an armed "delete save" button - the next click would have deleted the save without asking again. It disarms now. The restart button also stopped promising "the day at 08:00" during a week.

Screen, sound and input:
* The confirm key stopped working on end and night screens in 6.1, and could click through an open dialog onto the screen behind it.
* A warning or ending raised while the backpack, the intranet or the noticeboard was open appeared invisibly behind it.
* A day ending while a mail was open left the dead mail standing over the night screen, and answering it leaked into the finished day.
* Returning to the title screen or into a week night while a mail was open could leave the keyboard shortcuts dead for the rest of the session.
* Repairs around slow connections and fast clicks: a mail could open onto a finished day or into the gala, a double click on the lunch break, the weekly meeting or the party invitation drew twice or crashed the evening, and restarting during the boot animation ran two boot sequences at once.
* A tab closed in the middle of the tutorial came back as a broken workday, and the excuse button could derail the lesson.
* Damaged save data is refused instead of showing a clock reading NaN:NaN or breaking behind the resume dialog. In a browser's private mode the game plays on without saving instead of breaking mid-action, and a corrupted key binding no longer breaks every keypress.
* Switching the music on during a boss fight or the summer party started the office music over it. The switch now asks what is happening rather than what was last playing.
* Toggling the music off and quickly on again went permanently silent, and the volume slider could leave the music playing although it was switched off.
* The backpack, team, knowledge, archive and settings buttons can be reached and pressed with the keyboard.
* Small screen repairs: the hover zoom on a locked achievement no longer slides under its neighbours, the day/week choice is shared between archive and world statistics, "always show the curve" takes effect at the very next night screen, the knowledge book's top edge has its intended green, a damaged day curve draws a flat line instead of nothing, and the hint on an unfound archive item sits on solid ground instead of shining through its heading.
* The bug-report form sends a readable log and names its event again.

---

[6.1.0] - 2026-08-20

Everything here is measured against 6.0. This version is about stability: not much to see, and a few things that can no longer quietly break.

Presentation:
* The bug report form has lost its emoji; the note underneath carries a proper interface icon.
* The browser tab has an icon of its own - a burning monitor in the style of the interface icons - instead of a fire emoji that looked different on every system.
* Character and item pictures are delivered at the size they are shown at. Nothing looks different; the download is 5.4 MB smaller.
* Several achievements at once - one long action can cross several gates - now arrive one after the other, stay a little longer together, and the stack slides when one leaves.
* The boss-fight countdown bar runs smoothly instead of stepping twenty times a second.
* On the desktop the phone grows while a chat is open, so a long message no longer has to be scrolled through a tiny window. Only the log below makes room - buttons and inventory stay put - and it comes back when the chat ends.
* Chat bubbles slide in from their own side instead of just fading, and the chat header shows who is typing.

The texts:
* Twenty-four result texts have gained a beat. They said in one line what had cost an hour or a written warning, or passed a verdict where a scene belonged. The punchlines that work short stay short.
* Five result texts still read the display out ("Deine Wut sinkt massiv" above "Aggro -20"). They say what happens instead.

Bug fixes:
* On Linux with two graphics cards the Steam version could take so long to start that Steam gave up. It starts immediately now, with hardware acceleration as before.
* Let a boss fight's countdown run out and the stats hit, but the result box stayed empty. The failure text shows again, and the knowledge notes that unlock on boss fights can actually unlock now.
* The knowledge note on Wuttke's Excel mail quoted a subject line the mail never had. It reads the mail it describes now.
* The towed Golf on the charging point belongs to Egon in both places now - the tow result used to name a man from sales while the furious follow-up mail was Egon's.
* Escape closes the knowledge book and the week's condition picker instead of opening the settings on top of them.
* The diary could stay empty for a whole session, most reliably after a language switch on the start screen. It fetches its texts itself now.
* Switching language during the tutorial left the speech bubble in the old language. It comes along now, at whatever step you are on.
* In the tutorial, cancelling an item brought the glowing button back on top of the open backpack, where it could be clicked. Nothing lights up while a window is open.
* The day report under the weekly balance sheet was headed "Wednesday (normal)" on every day of every week. It names the actual day and the condition you chose.
* The weekly balance said "1 Tickets" and "1 Mails ignoriert". One ticket is a ticket.
* An achievement earned twice on the party evening - once, then again at a better grade - was listed twice among the trophies. Once now.
* The diary page carried the wrong weekday during a working week. It carries the day it was written on.

Under the hood:
* Three parts of the machinery were rebuilt so they can no longer break in silence: the interface carries no program code of its own, the tutorial no longer reaches into the controls behind the game's back, and faults that used to pass unnoticed - a missing icon, a wrong reference, a screen left in the old language - are caught while the game is built.
* The closing and night screens store what they mean rather than the sentences they show, so a language switch redraws them completely - end of day, end of week, the night between days, the party and the diary page alike.

---

[6.0.0] - 2026-08-17

This version was called 5.1 while it was being built and is released as 6.0, because the English language version joined it. The last released version is 5.0 - everything listed here has come about since then.

English:
* The game is now available in English. In full, not in parts: every event, the inbox, the phone chat, the intranet, the noticeboard, the knowledge, the company chronicle, the achievements, the morning moods, the excuses, the news ticker, the diary and every label around them. Around 11,600 texts, a good 650 standard pages.
* It was translated scene by scene, not word by word. Where a punchline does not carry in English, it has been rebuilt - Kevin's nickname for Miller, for instance. What draws its effect from the German stays German: the Mettigel, the TÜV, the Döner, the colleagues' names. Müller is called Miller, which is the literal translation and the same joke: the most common surname in the country, and therefore nobody in particular.
* There are two places to switch: at the bottom of the start screen with a plain DE | EN, and in the settings. The one on the start screen is deliberate - anyone who ends up with the wrong language cannot go looking for a settings menu whose label is in the wrong language too. On the first start the browser decides, in the Steam version the language set there; anyone who has played before stays with German.
* The switch happens on the spot, without reloading and without losing anything: in the middle of the day, in the middle of an event, in the middle of a phone chat. Everything on screen comes along, the log and the open conversation included - a week you began in German can be finished in English. Save files are language-independent.
* In the Steam version, everyone now reads the friends list in their own language. Until now it showed the player's - play in German and you were off fetching coffee for your English friends as well.

Lunch break:
* The break now has a memory too. Run ten kilometres with the running group and you feel it on the stairs the next day; let the sales rep take you out for sushi and you find a summary in your inbox in the morning saying "as discussed", although nothing was discussed.
* The seat at the board's table stays free for a day and waits. At the old table, Kevin and Chantal have made room as well.

Emergencies:
* Eight new incidents, making thirty-eight: an expired certificate in the customer shop, both ends of a network cable in the same socket, a manufacturer recall affecting your devices of all things, the annual test of the emergency power supply, an air conditioning unit set a little too well, a delivery in the fire escape, an update that redistributes itself, and a call in which everything is right except the department.
* Two of the new ones have a continuation. The call from head office becomes a story over three days that can be read up in the knowledge - if you follow it to the end.
* An emergency now has a tomorrow. Eight incidents get an aftershock the next day: the smell after the capacitor and the inspection report, the koi in the water butt in the meeting room, the invoice for the emergency router, Kevin's four handwritten pages after the near-deletion.
* The titles are no longer named after their type of disaster but after what actually happens - the display already writes NOTFALL in red anyway. Four incidents previously had practically the same name.
* The texts have been reworked: fewer capitals, fewer exclamation marks, and more precision instead. An emergency becomes tense through what you see, not through punctuation.

The weekly meeting:
* Twelve chains instead of six - so Friday repeats itself after twelve weeks at the earliest. New among them: the evaluation of the staff survey, a video link to the Southern branch with no sound, an appointment nobody attends, the preparation for the external audit, a pilot project with an assistant that has learned from your own ticket replies, and a workshop about too many meetings.
* All the meetings have got longer: three decisions instead of two and twice as many exits. The new middle section is what really makes meetings drag - the slide afterwards, the follow-up question, the colleague who would like to add something.
* No tickets come in while the meeting runs - everybody is sitting in the same room, after all. It lasts three quarters of an hour and there is no leaving it, so until now Friday could end in a dismissal there was no way to prevent, in the closing scene of a week you had otherwise survived. The time it costs stays, so the afternoon is as tight as it was.

The knowledge:
* The book now also covers the summer party, the weekly meeting, the consultancies, two persistent senders from the inbox and Jürgen from sales.
* Entries with unread notes highlight their number in the register. Open the book and you land directly on the new entry; after that the number sits there quietly again.
* Each of the seven colleagues has gained a note from the personal encounters - it records what you only find out about somebody once you have dealt with them for a while.

Bug fixes:
* Nine result texts told the player what the display underneath shows anyway - "Das Radar sinkt massiv" stood directly above "Chef -10". They now describe what actually happens instead of reading the number out. Nobody in this building knows they have a radar.
* Very long words with no break point - the coffee machine's error code, for instance - pushed the event text off the screen on a phone. Such words now wrap, and ordinary tapeworms are hyphenated rather than stretched. Affects events, results, the phone chat and the knowledge.
* A phone errand could briefly show a bar above 100 % before it snapped back. The value was never really higher; the display was a blink ahead of the cap.
* Continue a day that was saved before an update and the log named the version from back then, while the terminal header next to it named the new one. Both now agree.
* Begin a second day in the same session and it started with the tickets and the stats of the first one. Choosing the difficulty only set what the difficulty itself decides and left everything else standing - on Friday and Wednesday nothing at all was cleared, and even Monday carried the laziness and the boss radar across. A day starts as a day now.
* Kevin is the apprentice, not an intern - he had been promoted in five places, from his own call heading to a morning mood. Bernd is in sales, not logistics. The thick manual is Windows-95-Handbuch in all twelve places. And the boss's office is below the server room, not above it, which is why everything drips into it.
* Where two places named different figures, the smaller one was right: a full descaling takes seventy-five minutes and not ninety, and the ten minutes in the tea kitchen stay ten minutes - they are still the most relaxing of the day.
* Six spelling mistakes that had been standing since 5.0, among them a "Taffe" travelling across the table and a bellowed "STEKCER ZIEHEN, SIE IDIOT!". Plus three small corrections in the knowledge and the errands: Herr Aluhut has exactly one alias and not several, Frau Elster now accepts the donut that was actually put in front of her, and the error message stammered at Sarah from HR is complete.

The summer party:
* The six stations in the foyer now carry images of their own instead of emoji - beer mug, salad bowl, disco ball, armchair, cigarette and toilet. Emoji are drawn by the operating system and looked different under Windows, under Linux and in the Steam overlay; the foyer is by far the most-seen screen of the evening and now looks the same everywhere.

For developers:
* The four effects have the same names everywhere: m for minutes, l for laziness, a for aggro, b for boss. Before, f and c were German mnemonics in an otherwise English data model. Affected are options, fail and results (15,322 keys), the item blocks use and passive, the curve point in statHistory and the week row in weekLog. The time in the curve point is m now, no longer t - in an option, t is the button text, and the same letter with two meanings was exactly the confusion that was meant to go.
* The running state deliberately stays state.fl, state.al and state.cr, as do the display ids. The boundary is a rule rather than a list of exceptions: what you write carries letters, what runs carries fl/al/cr.
* Save files from 5.0 need nothing - statHistory and weekLog are converted on loading, on both resume paths and without anything being lost. Results no longer understand min, fl, al and cr as second names; the data checker reports them as an unknown field, so an overlooked key turns red rather than quietly turning into zero.

---

[5.0.0] - 2026-08-12

Until now a working day was an island: what began in the morning was forgotten by the evening. This version puts a second way to play beside it, one in which nothing is forgotten - five days in a row, with everything you drag along. On top of that, the interface gets icons of its own instead of emoji for the first time.

The Working Week:
* A second mode, equal in standing to the Working Day: Monday to Friday in one go. Fail and you end the whole week - not just the day.
* What you choose is not the weekday but Miller's condition: rested, irritated or in need of a holiday. It determines what Monday starts with and how well the nights restore you.
* Almost everything survives the night: backpack, reputation, laziness, events already seen and the stories still running. A quarter of the open tickets remain, rounded up - no ticket is ever a gift, but four cleared save one for tomorrow.
* Aggro and boss radar recover proportionally, and the recovery gets worse from night to night. Friday is not harder because the game gets tougher, but because four days are in your bones.
* The valve and the written warning come once per WEEK instead of once per day. Blow up on Tuesday and you have no second chance until Friday.
* Items can be thrown away in the backpack. The backpack still holds ten and nothing stacks - across a whole week that became a dead end, because tools slip past the cap when picked up and eventually no consumable would fit any more. Now it is a decision: keep the screwdriver or make room for the donut.
* Before you go to sleep, the night screen shows what the next morning inherits: tickets, values and excuses as before-and-after, plus a line above about how the night went. A strip across the five weekdays shows where you currently stand. The evening is for planning.
* The line under the heading picks up how the day went - whether you go to bed with a full inbox, whether your pulse is still up, or whether for the first time in ages nothing was left open. Every morning greets you differently as well.
* Friday has a finale: from 15:00 the way leads into the weekly meeting - with the boss, a rotating cast of external consultants and an agenda that interests nobody. Only after that do you clock off, even if it runs past half four.
* At the end comes the week summary: per day the values it went into the night with, and the totals underneath. If you fail, you can see which day it tore.
* The diary knows about the week: its own openings per weekday, an addendum about what is taken to bed, and a text of its own for a Friday survived.
* So that no area can be clicked empty, every pool has a daily quota. Once it is used up, reaching for it still costs time - the server room is simply suspiciously quiet then.
* Three new achievements: Weekended, Cast Iron and Clean Friday. All three are graded by difficulty as usual.
* An interrupted week is not lost. On the next start the Working Week button offers it for continuation, with weekday, time and open tickets - the working day already begun waits independently at its own button.

The Synergy Gala:
* The evening now has a time. The party starts at 17:00 and every station brings half an hour - glance at the clock and you roughly know how much longer it will take, without anybody putting a progress bar in front of you.
* The foyer no longer looks the same twelve times over: at the start people are still standing in little groups, later there is no getting through, and in the last hour the first ones are looking for their coats.
* Anyone reaching the gala at the end of a working week is told so - five days in a row are a different occasion from a single Friday.

Multi-day stories:
* Around 50 new events in the server room, the coffee kitchen, out on errands and on the phone - for the first time as stories that run across several days: what is put off on Monday escalates the day after tomorrow; what is ordered arrives the next day at the earliest; help somebody out discreetly once and from then on you are "the number". In the Working Day the openings sit in the pool perfectly normally - the continuations belong to the week.
* Consequences also jump between areas: the shortcut in the server room rings on the phone later, and a cold-call turns up in person at reception the following day - "as agreed on the telephone".
* The errands use their two faces as a narrative device: some stories start as a chat on the phone and end in the terminal, one runs the other way round.
* New faces make GlobalCorp bigger: Herr Blaschke from facilities, Frau Sonntag from accounts, a man in grey with a transformation project, Herr Grabowski (retired seven years ago, still calls once a year) and the Southern branch, which never answers the phone.

The knowledge:
* A new item in the bar, between Team and Archive. Miller records there what he finds out about this building: about the colleagues, about the people who keep calling, about rooms and about affairs nobody started that are running all the same.
* The pages fill themselves. Meet somebody and their entry opens; play a story further and you get the next note. What is still missing sits there as an empty line - you can see that a page is unfinished, but not what will be missing from it.
* Built like a notebook: the register on the left, the open page on the right, the four areas along the top each with their own colour. On a phone the register is the page, and a tap turns it.
* Progress belongs to the career, not to the day. What is once recorded stays recorded - across weeks and fresh starts alike.
* Plus a new case out on errands: a wrecked toilet, three observations and a comparison of the access logs. Stick with it over three days and you find out who it was. Whether that helps is another question.

Items:
* Two new arrivals, both with a catch. The boss's voodoo doll lowers aggro noticeably - but two floors up, Dr. Wichtig feels a cramp and finds himself thinking of you for no discernible reason, and the radar rises. The emergency tie works by itself: wear exactly his model and at every encounter he briefly takes you for one of his own. Both are hidden where nobody expects a present.
* Every item now has a cooldown of its own. Until now there was only one for the whole backpack - with the stress ball alone that never showed, but with the second tool, squeezing it would have locked the doll.

The backpack:
* The tiles now sit cleanly in the grid, even with only one item in it. The labels used to hang under the tiles and pushed the rows apart - on a phone that visibly broke the grid up.
* The discard button holds back until you need it, and only then turns red - in the same shade as the confirmation that follows. The explanatory line is gone: the tiles glow red anyway, and the text pushed the whole grid down when it appeared.

Settings:
* "Minimise phone automatically" is greyed out on a wide screen, and says why: the phone stays visible there anyway, so the setting can have no effect. Before, the switch could be flipped without anything happening. Make the window narrower and it is back immediately - the stored value is untouched.

Music:
* The music no longer changes with a cut. During a boss fight the office soundtrack breaks off instead of simply falling silent, and the fight music comes in hard - afterwards the office returns gently. It is not meant to be noticed; it is noticed beforehand, when it is missing.
* Anyone who has chosen a fixed music style in the settings hears it without the short gap at the end of each pass. In radio mode everything stays as it was; there a track has to finish before the next can be chosen.

The start screen:
* The boot text now reports the situation instead of claiming the same thing every morning: tickets carried over, the boss radar from the previous day, what is in the backpack. On Monday it shows the chosen starting condition, on Friday first of all the appointment you should not forget.
* From the second working day onwards, the greeting with the company name and copyright is dropped - five mornings a week do not need five rounds of introductions. That makes the start noticeably shorter.
* The remaining lines change from one time to the next. The excuse database loads a different module now and then, the number of ignored requests is never the same twice, and occasionally you notice when the backup was last checked.

Archive & statistics:
* The archive can be switched between Working Day and Working Week. Both views show the same four figures in their own unit, and underneath, how often which weekday or which condition was survived. The view chosen last is remembered.
* The item tiles in the archive now carry the same descriptions as the backpack: name, text and the line saying whether an item is used up - by hovering with the mouse, by tapping on a phone and on the Steam Deck. Until now only the name was there, and only the mouse got to see it. Items not yet found stay a question mark.
* A week counts as survived only with Friday evening reached. Every abandonment along the way lands under Rage Quit or Fired.
* The global Steam statistics have been given the same switch, with their own comparison values and their own diagnoses for the week. If global data is missing for a mode, the display says so instead of drawing empty bars.
* Both modes can be preselected in the settings, separately from each other: a fixed weekday for the Working Day, a fixed condition for the Working Week. Both are set to "Ask every time".

Display & layout:
* The interface carries icons of its own instead of emoji: 69 drawn icons for the action bar, terminal header, quick-start bar, settings, menu, dialogues and the night screen - in the same inked style as the items and portraits. Where the same thing is meant, the same icon appears: the snail from the survival manual turns up again by the laziness in the evening, the trophy from the quick-start bar in the archive header. If a file is missing, the old emoji appears again.
* The difficulty selection shows drawn motifs: a calendar page per weekday with a five-dot strip revealing where it sits in the week, and for the week mode Miller's mug in three states.
* All windows follow one form. The achievement message, the item prompt, and saving and loading were each their own construction from different eras; they now look like the rest of the game: a dark panel with an accent edge, an icon on a plinth next to the heading, warnings in a set-off box. "Delete save file" is marked as what it is.
* All windows now carry the coloured edge along the top that distinguishes every panel elsewhere in the game - the archive, settings, key bindings, statistics, excuses and the error message had frames of their own from earlier times instead. The corners are the same everywhere too: the coloured strip only reads as a continuous line with a sharp edge.
* The close crosses came in four different sizes and two different characters. They are now the same size everywhere, considerably easier to hit than before - which shows especially on a phone and on the Steam Deck - and at last labelled for screen readers.
* Saving and loading also say what they are about: the code contains the archive - items found, achievements, statistics and your reputation among the colleagues - but no working day in progress and no week already begun.
* The start window has been re-laid-out. The welcome text sits at the top across the full width, both modes stand beneath it as equal cards side by side, and the survival manual is on the right. The right-hand column no longer runs half empty.
* In the menu (ESC), a new item leads back to the main menu to change mode. The run in progress is saved in doing so and offered for continuation later.
* In week mode the header bar shows the weekday and the progress next to the time (MO, 1/5) - in the same colour as the clock beside it.

Steam version:
* The run in progress now travels to the Steam cloud as well - for the Working Day as for the Working Week. Until now only the archive travelled; a week already begun stayed on the machine it was begun on. It is saved regularly during play and immediately at the break points, that is after every night and at the end of a run.
* If there is a run on both machines, the one played most recently wins. If a run was finished on the other machine, the remnant left behind disappears rather than offering itself for continuation again.

Bug fixes:
* A single event can cost up to four hours. That meant the lunch break could be announced at half three, because until then it only knew "some time after twelve". It now has a window up to 14:00; skip it and you work through - nobody noticed.
* The dropdowns in the settings sized themselves by their longest entry. Adjacent rows visibly drifted apart as a result; now they are all the same width.
* In the start window, export and import used two different symbols for the same pair. Both now carry the same motif in two directions.
* The diary's memory list (recently used sentences, so that nothing repeats tomorrow) hung on an invalid storage key and therefore survived the hard reset - after which the diary avoided sentences from a deleted save file. It now has a proper name and is cleared out along with the reset.

* At the partner buffet in the canteen, "Photograph everything and send it to Frau Elster" demanded the prince's black card for no reason - which made the option unreachable for almost everyone. It is now open to all.
* Callers explained their mood in their name ("Die Sekretärin (Wütend)"), and some answers carried a tag in front of the actual decision ("Tech-Pfusch: ..."). The mood is in the text, where it always was; the tags are gone - seven titles, twenty-five answers. Department suffixes such as "(Buchhaltung)" stay, that is caller display.
* Text maintenance in the stock: two typos and a handful of fixed clock times in events that can occur at any time of day ("Um 13 Uhr bricht Panik aus" - at nine as well).

For developers:
* The knowledge stores evidence rather than unlocks: state.archive keeps seenEvents and seenFlags, and everything else is derived from them when it is opened. Notes added later therefore light up retrospectively for existing save files. The data checker holds the entries to their evidence: event ids and flags are checked against the stock, and an entry may carry at most as many notes as it cites scenes.
* Items: cooldowns live in state.itemCooldowns per item id, use additionally understands cr, rep and wait, and the new class passive takes effect when an event with the associated character is opened. The data checker knows all the new fields and enforces: costs only with a cooldown, passive effects only negative, req and rem never together on the same item.
* The week mode lives entirely in src/engine/engine_week.js. The day mode is unchanged: state.difficultyMult remains its identity boundary, all formula sites read effMult() or statMult(), and the night resets the day through freshDay() and afterwards writes back only the carry-over - a newly added day field cannot be forgotten there.
* Counters are separated by mode: weekdays no longer increment the day counters, and the week counts through recordWeekResult(). The streak still counts across modes, because a survived weekday is a survived day.
* Four new Steam statistics (stat_weeks_started, _survived, _ragequit, _fired), and stat_started is no longer fed from daysStarted - that counter numbers the company chronicle and therefore also contains weekdays. The query in main.cjs now fetches eight names instead of four.
* tools/simulate-week.mjs (npm run sim:week) computes whole weeks, with the same formulas as the day simulator. The week's balance was calibrated with it before building.
* Three test suites under tools/ (npm test) check the foundation, the flow and the developer tool of the week against the real modules - 88 tests.
* tools/dev-woche.js sets up test commands for the week mode in the browser console: produce any weekday, trigger the night screen or the Friday finale, unlock the gala, view and clear counters.


[4.1.0] - 2026-08-07

A maintenance update: the same events, the same consequences - but better told, consistently labelled and freed of a series of old quirks.

Events & texts:
* Every event has been editorially reworked, in several passes: first against bareness and verbatim repetition, then against the narrator who explains his own punchlines. Closing sentences like "Du hast gewonnen, aber du bist ein Monster" have been cut or replaced with a reaction - the verdict is the player's again. Options and effects are unchanged.
* The diary at clocking-off time tells you about the day rather than about the achievements: whether it was on fire early or only tipped over after two, how many mugs it took, who thinks differently of you this evening than they did this morning. Recently used sentences are skipped - repetitions have become rare.
* Openings and phrasings no longer sound like a template: kit-built sentences such as "plötzlich", "Du hast X, aber Y" or "Du fühlst dich ..." now appear only where they carry a character or a punchline.

Display & layout:
* The option buttons no longer give away in advance what an option means. Labels in the tag style ("Lüge: ...", "Auflegen (Angst)", "Tech-Lösung: ...") have been converted into what Miller does or says.
* In the backpack the item descriptions now also open on a tap - important on a phone and on the Steam Deck. One tap shows, a second uses.
* Images are there immediately when something opens: portraits, items and trophies are preloaded at startup.
* In the messenger the action buttons are shorter ("[Chat stummschalten]" instead of "[System: Chat stummschalten]"), and chats with known characters show their portrait instead of the initial - in group chats even per message.
* The narrative texts are no longer in quotation marks. The wrapper claimed a speaker who does not exist; direct speech is marked within the text anyway.

Bug fixes:
* The leaked redundancy list can now be deleted and ignored like any other mail.
* In the colleagues' group chat, the reputation penalty for ignoring the gossip now works as intended.
* The key bindings reliably show which key is already assigned or reserved.
* The excuse is drawn per event rather than every time the window is opened - previously the supply could be leafed through without consequence.
* The call button and the ticket counter now warn at the same figure: from eight.
* In the archive the icon shimmered through behind cut-out items, and in the backpack the descriptions protruded past the edge on narrow screens. Both fixed.
* The diary no longer swallows encounters when a day produced several.
* "Reset to defaults" now updates the visible switches as well.
* Escape was a back door past decisions: over the continue prompt, the day selection and open mails it opened the menu on top - and a click there could discard the day being offered. Closed.
* The "…" badge on answers only promises further conversation when a dialogue node actually follows.
* Exporting and importing a save file works again, from the start window as from the settings.
* On a phone the page scrolled behind stacked windows as soon as the top one was closed.
* Three lunch options did not consume their item (energy drink in the sun, eating or giving away the donut). Now consumption costs what the text claims.
* Spelling, grammar and logic errors in various events fixed, among them a mixed-up proverb and, twice, the wrong gender for Fremdscham.

For developers:
* The data checker (npm run lint:data) knows five new rules, among them unknown fields per context: a req in a mail is now an error rather than a silent dud. The rules found two legacy problems, including the swallowed reputation effect above.
* The label of an answer is called t in all data files; in the inbox the same field was historically called btn.
* Phone events evaluate char per node as well - for group chats; char: null forces the initial.
* The prose report (tools/report-prose.mjs) has three more sections: the old register in labels (compound prefixes such as "Tech-Lösung:" included), templates in openings, and a frequency count of recurring phrasing patterns - the last deliberately as a reading list and a before/after measurement, not as a list of errors.
* Settings and key bindings are standalone components; no control is filled in from outside on opening any more.
* Overlays all run through the same three functions (showOverlay, hideOverlay, isOverlayOpen), and the scroll lock through a set of named holders - each ends a class of silent bugs, one of them a reproducible data-loss path.
* What an item does lives entirely with the item (the use block in data_items.js) instead of in five places. All 30 items behave unchanged, measured.
* PROGRESS_KEYS in keys.js is now actually the list that deletion works from.


[4.0.0] - 2026-08-03

The biggest update this game has ever had. Beneath the surface the entire foundation was renewed, and above it more than 165 new events have arrived. Anyone whose last game was version 3.2.2 will find a different one.

New:
* Over 165 new events across all five areas of the working day: 41 in the server room (where Chantal, Markus, Gabi and Dr. Wichtig now lose their way too - until now the room belonged to Kevin and Egon alone), 21 at the coffee machine, 27 out on errands and 17 in the inbox. Among them the ENTKALKEN crisis complete with Kevin's instant black market, Dr. Wichtig in front of two buttons ("Machen Sie mir das, was ich immer trinke"), the riddle of "Projekt Phoenix", Kevin's four voice messages (4:32 minutes, content: the screen is "odd") and the out-of-office infinite loop at 14 mails a minute. Frau Elster writes for the very first time.
* The phone used to be the most frequent action with the fewest consequences. That is over: the call pool has grown by more than a third, and every second call can catch up with you later. New among them the colleague whose camera stays black (the most convenient route ends with the client seeing her entire screen), and a recurring appointment with no organiser that has been in 17 people's calendars for four years - delete it and on Tuesday you send four people into an empty room.
* Decisions no longer stay on the phone: 12 calls carry on somewhere else. The machine Kevin reinstalled on your instructions turns up in the rack in the server room later - cabled, with a dragon sticker and a program selling compute power overseas. The password you passed on over the phone is stuck to the monitor on your next errand. And if you left Gabi hanging, you will find a drawer in the tea kitchen that was not there before.
* Old acquaintances now have a memory too, and a different one depending on your decision: force Kevin to format and you get a machine back with an operating system of unclear provenance - help him and you get his mother with a laptop at reception. Counter Chantal's blackmail and you get it out in the open; give in and half of sales is on the phone in the afternoon, because word has got around that IT unlocks things if you ask nicely.
* Around 20 side tasks that were previously only in the Steam version are now available in the browser too. Both versions are on the same content from now on.
* An interrupted working day is no longer lost. The game saves after every event; close the browser or crash and on the next start you are asked whether you would like to carry on working - with weekday, time and open tickets as a reminder.
* The end screen has been rebuilt. In the summary it highlights the value the day broke on, and offers two things to unfold: the course of the day as a curve - you can finally see that the blow-up just before two was already set up at half ten - and your personal logbook as a written-on sheet of paper.
* The team overview shows what the day has moved: next to each colleague the change since this morning, and under the bar the distance to the next tier. The absolute value alone does not, after all, tell you whether you are currently doing something right.
* The archive counts more than four figures now: a streak of days survived with its record, three bars for Friday, Wednesday and Monday separately - survive ten Fridays but no Mondays and you see exactly that - and a footer with valve rescues and written warnings.
* Items now reveal whether they survive being used: reusable, consumed or trophy. Until now you only found out once something was gone.
* Survive a working day flying blind from the very first minute - no percentages, no ticket counter - and you find an addendum about it in the logbook. Hide the numbers only from lunchtime onwards and you do not get it.
* One series of events runs through three areas of the building and starts entirely harmlessly. The second time you wonder, and the third time the only answers left are ones you had better not say out loud.
* The company chronicle has blank pages at the back, and nobody has forbidden Miller from adding something: one handwritten sentence per working day, depending on what has befallen him. Somebody who has already left the building several times without saying goodbye writes differently from somebody in their first week. The entries stay in the archive.
* The noticeboard is no longer stuck: 29 notes instead of 6, and every working day gets its own selection - from the lottery syndicate that has not won in eleven years to the ficus called Hubert looking for a sponsor. 8 notices only hang there if you caused them: descale the coffee with vinegar and you find the complaint from the second floor.
* The company intranet knows who you are. "Employee of the Month" goes to the colleague who thinks most of you - and is not awarded at all if nobody reaches the threshold. The Company Feed reports in the finest corporate German what you have got up to today: the same incidents that are honestly commented on the noticeboard, here as a process or a success. Plus a Wall of Deals that knows about deals saved and deals lost, an imprint whose version number rises with every working day without anyone ever finding out what was changed - and a key figure of the day presenting your ticket backlog as a business variance. No visit looks like the last one.
* Behind the HR login lies a second personnel file. It is yours. It keeps written warnings, unexcused departures and a salary that does not rise - the better your standing in the building, the more explicitly HR justifies why an adjustment is not required. The password is the same as for the first account, because GlobalCorp only issues one. It is in the news ticker and in a new email with which staff development accidentally sends it to IT, since you work with computers all day anyway.
* Two small things for people who look closely: once per working day, something happens in the log at exactly 13:37. And anyone opening the developer console is greeted there by H.A.L.G.E.R.D. in person.

Game balance:
* Wednesday has tightened up: stat effects come out ten percent stronger on the normal difficulty. A purpose-built day simulation showed that an attentive player got through it almost risk-free. Friday and Monday are unchanged.
* 15 new events are traps: situations in which the answer that sounds sensible is not the one that is sensible. A critical two-minute update, a door held open, ownerless cake in the corridor. 8 of them make the screen shake - step on the bait and you notice immediately.
* The morning decides more than before: alongside irritation, the boss's attention and oversleeping, there are tickets that have piled up overnight, a cancelled excuse allowance - and one extra excuse when the building plays for you for once. 18 new morning texts, and the values follow the weekday: Friday forgives, Monday does not.
* 3 new lunch breaks, two of them with a false bottom: a free buffet sponsored, of all people, by the service provider that wants to replace internal IT, and a cookery demonstration on the wrong socket.
* The disasters are less forgiving: let the countdown run out and in all 30 you fare worse than with the worst active decision - until now doing nothing was the more comfortable choice in four cases. Improvised fixes without the right tool cost more where the consequences were obvious: a board livestream in 240p is still an embarrassed board.
* Sitting out time without consequence is gone. No action takes less than two minutes (nearly 190 answers were almost free), long actions have consequences throughout, 10 time-consuming answers in the old stock had none until now, and four answers even turned the clock back.

Display & layout:
* The order of the answer options has been redistributed. Until now the cheapest answer was at the top in over half of all events - anyone who noticed clicked the first line from then on, and the decision no longer happened. Now the best choice is evenly distributed across all the slots. Cancel, ignore, hang up and delete stay where people look for them: right at the bottom.
* The terminal is no longer a black void: a hint of a CRT monitor with fine scanlines and a faint glow from the centre of the screen. All static, nothing flickers, and it can be switched off. The terminal and the status bar now sit on two levels, so that the eye goes where something is happening.
* The rounded corners are considerably sharper. The previous 8 to 12 pixels were contemporary web design and did not suit corporate software that has not seen an update since the nineties.
* The terminal changes colour with the type of event - blue for a call, red for an emergency, yellow for an encounter. The result display is the sibling of the event card rather than a floating grey box.
* The keyboard hints look like little keycaps instead of grey boxes and visibly sink into their base when pressed. Identical in all four places - the action bar, the answers, the phone and the inbox all had slightly different ones before.
* The call button looks like the other three. Until now it was permanently highlighted and therefore the obvious choice - when the whole point is to find the mix yourself. The highlight now only appears once the tickets become critical.
* Answer options indicate when they consume an item, and do so while they are still selectable. Locked ones uniformly report "Fehlt: <item>".
* The result texts no longer contain technical notes such as "(Inventar +1)". That only duplicated what is visible anyway; 86 places cleaned up.
* The news ticker runs at an even speed. Until now every item took the same 30 seconds regardless of its length - the longest were barely readable. The type is slightly larger and no longer entirely in capitals.
* Modals, event cards and the start sequence fade in softly instead of snapping open; achievement messages fade out cleanly.

Settings:
* Tidied up: the warning pulse, the camera shake and the phone speed sat under "Gameplay & comfort" although they are purely display matters. The two hiding options have been given a section of their own, "Challenge", because they are not comfort but a difficulty setting.
* New: text size in three steps, a switch for the screen texture, the day curve on the end screen open by default - and a button that resets all settings. The working day in progress is not lost in doing so.
* The inventory slots can now be operated with the keyboard, and the confirm key also works in the tutorial selection window at the start of the game.

Bug fixes:
* In 38 events the picture of the colleague concerned was missing - Kevin's voice messages, Egon's grudge, Gabi's panic and the boss's chair showed an empty card. Four events now affect the relationship with the colleague it was about all along, and in one case the wrong person got the credit.
16 events accidentally shared an id with another. Since each id occurs only once per day, these pairs locked each other out - only ever half of them was reachable. Affected: the chains around the toilet, the cake, the fire alarm, the printer and the office chair.
* 5 events were not reachable at all, because their precondition could not be met anywhere: the rumour mill around the old list, Egon's waste separation, Kevin's petition, the bowl delivery and Kevin's RGB idea.
* The party ending "INSIDER" could not be completed: the result text contains direct speech, which made the button technically unusable. Special characters can no longer disable a button in general.
* Reputation changes from phone chains were never applied. 37 conversation exits specified an effect on the relationship with a colleague that was simply lost.
* Seven answer options promised items that do not exist or whose name was misspelled - the parcel from Gabi, the coffee for the plant, the hoarded toner cartridge. The hot coffee for Gabi was permanently locked, and in the fire-safety event the extinguisher stayed in the backpack despite "Hand over the extinguisher & flee".
* Two emails carried the same subject line and blocked each other. The inbox now distinguishes mails by their id rather than by their subject.
* The event "Materialermüdung" has been given a third answer without an item. Anyone who had thrown away the stress ball and had no duct tape was otherwise stuck in front of two locked answers.
* In the server-room event about the old list, "Touch nothing and leave" had no consequences. Kevin now finds the list himself instead.
* "Delete save file" now also resets the tutorial, and tutorial progress is actually transferred on export and import. When syncing with the Steam Cloud it is only ever unlocked and never reset again.
* The ticket counter was displayed larger than the time next to it on small screens; on the idle screen the type no longer adapted to the width after the first return.
* The time bar of an emergency did not start full again on the second incident but with what was left of the previous one. During the Synergy Gala an office message could still appear in the ticker.
* 10 result texts were only keywords ("Maximaler Stress.", "Du rennst los.") and named a state instead of showing the scene.
* In one private call, formatting characters sat in the middle of the text. In the error report the inventory list was unusable, and the difficulty was always reported as "Normal".

System & stability:
* The game starts considerably faster. Until now all the event texts were loaded when the page was called up, including those of the party finale that most people never see. Now only the essentials load first and the rest follows in the background - the amount of data at startup drops by around 92 percent. The music tracks, too, only load when they are played.
* The typeface is delivered as WOFF2 rather than TTF: 41 kilobytes instead of 540. The achievement images are now WebP.
* If an unexpected error occurs, the controls are automatically released again instead of freezing the day. Before, only a reload helped - which meant the whole working day was lost.
* On restarting a day, individual states from the previous run were retained: an open phone message or a conversation already begun would reappear in the middle of the new morning. Expired timers were not cleared either, which could mean no more emails arrived for the rest of the day.
* The activity log is no longer rebuilt in full when something is appended. On long working days that caused delays, interrupted animations and cleared text selections. It is also capped at the last 50 entries.
* The browser and desktop versions share the same start page. Menu items show and hide themselves: full screen, "Quit game" and the global statistics only in the Steam version, the link to the project page only in the browser. Anyone who bought through Steam no longer gets a purchase prompt.

For developers:
* Move to Vite with Svelte 5. The interface consists of 34 components instead of assembled HTML strings; around 1,200 lines of display code have gone, among them buildEventHTML (228 lines), openArchive (231) and renderGlobalStats (158).
* The game state is reactive ($state in engine_state.svelte.js). The engine changes it as before, and the display follows by itself.
* Tailwind CSS 4 instead of the previous version. That changes nothing about the appearance; the foundation is current again.
* The seven intranet pages are components rather than standalone HTML files in an iframe. The old construction needed a hand-copied Tailwind output for a document the bundler never got to see - and when that copy went stale, the pages were displayed raw. Now they share the game's build, and the compiler checks them too.
* The build lands in docs/, because GitHub Pages serves directly from the branch (main + /docs). The build is committed along with the source; the Electron loader and the packaging move to docs/ as well.
* A new platform layer (platform.js / platform_steam.js): cloud saves, achievements, statistics, friends-list status, full screen and external links all run through a common interface. The engine no longer knows Electron and Steam directly.
* The engine has been untangled. checkEndConditions (176 lines with two word-for-word duplicates and twenty blocks of text in the middle of the control flow) now consists of a 46-line switch and five named functions. For items, reputation changes and the start of the day there is one shared function each instead of two or three near-identical versions - one of which had not known about a rule.
* All the localStorage keys live in keys.js, which state, interface and audio import together. Before that they lay scattered across several files as bare strings - exactly the class of bug that had knocked the tutorial marker out of step.
* A new factory function freshDay() supplies the complete day state; the day restart replaces it in one step instead of resetting around 45 fields individually. A new field can no longer be forgotten - the same source also determines what is written to the interim save.
* Further repetitions consolidated: opening and closing full-screen windows stood in 33 places as three lines each - and where one forgot the scroll lock, the page kept scrolling behind the dialogue. The rule for how often a follow-up event gets priority sat in the code three times and now stands there as a named constant; the narrative pace of a whole working day hangs on that number.
* The answer options are no longer written into the page as text. The action entries in data_party.js are structured objects rather than executable strings; they are resolved through a method lookup, not through eval.
* The lunch break is an event pool of its own (data_lunch.js) rather than a property in data_special.js. At 44 entries it is as big as half a coffee pool and now loads on demand like all the others. Side effect: it goes through the data checker for the first time, which promptly found four almost consequence-free answers of up to thirty minutes.
* Every errand event declares its kind (kind: text or phone); until now the field was missing on 63 events.
* A new checking tool, tools/lint-data.mjs (npm run lint:data): duplicate ids, broken item references, unreachable dialogue branches, dead story branches, events with nothing but item-requiring answers, breaches of the basic balancing rules, reqStory on the noticeboard and the intranet, markup in plain text fields, and time references in follow-up events. All of them errors nobody notices in the game; they only mean something never appears.
* A new tool, tools/simulate-day.mjs (npm run sim): plays complete working days against the real data pools with the exact engine formulas - four player types, three difficulties. The balance changes in this version have been calculated against it rather than guessed.
* Two one-off tools, both repeatable: tools/reorder-opts.mjs distributes the option order, tools/normalize-quotes.mjs normalises the quotation marks in source and game text.
* STRUCTURE.md describes the structure of the project and the conventions for the data files.


[3.2.2] - 2026-04-08

New:
* From now on the game lets you extract yourself temporarily from taxing problems and conversations with a creative emergency excuse.

System & stability:
* The file structure of the game data has been moved to a modern standard (modules). That improves loading times, makes the game more performant and prepares the architecture for larger content updates to come.

Bug fixes:
* A display bug on the "Löschen & Ignorieren" buttons in the email system has been fixed, which rendered the wastebasket icon twice.
* A change of music style is now correctly processed in the background and applied the next time the music is switched on, even if the music was paused at the moment of the change.

[3.2.1] - 2026-04-04

New:
* Emails now have an in-game cooldown of 25 minutes to avoid constant barrage. Answers also consume in-game time dynamically now and can grant items (loot).

Display & layout:
* Newly looted items now "fly" into the backpack with a short animation, so that trophies in the inventory are better noticed.

Bug fixes:
* A bug in radio mode (background music) has been fixed, which stopped the next track playing automatically while idle.
* A rendering bug has been fixed, which sometimes stopped the "Löschen & Ignorieren" button being drawn while hotkey overlays were active.
* The email system has been freed of hard code dependencies. As a result, no more duplicate "delete" options arise.
* Further small bug fixes in the background, typo corrections and text adjustments.

[3.2.0] - 2026-03-28

New:
* The new radio mode plays various tracks in turn (including new lo-fi and jazz beats). Alternatively, every track can still be set to loop individually.
* A rage quit at 100 % aggro no longer ends the game immediately. On the first blow-up Miller now withdraws briefly to let off steam.
* The warnings for the boss radar and the new aggro valve are no longer static. There are now 10 alternating variants of each, played at random.

Display & layout:
* If the aggro valve was used or a written warning collected, this is now immortalised at the end of the day as a warning badge on the daily report and in the personal logbook.
* The end modal now adapts visually with its own accent colours to the respective outcome of the day (clocking off, rage quit, dismissal).

Balancing & bug fixes:
* The duration of the timer for reading emails has been increased from 15 to 20 seconds, to take the unnecessary rush out of an incoming email.
* Open tickets are only counted up to 16:30 in the final reckoning. Late events no longer generate tickets after the end of the shift.
* After a boss fight the dramatic music no longer carries on incongruously into the daily report but switches back seamlessly to the normal office music.
* Material fatigue: the anti-stress ball loses a little of its effect and now lowers aggro by 5 points per hour (previously 10).
* Further small bug fixes in the background, typo corrections and text adjustments.

[3.1.0] - 2026-03-26

New:
* A manual "restart day" now comes with an atmospheric boot sequence, complete with the classic PC beep, that noticeably brings the system up
* Items can now also be demanded as a precondition or consumed directly at the answer selection in smartphone events
* Collect a written warning from the boss and an unmissable red stamp now sits on your own profile card in the team modal
* A guided, interactive simulation now teaches new sysadmins the basics of survival at GlobalCorp in the tutorial
* The GlobalCorp news ticker now sporadically reports company news at the terminal
* The company intranet has been extended with a hidden, strictly confidential HR file

System & stability:
* The save system (export and import) has been hardened considerably and is now future-proof
* Outdated game content is now cleaned up automatically when older save files are loaded

Bug fixes:
* A critical crash when importing older save files has been fixed

[3.0.0] - 2026-03-23

New:
* The browser game no longer has any external dependencies (Tailwind CDN, Google Fonts, graphics included locally)
* Offline mode is now possible if the whole project is downloaded
* The game settings have been reworked and now offer more sound and keyboard options
* Three different kinds of music added (general, boss fights and for the gala)
* The start modal has been visually reworked, now looks more modern and shows the game's logo
* All achievements now have a graphic of their own and offer a strong hover effect on a desktop
* The character portraits are now displayed visually in the terminal for character-related events
* Items now offer a detailed tooltip window with flavour texts on hover in the backpack
* Automatic sorting of items in the quick inventory and the backpack (consumables stay within reach)
* Consumables (donuts or energy drinks, for instance) can now be collected and held in the inventory more than once
* A new, secret intranet page has been added and is waiting to be discovered
* Lunch now has an icon and a coloured frame of its own
* Several further events have been added for the various actions

Bug fixes:
* A bug has been fixed which meant the bubble wrap (bubble_wrap) could not be used
* Email performance problems have been fixed (stuttering and sluggish behaviour of the selectable options)
* Story flags (follow-up decisions) are now correctly reset on "restart day"
* Incoming emails are now reliably blocked during a boss fight (incorrect timer behaviour fixed)
* A display bug has been fixed in which the daily report still listed achievements from a previous, abandoned run
* A critical bug has been fixed which froze the game if an email or a call was finished shortly before clocking off (with the gala starting at the same time)
* An exploit in the morning event "Verschlafen" has been fixed, so that the loss of 30 minutes is now properly punished with a support ticket
* A bug has been fixed in which email windows could wrongly open in the middle of the Synergy Gala, because background timers were not stopped correctly
* A bug has been fixed in which invisible background timers kept running, which could cause events to be triggered during the game-over screen
* A bug has been fixed in which delayed follow-up emails could wrongly turn up in the new run after a restart ("restart day")
* A bug has been fixed in which invisible background timers of the phone kept running after an abort and accidentally triggered actions on the new day
* A logic bug with items has been fixed. When the inventory was full, items could be lost even if items were lost in the same step
* A logic bug in the email spam filter has been corrected, which could accidentally block legitimate messages after a restart of the day
* A logic bug has been fixed in which items received through the phone could ignore the regular inventory limit
* Email chains are no longer interrupted by random mails, and there is a short cooldown after the window is closed
* A critical bug has been fixed which meant party mode stayed active after a restart and blocked the game
* A bug has been fixed which could leave items with a cooldown (the stress ball, for instance) permanently locked after a restart
* A bug in "restart day" has been corrected, so that the written warning from the boss is now properly reset
* Further small bug fixes and structural adjustments in the backend

\[2.8.1] - 2026-02-29
* Follow-up events in encounters now also get a higher priority (30%), where they exist
* Critical bug fix for encounter events, which did not always trigger follow-up events reliably
* Compact mode now remembers that it is switched on (to be found in the system settings)

\[2.8.0] - 2026-02-29
* Follow-up events have a higher priority (30%) in the pool once they are unlocked
* New events for boss fights, lunch, coffee, errands, the server room and calls
* The game setting "Minimise phone automatically" is now on by default
* Phone event values are now defined consistently in data.js (f,a,c instead of fl,al,cr)
* Small corrections to a number of events that were reported

\[2.7.0] - 2026-02-27
* The big company party starts once all the character events have been successfully collected
* The Internet achievement has been replaced by the new Synergy Veteran achievement
* The menu now offers further game settings to adjust (compact layout and minimise phone)
* Scroll chaining in the active modal (intro, teams, menu, etc.) has been fixed
* The result on the end screen is now displayed in the right colour
* All events with 0-minute options have been raised to 2 minutes
* Further small bug fixes for events and in the backend

\[2.6.0] - 2026-02-24
* The menu now offers further game settings to adjust
* By default, the pulsing of aggro / anger and the playing of sounds are on
* The presentation of the canteen has been optimised for mobile devices

\[2.5.2] - 2026-02-22
* The last mood event is now saved, so that it does not appear again the next day
* Further mood events, for more variety among the events
* Further diary entries, for more variety in the diary
* A few more events for coffee, errands, the server room and lunch
* Small bug fixes in the backend

\[2.5.1] - 2026-02-21
* In the active tutorial the action buttons are no longer disabled
* The global statistics have moved from the menu into the archive
* The global statistics now also collect days started
* Slightly adjusted layout for the archive

\[2.5.0] - 2026-02-21
* There is now a global menu, and it can be opened / closed with ESC
* There is now a mood modal explaining Herr Müller's mood at the start of the day
* Two new consumables have been integrated into the game, which can so far be obtained at random
* The confirmation modal for consumables now loads the correct image
* Paragraphs (\n) are now possible in events, as they already were for some call events
* Some new call events have been added to extend the pool for calls
* The blur effect now also applies to the birthday cake, if you allow it

\[2.4.1] - 2026-02-20
* Critical bug fix for phone events, so that story flags (Next/ReqStory) are now applied correctly
* The donation event link now opens correctly in a new window

\[2.4.0] - 2026-02-20
* Rep events (encounters) now also have filler standalone events, so that every character feels more alive
* Many phone events have been reworked in their text, so that it feels more like a real chat
* The reputation system now also applies to phone events, where it is assigned for a character in the event concerned
* A few phone events have been replaced by new ones, including their follow-up events
* A side quest for donating has been introduced and integrated seamlessly into the game (there is no advantage in this event)

\[2.3.3] - 2026-02-19
* Events with a lot of text or options are now readable at increased scaling or at a low resolution on the desktop
* The log description for reputation events (encounters) is now consistent with the rest of the log

\[2.3.2] - 2026-02-19
* Emails no longer occur during a boss fight (avoiding two simultaneous timers)
* Boss fights are now only triggered from 9:00 onwards, for a quieter start to the day
* Active events now have the title of the selected action (coffee, errand, server room, call)
* Rep events (encounters) now have the book as their icon by default
* The difficulty modal can now be operated correctly on mobile devices, like the start modal
* Some legacy problems dealt with and corrections made in the backend (engine.js)

\[2.3.1] - 2026-02-18
* Bug fix for events where minutes were not set (the game reported NaN as an error)
* A fail was always triggered in a boss fight, even when an option had been chosen
* Correction of some events where the minutes were missing or in the wrong format

\[2.3.0] - 2026-02-18
* The boss fight timer has now been built into the event, so that it has a consistent design
* Various bug fixes for the boss fight (duration of the animation and the logic of when boss fights occur)
* There are now reputation events, which take effect at positive / negative reputation
* The characters' story events have been moved over to reputation and adjusted (two parts instead of three)
* New events for coffee and for side quests, which can also occur in the normal pool
* Small visual event adjustments, where the border is now coloured to match the event
* Small bug fixes in the code that had come up in the backend

\[2.2.0] - 2026-02-16
* The reputation system has been introduced (found under "TEAM") for coffee, side-quest server and calls
* A small sip with Bernd shows that you should not drink at work (easter egg)
* Reported bugs with the stats have been corrected (thanks for the feedback!)

\[2.1.0] - 2026-02-14

* The collection book (archive) can now be exported and imported from the start modal
* Some options were not selectable in various events, which has now been corrected
* Small spelling mistakes in various events have been corrected
* Small visual adjustments to the start modal, to smarten it up a little

\[2.0.0] - 2026-02-13

* Server, coffee and side quests now have follow-up events on almost every event. Every decision will generate new events!
* There is now the option of handing items back in when they are in the inventory (remove item)
* Times are no longer shown in advance, so that every decision has to be thought through

\[1.5.0] - 2026-02-12

* There is now a small diary summarising the working day on the end screen
* A new (secret) event (easter egg) has been added to the pool

\[1.4.0] - 2026-02-11

* The animation for changing the stats is now displayed more smoothly
* Stat changes are now additionally accompanied by floating numbers at the stats
* The stats are now shown in the respective event result
* A new (secret) event (easter egg) has been added to the pool
* A new achievement to discover has been added

\[1.3.1] - 2026-02-10

* The people in the team have a zoom in desktop mode
* Two existing events have been beefed up, to bring the cable item more into the game

\[1.3.0] - 2026-02-09

* The team now has pictures for each person
* Items now have a proper image for the inventory and the archive
* The quest series of the respective characters now have a book as their icon
* Bug fixes for phone events, where the stats did not update
* Some events had wifi\_note as a requirement, which has now been removed

\[1.2.0] - 2026-02-07

* Report function built in, to get in touch with me (bugs, feedback, general)
* Small corrections to various events, to adjust the balancing.

\[1.1.2] - 2026-02-05

* Some emails had no id, which meant they could arrive more than once.
* Some new follow-up events for various areas
* Duplicates have been cleaned up

\[1.1.1] - 2026-02-05

* One event was assigned to the wrong category, which has been fixed
* Some new follow-up events for the server room and side quests (phone)

\[1.1.0] - 2026-02-05

* Emails have been reworked (new design, new logic, mobile-optimised)
* Achievements are now visible and have a hint on how to unlock them
* The result of the messenger is now displayed correctly and automatically
* Corrections in the backend, and legacy problems cleaned up

\[1.0.2] - 2026-02-04

* The quick inventory and the backpack are visually identical
* In the collection book (achievements), items and achievements still outstanding are easier to make out
* The width and height of the events are better optimised for mobile devices
* The new calls now contain all the relevant conversation information at the start
* In side quests and the server room the icons visible in the event have been corrected.

\[1.0.1] - 2026-02-03

* Small translation error corrected
* The button size for the answers in the terminal and the chat has been optimised

\[1.0.0] - 2026-02-03

* New chat \& decision layout for all actions
* A new kind of telephone call has been added as well (live calls)
* Dynamic quests have been introduced, whereby some events depend on decisions
* Character missions for the important people have been added (The Suspects)
* Archive \& collection book have been added and are saved in localStorage
* Legendary trophies and new items have been added
