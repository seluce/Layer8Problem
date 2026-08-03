# Projektstruktur

```
index.html              Vite-Einstieg, lädt src/main.js
vite.config.js
package.json            "type": "module"

electron/
  main.cjs              Electron-Hauptprozess, lädt docs/

src/
  main.js               Einstiegspunkt: Stylesheet, Engine, Komponenten einhängen
  app.css               Tailwind-Direktiven, @source-Liste, eigene Klassen
  engine.js             Bootstrap, Tastatursteuerung, globaler Fehlerfänger
  data.js               Datenbank, Aufteilung in sofort und nachladbar
  tutorial.js
  platform.js           Plattform-Schnittstelle, Web-Fassung
  platform_steam.js     Steam-Bridge, lädt sich nur unter Electron nach

  components/           34 Svelte-Komponenten, davon 8 fürs Intranet
  engine/               Engine-Module, engine_state.svelte.js hält den Zustand
  data/                 19 Datendateien
  assets/               von Vite verarbeitet, siehe unten

public/
  assets/               unverändert kopiert, siehe unten

tools/
  lint-data.mjs         Datenprüfung, npm run lint:data
  simulate-day.mjs      Tages-Simulation, npm run sim
  reorder-opts.mjs      verteilt die Optionsreihenfolge, einmalig
  normalize-quotes.mjs  Anführungszeichen, einmalig
```

## src/assets/ oder public/assets/

Die Trennung wirkt willkürlich, ist es aber nicht. Sie folgt einer Frage:
**Kann Vite den Verweis auf die Datei sehen?**

**`src/assets/`** — wenn Vite den Pfad beim Bauen findet, also aus `url()` in
CSS oder aus einem `import`. Vite schreibt die URL dann um und hängt eine
Prüfsumme an, sodass ein Browser-Cache nach einem Update nicht die alte Datei
ausliefert.

Dort liegen: die beiden Schriftschnitte und die drei Texturen — alle aus
`app.css` referenziert.

**`public/assets/`** — wenn der Pfad erst zur Laufzeit entsteht. Kein Bundler
kann `assets/img/items/${id}.webp` auflösen, weil `id` erst im Spiel bekannt
ist. Diese Dateien werden unverändert kopiert und behalten ihren Pfad.

Dort liegen: alle Item-, Charakter- und Erfolgsbilder sowie die Musik. Die
Intranet-Seiten lagen bis v4.0.0 ebenfalls dort — als eigenständige HTML-Dateien
in einem iframe, die dafür eine handkopierte Fassung des Stylesheets brauchten.
Sie sind jetzt Komponenten unter `components/intranet/` und teilen sich den
Build des Spiels.

Kurz: **Verweis im Code sichtbar → `src/`. Pfad zur Laufzeit gebaut → `public/`.**

## Warum docs/build/ und nicht docs/assets/

Vite legt gebündelte Dateien standardmäßig in `docs/assets/` ab — genau dorthin,
wo auch der Inhalt von `public/assets/` landet. Beides vermischt sich dann in
einem Verzeichnis, und eine statische Datei könnte im Prinzip eine generierte
verdecken.

`assetsDir: 'build'` in der Vite-Konfiguration trennt das:

```
docs/assets/    aus public/ kopiert, Pfade wie in der Quelle
docs/build/     von Vite erzeugt, mit Prüfsummen
```

Die Laufzeitpfade in den Datendateien bleiben davon unberührt.

## Befehle

```
npm install
npm run dev            Entwicklungsserver auf Port 8080
npm run build          erzeugt docs/
npm run preview        docs/ lokal prüfen
npm run lint:data      Datenprüfung
npm run sim            Tages-Simulation für die Balance
npm start              baut und startet Electron
npm run build:win      Desktop-Build
```

Veröffentlicht wird `docs/` über GitHub Pages (Einstellung: Deploy from a branch,
`main` + `/docs`). Der Build gehört deshalb mit ins Repository: erst `npm run
build`, dann committen und pushen — sonst ist die Live-Seite älter als der Code.

## Werkzeuge

`lint-data.mjs` und `simulate-day.mjs` gehören in den Arbeitsablauf: der Linter
nach jeder Datenänderung (0 Fehler, 0 Warnungen), die Simulation vor jeder
Balance-Entscheidung.

Die anderen beiden sind Einmal-Werkzeuge, die den Bestand in einen definierten
Zustand gebracht haben. Sie sind wiederholbar — ein zweiter Lauf ändert nichts
mehr — und stehen im Repository, weil sie dokumentieren, wie dieser Zustand
zustande kam:

