# Layer8Problem — Events bauen (Leitfaden für Beiträge)

Du möchtest ein eigenes Ereignis beisteuern? Diese Seite erklärt, wie Ereignisse
aufgebaut sind — mit einem vollständigen Beispiel für jeden Typ. Alle Ereignisse liegen
als JavaScript-Objekte in `src/data/data_*.js` (eine Datei je Bereich: `data_coffee.js`,
`data_server.js`, `data_calls.js`, `data_sidequests.js`, `data_reputation.js`,
`data_lunch.js`, `data_bossfights.js`, `data_party.js`, `data_emails.js`). Ein neues
Ereignis ist einfach ein weiteres Objekt im Array der passenden Datei.

Spieltexte sind Deutsch, aus Müllers Sicht ("du"), im Präsens. Kommentare im Code und
Dateinamen sind Englisch. Zum Ausprobieren: `npm install`, dann `npm run preview`;
vor einem Pull Request `npm run lint:data` — er muss ohne Fehler und ohne Warnungen
durchlaufen.

Die Beispiele zeigen absichtlich den **Vollausbau**: alles, was an einer Stelle möglich
ist, auf einmal. Weglassen darf man fast alles — aber wer weiß, was es gibt, lässt
bewusst weg statt aus Versehen.

---

## Ein Ereignis im Vollausbau

Der Grundtyp, wie er in Kaffee, Serverraum, Dienstgang und Anruf steht:

```js
{
    id: "cof_spinat_1",                          // Pflicht: eindeutig über ALLE Pools hinweg
    char: "Chantal",                             // optional: zeigt Chantals Porträt neben dem Text
    title: "Der Spinat-Kern",                    // Pflicht: Überschrift der Ereignis-Karte
    text: "Chantal steht mit einer Tasse vor dem Automaten und liest die Anzeige, als wäre sie ein Vertrag. 'Was ist ein Kern-Spülgang und warum betrifft mich das?'",   // Pflicht: der Auftakt
    opts: [                                      // Pflicht: zwei bis vier Auswahlen, meist drei
        {
            t: "Ihr erklären, was der Automat gerade tut",   // Pflicht: der Button-Text
            next: "path_spinat_erklaert",        // optional: setzt ein Story-Flag für Folge-Ereignisse
            rep: { "Chantal": 5, "Kevin": -2 },  // optional: Ruf bei Kollegen
            m: 5, f: 0, a: 0, c: 0,              // Hausstil: immer alle vier, auch als 0
                                                 // (Ausnahme Firmenfeier: nur f und a, siehe 9)
            r: "Zwei Minuten Erklärung, danach nickt sie zufrieden und drückt trotzdem den falschen Knopf. Immerhin weiß sie jetzt, welchen."   // Pflicht: das Ergebnis
        },
        {
            t: "Ihr den Donut aus dem Rucksack anbieten",
            rem: "donut",                        // optional: verbraucht den Gegenstand
            rep: { "Chantal": 10 },
            m: 5, f: 5, a: -5, c: 0,
            r: "Sie isst ihn ohne Nachfrage und ohne Danke. Der Automat ist vergessen, das Problem gelöst, der Donut weg."
        },
        {
            t: "'Kein Kommentar.'",
            loot: "energy",
            m: 2, f: 0, a: 5, c: 0,
            r: "Du nimmst dir aus dem Kühlschrank, was du brauchst, und gehst. Hinter dir piept der Automat weiter, jetzt mit Publikum."
        }
    ]
}
```

**Die Reihenfolge der Felder** ist nicht erzwungen, aber im ganzen Bestand dieselbe.
Wer sich daran hält, sorgt dafür, dass jede Datei sich gleich liest:

- am Ereignis: `id` → `char` → `kind` → `title` → `reqRep` → `reqStory` → `text` → `opts`
- in der Auswahl: `t` → `req`/`rem`/`loot` → `next` → `rep` → `m, f, a, c` → `r`

`m, f, a, c` stehen zusammen auf einer Zeile, und zwar **alle vier**, auch wenn drei
davon 0 sind. Ohne die Nullen sieht man beim Überfliegen nicht, ob eine Wirkung fehlt
oder bewusst ausbleibt.

## Die Felder am Ereignis

| Feld | Wo | Bedeutung |
|---|---|---|
| `id` | überall, Pflicht | Eindeutig über **alle** Pools zusammen — dieselbe Kennung zweimal, und beide Ereignisse sperren sich gegenseitig aus. Mit Bereichs-Präfix. |
| `title` | überall außer Mails, Pflicht | Die Überschrift der Ereignis-Karte. Fehlt sie, bleibt die Zeile im Terminal leer. |
| `text` | Pflicht, außer bei Ketten (dort steht der Text in den Knoten) | Der Auftakt. `\n` erzeugt einen Absatz. |
| `opts` | Pflicht, außer bei Ketten | Die Auswahlen, siehe unten. |
| `char` | überall optional | Zeigt das Porträt einer Figur. Name **exakt** wie in `data_chars.js`. |
| `reqStory` | Kaffee, Serverraum, Anrufe, Dienstgang, Begegnungen | Vorbedingung: Das Ereignis erscheint erst, wenn dieses Story-Flag gesetzt ist. Mittagspause, Bossfight und Party werten das Feld **nicht** aus. |
| `reqStoryAge` | Kaffee, Serverraum, Anrufe, Dienstgang — nur zusammen mit `reqStory` | Wochenmodus: Das Flag muss mindestens so viele **Nächte** alt sein (1 = frühestens morgen). Im Tagesmodus nie erfüllbar, siehe Abschnitt 3. |
| `reqWeekDayMin` | Kaffee, Serverraum, Anrufe, Dienstgang | Wochenmodus: erscheint **ab** diesem Wochentag (2 = Dienstag … 5 = Freitag), nicht nur an ihm. Im Tagesmodus nie erfüllbar. |
| `reqRep` | Begegnungen, dort Pflicht | Ruf-Schwelle, siehe Abschnitt 6. |
| `kind` | Dienstgang, dort Pflicht | `"text"` (Terminal) oder `"phone"` (Handy-Chat). |
| `appName` | Dienstgang-Chat | Welche App den Chat anzeigt, z. B. `"WhatsApp"`, `"Teams"`, `"SMS"`. |
| `startNode`, `nodes`, `results` | Anrufe, Dienstgang, Wochenmeeting | Gespräch mit Verlauf statt einer einzelnen Entscheidung, siehe Abschnitt 4. |
| `startNodeGala` | Wochenmeeting | Zweiter Einstiegsknoten: greift, wenn am Abend die Gala ansteht — die Ansage kommt im Meeting, siehe Abschnitt 4. |
| `loc` | Party, dort Pflicht | Ort der Feier: `"bar"`, `"buffet"`, `"dance"`, `"lounge"`, `"smoke"`. |
| `timer`, `fail` | Bossfights, dort Pflicht | Countdown in Sekunden und was passiert, wenn er abläuft. |
| `webOnly` | Kaffee, Serverraum, Anrufe, Dienstgang | Erscheint nur im Browser, nicht in der Steam-Fassung (für Ereignisse, die auf die Shop-Seite zeigen). |
| `sender`, `subj`, `body`, `linked` | nur Mails | Siehe Abschnitt 10. |

