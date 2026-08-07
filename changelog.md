[4.1.0] - 2026-08-07

Ein Pflege-Update: dieselben Ereignisse, dieselben Folgen - aber besser
erzählt, einheitlich beschriftet und von einer Reihe alter Macken befreit.

Ereignisse & Texte:
* Sämtliche Ereignisse wurden redaktionell überarbeitet, in mehreren Durchgängen: erst gegen Kargheit und wörtliche Wiederholung, dann gegen den Erzähler, der seine Pointen erklärt. Schlusssätze wie "Du hast gewonnen, aber du bist ein Monster" sind gestrichen oder durch eine Reaktion ersetzt - das Urteil fällt wieder der Spieler. Optionen und Auswirkungen sind unverändert.
* Das Tagebuch am Feierabend erzählt vom Tag statt von den Erfolgen: ob es früh brannte oder erst nach zwei kippte, wie viele Tassen es gebraucht hat, wer heute anders über einen denkt als heute Morgen. Zuletzt benutzte Sätze werden übersprungen - Wiederholungen sind selten geworden.
* Auftakte und Formulierungen klingen nicht mehr nach Schablone: Baukasten-Sätze wie "plötzlich", "Du hast X, aber Y" oder "Du fühlst dich ..." stehen nur noch dort, wo sie eine Figur oder eine Pointe tragen.

Anzeige & Layout:
* Die Auswahl-Buttons verraten nicht mehr vorab, was eine Option bedeutet. Beschriftungen im Etiketten-Stil ("Lüge: ...", "Auflegen (Angst)", "Tech-Lösung: ...") sind auf das umgestellt, was Müller tut oder sagt.
* Im Rucksack öffnen sich die Gegenstands-Beschreibungen jetzt auch per Fingertipp - wichtig am Handy und auf dem Steam Deck. Ein Tipp zeigt, ein zweiter benutzt.
* Bilder stehen beim Öffnen sofort da: Porträts, Gegenstände und Trophäen werden beim Start vorgeladen.
* Im Messenger sind die Handlungs-Knöpfe kürzer ("[Chat stummschalten]" statt "[System: Chat stummschalten]"), und Chats mit bekannten Figuren zeigen ihr Porträt statt der Initiale - in Gruppen-Chats sogar pro Nachricht.
* Die Erzähltexte stehen nicht mehr in Anführungszeichen. Die Hülle behauptete einen Sprecher, den es nicht gibt; wörtliche Rede ist ohnehin im Text markiert.

Fehlerkorrekturen:
* Die geleakte Kündigungsliste lässt sich jetzt wie jede andere Mail löschen und ignorieren.
* Im Gruppen-Chat der Kollegen wirkt die Ruf-Strafe fürs Ignorieren der Lästerei jetzt wie vorgesehen.
* Die Tastenbelegung zeigt zuverlässig, welche Taste schon vergeben oder reserviert ist.
* Die Ausrede wird pro Ereignis gezogen statt bei jedem Öffnen des Fensters - der Vorrat ließ sich vorher folgenlos durchblättern.
* Anruf-Knopf und Ticket-Zähler warnen jetzt bei derselben Zahl: ab acht.
* Im Archiv schimmerte hinter freigestellten Gegenständen das Symbol durch, und im Rucksack ragten die Beschreibungen auf schmalen Bildschirmen über den Rand. Beides behoben.
* Das Tagebuch verschluckt keine Begegnungen mehr, wenn ein Tag mehrere hergab.
* "Auf Standard zurücksetzen" aktualisiert jetzt auch die sichtbaren Schalter.
* Escape war eine Hintertür an Entscheidungen vorbei: Über der Weiterspielen-Frage, der Tageswahl und offenen Mails öffnete es das Menü darüber - ein Klick konnte dort den angebotenen Tag verwerfen. Geschlossen.
* Das "…"-Abzeichen an Antworten verspricht nur noch dann ein Weiterreden, wenn tatsächlich ein Gesprächsknoten folgt.
* Spielstand exportieren und importieren funktioniert wieder, über das Startfenster wie über die Einstellungen.
* Am Handy scrollte die Seite hinter gestapelten Fenstern, sobald das obere geschlossen wurde.
* Drei Mittags-Optionen verbrauchten ihren Gegenstand nicht (Energy Drink in der Sonne, Donut essen beziehungsweise verschenken). Jetzt kostet der Konsum, was der Text behauptet.
* Schreib-, Grammatik- und Logikfehler in diversen Ereignissen behoben, darunter ein vermischtes Sprichwort und zweimal das falsche Geschlecht der Fremdscham.

Für Entwickler:
* Der Daten-Prüfer (npm run lint:data) kennt fünf neue Regeln, darunter unbekannte Felder je Kontext: Ein req in einer Mail ist jetzt ein Fehler statt ein stiller Blindgänger. Die Regeln fanden zwei Altlasten, darunter die verschluckte Ruf-Wirkung oben.
* Die Beschriftung einer Antwort heißt in allen Datendateien t; im Postfach hieß dasselbe Feld historisch btn.
* Phone-Ereignisse werten char auch pro Knoten aus - für Gruppen-Chats; char: null erzwingt die Initiale.
* Der Prosa-Bericht (tools/report-prose.mjs) hat drei Abschnitte mehr: Alt-Register in Beschriftungen (auch zusammengesetzte Präfixe wie "Tech-Lösung:"), Schablonen in Auftakten und eine Frequenz-Zählung wiederkehrender Formulierungsmuster - Letztere bewusst als Leseliste und Vorher-nachher-Messung, nicht als Fehlerliste.
* Einstellungen und Tastenbelegung sind eigenständige Komponenten; kein Bedienelement wird mehr beim Öffnen von außen befüllt.
* Overlays laufen alle über dieselben drei Funktionen (showOverlay, hideOverlay, isOverlayOpen), die Bildlauf-Sperre über eine Menge benannter Halter - beides beendet je eine Klasse stiller Fehler, darunter einen reproduzierbaren Datenverlust-Pfad.
* Was ein Gegenstand bewirkt, steht komplett beim Gegenstand (use-Block in data_items.js) statt an fünf Stellen. Alle 30 Gegenstände verhalten sich unverändert, nachgemessen.
* PROGRESS_KEYS in keys.js ist jetzt tatsächlich die Liste, nach der gelöscht wird.


[4.0.0] - 2026-08-03

Die größte Aktualisierung, die dieses Spiel je bekommen hat. Unter der
Oberfläche wurde die gesamte Grundlage erneuert, darüber sind über 165 neue
Ereignisse dazugekommen. Wer zuletzt Version 3.2.2 gespielt hat, findet ein
anderes Spiel vor.

