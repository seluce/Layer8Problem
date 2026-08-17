# Layer8Problem — Building events (a contributor's guide)

Would you like to contribute an event of your own? This page explains how events
are built — with a complete example for every type. All events live as
JavaScript objects in `data_*.js` (one file per area: `data_coffee.js`,
`data_server.js`, `data_calls.js`, `data_sidequests.js`, `data_reputation.js`,
`data_lunch.js`, `data_bossfights.js`, `data_party.js`, `data_emails.js`). A new
event is simply one more object in the array of the appropriate file.

**Every one of these files exists twice.** `src/data/de/` is the source,
`src/data/en/` the English version — 23 files each. Both carry **the same ids,
story flags, character names and numbers**; only the prose differs. That is what
makes a save file language-independent and lets you switch in the middle of the
week. A contribution therefore needs **both** versions — the same `id`, the same
values, translated text. `npm run lint:parity` enforces it.

Writing happens in German first, from Miller's point of view ("du"), in the
present tense; translation comes afterwards. Comments in the code and file names
are English. To try things out: `npm install`, then `npm run preview`; before a
pull request **`npm run lint:all`** — four checks (both data trees, interface
strings, parity), and all of them have to pass with no errors and no warnings.

The examples deliberately show the **full build**: everything that is possible
in one place, all at once. Almost everything may be left out — but whoever knows
what exists leaves things out deliberately rather than by accident.

The example prose stays German throughout this guide. That is not an oversight:
the German tree is the source, so this is what an event looks like when it is
written.

---

## An event in full

The basic type, as it appears in coffee, server room, errands and calls:

```js
{
    id: "cof_spinat_1",                          // required: unique across ALL pools
    char: "Chantal",                             // optional: shows Chantal's portrait beside the text
    title: "Der Spinat-Kern",                    // required: the heading of the event card
    text: "Chantal steht mit einer Tasse vor dem Automaten und liest die Anzeige, als wäre sie ein Vertrag. 'Was ist ein Kern-Spülgang und warum betrifft mich das?'",   // required: the opening
    opts: [                                      // required: two to four options, usually three
        {
            t: "Ihr erklären, was der Automat gerade tut",   // required: the button label
            next: "path_spinat_erklaert",        // optional: sets a story flag for follow-up events
            rep: { "Chantal": 5, "Kevin": -2 },  // optional: reputation with colleagues
            m: 5, l: 0, a: 0, b: 0,              // house style: always all four, zeros included
                                                 // (exception, the party: only l and a, see 9)
            r: "Zwei Minuten Erklärung, danach nickt sie zufrieden und drückt trotzdem den falschen Knopf. Immerhin weiß sie jetzt, welchen."   // required: the result
        },
        {
            t: "Ihr den Donut aus dem Rucksack anbieten",
            rem: "donut",                        // optional: consumes the item
            rep: { "Chantal": 10 },
            m: 5, l: 5, a: -5, b: 0,
            r: "Sie isst ihn ohne Nachfrage und ohne Danke. Der Automat ist vergessen, das Problem gelöst, der Donut weg."
        },
        {
            t: "'Kein Kommentar.'",
            loot: "energy",
            m: 2, l: 0, a: 5, b: 0,
            r: "Du nimmst dir aus dem Kühlschrank, was du brauchst, und gehst. Hinter dir piept der Automat weiter, jetzt mit Publikum."
        }
    ]
}
```

**The order of the fields** is not enforced, but it is the same throughout the
stock. Keeping to it makes every file read the same way:

- on the event: `id` → `char` → `kind` → `title` → `reqRep` → `reqStory` → `text` → `opts`
- in the option: `t` → `req`/`rem`/`loot` → `next` → `rep` → `m, l, a, b` → `r`

`m, l, a, b` sit together on one line, and **all four** of them, even when three
are 0. Without the zeros you cannot tell at a glance whether an effect is
missing or deliberately absent.

## The fields on the event

| Field | Where | Meaning |
|---|---|---|
| `id` | everywhere, compulsory | Unique across **all** pools together — the same id twice and both events lock each other out. With an area prefix. |
| `title` | everywhere except mails, compulsory | The heading of the event card. Without it the line in the terminal stays empty. |
| `text` | compulsory, except in chains (there the text sits in the nodes) | The opening. `\n` produces a paragraph. |
| `opts` | compulsory, except in chains | The options, see below. |
| `char` | optional everywhere | Shows a character's portrait. The name **exactly** as in `data_chars.js`. |
| `reqStory` | coffee, server room, calls, errands, encounters | Precondition: the event only appears once this story flag is set. Lunch break, boss fight and party do **not** evaluate the field. |
| `reqStoryAge` | coffee, server room, calls, errands — only together with `reqStory` | Week mode: the flag has to be at least this many **nights** old (1 = tomorrow at the earliest). Never satisfiable in day mode, see section 3. |
| `reqWeekDayMin` | coffee, server room, calls, errands | Week mode: appears **from** this weekday onwards (2 = Tuesday … 5 = Friday), not only on it. Never satisfiable in day mode. |
| `reqRep` | encounters, effectively compulsory there | Reputation threshold, see section 6. 139 of the 140 encounters carry one; the exception is a follow-up for which the `reqStory` suffices as a precondition. |
| `kind` | errands, compulsory there | `"text"` (terminal) or `"phone"` (phone chat). All 308 carry it. |
| `appName` | errand chat, compulsory there | Which app displays the chat, e.g. `"WhatsApp"`, `"Teams"`, `"Signal"`. All 57 chats carry it. **Display text, not an identifier** — generic words are translated (`"Anruf"` → `"Call"`), brand names are not. |
| `startNode`, `nodes`, `results` | calls, errands, weekly meeting | A conversation with a course of its own instead of a single decision, see section 4. |
| `startNodeGala` | weekly meeting | A second opening node: it applies when the gala is due that evening — the announcement comes in the meeting, see section 4. |
| `loc` | party, compulsory for location events | The location of the party: `"bar"`, `"buffet"`, `"dance"`, `"lounge"`, `"outside"`, `"toilet"` — **six, and the list is closed**. The only ones without `loc` are `party_start`, `party_hub` and the five `party_finale_*`, which are hard-wired. |
| `timer`, `fail` | boss fights, compulsory there | The countdown in seconds and what happens when it runs out. All 38 carry both. |
| `webOnly` | coffee, server room, calls, errands | Appears only in the browser, not in the Steam version (for events pointing at the shop page). Once in the stock, in `sq_meta_donation`. |
| `sender`, `senderId`, `subj`, `body`, `linked` | mails only | See section 10. |
| `textByProgress` | party foyer | `party_hub` only: foyer text per progress. Not a field for contributions. |

