# Project structure

```
index.html              Vite entry point, loads src/main.js
vite.config.js
package.json            "type": "module"

README.md
STRUCTURE.md            this file
EVENTS.md               how events are built — the contributor's guide
changelog.md

electron/
  main.cjs              Electron main process, loads docs/

src/
  main.js               entry point: stylesheet, engine, mounting the components
  app.css               Tailwind directives, @source list, custom classes
  engine.js             bootstrap, keyboard control, global error catcher
  data.js               database, split into immediate and deferred
  tutorial.js
  platform.js           platform interface, web version
  platform_steam.js     Steam bridge, loads itself only under Electron

  components/           38 Svelte components, 8 of them for the intranet
  engine/               11 modules; engine_state.svelte.js holds the state,
                        engine_week.js the week mode
  data/de/              23 data files, the German source
  data/en/              the same 23, in English
  i18n/                 language selection and interface strings
  assets/               processed by Vite, see below

public/
  assets/               copied verbatim, see below

tools/
  lint-data.mjs         data check, npm run lint:data (and :en)
  lint-i18n.mjs         interface strings, npm run lint:i18n
  lint-parity.mjs       parity of the two language trees, npm run lint:parity
  simulate-day.mjs      day simulation, npm run sim
  simulate-week.mjs     week simulation, npm run sim:week
  report-prose.mjs      prose and style report, node tools/report-prose.mjs [pool]
  scan-fields.mjs       every text field of both trees, with no word floor
  check-echoes.mjs      word-sequence echoes against the already-translated stock
  normalize-quotes.mjs  quotation marks, one-off
  make-steam-presence.mjs      friends-list strings for Steamworks
  make-steam-achievements.mjs  achievement strings for Steamworks
  dev-woche.js          console tool for the week mode, see below
  WERKZEUGE.md          manual for everything in this folder
  *.test.mjs            four test suites, npm test
  register.mjs          loader hook for the tests
  svelte-loader.mjs     compiles .svelte.js for the tests
```

## Why data/ lives in two trees

Both carry the same ids, story flags, character names and numbers — only the
prose differs. Two things follow from that, and both are deliberate:

**A save file is language-independent.** Nothing persisted refers to a text, so a
save survives a language switch in the middle of the week. Language is a display
setting, not a game mode: no migrating of save files, no second set of
statistics, no separate achievements.

**The immediate tier is no longer a static import.** Which language applies is
not settled until `localStorage`, Steam and the browser have been asked. That is
why `data.js` loads it through `loadCore()`, and `main.js` waits for that before
the first component is mounted. For the same reason `engine.js` no longer calls
`init()` itself — fourteen components import the engine, and the import graph
would otherwise pull it up before the language was known.

**The language switch no longer reloads the page.** Up to 6.0 it did, and the
reason was solid: the pools sit cached on `DB`, and the scene on screen comes
from the old tree — left alone, the player would be looking at a half-converted
display. Three pieces solve that now:

- **`active` is a rune** in `src/i18n/i18n.svelte.js`. It holds the language in
  force, and everything that reads it recomputes.
- **`tree()` is the only permissible place for a component to read the data
  tree.** `DB` is a plain object — `data.js` may not carry runes, because the
  Node tools load it without the Svelte loader. The language switch replaces its
  contents, and a `$derived` that reads only `DB` **does not notice**: the
  dictionary strings around it change, the data-tree text stays put. `tree()`
  reads the language rune on the way past.
- **`relocaliseScene()`** pulls the open scene across from the new tree, so a
  switch in the middle of an event does not leave half the card behind.

`setLanguage()` in `data.js` empties `DB` **synchronously** and reloads;
`i18n.switchLanguage()` awaits that before it moves the language rune —
otherwise something renders against the half-emptied tree. The reload path
remains as a fallback in case the other tree cannot be loaded.

## src/assets/ or public/assets/