Neuerungen:
* Über 165 neue Ereignisse in allen fünf Bereichen des Arbeitstags: 41 im Serverraum (wo sich jetzt auch Chantal, Markus, Gabi und Dr. Wichtig verirren - bislang gehörte der Raum Kevin und Egon allein), 21 an der Kaffeemaschine, 27 auf dem Dienstgang und 17 im Postfach. Darunter die ENTKALKEN-Krise samt Kevins Instant-Schwarzmarkt, Dr. Wichtig vor zwei Knöpfen ("Machen Sie mir das, was ich immer trinke"), das Rätsel um "Projekt Phoenix", Kevins vier Sprachnachrichten (4:32 Minuten, Inhalt: der Bildschirm ist "komisch") und die Abwesenheitsnotiz-Endlosschleife mit 14 Mails pro Minute. Frau Elster schreibt zum ersten Mal überhaupt.
* Das Telefon war bisher die häufigste Handlung mit den wenigsten Folgen. Das ist vorbei: Der Anrufpool ist um mehr als ein Drittel gewachsen, und jeder zweite Anruf kann dich später einholen. Neu unter anderem die Kollegin, deren Kamera schwarz bleibt (der bequemste Weg endet damit, dass der Kunde ihren gesamten Bildschirm sieht), und ein Serientermin ohne Organisator, der seit vier Jahren bei 17 Personen im Kalender steht - wer ihn löscht, schickt am Dienstag vier Leute in einen leeren Raum.
* Entscheidungen bleiben nicht mehr am Telefon: 12 Anrufe wirken an einem anderen Ort weiter. Der Rechner, den Kevin nach deiner Anweisung neu aufgesetzt hat, steht später im Serverraum im Rack - verkabelt, mit Drachenaufkleber und einem Programm, das Rechenleistung nach Übersee verkauft. Das Passwort, das du am Telefon durchgegeben hast, klebt beim nächsten Dienstgang am Monitor. Und wer Gabi hat auflaufen lassen, findet in der Teeküche eine Schublade, die es vorher nicht gab.
* Auch alte Bekannte haben jetzt ein Gedächtnis, und je nach Entscheidung ein anderes: Wer Kevin zum Formatieren zwingt, bekommt einen Rechner mit einem Betriebssystem unklarer Herkunft zurück - wer ihm hilft, bekommt seine Mutter mit einem Laptop an den Empfang. Wer Chantals Erpressung kontert, bekommt eine Aussprache; wer einknickt, hat am Nachmittag den halben Vertrieb am Telefon, weil sich herumgesprochen hat, dass die IT freischaltet, wenn man höflich fragt.
* Rund 20 Nebenaufgaben, die bisher nur in der Steam-Fassung enthalten waren, stehen jetzt auch im Browser zur Verfügung. Beide Fassungen laufen ab sofort auf demselben Stand.
* Ein unterbrochener Arbeitstag ist nicht mehr verloren. Das Spiel sichert nach jedem Ereignis; wer den Browser schließt oder abstürzt, wird beim nächsten Start gefragt, ob er weiterarbeiten möchte - mit Wochentag, Uhrzeit und offenen Tickets als Gedächtnisstütze.
* Der Endbildschirm wurde neu gebaut. Er hebt in der Bilanz den Wert hervor, an dem der Tag zerbrochen ist, und bietet zwei Dinge zum Aufklappen: den Tagesverlauf als Kurve - man sieht endlich, dass der Ausraster um kurz vor zwei schon um halb elf angelegt war - und das persönliche Logbuch als beschriebenes Blatt Papier.
* Die Team-Übersicht zeigt, was der Tag bewegt hat: neben jedem Kollegen die Veränderung seit heute Morgen, unter dem Balken der Abstand zur nächsten Stufe. Der absolute Wert allein sagt schließlich nicht, ob man gerade etwas richtig macht.
* Das Archiv zählt nicht mehr nur vier Zahlen: Serie überstandener Tage samt Rekord, drei Balken für Freitag, Mittwoch und Montag einzeln - wer zehn Freitage überlebt hat, aber keinen Montag, sieht genau das - und eine Fußzeile mit Ventil-Rettungen und Abmahnungen.
* Gegenstände verraten jetzt, ob sie den Einsatz überleben: wiederverwendbar, verbraucht sich oder Trophäe. Bislang erfuhr man das erst, wenn etwas weg war.
* Wer einen Arbeitstag von der ersten Minute an im Blindflug übersteht - ohne Prozentwerte, ohne Ticketzähler -, findet im Logbuch einen Nachtrag dazu. Wer die Zahlen erst mittags ausblendet, bekommt ihn nicht.
* Eine Ereignisreihe zieht sich durch drei Bereiche des Hauses und beginnt völlig harmlos. Beim zweiten Mal wundert man sich, beim dritten Mal bleiben nur noch Antworten übrig, die man besser nicht laut sagt.
* Die Firmenchronik hat leere Seiten am Ende, und niemand hat Müller verboten, etwas zu ergänzen: ein handschriftlicher Satz pro Arbeitstag, der sich danach richtet, was ihm widerfahren ist. Wer schon mehrfach das Gebäude verlassen hat, ohne sich zu verabschieden, schreibt anders als jemand in seiner ersten Woche. Die Einträge bleiben im Archiv stehen.
* Das Schwarze Brett hängt nicht mehr fest: 29 Zettel statt 6, jeder Arbeitstag bekommt seine eigene Auswahl - von der Tippgemeinschaft, die seit elf Jahren nicht gewinnt, bis zum Ficus namens Hubert, der einen Paten sucht. 8 Aushänge hängen nur dort, wenn du sie verursacht hast: Wer den Kaffee mit Essig entkalkt hat, findet die Beschwerde der zweiten Etage.
* Das Firmen-Intranet weiß, wer du bist. Der "Mitarbeiter des Monats" geht an den Kollegen, der am meisten von dir hält - und wird nicht vergeben, wenn niemand die Schwelle erreicht. Der Company Feed meldet in bestem Unternehmensdeutsch, was du heute angerichtet hast: dieselben Vorfälle, die am Schwarzen Brett ehrlich kommentiert werden, hier als Prozess oder Erfolg. Dazu eine Wall of Deals, die gerettete und geplatzte Abschlüsse kennt, ein Impressum, dessen Fassungsnummer mit jedem Arbeitstag steigt, ohne dass je jemand erfahren hätte, was geändert wurde - und eine Kennzahl des Tages, die deinen Ticketbestand als betriebswirtschaftliche Abweichung ausweist. Kein Besuch sieht aus wie der vorherige.
* Hinter dem Login der Personalabteilung liegt eine zweite Personalakte. Es ist deine. Sie führt Abmahnungen, unentschuldigte Abgänge und ein Gehalt, das nicht steigt - je besser dein Ruf im Haus, desto ausdrücklicher begründet die Personalabteilung, warum eine Anpassung nicht erforderlich ist. Das Passwort ist dasselbe wie beim ersten Konto, denn GlobalCorp vergibt nur eines. Es steht im Nachrichtenticker und in einer neuen E-Mail, mit der die Personalentwicklung es versehentlich an die IT schickt, weil du ja ohnehin den ganzen Tag mit Computern arbeitest.
* Zwei Kleinigkeiten für Leute, die genau hinsehen: Einmal pro Arbeitstag passiert um Punkt 13:37 Uhr etwas im Protokoll. Und wer die Entwicklerkonsole öffnet, wird dort von H.A.L.G.E.R.D. persönlich begrüßt.

