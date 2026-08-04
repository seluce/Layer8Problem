/**
 * One-off redistribution of the answer options.
 *
 * In 53% of all events with three or more options the cheapest one sat
 * at the top. With three options, 33% would be chance. Whoever notices
 * that clicks the first line from then on, and the decision the event is
 * actually about stops happening.
 *
 * Not shuffled at random but spread evenly: per group size the cheapest
 * option moves to position 1, 2, 3, 4 in turn. The result is
 * deterministic - running it twice changes nothing more - and the order
 * of the remaining options survives among themselves, because the list
 * is rotated and not thrown. An escalation from cautious to drastic
 * lives through that.
 *
 * Left alone:
 *   - data_tutorial.js: the tutorial points at specific buttons
 *   - options with action/checkPool: that is the station picker of the
 *     gala, where a travelling order would be pointless
 *   - node options in chains: those are follow-up questions, not a
 *     decision about cost
 *   - abort options: "Ignorieren", "Auflegen", "Löschen & Ignorieren"
 *     and relatives stay nailed to the bottom. That is where the player
 *     looks for them, and in mails it has always been the last line.
 */
import { readFileSync, writeFileSync } from 'fs';

const FILES = [
    'data_calls.js', 'data_server.js', 'data_coffee.js', 'data_sidequests.js',
    'data_reputation.js', 'data_emails.js', 'data_lunch.js', 'data_bossfights.js',
    'data_party.js'
];

const label = (o) => o.t ?? '';

// What stays at the bottom. Anchored at the start of the text on purpose,
// so "Ignorieren" matches but "Ignorieren ist keine Option" does not.
const ABORT = /^\s*\[?\s*(System:\s*)?(Ignorieren|Löschen|Auflegen|Abbrechen|Wegwerfen|Nichts tun|Nichts sagen|Weitergehen|Wortlos auflegen|Sofort auflegen|Kommentarlos|Zuklappen|Schließen|Abwimmeln|Vorbeigehen|Nicht antworten|Nicht mehr antworten)/i;

/** Splits the body of an array literal into its elements without losing
 *  the formatting. Strings and nesting are tracked, otherwise a comma
 *  inside a text would tear the list apart. */
function splitElements(text) {
    const parts = [];
    let depth = 0, start = 0, quote = null;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (quote) {
            if (c === '\\') { i++; continue; }
            if (c === quote) quote = null;
            continue;
        }
        if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
        if (c === '{' || c === '[' || c === '(') depth++;
        else if (c === '}' || c === ']' || c === ')') depth--;
        else if (c === ',' && depth === 0) { parts.push(text.slice(start, i)); start = i + 1; }
    }
    const rest = text.slice(start);
    if (rest.trim()) parts.push(rest);
    return parts;
}

/** Separates leading whitespace from the element itself. The indentation
 *  belongs to the position in the file, not to the element - otherwise it
 *  travels along when reordering and the file frays. */
const splitIndent = (s) => {
    const m = s.match(/^(\s*)([\s\S]*?)(\s*)$/);
    return { lead: m[1], body: m[2], trail: m[3] };
};

/** Finds the closing counterpart for a given position. */
function bracketEnd(text, start) {
    let depth = 0, quote = null;
    for (let i = start; i < text.length; i++) {
        const c = text[i];
        if (quote) { if (c === '\\') { i++; continue; } if (c === quote) quote = null; continue; }
        if (c === '"' || c === "'" || c === '`') { quote = c; continue; }
        if (c === '[') depth++;
        else if (c === ']') { depth--; if (depth === 0) return i; }
    }
    return -1;
}

const counter = {};          // round robin per group size
let reordered = 0, untouched = 0, pinnedTotal = 0;
const reasons = {};
const countReason = (reason) => { reasons[reason] = (reasons[reason] ?? 0) + 1; untouched++; };

for (const file of FILES) {
    let text = readFileSync(file, 'utf-8');
    const mod = await import('./' + file + '?v=' + Date.now());
    const pool = Object.values(mod)[0];

    // Back to front, so earlier replacements do not shift the positions
    // of the later ones.
    const spots = [];
    for (const ev of pool) {
        if (!Array.isArray(ev.opts) || ev.opts.length < 2) { if (Array.isArray(ev.opts)) countReason('nur eine Option'); continue; }
        if (ev.opts.some(o => o.action || o.checkPool)) { countReason('Stationswahl'); continue; }

        // The data files write ids with double quotes in some places and
        // with single ones in others. Searching for only one spelling
        // silently skips a whole file.
        let idPos = text.indexOf(`id: "${ev.id}"`);
        if (idPos < 0) idPos = text.indexOf(`id: '${ev.id}'`);
        if (idPos < 0) { countReason('id nicht gefunden'); console.warn('  nicht gefunden: ' + ev.id); continue; }
        const optPos = text.indexOf('opts:', idPos);
        const open = text.indexOf('[', optPos);
        const close = bracketEnd(text, open);
        if (optPos < 0 || open < 0 || close < 0) { countReason('Klammern unklar'); continue; }

        spots.push({ ev, open, close });
    }

    for (const { ev, open, close } of spots.reverse()) {
        const content = text.slice(open + 1, close);
        const raw = splitElements(content);
        if (raw.length !== ev.opts.length) { countReason('Zerlegung passt nicht'); continue; }  // formatting unclear: hands off

        const parts = raw.map(splitIndent);
        const pinned = [], free = [];
        ev.opts.forEach((o, i) => {
            const isAbort = o.ignoreEmail === true || ABORT.test(label(o));
            (isAbort ? pinned : free).push(i);
        });
        pinnedTotal += pinned.length;

        // With only one movable option there is nothing to distribute -
        // the abort option still belongs at the bottom.
        let newOrder = free;
        if (free.length >= 2) {
            // Cheapest option: the lowest sum of laziness, anger and radar.
            //
            // On a tie the text decides, not the position. That is the
            // difference between "repeatable" and "moves on with every
            // run": take the first of the equally expensive options and it
            // would be a different one after the first rotation, so the
            // next run would turn again. This way it stays the same
            // option, wherever it currently sits.
            const cost = free.map(i => (ev.opts[i].f ?? 0) + (ev.opts[i].a ?? 0) + (ev.opts[i].c ?? 0));
            const min = Math.min(...cost);
            const tied = free.map((_, k) => k).filter(k => cost[k] === min);
            const best = tied.reduce((a, b) =>
                label(ev.opts[free[a]]) <= label(ev.opts[free[b]]) ? a : b);

            const n = free.length;
            counter[n] = (counter[n] ?? 0);
            const target = counter[n]++ % n;

            // Rotating instead of shuffling: the relative order of the
            // remaining options survives.
            const offset = ((best - target) % n + n) % n;
            newOrder = Array.from({ length: n }, (_, k) => free[(k + offset) % n]);
        }
        const order = [...newOrder, ...pinned];

        if (order.every((v, i) => v === i)) { countReason('war schon richtig'); continue; }

        const joined = order
            .map((source, slot) => parts[slot].lead + parts[source].body + parts[slot].trail)
            .join(',');
        text = text.slice(0, open + 1) + joined + text.slice(close);
        reordered++;
    }

    writeFileSync(file, text);
    console.log(`${file.padEnd(22)} fertig`);
}

console.log(`\numsortiert: ${reordered} | unberührt: ${untouched} | unten angenagelt: ${pinnedTotal}`);
console.log('Gründe:', reasons);