The split looks arbitrary and is not. It follows one question: **can Vite see
the reference to the file?**

**`src/assets/`** — when Vite finds the path at build time, that is, from a
`url()` in CSS or from an `import`. Vite then rewrites the URL and appends a
checksum, so that a browser cache does not serve the old file after an update.

Living there: the two typefaces and the three textures — all referenced from
`app.css`.

**`public/manifest.json`** — a special case for the same reason, but the other
way round: Vite *could* see the reference from `index.html` and would then write
the file with a checksum into `docs/build/`. That is exactly what must not
happen, because `start_url: "./index.html"` is relative to where the manifest
sits — from `docs/build/` it would point at a file that is not there. In
`public/` it ends up after the build as `docs/manifest.json` next to
`index.html`, and the reference holds.

**`public/assets/`** — when the path only comes into being at runtime. No
bundler can resolve `assets/img/items/${id}.webp`, because `id` is not known
until the game is running. These files are copied verbatim and keep their path.

Living there: all item, character and achievement images, the interface icons
(`img/ui/`, `img/actions/`, `img/difficulty/`) and the music. For the icons the
path is mostly built at runtime — the settings list and the terminal header pick
their image from a table. The few hard-wired references in `index.html` sit
alongside them for consistency, as the logo always has. The character images
have been needed in two places since 4.1: in the terminal as the event portrait
and in the messenger as the contact photo. The intranet pages lived here too up
to v4.0.0 — as standalone HTML files in an iframe, which needed a hand-copied
version of the stylesheet. They are components under `components/intranet/` now
and share the game's build.

In short: **reference visible in the code → `src/`. Path built at runtime →
`public/`.**

## Why docs/build/ and not docs/assets/

By default Vite puts bundled files in `docs/assets/` — exactly where the
contents of `public/assets/` land as well. The two then mix in one directory,
and a static file could in principle mask a generated one.

`assetsDir: 'build'` in the Vite configuration separates them:

```
docs/assets/    copied from public/, paths as in the source
docs/build/     generated by Vite, with checksums
```

The runtime paths in the data files are untouched by this.

## Commands

```
npm install
npm run dev            development server on port 8080
npm run build          generates docs/
npm run preview        inspect docs/ locally (port 4173)
npm run lint:data      data check (German tree)
npm run lint:data:en   the same for the English one
npm run lint:i18n      interface strings
npm run lint:parity    parity of both trees, file inventory included
npm run lint:all       all four in sequence — the gate
npm test               four test suites: week mode, console tool, i18n
npm run sim            day simulation for balance
npm run sim:week       week simulation for balance
npm start              builds and starts Electron
npm run start:dev      Electron on the existing build
npm run build:win      desktop build (Windows)
npm run build:linux    desktop build (Linux)
```

`docs/` is published via GitHub Pages (setting: Deploy from a branch, `main` +
`/docs`). The build therefore belongs in the repository: `npm run build` first,
then commit and push — otherwise the live site is older than the code.

Because `docs/` is overwritten on every build, **no** documentation belongs in
it. That is why the markdown files sit in the root.

## Tools

`lint-data.mjs` and the two simulators belong in the workflow: the linter after
every data change (0 errors, 0 warnings), the simulation before every balance
decision. `simulate-week.mjs` is a standalone sibling of `simulate-day.mjs`, not
an extension: both carry the same formulas as a copy, so that a change to the
day model does not silently shift the week calculation. The week's calibration
sits inside it as the default, and `npm run sim:week` reproduces it without
parameters.

`dev-woche.js` is not imported but pasted into the browser console. After that
`dev.` will produce any weekday, trigger the night screen or the Friday finale,
unlock the gala, and clear up the counters that testing inevitably creates.

