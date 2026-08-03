/**
 * Einmalige Umsortierung der Antwortmöglichkeiten.
 *
 * In 53% aller Ereignisse mit drei oder mehr Optionen stand die günstigste
 * ganz oben. Bei drei Optionen wären 33% zufällig. Wer das einmal bemerkt,
 * klickt fortan reflexhaft die erste Zeile, und die Entscheidung, um die es
 * eigentlich geht, findet nicht mehr statt.
 *
 * Nicht zufällig gemischt, sondern gleichmäßig verteilt: Je Gruppengröße
 * wandert die günstigste Option reihum auf Platz 1, 2, 3, 4. Das Ergebnis ist
 * deterministisch - zweimal laufen lassen ändert nichts mehr - und die
 * Reihenfolge der übrigen Optionen bleibt untereinander erhalten, weil die
 * Liste rotiert und nicht gewürfelt wird. Eine Eskalation von zurückhaltend
 * nach drastisch überlebt das.
 *
 * Nicht angefasst:
 *   - data_tutorial.js: das Tutorial zeigt auf bestimmte Schaltflächen
 *   - Optionen mit action/checkPool: das ist die Stationswahl der Gala,
 *     dort wäre eine wandernde Reihenfolge sinnlos
 *   - Knoten-Optionen in Ketten: das sind Rückfragen, keine Kostenentscheidung
 *   - Abbruch-Optionen: "Ignorieren", "Auflegen", "Löschen & Ignorieren" und
 *     Verwandte bleiben unten angenagelt. Der Spieler sucht sie dort, und bei
 *     E-Mails ist es seit jeher die letzte Zeile.
 */
import { readFileSync, writeFileSync } from 'fs';

const DATEIEN = [
    'data_calls.js', 'data_server.js', 'data_coffee.js', 'data_sidequests.js',
    'data_reputation.js', 'data_emails.js', 'data_lunch.js', 'data_bossfights.js',
    'data_party.js'
];

// Was unten bleibt. Bewusst am Anfang des Textes verankert, damit
// "Ignorieren" trifft, aber "Ignorieren ist keine Option" nicht.
/** Die Pools benennen die Beschriftung unterschiedlich: Ereignisse nutzen t,
 *  E-Mails btn. Wer nur eines liest, behandelt eine ganze Datei blind. */
const beschriftung = (o) => o.t ?? o.btn ?? '';

const ABBRUCH = /^\s*\[?\s*(System:\s*)?(Ignorieren|Löschen|Auflegen|Abbrechen|Wegwerfen|Nichts tun|Nichts sagen|Weitergehen|Wortlos auflegen|Sofort auflegen|Kommentarlos|Zuklappen|Schließen|Abwimmeln|Vorbeigehen|Nicht antworten|Nicht mehr antworten)/i;

/** Zerlegt den Inhalt eines Array-Literals in seine Elemente, ohne die
 *  Formatierung zu verlieren. Zeichenketten und Verschachtelung werden
 *  mitgezählt, sonst zerreißt ein Komma in einem Text die Liste. */
function elementeZerlegen(text) {
    const teile = [];
    let tiefe = 0, start = 0, quote = null;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (quote) {
            if (c === '\\') { i++; continue; }
            if (c === quote) quote = null;
            continue;
        }
        if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
        if (c === '{' || c === '[' || c === '(') tiefe++;
        else if (c === '}' || c === ']' || c === ')') tiefe--;
        else if (c === ',' && tiefe === 0) { teile.push(text.slice(start, i)); start = i + 1; }
    }
    const rest = text.slice(start);
    if (rest.trim()) teile.push(rest);
    return teile;
}

/** Trennt führende Leerzeichen vom eigentlichen Element. Die Einrückung
 *  gehört zur Position in der Datei, nicht zum Element - sonst wandert sie
 *  beim Umsortieren mit und die Datei franst aus. */
const zerlegen = (s) => {
    const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    return { vorn: m[1], koerper: m[2], hinten: m[3] };
};

/** Findet zu einer Position das schließende Gegenstück. */
function klammerEnde(text, start) {
    let tiefe = 0, quote = null;
    for (let i = start; i < text.length; i++) {
        const c = text[i];
        if (quote) { if (c === '\\') { i++; continue; } if (c === quote) quote = null; continue; }
        if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
        if (c === '[') tiefe++;
        else if (c === ']') { tiefe--; if (tiefe === 0) return i; }
    }
    return -1;
}