Spielbalance:
* Der Mittwoch hat angezogen: Statuswirkungen fallen auf dem normalen Schwierigkeitsgrad um zehn Prozent kräftiger aus. Eine eigens gebaute Tages-Simulation zeigte, dass ein aufmerksamer Spieler ihn fast risikofrei überstand. Freitag und Montag bleiben unverändert.
* 15 neue Ereignisse sind Fallen: Situationen, in denen die Antwort, die vernünftig klingt, nicht die ist, die vernünftig ist. Ein kritisches Zwei-Minuten-Update, eine aufgehaltene Tür, herrenloser Kuchen im Flur. 8 davon lassen den Bildschirm wackeln - wer in den Köder tritt, merkt es sofort.
* Der Morgen entscheidet mehr als bisher: Neben Ärger, Chef-Aufmerksamkeit und Verschlafen gibt es Tickets, die über Nacht aufgelaufen sind, ein gestrichenes Ausreden-Kontingent - und eine Ausrede extra, wenn das Haus ausnahmsweise für dich spielt. 18 neue Morgentexte, und die Werte richten sich nach dem Wochentag: Freitag verzeiht, Montag nicht.
* 3 neue Mittagspausen, zwei davon mit doppeltem Boden: ein kostenloses Buffet, gesponsert ausgerechnet von dem Dienstleister, der die interne IT ablösen will, und eine Kochvorführung an der falschen Steckdose.
* Die Katastrophen sind unnachgiebiger: Wer den Countdown verstreichen lässt, fährt bei allen 30 schlechter als mit der schlechtesten aktiven Entscheidung - bislang war Nichtstun in vier Fällen die bequemere Wahl. Notlösungen ohne passendes Werkzeug kosten dort mehr, wo die Folgen offensichtlich waren: Ein Vorstands-Livestream in 240p bleibt eben ein blamierter Vorstand.
* Zeit absitzen ohne Konsequenz gibt es nicht mehr. Keine Aktion dauert unter zwei Minuten (knapp 190 Antworten waren fast umsonst), lange Aktionen haben durchgehend Folgen, 10 zeitraubende Antworten im Altbestand blieben bisher folgenlos, und vier Antworten drehten die Uhr sogar zurück.

Anzeige & Layout:
* Die Reihenfolge der Antwortmöglichkeiten ist neu verteilt. Bisher stand in über der Hälfte aller Ereignisse die günstigste Antwort ganz oben - wer das bemerkte, klickte fortan die erste Zeile, und die Entscheidung fand nicht mehr statt. Jetzt liegt die beste Wahl gleich verteilt auf allen Plätzen. Abbrechen, Ignorieren, Auflegen und Löschen bleiben dort, wo man sie sucht: ganz unten.
* Das Terminal ist keine schwarze Leere mehr: ein Hauch Röhrenmonitor mit feinen Scanlines und schwachem Glimmen aus der Bildmitte. Alles statisch, nichts flackert, und abschaltbar. Terminal und Statusleiste liegen jetzt auf zwei Ebenen, damit der Blick dorthin geht, wo etwas passiert.
* Die abgerundeten Ecken sind deutlich schärfer. Die bisherigen 8 bis 12 Pixel waren zeitgemäßes Web-Design und passten nicht zu einer Firmensoftware, die seit den Neunzigern kein Update gesehen hat.
* Das Terminal wechselt seine Farbe mit der Art des Ereignisses - blau beim Anruf, rot im Notfall, gelb bei einer Begegnung. Die Ergebnis-Anzeige ist das Geschwister der Ereignis-Karte statt eines schwebenden grauen Kastens.
* Die Tastatur-Hinweise sehen aus wie kleine Tastenkappen statt wie graue Kästchen und fahren beim Drücken sichtbar in den Sockel. An allen vier Orten identisch - Aktionsleiste, Antworten, Handy und Postfach hatten bisher leicht andere.
* Der Anruf-Knopf sieht aus wie die drei anderen. Bislang war er dauerhaft hervorgehoben und damit die naheliegende Wahl - dabei geht es gerade darum, die Mischung selbst zu finden. Die Hervorhebung erscheint erst, wenn die Tickets kritisch werden.
* Antwortmöglichkeiten zeigen an, wenn sie einen Gegenstand verbrauchen, und zwar solange sie noch wählbar sind. Gesperrte melden einheitlich "Fehlt: <Gegenstand>".
* Die Ergebnistexte enthalten keine technischen Hinweise mehr wie "(Inventar +1)". Das doppelte nur, was ohnehin sichtbar ist; 86 Stellen bereinigt.
* Der Nachrichtenticker läuft gleichmäßig schnell. Bislang brauchte jede Meldung dieselben 30 Sekunden, unabhängig von ihrer Länge - die längsten waren kaum lesbar. Schrift etwas größer und nicht mehr durchgehend in Großbuchstaben.
* Modale, Ereignis-Karten und die Startsequenz blenden weich ein statt hart aufzuspringen; Erfolgs-Meldungen blenden sauber aus.

Einstellungen:
* Aufgeräumt: Warn-Pulsieren, Kamera-Wackeln und Handy-Tempo standen unter "Gameplay & Komfort", obwohl sie reine Anzeigesachen sind. Die beiden Verbergen-Optionen haben einen eigenen Abschnitt "Herausforderung" bekommen, denn sie sind kein Komfort, sondern ein Schwierigkeitsgrad.
* Neu: Textgröße in drei Stufen, ein Schalter für die Bildschirm-Textur, die Tageskurve im Endbildschirm gleich geöffnet - und ein Knopf, der alle Einstellungen zurücksetzt. Der laufende Arbeitstag geht dabei nicht verloren.
* Die Inventarplätze lassen sich jetzt auch mit der Tastatur bedienen, und die Bestätigen-Taste funktioniert auch im Tutorial-Auswahlfenster beim Spielstart.

