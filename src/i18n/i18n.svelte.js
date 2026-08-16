/**
 * Language selection and interface strings (6.0).
 *
 * Two things live here, because they are the same decision seen from two
 * sides: WHICH language the game runs in, and WHERE the words for the shell
 * around the game come from. The event pools are not part of this - those are
 * whole files under src/data/<lang>, see src/data.js.
 *
 * --- HOW THE LANGUAGE IS PICKED ---
 *
 *   1. a stored choice          the player decided, nothing overrules that
 *   2. an existing save         someone who has been playing was playing in
 *                               German; an update must not move them
 *   3. Steam                    the per-game setting, which can differ from
 *                               the operating system (desktop build only)
 *   4. the browser preference   navigator.languages, prefix matched
 *   5. English
 *
 * Step 2 is the one that is easy to leave out and impossible to make up for
 * afterwards. Anyone with a save file but no language key played 5.x, and 5.x
 * was German only.
 *
 * Step 4 matches the PREFIX: de-DE, de-AT and de-CH are all German, and
 * navigator.languages is walked in order because that is the order the person
 * asked for.
 */

import { KEYS } from '../engine/keys.js';
import { platform } from '../platform.js';
import { DB, setLanguage as setDataLanguage, currentLanguage } from '../data.js';
import { de } from './de.js';
import { en } from './en.js';

export const LANGUAGES = ['de', 'en'];
const FALLBACK = 'en';

const DICTIONARIES = { de, en };

/** Steam answers with an English language name, not a code. */
const STEAM_NAMES = {
    german: 'de',
    english: 'en'
};

/** Anything the game itself has ever written, used to spot a returning player. */
const OWN_KEY = /^layer8_|^sysadmin_/;

const clean = (value) => (LANGUAGES.includes(value) ? value : null);

/** Whatever is stored, valid or not. Null means the key is absent. */
function rawStoredLanguage() {
    try {
        return localStorage.getItem(KEYS.language);
    } catch {
        return null;
    }
}

/** The language the player chose, or null if they never chose a valid one. */
export function storedLanguage() {
    return clean(rawStoredLanguage());
}

/** Has this browser played before? Then it played in German. */
function hasHistory() {
    try {
        for (let i = 0; i < localStorage.length; i++) {
            if (OWN_KEY.test(localStorage.key(i) ?? '')) return true;
        }
    } catch { /* private mode: treat as a new player */ }
    return false;
}

/** First browser preference that names a language the game has. */
function fromBrowser() {
    const wanted = navigator.languages?.length
        ? navigator.languages
        : [navigator.language].filter(Boolean);
    for (const tag of wanted) {
        const prefix = String(tag).toLowerCase().split('-')[0];
        if (LANGUAGES.includes(prefix)) return prefix;
    }
    return null;
}

/**
 * Runs the ladder above. Async because only Steam can be slow, and only on the
 * desktop - the browser path never waits.
 */
export async function detectLanguage() {
    const raw = rawStoredLanguage();
    const stored = clean(raw);
    if (stored) return stored;

    // Step 2 asks whether this is a 5.x player, and the presence of the key
    // itself answers that: anyone who has one has already been in 6.0, so a
    // corrupt value must not send them back to German. Only a browser that has
    // never held the key can be a returning player.
    if (raw === null && hasHistory()) return 'de';

    if (platform.isDesktop) {
        try {
            const name = await platform.language();
            const mapped = clean(STEAM_NAMES[String(name).toLowerCase()]);
            if (mapped) return mapped;
        } catch { /* fall through to the browser, same as the web build */ }
    }

    return fromBrowser() ?? FALLBACK;
}

/**
 * The language currently on screen - and the reason this file carries the
 * .svelte.js extension.
 *
 * As a plain module variable this was invisible to Svelte: t() read it, no
 * component tracked it, and the only way to repaint the screen in another
 * language was to throw the page away. As a rune every t() call made from
 * markup or from $derived becomes a reader of it, so assigning it repaints
 * exactly the places that show a word.
 *
 * Kept module-private on purpose. A component that imported a binding called
 * `active` could no longer write $active, the same trap engine_state.svelte.js
 * documents for `state` - so the outside sees the getter below instead.
 */
let active = $state('de');

/** The language currently on screen. Reactive: reading it in markup tracks it. */
export const language = () => active;

/**
 * The event pools - as a read a component can hang a dependency on.
 *
 * `DB` is a plain object that data.js empties and refills on a switch, so a
 * $derived reading `DB.items` directly has nothing to notice and simply keeps
 * the old tree. That failure is invisible in the worst way: the surrounding
 * dictionary text DOES change, so the backpack ends up reading
 * "Alter Donut (Use)" - half a language each, and no error anywhere. It is how
 * this was found.
 *
 * Reading the rune first is what fixes it, and the order in switchLanguage()
 * is what makes it safe: the rune moves only after the swap, so the tree handed
 * back here is never the half-loaded one.
 *
 * Written as a comma expression rather than a bare statement so that nobody -
 * reader or minifier - can take the read for a stray line.
 *
 * **Rule: in a component, DB is reached through tree(). Never imported
 * directly.** The engine may import DB as before; it is not reactive and
 * re-reads on every call anyway.
 */
