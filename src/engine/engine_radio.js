import { KEYS } from './keys.js';
import { voiceHash } from './sha1.js';
import { drawAmong, returnToBag } from './draw_bag.js';
import { WEEK_DAY_KEYS } from './engine_week.js';
import { DB, ensure } from '../data.js';
import { language } from '../i18n/i18n.svelte.js';
import { MUSIC_DIR, MUSIC_STINGS } from './music_files.js';

/**
 * GlobalCorp FM, the company radio (7.2).
 *
 * Short spots in a voice of their own (src/data/<lang>/data_radio.js), filed
 * like the narrator's lines under the checksum of their text - but in
 * audio/fm/<lang>/, so a spot and a scene that happened to say the same words
 * could never find each other's recording.
 *
 * THE GAME COMES FIRST. A spot starts only in a quiet moment and ends the
 * moment the game wants the room back:
 *
 *   - quiet means the narrator has said nothing for RADIO_QUIET_MS, the
 *     terminal has not changed for as long, and what it shows is not a
 *     decision (idle, a result, the morning screen). A spot that started
 *     over an open question would be cut off by the answer, nearly always.
 *   - nothing stands over the terminal, no mail and no notice, no emergency,
 *     not the gala, not the lesson, not a page nobody is looking at;
 *   - RADIO_GAP_MS since the last spot, and a roll of RADIO_CHANCE on top,
 *     so the station is not a metronome.
 *
 * It fades out in RADIO_FADE_MS when the narrator starts (engine_voice.
 * _setSpeaking), when any window opens (engine_ui.showOverlay and the three
 * windows that open on a state flag), at the end of the day, at the gala and
 * on a language switch. The tick asks the hard conditions again every two
 * seconds as the net under all of those.
 *
 * ITS OWN ELEMENT. The narrator has one, with rules for pausing it, holding a
 * line behind a window and giving it back; none of that may notice the radio.
 * state.narratable is never written here, so the read-aloud button never
 * offers to repeat a spot.
 *
 * THE STATION ID. The sung jingle (MUSIC_STINGS.fm_jingle, mastered by
 * tools/master-music.mjs to the spots' loudness) comes before the first spot
 * of a day and then before every RADIO_JINGLE_EVERY-th, on the same element:
 * `ended` on the jingle starts the spot, `ended` on the spot ends it. A
 * jingle that fails to load costs the spot nothing. A third of the spots say
 * the station's name in their first sentence, which is how a real station
 * follows its jingle; before every spot it would wear out within a morning.
 *
 * HARDLY HEARD IS NOT HEARD. A spot the game cuts during its jingle or in
 * its first RADIO_EARLY_MS goes back into the day: not heard, back in the
 * bag, its kind and its jingle as they were, and the next try after
 * RADIO_RETRY_MS instead of the full gap. The player's own stop (endSpot)
 * is an answer, not an interruption - that spot counts, whenever it ended.
 *
 * NOTHING IN THE SAVE. Which spots a day has heard lives in memory and is
 * forgotten by a reload; the bag in draw_bag.js keeps the next one from being
 * one heard a minute ago.
 */

/** How often the station asks whether it may speak. */
export const RADIO_TICK_MS = 2000;
/** How long the narrator and the terminal must have been quiet. */
export const RADIO_QUIET_MS = 8000;
/** The least time between the end of one spot and the start of the next. */
export const RADIO_GAP_MS = 4 * 60 * 1000;
/** The morning screen's head start: the first spot of a day may come early. */
export const RADIO_FIRST_MS = 15 * 1000;
/** The chance per quiet tick, once everything else allows it. */
export const RADIO_CHANCE = 0.15;
/** Out, when the game wants the room back. */
export const RADIO_FADE_MS = 300;
/**
 * Hardly heard: cut during the jingle or before the spot itself has run this
 * long. Measured in the play test of 13.11.2026: a spot that started into the
 * player's next click lasted 1.8 s and cost the station the spot and four
 * minutes. The retry waits a minute and a half, so a player clicking briskly
 * does not hear a fragment every minute instead.
 */
export const RADIO_EARLY_MS = 5000;
export const RADIO_RETRY_MS = 90 * 1000;
/** The station ID before the first spot of a day, then before every this many. */
export const RADIO_JINGLE_EVERY = 3;
/** What the terminal may show for a spot to begin - never an open question. */
export const RADIO_MODES = ['idle', 'result', 'morning'];