Fehlerkorrekturen:
* Bei 38 Ereignissen fehlte das Bild des Kollegen, um den es ging - Kevins Sprachnachrichten, Egons Groll, Gabis Panik und der Chefsessel zeigten eine leere Karte. Vier Ereignisse wirken jetzt auf das Verhältnis zu dem Kollegen, um den es die ganze Zeit ging, und in einem Fall bekam der Falsche die Anerkennung.
 16 Ereignisse teilten sich versehentlich eine Kennung mit einem anderen. Da pro Tag jede Kennung nur einmal vorkommt, sperrten sich diese Paare gegenseitig aus - erreichbar war immer nur die Hälfte. Betroffen: die Ketten um Toilette, Kuchen, Feueralarm, Drucker und Bürostuhl.
* 5 Ereignisse waren gar nicht erreichbar, weil ihre Voraussetzung nirgends erfüllt werden konnte: die Gerüchteküche um die alte Liste, Egons Mülltrennung, Kevins Petition, die Bowl-Lieferung und Kevins RGB-Idee.
* Das Party-Ende "INSIDER" ließ sich nicht abschließen: Der Ergebnistext enthält wörtliche Rede, wodurch die Schaltfläche technisch unbrauchbar wurde. Sonderzeichen können jetzt generell keine Schaltfläche mehr lahmlegen.
* Ruf-Änderungen aus Telefonketten wurden nie angewendet. 37 Gesprächsausgänge sahen eine Auswirkung auf das Verhältnis zu einem Kollegen vor, die schlicht verlorenging.
* Sieben Antwortmöglichkeiten versprachen Gegenstände, die es nicht gibt oder deren Name falsch geschrieben war - das Paket von Gabi, der Kaffee für die Pflanze, die gebunkerte Tonerkartusche. Der heiße Kaffee für Gabi war dauerhaft gesperrt, und beim Brandschutz blieb der Feuerlöscher trotz "Löscher abgeben & flüchten" im Rucksack.
* Zwei E-Mails trugen denselben Betreff und blockierten sich gegenseitig. Das Postfach unterscheidet Mails jetzt an ihrer Kennung statt am Betreff.
* Das Ereignis "Materialermüdung" hat eine dritte Antwort ohne Gegenstand bekommen. Wer den Stressball weggeworfen hatte und kein Panzertape besaß, saß sonst vor zwei gesperrten Antworten fest.
* Beim Serverraum-Ereignis um die alte Liste blieb "Nichts anfassen und gehen" ohne Folgen. Kevin findet die Liste jetzt stattdessen selbst.
* "Spielstand löschen" setzt nun auch das Tutorial zurück, und der Tutorial-Fortschritt wird beim Export und Import tatsächlich übertragen. Beim Abgleich mit der Steam Cloud wird er nur noch freigeschaltet und nie mehr zurückgesetzt.
* Der Ticket-Zähler wurde auf kleinen Bildschirmen größer dargestellt als die Uhrzeit daneben; im Ruhebildschirm passte sich die Schrift nach der ersten Rückkehr nicht mehr an die Breite an.
* Der Zeitbalken eines Notfalls begann beim zweiten Vorfall nicht wieder bei voll, sondern mit dem Rest des vorherigen. Während der Synergy-Gala konnte weiterhin eine Büro-Nachricht im Ticker erscheinen.
* 10 Ergebnistexte waren nur Stichworte ("Maximaler Stress.", "Du rennst los.") und benannten einen Zustand, statt die Szene zu zeigen.
* In einem Privatanruf standen Formatierungszeichen mitten im Text. Im Fehlerbericht war die Inventarliste unbrauchbar, und der Schwierigkeitsgrad wurde immer als "Normal" gemeldet.

System & Stabilität:
* Das Spiel startet deutlich schneller. Bisher wurden sämtliche Ereignistexte beim Aufruf der Seite geladen, auch die des Party-Finales, das die meisten nie sehen. Nun lädt zunächst nur das Nötigste, der Rest kommt im Hintergrund nach - die Datenmenge beim Start sinkt um rund 92 Prozent. Auch die Musikstücke laden erst, wenn sie gespielt werden.
* Die Schriftart wird als WOFF2 ausgeliefert statt als TTF: 41 statt 540 Kilobyte. Die Erfolgs-Bilder liegen nun als WebP vor.
* Tritt ein unerwarteter Fehler auf, wird die Bedienung automatisch wieder freigegeben, statt den Tag einzufrieren. Zuvor half nur ein Neuladen - womit der gesamte Arbeitstag verloren war.
* Beim Neustart eines Tages blieben einzelne Zustände aus dem vorherigen Durchlauf erhalten: Eine offene Handy-Nachricht oder ein angefangenes Gespräch tauchte mitten am neuen Vormittag wieder auf. Auch abgelaufene Zeitgeber wurden nicht gelöst, was dazu führen konnte, dass für den Rest des Tages keine E-Mails mehr eintrafen.
* Das Aktivitätsprotokoll wird beim Anhängen nicht mehr vollständig neu aufgebaut. Bei langen Arbeitstagen führte das zu Verzögerungen, unterbrach Animationen und hob Textmarkierungen auf. Zusätzlich ist es auf die letzten 50 Einträge begrenzt.
* Browser- und Desktop-Fassung teilen sich dieselbe Startseite. Menüpunkte blenden sich selbstständig ein oder aus: Vollbild, "Spiel beenden" und die globalen Statistiken nur in der Steam-Fassung, der Verweis auf die Projektseite nur im Browser. Wer über Steam gekauft hat, bekommt keine Kaufaufforderung mehr.

