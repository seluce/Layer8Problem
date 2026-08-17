#!/usr/bin/env node
/**
 * Layer8Problem - prose report
 * ---------------------------------------------------------------
 * Location: tools/report-prose.mjs   (run from the repository root)
 * Usage:    node tools/report-prose.mjs [pool ...] [--lang=de|en]
 *           node tools/report-prose.mjs emails
 *           node tools/report-prose.mjs lunch --lang=en
 *
 * Editorial magnifier, not a linter. Everything here is a FINDING to
 * read, never an error to silence: whether a sentence is a lazy copy
 * or a running gag is a human call. Consequently this tool always
 * exits 0 and is not part of any build gate.
 *
 * What it surfaces (the measurable share of "reads like AI"):
 *  1. sentences repeated verbatim across different events
 *  2. longer word sequences repeated across different events
 *  3. game mechanics leaking into narration ("Deine Aggro steigt")
 *  4. typo candidates (tripled consonants, broken punctuation)
 *  5. references that date the game (product versions, 2023 pop culture)
 *  6. telegraph-style events: many ultra-short result texts (rewrite queue)
 *  7. emails only: sender inventory + one person under several names
 *
 * What it cannot judge: whether a text sounds human. That part stays
 * manual; this report only decides where to look first.
 */

import { DB, ensure, loadCore, currentLanguage } from '../src/data.js';

/* ---------- configuration ---------- */

// Pools that contain player-facing prose. `board` rides along because its
// notes are prose too; intranet stays out (component-rendered, own tone).
//
// The seven at the end were added in the twentieth session, when the last ten
// files were translated and the report turned out not to know most of them. A
// report that does not know a pool does not say "unknown" - it says nothing,
// and nothing looks like zero findings (GLOSSAR section 7b, case twenty-three).
const ALL_POOLS = ['server', 'coffee', 'calls', 'sidequests', 'emails', 'meetings',
                   'lunch', 'party', 'reputation', 'bossfights', 'special', 'board',
                   'diary', 'moods', 'achievements', 'excuses', 'newsTicker',
                   'tutorial', 'chars'];

// Pools that are not arrays of events but trees of text: a plain list of
// strings (excuses, newsTicker) or sections holding line lists (diary). They
// are walked leaf by leaf, the way `special` always has been.
const TREE_POOLS = new Set(['special', 'diary', 'excuses', 'newsTicker']);

// Sentences that repeat by design. Exact match after normalisation.
//
// Mirrored entry for entry, like TEMPLATES below and for the same reason: the
// report is a before/after gauge, and a set that only knows one language
// measures two different things. Until the mail block the English half was
// missing, so `emails --lang=en` reported the 140 deletion lines as a section 1
// finding and their overlaps as four section 2 findings - none of which the
// German run showed. That is not a translation defect, it is the tool being
// half-built; the German half has been whitelisted since 5.0.
const BOILERPLATE = new Set([
  'E-Mail kommentarlos gelöscht.',
  'Gespräch beendet.',
  'Du legst auf.',
  '[System: Chat beendet]',
  '[System: Du hast die Gruppe verlassen]',

  'Email deleted without comment.',
  'Call ended.',
  'You hang up.',
  '[System: Chat closed]',
  '[System: You have left the group]'
]);

// Deliberate misspellings (gags). Skipped by the typo candidate check.
const INTENDED_TYPOS = ['Wlchtig', 'gewonnnen']; // both scam mails - typos are in character

// Real German compounds with a legit triple consonant (post-1996 spelling).
const LEGIT_TRIPLES = ['Bissspuren', 'Stillleg', 'Fitnessstudio', 'volllaufen', 'vollladen', 'Bestellliste', 'stilllegen',
                       'Schifffahrt', 'Sauerstoffflasche', 'Schnellladen', 'Balletttänzer'];

// References that will age badly. Extend as needed - this list is the
// editorial memory of "we decided that dates the game".
const DATED = [
  [/iPhone\s*1?\d\b/i,         'konkrete iPhone-Generation (ab 20 gilt Parodie)'],
  [/\bM[1-9]\s*(Pro|Max)\b/,   'konkrete Apple-Chip-Generation'],
  [/MacBook[^.!?]*M\d/,        'konkrete MacBook-Generation'],
  [/Barbie(?! Girl)/,          'Kino-Sommer 2023 (Barbie Girl von Aqua ist zeitlos)'],
  [/Oppenheimer/,              'Kino-Sommer 2023'],
  [/\bSims\s*\d\b/,            'konkrete Spiele-Version']
];

