<p align="center">
  <img src="build/logo.png" width="96" alt="Layer8Problem">
</p>

<h1 align="center">Layer8Problem</h1>

<p align="center">
  <em>"The problem is usually located about 30 cm in front of the screen."</em>
</p>

<p align="center">
  <a href="https://seluce.github.io/Layer8Problem"><img src="https://img.shields.io/badge/play-in%20the%20browser-22c55e?style=flat-square" alt="Play in the browser"></a>
  <a href="https://store.steampowered.com/app/4487580/Layer8Problem/"><img src="https://img.shields.io/badge/Steam-store%20page-1b2838?style=flat-square&logo=steam&logoColor=white" alt="On Steam"></a>
  <img src="https://img.shields.io/github/package-json/v/seluce/Layer8Problem?style=flat-square&color=3b82f6&label=version" alt="Version">
  <img src="https://img.shields.io/badge/Svelte-5-ff3e00?style=flat-square&logo=svelte&logoColor=white" alt="Svelte 5">
  <img src="https://img.shields.io/badge/Deutsch%20%C2%B7%20English-complete-8b5cf6?style=flat-square" alt="German and English">
  <img src="https://img.shields.io/badge/licence-MIT-64748b?style=flat-square" alt="MIT licence">
</p>

<p align="center">
  <strong>A satirical sysadmin simulator.</strong> You are GlobalCorp's IT department.<br>
  One person. For everyone.
</p>

<p align="center">
  <a href="https://seluce.github.io/Layer8Problem"><b>▶ Play now</b></a> — free, no sign-up, no download. Runs on a phone as well as on a desktop.
</p>

<p align="center">
  <img src="screenshots/serverraum.webp" width="100%" alt="The server room: an event with three options, two of them locked behind an item that is missing">
</p>

---

Between Chantal from marketing, a boss who thinks IT is voodoo, and a ticket
counter that never runs backwards.

Every 30 minutes a ticket lands in your system. At ten open tickets it collapses
and you are out. So you take calls, run to the server room, fetch coffee and go
on errands — keeping an eye on three values while you do:

| | |
|---|---|
| <img src="public/assets/img/ui/ui_lazy.webp" width="22" alt=""> **Laziness** | The higher it is, the harder the boss punishes your mistakes. |
| <img src="public/assets/img/ui/ui_angry.webp" width="22" alt=""> **Aggro** | At 100 % you blow up. The valve opens exactly once. |
| <img src="public/assets/img/ui/ui_eye.webp" width="22" alt=""> **Boss Radar** | At 100 % you get a written warning. After that, the sack. |

Every decision costs time, and the clock only runs one way.

---

## Two ways to play

**Working Day** — one shift, 08:00 to 16:30. Survive until clocking-off time. By
evening everything is forgotten and tomorrow you start from zero again. Choose
beforehand how much you hate your life: a relaxed Friday, an ordinary Wednesday,
or a Monday.

**Working Week** — Monday to Friday in one go. Nothing is forgotten overnight:
tickets, values and the contents of your backpack all survive until morning. The
safety valve and the written warning come once per week, not once per day. Fail,
and you lose the whole week.

---

## A look around the office

<table>
  <tr>
    <td width="50%">
      <img src="screenshots/intranet.webp" alt="The GlobalCorp intranet with corporate announcements">
      <br><sub><b>The company intranet.</b> Days without incident in the server room: 0. The counter was reset this morning, as on most days.</sub>
    </td>
    <td width="50%">
      <img src="screenshots/team.webp" alt="The team view with seven colleagues and their reputation bars">
      <br><sub><b>Seven colleagues who remember.</b> Reputation runs from "hates you" to "accomplice", and it pays you back in both directions.</sub>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img src="screenshots/brett.webp" alt="The notice board with handwritten and printed notes">
      <br><sub><b>The notice board.</b> Eight notes out of thirty, redrawn every morning — from the red-level security warning to the lift share with conditions attached.</sub>
    </td>
    <td width="50%">
      <img src="screenshots/archiv.webp" alt="Career progress with found items, trophies and statistics">
      <br><sub><b>Career progress.</b> What you found, what you earned, and how often you walked out — kept across every working day.</sub>
    </td>
  </tr>
</table>

---

## What to expect

- **Over 1,300 events** in the server room, the coffee kitchen, on the phone, out
  on errands and in your inbox — plus boss fights, lunch breaks and a company
  gala that only the most stubborn ever get to see.
- **German and English**, in full — not just the menus, but every single event.
  You can switch mid-game: the save file does not depend on the language, so the
  week carries on exactly where it was.
- **Decisions with a memory.** The machine you had Kevin reinstall turns up in
  the rack hours later — with a dragon sticker and a program selling compute
  power overseas. Leave Gabi hanging and you will find a drawer in the tea
  kitchen that was not there before.
- **Seven colleagues with their own reputation**, who remember how you decided —
  and pay you back eventually. In both directions.
- **32 items** to find and repurpose creatively. Duct tape fixes more than it
  should, and some things work without being touched at all.
- **27 achievements**, graded by difficulty, plus an archive, a diary that
  narrates your day every evening, and a company chronicle to keep writing.
- **Full keyboard support** with freely assignable keys. There is a tutorial
  too, if you would rather be walked through it.

---

## Why Steam, when it runs for free?

The game stays complete and free in the browser. Anyone who wants to support
development gets a few technical conveniences on Steam:

- **Playable offline** — on the train, on a plane, in the server basement
- **Steam achievements** and **global statistics** — see how often the rest of
  the world has thrown in the towel
- **Cloud saves** — archive, achievements and statistics travel with you, and so
  does the run in progress: start at lunchtime on the laptop, carry on suffering
  at the desktop in the evening
- **Dynamic status** — your friends list finds out whether you are currently
  *"Hiding in the server room"* or *"Surviving the Synergy Gala"*

Both versions run on the same content.

---

## For developers

Svelte 5 (runes), Vite, Tailwind CSS 4. The Steam version is the same
application in Electron. The web version is served from `main:/docs` via GitHub
Pages, so the build is committed along with the source.

```bash
npm install
npm run dev            # development server on port 8080
npm run build          # build into docs/
npm run preview        # inspect the built version (do not open it by double-click)
```

**The game data exists twice:** `src/data/de/` is the source, `src/data/en/` the
English version — 23 files each. Both carry the same ids, story flags, character
names and numbers; only the prose differs. That is what makes a save file
language-independent. Touch one file and you touch both.

Tools live in `tools/`:

```bash
npm run lint:all       # the gate: data (both trees), interface strings, parity
npm run lint:data      # the German data tree only
npm run lint:parity    # holds the two trees against each other
npm run lint:assets    # every image reference, runtime-built ones included
npm test               # four test suites, run in both languages
npm run sim            # simulates thousands of working days for balance
npm run sim:week       # the same for whole weeks
```

If you would like to write events: `EVENTS.md` explains the data format, from
the simple option to the branching dialogue chain. `STRUCTURE.md` explains why
which file lives where, and `tools/TOOLS.md` describes every tool in detail.

> The screenshots above live in `screenshots/`, not in `docs/` — the build runs
> with `emptyOutDir`, so anything parked in `docs/` is gone after the next
> `npm run build`.

---

## Licence & small print

Pure satire. Any resemblance to real people, companies or choleric superiors is
coincidental, but probably unavoidable.

The web version and the source code are under the **MIT licence**. You may study
the code, use it and modify it for your own non-commercial spin-offs — please
with attribution (**seluce**).

---

<p align="center">
  <sub>Made with a great deal of caffeine, duct tape and attention to detail.</sub>
</p>