/**
 * The day a spot's `if.day` is held against: in a week the real one, in day
 * mode the one the level stands for (relaxed Friday, ordinary Wednesday,
 * Monday) - the diary's rule, as an id.
 */
export function radioDayKey(state) {
    if (state.week?.active) return WEEK_DAY_KEYS[(state.week.dayIndex ?? 1) - 1] ?? WEEK_DAY_KEYS[0];
    const mult = state.difficultyMult ?? 1.0;
    return mult > 1.0 ? 'mon' : mult < 1.0 ? 'fri' : 'wed';
}

/** What a spot's conditions are held against, read off the state once. */
export function radioContext(state) {
    return {
        minute: state.time ?? 0,
        tickets: state.tickets ?? 0,
        l: state.fl ?? 0, a: state.al ?? 0, b: state.cr ?? 0,
        day: radioDayKey(state),
    };
}

/** Does this spot fit the moment? `when` is [from, to), `if` all at least. */
export function spotFits(spot, ctx) {
    if (spot.when) {
        const [from, to] = spot.when;
        if (ctx.minute < from || ctx.minute >= to) return false;
    }
    const c = spot.if;
    if (c) {
        if (c.tickets !== undefined && ctx.tickets < c.tickets) return false;
        for (const k of ['l', 'a', 'b']) if (c[k] !== undefined && ctx[k] < c[k]) return false;
        if (c.day !== undefined && ctx.day !== c.day) return false;
    }
    return true;
}

/**
 * The spots worth drawing from now, as indices. Not one heard today, not the
 * kind just played; and where a spot whose `if` holds is among them, only
 * those - the station noticing the queue beats the weather.
 */
export function radioChoices(spots, ctx, heard, lastKind) {
    const open = [];
    spots.forEach((s, i) => {
        if (!heard.has(i) && s.kind !== lastKind && spotFits(s, ctx)) open.push(i);
    });
    const pointed = open.filter(i => spots[i].if);
    return pointed.length ? pointed : open;
}