const zaehler = {};          // Rundlauf je Gruppengröße
let umsortiert = 0, unberuehrt = 0, angenagelt = 0;
const grund = {};
const zaehleGrund = (g) => { grund[g] = (grund[g] ?? 0) + 1; unberuehrt++; };

for (const datei of DATEIEN) {
    let text = readFileSync(datei, 'utf-8');
    const modul = await import('./' + datei + '?v=' + Date.now());
    const pool = Object.values(modul)[0];

    // Von hinten nach vorn, damit frühere Ersetzungen die Positionen der
    // späteren nicht verschieben.
    const stellen = [];
    for (const ev of pool) {
        if (!Array.isArray(ev.opts) || ev.opts.length < 2) { if (Array.isArray(ev.opts)) zaehleGrund('nur eine Option'); continue; }
        if (ev.opts.some(o => o.action || o.checkPool)) { zaehleGrund('Stationswahl'); continue; }

        // Die Datendateien schreiben Kennungen mal mit doppelten, mal mit
        // einfachen Anführungszeichen. Wer nur eine Schreibweise sucht,
        // überspringt stillschweigend eine ganze Datei.
        let idPos = text.indexOf(`id: "${ev.id}"`);
        if (idPos < 0) idPos = text.indexOf(`id: '${ev.id}'`);
        if (idPos < 0) { zaehleGrund('id nicht gefunden'); console.warn('  nicht gefunden: ' + ev.id); continue; }
        const optPos = text.indexOf('opts:', idPos);
        const auf = text.indexOf('[', optPos);
        const zu = klammerEnde(text, auf);
        if (optPos < 0 || auf < 0 || zu < 0) { zaehleGrund('Klammern unklar'); continue; }

        stellen.push({ ev, auf, zu });
    }

    for (const { ev, auf, zu } of stellen.reverse()) {
        const inhalt = text.slice(auf + 1, zu);
        const roh = elementeZerlegen(inhalt);
        if (roh.length !== ev.opts.length) { zaehleGrund('Zerlegung passt nicht'); continue; }  // Formatierung unklar: Finger weg

        const teile = roh.map(zerlegen);
        const feste = [], frei = [];
        ev.opts.forEach((o, i) => {
            const abbruch = o.ignoreEmail === true || ABBRUCH.test(beschriftung(o));
            (abbruch ? feste : frei).push(i);
        });
        angenagelt += feste.length;

        // Bei nur einer beweglichen Option gibt es nichts zu verteilen - die
        // Abbruch-Option gehört aber trotzdem nach unten.
        let neu = frei;
        if (frei.length >= 2) {
            // Günstigste Option: geringste Summe aus Faulheit, Aggro und Radar.
            //
            // Bei Gleichstand entscheidet der Text, nicht die Position. Das ist
            // der Unterschied zwischen "wiederholbar" und "wandert bei jedem
            // Lauf weiter": Nähme man einfach die erste der gleich teuren
            // Optionen, wäre das nach der ersten Rotation eine andere, und der
            // nächste Lauf würde erneut drehen. So bleibt es dieselbe Option,
            // egal wo sie gerade steht.
            const kosten = frei.map(i => (ev.opts[i].f ?? 0) + (ev.opts[i].a ?? 0) + (ev.opts[i].c ?? 0));
            const min = Math.min(...kosten);
            const gleichauf = frei.map((_, k) => k).filter(k => kosten[k] === min);
            const beste = gleichauf.reduce((a, b) =>
                beschriftung(ev.opts[frei[a]]) <= beschriftung(ev.opts[frei[b]]) ? a : b);

            const n = frei.length;
            zaehler[n] = (zaehler[n] ?? 0);
            const ziel = zaehler[n]++ % n;

            // Rotation statt Mischen: die relative Abfolge der übrigen
            // Optionen bleibt erhalten.
            const versatz = ((beste - ziel) % n + n) % n;
            neu = Array.from({ length: n }, (_, k) => frei[(k + versatz) % n]);
        }
        const reihenfolge = [...neu, ...feste];

        if (reihenfolge.every((v, i) => v === i)) { zaehleGrund('war schon richtig'); continue; }

        const zusammen = reihenfolge
            .map((quelle, ziel2) => teile[ziel2].vorn + teile[quelle].koerper + teile[ziel2].hinten)
            .join(',');
        text = text.slice(0, auf + 1) + zusammen + text.slice(zu);
        umsortiert++;
    }

    writeFileSync(datei, text);
    console.log(`${datei.padEnd(22)} fertig`);
}

console.log(`\numsortiert: ${umsortiert} | unberührt: ${unberuehrt} | unten angenagelt: ${angenagelt}`);
console.log('Gründe:', grund);