> **`loc` is checked by nothing.** `engine_events` filters `ev.loc === loc`, and
> the data checker knows no list of locations. A typo or an invented location
> gives **0 errors, 0 warnings** — and an event that is never drawn. The same
> kind of silence as a wrong icon path.

The data checker reports every field the engine does not read **at that
position**. A `reqStory` on a lunch break is therefore no longer a silent dud
but an error.

## The fields in an option

| Field | Effect |
|---|---|
| `t` | Compulsory: the label of the button — the same in every area, the inbox included. |
| `r` | Compulsory: the result text. It also goes into the log afterwards. |
| `m` | Costs minutes of playing time. The working day is limited; this is the real currency. |
| `l` | Laziness (positive = lazier). Applies 1:1. |
| `a` | Aggro. Positive values are scaled up with the difficulty, negative ones apply 1:1. |
| `b` | Boss radar. Positive values rise with difficulty **and** laziness — the lazy stand out faster. Negative ones apply 1:1. |
| `rep` | Reputation with colleagues: `rep: { "Chantal": -10, "Kevin": 5 }`. Names exactly as in `data_chars.js`. |
| `loot` | Gives an item (id from `data_items.js`). |
| `req` | Requires an item. The option stays **visible** but is locked and reports "Fehlt: LAN-Kabel". The item is kept. |
| `rem` | Consumes the item. While the option is selectable, that shows as "−Panzertape" on the button. |
| `next` | In the basic type: sets a story flag (section 3). In a chain: the target within the conversation (section 4). |
| `ignoreEmail`, `nextEmail` | mails only, see section 10. |
| `action` | **Not a field for contributions.** Calls an engine function (`{fn, args}`). Eleven times in the stock, exclusively at the company party, where the foyer has to switch the stations (`goToPartyStation`, `finishParty`). The checker permits it everywhere — it should be used nowhere else, because it moves mechanics into the data. |
| `checkPool` | In the party foyer only: names the station whose remaining events are counted. It also builds the image path `assets/img/party/{checkPool}.webp`, so it carries the same six values as `loc`. |

The four effect letters are abbreviations of English words — `m` minutes, `l`
laziness, `a` aggro, `b` boss. Up to 5.0 they were called `f` and `c`; older
notes mean the same fields.

A special rule for items: the quest trophies (`kevin_ram`, `golden_stapler`,
`mixtape`, `cat_pic`, `master_key`, `scotch_bottle`, `contract`,
`corp_chronicles`, `prince_letter`) may only be given out via `loot` and **never**
demanded or consumed via `req`/`rem` — they are collectibles for achievements,
and anyone who never played the matching reputation story would otherwise face a
locked option.

Every event is drawn at most once per working day.

## The numbers

The data checker enforces a few ground rules, all of which come from the same
idea: every decision should cost something.

- **`m` is at least 2.** No action takes less than two minutes, and the clock
  never runs backwards. Anything below that is an error.
- **`l`, `a` and `b` sit on the grid of five.** The bars move in steps of five; a
  3 is invisible to the player. `rep` may be finer — ±2 and ±3 are common there.
- **Expensive time needs a consequence.** From `m: 15` upwards the checker wants
  to see a total effect of at least 10 (or a `loot` or `rep`), otherwise the
  option is a fast-forward button without consequence.
- **Magnitude for reputation:** ±5 is the normal case, ±10 a clear statement,
  ±20 reserved for events that genuinely turn a relationship around.
- **At least one option without an item.** If they all demand one, the event can
  lock itself out completely — the inventory starts empty every day.

Anyone changing values runs `npm run sim` against them first: a day simulation
with the real pools and the engine formulas.

## Rules for texts

- **First-order quotation marks are single:** `'so'`. Double ones only for a
  quotation inside a quotation.
- **No HTML, no Markdown.** Event and result texts are output as plain text; a
  `<br>` would be readable for the player. `\n` makes paragraphs.