Der Daten-Prüfer meldet jedes Feld, das die Engine **an dieser Stelle** nicht
liest. Ein `reqStory` an einer Mittagspause ist damit kein stiller Blindgänger mehr,
sondern ein Fehler.

## Die Felder in einer Auswahl

| Feld | Wirkung |
|---|---|
| `t` | Pflicht: die Beschriftung des Knopfes — in jedem Bereich gleich, auch im Postfach. |
| `r` | Pflicht: der Ergebnistext. Er steht danach auch im Protokoll. |
| `m` | Kostet Minuten Spielzeit. Der Arbeitstag ist begrenzt, das ist die eigentliche Währung. |
| `f` | Faulheit (positiv = fauler). Wirkt 1:1. |
| `a` | Aggro. Positive Werte werden mit dem Schwierigkeitsgrad hochgerechnet, negative wirken 1:1. |
| `c` | Chef-Radar. Positive Werte steigen mit Schwierigkeitsgrad **und** Faulheit — wer faul ist, fällt schneller auf. Negative wirken 1:1. |
| `rep` | Ruf bei Kollegen: `rep: { "Chantal": -10, "Kevin": 5 }`. Namen exakt wie in `data_chars.js`. |
| `loot` | Gibt einen Gegenstand (ID aus `data_items.js`). |
| `req` | Setzt einen Gegenstand voraus. Die Auswahl bleibt **sichtbar**, ist aber gesperrt und meldet "Fehlt: LAN-Kabel". Der Gegenstand bleibt erhalten. |
| `rem` | Verbraucht den Gegenstand. Solange die Auswahl wählbar ist, steht das als "−Panzertape" auf dem Knopf. |
| `next` | Im Grundtyp: setzt ein Story-Flag (Abschnitt 3). In einer Kette: das Ziel im Gespräch (Abschnitt 4). |
| `ignoreEmail`, `nextEmail` | nur in Mails, siehe Abschnitt 10. |

Eine Sonderregel bei Gegenständen: Die Quest-Trophäen (`kevin_ram`, `golden_stapler`,
`mixtape`, `cat_pic`, `master_key`, `scotch_bottle`, `contract`, `corp_chronicles`,
`prince_letter`) dürfen nur per `loot` vergeben, aber **nie** per `req`/`rem` verlangt
oder verbraucht werden — sie sind Sammlerstücke für Erfolge, und wer die passende
Ruf-Geschichte nie gespielt hat, stünde sonst vor einer gesperrten Auswahl.

Jedes Ereignis wird pro Arbeitstag höchstens einmal gezogen.

## Die Zahlen

Der Daten-Prüfer setzt ein paar Grundregeln durch, die alle aus derselben Idee kommen:
Jede Entscheidung soll etwas kosten.

- **`m` ist mindestens 2.** Keine Handlung dauert unter zwei Minuten, und die Uhr läuft
  nie rückwärts. Alles darunter ist ein Fehler.
- **`f`, `a` und `c` liegen im 5er-Raster.** Die Balken bewegen sich in Fünferschritten;
  eine 3 sieht der Spieler nicht. `rep` darf feiner sein — ±2 und ±3 sind dort üblich.
- **Teure Zeit braucht eine Folge.** Ab `m: 15` will der Prüfer eine Gesamtwirkung von
  mindestens 10 sehen (oder `loot` bzw. `rep`), sonst ist die Auswahl ein Vorspulknopf
  ohne Konsequenz.
- **Größenordnung beim Ruf:** ±5 ist der Normalfall, ±10 eine deutliche Ansage, ±20
  reserviert für Ereignisse, die eine Beziehung wirklich drehen.
- **Mindestens eine Auswahl ohne Gegenstand.** Verlangen alle einen, kann sich das
  Ereignis vollständig sperren — das Inventar startet jeden Tag leer.

Wer an Werten dreht, rechnet vorher `npm run sim` gegen: eine Tages-Simulation mit den
echten Pools und den Engine-Formeln.

## Regeln für Texte

- **Anführungszeichen erster Ordnung sind einfach:** `'so'`. Doppelte nur für ein Zitat
  im Zitat.
- **Kein HTML, kein Markdown.** Ereignis- und Ergebnistexte werden als Klartext
  ausgegeben, ein `<br>` wäre für den Spieler lesbar. Absätze macht `\n`.
- **Beschriftungen sagen, was Müller tut oder sagt** — als natürliche Verbphrase
  ("Ihn vor dem Spinat-Kern warnen") oder als nackte wörtliche Rede
  ("'Das war ich nicht.'"). Keine Etiketten wie `Lüge: …` oder `Auflegen (Angst)`: Der
  Knopf soll die Entscheidung nicht vorwegnehmen, das macht der Ergebnistext danach.
- **Ergebnistexte zeigen die Folge, nicht die Mechanik.** Kein "(Inventar +1)", kein
  "Maximaler Stress." — was der Spieler ohnehin sieht, muss nicht dastehen, und ein
  Stichwort ist keine Szene.
