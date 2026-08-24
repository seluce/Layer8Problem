import { KEYS } from './keys.js';

export const audio = {

   // --- SYNTHETISCHER SOUND ---
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
        const from = track.volume;
        const diff = target - from;
        if (ms <= 0 || Math.abs(diff) < 0.01) {
            track.volume = Math.max(0, Math.min(1, target));
            done?.();
            return;
        }

        let passed = 0;
        this.fadeTimers[key] = setInterval(() => {
            passed += step;
            const t = Math.min(1, passed / ms);
            track.volume = Math.max(0, Math.min(1, from + diff * t));
            if (t >= 1) {
                clearInterval(this.fadeTimers[key]);
                delete this.fadeTimers[key];
                done?.();
            }
        }, step);
    },

    initMusic: function() {
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
                this.bgmTracks[key].loop = true; // Boss & Gala loopen endlos
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
                    this.bgmTracks[key].volume = this.state.musicVolume;
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
            track.volume = 0;
            track.play()
                .then(() => this.fadeTrack(actualTrack, this.state.musicVolume, fadeIn))
                .catch(e => {
                    // Autoplay blocked: leave the volume usable for the retry.
                    track.volume = this.state.musicVolume;
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
                track.volume = this.state.musicVolume;   // ready for the next play()
                continue;
            }
            this.fadeTrack(key, 0, ms, () => {
                track.pause();
                // Restore the target volume, otherwise the track would start
                // silent the next time it is played without a fade.
                track.volume = this.state.musicVolume;
            });
        }
    },
    
    setVolume: function(val) {
        this.state.audioVolume = parseFloat(val);
        localStorage.setItem(KEYS.audioVolume, val);
        this.playAudio('ui');
    },

};