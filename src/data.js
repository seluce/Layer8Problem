/**
 * Game database.
 *
 * Split into two tiers. The eager tier is everything needed before the player
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
 */

import { achievements } from './data/data_achievements.js';
import { chars }        from './data/data_chars.js';
import { excuses }      from './data/data_excuses.js';
import { items }        from './data/data_items.js';
import { moods }        from './data/data_moods.js';
import { newsTicker }   from './data/data_newsTicker.js';
import { special }      from './data/data_special.js';
import { tutorial }     from './data/data_tutorial.js';

export const DB = {
    achievements,
    chars,
    excuses,
    items,
    moods,
    newsTicker,
    special,
    tutorial
};

// Loaders for the deferred pools. The dynamic import() is what lets the browser
// fetch these separately instead of bundling them into the first parse.
const LOADERS = {
    board:      () => import('./data/data_board.js'),
    bossfights: () => import('./data/data_bossfights.js'),
    calls:      () => import('./data/data_calls.js'),
    coffee:     () => import('./data/data_coffee.js'),
    emails:     () => import('./data/data_emails.js'),
    lunch:      () => import('./data/data_lunch.js'),
    party:      () => import('./data/data_party.js'),
    reputation: () => import('./data/data_reputation.js'),
    server:     () => import('./data/data_server.js'),
    sidequests: () => import('./data/data_sidequests.js')
};

// In-flight requests, so two callers asking for the same pool at the same time
// share one network request instead of racing.
const pending = {};

/**
 * Guarantees the named pools are present on DB before continuing.
 * Already-loaded pools resolve immediately, so calling this on every action is
 * cheap — no need to track what has been loaded at the call site.
 *
 * @param {...string} names pool keys, e.g. ensure('coffee', 'bossfights')
 */
export function ensure(...names) {
    return Promise.all(names.map(name => {
        if (DB[name]) return Promise.resolve();
        if (!LOADERS[name]) {
            console.warn(`Unknown data pool: ${name}`);
            return Promise.resolve();
        }
        if (!pending[name]) {
            pending[name] = LOADERS[name]()
                .then(mod => { DB[name] = mod[name]; })
                .catch(err => {
                    // Let a later attempt retry rather than caching the failure.
                    delete pending[name];
                    console.error(`Could not load data pool "${name}":`, err);
                    throw err;
                });
        }
        return pending[name];
    }));
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
    idle(() => {
        // Swallow failures here: ensure() will retry at the actual call site,
        // and a warm-up that fails must not surface as an error to the player.
        ensure(...Object.keys(LOADERS)).catch(() => {});
    });
}
