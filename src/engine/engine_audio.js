import { KEYS } from './keys.js';

// --- The vending machine's voice (6.3) ---------------------------------------
// The first sounds in the set that are more than one oscillator: a coil, a
// pane of glass and a magazine need noise, and noise needs a buffer. Still no
// audio FILES - generated like everything else here; by GLOSSAR 2a the
// machine is what speaks, and this one is a machine. Loudness stays at the
// level of the rest - measured, not guessed: rendered offline at 50% volume,
// each lands between 0.07 and 0.11 peak like the game's own clicks and mails.
// Filtered noise loses most of its energy in the filter, which is why the
// scrape's numbers look large. The low thump peaks higher (0.19) because the
// ear hears low notes quieter. Whether they SOUND right was decided by ear, on
// a probe page that played each one next to the game's own; the page went
// once they were accepted.

let noise = null;
const noiseBuffer = (ctx) => {
    if (noise && noise.sampleRate === ctx.sampleRate) return noise;
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return noise;
};

// One shape for both helpers: up from silence in `attack`, down again over
// `dur`. Exponential ramps cannot reach zero, hence the 0.0001 at both ends.
const envelope = (ctx, t, peak, attack, dur) => {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    g.connect(ctx.destination);
    return g;
};

/** Filtered noise: ticks, clacks, scrapes, paper. */
const burst = (ctx, t, { dur, filter = 'bandpass', freq, to = freq, q = 1, peak, attack = 0.002 }) => {
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(ctx);
    const f = ctx.createBiquadFilter();
    f.type = filter;
    f.Q.value = q;
    f.frequency.setValueAtTime(freq, t);
    if (to !== freq) f.frequency.exponentialRampToValueAtTime(to, t + dur);
    src.connect(f);
    f.connect(envelope(ctx, t, peak, attack, dur));
    // A different stretch of the buffer each time, so two ticks never match.
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.02);
};

/** A pitched voice that falls or rings out: knocks, glass, the lift. */
const ring = (ctx, t, { wave = 'sine', freq, to = freq, dur, peak, attack = 0.003 }) => {
    const o = ctx.createOscillator();
    o.type = wave;
    o.frequency.setValueAtTime(freq, t);
    if (to !== freq) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    o.connect(envelope(ctx, t, peak, attack, dur));
    o.start(t);
    o.stop(t + dur + 0.02);
};

const VENDING_VOICES = {
    // One turn of the coil by hand: the pawl ticks over three teeth, then the
    // coil drops into place with a clack and a knock through the cabinet.
    // Every turn sounds the same - the sameness is the joke.
    crank: (ctx, t, v) => {
        for (const [dt, p] of [[0, 0.10], [0.035, 0.08], [0.07, 0.06]])
            burst(ctx, t + dt, { dur: 0.018, freq: 3200, q: 4, peak: p * v });
        burst(ctx, t + 0.12, { dur: 0.05, freq: 1300, q: 2.5, peak: 0.22 * v });
        ring(ctx, t + 0.12, { freq: 150, to: 70, dur: 0.08, peak: 0.18 * v });
    },
    // The roll hits the pane: a dull knock with a short glassy ring on top.
    glass: (ctx, t, v) => {
        burst(ctx, t, { dur: 0.02, filter: 'highpass', freq: 2500, peak: 0.10 * v });
        ring(ctx, t, { freq: 220, to: 160, dur: 0.06, peak: 0.12 * v });
        ring(ctx, t, { freq: 1180, dur: 0.22, peak: 0.07 * v });
        ring(ctx, t, { freq: 2960, dur: 0.12, peak: 0.03 * v });
    },
    // It slides a little and catches again: a rising scrape, then a tick.
    scrape: (ctx, t, v) => {
        burst(ctx, t, { dur: 0.32, freq: 700, to: 1600, q: 1.2, peak: 0.45 * v, attack: 0.04 });
        burst(ctx, t + 0.34, { dur: 0.03, freq: 1300, q: 1.5, peak: 0.30 * v });
    },
    // The thud in the flap: low and soft, then the flap rattles twice.
    thud: (ctx, t, v) => {
        ring(ctx, t, { freq: 115, to: 42, dur: 0.28, peak: 0.42 * v });
        burst(ctx, t, { dur: 0.09, filter: 'lowpass', freq: 380, peak: 0.30 * v });
        burst(ctx, t + 0.07, { dur: 0.03, freq: 650, q: 3, peak: 0.06 * v });
        burst(ctx, t + 0.13, { dur: 0.025, freq: 700, q: 3, peak: 0.035 * v });
    },
    // The lift arrives: one soft chime with a long tail. One, because it came
    // UP - two chimes would be a lift going down.
    ding: (ctx, t, v) => {
        ring(ctx, t, { freq: 1046.5, dur: 1.6, peak: 0.10 * v, attack: 0.004 });
        ring(ctx, t, { freq: 2093, dur: 0.6, peak: 0.025 * v });
        ring(ctx, t, { freq: 3140, dur: 0.25, peak: 0.012 * v });
    },
    // A magazine or the printout drops into the flap: a paper flop.
    paper: (ctx, t, v) => {
        burst(ctx, t, { dur: 0.12, filter: 'lowpass', freq: 2600, to: 900, peak: 0.26 * v, attack: 0.004 });
        burst(ctx, t, { dur: 0.015, filter: 'highpass', freq: 3500, peak: 0.11 * v });
    },
};