// Mechanics vocabulary that must never surface in narration.
//
// Both languages are checked in one list rather than switched on --lang: a
// German status word in an English text (or the other way round) is a finding
// too, and a language-dependent set could silently pick the wrong half. The
// English names are the ones fixed in GLOSSAR section 3a - Laziness, Aggro,
// Boss Radar - so "Aggro" is the only entry that already covered both.
const MECHANICS = [
  [/\bAggro\b/,                'Statuswert "Aggro" beim Namen genannt'],
  [/Chef-?Radar/i,             'Statuswert "Chef-Radar" beim Namen genannt'],
  [/Boss[- ]?Radar/i,          'Statuswert "Boss Radar" beim Namen genannt'],
  [/\b(d|m)ein(em|en)?\s+Radar\b/i, 'Statuswert "Chef-Radar" als "dein/mein Radar" genannt'],
  [/\b(your|my)\s+radar\b/i,   'Statuswert "Boss Radar" als "your/my radar" genannt'],
  [/\bFaulheit\b/,             'Statuswert "Faulheit" beim Namen genannt (prüfen)'],
  [/\bLaziness\b/i,            'Statuswert "Laziness" beim Namen genannt (prüfen)'],
  [/Stimmung\s*[+-]\s*\d/,     'Zahlenwert im Erzähltext'],
  [/\bMood\s*[+-]\s*\d/i,      'Zahlenwert im Erzähltext'],
  [/\bRadar\s*[+-]\s*\d/,      'Zahlenwert im Erzähltext'],
  [/Radar[- ]?(Bonus|Malus|Penalty)/i, 'Statuswert-Effekt beim Namen genannt'],
  [/[+-]\d+\s*(Punkte|Prozentpunkte)\b/, 'Zahlenwert im Erzähltext'],
  [/[+-]\d+\s*(points?|percentage\s+points?)\b/i, 'Zahlenwert im Erzähltext']
];

// Sender grouping (emails): tokens that are roles/departments, not names.
const NOT_A_NAME = new Set([
  'Kollege', 'Kollegin', 'Frau', 'Herr', 'Hausmeister', 'Azubi', 'Prinz',
  'Vertriebsleiter', 'Projektleiter', 'Datenschutzbeauftragter', 'Agile', 'Coach',
  'Team', 'System', 'Alert', 'Automated', 'Bot', 'Survey', 'Alle', 'Verteiler',
  'Der', 'Die', 'Das', 'Du', 'Gedanken', 'Privat', 'Official', 'Dr', 'Notar',
  'Buchhaltung', 'Empfang', 'Marketing', 'Vertrieb', 'Reinigung', 'Küche',
  'Kantine', 'Sekretariat', 'Sicherheit', 'Rechtsabteilung', 'Personalabteilung',
  'Personalentwicklung', 'Betriebsrat', 'Vorstand', 'Design', 'Facility',
  'Konzernzentrale', 'Kanzlei', 'Söhne', 'Partner', 'Anwalt', 'Mitarbeiter',
  'Orga', 'Komitee', 'Ausschuss', 'Management', 'Office', 'Umfrage', 'Ticketsystem',

  // Mirrored for the English tree, like BOILERPLATE and TEMPLATES. Without
  // these the section reported 16 findings instead of 2: every department and
  // role word shared by two senders looked like one person under two names
  // ("Works Council" / "Works Council (Uwe)"). The two real findings are
  // Kevin and Chantal, and those are meant to be there - the same person
  // writing on business and private accounts is the joke.
  'Works', 'Council', 'Accounts', 'Sales', 'Reception', 'Security', 'Canteen',
  'Kitchen', 'Cleaning', 'Committee', 'Compliance', 'Development', 'Distribution',
  'Employees', 'Colleagues', 'Staff', 'Group', 'Head', 'Legal', 'Department',
  'Notary', 'Solicitors', 'Sons', 'Board', 'Working', 'Organising', 'Printer',
  'Caretaker', 'Apprentice', 'Private', 'Thoughts', 'Former', 'Employee',
  'Prince', 'Funny', 'Data', 'Protection', 'Officer', 'Project', 'Manager',
  'Secretariat', 'Financial', 'Control', 'Service', 'Newsletter', 'Facilities',
  'All', 'Auntie', 'Unknown', 'Anonymous'
]);

const SHORT_RESULT = 60;   // chars; below this a result text counts as telegraph
const NGRAM_MAX = 8, NGRAM_MIN = 5;

