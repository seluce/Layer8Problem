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
 *   server       events drawn from the server room today
 *   calls        calls taken today
 *   quests       errands run today
 *   rageWarned   the aggro valve was opened
 *   chefWarned   the written warning was handed out
 *   blind        the whole day was played without readouts
 *   difficulty   "easy" | "normal" | "hard"
 *   ach(id)      achievement earned today
 *   item(id)     item in the backpack at the end
 *   hasEncounters / hasHabits
 *                whether those collecting slots produced anything - set while
 *                assembling, which is why the *Intro slots can read them
 *
 * A condition that throws is treated as "does not fit" rather than taking the
 * end screen down with it; tools/lint-data.mjs runs every condition against
 * synthetic days, so a broken one surfaces long before a player sees it.
 */
import { DB } from '../data.js';

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Turns ["A", "B", "C"] into the phrase "A, B und C". */
const formatList = (arr) =>
    arr.length <= 1 ? (arr[0] ?? '') : `${arr.slice(0, -1).join(', ')} und ${arr[arr.length - 1]}`;

const fits = (fragment, day) => {
    try {
        return !!fragment.when(day);
    } catch (err) {
        console.error(`Tagebuch: Bedingung von "${fragment.id}" ist gestolpert`, err);
        return false;
    }
};

/** Choice slot: the first fragment that fits, one of its lines. */
const choose = (slot, day) => {
    const fragment = (DB.diary?.[slot] ?? []).find(f => fits(f, day));
    return fragment ? pick(fragment.lines) : '';
};

/** Collecting slot: one line from every fragment that fits, in pool order. */
const collect = (slot, day) =>
    (DB.diary?.[slot] ?? []).filter(f => fits(f, day)).map(f => pick(f.lines));

/** Wraps collected clauses in the sentence its *Intro slot supplies. */
const wrap = (slot, day, clauses) =>
    clauses.length ? choose(slot, day).replace('{list}', formatList(clauses)) : '';

function factsOf(state, endReason) {
    const used = Array.from(state.usedIDs ?? []);
    const count = (prefix) => used.filter(id => id.startsWith(prefix)).length;
    const mult = state.difficultyMult ?? 1.0;

    return {
        end: endReason,
        survived: endReason === 'WIN' || endReason === 'PARTY',
        server: count('srv_'),
        calls: count('call_'),
        quests: count('sq_'),
        rageWarned: !!state.rageWarningReceived,
        chefWarned: !!state.chefWarningReceived,
        blind: !!state.blindRun,
        difficulty: mult > 1.0 ? 'hard' : mult < 1.0 ? 'easy' : 'normal',
        ach: (id) => (state.achievements ?? []).includes(id),
        item: (id) => (state.inventory ?? []).some(i => i.id === id),
        hasEncounters: false,
        hasHabits: false
    };
}

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
        console.error('Tagebuch: der Textbestand ist nicht geladen');
        return { paragraphs: [{ text: 'Kein Eintrag. Der Tag war lang genug.', tone: 'final' }] };
    }

    const day = factsOf(state, endReason);

    const opening = [choose('mood', day), choose('place', day)].filter(Boolean).join(' ');

    const encounters = collect('encounters', day);
    day.hasEncounters = encounters.length > 0;
    const habits = collect('habits', day);
    day.hasHabits = habits.length > 0;
    const middle = [wrap('encountersIntro', day, encounters),
                    wrap('habitsIntro', day, habits)].filter(Boolean).join(' ');

    const warning = wrap('warningsIntro', day, collect('warnings', day));
    const note = choose('postscript', day);
    const closing = choose('ending', day).replace('{party}', partyText);

    return {
        paragraphs: [
            { text: opening, tone: 'body' },
            { text: middle,  tone: 'body' },
            { text: warning, tone: 'warn' },
            { text: note,    tone: 'note' },
            { text: closing, tone: 'final' }
        ].filter(p => p.text)
    };
}
