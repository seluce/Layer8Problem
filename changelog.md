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
