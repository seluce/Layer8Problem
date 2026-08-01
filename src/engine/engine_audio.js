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
            
            // NEU: Den Slider-Wert auslesen (0.0 bis 1.0)        
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            
            if (type === 'action') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(600, t);
                osc.frequency.exponentialRampToValueAtTime(100, t + 0.02);
                
                // MULTIPLIZIERT MIT vol
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
            console.log("Audio Fehler:", e);
        }
    },
	
    // --- MUSIK SYSTEM ---
    bgmTracks: null,

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
                this.bgmTracks[key].loop = false; // Office Tracks werden manuell gesteuert
                
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
                    } else {
                        // Single-style mode (the player picked e.g. 'lofi'): restart it
                        this.bgmTracks[key].play().catch(e => console.log(e));
                    }
                });
            }
        }
    },

    toggleMusic: function(isOn) {
        this.state.musicEnabled = isOn;
        localStorage.setItem(KEYS.musicEnabled, isOn);
        if (isOn) {
            // Check whether a special track (boss/gala) should be playing.
            // Otherwise ask for 'office' so playMusic() re-evaluates the current style.
            if (this.state.currentMusicTrack === 'boss' || this.state.currentMusicTrack === 'gala') {
                this.playMusic(this.state.currentMusicTrack);
            } else {
                this.playMusic('office'); 
            }
        } else {
            this.stopMusic();
        }
    },
    
    changeMusicStyle: function(style) {
        this.state.musicStyle = style;
        localStorage.setItem(KEYS.musicStyle, style);
        
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
            for (let key in this.bgmTracks) {
                this.bgmTracks[key].volume = this.state.musicVolume;
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
        this.stopMusic(); // Stoppt alle anderen Tracks

        if (!this.bgmTracks) this.initMusic();

        let track = this.bgmTracks[actualTrack];
        if (track) {
            track.volume = this.state.musicVolume;
            track.play().catch(e => console.log("Musik Autoplay blockiert:", e));
        }
    },

    stopMusic: function() {
        if (!this.bgmTracks) return;
        for (let key in this.bgmTracks) {
            this.bgmTracks[key].pause();
        }
    },
    
    setVolume: function(val) {
        this.state.audioVolume = parseFloat(val);
        localStorage.setItem(KEYS.audioVolume, val);
        this.playAudio('ui');
    },

};