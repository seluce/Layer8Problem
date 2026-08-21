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
import { dayNameValue } from './engine_week.js';
import { resolveRef, renderRecipe } from './recipe.js';
import { tree, t, tf } from '../i18n/i18n.svelte.js';

/**
 * How many recently used lines to remember. A week run writes five entries
 * in one sitting, so the old value (60, roughly two days) started repeating
 * within a single week - 150 keeps several runs apart.
 */
const MEMORY = 150;

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

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
 * Picks a line and remembers it, and answers with the PATH to it, not with the
 * sentence (6.1).
 *
 * The identity was already being computed here: `${fragment.id}:${i}` is what
 * the anti-repetition memory has always stored. Writing the same draw down as a
 * path is what lets the page be told again in another language - both trees
 * carry the same list lengths and the same ids (lint-parity), so the index
 * lands on the counterpart of the same sentence. See src/engine/recipe.js for
 * why a recorded line holds an identity rather than its own rendering.
 *
 * Lines used recently are skipped - unless that would leave nothing, in which
 * case a repeat beats an empty paragraph.
 */
const takeLine = (slot, fragment, poolIndex, recent) => {
    const keys = fragment.lines.map((_, i) => `${fragment.id}:${i}`);
    const fresh = keys.filter(k => !recent.includes(k));
    const chosen = pick(fresh.length ? fresh : keys);
    recent.push(chosen);
    const lineIndex = Number(chosen.split(':').pop());
    return { ref: { p: 'diary', path: [slot, poolIndex, 'lines', lineIndex] } };
};

/**
 * Choice slot: of everything that fits, the most specific wins - that is what
 * `rank` says. Among equals it is a draw, and that is where the variety comes
 * from: three fragments that all fit a Monday give three different openings
 * instead of always the first one in the file.
 *
 * The pool index is carried through the filtering, because it is the half of
 * the path that survives a language: the FILTERED position would name a
 * different fragment as soon as one more of them fits.
 */
const choose = (slot, day, recent) => {
    const fitting = (DB.diary?.[slot] ?? [])
        .map((fragment, poolIndex) => ({ fragment, poolIndex }))
        .filter(({ fragment }) => fits(fragment, day));
    if (!fitting.length) return null;
    const top = Math.max(...fitting.map(({ fragment }) => fragment.rank ?? 0));
    const { fragment, poolIndex } = pick(fitting.filter(({ fragment }) => (fragment.rank ?? 0) === top));
    return takeLine(slot, fragment, poolIndex, recent);
};

/** Collecting slot: one line from every fragment that fits, in pool order. */
const collect = (slot, day, recent) =>
    (DB.diary?.[slot] ?? [])
        .map((fragment, poolIndex) => ({ fragment, poolIndex }))
        .filter(({ fragment }) => fits(fragment, day))
        .map(({ fragment, poolIndex }) => takeLine(slot, fragment, poolIndex, recent));

/**
 * Wraps collected clauses in the sentence its *Intro slot supplies.
 *
 * Stays a STRUCTURE rather than becoming a sentence: the joint between the
 * clauses ("A, B und C") is a dictionary pattern and belongs to whatever
 * language is running, so it cannot be tied now. renderDiary() ties it.
 */
const wrap = (slot, day, recent, clauses) => {
    if (!clauses.length) return null;
    const intro = choose(slot, day, recent);
    return intro ? { intro, list: clauses } : null;
};

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
        // Counted at the spend site since 6.2. The old derivation (mode start
        // value minus what is left) reported zero as soon as excusesLeft had
        // grown past its start - nightly +1, morning mood - although a lie
        // had actually been told that day.
        excusesUsed: state.excusesUsed ?? 0,
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

/**
 * Which calendar day a difficulty stands for, as an index into WEEK_DAY_KEYS:
 * Friday, Wednesday, Monday.
 *
 * Held as an index and resolved through dayName(), not as a word. Up to here
 * this was `{ easy: 'Freitag', … }`, and the word went straight into {weekday}
 * of the diary prose - so the English day mode wrote "A Montag straight out of
 * the textbook". It is the same failure WEEK_DAY_KEYS was built for, one file
 * further on, and it survived because nothing compares against this value: it
 * is only ever printed.
 */
const WEEKDAY_INDEX = { easy: 4, normal: 2, hard: 0 };

/**
 * Which calendar day a page is headed with: in a week the real weekday, in day
 * mode the one the chosen difficulty stands for. Both the {weekday} token and
 * the header of the page read it here, so the two cannot disagree.
 */
function dayIndexOf(state) {
    if (state.week?.active) return (state.week.dayIndex ?? 1) - 1;
    const mult = state.difficultyMult ?? 1.0;
    return WEEKDAY_INDEX[mult > 1.0 ? 'hard' : mult < 1.0 ? 'easy' : 'normal'];
}

/**
 * @returns {{paragraphs: {text: string, tone: string}[], dayIndex: number}}
 *          The paragraphs in reading order; tones body, warn, note, final -
 *          components/DiaryEntry.svelte turns them into the look of the page.
 *
 *          `dayIndex` is the calendar day the page is headed with, 0-based for
 *          dayName(). It travels rather than being worked out again in the
 *          component: the page header used to derive its weekday from
 *          difficultyMult on its own, which is the day mode's question, so a
 *          Friday in a week was headed "Mittwoch" - the same failure the day
 *          report had one file over. One source, and the {weekday} inside the
 *          prose is filled from it too.
 */
