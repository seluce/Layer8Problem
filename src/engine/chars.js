import { DB } from '../data.js';

/**
 * Naming the player as the speaker of an event.
 *
 * An event's `char` is matched against the names in data_chars.js, so those
 * names are identifiers as much as they are display text. That is exactly why
 * the seven colleagues keep their German names in both trees (GLOSSAR §4):
 * Kevin, Egon, Gabi, Markus, Chantal, Frau Elster and Dr. Wichtig are the same
 * string in de and en, and a save file stays language independent because of
 * it.
 *
 * The PLAYER is the one exception, and it was decided the other way round: his
 * name carries a meaning that would be lost, so it IS translated - "Du
 * (Müller)" becomes "You (Miller)" (GLOSSAR §3.2, §4). A name that changes
 * with the language cannot also be its own key.
 *
 * That was known to be a loose end - GLOSSAR §7b already records that the
 * player turns up in state.reputation as an orphan - but it was thought to be
 * harmless because nothing looked him up. One event does: `call_time_1`, in
 * which Miller rings himself from the past, and whose whole joke is that the
 * portrait beside the call is his own. In German it worked by accident,
 * because the English tree was still a copy; the moment data_chars.js was
 * translated, lint-data reported `char "Du (Müller)" nicht in DB.chars` and
 * the portrait would have vanished in English with no other sign.
 *
 * So the event names him with a sentinel instead. It is identical in both
 * trees - lint-parity carries `char` in ID_KEYS and rightly insists on that -
 * and it is resolved to whatever the player is called in the language that is
 * running, at the one moment the name is needed for display.
 *
 * Same shape as the two fixes before it: `player: true` for TeamView, and
 * `senderId` for the mail CC rules. A comparison must never run over text that
 * gets translated.
 */
export const PLAYER_CHAR = 'PLAYER';

/** The name to show for a `char` value; resolves the player sentinel. */
export const charDisplayName = (value) =>
    value === PLAYER_CHAR ? (DB.chars?.find(c => c.player)?.name ?? value) : value;