Für Entwickler:
* Umstieg auf Vite mit Svelte 5. Die Oberfläche besteht aus 34 Komponenten statt aus zusammengesetzten HTML-Zeichenketten; rund 1.200 Zeilen Anzeige-Code sind entfallen, darunter buildEventHTML (228 Zeilen), openArchive (231) und renderGlobalStats (158).
* Der Spielzustand ist reaktiv ($state in engine_state.svelte.js). Die Engine verändert ihn wie zuvor, die Anzeige folgt von selbst.
* Tailwind CSS 4 statt der Vorgängerversion. Am Aussehen ändert das nichts, die Grundlage ist wieder aktuell.
* Die sieben Intranet-Seiten sind Komponenten statt eigenständiger HTML-Dateien in einem iframe. Die alte Konstruktion brauchte eine handkopierte Tailwind-Ausgabe für ein Dokument, das der Bundler nie zu sehen bekam - veraltete diese Kopie, wurden die Seiten roh dargestellt. Jetzt teilen sie sich den Build des Spiels, und der Compiler prüft sie mit.
* Der Build landet in docs/, weil GitHub Pages direkt aus dem Branch ausliefert (main + /docs). Der Build wird mitcommittet; Electron-Loader und Paketierung ziehen ebenfalls auf docs/.
* Neue Plattform-Schicht (platform.js / platform_steam.js): Cloud-Speicher, Erfolge, Statistiken, Status in der Freundesliste, Vollbild und externe Links laufen über eine gemeinsame Schnittstelle. Die Engine kennt Electron und Steam nicht mehr direkt.
* Die Engine wurde entflochten. checkEndConditions (176 Zeilen mit zwei wortgleichen Duplikaten und zwanzig Textblöcken mitten in der Ablauflogik) besteht jetzt aus einer 46-zeiligen Weiche und fünf benannten Funktionen. Für Gegenstände, Ruf-Änderungen und den Tagesbeginn gibt es je eine gemeinsame Funktion statt zwei bis drei fast gleicher Fassungen - eine davon hatte eine Regel nicht gekannt.
* Sämtliche localStorage-Schlüssel wohnen in keys.js, das Zustand, Oberfläche und Audio gemeinsam importieren. Zuvor lagen sie als nackte Zeichenketten über mehrere Dateien verstreut - exakt die Fehlerklasse, die den Tutorial-Merker aus dem Tritt gebracht hatte.
* Neue Fabrikfunktion freshDay() liefert den kompletten Tageszustand; der Tagesneustart ersetzt ihn in einem Schritt statt rund 45 Felder einzeln zurückzusetzen. Ein neues Feld kann nicht mehr vergessen werden - dieselbe Quelle bestimmt auch, was in den Zwischenstand gesichert wird.
* Weitere Wiederholungen zusammengefasst: Das Öffnen und Schließen von Vollbild-Fenstern stand an 33 Stellen als je drei Zeilen - wo eine die Bildlauf-Sperre vergaß, scrollte die Seite hinter dem Dialog weiter. Die Regel, wie oft ein Folge-Ereignis Vorrang bekommt, lag dreifach im Code und steht jetzt als benannte Konstante da; an dieser Zahl hängt das Erzähltempo eines ganzen Arbeitstags.
* Die Antwortmöglichkeiten werden nicht mehr als Text in die Seite geschrieben. Die action-Einträge in data_party.js sind strukturierte Objekte statt ausführbarer Zeichenketten; aufgelöst wird über eine Methodensuche, nicht über eval.
* Die Mittagspause ist ein eigener Ereignis-Pool (data_lunch.js) statt einer Eigenschaft in data_special.js. Mit 44 Einträgen ist sie so groß wie ein halber Kaffee-Pool und lädt jetzt wie alle anderen erst bei Bedarf. Nebeneffekt: Sie durchläuft erstmals den Daten-Prüfer, der prompt vier fast folgenlose Antworten von bis zu dreißig Minuten fand.
* Jedes Dienstgang-Ereignis deklariert seine Art (kind: text oder phone); bislang fehlte die Angabe bei 63 Ereignissen.
* Neues Prüfwerkzeug tools/lint-data.mjs (npm run lint:data): doppelte Kennungen, kaputte Gegenstandsverweise, unerreichbare Dialogzweige, tote Story-Verzweigungen, Ereignisse mit ausschließlich gegenstandspflichtigen Antworten, Verstöße gegen die Balancing-Grundregeln, reqStory an Brett und Intranet, Auszeichnungen in reinen Textfeldern und Zeitbezüge in Folge-Ereignissen. Alles Fehler, die im Spiel niemandem auffallen, sondern nur dazu führen, dass etwas nie erscheint.
* Neues Werkzeug tools/simulate-day.mjs (npm run sim): spielt komplette Arbeitstage gegen die echten Datenpools mit den exakten Engine-Formeln durch - vier Spielertypen, drei Schwierigkeiten. Die Balance-Änderungen dieser Version sind damit gegengerechnet statt geraten.
* Zwei Einmal-Werkzeuge, beide wiederholbar: tools/reorder-opts.mjs verteilt die Optionsreihenfolge, tools/normalize-quotes.mjs vereinheitlicht die Anführungszeichen in Quelltext und Spieltext.
* STRUCTURE.md beschreibt den Aufbau des Projekts und die Konventionen für die Datendateien.


[3.2.2] - 2026-04-08

Neuerungen:
* Ab sofort gibt es im Spiel die Möglichkeit, sich mit einer kreativen Notfall-Ausrede temporär aus anstrengenden Problemen und Konversationen herauszuziehen.

System & Stabilität:
* Die Dateistruktur der Spieldaten wurden auf einen modernen Standard (Module) umgestellt. Das verbessert die Ladezeiten, macht das Spiel performanter und bereitet die Architektur auf zukünftige, größere Inhalts-Updates vor.

Fehlerkorrekturen:
* Ein Anzeigefehler bei den "Löschen & Ignorieren"-Buttons im E-Mail-System wurde behoben, durch den das Papierkorb-Icon doppelt gerendert wurde.
* Der Wechsel des Musikstils wird nun auch dann korrekt im Hintergrund verarbeitet und beim nächsten Einschalten angewendet, wenn die Musik zum Zeitpunkt des Wechsels pausiert war.

[3.2.1] - 2026-04-04

Neuerungen:
* E-Mails haben nun einen Ingame-Cooldown von 25 Minuten, um ständiges Dauerfeuer zu vermeiden. Zudem verbrauchen Antworten nun dynamisch Ingame-Zeit und können Items (Loot) gewähren.

Anzeige & Layout:
* Neu erbeutete Items "fliegen" nun mit einer kurzen Animation in den Rucksack, damit Trophäen im Inventar besser wahrgenommen werden.

Fehlerkorrekturen:
* Ein Fehler im Radio-Modus (Hintergrundmusik) wurde behoben, durch den die automatische Wiedergabe des nächsten Titels im Leerlauf abbrach.
* Ein Darstellungsfehler wurde behoben, durch den der "Löschen & Ignorieren"-Button bei aktiven Hotkey-Overlays manchmal nicht gerendert wurde.
* Das E-Mail-System wurde von harten Code-Abhängigkeiten befreit. Dadurch entstehen keine doppelten "Löschen"-Optionen mehr.
* Weitere kleine Fehlerkorrekturen im Hintergrund, Behebung von Tippfehlern und Textanpassungen.

