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
 *   node tools/normalize-quotes.mjs            all data files
 *   node tools/normalize-quotes.mjs --dry      report only, write nothing
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import * as acorn from 'acorn';

const REPORT_ONLY = process.argv.includes('--dry');
const DIRECTORY = process.argv.find(a => !a.startsWith('--') && a !== process.argv[0] && a !== process.argv[1]) ?? '.';

/** Collects every node of a type without knowing the tree in advance. */
function collect(tree, type, hits = []) {
    if (!tree || typeof tree !== 'object') return hits;
    if (Array.isArray(tree)) { tree.forEach(node => collect(node, type, hits)); return hits; }
    if (tree.type === type) hits.push(tree);
    for (const [key, value] of Object.entries(tree)) if (!['type', 'start', 'end'].includes(key)) collect(value, type, hits);
    return hits;
}

const parse = (text) => acorn.parse(text, { ecmaVersion: 'latest', sourceType: 'module' });
const literals = (text) => collect(parse(text), 'Literal').filter(node => typeof node.value === 'string');

/**
 * Rewrites the chosen literals. `newValue` returns the new value or null to
 * leave the literal alone. Works from the back so earlier replacements do not
 * shift the positions of later ones.
 */
function rewrite(text, newValue) {
    let result = text, count = 0;
    for (const node of literals(text).sort((a, b) => b.start - a.start)) {
        const value = newValue(node);
        if (value === null) continue;
        result = result.slice(0, node.start) + JSON.stringify(value) + result.slice(node.end);
        count++;
    }
    return { result, count };
}

let totalNotation = 0, totalText = 0, totalNested = 0;

for (const file of readdirSync(DIRECTORY).filter(f => f.startsWith('data_') && f.endsWith('.js')).sort()) {
    const path = DIRECTORY === '.' ? file : `${DIRECTORY}/${file}`;
    const original = readFileSync(path, 'utf-8');
    let text = original;

    // --- 1) Notation: single quotes in the source -> double ---
    const singleQuoted = literals(text).filter(node => text[node.start] === "'").length;
    if (singleQuoted) {
        const { result } = rewrite(text, (node) => text[node.start] === "'" ? node.value : null);
        const before = literals(text).map(node => node.value);
        const after = literals(result).map(node => node.value);
        if (JSON.stringify(before) !== JSON.stringify(after)) {
            console.error(`${file}: Notation — Inhalt hätte sich verändert, übersprungen`);
        } else {
            text = result;
            totalNotation += singleQuoted;
        }
    }

    // --- 2) Game text: first-order double quotes -> single ---
    // Only texts with " and WITHOUT ': then there can be no nesting.
    // Texts carrying both kinds are a quote inside a quote and stay put.
    const candidates = literals(text).filter(node => node.value.includes('"'));
    const firstOrder = candidates.filter(node => !node.value.includes("'"));
    totalNested += candidates.length - firstOrder.length;

    if (firstOrder.length) {
        const spots = new Set(firstOrder.map(node => node.start));
        const { result, count } = rewrite(text, (node) => spots.has(node.start) ? node.value.replace(/"/g, "'") : null);
        const before = literals(text).map(node => node.value);
        const after = literals(result).map(node => node.value);
        const changed = before.filter((v, i) => v !== after[i]);
        if (changed.length !== count || changed.some(v => !v.includes('"'))) {
            console.error(`${file}: Spieltext — unerwartete Abweichung, übersprungen`);
        } else {
            text = result;
            totalText += count;
        }
    }

    if (text === original) continue;
    if (!REPORT_ONLY) writeFileSync(path, text);
    console.log(`${file.padEnd(22)} Notation: ${String(singleQuoted).padStart(4)} | Spieltext: ${firstOrder.length}`);
}

console.log(`\nNotation umgestellt: ${totalNotation} | Spieltexte umgestellt: ${totalText} | Verschachtelungen unberührt: ${totalNested}`);
if (REPORT_ONLY) console.log('(--dry: nichts geschrieben)');
