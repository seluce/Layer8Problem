/**
 * Game database.
 *
 * Split into two tiers. The core tier is everything needed before the player
 * clicks anything: characters, items, morning moods, the news ticker, the
 * tutorial and the achievement list. Together roughly 60 KB.
 *
 * The event pools are the bulk — around 1.2 MB of prose that used to be parsed
 * before the intro modal even appeared, including the party finale most players
 * never reach. Those load on first use via ensure(), and prefetchAll() pulls the
 * rest in while the player is still reading the intro.
 *
 * DB stays one object throughout: lazy pools are undefined until loaded, never
 * missing keys on a different object. Anything reading a pool must go through
 * ensure() first.
 *
 * --- LANGUAGE (6.0) ---
 *
 * Every pool exists twice, under src/data/de and src/data/en. Both trees carry
 * the same ids, story flags, character names and numbers; only the prose
 * differs. Two consequences worth knowing before touching anything here:
 *
 *   - A save file is language independent. Nothing persisted refers to a text,
 *     so switching mid-week is safe and needs no migration.
 *   - The core tier can no longer be a static import, because the language is
 *     not known until localStorage and the browser have been asked. loadCore()
 *     has to be awaited before the first component mounts - see src/main.js.
 *
 * Why not Paraglide: it bundles every message of a language into one store,
 * which would put 1.2 MB into the first parse and undo the lazy pools. It would
 * also take away the per-pool structure that lint-data.mjs and report-prose.mjs
 * check today.
 */

/** Pools loaded on first use. Key === the name the module exports. */
const POOL_NAMES = [
    'board', 'bossfights', 'calls', 'coffee', 'compendium', 'diary', 'emails',
    'intranet', 'lore', 'lunch', 'meetings', 'party', 'reputation', 'server',
    'sidequests'
];

/** Needed before the first click, so these come in one go at boot. */
const CORE_NAMES = [
    'achievements', 'chars', 'excuses', 'items', 'moods', 'newsTicker',
    'special', 'tutorial'
];

/**
 * The loaded pools.
 *
 * A plain object, and deliberately so: the Node tools import this module
 * without the Svelte loader, so nothing in here may be a rune. The cost is that
 * setLanguage() swapping its contents is a change no component can see.
 *
 * **A component therefore never imports DB - it goes through `tree()` in
 * src/i18n/i18n.svelte.js**, which reads the language rune on the way past. The
 * engine imports DB directly and is right to: it is not reactive and re-reads
 * on every call.
 */
export const DB = {};

/**
 * The tree everything loads from.
 *
 * Deliberately not exported as a mutable binding: callers ask via
 * currentLanguage() and change it through setLanguage(), so there is one place
 * that knows the cache has to be dropped along with it.
 */
let language = 'de';

export const currentLanguage = () => language;

/**
 * One loader for both trees.
 *
 * One branch per tree, each with a STATIC prefix and a single variable. That
 * shape is the one Vite's dynamic-import-vars plugin handles reliably; a
 * specifier carrying two variables (`./data/${lang}/data_${name}.js`) has to
 * be resolved through a wider glob, and anything the glob misses fails at
 * RUNTIME with "Unknown variable dynamic import" rather than at build time.
 *
 * The duplication is two lines and cannot drift: both branches take the same
 * name. Plain Node - which is how the tools import this module - resolves
 * either specifier directly.
 *
 * **The `de` branch is "not en", not a fallback.** It reads like one now that
 * FALLBACK_LANGUAGE says 'en', and the two would look as though they disagree.
 * They never meet: every caller comes through LANGUAGES, so `lang` is 'de' or
 * 'en' and this ternary only ever picks the tree it was asked for.
 * FALLBACK_LANGUAGE is for the other case - the asked-for tree failing to
 * arrive - and by then the branch here has already done its job.
 */
const importPool = (lang, name) => (lang === 'en'
    ? import(`./data/en/data_${name}.js`)
    : import(`./data/de/data_${name}.js`));

// In-flight requests, so two callers asking for the same pool at the same time
// share one network request instead of racing.
let pending = {};

/**
 * Loads the core tier for a language and makes it the current one.
 *
 * Must be awaited before anything renders. Everything after this point may
 * assume DB.items, DB.chars and the rest are present.
 *
 * @param {string} lang 'de' or 'en'
 */
export async function loadCore(lang = language) {
    targetLanguage = lang;
    try {
        await fillCore(lang);
    } catch (err) {
        // A language that cannot load must not brick the game. Without this
        // the promise rejected, engine.init() never finished, and every view
        // that reads DB came up empty - an archive with nothing in it and a
        // settings dialog that opens blank, with only the console saying why.
        if (lang === FALLBACK_LANGUAGE) throw err;
        console.error(`Language "${lang}" could not be loaded, falling back to `
                    + `"${FALLBACK_LANGUAGE}".`, err);
        targetLanguage = FALLBACK_LANGUAGE;
        await fillCore(FALLBACK_LANGUAGE);
    }
}

/**
 * The tree to load when the wanted one will not come.
 *
 * A different case from a missing dictionary key, and worth its own thought:
 * this is the whole prose corpus, not one string. Both trees ship in the same
 * build, so neither is the safer bet technically - which makes it a question
 * about the reader. Whoever ends up here is reading a language they did not
 * ask for either way; English is the one more of them can read.
 *
 * Note the asymmetry this creates, because it is the real cost: the language
 * named HERE is the one whose own failure is fatal. loadCore() rethrows rather
 * than recurse, so a broken English tree now takes the game down instead of
 * quietly serving German. That is the trade, and it is deliberate.
 */
