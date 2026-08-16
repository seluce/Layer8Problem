# Layer8Problem — Werkzeuge

Übersicht über alles unter `tools/`. Stand 5.0.

Was hier steht, ist das **Womit**: welches Werkzeug wofür da ist, welche
Schalter es kennt und welche Meldung ernst zu nehmen ist. Alle Befehle laufen
aus dem Repo-Wurzelverzeichnis.

---

## Der Kurzüberblick

| Werkzeug | Aufruf | Wann |
|---|---|---|
| Datenprüfer | `npm run lint:data` | nach **jeder** Datenänderung, Tor bei 0/0 (`:en`, `lint:all`) |
| Prosa-Bericht | `node tools/report-prose.mjs [pool …] [--lang=en]` | nach jeder Textwelle |
| Tages-Simulator | `npm run sim [n] [--lang=en]` | vor jeder Balance-Entscheidung (Tag) |
| Wochen-Simulator | `npm run sim:week [n] [--lang=en]` | vor jeder Balance-Entscheidung (Woche) |
| Testreihen | `npm test` | vor jeder Auslieferung |
| Konsolen-Werkzeug | `tools/dev-woche.js` in die Browser-Konsole | Spieltests am lebenden Spiel |
| Textprüfer | `npm run lint:i18n` | nach **jeder** Änderung an Oberflächentexten, Tor bei 0/0 |
| Gleichlauf-Prüfer | `npm run lint:parity` | nach **jeder** Übersetzung, Tor bei 0 Fehlern |
| Bestandsscanner | `node tools/scan-glossary.mjs [1-5]` | vor Übersetzungsarbeit, kein Tor |
| Feld-Scanner | `node tools/scan-fields.mjs <pool> [--list] [--german] [--key=feld]` | **Vollständigkeitsnachweis** eines Übersetzungsblocks, kein Tor |
| Echo-Prüfung | `node tools/check-echoes.mjs <pool> [--n=4]` | nach jedem Übersetzungsblock **und nach jeder Reparatur**, kein Tor |
| Anführungszeichen | `node tools/normalize-quotes.mjs --dry` | selten, nach Fremdtext-Import |
| Werte-Prüfer | `node --conditions browser --import ./tools/register.mjs tools/audit-stats.mjs` | gelegentlich, kein Tor |
| Steam-Präsenz | `node tools/make-steam-presence.mjs` | wenn sich ein `presence.*`-Text ändert; Ausgabe nach Steamworks hochladen |

**Die Reihenfolge einer Content-Sitzung:** schreiben → `lint:data` →
`report-prose` → `npm test` → `sim`/`sim:week` als Rauchtest → ausliefern.

---

## 1. `lint-data.mjs` — der Datenprüfer

```
npm run lint:data
```

Das einzige echte **Tor**: Es beendet sich mit Fehlercode, taugt also als
GitHub-Action. Der Stand ist **0 Fehler, 0 Warnungen** — jede neue Meldung
stammt damit aus der laufenden Arbeit und ist keine Altlast. Diese Disziplin
ist der Grund, warum das Werkzeug etwas wert ist; zehn dauerhafte
Falschmeldungen wären der schnellste Weg, das Ignorieren zu lernen.

Drei Stufen: **✗ Fehler** (bricht ab), **! Warnung** (soll auf null bleiben),
**i Info** (Kenntnisnahme, z. B. die Tagebuch-Statistik).

Was es findet — durchweg Dinge, die zur Laufzeit **still** scheitern:

- doppelte Event-IDs über *alle* Pools (`usedIDs` ist eine globale Menge)
- `loot`/`req`/`rem` auf nicht existierende Gegenstände; Quest-Items als
  Bedingung (Trophäen sind nur lootbar)
- `char`/`rep`/`reqRep`-Namen, die nicht in `data_chars.js` stehen
- Story-Fahnen, die gefordert, aber nie gesetzt werden (toter Inhalt) — und
  umgekehrt gesetzte Fahnen ohne Abnehmer (Sackgasse)
- Ketten: `next` ins Leere, unerreichbare Knoten und Results, Sackgassen
- **Aussperrung:** ein Ereignis, dessen sämtliche Optionen ein Item brauchen
- Zahlenraster (Fünferschritte), `m < 2`, „Gratis-Vorspuler" (viel Zeit,
  kaum Wirkung)
