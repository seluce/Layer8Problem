# Layer8Problem — Tools

An overview of everything under `tools/`. As of 6.0.

What follows is the **with what**: which tool is there for what, which switches
it knows, and which message is to be taken seriously. Every command runs from
the repository root.

---

## The short overview

| Tool | Call | When |
|---|---|---|
| Data checker | `npm run lint:data` | after **every** data change, gate at 0/0 (`:en`, `lint:all`) |
| Prose report | `node tools/report-prose.mjs [pool …] [--lang=en]` | after every text wave |
| Day simulator | `npm run sim [n] [--lang=en]` | before every balance decision (day) |
| Week simulator | `npm run sim:week [n] [--lang=en]` | before every balance decision (week) |
| Coverage simulator | `npm run sim:coverage [days] [--runs=N] [--compare] [--lang=en]` | before every change to the DRAW, no gate |
| Voice manifest | `npm run voice:manifest` / `npm run lint:voice` | after every change to TERMINAL prose, once audio exists |
| Generation run | `npm run voice:audio -- [--trial=x] [--pool=p] [--limit=n]` | turns the manifest into audio; costs money, needs `ELEVENLABS_API_KEY` |
| Audio guard | `node tools/check-audio.mjs` | runs as `prebuild`; restores `public/audio/` from `docs/` so a build cannot drop it |
| Test suites | `npm test` | before every delivery |
| Console tool | `tools/dev-week.js` into the browser console | play testing on the live game |
| String checker | `npm run lint:i18n` | after **every** change to interface strings, gate at 0/0 |
| Parity checker | `npm run lint:parity` | after **every** translation, gate at 0 errors |
| Field scanner | `node tools/scan-fields.mjs <pool> [--list] [--german] [--key=field]` | **proof of completeness** for a translation block, no gate |
| String pass | `node tools/scan-strings.mjs [path …] [--sentences] [--nouns] [--all-attrs]` | before claiming a **code** surface is done, no gate |
| Steam presence | `node tools/make-steam-presence.mjs` | when a `presence.*` string changes; upload the output to Steamworks |
| Steam achievements | `node tools/make-steam-achievements.mjs` | when an achievement title or `hint` changes, or an achievement is added |

**The order of a content session:** write in German → `lint:data` →
`report-prose` → translate → `scan-fields` as proof of completeness →
`lint:all` (both trees, interface strings, parity) →
`npm test` → `sim`/`sim:week` as a smoke test → ship.

---

## 1. `lint-data.mjs` — the data checker

```
npm run lint:data
```

The only real **gate**: it exits with an error code, so it works as a GitHub
action. The standing state is **0 errors, 0 warnings** — so every new message
comes from the work in hand and is not a legacy. That discipline is the reason
the tool is worth anything; ten permanent false positives would be the fastest
route to learning to ignore it.

Three levels: **✗ error** (aborts), **! warning** (should stay at zero),
**i info** (for information, e.g. the diary statistics).

What it finds — throughout, things that fail **quietly** at runtime:

- duplicate event ids across *all* pools (`usedIDs` is one global set)
- `loot`/`req`/`rem` on items that do not exist; quest items as a condition
  (trophies are lootable only)
- `char`/`rep`/`reqRep` names that are not in `data_chars.js`
- **encounter continuations against their own opener** (6.4): a `reqRep` next
  to a `reqStory` is a second gate since the engine asks both, so a threshold
  pointing the other way is content nobody can reach
- story flags that are demanded but never set (dead content) — and, the other
  way round, flags that are set with no taker (a dead end)
- chains: `next` into the void, unreachable nodes and results, dead ends
- **lock-out:** an event all of whose options need an item
- the number grid (steps of five), `m < 2`, "Gratis-Vorspuler" (a lot of time,
  hardly any effect)
- time predicates: `reqStoryAge` without `reqStory`, unplayable ranges, the
  Friday dangling trap
- **clock times in scenes** (an event can be drawn at any time); reviewed
  exceptions live in `clockReviewed`