/* ---------- gather texts ---------- */
// One record per player-facing string: { pool, id, field, kind, text }
// kind 'prose' = narration (text/body/r/txt), 'label' = title/subj/buttons.
// Buttons repeat by convention ("Löschen & Ignorieren"), so duplicate
// detection only ever looks at prose.

const args = process.argv.slice(2);

const langArg = args.find(a => a.startsWith('--lang='));
const lang = langArg ? langArg.slice('--lang='.length) : 'de';
if (lang !== 'de' && lang !== 'en') {
  console.error(`Unbekannte Sprache "${lang}". Verfügbar: de, en`);
  process.exit(1);
}

const wanted = args.filter(a => !a.startsWith('-'));
const pools = wanted.length ? wanted : ALL_POOLS;
for (const p of pools) {
  if (!ALL_POOLS.includes(p)) {
    console.error(`Unbekannter Pool "${p}". Verfügbar: ${ALL_POOLS.join(', ')}`);
    process.exit(1);
  }
}

// `special` lives in the core tier, which ensure() does not touch. Without
// loadCore it stays undefined, walkSpecial walks nothing, and the pool reports
// zero findings without ever saying that it read zero texts.
await loadCore(lang);
await ensure('board', 'bossfights', 'calls', 'coffee', 'emails', 'intranet',
             'lunch', 'meetings', 'party', 'reputation', 'server', 'sidequests',
             'diary', 'moods', 'achievements', 'excuses', 'newsTicker',
             'tutorial', 'chars');

// loadCore falls back to German when a tree cannot be read. Reporting the
// language that actually loaded keeps a fallback from passing as an English run.
if (currentLanguage() !== lang) {
  console.error(`Sprache "${lang}" konnte nicht geladen werden — der Bericht liest "${currentLanguage()}".`);
  process.exit(1);
}

const records = [];
const push = (pool, id, field, kind, text) => {
  if (typeof text === 'string' && text.trim()) records.push({ pool, id, field, kind, text });
};

/*
 * A tree of text lists (valve texts, diary lines, excuses), not an event
 * array. Every string leaf in there is narration the player will read.
 *
 * What counts as ONE entry differs per pool, and getting it wrong makes the
 * repetition sections blind rather than wrong: section 1 only counts a
 * sentence that appears in DIFFERENT entries, so a pool whose leaves all
 * collapse to the same key reports nothing however often it repeats itself.
 * Proven by mutation - two identical excuses went unreported until each line
 * became its own entry.
 *
 *   excuses / newsTicker   one string = one entry; the player sees each alone
 *   diary                  the entry is the FRAGMENT (it has its own id), and
 *                          its `lines` are alternatives for the same slot
 *   special                the containing list, as it always was
 */
const treeId = (pool, path, chain) => {
  if (pool === 'excuses' || pool === 'newsTicker') return path;
  if (pool === 'diary') return chain.at(-1) ?? path;
  return path.replace(/\.\d+$/, '');
};

const walkTree = (pool, node, path, chain = []) => {
  if (typeof node === 'string') { push(pool, treeId(pool, path, chain), path, 'prose', node); return; }
  if (Array.isArray(node)) {
    node.forEach((v, i) => walkTree(pool, v, `${path}.${i}`, v?.id ? [...chain, v.id] : chain));
    return;
  }
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walkTree(pool, v, path ? `${path}.${k}` : k, chain);
  }
};

