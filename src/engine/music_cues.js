/**
 * The music as data: which pieces exist, which pool each belongs to, and the
 * pure rules that pick the next one.
 *
 * No runes, no DOM, no Audio - Node loads this file as it is, so the tests and
 * the day simulator call the very functions the game calls. engine_audio.js
 * owns the elements and the fades; everything that DECIDES lives here.
 *
 * How it is meant to sound (UEBERGABE, "Plan: neue Musik"): nothing changes
 * per event. An event lasts half a minute and a piece needs a whole one to be
 * a piece; music that followed every scene would sound like somebody tuning a
 * radio. The events move anger and radar, and THOSE, with the clock, choose
 * what comes next.
 */

/**
 * The house band: which pool each piece belongs to, and whether it comes in
 * two layers (bed and rhythm, see rhythmGain() below). Every office pool is
 * layered; the emergency and the gala are not - neither has a quiet version
 * of itself to fall back to, and both are meant to lean on you.
 *
 * The file names and their measurements live in music_files.js, which
 * tools/master-music.mjs writes; that tool also holds which take and which
 * cut each piece came from. No piece loops: each has an ending of its own,
 * and `ended` draws the next.
 *
 * `floorDb` overrides RHYTHM_FLOOR_DB for one piece. morning_1 is a chord
 * and then room, by design of its prompt; at -14 dB its floor cost 2.1 LU,
 * over MAX_FLOOR_LOSS, and music/prompts.md had already named the remedy.
 */
export const CUES = {
    morning_1:   { pool: 'morning',   layers: true, floorDb: -12 },
    morning_2:   { pool: 'morning',   layers: true },
    day_a:       { pool: 'day',       layers: true },
    day_1:       { pool: 'day',       layers: true },
    day_2:       { pool: 'day',       layers: true },
    day_3:       { pool: 'day',       layers: true },
    day_4:       { pool: 'day',       layers: true },
    lunch_1:     { pool: 'lunch',     layers: true },
    afternoon_1: { pool: 'afternoon', layers: true },
    afternoon_2: { pool: 'afternoon', layers: true },
    tense_1:     { pool: 'tense',     layers: true },
    tense_2:     { pool: 'tense',     layers: true },
    tense_3:     { pool: 'tense',     layers: true },
    emergency_a: { pool: 'emergency' },
    emergency_2: { pool: 'emergency' },
    emergency_3: { pool: 'emergency' },
    gala_1:      { pool: 'gala' },
    gala_2:      { pool: 'gala' },
    gala_3:      { pool: 'gala' },
    gala_lounge: { pool: 'lounge' },
};

/**
 * Loudness. The office is mastered to TARGET_LUFS - the level of the
 * quietest of the old pieces, which the narrator's -23.6 LUFS was balanced
 * against - and a pool in INTENT_DB that many decibels above it: a DECISION,
 * the emergency and the gala are meant to lean on you. The week suite holds
 * every measured file to it.
 */
export const TARGET_LUFS = -21.9;
// The lounge is the quiet room of the evening: at the office's level, 3 dB
// under the hall. A starting value for the operator's ear (12.11.2026).
export const INTENT_DB = { emergency: 3, gala: 3, lounge: 0 };

/**
 * What a layered piece may lose with its rhythm at the floor, in LU, measured
 * at the sum. More, and a quiet morning sounds as if the band had left.
 */
export const MAX_FLOOR_LOSS = 2;

/** Every pool housePool() can answer, in no particular order. */
export const POOLS = ['morning', 'day', 'lunch', 'afternoon', 'tense', 'emergency', 'gala', 'lounge'];

/**
 * Where a pool borrows from when it has nothing to offer: no piece at all,
 * or only the one that has just played. The office pools borrow from the
 * office; the office itself never borrows from the tense pool, because
 * crime-series underscore on a quiet morning is the one wrong answer.
 *
 * The lounge borrows from nobody. Its one piece, run out during a visit,
 * starts again: the dance band's next number in the quiet room would be
 * the wrong room, and with no lounge piece at all playMusic() finds no pool
 * and leaves the hall's piece playing.
 */
export const FALLBACK = { morning: 'day', lunch: 'day', afternoon: 'day', tense: 'day' };

/** The pools that cut in at once instead of waiting for a piece to end. */
export const IMMEDIATE = new Set(['emergency', 'gala', 'lounge', 'lunch']);

// --- the day's arc -------------------------------------------------------------

/** Minutes since midnight at which the morning and the midday end. */
export const MORNING_UNTIL = 10 * 60;
export const MIDDAY_UNTIL = 14 * 60;

/**
 * "Dicke Luft": the next piece comes from the tense pool once anger or radar
 * reaches TENSE_ON, and the mood lets go again only below TENSE_OFF. The gap
 * is the hysteresis - without it a value hovering at the threshold would flip
 * the mood on every scene.
 *
 * Calibrated with `npm run sim -- 3000 --music` (12.11.2026) so that on
 * Normal about one scene in five sounds tense for the casual player: 21.0%,
 * and 13.6% for the sensible one; Friday 10.2%, Monday 28.1%. The plan's
 * starting values, 65/50, gave 44% on Normal - the band would have sounded
 * like a crime series for half of every Wednesday.
 */
