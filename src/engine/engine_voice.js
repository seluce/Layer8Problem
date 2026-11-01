import { KEYS } from './keys.js';
import { voiceHash } from './sha1.js';
import { language } from '../i18n/i18n.svelte.js';

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
     * NOT WHILE A WINDOW STANDS OVER THE TERMINAL. The same question the
     * keyboard asks before reaching through one, and for a related reason: a
     * door event opens the noticeboard, the intranet or the vending machine
     * over the terminal, and the result underneath it would be read out to a
     * player who is looking at something else. The three doors happen to be
     * safe on their own - their result is an interface line and interface
     * lines have no recording - but the rule has to hold for the window the
     * PLAYER opened too: the backpack, the archive, the settings.
     */
    narrate: function(text) {
        this.hushNarration();
        if (!text || !this.state.narrationEnabled) return;
        if (this.state.narrationVolume <= 0) return;
        if (this.windowOverTerminal() || this.state.isEmailOpen) return;

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
        this._done();
    },

    toggleNarration: function(isOn) {
        this.state.narrationEnabled = isOn;
        localStorage.setItem(KEYS.narrationEnabled, isOn);
        if (!isOn) this.hushNarration();
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