- **Die beste Antwort steht nicht immer oben.** Verteile sie über die Plätze. Nur
  Abbrechen, Ignorieren, Auflegen und Löschen gehören ans Ende, dorthin, wo man sie
  sucht.

---

## 1. Der Grundtyp: Kaffee, Serverraum, Dienstgang, Anruf

Das Beispiel ganz oben ist bereits der Vollausbau dieses Typs: ein Auftakt und zwei bis
vier Auswahlen, jede mit ihrem Ergebnistext.

Die Bereichs-Präfixe für die `id`: `cof_` (Kaffee), `srv_` (Serverraum), `call_`
(Anrufe), `sq_` (Dienstgang), `rep_` (Begegnungen), `lunch_`, `boss_`, `party_`,
`mail_`.

Zwei Bereiche haben je ein Pflichtfeld mehr:

- **Dienstgang** (`data_sidequests.js`): `kind: "text"` oder `kind: "phone"`
  (Abschnitt 5).
- **Anruf** (`data_calls.js`): `title` ist hier die Anzeige auf dem Telefondisplay, gern
  mit Abteilung in Klammern — `title: "Frau Meyer (Buchhaltung)"`.

## 2. Porträts: das Feld `char`

`char` blendet neben dem Text das Porträt einer Figur ein. Das gilt in **jedem** Bereich,
nicht nur im Chat: Kaffee, Serverraum, Anruf, Dienstgang, Mittagspause, Bossfight,
Party und Wochenmeeting zeigen es gleichermaßen.

Ein Name, der **nicht** in `data_chars.js` steht, ist kein Fehler: Das Terminal zeigt
dann eine Initialen-Kachel mit dem Namen darunter — wie ein Kontakt ohne Bild. Das ist
die vorgesehene Darstellung für die austauschbaren Berater im Wochenmeeting, die
bewusst nie ins Team und ins Ruf-System aufgenommen werden.

```js
{
    id: "srv_kevin_rack_1",
    char: "Kevin",              // Porträt aus data_chars.js
    title: "Der Drachenaufkleber",
    text: "...",
    opts: [ /* ... */ ]
}
```

Gültige Namen (exakt so schreiben): `Kevin`, `Chantal`, `Egon`, `Dr. Wichtig`,
`Frau Elster`, `Markus`, `Gabi`, `Du (Müller)`. Ein Tippfehler ist ein Fehler im
Daten-Prüfer, kein stilles Verschwinden des Bildes.

Faustregel: `char` gehört an jedes Ereignis, in dem eine dieser Figuren auftritt und
spricht. Geht es um eine namenlose Person aus dem Vertrieb, bleibt das Feld weg.

## 3. Folgeereignisse: `next` setzt, `reqStory` fordert

Eine Auswahl kann eine Geschichte fortsetzen: `next` setzt eine unsichtbare Markierung
(ein Story-Flag), und ein zweites Ereignis mit `reqStory` auf denselben Namen kann ab
dann erscheinen.

```js
// Teil 1 — die Auswahl setzt das Flag:
{
    id: "srv_kabel_1",
    title: "Das beschriftete Kabel",
    text: "Hinter dem Rack hängt ein Kabel, das nirgendwo angeschlossen ist. Jemand hat es beschriftet: 'NICHT ZIEHEN'.",
    opts: [
        {
            t: "Es natürlich ziehen",
            next: "path_kabel_gezogen",
            m: 2, f: 0, a: 0, c: 0,
            r: "Nichts passiert. Kein Alarm, kein Piepen, keine Konsequenz. Du legst das Kabel zurück und fühlst dich seltsam betrogen."
        },
        {
            t: "Die Beschriftung respektieren",
            m: 2, f: 5, a: 0, c: 0,
            r: "Manche Rätsel vererbt man einfach an den nächsten Admin. Der wird auch nicht ziehen, und so geht das seit 1998."
        }
    ]
},
// Teil 2 — erscheint nur, wenn das Flag gesetzt wurde:
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
            m: 5, f: 0, a: 0, c: 0,
            r: "Die Klingel verstummt. Gabi bedankt sich für die schnelle Diagnose. Niemand muss je erfahren, wie schnell sie wirklich war."
        },
        {
            t: "'Das ist ein bekanntes Verhalten der Anlage.'",
            m: 5, f: 10, a: 0, c: 5,
            r: "Gabi glaubt dir kein Wort, trägt es aber genau so ins Ticket ein. Die Formulierung wird die Firma überleben."
        }
    ]
}
```

Wichtig für den Text: Ein Folgeereignis kommt **irgendwann später am selben Arbeitstag —
oder nie**, wenn der Tag vorher endet. Zwischen Auslöser und Fortsetzung können Stunden
liegen. Deshalb kein "gerade eben", kein "kaum hast du", kein "Sekunden später"; der
Prüfer warnt bei solchen Formulierungen. Umgekehrt gilt genauso: Der Auslöser war
**heute**, also datiert ihn kein "gestern" in die Vergangenheit.

### Mehrtägige Ketten: `reqStoryAge` und `reqWeekDayMin` (Wochenmodus)

Im Wochenmodus tragen Story-Flags den Tag, an dem sie gesetzt wurden. Zwei Felder
nutzen das aus:

- `reqStoryAge: 1` — das Flag ist mindestens eine **Nacht** alt. Ein solches
  Folgeereignis kann per Definition nicht mehr am selben Tag kommen; der Auslöser
  liegt wirklich in der Vergangenheit, "gestern" ist hier also richtig statt falsch.
- `reqWeekDayMin: 3` — erscheint **ab** Mittwoch, nicht nur am Mittwoch. Züge sind
  Zufall: Ein Ereignis, das nur an einem einzigen Tag feuern dürfte, konkurriert an
  diesem Tag gegen den ganzen Pool und wird oft verpasst. Der Prüfer warnt deshalb
  bei `reqWeekDayMin: 5`.

