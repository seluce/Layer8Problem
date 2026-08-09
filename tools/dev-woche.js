/* =========================================================================
   Layer8Problem - console tooling for the week mode
   =========================================================================

   Paste into the browser console (F12 -> Console), ideally while a week is
   already running or straight from the title screen. Everything then lives
   under `dev.`; `dev.hilfe()` lists the commands.

   All of it works on the real state through the normal engine paths, so what
   gets tested is what a player triggers - no special route that behaves
   differently when it matters.

   Note: the scenarios write into the running save. Call `dev.sichern()` first
   if a real run is worth keeping.

   Commands are German because the person using them is - the comments are
   English like everywhere else in the repository.
   ========================================================================= */

(() => {
    const e = window.engine;
    if (!e) { console.error('engine nicht gefunden - läuft das Spiel?'); return; }

    const s = e.state;
    const NAMEN = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

    /** Builds believable past days so the week's balance sheet has content. */
    const logBis = (tag, { hart = false } = {}) => {
        s.week.weekLog = [];
        for (let i = 1; i < tag; i++) {
            s.week.weekLog.push({
                dayIndex: i,
                endTickets: hart ? 3 + i : Math.max(0, 5 - i),
                endAl: hart ? 40 + i * 8 : 25 + i * 4,
                endCr: hart ? 30 + i * 6 : 20 + i * 3,
                endFl: 20 + i * 7,
                peakA: hart ? 70 + i * 4 : 45 + i * 5,
                peakC: hart ? 55 + i * 5 : 35 + i * 4,
                coffee: 2 + (i % 3),
                mailsIgnored: i % 2,
            });
        }
    };

    /** A few data points, otherwise the day chart on the end screen stays empty. */
    const kurve = () => {
        s.statHistory = [];
        const schritte = 10;
        for (let i = 0; i <= schritte; i++) {
            const t = 8 * 60 + Math.round(((s.time - 8 * 60) / schritte) * i);
            s.statHistory.push({
                t,
                f: Math.round(s.fl * (i / schritte)),
                a: Math.round(s.al * (0.35 + 0.65 * (i / schritte))),
                c: Math.round(s.cr * (0.3 + 0.7 * (i / schritte))),
            });
        }
    };

    const anzeigen = () => { e.renderHeader(); e.updateUI(); };

    const dev = {

        // ---------------------------------------------------------------
        // Grundlage
        // ---------------------------------------------------------------

        /**
         * Puts the week on a given day and condition.
         * dev.tag(3, 'normal', { tickets: 5, al: 60 })
         */
        tag(nummer = 1, stufe = 'normal', werte = {}) {
            if (!s.week.active) e.startWeek(stufe);
            s.week.level = stufe;
            s.week.dayIndex = Math.min(5, Math.max(1, nummer));
            s.week.contingents = {};
            logBis(s.week.dayIndex, { hart: werte.hart });

            s.time = werte.zeit ?? 10 * 60;
            s.tickets = werte.tickets ?? 3;
            s.al = werte.al ?? 35;
            s.cr = werte.cr ?? 25;
            s.fl = werte.fl ?? 30;
            s.excusesLeft = werte.ausreden ?? 2;
            s.morningMoodShown = true;
            s.ticketWarning = s.tickets >= 7;
            s.buttonsDisabled = false;
            kurve();
            anzeigen();
            e.setTerminalIdle();
            console.log(`▶ ${NAMEN[s.week.dayIndex - 1]}, ${e.WEEK_DIFFS[stufe].name}, ` +
                        `${Math.floor(s.time / 60)}:${String(s.time % 60).padStart(2, '0')} Uhr, ` +
                        `${s.tickets} Tickets`);
            return dev;
        },

        // ---------------------------------------------------------------
        // Scenario 1: end of day Mon-Thu -> night screen
        // ---------------------------------------------------------------

        /**
         * Just before the end of any weekday. The next action click triggers
         * the night screen, so what you see is the real route rather than
         * only the result.
         * dev.feierabend(2)          Tuesday evening
         * dev.feierabend(2, true)    ...and fire it right away
         */
        feierabend(tagNr = 2, sofort = false) {
            dev.tag(tagNr, s.week.level ?? 'normal',
                    { zeit: 16 * 60 + 20, tickets: 6, al: 62, cr: 48, fl: 55 });
            console.log('16:20 Uhr. Eine Aktion, dann kommt die Nacht.');
            if (sofort) dev.nacht();
            return dev;
        },

        /** Forces the night screen without waiting for an action. */
        nacht() {
            if (s.week.dayIndex >= 5) { console.warn('Freitag hat keine Nacht - nimm dev.freitag()'); return dev; }
            s.time = 16 * 60 + 30;
            s.pendingEnd = null;
            e.queueNightEnd();
            e.finishGame();
            return dev;
        },

        // ---------------------------------------------------------------
        // Scenario 2: Friday afternoon -> meeting, then the end screen
        // ---------------------------------------------------------------

        /**
         * Friday, 14:50, four days already behind you. After the next action
         * the button reads "ZUM WOCHENMEETING"; from there it is not far to
         * 16:30.
         * dev.freitag()            a solid week
         * dev.freitag('knapp')     carrying baggage: 8 tickets, high values
         */
        freitag(art = 'solide') {
            const knapp = art === 'knapp';
            dev.tag(5, s.week.level ?? 'normal', {
                zeit: 14 * 60 + 50,
                tickets: knapp ? 8 : 4,
                al: knapp ? 78 : 45,
                cr: knapp ? 71 : 38,
                fl: knapp ? 68 : 40,
                ausreden: knapp ? 0 : 2,
                hart: knapp,
            });
            s.meetingDone = false;
            console.log('Freitag 14:50. Eine Aktion -> der Knopf führt ins Wochenmeeting.');
            if (knapp) console.log('Knappe Variante: 8 Tickets, keine Ausreden mehr. Bei 10 ist Schluss.');
            return dev;
        },

        /** Jumps straight into the weekly meeting. */
        meeting() {
            if (!s.week.active) { console.warn('Keine Woche aktiv - erst dev.freitag()'); return dev; }
            s.week.dayIndex = 5;
            s.time = 15 * 60 + 10;
            s.meetingDone = false;
            e.triggerMeeting();
            return dev;
        },

        // ---------------------------------------------------------------
        // Scenario 3: the endings
        // ---------------------------------------------------------------

        /** Friday 16:30 - the week is survived, the balance sheet appears. */
        gewonnen() {
            dev.tag(5, s.week.level ?? 'normal',
                    { zeit: 16 * 60 + 29, tickets: 3, al: 52, cr: 44, fl: 61 });
            s.meetingDone = true;
            s.time = 16 * 60 + 30;
            s.pendingEnd = null;
            e.checkEndConditions();
            e.finishGame();
            return dev;
        },

        /**
         * Failing mid-week. Shows the weekday in the lead-in and the balance
         * sheet with the ✗ on the day it ended.
         * dev.raus('rage', 3)     anger overflows on Wednesday
         * dev.raus('tickets', 4)  ticket pile-up on Thursday
         * dev.raus('chef', 2)     radar full on Tuesday
         */
        raus(art = 'rage', tagNr = 3) {
            dev.tag(tagNr, s.week.level ?? 'normal', { zeit: 13 * 60 + 40, hart: true });
            // Mark valve and warning as spent, otherwise they catch the first
            // overflow - exactly as they would in a real week.
            s.rageWarningReceived = true;
            s.chefWarningReceived = true;
            if (art === 'rage') s.al = 100;
            else if (art === 'chef') s.cr = 100;
            else s.tickets = 10;
            kurve();
            s.pendingEnd = null;
            e.checkEndConditions();
            e.finishGame();
            return dev;
        },

        /**
         * Death in the morning: enough baggage that the morning mood ends the
         * day before it starts. For completeness - in a real game this needs a
         * thoroughly botched previous day.
         */
        morgentod(tagNr = 4) {
            dev.tag(tagNr, 'hard', { zeit: 8 * 60, tickets: 9 });
            s.morningMoodShown = false;
            s.rageWarningReceived = true;
            s.chefWarningReceived = true;
            e.triggerMorningMood('tickets');
            return dev;
        },

        // ---------------------------------------------------------------
        // The gala on Friday evening
        // ---------------------------------------------------------------

        /**
         * Unlocks the gala requirements for the current tier (eight
         * achievements at a matching rank, gala not played yet) and sets up
         * Friday afternoon. The meeting then opens on its gala node and the
         * party follows at 16:30.
         */
        gala() {
            const noetig = ['ach_mentor', 'ach_ally', 'ach_keymaster', 'ach_rockstar',
                            'ach_closer', 'ach_cat_whisperer', 'ach_lore', 'ach_wolf'];
            const a = s.archive;
            a.achievements = [...new Set([...(a.achievements ?? []), ...noetig])];
            a.achievementDiffs = a.achievementDiffs ?? {};
            for (const id of noetig) a.achievementDiffs[id] = 'hard';   // deckt jede Stufe ab
            e.saveSystem();

            const stufe = e.difficultyTier() === 1 ? 'easy' : e.difficultyTier() === 3 ? 'hard' : 'normal';
            localStorage.removeItem(e.KEYS.partyPlayed[stufe]);

            dev.freitag('solide');
            console.log(`Gala freigeschaltet (Stufe ${stufe}). Jetzt dev.meeting() - ` +
                        'die Ansage kommt im Meeting, die Feier um 16:30.');
            return dev;
        },

        // ---------------------------------------------------------------
        // Side routes
        // ---------------------------------------------------------------

        /** Empties one daily allowance to see the idle texts. */
        leerlauf(pool = 'coffee') {
            if (!s.week.active) { console.warn('Nur im Wochenmodus'); return dev; }
            s.week.contingents = s.week.contingents ?? {};
            s.week.contingents[e.contingentKey(pool)] = 0;
            console.log(`Kontingent "${pool}" aufgebraucht - der nächste Klick zeigt den Leerlauf-Text.`);
            return dev;
        },

        /** Shows how many moves are left in each pool today. */
        kontingente() {
            if (!s.week.active) { console.warn('Nur im Wochenmodus'); return dev; }
            console.table(['coffee', 'server', 'calls', 'sidequests']
                .map(p => ({ Pool: p, Übrig: e.weekContingentLeft(p) })));
            return dev;
        },

        /** Previews the coming night without triggering it. */
        vorschau() {
            if (!s.week.active) { console.warn('Nur im Wochenmodus'); return dev; }
            const cfg = e.WEEK_DIFFS[s.week.level];
            const behalten = Math.ceil(s.tickets * 0.25);
            const nacht = s.week.dayIndex;
            const abnutzung = 0.10 * (nacht - 1);
            const rAl = Math.max(0.10, cfg.rAl - abnutzung);
            const rCr = Math.max(0.10, cfg.rCr - abnutzung);
            console.table({
                Tickets: { vorher: s.tickets, nachher: behalten },
                Aggro: { vorher: Math.round(s.al), nachher: Math.round(Math.max(0, s.al - Math.min(s.al * rAl, 45))) },
                'Chef-Radar': { vorher: Math.round(s.cr), nachher: Math.round(Math.max(0, s.cr - Math.min(s.cr * rCr, 45))) },
                Faulheit: { vorher: Math.round(s.fl), nachher: Math.round(s.fl) },
                Ausreden: { vorher: s.excusesLeft, nachher: Math.min(s.excusesLeft + 1, cfg.excuseCap) },
            });
            return dev;
        },

        // ---------------------------------------------------------------
        // Saving and restoring the save game
        // ---------------------------------------------------------------

        /** Shows the counters that feed the archive and Steam. */
        zaehler() {
            const st = s.archive.stats ?? {};
            console.table({
                'Tage begonnen': (st.started_easy ?? 0) + (st.started_normal ?? 0) + (st.started_hard ?? 0),
                'Tage überlebt': st.daysSurvived ?? 0,
                'Wochen begonnen': st.weeksStarted ?? 0,
                'Wochen überlebt': st.weeksSurvived ?? 0,
                'Karrieretage (Chronik)': st.daysStarted ?? 0,
            });
            return dev;
        },

        /**
         * Zeroes every run counter. Testing inevitably produces statistical
         * litter (each dev.tag() starts a week); this clears it before a clean
         * measurement. Achievements and found items stay untouched.
         */
        zaehlerLeeren() {
            const st = s.archive.stats ?? (s.archive.stats = {});
            for (const key of Object.keys(st)) {
                // 'week' covers every week key at once: weeksStarted and
                // friends, weekBestDay, weekVentSaves/weekWarningsChef and
                // the week streaks - the latter used to slip through, because
                // 'weeks' does not match the capital S in weekStreak.
                if (/^(days|week|started_|survived_|streak|ventSaves|warningsChef)/.test(key)) {
                    delete st[key];
                }
            }
            Object.assign(st, { daysStarted: 0, daysSurvived: 0, daysRageQuit: 0, daysFired: 0 });
            e.saveSystem();
            console.log('Lauf-Zähler geleert. Erfolge und Items bleiben.');
            return dev;
        },

        sichern() {
            dev._sicherung = JSON.stringify({
                woche: localStorage.getItem(e.KEYS.weekState),
                tag: localStorage.getItem(e.KEYS.dayState),
                archiv: localStorage.getItem(e.KEYS.archive),
            });
            console.log('Gesichert. Zurück mit dev.zurueck() und danach neu laden.');
            return dev;
        },

        zurueck() {
            if (!dev._sicherung) { console.warn('Nichts gesichert.'); return dev; }
            const d = JSON.parse(dev._sicherung);
            const setz = (k, v) => v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v);
            setz(e.KEYS.weekState, d.woche);
            setz(e.KEYS.dayState, d.tag);
            setz(e.KEYS.archive, d.archiv);
            console.log('Wiederhergestellt. Jetzt die Seite neu laden.');
            return dev;
        },

        /** Abandon the week and return to day mode. */
        aufraeumen() {
            e.clearWeek();
            e.endWeek();
            console.log('Wochen-Speicherstand gelöscht. Seite neu laden.');
            return dev;
        },

        hilfe() {
            console.log(`
Layer8Problem - Testbefehle Arbeitswoche
────────────────────────────────────────────────────────────
AUFBAU
  dev.tag(3, 'normal', {tickets: 5, al: 60})   beliebiger Wochentag
  dev.kontingente()                            Züge pro Pool heute
  dev.vorschau()                               was die Nacht übrig lässt

SZENARIEN
  dev.feierabend(2)        Dienstag 16:20 - eine Aktion, dann Nacht
  dev.feierabend(2, true)  dasselbe, aber sofort ausgelöst
  dev.nacht()              Nacht-Screen sofort
  dev.freitag()            Freitag 14:50, solide Woche
  dev.freitag('knapp')     Freitag mit 8 Tickets und ohne Ausreden
  dev.meeting()            direkt ins Wochenmeeting
  dev.gewonnen()           Freitag 16:30 - Woche überstanden
  dev.raus('rage', 3)      Aggro läuft am Mittwoch über
  dev.raus('tickets', 4)   Ticketstau am Donnerstag
  dev.raus('chef', 2)      Chef-Radar voll am Dienstag
  dev.morgentod(4)         Tod in der Morgenstimmung
  dev.gala()               Gala freischalten, dann dev.meeting()
  dev.leerlauf('server')   Kontingent leeren, Leerlauf-Text sehen

SPIELSTAND
  dev.zaehler()                                Archiv-Zähler anzeigen
  dev.zaehlerLeeren()                          Zähler auf null (Testmüll)
  dev.sichern() / dev.zurueck()                vorher/nachher
  dev.aufraeumen()                             Woche verwerfen
────────────────────────────────────────────────────────────`);
            return dev;
        },
    };

    window.dev = dev;
    console.log('%cTestwerkzeug bereit.%c  dev.hilfe() zeigt alle Befehle.',
                'color:#a855f7;font-weight:bold', 'color:inherit');
})();
