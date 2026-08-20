#!/usr/bin/env node
/**
 * Layer8Problem - every literal string in the code, with no language filter
 * ------------------------------------------------------------------------
 * Location: tools/scan-strings.mjs   (run from the repository root)
 * Usage:    node tools/scan-strings.mjs [path ...] [options]
 *           node tools/scan-strings.mjs                    # the default space
 *           node tools/scan-strings.mjs src/engine
 *           node tools/scan-strings.mjs --sentences
 *           node tools/scan-strings.mjs --all-attrs
 *
 * Never a gate. Always exits 0. The output is reading material.
 *
 * WHY THIS IS NOT A WORD LIST
 *
 * Four earlier passes looked for German text by looking for German words, and
 * three of them missed something:
 *
 *   1. Capitals without umlauts slip through. KAFFEE, DIENSTGANG, SERVERRAUM,
 *      ANRUF - the four buttons of the action bar, the most visible piece of
 *      interface there is - appeared in no finding.
 *   2. Text nodes spanning several lines slip through when the pattern forbids
 *      newlines.
 *   3. Text nodes containing {…} slip through when the pattern excludes braces.
 *
 * And the umlaut filter does not carry either: over the 401 strings of
 * engine_ui.js it produced exactly ONE hit - and that was the single place that
 * was NOT to be changed. "Sende...", "Gesendet!" and both alert texts carry no
 * umlaut.
 *
 * So this tool has no idea what German is. It reads the file with a real
 * parser, cuts out every string, and shows all of them. Judging is the reader's
 * job; the list is short enough for that.
 *
 * WHAT IS CUT OUT, PER FILE TYPE
 *
 *   .js .mjs .cjs   acorn. Every string literal and every template PIECE
 *                   without the expressions substituted into it - `Tag ${n}`
 *                   yields "Tag " and not the value of n. Comments fall away
 *                   with the parser, which is the point of using one.
 *
 *   .svelte .html   the script blocks go through acorn as above; style blocks
 *                   and comments are dropped; from the rest every Svelte
 *                   expression is cut out by COUNTING braces, not by pattern,
 *                   and what remains between the tags is shown - plus the
 *                   static attribute values, which are neither text node nor
 *                   script string and were in no earlier pass.
 *
 * FOUR KINDS, so that a finding can be placed without opening the file:
 *
 *   str   a string literal in JavaScript
 *   tpl   a piece of a template literal
 *   text  a text node in markup
 *   attr  a static attribute value in markup
 *
 * THE TWO SECOND GRIPS, for when a run is too long to read in one go. Neither
 * catches anything extra - they only make 400 lines bearable:
 *
 *   --sentences   only strings containing a space; those are the sentences
 *   --nouns       only single words starting with a capital; German nouns sit
 *                 there
 *
 * WHAT IS LEFT OUT, AND WHY IT IS NOT A LANGUAGE FILTER
 *
 * Module specifiers (`import … from '…'`) are paths, not text. Structural
 * attributes (class, id, href, viewBox …) are markup, not text; --all-attrs
 * shows them anyway, and holding one run against the other is how you check
 * that the list hides nothing. Both are decisions about the ROLE of a string,
 * never about its language - the moment a filter asks "does this look German?"
 * it has become one of the three passes above.
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, extname, sep } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'acorn';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

/* ---------- the search space ---------- */

/**
 * What a run without arguments covers. Named here rather than assembled from a
 * directory walk, because "the interface is done" is a sentence about a search
 * space and is worthless without one.
 */
const DEFAULT_TARGETS = [
    'src/engine',        // 11 modules
    'src/components',    // 38 components, 8 of them the intranet
    'src/i18n/i18n.svelte.js',
    'src/main.js',
    'src/engine.js',
    'src/data.js',
    'src/tutorial.js',
    'src/platform.js',
    'src/platform_steam.js',
    'index.html',
    'electron/main.cjs',
    'vite.config.js',
    'tools'
];

/**
 * Skipped in a default run, with the reason, and reachable by naming them.
 *
 * The two dictionaries are the one place where German is the CONTENT: de.js is
 * meant to be German from end to end, and en.js is held against it by
 * lint-i18n rule 4. Six hundred and fifty entries would bury every other
 * finding, and not one of them would be new.
 *
 * src/data/ is the event pools - 23 files per tree, checked by lint-parity.
 */
const SKIPPED = [
    ['src/i18n/de.js', 'the dictionary, German by nature'],
    ['src/i18n/en.js', 'the dictionary, checked by lint-i18n rule 4'],
    ['src/data', 'the event pools, checked by lint-parity']
];

const CODE = new Set(['.js', '.mjs', '.cjs']);
const MARKUP = new Set(['.svelte', '.html']);

