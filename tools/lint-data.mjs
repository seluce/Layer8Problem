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
 *  - chain events: next going nowhere, unreachable nodes/results, dead ends
 *  - nextEmail pointing at a missing mail, duplicate mail ids and subjects
 *  - characters in opt.r that could break the inline onclick string
 */

import { readFileSync, readdirSync } from 'fs';
import { DB, ensure } from '../src/data.js';

// The event pools load lazily at runtime (see data.js); pull them all in first.
await ensure('board', 'bossfights', 'calls', 'coffee', 'emails', 'intranet', 'lunch', 'party', 'reputation', 'server', 'sidequests');

const errors = [], warns = [], infos = [];
const err = m => errors.push(m), warn = m => warns.push(m), info = m => infos.push(m);

const POOLS = ['bossfights', 'calls', 'coffee', 'lunch', 'party', 'reputation', 'server', 'sidequests', 'tutorial'];
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
    // Follow-up events can arrive hours after their trigger, or never. Texts
    // claiming immediate proximity are wrong in that case.
    if (ev.reqStory && ev.text) {
      const m = ev.text.match(/(Sekunden später|Minuten später|Kaum (hast|bist|warst)|Keine (Minute|Sekunde)|Sofort danach|Direkt (danach|im Anschluss)|Im selben Moment|Postwendend|Kurz darauf)/);
      if (m) warn(`${ctx}: Folge-Ereignis behauptet unmittelbare Nähe ("${m[0]}") — es kann Stunden später kommen`);
    }
    if (p === 'sidequests' && ev.kind !== 'text' && ev.kind !== 'phone')
      warn(`${ctx}: kind fehlt oder unbekannt ("${ev.kind}") — Dienstgänge brauchen "text" oder "phone"`);
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

/* ---------- 2b) Sperr-Sicherheit: item-freie Optionen ---------- */
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

/* ---------- 2c) Zahlen-Raster + Zeit-Wirkung ---------- */
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

/* ---------- 2d) Schwarzes Brett & Intranet ---------- */
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
