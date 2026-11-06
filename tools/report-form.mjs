/**
 * Reads the field ids of the bug-report form and, with --write, puts them
 * into src/engine/report_form.js.
 *
 *   npm run report:form -- <the form's public link> [--write]
 *
 * The public link is the one Google Forms hands out under "Send" or
 * "Publish" (…/forms/d/e/<id>/viewform), not the editor's (…/forms/d/<id>/edit).
 *
 * Until 7.1 the ids had to be found by hand - a pre-filled link, or the
 * network tab while sending the form once - and the pre-filled link stopped
 * carrying them for some forms. They are in the published page anyway: Google
 * ships the whole form as FB_PUBLIC_LOAD_DATA_, and each answerable question
 * carries its entry id there. That is what this reads.
 *
 * Three questions are expected, in order: category as a short answer, then
 * description and debug block as paragraphs. A category as a drop-down would
 * reject every report whose value it does not list - and the post goes out
 * blind (no-cors), so nobody would hear about it. The types are checked for
 * that reason, and a form that does not match is refused rather than written.
 *
 * After writing: build, then send one test report from the game and look for
 * it under the form's responses. The game cannot tell whether one arrived.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const TARGET = fileURLToPath(new URL('../src/engine/report_form.js', import.meta.url));

// Question types in FB_PUBLIC_LOAD_DATA_: 0 short answer, 1 paragraph.
const EXPECTED = [
    { field: 'cat',   type: 0, what: 'category (short answer)' },
    { field: 'desc',  type: 1, what: 'description (paragraph)' },
    { field: 'debug', type: 1, what: 'debug block (paragraph)' },
];
const TYPE_NAMES = { 0: 'short answer', 1: 'paragraph', 2: 'multiple choice', 3: 'drop-down', 4: 'checkboxes' };

/** The form id out of a public link, or null for anything else. */
export function formIdOf(link) {
    return String(link ?? '').match(/\/forms\/d\/e\/([\w-]+)/)?.[1] ?? null;
}

/**
 * The answerable questions of a published form page, in order. Throws with a
 * sentence a person can act on when the page holds no form.
 */
export function readQuestions(html) {
    const m = String(html).match(/var FB_PUBLIC_LOAD_DATA_ = (.*?);\s*<\/script>/s);
    if (!m) throw new Error('The page holds no form. Is it published, and does it accept responses?');
    const data = JSON.parse(m[1]);
    return (data?.[1]?.[1] ?? [])
        .filter(q => Array.isArray(q?.[4]) && q[4].length)
        .map(q => ({ title: q[1], type: q[3], entry: `entry.${q[4][0][0]}` }));
}

/** The three fields, or an error naming the question that does not fit. */
export function fieldsOf(questions) {
    if (questions.length !== EXPECTED.length) {
        throw new Error(`Expected ${EXPECTED.length} questions, the form has ${questions.length}.`);
    }
    const out = {};
    EXPECTED.forEach((want, i) => {
        const q = questions[i];
        if (q.type !== want.type) {
            throw new Error(`Question ${i + 1} ("${q.title}") is a ${TYPE_NAMES[q.type] ?? `type ${q.type}`}; `
                + `it has to be the ${want.what}.`);
        }
        out[want.field] = q.entry;
    });
    return out;
}

/** report_form.js with the new values, the comment above it untouched. */
export function rewrite(source, url, fields) {
    let out = source;
    const set = (key, value) => {
        const re = new RegExp(`(\\n    ${key}: )'[^']*',`);
        if (!re.test(out)) throw new Error(`report_form.js has no "${key}" line to replace.`);
        out = out.replace(re, `$1'${value}',`);
    };
    set('url', url);
    for (const [key, value] of Object.entries(fields)) set(key, value);
    return out;
}

async function main(args) {
    const link = args.find(a => !a.startsWith('--'));
    const id = formIdOf(link);
    if (!id) {
        console.error('Usage: npm run report:form -- <public link> [--write]');
        console.error('The public link looks like https://docs.google.com/forms/d/e/<id>/viewform -');
        console.error('the one under "Send" or "Publish", not the editor\'s /forms/d/<id>/edit.');
        process.exit(1);
    }
    const res = await fetch(`https://docs.google.com/forms/d/e/${id}/viewform`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) { console.error(`✗ Google answered ${res.status} for that form.`); process.exit(1); }

    let fields;
    try { fields = fieldsOf(readQuestions(await res.text())); }
    catch (err) { console.error(`✗ ${err.message}`); process.exit(1); }

    const url = `https://docs.google.com/forms/d/e/${id}/formResponse`;
    console.log(`\nForm ${id}`);
    console.log(`  url    ${url}`);
    for (const [key, value] of Object.entries(fields)) console.log(`  ${key.padEnd(6)} ${value}`);

    if (!args.includes('--write')) { console.log('\n  (nothing written - pass --write)'); return; }
    const before = readFileSync(TARGET, 'utf8');
    const after = rewrite(before, url, fields);
    if (after === before) { console.log('\n✅ report_form.js already holds these.'); return; }
    writeFileSync(TARGET, after);
    console.log('\n✅ Written to src/engine/report_form.js. Build, then send one test report from the game.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main(process.argv.slice(2));