[3.2.0] - 2026-03-28

Neuerungen:
* Der neue Radio-Modus spielt verschiedene Tracks (inklusive neuer Lofi- und Jazz-Beats) abwechselnd ab. Alternativ lässt sich jeder Track auch weiterhin einzeln auf Dauerschleife stellen.
* Ein Rage Quit bei 100% Aggro beendet das Spiel nicht mehr sofort. Beim ersten Ausraster zieht sich Müller nun kurz zurück, um Dampf abzulassen.
* Die Warnungen für das Chef-Radar und das neue Aggro-Ventil sind nicht mehr statisch. Es gibt nun jeweils 10 wechselnde Varianten, die per Zufall abgespielt werden.

Anzeige & Layout:
* Wurde das Aggro-Ventil genutzt oder eine Abmahnung kassiert, wird dies nun am Ende des Tages als Warn-Badge auf dem Tagesbericht und im persönlichen Logbuch verewigt.
* Das End-Modal passt sich nun optisch mit eigenen Akzentfarben dem jeweiligen Ausgang des Tages an (Feierabend, Rage Quit, Kündigung).

Balancing & Fehlerkorrekturen:
* Die Dauer des Timers beim Lesen von E-Mails wurde von 15 auf 20 Sekunden erhöht, um unnötige Hektik bei einer eingehenden E-Mail zu nehmen.
* Offene Tickets werden bei der Endabrechnung nur noch bis 16:30 Uhr gezählt. Späte Ereignisse generieren keine Tickets mehr nach Schichtende.
* Nach einem Bosskampf läuft die dramatische Musik im Tagesbericht nicht mehr unpassend weiter, sondern wechselt nahtlos zurück zur normalen Büromusik.
* Materialermüdung: Der Anti-Stressball verliert etwas an Wirkung und senkt die Aggro nun stündlich um 5 Punkte (zuvor 10).
* Weitere kleine Fehlerkorrekturen im Hintergrund, Behebung von Tippfehlern und Textanpassungen.

[3.1.0] - 2026-03-26

Neuerungen:
* Beim manuellen "Tag neu starten" gibt es nun eine atmosphärische Boot-Sequenz inklusive klassischem PC-Beep, die das System spürbar hochfährt
* Items können in Smartphone-Events nun auch direkt bei der Antwortauswahl als Voraussetzung gefordert oder verbraucht werden 
* Kassiert man eine Abmahnung vom Chef, prangt nun ein unübersehbarer roter Stempel auf der eigenen Profilkarte im Team-Modal
* Eine geführte, interaktive Simulation bringt neuen SysAdmins die Überlebensgrundlagen bei GlobalCorp nun im Tutorial bei
* Der GlobalCorp News-Ticker informiert am Terminal nun sporadisch über firmeninterne Neuigkeiten
* Das Firmen-Intranet wurde um eine versteckte, streng vertrauliche HR-Akte erweitert

System & Stabilität:
* Das Speichersystem (Export und Import) wurde massiv gehärtet und ist nun zukunftssicher
* Veraltete Spielinhalte werden beim Laden älterer Speicherstände nun automatisch bereinigt

Fehlerkorrekturen:
* Ein kritischer Absturz-Fehler beim Importieren von älteren Speicherständen wurde behoben

[3.0.0] - 2026-03-23

Neuerungen:
* Das Browserspiel hat keine externen Abhängigkeiten mehr (Tailwind CDN, Google Fonts, Grafiken lokal eingebunden)
* Offline-Modus ist nun möglich, wenn das gesamte Projekt heruntergeladen wird
* Die Spieleinstellungen wurden überarbeitet und bieten jetzt mehr Sound- und Tastatur-Einstellungen
* Drei verschiedene Arten von Musik hinzugefügt (Allgemein, Bossfights und für die Gala)
* Das Start-Modal wurde optisch überarbeitet, sieht nun moderner aus und zeigt das Logo des Spiels
* Alle Erfolge haben jetzt eine eigene Grafik und bieten auf dem Rechner einen starken Hover-Effekt
* Die Charakter-Porträts werden bei charakterbezogenen Events jetzt visuell im Terminal dargestellt
* Die Items bieten im Rucksack nun ein detailliertes Tooltip-Fenster mit Flavor-Texten beim Hovern
* Automatische Sortierung von Items im Schnell-Inventar und Rucksack (Verbrauchsgegenstände bleiben griffbereit)
* Verbrauchsgegenstände (wie z. B. Donuts oder Energy Drinks) können nun mehrfach gesammelt und im Inventar gehalten werden
* Eine neue, geheime Intranet-Seite wurde hinzugefügt und wartet darauf, entdeckt zu werden
* Das Mittagessen hat nun ein eigenes Icon und einen eigenen farblichen Rahmen
* Einige weitere Events wurden für die verschiedenen Aktionen hinzugefügt

Fehlerkorrekturen:
* Ein Fehler wurde behoben, durch den die Luftpolsterfolie (bubble_wrap) nicht eingesetzt werden konnte
* E-Mail Performance-Probleme wurden behoben (Ruckeln und träges Verhalten der auswählbaren Optionen)
* Story-Flags (Folgeentscheidungen) werden bei "Tag neu starten" jetzt korrekt zurückgesetzt
* Eintreffende E-Mails werden während eines Bossfights nun zuverlässig blockiert (falsches Timer-Verhalten behoben)
* Ein Anzeige-Fehler wurde behoben, bei dem im Tagesbericht noch Erfolge aus einem vorherigen, abgebrochenen Spieldurchlauf aufgelistet wurden
* Ein kritischer Fehler wurde behoben, der das Spiel einfrieren ließ, wenn kurz vor Feierabend (und gleichzeitigem Start der Gala) eine E-Mail oder ein Anruf beendet wurde
* Ein Exploit beim Morgen-Ereignis "Verschlafen" wurde behoben, sodass der Zeitverlust von 30 Minuten nun ordnungsgemäß mit einem Support-Ticket bestraft wird
* Ein Fehler wurde behoben, bei dem sich E-Mail-Fenster fälschlicherweise mitten in der Synergy-Gala öffnen konnten, da Hintergrund-Timer nicht korrekt gestoppt wurden
* Ein Fehler wurde behoben, bei dem unsichtbare Hintergrund-Timer weiterliefen, was dazu führen konnte, dass Ereignisse während des Game-Over-Bildschirms ausgelöst wurden
* Ein Fehler wurde behoben, bei dem verzögerte Folge-E-Mails nach einem Neustart ("Tag neu starten") fälschlicherweise im neuen Spieldurchlauf auftauchen konnten
* Ein Fehler wurde behoben, bei dem unsichtbare Hintergrund-Timer des Handys nach einem Abbruch weiterliefen und im neuen Tag versehentlich Aktionen auslösten
* Ein Logikfehler von Items wurde behoben. Wenn das Inventar voll war, konnten Items verloren gehen, selbst wenn im selben Schritt Items verloren hat
* Ein Logikfehler im E-Mail-Spamfilter wurde korrigiert, der nach einem Neustart des Tages versehentlich legitime Nachrichten blockieren konnte
* Ein Logikfehler wurde behoben, bei dem Gegenstände, die man über das Handy erhalten hat, das reguläre Inventar-Limit ignorieren konnten
* E-Mail-Ketten werden nicht mehr durch zufällige Mails unterbrochen und es gibt einen kurzen Cooldown nach dem Schließen des Fensters
* Ein kritischer Fehler wurde behoben, der dafür sorgte, dass der Party-Modus nach einem Neustart aktiv blieb und das Spiel blockierte
* Ein Fehler wurde behoben, durch den Items mit Abklingzeit (z. B. der Stressball) nach einem Neustart dauerhaft gesperrt bleiben konnten
* Ein Fehler beim "Tag neu starten" wurde korrigiert, sodass die Abmahnung vom Chef nun ordnungsgemäß zurückgesetzt wird
* Weitere, kleine Fehlerkorrekturen und strukturelle Anpassungen im Backend

