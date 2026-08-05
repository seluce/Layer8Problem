#!/usr/bin/env node
/**
 * Layer8Problem - data linter
 * ---------------------------------------------------------------
 * Location: tools/lint-data.mjs   (run from the repository root)
 * Usage:    node tools/lint-data.mjs
 * Exits 1 on errors, so it works as a GitHub action as is.
 *
 * Checks everything that fails silently at runtime:
 *  - duplicate event ids (usedIDs is ONE global set across all pools)
 *  - loot/req/rem pointing at items that do not exist
 *  - char/reqRep/rep names missing from DB.chars
 *  - story flags that are required but never set (= dead content)
 *  - reqStory on the bulletin board and in the intranet, same check
 *  - markup in fields that are rendered as plain text (would be readable)
 *  - chain events: next going nowhere, unreachable nodes/results, dead ends
 *  - nextEmail pointing at a missing mail, duplicate mail ids and subjects
 *  - characters in opt.r that could break the inline onclick string
 *  - unknown fields: a misspelt key parses fine and is silently dropped
 *  - result keys without the res_ prefix (the terminal reads that prefix)
 *  - the diary pool: conditions that throw, never fit, or name something
 *    that does not exist
 */

import { readFileSync, readdirSync } from 'fs';
import { DB, ensure } from '../src/data.js';

// The event pools load lazily at runtime (see data.js); pull them all in first.
await ensure('board', 'bossfights', 'calls', 'coffee', 'diary', 'emails', 'intranet', 'lunch', 'party', 'reputation', 'server', 'sidequests');

const errors = [], warns = [], infos = [];
const err = m => errors.push(m), warn = m => warns.push(m), info = m => infos.push(m);

const POOLS = ['bossfights', 'calls', 'coffee', 'lunch', 'party', 'reputation', 'server', 'sidequests', 'tutorial'];
const itemIds = new Set(Object.keys(DB.items));
const charNames = new Set(DB.chars.map(c => c.name));

/* ---------- 1) Event ids: unique across ALL pools ---------- */
const idMap = new Map();
for (const p of POOLS) {
  for (const ev of DB[p]) {
    if (!ev.id) { err(`[${p}] Event ohne ID: "${ev.title}"`); continue; }
    (idMap.get(ev.id) ?? idMap.set(ev.id, []).get(ev.id)).push(p);
  }
}
for (const [id, pools] of idMap) {
  if (pools.length > 1) err(`Doppelte Event-ID "${id}" in ${pools.join(' + ')} — usedIDs blockiert beide gleichzeitig`);
}

/* ---------- 2) References and story flags ---------- */
// Story flags vs. node navigation.
// A plain event carries `opts`; its opt.next SETS a story flag.
// A chain event carries `nodes`; opt.next inside a node NAVIGATES to another
// node and is not a flag. Only results[].next sets a flag there.
// (Verified: no event has both `opts` and `nodes`.)
const flagsSet = new Set();
const flagsReq = new Map();
const flagsSetWhere = new Map();
const noteFlag = (flag, where) => {
    flagsSet.add(flag);
    if (!flagsSetWhere.has(flag)) flagsSetWhere.set(flag, []);
    flagsSetWhere.get(flag).push(where);
};