for (const pool of pools) {
  if (TREE_POOLS.has(pool)) { walkTree(pool, DB[pool], ''); continue; }
  const entries = pool === 'board' ? (DB.board ?? []) : (DB[pool] ?? []);
  for (const ev of entries) {
    const id = ev.id ?? '(ohne id)';
    push(pool, id, 'title', 'label', ev.title);
    push(pool, id, 'subj',  'label', ev.subj);
    push(pool, id, 'text',  'prose', ev.text);
    push(pool, id, 'body',  'prose', ev.body);
    // Achievements and the team cards: the blurb under the heading is prose,
    // the one-line role beside a name is a label.
    push(pool, id, 'desc',  'prose', ev.desc);
    push(pool, id, 'hint',  'prose', ev.hint);
    push(pool, id, 'toast', 'prose', ev.toast);
    push(pool, id, 'role',  'label', ev.role);
    // The noticeboard: a pinned note is signed, stamped and footed, and all
    // of it is written by a colleague. Only `title` and `body` were measured
    // before, which left two thirds of the pool outside every section.
    push(pool, id, 'sign',  'prose', ev.sign);
    push(pool, id, 'sub',   'label', ev.sub);
    push(pool, id, 'dept',  'label', ev.dept);
    push(pool, id, 'foot',  'prose', ev.foot);
    push(pool, id, 'note',  'prose', ev.note);
    push(pool, id, 'stamp', 'prose', ev.stamp);
    (ev.items ?? []).forEach((s, i) => push(pool, id, `items[${i}]`, 'prose', s));
    (ev.tabs  ?? []).forEach((s, i) => push(pool, id, `tabs[${i}]`,  'label', s));
    (ev.textByProgress ?? []).forEach((s, i) => push(pool, id, `textByProgress[${i}]`, 'prose', s));
    (ev.opts ?? []).forEach((o, i) => {
      push(pool, id, `opts[${i}].t`, 'label', o.t);
      push(pool, id, `opts[${i}].r`,   'prose', o.r);
    });
    for (const [nid, node] of Object.entries(ev.nodes ?? {})) {
      push(pool, id, `#${nid}.text`, 'prose', node.text);
      (node.opts ?? []).forEach((o, i) => push(pool, id, `#${nid}[${i}].t`, 'label', o.t));
    }
    for (const [rid, res] of Object.entries(ev.results ?? {})) {
      push(pool, id, `!${rid}`, 'prose', res.txt ?? res.r);
    }
    if (ev.fail) push(pool, id, 'fail.r', 'prose', ev.fail.r ?? ev.fail.txt);
  }
}

const prose = records.filter(r => r.kind === 'prose');
const norm = s => s.replace(/\s+/g, ' ').trim();
const loc = r => `${r.pool}/${r.id}`;

/* ---------- report helpers ---------- */
let sectionNo = 0;
const section = (title, findings, cap = 60) => {
  sectionNo++;
  console.log(`\n== ${sectionNo}) ${title} — ${findings.length} Befund${findings.length === 1 ? '' : 'e'} ==`);
  findings.slice(0, cap).forEach(f => console.log('  ' + f));
  if (findings.length > cap) console.log(`  … und ${findings.length - cap} weitere`);
};

console.log(`Layer8Problem Prosa-Bericht (${lang}) — Pools: ${pools.join(', ')}`);
console.log(`${records.length} Textfelder erfasst, davon ${prose.length} Erzähltexte.`);

/* ---------- 1) verbatim repeated sentences ---------- */
// Split narration into sentences, count identical ones across DIFFERENT
// events. Repetition inside one event is a stylistic device and stays out.
// The lookbehind keeps abbreviations like "E. Elster" in one piece.
const sentSplit = t => t.split(/(?<=[.!?…])(?<![A-ZÄÖÜ]\.)(?<!\d\.)\s+/).map(norm).filter(s => s.length >= 10);
const sentMap = new Map(); // sentence -> Map(eventKey -> count)
for (const r of prose) {
  for (const s of sentSplit(r.text)) {
    if (BOILERPLATE.has(s)) continue;
    if (!sentMap.has(s)) sentMap.set(s, new Map());
    const m = sentMap.get(s);
    m.set(loc(r), (m.get(loc(r)) ?? 0) + 1);
  }
}
const dupSentences = [...sentMap.entries()]
  .filter(([, m]) => m.size >= 2)
  .sort((a, b) => b[1].size - a[1].size);
section('Wörtlich wiederholte Sätze (über verschiedene Ereignisse)',
  dupSentences.map(([s, m]) => `${m.size}x  "${s}"\n      → ${[...m.keys()].join(', ')}`));

/* ---------- 2) repeated word sequences (n-grams) ---------- */
// Catches near-copies the sentence check misses because a word differs.
// Longest match wins; shorter n-grams inside an already accepted longer
// phrase (with the same or fewer events) are noise and get skipped.
const dupSentenceSet = new Set(dupSentences.map(([s]) => s.toLowerCase()));
const stripBoiler = t => { let out = t; for (const b of BOILERPLATE) out = out.split(b).join(' '); return out; };
const tokens = t => norm(stripBoiler(t)).toLowerCase().replace(/[^a-zäöüß0-9\s-]/g, '').split(/\s+/).filter(Boolean);
const accepted = [];
for (let n = NGRAM_MAX; n >= NGRAM_MIN; n--) {
  const map = new Map(); // phrase -> Set(eventKey)
  for (const r of prose) {
    const w = tokens(r.text);
    for (let i = 0; i + n <= w.length; i++) {
      const ph = w.slice(i, i + n).join(' ');
      (map.get(ph) ?? map.set(ph, new Set()).get(ph)).add(loc(r));
    }
  }
  for (const [ph, ids] of map) {
    if (ids.size < 2) continue;
    if ([...dupSentenceSet].some(s => s.includes(ph))) continue; // already in section 1
    if (accepted.some(a => a.ph.includes(ph) && [...ids].every(x => a.ids.has(x)))) continue;
    accepted.push({ ph, ids });
  }
}
accepted.sort((a, b) => b.ids.size - a.ids.size || b.ph.length - a.ph.length);
section('Wiederholte Wortfolgen (5+ Wörter, über verschiedene Ereignisse)',
  accepted.map(a => `${a.ids.size}x  "${a.ph}"\n      → ${[...a.ids].join(', ')}`));

