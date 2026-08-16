/**
 * Builds the diary entry at the end of a day.
 *
 * The split is deliberate: this file knows HOW a diary is assembled, and
 * data/data_diary.js knows WHAT can be written and when it fits. A new
 * sentence is a data change and never touches this file.
 *
 * The facts object handed to every condition:
 *
 *   end          "WIN" | "RAGE" | "TICKETS" | "FIRED" | "PARTY"
 *   survived     true for WIN and PARTY
 *   difficulty   "easy" | "normal" | "hard"
 *   server / calls / quests
 *                events drawn from each area today
 *   events       how many events the day held in total
 *   boss         boss fights fought
 *   lunch        the break was taken
 *   leet         the 13:37 moment was seen
 *   coffee       cups drunk
 *   mailsIgnored mails deleted or run out on
 *   tickets      still open at the end
 *   excusesUsed  excuses spent
 *   items        things carried home
 *   endHour      clock hour the day ended on
 *   peakHour     hour the highest bar was reached
 *   peakValue    that bar, 0-100
 *   calm         no bar ever passed 40
 *   upName / upBy, downName / downBy
 *                the colleague who moved most today, in each direction
 *   streak       days survived in a row, today included
 *   week         a week run is in progress (v5.0)
 *   weekDay      1 (Montag) to 5 (Freitag) inside a week, else 0
 *   weekRest     week days left AFTER today (4 on Monday, 0 on Friday)
 *   rageWarned / chefWarned / blind
 *   ach(id) / item(id)
 *   hasEncounters / hasHabits
 *                whether those collecting slots produced anything - set while
 *                assembling, which is why the *Intro slots can read them
 *
 * A condition that throws is treated as "does not fit" rather than taking the
 * end screen down with it; tools/lint-data.mjs runs every condition against
 * synthetic days, so a broken one surfaces long before a player sees it.
 */
import { DB } from '../data.js';
import { KEYS } from './keys.js';
import { dayName } from './engine_week.js';
import { t, tf } from '../i18n/i18n.svelte.js';

/**
 * How many recently used lines to remember. A week run writes five entries
 * in one sitting, so the old value (60, roughly two days) started repeating
 * within a single week - 150 keeps several runs apart.
 */
const MEMORY = 150;

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Turns ["A", "B", "C"] into the phrase "A, B und C".
 *
 * The conjunction goes through the dictionary rather than sitting in this
 * line, and it is a whole pattern rather than a bare word: German and English
 * happen to agree on "head, conjunction, last", but a fixed `und` in the
 * middle of {list} was appearing in every English diary entry, and a language
 * that puts the joint somewhere else would have no way to say so.
 */
const formatList = (arr) =>
    arr.length <= 1
        ? (arr[0] ?? '')
        : tf('diary.listJoin', {
            head: arr.slice(0, -1).join(t('diary.listSeparator')),
            last: arr[arr.length - 1]
        });

/** Replaces {name} placeholders. Unknown ones stay put and become visible. */
const fill = (text, tokens) => text.replace(/\{(\w+)\}/g, (whole, key) => tokens[key] ?? whole);

const fits = (fragment, day) => {
    try {
        return !!fragment.when(day);
    } catch (err) {
        console.error(`Diary: the condition of "${fragment.id}" stumbled`, err);
        return false;
    }
};

/**
 * The lines used over the last two days, so the same sentence does not come
 * back tomorrow. Kept in localStorage rather than in memory: it belongs to the
 * save, and closing the tab must not make the diary forget.
 */
function loadMemory() {
    try {
        const raw = JSON.parse(localStorage.getItem(KEYS.diaryRecent) ?? '[]');
        return Array.isArray(raw) ? raw.filter(x => typeof x === 'string') : [];
    } catch {
        return [];
    }
}

function saveMemory(recent) {
    try {
        localStorage.setItem(KEYS.diaryRecent, JSON.stringify(recent.slice(-MEMORY)));
    } catch { /* full or blocked storage must not cost the player the entry */ }
}

/**
 * Picks a line and remembers it. Lines used recently are skipped - unless that
 * would leave nothing, in which case a repeat beats an empty paragraph.
 */
const takeLine = (fragment, recent) => {
    const keys = fragment.lines.map((_, i) => `${fragment.id}:${i}`);
    const fresh = keys.filter(k => !recent.includes(k));
    const chosen = pick(fresh.length ? fresh : keys);
    recent.push(chosen);
    return fragment.lines[Number(chosen.split(':').pop())];
};

/**
 * Choice slot: of everything that fits, the most specific wins - that is what
 * `rank` says. Among equals it is a draw, and that is where the variety comes
 * from: three fragments that all fit a Monday give three different openings
 * instead of always the first one in the file.
 */
const choose = (slot, day, recent) => {
    const fitting = (DB.diary?.[slot] ?? []).filter(f => fits(f, day));
    if (!fitting.length) return '';
    const top = Math.max(...fitting.map(f => f.rank ?? 0));
    return takeLine(pick(fitting.filter(f => (f.rank ?? 0) === top)), recent);
};

/** Collecting slot: one line from every fragment that fits, in pool order. */
const collect = (slot, day, recent) =>
    (DB.diary?.[slot] ?? []).filter(f => fits(f, day)).map(f => takeLine(f, recent));

/** Wraps collected clauses in the sentence its *Intro slot supplies. */
const wrap = (slot, day, recent, clauses) =>
    clauses.length ? choose(slot, day, recent).replace('{list}', formatList(clauses)) : '';

