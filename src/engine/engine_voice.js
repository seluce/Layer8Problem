import { KEYS } from './keys.js';
import { voiceHash } from './sha1.js';
import { language, t } from '../i18n/i18n.svelte.js';

/**
 * The narrator.
 *
 * Pre-rendered speech, one file per sentence, filed under the checksum of that
 * sentence - so this module never needs a table of what is spoken where. It
 * takes the text the terminal is about to show, hashes it, and asks for that
 * file. A sentence with no file is a sentence nobody recorded: the interface
 * strings, the morning screen, anything written since the last render. Those
 * fall silent, which is the whole point of naming files this way. See
 * tools/voice-text.mjs and engine/sha1.js.
 *
 * ONE ELEMENT, REUSED. 4,648 pieces per language, and an element per piece
 * would be 4,648 of them holding a decoder each. Setting .src on one element
 * replaces what it is playing, which is also exactly the behaviour wanted: a
 * new scene cuts the old line off.
 */
export const voice = {
    narrator: null,
    narratorNode: null,     // only where the element's own volume is refused
    speaking: false,

    /** Built on first use; a player with the narrator off never makes one. */
    _element: function() {
        if (this.narrator) return this.narrator;
        const el = new Audio();
        el.preload = 'none';
        // Ended and failed are the same thing here: the line is over, let the
        // music back up. A missing file is a normal answer, not a fault - see
        // the note at the top - so it is not logged.
        el.addEventListener('ended', () => this._done());
        el.addEventListener('error', () => this._done());
        this.narrator = el;
        return el;
    },

    /**
     * The one volume knob this platform obeys, the same question the music
     * asks. iOS accepts `volume` and ignores it, which on the music meant the
     * slider did nothing - a narrator would have been worse: it would have
     * read every line at full blast over a ducked soundtrack.
     */
    _setNarratorVolume: function(v) {
        const el = this._element();
        const level = Math.max(0, Math.min(1, v));
        if (this.canSetVolume(el)) { el.volume = level; return; }
        if (!this.narratorNode) {
            try {
                if (!this.audioCtx) {
                    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                }
                const src = this.audioCtx.createMediaElementSource(el);
                const gain = this.audioCtx.createGain();
                src.connect(gain);
                gain.connect(this.audioCtx.destination);
                this.narratorNode = gain;
            } catch (err) {
                console.warn('Narrator gain unavailable:', err);
            }
        }
        if (this.narratorNode) this.narratorNode.gain.value = level;
        else el.volume = level;     // refused anyway, but it costs nothing
    },

    _done: function() {
        if (!this.speaking) return;
        this.speaking = false;
        this.duckMusic(false, 'narration');
    },

    /**
     * Reads `text`, if there is a recording of it and nothing says not to.
     *
     * Called from ui._setTerminal for every change of what the terminal shows,
     * so passing nothing is the normal way to stop: going idle, a morning
     * screen, the boot sequence.
     *
     * NOT WHILE A WINDOW STANDS OVER THE TERMINAL - that is the whole
     * difference between this and narrateWindow() below. The same question the
     * keyboard asks before reaching through one, and for a related reason: a
     * door event opens the noticeboard, the intranet or the vending machine
     * over the terminal, and the result underneath it would be read out to a
     * player who is looking at something else. The three doors happen to be
     * safe on their own - their result is an interface line and interface
     * lines have no recording - but the rule has to hold for the window the
     * PLAYER opened too: the backpack, the archive, the settings.
     */
    narrate: function(text) {
        this.hushNarration();      // also drops a line that was only paused
        if (this.windowOverTerminal() || this.state.isEmailOpen) return;
        this._speak(text);
    },

    /**
     * Reads text that belongs to the WINDOW on top, not to the terminal.
     *
     * The rule above exists because a covered terminal is a terminal nobody is
     * reading. It says nothing about the thing doing the covering - and three
     * of those have something to say: H.A.L.G.E.R.D.'s two warnings, the nine
     * tutorial bubbles, and the sample line in the settings. Sent through
     * narrate() every one of them would be refused by the very rule that
     * protects them, because the window they belong to is the window standing
     * over the terminal.
     *
     * So the gate is the only difference, and it is the caller that knows
     * which side of it the text is on. Everything after the gate is shared.
     */
    narrateWindow: function(text) {
        this.hushNarration();
        this._speak(text);
    },

    /**
     * Plays the recording of `text`, if there is one. No questions about what
     * is on screen - see the two callers above for those.
     *
     * A missing file is a normal answer: the interface strings that were not
     * recorded, anything written since the last render. The player hears
     * nothing and the game carries on.
     */
    _speak: function(text) {
        if (!text || !this.state.narrationEnabled) return;
        if (this.state.narrationVolume <= 0) return;

        const el = this._element();
        el.src = `audio/${language()}/${voiceHash(text)}.opus`;
        this._setNarratorVolume(this.state.narrationVolume);
        // Where the gain node carries the volume the element is audible only
        // through the graph, and a suspended context plays to nobody.
        if (this.audioCtx?.state === 'suspended') this.audioCtx.resume();

        this.speaking = true;
        this.duckMusic(true, 'narration');
        el.play().catch(() => this._done());    // no gesture yet, or no file
    },

    /** Stops the line that is running, if one is. Safe to call at any time. */
    hushNarration: function() {
        const el = this.narrator;
        if (el && !el.paused) { el.pause(); el.currentTime = 0; }
        this.interrupted = false;
        this._done();
    },

    /**
     * Holds the line where it is, for something that arrived UNINVITED.
     *
     * The distinction is the whole point. Every other window is one the player
     * opened, and opening a window is a decision to stop listening - those get
     * hushNarration() and the line is over. A mail drops on a two-second timer
     * into the middle of a scene, carries a countdown, and has to be read now;
     * cutting the narrator off for good because the game interrupted the
     * player would lose the rest of a scene nobody chose to leave.
     *
     * So the position is kept and resumeNarration() picks it up again. The
     * music comes back up meanwhile - a pause is not a duck.
     */
    interrupted: false,
    pauseNarration: function() {
        const el = this.narrator;
        if (!this.speaking || !el || el.paused) return;
        el.pause();
        this.interrupted = true;
        this.speaking = false;
        this.duckMusic(false, 'narration');
    },

    resumeNarration: function() {
        if (!this.interrupted) return;
        this.interrupted = false;
        const el = this.narrator;
        // Only if there is still something to say, and nothing has taken the
        // terminal's place in the meantime.
        if (!el || !el.src || el.ended) return;
        if (!this.state.narrationEnabled || this.state.narrationVolume <= 0) return;

        // windowOverTerminal() and NOT state.isEmailOpen, which is the one
        // question narrate() asks that this one must not.
        //
        // All four closing paths call hideOverlay() first and clear the flag
        // on the next line - so at the moment the line would come back, the
        // flag still describes the window that is going. Asking it here meant
        // the resume never once fired: the pause held 10.49 seconds of a
        // coffee scene and then threw them away. Found in the preview, which
        // is the only place the order is visible.
        //
        // Reordering those four was the other way, and the wrong one: a fifth
        // closing path would have to remember, and nothing would say so.
        if (this.windowOverTerminal()) return;
        this.speaking = true;
        this.duckMusic(true, 'narration');
        el.play().catch(() => this._done());
    },

    toggleNarration: function(isOn) {
        this.state.narrationEnabled = isOn;
        localStorage.setItem(KEYS.narrationEnabled, isOn);
        if (!isOn) { this.hushNarration(); return; }
        this.previewNarration();
    },

    /**
     * What the switch and the slider sound like.
     *
     * The effects and the music answer the moment they are touched; the
     * narrator could not, because it had no recording of its own - every one
     * of its 4,648 files belongs to a scene, and the settings stand over the
     * terminal where the narrator is not allowed to speak anyway. So it has
     * one sentence of its own, recorded with the rest.
     *
     * Deliberately NOT on every step of the slider: a five-second line
     * restarting on each tick of a drag is not a volume control, it is a
     * stutter. The slider plays it when it is let go.
     *
     * i18n-uses: set.narration.sample
     */
    previewNarration: function() {
        this.narrateWindow(t('set.narration.sample'));
    },

    /**
     * The slider. Follows the voice that is speaking right now rather than
     * waiting for the next line - a volume control you cannot hear is a volume
     * control nobody trusts.
     */
    setNarrationVolume: function(val) {
        this.state.narrationVolume = parseFloat(val);
        localStorage.setItem(KEYS.narrationVolume, val);
        if (this.speaking) this._setNarratorVolume(this.state.narrationVolume);
    }
};
