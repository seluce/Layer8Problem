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
import { DB, ensure, loadCore } from '../src/data.js';
/**
 * Language (6.0): the pools live under src/data/<lang>. Pass --lang=en to run
 * against the English tree; without it the German source is checked. The core
 * tier is no longer a static import, so loadCore() has to be awaited first.
 *
 * The flag is removed from argv afterwards. Several tools in here read
 * positional arguments - a run count, a list of pools - and would otherwise
 * take "--lang=en" for one of them.
 */
const LANG_ARG = process.argv.find(a => a.startsWith('--lang='));
const LANG = LANG_ARG ? LANG_ARG.slice(7) : 'de';
if (LANG_ARG) process.argv.splice(process.argv.indexOf(LANG_ARG), 1);
if (!['de', 'en'].includes(LANG)) {
    console.error(`Unknown language "${LANG}". Allowed: de, en`);
    process.exit(2);
}
await loadCore(LANG);

// The event pools load lazily at runtime (see data.js); pull them all in first.
await ensure('board', 'bossfights', 'calls', 'coffee', 'compendium', 'diary', 'emails', 'intranet', 'lore', 'lunch', 'meetings', 'party', 'reputation', 'server', 'sidequests');

const errors = [], warns = [], infos = [];
const err = m => errors.push(m), warn = m => warns.push(m), info = m => infos.push(m);

const POOLS = ['bossfights', 'calls', 'coffee', 'lunch', 'meetings', 'party', 'reputation', 'server', 'sidequests', 'tutorial'];
const itemIds = new Set(Object.keys(DB.items));
// PLAYER is a sentinel, not a name: the player's display name is translated
// ("Du (Müller)" / "You (Miller)"), so it cannot double as its own key the way
// the seven colleagues' names do. See src/engine/chars.js.
const charNames = new Set([...DB.chars.map(c => c.name), 'PLAYER']);

