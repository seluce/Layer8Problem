const tutorial = {
    steps: [
        {
            target: 'clock-container', 
            title: "Die Uhrzeit",
            text: "Dein Arbeitstag geht bis <b>16:30 Uhr</b>. Jede Aktion kostet Zeit. Teile sie dir gut ein!"
        },
        {
            target: 'ticket-container', 
            title: "Die Ticket-Hölle",
            text: "Hier stapelt sich die Arbeit. Alle 30 Minuten kommt ein neues Ticket. Wenn du <b>10 Tickets</b> erreichst, bricht das System zusammen und du bist gefeuert."
        },
        {
            target: 'stat-row-fl',
            title: "Faulheit",
            text: "Steigt, wenn du trödelst. Je höher dieser Wert, desto härter bestraft dich der Chef für Fehler."
        },
        {
            target: 'stat-row-al',
            title: "Aggro (Wut)",
            text: "Deine Nerven. Steigt bei nervigen Kollegen oder Bugs. Bei <b>100%</b> rastest du aus. Nutze rechtzeitig Gegenmaßnahmen!"
        },
        {
            target: 'stat-row-cr',
            title: "Chef-Radar",
            text: "Wie sehr dich der Chef im Visier hat. Bei <b>100%</b> droht die Kündigung (nach einer Abmahnung)."
        },
        {
            target: 'terminal-content', 
            title: "Dein Arbeitsplatz",
            text: "Hier triffst du Entscheidungen. Wähle weise! Jede Antwort hat Konsequenzen."
        },
        {
            target: 'smartphone',
            title: "Dein Smartphone",
            text: "Hier kommen Chats und Nachrichten rein. Vorsicht vor Viren!"
        },
        {
            target: 'inventory-grid', 
            title: "Schnell-Inventar",
            text: "Hier siehst du deine wichtigsten Items. Klicke sie an, um sie zu benutzen."
        },
        {
            target: 'inv-badge',
            title: "Der Rucksack",
            text: "Klicke hier, um dein gesamtes Inventar zu sehen, wenn du mehr als 5 Items hast."
        },
        {
            target: 'btn-coffee', 
            title: "Kaffee holen",
            text: "Der Lebenssaft der IT. Senkt Aggro, kostet aber Zeit."
        },
        {
            target: 'btn-sidequest', 
            title: "Ablenkung (Dienstgang)",
            text: "Mach mal was anderes. Bringt oft Items oder senkt Stress, aber der Chef sieht es nicht gern."
        },
        {
            target: 'btn-server', 
            title: "In den Serverraum",
            text: "Dein Rückzugsort. Hier kannst du Hardware reparieren oder Ruhe suchen."
        },
        {
            target: 'btn-calls', 
            title: "Anruf annehmen",
            text: "Der schnellste Weg, Tickets abzubauen. Aber Vorsicht: Die User rauben dir den letzten Nerv."
        }
    ],
    currentStep: 0,
    isActive: false,

    // 1. START: Wird von engine.js aufgerufen
    start: function() {
        // Wenn schon gesehen, brich ab (isActive bleibt false -> Engine startet Spiel)
        if (localStorage.getItem('sysadmin_tutorial_done') === 'true') {
            return;
        }

        // Wir setzen isActive auf true, damit die Engine NICHT startet
        this.isActive = true;

        // Wir zeigen das FRAGE-MODAL
        const askModal = document.getElementById('tut-ask-modal');
        askModal.classList.remove('hidden');
        askModal.classList.add('flex');
    },

    // 2. RUN: User hat "JA" geklickt -> Das eigentliche Tutorial startet
    run: function() {
        // Frage-Modal weg
        const askModal = document.getElementById('tut-ask-modal');
        askModal.classList.add('hidden');
        askModal.classList.remove('flex');

        // Tutorial Overlay an
        const overlay = document.getElementById('tutorial-overlay');
        const spotlight = document.getElementById('tut-spotlight');
        const textBox = document.getElementById('tut-text-box');

        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        
        // Anti-Flash
        spotlight.style.opacity = '0';
        textBox.style.opacity = '0';
        
        window.addEventListener('resize', this.reposition.bind(this));
        
        this.currentStep = 0;
        this.showStep(true);
    },

    // 3. SKIP: User hat "NEIN" geklickt -> Überspringen & Spiel starten
    skip: function() {
        const askModal = document.getElementById('tut-ask-modal');
        askModal.classList.add('hidden');
        askModal.classList.remove('flex');

        // Als erledigt markieren
        localStorage.setItem('sysadmin_tutorial_done', 'true');
        this.isActive = false;

        // Spiel manuell starten
        if (typeof engine !== 'undefined') {
            engine.log("Tutorial übersprungen. Viel Glück!", "text-slate-500");
            engine.reset();
        }
    },

    reposition: function() {
        if(this.isActive && document.getElementById('tutorial-overlay').classList.contains('flex')) {
            this.showStep(false); 
        }
    },

    showStep: function(doScroll = true) {
        if (this.currentStep >= this.steps.length) {
            this.finish();
            return;
        }

        const step = this.steps[this.currentStep];
        const targetEl = document.getElementById(step.target);
        
        if (!targetEl || targetEl.offsetParent === null) {
            if(doScroll) {
                this.currentStep++;
                this.showStep();
            }
            return;
        }

        document.getElementById('tut-title').innerText = step.title;
        document.getElementById('tut-desc').innerHTML = step.text;
        document.getElementById('tut-step-count').innerText = `${this.currentStep + 1} / ${this.steps.length}`;

        if(doScroll) {
            targetEl.scrollIntoView({
                behavior: "auto", 
                block: "center", 
                inline: "center"
            });
        }

        setTimeout(() => {
            const spot = document.getElementById('tut-spotlight');
            const textBox = document.getElementById('tut-text-box');
            
            const rect = targetEl.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const pad = 4;

            spot.style.top = (rect.top - pad) + 'px';
            spot.style.left = (rect.left - pad) + 'px';
            spot.style.width = (rect.width + (pad*2)) + 'px';
            spot.style.height = (rect.height + (pad*2)) + 'px';

            const boxHeight = textBox.offsetHeight || 200;
            const boxWidth = textBox.offsetWidth || 300;

            let textTop = rect.bottom + 15;
            let textLeft = rect.left;

            if (textTop + boxHeight + 20 > viewportHeight) {
                textTop = rect.top - 15 - boxHeight;
            }
            if (textTop < 10) {
                textTop = viewportHeight - boxHeight - 20;
            }

            if (textLeft + boxWidth > viewportWidth) {
                textLeft = viewportWidth - boxWidth - 10;
            }
            if (textLeft < 10) textLeft = 10;

            textBox.style.top = textTop + 'px';
            textBox.style.left = textLeft + 'px';

            spot.style.opacity = '1';
            textBox.style.opacity = '1';

        }, doScroll ? 150 : 0); 
    },

    next: function() {
        this.currentStep++;
        this.showStep();
    },

    finish: function() {
        this.isActive = false;
        document.getElementById('tutorial-overlay').classList.add('hidden');
        document.getElementById('tutorial-overlay').classList.remove('flex');
        window.removeEventListener('resize', this.reposition);
        localStorage.setItem('sysadmin_tutorial_done', 'true');

        if (typeof engine !== 'undefined') {
            engine.log("Tutorial abgeschlossen. Viel Glück!", "text-green-400");
            engine.reset();
        }
    },
    
    reset: function() {
        localStorage.removeItem('sysadmin_tutorial_done');
        location.reload();
    }
};