`reorder-opts.mjs` verteilt die Reihenfolge der Antwortmöglichkeiten. Vorher
stand in 53% aller Ereignisse mit drei oder mehr Optionen die günstigste ganz
oben; wer das bemerkt, klickt fortan die erste Zeile. Das Werkzeug rotiert die
Liste, statt zu mischen, damit eine Abfolge von zurückhaltend nach drastisch
erhalten bleibt. Abbruch-Optionen bleiben unten, Tutorial und Stationswahl der
Gala werden nicht angefasst.

`normalize-quotes.mjs` macht zwei Durchgänge über die Anführungszeichen, siehe
unten. `--dry` berichtet, ohne zu schreiben.

## Konventionen in den Datendateien

**Notation:** Zeichenketten stehen in doppelten Anführungszeichen. Das ist mehr
als Geschmack — Werkzeuge, die die Dateien als Text durchsuchen, überspringen
eine abweichend geschriebene Datei stillschweigend. Genau das ist einmal mit
dem gesamten Party-Pool passiert, ohne eine einzige Fehlermeldung.

**Spieltext:** Anführungszeichen erster Ordnung sind einfach — `'so'` für
wörtliche Rede, Namen und ironische Distanz. Doppelte nur als zweite Ordnung
innerhalb eines Zitats. Das passt zur Terminal-Fiktion, in der alles Monospace
und ASCII ist. Der Linter warnt, wenn doppelte in erster Ordnung auftauchen.

**Folge-Ereignisse stehen für sich.** Ein Ereignis mit `reqStory` kann Stunden
nach seinem Auslöser kommen oder gar nicht. Es darf deshalb weder unmittelbare
Nähe behaupten ("Kaum hast du…") noch den Auslöser in die Vergangenheit
verlegen ("wegen gestern"). Der Linter prüft beide Richtungen über alle
Textfelder.

**Quest-Items sind ausschließlich lootbar** — Trophäen über Ruf-Ereignisse und
für Erfolge. Sie dürfen nie als `req` oder `rem` stehen; der Linter prüft das.

**Ruf sparsam:** ±5 ist die Regel, ±10 die begründete Ausnahme, alles darüber
ein Ereignis mit Gewicht. So wächst das Verhältnis zu den Kollegen über mehrere
Arbeitstage statt an einem einzigen. Wo eine Figur im Ereignis auftritt, gehört
sie auch ins Feld `char` — sonst bleibt die Karte ohne Gesicht.

## Zustand und Anzeige

`src/engine/engine_state.svelte.js` hält den Spielzustand in `$state()`. Die
Engine verändert ihn wie zuvor, die Komponenten lesen daraus und aktualisieren
sich selbst.

Alles, was zu einem Arbeitstag gehört, kommt aus `freshDay()`. Der Basiszustand
leitet sich davon ab, sodass ein neues Feld nicht an zwei Stellen deklariert
werden muss und nach einem Tagesneustart nicht fehlen kann. Was den Tag
überleben soll — Einstellungen, Archiv, Schwierigkeitsgrad — steht bewusst
außerhalb.

**Fallstrick:** Wer `state` importiert, kann die Rune `$state` in derselben
Datei nicht mehr verwenden. Svelte liest `$name` als Store-Subskription, und
`state` ist kein Store. Für Element-Referenzen ist ohnehin ein Attachment der
bessere Weg, siehe `PhoneView.svelte`.

## Was bewusst nicht in Komponenten liegt

Die **Einstellungen** sind Formular-Markup in `index.html`. Umzustellen wäre
nur das Befüllen der Felder; die 243 Zeilen Markup blieben in ähnlicher Form
bestehen.

Die **Positionierung des Tutorial-Zeigers** in `tutorial.js` misst mit
`getBoundingClientRect()`, wo ein Element tatsächlich gelandet ist — das kann
nur gegen das gerenderte Dokument passieren.

Die **Glüh-Ringe** des Tutorials wirken auf Elemente mehrerer Komponenten. Über
den Zustand zu gehen hieße, dass jede davon vom Tutorial wissen muss. Bei
`ActionBar` wäre es zusätzlich schädlich: Die Komponente hält bewusst nichts
Zustandsabhängiges im `class`-Attribut, weil Svelte es sonst bei jeder Änderung
neu schreibt und die Ringe entfernt.
