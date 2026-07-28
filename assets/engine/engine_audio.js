export const audio = {

   // --- SYNTHETISCHER SOUND ---
    audioCtx: null,
    playAudio: function(type = 'ui') {
        if (!this.state.audioEffects) return;
        
        // BUGFIX: Bei Lautstärke 0 gar nicht erst versuchen, Töne zu erzeugen!
        // Das verhindert den "exponentialRampToValueAtTime" Fehler in der Web Audio API.
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
                
                // Event-Listener: Was passiert, wenn das Lied zu Ende ist?
                this.bgmTracks[key].addEventListener('ended', () => {
                    if (this.state.musicStyle === 'radio') {
                        // Radio-Modus: Ein neues, zufälliges Lied aussuchen
                        // Pick from the other tracks directly instead of
                        // re-rolling until it differs - a while loop here would
                        // spin forever if officeTracks ever shrank to one entry.
                        const others = officeTracks.filter(t => t !== key);
                        const nextTrack = others.length
                            ? others[Math.floor(Math.random() * others.length)]
                            : key;
                        this.playMusic(nextTrack); 
                    } else {
                        // Dauerschleife-Modus (z.B. User hat explizit 'lofi' gewählt): Lied neu starten
                        this.bgmTracks[key].play().catch(e => console.log(e));
                    }
                });
            }
        }
    },

    toggleMusic: function(isOn) {
        this.state.musicEnabled = isOn;
        localStorage.setItem('layer8_music', isOn);
        if (isOn) {
            // Prüfen, ob gerade ein spezieller Event-Track (Boss/Gala) aktiv sein sollte.
            // Falls nicht, fordern wir generisch 'office' an, damit playMusic() den aktuellen Style frisch auswertet.
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
        localStorage.setItem('layer8_music_style', style);
        
        // Wenn wir nicht im Bossfight/Gala sind, müssen wir den Track updaten
        if (this.state.currentMusicTrack !== 'boss' && this.state.currentMusicTrack !== 'gala') {
            if (this.state.musicEnabled) {
                // Musik ist an: Direkt live wechseln
                this.playMusic('office'); 
            } else {
                // Musik ist aus: Wir setzen den aktuellen Track zurück.
                // Dadurch wird beim nächsten Einschalten garantiert der neue Stil geladen.
                this.state.currentMusicTrack = null;
            }
        }
    },

    setMusicVolume: function(val) {
        this.state.musicVolume = parseFloat(val);
        localStorage.setItem('layer8_music_volume', val);
        if (this.bgmTracks) {
            for (let key in this.bgmTracks) {
                this.bgmTracks[key].volume = this.state.musicVolume;
            }
        }
    },

    playMusic: function(trackName) {
        if (!this.state.musicEnabled) return;
        
        // --- NEU: Das Signal 'office' verarbeiten ---
        let actualTrack = trackName;
        const officeTracks = ['elevator', 'lofi', 'detective', 'bossa'];

        if (trackName === 'office') {
            if (this.state.musicStyle === 'radio') {
                // Radio-Modus: Wenn bereits ein Office-Track läuft, lass ihn einfach weiterlaufen!
                if (officeTracks.includes(this.state.currentMusicTrack) && 
                    this.bgmTracks && 
                    this.bgmTracks[this.state.currentMusicTrack] && 
                    !this.bgmTracks[this.state.currentMusicTrack].paused) {
                    return; 
                }
                // Ansonsten: Zufälligen Start-Track wählen
                actualTrack = officeTracks[Math.floor(Math.random() * officeTracks.length)];
            } else {
                // Ein fester Stil (z.B. 'lofi') ist in den Optionen gewählt
                actualTrack = this.state.musicStyle;
            }
        }

        if (this.state.currentMusicTrack === actualTrack) {
            if (this.bgmTracks && this.bgmTracks[actualTrack] && !this.bgmTracks[actualTrack].paused) {
                return; // Läuft bereits hörbar -> Abbruch
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
        localStorage.setItem('layer8_volume', val);
        this.playAudio('ui');
    },

};