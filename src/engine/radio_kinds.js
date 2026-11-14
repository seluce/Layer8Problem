/**
 * The kinds of spot GlobalCorp FM knows (7.2), in one place: the engine draws
 * by them and lint-data holds the data against them. Their own file because
 * the linter runs without the Svelte loader, and engine_radio.js does not.
 *
 * A kind is an id, never a length. The same spot is longer in German than in
 * English, so a rule over characters would make one spot long in one
 * language and short in the other (CLAUDE.md: nothing language-dependent as
 * a comparison value). What a kind promises about length is checked by the
 * linter, per tree; what the engine does with it is decided by the id.
 */

export const RADIO_KINDS = [
    'morning', 'weekday', 'traffic', 'weather', 'canteen', 'notice', 'ad',
    'board', 'staff', 'countdown', 'alert',
    // The station's name and a line, five to eight seconds: what a station
    // says between two things.
    'ident',
    // Ralf, the host, telling a story and losing the thread.
    'talk',
    // Mandy from Marketing, who reads the adverts, doing the same.
    'mandy',
    // How the house stands with the player, by `if.rep`: Ralf passing on a
    // colleague's greeting, and Mandy with what the corridor says.
    'shout', 'gossip',
    // Ralf on what happened in the house, by `if.seen` - an emergency the
    // run has had.
    'news',
];

/** The kinds that answer a condition, and the condition they must carry. */
export const RADIO_KIND_NEEDS = { shout: 'rep', gossip: 'rep', news: 'seen' };

/**
 * Half a minute and more. They wait for a longer quiet (RADIO_LONG_QUIET_MS
 * in engine_radio.js): the next click would cut them off in the first
 * sentence, and a story without its end is worse than no story.
 */
export const RADIO_LONG_KINDS = ['talk', 'mandy'];

/**
 * How long a text of each kind should be, in characters [at least, at most]
 * - roughly fifteen characters a second as the presenters read. The linter
 * warns outside it; a kind not named here takes `spot`.
 */
export const RADIO_LENGTHS = {
    spot:  [100, 420],
    ident: [30, 140],
    talk:  [420, 1000],
    mandy: [420, 1000],
};