- Zeitprädikate: `reqStoryAge` ohne `reqStory`, unspielbare Bereiche,
  Freitags-Baumelfalle
- **Uhrzeiten in Szenen** (ein Ereignis kann jederzeit gezogen werden);
  geprüfte Ausnahmen stehen in `clockReviewed`
- Folge-Ereignisse, die unmittelbare Nähe behaupten („Kaum hast du …")
- unbekannte Felder — der leiseste Fehler überhaupt: ein Tippfehler parst
  sauber und wird zur Laufzeit verworfen
- Markup in Feldern, die als Klartext ausgegeben werden; unsichtbare Zeichen
- Gegenstände: `use`-Block vollständig, `passive` gültig, Kosten nur mit
  Abklingzeit
- das Tagebuch: Bedingungen, die stolpern oder auf keinen denkbaren Tag passen

**Neues Feld eingeführt? Dann hier nachtragen** (`EVENT_KEYS`, `OPT_KEYS`,
`USE_FIELDS`, `PASSIVE_FIELDS`), sonst ist es ein Fehler.

## 2. `report-prose.mjs` — der Prosa-Bericht

```
node tools/report-prose.mjs              # alle Pools, deutscher Baum
node tools/report-prose.mjs server       # gezielt
node tools/report-prose.mjs coffee calls
node tools/report-prose.mjs lunch --lang=en   # englischer Baum
```

Pools: `server coffee calls sidequests emails meetings lunch party reputation
bossfights special board`.

**`--lang=de|en`, Vorgabe `de`.** Die Sprache steht in der Kopfzeile des
Berichts; lädt der gewünschte Baum nicht, bricht das Werkzeug ab, statt auf
Deutsch zurückzufallen und den Bericht als englisch auszugeben.

**Kein Tor.** Das Werkzeug endet immer mit 0 und ist absichtlich aus dem Build
herausgehalten: Ob ein wiederholter Satz eine faule Kopie oder ein Running Gag
ist, entscheidet ein Mensch. Zehn Abschnitte:

1. wörtlich wiederholte Sätze über verschiedene Ereignisse
2. wiederholte Wortfolgen ab fünf Wörtern ← **der nützlichste Abschnitt**
3. Spielmechanik im Erzähltext („Deine Aggro steigt")
4. Tippfehler-Kandidaten
5. Referenzen, die das Spiel altern lassen
6. Schablonen-Konstruktionen als Frequenz-**Baseline** (zwölf Muster)
7. Telegraf-Kandidaten: Ereignisse mit sehr kurzen Ergebnistexten
8. dünne Auftakte (Szenentext unter 80 Zeichen)
9. auffällige Optionsbeschriftungen
10. Alt-Register bei Beschriftungen (Migrationsliste)

**Abschnitt 3 prüft beide Sprachen** — `Faulheit`/`Chef-Radar` und
`Laziness`/`Boss Radar` stehen in einer Liste, weil ein deutscher Statuswert im
englischen Text (und umgekehrt) ebenfalls ein Befund ist.

**Abschnitt 6 misst beide Sprachen, in zwei gespiegelten Sätzen zu je zwölf
Mustern.** Ein Muster ohne Treffer fällt aus dem Bericht, ein deutscher Lauf
zeigt also nur deutsche Zeilen. Die Spiegelung ist Absicht: Der Abschnitt ist
ein Vorher/Nachher-Maß, und zwei Sprachen, die Verschiedenes zählen, lassen
sich nicht gegeneinanderhalten. Einzige Ausnahme ist „Dafür …", das im
Englischen in drei Wendungen zerfällt und deshalb eine gemeinsame Zeile hat.

**Die deutsche Grundlinie hat sich am 15.08.2026 einmal verschoben:**
„Wenigstens" zählt jetzt zusammen mit „Immerhin", weil es derselbe Zug ist und
das Englische für beides ein Wort hat. Gemessen: „Immerhin" 13-mal,
„Wenigstens" 3-mal. Alle Pools 227 → **230 Treffer**, Mittag allein 12 → **14**.
Ältere Notizen mit den kleineren Zahlen meinen denselben Bestand.

**Arbeitsweise:** erst schreiben, dann messen, dann korrigieren. Vor/Nach-
Vergleich statt Nullziel — Abschnitt 6 *soll* Treffer haben. Beabsichtigte
Refrains dürfen stehen bleiben, brauchen aber ein Warum.

## 3. `simulate-day.mjs` — Tages-Balance

```
npm run sim                    # 1500 Tage pro Zelle
npm run sim 300                # schneller Rauchtest
npm run sim 300 -- --lang=en   # englischer Baum
```

**Der Doppelstrich ist Pflicht.** `npm run sim 300 --lang=en` schluckt npm
selbst — der Lauf startet dann **auf Deutsch**, ohne dass sich jemand meldet.
Deshalb steht die geladene Sprache in der Kopfzeile: `Simulation (en): …`. Wer
sie dort nicht sieht, hat den deutschen Baum gemessen. Direkt über
`node tools/simulate-day.mjs 300 --lang=en` braucht es den Doppelstrich nicht.

**Was der Vergleich beider Sprachen kann — und was nicht.** Die Simulation ist
nicht gesetzt (`Math.random()` ohne Startwert): zwei deutsche Läufe mit 400
Tagen liefern 42,0 % und 40,3 %. Der Vergleich de gegen en ist damit ein
**Rauchtest** — spielt der englische Baum überhaupt, und landet er im selben
Korridor. Ein Gleichheitsbeweis ist er nicht; was Zahlen wirklich absichert,
ist `lint-parity`.

Spielt echte Arbeitstage gegen die echten Pools und **spiegelt die
Engine-Formeln exakt** (Faulheit ungeskaliert, Aggro-Anstieg skaliert,
Chef-Radar doppelt skaliert, Tickets, Mailchance, Ventile, Endbedingungen in
Engine-Reihenfolge). Bewusst vereinfacht: keine Begegnungen, keine Ausreden,
kein Alkohol — die Überlebensquote ist damit eine **Untergrenze**.

Experimentierschalter (Vorgaben = aktueller Stand):

```
--lazydiv=300     lazyMult = 1 + fl/300 statt fl/200
--lazycap=1.3     lazyMult deckeln
--nolazyeasy      lazyMult auf Leicht abschalten
--mailbase=0.12   Grundwahrscheinlichkeit für Mails
--valves=25,40,50 Ventil-Rücksetzwerte je Schwierigkeit
--decay=1         Radar fällt alle 30 Minuten um N
--normmult=…      Multiplikator für Normal
```

## 4. `simulate-week.mjs` — Wochen-Balance

```
npm run sim:week                    # volle Läufe
npm run sim:week 300                # Rauchtest
npm run sim:week 300 -- --lang=en   # englischer Baum (Doppelstrich, siehe 3)
```

Fünf Strategien (u. a. `vernunft` = immer die sicherste Wahl,
`gelegenheit`, `kaffeejunkie`) mal drei Erholungsgrade (Erholt / Genervt /
Urlaubsreif). Ausgabe pro Zelle: Wochenquote, Tode nach Wochentag und Ursache,
Ø erreichter Tag, Ticket-Übertrag, Ausreden, Leerlauf-Klicks, „Pool leer vor
Freitag", Sieg nach Krisenabend.

Schalter:

```
--wear=10          Abnutzung der Nacht-Erholung in Prozentpunkten
--deckel=45        absolute Obergrenze der Nacht-Erholung
--ramp=0.04        Anstieg des Tages-Multiplikators je Wochentag
--rscale=1.0       Skalierung der Erholungsraten
--nightkeep=0.25   Anteil, der über die Nacht bleibt
--nighthalf        Nacht halbiert (Vergleichsvariante)
--nighttickets=N   Tickets über die Nacht
--meeting=50       Zeitkosten des Freitagsmeetings
--contscale=1.0    Skalierung der Tageskontingente
--nocontingent     Kontingente ganz aus
--idlem/--idlel/--idlea   Vektor des Leerlauf-Klicks
```

**Zwei Spiegelverträge**, die auseinanderlaufen können und nicht dürfen:
`MAXC` muss zu `WEEK_CONTINGENTS` in `engine_week.js` passen, und
`IDLE_M/F/A` zum `week_idle`-Vektor in `data_special.js`.

**Vergleiche immer gegen einen frischen Baseline-Lauf**, nicht gegen
Erinnerungen — schon 300 Läufe pro Zelle rauschen um mehrere Prozentpunkte.

## 5. `npm test` — die drei Testreihen

```
npm test        # 16 / 94 / 20
```

Läuft unter `node --conditions browser --import ./tools/register.mjs`.
`register.mjs` hängt `svelte-loader.mjs` ein, damit `engine_state.svelte.js`
kompiliert wird und **Runes aktiv sind** — die Tests laufen also gegen die
echten Engine-Module, nicht gegen Attrappen.

| Datei | Was sie absichert |
|---|---|
| `week-foundation.test.mjs` | Fundament des Wochen-Moduls (Zustand, Übergänge) |
| `week-flow.test.mjs` | die verdrahtete Wochenschleife auf echtem Core/Events/Week; UI und Audio gestubbt |
| `dev-script.test.mjs` | jedes Szenario von `dev-woche.js` gegen die echte Engine |

Abschnitte in `week-flow` (nach Themen sortiert): Moduseinstieg, Feierabend,
Wochenende, Morgen-End-Check, Resume, Modustrennung, Tageskontingente,
Gegenstände mit Abklingzeit und Kosten, Zeit-Prädikate, Meeting, Tagebuch,
Spieltest-Befunde, Voreinstellung, Archiv-Zähler.

**Zwei Fallen aus der Praxis:**

- **Das Gerüst stubbt Engine-Funktionen** (u. a. `renderTerminal`). Wer eine
  *Verdrahtung* prüfen will, muss die echte Implementierung direkt rufen:
  `events.renderTerminal.call(engine, …)`. Sonst prüft der Test nur die
  Hilfsfunktion und bleibt grün, obwohl der Haken fehlt.
- **Mutationsproben gehören dazu:** Änderung testweise zurückdrehen, Test
  muss fallen, dann wiederherstellen. Ein Test, der nicht fällt, prüft nichts.

## 6. `dev-woche.js` — das Konsolen-Werkzeug

Datei öffnen, Inhalt in die Browser-Konsole des laufenden Spiels einfügen.
`dev.hilfe()` listet alles. Unersetzlich für die Dreiteiler, weil sich damit
jeder Wochentag herstellen lässt.

```
AUFBAU
  dev.tag(3, 'normal', {tickets: 5, al: 60})   beliebiger Wochentag
  dev.kontingente()                            Züge pro Pool heute
  dev.vorschau()                               was die Nacht übrig lässt

SZENARIEN
  dev.feierabend(2) / dev.feierabend(2, true)  Dienstag 16:20
  dev.nacht()          Nacht-Screen sofort
  dev.freitag() / dev.freitag('knapp')
  dev.meeting()        direkt ins Wochenmeeting
  dev.gewonnen()       Freitag 16:30, Woche überstanden
  dev.raus('rage'|'tickets'|'chef', tag)       gezieltes Scheitern
  dev.morgentod(4)     Tod in der Morgenstimmung
  dev.gala()           Gala freischalten, dann dev.meeting()
  dev.leerlauf('server')                       Kontingent leeren

SPIELSTAND
  dev.zaehler() / dev.zaehlerLeeren()
  dev.sichern() / dev.zurueck()                vorher/nachher
  dev.aufraeumen()                             Woche verwerfen
```

**Vor Experimenten `dev.sichern()`**, danach `dev.zurueck()` und neu laden.
`dev.zaehlerLeeren()` räumt den Testmüll aus den Archiv-Zählern — sonst
verfälschen Probeläufe die Statistik dauerhaft.

Das Werkzeug wird von `dev-script.test.mjs` mitgetestet: Ein kaputter
Konsolenhelfer fällt in der Testreihe auf, nicht erst im Browser.

## 7. `normalize-quotes.mjs` — Anführungszeichen

```
node tools/normalize-quotes.mjs --dry     # nur berichten
node tools/normalize-quotes.mjs           # schreiben
node tools/normalize-quotes.mjs src/data  # Verzeichnis eingrenzen
```

Zwei Durchgänge, die gleich aussehen und es nicht sind:

1. **Notation** — wie eine Zeichenkette in der Quelldatei geschrieben ist.
   Das Projekt nutzt durchgängig doppelte Anführungszeichen. Wichtig über
   Geschmack hinaus: Werkzeuge, die Dateien als Text durchsuchen, überspringen
   eine abweichend geschriebene Datei **stillschweigend**.
2. **Text** — was der Spieler liest. Hausregel: erste Ordnung `'so'`, zweite
   Ordnung `"so"` (also die übliche Verschachtelung mit vertauschten Rollen,
   passend zu einem Spiel, das ein Terminal imitiert).

Arbeitet über den Parser, nie über Suchen-und-Ersetzen, und prüft das eigene
Ergebnis vor dem Schreiben. Trotzdem: **immer erst `--dry`.**

## 8. `audit-stats.mjs` — Statuswerte auf Plausibilität

```
node --conditions browser --import ./tools/register.mjs tools/audit-stats.mjs
```

Einmalwerkzeug, **bewusst nicht** in `lint:data` eingehängt: Es klassifiziert
Optionen über Schlüsselwörter und prüft die Vorzeichen gegen die
Hausregeln (`l` runter bei Fleiß, `b` runter bei Firmennutzen, `a` runter bei
Erleichterung). Die Fehlalarmquote ist hoch — Arbeits-Verben treffen
zuverlässig Delegation und Aussitzen, wo `l+` genau richtig ist — deshalb ist
jeder Treffer eine **Frage, kein Urteil**. Als Tor würde es die 0-Warnungen-
Disziplin zerstören, als gelegentliche Stichprobe ist es nützlich.

Beim letzten Lauf (2026-08) fand es keine echten Vorzeichenfehler.

---

## Was die Werkzeuge NICHT können

- **Ob ein Text menschlich klingt.** Der Prosa-Bericht sagt nur, wo man
  zuerst hinsehen soll.
- **Ob eine Wiederholung Absicht ist.** Running Gag oder Faulheit entscheidet
  der Mensch.
- **Ob ein Thema erzählerisch doppelt ist.** Der Duplikat-Check läuft per
  `grep` von Hand: vor jedem neuen Ereignis die Motive gegen den Bestand
  klopfen.
- **Ob Balance sich gut anfühlt.** Der Simulator misst Quoten, nicht Spaß.

## Faustregeln

- **Messen statt schätzen.** Bei jedem Fehlerverdacht erst nachstellen, dann
  behaupten. Mehrfach entpuppte sich ein vermuteter Fehler als Testhistorie,
  Upload-Artefakt oder falscher Erwartungswert.
- **Ein Tor bleibt ein Tor.** `lint:data` steht auf 0/0. Wer eine Meldung
  nicht abstellen kann, trägt sie mit Begründung in die jeweilige
  Ausnahmeliste ein (`clockReviewed`, `timeRefReviewed`) — dokumentiert, nicht
  weggeklickt.
- **Fehler beim Entstehen verhindern**, nicht hinterher flicken: Svelte-a11y
  sofort mitschreiben, keine Compiler-Warnung stehen lassen.
- **Keine veralteten Quellen.** Eine in der Sitzung geänderte Datei immer aus
  der eigenen Ausgabe weiterbearbeiten, nie neu aus dem Projekt-Schnappschuss.

---

*Fortschreiben, wenn ein Werkzeug dazukommt oder einen neuen Schalter
bekommt.*

---

## `scan-glossary.mjs` — der Bestandsscanner

```
node tools/scan-glossary.mjs           # alle Abschnitte
node tools/scan-glossary.mjs 2         # nur einen Abschnitt
node tools/scan-glossary.mjs --json    # maschinenlesbar
```

**Kein Tor.** Der Scanner schlägt nie fehl und meldet keine Fehler — er liefert
die Kandidatenliste, aus der ein Mensch `GLOSSAR.md` baut.

Er löst das Problem, das in `UEBERSETZUNG.md` 4b beschrieben ist: Viele
Ereignisse hängen inhaltlich zusammen, **ohne** dass eine `reqStory` das
festhält. Der Zettel des farbenblinden Elektrikers macht eine spätere Auswahl
lösbar, „0000" ist die Antwort auf ein Rätsel, „4711" ist in einem Pool ein
Alarmcode und in drei anderen eine Ticketnummer. Übersetzt man Pool für Pool,
zerreißen diese Bezüge, und es meldet sich niemand — strukturell bleibt alles
in Ordnung.

| Abschnitt | Was er findet |
|---|---|
| 1 | Benannte Dinge: Wortverbindungen mit Ziffern, Räume, Regale, Kennungen |
| 2 | Zahlen in **Auswahl-Beschriftungen** — die riskanteste Gruppe |
| 3 | Zahlen im Ereignis- und Ergebnistext |
| 4 | Großgeschriebene Rufe: Zettel, Schilder, Warnungen |
| 4b | Farben an bedienbaren Dingen — der Elektriker-Fall |
| 5 | Figuren und Gegenstände, mit der Häufigkeit ihrer Nennung |

Sortiert wird nach **Pool-Streuung**, nicht nach Häufigkeit: Ein Begriff in zwei
oder mehr Pools ist ein Übersetzungsvertrag, ein Begriff in einem Pool kann
entschieden werden, wenn dieser Pool an der Reihe ist.

**Zwei Meldungen sind ernst zu nehmen:**

- *Unbekannte Textfelder* — ein Feld, das weder in `TEXT_KEYS` noch in
  `STRUCT_KEYS` steht, wird **nicht gescannt**. Neue Felder gehören eingetragen,
  sonst prüft der Scanner sie stillschweigend nicht.
- Ein Begriff, der in **einer** Sprache mehrfach geschrieben wird („Error 404"
  gegen „Fehler 404"), taucht als zwei Zeilen auf. Das ist meist ein Fund im
  Bestand, nicht im Scanner.

Die Erkennung ist **absichtlich eng**. Ein Detektor, der großgeschriebene
Wörter über Pools hinweg vergleicht, meldete im Vorlauf rund 2.000 Treffer,
fast alles Allerweltswörter. Gesucht wird deshalb die **Form** eines benannten
Dings, nicht seine Wichtigkeit — die kann kein Werkzeug erkennen.

---

## `lint-i18n.mjs` — der Textprüfer

```
npm run lint:i18n
npm run lint:all        # Daten (beide Bäume) + Oberflächentexte
```

**Tor bei 0 Fehlern und 0 Warnungen**, wie der Datenprüfer.

Er existiert, weil ein fehlender Oberflächentext **leise** danebengeht. `t()`
fällt auf Deutsch und dann auf den Schlüssel zurück — ein Tippfehler wirft also
nicht, sondern schreibt `settings.langauge` in kleiner Schrift in ein Menü, das
niemand zweimal öffnet. Bei 552 Zeichenketten und zwei Sprachen ist das keine
Möglichkeit, sondern eine Gewissheit.

Geprüft wird:

1. Jeder im Quelltext benutzte Schlüssel steht in **beiden** Wörterbüchern.
2. Beide Wörterbücher tragen dieselbe Schlüsselmenge.
3. Kein Eintrag ist unbenutzt — eine Umbenennung lässt sonst den alten stehen.
4. Einträge, deren Englisch wörtlich wie das Deutsche lautet. Während des
   Oberflächen-Durchgangs ist das die Arbeitsliste, danach ein Befund.

**Die drei Markup-Formen** (Einzelheiten in `src/i18n/i18n.svelte.js`):

```html
<span data-i18n="intro.archive"></span>
<p data-i18n-html="intro.pitch"></p>
<img data-i18n-attr="alt=intro.logoAlt;title=intro.archive">
```

`-html` nur dort, wo ein Satz Inline-Auszeichnung trägt. Der Werbetext im
Startbildschirm hat ein `<strong>` in der Mitte; ihn zu zerlegen hieße, einer
Übersetzung Bruchstücke statt eines Satzes zu geben. Weil das die einzige Form
ist, die Markup schreibt, findet ein `grep` nach `data-i18n-html` jede solche
Stelle auf einmal.

**Berechnete Schlüssel** kann kein Muster lesen. Dafür gibt es einen Vermerk im
Kommentar:

```js
// i18n-uses: language.name.de, language.name.en
const options = LANGUAGES.map(l => [l, t(`language.name.${l}`)]);
```

Ohne ihn stünden diese Einträge dauerhaft als unbenutzt im Bericht — und eine
Warnung, die immer falsch ist, bringt allen bei, den Abschnitt zu überspringen.

---

## `lint-parity.mjs` — der Gleichlauf-Prüfer

```
npm run lint:parity
node tools/lint-parity.mjs intranet server     # gezielt
```

`lint-data.mjs` prüft **einen** Baum. Zwei Bäume, die auseinandergelaufen sind,
kämen dort beide sauber durch. Dieser hält sie gegeneinander.

Er stützt sich auf die Regel, auf der der ganze Entwurf ruht: **Beide Bäume
tragen dieselben Kennungen, Fahnen, Figurennamen und Zahlen. Nur die Prosa
unterscheidet sich.** Genau das macht einen Spielstand sprachunabhängig — es ist
keine Gewohnheit, sondern die Voraussetzung.

Geprüft wird:

1. **Gleiche Form** — jeder Schlüssel, jede Listenlänge, jede Verschachtelung.
2. **Gleiche Kennungen** — `id`, `next`, `reqStory`, `req`, `rem`, `loot`,
   `char`, `seen`, `flag`, `tone` und die übrigen Bezeichner.
3. **Gleiche Zahlen** — `m`, `l`, `a`, `b`, `timer`, Reputationswerte,
   Schwellen. Eine geänderte Zahl heißt: Die englische Fassung spielt anders,
   und nichts auf dem Bildschirm zeigt es.
4. **Prosa muss sich unterscheiden** — ein Text, der in beiden Bäumen wörtlich
   gleich lautet, ist noch nicht übersetzt. Das ist **kein Fehler**, sondern die
   Arbeitsliste; es steht unter „NOCH DEUTSCH".

Nicht geprüft wird, ob das Englische gut ist. Das kann kein Werkzeug.

**Bei seinem ersten Lauf hat er sofort einen Fehler gefunden** — einen
`versionNote`, der beim Einsetzen des übersetzten Blocks verlorengegangen war.
Genau der Fall, für den er da ist: Der Linter war grün, der Build war grün, und
die englische Seite hätte eine Zeile weniger gehabt.

---

## `scan-fields.mjs` — der Feld-Scanner (Vollständigkeitsnachweis)

```
node tools/scan-fields.mjs emails                  # Übersicht je Eintrag
node tools/scan-fields.mjs emails --list           # jede identische Stelle
node tools/scan-fields.mjs emails --list --german  # nur die deutsch wirkenden
node tools/scan-fields.mjs intranet --key=status   # ein Feld quer durch
```

**Kein Tor.** Läuft über beide Sprachbäume parallel und meldet **jedes**
Textfeld als identisch oder verschieden — **ohne Wortuntergrenze**, gruppiert
je Eintrag, mit einer Zeile je Feldname am Schluss.

**Wofür er da ist:** `lint-parity` zählt nur Prosa mit **mindestens vier
Wörtern** (`isProse`). Das ist für einen Gleichlauf-Prüfer richtig und für eine
Arbeits- oder Vollständigkeitsliste falsch. Im Intranet-Block ist dadurch ein
ganzer Abschnitt unsichtbar geblieben (`status`, 30 deutsche Felder, eines
davon vierwortig); im Mail-Pool liegen **157 der 161 Absenderzeilen** unter der
Schwelle, und genau daran hing der CC-Verteiler.

**Die Zahl, die zählt, steht am Ende:** wie viele Textfelder es gibt, wie viele
identisch sind und wie viele davon `lint-parity` überhaupt sieht.

```
sender  gesamt  161  identisch  50  davon deutsch  0  >=4 Wörter  1
```

**Der Sprachdetektor prüft sich beim Start selbst**, in beide Richtungen, und
das Werkzeug bricht ab, wenn er nicht trägt (GLOSSAR §7b, Fall einundzwanzig).
**Er bleibt trotzdem ein Sieb:** „Seit 2019 in Kraft" trägt keines seiner
Wörter, und umgekehrt schlägt er bei absichtlich deutschen Eigennamen an
(`Schnösel`, `Jürgen`, `Döner`). **Jeder Treffer gehört gelesen, nicht
gezählt** — ein Detektor, der Eigennamen wegfiltert, besteht jede Probe und
prüft nichts mehr.

---

## `check-echoes.mjs` — die Wortfolgen-Prüfung

```
node tools/check-echoes.mjs emails          # Vier-Wort-Ebene
node tools/check-echoes.mjs emails --n=6    # der scharfe Griff
node tools/check-echoes.mjs emails --min=1  # auch Paare innerhalb des Blocks
```

**Kein Tor.** Zwei Fragen in einem Lauf: welche Wortfolgen des frisch
übersetzten Pools auch in den **schon übersetzten** Dateien stehen, und welche
innerhalb des Blocks über mehr als `--min` Einträge laufen.

**Warum neben `report-prose` und nicht dahinter:** dessen Abschnitt 2 beginnt
bei **fünf** Wörtern. Viele übersetzungsgeborene Echos sind vier lang — „the
two of you", „in the middle of", „and that is precisely the". Der Merksatz aus
GLOSSAR §7b: wo das Deutsche mehrere Wörter für dieselbe Sache hat und das
Englische ein naheliegendes, entsteht das Echo beim Übersetzen und steht in
keiner Vorlage.

**Nach jeder Reparatur noch einmal laufen lassen.** In vier von fünf Blöcken
war eine Reparatur selbst ein Echo; die Zahlen müssen **monoton fallen**.
Steigt eine, war die letzte Reparatur eine.

> **`TRANSLATED` im Kopf des Werkzeugs muss mitwachsen.** Steht ein fertiger
> Pool nicht darin, wird der neue Block gegen einen noch deutschen Bestand
> gehalten, und **jede** Folge sieht einzigartig aus. Ein Werkzeug, das 0
> meldet, gehört gegen einen bekannten Treffer gehalten: `check-echoes
> meetings --n=6` muss **22** melden, die Zahl der dreizehnten Sitzung.


---

## `make-steam-presence.mjs` — die Freundeslisten-Texte

```bash
node tools/make-steam-presence.mjs [--out build/steam]
```

Schreibt `4487580_loc_english.vdf` und `4487580_loc_german.vdf` nach
`build/steam/`. Die beiden Dateien gehören im Steamworks-Backend unter **Rich
Presence Localization** hochgeladen.

**Warum es das gibt.** Steam zeigt den Status in der Freundesliste in der
Sprache **dessen, der hinsieht** — aber nur, wenn das Spiel eine *Kennung*
schickt (`#Status_coffee`) und Steam sie aus der hochgeladenen Datei auflöst.
Bis 6.0 schickte das Spiel den fertigen Satz durch `%statustext%`, und damit
las jeder Freund die Sprache des Spielers.

**Die Sätze bleiben im Repo.** Sie stehen unter `presence.*` in `src/i18n/`, wo
`lint-i18n` und `lint-parity` sie sehen; das Werkzeug übersetzt sie nur in das
Upload-Format. Welche Tätigkeiten es gibt, steht in `src/engine/presence.js` —
runenfrei, damit dieses Werkzeug es in reinem Node lesen kann.

**Es ist mehr als ein Formatierer:** Es bricht ab, wenn eine Tätigkeit ohne Text
dasteht oder ein Text ohne Tätigkeit. Das erste ergäbe in der Freundesliste ein
nacktes `#Status_lunch`, das zweite gepflegt aussehende Karteileichen. Ein Test
in `i18n.test.mjs` hält dieselben zwei Listen gegeneinander.

> **Die Reihenfolge ist keine Geschmacksfrage.** Die Datei muss in Steamworks
> liegen, **bevor** ein Build ausgeliefert wird, der die neuen Kennungen
> sendet — sonst steht bei allen Spielern die rohe Kennung in der
> Freundesliste. `#DisplayStatus` wird weiterhin mitgeschrieben, damit ein
> Client, der das Update noch nicht hat, unverändert weiterläuft.