Beide Bedingungen sind im Tagesmodus schlicht unerfüllbar — zeitgebundene Teile sind
dadurch automatisch Wochen-exklusiv, ohne eigenes Modus-Feld. Der **Auftakt** einer
solchen Kette läuft dagegen in beiden Modi; seine riskante Auswahl braucht darum einen
kleinen Sofortpreis, sonst ist sie im Tagesmodus, wo die Rechnung nie kommt, immer die
beste.

Schreibregeln für mehrtägige Teile:

1. **Der Auftakt schließt als eigene Szene.** Ketten dürfen verhungern (die Woche
   endet, der Zufall zieht anders) — das darf sich nie wie ein Fehler anfühlen.
   Der Auftakt-Text erklärt die Lage außerdem vollständig selbst; der Titel ist
   Zugabe, keine Voraussetzung.
2. **Wiederverankerung im Gegenstand, nicht im Meta.** Der Spieler ist Tage weiter.
   Nicht "wie du weißt, hast du am Montag …", sondern: der Serverraum riecht nach
   Grillabend.
3. **Keine Wochentagsnamen und keine Uhrzeiten im Text.** Ein "ab Mittwoch"-Ereignis
   kann auch Donnerstag gezogen werden; "endlich da" stimmt an beiden Tagen. Und weil
   jedes Ereignis zu jeder Tageszeit gezogen werden kann, darf die Szene nicht an einer
   Uhr hängen ("Um kurz nach elf zuckt das Licht"). Erlaubt sind Uhrzeiten, die einem
   **Gegenstand** gehören — Kalendereintrag, Log-Stempel, Mail-Zeit — oder die vor 8:00
   bzw. nach Feierabend liegen. Der Prüfer warnt und kennt eine geprüfte Ausnahmeliste
   (`clockReviewed`).
4. **Eskalation sind mehrere Ereignisse**, nicht ein wartendes: Stufe 1 mit
   `reqStoryAge: 1`, Stufe 2 mit `reqStoryAge: 2`. Jede Stufe ist eine eigene Szene.
5. **Numerisch gewöhnlich, erzählerisch besonders.** Jeder Teil ist ein normal
   balanciertes Ereignis seines Pools; das Drama liegt in der Erwartung, nicht in
   den Zahlen.

Flags sind global — ein Serverraum-Auslöser darf sein Echo auch im Anruf-Pool haben: Wer
im Serverraum etwas improvisiert, bekommt zwei Tage später einen Anruf aus einer ganz
anderen Abteilung, die den Geruch bemerkt hat. Das Gebäude erinnert sich.

Flag-Namen sind frei wählbar, im Bestand tragen 565 von 595 das Präfix `path_`. Sprechend
benennen: `path_kabel_gezogen`, nicht `path_2b`.

Folgeereignisse dürfen **bereichsübergreifend** sein: Das Flag aus einem
Serverraum-Ereignis kann ein Kaffee-Ereignis freischalten oder einen Anruf auslösen — 23
Geschichten machen das bereits. Einfach `reqStory` im Ereignis des anderen Bereichs
verwenden.

Ein freigeschaltetes Folgeereignis bekommt beim Ziehen Vorrang: In 30 % der Fälle wählt
die Engine aus den offenen Fortsetzungen statt aus dem Grundbestand. Dieselbe Regel gilt
auch für die Mittagspause.

**Nicht bei den Begegnungen.** In `data_reputation.js` sind mehrtägige Ketten nicht
vorgesehen: Der Pool ist an anderer Stelle fest eingeplant, und zusätzliche Ketten
senken dort die Ziehchance der vorhandenen Ereignisse. Der Daten-Prüfer weist
`reqStoryAge` in diesem Pool deshalb ab.

### Was davon ins Wissen gehört (`data_compendium.js`)

Das Kompendium sammelt, was Müller über das Haus herausfindet: über Kollegen,
über Leute, die immer wieder auftauchen, über Räume und über Vorgänge. Es füllt
sich aus Ereignissen, die es ohnehin gibt — ein Eintrag verweist per
Ereignis-ID oder Story-Flag auf die Szenen, aus denen er stammt.

**Beim Schreiben mitdenken, aber nichts erzwingen.** Wer eine Figur, einen Ort
oder einen laufenden Vorgang mehrfach auftreten lässt, schafft nebenbei
Material für einen Eintrag — das ist ein guter Grund, aus einem Einzelereignis
eine Kette zu machen oder eine Nebenfigur ein zweites Mal zu verwenden. Der
umgekehrte Weg funktioniert nicht: Ereignisse zu schreiben, damit ein Eintrag
zustande kommt, merkt man dem Ergebnis an.

Die Aufnahmeprüfung ist streng und hat nichts mit Vollständigkeit zu tun:

- **Mindestens drei Szenen.** Ein Eintrag darf so viele Notizen führen, wie er
  verschiedene Szenen zitiert (Deckel acht) — der Linter setzt das durch. Wer
  aus zwei Auftritten fünf Notizen zieht, erfindet.
- **Die Notiz ist die Lehre, nicht die Szene.** Das Ereignis erzählt, was
  passiert ist; die Notiz hält fest, was Müller jetzt weiß. Prüffrage: Wäre die
  Notiz auch für jemanden lesbar und komisch, der das Ereignis nie gesehen hat?
  Wenn sie die Szene als Kontext braucht, ist sie eine Zusammenfassung und
  gehört umgeschrieben.
- **Eine Notiz pro Kette, nicht pro Ereignis.** Ein Dreiteiler liefert sonst
  dreimal dieselbe Erkenntnis.
- **Kein Eintrag um des Eintrags willen.** Eine Figur mit einem Auftritt, ein
  Raum ohne eigenen Charakter, ein Vorgang ohne Wiederkehr — das wird eine
  Beschreibung statt einer Beobachtung, und Beschreibungen liest niemand
  zweimal. Lieber kein Eintrag als ein dünner.

Auslöser sind **immer** Ereignis-IDs oder Story-Flags, nie Namen im Text: Es
gibt zwei Brandts im Spiel, und ein Namensabgleich würde dem falschen Eintrag
eine Notiz geben.

