# Projektstruktur

```
index.html              Vite-Einstieg, lädt src/main.js
vite.config.js
package.json            "type": "module"

README.md
STRUCTURE.md            diese Datei
EVENTS.md               wie Ereignisse gebaut werden — Leitfaden für Beiträge
changelog.md

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

  components/           35 Svelte-Komponenten, davon 8 fürs Intranet
  engine/               Engine-Module, engine_state.svelte.js hält den Zustand
  data/                 19 Datendateien
  assets/               von Vite verarbeitet, siehe unten

public/
  assets/               unverändert kopiert, siehe unten

tools/
  lint-data.mjs         Datenprüfung, npm run lint:data
  simulate-day.mjs      Tages-Simulation, npm run sim
  report-prose.mjs      Prosa- und Stilbericht, node tools/report-prose.mjs [bereich]
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

**`public/manifest.json`** — Sonderfall aus demselben Grund, aber andersherum:
Vite *könnte* den Verweis aus `index.html` sehen und würde die Datei dann mit
Prüfsumme nach `docs/build/` schreiben. Genau das darf nicht passieren, denn
`start_url: "./index.html"` ist relativ zum Ablageort des Manifests — aus
`docs/build/` heraus zeigte es auf eine Datei, die es dort nicht gibt. In
`public/` liegt es nach dem Bauen als `docs/manifest.json` neben der
`index.html`, und der Verweis stimmt.

**`public/assets/`** — wenn der Pfad erst zur Laufzeit entsteht. Kein Bundler
kann `assets/img/items/${id}.webp` auflösen, weil `id` erst im Spiel bekannt
ist. Diese Dateien werden unverändert kopiert und behalten ihren Pfad.

Dort liegen: alle Item-, Charakter- und Erfolgsbilder sowie die Musik. Die
Charakterbilder werden seit 4.1 an zwei Stellen gebraucht: im Terminal als
Ereignis-Porträt und im Messenger als Kontaktfoto. Die Intranet-Seiten lagen bis
v4.0.0 ebenfalls hier — als eigenständige HTML-Dateien in einem iframe, die
dafür eine handkopierte Fassung des Stylesheets brauchten. Sie sind jetzt
Komponenten unter `components/intranet/` und teilen sich den Build des Spiels.

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

Weil `docs/` beim Bauen überschrieben wird, gehört dort **keine** Dokumentation
hinein. Die Markdown-Dateien liegen deshalb in der Wurzel.

## Werkzeuge

`lint-data.mjs` und `simulate-day.mjs` gehören in den Arbeitsablauf: der Linter
nach jeder Datenänderung (0 Fehler, 0 Warnungen), die Simulation vor jeder
Balance-Entscheidung.

Der Linter prüft Verweise und Konventionen: Item-, Figuren- und Flag-Namen
(`req`, `rem`, `loot`, `rep`, `char` — auch auf Knoten-Ebene in Chats), doppelte
IDs, unbekannte Felder, Quest-Items als `req`/`rem`, Zeitbezüge in
Folge-Ereignissen, die Löschen-Konvention im Postfach (eine Lösch-Auswahl trägt
`ignoreEmail: true` und steht an letzter Position) und verwaiste unsichtbare
Zeichen. Die beiden letztgenannten stammen aus einem konkreten Fehler: In
`mail_leak_1` standen zwei Variation-Selektoren ohne Emoji-Basis vor dem
Button-Text. Unsichtbar im Editor, unsichtbar im Spiel — aber jedes Textmuster
lief daran vorbei, und so blieb die Option jahrelang an falscher Position ohne
ihr Flag.

Die Regel für **unbekannte Felder** prüft je Stelle, was die Engine dort
tatsächlich liest, und ist damit schärfer als eine bloße Liste erlaubter Namen:
`reqStory` an einer Mittagspause wird nie ausgewertet (die Pause zieht rein
zufällig), `req` in einer Mail ebenso wenig, und eine Knoten-Auswahl in einem
Gespräch trägt nur `t` und `next` — ihre Wirkungen gehören ins Result. Anlass
war ein `ep` statt `rep` in einem Dienstgang-Chat, das eine Ruf-Änderung zwei
Versionen lang verschluckt hat. Ein Tippfehler im Feldnamen ist die leiseste
Fehlerklasse, die es hier gibt: Er lässt sich fehlerfrei parsen und verschwindet
danach zur Laufzeit.

`report-prose.mjs` ist kein Build-Gate, sondern ein Bericht für die
redaktionelle Arbeit: Der Exit-Code ist immer 0, alle Befunde sind Lesestoff.
Aufruf mit Bereich (`node tools/report-prose.mjs coffee`) oder ohne für alle.
Gemeldet werden wörtlich wiederholte Sätze und Wortfolgen über Ereignisgrenzen
hinweg, Statuswert-Sprache im Erzähltext ("Aggro steigt"), Tippfehler-Muster,
alternde Referenzen, zu knappe Ergebnistexte, dünne Auftakte, auffällige
Beschriftungen, Alt-Register in Optionen (Sektion 9) und Auftakt-Schablonen
(Sektion 10). Das Werkzeug kennt die legitimen Ausnahmen und meldet sie nicht:
Betreffzeilen, Anrufer-Anzeigen, Chat-Nachrichten und bewusste Lautmalerei.

Die letzten beiden sind Einmal-Werkzeuge, die den Bestand in einen definierten
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

Wie ein Ereignis technisch aufgebaut ist — Felder, Bautypen, Beispiele — steht
in EVENTS.md. Hier stehen die Regeln, die für den Bestand gelten.

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

**Beschriftungen sind Handlungen, keine Etiketten.** Ein Button beschreibt in
einer natürlichen Verbphrase, was Müller tut ("Ihn vor dem Spinat-Kern warnen"),
oder er ist nackte wörtliche Rede, wenn der Witz im Wortlaut steckt ("'Herr
Koch? Die Suppe ist kalt!'"). Die Haltung steckt im Verb oder Adverb ("Panisch
auflegen"), nicht in einem Präfix ("Lüge:") oder einer Klammer
("(Kapitulation)"). Versalien tragen das Ausrasten, Anführungszeichen die
Ironie einer "'versehentlichen'" Sabotage, ein Gedankenstrich den Nachsatz.
Aktions-Buttons enden ohne Punkt, gesprochene Sätze mit normaler Interpunktion;
Richtwert unter 60 Zeichen. Ausgenommen ist, was echt sein muss: Betreffzeilen
im Postfach, Anrufer-Anzeigen auf dem Telefondisplay, Ticket-Status und die
parodierte Entkalkungs-Software mit ihren 73 Schritten. Sektion 9 des
Prosa-Berichts listet, was noch im alten Register steht.

**Auftakte ohne Schablone.** Der erste Satz eines Ereignisses trägt die Szene.
"Du willst…" nur, wenn der Witz im selben Satz sitzt; Auftritte variieren, statt
dass jeder Kollege "in der Tür steht"; "plötzlich" nur, wenn die Überraschung
der Inhalt ist und nicht bloß Füllwort. Sektion 10 des Prosa-Berichts wacht
darüber.

**Result-Schlüssel beginnen mit `res_`.** Das Terminal hängt an jede
Ketten-Auswahl, deren Ziel *nicht* so heißt, ein "…"-Abzeichen — das Zeichen
dafür, dass das Gespräch weitergeht. Ein Ausgang namens `truth` verspricht damit
eine Fortsetzung und legt dann auf. Der Linter meldet Abweichungen als Info und
nicht als Warnung: 101 Ausgänge im Bestand tragen noch alte Namen, und ein
Result umzubenennen heißt, jedes `next` mitzuziehen, das darauf zeigt.

**Im Smartphone-Chat** ist Klartext eine Nachricht, die Müller sendet — volle
Sätze, Emojis erlaubt. Eckige Klammern sind eine Handlung statt einer Nachricht,
gleich ob App-Funktion oder Handgriff: `[Gruppe verlassen]`,
`[Handy frustriert weglegen]`, Medien als `[GIF gesendet: …]`. Hybride
kombinieren beides.

Bis 4.1 trugen App-Funktionen zusätzlich ein `System:` vor dem Text. Das ist
entfallen — die Klammern sagen dasselbe, und acht Zeichen sind im schmalen
Chatfenster viel. In den Chat-Blasen bleibt `[System: …]` dagegen erhalten: Dort
ist es die Meldung des Messengers selbst, nicht die Beschriftung eines Knopfes.
Der Daten-Prüfer hält die Trennung offen.

**Porträts im Chat** lösen sich pro Knoten auf: Ein `char` am Knoten gewinnt,
sonst erbt der Knoten das `char` des Ereignisses, und ohne beides bleibt die
Initiale. So deckt ein Feld alle Fälle ab — ein Charakter für den ganzen Chat,
ein Gastauftritt mitten in einer Kette (dann steht auch der Figurenname über der
Blase) und Gruppen, in denen nur einzelne Stimmen ein Gesicht haben. `char: null`
an einem Knoten erzwingt die Initiale trotz Ereignis-Figur. Dass Unbekannte —
Scammer, der Prinz, Mama, der Vermieter — gar kein `char` tragen, ist Absicht:
Wer nicht im Adressbuch steht, hat auch kein Foto.

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

## Overlays

Alle achtzehn Vollbild-Fenster werden über dieselben drei Funktionen in
`engine_ui.js` geschaltet: `showOverlay()`, `hideOverlay()`, `isOverlayOpen()`.
Offen heißt: die Klasse `hidden` fehlt.

Das ist keine Stilfrage. Bis 4.1 liefen Intro und Tageswahl über
`style.display`, und ein Inline-Stil verdeckt die Klasse, ohne sie zu
entfernen — die Tageswahl behielt ihr `hidden`, während sie zu sehen war, und
jede Prüfung „ist das Fenster offen?" antwortete mit Nein. Wer ein Fenster
anders schaltet als über diese drei Funktionen, baut denselben Fehler wieder
ein.

`STARTUP_OVERLAYS` fasst die drei Fenster zusammen, die vor dem Spiel stehen:
Intro, die Frage nach einem unterbrochenen Tag, die Tageswahl. Solange eines
davon oben ist, läuft das Spiel nicht — Tasten tun nichts, Escape schließt
nichts, der Tag lässt sich nicht neu starten.

### Die Seite hinter dem Fenster

Fenster können übereinander liegen: die Tastenbelegung über den Einstellungen,
„Benutzen?" über dem Rucksack. Deshalb ist die Bildlauf-Sperre keine Ja/Nein-
Angelegenheit, sondern eine Menge benannter Halter — `lockScroll(name)` und
`releaseScroll(name)`. Die Seite gibt frei, wenn der letzte loslässt.

Ein Zähler täte dasselbe, bis er einmal aus dem Tritt gerät; danach ist die
Seite entweder für immer gesperrt oder scrollt hinter einem offenen Dialog.
Bei einer Menge ist doppeltes Sperren folgenlos, und ein Lösen durch den
Falschen ändert nichts.

`showOverlay` und `hideOverlay` erledigen das mit. Wer den Body von Hand
anfasst, hebelt die Buchführung aus. Zwei Ausnahmen sperren bewusst nicht und
werden mit `showOverlay(el, false)` geöffnet: das Schwarze Brett, das am Handy
scrollbar bleiben soll, und der Tutorial-Zeiger, der gar kein Fenster ist.

Zu sehen ist das alles erst unter 1024 px — darüber hält `app.css` den Body
ohnehin still. Fehler in diesem Bereich fallen am Rechner nicht auf.

### Die Falle im verschachtelten `ui`-Objekt

In `engine_ui.js` liegt unter `ui:` ein zweites, verschachteltes `ui`-Objekt
für Export und Import. Es wird als `engine.ui.openExportModal()` gerufen, also
zeigt `this` dort auf dieses innere Objekt und nicht auf die Engine. Wer von
dort `this.showOverlay()` schreibt, ruft `undefined` auf.

Genau das war zwei Versionen lang der Fall: Export und Import warfen beim
Klick, der globale Fehlerfänger schluckte es, und für den Spieler passierte
nichts. Aus dem inneren Objekt heraus wird die Engine über `engine.` erreicht.

## Was bewusst nicht in Komponenten liegt

Die **Positionierung des Tutorial-Zeigers** in `tutorial.js` misst mit
`getBoundingClientRect()`, wo ein Element tatsächlich gelandet ist — das kann
nur gegen das gerenderte Dokument passieren.

Die **Glüh-Ringe** des Tutorials wirken auf Elemente mehrerer Komponenten. Über
den Zustand zu gehen hieße, dass jede davon vom Tutorial wissen muss. Bei
`ActionBar` wäre es zusätzlich schädlich: Die Komponente hält bewusst nichts
Zustandsabhängiges im `class`-Attribut, weil Svelte es sonst bei jeder Änderung
neu schreibt und die Ringe entfernt.

## Sprache im Repository

Spieltexte, Commit-Nachrichten und die Dokumentation sind Deutsch — das Spiel
spielt in einem deutschen Büro. Code und Kommentare sind Englisch.
