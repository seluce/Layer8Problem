/**
 * Every item in the game.
 *
 * `use` decides whether an item can be used at all - no use block, no button,
 * no dialog. It carries what using it costs, what the confirmation dialog says
 * and what lands in the log, because all of that is text and numbers rather
 * than logic. Until 4.1 the same knowledge sat in four places: a keep flag
 * here, a CONSUMABLES list in two components, and two if-chains in
 * engine_inventory.js. A new snack meant editing five spots.
 *
 *   use.al / use.fl   how far aggro and laziness drop (negative numbers)
 *   use.desc          the line above the confirm button
 *   use.warn          the small print below it
 *   use.log           what the log says afterwards
 *   use.color         Tailwind class for that log line
 *   use.cooldown      minutes before it works again; only for items with
 *                     keep: true, which are not consumed by using them
 *
 * keep: true means the item survives being used. Everything else with a `use`
 * block disappears from the backpack.
 */
export const items = {
	
    // CONSUMABLES (single use)
    "wifi_note": { icon: "🏷️", name: "WLAN-Zettel", flavor: "'Das Passwort lautet: 1234abcd. Bitte nicht weitergeben.' - Egon. Wahrscheinlich klebt eine Kopie davon direkt am Router im Pausenraum.", img: "assets/img/items/wifi_note.webp" },
    "donut": { icon: "🍩", name: "Alter Donut", flavor: "'Er ist hart wie Stein, aber Zucker bleibt Zucker. Ein zäher Überlebenskünstler vom letzten Management-Meeting vor drei Wochen.'", img: "assets/img/items/donut.webp",
        use: { al: -15,
               desc: "Senkt AGGRO um -15. Seelentröster aus Teig.",
               warn: "Einmaliger Genuss (Hüftgold bleibt für immer). Der Donut ist danach weg.",
               log:  "Mmmh... Zuckerglasur. Die Wut schmilzt dahin. (Aggro -15)",
               color: "text-pink-400" } },
    "energy": { icon: "⚡", name: "Energy Drink", flavor: "'Schmeckt nach Gummibärchen und drohender Panikattacke. Nach dem Konsum kannst du Farben hören und die Zeit verlangsamt sich spürbar.'", img: "assets/img/items/energy.webp",
        use: { fl: -15,
               desc: "Senkt FAULHEIT um -15. Flüssiges Herzrasen.",
               warn: "Ex und hopp! Die Dose ist danach leer. Kein Pfand, keine Rückgabe.",
               log:  "ZISCH! Du ext den Energy Drink. Dein Herz rast, aber du bist hellwach. (Faulheit -15)",
               color: "text-blue-400" } },
    "secret_list": { icon: "📁", name: "Schwarze Liste", flavor: "'Wer auf dieser Liste steht, kann schon mal Kartons packen. Pures, unzensiertes Gold, für das HR töten würde.'", img: "assets/img/items/secret_list.webp" },
    "arg_list_1": { icon: "📋", name: "Argumente (Ich)", flavor: "'1000 Tickets gelöst. 0 Dankbarkeit. Das ändert sich heute. Mit diesen Fakten bist du bereit, das Büro des Chefs in Schutt und Asche zu legen.'", img: "assets/img/items/arg_list_1.webp" }, 
    "arg_list_2": { icon: "📑", name: "Argumente (Kevin)", flavor: "'Gefahrenzulage für IT-Azubis? Ein schlechter Scherz! Dieser Zettel beweist schwarz auf weiß, dass Kevin fürs Minecraft-Spielen fürstlich entlohnt wird.'", img: "assets/img/items/arg_list_2.webp" },
    "bubble_wrap": { icon: "🫧", name: "Luftpolsterfolie", flavor: "'Jedes *Plopp* ist ein stummgeschalteter User in deiner Fantasie. Die mit Abstand billigste und effektivste Therapie für leidgeprüfte Administratoren.'", img: "assets/img/items/bubble_wrap.webp",
        use: { al: -10,
               desc: "Senkt AGGRO um -10. Sehr befriedigend.",
               warn: "Einweg-Therapie! Wenn alle Blasen geplatzt sind, ist der Spaß vorbei.",
               log:  "*Plopp* *Plopp* *Plopp*. Das ist besser als Therapie. (Aggro -10)",
               color: "text-cyan-400" } },
    "sandwich": { icon: "🥪", name: "Belegtes Brötchen", flavor: "'Käse, Remoulade und die salzigen Tränen des Vertriebs. Skrupellos aus dem Kühlschrank entwendet, schmeckt es wunderbar nach Anarchie.'", img: "assets/img/items/sandwich.webp",
        use: { al: -10, fl: -5,
               desc: "Senkt AGGRO um -10 und FAULHEIT um -5. Ein solides Handwerker-Frühstück.",
               warn: "Mit viel Remoulade! Einmalig konsumierbar.",
               log:  "Eine dicke Scheibe Käse und Remoulade. Das erdet. (Aggro -10, Faulheit -5)",
               color: "text-yellow-400" } },
    "chocolate": { icon: "🍫", name: "Tafel Schokolade", flavor: "'Pures, quadratisches Glück auf Kakaobasis. Heimlich vor der gierigen Buchhaltung gerettet, ist sie der einzige Lichtblick am Montag.'", img: "assets/img/items/chocolate.webp",
        use: { al: -20,
               desc: "Senkt AGGRO um -20. Quadratisch, praktisch, weg.",
               warn: "Du hast sie dir verdient. Verschwindet nach dem Essen aus dem Inventar.",
               log:  "Die Schokolade schmilzt auf der Zunge. Für einen kurzen Moment hasst du niemanden. (Aggro -20)",
               color: "text-amber-500" } },
        
    // TOOLS (permanent -> keep: true)
    "admin_pw": { icon: "🔑", name: "Root-Passwort", flavor: "'Mit großer Macht kommt... ein Haufen Verantwortung (und Ärger). Ein falscher Klick und die Kundendatenbank ist Geschichte.'", keep: true, img: "assets/img/items/admin_pw.webp" },
    "cable": { icon: "〰️", name: "LAN-Kabel", flavor: "'Cat7. Hält Daten und wackelige Racks verlässlich zusammen. Im absoluten Notfall auch hervorragend als Peitsche gegen aufmüpfige User einsetzbar.'", keep: true, img: "assets/img/items/cable.webp" },
    "tape": { icon: "🩹", name: "Panzertape", flavor: "'Die stärkste bekannte Kraft im Universum ist graues Klebeband. Repariert gebrochene Server, undichte Rohre und zwingt Kollegen zum Schweigen.'", keep: true, img: "assets/img/items/tape.webp" },
    "screw": { icon: "🪛", name: "Schraubendreher", flavor: "'Hochwertiger Kreuzschlitz. Auch zur Selbstverteidigung geeignet. Dein treuester Begleiter in den dunklen Eingeweiden uralter Hardware.'", keep: true, img: "assets/img/items/screw.webp" },
    "stressball": { icon: "🔴", name: "Anti-Stressball", flavor: "'Wird so oft gequetscht, dass er leise um Hilfe wimmert. Trägt bereits die permanenten Abdrücke deiner Finger als stummer Therapeut.'", keep: true, img: "assets/img/items/stressball.webp",
        use: { al: -5, cooldown: 60,
               desc: "Senkt AGGRO sofort um -5 Punkte. *Quietsch*",
               warn: "Material-Ermüdung! Nach dem Kneten ist der Ball für 60 Minuten platt und nutzlos.",
               log:  "Du knetest den Ball aggressiv. *Quietsch*. Das hilft. (Aggro -5)",
               color: "text-green-400" } },
    "manual": { icon: "📖", name: "Win95 Handbuch", flavor: "'Das heilige Buch der Vorväter. Eignet sich auch als Monitor-Stütze. Die Seiten kleben zusammen, aber das Wissen darin ist absolut zeitlos.'", keep: true, img: "assets/img/items/manual.webp" },
    "usb_stick": { icon: "💾", name: "Boot-Stick", flavor: "'Ein 64GB Stick, voll mit Skripten, Viren und Katzen-Memes. Dein digitales Schweizer Taschenmesser, um jedes zickige System zu zähmen.'", keep: true, img: "assets/img/items/usb_stick.webp" },
    "fire_ext": { icon: "🧯", name: "Feuerlöscher", flavor: "'CO2. Kalt, laut und extrem effektiv gegen rauchende Hardware. Auch bestens geeignet, um brennende Konflikte im Flur radikal abzukühlen.'", keep: true, img: "assets/img/items/fire_ext.webp" },
    "hammer": { icon: "🔨", name: "Hammer", flavor: "'Ein 500g Meinungsverstärker. Löst Hardware-Probleme sofort. Perkussive Wartung ist manchmal die einzige Sprache, die Drucker verstehen.'", keep: true, img: "assets/img/items/hammer.webp" },
    "zip_ties": { icon: "➰", name: "Kabelbinder", flavor: "'Schwarzes Plastik. Die unzerstörbaren Handschellen der IT. Zähmen den wildesten Kabelsalat und halten die Infrastruktur wortwörtlich zusammen.'", keep: true, img: "assets/img/items/zip_ties.webp" },
    "headphones": { icon: "🎧", name: "NC-Kopfhörer", flavor: "'Wenn du sie aufsetzt, existiert der Rest der Welt nicht mehr. Das ultimative Schutzschild gegen den Lärm der Marketingabteilung und Jürgens Monologe.'", keep: true, img: "assets/img/items/headphones.webp" },
    "black_card": { icon: "💳", name: "Schwarze Amex", flavor: "'Eigentum von Prinz Abubakar. Das Limit ist eine reine Illusion. Du könntest damit eine kleine Insel kaufen, aber heute reicht es wohl auch für Pizza.'", keep: true, img: "assets/img/items/black_card.webp" },

    // QUEST ITEMS
    "kevin_ram": { icon: "📟", name: "Kevins Glücks-RAM", flavor: "'Ein alter DDR3-Riegel. Kevin schwört, er macht den PC schneller. In Wahrheit ist er komplett durchgebrannt, genau wie die Synapsen des Azubis.'", keep: true, quest: true, img: "assets/img/items/kevin_ram.webp" },
    "golden_stapler": { icon: "✨", name: "Goldener Tacker", flavor: "'Schwer, protzig und völlig nutzlos. Wie das Marketing selbst. Eine erbeutete Trophäe, die an Chantals Tränen beim letzten Budget-Krieg erinnert.'", keep: true, quest: true, img: "assets/img/items/golden_stapler.webp" },
    "mixtape": { icon: "🤘", name: "Death Metal Tape", flavor: "'Seite A: Burn the Server. Seite B: User Error (Die). Der perfekte, knallharte Soundtrack für deinen täglichen Abstieg in den Corporate-Wahnsinn.'", keep: true, quest: true, img: "assets/img/items/mixtape.webp" },
    "cat_pic": { icon: "🐱", name: "Foto von Rüdiger", flavor: "'Ein flauschiger Kater mit dem psychopathischen Blick eines Killers. Der unangefochtene Liebling von Frau Elster und dein ultimativer Freifahrtschein.'", keep: true, quest: true, img: "assets/img/items/cat_pic.webp" },
    "master_key": { icon: "🗝️", name: "Generalschlüssel", flavor: "'Egons Meisterstück. Du hast die absolute Macht über das Gebäude. Keine Tür bleibt dir verschlossen, kein Geheimversteck ist mehr sicher vor dir.'", keep: true, quest: true, img: "assets/img/items/master_key.webp" },
    "scotch_bottle": { icon: "🥃", name: "30-jähriger Scotch", flavor: "'Riecht nach Torf, Eiche und einem exorbitant hohen Bonus. Das edle Getränk ist die einzige Möglichkeit, den Nachmittag schadlos zu überstehen.'", keep: true, quest: true, img: "assets/img/items/scotch_bottle.webp" },
    "contract": { icon: "📜", name: "Neuer Arbeitsvertrag", flavor: "'20% mehr Gehalt und der Parkplatz am Eingang. Schwarz auf weiß. Das Papier ist noch feucht von den bitteren Tränen, die der CEO vergossen hat.'", keep: true, quest: true, img: "assets/img/items/contract.webp" },
    "corp_chronicles": { icon: "📕", name: "Die Firmenchronik", flavor: "'Tradition seit 1899. Lächeln während der Arbeitszeit verboten. Ein Relikt aus einer Zeit, als die IT noch mit Dampf betrieben und Ausbeutung großgeschrieben wurde.'", keep: true, quest: true, img: "assets/img/items/corp_chronicles.webp" },
    "prince_letter": { icon: "💌", name: "Brief vom Prinzen", flavor: "'Ich werde meinen Erstgeborenen \"Müller\" nennen. In Liebe, der Prinz. Ein royales Dokument, das beweist, dass du mächtiger bist als der Vorstand.'", keep: true, quest: true, img: "assets/img/items/prince_letter.webp" },

};