\[2.8.1] - 2026-02-29
* Folge-Events bei Begegnungen haben nun auch eine höhere Priorisierung (30%), wenn vorhanden
* Kritischer Bugfix bei Begegnungen-Events, welche nicht immer Folge-Events zuverlässig ausgelöst haben
* Kompaktmodus merkt sich jetzt den aktivierten Zustand (zu finden in den Systemeinstellungen)

\[2.8.0] - 2026-02-29
* Folge-Events haben eine höhere Priorisierung (30%) im Pool, wenn diese freigeschaltet sind
* Neue Events für Bossfights, Mittagessen, Kaffee, Dienstgang, Serverraum und Anruf 
* Spieleinstellungen "Handy aut. minimieren" ist nun standardmäßig auf aktiv gesetzt
* Phone-Events Werte werden nun in der data.js einheitlich definiert (anstatt fl,al,cr nun f,a,c)
* Kleine Korrekturen von einigen Events, die gemeldet wurden sind

\[2.7.0] - 2026-02-27
* Die große Firmenfeier startet, nachdem alle Character-Events erfolgreich gesammelt wurden sind
* Internet-Archivment wurde durch das neue Synergy-Veteran Archivment ersetzt
* Das Menü bietet jetzt weitere Spieleinstellungen zum Anpassen (Komptaktlayout und Handy minimieren)
* Scroll-Chaining im aktiven Modal (z.b Intro, Teams, Menü, etc.) wurde behoben
* Das Ergebnis beim Endergebnis wird jetzt in der richtigen Farbe dargestellt 
* Alle Events mit 0 Minuten Optionen wurden auf 2 Minuten angehoben
* Kleine weitere Fehlerkorrekturen für Events und im Backend

\[2.6.0] - 2026-02-24
* Das Menü bietet jetzt weitere Spieleinstellungen zum Anpassen
* Standardmäßg sind Pulsieren von Aggro / Wut und die Wiedergabe von Tönen aktiv
* Die Darstellung der Kartine wurde für mobile Geräte optimiert

\[2.5.2] - 2026-02-22
* Das letzte Mood-Event wird nun gespeichert, sodass es nächsten Tag nicht nochmal erscheint
* Weitere Mood-Events, um mehr Abwechslung bei den Events zu erhalten
* Weitere Tagebuch-Einträge, um mehr Abwechslung beim Tagebuch zu erhalten
* Ein paar weitere Events für Kaffee, Dienstgang, Serverraum und Mittagessen
* Kleine Fehlerkorrekturen im Backend

\[2.5.1] - 2026-02-21
* Im aktiven Tutorial sind nun die Aktion Buttons nicht mehr deaktiviert 
* Globale Statistiken sind von Menü ins Archiv umgezogen
* Globale Statistiken sammelt nun auch begonnene Tage 
* Leicht angepasstest Layout fürs Archiv

\[2.5.0] - 2026-02-21
* Es gibt jetzt ein globales Menü und es lässt sich via ESC öffnen / schließen
* Es gibt nun ein Stimmungs-Modal, was die Stimmung von Herrn Müller zu Tagesbeginn erläutert
* Zwei neue Verbrauchsgegenstände wurden ins Spiel integriert, welche man bisher zufällig erhalten kann
* Beim Bestätigungs-Modal für Verbrauchsgegenstände wird nun das korrekte Bild geladen
* Bei Events sind nun Absätze (\n) möglich, wie es bereits für einige Calls Events existierte
* Einige neue Call-Events wurden hinzugefügt, um den Pool für Calls zu erweitern
* Der Blur-Effekt greift nun zusätzlich für den Geburtstagskuchen, wenn man es zulässt

\[2.4.1] - 2026-02-20
* Kritischer Bugfix für Phone Events, wodurch nun StoryFlags (Next/ReqStory) korrekt angewendet werden
* Spenden-Event Link öffnet sich nun korrekt im neuen Fenster

\[2.4.0] - 2026-02-20
* Rep-Events (Begegnungen) haben nun auch Filler-Standalone-Events, damit sich jeder Charakter lebendiger anfühlt
* Viele Phone-Events wurden vom Text her überarbeitet, damit es sich mehr wie ein richtiger Chat anfühlt
* Ruf-System greift nun auch bei Phone Events, wenn es im jeweiligen Event für ein Character vergeben wird
* Ein paar Phone-Events wurden durch neue ersetzt, inklusive entsprechender Folge-Events
* Eine Sidequest fürs Spenden wurde eingeführt und sich nahtlos ins Spiel integriert (es gibt kein Vorteil bei diesem Event)

\[2.3.3] - 2026-02-19
* Events mit viel Text oder Optionen sind jetzt bei erhöhter Skalierung oder mit niedriger Auflösung am Desktop lesbar
* Log-Beschreibung bei Reputations-Events (Begegnungen) sind nun einheitlich zum restlichen Log

