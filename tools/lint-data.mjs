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
 *  - nextEmail -> nicht existierende Mail, doppelte Mail-Betreffs
 *  - Zeichen in opt.r, die den inline-onclick-String zerlegen können
 */

import { DB, ensure } from '../data.js';

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
const flagsSet = new Set();
const flagsReq = new Map();

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

    for (const o of ev.opts ?? []) checkOpt(o, ctx);

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
      if (res.next) flagsSet.add(res.next);
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
const subjSeen = new Map();
for (const e of DB.emails) {
  const ctx = `[emails/${e.id ?? e.subj}]`;
  if (!e.subj) err(`${ctx}: kein subj — usedEmails nutzt subj als Schlüssel!`);
  else subjSeen.set(e.subj, (subjSeen.get(e.subj) ?? 0) + 1);
  for (const o of e.opts ?? []) {
    checkOpt(o, ctx);
    if (o.nextEmail && !DB.emails.some(x => x.id === o.nextEmail)) err(`${ctx}: nextEmail "${o.nextEmail}" existiert nicht`);
  }
}
for (const [s, c] of subjSeen) if (c > 1) warn(`Doppelter Mail-Betreff "${s}" (${c}x) — blockiert sich gegenseitig über usedEmails`);

/* ---------- 4) Tote Story-Flags ---------- */
for (const [flag, ctxs] of flagsReq) {
  if (!flagsSet.has(flag)) err(`Story-Flag "${flag}" wird NIE gesetzt, aber gefordert von ${ctxs.join(', ')} -> toter Content`);
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
