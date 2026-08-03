/**
 * Normalises quotation marks in the data files. Two passes, one tool.
 *
 * They look like the same job and are not:
 *
 *   1. NOTATION - how a string is written in the source file. The project
 *      uses double quotes throughout. This matters beyond taste: tools that
 *      search the files as text (reorder-opts.mjs, for one) silently skip a
 *      file written differently. They report nothing, not an error - which is
 *      exactly what happened to the entire party pool.
 *
 *   2. TEXT - what the player reads. House rule:
 *         first order   'so'   spoken words, names, ironic distance
 *         second order  "so"   only inside a first-order quote
 *      That is the usual nesting with the roles swapped, and it fits a game
 *      that pretends to be a terminal: everything monospace, everything ASCII.
 *      German typographic quotes would be the one element pretending to come
 *      from a printed book.
 *
 * Both passes work through the parser, never through search-and-replace, and
 * both verify their own result before writing: the string values must be
 * identical afterwards (pass 1) or differ exactly where intended (pass 2).
 *
 * Idempotent - running it twice changes nothing the second time.
 *
 *   node tools/normalize-quotes.mjs            alle Datendateien
 *   node tools/normalize-quotes.mjs --dry      nur berichten, nichts schreiben
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import * as acorn from 'acorn';

const NUR_BERICHT = process.argv.includes('--dry');
const VERZEICHNIS = process.argv.find(a => !a.startsWith('--') && a !== process.argv[0] && a !== process.argv[1]) ?? '.';

/** Collects every node of a type without knowing the tree in advance. */
function sammeln(baum, typ, treffer = []) {
    if (!baum || typeof baum !== 'object') return treffer;
    if (Array.isArray(baum)) { baum.forEach(k => sammeln(k, typ, treffer)); return treffer; }
    if (baum.type === typ) treffer.push(baum);
    for (const [k, v] of Object.entries(baum)) if (!['type', 'start', 'end'].includes(k)) sammeln(v, typ, treffer);
    return treffer;
}

const parse = (text) => acorn.parse(text, { ecmaVersion: 'latest', sourceType: 'module' });
const literale = (text) => sammeln(parse(text), 'Literal').filter(k => typeof k.value === 'string');

/**
 * Rewrites the chosen literals. `neuerWert` returns the new value or null to
 * leave the literal alone. Works from the back so earlier replacements do not
 * shift the positions of later ones.
 */
function schreiben(text, neuerWert) {
    let ergebnis = text, anzahl = 0;
    for (const k of literale(text).sort((a, b) => b.start - a.start)) {
        const wert = neuerWert(k);
        if (wert === null) continue;
        ergebnis = ergebnis.slice(0, k.start) + JSON.stringify(wert) + ergebnis.slice(k.end);
        anzahl++;
    }
    return { ergebnis, anzahl };
}

let summeNotation = 0, summeText = 0, summeVerschachtelt = 0;

for (const datei of readdirSync(VERZEICHNIS).filter(f => f.startsWith('data_') && f.endsWith('.js')).sort()) {
    const pfad = VERZEICHNIS === '.' ? datei : `${VERZEICHNIS}/${datei}`;
    const original = readFileSync(pfad, 'utf-8');
    let text = original;

    // --- 1) Notation: einfache Anführungszeichen im Quelltext -> doppelte ---
    const einfach = literale(text).filter(k => text[k.start] === "'").length;
    if (einfach) {
        const { ergebnis } = schreiben(text, (k) => text[k.start] === "'" ? k.value : null);
        const vorher = literale(text).map(k => k.value);
        const nachher = literale(ergebnis).map(k => k.value);
        if (JSON.stringify(vorher) !== JSON.stringify(nachher)) {
            console.error(`${datei}: Notation — Inhalt hätte sich verändert, übersprungen`);
        } else {
            text = ergebnis;
            summeNotation += einfach;
        }
    }

    // --- 2) Spieltext: doppelte Anführungszeichen erster Ordnung -> einfache ---
    // Nur Texte mit " und OHNE ': dann kann es keine Verschachtelung sein.
    // Texte mit beiden Sorten sind Zitat im Zitat und bleiben unberührt.
    const kandidaten = literale(text).filter(k => k.value.includes('"'));
    const ersteOrdnung = kandidaten.filter(k => !k.value.includes("'"));
    summeVerschachtelt += kandidaten.length - ersteOrdnung.length;

    if (ersteOrdnung.length) {
        const stellen = new Set(ersteOrdnung.map(k => k.start));
        const { ergebnis, anzahl } = schreiben(text, (k) => stellen.has(k.start) ? k.value.replace(/"/g, "'") : null);
        const vorher = literale(text).map(k => k.value);
        const nachher = literale(ergebnis).map(k => k.value);
        const geaendert = vorher.filter((v, i) => v !== nachher[i]);
        if (geaendert.length !== anzahl || geaendert.some(v => !v.includes('"'))) {
            console.error(`${datei}: Spieltext — unerwartete Abweichung, übersprungen`);
        } else {
            text = ergebnis;
            summeText += anzahl;
        }
    }

    if (text === original) continue;
    if (!NUR_BERICHT) writeFileSync(pfad, text);
    console.log(`${datei.padEnd(22)} Notation: ${String(einfach).padStart(4)} | Spieltext: ${ersteOrdnung.length}`);
}

console.log(`\nNotation umgestellt: ${summeNotation} | Spieltexte umgestellt: ${summeText} | Verschachtelungen unberührt: ${summeVerschachtelt}`);
if (NUR_BERICHT) console.log('(--dry: nichts geschrieben)');
