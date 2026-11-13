import { KEYS } from './keys.js';
import { CUES, housePool, nextMood, drawCue, answeringPool, changeOver, SOFT_FADE_MS,
         pressure, rhythmGain, RHYTHM_TAU, PROBE_TONES, toneMatches,
         cuesOf, roomSound, ROOM_TAU } from './music_cues.js';
import { MUSIC_DIR, MUSIC_FILES, MUSIC_PROBE } from './music_files.js';

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
    //
    // What plays is decided in music_cues.js (pure rules, loadable from
    // Node); this half owns the elements and the fades. One element per
    // piece, built the first time the piece is wanted, and its src is never
    // changed - swapping src on one element is the trap _speak() documents
    // (a position set on a file that never loaded is kept for the next one).

    /**
     * Per-piece gain, so that one slider means one loudness.
     *
     * The six bought pieces before 7.2 spanned 10.6 dB as they were mastered -
     * bossa into lofi was a jump of 9.7 dB with the slider untouched, and
     * under the narrator (-23.6 LUFS) no single setting left room for a voice
     * over both. They were trimmed here, each to the quietest of them.
     *
     * The house band is mastered to that level by tools/master-music.mjs
     * (TARGET_LUFS, the emergency and the gala 3 dB over it on purpose), so
     * every trim is 1.00. The table stays: a piece that cannot be mastered
     * again can still be levelled here, down, never up - an element's volume
     * stops at 1. The week suite holds each trim against the measurement the
     * tool wrote into music_files.js.
     */
    MUSIC_TRIM: {
        morning_1: 1.00, morning_2: 1.00,
        day_a: 1.00, day_1: 1.00, day_2: 1.00, day_3: 1.00, day_4: 1.00,
        lunch_1: 1.00, afternoon_1: 1.00, afternoon_2: 1.00,
        tense_1: 1.00, tense_2: 1.00, tense_3: 1.00,
        emergency_a: 1.00, emergency_2: 1.00, emergency_3: 1.00,
        gala_1: 1.00, gala_2: 1.00, gala_3: 1.00, gala_lounge: 1.00,
    },

    /** How loud `key` is meant to be: the slider, levelled, and ducked. */
    musicTarget: function(key) {
        return this.state.musicVolume * (this.MUSIC_TRIM[key] ?? 1) * this.duckLevel();
    },

    bgmTracks: null,       // piece id -> its element, each built on first use
    fadeTimers: {},        // one running fade per track, keyed by piece id
    gainNodes: {},         // only on platforms that refuse track.volume, see below
    volumeWorks: null,     // memoised answer of canSetVolume()
    // What the music remembers between two decisions: the bags, the mood,
    // the piece an emergency interrupted. Built on first use and not here,
    // for the reason duckReasons gives below: this object is spread into the
    // engine, and a Set or a map written at module scope would be shared by
    // every spread of it. Not in the save either - after a load the moment
    // is read afresh.
    musicRun: null,
    // A piece's graph, by piece id: { level, rhythm } for a layered piece,
    // { level } for a gala piece in the room. Lazy for the same reason. A
    // piece in here is audible ONLY through its graph.
    musicGraphs: null,
    // The gala's room (Phase 3): one low-pass and one level every gala piece
    // goes through, so the band sounds as it would from the station the
    // player is at. Built with the first gala piece while the context runs.
    roomBus: null,
    // False once the room would not build; the gala then plays plain.
    roomWorks: null,
    // null: not asked yet this session; then the probe's answer. Only true
    // lets a layered piece load its four-channel file.
    layersWork: null,
    // The rhythm layer's current target as a linear gain, before any piece's
    // own floor - kept because AudioParam.value cannot be trusted while
    // setTargetAtTime is moving it.
    musicPressure: null,

    musicRuntime: function() {
        return this.musicRun ??= {
            bags: {},                // pool -> the pieces still to come
            mood: 'calm',            // nextMood() between scenes
            interrupted: null,       // the piece an emergency paused
            lastSoft: -Infinity,     // when the mood last cut into a piece
            leaving: new Set(),      // pieces fading out on their way to a pause
            warm: false,             // the emergency pieces are loading
            hall: null,              // the gala piece the lounge paused
        };
    },

    /** The clock for the 90-second rule. A function so the tests can drive it. */
    musicNow: () => Date.now(),

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
        const graph = this.musicGraphs?.[key];
        if (graph) return graph.levelValue;
        if (this.canSetVolume(track)) return track.volume;
        return this.gainNodes[key]?.gain.value ?? track.volume;
    },

    /** Sets how loud `key` is, through whichever knob this platform obeys. */
    setTrackVolume: function(key, value) {
        const track = this.bgmTracks?.[key];
        if (!track) return;
        const v = Math.max(0, Math.min(1, value));
        // A layered piece is heard through its graph alone; its element stays
        // at 1, because whether element volume reaches a graph differs from
        // one browser to the next.
        const graph = this.musicGraphs?.[key];
        if (graph) { graph.levelValue = v; graph.level.gain.value = v; return; }
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
        // Registered here rather than at module scope: it runs once, before
        // anything can be paused. Optional-call because the test bench's
        // document has no listeners. The narrator follows the same rule from
        // the same event - see engine_voice.syncNarrationToVisibility().
        if (!this.bgmTracks) {
            document.addEventListener?.('visibilitychange', () => {
                this.syncMusicToVisibility();
                this.syncNarrationToVisibility();
                this.syncRadioToVisibility?.();
            });
        }
        this.bgmTracks = {};
    },

    /** Whether piece `id` should play from its four-channel file. */
    wantsLayers: function(id) {
        return !!(CUES[id]?.layers && MUSIC_FILES[id]?.quad && this.layersWork === true);
    },

    /** The element for piece `id`, built the first time it is asked for. */
    trackFor: function(id) {
        if (!this.bgmTracks) this.initMusic();
        if (this.bgmTracks[id]) return this.bgmTracks[id];
        const files = MUSIC_FILES[id];
        if (!CUES[id] || !files) return null;
        if (this.wantsLayers(id)) {
            this.bgmTracks[id] = this.newTrack(id, files.quad);
            if (this.layerGraph(id)) return this.bgmTracks[id];
            // The graph would not build after all. The four-channel element
            // must not play on its own - a browser mixes it down as it likes -
            // so it goes, and the stereo files take over for the session.
            this.layersWork = false;
        }
        if (this.wantsRoom(id)) {
            this.bgmTracks[id] = this.newTrack(id, files.stereo);
            if (this.roomGraph(id)) return this.bgmTracks[id];
            this.roomWorks = false;              // plain from here on
        }
        return this.bgmTracks[id] = this.newTrack(id, files.stereo);
    },

    /**
     * Whether gala piece `id` should go through the room. Only with a running
     * context: an element in a graph is silent while the context sleeps, and
     * the room is a nicety the evening does not need. By the time the gala
     * begins the context has run all day (the clicks, the probe).
     */
    wantsRoom: function(id) {
        return CUES[id]?.pool === 'gala' && this.roomWorks !== false && this.audioCtx?.state === 'running';
    },

    /** Whether the element for `id` should hang in a graph of its own. */
    wantsGraph: function(id) {
        return this.wantsLayers(id) || this.wantsRoom(id);
    },

    /** One element for piece `id`, playing `file`. */
    newTrack: function(id, file) {
        const track = new Audio(MUSIC_DIR + file);
        // Nothing downloads until a piece is wanted - most players never
        // hear most of the pieces on a given day.
        track.preload = 'none';
        // The end of a piece is the one moment that may bring on the next
        // without a scene asking for it: it fits, because nothing is cut.
        track.addEventListener('ended', () => this.onMusicEnded(id));
        return track;
    },

    /**
     * The two layers of piece `id`, as a graph: the element's four channels
     * split, the bed (1/2) straight on, the rhythm (3/4) through its own
     * gain, both into the piece's level - the knob setTrackVolume() turns.
     * Built once per element: createMediaElementSource may be called only
     * once, and from then on the element is audible through this alone.
     */
    layerGraph: function(id) {
        const graphs = this.musicGraphs ??= {};
        if (graphs[id]) return graphs[id];
        const track = this.bgmTracks?.[id];
        const ctx = this.audioCtx;
        if (!track || !ctx) return null;
        try {
            const source = ctx.createMediaElementSource(track);
            const split = ctx.createChannelSplitter(4);
            const bed = ctx.createChannelMerger(2);
            const beat = ctx.createChannelMerger(2);
            const rhythm = ctx.createGain();
            const level = ctx.createGain();
            source.connect(split);
            split.connect(bed, 0, 0); split.connect(bed, 1, 1);
            split.connect(beat, 2, 0); split.connect(beat, 3, 1);
            beat.connect(rhythm);
            bed.connect(level);
            rhythm.connect(level);
            level.connect(ctx.destination);
            // A new piece comes in at the density of the moment, not from
            // wherever the last one was.
            rhythm.gain.value = this.rhythmFor(id);
            level.gain.value = 0;
            return graphs[id] = { level, rhythm, levelValue: 0 };
        } catch (err) {
            console.warn('Music layers unavailable:', err);
            return null;
        }
    },

    /**
     * Gala piece `id` into the room: its own level, then the shared bus. The
     * nodes come first and the element is taken last - once
     * createMediaElementSource has it, it is heard through the graph or not
     * at all, so nothing may fail after that.
     */
    roomGraph: function(id) {
        const graphs = this.musicGraphs ??= {};
        if (graphs[id]) return graphs[id];
        const track = this.bgmTracks?.[id];
        const ctx = this.audioCtx;
        if (!track || !ctx) return null;
        try {
            const bus = this.roomBus ??= this.buildRoomBus(ctx);
            const level = ctx.createGain();
            level.gain.value = 0;
            const source = ctx.createMediaElementSource(track);
            source.connect(level);
            level.connect(bus.filter);
            return graphs[id] = { level, levelValue: 0 };
        } catch (err) {
            console.warn('Music room unavailable:', err);
            return null;
        }
    },

    /** The low-pass and the level the gala is heard through, set to the station of the moment. */
    buildRoomBus: function(ctx) {
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        const room = ctx.createGain();
        const sound = roomSound(this.musicLoc());
        filter.frequency.value = sound.hz;
        room.gain.value = sound.gain;
        filter.connect(room);
        room.connect(ctx.destination);
        return { filter, room };
    },

    /** The gala station the player is at, or null - read only during the gala. */
    musicLoc: function() {
        return this.state.isPartyMode ? (this.state.currentEventLoc ?? null) : null;
    },

    /**
     * The room follows the player through the evening: at every scene the
     * low-pass and the level glide to the station's (PARTY_ROOMS) over
     * ROOM_TAU - a step through a door, not a fade.
     */
    followRoom: function() {
        const bus = this.roomBus;
        if (!bus || !this.audioCtx) return;
        const { hz, gain } = roomSound(this.musicLoc());
        const now = this.audioCtx.currentTime;
        bus.filter.frequency.setTargetAtTime(hz, now, ROOM_TAU);
        bus.room.gain.setTargetAtTime(gain, now, ROOM_TAU);
    },

    /** The rhythm gain piece `id` should have at the pressure of the moment. */
    rhythmFor: function(id) {
        const p = pressure({ tickets: this.state.tickets, al: this.state.al, cr: this.state.cr });
        return rhythmGain(p, CUES[id]?.floorDb);
    },

    /**
     * The density follows the day: tickets, anger and radar set how much of
     * the rhythm section plays, gliding over RHYTHM_TAU seconds - the band
     * leans in as the day presses and eases off as it lets go, within the
     * piece. Called whenever the stats are drawn (updateUI) and at every
     * scene. Cheap when nothing moved.
     */
    followPressure: function() {
        const graphs = this.musicGraphs;
        const p = pressure({ tickets: this.state.tickets, al: this.state.al, cr: this.state.cr });
        if (this.musicPressure !== null && Math.abs(p - this.musicPressure) < 0.005) return;
        this.musicPressure = p;
        if (!graphs || !this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        for (const [id, graph] of Object.entries(graphs)) {
            if (!graph.rhythm) continue;           // a gala piece in the room
            graph.rhythm.gain.setTargetAtTime(rhythmGain(p, CUES[id]?.floorDb), now, RHYTHM_TAU);
        }
    },

    /**
     * Does this browser hand a four-channel file to the graph as four
     * channels? Asked once a session: the probe file plays silently through
     * the same splitter the layered pieces use, and each channel has to carry
     * its own tone. The failure this exists for makes no error - a browser
     * that mixes down first leaves channels 3 and 4 empty, and the band plays
     * its bed alone, forever. Until the answer is in, and whenever it is no,
     * the layered pieces play their stereo files.
     */
    probeLayers: function() {
        if (this.layersWork !== null) return;
        this.layersWork = false;                 // until the tones say otherwise
        let ctx, el, source;
        try {
            ctx = this.audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
            el = new Audio(MUSIC_DIR + MUSIC_PROBE);
            source = ctx.createMediaElementSource(el);
        } catch {
            return;
        }
        if (ctx.state === 'suspended') ctx.resume().catch(() => {});
        const split = ctx.createChannelSplitter(4);
        const mute = ctx.createGain();
        mute.gain.value = 0;
        mute.connect(ctx.destination);
        source.connect(split);
        const taps = PROBE_TONES.map((_, c) => {
            const a = ctx.createAnalyser();
            a.fftSize = 2048;
            split.connect(a, c);
            a.connect(mute);
            return a;
        });
        let settled = false;
        const finish = (ok) => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            try { el.pause(); source.disconnect(); mute.disconnect(); } catch { /* gone already */ }
            this.layersWork = ok;
        };
        const timer = setTimeout(() => finish(false), 4000);
        el.addEventListener('playing', () => setTimeout(() => {
            const heard = taps.map((a, c) => {
                const buf = new Float32Array(a.fftSize);
                a.getFloatTimeDomainData(buf);
                return toneMatches(buf, PROBE_TONES[c], ctx.sampleRate);
            });
            finish(heard.every(Boolean));
        }, 250), { once: true });
        el.play().catch(() => finish(false));
    },

    /**
     * The emergency cuts in at once, and on the web a piece that has never
     * loaded starts late. So the first time the office plays, the emergency
     * pieces begin to load - three files, once a session.
     */
    prewarmEmergency: function() {
        const run = this.musicRuntime();
        if (run.warm) return;
        run.warm = true;
        for (const id of Object.keys(CUES)) {
            if (CUES[id].pool === 'emergency') { const t = this.trackFor(id); if (t) t.preload = 'auto'; }
        }
    },

    /** Begun and not finished: a piece that can carry on where it stopped. */
    partPlayed: function(id) {
        const track = this.bgmTracks?.[id];
        return !!track && !track.ended && track.currentTime > 0;
    },

    /** Playing and not on its way out. */
    isAudible: function(id) {
        const track = id ? this.bgmTracks?.[id] : null;
        return !!track && !track.paused && !this.musicRuntime().leaving.has(id);
    },

    /**
     * What the moment asks of the music, as housePool() reads it.
     *
     * `hint` is what the caller knows: 'boss' and 'gala' as the fight and the
     * evening begin, 'office' when an event has just ENDED - currentEventType
     * still names the event that is over, and a finished fight must not claim
     * its music back. Without a hint (a new scene, the music switched on)
     * the state alone decides, and an event type counts only while its event
     * is on screen.
     */
    musicSnapshot: function(hint) {
        const s = this.state;
        const over = hint === 'office';
        const live = !over && !!s.activeEvent;
        return {
            party: !!s.isPartyMode || hint === 'gala',
            boss: hint === 'boss' || !!s.bossTimer || (live && s.currentEventType === 'boss'),
            lunch: live && s.currentEventType === 'lunch',
            tense: this.musicRuntime().mood === 'tense',
            minute: s.time,
            loc: this.musicLoc(),
        };
    },

    /**
     * Which pool belongs to what is happening RIGHT NOW.
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
    situationTrack: function(hint) {
        return housePool(this.musicSnapshot(hint));
    },

    /**
     * THE decision, made at a change of scene and at the end of a piece and
     * nowhere else - never on a timer of its own, so a change of music always
     * falls together with a change of picture. Every caller that used to name
     * a track now names the moment, and this reads what to do about it:
     *
     *   - the emergency interrupts at once and keeps the piece it interrupted
     *   - after it, that piece carries on where it was
     *   - the gala and lunch cut in at once
     *   - a mood may cut into a running piece only by the rules of
     *     changeOver(); the clock never does - its arc comes from what is
     *     drawn NEXT
     */
    playMusic: function(hint) {
        if (!this.state.musicEnabled) return;
        if (!this.bgmTracks) this.initMusic();
        this.probeLayers();
        this.followPressure();
        this.followRoom();
        const run = this.musicRuntime();
        run.mood = nextMood(run.mood, this.state.al, this.state.cr);

        const want = housePool(this.musicSnapshot(hint));
        const pool = answeringPool(want);
        if (!pool) return;
        if (pool !== 'emergency' && pool !== 'gala') this.prewarmEmergency();

        const cur = this.state.currentMusicTrack;
        const curCue = CUES[cur];
        const track = cur ? this.bgmTracks[cur] : null;
        const audible = this.isAudible(cur);

        if (pool === 'emergency') {
            if (curCue?.pool === 'emergency') {
                if (!audible) this.resumeCue(cur, 250);
                return;
            }
            // The interrupted piece waits, paused where it was. A gala is not
            // interrupted, it is over when an emergency can happen again.
            run.interrupted = (curCue && curCue.pool !== 'gala' && curCue.pool !== 'lounge') ? cur : null;
            // Out faster than in, so the two never sit on top of each other
            // for long. The emergency cuts hardest, that is the point of it.
            if (audible) this.leaveCue(cur, 150);
            this.startCue(this.drawMusic(pool, cur), 250);
            return;
        }

        if (curCue?.pool === 'emergency') {
            this.leaveCue(cur, 350);
            const back = run.interrupted;
            run.interrupted = null;
            // The office piece comes back to the office, never into the gala.
            const office = pool !== 'gala' && pool !== 'lounge';
            if (office && back && this.bgmTracks[back]) { this.resumeCue(back, 600); return; }
            this.startCue(this.drawMusic(pool, cur), 600);
            return;
        }

        // The lounge is a room of its own (Phase 3). Going in, the hall's
        // piece waits, paused where it was, and the lounge's piece carries on
        // from wherever the last visit left it: seven short visits walk
        // through it instead of hearing its first minute seven times. Coming
        // out, the hall's piece carries on too.
        if (pool === 'lounge' && curCue?.pool !== 'lounge') {
            if (curCue?.pool === 'gala') run.hall = cur;
            if (audible) this.leaveCue(cur, 350);
            const left = cuesOf('lounge').find(id => this.partPlayed(id));
            if (left) this.resumeCue(left, 600);
            else this.startCue(this.drawMusic(pool, cur), 600);
            return;
        }
        if (curCue?.pool === 'lounge' && pool !== 'lounge') {
            if (audible) this.leaveCue(cur, 350);
            const back = run.hall;
            run.hall = null;
            if (pool === 'gala' && back && this.partPlayed(back)) { this.resumeCue(back, 600); return; }
            this.startCue(this.drawMusic(pool, cur), 600);
            return;
        }

        if (!audible) {
            // Nothing to hear. A piece of the right pool that was stopped
            // part-way - the music switched off and on, a menu, a reload of
            // the same moment - simply goes on.
            if (curCue?.pool === pool && track && !track.ended && track.currentTime > 0) {
                this.resumeCue(cur, 600);
                return;
            }
            this.startCue(this.drawMusic(pool, cur), 600);
            return;
        }

        const how = changeOver(curCue.pool, pool, track.currentTime, this.musicNow() - run.lastSoft);
        if (how === 'keep') return;
        if (how === 'cut') {
            this.leaveCue(cur, 350);
            this.startCue(this.drawMusic(pool, cur), 600);
            return;
        }
        run.lastSoft = this.musicNow();
        this.leaveCue(cur, SOFT_FADE_MS);
        this.startCue(this.drawMusic(pool, cur), SOFT_FADE_MS);
    },

    /** The next piece of `pool`, never the one that has just played. */
    drawMusic: function(pool, last) {
        return drawCue(pool, this.musicRuntime().bags, last);
    },

    /** A piece ended by itself: the next one, out of the pool of the moment. */
    onMusicEnded: function(id) {
        if (id !== this.state.currentMusicTrack) return;   // it was on its way out anyway
        if (!this.state.musicEnabled || document.hidden) return;
        const run = this.musicRuntime();
        run.mood = nextMood(run.mood, this.state.al, this.state.cr);
        const pool = answeringPool(housePool(this.musicSnapshot()));
        if (!pool) return;
        // The piece had an ending of its own; the next one simply begins.
        this.startCue(this.drawMusic(pool, id), 250);
    },

    /** Piece `id` from its first bar. */
    startCue: function(id, fadeIn) {
        if (!id) return;
        // Built plain before its graph could be - the probe had not answered,
        // the context was not running yet: a piece starting over may as well
        // start over in layers, or in the room. Never one that is playing,
        // and never in resumeCue(), which must keep its position.
        const old = this.bgmTracks?.[id];
        if (old && old.paused && this.wantsGraph(id) && !this.musicGraphs?.[id]) delete this.bgmTracks[id];
        const track = this.trackFor(id);
        if (!track) return;
        clearInterval(this.fadeTimers[id]);
        delete this.fadeTimers[id];
        this.musicRuntime().leaving.delete(id);
        try { track.currentTime = 0; } catch { /* never loaded: it starts at 0 anyway */ }
        this.playCue(id, fadeIn);
    },

    /** Piece `id` from wherever it was paused - currentTime stays untouched. */
    resumeCue: function(id, fadeIn) {
        const track = this.trackFor(id);
        if (!track) return;
        clearInterval(this.fadeTimers[id]);
        delete this.fadeTimers[id];
        this.musicRuntime().leaving.delete(id);
        this.playCue(id, fadeIn);
    },

    playCue: function(id, fadeIn) {
        const track = this.bgmTracks[id];
        this.state.currentMusicTrack = id;
        this.setTrackVolume(id, 0);
        // Where the gain node carries the volume, the track is audible only
        // through the graph - and a suspended context plays to nobody.
        if (this.audioCtx?.state === 'suspended') this.audioCtx.resume();
        track.play()
            .then(() => {
                // Replaced while it was starting: a play() that resolves late
                // must not leave an element running silently underneath.
                if (this.state.currentMusicTrack !== id || this.musicRuntime().leaving.has(id)) {
                    if (this.state.currentMusicTrack !== id) track.pause();
                    return;
                }
                this.fadeTrack(id, this.musicTarget(id), fadeIn);
            })
            .catch(e => {
                // Autoplay blocked: leave the volume usable for the retry.
                this.setTrackVolume(id, this.musicTarget(id));
                console.warn("Music autoplay blocked:", e);
            });
    },

    /**
     * Fades piece `id` out and pauses it where it is. The position is kept:
     * the interrupted piece resumes from it, and a piece drawn again later
     * starts over in startCue() anyway.
     */
    leaveCue: function(id, ms) {
        const track = this.bgmTracks?.[id];
        if (!track || track.paused) return;
        const run = this.musicRuntime();
        run.leaving.add(id);
        this.fadeTrack(id, 0, ms, () => {
            track.pause();
            run.leaving.delete(id);
            // Restore the target volume, otherwise the track would start
            // silent the next time it is played without a fade.
            this.setTrackVolume(id, this.musicTarget(id));
        });
    },

    toggleMusic: function(isOn) {
        this.state.musicEnabled = isOn;
        localStorage.setItem(KEYS.musicEnabled, isOn);
        if (isOn) {
            this.playMusic();
        } else {
            // Instant, exactly as stopMusic's own docstring prescribes for
            // this switch. With the default 400ms fade, off-and-on within
            // the fade window went permanently silent: playMusic saw the
            // still-audible track and returned, then the fade's callback
            // paused it - and nothing ever asked for music again.
            this.stopMusic(0);
        }
    },

    setMusicVolume: function(val) {
        this.state.musicVolume = parseFloat(val);
        localStorage.setItem(KEYS.musicVolume, val);
        // Only the track that is currently MEANT to be audible follows the
        // slider immediately (cancelling its fade-in, which would otherwise
        // carry on towards the old target and undo the slider). Every other
        // running fade is a fade-OUT whose done() is the only thing that ever
        // pauses that track - the old loop cancelled those too, and dragging
        // the slider during a stop left the outgoing track playing forever,
        // even with the music switched off. Paused tracks pick the new volume
        // up on their next play().
        const key = this.state.currentMusicTrack;
        if (this.state.musicEnabled && this.isAudible(key)) {
            clearInterval(this.fadeTimers[key]);
            delete this.fadeTimers[key];
            this.setTrackVolume(key, this.musicTarget(key));
        }
    },

    /**
     * @param {number} ms  fade-out time; 0 stops instantly (used when the
     *                     player switches music off - that should be immediate)
     *
     * Every piece is paused where it is; whatever an emergency had put aside
     * is forgotten, because what follows a stop is a new moment.
     */
    stopMusic: function(ms = 400) {
        if (!this.bgmTracks) return;
        const run = this.musicRuntime();
        run.interrupted = null;
        for (const key in this.bgmTracks) {
            const track = this.bgmTracks[key];
            clearInterval(this.fadeTimers[key]);
            delete this.fadeTimers[key];

            if (track.paused) { run.leaving.delete(key); continue; }
            if (ms <= 0) {
                track.pause();
                run.leaving.delete(key);
                this.setTrackVolume(key, this.musicTarget(key));   // ready for the next play()
                continue;
            }
            this.leaveCue(key, ms);
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
    DUCK: {
        // The stairwell: the machine's fall wants near-silence under it.
        vending: 0.12,
        // Under speech. Six decibels, on top of the fifteen the levelling
        // already puts between music and voice - enough to clear the words
        // without the soundtrack audibly breathing in and out at every line.
        narration: 0.50,
        // Under a GlobalCorp FM spot (7.2): the same voice-over-bed rule.
        radio: 0.50
    },
    // Built on first use rather than here. The module object is SPREAD into the
    // engine, and spread copies a reference: one Set written at module scope
    // would be shared by every spread of it, which in the test bench means one
    // box's duck showing up in the next one's.
    duckReasons: null,

    /** The deepest reason wins; no reason is no duck. */
    duckLevel: function() {
        let level = 1;
        for (const r of this.duckReasons ?? []) level = Math.min(level, this.DUCK[r] ?? 1);
        return level;
    },

    duckMusic: function(on, reason = 'vending') {
        const reasons = this.duckReasons ??= new Set();
        const before = this.duckLevel();
        if (on) reasons.add(reason); else reasons.delete(reason);
        const after = this.duckLevel();
        if (after === before) return;
        const key = this.state.currentMusicTrack;
        const track = this.bgmTracks?.[key];
        if (!this.state.musicEnabled || !track || track.paused) return;
        // Down quickly enough to be under the first syllable, back up slowly
        // enough not to be a swell of its own. The machine's fall keeps the
        // slower pair it was tuned with.
        const slow = reason === 'vending';
        this.fadeTrack(key, this.musicTarget(key), after < before ? (slow ? 900 : 180) : (slow ? 700 : 450));
    },

    setVolume: function(val) {
        this.state.audioVolume = parseFloat(val);
        localStorage.setItem(KEYS.audioVolume, val);
        this.playAudio('ui');
    },

};