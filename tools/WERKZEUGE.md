# Layer8Problem — Werkzeuge

Übersicht über alles unter `tools/`. Stand 5.0.

Gegenstück zur `EVENT-DOKTRIN.md`: Dort steht, **wie** man schreibt, hier
steht, **womit** man prüft. Alle Befehle laufen aus dem Repo-Wurzelverzeichnis.

---

## Der Kurzüberblick

| Werkzeug | Aufruf | Wann |
|---|---|---|
| Datenprüfer | `npm run lint:data` | nach **jeder** Datenänderung, Tor bei 0/0 |
| Prosa-Bericht | `node tools/report-prose.mjs [pool …]` | nach jeder Textwelle |
| Tages-Simulator | `npm run sim [n]` | vor jeder Balance-Entscheidung (Tag) |
| Wochen-Simulator | `npm run sim:week [n]` | vor jeder Balance-Entscheidung (Woche) |
| Testreihen | `npm test` | vor jeder Auslieferung |
| Konsolen-Werkzeug | `tools/dev-woche.js` in die Browser-Konsole | Spieltests am lebenden Spiel |
| Anführungszeichen | `node tools/normalize-quotes.mjs --dry` | selten, nach Fremdtext-Import |
| Werte-Prüfer | `node --conditions browser --import ./tools/register.mjs tools/audit-stats.mjs` | gelegentlich, kein Tor |

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
node tools/report-prose.mjs              # alle Pools
node tools/report-prose.mjs server       # gezielt
node tools/report-prose.mjs coffee calls
```

Pools: `server coffee calls sidequests emails meetings lunch party reputation
bossfights special board`.

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

**Arbeitsweise:** erst schreiben, dann messen, dann korrigieren. Vor/Nach-
Vergleich statt Nullziel — Abschnitt 6 *soll* Treffer haben. Beabsichtigte
Refrains dürfen stehen bleiben, brauchen aber ein Warum (siehe Doktrin §9).

## 3. `simulate-day.mjs` — Tages-Balance

```
npm run sim            # 1500 Tage pro Zelle
npm run sim 300        # schneller Rauchtest
```

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
npm run sim:week           # volle Läufe
npm run sim:week 300       # Rauchtest
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
--idlem/--idlef/--idlea   Vektor des Leerlauf-Klicks
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

## 8. `audit-stats.mjs` — Werte gegen die Doktrin

```
node --conditions browser --import ./tools/register.mjs tools/audit-stats.mjs
```

Einmalwerkzeug, **bewusst nicht** in `lint:data` eingehängt: Es klassifiziert
Optionen über Schlüsselwörter und prüft, ob die Vorzeichen zur Doktrin passen
(`f` runter bei Fleiß, `c` runter bei Firmennutzen, `a` runter bei
Erleichterung). Die Fehlalarmquote ist hoch — Arbeits-Verben treffen
zuverlässig Delegation und Aussitzen, wo `f+` genau richtig ist — deshalb ist
jeder Treffer eine **Frage, kein Urteil**. Als Tor würde es die 0-Warnungen-
Disziplin zerstören, als gelegentliche Stichprobe ist es nützlich.

Beim letzten Lauf (2026-08) fand es keine echten Vorzeichenfehler, dafür zwei
falsche Angaben in der Dokumentation — siehe Doktrin §3 und §4.

---

## Was die Werkzeuge NICHT können

- **Ob ein Text menschlich klingt.** Der Prosa-Bericht sagt nur, wo man
  zuerst hinsehen soll.
- **Ob eine Wiederholung Absicht ist.** Running Gag oder Faulheit entscheidet
  der Mensch.
- **Ob ein Thema erzählerisch doppelt ist.** Der Duplikat-Check läuft per
  `grep` von Hand — deshalb steht der Themen-Friedhof in der Doktrin §1b.
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
bekommt. Zusammen mit `UEBERGABE.md` und `EVENT-DOKTRIN.md` die dritte
Sitzungsgrundlage.*