\[2.3.2] - 2026-02-19
* E-Mails treten nicht mehr während eines Bossfight auf (Vermeidung von zwei gleichzeitigen Timer)
* Bossfights werden jetzt erst ab 9:00 ausgelöst, um den Tag ruhiger zu starten
* Aktive Events haben nun den Titel wie die ausgewählte Aktion (Kaffee, Dienstgang, Serverraum, Anruf)
* Rep-Events (Begegnungen) haben nun standardmäßig das Buch als Icon
* Schwierigkeits-Modal lässt sich nun auf mobilen Geräten wie das Start-Modal korrekt bedienen 
* Einige Altasten und Korrekturen im Backend (engine.js) durchgeführt
 
\[2.3.1] - 2026-02-18
* Bugfix für Events, wenn Minuten nicht gesetzt waren (Spiel meldete NaN als Fehler)
* Es wurde immer ein Fail bei Bossfight ausgelöst, auch wenn eine Option gewählt wurde
* Korrektur einiger Events, wo die Minuten gefehlt haben oder im falschen Format waren 

\[2.3.0] - 2026-02-18
* Bossfights Timer wurde nun in das Event eingebaut, damit es ein einheitliches Design hat
* Verschiedene Fehlerkorrekturen für den Bossfight (Dauer der Animation und Logik wann Bossfights auftreten)
* Es gibt nun Reputations-Events, welche sich bei positiver / negativer Reputation auswirkt
* Story-Events der Charactere wurden nach Reputation verschoben und angepasst (2teiler anstatt 3)
* Neue Events für Kaffee und für Side-Quest, die im normalen Pool mit vorkommen können
* Kleine optische Event-Anpassungen, wo der Rand nun passend zum Event gefärbt wird
* Kleine Fehlerkorrekturen im Code, welche im Backend aufgetreten sind

\[2.2.0] - 2026-02-16
* Ruf-System wurde eingeführt (findet man über "TEAM") für Koffee, Side-Quest Server und Calls
* Ein kleiner Schluck bei Bernd zeigt, dass man nicht auf der Arbeit trinken sollte (Easter-Egg)
* Gemeldete Fehler für Statuswerte wurden korrigiert (danke fürs Feedback!)

\[2.1.0] - 2026-02-14

* Das Sammelbuch (Archiv) lässt sich nun über das Start-Modal exportieren und importieren
* Manche Optionen waren in den verschiedenen Events nicht auswählbar, was nun korrigiert wurde
* Kleine Rechtschreibfehler bei verschiedenene Events wurden korrigiert
* Kleine Optische Anpassungen am Start Modal, um es optisch etwas aufzuwerten

\[2.0.0] - 2026-02-13

* Server, Coffee und Side-Quests haben jetzt bei beinahe allen Events Folge-Events. Jede Entscheidung wird neue Events erzeugen!
* Es gibt nun die Option Gegenstände wieder abzugeben, wenn diese im Inventar sind (remove item)
* Zeiten werden nicht mehr vorher dargestellt, damit jede Entscheidung wohlüberlegt sein sollte

\[1.5.0] - 2026-02-12

* Es gibt jetzt ein kleines Tagesbuch, was den Arbeitstag am Endergebnis zusammenfasst
* Ein neues (Secret)-Event (Easter-Egg) wurde in den Pool hinzugefügt

\[1.4.0] - 2026-02-11

* Die Animation für das Verändern der Statuswerte werden nun flüssiger dargestellt
* Bei Statusveränderungen gib es nun ergänzend schwebende Zahlen bei den Statuswerten
* Im jeweiligen Event-Ergebnis werden nun die Statuswerte dargestellt
* Ein neues (Secret)-Event (Easter-Egg) wurde in den Pool hinzugefügt
* Ein neuer Erfolg zum Entdecken wurde hinzugefügt

\[1.3.1] - 2026-02-10

* Die Personen im Kollegium / Team haben ein Zoom im Desktop Modus
* Zwei bestehende Events wurden aufgebohrt, um das Item Cable mehr ins Spiel zu bringen

\[1.3.0] - 2026-02-09

* Das Kollegium / Team hat nun Bilder für die jeweilige Person
* Gegenstände haben nun ein richtiges Bild für das Inventar und Archiv
* Questreihen der jeweiligen Character haben nun ein Buch als Icon
* Fehlerkorrekturen für Phone-Events, wo sich die Statuswerte nicht aktualisiert haben
* Einige Events hatten wifi\_note als Anforderung, was nun entfernt wurde

\[1.2.0] - 2026-02-07

* Melden Funktion eingebaut, um Kontakt mit mir aufzunehmen (Fehler, Feedbacks, Allgemeines)
* Kleine Korrekturen bei verschiedenen Events, um das Balancing anzupassen.

\[1.1.2] - 2026-02-05

* Einige E-Mails hatten keine ID, wo durch sie häufiger als einmalig kommen konnten.
* Einige neue Folgeevents für verschiedene Bereiche
* Duplikate wurden bereinigt

\[1.1.1] - 2026-02-05

* Ein Event war in der falschen Kategorie zugewiesen, was behoben wurde
* Einige neue Folgeevents für Serverraum und Sidequests (Phone)

\[1.1.0] - 2026-02-05

* E-Mails wurden überarbeitet (neues Design, neue Logik, mobiloptimiert)
* Erfolge sind nun sichtbar und haben ein Hinweis zur Freischaltung
* Das Ergebnis des Messengers wird jetzt automatisch korrekt dargestellt
* Korrekturen im Backend und Altlasten wurden bereinigt

\[1.0.2] - 2026-02-04

* Schnell-Inventar und Rucksack sind optisch identisch
* Im Sammelbuch (Erfolge) sind noch offene Items und Erfolge besser erkennbar
* Die Breite und Höhe der Events sind für mobile Geräte besser optimiert
* Die neuen Anrufe enthalten nun alle relevanten Gesprächsinformation zu Beginn
* Bei Side-Quests und Serverraum wurden die Icons korrigiert, welche im Event sichtbar waren.

\[1.0.1] - 2026-02-03

* Kleinen Übersetzungsfehler korrigiert
* Buttongröße für die Antworten im Terminal und Chat wurden optimiert

\[1.0.0] - 2026-02-03

* Neues Chat- \& Entscheidungs-Layout für alle Aktionen
* Neue Telefonart wurde zusätzlich hinzugefügt ( Live-Telefonate)
* Dynamische Quests wurden eingeführt, wo durch manche Events von Entscheidungen abhängig sind
* Character-Missionen für die wichtigen Personen wurde hinzugefügt (Die Verdächtigen)
* Archiv \& Sammelbuch wurde hinzugefügt und speichert diese im LocalStorage
* Legendäre Trophäen und neue Items wurde hinzugefügt
