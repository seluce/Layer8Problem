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
| Test suites | `npm test` | before every delivery |
| Console tool | `tools/dev-woche.js` into the browser console | play testing on the live game |
| String checker | `npm run lint:i18n` | after **every** change to interface strings, gate at 0/0 |
| Parity checker | `npm run lint:parity` | after **every** translation, gate at 0 errors |
| Field scanner | `node tools/scan-fields.mjs <pool> [--list] [--german] [--key=field]` | **proof of completeness** for a translation block, no gate |
| Echo check | `node tools/check-echoes.mjs <pool> [--n=4]` | after every translation block **and after every repair**, no gate |
| Quotation marks | `node tools/normalize-quotes.mjs --dry` | rarely, after importing foreign text |
| Steam presence | `node tools/make-steam-presence.mjs` | when a `presence.*` string changes; upload the output to Steamworks |
| Steam achievements | `node tools/make-steam-achievements.mjs` | when an achievement title or `hint` changes, or an achievement is added |

**The order of a content session:** write in German → `lint:data` →
`report-prose` → translate → `scan-fields` as proof of completeness →
`check-echoes` → `lint:all` (both trees, interface strings, parity) →
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
- items: the `use` block complete, `passive` valid, costs only with a cooldown
- the diary: conditions that stumble or fit no conceivable day

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
bossfights special board`.

**`--lang=de|en`, default `de`.** The language is in the report's header line;
if the requested tree does not load, the tool aborts rather than falling back to
German and presenting the report as English.

**No gate.** The tool always exits with 0 and is deliberately kept out of the
build: whether a repeated sentence is a lazy copy or a running gag is decided by
a human. Ten sections:

1. verbatim repeated sentences across different events
2. repeated word sequences from five words up ← **the most useful section**
3. game mechanics in the narrative text („Deine Aggro steigt")
4. typo candidates
5. references that let the game age
6. template constructions as a frequency **baseline** (twelve patterns)
7. telegraph candidates: events with very short result texts
8. thin openings (scene text under 80 characters)
9. conspicuous option labels
10. the old register in labels (the migration list)

**Section 3 checks both languages** — `Faulheit`/`Chef-Radar` and
`Laziness`/`Boss Radar` sit in one list, because a German stat in an English
text (and the other way round) is a finding as well.

**Section 6 measures both languages, in two mirrored sets of twelve patterns
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

Five strategies (among them `vernunft` = always the safest choice,
`gelegenheit`, `kaffeejunkie`) times three levels of recovery (rested /
irritated / in need of a holiday). Output per cell: week survival rate, deaths
by weekday and cause, average day reached, ticket carry-over, excuses, idle
clicks, "pool empty before Friday", wins after a crisis evening.

Switches:

```
--wear=10          wear on the night's recovery, in percentage points
--deckel=45        absolute upper limit of the night's recovery
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

## 5. `npm test` — the four test suites

```
npm test        # 16 / 126 / 20 / 30
```

Runs under `node --conditions browser --import ./tools/register.mjs`.
`register.mjs` hooks in `svelte-loader.mjs` so that `engine_state.svelte.js` is
compiled and **the runes are live** — the tests therefore run against the real
engine modules, not against dummies.

| File | What it secures |
|---|---|
| `week-foundation.test.mjs` | the foundation of the week module (state, transitions) |
| `week-flow.test.mjs` | the wired week loop on the real core/events/week; UI and audio stubbed |
| `dev-script.test.mjs` | every scenario of `dev-woche.js` against the real engine |
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

## 6. `dev-woche.js` — the console tool

Open the file, paste the contents into the browser console of the running game.
`dev.hilfe()` lists everything. Indispensable for the three-parters, because it
lets you produce any weekday.