The linter checks references and conventions: item, character and flag names
(`req`, `rem`, `loot`, `rep`, `char` — at node level in chats as well),
duplicate ids, unknown fields, quest items used as `req`/`rem`, time references
in follow-up events, the deletion convention in the inbox (a delete option
carries `ignoreEmail: true` and comes last) and orphaned invisible characters.
The last two come from a concrete bug: in `mail_leak_1` two variation selectors
sat in front of the button text without an emoji base. Invisible in the editor,
invisible in the game — but every text pattern walked straight past them, and so
the option stayed in the wrong position without its flag for years.

The rule for **unknown fields** checks, per position, what the engine actually
reads there, which is stricter than a mere list of permitted names: `reqStory`
on a lunch break is never evaluated (the break draws purely at random), `req` in
a mail just as little, and a node option in a dialogue carries only `t` and
`next` — its effects belong in the result. The trigger was an `ep` instead of
`rep` in an errand chat, which swallowed a reputation change for two versions. A
typo in a field name is the quietest class of bug there is here: it parses
cleanly and then disappears at runtime.

**`lint-parity.mjs` checks what `lint-data.mjs` cannot see.** The data checker
reads **one** tree; two trees that have drifted apart would both come through it
clean. The parity checker holds them against each other: same shape, same
identifiers (`id`, `next`, `reqStory`, `req`, `rem`, `loot`, `char`, `tone` and
the rest), same numbers (`m`, `l`, `a`, `b`, `timer`, reputation values,
thresholds) — and since 6.0 the same **file inventory** as well, because a file
missing from the English tree would otherwise only surface at runtime, as
`Unknown variable dynamic import`. Prose that reads identically in both trees is
reported under "NOCH DEUTSCH": not an error, but the work list.

**`lint-i18n.mjs` checks the interface strings**, and it exists because a
missing key goes wrong **quietly**: `t()` falls back to German and then to the
key itself, so a typo does not throw but writes `settings.langauge` into a menu
nobody opens twice. It checks that every key used sits in both dictionaries,
that both carry the same set of keys, and that none is unused. No pattern can
read computed keys; for those there is the note `// i18n-uses: a.b, c.d` — one
line per registration.

`report-prose.mjs` is not a build gate but a report for editorial work: the exit
code is always 0, every finding is reading material. Call it with a pool
(`node tools/report-prose.mjs coffee`) or without for all of them. It reports
verbatim repeated sentences and word sequences across event boundaries,
stat language in narrative text ("Aggro steigt"), typo patterns, ageing
references, result texts that are too terse, thin openings, conspicuous labels,
the old register in options (section 9) and opening templates (section 10). The
tool knows the legitimate exceptions and does not report them: subject lines,
caller displays, chat messages and deliberate onomatopoeia.

`normalize-quotes.mjs` is a one-off tool, and repeatable — a second run changes
nothing. It makes two passes over the quotation marks, see below. `--dry`
reports without writing.

The order of the options was distributed once with `reorder-opts.mjs`
(beforehand the cheapest option sat at the top in 53 % of events). That script
is done and removed. The target distribution is in `EVENT-DOKTRIN.md` §2a and
has been held by hand ever since; it belongs re-measured after every wave,
because the obvious solution drifts upwards on its own while writing.

Two tools carry the bilingual work, and neither is a gate: `scan-fields.mjs`
reports **every** text field of both trees as identical or different, with no
word floor — that is how the completeness of a translation block is proven,
never off the number from `lint-parity`, which only counts from four words up.
`check-echoes.mjs` looks for word sequences of the freshly translated pool in
the already-translated stock; many translation-born echoes are four words long
and therefore sit below the prose report's threshold.

A complete manual for every tool is in `tools/WERKZEUGE.md`.

## Tests

`npm test` runs four suites in sequence: the foundation and the flow of the week
mode, the console tool, and the language layer. They run against the **real**
modules, not against replicas — only display and audio are substituted.

That takes two devices, which sit in `register.mjs` and `svelte-loader.mjs`: the
loader hook sends every `.svelte.js` file through `compileModule()` so that the
runes do anything at all in Node, and `--conditions browser` makes sure the same
entry points are resolved as in the game. Both files are worthless without the
suites, and without them no suite starts.