/**
 * Attribute names that carry markup rather than text. Not a language filter.
 *
 * `value` and `content` are deliberately NOT in here, although both look
 * structural. An <option value> is a word somebody chose, and this list was
 * one --all-attrs run away from hiding the five categories of the bug report
 * (value="Rechtschreibfehler" and its neighbours) - which are German on
 * purpose, but a tool that hides them cannot show that it is on purpose.
 */
const STRUCTURAL_ATTRS = new Set([
    'class', 'id', 'style', 'href', 'src', 'srcset', 'type', 'role', 'tabindex',
    'name', 'for', 'rel', 'target', 'method', 'action', 'charset',
    'http-equiv', 'lang', 'dir', 'width', 'height', 'viewbox', 'xmlns', 'fill',
    'stroke', 'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'd', 'cx',
    'cy', 'r', 'x', 'y', 'x1', 'x2', 'y1', 'y2', 'points', 'transform',
    'preserveaspectratio', 'loading', 'decoding', 'crossorigin', 'sizes',
    'media', 'as', 'integrity', 'referrerpolicy', 'autocomplete', 'inputmode',
    'enterkeyhint', 'spellcheck', 'draggable', 'contenteditable', 'slot',
    'colspan', 'rowspan', 'scope', 'datetime', 'min', 'max', 'step',
    'maxlength', 'minlength', 'pattern', 'accept', 'multiple', 'size', 'wrap',
    'rows', 'cols', 'start', 'reversed', 'open', 'hidden', 'key', 'this'
]);

/** Attributes whose value is a key, not a sentence - the i18n marks themselves. */
const I18N_ATTRS = /^data-i18n/;

/* ---------- arguments ---------- */

const argv = process.argv.slice(2);
const flags = new Set(argv.filter(a => a.startsWith('--')));
const targets = argv.filter(a => !a.startsWith('--'));

const ONLY_SENTENCES = flags.has('--sentences');
const ONLY_NOUNS = flags.has('--nouns');
const ALL_ATTRS = flags.has('--all-attrs');

/* ---------- collecting files ---------- */

const files = [];

function collect(rel) {
    const abs = join(ROOT, rel);
    let info;
    try {
        info = statSync(abs);
    } catch {
        console.error(` ✗ not found: ${rel}`);
        return;
    }
    if (info.isDirectory()) {
        for (const entry of readdirSync(abs).sort()) {
            if (entry === 'node_modules' || entry.startsWith('.')) continue;
            collect(join(rel, entry));
        }
        return;
    }
    const ext = extname(rel);
    if (CODE.has(ext) || MARKUP.has(ext)) files.push(rel.split(sep).join('/'));
}

for (const target of (targets.length ? targets : DEFAULT_TARGETS)) collect(target);

/* ---------- JavaScript ---------- */

/**
 * Every string in a piece of JavaScript, as {line, kind, text}.
 *
 * `lineOffset` exists for the script block of a .svelte file: acorn counts from
 * the start of what it was handed, and what it was handed starts in the middle
 * of the file.
 */
function scanCode(source, { sourceType, lineOffset = 0 }) {
    const found = [];
    let tree;
    try {
        tree = parse(source, {
            ecmaVersion: 'latest',
            sourceType,
            locations: true,
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true,
            allowHashBang: true
        });
    } catch (err) {
        return { found, error: err.message };
    }

    // Module specifiers are paths. Collected first so the walk can recognise
    // the nodes by identity rather than by guessing from their parent.
    const specifiers = new Set();
    walk(tree, node => {
        if (node.type === 'ImportDeclaration'
            || node.type === 'ExportNamedDeclaration'
            || node.type === 'ExportAllDeclaration'
            || node.type === 'ImportExpression') {
            if (node.source) specifiers.add(node.source);
        }
    });

    walk(tree, node => {
        if (node.type === 'Literal' && typeof node.value === 'string') {
            if (specifiers.has(node)) return;
            found.push({
                line: node.loc.start.line + lineOffset,
                kind: 'str',
                text: node.value
            });
        }
        if (node.type === 'TemplateLiteral') {
            for (const piece of node.quasis) {
                found.push({
                    line: piece.loc.start.line + lineOffset,
                    kind: 'tpl',
                    text: piece.value.cooked ?? piece.value.raw
                });
            }
        }
    });

    found.sort((a, b) => a.line - b.line);
    return { found, error: null };
}

function walk(node, visit) {
    if (node === null || typeof node !== 'object') return;
    if (Array.isArray(node)) {
        for (const child of node) walk(child, visit);
        return;
    }
    if (typeof node.type === 'string') visit(node);
    for (const key of Object.keys(node)) {
        if (key === 'loc' || key === 'range') continue;
        walk(node[key], visit);
    }
}

/* ---------- markup ---------- */