export const radio = {
    radioEl: null,
    radioNode: null,        // only where the element's own volume is refused
    radioTimer: null,
    radioFadeTimer: null,
    // The spot on air, as an index into DB.radio, or null.
    radioIndex: null,
    radioPausedByTab: false,
    // Wall-clock times (radioClock), not the game's: the gap is for the ear.
    radioNextAt: 0,
    radioStillSince: 0,
    // Built on first use, not here: the module is SPREAD into the engine, and
    // a Set written at module scope would be shared by every spread of it.
    radioHeard: null,
    radioLastKind: null,
    // True while the station ID plays ahead of the spot in radioIndex, whose
    // file waits in radioSpotSrc. Counted per day (radioNewDay), so the
    // morning's first spot always has it.
    radioJingle: false,
    radioSpotSrc: null,
    radioSinceJingle: Infinity,
    // radioClock() when the spot's own file began (null while the jingle
    // plays), and what a take-back restores: the kind and the jingle count
    // from before the draw.
    radioSpotAt: null,
    radioUndo: null,
    // Overridden by the test bench, which cannot wait four minutes.
    radioClock: () => Date.now(),
    radioRandom: () => Math.random(),

    /** Once, at boot. The pool is fetched on the way; the tick waits for it. */
    startRadio: function() {
        if (this.radioTimer) return;
        ensure('radio').catch(() => { /* no spots, no station */ });
        this.radioTimer = setInterval(() => this.radioTick(), RADIO_TICK_MS);
    },

    /** A new working day: the morning show may come early, and anything may come again. */
    radioNewDay: function() {
        this.radioHeard = new Set();
        this.radioLastKind = null;
        this.radioSinceJingle = Infinity;
        this.radioNextAt = this.radioClock() + RADIO_FIRST_MS;
    },

    /**
     * Something happened on screen or in the narrator's mouth: the quiet
     * starts again from now. Called by narrate() for every change of the
     * terminal and by the narrator falling silent.
     */
    radioActivity: function() {
        this.radioStillSince = this.radioClock();
    },

    /**
     * Whatever ends a spot that is already on air. Asked by the tick as the
     * net under the hooks that cut it at once.
     */
    radioBlocked: function() {
        const s = this.state;
        if (!s.fmEnabled || !(s.narrationVolume > 0)) return true;
        if (s.isPartyMode || this.lesson?.isActive) return true;
        // currentEventType still names an emergency after it is over (see
        // musicSnapshot), so it counts only while the event is on screen.
        if (s.bossTimer || (s.activeEvent && s.currentEventType === 'boss')) return true;
        if (s.isEmailOpen || this._interruptions?.size || s.modal?.open) return true;
        if (s.terminal?.mode === 'boot') return true;
        if (this.isStartupOverlayOpen?.()) return true;
        return this.windowOverTerminal();
    },

    /** Everything a spot needs before it may begin. */
    radioMayStart: function() {
        if (this.radioIndex !== null) return false;
        if (!Array.isArray(DB.radio) || !DB.radio.length) return false;
        if (this.radioBlocked()) return false;
        const s = this.state;
        if (!RADIO_MODES.includes(s.terminal?.mode)) return false;
        if (s.phone?.open) return false;
        if (globalThis.document?.hidden) return false;
        // The narrator speaking, or owed a line it was made to pause.
        if (this.speaking || this.interrupted || this.heldLine || this.pausedByTab) return false;
        const now = this.radioClock();
        if (now < this.radioNextAt) return false;
        return now - this.radioStillSince >= RADIO_QUIET_MS;
    },

    radioTick: function() {
        if (this.radioIndex !== null) {
            if (this.radioBlocked()) this.cutRadio();
            return;
        }
        if (!this.radioMayStart()) return;
        if (this.radioRandom() >= RADIO_CHANCE) return;
        this.playSpot();
    },

    /** Draws a spot that fits and puts it on air. Returns its index, or null. */
    playSpot: function() {
        const spots = DB.radio;
        const heard = (this.radioHeard ??= new Set());
        const choices = radioChoices(spots, radioContext(this.state), heard, this.radioLastKind);
        const index = drawAmong('radio', spots.length, choices);
        if (index === null) return null;
        this.radioUndo = { lastKind: this.radioLastKind, sinceJingle: this.radioSinceJingle };
        heard.add(index);
        this.radioLastKind = spots[index].kind;

        const el = this.radioElement();
        clearInterval(this.radioFadeTimer);
        this.radioFadeTimer = null;
        // One language-free jingle for both trees; the spot is filed by its text.
        const jingle = this.radioSinceJingle >= RADIO_JINGLE_EVERY - 1 ? MUSIC_STINGS.fm_jingle : null;
        this.radioSinceJingle = jingle ? 0 : this.radioSinceJingle + 1;
        this.radioJingle = !!jingle;
        this.radioSpotSrc = `audio/fm/${language()}/${voiceHash(spots[index].text)}.opus`;
        el.src = jingle ? MUSIC_DIR + jingle.stereo : this.radioSpotSrc;
        el.currentTime = 0;
        this.radioSpotAt = jingle ? null : this.radioClock();
        this.radioIndex = index;
        this.state.fmOnAir = true;
        this.setRadioLevel(this.state.narrationVolume);
        if (this.audioCtx?.state === 'suspended') this.audioCtx.resume();
        this.duckMusic(true, 'radio');
        const src = el.src;
        // No file - not rendered yet, or a language that has none - is the
        // same answer as the narrator's: the spot is over before it began.
        el.play().catch(() => { if (el.src === src) this.radioDone(); });
        return index;
    },

    radioElement: function() {
        if (this.radioEl) return this.radioEl;
        const el = new Audio();
        el.preload = 'none';
        el.addEventListener('ended', () => this.radioNext());
        el.addEventListener('error', () => this.radioNext());
        this.radioEl = el;
        return el;
    },

    /**
     * The element has nothing more to play - ended, or failed to load. After
     * the station ID that is the spot's cue; after the spot, the end. Nothing
     * on air (cut while the jingle rang out) means nothing follows.
     */
    radioNext: function() {
        if (this.radioIndex === null) return;
        if (!this.radioJingle) { this.radioDone(); return; }
        this.radioJingle = false;
        // The station ID has been heard; only the spot can still be taken back.
        if (this.radioUndo) this.radioUndo.sinceJingle = this.radioSinceJingle;
        this.radioSpotAt = this.radioClock();
        const el = this.radioEl;
        el.src = this.radioSpotSrc;
        el.currentTime = 0;
        const src = el.src;
        el.play().catch(() => { if (el.src === src) this.radioDone(); });
    },

    /**
     * The spot is over - ended, failed or cut. Idempotent: the fade below
     * still has the element playing for a moment, and its `ended` may come.
     */
    radioDone: function() {
        if (this.radioIndex === null) return;
        this.radioIndex = null;
        this.radioPausedByTab = false;
        this.state.fmOnAir = false;
        const now = this.radioClock();
        this.radioNextAt = now + RADIO_GAP_MS;
        this.radioStillSince = now;
        this.duckMusic(false, 'radio');
    },

    /**
     * The game wants the room back. The spot is over at once - the flag, the
     * duck and the gap go now - and the sound follows in RADIO_FADE_MS, so
     * the cut is not a click. Safe to call with nothing on air. A spot
     * hardly heard is taken back (radioTakeBack) unless `heard` says the
     * player ended it.
     */
    cutRadio: function(heard = false) {
        if (this.radioIndex === null) return;
        const early = !heard && (this.radioSpotAt === null || this.radioClock() - this.radioSpotAt < RADIO_EARLY_MS);
        const index = this.radioIndex;
        this.radioDone();
        if (early) this.radioTakeBack(index);
        const el = this.radioEl;
        if (!el || el.paused) return;
        // Real time, not radioClock(): the fade is for the ear, and a bench
        // that holds its clock still would hold the fade open for ever.
        const start = Date.now();
        const from = this.state.narrationVolume ?? 1;
        clearInterval(this.radioFadeTimer);
        this.radioFadeTimer = setInterval(() => {
            const t = Math.min(1, (Date.now() - start) / RADIO_FADE_MS);
            this.setRadioLevel(from * (1 - t));
            if (t < 1) return;
            clearInterval(this.radioFadeTimer);
            this.radioFadeTimer = null;
            el.pause();
            el.currentTime = 0;
        }, 30);
    },

    /** The ON AIR button: the player wants the room. The spot counts as heard. */
    endSpot: function() {
        this.cutRadio(true);
    },

    /**
     * A spot hardly heard goes back into the day, as if it had never been
     * drawn - except that the station ID, once it rang out, stays heard.
     */
    radioTakeBack: function(index) {
        this.radioHeard?.delete(index);
        returnToBag('radio', index);
        if (this.radioUndo) {
            this.radioLastKind = this.radioUndo.lastKind;
            this.radioSinceJingle = this.radioUndo.sinceJingle;
        }
        this.radioNextAt = this.radioClock() + RADIO_RETRY_MS;
    },

    /** The narrator's level, on the one knob this platform obeys (see _setNarratorVolume). */
    setRadioLevel: function(v) {
        const el = this.radioElement();
        const level = Math.max(0, Math.min(1, v));
        if (this.canSetVolume(el)) { el.volume = level; return; }
        if (!this.radioNode) {
            try {
                if (!this.audioCtx) this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const src = this.audioCtx.createMediaElementSource(el);
                const gain = this.audioCtx.createGain();
                src.connect(gain);
                gain.connect(this.audioCtx.destination);
                this.radioNode = gain;
            } catch (err) {
                console.warn('Radio gain unavailable:', err);
            }
        }
        if (this.radioNode) this.radioNode.gain.value = level;
        else el.volume = level;
    },

    /** The narrator's slider moved: a spot on air follows it. */
    followRadioLevel: function() {
        if (this.radioIndex !== null && !this.radioFadeTimer) this.setRadioLevel(this.state.narrationVolume);
    },

    /**
     * The tab: paused on the way out, picked up on the way back - unless the
     * game took the room meanwhile, in which case the spot is over.
     */
    syncRadioToVisibility: function() {
        const el = this.radioEl;
        if (this.radioIndex === null || !el) return;
        if (globalThis.document?.hidden) {
            if (el.paused) return;
            el.pause();
            this.radioPausedByTab = true;
            this.duckMusic(false, 'radio');
            return;
        }
        if (!this.radioPausedByTab) return;
        this.radioPausedByTab = false;
        if (this.radioBlocked() || this.speaking) { this.radioDone(); return; }
        this.duckMusic(true, 'radio');
        const src = el.src;
        el.play().catch(() => { if (el.src === src) this.radioDone(); });
    },

    /** The switch in the settings. Off ends a spot on air. */
    toggleRadio: function(isOn) {
        this.state.fmEnabled = !!isOn;
        try { localStorage.setItem(KEYS.fm, String(!!isOn)); } catch { /* the session keeps it */ }
        if (!isOn) this.cutRadio();
    },
};