export const TENSE_ON = 80;
export const TENSE_OFF = 65;

/**
 * 'tense' or 'calm', given the mood before and the two values that drive it.
 * The thresholds are parameters only so that the day simulator can try
 * others (`--tenseon=`, `--tenseoff=`) through this very function; the game
 * never passes them.
 */
export function nextMood(prev, al, cr, on = TENSE_ON, off = TENSE_OFF) {
    const v = Math.max(al ?? 0, cr ?? 0);
    if (prev === 'tense') return v < off ? 'calm' : 'tense';
    return v >= on ? 'tense' : 'calm';
}

/**
 * Which pool belongs to the moment, in this order of rank: the gala outranks
 * everything (a boss timer left over from the afternoon must not interrupt
 * the evening), the emergency outranks lunch, lunch outranks the mood, and
 * only then does the clock speak.
 *
 *     { party, boss, lunch, tense, minute, loc }
 */
export function housePool(s) {
    if (s.party) return s.loc === 'lounge' ? 'lounge' : 'gala';
    if (s.boss) return 'emergency';
    if (s.lunch) return 'lunch';
    if (s.tense) return 'tense';
    const minute = s.minute ?? 0;
    if (minute < MORNING_UNTIL) return 'morning';
    if (minute < MIDDAY_UNTIL) return 'day';
    return 'afternoon';
}

// --- drawing a piece -------------------------------------------------------------

/** The ids of the pieces in `pool`, in table order. */
export function cuesOf(pool, cues = CUES) {
    return Object.keys(cues).filter(id => cues[id].pool === pool);
}

/**
 * The pool whose pieces stand in for `pool`: the first one along the fallback
 * chain that has any piece at all. A running piece from THIS pool already
 * fits the moment - which is how a morning with no morning pieces of its own
 * keeps its office piece instead of cutting it for another office piece.
 */
export function answeringPool(pool, cues = CUES) {
    const seen = new Set();
    for (let p = pool; p && !seen.has(p); p = FALLBACK[p]) {
        seen.add(p);
        if (cuesOf(p, cues).length) return p;
    }
    return null;
}

/**
 * The pool that will actually answer for `pool`: itself if it has a piece
 * other than `last`, otherwise its fallback, and so on. A pool with exactly
 * one piece that has just played borrows once rather than repeat it at once.
 * Returns null when nothing anywhere along the chain has a piece.
 */
export function resolvePool(pool, last, cues = CUES) {
    const seen = new Set();
    let p = pool;
    let single = null;               // a pool whose only piece is `last`
    while (p && !seen.has(p)) {
        seen.add(p);
        const ids = cuesOf(p, cues);
        if (ids.some(id => id !== last)) return p;
        if (ids.length && single === null) single = p;
        p = FALLBACK[p];
    }
    // Nothing else anywhere: the one piece there is, again, beats silence.
    return single;
}

/**
 * The next piece out of `pool`: a bag per pool, refilled and shuffled when it
 * runs empty, so every piece of a pool plays before any plays twice. The
 * piece that has just played is never drawn straight after itself - not at a
 * refill either, where a plain shuffle puts it first one time in n.
 *
 * `bags` is the caller's object and is written to; `rng` is injectable for
 * the tests. Returns null only if no pool along the chain has a piece.
 */
export function drawCue(pool, bags, last, rng = Math.random, cues = CUES) {
    const p = resolvePool(pool, last, cues);
    if (!p) return null;
    const ids = cuesOf(p, cues);
    let bag = (bags[p] ?? []).filter(id => ids.includes(id));
    if (!bag.length) {
        bag = [...ids];
        for (let i = bag.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [bag[i], bag[j]] = [bag[j], bag[i]];
        }
    }
    // The bag is drawn from its end.
    if (bag.length > 1 && bag[bag.length - 1] === last) {
        [bag[0], bag[bag.length - 1]] = [bag[bag.length - 1], bag[0]];
    }
    const id = bag.pop();
    bags[p] = bag;
    return id;
}

// --- changing over -----------------------------------------------------------------

/**
 * A change of mood may replace a RUNNING piece only once that piece has
 * played SOFT_MIN_PLAYED seconds, over SOFT_FADE_MS, and at most once every
 * SOFT_GAP_MS. Everything else waits for the end of the piece: the clock's
 * arc, and above all the way back from tense to calm - relief that cuts into
 * the middle of a piece sounds like a mistake.
 */
export const SOFT_MIN_PLAYED = 45;      // seconds into the running piece
export const SOFT_FADE_MS = 4000;
export const SOFT_GAP_MS = 90000;

/**
 * What to do about a running piece of `from` while the moment wants `to`:
 *   'keep'  - nothing now; the next piece comes out of `to`
 *   'cut'   - change at once (the emergency, the gala, lunch)
 *   'soft'  - cross-fade now, the rules above permitting
 *
 * `played` is how far into the running piece it is, in seconds; `sinceSoft`
 * the milliseconds since the last soft change.
 */
