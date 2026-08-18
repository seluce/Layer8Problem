#!/usr/bin/env node
/**
 * Layer8Problem - interface string linter
 * ---------------------------------------------------------------
 * Location: tools/lint-i18n.mjs   (run from the repository root)
 * Usage:    node tools/lint-i18n.mjs
 * Exits 1 on errors, so it works as a gate like lint-data.mjs.
 *
 * The data linter checks the event pools. This one checks the shell around
 * them: the 552 strings in components, the engine and index.html.
 *
 * It exists because a missing interface string fails QUIETLY. t() falls back to
 * English and then to the key itself, so a typo does not throw - it puts
 * "settings.langauge" on screen, in small text, in a menu nobody opens twice.
 * Over 552 strings and two languages that is not a risk, it is a certainty.
 *
 * What it checks:
 *   1. every key used in code exists in both dictionaries
 *   2. both dictionaries carry the same key set
 *   3. no dictionary entry is unused (a rename leaves the old one behind)
 *   4. entries whose English still reads exactly like the German - during the
 *      interface pass that is the to-do list, afterwards it is a finding
 *
 * The three markup forms are deliberate, see src/i18n/i18n.svelte.js:
 *   data-i18n="key"        replaces the text
 *   data-i18n-html="key"   replaces the markup (only where a sentence carries
 *                          inline tags; rare, and visible as its own form)
 *   data-i18n-attr="title=key;aria-label=key"
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { de } from '../src/i18n/de.js';
import { en } from '../src/i18n/en.js';

const ROOT = new URL('..', import.meta.url).pathname;

const errors = [], warns = [], infos = [];
const err = m => errors.push(m), warn = m => warns.push(m), info = m => infos.push(m);

/* ---------- 1) Collect every key the code asks for ---------- */

/** key -> the places asking for it */
const used = new Map();
const note = (key, where) => {
    if (!used.has(key)) used.set(key, []);
    used.get(key).push(where);
};

/*
 * Keys inside a t() or tf() call.
 *
 * Not just the first argument: a conditional key is ordinary and legitimate -
 *     t(inWeek ? 'settings.softReset.week' : 'settings.softReset.day')
 * - and matching only the leading quote reported both halves as unused. So the
 * whole call is captured and every dotted string inside it counted as a key.
 *
 * The dot is what separates a key from a value: every key in this project is
 * namespaced, so `{ tier: 'Gold' }` in a tf() call is not mistaken for one.
 * A key computed at runtime still cannot be seen and is declared with an
 * i18n-uses comment instead.
 */
const RE_CALL = /\btf?\(([^)]*)\)/g;
const RE_KEY  = /['"`]([a-z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)+)['"`]/g;

/*
 * Keys inside a RECIPE - `this.log({ k: 'log.item.found', v: { … } })`.
 *
 * Since 6.0 a recorded line stores its key instead of the sentence t() would
 * have produced (src/engine/recipe.js), so the key no longer sits inside a
 * t() call and RE_CALL walks straight past it. Thirty-five entries reported as
 * unused the first time this ran, every one of them in daily use.
 *
 * The rest of the LINE is taken and handed to RE_KEY, for the same reason
 * RE_CALL takes the whole call rather than the first argument: a key can be
 * conditional, and both branches are real -
 *     { k: kind === 'received' ? 'log.item.received' : 'log.item.found' }
 * A computed key is as invisible here as anywhere else and is declared with an
 * i18n-uses comment.
 */
const RE_RECIPE = /\bk:\s*(.*)$/gm;

// Markup marks. The attr form carries several pairs at once.
const RE_MARK = /\bdata-i18n(?:-html)?\s*=\s*"([^"]+)"/g;
const RE_ATTR = /\bdata-i18n-attr\s*=\s*"([^"]+)"/g;

/**
 * A key the linter cannot see, declared by hand.
 *
 *     // i18n-uses: language.name.de, language.name.en
 *
 * For computed keys - t(`language.name.${lang}`) - which are legitimate but
 * unreadable to a regex. Without this the entries would be reported as unused
 * forever, and a permanently wrong warning is worse than no warning: it teaches
 * everyone to skip the section.
 *
 * One line each. A long list is written as several i18n-uses comments rather
 * than wrapped, because a continuation line would have to be guessed at - and
 * guessing is what this whole file exists to avoid.
 */