/** The names a `sound` in data_vending.js may carry. lint-data checks them. */
export const VENDING_SOUNDS = Object.keys(VENDING_VOICES);

export const audio = {

   // --- SYNTHESIZED SOUND ---
    audioCtx: null,
    playAudio: function(type = 'ui') {
        if (!this.state.audioEffects) return;
        
        // At volume 0, do not create tones at all.
        // exponentialRampToValueAtTime throws on a zero target value.
        const vol = this.state.audioVolume;
        if (vol <= 0) return;
        
        try {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }
            
            const t = this.audioCtx.currentTime + 0.015; 

            // The vending machine's sounds build their own graphs.
            const voice = VENDING_VOICES[type];
            if (voice) { voice(this.audioCtx, t, vol); return; }

            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            
            // NEW: read the slider value (0.0 to 1.0)        
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            
            if (type === 'action') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, t);
                osc.frequency.exponentialRampToValueAtTime(100, t + 0.02);
                
                // MULTIPLIED BY vol
                gain.gain.setValueAtTime(0.15 * vol, t);
                gain.gain.exponentialRampToValueAtTime(0.01 * vol, t + 0.02);
                
                osc.start(t);
                osc.stop(t + 0.03);
                
            } else if (type === 'ui') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, t);
                osc.frequency.exponentialRampToValueAtTime(100, t + 0.02);
                
                gain.gain.setValueAtTime(0.15 * vol, t);
                gain.gain.exponentialRampToValueAtTime(0.01 * vol, t + 0.02);
                
                osc.start(t);
                osc.stop(t + 0.03);
                
            } else if (type === 'phone') {
                osc.type = 'sine';
                
                osc.frequency.setValueAtTime(750, t);
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.15 * vol, t + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.01 * vol, t + 0.1); 
                
                osc.frequency.setValueAtTime(1000, t + 0.1); 
                gain.gain.setValueAtTime(0, t + 0.1);
                gain.gain.linearRampToValueAtTime(0.15 * vol, t + 0.11);
                gain.gain.exponentialRampToValueAtTime(0.001 * vol, t + 0.3); 
                
                osc.start(t);
                osc.stop(t + 0.35); 
                
            } else if (type === 'email') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(850, t); 
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.2 * vol, t + 0.01);
                gain.gain.exponentialRampToValueAtTime(0.001 * vol, t + 0.4); 
                osc.start(t);
                osc.stop(t + 0.45);
            } else if (type === 'impact') {
                // The one harsh voice in the set. Everything else here is a
                // sine or a square blip; a heavy hit gets a sawtooth dropping
                // through the floor, because it has to read as damage next to
                // four friendly beeps.
                //
                // NOT a human scream, deliberately: this game has no audio
                // FILES at all - every sound is synthesised - and by GLOSSAR
                // 2a the machine is what speaks. The screen shakes, so the
                // terminal takes the hit; Mueller stays quiet.
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(160, t);
                osc.frequency.exponentialRampToValueAtTime(48, t + 0.16);

                gain.gain.setValueAtTime(0.001 * vol, t);
                gain.gain.linearRampToValueAtTime(0.22 * vol, t + 0.012);
                gain.gain.exponentialRampToValueAtTime(0.001 * vol, t + 0.18);

                osc.start(t);
                osc.stop(t + 0.2);

            } else if (type === 'boot') {
                osc.type = 'square';
                osc.frequency.setValueAtTime(1000, t);
                
                gain.gain.setValueAtTime(0, t);
                gain.gain.linearRampToValueAtTime(0.1 * vol, t + 0.01);
                gain.gain.setValueAtTime(0.1 * vol, t + 0.15);
                gain.gain.exponentialRampToValueAtTime(0.001 * vol, t + 0.2);
                
                osc.start(t);
                osc.stop(t + 0.25);
            }
        } catch(e) {
            console.warn("Audio error:", e);
        }
    },
	
    // --- MUSIC SYSTEM ---
    bgmTracks: null,
    fadeTimers: {},        // one running fade per track, keyed by track name
    gainNodes: {},         // only on platforms that refuse track.volume, see below
    volumeWorks: null,     // memoised answer of canSetVolume()

    /**
     * Does this browser let a script set a media element's volume?
     *
     * iOS says yes and means no: `track.volume = 0.2` is accepted, ignored and
     * reads back as 1. So on iPhone and iPad the music played at full blast
     * whatever the slider said, the slider did nothing, and every fade - in,
     * out, the vending machine's duck - was a hard cut. Asked by probing
     * rather than by sniffing the user agent, and asked once.
     */
    canSetVolume: function(track) {
        if (this.volumeWorks === null) {
            const before = track.volume;
            track.volume = 0.123;
            this.volumeWorks = Math.abs(track.volume - 0.123) < 0.001;
            track.volume = before;
        }
        return this.volumeWorks;
    },

    /**
     * A gain node in front of the speakers: the one volume knob iOS obeys.
     *
     * Built on first use and kept - createMediaElementSource may be called
     * only ONCE per element, and from then on that element is audible only
     * through the graph. Which is also why the context has to be running:
     * routed into a suspended context, the track plays to nobody.
     *
     * Returns null if the graph cannot be built, and the caller falls back to
     * the element's own volume - no worse than before this existed.
     */
    musicGain: function(key) {
        if (this.gainNodes[key]) return this.gainNodes[key];
        const track = this.bgmTracks?.[key];
        if (!track) return null;
        try {
            if (!this.audioCtx) {
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            const source = this.audioCtx.createMediaElementSource(track);
            const gain = this.audioCtx.createGain();
            source.connect(gain);
            gain.connect(this.audioCtx.destination);
            this.gainNodes[key] = gain;
            return gain;
        } catch (err) {
            console.warn("Music gain unavailable:", err);
            return null;
        }
    },

    /** How loud `key` is right now, whichever knob is carrying it. */
    trackVolume: function(key) {
        const track = this.bgmTracks?.[key];
        if (!track) return 0;
        if (this.canSetVolume(track)) return track.volume;
        return this.gainNodes[key]?.gain.value ?? track.volume;
    },

    /** Sets how loud `key` is, through whichever knob this platform obeys. */
    setTrackVolume: function(key, value) {
        const track = this.bgmTracks?.[key];
        if (!track) return;
        const v = Math.max(0, Math.min(1, value));
        if (this.canSetVolume(track)) { track.volume = v; return; }
        const gain = this.musicGain(key);
        if (gain) gain.gain.value = v;
        else track.volume = v;          // refused anyway, but it costs nothing
    },

    /**
     * Music in a tab nobody is looking at is noise from somewhere.
     *
     * Paused on the way out and picked up again on the way back - a pause, not
     * a stop, so it carries on where it was. Only a track this did pause comes
     * back: one that a fade is putting to bed, or that the game replaced while
     * the tab was away, is none of its business.
     */
    musicPausedByTab: false,
    syncMusicToVisibility: function() {
        const key = this.state.currentMusicTrack;
        const track = this.bgmTracks?.[key];
        if (document.hidden) {
            if (!track || track.paused || this.fadeTimers[key]) return;
            track.pause();
            this.musicPausedByTab = true;
            return;
        }
        if (!this.musicPausedByTab) return;
        this.musicPausedByTab = false;
        if (!this.state.musicEnabled || !track || !track.paused) return;
        track.play().catch(() => { /* back without a gesture: the next action starts it */ });
    },

    /**
     * Fades a track's volume and calls back when it arrives. Without this every
     * change of scene was a hard cut: pause() stopped mid-bar and the next
     * track came in at full volume. Nobody notices a fade while it happens -
     * they notice its absence.
     *
     * A track keeps its own timer, so a second call while a fade is running
     * replaces it instead of two fades fighting over the same volume.
     */
    fadeTrack: function(key, target, ms, done) {
        const track = this.bgmTracks?.[key];
        if (!track) { done?.(); return; }

        clearInterval(this.fadeTimers[key]);

        const step = 25;
        const from = this.trackVolume(key);
        const diff = target - from;
        if (ms <= 0 || Math.abs(diff) < 0.01) {
            this.setTrackVolume(key, target);
            done?.();
            return;
        }

        let passed = 0;
        this.fadeTimers[key] = setInterval(() => {
            passed += step;
            const t = Math.min(1, passed / ms);
            this.setTrackVolume(key, from + diff * t);
            if (t >= 1) {
                clearInterval(this.fadeTimers[key]);
                delete this.fadeTimers[key];
                done?.();
            }
        }, step);
    },

    initMusic: function() {
        // Registered here rather than at module scope: the tracks have to exist
        // before anything can be paused, and this runs exactly once.
        // Optional-call because the test bench's document has no listeners.
        document.addEventListener?.('visibilitychange', () => this.syncMusicToVisibility());

        this.bgmTracks = {
            'elevator': new Audio('assets/music/elevator.opus'),
            'lofi': new Audio('assets/music/chillwave.opus'),
            'detective': new Audio('assets/music/hardboiled.opus'),
            'bossa': new Audio('assets/music/bossaantiqua.opus'),
            'boss': new Audio('assets/music/movementproposition.opus'),
            'gala': new Audio('assets/music/discocontutti.opus')
        };

        const officeTracks = ['elevator', 'lofi', 'detective', 'bossa'];

        for (let key in this.bgmTracks) {
            // Without this the browser starts downloading all six tracks the
            // moment they are constructed - including the boss and gala themes
            // most players never hear. They now load on first play().
            this.bgmTracks[key].preload = 'none';

            if (key === 'boss' || key === 'gala') {
                this.bgmTracks[key].loop = true; // boss and gala loop forever
            } else {
                // Radio mode has to hear the end of a track to pick the next
                // one, so it cannot loop. A fixed style repeats the same track
                // anyway - and doing that natively removes the audible gap the
                // manual restart left between two runs.
                this.bgmTracks[key].loop = this.state.musicStyle !== 'radio';
                
                // What happens once the track finishes?
                this.bgmTracks[key].addEventListener('ended', () => {
                    if (this.state.musicStyle === 'radio') {
                        // Radio mode: pick another track at random
                        // Pick from the other tracks directly instead of
                        // re-rolling until it differs - a while loop here would
                        // spin forever if officeTracks ever shrank to one entry.
                        const others = officeTracks.filter(t => t !== key);
                        const nextTrack = others.length
                            ? others[Math.floor(Math.random() * others.length)]
                            : key;
                        this.playMusic(nextTrack); 
                    } else if (!this.bgmTracks[key].loop) {
                        // Fixed style without native looping (e.g. the style was
                        // switched while this track was already running): restart
                        // it by hand, as before.
                        this.bgmTracks[key].play().catch(e => console.warn("Music could not start:", e));
                    }
                });
            }
        }
    },

    /**
     * Which track belongs to what is happening RIGHT NOW.
     *
     * Asked of the GAME, not of currentMusicTrack - because that field is
     * exactly what is missing in the case this exists for. playMusic() leaves
     * on its first line while music is switched off, before it records
     * anything, so a boss fight or a gala begun in silence never wrote its
     * name down. Switching the music on in the middle of one then read the
     * office track from before it and played that, over the fight.
     *
     * Reading the situation also ends the opposite case: a fight that is over
     * can no longer bring its own music back on the next toggle.
     */
    situationTrack: function() {
        if (this.state.isPartyMode) return 'gala';
        if (this.state.bossTimer || this.state.currentEventType === 'boss') return 'boss';
        return 'office';
    },

    toggleMusic: function(isOn) {
        this.state.musicEnabled = isOn;
        localStorage.setItem(KEYS.musicEnabled, isOn);
        if (isOn) {
            this.playMusic(this.situationTrack());
        } else {
            // Instant, exactly as stopMusic's own docstring prescribes for
            // this switch. With the default 400ms fade, off-and-on within
            // the fade window went permanently silent: playMusic saw the
            // still-audible track and returned, then the fade's callback
            // paused it - and nothing ever asked for music again.
            this.stopMusic(0);
        }
    },
    
    changeMusicStyle: function(style) {
        this.state.musicStyle = style;
        localStorage.setItem(KEYS.musicStyle, style);

        // Looping depends on the mode, so it has to follow the setting: radio
        // needs the 'ended' event to move on, a fixed style loops seamlessly.
        if (this.bgmTracks) {
            for (const key of ['elevator', 'lofi', 'detective', 'bossa']) {
                this.bgmTracks[key].loop = style !== 'radio';
            }
        }
        
        // Outside boss fight and gala the track has to follow the setting
        if (this.state.currentMusicTrack !== 'boss' && this.state.currentMusicTrack !== 'gala') {
            if (this.state.musicEnabled) {
                // Music on: switch immediately
                this.playMusic('office'); 
            } else {
                // Music off: reset the current track so the next
                // switch-on is guaranteed to pick up the new style.
                this.state.currentMusicTrack = null;
            }
        }
    },

    setMusicVolume: function(val) {
        this.state.musicVolume = parseFloat(val);
        localStorage.setItem(KEYS.musicVolume, val);
        if (this.bgmTracks) {
            // Only the track that is currently MEANT to be audible follows
            // the slider immediately (cancelling its fade-in, which would
            // otherwise carry on towards the old target and undo the
            // slider). Every other running fade is a fade-OUT whose done()
            // is the only thing that ever pauses that track - the old loop
            // cancelled those too, and dragging the slider during a stop
            // left the outgoing track playing forever, even with the music
            // switched off. Paused tracks pick the new volume up on their
            // next play().
            for (let key in this.bgmTracks) {
                if (key === this.state.currentMusicTrack && this.state.musicEnabled) {
                    clearInterval(this.fadeTimers[key]);
                    delete this.fadeTimers[key];
                    this.setTrackVolume(key, this.state.musicVolume);
                }
            }
        }
    },

    playMusic: function(trackName) {
        if (!this.state.musicEnabled) return;
        
        // --- Handle the generic 'office' request ---
        let actualTrack = trackName;
        const officeTracks = ['elevator', 'lofi', 'detective', 'bossa'];

        if (trackName === 'office') {
            if (this.state.musicStyle === 'radio') {
                // Radio mode: if an office track is already playing, leave it alone
                if (officeTracks.includes(this.state.currentMusicTrack) && 
                    this.bgmTracks && 
                    this.bgmTracks[this.state.currentMusicTrack] && 
                    !this.bgmTracks[this.state.currentMusicTrack].paused) {
                    return; 
                }
                // Otherwise pick a random starting track
                actualTrack = officeTracks[Math.floor(Math.random() * officeTracks.length)];
            } else {
                // A fixed style (e.g. 'lofi') was chosen in the settings
                actualTrack = this.state.musicStyle;
            }
        }

        if (this.state.currentMusicTrack === actualTrack) {
            if (this.bgmTracks && this.bgmTracks[actualTrack] && !this.bgmTracks[actualTrack].paused) {
                return; // already audible, nothing to do
            }
        }

        this.state.currentMusicTrack = actualTrack;
        // Out faster than in, so the two never sit on top of each other for
        // long. The boss fight cuts hardest, that is the point of it.
        this.stopMusic(actualTrack === 'boss' ? 150 : 350);

        if (!this.bgmTracks) this.initMusic();

        let track = this.bgmTracks[actualTrack];
        if (track) {
            // A boss fight should hit; everything else eases in.
            const fadeIn = actualTrack === 'boss' ? 250 : 600;
            clearInterval(this.fadeTimers[actualTrack]);
            this.setTrackVolume(actualTrack, 0);
            // Where the gain node carries the volume, the track is audible only
            // through the graph - and a suspended context plays to nobody.
            if (this.audioCtx?.state === 'suspended') this.audioCtx.resume();
            track.play()
                .then(() => this.fadeTrack(actualTrack, this.state.musicVolume, fadeIn))
                .catch(e => {
                    // Autoplay blocked: leave the volume usable for the retry.
                    this.setTrackVolume(actualTrack, this.state.musicVolume);
                    console.warn("Music autoplay blocked:", e);
                });
        }
    },

    /**
     * @param {number} ms  fade-out time; 0 stops instantly (used when the
     *                     player switches music off - that should be immediate)
     */
    stopMusic: function(ms = 400) {
        if (!this.bgmTracks) return;
        for (let key in this.bgmTracks) {
            const track = this.bgmTracks[key];
            clearInterval(this.fadeTimers[key]);
            delete this.fadeTimers[key];

            if (track.paused) continue;
            if (ms <= 0) {
                track.pause();
                this.setTrackVolume(key, this.state.musicVolume);   // ready for the next play()
                continue;
            }
            this.fadeTrack(key, 0, ms, () => {
                track.pause();
                // Restore the target volume, otherwise the track would start
                // silent the next time it is played without a fade.
                this.setTrackVolume(key, this.state.musicVolume);
            });
        }
    },
    
    /**
     * Holds the office music down while something on screen wants silence:
     * the vending machine's fall (6.3), from the moment the stairwell light
     * stops flickering until the lift arrives. Fades rather than cuts, and
     * only the track that is meant to be audible - a paused or switched-off
     * track has nothing to duck. Idempotent, so a reactive caller may say
     * false as often as it likes.
     */
    musicDucked: false,
    duckMusic: function(on) {
        if (on === this.musicDucked) return;
        this.musicDucked = on;
        const key = this.state.currentMusicTrack;
        const track = this.bgmTracks?.[key];
        if (!this.state.musicEnabled || !track || track.paused) return;
        this.fadeTrack(key, on ? this.state.musicVolume * 0.12 : this.state.musicVolume, on ? 900 : 700);
    },

    setVolume: function(val) {
        this.state.audioVolume = parseFloat(val);
        localStorage.setItem(KEYS.audioVolume, val);
        this.playAudio('ui');
    },

};