Das Format und die vier Kategorien stehen im Kopfkommentar von
`data/data_compendium.js`. Neue Einträge prüft `npm run lint:data` mit.

## 4. Gespräche mit Verlauf: `nodes` und `results`

Für echte Dialoge gibt es den Knoten-Aufbau. Statt `text` und `opts` hat das Ereignis
einen `startNode`, ein `nodes`-Objekt (die Gesprächsschritte) und ein `results`-Objekt
(die Ausgänge). Die Aufteilung ist streng:

- **Knoten** tragen den Text und die Auswahlen. Eine Knoten-Auswahl hat **nur** `t` und
  `next` (dazu höchstens `req` oder `rem`). Kein `r`, kein `m`, kein `rep` — die Engine
  liest sie dort nicht, sie würden spurlos verschwinden.
- **`next`** zeigt entweder auf einen weiteren Knoten oder auf einen Ausgang. Gesucht
  wird erst in `nodes`, dann in `results`. Eine Knoten-Auswahl ohne `next` ist eine
  Sackgasse und ein Fehler.
- **Results** tragen alle Wirkungen. Der Ergebnistext heißt hier `txt` statt `r`, sonst
  gelten dieselben Felder wie in einer Auswahl. Ein `next` **im Result** setzt ein
  Story-Flag wie in Abschnitt 3.
- **Result-Schlüssel beginnen mit `res_`.** Das ist eine Lesbarkeitsregel, keine
  Mechanik: Wer die Datei überfliegt, sieht am Namen, wo eine Kette endet. Das
  "…"-Abzeichen im Terminal hängt nicht am Namen — es schaut wie die Engine nach,
  ob das Ziel ein Knoten ist. Ein Ausgang darf also `truth` heißen und funktioniert
  trotzdem; `res_truth` liest sich nur besser.
- **Knoten dürfen einen eigenen `char` tragen** (Konvention vom Handy
  übernommen): Der Knoten-`char` schlägt den Ereignis-`char`, `char: null` erzwingt
  gar keinen. So wechselt eine Kette mitten im Gespräch den Sprecher — im Terminal
  genauso wie im Handy-Chat.

### Das Wochenmeeting (`data_meetings.js`)

Der Meeting-Pool nutzt den Ketten-Aufbau mit drei Sonderregeln. IDs beginnen mit
`meet_`. `startNodeGala` ist ein zweiter Einstiegsknoten: Die Engine wählt ihn, wenn
die Gala am selben Abend zündet — die "kurz halten"-Ansage gehört ins Gespräch, nicht
in eine Systemmeldung. Und die externen Berater existieren **nur** als Knoten-`char`
mit Initialen-Kachel (Abschnitt 2): kein `data_chars`-Eintrag, kein Ruf, kein Team —
die Besetzung darf pro Ereignis frei erfunden werden und rotiert über die Wochen von
selbst. Ruf bewegt sich im Meeting nur bei echten Figuren, also den sieben aus
`data_chars` — nie bei den Beratern. Ausreden gibt es im Meeting keine — dem
Wochenbericht entkommt man nicht.

**Der Aufbau in drei Akten.** Ein Meeting ist kein Ereignis mit
Verzweigung, sondern eine Besprechung, die sich zieht. Deshalb drei
Entscheidungen statt zwei:

1. **Die Frage an dich** (`root`) — man wird um den Wochenbericht gebeten.
2. **Der Exkurs** — die Antwort wird umgedeutet, jemand übernimmt, eine Folie
   kommt dazwischen. Hier ist die Länge zu Hause: die Rückfrage, das Flipchart,
   der Kollege mit einer Anmerkung.
3. **Der Ausstieg** — wie man aus dem Raum kommt und was man dabei zusagt.

Daraus ergeben sich acht Knoten (root, `root_gala`, zwei im zweiten, vier im
dritten Akt) und mindestens acht Ergebnisse. Wichtig: Was der Exkurs erzählt,
darf im Ergebnistext nicht noch einmal stehen. Wer eine Pointe in den
Mittelteil setzt, muss das Ergebnis danach neu denken.

**Nicht durchgehend zwei Optionen.** Alle Knoten binär zu bauen ist bequem und
fällt über zwölf Meetings auf; der Rest des Spiels variiert zwischen einer und
drei. Pro Meeting bekommt deshalb ein Knoten eine dritte Option, an wechselnder
Stelle — meist die leise Wahl: schweigen, auf die Uhr sehen, jemand anderen
machen lassen.

```js
// Anruf mit Verlauf (data_calls.js):
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
            m: 10, f: 10, a: 5, c: 0
        },
        res_gnaedig: {
            txt: "Sie bedankt sich knapp und beendet das Gespräch. Irgendwann im nächsten Monat taucht ein Beleg wieder auf, den du längst abgeschrieben hattest. Zufälle gibt es.",
            rep: { "Frau Elster": 10 },
            m: 5, f: 0, a: 0, c: 0,
            next: "path_elster_gutschein"        // Story-Flag für ein Folgeereignis
        },
        res_statistik: {
            txt: "Am Telefon herrscht Stille von der Sorte, die man in der Buchhaltung ein Jahr lang aufbewahrt. Dann ein sehr höfliches 'Danke, Herr Müller.'",
            rep: { "Frau Elster": -10 },
            m: 5, f: 0, a: 5, c: 0
        }
    }
}
```

## 5. Der Dienstgang als Chat: `kind: "phone"`

Ein Handy-Chat ist derselbe Knoten-Aufbau wie in Abschnitt 4, mit drei Feldern mehr:
`kind: "phone"`, `appName` (welche App den Chat anzeigt) und `title` (der Kontaktname im
Chat-Kopf).

Für die Beschriftungen gilt im Chat eine eigene Konvention: Klartext ist eine
**Nachricht**, die Müller abschickt; eckige Klammern sind eine **Handlung** statt einer
Nachricht — ob App-Funktion oder Handgriff, spielt keine Rolle: `[Gruppe verlassen]`,
`[Handy weglegen]`, Medien als `[GIF gesendet: …]`. Kein `System:` davor; die Klammern
sagen bereits alles, und im schmalen Chatfenster zählt jedes Zeichen.