/* ---------- 3) mechanics leaking into narration ---------- */
const mech = [];
for (const r of records) {
  for (const [re, why] of MECHANICS) {
    const m = r.text.match(re);
    if (m) mech.push(`[${loc(r)}] ${r.field}: "…${norm(r.text).slice(Math.max(0, r.text.indexOf(m[0]) - 25), r.text.indexOf(m[0]) + m[0].length + 25)}…" (${why})`);
  }
}
section('Spielmechanik im Erzähltext', mech);

/* ---------- 4) typo candidates ---------- */
// Tripled consonants are usually typos ("gewonnnen"); tripled vowels are
// usually deliberate stretching ("laaangsam", "Heeey") and stay out.
// Legit triple-consonant compounds exist (Bestellliste) - hence "candidates".
const typo = [];
const PUNCT = [
  [/[!?]\./,           'Satzzeichen-Doppel ("!." / "?.")'],
  [/(?<!\.)\.\.(?!\.)/,'zwei Punkte statt drei'],
  [/,,/,               'doppeltes Komma'],
  // A dot followed by a word character is a domain or file extension (.ru,
  // .exe) and no finding.
  [/\s+(?:[,;]|\.(?![.\w]))/, 'Leerzeichen vor Satzzeichen (Sprechpause " ..." ist erlaubt)'],
  [/ {2,}/,            'doppeltes Leerzeichen']
];
for (const r of records) {
  const t = r.text;
  const tri = t.match(/([bcdfgjklmnpqrstvwxz])\1\1/i);
  // The word around the hit decides: no vowel at all means onomatopoeia or a
  // URL fragment ("Krrrrtzzz", "www."), both deliberate.
  const triWord = tri ? (t.slice(0, t.indexOf(tri[0])).split(/[^A-Za-zÄÖÜäöüß]/).pop() + tri[0] + t.slice(t.indexOf(tri[0]) + 3).split(/[^A-Za-zÄÖÜäöüß]/)[0]) : '';
  if (tri && /[aeiouäöüy]/i.test(triWord) && triWord !== triWord.toUpperCase()
          && !/([aeiouäöü])\1\1/i.test(triWord)
          && !INTENDED_TYPOS.some(w => t.includes(w))
          && !LEGIT_TRIPLES.some(w => triWord.toLowerCase().includes(w.toLowerCase())))
    typo.push(`[${loc(r)}] ${r.field}: dreifacher Konsonant "…${norm(t).slice(Math.max(0, t.indexOf(tri[0]) - 15), t.indexOf(tri[0]) + 18)}…"`);
  for (const [re, why] of PUNCT) {
    const m = t.match(re);
    if (m) typo.push(`[${loc(r)}] ${r.field}: ${why} "…${norm(t).slice(Math.max(0, t.indexOf(m[0]) - 20), t.indexOf(m[0]) + m[0].length + 20)}…"`);
  }
}
section('Tippfehler-Kandidaten', typo);

/* ---------- 5) dated references ---------- */
const dated = [];
for (const r of records) {
  for (const [re, why] of DATED) {
    const m = r.text.match(re);
    if (m) dated.push(`[${loc(r)}] ${r.field}: "${m[0]}" (${why})`);
  }
}
section('Referenzen, die das Spiel altern lassen', dated);

/* ---------- 5b) template constructions (editorial frequency baseline) ---------- */
// The measurable share of the editorial brief "Weg von KI-Prosa": phrasings
// that are fine once and become a stamp when they recur across many events.
// Every hit is a READING assignment, never a rewrite order - a dry "Immerhin."
// can be exactly right where it stands. The list is deliberately incomplete:
// generic entries from the brief ("Das ist ...") would flood the report and
// stay a human read. This section doubles as the before/after gauge for an
// editing wave: totals should sink, and no NEW phrasing may shoot up in their
// place - sections 1 and 2 are the counter-check for that.
const SENT_START = '(?:^|[.!?…]["“”«»]?\\s+)';

