# Layer8Problem

> *"Das Problem befindet sich in der Regel ca. 30 cm vor dem Bildschirm."*

**Ein satirischer SysAdmin-Simulator.** Du bist die IT von GlobalCorp. Einer.
Für alle. Zwischen Chantal aus dem Marketing, einem Chef, der IT für
Voodoo-Zauber hält, und einem Ticketzähler, der niemals rückwärts läuft.

### [▶ Im Browser spielen](https://seluce.github.io/Layer8Problem) · [Auf Steam kaufen](https://store.steampowered.com/app/4487580/Layer8Problem/)

Kostenlos im Browser, keine Anmeldung, kein Download. Läuft auf dem Handy
genauso wie am Rechner.

---

## Zwei Spielarten

**Arbeitstag** — Eine Schicht von 08:00 bis 16:30 Uhr. Überlebe bis Feierabend.
Abends ist alles vergessen, morgen beginnst du wieder bei null. Wähle vorher,
wie sehr du dein Leben hasst: entspannter Freitag, normaler Mittwoch oder
Montag.

**Arbeitswoche** — Montag bis Freitag am Stück. Nichts wird über Nacht
vergessen: Was du heute liegen lässt, liegt morgen noch da. Dein Rucksack
kommt mit, dein Ruf auch, deine Faulheit sowieso. Ventil und Abmahnung gibt es
nur einmal pro Woche, nicht pro Tag. Wer scheitert, verliert die ganze Woche.

## Worum es geht

Alle 30 Minuten knallt ein Ticket in dein System. Bei zehn offenen Tickets
kollabiert es und du bist raus. Also nimmst du Anrufe an, rennst in den
Serverraum, holst Kaffee und gehst Dienstgänge — und behältst dabei drei Werte
im Auge:

| | | |
|---|---|---|
| 🦥 **Faulheit** | Je höher, desto härter bestraft der Chef deine Fehler. |
| 😡 **Aggro** | Bei 100 % rastest du aus. Das Ventil öffnet genau einmal. |
| 👁️ **Chef-Radar** | Bei 100 % gibt es eine Abmahnung. Danach die Kündigung. |

Jede Entscheidung kostet Zeit, und die Uhr läuft nur in eine Richtung.

## Was dich erwartet

- **Über 1.200 Ereignisse** in Serverraum, Kaffeeküche, am Telefon, auf dem
  Dienstgang und im Postfach — plus Bossfights, Mittagspausen und einer
  Firmen-Gala, die nur die Hartnäckigsten je zu sehen bekommen.
- **Entscheidungen mit Gedächtnis.** Der Rechner, den du Kevin hast neu
  aufsetzen lassen, steht Stunden später im Rack — mit Drachenaufkleber und
  einem Programm, das Rechenleistung nach Übersee verkauft. Wer Gabi hat
  auflaufen lassen, findet in der Teeküche eine Schublade, die es vorher nicht
  gab.
- **Acht Kollegen mit eigenem Ruf**, die sich merken, wie du dich entschieden
  hast — und irgendwann zurückzahlen. In beide Richtungen.
- **30 Gegenstände** zum Finden und kreativen Zweckentfremden. Panzertape
  flickt mehr, als es sollte.
- **30 Erfolge**, gestuft nach Schwierigkeit, dazu ein Archiv, ein Tagebuch,
  das jeden Abend deinen Tag erzählt, und eine Firmenchronik zum Weiterschreiben.
- **Voller Tastatur-Support** mit frei belegbaren Tasten. Ein Tutorial gibt es
  auch, falls du lieber an die Hand genommen wirst.

## Warum Steam, wenn es kostenlos läuft?

Das Spiel bleibt im Browser vollständig und kostenlos. Wer die Entwicklung
unterstützen möchte, bekommt auf Steam ein paar technische Annehmlichkeiten:

- **Offline spielbar** — im Zug, im Flugzeug, im Serverkeller
- **Steam-Errungenschaften** und **weltweite Statistiken** — sieh, wie oft der
  Rest der Welt hingeworfen hat
- **Cloud-Speicher** — mittags auf dem Laptop anfangen, abends am Rechner leiden
- **Dynamischer Status** — deine Freundesliste erfährt, ob du gerade
  *"Im Serverraum versteckt"* bist oder *"Die Synergy-Gala überlebst"*

Beide Fassungen laufen auf demselben Inhaltsstand.

---

## Für Entwickler

Svelte 5 (Runes), Vite, Tailwind CSS 4. Die Steam-Fassung ist dieselbe
Anwendung in Electron. Die Web-Version wird aus `main:/docs` über GitHub Pages
ausgeliefert, der Build wird also mitcommittet.

```bash
npm install
npm run dev            # Entwicklungsserver
npm run build          # Build nach docs/
npm run preview        # gebaute Fassung ansehen (nicht per Doppelklick öffnen)
```

Werkzeuge im Ordner `tools/`:

```bash
npm run lint:data      # prüft alle Ereignis-Daten auf Struktur und Regeln
npm test               # Testsuiten für den Wochenmodus
npm run sim            # simuliert tausende Arbeitstage für die Balance
npm run sim:week       # dasselbe für ganze Wochen
```

Wer Ereignisse schreiben möchte: `EVENTS.md` erklärt das Datenformat, von der
einfachen Option bis zur verzweigten Gesprächskette. `STRUCTURE.md` erklärt,
warum welche Datei wo liegt.

## Lizenz & Kleingedrucktes

Reine Satire. Ähnlichkeiten mit realen Personen, Firmen oder cholerischen
Vorgesetzten sind zufällig, aber vermutlich unvermeidbar.

Web-Version und Quellcode stehen unter der **MIT-Lizenz**. Du darfst den Code
studieren, nutzen und für eigene, nicht-kommerzielle Ableger verändern —
bitte mit Namensnennung (**seluce**).

---

*Erstellt mit viel Koffein, Panzertape und Liebe zum Detail.*
