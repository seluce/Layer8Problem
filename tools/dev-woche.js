/* =========================================================================
   Layer8Problem - console tooling for the week mode
   =========================================================================

   Paste into the browser console (F12 -> Console), ideally while a week is
   already running or straight from the title screen. Everything then lives
   under `dev.`; `dev.help()` lists the commands.

   All of it works on the real state through the normal engine paths, so what
   gets tested is what a player triggers - no special route that behaves
   differently when it matters.

   Note: the scenarios write into the running save. Call `dev.backup()` first
   if a real run is worth keeping.

   Commands are German because the person using them is - the comments are
   English like everywhere else in the repository.
   ========================================================================= */

(() => {
    const e = window.engine;
    if (!e) { console.error('engine not found - is the game running?'); return; }

    const s = e.state;
    const DAY_NAMES = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

    // German labels for the three week levels. Deliberately local and not
    // taken from the dictionary: this helper prints for the developer, and
    // its output stays German even when the game runs in English. WEEK_DIFFS
    // carries a `key` since 6.0 - the `name` field it used to carry was a
    // German display string and is gone.
    const LEVELS = { easy: 'rested', normal: 'fed up', hard: 'in need of leave' };

    /** Builds believable past days so the week's balance sheet has content. */
    const logUpTo = (tag, { hart = false } = {}) => {
        s.week.weekLog = [];
        for (let i = 1; i < tag; i++) {
            s.week.weekLog.push({
                dayIndex: i,
                endTickets: hart ? 3 + i : Math.max(0, 5 - i),
                endA: hart ? 40 + i * 8 : 25 + i * 4,
                endB: hart ? 30 + i * 6 : 20 + i * 3,
                endL: 20 + i * 7,
                peakA: hart ? 70 + i * 4 : 45 + i * 5,
                peakB: hart ? 55 + i * 5 : 35 + i * 4,
                coffee: 2 + (i % 3),
                mailsIgnored: i % 2,
            });
        }
    };

    /** A few data points, otherwise the day chart on the end screen stays empty. */
    const curve = () => {
        s.statHistory = [];
        const schritte = 10;
        for (let i = 0; i <= schritte; i++) {
            const m = 8 * 60 + Math.round(((s.time - 8 * 60) / schritte) * i);
            s.statHistory.push({
                m,
                l: Math.round(s.fl * (i / schritte)),
                a: Math.round(s.al * (0.35 + 0.65 * (i / schritte))),
                b: Math.round(s.cr * (0.3 + 0.7 * (i / schritte))),
            });
        }
    };

    const refresh = () => { e.renderHeader(); e.updateUI(); };

    const dev = {

        // ---------------------------------------------------------------
        // the groundwork
        // ---------------------------------------------------------------

        /**
         * Puts the week on a given day and condition.
         * dev.day(3, 'normal', { tickets: 5, al: 60 })
         */
        day(number = 1, level = 'normal', values = {}) {
            if (!s.week.active) e.startWeek(level);
            s.week.level = level;
            s.week.dayIndex = Math.min(5, Math.max(1, number));
            s.week.contingents = {};
            logUpTo(s.week.dayIndex, { hart: values.hart });

            s.time = values.zeit ?? 10 * 60;
            s.tickets = values.tickets ?? 3;
            s.al = values.al ?? 35;
            s.cr = values.cr ?? 25;
            s.fl = values.fl ?? 30;
            s.excusesLeft = values.ausreden ?? 2;
            s.morningMoodShown = true;
            s.ticketWarning = s.tickets >= 7;
            s.buttonsDisabled = false;
            curve();
            refresh();
            e.setTerminalIdle();
            console.log(`▶ ${DAY_NAMES[s.week.dayIndex - 1]}, ${LEVELS[e.WEEK_DIFFS[level].key]}, ` +
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
         * dev.clockOff(2)          Tuesday evening
         * dev.clockOff(2, true)    ...and fire it right away
         */
        clockOff(tagNr = 2, sofort = false) {
            dev.day(tagNr, s.week.level ?? 'normal',
                    { zeit: 16 * 60 + 20, tickets: 6, al: 62, cr: 48, fl: 55 });
            console.log('16:20. One action, then the night comes.');
            if (sofort) dev.night();
            return dev;
        },

        /** Forces the night screen without waiting for an action. */
        night() {
            if (s.week.dayIndex >= 5) { console.warn('Friday has no night - use dev.friday()'); return dev; }
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
         * dev.friday()            a solid week
         * dev.friday('tight')     carrying baggage: 8 tickets, high values
         */
        friday(kind = 'solide') {
            const tight = kind === 'tight';
            dev.day(5, s.week.level ?? 'normal', {
                zeit: 14 * 60 + 50,
                tickets: tight ? 8 : 4,
                al: tight ? 78 : 45,
                cr: tight ? 71 : 38,
                fl: tight ? 68 : 40,
                ausreden: tight ? 0 : 2,
                hart: tight,
            });
            s.meetingDone = false;
            console.log('Friday 14:50. One action -> the button leads into the weekly meeting.');
            if (tight) console.log('The tight variant: 8 tickets, no excuses left. At 10 it is over.');
            return dev;
        },

        /** Jumps straight into the weekly meeting. */
        meeting() {
            if (!s.week.active) { console.warn('No week running - dev.friday() first'); return dev; }
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
        won() {
            dev.day(5, s.week.level ?? 'normal',
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
         * dev.out('rage', 3)     anger overflows on Wednesday
         * dev.out('tickets', 4)  ticket pile-up on Thursday
         * dev.out('chef', 2)     radar full on Tuesday
         */
        out(kind = 'rage', tagNr = 3) {
            dev.day(tagNr, s.week.level ?? 'normal', { zeit: 13 * 60 + 40, hart: true });
            // Mark valve and warning as spent, otherwise they catch the first
            // overflow - exactly as they would in a real week.
            s.rageWarningReceived = true;
            s.chefWarningReceived = true;
            if (kind === 'rage') s.al = 100;
            else if (kind === 'chef') s.cr = 100;
            else s.tickets = 10;
            curve();
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
        morningDeath(tagNr = 4) {
            dev.day(tagNr, 'hard', { zeit: 8 * 60, tickets: 9 });
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
            const needed = ['ach_mentor', 'ach_ally', 'ach_keymaster', 'ach_rockstar',
                            'ach_closer', 'ach_cat_whisperer', 'ach_lore', 'ach_wolf'];
            const a = s.archive;
            a.achievements = [...new Set([...(a.achievements ?? []), ...needed])];
            a.achievementDiffs = a.achievementDiffs ?? {};
            for (const id of needed) a.achievementDiffs[id] = 'hard';   // covers every grade
            e.saveSystem();

            const level = e.difficultyTier() === 1 ? 'easy' : e.difficultyTier() === 3 ? 'hard' : 'normal';
            localStorage.removeItem(e.KEYS.partyPlayed[level]);

            dev.friday('solide');
            console.log(`Gala unlocked (level ${level}). Now dev.meeting() - ` +
                        'the announcement comes in the meeting, the party at 16:30.');
            return dev;
        },

        // ---------------------------------------------------------------
        // Side routes
        // ---------------------------------------------------------------

        /** Empties one daily allowance to see the idle texts. */
        idle(pool = 'coffee') {
            if (!s.week.active) { console.warn('Week mode only'); return dev; }
            s.week.contingents = s.week.contingents ?? {};
            s.week.contingents[e.contingentKey(pool)] = 0;
            console.log(`quota "${pool}" used up - the next click shows the idle text.`);
            return dev;
        },

        /** Shows how many moves are left in each pool today. */
        quotas() {
            if (!s.week.active) { console.warn('Week mode only'); return dev; }
            console.table(['coffee', 'server', 'calls', 'sidequests']
                .map(p => ({ pool: p, left: e.weekContingentLeft(p) })));
            return dev;
        },

        /** Previews the coming night without triggering it. */
        preview() {
            if (!s.week.active) { console.warn('Week mode only'); return dev; }
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
        counters() {
            const st = s.archive.stats ?? {};
            console.table({
                'days started': (st.started_easy ?? 0) + (st.started_normal ?? 0) + (st.started_hard ?? 0),
                'days survived': st.daysSurvived ?? 0,
                'weeks started': st.weeksStarted ?? 0,
                'weeks survived': st.weeksSurvived ?? 0,
                'Karrieretage (Chronik)': st.daysStarted ?? 0,
            });
            return dev;
        },

        /**
         * Zeroes every run counter. Testing inevitably produces statistical
         * litter (each dev.day() starts a week); this clears it before a clean
         * measurement. Achievements and found items stay untouched.
         */
        clearCounters() {
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
            console.log('Run counters cleared. Achievements and items stay.');
            return dev;
        },

        backup() {
            dev._sicherung = JSON.stringify({
                woche: localStorage.getItem(e.KEYS.weekState),
                day: localStorage.getItem(e.KEYS.dayState),
                archiv: localStorage.getItem(e.KEYS.archive),
            });
            console.log('Backed up. Back with dev.restore(), then reload.');
            return dev;
        },

        restore() {
            if (!dev._sicherung) { console.warn('Nichts gesichert.'); return dev; }
            const d = JSON.parse(dev._sicherung);
            const setz = (k, v) => v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v);
            setz(e.KEYS.weekState, d.woche);
            setz(e.KEYS.dayState, d.tag);
            setz(e.KEYS.archive, d.archiv);
            console.log('Restored. Now reload the page.');
            return dev;
        },

        /** Abandon the week and return to day mode. */
        dropWeek() {
            e.clearWeek();
            e.endWeek();
            console.log('Week save deleted. Reload the page.');
            return dev;
        },

        // ---------------------------------------------------------------
        // knowledge (the compendium)
        // ---------------------------------------------------------------

        /**
         * Shows every entry with the notes earned so far. Without arguments
         * it is a table; with an id it prints that entry in full, including
         * which trigger is still missing for each locked note.
         * dev.knowledge()  /  dev.knowledge('blaschke')
         */
        knowledge(id) {
            const entries = e.knowledgeEntries?.() ?? [];
            if (!entries.length) { console.warn('Compendium not loaded - open the knowledge once.'); return dev; }

            if (!id) {
                console.table(Object.fromEntries(entries.map(x =>
                    [x.id, { name: x.name, entry: x.open ? 'open' : 'shut', notes: `${x.notes.length}/${x.total}` }])));
                return dev;
            }
            const entry = entries.find(x => x.id === id);
            if (!entry) { console.warn(`No entry "${id}".`); return dev; }

            const seen = new Set(s.archive.seenEvents ?? []);
            const flags = new Set(s.archive.seenFlags ?? []);
            console.log(`${entry.name} - ${entry.role}  [${entry.open ? 'offen' : 'zu'}]`);
            console.log(entry.summary);
            for (const n of entry.notes ?? []) {
                const have = n.flag ? flags.has(n.flag) : seen.has(n.seen);
                console.log(`  ${have ? '✓' : '·'} ${n.text}`);
                if (!have) console.log(`      missing: ${n.flag ? 'flag ' + n.flag : 'event ' + n.seen}`);
            }
            return dev;
        },

        /**
         * Fakes the evidence instead of the result, so the same derivation
         * runs that a real playthrough would trigger.
         * dev.fillKnowledge()            everything
         * dev.fillKnowledge('sonntag')   one entry
         * dev.fillKnowledge('sonntag', 2)  head plus the first two notes
         */
        fillKnowledge(id, anzahl) {
            // knowledgeEntries() carries the raw entry along, so the console
            // does not need access to DB (the engine only exposes functions).
            const list = e.knowledgeEntries?.() ?? [];
            if (!list.length) { console.warn('Compendium not loaded - open the knowledge once.'); return dev; }

            const ev = new Set(s.archive.seenEvents ?? []);
            const fl = new Set(s.archive.seenFlags ?? []);
            for (const entry of list) {
                if (id && entry.id !== id) continue;
                (entry.seen ?? []).slice(0, 1).forEach(x => ev.add(x));
                const notes = anzahl == null ? (entry.notes ?? []) : (entry.notes ?? []).slice(0, anzahl);
                for (const n of notes) { if (n.flag) fl.add(n.flag); else ev.add(n.seen); }
            }
            s.archive.seenEvents = [...ev];
            s.archive.seenFlags = [...fl];
            e.saveSystem();
            console.log(`Knowledge filled${id ? ' for ' + id : ''}. Reopen the modal.`);
            return dev;
        },

        /** Wipes the evidence - back to an empty compendium. */
        clearKnowledge() {
            s.archive.seenEvents = [];
            s.archive.seenFlags = [];
            e.saveSystem();
            console.log('Wissen geleert.');
            return dev;
        },

        help() {
            console.log(`
Layer8Problem - test commands for the working week
────────────────────────────────────────────────────────────
SETUP
  dev.day(3, 'normal', {tickets: 5, al: 60})   any weekday
  dev.quotas()                                 draws per pool today
  dev.preview()                                what the night leaves behind

SCENARIOS
  dev.clockOff(2)         Tuesday 16:20 - one action, then the night
  dev.clockOff(2, true)   the same, but triggered at once
  dev.night()             the night screen straight away
  dev.friday()            Friday 14:50, a solid week
  dev.friday('tight')     Friday with 8 tickets and no excuses
  dev.meeting()           straight into the weekly meeting
  dev.won()               Friday 16:30 - the week survived
  dev.out('rage', 3)      aggro overflows on Wednesday
  dev.out('tickets', 4)   ticket jam on Thursday
  dev.out('chef', 2)      boss radar full on Tuesday
  dev.morningDeath(4)     death in the morning mood
  dev.gala()              unlock the gala, then dev.meeting()
  dev.idle('server')      empty a quota, see the idle text

KNOWLEDGE (compendium)
  dev.knowledge()                    an overview of every entry
  dev.knowledge('blaschke')          one entry in detail
  dev.fillKnowledge()                unlock everything
  dev.fillKnowledge('sonntag')       this entry only
  dev.fillKnowledge('sonntag', 2)    the entry plus two notes
  dev.clearKnowledge()               back to empty

SAVES
  dev.counters()                     show the archive counters
  dev.clearCounters()                counters to zero (test litter)
  dev.backup() / dev.restore()       before / after
  dev.dropWeek()                     discard the week
────────────────────────────────────────────────────────────`);
            return dev;
        },
    };

    window.dev = dev;
    console.log('%cTest tool ready.%c  dev.help() lists every command.',
                'color:#a855f7;font-weight:bold', 'color:inherit');
})();