/**
 * Text nodes and static attribute values of a .svelte or .html file.
 *
 * Written as a walk rather than as patterns, for the reason at the top: a
 * pattern that forbids newlines loses "Den Arbeitstag beginnen" because it
 * stands alone on its line, and one that forbids braces loses
 * "{found}/{total} NOTIZEN". Here a brace block is CONSUMED - counted, with
 * quotes inside it respected - so what surrounds it stays whole.
 *
 * Returns the findings and the script blocks, which the caller sends through
 * acorn.
 */
function scanMarkup(source) {
    const found = [];
    const scripts = [];

    let i = 0;
    let line = 1;
    let text = '';
    let textLine = 1;

    const advance = (to) => {
        for (let k = i; k < to; k++) if (source[k] === '\n') line++;
        i = to;
    };

    const flushText = () => {
        const trimmed = text.replace(/\s+/g, ' ').trim();
        if (trimmed) found.push({ line: textLine, kind: 'text', text: trimmed });
        text = '';
    };

    /** Consumes a balanced {…}, respecting strings inside it. Returns the end. */
    const skipBraces = (from) => {
        let depth = 0;
        let k = from;
        while (k < source.length) {
            const ch = source[k];
            if (ch === '"' || ch === "'" || ch === '`') {
                const quote = ch;
                k++;
                while (k < source.length && source[k] !== quote) {
                    if (source[k] === '\\') k++;
                    k++;
                }
                k++;
                continue;
            }
            if (ch === '{') depth++;
            else if (ch === '}') {
                depth--;
                if (depth === 0) return k + 1;
            }
            k++;
        }
        return source.length;
    };

    while (i < source.length) {
        const ch = source[i];

        if (ch === '{') {
            const end = skipBraces(i);
            text += ' ';
            advance(end);
            continue;
        }

        if (ch === '<') {
            // A comment carries no interface text, and it is allowed to be
            // German - it is a comment.
            if (source.startsWith('<!--', i)) {
                flushText();
                const end = source.indexOf('-->', i);
                advance(end === -1 ? source.length : end + 3);
                continue;
            }
            if (source.startsWith('<!', i)) {
                flushText();
                const end = source.indexOf('>', i);
                advance(end === -1 ? source.length : end + 1);
                continue;
            }
            flushText();
            const tag = readTag(i);
            if (!tag) { text += ch; advance(i + 1); continue; }

            for (const attr of tag.attrs) found.push(attr);
            const openLine = line;
            advance(tag.end);

            // script and style are handed on whole: the one to acorn, the
            // other nowhere. Their contents are not markup and must not be
            // walked as such - a CSS brace is not a Svelte expression.
            //
            // Only the OPENING tag may do this. Taken off a </script> the
            // search for the next one finds nothing, the rest of the file
            // counts as the body, and acorn refuses it - which is how this was
            // found: 38 components "not readable" and index.html down to a
            // single finding, because everything after its <style> was gone.
            const name = tag.name.toLowerCase();
            if ((name === 'script' || name === 'style') && !tag.selfClosing && !tag.closing) {
                const closeAt = source.toLowerCase().indexOf(`</${name}`, i);
                const bodyEnd = closeAt === -1 ? source.length : closeAt;
                if (name === 'script') {
                    scripts.push({ body: source.slice(i, bodyEnd), line: openLine });
                }
                advance(bodyEnd);
            }
            textLine = line;
            continue;
        }

        if (!text) textLine = line;
        text += ch;
        advance(i + 1);
    }
    flushText();

    found.sort((a, b) => a.line - b.line);
    return { found, scripts };

    /** Reads one tag from `at`, returning its name, its attributes and its end. */
    function readTag(at) {
        let k = at + 1;
        const closing = source[k] === '/';
        if (closing) k++;
        const nameStart = k;
        while (k < source.length && /[A-Za-z0-9_:.\-]/.test(source[k])) k++;
        if (k === nameStart) return null;
        const name = source.slice(nameStart, k);
        const attrs = [];
        let tagLine = line;
        for (let n = at; n < nameStart; n++) if (source[n] === '\n') tagLine++;

        while (k < source.length) {
            while (k < source.length && /\s/.test(source[k])) {
                if (source[k] === '\n') tagLine++;
                k++;
            }
            if (k >= source.length) break;
            if (source[k] === '>') return { name, attrs, end: k + 1, selfClosing: false, closing };
            if (source[k] === '/' && source[k + 1] === '>') {
                return { name, attrs, end: k + 2, selfClosing: true, closing };
            }
            // {value} and {...rest} as a whole attribute
            if (source[k] === '{') { k = skipBraces(k); continue; }

            const attrStart = k;
            while (k < source.length && !/[\s=>/]/.test(source[k])) k++;
            const attrName = source.slice(attrStart, k).toLowerCase();
            while (k < source.length && /\s/.test(source[k])) {
                if (source[k] === '\n') tagLine++;
                k++;
            }
            if (source[k] !== '=') continue;
            k++;
            while (k < source.length && /\s/.test(source[k])) {
                if (source[k] === '\n') tagLine++;
                k++;
            }

            let raw;
            const quote = source[k];
            if (quote === '"' || quote === "'") {
                const valueStart = ++k;
                while (k < source.length && source[k] !== quote) k++;
                raw = source.slice(valueStart, k);
                k++;
            } else if (quote === '{') {
                const end = skipBraces(k);
                k = end;
                continue;                       // a bare expression, no literal
            } else {
                const valueStart = k;
                while (k < source.length && !/[\s>]/.test(source[k])) k++;
                raw = source.slice(valueStart, k);
            }

            const valueLine = tagLine;
            for (const c of raw) if (c === '\n') tagLine++;

            if (!ALL_ATTRS) {
                if (STRUCTURAL_ATTRS.has(attrName)) continue;
                if (I18N_ATTRS.test(attrName)) continue;
                if (attrName.startsWith('on') || attrName.startsWith('bind:')
                    || attrName.startsWith('use:') || attrName.startsWith('transition:')
                    || attrName.startsWith('in:') || attrName.startsWith('out:')
                    || attrName.startsWith('animate:') || attrName.startsWith('class:')
                    || attrName.startsWith('style:')) continue;
            }

            // An attribute made only of expressions has no literal left.
            const literal = raw.replace(/\{[^]*?\}/g, ' ').replace(/\s+/g, ' ').trim();
            if (literal) {
                attrs.push({
                    line: valueLine,
                    kind: 'attr',
                    text: `${attrName}="${literal}"`
                });
            }
        }
        return { name, attrs, end: k, selfClosing: false, closing };
    }
}