Im **Text** einer Blase darf `[System: …]` dagegen stehen — dort ist es die Meldung des
Messengers selbst (`[System: Chat stummgeschaltet] Du lässt das Handy vibrieren`) und
nicht die Beschriftung eines Knopfes.

Das Porträt kommt auch hier aus `char`, wird im Chat aber pro Nachricht aufgelöst:

- `char` **am Ereignis** → Porträt für den ganzen Chat; über den Blasen steht weiterhin
  `title`, also der gespeicherte Kontaktname.
- `char` **an einem Knoten** → nur diese Nachricht zeigt Porträt **und Namen** der Figur,
  wie eine benannte Stimme in einer Gruppe. Ohne eigenes `char` erbt der Knoten das
  Ereignis-`char`.
- **Kein** `char` am Ereignis, `char` nur an einzelnen Knoten → Gruppen-Chat: alle
  anderen bleiben bei der anonymen Initiale.
- `char: null` an einem Knoten erzwingt die Initiale trotz Ereignis-Figur.

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
            char: "Kevin",        // nur diese Nachricht trägt Kevins Namen und Gesicht
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
            m: 2, f: 5, a: 0, c: 0
        },
        res_zugesagt: {
            txt: "Du hast dich soeben schriftlich zu Wimpelketten verpflichtet. Der Schreibwarenladen um die Ecke hat noch genau eine, und sie ist rosa.",
            rep: { "Kevin": 5 },
            m: 5, f: 0, a: 5, c: 0,
            next: "path_deko_zugesagt"
        },
        res_ignoriert: {
            txt: "Du legst das Handy weg. Es vibriert weiter, jetzt einzeln, jetzt privat. Kevin hat gesehen, dass du online warst.",
            rep: { "Kevin": -5 },
            m: 2, f: 5, a: 5, c: 0
        }
    }
}
```

Das Folgeereignis zu `path_deko_zugesagt` ist dann ein ganz normales Ereignis mit
`reqStory` — im selben Bereich mit `kind: "text"` oder in einem beliebigen anderen.

## 6. Begegnungen (`data_reputation.js`)

Begegnungen sind vom Aufbau her normale Ereignisse (Abschnitt 1), mit zwei Besonderheiten:
Sie erscheinen nur ab einem bestimmten Ruf bei einer Figur, deshalb ist `reqRep` hier
**zwingend** — und da es immer um eine bestimmte Figur geht, trägt jede Begegnung im
Bestand auch ein `char`.

Positive Zahl heißt "mindestens", negative heißt "höchstens". So entstehen Freundschafts-
und Feindschafts-Stränge zur selben Figur:

```js
{
    id: "rep_kevin_energy_1",
    char: "Kevin",
    title: "Der stille Tribut",
    reqRep: { "Kevin": 20 },        // Pflicht: erscheint ab Ruf +20 bei Kevin
    text: "Kevin schiebt dir wortlos einen Energydrink über den Tisch. Auf dem Etikett klebt ein Post-it: 'Für den Boss'. Er sagt nichts dazu und schaut auch nicht hoch.",
    opts: [
        {
            t: "'Ehrenmann.'",
            loot: "energy",
            rep: { "Kevin": 5 },
            m: 2, f: 0, a: -5, c: 0,
            r: "Kevin nickt ernst und dreht sich wieder weg. Mehr Worte braucht diese Sache nicht, und beide wissen das."
        },
        {
            t: "Ihm erklären, dass du das Zeug nicht mehr trinkst",
            m: 5, f: 0, a: 0, c: 0,
            r: "Er trinkt ihn selbst. In einem Zug. Du bist gleichzeitig beeindruckt und besorgt, und beides zu Recht."
        }
    ]
},
// Die Feind-Variante: reqRep negativ, hier "höchstens -30":
{
    id: "rep_kevin_maus_1",
    char: "Kevin",
    title: "Der Zeiger",
    reqRep: { "Kevin": -30 },
    text: "Dein Mauszeiger ruckelt über den Bildschirm wie ein Auto mit Standschaden. Unter der Maus klebt ein Post-it, darauf ein Smiley mit Hörnern.",
    opts: [
        {
            t: "Das Post-it kommentarlos entfernen",
            m: 2, f: 0, a: 5, c: 0,
            r: "Du wirfst es weg und sagst nichts. Krieg braucht keine Worte, nur Ausdauer, und davon hast du beruflich reichlich."
        },
        {
            t: "Seine Tastatur auf ein anderes Layout umstellen",
            next: "path_kevin_krieg_2",
            rep: { "Kevin": -5 },
            m: 5, f: -5, a: -5, c: 0,
            r: "Ab jetzt tippt er Fragezeichen, wo Bindestriche hingehören. Er wird eine halbe Stunde brauchen, um es zu merken, und den ganzen Tag, um es zu beheben."
        }
    ]
}
```

Fortsetzungen funktionieren wie überall (`next` → `reqStory`); sie dürfen zusätzlich
wieder ein `reqRep` tragen, müssen aber nicht — mit gesetztem Flag reicht oft die
Geschichte selbst als Voraussetzung.

Begegnungen werden nicht über die Aktionsleiste gezogen: Sie fangen den Spieler mit 10 %
Wahrscheinlichkeit vor einer beliebigen Handlung ab.

## 7. Mittagspause (`data_lunch.js`)

Normale Text-Ereignisse mit `title`, `text` und `opts`, gern mit `char`. Die Pause wird
einmal am Tag zwischen zwölf und vierzehn Uhr ausgelöst. Die Zeiten sind entsprechend
groß — eine Pause kostet typischerweise 30 bis 60 Minuten. Sie darf Gegenstände geben
und den Ruf verändern.

**Mehrtägige Ketten.** `triggerLunch` wertet `reqStory` und `reqStoryAge` aus, mit
derselben `FOLLOWUP_CHANCE` von 30 % wie die Aktions-Pools: Eine
offene Fortsetzung kommt in 30 % der Fälle, sonst wird aus dem Grundbestand gezogen.
`reqRep` wird hier weiterhin nicht ausgewertet.

Das macht die Pause zum natürlichsten Ort für ein „gestern beim Essen" — sie ist das
Einzige, was jeden Tag stattfindet. Wer zehn Kilometer mitläuft, spürt es am nächsten
Mittag. Drei solche Stränge gibt es bisher; der Auftakt setzt die Fahne über `next`,
das Folgeereignis fordert sie mit `reqStoryAge: 1`.

## 8. Bossfights (`data_bossfights.js`)

Der Notfall mit Countdown. Zwei Pflichtfelder mehr:

- `timer`: die Sekunden, die der Balken läuft (im Bestand 8 bis 20, meist 10 oder 12).
- `fail`: was passiert, wenn niemand entscheidet. Aufbau wie eine Auswahl, nur ohne `t`.

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
            m: 10, f: -5, a: 10, c: -10,
            r: "Provisorisch, laut und gegen jede Vorschrift — aber die Temperatur fällt. Der Raum steht offen, und die Sicherheitsabteilung wird das erfahren."
        },
        {
            t: "Die halbe Serverlandschaft geordnet herunterfahren",
            m: 15, f: -10, a: 15, c: 20,
            r: "Du fährst herunter, was nicht lebensnotwendig ist. Die Hardware überlebt, der Vertrieb nicht: Drei Präsentationen enden mitten im Satz."
        }
    ],
    fail: {
        rep: { "Dr. Wichtig": -20 },
        m: 30, f: 0, a: 40, c: 50,
        r: "Bei 47 Grad schalten sich die Server selbst ab, einer nach dem anderen, in der Reihenfolge ihrer Wichtigkeit. Der Rest des Tages besteht aus Telefonaten."
    }
}
```