- **Labels say what Miller does or says** — as a natural verb phrase ("Ihn vor
  dem Spinat-Kern warnen") or as bare direct speech ("'Das war ich nicht.'"). No
  tags such as `Lüge: …` or `Auflegen (Angst)`: the button should not pre-empt
  the decision — the result text afterwards does that.
- **Result texts show the consequence, not the mechanics.** No "(Inventar +1)",
  no "Maximaler Stress." — what the player can see anyway does not need writing
  down, and a keyword is not a scene.
- **The best answer is not always at the top.** Spread it across the slots. Only
  cancelling, ignoring, hanging up and deleting belong at the end, where people
  look for them.

---

## 1. The basic type: coffee, server room, errands, calls

The example at the top is already the full build of this type: an opening and
two to four options, each with its result text.

The area prefixes for the `id`: `cof_` (coffee), `srv_` (server room), `call_`
(calls), `sq_` (errands), `rep_` (encounters), `lunch_`, `boss_`, `party_`,
`mail_`.

Two areas have one compulsory field more each:

- **Errands** (`data_sidequests.js`): `kind: "text"` or `kind: "phone"`
  (section 5).
- **Calls** (`data_calls.js`): `title` is the display on the phone screen here,
  gladly with the department in brackets — `title: "Frau Meyer (Buchhaltung)"`.

## 2. Portraits: the `char` field

`char` shows a character's portrait next to the text. That applies in **every**
area, not only in the chat: coffee, server room, calls, errands, lunch break,
boss fight, party and weekly meeting all show it alike.

A name that is **not** in `data_chars.js` is not an error: the terminal then
shows an initials tile with the name underneath — like a contact without a
picture. That is the intended presentation for the interchangeable consultants
in the weekly meeting, who are deliberately never taken into the team or the
reputation system.

```js
{
    id: "srv_kevin_rack_1",
    char: "Kevin",              // portrait from data_chars.js
    title: "Der Drachenaufkleber",
    text: "...",
    opts: [ /* ... */ ]
}
```

Valid names (write them exactly like this): `Kevin`, `Chantal`, `Egon`,
`Dr. Wichtig`, `Frau Elster`, `Markus`, `Gabi`. A typo is an error in the data
checker, not a picture quietly disappearing.

> **The eighth entry in `data_chars.js` is the player character, and you do not
> write it.** It is called `Du (Müller)` in the German tree and `You (Miller)` in
> the English one — it is the **only** field value that differs between the
> trees. No event sets `char` to it, and it appears nowhere as a `rep` key;
> otherwise the behaviour would depend on the language. Anyone needing the
> player character in code recognises it by `player: true`, never by the name.
> That is why **seven** colleagues have reputation, not eight.

Rule of thumb: `char` belongs on every event in which one of these characters
appears and speaks. If it is about a nameless person from sales, the field stays
out.

## 3. Follow-up events: `next` sets, `reqStory` demands

An option can continue a story: `next` sets an invisible marker (a story flag),
and a second event with `reqStory` on the same name can appear from then on.

```js
// Part 1 - the option sets the flag:
{
    id: "srv_kabel_1",
    title: "Das beschriftete Kabel",
    text: "Hinter dem Rack hängt ein Kabel, das nirgendwo angeschlossen ist. Jemand hat es beschriftet: 'NICHT ZIEHEN'.",
    opts: [
        {
            t: "Es natürlich ziehen",
            next: "path_kabel_gezogen",
            m: 2, l: 0, a: 0, b: 0,
            r: "Nichts passiert. Kein Alarm, kein Piepen, keine Konsequenz. Du legst das Kabel zurück und fühlst dich seltsam betrogen."
        },
        {
            t: "Die Beschriftung respektieren",
            m: 2, l: 5, a: 0, b: 0,
            r: "Manche Rätsel vererbt man einfach an den nächsten Admin. Der wird auch nicht ziehen, und so geht das seit 1998."
        }
    ]
},
// Part 2 - only appears once the flag has been set:
{
    id: "srv_kabel_2",
    char: "Gabi",
    title: "Die Klingel im Takt",
    reqStory: "path_kabel_gezogen",
    text: "Gabi ruft aus dem Empfang an: Die Türklingel schlägt an, sobald die Klimaanlage anspringt. Im Takt. Die Besucher warten draußen im Regen.",
    opts: [
        {
            t: "Das Kabel leise wieder einstecken",
            rep: { "Gabi": 5 },
            m: 5, l: 0, a: 0, b: 0,
            r: "Die Klingel verstummt. Gabi bedankt sich für die schnelle Diagnose. Niemand muss je erfahren, wie schnell sie wirklich war."
        },
        {
            t: "'Das ist ein bekanntes Verhalten der Anlage.'",
            m: 5, l: 10, a: 0, b: 5,
            r: "Gabi glaubt dir kein Wort, trägt es aber genau so ins Ticket ein. Die Formulierung wird die Firma überleben."
        }
    ]
}
```

Important for the text: a follow-up event comes **at some point later on the
same working day — or never**, if the day ends first. Hours can lie between the
trigger and the continuation. So no "gerade eben", no "kaum hast du", no
"Sekunden später"; the checker warns about such phrasing. The reverse holds just
as much: the trigger was **today**, so no "gestern" dates it into the past.

### Multi-day chains: `reqStoryAge` and `reqWeekDayMin` (week mode)

In week mode, story flags carry the day on which they were set. Two fields make
use of that:

- `reqStoryAge: 1` — the flag is at least one **night** old. A follow-up event
  like this cannot by definition arrive on the same day any more; the trigger
  really does lie in the past, so "gestern" is right here rather than wrong.
- `reqWeekDayMin: 3` — appears **from** Wednesday onwards, not only on
  Wednesday. Draws are random: an event allowed to fire on one single day
  competes against the whole pool on that day and is often missed. That is why
  the checker warns at `reqWeekDayMin: 5`.

Both conditions are simply unsatisfiable in day mode — time-bound parts are
therefore automatically week-exclusive, without a mode field of their own. The
**opening** of such a chain, by contrast, runs in both modes; its risky option
therefore needs a small immediate price, otherwise in day mode, where the bill
never arrives, it is always the best.

Writing rules for multi-day parts:

1. **The opening closes as a scene in its own right.** Chains are allowed to
   starve (the week ends, the draw goes elsewhere) — that must never feel like a
   bug. The opening text also explains the situation fully by itself; the title
   is a bonus, not a prerequisite.
2. **Re-anchor in the object, not in the meta.** The player is days further on.
   Not "wie du weißt, hast du am Montag …", but: the server room smells of a
   barbecue.
3. **No weekday names and no clock times in the text.** A "from Wednesday" event
   can be drawn on Thursday too; "endlich da" holds on both days. And because
   every event can be drawn at any time of day, the scene must not hang on a
   clock ("Um kurz nach elf zuckt das Licht"). Permitted are times that belong
   to an **object** — a calendar entry, a log stamp, a mail timestamp — or that
   lie before 8:00 or after clocking off. The checker warns and knows a reviewed
   exception list (`clockReviewed`).
4. **Escalation means several events**, not one that waits: stage 1 with
   `reqStoryAge: 1`, stage 2 with `reqStoryAge: 2`. Every stage is a scene of
   its own.
5. **Numerically ordinary, narratively special.** Every part is a normally
   balanced event of its pool; the drama lies in the anticipation, not in the
   numbers.

Flags are global — a server-room trigger may have its echo in the calls pool
too: improvise something in the server room and two days later you get a call
from an entirely different department that has noticed the smell. The building
remembers.

Flag names are free to choose; in the stock 578 of 637 carry the `path_` prefix.
Name them so they speak: `path_kabel_gezogen`, not `path_2b`.

Follow-up events may be **cross-area**: the flag from a server-room event can
unlock a coffee event or trigger a call — 34 stories already do this. Simply use
`reqStory` in the event of the other area.

An unlocked follow-up event gets priority when drawing: in 30 % of cases the
engine chooses from the open continuations rather than from the base stock. The
same rule applies to the lunch break.

**Not in the encounters.** In `data_reputation.js` multi-day chains are not
provided for: the pool is firmly allocated elsewhere, and additional chains
lower the draw chance of the existing events there. The data checker therefore
rejects `reqStoryAge` in this pool.

### What of it belongs in the knowledge (`data_compendium.js`)

The compendium collects what Miller finds out about the building: about
colleagues, about people who keep turning up, about rooms and about ongoing
affairs. It fills itself from events that exist anyway — an entry refers by
event id or story flag to the scenes it comes from.

**Bear it in mind while writing, but force nothing.** Letting a character, a
place or an ongoing affair appear more than once creates material for an entry
along the way — that is a good reason to turn a single event into a chain or to
use a minor character a second time. The other way round does not work: writing
events so that an entry comes about shows in the result.

The entry test is strict and has nothing to do with completeness:

- **At least three scenes.** An entry may carry as many notes as it cites
  distinct scenes (capped at eight) — the linter enforces it. Draw five notes
  from two appearances and you are inventing.
- **The note is the lesson, not the scene.** The event narrates what happened;
  the note records what Miller now knows. Test question: would the note be
  readable and funny to someone who never saw the event? If it needs the scene
  as context, it is a summary and belongs rewritten.
- **One note per chain, not per event.** Otherwise a three-parter delivers the
  same insight three times.
- **No entry for the entry's sake.** A character with one appearance, a room
  with no character of its own, an affair with no recurrence — that becomes a
  description instead of an observation, and nobody reads descriptions twice.
  Better no entry than a thin one.

Triggers are **always** event ids or story flags, never names in the text: there
are two Brandts in the game, and matching by name would give a note to the wrong
entry.

The format and the four categories are in the header comment of
`src/data/de/data_compendium.js`. New entries are checked by `npm run lint:data`
along with everything else. The stock: 59 entries with 257 notes between them.

## 4. Conversations with a course: `nodes` and `results`

For real dialogue there is the node construction. Instead of `text` and `opts`,
the event has a `startNode`, a `nodes` object (the conversation steps) and a
`results` object (the exits). The division is strict:

- **Nodes** carry the text and the options. A node option has **only** `t` and
  `next` (plus at most `req` or `rem`). No `r`, no `m`, no `rep` — the engine
  does not read them there, and they would disappear without a trace.
- **`next`** points either at another node or at an exit. It is looked up first
  in `nodes`, then in `results`. A node option without `next` is a dead end and
  an error.
- **Results** carry all the effects. The result text is called `txt` here rather
  than `r`; otherwise the same fields apply as in an option. A `next` **in the
  result** sets a story flag as in section 3.
- **Result keys start with `res_`.** That is a readability rule, not a mechanic:
  anyone skimming the file sees from the name where a chain ends. The "…" badge
  in the terminal does not depend on the name — it looks up, as the engine does,
  whether the target is a node. So an exit may be called `truth` and still
  works; `res_truth` simply reads better.
- **Nodes may carry a `char` of their own:** the node `char` beats the event
  `char`, and `char: null` forces none at all. That is how a chain changes
  speaker mid-conversation — in the terminal just as in the phone chat.
  `renderChainNode` in `engine_events.js` resolves this the same way for
  **every** chain. In the stock, only the weekly meeting uses it so far: 48
  nodes across eight meetings. The 58 nodes of the calls and the 153 of the
  errands carry no `char` of their own, and `char: null` appears nowhere.

### The weekly meeting (`data_meetings.js`)

The meeting pool uses the chain construction with three special rules. Ids start
with `meet_`. `startNodeGala` is a second opening node: the engine chooses it
when the gala fires that same evening — the "keep it short" announcement belongs
in the conversation, not in a system message. And the external consultants exist
**only** as a node `char` with an initials tile (section 2): no `data_chars`
entry, no reputation, no team — the cast may be freely invented per event and
rotates across the weeks by itself. In the meeting, reputation moves only for
real characters, that is the seven from `data_chars` — never for the
consultants. There are no excuses in the meeting — there is no escaping the
weekly report.

**The construction in three acts.** A meeting is not an event with a branch but
a discussion that drags on. Hence three decisions instead of two:

1. **The question put to you** (`root`) — you are asked for the weekly report.
2. **The digression** — the answer is reinterpreted, somebody takes over, a
   slide gets in the way. This is where the length lives: the follow-up
   question, the flip chart, the colleague with a remark.
3. **The exit** — how you get out of the room and what you commit to on the way.

That yields eight nodes (root, `root_gala`, two in the second act, four in the
third) and at least eight results. Important: what the digression tells must not
appear in the result text again. Put a punchline into the middle section and you
have to rethink the result afterwards.

**Not two options throughout.** Building every node binary is convenient and
shows across twelve meetings; the rest of the game varies between one and three.
One node per meeting therefore gets a third option, in a varying position —
usually the quiet choice: say nothing, look at the clock, let somebody else do
it.

```js
// A call with a course of its own (data_calls.js):
{
    id: "call_meyer_monitor_1",
    char: "Frau Elster",
    title: "Frau Elster (Buchhaltung)",
    startNode: "root",
    nodes: {
        root: {
            text: "'Herr Müller. Mein Bildschirm ist schwarz, und der Monatsabschluss ist morgen.'",
            opts: [
                { t: "'Leuchtet an der Ecke des Monitors ein kleines Licht?'", next: "monitor" },
                { t: "'Ich schicke Kevin vorbei.'", next: "res_kevin" }
            ]
        },
        monitor: {
            text: "Eine Pause. Ein Klicken. Dann, deutlich leiser: 'Es leuchtet jetzt.'",
            opts: [
                { t: "'Passiert den Besten, Frau Elster.'", next: "res_gnaedig" },
                { t: "'Ich notiere das für die Statistik.'", next: "res_statistik" }
            ]
        }
    },
    results: {
        res_kevin: {
            txt: "Kevin macht sich auf den Weg. Er kommt vierzig Minuten später zurück, sehr stolz, mit einem Kabel in der Hand, das dort vorher nicht war.",
            rep: { "Kevin": 5, "Frau Elster": -5 },
            m: 10, l: 10, a: 5, b: 0
        },
        res_gnaedig: {
            txt: "Sie bedankt sich knapp und beendet das Gespräch. Irgendwann im nächsten Monat taucht ein Beleg wieder auf, den du längst abgeschrieben hattest. Zufälle gibt es.",
            rep: { "Frau Elster": 10 },
            m: 5, l: 0, a: 0, b: 0,
            next: "path_elster_gutschein"        // story flag for a follow-up event
        },
        res_statistik: {
            txt: "Am Telefon herrscht Stille von der Sorte, die man in der Buchhaltung ein Jahr lang aufbewahrt. Dann ein sehr höfliches 'Danke, Herr Müller.'",
            rep: { "Frau Elster": -10 },
            m: 5, l: 0, a: 5, b: 0
        }
    }
}
```

## 5. Der Dienstgang als Chat: `kind: "phone"`

A phone chat is the same node construction as in section 4, with three more
fields: `kind: "phone"`, `appName` (which app displays the chat) and `title`
(the contact name in the chat header).

For the labels, the chat has a convention of its own: plain text is a **message**
that Miller sends; square brackets are an **action** rather than a message —
whether an app function or a physical one makes no difference:
`[Gruppe verlassen]`, `[Handy weglegen]`, media as `[GIF gesendet: …]`. No
`System:` in front; the brackets already say everything, and in the narrow chat
window every character counts.

In the **text** of a bubble, `[System: …]` is allowed — there it is the
messenger's own notice (`[System: Chat stummgeschaltet] Du lässt das Handy
vibrieren`) and not the label of a button.

The portrait comes from `char` here too and is resolved per message. So far the
stock uses only the first case — all 57 chats carry their `char` on the event,
none on a node. The remaining three are therefore documented and unused, not
documented and taken:

- `char` **on the event** → a portrait for the whole chat; above the bubbles the
  `title` still stands, that is the stored contact name.
- `char` **on a node** → only this message shows the portrait **and the name** of
  the character, like a named voice in a group. Without a `char` of its own, the
  node inherits the event `char`.
- **No** `char` on the event, `char` only on individual nodes → a group chat: all
  the others stay with the anonymous initial.
- `char: null` on a node forces the initial despite the event character.

```js
{
    id: "sq_gruppe_deko_1",
    kind: "phone",
    appName: "WhatsApp",
    title: "Gruppe 'Büro-Legenden'",
    startNode: "root",
    nodes: {
        root: {
            text: "47 ungelesene Nachrichten. Jemand plant eine Überraschung für Egons Dienstjubiläum, und die Planung ist bereits an dem Punkt, an dem über Wimpelketten abgestimmt wird.",
            opts: [
                { t: "Bin dabei. Was soll ich mitbringen?", next: "zusage" },
                { t: "[Gruppe stummschalten]", next: "res_stumm" }
            ]
        },
        zusage: {
            char: "Kevin",        // only this message carries Kevin's name and face
            text: "Du machst die Deko!! Egon darf NICHTS merken!!! 🎉🎉",
            opts: [
                { t: "Verlass dich auf mich.", next: "res_zugesagt" },
                { t: "[Handy weglegen und so tun, als hätte man es nicht gelesen]", next: "res_ignoriert" }
            ]
        }
    },
    results: {
        res_stumm: {
            txt: "Die Gruppe plant ohne dich weiter. Bis Feierabend sind es 112 Nachrichten, und irgendwo darin steht, wer die Deko macht. Du wirst es morgen erfahren.",
            m: 2, l: 5, a: 0, b: 0
        },
        res_zugesagt: {
            txt: "Du hast dich soeben schriftlich zu Wimpelketten verpflichtet. Der Schreibwarenladen um die Ecke hat noch genau eine, und sie ist rosa.",
            rep: { "Kevin": 5 },
            m: 5, l: 0, a: 5, b: 0,
            next: "path_deko_zugesagt"
        },
        res_ignoriert: {
            txt: "Du legst das Handy weg. Es vibriert weiter, jetzt einzeln, jetzt privat. Kevin hat gesehen, dass du online warst.",
            rep: { "Kevin": -5 },
            m: 2, l: 5, a: 5, b: 0
        }
    }
}
```

The follow-up event to `path_deko_zugesagt` is then a perfectly ordinary event
with `reqStory` — in the same area with `kind: "text"`, or in any other.

## 6. Encounters (`data_reputation.js`)

In construction, encounters are ordinary events (section 1), with two
particularities: they only appear from a certain reputation with a character
onwards, which is why `reqRep` is **effectively compulsory** here — and since
they always concern one particular character, every encounter in the stock
carries a `char` as well. All 140 do; 139 carry a `reqRep`.

A positive number means "at least", a negative one "at most". That is how
friendship and enmity strands to the same character come about:

```js
{
    id: "rep_kevin_energy_1",
    char: "Kevin",
    title: "Der stille Tribut",
    reqRep: { "Kevin": 20 },        // required: appears from reputation +20 with Kevin
    text: "Kevin schiebt dir wortlos einen Energydrink über den Tisch. Auf dem Etikett klebt ein Post-it: 'Für den Boss'. Er sagt nichts dazu und schaut auch nicht hoch.",
    opts: [
        {
            t: "'Ehrenmann.'",
            loot: "energy",
            rep: { "Kevin": 5 },
            m: 2, l: 0, a: -5, b: 0,
            r: "Kevin nickt ernst und dreht sich wieder weg. Mehr Worte braucht diese Sache nicht, und beide wissen das."
        },
        {
            t: "Ihm erklären, dass du das Zeug nicht mehr trinkst",
            m: 5, l: 0, a: 0, b: 0,
            r: "Er trinkt ihn selbst. In einem Zug. Du bist gleichzeitig beeindruckt und besorgt, und beides zu Recht."
        }
    ]
},
// The enemy variant: reqRep negative, here "at most -30":
{
    id: "rep_kevin_maus_1",
    char: "Kevin",
    title: "Der Zeiger",
    reqRep: { "Kevin": -30 },
    text: "Dein Mauszeiger ruckelt über den Bildschirm wie ein Auto mit Standschaden. Unter der Maus klebt ein Post-it, darauf ein Smiley mit Hörnern.",
    opts: [
        {
            t: "Das Post-it kommentarlos entfernen",
            m: 2, l: 0, a: 5, b: 0,
            r: "Du wirfst es weg und sagst nichts. Krieg braucht keine Worte, nur Ausdauer, und davon hast du beruflich reichlich."
        },
        {
            t: "Seine Tastatur auf ein anderes Layout umstellen",
            next: "path_kevin_krieg_2",
            rep: { "Kevin": -5 },
            m: 5, l: -5, a: -5, b: 0,
            r: "Ab jetzt tippt er Fragezeichen, wo Bindestriche hingehören. Er wird eine halbe Stunde brauchen, um es zu merken, und den ganzen Tag, um es zu beheben."
        }
    ]
}
```

Continuations work as they do everywhere (`next` → `reqStory`); they may
additionally carry a `reqRep` again, but they do not have to — with the flag
set, the story itself is often precondition enough.

Encounters are not drawn through the action bar: they intercept the player with
a 10 % probability before any action.

## 7. Lunch break (`data_lunch.js`)

Ordinary text events with `title`, `text` and `opts`, gladly with a `char`. The
break is triggered once a day between twelve and two. The times are
correspondingly large — a break typically costs 30 to 60 minutes. It may give
items and change reputation.

**Multi-day chains.** `triggerLunch` evaluates `reqStory` and `reqStoryAge`,
with the same `FOLLOWUP_CHANCE` of 30 % as the action pools: an open
continuation comes up in 30 % of cases, otherwise the draw is from the base
stock. `reqRep` is still not evaluated here.

That makes the break the most natural place for a "yesterday at lunch" — it is
the only thing that happens every day. Walk ten kilometres with someone and you
feel it the next lunchtime. There are three such strands so far; the opening
sets the flag via `next`, the follow-up event demands it with `reqStoryAge: 1`.

## 8. Boss fights (`data_bossfights.js`)

The emergency with a countdown. Two more compulsory fields:

- `timer`: the seconds the bar runs (8 to 20 in the stock, usually 10 or 12).
- `fail`: what happens if nobody decides. Built like an option, only without `t`.

```js
{
    id: "boss_klima_1",
    title: "Einundvierzig Grad",
    text: "Der Serverraum hat 41 Grad und wird wärmer. Die Klimaanlage meldet einen Fehler, der laut Handbuch nicht auftreten kann. Die ersten Lüfter drehen hoch, als wollten sie abheben.",
    timer: 12,
    opts: [
        {
            t: "Die Tür aufkeilen und zwei Standventilatoren holen",
            req: "cable",
            m: 10, l: -5, a: 10, b: -10,
            r: "Provisorisch, laut und gegen jede Vorschrift — aber die Temperatur fällt. Der Raum steht offen, und die Sicherheitsabteilung wird das erfahren."
        },
        {
            t: "Die halbe Serverlandschaft geordnet herunterfahren",
            m: 15, l: -10, a: 15, b: 20,
            r: "Du fährst herunter, was nicht lebensnotwendig ist. Die Hardware überlebt, der Vertrieb nicht: Drei Präsentationen enden mitten im Satz."
        }
    ],
    fail: {
        rep: { "Dr. Wichtig": -20 },
        m: 30, l: 0, a: 40, b: 50,
        r: "Bei 47 Grad schalten sich die Server selbst ab, einer nach dem anderen, in der Reihenfolge ihrer Wichtigkeit. Der Rest des Tages besteht aus Telefonaten."
    }
}
```

The balance rule: **doing nothing has to be the worst choice.** `fail` fares
worse than the worst active decision — otherwise waiting is a strategy. Measured
range across all 38: options cost −30 to +60 on `a`+`b`, `fail` between 50 and
150. In all 38, `fail` is more expensive than any option; that can be
recalculated with a three-liner and belongs checked after every new wave.

**The title names the situation, not the type of disaster.** The view writes
NOTFALL in red with a countdown bar above it anyway — the title does not need to
shout and carries no emojis. So „Das Rohr in der Teeküche" rather than
„WASSERSCHADEN": name things by their genus and you soon have several
emergencies called practically the same.

**At least one way out via an item, at least one without.** A good quarter of the
emergencies manage entirely without a `req` (9 of the 38); that is the lower
limit.

With the item, availability counts: a tool that is often found in the game makes
the option reachable for more people. Good candidates are `cable` (eight places
to be found), `screw` (seven) and `tape` (six). `admin_pw` has only three and
therefore belongs only where the action really needs rights and not just hands —
you pull a plug without a password.

**Aftershocks.** An emergency may have a consequence: the option sets a flag via
`next`, and an event in another pool demands it with `reqStoryAge: 1`. That way
the next morning comes a day later — never in day mode, which is right, because
there is no yesterday there. Eight of the 38 have such an aftershock, one of them
a three-part story with a knowledge entry of its own.

With the knowledge entry, think about reachability: an emergency is triggered
often, but a *particular* one rarely — with getting on for forty in stock you see
it only a few times a year. An entry citing several different emergencies would
be practically unreachable. It has to hang on **one** chain.

## 9. The company party (`data_party.js`)

The party is a mode of its own after hours: no inbox, no calls, none of the
normal areas — only the locations. Party events are ordinary text events with one
more field:

- `loc` (**compulsory**): `"bar"`, `"buffet"`, `"dance"`, `"lounge"`, `"outside"`
  or `"toilet"` — six locations with seven events each. On visiting a location
  the game randomly draws an event not yet experienced there. **The list is
  closed and is checked by nothing:** a location that does not exist produces an
  event that is never drawn, without a single message.

In the options, `next: "party_hub"` leads back to the location overview and
increments the evening's progress — that is how most party options end.

**The party calculates differently from the rest of the game.** Three things are
different here, and all three follow from it being after hours:

- **No minutes.** The clock is not advanced by `m` but calculated from the
  progress: twelve stations of half an hour each carry it from 17:00 to 23:00.
  Every station costs the same, whatever you do.
- **No boss radar.** After hours nobody is watching how much you work any more.
  Only `l` and `a` are used — laziness and aggro, because both carry on
  privately too.
- **No ending.** `checkEndConditions()` bails out immediately in party mode: at
  the party you can neither blow up nor be sacked. The evening ends exclusively
  through one of the `party_finale_*` events.

The linter reports `m` and `b` as errors — the engine would happily process both,
to no effect, and a value that silently does nothing is worse than one that fails
loudly. `rep`, `loot`, `req` and `rem` remain permitted but appear in none of the
137 existing options. The normal case is: `l`, `a` and `next`. After enough
stations the evening triggers one of the finales; the `party_finale_*` events are
hard-wired and need no contributions.

```js
{
    id: "party_lounge_praktikant",
    loc: "lounge",
    title: "Das Sofa der Wahrheit",
    text: "Auf dem Designersofa sitzt der Praktikant und erzählt jedem, der sich setzt, von seiner Geschäftsidee. Es geht um KI. Natürlich geht es um KI.",
    opts: [
        {
            t: "Sich setzen und zuhören",
            next: "party_hub",
            l: 10, a: 10,
            r: "Eine halbe Stunde später kennst du drei Schlagworte mehr und einen Menschen weniger, dem du freiwillig zuhörst."
        },
        {
            t: "'Ich hole nur schnell etwas zu trinken.'",
            next: "party_hub",
            l: 0, a: -5,
            r: "Der älteste Trick des Abends. Er funktioniert, weil er immer funktioniert, und weil das Sofa schon den Nächsten hat."
        }
    ]
}
```

## 10. Emails (`data_emails.js`)

The mail itself has field names of its own: `sender` (the display name),
`senderId`, `subj` (the subject line — "Re:", "WG:" and urgent phishing subjects
are expressly welcome, that is mail realism) and `body` as the mail text. The
options are built as everywhere else, with `t` and `r`.

**`senderId` is compulsory** — all 161 mails in the stock carry one. It is the
identifier behind the display name (`hr_sabine`, `ticket_system`,
`works_council`), and `EmailView` keys the CC rules off it. Before that the
component compared the sender **prose** ("buchhaltung", "sicherheit"), and that
holds for exactly as long as the pool is German: in the English tree the rule
would simply never have fired, with no error and no message. `sender` is
translated, `senderId` **never** — it is the same word in both trees.

What does **not** work here: `req` and `rem`. A mail can give items (`loot`) but
cannot demand or consume any. There is no `char` either; the inbox shows only the
sender.

Three conventions:

- If there is a delete option, it is called `"Löschen & Ignorieren"`, carries
  `ignoreEmail: true` and stands as the **last** option. The data checker checks
  both.
- Follow-up mails run through `nextEmail: "mail_x_2"` rather than through story
  flags. The follow-up mail gets `linked: true` — then it is never delivered at
  random, only through the chain.
- The result text `r` ends up in the log, with "Re: " in front of it for a mail
  that was answered. It therefore reads best as a terse line, not as a paragraph.

On rhythm: mails only arrive after an action (server room, coffee, errand, call),
at the earliest 25 game minutes after the last one, and never during a boss fight
or the lunch break. There are 20 seconds to read and decide, after which the mail
counts as ignored.

```js
{
    id: "mail_gewinnspiel_1",
    sender: "Lotterie International",
    senderId: "lottery_scam",         // required: the identifier, never translated
    subj: "Dringend: Ihr Gewinn verfällt HEUTE!",
    body: "Sehr geehrter Gewinner,\n\nSie haben 2.000.000 Euro gewonnen. Zur Auszahlung benötigen wir lediglich eine Bearbeitungsgebühr von 49,99 Euro.",
    opts: [
        {
            t: "'Ziehen Sie die Gebühr doch einfach vom Gewinn ab.'",
            m: 2, l: 0, a: 0, b: 0,
            r: "Antwort verschickt, Verhandlung eröffnet.",
            nextEmail: "mail_gewinnspiel_2"
        },
        {
            t: "Löschen & Ignorieren",
            m: 2, l: 0, a: 0, b: 0,
            r: "Zwei Millionen ärmer, eine Illusion reicher.",
            ignoreEmail: true
        }
    ]
},
{
    id: "mail_gewinnspiel_2",
    sender: "Lotterie International",
    senderId: "lottery_scam",
    linked: true,                     // arrives only through the chain, never at random
    subj: "Re: Ihr Gewinn - NEUE Konditionen!",
    body: "Guter Verhandler! Neue Gebühr: nur noch 29,99 Euro. Letztes Angebot!",
    opts: [
        {
            t: "'19,99 und wir sind im Geschäft.'",
            m: 3, l: 0, a: -5, b: 0,
            r: "Du feilschst mit Betrügern. Und du liegst vorn."
        },
        {
            t: "Löschen & Ignorieren",
            m: 2, l: 0, a: 0, b: 0,
            r: "Der Spuk ist vorbei.",
            ignoreEmail: true
        }
    ]
}
```

---

## Checking before the pull request

Finally, run the checkers:

```
npm run lint:all
```

That is four runs: the data checker over the German tree, the same over the
English one, the interface strings, and the parity checker.

The **data checker** finds the typical mistakes automatically: duplicate ids,
typos in item and character names (`req`/`rem`/`loot`/`rep`/`char`), unknown
fields (an `ep` instead of `rep` would otherwise fizzle out silently), story
flags that are set but never needed or the other way round, dead ends and
unreachable nodes in conversations, events that can lock themselves out
completely, breaches of the number rules, a delete option without `ignoreEmail`
or in the wrong position, quest trophies as `req`/`rem`, time references in
follow-up events, and invisible special characters that creep in while copying.

The **parity checker** then holds both trees against each other: same shape, same
ids, same numbers. A text that reads verbatim the same in both trees has not been
translated yet — it reports that under "NOCH DEUTSCH", and that is not an error
but the work list. A changed number, by contrast, is one: the English version
then plays differently, and nothing on screen shows it.

Only when all four pass with no errors and no warnings is the contribution
technically sound.

For balance changes, additionally:

```
npm run sim
```

And if you like, read `node tools/report-prose.mjs <pool>` (e.g. `… coffee`): a
style report on repetitions and phrasing patterns — reading material for
orientation, not a list of errors. Check new phrasings against the stock
beforehand so that no new duplicates arise.

To start a particular event for testing (browser console, `window.engine` is
global). The example takes a real chain from the stock: `srv_sleep_1` sets the
flag `path_sleep_fort` through its first option, and `srv_sleep_2a` demands it.

```js
engine.state.storyFlags.path_sleep_fort = true;
engine.state.usedIDs.delete("srv_sleep_2a");
const _p = engine.pickFromPool;
engine.pickFromPool = p => (engine.pickFromPool = _p, p.find(e => e.id === "srv_sleep_2a"));
engine.trigger("server");   // "coffee", "calls" or "sidequest" for the other areas
```

For the week mode there is more: paste `tools/dev-woche.js` into the console and
`dev.hilfe()` lists everything — produce any weekday, trigger the night, unlock
the gala.