function factsOf(state, endReason) {
    const used = Array.from(state.usedIDs ?? []);
    const count = (prefix) => used.filter(id => id.startsWith(prefix)).length;
    const week = !!state.week?.active;
    const mult = state.difficultyMult ?? 1.0;
    // In a week, difficultyMult stays at its day-mode identity (1.0), so the
    // difficulty must come from the chosen week level - it drives the excuse
    // maths below and every difficulty-flavoured fragment.
    const difficulty = week ? (state.week.level ?? 'normal')
                     : mult > 1.0 ? 'hard' : mult < 1.0 ? 'easy' : 'normal';

    // The curve of the day. statHistory holds one point per decision, so the
    // highest bar and the hour it was reached describe the shape of a day far
    // better than the value it happened to end on.
    const history = Array.isArray(state.statHistory) ? state.statHistory : [];
    let peak = { t: 8 * 60, v: 0 };
    for (const point of history) {
        const v = Math.max(point.a ?? 0, point.b ?? 0);
        if (v > peak.v) peak = { t: point.m ?? peak.t, v };
    }

    // Who moved today. Reputation on its own says nothing about the day - the
    // difference to this morning does.
    const before = state.repAtStart ?? {};
    const now = state.reputation ?? {};
    let up = { name: '', by: 0 }, down = { name: '', by: 0 };
    for (const [name, value] of Object.entries(now)) {
        const delta = value - (before[name] ?? value);
        if (delta > up.by) up = { name, by: delta };
        if (delta < down.by) down = { name, by: delta };
    }

    const excusesStart = difficulty === 'easy' ? 3 : difficulty === 'hard' ? 1 : 2;

    return {
        end: endReason,
        survived: endReason === 'WIN' || endReason === 'PARTY',
        difficulty,
        server: count('srv_'),
        calls: count('call_'),
        quests: count('sq_'),
        boss: count('boss_'),
        events: used.length,
        lunch: !!state.lunchDone,
        leet: !!state.leetSeen,
        coffee: state.coffeeConsumed ?? 0,
        mailsIgnored: state.emailsIgnored ?? 0,
        tickets: state.tickets ?? 0,
        excusesUsed: Math.max(0, excusesStart - (state.excusesLeft ?? excusesStart)),
        items: (state.inventory ?? []).length,
        endHour: Math.floor((state.time ?? 8 * 60) / 60),
        peakHour: Math.floor(peak.t / 60),
        peakValue: peak.v,
        calm: peak.v < 40,
        upName: up.name, upBy: up.by,
        downName: down.name, downBy: Math.abs(down.by),
        streak: state.archive?.stats?.streak ?? 0,
        week,
        weekDay: week ? (state.week.dayIndex ?? 1) : 0,
        weekRest: week ? 5 - (state.week.dayIndex ?? 1) : 0,
        rageWarned: !!state.rageWarningReceived,
        chefWarned: !!state.chefWarningReceived,
        blind: !!state.blindRun,
        ach: (id) => (state.achievements ?? []).includes(id),
        item: (id) => (state.inventory ?? []).some(i => i.id === id),
        hasEncounters: false,
        hasHabits: false
    };
}

const WEEKDAY = { easy: 'Freitag', normal: 'Mittwoch', hard: 'Montag' };

/**
 * @returns {{paragraphs: {text: string, tone: string}[]}} in reading order.
 *          Tones: body, warn, note, final - components/DiaryEntry.svelte
 *          turns them into the look of the page.
 */
export function buildDiary(state, endReason, partyText = '') {
    if (!DB.diary) {
        // prefetchAll() warms this pool while the intro modal is up, so it is
        // there hours of game time before anyone clocks off. If it is not, the
        // day still deserves a closing line.
        console.error('Diary: the text pool is not loaded');
        return { paragraphs: [{ text: t('diary.empty'), tone: 'final' }] };
    }

    const day = factsOf(state, endReason);
    const recent = loadMemory();
    const tokens = {
        up: day.upName, down: day.downName,
        upBy: String(day.upBy), downBy: String(day.downBy),
        tickets: String(day.tickets), coffee: String(day.coffee),
        mails: String(day.mailsIgnored), excuses: String(day.excusesUsed),
        items: String(day.items), events: String(day.events),
        streak: String(day.streak), restdays: String(day.weekRest),
        // In a week {weekday} is the real calendar day - the difficulty
        // mapping would claim Mittwoch five times in a row.
        weekday: day.week ? dayName(day.weekDay - 1) : WEEKDAY[day.difficulty],
        party: partyText
    };

    const opening = [choose('mood', day, recent), choose('place', day, recent)].filter(Boolean).join(' ');
    const middle = [choose('rhythm', day, recent), choose('detail', day, recent)].filter(Boolean).join(' ');

    const encounters = collect('encounters', day, recent);
    day.hasEncounters = encounters.length > 0;
    const habits = collect('habits', day, recent);
    day.hasHabits = habits.length > 0;
    const met = [wrap('encountersIntro', day, recent, encounters),
                 wrap('habitsIntro', day, recent, habits)].filter(Boolean).join(' ');

    const people = choose('people', day, recent);
    const warning = wrap('warningsIntro', day, recent, collect('warnings', day, recent));
    const note = choose('postscript', day, recent);
    const closing = choose('ending', day, recent);

    saveMemory(recent);

    return {
        paragraphs: [
            { text: opening, tone: 'body' },
            { text: middle,  tone: 'body' },
            { text: met,     tone: 'body' },
            { text: people,  tone: 'body' },
            { text: warning, tone: 'warn' },
            { text: note,    tone: 'note' },
            { text: closing, tone: 'final' }
        ].filter(p => p.text).map(p => ({ ...p, text: fill(p.text, tokens) }))
    };
}