export function changeOver(from, to, played, sinceSoft) {
    if (from === to) return 'keep';
    if (IMMEDIATE.has(to)) return 'cut';
    // Out of the gala or out of an emergency: neither is a mood, both are over.
    if (from === 'gala' || from === 'lounge' || from === 'emergency') return 'cut';
    const softAllowed = played >= SOFT_MIN_PLAYED && sinceSoft >= SOFT_GAP_MS;
    // Into the tense pool, and out of the canteen, the mood may cut in...
    if ((to === 'tense' || from === 'lunch') && softAllowed) return 'soft';
    // ...but never back to calm, and never for the clock alone.
    return 'keep';
}

// --- the gala's rooms ----------------------------------------------------------------

/**
 * How the hall's band sounds from each station of the gala: a low-pass and a
 * level. The dance floor is in front of the band; the bar and the buffet are
 * at the edge of the hall; the toilet is through a wall and outside is
 * through a door. The foyer between the stations, the CEO's speech and the
 * finale are in the open (OPEN_ROOM). The lounge has a piece of its own
 * instead (housePool). Starting values for the operator's ear (UEBERGABE,
 * "Phase 3"), not measurements.
 *
 * `hz` null means no filter. A station missing here is heard in the open;
 * the week suite holds this table against the six stations lint-data knows.
 */
export const PARTY_ROOMS = {
    dance:   { hz: null, db: 0 },
    bar:     { hz: 6000, db: -2 },
    buffet:  { hz: 6000, db: -2 },
    toilet:  { hz: 450,  db: -8 },
    outside: { hz: 300,  db: -10 },
};
export const OPEN_ROOM = { hz: null, db: 0 };
/** Where the low-pass stands when it filters nothing: above hearing. */
export const OPEN_HZ = 20000;
/** Seconds, setTargetAtTime: a step through a door, not a fade. */
export const ROOM_TAU = 0.25;

/** The sound of station `loc` as { hz, gain }: a cut-off and a linear gain. */
export function roomSound(loc) {
    const room = PARTY_ROOMS[loc] ?? OPEN_ROOM;
    return { hz: room.hz ?? OPEN_HZ, gain: 10 ** (room.db / 20) };
}

// --- density -------------------------------------------------------------------------

/**
 * How hard the day is pushing, 0..1: the LARGEST of the three shares, not
 * their sum. A weighted sum lets a radar of 95 on an otherwise quiet day come
 * out at a quarter, and the band would stay relaxed while the player is a
 * click from being fired. Laziness is not pressure and stays out.
 */
export function pressure({ tickets = 0, al = 0, cr = 0 } = {}) {
    const raw = Math.max(tickets / 10, al / 100, cr / 100);
    return Math.max(0, Math.min(1, raw));
}

/**
 * The rhythm layer of a layered piece, as a linear gain. Below a pressure of
 * PULL_FROM the band only dabs - the rhythm sits at RHYTHM_FLOOR_DB - and from
 * there it comes in, linearly in decibels, until it is all there at 1. The
 * floor is never silence: a bed with no rhythm at all lays the separation's
 * seams bare, and a quiet remainder covers them. These are the values of the
 * density probe the operator heard on 11.11.2026.
 */
export const RHYTHM_FLOOR_DB = -14;
export const PULL_FROM = 0.3;
export const RHYTHM_TAU = 3;            // seconds, setTargetAtTime

export function rhythmGain(p, floorDb = RHYTHM_FLOOR_DB) {
    const pull = Math.max(0, Math.min(1, (p - PULL_FROM) / (1 - PULL_FROM)));
    return 10 ** (floorDb * (1 - pull) / 20);
}

// --- the runtime probe ---------------------------------------------------------------

/**
 * The four tones of the probe file, one per channel. A browser that mixes a
 * four-channel file down to two before the graph leaves channels 3 and 4
 * empty, and the band would play its bed alone forever, without an error -
 * so engine_audio.probeLayers() plays the probe silently once a session and
 * uses the layered files only if every channel carries its own tone.
 */
export const PROBE_TONES = [300, 500, 700, 900];

/**
 * Whether `samples` (a stretch of one channel) carry the tone `hz`: loud
 * enough to be there, and crossing zero as often as that tone does. The
 * crossings are what tell 300 from 700, so a swapped channel fails as surely
 * as an empty one.
 */
export function toneMatches(samples, hz, sampleRate) {
    let sum = 0, crossings = 0;
    for (let i = 0; i < samples.length; i++) {
        sum += samples[i] * samples[i];
        if (i && (samples[i - 1] < 0) !== (samples[i] < 0)) crossings++;
    }
    if (Math.sqrt(sum / samples.length) < 0.02) return false;
    const heard = crossings / 2 / (samples.length / sampleRate);
    return Math.abs(heard - hz) <= hz * 0.1;
}