export const tree = () => (active, DB);

/**
 * Picks the language and loads the matching interface strings.
 *
 * Also sets <html lang>, which is not cosmetic: the automatic hyphenation that
 * breaks long words in event text follows that attribute. Left on 'de' the
 * browser would hyphenate English by German rules.
 *
 * Returns the language so main.js can hand it straight to loadCore().
 */
export async function initLanguage() {
    active = await detectLanguage();
    document.documentElement.lang = active;
    return active;
}

/**
 * Everyone who has to repaint something the runes cannot reach.
 *
 * A plain callback list rather than an import, because the one caller that
 * matters is the engine - and the engine imports this module. Registering from
 * the other side keeps the arrow pointing one way.
 */
const listeners = new Set();

/** @param {(lang: string) => void} fn */
export function onLanguageChange(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

/**
 * Changes the language, on the running page.
 *
 * Up to 6.0 this wrote localStorage and reloaded. The reload was honest about
 * what it could not do rather than lazy: `active` was a plain module variable,
 * so no component could notice it moving, and the pools sat cached on DB. Both
 * halves are fixed now - `active` is a rune and setLanguage() drops the cache -
 * so the page can be repainted where it stands.
 *
 * Three things have to happen, and the order is the whole trick:
 *
 *   1. the data tree, awaited, so that
 *   2. `active` flips only once the new tree is in place - a rune assigned
 *      first would repaint every t() against pools that are still the old
 *      language, which is precisely the half-switched screen the reload was
 *      avoiding, and
 *   3. the static shell in index.html, which has no runes to notice anything,
 *      plus whatever the listeners repaint.
 *
 * The reload stays as the failure path. If the other tree cannot be fetched,
 * setLanguage() throws, nothing has been swapped, and a reload starts the whole
 * ladder again from the stored choice - which is exactly what 6.0 did always.
 *
 * @param {string} lang
 */
export async function switchLanguage(lang) {
    if (!LANGUAGES.includes(lang) || lang === active) return;
    try {
        localStorage.setItem(KEYS.language, lang);
    } catch { /* private mode: the switch still works for this session */ }

    try {
        await useLanguage(lang);
    } catch (err) {
        console.error(`Language "${lang}" could not be switched to live, reloading.`, err);
        location.reload();
        return;
    }

    applyStaticStrings();
    for (const fn of listeners) fn(lang);
}

/**
 * Swaps the language without touching the page around it.
 *
 * The tools and the tests use it on its own - there is no shell to refill and
 * no scene to repaint out there. switchLanguage() is this plus those two.
 */
export async function useLanguage(lang) {
    if (!LANGUAGES.includes(lang)) return;
    if (currentLanguage() !== lang) await setDataLanguage(lang);
    active = lang;
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
}

/**
 * Fills the static shell in index.html.
 *
 * Components call t() directly; index.html cannot, because it is markup that
 * exists before any module runs. Three marks, and the split between them is the
 * point:
 *
 *   data-i18n="key"       replaces the TEXT. The normal case.
 *   data-i18n-html="key"  replaces the MARKUP. Only for sentences that carry
 *                         inline tags - the intro pitch has a <strong> in the
 *                         middle, and splitting that into fragments would give
 *                         a translator three pieces of a sentence instead of a
 *                         sentence. The dictionary is our own source, not user
 *                         input, but this stays a separate mark so that every
 *                         place writing HTML is visible in one grep.
 *   data-i18n-attr="title=key;aria-label=key"
 *
 * A missing key shows up as the key itself, which is deliberate: over months of
 * translation a readable marker on screen beats a blank element.
 */
export function applyStaticStrings(root = document) {
    for (const el of root.querySelectorAll('[data-i18n]')) {
        el.textContent = t(el.dataset.i18n);
    }
    for (const el of root.querySelectorAll('[data-i18n-html]')) {
        el.innerHTML = t(el.dataset.i18nHtml);
    }
    for (const el of root.querySelectorAll('[data-i18n-attr]')) {
        for (const pair of el.dataset.i18nAttr.split(';')) {
            const [attr, key] = pair.split('=').map(part => part.trim());
            if (attr && key) el.setAttribute(attr, t(key));
        }
    }
}

/**
 * An interface string.
 *
 * Falls back to German and then to the key itself, so a missing entry shows up
 * as a readable marker on screen rather than as "undefined" - during a
 * translation that runs over months, that difference matters.
 *
 * @param {string} key  dotted path, e.g. 'settings.language'
 */
export function t(key) {
    return DICTIONARIES[active]?.[key] ?? DICTIONARIES.de?.[key] ?? key;
}

/**
 * An interface string with values filled in.
 *
 *     tf('week.night.remaining', { days: 3 })   ->  "Noch 3 Tage."
 *
 * Placeholders rather than string concatenation, for the reason the diary ran
 * into first: a sentence that reads "Noch 3 Tage" in German may need the number
 * somewhere else entirely in English, and glued-together fragments cannot be
 * reordered by whoever translates them.
 *
 * @param {string} key
 * @param {Record<string, string|number>} vars
 */
export function tf(key, vars = {}) {
    return Object.entries(vars).reduce(
        (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
        t(key)
    );
}