// The English set MIRRORS the German one entry for entry, on purpose: the
// section is a before/after gauge, and two languages measuring different
// phrasings cannot be held against each other. Only "Dafür …" has no single
// counterpart - it splits into three English turns, so they share one row.
// Both sets live in one list because a pattern with zero hits is dropped from
// the report anyway; a --lang branch here could only ever pick the wrong half.
const TEMPLATES = [
  ['„Du fühlst dich …“',           /\b[Dd]u fühlst dich\b/g],
  ['„Du X, aber Y“ (Satzanfang)',  new RegExp(SENT_START + 'Du [^.!?"\\n]{2,60}, aber ', 'g')],
  ['„Du bist jetzt …“',            /\b[Dd]u bist jetzt\b/g],
  ['„Du hast gewonnen …“',         /\b[Dd]u hast gewonnen\b/g],
  ['„Sieg durch …“',               /\bSieg durch\b/g],
  ['„Natürlich …“ (Satzanfang)',   new RegExp(SENT_START + 'Natürlich\\b', 'g')],
  // "Wenigstens" is the same consolation move as "Immerhin" and was not
  // counted until 6.0. English has one word for both, so without this row the
  // two languages measure different things: the lunch pool has the move four
  // times in German and the report saw two of them.
  ['„Immerhin/Wenigstens …“ (Satzanfang)', new RegExp(SENT_START + '(?:Immerhin|Wenigstens)\\b', 'g')],
  ['„Plötzlich …“ (Satzanfang)',   new RegExp(SENT_START + 'Plötzlich\\b', 'g')],
  ['„Manchmal …“ (Satzanfang)',    new RegExp(SENT_START + 'Manchmal\\b', 'g')],
  ['„Dafür …“ (Satzanfang)',       new RegExp(SENT_START + 'Dafür\\b', 'g')],
  ['„Am Ende …“ (Satzanfang)',     new RegExp(SENT_START + 'Am Ende\\b', 'g')],
  ['„Und wieder (einmal) …“',      new RegExp(SENT_START + 'Und wieder\\b', 'g')],

  ['„You feel …“',                 /\byou feel\b/gi],
  ['„You X, but Y“ (Satzanfang)',  new RegExp(SENT_START + 'You [^.!?"\\n]{2,60}, but ', 'g')],
  ['„You are now …“',              /\byou are now\b/gi],
  ['„You have won …“',             /\byou have won\b/gi],
  ['„Victory by/through …“',       /\bvictory (by|through)\b/gi],
  ['„Of course …“ (Satzanfang)',   new RegExp(SENT_START + 'Of course\\b', 'g')],
  ['„At least …“ (Satzanfang)',    new RegExp(SENT_START + 'At least\\b', 'g')],
  ['„Suddenly …“ (Satzanfang)',    new RegExp(SENT_START + 'Suddenly\\b', 'g')],
  ['„Sometimes …“ (Satzanfang)',   new RegExp(SENT_START + 'Sometimes\\b', 'g')],
  ['„Then again / On the plus side …“', new RegExp(SENT_START + '(?:Then again|On the plus side|In return)\\b', 'g')],
  ['„In the end …“ (Satzanfang)',  new RegExp(SENT_START + 'In the end\\b', 'g')],
  ['„Once again …“',               new RegExp(SENT_START + '(?:Once again|Yet again)\\b', 'g')]
];
const tmplRows = [];
for (const [label, re] of TEMPLATES) {
  let total = 0;
  const perPool = new Map(), where = [];
  for (const r of prose) {
    for (const m of r.text.matchAll(re)) {
      total++;
      perPool.set(r.pool, (perPool.get(r.pool) ?? 0) + 1);
      // Trim the sentence-start punctuation off so the phrase leads the snippet.
      const at = m.index + m[0].search(/[A-Za-zÄÖÜäöü]/);
      where.push(`[${loc(r)}] ${r.field}: "…${norm(r.text.slice(Math.max(0, at - 12), at + 58))}…"`);
    }
  }
  if (total) tmplRows.push({ label, total, perPool, where, re });
}
tmplRows.sort((a, b) => b.total - a.total);
sectionNo++;
console.log(`\n== ${sectionNo}) Schablonen-Konstruktionen (Frequenz-Baseline der Redaktion) — ${tmplRows.reduce((a, r) => a + r.total, 0)} Treffer in ${tmplRows.length} Mustern ==`);
for (const row of tmplRows) {
  const dist = [...row.perPool.entries()].sort((a, b) => b[1] - a[1]).map(([p, c]) => `${p} ${c}`).join(', ');
  console.log(`  ${String(row.total).padStart(3)}x  ${row.label}   (${dist})`);
  row.where.slice(0, 10).forEach(w => console.log(`        ${w}`));
  if (row.where.length > 10) console.log(`        … und ${row.where.length - 10} weitere — Muster: ${row.re}`);
}