const RE_DECLARED = /i18n-uses:\s*([^\n*]+)/g;

/**
 * Comments out.
 *
 * Not cosmetic: src/i18n/i18n.svelte.js documents the three markup forms with
 * examples, and the linter read them as real marks. Commented-out code would do
 * the same. Line comments only count when they start the line, so a URL keeps
 * its slashes.
 */
function stripComments(src) {
    return src
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/^[ \t]*\/\/.*$/gm, '');
}

function scan(file) {
    const raw = readFileSync(file, 'utf-8');
    const where = relative(ROOT, file);

    // Declarations live IN comments, so they are read before those are removed.
    for (const m of raw.matchAll(RE_DECLARED)) {
        for (const key of m[1].split(',').map(k => k.trim()).filter(Boolean)) {
            note(key, `${where} (angemeldet)`);
        }
    }

    const src = stripComments(raw);

    for (const call of src.matchAll(RE_CALL)) {
        for (const m of call[1].matchAll(RE_KEY)) {
            // A computed key cannot be checked. It is declared with an
            // i18n-uses comment instead; reporting it here would be a
            // permanent false alarm.
            if (m[1].includes('${')) continue;
            note(m[1], where);
        }
    }
    for (const recipe of src.matchAll(RE_RECIPE)) {
        for (const m of recipe[1].matchAll(RE_KEY)) {
            if (m[1].includes('${')) continue;
            note(m[1], where);
        }
    }
    for (const m of src.matchAll(RE_MARK)) note(m[1], where);
    for (const m of src.matchAll(RE_ATTR)) {
        for (const pair of m[1].split(';')) {
            const [attr, key] = pair.split('=').map(s => s?.trim());
            if (!attr || !key) {
                err(`${where}: data-i18n-attr "${pair}" ist kein Paar aus Attribut=Schlüssel`);
                continue;
            }
            note(key, `${where} (${attr})`);
        }
    }
}

/**
 * Everything except the data pools.
 *
 * src/data is excluded on purpose: those files use `t:` as the option-label
 * key, which is one character away from a t() call, and they are translated as
 * whole files rather than through the dictionary.
 */
function walk(dir) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) {
            if (entry === 'data' || entry === 'node_modules') continue;
            walk(full);
        } else if (/\.(js|svelte|html)$/.test(entry)) {
            scan(full);
        }
    }
}

walk(join(ROOT, 'src'));
scan(join(ROOT, 'index.html'));

/* ---------- 2) Fallback text in the markup must match the dictionary ---------- */

/*
 * An element may keep its text between the tags. That is useful - it is what a
 * reader of index.html sees, and it survives a module that fails to load - but
 * it means the sentence exists twice, and two copies drift. Here the copy in
 * the markup is held against en.js.
 *
 * Against en.js since 6.0, and that is not cosmetic: the markup IS the
 * fallback, so it has to say what t() would say when a key goes missing, and
 * t() falls back to English now. Held against de.js it would have gone on
 * passing while showing the player the wrong language - the copy would be
 * consistent with a dictionary nobody falls back to any more.
 *
 * Empty elements are fine: they simply have no fallback. The -html form is
 * skipped, because comparing markup would report every whitespace difference.
 */
const html = readFileSync(join(ROOT, 'index.html'), 'utf-8');
for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) {
    const open = html.indexOf('>', m.index);
    const close = html.indexOf('<', open);
    if (open === -1 || close === -1) continue;
    const fallback = html.slice(open + 1, close).replace(/\s+/g, ' ').trim();
    if (!fallback) continue;
    const key = m[1];
    if (!(key in en)) continue;                       // reported below anyway
    const wanted = String(en[key]).replace(/\s+/g, ' ').trim();
    if (fallback !== wanted) {
        err(`index.html: Rückfalltext zu "${key}" weicht von en.js ab\n`
          + `      Markup:  "${fallback}"\n`
          + `      en.js:   "${wanted}"`);
    }
}

/* ---------- 2a) data-i18n on an element that cannot hold text ---------- */

/*
 * A void element has no text content. Assigning textContent to an <img> goes
 * nowhere the player can see, and the sentence that follows the tag belongs to
 * the PARENT - so it is never replaced and stays German in every other
 * language.
 *
 * Check 2 above cannot see this. It reads the text after the tag without
 * knowing whose text it is, finds the German fallback, holds it against de.js
 * and is satisfied. Two headings shipped that way and were found on
 * 15.08.2026 by playing the English build: the inventory said DEIN INVENTAR
 * and the team view DAS KOLLEGIUM, with the attribute sitting on the icon.
 *
 * data-i18n-attr is exempt on purpose: setting alt= on an image is what it is
 * for.
 */