/* ---------- 1) Event ids: unique across ALL pools ---------- */
const idMap = new Map();
for (const p of POOLS) {
  for (const ev of DB[p]) {
    if (!ev.id) { err(`[${p}] event with no id: "${ev.title}"`); continue; }
    (idMap.get(ev.id) ?? idMap.set(ev.id, []).get(ev.id)).push(p);
  }
}
for (const [id, pools] of idMap) {
  if (pools.length > 1) err(`duplicate event id "${id}" in ${pools.join(' + ')} - usedIDs blocks both at once`);
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
  if (o.t === undefined) err(`${ctx}: option with no button text`);
  // In the messenger a pair of brackets already says "this is an action, not a
  // message". The System: prefix in front of it was historical and cost eight
  // characters of a very narrow bubble. It stays allowed inside chat texts,
  // where it is the messenger's own notice rather than a label.
  if (/^\s*\[\s*System\s*:/i.test(o.t ?? ''))
    err(`${ctx}: caption with "[System: …]" - in a chat, actions carry the square brackets alone`);
  for (const [k, label] of [['loot', 'loot'], ['req', 'req'], ['rem', 'rem']]) {
    if (o[k] && !itemIds.has(o[k])) err(`${ctx}: ${label} "${o[k]}" does not exist in DB.items`);
  }
  // req and rem both demand the item; they differ only in whether it
  // survives (EventView.lockReason gates on either). Both on the same item
  // is therefore redundant - and worse, it hides the answer to the one
  // question that matters when reading the data: does the player lose it?
  if (o.req && o.rem && o.req === o.rem)
    err(`${ctx}: req and rem both on "${o.req}" - the two together contradict each other. If the item stays, req alone; if it is handed over or used up, rem alone.`);
  if (o.rep) for (const n of Object.keys(o.rep)) if (!charNames.has(n)) err(`${ctx}: rep character "${n}" is not in DB.chars`);
  if (o.next) flagsSet.add(o.next);
};

for (const p of POOLS) {
  for (const ev of DB[p]) {
    const ctx = `[${p}/${ev.id}]`;
    // Follow-up events can arrive hours after their trigger, or never. Texts
    // claiming immediate proximity are wrong in that case.
    if (ev.reqStory && ev.text) {
      const m = ev.text.match(/(Sekunden später|Minuten später|Kaum (hast|bist|warst)|Keine (Minute|Sekunde)|Sofort danach|Direkt (danach|im Anschluss)|Im selben Moment|Postwendend|Kurz darauf)/);
      if (m) warn(ev.reqStoryAge != null
        ? `${ctx}: a follow-up with reqStoryAge claims to happen right afterwards ("${m[0]}") - the trigger is at least one night ago`
        : `${ctx}: a follow-up claims to happen right afterwards ("${m[0]}") - it can come hours later`);
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
      //
      // Reviewed and found fine (4.1.0) - each of these time references
      // points at something other than the trigger, so the question is
      // answered and need not be asked again:
      //   call_hotline_queue_2b    "kein Gestern" is figurative
      //   cof_stolen_sandwich_2c   Markus' absence yesterday is backstory
      //   rep_egon_story_2c        Egon's revenge started today - trigger was today
      //   rep_elster_simple_good_2c  the dog video is from yesterday, unrelated
      //   srv_legacy_tape_2ab/2c   the tape holds yesterday's backup (says so in the trigger)
      //   srv_disco_led_2c         same: the latest backup is yesterday's
      //   srv_fremder_stick_2c     musical since today - trigger was today
      const timeRefReviewed = new Set([
        'call_hotline_queue_2b', 'cof_stolen_sandwich_2c', 'rep_egon_story_2c',
        'rep_elster_simple_good_2c', 'srv_legacy_tape_2ab', 'srv_legacy_tape_2c',
        'srv_disco_led_2c', 'srv_fremder_stick_2c'
      ]);
      const timeRef = /(vorgestern|gestern|letzte Woche|vor ein paar Tagen|seit Tagen|heute Morgen|seit heute)/i;
      const allTexts = [
        ['text', ev.text],
        ...Object.entries(ev.nodes ?? {}).map(([k, n]) => [`nodes.${k}.text`, n.text]),
        ...(ev.opts ?? []).map((o, i) => [`opts[${i}].r`, o.r]),
        ...Object.entries(ev.results ?? {}).map(([k, r]) => [`results.${k}.txt`, r.txt])
      ];
      for (const [field, txt] of allTexts) {
        if (typeof txt !== 'string') continue;
        if (timeRefReviewed.has(ev.id)) continue;
        // With reqStoryAge the trigger really IS days ago - "gestern" is
        // then exactly right, so the question below only applies to
        // same-day follow-ups.
        if (ev.reqStoryAge != null) continue;
        const g = txt.match(timeRef);
        if (g) info(`${ctx} ${field}: a time reference "${g[0]}" in a follow-up - does it really not refer to the trigger? That is in the same working day.`);
      }
    }
    // Dreiteiler predicates (v5.0): age needs a flag, ranges must be
    // playable, and Friday-only is a dangling-chain trap (random draws
    // compete against the whole pool on a single day).
    if (ev.reqStoryAge != null && !ev.reqStory)
      err(`${ctx}: reqStoryAge without reqStory - an age needs a flag`);
    if (ev.reqStoryAge != null && (!Number.isInteger(ev.reqStoryAge) || ev.reqStoryAge < 1 || ev.reqStoryAge > 4))
      err(`${ctx}: reqStoryAge ${ev.reqStoryAge} - 1 to 4 is allowed (nights since the trigger)`);
    if (ev.reqWeekDayMin != null && (!Number.isInteger(ev.reqWeekDayMin) || ev.reqWeekDayMin < 2 || ev.reqWeekDayMin > 5))
      err(`${ctx}: reqWeekDayMin ${ev.reqWeekDayMin} - 2 to 5 is allowed (Monday would have no effect)`);
    if (ev.reqWeekDayMin === 5)
      warn(`${ctx}: reqWeekDayMin 5 - Friday alone is a dangling trap, the event competes on one single day against the whole pool. Better 4.`);
    // Events in the random pools fire at ANY time of the workday - a text
    // that pins the scene to a clock time ("Um kurz nach elf zuckt das
    // Licht") is wrong for most draws. References to before 08:00 or to
    // the evening are fine, the reviewed set lists them - same pattern as
    // timeRefReviewed above.
    if (['coffee', 'server', 'calls', 'sidequests', 'reputation', 'bossfights'].includes(p)) {
      const clockReviewed = new Set([
        'call_elster_budget_trap_1',  // expired at 08:00 - the day starts then, always past
        'srv_falle_update',           // 23:00 at home - future reference
        'cof_markus_flex_2c',         // 6:00 voice messages - habitual, always before work
        'call_falle_werkstudent',     // 23:40 login timestamp - a log datum, always after hours
        'call_kalender_geist',        // "jeden Dienstag um 14 Uhr" - a calendar datum, not the scene
        'call_geistertermin',         // same: the recurring appointment's slot
        'sq_raum_phoenix_2c',         // 17:58 auto-reply - mail timestamp after closing time
        'sq_falle_meeting',           // 16:41 - after closing time, always future or datum
        'sq_phone_gabi_intel'         // the whole quest is built around a 14:00 meeting; drawn
                                      // after 14:00 the premise limps - legacy, left as is
      ]);
      if (!clockReviewed.has(ev.id)) {
        const clockRe = /\b(?:um|gegen)\s+(?:kurz\s+(?:nach|vor)\s+)?(?:halb\s+)?(?:\d{1,2}(?::\d{2})?\s*Uhr\b|\d{1,2}:\d{2}\b|(?:acht|neun|zehn|elf|zwölf)\b(?!\s*(?:Prozent|Euro|Grad|Minuten|Sekunden|Stunden|Tage|Jahre|Mal)))/i;
        const clockTexts = [
          ['text', ev.text],
          ...(ev.opts ?? []).map((o, i) => [`opts[${i}].r`, o.r]),
          ...Object.entries(ev.nodes ?? {}).map(([k, n]) => [`nodes.${k}.text`, n.text]),
          ...Object.entries(ev.results ?? {}).map(([k, r]) => [`results.${k}.txt`, r.txt])
        ];
        for (const [field, txt] of clockTexts) {
          if (typeof txt !== 'string') continue;
          const c = txt.match(clockRe);
          if (c) warn(`${ctx} ${field}: a clock time "${c[0].trim()}" - the event can be drawn at any hour. A past before 8:00, or an evening or future, is fine: enter it in clockReviewed then.`);
        }
      }
    }
    if (p === 'sidequests' && ev.kind !== 'text' && ev.kind !== 'phone')
      warn(`${ctx}: kind missing or unknown ("${ev.kind}") - errands need "text" or "phone"`);
    if (ev.reqStory) (flagsReq.get(ev.reqStory) ?? flagsReq.set(ev.reqStory, []).get(ev.reqStory)).push(ctx);
    if (ev.char && !charNames.has(ev.char)) err(`${ctx}: char "${ev.char}" is not in DB.chars`);
    // Node-level chars (phone chats): a node's own char must exist too.
    // `char: null` is legitimate - it forces the anonymous initial inside
    // a character chat and must not be reported.
    // EXCEPT the meetings pool: its consultants are meeting-local voices ON
    // PURPOSE (no data_chars entry, no reputation, no team view - design
    // 8.1); EventView renders them as name plus initials. Real characters in
    // meetings stay protected through the rep key check above.
    if (p !== 'meetings')
      for (const [nid, node] of Object.entries(ev.nodes ?? {}))
        if (node.char && !charNames.has(node.char)) err(`${ctx} node "${nid}": char "${node.char}" is not in DB.chars`);
    if (ev.reqRep) for (const n of Object.keys(ev.reqRep)) if (!charNames.has(n)) err(`${ctx}: reqRep "${n}" is not in DB.chars`);

    for (const o of ev.opts ?? []) {
      checkOpt(o, ctx);
      if (o.next) noteFlag(o.next, ctx);   // plain event -> story flag
    }

    if (!ev.nodes) continue;

    /* --- Chain-Events --- */
    if (!ev.startNode) { err(`${ctx}: nodes without a startNode`); continue; }
    if (!ev.nodes[ev.startNode]) err(`${ctx}: startNode "${ev.startNode}" does not exist`);

    for (const [nid, node] of Object.entries(ev.nodes)) {
      for (const o of node.opts ?? []) {
        checkOpt(o, `${ctx}#${nid}`);
        if (o.action) continue;
        if (!o.next) { err(`${ctx}#${nid}: option "${o.t}" has no next -> dead end`); continue; }
        if (!ev.nodes[o.next] && !ev.results?.[o.next]) err(`${ctx}#${nid}: next "${o.next}" leads nowhere`);
      }
    }
    for (const [rid, res] of Object.entries(ev.results ?? {})) {
      if (res.txt === undefined) err(`${ctx}!${rid}: result without txt -> shows "undefined"`);
      if (res.next) noteFlag(res.next, `${ctx}!${rid}`);   // chain result -> story flag
      for (const k of ['loot', 'rem']) if (res[k] && !itemIds.has(res[k])) err(`${ctx}!${rid}: ${k} "${res[k]}" unbekannt`);
    }

    /* Erreichbarkeit */
    // startNodeGala is a second entry point (meetings, design 8.1).
    const reached = new Set([ev.startNode, ev.startNodeGala].filter(Boolean));
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
        err(`${where}: ALL ${opts.length} options need an item -> the event can lock itself completely`);
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
  const m = o.m;
  for (const k of ['l', 'a', 'b']) {
    const v = o[k];
    if (typeof v === 'number' && v % 5 !== 0) warn(`${ctx}: ${k}:${v} is off the grid of five`);
  }
  if (typeof m === 'number') {
    if (m < 2) err(`${ctx}: m:${m} - no action takes under 2 minutes, and time never runs backwards`);
    const impact = Math.abs(o.l || 0) + Math.abs(o.a || 0) + Math.abs(o.b || 0);
    if (m >= 15 && impact < 10 && !o.loot && !o.rep)
      warn(`${ctx}: m:${m} at a total impact of ${impact} - a free fast-forward with no consequence`);
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
    const ctx = `[${where}/${e.id ?? '(no id)'}]`;
    if (!e.id) err(`${ctx}: entry with no id`);
    else seen.set(e.id, (seen.get(e.id) ?? 0) + 1);
    if (e.reqStory) (flagsReq.get(e.reqStory) ?? flagsReq.set(e.reqStory, []).get(e.reqStory)).push(ctx);
  }
  for (const [id, c] of seen) if (c > 1) err(`Doppelte ID "${id}" in ${where} (${c}x)`);
}

// Every character named as employee of the month has to exist.
for (const name of Object.keys(DB.intranet?.employee ?? {}))
  if (!charNames.has(name)) err(`[intranet/employee] "${name}" is not in DB.chars`);

/* ---------- 2d2) Achievements the engine hands out ---------- */
// Since 6.0 unlockAchievement() takes an id alone and looks the words up here.
// A typo in that id used to award an achievement with no name; now it warns at
// runtime - and fails here, before anyone plays it.
{
  const known = new Set((DB.achievements ?? []).map(a => a.id));
  const awarded = new Set();
  for (const file of ['engine_core.js', 'engine_week.js', 'engine_events.js']) {
    let src = '';
    try { src = readFileSync(new URL(`../src/engine/${file}`, import.meta.url), 'utf-8'); }
    catch { continue; }
    for (const m of src.matchAll(/unlockAchievement\(\s*'([^']+)'/g)) {
      awarded.add(m[1]);
      if (!known.has(m[1])) err(`[achievements] "${m[1]}" is awarded in ${file} but is not in data_achievements.js`);
    }
    // The old three-argument form would silently pass its own text again.
    for (const m of src.matchAll(/unlockAchievement\(\s*'[^']+'\s*,/g))
      err(`[achievements] ${file}: unlockAchievement with more than the id - title and text live in data_achievements.js`);
  }
  for (const a of DB.achievements ?? []) {
    if (a.toast && a.toast === a.desc)
      warn(`[achievements] "${a.id}": toast is word for word the same as desc - then the field can go`);
  }
}

/* ---------- 2d3) The chronicle ---------- */
// The archive stores an id and a set of numbers; the words are here. A line
// asking for a placeholder the engine does not fill would print a literal
// brace into the book, and nobody reports a bug against flavour text.
{
  const VARS = new Set(['{rage}', '{fired}', '{survived}', '{streak}']);
  for (const [id, line] of Object.entries(DB.lore?.lines ?? {})) {
    if (typeof line !== 'string' || !line.trim()) { err(`[lore/${id}]: empty`); continue; }
    for (const ph of line.match(/\{[a-zA-Z]+\}/g) ?? [])
      if (!VARS.has(ph)) err(`[lore/${id}]: placeholder ${ph} is replaced by nobody`);
  }
  const years = new Set();
  for (const [i, ch] of (DB.lore?.chapters ?? []).entries()) {
    const ctx = `[lore/chapters[${i}]]`;
    if (!ch.year) { err(`${ctx}: year is missing - the view keys on it`); continue; }
    if (years.has(ch.year)) err(`${ctx}: year "${ch.year}" is duplicated - {#each} needs it unique`);
    years.add(ch.year);
    if (!ch.title) err(`${ctx}: title is missing`);
    if (!ch.paragraphs?.length) err(`${ctx} "${ch.year}": no paragraphs`);
  }
}

/* ---------- 2e) Intranet page bodies ---------- */
// Since 6.0 the static paragraphs of an intranet page live here rather than in
// its component (see data_intranet.js). The component only decides how a
// section looks, so a malformed page produces no error - it renders as an
// empty box, on a page most players open twice.
//
// Each page NAMES its shape rather than being guessed from its keys. The first
// version of this check inferred the shape from whichever content key it found,
// and had to be extended for every new page - three times, each time after the
// check had already wrongly rejected correct data. A declared kind fails the
// other way round: an unknown one is reported instead of quietly skipped.
/*
 * The six stations of the summer party. The list is here rather than in the
 * engine because the engine never needed it: engine_events filters
 * `ev.loc === loc` and takes whatever it is given.
 */
const PARTY_LOCS = new Set(['bar', 'buffet', 'dance', 'lounge', 'outside', 'toilet']);

const PAGE_TONES = new Set(['slate', 'red', 'blue', 'amber', 'purple']);
// Badge tones on the Wall of Deals. Mirrors TONES in IntranetSales.svelte -
// an unknown one there falls back to grey, which reads as a design choice
// rather than a mistake.
const DEAL_TONES = new Set(['signed', 'good', 'pilot', 'bad', 'dead']);
const LISTS = ['block', 'paragraphs', 'items'];

/** Which keys a page of each kind cannot do without. */
const PAGE_SHAPES = {
  sections:  ['title', 'sections'],
  interview: ['headline', 'interviewer', 'ceo', 'turns'],
  deals:     ['title', 'customerLabel', 'productLabel', 'deals'],
  header:    ['title'],
  panel:     ['welcomeTitle', 'statusTitle', 'kpiTitle'],
  menu:      ['title', 'dayLabel', 'classicLabel', 'veggieLabel', 'menu', 'saturday'],
  records:   ['login', 'fileTitle', 'logout', 'sectionMaster', 'sectionDocuments',
              'sectionBehaviour', 'schnoesel', 'mueller', 'accounts']
};

/** Reports duplicates in a list of keys the view uses for {#each}. */
const uniqueBy = (list, pick, ctx, what) => {
  const seen = new Set();
  for (const [i, entry] of (list ?? []).entries()) {
    const key = pick(entry);
    if (!key) { err(`${ctx}[${i}]: ${what} is missing - the view keys on it`); continue; }
    if (seen.has(key)) err(`${ctx}[${i}]: ${what} "${key}" is duplicated - {#each} needs it unique`);
    seen.add(key);
  }
};

for (const [pageName, src] of Object.entries(DB.intranet ?? {})) {
  const page = src?.page;
  if (!page) continue;
  const ctx = `[intranet/${pageName}/page]`;

  if (!page.kind) { err(`${ctx}: kind is missing - the page has to announce its shape`); continue; }
  const required = PAGE_SHAPES[page.kind];
  if (!required) {
    err(`${ctx}: kind "${page.kind}" unbekannt. Erlaubt: ${Object.keys(PAGE_SHAPES).join(', ')}`);
    continue;
  }
  for (const key of required) if (!page[key]) err(`${ctx}: ${key} is missing (kind "${page.kind}")`);

  // Placeholders are filled in by the component. A typo shows up as a literal
  // brace on screen, which nobody reports as a bug.
  for (const ph of (page.versionLine ?? '').match(/\{[a-zA-Z]+\}/g) ?? [])
    if (!['{version}', '{note}'].includes(ph))
      err(`${ctx}: placeholder ${ph} in versionLine is replaced by nobody`);

  if (page.kind === 'sections') {
    uniqueBy(page.sections, s => s.title, `${ctx} sections`, 'title');
    for (const [i, sec] of (page.sections ?? []).entries()) {
      const sctx = `${ctx} sections[${i}] "${sec.title ?? '?'}"`;
      if (sec.tone && !PAGE_TONES.has(sec.tone))
        err(`${sctx}: tone "${sec.tone}" is unknown - the view falls back on slate without a word`);
      if (!LISTS.some(k => sec[k]?.length))
        err(`${sctx}: neither block, paragraphs nor items - it would stay empty`);
      for (const k of LISTS)
        if (sec[k] && !Array.isArray(sec[k])) err(`${sctx}: ${k} has to be a list`);
      if (sec.lead && !sec.items?.length)
        warn(`${sctx}: a lead with no items - the introduction leads nowhere`);
    }

  } else if (page.kind === 'interview') {
    uniqueBy(page.turns, t => t.q, `${ctx} turns`, 'Frage');
    for (const [i, turn] of (page.turns ?? []).entries()) {
      if (!turn.a) err(`${ctx} turns[${i}]: the answer is missing`);
      // q is plain text, a goes through {@html}. Markup in the question would
      // be readable on screen instead of rendered.
      if (turn.q && /<[a-z][^>]*>/i.test(turn.q))
        err(`${ctx} turns[${i}]: markup in the question - it is printed as text`);
    }
    // The extra question is inserted before the last pair, so there has to be
    // one to insert it before.
    if ((page.turns?.length ?? 0) < 2)
      err(`${ctx}: fewer than two pairs - the follow-up question would have no room`);

  } else if (page.kind === 'deals') {
    uniqueBy(page.deals, d => d.customer, `${ctx} deals`, 'Kunde');
    for (const [i, deal] of (page.deals ?? []).entries()) {
      const dctx = `${ctx} deals[${i}] "${deal.customer ?? '?'}"`;
      if (!deal.tone) err(`${dctx}: tone is missing - the badge would stay grey`);
      else if (!DEAL_TONES.has(deal.tone))
        err(`${dctx}: tone "${deal.tone}" is unknown - the view falls back on grey without a word`);
      if (!deal.rows?.length) err(`${dctx}: no rows`);
      uniqueBy(deal.rows, r => r.label, `${dctx} rows`, 'Zeilentitel');
    }

  } else if (page.kind === 'header') {
    if (page.signoff && !Array.isArray(page.signoff))
      err(`${ctx}: signoff has to be a list - one entry per line`);

  } else if (page.kind === 'panel') {
    if (page.incidentLabel && !Array.isArray(page.incidentLabel))
      err(`${ctx}: incidentLabel has to be a list - one entry per line`);

  } else if (page.kind === 'records') {
    for (const key of ['title', 'subtitle', 'userLabel', 'passLabel', 'denied', 'submit'])
      if (!page.login?.[key]) err(`${ctx}: login.${key} is missing`);

    // Schnösel's record is fixed here; Müller's is assembled in the component
    // from the archive and only contributes labels.
    const rec = page.schnoesel ?? {};
    for (const key of ['recordId', 'name', 'role', 'status'])
      if (!rec[key]) err(`${ctx} schnoesel: ${key} is missing`);
    uniqueBy(rec.master, r => r.label, `${ctx} schnoesel.master`, 'Feldname');
    uniqueBy(rec.documents, d => d.id, `${ctx} schnoesel.documents`, 'id');
    uniqueBy(rec.notes, n => n.title, `${ctx} schnoesel.notes`, 'Titel');
    for (const [i, row] of (rec.master ?? []).entries())
      if (!row.value && !row.lines?.length)
        err(`${ctx} schnoesel.master[${i}] "${row.label}": neither value nor lines - it would stay empty`);
    for (const [i, note] of (rec.notes ?? []).entries())
      if (note.tone && !['good', 'bad', 'neutral'].includes(note.tone))
        err(`${ctx} schnoesel.notes[${i}]: tone "${note.tone}" unbekannt`);

    /* Both user names are DISCOVERED, never handed out by the interface, and
       neither the linter for one tree nor the parity check between the two
       would notice if a name stopped matching where the player reads it:
         - j_schnoesel comes over the news ticker and in the onboarding mail
         - the second name is read off the support line under Schnösel's record
       Rename the player, translate one of those texts, and the record simply
       stops opening. No error, no crash, a page that says "Zugriff verweigert"
       forever. This is the one thing in here that is worth a hard failure. */
    const findable = (name) => {
      const inTicker = (DB.newsTicker ?? []).some(line => String(line).includes(name));
      const inMails  = (DB.emails ?? []).some(m => `${m.body ?? ''}${m.subj ?? ''}`.includes(name));
      const inRecord = `${page.support ?? ''}${src.support ?? ''}`.includes(name);
      return inTicker || inMails || inRecord;
    };
    for (const [i, acc] of (page.accounts ?? []).entries()) {
      if (!acc.user || !acc.record) { err(`${ctx} accounts[${i}]: user and record are required`); continue; }
      if (acc.user !== acc.user.toLowerCase())
        err(`${ctx} accounts[${i}]: "${acc.user}" - the login compares in lower case`);
      if (!page[acc.record])
        err(`${ctx} accounts[${i}]: record "${acc.record}" does not exist on this page`);
      if (!findable(acc.user))
        err(`${ctx} accounts[${i}]: "${acc.user}" appears neither in the ticker, nor in a mail, nor in the support line - the player can read the name off nowhere`);
    }

    // The career notes: {count} is replaced by the engine, nothing else is.
    for (const [key, note] of Object.entries(src.careerNotes ?? {})) {
      const nctx = `[intranet/${pageName}] careerNotes.${key}`;
      if (!note.title || !note.text) err(`${nctx}: title and text are required`);
      if (note.tone && !['good', 'bad', 'neutral'].includes(note.tone))
        err(`${nctx}: tone "${note.tone}" unbekannt`);
      for (const ph of `${note.title}${note.text}`.match(/\{[a-zA-Z]+\}/g) ?? [])
        if (ph !== '{count}') err(`${nctx}: placeholder ${ph} is replaced by nobody`);
    }

    // {month} is replaced by the component. Anything else stays on screen.
    for (const ph of (page.mueller?.statusTemplate ?? '').match(/\{[a-zA-Z]+\}/g) ?? [])
      if (ph !== '{month}') err(`${ctx} mueller: placeholder ${ph} is replaced by nobody`);

  } else if (page.kind === 'menu') {
    // The id, not the day name: the canteen matches today against it,
    // and it is the same in both trees.
    uniqueBy(page.menu, r => r.id, `${ctx} menu`, 'id');
    for (const row of [...(page.menu ?? []), page.saturday].filter(Boolean)) {
      for (const slot of ['classic', 'veggie']) {
        if (!row[slot]?.name) err(`${ctx} "${row.day ?? '?'}": ${slot}.name is missing - the row would stay empty`);
      }
    }
  }
}

/* ---------- 3) Emails ---------- */
const mailIdSeen = new Map();
const subjSeen = new Map();
for (const e of DB.emails) {
  const ctx = `[emails/${e.id ?? e.subj}]`;
  if (!e.id) err(`${ctx}: no id - usedEmails uses the id as its key!`);
  else mailIdSeen.set(e.id, (mailIdSeen.get(e.id) ?? 0) + 1);
  if (!e.subj) err(`${ctx}: no subj - the mail would have no subject in the inbox`);
  else subjSeen.set(e.subj, (subjSeen.get(e.subj) ?? 0) + 1);
  for (const o of e.opts ?? []) {
    checkOpt(o, ctx);
    if (o.next) noteFlag(o.next, ctx);
    if (o.nextEmail && !DB.emails.some(x => x.id === o.nextEmail)) err(`${ctx}: nextEmail "${o.nextEmail}" does not exist`);
  }
}
for (const [id, c] of mailIdSeen) if (c > 1) err(`duplicate mail id "${id}" (${c}x) - usedEmails blocks both, nextEmail hits the wrong one`);
for (const [s, c] of subjSeen) if (c > 1) warn(`duplicate mail subject "${s}" (${c}x) - only cosmetic, but in the game it reads as the same mail`);

/* ---------- 4) Dead story flags ---------- */
for (const [flag, ctxs] of flagsReq) {
  if (!flagsSet.has(flag)) err(`story flag "${flag}" is NEVER set but required by ${ctxs.join(', ')} -> dead content`);
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

// The compendium consumes flags too: a note can hang on one.
const compFlags = new Set();
for (const e of DB.compendium ?? [])
  for (const n of e.notes ?? []) if (n.flag) compFlags.add(n.flag);

for (const [flag, wheres] of flagsSetWhere) {
    if (flagsReq.has(flag)) continue;
    if (compFlags.has(flag)) continue;
    if (engineSource.includes(`'${flag}'`) || engineSource.includes(`"${flag}"`)) continue;
    const list = wheres.length > 3 ? `${wheres.slice(0, 3).join(', ')} … (+${wheres.length - 3})` : wheres.join(', ');
    warn(`story flag "${flag}" is set but required by no event -> dead end (${list})`);
}

/* ---------- 4c) Text quality ---------- */
const PLACEHOLDER = /\b(TODO|TBD|FIXME|XXX|Lorem ipsum|Platzhalter)\b/i;

const checkText = (ctx, field, txt) => {
    if (typeof txt !== 'string') return;

    if (txt !== txt.trim())        warn(`${ctx} ${field}: a leading or trailing space`);
    if (/ {2,}/.test(txt))         warn(`${ctx} ${field}: doppeltes Leerzeichen`);
    if (PLACEHOLDER.test(txt))     err (`${ctx} ${field}: a placeholder in the text`);

    const t = txt.trim();
    if (t.length === 0) { err(`${ctx} ${field}: empty text`); return; }

    // Markup in fields that are rendered as plain text.
    // Event and mail texts go through EventView/EmailView, which split them on
    // \n and print them as text - a <br> in there is not a line break, it is
    // four characters the player gets to read. Only the bulletin board, the
    // intranet, the tutorial and the morning moods go through {@html}, and
    // none of them passes through here.
    const markup = t.match(/<\/?(br|b|i|u|p|em|strong|span|div|ul|ol|li|h[1-6])\b[^>]*>/i);
    if (markup) err(`${ctx} ${field}: markup "${markup[0]}" in a field that is printed as plain text - use \\n for a paragraph break`);

    // First-order quotes are single throughout the game: 'so'. Double
    // ones belong inside a quote within a quote. A text with double
    // quotes and no single ones is therefore always first order and
    // departs from the house rule. 96% of the texts follow it; the
    // exceptions grew where a file was single quoted in the source and
    // typing " inside the text was simply the more convenient key.
    if (t.includes('"') && !t.includes("'"))
        warn(`${ctx} ${field}: double quotation marks at the first level - game text uses 'these', double ones only when nested`);

    // Two dots are neither a full stop nor an ellipsis, they are a typo.
    if (/(?<!\.)\.\.(?!\.)/.test(t)) warn(`${ctx} ${field}: a double full stop (".." instead of "..." or ".")`);

    // Only prose gets a length check. Button labels are supposed to be terse
    // ("Auflegen.", "Ignorieren") and would otherwise drown the report.
    const isProse = /\.(r|txt|text|body)$|^(text|body)$/.test(field) || field.endsWith('.text');
    // CMD: values are control commands for the engine (open the intranet or
    // the bulletin board), not sentences - they are meant to be short.
    const isCommand = /^CMD:[A-Z_]+$/.test(t);
    if (isProse && !isCommand && t.length < 20) info(`${ctx} ${field}: very short ("${t}")`);

    // Unbalanced quotation marks suggest a truncated sentence
    for (const q of ['"', '„', '»']) {
        const close = { '"': '"', '„': '“', '»': '«' }[q];
        const open  = (t.match(new RegExp(q === '"' ? '"' : q, 'g')) || []).length;
        const shut  = q === '"' ? open : (t.match(new RegExp(close, 'g')) || []).length;
        if (q === '"' ? open % 2 !== 0 : open !== shut) {
            warn(`${ctx} ${field}: unpaired quotation marks (${q})`);
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
          err(`[${p}/${ev.id}] opt.${key} demands the quest item "${o[key]}" - trophies can only be looted`);
      if (o.r.includes('\\')) warn(`[${p}/${ev.id}] opt.r contains a backslash`);
      if (/<[a-zA-Z/]/.test(o.r)) err(`[${p}/${ev.id}] opt.r contains an HTML tag - result texts are printed as plain text, so the markup would show`);
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
for (const id of itemIds) if (!used.has(id)) info(`item "${id}" (${DB.items[id].name}) is awarded or demanded by no event`);

/* ---------- 6b) Usable items ---------- */
// `use` is what makes an item usable: it drives the backpack buttons, the
// confirm dialog and the effect. An incomplete block therefore shows up as a
// button that opens a dialog saying nothing and does nothing.
// b/rep (v5.0) carry the COST of trade-off items, wait is the cooling-down
// line each item phrases for itself.
const USE_FIELDS = ['l', 'a', 'b', 'rep', 'desc', 'warn', 'log', 'color', 'cooldown', 'wait'];
for (const id of itemIds) {
  const item = DB.items[id];
  const use = item.use;
  if (!use) continue;
  const ctx = `Item "${id}"`;

  for (const k of ['desc', 'warn', 'log', 'color'])
    if (!use[k]) err(`${ctx}: use.${k} is missing - without it the dialog or the log stays empty`);

  for (const k of Object.keys(use))
    if (!USE_FIELDS.includes(k)) err(`${ctx}: use.${k} is not a known field`);

  // A trade-off item pays with reputation. Unlike an event choice it can be
  // triggered again and again, so the ceiling here is tighter than the ±5
  // of an event - and a permanent one without a cooldown has no ceiling.
  if (use.rep) {
    for (const [n, v] of Object.entries(use.rep)) {
      if (!charNames.has(n)) err(`${ctx}: use.rep character "${n}" is not in DB.chars`);
      if (Math.abs(v) > 5) warn(`${ctx}: use.rep ${n}:${v} - an item can be used again and again, so at most ±5 here`);
    }
  }
  if (item.keep && !use.cooldown && (use.b || use.rep))
    err(`${ctx}: an item that stays and has a cost (use.b/use.rep) needs a cooldown - otherwise it can be triggered any number of times`);

  if (!use.a && !use.l)
    err(`${ctx}: use with no effect - a or l has to be set`);

  for (const k of ['a', 'l'])
    if (use[k] !== undefined && !(use[k] < 0))
      err(`${ctx}: use.${k} has to be negative (values are lowered), it is ${use[k]}`);

  if (use.cooldown && !item.keep)
    err(`${ctx}: use.cooldown without keep - what is consumed needs no waiting time`);

  if (item.keep && !use.cooldown)
    err(`${ctx}: keep without use.cooldown - it could be used without limit`);

  if (item.quest)
    err(`${ctx}: quest items are trophies and may not have a use`);
}

/* ---------- 6c) Passive items ---------- */
// `passive` fires on its own when an event opens, so a typo here is silent
// twice over: no button is missing, nothing throws, the effect simply never
// happens. onChar is checked against DB.chars for the same reason event
// chars are.
const PASSIVE_FIELDS = ['onChar', 'l', 'a', 'b', 'log', 'color'];
for (const id of itemIds) {
  const item = DB.items[id];
  const pas = item.passive;
  if (!pas) continue;
  const ctx = `Item "${id}"`;

  for (const k of Object.keys(pas))
    if (!PASSIVE_FIELDS.includes(k)) err(`${ctx}: passive.${k} is not a known field`);

  if (!pas.onChar) err(`${ctx}: passive without onChar - an effect with no trigger never fires`);
  else if (!charNames.has(pas.onChar)) err(`${ctx}: passive.onChar "${pas.onChar}" is not in DB.chars`);

  if (!pas.log) err(`${ctx}: passive without log - a figure that appears without a click otherwise looks like a fault`);
  if (!pas.a && !pas.l && !pas.b) err(`${ctx}: passive with no effect - l, a or b has to be set`);
  if (!item.keep) err(`${ctx}: passive without keep - a consumable cannot have a lasting effect`);
  if (item.quest) err(`${ctx}: quest items are trophies and may not have a passive`);

  // The player never chooses to trigger it, so it may only ever help; a
  // passive penalty would be an invisible tax nobody can avoid.
  for (const k of ['al', 'fl', 'cr'])
    if (pas[k] !== undefined && !(pas[k] < 0))
      err(`${ctx}: passive.${k} has to be negative - an effect without a decision must not hurt, it is ${pas[k]}`);
  for (const k of ['al', 'fl', 'cr'])
    if (typeof pas[k] === 'number' && Math.abs(pas[k]) > 10)
      warn(`${ctx}: passive.${k} ${pas[k]} - it applies on EVERY appearance of the character, so at most -10`);
}

/* ---------- 6d) Compendium ---------- */
// Every trigger here fails silently when wrong: a typo in an id or a flag
// does not throw, the note simply never shows up. Both sides are therefore
// checked against what exists - idMap holds every event id in the game,
// flagsSetWhere every flag an event raises.
{
  // A compendium note may cite a mail as well as an event - mails are not part
  // of POOLS, so idMap alone would reject every one of them.
  const mailIds = new Set((DB.emails ?? []).map(m => m.id));
  const isSource = (id) => idMap.has(id) || mailIds.has(id);

  const FIELDS = ['id', 'cat', 'name', 'role', 'summary', 'seen', 'notes'];
  const NOTE_FIELDS = ['seen', 'flag', 'text'];
  const ids = new Set();
  for (const e of DB.compendium ?? []) {
    const ctx = `Kompendium "${e.id ?? '?'}"`;
    for (const k of Object.keys(e))
      if (!FIELDS.includes(k)) err(`${ctx}: ${k} is not a known field`);
    if (!e.id || !e.name || !e.role || !e.summary) err(`${ctx}: id, name, role and summary are required`);
    // The view groups and colours by category, so an unknown one would show up
    // in no tab at all - invisible, without anything failing.
    if (!['team', 'person', 'place', 'matter'].includes(e.cat))
      err(`${ctx}: cat "${e.cat}" is unknown - team, person, ort, vorgang are allowed`);
    if (ids.has(e.id)) err(`${ctx}: doppelte ID`);
    ids.add(e.id);

    if (!(e.seen ?? []).length) err(`${ctx}: with no seen the entry is never unlocked`);
    for (const id of e.seen ?? [])
      if (!isSource(id)) err(`${ctx}: seen "${id}" is neither an event nor a mail`);

    const notes = e.notes ?? [];
    if (notes.length < 3) warn(`${ctx}: only ${notes.length} notes - under three an entry feels thin`);
    // An entry may hold as many notes as it has distinct scenes to draw on,
    // plus one for the pattern that emerges across them. This ties the length
    // to the evidence rather than to a category: the colleagues and the big
    // rooms earn eight, a walk-on with two appearances does not. Eight is the
    // hard ceiling either way - beyond that a page stops being read.
    const sourceIds = new Set([...(e.seen ?? []), ...notes.map(n => n.flag ?? n.seen)]).size;
    const maxNotes = Math.min(8, Math.max(3, sourceIds));
    if (notes.length > maxNotes)
      warn(`${ctx}: ${notes.length} notes for ${sourceIds} sources - at most ${maxNotes}, or it is invention rather than observation`);

    const noteTexts = new Set();
    for (const [i, n] of notes.entries()) {
      const nctx = `${ctx} notes[${i}]`;
      for (const k of Object.keys(n))
        if (!NOTE_FIELDS.includes(k)) err(`${nctx}: ${k} is not a known field`);
      if (!n.text) err(`${nctx}: without text`);
      if (!n.seen && !n.flag) err(`${nctx}: with no trigger (seen or flag) the note never appears`);
      if (n.seen && n.flag) err(`${nctx}: seen and flag together - one trigger is enough`);
      if (n.seen && !isSource(n.seen)) err(`${nctx}: seen "${n.seen}" is neither an event nor a mail`);
      if (n.flag && !flagsSetWhere.has(n.flag)) err(`${nctx}: flag "${n.flag}" is set by no event`);
      if (n.text && noteTexts.has(n.text)) err(`${nctx}: the note text is duplicated`);
      if (n.text) noteTexts.add(n.text);
    }
  }
}

/* ---------- 7) Mail convention: the delete option ---------- */
// The delete option must carry ignoreEmail: true and sit at the BOTTOM of
// the list. Chain follow-ups without any delete option are fine by design.
//
// The label is read in BOTH languages, mirrored like BOILERPLATE in
// report-prose: the flag is the identifier the game compares on, but the one
// thing this rule exists to catch - a delete option whose flag is MISSING -
// can only be recognised by its label. Until 6.1 the pattern knew the German
// label alone, so the English tree passed with a flag removed (proved by
// mutation on 19/08/2026: "✅ The data is clean" over a missing ignoreEmail).
// The two labels are the only forms in the stock, 149 each.
const DELETE_LABEL = /Löschen & Ignorieren|Delete & ignore/;
for (const ev of DB.emails) {
  const opts = ev.opts ?? [];
  opts.forEach((o, idx) => {
    const isDelete = DELETE_LABEL.test(o.t ?? '') || o.ignoreEmail;
    if (!isDelete) return;
    if (!o.ignoreEmail) err(`[emails/${ev.id}] delete option without ignoreEmail: true`);
    if (idx !== opts.length - 1) err(`[emails/${ev.id}] the delete option is not in last position`);
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
  calls:      ['reqStory', 'reqStoryAge', 'reqWeekDayMin', 'webOnly'],
  coffee:     ['reqStory', 'reqStoryAge', 'reqWeekDayMin', 'webOnly'],
  server:     ['reqStory', 'reqStoryAge', 'reqWeekDayMin', 'webOnly'],
  sidequests: ['reqStory', 'reqStoryAge', 'reqWeekDayMin', 'webOnly', 'kind', 'appName'],
  // Deliberately WITHOUT reqStoryAge/reqWeekDayMin: the encounter pool is
  // reserved for the quest items, and those have to stay reachable. Every
  // filler chain added here lowers the chance of the item events being drawn
  // and can lock the gala behind an achievement that never completes. If the
  // pool is ever opened for multi-day stories, that decision belongs with
  // the quest-item design, not with a passing content wave.
  reputation: ['reqStory', 'reqRep'],
  party:      ['loc', 'textByProgress'],   // hub variants by progress (engine_core.reset)
  lunch:      ['reqStory', 'reqStoryAge'],   // gated in engine_events.triggerLunch
  meetings:   ['startNodeGala'],   // alternative opening when tonight's gala fires (engine_week.triggerMeeting)
  tutorial:   ['type', 'step']
};
// t is the button text, r the result line; m minutes, l laziness, a aggro,
// b boss radar. Results used to accept min/fl/al/cr as second names for the
// four effects - an alias for events that no longer exist, used by not one
// place in the stock, dropped with the rename.
const OPT_KEYS      = ['t', 'r', 'm', 'l', 'a', 'b', 'rep', 'loot', 'req', 'rem', 'next', 'action'];
const NODE_KEYS     = ['text', 'opts', 'char'];
const NODE_OPT_KEYS = ['t', 'next', 'req', 'rem', 'action'];
const RESULT_KEYS   = ['txt', 'm', 'l', 'a', 'b', 'rep', 'loot', 'rem', 'next'];
const FAIL_KEYS     = OPT_KEYS.filter(k => k !== 't');
// `senderId` is the identifier behind the display name in `sender`: EmailView
// keys the CC list off it. Before it existed the component matched the sender
// PROSE ("buchhaltung", "sicherheit"), which works for exactly as long as the
// pool is German — see the mail block in UEBERGABE.md.
const MAIL_KEYS     = ['id', 'sender', 'senderId', 'subj', 'body', 'opts', 'linked'];
const MAIL_OPT_KEYS = ['t', 'r', 'm', 'l', 'a', 'b', 'rep', 'loot', 'ignoreEmail', 'nextEmail'];

const checkKeys = (obj, allowed, ctx, what) => {
  if (!obj || typeof obj !== 'object') return;
  for (const k of Object.keys(obj)) {
    if (allowed.includes(k)) continue;
    err(`${ctx}: unknown field "${k}" ${what} - a typo, or a field the engine does not read at this point`);
  }
};

for (const p of POOLS) {
  const eventKeys = [...EVENT_KEYS._common, ...(EVENT_KEYS[p] ?? [])];
  const optKeys = p === 'party' ? [...OPT_KEYS, 'checkPool'] : OPT_KEYS;
  for (const ev of DB[p]) {
    const ctx = `[${p}/${ev.id}]`;
    checkKeys(ev, eventKeys, ctx, 'on the event');
    (ev.opts ?? []).forEach((o, i) => checkKeys(o, optKeys, `${ctx} opts[${i}]`, 'in the option list'));

    // The party runs after hours, and two fields have no meaning there. The
    // engine would happily process both - m is overwritten a moment later by
    // the station clock, and the boss radar has no consequence because
    // checkEndConditions() bails out in party mode. Catching it here rather
    // than swallowing it in the engine: a value that silently does nothing is
    // worse than one that fails loudly.
    if (p === 'party') {
      (ev.opts ?? []).forEach((o, i) => {
        if (o.m !== undefined)
          err(`${ctx} opts[${i}]: "m" has no effect at the party - the clock runs over twelve stations of 30 minutes each`);
        if (o.b !== undefined)
          err(`${ctx} opts[${i}]: "b" has no effect at the party - after hours there is no boss radar and no game over`);
        // checkPool sends the option to a station, and the same six names are
        // the file names of the foyer icons - see tools/lint-assets.mjs.
        if (o.checkPool !== undefined && !PARTY_LOCS.has(o.checkPool))
          err(`${ctx} opts[${i}]: checkPool "${o.checkPool}" is not a station - allowed: ${[...PARTY_LOCS].join(', ')}`);
      });

      // The station an event belongs to. engine_events filters on ev.loc ===
      // loc and validates NOTHING: an invented station costs no error and no
      // warning, it simply means the event is never drawn. Which is the worst
      // way for written work to disappear - it is in the tree, it lints clean,
      // and no player will ever see it.
      if (ev.loc !== undefined && !PARTY_LOCS.has(ev.loc))
        err(`${ctx}: loc "${ev.loc}" is not a station - the event is never drawn. Allowed: ${[...PARTY_LOCS].join(', ')}`);
    }
    for (const [nid, node] of Object.entries(ev.nodes ?? {})) {
      checkKeys(node, NODE_KEYS, `${ctx}#${nid}`, 'on the node');
      (node.opts ?? []).forEach((o, i) =>
        checkKeys(o, NODE_OPT_KEYS, `${ctx}#${nid}[${i}]`, 'in the node option list (effects belong in the result)'));
    }
    for (const [rid, res] of Object.entries(ev.results ?? {}))
      checkKeys(res, RESULT_KEYS, `${ctx}!${rid}`, 'in the result');
    if (ev.fail) checkKeys(ev.fail, FAIL_KEYS, `${ctx}.fail`, 'in the time-out branch');
  }
}
for (const ev of DB.emails) {
  const ctx = `[emails/${ev.id}]`;
  checkKeys(ev, MAIL_KEYS, ctx, 'on the mail');
  (ev.opts ?? []).forEach((o, i) => checkKeys(o, MAIL_OPT_KEYS, `${ctx} opts[${i}]`, 'in the option list'));
}

/* ---------- 10) Result keys: the res_ prefix ---------- */
// A readability convention, not a mechanic: since 4.1 the "..." badge in
// EventView looks the target up in ev.nodes the same way the engine routes,
// so a result named `truth` works and displays correctly. The prefix still
// helps anyone skimming a data file to see where a chain ends, which is why
// new results should follow it. The existing stock stays as it is - renaming
// a result means renaming every next that points at it, for zero effect.
{
  const stray = [];
  for (const p of POOLS)
    for (const ev of DB[p])
      for (const rid of Object.keys(ev.results ?? {}))
        if (!rid.startsWith('res_')) stray.push(`${p}/${ev.id}!${rid}`);
  if (stray.length)
    info(`${stray.length} result keys without the res_ prefix (style, not function - display and engine look them up structurally; please give new results the prefix)`);
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

  // weekDay 0 means day mode; 1 to 5 are Monday through Friday of a week run.
  const weekFacts = (weekDay) => ({
    week: weekDay > 0,
    weekDay,
    weekRest: weekDay > 0 ? 5 - weekDay : 0,
  });

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
      hasEncounters: rnd() < 0.5, hasHabits: rnd() < 0.5,
      // Week facts (engine_diary.factsOf). Without them every week fragment
      // looked unreachable and produced a warning that could never be fixed -
      // ten permanent false alarms are the fastest way to teach someone that
      // the warning list is safe to ignore.
      ...weekFacts(between(0, 5))
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
    if (!Array.isArray(fragments)) { err(`[diary/${slot}]: not an array`); continue; }

    fragments.forEach((f, i) => {
      const ctx = `[diary/${slot}#${f.id ?? i}]`;
      if (!f.id) err(`${ctx}: fragment with no id - the anti-repetition memory remembers ids`);
      else if (seenIds.has(f.id)) err(`${ctx}: id "${f.id}" exists twice`);
      else seenIds.add(f.id);

      if (typeof f.when !== 'function') { err(`${ctx}: when is missing or is not a function`); return; }
      if (!Array.isArray(f.lines) || f.lines.length === 0) { err(`${ctx}: no lines`); return; }
      f.lines.forEach((line, k) => {
        if (typeof line !== 'string' || !line.trim()) err(`${ctx} lines[${k}]: empty`);
        else checkText(ctx, `lines[${k}]`, line);
      });

      // Names that do not exist: ach('ach_typo') would never fire, and the only
      // symptom is a line that never shows up.
      const source = f.when.toString();
      for (const [, id] of source.matchAll(/\bach\(\s*['"]([^'"]+)['"]\s*\)/g))
        if (!achIds.has(id)) err(`${ctx}: achievement "${id}" does not exist`);
      for (const [, id] of source.matchAll(/\bitem\(\s*['"]([^'"]+)['"]\s*\)/g))
        if (!itemIds.has(id)) err(`${ctx}: item "${id}" does not exist`);

      let fitted = 0;
      for (const day of days) {
        try { if (f.when(day)) fitted++; }
        catch (e) { err(`${ctx}: Bedingung stolpert (${e.message})`); return; }
      }
      if (fitted === 0) warn(`${ctx}: the condition fits no conceivable day - the lines never appear`);

      // Placeholders: the sentence around a list needs its {list}.
      if (Object.values(LIST_SLOTS).includes(slot))
        f.lines.forEach((line, k) => {
          if (!line.includes('{list}')) err(`${ctx} lines[${k}]: {list} is missing - the list would have no room`);
        });
      else
        f.lines.forEach((line, k) => {
          if (line.includes('{list}')) err(`${ctx} lines[${k}]: {list} stands outside a list intro`);
        });
    });
  }

  // A choice slot with no fitting fragment yields an empty line. For the ending
  // that is the worst case: the day would close without a closing sentence.
  for (const slot of CHOICE_SLOTS) {
    if (!DB.diary[slot]) { err(`[diary/${slot}]: the slot is missing`); continue; }
    if (slot === 'postscript') continue;   // may stay empty, it is an afterword
    const orphans = days.filter(d => !DB.diary[slot].some(f => { try { return f.when(d); } catch { return false; } }));
    if (orphans.length) {
      const ends = [...new Set(orphans.map(d => d.end))].join(', ');
      err(`[diary/${slot}]: no fragment fits ${ends} - the paragraph would stay empty`);
    }
  }

  // Every collecting slot needs its intro, or the clauses stand there bare.
  for (const [listSlot, introSlot] of Object.entries(LIST_SLOTS)) {
    if (!DB.diary[listSlot]) err(`[diary/${listSlot}]: the slot is missing`);
    if (!DB.diary[introSlot]) err(`[diary/${introSlot}]: the intro for ${listSlot} is missing`);
  }

  const total = Object.values(DB.diary).flat().reduce((n, f) => n + (f.lines?.length ?? 0), 0);
  info(`diary: ${Object.values(DB.diary).flat().length} fragments with ${total} lines in ${Object.keys(DB.diary).length} slots`);
}

/* ---------- Output ---------- */
const section = (title, list, sym) => {
  console.log(`\n${title} (${list.length})`);
  list.forEach(m => console.log(` ${sym} ${m}`));
};
section('FEHLER', errors, '✗');
section('WARNUNGEN', warns, '!');
section('INFO', infos, 'i');
console.log(`\n${errors.length ? '❌ Faults found.' : '✅ The data is clean.'}`);
process.exit(errors.length ? 1 : 0);