const FALLBACK_LANGUAGE = 'en';

/*
 * `language` is the successfully LOADED language (the fallback path depends on
 * that meaning: currentLanguage() must never claim a tree that failed to
 * arrive). `targetLanguage` is what everything loading RIGHT NOW should belong
 * to - it moves at the START of a switch, `language` at its END. ensure()
 * binds to the target: bound to `language`, a pool requested during the switch
 * window imported the OLD tree, and depending on timing either survived the
 * guard (a German pool cached inside an English session) or was discarded
 * with its registration left behind (a pool dead for the rest of the session).
 * The generation counter makes overlapping core loads last-one-wins.
 */
let targetLanguage = null;
let coreGeneration = 0;

async function fillCore(lang) {
    const gen = ++coreGeneration;
    const loaded = await Promise.all(CORE_NAMES.map(name => importPool(lang, name)));
    if (gen !== coreGeneration) return;   // a newer switch superseded this load
    language = lang;
    CORE_NAMES.forEach((name, i) => { DB[name] = loaded[i][name]; });
}

/**
 * Guarantees the named pools are present on DB before continuing.
 * Already-loaded pools resolve immediately, so calling this on every action is
 * cheap - no need to track what has been loaded at the call site.
 *
 * @param {...string} names pool keys, e.g. ensure('coffee', 'bossfights')
 */
export function ensure(...names) {
    return Promise.all(names.map(name => {
        if (DB[name]) return Promise.resolve();
        if (!POOL_NAMES.includes(name)) {
            console.warn(`Unknown data pool: ${name}`);
            return Promise.resolve();
        }
        if (!pending[name]) {
            // Bound to the TARGET, not the loaded language: during a switch
            // the loaded one is still the old one, and binding to it imported
            // the old tree (see the note above fillCore).
            const forLanguage = targetLanguage ?? language;
            const p = importPool(forLanguage, name)
                .then(mod => {
                    if (forLanguage === (targetLanguage ?? language)) {
                        DB[name] = mod[name];
                    } else if (pending[name] === p) {
                        // Stale import: drop the registration too, or every
                        // later ensure() adopts this resolved-but-empty
                        // promise and the pool stays dead for the session.
                        delete pending[name];
                    }
                })
                .catch(err => {
                    // Let a later attempt retry rather than caching the
                    // failure - but only remove OUR registration: after a
                    // switch the same name may already belong to a newer one.
                    if (pending[name] === p) delete pending[name];
                    console.error(`Could not load data pool "${name}":`, err);
                    throw err;
                });
            pending[name] = p;
        }
        return pending[name];
    }));
}

/**
 * Switches trees and reloads whatever was already in memory.
 *
 * The pools are cached on DB (`if (DB[name]) return` above), so a switch has to
 * drop that cache or the old language simply stays.
 *
 * Since 6.0 this is also the game's own path - the switch no longer reloads.
 * i18n.switchLanguage() awaits this and only then moves its language rune, so
 * nothing renders against the half-emptied tree; the loop above deletes every
 * key SYNCHRONOUSLY, and for the length of the await DB really is empty.
 *
 * @param {string} lang 'de' or 'en'
 */
export async function setLanguage(lang) {
    // Compared against the TARGET: against the loaded language, a quick
    // EN-then-DE double click hit the early return on the second click
    // (the first switch had not finished loading, so `language` still said
    // DE) and the session ended on the wrong language.
    if (lang === (targetLanguage ?? language)) return;
    // Loaded OR still in flight (6.1). Taking only the finished ones dropped
    // whatever the warm-up happened to be fetching at that moment: `pending` is
    // cleared a line below, and the in-flight import is then discarded by the
    // `forLanguage === language` guard in ensure() - so that pool was gone for
    // the session unless somebody asked for it again. Every pool but the diary
    // has an ensure() at its call site and quietly recovered; the diary has
    // none and stayed empty, which is the bug this was found through.
    const loaded = POOL_NAMES.filter(name => DB[name] || pending[name]);
    for (const key of Object.keys(DB)) delete DB[key];
    pending = {};
    await loadCore(lang);
    if (loaded.length) await ensure(...loaded);
}

/**
 * Warms every deferred pool in the background.
 * Called once the intro modal is up: the player spends several seconds reading
 * it, which is more than enough to have everything in place before the first
 * click. Uses requestIdleCallback where available so it never competes with
 * rendering.
 */
export function prefetchAll() {
    const idle = window.requestIdleCallback || (fn => setTimeout(fn, 200));
    // WITH a timeout. requestIdleCallback promises nothing on its own: measured
    // on a busy page it never fired at all, while a stripped-down page in the
    // same browser was served after a millisecond. Without the timeout the
    // warm-up is a hope, and every pool that has no ensure() at its call site
    // rides on that hope.
    idle(() => {
        // Swallow failures here: ensure() will retry at the actual call site,
        // and a warm-up that fails must not surface as an error to the player.
        ensure(...POOL_NAMES).catch(() => {});
    }, { timeout: 2000 });
}
