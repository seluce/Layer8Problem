/**
 * Vereinheitlicht die Anführungszeichen in den Datendateien.
 *
 * Neun von zehn Datendateien schreiben Zeichenketten mit doppelten
 * Anführungszeichen, data_party.js und data_intranet.js mit einfachen. Das ist
 * kein Schönheitsfehler: Werkzeuge, die die Dateien als Text durchsuchen -
 * etwa die einmalige Umsortierung der Antwortmöglichkeiten - übersehen eine
 * abweichend formatierte Datei stillschweigend und melden keinen Fehler,
 * sondern gar nichts. Genau das ist passiert.
 *
 * Gearbeitet wird über den Parser, nicht über Suchen-und-Ersetzen: Nur echte
 * Zeichenketten-Literale werden angefasst, und der Inhalt bleibt Zeichen für
 * Zeichen erhalten. Ein Apostroph im Text verliert seine Maskierung, ein
 * doppeltes Anführungszeichen bekommt eine.
 */
import { readFileSync, writeFileSync } from 'fs';
import * as acorn from 'acorn';

const DATEIEN = process.argv.slice(2);
if (!DATEIEN.length) {
    console.error('Aufruf: node quotes-normalisieren.mjs <datei…>');
    process.exit(1);
}

/** Sammelt alle Knoten eines Typs, ohne den Baum vorher zu kennen. */
function knotenSammeln(baum, typ, treffer = []) {
    if (!baum || typeof baum !== 'object') return treffer;
    if (Array.isArray(baum)) { baum.forEach(k => knotenSammeln(k, typ, treffer)); return treffer; }
    if (baum.type === typ) treffer.push(baum);
    for (const [schluessel, wert] of Object.entries(baum)) {
        if (schluessel === 'type' || schluessel === 'start' || schluessel === 'end') continue;
        knotenSammeln(wert, typ, treffer);
    }
    return treffer;
}

/** Gibt den Wert als doppelt gequotetes Literal aus. JSON.stringify macht
 *  genau das Richtige: es maskiert ", \ und Steuerzeichen und lässt
 *  Apostrophe und Umlaute in Ruhe. */
const alsDoppelt = (wert) => JSON.stringify(wert);

for (const datei of DATEIEN) {
    const text = readFileSync(datei, 'utf-8');
    const baum = acorn.parse(text, { ecmaVersion: 'latest', sourceType: 'module' });

    const literale = knotenSammeln(baum, 'Literal')
        .filter(k => typeof k.value === 'string' && text[k.start] === "'")
        .sort((a, b) => b.start - a.start);   // von hinten, sonst verschieben sich die Positionen

    let neu = text;
    for (const k of literale) {
        neu = neu.slice(0, k.start) + alsDoppelt(k.value) + neu.slice(k.end);
    }

    // Gegenprobe: der Baum muss danach dieselben Zeichenketten enthalten.
    const baumNeu = acorn.parse(neu, { ecmaVersion: 'latest', sourceType: 'module' });
    const vorher = knotenSammeln(baum, 'Literal').map(k => k.value);
    const nachher = knotenSammeln(baumNeu, 'Literal').map(k => k.value);
    if (JSON.stringify(vorher) !== JSON.stringify(nachher)) {
        console.error(`${datei}: Inhalt hat sich verändert — nicht geschrieben`);
        continue;
    }

    writeFileSync(datei, neu);
    console.log(`${datei.padEnd(22)} ${literale.length} Literale auf doppelte Anführungszeichen umgestellt`);
}