const checkOpt = (o, ctx) => {
  if (o.t === undefined) err(`${ctx}: Option ohne Button-Text`);
  // In the messenger a pair of brackets already says "this is an action, not a
  // message". The System: prefix in front of it was historical and cost eight
  // characters of a very narrow bubble. It stays allowed inside chat texts,
  // where it is the messenger's own notice rather than a label.
  if (/^\s*\[\s*System\s*:/i.test(o.t ?? ''))
    err(`${ctx}: Beschriftung mit "[System: …]" — im Chat tragen Handlungen nur die eckigen Klammern`);
  for (const [k, label] of [['loot', 'loot'], ['req', 'req'], ['rem', 'rem']]) {
    if (o[k] && !itemIds.has(o[k])) err(`${ctx}: ${label} "${o[k]}" existiert nicht in DB.items`);
  }
  if (o.rep) for (const n of Object.keys(o.rep)) if (!charNames.has(n)) err(`${ctx}: rep-Charakter "${n}" nicht in DB.chars`);
  if (o.next) flagsSet.add(o.next);
};

for (const p of POOLS) {
  for (const ev of DB[p]) {
    const ctx = `[${p}/${ev.id}]`;
    // Follow-up events can arrive hours after their trigger, or never. Texts
    // claiming immediate proximity are wrong in that case.
    if (ev.reqStory && ev.text) {
      const m = ev.text.match(/(Sekunden später|Minuten später|Kaum (hast|bist|warst)|Keine (Minute|Sekunde)|Sofort danach|Direkt (danach|im Anschluss)|Im selben Moment|Postwendend|Kurz darauf)/);
      if (m) warn(`${ctx}: Folge-Ereignis behauptet unmittelbare Nähe ("${m[0]}") — es kann Stunden später kommen`);
      // The other direction: the trigger happened during THIS workday, so a
      // follow-up must not push it into the past. "gestern" is wrong even
      // when it sounds harmless, and it becomes wrong twice over once story
      // flags travel across days in a campaign.
      // An info, not a warning: whether that "gestern" refers to the
      // trigger or to the accountant's tomcat is nothing a pattern can
      // decide. When writing a follow-up event, though, it is still
      // exactly the right question to ask.
      //
      // The whole event is checked, not just the opening: a result text
      // that dates the trigger to yesterday is just as wrong and even
      // harder to catch while reading.
      const timeRef = /(vorgestern|gestern|letzte Woche|vor ein paar Tagen|seit Tagen|heute Morgen|seit heute)/i;
      const allTexts = [
        ['text', ev.text],
        ...Object.entries(ev.nodes ?? {}).map(([k, n]) => [`nodes.${k}.text`, n.text]),
        ...(ev.opts ?? []).map((o, i) => [`opts[${i}].r`, o.r]),
        ...Object.entries(ev.results ?? {}).map(([k, r]) => [`results.${k}.txt`, r.txt])
      ];
      for (const [field, txt] of allTexts) {
        if (typeof txt !== 'string') continue;
        const g = txt.match(timeRef);
        if (g) info(`${ctx} ${field}: Zeitbezug "${g[0]}" im Folge-Ereignis — gilt er wirklich nicht dem Auslöser? Der liegt im selben Arbeitstag.`);
      }
    }
    if (p === 'sidequests' && ev.kind !== 'text' && ev.kind !== 'phone')
      warn(`${ctx}: kind fehlt oder unbekannt ("${ev.kind}") — Dienstgänge brauchen "text" oder "phone"`);
    if (ev.reqStory) (flagsReq.get(ev.reqStory) ?? flagsReq.set(ev.reqStory, []).get(ev.reqStory)).push(ctx);
    if (ev.char && !charNames.has(ev.char)) err(`${ctx}: char "${ev.char}" nicht in DB.chars`);
    // Node-level chars (phone chats): a node's own char must exist too.
    // `char: null` is legitimate - it forces the anonymous initial inside
    // a character chat and must not be reported.
    for (const [nid, node] of Object.entries(ev.nodes ?? {}))
      if (node.char && !charNames.has(node.char)) err(`${ctx} Node "${nid}": char "${node.char}" nicht in DB.chars`);
    if (ev.reqRep) for (const n of Object.keys(ev.reqRep)) if (!charNames.has(n)) err(`${ctx}: reqRep "${n}" nicht in DB.chars`);

    for (const o of ev.opts ?? []) {
      checkOpt(o, ctx);
      if (o.next) noteFlag(o.next, ctx);   // plain event -> story flag
    }

    if (!ev.nodes) continue;

    /* --- Chain-Events --- */
    if (!ev.startNode) { err(`${ctx}: nodes ohne startNode`); continue; }
    if (!ev.nodes[ev.startNode]) err(`${ctx}: startNode "${ev.startNode}" existiert nicht`);

    for (const [nid, node] of Object.entries(ev.nodes)) {
      for (const o of node.opts ?? []) {
        checkOpt(o, `${ctx}#${nid}`);
        if (o.action) continue;
        if (!o.next) { err(`${ctx}#${nid}: Option "${o.t}" ohne next -> Sackgasse`); continue; }
        if (!ev.nodes[o.next] && !ev.results?.[o.next]) err(`${ctx}#${nid}: next "${o.next}" zeigt ins Leere`);
      }
    }
    for (const [rid, res] of Object.entries(ev.results ?? {})) {
      if (res.txt === undefined) err(`${ctx}!${rid}: result ohne txt -> zeigt "undefined"`);
      if (res.next) noteFlag(res.next, `${ctx}!${rid}`);   // chain result -> story flag
      for (const k of ['loot', 'rem']) if (res[k] && !itemIds.has(res[k])) err(`${ctx}!${rid}: ${k} "${res[k]}" unbekannt`);
    }

    /* Erreichbarkeit */
    const reached = new Set([ev.startNode]);
    for (let changed = true; changed;) {
      changed = false;
      for (const nid of [...reached]) {
        for (const o of ev.nodes[nid]?.opts ?? []) {
          if (o.next && !reached.has(o.next)) { reached.add(o.next); changed = true; }
        }
      }
    }
    for (const nid of Object.keys(ev.nodes)) if (!reached.has(nid)) warn(`${ctx}: Node "${nid}" unerreichbar`);
    for (const rid of Object.keys(ev.results ?? {})) if (!reached.has(rid)) warn(`${ctx}: Result "${rid}" unerreichbar`);
  }
}

/* ---------- 2b) Lock safety: options that need no item ---------- */
// An event whose options all carry req or rem can lock itself completely once
// the items are missing - the inventory resets daily, and in a chain the
// player would be stuck.
// Exactly one free option is allowed by design (one to two is the target).
for (const p of POOLS) {
  for (const ev of DB[p]) {
    const ctx = `[${p}/${ev.id}]`;
    const checkFree = (opts, where) => {
      if (!opts?.length) return;
      if (opts.every(o => o.req || o.rem))
        err(`${where}: ALLE ${opts.length} Optionen brauchen ein Item -> Event kann sich komplett sperren`);
    };
    checkFree(ev.opts, ctx);
    for (const [nid, node] of Object.entries(ev.nodes ?? {})) checkFree(node.opts, `${ctx}#${nid}`);
  }
}

/* ---------- 2c) Number grid and time vs. effect ---------- */
// The stat bars move in steps of five (reputation may be finer), no action
// takes less than two minutes, and expensive time without noticeable effect is
// a free fast-forward.
const numCheck = (o, ctx) => {
  const m = o.m ?? o.min;
  for (const k of ['f', 'a', 'c']) {
    const v = o[k];
    if (typeof v === 'number' && v % 5 !== 0) warn(`${ctx}: ${k}:${v} liegt nicht im 5er-Raster`);
  }
  if (typeof m === 'number') {
    if (m < 2) err(`${ctx}: m:${m} — keine Aktion dauert unter 2 Minuten, und Zeit läuft nie rückwärts`);
    const impact = Math.abs(o.f || 0) + Math.abs(o.a || 0) + Math.abs(o.c || 0);
    if (m >= 15 && impact < 10 && !o.loot && !o.rep)
      warn(`${ctx}: m:${m} bei Gesamtwirkung ${impact} — Gratis-Vorspuler ohne Konsequenz`);
  }
};
for (const p of POOLS) {
  for (const ev of DB[p]) {
    const ctx = `[${p}/${ev.id}]`;
    (ev.opts ?? []).forEach((o, i) => numCheck(o, `${ctx} opts[${i}]`));
    for (const [nid, node] of Object.entries(ev.nodes ?? {})) (node.opts ?? []).forEach((o, i) => numCheck(o, `${ctx}#${nid}[${i}]`));
    for (const [rid, res] of Object.entries(ev.results ?? {})) numCheck(res, `${ctx}!${rid}`);
  }
}
for (const e of DB.emails) (e.opts ?? []).forEach((o, i) => numCheck(o, `[emails/${e.id}] opts[${i}]`));

/* ---------- 2d) Bulletin board and intranet ---------- */
// Neither is an event pool, so none of the checks above sees them - but both
// filter their content by reqStory, and a typo there fails silently: the note
// or the post simply never appears, on any save, forever. Feeding their flags
// into flagsReq puts them under the same dead-flag check as everything else.
const reactive = [
  ['board',    (DB.board ?? [])],
  ['intranet', (DB.intranet?.feed ?? [])]
];
for (const [where, entries] of reactive) {
  const seen = new Map();
  for (const e of entries) {
    const ctx = `[${where}/${e.id ?? '(ohne id)'}]`;
    if (!e.id) err(`${ctx}: Eintrag ohne id`);
    else seen.set(e.id, (seen.get(e.id) ?? 0) + 1);
    if (e.reqStory) (flagsReq.get(e.reqStory) ?? flagsReq.set(e.reqStory, []).get(e.reqStory)).push(ctx);
  }
  for (const [id, c] of seen) if (c > 1) err(`Doppelte ID "${id}" in ${where} (${c}x)`);
}

// Every character named as employee of the month has to exist.
for (const name of Object.keys(DB.intranet?.employee ?? {}))
  if (!charNames.has(name)) err(`[intranet/employee] "${name}" nicht in DB.chars`);

/* ---------- 3) Emails ---------- */
const mailIdSeen = new Map();
const subjSeen = new Map();
for (const e of DB.emails) {
  const ctx = `[emails/${e.id ?? e.subj}]`;
  if (!e.id) err(`${ctx}: keine id — usedEmails nutzt die id als Schlüssel!`);
  else mailIdSeen.set(e.id, (mailIdSeen.get(e.id) ?? 0) + 1);
  if (!e.subj) err(`${ctx}: kein subj — die Mail hätte keinen Betreff im Posteingang`);
  else subjSeen.set(e.subj, (subjSeen.get(e.subj) ?? 0) + 1);
  for (const o of e.opts ?? []) {
    checkOpt(o, ctx);
    if (o.next) noteFlag(o.next, ctx);
    if (o.nextEmail && !DB.emails.some(x => x.id === o.nextEmail)) err(`${ctx}: nextEmail "${o.nextEmail}" existiert nicht`);
  }
}
for (const [id, c] of mailIdSeen) if (c > 1) err(`Doppelte Mail-ID "${id}" (${c}x) — usedEmails blockiert beide, nextEmail trifft die falsche`);
for (const [s, c] of subjSeen) if (c > 1) warn(`Doppelter Mail-Betreff "${s}" (${c}x) — nur kosmetisch, wirkt im Spiel aber wie dieselbe Mail`);

/* ---------- 4) Dead story flags ---------- */
for (const [flag, ctxs] of flagsReq) {
  if (!flagsSet.has(flag)) err(`Story-Flag "${flag}" wird NIE gesetzt, aber gefordert von ${ctxs.join(', ')} -> toter Content`);
}

/* ---------- 4b) Orphaned flags: set, but required by nobody ---------- */
// A flag nobody requires is a dead end: the player made a decision that
// leads nowhere. Usually a renamed follow-up event or one that never got
// written.
//
// Some flags are consumed by the engine itself rather than by another event —
// 'party_hub' jumps back to the party hub, 'path_cake_drunk' starts the drunk
// timer. Rather than maintaining an exception list, scan the engine sources for
// the literal flag name; anything that appears there is in use.
const engineSource = ['src/engine.js', 'src/tutorial.js']
    .concat(readdirSync('src/engine').map(f => 'src/engine/' + f))
    .map(f => readFileSync(f, 'utf8'))
    .join('\n');

for (const [flag, wheres] of flagsSetWhere) {
    if (flagsReq.has(flag)) continue;
    if (engineSource.includes(`'${flag}'`) || engineSource.includes(`"${flag}"`)) continue;
    const list = wheres.length > 3 ? `${wheres.slice(0, 3).join(', ')} … (+${wheres.length - 3})` : wheres.join(', ');
    warn(`Story-Flag "${flag}" wird gesetzt, aber von keinem Ereignis gefordert -> Sackgasse (${list})`);
}

/* ---------- 4c) Text quality ---------- */
const PLACEHOLDER = /\b(TODO|TBD|FIXME|XXX|Lorem ipsum|Platzhalter)\b/i;

const checkText = (ctx, field, txt) => {
    if (typeof txt !== 'string') return;

    if (txt !== txt.trim())        warn(`${ctx} ${field}: führendes oder folgendes Leerzeichen`);
    if (/ {2,}/.test(txt))         warn(`${ctx} ${field}: doppeltes Leerzeichen`);
    if (PLACEHOLDER.test(txt))     err (`${ctx} ${field}: Platzhalter im Text`);

    const t = txt.trim();
    if (t.length === 0) { err(`${ctx} ${field}: leerer Text`); return; }

    // Markup in fields that are rendered as plain text.
    // Event and mail texts go through EventView/EmailView, which split them on
    // \n and print them as text - a <br> in there is not a line break, it is
    // four characters the player gets to read. Only the bulletin board, the
    // intranet, the tutorial and the morning moods go through {@html}, and
    // none of them passes through here.
    const markup = t.match(/<\/?(br|b|i|u|p|em|strong|span|div|ul|ol|li|h[1-6])\b[^>]*>/i);
    if (markup) err(`${ctx} ${field}: Auszeichnung "${markup[0]}" in einem Feld, das als reiner Text ausgegeben wird — benutze \\n für einen Absatz`);

    // First-order quotes are single throughout the game: 'so'. Double
    // ones belong inside a quote within a quote. A text with double
    // quotes and no single ones is therefore always first order and
    // departs from the house rule. 96% of the texts follow it; the
    // exceptions grew where a file was single quoted in the source and
    // typing " inside the text was simply the more convenient key.
    if (t.includes('"') && !t.includes("'"))
        warn(`${ctx} ${field}: doppelte Anführungszeichen in erster Ordnung — im Spieltext gilt 'so', doppelte nur verschachtelt`);

    // Two dots are neither a full stop nor an ellipsis, they are a typo.
    if (/(?<!\.)\.\.(?!\.)/.test(t)) warn(`${ctx} ${field}: doppelter Punkt (".." statt "..." oder ".")`);

    // Only prose gets a length check. Button labels are supposed to be terse
    // ("Auflegen.", "Ignorieren") and would otherwise drown the report.
    const isProse = /\.(r|txt|text|body)$|^(text|body)$/.test(field) || field.endsWith('.text');
    // CMD: values are control commands for the engine (open the intranet or
    // the bulletin board), not sentences - they are meant to be short.
    const isCommand = /^CMD:[A-Z_]+$/.test(t);
    if (isProse && !isCommand && t.length < 20) info(`${ctx} ${field}: sehr kurz ("${t}")`);

    // Unbalanced quotation marks suggest a truncated sentence
    for (const q of ['"', '„', '»']) {
        const close = { '"': '"', '„': '“', '»': '«' }[q];
        const open  = (t.match(new RegExp(q === '"' ? '"' : q, 'g')) || []).length;
        const shut  = q === '"' ? open : (t.match(new RegExp(close, 'g')) || []).length;
        if (q === '"' ? open % 2 !== 0 : open !== shut) {
            warn(`${ctx} ${field}: unpaarige Anführungszeichen (${q})`);
            break;
        }
    }
};

// Collect result texts to find duplicates
const resultTexts = new Map();
const noteText = (ctx, field, txt) => {
    checkText(ctx, field, txt);
    if (typeof txt !== 'string') return;
    const key = txt.trim();
    // Short lines are allowed to repeat: "E-Mail kommentarlos gelöscht." is the
    // standard delete action and appears in over a hundred mails by design.
    // Only long, distinctive prose showing up twice is worth a look.
    if (key.length < 60) return;
    if (!resultTexts.has(key)) resultTexts.set(key, []);
    resultTexts.get(key).push(ctx);
};

for (const p of POOLS) {
    for (const ev of DB[p]) {
        const ctx = `[${p}/${ev.id}]`;
        checkText(ctx, 'title', ev.title);
        checkText(ctx, 'text', ev.text);
        (ev.opts ?? []).forEach((o, i) => {
            checkText(ctx, `opts[${i}].t`, o.t);
            noteText(ctx, `opts[${i}].r`, o.r);
        });
        for (const [nid, n] of Object.entries(ev.nodes ?? {})) {
            checkText(ctx, `nodes.${nid}.text`, n.text);
            (n.opts ?? []).forEach((o, i) => checkText(ctx, `nodes.${nid}.opts[${i}].t`, o.t));
        }
        for (const [rid, r] of Object.entries(ev.results ?? {})) noteText(ctx, `results.${rid}.txt`, r.txt);
    }
}
for (const e of DB.emails) {
    const ctx = `[emails/${e.id ?? e.subj}]`;
    checkText(ctx, 'subj', e.subj);
    checkText(ctx, 'body', e.body);
    (e.opts ?? []).forEach((o, i) => {
        checkText(ctx, `opts[${i}].t`, o.t);
        noteText(ctx, `opts[${i}].r`, o.r);
    });
}
for (const [txt, ctxs] of resultTexts) {
    const unique = [...new Set(ctxs)];
    if (unique.length < 2) continue;   // twice inside one event is usually fine
    warn(`Identischer Ergebnistext in ${ctxs.length} Optionen (${unique.join(', ')}): "${txt.slice(0, 55)}…"`);
}

/* ---------- 5) Escaping risks in the inline onclick ---------- */
for (const p of POOLS) {
  for (const ev of DB[p]) {
    for (const o of ev.opts ?? []) {
      if (typeof o.r !== 'string') continue;
      // components/ResultView.svelte renders result texts as plain text, so
      // "&" is entirely harmless in them (it used to warn, which became a
      // false alarm with the Svelte rewrite). Markup, on the other hand, is
      // pointless: it would appear literally in the terminal. URLs need no
      // markup either, the component handles those itself.
      // Quest items are trophies: lootable only, never a requirement. Using
      // one as a condition locks the option for everyone who has not played
      // the matching reputation strand.
      for (const key of ['req', 'rem'])
        if (o[key] && DB.items[o[key]]?.quest)
          err(`[${p}/${ev.id}] opt.${key} verlangt den Quest-Gegenstand "${o[key]}" — Trophäen sind nur lootbar`);
      if (o.r.includes('\\')) warn(`[${p}/${ev.id}] opt.r enthält Backslash`);
      if (/<[a-zA-Z/]/.test(o.r)) err(`[${p}/${ev.id}] opt.r enthält HTML-Tag — Ergebnistexte werden als Klartext ausgegeben, das Markup wäre sichtbar`);
    }
  }
}

/* ---------- 6) Orphaned items ---------- */
const used = new Set();
const collect = o => ['loot', 'req', 'rem'].forEach(k => o[k] && used.add(o[k]));
for (const p of POOLS) for (const ev of DB[p]) {
  (ev.opts ?? []).forEach(collect);
  Object.values(ev.nodes ?? {}).forEach(n => (n.opts ?? []).forEach(collect));
  Object.values(ev.results ?? {}).forEach(collect);
}
DB.emails.forEach(e => (e.opts ?? []).forEach(collect));
for (const id of itemIds) if (!used.has(id)) info(`Item "${id}" (${DB.items[id].name}) wird von keinem Event vergeben/verlangt`);

/* ---------- 7) Mail convention: the delete option ---------- */
// The delete option must carry ignoreEmail: true and sit at the BOTTOM of
// the list. Chain follow-ups without any delete option are fine by design.
for (const ev of DB.emails) {
  const opts = ev.opts ?? [];
  opts.forEach((o, idx) => {
    const isDelete = /Löschen & Ignorieren/.test(o.t ?? '') || o.ignoreEmail;
    if (!isDelete) return;
    if (!o.ignoreEmail) err(`[emails/${ev.id}] Löschen-Option ohne ignoreEmail: true`);
    if (idx !== opts.length - 1) err(`[emails/${ev.id}] Löschen-Option steht nicht an letzter Position`);
  });
}

/* ---------- 8) Orphaned invisible characters ---------- */
// Orphaned variation selectors / zero-width chars are invisible in the UI
// but break every pattern match (see the mail_leak_1 incident). U+FE0F is
// only legitimate directly after an emoji/symbol base character.
{
  const scan = (str, where) => {
    if (typeof str !== 'string') return;
    for (let i = 0; i < str.length; i++) {
      const cp = str.codePointAt(i);
      if (cp === 0x200B || cp === 0xFEFF)
        err(`[${where}] unsichtbares Zeichen U+${cp.toString(16).toUpperCase()} an Position ${i}`);
      if (cp === 0xFE0F) {
        const prev = i > 0 ? str.codePointAt(i - (str.charCodeAt(i - 1) >= 0xDC00 ? 2 : 1)) : 0;
        if (prev < 0x2000 || prev === 0xFE0F)
          err(`[${where}] verwaister Variation-Selektor U+FE0F an Position ${i} ("${str.slice(0, 24)}…")`);
      }
    }
  };
  const walk = (obj, where) => {
    if (typeof obj === 'string') return scan(obj, where);
    if (Array.isArray(obj)) return obj.forEach(v => walk(v, where));
    if (obj && typeof obj === 'object') for (const v of Object.values(obj)) walk(v, where);
  };
  for (const p of POOLS) for (const ev of DB[p]) walk(ev, `${p}/${ev.id}`);
  DB.emails.forEach(ev => walk(ev, `emails/${ev.id}`));
}

/* ---------- 9) Unknown fields ---------- */
// The quietest bug in the data: a misspelt key parses fine, lints clean and is
// silently dropped at runtime - `ep` instead of `rep` cost one sidequest its
// whole reputation effect for two versions. The lists below are what the engine
// actually reads AT THAT PLACE, which is stricter than "the field exists
// somewhere": reqStory on a lunch event is never evaluated (triggerLunch draws
// at random without filtering), req/rem in a mail is never checked, and a node
// option only ever carries t/next - its m, rep or r would go nowhere, because a
// chain applies the values of the RESULT it ends in.
const EVENT_KEYS = {
  _common:    ['id', 'char', 'title', 'text', 'opts', 'startNode', 'nodes', 'results'],
  bossfights: ['timer', 'fail'],
  calls:      ['reqStory', 'webOnly'],
  coffee:     ['reqStory', 'webOnly'],
  server:     ['reqStory', 'webOnly'],
  sidequests: ['reqStory', 'webOnly', 'kind', 'appName'],
  reputation: ['reqStory', 'reqRep'],
  party:      ['loc'],
  lunch:      [],
  tutorial:   ['type', 'step']
};
const OPT_KEYS      = ['t', 'r', 'm', 'f', 'a', 'c', 'rep', 'loot', 'req', 'rem', 'next', 'action'];
const NODE_KEYS     = ['text', 'opts', 'char'];
const NODE_OPT_KEYS = ['t', 'next', 'req', 'rem', 'action'];
// Results accept the legacy names min/fl/al/cr as well; handleChainChoice maps them.
const RESULT_KEYS   = ['txt', 'm', 'f', 'a', 'c', 'min', 'fl', 'al', 'cr', 'rep', 'loot', 'rem', 'next'];
const FAIL_KEYS     = OPT_KEYS.filter(k => k !== 't');
const MAIL_KEYS     = ['id', 'sender', 'subj', 'body', 'opts', 'linked'];
const MAIL_OPT_KEYS = ['t', 'r', 'm', 'f', 'a', 'c', 'rep', 'loot', 'ignoreEmail', 'nextEmail'];

const checkKeys = (obj, allowed, ctx, what) => {
  if (!obj || typeof obj !== 'object') return;
  for (const k of Object.keys(obj)) {
    if (allowed.includes(k)) continue;
    err(`${ctx}: unbekanntes Feld "${k}" ${what} — Tippfehler, oder ein Feld, das die Engine an dieser Stelle nicht liest`);
  }
};

for (const p of POOLS) {
  const eventKeys = [...EVENT_KEYS._common, ...(EVENT_KEYS[p] ?? [])];
  const optKeys = p === 'party' ? [...OPT_KEYS, 'checkPool'] : OPT_KEYS;
  for (const ev of DB[p]) {
    const ctx = `[${p}/${ev.id}]`;
    checkKeys(ev, eventKeys, ctx, 'am Ereignis');
    (ev.opts ?? []).forEach((o, i) => checkKeys(o, optKeys, `${ctx} opts[${i}]`, 'in der Auswahl'));
    for (const [nid, node] of Object.entries(ev.nodes ?? {})) {
      checkKeys(node, NODE_KEYS, `${ctx}#${nid}`, 'am Knoten');
      (node.opts ?? []).forEach((o, i) =>
        checkKeys(o, NODE_OPT_KEYS, `${ctx}#${nid}[${i}]`, 'in der Knoten-Auswahl (Wirkungen gehören ins Result)'));
    }
    for (const [rid, res] of Object.entries(ev.results ?? {}))
      checkKeys(res, RESULT_KEYS, `${ctx}!${rid}`, 'im Result');
    if (ev.fail) checkKeys(ev.fail, FAIL_KEYS, `${ctx}.fail`, 'im Zeitablauf');
  }
}
for (const ev of DB.emails) {
  const ctx = `[emails/${ev.id}]`;
  checkKeys(ev, MAIL_KEYS, ctx, 'an der Mail');
  (ev.opts ?? []).forEach((o, i) => checkKeys(o, MAIL_OPT_KEYS, `${ctx} opts[${i}]`, 'in der Auswahl'));
}

/* ---------- 10) Result keys: the res_ prefix ---------- */
// components/EventView.svelte hangs a "..." badge on every chain option whose
// next does NOT start with res_ - the badge tells the player the conversation
// goes on. A result named `truth` therefore promises a follow-up and then hangs
// up. Only an info: the existing pools are split roughly half and half, and
// renaming a result means renaming every next that points at it.
{
  const stray = [];
  for (const p of POOLS)
    for (const ev of DB[p])
      for (const rid of Object.keys(ev.results ?? {}))
        if (!rid.startsWith('res_')) stray.push(`${p}/${ev.id}!${rid}`);
  if (stray.length)
    info(`${stray.length} Result-Schlüssel ohne res_-Präfix — die Option dorthin trägt im Terminal das "..."-Abzeichen, obwohl sie das Gespräch beendet (z. B. ${stray.slice(0, 4).join(', ')})`);
}

/* ---------- 11) The diary ---------- */
// data_diary.js keeps its conditions next to its texts, which is what makes
// writing a new line a data change. The price is that a condition is code, so
// it gets exercised here: every fragment is run against a spread of synthetic
// days. A condition that throws would otherwise only surface at 16:30 on
// somebody's screen, and one that can never fit is a line nobody ever reads.
{
  const CHOICE_SLOTS = ['mood', 'place', 'ending', 'postscript'];
  const LIST_SLOTS = { encounters: 'encountersIntro', habits: 'habitsIntro', warnings: 'warningsIntro' };
  const ENDS = ['WIN', 'RAGE', 'TICKETS', 'FIRED', 'PARTY'];
  const achIds = new Set(DB.achievements.map(a => a.id));

  // A spread of days: every ending, both warnings, all three difficulties,
  // blind and sighted, and achievement/item sets from nothing to everything.
  //
  // The three event counts have to differ from one another, not just grow
  // together: a day is a server day or a phone day precisely because one
  // number outgrows the others, and every condition on the place slot compares
  // them. With server === calls === quests none of them could ever fit, and
  // the check reported three perfectly good fragments as unreachable.
  const SHAPES = [
    { server: 0,  calls: 0,  quests: 0  },   // nothing happened yet
    { server: 6,  calls: 5,  quests: 4  },   // an ordinary day
    { server: 9,  calls: 2,  quests: 3  },   // hiding in the server room
    { server: 2,  calls: 9,  quests: 3  },   // the phone never stopped
    { server: 2,  calls: 2,  quests: 9  },   // out on errands all day
    { server: 14, calls: 14, quests: 14 }    // a very long day
  ];
  // The figures of a day. Every fact a condition can read has to appear here
  // with a low, a middling and a high value - a fact that is always undefined
  // makes every condition on it false, and the check would report perfectly
  // good fragments as unreachable.
  const FIGURES = [
    { events: 4,  boss: 0, lunch: false, leet: false, coffee: 0, mailsIgnored: 0,
      tickets: 0,  excusesUsed: 0, items: 0,  endHour: 9,  peakHour: 9,  peakValue: 10,
      upBy: 0,  downBy: 0,  streak: 0 },
    { events: 18, boss: 1, lunch: true,  leet: false, coffee: 2, mailsIgnored: 1,
      tickets: 3,  excusesUsed: 1, items: 3,  endHour: 13, peakHour: 15, peakValue: 65,
      upBy: 7,  downBy: 6,  streak: 3 },
    { events: 34, boss: 2, lunch: true,  leet: true,  coffee: 6, mailsIgnored: 5,
      tickets: 9,  excusesUsed: 2, items: 7,  endHour: 16, peakHour: 10, peakValue: 92,
      upBy: 20, downBy: 25, streak: 7 }
  ];

  // Seeded, so a run is reproducible: the same 300 days every time, and a
  // fragment that only fits an unusual combination still finds one.
  let seed = 20260805;
  const rnd = () => (seed = (seed * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
  const between = (lo, hi) => lo + Math.floor(rnd() * (hi - lo + 1));

  const days = [];
  const achList = [...achIds], itemList = [...itemIds];

  for (let i = 0; i < 300; i++) {
    const end = ENDS[between(0, ENDS.length - 1)];
    const peakValue = between(0, 100);
    const owned = new Set(achList.filter(() => rnd() < 0.3));
    const carried = new Set(itemList.filter(() => rnd() < 0.3));
    days.push({
      end, difficulty: ['easy', 'normal', 'hard'][between(0, 2)],
      survived: end === 'WIN' || end === 'PARTY',
      server: between(0, 14), calls: between(0, 14), quests: between(0, 14),
      events: between(0, 40), boss: between(0, 3),
      lunch: rnd() < 0.6, leet: rnd() < 0.3,
      coffee: between(0, 8), mailsIgnored: between(0, 6),
      tickets: between(0, 10), excusesUsed: between(0, 3), items: between(0, 8),
      // A day that was survived always ends at half past four; only a day
      // that ended early can end at any hour.
      endHour: (end === 'WIN' || end === 'PARTY') ? 16 : between(8, 16),
      peakHour: between(8, 16), peakValue,
      calm: peakValue < 40,
      upName: 'Kevin', upBy: between(0, 30),
      downName: 'Chantal', downBy: between(0, 30),
      streak: between(0, 9),
      rageWarned: rnd() < 0.4, chefWarned: rnd() < 0.4, blind: rnd() < 0.3,
      ach: (id) => owned.has(id), item: (id) => carried.has(id),
      hasEncounters: rnd() < 0.5, hasHabits: rnd() < 0.5
    });
  }

  for (const end of ENDS) {
    for (const difficulty of ['easy', 'normal', 'hard']) {
      for (const share of [0, 0.5, 1]) {
        const owned = new Set(achList.filter((_, i) => share === 1 || (share === 0.5 && i % 2 === 0)));
        const carried = new Set(itemList.filter((_, i) => share === 1 || (share === 0.5 && i % 3 === 0)));
        for (const shape of SHAPES) {
          for (const figures of FIGURES) {
            days.push({
              end, difficulty, survived: end === 'WIN' || end === 'PARTY',
              ...shape, ...figures,
              calm: figures.peakValue < 40,
              upName: 'Kevin', downName: 'Chantal',
              rageWarned: share > 0, chefWarned: share === 1, blind: share > 0,
              ach: (id) => owned.has(id), item: (id) => carried.has(id),
              hasEncounters: share > 0, hasHabits: share === 1
            });
          }
        }
      }
    }
  }

  const seenIds = new Set();
  for (const [slot, fragments] of Object.entries(DB.diary)) {
    if (!Array.isArray(fragments)) { err(`[diary/${slot}]: kein Array`); continue; }

    fragments.forEach((f, i) => {
      const ctx = `[diary/${slot}#${f.id ?? i}]`;
      if (!f.id) err(`${ctx}: Baustein ohne id — die Wiederholungs-Sperre merkt sich ids`);
      else if (seenIds.has(f.id)) err(`${ctx}: id "${f.id}" gibt es doppelt`);
      else seenIds.add(f.id);

      if (typeof f.when !== 'function') { err(`${ctx}: when fehlt oder ist keine Funktion`); return; }
      if (!Array.isArray(f.lines) || f.lines.length === 0) { err(`${ctx}: keine Zeilen`); return; }
      f.lines.forEach((line, k) => {
        if (typeof line !== 'string' || !line.trim()) err(`${ctx} lines[${k}]: leer`);
        else checkText(ctx, `lines[${k}]`, line);
      });

      // Namen, die es nicht gibt: ach('ach_tippfehler') zündet sonst nie und
      // fällt nur dadurch auf, dass eine Zeile nie erscheint.
      const source = f.when.toString();
      for (const [, id] of source.matchAll(/\bach\(\s*['"]([^'"]+)['"]\s*\)/g))
        if (!achIds.has(id)) err(`${ctx}: Erfolg "${id}" existiert nicht`);
      for (const [, id] of source.matchAll(/\bitem\(\s*['"]([^'"]+)['"]\s*\)/g))
        if (!itemIds.has(id)) err(`${ctx}: Gegenstand "${id}" existiert nicht`);

      let fitted = 0;
      for (const day of days) {
        try { if (f.when(day)) fitted++; }
        catch (e) { err(`${ctx}: Bedingung stolpert (${e.message})`); return; }
      }
      if (fitted === 0) warn(`${ctx}: die Bedingung passt auf keinen denkbaren Tag — die Zeilen erscheinen nie`);

      // Platzhalter: der Auftakt einer Aufzählung braucht {list}.
      if (Object.values(LIST_SLOTS).includes(slot))
        f.lines.forEach((line, k) => {
          if (!line.includes('{list}')) err(`${ctx} lines[${k}]: {list} fehlt — die Aufzählung hätte keinen Platz`);
        });
      else
        f.lines.forEach((line, k) => {
          if (line.includes('{list}')) err(`${ctx} lines[${k}]: {list} steht ausserhalb eines Aufzählungs-Auftakts`);
        });
    });
  }

  // Ein Wahl-Platz ohne passenden Baustein liefert eine leere Zeile. Fuer den
  // Abschluss ist das der schlimmste Fall: der Tag endet ohne Schlusssatz.
  for (const slot of CHOICE_SLOTS) {
    if (!DB.diary[slot]) { err(`[diary/${slot}]: Platz fehlt`); continue; }
    if (slot === 'postscript') continue;   // darf leer bleiben, ist ein Nachsatz
    const orphans = days.filter(d => !DB.diary[slot].some(f => { try { return f.when(d); } catch { return false; } }));
    if (orphans.length) {
      const ends = [...new Set(orphans.map(d => d.end))].join(', ');
      err(`[diary/${slot}]: kein Baustein passt für ${ends} — der Absatz bliebe leer`);
    }
  }

  // Jeder Sammelplatz braucht seinen Auftakt, sonst stehen die Klauseln nackt da.
  for (const [listSlot, introSlot] of Object.entries(LIST_SLOTS)) {
    if (!DB.diary[listSlot]) err(`[diary/${listSlot}]: Platz fehlt`);
    if (!DB.diary[introSlot]) err(`[diary/${introSlot}]: Auftakt zu ${listSlot} fehlt`);
  }

  const total = Object.values(DB.diary).flat().reduce((n, f) => n + (f.lines?.length ?? 0), 0);
  info(`Tagebuch: ${Object.values(DB.diary).flat().length} Bausteine mit ${total} Zeilen in ${Object.keys(DB.diary).length} Plätzen`);
}

/* ---------- Output ---------- */
const section = (title, list, sym) => {
  console.log(`\n${title} (${list.length})`);
  list.forEach(m => console.log(` ${sym} ${m}`));
};
section('FEHLER', errors, '✗');
section('WARNUNGEN', warns, '!');
section('INFO', infos, 'i');
console.log(`\n${errors.length ? '❌ Fehler gefunden.' : '✅ Daten sind sauber.'}`);
process.exit(errors.length ? 1 : 0);