Two traps, both of which have already sprung:

**Randomness does not belong in an assertion.** One test compared the preview of
the night screen against the state *after* the morning mood — and that is rolled.
It fell over on every third run. It now checks against the save point that
`continueWeekNight()` writes before the morning.

**The state is a module singleton.** What one test leaves behind, the next one
sees. `resetState()` therefore also resets `difficultyMult` and the achievements;
without the latter, the gala once fired unexpectedly on a later Friday.

## Conventions in the data files

How an event is built technically — fields, construction types, examples — is in
EVENTS.md. What follows are the rules that apply to the stock.

**Notation:** strings sit in double quotation marks. That is more than taste —
tools that search the files as text skip a file written differently, and do so
silently. That is exactly what happened once to the entire party pool, without a
single error message.

**Game text:** first-order quotation marks are single — `'so'` for direct
speech, names and ironic distance. Double ones only as second order inside a
quotation. That suits the terminal fiction, in which everything is monospace and
ASCII. The linter warns when double ones appear in first order.

**Follow-up events stand on their own.** An event with `reqStory` can arrive
hours after its trigger, or not at all. It may therefore neither claim immediate
proximity ("Kaum hast du…") nor push the trigger into the past ("wegen
gestern"). The linter checks both directions across all text fields.

**Quest items are lootable only** — trophies from reputation events and for
achievements. They may never appear as `req` or `rem`; the linter checks it.

**Nothing language-dependent may serve as a comparison value.** This is the rule
the bilingualism rests on, and it breaks **quietly**: hold a display string
against something and you build a bug that never shows up in German and simply
never fires in English. Three fields exist for that reason alone:

| Field | instead of | where |
|---|---|---|
| `senderId` | the sender's **name** | `data_emails.js`, 161 of 161 mails — `EmailView` keys the CC rules off it. Before that the component compared the prose ("buchhaltung", "sicherheit"), which holds for exactly as long as the pool is German |
| `player: true` | the character's **name** | `data_chars.js`, once. The player entry is the only one whose `name` differs between the trees — `Du (Müller)` against `You (Miller)` |
| `tone` | a composed class name | `data_intranet.js`, 65 keys. Tailwind reads the source; a name built at runtime is invisible, and the colour disappears silently. The component maps `tone` onto whole class names |

This is why **seven** colleagues carry reputation and not eight: the eighth
entry in `data_chars.js` is the player character, and no event sets `char` or a
`rep` key to their name. Doing so would break the language independence of the
save file.

**Two fields are translated although they look like identifiers.** `appName` in
the errand pool is display text: 21 distinct values, six of them translated
(`Nachricht` → `Message`, `Anruf` → `Call`, `Kleinanzeigen` → `Classifieds`,
`System Warnung` → `System Warning`), the rest are brand names and stay the
same. `loc` and `checkPool`, by contrast, are genuine identifiers and stay
identical in both trees.

**Reputation sparingly:** ±5 is the rule, ±10 the justified exception, anything
above that an event with weight. That way the relationship with the colleagues
grows over several working days instead of in a single one. Where a character
appears in an event, they belong in the `char` field as well — otherwise the
card stays faceless.

**Labels are actions, not tags.** A button describes in a natural verb phrase
what Miller does ("Ihn vor dem Spinat-Kern warnen"), or it is bare direct speech
when the joke is in the wording ("'Herr Koch? Die Suppe ist kalt!'"). The
attitude sits in the verb or the adverb ("Panisch auflegen"), not in a prefix
("Lüge:") or a bracket ("(Kapitulation)"). Capitals carry the blow-up, quotation
marks the irony of a "'versehentlichen'" sabotage, an em dash the afterthought.
Action buttons end without a full stop, spoken sentences with normal
punctuation; the guideline is under 60 characters. Exempt is whatever has to be
real: subject lines in the inbox, caller displays on the phone screen, ticket
statuses and the parodied descaling software with its 73 steps. Section 9 of the
prose report lists what is still in the old register.

**Openings without a template.** The first sentence of an event carries the
scene. "Du willst…" only when the joke sits in the same sentence; entrances
vary instead of every colleague "in der Tür steht"; "plötzlich" only when the
surprise is the content and not merely a filler. Section 10 of the prose report
watches over this.

**Result keys start with `res_`.** The terminal appends a "…" badge to every
chain option whose target is *not* named that way — the sign that the
conversation continues. An exit called `truth` therefore promises a
continuation and then hangs up. The linter reports deviations as info and not as
a warning: 108 of the 319 exits in the stock still carry old names, and renaming
a result means dragging along every `next` that points at it.

**In the smartphone chat**, plain text is a message Miller sends — full
sentences, emojis allowed. Square brackets are an action rather than a message,
whether an app function or a physical one: `[Gruppe verlassen]`,
`[Handy frustriert weglegen]`, media as `[GIF gesendet: …]`. Hybrids combine
both.

Up to 4.1 app functions additionally carried a `System:` in front of the text.
That has gone — the brackets say the same thing, and eight characters are a lot
in a narrow chat window. Inside the chat bubbles `[System: …]` does remain:
there it is the messenger's own notice, not the label of a button. The data
checker keeps the distinction open.

**Portraits in chains** resolve per node: a `char` on the node wins, otherwise
the node inherits the event's `char`, and without either the initial remains. So
one field covers every case — one character for the whole chat, a guest
appearance in the middle of a chain (in which case the character's name also
appears above the bubble), and groups in which only individual voices have a
face. `char: null` on a node forces the initial despite the event character.
That strangers — scammers, the prince, mum, the landlord — carry no `char` at all
is deliberate: whoever is not in the address book has no photo either.

`renderChainNode` in `engine_events.js` evaluates this for **every** chain, in
the terminal as in the chat. In the stock, however, only the weekly meeting uses
it: 48 nodes across eight meetings carry their own `char`, the 58 nodes of the
calls and the 153 of the errands not one, and `char: null` appears nowhere. The
capability is therefore older than its use — whoever employs it in a chat will be
the first.

## State and display

`src/engine/engine_state.svelte.js` holds the game state in `$state()`. The
engine changes it as before, the components read from it and update themselves.

Everything belonging to a working day comes from `freshDay()`. The base state is
derived from it, so a new field does not have to be declared in two places and
cannot go missing after a day restart. What is meant to survive the day —
settings, archive, difficulty — deliberately sits outside.

**Trap:** importing `state` means the `$state` rune can no longer be used in the
same file. Svelte reads `$name` as a store subscription, and `state` is not a
store. For element references an attachment is the better route anyway, see
`PhoneView.svelte`.

## The week mode

`engine_week.js` carries the entire mode. Two rules keep the day mode clear of
it, and both have proved useful more than once during construction:

**`state.difficultyMult` remains the identity boundary of the day mode.** The
week never touches it. All the formula sites read `effMult()` or `statMult()`
instead, the latter carrying the Wednesday surcharge (1.0 becomes 1.1 at the
formula site, while the stored value stays 1.0 — everywhere else it is an
identity comparison). Scattered `> 1.0` queries have been replaced by
`difficultyTier()`, which maps both modes onto 1/2/3.

**The night is not a second reset path.** `advanceWeekNight()` calls `freshDay()`
and afterwards writes back only the carry-over. Anyone creating a new day field
does not need to know about the night — the field resets there as it does
everywhere else. The other way round (the night listing what it resets) would be
the kind of code that breaks exactly once, at the next new field.

The week run has its own save slot (`KEYS.weekState`). `saveDay()` redirects
there while a week is running, so that the day slot never holds half a week; a
working day already begun is untouched by this and waits at its own button.

The same separation applies to the counters: weekdays do not increment the day
counters, the week counts through `recordWeekResult()`. Only the streak carries
on across modes, because a survived weekday is a survived day.

**Time thresholds need a window, not a barrier.** A single option can cost up to
four hours (median 5 minutes, maximum 240 in the boss fights). The lunch break
knew only "from twelve" and could therefore be pushed into the afternoon; it now
has a window up to 14:00. For the same reason Friday only ends after the weekly
meeting — between 15:00 and 16:30 there are only 90 minutes of buffer.

## Overlays

All twenty full-screen windows are switched through the same three functions in
`engine_ui.js`: `showOverlay()`, `hideOverlay()`, `isOverlayOpen()`. Open means:
the class `hidden` is absent.

This is not a question of style. Up to 4.1 the intro and the day selection ran
through `style.display`, and an inline style masks the class without removing
it — the day selection kept its `hidden` while it was visible, and every check
of "is the window open?" answered no. Switch a window any other way than through
these three functions and you build the same bug again.

`STARTUP_OVERLAYS` groups the three windows that stand in front of the game: the
intro, the question about an interrupted day, the day selection. As long as one
of them is up, the game does not run — keys do nothing, Escape closes nothing,
the day cannot be restarted.

### The page behind the window

Windows can sit on top of one another: the key bindings over the settings,
"Use it?" over the backpack. The scroll lock is therefore not a yes/no affair
but a set of named holders — `lockScroll(name)` and `releaseScroll(name)`. The
page is released when the last one lets go.

A counter would do the same, until it slipped out of step once; after that the
page is either locked forever or scrolls behind an open dialogue. With a set,
locking twice has no consequence, and a release by the wrong party changes
nothing.

`showOverlay` and `hideOverlay` handle this as well. Touch the body by hand and
you defeat the bookkeeping. Two exceptions deliberately do not lock and are
opened with `showOverlay(el, false)`: the noticeboard, which should stay
scrollable on a phone, and the tutorial pointer, which is not a window at all.

None of this is visible above 1024 px — beyond that `app.css` keeps the body
still anyway. Bugs in this area do not show up on a desktop.

### The trap in the nested `ui` object

In `engine_ui.js` there is a second, nested `ui` object under `ui:` for export
and import. It is called as `engine.ui.openExportModal()`, so `this` there points
at that inner object and not at the engine. Write `this.showOverlay()` from
there and you are calling `undefined`.

That was exactly the case for two versions: export and import threw on click,
the global error catcher swallowed it, and for the player nothing happened. From
inside the inner object the engine is reached through `engine.`.

## What deliberately does not live in components

The **positioning of the tutorial pointer** in `tutorial.js` measures with
`getBoundingClientRect()` where an element actually ended up — that can only
happen against the rendered document.

The tutorial's **glow rings** act on elements of several components. Going
through the state would mean each of them has to know about the tutorial. With
`ActionBar` it would be harmful as well: the component deliberately keeps
nothing state-dependent in the `class` attribute, because Svelte would otherwise
rewrite it on every change and remove the rings.

## Language in the repository

| What | Language |
|---|---|
| Code, comments, identifiers, file names | **English**, without exception |
| Game texts | **German and English** — `src/data/de/` is the source, `src/data/en/` the version beside it |
| Interface strings | both, in `src/i18n/de.js` and `en.js` |
| Documentation (`README`, `STRUCTURE`, `EVENTS`, `WERKZEUGE`, `changelog`) | **English** |
| Tool output (linters, simulators, reports) | **German** |
| Commit messages | **English** since 6.0, format `type(scope): description` |

The game is set in a German office, and writing starts in German — the German
tree is the source, the English one the translation. The tool output stays
German because nobody outside development reads it; commit messages went English
with 6.0, because they stand on GitHub next to the code and the documentation.
Commits from before that stay as they are.
