import { KEYS } from './keys.js';
import { DEFAULT_NARRATION_KINDS } from './engine_state.svelte.js';
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
    speaking: false,        // moved only through _setSpeaking(), see there

    // Who the running line belongs to: 'terminal' (narrate, the button) or
    // 'window' (narrateWindow). It decides what an uninvited window may give
    // back while another still stands, and whose line ends with a window.
    lineOwner: null,
    lineOnDemand: false,    // started by the button: the switch does not apply
    lineKind: null,         // events / morning / valves / halgerd / sample

    // A terminal line that arrived while an uninvited window stood over the
    // terminal - see narrate(). Spoken when the last of them closes.
    heldLine: null,
    heldKind: null,

    // A line paused, or held back before it started, because the tab is not
    // being looked at - see syncNarrationToVisibility().
    pausedByTab: false,

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

    /**
     * The one place the flag moves.
     *
     * The read-aloud button has to know whether a line is running, and a
     * component cannot watch `this.speaking`: the
     * modules are SPREAD into `engine` (see src/engine.js), so an accessor
     * declared here would be flattened to its value at startup and never fire
     * again. The rune state holds the copy a view may read, and this keeps the
     * two from parting company.
     */
    _setSpeaking: function(on) {
        this.speaking = on;
        this.state.narrating = on;
    },

    _done: function() {
        if (!this.speaking) return;
        this._setSpeaking(false);
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
    narrate: function(text, kind = 'events') {
        // What the TERMINAL last showed, which is what the read-aloud button
        // offers to read again - set even when a gate below refuses, because
        // the refusal is about a window being in the way and the button is
        // underneath it. Window text goes through narrateWindow() and
        // deliberately does NOT land here: the button would otherwise offer to
        // repeat a tutorial bubble over a working day.
        this.state.narratable = text || null;

        // A window the player opened: the scene is over for now, and a new
        // one arriving behind it is not read either.
        if (this.windowOverTerminal()) { this.hushNarration(); return; }

        // An UNINVITED window - a mail, or a notice such as the written
        // warning - is different, and the notices are why this branch exists.
        // They open from checkEndConditions() inside the same click that
        // produces the result, and BEFORE the result reaches the terminal; so
        // the result used to be read out behind the warning, and anything the
        // warning had to say itself would have been cut off by it. Now the new screen
        // is held and spoken when the last such window closes. It supersedes
        // a terminal line that was only paused - the screen has moved on -
        // and leaves a line that belongs to the window alone.
        if (this._interruptions?.size || this.state.isEmailOpen) {
            this.heldLine = text || null;
            this.heldKind = kind;
            if (this.lineOwner === 'terminal') this.interrupted = false;
            return;
        }

        this.hushNarration();      // also drops a line that was only paused
        this._speak(text, false, 'terminal', kind);
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
    // A window's own text is H.A.L.G.E.R.D. or the lesson unless it says
    // otherwise - the valves pass 'valves', the settings' sample 'sample'.
    narrateWindow: function(text, kind = 'halgerd') {
        this.hushNarration();
        this._speak(text, false, 'window', kind);
    },

    /**
     * Plays the recording of `text`, if there is one. No questions about what
     * is on screen - see the two callers above for those.
     *
     * A missing file is a normal answer: the interface strings that were not
     * recorded, anything written since the last render. The player hears
     * nothing and the game carries on.
     */
    _speak: function(text, onDemand = false, owner = 'terminal', kind = 'events') {
        if (!text) return;
        // `onDemand` is the button, and it is the one caller allowed past the
        // switch - see replayNarration() for why. The VOLUME still decides
        // either way: zero is a request for silence, not a preference about
        // automatic reading.
        if (!onDemand && !this.state.narrationEnabled) return;
        // And past the kinds, for the same reason: switching off the morning
        // screen means "do not read it to me", not "never let me hear it".
        // The settings' sample always plays - it is what the slider sounds like.
        if (!onDemand && kind !== 'sample' && !this.kindAllowed(kind)) return;
        if (this.state.narrationVolume <= 0) return;

        const el = this._element();
        el.src = `audio/${language()}/${voiceHash(text)}.opus`;
        this.lineOwner = owner;
        this.lineOnDemand = onDemand;
        this.lineKind = kind;
        this._setNarratorVolume(this.state.narrationVolume);
        // Where the gain node carries the volume the element is audible only
        // through the graph, and a suspended context plays to nobody.
        if (this.audioCtx?.state === 'suspended') this.audioCtx.resume();

        // Not started in a tab nobody is looking at - loaded, and owed to the
        // moment the player comes back. The music's rule, and for the same
        // reason; a boss timer can still resolve a scene while the tab is away.
        if (globalThis.document?.hidden) { this.pausedByTab = true; return; }

        this._setSpeaking(true);
        this.duckMusic(true, 'narration');
        el.play().catch(() => this._done());    // no gesture yet, or no file
    },

    /** Plays the element from where it stands. The one place a held-back line starts. */
    _unpause: function() {
        const el = this.narrator;
        if (!el || !el.src || el.ended) return;
        if (!(this.lineOnDemand || this.state.narrationEnabled)) return;
        if (this.state.narrationVolume <= 0) return;
        this._setSpeaking(true);
        this.duckMusic(true, 'narration');
        el.play().catch(() => this._done());
    },

    /**
     * The small button beside the excuse (and at the end of a result's
     * pills): read that again, or stop it.
     *
     * The third door, and the only one that goes past `narrationEnabled`. That
     * is the whole point of it. Switching the narrator off is not a request for
     * silence, it is a request not to be read to automatically - and a scene of
     * 1,800 characters is exactly where somebody might want it once. Without
     * this door the button would be dead for every player who had turned the
     * voice off, which is the player it is for.
     *
     * One button, so one press means stop while a line is running. Stop and not
     * pause: pausing is what an UNINVITED window does to a line (see
     * pauseNarration), and a press is a decision rather than an interruption.
     *
     * No window gate, because it cannot need one - the button sits in the
     * terminal, so a window over the terminal is a window over the button.
     */
    /**
     * Whether the button is offered at all - asked by both screens that show
     * it, so the condition exists once. Read inside a $derived it is reactive:
     * Svelte tracks what a derived reads, through function calls too.
     *
     * NOT narrationEnabled, see replayNarration(). The volume, because zero is
     * a request for silence and a button that then does nothing is worse than
     * no button.
     */
    /** Whether the narrator reads this kind of text on its own. */
    kindAllowed: function(kind) {
        const kinds = this.state.narrationKinds ?? DEFAULT_NARRATION_KINDS;
        return kinds[kind] !== false;
    },

    /**
     * One kind on or off. Turning off the kind that is being read right now
     * stops it - leaving it to run would be the setting saying one thing and
     * the speakers another. The button is not affected: see _speak.
     */
    setNarrationKind: function(kind, on) {
        if (!Object.hasOwn(DEFAULT_NARRATION_KINDS, kind)) return;
        this.state.narrationKinds = { ...this.state.narrationKinds, [kind]: !!on };
        try { localStorage.setItem(KEYS.narrationKinds, JSON.stringify(this.state.narrationKinds)); }
        catch { /* no storage: the choice lasts the session */ }
        if (!on && this.speaking && this.lineKind === kind && !this.lineOnDemand) this.hushNarration();
    },

    canReplayNarration: function() {
        return !!this.state.narratable && this.state.narrationVolume > 0;
    },

    replayNarration: function() {
        if (this.speaking) { this.hushNarration(); return; }
        if (!this.state.narratable) return;
        this.hushNarration();       // drops a line that was only paused
        this._speak(this.state.narratable, true, 'terminal',
                    this.state.terminal?.mode === 'morning' ? 'morning' : 'events');
    },

    /** Stops the line that is running, if one is. Safe to call at any time. */
    hushNarration: function() {
        const el = this.narrator;
        if (el && !el.paused) { el.pause(); el.currentTime = 0; }
        // Owes nothing afterwards: not a paused line, not one held behind a
        // window, not one waiting for the tab to come back.
        this.interrupted = false;
        this.heldLine = null;
        this.heldKind = null;
        this.pausedByTab = false;
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
        this._setSpeaking(false);
        this.duckMusic(false, 'narration');
    },

    /**
     * Called when an uninvited window closes (engine_ui.hideOverlay).
     *
     * windowOverTerminal() and NOT state.isEmailOpen, which is the one
     * question narrate() asks that this one must not. All four closing paths
     * call hideOverlay() first and clear the flag on the next line - so at the
     * moment the line would come back, the flag still describes the window
     * that is going. Asking it here meant the resume never once fired: the
     * pause held 10.49 seconds of a coffee scene and then threw them away.
     * dismissModal() has the same shape - it empties state.modal before the
     * notice disappears - which is why the interruptions are booked when a
     * window OPENS (engine_ui) rather than asked about when it closes.
     */
    resumeNarration: function() {
        // A window the player opened on top ends the scene for good - nothing
        // stays owed, neither the paused line nor one held behind the notice.
        if (this.windowOverTerminal()) { this.interrupted = false; this.heldLine = null; return; }

        // Another uninvited window still stands - a mail that dropped onto a
        // notice, say. Only a line that belongs to a window may come back
        // then; the terminal is still covered.
        if (this._interruptions?.size) {
            if (this.interrupted && this.lineOwner === 'window') {
                this.interrupted = false;
                this._unpause();
            }
            return;
        }

        // The last one closed. A screen held behind it wins over anything
        // paused, because it is what the player now looks at; spoken directly
        // rather than through narrate(), which would ask state.isEmailOpen.
        if (this.heldLine) {
            const text = this.heldLine, kind = this.heldKind ?? 'events';
            this.hushNarration();
            this._speak(text, false, 'terminal', kind);
            return;
        }

        if (this.interrupted) {
            this.interrupted = false;
            // A window's own line ends with its window. Without this the
            // warning would go on reading after "Understood".
            if (this.lineOwner === 'window') { this.hushNarration(); return; }
            this._unpause();
            return;
        }

        // Nothing was paused, but the window's own voice may still be running
        // - the player closed the notice mid-sentence.
        if (this.speaking && this.lineOwner === 'window') this.hushNarration();
    },

    /**
     * The tab, for the same reason as the music: a voice in a tab nobody is
     * looking at is noise from somewhere. Paused on the way out and picked up
     * on the way back - including a line that arrived while the tab was away
     * and was loaded but not started (see _speak).
     */
    syncNarrationToVisibility: function() {
        const el = this.narrator;
        if (globalThis.document?.hidden) {
            if (!this.speaking || !el || el.paused) return;
            el.pause();
            this.pausedByTab = true;
            this._setSpeaking(false);
            this.duckMusic(false, 'narration');
            return;
        }
        if (!this.pausedByTab) return;
        this.pausedByTab = false;
        // Not over a window the player opened in the meantime, and not while
        // a mail or a notice holds the terminal: those settle it on closing.
        if (this.windowOverTerminal()) return;
        if (this._interruptions?.size && this.lineOwner !== 'window') return;
        this._unpause();
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
        this.narrateWindow(t('set.narration.sample'), 'sample');
    },

    /**
     * The slider. Follows the voice that is speaking right now rather than
     * waiting for the next line - a volume control you cannot hear is a volume
     * control nobody trusts.
     */
    setNarrationVolume: function(val) {
        this.state.narrationVolume = parseFloat(val);
        localStorage.setItem(KEYS.narrationVolume, val);
        // Zero ends the line rather than muting it. Muted, it ran on to its
        // last word with the music still ducked under nobody - up to a minute
        // of quiet radio on a long scene - and the button that could have
        // stopped it had already disappeared, because zero is when it is not
        // offered. Found by the narration audit (01.11.2026).
        if (this.state.narrationVolume <= 0) { this.hushNarration(); return; }
        if (this.speaking) this._setNarratorVolume(this.state.narrationVolume);
    }
};