const VOID_TAGS = new Set(['img', 'br', 'hr', 'input', 'meta', 'link', 'source',
                           'area', 'base', 'col', 'embed', 'param', 'track', 'wbr']);
for (const form of ['data-i18n', 'data-i18n-html']) {
    for (const m of html.matchAll(new RegExp(`${form}="([^"]+)"`, 'g'))) {
        const tagStart = html.lastIndexOf('<', m.index);
        if (tagStart === -1) continue;
        const tag = html.slice(tagStart + 1, tagStart + 20).match(/^[a-zA-Z][a-zA-Z0-9-]*/)?.[0].toLowerCase();
        if (tag && VOID_TAGS.has(tag)) {
            err(`index.html: ${form}="${m[1]}" sitzt auf <${tag}> — ein leeres Element trägt keinen Text.\n`
              + `      Der Text daneben gehört dem Elternknoten und bleibt in jeder Sprache deutsch.\n`
              + `      Gehört in ein <span> um den Text herum.`);
        }
    }
}

/* ---------- 2b) data-i18n on an element that holds more than text ---------- */

/*
 * The same failure as 2a, mirrored. `el.textContent = t(key)` replaces
 * EVERYTHING inside the element - text and child elements alike - so a mark on
 * an element that also carries markup silently deletes that markup at startup,
 * before anyone has switched a language.
 *
 * Two sat in index.html and were found on 17.08.2026 by the string pass:
 *
 *   <span data-i18n="nav.log">LOG <span id="log-arrow">▼</span></span>
 *   <p data-i18n="export.hint">Der Code … <span data-i18n="export.hint2">…</span></p>
 *
 * The first deleted the arrow that toggleLog() then looked for and did not
 * find - its `if (arrow)` swallowed the miss, so the indicator was simply
 * never there on a phone. The second deleted a whole second sentence, in BOTH
 * languages, along with its own mark.
 *
 * Neither check 2 nor 2a can see it: 2 reads the text up to the first `<` and
 * finds a correct German fallback, 2a finds an element that can perfectly well
 * hold text. The fix is the one 2a already names - a <span> around the text.
 *
 * data-i18n-html is exempt: writing markup is precisely its job.
 */
for (const m of html.matchAll(/data-i18n="([^"]+)"/g)) {
    const open = html.indexOf('>', m.index);
    if (open === -1) continue;
    const tagStart = html.lastIndexOf('<', m.index);
    const tag = html.slice(tagStart + 1, tagStart + 20).match(/^[a-zA-Z][a-zA-Z0-9-]*/)?.[0];
    if (!tag) continue;
    const close = html.toLowerCase().indexOf(`</${tag.toLowerCase()}`, open);
    if (close === -1) continue;
    const inner = html.slice(open + 1, close);
    if (inner.includes('<')) {
        err(`index.html: data-i18n="${m[1]}" sitzt auf <${tag}>, das noch Markup enthält.\n`
          + `      textContent ersetzt den ganzen Inhalt — das Markup ist beim Start weg.\n`
          + `      Gehört in ein <span> nur um den Text herum.`);
    }
}

/* ---------- 3) Used but missing ---------- */

for (const [key, places] of used) {
    const where = [...new Set(places)].join(', ');
    if (!(key in de)) err(`Schlüssel "${key}" fehlt in de.js — benutzt in ${where}`);
    if (!(key in en)) err(`Schlüssel "${key}" fehlt in en.js — benutzt in ${where}`);
}

/* ---------- 4) The two dictionaries have to match ---------- */

for (const key of Object.keys(de)) {
    if (!(key in en)) err(`Schlüssel "${key}" steht in de.js, fehlt in en.js`);
}
for (const key of Object.keys(en)) {
    if (!(key in de)) err(`Schlüssel "${key}" steht in en.js, fehlt in de.js`);
}

/* ---------- 5) Defined but never asked for ---------- */

for (const key of Object.keys(de)) {
    if (!used.has(key)) warn(`Schlüssel "${key}" wird nirgends benutzt — Rest einer Umbenennung?`);
}

