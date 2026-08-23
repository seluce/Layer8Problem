/**
 * The activities the Steam friends list can show.
 *
 * Kept in a file of its own, and a rune-free one, because two very different
 * readers need the same list and neither may guess it: engine_core sends the
 * tokens at runtime, and tools/make-steam-presence.mjs writes the .vdf files
 * for the Steamworks backend in plain Node - where importing anything that
 * touches engine_state.svelte.js would die on `$state is not defined`. Same
 * reason keys.js sits apart.
 *
 * The words themselves are NOT here. They live in src/i18n under `presence.*`,
 * with everything else lint-i18n and lint-parity measure; this file only says
 * which ones exist. A test holds the two against each other.
 *
 * Why tokens rather than sentences: Steam resolves a token in the language of
 * whoever is READING the friends list. Up to 6.0 the game sent the finished
 * sentence through %statustext%, so an English player's German friends read
 * English, and the other way round.
 */

/** One per activity. 'fallback' is missing on purpose - it is what an unknown type becomes. */
export const PRESENCE_TYPES = ['coffee', 'sidequest', 'server', 'calls', 'boss',
                               'rep', 'lunch', 'meeting', 'party', 'system'];

/** Steam localisation tokens start with '#'. '#Status_coffee' and friends. */
export const PRESENCE_TOKEN = '#Status_';

/** Every token the game can ever send, unknown activities included. */
export const PRESENCE_ALL = [...PRESENCE_TYPES, 'fallback'];
