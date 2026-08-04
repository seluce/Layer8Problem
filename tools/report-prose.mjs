#!/usr/bin/env node
/**
 * Layer8Problem - prose report
 * ---------------------------------------------------------------
 * Location: tools/report-prose.mjs   (run from the repository root)
 * Usage:    node tools/report-prose.mjs [pool ...]
 *           node tools/report-prose.mjs emails
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

import { DB, ensure } from '../src/data.js';

await ensure('board', 'bossfights', 'calls', 'coffee', 'emails', 'intranet',
             'lunch', 'party', 'reputation', 'server', 'sidequests');

/* ---------- configuration ---------- */

// Pools that contain player-facing prose. `board` rides along because its
// notes are prose too; intranet stays out (component-rendered, own tone).
const ALL_POOLS = ['server', 'coffee', 'calls', 'sidequests', 'emails',
                   'lunch', 'party', 'reputation', 'bossfights', 'special', 'board'];

// Sentences that repeat by design. Exact match after normalisation.
const BOILERPLATE = new Set([
  'E-Mail kommentarlos gelöscht.',
  'Gespräch beendet.',
  'Du legst auf.',
  '[System: Chat beendet]',
  '[System: Du hast die Gruppe verlassen]'
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
const MECHANICS = [
  [/\bAggro\b/,                'Statuswert "Aggro" beim Namen genannt'],
  [/Chef-?Radar/i,             'Statuswert "Chef-Radar" beim Namen genannt'],
  [/\b(d|m)ein(em|en)?\s+Radar\b/i, 'Statuswert "Chef-Radar" als "dein/mein Radar" genannt'],
  [/\bFaulheit\b/,             'Statuswert "Faulheit" beim Namen genannt (prüfen)'],
  [/Stimmung\s*[+-]\s*\d/,     'Zahlenwert im Erzähltext'],
  [/\bRadar\s*[+-]\s*\d/,      'Zahlenwert im Erzähltext'],
  [/Radar-?(Bonus|Malus)/i,    'Statuswert-Effekt beim Namen genannt'],
  [/[+-]\d+\s*(Punkte|Prozentpunkte)\b/, 'Zahlenwert im Erzähltext']
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
  'Orga', 'Komitee', 'Ausschuss', 'Management', 'Office', 'Umfrage', 'Ticketsystem'
]);

const SHORT_RESULT = 60;   // chars; below this a result text counts as telegraph
const NGRAM_MAX = 8, NGRAM_MIN = 5;

/* ---------- gather texts ---------- */
// One record per player-facing string: { pool, id, field, kind, text }
// kind 'prose' = narration (text/body/r/txt), 'label' = title/subj/buttons.
// Buttons repeat by convention ("Löschen & Ignorieren"), so duplicate
// detection only ever looks at prose.

const args = process.argv.slice(2);
const pools = args.length ? args : ALL_POOLS;
for (const p of pools) {
  if (!ALL_POOLS.includes(p)) {
    console.error(`Unbekannter Pool "${p}". Verfügbar: ${ALL_POOLS.join(', ')}`);
    process.exit(1);
  }
}

const records = [];
const push = (pool, id, field, kind, text) => {
  if (typeof text === 'string' && text.trim()) records.push({ pool, id, field, kind, text });
};

// `special` is a tree of text lists (valve texts etc.), not an event array;
// every string leaf in there is narration the player will read.
const walkSpecial = (node, path) => {
  if (typeof node === 'string') push('special', path.replace(/\.\d+$/, ''), path, 'prose', node);
  else if (Array.isArray(node)) node.forEach((v, i) => walkSpecial(v, `${path}.${i}`));
  else if (node && typeof node === 'object') for (const [k, v] of Object.entries(node)) walkSpecial(v, path ? `${path}.${k}` : k);
};

for (const pool of pools) {
  if (pool === 'special') { walkSpecial(DB.special, ''); continue; }
  const entries = pool === 'board' ? (DB.board ?? []) : (DB[pool] ?? []);
  for (const ev of entries) {
    const id = ev.id ?? '(ohne id)';
    push(pool, id, 'title', 'label', ev.title);
    push(pool, id, 'subj',  'label', ev.subj);
    push(pool, id, 'text',  'prose', ev.text);
    push(pool, id, 'body',  'prose', ev.body);
    (ev.opts ?? []).forEach((o, i) => {
      push(pool, id, `opts[${i}].btn`, 'label', o.btn ?? o.t);
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

console.log(`Layer8Problem Prosa-Bericht — Pools: ${pools.join(', ')}`);
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
  if (pool === 'special') continue;
  const entries = pool === 'board' ? (DB.board ?? []) : (DB[pool] ?? []);
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
  if (r.kind !== 'label' || !/\.btn$|\]\.t$|\[\d+\]\.t$/.test(r.field) && !/btn|\.t$/.test(r.field)) continue;
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
const legacyLabels = [];
for (const r of records) {
  if (r.kind !== 'label') continue;
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
  else if (/^[A-ZÄÖÜ][a-zäöüß-]+:\s/.test(t) && !/^(https?|Betreff):/i.test(t))
    legacyLabels.push(`[${loc(r)}] Präfix:   "${t}"`);
}
section('Alt-Register Optionsbeschriftungen (Migrationsliste zum Hausstil)', legacyLabels, 900);

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