/* ---------- 6) telegraph events: the rewrite queue ---------- */
// Events whose result texts average below SHORT_RESULT chars. These are
// the mass-produced ones; sorted ascending = worst first.
const phoneIds = new Set();
for (const pool of pools) {
  const entries = pool === 'board' ? (DB.board ?? []) : (DB[pool] ?? []);
  if (Array.isArray(entries)) for (const ev of entries) if (ev.kind === 'phone') phoneIds.add(`${pool}/${ev.id}`);
}
const perEvent = new Map();
for (const r of prose) {
  if (phoneIds.has(loc(r))) continue; // chat bubbles are short by design
  if (!/\.r$|^!|^fail/.test(r.field) && !/opts\[\d+\]\.r/.test(r.field)) continue;
  const k = loc(r);
  (perEvent.get(k) ?? perEvent.set(k, []).get(k)).push(norm(r.text).length);
}
const telegraph = [...perEvent.entries()]
  .filter(([, lens]) => lens.length >= 2)
  .map(([k, lens]) => [k, Math.round(lens.reduce((a, b) => a + b, 0) / lens.length), lens.length])
  .filter(([, avg]) => avg < SHORT_RESULT)
  .sort((a, b) => a[1] - b[1]);
section(`Telegraf-Kandidaten (Ø Ergebnistext unter ${SHORT_RESULT} Zeichen — die Überarbeitungsliste)`,
  telegraph.map(([k, avg, n]) => `Ø ${String(avg).padStart(3)} Zeichen bei ${n} Ergebnissen  [${k}]`), 120);

/* ---------- 6b) thin openings ---------- */
// An event or chain root whose scene text is shorter than the buttons below
// it gives the player a decision without a situation. Mid-chain nodes are
// beats and may be short; only the opening counts.
const thin = [];
for (const pool of pools) {
  if (TREE_POOLS.has(pool)) continue;
  const entries = pool === 'board' ? (DB.board ?? []) : (DB[pool] ?? []);
  if (!Array.isArray(entries)) continue;
  for (const ev of entries) {
    // Email bodies are excluded on purpose: a mail IS the artifact, and a
    // three-word mail from Kevin is characterisation, not a missing scene.
    if (ev.kind === 'phone') continue; // chat bubbles are short by design
    const opening = ev.nodes ? ev.nodes[ev.startNode]?.text : ev.text;
    const nOpts = ev.nodes ? (ev.nodes[ev.startNode]?.opts?.length ?? 0) : (ev.opts?.length ?? 0);
    if (typeof opening === 'string' && nOpts >= 2 && norm(opening).length < 80)
      thin.push([`${pool}/${ev.id}`, norm(opening).length, norm(opening)]);
  }
}
thin.sort((a, b) => a[1] - b[1]);
section('Dünne Auftakte (Szenentext unter 80 Zeichen vor einer Entscheidung)',
  thin.map(([k, len, t]) => `${String(len).padStart(3)} Zeichen  [${k}]  "${t}"`), 80);

/* ---------- 6c) conspicuous option labels ---------- */
// Labels are meant to be short; findings here are overlong buttons and
// ASCII arrows, both remnants of the mass-produced era.
const labels = [];
for (const r of records) {
  // Option labels are the fields ending in .t; title and subj are headings.
  if (r.kind !== 'label' || !/\.t$/.test(r.field)) continue;
  if (norm(r.text).length > 80)
    labels.push(`[${loc(r)}] ${r.field}: ${norm(r.text).length} Zeichen "${norm(r.text).slice(0, 70)}…"`);
  if (/->/.test(r.text))
    labels.push(`[${loc(r)}] ${r.field}: ASCII-Pfeil "${norm(r.text)}"`);
}
section('Auffällige Optionsbeschriftungen (überlang oder ASCII-Pfeil)', labels, 60);