Regel für die Balance: **Nichtstun muss die schlechteste Wahl sein.** `fail` fährt
schlechter als die schlechteste aktive Entscheidung — sonst ist Warten eine Strategie.
Gemessener Rahmen über alle 38: Auswahlen kosten −30 bis +60 auf `a`+`c`, `fail`
zwischen 50 und 150. In allen 38 ist `fail` teurer als jede Auswahl; das lässt sich mit
einem Dreizeiler nachrechnen und gehört nach jeder neuen Welle geprüft.

**Der Titel nennt die Situation, nicht die Katastrophenart.** Die Ansicht schreibt
ohnehin NOTFALL in Rot mit Countdown-Balken darüber — der Titel muss nicht schreien und
trägt keine Emojis. Also „Das Rohr in der Teeküche" statt „WASSERSCHADEN": Wer nach der
Gattung benennt, bekommt schnell mehrere Notfälle, die praktisch gleich heißen.

**Mindestens ein Ausweg über einen Gegenstand, mindestens einer ohne.** Ein knappes
Viertel der Notfälle kommt ganz ohne `req` aus; das ist die Untergrenze.

Beim Gegenstand zählt die Verfügbarkeit: Ein Werkzeug, das man im Spiel oft findet,
macht die Auswahl für mehr Leute erreichbar. Gute Kandidaten sind `cable` (acht
Fundorte), `screw` (sieben) und `tape` (sechs). `admin_pw` hat nur drei und gehört
deshalb nur dorthin, wo die Handlung wirklich Rechte braucht und nicht bloß Hände —
einen Stecker zieht man ohne Passwort.

**Nachklänge.** Ein Notfall darf eine Folge haben: Die Auswahl setzt über
`next` eine Fahne, und ein Ereignis in einem anderen Pool fordert sie mit `reqStoryAge:
1`. Damit kommt der nächste Morgen einen Tag später — im Tagesmodus also nie, was
richtig ist, denn dort gibt es kein Gestern. Acht der 38 haben so einen Nachklang, einer
davon eine dreiteilige Geschichte mit eigenem Wissens-Eintrag.

Beim Wissens-Eintrag die Erreichbarkeit mitdenken: Ein Notfall wird zwar oft ausgelöst,
aber ein *bestimmter* selten — bei knapp vierzig im Vorrat sieht man ihn nur wenige Male
im Jahr. Ein Eintrag, der mehrere verschiedene Notfälle zitiert, wäre damit praktisch
unerreichbar. Er muss an **einer** Kette hängen.

## 9. Die Firmenfeier (`data_party.js`)

Die Feier ist ein eigener Modus nach Feierabend: kein Postfach, keine Anrufe, keine
normalen Bereiche — nur die Orte. Party-Ereignisse sind normale Text-Ereignisse mit
einem Feld mehr:

- `loc` (**Pflicht**): `"bar"`, `"buffet"`, `"dance"`, `"lounge"` oder `"smoke"`. Beim
  Besuch eines Ortes zieht das Spiel zufällig ein dort noch nicht erlebtes Ereignis.

In den Auswahlen führt `next: "party_hub"` zurück zur Ortsübersicht und zählt den
Abend-Fortschritt hoch — so enden die meisten Party-Auswahlen.

**Die Feier rechnet anders als der Rest des Spiels.** Drei Dinge sind hier anders, und
alle drei folgen daraus, dass Feierabend ist:

- **Keine Minuten.** Die Uhr wird nicht durch `m` vorgerückt, sondern aus dem
  Fortschritt berechnet: zwölf Stationen zu je einer halben Stunde tragen von 17:00 bis
  23:00. Jede Station kostet dasselbe, egal was man tut.
- **Kein Chef-Radar.** Nach Feierabend beobachtet niemand mehr, wie viel du arbeitest.
  Benutzt werden nur `f` und `a` — Faulheit und Aggro, weil beide auch privat
  weiterlaufen.
- **Kein Ende.** `checkEndConditions()` steigt im Partymodus sofort aus: Man kann auf
  der Feier weder ausrasten noch gefeuert werden. Der Abend endet ausschließlich über
  eines der `party_finale_*`-Ereignisse.

