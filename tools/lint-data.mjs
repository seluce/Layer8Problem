#!/usr/bin/env node
/**
 * Layer8Problem – Daten-Linter
 * ---------------------------------------------------------------
 * Ablage:  tools/lint-data.mjs   (im Repo-Root ausführen)
 * Aufruf:  node tools/lint-data.mjs
 * Exit 1 bei Fehlern -> direkt als GitHub-Action verwendbar.
 *
 * Prüft alles, was zur Laufzeit still fehlschlägt:
 *  - doppelte Event-IDs (usedIDs ist EIN globales Set über alle Pools!)
 *  - loot/req/rem, die auf nicht existierende Items zeigen
 *  - char/reqRep/rep-Namen, die nicht in DB.chars stehen
 *  - Story-Flags, die gefordert, aber nie gesetzt werden (= toter Content)
 *  - Chain-Events: next -> ins Leere, unerreichbare Nodes/Results, Sackgassen
 *  - nextEmail -> nicht existierende Mail, doppelte Mail-IDs/-Betreffs
 *  - Zeichen in opt.r, die den inline-onclick-String zerlegen können
 */

import { readFileSync, readdirSync } from 'fs';
import { DB, ensure } from '../src/data.js';

// The event pools load lazily at runtime (see data.js); pull them all in first.
await ensure('bossfights', 'calls', 'coffee', 'emails', 'party', 'reputation', 'server', 'sidequests');

const errors = [], warns = [], infos = [];
const err = m => errors.push(m), warn = m => warns.push(m), info = m => infos.push(m);

const POOLS = ['bossfights', 'calls', 'coffee', 'party', 'reputation', 'server', 'sidequests', 'tutorial'];
const itemIds = new Set(Object.keys(DB.items));
const charNames = new Set(DB.chars.map(c => c.name));

/* ---------- 1) Event-IDs: eindeutig über ALLE Pools ---------- */
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

/* ---------- 2) Referenzen + Story-Flags ---------- */
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
  if (o.t === undefined && o.btn === undefined) err(`${ctx}: Option ohne Button-Text`);
  for (const [k, label] of [['loot', 'loot'], ['req', 'req'], ['rem', 'rem']]) {
    if (o[k] && !itemIds.has(o[k])) err(`${ctx}: ${label} "${o[k]}" existiert nicht in DB.items`);
  }
  if (o.rep) for (const n of Object.keys(o.rep)) if (!charNames.has(n)) err(`${ctx}: rep-Charakter "${n}" nicht in DB.chars`);
  if (o.next) flagsSet.add(o.next);
};

for (const p of POOLS) {
  for (const ev of DB[p]) {
    const ctx = `[${p}/${ev.id}]`;
    if (ev.reqStory) (flagsReq.get(ev.reqStory) ?? flagsReq.set(ev.reqStory, []).get(ev.reqStory)).push(ctx);
    if (ev.char && !charNames.has(ev.char)) err(`${ctx}: char "${ev.char}" nicht in DB.chars`);
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

/* ---------- 3) E-Mails ---------- */
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

/* ---------- 4) Tote Story-Flags ---------- */
for (const [flag, ctxs] of flagsReq) {
  if (!flagsSet.has(flag)) err(`Story-Flag "${flag}" wird NIE gesetzt, aber gefordert von ${ctxs.join(', ')} -> toter Content`);
}

/* ---------- 4b) Verwaiste Flags: gesetzt, aber von niemandem gefordert ---------- */
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

/* ---------- 4c) Textqualität ---------- */
const PLACEHOLDER = /\b(TODO|TBD|FIXME|XXX|Lorem ipsum|Platzhalter)\b/i;

const checkText = (ctx, field, txt) => {
    if (typeof txt !== 'string') return;

    if (txt !== txt.trim())        warn(`${ctx} ${field}: führendes oder folgendes Leerzeichen`);
    if (/ {2,}/.test(txt))         warn(`${ctx} ${field}: doppeltes Leerzeichen`);
    if (PLACEHOLDER.test(txt))     err (`${ctx} ${field}: Platzhalter im Text`);

    const t = txt.trim();
    if (t.length === 0) { err(`${ctx} ${field}: leerer Text`); return; }

    // Only prose gets a length check. Button labels are supposed to be terse
    // ("Auflegen.", "Ignorieren") and would otherwise drown the report.
    const isProse = /\.(r|txt|text|body)$|^(text|body)$/.test(field) || field.endsWith('.text');
    if (isProse && t.length < 20) info(`${ctx} ${field}: sehr kurz ("${t}")`);

    // Unpaarige Anführungszeichen deuten auf einen abgeschnittenen Satz hin
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

// Ergebnistexte sammeln, um Dubletten zu finden
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
        checkText(ctx, `opts[${i}].btn`, o.btn ?? o.t);
        noteText(ctx, `opts[${i}].r`, o.r);
    });
}
for (const [txt, ctxs] of resultTexts) {
    const unique = [...new Set(ctxs)];
    if (unique.length < 2) continue;   // twice inside one event is usually fine
    warn(`Identischer Ergebnistext in ${ctxs.length} Optionen (${unique.join(', ')}): "${txt.slice(0, 55)}…"`);
}

/* ---------- 5) Escaping-Risiken im inline-onclick ---------- */
for (const p of POOLS) {
  for (const ev of DB[p]) {
    for (const o of ev.opts ?? []) {
      if (typeof o.r !== 'string') continue;
      if (o.r.includes('\\')) warn(`[${p}/${ev.id}] opt.r enthält Backslash -> zerlegt den onclick-String`);
      if (/<[a-zA-Z/]/.test(o.r)) warn(`[${p}/${ev.id}] opt.r enthält HTML-Tag`);
      if (o.r.includes('&') && !/&(amp|quot|lt|gt|nbsp|#\d+);/.test(o.r)) warn(`[${p}/${ev.id}] opt.r enthält nacktes "&"`);
    }
  }
}

/* ---------- 6) Verwaiste Items ---------- */
const used = new Set();
const collect = o => ['loot', 'req', 'rem'].forEach(k => o[k] && used.add(o[k]));
for (const p of POOLS) for (const ev of DB[p]) {
  (ev.opts ?? []).forEach(collect);
  Object.values(ev.nodes ?? {}).forEach(n => (n.opts ?? []).forEach(collect));
  Object.values(ev.results ?? {}).forEach(collect);
}
DB.emails.forEach(e => (e.opts ?? []).forEach(collect));
for (const id of itemIds) if (!used.has(id)) info(`Item "${id}" (${DB.items[id].name}) wird von keinem Event vergeben/verlangt`);

/* ---------- Ausgabe ---------- */
const section = (title, list, sym) => {
  console.log(`\n${title} (${list.length})`);
  list.forEach(m => console.log(` ${sym} ${m}`));
};
section('FEHLER', errors, '✗');
section('WARNUNGEN', warns, '!');
section('INFO', infos, 'i');
console.log(`\n${errors.length ? '❌ Fehler gefunden.' : '✅ Daten sind sauber.'}`);
process.exit(errors.length ? 1 : 0);