/* ---------- 6) English that is still German ---------- */

// Words that are the same in both languages on purpose. A name is not a
// translation, and flagging it every run would train everyone to ignore the
// section.
const SAME_BY_DESIGN = new Set([
    'language.name.de', 'language.name.en',          // a name is not a translation
    'intro.handbook.tickets.name',                   // TICKETS
    'intro.handbook.aggro.name',                     // AGGRO
    'intro.handbook.loot.name',                      // LOOT
    'intro.export', 'intro.import',                  // Export, Import
    'board.title',                                   // GlobalCorp • Community Board
    'nav.team', 'nav.log',                           // TEAM, LOG
    'set.textSize.normal',                           // Normal
    'boot.headDay',                                  // GlobalCorp OS - {day}
    'log.item.found',                                // ITEM
    'log.email.reply',                               // Re:
    'morning.effect.aggro',                          // Aggro, GLOSSAR 3a
    'end.rageTitle',                                 // RAGE QUIT

    // The German intranet already labels itself in English - that is the
    // satire, not an oversight. Translating these would remove the joke.
    'intranet.tab', 'intranet.nav.dashboard', 'intranet.nav.chantal',
    'intranet.nav.vision', 'intranet.nav.sales', 'intranet.nav.hr'
]);

const identical = Object.keys(de).filter(
    key => key in en && de[key] === en[key] && !SAME_BY_DESIGN.has(key)
);
if (identical.length) {
    info(`${identical.length} Einträge lauten auf Englisch wie auf Deutsch:`);
    for (const key of identical.slice(0, 20)) info(`    ${key}  "${de[key]}"`);
    if (identical.length > 20) info(`    … und ${identical.length - 20} weitere`);
}

/* ---------- 7) A component must read the data tree through tree() ---------- */

/*
 * `DB` is a plain object. data.js empties and refills it on a language switch,
 * so a component that reads `DB.items` directly has nothing to notice: no
 * error, no warning, the dictionary strings around it change and the tree text
 * stays put. The backpack read "Alter Donut (Use)" - half a language each.
 *
 * tree() reads the language rune on the way past, which is what makes the
 * component a reader of it. The rule is in CLAUDE.md; until 6.1 nothing held
 * anyone to it, and it held only because everyone happened to remember.
 *
 * The engine may import DB as before: it is not reactive and re-reads on every
 * call. This check is about components only.
 */
const KOMPONENTEN = join(ROOT, 'src/components');
const svelteDateien = [];
(function sammeln(dir) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        if (statSync(full).isDirectory()) sammeln(full);
        else if (entry.endsWith('.svelte')) svelteDateien.push(full);
    }
})(KOMPONENTEN);

for (const datei of svelteDateien) {
    const text = readFileSync(datei, 'utf-8');
    const wo = relative(ROOT, datei);
    // An import of DB out of data.js - under any name it is given.
    for (const m of text.matchAll(/import\s*\{([^}]*)\}\s*from\s*'[^']*data\.js'/g)) {
        const namen = m[1].split(',').map(x => x.trim().split(/\s+as\s+/)[0].trim());
        if (namen.includes('DB'))
            err(`${wo}: importiert DB direkt aus data.js — in einer Komponente wird der Datenbaum über tree() gelesen, sonst friert sie beim Sprachwechsel in ihrer Sprache ein`);
    }
}
info(`${svelteDateien.length} Komponenten auf den Zugriff über tree() geprüft`);

/* ---------- Report ---------- */

const show = (title, list) => {
    console.log(`\n${title} (${list.length})\n`);
    for (const m of list) console.log(m.startsWith('    ') ? m : ` ${m.startsWith(' ') ? '' : '✗ '}${m}`);
};

console.log(`\nOberflächentexte: ${Object.keys(de).length} Schlüssel, ${used.size} davon im Einsatz`);

if (errors.length) show('FEHLER', errors);
if (warns.length) {
    console.log(`\nWARNUNGEN (${warns.length})\n`);
    for (const m of warns) console.log(` ! ${m}`);
}
if (infos.length) {
    console.log(`\nINFO (${infos.length})\n`);
    for (const m of infos) console.log(m.startsWith('    ') ? m : ` i ${m}`);
}

if (!errors.length && !warns.length) console.log('\n✅ Oberflächentexte sind sauber.\n');
else console.log('');

process.exitCode = errors.length ? 1 : 0;