- follow-up events claiming immediate proximity („Kaum hast du …")
- unknown fields — the quietest bug there is: a typo parses cleanly and is
  discarded at runtime
- markup in fields that are output as plain text; invisible characters
- **emoji in event prose** (6.3): the terminal describes; mails, phone chats
  and the intranet are typed by their characters and keep theirs
- items: the `use` block complete, `passive` valid, costs only with a cooldown
- **the party's six stations** (6.1): `loc` and an option's `checkPool` against
  the closed list — the engine filters on `loc` and validates nothing, so an
  invented station is simply an event that is never drawn
- **the gala's five finales** (6.2): every `party_finale_*` needs its line in
  `data_lore.js` under `gala` and every line its finale, the `standard`
  fallback included. Without the pair the chronicle quietly records the
  standard evening
- the diary: conditions that stumble or fit no conceivable day
- **the vending machine** (6.3, section 12): every compartment's `take` is one
  the engine accepts (`VENDING_TAKES` in `engine_vending.js`) and every take
  has a compartment; `limitRule` points at a rule that exists; the crank's
  beats - the time with nothing new to read - stay under twenty seconds, and
  the whole run, reading time included, under ninety (measured with
  `crankDelays`, the function the window paces itself with); every `sound`
  on a crank line is one `engine_audio.js` has (`VENDING_SOUNDS`) - an
  unknown one plays nothing and throws nothing; every take
  leaves a note in the knowledge book - `VENDING_FLAGS` in the engine is held
  against the takes and against the compendium notes, in both directions,
  and its flags count as set for the compendium check; exactly
  one closing line is marked `lands` and it is not the first (without it the
  roll never reaches the backpack); and the machine's prose goes through the
  same text rules as every event
- **years the calendar overtakes** (6.3, section 13): a year that is this
  year or later reads wrong once it has passed ('the 2027 procurement round
  ... until then'), and a year with an age beside it in the same field is
  right for one year only ('1998 ... running for 25 years'). Past years on
  their own are left alone. Sums of money are not years (`2000€`).
  Reviewed exceptions go into `yearReviewed`. The present is read from the
  clock, so warnings can only disappear with time, never appear on New
  Year's Day. The interface strings are checked too
- **doors** (section 12b): a result starting with `CMD:` has to be a command
  `engine_events.js` handles — the list is read out of that file — and every
  command it handles has to be used somewhere. A typo would otherwise reach the
  player word for word, at 0 errors and 0 warnings

**Introduced a new field? Then add it here** (`EVENT_KEYS`, `OPT_KEYS`,
`USE_FIELDS`, `PASSIVE_FIELDS`), otherwise it is an error.

## 2. `report-prose.mjs` — the prose report

```
node tools/report-prose.mjs              # all pools, German tree
node tools/report-prose.mjs server       # targeted
node tools/report-prose.mjs coffee calls
node tools/report-prose.mjs lunch --lang=en   # English tree
```

Pools: `server coffee calls sidequests emails meetings lunch party reputation
bossfights special board diary moods achievements excuses newsTicker tutorial
chars vending`. The intranet stays out on purpose (component-rendered, a tone of
its own). `special`, `diary`, `excuses`, `newsTicker` and `vending` are trees of
text rather than event lists and are walked leaf by leaf; for `vending` the ids,
picture paths, emoji and the type plate are skipped.

**`--lang=de|en`, default `de`.** The language is in the report's header line;
if the requested tree does not load, the tool aborts rather than falling back to
German and presenting the report as English.

**No gate.** The tool always exits with 0 and is deliberately kept out of the
build: whether a repeated sentence is a lazy copy or a running gag is decided by
a human. Twelve sections (with the mail pool selected, two more follow as 13
and 14; 1 to 12 keep their numbers whatever the selection):

1. verbatim repeated sentences across different events
2. repeated word sequences from five words up ← **the most useful section**
3. game mechanics in the narrative text („Deine Aggro steigt")
4. typo candidates
5. references that let the game age
6. template constructions as a frequency **baseline** (twelve patterns)
7. telegraph candidates: events with very short result texts
8. thin openings (scene text under 80 characters)
9. conspicuous option labels (over-long, or an ASCII arrow)
10. the old register in labels: a prefix or a trailing bracket — the migration
    list to the house style
11. the etiquette before direct speech. **Only the LEFT half is at issue:** does
    it name the action („Zettel schreiben:") or judge the choice („Der
    Klassiker:")? Kept apart from 10 because mixing them buries a handful of
    real findings under 130 correct labels. A prefix with a quotation inside it
    („Taktik 'Verbrannte Erde':") slips past both — one case in the stock
12. heavy effect, thin text: a **single** result under 80 characters that costs
    30+ minutes, moves aggro or boss by 20+, or opens a chain — the reading
    list, shortest first. Sits at the end so 8 to 11 keep their numbers

**Section 7 measures the event, section 12 the single result.** Section 7 takes
the average over an event's results and so found two events in a stock where a
player kept meeting single results that felt too short; those are individual
texts, and short is relative to what they cost — 58 characters after `m: 2` is
a beat, 58 characters after `m: 60` is an hour nobody explains. Section 12
holds the single result against its effect. Both are reading lists, not
rewrite orders: the doctrine's line is "too short only when it lacks the
moment, not when it lacks words", and „Alles ist aus. Auch das Licht. Aber die
Türen sind offen." over a `b: 20` is a punchline that stays. Measured on
19/08/2026 before the first pass: **41 findings in German, 66 in English**
(English is simply more compact — the 29 English-only hits were all faithful
translations of German texts just over the line). Read the German list, it is
the source tree; the English follows.

**Section 3 checks both languages** — `Faulheit`/`Chef-Radar` and
`Laziness`/`Boss Radar` sit in one list, because a German stat in an English
text (and the other way round) is a finding as well.

**Since 6.1 it also catches the bar read out under a synonym:** `Wut`/`Zorn`/
`Ärger` and `anger`/`fury`/`rage` next to a direction verb (`sinkt`, `steigt`,
`fällt`, `klettert` — `sinks`, `drops`, `falls`, `rises`, `climbs`), in either
order and at most three words apart. "Deine Wut sinkt massiv." over an
"Aggro -20" is the leak the 6.0 pass removed nine times as "Radar", and six of
them survived that pass because the list knew the stat's name and not its
synonym. Whether a hit is the player's value or a character's temper — Gabi's
blood sugar rises, her rage drops — is a human read; the report only surfaces
it.

**Section 6 measures both languages, in two mirrored sets of thirteen patterns
each.** A pattern with no hits drops out of the report, so a German run shows
only German lines. The mirroring is deliberate: the section is a before/after
gauge, and two languages counting different things cannot be held against each
other. The one exception is „Dafür …", which breaks into three turns of phrase
in English and therefore has a shared line.

**The German baseline shifted once, on 15/08/2026:** „Wenigstens" is now counted
together with „Immerhin", because it is the same move and English has one word
for both. Measured: „Immerhin" 13 times, „Wenigstens" 3 times. All pools 227 →
**230 hits**, lunch alone 12 → **14**. Older notes with the smaller figures mean
the same stock.

**And again on 19/08/2026, in both languages:** the shrug refrain „Nicht dein
X, nicht dein Y" / „Not your X, not your Y" („Nicht dein Zirkus, nicht deine
Affen", „Nicht mein Ticket, nicht mein Problem") is a thirteenth row. Twelve
hits in the prose of each tree, fourteen by plain grep (two sit in labels or
mid-sentence and stay out by design). All pools 239 → **251** in German, 10 →
**22** in English. Whether it is a running gag or a stamp is not decided by
the row; the row only keeps the number in view.

**Method:** write first, then measure, then correct. A before/after comparison
rather than a target of zero — section 6 is *supposed* to have hits. Intended
refrains may stay, but they need a why.

## 3. `simulate-day.mjs` — day balance

```
npm run sim                    # 1500 days per cell
npm run sim 300                # quick smoke test
npm run sim 300 -- --lang=en   # English tree
```

**The double dash is compulsory.** `npm run sim 300 --lang=en` is swallowed by
npm itself — the run then starts **in German**, with nobody saying so. That is
why the loaded language sits in the header line: `Simulation (en): …`. If you do
not see it there, you have measured the German tree. Called directly via
`node tools/simulate-day.mjs 300 --lang=en` the double dash is not needed.

**What the comparison of the two languages can do — and what it cannot.** The
simulation is not seeded (`Math.random()` without a starting value): two German
runs of 400 days give 42.0 % and 40.3 %. The de-versus-en comparison is
therefore a **smoke test** — does the English tree play at all, and does it land
in the same corridor. It is not a proof of equality; what really secures the
numbers is `lint-parity`.

It plays real working days against the real pools and **mirrors the engine
formulas exactly** (laziness unscaled, aggro increase scaled, boss radar doubly
scaled, tickets, mail chance, valves, end conditions in engine order).
Deliberately simplified: no encounters, no excuses, no alcohol — so the survival
rate is a **lower bound**.

Experiment switches (defaults = the current state):

```
--lazydiv=300     lazyMult = 1 + fl/300 instead of fl/200
--lazycap=1.3     cap lazyMult
--nolazyeasy      switch lazyMult off on Easy
--mailbase=0.12   base probability for mails
--valves=25,40,50 valve reset values per difficulty
--decay=1         radar drops by N every 30 minutes
--normmult=…      multiplier for Normal
```

## 4. `simulate-week.mjs` — week balance

```
npm run sim:week                    # full runs
npm run sim:week 300                # smoke test
npm run sim:week 300 -- --lang=en   # English tree (double dash, see 3)
```

Five strategies (among them `sensible` = always the safest choice,
`casual`, `coffeeAddict`) times three levels of recovery (rested /
irritated / in need of a holiday). Output per cell: week survival rate, deaths
by weekday and cause, average day reached, ticket carry-over, excuses, idle
clicks, "pool empty before Friday", wins after a crisis evening.

Switches:

```
--wear=10          wear on the night's recovery, in percentage points
--cap=45           absolute upper limit of the night's recovery
--ramp=0.04        rise of the day multiplier per weekday
--rscale=1.0       scaling of the recovery rates
--nightkeep=0.25   share that carries over the night
--nighthalf        night halved (comparison variant)
--nighttickets=N   tickets carried over the night
--meeting=50       time cost of the Friday meeting
--contscale=1.0    scaling of the daily quotas
--nocontingent     quotas off entirely
--idlem/--idlel/--idlea   vector of the idle click
```

**Two mirror contracts** that can drift apart and must not: `MAXC` has to match
`WEEK_CONTINGENTS` in `engine_week.js`, and `IDLE_M/F/A` the `week_idle` vector
in `data_special.js`.

**Always compare against a fresh baseline run**, not against memory — even 300
runs per cell fluctuate by several percentage points.

## 5. `simulate-coverage.mjs` — what a career gets to see

```
npm run sim:coverage                      # 25 days, 200 careers, the live rule
npm run sim:coverage 50 -- --runs=400
npm run sim:coverage -- --compare         # the live rule against three others
npm run sim:coverage -- --lang=en
```

The other two simulators answer whether a day can be survived. This one
answers how much of what is WRITTEN a player ever reaches - and it is the
only one that can, because the draw's unseen preference lives between days
and both of the others forget everything overnight (`simulate-week.mjs` says
so in its own comment).

It keeps `archive.seenEvents` and `archive.seenOptions` across the days as
the save file does, and **calls the engine's own `preferUnseen()` and
`openDoorsLeft()`** instead of reproducing them. The day simulator copies the
formulas because it needs them per step and accepts the drift risk; here
there is no reason to pay it.

| Column | Means |
|---|---|
| events seen | how much of the stock the career ever opened |
| doors taken | how many of the 2338 options were actually chosen |
| spent repeats | draws landing on a scene already read to the end - **waste** |
| open repeats | draws on a KNOWN scene with a door left - the good repeat |
| most drawn | how often the single most repeated scene came up |

`--compare` puts the live two-stage rule beside `flat` (no preference, as
before 6.4), `unseen-only` (6.4's first stage alone) and `open-only`. It is
how the current rule was chosen, and `open-only` is the warning: preferring
open doors INSTEAD of new scenes looks good on one column and is worse
everywhere else, because a player who keeps picking the safe answer never
finishes a scene, so it stays preferred for good.

**Both trees must give the same numbers** - only prose differs between them.

**25 days is the useful default.** Below about two weeks the first stage
still finds something new every draw, so every rule measures the same and
the run says nothing.

## 6. `make-voice.mjs` — which text becomes which audio file

```
npm run voice:manifest          # write voice/manifest.de.json and .en.json
npm run lint:voice              # hold both manifests against both trees
node tools/make-voice.mjs       # report only, write nothing
```

Narration is pre-rendered rather than spoken at runtime, so that the voice
sounds the same on every machine. That makes the audio and the prose two
separate things which CAN drift apart: edit a line and the file still says
the old one, at 0 errors and 0 warnings. Every entry therefore carries the
checksum of its source string, and `--check` is the gate that notices.

**What gets a voice: the terminal.** Eleven pools, listed in `TERMINAL` at
the top of the tool - a new one is added there and nowhere else. Mails, the
phone, the intranet, the board, the vending machine, the log and the books
stay for reading: they run at the player's own pace, or they differ from run
to run. Scenes marked `kind: 'phone'` are skipped inside the terminal pools
as well.

**Option labels are deliberately absent.** 3470 files for 114 minutes, and a
read-out list of buttons sounds like a railway announcement. Whoever needs
them read has a screen reader, supported since 6.4.

**The key is the path from the pool**, with the nearest enclosing `id`
standing in for the position in its array: `coffee/cof_milk_1/text`,
`meetings/meet_audit_1/nodes/liste/text`, `party/party_bar_1/opts/1/r`. An
event that MOVES within its file keeps its audio; only a rewrite of the prose
invalidates it. The option index in a key can shift when an option is
inserted - unlike `archive.seenOptions`, that is harmless here, because the
checksum then fails and the file is simply respoken.

**Both trees must produce the same keys.** They did on the first run, 4651
each, no difference in either direction - the same rule that `lint:parity`
enforces for the data. The fifteen named interface strings bring it to 4663,
the 118 morning moods (`moods`, the morning screen) to 4781.

| | |
|---|---|
| pieces | 4781 per language |
| characters | 830,693 de · 803,706 en |
| as speech | 15.4 h · 14.9 h |

**Every entry carries two checksums, and they answer different questions.**
`sha` is taken over the text as WRITTEN and is the file name - the browser
hashes the sentence it is about to show and asks for that file. `spk` is taken
over the text as SENT, after `spokenForm()`, and it is the only thing that can
see a change to the respelling rules: nothing in the prose moves, so nothing in
`sha` moves, so the ledger calls the piece finished and the provider is never
asked again while the file goes on saying the old thing.

This was one `transform` version number before, bumped by hand. It could only
ever report "all of it is stale" - and `make-audio.mjs` never read it, so
bumping it marked 4663 pieces changed and re-rendered none of them. A checksum
per piece is exact in both directions: adding the German `Rack` respelling
marked 109 pieces and left the other 4554 alone.

**Not part of `lint:all` yet.** Until the audio exists the manifest is a
plan, and gating every data edit on a plan is noise. It joins the gate with
the first generated file.

## 7. `make-audio.mjs` — the generation run

```
npm run voice:models                                  # which models this account may use
npm run voice:audio -- --dry-run                      # what it would send and cost
npm run voice:audio -- --trial=v4 --pool=coffee --limit=100
npm run voice:audio                                   # the real run
```

Reads `voice/manifest.<lang>.json`, sends every piece that is not finished
yet, and writes two files per piece: the provider's MP3 into
`voice/master/<lang>/` and an opus into `public/audio/<lang>/`.

**The key comes from `ELEVENLABS_API_KEY` in the environment.** It is never
written to a file, a log line or an error message — the wrapper around
`fetch` re-throws a reason of its own, because the original error can carry
the request headers.

**Who speaks is in `voice/run.<lang>.json`**, which is committed: voice id,
model, output format, opus bitrate. `voiceSettings` starts as `null` and is
filled from the provider on the first run and written back. "Everything on
default" is only reproducible while the provider's defaults stay put;
written down, it is reproducible for good.

### The file name is the checksum of the text

`0ca9ab1281f7.opus`, not `coffee--cof_newbie_1--text.opus`. The browser has the
sentence on screen and has to find the file that speaks it; naming the file
after its text means hashing what is about to be shown and asking for that —
no index to ship, and nothing to thread down from the engine. The manifest is
the map from key to file, and it is in the repository: to find a scene's
recording, look its key up there and take the `sha`.

Which also means **edited prose with stale audio goes silent rather than
lying.** `npm run lint:voice` is in `lint:all` and would stop it shipping
anyway, but if it ever got past, the player hears nothing instead of the
sentence that used to be there.

`src/engine/sha1.js` computes the same digest in the browser, because
`crypto.subtle` needs a secure context and the Electron build loads over
`file://`. `tools/voice.test.mjs` holds the two implementations against each
other over all 9,296 pieces.

**A `CMD:` result is not collected.** `CMD:OPEN_BOARD` and its two siblings
stand where prose stands but are instructions — `resolveTerminal` swaps them
for a dictionary line. Three of them were bought and rendered in 6.4 before
anyone noticed; the rule that keeps them out is in `voice-text.mjs` and the
test reads the handled doors out of `engine_events.js`, so a fourth is covered
the day it is handled.

### Listening to it: `npm run voice:listen`

```
npm run voice:listen            # writes voice/index.<lang>.html and serves it
```

The folder is unreadable by eye, which is the price of naming a file after its
text. This builds the page that reads it back: every piece with its key, its
file, its length and the sentence it speaks, searchable and filterable by pool,
with a play button. Both languages, generated from the manifest in a second,
and gitignored - it is derived, and 3.2 MiB a language that would change on
every edited line.

**Served rather than double-clicked**, on `localhost:4180`. The page sits in
`voice/` and the audio in `docs/audio/` - siblings, and since Firefox 68 a
`file://` page may only read files in its own directory and below. The buttons
would have been dead in Firefox and alive in Chrome, which is the worst kind of
difference to hand someone.

### The three places a file goes

| Where | What | In the repository? |
|---|---|---|
| `voice/master/<lang>/` | the provider's MP3, 815 MiB for German | no |
| `public/audio/<lang>/` | opus at 24 kbps, the build's input | no |
| `docs/audio/<lang>/` | the same opus, what GitHub Pages serves | **yes** |

The masters are the thing that was bought. Re-encoding to another bitrate
from them is free; asking the provider again costs the whole run. They never
go into the repository and never onto the published site.

The opus exists twice on disk and once in git. `public/assets` and
`docs/assets` show what the alternative looks like: 21 MB of identical
images, committed twice. For audio that would be 310 MiB for German alone,
and another full copy in the history on every later re-render.

### Resuming

Every finished piece goes into a ledger beside the masters, with its
checksum and the model it was made with. An abort therefore costs nothing,
a rewritten line re-renders alone, and switching the model re-renders
everything — which is the point.

A run refuses to start if the tree and the manifest disagree, so audio can
never be bought for a text the gate has not seen.

### `--trial`

Writes into `voice/trial/<name>/`, with a ledger of its own, so a trial can
never damage a finished run — which is what makes an A/B between two models
safe — and a trial that dies at piece 60 of 100 does not charge for those 60
again. The useful shape is one pool in manifest order, so what comes out is a
real play sequence rather than six pieces picked by hand: that is the only
way to hear whether the voice holds ACROSS calls, which is the actual risk
at a median of 171 characters a piece.

### `--context`, and why it is off

`previous_text` sends the scene opening along with a result without speaking
it, and is the documented cure for short, unstable pieces. It is **not**
documented whether it is billed. The dry run prints both numbers:

```
to do   100 of 4663 pieces, 15.623 characters
context 15.087 characters as previous_text (billing unknown)
at most $1.25 at the published rate, $2.46 if context is billed
```

Close to 1:1 — being wrong about this doubles the run. So it stays off until a
run measures it. The report prints **credits spent per character**, and the
same pool run twice, once with `--context`, settles it by the ratio.

### Credits are not characters

The subscription endpoint calls its counter `character_count`, and it is not
one. The meetings pool spoke 46,176 characters and spent **5,754 credits** —
0.125 credits a character on v4 Turbo inside a Starter plan. An earlier
version of this tool multiplied those credits by the per-character dollar rate
and printed a figure that meant nothing at all.

So the dollar line before a run is an **upper bound at the published
pay-as-you-go rate**, which is the dearest way to buy the characters; usage
inside a plan's included credits has come out cheaper. The line after a run
reports what was actually spent, in credits, with the rate it worked out to
and how far the plan's remainder still reaches.

## 8. `npm test` — the five test suites, in both languages

```
npm test        # 17 / 253 / 20 / 46 / 16, then the same five again with --lang=en
npm run test:de # one language only, while working
npm run test:en
```

**Why twice:** every suite takes `--lang=en` and loads the other tree. Both
trees carry the same ids, story flags and numbers, so anything a test actually
checks holds in both languages — which makes the second run cheap and turns any
comparison against display text into a failure. Before 6.1 the suites only ever
saw German, and `t()` falling back to German in Node made that invisible: the
week balance comparisons were green while the English legend read `L/A/B` above
rows labelled `F/A/C`.

> **And the second run has to STAY in its language.** One test in `week-flow`
> switches on purpose, to hold the two trees against each other — it used to
> switch back to a hard-coded `'de'`, so the whole English run went German from
> that line on: two thirds of the largest suite, silently, and green. Seven old
> comparisons against German display text were living in that shadow. The last
> check in the suite now holds `language()` **and** `currentLanguage()` against
> `LANG`, so the next one is caught at once. Whoever switches, switches back to
> `LANG`.

Runs under `node --conditions browser --import ./tools/register.mjs`.
`register.mjs` hooks in `svelte-loader.mjs` so that `engine_state.svelte.js` is
compiled and **the runes are live** — the tests therefore run against the real
engine modules, not against dummies.

| File | What it secures |
|---|---|
| `week-foundation.test.mjs` | the foundation of the week module (state, transitions) |
| `week-flow.test.mjs` | the wired week loop on the real core/events/week; UI and audio stubbed |
| `dev-script.test.mjs` | every scenario of `dev-week.js` against the real engine |
| `i18n.test.mjs` | the language layer: default and detection, the switch without a reload, the fallback for a missing key, the Steam presence and the achievement order against `STEAM_ORDER` |

Sections in `week-flow` (sorted by topic): entering the mode, clocking off, the
weekend, the morning end check, resume, mode separation, daily quotas, items
with cooldown and cost, time predicates, the meeting, the diary, play-test
findings, defaults, archive counters.

**Two traps from practice:**

- **The scaffolding stubs engine functions** (`renderTerminal` among them). To
  check a *wiring*, the real implementation has to be called directly:
  `events.renderTerminal.call(engine, …)`. Otherwise the test only checks the
  helper and stays green although the hook is missing.
- **Mutation probes are part of it:** reverse the change for a moment, the test
  has to fall, then restore it. A test that does not fall checks nothing.

### `voice.test.mjs` — the narration

The fifth suite, and the reason it is its own: every link between a sentence on
screen and the file that speaks it fails SILENTLY. A digest computed one way in
Node and another way in the browser does not throw — the narrator is simply
mute, in the shipped game only. A window that forgets to hush reads a result
out over the noticeboard. Sixteen checks, fifty mutation probes
(01.11.2026).

Six of those checks arrived with the voiced interface strings and the two
behaviours around them, and two of them were written twice. The first version
of the reachability check searched the raw source for each key and passed while
the call site was deleted: every voiced key also stands in an `i18n-uses:`
comment a few rows above, and `tutorial.ask.text` is the mark `dressAskModal()`
writes besides. It now strips comments, claims only that the key has not been
RENAMED out from under the list, and the four places that actually speak are
asserted separately.

Two faults the probes could not have found, because both were in the ORDER of
things and only the running game shows that: a language switch spoke a tutorial
bubble that `skip()` had left behind in the state, and the mail's resume asked
`state.isEmailOpen` — a flag every closing path clears one line AFTER hiding
the window, so the line was never once given back. Both are covered now.

Three more checks came with the respelling rules. Two of them are a pair, held
in both directions because both directions are silent: the German rule has to
reach the German tree, and it must not reach the English one, where the voice
reads `Rack` correctly already. The candidate scan is case-insensitive while
the rule is not - German capitalises its nouns, so a lowercase `rack` arriving
in that tree is a gap, and this is where it comes out instead of going quietly
to the provider.

The third is the one that cost the most to learn. `collectEntries()` was called
once per language in a loop, and the deferred pools are cached on `DB` by NAME:
the second call reloaded the core tier and left all eleven terminal pools in
the first language, with `currentLanguage()` already reporting the second, so
the guard inside saw nothing. The measurement built on it called 4625 of 4663
English pieces drifted, which reads like a broken tree rather than a mixed one
— and acting on it would have bought a second English run. `setLanguage()` is
the path that drops the cache; the check asserts that every terminal pool
really changes, because one identical line is ordinary and a whole pool of them
is the old tree still sitting there.

The sixteenth covers the read-aloud button beside the excuse, and it is three
checks in one because three separate things about it fail without a sound: the
door has to go PAST `narrationEnabled` (a button that refuses is a button that
does nothing in the only case it was built for), `state.narratable` has to come
from `narrate()` and not from `narrateWindow()` (or it offers to repeat a
tutorial bubble over a working day), and the speaking flag has to reach the
rune state through its one writer (or the icon sticks). Both screens that
carry it have to ask `engine.canReplayNarration()` rather than decide for
themselves, and the event's tool row has to stand for the button alone, since a
boss fight has no excuse. Its first version nearly defeated itself: the
component said in prose that it deliberately does NOT ask
`narrationEnabled`, and a search of the raw file reads that as asking it — the
same trap as the reachability check above, and the reason there is now a
`markup()` helper that strips HTML comments as well.

## 9. `dev-week.js` — the console tool

Open the file, paste the contents into the browser console of the running game.
`dev.help()` lists everything. Indispensable for the three-parters, because it
lets you produce any weekday.

```
SETUP
  dev.day(3, 'normal', {tickets: 5, al: 60})   any weekday
  dev.quotas()                                 draws per pool today
  dev.preview()                                what the night leaves behind

SCENARIOS
  dev.clockOff(2) / dev.clockOff(2, true)      Tuesday 16:20
  dev.night()                                  the night screen immediately
  dev.friday() / dev.friday('tight')
  dev.meeting()                                straight into the weekly meeting
  dev.won()                                    Friday 16:30, week survived
  dev.out('rage'|'tickets'|'chef', day)        targeted failure
  dev.morningDeath(4)                          death during the morning mood
  dev.gala()                                   unlock the gala, then dev.meeting()
  dev.idle('server')                           empty the quota

SAVES
  dev.counters() / dev.clearCounters()
  dev.backup() / dev.restore()                 before/after
  dev.dropWeek()                               discard the week
```

**`dev.backup()` before experimenting**, then `dev.restore()` and reload.
`dev.clearCounters()` clears the test rubbish out of the archive counters —
otherwise trial runs distort the statistics permanently.

The tool is covered by `dev-script.test.mjs`: a broken console helper shows up
in the test suite, not first in the browser.

## 10. Retired tools

Four tools used to live here and have been **removed**. They remain only as a
note, so that nobody finds them in an older note and goes looking:

- **`audit-stats.mjs`** — checked the signs of the stats against the house rules
  (`l` down for industry, `b` down for company benefit). It classified via
  keywords and therefore had a high false-positive rate; every hit was a
  question, not a verdict. On its last run (2026-08) it found no real sign
  errors.
- **`reorder-opts.mjs`** — distributed the order of the options once (beforehand
  the cheapest sat at the top in 53 % of events). The distribution has been held
  by hand ever since; the target values and the measured state are in
  `EVENT-DOKTRIN.md` §2a.
- **`normalize-quotes.mjs`** (removed 23/10/2026) — put the quotation marks
  of every data file into house style, through the parser, in two passes:
  the notation in the source and the marks the player reads. Its last run
  changed nothing in either pass. The visible half is a `lint-data` warning
  (double quotation marks at the first level), and a run over every text at
  once is exactly the pattern run `CLAUDE.md` rules out; a stray mark is
  fixed by hand where the linter names it.
- **`check-echoes.mjs`** (removed 23/10/2026) — looked for word sequences of a
  freshly translated pool in the already-translated stock, to catch a
  translation repeating its own phrasing. Built for the translation phase,
  which is over; echoes within the game `report-prose` finds anyway, and on a
  new block it reported mostly stock phrases ('on the third floor').

---

## What the tools CANNOT do

- **Whether a text sounds human.** The prose report only says where to look
  first.
- **Whether a repetition is deliberate.** Running gag or laziness is decided by
  a human.
- **Whether a topic is narratively duplicated.** The duplicate check runs by
  hand with `grep`: before every new event, test the motifs against the stock.
- **Whether the balance feels good.** The simulator measures rates, not fun.

## Rules of thumb

- **Measure, do not estimate.** On every suspicion of a bug, reproduce first and
  claim afterwards. More than once a suspected bug turned out to be test
  history, an upload artefact or a wrong expected value.
- **A gate stays a gate.** `lint:data` stands at 0/0. Anyone who cannot silence
  a message enters it, with a reason, into the relevant exception list
  (`clockReviewed`, `timeRefReviewed`) — documented, not clicked away.
- **Prevent bugs as they arise**, do not patch them afterwards: write Svelte
  a11y in straight away, leave no compiler warning standing.
- **No stale sources.** Always continue working on a file changed during the
  session from your own output, never afresh from the project snapshot.

---

*Keep this up to date when a tool is added or gains a new switch.*

---

## `scan-glossary.mjs` — removed, its result is in `GLOSSAR.md`

The stock scanner did its job and is gone. It produced the candidate list from
which `GLOSSAR.md` was built: named things, numbers in option labels,
capitalised shouts, colours on operable things, characters and items — sorted by
**spread across pools**, not by frequency, because a term appearing in two pools
is a translation contract, while one in a single pool is a decision that can
wait.

The problem it solved has **not** gone away with it: many events are connected
in substance **without** a `reqStory` recording it. The colour-blind
electrician's note makes a later choice solvable, "0000" is the answer to a
puzzle, "4711" is an alarm code in one pool and a ticket number in three others.
Anyone writing new content records such connections in `GLOSSAR.md` **by hand** —
there is no tool left that finds them.

---

## `lint-i18n.mjs` — the string checker

```
npm run lint:i18n
npm run lint:all        # data (both trees) + interface strings
```

**A gate at 0 errors and 0 warnings**, like the data checker.

It exists because a missing interface string goes wrong **quietly**. `t()` falls
back to English and then to the key — so a typo does not throw but writes
`settings.langauge` in small print into a menu nobody opens twice. At 651 keys
and two languages that is not a possibility but a certainty.

What is checked:

1. Every key used in the source is in **both** dictionaries.
2. Both dictionaries carry the same set of keys, and each key the same
   `{placeholders}` (6.3). `tf()` fills what the text asks for and drops the
   rest silently, so a `{wait}` missing in one language just loses the number.
3. No entry is unused — otherwise a rename leaves the old one standing.
4. Entries whose English reads verbatim like the German. During the interface
   pass that is the work list; afterwards it is a finding.
5. The fallback text in `index.html` against **`en.js`** — the markup *is* the
   fallback, so it has to say what `t()` says when a key goes missing.
6. Two ways a mark destroys what it sits on. `data-i18n` assigns `textContent`,
   which owns the whole element: on an empty one (**2a**) the text goes nowhere
   and the sentence beside it belongs to the parent; on one that carries child
   markup (**2b**) that markup is deleted at startup, in every language. A
   `<span>` around the text alone fixes both.

**The three markup forms** (details in `src/i18n/i18n.svelte.js`):

```html
<span data-i18n="intro.archive"></span>
<p data-i18n-html="intro.pitch"></p>
<img data-i18n-attr="alt=intro.logoAlt;title=intro.archive">
```

`-html` only where a sentence carries inline markup. The pitch on the start
screen has a `<strong>` in the middle; taking it apart would mean handing a
translator fragments instead of a sentence. Because it is the only form that
writes markup, a `grep` for `data-i18n-html` finds every such place at once.

**Computed keys** cannot be read by any pattern. For those there is a note in
the comment:

```js
// i18n-uses: language.name.de, language.name.en
const options = LANGUAGES.map(l => [l, t(`language.name.${l}`)]);
```

Without it these entries would sit permanently in the report as unused — and a
warning that is always wrong teaches everyone to skip the section.

---

## `lint-parity.mjs` — the parity checker

```
npm run lint:parity
node tools/lint-parity.mjs intranet server     # targeted
```

`lint-data.mjs` checks **one** tree. Two trees that have drifted apart would
both come through it clean. This one holds them against each other.

It rests on the rule the whole design rests on: **both trees carry the same ids,
story flags, character names and numbers. Only the prose differs.** That is
exactly what makes a save file language-independent — it is not a habit but the
precondition.

What is checked:

1. **The same shape** — every key, every list length, every nesting.
2. **The same identifiers** — `id`, `next`, `reqStory`, `req`, `rem`, `loot`,
   `char`, `seen`, `flag`, `tone` and the remaining identifiers.
3. **The same numbers** — `m`, `l`, `a`, `b`, `timer`, reputation values,
   thresholds. A changed number means: the English version plays differently,
   and nothing on screen shows it.
4. **Prose has to differ** — a text that reads verbatim the same in both trees
   has not been translated yet. That is **not an error** but the work list; it
   appears under "STILL GERMAN".

What is not checked is whether the English is any good. No tool can do that.

**On its very first run it found a bug straight away** — a `versionNote` that
had been lost while inserting the translated block. Exactly the case it exists
for: the linter was green, the build was green, and the English page would have
had one line fewer.

### When a file is missing from the English tree

Since 6.0 the parity checker also compares the **file inventory** of both trees,
and since 6.3 in both directions: a data file that `data.js` does not list is an
error too. The pool lists themselves are no longer copied into the checker but
imported from `data.js` (`POOL_NAMES`, `CORE_NAMES`) — until then a pool added
there and forgotten here went through as "in step" without ever being compared.
Without it the symptom only surfaces in the browser, as
`Unknown variable dynamic import: ./data/en/data_xyz.js`, followed by a game
with empty views — empty archive, empty settings. The bundler is looking for the
**file**; its contents are beside the point.

A new data file therefore has to be created in both trees. If one is missing,
add only what is missing — never regenerate the whole tree, or already-translated
files get overwritten with the German source:

```bash
for f in src/data/de/*.js; do
  b=$(basename "$f")
  [ -f "src/data/en/$b" ] && continue
  { echo "// i18n-status: untranslated - still the German source, see GLOSSAR.md"
    cat "$f"; } > "src/data/en/$b"
  echo "added: $b"
done
npm run lint:parity
```

`untranslated` on the first line means: still the German source. Only when it is
set to `translated` may a checker complain about German remnants in that file.
Forget to set it and you have a translated file passing itself off as
untranslated — which is exactly what happened once with the intranet.

---

## `scan-fields.mjs` — the field scanner (proof of completeness)

```
node tools/scan-fields.mjs emails                  # overview per entry
node tools/scan-fields.mjs emails --list           # every identical place
node tools/scan-fields.mjs emails --list --german  # only those that look German
node tools/scan-fields.mjs intranet --key=status   # one field right across
```

**No gate.** It runs over both language trees in parallel and reports **every**
text field as identical or different — **with no word floor**, grouped per
entry, with one line per field name at the end.

**What it is for:** `lint-parity` counts only prose with **at least four words**
(`isProse`). That is right for a parity checker and wrong for a work list or a
completeness list. In the intranet block a whole section stayed invisible
because of it (`status`, 30 German fields, one of them four words long); in the
mail pool **157 of the 161 sender lines** sit below the threshold, and the CC
distribution hung on exactly that.

**The number that counts is at the end:** how many text fields there are, how
many are identical, and how many of those `lint-parity` can see at all.

```
sender  gesamt  161  identisch  50  davon deutsch  0  >=4 Wörter  1
```

**The language detector tests itself at startup**, in both directions, and the
tool aborts if it does not hold (GLOSSAR §7b, case twenty-one). **It remains a
sieve all the same:** „Seit 2019 in Kraft" carries none of its words, and
conversely it fires on deliberately German proper nouns (`Schnösel`, `Jürgen`,
`Döner`). **Every hit belongs read, not counted** — a detector that filters out
proper nouns passes every probe and checks nothing any more.

---

## `scan-strings.mjs` — every literal in the code, with no language filter

```
node tools/scan-strings.mjs                 # the default space, 78 files
node tools/scan-strings.mjs src/engine      # a named surface
node tools/scan-strings.mjs --sentences     # only strings containing a space
node tools/scan-strings.mjs --nouns         # only capitalised single words
node tools/scan-strings.mjs --all-attrs     # structural attributes as well
```

Never a gate, always exits 0. This is the counterpart to `scan-fields.mjs`: that
one proves a **data** surface complete, this one a **code** surface. Neither
judges — both lay out everything and leave the reading to a person.

**It has no idea what German is, and that is the whole design.** Four earlier
passes searched for German words and three of them lost something: capitals
without umlauts (`KAFFEE`, `DIENSTGANG` — the four buttons of the action bar
stood in no finding), text nodes spanning several lines, and text nodes with
`{…}` in them. The umlaut filter is no better: over the 401 strings of
`engine_ui.js` it produced exactly one hit, and that was the single place that
was *not* to be changed.

So the file goes through a real parser instead:

| Type | How | Kind in the output |
|---|---|---|
| `.js` `.mjs` `.cjs` | acorn; comments fall away with the parser | `str`, `tpl` |
| `.svelte` `.html` | script blocks to acorn, style and comments dropped, Svelte expressions cut out by **counting** braces | `text`, `attr` |

Template literals are cut into their **pieces without the expressions**:
`` `Tag ${n}` `` yields `Tag ` and nothing of `n`. Static attribute values are
shown too — they are neither text node nor script string and were in no earlier
pass; `alt` and `placeholder` live there.

**The search space is named in the output**, because "the interface is done" is
a sentence about a search space and is worthless without one. A run without
arguments covers `src/engine`, `src/components`, `src/i18n/i18n.svelte.js`,
`src/main.js`, `src/engine.js`, `src/data.js`, `src/tutorial.js`, both
`platform*.js`, `index.html`, `electron/main.cjs`, `vite.config.js` and
`tools/`. Skipped, each with its reason printed: the two dictionaries (`de.js`
is German by trade, `en.js` is held against it by `lint-i18n` rule 4) and
`src/data/` (that is `lint-parity`'s beat).

**What is left out is a decision about the ROLE of a string, never about its
language** — module specifiers are paths, `class` and `viewBox` are markup.
`value` and `content` are deliberately *not* on that list although they look
structural: an `<option value>` is a word somebody chose. `--all-attrs` shows
everything, and holding one run against the other is how you check that the
list hides nothing. The moment a filter asks "does this look German?" the tool
has become one of the three passes above.

**Two second grips** for when a run is too long to read in one sitting:
`--sentences` (strings with a space — those are the sentences) and `--nouns`
(capitalised single words — German nouns sit there). Neither catches anything
extra; they only make 400 lines bearable.

**acorn is not in `package.json`.** It arrives with Vite, and this tool
imports it undeclared. That holds today and is worth a `devDependencies`
entry the next time the file is opened.

---

## `make-steam-presence.mjs` — the friends-list strings

```bash
node tools/make-steam-presence.mjs [--out build/steam]
```

Writes `4487580_loc_english.vdf` and `4487580_loc_german.vdf` into
`build/steam/`. Both files belong uploaded in the Steamworks backend under
**Rich Presence Localization**.

**Why it exists.** Steam shows the status in the friends list in the language of
**whoever is looking** — but only if the game sends an *identifier*
(`#Status_coffee`) and Steam resolves it from the uploaded file. Up to 6.0 the
game sent the finished sentence through `%statustext%`, so every friend read the
player's language.

**The sentences stay in the repository.** They live under `presence.*` in
`src/i18n/`, where `lint-i18n` and `lint-parity` can see them; the tool merely
translates them into the upload format. Which activities exist is in
`src/engine/presence.js` — rune-free, so that this tool can read it in plain
Node.

**It is more than a formatter:** it aborts if an activity stands there without a
string, or a string without an activity. The first would produce a naked
`#Status_lunch` in the friends list, the second well-groomed dead entries. A
test in `i18n.test.mjs` holds the same two lists against each other.

> **The order is not a matter of taste.** The file has to be in Steamworks
> **before** a build is shipped that sends the new identifiers — otherwise every
> player has the raw identifier in their friends list. `#DisplayStatus` is still
> written alongside, so that a client which does not yet have the update carries
> on unchanged.


---

## `make-steam-achievements.mjs` — the achievement strings

```bash
node tools/make-steam-achievements.mjs [--out build/steam/achievements]
```

Writes `4487580_loc_english.vdf` and `4487580_loc_german.vdf` into
`build/steam/achievements/`. Upload under **Stats & Achievements**.

> **The file has the same name as the Rich Presence one and belongs somewhere
> else.** That is why the two tools write into separate folders. Mix them up and
> you overwrite one set with the other in Steamworks.

**`hint` is taken, not `desc`.** In the game a locked achievement shows the hint
and an unlocked one the description; Steam does not know this distinction, so it
gets the one that gives nothing away.

**`STEAM_ORDER` in the head of the tool is a contract with Steamworks, not a
sort order.** Steam names achievements by their **position**
(`NEW_ACHIEVEMENT_1_7_NAME`), and that order is **not** the one in
`data_achievements.js`: the three week achievements have sat at the top of the
file since 5.0 and at the bottom in Steamworks (24–26). Generated from the file,
all 27 would have been shifted by three — every achievement in the shop with its
neighbour's name, and no checker here would have seen it.

**A new achievement is appended at the BACK**, in `STEAM_ORDER` as in
Steamworks. The tool aborts if an achievement is missing from the tree or does
not appear in `STEAM_ORDER`; a test in `i18n.test.mjs` holds both lists against
each other.

> **The mapping has been proven once, not guessed.** The generated German file
> was held byte for byte against the one uploaded in 2026 (which ran under
> `english`, because back then there was only one language) — identical apart
> from the language line. All 27 descriptions there are the `hint`, none a
> `desc`.