/* ---------- 6d) legacy label registers (migration worklist) ---------- */
// Target style (4.1): options are natural verb phrases from Mueller's
// perspective ("Ihn vor dem Spinat-Kern warnen") or bare direct speech.
// Legacy registers to migrate: "Aktion (Hinweis)" and "Haltung: ..." prefixes.
// Capture 2 is whatever follows the colon, which is what tells the house form
// ("Ihn ablenken: 'Feueralarm!'") from a verdict ("Völlige Panik: Wegrennen").
const PREFIX = /^([A-ZÄÖÜ][\wäöüß-]*(?:\s+[\wäöüß-]+){0,2}):\s+(.+)$/;
const legacyLabels = [], quoteLabels = [];
for (const r of records) {
  // Option labels are the fields ending in .t, exactly as in section 6c.
  // Until the twentieth session those were the only labels left after the
  // title/subj exclusion below, so the section worked by coincidence; once
  // the noticeboard's `sub` and `dept` were measured it began judging
  // notice headings ("Betr: Fisch") as legacy button registers.
  if (r.kind !== 'label' || !/\.t$/.test(r.field)) continue;
  // Caller/title displays like "Frau Meyer (Buchhaltung)" are phone UI,
  // not option buttons - the parenthesis is correct there. Same for email
  // subjects: "Re:", "WG: ... (VERTRAULICH)" and urgent phishing subjects
  // are mail realism, not legacy registers.
  if (/title|subj|betreff/i.test(r.field)) continue;
  // Phone-event labels are chat messages or [bracketed] app functions -
  // parentheses there are message content (Kevin's "(+FPS)"), not registers.
  if (phoneIds.has(loc(r))) continue;
  const t = norm(r.text);
  if (/\([^)]*\)\s*$/.test(t))
    legacyLabels.push(`[${loc(r)}] Klammer:  "${t}"`);
  // Up to THREE words before the colon. The old pattern took exactly one, so
  // "Paranoid werden: Im Klo runterspülen" walked past it and the section
  // reported 0 for a pool that had five of them.
  else if (PREFIX.test(t) && !/^(https?|Betreff|Subject|Re|WG|Error \d)/i.test(t)) {
    // "Handlung: 'Zitat'" is the house form and by far the larger group - the
    // left half says what Miller does, the right half what he says. Only the
    // left half can be a verdict, so the two are listed apart: mixing them
    // buries five real findings under 130 correct labels, and a section nobody
    // reads is a section that finds nothing.
    if (/^["'„]/.test(PREFIX.exec(t)[2])) quoteLabels.push(`[${loc(r)}] "${t}"`);
    else legacyLabels.push(`[${loc(r)}] Präfix:   "${t}"`);
  }
}
section('Alt-Register Optionsbeschriftungen (Migrationsliste zum Hausstil)', legacyLabels, 900);
section('Etikett vor wörtlicher Rede — nur die LINKE Hälfte prüfen: benennt sie die Handlung oder bewertet sie die Wahl?', quoteLabels, 900);

/* ---------- 7) emails: sender inventory & name variants ---------- */
if (pools.includes('emails')) {
  const senders = new Map();
  for (const e of DB.emails) senders.set(e.sender, (senders.get(e.sender) ?? 0) + 1);

  // Group senders by contained person-name token; a person appearing under
  // several sender strings is either intentional (Privat vs. Büro) or drift.
  const byName = new Map();
  for (const s of senders.keys()) {
    for (const w of s.split(/[\s()."]+/)) {
      if (/^[A-ZÄÖÜ][a-zäöüß]+$/.test(w) && !NOT_A_NAME.has(w)) {
        (byName.get(w) ?? byName.set(w, new Set()).get(w)).add(s);
      }
    }
  }
  const variants = [...byName.entries()]
    .filter(([, set]) => set.size >= 2)
    .sort((a, b) => b[1].size - a[1].size);
  section('Eine Person, mehrere Absender-Schreibweisen',
    variants.map(([name, set]) => `${name}: ${[...set].map(s => `"${s}"`).join('  |  ')}`));

  // Canon check: which sender names collide with DB.chars roles is a human
  // read; the inventory makes it a two-minute read instead of a grep session.
  sectionNo++;
  console.log(`\n== ${sectionNo}) Absender-Inventar (${senders.size} verschiedene) ==`);
  [...senders.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .forEach(([s, c]) => console.log(`  ${String(c).padStart(3)}x  ${s}`));
}

console.log('\nFertig. Befunde sind Lesestoff, keine Fehlerliste — geändert wird nur, was redaktionell entschieden ist.');