```
SETUP
  dev.tag(3, 'normal', {tickets: 5, al: 60})   any weekday
  dev.kontingente()                            draws per pool today
  dev.vorschau()                               what the night leaves behind

SCENARIOS
  dev.feierabend(2) / dev.feierabend(2, true)  Tuesday 16:20
  dev.nacht()          the night screen immediately
  dev.freitag() / dev.freitag('knapp')
  dev.meeting()        straight into the weekly meeting
  dev.gewonnen()       Friday 16:30, week survived
  dev.raus('rage'|'tickets'|'chef', tag)       targeted failure
  dev.morgentod(4)     death during the morning mood
  dev.gala()           unlock the gala, then dev.meeting()
  dev.leerlauf('server')                       empty the quota

SAVE FILE
  dev.zaehler() / dev.zaehlerLeeren()
  dev.sichern() / dev.zurueck()                before/after
  dev.aufraeumen()                             discard the week
```

**`dev.sichern()` before experimenting**, then `dev.zurueck()` and reload.
`dev.zaehlerLeeren()` clears the test rubbish out of the archive counters —
otherwise trial runs distort the statistics permanently.

The tool is covered by `dev-script.test.mjs`: a broken console helper shows up
in the test suite, not first in the browser.

## 7. `normalize-quotes.mjs` — quotation marks

```
node tools/normalize-quotes.mjs --dry     # report only
node tools/normalize-quotes.mjs           # write
node tools/normalize-quotes.mjs src/data  # restrict to a directory
```

Two passes that look the same and are not:

1. **Notation** — how a string is written in the source file. The project uses
   double quotation marks throughout. Important beyond taste: tools that search
   the files as text skip a file written differently, and do so **silently**.
2. **Text** — what the player reads. House rule: first order `'so'`, second
   order `"so"` (that is, the usual nesting with the roles swapped, fitting a
   game that imitates a terminal).

It works through the parser, never through search-and-replace, and checks its
own result before writing. Even so: **always `--dry` first.**

## 8. Retired tools

Two tools used to live here and have been **removed**. They remain only as a
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
back to German and then to the key — so a typo does not throw but writes
`settings.langauge` in small print into a menu nobody opens twice. At 651 keys
and two languages that is not a possibility but a certainty.

What is checked:

1. Every key used in the source is in **both** dictionaries.
2. Both dictionaries carry the same set of keys.
3. No entry is unused — otherwise a rename leaves the old one standing.
4. Entries whose English reads verbatim like the German. During the interface
   pass that is the work list; afterwards it is a finding.

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
   appears under "NOCH DEUTSCH".

What is not checked is whether the English is any good. No tool can do that.

**On its very first run it found a bug straight away** — a `versionNote` that
had been lost while inserting the translated block. Exactly the case it exists
for: the linter was green, the build was green, and the English page would have
had one line fewer.

### When a file is missing from the English tree

Since 6.0 the parity checker also compares the **file inventory** of both trees.
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

## `check-echoes.mjs` — the word-sequence check

```
node tools/check-echoes.mjs emails          # the four-word level
node tools/check-echoes.mjs emails --n=6    # the sharp grip
node tools/check-echoes.mjs emails --min=1  # pairs within the block as well
```

**No gate.** Two questions in one run: which word sequences of the freshly
translated pool also appear in the **already translated** files, and which run
across more than `--min` entries within the block.

**Why alongside `report-prose` and not behind it:** its section 2 starts at
**five** words. Many translation-born echoes are four long — "the two of you",
"in the middle of", "and that is precisely the". The maxim from GLOSSAR §7b:
where German has several words for the same thing and English one obvious one,
the echo comes into being during translation and appears in no source.

**Run it again after every repair.** In four out of five blocks a repair was
itself an echo; the numbers have to fall **monotonically**. If one rises, the
last repair was one.

> **`TRANSLATED` in the head of the tool has to grow with it.** If a finished
> pool is not in there, the new block is held against a still-German stock, and
> **every** sequence looks unique.
>
> **The probe:** a tool that reports 0 belongs held against a known hit. With
> the stock fully translated, `check-echoes meetings --n=6` reports **36**
> (measured 16/08/2026). In the thirteenth session it was 22 — the number
> **rises** as further pools move into `TRANSLATED`, because then there is more
> stock to compare against. Take an older number as the target and you will
> mistake a grown comparison set for a bug.


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