`m` und `c` meldet der Linter als Fehler — die Engine würde beide verarbeiten, wirkungslos,
und ein Wert, der still nichts tut, ist schlimmer als einer, der laut scheitert. `rep`,
`loot`, `req` und `rem` bleiben erlaubt, kommen aber in keiner der 137 bestehenden
Auswahlen vor. Der Normalfall ist: `f`, `a` und `next`. Nach genug Stationen löst
der Abend eines der Finale aus; die `party_finale_*`-Ereignisse sind fest verdrahtet und
brauchen keine Beiträge.

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
            f: 10, a: 10,
            r: "Eine halbe Stunde später kennst du drei Schlagworte mehr und einen Menschen weniger, dem du freiwillig zuhörst."
        },
        {
            t: "'Ich hole nur schnell etwas zu trinken.'",
            next: "party_hub",
            f: 0, a: -5,
            r: "Der älteste Trick des Abends. Er funktioniert, weil er immer funktioniert, und weil das Sofa schon den Nächsten hat."
        }
    ]
}
```

## 10. E-Mails (`data_emails.js`)

Die Mail selbst hat eigene Feldnamen: `sender`, `subj` (der Betreff — "Re:", "WG:" und
dringliche Phishing-Betreffs sind ausdrücklich erwünscht, das ist Mail-Realismus) und
`body` als Mailtext. Die Auswahlen sind gebaut wie überall sonst, mit `t` und `r`.

Was hier **nicht** funktioniert: `req` und `rem`. Eine Mail kann Gegenstände geben
(`loot`), aber keine verlangen oder verbrauchen. `char` gibt es ebenfalls nicht, das
Postfach zeigt nur den Absender.

Drei Konventionen:

- Gibt es eine Lösch-Auswahl, heißt sie `"Löschen & Ignorieren"`, trägt
  `ignoreEmail: true` und steht als **letzte** Option. Beides prüft der Daten-Prüfer.
- Folgemails laufen über `nextEmail: "mail_x_2"` statt über Story-Flags. Die Folgemail
  bekommt `linked: true` — dann wird sie nie zufällig zugestellt, sondern nur über die
  Kette.
- Der Ergebnistext `r` landet im Protokoll, bei einer beantworteten Mail mit "Re: "
  davor. Er liest sich deshalb am besten als knappe Zeile, nicht als Absatz.

Zum Rhythmus: Mails treffen nur nach einer Handlung ein (Serverraum, Kaffee, Dienstgang,
Anruf), frühestens 25 Spielminuten nach der letzten, und nie während eines Bossfights
oder der Mittagspause. Zum Lesen und Entscheiden bleiben 20 Sekunden, danach gilt die
Mail als ignoriert.

```js
{
    id: "mail_gewinnspiel_1",
    sender: "Lotterie International",
    subj: "Dringend: Ihr Gewinn verfällt HEUTE!",
    body: "Sehr geehrter Gewinner,\n\nSie haben 2.000.000 Euro gewonnen. Zur Auszahlung benötigen wir lediglich eine Bearbeitungsgebühr von 49,99 Euro.",
    opts: [
        {
            t: "'Ziehen Sie die Gebühr doch einfach vom Gewinn ab.'",
            m: 2, f: 0, a: 0, c: 0,
            r: "Antwort verschickt, Verhandlung eröffnet.",
            nextEmail: "mail_gewinnspiel_2"
        },
        {
            t: "Löschen & Ignorieren",
            m: 2, f: 0, a: 0, c: 0,
            r: "Zwei Millionen ärmer, eine Illusion reicher.",
            ignoreEmail: true
        }
    ]
},
{
    id: "mail_gewinnspiel_2",
    sender: "Lotterie International",
    linked: true,                     // kommt nur über die Kette, nie zufällig
    subj: "Re: Ihr Gewinn - NEUE Konditionen!",
    body: "Guter Verhandler! Neue Gebühr: nur noch 29,99 Euro. Letztes Angebot!",
    opts: [
        {
            t: "'19,99 und wir sind im Geschäft.'",
            m: 3, f: 0, a: -5, c: 0,
            r: "Du feilschst mit Betrügern. Und du liegst vorn."
        },
        {
            t: "Löschen & Ignorieren",
            m: 2, f: 0, a: 0, c: 0,
            r: "Der Spuk ist vorbei.",
            ignoreEmail: true
        }
    ]
}
```

---

## Prüfen vor dem Pull Request

Zum Schluss den Daten-Prüfer laufen lassen:

```
npm run lint:data
```

Er findet die typischen Fehler automatisch: doppelte Kennungen, Tippfehler in Gegenstands-
und Figurennamen (`req`/`rem`/`loot`/`rep`/`char`), unbekannte Felder (ein `ep` statt
`rep` würde sonst stillschweigend verpuffen), Story-Flags, die gesetzt aber nie gebraucht
werden oder umgekehrt, Sackgassen und unerreichbare Knoten in Gesprächen, Ereignisse, die
sich komplett sperren können, Verstöße gegen die Zahlenregeln, eine Lösch-Auswahl ohne
`ignoreEmail` oder an falscher Position, Quest-Trophäen als `req`/`rem`, Zeitbezüge in
Folgeereignissen und unsichtbare Sonderzeichen, die sich beim Kopieren einschleichen.
Erst wenn er "Daten sind sauber" meldet, ist der Beitrag technisch rund.

Bei Balance-Änderungen zusätzlich:

```
npm run sim
```

Und wer mag, liest `node tools/report-prose.mjs <bereich>` (z. B. `… coffee`): ein
Stilbericht über Wiederholungen und Formulierungs-Muster — Lesestoff zur Orientierung,
keine Fehlerliste. Neue Formulierungen vorher gegen den Bestand prüfen, damit keine neuen
Dubletten entstehen.

Ein Ereignis gezielt zum Testen starten (Browser-Konsole, `window.engine` ist global):

```js
engine.state.storyFlags.path_kabel_gezogen = true;
engine.state.usedIDs.delete("srv_kabel_2");
const _p = engine.pickFromPool;
engine.pickFromPool = p => (engine.pickFromPool = _p, p.find(e => e.id === "srv_kabel_2"));
engine.trigger("server");   // "coffee", "calls" oder "sidequest" für die anderen Bereiche
```