export function buildDiary(state, endReason, partyValue = '') {
    if (!DB.diary) {
        // prefetchAll() warms this pool while the intro modal is up, so it is
        // there hours of game time before anyone clocks off. If it is not, the
        // day still deserves a closing line.
        console.error('Diary: the text pool is not loaded');
        return { paragraphs: [{ text: t('diary.empty'), tone: 'final' }], dayIndex: dayIndexOf(state) };
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
        // Two of the marks are not figures and not names, so both travel as
        // recipes and are resolved when the page is drawn: the weekday is a
        // dictionary entry, and the gala's ending is prose from the data tree.
        // In a week {weekday} is the real calendar day - the difficulty
        // mapping would claim Mittwoch five times in a row.
        weekday: dayNameValue(dayIndexOf(state)),
        party: partyValue
    };

    const opening = [choose('mood', day, recent), choose('place', day, recent)];
    const middle = [choose('rhythm', day, recent), choose('detail', day, recent)];

    const encounters = collect('encounters', day, recent);
    day.hasEncounters = encounters.length > 0;
    const habits = collect('habits', day, recent);
    day.hasHabits = habits.length > 0;
    const met = [wrap('encountersIntro', day, recent, encounters),
                 wrap('habitsIntro', day, recent, habits)];

    const people = [choose('people', day, recent)];
    const warning = [wrap('warningsIntro', day, recent, collect('warnings', day, recent))];
    const note = [choose('postscript', day, recent)];
    const closing = [choose('ending', day, recent)];

    saveMemory(recent);

    return {
        dayIndex: dayIndexOf(state),
        tokens,
        // A paragraph is a LIST OF PARTS, joined by a space when it is drawn.
        // A part is either one drawn line or an intro with the clauses it wraps
        // - see renderDiary(), which is the only place that turns any of this
        // into a sentence.
        paragraphs: [
            { parts: opening, tone: 'body' },
            { parts: middle,  tone: 'body' },
            { parts: met,     tone: 'body' },
            { parts: people,  tone: 'body' },
            { parts: warning, tone: 'warn' },
            { parts: note,    tone: 'note' },
            { parts: closing, tone: 'final' }
        ].map(p => ({ ...p, parts: p.parts.filter(Boolean) })).filter(p => p.parts.length)
    };
}

/**
 * The recorded page as it should read right now.
 *
 * This is the counterpart to buildDiary() and the reason the diary can follow a
 * language switch at all: the entry holds paths and marks, and every sentence in
 * it is put together here, against whatever tree and dictionary are loaded.
 *
 * Reads through tree() and t(), NEVER through DB - it runs inside a $derived in
 * components/DiaryEntry.svelte, and a read straight off DB would leave the page
 * in yesterday's language while the frame around it changed. The trap CLAUDE.md
 * documents for `DB`.
 *
 * A part that cannot be resolved drops its paragraph rather than being guessed
 * at, which is the answer src/engine/recipe.js gives for a line whose content
 * has moved between versions. So does a mark that stays unfilled: a paragraph
 * with a hole in it is not the paragraph.
 *
 * @param {object} diary the object buildDiary() returned
 * @returns {{dayIndex: number, paragraphs: {text: string, tone: string}[]}}
 */
export function renderDiary(diary) {
    // Unconditional, so that even a page made entirely of literals makes its
    // reader a reader of the language rune. Same reasoning as in recipe.js.
    tree();
    if (!diary) return { dayIndex: 0, paragraphs: [] };

    // The joint between clauses is a dictionary pattern, so it is tied here and
    // not when the clauses were collected: German and English happen to agree on
    // "head, conjunction, last", but a language that puts the joint somewhere
    // else has to be able to say so.
    const list = (parts) => {
        const rendered = parts.map(one => resolveRef(one?.ref));
        if (rendered.some(one => one === null)) return null;
        if (rendered.length <= 1) return rendered[0] ?? '';
        return tf('diary.listJoin', {
            head: rendered.slice(0, -1).join(t('diary.listSeparator')),
            last: rendered[rendered.length - 1]
        });
    };

    const marks = {};
    for (const [name, value] of Object.entries(diary.tokens ?? {})) {
        // A mark is a figure, a colleague's name - both the same in either tree -
        // or a recipe. Only the last kind has to be told again.
        const filled = value && typeof value === 'object' ? renderRecipe(value) : value;
        if (filled !== null && filled !== undefined) marks[name] = filled;
    }

    const part = (one) => {
        if (!one) return null;
        if (one.intro) {
            const intro = resolveRef(one.intro.ref);
            const clauses = list(one.list ?? []);
            return intro === null || clauses === null ? null : intro.replace('{list}', clauses);
        }
        return resolveRef(one.ref);
    };

    const paragraphs = [];
    for (const p of diary.paragraphs ?? []) {
        // An entry from before 6.1 - or the fallback line below - carries its
        // text and nothing else. It renders as it stands.
        if (typeof p.text === 'string') { paragraphs.push({ text: p.text, tone: p.tone }); continue; }

        const pieces = (p.parts ?? []).map(part);
        if (!pieces.length || pieces.some(piece => piece === null)) continue;

        const text = fill(pieces.join(' '), marks);
        if (!text || /\{\w+\}/.test(text)) continue;
        paragraphs.push({ text, tone: p.tone });
    }

    return { dayIndex: diary.dayIndex ?? 0, paragraphs };
}