/* ---------- the run ---------- */

const keep = (entry) => {
    const text = entry.text;
    if (!text.trim()) return false;
    if (ONLY_SENTENCES && !/\s/.test(text.trim())) return false;
    if (ONLY_NOUNS && !/^[A-ZÄÖÜ][A-Za-zÄÖÜäöüß]*$/.test(text.trim())) return false;
    return true;
};

console.log('String pass - everything, no language filter');
console.log(`Search space: ${files.length} files`
    + (targets.length ? ` (${targets.join(', ')})` : ' (Standardraum)'));
if (!targets.length) {
    for (const [path, why] of SKIPPED) console.log(`  skipped: ${path} - ${why}`);
}
if (ONLY_SENTENCES) console.log('  second pass: only strings containing a space');
if (ONLY_NOUNS) console.log('  second pass: only single words starting with a capital');
if (ALL_ATTRS) console.log('  every attribute, the structural ones included');
console.log('');

let total = 0;
let broken = 0;
const perFile = [];

for (const rel of files) {
    const source = readFileSync(join(ROOT, rel), 'utf-8');
    const ext = extname(rel);
    let entries = [];
    let error = null;

    if (CODE.has(ext)) {
        const result = scanCode(source, { sourceType: ext === '.cjs' ? 'script' : 'module' });
        entries = result.found;
        error = result.error;
    } else {
        const { found, scripts } = scanMarkup(source);
        entries = found;
        for (const block of scripts) {
            const result = scanCode(block.body, {
                sourceType: 'module',
                lineOffset: block.line - 1
            });
            if (result.error) error = result.error;
            entries = entries.concat(result.found);
        }
        entries.sort((a, b) => a.line - b.line);
    }

    if (error) {
        broken++;
        console.log(`${rel}`);
        console.log(`   ✗ not readable: ${error}`);
        console.log('');
        continue;
    }

    const shown = entries.filter(keep);
    perFile.push([rel, shown.length, entries.length]);
    if (!shown.length) continue;

    total += shown.length;
    console.log(rel);
    for (const entry of shown) {
        const where = String(entry.line).padStart(5);
        const printable = entry.text.replace(/\n/g, '\\n');
        console.log(`${where}  ${entry.kind.padEnd(4)}  ${printable}`);
    }
    console.log('');
}

console.log('---');
console.log(`${total} strings in ${perFile.filter(f => f[1]).length} of ${files.length} files`);
if (broken) console.log(` ✗ ${broken} file(s) not readable`);
console.log('');
console.log('Per file (shown / found):');
for (const [rel, shown, all] of perFile.sort((a, b) => b[1] - a[1])) {
    if (!all) continue;
    console.log(`  ${String(shown).padStart(5)} / ${String(all).padStart(5)}  ${rel}`);
}
console.log('');
console.log('No finding is a fault. The reading is done by hand.');
